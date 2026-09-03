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
  if (document.getElementById("pulsebrowser-dev-overlay")) return;

  const wrap = document.createElement("div");
  wrap.id = "pulsebrowser-dev-overlay";
  wrap.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    width: 340px;
    background: rgba(0,0,0,0.85);
    color: #00FF9C;
    font-family: monospace;
    font-size: 11px;
    padding: 10px;
    border-radius: 6px;
    z-index: 999999999;
    pointer-events: none;
    backdrop-filter: blur(4px);
  `;

  wrap.innerHTML = `
    <div style="font-weight:bold; font-size:13px; margin-bottom:6px;">
      PulseBrowser OS HUD
    </div>

    <div id="pb-hud-kernel"></div>
    <div id="pb-hud-router"></div>
    <div id="pb-hud-navigator"></div>
    <div id="pb-hud-accelerator"></div>
    <div id="pb-hud-performance"></div>
    <div id="pb-hud-warm"></div>
    <div id="pb-hud-gpu"></div>
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

      const realm = realmRes.state || {};
      const settings = settingsRes.settings || {};

      updateKernel(realm);
      updateRouter(settings);
      updateNavigator(settings, realm);
      updateAccelerator(settings, realm);
      updatePerformance(realm);
      updateWarm(realm);
      updateGPU(realm);
      updateSettings(settings);
      updateExperimental(settings);
      updateFlags(realm.flags);
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
    page: ${realm.lastPage || "-"}<br/>
    url: ${realm.lastURL || "-"}<br/>
    domain: ${realm.lastDomainClass || "-"}<br/>
    lastPing: ${realm.lastPing || "-"}<br/>
    bands: ${Object.keys(realm.bands || {}).length}<br/>
  `;
}

// ---------------------------------------------------------------------------
// SECTION: Router
// ---------------------------------------------------------------------------
function updateRouter(settings) {
  const el = document.getElementById("pb-hud-router");
  el.innerHTML = `
    <div class="pb-hud-title">Router</div>
    enabled: ${settings.enableRouter}<br/>
    home: ${settings.routerPrioritizeHomeUniverse}<br/>
    cdn: ${settings.routerPrioritizeCDN}<br/>
    assets: ${settings.routerPrioritizeAssets}<br/>
    latencyScan: ${settings.routerLatencyScan}<br/>
    realmScan: ${settings.routerRealmScan}<br/>
    fallbackScan: ${settings.routerFallbackScan}<br/>
  `;
}

// ---------------------------------------------------------------------------
// SECTION: Navigator
// ---------------------------------------------------------------------------
function updateNavigator(settings, realm) {
  const el = document.getElementById("pb-hud-navigator");
  el.innerHTML = `
    <div class="pb-hud-title">Navigator</div>
    enabled: ${settings.enableNavigator}<br/>
    warmSiblings: ${settings.navWarmSiblings}<br/>
    warmAssets: ${settings.navWarmAssets}<br/>
    warmGlobal: ${settings.navWarmGlobalSites}<br/>
    pulsePriority: ${settings.navPulseWorldPriority}<br/>
    lastNav: ${realm.navHistory.slice(-1)[0] || "-"}<br/>
  `;
}

// ---------------------------------------------------------------------------
// SECTION: Accelerator
// ---------------------------------------------------------------------------
function updateAccelerator(settings, realm) {
  const el = document.getElementById("pb-hud-accelerator");
  el.innerHTML = `
    <div class="pb-hud-title">Accelerator</div>
    enabled: ${settings.enableAccelerator}<br/>
    preconnect: ${settings.accelPreconnect}<br/>
    prefetch: ${settings.accelPrefetch}<br/>
    preload: ${settings.accelPreload}<br/>
    warmPath: ${settings.accelWarmPath}<br/>
    gpuWarm: ${settings.accelGPUWarm}<br/>
    decodeWarm: ${settings.accelDecodeWarm}<br/>
    warmPaths: ${realm.warmPathsTriggered}<br/>
    warmAssets: ${realm.warmAssetsTriggered}<br/>
  `;
}

// ---------------------------------------------------------------------------
// SECTION: Performance
// ---------------------------------------------------------------------------
function updatePerformance(realm) {
  const el = document.getElementById("pb-hud-performance");
  const perf = realm.perfEntries || [];

  el.innerHTML = `
    <div class="pb-hud-title">Performance</div>
    entries: ${perf.length}<br/>
    lastNavTS: ${realm.perfLastNavigation || "-"}<br/>
  `;
}

// ---------------------------------------------------------------------------
// SECTION: Warm-Path
// ---------------------------------------------------------------------------
function updateWarm(realm) {
  const el = document.getElementById("pb-hud-warm");
  el.innerHTML = `
    <div class="pb-hud-title">Warm-Path</div>
    mutations: ${realm.mutationCount}<br/>
    lastMutationTS: ${realm.lastMutationTS || "-"}<br/>
    imagesDecoded: ${realm.imagesDecoded}<br/>
  `;
}

// ---------------------------------------------------------------------------
// SECTION: GPU
// ---------------------------------------------------------------------------
function updateGPU(realm) {
  const el = document.getElementById("pb-hud-gpu");
  el.innerHTML = `
    <div class="pb-hud-title">GPU</div>
    gpuWarmCount: ${realm.gpuWarmCount}<br/>
  `;
}

// ---------------------------------------------------------------------------
// SECTION: Settings
// ---------------------------------------------------------------------------
function updateSettings(settings) {
  const el = document.getElementById("pb-hud-settings");
  el.innerHTML = `
    <div class="pb-hud-title">Settings</div>
    interceptor: ${settings.enableInterceptor}<br/>
    accelerator: ${settings.enableAccelerator}<br/>
    navigator: ${settings.enableNavigator}<br/>
    devOverlay: ${settings.enableDevOverlay}<br/>
    contentRuntime: ${settings.enableContentRuntime}<br/>
  `;
}

// ---------------------------------------------------------------------------
// SECTION: Experimental
// ---------------------------------------------------------------------------
function updateExperimental(settings) {
  const el = document.getElementById("pb-hud-experimental");
  el.innerHTML = `
    <div class="pb-hud-title">Experimental</div>
    gpuPaths: ${settings.experimentalGPUPaths}<br/>
    decodePaths: ${settings.experimentalDecodePaths}<br/>
    routeGraph: ${settings.experimentalRouteGraph}<br/>
    predictivePrefetch: ${settings.experimentalPredictivePrefetch}<br/>
    aiWarmPath: ${settings.experimentalAIWarmPath}<br/>
    temporalNav: ${settings.experimentalTemporalNavigation}<br/>
    quantumRouting: ${settings.experimentalQuantumRouting}<br/>
  `;
}

// ---------------------------------------------------------------------------
// SECTION: Flags
// ---------------------------------------------------------------------------
function updateFlags(flags = {}) {
  const el = document.getElementById("pb-hud-flags");
  el.innerHTML = `
    <div class="pb-hud-title">Flags</div>
    hudActive: ${flags.hudActive}<br/>
    contentRuntimeActive: ${flags.contentRuntimeActive}<br/>
    acceleratorActive: ${flags.acceleratorActive}<br/>
    routerActive: ${flags.routerActive}<br/>
    navigatorActive: ${flags.navigatorActive}<br/>
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
