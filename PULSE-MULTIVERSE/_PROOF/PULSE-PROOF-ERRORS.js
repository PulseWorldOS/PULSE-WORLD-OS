/*
===============================================================================
FILE: /PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PulseUIErrors-v30-Immortal-Evo++++.js
UNIVERSAL ERROR SPINE — v30-Immortal-Evo++++
Membrane-Safe • Drift-Safe • Organism-Wide Error Unifier
Offline-First • CoreMemory-Mirrored • Evidence-Aware • Portal/Overmind-Aware
Multi-Mind • Multi-Band • Session-Aware • Cross-Tab • SDN-Aware • Beacon-Aware
Future-Evolution-Ready • Advantage-Field v2 • Integrity v2 • Correlation v2
===============================================================================
===============================================================================
*/
// ============================================================================
//  IMMORTAL++ LAZY BRIDGE ACCESS — SAFE, GLOBAL, CIRCULAR-PROOF
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

let BridgeExport = null;
let triedImport = false;

console.log("%c🩻 PULSE PROOF ERRORS v30.0 — [PulseProofErrors v30] Monitoring Engaged — Pulse World Activity Loading..",
  "color:#FFA726; font-weight:bold; font-family:monospace;"
);

// Optional: let Bridge explicitly register itself
export function attachBridgeInstance(instance) {
  BridgeExport = instance || null;
}

// errors-bridge-access.js (or whatever this file is)

// Single source of truth for “do we have a bridge?”
function resolveBridgeExport() {
  // 1) If Bridge registered itself, use that
  if (BridgeExport) return BridgeExport;

  // 2) If there’s a global mirror, use it
  if (PulseRealm.PulseProofBridge) {
    return PulseRealm.PulseProofBridge;
  }

  // 3) Otherwise: no bridge
  return null;
}

export function getBridge() {
  return resolveBridgeExport();
}

export function getCore() {
  return PulseRealm.PulseMemoryBridge;
}

export function getEvidenceBus() {
  const b = getBridge();
  return b.evidenceBus || null;
}

export function getDiagnosticsBus() {
  const b = getBridge();
  return b.diagnosticsBus || null;
}

export function getErrorBeacon() {
  const b = getBridge();
  return b.errorBeacon || null;
}

let crossTabChannel = null;
const UIE_CROSS_TAB_CHANNEL = "PulseUIErrors.v30.crossTab";
function initCrossTabChannel() {
  try {
    if (typeof BroadcastChannel !== "undefined") {
      crossTabChannel = new BroadcastChannel(UIE_CROSS_TAB_CHANNEL);

      crossTabChannel.onmessage = (evt) => {
        const data = evt.data;
        if (!data || !data.__PulseUIErrorEnvelope) return;

        // -------------------------------
        // 1. Normalize envelope (reflex-safe)
        // -------------------------------
        const env = data.envelope || {};

        env.packet = env.packet || {};
        env.packet.route   = env.packet.route   || "UNKNOWN_ROUTE";
        env.packet.surface = env.packet.surface || "UNKNOWN_SURFACE";
        env.packet.message = env.packet.message || "Unknown UI error";
        env.packet.lineage = env.packet.lineage || [];
        env.packet.cosmos  = env.packet.cosmos  || {};

        // -------------------------------
        // 2. Mirror into UI error records
        // -------------------------------
        appendUIErrorRecord("cross_tab", env);

        // -------------------------------
        // 3. Internal broadcast (reflex-safe)
        // -------------------------------
        internalBroadcastX(env, { fromCrossTab: true });
      };
    }
  } catch {
    crossTabChannel = null;
  }
}

function crossTabBroadcast(envelope) {
  if (!crossTabChannel) return;

  try {
    // -----------------------------------------
    // 1. Normalize envelope before broadcasting
    // -----------------------------------------
    const env = envelope || {};

    env.packet = env.packet || {};
    env.packet.route   = env.packet.route   || "UNKNOWN_ROUTE";
    env.packet.surface = env.packet.surface || "UNKNOWN_SURFACE";
    env.packet.message = env.packet.message || "Unknown UI error";
    env.packet.lineage = env.packet.lineage || [];
    env.packet.cosmos  = env.packet.cosmos  || {};

    // -----------------------------------------
    // 2. Broadcast normalized envelope
    // -----------------------------------------
    crossTabChannel.postMessage({
      __PulseUIErrorEnvelope: true,
      envelope: env
    });

  } catch {
    // swallow — cross-tab must never throw
  }
}

const UIE_SCHEMA_VERSION = "v6";
const UIE_LS_KEY = "PulseUIErrors.v30.buffer";
const UIE_LS_MAX = 6000;
const UIE_DB_NAME = "PulseUIErrorsDB";
const UIE_STORE = "errors";

function openUIEDB() {
  return new Promise((resolve) => {
    const req = indexedDB.open(UIE_DB_NAME, 1);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(UIE_STORE)) {
        db.createObjectStore(UIE_STORE, { keyPath: "id", autoIncrement: true });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
  });
}

async function uieLoadBuffer() {
  const db = await openUIEDB();
  if (!db) return [];

  return await new Promise((resolve) => {
    try {
      const tx = db.transaction(UIE_STORE, "readonly");
      const store = tx.objectStore(UIE_STORE);
      const req = store.getAll();

      req.onsuccess = () => {
        const rows = req.result || [];
        resolve(rows.sort((a, b) => a.id - b.id));
      };

      req.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
}

async function uieSaveBuffer(buf) {
  const db = await openUIEDB();
  if (!db) return;

  const trimmed =
    buf.length > UIE_LS_MAX
      ? buf.slice(buf.length - UIE_LS_MAX)
      : buf;

  try {
    // wipe old buffer
    const txClear = db.transaction(UIE_STORE, "readwrite");
    txClear.objectStore(UIE_STORE).clear();

    // write new buffer
    const tx = db.transaction(UIE_STORE, "readwrite");
    const store = tx.objectStore(UIE_STORE);

    for (const entry of trimmed) {
      store.put(entry);
    }
  } catch {}
}

function uieHashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h >>> 0;
}

// lightweight dedup window
const UIE_DEDUP_WINDOW_MS = 5000;
let uieLastEnvelopeByKey = Object.create(null);

// severity-aware sampling
function uieShouldSample(kind, envelope) {
  const severity = envelope.severity || "error";
  const tags = envelope.tags || [];

  if (severity === "fatal" || severity === "critical") return true;
  if (severity === "warning") {
    // router / overmind / portal warnings get higher sampling
    if (tags.includes("router") || tags.includes("overmind") || tags.includes("portal")) {
      return Math.random() < 0.9;
    }
    return Math.random() < 0.5;
  }
  // info / generic errors
  return true;
}

function uieDedupKey(envelope) {
  const p = envelope.packet || {};
  const base = `${p.origin || "unknown"}:${p.name || "Error"}:${(p.message || "").slice(0, 120)}`;
  return uieHashString(base).toString(16);
}

function uiePassesDedup(envelope) {
  try {
    const key = uieDedupKey(envelope);
    const now = PulseRealm.PulseNOW;
    const last = uieLastEnvelopeByKey[key];
    if (last && now - last < UIE_DEDUP_WINDOW_MS) {
      return false;
    }
    uieLastEnvelopeByKey[key] = now;
    return true;
  } catch {
    return true;
  }
}
// ============================================================================
//  REMOTE BEACON / EVIDENCE UPLOAD (IMMORTAL, CLEAN VERSION)
// ============================================================================
// ============================================================================
//  REMOTE BEACON (ERROR-PAGE-SAFE, IMMORTAL, ZERO-SPAM EDITION)
// ============================================================================

// Hard cooldown: only allow 1 send per 30 seconds on the error page
const UIE_REMOTE_THROTTLE_MS = 30_000;
// ============================================================================
//  REMOTE BEACON — ERROR PAGE SAFE MODE (FINAL VERSION)
// ============================================================================

// Immediately disabled on error page
let UIE_BEACON_DISABLED = true;

function uieSendRemoteBeacon(envelope) {
  // Do absolutely nothing on the error page
  return;
}

// ============================================================================
//  APPEND + MIRROR
// ============================================================================

async function appendUIErrorRecord(kind, payload) {
  const entry = {
    ts: PulseRealm.PulseNOW,
    kind,
    payload
  };

  const buf = await uieLoadBuffer();
  buf.push(entry);
  uieSaveBuffer(buf);

  // CoreMemory mirror via bridge (router-style snapshot)
  try {
    getCore().setRouteSnapshot("ui_errors", {
      schemaVersion: UIE_SCHEMA_VERSION,
      version: "30.0-Immortal-Evo++++",
      kind,
      entry,
      timestamp: PulseRealm.PulseNOW
    });
  } catch {}

  // Optional: append to a rolling log channel
  try {
    getCore().appendLog("ui_errors_log", {
      schemaVersion: UIE_SCHEMA_VERSION,
      version: "30.0-Immortal-Evo++++",
      kind,
      entry
    });
  } catch {}

  // Optional: diagnostics bus
  try {
    getDiagnosticsBus().emit("ui_error_record", {
      kind,
      entry
    });
  } catch {}
}

export const PulseUIErrorStore = {
  getAll() {
    return uieLoadBuffer();
  },

  tail(n = 400) {
    const buf = uieLoadBuffer();
    return buf.slice(Math.max(0, buf.length - n));
  },

  clear() {
    uieSaveBuffer([]);

    try {
      getCore().setRouteSnapshot("ui_errors", {
        schemaVersion: UIE_SCHEMA_VERSION,
        version: "30.0-Immortal-Evo++++",
        cleared: true,
        timestamp: PulseRealm.PulseNOW
      });
    } catch {}
  }
};

// ============================================================================
// INTERNAL: advantage + integrity + experience blocks + severity/tags
// ============================================================================

function uieComputeAdvantage(packet) {
  const msg = packet.message || "";
  const stack = packet.stack || "";
  const origin = packet.origin || "";
  const route = packet.route || "";
  const surface = packet.surface || "";

  const msgLen = msg.length;
  const stackLen = stack.length;
  const originLen = origin.length;
  const routeLen = route.length;
  const surfaceLen = surface.length;

  const total = msgLen + stackLen + originLen + routeLen + surfaceLen || 1;
  const msgWeight = msgLen / total;
  const stackWeight = stackLen / total;
  const originWeight = originLen / total;
  const routeWeight = routeLen / total;
  const surfaceWeight = surfaceLen / total;

  const density = stackWeight;
  const entropyHint = 1 - Math.abs(0.5 - density) * 2;

  const advantage =
    0.4 * msgWeight +
    0.3 * stackWeight +
    0.15 * originWeight +
    0.1 * routeWeight +
    0.05 * surfaceWeight;

  return {
    msgLen,
    stackLen,
    originLen,
    routeLen,
    surfaceLen,
    totalSize: total,
    msgWeight,
    stackWeight,
    originWeight,
    routeWeight,
    surfaceWeight,
    density,
    entropyHint,
    advantage
  };
}

function uieComputeIntegrity(packet, advantage) {
  const base =
    0.15 * (packet.origin ? 1 : 0) +
    0.15 * (packet.name ? 1 : 0) +
    0.15 * (packet.route ? 1 : 0) +
    0.15 * (packet.surface ? 1 : 0) +
    0.15 * (packet.sessionId ? 1 : 0) +
    0.25 * (advantage.entropyHint ?? 0.5);

  const score = Math.max(0, Math.min(1, base));

  const status =
    score >= 0.97 ? "immortal" :
    score >= 0.90 ? "excellent" :
    score >= 0.75 ? "good" :
    score >= 0.60 ? "fair" :
    score >= 0.40 ? "degraded" :
                    "critical";

  const degraded = status === "degraded" || status === "critical";

  return { score, status, degraded };
}

function uieInferSeverity(packet) {
  const msg = (packet.message || "").toLowerCase();
  const name = (packet.name || "").toLowerCase();

  if (name.includes("rangeerror") || msg.includes("out of memory")) {
    return "fatal";
  }
  if (name.includes("referenceerror")) {
    return "critical";
  }
  if (name.includes("typeerror") || msg.includes("undefined")) {
    return "error";
  }
  if (msg.includes("network") || msg.includes("timeout") || msg.includes("fetch")) {
    return "warning";
  }
  return "error";
}

function uieInferTags(packet) {
  const tags = new Set();

  const msg = (packet.message || "").toLowerCase();
  const origin = (packet.origin || "").toLowerCase();
  const route = (packet.route || "").toLowerCase();
  const surface = (packet.surface || "").toLowerCase();

  if (origin.includes("router") || surface.includes("router")) tags.add("router");
  if (origin.includes("flow") || surface.includes("flow")) tags.add("ui-flow");
  if (origin.includes("portal") || surface.includes("portal")) tags.add("portal");
  if (origin.includes("overmind") || surface.includes("overmind")) tags.add("overmind");
  if (origin.includes("admin") || surface.includes("admin")) tags.add("admin");
  if (origin.includes("diagnostics") || surface.includes("diagnostics")) tags.add("diagnostics");
  if (origin.includes("skin") || surface.includes("skin")) tags.add("skin");
  if (origin.includes("binary") || surface.includes("binary")) tags.add("binary");
  if (origin.includes("band") || surface.includes("band")) tags.add("PulseBand");

  if (msg.includes("network")) tags.add("network");
  if (msg.includes("timeout")) tags.add("timeout");
  if (msg.includes("fetch")) tags.add("fetch");
  if (msg.includes("chunk")) tags.add("chunk");
  if (msg.includes("sql")) tags.add("sql");
  if (msg.includes("firestore") || msg.includes("firebase")) tags.add("firestore");
  if (route.includes("/admin")) tags.add("admin-route");
  if (route.includes("/portal")) tags.add("portal-route");

  return Array.from(tags);
}

function uieBuildExperienceBlocks(packet, advantage, integrity, severity, tags, correlationId) {
  return {
    schemaVersion: UIE_SCHEMA_VERSION,
    blocks: [
      {
        id: "ui.error.core",
        kind: "error-core",
        origin: packet.origin,
        name: packet.name,
        messagePreview: (packet.message || "").slice(0, 160),
        route: packet.route || null,
        surface: packet.surface || null,
        band: packet.band || null,
        sessionId: packet.sessionId || null,
        correlationId: correlationId || null
      },
      {
        id: "ui.error.advantage",
        kind: "advantage",
        msgLen: advantage.msgLen,
        stackLen: advantage.stackLen,
        originLen: advantage.originLen,
        routeLen: advantage.routeLen,
        surfaceLen: advantage.surfaceLen,
        totalSize: advantage.totalSize,
        msgWeight: advantage.msgWeight,
        stackWeight: advantage.stackWeight,
        originWeight: advantage.originWeight,
        routeWeight: advantage.routeWeight,
        surfaceWeight: advantage.surfaceWeight,
        density: advantage.density,
        entropyHint: advantage.entropyHint,
        advantage: advantage.advantage
      },
      {
        id: "ui.error.integrity",
        kind: "integrity",
        score: integrity.score,
        status: integrity.status,
        degraded: integrity.degraded
      },
      {
        id: "ui.error.classification",
        kind: "classification",
        severity,
        tags
      }
    ]
  };
}

function uieBuildEnvelopeId(packet, signature, correlationId) {
  const base = `${packet.origin || "unknown"}:${packet.name || "Error"}:${signature}:${correlationId || "none"}`;
  const h = uieHashString(base);
  return `UIE-${UIE_SCHEMA_VERSION}-${h.toString(16).padStart(8, "0")}`;
}

function uieCorrelationId() {
  try {
    const base =
      (PulseRealm.PulseBand?.sessionId) ||
      (PulseRealm.PulsePortal?.meta?.sessionId) ||
      "";
    const t = (PulseRealm.PulseNOW || Date.now()).toString(16);
    const r = Math.floor(Math.random() * 0xffffffff).toString(16);
    return `UIE-CORR-${base || "anon"}-${t}-${r}`;
  } catch {
    const t = (PulseRealm.PulseNOW || Date.now()).toString(16);
    const r = Math.floor(Math.random() * 0xffffffff).toString(16);
    return `UIE-CORR-anon-${t}-${r}`;
  }
}

function internalBroadcastX(envelope, opts = {}) {
    const fromCrossTab = !!opts.fromCrossTab;

    if (!uiePassesDedup(envelope)) {
      appendUIErrorRecord("dedup_skipped", envelope);
      return;
    }

    if (!uieShouldSample("broadcast", envelope)) {
      appendUIErrorRecord("sample_skipped", envelope);
      return;
    }

    appendUIErrorRecord("broadcast", envelope);

    const packet = envelope.packet;

    // Window logger
    try {
      PulseRealm.PulseLogError(envelope);
    } catch {}

    // EvolutionaryPage
    try {
      PulseRealm.PulseEvolutionaryPage.onError(envelope);
    } catch {}

    try {
      PulseRealm.PulseUIFlow.onError(envelope);
    } catch {}

    // RouterOrgan
    try {
      PulseRealm.PulseRouter.onError(envelope);
    } catch {}

    // Cortex
    try {
      PulseRealm.PulseCortex.onError(envelope);
    } catch {}

    // MemoryOrgan
    try {
      PulseRealm.PulseCoreMemory.onError(envelope);
    } catch {}

    // BinaryOrgan
    try {
      PulseRealm.PulseBinary.onError(envelope);
    } catch {}

    // Overmind / Crown layer
    try {
      PulseRealm.PulseOvermindPrime.onError(envelope);
    } catch {}

    // Admin diagnostics organ
    try {
      PulseRealm.AdminDiagnosticsOrgan.onError(envelope);
    } catch {}

    // PulseWorld Admin Panel
    try {
      PulseRealm.PulseWorldAdminPanel.onError(envelope);
    } catch {}

    // Understanding (SDN)
    try {
      PulseRealm.PulseSDN.emitImpulse("ErrorSpine", {
        modeKind: "dual",
        executionContext: {
          sceneType: "error",
          workloadClass: "ui-error",
          dispatchSignature: "PulseUIErrors.v30",
          shapeSignature: "error-spine",
          extensionId: "PulseUIErrors"
        },
        errorEnvelope: envelope
      });
    } catch {}

    // Evidence bus (for AI evidence alignment)
    try {
      getEvidenceBus().recordErrorEvidence({
        envelope,
        severity: envelope.severity,
        tags: envelope.tags
      });
    } catch {}

    // Binary shadow
    try {
      PulseRealm.PulseBinary.Vitals.generate();
    } catch {}

    // SkinReflex
    try {
      PulseRealm.PulseSkinReflex.onError(envelope);
    } catch {}

    // CoreMemory mirror (full envelope)
    try {
      getCore().setRouteSnapshot("ui_errors_last", envelope);
    } catch {}

    // Remote beacon (throttled)
    try {
      uieSendRemoteBeacon(envelope);
    } catch {}

    // Cross-tab fanout (only from local origin to avoid loops)
    if (!fromCrossTab) {
      try {
        crossTabBroadcast(envelope);
      } catch {}
    }
  }

// ============================================================================
// UNIVERSAL ERROR SPINE v30
// ============================================================================
export const PulseUIErrors = (() => {
  const spineMeta = Object.freeze({
    layer: "PulseUIErrors",
    role: "universal-error-spine",
    version: "30.0-Immortal-Evo++++",
    schemaVersion: UIE_SCHEMA_VERSION,
    evo: {
      driftSafe: true,
      membraneSafe: true,
      organismWide: true,
      dualBandAware: true,
      binaryAware: true,
      symbolicAware: true,
      uiFlowAware: true,
      skinReflexAware: true,
      evolutionaryPageAware: true,
      cortexAware: true,
      routerAware: true,
      coreMemoryMirrored: true,
      experienceBlocksAware: true,
      unifiedAdvantageField: true,
      portalAware: true,
      overmindAware: true,
      adminPanelAware: true,
      diagnosticsAware: true,
      evidenceAware: true,
      multiMindAware: true,
      pulseBandAware: true,
      sessionAware: true,
      routeAware: true,
      surfaceAware: true,
      severityAware: true,
      tagAware: true,
      correlationAware: true,
      samplingAware: true,
      dedupAware: true,
      crossTabAware: true,
      beaconAware: true,
      sdnAware: true
    }
  });

  let crossTabChannel = null;

  function readSurfaceContext() {
    try {
      const portal = PulseRealm.PulsePortal || null;
      const env = portal?.env || null;
      const meta = portal?.meta || null;

      const route = `/${PulseRealm.__PULSE_CURRENT_PAGE__}` || meta.route || null;


      const band =
        PulseRealm.PulseBand?.mode ||
        null;

      const sessionId =
        PulseRealm.PulseBand?.sessionId ||
        null;

      return {
        route,
        surface: meta?.pulseRole?.identity || "unknown-surface",
        band,
        sessionId,
        env
      };
    } catch {
      return {
        route: null,
        surface: "unknown-surface",
        band: null,
        sessionId: null,
        env: null
      };
    }
  }

  // --------------------------------------------------------------------------
  // NORMALIZER — convert ANY error into a safe packet + envelope
  // --------------------------------------------------------------------------
  function normalizeError(err, origin = "unknown") {
    const surfaceCtx = readSurfaceContext();
    const correlationId = uieCorrelationId();

    let packet;
    try {
      packet = {
        origin,
        message: err?.message ?? String(err),
        name: err?.name ?? "Error",
        stack: err?.stack ?? null,
        time: PulseRealm.PulseNOW,
        meta: spineMeta,
        route: surfaceCtx.route,
        surface: surfaceCtx.surface,
        band: surfaceCtx.band,
        sessionId: surfaceCtx.sessionId,
        env: surfaceCtx.env || null
      };
    } catch {
      packet = {
        origin,
        message: "Unknown error",
        name: "Unknown",
        stack: null,
        time: PulseRealm.PulseNOW,
        meta: spineMeta,
        route: surfaceCtx.route,
        surface: surfaceCtx.surface,
        band: surfaceCtx.band,
        sessionId: surfaceCtx.sessionId,
        env: surfaceCtx.env || null
      };
    }

    const advantage = uieComputeAdvantage(packet);
    const integrity = uieComputeIntegrity(packet, advantage);
    const severity = uieInferSeverity(packet);
    const tags = uieInferTags(packet);

    const baseEnvelope = {
      schemaVersion: UIE_SCHEMA_VERSION,
      version: spineMeta.version,
      packet,
      advantage,
      integrity,
      severity,
      tags,
      correlationId,
      timestamp: packet.time
    };

    const sigSource = JSON.stringify(baseEnvelope);
    const signature =
      "UIE_SIG_" + uieHashString(sigSource).toString(16).padStart(8, "0");
    const id = uieBuildEnvelopeId(packet, signature, correlationId);
    const experience = uieBuildExperienceBlocks(
      packet,
      advantage,
      integrity,
      severity,
      tags,
      correlationId
    );

    const envelope = {
      ...baseEnvelope,
      id,
      signature,
      experience
    };

    appendUIErrorRecord("normalize", envelope);
    return envelope;
  }

  // --------------------------------------------------------------------------
  // ROUTING SIGNALS — let errors dominate via signal graph
  // --------------------------------------------------------------------------
  function emitRoutingSignals(envelope) {
    try {
      const signals = PulseRealm.PulseSignals || PulseRealm.PulseSignalBus || null;
      if (!signals) return;

      const emit =
        (signals.emit && signals.emit.bind(signals)) ||
        (signals.broadcast && signals.broadcast.bind(signals));

      if (!emit) return;

      const surfaceCtx = {
        route: envelope.packet.route,
        surface: envelope.packet.surface,
        band: envelope.packet.band,
        sessionId: envelope.packet.sessionId,
        env: envelope.packet.env
      };

      emit("ui.error", {
        envelope,
        surfaceCtx
      });

      emit("ui.error.route", {
        route: surfaceCtx.route,
        envelope
      });

      emit("ui.error.surface", {
        surface: surfaceCtx.surface,
        envelope
      });

      emit("ui.error.severity", {
        severity: envelope.severity,
        tags: envelope.tags,
        envelope
      });

      emit("ui.error.router", {
        route: surfaceCtx.route,
        correlationId: envelope.correlationId,
        envelope
      });

      emit("ui.error.system", {
        meta: envelope.packet.meta,
        advantage: envelope.advantage,
        integrity: envelope.integrity,
        envelope
      });

      appendUIErrorRecord("routing_signals_emitted", envelope);
    } catch (err) {
      appendUIErrorRecord("routing_signals_failed", {
        envelope,
        error: String(err)
      });
    }
  }

  // --------------------------------------------------------------------------
  // CROSS-TAB CHANNEL — reflex-safe, normalized envelopes
  // --------------------------------------------------------------------------
  function initCrossTabChannel() {
    try {
      if (typeof BroadcastChannel !== "undefined") {
        crossTabChannel = new BroadcastChannel(UIE_CROSS_TAB_CHANNEL);

        crossTabChannel.onmessage = (evt) => {
          const data = evt.data;
          if (!data || !data.__PulseUIErrorEnvelope) return;

          const env = data.envelope || {};

          env.packet = env.packet || {};
          env.packet.route   = env.packet.route   || "UNKNOWN_ROUTE";
          env.packet.surface = env.packet.surface || "UNKNOWN_SURFACE";
          env.packet.message = env.packet.message || "Unknown UI error";
          env.packet.lineage = env.packet.lineage || [];
          env.packet.cosmos  = env.packet.cosmos  || {};
          env.packet.band    = env.packet.band    || null;
          env.packet.sessionId = env.packet.sessionId || null;
          env.packet.env     = env.packet.env     || null;

          appendUIErrorRecord("cross_tab", env);
          internalBroadcast(env, { fromCrossTab: true });
        };
      }
    } catch {
      crossTabChannel = null;
    }
  }

  function crossTabBroadcast(envelope) {
    if (!crossTabChannel) return;

    try {
      const env = envelope || {};

      env.packet = env.packet || {};
      env.packet.route   = env.packet.route   || "UNKNOWN_ROUTE";
      env.packet.surface = env.packet.surface || "UNKNOWN_SURFACE";
      env.packet.message = env.packet.message || "Unknown UI error";
      env.packet.lineage = env.packet.lineage || [];
      env.packet.cosmos  = env.packet.cosmos  || {};
      env.packet.band    = env.packet.band    || null;
      env.packet.sessionId = env.packet.sessionId || null;
      env.packet.env     = env.packet.env     || null;

      crossTabChannel.postMessage({
        __PulseUIErrorEnvelope: true,
        envelope: env
      });
    } catch {}
  }

  // --------------------------------------------------------------------------
  // INTERNAL BROADCAST — core fanout, used by both local + cross-tab
  // --------------------------------------------------------------------------
  function internalBroadcast(envelope, opts = {}) {
    const fromCrossTab = !!opts.fromCrossTab;

    if (!uiePassesDedup(envelope)) {
      appendUIErrorRecord("dedup_skipped", envelope);
      return;
    }

    if (!uieShouldSample("broadcast", envelope)) {
      appendUIErrorRecord("sample_skipped", envelope);
      return;
    }

    appendUIErrorRecord("broadcast", envelope);

    try {
      PulseRealm.PulseLogError(envelope);
    } catch {}

    try {
      PulseRealm.PulseEvolutionaryPage.onError(envelope);
    } catch {}

    try {
      PulseRealm.PulseUIFlow.onError(envelope);
    } catch {}

    try {
      PulseRealm.PulseRouter.onError(envelope);
    } catch {}

    try {
      PulseRealm.PulseCortex.onError(envelope);
    } catch {}

    try {
      PulseRealm.PulseCoreMemory.onError(envelope);
    } catch {}

    try {
      PulseRealm.PulseBinary.onError(envelope);
    } catch {}

    try {
      PulseRealm.PulseOvermindPrime.onError(envelope);
    } catch {}

    try {
      PulseRealm.AdminDiagnosticsOrgan.onError(envelope);
    } catch {}

    try {
      PulseRealm.PulseWorldAdminPanel.onError(envelope);
    } catch {}

    try {
      PulseRealm.PulseSDN.emitImpulse("ErrorSpine", {
        modeKind: "dual",
        executionContext: {
          sceneType: "error",
          workloadClass: "ui-error",
          dispatchSignature: "PulseUIErrors.v30",
          shapeSignature: "error-spine",
          extensionId: "PulseUIErrors"
        },
        errorEnvelope: envelope
      });
    } catch {}

    try {
      getEvidenceBus().recordErrorEvidence({
        envelope,
        severity: envelope.severity,
        tags: envelope.tags
      });
    } catch {}

    try {
      PulseRealm.PulseBinary.Vitals.generate();
    } catch {}

    try {
      PulseRealm.PulseSkinReflex.onError(envelope);
    } catch {}

    try {
      getCore().setRouteSnapshot("ui_errors_last", envelope);
    } catch {}

    try {
      uieSendRemoteBeacon(envelope);
    } catch {}

    emitRoutingSignals(envelope);

    if (!fromCrossTab) {
      try {
        crossTabBroadcast(envelope);
      } catch {}
    }
  }

  // --------------------------------------------------------------------------
  // PUBLIC BROADCAST — external callers
  // --------------------------------------------------------------------------
  function broadcast(envelope) {
    internalBroadcast(envelope, { fromCrossTab: false });
  }

  // --------------------------------------------------------------------------
  // CAPTURE — global listeners
  // --------------------------------------------------------------------------
  function installGlobalHandlers() {
    window.addEventListener("error", (e) => {
      const envelope = normalizeError(e.error || e, "PulseRealm.error");
      appendUIErrorRecord("PulseRealm.error", envelope);
      broadcast(envelope);
    });

    window.addEventListener("unhandledrejection", (e) => {
      const envelope = normalizeError(
        e.reason || e,
        "PulseRealm.unhandledrejection"
      );
      appendUIErrorRecord("PulseRealm.unhandledrejection", envelope);
      broadcast(envelope);
    });

    try {
      PulseRealm.PulseSkinReflexErrorHandler((err) => {
        const envelope = normalizeError(err, "skin.reflex");
        appendUIErrorRecord("skin.reflex", envelope);
        broadcast(envelope);
      });
    } catch {}

    try {
      window.addEventListener("message", (evt) => {
        if (!evt.data || !evt.data.__PulseUIErrors) return;
        const envelope = normalizeError(
          evt.data.error || evt.data,
          evt.data.origin || "PulseRealm.message"
        );
        appendUIErrorRecord("PulseRealm.message", envelope);
        broadcast(envelope);
      });
    } catch {}
  }

  // --------------------------------------------------------------------------
  // INIT
  // --------------------------------------------------------------------------
  function init() {
    try {
      initCrossTabChannel();
    } catch {}
    try {
      installGlobalHandlers();
    } catch {}
  }

  init();

  return {
    meta: spineMeta,
    normalizeError,
    broadcast,
    init
  };
})();

export default PulseUIErrors;

// ============================================================================
// GLOBAL EXPOSURE OF IMMORTAL STORE + ERROR SPINE v30
// ============================================================================


    PulseRealm.PulseUIErrorStore = PulseUIErrorStore;
    PulseRealm.PulseUIErrors = PulseUIErrors;
  
    PulseRealm.PulseErrors = {
      PulseUIErrorStore,
      PulseUIErrors
    }