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
  sessionStart: null,
  lastPing: null,
  lastPage: null,
  lastURL: null,
  lastTitle: null,
  lastDomainClass: null,
  // Bands (PulseWorld / OS)
  band: "PulseBand",
    // accelBand: null,
    // routerBand: null,
    // gpuBand: null,
    // decodeBand: null,
    // worldBand: null
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

setTimeout(pbWarmBoot, 600);

self.addEventListener("activate", (event) => {
  console.log("%c[PULSEWORLD OS KERNEL] Activated",
    "color:#00FF9C; font-weight:bold; font-family:monospace;");
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const req = event.request;

  // Only cache GET requests
  if (req.method !== 'GET') return;

  // // Skip chrome-extension:// URLs (cannot be cached)
  if (req.url.startsWith('chrome://extensions/')) {
     return; // Let the browser handle extension assets normally
  }

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
let now = new Date().toLocaleString();
console.log("[PULSEWORLD OS KERNEL] Initializing PulseWorld with Accelerated Modules:", now);

const EXTENSION_SETTINGS_KEY = "pulseworldSettings";


// Persistent favicon cache stored in chrome.storage.local
// Local in-memory mirror for speed
let PBFAVICON_CACHE = {};

// Load cache from storage at startup
chrome.storage.local.get(["ModuleFaviconCaches"], (res) => {
  if (res.ModuleFaviconCaches) {
    PBFAVICON_CACHE = res.ModuleFaviconCaches;
  }
});

function saveCache() {
  chrome.storage.local.set({ ModuleFaviconCaches: PBFAVICON_CACHE });
}

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
  try {
    const response = await fetch(iconUrl);
    if (!response.ok) throw new Error("Fetch failed");

    let blob = await response.blob();

    // ⭐ Fallback if blob is empty
    if (!blob || blob.size === 0) {
      console.warn("Empty favicon blob, falling back:", iconUrl);
      PBFAVICON_CACHE[host] = iconUrl;
      saveCache();
      return iconUrl;
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
  const IconURL = icon;

  // ⭐ Strip subdomains unless it's "www"
  const parts = host.split(".");
  if (parts.length > 2) {
    if (parts[0] !== "www") {
      const root = parts.slice(parts.length - 2).join(".");
      icon = `https://${root}/favicon.ico`;
    }
  }

  // ⭐ If cached → return instantly
  if (PBFAVICON_CACHE[host]) {
    icon = await fetchAndStoreIcon(host, IconURL);
    console.log(
      "%c[PULSEWORLD OS KERNEL] SAVED FAVICON LOCATED: " + host,
      "color:#00FF9C; font-weight:bold; font-family:monospace;"
    );
    return PBFAVICON_CACHE[host];
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
      icon = await fetchAndStoreIcon(host, IconURL);
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    if (host.includes("github.com")) {
      icon = "https://github.githubassets.com/favicons/favicon.svg";
      icon = await fetchAndStoreIcon(host, IconURL);
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    if (host.includes("youtube.com")) {
      icon = "https://www.youtube.com/s/desktop/fe2e0b8b/img/favicon_32x32.png";
      icon = await fetchAndStoreIcon(host, IconURL);
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    if (host.includes("discord.com")) {
      icon = "https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico";
      icon = await fetchAndStoreIcon(host, IconURL);
      PBFAVICON_CACHE[host] = icon;
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
      icon = await fetchAndStoreIcon(host, IconURL);

      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    PBFAVICON_CACHE[host] = icon;
    saveCache();
    return icon;

  } catch {
    PBFAVICON_CACHE[host] = icon;
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
// PREFETCH (network warm-path) + Realm counter
// ---------------------------------------------------------------------------
function pbPrefetch(urls = []) {
  urls.forEach((url) => {
    try { fetch(url, { cache: "force-cache" }).catch(() => {}); } catch (_) {}
  });

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
  chrome.runtime.sendMessage({ type: "PBACC_GPUWARM" });
  console.log("%c[PBAccelerator] GPU Warm", "color:#00C8FF;");
}

// ---------------------------------------------------------------------------
// DECODE WARM (image decode warm-path) + Realm counter
// ---------------------------------------------------------------------------
function pbDecodeWarm() {
  chrome.runtime.sendMessage({ type: "PBACC_DECODEWARM" });
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
    "/404", "/about"
  ];

  const siblingURLs = siblingPaths.map((p) => origin + p);
  if (S.accelPrefetch) pbPrefetch(siblingURLs);

  if (S.accelGPUWarm)    pbGPUWarm();
  if (S.accelDecodeWarm) pbDecodeWarm();
  if (S.accelRealmWarm)  pbRealmWarm(origin);
  
  // 🔥 Realm + HUD integration
  PulseRealmState.warmPathsTriggered += 1;
  PulseRealmState.lastWarmOrigin = origin;  

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
    const result = await chrome.storage.local.get([EXTENSION_SETTINGS_KEY]);
    const settings = result[EXTENSION_SETTINGS_KEY] || {};

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

  console.log(
    "%c[PBAccelerator] Module Warm-Boot executed",
    "color:#00C8FF; font-weight:bold;"
  );
}

setInterval(pbWarmBoot, 45000);


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || !msg.type) return;

  switch (msg.type) {

    // -------------------------------------------------------
    // NAVIGATION EVENT → automatic acceleration
    // -------------------------------------------------------
    case "PBNAV_EVENT":
      if (msg.url) pbAccelerate(msg.url);
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
      sendResponse({ ok: true });
      break;

    case "PBACC_GPUWARM":
      PulseRealmState.gpuWarmCount += msg.count || 1;
      sendResponse({ ok: true });
      break;

    case "PBACC_GPUWARM_EXTRA":
      PulseRealmState.gpuWarmCount += msg.count || 1;
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
      }
      sendResponse({ ok: true });
      break;

    case "PBACC_WARMPATH_EVENT":
      if (Array.isArray(msg.origins)) {
        pbWarmPaths(msg.origins);
      }
      sendResponse({ ok: true });
      break;

    case "PBACC_WARMPATH":
      if (msg.origin) {
        pbWarmPath(msg.origin);
      }
      sendResponse({ ok: true });
      break;

    case "PBACC_ACCELERATE":
      if (msg.url) {
        pbAccelerate(msg.url);
        PulseRealmState.warmPathsTriggered += 1;
        PulseRealmState.lastWarmOrigin = msg.url;
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
        try {
          const cacheNames = await caches.keys();
          sendResponse({ ok: true, caches: cacheNames });
        } catch (err) {
          sendResponse({ ok: false, error: err.toString() });
        }
      })();
      return true;

    case "PULSE_OS_PING":
      PulseRealmState.lastPing = new Date().toLocaleString();      
      if (!PulseRealmState.sessionStart) PulseRealmState.sessionStart = now;
      sendResponse({ ok: true, ts: PulseRealmState.lastPing });
      break;

    case "PULSE_OS_CLEAR_PULSE_CACHES":
      clearPulseCaches().then(() => sendResponse({ ok: true }));
      return true;

    // -------------------------------------------------------
    // PERFORMANCE + MUTATION EVENTS
    // -------------------------------------------------------
    case "PBCONTENT_PERF":
      PulseRealmState.perfEntries = msg.entries || [];
      PulseRealmState.perfLastNavigation = msg.ts || now;
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
      PulseRealmState.gpuWarmCount += msg.count || 1;
      sendResponse({ ok: true });
      break;

    case "PBCONTENT_DECODEWARM":
    case "PBCONTENT_DECODEWARM_EXTRA":
      PulseRealmState.imagesDecoded += msg.count || 1;
      sendResponse({ ok: true });
      break;

    // -------------------------------------------------------
    // ASSET WARM-PATH
    // -------------------------------------------------------
    case "PBACC_ASSETWARM_EVENT":
    case "PBACC_ASSETWARM":
      PulseRealmState.warmAssetsTriggered += msg.count || 1;
      sendResponse({ ok: true });
      break;

    // -------------------------------------------------------
    // ACCELERATE → WARM-PATH EVENT (fallback)
    // -------------------------------------------------------
    case "PBACC_ACCELERATE_EVENT":
      if (msg.url) {
        const origin = new URL(msg.url).origin;
        chrome.runtime.sendMessage({
          type: "PBACC_WARMPATH",
          origin
        });
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
      PulseRealmState.lastPage = msg.page || PulseRealmState.lastPage;
      PulseRealmState.lastPing = new Date().toLocaleString();
      sendResponse({ ok: true });
      break;

    case "PBREALM_GET":
      sendResponse({ ok: true, state: PulseRealmState });
      break;

    // -------------------------------------------------------
    // SETTINGS + CONSOLE
    // -------------------------------------------------------
    case "PBSETTINGS_GET":
      pbLoadSettings().then(settings => sendResponse({ ok: true, settings }));
      return true;

    case "PBSETTINGS_SET":
      pbSaveSettings(msg.settings || {}).then(() => sendResponse({ ok: true }));
      return true;

    case "PBCONSOLE_SET":
      pbSaveConsole(msg.console || {}).then(() => sendResponse({ ok: true }));
      return true;

    case "PBCONSOLE_GET":
      pbLoadConsole().then(console => sendResponse({ ok: true, console }));
      return true;

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
      if (msg.href && typeof PBQuantumPrefetch?.prefetchLink === "function") {
        pbPreconnect([msg.href]);
        PBQuantumPrefetch.prefetchLink();
      }
      sendResponse({ ok: true });
      break;

    // -------------------------------------------------------
    // ASSET LIST (content)
    // -------------------------------------------------------
    case "PB_ASSET_LIST_CONTENT":
      try {
        const origin = new URL(msg.pageUrl).origin;

        PBGlobalAssetMap?.scanAndWarm?.(origin, msg.assets || []);
        (msg.assets || []).forEach(a => PBTemporalCache?.noteAsset?.(origin, a));
        PulseRealmState.warmAssetsTriggered += msg.assets.length || 1;
        PulseRealmState.imagesDecoded += msg.decodeCount || 1;
      } catch (_) {}
      sendResponse({ ok: true });
      break;

    // -------------------------------------------------------
    // ASSET LIST (Frontpage)
    // -------------------------------------------------------
    case "PB_ASSET_LIST_FRONT":
      try {
        const originfile = new URL(msg.pageUrl).origin + "/PBFrontPage.html";
        PBGlobalAssetMap?.scanAndWarm?.(originfile, msg.assets || []);
        (msg.assets || []).forEach(a => PBTemporalCache?.noteAsset?.(originfile, a));
        PulseRealmState.warmAssetsTriggered += msg.assets.length || 1;
        PulseRealmState.imagesDecoded += msg.decodeCount || 1;
      } catch (_) {}
      sendResponse({ ok: true });
      break;

    // -------------------------------------------------------
    // CONTENT WARM-PATH
    // -------------------------------------------------------
    case "PBCONTENT_WARMPATH":
      try {
        const origin = new URL(msg.url).origin;
        PBUniversalBoost2?.warmOrigin?.(origin);
      } catch (_) {}
      sendResponse({ ok: true });
      break;

    // -------------------------------------------------------
    // FULL REALM UPDATE
    // -------------------------------------------------------
    case "PBREALM_UPDATE_FULL":
      PulseRealmState.lastPage = msg.page || PulseRealmState.lastPage;
      PulseRealmState.lastURL = msg.url || PulseRealmState.lastURL;
      PulseRealmState.lastTitle = msg.title || PulseRealmState.lastTitle;
      PulseRealmState.lastPing = new Date().toLocaleString();
      sendResponse({ ok: true });
      break;

    default:
      console.log("[PULSEWORLD OS KERNEL] Unknown Event:", msg);
  }
});


// ============================================================================
//  SECTION 2 — SETTINGS (Full OS Registry)
// ============================================================================
const PB_SW_SETTINGS = {
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
        PulseRealmState.warmAssetsTriggered += 1;
      } catch (_) {}
    }
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
