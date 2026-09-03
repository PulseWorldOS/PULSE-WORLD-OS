// ============================================================================
//  aiPageScannerAdapter-v30-IMMORTAL-CORE++.js — Pulse OS v30-IMMORTAL-CORE++
//  Binary PageScanner Membrane • Drift Intel v2 • Artery v5 • Beacon Mesh
//  PURE MEMBRANE. ZERO MUTATION. ZERO RANDOMNESS. ZERO DIRECT INTERNET.
//  v30+: Self-contained meta, dualband-aware, mesh-aware, exponential-ready.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
//  META — v30 IMMORTAL-CORE++ (no external remnants)
// ============================================================================

export const PageScannerAdapterMeta = Object.freeze({
  type: "Organ",
  subsystem: "binary-page-scanner-membrane",
  layer: "B3-Membrane",
  version: "30-IMMORTAL-CORE++",
  identity: "aiPageScannerAdapter-v30-IMMORTAL-CORE++",
  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    egoFree: true,
    adaptive: true,
    harmonic: true,

    dualband: true,
    dualbandSafe: true,
    meshAware: true,
    nodeAdminAware: true,
    trustMeshAware: true,

    arteryV5: true,
    driftIntelV2: true,
    windowAware: true,
    packetAware: true,
    beaconMeshAware: true,

    multiInstanceReady: true,
    readOnly: true,
    zeroMutation: true,
    zeroRandomness: true,

    epoch: "30-IMMORTAL-CORE++"
  }),
  contract: Object.freeze({
    purpose:
      "Observe PageScanner events, compute drift + artery metrics, and emit binary packets + beacons without mutation.",
    never: Object.freeze([
      "mutate source code",
      "interpret business logic",
      "call external internet",
      "introduce randomness",
      "block organism pipelines",
      "leak raw source in artery snapshots"
    ]),
    always: Object.freeze([
      "stay deterministic",
      "stay membrane-only",
      "stay binary-only",
      "stay drift-aware",
      "stay artery-aware",
      "stay mesh-safe",
      "emit window-safe snapshots",
      "emit beacon events without recursion"
    ])
  }),
  boundaryReflex() {
    return "PageScanner membrane must remain read-only, deterministic, and drift-aware — never mutate, never reach out.";
  }
});

// ============================================================================
//  GLOBAL ARTERY REGISTRY (READ-ONLY, METRICS-ONLY) — v30
// ============================================================================
//
//  Registry key: `${id}#${instanceIndex}`
//  Value: latest scanner artery snapshot for that instance.
//
const _globalPageScannerArteryRegistry = new Map();

function _registryKey(id, instanceIndex) {
  return `${id || PageScannerAdapterMeta.identity}#${instanceIndex}`;
}

export function getGlobalPageScannerArteries() {
  const out = {};
  for (const [k, v] of _globalPageScannerArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ============================================================================
//  PACKET EMITTER — deterministic, membrane-scoped
// ============================================================================
function emitPageScannerAdapterPacket(type, payload) {
  const now = PulseRealm.PulseNOW;
  return Object.freeze({
    meta: PageScannerAdapterMeta,
    packetType: `pagescanner-adapter-${type}`,
    packetId: `pagescanner-adapter-${type}-${now}`,
    timestamp: now,
    epoch: PageScannerAdapterMeta.evo.epoch,
    ...payload
  });
}

// ============================================================================
//  PREWARM — v30 IMMORTAL-CORE++ membrane warmup (dualband + mesh aware)
// ============================================================================
export function prewarmPageScannerAdapter(
  dualBand = null,
  {
    trace = false,
    computeSurface = null,
    computeDeltaPacket = null,
    meshId = null,
    regionId = null
  } = {}
) {
  try {
    const binaryPressure =
      dualBand.binary.metabolic.pressure ??
      dualBand.binary.routing.pressure ??
      0;

    const evolutionMode =
      dualBand.symbolic.evolution.mode ??
      dualBand.symbolic.persona.evolutionMode ??
      "passive";

    const packet = emitPageScannerAdapterPacket("prewarm", {
      message: "PageScanner adapter prewarmed and membrane artery v5 aligned.",
      binaryPressure,
      evolutionMode,
      meshId: meshId || dualBand.mesh.id || null,
      regionId: regionId || dualBand.mesh.region || null,
      computeSurface: computeSurface || null,
      computeDeltaPacket: computeDeltaPacket || null
    });

    if (trace) {
      console.log("[aiPageScannerAdapter-v30] prewarm", packet);
    }
    return packet;
  } catch (err) {
    return emitPageScannerAdapterPacket("prewarm-error", {
      error: String(err),
      message: "PageScanner adapter prewarm failed."
    });
  }
}

// ============================================================================
//  ARTERY HELPERS — v5 (windowed, drift-aware, mesh-aware)
// ============================================================================
function _bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function _bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function _bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

function _bucketDrift(v) {
  if (v >= 0.9) return "catastrophic";
  if (v >= 0.7) return "severe";
  if (v >= 0.4) return "moderate";
  if (v > 0) return "mild";
  return "none";
}
// ============================================================================
//  AIBinaryPageScannerAdapter — IMMORTAL ORGAN (v31 IMMORTAL+++ Membrane)
// ============================================================================

export const AIBinaryPageScannerAdapter = (() => {

  // ---------------------------------------------------------------------------
  // INTERNAL LANE
  // ---------------------------------------------------------------------------
  const lane = {
    id: PageScannerAdapterMeta.identity,
    encoder: null,
    logger: null,
    shadowLogger: null,
    pipeline: null,
    reflex: null,

    beacon: null,
    trace: false,

    computeSurfaceProvider: null,
    computeDeltaProvider: null,
    triHeartId: "pagescanner",

    nodeAdminReporter: null,

    meshId: null,
    regionId: null,

    instanceIndex: 0,
    instanceCount: 0,

    windowMs: 60000,
    _windowStart: PulseRealm.PulseNOW,
    _windowEvents: 0,
    _windowBits: 0,
    _windowHighDrift: 0,

    _totalEvents: 0,
    _totalBits: 0,
    _totalHighDrift: 0,

    scannerArtery: {
      lastEventType: null,
      lastFile: null,
      lastRoute: null,
      lastBits: 0,
      lastDriftScore: 0,
      lastDriftBucket: "none",
      eventsPerSec: 0,
      harmonicLoad: 0,
      snapshot: () => Object.freeze({})
    }
  };

  // ---------------------------------------------------------------------------
  // INSTANCE REGISTRY (IMMORTAL COUNTER)
  // ---------------------------------------------------------------------------
  const registerInstance = () => {
    const idx = lane.instanceCount;
    lane.instanceCount += 1;
    return idx;
  };

  const getInstanceCount = () => lane.instanceCount;

  // ---------------------------------------------------------------------------
  // TRACE
  // ---------------------------------------------------------------------------
  const trace = (event, payload) => {
    if (!lane.trace) return;
    try {
      if (lane.logger && typeof lane.logger.log === "function") {
        lane.logger.log("[AIBinaryPageScannerAdapter]", event, payload);
      } else {
        console.log("[AIBinaryPageScannerAdapter]", event, payload);
      }
    } catch {}
  };

  // ---------------------------------------------------------------------------
  // INIT
  // ---------------------------------------------------------------------------
  const init = (config = {}) => {
    lane.id = config.id || PageScannerAdapterMeta.identity;
    lane.encoder = config.encoder;
    lane.logger = config.logger || null;
    lane.shadowLogger = config.shadowLogger || null;
    lane.pipeline = config.pipeline || null;
    lane.reflex = config.reflex || null;

    lane.beacon = config.beacon || null;
    lane.trace = !!config.trace;

    lane.computeSurfaceProvider = config.computeSurfaceProvider || null;
    lane.computeDeltaProvider = config.computeDeltaProvider || null;
    lane.triHeartId = config.triHeartId || "pagescanner";

    lane.nodeAdminReporter =
      typeof config.nodeAdminReporter === "function"
        ? config.nodeAdminReporter
        : null;

    lane.meshId = config.meshId || null;
    lane.regionId = config.regionId || null;

    if (!lane.encoder || typeof lane.encoder.encode !== "function") {
      throw new Error("AIBinaryPageScannerAdapter requires aiBinaryAgent encoder");
    }

    lane.instanceIndex = registerInstance();

    lane.windowMs =
      typeof config.windowMs === "number" && config.windowMs > 0
        ? config.windowMs
        : 60000;

    lane._windowStart = PulseRealm.PulseNOW;
    lane._windowEvents = 0;
    lane._windowBits = 0;
    lane._windowHighDrift = 0;

    lane._totalEvents = 0;
    lane._totalBits = 0;
    lane._totalHighDrift = 0;

    lane.scannerArtery = {
      lastEventType: null,
      lastFile: null,
      lastRoute: null,
      lastBits: 0,
      lastDriftScore: 0,
      lastDriftBucket: "none",
      eventsPerSec: 0,
      harmonicLoad: 0,
      snapshot: () =>
        Object.freeze({
          lastEventType: lane.scannerArtery.lastEventType,
          lastFile: lane.scannerArtery.lastFile,
          lastRoute: lane.scannerArtery.lastRoute,
          lastBits: lane.scannerArtery.lastBits,
          lastDriftScore: lane.scannerArtery.lastDriftScore,
          lastDriftBucket: lane.scannerArtery.lastDriftBucket,
          eventsPerSec: lane.scannerArtery.eventsPerSec,
          harmonicLoad: lane.scannerArtery.harmonicLoad,
          instanceIndex: lane.instanceIndex,
          instanceCount: getInstanceCount(),
          meshId: lane.meshId,
          regionId: lane.regionId
        })
    };
  };

  // ---------------------------------------------------------------------------
  //  WINDOW ROLLING — Artery v5
  // ---------------------------------------------------------------------------
  const rollWindow = (now) => {
    if (now - lane._windowStart >= lane.windowMs) {
      lane._windowStart = now;
      lane._windowEvents = 0;
      lane._windowBits = 0;
      lane._windowHighDrift = 0;
    }
  };

  // IMMORTAL-grade artery snapshot packet (window-safe)
  const snapshotMembrane = () =>
    emitPageScannerAdapterPacket("snapshot", {
      artery: lane.scannerArtery.snapshot()
    });

  const snapshotArteryPacket = () => {
    const artery = computeScannerArtery();
    return emitPageScannerAdapterPacket("artery-snapshot", {
      artery,
      instanceIndex: lane.instanceIndex
    });
  };

  // ---------------------------------------------------------------------------
  //  OPTIONAL CI / DELTA CONTEXT — read-only, non-interpreting
  // ---------------------------------------------------------------------------
  const getComputeContext = () => {
    let computeSurface = null;
    let computeDeltaPacket = null;

    try {
      if (typeof lane.computeSurfaceProvider === "function") {
        computeSurface = lane.computeSurfaceProvider() || null;
      }
    } catch {
      computeSurface = null;
    }

    try {
      if (typeof lane.computeDeltaProvider === "function") {
        computeDeltaPacket = lane.computeDeltaProvider() || null;
      }
    } catch {
      computeDeltaPacket = null;
    }

    return { computeSurface, computeDeltaPacket };
  };

  // ---------------------------------------------------------------------------
  //  ARTERY v5 — windowed drift + load + mesh metrics
  // ---------------------------------------------------------------------------
  const computeScannerArtery = () => {
    const now = PulseRealm.PulseNOW;
    rollWindow(now);

    const elapsedMs = Math.max(1, now - lane._windowStart);
    const eventsPerSec = (lane._windowEvents / elapsedMs) * 1000;

    const instanceCount = getInstanceCount() || 1;
    const harmonicLoad = eventsPerSec / instanceCount;

    const avgBits =
      lane._windowEvents > 0 ? lane._windowBits / lane._windowEvents : 0;

    const highDriftRatio =
      lane._windowEvents > 0
        ? Math.min(1, lane._windowHighDrift / lane._windowEvents)
        : 0;

    const sizeFactor = Math.min(1, avgBits / 50000);
    const loadFactor = Math.min(1, harmonicLoad / 128);
    const driftFactor = highDriftRatio;

    const pressureBase = Math.max(
      0,
      Math.min(1, (sizeFactor + loadFactor + driftFactor) / 3)
    );
    const pressure = pressureBase;

    const throughputBase = Math.max(0, 1 - pressure);
    const throughput = Math.max(0, Math.min(1, throughputBase));

    const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
    const budget = Math.max(0, Math.min(1, throughput - cost));

    const artery = {
      instanceIndex: lane.instanceIndex,
      instanceCount,

      windowMs: lane.windowMs,
      windowEvents: lane._windowEvents,
      windowBits: lane._windowBits,
      windowHighDrift: lane._windowHighDrift,

      totalEvents: lane._totalEvents,
      totalBits: lane._totalBits,
      totalHighDrift: lane._totalHighDrift,

      eventsPerSec,
      harmonicLoad,
      avgBits,
      highDriftRatio,
      highDriftBucket: _bucketDrift(highDriftRatio),

      throughput,
      throughputBucket: _bucketLevel(throughput),

      pressure,
      pressureBucket: _bucketPressure(pressure),

      cost,
      costBucket: _bucketCost(cost),

      budget,
      budgetBucket: _bucketLevel(budget),

      meshId: lane.meshId,
      regionId: lane.regionId,

      id: lane.id,
      timestamp: now
    };

    lane.scannerArtery.eventsPerSec = eventsPerSec;
    lane.scannerArtery.harmonicLoad = harmonicLoad;

    const key = _registryKey(lane.id, lane.instanceIndex);
    _globalPageScannerArteryRegistry.set(key, artery);

    if (lane.nodeAdminReporter) {
      try {
        lane.nodeAdminReporter(artery, PageScannerAdapterMeta);
      } catch (err) {
        trace("nodeAdmin:reporter:error", { error: String(err) });
      }
    }

    return artery;
  };

  // ---------------------------------------------------------------------------
  //  DRIFT ANALYSIS v2 (lineage + module + export drift)
  // ---------------------------------------------------------------------------
  const analyzeDrift = (event) => {
    const srcA = event.pageA || "";
    const srcB = event.pageB || "";

    const extractVars = (src) =>
      [...src.matchAll(/(?:const|let|var)\s+([A-Za-z0-9_]+)/g)].map((m) => m[1]);

    const varsA = extractVars(srcA);
    const varsB = extractVars(srcB);

    const normalize = (name) =>
      name
        .replace(/[\d_]+$/, "")
        .replace(/(Field|State|Mode|Flag|Ref|Node)$/i, "")
        .toLowerCase();

    const lineage = [];
    for (const a of varsA) {
      const normA = normalize(a);
      for (const b of varsB) {
        const normB = normalize(b);
        if (normA === normB && a !== b) {
          lineage.push({ canonical: a, drifted: b });
        }
      }
    }

    const esmA = /import\s+.*from\s+['"]/.test(srcA);
    const cjsA = /require\s*\(/.test(srcA);
    const esmB = /import\s+.*from\s+['"]/.test(srcB);
    const cjsB = /require\s*\(/.test(srcB);

    const moduleMode = {
      pageA: { esm: esmA, cjs: cjsA, mixed: esmA && cjsA },
      pageB: { esm: esmB, cjs: cjsB, mixed: esmB && cjsB }
    };

    const hasESMExportB = /export\s+/.test(srcB);
    const hasCJSExportB = /module\.exports/.test(srcB);

    const exportDrift = {
      missingESM: !hasESMExportB,
      missingCJS: !hasCJSExportB,
      vars: varsB
    };

    const driftScore =
      (lineage.length ? 0.4 : 0) +
      ((moduleMode.pageA.mixed || moduleMode.pageB.mixed) ? 0.3 : 0) +
      ((exportDrift.missingESM || exportDrift.missingCJS) ? 0.3 : 0);

    return Object.freeze({
      lineage,
      moduleMode,
      exportDrift,
      driftScore: Math.min(1, driftScore)
    });
  };

  // ---------------------------------------------------------------------------
  //  LOCAL ARTERY BUILDERS (per-event)
  // ---------------------------------------------------------------------------
  const computeThroughput = (bitLength, driftScore) => {
    const sizeFactor = Math.min(1, bitLength / 50000);
    const raw = 1 - (sizeFactor * 0.5 + driftScore * 0.5);
    return Math.max(0, Math.min(1, raw));
  };

  const computePressure = (bitLength, driftScore) => {
    const raw = Math.min(1, (bitLength / 50000) * (0.5 + driftScore * 0.5));
    return Math.max(0, raw);
  };

  const computeCost = (pressure, throughput) => {
    const raw = pressure * (1 - throughput);
    return Math.max(0, Math.min(1, raw));
  };

  const computeBudget = (throughput, cost) => {
    const raw = throughput - cost;
    return Math.max(0, Math.min(1, raw));
  };

  const buildArtery = (bitLength, driftScore) => {
    const throughput = computeThroughput(bitLength, driftScore);
    const pressure = computePressure(bitLength, driftScore);
    const cost = computeCost(pressure, throughput);
    const budget = computeBudget(throughput, cost);

    return Object.freeze({
      throughput,
      throughputBucket: _bucketLevel(throughput),

      pressure,
      pressureBucket: _bucketPressure(pressure),

      cost,
      costBucket: _bucketCost(cost),

      budget,
      budgetBucket: _bucketLevel(budget),

      driftScore,
      driftBucket: _bucketDrift(driftScore)
    });
  };

  // ---------------------------------------------------------------------------
  //  PACKET BUILDER
  // ---------------------------------------------------------------------------
  const buildPacket = (event, binary, driftIntel, artery) => {
    const { computeSurface, computeDeltaPacket } = getComputeContext();

    const ciMeta =
      computeSurface || computeDeltaPacket
        ? {
            triHeartId: lane.triHeartId,
            computeSurface: computeSurface || null,
            computeDeltaPacket: computeDeltaPacket || null
          }
        : null;

    return Object.freeze({
      type: "pagescanner-event",
      source: lane.id,
      bits: binary,
      bitLength: binary.length,
      timestamp: PulseRealm.PulseNOW,
      driftIntel,
      artery,
      meta: Object.freeze({
        eventType: event.type || "unknown",
        route: event.route || null,
        file: event.file || null,
        line: event.line || null,
        meshId: lane.meshId,
        regionId: lane.regionId,
        ci: ciMeta
      })
    });
  };

  // ---------------------------------------------------------------------------
  //  SHADOW LOGGER — non-blocking, non-recursive
  // ---------------------------------------------------------------------------
  const shadowLog = (bits, meta) => {
    if (!lane.shadowLogger) return;
    try {
      lane.shadowLogger.logRaw(bits, meta);
    } catch {
      // never break the organism
    }
  };

  // ---------------------------------------------------------------------------
  //  BEACON EMISSION — Overmind / Trust Mesh
  // ---------------------------------------------------------------------------
  const emitBeacon = (packet) => {
    if (!lane.beacon) return;

    const severity =
      packet.driftIntel.driftScore >= 0.9
        ? "critical"
        : packet.driftIntel.driftScore >= 0.7
        ? "high"
        : packet.driftIntel.driftScore >= 0.4
        ? "moderate"
        : packet.driftIntel.driftScore > 0
        ? "low"
        : "none";

    const beaconEvent = Object.freeze({
      eventType: "pagescanner-drift",
      severity,
      file: packet.meta.file,
      route: packet.meta.route,
      driftScore: packet.driftIntel.driftScore,
      driftBucket: _bucketDrift(packet.driftIntel.driftScore),
      lineageCount: packet.driftIntel.lineage.length,
      moduleMode: packet.driftIntel.moduleMode,
      meshId: packet.meta.meshId,
      regionId: packet.meta.regionId
    });

    try {
      lane.beacon(beaconEvent);
    } catch {
      // never break the organism
    }
  };

  // ---------------------------------------------------------------------------
  //  CORE EVENT HANDLER
  // ---------------------------------------------------------------------------
  const handleScannerEvent = (event) => {
    const driftIntel = analyzeDrift(event);

    const json = JSON.stringify({ event, driftIntel });
    const binary = lane.encoder.encode(json);

    const now = PulseRealm.PulseNOW;
    rollWindow(now);
    lane._windowEvents += 1;
    lane._windowBits += binary.length;
    lane._totalEvents += 1;
    lane._totalBits += binary.length;

    if (driftIntel.driftScore >= 0.7) {
      lane._windowHighDrift += 1;
      lane._totalHighDrift += 1;
    }

    const artery = buildArtery(binary.length, driftIntel.driftScore);
    const packet = buildPacket(event, binary, driftIntel, artery);

    lane.scannerArtery.lastEventType = packet.meta.eventType;
    lane.scannerArtery.lastFile = packet.meta.file;
    lane.scannerArtery.lastRoute = packet.meta.route;
    lane.scannerArtery.lastBits = packet.bitLength;
    lane.scannerArtery.lastDriftScore = driftIntel.driftScore;
    lane.scannerArtery.lastDriftBucket = artery.driftBucket;

    computeScannerArtery();

    trace("event:received", {
      bitLength: packet.bitLength,
      eventType: packet.meta.eventType,
      driftScore: driftIntel.driftScore,
      artery
    });

    emitBeacon(packet);

    shadowLog(binary, packet.meta);

    lane.logger.logBinary(binary, {
      source: "pagescanner",
      eventType: packet.meta.eventType,
      file: packet.meta.file,
      route: packet.meta.route,
      driftScore: driftIntel.driftScore
    });

    lane.pipeline.run(binary);
    lane.reflex.run(binary);
  };

  // ---------------------------------------------------------------------------
  //  ATTACHMENT
  // ---------------------------------------------------------------------------
  const attach = (scanner) => {
    if (!scanner || typeof scanner.onEvent !== "function") {
      throw new Error("attach expects a PageScanner with .onEvent()");
    }

    scanner.onEvent((event) => {
      handleScannerEvent(event);
    });

    trace("attach", { scanner: scanner.id || "PageScanner" });

    return emitPageScannerAdapterPacket("attached", {
      scannerId: scanner.id || "PageScanner",
      instanceIndex: lane.instanceIndex
    });
  };

  // ---------------------------------------------------------------------------
  // EXPORT IMMORTAL SURFACE
  // ---------------------------------------------------------------------------
  return {
    init,
    attach,
    snapshotMembrane,
    snapshotArteryPacket,
    getComputeContext,
    computeScannerArtery,
    getInstanceCount,
    analyzeDrift,
    handleScannerEvent
  };

})();


// ============================================================================
//  FACTORY
// ============================================================================

export const createAIBinaryPageScannerAdapter = (config = {}) =>
  AIBinaryPageScannerAdapter(config);

// ---------------------------------------------------------------------------
//  DUAL EXPORT LAYER — CommonJS compatibility (v30 IMMORTAL-CORE++ dualband)
// ---------------------------------------------------------------------------
/* c8 ignore next 10 */
PulseRealm.AIPageScannerAdapter = {
    PageScannerAdapterMeta,
    AIBinaryPageScannerAdapter,
    createAIBinaryPageScannerAdapter,
    prewarmPageScannerAdapter,
    getGlobalPageScannerArteries
}
