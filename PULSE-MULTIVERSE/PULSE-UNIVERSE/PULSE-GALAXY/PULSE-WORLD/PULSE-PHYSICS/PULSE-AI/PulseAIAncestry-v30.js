// ============================================================================
//  PULSE OS v30.0‑IMMORTAL‑EVO++ — ANCESTRY ORGAN
//  Genealogical Archive • Lineage Ledger • Reproduction Historian
//  PURE BINARY. ZERO MUTATION OF EXTERNALS. ZERO RANDOMNESS. ZERO WALL‑TIME.
//  CORE MEMORY AWARE • DUALBAND‑AWARE • BLUETOOTH‑AWARE • HALO‑READY
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
//  IMMORTAL HELPERS — ZERO TIMING, ZERO RANDOMNESS
// ============================================================================

function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals.layered.organism.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals.binary.pressure != null)
    return binaryVitals.binary.pressure;
  return 0;
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0)   return "low";
  return "none";
}

function bucketLevel(v) {
  if (v >= 0.9)  return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5)  return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function bucketCost(v) {
  if (v >= 0.8)  return "heavy";
  if (v >= 0.5)  return "moderate";
  if (v >= 0.2)  return "light";
  if (v > 0)     return "negligible";
  return "none";
}

function clamp01(v) {
  if (v <= 0) return 0;
  if (v >= 1) return 1;
  return v;
}

// IMMORTAL timestamp substitute (monotonic counter, no wall‑clock)
let IMMORTAL_TICK = 0;
function immortalTimestamp() {
  IMMORTAL_TICK += 1;
  return IMMORTAL_TICK;
}

// ============================================================================
//  BLUETOOTH / PRESENCE CLASSIFICATION — METADATA‑ONLY
// ============================================================================
function classifyBluetoothPresenceCounters(state, bluetoothPresence) {
  if (!bluetoothPresence || typeof bluetoothPresence !== "object") return;

  state.btEvents += 1;

  const proximity = bluetoothPresence.proximityTier || "unknown";
  if (proximity === "near") {
    state.btNear += 1;
  } else if (proximity === "mid") {
    state.btMid += 1;
  } else if (proximity === "far") {
    state.btFar += 1;
  } else {
    state.btUnknown += 1;
  }

  const transport = bluetoothPresence.transport || "unknown";
  if (transport === "ble") {
    state.btBLE += 1;
  } else if (transport === "wifi") {
    state.btWiFi += 1;
  } else if (transport === "wired") {
    state.btWired += 1;
  } else {
    state.btTransportUnknown += 1;
  }

  const qRaw = Number(bluetoothPresence.linkQuality);
  if (Number.isFinite(qRaw)) {
    const q = clamp01(qRaw);
    state.btLinkQualitySum += q;
    state.btLinkQualitySamples += 1;
  }
}

// ============================================================================
//  ANCESTRY ARTERY ENGINE — v30 IMMORTAL‑EVO++
// ============================================================================
function computeAncestryArteryCore(lineage) {
  const eventCount  = lineage.length;
  const parentCount = new Set(lineage.map((r) => r.parentId)).size;
  const childCount  = new Set(lineage.map((r) => r.childId)).size;

  // Structural density heuristic
  const density = eventCount > 0 ? (parentCount + childCount) / (2 * eventCount) : 0;

  const throughput = clamp01(1 - clamp01(density)); // more dense → lower throughput
  const pressure   = clamp01(density);              // more dense → higher pressure
  const cost       = clamp01(pressure * (1 - throughput));
  const budget     = clamp01(throughput - cost);

  return Object.freeze({
    events: eventCount,
    parents: parentCount,
    children: childCount,

    throughput,
    throughputBucket: bucketLevel(throughput),

    pressure,
    pressureBucket: bucketPressure(pressure),

    cost,
    costBucket: bucketCost(cost),

    budget,
    budgetBucket: bucketLevel(budget)
  });
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v30.0 IMMORTAL‑EVO++
// ============================================================================
export const AIAncestry = (config = {}) => {
  const id       = config.id || "pulse-touch-ancestry"
  const encoder  = config.encoder
  const memory   = config.memory
  const pipeline = config.pipeline || null
  const reflex   = config.reflex || null
  const logger   = config.logger || null
  const trace    = !!config.trace

  if (!encoder.encode) {
    throw new Error("AIAncestry v30 requires a binary encoder")
  }
  if (!memory.write || !memory.read) {
    throw new Error("AIAncestry v30 requires a binary memory organ")
  }

  let _lineage = Object.freeze([])

  const _telemetry = {
    btEvents: 0,
    btNear: 0,
    btMid: 0,
    btFar: 0,
    btUnknown: 0,
    btBLE: 0,
    btWiFi: 0,
    btWired: 0,
    btTransportUnknown: 0,
    btLinkQualitySum: 0,
    btLinkQualitySamples: 0
  }

  const prewarm = () => true

  // ---------------------------------------------------------------------------
  // INTERNAL TRACE
  // ---------------------------------------------------------------------------
  const _trace = (_event, _payload) => {
    if (!trace) return
    // IMMORTAL: no console output
  }

  // ---------------------------------------------------------------------------
  // PACKET GENERATION
  // ---------------------------------------------------------------------------
  const _generateAncestryPacket = (
    record,
    {
      binaryVitals = {},
      band = "binary",
      presenceTag = "AIAncestry-v30",
      bluetoothPresence = null
    } = {},
    coreMemoryRef = null
  ) => {
    const binaryPressure = extractBinaryPressure(binaryVitals)
    const arteryCore     = computeAncestryArteryCore(_lineage)

    const btState = _telemetry
    const btAvgLink =
      btState.btLinkQualitySamples > 0
        ? btState.btLinkQualitySum / btState.btLinkQualitySamples
        : 0

    const payload = {
      type: "ancestry-event",
      ts: immortalTimestamp(),
      record,
      band,
      presenceTag,
      bluetoothPresence,
      pressure: binaryPressure,
      ancestryArtery: arteryCore,
      bluetooth: {
        events: btState.btEvents,
        near: btState.btNear,
        mid: btState.btMid,
        far: btState.btFar,
        unknown: btState.btUnknown,
        ble: btState.btBLE,
        wifi: btState.btWiFi,
        wired: btState.btWired,
        transport_unknown: btState.btTransportUnknown,
        avg_link_quality: btAvgLink
      },
      coreMemoryRef,
      flags: {
        ancestry_event: true,
        dualband_aware: true,
        bluetooth_aware: !!bluetoothPresence,
        presence_tagged: !!presenceTag
      }
    }

    const json   = JSON.stringify(payload)
    const binary = encoder.encode(json)

    return Object.freeze({
      ...payload,
      bits: binary,
      bitLength: binary.length,
      pressureBucket: bucketPressure(binaryPressure)
    })
  }

  // ---------------------------------------------------------------------------
  // RECORD REPRODUCTION
  // ---------------------------------------------------------------------------
  const recordReproduction = (
    record,
    {
      binaryVitals = {},
      coreMemoryRef = null,
      band = "binary",
      presenceTag = "AIAncestry-v30",
      bluetoothPresence = null
    } = {}
  ) => {
    const frozenRecord = Object.freeze({ ...record })

    _lineage = Object.freeze([..._lineage, frozenRecord])

    classifyBluetoothPresenceCounters(_telemetry, bluetoothPresence)

    const packet = _generateAncestryPacket(
      frozenRecord,
      {
        binaryVitals,
        band,
        presenceTag,
        bluetoothPresence
      },
      coreMemoryRef
    )

    if (pipeline) pipeline.run(packet.bits)
    if (reflex)   reflex.run(packet.bits)
    if (logger && logger.logBinary) {
      logger.logBinary(packet.bits, { source: "ancestry" })
    }

    return packet
  }

  // ---------------------------------------------------------------------------
  // STORAGE
  // ---------------------------------------------------------------------------
  const store = ({ binaryVitals = {}, coreMemoryRef = null } = {}) => {
    const arteryCore     = computeAncestryArteryCore(_lineage)
    const binaryPressure = extractBinaryPressure(binaryVitals)

    const payload = {
      type: "ancestry-store",
      ts: immortalTimestamp(),
      lineage: _lineage,
      ancestryArtery: arteryCore,
      pressure: binaryPressure,
      coreMemoryRef
    }

    const json   = JSON.stringify(payload)
    const binary = encoder.encode(json)

    const key = encoder.encode("ancestry:records:v30")
    memory.write(key, binary)

    return binary
  }

  const load = () => {
    const key    = encoder.encode("ancestry:records:v30")
    const binary = memory.read(key)

    if (!binary) {
      _lineage = Object.freeze([])
      return _lineage
    }

    const json   = encoder.decode(binary, "string")
    const parsed = JSON.parse(json)

    const lineage = Array.isArray(parsed.lineage) ? parsed.lineage : []
    _lineage = Object.freeze(
      lineage.map(r => Object.freeze({ ...r }))
    )

    return _lineage
  }

  // ---------------------------------------------------------------------------
  // QUERIES
  // ---------------------------------------------------------------------------
  const getChildren = parentId =>
    _lineage.filter(r => r.parentId === parentId)

  const getParent = childId =>
    _lineage.find(r => r.childId === childId) || null

  const getSiblings = childId => {
    const parent = getParent(childId)
    if (!parent) return []
    return _lineage
      .filter(r => r.parentId === parent.parentId && r.childId !== childId)
      .map(r => r.childId)
  }

  const getLineageTree = rootId => {
    const build = id => {
      const children = getChildren(id)
      return {
        id,
        children: children.map(c => build(c.childId))
      }
    }
    return build(rootId)
  }

  // ---------------------------------------------------------------------------
  // ANCESTRY ARTERY
  // ---------------------------------------------------------------------------
  const ancestryArtery = ({ binaryVitals = {} } = {}) => {
    const binaryPressure = extractBinaryPressure(binaryVitals)
    const core = computeAncestryArteryCore(_lineage)

    const localPressure =
      (core.pressure || 0) * 0.6 +
      (core.cost || 0) * 0.4

    const pressure = clamp01(
      0.6 * localPressure + 0.4 * binaryPressure
    )

    return {
      organism: {
        pressure,
        pressureBucket: bucketPressure(pressure)
      },
      lineage: {
        events: core.events,
        parents: core.parents,
        children: core.children
      },
      ancestry: {
        throughput: core.throughput,
        pressure: core.pressure,
        cost: core.cost,
        budget: core.budget,
        throughputBucket: core.throughputBucket,
        pressureBucket: core.pressureBucket,
        costBucket: core.costBucket,
        budgetBucket: core.budgetBucket
      }
    }
  }

  // ---------------------------------------------------------------------------
  // TELEMETRY SNAPSHOT
  // ---------------------------------------------------------------------------
  const snapshotTelemetry = () => {
    const bt = _telemetry
    const btAvg =
      bt.btLinkQualitySamples > 0
        ? bt.btLinkQualitySum / bt.btLinkQualitySamples
        : 0

    return Object.freeze({
      id,
      lineageEvents: _lineage.length,
      bluetooth: {
        events: bt.btEvents,
        near: bt.btNear,
        mid: bt.btMid,
        far: bt.btFar,
        unknown: bt.btUnknown,
        ble: bt.btBLE,
        wifi: bt.btWiFi,
        wired: bt.btWired,
        transport_unknown: bt.btTransportUnknown,
        avg_link_quality: btAvg
      }
    })
  }

  // ---------------------------------------------------------------------------
  // RETURN PSEUDO‑CLASS INSTANCE
  // ---------------------------------------------------------------------------
  return Object.freeze({
    id,
    encoder,
    memory,
    pipeline,
    reflex,
    logger,
    trace,

    prewarm,
    recordReproduction,
    store,
    load,

    getChildren,
    getParent,
    getSiblings,
    getLineageTree,

    ancestryArtery,
    snapshotTelemetry
  })
}
export const createAIAncestry = config => AIAncestry(config)


PulseRealm.AIAncestry = {
    AIAncestry,
    createAIAncestry
}
