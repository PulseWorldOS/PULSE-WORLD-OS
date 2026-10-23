
let userInteracted = false;
let engineType = "text";
let searchEngineActiveLink = null;
let socialMode = "Internal";
let socialMediaActiveLink = null;
let workMode = "Internal";
let workActiveLink = null;
let searchMode = "Internal";
let searchEngineActivated = "*Google.com";
let temporaryLinks = [];
let engineURL = buildSearchURL("google.com");
let url = engineURL;
let PulseRealm = {};
let PulseModuleCount = 0;
let PulseTempModuleCount = 0;
let PulseRealmSettings = null;
let PulseBrowserSettings = null;
let PulseSnapshotView = null;
let PulseURL = null;
let lastActiveEntries = null;
let nowFP = Date.now(); // numeric timestamp
const toppanel = document.getElementById("top-panel left-panel");
const timerBtn = document.getElementById("timerBtn");

const PB_LOG3 = {
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

// Load saved PulseTabs from extension storage at startup
let pulseTabs = {};

// Persistent favicon cache stored in chrome.storage.local
// Local in-memory mirror for speed
let PBFAVICON_CACHE = {};

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

async function pbRequestCacheList2() {
  PB_LOG3.info("Requesting cache list from PBCompanion…");

  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: "GET_CACHE_LIST" }, (response) => {
      if (!response || !response.ok) {
        PB_LOG3.info("Cache list unavailable or error", response);
        resolve(null);
        return;
      }
      
      PB_LOG3.load("Cache list received", response.caches);
      resolve(response);   // ⭐ Return the WHOLE object
    });
  });
}

let predictionText = "Running Stable";
let statsHTMLShell = null;

async function pbRenderCacheList2() {
  const listEl = document.getElementById("cache-panel");
  if (!listEl) return;
  // ⭐ Fetch cache list
  const result = await pbRequestCacheList2();
  
  if (!result || !result.caches) {
    listEl.insertAdjacentHTML("beforeend", "<li>Cache API unavailable in extension pages.</li>");
    return;
  }
  
  const caches = result.caches;
  if (lastActiveEntries && lastActiveEntries === caches.entries) return;

  // ⭐ Wipe panel completely
  listEl.innerHTML = `
    <div style="font-weight:bold; text-align: center; color: #0FF; font-size:13px; margin-top: 6px; margin-bottom:6px;">
      PulseBrowser OS - User Memory
    </div>
  `;

  // // ⭐ Title
  // listEl.insertAdjacentHTML("beforeend", `
  //   <div style="font-weight:bold; text-align: center; color: #0FF; font-size:13px; margin-top: 6px; margin-bottom:6px;">
  //     PulseBrowser OS - User Memory
  //   </div>
  // `);

  // ⭐ Memory FIRST
  // ⭐ Load previous storage history
  const history = await new Promise(resolve =>
    chrome.storage.local.get("pulseStorageHistory", resolve)
  );
  console.log(history);
  const statsHTML = await pbRenderStorageStats(history);
  predictionText = predictionText + ".";
  if (statsHTML !== statsHTMLShell) listEl.insertAdjacentHTML("beforeend", statsHTML);
  statsHTMLShell = statsHTML;
  if (caches.length === 0) {
    listEl.insertAdjacentHTML("beforeend", "<li>No cached files detected.</li>");
    return;
  }

  // ⭐ Sort: current cache first, then by entry count
  caches.sort((a, b) => {
    if (a.name === a.currentCache) return -1;
    if (b.name === a.currentCache) return 1;
    return (b.entries || 0) - (a.entries || 0);
  });

  let best = false;

  caches.forEach(cache => {
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
    const sizeMB = parseFloat(cache.sizeMB || "0");
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
  
    lastActiveEntries = cache.entries ?? 0;

    li.innerHTML = `
      <font color="${best ? "#FF8844" : "gold"}"><strong>${cache.name} (CPU)</strong></font><br><br>

      Entries: <font color="#0FF">${cache.entries}</font><br>
      Size: <font color="${sizeColor}">${cache.sizeMB} MB</font><br>

      Weight: <font color="#0FF">${weightClass}</font><br>
      Personality: <font color="#0FF">${personality}</font><br>
      Density: <font color="#0FF">${density.toFixed(2)} Entries/MB (${KBperEntry} KB)</font><br>

      PulseRank: <font color="gold">${pulseRank}</font><br>
      First: <font color="lightgreen">${cache.firstEntry || "none"}</font><br>
      Last: <font color="lightgreen">${cache.lastEntry?.slice(0, 100) || "none"}</font>
    `;

    if (cache.lastEntry) {
      let entry = cache.lastEntry;

      li.style.cursor = "pointer";
      li.onclick = () => {
        openNamedTab(location.hostname, entry);
      };
    }


    listEl.appendChild(li);
    best = true;
  });

  PB_LOG3.info("Cache list rendered", caches);
}
// function writeBigBlob() {
//   return new Promise((resolve, reject) => {
//     const req = indexedDB.open("PulseWorldTestDB", 2);

//     req.onupgradeneeded = () => {
//       const db = req.result;
//       if (!db.objectStoreNames.contains("store")) {
//         db.createObjectStore("store");
//       }
//     };

//     req.onsuccess = () => {
//       const db = req.result;
//       const tx = db.transaction("store", "readwrite");
//       const store = tx.objectStore("store");

//       const bigBlob = new Blob([new Array(10_000_000).fill("x").join("")]);

//       const putReq = store.put(bigBlob, "bigblob");

//       putReq.onsuccess = () => resolve(true);
//       putReq.onerror = () => reject(putReq.error);
//     };

//     req.onerror = () => reject(req.error);
//   });
// }


async function pbRenderStorageStats(history) {
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

  // ⭐ SYNC STORAGE (chrome.storage.sync)
  const syncItems = await new Promise(resolve =>
    chrome.storage.sync.get(null, resolve)
  );
  const syncBytes = new Blob([JSON.stringify(syncItems)]).size;

  // ⭐ Combined totals
  const totalUsed = localUsed + syncBytes;
  const percent = ((totalUsed / localQuota) * 100).toFixed(2);

  // ⭐ Conversions
  const localMB = (localUsed / (1024 * 1024)).toFixed(2);
  const syncMB = (syncBytes / (1024 * 1024)).toFixed(2);
  const totalMB = (totalUsed / (1024 * 1024)).toFixed(2);
  const quotaGB = (localQuota / (1024 * 1024 * 1024)).toFixed(2);

  // ⭐ Dynamic color zones
  let percentColor = "lightgreen";
  if (percent >= 40) percentColor = "gold";
  if (percent >= 70) percentColor = "orange";
  if (percent >= 90) percentColor = "red";

  // ⭐ Status text
  let statusText = "Safe";
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
          predictionText = `~${(secondsUntilFull / 86400).toFixed(1)} days`;
        } else if (secondsUntilFull > 3600) {
          predictionText = `~${(secondsUntilFull / 3600).toFixed(1)} hours`;
        } else {
          predictionText = `~${secondsUntilFull.toFixed(0)} seconds`;
        }
      }
    }
  }

  // ⭐ Save new history snapshot
  chrome.storage.local.set({
    pulseStorageHistory: {
      lastCheck: Date.now(),
      lastUsed: totalUsed
    }
  });

  if (!predictionText.includes("Running")) percentColor = "#FF8844";
  if (predictionText.includes("....")) predictionText = predictionText.replace("...", "");

  // ⭐ Render UI
  return `
    <div style="margin: 14px 20px; padding:8px; border-radius:8px;
                background:rgba(0,255,255,0.08); color:#0FF; font-size:12px;">

      <strong><font color="#FF8844">PulseBrowser-Storage (RAM)</font></strong><br><br>

      <div style="display:flex; gap:10px;">

        <div style="flex:1;">
          <strong>Local Storage:</strong><br>
          • <span style="color:lightgreen">${localMB} MB</span><br>

          <strong>Total Used:</strong><br>
          • <span style="color:lightgreen">${totalMB} MB</span><br>
        </div>

        <div style="flex:1;">
          <strong>Sync Storage:</strong><br>
          • <span style="color:lightgreen">${syncDisplay}</span><br>

          <strong>Quota:</strong><br>
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

        // ⭐ Normal tab → assign bubble
        latestSnapshot(identity, urlObj, snapIndex);

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

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  let originalTabId = tabs[0].id;
  chrome.storage.local.set({ originalTabId });
  pulseRehydrateTabs();
});

const pbPulseScreen = document.getElementById("pbPulseScreen");
const pbWrapper = document.getElementById("pbWrapper");
// ---------------------------------------------------------------------------
// 1. KERNEL HANDSHAKE
// ---------------------------------------------------------------------------
chrome.runtime.sendMessage({ type: "PULSE_OS_PING", time: nowFP }, (response) => {
  if (chrome.runtime.lastError) return;
});

function getPrimaryVideo() {
  const videos = [...document.querySelectorAll("video")];

  // Filter to only videos that are actually loaded/playing
  const candidates = videos.filter(v =>
    v.videoWidth > 0 &&
    v.videoHeight > 0 &&
    v.readyState >= 2
  );

  // If no real videos, fallback to first <video>
  if (candidates.length === 0) {
    return videos[0] || null;
  }

  // If exactly one real video → use it
  if (candidates.length === 1) {
    return candidates[0];
  }

  // If multiple real videos → use the second one
  if (candidates.length >= 2) {
    return candidates[candidates.length - 2];
  }

  return null;
}


function AttemptPulseSteam(videoElement) {
  try {
    if (videoElement) {
      videoElement.requestPictureInPicture()
        .catch(err => {
          console.warn("PIP Error:", err);
          injectPulseScreenFromMemory();
        });
      return;
    }

    injectPulseScreenFromMemory();

  } catch (e) {
    console.warn("PulseStream Error:", e);
    injectPulseScreenFromMemory();
  }
}


// ============================================================================
// 14. PBContentGPUWarm++ — Additional GPU warm triggers
// ============================================================================
function loadLastSavedVideo(callback) {
  chrome.storage.local.get(["pipMemory"], data => {
    const list = data.pipMemory || [];
    if (!list.length) return callback(null);

    const last = list[list.length - 1];
    callback(last);
  });
}

function getCharacterInterval() {
  const base = 5200;
  return base;
}

function injectPulseScreenFromMemory(play) {
  loadLastSavedVideo(entry => {
    if (!entry) return;
    if (!entry.source) return;
    
    pbPulseScreen.width = entry.width;
    pbPulseScreen.height = entry.height;
    pbWrapper.width = pbPulseScreen.width;
    pbWrapper.height = pbPulseScreen.height;
    if (pbPulseScreen.src !== entry.source) {
      pbPulseScreen.src = entry.source;
      pbPulseScreen.currentTime = entry.currentTime || 0;
    }
    const interval3 = getCharacterInterval();
    if (!play) {
      setTimeout(() => {
        pbPulseScreen.currentTime = 0;
        pbPulseScreen.play = false;
      }, interval3);
    } else {
      pbPulseScreen.src = entry.source;
      pbPulseScreen.currentTime = 0;
      pbPulseScreen.play = true;
    }
  });
}

async function gpuWarmExtra() {
  const elements = document.querySelectorAll("canvas, video");
  let gpuEnabled = "GPU Driver Error";
  
  // Warm WebGL + WebGL2 + Canvas2D + Video
  elements.forEach(el => {
    try {
      const gl = el.getContext?.("webgl") || el.getContext?.("webgl2");
      if (gl) gpuEnabled = "WebGL";
    } catch (_) {}

    try { el.getContext?.("2d"); } catch (_) {}
    try { el.play?.().catch(() => {}); } catch (_) {}
  });

  // Warm WebGPU (if available)
  try {
    if (navigator.gpu) {
      const adapter = await navigator.gpu.requestAdapter();
      if (adapter) {
        const device = await adapter.requestDevice();
        if (device) {
          gpuEnabled = "WebGPU";
          const queue = device.queue;
          const buffer = device.createBuffer({
            size: 4,
            usage: GPUBufferUsage.COPY_DST
          });
          queue.writeBuffer(buffer, 0, new Uint8Array([1, 2, 3, 4]));
        }
      }
    }
  } catch (_) {
    // WebGPU failed — leave gpuEnabled as-is
  }

  console.log("GPU Warmed!");
  if (gpuEnabled === "GPU Driver Error") {
    pbPulseScreen.src = "PulseWorldOS-Older.mp4";
  }
  chrome.runtime.sendMessage({ type: "PBCONTENT_GPUWARM_EXTRA", gpuEnabled });
}

setTimeout(gpuWarmExtra, 100);
setTimeout(pulseRehydrateTabs, 250);

// ============================================================================
// 15. PBContentDecodeWarm++ — Aggressive decode warm
// ============================================================================

function collectAndWarmAssetsFront() {
  const assets = [];

  // -------------------------------------------------------
  // 1. Scripts
  // -------------------------------------------------------
  document.querySelectorAll("script[src]").forEach(el => {
    assets.push(el.src);
  });

  // -------------------------------------------------------
  // 2. Stylesheets
  // -------------------------------------------------------
  document.querySelectorAll("link[rel='stylesheet'][href]").forEach(el => {
    assets.push(el.href);
  });

  // -------------------------------------------------------
  // 3. HTML Images
  // -------------------------------------------------------
  const htmlImgs = [...document.querySelectorAll("img[src]")];
  htmlImgs.forEach(el => assets.push(el.src));

  // -------------------------------------------------------
  // 4. CSS Background Images
  // -------------------------------------------------------
  const bgImgs = [...document.querySelectorAll("*")]
    .map(el => getComputedStyle(el).backgroundImage)
    .filter(bg => bg && bg !== "none")
    .map(bg => {
      const match = bg.match(/url\(["']?(.*?)["']?\)/);
      return match ? match[1] : null;
    })
    .filter(Boolean);

  bgImgs.forEach(src => assets.push(src));

  // -------------------------------------------------------
  // 5. Decode Warm (HTML + CSS synthetic)
  // -------------------------------------------------------
  const syntheticImgs = bgImgs.map(src => {
    const img = new Image();
    img.src = src;
    return img;
  });

  const allImgs = [...htmlImgs, ...syntheticImgs];
  const decodeCount = allImgs.length;

  allImgs.forEach(img => {
    try { img.decode?.().catch(() => {}); } catch (_) {}
  });

  chrome.runtime.sendMessage({
    type: "PBACC_DECODEWARM",
    count: decodeCount
  });
}

setTimeout(collectAndWarmAssetsFront, 600);

function savePulseTabs() {
  chrome.storage.local.set({ pulseTabs });
}

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

function openNamedTab(name, url) {
  const identity = normalizeIdentity(url);
  const instanceIndex = getNextInstanceIndex(identity);
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

      PulseURL = url;
      PulseSnapshotView = new URL(url).hostname;

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

            PulseURL = url;
            PulseSnapshotView = new URL(url).hostname;

            pulseRehydrateTabs();
            return;
          }

          pulseTabs[identity] = { id: updated.id, realm: identity, snapshot: instanceIndex };
          savePulseTabs();
        });

        PulseURL = url;
        PulseSnapshotView = new URL(url).hostname;

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

    PulseURL = url;
    PulseSnapshotView = new URL(url).hostname;

    pulseRehydrateTabs();
    return;
  }

  // ⭐ No existing tab → create new
  chrome.tabs.create({ url }, tab => {
    pulseTabs[identity] = { id: tab.id, realm: identity, snapshot: instanceIndex };
    savePulseTabs();
  });

  PulseURL = url;
  PulseSnapshotView = new URL(url).hostname;
  
  pulseRehydrateTabs();
}

function latestSnapshot(realm, link, snapIndex) {
  const snapshotKey = `pulse_snapshot_${realm}`;

  chrome.storage.local.get(snapshotKey, (items) => {
    const snap = items[snapshotKey];
    if (snap) renderSnapshot(snap, snapIndex, realm, link);
  });
}

async function renderSnapshot(snapshot, snapIndex, realm, link) {
  const bubbleId = `PulseBrowser-OS-Snapshot${snapIndex}`;
  let div = document.getElementById(bubbleId);
  let topPanel = document.querySelector(".top-panel");

  // Build the correct bubble ID and class
  if (snapshot) {
    if (!div) {
      div = document.createElement("div");
      div.id = bubbleId;
      div.className = bubbleId;
      // ---------------------------------------------
      // ⭐ Inject ONLY the favicon (big, centered)
      // ---------------------------------------------
      div.innerHTML = `
        <div class="Snapshot-Viewport">
          <img class="Snapshot-Favicon"
              src="${snapshot.favicon}"
              alt="favicon"
              onerror="this.src='${snapshot.regfavicon}'"
        </div>
      `;
      document.body.appendChild(div);
    }

    // Chamber awakens
    toppanel.style.backdropFilter = "blur(8px)";
    toppanel.style.backgroundImage = "none";

  } else {
    topPanel.classList.add('electrify');
    pulseRehydrateTabs();
    // Now check if any bubbles remain
    const remaining = document.querySelectorAll('[class^="PulseBrowser-OS-Snapshot"]').length;
    if (remaining === 0) {
      toppanel.style.backdropFilter = "blur(24px)";
      toppanel.style.backgroundImage = "url(PulseOSTabs.png)";
    } else {
      // ⭐ There are still bubbles
      console.log(`There are ${remaining} bubbles left.`);
    }

    setTimeout(() => {
      topPanel.classList.remove('electrify');
    }, 1500);
  }

  if (div) {
    // ⭐ Replace any existing listener instead of stacking new ones
    div.onclick = () => {
      pbPreconnect([link]);
      openNamedTab(realm, link);
    };
  }
}

// Re-render after everything
setInterval(async () => {
  await pbRenderCacheList2();
}, 8000);


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

      if (PulseSnapshotView === realm) {
        PulseSnapshotView = null;
        PulseURL = null;
      }

      renderSnapshot(null, removedSnapshotIndex, realm);

      delete pulseTabs[identity];
      break;
    }
  }
  pulseRehydrateTabs();
  // injectPulseScreenFromMemory();
  // location.reload();
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
      || origin.includes("peace-smoke-shop")
      || origin.includes("fordfamilymanagement");
}

// ============================================================================
//  PBUniversalBoost.js — Global SW-like acceleration (publish directory warm)
// ============================================================================

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

    const paths = [
      "/", "/index.html", "/home", "/about", "/contact", "/manifest.json"
    ];
    const assets = [
      "/main.js", "/bundle.js", "/app.js", "/styles.css", "/app.css"
    ];

    const urls = []
      .concat(paths.map((p) => origin + p))
      .concat(assets.map((p) => origin + p));

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    for (const url of urls) {
      // ⭐ If THIS SPECIFIC URL failed twice → skip forever
      if (fails[url] >= 2) continue;

      try {
        const res = await fetch(url, { cache: "force-cache" }).catch(() => null);

        if (res && res.status === 404) {
          fails[url] = (fails[url] || 0) + 1;

          if (fails[url] >= 2) {
            await chrome.storage.local.set({ pb_fail_cache: fails });
          }
        } else {
          warmedCount++;
        }
      } catch (_) {}

      // ⭐ Add delay between warm-fetches
      await sleep(200);   // ← 150–200ms recommended
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

// ---------------------------------------------------------------------------
// PRECONNECT (DNS/TLS/TCP warm-path)
// ---------------------------------------------------------------------------
function pbPreconnect(origins = []) {
  origins.forEach((origin) => {
    pbDNSWarm(origin);
    pbTLSWarm(origin);
  });
  console.log("%c[PBAccelerator] Preconnect:", "color:#00C8FF;", origins);
}

function pbDNSWarm(origin) {
  try {
    const link = document.createElement("link");
    link.rel = "dns-prefetch";
    link.href = origin;
    document.head.appendChild(link);

    console.log("%c[PBAccelerator] DNS Warm:", "color:#00C8FF;", origin);
  } catch (_) {}
}

// ---------------------------------------------------------------------------
// TLS WARM (establish TLS early)
// ---------------------------------------------------------------------------
function pbTLSWarm(origin) {
  try {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = origin;
    document.head.appendChild(link);

    console.log("%c[PBAccelerator] TLS Warm:", "color:#00C8FF;", origin);
  } catch (_) {}
}


async function pbModuleWarmBoot() {
  const settings = await pbLoadExtensionSettings();
  PulseRealmSettings = settings;
  PulseBrowserSettings = await getSettings();
  const warmTargets = [
    "https://www.pulseworld.net",
    "https://www.pulseworld.me",
    "https://www.pulseworld.money",
    "https://www.pulseworld.biz",
    "https://www.binaryos.net",
    "https://www.booleanlogic.net",
    "https://www.gpuprocessing.net",
    "https://www.serviceworker.net",
    "https://www.orbitalmap.net",
    PulseRealmSettings.externalBankLink,
    PulseRealmSettings.externalEmailLink,
    PulseRealmSettings.externalSocialLink,
    PulseRealmSettings.externalWorkLink,
    PulseRealmSettings.externalStreamingLink,
    PulseRealmSettings.externalShoppingLink,
    PulseRealmSettings.externalSearchLink,
    PulseRealmSettings.acceleratedModule1Link,
    PulseRealmSettings.acceleratedModule2Link,
    PulseRealmSettings.acceleratedModule3Link,
    PulseRealmSettings.acceleratedModule4Link,
    PulseRealmSettings.acceleratedModule5Link,
    PulseRealmSettings.acceleratedModule6Link,
    "https://www.google.com"
  ].filter(u => u && u.startsWith("http"));

  if (warmTargets.length === 0) return;

  // Preconnect all module targets
  pbPreconnect(warmTargets);

  chrome.runtime.sendMessage({
    type: "FIRSTPRE_WARMPATH_EVENT",
    origins: warmTargets
  });

  setTimeout(() => {
    chrome.runtime.sendMessage({
      type: "FIRSTPOST_WARMPATH_EVENT",
      origins: warmTargets
    });
  }, 3000);

  console.log(
    "%c[PBAccelerator] Module Warm-Boot executed",
    "color:#00C8FF; font-weight:bold;"
  );
  await pbRenderCacheList2();
}

const EXTENSION_SETTINGS_KEY = "pulseworldSettings";

async function pbLoadExtensionSettings() {
  try {
    const result = await chrome.storage.local.get([EXTENSION_SETTINGS_KEY]);
    const settings = result[EXTENSION_SETTINGS_KEY] || {};

    PB_LOG3.load("pbLoadExtensionSettings()", settings);

    return settings;
  } catch (err) {
    console.error("pbLoadExtensionSettings() FAILED", err);
    return {};
  }
}

let keyIsDown = false;
let keyHoldTimer = null;
let keyHold2Timer = null;

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
      
      resolve(S);
    });
  });
}

async function updateModuleIcons(settings, browser) {
  if (!settings) settings = await pbLoadExtensionSettings();
  PulseRealmSettings = settings;
  if (!browser) browser = await getSettings();
  PulseBrowserSettings = browser;

  searchEngineActiveLink = settings.externalSearchLink;
  searchMode = settings.searchMode;
  socialMediaActiveLink = settings.externalSocialLink;
  socialMode = settings.socialMode;
  workActiveLink = settings.externalWorkLink;
  workMode = settings.workMode;
  

  if (settings.searchMode === "internal") {
    engineURL = "https://www.google.com/search?q=";
    searchEngineActivated = "Google.com";
    document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
  } else {
    engineURL = buildSearchURL(settings.externalSearchLink);
  }

  const PulseWorldIcon = document.getElementById("PulseWorldIcon");
  const PulseWorldFav = await getFavicon("https://www.pulseworld.net");
  if (PulseWorldFav) {
    PulseWorldIcon.innerText = "";
    PulseWorldIcon.style.backgroundImage = `url(${PulseWorldFav})`;
    PulseWorldIcon.style.backgroundSize = "contain";
    PulseWorldIcon.style.backgroundRepeat = "no-repeat";
  }
  const PulseBusinessIcon = document.getElementById("PulseBusinessIcon");
  const PulseBusinessFav = await getFavicon("https://www.pulseworld.biz");
  if (PulseBusinessFav) {
    PulseBusinessIcon.innerText = "";
    PulseBusinessIcon.style.backgroundImage = `url(${PulseBusinessFav})`;
    PulseBusinessIcon.style.backgroundSize = "contain";
    PulseBusinessIcon.style.backgroundRepeat = "no-repeat";
  }
  const PulseIdentityIcon = document.getElementById("PulseIdentityIcon");
  const PulseIdentityFav = await getFavicon("https://www.pulseworld.me");
  if (PulseIdentityFav) {
    PulseIdentityIcon.innerText = "";
    PulseIdentityIcon.style.backgroundImage = `url(${PulseIdentityFav})`;
    PulseIdentityIcon.style.backgroundSize = "contain";
    PulseIdentityIcon.style.backgroundRepeat = "no-repeat";
  }
  
  // EMAIL MODULE
  const emailIcon = document.getElementById("moduleEmailIcon");
  if (settings.emailMode === "internal") {
    emailIcon.innerText = "📧";      // your original emoji
    emailIcon.style.backgroundImage = "";
  } else {
    const fav = await getFavicon(settings.externalEmailLink);
    if (fav) {
      emailIcon.innerText = "⚡";
      emailIcon.style.backgroundImage = `url(${fav})`;
      emailIcon.style.backgroundSize = "contain";
      emailIcon.style.backgroundRepeat = "no-repeat";
    }
  }
  
  // BANK MODULE
  const bankIcon = document.getElementById("moduleBankIcon");
  if (settings.bankMode === "internal") {
    bankIcon.innerText = "🏦";      // your original emoji
    bankIcon.style.backgroundImage = "";
  } else {
    const fav = await getFavicon(settings.externalBankLink);
    if (fav) {
      bankIcon.innerText = "⚡";
      bankIcon.style.backgroundImage = `url(${fav})`;
      bankIcon.style.backgroundSize = "contain";
      bankIcon.style.backgroundRepeat = "no-repeat";
    }
  }

  // SOCIAL MODULE
  const socialIcon = document.getElementById("moduleSocialIcon");
  if (settings.socialMode === "internal") {
    socialIcon.innerText = "🎭";      // your original emoji
    socialIcon.style.backgroundImage = "";
  } else {
    const fav = await getFavicon(settings.externalSocialLink);
    if (fav) {
      socialIcon.innerText = "⚡";
      socialIcon.style.backgroundImage = `url(${fav})`;
      socialIcon.style.backgroundSize = "contain";
      socialIcon.style.backgroundRepeat = "no-repeat";
    }
  }

  // WORK MODULE
  const workIcon = document.getElementById("moduleWorkIcon");
  if (settings.workMode === "internal") {
    workIcon.innerText = "💼";      // your original emoji
    workIcon.style.backgroundImage = "";
  } else {
    const fav = await getFavicon(settings.externalWorkLink);
    if (fav) {
      workIcon.innerText = "⚡";
      workIcon.style.backgroundImage = `url(${fav})`;
      workIcon.style.backgroundSize = "contain";
      workIcon.style.backgroundRepeat = "no-repeat";
    }
  }

  // WORK MODULE
  const streamIcon = document.getElementById("moduleStreamIcon");
  if (settings.streamMode === "internal") {
    streamIcon.innerText = "📺";      // your original emoji
    streamIcon.style.backgroundImage = "";
  } else {
    const fav = await getFavicon(settings.externalStreamingLink);
    if (fav) {
      streamIcon.innerText = "⚡";
      streamIcon.style.backgroundImage = `url(${fav})`;
      streamIcon.style.backgroundSize = "contain";
      streamIcon.style.backgroundRepeat = "no-repeat";
    }
  }

  // WORK MODULE
  const shoppingIcon = document.getElementById("moduleShoppingIcon");
  if (settings.shoppingMode === "internal") {
    shoppingIcon.innerText = "💳";      // your original emoji
    shoppingIcon.style.backgroundImage = "";
  } else {
    const fav = await getFavicon(settings.externalShoppingLink);
    if (fav) {
      shoppingIcon.innerText = "⚡";
      shoppingIcon.style.backgroundImage = `url(${fav})`;
      shoppingIcon.style.backgroundSize = "contain";
      shoppingIcon.style.backgroundRepeat = "no-repeat";
    }
  }

  if (settings.acceleratedModule1Link) {
    const moduleFav1Link = document.getElementById("moduleFav1Link");
    const moduleFav1Icon = document.getElementById("moduleFav1Icon");
    const fav1 = await getFavicon(settings.acceleratedModule1Link);
    if (fav1) {
      moduleFav1Link.innerText = getReadableName(settings.acceleratedModule1Link) + " ";
      moduleFav1Icon.innerText = "⚡";
      moduleFav1Icon.style.backgroundImage = `url(${fav1})`;
      moduleFav1Icon.style.backgroundSize = "contain";
      moduleFav1Icon.style.backgroundRepeat = "no-repeat";
    }
  }


  if (settings.acceleratedModule2Link) {
    const moduleFav2Link = document.getElementById("moduleFav2Link");
    const moduleFav2Icon = document.getElementById("moduleFav2Icon");
    const fav2 = await getFavicon(settings.acceleratedModule2Link);
    if (fav2) {
      moduleFav2Link.innerText = getReadableName(settings.acceleratedModule2Link) + " ";
      moduleFav2Icon.innerText = "⚡";
      moduleFav2Icon.style.backgroundImage = `url(${fav2})`;
      moduleFav2Icon.style.backgroundSize = "contain";
      moduleFav2Icon.style.backgroundRepeat = "no-repeat";
    }
  }


  if (settings.acceleratedModule3Link) {
    const moduleFav3Link = document.getElementById("moduleFav3Link");
    const moduleFav3Icon = document.getElementById("moduleFav3Icon");
    const fav3 = await getFavicon(settings.acceleratedModule3Link);
    if (fav3) {
      moduleFav3Link.innerText = getReadableName(settings.acceleratedModule3Link) + " ";
      moduleFav3Icon.innerText = "⚡";
      moduleFav3Icon.style.backgroundImage = `url(${fav3})`;
      moduleFav3Icon.style.backgroundSize = "contain";
      moduleFav3Icon.style.backgroundRepeat = "no-repeat";
    }
  }


  if (settings.acceleratedModule4Link) {
    const moduleFav4Link = document.getElementById("moduleFav4Link");
    const moduleFav4Icon = document.getElementById("moduleFav4Icon");
    const fav4 = await getFavicon(settings.acceleratedModule4Link);
    if (fav4) {
      moduleFav4Link.innerText = getReadableName(settings.acceleratedModule4Link) + " ";
      moduleFav4Icon.innerText = "⚡";
      moduleFav4Icon.style.backgroundImage = `url(${fav4})`;
      moduleFav4Icon.style.backgroundSize = "contain";
      moduleFav4Icon.style.backgroundRepeat = "no-repeat";
    }
  }

  if (settings.acceleratedModule5Link) {
    const moduleFav5Link = document.getElementById("moduleFav5Link");
    const moduleFav5Icon = document.getElementById("moduleFav5Icon");
    const fav5 = await getFavicon(settings.acceleratedModule5Link);
    if (fav5) {
      moduleFav5Link.innerText = getReadableName(settings.acceleratedModule5Link) + " ";
      moduleFav5Icon.innerText = "⚡";
      moduleFav5Icon.style.backgroundImage = `url(${fav5})`;
      moduleFav5Icon.style.backgroundSize = "contain";
      moduleFav5Icon.style.backgroundRepeat = "no-repeat";
    }
  }

  if (settings.acceleratedModule6Link) {
    const moduleFav6Link = document.getElementById("moduleFav6Link");
    const moduleFav6Icon = document.getElementById("moduleFav6Icon");
    const fav6 = await getFavicon(settings.acceleratedModule6Link);
    if (fav6) {
      moduleFav6Link.innerText = getReadableName(settings.acceleratedModule6Link) + " ";
      moduleFav6Icon.innerText = "⚡";
      moduleFav6Icon.style.backgroundImage = `url(${fav6})`;
      moduleFav6Icon.style.backgroundSize = "contain";
      moduleFav6Icon.style.backgroundRepeat = "no-repeat";
    }
  }
}

async function setTheStage() {
  PulseRealmSettings = await pbLoadExtensionSettings();
  PulseBrowserSettings = await getSettings();
  const PB_HOMES = [
    "https://www.pulseworld.me",
    "https://www.pulseworld.money",
    "https://www.pulseworld.biz",
    "https://www.binaryos.net",
    "https://www.booleanlogic.net",
    "https://www.gpuprocessing.net",
    "https://www.serviceworker.net",
    "https://www.orbitalmap.net",
    "https://www.pulseworld.net",
    "https://www.google.com",
    PulseRealmSettings.externalSearchLink
  ].filter(u => u && u.startsWith("http"));

  const Links = [
    PulseRealmSettings.externalBankLink,
    PulseRealmSettings.externalEmailLink,
    PulseRealmSettings.externalSocialLink,
    PulseRealmSettings.externalWorkLink,
    PulseRealmSettings.externalStreamingLink,
    PulseRealmSettings.externalShoppingLink,
    PulseRealmSettings.acceleratedModule1Link,
    PulseRealmSettings.acceleratedModule2Link,
    PulseRealmSettings.acceleratedModule3Link,
    PulseRealmSettings.acceleratedModule4Link,
    PulseRealmSettings.acceleratedModule5Link,
    PulseRealmSettings.acceleratedModule6Link
  ].filter(u => u && u.startsWith("http"));

  const interval = getWarmInterval(Links, PB_HOMES, temporaryLinks);
  
  setInterval(pbRefreshWarmDocument, interval);  

  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    const moduleKeys = ["`","b","m","s","w","t","e"];
    if (e.repeat) { 
      e.preventDefault();
      // ⭐ If NOT a module key → send key to search box
      if (moduleKeys.includes(key)) {
        keyHold2Timer = setTimeout(() => {
          const searchArea = document.getElementById("searchengineTextbox");
          searchArea.focus();
          searchArea.textContent = "";
        }, 1000);
      }
      return;
    }
    // if (e.target.closest("#search-area")) return;
    keyIsDown = true;
    // SHORT PRESS → CONSOLE KEY (fires immediately)
    pulseConsoleKey(e);
    
    // ⭐ If NOT a module key → send key to search box
    if (moduleKeys.includes(key)) {
      // Start long-press timer
      keyHoldTimer = setTimeout(() => {
        if (keyIsDown) {
          const searchArea = document.getElementById("searchengineTextbox");
          searchArea.focus();
          searchArea.textContent = "";
          pulseTeleportKey(e);
        }
      }, 1500);
    }

  });

  document.addEventListener("keyup", () => {
    keyIsDown = false;
    // ONLY cancel timer — NO logic, NO actions
    if (keyHoldTimer) {
      clearTimeout(keyHoldTimer);
      keyHoldTimer = null;
    }
    if (keyHold2Timer) {
      clearTimeout(keyHold2Timer);
      keyHold2Timer = null;
    }
  });

  updateModuleIcons(PulseRealmSettings, PulseBrowserSettings);
}

setTimeout(setTheStage, 150);

setTimeout(pbModuleWarmBoot, 150);

async function pulseConsoleKey(event) {
  const key = event.key.toLowerCase();
  const searchArea = document.getElementById("searchengineTextbox");
  searchArea.focus();
  searchArea.value += key;
}

async function pulseTeleportKey(event) {
  const key = event.key.toLowerCase();
  
  // ⭐ Otherwise: module teleport logic
  let link = "https://www.pulseworld.net";

  if (key === "`") {
    link = "https://www.pulseworld.net";
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

function cleanQuery(query) {
  if (!query) return "";
  return query.replace(/undefined/g, "").trim();
}

function buildSearchURL(engineURL, query) {
  if (query) query = cleanQuery(query);     // ← THIS removes the symbol
  let q = encodeURIComponent(query);

  // Remove ONLY leading "undefined"
  q = q.replace(/^undefined/, "");

  if (!engineURL) engineURL = "https://www.google.com/search?q=";
  // Normalize URL
  const url = engineURL.toLowerCase();

  // GOOGLE
  if (url.includes("google")) {
    searchEngineActivated = "Google.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://www.google.com/search?q=${q}`;
  }

  // YAHOO
  if (url.includes("yahoo")) {
    searchEngineActivated = "Yahoo.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://search.yahoo.com/search?p=${q}`;
  }

  // DUCKDUCKGO
  if (url.includes("duckduckgo") || url.includes("ddg")) {
    searchEngineActivated = "DuckDuckGo.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://duckduckgo.com/?q=${q}`;
  }

  // BING
  if (url.includes("bing")) {
    searchEngineActivated = "Bing.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://www.bing.com/search?q=${q}`;
  }

  // BRAVE
  if (url.includes("brave")) {
    searchEngineActivated = "Brave.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://search.brave.com/search?q=${q}`;
  }

  // BAIDU (China)
  if (url.includes("baidu")) {
    searchEngineActivated = "Baidu.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://www.baidu.com/s?wd=${q}`;
  }

  // NAVER (Korea)
  if (url.includes("naver")) {
    searchEngineActivated = "Naver.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://search.naver.com/search.naver?query=${q}`;
  }

  // YANDEX (Russia)
  if (url.includes("yandex")) {
    searchEngineActivated = "Yandex.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://yandex.com/search/?text=${q}`;
  }

  // ASK
  if (url.includes("ask")) {
    searchEngineActivated = "Ask.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://www.ask.com/web?q=${q}`;
  }

  // ECOSIA
  if (url.includes("ecosia")) {
    searchEngineActivated = "Ecosia.org";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://www.ecosia.org/search?q=${q}`;
  }

  // QWANT
  if (url.includes("qwant")) {
    searchEngineActivated = "Qwant.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://www.qwant.com/?q=${q}`;
  }

  // Fallback: append query to custom engine
  searchEngineActivated = "*Google.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
  return `https://www.google.com/search?q=${q}`;
}


document.getElementById("searchus").addEventListener("click", (event) => {
  window.location.href = engineURL + encodeURIComponent("pulseworld.net");
});

document.getElementById("navigate").addEventListener("click", () => {
  let text = document.getElementById("searchengineTextbox").textContent.trim();

  // If ANY space exists → not navigation
  if (text.includes(" ")) {
    return; // do nothing
  }

  // Domain or domain + path
  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;

  const isDomainIntent = domainRegex.test(text);

  if (isDomainIntent) {
    const originlink = "https://" + text;
    const origin = new URL(originlink).origin;
    
    if (!temporaryLinks.includes(origin)) {
      temporaryLinks.push(origin);
    }


    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: origin
    });

    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(origin, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}

    openNamedTab("PulseSearchLink", origin);
    // ⭐ PURE DOMAIN → Navigate directly
    // window.location.href = origin;
  }
});



document.getElementById("images").addEventListener("click", (event) => {
  const text = document.getElementById("searchengineTextbox").textContent.trim();
  url = engineURL + encodeURIComponent(text) + "&sca_esv=97ecd86c81018411&hl=en&udm=2&biw=1920&bih=945&sxsrf=APpeQnum89enEMVZATiLWD0yh0mMe6oPJg%3A1788824443834&ei=e0ufas3CMvLMkPIP5PPV2Qw&ved=2ahUKEwiN7Kis0t2WAxVyJkQIHeR5NcsQ4dUDegQIBhAN&uact=5&oq=fsdfsdf&gs_lp=Egtnd3Mtd2l6LWltZyIHZnNkZnNkZjIKEAAYgAQYigUYQzIPEAAYgAQYChgLGLEDGIMBMgUQABiABDIJEAAYgAQYChgLMgkQABiABBgKGAsyBRAAGIAEMgkQABiABBgKGAsyCRAAGIAEGAoYCzIJEAAYgAQYChgLMgkQABiABBgKGAtIqANQAFgAcAF4AJABAJgBAKABAKoBALABALgBA8gBAJgCAaACAZgDAOIDBBgAIF3iAwQYACBe4gMEGAAgX-IDBBgAIGDiAwQYACBh4gMEGAAgYogGAZIHATGgBwCyBwC4BwDCBwMwLjHIBwGACAE&sclient=gws-wiz-img";
  document.getElementById("images").style.backgroundColor = "red";
  document.getElementById("videos").style.backgroundColor = "black";
  document.getElementById("text").style.backgroundColor = "black";
  engineType = "images";
});

document.getElementById("videos").addEventListener("click", (event) => {
  const text = document.getElementById("searchengineTextbox").textContent.trim();
  url = engineURL + encodeURIComponent(text) + "&sca_esv=97ecd86c81018411&udm=7&biw=1920&bih=945&sxsrf=APpeQnuWOgRcMsUytLVkUMU_oHzKtkSHyw%3A1788824889059&ei=OU2fao2bA7TVkPIP4qfi4AI&ved=2ahUKEwjNm8-A1N2WAxW0KkQIHeKTGCwQ4dUDegQIBRAM&uact=5&oq=canva&gs_lp=EhZnd3Mtd2l6LW1vZGVsZXNzLXZpZGVvIgVjYW52YTIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwA0iuAVAAWABwAXgBkAEAmAEAoAEAqgEAsAEAuAEDyAEAmAIBoAICmAMA4gMEGAAgXeIDBBgAIF7iAwQYACBf4gMEGAAgYOIDBBgAIGHiAwQYACBiiAYBkAYIkgcBMaAHALIHALgHAMIHAzAuMcgHAYAIAQ&sclient=gws-wiz-modeless-video";
  document.getElementById("videos").style.backgroundColor = "red";
  document.getElementById("images").style.backgroundColor = "black";
  document.getElementById("text").style.backgroundColor = "black";
  engineType = "videos";
});

document.getElementById("text").addEventListener("click", (event) => {
  const text = document.getElementById("searchengineTextbox").textContent.trim();
  url = buildSearchURL(engineURL, text);
  document.getElementById("text").style.backgroundColor = "red";
  document.getElementById("images").style.backgroundColor = "black";
  document.getElementById("videos").style.backgroundColor = "black";
  engineType = "text";
});

document.getElementById("search").addEventListener("click", (event) => {
  let text = document.getElementById("searchengineTextbox").textContent.trim();

  // Remove spaces just in case (e.g., "gmail . com")
  const cleaned = text.replace(/\s+/g, "");

  // Domain-only regex: matches "gmail.com", "pulseworld.net", "example.co.uk", etc.
  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Check if the cleaned text is *exactly* a domain
  const isPureDomain = domainRegex.test(cleaned);

  if (isPureDomain) {
    const originlink = "https://" + cleaned;
    const origin = new URL(originlink).origin;
    
    if (!temporaryLinks.includes(origin)) {
      temporaryLinks.push(origin);
    }

    
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: origin
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(origin, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}

    // ⭐ PURE DOMAIN → Navigate directly
    openNamedTab("PulseSearchLink", origin);
    // window.location.href = origin;
    return;
  }

  // ⭐ NOT a pure domain → treat as search
  if (engineType === "videos") {
    url = engineURL + encodeURIComponent(text) +
      "&sca_esv=97ecd86c81018411&udm=7&biw=1920&bih=945";
  } else if (engineType === "images") {
    url = engineURL + encodeURIComponent(text) +
      "&sca_esv=97ecd86c81018411&hl=en&udm=2&biw=1920&bih=945";
  } else {
    url = engineURL + encodeURIComponent(text);
  }

  if (url) {
    openNamedTab("PulseSearchLink", url);
  }
  // window.location.href = url;
});


document.getElementById("searchengineTextbox").addEventListener("input", () => {
  let text = document.getElementById("searchengineTextbox").textContent.trim();
  const navigateIcon = document.getElementById("navigate");

  // If ANY space exists → it's a search query
  if (text.includes(" ")) {
    navigateIcon.style.display = "none";
    if (engineType === "videos") {
      document.getElementById("videos").style.backgroundColor = "red";
    } else if (engineType === "images") {
      document.getElementById("images").style.backgroundColor = "red";
    } else {
      document.getElementById("text").style.backgroundColor = "red";
    }
    return;
  }

  // Domain or domain + path (no spaces allowed)
  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;

  const isDomainIntent = domainRegex.test(text);

  if (isDomainIntent) {
    navigateIcon.style.display = "inline";
    navigateIcon.style.backgroundColor = "red";
    if (engineType === "videos") {
      document.getElementById("videos").style.backgroundColor = "black";
    } else if (engineType === "images") {
      document.getElementById("images").style.backgroundColor = "black";
    } else {
      document.getElementById("text").style.backgroundColor = "black";
    }
  } else {
    navigateIcon.style.display = "none";
    if (engineType === "videos") {
      document.getElementById("videos").style.backgroundColor = "red";
    } else if (engineType === "images") {
      document.getElementById("images").style.backgroundColor = "red";
    } else {
      document.getElementById("text").style.backgroundColor = "red";
    }
  }
});


document.getElementById("searchengineTextbox").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    let text = document.getElementById("searchengineTextbox").textContent.trim();

    // Domain or domain + path
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;
    const isDomainIntent = domainRegex.test(text);

    let url;

    if (isDomainIntent) {
      const originlink = "https://" + text;
      const origin = new URL(originlink).origin;
      
      if (!temporaryLinks.includes(origin)) {
        temporaryLinks.push(origin);
      }

    
      chrome.runtime.sendMessage({
        type: "PB_HOVER_PREFETCH",
        href: origin
      });
      // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
      try {
        fetch(origin, { mode: "no-cors" }).catch(() => {});
      } catch (_) {}

      // ⭐ PURE DOMAIN → Navigate directly
      openNamedTab("PulseSearchLink", origin);
      // window.location.href = origin;
      return;
    }

    // Fallback: search
    if (engineType === "videos") {
      url = engineURL + encodeURIComponent(text) + "&udm=7";
    } else if (engineType === "images") {
      url = engineURL + encodeURIComponent(text) + "&udm=2";
    } else {
      url = engineURL + encodeURIComponent(text);
    }

    if (url) {
      openNamedTab("PulseSearchLink", url);
    }
    // window.location.href = url;
  }
});

const aboutBtn = document.getElementById("about");
const engageBtn = document.getElementById("engage");
const enterBtn = document.getElementById("enter");
const setupBtn = document.getElementById("setup");

let hoverTimer = null;

aboutBtn.addEventListener("mouseover", () => {
  const link = "https://www.pulseworld.net?Impulse=PulseWorldExtensions";

  // Clear any previous timer
  if (hoverTimer) clearTimeout(hoverTimer);

  // Start 250ms hover timer
  hoverTimer = setTimeout(() => {
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });

    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
  }, 250);
});

// Cancel prefetch if mouse leaves early
aboutBtn.addEventListener("mouseout", () => {
  if (hoverTimer) clearTimeout(hoverTimer);
  hoverTimer = null;
});

// Click logic stays the same
aboutBtn.addEventListener("click", async () => {
  const link = "https://www.pulseworld.net?Impulse=PulseWorldExtensions";

  chrome.runtime.sendMessage({
    type: "PB_HOVER_PREFETCH",
    href: link
  });

  try {
    fetch(link, { mode: "no-cors" }).catch(() => {});
  } catch (_) {}

  openNamedTab("PulseBrowserOS", link);
  await PBUniversalBoost.warmOrigin(link);
});

engageBtn.addEventListener("mouseover", () => {
  const link = "https://www.pulseworld.biz";

  // Clear any previous timer
  if (hoverTimer) clearTimeout(hoverTimer);

  // Start 250ms hover timer
  hoverTimer = setTimeout(() => {
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });

    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
  }, 250);
});

// Cancel prefetch if mouse leaves early
engageBtn.addEventListener("mouseout", () => {
  if (hoverTimer) clearTimeout(hoverTimer);
  hoverTimer = null;
});

engageBtn.addEventListener("click", async () => {
    let link = "https://www.pulseworld.biz";

    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    openNamedTab("PulseBusiness", link);
    await PBUniversalBoost.warmOrigin(link);
});


enterBtn.addEventListener("mouseover", () => {
  const link = "https://www.pulseworld.net";

  // Clear any previous timer
  if (hoverTimer) clearTimeout(hoverTimer);

  // Start 250ms hover timer
  hoverTimer = setTimeout(() => {
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });

    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
  }, 250);
});

// Cancel prefetch if mouse leaves early
enterBtn.addEventListener("mouseout", () => {
  if (hoverTimer) clearTimeout(hoverTimer);
  hoverTimer = null;
});

enterBtn.addEventListener("click", async () => {
    let link = "https://www.pulseworld.net";

    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    openNamedTab("PulseWorld", link);
    await PBUniversalBoost.warmOrigin(link);
});


setupBtn.addEventListener("mouseover", () => {
  const link = "https://www.pulseworld.me";

  // Clear any previous timer
  if (hoverTimer) clearTimeout(hoverTimer);

  // Start 250ms hover timer
  hoverTimer = setTimeout(() => {
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });

    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
  }, 250);
});

// Cancel prefetch if mouse leaves early
setupBtn.addEventListener("mouseout", () => {
  if (hoverTimer) clearTimeout(hoverTimer);
  hoverTimer = null;
});

setupBtn.addEventListener("click", async () => {
    let link = "https://www.pulseworld.me";

    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    openNamedTab("PulseIdentity", link);
    await PBUniversalBoost.warmOrigin(link);
});

document.getElementById("moduleEmail").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

    console.log("[FrontPage] Email module clicked. Settings:", settings);

    // INTERNAL MODE → open PulseWorld Email on the real domain
    if (settings.emailMode === "internal") {
        const internalURL = "https://www.pulseworld.net?Impulse=PulseWorldEmail";
        console.log("[FrontPage] Opening Internal PulseMail:", internalURL);
        chrome.runtime.sendMessage({
          type: "PB_HOVER_PREFETCH",
          href: internalURL
        });
        // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
        try {
          fetch(internalURL, { mode: "no-cors" }).catch(() => {});
        } catch (_) {}
        openNamedTab("PulseMail", internalURL);
        await PBUniversalBoost.warmOrigin(internalURL);
        // chrome.tabs.create({ url: internalURL });
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.externalEmailLink?.trim() || "https://mail.google.com";

    console.log("[FrontPage] Opening External Email Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    openNamedTab("PulseMail", link);
    await PBUniversalBoost.warmOrigin(link);
});


document.getElementById("moduleBank").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

    console.log("[FrontPage] Bank module clicked. Settings:", settings);

    // INTERNAL MODE → open PulseWorld Bank on the real domain
    if (settings.bankMode === "internal") {
        const internalURL = "https://www.pulseworld.net?Impulse=PulseWorldRewards";
        console.log("[FrontPage] Opening Internal PulseBank:", internalURL);
        chrome.runtime.sendMessage({
          type: "PB_HOVER_PREFETCH",
          href: internalURL
        });
        // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
        try {
          fetch(internalURL, { mode: "no-cors" }).catch(() => {});
        } catch (_) {}
        openNamedTab("PulseBank", internalURL);
        await PBUniversalBoost.warmOrigin(internalURL);
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.externalBankLink?.trim() || "https://www.bankofamerica.com";

    console.log("[FrontPage] Opening External Bank Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    openNamedTab("PulseBank", link);
    await PBUniversalBoost.warmOrigin(link);
});


document.getElementById("moduleSocial").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

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
        openNamedTab("PulseSocial", internalURL);
        await PBUniversalBoost.warmOrigin(internalURL);
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.externalSocialLink?.trim() || "https://www.facebook.com";

    console.log("[FrontPage] Opening External Social Media Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    openNamedTab("PulseSocial", link);
    await PBUniversalBoost.warmOrigin(link);
});

document.getElementById("moduleWork").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

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
        openNamedTab("PulseWork", internalURL);
        await PBUniversalBoost.warmOrigin(internalURL);
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.externalWorkLink?.trim() || "https://www.pulseworld.net";

    console.log("[FrontPage] Opening External Work Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    openNamedTab("PulseWork", link);
    await PBUniversalBoost.warmOrigin(link);
});

document.getElementById("moduleStream").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

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
        openNamedTab("PulseStream", internalURL);
        await PBUniversalBoost.warmOrigin(internalURL);
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.externalStreamingLink?.trim() || "https://www.netflix.com";

    console.log("[FrontPage] Opening External Streaming Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    openNamedTab("PulseStream", link);
    await PBUniversalBoost.warmOrigin(link);
});

document.getElementById("moduleShopping").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

    console.log("[FrontPage] Shopping module clicked. Settings:", settings);

    // INTERNAL MODE → open PulseWorld Streaming on the real domain
    if (settings.shoppingMode === "internal") {
        const internalURL = "https://www.amazon.com";
        console.log("[FrontPage] Opening Internal Amazon:", internalURL);
        chrome.runtime.sendMessage({
          type: "PB_HOVER_PREFETCH",
          href: internalURL
        });
        // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
        try {
          fetch(internalURL, { mode: "no-cors" }).catch(() => {});
        } catch (_) {}
        openNamedTab("PulseShopping", internalURL);
        await PBUniversalBoost.warmOrigin(internalURL);
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.externalShoppingLink?.trim() || "https://www.amazon.com";

    console.log("[FrontPage] Opening External Shopping Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    openNamedTab("PulseStream", link);
    await PBUniversalBoost.warmOrigin(link);
});


document.getElementById("moduleFav1").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

    console.log("[FrontPage] moduleFav1Icon module clicked. Settings:", settings);

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.acceleratedModule1Link?.trim() || "https://www.onedrive.com";

    console.log("[FrontPage] Opening External moduleFav1Icon Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    openNamedTab("PulseModule1", link);
    await PBUniversalBoost.warmOrigin(link);
});


document.getElementById("moduleFav2").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

    console.log("[FrontPage] moduleFav2Icon module clicked. Settings:", settings);

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.acceleratedModule2Link?.trim() || "https://www.office.com";

    console.log("[FrontPage] Opening External moduleFav2Icon Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    openNamedTab("PulseModule2", link);
    await PBUniversalBoost.warmOrigin(link);
});


document.getElementById("moduleFav3").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

    console.log("[FrontPage] moduleFav3Icon module clicked. Settings:", settings);

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.acceleratedModule3Link?.trim() || "https://www.amazon.com";

    console.log("[FrontPage] Opening External moduleFav3Icon Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    openNamedTab("PulseModule3", link);
    await PBUniversalBoost.warmOrigin(link);
});


document.getElementById("moduleFav4").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

    console.log("[FrontPage] moduleFav4Icon module clicked. Settings:", settings);

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.acceleratedModule4Link?.trim() || "https://www.coinbase.com";

    console.log("[FrontPage] Opening External moduleFav4Icon Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    openNamedTab("PulseModule4", link); 
    await PBUniversalBoost.warmOrigin(link);
});


document.getElementById("moduleFav5").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

    console.log("[FrontPage] moduleFav5Icon module clicked. Settings:", settings);

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.acceleratedModule5Link?.trim() || "https://www.bridgebase.com";

    console.log("[FrontPage] Opening External moduleFav5Icon Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    openNamedTab("PulseModule5", link);
    await PBUniversalBoost.warmOrigin(link);
});

document.getElementById("moduleFav6").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;

    console.log("[FrontPage] moduleFav6Icon module clicked. Settings:", settings);

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.acceleratedModule6Link?.trim() || "https://www.snapchat.com";

    console.log("[FrontPage] Opening External moduleFav6Icon Provider:", link);
    chrome.runtime.sendMessage({
      type: "PB_HOVER_PREFETCH",
      href: link
    });
    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(link, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}
    openNamedTab("PulseModule6", link);
    await PBUniversalBoost.warmOrigin(link);
});

document.getElementById("clear-caches").addEventListener("click", async () => {
  // Ask user if they want to clear caches
  const confirmClear = confirm(
    "PulseBrowser OS: Would you like to clear PulseWorld cache files?"
  );

  if (confirmClear) {
    // Tell background to clear caches
    chrome.runtime.sendMessage({ type: "PULSE_OS_CLEAR_PULSE_CACHES" });

    // Now ask about local storage
    const confirmClear2 = confirm(
      "PulseBrowser OS: Caches cleared.\n\nWould you also like to clear PulseWorld local storage?"
    );

    if (confirmClear2) {
      chrome.runtime.sendMessage({ type: "PULSE_OS_CLEAR_LOCAL_STORAGE" });
    }
  } else {
    // Now ask about local storage
    const confirmClear2 = confirm(
      "PulseBrowser OS: Would you like to clear PulseWorld local storage?"
    );

    if (confirmClear2) {
      chrome.runtime.sendMessage({ type: "PULSE_OS_CLEAR_LOCAL_STORAGE" });
    }
  }

  // Re-render after everything
  setTimeout(async () => {
    await pbRenderCacheList2();
  }, 500);
});


function backToOriginal() {
  chrome.storage.local.get("originalTabId", data => {
    if (data.originalTabId) {
      chrome.tabs.update(data.originalTabId, { active: true });
    }
  });
}

function getSyncInterval2() {
  const base = 1200;
// ⭐ Add human-like jitter (±20%)
  const jitterRange = base * 0.11;
  const jitter = (Math.random() * jitterRange * 2) - jitterRange;

  // ⭐ Final interval
  const interval = Math.max(base, base + jitter); // never below 5s

  return Math.floor(interval);
}

const images = [
  "PulseWorldEntrancePulseGPUPulseEarn.png",
  "PulseWorldRoute.png",
  "PulseWorldExpansion.png",
  "PulseAIPulseMeshPulsePal.png",
  "PulseBankPulseIdentityPulseVault.png",
  "PulseToolsPulseTrustPulseProxy.png"
];

let index = 0;
const nebula = document.getElementById("nebula");

// Any interaction cancels redirect
["keydown", "mousedown", "pointerdown", "touchstart", "input", "focus"].forEach(evt => {
  window.addEventListener(evt, () => {
    userInteracted = true;
  }, { once: true });
});
window.addEventListener("blur", () => {
  userInteracted = true;
  document.getElementById("subtitle").style.color = "yellow"
  document.getElementById("subsubtitle").style.color = "yellow"
  // pulseRehydrateTabs();
  // injectPulseScreenFromMemory();
}, { once: true });

let timerX = 0;
document.getElementById("timerBtn").textContent = timerX;
const sync = getSyncInterval2();
setInterval(() => {
  timerX++;
  document.getElementById("timerBtn").textContent = timerX;
  if (!userInteracted && timerX === 20) {
    enterBtn.click();
    setTimeout(backToOriginal, 1700);
    document.getElementById("timerBtn").style.display = "none";
  } else if (userInteracted) {
    document.getElementById("timerBtn").style.display = "none";
    timerX = 0;
  }
}, sync);

    const interval3 = getCharacterInterval();
    setTimeout(() => {
      pbPulseScreen.currentTime = 0;
      pbPulseScreen.play = false;
      injectPulseScreenFromMemory();
    }, interval3);

  setTimeout(injectPulseScreenFromMemory, 100);
  
  function swap() {
    nebula.style.opacity = 0;
    setTimeout(() => {
      nebula.style.backgroundImage = `url(${images[index]})`;
      nebula.style.opacity = 0.9;
      index = (index + 1) % images.length;
    }, 1000);
  }

  function getWarmInterval2() {
    const base = 15000;
  // ⭐ Add human-like jitter (±20%)
    const jitterRange = base * 0.27;
    const jitter = (Math.random() * jitterRange * 2) - jitterRange;

    // ⭐ Final interval
    const interval = Math.max(base, base + jitter); // never below 5s

    return Math.floor(interval);
  }

  const interval = getWarmInterval2();
  let intervalId = null;

  function startPulseLoop() {
    if (intervalId) return; // already running

    intervalId = setInterval(() => {
      updateModuleIcons(PulseRealmSettings, PulseBrowserSettings);
      swap();
      pulseRehydrateTabs(); // safe now
    }, interval);
  }

  function stopPulseLoop() {
    clearInterval(intervalId);
    intervalId = null;
  }
      
  const ENTERPRISE_DOMAINS = [
    "microsoft.com",
    "office.com",
    "live.com",
    "outlook.com",
    "azure.com",
    "login.microsoftonline.com",
    "okta.com",
    "google.com",
    "workspace.google.com"
  ];

  function isEnterpriseURL(url) {
    try {
      const host = new URL(url).hostname;
      return ENTERPRISE_DOMAINS.some(domain => host.includes(domain));
    } catch {
      return false;
    }
  }

  function getWarmInterval(links, homes, temp) {
    const allTargets = [...links, ...homes, ...temp].filter(u => u && u.startsWith("http"));
    const externalTargets = [...links, ...temp].filter(u => u && u.startsWith("http"));
    PulseModuleCount = externalTargets.length;
    const hasEnterprise = allTargets.some(url => isEnterpriseURL(url));
    return hasEnterprise ? 30000 : 20000; // 15s for enterprise, 8s for normal
  }

  async function pbRefreshWarmDocument() {
    // ---------------------------------------------------------------------------
    // 1. KERNEL HANDSHAKE
    // ---------------------------------------------------------------------------
    chrome.runtime.sendMessage({ type: "PULSE_OS_PING", time: nowFP  }, (response) => {
      if (chrome.runtime.lastError) return;
    });
    const now = new Date().toLocaleString();
    console.log("[FrontPage] Refreshing PulseWorld with Accelerated Modules:", now);
    const settings = await pbLoadExtensionSettings();
    PulseRealmSettings = settings;
    PulseBrowserSettings = await getSettings();

    const PB_HOMES = [
      "https://www.pulseworld.me",
      "https://www.pulseworld.money",
      "https://www.pulseworld.biz",
      "https://www.binaryos.net",
      "https://www.booleanlogic.net",
      "https://www.gpuprocessing.net",
      "https://www.serviceworker.net",
      "https://www.orbitalmap.net",
      "https://www.pulseworld.net",
      "https://www.google.com",
      settings.externalSearchLink
    ].filter(u => u && u.startsWith("http"));

    const Links = [
      settings.externalBankLink,
      settings.externalEmailLink,
      settings.externalSocialLink,
      settings.externalWorkLink,
      settings.externalStreamingLink,
      settings.externalShoppingLink,
      settings.acceleratedModule1Link,
      settings.acceleratedModule2Link,
      settings.acceleratedModule3Link,
      settings.acceleratedModule4Link,
      settings.acceleratedModule5Link,
      settings.acceleratedModule6Link
    ].filter(u => u && u.startsWith("http"));

    collectAndWarmAssetsFront();

    const container = document.getElementById("pbWarmContainer");
    if (!container) return;

    container.innerHTML = "";

    PB_HOMES.forEach(url => {      
      container.insertAdjacentHTML("beforeend", `<link rel="preconnect" href="${url}">`);
    });

    Links.forEach(url => {
      container.insertAdjacentHTML("beforeend", `<link rel="preconnect" href="${url}">`);
    });

    temporaryLinks.forEach(url => {
      container.insertAdjacentHTML("beforeend", `<link rel="preconnect" href="${url}">`);
    });

    const externalTargets = [...Links].filter(u => u && u.startsWith("http"));
    PulseModuleCount = externalTargets.length;
    const externalTempTargets = [...temporaryLinks].filter(u => u && u.startsWith("http"));
    PulseTempModuleCount = externalTempTargets.length;

    if (PB_HOMES.length > 0) pbPreconnect(PB_HOMES);
    if (Links.length > 0) pbPreconnect(Links);
    if (temporaryLinks.length > 0) pbPreconnect(temporaryLinks);

    const count = Links.length + temporaryLinks.length;

    chrome.runtime.sendMessage({
      type: "PBACC_WARMPATH_EVENT",
      origins: PB_HOMES
    });

    chrome.runtime.sendMessage({
      type: "PBACC_WARMPATH_EXTERNAL",
      count
    });
    document.querySelectorAll('[class^="PulseBrowser-OS-Snapshot"]').forEach(bubble => {
      bubble.classList.add('electrify');
      setTimeout(() => {
        bubble.classList.remove('electrify');
      }, 3000);
    });
    let topPanel = document.querySelector(".top-panel");
    topPanel.classList.add('electrify');
    setTimeout(() => {
      topPanel.classList.remove('electrify');
      pulseRehydrateTabs();
    }, 2700);
    gpuWarmExtra();
  }

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden || document.visibilityState === "visible") {
      // ---------------------------------------------------------------------------
      // 1. KERNEL HANDSHAKE
      // ---------------------------------------------------------------------------
      chrome.runtime.sendMessage({ type: "PULSE_OS_PING", time: nowFP  }, (response) => {
        if (chrome.runtime.lastError) return;
      });
      updateOverlay();
      gpuWarmExtra();
      // Force Chrome to rebuild the GPU layer
      const body = document.body;

      // Add a temporary class that breaks the stale GPU layer
      body.classList.add("pulse-gpu-reset");

      // Remove it on the next frame so the repaint happens cleanly
      requestAnimationFrame(() => {
        body.classList.remove("pulse-gpu-reset");
        pulseRehydrateTabs();
        startPulseLoop();
      });
      injectPulseScreenFromMemory(true);
      const interval3 = getCharacterInterval();
      setTimeout(() => {
        pbPulseScreen.currentTime = 0;
        pbPulseScreen.play = false;
        injectPulseScreenFromMemory();
        pulseRehydrateTabs();
      }, interval3);
    } else {
      stopPulseLoop();
    }
  });

  function extractWorldBands() {
    const bands = {};

    document.querySelectorAll("[data-band]").forEach((el) => {
      const name = el.getAttribute("data-band");
      bands[name] = bands[name] || 0;
      bands[name]++;
    });

    return bands;
  }

  
function emitFullPageContext() {
  chrome.runtime.sendMessage({
    type: "PBREALM_UPDATE_FULL",
    page: "NewTab",
    url: "impulse://newtab",
    title: documentTitle(),
    bands: extractWorldBands()
  });
}

function documentTitle() {
  return document.title;
}

// function renderHTMLSnapshot(snapshot) {
//     let div = document.getElementById("PulseBrowser-OS-Snapshot");
//     if (!div) {
//         div = document.createElement("div");
//         div.id = "PulseBrowser-OS-Snapshot";
//         div.className = "PulseBrowser-OS-Snapshot";
//     }

//     if (snapshot) {

//         // ---------------------------------------------
//         // ⭐ REMOVE <body> TAG FROM SNAPSHOT HTML
//         // ---------------------------------------------
//         let html = snapshot.html;

//         // Replace opening <body ...> with Injected-Body wrapper
//         html = html.replace(/<body[^>]*>/i, '<div class="Injected-Body">');

//         // Replace closing </body> with closing div
//         html = html.replace(/<\/body>/i, '</div>');

//         // ---------------------------------------------
//         // ⭐ Inject into the bubble viewport wrapper
//         // ---------------------------------------------
//         div.innerHTML = `
//             <div class="Snapshot-Viewport">
//                 ${html}
//             </div>
//         `;

//         // Attach bubble to page
//         document.body.appendChild(div);

//         // Move your left panel down
//         leftpanel.style.top = "300px";

//     } else {
//         // Remove bubble
//         if (div) div.remove();

//         // Reset left panel
//         leftpanel.style.top = "0";
//     }
// }

