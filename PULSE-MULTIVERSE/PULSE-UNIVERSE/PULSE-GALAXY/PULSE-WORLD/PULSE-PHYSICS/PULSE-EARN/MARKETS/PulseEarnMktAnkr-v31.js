// ============================================================================
// FILE: /PULSE-EARN/PulseEarnMktAnkr-v31.js
// PULSE EARN — v31 MARKET ANKR ORGAN (IMMORTAL‑INTEL‑WORLD + GPU‑BEAST)


// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
// META
// ============================================================================
export const PulseEarnMktAnkrMeta_v31 = Object.freeze({
  identity: "PulseEarnMktAnkr",
  version: "v31-Ankr-Immortal-Intel-World",
  role: "MARKET_ANKR",
  schemaVersion: "v2",
  guarantees: {
    pureComputeCore: true,
    dualBandAware: true,
    gpuAware: true,
    capabilityAware: true,
    binaryWaveAware: true,
    presenceAware: true,
    advantageAware: true,
    hintsAware: true,
    arteryAware: true
  }
});

// ============================================================================
// INTERNAL STATE (Healing)
// ============================================================================


export const ankrHealing_v31 = {
  lastRunKind: null,
  lastPayloadShape: null,
  lastOk: null,
  lastError: null,
  lastCycleIndex: 0,

  lastBand: "symbolic",
  lastBandSignatureIntel: null,
  lastBandSignatureClassic: null,

  lastBinaryField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastHintsField: null,

  lastArterySnapshot: null,

  lastSignatureIntel: null,
  lastSignatureClassic: null,

  lastUpdatedAt: null
};

// ============================================================================
// HASH HELPERS (dual‑hash INTEL)
// ============================================================================
function computeHash_v31(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++)
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  return `h${h}`;
}

function computeHashIntelligence_v31(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++)
    h = (h * 131 + base.charCodeAt(i) * (i + 7)) % 1000000007;
  return `HINTEL_${h}`;
}

function buildDualHashSignature_v31(label, intelPayload, classicString) {
  const intelBase = { label, intel: intelPayload || {}, classic: classicString || "" };
  return {
    intel: computeHashIntelligence_v31(intelBase),
    classic: computeHash_v31(`${label}::${classicString || ""}`)
  };
}

function normalizeBand_v31(b) {
  const x = String(b || "symbolic").toLowerCase();
  return x === "binary" ? "binary" : "symbolic";
}

// ============================================================================
// PRESENCE FIELD (v31 IMMORTAL‑INTEL‑WORLD)
// ============================================================================
function buildPresenceField_v31(payload, cycleIndex) {
  const patternLen = Object.keys(payload || {}).length;
  const internalPressure = Math.floor((cycleIndex * 0.0001) * 1000);

  const meshPressureIndex = internalPressure + patternLen * 2;
  const castleLoadLevel = patternLen;

  const pressure = meshPressureIndex + castleLoadLevel;

  let presenceTier = "idle";
  if (pressure >= 150) presenceTier = "critical";
  else if (pressure >= 100) presenceTier = "high";
  else if (pressure >= 50) presenceTier = "elevated";
  else if (pressure > 0) presenceTier = "soft";

  const intelPayload = {
    kind: "ankrPresence_v31",
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    patternLen,
    cycleIndex
  };

  const classicString = `ANKR_PRESENCE_V31::${presenceTier}::${meshPressureIndex}`;
  const sig = buildDualHashSignature_v31("ANKR_PRESENCE_V31", intelPayload, classicString);

  return {
    presenceVersion: "v31-IMMORTAL-INTEL-WORLD",
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    patternLen,
    presenceSignatureIntel: sig.intel,
    presenceSignatureClassic: sig.classic
  };
}

// ============================================================================
// BINARY + WAVE SURFACES (v31)
// ============================================================================
function buildBinaryField_v31(cycleIndex, presenceField) {
  const density = presenceField.patternLen + presenceField.meshPressureIndex;
  const surface = density + cycleIndex;

  const intelPayload = {
    kind: "ankrBinarySurface_v31",
    density,
    surface,
    cycleIndex
  };

  const sig = buildDualHashSignature_v31(
    "ANKR_BINARY_V31",
    intelPayload,
    `ANKR_BINARY_V31::${surface}`
  );

  return {
    binarySignatureIntel: sig.intel,
    binarySignatureClassic: sig.classic,
    binarySurface: { density, surface, cycleIndex },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveField_v31(cycleIndex, band, presenceField) {
  const amplitude = (cycleIndex + 1) * (band === "binary" ? 14 : 7);
  const wavelength = amplitude + 5;
  const phase = (amplitude + presenceField.meshPressureIndex) % 16;

  const intelPayload = {
    kind: "ankrWaveSurface_v31",
    amplitude,
    wavelength,
    phase,
    band,
    cycleIndex
  };

  const sig = buildDualHashSignature_v31(
    "ANKR_WAVE_V31",
    intelPayload,
    `ANKR_WAVE_V31::${cycleIndex}`
  );

  return {
    waveSignatureIntel: sig.intel,
    waveSignatureClassic: sig.classic,
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
}

// ============================================================================
// ADVANTAGE FIELD (v31)
// ============================================================================
function buildAdvantageField_v31(binaryField, waveField, presenceField) {
  const density = binaryField.binarySurface.density;
  const amplitude = waveField.amplitude;

  const baseScore = density * 0.00001 + amplitude * 0.00001;

  const presenceBoost =
    presenceField.presenceTier === "critical"
      ? 0.02
      : presenceField.presenceTier === "high"
      ? 0.015
      : presenceField.presenceTier === "elevated"
      ? 0.01
      : presenceField.presenceTier === "soft"
      ? 0.005
      : 0;

  const advantageScore = baseScore + presenceBoost;

  let advantageTier = 0;
  if (advantageScore >= 0.05) advantageTier = 3;
  else if (advantageScore >= 0.02) advantageTier = 2;
  else if (advantageScore > 0) advantageTier = 1;

  return {
    advantageVersion: "C-31.0",
    advantageScore,
    advantageTier
  };
}

// ============================================================================
// HINTS FIELD (v31)
// ============================================================================
function buildHintsField_v31(payload) {
  return {
    fallbackBandLevel: 0,
    chunkHints: {},
    cacheHints: {},
    prewarmHints: {},
    coldStartHints: {},
    payloadShape: Object.keys(payload || {})
  };
}

// ============================================================================
// ARTERY SNAPSHOT (v31)
// ============================================================================
function buildAnkrArterySnapshot_v31({
  ok,
  cycleIndex,
  band,
  presenceField,
  advantageField,
  binaryField,
  waveField,
  payload
}) {
  const arterySignature = computeHash_v31(
    [
      "ANKR_ARTERY_V31",
      ok,
      band,
      presenceField.presenceTier,
      cycleIndex,
      advantageField.advantageTier,
      binaryField.binarySurface.surface,
      waveField.amplitude,
      Object.keys(payload || {}).length
    ].join("::")
  );

  return Object.freeze({
    ok,
    cycleIndex,
    band,
    presence: presenceField,
    advantage: advantageField,
    binary: binaryField,
    wave: waveField,
    payloadShape: Object.keys(payload || {}),
    arterySignature
  });
}

// ============================================================================
// LOGGING
// ============================================================================
function logAnkr_v31(stage, details = {}) {
  console.log(
    JSON.stringify({
      organ: "PulseEarnMktAnkr_v31",
      version: PulseEarnMktAnkrMeta_v31.version,
      stage,
      ...details
    })
  );
}

// ============================================================================
// PUBLIC ORGAN — v31
// ============================================================================
export const PulseEarnMktAnkr_v31 = {
  async runJob(kind, payload = {}, context = {}) {
    ankrHealing_v31.lastCycleIndex++;
    const cycleIndex = ankrHealing_v31.lastCycleIndex;

    logAnkr_v31("RUN_JOB_V31", {
      kind,
      payloadShape: Object.keys(payload || {}),
      cycleIndex
    });

    // Determine band (GPU-aware)
    const band =
      payload.gpuRequired || payload.gpuHint ? "binary" : "symbolic";

    const presenceField = buildPresenceField_v31(payload, cycleIndex);
    const binaryField = buildBinaryField_v31(cycleIndex, presenceField);
    const waveField = buildWaveField_v31(cycleIndex, band, presenceField);
    const advantageField = buildAdvantageField_v31(
      binaryField,
      waveField,
      presenceField
    );
    const hintsField = buildHintsField_v31(payload);

    const intelPayload = {
      kind,
      cycleIndex,
      band,
      presenceTier: presenceField.presenceTier,
      advantageTier: advantageField.advantageTier
    };

    const sig = buildDualHashSignature_v31(
      "ANKR_RUNJOB_V31",
      intelPayload,
      `ANKR_RUNJOB_V31::${kind}::${cycleIndex}`
    );

    const artery = buildAnkrArterySnapshot_v31({
      ok: true,
      cycleIndex,
      band,
      presenceField,
      advantageField,
      binaryField,
      waveField,
      payload
    });

    // Update healing
    ankrHealing_v31.lastRunKind = kind;
    ankrHealing_v31.lastPayloadShape = Object.keys(payload || {});
    ankrHealing_v31.lastOk = true;
    ankrHealing_v31.lastError = null;
    ankrHealing_v31.lastBand = band;
    ankrHealing_v31.lastBandSignatureIntel = sig.intel;
    ankrHealing_v31.lastBandSignatureClassic = sig.classic;
    ankrHealing_v31.lastBinaryField = binaryField;
    ankrHealing_v31.lastWaveField = waveField;
    ankrHealing_v31.lastPresenceField = presenceField;
    ankrHealing_v31.lastAdvantageField = advantageField;
    ankrHealing_v31.lastHintsField = hintsField;
    ankrHealing_v31.lastArterySnapshot = artery;
    ankrHealing_v31.lastSignatureIntel = sig.intel;
    ankrHealing_v31.lastSignatureClassic = sig.classic;
    ankrHealing_v31.lastUpdatedAt = PulseRealm.PulseNOW;

    return {
      ok: true,
      kind,
      band,
      cycleIndex,
      presenceField,
      advantageField,
      binaryField,
      waveField,
      hintsField,
      signatureIntel: sig.intel,
      signatureClassic: sig.classic,
      artery
    };
  }
};

// ============================================================================
// HEALING EXPORT
// ============================================================================
export function getPulseEarnMktAnkrHealingState_v31() {
  return { ...ankrHealing_v31 };
}

// ============================================================================
// WINDOW REGISTRATION
// ============================================================================

  PulseRealm.PulseEarnMktAnkr_v31 = {
    PulseEarnMktAnkr_v31,
    PulseEarnMktAnkrMeta_v31,
    ankrHealing_v31
  }
