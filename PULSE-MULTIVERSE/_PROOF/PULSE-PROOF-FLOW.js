// ============================================================================
// FILE: /PulseOS/PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PulseUIFlow-v30-Immortal-OmniMesh.js
// PULSE OS — v30‑IMMORTAL‑OMNIMESH
// “UI FLOW ENGINE / INTENT GLUE / HUMAN‑VISIBLE ORGANISM MAP / EVIDENCE-AWARE / MESH-AWARE”
// Offline‑First • CoreMemory+IndexedDB Mirrored • Replay‑Aware
// Tier/Channel‑Aware • Router‑Checked • Evolutionary‑Page‑Driven
// Evidence‑Aware • Diagnostics‑Aware • Admin‑Console‑Ready
// Vitals‑Aligned • ErrorSpine‑v30‑Aligned • Trust‑Fabric‑Aware
// ShadowDB‑Aware • PulseBand‑Aware • OneBand / DualBand / Mesh‑Route‑Aware
// ============================================================================
import { PulseCoreGMemory } from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

console.log("%c📜 PULSE PROOF MONITOR v30.0 — [PulseProofFlow v30] Universal Flow Loaded — Pulse World Flow Active!",
  "color:#26C6DA; font-weight:bold; font-family:monospace;"
);

const UIFLOW_SCHEMA_VERSION = "v7";
const UIFLOW_VERSION = "30.0-Immortal-OmniMesh";

let BridgeExport = null;
let triedBridgeImport = false;

// Optional: Bridge can call this once it boots
export function attachBridgeInstance(instance) {
  BridgeExport = instance || null;
}

// Global resolver — PURE OBSERVER
function resolveBridge() {
  // 1) If Bridge registered itself
  if (BridgeExport) return BridgeExport;

  // 2) If global mirror exists
  if (PulseRealm.PulseProofBridge) {
    BridgeExport = PulseRealm.PulseProofBridge;
    return BridgeExport;
  }

  // 3) No Bridge yet
  return null;
}

// ---------------------------------------------------------------------------
// ACCESSORS — SAFE, NULLABLE, ZERO GRAVITY
// ---------------------------------------------------------------------------
export function getBridge() {
  return resolveBridge();
}

export function getRoute() {
  return resolveBridge().route || null;
}

export function getCoreMemory() {
  return PulseCoreGMemory || null;
}

export function getTrust() {
  return resolveBridge().trust || null;
}

export function getEvidenceBus() {
  return resolveBridge().evidenceBus || null;
}

export function getDiagnosticsBus() {
  return resolveBridge().diagnosticsBus || null;
}

export function getMeshRouter() {
  return resolveBridge().meshRouter || null;
}

const IDB_DB_NAME = "PulseProofFlow_v30";
const IDB_STORE_NAME = "flow";
const IDB_MAX_ENTRIES = 100000;

function getBand() {
  return PulseRealm.PulseBand || null;
}
let idbAvailable = false;
let idbDb = null;

function openIndexedDB() {
  return new Promise((resolve) => {
    if (typeof indexedDB === "undefined") {
      resolve(null);
      return;
    }
    const req = indexedDB.open(IDB_DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE_NAME)) {
        db.createObjectStore(IDB_STORE_NAME, { keyPath: "id" });
      }
    };
    req.onsuccess = () => {
      resolve(req.result);
    };
    req.onerror = () => {
      resolve(null);
    };
  });
}

const UIFLOW_LS_KEY = "PulseUIFlow.v30.buffer";
const UIFLOW_LS_MAX = 6000;
const UIFLOW_IDB_DB = "PulseUIFlowDB";
const UIFLOW_IDB_STORE = "flowBuffer";

async function ensureIndexedDB() {
  if (idbDb || idbAvailable === false) return idbDb;
  const db = await  openIndexedDB();
  if (db) {
    idbDb = db;
    idbAvailable = true;
  } else {
    idbAvailable = false;
  }
  return idbDb;
}
function openUIFlowIDB() {
  return new Promise((resolve) => {
    if (typeof indexedDB === "undefined") return resolve(null);

    const req = indexedDB.open(UIFLOW_IDB_DB, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(UIFLOW_IDB_STORE)) {
        db.createObjectStore(UIFLOW_IDB_STORE, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
  });
}

async function saveFlowBufferToIDB(buf) {
  try {
    const db = await openUIFlowIDB();
    if (!db) return;
    const tx = db.transaction(UIFLOW_IDB_STORE, "readwrite");
    const store = tx.objectStore(UIFLOW_IDB_STORE);
    const payload = {
      id: "buffer",
      buffer: buf,
      ts: PulseRealm.PulseNOW
    };
    store.put(payload);
  } catch {
    // best-effort only
  }
}

async function loadFlowBufferFromIDB() {
  try {
    const db = await ensureIndexedDB();
    if (!db) return [];

    return await new Promise((resolve) => {
      const tx = db.transaction(UIFLOW_IDB_STORE, "readonly");
      const store = tx.objectStore(UIFLOW_IDB_STORE);
      const req = store.get("buffer");
      req.onsuccess = () => {
        resolve(req.result.buffer || null);
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

function mirrorFlowBufferToCoreMemory(buf) {
  try {
    const core = getCoreMemory();
    if (!core || typeof core.setRouteSnapshot !== "function") return;

    const envelope = {
      schemaVersion: UIFLOW_SCHEMA_VERSION,
      version: UIFLOW_VERSION,
      routeId: "uiFlow",
      buffer: buf,
      timestamp: PulseRealm.PulseNOW,
      band: getBand().mode || null,
      sessionId: getBand().sessionId || null
    };

    core.setRouteSnapshot("uiFlow", envelope);
  } catch {
    // best-effort only
  }
}

async function loadFlowBuffer() {
  // Prefer IndexedDB if present
  const idbBuf = await loadFlowBufferFromIDB();
  if (!idbBuf) return [];
  return loadFlowBufferFromIDB();
}

async function saveFlowBuffer(buf) {
  const trimmed =
    buf.length > UIFLOW_LS_MAX ? buf.slice(buf.length - UIFLOW_LS_MAX) : buf;

  saveFlowBufferToIDB(trimmed);
  saveFlowBufferToIDB(trimmed);
  mirrorFlowBufferToCoreMemory(trimmed);
}

async function appendFlowRecord(kind, payload) {
  const entry = {
    ts: PulseRealm.PulseNOW,
    kind,
    payload
  };

  const buf = await loadFlowBuffer();
  buf.push(entry);
  saveFlowBuffer(buf);

  // Diagnostics bus tap
  try {
    getDiagnosticsBus().emit("ui_flow_record", {
      schemaVersion: UIFLOW_SCHEMA_VERSION,
      version: UIFLOW_VERSION,
      entry
    });
  } catch {}
}

// ---------------------------------------------------------------------------
// PUBLIC STORE API
// ---------------------------------------------------------------------------
export const PulseUIFlowStore = {
  async getAll() {
    return loadFlowBuffer();
  },

  async tail(n = 400) {
    const buf = await loadFlowBuffer();
    return buf.slice(Math.max(0, buf.length - n));
  },

  async clear() {
    saveFlowBuffer([]);

    try {
      const core = getCoreMemory();
      core.setRouteSnapshot("uiFlow", {
        schemaVersion: UIFLOW_SCHEMA_VERSION,
        version: UIFLOW_VERSION,
        routeId: "uiFlow",
        buffer: [],
        cleared: true,
        timestamp: PulseRealm.PulseNOW
      });
    } catch {}
  }
};

// ---------------------------------------------------------------------------
// ROLE / META
// ---------------------------------------------------------------------------
export const PulseUIFlowRole = {
  type: "UIFlow",
  subsystem: "PulseUIFlow",
  layer: "UI-Flow",
  version: UIFLOW_VERSION,
  identity: "PulseUIFlow-v30-Immortal-OmniMesh",

  evo: {
    driftProof: true,
    deterministicFlow: true,
    minimalState: true,
    binaryAware: true,
    dualBand: true,
    oneBandAware: true,
    meshAware: true,
    futureEvolutionReady: true,
    diagnosticsAware: true,
    evidenceAware: true,
    adminPanelAware: true,
    trustFabricAware: true,
    vitalsAware: true,
    errorSpineAligned: true,
    omniMeshAware: true,
    shadowDBAware: true
  },

  flow: {
    intentLevel: true,
    routeAware: true,
    errorAware: true,
    identityAware: true,
    organismAware: true,
    diagnosticsLinked: true,
    evidenceLinked: true,
    vitalsLinked: true,
    bandLinked: true,
    meshLinked: true
  },

  pulseContract: "PulseUIFlow-v7",
  meshContract: "PulseMesh-v30-omni",
  sendContract: "PulseSend-v30-omni"
};

const FLOW_LAYER_ID   = "UI-FLOW";
const FLOW_LAYER_NAME = "PULSE UI FLOW ENGINE";
const FLOW_LAYER_VER  = UIFLOW_VERSION;

const FLOW_DIAGNOSTICS_ENABLED =
  (PulseRealm.PULSE_UIFLOW_DIAGNOSTICS === "true" ||
   PulseRealm.PULSE_DIAGNOSTICS === "true" ||
   PulseRealm.PULSE_ADMIN_MODE === "true");

async function logFlow(stage, details = {}) {
   await appendFlowRecord("flow_log", { stage, details });

  if (!FLOW_DIAGNOSTICS_ENABLED) return;
  if (typeof log === "function") {
    PulseRealm.PulseLog(
  "proof",
      JSON.stringify({
        pulseLayer: FLOW_LAYER_ID,
        pulseName:  FLOW_LAYER_NAME,
        pulseVer:   FLOW_LAYER_VER,
        schemaVersion: UIFLOW_SCHEMA_VERSION,
        stage,
        ...details
      })
    );
  } else {}
}

// ---------------------------------------------------------------------------
// INTENT MAP (v30: lanes + bands + mesh hints)
// ---------------------------------------------------------------------------
const UIIntentFlowMap = Object.freeze({
  login: {
    id: "login",
    intent: "login",
    next: ["dashboard"],
    requiresIdentity: false,
    lane: "public",
    bandHint: "outer",
    meshHint: "entry"
  },
  dashboard: {
    id: "dashboard",
    intent: "dashboard",
    next: ["settings", "profile", "earn", "scanner", "proxyHealth", "aiEarn", "admin"],
    requiresIdentity: true,
    lane: "core",
    bandHint: "inner",
    meshHint: "core"
  },
  settings: {
    id: "settings",
    intent: "settings",
    next: ["dashboard"],
    requiresIdentity: true,
    lane: "core",
    bandHint: "inner",
    meshHint: "settings"
  },
  profile: {
    id: "profile",
    intent: "profile",
    next: ["dashboard"],
    requiresIdentity: true,
    lane: "core",
    bandHint: "inner",
    meshHint: "profile"
  },
  earn: {
    id: "earn",
    intent: "earn",
    next: ["dashboard"],
    requiresIdentity: true,
    lane: "earn",
    bandHint: "inner",
    meshHint: "earn"
  },
  aiEarn: {
    id: "aiEarn",
    intent: "aiEarn",
    next: ["dashboard"],
    requiresIdentity: true,
    lane: "earn",
    bandHint: "inner",
    meshHint: "aiEarn"
  },
  scanner: {
    id: "scanner",
    intent: "scanner",
    next: ["dashboard"],
    requiresIdentity: true,
    lane: "tools",
    bandHint: "inner",
    meshHint: "scanner"
  },
  proxyHealth: {
    id: "proxyHealth",
    intent: "proxyHealth",
    next: ["dashboard"],
    requiresIdentity: true,
    lane: "tools",
    bandHint: "inner",
    meshHint: "proxyHealth"
  },
  admin: {
    id: "admin",
    intent: "adminPanel",
    next: ["dashboard"],
    requiresIdentity: true,
    lane: "admin",
    requiresAdmin: true,
    bandHint: "crown",
    meshHint: "admin"
  },
  error: {
    id: "error",
    intent: "error",
    next: ["dashboard"],
    requiresIdentity: false,
    lane: "error",
    bandHint: "outer",
    meshHint: "error"
  }
});

// ---------------------------------------------------------------------------
// STATE (v30: band + mesh + evidence + vitals)
// ---------------------------------------------------------------------------
const UIFlowState = {
  current: null,
  last: null,
  identityTrusted: false,
  adminTrusted: false,
  sessionId: null,
  lastEvidence: null,
  lastDiagnostics: null,
  lastVitals: null,
  bandMode: null,
  meshRouteSignature: null,

  setCurrent(flowId) {
    this.last = this.current;
    this.current = flowId;
  },

  setIdentityTrusted(trusted) {
    this.identityTrusted = !!trusted;
  },

  setAdminTrusted(trusted) {
    this.adminTrusted = !!trusted;
  },

  setSessionId(id) {
    this.sessionId = id || null;
  },

  setEvidenceSummary(evidence) {
    this.lastEvidence = evidence || null;
  },

  setDiagnosticsSummary(diag) {
    this.lastDiagnostics = diag || null;
  },

  setVitalsSnapshot(vitals) {
    this.lastVitals = vitals || null;
  },

  setBandMode(mode) {
    this.bandMode = mode || null;
  },

  setMeshRouteSignature(sig) {
    this.meshRouteSignature = sig || null;
  },

  snapshot() {
    return {
      schemaVersion: UIFLOW_SCHEMA_VERSION,
      current: this.current,
      last: this.last,
      identityTrusted: this.identityTrusted,
      adminTrusted: this.adminTrusted,
      sessionId: this.sessionId,
      lastEvidence: this.lastEvidence,
      lastDiagnostics: this.lastDiagnostics,
      lastVitals: this.lastVitals,
      bandMode: this.bandMode,
      meshRouteSignature: this.meshRouteSignature
    };
  }
};

function resolveFlowByIntent(intentId) {
  return UIIntentFlowMap[intentId] || null;
}

function getEvolutionaryPage() {
  return PulseRealm.PulseEvolutionaryPage || null;
}

function getAdminDiagnosticsModel() {
  return PulseRealm.PulseAdminDiagnosticsModel || null;
}

function getEvidenceSummary() {
  return PulseRealm.PulseEvidenceSummary || null;
}

function getVitalsSnapshot() {
  const store = PulseRealm.PulseVitalsStore || null;
  try {
    return store ? store.tail(64) : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// EVOLVE (v30: band + mesh + evidence hooks)
// ---------------------------------------------------------------------------
async function evolveToIntent(flowDef, extraPayload = {}) {
  const EvoPage = getEvolutionaryPage();
  if (!EvoPage || typeof EvoPage.evolve !== "function") {
    await appendFlowRecord("evolve_missing_page", { flowId: flowDef.id });
    logFlow("EVOLVE_MISSING_EVOLUTIONARY_PAGE", { flowId: flowDef.id });
    return { ok: false, reason: "NO_EVOLUTIONARY_PAGE" };
  }

  const band = getBand();
  const bandMode = band.mode || "unknown";
  UIFlowState.setBandMode(bandMode);

  const meshRouter = getMeshRouter();
  let meshRouteSignature = null;

  if (meshRouter && typeof meshRouter.computeRouteSignature === "function") {
    try {
      meshRouteSignature = meshRouter.computeRouteSignature({
        intent: flowDef.intent,
        lane: flowDef.lane,
        bandMode,
        sessionId: UIFlowState.sessionId
      });
      UIFlowState.setMeshRouteSignature(meshRouteSignature);
    } catch {
      // ignore
    }
  }

  await appendFlowRecord("evolve_intent", {
    flowId: flowDef.id,
    intent: flowDef.intent,
    extraPayload,
    bandMode,
    meshRouteSignature
  });

  logFlow("EVOLVE_INTENT", {
    flowId: flowDef.id,
    intent: flowDef.intent,
    bandMode,
    meshRouteSignature
  });

  EvoPage.evolve({
    intent: flowDef.intent,
    lane: flowDef.lane,
    bandMode,
    meshRouteSignature,
    ...extraPayload
  });

  return { ok: true };
}

// ---------------------------------------------------------------------------
// CORE MEMORY MIRROR + DIAGNOSTICS ENVELOPE
// ---------------------------------------------------------------------------
function mirrorStateToCoreMemory() {
  try {
    const core = getCoreMemory();
    if (!core || typeof core.setRouteSnapshot !== "function") return;

    core.setRouteSnapshot("uiFlowState", {
      schemaVersion: UIFLOW_SCHEMA_VERSION,
      version: UIFLOW_VERSION,
      routeId: "uiFlowState",
      state: UIFlowState.snapshot(),
      timestamp: PulseRealm.PulseNOW
    });
  } catch {
    // best-effort
  }
}

function buildDiagnosticsEnvelope() {
  const state = UIFlowState.snapshot();
  const diagModel = getAdminDiagnosticsModel();
  const evidence = getEvidenceSummary();
  const vitals = getVitalsSnapshot();

  const envelope = {
    schemaVersion: UIFLOW_SCHEMA_VERSION,
    version: UIFLOW_VERSION,
    layer: FLOW_LAYER_ID,
    role: FLOW_LAYER_NAME,
    state,
    diagnostics: diagModel || null,
    evidence: evidence || null,
    vitals: vitals || null,
    ts: PulseRealm.PulseNOW
  };

  // Evidence bus
  try {
    getEvidenceBus().recordFlowEvidence({
      envelope,
      state,
      diagnostics: diagModel || null
    });
  } catch {}

  // CoreMemory mirror
  try {
    const core = getCoreMemory();
    core.setRouteSnapshot("uiFlowDiagnostics", envelope);
  } catch {}

  return envelope;
}

export function onError(envelope) {
  try {
    // ------------------------------------------------------------
    // 1. Safe UIFlow logging
    // ------------------------------------------------------------
    try {
      logFlow("UIFLOW_ERROR", {
        id: envelope.id,
        severity: envelope.severity,
        route: envelope.packet.route,
        surface: envelope.packet.surface,
        message: envelope.packet.message
      });
    } catch {}

    // ------------------------------------------------------------
    // 2. Flow record
    // ------------------------------------------------------------
    try {
      appendFlowRecord("ui_error", {
        id: envelope.id,
        severity: envelope.severity,
        route: envelope.packet.route,
        surface: envelope.packet.surface,
        message: envelope.packet.message,
        time: envelope.timestamp
      });
    } catch {}

    // ------------------------------------------------------------
    // 3. UIFlowState snapshot
    // ------------------------------------------------------------
    try {
      UIFlowState.setLastError({
        id: envelope.id,
        severity: envelope.severity,
        route: envelope.packet.route,
        surface: envelope.packet.surface,
        message: envelope.packet.message,
        time: envelope.timestamp
      });
    } catch {}

    // ------------------------------------------------------------
    // 4. Diagnostics summary update
    // ------------------------------------------------------------
    try {
      const diag = getAdminDiagnosticsModel();
      if (diag) {
        UIFlowState.setDiagnosticsSummary({
          pressure: diag.artery.organism.pressure || 0,
          issues: diag.issueList.length || 0
        });
      }
    } catch {}

    // ------------------------------------------------------------
    // 5. Evidence summary update
    // ------------------------------------------------------------
    try {
      const evidence = getEvidenceSummary();
      if (evidence) {
        UIFlowState.setEvidenceSummary({
          match: evidence.match || 0,
          mismatch: evidence.mismatch || 0,
          omission: evidence.omission || 0,
          drift: evidence.drift || 0
        });
      }
    } catch {}

    // ------------------------------------------------------------
    // 6. Vitals snapshot update
    // ------------------------------------------------------------
    try {
      const vitals = getVitalsSnapshot();
      if (vitals) {
        UIFlowState.setVitalsSnapshot({
          count: vitals.length,
          lastTs: vitals[vitals.length - 1].ts || null
        });
      }
    } catch {}

    // ------------------------------------------------------------
    // 7. SDN impulse (UIFlow-tier)
    // ------------------------------------------------------------
    try {
      PulseRealm.PulseSDN.emitImpulse("uiflow.error", {
        modeKind: "dual",
        executionContext: {
          sceneType: "ui-flow",
          workloadClass: "flow-error",
          dispatchSignature: "UIFlow.v30",
          shapeSignature: "uiflow-error-spine",
          extensionId: "UIFlow"
        },
        envelope
      });
    } catch {}

    // ------------------------------------------------------------
    // 8. PulseSignals broadcast
    // ------------------------------------------------------------
    try {
      PulseRealm.PulseSignals.emit("uiflow.error", {
        envelope,
        severity: envelope.severity,
        route: envelope.packet.route,
        surface: envelope.packet.surface
      });
    } catch {}

    // ------------------------------------------------------------
    // 9. Mirror to CoreMemory
    // ------------------------------------------------------------
    try {
      mirrorStateToCoreMemory();
    } catch {}

  } catch (err) {
    try {
      logFlow("UIFLOW_ONERROR_FAILED", { error: String(err) });
    } catch {}
  }
}


// ---------------------------------------------------------------------------
// INIT (v30: one band / dual band / mesh / trust fabric)
// ---------------------------------------------------------------------------
export async function initUIFlow() {
  await appendFlowRecord("init_start", {});
  await logFlow("INIT_V30_START", {});

  let identityTrusted = false;
  let identityContext = null;
  let adminTrusted = false;
  let sessionId = null;

  try {
    const route = getRoute();
    if (typeof route === "function") {
      identityContext = await route("identity.check", {
        reflexOrigin: "UIFlow-v30",
        layer: "UI-Flow",
        binaryAware: true,
        dualBand: true,
        oneBand: true,
        meshAware: true
      });

      identityTrusted = !!identityContext.trustedDevice;
      adminTrusted = !!identityContext.isOwner || !!identityContext.isAdmin;
      sessionId = identityContext.sessionId || null;

      await appendFlowRecord("identity_check", {
        identityTrusted,
        adminTrusted,
        identityContext
      });
    } else {
      await appendFlowRecord("identity_check_skipped_no_route", {});
      await logFlow("IDENTITY_CHECK_SKIPPED_NO_ROUTE", {});
    }
  } catch (err) {
    await appendFlowRecord("identity_check_error", { error: String(err) });
    await logFlow("IDENTITY_CHECK_FAILED", { error: String(err) });
  }

  UIFlowState.setIdentityTrusted(identityTrusted);
  UIFlowState.setAdminTrusted(adminTrusted);
  UIFlowState.setSessionId(sessionId);

  // Evidence + diagnostics + vitals snapshots (if present)
  try {
    const diagModel = getAdminDiagnosticsModel();
    if (diagModel) {
      UIFlowState.setDiagnosticsSummary({
        pressure: diagModel.artery.organism.pressure || 0,
        issues: diagModel.issueList.length || 0
      });
    }

    const evidence = getEvidenceSummary();
    if (evidence) {
      UIFlowState.setEvidenceSummary({
        match: evidence.match || 0,
        mismatch: evidence.mismatch || 0,
        omission: evidence.omission || 0,
        drift: evidence.drift || 0
      });
    }

    const vitals = getVitalsSnapshot();
    if (vitals) {
      UIFlowState.setVitalsSnapshot({
        count: vitals.length,
        lastTs: vitals[vitals.length - 1].ts || null
      });
    }
  } catch {}

  const initialFlow = identityTrusted
    ? UIIntentFlowMap.dashboard
    : UIIntentFlowMap.login;

  UIFlowState.setCurrent(initialFlow.id);

  await evolveToIntent(initialFlow, {
    mode: identityTrusted ? "inside" : "outside",
    admin: adminTrusted ? "owner" : "user"
  });

  await appendFlowRecord("init_complete", {
    flowId: initialFlow.id,
    identityTrusted,
    adminTrusted,
    sessionId
  });

  await logFlow("INIT_V30_COMPLETE", {
    flowId: initialFlow.id,
    identityTrusted,
    adminTrusted
  });

  mirrorStateToCoreMemory();
  buildDiagnosticsEnvelope();

  return {
    flow: initialFlow,
    identityTrusted,
    adminTrusted,
    identityContext,
    sessionId
  };
}

// ---------------------------------------------------------------------------
// TRANSITIONS (v30: mesh + trust fabric)
// ---------------------------------------------------------------------------
export async function goToFlowIntent(flowId, options = {}) {
  appendFlowRecord("goToFlowIntent_in", { flowId, options });

  const currentId = UIFlowState.current;
  const currentFlow = UIIntentFlowMap[currentId] || null;
  const targetFlow = UIIntentFlowMap[flowId] || null;

  if (!targetFlow) {
    await appendFlowRecord("unknown_target", { flowId });
    logFlow("FLOW_UNKNOWN_TARGET_INTENT", { flowId });
    return { ok: false, reason: "UNKNOWN_TARGET" };
  }

  if (currentFlow && !currentFlow.next.includes(flowId)) {
    await appendFlowRecord("illegal_transition", {
      from: currentFlow.id,
      to: targetFlow.id
    });
    await logFlow("FLOW_ILLEGAL_TRANSITION_INTENT", {
      from: currentFlow.id,
      to: targetFlow.id
    });
    return { ok: false, reason: "ILLEGAL_TRANSITION" };
  }

  if (targetFlow.requiresIdentity && !UIFlowState.identityTrusted) {
    await appendFlowRecord("identity_block", {
      flowId: targetFlow.id,
      identityTrusted: UIFlowState.identityTrusted
    });

    await logFlow("FLOW_IDENTITY_BLOCK_INTENT", {
      flowId: targetFlow.id,
      intent: targetFlow.intent,
      identityTrusted: UIFlowState.identityTrusted
    });

    const loginFlow = UIIntentFlowMap.login;
    UIFlowState.setCurrent(loginFlow.id);
    evolveToIntent(loginFlow, { mode: "outside" });

    mirrorStateToCoreMemory();
    buildDiagnosticsEnvelope();

    return { ok: false, reason: "IDENTITY_REQUIRED_REDIRECT_LOGIN" };
  }

  if (targetFlow.requiresAdmin && !UIFlowState.adminTrusted) {
    await appendFlowRecord("admin_block", {
      flowId: targetFlow.id,
      adminTrusted: UIFlowState.adminTrusted
    });

    logFlow("FLOW_ADMIN_BLOCK_INTENT", {
      flowId: targetFlow.id,
      intent: targetFlow.intent,
      adminTrusted: UIFlowState.adminTrusted
    });

    return { ok: false, reason: "ADMIN_REQUIRED" };
  }

  let allowed = true;
  try {
    const route = getRoute();
    if (typeof route === "function") {
      const result = await route("uiFlowIntentCheck", {
        from: currentFlow ? currentFlow.id : null,
        to: targetFlow.id,
        reflexOrigin: "UIFlow-v30",
        layer: "UI-Flow",
        binaryAware: true,
        dualBand: true,
        oneBand: true,
        meshAware: true,
        sessionId: UIFlowState.sessionId
      });

      await appendFlowRecord("router_check", { result });

      if (result && result.allowed === false) {
        allowed = false;
        logFlow("FLOW_ROUTER_BLOCKED_INTENT", {
          from: currentFlow ? currentFlow.id : null,
          to: targetFlow.id
        });
      }
    } else {
      await appendFlowRecord("router_check_skipped_no_route", {});
      logFlow("FLOW_ROUTER_CHECK_SKIPPED_NO_ROUTE", {});
    }
  } catch (err) {
    await appendFlowRecord("router_check_error", { error: String(err) });
    logFlow("FLOW_ROUTER_CHECK_FAILED_INTENT", { error: String(err) });
  }

  if (!allowed) {
    await appendFlowRecord("router_blocked", {});
    return { ok: false, reason: "ROUTER_BLOCKED" };
  }

  UIFlowState.setCurrent(targetFlow.id);
  evolveToIntent(targetFlow, options.payload || {});

  await appendFlowRecord("goToFlowIntent_out", {
    from: currentFlow ? currentFlow.id : null,
    to: targetFlow.id
  });

  mirrorStateToCoreMemory();
  const diagEnvelope = buildDiagnosticsEnvelope();

  // Trust fabric hook
  try {
    const trust = getTrust();
    trust.recordEvent("uiFlowTransition", {
      from: currentFlow ? currentFlow.id : null,
      to: targetFlow.id,
      diagnostics: diagEnvelope
    });
  } catch {}

  return {
    ok: true,
    from: currentFlow ? currentFlow.id : null,
    to: targetFlow.id
  };
}

// ---------------------------------------------------------------------------
// SNAPSHOT + BIND CONTROLS
// ---------------------------------------------------------------------------
export async function getUIFlowSnapshot() {
  const snap = {
    ...UIFlowState.snapshot(),
    map: UIIntentFlowMap
  };

  await appendFlowRecord("snapshot", snap);
  return snap;
}

export function bindUIFlowIntentControls(root = null) {
  const scope = root || document;
  const nodes = scope.querySelectorAll("[data-pulse-intent-target]");

  nodes.forEach((node) => {
    const target = node.getAttribute("data-pulse-intent-target");
    if (!target) return;

    node.addEventListener("click", async (e) => {
      e.preventDefault();
      await goToFlowIntent(target);
    });
  });

  appendFlowRecord("bind_controls", { count: nodes.length });

  logFlow("FLOW_INTENT_CONTROLS_BOUND", {
    count: nodes.length
  });
}

// ---------------------------------------------------------------------------
// PUBLIC API
// ---------------------------------------------------------------------------
export const PulseUIFlowAPI = {
  PulseUIFlowRole,
  onError: async (packet) => {
    appendFlowRecord("error_spine_packet_v30", packet);
    logFlow("ERROR_SPINE_PACKET_V30", { signature: packet.signature });
  },
  initUIFlow,
  goToFlowIntent,
  getUIFlowSnapshot,
  bindUIFlowIntentControls,
  store: PulseUIFlowStore
};

export default PulseUIFlowAPI;

// ---------------------------------------------------------------------------
// GLOBAL EXPOSURE + ERROR SPINE ALIGNMENT v30
// ---------------------------------------------------------------------------
try {
  
    PulseRealm.PulseUIFlowInit = initUIFlow;
    PulseRealm.PulseUIFlow = PulseUIFlowAPI;
    PulseRealm.PulseUIFlowStore = PulseUIFlowStore;
 
} catch {}
