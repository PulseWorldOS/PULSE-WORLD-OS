// ============================================================================
//  PULSE OS v30.0‑IMMORTAL‑EVO+++ — ANATOMY ORGAN v4
//  Structural Map • Connectivity Skeleton • Organism Blueprint
//  PURE STRUCTURE. ZERO ROUTING. ZERO HEAVY COMPUTE. BINARY‑AWARE.
//  • Dualband‑aware (binary / symbolic / dual).
//  • Mesh‑pressure‑aware (via vitals + external mesh artery).
//  • Advantage‑field‑aware (metadata only).
//  • Bluetooth‑presence‑aware (metadata only).
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
// META — ANATOMY ORGAN IDENTITY (READ‑ONLY)
// ============================================================================
export const AI_ANATOMY_META_V30 = Object.freeze({
  layer: "organism",
  role: "ANATOMY_ORGAN",
  version: "v30.0-IMMORTAL-EVO+++",
  target: "dualband-organism",
  selfRepairable: true,
  evo: {
    dualMode: true,
    binaryAware: true,
    symbolicAware: true,
    meshPressureAware: true,
    advantageFieldAware: true,
    bluetoothPresenceAware: true,
    zeroRouting: true,
    zeroHeavyCompute: true,
    zeroMutationExternal: true,
    driftProof: true,
    futureEvolutionReady: true
  }
});

// ============================================================================
// HELPERS — PRESSURE + BUCKETS (v30 IMMORTAL BUCKET ENGINE)
// ============================================================================
function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals.layered.organism.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals.binary.pressure != null)
    return binaryVitals.binary.pressure;
  return 0;
}

function extractMeshPressure(meshArtery = {}) {
  // meshArtery.organism.pressure or meshArtery.mesh.pressure, if present
  if (meshArtery.organism.pressure != null) return meshArtery.organism.pressure;
  if (meshArtery.mesh.pressure != null) return meshArtery.mesh.pressure;
  return 0;
}

function clamp01(v) {
  if (!Number.isFinite(v)) return 0;
  if (v <= 0) return 0;
  if (v >= 1) return 1;
  return v;
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0)   return "low";
  return "none";
}

function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0)    return "negligible";
  return "none";
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v30.0 IMMORTAL‑EVO+++
// ============================================================================
export const AIAnatomy = (config = {}) => {
  const id = config.id || "pulse-touch-anatomy"
  const encoder = config.encoder
  const memory = config.memory
  const trace = !!config.trace

  if (!encoder || typeof encoder.encode !== "function") {
    throw new Error("AIAnatomy v30 requires aiBinaryAgent encoder")
  }
  if (
    !memory ||
    typeof memory.write !== "function" ||
    typeof memory.read !== "function"
  ) {
    throw new Error("AIAnatomy v30 requires a binary memory organ with write/read")
  }

  const topology = new Map()

  const _stats = {
    registerEvents: 0,
    connectEvents: 0,
    linkEvents: 0
  }

  const meta = AI_ANATOMY_META_V30

  const prewarm = () => true

  // ---------------------------------------------------------------------------
  // STRUCTURAL METRICS
  // ---------------------------------------------------------------------------
  const _computeStructuralThroughput = (organCount, connectionCount) => {
    const organFactor = Math.min(1, organCount / 128)
    const connFactor = Math.min(1, connectionCount / 256)
    const raw = Math.max(0, 1 - (organFactor * 0.5 + connFactor * 0.5))
    return Math.min(1, raw)
  }

  const _computeStructuralPressure = (connectionCount, organCount) => {
    const density = organCount > 0 ? connectionCount / organCount : 0
    const raw = Math.min(1, density / 12)
    return Math.max(0, raw)
  }

  const _computeStructuralCost = (pressure, throughput) => {
    const raw = pressure * (1 - throughput)
    return Math.max(0, Math.min(1, raw))
  }

  const _computeStructuralBudget = (throughput, cost) => {
    const raw = throughput - cost
    return Math.max(0, Math.min(1, raw))
  }

  const _computeStructuralArtery = () => {
    const organIds = Array.from(topology.keys())
    const organCount = organIds.length

    let connectionCount = 0
    for (const data of topology.values()) {
      connectionCount += data.inputs.length
      connectionCount += data.outputs.length
      connectionCount += data.bidirectional.length
    }

    const throughput = _computeStructuralThroughput(organCount, connectionCount)
    const pressure = _computeStructuralPressure(connectionCount, organCount)
    const cost = _computeStructuralCost(pressure, throughput)
    const budget = _computeStructuralBudget(throughput, cost)

    return Object.freeze({
      throughput,
      throughputBucket: bucketLevel(throughput),

      pressure,
      pressureBucket: bucketPressure(pressure),

      cost,
      costBucket: bucketCost(cost),

      budget,
      budgetBucket: bucketLevel(budget),

      organCount,
      connectionCount,

      events: {
        register: _stats.registerEvents,
        connect: _stats.connectEvents,
        link: _stats.linkEvents
      }
    })
  }

  // ---------------------------------------------------------------------------
  // TOPOLOGY
  // ---------------------------------------------------------------------------
  const registerOrgan = organId => {
    if (!organId) return

    if (!topology.has(organId)) {
      topology.set(organId, {
        inputs: [],
        outputs: [],
        bidirectional: []
      })

      _stats.registerEvents++
      const artery = _computeStructuralArtery()
      _trace("registerOrgan", { organId, artery })
    }
  }

  const connect = (from, to) => {
    if (!from || !to) return

    registerOrgan(from)
    registerOrgan(to)

    const node = topology.get(from)
    if (!node.outputs.includes(to)) node.outputs.push(to)

    const target = topology.get(to)
    if (!target.inputs.includes(from)) target.inputs.push(from)

    _stats.connectEvents++
    const artery = _computeStructuralArtery()
    _trace("connect", { from, to, artery })
  }

  const link = (a, b) => {
    if (!a || !b) return

    registerOrgan(a)
    registerOrgan(b)

    const A = topology.get(a)
    const B = topology.get(b)

    if (!A.bidirectional.includes(b)) A.bidirectional.push(b)
    if (!B.bidirectional.includes(a)) B.bidirectional.push(a)

    _stats.linkEvents++
    const artery = _computeStructuralArtery()
    _trace("link", { a, b, artery })
  }

  // ---------------------------------------------------------------------------
  // SNAPSHOT v4
  // ---------------------------------------------------------------------------
  const snapshot = ({
    binaryVitals = {},
    meshArtery = {},
    advantageField = {},
    bluetoothPresence = {}
  } = {}) => {
    const obj = {}

    for (const [organId, data] of topology.entries()) {
      obj[organId] = {
        inputs: [...data.inputs],
        outputs: [...data.outputs],
        bidirectional: [...data.bidirectional]
      }
    }

    const artery = _computeStructuralArtery()
    const binaryPressure = extractBinaryPressure(binaryVitals)
    const meshPressure = extractMeshPressure(meshArtery)

    const advantageEvents = advantageField.events || 0
    const advantageBinaryPref = advantageField.binaryPreferenceEvents || 0
    const advantageFactored = advantageField.factoredPathEvents || 0

    const btProximity = bluetoothPresence.proximityTier || "unknown"
    const btTransport = bluetoothPresence.transport || "unknown"
    const btQuality = clamp01(Number(bluetoothPresence.linkQuality ?? 0))

    const payload = {
      type: "anatomy-snapshot-v4",
      meta,
      timestamp: PulseRealm.PulseNOW,
      topology: obj,
      artery,
      pressures: {
        structural: artery.pressure,
        binary: binaryPressure,
        mesh: meshPressure
      },
      advantage: {
        events: advantageEvents,
        binaryPreferenceEvents: advantageBinaryPref,
        factoredPathEvents: advantageFactored
      },
      bluetooth: {
        proximityTier: btProximity,
        transport: btTransport,
        linkQuality: btQuality
      }
    }

    const json = JSON.stringify(payload)
    const binary = encoder.encode(json)

    const packet = Object.freeze({
      ...payload,
      bits: binary,
      bitLength: binary.length,
      pressureBucket: bucketPressure(
        0.5 * artery.pressure + 0.25 * binaryPressure + 0.25 * meshPressure
      )
    })

    _trace("snapshot", {
      organs: Object.keys(obj).length,
      artery,
      pressures: payload.pressures,
      advantage: payload.advantage,
      bluetooth: payload.bluetooth
    })

    return packet
  }

  // ---------------------------------------------------------------------------
  // STORAGE
  // ---------------------------------------------------------------------------
  const store = opts => {
    const snap = snapshot(opts)

    const key = encoder.encode("anatomy:current")
    const value = snap.bits

    memory.write(key, value)

    _trace("store", { bits: value.length })

    return snap
  }

  const load = () => {
    const key = encoder.encode("anatomy:current")
    const binary = memory.read(key)

    if (!binary) {
      _trace("load:none", {})
      return null
    }

    const json = encoder.decode(binary, "string")
    const topologyObj = JSON.parse(json)

    _trace("load", {
      organs: Object.keys(topologyObj.topology || {}).length,
      artery: topologyObj.artery
    })

    return Object.freeze(topologyObj)
  }

  // ---------------------------------------------------------------------------
  // ARTERY v4
  // ---------------------------------------------------------------------------
  const anatomyArtery = ({ binaryVitals = {}, meshArtery = {} } = {}) => {
    const artery = _computeStructuralArtery()
    const binaryPressure = extractBinaryPressure(binaryVitals)
    const meshPressure = extractMeshPressure(meshArtery)

    const localPressure =
      (artery.pressure || 0) * 0.5 +
      (artery.cost || 0) * 0.3 +
      (meshPressure || 0) * 0.2

    const pressure = Math.max(
      0,
      Math.min(1, 0.5 * localPressure + 0.5 * binaryPressure)
    )

    return {
      meta,
      organism: {
        pressure,
        pressureBucket: bucketPressure(pressure)
      },
      anatomy: {
        throughput: artery.throughput,
        pressure: artery.pressure,
        cost: artery.cost,
        budget: artery.budget,
        organCount: artery.organCount,
        connectionCount: artery.connectionCount
      },
      mesh: {
        pressure: meshPressure,
        pressureBucket: bucketPressure(meshPressure)
      }
    }
  }

  // ---------------------------------------------------------------------------
  // TRACE
  // ---------------------------------------------------------------------------
  const _trace = (event, payload) => {
    if (!trace) return
    console.log(`[${id} v30] ${event}`, payload)
  }

  // ---------------------------------------------------------------------------
  // RETURN PSEUDO‑CLASS INSTANCE
  // ---------------------------------------------------------------------------
  return Object.freeze({
    id,
    encoder,
    memory,
    trace,
    meta,
    prewarm,
    registerOrgan,
    connect,
    link,
    snapshot,
    store,
    load,
    anatomyArtery
  })
}

export const createAIAnatomy = config => AIAnatomy(config)


PulseRealm.AIAnatomy = {
    AIAnatomy,
    createAIAnatomy,
    AI_ANATOMY_META_V30
}
