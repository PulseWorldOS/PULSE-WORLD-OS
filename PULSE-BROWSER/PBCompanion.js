// ============================================================================
//  PBCompanion.js — PulseBrowser OS Kernel (Ultra Edition v12.0)
//  Manifest V3 Service Worker — full OS kernel
//  Subsystems: Interceptor • Router • Navigator • Accelerator • Realm • Settings • DevTools
// ============================================================================
let nowSW = new Date().toLocaleString();
const CACHE_NAME = "PulseBrowser-Companion";
let PulseRealmSettings = null;
let PulseBrowserSettings = null;

// Persistent favicon cache stored in chrome.storage.local
// Local in-memory mirror for speed
let PBFAVICON_CACHE = {};

// Load cache from storage at startup
chrome.storage.local.get(["PulseBrowserFaviconCaches1"], (res) => {
  if (res.PulseBrowserFaviconCaches1) {
    PBFAVICON_CACHE = res.PulseBrowserFaviconCaches1;
    console.log("PulseBrowser OS Accelerated Modules Icon List: ", PBFAVICON_CACHE);
  }
});



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

function saveCache() {
  chrome.storage.local.set({ PulseBrowserFaviconCaches1: PBFAVICON_CACHE });
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
  enablePulseGPU: true,
  enablePulseDecode: true,
  enableContentRuntime: true,
  enableDevOverlay: true,
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
  experimentalPredictivePrefetch: true,
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
    "%c[PULSEWORLD OS KERNEL] Installed",
    "color:#00FF9C; font-weight:bold; font-family:monospace;"
  );
  
  const PRELOAD_URLS = [
    "PBFrontPage.html",
    "PBPopup.html",
    "PBSettings.html",
    "PulseWorldAuthority.html",
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
  await pbModuleWarmBoot();
  await pbHomeWarmBoot();
}


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

console.log("[PULSEWORLD OS KERNEL] Initializing PulseWorld with Accelerated Modules:", now);

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
      "%c[PULSEWORLD OS KERNEL] SAVED FAVICON LOCATED: " + host,
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
      || origin.includes("peace-smoke-shop")
      || origin.includes("fordfamilymanagement");
}

// ---------------------------------------------------------------------------
// DOMAIN CLASSIFIER
// ---------------------------------------------------------------------------
function pbDomainClass(url) {
  for (const domain of PB_HOMES) {
    if (url.includes(domain)) return "PulseWorld";
  }
  if (IsPartner(url)) return "Partner";
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
  const domainClass = pbDomainClass(url);
  
  if (!url.includes("chrome:")) {
    PulseRealmState.lastURL = url;
    PulseRealmState.lastPage = page;
    PulseRealmState.lastDomainClass = domainClass;
    PulseRealmState.lastTitle = title;
    PulseRealmState.navHistory.push(url);
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
    PulseRealmState.lastURL = url;
    PulseRealmState.lastDomainClass = domainClass;
    PulseRealmState.warmPathsTriggered += 1;
    PulseRealmState.lastWarmOrigin = origin;
    PulseRealmState.navHistory.push(url);
    PB_LOG2.info("PBNAV_EVENT", url);
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
    if (!url) continue;

    // ⭐ Skip permanently failed URLs
    if (fails[url] >= 2 && !isPulseWorld(url)) {
      continue;
    }

    try {
      const res = await fetch(url, { cache: "force-cache" }).catch(() => null);

      if (res && res.status === 404) {
        fails[url] = (fails[url] || 0) + 1;

        if (fails[url] >= 2 && !isPulseWorld(url)) {
          await chrome.storage.local.set({ pb_fail_cache: fails });
        }
      } else {
        warmedCount++;
      }
    } catch (_) {}
  }

  // ⭐ Save updated fail-cache
  await chrome.storage.local.set({ pb_fail_cache: fails });

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
    if (!url) continue;

    // ⭐ Skip permanently failed URLs
    if (fails[url] >= 2 && !isPulseWorld(url)) {
      continue;
    }

    try {
      const res = await fetch(url, { cache: "force-cache" }).catch(() => null);

      if (res && res.status === 404) {
        fails[url] = (fails[url] || 0) + 1;

        if (fails[url] >= 2 && !isPulseWorld(url)) {
          await chrome.storage.local.set({ pb_fail_cache: fails });
        }
      } else {
        warmedCount++;
      }
    } catch (_) {}
  }

  // ⭐ Save updated fail-cache
  await chrome.storage.local.set({ pb_fail_cache: fails });

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
  const urls = [
    origin + "/index.html",
    origin + "/404.html",
    origin + "/"
  ];
  pbPrefetch(urls);
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

  if (!PulseBrowserSettings) PulseBrowserSettings = await getSettings();

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
  const origin = new URL(url).origin;

  console.log("%c[PBAccelerator] Accelerate:", "color:#00C8FF;", url, "class:", domainClass);

  if (domainClass === "PulseWorld") {
    await pbWarmPath(origin);
  } else {
    if (!PulseBrowserSettings) PulseBrowserSettings = await getSettings();
    // WWW acceleration: preconnect + basic prefetch
    if (PulseBrowserSettings.accelPreconnect) pbPreconnect([origin]);
    if (PulseBrowserSettings.accelPrefetch)   pbPrefetch([origin + "/", origin + "/about"]);
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

    PB_LOG2.load("pbLoadExtensionSettings()", settings);

    return settings;
  } catch (err) {
    console.error("pbLoadExtensionSettings() FAILED", err);
    return {};
  }
}


async function pbModuleWarmBoot() {
  const settings = await pbLoadExtensionSettings();
  PulseRealmSettings = settings;
  pbSaveSettings(PulseRealmSettings);
  // Collect all accelerated module links directly from settings
  const warmTargets = [
    settings.externalBankLink,
    settings.externalEmailLink,
    settings.externalSocialLink,
    settings.externalWorkLink,
    settings.externalStreamingLink,
    settings.externalShoppingLink,
    settings.externalSearchLink,
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
    console.log("[PBWarmBootLoop] Next warm in", interval, "ms");

    setTimeout(loop, interval);
  }

  setTimeout(loop, 600);
}

startWarmBootLoop();

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

let __PULSE_CACHE_FILE = null;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || !msg.type) return;

  switch (msg.type) {
    case "PULSE_OS_NOTIFY":
      console.log("%c[PULSEWORLD CONTENT] Kernel Notification:",
        "color:#00C8FF; font-family:monospace;", msg.text);
      break;
    
    case "PBEXTSETTINGS_GET":
      pbLoadExtensionSettings().then((settings) => {
        sendResponse({ ok: true, settings });
      });
      return true;

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
      if (msg.url) pbAccelerate(msg.url);
      PulseRealmState.lastURL = msg.url;
      PulseRealmState.lastDomainClass = msg.domainClass;
      PulseRealmState.warmPathsTriggered += 1;
      let origin = new URL(msg.url).origin
      PulseRealmState.lastWarmOrigin = origin;
      PulseRealmState.navHistory.push(msg.url);
      PulseRealmState.navEvents.push(msg);
      PB_LOG2.info("PBNAV_EVENT", msg.url);
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
      }
      PB_LOG2.info("PBACC_REALMWARM", msg.origin);
      sendResponse({ ok: true });
      break;

    case "PBACC_WARMPATH_EVENT":
      if (Array.isArray(msg.origins)) {
        pbWarmPaths(msg.origins);
        // 🔥 Realm + HUD integration
        PulseRealmState.warmPathsTriggered += msg.origins.length || 1;
      }
      PB_LOG2.info("PBACC_WARMPATH_EVENT", msg.origins);
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
      }
      PB_LOG2.info("FIRSTPOST_WARMPATH_EVENT", msg.origins);
      sendResponse({ ok: true });
      break;

    case "PBACC_WARMPATH_EXTERNAL":
      PulseRealmState.warmPathsTriggered += msg.count || 1;
      sendResponse({ ok: true });
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
      }
      PB_LOG2.info("PBACC_WARMPATH", origin);
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
      }
      PB_LOG2.info("PBACC_ACCELERATE", origin);
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
          const cacheDetails = [];

          for (const name of cacheNames) {
            try {
              const cache = await caches.open(name);
              const requests = await cache.keys();
              const count = requests.length;
              const currentCache = CACHE_NAME;

              // ⭐ Compute total cache size
              let totalBytes = 0;
              for (const req of requests) {
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

              const sizeMB = parseFloat((totalBytes / (1024 * 1024)).toFixed(2));
              const density = count / (sizeMB || 1);

              // ⭐ Diversity (unique hosts)
              const diversity = new Set(requests.map(r => {
                try { return new URL(r.url).hostname; }
                catch { return "unknown"; }
              })).size;

              // ⭐ Weight class (unchanged)
              let weightClass = "Very Small";
              if (count > 100) weightClass = "Light";
              if (count > 500) weightClass = "Medium";
              if (count > 1000) weightClass = "Heavy";
              if (count > 2000) weightClass = "Massive";

              // ⭐ Raw PulseScore
              const rawPulse =
                (density * 2) +
                (diversity * 3) +
                (count / 50) -
                (sizeMB / 10);

              // ⭐ Final PulseScore (0–100)
              const pulseScore = Math.max(0, Math.min(100, Math.floor(rawPulse)));
              let pulseTier = "Quiet Load";
              if (pulseScore >= 20) pulseTier = "Light Sway";
              if (pulseScore >= 40) pulseTier = "Moderate Push";
              if (pulseScore >= 60) pulseTier = "High Speed";
              if (pulseScore >= 80) pulseTier = "Blazing Fast";
              
              // ⭐ Personality (style)
              let personality = "Silent Ghost";
              if (density > 50) personality = "Astral Explorer";
              else if (density > 20) personality = "Active Voyager";
              else if (density > 10) personality = "Balanced Traveler";
              else if (density > 5) personality = "Calm Wanderer";

              const pulseRank = `${pulseTier}`;

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
                firstEntry: requests[0]?.url || null,
                lastEntry: requests[count - 1]?.url || null
              });

            } catch (innerErr) {
              cacheDetails.push({
                name,
                entries: null,
                sizeBytes: 0,
                sizeMB: "0.00",
                weightClass: "unknown",
                error: innerErr.toString()
              });
            }
          }

          const payload = {
            ok: true,
            ts,
            totalCaches: cacheNames.length,
            caches: cacheDetails
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

          const req = requests.find(r => r.url === url);

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
      if (msg.time) {
        PulseRealmState.lastPing = new Date().toLocaleString();

        const incoming = msg.time; // realm timestamp

        // If sessionStart doesn't exist yet, set it to the earliest of the two
        if (!PulseRealmState.sessionStart) {
          PulseRealmState.sessionStart = Math.min(nowSW, incoming);
        } else {
          // If sessionStart exists, update it ONLY if the incoming time is earlier
          if (incoming < PulseRealmState.sessionStart) {
            PulseRealmState.sessionStart = incoming;
          }
        }
      }

      sendResponse({ ok: true, ts: PulseRealmState.lastPing });
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
        PBUniversalBoost2?.warmOrigin?.(origin);
        PulseRealmState.warmPathsTriggered += 1;
        PulseRealmState.lastWarmOrigin = origin;
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
      console.log("[PULSEWORLD OS KERNEL] Unknown Event:", msg);
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
  const domainClass = pbDomainClass(url);
  
  if (url.includes("newtab")) {
    url = "impulse://newtab"
    PulseRealmState.lastURL = url;
    PulseRealmState.lastPage = "NewTab";
    PulseRealmState.lastDomainClass = "PulseWorld";
    PulseRealmState.lastTitle = "PulseBrowser OS Console";
  } else {
    PulseRealmState.lastURL = url;
    PulseRealmState.lastPage = page;
    PulseRealmState.lastDomainClass = domainClass;
    PulseRealmState.lastTitle = title;
    PulseRealmState.navHistory.push(url);
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
    PulseRealmState.lastURL = url;
    PulseRealmState.lastDomainClass = domainClass;
    PulseRealmState.warmPathsTriggered += 1;
    PulseRealmState.lastWarmOrigin = origin;
    PulseRealmState.navHistory.push(url);
    PB_LOG2.info("PBNAV_EVENT", url);
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
          "%c[PULSEWORLD OS KERNEL] Deleted Cache: " + key,
          "color:#FF5555; font-weight:bold;"
        );
      } catch (err) {
        console.log(
          "%c[PULSEWORLD OS KERNEL] Failed to Delete Cache: " + key +
          " → " + err.toString(),
          "color:#FF0000; font-weight:bold;"
        );
      }
    } else {
      skipped.push(key);
    }
  }

  // ⭐ Summary log (PulseBrowser OS style)
  console.log("%c[PULSEWORLD OS KERNEL] Cache Purge Summary",
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
  console.log("%c[PBDevTools] Kernel Status @ " + now,
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
      if (origin.startsWith(prefix)) return;
    }

    // ⭐ Only warm http/https origins
    if (!origin.startsWith("http://") && !origin.startsWith("https://")) {
      return;
    }

    const paths = [
      "/", "/index.html", "/home", "/about", "/contact", "/manifest.json"
    ];
    const assets = [
      "/main.js", "/bundle.js", "/app.js", "/styles.css", "/app.css"
    ];

    let warmedCount = 0;

    const urls = []
      .concat(paths.map((p) => origin + p))
      .concat(assets.map((p) => origin + p));

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

          if (fails[url] >= 2) {
            await chrome.storage.local.set({ pb_fail_cache: fails });
          }
        } else {
          warmedCount++;
        }
      } catch (_) {}

      // ⭐ Add delay between warm-fetches
      await sleep(200);   // ← 150–200ms recommended
    }

    // ⭐ Save updated fail-cache
    await chrome.storage.local.set({ pb_fail_cache: fails });

    console.log("[PBUniversalBoost2] Warmed publish directory for", origin);
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
      if (fails[res] >= 2 && !isPulseWorld(res)) {
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
          console.log("[PBGlobalAssetMap] 404 for", url);

          if (fails[url] >= 2 && !isPulseWorld(url)) {
            await chrome.storage.local.set({ pb_fail_cache: fails });
          }
        } else {
          warmedCount++;
        }
      } catch (_) {}
    }

    // ⭐ Save updated fail-cache
    await chrome.storage.local.set({ pb_fail_cache: fails });

    console.log("[PBGlobalAssetMap] Warmed predicted assets for", origin, warmedCount);
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
