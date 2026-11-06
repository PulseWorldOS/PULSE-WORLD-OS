// ============================================================================
//  PBNavigator.js — PulseBrowser Navigation Orchestrator (Ultra Edition v7.0)
//  Multi-layer navigation: warm-path, sibling prefetch, asset warm, GPU warm,
//  decode warm, domain intelligence, settings-aware, future-proof.
// ============================================================================

console.log("%c[PULSEBROWSER] PBNavigator (Ultra Edition v7.0) loaded",
  "color:#00FF9C; font-weight:bold; font-family:monospace;");

// ---------------------------------------------------------------------------
// SETTINGS LOADER
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
      S.experimentalQuantumRouting = S.experimentalQuantumRouting !== false; 
      S.accelModuleWarmBoot = S.accelModuleWarmBoot !== false;
      S.enablePulseEarnOverlay = S.enablePulseEarnOverlay !== false; 
      S.enablePulsePalConsole = S.enablePulsePalConsole !== false;
      S.enableDevOverlay = S.enableDevOverlay !== false; 
      S.enableDevCaches = S.enableDevCaches !== false;
      S.enablePulseEarnerEngine = S.enablePulseEarnerEngine !== false;
      S.enablePulsePal = S.enablePulsePal !== false;
      resolve(S);
    });
  });
}

// ---------------------------------------------------------------------------
// HOME UNIVERSE (Your 9 domains)
// ---------------------------------------------------------------------------
const PB_HOME = [
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

// ---------------------------------------------------------------------------
// SIBLING ROUTES (Warm-path targets)
// ---------------------------------------------------------------------------
const PB_SIBLINGS = [
  "/", "/privacy", "/data", "/termsofuse", "/cookies",
  "/404", "/about"
];

// ---------------------------------------------------------------------------
// ASSET WARM-PATH (JS/CSS/JSON/WASM)
// ---------------------------------------------------------------------------
const PB_ASSETS = [
  "/main.js", "/app.js", "/engine.js", "/runtime.js",
  "/styles.css", "/pulse.css", "/world.css",
  "/config.json", "/manifest.json"
];

// ---------------------------------------------------------------------------
// PREFETCH HELPER
// ---------------------------------------------------------------------------
function pbPrefetch(urls = []) {
  urls.forEach((url) => {
    try { fetch(url, { cache: "force-cache" }).catch(() => {}); } catch (_) {}
  });

  console.log("%c[PBNavigator] Prefetch:",
    "color:#00C8FF; font-weight:bold; font-family:monospace;", urls);
}

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
// DOMAIN CLASSIFIER
// ---------------------------------------------------------------------------

function isPulseWorld(origin) {
  return origin.includes("pulseworld.net")
      || origin.includes("orbitalmap.net")
      || ((origin.includes("mcbbhkdjpaakjabngfjmaeihnoilognk") || origin.includes("kkidimiknkgfkjplagaohacidaagcbjg")) && (origin.includes("chromewebstore") || origin.includes("chrome")))
      || origin.includes("booleanlogic.net")
      || origin.includes("binaryos.net")
      || origin.includes("serviceworker.net")
      || origin.includes("gpuprocessing.net")
      || origin.includes("pulseworld.me")
      || origin.includes("pulseworld.money")
      || origin.includes("pulseworld.biz");
}
// ---------------------------------------------------------------------------
// DOMAIN CLASSIFIER
// ---------------------------------------------------------------------------
function pbDomainClass(url) {
  if (isPulseWorld(url)) return "PulseWorld";
  if (IsPartner(url)) return "Partner";
  return "WWW";
}

// ---------------------------------------------------------------------------
// MAIN NAVIGATION ORCHESTRATOR
// ---------------------------------------------------------------------------
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete") return;

  const S = await getSettings();
  const url = tab.url || "";
  const domainClass = pbDomainClass(url);

  console.log("%c[PBNavigator] Tab Complete:",
    "color:#00FF9C; font-weight:bold; font-family:monospace;", tabId, url);

  // ---------------------------------------------------------
  // HOME UNIVERSE: aggressive warm-path
  // ---------------------------------------------------------
  if (domainClass === "PulseWorld" && S.navPulseWorldPriority) {
    const origin = new URL(url).origin;

    const siblingURLs = PB_SIBLINGS.map((p) => origin + p);
    const assetURLs = PB_ASSETS.map((p) => origin + p);

    if (S.navWarmSiblings) pbPrefetch(siblingURLs);
    if (S.navWarmAssets) pbPrefetch(assetURLs);

    console.log("%c[PBNavigator] Warm-path (home universe):",
      "color:#00FF9C; font-weight:bold; font-family:monospace;", origin);

    // GPU warm-path
    if (S.accelGPUWarm) {
      chrome.runtime.sendMessage({ type: "PBACC_GPUWARM" });
    }

    // Decode warm-path
    if (S.accelDecodeWarm) {
      chrome.runtime.sendMessage({ type: "PBACC_DECODEWARM" });
    }
  }

  // ---------------------------------------------------------
  // GLOBAL SITES: light assist mode
  // ---------------------------------------------------------
  if (domainClass === "WWW" && S.navWarmGlobalSites) {
    const origin = new URL(url).origin;

    const lightSiblings = ["/", "/about", "/contact"].map((p) => origin + p);
    pbPrefetch(lightSiblings);

    console.log("%c[PBNavigator] Global assist warm-path:",
      "color:#8888FF; font-weight:bold; font-family:monospace;", origin);
  }

  // ---------------------------------------------------------
  // Notify PBRealmBridge (DevOverlay uses this)
  // ---------------------------------------------------------
  chrome.runtime.sendMessage({
    type: "PBNAV_EVENT",
    tabId,
    url,
    domainClass,
    ts: Date.now(),
  });
});

// ---------------------------------------------------------------------------
// OPEN PULSEWORLD (API)
// ---------------------------------------------------------------------------
function openPulseWorld(url) {
  const target = url || "https://www.pulseworld.net";
  chrome.tabs.create({ url: target });
}

// ---------------------------------------------------------------------------
// MESSAGE CHANNEL
// ---------------------------------------------------------------------------
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || !msg.type) return;

  switch (msg.type) {
    case "PBNAV_OPEN_PULSEWORLD":
      openPulseWorld(msg.url);
      sendResponse({ ok: true });
      break;
  }
});
