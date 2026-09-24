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
    modulesPopup.style.height = "178px"; // slide UP
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


document.getElementById("mod-1").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();

    console.log("[FrontPage] moduleFav1Icon module clicked. Settings:", settings);

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.acceleratedModule1Link?.trim() || "https://www.onedrive.com/";

    console.log("[FrontPage] Opening External moduleFav1Icon Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    chrome.tabs.create({ url: link });
});


document.getElementById("mod-2").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();

    console.log("[FrontPage] moduleFav2Icon module clicked. Settings:", settings);

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.acceleratedModule2Link?.trim() || "https://www.office.com/";

    console.log("[FrontPage] Opening External moduleFav2Icon Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    chrome.tabs.create({ url: link });
});


document.getElementById("mod-3").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();

    console.log("[FrontPage] moduleFav3Icon module clicked. Settings:", settings);

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.acceleratedModule3Link?.trim() || "https://www.amazon.com/";

    console.log("[FrontPage] Opening External moduleFav3Icon Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    chrome.tabs.create({ url: link });
});


document.getElementById("mod-4").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();

    console.log("[FrontPage] moduleFav4Icon module clicked. Settings:", settings);

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.acceleratedModule4Link?.trim() || "https://www.coinbase.com/";

    console.log("[FrontPage] Opening External moduleFav4Icon Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    chrome.tabs.create({ url: link });
});


document.getElementById("mod-5").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();

    console.log("[FrontPage] moduleFav5Icon module clicked. Settings:", settings);

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.acceleratedModule5Link?.trim() || "https://www.bridgebase.com/";

    console.log("[FrontPage] Opening External moduleFav5Icon Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    chrome.tabs.create({ url: link });
});


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
    const link = settings.externalStreamLink?.trim() || "https://www.hulu.com";

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
  let icon;
  let u;

  try {
    u = new URL(url);
  } catch {
    // If URL parsing fails, bail out with nothing
    return;
  }

  // Default external favicon
  icon = `${u.origin}/favicon.ico`;

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
    if (u.hostname.includes("office.com")) {
      return "https://res.cdn.office.net/officehub/images/content/images/unauth-copilotcom/favicon-copilot-brand-refresh-23392c1f66.ico";
    }

    if (u.hostname.includes("github.com")) {
      return "https://github.githubassets.com/favicons/favicon.svg";
    }

    if (u.hostname.includes("youtube.com")) {
      return "https://www.youtube.com/s/desktop/fe2e0b8b/img/favicon_32x32.png";
    }

    if (u.hostname.includes("discord.com")) {
      return "https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico";
    }


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
    // If anything inside blows up, still return whatever icon we had
    return icon;
  }
}

function getReadableName(url) {
  try {
    const u = new URL(url);

    // Remove protocol + www
    let host = u.hostname.replace("www.", "");

    // Remove TLD (.com, .net, etc)
    host = host.split(".")[0];

    // Replace dashes with spaces
    host = host.replace(/[-_]/g, " ");

    // Capitalize each word
    host = host.replace(/\b\w/g, c => c.toUpperCase());

    return host;
  } catch {
    return url;
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
    const fav = getFavicon(settings.externalStreamLink);
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
  
  if (settings.acceleratedModule1Link) {
    const moduleFav1Link = document.getElementById("mod1");
    const moduleFav1Icon = document.getElementById("module1");
    const fav1 = getFavicon(settings.acceleratedModule1Link);
    if (fav1) {
      moduleFav1Link.innerText = getReadableName(settings.acceleratedModule1Link) + " ";
      moduleFav1Icon.innerText = "⚡";
      moduleFav1Icon.style.backgroundImage = `url(${fav1})`;
      moduleFav1Icon.style.backgroundSize = "contain";
      moduleFav1Icon.style.backgroundRepeat = "no-repeat";
    }
  }


  if (settings.acceleratedModule2Link) {
    const moduleFav2Link = document.getElementById("mod2");
    const moduleFav2Icon = document.getElementById("module2");
    const fav2 = getFavicon(settings.acceleratedModule2Link);
    if (fav2) {
      moduleFav2Link.innerText = getReadableName(settings.acceleratedModule2Link) + " ";
      moduleFav2Icon.innerText = "⚡";
      moduleFav2Icon.style.backgroundImage = `url(${fav2})`;
      moduleFav2Icon.style.backgroundSize = "contain";
      moduleFav2Icon.style.backgroundRepeat = "no-repeat";
    }
  }


  if (settings.acceleratedModule3Link) {
    const moduleFav3Link = document.getElementById("mod3");
    const moduleFav3Icon = document.getElementById("module3");
    const fav3 = getFavicon(settings.acceleratedModule3Link);
    if (fav3) {
      moduleFav3Link.innerText = getReadableName(settings.acceleratedModule3Link) + " ";
      moduleFav3Icon.innerText = "⚡";
      moduleFav3Icon.style.backgroundImage = `url(${fav3})`;
      moduleFav3Icon.style.backgroundSize = "contain";
      moduleFav3Icon.style.backgroundRepeat = "no-repeat";
    }
  }


  if (settings.acceleratedModule4Link) {
    const moduleFav4Link = document.getElementById("mod4");
    const moduleFav4Icon = document.getElementById("module4");
    const fav4 = getFavicon(settings.acceleratedModule4Link);
    if (fav4) {
      moduleFav4Link.innerText = getReadableName(settings.acceleratedModule4Link) + " ";
      moduleFav4Icon.innerText = "⚡";
      moduleFav4Icon.style.backgroundImage = `url(${fav4})`;
      moduleFav4Icon.style.backgroundSize = "contain";
      moduleFav4Icon.style.backgroundRepeat = "no-repeat";
    }
  }

  if (settings.acceleratedModule5Link) {
    const moduleFav5Link = document.getElementById("mod5");
    const moduleFav5Icon = document.getElementById("module5");
    const fav5 = getFavicon(settings.acceleratedModule5Link);
    if (fav5) {
      moduleFav5Link.innerText = getReadableName(settings.acceleratedModule5Link) + " ";
      moduleFav5Icon.innerText = "⚡";
      moduleFav5Icon.style.backgroundImage = `url(${fav5})`;
      moduleFav5Icon.style.backgroundSize = "contain";
      moduleFav5Icon.style.backgroundRepeat = "no-repeat";
    }
  }
}
