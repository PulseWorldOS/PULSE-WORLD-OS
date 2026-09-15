// ============================================================================
//  PBPopup.js — PulseBrowser OS Control Console (Ultra Edition v6.0)
//  Full OS cockpit • subsystem toggles • diagnostics • warm-path triggers
// ============================================================================

console.log("%c[PULSEBROWSER] PBPopup (Ultra Edition v6.0) loaded",
  "color:#00FF9C; font-weight:bold; font-family:monospace;");

const out = document.getElementById("output");
// WORK MODULE

// Utility: write to console panel
function write(msg) {
  out.innerHTML = out.innerHTML + msg + "<br>";
}


// Utility: load settings
function loadSettings(cb) {
  chrome.runtime.sendMessage({ type: "PBSETTINGS_GET" }, (res) => {
    if (chrome.runtime.lastError) return write("Settings unreachable.");
    cb(res.settings);
  });
}

// Utility: load settings
function loadConsole(cb) {
  chrome.runtime.sendMessage({ type: "PBCONSOLE_GET" }, (res) => {
    cb(res.console);
  });
}

// Utility: save settings
function saveSettings(settings, cb) {
  chrome.runtime.sendMessage({ type: "PBSETTINGS_SET", settings }, () => {
    cb && cb();
  });
}


// Utility: save settings
function saveConsole(console, cb) {
  chrome.runtime.sendMessage({ type: "PBCONSOLE_SET", console }, () => {
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

write("<bold><center>Welcome to PulseWorld OS!</center></bold>");

write("Your running PulseBrowser OS, Tier 2 Engine.");

write("We are Always Here When you Need us..");

write("Open Settings to Tune Your Browser..");

write("Enter PulseWorld, to Own your Digital World!");

write("-- AI Overmind Prime");

const modulesBtn = document.getElementById("btn-open-modules");
const modulesPopup = document.getElementById("modules-popup");

let modulesOpen = false;

modulesBtn.onclick = () => {
  modulesOpen = !modulesOpen;

  if (modulesOpen) {
    modulesPopup.style.height = "170px"; // slide UP
  } else {
    modulesPopup.style.height = "0";     // slide DOWN (collapse)
  }
};

// document.getElementById("btn-toggle-decode").onclick = () =>
//   toggleSetting("enablePulseDecode", "PulseDecode");

document.getElementById("btn-open-settings").onclick = () => {
  window.location.href = chrome.runtime.getURL("PBSettings.html");
  write("Accessing PulseSettings..");
};

document.getElementById("btn-open-identity").onclick = async () => {
  const internalURL = "https://www.pulseworld.net?Impulse=PulseWorldInventory";
  console.log("[FrontPage] Opening Internal PulseIdentity:", internalURL);

  chrome.tabs.create({ url: internalURL });
  write("Accessing PulseIdentity..");
};

document.getElementById("btn-open-business").onclick = async () => {
    const internalURL = "https://www.pulseworld.biz";
    console.log("[FrontPage] Opening Internal PulseBusiness:", internalURL);
    chrome.tabs.create({ url: internalURL });
    write("Accessing PulseBusiness Module..");
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
    write("Accessing PulseMail Module..");
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
    write("Accessing PulseBank Module..");
};


document.getElementById("mod-social").onclick = async () => {

    const settings = await pbLoadExtensionSettings();

    console.log("[FrontPage] Social Media module clicked. Settings:", settings);

    // INTERNAL MODE → open PulseWorld on the real domain
    if (settings.socialMode === "internal") {
        const internalURL = "https://www.pulseworld.net?Impulse=PulseWorldMessenger";
        console.log("[FrontPage] Opening Internal PulseMessenger:", internalURL);
        chrome.runtime.sendMessage({
          type: "PB_HOVER_PREFETCH",
          href: internalURL
        });
        // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
        try {
          fetch(internalURL, { mode: "no-cors" }).catch(() => {});
        } catch (_) {}
        chrome.tabs.create({ url: internalURL });
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.externalSocialLink?.trim() || "https://www.facebook.com/";

    console.log("[FrontPage] Opening External Social Media Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    chrome.tabs.create({ url: link });
};

document.getElementById("mod-work").onclick = async () => {
    
    const settings = await pbLoadExtensionSettings();

    console.log("[FrontPage] Work module clicked. Settings:", settings);

    // INTERNAL MODE → open PulseWorld Work on the real domain
    if (settings.workMode === "internal") {
        const internalURL = "https://www.pulseworld.biz";
        console.log("[FrontPage] Opening Internal PulseWork:", internalURL);
        chrome.runtime.sendMessage({
          type: "PB_HOVER_PREFETCH",
          href: internalURL
        });
        // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
        try {
          fetch(internalURL, { mode: "no-cors" }).catch(() => {});
        } catch (_) {}
        chrome.tabs.create({ url: internalURL });
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.externalWorkLink?.trim() || "https://www.pulseworld.net/";

    console.log("[FrontPage] Opening External Work Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    chrome.tabs.create({ url: link });
};


document.getElementById("mod-stream").onclick = async () => {

    const settings = await pbLoadExtensionSettings();

    console.log("[FrontPage] Streaming module clicked. Settings:", settings);

    // INTERNAL MODE → open PulseWorld Streaming on the real domain
    if (settings.streamMode === "internal") {
        const internalURL = "https://www.netflix.com";
        console.log("[FrontPage] Opening Internal Netflix:", internalURL);
        chrome.runtime.sendMessage({
          type: "PB_HOVER_PREFETCH",
          href: internalURL
        });
        // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
        try {
          fetch(internalURL, { mode: "no-cors" }).catch(() => {});
        } catch (_) {}
        chrome.tabs.create({ url: internalURL });
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.externalStreamingLink?.trim() || "https://www.hulu.com";

    console.log("[FrontPage] Opening External Streaming Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
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

setTimeout(loadWorld,450);
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

function getFavicon(url, flags = {}) {
  const u = new URL(url);

  // Default external favicon
  let icon = `${u.origin}/favicon.ico`;

  // PulseWorld domains
  const PB_HOMES = [
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

  try {
    // Check if this is a PulseWorld domain
    const isPulseWorld = PB_HOMES.some(domain => u.hostname.endsWith(domain));

    if (isPulseWorld) {
      // MODULE‑AWARE FAVICON SWITCHING
      if (flags.isSW) {
        icon = `${u.origin}/SWFavIcon.ico`;
      }
      else if (flags.isBinaryOS) {
        icon = `${u.origin}/BOFavIcon.ico`;
      }
      else if (flags.isGPU) {
        icon = `${u.origin}/GPFavIcon.ico`;
      }
      else if (flags.isLogic) {
        icon = `${u.origin}/BLFavIcon.ico`;
      }
      else if (flags.isOrb) {
        icon = `${u.origin}/OMFavIcon.ico`;
      }
      else if (flags.isBiz) {
        icon = `${u.origin}/PWBFavIcon.ico`;
      }
      else if (flags.isSettings) {
        icon = `${u.origin}/PWBFavIcon.ico`;
      }
      else if (flags.isMoney) {
        icon = `${u.origin}/PWMFavIcon.ico`;
      }
      else {
        icon = `${u.origin}/PWFavIcon.ico`; // Default PulseWorld favicon
      }

      console.log("PulseWorld favicon:", icon);
      return icon;
    }

    // External site → strip subdomain for cleaner favicon
    const parts = u.hostname.split(".");
    if (parts.length > 2) {
      const root = parts.slice(parts.length - 2).join(".");
      icon = `https://${root}/favicon.ico`;
    }

    console.log("External favicon:", icon);
    return icon;

  } catch {
    return; // external ONLY — no fallback
  }
}

// // ---------------------------------------------------------------------------
// // BUTTON: Reset OS Settings
// // ---------------------------------------------------------------------------
// document.getElementById("btn-reset-os").onclick = () => {
//   chrome.runtime.sendMessage({ type: "PBSETTINGS_RESET" }, () => {
//     if (chrome.runtime.lastError) console.log(chrome.runtime.lastError);
//     write("PulseBrowser OS settings reset to defaults.");
//   });
// };


// Utility: load settings
async function loadWorld() {
  const workIcon = document.getElementById("moduleWorkIcon");
  const streamIcon = document.getElementById("moduleStreamIcon");
  const socialIcon = document.getElementById("moduleSocialIcon");
    
  const settings = await pbLoadExtensionSettings();
  // INTERNAL MODE → open PulseWorld Work on the real domain
  if (settings.workMode === "internal") {
      workIcon.innerText = "💼";      // your original emoji
      workIcon.style.backgroundImage = "";
  } else {        
    const fav = getFavicon(settings.externalWorkLink);
    if (fav) {
      workIcon.innerText = "";
      workIcon.style.backgroundImage = `url(${fav})`;
      workIcon.style.backgroundSize = "contain";
      workIcon.style.backgroundRepeat = "no-repeat";
    }
  }
  if (settings.streamMode === "internal") {
      streamIcon.innerText = "📺";      // your original emoji
      streamIcon.style.backgroundImage = "";
  } else {        
    const fav = getFavicon(settings.externalStreamingLink);
    if (fav) {
      streamIcon.innerText = "";
      streamIcon.style.backgroundImage = `url(${fav})`;
      streamIcon.style.backgroundSize = "contain";
      streamIcon.style.backgroundRepeat = "no-repeat";
    }
  }
  if (settings.socialMode === "internal") {
      socialIcon.innerText = "🎭";      // your original emoji
      socialIcon.style.backgroundImage = "";
  } else {        
    const fav = getFavicon(settings.externalSocialLink);
    if (fav) {
      socialIcon.innerText = "";
      socialIcon.style.backgroundImage = `url(${fav})`;
      socialIcon.style.backgroundSize = "contain";
      socialIcon.style.backgroundRepeat = "no-repeat";
    }
  }
}
