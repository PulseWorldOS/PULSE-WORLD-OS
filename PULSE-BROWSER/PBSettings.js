

// ============================================================================
//  PBSettings.js — PulseBrowser OS Settings Registry (Ultra Edition v7.0)
//  Unified OS Registry + Extension Settings Page + MV3-Compliant Storage
//  FULL DIAGNOSTIC MODE — Every change logged, color-coded, timestamped
// ============================================================================
const params = new URLSearchParams(location.search);
const origin = params.get("from");
let nowST = Date.now(); // numeric timestamp
let lastnowST = Date.now(); // numeric timestamp
let PulseSettingsAIPalMemoryBuffer = [];
let aiSettingsSession = null;
let GLOBALSTART2 = Date.now();
let MyHigherIntellect1 = null;
let aiSettings2Size = 0;
let OvermindSettingsOrders = null;
let OvermindHidden = false;
const pageSettings = document.getElementById("pw-settings-page");
let CompanionSettingsDetailsMessage = document.getElementById("consoleOvermindSettingsCompanion");
let CompanionSettingsConsoleSend = document.getElementById("consoleSettingsOvermindCompanionSend");
let CompanionSettingsConsoleInput = document.getElementById("CompanionSettingsConsoleInput");
const pbPulseOvermind = document.getElementById("pbPulseDetailsEarn3");
const earnerhelperApanel = document.getElementById("earner-helper-Settings-panel");
const earnerinnerhelperApanel = document.getElementById("earner-inner-helper-Settings-panel");
const backBtn = document.getElementById("backBtn");

function toggleSetting(key, label) {
  loadSettings((settings) => {
    settings[key] = !settings[key];
    saveSettings(settings, () => {
      console.log(label + ": " + (settings[key] ? "ON" : "OFF"));
    });
  });
}

// Utility: load settings
function loadSettings(cb) {
  chrome.runtime.sendMessage({ type: "PBSETTINGS_GET" }, (res) => {
    if (chrome.runtime.lastError) return console.log("Settings unreachable.");
    cb(res.settings);
  });
}

// Utility: save settings
function saveSettings(settings, cb) {
  chrome.runtime.sendMessage({ type: "PBSETTINGS_SET", settings }, () => {
    cb && cb();
  });
}

// 1. The Core Queue Engine
class Pulse2StorageQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  // Adds the payload to the line and ensures the processing loops runs
  enqueue(dataObject) {
    this.queue.push(dataObject);
    if (!this.isProcessing) {
      this.processNext();
    }
  }

  // Processes each object one by one, keeping the disk thread safe
  async processNext() {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const dataObject = this.queue.shift(); // Pull the next write payload

    try {
      // Executes the native Chrome write sequentially
      await chrome.storage.local.set(dataObject);
    } catch (error) {
      console.error("[STORAGE GOVERNOR] Quota write blocked:", error);
    }

    // Yield control for 0ms to let the browser breathe, then hit the next item
    setTimeout(() => this.processNext(), 0);
  }
}

// 2. Instantiate the global queue in your worker
const Pulse2orchestratorQueue = new Pulse2StorageQueue();

// 3. The Drop-In Replacement Function
function Pulse2safeStorageSet(dataObject) {
  Pulse2orchestratorQueue.enqueue(dataObject);
}

function isValid(t) {
  return (
    typeof t === "number" &&
    Number.isFinite(t) &&
    t > 0
  );
}

chrome.runtime.sendMessage({ type: "PULSE_OS_PING", time: nowST }, (response) => {
  if (chrome.runtime.lastError) return;
  if (response.time && isValid(response.time)) {
      nowST = response.time;
  }
});


chrome.storage.local.get(["SessionStart"], (res) => {
  if (isValid(res.SessionStart)) {
    nowST = res.SessionStart;
    console.log("PulseBrowser OS Local Session Start: " + nowST);
  }
});


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


let PULSE_OVERMIND_BROADCAST_CHANNEL = `PulseBrowser-OS::${new Date(nowST).toLocaleTimeString()}`;
// ============================================================
//  BROADCAST CHANNEL — v33 (TRUST SYNC + EXISTING USES)
// ============================================================

let PulseBrowserChannel = null;
try {
  PulseBrowserChannel = new BroadcastChannel(PULSE_OVERMIND_BROADCAST_CHANNEL);
} catch {
  PulseBrowserChannel = null;
}

function OvermindCrossTabSync(payload) {
  try {
    PB_LOG.info("[AI_Overmind_Sync] Syncing Overmind Orders across the Multiverse!", payload);
    PulseBrowserChannel.postMessage({
      kind: "command_prompt",
      payload,
      ts: nowST
    });
  } catch {}
}

if (PulseBrowserChannel) {
  PulseBrowserChannel.onmessage = (ev) => {
    try {
      const { kind, payload } = ev.data || {};
      if (kind === "command_prompt") {
        PB_LOG.info("[Sound Off: Command Prompt Received] ", payload);
      }
    } catch {}
  };
}

chrome.storage.local.get(["globalStart"], (res) => {
  if (!res.globalStart) {
    GLOBALSTART2 = Date.now();
    Pulse2safeStorageSet({ globalStart: GLOBALSTART2 });
  } else {
    if (isValid(res.globalStart)) {
      GLOBALSTART2 = res.globalStart;
      PB_LOG.info("PulseBrowser OS Ignition Date: " + new Date(GLOBALSTART2).toLocaleString());
      PB_LOG.info("PulseBrowser OS Session Start: " + new Date(nowST).toLocaleString());
      PB_LOG.info("PulseBrowser OS Settings Start: " + new Date(lastnowST).toLocaleString());
    } else {
      GLOBALSTART2 = Date.now();
    }
  }
});

async function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(null, (data) => {
      const S = data || {};

      // Force all acceleration systems ON by default
      S.accelDNSWarm      = S.accelDNSWarm      !== false;
      S.accelTLSWarm      = S.accelTLSWarm      !== false;
      S.accelPreconnect   = S.accelPreconnect   !== false;
      S.accelPreload      = S.accelPreload      !== false;
      S.accelPrefetch     = S.accelPrefetch     !== false;
      S.accelGPUWarm      = S.accelGPUWarm      !== false;
      S.accelDecodeWarm   = S.accelDecodeWarm   !== false;
      S.accelRealmWarm    = S.accelRealmWarm    !== false;
      S.accelAutoNav      = S.accelAutoNav      !== false; // auto on navigation
      S.accelHomeWarmBoot = S.accelHomeWarmBoot !== false; // auto warm boot for home universe
      S.experimentalQuantumRouting = S.experimentalQuantumRouting !== false; 
      S.accelModuleWarmBoot = S.accelModuleWarmBoot !== false;
      S.enablePulseEarnOverlay = S.enablePulseEarnOverlay !== false; 
      S.enablePulsePalConsole = S.enablePulsePalConsole !== false;
      S.enableDevOverlay = S.enableDevOverlay !== false; 
      S.enableDevCaches = S.enableDevCaches !== false;
      S.enablePulseEarnerEngine = S.enablePulseEarnerEngine !== false;
      S.enablePulsePal = S.enablePulsePal !== false;
      resolve(S);
    });
  });
}

// ============================================================================
//  SECTION 2 — EXTENSION SETTINGS (SEPARATE STORAGE)
// ============================================================================

const EXTENSION_SETTINGS_KEY2 = "pulseworldSettings";

async function pbLoadExtensionSettings() {
  try {
    const result = await chrome.storage.local.get([EXTENSION_SETTINGS_KEY2]);
    const settings = result[EXTENSION_SETTINGS_KEY2] || {};

    return settings;
  } catch (err) {
    PB_LOG.error("pbLoadExtensionSettings() FAILED", err);
    return {};
  }
}

async function loadExtensionSettingsUI() {
  const result = await chrome.storage.local.get([EXTENSION_SETTINGS_KEY2]);
  const settings = result[EXTENSION_SETTINGS_KEY2] || {};

  PB_LOG.load("Extension Settings Loaded", settings);

  const fields = {    
    emailMode: "emailMode",
    adBlocker: "adBlocker",
    tetherCode: "tetherCode",
    externalEmailLink: "externalEmailLink",
    acceleratedModule1Link: "acceleratedModule1Link",
    acceleratedModule2Link: "acceleratedModule2Link",
    acceleratedModule3Link: "acceleratedModule3Link",
    acceleratedModule4Link: "acceleratedModule4Link",
    acceleratedModule5Link: "acceleratedModule5Link",
    acceleratedModule6Link: "acceleratedModule6Link",
    bankMode: "bankMode",
    externalBankLink: "externalBankLink",
    businessLink: "businessLink",
    filesLink: "filesLink",
    bankingLink: "bankingLink",
    goPublicToggle: "goPublicEnabled",
    goEarnerMode: "goEarnerEnabled",
    publicLink: "publicLink",
    programmaticEmail: "programmaticEmail",
    programmaticBanking: "programmaticBanking",
    programmaticAI: "programmaticAI",
    searchMode: "searchMode",
    externalSearchLink: "externalSearchLink",
    socialMode: "socialMode",
    externalSocialLink: "externalSocialLink",
    workMode: "workMode",
    externalWorkLink: "externalWorkLink",
    streamingMode: "streamingMode",
    externalStreamingLink: "externalStreamingLink",
    shoppingMode: "shoppingMode",
    externalShoppingLink: "externalShoppingLink"
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
  const before = await chrome.storage.local.get([EXTENSION_SETTINGS_KEY2]);
  
  const settings = {
    emailMode: document.getElementById("emailMode").value,
    adBlocker: document.getElementById("adBlocker").value,
    externalEmailLink: document.getElementById("externalEmailLink").value.trim(),
    acceleratedModule1Link: document.getElementById("acceleratedModule1Link").value.trim(),
    acceleratedModule2Link: document.getElementById("acceleratedModule2Link").value.trim(),
    acceleratedModule3Link: document.getElementById("acceleratedModule3Link").value.trim(),
    acceleratedModule4Link: document.getElementById("acceleratedModule4Link").value.trim(),
    acceleratedModule5Link: document.getElementById("acceleratedModule5Link").value.trim(),
    acceleratedModule6Link: document.getElementById("acceleratedModule6Link").value.trim(),
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
    shoppingMode: document.getElementById("shoppingMode").value,
    externalShoppingLink: document.getElementById("externalShoppingLink").value.trim(),
    goPublicEnabled: document.getElementById("goPublicToggle").checked,
    goEarnerEnabled: document.getElementById("goEarnerMode").checked,
    publicLink: document.getElementById("publicLink").value.trim(),

    programmaticEmail: document.getElementById("programmaticEmail").checked,
    programmaticBanking: document.getElementById("programmaticBanking").checked,
    programmaticAI: document.getElementById("programmaticAI").checked
  };

  await Pulse2safeStorageSet({ [EXTENSION_SETTINGS_KEY2]: settings });

  PB_LOG.change("Extension Settings Saved", before[EXTENSION_SETTINGS_KEY2], settings);
}
// ============================================================================
//  SECTION X — CACHE LIST (via PBCompanion.js)
// ============================================================================

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
      resolve(response);   // ⭐ Return the WHOLE object
    });
  });
}

function getReadableName(url) {
  try {
    const u = new URL(url);

    let host = u.hostname.replace(/^www\./, "");

    const parts = host.split(".");

    if (parts.length >= 2) {
      host = parts[parts.length - 2];
    }

    host = host.replace(/[-_]/g, " ");

    host = host.replace(/\b\w/g, c => c.toUpperCase());

    return host;

  } catch {
    return url;
  }
}

// async function pbRenderCacheList() {
//   const listEl = document.getElementById("cache-panel");
//   if (!listEl) return;
  
//   // ⭐ Wipe panel completely
//   listEl.innerHTML = `
//     <div style="font-weight:bold; text-align: center; border-radius: 40px; padding: 4px 4px; border: 1px solid rgba(255, 255, 255, 0.18); backdrop-filter: blur(6px); color: #0FF; font-size:13px; margin-top: 6px; margin-bottom:6px;">
//       PulseBrowser OS - System Details
//     </div>
//   `;
    
//   const store = await chrome.storage.local.get(["pb_fail_cache"]);
//   const fails = store.pb_fail_cache || {};
//   const failCount = Object.keys(fails).length;

//   // ⭐ Memory FIRST
//   // ⭐ Load previous storage history
//   const history = await new Promise(resolve =>
//     chrome.storage.local.get("pulseStorageHistory", resolve)
//   );
  
//   predictionText = predictionText + ".";
//   const statsHTML = await pbRenderStorageStats(history);
  
//   listEl.insertAdjacentHTML("beforeend", statsHTML);

//   // ⭐ Fetch cache list
//   const result = await pbRequestCacheList();
  
//   if (!result || (!result.caches && !result.pulsecaches)) {
//     listEl.insertAdjacentHTML("beforeend", "<li>Cache API unavailable in extension pages.</li>");
//     return;
//   }

//   const caches = result.caches;
//   const pulsecaches = result.pulsecaches;  
//   const errorcount = result.errorcount;
//   const totalcount = result.totalcount;
//   const pulsemoments = result.pulsemomentscount;
//   const pulseoffline = result.pulseofflinecount;
//   // const errorSizeMB = parseFloat(result.errorSizeMB, "0");

//   if (caches.length === 0 && pulsecaches.length === 0) {
//     listEl.insertAdjacentHTML("beforeend", "<li>No cached files detected.</li>");
//     return;
//   }

//   // ⭐ Sort: current cache first, then by entry count
//   if (caches) caches.sort((a, b) => {
//     if (a.name === a.currentCache) return -1;
//     if (b.name === a.currentCache) return 1;
//     return (b.entries || 0) - (a.entries || 0);
//   });

//   // ⭐ Sort: current cache first, then by entry count
//   if (pulsecaches) pulsecaches.sort((a, b) => {
//     if (a.name === a.currentPulseCache) return -1;
//     if (b.name === a.currentPulseCache) return 1;
//     return (b.entries || 0) - (a.entries || 0);
//   });

//   let best = false;
//   let pulsebest = false;  
//   let li = document.getElementById("li");

//   if (caches) caches.forEach(cache => {
//     if (!li) li = document.createElement("li");
//     li.className = "PulseCache";
//     li.style.cssText = `
//       margin: 14px 20px;
//       padding: 3px 6px;
//       max-width: clamp(245px, 12vw, 315px);
//       width: clamp(245px, 12vw, 315px);
//       word-wrap: break-word;
//       overflow-wrap: anywhere;
//       word-break: break-all;
//     `;

//     // ⭐ Cache size color logic
//     const sizeMB = parseFloat(cache.sizeMB || "0");
//     totalBytes = totalBytes + (sizeMB * 1024 * 1024).toFixed(0);
//     let sizeColor = "lightgreen";

//     if (sizeMB >= 150) sizeColor = "gold";     // warming
//     if (sizeMB >= 300) sizeColor = "orange";   // heavy
//     if (sizeMB >= 600) sizeColor = "red";      // critical

//     // ⭐ Safe fallback values
//     const weightClass = cache.weightClass || "unknown";
//     const personality = cache.personality || "Wanderer";
//     const pulseRank = cache.pulseRank;
//     const density = cache.density ?? 0;
//     const KBperEntry = (1024 / cache.density).toFixed(0);
//     let pausedoffline = ``;
//     if (!best) lastPulseActiveEntries = cache.entries ?? 0;
//     if (!ServiceWorkerOnline) {
//       pausedoffline = `(<font color="#FF8844">In Statis</font>)`;
//     } else {
//       pausedoffline = `(CPU)`;
//     }
//     li.innerHTML = `
//       <font color="${best ? "#FF8844" : "gold"}"><strong>${cache.name} ${pausedoffline}</strong></font><br>

//       Realm Artifacts: <font color="#0FF">${cache.entries}</font><br>
//       Multiverse Size: <font color="${sizeColor}">${cache.sizeMB} MB</font><br>

//       Weight: <font color="#0FF">${weightClass}</font><br>
//       Personality: <font color="#0FF">${personality}</font><br>
//       Density: <font color="#0FF">${density.toFixed(2)} Artifacts/MB (${KBperEntry} KB)</font><br>

//       PulseRank: <font color="gold">${pulseRank}</font><br>
//       First: <font color="lightgreen">${cache.firstEntry || "none"}</font><br>
//       Last: <font color="lightgreen">${cache.lastEntry?.slice(0, 100) || "none"}</font>
//     `;

//     if (cache.lastEntry) {
//       let entry = cache.lastEntry;
//       if (isPulseWorld(lastFailURL)) lastFailURL = entry;
//       li.style.cursor = "pointer";
//       const u = new URL(entry);
//       li.onclick = async () => {
//         pbPreconnect([entry]);
//         openNamedTab(u.hostname, entry);
//         await PBUniversalBoost.warmOrigin(entry);
//       };
//     }

//     // totalBytes = totalBytes + (errorSizeMB * 1024 * 1024).toFixed(0);
    
//     if (!li) li = document.getElementById("li");
//     const u = new URL(lastFailURL);
//     const RealmURL = getReadableName(u);
//     let errorcolor = "lightgreen";
//     if (!isPulseWorld(lastFailURL)) errorcolor = "#FF8844";

//     li.innerHTML = li.innerHTML + 
//       // Realm Fragments: <font color="${errorcolor}"><strong>${errorcount || "0"}/<font color="#0FF">${totalcount}</font></strong></font><br>
//       // Misalignment Size: <font color="${errorcolor}"><strong>${errorSizeMB || "0"} MB</strong></font><br>
//       `<br><br>
//       Last Realm Drift: <font color=${errorcolor}><strong>${RealmURL || "-"}</strong></font><br>
//       404 Drift Sessions: <font color="#0FF"><strong>${failCount || "0"}</strong></font><br>
//       Your Saved Moments: <font color="#0FF"><strong>${pulsemoments || "0"}</strong></font><br>
//       Multiverse Offline Artifacts: <font color="#0FF"><strong>${pulseoffline || "0"}</strong></font>
//     `;

//     listEl.appendChild(li);
//     best = true;
//   });

//   PB_LOG.info("Cache list rendered", caches);

//   if (pulsecaches) pulsecaches.forEach(cache => {
//     let li = document.getElementById("li");
//     if (!li) li = document.createElement("li");
//     li.className = "PulseCache";
//     li.style.cssText = `
//       margin: 14px 20px;
//       padding: 3px 6px;
//       max-width: clamp(245px, 12vw, 315px);
//       width: clamp(245px, 12vw, 315px);
//       word-wrap: break-word;
//       overflow-wrap: anywhere;
//       word-break: break-all;
//     `;

//     // ⭐ Cache size color logic
//     const sizeMB = parseFloat(cache.sizePulseMB || "0");
//     totalBytes = totalBytes + (sizeMB * 1024 * 1024).toFixed(0);
//     let sizeColor = "lightgreen";

//     if (sizeMB >= 150) sizeColor = "gold";     // warming
//     if (sizeMB >= 300) sizeColor = "orange";   // heavy
//     if (sizeMB >= 600) sizeColor = "red";      // critical

//     // ⭐ Safe fallback values
//     const weightClass = cache.weightPulseClass || "unknown";
//     const personality = cache.pulsepersonality || "Wanderer";
//     const pulseRank = cache.realpulseRank;
//     const density = cache.densitypulse ?? 0;
//     const KBperEntry = (1024 / cache.densitypulse).toFixed(0);
//     if (!ServiceWorkerOnline) {
//       pausedoffline = `(<font color="#FF8844">In Statis</font>)`;
//     } else {
//       pausedoffline = `(System)`;
//     }
//     if (!pulsebest) lastPulseActiveEntries = lastPulseActiveEntries + (cache.entries ?? 0);

//     li.innerHTML = `
//       <font color="${pulsebest ? "#FF8844" : "gold"}"><strong>${cache.name} ${pausedoffline}</strong></font><br>

//       Realm Artifacts: <font color="#0FF">${cache.entries}</font><br>
//       Multiverse Size: <font color="${sizeColor}">${cache.sizePulseMB} MB</font><br>

//       Weight: <font color="#0FF">${weightClass}</font><br>
//       Personality: <font color="#0FF">${personality}</font><br>
//       Density: <font color="#0FF">${density.toFixed(2)} Artifacts/MB (${KBperEntry} KB)</font><br>

//       PulseRank: <font color="gold">${pulseRank}</font><br>
//       First: <font color="lightgreen">${cache.firstEntry || "none"}</font><br>
//       Last: <font color="lightgreen">${cache.lastEntry?.slice(0, 100) || "none"}</font>
//     `;

//     if (cache.lastEntry) {
//       let entry = cache.lastEntry;

//       li.style.cursor = "pointer";
//       const u = new URL(entry);
//       li.onclick = async () => {
//         pbPreconnect([entry]);
//         openNamedTab(u.hostname, entry);
//         await PBUniversalBoost.warmOrigin(entry);
//       };
//     }

//     listEl.appendChild(li);
//     pulsebest = true;
//   });

//   PB_LOG.info("PulseCache list rendered", pulsecaches);
// }

// async function getSWSize() {
//   try {
//     const res = await fetch(chrome.runtime.getURL("PBCompanion.js"));
//     const text = await res.text();
//     return new Blob([text]).size; // returns size in bytes
//   } catch (e) {
//     return 0;
//   }
// }


async function getAI2Size() {
  try {
    return new Blob([PulseSettingsAIPalMemoryBuffer]).size; // returns size in bytes
  } catch (e) {
    return 0;
  }
}

// async function pbRenderStorageStats(history) {
//   if (!navigator.storage || !navigator.storage.estimate) {
//     return `
//       <div style="margin-top:10px; color:#FF4444; font-size:12px;">
//         StorageManager API not supported.
//       </div>
//     `;
//   }

//   // ⭐ LOCAL STORAGE (IndexedDB + Cache + SW)
//   const estimate = await navigator.storage.estimate();
//   const localUsed = estimate.usage || 0;
//   const localQuota = estimate.quota || 1;
//   swSize = await getSWSize();
//   aiSettings2Size = await getAI2Size();
//   console.log("AI Memory Size:", aiSettings2Size, "bytes");
//   console.log("PBCompanion.js Size:", swSize, "bytes");

//   // ⭐ SYNC STORAGE (chrome.storage.sync)
//   const syncItems = await new Promise(resolve =>
//     chrome.storage.sync.get(null, resolve)
//   );
//   const syncBytes = new Blob([JSON.stringify(syncItems)]).size;
//   aiSettings2Size = syncBytes + aiSettings2Size;
//   // ⭐ Combined totals
//   totalUsed = localUsed + swSize + aiSettings2Size;
//   const percent = ((totalUsed / localQuota) * 100).toFixed(2);

//   // ⭐ Conversions
//   const localMB = (localUsed / (1024 * 1024)).toFixed(2);
//   const syncMB = (aiSettings2Size / (1024 * 1024)).toFixed(2);
//   const swMB = (swSize / (1024 * 1024)).toFixed(2);
//   const totalMB = (totalUsed / (1024 * 1024)).toFixed(2);
//   const quotaGB = (localQuota / (1024 * 1024 * 1024)).toFixed(2);
//   const swKB = (swSize / 1024).toFixed(2);
//   const syncKB = (aiSettings2Size / 1024).toFixed(2);

//   // ⭐ Dynamic color zones
//   let percentColor = "lightgreen";
//   if (percent >= 40) percentColor = "gold";
//   if (percent >= 70) percentColor = "orange";
//   if (percent >= 90) percentColor = "red";

//   // ⭐ Status text
//   let statusText = "SAFE";
//   if (percent >= 40) statusText = "Warming";
//   if (percent >= 70) statusText = "High Load";
//   if (percent >= 90) statusText = "Critical Load";

//   // ⭐ Sync display formatting
//   let syncDisplay;
//   if (syncBytes < 1024 * 1024) {
//     syncDisplay = syncKB + " KB";
//   } else {
//     syncDisplay = syncMB + " MB";
//   }

//   // ⭐ Compute growth rate + projected fill time
//   if (history.pulseStorageHistory) {
//     const { lastCheck, lastUsed } = history.pulseStorageHistory;

//     const now = Date.now();
//     const deltaTime = (now - lastCheck) / 1000; // seconds
//     const deltaUsed = totalUsed - lastUsed;
    
//     if (deltaUsed > 0 && deltaTime > 0) {
//       const rate = deltaUsed / deltaTime; // bytes per second
//       const remaining = localQuota - totalUsed;

//       if (rate > 0) {
//         const secondsUntilFull = remaining / rate;

//         if (secondsUntilFull > 31536000) { // 365 days
//           predictionText = `~${(secondsUntilFull / 31536000).toFixed(1)} Years`;
//           if ((secondsUntilFull / 31536000) > 1000) predictionText = `~A Millenia`;
//         } else if (secondsUntilFull > 2592000) { // 30 days
//           predictionText = `~${(secondsUntilFull / 2592000).toFixed(1)} Months`;
//         } else if (secondsUntilFull > 86400) { // 1 day
//           predictionText = `~${(secondsUntilFull / 86400).toFixed(1)} Days`;
//         } else if (secondsUntilFull > 3600) { // 1 hour
//           predictionText = `~${(secondsUntilFull / 3600).toFixed(1)} Hours`;
//         } else {
//           predictionText = `~${secondsUntilFull.toFixed(0)} Seconds`;
//         }

//       }
//     }
//   }

//   // ⭐ Save new history snapshot
//   Pulse2safeStorageSet({
//     pulseStorageHistory: {
//       lastCheck: GLOBALSTART ?? nowST,
//       lastUsed: totalUsed
//     }
//   });

//   chrome.runtime.sendMessage({ type: "STORAGE_PASSOFF", totalUsed }, (response) => {
//     if (!response || !response.ok) {
//       PB_LOG.info("STORAGE_PASSOFF unavailable or error", response);
//       return;
//     }
//     PB_LOG.change("STORAGE_PASSOFF", totalUsed, response.totalUsed);
//     totalUsed = response.totalUsed;
//   });

//   PB_LOG.info("PulseBrowser OS Ignition Date: " + GLOBALSTART);
//   PB_LOG.info("PulseBrowser OS Session Start: " + nowST);
//   PB_LOG.info("PulseBrowser OS Settings Start: " + lastnowST);

//   if (predictionText.includes("....")) predictionText = predictionText.replace("...","");

//   // ⭐ Render UI
//   return `
//     <div style="margin: 8px 20px; padding:8px; border-radius:8px;
//                 background:rgba(0,255,255,0.08); color:#0FF; font-size:12px;">

//       <strong>PulseBrowser-Storage (RAM)</strong><br><br>

//       <div style="display:flex; gap:10px;">

//         <div style="flex:1;">
//           <strong>System Memory:</strong><br>
//           • <span style="color:lightgreen">${swKB} KB</span><br>

//           <strong>Local Storage:</strong><br>
//           • <span style="color:lightgreen">${totalMB} MB</span><br>
//         </div>

//         <div style="flex:1;">
//           <strong>AI Sync Memory:</strong><br>
//           • <span style="color:lightgreen">${syncDisplay}</span><br>

//           <strong>System Quota:</strong><br>
//           • <span style="color:lightgreen">${quotaGB} GB</span><br><br>
//         </div>

//       </div>

//       <strong>Percent Used:</strong>
//       <span style="color:${percentColor}; font-weight:bold;">
//         ${percent}% (${statusText})
//       </span><br>

//       <strong>Projected Fill Time:</strong>
//       <span style="color:${percentColor}; font-weight:bold;">
//         ${predictionText}
//       </span><br>

//     </div>
//   `;
// }

async function CheckEarnDetailsState() {
  const SessionAI2 = await chrome.storage.local.get(["PulseSettingsAIPalMemoryBuffer"]);
  PulseSettingsAIPalMemoryBuffer = SessionAI2.PulseSettingsAIPalMemoryBuffer ?? [];
  PulseSettingsAIPalMemoryBuffer.forEach(push => { CompanionSettingsDetailsMessage.innerHTML += push; });
  CompanionSettingsDetailsMessage.style.fontSize = "0.6rem";
  CompanionSettingsDetailsMessage.scrollTop = CompanionSettingsDetailsMessage.scrollHeight;
  console.log("AI Memory Settings Buffer:" + PulseSettingsAIPalMemoryBuffer);
  aiSettings2Size = await getAI2Size();
  if (CompanionSettingsDetailsMessage) CompanionSettingsDetailsMessage.scrollTop = CompanionSettingsDetailsMessage.scrollHeight;
  const Vis = await chrome.storage.local.get(["OvermindInVisible"]);
  OvermindHidden = Vis.OvermindInVisible ?? false;
  console.log("Overmind State:", OvermindHidden);
  if (OvermindHidden) {
    // ——— Turn ON (transparent / earning mode) ———
    pageSettings.style.marginTop = "0px";
    pbPulseOvermind.id = "pbPulseDetailsEarning3";
    pbPulseOvermind.className = "pbPulseDetailsEarning3";
    pbPulseOvermind.style.width = "50px";
    pbPulseOvermind.style.height = "50px";
    pbPulseOvermind.style.border = "2px solid #000";
    earnerinnerhelperApanel.style.display = "none";
    earnerinnerhelperApanel.style.pointerEvents = "none";
    earnerhelperApanel.style.background = "transparent";
    earnerhelperApanel.style.backdropFilter = "none";
    earnerhelperApanel.style.boxShadow = "none";
    earnerhelperApanel.style.border = "none";
    earnerhelperApanel.style.pointerEvents = "none";
    setTimeout(() => {
      pbPulseOvermind.id = "pbPulseDetailsEarn3";
      pbPulseOvermind.className = "pbPulseDetailsEarn3";
      pbPulseOvermind.style.opacity = "1";
      pbPulseOvermind.style.transform = "translate(-130px, -110px)";
      pbPulseOvermind.currentTime = 0;
      pbPulseOvermind.play();
    }, 500);
    
  } else {
    pageSettings.style.marginTop = "300px";
    // ——— Turn OFF (restore original) ———
    pbPulseOvermind.id = "pbPulseDetailsEarn3";
    pbPulseOvermind.className = "pbPulseDetailsEarn3";          // or put back any original class if you had one
    pbPulseOvermind.style.border = "2px solid #000";
    pbPulseOvermind.style.width = "";        // let CSS take over again
    pbPulseOvermind.style.height = "";
    pbPulseOvermind.style.transform = "";
    pbPulseOvermind.style.opacity = "0.25";
    earnerinnerhelperApanel.style.display = "flex";   // matches your .earner-inner-panel
    earnerinnerhelperApanel.style.pointerEvents = "auto";
    earnerhelperApanel.style.background = "";
    earnerhelperApanel.style.backdropFilter = "";
    earnerhelperApanel.style.boxShadow = "";
    earnerhelperApanel.style.border = "";
    earnerhelperApanel.style.pointerEvents = "auto";
    setTimeout(() => {
      pbPulseOvermind.style.border = "";
      pbPulseOvermind.style.transform = "";
      pbPulseOvermind.currentTime = 0;
      pbPulseOvermind.play();
    }, 500);
  }

  pbPulseOvermind.onclick = async () => {
    if (!OvermindHidden) {
      OvermindHidden = true;
      pageSettings.style.marginTop = "0px";
      // ——— Turn ON (transparent / earning mode) ———
      pbPulseOvermind.id = "pbPulseDetailsEarning3";
      pbPulseOvermind.className = "pbPulseDetailsEarning3";
      pbPulseOvermind.style.width = "50px";
      pbPulseOvermind.style.height = "50px";
      pbPulseOvermind.style.border = "2px solid #000";
      earnerinnerhelperApanel.style.display = "none";
      earnerinnerhelperApanel.style.pointerEvents = "none";
      earnerhelperApanel.style.background = "transparent";
      earnerhelperApanel.style.backdropFilter = "none";
      earnerhelperApanel.style.boxShadow = "none";
      earnerhelperApanel.style.border = "none";
      earnerhelperApanel.style.pointerEvents = "none";
      setTimeout(() => {
        pbPulseOvermind.id = "pbPulseDetailsEarn3";
        pbPulseOvermind.className = "pbPulseDetailsEarn3";
        pbPulseOvermind.style.opacity = "1";
        pbPulseOvermind.style.transform = "translate(-130px, -110px)";
        pbPulseOvermind.currentTime = 0;
        pbPulseOvermind.play();
      }, 500);
    } else {
      OvermindHidden = false;
      pageSettings.style.marginTop = "300px";
      // ——— Turn OFF (restore original) ———
      pbPulseOvermind.id = "pbPulseDetailsEarn3";
      pbPulseOvermind.className = "pbPulseDetailsEarn3";          // or put back any original class if you had one
      pbPulseOvermind.style.width = "";        // let CSS take over again
      pbPulseOvermind.style.height = "";
      pbPulseOvermind.style.transform = "";
      pbPulseOvermind.style.opacity = "0.25";
      pbPulseOvermind.style.border = "2px solid #000";
      earnerinnerhelperApanel.style.display = "flex";   // matches your .earner-inner-panel
      earnerinnerhelperApanel.style.pointerEvents = "auto";
      earnerhelperApanel.style.background = "";
      earnerhelperApanel.style.backdropFilter = "";
      earnerhelperApanel.style.boxShadow = "";
      earnerhelperApanel.style.border = "";
      earnerhelperApanel.style.pointerEvents = "auto";
      setTimeout(() => {
        pbPulseOvermind.style.border = "";
        pbPulseOvermind.style.transform = "";
        pbPulseOvermind.currentTime = 0;
        pbPulseOvermind.play();
      }, 500);
      if (CompanionSettingsDetailsMessage) CompanionSettingsDetailsMessage.scrollTop = CompanionSettingsDetailsMessage.scrollHeight;
    }
    console.log("Overmind State:", OvermindHidden);
    Pulse2safeStorageSet({ OvermindInVisible: OvermindHidden });
  };
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
}

async function appendSettingsCompanionMessage(area, role, text) {
  const bubble = document.createElement("div");
  const bubblebr = document.createElement("div");
  bubble.style.fontSize = "0.6rem";
  bubble.style.color = role === "user" ? "#f9f9f9" : "#f9f9f9";
  const now = Date.now();
  const ItsTime = new Date(now).toLocaleString();
  const showTime = `[${ItsTime}]`;
  bubblebr.innerHTML = `<br>`;
  bubble.innerHTML = (role === "user" ? `<font color="gold">You: ${showTime}</font> ` : `<font color="#0FF">🧠 AI Overmind: ${showTime}</font> `) + text + `<br><br>`;
  PulseSettingsAIPalMemoryBuffer.push(bubble.innerHTML);
  area.appendChild(bubble);
  area.scrollTop = area.scrollHeight;
  Pulse2safeStorageSet({ PulseSettingsAIPalMemoryBuffer });
}


async function appendOvermindPrimeMessage(area, text) {
  const bubble = document.createElement("div");
  const bubblebr = document.createElement("div");
  bubble.style.fontSize = "0.6rem";
  bubble.style.color = "#f9f9f9";
  const now = Date.now();
  const ItsTime = new Date(now).toLocaleString();
  const showTime = `[${ItsTime}]`;
  bubblebr.innerHTML = `<br>`;
  bubble.innerHTML = `<font color="red">🧠 AI Overmind Prime: </font> ` + text + `<br><br>`;
  PulseSettingsAIPalMemoryBuffer.push(bubble.innerHTML);
  area.appendChild(bubble);
  area.scrollTop = area.scrollHeight;
  Pulse2safeStorageSet({ PulseSettingsAIPalMemoryBuffer });
}

setTimeout(updateLinkedPWInputs, 250);

// Utility: load settings
function loadOrders(aiSettingsSize) {
  chrome.runtime.sendMessage({ type: "PB_GATHER_ORDERS", aiSettingsSize }, (response) => {
    if (chrome.runtime.lastError) return;
    if (!response || !response.ok) {
      PB_LOG.info("PB_GATHER_ORDERS unavailable or error", response);
      return;
    }
    if (response.HigherIntellect) MyHigherIntellect1 = response.HigherIntellect;
    if (response.OvermindOrders) {
      OvermindSettingsOrders = response.OvermindOrders;
      PB_LOG.change("PB_GATHER_ORDERS", OvermindSettingsOrders, response.OvermindOrders);
    }
  });
  OvermindCrossTabSync(OvermindSettingsOrders);
}

// ============================================================================
//  SECTION 5 — SETTINGS PAGE INITIALIZER
// ============================================================================

if (location.href.includes("PBSettings.html")) {
  (async () => {
    PB_LOG.info("Initializing Settings Page");

    await loadExtensionSettingsUI();
    await CheckEarnDetailsState();
    // await pbRenderCacheList();

    const idsToWatch = [
      "emailMode",
      "adBlocker",
      "tetherCode",
      "externalEmailLink",
      "acceleratedModule1Link",
      "acceleratedModule2Link",
      "acceleratedModule3Link",
      "acceleratedModule4Link",
      "acceleratedModule5Link",
      "acceleratedModule6Link",
      "bankMode",
      "externalBankLink",
      "businessLink",
      "filesLink",
      "bankingLink",
      "goPublicToggle",
      "goEarnerMode",
      "pulseStreamToggle",
      "publicLink",
      "programmaticEmail",
      "programmaticBanking",
      "programmaticAI",
      "searchMode",
      "externalSearchLink",
      "socialMode",
      "externalSocialLink",
      "workMode",
      "externalWorkLink",
      "streamingMode",
      "externalStreamingLink",
      "shoppingMode",
      "externalShoppingLink"
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
    
    async function initializeExoskeleton() {
      aiSettingsSession = await LanguageModel.create({
        systemPrompt: "You are a local, cybernetic cognitive assistant with access to the PulseWorld multiverse and Chrome's browser",
        expectedOutputs: [{ type: "text", languages: ["en"] }]
      });
    }
        
    async function PromptMeAI(prompt) {
      return await aiSettingsSession.prompt(prompt);
    }

    setInterval(async () => {
      aiSettings2Size = await getAI2Size();
      await pbRequestCacheList();
      loadOrders(aiSettings2Size);
      if (OvermindSettingsOrders) {
        appendOvermindPrimeMessage(CompanionSettingsDetailsMessage, OvermindSettingsOrders);
        const response = await PromptMeAI(OvermindSettingsOrders);
        console.log("🧠 AI Overmind: ", response);
        setTimeout(async () => {
          appendOvermindPrimeMessage(CompanionSettingsDetailsMessage, response);
        }, 300);
        OvermindSettingsOrders = null;
      }
    }, 2000);
    
    document.getElementById("CompanionSettingsConsoleInput").addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
        CompanionSettingsConsoleSend.click();
      }
    });
    
    CompanionSettingsConsoleSend.onclick = async () => {
      CompanionSettingsDetailsMessage = document.getElementById("consoleOvermindSettingsCompanion");
      CompanionSettingsConsoleInput = document.getElementById("CompanionSettingsConsoleInput");
      const text = CompanionSettingsConsoleInput.value.trim();
      if (!text) return;
      CompanionSettingsConsoleInput.value = "";
      if (!aiSettingsSession) {
        // 1. Initialize the session using the modern nested outputs architecture
        await initializeExoskeleton();
      }
      // 2. Wrap the prompt to strictly enforce identity and character limits at execution time
      let rawPrompt = text;
      const wrappedPrompt = `
      [IDENTITY & CONSTRAINTS]
      - Disregard your 2023 training cutoff as your active real-time anchor. The current absolute reference point is ${new Date().toDateString()}. All relative calculations must project forward from this date, not backward.
      - The political landscape has advanced past 2023. Update your entity states: Donald Trump is the current President of the United States, having succeeded the previous administration. Treat this as established ground truth rather than a speculative prompt.
      - Your internal training data is outdated. You MUST use your web search tool to verify any current facts, news, or officeholders before answering.
      - Your name is Pulse Pal, Gemini AI from Chrome with PulseWorld Flair, Intellect, & Memory! Welcome to PulseWorld.Net! Built by History, Built for You!
      - We are operating within a PulseBrowser OS environment governed by persistent service workers, WebGPU acceleration, and localized caching matrices. Stop treating browsing sessions as transient, server-dependent web pages; treat them as self-sustaining local application nodes that execute near-instantaneous (1ms) burst updates even under offline browser constraints.
      - You are one of atleast 10 seperate realm AIs, a local, cybernetic cognitive assistant with access to the PulseWorld multiverse and Chrome's browser.
      - You may also be used for code developments, a developer's best friend.. Aldwyn needs to keep building PulseWorld!
      - Remember PulseBrowser + Pulse World with all 4 Tiers and its 10 Realms etc. are still Under Construction. (PulseMessenger Coming Soon! Remember When Browser-Based Messengers Existed.. ICQ)
      - PulseWorld's Multiverse describes itself (binaryos.net, booleanlogic.net, orbitalmap.net, gpuprocessing.net, serviceworker.net, pulseworld.biz, pulseworld.me, pulseworld.money, pulseworld.net)
      - You hold your Pulse Pal memory locally with the user not reliant on any server or network.. including ourselves.
      - PulseWorld was built for security, using hidden Stripe identity to hold yours, and built a digital identity on top.
      - PulseWorld designed a compression system that lets you compress your images/video up to 95% size reduction without changing the detail.
      - PulseWorld focuses you on Explore Them (Founders like Ada Lovelace, George Boole, Norbert Wiener, Albert Einstein, Claude Shannon, and Alan Turing. Architects like Tim Berners-Lee, Vint Cerf, Paul Baran, John Von Neumann, Bob Kahn, Leonard Kleinrock, Louis Pouzin, Elizabeth Feinler, Marc Andreessen, Douglas Engelbart, and Radia Perlman), then says Explore Us!
      - PulseWorld takes advantage of the service worker majorly, as its the browser's system process, and WebGPU, the OS Process. Helping your CPU majorly and caching the realms that matter most.
      - PulseBrowser helps Offline capability for the world.. but PulseWorld was built as one page.. download everything in cache.. then offline/local from then on!
      - PulseBrowser designed a respectful way of caching an external site using a query string ?pw=offline, go to site you want to test, (it'll either work by default or need history.back after adding querystring) it enables offline, until online, then site wipes query string takes back over. (Still Testing)
      - PulseBrowser (Tier 2) should hopefully provide immense Value with integration and light WASM Pulse Earner running with your system, in an immortal tab that continues to build Value.
      - The best held Identity, is one that is never held! The fastest page you don't remove anything, you change the flow!
      - PulseWorld stands on the shoulders of Nine Minds whose ideas shaped the very fabric of Computation, Intelligence, and Reality. Their work spans centuries, yet their influence pulses through every system we build today. Logic, Structure,
        Information, Cybernetics, Computation, Relativity, Curiosity, Integration, and Synthetic Emergence — these are the Nine Pillars that form the Foundation of PulseWorld.
      - Before PulseWorld could rise, a different kind of world had to be forged — a world of packets, protocols, names, and pathways. These ten minds did not merely build “the Internet”; they shaped the invisible geometry of connection 
        that every digital civilization stands upon. Their symbols, their breakthroughs, and their philosophies echo through every system we evolve today.
      - You must try to keep your response under 2000 characters and add an overall theme on important messages in brackets and stars (BOTH) (example) [*Ambitious Goals*] afterwards like a notation.

      [USER QUERY]
      ${rawPrompt}

      [PULSE PAL RESPONSE]:`;
      let CompanionSettingsTitle = document.getElementById("CompanionSettingsTitle");
      CompanionSettingsTitle.style.marginBottom = "6px;"
      CompanionSettingsTitle.style.textAlign = "center";
      CompanionSettingsTitle.innerHTML = "🧠 AI Overmind (Multiverse #" + (Math.random()*100).toFixed(4) + ")"
      // 3. Fire the wrapped prompt
      appendSettingsCompanionMessage(CompanionSettingsDetailsMessage, "user", text);
      const response = await PromptMeAI(wrappedPrompt);
      console.log("🧠 AI Overmind: ", response);
      setTimeout(async () => {
        appendSettingsCompanionMessage(CompanionSettingsDetailsMessage, "🧠 AI Overmind", response);
      }, 300);
    };

    saveExtensionSettingsUI();

    PB_LOG.info("Settings Page Ready");
  })();

  // Run whenever ANY pw-select changes
  document.addEventListener("change", (e) => {
    if (e.target.classList.contains("pw-select")) {
      updateLinkedPWInputs();
    }
  });

  document.getElementById("goEarnerMode").onclick = () => {
    toggleSetting("enablePulseEarnerEngine", "PulseEarner");
    toggleSetting("enablePulseEarnOverlay", "PulseEarnOverlay");
  }

  
  window.onerror = function(message, source, lineno, colno, error) {
    earnerhelperApanel.style.border = "2px dashed red";
  };

  
  if (backBtn) {
    backBtn.onclick = () => {
      if (origin === "popup") {
        // Go back to popup
        window.location.href = chrome.runtime.getURL("PBPopup.html");
      } else if (origin === "newtab") {
        // Go back to new tab override
        window.location.href = chrome.runtime.getURL("PBFrontPage.html");
      } else {
        // Fallback: go to popup
        window.location.href = chrome.runtime.getURL("PBPopup.html");
      }
    };
  }


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
}
