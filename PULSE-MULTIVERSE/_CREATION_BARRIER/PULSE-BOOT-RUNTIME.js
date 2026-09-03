/*
===============================================================================
FILE: /PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PulseUIRuntime-v30-Immortal-Evo++++.js
PULSE OS — v30-IMMORTAL-EVO++++
UI RUNTIME — DOM APPLICATOR FOR BLUEPRINTS / EVIDENCE-AWARE / FLOW-AWARE
Offline-First • IndexedDB+CoreMemory Mirrored • Replay-Aware
Route-Aware • Session-Aware • PulseBand-Aware • Portal-Aware
Diagnostics-Aware • ErrorSpine-Aware • Future-Evolution-Ready
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseUIRuntime",
  version: "v30-Immortal-Evo++++",
  layer: "pulse_ui",
  role: "ui_runtime_dom_applicator",
  lineage: "PulseUIRuntime-v20 → v24-Immortal-Evo+++ → v30-Immortal-Evo++++",

  evo: {
    runtimeOrgan: true,
    domAware: true,
    animationAware: true,
    comfortPatternAware: true,
    routeAware: true,
    blueprintAware: true,
    styleBundleAware: true,
    animationBundleAware: true,
    runtimeHintsAware: true,

    deterministic: true,
    driftProof: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    // v30 IMMORTAL
    offlineFirst: true,
    indexedDBMirrored: true,
    replayAware: true,
    modeAgnostic: true,
    diagnosticsAware: true,
    evidenceAware: true,
    adminPanelAware: true,
    uiErrorSpineV20Aware: true,
    uiFlowAware: true,
    trustFabricAware: true,
    pulseBandAware: true,
    portalAware: true,
    timeAxisAware: true,
    sessionAware: true,
    advantageAware: true
  },

  contract: {
    always: [
      "PulseWindow",
      "PulsePresence",
      "PulseChunks",
      "PulseUIFlow",
      "PulseUIErrors",
      "PulseProofBridge",
      "PulseCore.Memory",
      "PulseWorldAdminPanel",
      "AdminDiagnosticsOrgan",
      "PulsePortal",
      "PulseBand"
    ],
    never: [
      "legacyUIRuntime",
      "safeRoute",
      "fetchViaCNS",
      "directNetworkCalls",
      "filesystemWrites"
    ]
  }
}
===============================================================================
EXPORT_META = {
  organ: "PulseUIRuntime",
  layer: "pulse_ui",
  stability: "IMMORTAL",
  deterministic: true,
  pure: false, // DOM side-effects only
  consumes: [
    "CompiledBlueprint",
    "StyleBundle",
    "AnimationBundle",
    "RuntimeHints",
    "UIFlowStateSnapshot"
  ],
  produces: [
    "UIRuntimeMountEnvelope",
    "UIRuntimeDiagnosticsEnvelope"
  ],
  sideEffects: "dom_and_indexeddb_and_corememory_write_only",
  network: "none",
  filesystem: "none"
}
===============================================================================
*/
import {PulseWorldTrustCore} from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-TRUST/PulseTrustCore-v33.js";
import { PulseCoreGMemory } from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";
import { PulsePortalAPI } from "./PULSE-BOOT-PORTAL.js";
console.log("🌐 PULSE MULTIVERSAL BOOT v40.0 — %c[PulseBootRuntime v30] %cDOM Applicator for Blueprint Running..",
  "color:#EF5350; font-weight:bold; font-family:monospace;",
  "color:#00FF9C; font-family:monospace;"
);
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

// ============================================================================
// GLOBAL HANDLE + CORE MEMORY BRIDGE (IMMORTAL++ — NO DIRECT IMPORTS)
// ============================================================================



// ============================================================================
// IMMORTAL++ BRIDGE RESOLUTION — NEVER IMPORT, NEVER TDZ
// ============================================================================

function getBridge() {
  try {
    return PulseRealm.PulseProofBridge || null;
  } catch {
    return null;
  }
}

function getCoreMemory() {
  return typeof PulseCoreGMemory !== "undefined" ? PulseCoreGMemory : PulseRealm?.PulseCoreGMemory || null;
}

function getTrust() {
  return typeof PulseWorldTrustCore !== "undefined" ? PulseWorldTrustCore : PulseRealm?.PulseWorldTrustCore || null;
}

const CoreMemory = new Proxy({}, {
  get(target, prop) {
    const cm = getCoreMemory();
    if (cm && typeof cm[prop] === 'function') {
      return cm[prop].bind(cm);
    }
    return cm ? cm[prop] : undefined;
  }
});

const Trust = new Proxy({}, {
  get(target, prop) {
    const t = getTrust();
    if (t && typeof t[prop] === 'function') {
      return t[prop].bind(t);
    }
    return t ? t[prop] : undefined;
  }
});

// ============================================================================
// IMMORTAL INDEXEDDB MIRROR — PulseUIRuntimeStore v30
// ============================================================================

const RUNTIME_SCHEMA_VERSION = "v5";
const UIRUNTIME_DB_NAME = "PulseUIRuntimeDB";
const UIRUNTIME_STORE_NAME = "runtime";
const UIRUNTIME_MEM_MAX = 4000;

let runtimeMemBuffer = [];

// Open or create IndexedDB
function openUIRuntimeDB() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      resolve(null);
      return;
    }

    const req = indexedDB.open(UIRUNTIME_DB_NAME, 1);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(UIRUNTIME_STORE_NAME)) {
        db.createObjectStore(UIRUNTIME_STORE_NAME, {
          keyPath: "id",
          autoIncrement: true
        });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function loadRuntimeBufferFromDB(limit = UIRUNTIME_MEM_MAX) {
  try {
    const db = await openUIRuntimeDB();
    if (!db) return [];

    const tx = db.transaction(UIRUNTIME_STORE_NAME, "readonly");
    const store = tx.objectStore(UIRUNTIME_STORE_NAME);

    const results = [];
    const req = store.openCursor(null, "next");

    return await new Promise((resolve) => {
      req.onsuccess = () => {
        const cursor = req.result;
        if (!cursor) {
          const trimmed =
            results.length > limit
              ? results.slice(results.length - limit)
              : results;
          resolve(trimmed);
          return;
        }
        results.push(cursor.value);
        cursor.continue();
      };
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

function appendRuntimeRecordToDB(entry) {
  (async () => {
    try {
      const db = await openUIRuntimeDB();
      if (!db) return;

      const tx = db.transaction(UIRUNTIME_STORE_NAME, "readwrite");
      const store = tx.objectStore(UIRUNTIME_STORE_NAME);
      store.add(entry);

      tx.oncomplete = () => {};
      tx.onerror = () => {};
    } catch {
      // never throw
    }
  })();
}

function clearRuntimeDB() {
  (async () => {
    try {
      const db = await openUIRuntimeDB();
      if (!db) return;

      const tx = db.transaction(UIRUNTIME_STORE_NAME, "readwrite");
      const store = tx.objectStore(UIRUNTIME_STORE_NAME);
      store.clear();

      tx.oncomplete = () => {};
      tx.onerror = () => {};
    } catch {
      // never throw
    }
  })();
}

(async () => {
  try {
    const buf = await loadRuntimeBufferFromDB(UIRUNTIME_MEM_MAX);
    runtimeMemBuffer = buf;
  } catch {
    runtimeMemBuffer = [];
  }
})();

function appendRuntimeRecord(kind, payload) {
  const entry = {
    ts: PulseRealm.PulseNOW,
    schemaVersion: RUNTIME_SCHEMA_VERSION,
    kind,
    payload
  };

  runtimeMemBuffer.push(entry);
  if (runtimeMemBuffer.length > UIRUNTIME_MEM_MAX) {
    runtimeMemBuffer = runtimeMemBuffer.slice(
      runtimeMemBuffer.length - UIRUNTIME_MEM_MAX
    );
  }

  appendRuntimeRecordToDB(entry);
}

export const PulseUIRuntimeStore = {
  async getAll() {
    const fromDB = loadRuntimeBufferFromDB(UIRUNTIME_MEM_MAX);
    return fromDB;
  },
  tail(n = 200) {
    const buf = runtimeMemBuffer || [];
    return buf.slice(Math.max(0, buf.length - n));
  },
  clear() {
    runtimeMemBuffer = [];
    clearRuntimeDB();
    try {
      CoreMemory.setRouteSnapshot("uiRuntime", {
        schemaVersion: RUNTIME_SCHEMA_VERSION,
        version: "30.0-Immortal-Evo++++",
        routeId: "uiRuntime",
        buffer: [],
        cleared: true,
        timestamp: PulseRealm.PulseNOW
      });
    } catch {}
  }
};

// ============================================================================
// SURFACE CONTEXT — PORTAL / PULSEBAND / SESSION
// ============================================================================


function readSurfaceContext() {
  try {
    const portal = PulsePortalAPI || null;
    const meta = portal.meta || null;

    const route = `/${PulseRealm.__PULSE_CURRENT_PAGE__}` || meta.route || null;


    const band =
      PulseRealm.PulseBand.mode ||
      null;

    const sessionId =
      PulseRealm.PulseBand.sessionId ||
      null;

    return {
      route,
      surface: meta.pulseRole.identity || "unknown-surface",
      band,
      sessionId
    };
  } catch {
    return {
      route: null,
      surface: "unknown-surface",
      band: null,
      sessionId: null
    };
  }
}

// ============================================================================
// ROLE BLOCK — v30 IMMORTAL EVO++++
// ============================================================================

export const UIRuntimeRole = {
  type: "Organ",
  subsystem: "UI",
  layer: "Runtime",
  version: "30.0-Immortal-Evo++++",
  identity: "PulseUIRuntime-v30-Immortal-Evo++++",

  evo: {
    runtimeOrgan: true,
    domAware: true,
    animationAware: true,
    comfortPatternAware: true,
    routeAware: true,
    blueprintAware: true,
    styleBundleAware: true,
    animationBundleAware: true,
    runtimeHintsAware: true,

    deterministic: true,
    driftProof: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    offlineFirst: true,
    indexedDBMirrored: true,
    replayAware: true,
    modeAgnostic: true,
    diagnosticsAware: true,
    evidenceAware: true,
    adminPanelAware: true,
    uiErrorSpineV20Aware: true,
    uiFlowAware: true,
    trustFabricAware: true,
    pulseBandAware: true,
    portalAware: true,
    timeAxisAware: true,
    sessionAware: true,
    advantageAware: true
  }
};

// ============================================================================
// INTERNAL HELPERS — DOM-SAFE WRAPPERS
// ============================================================================

function ensureRoot(rootSelector) {
  const sel = rootSelector || "#app";
  return document.querySelector(sel);
}

function styleBundleToCSS(styleBundle) {
  if (!styleBundle || typeof styleBundle !== "object") return "";
  const tokens = styleBundle.tokens || {};
  let css = "";

  for (const selector in tokens) {
    const rules = tokens[selector];
    css += `${selector}{`;
    for (const prop in rules) {
      css += `${prop}:${rules[prop]};`;
    }
    css += "}";
  }

  return css;
}

function applyStyleBundle(styleBundle, styleId = "PULSE-BAND-runtime-style") {
  if (!styleBundle) return;

  const existing = document.getElementById(styleId);
  const cssText = styleBundleToCSS(styleBundle);

  if (existing) {
    existing.textContent = cssText;
    return;
  }

  const styleEl = document.createElement("style");
  styleEl.id = styleId;
  styleEl.textContent = cssText;
  document.head.appendChild(styleEl);
}

function animationBundleToCSS(animationBundle) {
  if (!animationBundle || typeof animationBundle !== "object") return "";
  const animations = animationBundle.animations || {};
  let css = "";

  for (const name in animations) {
    const def = animations[name];
    if (!def || !Array.isArray(def.keyframes)) continue;

    css += `@keyframes ${name}{`;
    for (const frame of def.keyframes) {
      const pct = frame.offset != null ? frame.offset * 100 : 0;
      css += `${pct}%{`;
      const props = frame.props || {};
      for (const prop in props) {
        css += `${prop}:${props[prop]};`;
      }
      css += "}";
    }
    css += "}";
  }

  return css;
}

function applyAnimationBundle(animationBundle, styleId = "PULSE-BAND-runtime-anim") {
  if (!animationBundle) return;

  const existing = document.getElementById(styleId);
  const cssText = animationBundleToCSS(animationBundle);

  if (existing) {
    existing.textContent = cssText;
    return;
  }

  const styleEl = document.createElement("style");
  styleEl.id = styleId;
  styleEl.textContent = cssText;
  document.head.appendChild(styleEl);
}

function createNodeFromLayout(nodeDef) {
  if (!nodeDef) return null;
  const tag = nodeDef.tag || "div";
  const el = document.createElement(tag);

  const props = nodeDef.props || {};
  for (const key in props) {
    if (key === "style" && typeof props.style === "object") {
      for (const s in props.style) {
        el.style[s] = props.style[s];
      }
    } else if (key === "className") {
      el.className = props[key];
    } else if (key.startsWith("data-")) {
      el.setAttribute(key, props[key]);
    } else if (key === "text") {
      el.textContent = props[key];
    } else {
      try {
        el.setAttribute(key, props[key]);
      } catch {
        // ignore invalid attributes
      }
    }
  }

  const children = nodeDef.children || [];
  for (const child of children) {
    const childNode = createNodeFromLayout(child);
    if (childNode) el.appendChild(childNode);
  }

  return el;
}

function renderLayoutTree(rootEl, layoutTree) {
  if (!rootEl) return;
  if (!layoutTree) {
    rootEl.innerHTML = "";
    return;
  }

  rootEl.innerHTML = "";
  const node = createNodeFromLayout(layoutTree);
  if (node) rootEl.appendChild(node);
}

// ============================================================================
// DIAGNOSTICS ENVELOPE
// ============================================================================

function buildRuntimeDiagnosticsEnvelope(RuntimeState) {
  const surfaceCtx = readSurfaceContext();

  const envelope = {
    schemaVersion: RUNTIME_SCHEMA_VERSION,
    version: "30.0-Immortal-Evo++++",
    layer: "UI-Runtime",
    role: "PulseUIRuntime",
    state: {
      lastBlueprintId: RuntimeState.lastBlueprintId,
      lastRouteId: RuntimeState.lastRouteId,
      lastError: RuntimeState.lastError,
      mountSeq: RuntimeState.mountSeq
    },
    surface: surfaceCtx.surface,
    route: surfaceCtx.route,
    band: surfaceCtx.band,
    sessionId: surfaceCtx.sessionId,
    ts: PulseRealm.PulseNOW
  };

  appendRuntimeRecord("diagnostics_envelope", envelope);

  try {
    CoreMemory.setRouteSnapshot("uiRuntimeDiagnostics", envelope);
  } catch {}

  return envelope;
}

// ============================================================================
// FACTORY — RUNTIME ORGAN v30 IMMORTAL EVO++++
// ============================================================================
export function createPulseUIRuntime({
  rootSelector = "#app",
  log = console.log,
  warn = console.warn
} = {}) {
  const RuntimeState = {
    lastBlueprintId: null,
    lastRouteId: null,
    lastError: null,
    mountSeq: 0
  };

  function nextSeq() {
    RuntimeState.mountSeq += 1;
    return RuntimeState.mountSeq;
  }

  function safeLog(stage, details = {}) {
    const surfaceCtx = readSurfaceContext();

    const payload = {
      schemaVersion: RUNTIME_SCHEMA_VERSION,
      seq: RuntimeState.mountSeq,
      surface: surfaceCtx.surface,
      route: surfaceCtx.route,
      band: surfaceCtx.band,
      sessionId: surfaceCtx.sessionId,
      ...details
    };

    appendRuntimeRecord("runtime_log", { stage, payload });

    try {
      log(`[PulseUIRuntime-v30] ${stage}`, payload);
    } catch {
      // never throw
    }
  }

  function mirrorStateToCoreMemory() {
    try {
      CoreMemory.setRouteSnapshot("uiRuntimeState", {
        schemaVersion: RUNTIME_SCHEMA_VERSION,
        version: "30.0-Immortal-Evo++++",
        routeId: "uiRuntimeState",
        state: {
          lastBlueprintId: RuntimeState.lastBlueprintId,
          lastRouteId: RuntimeState.lastRouteId,
          lastError: RuntimeState.lastError,
          mountSeq: RuntimeState.mountSeq
        },
        timestamp: PulseRealm.PulseNOW
      });
    } catch {
      // best-effort
    }
  }

  /**
   * mountBlueprint
   * -------------------------------------------------------------------------
   * Applies:
   *   - styleBundle → <style> in <head>
   *   - animationBundle → <style> in <head>
   *   - layoutTree → DOM under rootSelector
   */
  function mountBlueprint({
    blueprint,
    styleBundle,
    animationBundle
  } = {}) {
    nextSeq();

    if (!blueprint || typeof blueprint !== "object") {
      const errorInfo = "InvalidBlueprint";
      RuntimeState.lastError = errorInfo;
      warn("[PulseUIRuntime-v30] INVALID_BLUEPRINT");
      safeLog("MOUNT_INVALID_BLUEPRINT", { error: errorInfo });
      buildRuntimeDiagnosticsEnvelope(RuntimeState);
      mirrorStateToCoreMemory();
      return { ok: false, error: errorInfo };
    }

    try {
      const rootEl = ensureRoot(rootSelector);
      if (!rootEl) {
        const errorInfo = "RootNotFound";
        RuntimeState.lastError = errorInfo;
        warn("[PulseUIRuntime-v30] ROOT_NOT_FOUND", rootSelector);
        safeLog("MOUNT_ROOT_NOT_FOUND", { error: errorInfo, rootSelector });
        buildRuntimeDiagnosticsEnvelope(RuntimeState);
        mirrorStateToCoreMemory();
        return { ok: false, error: errorInfo };
      }

      applyStyleBundle(styleBundle || blueprint.styleBundle);
      applyAnimationBundle(animationBundle || blueprint.animationBundle);
      renderLayoutTree(rootEl, blueprint.layoutTree);

      RuntimeState.lastBlueprintId = blueprint.id || null;
      RuntimeState.lastRouteId = blueprint.routeId || null;
      RuntimeState.lastError = null;

      safeLog("MOUNT_OK", {
        blueprintId: blueprint.id || null,
        routeId: blueprint.routeId || null
      });

      const diagEnvelope = buildRuntimeDiagnosticsEnvelope(RuntimeState);

      try {
        Trust.recordEvent("uiRuntimeMount", {
          blueprintId: RuntimeState.lastBlueprintId,
          routeId: RuntimeState.lastRouteId,
          diagnostics: diagEnvelope
        });
      } catch {}

      mirrorStateToCoreMemory();

      return { ok: true };
    } catch (err) {
      const msg = String(err);
      RuntimeState.lastError = msg;
      warn("[PulseUIRuntime-v30] MOUNT_ERROR", msg);
      safeLog("MOUNT_ERROR", { error: msg });
      buildRuntimeDiagnosticsEnvelope(RuntimeState);
      mirrorStateToCoreMemory();

      try {
        const envelope = PulseRealm.PulseUIErrors.normalizeError(
          err,
          "ui.runtime.mount"
        );
        if (envelope) {
          PulseRealm.PulseUIErrors.broadcast(envelope);
        }
      } catch {}

      return { ok: false, error: "MountError" };
    }
  }

  /**
   * unmount
   * -------------------------------------------------------------------------
   * Clears the root container.
   */
  function unmount() {
    nextSeq();
    try {
      const rootEl = ensureRoot(rootSelector);
      if (rootEl) {
        rootEl.innerHTML = "";
      }
      safeLog("UNMOUNT_OK");
      buildRuntimeDiagnosticsEnvelope(RuntimeState);
      mirrorStateToCoreMemory();
      return { ok: true };
    } catch (err) {
      const msg = String(err);
      RuntimeState.lastError = msg;
      warn("[PulseUIRuntime-v30] UNMOUNT_ERROR", msg);
      safeLog("UNMOUNT_ERROR", { error: msg });
      buildRuntimeDiagnosticsEnvelope(RuntimeState);
      mirrorStateToCoreMemory();

      try {
        const envelope = PulseRealm.PulseUIErrors.normalizeError(
          err,
          "ui.runtime.unmount"
        );
        if (envelope) {
          PulseRealm.PulseUIErrors.broadcast(envelope);
        }
      } catch {}

      return { ok: false, error: "UnmountError" };
    }
  }

  // ---------------------------------------------------------------------------
  // Evo Console integration — renderEvoConsole
  // ---------------------------------------------------------------------------

  function ensureConsoleRoot() {
    let root = document.getElementById("evo-console-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "evo-console-root";
      root.className = "evo-console-root";
      document.body.appendChild(root);
    }
    return root;
  }

  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function renderConsoleTabButton(tab, state) {
    const active = state.activeTab === tab ? "active" : "";
    return `<button class="evo-tab ${active}" data-tab="${tab}">${tab}</button>`;
  }

  function renderConsoleSettingsTab(state) {
    return `
      <div class="evo-section">
        <h3>Console Settings</h3>
        <ul>
          <li>Pulse Mode: ${state.governorMode.pulseMode}</li>
          <li>Mind Mode: ${state.governorMode.mindMode}</li>
          <li>AI Mode: ${state.governorMode.aiMode}</li>
        </ul>
        <p><strong>DevTools:</strong> ${state.devtoolsOpen ? "⚠️ OPEN" : "Closed"}</p>
        <p><strong>History:</strong> ${state.history.length} entries</p>
      </div>
    `;
  }

  function renderConsoleNetworkTab(state) {
    return `
      <div class="evo-section">
        <h3>Diagnostics</h3>
        <pre>${state.lastDiagnosticsModel ? esc(JSON.stringify(state.lastDiagnosticsModel, null, 2)) : "No diagnostics available."}</pre>

        <h3>Evidence</h3>
        <pre>${state.lastEvidenceSnapshot ? esc(JSON.stringify(state.lastEvidenceSnapshot, null, 2)) : "No evidence available."}</pre>
      </div>
    `;
  }

  function renderConsoleCommentsTab(state) {
    const items = state.history
      .slice()
      .reverse()
      .map(
        (h) =>
          `<div class="evo-history-item"><pre>${esc(
            JSON.stringify(h, null, 2)
          )}</pre></div>`
      )
      .join("");

    return `
      <div class="evo-section">
        <h3>History</h3>
        <div class="evo-history">${items}</div>
      </div>
    `;
  }

  function renderConsolePulseWorldTab(state) {
    return `
      <div class="evo-section">
        <h3>PulseWorld Fields</h3>
        <p><strong>Advantage:</strong> ${state.lastAdvantageField?.score ?? 0}</p>
        <p><strong>Speed:</strong> ${state.lastSpeedField?.score ?? 0}</p>
        <p><strong>Experience:</strong> ${state.lastExperienceField?.score ?? 0}</p>
        <p><strong>True Speed:</strong> ${state.trueSpeedField?.score ?? 0}</p>
      </div>
    `;
  }

  function renderConsoleActiveTab(state) {
    switch (state.activeTab) {
      case "settings":
        return renderConsoleSettingsTab(state);
      case "network":
        return renderConsoleNetworkTab(state);
      case "comments":
        return renderConsoleCommentsTab(state);
      case "pulseworld":
        return renderConsolePulseWorldTab(state);
      default:
        return `<div class="evo-section">Unknown tab.</div>`;
    }
  }

  function bindConsoleTabEvents(state) {
    const root = ensureConsoleRoot();
    const buttons = root.querySelectorAll(".evo-tab");

    buttons.forEach((btn) => {
      btn.onclick = () => {
        const tab = btn.getAttribute("data-tab");
        state.activeTab = tab;
        renderEvoConsole(state);
      };
    });
  }

  function renderEvoConsole(state) {
    const root = ensureConsoleRoot();

    if (!state.open) {
      root.innerHTML = "";
      return;
    }

    root.innerHTML = `
      <div class="evo-console">
        <div class="evo-header">
          <span class="evo-title">PulseEvolutionaryAIConsole v33</span>
          <span class="evo-version">${state.version}</span>
        </div>

        <div class="evo-tabs">
          ${renderConsoleTabButton("settings", state)}
          ${renderConsoleTabButton("network", state)}
          ${renderConsoleTabButton("comments", state)}
          ${renderConsoleTabButton("pulseworld", state)}
        </div>

        <div class="evo-body">
          ${renderConsoleActiveTab(state)}
        </div>
      </div>
    `;

    bindConsoleTabEvents(state);
  }

  const PulseUIRuntime = {
    UIRuntimeRole,
    RuntimeState,
    mountBlueprint,
    unmount,
    renderEvoConsole
  };

  safeLog("Initializing Components..", {
    identity: UIRuntimeRole.identity,
    version: UIRuntimeRole.version,
    schemaVersion: RUNTIME_SCHEMA_VERSION
  });

  buildRuntimeDiagnosticsEnvelope(RuntimeState);
  mirrorStateToCoreMemory();
  console.log(
    "%c[PulseBootRuntime v30] Pulse World DOM Applicator for Blueprint Created and Running!",
    "color:#H02FHA; font-weight:bold; font-family:monospace;"
  );
  return PulseUIRuntime;
}


// ============================================================================
// GLOBAL REGISTRATION (OPTIONAL) — v30 IMMORTAL EVO++++
// ============================================================================

try {

    PulseRealm.PulseUIRuntime = createPulseUIRuntime;
    PulseRealm.PulseUIRuntimeStore = PulseUIRuntimeStore;
  
} catch {
  // never throw
}
