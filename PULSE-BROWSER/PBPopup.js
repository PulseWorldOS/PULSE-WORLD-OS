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

// // ---------------------------------------------------------------------------
// // BUTTON: Kernel Ping
// // ---------------------------------------------------------------------------
// document.getElementById("btn-ping").onclick = () => {
//   chrome.runtime.sendMessage({ type: "PULSE_OS_PING" }, (res) => {
//     if (chrome.runtime.lastError) return write("Kernel unreachable.");
//     write("Kernel Response:\n" + JSON.stringify(res, null, 2));
//   });
// };



// // ---------------------------------------------------------------------------
// // BUTTON: Open PulseWorld
// // ---------------------------------------------------------------------------
// document.getElementById("btn-open-pulseworld").onclick = () => {
//   chrome.runtime.sendMessage({
//     type: "PBNAV_OPEN_PULSEWORLD",
//     url: "https://www.pulseworld.net"
//   }, () => write("PulseWorld opened."));
// };

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

write("Welcome to PulseWorld!");

setTimeout(write("This is PulseBrowser OS, Tier 2 Engine."), 450);

setTimeout(write("Scanning Environment.."), 1050);

setTimeout(write("We are Here to Help!"), 2050);



// document.getElementById("btn-toggle-decode").onclick = () =>
//   toggleSetting("enablePulseDecode", "PulseDecode");

document.getElementById("btn-open-settings").onclick = () =>
  window.location.href = chrome.runtime.getURL("PBSettings.html");

document.getElementById("btn-open-identity").onclick = async () => {
  const internalURL = "https://www.pulseworld.net?Impulse=PulseWorldInventory";
  console.log("[FrontPage] Opening Internal PulseIdentity:", internalURL);

  chrome.tabs.create({ url: internalURL });
};

document.getElementById("btn-open-business").onclick = async () => {

    const settings = await pbLoadExtensionSettings();

    console.log("[FrontPage] Bank module clicked. Settings:", settings);

    // INTERNAL MODE → open PulseWorld Bank on the real domain
    if (settings.workMode === "internal") {
        const internalURL = "https://www.pulseworld.biz";
        console.log("[FrontPage] Opening Internal PulseBusiness:", internalURL);

        chrome.tabs.create({ url: internalURL });
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.externalWorkLink?.trim() || "https://www.pulseworld.biz/";

    console.log("[FrontPage] Opening External Business Provider:", link);

    chrome.tabs.create({ url: link });
};
document.getElementById("btn-open-email").onclick = async () => {

    const settings = await pbLoadExtensionSettings();

    console.log("[FrontPage] Email module clicked. Settings:", settings);

    // INTERNAL MODE → open PulseWorld Email on the real domain
    if (settings.emailMode === "internal") {
        const internalURL = "https://www.pulseworld.net?Impulse=PulseWorldEmail";
        console.log("[FrontPage] Opening Internal PulseMail:", internalURL);

        chrome.tabs.create({ url: internalURL });
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.externalEmailLink?.trim() || "https://mail.google.com/";

    console.log("[FrontPage] Opening External Email Provider:", link);

    chrome.tabs.create({ url: link });
};

document.getElementById("btn-open-bank").onclick = async () => {

    const settings = await pbLoadExtensionSettings();

    console.log("[FrontPage] Bank module clicked. Settings:", settings);

    // INTERNAL MODE → open PulseWorld Bank on the real domain
    if (settings.bankMode === "internal") {
        const internalURL = "https://www.pulseworld.net?Impulse=PulseWorldRewards";
        console.log("[FrontPage] Opening Internal PulseBank:", internalURL);

        chrome.tabs.create({ url: internalURL });
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.externalBankLink?.trim() || "https://www.bankofamerica.com/";

    console.log("[FrontPage] Opening External Bank Provider:", link);

    chrome.tabs.create({ url: link });
};

// // ---------------------------------------------------------------------------
// // BUTTON: Refresh HUD (Realm Snapshot)
// // ---------------------------------------------------------------------------
// document.getElementById("btn-refresh-hud").onclick = () => {
//   chrome.runtime.sendMessage({ type: "PBREALM_GET" }, (realm) => {
//     write("Pulse HUD refreshed.\nRealm:\n" + JSON.stringify(realm.state, null, 2));
//   });
// };

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
// // ---------------------------------------------------------------------------
// // BUTTON: Site HUD (Realm Snapshot)
// // ---------------------------------------------------------------------------
// document.getElementById("btn-site-hud").onclick = () => {

//   // STEP 1 — Get the active tab
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     const tab = tabs[0];
//     if (!tab) {
//       write("No active tab found.");
//       return;
//     }

//     // STEP 2 — Get settings
//     chrome.runtime.sendMessage({ type: "PBSETTINGS_GET" }, (settings) => {

//       // STEP 3 — Get REALM for THIS tab
//       chrome.runtime.sendMessage(
//         { type: "PBREALM_GET", tabId: tab.id },
//         (realm) => {

//           write(
//             "Pulse Site HUD\n" +
//             "URL: " + tab.url + "\n" +
//             "Realm:\n" + JSON.stringify(realm, null, 2) + "\n" +
//             "Setup:\n" + JSON.stringify(settings.settings, null, 2)
//           );
//         }
//       );
//     });
//   });
// };


// // ---------------------------------------------------------------------------
// // BUTTON: Reset OS Settings
// // ---------------------------------------------------------------------------
// document.getElementById("btn-reset-os").onclick = () => {
//   chrome.runtime.sendMessage({ type: "PBSETTINGS_RESET" }, () => {
//     if (chrome.runtime.lastError) console.log(chrome.runtime.lastError);
//     write("PulseBrowser OS settings reset to defaults.");
//   });
// };
