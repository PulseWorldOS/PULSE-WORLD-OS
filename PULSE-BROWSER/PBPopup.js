// ============================================================================
//  PBPopup.js — PulseBrowser OS Control Console (Ultra Edition v6.0)
//  Full OS cockpit • subsystem toggles • diagnostics • warm-path triggers
// ============================================================================

console.log("%c[PULSEBROWSER] PBPopup (Ultra Edition v6.0) loaded",
  "color:#00FF9C; font-weight:bold; font-family:monospace;");

const out = document.getElementById("output");

// Utility: write to console panel
function write(msg) {
  out.textContent = msg;
}

// Utility: load settings
function loadSettings(cb) {
  chrome.runtime.sendMessage({ type: "PBSETTINGS_GET" }, (res) => {
    if (chrome.runtime.lastError) return write("Settings unreachable.");
    cb(res.settings);
  });
}

// Utility: save settings
function saveSettings(settings, cb) {
  chrome.runtime.sendMessage({ type: "PBSETTINGS_SET", settings }, () => {
    cb && cb();
  });
}

// ---------------------------------------------------------------------------
// BUTTON: Kernel Ping
// ---------------------------------------------------------------------------
document.getElementById("btn-ping").onclick = () => {
  chrome.runtime.sendMessage({ type: "PULSE_OS_PING" }, (res) => {
    if (chrome.runtime.lastError) return write("Kernel unreachable.");
    write("Kernel Response:\n" + JSON.stringify(res, null, 2));
  });
};

// ---------------------------------------------------------------------------
// BUTTON: Clear Pulse Caches
// ---------------------------------------------------------------------------
document.getElementById("btn-clear-caches").onclick = () => {
  chrome.runtime.sendMessage({ type: "PULSE_OS_CLEAR_PULSE_CACHES" }, () => {
    write("Pulse caches cleared.");
  });
};

// ---------------------------------------------------------------------------
// BUTTON: Warm Boot (preconnect all home domains)
// ---------------------------------------------------------------------------
document.getElementById("btn-warmboot").onclick = () => {
  chrome.runtime.sendMessage({
    type: "PBACC_PRECONNECT",
    origins: [
      "https://www.pulseworld.me",
      "https://www.pulseworld.net",
      "https://www.pulseworld.money",
      "https://www.pulseworld.biz",
      "https://www.binaryos.net",
      "https://www.booleanlogic.net",
      "https://www.gpuprocessing.net",
      "https://www.serviceworker.net",
      "https://www.orbitalmap.net"
    ]
  }, () => write("Warm boot executed."));
};

// ---------------------------------------------------------------------------
// BUTTON: Full Warm-Path (preconnect + preload + prefetch)
// ---------------------------------------------------------------------------
document.getElementById("btn-warmpath").onclick = () => {
  chrome.runtime.sendMessage({
    type: "PBACC_WARMPATH",
    origin: "https://www.pulseworld.net"
  }, () => write("Full warm-path executed."));
};

// ---------------------------------------------------------------------------
// BUTTON: Accelerate Current Tab
// ---------------------------------------------------------------------------
document.getElementById("btn-accelerate-tab").onclick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0]?.url;
    if (!url) return write("No active tab.");

    chrome.runtime.sendMessage({ type: "PBACC_ACCELERATE", url }, () => {
      write("Acceleration triggered for:\n" + url);
    });
  });
};

// ---------------------------------------------------------------------------
// BUTTON: GPU Warm-Path
// ---------------------------------------------------------------------------
document.getElementById("btn-gpuwarm").onclick = () => {
  chrome.runtime.sendMessage({ type: "PBACC_GPUWARM" }, () => {
    write("GPU warm-path triggered.");
  });
};

// ---------------------------------------------------------------------------
// BUTTON: Decode Warm-Path
// ---------------------------------------------------------------------------
document.getElementById("btn-decodewarm").onclick = () => {
  chrome.runtime.sendMessage({ type: "PBACC_DECODEWARM" }, () => {
    write("Decode warm-path triggered.");
  });
};

// ---------------------------------------------------------------------------
// BUTTON: Show Kernel Status
// ---------------------------------------------------------------------------
document.getElementById("btn-status").onclick = () => {
  chrome.runtime.sendMessage({ type: "PBDEV_STATUS" }, () => {
    write("Kernel status logged to console.");
  });
};

// ---------------------------------------------------------------------------
// BUTTON: Open PulseWorld
// ---------------------------------------------------------------------------
document.getElementById("btn-open-pulseworld").onclick = () => {
  chrome.runtime.sendMessage({
    type: "PBNAV_OPEN_PULSEWORLD",
    url: "https://www.pulseworld.net"
  }, () => write("PulseWorld opened."));
};

// ---------------------------------------------------------------------------
// SUBSYSTEM TOGGLES (Interceptor / Accelerator / Navigator / Router / GPU / Decode)
// ---------------------------------------------------------------------------
function toggleSetting(key, label) {
  loadSettings((settings) => {
    settings[key] = !settings[key];
    saveSettings(settings, () => {
      write(label + ": " + (settings[key] ? "ON" : "OFF"));
    });
  });
}

document.getElementById("btn-toggle-interceptor").onclick = () =>
  toggleSetting("enableInterceptor", "Interceptor");

document.getElementById("btn-toggle-accelerator").onclick = () =>
  toggleSetting("enableAccelerator", "Accelerator");

document.getElementById("btn-toggle-navigator").onclick = () =>
  toggleSetting("enableNavigator", "Navigator");

document.getElementById("btn-toggle-router").onclick = () =>
  toggleSetting("enableRouter", "Router");

document.getElementById("btn-toggle-gpu").onclick = () =>
  toggleSetting("enablePulseGPU", "PulseGPU");

document.getElementById("btn-toggle-decode").onclick = () =>
  toggleSetting("enablePulseDecode", "PulseDecode");

document.getElementById("btn-open-settings").onclick = () =>
  window.location.href = chrome.runtime.getURL("PBSettings.html");


// ---------------------------------------------------------------------------
// BUTTON: Refresh HUD (Realm Snapshot)
// ---------------------------------------------------------------------------
document.getElementById("btn-refresh-hud").onclick = () => {
  chrome.runtime.sendMessage({ type: "PBREALM_GET" }, (realm) => {
    write("Pulse HUD refreshed.\nRealm:\n" + JSON.stringify(realm.state, null, 2));
  });
};

function updateHUD() {
  const body = document.getElementById("pb-hud-body");
  if (!body) return;

  chrome.runtime.sendMessage({ type: "PBREALM_GET" }, (realmRes) => {
    chrome.runtime.sendMessage({ type: "PBSETTINGS_GET" }, (settingsRes) => {

      const realm = realmRes.state || {};
      const settings = settingsRes.settings || {};

      // ---------------------------------------------
      // ⭐ PAGE LOAD TIME (ms)
      // ---------------------------------------------
      let loadTime = "-";

      try {
        const nav = performance.getEntriesByType("navigation")[0];
        if (nav) {
          loadTime = Math.round(nav.loadEventEnd);
        } else {
          // fallback for older browsers
          const t = performance.timing;
          loadTime = Math.round(t.loadEventEnd - t.navigationStart);
        }
      } catch (e) {
        loadTime = "-";
      }

      // ---------------------------------------------
      // ⭐ DOM CONTENT LOADED TIME (ms)
      // ---------------------------------------------
      let domTime = "-";

      try {
        const nav = performance.getEntriesByType("navigation")[0];
        if (nav) {
          domTime = Math.round(nav.domContentLoadedEventEnd);
        } else {
          // fallback for older browsers
          const t = performance.timing;
          domTime = Math.round(t.domContentLoadedEventEnd - t.navigationStart);
        }
      } catch (e) {
        domTime = "-";
      }


      body.innerHTML = `
        Page: ${realm.lastPage || "-"}<br/>
        URL: ${realm.lastURL || "-"}<br/>
        Domain: ${realm.lastDomainClass || "-"}<br/>
        Ping: ${realm.lastPing || "-"}<br/>
        Mutations: ${realm.mutationCount}<br/>
        GPUWarm: ${realm.gpuWarmCount}<br/>
        DecodeWarm: ${realm.imagesDecoded}<br/>
        WarmPaths: ${realm.warmPathsTriggered}<br/>
        Accel: ${settings.enableAccelerator}<br/>
        NAV: ${settings.enableNavigator}<br/>
        Intercept: ${settings.enableInterceptor}<br/>
        DOM: ${domTime}ms<br/>
        Load: ${loadTime}ms<br/>
        TS: ${new Date().toLocaleTimeString()}
      `;
    });
  });
}
// ---------------------------------------------------------------------------
// BUTTON: Site HUD (Realm Snapshot)
// ---------------------------------------------------------------------------
document.getElementById("btn-site-hud").onclick = () => {

  // STEP 1 — Get the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab) {
      write("No active tab found.");
      return;
    }

    // STEP 2 — Get settings
    chrome.runtime.sendMessage({ type: "PBSETTINGS_GET" }, (settings) => {

      // STEP 3 — Get REALM for THIS tab
      chrome.runtime.sendMessage(
        { type: "PBREALM_GET", tabId: tab.id },
        (realm) => {

          write(
            "Pulse Site HUD\n" +
            "URL: " + tab.url + "\n" +
            "Realm:\n" + JSON.stringify(realm, null, 2) + "\n" +
            "Setup:\n" + JSON.stringify(settings.settings, null, 2)
          );
        }
      );
    });
  });
};


// ---------------------------------------------------------------------------
// BUTTON: Reset OS Settings
// ---------------------------------------------------------------------------
document.getElementById("btn-reset-os").onclick = () => {
  chrome.runtime.sendMessage({ type: "PBSETTINGS_RESET" }, () => {
    if (chrome.runtime.lastError) console.log(chrome.runtime.lastError);
    write("PulseBrowser OS settings reset to defaults.");
  });
};
