// ============================================================================
//  PulseTelemetryOneBand-v30-ImmortalPlus.js
//  TELEMETRY ORGAN — v30 IMMORTALPLUS ONEBAND (BLOODSTREAM)
//  Unified Metrics • Subsystem Heartbeats • Drift/Anomaly Signals
//  Mesh-Aware Telemetry Propagation (Mini-Pulse Distance Engine)
//  PURE NERVOUS-SYSTEM ORGAN — NO BACKEND, NO DOM, NO GPU
//  v30-ImmortalPlus-OneBand:
//    • Deterministic, drift-proof, multi-instance safe
//    • Unified advantage field (distance → advantageScore)
//    • OneBand A-B-A surfaces (band/binary/wave)
//    • Mesh-pulse aware (hops/distance bounded)
//    • Short-pulse advantage surfaced for near, low-hop signals
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { PulseVitalsLogger as logger, PulseVitalsMonitor, pulseLog, PulseUIFlow as initUIFlow, db, setdoc, getdoc, doc, log, warn, error} from "../../../../../_PROOF/PULSE-PROOF.js";


// ============================================================================
// INTERNAL STATE — Telemetry Bloodstream (bounded, observational only)
// ============================================================================

const telemetryStream = [];
const MAX_STREAM_SIZE = 5000;

const MAX_HOPS = 5;
const DEFAULT_DISTANCE = 1;

let telemetryCycle = 0;

// ============================================================================
// META — v30 IMMORTALPLUS ONEBAND
// ============================================================================

export const PulseTelemetryOneBandMeta = Object.freeze({
  layer: "PulseTelemetryOneBand",
  role: "BLOODSTREAM_TELEMETRY_ORGAN",
  version: "v30-ImmortalPlus-OneBand",
  identity: "PulseTelemetryOneBand-v30-ImmortalPlus",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    multiInstanceReady: true,

    pureNervousOrgan: true,
    noBackendCalls: false, // logger may forward, but organ itself is pure
    noDOMAccess: true,
    noGPUAccess: true,

    noRoutingDecisions: true,
    noGlobalMutation: true,
    noExternalMutation: true,
    noRandomness: true,
    noDynamicImports: true,
    noEval: true,

    oneBandAware: true,
    binaryFieldAware: true,
    waveFieldAware: true,
    unifiedAdvantageField: true,
    meshPulseAware: true,

    shortPulseAdvantageAware: true
  }),

  contract: Object.freeze({
    input: [
      "TelemetrySubsystem",
      "TelemetryEvent",
      "TelemetryData",
      "DistanceContext"
    ],
    output: [
      "TelemetryPacket",
      "TelemetryBandSignature",
      "TelemetryBinaryField",
      "TelemetryWaveField",
      "TelemetryAdvantageField",
      "TelemetryStreamSnapshot"
    ]
  })
});

// ============================================================================
// EXPERIENCE META — descriptive only
// ============================================================================

export const PulseTelemetryExperienceMeta = Object.freeze({
  description:
    "v30 OneBand bloodstream: unified telemetry packets with distance-based band/advantage and mesh-safe propagation.",
  notes: [
    "Short, near pulses (low hops, low distance) have highest advantageScore.",
    "Distance and hops are bounded to keep the mesh safe and finite.",
    "Organ is observational: it emits and shapes packets, but does not decide routing policies."
  ]
});

// ============================================================================
// ONEBAND A-B-A SURFACES — Band + Binary/Wave + Advantage
// ============================================================================

function buildBand(distance) {
  const d = distance ?? DEFAULT_DISTANCE;
  if (d <= 1) return "symbolic";
  if (d <= 3) return "dual";
  return "binary";
}

function buildBandSignature(band) {
  const raw = `TELEMETRY_ONEBAND::${band}::v30`;
  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `telemetry-oneband-${acc}`;
}

function buildBinaryField(distance) {
  const d = distance ?? DEFAULT_DISTANCE;
  const patternLen = 8 + d * 3;
  const density = patternLen + d * 4;
  const surface = density + patternLen;

  return {
    binaryPhenotypeSignature: `telemetry-one-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `telemetry-one-binary-surface-${(surface * 7) % 99991}`,
    binarySurface: { patternLen, density, surface },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveField(distance, band) {
  const d = distance ?? DEFAULT_DISTANCE;
  const ampBase =
    band === "binary" ? 10 :
    band === "dual"   ? 8  :
                        6;

  const amplitude = ampBase + d * (band === "binary" ? 2 : 1);
  const wavelength = amplitude + 5;
  const phase = amplitude % 32;

  return {
    amplitude,
    wavelength,
    phase,
    band,
    mode: `${band}-wave`
  };
}

function buildTelemetryCycleSignature() {
  return `telemetry-cycle-${(telemetryCycle * 7919) % 99991}`;
}

// Advantage field: distance → 0–1 advantageScore (closer = higher)
// Short pulses (near, low hops) are explicitly marked.
function buildAdvantageField(distance, hops) {
  const dRaw = distance ?? DEFAULT_DISTANCE;
  const hRaw = hops ?? 0;

  const d = Math.max(0, Math.min(MAX_HOPS, dRaw));
  const h = Math.max(0, Math.min(MAX_HOPS, hRaw));

  const distanceScore = Math.max(0, Math.min(1, 1 - d / MAX_HOPS));
  const hopScore = Math.max(0, Math.min(1, 1 - h / MAX_HOPS));

  const advantageScore = Math.max(
    0,
    Math.min(1, (distanceScore * 0.6 + hopScore * 0.4))
  );

  let distanceBand = "near";
  if (d >= 4) distanceBand = "far";
  else if (d >= 2) distanceBand = "mid";

  const shortPulseAdvantage = d <= 2 && h <= 1;

  return {
    distance: dRaw,
    hops: hRaw,
    distanceBand,
    advantageScore,
    shortPulseAdvantage,
    advantageSignature: `telemetry-adv-${Math.round(advantageScore * 1000)}`
  };
}

// ============================================================================
// EMIT TELEMETRY — Universal signal emitter (v30 OneBand A-B-A)
// ============================================================================

export function emitTelemetry(subsystem, event, data = {}) {
  try {
    telemetryCycle++;

    const baseDistance = data.distance ?? DEFAULT_DISTANCE;
    const baseHops = data.hops ?? 0;

    const band = buildBand(baseDistance);
    const bandSignature = buildBandSignature(band);
    const binaryField = buildBinaryField(baseDistance);
    const waveField = buildWaveField(baseDistance, band);
    const telemetryCycleSignature = buildTelemetryCycleSignature();
    const advantageField = buildAdvantageField(baseDistance, baseHops);

    const packet = {
      subsystem,
      event,
      data: { ...data },
      hops: baseHops,
      distance: baseDistance,
      band,
      bandSignature,
      binaryField,
      waveField,
      telemetryCycleSignature,
      advantageField,
      meta: {
        layer: PulseTelemetryOneBandMeta.layer,
        version: PulseTelemetryOneBandMeta.version,
        identity: PulseTelemetryOneBandMeta.identity,
        experienceMeta: PulseTelemetryExperienceMeta
      }
    };

    telemetryStream.push(packet);
    if (telemetryStream.length > MAX_STREAM_SIZE) telemetryStream.shift();

    logger.log("telemetry-oneband", "emit", {
      subsystem,
      event,
      distance: baseDistance,
      hops: baseHops,
      band,
      advantageScore: advantageField.advantageScore,
      shortPulseAdvantage: advantageField.shortPulseAdvantage
    });

    broadcastTelemetry(packet);

    return packet;
  } catch (err) {
    logger.error("telemetry-oneband", "emit_failed", { error: String(err) });
    return null;
  }
}

// ============================================================================
// MINI-PULSE BROADCAST — Mesh-safe propagation (v30 OneBand)
// ============================================================================

export function broadcastTelemetry(packet) {
  try {
    if (!packet || typeof packet !== "object") return;
    if (packet.hops >= MAX_HOPS) return;

    const amplified = amplifyPulse(packet);

    logger.log("telemetry-oneband", "broadcast", {
      subsystem: amplified.subsystem,
      event: amplified.event,
      hops: amplified.hops,
      distance: amplified.distance,
      band: amplified.band,
      advantageScore: amplified.advantageField.advantageScore
    });

    // In a real mesh, this is where you'd hand off to transport.
    // Here we just record the amplified packet.
    telemetryStream.push(amplified);
    if (telemetryStream.length > MAX_STREAM_SIZE) telemetryStream.shift();
  } catch (err) {
    logger.error("telemetry-oneband", "broadcast_failed", { error: String(err) });
  }
}

// ============================================================================
// MINI-PULSE AMPLIFIER — Increase distance + hop count (v30 OneBand)
// ============================================================================

export function amplifyPulse(packet) {
  const nextHops = (packet.hops ?? 0) + 1;
  const nextDistance = (packet.distance ?? DEFAULT_DISTANCE) + 1;

  const band = buildBand(nextDistance);
  const bandSignature = buildBandSignature(band);
  const binaryField = buildBinaryField(nextDistance);
  const waveField = buildWaveField(nextDistance, band);
  const advantageField = buildAdvantageField(nextDistance, nextHops);

  return {
    ...packet,
    hops: nextHops,
    distance: nextDistance,
    band,
    bandSignature,
    binaryField,
    waveField,
    advantageField
  };
}

// ============================================================================
// RECEIVE MESH PULSE — Accept telemetry from other nodes (v30 OneBand)
// ============================================================================

export function receiveMeshPulse(packet) {
  try {
    if (!packet || typeof packet !== "object") return;
    if (packet.hops >= MAX_HOPS) return;

    telemetryStream.push(packet);
    if (telemetryStream.length > MAX_STREAM_SIZE) telemetryStream.shift();

    logger.log("telemetry-oneband", "mesh_receive", {
      subsystem: packet.subsystem,
      event: packet.event,
      hops: packet.hops,
      distance: packet.distance,
      band: packet.band
    });

    broadcastTelemetry(packet);
  } catch (err) {
    logger.error("telemetry-oneband", "mesh_receive_failed", { error: String(err) });
  }
}

// ============================================================================
// HEARTBEAT — Subsystem periodic pulse (v30 OneBand)
// ============================================================================

export function heartbeat(subsystem, extra = {}) {
  return emitTelemetry(subsystem, "heartbeat", {
    ...extra
  });
}

// ============================================================================
// DRIFT DETECTION — caller supplies expectedVersion (v30 OneBand)
// ============================================================================

export function detectDrift(subsystem, expectedVersion, actualVersion) {
  if (!expectedVersion || !actualVersion) return null;
  if (actualVersion !== expectedVersion) {
    return emitTelemetry(subsystem, "version-drift", {
      expected: expectedVersion,
      actual: actualVersion
    });
  }
  return null;
}

// ============================================================================
// ANOMALY — arbitrary anomaly description (v30 OneBand)
// ============================================================================

export function anomaly(subsystem, description, details = {}) {
  return emitTelemetry(subsystem, "anomaly", {
    description,
    ...details
  });
}

// ============================================================================
// PERFORMANCE METRICS — generic metric emitter (v30 OneBand)
// ============================================================================

export function metric(subsystem, name, value, extra = {}) {
  return emitTelemetry(subsystem, "metric", {
    name,
    value,
    ...extra
  });
}

// ============================================================================
// STREAM ACCESS — bloodstream view (v30 OneBand)
// ============================================================================

export function getStream(limit = 500) {
  if (limit <= 0) return [...telemetryStream];
  return telemetryStream.slice(-limit);
}

export function getTelemetryStreamSnapshot(limit = 256) {
  return telemetryStream.slice(-Math.max(1, limit));
}

// ============================================================================
// SNAPSHOT — compact view by subsystem (v30 OneBand)
// ============================================================================

export function getTelemetrySnapshot() {
  const latest = telemetryStream.slice(-200);
  const bySubsystem = {};

  latest.forEach((p) => {
    if (!bySubsystem[p.subsystem]) bySubsystem[p.subsystem] = [];
    bySubsystem[p.subsystem].push(p);
  });

  return {
    ts: PulseRealm.PulseNOW,
    totalPackets: telemetryStream.length,
    recentPackets: latest.length,
    bySubsystem,
    meta: {
      layer: PulseTelemetryOneBandMeta.layer,
      version: PulseTelemetryOneBandMeta.version,
      identity: PulseTelemetryOneBandMeta.identity,
      experienceMeta: PulseTelemetryExperienceMeta
    }
  };
}

// ============================================================================
// EXPORTS — Telemetry Organ API (v30 ImmortalPlus OneBand)
// ============================================================================

export const PulseTelemetryOneBand = {
  emit: emitTelemetry,
  heartbeat,
  detectDrift,
  anomaly,
  metric,
  getStream,
  getTelemetrySnapshot,
  getTelemetryStreamSnapshot,
  broadcastTelemetry,
  receiveMeshPulse,
  amplifyPulse,
  meta: PulseTelemetryOneBandMeta,
  experienceMeta: PulseTelemetryExperienceMeta
};
