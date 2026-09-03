// ============================================================================
// FILE: /PulseWorldPower-v32-IMMORTAL-CONTINUANCE-ONEBAND-PORTv2.js
// LAYER: PULSE-PORTAL — PRESENTATION / POWER LAYER (IMMORTAL v32 ONEBAND + PORTv2)
// ----------------------------------------------------------------------------
// ROLE (v32-IMMORTAL-CONTINUANCE-ONEBAND-PORTv2):
//   - Unified “Power” organ for Pulse‑World‑OS v32 (one‑band, binary‑aware, Port v2–aware).
//   - Bridges Touch → CoreMemory → ProtocolPort v2 → ProtocolWorld/World‑OS/Continuance in one band.
//   - Reads navState + worldRuntimeFrame via ProtocolPort v2 to drive prewarm + GPU/Proxy/Earn.
//   - Emits DOM + GPU + Proxy + Earn + Continuance prewarm hints.
//   - OneBand lanes: front/back/AI/backend/GPU/Proxy/Earn/Continuance in one field.
//   - Deterministic, symbolic‑first, binary‑backed, no network logic here.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import { PulseVitalsLogger as logger, PulseVitalsMonitor, pulseLog, PulseUIFlow as initUIFlow, db, setdoc, getdoc, doc, log, warn, error} from "../../../../../_PROOF/PULSE-PROOF.js";

import {createProtocolPort as getProtocolPort} from "../PULSE-PROTOCOL/PULSE-PROTOCOL.js";
import { PulseCoreGMemory } from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";





// ---------------------------------------------------------------------------
// UNIVERSAL CORE MEMORY BRIDGE (preserved)
// ---------------------------------------------------------------------------

let coreMemory = new Proxy({}, { get: (t, p) => { try { return PulseCoreGMemory[p]; } catch(e) { return (PulseRealm?.PulseCoreMemory || {})[p]; } } });

function cmRead(key, fallback = null) {
  if (!coreMemory || typeof coreMemory.read !== "function") return fallback;
  try {
    const v = coreMemory.read(key);
    return v == null ? fallback : v;
  } catch {
    return fallback;
  }
}

function cmWrite(key, value) {
  if (!coreMemory || typeof coreMemory.write !== "function") return false;
  try {
    return coreMemory.write(key, value);
  } catch {
    return false;
  }
}

function cmStart() {
  if (!coreMemory || typeof coreMemory.start !== "function") return false;
  try {
    return coreMemory.start();
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// CONSTANTS / KEYS (v32 ONEBAND + PORTv2)
// ---------------------------------------------------------------------------

const POWER_ROUTE_KEY = "pulse:power:v32:oneband:portv2";

const KEY_POWER_STATE        = `${POWER_ROUTE_KEY}:state`;
const KEY_POWER_HISTORY      = `${POWER_ROUTE_KEY}:history`;
const KEY_POWER_PREDICTIONS  = `${POWER_ROUTE_KEY}:predictions`;
const KEY_POWER_ASSETS       = `${POWER_ROUTE_KEY}:assets`;
const KEY_POWER_CHUNK_HINTS  = `${POWER_ROUTE_KEY}:chunkHints`;
const KEY_POWER_ACTNOW_HINT  = `${POWER_ROUTE_KEY}:actnowHints`;
const KEY_POWER_GPU_HINTS    = `${POWER_ROUTE_KEY}:gpuHints`;
const KEY_POWER_PROXY_HINTS  = `${POWER_ROUTE_KEY}:proxyHints`;
const KEY_POWER_EARN_HINTS   = `${POWER_ROUTE_KEY}:earnHints`;
const KEY_POWER_CONT_HINTS   = `${POWER_ROUTE_KEY}:continuanceHints`;
const KEY_POWER_BINARY_FIELD = `${POWER_ROUTE_KEY}:binaryField`;

// v32: we read runtime/world state via ProtocolPort v2
const WORLD_ROUTE_KEY = "protocol-world-v2";

// OneBand: all lanes live in a single canonical field
const DEFAULT_ONEBAND_LANES_V32 = {
  version: "v32-IMMORTAL-CONTINUANCE-ONEBAND-PORTv2",
  // CNS lanes
  frontChunkLanes: 64,
  backChunkLanes: 64,
  aiChunkLanes: 64,
  backendChunkLanes: 64,
  // World‑OS lanes
  gpuLanes: 32,
  proxyLanes: 32,
  earnLanes: 32,
  memoryLanes: 32,
  // Continuance / nav lanes
  continuanceLanes: 32,
  navLanes: 32,
  // Binary substrate lanes
  binaryFrameLanes: 64,
  worldWaveLanes: 32
};

// ---------------------------------------------------------------------------
// HELPERS (preserved)
// ---------------------------------------------------------------------------

function nowTs() {
  return Date.now ? PulseRealm.PulseNOW : 0;
}

function clone(obj) {
  try {
    return JSON.parse(JSON.stringify(obj || {}));
  } catch {
    return {};
  }
}

function uniqueList(list) {
  const seen = new Set();
  const out = [];
  for (const v of list || []) {
    if (v == null) continue;
    const s = String(v);
    if (seen.has(s)) continue;
    seen.add(s);
    out.push(s);
  }
  return out;
}

function safePush(list, value) {
  if (!value && value !== 0) return;
  list.push(value);
}

// ---------------------------------------------------------------------------
// WORLD / RUNTIME STATE (v32) — via ProtocolPort v2
// ---------------------------------------------------------------------------

function loadWorldStateV32() {
  try {
    const port = getProtocolPort();
    if (!port || typeof port.getWorldState !== "function") return null;
    // getWorldState returns { world: WorldContext, runtimeState }
    return port.getWorldState();
  } catch {
    return null;
  }
}

function extractRuntimeStateFromWorld(worldState) {
  return worldState.runtimeState || null;
}

function extractNavStateFromRuntime(runtimeState) {
  const plan = runtimeState.plan || null;
  const exec = runtimeState.execResults || null;

  const navState =
    runtimeState.planSummary.navState ||
    runtimeState.execResults.navState ||
    plan.navState ||
    exec.navState ||
    null;

  return navState || {
    currentPageId: null,
    targetPageId: null,
    transitionState: "idle"
  };
}

function extractHotPagesFromWorldRuntimeFrame(runtimeState) {
  const frame = runtimeState.worldRuntimeFramePayload || null;
  const hotPages =
    runtimeState.hotPages ||
    runtimeState.worldRuntimeFrame.hotPages ||
    frame.hotPages ||
    null;

  if (!hotPages || typeof hotPages !== "object") return [];
  return Object.keys(hotPages);
}

// ---------------------------------------------------------------------------
// POWER STATE LOAD / SAVE (v32)
// ---------------------------------------------------------------------------

function loadPowerState() {
  const state = cmRead(KEY_POWER_STATE, null);
  if (state && typeof state === "object") return state;

  const worldState = loadWorldStateV32();
  const runtimeState = extractRuntimeStateFromWorld(worldState);
  const navState = extractNavStateFromRuntime(runtimeState);

  const fresh = {
    currentPageId: navState.currentPageId || null,
    currentRoute: null,
    lastTouchTs: 0,
    oneBandLanes: clone(DEFAULT_ONEBAND_LANES_V32),
    // world‑os hints
    lastGpuMode: null,
    lastProxyMode: null,
    lastEarnMode: null,
    lastMemoryMode: null,
    // nav / continuance
    navState
  };
  cmWrite(KEY_POWER_STATE, fresh);
  return fresh;
}

function savePowerState(state) {
  cmWrite(KEY_POWER_STATE, state);
}

function loadPowerHistory() {
  const hist = cmRead(KEY_POWER_HISTORY, null);
  if (hist && typeof hist === "object") return hist;
  const fresh = { pages: [], routes: [] };
  cmWrite(KEY_POWER_HISTORY, fresh);
  return fresh;
}

function savePowerHistory(hist) {
  cmWrite(KEY_POWER_HISTORY, hist);
}

function loadPowerPredictions() {
  const pred = cmRead(KEY_POWER_PREDICTIONS, null);
  if (pred && typeof pred === "object") return pred;
  const fresh = { nextPages: [], nextRoutes: [] };
  cmWrite(KEY_POWER_PREDICTIONS, fresh);
  return fresh;
}

function savePowerPredictions(pred) {
  cmWrite(KEY_POWER_PREDICTIONS, pred);
}

function loadPowerAssets() {
  const assets = cmRead(KEY_POWER_ASSETS, null);
  if (assets && typeof assets === "object") return assets;
  const fresh = { byPage: {} };
  cmWrite(KEY_POWER_ASSETS, fresh);
  return fresh;
}

function savePowerAssets(assets) {
  cmWrite(KEY_POWER_ASSETS, assets);
}

function saveChunkHints(hints) {
  cmWrite(KEY_POWER_CHUNK_HINTS, hints);
}

function saveActNowHints(hints) {
  cmWrite(KEY_POWER_ACTNOW_HINT, hints);
}

function saveGpuHints(hints) {
  cmWrite(KEY_POWER_GPU_HINTS, hints);
}

function saveProxyHints(hints) {
  cmWrite(KEY_POWER_PROXY_HINTS, hints);
}

function saveEarnHints(hints) {
  cmWrite(KEY_POWER_EARN_HINTS, hints);
}

function saveContinuanceHints(hints) {
  cmWrite(KEY_POWER_CONT_HINTS, hints);
}

function saveBinaryField(field) {
  cmWrite(KEY_POWER_BINARY_FIELD, field);
}

// ---------------------------------------------------------------------------
// HISTORY / PREDICTION (v32)
// ---------------------------------------------------------------------------

function updateHistoryAndPredictions({ pageId, route, runtimeState }) {
  const history = loadPowerHistory();
  const predictions = loadPowerPredictions();

  if (pageId) safePush(history.pages, pageId);
  if (route) safePush(history.routes, route);

  history.pages = history.pages.slice(-256);
  history.routes = history.routes.slice(-256);

  const nextPagesFromHistory = history.pages.slice(-16);
  const nextRoutesFromHistory = history.routes.slice(-16);

  const hotPages = extractHotPagesFromWorldRuntimeFrame(runtimeState);

  const nextPages = uniqueList([
    ...(nextPagesFromHistory || []),
    ...(hotPages || [])
  ]);

  const nextRoutes = uniqueList(nextRoutesFromHistory || []);

  predictions.nextPages = nextPages;
  predictions.nextRoutes = nextRoutes;

  savePowerHistory(history);
  savePowerPredictions(predictions);

  return { history, predictions };
}

// ---------------------------------------------------------------------------
// ASSET REGISTRATION + PREWARM (preserved)
// ---------------------------------------------------------------------------

function registerPageAssets(pageId, assets = {}) {
  if (!pageId) return;

  const powerAssets = loadPowerAssets();
  const byPage = powerAssets.byPage || {};

  const existing = byPage[pageId] || {
    images: [],
    fonts: [],
    scripts: [],
    styles: []
  };

  const merged = {
    images: uniqueList([...(existing.images || []), ...(assets.images || [])]),
    fonts: uniqueList([...(existing.fonts || []), ...(assets.fonts || [])]),
    scripts: uniqueList([
      ...(existing.scripts || []),
      ...(assets.scripts || [])
    ]),
    styles: uniqueList([...(existing.styles || []), ...(assets.styles || [])])
  };

  byPage[pageId] = merged;
  powerAssets.byPage = byPage;
  savePowerAssets(powerAssets);
}

function collectPrewarmAssets(predictions) {
  const powerAssets = loadPowerAssets();
  const byPage = powerAssets.byPage || {};

  const images = [];
  const fonts = [];
  const scripts = [];
  const styles = [];

  for (const pid of predictions.nextPages || []) {
    const a = byPage[pid];
    if (!a) continue;
    for (const img of a.images || []) safePush(images, img);
    for (const f of a.fonts || []) safePush(fonts, f);
    for (const s of a.scripts || []) safePush(scripts, s);
    for (const st of a.styles || []) safePush(styles, st);
  }

  return {
    images: uniqueList(images),
    fonts: uniqueList(fonts),
    scripts: uniqueList(scripts),
    styles: uniqueList(styles)
  };
}

// ---------------------------------------------------------------------------
// ONEBAND CHUNK / GPU / PROXY / EARN / CONTINUANCE HINTS (v32)
// ---------------------------------------------------------------------------

function buildOneBandChunkHints({ state, predictions, assets }) {
  const lanes = state.oneBandLanes || clone(DEFAULT_ONEBAND_LANES_V32);

  const prewarmTargets = {
    pages: uniqueList(predictions.nextPages || []),
    routes: uniqueList(predictions.nextRoutes || []),
    images: uniqueList(assets.images || []),
    fonts: uniqueList(assets.fonts || []),
    scripts: uniqueList(assets.scripts || []),
    styles: uniqueList(assets.styles || [])
  };

  const hints = {
    version: "v32-IMMORTAL-CONTINUANCE-ONEBAND-PORTv2",
    lanes,
    prewarmTargets
  };

  saveChunkHints(hints);
  return hints;
}

function buildActNowHints({ predictions, navState }) {
  const hints = {
    version: "v32-IMMORTAL-CONTINUANCE-ONEBAND-PORTv2",
    renewalSuggested: true,
    renewalKind: "frontend_hot_swap",
    renewalBand: "oneband",
    candidateRoutes: uniqueList(predictions.nextRoutes || []),
    candidatePages: uniqueList(predictions.nextPages || []),
    navState: navState || null
  };

  saveActNowHints(hints);
  return hints;
}

function buildGpuHints({ predictions, runtimeState }) {
  const hints = {
    version: "v32-IMMORTAL-CONTINUANCE-ONEBAND-PORTv2",
    mode: "gpu-prewarm",
    targetPages: uniqueList(predictions.nextPages || []),
    targetRoutes: uniqueList(predictions.nextRoutes || []),
    lanes: "oneband",
    hotGpu: runtimeState.hotGpu || null,
    hotAdvantageTier: runtimeState.hotAdvantageTier || null,
    hotThroughputClass: runtimeState.hotThroughputClass || null
  };
  saveGpuHints(hints);
  return hints;
}

function buildProxyHints({ predictions, runtimeState }) {
  const hints = {
    version: "v32-IMMORTAL-CONTINUANCE-ONEBAND-PORTv2",
    mode: "proxy-prewarm",
    proxyBand: "binary",
    targetRoutes: uniqueList(predictions.nextRoutes || []),
    lanes: "oneband",
    hotProxy: runtimeState.hotProxy || null
  };
  saveProxyHints(hints);
  return hints;
}

function buildEarnHints({ predictions, runtimeState }) {
  const hints = {
    version: "v32-IMMORTAL-CONTINUANCE-ONEBAND-PORTv2",
    mode: "earn-prewarm",
    earnBand: "world-earn",
    candidatePages: uniqueList(predictions.nextPages || []),
    lanes: "oneband",
    hotEarn: runtimeState.hotEarn || null
  };
  saveEarnHints(hints);
  return hints;
}

function buildContinuanceHints({ navState, runtimeState }) {
  const hints = {
    version: "v32-IMMORTAL-CONTINUANCE-ONEBAND-PORTv2",
    navState: navState || null,
    logicalClock: runtimeState.logicalClock || null,
    tick: runtimeState.tick || null,
    bandUsage: runtimeState.bandUsage || null,
    cacheHits: runtimeState.cacheHits || null,
    cacheMisses: runtimeState.cacheMisses || null
  };
  saveContinuanceHints(hints);
  return hints;
}

// ---------------------------------------------------------------------------
// BINARY FIELD — ONEBAND SNAPSHOT FOR WORLD‑OS / RUNTIME (v32)
// ---------------------------------------------------------------------------

function buildBinaryField({
  state,
  predictions,
  prewarmAssets,
  chunkHints,
  actNowHints,
  gpuHints,
  proxyHints,
  earnHints,
  continuanceHints,
  runtimeState,
  worldState
}) {
  const field = {
    version: "v32-IMMORTAL-CONTINUANCE-ONEBAND-PORTv2",
    route: state.currentRoute,
    pageId: state.currentPageId,
    lastTouchTs: state.lastTouchTs,
    lanes: state.oneBandLanes,
    navState: state.navState || null,
    predictions,
    prewarmAssets,
    chunkHints,
    actNowHints,
    gpuHints,
    proxyHints,
    earnHints,
    continuanceHints,
    worldRuntimeFrame: runtimeState.worldRuntimeFrame || null,
    worldContext: worldState.world || null
  };

  saveBinaryField(field);
  return field;
}

// ---------------------------------------------------------------------------
// DOM INTEGRATION (presentation only, v32)
// ---------------------------------------------------------------------------

function safeDoc(doc) {
  if (!doc) return document;
  return doc || null;
}

function ensureHead(doc) {
  const d = safeDoc(doc);
  if (!d) return null;
  return d.head || d.getElementsByTagName("head")[0] || null;
}

function createLink(doc, attrs) {
  const d = safeDoc(doc);
  if (!d) return null;
  const el = d.createElement("link");
  Object.entries(attrs || {}).forEach(([k, v]) => {
    if (v == null) return;
    el.setAttribute(k, String(v));
  });
  return el;
}

function applyPrewarmToDOM({ predictions, assets, navState }, doc) {
  const d = safeDoc(doc);
  const head = ensureHead(d);
  if (!d || !head) return;

  if (d.body) {
    d.body.setAttribute(
      "data-pulse-power-version",
      PulseRealm.PULSE_TOUCH_VERSION || "v32-IMMORTAL-CONTINUANCE-ONEBAND-PORTv2"
    );
    d.body.setAttribute(
      "data-pulse-power-next-pages",
      (predictions.nextPages || []).join(",")
    );
    d.body.setAttribute(
      "data-pulse-power-next-routes",
      (predictions.nextRoutes || []).join(",")
    );
    d.body.setAttribute(
      "data-pulse-nav-current",
      navState.currentPageId || ""
    );
    d.body.setAttribute(
      "data-pulse-nav-target",
      navState.targetPageId || ""
    );
    d.body.setAttribute(
      "data-pulse-nav-transition",
      navState.transitionState || "idle"
    );
  }

  for (const img of assets.images || []) {
    const link = createLink(d, {
      rel: "preload",
      as: "image",
      href: img
    });
    if (link) head.appendChild(link);
  }

  for (const font of assets.fonts || []) {
    const link = createLink(d, {
      rel: "preload",
      as: "font",
      href: font,
      crossorigin: "anonymous"
    });
    if (link) head.appendChild(link);
  }
}

// ---------------------------------------------------------------------------
// TOUCH / ENTRYPOINT — v32 ONEBAND + PORTv2
// ---------------------------------------------------------------------------

export function pulsePowerTouchV32({
  pageId,
  route,
  assets,
  doc,
  gpuMode = null,
  proxyMode = null,
  earnMode = null,
  memoryMode = null
} = {}) {
  cmStart();

  const worldState = loadWorldStateV32();
  const runtimeState = extractRuntimeStateFromWorld(worldState);
  const navStateFromRuntime = extractNavStateFromRuntime(runtimeState);

  const state = loadPowerState();
  state.currentPageId =
    pageId ||
    navStateFromRuntime.currentPageId ||
    state.currentPageId ||
    null;
  state.currentRoute = route || state.currentRoute || null;
  state.lastTouchTs = nowTs();
  state.lastGpuMode = gpuMode || state.lastGpuMode || null;
  state.lastProxyMode = proxyMode || state.lastProxyMode || null;
  state.lastEarnMode = earnMode || state.lastEarnMode || null;
  state.lastMemoryMode = memoryMode || state.lastMemoryMode || null;
  state.navState = {
    currentPageId: state.currentPageId,
    targetPageId: navStateFromRuntime.targetPageId || null,
    transitionState: navStateFromRuntime.transitionState || "idle"
  };
  savePowerState(state);

  if (state.currentPageId && assets) {
    registerPageAssets(state.currentPageId, assets);
  }

  const { predictions } = updateHistoryAndPredictions({
    pageId: state.currentPageId,
    route: state.currentRoute,
    runtimeState
  });

  const prewarmAssets = collectPrewarmAssets(predictions);
  const chunkHints = buildOneBandChunkHints({
    state,
    predictions,
    assets: prewarmAssets
  });
  const actNowHints = buildActNowHints({
    predictions,
    navState: state.navState
  });
  const gpuHints = buildGpuHints({ predictions, runtimeState });
  const proxyHints = buildProxyHints({ predictions, runtimeState });
  const earnHints = buildEarnHints({ predictions, runtimeState });
  const continuanceHints = buildContinuanceHints({
    navState: state.navState,
    runtimeState
  });

  applyPrewarmToDOM(
    { predictions, assets: prewarmAssets, navState: state.navState },
    doc
  );

  const binaryField = buildBinaryField({
    state,
    predictions,
    prewarmAssets,
    chunkHints,
    actNowHints,
    gpuHints,
    proxyHints,
    earnHints,
    continuanceHints,
    runtimeState,
    worldState
  });

  return {
    ok: true,
    role: "pulse-power-v32-oneband-portv2",
    state,
    predictions,
    prewarmAssets,
    chunkHints,
    actNowHints,
    gpuHints,
    proxyHints,
    earnHints,
    continuanceHints,
    binaryField
  };
}

// ---------------------------------------------------------------------------
// FULL POWER SNAPSHOT (v32 ONEBAND + PORTv2)
// ---------------------------------------------------------------------------

export function getPulsePowerSnapshotV32() {
  const state = loadPowerState();
  const history = loadPowerHistory();
  const predictions = loadPowerPredictions();
  const assets = loadPowerAssets();
  const worldState = loadWorldStateV32();
  const runtimeState = extractRuntimeStateFromWorld(worldState);

  const chunkHints = cmRead(KEY_POWER_CHUNK_HINTS, {
    version: "v32-IMMORTAL-CONTINUANCE-ONEBAND-PORTv2",
    lanes: clone(DEFAULT_ONEBAND_LANES_V32),
    prewarmTargets: {
      pages: [],
      routes: [],
      images: [],
      fonts: [],
      scripts: [],
      styles: []
    }
  });
  const actNowHints = cmRead(KEY_POWER_ACTNOW_HINT, {
    version: "v32-IMMORTAL-CONTINUANCE-ONEBAND-PORTv2",
    renewalSuggested: false,
    renewalKind: "frontend_hot_swap",
    renewalBand: "oneband",
    candidateRoutes: [],
    candidatePages: [],
    navState: state.navState || null
  });
  const gpuHints = cmRead(KEY_POWER_GPU_HINTS, {
    version: "v32-IMMORTAL-CONTINUANCE-ONEBAND-PORTv2",
    mode: "gpu-prewarm",
    targetPages: [],
    targetRoutes: [],
    lanes: "oneband"
  });
  const proxyHints = cmRead(KEY_POWER_PROXY_HINTS, {
    version: "v32-IMMORTAL-CONTINUANCE-ONEBAND-PORTv2",
    mode: "proxy-prewarm",
    proxyBand: "binary",
    targetRoutes: [],
    lanes: "oneband"
  });
  const earnHints = cmRead(KEY_POWER_EARN_HINTS, {
    version: "v32-IMMORTAL-CONTINUANCE-ONEBAND-PORTv2",
    mode: "earn-prewarm",
    earnBand: "world-earn",
    candidatePages: [],
    lanes: "oneband"
  });
  const continuanceHints = cmRead(KEY_POWER_CONT_HINTS, {
    version: "v32-IMMORTAL-CONTINUANCE-ONEBAND-PORTv2",
    navState: state.navState || null,
    logicalClock: runtimeState.logicalClock || null,
    tick: runtimeState.tick || null,
    bandUsage: runtimeState.bandUsage || null,
    cacheHits: runtimeState.cacheHits || null,
    cacheMisses: runtimeState.cacheMisses || null
  });
  const binaryField = cmRead(KEY_POWER_BINARY_FIELD, null);

  return {
    role: "pulse-power-v32-oneband-portv2",
    state,
    history,
    predictions,
    assets,
    chunkHints,
    actNowHints,
    gpuHints,
    proxyHints,
    earnHints,
    continuanceHints,
    binaryField,
    runtimeState,
    worldState
  };
}

// ---------------------------------------------------------------------------
// DEFAULT EXPORT
// ---------------------------------------------------------------------------

export const PulsePowerAPIv32 = {
  pulsePowerTouchV32,
  getPulsePowerSnapshotV32
};

export default PulsePowerAPIv32;

PulseRealm.WorldPower = {
  PulsePowerAPIv32,
  getPulsePowerSnapshotV32,
  pulsePowerTouchV32,
  DEFAULT_ONEBAND_LANES_V32,
  WORLD_ROUTE_KEY
}