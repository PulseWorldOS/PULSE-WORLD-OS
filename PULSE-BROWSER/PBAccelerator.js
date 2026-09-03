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

      resolve(S);
    });
  });
}

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
// ASSET TARGETS (JS/CSS/WASM/JSON)
// ---------------------------------------------------------------------------
const PB_ASSETS = [
  "/main.js", "/app.js", "/engine.js", "/runtime.js",
  "/styles.css", "/pulse.css", "/world.css",
  "/config.json", "/manifest.json", "/engine.wasm"
];

// ---------------------------------------------------------------------------
// DNS WARM (resolve domain early)
// ---------------------------------------------------------------------------
function pbDNSWarm(origin) {
  try { fetch(origin, { method: "OPTIONS" }).catch(() => {}); } catch (_) {}
  console.log("%c[PBAccelerator] DNS Warm:", "color:#00C8FF;", origin);
}

// ---------------------------------------------------------------------------
// TLS WARM (establish TLS early)
// ---------------------------------------------------------------------------
function pbTLSWarm(origin) {
  try { fetch(origin, { method: "HEAD", cache: "no-store" }).catch(() => {}); } catch (_) {}
  console.log("%c[PBAccelerator] TLS Warm:", "color:#00C8FF;", origin);
}

// ---------------------------------------------------------------------------
// HTTP/2 / HTTP/3 / QUIC Warm (protocol warm-path)
// ---------------------------------------------------------------------------
function pbProtocolWarm(origin) {
  try { fetch(origin, { method: "GET", cache: "no-store" }).catch(() => {}); } catch (_) {}
  console.log("%c[PBAccelerator] Protocol Warm:", "color:#00C8FF;", origin);
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
    pbProtocolWarm(origin);
  });
  console.log("%c[PBAccelerator] Preconnect:", "color:#00C8FF;", origins);
}

// ---------------------------------------------------------------------------
// PRELOAD (asset warm-path) + Realm counter
// ---------------------------------------------------------------------------
function pbPreload(origin) {
  const urls = PB_ASSETS.map((p) => origin + p);
  urls.forEach((url) => {
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
function pbRealmWarm(origin) {
  const urls = [
    origin + "/realm",
    origin + "/band",
    origin + "/os"
  ];
  pbPrefetch(urls);
  console.log("%c[PBAccelerator] Realm Warm:", "color:#00C8FF;", origin);
}

// ---------------------------------------------------------------------------
// DOMAIN CLASSIFIER
// ---------------------------------------------------------------------------
function pbDomainClass(url) {
  for (const domain of PB_HOME) {
    if (url.includes(domain)) return "PulseWorld";
  }
  return "WWW";
}


// ---------------------------------------------------------------------------
// FULL WARM-PATH (preconnect + preload + prefetch + GPU + decode + realm)
// Also emits PBACC_WARMPATH_EVENT for Realm HUD.
// ---------------------------------------------------------------------------
async function pbWarmPath(origin) {
  // Ignore chrome:// and extension pages
  if (
    !origin ||
    origin.startsWith("chrome://") ||
    origin.startsWith("chrome-extension://")
  ) {
    return;
  }

  const S = await getSettings();

  if (S.accelDNSWarm)      pbDNSWarm(origin);
  if (S.accelTLSWarm)      pbTLSWarm(origin);
  if (S.accelPreconnect)   pbPreconnect([origin]);
  if (S.accelPreload)      pbPreload(origin);

  const siblingPaths = [
    "/", "/home", "/world", "/engine", "/about",
    "/pulse", "/realm", "/band", "/map", "/os"
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

  const origins = PB_HOME.map((d) => "https://" + d);
  pbPreconnect(origins);

  origins.forEach((origin) => {
    pbPreload(origin);
    pbRealmWarm(origin);
  });

  chrome.runtime.sendMessage({
    type: "PBACC_WARMPATH_EVENT",
    origin: "HOME_UNIVERSE"
  });

  console.log("%c[PBAccelerator] Home Warm-Boot executed",
    "color:#00C8FF; font-weight:bold;");
}

// Run home warm-boot once when accelerator loads
pbHomeWarmBoot().catch(() => {});

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
