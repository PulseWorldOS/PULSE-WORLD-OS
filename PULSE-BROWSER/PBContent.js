// ============================================================================
//  PBContent.js — PulseBrowser OS DOM Runtime (Ultra Edition v10.0)
//  Full DOM physics engine: warm-path, GPU, decode, mutation, performance,
//  realm sync, HUD, world-band extraction, kernel bridge.
// ============================================================================
let HudOffline = false;

console.log("%c[PULSEWORLD CONTENT] PBContent.js (Ultra Edition v10.0) injected",
  "color:#00C8FF; font-weight:bold; font-family:monospace;");

// ---------------------------------------------------------------------------
// 1. KERNEL HANDSHAKE
// ---------------------------------------------------------------------------
chrome.runtime.sendMessage({ type: "PULSE_OS_PING" }, (response) => {
  if (chrome.runtime.lastError) return;
  console.log("%c[PULSEWORLD CONTENT] Kernel handshake:",
    "color:#00C8FF; font-family:monospace;", response);
});


// ---------------------------------------------------------------------------
// 5. DECODE WARM-PATH (images) — SAFE VERSION
// ---------------------------------------------------------------------------

// Warm decode function (unchanged)
function warmImageDecode(img) {
  if (!img || !img.complete) return;
  try {
    img.decode().catch(() => {});
  } catch (_) {}
}

// Safe startup wrapper
(function safeWarmPathStart() {
  // Start immediately if DOM is already interactive or complete
  if (document.readyState !== "loading") {
    startWarmPath();
    return;
  }

  // Otherwise start ASAP, not at DOMContentLoaded
  startWarmPath();

  // And also run again at DOMContentLoaded for late images
  document.addEventListener("DOMContentLoaded", startWarmPath);
})();


function startWarmPath() {
  // If body still doesn't exist, retry shortly
  if (!document.body) {
    setTimeout(startWarmPath, 50);
    return;
  }

  // Run warm decode on existing images
  document.querySelectorAll("img").forEach(warmImageDecode);

  // MutationObserver for future images
  const imgObserver = new MutationObserver(() => {
    document.querySelectorAll("img").forEach(warmImageDecode);
  });

  imgObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// ---------------------------------------------------------------------------
// 2. HUD INJECTION (DevOverlay) — SAFE VERSION
// ---------------------------------------------------------------------------
(function safeInjectHUD() {
  if (
      location.protocol === "chrome:" ||
      location.href.startsWith("chrome://") ||
      location.protocol === "chrome-extension:" || HudOffline === true
    ) {
      return;
    }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectHUD);
  } else {
    injectHUD();
  }
})();

function injectHUD() {
  const STREAMING_SITES = [
    "netflix.com","hulu.com","disneyplus.com","primevideo.com",
    "amazon.com","hbomax.com","max.com","paramountplus.com",
    "peacocktv.com","crunchyroll.com","youtube.com","twitch.tv"
  ];

  if (document.getElementById("pulsebrowser-dev-overlay")) return;
  if (!document.body) return setTimeout(injectHUD, 50);

  if (STREAMING_SITES.some(d => location.hostname.includes(d))) {
    console.warn("PulseBrowser HUD Disabled on Streaming Site:", location.hostname);
    const flag = document.getElementById("pulseworld-flag");
    flag.textContent = "PulseBrowser OS Active [HUD Offline]";
    HudOffline === true;
    return;
  }

  const wrap = document.createElement("div");
  wrap.id = "pulsebrowser-dev-overlay";
  wrap.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    width: 260px;
    background: rgba(0,0,0,0.85);
    color: #00FF9C;
    font-family: monospace;
    font-size: 11px;
    padding: 12px 16px;
    border:1px solid #0FF;
    border-radius: 40px;
    z-index: 999999999;
    pointer-events: none;
    backdrop-filter: blur(4px);
  `;
  
  wrap.innerHTML = `
    <div style="font-weight:600; color:#0FF; margin-bottom:4px;"><b>🌐 PulseWorld OS Browser HUD</b></div>
    <div id="pb-hud-body"></div>
  `;

  document.body.appendChild(wrap);


  updateHUD();
  setInterval(updateHUD, 1500);
  setInterval(fadeHUD, 5500);
}
function fadeHUD() {
  const body = document.getElementById("pb-hud-body");
  const wrap = document.getElementById("pulsebrowser-dev-overlay");
  if (!body) return;
  if (!wrap) return;
  wrap.style.display = "none";
  body.style.display = "none";
}
function updateHUD() {
  const body = document.getElementById("pb-hud-body");
  if (!body) return;
  if (
      location.protocol === "chrome:" ||
      location.href.startsWith("chrome://") ||
      location.protocol === "chrome-extension:"
    ) {
      return;
    }
  chrome.runtime.sendMessage({ type: "PBREALM_GET" }, (realmRes) => {
    chrome.runtime.sendMessage({ type: "PBSETTINGS_GET" }, (settingsRes) => {

      const realm = realmRes.state || {};
      const settings = settingsRes.settings || {};

      // ---------------------------------------------
      // ⭐ DOM & LOAD TIMES
      // ---------------------------------------------
      let nav = performance.getEntriesByType("navigation")[0];
      let domTime = nav ? Math.round(nav.domContentLoadedEventEnd) :
        Math.round(performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart);

      let loadTime = nav ? Math.round(nav.loadEventEnd) :
        Math.round(performance.timing.loadEventEnd - performance.timing.navigationStart);

      // ---------------------------------------------
      // ⭐ WORKLOAD CALCULATION (KB)
      // ---------------------------------------------
      const workloadKB =
        (realm.mutationCount * 0.002) +        // DOM mutations
        (realm.gpuWarmCount * 50) +            // GPU warm cost
        (realm.imagesDecoded * 20) +           // decode warm cost
        (realm.warmPathsTriggered * 200);      // warm-path cost
      const workloadMB = workloadKB / 1024;

      // ---------------------------------------------
      // ⭐ OPS/ms (operations per millisecond)
      // ---------------------------------------------
      const ops = realm.mutationCount +
                  realm.gpuWarmCount +
                  realm.imagesDecoded +
                  realm.warmPathsTriggered +
                  realm.warmAssetsTriggered;

      const opsPerMs = domTime > 0 ? (ops / domTime).toFixed(2) : "-";

      // ---------------------------------------------
      // ⭐ Pulse Efficiency Index (PEI)
      // ---------------------------------------------
      const PEI = domTime > 0 ? (workloadKB / domTime).toFixed(2) : "-";

      // ---------------------------------------------
      // ⭐ Refresh Classification
      // ---------------------------------------------
      const refreshType =
        domTime < 100 ? "🔥 HOT REFRESH" :
        domTime < 200 ? "🌡️ WARM REFRESH" :
        domTime < 400 ? "💨 COOL REFRESH" :
        "🧊 COLD REFRESH";

      const currentEngine = location.hostname.toLowerCase();
      let engineDescriptor = "-No Local Site Info Yet-";

      // SEARCH ENGINES
      if (currentEngine.includes("google") && !currentEngine.includes("mail")) {
        engineDescriptor = "Simple • Direct • Fast";
      }

      else if (currentEngine.includes("pulseworld")) {
        engineDescriptor = "Universal • Open • Neutral";
      }

      else if (currentEngine.includes("bing")) {
        engineDescriptor = "Bright • Visual • Structured";
      }

      else if (currentEngine.includes("yahoo")) {
        engineDescriptor = "Deep • Dense • Historical";
      }

      else if (currentEngine.includes("duckduckgo")) {
        engineDescriptor = "Private • Quiet • Minimal";
      }

      else if (currentEngine.includes("baidu")) {
        engineDescriptor = "Local • Rich • Cultural";
      }

      else if (currentEngine.includes("yandex")) {
        engineDescriptor = "Broad • Versatile • Regional";
      }

      else if (currentEngine.includes("ask")) {
        engineDescriptor = "Friendly • Question‑Focused";
      }


      // EVERYDAY SITES (YouTube, Amazon, Gmail, OneDrive, etc.)

      else if (currentEngine.includes("youtube")) {
        engineDescriptor = "Visual • Social • Infinite";
      }

      else if (currentEngine.includes("amazon")) {
        engineDescriptor = "Massive • Shopping • Universal";
      }

      else if (currentEngine.includes("gmail") || (currentEngine.includes("mail") && currentEngine.includes("google"))) {
        engineDescriptor = "Clean • Organized • Reliable";
      }

      else if (currentEngine.includes("outlook") || currentEngine.includes("live")) {
        engineDescriptor = "Structured • Professional • Connected";
      }

      else if (currentEngine.includes("onedrive")) {
        engineDescriptor = "Cloud • Sync • Seamless";
      }

      else if (currentEngine.includes("office") || currentEngine.includes("microsoft")) {
        engineDescriptor = "Productive • Unified • Modern";
      }

      else if (currentEngine.includes("reddit")) {
        engineDescriptor = "Chaotic • Social • Endless";
      }

      else if (currentEngine.includes("facebook")) {
        engineDescriptor = "Social • Connected • Familiar";
      }

      else if (currentEngine.includes("twitter") || currentEngine.includes("x.com")) {
        engineDescriptor = "Fast • Conversational • Trending";
      }

      else if (currentEngine.includes("instagram")) {
        engineDescriptor = "Visual • Social • Curated";
      }

      else if (currentEngine.includes("tiktok")) {
        engineDescriptor = "Short • Viral • Energetic";
      }

      else if (currentEngine.includes("wikipedia")) {
        engineDescriptor = "Open • Neutral • Informational";
      }

      else if (currentEngine.includes("netflix")) {
        engineDescriptor = "Streaming • Immersive • Endless";
      }

      else if (currentEngine.includes("spotify")) {
        engineDescriptor = "Music • Personalized • Continuous";
      }

      else if (currentEngine.includes("ebay")) {
        engineDescriptor = "Auction • Marketplace • Varied";
      }

      else if (currentEngine.includes("linkedin")) {
        engineDescriptor = "Professional • Networked • Career";
      }


      // ---------------------------------------------
      // PulseWorld URL / Hashtag Splitter
      // ---------------------------------------------
      let displayURL = realm.lastURL || "-";
      let displayPage = realm.lastPage || "-";

      if (displayURL.includes("pulseworld") && displayURL.includes("#")) {
        const [base, hash] = displayURL.split("#");

        // base URL goes to URL field
        displayURL = base;

        // hashtag becomes the Page identity
        displayPage = hash || displayPage;
      }

      // ---------------------------------------------
      // ⭐ HUD OUTPUT
      // ---------------------------------------------
      body.innerHTML = `
        <font color="#0FF">Current World:</font> <font color="white">${currentEngine}</font><br/>
        <font color="#0FF">About:</font> <font color="gold">${engineDescriptor}</font><br/>
        <font color="#0FF">Last Page:</font> ${displayPage}<br/>
        <font color="#0FF">Last URL:</font> ${displayURL}<br/>
        <font color="#0FF">Domain:</font> ${realm.lastDomainClass || "-"}<br/>
        <font color="#0FF">Ping:</font> ${realm.lastPing || "-"}<br/>
        <hr style="border:0;border-top:1px solid #0FF;margin:6px 0;">
        <b><font color="white">Local PulseBrowser Tab Stats</font></b><br/>
        <font color="#0FF">PageReady:</font> ${domTime}ms<br/>
        <font color="#0FF">PageLoad:</font> ${loadTime}ms<br/>
        <font color="#0FF">Type:</font> ${refreshType}<br/>
        <hr style="border:0;border-top:1px solid #0FF;margin:6px 0;">
        <b><font color="white">Global PulseBrowser OS Stats</font></b><br/>
        <font color="#0FF">Pulse Ops/MS:</font> ${opsPerMs}<br/>
        <font color="#0FF">Pulse Efficiency:</font> ${PEI}<br/>
        <font color="#0FF">Workload:</font> ${workloadMB.toFixed(2)} MB<br/>
        <font color="#0FF">Mutations:</font> ${realm.mutationCount}<br/>
        <font color="#0FF">GPUWarm:</font> ${realm.gpuWarmCount}<br/>
        <font color="#0FF">DecodeWarm:</font> ${realm.imagesDecoded}<br/>
        <font color="#0FF">WarmPaths:</font> ${realm.warmPathsTriggered}<br/>
        <font color="#0FF">TS:</font> <font color="white">${new Date().toLocaleTimeString()}</font>
      `;
    });
  });
}

// ---------------------------------------------------------------------------
// 3. DOM MUTATION PHYSICS
// ---------------------------------------------------------------------------
let pendingMutations = 0;
let lastSend = 0;

const mutationObserver = new MutationObserver((mutations) => {
  pendingMutations += mutations.length;

  const now = performance.now();

  
  if (
    location.protocol === "chrome:" ||
    location.href.startsWith("chrome://") ||
    location.protocol === "chrome-extension:"
  ) {
    return;
  }

  if (now - lastSend > 50) {
    chrome.runtime.sendMessage({
      type: "PBCONTENT_MUTATION",
      count: pendingMutations,
      ts: Date.now()
    });
    pendingMutations = 0;
    lastSend = now;
  }
});

mutationObserver.observe(document.documentElement, {
  childList: true,
  subtree: true
});



// ---------------------------------------------------------------------------
// 4. PERFORMANCE PHYSICS
// ---------------------------------------------------------------------------
const perfObserver = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  if (
      location.protocol === "chrome:" ||
      location.href.startsWith("chrome://") ||
      location.protocol === "chrome-extension:"
    ) {
      return;
    }
  chrome.runtime.sendMessage({
    type: "PBCONTENT_PERF",
    ts: Date.now(),
    entries: entries.map((e) => ({
      name: e.name,
      duration: e.duration,
      initiatorType: e.initiatorType,
    })),
  });
});
perfObserver.observe({ entryTypes: ["resource", "navigation"] });


// ---------------------------------------------------------------------------
// 6. GPU WARM-PATH (canvas + video)
// ---------------------------------------------------------------------------
function warmGPU() {
  const canvases = document.querySelectorAll("canvas");
  const videos = document.querySelectorAll("video");

  canvases.forEach((c) => {
    try { c.getContext("webgl") || c.getContext("webgl2"); } catch (_) {}
  });

  videos.forEach((v) => {
    try { v.play().catch(() => {}); } catch (_) {}
  });

  chrome.runtime.sendMessage({ type: "PBCONTENT_GPUWARM" });
}

setTimeout(warmGPU, 500);

// ---------------------------------------------------------------------------
// 7. WORLD-BAND EXTRACTION (PulseWorld OS)
// ---------------------------------------------------------------------------
function extractWorldBands() {
  const bands = {};

  document.querySelectorAll("[data-band]").forEach((el) => {
    const name = el.getAttribute("data-band");
    bands[name] = bands[name] || 0;
    bands[name]++;
  });

  return bands;
}

// ---------------------------------------------------------------------------
// 8. PAGE CONTEXT EMITTER (Realm sync)
// ---------------------------------------------------------------------------
function emitPageContext() {
  chrome.runtime.sendMessage({
    type: "PBREALM_UPDATE",
    page: location.pathname,
    bands: extractWorldBands(),
  });
}
emitPageContext();

// ---------------------------------------------------------------------------
// 9. KERNEL MESSAGE LISTENER
// ---------------------------------------------------------------------------
chrome.runtime.onMessage.addListener((msg) => {
  if (!msg || !msg.type) return;

  switch (msg.type) {

    case "PULSE_OS_NOTIFY":
      console.log("%c[PULSEWORLD CONTENT] Kernel Notification:",
        "color:#00C8FF; font-family:monospace;", msg.text);
      break;

    case "PBACC_GPUWARM":
      warmGPU();
      break;

    case "PBACC_DECODEWARM":
      document.querySelectorAll("img").forEach(warmImageDecode);
      break;

    case "PBNAV_EVENT":
      console.log("%c[PULSEWORLD CONTENT] Navigation Event:",
        "color:#00C8FF; font-family:monospace;", msg);
      break;
  }
});

// ---------------------------------------------------------------------------
// HOME UNIVERSE (Your 9 domains)
// ---------------------------------------------------------------------------
const PB_HOME = [
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

// ---------------------------------------------------------------------------
// DOMAIN CLASSIFIER
// ---------------------------------------------------------------------------
function pbDomainClass(url) {
  for (const domain of PB_HOME) {
    if (url.includes(domain)) return "PulseWorld";
  }
  return "WWW";
}

document.addEventListener("PulseDocumentChanged", (ev) => {
  chrome.runtime.sendMessage({
    type: "PBNAV_EVENT",
    url: location.href,
    page: ev.detail.page,
    file: ev.detail.file,
    domainClass: pbDomainClass(location.href),
    ts: Date.now()
  });
});

// ---------------------------------------------------------------------------
// 10. BRANDING FLAG
// ---------------------------------------------------------------------------
(function safeInjectPulseFlag() {
  if (
      location.protocol === "chrome:" ||
      location.href.startsWith("chrome://") ||
      location.protocol === "chrome-extension:"
    ) {
      return;
    }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectPulseFlag);
  } else {
    injectPulseFlag();
  }
})();

function injectPulseFlag() {
  const STREAMING_SITES = [
    "netflix.com","hulu.com","disneyplus.com","primevideo.com",
    "amazon.com","hbomax.com","max.com","paramountplus.com",
    "peacocktv.com","crunchyroll.com","youtube.com","twitch.tv"
  ];

  const flag = document.createElement("div");
  flag.id = "pulseworld-flag";
  flag.style.cssText = `
    position: fixed;
    bottom: 10px;
    left: 30px;
    background: #00FF9C;
    color: black;
    font-weight: 600;
    padding: 6px 10px;
    font-size: 12px;
    font-family: monospace;
    border-radius: 4px;
    z-index: 999999999;
    opacity: 0.85;
  `;
  flag.textContent = "PulseBrowser OS Active";
  
  if (STREAMING_SITES.some(d => location.hostname.includes(d))) {
    flag.textContent = "PulseBrowser OS Active [HUD Offline]";
    flag.style.background = "#00C8FF";
    HudOffline = true;
    console.log("HUD Offline");
  }

  flag.onclick = () => {
    const body = document.getElementById("pb-hud-body");
    const wrap = document.getElementById("pulsebrowser-dev-overlay");
        
    if (body.style.display === "none") {
      wrap.style.display = "block";
      body.style.display = "block";
      flag.textContent = "PulseBrowser OS Active";
      flag.style.background = "#00FF9C";
      HudOffline = false;
    } else {
      wrap.style.display = "none";
      body.style.display = "none";
      flag.textContent = "PulseBrowser OS Active [HUD Offline]";
      flag.style.background = "#00C8FF";
      HudOffline = true;
      console.log("HUD Offline");
    }
  };

  document.body.appendChild(flag);
}

// ============================================================================
// 11. PBQuantumPrefetchContent — Hover Prefetch (Content → Kernel)
// ============================================================================

const PBQuantumPrefetchContent = {
  lastHover: null,
  hoverDelay: 200,
  hoverTimer: null,

  attach(doc = document) {
    doc.addEventListener("mouseover", (e) => {
      const a = e.target.closest("a[href]");
      if (!a) return;

      this.lastHover = a.href;

      if (this.hoverTimer) clearTimeout(this.hoverTimer);
      this.hoverTimer = setTimeout(() => {
        chrome.runtime.sendMessage({
          type: "PB_HOVER_PREFETCH",
          href: this.lastHover
        });
      }, this.hoverDelay);
    });
  }
};

PBQuantumPrefetchContent.attach(document);


// ============================================================================
// 12. PBAssetCollectorContent — Collect scripts/styles/images → Kernel
// ============================================================================

function collectPageAssets() {
  const assets = [];

  // Scripts
  document.querySelectorAll("script[src]").forEach(el => assets.push(el.src));

  // Stylesheets
  document.querySelectorAll("link[rel='stylesheet'][href]").forEach(el => assets.push(el.href));

  // Images
  document.querySelectorAll("img[src]").forEach(el => assets.push(el.src));

  chrome.runtime.sendMessage({
    type: "PB_ASSET_LIST",
    pageUrl: location.href,
    assets
  });
}

setTimeout(collectPageAssets, 50);

document.addEventListener("DOMContentLoaded", collectPageAssets);


// ============================================================================
// 13. PBContentWarmPaths — DOM-side warm-path triggers (signals only)
// ============================================================================

function triggerWarmPaths() {
  chrome.runtime.sendMessage({
    type: "PBCONTENT_WARMPATH",
    ts: Date.now(),
    url: location.href
  });
}

setTimeout(triggerWarmPaths, 300);


// ============================================================================
// 14. PBContentGPUWarm++ — Additional GPU warm triggers
// ============================================================================

function gpuWarmExtra() {
  document.querySelectorAll("canvas, video").forEach(el => {
    try { el.getContext?.("webgl") || el.getContext?.("webgl2"); } catch (_) {}
    try { el.play?.().catch(() => {}); } catch (_) {}
  });

  chrome.runtime.sendMessage({ type: "PBCONTENT_GPUWARM_EXTRA" });
}

setTimeout(gpuWarmExtra, 1200);


// ============================================================================
// 15. PBContentDecodeWarm++ — Aggressive decode warm
// ============================================================================

function decodeWarmExtra() {
  document.querySelectorAll("img").forEach(img => {
    try { img.decode?.().catch(() => {}); } catch (_) {}
  });

  chrome.runtime.sendMessage({ type: "PBCONTENT_DECODEWARM_EXTRA" });
}

setTimeout(decodeWarmExtra, 900);


// ============================================================================
// 16. PBContentRealmSync++ — More accurate page context
// ============================================================================

function emitFullPageContext() {
  chrome.runtime.sendMessage({
    type: "PBREALM_UPDATE_FULL",
    page: location.pathname,
    url: location.href,
    title: document.title,
    bands: extractWorldBands()
  });
}

setTimeout(emitFullPageContext, 400);
