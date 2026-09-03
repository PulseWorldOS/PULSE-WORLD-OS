// ============================================================================
//  PBSettings.js — PulseBrowser OS Settings Registry (Ultra Edition v5.0)
//  Full OS registry • chrome.storage-backed • modular • future-proof
// ============================================================================

console.log("%c[PULSEBROWSER] PBSettings (Ultra Edition v5.0) loaded",
  "color:#55BBFF; font-weight:bold; font-family:monospace;");

// ---------------------------------------------------------------------------
// DEFAULT SETTINGS (FULL OS REGISTRY)
// ---------------------------------------------------------------------------
const PB_DEFAULT_SETTINGS = {

  // -------------------------------------------------
  // CORE SUBSYSTEMS
  // -------------------------------------------------
  enableInterceptor: true,
  enableAccelerator: true,
  enableNavigator: true,
  enableRouter: true,
  enableContentRuntime: true,
  enableDevOverlay: true,
  enablePulseGPU: true,
  enablePulseDecode: true,
  enablePulsePortal: true,
  enablePulseFallback: true,
  enablePulseWorldBridge: true,

  // -------------------------------------------------
  // TRACKER BLOCKING
  // -------------------------------------------------
  blockTrackers: true,
  blockAnalytics: true,
  blockAds: true,
  blockFingerprinting: false,
  blockSocialWidgets: false,
  blockCryptoMiners: true,

  // -------------------------------------------------
  // PROTOCOL UPGRADES
  // -------------------------------------------------
  upgradeHTTPtoHTTPS: true,
  forceHTTP2: false,
  forceHTTP3: false,
  forceQUIC: false,
  forceSecureCookies: true,

  // -------------------------------------------------
  // ACCELERATION MODES
  // -------------------------------------------------
  accelPreconnect: true,
  accelPrefetch: true,
  accelPreload: true,
  accelWarmPath: true,
  accelGPUWarm: true,
  accelDecodeWarm: true,
  accelDNSWarm: true,
  accelTLSWarm: true,
  accelRealmWarm: true,

  // -------------------------------------------------
  // NAVIGATION MODES
  // -------------------------------------------------
  navWarmSiblings: true,
  navWarmAssets: true,
  navWarmGlobalSites: true,
  navPulseWorldPriority: true,
  navPredictiveJump: false,
  navTemporalShift: false,

  // -------------------------------------------------
  // ROUTER MODES
  // -------------------------------------------------
  routerPrioritizeCDN: true,
  routerPrioritizeAssets: true,
  routerPrioritizeHomeUniverse: true,
  routerRewriteRules: false,
  routerRerouteRules: false,
  routerLatencyScan: true,
  routerRealmScan: true,
  routerFallbackScan: true,
  routerAdaptiveRouting: true,

  // -------------------------------------------------
  // CONTENT RUNTIME
  // -------------------------------------------------
  contentMutationObserver: true,
  contentPerformanceObserver: true,
  contentGPUWarm: true,
  contentDecodeWarm: true,
  contentHUD: true,
  contentAutoFixLayout: false,
  contentAutoFixFonts: false,
  contentAutoFixContrast: false,

  // -------------------------------------------------
  // DEVTOOLS
  // -------------------------------------------------
  devLogKernelStatus: true,
  devLogRouting: true,
  devLogNavigation: true,
  devLogAcceleration: true,
  devLogContentEvents: true,
  devLogGPUEvents: true,
  devLogDecodeEvents: true,
  devLogPortalEvents: true,
  devLogFallbackEvents: true,

  // -------------------------------------------------
  // HOME UNIVERSE (Your 9 domains)
  // -------------------------------------------------
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
  ],

  // -------------------------------------------------
  // PORTAL SYSTEM (404 Warp Gate / Bootvideo Realm)
  // -------------------------------------------------
  portalEnableBootVideo: false,
  portalEnableFullViewport: false,
  portalEnableIndexCopy: false,
  portalEnableRealmScan: true,
  portalEnableLatencyWarp: true,
  portalEnableFallbackWarp: true,

  // -------------------------------------------------
  // FALLBACK SYSTEM (404 OS)
  // -------------------------------------------------
  fallbackEnable404OS: true,
  fallbackEnableConsoleClone: true,
  fallbackEnableRealmPing: true,
  fallbackEnableAutoWarp: true,
  fallbackEnableErrorCapture: true,

  // -------------------------------------------------
  // WORLD ENGINE (Optional)
  // -------------------------------------------------
  worldEnableMentor: false,
  worldEnableEarnMode: false,
  worldEnableIdentityTether: false,
  worldEnableMeshPhysics: false,
  worldEnableUplift: false,
  worldEnableDiagnostics: false,

  // -------------------------------------------------
  // EXTENSION-FIRST MODES
  // -------------------------------------------------
  extEnableFrontPage: true,
  extEnableSettingsPage: true,
  extEnablePopupConsole: true,
  extEnableSpeedLayer: true,
  extEnableSWAccelerator: true,

  // -------------------------------------------------
  // EXPERIMENTAL
  // -------------------------------------------------
  experimentalGPUPaths: false,
  experimentalDecodePaths: false,
  experimentalRouteGraph: false,
  experimentalPredictivePrefetch: false,
  experimentalAIWarmPath: false,
  experimentalTemporalNavigation: false,
  experimentalQuantumRouting: false,
  experimentalPortalTransitions: false,
  experimentalMeshAwareness: false
};

// ---------------------------------------------------------------------------
// LOAD SETTINGS
// ---------------------------------------------------------------------------
function pbLoadSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(PB_DEFAULT_SETTINGS, (data) => {
      resolve(data || PB_DEFAULT_SETTINGS);
    });
  });
}

// ---------------------------------------------------------------------------
// SAVE SETTINGS
// ---------------------------------------------------------------------------
function pbSaveSettings(settings) {
  return new Promise((resolve) => {
    chrome.storage.sync.set(settings, () => resolve(true));
  });
}

// ---------------------------------------------------------------------------
// MESSAGE API (Kernel, Popup, Content)
// ---------------------------------------------------------------------------
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || !msg.type) return;

  switch (msg.type) {

    case "PBSETTINGS_GET":
      pbLoadSettings().then((settings) => sendResponse({ ok: true, settings }));
      return true;

    case "PBSETTINGS_SET":
      pbSaveSettings(msg.settings || {}).then(() => sendResponse({ ok: true }));
      return true;

    case "PBSETTINGS_RESET":
      pbSaveSettings(PB_DEFAULT_SETTINGS).then(() => sendResponse({ ok: true }));
      return true;
  }
});
