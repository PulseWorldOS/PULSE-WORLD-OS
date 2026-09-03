// ============================================================================
//  PulseSpeedEngine-v30-IMMORTAL+++ ONEBAND
//  Pure Speed • Zero Drag • Intelligent Self-Preservation
//  Binary-First • Unified Advantage • Unified Overlay • Unified Speed
// ============================================================================

// ============================================================================
// HELPERS — deterministic, pure
// ============================================================================
const clamp01 = v => Math.max(0, Math.min(1, v));
const hash = s => {
  let h = 0;
  const str = String(s || "");
  for (let i = 0; i < str.length; i++)
    h = (h + str.charCodeAt(i) * (i + 1)) % 100000;
  return `h${h}`;
};

// ============================================================================
// ONEBAND SURFACES — binary-first
// ============================================================================
function buildBinaryField() {
  const patternLen = 12;
  const density = 36;
  const surface = density + patternLen;

  return Object.freeze({
    patternLen,
    density,
    surface,
    binaryPhenotypeSignature: `speed-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `speed-binary-surface-${(surface * 11) % 99991}`,
    parity: surface % 2,
    shiftDepth: Math.floor(Math.log2(surface || 1))
  });
}

function buildWaveField() {
  const amplitude = 14;
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
    `ONEBAND_SPEED::${binaryField.surface}::${waveField.amplitude}::${waveField.phase}`
  );
}

// ============================================================================
// UNIFIED ORGANISM OVERLAY — v30 IMMORTAL+++
// ============================================================================
function buildOrganismOverlay(ctx = {}) {
  const flow = clamp01(ctx.flowRate || 0);
  const pressure = clamp01(ctx.pressureIndex || 0);
  const adrenal = clamp01(ctx.adrenalStress || 0);
  const tri = clamp01(ctx.triEnvStress || 0);
  const proxy = clamp01(ctx.proxyPressure || 0);

  const load = Math.max(pressure, adrenal, tri, proxy);
  const fusion = clamp01(flow * 0.5 + (1 - load) * 0.5);

  return Object.freeze({
    flow,
    pressure,
    adrenal,
    tri,
    proxy,
    organismLoad: load,
    organismFlow: flow,
    fusionScore: fusion,
    overlaySignature: hash(`ORG_SPEED::${flow}::${pressure}::${fusion}`)
  });
}

// ============================================================================
// UNIFIED SPEED — pure velocity with organismic safety
// ============================================================================
function buildSpeedField({ impulseSpeed, organismOverlay }) {
  const base = clamp01(impulseSpeed || 0);
  const fusion = organismOverlay.fusionScore;

  // Pure speed amplified by organism health
  const rawVelocity = base * (1 + fusion * 2);

  return Object.freeze({
    rawVelocity,
    fusion,
    speedSignature: hash(`SPEED_VELOCITY::${rawVelocity}::${fusion}`)
  });
}

// ============================================================================
// ORGANISM SAFE MAX VELOCITY — intelligent self-preservation
// ============================================================================
function computeSafeMaxVelocity(organismOverlay) {
  // The healthier the organism, the higher the safe max
  const health = 1 - organismOverlay.organismLoad;
  const flow = organismOverlay.organismFlow;

  // Safe max velocity = health × flow × constant
  const safeMax = Math.max(0.1, health * flow * 3);

  return clamp01(safeMax);
}

// ============================================================================
// FINAL SPEED POLICY — pure speed, self-preserving
// ============================================================================
export function computeSpeed({
  impulseSpeed = 0,
  organismAdvantageContext = {}
} = {}) {
  const organismOverlay = buildOrganismOverlay(organismAdvantageContext);

  const binaryField = buildBinaryField();
  const waveField = buildWaveField();
  const oneBandSignature = buildOneBandSignature(binaryField, waveField);

  const speedField = buildSpeedField({
    impulseSpeed,
    organismOverlay
  });

  const safeMax = computeSafeMaxVelocity(organismOverlay);

  // Final velocity = min(rawVelocity, safeMax)
  const finalVelocity = Math.min(speedField.rawVelocity, safeMax);

  return Object.freeze({
    ok: true,
    oneBandSignature,
    binaryField,
    waveField,
    organismOverlay,
    speedField,
    safeMaxVelocity: safeMax,
    finalVelocity,
    speedBand:
      finalVelocity < 0.25 ? "slow" :
      finalVelocity < 0.6  ? "steady" :
      finalVelocity < 0.9  ? "fast" :
                             "max",
    signature: hash(
      `SPEED_POLICY_V30::${finalVelocity}::${safeMax}::${speedField.rawVelocity}`
    )
  });
}
