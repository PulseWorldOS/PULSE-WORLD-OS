// ============================================================================
//  PBSettings.js — PulseBrowser OS Settings Registry (Ultra Edition v7.0)
//  Unified OS Registry + Extension Settings Page + MV3-Compliant Storage
//  FULL DIAGNOSTIC MODE — Every change logged, color-coded, timestamped
// ============================================================================
const params = new URLSearchParams(location.search);
const origin = params.get("from");
let nowST = Date.now(); // numeric timestamp
let lastnowST = Date.now(); // numeric timestamp

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

chrome.storage.local.get(["globalStart"], (res) => {
  if (!res.globalStart) {
    GLOBALSTART = Date.now();
    chrome.storage.local.set({ globalStart: GLOBALSTART });
  } else {
    if (isValid(res.globalStart)) {
      GLOBALSTART = res.globalStart;
      PB_LOG.info("PulseBrowser OS Ignition Date: " + GLOBALSTART);
      PB_LOG.info("PulseBrowser OS Session Start: " + nowST);
      PB_LOG.info("PulseBrowser OS Settings Start: " + lastnowST);
    } else {
      GLOBALSTART = Date.now();
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
      S.accelModuleWarmBoot = S.accelModuleWarmBoot !== false; // auto warm boot for home universe
      PB_LOG.load("getSettings()", S);
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
    publicLink: document.getElementById("publicLink").value.trim(),

    programmaticEmail: document.getElementById("programmaticEmail").checked,
    programmaticBanking: document.getElementById("programmaticBanking").checked
  };

  await chrome.storage.local.set({ [EXTENSION_SETTINGS_KEY2]: settings });

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
      PB_LOG.load("PulseCache list received", response.pulsecaches);
      resolve(response);   // ⭐ Return the WHOLE object
    });
  });
}

async function pbRenderCacheList() {
  const listEl = document.getElementById("cache-panel");
  if (!listEl) return;
  
  // ⭐ Wipe panel completely
  listEl.innerHTML = `
    <div style="font-weight:bold; text-align: center; color: #0FF; font-size:13px; margin-top: 6px; margin-bottom:6px;">
      PulseBrowser OS - User Memory
    </div>
  `;
    
  const store = await chrome.storage.local.get(["pb_fail_cache"]);
  const fails = store.pb_fail_cache || {};
  const failCount = Object.keys(fails).length;

  // ⭐ Memory FIRST
  // ⭐ Load previous storage history
  const history = await new Promise(resolve =>
    chrome.storage.local.get("pulseStorageHistory", resolve)
  );
  
  predictionText = predictionText + ".";
  const statsHTML = await pbRenderStorageStats2(history);
  
  listEl.insertAdjacentHTML("beforeend", statsHTML);

  // ⭐ Fetch cache list
  const result = await pbRequestCacheList();
  
  if (!result || (!result.caches && !result.pulsecaches)) {
    listEl.insertAdjacentHTML("beforeend", "<li>Cache API unavailable in extension pages.</li>");
    return;
  }

  const caches = result.caches;
  const pulsecaches = result.pulsecaches;  
  const errorcount = result.errorcount;
  const totalcount = result.totalcount;
  // const errorSizeMB = parseFloat(result.errorSizeMB, "0");

  if (caches.length === 0 && pulsecaches.length === 0) {
    listEl.insertAdjacentHTML("beforeend", "<li>No cached files detected.</li>");
    return;
  }

  // ⭐ Sort: current cache first, then by entry count
  if (caches) caches.sort((a, b) => {
    if (a.name === a.currentCache) return -1;
    if (b.name === a.currentCache) return 1;
    return (b.entries || 0) - (a.entries || 0);
  });

  // ⭐ Sort: current cache first, then by entry count
  if (pulsecaches) pulsecaches.sort((a, b) => {
    if (a.name === a.currentPulseCache) return -1;
    if (b.name === a.currentPulseCache) return 1;
    return (b.entries || 0) - (a.entries || 0);
  });

  let best = false;
  let pulsebest = false;  
  let li = document.getElementById("li");

  if (caches) caches.forEach(cache => {
    if (!li) li = document.createElement("li");
    li.className = "PulseCache";
    li.style.cssText = `
      margin: 14px 20px;
      padding: 3px 6px;
      max-width: clamp(245px, 12vw, 315px);
      width: clamp(245px, 12vw, 315px);
      word-wrap: break-word;
      overflow-wrap: anywhere;
      word-break: break-all;
    `;

    // ⭐ Cache size color logic
    const sizeMB = parseFloat(cache.sizeMB || "0");
    totalBytes = totalBytes + (sizeMB * 1024 * 1024).toFixed(0);
    let sizeColor = "lightgreen";

    if (sizeMB >= 150) sizeColor = "gold";     // warming
    if (sizeMB >= 300) sizeColor = "orange";   // heavy
    if (sizeMB >= 600) sizeColor = "red";      // critical

    // ⭐ Safe fallback values
    const weightClass = cache.weightClass || "unknown";
    const personality = cache.personality || "Wanderer";
    const pulseRank = cache.pulseRank;
    const density = cache.density ?? 0;
    const KBperEntry = (1024 / cache.density).toFixed(0);
    let pausedoffline = ``;
    if (!best) lastPulseActiveEntries = cache.entries ?? 0;
    if (!ServiceWorkerOnline) {
      pausedoffline = `(««PAUSED»»)`;
    } else {
      pausedoffline = `(CPU)`;
    }
    li.innerHTML = pausedoffline + `
      <font color="${best ? "#FF8844" : "gold"}"><strong>${cache.name} ${pausedoffline}</strong></font><br>

      Realm Artifacts: <font color="#0FF">${cache.entries}</font><br>
      Multiverse Size: <font color="${sizeColor}">${cache.sizeMB} MB</font><br>

      Weight: <font color="#0FF">${weightClass}</font><br>
      Personality: <font color="#0FF">${personality}</font><br>
      Density: <font color="#0FF">${density.toFixed(2)} Artifacts/MB (${KBperEntry} KB)</font><br>

      PulseRank: <font color="gold">${pulseRank}</font><br>
      First: <font color="lightgreen">${cache.firstEntry || "none"}</font><br>
      Last: <font color="lightgreen">${cache.lastEntry?.slice(0, 100) || "none"}</font>
    `;

    if (cache.lastEntry) {
      let entry = cache.lastEntry;

      li.style.cursor = "pointer";
      const u = new URL(entry);
      li.onclick = async () => {
        pbPreconnect([entry]);
        openNamedTab(u.hostname, entry);
        await PBUniversalBoost.warmOrigin(entry);
      };
    }

    // totalBytes = totalBytes + (errorSizeMB * 1024 * 1024).toFixed(0);

    let errorcolor = "lightgreen";
    if (errorcount) errorcolor = "#FF8844";
    if (!li) li = document.getElementById("li");

    li.innerHTML = li.innerHTML + 
      // Realm Fragments: <font color="${errorcolor}"><strong>${errorcount || "0"}/<font color="#0FF">${totalcount}</font></strong></font><br>
      // Misalignment Size: <font color="${errorcolor}"><strong>${errorSizeMB || "0"} MB</strong></font><br>
      `<p>
      404 Drift Sessions: <font color="#0FF"><strong>${failCount || "0"}</strong></font>
    `;

    listEl.appendChild(li);
    best = true;
  });

  PB_LOG.info("Cache list rendered", caches);

  if (pulsecaches) pulsecaches.forEach(cache => {
    let li = document.getElementById("li");
    if (!li) li = document.createElement("li");
    li.className = "PulseCache";
    li.style.cssText = `
      margin: 14px 20px;
      padding: 3px 6px;
      max-width: clamp(245px, 12vw, 315px);
      width: clamp(245px, 12vw, 315px);
      word-wrap: break-word;
      overflow-wrap: anywhere;
      word-break: break-all;
    `;

    // ⭐ Cache size color logic
    const sizeMB = parseFloat(cache.sizePulseMB || "0");
    totalBytes = totalBytes + (sizeMB * 1024 * 1024).toFixed(0);
    let sizeColor = "lightgreen";

    if (sizeMB >= 150) sizeColor = "gold";     // warming
    if (sizeMB >= 300) sizeColor = "orange";   // heavy
    if (sizeMB >= 600) sizeColor = "red";      // critical

    // ⭐ Safe fallback values
    const weightClass = cache.weightPulseClass || "unknown";
    const personality = cache.pulsepersonality || "Wanderer";
    const pulseRank = cache.realpulseRank;
    const density = cache.densitypulse ?? 0;
    const KBperEntry = (1024 / cache.densitypulse).toFixed(0);
    if (!ServiceWorkerOnline) {
      pausedoffline = `(««PAUSED»»)`;
    } else {
      pausedoffline = `(System)`;
    }
    if (!pulsebest) lastPulseActiveEntries = lastPulseActiveEntries + (cache.entries ?? 0);

    li.innerHTML = `
      <font color="${pulsebest ? "#FF8844" : "gold"}"><strong>${cache.name} ${pausedoffline}</strong></font><br>

      Realm Artifacts: <font color="#0FF">${cache.entries}</font><br>
      Multiverse Size: <font color="${sizeColor}">${cache.sizePulseMB} MB</font><br>

      Weight: <font color="#0FF">${weightClass}</font><br>
      Personality: <font color="#0FF">${personality}</font><br>
      Density: <font color="#0FF">${density.toFixed(2)} Artifacts/MB (${KBperEntry} KB)</font><br>

      PulseRank: <font color="gold">${pulseRank}</font><br>
      First: <font color="lightgreen">${cache.firstEntry || "none"}</font><br>
      Last: <font color="lightgreen">${cache.lastEntry?.slice(0, 100) || "none"}</font>
    `;

    if (cache.lastEntry) {
      let entry = cache.lastEntry;

      li.style.cursor = "pointer";
      const u = new URL(entry);
      li.onclick = async () => {
        pbPreconnect([entry]);
        openNamedTab(u.hostname, entry);
        await PBUniversalBoost.warmOrigin(entry);
      };
    }

    listEl.appendChild(li);
    pulsebest = true;
  });

  PB_LOG.info("PulseCache list rendered", pulsecaches);
}

async function getSWSize() {
  try {
    const res = await fetch(chrome.runtime.getURL("PBCompanion.js"));
    const text = await res.text();
    return new Blob([text]).size; // returns size in bytes
  } catch (e) {
    return 0;
  }
}


async function pbRenderStorageStats2(history) {
  if (!navigator.storage || !navigator.storage.estimate) {
    return `
      <div style="margin-top:10px; color:#FF4444; font-size:12px;">
        StorageManager API not supported.
      </div>
    `;
  }

  // ⭐ LOCAL STORAGE (IndexedDB + Cache + SW)
  const estimate = await navigator.storage.estimate();
  const localUsed = estimate.usage || 0;
  const localQuota = estimate.quota || 1;
  const swSize = await getSWSize();
  console.log("PBCompanion.js Size:", swSize, "bytes");

  // ⭐ SYNC STORAGE (chrome.storage.sync)
  const syncItems = await new Promise(resolve =>
    chrome.storage.sync.get(null, resolve)
  );
  const syncBytes = new Blob([JSON.stringify(syncItems)]).size;

  // ⭐ Combined totals
  totalUsed = localUsed + syncBytes + swSize;
  const percent = ((totalUsed / localQuota) * 100).toFixed(2);

  // ⭐ Conversions
  const localMB = (localUsed / (1024 * 1024)).toFixed(2);
  const syncMB = (syncBytes / (1024 * 1024)).toFixed(2);
  const swMB = (swSize / (1024 * 1024)).toFixed(2);
  const totalMB = (totalUsed / (1024 * 1024)).toFixed(2);
  const quotaGB = (localQuota / (1024 * 1024 * 1024)).toFixed(2);
  const swKB = (swSize / 1024).toFixed(2);

  // ⭐ Dynamic color zones
  let percentColor = "lightgreen";
  if (percent >= 40) percentColor = "gold";
  if (percent >= 70) percentColor = "orange";
  if (percent >= 90) percentColor = "red";

  // ⭐ Status text
  let statusText = "SAFE";
  if (percent >= 40) statusText = "Warming";
  if (percent >= 70) statusText = "High Load";
  if (percent >= 90) statusText = "Critical Load";

  // ⭐ Sync display formatting
  let syncDisplay;
  if (syncBytes < 1024 * 1024) {
    syncDisplay = (syncBytes / 1024).toFixed(2) + " KB";
  } else {
    syncDisplay = syncMB + " MB";
  }

  // ⭐ Compute growth rate + projected fill time
  if (history.pulseStorageHistory) {
    const { lastCheck, lastUsed } = history.pulseStorageHistory;

    const now = Date.now();
    const deltaTime = (now - lastCheck) / 1000; // seconds
    const deltaUsed = totalUsed - lastUsed;

    if (deltaUsed > 0 && deltaTime > 0) {
      const rate = deltaUsed / deltaTime; // bytes per second
      const remaining = localQuota - totalUsed;

      if (rate > 0) {
        const secondsUntilFull = remaining / rate;

        if (secondsUntilFull > 86400) {
          predictionText = `~${(secondsUntilFull / 86400).toFixed(1)} Days`;
        } else if (secondsUntilFull > 3600) {
          predictionText = `~${(secondsUntilFull / 3600).toFixed(1)} Hours`;
        } else {
          predictionText = `~${secondsUntilFull.toFixed(0)} Seconds`;
        }
      }
    }
  }

  // ⭐ Save new history snapshot
  chrome.storage.local.set({
    pulseStorageHistory: {
      lastCheck: GLOBALSTART ?? nowST,
      lastUsed: totalUsed
    }
  });

  chrome.runtime.sendMessage({ type: "STORAGE_PASSOFF", totalUsed }, (response) => {
    if (!response || !response.ok) {
      PB_LOG.info("STORAGE_PASSOFF unavailable or error", response);
      return;
    }
    PB_LOG.change("STORAGE_PASSOFF", totalUsed, response.totalUsed);
    totalUsed = response.totalUsed;
  });

  PB_LOG.info("PulseBrowser OS Ignition Date: " + GLOBALSTART);
  PB_LOG.info("PulseBrowser OS Session Start: " + nowST);
  PB_LOG.info("PulseBrowser OS Settings Start: " + lastnowST);

  if (predictionText.includes("....")) predictionText = predictionText.replace("...","");

  // ⭐ Render UI
  return `
    <div style="margin: 14px 20px; padding:8px; border-radius:8px;
                background:rgba(0,255,255,0.08); color:#0FF; font-size:12px;">

      <strong>PulseBrowser-Storage (RAM)</strong><br><br>

      <div style="display:flex; gap:10px;">

        <div style="flex:1;">
          <strong>Companion:</strong><br>
          • <span style="color:lightgreen">${swKB} KB</span><br>

          <strong>Local Storage:</strong><br>
          • <span style="color:lightgreen">${totalMB} MB</span><br>
        </div>

        <div style="flex:1;">
          <strong>Sync Storage:</strong><br>
          • <span style="color:lightgreen">${syncDisplay}</span><br>

          <strong>System Quota:</strong><br>
          • <span style="color:lightgreen">${quotaGB} GB</span><br><br>
        </div>

      </div>

      <strong>Percent Used:</strong>
      <span style="color:${percentColor}; font-weight:bold;">
        ${percent}% (${statusText})
      </span><br>

      <strong>Projected Fill Time:</strong>
      <span style="color:${percentColor}; font-weight:bold;">
        ${predictionText}
      </span><br>

    </div>
  `;
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

// ============================================================================
//  SECTION 5 — SETTINGS PAGE INITIALIZER
// ============================================================================

if (location.href.includes("PBSettings.html")) {
  (async () => {
    PB_LOG.info("Initializing Settings Page");

    await loadExtensionSettingsUI();
    await pbRenderCacheList();

    const idsToWatch = [
      "emailMode",
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
    
    saveExtensionSettingsUI();

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

const backBtn = document.getElementById("btn-back");

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