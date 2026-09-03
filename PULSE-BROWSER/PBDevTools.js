// ============================================================================
//  PBDevTools.js — PulseBrowser OS Diagnostic Engine (Ultra Edition v7.0)
//  Kernel inspector • router inspector • interceptor inspector • navigator
//  inspector • accelerator inspector • content inspector • overlay inspector
//  GPU/Decode inspector • warm-path inspector • settings inspector • full dump
// ============================================================================

console.log("%c[PULSEBROWSER] PBDevTools (Ultra Edition v7.0) loaded",
  "color:#FF4444; font-weight:bold; font-family:monospace;");

// ---------------------------------------------------------------------------
// INTERNAL LOGGING HELPERS
// ---------------------------------------------------------------------------
function logHeader(title) {
  console.log(
    `%c\n=== ${title} ===`,
    "color:#FF4444; font-weight:bold; font-size:14px; font-family:monospace;"
  );
}

function logKV(label, value) {
  console.log(
    `%c${label}: %c${value}`,
    "color:#FF4444; font-weight:bold; font-family:monospace;",
    "color:#FFFFFF; font-family:monospace;"
  );
}

// ---------------------------------------------------------------------------
// KERNEL STATUS
// ---------------------------------------------------------------------------
async function pbLogKernelStatus() {
  logHeader("PulseBrowser Kernel Status");

  chrome.runtime.sendMessage({ type: "PBREALM_GET" }, (realm) => {
    const state = realm.state || {};

    logKV("Last Ping", state.lastPing);
    logKV("Last Page", state.lastPage);
    logKV("Last URL", state.lastURL);
    logKV("Domain Class", state.lastDomainClass);

    logKV("Bands", JSON.stringify(state.bands));
    logKV("Flags", JSON.stringify(state.flags));

    logKV("Mutation Count", state.mutationCount);
    logKV("Images Decoded", state.imagesDecoded);
    logKV("GPU Warm Count", state.gpuWarmCount);

    logKV("Warm Paths Triggered", state.warmPathsTriggered);
    logKV("Warm Assets Triggered", state.warmAssetsTriggered);

    logKV("Navigation History", JSON.stringify(state.navHistory));
    logKV("Performance Entries", JSON.stringify(state.perfEntries));
  });
}

// ---------------------------------------------------------------------------
// ROUTER INSPECTOR
// ---------------------------------------------------------------------------
function pbLogRouterStatus() {
  logHeader("Router Status");

  chrome.runtime.sendMessage({ type: "PBSETTINGS_GET" }, (res) => {
    const s = res.settings;

    logKV("Router Enabled", s.enableRouter);
    logKV("Prioritize Home Universe", s.routerPrioritizeHomeUniverse);
    logKV("Prioritize CDN", s.routerPrioritizeCDN);
    logKV("Prioritize Assets", s.routerPrioritizeAssets);

    logKV("Rewrite Rules", s.routerRewriteRules);
    logKV("Reroute Rules", s.routerRerouteRules);

    logKV("Latency Scan", s.routerLatencyScan);
    logKV("Realm Scan", s.routerRealmScan);
    logKV("Fallback Scan", s.routerFallbackScan);

    logKV("Adaptive Routing", s.routerAdaptiveRouting);
    logKV("Home Universe", JSON.stringify(s.homeUniverse));
  });
}

// ---------------------------------------------------------------------------
// INTERCEPTOR INSPECTOR
// ---------------------------------------------------------------------------
function pbLogInterceptorStatus() {
  logHeader("Interceptor Status");

  chrome.runtime.sendMessage({ type: "PBSETTINGS_GET" }, (res) => {
    const s = res.settings;

    logKV("Interceptor Enabled", s.enableInterceptor);

    logKV("Block Trackers", s.blockTrackers);
    logKV("Block Analytics", s.blockAnalytics);
    logKV("Block Ads", s.blockAds);
    logKV("Block Fingerprinting", s.blockFingerprinting);

    logKV("Upgrade HTTP→HTTPS", s.upgradeHTTPtoHTTPS);
    logKV("Force HTTP/2", s.forceHTTP2);
    logKV("Force HTTP/3", s.forceHTTP3);
    logKV("Force QUIC", s.forceQUIC);
  });
}

// ---------------------------------------------------------------------------
// NAVIGATOR INSPECTOR
// ---------------------------------------------------------------------------
function pbLogNavigatorStatus() {
  logHeader("Navigator Status");

  chrome.runtime.sendMessage({ type: "PBSETTINGS_GET" }, (res) => {
    const s = res.settings;

    logKV("Navigator Enabled", s.enableNavigator);

    logKV("Warm Siblings", s.navWarmSiblings);
    logKV("Warm Assets", s.navWarmAssets);
    logKV("Warm Global Sites", s.navWarmGlobalSites);
    logKV("PulseWorld Priority", s.navPulseWorldPriority);

    logKV("Predictive Jump", s.navPredictiveJump);
    logKV("Temporal Shift", s.navTemporalShift);
  });
}

// ---------------------------------------------------------------------------
// ACCELERATOR INSPECTOR
// ---------------------------------------------------------------------------
function pbLogAcceleratorStatus() {
  logHeader("Accelerator Status");

  chrome.runtime.sendMessage({ type: "PBSETTINGS_GET" }, (res) => {
    const s = res.settings;

    logKV("Accelerator Enabled", s.enableAccelerator);

    logKV("Preconnect", s.accelPreconnect);
    logKV("Prefetch", s.accelPrefetch);
    logKV("Preload", s.accelPreload);

    logKV("Warm Path", s.accelWarmPath);
    logKV("GPU Warm", s.accelGPUWarm);
    logKV("Decode Warm", s.accelDecodeWarm);

    logKV("DNS Warm", s.accelDNSWarm);
    logKV("TLS Warm", s.accelTLSWarm);
    logKV("Realm Warm", s.accelRealmWarm);
  });
}

// ---------------------------------------------------------------------------
// CONTENT RUNTIME INSPECTOR
// ---------------------------------------------------------------------------
function pbLogContentRuntimeStatus() {
  logHeader("Content Runtime Status");

  chrome.runtime.sendMessage({ type: "PBSETTINGS_GET" }, (res) => {
    const s = res.settings;

    logKV("Content Runtime Enabled", s.enableContentRuntime);

    logKV("Mutation Observer", s.contentMutationObserver);
    logKV("Performance Observer", s.contentPerformanceObserver);

    logKV("GPU Warm", s.contentGPUWarm);
    logKV("Decode Warm", s.contentDecodeWarm);

    logKV("HUD Active", s.contentHUD);
  });
}

// ---------------------------------------------------------------------------
// DEV OVERLAY INSPECTOR
// ---------------------------------------------------------------------------
function pbLogDevOverlayStatus() {
  logHeader("DevOverlay Status");

  chrome.runtime.sendMessage({ type: "PBSETTINGS_GET" }, (res) => {
    const s = res.settings;

    logKV("DevOverlay Enabled", s.enableDevOverlay);
    logKV("HUD Active", s.contentHUD);
  });
}

// ---------------------------------------------------------------------------
// EXPERIMENTAL SYSTEM INSPECTOR
// ---------------------------------------------------------------------------
function pbLogExperimentalStatus() {
  logHeader("Experimental Systems");

  chrome.runtime.sendMessage({ type: "PBSETTINGS_GET" }, (res) => {
    const s = res.settings;

    logKV("GPU Paths", s.experimentalGPUPaths);
    logKV("Decode Paths", s.experimentalDecodePaths);
    logKV("Route Graph", s.experimentalRouteGraph);
    logKV("Predictive Prefetch", s.experimentalPredictivePrefetch);
    logKV("AI Warm Path", s.experimentalAIWarmPath);
    logKV("Temporal Navigation", s.experimentalTemporalNavigation);
    logKV("Quantum Routing", s.experimentalQuantumRouting);
    logKV("Portal Transitions", s.experimentalPortalTransitions);
    logKV("Mesh Awareness", s.experimentalMeshAwareness);
  });
}

// ---------------------------------------------------------------------------
// FULL OS DIAGNOSTIC DUMP
// ---------------------------------------------------------------------------
function pbDumpFullOS() {
  logHeader("FULL OS DIAGNOSTIC DUMP");

  pbLogKernelStatus();
  pbLogRouterStatus();
  pbLogInterceptorStatus();
  pbLogNavigatorStatus();
  pbLogAcceleratorStatus();
  pbLogContentRuntimeStatus();
  pbLogDevOverlayStatus();
  pbLogExperimentalStatus();
}

// ---------------------------------------------------------------------------
// MESSAGE API (Popup + Kernel + Content)
// ---------------------------------------------------------------------------
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || !msg.type) return;

  switch (msg.type) {

    case "PBDEV_STATUS":
      pbLogKernelStatus();
      sendResponse({ ok: true });
      break;

    case "PBDEV_ROUTER":
      pbLogRouterStatus();
      sendResponse({ ok: true });
      break;

    case "PBDEV_INTERCEPTOR":
      pbLogInterceptorStatus();
      sendResponse({ ok: true });
      break;

    case "PBDEV_NAVIGATOR":
      pbLogNavigatorStatus();
      sendResponse({ ok: true });
      break;

    case "PBDEV_ACCELERATOR":
      pbLogAcceleratorStatus();
      sendResponse({ ok: true });
      break;

    case "PBDEV_CONTENT":
      pbLogContentRuntimeStatus();
      sendResponse({ ok: true });
      break;

    case "PBDEV_OVERLAY":
      pbLogDevOverlayStatus();
      sendResponse({ ok: true });
      break;

    case "PBDEV_EXPERIMENTAL":
      pbLogExperimentalStatus();
      sendResponse({ ok: true });
      break;

    case "PBDEV_DUMP":
      pbDumpFullOS();
      sendResponse({ ok: true });
      break;
  }
});
