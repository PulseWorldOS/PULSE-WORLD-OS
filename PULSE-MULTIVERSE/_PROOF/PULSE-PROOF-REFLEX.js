/*
===============================================================================
FILE: /PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PulseUISkinReflex-v30.js
LAYER: A1 SURFACE REFLEX + A3 ERROR SPINE (v30 IMMORTAL+++ • BINARY ONE-BAND)
===============================================================================
*/
// -------------------------------------------------
  // GLOBAL DISPLAY FRAME MONITOR (rAF-based)
  // -------------------------------------------------
  // Ensure PulseRealm exists everywhere
import { PulseCoreGMemory } from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";
import { runWebGpuReflexWindow, collectGpuIdentity, runWebGpuHyperFrame, classifyMemoryPressure, measureSmoothnessIndex, computePulseGpuScore } from "./PULSE-PROOF-GPU.js"

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


const _REFLEX_CONSOLE = PulseRealm._nativeConsole || {
  log:            Function.prototype.bind.call(console.log,            console),
  warn:           Function.prototype.bind.call(console.warn,           console),
  error:          Function.prototype.bind.call(console.error,          console),
  group:          Function.prototype.bind.call(console.group,          console),
  groupCollapsed: Function.prototype.bind.call(console.groupCollapsed, console),
  groupEnd:       Function.prototype.bind.call(console.groupEnd,       console),
};

// ---------------------------------------------------------------------------
// GLOBAL ROOT
// ---------------------------------------------------------------------------

_REFLEX_CONSOLE.log("%c📜 PULSE PROOF MONITOR v30.0 — [PulseProofReflex v30] %cA1 Surface Reflex Error Spine Automated..",
  "color:#FF9800; font-weight:bold; font-family:monospace;",
  "color:#00FF9C; font-family:monospace;"
);

// ============================================================================
// IMMORTAL+++ BRIDGE RESOLUTION — NO DIRECT IMPORTS, NO TDZ
// ============================================================================

function getBridge() {
  try {
    return PulseRealm.PulseProofBridge || null;
  } catch {
    return null;
  }
}

function getCoreMemory() {
  return PulseRealm.PulseMemoryBridge || null;
}

function getDiagnosticsBus() {
  const b = getBridge();
  return b.diagnosticsBus || null;
}

function getEvidenceBus() {
  const b = getBridge();
  return b.evidenceBus || null;
}

function getSafeRoute() {
  return PulseRealm.PulseBridgeRoute || null;
}

function getUIFlowSnapshotSafe() {
  try {
    return PulseRealm.PulseUIFlow.snapshot() || null;
  } catch {
    return null;
  }
}

function getPulseUIErrors() {
  return PulseRealm.PulseUIErrors || null;
}

function getPageScanner() {
  return PulseRealm.PulsePageScanner || null;
}

function getRouteMemoryFactory() {
  return PulseRealm.PulseRouteMemory || PulseRealm.PulseRouteMemoryStore || null;
}

// ---------------------------------------------------------------------------
// ONLINE CHECK
// ---------------------------------------------------------------------------

function isOnline() {
  try {
    if (typeof PulseRealm.PULSE_ONLINE === "boolean") return PulseRealm.PULSE_ONLINE === true;
    if (typeof navigator !== "undefined" && "onLine" in navigator) {
      return !!navigator.onLine;
    }
  } catch {}
  return false;
}

// ---------------------------------------------------------------------------
// ROLE — v30 IMMORTAL+++ BINARY ONE-BAND
// ---------------------------------------------------------------------------

export const SkinReflexRole = {
  type: "Skin",
  subsystem: "PulseSkinReflex",
  layer: "A1-SurfaceReflex",
  version: "30.0-Immortal+++",
  identity: "PulseSkinReflex-v30-Immortal+++",

  evo: {
    driftProof: true,
    deterministicReflex: true,
    zeroState: true,
    zeroTiming: true,
    surfaceOnly: true,
    classificationFirst: true,
    healingTriggerOnly: true,

    // v30: binary one-band
    binaryAware: true,
    dualBand: false,
    bandKind: "binary",

    presenceAware: true,
    errorSpineIntegrated: true,
    pageScannerAware: true,
    routeMemoryAware: true,
    coreMemoryAware: true,
    cacheAware: true,
    offlineAware: true,
    pageCacheAware: true,
    meshV30Ready: true,
    sendV30Ready: true,
    futureEvolutionReady: true
  },

  reflex: {
    pageLevel: true,
    errorIntake: true,
    routeSampler: true,
    degradationAnnotator: true,
    binaryShadowTagger: true
  },

  pulseContract: "Pulse-v20/v24/v30",
  meshContract: "PulseMesh-v24/v30",
  sendContract: "PulseSend-v24/v30"
};

// ---------------------------------------------------------------------------
// GLOBALS / DIAGNOSTICS
// ---------------------------------------------------------------------------
const LAYER_ID = "SKIN-REFLEX";
const LAYER_NAME = "THE SKIN REFLEX";
const LAYER_ROLE = "UNIVERSAL ERROR GUARDIAN & HEALING TRIGGER";
const LAYER_VER = SkinReflexRole.version;


const PROTECTOR_DIAGNOSTICS_ENABLED =
  (PulseRealm.PULSE_PROTECTOR_DIAGNOSTICS === "true" ||
    PulseRealm.PULSE_DIAGNOSTICS === "true");

function logProtector(stage, details = {}) {
  if (!PROTECTOR_DIAGNOSTICS_ENABLED) return;
  if (typeof log !== "function") return;

  try {
    PulseRealm.PulseLog(
      JSON.stringify({
        pulseLayer: LAYER_ID,
        pulseName: LAYER_NAME,
        pulseRole: LAYER_ROLE,
        pulseVer: LAYER_VER,
        stage,
        ...details
      })
    );
  } catch {}
}

function safeSpine(err, origin) {
  try {
    const spine = getPulseUIErrors();
    if (!spine) return;
    const normalized = spine.normalizeError(err, origin);
    spine.broadcast(normalized);
  } catch {}
}

// ---------------------------------------------------------------------------
// ORGANISM MAP RESOLUTION (kept for context, v30-safe)
// ---------------------------------------------------------------------------

function getOrganismMapSafe() {
  try {

    const brain = PulseRealm.PulseOSBrain || null;
    if (
      brain &&
      (brain.PulseOrganismMap)
    ) {
      return (brain.PulseOrganismMap);
    }

    if (PulseRealm.PulseOrganismMap) {
      return PulseRealm.PulseOrganismMap;
    }

    return null;
  } catch {
    return null;
  }
}

function resolveOwnerModule(symbol) {
  try {
    if (typeof symbol !== "string") return null;

    const organism = getOrganismMapSafe();
    if (!organism || !organism.organs) return null;

    const organ = organism.organs[symbol];
    return organ ? organ.system : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// PULSE REFLEX SENSE REPORT v60‑IMMORTAL+++
// MAX DIAGNOSTIC ORGAN
// - Reflex Window: 1024 frames (stack timing, µs)
// - HyperFrame Window: 64ms burst (dt timing, µs)
// - Display Frame Delta: rAF-based frame timing (ms)
// - Every value has a label. No naked numbers.
// ---------------------------------------------------------------------------
(async () => {
  emitReflexSenseReport({
    message: "PulseProofReflex Page Reflex Triggered",
    page: `/?Impulse=${PulseRealm.__PULSE_CURRENT_PAGE__}`,
    file: detectCallerFile(),
    degraded: false,
    healthScore: 100,
    tier: "A",
    dnaTag: "SKIN-A1",
    driftSignature: "none",
    seq: "RFX-001"
  });

  

  // Only run rAF-based monitor in environments that support it
  const hasRAF =
    typeof window !== "undefined" &&
    typeof window.requestAnimationFrame === "function";
  const hasPerf =
    typeof performance !== "undefined" &&
    typeof performance.now === "function";

  if (hasRAF && hasPerf && !PulseRealm.__PULSE_FRAME_MONITOR) {
    PulseRealm.__PULSE_FRAME_MONITOR = {
      started: false,
      lastTs: performance.now(),
      lastDelta: 0,
      prevDelta: 0,
      drift: 0,
      jitter: 0,
      stability: 100
    };

    const fm = PulseRealm.__PULSE_FRAME_MONITOR;

    function frameLoop(ts) {
      const delta = ts - fm.lastTs;
      fm.prevDelta = fm.lastDelta;
      fm.lastDelta = delta;

      const drift = fm.prevDelta ? delta - fm.prevDelta : 0;
      fm.drift = drift;

      const jitter = Math.abs(drift);
      fm.jitter = jitter;

      const avg = (fm.prevDelta + delta) / 2 || delta || 1;
      const spread = Math.abs(delta - fm.prevDelta);
      fm.stability = Math.max(
        0,
        Math.min(100, 100 - (spread / avg) * 100)
      );

      fm.lastTs = ts;
      window.requestAnimationFrame(frameLoop);
    }

    fm.started = true;
    window.requestAnimationFrame(frameLoop);
  }
})();

// ---------------------------------------------------------------------------
// UPGRADED REFLEX SENSE REPORT (v70‑Immortal+++)
// Integrates: New Reflex, New HyperFrame, New Smoothness, New Memory, New Score
// Extended boot sense window: 200ms
// ---------------------------------------------------------------------------
async function emitReflexSenseReport(context = {}) {
  try {
    await Promise.resolve();

    if (typeof console === "undefined") return;

    // -----------------------------------------------------------------------
    // Auto‑Context (UPGRADED DOM TIMING)
    // -----------------------------------------------------------------------
    const now = performance.now();

    // ORIGINAL DOM STARTS (PRESERVED)
    const domStart  = PulseRealm.__DOM_START  || 0;
    const domStart2 = PulseRealm._2_DOM_START || 0;

    // SINGLE LOAD WINDOW (ONLY ONE LOAD START / END)
    const loadStart =
      window.__LOAD_START ??
      performance.timing?.domLoading ??
      domStart ??
      now;

    const loadEnd =
      window.__LOAD_END ??
      performance.timing?.loadEventEnd ??
      now;

    const domLoadFallback  = loadStart;
    const domLoadFallback2 = domStart2 || loadStart;

    // UPGRADED SINCE DOM WINDOWS
    const sinceDom  = now - (domStart  || domLoadFallback);
    const sinceDom2 = now - (domStart2 || domLoadFallback2);

    // Combined / comparative DOM timing (PRESERVED + UPGRADED)
    const domMin = Math.min(
      domStart  || domLoadFallback,
      domStart2 || domLoadFallback2
    );

    const domMax = Math.max(
      domStart  || domLoadFallback,
      domStart2 || domLoadFallback2
    );

    const domSpanMs  = domMax - domMin;
    const domTotalMs = sinceDom + sinceDom2;

    const autoPage = `?Impulse=${PulseRealm.__PULSE_CURRENT_PAGE__}` || "Unknown";

    const autoFile = (() => {
      let p = autoPage;
      if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
      if (p === "/") return "Root";
      const last = p.split("/").pop();
      return last || "Unknown";
    })();

    const autoSeq = crypto.randomUUID ? crypto.randomUUID() : `Seq-${PulseRealm.PulseNOW}`;
    const autoLine = "0";
    const autoTimestamp = now;

    // UPGRADED DOM START (USED IN SOURCE CONTEXT)
    const autoDom =
      domStart ||
      loadStart ||
      performance.timing?.domLoading ||
      now;

    // -----------------------------------------------------------------------
    // Mode Flags / Boot Window
    // -----------------------------------------------------------------------
    const BOOT_SENSE_WINDOW_MS = 200;

    const hyperExplicitOn  = context.hyper === true;
    const hyperExplicitOff = context.hyper === false;
    const perfDropFlag     = context.perfDrop === true;

    const inBootWindow =
      sinceDom >= 0 &&
      sinceDom <= BOOT_SENSE_WINDOW_MS;

    const enableHyperFrame =
      !hyperExplicitOff &&
      (true || hyperExplicitOn || perfDropFlag || inBootWindow);

    // -----------------------------------------------------------------------
    // GPU Modules (PRESERVED)
    // -----------------------------------------------------------------------
    const identity = await collectGpuIdentity();
    const reflex   = PulseRealm.PulseProofGPUReflex || await runWebGpuReflexWindow(identity);
    PulseRealm.PulseProofGPUReflex = reflex;

    const smooth   = await measureSmoothnessIndex();
    const hyper    = enableHyperFrame ? await runWebGpuHyperFrame(identity) : { available: false };
    PulseRealm.PulseProofGPUHyperFrame = hyper;
    
    const memory   = classifyMemoryPressure(identity);
    const score    = computePulseGpuScore({ reflex, hyper, memory, smooth });
    
    PulseRealm.PulseProofGPUReflex = reflex;
    // -----------------------------------------------------------------------
    // Merge Context (PRESERVED)
    // -----------------------------------------------------------------------
    const {
      message = "PulseReflex AutoSense Triggered",
      file = autoFile,
      line = autoLine,
      degraded = false,
      healthScore = score.score ?? 100,
      tier = score.tier ?? "A1",
      dnaTag = "SKIN-A1",
      driftSignature = "None",
      page = autoPage,
      seq = autoSeq,
      timestamp = autoTimestamp,
      dom = autoDom
    } = context;

    // -----------------------------------------------------------------------
    // Report Header (PRESERVED)
    // -----------------------------------------------------------------------
    _REFLEX_CONSOLE.groupCollapsed(
      `%c📜 PULSE PROOF MONITOR v30.0 — [PulseProofReflex • Pulse Gpu Sense Report [${page}] • v90‑Immortal+++]`,
      "color:#FF9800; font-weight:bold;"
    );

    // -----------------------------------------------------------------------
    // DOM Windows (Dual DOM & Total Span) — UPGRADED
    // -----------------------------------------------------------------------
    _REFLEX_CONSOLE.group("%cDom Windows (Dual Dom & Total Span)", "color:#607D8B; font-weight:bold;");
    _REFLEX_CONSOLE.log(" • Dom1 Start Ms .", domStart);
    _REFLEX_CONSOLE.log(" • Dom2 Start Ms .", domStart2);
    _REFLEX_CONSOLE.log(" • Load Start Ms .", loadStart);
    _REFLEX_CONSOLE.log(" • Load End Ms .", loadEnd);
    _REFLEX_CONSOLE.log(" • Dom1 Fallback Load Ms .", domLoadFallback);
    _REFLEX_CONSOLE.log(" • Dom2 Fallback Load Ms .", domLoadFallback2);
    _REFLEX_CONSOLE.log(" • Since Dom1 Ms .", sinceDom.toFixed(4));
    _REFLEX_CONSOLE.log(" • Since Dom2 Ms .", sinceDom2.toFixed(4));
    _REFLEX_CONSOLE.log(" • Dom Min Start Ms .", domMin.toFixed(4));
    _REFLEX_CONSOLE.log(" • Dom Max Start Ms .", domMax.toFixed(4));
    _REFLEX_CONSOLE.log(" • Dom Span Ms (Max–Min) .", domSpanMs.toFixed(4));
    _REFLEX_CONSOLE.log(" • Dom Total Ms (Dom1+Dom2) .", domTotalMs.toFixed(4));
    _REFLEX_CONSOLE.groupEnd();


    // -----------------------------------------------------------------------
    // GPU Identity (PRESERVED)
    // -----------------------------------------------------------------------
    _REFLEX_CONSOLE.group("%cGpu Identity", "color:#4CAF50; font-weight:bold;");
    _REFLEX_CONSOLE.log(" • Environment .", identity.environment);

    if (identity.webgpu) {
      _REFLEX_CONSOLE.log(" • Adapter Name .", identity.webgpu.name);
      _REFLEX_CONSOLE.log(" • Vendor .", identity.webgpu.vendor);
      _REFLEX_CONSOLE.log(" • Architecture .", identity.webgpu.architecture);
      _REFLEX_CONSOLE.log(" • Timestamp Queries .", identity.webgpu.timestampQueriesSupported);
    }

    if (identity.webgl2) {
      _REFLEX_CONSOLE.log(" • Webgl2 Renderer .", identity.webgl2.renderer);
      _REFLEX_CONSOLE.log(" • Webgl2 Vendor .", identity.webgl2.vendor);
    }
    _REFLEX_CONSOLE.groupEnd();

    if (reflex.available) {

      const best   = Math.max(reflex.bestMs, 0.0001);
      const avg    = Math.max(reflex.avgMs, 0.0001);
      const worst  = Math.max(reflex.worstMs, 0.0001);
      const spike  = Math.max(reflex.spikeMs, 0);
      let stability = Math.max(0, Math.min(100, reflex.stability));

      let reflexDriftMs = Math.max(avg - best, 0);

      const isSoft =
        reflex.kind === "soft-reflex" ||
        (reflex.reason && reflex.reason.toLowerCase().includes("softreflex"));

      let reflexDriftMonth = 0;
      let reflexDriftYear  = 0;

      if (!isSoft) {
        const SECONDS_PER_MONTH = 30 * 24 * 60 * 60;
        const SECONDS_PER_YEAR  = 365 * 24 * 60 * 60;

        const hz = reflex.estimatedHz || 60;

        const driftPerSecond = reflexDriftMs * hz;

        reflexDriftMonth = driftPerSecond * SECONDS_PER_MONTH;
        reflexDriftYear  = driftPerSecond * SECONDS_PER_YEAR;

        reflexDriftMonth = Math.min(reflexDriftMonth, 1_000_000);
        reflexDriftYear  = Math.min(reflexDriftYear, 5_000_000);
      }
      // -----------------------------------------------------------------------
      // Reflex Window (Gpu Timing) — PRESERVED
      // -----------------------------------------------------------------------
      _REFLEX_CONSOLE.group("%cReflex Window (Gpu Timing)", "color:#8BC34A; font-weight:bold;");
      _REFLEX_CONSOLE.log(" • Kind .", reflex.kind);
      _REFLEX_CONSOLE.log(" • Samples .", reflex.samples);
      _REFLEX_CONSOLE.log(" • Best Ms .", best.toFixed(4));
      _REFLEX_CONSOLE.log(" • Avg Ms .", avg.toFixed(4));
      _REFLEX_CONSOLE.log(" • Worst Ms .", worst.toFixed(4));
      _REFLEX_CONSOLE.log(" • Spike Ms .", spike.toFixed(4));
      _REFLEX_CONSOLE.log(" • Stability 0–100 .", stability.toFixed(2));
      _REFLEX_CONSOLE.log(" • Drift Ms .", reflexDriftMs.toFixed(6));
      _REFLEX_CONSOLE.log(" • Drift Month Ms .", reflexDriftMonth.toFixed(6));
      _REFLEX_CONSOLE.log(" • Drift Year Ms .", reflexDriftYear.toFixed(6));
      _REFLEX_CONSOLE.log(" • Reason .", reflex.reason);

    } else {
      _REFLEX_CONSOLE.group("%cReflex Window (Gpu Timing)", "color:#8BC34A; font-weight:bold;");
      _REFLEX_CONSOLE.log(" • Reflex Unavailable .", reflex.reason);
    }
    _REFLEX_CONSOLE.groupEnd();

    if (hyper.available) {

      const best = Math.max(hyper.bestDtMs, 0.0001);
      const avg  = Math.max(hyper.avgDtMs, 0.0001);

      let hyperDriftMs = hyper.driftMs ?? (avg - best);
      hyperDriftMs = Math.max(hyperDriftMs, 0);

      const hyperDriftMonth = hyperDriftMs * (30 * 24 * 60 * 60 * 1000 / avg);
      const hyperDriftYear  = hyperDriftMs * (365 * 24 * 60 * 60 * 1000 / avg);
      // -----------------------------------------------------------------------
      // Hyperframe Window — PRESERVED
      // -----------------------------------------------------------------------
      _REFLEX_CONSOLE.group("%cHyperframe Window (Gpu Compute Burst)", "color:#009688; font-weight:bold;");
      _REFLEX_CONSOLE.log(" • Samples .", hyper.samples);
      _REFLEX_CONSOLE.log(" • Best Dt Ms .", best.toFixed(4));
      _REFLEX_CONSOLE.log(" • Avg Dt Ms .", avg.toFixed(4));
      _REFLEX_CONSOLE.log(" • Worst Dt Ms .", hyper.worstDtMs.toFixed(4));
      _REFLEX_CONSOLE.log(" • Stability 0–100 .", hyper.stability.toFixed(2));
      _REFLEX_CONSOLE.log(" • Drift Ms .", hyperDriftMs.toFixed(6));
      _REFLEX_CONSOLE.log(" • Drift Month Ms .", hyperDriftMonth.toFixed(6));
      _REFLEX_CONSOLE.log(" • Drift Year Ms .", hyperDriftYear.toFixed(6));

    } else {
      // -----------------------------------------------------------------------
      // Hyperframe Window — PRESERVED
      // -----------------------------------------------------------------------
      _REFLEX_CONSOLE.group("%cHyperframe Window (Gpu Compute Burst)", "color:#009688; font-weight:bold;");
      _REFLEX_CONSOLE.log(" • Hyperframe Unavailable .", hyper.reason || "Disabled");
    }
    _REFLEX_CONSOLE.groupEnd();

    if (smooth.available) {

      const drift = Math.max(smooth.avgDriftMs, 0.0001);

      const smoothDriftMonth = drift * (30 * 24 * 60 * 60 * 1000 / drift);
      const smoothDriftYear  = drift * (365 * 24 * 60 * 60 * 1000 / drift);
      // -----------------------------------------------------------------------
      // Smoothness Index — PRESERVED
      // -----------------------------------------------------------------------
      _REFLEX_CONSOLE.group("%cSmoothness Index (Raf Drift & Jitter)", "color:#FFC107; font-weight:bold;");
      _REFLEX_CONSOLE.log(" • Samples .", smooth.samples);
      _REFLEX_CONSOLE.log(" • Avg Drift Ms .", drift.toFixed(4));
      _REFLEX_CONSOLE.log(" • Jitter Ms .", smooth.jitterMs.toFixed(4));
      _REFLEX_CONSOLE.log(" • Stability 0–100 .", smooth.stability.toFixed(2));
      _REFLEX_CONSOLE.log(" • Estimated Hz .", smooth.hzEstimate);
      _REFLEX_CONSOLE.log(" • Drift Month Ms .", smoothDriftMonth.toFixed(6));
      _REFLEX_CONSOLE.log(" • Drift Year Ms .", smoothDriftYear.toFixed(6));

    } else {
      // -----------------------------------------------------------------------
      // Smoothness Index — PRESERVED
      // -----------------------------------------------------------------------
      _REFLEX_CONSOLE.group("%cSmoothness Index (Raf Drift & Jitter)", "color:#FFC107; font-weight:bold;");
      _REFLEX_CONSOLE.log(" • Smoothness Unavailable .");
    }
    _REFLEX_CONSOLE.groupEnd();

    // -----------------------------------------------------------------------
    // Memory Pressure — PRESERVED
    // -----------------------------------------------------------------------
    _REFLEX_CONSOLE.group("%cMemory Pressure", "color:#E91E63; font-weight:bold;");

    if (memory.available) {
      _REFLEX_CONSOLE.log(" • Pressure .", memory.pressure);
      _REFLEX_CONSOLE.log(" • Tier .", memory.tier);
      _REFLEX_CONSOLE.log(" • Max Buffer Size .", memory.maxBufferSize);
      _REFLEX_CONSOLE.log(" • Max Texture Size .", memory.maxTextureSize);
    } else {
      _REFLEX_CONSOLE.log(" • Memory Unavailable .", memory.reason);
    }
    _REFLEX_CONSOLE.groupEnd();

    // -----------------------------------------------------------------------
    // Pulse GPU Score — PRESERVED
    // -----------------------------------------------------------------------
    _REFLEX_CONSOLE.group("%cPulse Gpu Score", "color:#9C27B0; font-weight:bold;");
    _REFLEX_CONSOLE.log(" • Score 0–100 .", (score.score ?? 0).toFixed(2));
    _REFLEX_CONSOLE.log(" • Tier .", score.tier);
    _REFLEX_CONSOLE.log(" • Class .", score.className);
    _REFLEX_CONSOLE.groupEnd();

    // -----------------------------------------------------------------------
    // Source Context — UPGRADED DOM LOGIC
    // -----------------------------------------------------------------------
    const domStartMs =
      dom ||
      domStart ||
      domLoadFallback ||
      performance.timing?.domLoading ||
      now;

    const sinceDomMs =
      timestamp - domStartMs;

    _REFLEX_CONSOLE.group("%cSource Context", "color:#03A9F4; font-weight:bold;");
    _REFLEX_CONSOLE.log(" • Message .", message);
    _REFLEX_CONSOLE.log(" • File .", file);
    _REFLEX_CONSOLE.log(" • Line .", line);
    _REFLEX_CONSOLE.log(" • Page .", page);
    _REFLEX_CONSOLE.log(" • Sequence .", seq);
    _REFLEX_CONSOLE.log(" • Timestamp Ms .", timestamp);
    _REFLEX_CONSOLE.log(" • Dom Start Ms .", domStartMs);
    _REFLEX_CONSOLE.log(" • Since Dom Ms .", sinceDomMs.toFixed(4));
    _REFLEX_CONSOLE.log(" • Boot Window Ms .", BOOT_SENSE_WINDOW_MS);
    _REFLEX_CONSOLE.log(" • In Boot Window .", inBootWindow);
    _REFLEX_CONSOLE.groupEnd();

    // -----------------------------------------------------------------------
    // Health — PRESERVED
    // -----------------------------------------------------------------------
    _REFLEX_CONSOLE.group("%cHealth", "color:#FF5722; font-weight:bold;");
    _REFLEX_CONSOLE.log(" • Degraded .", degraded);
    _REFLEX_CONSOLE.log(" • Health Score .", healthScore);
    _REFLEX_CONSOLE.log(" • Tier .", tier);
    _REFLEX_CONSOLE.log(" • Dna Tag .", dnaTag);
    _REFLEX_CONSOLE.log(" • Drift Signature .", driftSignature);
    _REFLEX_CONSOLE.groupEnd();

    // -----------------------------------------------------------------------
    // Raw Context — PRESERVED
    // -----------------------------------------------------------------------
    _REFLEX_CONSOLE.group("%cRaw Context", "color:#795548; font-weight:bold;");
    _REFLEX_CONSOLE.log(" • Context .", context);
    _REFLEX_CONSOLE.groupEnd();

    _REFLEX_CONSOLE.groupEnd();

  } catch {}
}


async function sessionCheck() {
  try {
   

      if (!PulseRealm.PulseWorld) PulseRealm.PulseWorld = {};
    

    if (!PulseRealm.PulseIdentity) {
      logProtector("SESSIONCHECK_UNTRUSTED", {
        trustedDevice: false
      });
      return null;
    }

    logProtector("SESSIONCHECK_OK", { trustedDevice: true });
    return id;
  } catch (err) {
    safeSpine(err, "PulseBootReflex.sessionCheck");
    return null;
  }
}

// ---------------------------------------------------------------------------
// ROUTE CHECK
// ---------------------------------------------------------------------------

let hasBootedOnce = false;

function routeCheck() {
  try {
     if (!PulseRealm.PulseWorld) PulseRealm.PulseWorld = {};

    const lastPage = PulseRealm.PulseWorld.pageName || null;
    const pageName = `/${PulseRealm.__PULSE_CURRENT_PAGE__}` || "Unknown";


    PulseRealm.PulseWorld.lastPage = lastPage;
    PulseRealm.PulseWorld.pageName = pageName;

    const needsHealing =
      !pageName ||
      pageName === "unknown" ||
      pageName.trim() === "" ||
      pageName.includes("undefined") ||
      pageName.includes("//") ||
      lastPage === "unknown" ||
      (lastPage === null && hasBootedOnce);

    logProtector("ROUTECHECK_UPDATED", {
      pageName,
      lastPage,
      needsHealing
    });

    return { pageName, lastPage, needsHealing };
  } catch (err) {
    safeSpine(err, "PulseBootReflex.routeCheck");
    return { needsHealing: false };
  }
}

// ---------------------------------------------------------------------------
// PAGE SCANNER INTEL EMITTER (v30)
// ---------------------------------------------------------------------------

function emitPageScannerIntel(context = {}) {
  try {
    const PageScanner = getPageScanner();
    if (!PageScanner || typeof PageScanner.buildDriftPacket !== "function") {
      return;
    }

    const packet = PageScanner.buildDriftPacket(context);

    if (packet && typeof packet.severity === "number") {
      logProtector("PAGESCANNER_DRIFT_INTEL", {
        severity: packet.severity,
        tooFar: !!packet.tooFar,
        hasStructural: !!packet.structural,
        tier: packet.tier,
        signature: packet.signature
      });
    }

    const diag = getDiagnosticsBus();
    try {
      diag.emit("PulseBootReflex.PageScannerIntel", packet);
    } catch {}

    if (PulseRealm.PageScannerAdapter) {
      if (typeof PulseRealm.PageScannerAdapter.onEvent === "function") {
        PulseRealm.PageScannerAdapter.onEvent(packet);
      }
    }
  } catch (err) {
    safeSpine(err, "pagescanner.emitIntel");
  }
}

// ---------------------------------------------------------------------------
// MISSING FIELD PARSER
// ---------------------------------------------------------------------------

function parseMissingField(message) {
  try {
    logProtector("PARSER_INVOKED", {});

    let match = message.match(/reading '([^']+)'/);
    if (match) return { table: "Users", field: match[1] };

    match = message.match(/([^ ]+) is not defined/);
    if (match) return { table: "Users", field: match[1] };

    match = message.match(/property '([^']+)'/);
    if (match) return { table: "Users", field: match[1] };

    return null;
  } catch (err) {
    safeSpine(err, "PulseBootReflex.parseMissingField");
    return null;
  }
}

// ---------------------------------------------------------------------------
// EXTERNAL RESOURCE CLASSIFIER
// ---------------------------------------------------------------------------

function isExternal(url) {
  try {
    const u = new URL(url, window.location.href);

    const localOrigins = new Set([
      window.location.origin,
      "pulseworld.net",
      "impulse://",
      "null",
      "file://",
      "data:",
      "blob:",
      "pulse://",
      "chrome://",
      "about:",
      "http://localhost",
      "http://127.0.0.1",
      "https://localhost",
      "https://127.0.0.1"
    ]);

    return !localOrigins.has(u.origin);
  } catch {
    return true;
  }
}


async function detectCallerFile() {
  try {

    let path = `/?Impulse=${PulseRealm.__PULSE_CURRENT_PAGE__}` || "/";


    // Normalize: remove trailing slash except root
    if (path.length > 1 && path.endsWith("/")) {
      path = path.slice(0, -1);
    }

    if (path === "/") {
      return "PulseWorldReality.txt";
    }

    // Extract last segment
    const last = path.split("/").pop();

    // If last segment has no extension → treat as page name
    if (!last.includes(".")) {
      return `${last}.txt`;
    }

    // If it already has an extension, return as-is
    return last;
  } catch {
    return "unknown-file";
  }
}

const SKINREFLEX_DB_NAME = "PulseSkinReflexDB";
const SKINREFLEX_STORE = "events";
const SKINREFLEX_DB_VERSION = 1;
const SKINREFLEX_MAX_ENTRIES = 4000;

function openSkinReflexDB() {
  return new Promise((resolve, reject) => {
      const req = PulseRealm.indexedDB.open(SKINREFLEX_DB_NAME, SKINREFLEX_DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(SKINREFLEX_STORE)) {
        db.createObjectStore(SKINREFLEX_STORE, { keyPath: "id", autoIncrement: true });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function loadSkinReflexStore() {
  try {
    const db = await openSkinReflexDB();
    if (!db) return [];

    return await new Promise((resolve) => {
      const tx = db.transaction(SKINREFLEX_STORE, "readonly");
      const store = tx.objectStore(SKINREFLEX_STORE);
      const req = store.getAll();
      req.onsuccess = () => {
        const rows = req.result || [];
        resolve(rows);
      };
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

async function saveSkinReflexEntry(entry) {
  try {
    const db = await openSkinReflexDB();
    if (!db) return;

    const existing = await loadSkinReflexStore();
    const trimmed =
      existing.length >= SKINREFLEX_MAX_ENTRIES
        ? existing.slice(existing.length - SKINREFLEX_MAX_ENTRIES + 1)
        : existing;

    trimmed.push(entry);

    await new Promise((resolve) => {
      const tx = db.transaction(SKINREFLEX_STORE, "readwrite");
      const store = tx.objectStore(SKINREFLEX_STORE);

      // Clear + reinsert trimmed
      const clearReq = store.clear();
      clearReq.onsuccess = () => {
        trimmed.forEach((row) => {
          store.put(row);
        });
        tx.oncomplete = () => resolve();
      };
      clearReq.onerror = () => resolve();
    });

    // Mirror to coreMemory (low-entropy envelope)
    try {
      const Core = getCoreMemory();
      Core.setRouteSnapshot("skinReflexEvents.v30", {
        schemaVersion: "30.0",
        version: LAYER_VER,
        layer: "A1/A3",
        eventsCount: trimmed.length,
        lastEventTs: entry.timestamp,
        timestamp: PulseRealm.PulseNOW
      });
    } catch {}
  } catch (err) {
    safeSpine(err, "PulseBootReflex.store.save");
  }
}

async function appendSkinReflexEntry(eventType, payload = {}) {
  try {
    const entry = {
      eventType,
      timestamp: PulseRealm.PulseNOW,
      layer: "A1/A2/A3",
      version: LAYER_VER,
      ...payload
    };
    await saveSkinReflexEntry(entry);

    const diag = getDiagnosticsBus();
    try {
      diag.emit("PulseBootReflex.store.append", {
        eventType,
        ts: entry.timestamp
      });
    } catch {}
  } catch (err) {
    safeSpine(err, "PulseBootReflex.store.append");
  }
}

// ---------------------------------------------------------------------------
// FACTORY — v30 IMMORTAL+++
// ---------------------------------------------------------------------------

export function createPulseSkinReflex({
  routeMemoryBucketId = "PulseBootReflex-Route-Memory-v30",
  log: injectedLog = console.log,
  warn: injectedWarn = console.warn
} = {}) {
  const RouteMemoryFactory = getRouteMemoryFactory();
  const RouteMemory = RouteMemoryFactory
    ? RouteMemoryFactory({ bucketId: routeMemoryBucketId, log: injectedLog, warn: injectedWarn })
    : null;

  const routeFn = getSafeRoute();

  let healingInProgress = false;

    PulseRealm.PulseLog(
  "boot",
      "%c📜 PULSE PROOF MONITOR v30.0 — [PulseBootReflex v30] Loaded — A1/A2/A3 Binary One-Band Membrane Active",
      "color:#FF9800; font-weight:bold;"
    );
  

  // -------------------------------------------------------------------------
  // PUBLIC: membraneAlive
  // -------------------------------------------------------------------------
  function membraneAlive(origin = "unknown") {
    try {
        console.debug(`[SkinReflex v30] membraneAlive from ${origin}`);
      
    } catch (err) {
      safeSpine(err, "PulseBootReflex.membraneAlive");
    }
  }

  // -------------------------------------------------------------------------
  // PUBLIC: attach
  // -------------------------------------------------------------------------
  async function attach() {
    try {
      logProtector("SCANNER_ATTACH_START", { online: isOnline() });

      const identity = await sessionCheck();
      if (!identity) {
        logProtector("SCANNER_ABORTED_UNTRUSTED", {});
        await appendSkinReflexEntry("A1_ATTACH_UNTRUSTED", {});
        return null;
      }

      if (!hasBootedOnce) {
        hasBootedOnce = true;

        logProtector("SCANNER_FIRST_BOOT_ATTACH_ONLY", {
          pageName: PulseRealm.PulseWorld.pageName || null
        });

        await appendSkinReflexEntry("A1_ATTACH_FIRST_BOOT", {
          identity,
          pageName: PulseRealm.PulseWorld.pageName || null
        });

        return {
          identity,
          route: null,
          needsHealing: false,
          healingTier: "none",
          healingVector: null
        };
      }

      const routeInfo = routeCheck();
      const needsHealing = routeInfo.needsHealing === true;

      logProtector(
        needsHealing ? "SCANNER_CONTINUITY_BROKEN" : "SCANNER_CONTINUITY_OK",
        routeInfo
      );

      await appendSkinReflexEntry("A1_ATTACH_CONTINUITY", {
        identity,
        routeInfo,
        needsHealing
      });

      return {
        identity,
        route: routeInfo,
        needsHealing,
        healingTier: needsHealing ? "micro" : "none",
        healingVector: needsHealing ? "routeContinuity" : null
      };
    } catch (err) {
      safeSpine(err, "PulseBootReflex.attachScanner");
      return null;
    }
  }

  // -------------------------------------------------------------------------
  // PUBLIC: identity + continuity
  // -------------------------------------------------------------------------
  async function identity() {
    return sessionCheck();
  }

  function continuity() {
    return routeCheck();
  }

  // -------------------------------------------------------------------------
  // PUBLIC: dualband nervous entry helpers (v30: binary band only, but keep flags)
// -------------------------------------------------------------------------
  async function getAuth(jwtToken) {
    try {
      logProtector("GET_AUTH", {});
      if (typeof routeFn !== "function") return null;

      const result = await routeFn("auth", {
        jwtToken,
        reflexOrigin: "SkinReflex",
        layer: "A1",
        binaryAware: true,
        dualBand: false,
        bandKind: "binary",
        presenceAware: true,
        sendContract: "PulseSend-v30"
      });

      await appendSkinReflexEntry("A1_GET_AUTH", {
        jwtTokenPresent: !!jwtToken,
        result
      });

      return result;
    } catch (err) {
      safeSpine(err, "PulseBootReflex.getAuth");
      return null;
    }
  }

  async function getHook(name, payload = {}) {
    try {
      logProtector("GET_HOOK", { name });
      if (typeof routeFn !== "function") return null;

      const result = await routeFn("hook", {
        name,
        payload,
        reflexOrigin: "SkinReflex",
        layer: "A1",
        binaryAware: true,
        dualBand: false,
        bandKind: "binary",
        presenceAware: true,
        sendContract: "PulseSend-v30"
      });

      await appendSkinReflexEntry("A1_GET_HOOK", {
        name,
        payload,
        result
      });

      return result;
    } catch (err) {
      safeSpine(err, "PulseBootReflex.getHook");
      return null;
    }
  }

  async function getMap(mapName) {
    try {
      logProtector("GET_MAP", { mapName });
      if (typeof routeFn !== "function") return null;

      const result = await routeFn("map", {
        mapName,
        reflexOrigin: "SkinReflex",
        layer: "A1",
        binaryAware: true,
        dualBand: false,
        bandKind: "binary",
        presenceAware: true,
        sendContract: "PulseSend-v30"
      });

      await appendSkinReflexEntry("A1_GET_MAP", {
        mapName,
        result
      });

      return result;
    } catch (err) {
      safeSpine(err, "PulseBootReflex.getMap");
      return null;
    }
  }

  async function callHelper(helperName, payload = {}) {
    try {
      logProtector("CALL_HELPER", { helperName });
      if (typeof routeFn !== "function") return null;

      const result = await routeFn("helper", {
        helperName,
        payload,
        reflexOrigin: "SkinReflex",
        layer: "A1",
        binaryAware: true,
        dualBand: false,
        bandKind: "binary",
        presenceAware: true,
        sendContract: "PulseSend-v30"
      });

      await appendSkinReflexEntry("A1_CALL_HELPER", {
        helperName,
        payload,
        result
      });

      return result;
    } catch (err) {
      safeSpine(err, "PulseBootReflex.callHelper");
      return null;
    }
  }

  // -------------------------------------------------------------------------
  // INTERNAL: A1 ERROR INTERCEPTOR (v30)
// -------------------------------------------------------------------------
  function installErrorInterceptor() {
    if (typeof window === "undefined") return;
        window.addEventListener(
        "error",
        async (event) => {
           if (healingInProgress) return;
        
            const msg = event.message || "";
      
            const stack = event.error?.stack || "";
            const frames = stack.split("\n").map((s) => s.trim());

            const rawFrames = frames
            .filter((f) => f.includes(".js"))
            .map((f) => f.replace(/^at\s+/, ""));
            
          logProtector("ERROR_INTERCEPTED", { message: msg });

          // A3 Error Spine integration
          let errorPacket = null;
          try {
            const spine = getPulseUIErrors();
            if (spine) {
              errorPacket = spine.normalizeError(
                event.error || msg,
                "PulseBootReflex.PulseRealm.error.v30"
              );
              spine.broadcast(errorPacket);
            }
          } catch (spineErr) {
            _REFLEX_CONSOLE.warn("[PulseUIErrors] Failed to Broadcast A1 Error:", spineErr);
          }

          const top = rawFrames[0] || "unknown";
          const file = top.split("/").pop().split(":")[0] || "unknown";
          const line = top.split(":")[1] || "unknown";

          const pagePath = `/${PulseRealm.__PULSE_CURRENT_PAGE__}` || null;


          const uiFlowSnapshot = getUIFlowSnapshotSafe();

            // Local A1 diagnostics
            (function emitA1LocalDiagnostics() {
              try {
                if (console.groupCollapsed) {
                  console.groupCollapsed(
                    `%cPULSE REFLEX A1 DIAGNOSTIC v30 — ${msg}`,
                    "color:#FF7043; font-weight:bold;"
                  );

                  _REFLEX_CONSOLE.log(" • message:", msg);
                  _REFLEX_CONSOLE.log(" • file:", file);
                  _REFLEX_CONSOLE.log(" • line:", line);
                  _REFLEX_CONSOLE.log(" • top frame:", top);
                  _REFLEX_CONSOLE.log(" • raw frames:", rawFrames);
                  _REFLEX_CONSOLE.log(" • page:", pagePath);
                  _REFLEX_CONSOLE.log(" • layer:", "A1 (SkinReflex v30)");
                  _REFLEX_CONSOLE.log(
                    " • note:",
                    "LOCAL ONLY — does NOT depend on routing or backend."
                  );

                  console.groupEnd();
                }
              } catch (err) {
                safeSpine(err, "PulseBootReflex.localDiagnostics.v30");
              }
            })();
     

            // Route trace via RouteMemory
            let routeTrace = null;
            if (RouteMemory && typeof RouteMemory.recall === "function") {
              routeTrace = RouteMemory.recall(msg, rawFrames);
            }

            if (!routeTrace) {
              routeTrace = rawFrames.map((frame, index) => {
                const fFile = frame.split("/").pop().split(":")[0];

                return {
                  frame,
                  file: fFile,
                  index,
                  label: "A1_FRAME",
                  layer: "A1",
                  purpose: "Surface observed frame",
                  context: "SkinReflex dynamic trace v30",
                  binaryAware: true,
                  bandKind: "binary"
                };
              });

              logProtector("ROUTE_TRACE_BUILT_DYNAMIC", {
                frames: routeTrace.length
              });

              if (RouteMemory && typeof RouteMemory.remember === "function") {
                RouteMemory.remember(msg, rawFrames, routeTrace, {
                  binaryAware: true
                });
              }
            }

            // External resource classifier
            if (isExternal(msg)) {
              logProtector("EXTERNAL_RESOURCE_REQUEST", {
                note: "External resource detected — routing through CNS (v30-Immortal+++)",
                url: msg
              });

              const memoryEntry =
                (RouteMemory &&
                  typeof RouteMemory.getEntry === "function" &&
                  RouteMemory.getEntry(msg, rawFrames)) ||
                {};
              const driftSignature =
                memoryEntry.driftSignature || `A1_EXT_V30_${PulseRealm.PulseNOW}`;

              emitReflexSenseReport({
                message: msg,
                file,
                line,
                frames: rawFrames.length,
                degraded: false,
                healthScore: 1.0,
                tier: "externalResource",
                dnaTag: "A1_SURFACE_V30",
                page: pagePath,
                seq: memoryEntry.seq || 0,
                binaryAware: true,
                driftSignature
              });

              await appendSkinReflexEntry("A1_EXTERNAL_RESOURCE", {
                message: msg,
                file,
                line,
                frames,
                rawFrames,
                routeTrace,
                page: pagePath,
                uiFlowSnapshot,
                errorPacket,
                driftSignature
              });

              if (typeof routeFn === "function") {
                await routeFn("fetchExternalResource", {
                  url: msg,
                  page: pagePath,
                  routeTrace,
                  reflexOrigin: "SkinReflex",
                  layer: "A1",
                  binaryAware: true,
                  dualBand: false,
                  bandKind: "binary",
                  presenceAware: true,
                  external: true,
                  driftSignature
                });
              }

              event.preventDefault();
              return;
            }

            // Classification
            let classified = false;

            if (msg.includes("Cannot find module")) {
              logProtector("IMPORT_DEGRADED", {
                note: "Import errors are degradation signals in v30-Immortal+++",
                details: msg
              });

              RouteMemory.markDegraded(msg, rawFrames, 0.8, true);
              classified = true;
            }

            if (msg.includes("process is not defined")) {
              logProtector("PAGE_ENV_MISMATCH", {
                error: "frontendEnvMismatch",
                hint: "Replace process.env.* with PulseRealm.PULSE_* or PulseConfig."
              });

              RouteMemory.markDegraded(msg, rawFrames, 0.7, false);
              classified = true;
            }

            // PulseCORS classifier
            if (
              msg.includes("CORS") ||
              msg.includes("cors") ||
              msg.includes("Access-Control-Allow") ||
              msg.includes("blocked by CORS") ||
              msg.includes("No 'Access-Control-Allow-Origin'")
            ) {
              logProtector("PULSECORS_REQUIRED", {
                error: "corsMismatch",
                hint: "Use PulseCORS instead of default browser CORS.",
                note: "PulseCORS is the unified v30 IMMORTAL+++ CORS layer."
              });

              RouteMemory.markDegraded(msg, rawFrames, 0.72, false);
              classified = true;

              if (typeof routeFn === "function") {
                await routeFn("PulseCORS", {
                  message: msg,
                  frames: rawFrames,
                  page: pagePath,
                  reflexOrigin: "SkinReflex",
                  layer: "A1",
                  binaryAware: true,
                  dualBand: false,
                  bandKind: "binary",
                  presenceAware: true
                });
              }
            }

            if (msg.includes("Maximum call stack size exceeded")) {
              logProtector("PAGE_RECURSION_LOOP", {
                error: "pageRecursionLoop",
                details: msg
              });

              RouteMemory.markDegraded(msg, rawFrames, 0.5, false);
              classified = true;
            }

            const memoryEntry =
              (RouteMemory &&
                typeof RouteMemory.getEntry === "function" &&
                RouteMemory.getEntry(msg, rawFrames)) ||
              {};
            const degraded = memoryEntry.entry?.degraded ?? false;
            const healthScore = memoryEntry.entry?.healthScore ?? 1.0;
            const tier = memoryEntry.entry?.tier || "microDegrade";
            const dnaTag = memoryEntry.entry?.dnaTag || "A1_SURFACE_V30";
            const seq = memoryEntry.entry?.seq || 0;
            const driftSignature =
              memoryEntry.entry?.driftSignature || `A1_ERR_V30_${PulseRealm.PulseNOW}`;

            emitReflexSenseReport({
              message: msg,
              file,
              line,
              frames: rawFrames.length,
              degraded,
              healthScore,
              tier,
              dnaTag,
              page: pagePath,
              seq,
              binaryAware: true,
              driftSignature
            });

            // Drift intelligence via PulsePageScanner v30
            let structural = null;
            let severity = 0;
            let tooFar = false;
            let lineage = [];
            let moduleModeA = null;
            let moduleModeB = null;
            let exportDrift = null;
            let contract = null;

            try {
              const PageScanner = getPageScanner();
              if (PageScanner) {
                const sourceA = event.error?.sourceA || "";
                const sourceB = event.error?.sourceB || "";

                const varsA = PageScanner.extractVars(sourceA);
                const varsB = PageScanner.extractVars(sourceB);

                lineage = PageScanner.detectLineage(varsA, varsB);
                moduleModeA = PageScanner.detectModuleMode(sourceA);
                moduleModeB = PageScanner.detectModuleMode(sourceB);
                exportDrift = PageScanner.detectExportDrift(sourceB, varsB);

                structural = PageScanner.detectStructural(sourceA, sourceB);
                contract = PageScanner.detectContract(sourceA, sourceB);

                severity =
                  typeof structural.severity === "number"
                    ? structural.severity
                    : 0;
                tooFar = severity >= 3;

                const driftPacketContext = {
                  event: "page-error-drift-detected",
                  message: msg,
                  file,
                  line,
                  frames: rawFrames,
                  degraded,
                  healthScore,
                  tier,
                  dnaTag,
                  lineage,
                  moduleMode: {
                    pageA: moduleModeA,
                    pageB: moduleModeB
                  },
                  exportDrift,
                  structural,
                  contract,
                  severity,
                  tooFar,
                  channel: "ui",
                  binarySource: true,
                  sourceMeta: {
                    pagePath,
                    ownerModule: resolveOwnerModule(file)
                  }
                };

                if (typeof sourceA === "string" && sourceA.trim().length > 0) {
                  emitPageScannerIntel(driftPacketContext);
                }

              }
              
            } catch (err) {
              safeSpine(err, "PulseBootReflex.driftIntel.v30");
            }

            await appendSkinReflexEntry("A1_ERROR_CAPTURED", {
              message: msg,
              file,
              line,
              frames,
              rawFrames,
              routeTrace,
              page: pagePath,
              uiFlowSnapshot,
              errorPacket,
              degraded,
              healthScore,
              tier,
              dnaTag,
              classified,
              driftSignature,
              structuralSeverity: severity
            });
          
          event.preventDefault();
        },
        true
        
      );
   
  }

  async function checkTrust(origin = "checkTrust") {
    try {
      logProtector("CHECK_TRUST_START", { origin });

      // Identity check (A1)
      const identity = await sessionCheck();
      const identityTrusted = !!identity;

      // Continuity check (A1 route)
      const routeInfo = routeCheck();
      const continuityTrusted = routeInfo && routeInfo.needsHealing === false;

      // Combined trust
      const trust = identityTrusted && continuityTrusted;

      await appendSkinReflexEntry("A1_CHECK_TRUST", {
        origin,
        identityTrusted,
        continuityTrusted,
        trust
      });

      logProtector("CHECK_TRUST_RESULT", {
        trust,
        identityTrusted,
        continuityTrusted
      });

      return trust;
    } catch (err) {
      safeSpine(err, "PulseSkinReflex.checkTrust");
      return false;
    }
  }


  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------

  const PulseSkinReflex = {
    SkinReflexRole,
    attach,
    checkTrust,
    identity,
    continuity,
    membraneAlive,
    getAuth,
    getHook,
    getMap,
    callHelper,
    installErrorInterceptor
  };

  // Auto-install interceptor on creation
  installErrorInterceptor();

  return PulseSkinReflex;
}

export function registerErrorHandler(callback) {
  if (typeof callback !== "function") return;

  // We wrap the callback in a safe, non‑throwing shell
  const handler = (event) => {
    try {
      callback({
        message: event.message || "",
        error: event.error || null,
        filename: event.filename || null,
        lineno: event.lineno || null,
        colno: event.colno || null,
        stack: event.error?.stack || null,
        rawEvent: event
      });
    } catch (err) {
      // NEVER throw, NEVER broadcast, NEVER recurse
      _REFLEX_CONSOLE.warn("[RegisterErrorHandler] Callback Failed:", err);
    }
  };

  // Attach without capturing, without recursion, without interference
  window.addEventListener("error", handler, { capture: false });

  return () => {
    window.removeEventListener("error", handler, { capture: false });
  };
}

// ---------------------------------------------------------------------------
// GLOBAL EXPOSURE
// ---------------------------------------------------------------------------

try {
    PulseRealm.PulseSkinReflex = createPulseSkinReflex;
    PulseRealm.PulseSkinReflexErrorHandler = registerErrorHandler;
} catch {}
