// ============================================================================
//  PBSettings.js — PulseBrowser OS Settings Registry (Ultra Edition v6.0)
//  Unified OS Registry + Extension Settings Page + MV3-Compliant Storage
// ============================================================================

console.log("%c[PULSEBROWSER] PBSettings (Ultra Edition v6.0) loaded",
  "color:#55BBFF; font-weight:bold; font-family:monospace;");

// ============================================================================
//  SECTION 1 — OS REGISTRY DEFAULTS
// ============================================================================

const PB_DEFAULT_SETTINGS = {

  // CORE SUBSYSTEMS
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

  // TRACKER BLOCKING
  blockTrackers: true,
  blockAnalytics: true,
  blockAds: true,
  blockFingerprinting: false,
  blockSocialWidgets: false,
  blockCryptoMiners: true,

  // PROTOCOL UPGRADES
  upgradeHTTPtoHTTPS: true,
  forceHTTP2: false,
  forceHTTP3: false,
  forceQUIC: false,
  forceSecureCookies: true,

  // ACCELERATION MODES
  accelPreconnect: true,
  accelPrefetch: true,
  accelPreload: true,
  accelWarmPath: true,
  accelGPUWarm: true,
  accelDecodeWarm: true,
  accelDNSWarm: true,
  accelTLSWarm: true,
  accelRealmWarm: true,

  // NAVIGATION MODES
  navWarmSiblings: true,
  navWarmAssets: true,
  navWarmGlobalSites: true,
  navPulseWorldPriority: true,
  navPredictiveJump: false,
  navTemporalShift: false,

  // ROUTER MODES
  routerPrioritizeCDN: true,
  routerPrioritizeAssets: true,
  routerPrioritizeHomeUniverse: true,
  routerRewriteRules: false,
  routerRerouteRules: false,
  routerLatencyScan: true,
  routerRealmScan: true,
  routerFallbackScan: true,
  routerAdaptiveRouting: true,

  // CONTENT RUNTIME
  contentMutationObserver: true,
  contentPerformanceObserver: true,
  contentGPUWarm: true,
  contentDecodeWarm: true,
  contentHUD: true,
  contentAutoFixLayout: false,
  contentAutoFixFonts: false,
  contentAutoFixContrast: false,

  // DEVTOOLS
  devLogKernelStatus: true,
  devLogRouting: true,
  devLogNavigation: true,
  devLogAcceleration: true,
  devLogContentEvents: true,
  devLogGPUEvents: true,
  devLogDecodeEvents: true,
  devLogPortalEvents: true,
  devLogFallbackEvents: true,

  // HOME UNIVERSE
  homeUniverse: [
    "www.pulseworld.me",
    "www.pulseworld.net",
    "www.pulseworld.money",
    "www.pulseworld.biz",
    "www.binaryos.net",
    "www.booleanlogic.net",
    "www.gpuprocessing.net",
    "www.serviceworker.net",
    "www.orbitalmap.net"
  ],

  // PORTAL SYSTEM
  portalEnableBootVideo: false,
  portalEnableFullViewport: false,
  portalEnableIndexCopy: false,
  portalEnableRealmScan: true,
  portalEnableLatencyWarp: true,
  portalEnableFallbackWarp: true,

  // FALLBACK SYSTEM
  fallbackEnable404OS: true,
  fallbackEnableConsoleClone: true,
  fallbackEnableRealmPing: true,
  fallbackEnableAutoWarp: true,
  fallbackEnableErrorCapture: true,

  // WORLD ENGINE
  worldEnableMentor: false,
  worldEnableEarnMode: false,
  worldEnableIdentityTether: false,
  worldEnableMeshPhysics: false,
  worldEnableUplift: false,
  worldEnableDiagnostics: false,

  // EXTENSION-FIRST MODES
  extEnableFrontPage: true,
  extEnableSettingsPage: true,
  extEnablePopupConsole: true,
  extEnableSpeedLayer: true,
  extEnableSWAccelerator: true,

  // EXPERIMENTAL
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

// ============================================================================
//  SECTION 2 — EXTENSION SETTINGS PAGE (PBSettings.html)
// ============================================================================

const EXTENSION_SETTINGS_KEY = "pulseworldSettings";

// Load extension settings into PBSettings.html UI
async function loadExtensionSettingsUI() {
  const result = await chrome.storage.local.get([EXTENSION_SETTINGS_KEY]);
  const settings = result[EXTENSION_SETTINGS_KEY] || {};

  document.getElementById("emailMode").value =
    settings.emailMode || "internal";
  document.getElementById("externalEmailLink").value =
    settings.externalEmailLink || "";

  document.getElementById("bankMode").value =
    settings.bankMode || "internal";
  document.getElementById("externalBankLink").value =
    settings.externalBankLink || "";

  document.getElementById("businessLink").value =
    settings.businessLink || "";
  document.getElementById("filesLink").value =
    settings.filesLink || "";

  document.getElementById("goPublicToggle").checked =
    !!settings.goPublicEnabled;
  document.getElementById("publicLink").value =
    settings.publicLink || "";

  document.getElementById("programmaticEmail").checked =
    !!settings.programmaticEmail;
  document.getElementById("programmaticBanking").checked =
    !!settings.programmaticBanking;
}

// Save extension settings from PBSettings.html UI
async function saveExtensionSettingsUI() {
  const settings = {
    emailMode: document.getElementById("emailMode").value,
    externalEmailLink: document.getElementById("externalEmailLink").value.trim(),

    bankMode: document.getElementById("bankMode").value,
    externalBankLink: document.getElementById("externalBankLink").value.trim(),

    businessLink: document.getElementById("businessLink").value.trim(),
    filesLink: document.getElementById("filesLink").value.trim(),

    goPublicEnabled: document.getElementById("goPublicToggle").checked,
    publicLink: document.getElementById("publicLink").value.trim(),

    programmaticEmail: document.getElementById("programmaticEmail").checked,
    programmaticBanking: document.getElementById("programmaticBanking").checked
  };

  await chrome.storage.local.set({ [EXTENSION_SETTINGS_KEY]: settings });
}

// ============================================================================
//  SECTION 3 — OS REGISTRY LOAD/SAVE (chrome.storage.local)
// ============================================================================

function pbLoadSettings() {
  return new Promise((resolve) => {
    chrome.storage.local.get(PB_DEFAULT_SETTINGS, (data) => {
      resolve(data || PB_DEFAULT_SETTINGS);
    });
  });
}

function pbSaveSettings(settings) {
  return new Promise((resolve) => {
    chrome.storage.local.set(settings, () => resolve(true));
  });
}

// ============================================================================
//  SECTION 4 — MESSAGE API (Kernel, Popup, Content)
// ============================================================================

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

// ============================================================================
//  SECTION 5 — SETTINGS PAGE INITIALIZER (PBSettings.html)
// ============================================================================

if (location.href.includes("PBSettings.html")) {
  (async () => {
    await loadExtensionSettingsUI();

    const idsToWatch = [
      "emailMode",
      "externalEmailLink",
      "bankMode",
      "externalBankLink",
      "businessLink",
      "filesLink",
      "goPublicToggle",
      "publicLink",
      "programmaticEmail",
      "programmaticBanking"
    ];

    idsToWatch.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const eventName =
        el.tagName === "INPUT" && el.type === "checkbox" ? "change" : "input";

      el.addEventListener(eventName, saveExtensionSettingsUI);
    });
  })();
}
