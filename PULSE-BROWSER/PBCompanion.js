// ============================================================================
//  PBCompanion.js — PulseBrowser OS Kernel (Ultra Edition v12.0)
//  Manifest V3 Service Worker — full OS kernel
//  Subsystems: Interceptor • Router • Navigator • Accelerator • Realm • Settings • DevTools
// ============================================================================
const CACHE_NAME = "pb-companion-cache";
// ============================================================================
//  SECTION 1 — INTERNAL STATE (Realm)
// ============================================================================
const PulseRealmState = {
  lastPing: null,
  lastPage: null,
  lastURL: null,
  lastDomainClass: null,
  // Bands (PulseWorld / OS)
  bands: {
    pulseBand: null,
    accelBand: null,
    routerBand: null,
    gpuBand: null,
    decodeBand: null,
    worldBand: null
  },
  navHistory: [],
  perfEntries: [],
  mutationCount: 0,
  imagesDecoded: 0,
  gpuWarmCount: 0,
  warmPathsTriggered: 0,
  warmAssetsTriggered: 0,
  lastWarmOrigin: null,
  flags: {
    hudActive: true,
    contentRuntimeActive: true,
    acceleratorActive: true,
    routerActive: true,
    navigatorActive: true
  }
};

// ============================================================================
//  SECTION 0 — INSTALL / ACTIVATE (Warm Boot)
// ============================================================================
self.addEventListener("install", event => {
  console.log(
    "%c[PULSEWORLD OS KERNEL] Installed",
    "color:#00FF9C; font-weight:bold; font-family:monospace;"
  );
  
  const PRELOAD_URLS = [
    "PBFrontPage.html",
    "PBPopup.html",
    "PBSettings.html",
    "PBCompanion.js",
    "PBInterceptor.js",
    "PBAccelerator.js",
    "PBRouter.js",
    "PBSettings.js",
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
  await pbHomeWarmBoot();
  await pbModuleWarmBoot();
}

self.addEventListener("activate", (event) => {
  console.log("%c[PULSEWORLD OS KERNEL] Activated",
    "color:#00FF9C; font-weight:bold; font-family:monospace;");
  event.waitUntil(pbWarmBoot());
});

self.addEventListener('fetch', event => {
  const req = event.request;

  // Only cache GET requests
  if (req.method !== 'GET') return;

  // // Skip chrome-extension:// URLs (cannot be cached)
  // if (req.url.startsWith('chrome-extension://')) {
  //   return; // Let the browser handle extension assets normally
  // }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Try cache first
    const cached = await cache.match(req);
    if (cached) {
      return cached; // Warm-state: instant return
    }

    // Network fallback
    try {
      const net = await fetch(req, { cache: 'no-store' });

      // Only store good GET 200 responses
      if (net && net.ok && !req.url.startsWith('chrome-extension://')) {
        cache.put(req, net.clone());
      }

      return net;
    } catch (err) {
      // Offline fallback: return last known cached version
      const fallback = await cache.match(req);
      if (fallback) return fallback;

      // Final fallback: offline message
      return new Response("Offline", { status: 503 });
    }
  })());
});


console.log("%c[PULSEWORLD OS KERNEL] PBCompanion.js (Ultra Edition v12.0) Loaded",
  "color:#00FF9C; font-weight:bold; font-family:monospace;");
const now = new Date().toLocaleString();
console.log("[PULSEWORLD OS KERNEL] Initializing PulseWorld with Accelerated Modules:", now);

const EXTENSION_SETTINGS_KEY2 = "pulseworldSettings";


// Persistent favicon cache stored in chrome.storage.local
// Local in-memory mirror for speed
let FAVICON_CACHE = {};

// Load cache from storage at startup
chrome.storage.local.get(["faviconCaches2"], (res) => {
  if (res.faviconCaches2) {
    FAVICON_CACHE = res.faviconCaches2;
  }
});

function saveCache() {
  chrome.storage.local.set({ faviconCaches2: FAVICON_CACHE });
}


async function fetchAndStoreIcon(host, iconUrl) {
  try {
    const response = await fetch(iconUrl);

    if (!response.ok) throw new Error("Fetch failed");

    const blob = await response.blob();

    // ⭐ Fallback if blob is empty or unreadable
    if (!blob || blob.size === 0) {
      console.warn("Empty favicon blob, falling back:", iconUrl);
      FAVICON_CACHE[host] = iconUrl;
      saveCache();
      return iconUrl;
    }

    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onloadend = () => {
        const base64 = reader.result;

        // ⭐ Fallback if Base64 is invalid
        if (
          !base64 ||
          typeof base64 !== "string" ||
          base64.trim() === "" ||
          base64.startsWith("data:") && base64.length < 10 ||
          base64.startsWith("data:text")
        ) {
          console.warn("Invalid Base64 favicon, falling back:", iconUrl);
          FAVICON_CACHE[host] = iconUrl;
          saveCache();
          resolve(iconUrl);
          return iconUrl;
        }

        // ⭐ Save actual icon data
        FAVICON_CACHE[host] = base64;
        saveCache();
        resolve(base64);
      };

      reader.onerror = () => {
        console.warn("FileReader failed, falling back:", iconUrl);
        FAVICON_CACHE[host] = iconUrl;
        saveCache();
        resolve(iconUrl);
      };

      reader.readAsDataURL(blob);
    });

  } catch (err) {
    console.warn("Favicon fetch failed:", iconUrl, err);

    // ⭐ Store fallback URL (last resort)
    FAVICON_CACHE[host] = iconUrl;
    saveCache();
    return iconUrl;
  }
}


async function getFavicon(url, flags = {}) {
  let u;

  try {
    u = new URL(url);
  } catch {
    return;
  }

  let host = u.hostname;

  // ⭐ If the URL explicitly contains "://www.", preserve www
  if (url.includes("www.")) {
    if (!host.startsWith("www.")) {
      host = "www." + host;
    }
  }

  // ⭐ Build favicon URL using hostname (preserves www)
  let icon = `https://${host}/favicon.ico`;

  // ⭐ Strip subdomains unless it's "www"
  const parts = host.split(".");
  if (parts.length > 2) {
    if (parts[0] !== "www") {
      const root = parts.slice(parts.length - 2).join(".");
      icon = `https://${root}/favicon.ico`;
    }
  }

  // ⭐ If cached → return instantly
  if (FAVICON_CACHE[host]) {
    const IconURL = icon;
    icon = await fetchAndStoreIcon(host, IconURL);
    console.log(
      "%c[PULSEWORLD OS KERNEL] SAVED FAVICON LOCATED: " + host,
      "color:#00FF9C; font-weight:bold; font-family:monospace;"
    );
    return FAVICON_CACHE[host];
  }


  const PB_HOMES = [
    "pulseworld.me",
    "pulseworld.net",
    "pulseworld.money",
    "pulseworld.biz",
    "binaryos.net",
    "booleanlogic.net",
    "gpuprocessing.net",
    "serviceworker.net",
    "orbitalmap.net"
  ];

  try {
    // Special cases
    if (host.includes("office.com")) {
      icon = "https://res.cdn.office.net/officehub/images/content/images/unauth-copilotcom/favicon-copilot-brand-refresh-23392c1f66.ico";
      const IconURL = icon;
      icon = await fetchAndStoreIcon(host, IconURL);
      FAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    if (host.includes("github.com")) {
      icon = "https://github.githubassets.com/favicons/favicon.svg";
      const IconURL = icon;
      icon = await fetchAndStoreIcon(host, IconURL);
      FAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    if (host.includes("youtube.com")) {
      icon = "https://www.youtube.com/s/desktop/fe2e0b8b/img/favicon_32x32.png";
      const IconURL = icon;
      icon = await fetchAndStoreIcon(host, IconURL);
      FAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    if (host.includes("discord.com")) {
      icon = "https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico";
      const IconURL = icon;
      icon = await fetchAndStoreIcon(host, IconURL);
      FAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    // PulseWorld module-aware switching
    const isPulseWorld = PB_HOMES.some(domain => host.endsWith(domain));

    if (isPulseWorld) {
      if (flags.isSW) icon = `${u.origin}/SWFavIcon.ico`;
      else if (flags.isBinaryOS) icon = `${u.origin}/BOFavIcon.ico`;
      else if (flags.isGPU) icon = `${u.origin}/GPFavIcon.ico`;
      else if (flags.isLogic) icon = `${u.origin}/BLFavIcon.ico`;
      else if (flags.isOrb) icon = `${u.origin}/OMFavIcon.ico`;
      else if (flags.isBiz) icon = `${u.origin}/PWBFavIcon.ico`;
      else if (flags.isSettings) icon = `${u.origin}/PWBFavIcon.ico`;
      else if (flags.isMoney) icon = `${u.origin}/PWMFavIcon.ico`;
      else icon = `${u.origin}/PWFavIcon.ico`;
      const IconURL = icon;
      icon = await fetchAndStoreIcon(host, IconURL);

      FAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    FAVICON_CACHE[host] = icon;
    saveCache();
    return icon;

  } catch {
    FAVICON_CACHE[host] = icon;
    saveCache();
    return icon;
  }
}


// ---------------------------------------------------------------------------
// HOME UNIVERSE (Your 9 domains)
// ---------------------------------------------------------------------------
const PB_HOMES = [
  "www.pulseworld.me",
  "www.pulseworld.net",
  "www.pulseworld.money",
  "www.pulseworld.biz",
  "www.binaryos.net",
  "www.booleanlogic.net",
  "www.gpuprocessing.net",
  "www.serviceworker.net",
  "www.orbitalmap.net",
];

// ---------------------------------------------------------------------------
// DOMAIN CLASSIFIER
// ---------------------------------------------------------------------------
function pbDomainClass(url) {
  for (const domain of PB_HOMES) {
    if (url.includes(domain)) return "PulseWorld";
  }
  return "WWW";
}
function safeSendMessage(msg) {
  chrome.runtime.sendMessage(msg, () => {
    if (chrome.runtime.lastError) {
      const m = chrome.runtime.lastError.message || "";
      if (m.includes("Receiving end")) {
        // Ignore this harmless SW-refresh error
        return;
      }
      console.warn("[PULSEWORLD] Message error:", m);
    }
  });
}

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  // Universal boost warm-path
  if (typeof PBUniversalBoost2?.warmTab === "function") {
    PBUniversalBoost2.warmTab(tab);
  }

  chrome.runtime.sendMessage({
    type: "PBNAV_EVENT",
    tabId: tab.id,
    url: tab.url,
    domainClass: pbDomainClass(tab.url),
    ts: Date.now()
  });
  
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
    chrome.storage.sync.get(null, (data) => {
      const S = data || {};

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
      S.accelModuleWarmBoot = S.accelModuleWarmBoot !== false; // auto warm boot for home universe

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

function isPulseWorld(origin) {
  return origin.includes("pulseworld.net")
      || origin.includes("orbitalmap.net")
      || origin.includes("booleanlogic.net")
      || origin.includes("binaryos.net")
      || origin.includes("serviceworker.net")
      || origin.includes("gpuprocessing.net")
      || origin.includes("pulseworld.me")
      || origin.includes("pulseworld.money")
      || origin.includes("pulseworld.biz");
}


// ---------------------------------------------------------------------------
// DNS WARM (resolve domain early)
// ---------------------------------------------------------------------------
function pbDNSWarm(origin) {
  try {
    const link = document.createElement("link");
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
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = origin;
    document.head.appendChild(link);

    console.log("%c[PBAccelerator] TLS Warm:", "color:#00C8FF;", origin);
  } catch (_) {}
}


// ---------------------------------------------------------------------------
// HTTP/2 / HTTP/3 / QUIC Warm (protocol warm-path)
// ---------------------------------------------------------------------------
function pbProtocolWarm(origin) {
  try {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = origin;
    document.head.appendChild(link);

    console.log("%c[PBAccelerator] Protocol Warm:", "color:#00C8FF;", origin);
  } catch (_) {}
}


// ---------------------------------------------------------------------------
// PREFETCH (network warm-path) + Realm counter
// ---------------------------------------------------------------------------
function pbPrefetch(urls = []) {
  urls.forEach((url) => {
    try { fetch(url, { cache: "force-cache" }).catch(() => {}); } catch (_) {}
  });
  PBQuantumPrefetch.prefetchLink();
  // Asset warm-path counter
  if (urls.length > 0) {
    chrome.runtime.sendMessage({ type: "PBACC_ASSETWARM_EVENT", count: urls.length });
  }
  
  console.log("%c[PBAccelerator] Prefetch:", "color:#00C8FF;", urls);
}

// ---------------------------------------------------------------------------
// PRECONNECT (DNS/TLS/TCP warm-path)
// ---------------------------------------------------------------------------
function pbPreconnect(origins = []) {
  origins.forEach((origin) => {
    pbDNSWarm(origin);
    pbTLSWarm(origin);
    pbProtocolWarm(origin);
  });
  console.log("%c[PBAccelerator] Preconnect:", "color:#00C8FF;", origins);
}

// ---------------------------------------------------------------------------
// PRELOAD (asset warm-path) + Realm counter
// ---------------------------------------------------------------------------
function pbPreload(origin) {
  const urls = isPulseWorld(origin)
    ? PB_ASSETS.map(p => origin + p)
    : PB_GENERIC_ASSETS.map(p => origin + p);

  urls.forEach(url => {
    try { fetch(url, { cache: "force-cache" }).catch(() => {}); } catch (_) {}
  });

  if (urls.length > 0) {
    chrome.runtime.sendMessage({ type: "PBACC_ASSETWARM_EVENT", count: urls.length });
  }

  console.log("%c[PBAccelerator] Preload:", "color:#00C8FF;", urls);
}


// ---------------------------------------------------------------------------
// GPU WARM (decode shaders early) + Realm counter
// ---------------------------------------------------------------------------
function pbGPUWarm() {
  chrome.runtime.sendMessage({ type: "PBCONTENT_GPUWARM" });
  console.log("%c[PBAccelerator] GPU Warm", "color:#00C8FF;");
}

// ---------------------------------------------------------------------------
// DECODE WARM (image decode warm-path) + Realm counter
// ---------------------------------------------------------------------------
function pbDecodeWarm() {
  chrome.runtime.sendMessage({ type: "PBCONTENT_DECODEWARM" });
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
  const urls = [
    origin + "/index.html",
    origin + "/404.html",
    origin + "/"
  ];
  pbPrefetch(urls);
  console.log("%c[PBAccelerator] Realm Warm:", "color:#00C8FF;", origin);
}

function broadcastRealmState() {
  chrome.tabs.query({}, (tabs) => {
    for (const tab of tabs) {
      chrome.tabs.sendMessage(tab.id, {
        type: "PBREALM_STATE_UPDATE",
        realm: PulseRealmState
      });
    }
  });
}

async function pbWarmPaths(origins) {
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

  const S = await getSettings();

  if (S.accelDNSWarm)      pbDNSWarm(origin);
  if (S.accelTLSWarm)      pbTLSWarm(origin);
  if (S.accelPreconnect)   pbPreconnect([origin]);
  if (S.accelPreload)      pbPreload(origin);

  const siblingPaths = [
    "/", "/privacy", "/data", "/termsofuse", "/cookies",
    "/404", "/realm", "/band", "/map", "/os"
  ];

  const siblingURLs = siblingPaths.map((p) => origin + p);
  if (S.accelPrefetch) pbPrefetch(siblingURLs);

  if (S.accelGPUWarm)    pbGPUWarm();
  if (S.accelDecodeWarm) pbDecodeWarm();
  if (S.accelRealmWarm)  pbRealmWarm(origin);
  
  // 🔥 Realm + HUD integration
  PulseRealmState.warmPathsTriggered++;
  PulseRealmState.lastWarmOrigin = origin;
  broadcastRealmState();
  

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
  const S = await getSettings();
  const domainClass = pbDomainClass(url);
  const origin = new URL(url).origin;

  console.log("%c[PBAccelerator] Accelerate:", "color:#00C8FF;", url, "class:", domainClass);

  if (domainClass === "PulseWorld") {
    await pbWarmPath(origin);
  } else {
    // WWW acceleration: preconnect + basic prefetch
    if (S.accelPreconnect) pbPreconnect([origin]);
    if (S.accelPrefetch)   pbPrefetch([origin + "/", origin + "/about"]);
  }
}


// ---------------------------------------------------------------------------
// AUTO HOME WARM-BOOT (for your 9 domains)
// ---------------------------------------------------------------------------
async function pbHomeWarmBoot() {
  const S = await getSettings();
  if (!S.accelHomeWarmBoot) return;

  const origins = PB_HOMES.map((d) => "https://" + d);
  pbPreconnect(origins);

  origins.forEach((origin) => {
    pbPreload(origin);
    pbHomeRealmWarm(origin);
  });

  chrome.runtime.sendMessage({
    type: "PBACC_WARMPATH_EVENT",
    origins: PB_HOMES
  });

  console.log("%c[PBAccelerator] Home Warm-Boot executed",
    "color:#00C8FF; font-weight:bold;");
}

async function pbLoadExtensionSettings() {
  try {
    const result = await chrome.storage.local.get([EXTENSION_SETTINGS_KEY2]);
    const settings = result[EXTENSION_SETTINGS_KEY2] || {};

    console.log("pbLoadExtensionSettings()", settings);

    return settings;
  } catch (err) {
    console.error("pbLoadExtensionSettings() FAILED", err);
    return {};
  }
}


async function pbModuleWarmBoot() {
  const settings = await pbLoadExtensionSettings();

  // Collect all accelerated module links directly from settings
  const warmTargets = [
    settings.externalBankLink,
    settings.externalEmailLink,
    settings.externalSocialLink,
    settings.externalWorkLink,
    settings.externalStreamingLink,
    settings.externalSearchLink,
    settings.acceleratedModule1Link,
    settings.acceleratedModule2Link,
    settings.acceleratedModule3Link,
    settings.acceleratedModule4Link,
    settings.acceleratedModule5Link
  ];

  if (warmTargets.length === 0) return;

  // Preconnect all module targets
  pbPreconnect(warmTargets);

  // Warm each module target
  warmTargets.forEach(origin => {
    pbPreload(origin);
    pbRealmWarm(origin);
  });

  chrome.runtime.sendMessage({
    type: "PBACC_WARMPATH_EVENT",
    origins: warmTargets
  });

  console.log(
    "%c[PBAccelerator] Module Warm-Boot executed",
    "color:#00C8FF; font-weight:bold;"
  );
}

setInterval(pbWarmBoot, 30000);

// ---------------------------------------------------------------------------
// MESSAGE CHANNEL (buttons optional; auto-nav is primary)
// ---------------------------------------------------------------------------
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || !msg.type) return;

  switch (msg.type) {

    // -------------------------------------------------------
    // NAVIGATION EVENT → automatic acceleration
    // -------------------------------------------------------
    case "PBNAV_EVENT":
      if (msg.url) {
        pbAccelerate(msg.url);
      }
      sendResponse({ ok: true });
      break;

    // -------------------------------------------------------
    // Manual hooks (DevOverlay / popup) — optional
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
      sendResponse({ ok: true });
      break;

    case "PBACC_GPUWARM":
      pbGPUWarm();
      sendResponse({ ok: true });
      break;

    case "PBACC_DECODEWARM":
      pbDecodeWarm();
      sendResponse({ ok: true });
      break;

    case "PBACC_REALMWARM":
      if (msg.origin) pbRealmWarm(msg.origin);
      sendResponse({ ok: true });
      break;

    case "PBACC_WARMPATH_EVENT":
      if (Array.isArray(msg.origins)) pbWarmPaths(msg.origins);
      sendResponse({ ok: true });
      break;

    case "PBACC_WARMPATH":
      if (msg.origin) pbWarmPath(msg.origin);
      sendResponse({ ok: true });
      break;

    case "PBACC_ACCELERATE":
      if (msg.url) pbAccelerate(msg.url);
      sendResponse({ ok: true });
      break;

    case "PBACC_HOME_WARMBOOT":
      pbHomeWarmBoot();
      sendResponse({ ok: true });
      break;
  }
});

// ============================================================================
//  SECTION 2 — SETTINGS (Full OS Registry)
// ============================================================================
const PB_DEFAULT_SETTINGS2 = {
  enableInterceptor: true,
  enableAccelerator: true,
  enableNavigator: true,
  enableRouter: true,
  enablePulseGPU: true,
  enablePulseDecode: true,
  enableContentRuntime: true,
  enableDevOverlay: true,

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

  experimentalGPUPaths: false,
  experimentalDecodePaths: false,
  experimentalRouteGraph: false,
  experimentalPredictivePrefetch: true,
  experimentalAIWarmPath: false,
  experimentalTemporalNavigation: false,
  experimentalQuantumRouting: false,
  experimentalPortalTransitions: false,
  experimentalMeshAwareness: false,

  homeUniverse: [
    "pulseworld.me",
    "pulseworld.net",
    "pulseworld.money",
    "pulseworld.biz",
    "binaryos.net",
    "booleanlogic.net",
    "gpuprocessing.net",
    "serviceworker.net",
    "orbitalmap.net"
  ]
};

function pbLoadSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(PB_DEFAULT_SETTINGS2, (data) => {
      resolve(data || PB_DEFAULT_SETTINGS2);
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
    chrome.runtime.sendMessage({ type: "PBACC_ACCELERATE", url });
  }

  return {};
}

// ============================================================================
//  SECTION 5 — NAVIGATOR (Tab Physics)
// ============================================================================
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const S = await pbLoadSettings();
  if (!S.enableNavigator) return;
  if (changeInfo.status !== "complete" || !tab.url) return;

  const url = tab.url;
  const origin = new URL(url).origin;
  const domainClass = S.homeUniverse.some((d) => url.includes(d)) ? "PulseWorld" : "WWW";

  PulseRealmState.lastURL = url;
  PulseRealmState.lastDomainClass = domainClass;
  PulseRealmState.navHistory.push(url);

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

  // Existing accel hook
  if (domainClass === "PulseWorld") {
    chrome.runtime.sendMessage({ type: "PBACC_ACCELERATE", url });
  }

  chrome.runtime.sendMessage({
    type: "PBNAV_EVENT",
    tabId,
    url,
    domainClass,
    ts: Date.now()
  });

});

// ============================================================================
//  SECTION 6 — MESSAGE BUS (Popup + Content + DevTools)
// ============================================================================
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || !msg.type) return;

  switch (msg.type) {
    
    case "GET_CACHE_LIST":
      (async () => {
        try {
          const cacheNames = await caches.keys();
          sendResponse({ ok: true, caches: cacheNames });
        } catch (err) {
          sendResponse({ ok: false, error: err.toString() });
        }
      })();

      return true; // ⭐ REQUIRED for async response
  
    case "PULSE_OS_PING":
      PulseRealmState.lastPing = Date.now();
      sendResponse({ ok: true, ts: PulseRealmState.lastPing });
      break;

    case "PULSE_OS_CLEAR_PULSE_CACHES":
      clearPulseCaches().then(() => sendResponse({ ok: true }));
      PulseRealmState = {
        lastPing: Date.now(),
        lastPage: null,
        lastURL: null,
        lastDomainClass: null,
        bands: {},
        navHistory: [],
        perfEntries: [],
        mutationCount: 0,
        imagesDecoded: 0,
        gpuWarmCount: 0,
        warmPathsTriggered: 0,
        warmAssetsTriggered: 0,
        flags: {
          hudActive: true,
          contentRuntimeActive: true,
          acceleratorActive: true,
          routerActive: true,
          navigatorActive: true
        }
      };
      return true;

    // ---------------------------------------------------------
    // PERFORMANCE EVENTS (from PBContent)
    // ---------------------------------------------------------
    case "PBCONTENT_PERF":
      PulseRealmState.perfEntries = msg.entries || [];
      PulseRealmState.perfLastNavigation = msg.ts || Date.now();
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // MUTATION EVENTS (from PBContent)
    // ---------------------------------------------------------
    case "PBCONTENT_MUTATION":
      PulseRealmState.mutationCount += msg.count || 0;
      PulseRealmState.lastMutationTS = msg.ts || Date.now();
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // GPU WARM-PATH (from PBContent / PBAccelerator)
    // ---------------------------------------------------------
    case "PBCONTENT_GPUWARM":
      PulseRealmState.gpuWarmCount++;
      sendResponse({ ok: true });
      break;

    case "PBCONTENT_GPUWARM_EXTRA":
      PulseRealmState.gpuWarmCount++;
      sendResponse({ ok: true });
      break;
    // ---------------------------------------------------------
    // IMAGE DECODE WARM-PATH (from PBContent)
    // ---------------------------------------------------------
    case "PBCONTENT_DECODEWARM":
      PulseRealmState.imagesDecoded++;
      sendResponse({ ok: true });
      break;

    case "PBCONTENT_DECODEWARM_EXTRA":
      PulseRealmState.imagesDecoded++;
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // WARM-PATH TRIGGERED (from PBAccelerator)
    // ---------------------------------------------------------
    case "PBACC_WARMPATH_EVENT":
      PulseRealmState.warmPathsTriggered++;
      sendResponse({ ok: true });
      break;

    case "PBACC_WARMPATH":
      PulseRealmState.warmPathsTriggered++;
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // ASSET WARM-PATH TRIGGERED
    // ---------------------------------------------------------
    case "PBACC_ASSETWARM_EVENT":
      PulseRealmState.warmAssetsTriggered++;
      sendResponse({ ok: true });
      break;

    case "PBACC_ASSETWARM":
      PulseRealmState.warmAssetsTriggered++;
      sendResponse({ ok: true });
      break;

    case "PB_ASSET_LIST":
      PulseRealmState.warmAssetsTriggered++;
      sendResponse({ ok: true });
      break;

    case "PBACC_ACCELERATE":
      if (msg.url) {
        const origin = new URL(msg.url).origin;
        const origins = [origin];
        chrome.runtime.sendMessage({ type: "PBACC_WARMPATH_EVENT", origins });
        if (typeof PBUniversalBoost2?.warmOrigin === "function") {
          PBUniversalBoost2.warmOrigin(origin);
        }
      }
      sendResponse({ ok: true });
      break;
      
    case  "PBNAV_OPEN_PULSEWORLD":
      chrome.tabs.create({ url: msg.url || "https://www.pulseworld.net" });
      sendResponse({ ok: true });
      break;

    case "PBREALM_UPDATE":
      PulseRealmState.lastPage = msg.page || PulseRealmState.lastPage;
      PulseRealmState.bands = msg.bands || PulseRealmState.bands;
      PulseRealmState.lastPing = Date.now();
      sendResponse({ ok: true });
      break;

    case "PBREALM_GET":
      sendResponse({ ok: true, state: PulseRealmState });
      break;

    case "PBSETTINGS_GET":
      pbLoadSettings().then((settings) => sendResponse({ ok: true, settings }));
      return true;

    case "PBSETTINGS_SET":
      pbSaveSettings(msg.settings || {}).then(() => sendResponse({ ok: true }));
      return true;
    
    case "PBCONSOLE_SET":
      pbSaveConsole(msg.console || {}).then(() => sendResponse({ ok: true }));
      return true;
    
    case "PBCONSOLE_GET":
      pbLoadConsole().then((console) => sendResponse({ ok: true, console }));
      return true;

    case "PBDEV_STATUS":
      pbLogKernelStatus();
      sendResponse({ ok: true });
      break;

    // -------------------------------------------------------
    // PBQuantumPrefetch — hover prefetch from content
    // -------------------------------------------------------
    case "PB_HOVER_PREFETCH":
      if (msg.href && typeof PBQuantumPrefetch?.prefetchLink === "function") {
        const links = [msg.href];
        pbPreconnect(links);
        PBQuantumPrefetch.prefetchLink();
        console.log("Quantum Prefetching Enabled: " + msg.href);
      }      
      sendResponse?.({ ok: true });
      break;

    // -------------------------------------------------------
    // PBAssetCollector — asset list from content
    // -------------------------------------------------------
    case "PB_ASSET_LIST":
      try {
        const origin = new URL(msg.pageUrl).origin;

        if (typeof PBGlobalAssetMap?.scanAndWarm === "function") {
          PBGlobalAssetMap.scanAndWarm(origin, msg.assets || []);
        }

        if (typeof PBTemporalCache?.noteAsset === "function") {
          (msg.assets || []).forEach(a => PBTemporalCache.noteAsset(origin, a));
        }
      } catch (_) {}
      sendResponse?.({ ok: true });
      break;

    // -------------------------------------------------------
    // Warm-path trigger from content
    // -------------------------------------------------------
    case "PBCONTENT_WARMPATH":
      try {
        const origin = new URL(msg.url).origin;
        if (typeof PBUniversalBoost2?.warmOrigin === "function") {
          PBUniversalBoost2.warmOrigin(origin);
        }
      } catch (_) {}
      sendResponse?.({ ok: true });
      break;

    // -------------------------------------------------------
    // Realm full update from content
    // -------------------------------------------------------
    case "PBREALM_UPDATE_FULL":
      PulseRealmState.lastPage = msg.page || PulseRealmState.lastPage;
      PulseRealmState.lastURL = msg.url || PulseRealmState.lastURL;
      PulseRealmState.bands = msg.bands || PulseRealmState.bands;
      PulseRealmState.lastPing = Date.now();
      sendResponse?.({ ok: true });
      break;

    default:
      console.log("[PULSEWORLD OS KERNEL] Navigation Event:", msg);
  }
});

// ============================================================================
//  SECTION 7 — CACHE CONTROL
// ============================================================================
async function clearPulseCaches() {
  const keys = await caches.keys();
  for (const key of keys) {
    if (key.includes("Pulse")) {
      await caches.delete(key);
      console.log("%c[PULSEWORLD OS KERNEL] Deleted Cache: " + key,
        "color:#FF5555; font-weight:bold;");
    }
  }
}

// ============================================================================
//  SECTION 8 — DEVTOOLS
// ============================================================================
function pbLogKernelStatus() {
  console.log("%c[PBDevTools] Kernel Status @ " + new Date().toISOString(),
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
      if (origin.startsWith(prefix)) {
        
        return;
      }
    }

    // ⭐ Only warm http/https origins
    if (!origin.startsWith("http://") && !origin.startsWith("https://")) {
      
      return;
    }

    const paths = ["/", "/index.html", "/home", "/about", "/contact", "/manifest.json"];
    const assets = ["/main.js", "/bundle.js", "/app.js", "/styles.css", "/app.css", "/engine.wasm"];

    const urls = []
      .concat(paths.map((p) => origin + p))
      .concat(assets.map((p) => origin + p));

    for (const url of urls) {
      try {
        fetch(url, { cache: "force-cache" }).catch(() => {});
      } catch (_) {}
    }

    console.log("[PBUniversalBoost2] Warmed publish directory for", origin, urls);
  },

  async warmTab(tab) {
    if (!tab || !tab.url) return;
    try {
      const origin = new URL(tab.url).origin;
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
  prefetchDelayMs: 250,

  attachToDocument() {
    document.addEventListener("mouseover", (e) => {
      const a = e.target.closest("a[href]");
      if (!a) return;
      this.lastHoverLink = a.href;
      const link = [a.href];
      pbPreconnect(link);
      if (this.hoverTimeout) clearTimeout(this.hoverTimeout);
      this.hoverTimeout = setTimeout(() => this.prefetchLink(), this.prefetchDelayMs);
    });
  },

  prefetchLink() {
    const href = this.lastHoverLink;
    if (!href) return;
    try {
      fetch(href, { cache: "force-cache" }).catch(() => {});
      console.log("[PBQuantumPrefetch] Prefetched hovered link:", href);
    } catch (_) {}
  }
};

// Example content script usage (PBContent.js):
// PBQuantumPrefetch.attachToDocument(document);


// ============================================================================
//  PBTemporalCache.js — Time-aware warm caching (session memory)
// ============================================================================

const PBTemporalCache = {
  history: [],
  assets: new Map(), // key: origin, value: Set of asset URLs
  maxHistory: 200,

  noteNavigation(url) {
    if (!url) return;
    this.history.push({ url, ts: Date.now() });
    if (this.history.length > this.maxHistory) this.history.shift();
  },

  noteAsset(origin, assetUrl) {
    if (!origin || !assetUrl) return;
    if (!this.assets.has(origin)) this.assets.set(origin, new Set());
    this.assets.get(origin).add(assetUrl);
  },

  async warmRecentAssets(origin) {
    if (!origin || !this.assets.has(origin)) return;
    const set = this.assets.get(origin);
    for (const url of set) {
      try {
        fetch(url, { cache: "force-cache" }).catch(() => {});
      } catch (_) {}
    }
    PulseRealmState.warmAssetsTriggered = PulseRealmState.warmAssetsTriggered + set.size;
    broadcastRealmState();
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

  scanAndWarm(origin, resourceList = []) {
    if (!origin) return;

    const urlsToWarm = [];

    for (const res of resourceList) {
      if (!res || typeof res !== "string") continue;
      if (this.commonAssetPatterns.some((re) => re.test(res))) {
        urlsToWarm.push(res);
      }
    }

    for (const url of urlsToWarm) {
      try {
        fetch(url, { cache: "force-cache" }).catch(() => {});
      } catch (_) {}
    }
    PulseRealmState.warmAssetsTriggered = PulseRealmState.warmAssetsTriggered + urlsToWarm.length;
    broadcastRealmState();
    console.log("[PBGlobalAssetMap] Warmed predicted assets for", origin, urlsToWarm.length);
  }
};

// Example usage:
// From content script, collect <script src>, <link href>, <img src> and send to kernel.
// Kernel: PBGlobalAssetMap.scanAndWarm(origin, resourceList);

// ============================================================================
//  END OF KERNEL
// ============================================================================
console.log("%c[PULSEWORLD OS KERNEL] Ultra Edition Ready (12 subsystems online)",
  "color:#00FF9C; font-weight:bold;");
