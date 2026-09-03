// ============================================================================
//  PulseProxySynapse-v30-IMMORTAL+++ ONEBAND
//  Pure Neural Signal Organ • Binary-First • Zero-Drag
//  No symbolic band. No wrappers. No diagnostics. No storage.
//  Emits a unified OneBand pulse for every signal.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



const hash = s => {
  let h = 0;
  const str = String(s || "");
  for (let i = 0; i < str.length; i++)
    h = (h + str.charCodeAt(i) * (i + 1)) % 100000;
  return `h${h}`;
};

// ============================================================================
// BINARY SIGNAL PROCESSING — the REAL synapse
// ============================================================================
function normalizeSignal(raw, { min = 0, max = 1, clamp = true } = {}) {
  if (raw == null || Number.isNaN(raw)) return 0;
  const v = Number(raw);
  const span = max - min || 1;
  let score = (v - min) / span;
  if (clamp) score = Math.max(0, Math.min(1, score));
  return score;
}

function computeSlope(prev, next, epsilon = 1e-6) {
  if (prev == null || next == null) return 0;
  const delta = Number(next) - Number(prev);
  return Math.abs(delta) < epsilon ? 0 : delta;
}

function classifyHealth(score, slope) {
  if (score >= 0.8 && slope >= 0) return "healthy";
  if (score >= 0.5 && slope >= -0.1) return "stable";
  if (score >= 0.3 && slope >= -0.3) return "degrading";
  if (score < 0.3 && slope < -0.1) return "critical";
  return "unknown";
}

// ============================================================================
// ONEBAND SURFACES — binary-first
// ============================================================================
function buildBinaryField(score, raw, prev) {
  return Object.freeze({
    score,
    raw,
    previous: prev,
    binarySignature: hash(`SYNAPSE_BINARY::${score}::${raw}::${prev}`)
  });
}

function buildWaveField(score, slope) {
  const amplitude = 8 + Math.floor(score * 8);
  const wavelength = amplitude + 4;
  const phase = amplitude % 16;

  return Object.freeze({
    amplitude,
    wavelength,
    phase,
    band: "binary",
    mode: "binary-wave"
  });
}

function buildOneBandSignature(binaryField, waveField) {
  return hash(
    `ONEBAND_SYNAPSE::${binaryField.score}::${waveField.amplitude}::${waveField.phase}`
  );
}

function buildPresenceField(health) {
  return Object.freeze({
    health,
    presenceSignature: hash(`SYNAPSE_PRESENCE::${health}`)
  });
}

function buildSpeedField(score) {
  const speedScore = score;
  const speedBand =
    speedScore < 0.25 ? "slow" :
    speedScore < 0.6  ? "steady" :
                        "quickened";

  return Object.freeze({
    speedScore,
    speedBand,
    speedSignature: hash(`SYNAPSE_SPEED::${speedScore}`)
  });
}

function buildAdvantageField(score, slope) {
  const stability = 1 - Math.min(1, Math.abs(slope));
  const advantageScore = Math.min(1, (score * 0.7) + (stability * 0.3));

  return Object.freeze({
    advantageScore,
    advantageSignature: hash(`SYNAPSE_ADV::${advantageScore}`)
  });
}

// ============================================================================
// PURE SYNAPSE PULSE — the neural hop
// ============================================================================
export function pulseSynapse({ rawSignal, previousSignal, meta = {} } = {}) {
  const score = normalizeSignal(rawSignal, meta.normalize || {});
  const slope = computeSlope(previousSignal, rawSignal, meta.epsilon || 1e-6);
  const health = classifyHealth(score, slope);

  const binaryField = buildBinaryField(score, rawSignal, previousSignal);
  const waveField = buildWaveField(score, slope);
  const oneBandSignature = buildOneBandSignature(binaryField, waveField);
  const presenceField = buildPresenceField(health);
  const speedField = buildSpeedField(score);
  const advantageField = buildAdvantageField(score, slope);

  return Object.freeze({
    ok: true,
    rawSignal,
    previousSignal,
    score,
    slope,
    health,
    oneBandSignature,
    binaryField,
    waveField,
    presenceField,
    speedField,
    advantageField,
    signature: hash(
      `SYNAPSE_V30::${oneBandSignature}::${presenceField.presenceSignature}`
    )
  });
}
