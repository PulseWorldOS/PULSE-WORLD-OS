// ============================================================================
//  PBRouter.js — PulseBrowser Deterministic Routing Engine (Ultra Edition v6.0)
//  Multi-layer routing: block / allow / accelerate / warm / rewrite / reroute
//  Fully settings-aware • Fully modular • Fully future-proof
// ============================================================================

console.log("%c[PULSEBROWSER] PBRouter (Ultra Edition v6.0) loaded",
  "color:#55FFAA; font-weight:bold; font-family:monospace;");

// ---------------------------------------------------------------------------
// LOAD SETTINGS (async)
// ---------------------------------------------------------------------------
async function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(null, (data) => resolve(data));
  });
}

// ---------------------------------------------------------------------------
// ROUTING TABLES (static definitions)
// ---------------------------------------------------------------------------

// HOME UNIVERSE (Your 9 domains)
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

// TRACKERS / JUNK / SLOW PATHS
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

// CDN PRIORITY
const PB_CDN = [
  /cloudflare\.com/,
  /cloudfront\.net/,
  /akamaihd\.net/,
  /fastly\.net/,
  /cdn\.jsdelivr\.net/,
  /unpkg\.com/
];

// ASSET PRIORITY
const PB_ASSET_PRIORITY = [
  /\.js$/,
  /\.css$/,
  /\.json$/,
  /\.wasm$/,
  /\.svg$/,
  /\.woff2?$/
];

// ---------------------------------------------------------------------------
// ROUTING ENGINE (settings-aware)
// ---------------------------------------------------------------------------
async function pbRoute(url) {
  const S = await getSettings();

  // -----------------------------
  // BLOCK TRACKERS
  // -----------------------------
  if (S.blockTrackers || S.blockAnalytics || S.blockAds) {
    for (const rule of PB_BLOCK) {
      if (rule.test(url)) {
        return {
          action: "block",
          label: "tracker",
          priority: 0
        };
      }
    }
  }

  // -----------------------------
  // HOME UNIVERSE PRIORITY
  // -----------------------------
  if (S.routerPrioritizeHomeUniverse) {
    for (const domain of PB_HOME) {
      if (url.includes(domain)) {
        return {
          action: "allow",
          label: "PulseWorld",
          priority: 100,
          accelerate: S.accelWarmPath,
          warm: true
        };
      }
    }
  }

  // -----------------------------
  // CDN PRIORITY
  // -----------------------------
  if (S.routerPrioritizeCDN) {
    for (const cdn of PB_CDN) {
      if (cdn.test(url)) {
        return {
          action: "allow",
          label: "cdn",
          priority: 80,
          accelerate: S.accelPreconnect || S.accelPreload
        };
      }
    }
  }

  // -----------------------------
  // ASSET PRIORITY
  // -----------------------------
  if (S.routerPrioritizeAssets) {
    for (const asset of PB_ASSET_PRIORITY) {
      if (asset.test(url)) {
        return {
          action: "allow",
          label: "asset",
          priority: 70,
          accelerate: S.accelPreload || S.accelDecodeWarm
        };
      }
    }
  }

  // -----------------------------
  // EXPERIMENTAL ROUTE GRAPH
  // -----------------------------
  if (S.experimentalRouteGraph) {
    console.log("[PBRouter] Experimental RouteGraph active:", url);
  }

  // -----------------------------
  // DEFAULT ROUTE
  // -----------------------------
  return {
    action: "allow",
    label: "default",
    priority: 50
  };
}

// ---------------------------------------------------------------------------
// REQUEST HANDLER (PBCompanion.js uses this)
// ---------------------------------------------------------------------------
async function pbHandleRequest(details) {
  const url = details.url;
  const decision = await pbRoute(url);

  // BLOCK
  if (decision.action === "block") {
    console.log("[PBRouter] Blocking:", decision.label, url);
    return { cancel: true };
  }

  // ACCELERATE
  if (decision.accelerate) {
    console.log("[PBRouter] Accelerating:", decision.label, url);
    // future: GPU warm-path, decode warm-path, preconnect, etc.
  }

  // WARM HOME UNIVERSE
  if (decision.warm) {
    console.log("[PBRouter] Warming home universe:", url);
    // future: warm sibling routes, warm assets, warm decode
  }

  return {}; // allow
}

// ---------------------------------------------------------------------------
// EXPORTS
// ---------------------------------------------------------------------------
self.PBRouter = {
  pbRoute,
  pbHandleRequest
};
