// ============================================================================
// PULSE=TOUCH-RELAY-v32-IMMORTAL++-Core3D
//  • v32 upgrade of the classic Touch Relay organ
//  • Fully aligned with Relay3D v32, Continuance v32, OneBand v32
//  • Same API, same behavior, deterministic except async I/O
// ============================================================================

import { DeltaMemoryResolver_v62 } from "./PULSE-UNIVERSAL-TOUCH-DELTAMEMORY.js";
import { createPulseWorldTouchRelay3D_v32 } from "./PULSE-UNIVERSAL-TOUCH-RELAY-3D.js";
import { PulseCoreGMemory } from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";
import { PulseGPUProcessWorker } from "../PULSE-ENGINE/PulseEngineGPUProcessWorker-v31.js";
import { PulseOSBrain } from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-OS/PulseOSBrain-v30.js";
import { PulseChunksCache } from "./PULSE-UNIVERSAL-TOUCH-CHUNKS.js";
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


export function createPulseTouchRelay_v32({
  MotionModule,
  MotionExportTester = null,
  MemoryOrgan,
  BrainOrgan,
  PulseDB,
  Reporter,

  CoreMemory = null,
  CacheChunk = PulseChunksCache,
  ProcessWorker = PulseGPUProcessWorker,

  sessionId = null,
  trace = false,
  cosmosContext = {
    universeId: "u:default",
    timelineId: "t:main",
    branchId: "b:root",
    shardId: "s:primary"
  },
  presenceContext = {},
  advantageContext = {}
} = {}) {
  if (!MemoryOrgan) throw new Error("[TouchRelay-v32] MemoryOrgan is required.");
  if (!MotionModule) throw new Error("[TouchRelay-v32] MotionModule is required.");

  if (!CoreMemory) {
    try { CoreMemory = PulseCoreGMemory; } catch(e) { CoreMemory = PulseRealm?.PulseCoreMemory; }
  }

  // ============================================================================
  // ROLE + CONSTANTS
  // ============================================================================
  const ROLE = Object.freeze({
    identity: "PULSE=TOUCH-RELAY-v32-IMMORTAL++-Core3D",
    layer: "organ",
    type: "relay_sensing",
    schemaVersion: "v32",
    version: "32.3-IMMORTAL++-Core3D"
  });

  const RELAY_HISTORY_KEY = "pulse:v32:touchRelay:history";
  const RELAY_METRICS_KEY = "pulse:v32:touchRelay:metrics";

  // ============================================================================
  // METRICS + STATE
  // ============================================================================
  const metrics = {
    relayEvents: 0,
    dnsPrefetch: 0,
    preconnect: 0,
    prefetch: 0,
    speculativeNav: 0,
    edgeProbe: 0,
    prewarmsTriggered: 0,
    motionTicksTriggered: 0,
    brainHintsEmitted: 0,
    threeDTouchesForwarded: 0
  };

  let lastPrewarmAt = null;
  let lastRelayAt = null;
  let prewarmDebounceTimer = null;

  if (MemoryOrgan.read(RELAY_HISTORY_KEY) == null) {
    MemoryOrgan.write(RELAY_HISTORY_KEY, []);
  }

  const now = () => PulseRealm.PulseNOW;

  function log(...args) {
    if (!trace || typeof console === "undefined") return;
    console.log("[TouchRelay-v32]", ...args);
  }

  function readHistory() {
    const h = MemoryOrgan.read(RELAY_HISTORY_KEY);
    return Array.isArray(h) ? h : [];
  }

  function writeHistory(next) {
    MemoryOrgan.write(RELAY_HISTORY_KEY, Array.isArray(next) ? next : []);
  }

  function persistMetrics() {
    MemoryOrgan.write(RELAY_METRICS_KEY, {
      ...metrics,
      lastRelayAt,
      lastPrewarmAt,
      role: ROLE,
      timestamp: now()
    });
  }

  function buildEnvelope(entry) {
    return {
      ...entry,
      sessionId: sessionId || null,
      cosmos: cosmosContext,
      presence: presenceContext,
      advantage: advantageContext,
      schemaVersion: ROLE.schemaVersion,
      version: ROLE.version,
      role: ROLE.identity,
      timestamp: now()
    };
  }

  async function appendToDB(entry) {
    if (!PulseDB.append) return;
    try {
      await PulseDB.append("pulse:v32:Touch_Relay_Events", buildEnvelope(entry));
    } catch (err) {
      if (trace) console.warn("[TouchRelay-v32] DB append failed:", err);
    }
  }

  // ============================================================================
  // MOTION RESOLUTION (DeltaMemoryResolver v62)
  // ============================================================================
  let Motion = null;
  let motionExportName = null;

  async function resolveMotion() {
    if (Motion) return Motion;

    const { fn, exportName } = await DeltaMemoryResolver_v62.resolveExport(
      "MotionModule",
      MotionModule,
      MotionExportTester,
      { CoreMemory, CacheChunk, ProcessWorker, trace }
    );

    if (!fn) throw new Error("[TouchRelay-v32] Unable to resolve Motion export.");

    Motion = fn;
    motionExportName = exportName;
    log("Motion resolved via DeltaMemory", { exportName });

    return Motion;
  }

  // ============================================================================
  // PREWARM ENGINE
  // ============================================================================
  async function triggerPrewarm(reason, meta = {}) {
    const MotionImpl = await resolveMotion();

    const ts = now();
    lastPrewarmAt = ts;
    metrics.prewarmsTriggered += 1;

    log("Prewarm triggered:", reason, meta);

    try {
      await MotionImpl.prewarm();
    } catch (err) {
      log("Motion.prewarm failed:", err);
    }

    try {
      const res = await MotionImpl.tick();
      metrics.motionTicksTriggered += 1;
      if (Reporter.recordTick && res.metrics) {
        await Reporter.recordTick(res);
      }
    } catch (err) {
      log("Motion.tick failed:", err);
    }

    if (BrainOrgan.evolve) {
      try {
        await BrainOrgan.evolve({
          type: "relay:prewarm",
          payload: {
            reason,
            meta,
            cosmos: cosmosContext,
            presence: presenceContext,
            advantage: advantageContext,
            timestamp: ts
          }
        });
        metrics.brainHintsEmitted += 1;
      } catch (err) {
        log("BrainOrgan.evolve relay:prewarm failed:", err);
      }
    }

    await appendToDB({ type: "prewarm", reason, meta });
    persistMetrics();
  }

  function schedulePrewarm(reason, meta = {}) {
    if (prewarmDebounceTimer) return;
    prewarmDebounceTimer = setTimeout(() => {
      prewarmDebounceTimer = null;
      triggerPrewarm(reason, meta);
    }, 50);
  }

  // ---------------------------------------------------------------------------
  // RELAY SENSING
  // ---------------------------------------------------------------------------

  function recordRelayEvent(kind, meta = {}) {
    const ts = now();
    lastRelayAt = ts;
    metrics.relayEvents += 1;

    switch (kind) {
      case "dns_prefetch": metrics.dnsPrefetch += 1; break;
      case "preconnect": metrics.preconnect += 1; break;
      case "prefetch": metrics.prefetch += 1; break;
      case "speculative_nav": metrics.speculativeNav += 1; break;
      case "edge_probe": metrics.edgeProbe += 1; break;
    }

    const history = readHistory();
    history.push(buildEnvelope({ kind, meta, event: "relay_sensed" }));
    if (history.length > 256) history.splice(0, history.length - 256);
    writeHistory(history);

    persistMetrics();
    appendToDB({ type: "relay_sensed", kind, meta });

    log("Relay sensed:", kind, meta);
  }

  // ---------------------------------------------------------------------------
  // 3D RELAY ORGAN (v32)
  // ---------------------------------------------------------------------------

  const relaySelf = {};

  const Relay3D = createPulseWorldTouchRelay3D_v32({
    Motion: {
      prewarm: async () => (await resolveMotion()).prewarm(),
      tick: async () => (await resolveMotion()).tick()
    },
    MemoryOrgan,
    BrainOrgan,
    PulseDB,
    Reporter,
    Relay: relaySelf,
    CoreMemory,
    CacheChunk,
    ProcessWorker,
    sessionId,
    trace,
    cosmosContext,
    presenceContext,
    advantageContext
  });

  function senseRelay(kind, meta = {}) {
    recordRelayEvent(kind, meta);
    schedulePrewarm(kind, meta);

    try {
      Relay3D.RelayBridge3D.onRelaySensed(kind, meta);
      metrics.threeDTouchesForwarded += 1;
    } catch (err) {
      log("Relay3D forward failed:", err);
    }
  }

  relaySelf.senseRelay = senseRelay;

  // ---------------------------------------------------------------------------
  // DOM + PERFORMANCE SENSORS
  // ---------------------------------------------------------------------------

  function senseDNSPrefetch(hostname, meta = {}) {
    senseRelay("dns_prefetch", { hostname, ...meta });
  }

  function sensePreconnect(url, meta = {}) {
    senseRelay("preconnect", { url, ...meta });
  }

  function sensePrefetch(url, meta = {}) {
    senseRelay("prefetch", { url, ...meta });
  }

  function senseSpeculativeNavigation(url, meta = {}) {
    senseRelay("speculative_nav", { url, ...meta });
  }

  function senseEdgeProbe(edgeId, meta = {}) {
    senseRelay("edge_probe", { edgeId, ...meta });
  }

  function attachDOMRelaySensors() {
    if (typeof document === "undefined") return;

    try {
      const links = Array.from(document.querySelectorAll("link[rel]")) || [];
      for (const link of links) {
        const rel = (link.getAttribute("rel") || "").toLowerCase();
        const href = link.getAttribute("href") || link.getAttribute("hrefsrc") || null;
        if (!href) continue;

        if (rel === "dns-prefetch") senseDNSPrefetch(href, { source: "dom_link" });
        else if (rel === "preconnect") sensePreconnect(href, { source: "dom_link" });
        else if (rel === "prefetch" || rel === "prerender" || rel === "preload") {
          sensePrefetch(href, { source: "dom_link", as: link.getAttribute("as") || null });
        }
      }
    } catch (err) {
      log("attachDOMRelaySensors failed:", err);
    }
  }

  function attachPerformanceRelaySensors() {
    if (typeof performance === "undefined" || typeof performance.getEntries !== "function") return;

    try {
      const entries = performance.getEntries() || [];
      for (const e of entries) {
        const name = e.name || e.initiatorType || "";
        const type = (e.initiatorType || "").toLowerCase();

        if (type === "preconnect") sensePreconnect(name, { source: "performance" });
        else if (type === "dns") senseDNSPrefetch(name, { source: "performance" });
        else if (type === "prefetch" || type === "prerender") sensePrefetch(name, { source: "performance" });
      }
    } catch (err) {
      log("attachPerformanceRelaySensors failed:", err);
    }
  }

  function autoAttach() {
    attachDOMRelaySensors();
    attachPerformanceRelaySensors();
  }

  // ---------------------------------------------------------------------------
  // FRAME-LEVEL RELAY (for Gate v32)
  // ---------------------------------------------------------------------------

  function relayFrame(frame) {
    const ts = now();
    lastRelayAt = ts;
    metrics.relayEvents += 1;

    // Forward as a synthetic relay event into 3D + history
    try {
      Relay3D.RelayBridge3D.onRelaySensed("frame", frame);
      metrics.threeDTouchesForwarded += 1;
    } catch (err) {
      log("Relay3D frame forward failed:", err);
    }

    try {
      if (BrainOrgan.evolve) {
        BrainOrgan.evolve({
          type: "relay:frame",
          payload: {
            frame,
            cosmos: cosmosContext,
            presence: presenceContext,
            advantage: advantageContext,
            timestamp: ts
          }
        });
        metrics.brainHintsEmitted += 1;
      }
    } catch (err) {
      log("BrainOrgan.evolve relay:frame failed:", err);
    }

    const history = readHistory();
    history.push(buildEnvelope({ kind: "frame", meta: frame, event: "relay_frame" }));
    if (history.length > 256) history.splice(0, history.length - 256);
    writeHistory(history);

    persistMetrics();

    return {
      ok: true,
      ts,
      metrics: { ...metrics },
      lastRelayAt,
      lastPrewarmAt,
      threeD: Relay3D.snapshot() || null,
      world: {
        cosmos: cosmosContext,
        presence: presenceContext,
        advantage: advantageContext
      }
    };
  }

  function snapshot() {
    return {
      metrics: { ...metrics },
      lastRelayAt,
      lastPrewarmAt,
      threeD: Relay3D.snapshot() || null
    };
  }

  // ---------------------------------------------------------------------------
  // PUBLIC API
  // ---------------------------------------------------------------------------

  function getMetrics() {
    const stored = MemoryOrgan.read(RELAY_METRICS_KEY) || {};
    return {
      ...metrics,
      lastRelayAt,
      lastPrewarmAt,
      stored
    };
  }

  function getHistory() {
    return readHistory();
  }

  autoAttach();
  log("TouchRelay-v32 ready.", ROLE);

  return Object.freeze({
    role: ROLE,
    sessionId,
    cosmosContext,
    presenceContext,
    advantageContext,

    senseRelay,
    senseDNSPrefetch,
    sensePreconnect,
    sensePrefetch,
    senseSpeculativeNavigation,
    senseEdgeProbe,

    triggerPrewarm,
    getMetrics,
    getHistory,
    autoAttach,

    relayFrame,
    snapshot,

    relay3D: Relay3D
  });
}

PulseRealm.PulseTouchRelay = createPulseTouchRelay_v32;