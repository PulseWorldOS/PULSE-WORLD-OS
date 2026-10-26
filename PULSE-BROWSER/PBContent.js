// ============================================================================
//  PBContent.js — PulseBrowser OS DOM Runtime (Ultra Edition v10.0)
//  Full DOM physics engine: warm-path, GPU, decode, mutation, performance,
//  realm sync, HUD, world-band extraction, kernel bridge.
// ============================================================================
let PulseRealm = {};
let PulseRealmSettings = {};
let PulseDomScan = false;
let PBFAVICON_CACHE = {};
let nowCT = Date.now(); // numeric timestamp
let lastnowCT = Date.now(); // numeric timestamp
 
console.log("%c[PULSEWORLD CONTENT] PBContent.js (Ultra Edition v10.0) injected",
  "color:#00C8FF; font-weight:bold; font-family:monospace;");

// Load cache from storage at startup
chrome.storage.local.get(["PulseBrowserFaviconMultiverse"], (res) => {
  if (res.PulseBrowserFaviconMultiverse) {
    PBFAVICON_CACHE = res.PulseBrowserFaviconMultiverse;
    console.log("PulseBrowser OS Accelerated Modules Icon List: ", PBFAVICON_CACHE);
  }
});

const EXTENSION_SETTINGS_KEY = "pulseworldSettings";

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

// ============================================================================
//  PBQuantumPrefetch.js — AI-ish navigation prediction (lightweight heuristic)
// ============================================================================

const PBQuantumPrefetch = {
  lastHoverLink: null,
  hoverTimeout: null,
  prefetchDelayMs: 500,

  cooldownMs: 3000,          // 3 seconds per link
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

    // Only prefetch if same domain
    try {
      const linkURL = new URL(href);
      if (linkURL.hostname !== location.hostname) {
        return; // cross-domain → skip
      }
    } catch {
      return; // invalid URL → skip
    }

    const lastTime = this.linkCooldowns.get(href) || 0;

    // Cooldown for THIS link only
    if (now - lastTime < this.cooldownMs) {
      return;
    }

    this.linkCooldowns.set(href, now);

    // Safe prefetch
    letsgo(link);
  }

};


function letsgo(link) {
  pbPreconnect(link);
  try {
    fetch(link, { cache: "force-cache" }).catch(() => {});
    console.log("[PBQuantumPrefetch] Prefetched hovered link:", link);
  } catch (_) {}
}

function isValid(t) {
  return (
    typeof t === "number" &&
    Number.isFinite(t) &&
    t > 0
  );
}


// ---------------------------------------------------------------------------
// 1. KERNEL HANDSHAKE
// ---------------------------------------------------------------------------
chrome.runtime.sendMessage({ type: "PULSE_OS_PING", time: nowCT  }, (response) => {
  if (chrome.runtime.lastError) return;
  console.log("%c[PULSEWORLD CONTENT] Kernel handshake:",
    "color:#00C8FF; font-family:monospace;", response);
  if (response.time && isValid(response.time)) {
      nowCT = response.time;
  }
});


function pbPreconnect(origins = []) {
  origins.forEach((origin) => {
    pbDNSWarm(origin);
    pbTLSWarm(origin);
  });
  console.log("%c[PBAccelerator] Preconnect:", "color:#00C8FF;", origins);
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
// 5. DECODE WARM-PATH (images) — FULL SPECTRUM VERSION
// ---------------------------------------------------------------------------

// Decode a single image safely
function warmImageDecode(img) {
  if (!img) return;
  try { 
    img.decode?.().catch(() => {}); 
  } catch (_) {}
}

// Extract CSS background-image URLs
function extractCSSImageURLs() {
  const urls = [];

  document.querySelectorAll("*").forEach(el => {
    const bg = getComputedStyle(el).backgroundImage;
    if (!bg || bg === "none") return;

    const match = bg.match(/url\(["']?(.*?)["']?\)/);
    if (match && match[1]) urls.push(match[1]);
  });

  return urls;
}

// Decode CSS background images by creating synthetic Image objects
function warmCSSImages() {
  const urls = extractCSSImageURLs();

  urls.forEach(src => {
    const img = new Image();
    img.src = src;
    warmImageDecode(img);
  });
}

// Safe startup wrapper
(async function safeWarmPathStart() {
  // Start immediately if DOM is already interactive or complete
  if (document.readyState !== "loading") {
    startWarmPath();
    return;
  }

  // Start ASAP even before DOMContentLoaded
  startWarmPath();

  // And run again at DOMContentLoaded for late images
  document.addEventListener("DOMContentLoaded", startWarmPath);

  const settings = await pbLoadExtensionSettings();
  PulseRealmSettings = settings;
})();


// Intelligent throttle window
let lastWarm = 0;
const WARM_COOLDOWN = 1000; // ms

function startWarmPath() {
  if (!document.body) {
    setTimeout(startWarmPath, 50);
    return;
  }
  // Initial warm
  warmAllImages();
  gpuWarmExtra();
  // MutationObserver for future images
  const imgObserver = new MutationObserver(() => {
    const now = performance.now();
    // Throttle: only warm once every 500ms
    if (now - lastWarm < WARM_COOLDOWN) return;
    lastWarm = now;
    warmAllImages();
  });
  imgObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
  PBQuantumPrefetch.attachToDocument();
}

// Unified warm function
function warmAllImages() {
  // Warm HTML <img>
  document.querySelectorAll("img").forEach(warmImageDecode);
  triggerWarmPaths();
  // Warm CSS backgrounds
  warmCSSImages();
}


// ============================================================================
// 14. PBContentGPUWarm++ — Additional GPU warm triggers
// ============================================================================
let gpuEnabled = "GPU Driver Error";

function createPulseScreen() {
  const vid = document.createElement("video");
  if (window.innerHeight < 200 || window.innerWidth < 200) return;
  loadLastSavedVideo(entry => {
    if (!entry) {
      vid.src = chrome.runtime.getURL("PulseWorldOS.mp4");
      return;
    }

    // Attach listeners FIRST
    vid.addEventListener("error", () => {
      // CSP blocked → fallback
      if (gpuEnabled === "GPU Driver Error") {
        vid.src = chrome.runtime.getURL("PulseWorldOS-Older.mp4");
      } else {
        vid.src = chrome.runtime.getURL("PulseWorldOS.mp4");
      }
    });

    vid.addEventListener("loadedmetadata", () => {
      // PulseWorld video allowed
      // Optional: mark presence or warm-state
    });

    // THEN set the src
    if (entry.source) {
      vid.src = entry.source;
    } else {
      if (gpuEnabled === "GPU Driver Error") {
        vid.src = chrome.runtime.getURL("PulseWorldOS-Older.mp4");
      } else {
        vid.src = chrome.runtime.getURL("PulseWorldOS.mp4");
      }
    }
  });

  vid.style.cssText = `
    position: fixed;
    display: block;
    top: 50px;
    right: 30px;
    width: 220px;
    border-radius: 999px;
    box-shadow: 0 0 40px #00aaff88, 0 0 80px #00aaff44;
    z-index: 999999999;
  `;

  setTimeout(() => {
    fadeHUD(vid);
  }, 4000);
}

// ---------------------------------------------------------------------------
// 2. HUD INJECTION (DevOverlay) — SAFE VERSION
// ---------------------------------------------------------------------------
(function safeInjectHUD() {
  if (
      location.protocol === "chrome:" ||
      location.href.startsWith("chrome://") ||
      location.protocol === "chrome-extension:"
    ) {
      return;
    }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", async () => {
      injectHUD();
      createPulseScreen();
    });
  } else {
    injectHUD();
    createPulseScreen();
  }
})();

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

function getWarmInterval() {
  const base = 60000;
// ⭐ Add human-like jitter (±20%)
  const jitterRange = base * 0.22;
  const jitter = (Math.random() * jitterRange * 2) - jitterRange;

  // ⭐ Final interval
  const interval = Math.max(base, base + jitter); // never below 5s

  return Math.floor(interval);
}

function getSyncInterval() {
  const base = 1200;
// ⭐ Add human-like jitter (±20%)
  const jitterRange = base * 0.11;
  const jitter = (Math.random() * jitterRange * 2) - jitterRange;

  // ⭐ Final interval
  const interval = Math.max(base, base + jitter); // never below 5s

  return Math.floor(interval);
}

function loadLastSavedVideo(callback) {
  chrome.storage.local.get(["pipMemory"], data => {
    const list = data.pipMemory || [];
    if (!list.length) return callback(null);

    const last = list[list.length - 1];
    callback(last);
  });
}



async function gpuWarmExtra() {
  const elements = document.querySelectorAll("canvas, video");
  gpuEnabled = "GPU Driver Error";

  // Warm WebGL + WebGL2 + Canvas2D + Video
  elements.forEach(el => {
    try {
      const gl = el.getContext?.("webgl") || el.getContext?.("webgl2");
      if (gl) gpuEnabled = "WebGL";
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
        if (device) {
          gpuEnabled = "WebGPU";
          const queue = device.queue;
          const buffer = device.createBuffer({
            size: 4,
            usage: GPUBufferUsage.COPY_DST
          });
          queue.writeBuffer(buffer, 0, new Uint8Array([1, 2, 3, 4]));
        }
      }
    }
  } catch (_) {
    // WebGPU failed — leave gpuEnabled as-is
  }

  console.log("GPU Warmed!");
  if (gpuEnabled === "GPU Driver Error") {
    pbPulseScreen.src = "PulseWorldOS-Older.mp4";
  }
  chrome.runtime.sendMessage({ type: "PBCONTENT_GPUWARM_EXTRA", gpuEnabled });
}

setTimeout(gpuWarmExtra, 900);

async function injectHUD() {
  // const STREAMING_SITES = [
  //   "netflix.com","hulu.com","disneyplus.com","primevideo.com",
  //   "amazon.com","hbomax.com","max.com","paramountplus.com",
  //   "peacocktv.com","crunchyroll.com","youtube.com","twitch.tv"
  // ];
  
  if (document.getElementById("pulsebrowser-dev-overlay")) return;
  if (!document.body) {
    setTimeout(() => {
      injectHUD();
    }, 50);
    return;
  }
  if (window.innerHeight < 200 || window.innerWidth < 200) return;
  // if (STREAMING_SITES.some(d => location.hostname.includes(d))) {

  //   const flag = document.getElementById("pulseworld-flag");
  //   if (flag) {
  //     flag.textContent = "PulseBrowser OS (PIP Available)";
  //     setTimeout(() => {
  //       flag.textContent = "PulseBrowser OS";
  //       flag.style.background = "#00C8FF";
  //     }, 4000);
  //   }
  // }

  const wrap = document.createElement("div");
  wrap.id = "pulsebrowser-dev-overlay";
  wrap.style.cssText = `
    position: fixed;
    top: 50px;
    right: 30px;
    width: 260px;
    line-height: normal;
    display: flex;
    flex-wrap: wrap;
    background: rgba(0,0,0,0.85);
    color: #00FF9C;
    font-family: monospace;
    font-size: clamp(8px, 2dvw, 11px);
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

  const sync = getWarmInterval();
  updateHUD();
  PulseBrowserPreview();
  setInterval(gpuWarmExtra, sync);
  setTimeout(() => {
    PulseBrowserDomScan();
  }, 3500);
  setTimeout(() => {
    DomScanPreview();
  }, 4000);
}

function DomScanPreview() {
  PulseDomScan = true;
  PulseBrowserPreview("PulseBrowser OS has taken a local-only Ghost Echo for your future (" + location.hostname + ") browsing experiences!");
}

function showPulseStreamPrompt(video) {
  // Prevent duplicates
  if (document.getElementById("pulseStreamPrompt")) return;

  const flag = document.getElementById("pulseworld-flag");
  
  const box = document.createElement("div");
  box.id = "pulseStreamPrompt";
  box.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 290px;
    width: 260px;
    background: rgba(0,0,0,0.88);
    color: #00FF9C;
    padding: 16px 20px;
    border-radius: 16px;
    border: 1px solid #0FF;
    font-family: monospace;
    font-size: 12px;
    z-index: 999999999;
    backdrop-filter: blur(6px);
    box-shadow: 0 0 14px #0FF;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.35s ease-out;
  `;

  box.innerHTML = `
    <div style="font-weight:600; margin-bottom:6px; color:#0FF;">
      🎥 PulseStream
    </div>
    <div style="margin-bottom:12px;">
      Watch while you browse?
    </div>

    <button id="pipEnableBtn" style="
      background:#0FF;
      color:#000;
      border:none;
      padding:6px 12px;
      border-radius:6px;
      font-weight:600;
      cursor:pointer;
      margin-right:10px;
    ">Enable PIP</button>

    <button id="pipDisableBtn" style="
      background:#222;
      color:#0FF;
      border:1px solid #0FF;
      padding:6px 12px;
      border-radius:6px;
      cursor:pointer;
    ">Cancel</button>
  `;

  document.body.appendChild(box);

  // Animate in
  requestAnimationFrame(() => {
    box.style.opacity = "1";
    box.style.transform = "translateY(0)";
  });

  // Auto-dismiss after 12 seconds
  const autoClose = setTimeout(() => {
    if (box) box.remove();
  }, 12000);

  // Enable PIP
  document.getElementById("pipEnableBtn").onclick = () => {
    flag.textContent = "PulseBrowser OS => [PIP MODE]";
    flag.style.background = "#00FF9C";
    clearTimeout(autoClose);
    AttemptPulseSteam(video);
    box.remove();
  };

  // Disable future prompts
  document.getElementById("pipDisableBtn").onclick = () => {
    flag.textContent = "PulseBrowser OS (PIP Available)";
    flag.style.background = "#00FF9C";
    clearTimeout(autoClose);
    box.remove();
  };
}

function fadeHUD(vid) {
  const body = document.getElementById("pb-hud-body");
  const wrap = document.getElementById("pulsebrowser-dev-overlay");
  if (!body) return;
  if (!wrap) return;
  wrap.style.display = "none";
  body.style.display = "none";
  if (vid) document.body.appendChild(vid);
  if (vid) vid.currentTime = 0;
  if (vid) vid.autoplay = true;
  if (vid) vid.muted = true;
  if (vid) vid.style.display = "block";

  setTimeout(() => {
    if (vid) vid.style.display = "none";
  }, 5000);
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

      PulseRealm = realmRes.state || {};
      PulseRealmSettings = settingsRes.settings || {};

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
        (PulseRealm.mutationCount * 0.002) +   // DOM mutations (tiny)
        (PulseRealm.warmAssetsTriggered * 5) + // micro-warm events (light)
        (PulseRealm.imagesDecoded * 20) +      // decode warm cost (heavy)
        (PulseRealm.warmPathsTriggered * 200); // warm-path cost (very heavy)

      const workloadMB = workloadKB / 1024;

      // ---------------------------------------------
      // ⭐ OPS/ms (operations per millisecond)
      // ---------------------------------------------
      const ops = PulseRealm.mutationCount +
                  PulseRealm.imagesDecoded +
                  PulseRealm.warmPathsTriggered +
                  PulseRealm.warmAssetsTriggered;

      const opsPerMs = domTime > 0 ? (ops / domTime).toFixed(2) : "-";

      // ---------------------------------------------
      // ⭐ Pulse Efficiency Index (PEI)
      // ---------------------------------------------
      const PEI = domTime > 0 ? (workloadKB / domTime).toFixed(2) : "-";

      // ---------------------------------------------
      // ⭐ Refresh Classification
      // ---------------------------------------------
      const refreshType =
        domTime < 200 ? "🔥 HOT REFRESH" :
        domTime < 400 ? "🌡️ WARM REFRESH" :
        domTime < 600 ? "💨 COOL REFRESH" :
        "🧊 COLD REFRESH";

      const currentEngine = location.hostname.toLowerCase();
      let engineDescriptor = "-No Local Site Info Yet-";

      // SEARCH ENGINES
      if (currentEngine.includes("google") && !currentEngine.includes("mail")) {
        engineDescriptor = "Simple • Direct • Fast";
      }

      if (currentEngine.includes("pulseworld.net")) {
        engineDescriptor = "Universal • Open • Neutral";
      }

      else if (currentEngine.includes("pulseworld.me")) {
        engineDescriptor = "Personal • Adaptive • Identity";
      }

      else if (currentEngine.includes("pulseworld.biz")) {
        engineDescriptor = "Commerce • Productive • Enterprise";
      }

      else if (currentEngine.includes("pulseworld.money")) {
        engineDescriptor = "Financial • Secure • Integrity";
      }

      else if (currentEngine.includes("binaryos.net")) {
        engineDescriptor = "Deterministic • Structured • System‑Level";
      }

      else if (currentEngine.includes("booleanlogic.net")) {
        engineDescriptor = "Logical • Precise • Rule‑Driven";
      }

      else if (currentEngine.includes("gpuprocessing.net")) {
        engineDescriptor = "Parallel • Accelerated • High‑Performance";
      }

      else if (currentEngine.includes("serviceworker.net")) {
        engineDescriptor = "Persistent • Background • Multi‑Realm";
      }

      else if (currentEngine.includes("orbitalmap.net")) {
        engineDescriptor = "Spatial • Navigational • World‑Layer";
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
      // ⭐ HUD OUTPUT
      // ---------------------------------------------
      body.innerHTML = `
        <font color="#0FF">Current World:</font> <font color="white">${currentEngine}</font><br/>
        <font color="#0FF">About:</font> <font color="gold">${engineDescriptor}</font><br/>
        <font color="#0FF">Domain:</font> ${PulseRealm.lastDomainClass || "-"}<br/>
        <font color="#0FF">Messages:</font> <font color="red">${"No Active Messages"}</font><br/>
        <hr style="border:0;border-top:1px solid #0FF;margin:6px 0;">
        <b><font color="white">Local PulseBrowser Tab Stats</font></b><br/>
        <font color="#0FF">PageReady:</font> ${domTime}ms <font color="gold">(Where We Help!)</font><br/>
        <font color="#0FF">PageLoad:</font> ${loadTime}ms <font color="white">(Where We Can't!)</font><br/>
        <font color="#0FF">Type:</font> ${refreshType}<br/>
        <font color="#0FF">GPUWarm:</font> ${PulseRealm.gpuEnabled}<br/>
        <hr style="border:0;border-top:1px solid #0FF;margin:6px 0;">
        <b><font color="white">Global PulseBrowser OS Stats</font></b><br/>
        <font color="#0FF">Pulse Ops/MS:</font> ${opsPerMs}<br/>
        <font color="#0FF">Pulse Efficiency:</font> ${PEI}<br/>
        <font color="#0FF">Workload:</font> ${workloadMB.toFixed(2)} MB<br/>
        <font color="#0FF">Mutations:</font> ${PulseRealm.mutationCount}<br/>
        <font color="#0FF">WarmPaths:</font> ${PulseRealm.warmPathsTriggered}<br/>
        <font color="#0FF">WarmAssets:</font> ${PulseRealm.warmAssetsTriggered}<br/>
        <font color="#0FF">DecodeWarm:</font> ${PulseRealm.imagesDecoded}<br/>
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
let pendingPerf = 0;
let lastSendPerf = 0;

const mutationObserver = new MutationObserver((mutations) => {
  if (
    location.protocol === "chrome:" ||
    location.href.startsWith("chrome://") ||
    location.protocol === "chrome-extension:"
  ) {
    return;
  }

  pendingMutations += mutations.length;
  const now = performance.now();
  if (now - lastSend > 1000) {
    chrome.runtime.sendMessage({
      type: "PBCONTENT_MUTATION",
      count: pendingMutations,
      ts: new Date().toLocaleString()
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
  if (
      location.protocol === "chrome:" ||
      location.href.startsWith("chrome://") ||
      location.protocol === "chrome-extension:"
  ) {
    return;
  }

  const entries = list.getEntries();
  const now = performance.now();
  if (now - lastSendPerf > 1000) {
    chrome.runtime.sendMessage({
      type: "PBCONTENT_PERF",
      ts: new Date().toLocaleString(),
      entries: entries.map((e) => ({
        name: e.name,
        duration: e.duration,
        initiatorType: e.initiatorType,
      })),
      origin: location.hostname
    });
    pendingPerf = 0;
    lastSendPerf = now;
  }
});

perfObserver.observe({
  entryTypes: [
    "paint",
    "largest-contentful-paint",
    "first-input",
    "layout-shift",
    "longtask",
    "measure",
    "mark",
    "resource",
    "navigation"
  ]
});


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

// setTimeout(warmGPU, 500);

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

    case "PBACC_GPUWARM_EXTRA":
      gpuWarmExtra();
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

// ---------------------------------------------------------------------------
// DOMAIN CLASSIFIER
// ---------------------------------------------------------------------------
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


function AttemptPulseSteam(videoElement) {
  try {
    if (videoElement) {
      videoElement.requestPictureInPicture()
        .then(() => saveVideoToMemory(videoElement))
        .catch(err => {
          console.warn("PIP Error:", err);
          fallbackPIP();
        });
      return;
    }

    fallbackPIP();

  } catch (e) {
    console.warn("PulseStream Error:", e);
    fallbackPIP();
  }
}

function getPrimaryVideo() {
  const videos = [...document.querySelectorAll("video")];

  // Filter to only videos that are actually loaded/playing
  const candidates = videos.filter(v =>
    v.videoWidth > 0 &&
    v.videoHeight > 0 &&
    v.readyState >= 2
  );

  // If no real videos, fallback to first <video>
  if (candidates.length === 0) {
    return videos[0] || null;
  }

  // If exactly one real video → use it
  if (candidates.length === 1) {
    return candidates[0];
  }

  // If multiple real videos → use the second one
  if (candidates.length >= 2) {
    return candidates[candidates.length - 2];
  }

  return null;
}



function fallbackPIP() {
  getLastMemoryVideo(memVideo => {
    if (memVideo) {
      memVideo.requestPictureInPicture()
        .catch(err => console.warn("Memory PIP Error:", err));
      return;
    }

    const realStory = getPrimaryVideo();

    if (realStory) {
      realStory.requestPictureInPicture()
        .then(() => saveVideoToMemory(realStory))
        .catch(err => console.warn("Fresh PIP Error:", err));
    }

    console.log("Primary video:", realStory);
  });
}



function getLastMemoryVideo(callback) {
  loadVideoMemory(list => {
    if (!list.length) {
      callback(null);
      return;
    }

    const last = list[list.length - 1];
    const videos = [...document.querySelectorAll("video")];

    const match = videos.find(v => v.src === last.src);

    if (match) {
      try { match.currentTime = last.currentTime; } catch (_) {}
      callback(match);
    } else {
      callback(null);
    }
  });
}

function loadVideoMemory(callback) {
  chrome.storage.local.get(["pipMemory"], data => {
    callback(data.pipMemory || []);
  });
}

async function saveVideoToMemory(videoElement) {
  try {
    if (!videoElement.src) return;
    if (videoElement.src.startsWith("chrome-extension://")) return;
    const response = await fetch(videoElement.src);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const source = videoElement.src;
    const width = videoElement.videoWidth;
    const height = videoElement.videoHeight;
    const currentTime = videoElement.currentTime;

    const entry = {
      source,
      blobUrl,
      width,
      height,
      currentTime: currentTime || 0,
      timestamp: Date.now()
    };

    chrome.storage.local.get(["pipMemory"], data => {
      const list = data.pipMemory || [];
      list.push(entry);
      chrome.storage.local.set({ pipMemory: list });
    });

  } catch (e) {
    console.warn("Cannot save video bytes:", e);
  }
}

const cls = pbDomainClass(location.href);
if (cls === "PulseWorld" || cls === "Partner") {
  document.addEventListener("click", e => {
    const vid = e.target.closest("video");
    if (!vid) return;

    // ⭐ Calculate aspect ratio
    const ratio = vid.videoWidth / vid.videoHeight;
    const isIdentityVideo = ratio < 1.4;

    // ⭐ Exclude PulseStatus and PulseStatus2 videos
    const src = vid.src || "";
    const isPulseStatus =
      src.includes("PulseStatus") ||
      src.includes("PulseStatus2");

    // ⭐ Trigger ONLY if identity video AND NOT PulseStatus
    if (isIdentityVideo && !isPulseStatus) {
      setTimeout(() => AttemptPulseSteam(vid), 1500);
    }
  });
}



function injectPulseFlag() {
  // const STREAMING_SITES = [
  //   "netflix.com","hulu.com","disneyplus.com","primevideo.com","sling.com", "facebook.com",
  //   "amazon.com","hbomax.com","max.com","paramountplus.com",
  //   "peacocktv.com","crunchyroll.com","youtube.com","twitch.tv"
  // ];
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
  flag.textContent = "PulseBrowser OS";
  
  // if (STREAMING_SITES.some(d => location.hostname.includes(d))) {
  //   flag.textContent = "PulseBrowser OS";
  //   flag.style.background = "#00C8FF";
  // }
  let realStory = getPrimaryVideo();

  if (!realStory) { 
    flag.textContent = "PulseBrowser OS (PIP Hidden)";
    flag.style.background = "rosybrown";
    setTimeout(() => {
      flag.textContent = "PulseBrowser OS";
      flag.style.background = "rosybrown";
    }, 4000);
  } else if (realStory.disablePictureInPicture) {
    flag.textContent = "PulseBrowser OS (PIP Disabled)";
    flag.style.background = "rosybrown";
    setTimeout(() => {
      flag.textContent = "PulseBrowser OS";
      flag.style.background = "rosybrown";
    }, 4000);
  }

  flag.onclick = () => {
    const body = document.getElementById("pb-hud-body");
    const wrap = document.getElementById("pulsebrowser-dev-overlay");
        
    updateHUD();
    wrap.style.display = "block";
    body.style.display = "block";
    flag.textContent = "PulseBrowser OS";
    flag.style.background = "#00FF9C";

    setTimeout(() => {
      fadeHUD();
    }, 6000);

    // if (STREAMING_SITES.some(d => location.hostname.includes(d))) {

      (async () => {
        realStory = getPrimaryVideo();
        try {
          if (!realStory) { 
            flag.textContent = "PulseBrowser OS (PIP Hidden)";
            flag.style.background = "rosybrown";
            setTimeout(() => {
              flag.textContent = "PulseBrowser OS";
              flag.style.background = "rosybrown";
            }, 4000);
            return;
          }

          if (realStory.disablePictureInPicture) {
            flag.textContent = "PulseBrowser OS (PIP Disabled)";
            flag.style.background = "rosybrown";
            setTimeout(() => {
              flag.textContent = "PulseBrowser OS";
              flag.style.background = "rosybrown";
            }, 4000);
          }
          // ⭐ Toggle PIP
          if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
            flag.textContent = "PulseBrowser OS";
            flag.style.background = "#00C8FF";
          } else {
            showPulseStreamPrompt(realStory);
          }

        } catch (e) {
          console.warn("PulseStream Error:", e);
        }
      })();
  };

  document.body.appendChild(flag);
}


// ============================================================================
// 15. PBContentDecodeWarm++ — Aggressive decode warm
// ============================================================================

function collectAndWarmAssetsContent() {
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
    type: "PB_ASSET_LIST_CONTENT",
    pageUrl: location.href,
    assets,
    decodeCount
  });
}

setTimeout(collectAndWarmAssetsContent, 600);


// ============================================================================
// 13. PBContentWarmPaths — DOM-side warm-path triggers (signals only)
// ============================================================================

function triggerWarmPaths() {
  chrome.runtime.sendMessage({
    type: "PBCONTENT_WARMPATH",
    ts: Date.now(),
    origin: location.href
  });
}

setTimeout(triggerWarmPaths, 300);

// ============================================================================
// 16. PBContentRealmSync++ — More accurate page context
// ============================================================================

function emitFullPageContext() {
  chrome.runtime.sendMessage({
    type: "PBREALM_UPDATE_FULL",
    page: location.pathname,
    url: location.href,
    title: documentTitle(),
    bands: extractWorldBands()
  });
}

function documentTitle() {
  if (document.title.includes("newtab")) {
    document.title = "impulse://newtab"
  }
  return document.title;
}

setTimeout(emitFullPageContext, 400);

// Create your preview panel
function PulseBrowserPreview(text) {
  let preview = document.createElement("div");
  if (text) preview = document.getElementById("PulseBrowser-Preview");
  preview.className = "PulseBrowser-Preview";
  preview.id = "PulseBrowser-Preview";
  preview.style.position = "fixed";
  preview.style.top = "0";
  preview.style.left = "0";
  preview.style.width = "100%";
  preview.style.background = "rgba(0,0,0,0.8)";
  preview.style.color = "white";
  preview.style.padding = "4px";
  preview.style.zIndex = "999999999";
  preview.style.fontFamily = "Arial";
  preview.innerText = `PulseBrowser OS Preview: ${document.title}`;
  if (text) preview.innerText = text;
  // Add it to the page
  document.body.appendChild(preview);

  if (text) setTimeout(() => {
    PreviewListener(preview);
  }, 7000)
}

function PreviewListener(preview) {
  // Remove preview after user interacts
  window.addEventListener("mousemove", () => preview.remove(), { once: true });
}


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

    // ⭐ HARD STOP: do NOT blob invalid responses
    if (!response.ok) {
      console.warn("Invalid favicon response:", iconUrl, response.status);
      return iconUrl; // ← triggers your fallback system
    }

    const blob = await response.blob();

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

async function PulseBrowserDomScan() {
  const snapshotKey = `pulse_snapshot_${location.hostname}`;
  const origin = location.hostname;

  // Clone DOM safely
  const clone = document.documentElement.cloneNode(true);
  
  // Strip heavy elements
  ["script", "iframe", "audio", "source", "object", "embed", "img"].forEach(tag =>
    clone.querySelectorAll(tag).forEach(el => el.remove())
  );

  // Strip external stylesheets + refresh metas
  clone.querySelectorAll('link[rel="stylesheet"], meta[http-equiv="refresh"]')
       .forEach(el => el.remove());

  // Tiny image preview (first 10)
  const tinyImages = [...document.querySelectorAll("img[src]")]
    .slice(0, 10)
    .map(img => ({
      src: img.src,
      alt: img.alt?.slice(0, 60) || null
    }));

  // Meta signals
  const metaDesc =
    clone.querySelector('meta[name="description"]')?.content ||
    clone.querySelector('meta[property="og:description"]')?.content ||
    null;

  const ogTitle =
    clone.querySelector('meta[property="og:title"]')?.content ||
    document.title ||
    null;

  const ogImage =
    clone.querySelector('meta[property="og:image"]')?.content ||
    tinyImages[0]?.src ||
    null;

  // Viewport + scroll
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  const scroll = {
    top: document.documentElement.scrollTop || document.body.scrollTop || 0,
    height: document.documentElement.scrollHeight || document.body.scrollHeight || 0
  };

  // Visibility + focus
  const visibility = document.visibilityState;
  const focused = document.hasFocus();

  // Structural counts
  const counts = {
    divs: clone.querySelectorAll("div").length,
    links: clone.querySelectorAll("a").length,
    images: tinyImages.length
  };

  // Tiny link preview (first 10)
  const tinyLinks = [...clone.querySelectorAll("a[href]")]
    .slice(0, 10)
    .map(a => ({
      href: a.href,
      text: a.innerText.trim().slice(0, 60)
    }));

  // Favicon extraction
  let favicon = null;
  const iconSelectors = [
    'link[rel="icon"]',
    'link[rel="shortcut icon"]',
    'link[rel="apple-touch-icon"]',
    'link[rel="mask-icon"]'
  ];

  for (const sel of iconSelectors) {
    const el = clone.querySelector(sel);
    if (el?.href) {
      favicon = el.href;
      break;
    }
  }

  if (!favicon) {
    favicon = `${location.origin}/favicon.ico`;
  }

  const icon = await fetchAndStoreIcon(location.origin, favicon);

  // ⭐ NEW: Tiny HTML summary instead of full DOM
  const htmlSummary = clone.innerText.slice(0, 2000); // ~2KB max

  const snapshot = {
    url: location.href,
    title: document.title,
    realm: location.hostname,
    meta: { description: metaDesc, ogTitle, ogImage },
    htmlSummary, // ⭐ SAFE replacement
    viewport,
    scroll,
    visibility,
    focused,
    counts,
    links: tinyLinks,
    images: tinyImages,
    favicon: icon,
    regfavicon: favicon
  };

  console.log("Ghost Echo Initiated (Safe Mode): ", snapshot);
  
  if (
    !origin ||
    (origin.startsWith("chrome://") && !origin.includes("newtab")) ||
    origin.startsWith("chrome-extension://")
  ) {
    return;
  }

  chrome.storage.local.set({ [snapshotKey]: snapshot });

  chrome.runtime.sendMessage({ type: "PBCONTENT_REALM_CLAIM", realm: location.href });
}


function saveCache() {
  chrome.storage.local.set({ PulseBrowserFaviconMultiverse: PBFAVICON_CACHE });
}
