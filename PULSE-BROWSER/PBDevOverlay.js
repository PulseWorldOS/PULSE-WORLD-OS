// ============================================================================
//  PBDevOverlay.js — PulseBrowser OS HUD (Ultra Edition v7.0)
//  Multi-panel real-time overlay for kernel, realm, router, navigator,
//  accelerator, performance, warm-path, GPU, decode, settings, experimental.
// ============================================================================

console.log("%c[PULSEBROWSER] PBDevOverlay (Ultra Edition v7.0) loaded",
  "color:#FF8844; font-weight:bold; font-family:monospace;");

  
function getSyncInterval() {
  const base = 1200;
// ⭐ Add human-like jitter (±20%)
  const jitterRange = base * 0.11;
  const jitter = (Math.random() * jitterRange * 2) - jitterRange;

  // ⭐ Final interval
  const interval = Math.max(1200, base + jitter); // never below 5s

  return Math.floor(interval);
}


// ---------------------------------------------------------------------------
// UPDATE OVERLAY
// ---------------------------------------------------------------------------
async function updateOverlay() {
  chrome.runtime.sendMessage({ type: "PBREALM_GET" }, (realmRes) => {
    chrome.runtime.sendMessage({ type: "PBSETTINGS_GET" }, (settingsRes) => {
      PulseRealm = realmRes.state || PulseRealm || {};
      PulseBrowserSettings = settingsRes.settings || PulseBrowserSettings || {};
      
      updateKernel(PulseRealm, PulseRealm.sessionStart);
      updateWarm(PulseRealm);
      updatePerformance(PulseRealm);
      updateNavigator(PulseBrowserSettings, PulseRealm);
      updateAccelerator(PulseBrowserSettings, PulseRealm);
      updateRouter(PulseBrowserSettings);
      updateSettings(PulseBrowserSettings);
      updateExperimental(PulseBrowserSettings);
    });
  });
}

// ---------------------------------------------------------------------------
// CREATE OVERLAY
// ---------------------------------------------------------------------------
(function createOverlay() {

  const wrap = document.getElementById("side-panel right-panel");
  wrap.style.cssText = `
    position: fixed;
    margin: 14px 20px;
    padding: 3px 6px;
    top: 0;
    bottom: 0;
    width: clamp(280px, 12vw, 350px);
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(12px);
    border-left: 1px solid rgba(255, 255, 255, 0.15);
    border-right: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 30px;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.45);
    z-index: 5;
    word-wrap: break-word;
    overflow-wrap: anywhere;
    word-break: break-all;
  `;

  wrap.innerHTML = `
    <div style="font-weight:bold; text-align: center; color: #0FF; font-size:13px; margin-top: 2px; margin-bottom:6px;">
      PulseBrowser OS - User Overlay
    </div>

    <div id="pb-hud-kernel"></div>
    <div id="pb-hud-warm"></div>
    <div id="pb-hud-performance"></div>
    <div id="pb-hud-accelerator"></div>
    <div id="pb-hud-navigator"></div>
    <div id="pb-hud-router"></div>
    <div id="pb-hud-settings"></div>
    <div id="pb-hud-experimental"></div>
    <div id="pb-hud-flags"></div>
  `;

  document.body.appendChild(wrap);
  const sync = getSyncInterval();
  updateOverlay();
  setInterval(updateOverlay, sync);
})();

function enabledColor(v) {
  return v ? "lightgreen" : "#FF0";   // teal for true, yellow for false
}
function tfColor(v) {
  return v ? "#0FF" : "#FF0";   // teal for true, yellow for false
}
function experimentalColor(v) {
  return v ? "#FF0" : "#0FF";   // yellow for true, teal for false
}


// ---------------------------------------------------------------------------
// SECTION: Kernel
// ---------------------------------------------------------------------------
function updateKernel(realm, SessionStart) {
  const el = document.getElementById("pb-hud-kernel");
  const lastURL = realm.lastURL?.slice(0, 75);
  el.innerHTML = `
    <div class="pb-hud-title">Network Kernel (Internet)</div>
    Session Start: <font color="gold">${SessionStart}</font><br/>
    Last Page: <font color="#0FF">${realm.lastPage || "-"}</font><br/>
    Last Title: <font color="#0FF">${realm.lastTitle || "-"}</font><br/>
    Last URL: <font color="#0FF">${lastURL || "-"}</font><br/>
    Domain Class: <font color="#0FF">${realm.lastDomainClass || "-"}</font><br/>
    Data Band: <font color="#0FF">${realm.band || "-"}</font><br/>
    Last Ping: <font color="yellow">${realm.lastPing || "-"}</font><br/>
  `;
}

// ---------------------------------------------------------------------------
// SECTION: Router
// ---------------------------------------------------------------------------
function updateRouter(settings) {
  const el = document.getElementById("pb-hud-router");
  el.innerHTML = `
    <div class="pb-hud-title">PulseRouter</div>
    Enabled: <font color="${enabledColor(settings.enableRouter)}">${settings.enableRouter}</font><br/>
    Prioritize CDN: <font color="${tfColor(settings.routerPrioritizeCDN)}">${settings.routerPrioritizeCDN}</font><br/>
    Prioritize Assets: <font color="${tfColor(settings.routerPrioritizeAssets)}">${settings.routerPrioritizeAssets}</font><br/>
    Latency Scan: <font color="${tfColor(settings.routerLatencyScan)}">${settings.routerLatencyScan}</font><br/>
    Realm Scan: <font color="${tfColor(settings.routerRealmScan)}">${settings.routerRealmScan}</font><br/>
    Fallback Scan: <font color="${tfColor(settings.routerFallbackScan)}">${settings.routerFallbackScan}</font><br/>
  `;
}



// ---------------------------------------------------------------------------
// SECTION: Performance
// ---------------------------------------------------------------------------
function updatePerformance(realm) {
  const el = document.getElementById("pb-hud-performance");
  const perf = realm.perfEntries || [];
  const lastNAV = realm.navHistory.slice(-1)[0]?.slice(0, 75);

  const lastPerf = perf.length > 0 ? perf[perf.length - 1] : null;

  el.innerHTML = `
    <div class="pb-hud-title">Realm Performance (Tab)</div>
    Last Warm-Realm: <font color="lightgreen">${realm.lastWarmOrigin || "-"}</font><br/>
    Background Activity: <font color="#0FF">${realm.mutationCount || "-"}</font><br/>
    Last Activity Event: <font color="yellow">${realm.lastMutationTS || "-"}</font><br/>
    Realm Perf Entries: <font color="lightgreen">${perf.length || "-"}</font><br/>
    Realm Perf Speed: <font color="#0FF">${lastPerf ? lastPerf.duration.toFixed(2) + "ms" : "-"}</font><br/>
    Last NAV: <font color="lightgreen">${lastNAV || "-"}</font><br/>
    Last NAV Time: <font color="yellow">${realm.perfLastNavigation || "-"}</font><br/>
  `;

  if (lastNAV) {
    el.style.cssText = el.style.cssText + `
      cursor: pointer;
    `;
    el.onclick = () => {
      openNamedTab(location.hostname, lastNAV);
    };
  }
}

// ---------------------------------------------------------------------------
// SECTION: Warm-Path
// ---------------------------------------------------------------------------
function updateWarm(realm) {
  const el = document.getElementById("pb-hud-warm");
  el.innerHTML = `
    <div class="pb-hud-title">Warm-Universe (Browser)</div>
    Warm Paths: <font color="#0FF">${realm.warmPathsTriggered || "-"}</font><br/>
    Warm Assets: <font color="#0FF">${realm.warmAssetsTriggered || "-"}</font><br/>
    Images Decoded: <font color="#0FF">${realm.imagesDecoded || "-"}</font><br/>
    Warm-GPU Enabled: <font color="#0FF">${realm.gpuEnabled || "-"}</font><br/>
    Warm-Galaxy: <font color="yellow">${PulseModuleCount ? `PulseBrowser OS Modules (<font color="#0FF">${PulseModuleCount}</font>)` : "Setup your Galaxy in Settings!"}</font><br/>
    Warm-Nova: <font color="gold">${PulseTempModuleCount ? `PulseBrowser Temp Modules (<font color="#0FF">${PulseTempModuleCount}</font>)` : "Search the World for New Realms!"}</font><br/>
  `;

  if (PulseModuleCount) {
    el.style.cssText = el.style.cssText + `
      cursor: pointer;
    `;
    el.onclick = () => {
      (async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.sidePanel.open({
          windowId: tab.windowId
        });
      })();
    };
  }
}

// ---------------------------------------------------------------------------
// SECTION: GPU
// ---------------------------------------------------------------------------
function updateGPU(realm) {
  const el = document.getElementById("pb-hud-gpu");
  el.innerHTML = `
    <div class="pb-hud-title">Warm-GPU</div>
    Warm-GPU Enabled: <font color="#0FF">${realm.gpuEnabled || "-"}</font><br/>
  `;
}

// ---------------------------------------------------------------------------
// SECTION: Navigator
// ---------------------------------------------------------------------------
function updateNavigator(settings, realm) {
  const el = document.getElementById("pb-hud-navigator");
  el.innerHTML = `
    <div class="pb-hud-title">PulseNavigator</div>
    Enabled: <font color="${enabledColor(settings.enableNavigator)}">${settings.enableNavigator}</font><br/>
    Warm Siblings: <font color="${tfColor(settings.navWarmSiblings)}">${settings.navWarmSiblings}</font><br/>
    Warm Assets: <font color="${tfColor(settings.navWarmAssets)}">${settings.navWarmAssets}</font><br/>
    Warm Global: <font color="${tfColor(settings.navWarmGlobalSites)}">${settings.navWarmGlobalSites}</font><br/>
  `;
}


// ---------------------------------------------------------------------------
// SECTION: Accelerator
// ---------------------------------------------------------------------------
function updateAccelerator(settings, realm) {
  const el = document.getElementById("pb-hud-accelerator");
  el.innerHTML = `
    <div class="pb-hud-title">PulseAccelerator</div>
    Enabled: <font color="${enabledColor(settings.enableAccelerator)}">${settings.enableAccelerator}</font><br/>
    Preconnect: <font color="${tfColor(settings.accelPreconnect)}">${settings.accelPreconnect}</font><br/>
    Prefetch: <font color="${tfColor(settings.accelPrefetch)}">${settings.accelPrefetch}</font><br/>
    Preload: <font color="${tfColor(settings.accelPreload)}">${settings.accelPreload}</font><br/>
    Warm Path: <font color="${tfColor(settings.accelWarmPath)}">${settings.accelWarmPath}</font><br/>
    GPU Warm: <font color="${tfColor(settings.accelGPUWarm)}">${settings.accelGPUWarm}</font><br/>
    Decode Warm: <font color="${tfColor(settings.accelDecodeWarm)}">${settings.accelDecodeWarm}</font><br/>
  `;
}


// ---------------------------------------------------------------------------
// SECTION: Settings
// ---------------------------------------------------------------------------
function updateSettings(settings) {
  const el = document.getElementById("pb-hud-settings");
  el.innerHTML = `
    <div class="pb-hud-title">PulseBrowser Settings</div>
    PulseAccelerator: <font color="${enabledColor(settings.enableAccelerator)}">${settings.enableAccelerator}</font><br/>
    PulseNavigator: <font color="${enabledColor(settings.enableNavigator)}">${settings.enableNavigator}</font><br/>
    PulseRouter: <font color="${enabledColor(settings.enableRouter)}">${settings.enableRouter}</font><br/>
    OS User Overlay: <font color="${tfColor(settings.enableDevOverlay)}">${settings.enableDevOverlay}</font><br/>
    OS User Memory: <font color="${tfColor(settings.enableDevCaches)}">${settings.enableDevCaches}</font><br/>
    Universal Runtime: <font color="${tfColor(settings.enableContentRuntime)}">${settings.enableContentRuntime}</font><br/>
  `;
}


// ---------------------------------------------------------------------------
// SECTION: Experimental
// ---------------------------------------------------------------------------
function updateExperimental(settings) {
  const el = document.getElementById("pb-hud-experimental");
  el.innerHTML = `
    <div class="pb-hud-title">PulseBrowser Experimental</div>
    Realm Continuity: <font color="${experimentalColor(settings.experimentalRealmPerservere)}">${settings.experimentalRealmPerservere}</font><br/>
    Learned Paths: <font color="${experimentalColor(settings.experimentalLearnPaths)}">${settings.experimentalLearnPaths}</font><br/>
    Perpetual Flow: <font color="${experimentalColor(settings.experimentalPerpFresh)}">${settings.experimentalPerpFresh}</font><br/>
    Predictive Prefetch: <font color="${experimentalColor(settings.experimentalPredictivePrefetch)}">${settings.experimentalPredictivePrefetch}</font><br/>
    Temporal NAV: <font color="${experimentalColor(settings.experimentalTemporalNavigation)}">${settings.experimentalTemporalNavigation}</font><br/>
    Quantum Routing: <font color="${experimentalColor(settings.experimentalQuantumRouting)}">${settings.experimentalQuantumRouting}</font><br/>
  `;
}



// ---------------------------------------------------------------------------
// STYLE: Section Titles
// ---------------------------------------------------------------------------
const style = document.createElement("style");
style.textContent = `
  .pb-hud-title {
    font-weight:bold;
    color:#FF8844;
    margin-bottom:2px;
    margin-top:6px;
  }
`;
document.head.appendChild(style);
