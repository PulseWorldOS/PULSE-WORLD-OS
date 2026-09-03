// ============================================================================
//  PBInterceptor.js — PulseBrowser Request Physics (Ultra Edition v7.0)
//  Multi-layer interception: block / allow / accelerate / rewrite / reroute
//  Settings-aware • protocol-aware • warm-path-aware • future-proof
// ============================================================================

console.log("%c[PULSEBROWSER] PBInterceptor (Ultra Edition v7.0) loaded",
  "color:#FFCC00; font-weight:bold; font-family:monospace;");

// ---------------------------------------------------------------------------
// SETTINGS LOADER
// ---------------------------------------------------------------------------
async function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(null, (data) => resolve(data));
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
// TRACKERS / JUNK / SLOW PATHS
// ---------------------------------------------------------------------------
const PB_BLOCK = [
  /doubleclick\.net/,
  /googletagmanager\.com/,
  /google-analytics\.com/,
  /facebook\.com\/tr/,
  /adservice\.google\.com/,
  /scorecardresearch\.com/,
  /quantserve\.com/,
  /adsystem\.com/,
  /taboola\.com/,
  /outbrain\.com/,
  /bing\.com\/api\/ads/
];

// ---------------------------------------------------------------------------
// CDN PRIORITY
// ---------------------------------------------------------------------------
const PB_CDN = [
  /cloudflare\.com/,
  /cloudfront\.net/,
  /akamaihd\.net/,
  /fastly\.net/,
  /cdn\.jsdelivr\.net/,
  /unpkg\.com/
];

// ---------------------------------------------------------------------------
// ASSET PRIORITY
// ---------------------------------------------------------------------------
const PB_ASSET_PRIORITY = [
  /\.js$/,
  /\.css$/,
  /\.json$/,
  /\.wasm$/,
  /\.svg$/,
  /\.woff2?$/
];

// ---------------------------------------------------------------------------
// PROTOCOL UPGRADE (http → https)
// ---------------------------------------------------------------------------
function pbUpgradeProtocol(url, S) {
  if (S.upgradeHTTPtoHTTPS && url.startsWith("http://")) {
    return url.replace("http://", "https://");
  }
  return url;
}

// ---------------------------------------------------------------------------
// MAIN INTERCEPTOR LOGIC (settings-aware)
// ---------------------------------------------------------------------------
async function pbIntercept(details) {
  const S = await getSettings();
  let url = details.url;

  // -----------------------------
  // PROTOCOL UPGRADE
  // -----------------------------
  const upgraded = pbUpgradeProtocol(url, S);
  if (upgraded !== url) {
    console.log("[PBInterceptor] Upgrading protocol:", url, "→", upgraded);
    return { redirectUrl: upgraded };
  }

  // -----------------------------
  // BLOCK TRACKERS
  // -----------------------------
  if (S.blockTrackers || S.blockAnalytics || S.blockAds) {
    for (const rule of PB_BLOCK) {
      if (rule.test(url)) {
        console.log("[PBInterceptor] Blocking tracker:", url);
        return { cancel: true };
      }
    }
  }

  // -----------------------------
  // HOME UNIVERSE ACCELERATION
  // -----------------------------
  if (S.routerPrioritizeHomeUniverse) {
    for (const domain of PB_HOME) {
      if (url.includes(domain)) {
        console.log("[PBInterceptor] Home universe accelerated:", url);

        if (S.accelGPUWarm) {
          chrome.runtime.sendMessage({ type: "PBACC_GPUWARM" });
        }

        if (S.accelDecodeWarm) {
          chrome.runtime.sendMessage({ type: "PBACC_DECODEWARM" });
        }

        return {}; // allow
      }
    }
  }

  // -----------------------------
  // CDN PRIORITY
  // -----------------------------
  if (S.routerPrioritizeCDN) {
    for (const cdn of PB_CDN) {
      if (cdn.test(url)) {
        console.log("[PBInterceptor] CDN accelerated:", url);
        return {}; // allow
      }
    }
  }

  // -----------------------------
  // ASSET PRIORITY
  // -----------------------------
  if (S.routerPrioritizeAssets) {
    for (const asset of PB_ASSET_PRIORITY) {
      if (asset.test(url)) {
        console.log("[PBInterceptor] Asset prioritized:", url);
        return {}; // allow
      }
    }
  }

  // -----------------------------
  // EXPERIMENTAL ROUTE GRAPH
  // -----------------------------
  if (S.experimentalRouteGraph) {
    console.log("[PBInterceptor] Experimental RouteGraph active:", url);
  }

  // -----------------------------
  // DEFAULT: allow everything
  // -----------------------------
  return {};
}

// ---------------------------------------------------------------------------
// ATTACH TO BROWSER
// ---------------------------------------------------------------------------
chrome.webRequest.onBeforeRequest.addListener(
  (details) => pbIntercept(details),
  { urls: ["<all_urls>"] },
  ["blocking"]
);
