// ============================================================================
//  PBRealmBridge.js — PulseBrowser Realm Engine (Ultra Edition v4.0)
//  Full state sync between PBContent ↔ PBCompanion kernel ↔ DevOverlay/Popup
// ============================================================================

console.log("%c[PULSEBROWSER] PBRealmBridge (Ultra Edition v4.0) loaded",
  "color:#FF88FF; font-weight:bold; font-family:monospace;");

// ---------------------------------------------------------------------------
// REALM STATE (browser-side OS memory)
// ---------------------------------------------------------------------------
const PulseRealmState2 = {

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
  Object.assign(PulseRealmState2, partial);
  PulseRealmState2.lastPing = Date.now();
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
        lastPage: msg.page || PulseRealmState2.lastPage,
        bands: Object.assign({}, PulseRealmState2.bands, msg.bands || {}),
        lastPing: Date.now() || PulseRealmState2.lastPing
      });
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // NAVIGATION EVENT (from PBNavigator)
    // ---------------------------------------------------------
    case "PBNAV_EVENT":
      PulseRealmState2.lastURL = msg.url;
      PulseRealmState2.lastDomainClass = msg.domainClass;
      PulseRealmState2.navHistory.push(msg.url);
      PulseRealmState2.navEvents.push(msg);
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // PERFORMANCE EVENTS (from PBContent)
    // ---------------------------------------------------------
    case "PBCONTENT_PERF":
      PulseRealmState2.perfEntries = msg.entries || [];
      PulseRealmState2.perfLastNavigation = msg.ts || Date.now();
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // MUTATION EVENTS (from PBContent)
    // ---------------------------------------------------------
    case "PBCONTENT_MUTATION":
      PulseRealmState2.mutationCount += msg.count || 0;
      PulseRealmState2.lastMutationTS = msg.ts || Date.now();
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // GPU WARM-PATH (from PBContent / PBAccelerator)
    // ---------------------------------------------------------
    case "PBCONTENT_GPUWARM":
      PulseRealmState2.gpuWarmCount++;
      sendResponse({ ok: true });
      break;

    case "PBCONTENT_GPUWARM_EXTRA":
      PulseRealmState2.gpuWarmCount++;
      sendResponse({ ok: true });
      break;
    // ---------------------------------------------------------
    // IMAGE DECODE WARM-PATH (from PBContent)
    // ---------------------------------------------------------
    case "PBCONTENT_DECODEWARM":
      PulseRealmState2.imagesDecoded++;
      sendResponse({ ok: true });
      break;

    case "PBCONTENT_DECODEWARM_EXTRA":
      PulseRealmState2.imagesDecoded++;
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // WARM-PATH TRIGGERED (from PBAccelerator)
    // ---------------------------------------------------------
    case "PBACC_WARMPATH_EVENT":
      PulseRealmState2.warmPathsTriggered++;
      sendResponse({ ok: true });
      break;

    case "PBACC_WARMPATH":
      PulseRealmState2.warmPathsTriggered++;
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // ASSET WARM-PATH TRIGGERED
    // ---------------------------------------------------------
    case "PBACC_ASSETWARM_EVENT":
      PulseRealmState2.warmAssetsTriggered++;
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // SETTINGS SNAPSHOT (from PBSettings kernel)
    // ---------------------------------------------------------
    case "PBSETTINGS_SNAPSHOT":
      PulseRealmState2.settings = msg.settings || {};
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // FLAGS UPDATE (DevOverlay / kernel)
    // ---------------------------------------------------------
    case "PBREALM_FLAGS_UPDATE":
      PulseRealmState2.flags = Object.assign({}, PulseRealmState2.flags, msg.flags || {});
      sendResponse({ ok: true });
      break;

    // ---------------------------------------------------------
    // REALM GET (DevOverlay + Popup)
    // ---------------------------------------------------------
    case "PBREALM_GET":
      sendResponse({ ok: true, state: PulseRealmState2 });
      break;
  }
});
