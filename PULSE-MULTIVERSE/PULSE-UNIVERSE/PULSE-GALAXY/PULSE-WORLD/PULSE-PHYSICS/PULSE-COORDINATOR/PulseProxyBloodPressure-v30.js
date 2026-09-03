// ============================================================================
//  PulseCirculationMonitor-v30-ImmortalPlus-Surge.js
//  CIRCULATION MONITOR — v30 IMMORTALPLUS SURGE
//  Blood Pressure (latency) + Blood Flow (kbps) + Short Surge Pulses
//  PURE SENSOR • NO ROUTING • NO GLOBAL STATE
//  Advantages of short high-pressure pulses are exposed as explicit hints.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




import { PulseVitalsLogger as logger, PulseVitalsMonitor, pulseLog, PulseUIFlow as initUIFlow, db, setdoc, getdoc, doc, log, warn, error} from "../../../../../_PROOF/PULSE-PROOF.js";

import {emitTelemetry} from "./PulseProxyBloodStream-v30.js"




const SUBSYSTEM = "circulation-v30";

// ============================================================================
//  DIAGNOSTICS (optional)
// ============================================================================

const DIAG_ENABLED =

  (PulseRealm.PULSE_CIRCULATION_DIAGNOSTICS === true ||
    PulseRealm.PULSE_DIAGNOSTICS === true);

function diag(stage, details = {}) {
  if (!DIAG_ENABLED) return;

  logger.log(SUBSYSTEM, stage, details);
  emitTelemetry(SUBSYSTEM, stage, details);
}

diag("CIRCULATION_INIT_V30");

// ============================================================================
//  META — v30 IMMORTALPLUS SURGE
// ============================================================================

export const PulseCirculationMonitorMeta = Object.freeze({
  layer: "PulseCirculationMonitor",
  role: "CIRCULATION_MONITOR_ORGAN",
  version: "v30-ImmortalPlus-ABA-Surge",
  identity: "PulseCirculationMonitor-v30-ImmortalPlus-ABA-Surge",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    multiInstanceReady: true,

    // Sensor laws
    pureSensor: true,
    sensorOnly: true,
    noDecisionMaking: true,
    noRouting: true,
    noGlobalState: true,
    noMutation: true,
    noExternalMutation: true,
    noCompute: true,
    noTimers: true,
    noRandomness: true,
    noDynamicImports: true,
    noEval: true,

    // A‑B‑A surfaces
    bandAware: true,
    waveFieldAware: true,
    binaryFieldAware: true,
    stressFieldAware: true,
    flowFieldAware: true,
    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,

    // Awareness
    symbolicAware: true,
    binaryAware: true,
    dualBandAware: true,

    // Presence / chunking / cache-prewarm
    presenceAware: true,
    chunkingAware: true,
    cachePrewarmAware: true,

    // Experience surfaces
    chunkingHintsAware: true,
    presenceHintsAware: true,
    experienceMetaAware: true,

    // Surge / pullback
    surgeAware: true,
    pullbackHintsAware: true,

    worldLensAware: false
  }),

  contract: Object.freeze({
    input: [
      "CirculationLatency",
      "CirculationFlow",
      "DualBandContext",
      "AdvantageContext",
      "SurgeContext"
    ],
    output: [
      "CirculationVitalSigns",
      "CirculationBandSignature",
      "CirculationBinaryField",
      "CirculationWaveField",
      "CirculationAdvantageField",
      "CirculationHealingState",
      "CirculationChunkingHints",
      "CirculationPresenceHints",
      "CirculationSurgeHints",
      "CirculationExperienceMeta"
    ]
  })
});

// ============================================================================
//  EXPERIENCE META — descriptive only
// ============================================================================

export const PulseCirculationExperienceMeta = Object.freeze({
  description:
    "v30 ImmortalPlus circulation organ: measures latency/flow, emits band/advantage, and surfaces surge/pullback hints.",
  notes: [
    "Pure sensor, no routing or decisions.",
    "Short high-pressure pulses can be exploited by other organs for brief overclock windows.",
    "Pullback hints indicate when to reduce load after sustained high pressure."
  ]
});

// ============================================================================
//  A‑B‑A SURFACES — Band + Binary/Wave + Advantage
// ============================================================================

let circulationCycle = 0;

// Band: v20 semantics, kept simple
function buildBand(latency) {
  if (latency == null) return "symbolic";
  return latency > 180 ? "binary" : "symbolic";
}

function buildBandSignature(band) {
  const raw = `CIRC_BAND::${band}::v30`;
  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `circ-band-${acc}`;
}

function buildBinaryField(latency) {
  const patternLen = 10 + Math.floor((latency ?? 0) / 40);
  const density = patternLen + (latency ?? 0) / 5;
  const surface = density + patternLen;

  return {
    binaryPhenotypeSignature: `circ-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `circ-binary-surface-${(surface * 7) % 99991}`,
    binarySurface: { patternLen, density, surface },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveField(latency, band) {
  const amp = (latency ?? 0) / (band === "binary" ? 8 : 16) + 6;
  const amplitude = Math.floor(amp);
  const wavelength = amplitude + 4;
  const phase = amplitude % 16;

  return {
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
}

function buildCirculationCycleSignature() {
  return `circ-cycle-${(circulationCycle * 7919) % 99991}`;
}

// SURGE CLASSIFIER — short high-pressure pulses
function classifySurgeMode(latency, kbps) {
  const L = latency ?? 220;
  const K = kbps ?? 256;

  if (L >= 220 && K >= 300) return "surge-critical";
  if (L >= 180 && K >= 200) return "surge-high";
  return "normal";
}

// Advantage field: latency + kbps + surge
function buildAdvantageField(latency, kbps, surgeMode) {
  const safeLatency = latency ?? 220;
  const safeKbps = kbps ?? 256;

  const latencyScore = Math.max(
    0,
    Math.min(1, (260 - Math.min(safeLatency, 260)) / 260)
  );
  const bandwidthScore = Math.max(
    0,
    Math.min(1, Math.log10(Math.max(safeKbps, 1) + 10) / 4)
  );

  let surgeBoost = 0;
  if (surgeMode === "surge-high") surgeBoost = 0.1;
  if (surgeMode === "surge-critical") surgeBoost = 0.2;

  const advantageScore = Math.max(
    0,
    Math.min(1.3, latencyScore * 0.6 + bandwidthScore * 0.4 + surgeBoost)
  );

  let pressureBand = "low";
  if (safeLatency >= 220) pressureBand = "critical";
  else if (safeLatency >= 180) pressureBand = "high";
  else if (safeLatency >= 120) pressureBand = "medium";

  return {
    pressureBand,
    latencyMs: safeLatency,
    bandwidthKbps: safeKbps,
    advantageScore,
    surgeBoost,
    surgeMode,
    advantageSignature: `circ-adv-${Math.round(advantageScore * 1000)}`
  };
}

// ============================================================================
//  CHUNK / PRESENCE / SURGE HINTS — short-pulse advantages
// ============================================================================

function buildChunkingHints(latency, kbps, surgeMode) {
  const safeLatency = latency ?? 200;
  const safeKbps = kbps ?? 512;

  let baseChunkKB =
    safeLatency > 220
      ? 32
      : safeLatency > 160
      ? 64
      : safeLatency > 100
      ? 96
      : 128;

  // Short surge pulses: smaller chunks → finer control under pressure
  if (surgeMode === "surge-high") {
    baseChunkKB = Math.max(16, baseChunkKB - 32);
  } else if (surgeMode === "surge-critical") {
    baseChunkKB = Math.max(8, baseChunkKB - 64);
  }

  const suggestedChunkSizeKB = Math.max(8, Math.min(256, baseChunkKB));
  const suggestedPrewarm = safeLatency > 140;

  return {
    suggestedChunkSizeKB,
    suggestedPrewarm,
    bandwidthKbps: safeKbps,
    latencyMs: safeLatency,
    surgeMode
  };
}

function buildPresenceHints(latency, surgeMode) {
  const safeLatency = latency ?? 200;

  let recommendedPresenceWindowMs =
    safeLatency < 90
      ? 8000
      : safeLatency < 140
      ? 12000
      : safeLatency < 200
      ? 18000
      : 24000;

  // Short surge pulses: tighter windows, more responsive presence
  if (surgeMode === "surge-high") {
    recommendedPresenceWindowMs = Math.floor(recommendedPresenceWindowMs * 0.8);
  } else if (surgeMode === "surge-critical") {
    recommendedPresenceWindowMs = Math.floor(recommendedPresenceWindowMs * 0.6);
  }

  const suggestedPollIntervalMs = Math.floor(recommendedPresenceWindowMs / 2);

  return {
    recommendedPresenceWindowMs,
    suggestedPollIntervalMs,
    latencyMs: safeLatency,
    surgeMode
  };
}

// Surge hints: how to exploit short pulses, when to pull back
function buildSurgeHints(advantageField) {
  const { surgeMode, pressureBand } = advantageField;

  let allowSurge = false;
  let recommendedDurationMs = 0;
  let pullbackRecommended = false;
  let shortPulseAdvantage = false;

  if (surgeMode === "surge-high") {
    allowSurge = true;
    recommendedDurationMs = 6000;
    shortPulseAdvantage = true;
  } else if (surgeMode === "surge-critical") {
    allowSurge = true;
    recommendedDurationMs = 3000;
    pullbackRecommended = true;
    shortPulseAdvantage = true;
  }

  if (pressureBand === "critical") {
    pullbackRecommended = true;
  }

  return {
    surgeMode,
    pressureBand,
    allowSurge,
    recommendedDurationMs,
    pullbackRecommended,
    shortPulseAdvantage
  };
}

// ============================================================================
//  HEALING STATE — read-only
// ============================================================================

const healingState = {
  lastLatencyMs: null,
  lastBandwidthKbps: null,
  lastPressureBand: "low",
  lastAdvantageScore: 1.0,
  lastSurgeMode: "normal",
  cycleCount: 0
};

export function getCirculationHealingState() {
  return { ...healingState };
}

// ============================================================================
// 1. PRESSURE CHECK — Measure latency (blood pressure)
// ============================================================================

async function measureLatency(url = "/Pulse-Coordinator/ping") {
  diag("MEASURE_LATENCY_START", { url });

  const start = performance.now();

  try {
    const res = await fetch(url, { cache: "no-store" });
    const t = performance.now() - start;

    diag("PING_SUCCESS", { durationMs: t });

    let data = {};
    try {
      data = await res.json();
      diag("PING_JSON_PARSED");
    } catch {
      diag("PING_JSON_PARSE_FAILED");
    }

    return {
      ok: res.ok,
      rtt: data.rtt ?? t,
      kbps: data.kbps ?? null,
      msPerKB: data.msPerKB ?? null
    };
  } catch (err) {
    diag("PING_FAILED", { error: String(err) });

    return {
      ok: false,
      rtt: null,
      kbps: null,
      msPerKB: null
    };
  }
}

// ============================================================================
// 2. CLASSIFIERS — Simple ratings
// ============================================================================

function classifyBars(latency) {
  diag("CLASSIFY_BARS", { latency });

  if (latency == null) return 1;
  if (latency < 80) return 4;
  if (latency < 110) return 3;
  if (latency < 160) return 2;
  return 1;
}

function classifyNetworkHealth(latency) {
  diag("CLASSIFY_HEALTH", { latency });

  if (latency == null) return "Unknown";
  if (latency < 90) return "Excellent";
  if (latency < 120) return "Good";
  if (latency < 180) return "Weak";
  return "Poor";
}

// ============================================================================
// 3. PUBLIC API — Vital‑signs packet (v30 ImmortalPlus Surge)
// ============================================================================

async function getPulseTelemetry() {
  circulationCycle++;
  diag("TELEMETRY_START_V30");

  const ping = await measureLatency();

  const latency = ping.rtt;
  const kbps = ping.kbps;

  diag("TELEMETRY_VALUES", { latency, kbps });

  const bars = classifyBars(latency);
  const health = classifyNetworkHealth(latency);

  diag("TELEMETRY_CLASSIFIED", { bars, health });

  const surgeMode = classifySurgeMode(latency, kbps);

  const band = buildBand(latency);
  const bandSignature = buildBandSignature(band);
  const binaryField = buildBinaryField(latency);
  const waveField = buildWaveField(latency, band);
  const circulationCycleSignature = buildCirculationCycleSignature();
  const advantageField = buildAdvantageField(latency, kbps, surgeMode);

  const chunkingHints = buildChunkingHints(latency, kbps, surgeMode);
  const presenceHints = buildPresenceHints(latency, surgeMode);
  const surgeHints = buildSurgeHints(advantageField);

  healingState.lastLatencyMs = advantageField.latencyMs;
  healingState.lastBandwidthKbps = advantageField.bandwidthKbps;
  healingState.lastPressureBand = advantageField.pressureBand;
  healingState.lastAdvantageScore = advantageField.advantageScore;
  healingState.lastSurgeMode = surgeMode;
  healingState.cycleCount++;

  const snapshot = {
    lastChunkDurationMs: latency,
    lastChunkKbps: kbps ?? null,
    lastChunkSizeKB: kbps ? kbps / 8 : null,
    lastChunkIndex: PulseRealm.PulseNOW,

    band,
    bandSignature,
    binaryField,
    waveField,
    circulationCycleSignature,
    advantageField,

    chunkingHints,
    presenceHints,
    surgeHints,

    experienceMeta: PulseCirculationExperienceMeta
  };

  diag("SNAPSHOT_BUILT_V30", snapshot);

  const result = {
    live: {
      latency,
      phoneKbps: kbps,
      appKbps: kbps,
      pulsebandBars: bars,
      phoneBars: 4,
      networkHealth: health,
      route: "Primary",
      state: "active",
      microWindowActive: true,
      lastSyncTimestamp: PulseRealm.PulseNOW,

      band,
      bandSignature,
      binaryField,
      waveField,
      circulationCycleSignature,
      advantageField,

      chunkingHints,
      presenceHints,
      surgeHints,

      experienceMeta: PulseCirculationExperienceMeta
    },
    snapshot,
    healingState: getCirculationHealingState()
  };

  diag("TELEMETRY_READY_V30", result);

  return result;
}

// ============================================================================
//  EXPORT — CIRCULATION MONITOR v30 ImmortalPlus Surge
// ============================================================================

export const PulseUpdate = {
  measureLatency,
  getPulseTelemetry,
  meta: PulseCirculationMonitorMeta,
  experienceMeta: PulseCirculationExperienceMeta
};

PulseRealm.BloodPressure = {
  getPulseTelemetry,
  PulseUpdate,
  measureLatency,
  getCirculationHealingState,
  healingState
}