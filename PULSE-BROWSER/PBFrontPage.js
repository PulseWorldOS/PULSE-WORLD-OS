
let userInteracted = false;
let engineType = "text";
let searchEngineActiveLink = null;
let socialMode = "Internal";
let socialMediaActiveLink = null;
let workMode = "Internal";
let workActiveLink = null;
let searchMode = "Internal";
let searchEngineActivated = "*Google.com";
let temporaryLinks = [];
let engineURL = buildSearchURL("google.com");
let url = engineURL;
let PulseRealm = {};
let PulseRealmSettings = null;

const timerBtn = document.getElementById("timerBtn");

// Load saved PulseTabs from extension storage at startup
let pulseTabs = {};

chrome.storage.local.get("pulseTabs", data => {
  if (data && data.pulseTabs) {
    pulseTabs = data.pulseTabs;
  }
});

// ---------------------------------------------------------------------------
// 1. KERNEL HANDSHAKE
// ---------------------------------------------------------------------------
chrome.runtime.sendMessage({ type: "PULSE_OS_PING" }, (response) => {
  if (chrome.runtime.lastError) return;
});

// ============================================================================
// 14. PBContentGPUWarm++ — Additional GPU warm triggers
// ============================================================================

async function gpuWarmExtra() {
  const elements = document.querySelectorAll("canvas, video");
  let count = 0;
  // Warm WebGL + WebGL2 + Canvas2D + Video
  elements.forEach(el => {
    try { 
      el.getContext?.("webgl") || el.getContext?.("webgl2");
      count += 1;
     } catch (_) {}
    try { el.getContext?.("2d"); } catch (_) {}
    try { el.play?.().catch(() => {}); } catch (_) {}
  });

  // Warm WebGPU (if available)
  try {
    if (navigator.gpu) {
      const adapter = await navigator.gpu.requestAdapter();
      if (adapter) {
        const device = await adapter.requestDevice();
        count += 1;
        // Create a tiny GPU workload to warm the queue
        const queue = device.queue;
        const buffer = device.createBuffer({
          size: 4,
          usage: GPUBufferUsage.COPY_DST
        });
        queue.writeBuffer(buffer, 0, new Uint8Array([1, 2, 3, 4]));
      }
    }
  } catch (_) {}

  chrome.runtime.sendMessage({ type: "PBACC_GPUWARM_EXTRA", count });
}


setTimeout(gpuWarmExtra, 900);

// ============================================================================
// 15. PBContentDecodeWarm++ — Aggressive decode warm
// ============================================================================

function collectAndWarmAssetsFront() {
  const assets = [];

  // -------------------------------------------------------
  // 1. Scripts
  // -------------------------------------------------------
  document.querySelectorAll("script[src]").forEach(el => {
    assets.push(el.src);
  });

  // -------------------------------------------------------
  // 2. Stylesheets
  // -------------------------------------------------------
  document.querySelectorAll("link[rel='stylesheet'][href]").forEach(el => {
    assets.push(el.href);
  });

  // -------------------------------------------------------
  // 3. HTML Images
  // -------------------------------------------------------
  const htmlImgs = [...document.querySelectorAll("img[src]")];
  htmlImgs.forEach(el => assets.push(el.src));

  // -------------------------------------------------------
  // 4. CSS Background Images
  // -------------------------------------------------------
  const bgImgs = [...document.querySelectorAll("*")]
    .map(el => getComputedStyle(el).backgroundImage)
    .filter(bg => bg && bg !== "none")
    .map(bg => {
      const match = bg.match(/url\(["']?(.*?)["']?\)/);
      return match ? match[1] : null;
    })
    .filter(Boolean);

  bgImgs.forEach(src => assets.push(src));

  // -------------------------------------------------------
  // 5. Decode Warm (HTML + CSS synthetic)
  // -------------------------------------------------------
  const syntheticImgs = bgImgs.map(src => {
    const img = new Image();
    img.src = src;
    return img;
  });

  const allImgs = [...htmlImgs, ...syntheticImgs];
  const decodeCount = allImgs.length;

  allImgs.forEach(img => {
    try { img.decode?.().catch(() => {}); } catch (_) {}
  });
  
  // -------------------------------------------------------
  // 6. Send unified front‑page report
  // -------------------------------------------------------
  chrome.runtime.sendMessage({
    type: "PB_ASSET_LIST_FRONT",
    pageUrl: location.href,
    assets,
    decodeCount
  });
}

setTimeout(collectAndWarmAssetsFront, 600);

// Normalize identity to domain or subdomain level
function normalizeIdentity(url) {
  try {
    const u = new URL(url);
    return u.origin; // scheme + host (perfect for Gmail, Chase, BridgeBase)
  } catch {
    return url; // fallback
  }
}

function savePulseTabs() {
  chrome.storage.local.set({ pulseTabs });
}

function openNamedTab(name, url) {

  // ⭐ ALWAYS pull latest storage BEFORE using pulseTabs
  chrome.storage.local.get("pulseTabs", data => {
    if (data && data.pulseTabs) {
      pulseTabs = data.pulseTabs;
    }

    // ⭐ Normalize identity
    const identity = normalizeIdentity(url);
    const existing = pulseTabs[identity];

    // Lightweight warm‑state hint (safe, non‑blocking)
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: url
    });

    try {
      fetch(url, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}

    if (existing) {
      chrome.tabs.update(existing, { url, active: true }, tab => {
        if (chrome.runtime.lastError) {
          // Tab no longer exists → recreate it
          chrome.tabs.create({ url }, newTab => {
            pulseTabs[identity] = newTab.id;
            // Universal boost warm-path
            if (typeof PBUniversalBoost?.warmTab === "function") {
              PBUniversalBoost.warmTab(tab);
            }
            savePulseTabs();
          });
        } else {
          // Tab updated successfully
          pulseTabs[identity] = tab.id;
          // Universal boost warm-path
          if (typeof PBUniversalBoost?.warmTab === "function") {
            PBUniversalBoost.warmTab(tab);
          }
          savePulseTabs();
        }
      });
      return;
    }

    // Create new named tab
    chrome.tabs.create({ url }, tab => {
      pulseTabs[identity] = tab.id;
      // Universal boost warm-path
      if (typeof PBUniversalBoost?.warmTab === "function") {
        PBUniversalBoost.warmTab(tab);
      }
      savePulseTabs();
    });
  });
}

// Remove dead tabs from registry
chrome.tabs.onRemoved.addListener((tabId) => {
  for (const identity in pulseTabs) {
    if (pulseTabs[identity] === tabId) {
      delete pulseTabs[identity];
    }
  }
});


// ============================================================================
//  PBUniversalBoost.js — Global SW-like acceleration (publish directory warm)
// ============================================================================

const PBUniversalBoost = {
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
        console.log("[PBUniversalBoost] Skipped forbidden origin:", origin);
        return;
      }
    }

    // ⭐ Only warm http/https origins
    if (!origin.startsWith("http://") && !origin.startsWith("https://")) {
      console.log("[PBUniversalBoost] Skipped non-HTTP origin:", origin);
      return;
    }

    const paths = ["/", "/index.html", "/home", "/about", "/contact", "/manifest.json"];
    const assets = ["/main.js", "/bundle.js", "/app.js", "/styles.css", "/app.css"];

    const urls = []
      .concat(paths.map((p) => origin + p))
      .concat(assets.map((p) => origin + p));

    for (const url of urls) {
      try {
        fetch(url, { cache: "force-cache" }).catch(() => {});
      } catch (_) {}
    }

    console.log("[PBUniversalBoost] Warmed publish directory for", origin, urls);
  },

  async warmTab(tab) {
    if (!tab || !tab.url) return;
    try {
      const origin = new URL(tab.url).origin;
      await PBUniversalBoost.warmOrigin(origin);
    } catch (_) {}
  }
};

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

  // ⭐ Strip subdomains unless it's "www"
  const parts = host.split(".");
  if (parts.length > 2) {
    if (parts[0] !== "www") {
      const root = parts.slice(parts.length - 2).join(".");
      icon = `https://${root}/favicon.ico`;
    }
  }

  
  try {
    // Special cases
    if (host.includes("office.com")) {
      icon = "https://res.cdn.office.net/officehub/images/content/images/unauth-copilotcom/favicon-copilot-brand-refresh-23392c1f66.ico";
      icon = await fetchAndStoreIcon(host, icon);
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    if (host.includes("github.com")) {
      icon = "https://github.githubassets.com/favicons/favicon.svg";
      icon = await fetchAndStoreIcon(host, icon);
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    if (host.includes("youtube.com")) {
      icon = "https://www.youtube.com/s/desktop/fe2e0b8b/img/favicon_32x32.png";
      icon = await fetchAndStoreIcon(host, icon);
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    if (host.includes("discord.com")) {
      icon = "https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico";
      icon = await fetchAndStoreIcon(host, icon);
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    } catch {
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

  // ⭐ If cached → return instantly
  if (PBFAVICON_CACHE[host]) {
    console.log(
      "%c[PULSEWORLD OS KERNEL] SAVED FAVICON LOCATED: " + host,
      "color:#00FF9C; font-weight:bold; font-family:monospace;"
    );
    return PBFAVICON_CACHE[host];
  }


  const PB_HOMES = [
    "pulseworld.me",
    "pulseworld.money",
    "pulseworld.biz",
    "binaryos.net",
    "booleanlogic.net",
    "gpuprocessing.net",
    "serviceworker.net",
    "orbitalmap.net",
    "pulseworld.net"
  ];

  try {
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
      icon = await fetchAndStoreIcon(host, icon);

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


setTimeout(updateModuleIcons, 300);


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


async function pbModuleWarmBoot(settings) {
  const warmTargets = [
    "https://www.pulseworld.net",
    "https://www.pulseworld.me",
    "https://www.pulseworld.money",
    "https://www.pulseworld.biz",
    "https://www.binaryos.net",
    "https://www.booleanlogic.net",
    "https://www.gpuprocessing.net",
    "https://www.serviceworker.net",
    "https://www.orbitalmap.net",
    "https://www.google.com",
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
  ].filter(u => u && u.startsWith("http"));

  if (warmTargets.length === 0) return;

  // Preconnect all module targets
  pbPreconnect(warmTargets);

  chrome.runtime.sendMessage({
    type: "PBACC_WARMPATH_EVENT",
    origins: warmTargets
  });

  console.log(
    "%c[PBAccelerator] Module Warm-Boot executed",
    "color:#00C8FF; font-weight:bold;"
  );
}

let keyIsDown = false;
let keyHoldTimer = null;
let keyHold2Timer = null;

async function updateModuleIcons() {
  const settings = await pbLoadExtensionSettings();
  PulseRealmSettings = settings;
  
  searchEngineActiveLink = settings.externalSearchLink;
  searchMode = settings.searchMode;
  socialMediaActiveLink = settings.externalSocialLink;
  socialMode = settings.socialMode;
  workActiveLink = settings.externalWorkLink;
  workMode = settings.workMode;

  if (settings.searchMode === "internal") {
    engineURL = "https://www.google.com/search?q=";
    searchEngineActivated = "Google.com";
    document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
  } else {
    engineURL = buildSearchURL(settings.externalSearchLink);
  }

  // EMAIL MODULE
  const emailIcon = document.getElementById("moduleEmailIcon");
  if (settings.emailMode === "internal") {
    emailIcon.innerText = "📧";      // your original emoji
    emailIcon.style.backgroundImage = "";
  } else {
    const fav = await getFavicon(settings.externalEmailLink);
    if (fav) {
      emailIcon.innerText = "⚡";
      emailIcon.style.backgroundImage = `url(${fav})`;
      emailIcon.style.backgroundSize = "contain";
      emailIcon.style.backgroundRepeat = "no-repeat";
    }
  }

  // BANK MODULE
  const bankIcon = document.getElementById("moduleBankIcon");
  if (settings.bankMode === "internal") {
    bankIcon.innerText = "🏦";      // your original emoji
    bankIcon.style.backgroundImage = "";
  } else {
    const fav = await getFavicon(settings.externalBankLink);
    if (fav) {
      bankIcon.innerText = "⚡";
      bankIcon.style.backgroundImage = `url(${fav})`;
      bankIcon.style.backgroundSize = "contain";
      bankIcon.style.backgroundRepeat = "no-repeat";
    }
  }

  // SOCIAL MODULE
  const socialIcon = document.getElementById("moduleSocialIcon");
  if (settings.socialMode === "internal") {
    socialIcon.innerText = "🎭";      // your original emoji
    socialIcon.style.backgroundImage = "";
  } else {
    const fav = await getFavicon(settings.externalSocialLink);
    if (fav) {
      socialIcon.innerText = "⚡";
      socialIcon.style.backgroundImage = `url(${fav})`;
      socialIcon.style.backgroundSize = "contain";
      socialIcon.style.backgroundRepeat = "no-repeat";
    }
  }

  // WORK MODULE
  const workIcon = document.getElementById("moduleWorkIcon");
  if (settings.workMode === "internal") {
    workIcon.innerText = "💼";      // your original emoji
    workIcon.style.backgroundImage = "";
  } else {
    const fav = await getFavicon(settings.externalWorkLink);
    if (fav) {
      workIcon.innerText = "⚡";
      workIcon.style.backgroundImage = `url(${fav})`;
      workIcon.style.backgroundSize = "contain";
      workIcon.style.backgroundRepeat = "no-repeat";
    }
  }

  // WORK MODULE
  const streamIcon = document.getElementById("moduleStreamIcon");
  if (settings.streamMode === "internal") {
    streamIcon.innerText = "📺";      // your original emoji
    streamIcon.style.backgroundImage = "";
  } else {
    const fav = await getFavicon(settings.externalStreamingLink);
    if (fav) {
      streamIcon.innerText = "⚡";
      streamIcon.style.backgroundImage = `url(${fav})`;
      streamIcon.style.backgroundSize = "contain";
      streamIcon.style.backgroundRepeat = "no-repeat";
    }
  }

  if (settings.acceleratedModule1Link) {
    const moduleFav1Link = document.getElementById("moduleFav1Link");
    const moduleFav1Icon = document.getElementById("moduleFav1Icon");
    const fav1 = await getFavicon(settings.acceleratedModule1Link);
    if (fav1) {
      moduleFav1Link.innerText = getReadableName(settings.acceleratedModule1Link) + " ";
      moduleFav1Icon.innerText = "⚡";
      moduleFav1Icon.style.backgroundImage = `url(${fav1})`;
      moduleFav1Icon.style.backgroundSize = "contain";
      moduleFav1Icon.style.backgroundRepeat = "no-repeat";
    }
  }


  if (settings.acceleratedModule2Link) {
    const moduleFav2Link = document.getElementById("moduleFav2Link");
    const moduleFav2Icon = document.getElementById("moduleFav2Icon");
    const fav2 = await getFavicon(settings.acceleratedModule2Link);
    if (fav2) {
      moduleFav2Link.innerText = getReadableName(settings.acceleratedModule2Link) + " ";
      moduleFav2Icon.innerText = "⚡";
      moduleFav2Icon.style.backgroundImage = `url(${fav2})`;
      moduleFav2Icon.style.backgroundSize = "contain";
      moduleFav2Icon.style.backgroundRepeat = "no-repeat";
    }
  }


  if (settings.acceleratedModule3Link) {
    const moduleFav3Link = document.getElementById("moduleFav3Link");
    const moduleFav3Icon = document.getElementById("moduleFav3Icon");
    const fav3 = await getFavicon(settings.acceleratedModule3Link);
    if (fav3) {
      moduleFav3Link.innerText = getReadableName(settings.acceleratedModule3Link) + " ";
      moduleFav3Icon.innerText = "⚡";
      moduleFav3Icon.style.backgroundImage = `url(${fav3})`;
      moduleFav3Icon.style.backgroundSize = "contain";
      moduleFav3Icon.style.backgroundRepeat = "no-repeat";
    }
  }


  if (settings.acceleratedModule4Link) {
    const moduleFav4Link = document.getElementById("moduleFav4Link");
    const moduleFav4Icon = document.getElementById("moduleFav4Icon");
    const fav4 = await getFavicon(settings.acceleratedModule4Link);
    if (fav4) {
      moduleFav4Link.innerText = getReadableName(settings.acceleratedModule4Link) + " ";
      moduleFav4Icon.innerText = "⚡";
      moduleFav4Icon.style.backgroundImage = `url(${fav4})`;
      moduleFav4Icon.style.backgroundSize = "contain";
      moduleFav4Icon.style.backgroundRepeat = "no-repeat";
    }
  }

  if (settings.acceleratedModule5Link) {
    const moduleFav5Link = document.getElementById("moduleFav5Link");
    const moduleFav5Icon = document.getElementById("moduleFav5Icon");
    const fav5 = await getFavicon(settings.acceleratedModule5Link);
    if (fav5) {
      moduleFav5Link.innerText = getReadableName(settings.acceleratedModule5Link) + " ";
      moduleFav5Icon.innerText = "⚡";
      moduleFav5Icon.style.backgroundImage = `url(${fav5})`;
      moduleFav5Icon.style.backgroundSize = "contain";
      moduleFav5Icon.style.backgroundRepeat = "no-repeat";
    }
  }

  // Run home warm-boot once when accelerator loads
  pbModuleWarmBoot(settings).catch(() => {});

  const PB_HOMES = [
    "https://www.pulseworld.me",
    "https://www.pulseworld.money",
    "https://www.pulseworld.biz",
    "https://www.binaryos.net",
    "https://www.booleanlogic.net",
    "https://www.gpuprocessing.net",
    "https://www.serviceworker.net",
    "https://www.orbitalmap.net",
    "https://www.pulseworld.net"
  ];

  const Links = [
    "https://www.google.com",
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
  ].filter(u => u && u.startsWith("http"));

  const interval = getWarmInterval(Links, PB_HOMES, temporaryLinks);

  setInterval(pbRefreshWarmDocument, interval);
  

  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    const moduleKeys = ["`","b","m","s","w","t"];
    if (e.repeat) { 
      e.preventDefault();
      // ⭐ If NOT a module key → send key to search box
      if (moduleKeys.includes(key)) {
        keyHold2Timer = setTimeout(() => {
          const searchArea = document.getElementById("searchengineTextbox");
          searchArea.focus();
          searchArea.textContent = "";
        }, 1000);
      }
      return;
    }
    // if (e.target.closest("#search-area")) return;
    keyIsDown = true;
    // SHORT PRESS → CONSOLE KEY (fires immediately)
    pulseConsoleKey(e);
    
    // ⭐ If NOT a module key → send key to search box
    if (moduleKeys.includes(key)) {
      // Start long-press timer
      keyHoldTimer = setTimeout(() => {
        if (keyIsDown) {
          const searchArea = document.getElementById("searchengineTextbox");
          searchArea.focus();
          searchArea.textContent = "";
          pulseTeleportKey(e);
        }
      }, 1500);
    }

  });

  document.addEventListener("keyup", () => {
    keyIsDown = false;
    // ONLY cancel timer — NO logic, NO actions
    if (keyHoldTimer) {
      clearTimeout(keyHoldTimer);
      keyHoldTimer = null;
    }
    if (keyHold2Timer) {
      clearTimeout(keyHold2Timer);
      keyHold2Timer = null;
    }
  });
}

async function pulseConsoleKey(event) {
  const key = event.key.toLowerCase();
  const searchArea = document.getElementById("searchengineTextbox");
  searchArea.focus();
  searchArea.value += key;
}

async function pulseTeleportKey(event) {
  const key = event.key.toLowerCase();
  
  // ⭐ Otherwise: module teleport logic
  let link = "https://www.pulseworld.net";

  if (key === "`") {
    link = "https://www.pulseworld.net";
  } else if (key === "b") {
    link = PulseRealmSettings.externalBankLink;
  } else if (key === "m") {
    link = PulseRealmSettings.externalEmailLink;
  } else if (key === "s") {
    link = PulseRealmSettings.externalSocialLink;
  } else if (key === "w") {
    link = PulseRealmSettings.externalWorkLink;
  } else if (key === "t") {
    link = PulseRealmSettings.externalStreamingLink;
  }

  chrome.runtime.sendMessage({
    type: "PB_HOVER_PREFETCH",
    href: link
  });

  try {
    fetch(link, { mode: "no-cors" }).catch(() => {});
  } catch (_) {}

  await PBUniversalBoost.warmOrigin(link);
  openNamedTab("PulseWorldModule", link);
}


function getReadableName(url) {
  try {
    const u = new URL(url);

    // Remove protocol + www
    let host = u.hostname.replace("www.", "");

    // Remove TLD (.com, .net, etc)
    host = host.split(".")[0];

    // Replace dashes with spaces
    host = host.replace(/[-_]/g, " ");

    // Capitalize each word
    host = host.replace(/\b\w/g, c => c.toUpperCase());

    return host;
  } catch {
    return url;
  }
}

function cleanQuery(query) {
  if (!query) return "";
  return query.replace(/undefined/g, "").trim();
}

function buildSearchURL(engineURL, query) {
  if (query) query = cleanQuery(query);     // ← THIS removes the symbol
  const q = encodeURIComponent(query);
  
  // Normalize URL
  const url = engineURL.toLowerCase();

  // GOOGLE
  if (url.includes("google")) {
    searchEngineActivated = "Google.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://www.google.com/search?q=${q}`;
  }

  // YAHOO
  if (url.includes("yahoo")) {
    searchEngineActivated = "Yahoo.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://search.yahoo.com/search?p=${q}`;
  }

  // DUCKDUCKGO
  if (url.includes("duckduckgo") || url.includes("ddg")) {
    searchEngineActivated = "DuckDuckGo.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://duckduckgo.com/?q=${q}`;
  }

  // BING
  if (url.includes("bing")) {
    searchEngineActivated = "Bing.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://www.bing.com/search?q=${q}`;
  }

  // BRAVE
  if (url.includes("brave")) {
    searchEngineActivated = "Brave.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://search.brave.com/search?q=${q}`;
  }

  // BAIDU (China)
  if (url.includes("baidu")) {
    searchEngineActivated = "Baidu.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://www.baidu.com/s?wd=${q}`;
  }

  // NAVER (Korea)
  if (url.includes("naver")) {
    searchEngineActivated = "Naver.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://search.naver.com/search.naver?query=${q}`;
  }

  // YANDEX (Russia)
  if (url.includes("yandex")) {
    searchEngineActivated = "Yandex.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://yandex.com/search/?text=${q}`;
  }

  // ASK
  if (url.includes("ask")) {
    searchEngineActivated = "Ask.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://www.ask.com/web?q=${q}`;
  }

  // ECOSIA
  if (url.includes("ecosia")) {
    searchEngineActivated = "Ecosia.org";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://www.ecosia.org/search?q=${q}`;
  }

  // QWANT
  if (url.includes("qwant")) {
    searchEngineActivated = "Qwant.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://www.qwant.com/?q=${q}`;
  }

  // Fallback: append query to custom engine
  searchEngineActivated = "*Google.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
  return `https://www.google.com/search?q=${q}`;
}


document.getElementById("searchus").addEventListener("click", (event) => {
  window.location.href = engineURL + encodeURIComponent("pulseworld.net");
});

document.getElementById("navigate").addEventListener("click", () => {
  let text = document.getElementById("searchengineTextbox").textContent.trim();

  // If ANY space exists → not navigation
  if (text.includes(" ")) {
    return; // do nothing
  }

  // Domain or domain + path
  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;

  const isDomainIntent = domainRegex.test(text);

  if (isDomainIntent) {

    const origin = "https://" + text;
    
    if (!temporaryLinks.includes(origin)) {
      temporaryLinks.push(origin);
    }


    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: origin
    });

    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(origin, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}

    openNamedTab("PulseSearchLink", origin);
    // ⭐ PURE DOMAIN → Navigate directly
    // window.location.href = origin;
  }
});



document.getElementById("images").addEventListener("click", (event) => {
  const text = document.getElementById("searchengineTextbox").textContent.trim();
  url = engineURL + encodeURIComponent(text) + "&sca_esv=97ecd86c81018411&hl=en&udm=2&biw=1920&bih=945&sxsrf=APpeQnum89enEMVZATiLWD0yh0mMe6oPJg%3A1788824443834&ei=e0ufas3CMvLMkPIP5PPV2Qw&ved=2ahUKEwiN7Kis0t2WAxVyJkQIHeR5NcsQ4dUDegQIBhAN&uact=5&oq=fsdfsdf&gs_lp=Egtnd3Mtd2l6LWltZyIHZnNkZnNkZjIKEAAYgAQYigUYQzIPEAAYgAQYChgLGLEDGIMBMgUQABiABDIJEAAYgAQYChgLMgkQABiABBgKGAsyBRAAGIAEMgkQABiABBgKGAsyCRAAGIAEGAoYCzIJEAAYgAQYChgLMgkQABiABBgKGAtIqANQAFgAcAF4AJABAJgBAKABAKoBALABALgBA8gBAJgCAaACAZgDAOIDBBgAIF3iAwQYACBe4gMEGAAgX-IDBBgAIGDiAwQYACBh4gMEGAAgYogGAZIHATGgBwCyBwC4BwDCBwMwLjHIBwGACAE&sclient=gws-wiz-img";
  document.getElementById("images").style.backgroundColor = "red";
  document.getElementById("videos").style.backgroundColor = "black";
  document.getElementById("text").style.backgroundColor = "black";
  engineType = "images";
});

document.getElementById("videos").addEventListener("click", (event) => {
  const text = document.getElementById("searchengineTextbox").textContent.trim();
  url = engineURL + encodeURIComponent(text) + "&sca_esv=97ecd86c81018411&udm=7&biw=1920&bih=945&sxsrf=APpeQnuWOgRcMsUytLVkUMU_oHzKtkSHyw%3A1788824889059&ei=OU2fao2bA7TVkPIP4qfi4AI&ved=2ahUKEwjNm8-A1N2WAxW0KkQIHeKTGCwQ4dUDegQIBRAM&uact=5&oq=canva&gs_lp=EhZnd3Mtd2l6LW1vZGVsZXNzLXZpZGVvIgVjYW52YTIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwA0iuAVAAWABwAXgBkAEAmAEAoAEAqgEAsAEAuAEDyAEAmAIBoAICmAMA4gMEGAAgXeIDBBgAIF7iAwQYACBf4gMEGAAgYOIDBBgAIGHiAwQYACBiiAYBkAYIkgcBMaAHALIHALgHAMIHAzAuMcgHAYAIAQ&sclient=gws-wiz-modeless-video";
  document.getElementById("videos").style.backgroundColor = "red";
  document.getElementById("images").style.backgroundColor = "black";
  document.getElementById("text").style.backgroundColor = "black";
  engineType = "videos";
});

document.getElementById("text").addEventListener("click", (event) => {
  const text = document.getElementById("searchengineTextbox").textContent.trim();
  url = buildSearchURL(engineURL, text);
  document.getElementById("text").style.backgroundColor = "red";
  document.getElementById("images").style.backgroundColor = "black";
  document.getElementById("videos").style.backgroundColor = "black";
  engineType = "text";
});

document.getElementById("search").addEventListener("click", (event) => {
  let text = document.getElementById("searchengineTextbox").textContent.trim();

  // Remove spaces just in case (e.g., "gmail . com")
  const cleaned = text.replace(/\s+/g, "");

  // Domain-only regex: matches "gmail.com", "pulseworld.net", "example.co.uk", etc.
  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Check if the cleaned text is *exactly* a domain
  const isPureDomain = domainRegex.test(cleaned);

  if (isPureDomain) {
    const origin = "https://" + cleaned;
    
    if (!temporaryLinks.includes(origin)) {
      temporaryLinks.push(origin);
    }

    
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: origin
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(origin, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}

    // ⭐ PURE DOMAIN → Navigate directly
    openNamedTab("PulseSearchLink", origin);
    // window.location.href = origin;
    return;
  }

  // ⭐ NOT a pure domain → treat as search
  if (engineType === "videos") {
    url = engineURL + encodeURIComponent(text) +
      "&sca_esv=97ecd86c81018411&udm=7&biw=1920&bih=945";
  } else if (engineType === "images") {
    url = engineURL + encodeURIComponent(text) +
      "&sca_esv=97ecd86c81018411&hl=en&udm=2&biw=1920&bih=945";
  } else {
    url = engineURL + encodeURIComponent(text);
  }

  openNamedTab("PulseSearchLink", url);
  // window.location.href = url;
});


document.getElementById("searchengineTextbox").addEventListener("input", () => {
  let text = document.getElementById("searchengineTextbox").textContent.trim();
  const navigateIcon = document.getElementById("navigate");

  // If ANY space exists → it's a search query
  if (text.includes(" ")) {
    navigateIcon.style.display = "none";
    if (engineType === "videos") {
      document.getElementById("videos").style.backgroundColor = "red";
    } else if (engineType === "images") {
      document.getElementById("images").style.backgroundColor = "red";
    } else {
      document.getElementById("text").style.backgroundColor = "red";
    }
    return;
  }

  // Domain or domain + path (no spaces allowed)
  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;

  const isDomainIntent = domainRegex.test(text);

  if (isDomainIntent) {
    const origin = "https://" + text;
        
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: origin
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(origin, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}

    navigateIcon.style.display = "inline";
    navigateIcon.style.backgroundColor = "red";
    if (engineType === "videos") {
      document.getElementById("videos").style.backgroundColor = "black";
    } else if (engineType === "images") {
      document.getElementById("images").style.backgroundColor = "black";
    } else {
      document.getElementById("text").style.backgroundColor = "black";
    }
  } else {
    navigateIcon.style.display = "none";
    if (engineType === "videos") {
      document.getElementById("videos").style.backgroundColor = "red";
    } else if (engineType === "images") {
      document.getElementById("images").style.backgroundColor = "red";
    } else {
      document.getElementById("text").style.backgroundColor = "red";
    }
  }
});


document.getElementById("searchengineTextbox").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    let text = document.getElementById("searchengineTextbox").textContent.trim();

    // Domain or domain + path
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;
    const isDomainIntent = domainRegex.test(text);

    let url;

    if (isDomainIntent) {
      const origin = "https://" + text;
      
      if (!temporaryLinks.includes(origin)) {
        temporaryLinks.push(origin);
      }

    
      chrome.runtime.sendMessage({
        type: "PB_HOVER_PREFETCH",
        href: origin
      });
      // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
      try {
        fetch(origin, { mode: "no-cors" }).catch(() => {});
      } catch (_) {}

      // ⭐ PURE DOMAIN → Navigate directly
      openNamedTab("PulseSearchLink", origin);
      // window.location.href = origin;
      return;
    }

    // Fallback: search
    if (engineType === "videos") {
      url = engineURL + encodeURIComponent(text) + "&udm=7";
    } else if (engineType === "images") {
      url = engineURL + encodeURIComponent(text) + "&udm=2";
    } else {
      url = engineURL + encodeURIComponent(text);
    }

    openNamedTab("PulseSearchLink", url);
    // window.location.href = url;
  }
});



document.getElementById("moduleEmail").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

    console.log("[FrontPage] Email module clicked. Settings:", settings);

    // INTERNAL MODE → open PulseWorld Email on the real domain
    if (settings.emailMode === "internal") {
        const internalURL = "https://www.pulseworld.net?Impulse=PulseWorldEmail";
        console.log("[FrontPage] Opening Internal PulseMail:", internalURL);
        chrome.runtime.sendMessage({
          type: "PB_HOVER_PREFETCH",
          href: internalURL
        });
        // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
        try {
          fetch(internalURL, { mode: "no-cors" }).catch(() => {});
        } catch (_) {}
        await PBUniversalBoost.warmOrigin(internalURL);
        openNamedTab("PulseEmail", internalURL);
        // chrome.tabs.create({ url: internalURL });
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.externalEmailLink?.trim() || "https://mail.google.com/";

    console.log("[FrontPage] Opening External Email Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}    
    await PBUniversalBoost.warmOrigin(link);
    openNamedTab("PulseEmail", link);
});


document.getElementById("moduleBank").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

    console.log("[FrontPage] Bank module clicked. Settings:", settings);

    // INTERNAL MODE → open PulseWorld Bank on the real domain
    if (settings.bankMode === "internal") {
        const internalURL = "https://www.pulseworld.net?Impulse=PulseWorldRewards";
        console.log("[FrontPage] Opening Internal PulseBank:", internalURL);
        chrome.runtime.sendMessage({
          type: "PB_HOVER_PREFETCH",
          href: internalURL
        });
        // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
        try {
          fetch(internalURL, { mode: "no-cors" }).catch(() => {});
        } catch (_) {}
        await PBUniversalBoost.warmOrigin(internalURL);
        openNamedTab("PulseBank", internalURL);
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.externalBankLink?.trim() || "https://www.bankofamerica.com/";

    console.log("[FrontPage] Opening External Bank Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    await PBUniversalBoost.warmOrigin(link);
    openNamedTab("PulseBank", link);
});


document.getElementById("moduleSocial").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

    console.log("[FrontPage] Social Media module clicked. Settings:", settings);

    // INTERNAL MODE → open PulseWorld on the real domain
    if (settings.socialMode === "internal") {
        const internalURL = "https://www.pulseworld.net?Impulse=PulseWorldMessenger";
        console.log("[FrontPage] Opening Internal PulseMessenger:", internalURL);
        chrome.runtime.sendMessage({
          type: "PB_HOVER_PREFETCH",
          href: internalURL
        });
        // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
        try {
          fetch(internalURL, { mode: "no-cors" }).catch(() => {});
        } catch (_) {}
        await PBUniversalBoost.warmOrigin(internalURL);
        openNamedTab("PulseSocial", internalURL);
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.externalSocialLink?.trim() || "https://www.facebook.com/";

    console.log("[FrontPage] Opening External Social Media Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    await PBUniversalBoost.warmOrigin(link);
    openNamedTab("PulseSocial", link);
});

document.getElementById("moduleWork").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

    console.log("[FrontPage] Work module clicked. Settings:", settings);

    // INTERNAL MODE → open PulseWorld Work on the real domain
    if (settings.workMode === "internal") {
        const internalURL = "https://www.pulseworld.biz";
        console.log("[FrontPage] Opening Internal PulseWork:", internalURL);
        chrome.runtime.sendMessage({
          type: "PB_HOVER_PREFETCH",
          href: internalURL
        });
        // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
        try {
          fetch(internalURL, { mode: "no-cors" }).catch(() => {});
        } catch (_) {}
        await PBUniversalBoost.warmOrigin(internalURL);
        openNamedTab("PulseWork", internalURL);
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.externalWorkLink?.trim() || "https://www.pulseworld.net/";

    console.log("[FrontPage] Opening External Work Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    await PBUniversalBoost.warmOrigin(link);
    openNamedTab("PulseWork", link);
});

document.getElementById("moduleStream").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

    console.log("[FrontPage] Streaming module clicked. Settings:", settings);

    // INTERNAL MODE → open PulseWorld Streaming on the real domain
    if (settings.streamMode === "internal") {
        const internalURL = "https://www.netflix.com";
        console.log("[FrontPage] Opening Internal Netflix:", internalURL);
        chrome.runtime.sendMessage({
          type: "PB_HOVER_PREFETCH",
          href: internalURL
        });
        // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
        try {
          fetch(internalURL, { mode: "no-cors" }).catch(() => {});
        } catch (_) {}
        await PBUniversalBoost.warmOrigin(internalURL);
        openNamedTab("PulseStream", internalURL);
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.externalStreamingLink?.trim() || "https://www.netflix.com";

    console.log("[FrontPage] Opening External Streaming Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    await PBUniversalBoost.warmOrigin(link);
    openNamedTab("PulseStream", link);
});


document.getElementById("moduleFav1").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

    console.log("[FrontPage] moduleFav1Icon module clicked. Settings:", settings);

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.acceleratedModule1Link?.trim() || "https://www.onedrive.com/";

    console.log("[FrontPage] Opening External moduleFav1Icon Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    await PBUniversalBoost.warmOrigin(link);
    openNamedTab("PulseModule1", link);
});


document.getElementById("moduleFav2").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

    console.log("[FrontPage] moduleFav2Icon module clicked. Settings:", settings);

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.acceleratedModule2Link?.trim() || "https://www.office.com/";

    console.log("[FrontPage] Opening External moduleFav2Icon Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    await PBUniversalBoost.warmOrigin(link);
    openNamedTab("PulseModule2", link);
});


document.getElementById("moduleFav3").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

    console.log("[FrontPage] moduleFav3Icon module clicked. Settings:", settings);

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.acceleratedModule3Link?.trim() || "https://www.amazon.com/";

    console.log("[FrontPage] Opening External moduleFav3Icon Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    await PBUniversalBoost.warmOrigin(link);
    openNamedTab("PulseModule3", link);
});


document.getElementById("moduleFav4").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

    console.log("[FrontPage] moduleFav4Icon module clicked. Settings:", settings);

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.acceleratedModule4Link?.trim() || "https://www.coinbase.com/";

    console.log("[FrontPage] Opening External moduleFav4Icon Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    await PBUniversalBoost.warmOrigin(link);
    openNamedTab("PulseModule4", link);
});


document.getElementById("moduleFav5").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

    console.log("[FrontPage] moduleFav5Icon module clicked. Settings:", settings);

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.acceleratedModule5Link?.trim() || "https://www.bridgebase.com/";

    console.log("[FrontPage] Opening External moduleFav5Icon Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    await PBUniversalBoost.warmOrigin(link);
    openNamedTab("PulseModule5", link);
});

const images = [
  "PulseWorldEntrancePulseGPUPulseEarn.png",
  "PulseWorldRoute.png",
  "PulseWorldExpansion.png",
  "PulseAIPulseMeshPulsePal.png",
  "PulseBankPulseIdentityPulseVault.png",
  "PulseToolsPulseTrustPulseProxy.png"
];

let index = 0;
const nebula = document.getElementById("nebula");

// Any interaction cancels redirect
["keydown", "mousedown", "pointerdown", "touchstart", "input", "focus"].forEach(evt => {
  window.addEventListener(evt, () => {
    userInteracted = true;
  }, { once: true });
});
window.addEventListener("blur", () => {
  userInteracted = true;
  document.getElementById("subtitle").style.color = "yellow"
  document.getElementById("subsubtitle").style.color = "yellow"
}, { once: true });

let timerX = 0;
document.getElementById("timerBtn").textContent = timerX;

setInterval(() => {
  timerX++;
  document.getElementById("timerBtn").textContent = timerX;
  if (!userInteracted && timerX === 61) {
    window.location.href = "https://www.pulseworld.net";
    timerX = 0;
  } else if (userInteracted) {
    document.getElementById("timerBtn").style.display = "none";
    timerX = 0;
  }
}, 1000);

  function swap() {
    nebula.style.opacity = 0;
    setTimeout(() => {
      nebula.style.backgroundImage = `url(${images[index]})`;
      nebula.style.opacity = 0.65;
      index = (index + 1) % images.length;
    }, 1500);
  }
  
  setInterval(swap, 15000);
      
  const ENTERPRISE_DOMAINS = [
    "microsoft.com",
    "office.com",
    "live.com",
    "outlook.com",
    "azure.com",
    "login.microsoftonline.com",
    "okta.com",
    "google.com",
    "workspace.google.com"
  ];

  function isEnterpriseURL(url) {
    try {
      const host = new URL(url).hostname;
      return ENTERPRISE_DOMAINS.some(domain => host.includes(domain));
    } catch {
      return false;
    }
  }

  function getWarmInterval(links, homes, temp) {
    const allTargets = [...links, ...homes, ...temp];
    const hasEnterprise = allTargets.some(url => isEnterpriseURL(url));
    return hasEnterprise ? 45000 : 30000; // 15s for enterprise, 8s for normal
  }

  async function pbRefreshWarmDocument() {
    // ---------------------------------------------------------------------------
    // 1. KERNEL HANDSHAKE
    // ---------------------------------------------------------------------------
    chrome.runtime.sendMessage({ type: "PULSE_OS_PING" }, (response) => {
      if (chrome.runtime.lastError) return;
    });
    const now = new Date().toLocaleString();
    console.log("[FrontPage] Refreshing PulseWorld with Accelerated Modules:", now);

    PulseRealmSettings = await pbLoadExtensionSettings();

    const PB_HOMES = [
      "https://www.pulseworld.me",
      "https://www.pulseworld.money",
      "https://www.pulseworld.biz",
      "https://www.binaryos.net",
      "https://www.booleanlogic.net",
      "https://www.gpuprocessing.net",
      "https://www.serviceworker.net",
      "https://www.orbitalmap.net",
      "https://www.pulseworld.net",
    ];

    const Links = [
      "https://www.google.com",
      PulseRealmSettings.externalBankLink,
      PulseRealmSettings.externalEmailLink,
      PulseRealmSettings.externalSocialLink,
      PulseRealmSettings.externalWorkLink,
      PulseRealmSettings.externalStreamingLink,
      PulseRealmSettings.externalSearchLink,
      PulseRealmSettings.acceleratedModule1Link,
      PulseRealmSettings.acceleratedModule2Link,
      PulseRealmSettings.acceleratedModule3Link,
      PulseRealmSettings.acceleratedModule4Link,
      PulseRealmSettings.acceleratedModule5Link
    ].filter(u => u && u.startsWith("http"));

    collectAndWarmAssetsFront();

    const container = document.getElementById("pbWarmContainer");
    if (!container) return;

    container.innerHTML = "";

    PB_HOMES.forEach(url => {      
      container.insertAdjacentHTML("beforeend", `<link rel="preconnect" href="${url}">`);
    });

    Links.forEach(url => {
      container.insertAdjacentHTML("beforeend", `<link rel="preconnect" href="${url}">`);
    });

    temporaryLinks.forEach(url => {
      container.insertAdjacentHTML("beforeend", `<link rel="preconnect" href="${url}">`);
    });

    if (PB_HOMES.length > 0) pbPreconnect(PB_HOMES);
    if (Links.length > 0) pbPreconnect(Links);
    if (temporaryLinks.length > 0) pbPreconnect(temporaryLinks);

    chrome.runtime.sendMessage({
      type: "PBACC_WARMPATH_EVENT",
      origins: PB_HOMES
    });

  }

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      // ---------------------------------------------------------------------------
      // 1. KERNEL HANDSHAKE
      // ---------------------------------------------------------------------------
      chrome.runtime.sendMessage({ type: "PULSE_OS_PING" }, (response) => {
        if (chrome.runtime.lastError) return;
      });
      // Force Chrome to rebuild the GPU layer
      const body = document.body;

      // Add a temporary class that breaks the stale GPU layer
      body.classList.add("pulse-gpu-reset");

      // Remove it on the next frame so the repaint happens cleanly
      requestAnimationFrame(() => {
        body.classList.remove("pulse-gpu-reset");
      });
    }
  });

  