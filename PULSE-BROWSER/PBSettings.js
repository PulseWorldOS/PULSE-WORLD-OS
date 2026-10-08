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
    tetherCode: "tetherCode",
    externalEmailLink: "externalEmailLink",
    acceleratedModule1Link: "acceleratedModule1Link",
    acceleratedModule2Link: "acceleratedModule2Link",
    acceleratedModule3Link: "acceleratedModule3Link",
    acceleratedModule4Link: "acceleratedModule4Link",
    acceleratedModule5Link: "acceleratedModule5Link",
    bankMode: "bankMode",
    externalBankLink: "externalBankLink",
    businessLink: "businessLink",
    filesLink: "filesLink",
    bankingLink: "bankingLink",
    goPublicToggle: "goPublicEnabled",
    publicLink: "publicLink",
    programmaticEmail: "programmaticEmail",
    programmaticBanking: "programmaticBanking",
    searchMode: "searchMode",
    externalSearchLink: "externalSearchLink",
    socialMode: "socialMode",
    externalSocialLink: "externalSocialLink",
    workMode: "workMode",
    externalWorkLink: "externalWorkLink",
    streamingMode: "streamingMode",
    externalStreamingLink: "externalStreamingLink"
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
    enableInterceptor: true,
    enableAccelerator: true,
    enableNavigator: true,
    enableRouter: true,
    enablePulseGPU: true,
    enablePulseDecode: true,
    enableContentRuntime: true,
    enableDevOverlay: true,

    blockTrackers: true,
    blockAnalytics: true,
    blockAds: true,
    blockFingerprinting: false,

    upgradeHTTPtoHTTPS: true,
    forceHTTP2: false,
    forceHTTP3: false,
    forceQUIC: false,

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

    routerPrioritizeCDN: true,
    routerPrioritizeAssets: true,
    routerPrioritizeHomeUniverse: true,
    routerLatencyScan: true,
    routerRealmScan: true,
    routerFallbackScan: true,
    routerAdaptiveRouting: true,

    experimentalGPUPaths: false,
    experimentalDecodePaths: false,
    experimentalRouteGraph: false,
    experimentalAIWarmPath: false,
    experimentalTemporalNavigation: false,
    experimentalPredictivePrefetch: true,
    experimentalQuantumRouting: true,
    experimentalPortalTransitions: false,
    experimentalMeshAwareness: false,

    homeUniverse: [
      "pulseworld.net",
      "pulseworld.me",
      "pulseworld.money",
      "pulseworld.biz",
      "binaryos.net",
      "booleanlogic.net",
      "gpuprocessing.net",
      "serviceworker.net",
      "orbitalmap.net"
    ],
    emailMode: document.getElementById("emailMode").value,
    externalEmailLink: document.getElementById("externalEmailLink").value.trim(),
    acceleratedModule1Link: document.getElementById("acceleratedModule1Link").value.trim(),
    acceleratedModule2Link: document.getElementById("acceleratedModule2Link").value.trim(),
    acceleratedModule3Link: document.getElementById("acceleratedModule3Link").value.trim(),
    acceleratedModule4Link: document.getElementById("acceleratedModule4Link").value.trim(),
    acceleratedModule5Link: document.getElementById("acceleratedModule5Link").value.trim(),

    tetherCode: document.getElementById("tetherCode").value.trim(),

    bankMode: document.getElementById("bankMode").value,
    externalBankLink: document.getElementById("externalBankLink").value.trim(),

    businessLink: document.getElementById("businessLink").value.trim(),
    filesLink: document.getElementById("filesLink").value.trim(),
    bankingLink: document.getElementById("bankingLink").value.trim(),

    searchMode: document.getElementById("searchMode").value,
    externalSearchLink: document.getElementById("externalSearchLink").value.trim(),
    socialMode: document.getElementById("socialMode").value,
    externalSocialLink: document.getElementById("externalSocialLink").value.trim(),
    workMode: document.getElementById("workMode").value,
    externalWorkLink: document.getElementById("externalWorkLink").value.trim(),
    streamingMode: document.getElementById("streamingMode").value,
    externalStreamingLink: document.getElementById("externalStreamingLink").value.trim(),
    
    goPublicEnabled: document.getElementById("goPublicToggle").checked,
    publicLink: document.getElementById("publicLink").value.trim(),

    programmaticEmail: document.getElementById("programmaticEmail").checked,
    programmaticBanking: document.getElementById("programmaticBanking").checked
  };

  await chrome.storage.local.set({ [EXTENSION_SETTINGS_KEY]: settings });

  PB_LOG.change("Extension Settings Saved", before[EXTENSION_SETTINGS_KEY], settings);
}


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

async function updateLinkedPWInputs() {
  // Find all selects
  const selects = document.querySelectorAll(".pw-select");

  selects.forEach(select => {
    // Example: "emailMode" → "externalEmailLink"
    const modeId = select.id; // emailMode
    const baseName = modeId.replace("Mode", ""); // email
    const inputId = "external" + baseName.charAt(0).toUpperCase() + baseName.slice(1) + "Link";
    // externalEmailLink

    const linkedInput = document.getElementById(inputId);
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
  await saveExtensionSettingsUI();
}

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
      "tetherCode",
      "externalEmailLink",
      "acceleratedModule1Link",
      "acceleratedModule2Link",
      "acceleratedModule3Link",
      "acceleratedModule4Link",
      "acceleratedModule5Link",
      "bankMode",
      "externalBankLink",
      "businessLink",
      "filesLink",
      "bankingLink",
      "goPublicToggle",
      "pulseStreamToggle",
      "publicLink",
      "programmaticEmail",
      "programmaticBanking",
      "searchMode",
      "externalSearchLink",
      "socialMode",
      "externalSocialLink",
      "workMode",
      "externalWorkLink",
      "streamingMode",
      "externalStreamingLink"
    ];

    idsToWatch.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      // Find nearest pw-note (same row or next sibling)
      const note = el.closest(".pw-section")?.querySelector(".pw-note")
             || el.parentElement.querySelector(".pw-note");

      if (note) {
        // Hover in → activate note
        el.addEventListener("mouseenter", () => {
          note.classList.add("active");
        });

        // Hover out → deactivate note
        el.addEventListener("mouseleave", () => {
          note.classList.remove("active");
        });
      }

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

setTimeout(updateLinkedPWInputs, 250);

// Run whenever ANY pw-select changes
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("pw-select")) {
    updateLinkedPWInputs();
  }
});

if (document.getElementById("btn-back")) {
    document.getElementById("btn-back").onclick = () => {
      window.location.href = chrome.runtime.getURL("PBPopup.html");
    };
};

if (document.getElementById("tetherBtn")) {
  document.getElementById("tetherBtn").onclick = () => {
    if (document.getElementById("tetherCode").value && document.getElementById("tetherCode").value.length === 4) {
      try {
        fetch("/.netlify/functions/PULSE-SERVER-SQL", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-pulse-mode": "sync" },
          body: JSON.stringify({ action: "extsync", tetherCode: document.getElementById("tetherCode").value.trim(), host: "PulseBrowserOS", online: true, inactive: false })
        }).then((response) => {
          if (!response.ok) document.getElementById("tetherCode").value = "";
        }).catch(() => {
          document.getElementById("tetherCode").style.backgroundColor = "red";
        });
      } catch (err) {
        document.getElementById("tetherCode").style.backgroundColor = "red";
        setTimeout(() => {
          document.getElementById("tetherCode").style.backgroundColor = "#1a1a1d";
        }, 2000);
      }
    } else {
      document.getElementById("tetherCode").style.backgroundColor = "red";
      setTimeout(() => {
        document.getElementById("tetherCode").style.backgroundColor = "#1a1a1d";
      }, 2000);
    };
  };
};