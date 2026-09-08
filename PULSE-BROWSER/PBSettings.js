// ============================================================================
//  PBSettings.js — PulseBrowser OS Settings Registry (Ultra Edition v7.0)
//  Unified OS Registry + Extension Settings Page + MV3-Compliant Storage
//  FULL DIAGNOSTIC MODE — Every change logged, color-coded, timestamped
// ============================================================================
const PB_LOG = {
  info(label, data) {
    console.log(
      `%c[PBSettings][INFO][${new Date().toLocaleTimeString()}] ${label}`,
      "color:#55BBFF; font-weight:bold;",
      data || ""
    );
  },

  change(label, before, after) {
    console.groupCollapsed(
      `%c[PBSettings][CHANGE][${new Date().toLocaleTimeString()}] ${label}`,
      "color:#00FFAA; font-weight:bold;"
    );
    console.log("%cBefore:", "color:#FF8888; font-weight:bold;", before);
    console.log("%cAfter:", "color:#88FF88; font-weight:bold;", after);
    console.groupEnd();
  },

  save(label, data) {
    console.log(
      `%c[PBSettings][SAVE][${new Date().toLocaleTimeString()}] ${label}`,
      "color:#00DDFF; font-weight:bold;",
      data
    );
  },

  load(label, data) {
    console.log(
      `%c[PBSettings][LOAD][${new Date().toLocaleTimeString()}] ${label}`,
      "color:#FFD700; font-weight:bold;",
      data
    );
  },

  event(label, data) {
    console.log(
      `%c[PBSettings][EVENT][${new Date().toLocaleTimeString()}] ${label}`,
      "color:#FF55AA; font-weight:bold;",
      data
    );
  }
};

PB_LOG.info("PBSettings (Ultra Edition v7.1) loaded");

// ============================================================================
//  SECTION 1 — OS REGISTRY DEFAULTS (NO EXTENSION SETTINGS HERE)
// ============================================================================

const PB_DEFAULT_SETTINGS = {
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

  blockTrackers: true,
  blockAnalytics: true,
  blockAds: true,
  blockFingerprinting: false,
  blockSocialWidgets: false,
  blockCryptoMiners: true,

  upgradeHTTPtoHTTPS: true,
  forceHTTP2: false,
  forceHTTP3: false,
  forceQUIC: false,
  forceSecureCookies: true,

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
  navPredictiveJump: false,
  navTemporalShift: false,

  routerPrioritizeCDN: true,
  routerPrioritizeAssets: true,
  routerPrioritizeHomeUniverse: true,
  routerRewriteRules: false,
  routerRerouteRules: false,
  routerLatencyScan: true,
  routerRealmScan: true,
  routerFallbackScan: true,
  routerAdaptiveRouting: true,

  contentMutationObserver: true,
  contentPerformanceObserver: true,
  contentGPUWarm: true,
  contentDecodeWarm: true,
  contentHUD: true,
  contentAutoFixLayout: false,
  contentAutoFixFonts: false,
  contentAutoFixContrast: false,

  devLogKernelStatus: true,
  devLogRouting: true,
  devLogNavigation: true,
  devLogAcceleration: true,
  devLogContentEvents: true,
  devLogGPUEvents: true,
  devLogDecodeEvents: true,
  devLogPortalEvents: true,
  devLogFallbackEvents: true,

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

  portalEnableBootVideo: false,
  portalEnableFullViewport: false,
  portalEnableIndexCopy: false,
  portalEnableRealmScan: true,
  portalEnableLatencyWarp: true,
  portalEnableFallbackWarp: true,

  fallbackEnable404OS: true,
  fallbackEnableConsoleClone: true,
  fallbackEnableRealmPing: true,
  fallbackEnableAutoWarp: true,
  fallbackEnableErrorCapture: true,

  worldEnableMentor: false,
  worldEnableEarnMode: false,
  worldEnableIdentityTether: false,
  worldEnableMeshPhysics: false,
  worldEnableUplift: false,
  worldEnableDiagnostics: false,

  extEnableFrontPage: true,
  extEnableSettingsPage: true,
  extEnablePopupConsole: true,
  extEnableSpeedLayer: true,
  extEnableSWAccelerator: true,

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
//  SECTION 2 — EXTENSION SETTINGS (SEPARATE STORAGE)
// ============================================================================

const EXTENSION_SETTINGS_KEY = "pulseworldSettings";

async function pbLoadExtensionSettings() {
  try {
    const result = await chrome.storage.local.get([EXTENSION_SETTINGS_KEY]);
    const settings = result[EXTENSION_SETTINGS_KEY] || {};

    PB_LOG.load("pbLoadExtensionSettings()", settings);

    return settings;
  } catch (err) {
    PB_LOG.error("pbLoadExtensionSettings() FAILED", err);
    return {};
  }
}
async function loadExtensionSettingsUI() {
  const result = await chrome.storage.local.get([EXTENSION_SETTINGS_KEY]);
  const settings = result[EXTENSION_SETTINGS_KEY] || {};

  PB_LOG.load("Extension Settings Loaded", settings);

  const fields = {
    emailMode: "emailMode",
    externalEmailLink: "externalEmailLink",
    bankMode: "bankMode",
    externalBankLink: "externalBankLink",
    businessLink: "businessLink",
    filesLink: "filesLink",
    goPublicToggle: "goPublicEnabled",
    publicLink: "publicLink",
    programmaticEmail: "programmaticEmail",
    programmaticBanking: "programmaticBanking",
    searchMode: "searchMode",
    externalSearchLink: "externalSearchLink",

  };

  for (const id in fields) {
    const el = document.getElementById(id);
    if (!el) continue;

    const key = fields[id];
    const value = settings[key];

    if (el.type === "checkbox") {
      el.checked = !!value;
    } else {
      el.value = value || "";
    }

    PB_LOG.info(`UI Field Loaded: ${id}`, value);
  }
}

async function saveExtensionSettingsUI() {
  const before = await chrome.storage.local.get([EXTENSION_SETTINGS_KEY]);

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
    programmaticBanking: document.getElementById("programmaticBanking").checked,

    searchMode: document.getElementById("searchMode").value,
    externalSearchLink: document.getElementById("externalSearchLink").value.trim()
    
  };

  await chrome.storage.local.set({ [EXTENSION_SETTINGS_KEY]: settings });

  PB_LOG.change("Extension Settings Saved", before[EXTENSION_SETTINGS_KEY], settings);
}

// ============================================================================
//  SECTION 3 — OS REGISTRY LOAD/SAVE (SEPARATE)
// ============================================================================

function pbLoadSettings() {
  return new Promise((resolve) => {
    chrome.storage.local.get(PB_DEFAULT_SETTINGS, (data) => {
      PB_LOG.load("OS Registry Loaded", data);
      resolve(data || PB_DEFAULT_SETTINGS);
    });
  });
}

function pbSaveSettings(settings) {
  return new Promise(async (resolve) => {
    const before = await pbLoadSettings();
    chrome.storage.local.set(settings, () => {
      PB_LOG.change("OS Registry Saved", before, settings);
      resolve(true);
    });
  });
}

// ============================================================================
//  SECTION 4 — MESSAGE API
// ============================================================================

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  PB_LOG.event("Message Received", msg);

  if (!msg || !msg.type) return;

  switch (msg.type) {

    case "PBSETTINGS_GET":
      pbLoadSettings().then((settings) => {
        PB_LOG.info("PBSETTINGS_GET", settings);
        sendResponse({ ok: true, settings });
      });
      return true;

    case "PBSETTINGS_SET":
      pbSaveSettings(msg.settings || {}).then(() => {
        PB_LOG.info("PBSETTINGS_SET", msg.settings);
        sendResponse({ ok: true });
      });
      return true;

    case "PBSETTINGS_RESET":
      pbSaveSettings(PB_DEFAULT_SETTINGS).then(() => {
        PB_LOG.info("PBSETTINGS_RESET", "Defaults Restored");
        sendResponse({ ok: true });
      });
      return true;
  }
});

// ============================================================================
//  SECTION X — CACHE LIST (via PBCompanion.js)
// ============================================================================

// Request cache list from background service worker
async function pbRequestCacheList() {
  PB_LOG.info("Requesting cache list from PBCompanion…");

  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: "GET_CACHE_LIST" }, (response) => {
      if (!response || !response.ok) {
        PB_LOG.info("Cache list unavailable or error", response);
        resolve(null);
        return;
      }

      PB_LOG.load("Cache list received", response.caches);
      resolve(response.caches);
    });
  });
}

// Render cache list into PBSettings.html
async function pbRenderCacheList() {
  const listEl = document.getElementById("cacheList");
  if (!listEl) return;

  const cacheNames = await pbRequestCacheList();

  if (!cacheNames) {
    listEl.innerHTML = "<li>Cache API unavailable in extension pages.</li>";
    return;
  }

  if (cacheNames.length === 0) {
    listEl.innerHTML = "<li>No cached files detected.</li>";
    return;
  }

  listEl.innerHTML = "";

  cacheNames.forEach(name => {
    const li = document.createElement("li");
    li.textContent = `Cache: ${name}`;
    listEl.appendChild(li);
  });

  PB_LOG.info("Cache list rendered", cacheNames);
}

async function updateStorageStats() {
  const el = document.getElementById("storageStats");
  if (!el) return;

  if (!navigator.storage || !navigator.storage.estimate) {
    el.textContent = "Storage usage: StorageManager API not supported.";
    return;
  }

  try {
    // ⭐ Always request persistence
    const persistenceRequest = await navigator.storage.persist();
    const persistent = await navigator.storage.persisted();

    const estimate = await navigator.storage.estimate();
    const used = estimate.usage || 0;
    const quota = estimate.quota || 0;

    // Convert bytes → GB
    const usedGB = (used / (1024 * 1024 * 1024)).toFixed(2);
    const quotaGB = (quota / (1024 * 1024 * 1024)).toFixed(2);
    const percent = quota ? ((used / quota) * 100).toFixed(2) : "0";

    el.innerHTML = `
      <strong>Storage Usage:</strong><br>
      • Used: ${usedGB} GB<br>
      • Quota: ${quotaGB} GB<br>
      • Utilization: ${percent}%<br>
      • Persistence: ${persistent ? "Granted" : "Not Granted"}<br>
      <span class="pw-note">
        ${persistent 
          ? "Your data is protected from eviction." 
          : "Large quota is normal even without persistence — Chrome may deny persistence unless the site is installed or heavily used."}
      </span>
    `;
  } catch (err) {
    el.textContent = "Storage usage: error retrieving stats.";
  }
}
function updateLinkedPWInputs() {
  // Find all selects
  const selects = document.querySelectorAll(".pw-select");

  selects.forEach(select => {
    // Find the section this select belongs to
    const section = select.closest(".pw-section");
    if (!section) return;

    // Find the pw-input that comes AFTER the select
    const linkedInput = select.parentElement.querySelector(".pw-input");
    if (!linkedInput) return;

    // Apply logic
    if (select.value === "internal") {
      linkedInput.readOnly = true;
      linkedInput.classList.add("pw-input-disabled");
    } else {
      linkedInput.readOnly = false;
      linkedInput.classList.remove("pw-input-disabled");
    }
  });
}

// Run once on load
updateLinkedPWInputs();

// Run whenever ANY pw-select changes
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("pw-select")) {
    updateLinkedPWInputs();
  }
});



// ============================================================================
//  SECTION 5 — SETTINGS PAGE INITIALIZER
// ============================================================================

if (location.href.includes("PBSettings.html")) {
  (async () => {
    PB_LOG.info("Initializing Settings Page");

    await loadExtensionSettingsUI();
    await pbRenderCacheList();   // ← NEW
    await updateStorageStats();

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
      "programmaticBanking",
      "searchMode",
      "externalSearchLink",

    ];

    idsToWatch.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const eventName =
        el.tagName === "INPUT" && el.type === "checkbox" ? "change" : "input";

      el.addEventListener(eventName, () => {
        const value = el.type === "checkbox" ? el.checked : el.value;
        PB_LOG.info(`Field Changed: ${id}`, value);
        saveExtensionSettingsUI();
      });
    });

    PB_LOG.info("Settings Page Ready");
  })();
}

