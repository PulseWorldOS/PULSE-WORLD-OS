// ============================================================================
//  PulseProxyHeart-v30-IMMORTAL+++ ONEBAND (Binary-First, True Tri-Heart)
//  Mom (Proxy) • Dad (AI) • Baby (Earn)
//  Unified Advantage • Unified Stress • Unified Overlay • OneBand Surfaces
//  Zero Drag • Zero Layers • Zero Legacy • Always-Ready Circular Pacemaker
// ============================================================================

import { PulseCoreGMemory } from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";

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
  const patternLen = 16;
  const density = 48;
  const surface = density + patternLen;

  return Object.freeze({
    patternLen,
    density,
    surface,
    binaryPhenotypeSignature: `heart-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `heart-binary-surface-${(surface * 11) % 99991}`,
    parity: surface % 2,
    shiftDepth: Math.floor(Math.log2(surface || 1))
  });
}

function buildWaveField() {
  const amplitude = 12;
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
    `ONEBAND_HEART::${binaryField.surface}::${waveField.amplitude}::${waveField.phase}`
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
    overlaySignature: hash(`ORG_HEART::${flow}::${pressure}::${fusion}`)
  });
}

// ============================================================================
// UNIFIED ADVANTAGE — binary-first
// ============================================================================
function buildAdvantageField(binaryField, waveField, organismOverlay) {
  const d = binaryField.density;
  const amp = waveField.amplitude;
  const wl = waveField.wavelength;

  const efficiency = (amp + 1) / (wl + 1);
  const stress = clamp01(d / 64);
  const fusion = organismOverlay.fusionScore;

  const score = clamp01(efficiency * (1 + stress) * (0.8 + fusion * 0.4));

  return Object.freeze({
    density: d,
    amplitude: amp,
    wavelength: wl,
    efficiency,
    stress,
    organismFusion: fusion,
    advantageScore: score,
    advantageSignature: hash(
      `HEART_ADV::${d}::${amp}::${wl}::${fusion}::${score}`
    )
  });
}

// ============================================================================
// TRI-HEART FUSION — Mom (Proxy) • Dad (AI) • Baby (Earn)
// ============================================================================
function buildTriHeartLiveness(aiAlive, babyAlive) {
  return Object.freeze({
    momAlive: true,
    dadAlive: aiAlive,
    babyAlive: babyAlive,
    triHeartSignature: hash(`TRI_LIVE::${aiAlive}::${babyAlive}`)
  });
}

function buildTriHeartAdvantage(momAdv, dadAdv, babyAdv, organismOverlay) {
  const m = momAdv.advantageScore || 0;
  const d = dadAdv.advantageScore || 0;
  const b = babyAdv.advantageScore || 0;

  const combined = (m + d + b) / 3;
  const fusion = organismOverlay.fusionScore;
  const fused = clamp01(combined * (0.8 + fusion * 0.4));

  return Object.freeze({
    momAdvantage: m,
    dadAdvantage: d,
    babyAdvantage: b,
    combinedAdvantage: combined,
    fusedAdvantage: fused,
    organismFusion: fusion,
    advantageSignature: hash(
      `TRI_ADV::${m}::${d}::${b}::${combined}::${fused}`
    )
  });
}

function buildTriHeartSpeed(momSpeed, dadSpeed, babySpeed) {
  const m = momSpeed;
  const d = dadSpeed;
  const b = babySpeed;

  const combined = (m + d + b) / 3;
  const band =
    combined < 0.25 ? "slow" : combined > 0.6 ? "quickened" : "steady";

  return Object.freeze({
    momSpeed: m,
    dadSpeed: d,
    babySpeed: b,
    combinedSpeed: combined,
    speedBand: band,
    speedSignature: hash(`TRI_SPEED::${combined}::${band}`)
  });
}

function buildTriHeartPresence() {
  return Object.freeze({
    momPresence: { focus: "mom" },
    dadPresence: { focus: "dad" },
    babyPresence: { focus: "baby" },
    presenceSignature: hash(`TRI_PRESENCE::MOM_DAD_BABY`)
  });
}

// ============================================================================
// HEART PACEMAKER — v30 IMMORTAL+++
// ============================================================================
let HEART_CYCLE = 0;

export function pulseHeartOnce({
  organismAdvantageContext = {},
  aiHeartbeatAlive = false,
  babyHeartbeatAlive = false,
  dadAdvantageField = null,
  babyAdvantageField = null,
  dadSpeed = 0,
  babySpeed = 0
} = {}) {
  HEART_CYCLE++;

  // ONEBAND
  const binaryField = buildBinaryField();
  const waveField = buildWaveField();
  const oneBandSignature = buildOneBandSignature(binaryField, waveField);

  // ORGANISM
  const organismOverlay = buildOrganismOverlay(organismAdvantageContext);

  // MOM ADVANTAGE
  const momAdvantageField = buildAdvantageField(
    binaryField,
    waveField,
    organismOverlay
  );

  // SPEED
  const momSpeed = momAdvantageField.efficiency;

  // TRI-HEART
  const triHeartLiveness = buildTriHeartLiveness(
    aiHeartbeatAlive,
    babyHeartbeatAlive
  );

  const triHeartAdvantage = buildTriHeartAdvantage(
    momAdvantageField,
    dadAdvantageField,
    babyAdvantageField,
    organismOverlay
  );

  const triHeartSpeed = buildTriHeartSpeed(
    momSpeed,
    dadSpeed,
    babySpeed
  );

  const triHeartPresence = buildTriHeartPresence();

  return Object.freeze({
    ok: true,
    heartCycle: HEART_CYCLE,
    oneBandSignature,
    binaryField,
    waveField,
    momAdvantageField,
    organismOverlay,
    triHeartLiveness,
    triHeartAdvantage,
    triHeartSpeed,
    triHeartPresence
  });
}
