// ============================================================================
//  PBDevOverlay.js — PulseBrowser OS HUD (Ultra Edition v7.0)
//  Multi-panel real-time overlay for kernel, realm, router, navigator,
//  accelerator, performance, warm-path, GPU, decode, settings, experimental.
// ============================================================================

console.log("%c[PULSEBROWSER] PBDevOverlay (Ultra Edition v7.0) loaded",
  "color:#FF8844; font-weight:bold; font-family:monospace;");

// ---------------------------------------------------------------------------
// CREATE OVERLAY
// ---------------------------------------------------------------------------
(function createOverlay() {

  const wrap = document.getElementById("side-panel right-panel");
  wrap.style.cssText = `
    position: fixed;
    margin: 20px 20px;
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
  `;

  wrap.innerHTML = `
    <div style="font-weight:bold; text-align: center; color: #0FF; font-size:13px; margin-top: 10px; margin-bottom:6px;">
      PulseBrowser OS Overlay
    </div>

    <div id="pb-hud-kernel"></div>
    <div id="pb-hud-warm"></div>
    <div id="pb-hud-performance"></div>
    <div id="pb-hud-navigator"></div>
    <div id="pb-hud-accelerator"></div>
    <div id="pb-hud-settings"></div>
    <div id="pb-hud-experimental"></div>
    <div id="pb-hud-flags"></div>
  `;

  document.body.appendChild(wrap);

  updateOverlay();
  setInterval(updateOverlay, 1500);
})();

// ---------------------------------------------------------------------------
// UPDATE OVERLAY
// ---------------------------------------------------------------------------
function updateOverlay() {
  chrome.runtime.sendMessage({ type: "PBREALM_GET" }, (realmRes) => {
    chrome.runtime.sendMessage({ type: "PBSETTINGS_GET" }, (settingsRes) => {

      PulseRealm = realmRes.state || {};
      PulseRealmSettings = settingsRes.settings || {};

      updateKernel(PulseRealm);
      updateWarm(PulseRealm);
      updatePerformance(PulseRealm);
      updateNavigator(PulseRealmSettings, PulseRealm);
      updateAccelerator(PulseRealmSettings, PulseRealm);
      updateSettings(PulseRealmSettings);
      updateExperimental(PulseRealmSettings);
    });
  });
}

// ---------------------------------------------------------------------------
// SECTION: Kernel
// ---------------------------------------------------------------------------
function updateKernel(realm) {
  const el = document.getElementById("pb-hud-kernel");
  el.innerHTML = `
    <div class="pb-hud-title">Kernel</div>
    last page: ${realm.lastPage || "-"}<br/>
    last title: ${realm.lastTitle || "-"}<br/>
    last url: ${realm.lastURL || "-"}<br/>
    domain class: ${realm.lastDomainClass || "-"}<br/>
    last Ping: <font color="yellow">${realm.lastPing || "-"}</font><br/>
    data band: ${realm.band || "-"}<br/>
    sessionStart: <font color="yellow">${realm.sessionStart || "-"}</font><br/>
  `;
}

// ---------------------------------------------------------------------------
// SECTION: Router
// ---------------------------------------------------------------------------
function updateRouter(settings) {
  const el = document.getElementById("pb-hud-router");
  el.innerHTML = `
    <div class="pb-hud-title">Router</div>
    enabled: <font color="#0FF">${settings.enableRouter}</font><br/>
    home: <font color="#0FF">${settings.routerPrioritizeHomeUniverse}</font><br/>
    cdn: <font color="#0FF">${settings.routerPrioritizeCDN}</font><br/>
    assets: <font color="#0FF">${settings.routerPrioritizeAssets}</font><br/>
    latencyScan: <font color="#0FF">${settings.routerLatencyScan}</font><br/>
    realmScan: <font color="#0FF">${settings.routerRealmScan}</font><br/>
    fallbackScan: <font color="#0FF">${settings.routerFallbackScan}</font><br/>
  `;
}

// ---------------------------------------------------------------------------
// SECTION: Navigator
// ---------------------------------------------------------------------------
function updateNavigator(settings, realm) {
  const el = document.getElementById("pb-hud-navigator");
  el.innerHTML = `
    <div class="pb-hud-title">Navigator</div>
    enabled: <font color="#0FF">${settings.enableNavigator}</font><br/>
    warmSiblings: <font color="#0FF">${settings.navWarmSiblings}</font><br/>
    warmAssets: <font color="#0FF">${settings.navWarmAssets}</font><br/>
    warmGlobal: <font color="#0FF">${settings.navWarmGlobalSites}</font><br/>
    pulsePriority: <font color="#0FF">${settings.navPulseWorldPriority}</font><br/>
  `;
}

// ---------------------------------------------------------------------------
// SECTION: Accelerator
// ---------------------------------------------------------------------------
function updateAccelerator(settings, realm) {
  const el = document.getElementById("pb-hud-accelerator");
  el.innerHTML = `
    <div class="pb-hud-title">Accelerator</div>
    enabled: <font color="#0FF">${settings.enableAccelerator}</font><br/>
    preconnect: <font color="#0FF">${settings.accelPreconnect}</font><br/>
    prefetch: <font color="#0FF">${settings.accelPrefetch}</font><br/>
    preload: <font color="#0FF">${settings.accelPreload}</font><br/>
    warmPath: <font color="#0FF">${settings.accelWarmPath}</font><br/>
    gpuWarm: <font color="#0FF">${settings.accelGPUWarm}</font><br/>
    decodeWarm: <font color="#0FF">${settings.accelDecodeWarm}</font><br/>
  `;
}

// ---------------------------------------------------------------------------
// SECTION: Performance
// ---------------------------------------------------------------------------
function updatePerformance(realm) {
  const el = document.getElementById("pb-hud-performance");
  const perf = realm.perfEntries || [];

  const lastPerf = perf.length > 0 ? perf[perf.length - 1] : null;

  el.innerHTML = `
    <div class="pb-hud-title">Tab Performance</div>
    mutations: <font color="#0FF">${realm.mutationCount || "-"}</font><br/>
    lastMutationTS: <font color="#0FF">${realm.lastMutationTS || "-"}</font><br/>
    perf entries: <font color="#0FF">${perf.length || "-"}</font><br/>
    entry speed: <font color="#0FF">${lastPerf ? lastPerf.duration.toFixed(2) + "ms" : "-"}</font><br/>
    lastNav: <font color="#0FF">${realm.navHistory.slice(-1)[0] || "-"}</font><br/>
    lastNavTS: <font color="#0FF">${realm.perfLastNavigation || "-"}</font><br/>
    lastWarmOrigin: <font color="#0FF">${realm.lastWarmOrigin || "-"}</font><br/>
  `;
}


// ---------------------------------------------------------------------------
// SECTION: Warm-Path
// ---------------------------------------------------------------------------
function updateWarm(realm) {
  const el = document.getElementById("pb-hud-warm");
  el.innerHTML = `
    <div class="pb-hud-title">Warm-Universe</div>
    warmPaths: <font color="#0FF">${realm.warmPathsTriggered || "-"}</font><br/>
    warmAssets: <font color="#0FF">${realm.warmAssetsTriggered || "-"}</font><br/>
    imagesDecoded: <font color="#0FF">${realm.imagesDecoded || "-"}</font><br/>
    warmGPUEnabled: <font color="#0FF">${realm.gpuEnabled || "-"}</font><br/>
    WarmUniverse: <font color="yellow">PulseBrowser OS Modules</font><br/>
  `;
}

// ---------------------------------------------------------------------------
// SECTION: GPU
// ---------------------------------------------------------------------------
function updateGPU(realm) {
  const el = document.getElementById("pb-hud-gpu");
  el.innerHTML = `
    <div class="pb-hud-title">Warm GPU</div>
    warmGPUEnabled: <font color="#0FF">${realm.gpuEnabled || "-"}</font><br/>
  `;
}

// ---------------------------------------------------------------------------
// SECTION: Settings
// ---------------------------------------------------------------------------
function updateSettings(settings) {
  const el = document.getElementById("pb-hud-settings");
  el.innerHTML = `
    <div class="pb-hud-title">Settings</div>
    interceptor: <font color="#0FF">${settings.enableInterceptor}</font><br/>
    accelerator: <font color="#0FF">${settings.enableAccelerator}</font><br/>
    navigator: <font color="#0FF">${settings.enableNavigator}</font><br/>
    devOverlay: <font color="#0FF">${settings.enableDevOverlay}</font><br/>
    contentRuntime: <font color="#0FF">${settings.enableContentRuntime}</font><br/>
  `;
}

// ---------------------------------------------------------------------------
// SECTION: Experimental
// ---------------------------------------------------------------------------
function updateExperimental(settings) {
  const el = document.getElementById("pb-hud-experimental");
  
  el.innerHTML = `
    <div class="pb-hud-title">Experimental</div>
    gpuPaths: <font color="#0FF">${settings.experimentalGPUPaths}</font><br/>
    decodePaths: <font color="#0FF">${settings.experimentalDecodePaths}</font><br/>
    routeGraph: <font color="#0FF">${settings.experimentalRouteGraph}</font><br/>
    predictivePrefetch: <font color="#0FF">${settings.experimentalPredictivePrefetch}</font><br/>
    aiWarmPath: <font color="#0FF">${settings.experimentalAIWarmPath}</font><br/>
    temporalNav: <font color="#0FF">${settings.experimentalTemporalNavigation}</font><br/>
    quantumRouting: <font color="#0FF">${settings.experimentalQuantumRouting}</font><br/>
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
