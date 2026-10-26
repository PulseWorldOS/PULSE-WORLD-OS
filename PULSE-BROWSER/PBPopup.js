// ============================================================================
//  PBPopup.js — PulseBrowser OS Control Console (Ultra Edition v6.0)
//  Full OS cockpit • subsystem toggles • diagnostics • warm-path triggers
// ============================================================================
let PulseRealm = {};
let PulseRealmSettings = {};

// Persistent favicon cache stored in chrome.storage.local
// Local in-memory mirror for speed
let PBFAVICON_CACHE = {};
let nowPP = Date.now(); // numeric timestamp
let lastnowPP = Date.now(); // numeric timestamp

function isValid(t) {
  return (
    typeof t === "number" &&
    Number.isFinite(t) &&
    t > 0
  );
}

chrome.runtime.sendMessage({ type: "PULSE_OS_PING", time: nowPP }, (response) => {
  if (chrome.runtime.lastError) return write("Kernel unreachable.");
  write("Kernel Response:\n" + JSON.stringify(res, null, 2));
  if (response.time && isValid(response.time)) {
      nowPP = response.time;
  }
});

chrome.storage.local.get(["SessionStart"], (res) => {
  if (isValid(res.SessionStart)) {
    nowPP = res.SessionStart;
    console.log("PulseBrowser OS Local Session Start: " + nowPP);
  }
});


// Load cache from storage at startup
chrome.storage.local.get(["PulseBrowserFaviconCaches1"], (res) => {
  if (res.PulseBrowserFaviconCaches1) {
    PBFAVICON_CACHE = res.PulseBrowserFaviconCaches1;
    console.log("PulseBrowser OS Accelerated Modules Icon List: ", PBFAVICON_CACHE);
  }
});

function saveCache() {
  chrome.storage.local.set({ PulseBrowserFaviconCaches1: PBFAVICON_CACHE });
}

document.addEventListener("keydown", (e) => {
  pulseConsoleKey(e);
});

function isPulseWorld(origin) {
  return origin.includes("pulseworld.net")
      || origin.includes("orbitalmap.net")
      || origin.includes("booleanlogic.net")
      || origin.includes("binaryos.net")
      || origin.includes("serviceworker.net")
      || origin.includes("gpuprocessing.net")
      || origin.includes("pulseworld.me")
      || origin.includes("pulseworld.money")
      || origin.includes("pulseworld.biz");
}

function IsPartner(origin) {
  return origin.includes("fordfamilyretail")
      || origin.includes("peacesmokeshop")
      || origin.includes("peace-smokeshop")
      || origin.includes("peacesmoke-shop")
      || origin.includes("chromewebstore")
      || origin.includes("fordfamilydistribution")
      || origin.includes("peace-smoke-shop")
      || origin.includes("fordfamilymanagement");
}

function pbDomainClass(url) {
  for (const domain of PB_HOMES) {
    if (url.includes(domain)) return "PulseWorld";
  }
  if (IsPartner(url)) return "Partner";
  return "WWW";
}

const PBUniversalBoost = {
  async warmOrigin(origin) {
    if (!origin) return;

    // ⭐ Load permanent per-URL fail-cache
    const store = await chrome.storage.local.get(["pb_fail_cache"]);
    const fails = store.pb_fail_cache || {};

    // ⭐ HARD BLOCK: skip all non-web origins
    const forbidden = [
      "chrome://",
      "chrome-extension://",
      "edge://",
      "brave://",
      "opera://",
      "file://",
      "data://",
      "blob://",
      "about://"
    ];

    for (const prefix of forbidden) {
      if (origin.startsWith(prefix)) return;
    }

    // ⭐ Only warm http/https origins
    if (!origin.startsWith("http://") && !origin.startsWith("https://")) {
      return;
    }

    // ⭐ Skip warming any URL with a query string
    if (origin.includes("?")) {
      return;
    }

    // ⭐ Skip warming if the FULL URL already ends with a file extension
    if (/\.(html|css|js|png|jpg|jpeg|webp|svg|json)$/i.test(origin)) {
      console.log("[PBUniversalBoost] Skipped (direct file):", origin);
      return;
    }

    const paths = [
      "/", "/home", "/about", "/contact", "/manifest.json"
    ];
    const assets = [
      "/main.js", "/bundle.js", "/app.js", "/styles.css", "/app.css"
    ];

    const urls = []
      .concat(paths.map((p) => origin + p))
      .concat(assets.map((p) => origin + p));

    for (const url of urls) {
      // ⭐ If THIS SPECIFIC URL failed twice → skip forever
      if (fails[url] >= 2) {
        continue;
      }

      try {
        const res = await fetch(url, { cache: "force-cache" }).catch(() => null);

        if (res && res.status === 404) {
          fails[url] = (fails[url] || 0) + 1;

          // ⭐ If this URL hit 404 twice → permanently skip it
          if (fails[url] >= 2) {
            await chrome.storage.local.set({ pb_fail_cache: fails });
          }
        }
      } catch (_) {}
    }

    // ⭐ Save updated fail-cache
    await chrome.storage.local.set({ pb_fail_cache: fails });

    console.log("[PBUniversalBoost] Warmed publish directory for", origin);
  },

  async warmTab(tab) {
    if (!tab || !tab.url) return;
    try {
      const origin = new URL(tab.url).origin;
      await PBUniversalBoost.warmOrigin(origin);
    } catch (_) {}
  }
};

console.log("%c[PULSEBROWSER] PBPopup (Ultra Edition v6.0) loaded",
  "color:#00FF9C; font-weight:bold; font-family:monospace;");

// Load saved PulseTabs from extension storage at startup
let pulseTabs = {};

function pulseRestoreTabs() {
  chrome.storage.local.get("pulseTabList", ({ pulseTabList }) => {
    if (!pulseTabList) return;

    for (const url of pulseTabList) {
      try {
        const urlObj = new URL(url);
        const identity = normalizeIdentity(urlObj.hostname);

        openNamedTab(identity, url);
      } catch (e) {
        // skip invalid URLs
      }
    }
  });
}

async function pulseRehydrateTabs() {
  if (document.hidden) return;
  if (document.visibilityState !== "visible") return;
  document.querySelectorAll('[class^="PulseBrowser-OS-Snapshot"]').forEach(el => el.remove());
  chrome.tabs.query({}, tabs => {
    const rebuilt = {};
    
    let snapIndex = 1; // 1–5

    for (const tab of tabs) {
      if (!tab.url) continue;
      if (snapIndex > 9) break; // only 5 bubbles

      try {
        const urlObj = new URL(tab.url);
        const identity = normalizeIdentity(urlObj.hostname);

        // ⭐ Skip NEW TAB — do NOT assign a bubble
        if (identity === "newtab") {
          rebuilt[identity] = {
            id: tab.id,
            realm: identity,
            snapshot: null,
          };
          continue; // ⭐ Do NOT increment snapIndex
        }

        rebuilt[identity] = {
          id: tab.id,
          realm: identity,
          snapshot: snapIndex
        };

        snapIndex++;

      } catch (e) {
        // Skip invalid URLs
      }
    }

    pulseTabs = rebuilt;
    chrome.storage.local.set({ pulseTabs: rebuilt });
  });
}


function savePulseTabs() {
  chrome.storage.local.set({ pulseTabs });
}

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  const originalTabId = tabs[0].id;
  chrome.storage.local.set({ originalTabId });
  pulseRehydrateTabs();
});

// Normalize identity to domain or subdomain level
function normalizeIdentity(url) {
  try {
    const u = new URL(url);
    return u.hostname; // scheme + host (perfect for Gmail, Chase, BridgeBase)
  } catch {
    return url; // fallback
  }
}


function getNextInstanceIndex() {
  const used = new Set();

  for (const identity in pulseTabs) {
    const entry = pulseTabs[identity];
    if (entry.snapshot) used.add(entry.snapshot);
  }

  for (let i = 1; i <= 9; i++) {
    if (!used.has(i)) return i;
  }

  return 1; // fallback
}


chrome.downloads.onCreated.addListener(download => {
  const name = download.filename;
  console.log("DOWNLOAD ATTEMPTED I HAVE NO CLUE WHAT THIS MEANS LET ME KNOW WHEN YOU DO!!");
  if (name.includes("_VIDEOS") && name.includes("_EXPRESSIONS")) {
    console.log("DOWNLOAD ATTEMPTED WITH ONE OF MY VIDEOS!!! I HAVE NO CLUE WHAT THIS MEANS LET ME KNOW WHEN YOU DO!!");
    chrome.downloads.update(download.id, {
      filename: name + ".mp4"
    });
  }
});

function openNamedTab(name, url, next) {
  const identity = normalizeIdentity(url);
  let instanceIndex = 1;
  if (next) instanceIndex = getNextInstanceIndex(identity);
  const existingEntry = pulseTabs[identity];
  try { fetch(url, { mode: "no-cors" }).catch(() => {}); } catch (_) {}

  // ⭐ If tab already exists → PURE SELECT
  if (existingEntry) {
    const tabId = Number(existingEntry.id);

    if (!Number.isInteger(tabId)) {
      chrome.tabs.create({ url }, newTab => {
        pulseTabs[identity] = { id: newTab.id, realm: identity, snapshot: instanceIndex };
        savePulseTabs();
      });

      pulseRehydrateTabs();
      return;
    }

    chrome.tabs.get(tabId, tab => {
      if (chrome.runtime.lastError || !tab) {
        chrome.tabs.update(tabId, { url, active: true }, updated => {
          if (chrome.runtime.lastError || !updated) {
            chrome.tabs.create({ url }, newTab => {
              pulseTabs[identity] = { id: newTab.id, realm: identity, snapshot: instanceIndex };
              savePulseTabs();
            });

            pulseRehydrateTabs();
            return;
          }

          pulseTabs[identity] = { id: updated.id, realm: identity, snapshot: instanceIndex };
          savePulseTabs();
        });

        pulseRehydrateTabs();
        return;
      }

      chrome.tabs.highlight({
        windowId: tab.windowId,
        tabs: [tab.index]
      });

      pulseTabs[identity] = { id: tab.id, realm: identity, snapshot: instanceIndex };
      savePulseTabs();
    });

    pulseRehydrateTabs();
    return;
  }

  // ⭐ No existing tab → create new
  chrome.tabs.create({ url }, tab => {
    pulseTabs[identity] = { id: tab.id, realm: identity, snapshot: instanceIndex };
    savePulseTabs();
  });

  pulseRehydrateTabs();
}

chrome.tabs.onRemoved.addListener((tabId) => {
  let removedSnapshotIndex = null;

  // Find and remove the entry
  for (const identity in pulseTabs) {
    const entry = pulseTabs[identity];

    if (entry.id === tabId) {
      const realm = entry.realm;
      removedSnapshotIndex = entry.snapshot;

      const snapshotKey = `pulse_snapshot_${realm}`;
      chrome.storage.local.remove(snapshotKey);

      delete pulseTabs[identity];
      break;
    }
  }
  // ⭐ REHYDRATE WITH CLEAN INDICES
  pulseRehydrateTabs();
});

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
    modulesPopup.style.height = "158px"; // slide UP
  } else {
    modulesPopup.style.height = "0";     // slide DOWN (collapse)
  }
};

// document.getElementById("btn-toggle-decode").onclick = () =>
//   toggleSetting("enablePulseDecode", "PulseDecode");

document.getElementById("btn-open-settings").onclick = () => {
  window.location.href = chrome.runtime.getURL("PBSettings.html?from=popup");
  write("Accessing PulseSettings..");
};

document.getElementById("btn-open-identity").onclick = async () => {
  const internalURL = "https://www.pulseworld.net?Impulse=PulseWorldInventory";
  console.log("[FrontPage] Opening Internal PulseIdentity:", internalURL);

  openNamedTab("PulseIdentity", internalURL);
  // chrome.tabs.create({ url: internalURL });
  write("Accessing PulseIdentity..");
};

document.getElementById("btn-open-business").onclick = async () => {
    const internalURL = "https://www.pulseworld.biz";
    console.log("[FrontPage] Opening Internal PulseBusiness:", internalURL);
    openNamedTab("PulseBusiness", internalURL);
    // chrome.tabs.create({ url: internalURL });
    write("Accessing PulseBusiness Module..");
};

document.getElementById("btn-open-email").onclick = async () => {

    PulseRealmSettings = await pbLoadExtensionSettings();

    console.log("[FrontPage] Email module clicked. Settings:", PulseRealmSettings);

    // INTERNAL MODE → open PulseWorld Email on the real domain
    if (PulseRealmSettings.emailMode === "internal") {
        const internalURL = "https://www.pulseworld.net?Impulse=PulseWorldEmail";
        console.log("[FrontPage] Opening Internal PulseMail:", internalURL);
        openNamedTab("PulseMail", internalURL);
        // chrome.tabs.create({ url: internalURL });
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link =PulseRealmSettings.externalEmailLink?.trim() || "https://mail.google.com";

    console.log("[FrontPage] Opening External Email Provider:", link);
    openNamedTab("PulseMail", link);
    // chrome.tabs.create({ url: link });
    write("Accessing PulseMail Module..");
};

document.getElementById("btn-open-bank").onclick = async () => {

    PulseRealmSettings = await pbLoadExtensionSettings();

    console.log("[FrontPage] Bank module clicked. Settings:", PulseRealmSettings);

    // INTERNAL MODE → open PulseWorld Bank on the real domain
    if (PulseRealmSettings.bankMode === "internal") {
        const internalURL = "https://www.pulseworld.net?Impulse=PulseWorldRewards";
        console.log("[FrontPage] Opening Internal PulseBank:", internalURL);
        openNamedTab("PulseBank", internalURL);
        // chrome.tabs.create({ url: internalURL });
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link =PulseRealmSettings.externalBankLink?.trim() || "https://www.bankofamerica.com";

    console.log("[FrontPage] Opening External Bank Provider:", link);
    openNamedTab("PulseBank", link);
    // chrome.tabs.create({ url: link });
    write("Accessing PulseBank Module..");
};


document.getElementById("mod-social").onclick = async () => {

    PulseRealmSettings = await pbLoadExtensionSettings();

    console.log("[FrontPage] Social Media module clicked. Settings:", PulseRealmSettings);

    // INTERNAL MODE → open PulseWorld on the real domain
    if (PulseRealmSettings.socialMode === "internal") {
        const internalURL = "https://www.pulseworld.net?Impulse=PulseWorldMessenger";
        console.log("[FrontPage] Opening Internal PulseMessenger:", internalURL);
        openNamedTab("PulseMessenger", internalURL);
        // chrome.tabs.create({ url: internalURL });
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link =PulseRealmSettings.externalSocialLink?.trim() || "https://www.facebook.com";

    console.log("[FrontPage] Opening External Social Media Provider:", link);
    openNamedTab("PulseMessenger", link);
    // chrome.tabs.create({ url: link });
};

document.getElementById("mod-work").onclick = async () => {
    
    PulseRealmSettings = await pbLoadExtensionSettings();

    console.log("[FrontPage] Work module clicked. Settings:", PulseRealmSettings);

    // INTERNAL MODE → open PulseWorld Work on the real domain
    if (PulseRealmSettings.workMode === "internal") {
        const internalURL = "https://www.pulseworld.biz";
        console.log("[FrontPage] Opening Internal PulseWork:", internalURL);
        openNamedTab("PulseWork", internalURL);
        // chrome.tabs.create({ url: internalURL });
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link =PulseRealmSettings.externalWorkLink?.trim() || "https://www.pulseworld.net";

    console.log("[FrontPage] Opening External Work Provider:", link);
    openNamedTab("PulseWork", link);
    // chrome.tabs.create({ url: link });
};


document.getElementById("mod-1").addEventListener("click", async () => {

    PulseRealmSettings = await pbLoadExtensionSettings();

    console.log("[FrontPage] PulseModule1 module clicked. Settings:", PulseRealmSettings);

    // EXTERNAL MODE → open user’s chosen provider
    const link =PulseRealmSettings.acceleratedModule1Link?.trim() || "https://www.onedrive.com";

    console.log("[FrontPage] Opening External PulseModule1 Provider:", link);
    openNamedTab("PulseModule1", link);
    // chrome.tabs.create({ url: link });
});


document.getElementById("mod-2").addEventListener("click", async () => {

    PulseRealmSettings = await pbLoadExtensionSettings();

    console.log("[FrontPage] PulseModule2 module clicked. Settings:", PulseRealmSettings);

    // EXTERNAL MODE → open user’s chosen provider
    const link =PulseRealmSettings.acceleratedModule2Link?.trim() || "https://www.office.com";

    console.log("[FrontPage] Opening External PulseModule2 Provider:", link);
    openNamedTab("PulseModule2", link);
    // chrome.tabs.create({ url: link });
});


document.getElementById("mod-3").addEventListener("click", async () => {

    PulseRealmSettings = await pbLoadExtensionSettings();

    console.log("[FrontPage] PulseModule3 module clicked. Settings:", PulseRealmSettings);

    // EXTERNAL MODE → open user’s chosen provider
    const link =PulseRealmSettings.acceleratedModule3Link?.trim() || "https://www.amazon.com";

    console.log("[FrontPage] Opening External PulseModule3 Provider:", link);
    openNamedTab("PulseModule3", link);
    // chrome.tabs.create({ url: link });
});


document.getElementById("mod-4").addEventListener("click", async () => {

    PulseRealmSettings = await pbLoadExtensionSettings();

    console.log("[FrontPage] PulseModule4 module clicked. Settings:", PulseRealmSettings);

    // EXTERNAL MODE → open user’s chosen provider
    const link =PulseRealmSettings.acceleratedModule4Link?.trim() || "https://www.coinbase.com";

    console.log("[FrontPage] Opening External PulseModule4 Provider:", link);
    openNamedTab("PulseModule4", link);
    // chrome.tabs.create({ url: link });
});


document.getElementById("mod-5").addEventListener("click", async () => {

    PulseRealmSettings = await pbLoadExtensionSettings();

    console.log("[FrontPage] PulseModule5 module clicked. Settings:", PulseRealmSettings);

    // EXTERNAL MODE → open user’s chosen provider
    const link =PulseRealmSettings.acceleratedModule5Link?.trim() || "https://www.bridgebase.com";

    console.log("[FrontPage] Opening External PulseModule5 Provider:", link);
    openNamedTab("PulseModule5", link);
    // chrome.tabs.create({ url: link });
});

document.getElementById("mod-6").addEventListener("click", async () => {

    PulseRealmSettings = await pbLoadExtensionSettings();

    console.log("[FrontPage] PulseModule6 module clicked. Settings:", PulseRealmSettings);

    // EXTERNAL MODE → open user’s chosen provider
    const link =PulseRealmSettings.acceleratedModule6Link?.trim() || "https://www.snapchat.com";

    console.log("[FrontPage] Opening External PulseModule6 Provider:", link);
    openNamedTab("PulseModule6", link);
    // chrome.tabs.create({ url: link });
});


document.getElementById("mod-stream").onclick = async () => {

    PulseRealmSettings = await pbLoadExtensionSettings();

    console.log("[FrontPage] Streaming module clicked. Settings:", PulseRealmSettings);

    // INTERNAL MODE → open PulseWorld Streaming on the real domain
    if (PulseRealmSettings.streamMode === "internal") {
        const internalURL = "https://www.netflix.com";
        console.log("[FrontPage] Opening Internal Streaming Module:", internalURL);
        openNamedTab("PulseStreaming", internalURL);
        // chrome.tabs.create({ url: internalURL });
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link =PulseRealmSettings.externalStreamingLink?.trim() || "https://www.netflix.com";

    console.log("[FrontPage] Opening External Streaming Provider:", link);
    openNamedTab("PulseStreaming", link);
    // chrome.tabs.create({ url: link });
};

document.getElementById("mod-shopping").onclick = async () => {

    PulseRealmSettings = await pbLoadExtensionSettings();

    console.log("[FrontPage] Shopping module clicked. Settings:", PulseRealmSettings);

    // INTERNAL MODE → open PulseWorld Streaming on the real domain
    if (PulseRealmSettings.shoppingMode === "internal") {
        const internalURL = "https://www.amazon.com";
        console.log("[FrontPage] Opening Internal Shopping Module:", internalURL);
        openNamedTab("PulseShopping", internalURL);
        // chrome.tabs.create({ url: internalURL });
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link =PulseRealmSettings.externalShoppingLink?.trim() || "https://www.amazon.com";

    console.log("[FrontPage] Opening External Shopping Provider:", link);
    openNamedTab("PulseShopping", link);
    // chrome.tabs.create({ url: link });
};

// // ---------------------------------------------------------------------------
// // BUTTON: Refresh HUD (Realm Snapshot)
// // ---------------------------------------------------------------------------
// document.getElementById("btn-refresh-hud").onclick = () => {
//   chrome.runtime.sendMessage({ type: "PBREALM_GET" }, (realm) => {
//     write("Pulse HUD refreshed.\nRealm:\n" + JSON.stringify(realm.state, null, 2));
//   });
// };

// function updateHUD() {
//   const body = document.getElementById("pb-hud-body");
//   if (!body) return;

//   chrome.runtime.sendMessage({ type: "PBREALM_GET" }, (realmRes) => {
//     chrome.runtime.sendMessage({ type: "PBSETTINGS_GET" }, (settingsRes) => {

//       PulseRealm = realmRes.state || {};
//       PulseRealmSettings = settingsRes.settings || {};

//       // ---------------------------------------------
//       // ⭐ PAGE LOAD TIME (ms)
//       // ---------------------------------------------
//       let loadTime = "-";

//       try {
//         const nav = performance.getEntriesByType("navigation")[0];
//         if (nav) {
//           loadTime = Math.round(nav.loadEventEnd);
//         } else {
//           // fallback for older browsers
//           const t = performance.timing;
//           loadTime = Math.round(t.loadEventEnd - t.navigationStart);
//         }
//       } catch (e) {
//         loadTime = "-";
//       }

//       // ---------------------------------------------
//       // ⭐ DOM CONTENT LOADED TIME (ms)
//       // ---------------------------------------------
//       let domTime = "-";

//       try {
//         const nav = performance.getEntriesByType("navigation")[0];
//         if (nav) {
//           domTime = Math.round(nav.domContentLoadedEventEnd);
//         } else {
//           // fallback for older browsers
//           const t = performance.timing;
//           domTime = Math.round(t.domContentLoadedEventEnd - t.navigationStart);
//         }
//       } catch (e) {
//         domTime = "-";
//       }


//       body.innerHTML = `
//         Page: ${PulseRealm.lastPage || "-"}<br/>
//         URL: ${PulseRealm.lastURL || "-"}<br/>
//         Domain: ${PulseRealm.lastDomainClass || "-"}<br/>
//         Ping: ${PulseRealm.lastPing || "-"}<br/>
//         Mutations: ${PulseRealm.mutationCount}<br/>
//         GPUWarm: ${PulseRealm.gpuEnabled}<br/>
//         DecodeWarm: ${PulseRealm.imagesDecoded}<br/>
//         WarmPaths: ${PulseRealm.warmPathsTriggered}<br/>
//         Accel: ${PulseRealmSettings.enableAccelerator}<br/>
//         NAV: ${PulseRealmSettings.enableNavigator}<br/>
//         Intercept: ${PulseRealmSettings.enableInterceptor}<br/>
//         DOM: ${domTime}ms<br/>
//         Load: ${loadTime}ms<br/>
//         TS: ${new Date().toLocaleTimeString()}
//       `;
//     });
//   });
// }

async function pulseConsoleKey(event) {
  const key = event.key.toLowerCase();
  const moduleKeys = ["`","b","m","s","w","t","e"];

  // ⭐ If NOT a module key → send key to search box
  if (!moduleKeys.includes(key)) {
    
    return; // Stop here — do NOT teleport
  }

  // ⭐ Otherwise: module teleport logic
  let link = "https://www.pulseworld.net";

  if (key === "`") {
    link = null;
  } else if (key === "b") {
    link = PulseRealmSettings.externalBankLink;
  } else if (key === "m") {
    link = PulseRealmSettings.externalEmailLink;
  } else if (key === "s") {
    link = PulseRealmSettings.externalSocialLink;
  } else if (key === "w") {
    link = PulseRealmSettings.externalWorkLink;
  } else if (key === "t") {
    link = PulseRealmSettings.externalStreamingLink;
  } else if (key === "e") {
    link = PulseRealmSettings.externalShoppingLink;
  }

  chrome.runtime.sendMessage({
    type: "PB_HOVER_PREFETCH",
    href: link
  });

  try {
    fetch(link, { mode: "no-cors" }).catch(() => {});
  } catch (_) {}

  openNamedTab("PulseWorldModule", link);
  await PBUniversalBoost.warmOrigin(link);
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

// ---------------------------------------------------------
// ⭐ TINYPNG-STYLE COMPRESSION (Canvas → WebP)
// ---------------------------------------------------------
async function compressImageTinyPNGStyle(blob) {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (compressed) => {
            resolve(compressed || blob); // fallback
          },
          "image/webp",
          0.82
        );
      } catch (err) {
        console.warn("Compression failed, fallback to original blob:", err);
        resolve(blob);
      }
    };

    img.onerror = () => {
      console.warn("Image load failed during compression, fallback.");
      resolve(blob);
    };

    img.src = URL.createObjectURL(blob);
  });
}


// ---------------------------------------------------------
// ⭐ FETCH → COMPRESS → BASE64 → STORE
// ---------------------------------------------------------
async function fetchAndStoreIcon(host, iconUrl) {

  // ⭐ 1. Check cache first
  if (PBFAVICON_CACHE[host]) {
    const cached = PBFAVICON_CACHE[host];

    // Valid Base64 favicon
    if (typeof cached === "string" &&
        cached.startsWith("data:image") &&
        cached.length > 50) {
      return cached;
    }

    // Valid fallback URL
    if (cached.startsWith("http")) {
      return cached;
    }
  }

  // ⭐ 2. No valid cache → fetch
  try {
    const response = await fetch(iconUrl);
    if (!response.ok) throw new Error("Fetch failed");

    let blob = await response.blob();

    // ⭐ Fallback if blob is empty
    if (!blob || blob.size === 0) {
      console.warn("Empty favicon blob, falling back:", iconUrl);
      PBFAVICON_CACHE[host] = iconUrl;
      saveCache();
      return iconUrl;
    }

    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onloadend = () => {
        const base64 = reader.result;

        // ⭐ Validate Base64
        if (
          !base64 ||
          typeof base64 !== "string" ||
          base64.trim() === "" ||
          (base64.startsWith("data:") && base64.length < 20) ||
          base64.startsWith("data:text")
        ) {
          console.warn("Invalid Base64 favicon, falling back:", iconUrl);
          PBFAVICON_CACHE[host] = iconUrl;
          saveCache();
          resolve(iconUrl);
          return;
        }

        // ⭐ Save compressed Base64
        PBFAVICON_CACHE[host] = base64;
        saveCache();
        resolve(base64);
      };

      reader.onerror = () => {
        console.warn("FileReader failed, falling back:", iconUrl);
        PBFAVICON_CACHE[host] = iconUrl;
        saveCache();
        resolve(iconUrl);
      };

      reader.readAsDataURL(blob);
    });

  } catch (err) {
    console.warn("Favicon fetch failed:", iconUrl, err);

    // ⭐ Last resort fallback
    PBFAVICON_CACHE[host] = iconUrl;
    saveCache();
    return iconUrl;
  }
}



async function getFavicon(url, flags = {}) {
  let u;

  try {
    u = new URL(url);
  } catch {
    return null;
  }

  let host = u.hostname;

  // ⭐ Preserve www if explicitly present
  if (url.includes("www.") && !host.startsWith("www.")) {
    host = "www." + host;
  }

  // ⭐ Default favicon URL
  let iconURL = `https://${host}/favicon.ico`;

  // ⭐ Strip subdomains unless it's "www"
  const parts = host.split(".");
  if (parts.length > 2 && parts[0] !== "www") {
    const root = parts.slice(parts.length - 2).join(".");
    iconURL = `https://${root}/favicon.ico`;
  }

  let icon = iconURL;

  // ⭐ Special external cases
  try {
    if (host.includes("google.com")) {
      iconURL = "https://www.google.com/favicon.ico";
      icon = await fetchAndStoreIcon(host, iconURL);
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    if (host.includes("mail.google.com") || host.includes("gmail.com")) {
      iconURL = "https://ssl.gstatic.com/ui/v1/icons/mail/images/favicon5.ico";
      icon = await fetchAndStoreIcon(host, iconURL);
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    if (host.includes("chase.com")) {
      iconURL = "https://www.chase.com/etc/designs/chase-ux/favicon.ico";
      icon = await fetchAndStoreIcon(host, iconURL);
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    if (host.includes("office.com")) {
      iconURL = "https://res.cdn.office.net/officehub/images/content/images/unauth-copilotcom/favicon-copilot-brand-refresh-23392c1f66.ico";
      icon = await fetchAndStoreIcon(host, iconURL);
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    if (host.includes("github.com")) {
      iconURL = "https://github.githubassets.com/favicons/favicon.svg";
      icon = await fetchAndStoreIcon(host, iconURL);
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    if (host.includes("youtube.com")) {
      iconURL = "https://www.youtube.com/s/desktop/fe2e0b8b/img/favicon_32x32.png";
      icon = await fetchAndStoreIcon(host, iconURL);
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    if (host.includes("discord.com")) {
      iconURL = "https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico";
      icon = await fetchAndStoreIcon(host, iconURL);
      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

  } catch {
    PBFAVICON_CACHE[host] = iconURL;
    saveCache();
    return iconURL;
  }

  // ⭐ Cached → return instantly
  if (PBFAVICON_CACHE[host]) {
    console.log(
      "%c[PULSEWORLD OS KERNEL] SAVED FAVICON LOCATED: " + host,
      "color:#00FF9C; font-weight:bold; font-family:monospace;"
    );
    return PBFAVICON_CACHE[host];
  }

  // ⭐ PulseWorld realm detection (automatic)
  const PW_REALMS = {
    "pulseworld.net": "PWFavIcon.ico",
    "pulseworld.biz": "PWBFavIcon.ico",
    "pulseworld.me": "PWIFavIcon.ico",
    "pulseworld.money": "PWMFavIcon.ico",
    "binaryos.net": "BOFavIcon.ico",
    "booleanlogic.net": "BLFavIcon.ico",
    "gpuprocessing.net": "GPFavIcon.ico",
    "serviceworker.net": "SWFavIcon.ico",
    "orbitalmap.net": "OMFavIcon.ico"
  };

  const realmKey = Object.keys(PW_REALMS).find(domain => host.endsWith(domain));

  try {
    if (realmKey) {
      iconURL = `${u.origin}/${PW_REALMS[realmKey]}`;
      icon = await fetchAndStoreIcon(host, iconURL);

      PBFAVICON_CACHE[host] = icon;
      saveCache();
      return icon;
    }

    // ⭐ Normal external favicon fetch
    icon = await fetchAndStoreIcon(host, iconURL);
    PBFAVICON_CACHE[host] = icon;
    saveCache();
    return icon;

  } catch {
    PBFAVICON_CACHE[host] = iconURL;
    saveCache();
    return iconURL;
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
const EXTENSION_SETTINGS_KEY3 = "pulseworldSettings";

async function pbLoadExtensionSettings() {
  try {
    const result = await chrome.storage.local.get([EXTENSION_SETTINGS_KEY3]);
    const settings = result[EXTENSION_SETTINGS_KEY3] || {};

    return settings;
  } catch (err) {
    PB_LOG.error("pbLoadExtensionSettings() FAILED", err);
    return {};
  }
}

// Utility: load settings
async function loadWorld() {
  const workIcon = document.getElementById("moduleWorkIcon");
  const streamIcon = document.getElementById("moduleStreamIcon");
  const socialIcon = document.getElementById("moduleSocialIcon");
  const shoppingIcon = document.getElementById("moduleShoppingIcon");
    
  PulseRealmSettings = await pbLoadExtensionSettings();

  // INTERNAL MODE → open PulseWorld Work on the real domain
  if (PulseRealmSettings.workMode === "internal") {
      workIcon.innerText = "💼";      // your original emoji
      workIcon.style.backgroundImage = "";
  } else {        
    const favA = await getFavicon(PulseRealmSettings.externalWorkLink);
    if (favA) {
      workIcon.innerText = "⚡";
      workIcon.style.backgroundImage = `url(${favA})`;
      workIcon.style.backgroundSize = "contain";
      workIcon.style.backgroundRepeat = "no-repeat";
    }
  }
  if (PulseRealmSettings.streamMode === "internal") {
      streamIcon.innerText = "📺";      // your original emoji
      streamIcon.style.backgroundImage = "";
  } else {        
    const favB = await getFavicon(PulseRealmSettings.externalStreamingLink);
    if (favB) {
      streamIcon.innerText = "⚡";
      streamIcon.style.backgroundImage = `url(${favB})`;
      streamIcon.style.backgroundSize = "contain";
      streamIcon.style.backgroundRepeat = "no-repeat";
    }
  }
  if (PulseRealmSettings.socialMode === "internal") {
      socialIcon.innerText = "🎭";      // your original emoji
      socialIcon.style.backgroundImage = "";
  } else {        
    const favC = await getFavicon(PulseRealmSettings.externalSocialLink);
    if (favC) {
      socialIcon.innerText = "⚡";
      socialIcon.style.backgroundImage = `url(${favC})`;
      socialIcon.style.backgroundSize = "contain";
      socialIcon.style.backgroundRepeat = "no-repeat";
    }
  }

  if (PulseRealmSettings.shoppingMode === "internal") {
      shoppingIcon.innerText = "💳";      // your original emoji
      shoppingIcon.style.backgroundImage = "";
  } else {        
    const favC = await getFavicon(PulseRealmSettings.externalShoppingLink);
    if (favC) {
      shoppingIcon.innerText = "⚡";
      shoppingIcon.style.backgroundImage = `url(${favC})`;
      shoppingIcon.style.backgroundSize = "contain";
      shoppingIcon.style.backgroundRepeat = "no-repeat";
    }
  }
  
  if (PulseRealmSettings.acceleratedModule1Link) {
    const moduleFav1Link = document.getElementById("mod1");
    const moduleFav1Icon = document.getElementById("module1");
    const fav1 = await getFavicon(PulseRealmSettings.acceleratedModule1Link);
    if (fav1) {
      moduleFav1Link.innerText = getReadableName(PulseRealmSettings.acceleratedModule1Link) + " ";
      moduleFav1Icon.innerText = "⚡";
      moduleFav1Icon.style.backgroundImage = `url(${fav1})`;
      moduleFav1Icon.style.backgroundSize = "contain";
      moduleFav1Icon.style.backgroundRepeat = "no-repeat";
    }
  }


  if (PulseRealmSettings.acceleratedModule2Link) {
    const moduleFav2Link = document.getElementById("mod2");
    const moduleFav2Icon = document.getElementById("module2");
    const fav2 = await getFavicon(PulseRealmSettings.acceleratedModule2Link);
    if (fav2) {
      moduleFav2Link.innerText = getReadableName(PulseRealmSettings.acceleratedModule2Link) + " ";
      moduleFav2Icon.innerText = "⚡";
      moduleFav2Icon.style.backgroundImage = `url(${fav2})`;
      moduleFav2Icon.style.backgroundSize = "contain";
      moduleFav2Icon.style.backgroundRepeat = "no-repeat";
    }
  }


  if (PulseRealmSettings.acceleratedModule3Link) {
    const moduleFav3Link = document.getElementById("mod3");
    const moduleFav3Icon = document.getElementById("module3");
    const fav3 = await getFavicon(PulseRealmSettings.acceleratedModule3Link);
    if (fav3) {
      moduleFav3Link.innerText = getReadableName(PulseRealmSettings.acceleratedModule3Link) + " ";
      moduleFav3Icon.innerText = "⚡";
      moduleFav3Icon.style.backgroundImage = `url(${fav3})`;
      moduleFav3Icon.style.backgroundSize = "contain";
      moduleFav3Icon.style.backgroundRepeat = "no-repeat";
    }
  }


  if (PulseRealmSettings.acceleratedModule4Link) {
    const moduleFav4Link = document.getElementById("mod4");
    const moduleFav4Icon = document.getElementById("module4");
    const fav4 = await getFavicon(PulseRealmSettings.acceleratedModule4Link);
    if (fav4) {
      moduleFav4Link.innerText = getReadableName(PulseRealmSettings.acceleratedModule4Link) + " ";
      moduleFav4Icon.innerText = "⚡";
      moduleFav4Icon.style.backgroundImage = `url(${fav4})`;
      moduleFav4Icon.style.backgroundSize = "contain";
      moduleFav4Icon.style.backgroundRepeat = "no-repeat";
    }
  }

  if (PulseRealmSettings.acceleratedModule5Link) {
    const moduleFav5Link = document.getElementById("mod5");
    const moduleFav5Icon = document.getElementById("module5");
    const fav5 = await getFavicon(PulseRealmSettings.acceleratedModule5Link);
    if (fav5) {
      moduleFav5Link.innerText = getReadableName(PulseRealmSettings.acceleratedModule5Link) + " ";
      moduleFav5Icon.innerText = "⚡";
      moduleFav5Icon.style.backgroundImage = `url(${fav5})`;
      moduleFav5Icon.style.backgroundSize = "contain";
      moduleFav5Icon.style.backgroundRepeat = "no-repeat";
    }
  }

  if (PulseRealmSettings.acceleratedModule6Link) {
    const moduleFav6Link = document.getElementById("mod6");
    const moduleFav6Icon = document.getElementById("module6");
    const fav6 = await getFavicon(PulseRealmSettings.acceleratedModule6Link);
    if (fav6) {
      moduleFav6Link.innerText = getReadableName(PulseRealmSettings.acceleratedModule6Link) + " ";
      moduleFav6Icon.innerText = "⚡";
      moduleFav6Icon.style.backgroundImage = `url(${fav6})`;
      moduleFav6Icon.style.backgroundSize = "contain";
      moduleFav6Icon.style.backgroundRepeat = "no-repeat";
    }
  }
}

setTimeout(loadWorld, 500);