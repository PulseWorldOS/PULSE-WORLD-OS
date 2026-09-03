// ============================================================================
//  PBRealmBridge.js — PulseBrowser Realm Engine (Ultra Edition v4.0)
//  Full state sync between PBContent ↔ PBCompanion kernel ↔ DevOverlay/Popup
// ============================================================================

console.log("%c[PULSEBROWSER] PBRealmBridge (Ultra Edition v4.0) loaded",
  "color:#FF88FF; font-weight:bold; font-family:monospace;");

// ---------------------------------------------------------------------------
// REALM STATE (browser-side OS memory)
// ---------------------------------------------------------------------------
const PulseRealmState = {

  // Core
  lastPing: null,
  lastPage: null,
  lastURL: null,
  lastDomainClass: null,

  // Navigation
  navHistory: [],
  navEvents: [],

  // Performance
  perfEntries: [],
  perfLastNavigation: null,

  // DOM
  mutationCount: 0,
  lastMutationTS: null,

  // Resources
  imagesDecoded: 0,
  gpuWarmCount: 0,

  // Bands (PulseWorld / OS)
  bands: {
    pulseBand: null,
    accelBand: null,
    routerBand: null,
    gpuBand: null,
    decodeBand: null,
    worldBand: null
  },

  // Warm-path
  warmPathsTriggered: 0,
  warmAssetsTriggered: 0,

  // Settings snapshot
  settings: {},

  // Flags
  flags: {
    hudActive: true,
    contentRuntimeActive: true,
    acceleratorActive: true,
    routerActive: true,
    navigatorActive: true
  }
};

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
function updateRealm(partial) {
  Object.assign(PulseRealmState, partial);
  PulseRealmState.lastPing = Date.now();
}

// ---------------------------------------------------------------------------
// MESSAGE CHANNEL (from PBContent.js, PBNavigator, PBAccelerator, DevOverlay)
// ---------------------------------------------------------------------------
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || !msg.type) return;

  switch (msg.type) {

    // ---------------------------------------------------------
    // PAGE CONTEXT UPDATE
    // ---------------------------------------------------------
    case "PBREALM_UPDATE":
      updateRealm({
        lastPage: msg.page || PulseRealmState.lastPage,
        bands: Object.assign({}, PulseRealmState.bands, msg.bands || {}),
        lastPing: Date.now() || PulseRealmState.lastPing
      });
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // NAVIGATION EVENT (from PBNavigator)
    // ---------------------------------------------------------
    case "PBNAV_EVENT":
      PulseRealmState.lastURL = msg.url;
      PulseRealmState.lastDomainClass = msg.domainClass;
      PulseRealmState.navHistory.push(msg.url);
      PulseRealmState.navEvents.push(msg);
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // PERFORMANCE EVENTS (from PBContent)
    // ---------------------------------------------------------
    case "PBCONTENT_PERF":
      PulseRealmState.perfEntries = msg.entries || [];
      PulseRealmState.perfLastNavigation = msg.ts || Date.now();
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // MUTATION EVENTS (from PBContent)
    // ---------------------------------------------------------
    case "PBCONTENT_MUTATION":
      PulseRealmState.mutationCount += msg.count || 0;
      PulseRealmState.lastMutationTS = msg.ts || Date.now();
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // GPU WARM-PATH (from PBContent / PBAccelerator)
    // ---------------------------------------------------------
    case "PBCONTENT_GPUWARM":
      PulseRealmState.gpuWarmCount++;
      sendResponse({ ok: true });
      break;

    case "PBCONTENT_GPUWARM_EXTRA":
      PulseRealmState.gpuWarmCount++;
      sendResponse({ ok: true });
      break;
    // ---------------------------------------------------------
    // IMAGE DECODE WARM-PATH (from PBContent)
    // ---------------------------------------------------------
    case "PBCONTENT_DECODEWARM":
      PulseRealmState.imagesDecoded++;
      sendResponse({ ok: true });
      break;

    case "PBCONTENT_DECODEWARM_EXTRA":
      PulseRealmState.imagesDecoded++;
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // WARM-PATH TRIGGERED (from PBAccelerator)
    // ---------------------------------------------------------
    case "PBACC_WARMPATH_EVENT":
      PulseRealmState.warmPathsTriggered++;
      sendResponse({ ok: true });
      break;

    case "PBACC_WARMPATH":
      PulseRealmState.warmPathsTriggered++;
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // ASSET WARM-PATH TRIGGERED
    // ---------------------------------------------------------
    case "PBACC_ASSETWARM_EVENT":
      PulseRealmState.warmAssetsTriggered++;
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // SETTINGS SNAPSHOT (from PBSettings kernel)
    // ---------------------------------------------------------
    case "PBSETTINGS_SNAPSHOT":
      PulseRealmState.settings = msg.settings || {};
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // FLAGS UPDATE (DevOverlay / kernel)
    // ---------------------------------------------------------
    case "PBREALM_FLAGS_UPDATE":
      PulseRealmState.flags = Object.assign({}, PulseRealmState.flags, msg.flags || {});
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // REALM GET (DevOverlay + Popup)
    // ---------------------------------------------------------
    case "PBREALM_GET":
      sendResponse({ ok: true, state: PulseRealmState });
      break;
  }
});
