// ============================================================================
//  PulseCirculatorySystem-v30-IMMORTAL+++ ONEBAND
//  PURE CIRCULATORY ORGAN — Flow • Pressure • Saturation
//  Tri-Env + Adrenal + Telemetry Fusion
//  Unified Advantage • OneBand Surfaces • Surge/Pullback Hints
//  ZERO ROUTING • ZERO WORKERS • ZERO AI • ZERO DRIFT
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { PulseVitalsLogger as logger, PulseVitalsMonitor, pulseLog, PulseUIFlow as initUIFlow, db, setdoc, getdoc, doc, log, warn, error} from "../../../../../_PROOF/PULSE-PROOF.js";



// ============================================================================
// INTERNAL STATE — deterministic cycle counter
// ============================================================================
let circulatoryCycle = 0;

// ============================================================================
// HELPERS — hash, clamp, signatures
// ============================================================================
function clamp01(v) { return Math.max(0, Math.min(1, v)); }

function hash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function cycleSignature(cycle) {
  return hash(`CIRCULATORY_CYCLE::${cycle}`);
}

// ============================================================================
// ONEBAND SURFACES — band + binary + wave
// ============================================================================
function buildBand(flow, pressure) {
  const f = clamp01(flow);
  const p = clamp01(pressure);

  if (p > 0.75 || f > 0.85) return "binary";
  if (p < 0.3 && f < 0.55) return "symbolic";
  return "dual";
}

function buildBandSignature(band) {
  const raw = `CIRC_ONEBAND::${band}::v30`;
  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 1)) % 99991;
  }
  return `circ-oneband-${acc}`;
}

function buildBinaryField(flow, pressure, saturation) {
  const f = clamp01(flow);
  const p = clamp01(pressure);
  const s = clamp01(saturation);

  const patternLen = 10 + Math.round(f * 8 + p * 6);
  const density = patternLen + Math.round((p + s) * 10);
  const surface = density + patternLen;

  return {
    binaryPhenotypeSignature: `circ-one-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `circ-one-binary-surface-${(surface * 11) % 99991}`,
    binarySurface: { patternLen, density, surface },
    parity: surface % 2,
    shiftDepth: Math.floor(Math.log2(surface || 1))
  };
}

function buildWaveField(flow, pressure, band) {
  const f = clamp01(flow);
  const p = clamp01(pressure);

  const amplitude = 6 + Math.round(f * 6 + p * 4);
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

// ============================================================================
// ADVANTAGE FIELD — unified flow/pressure/saturation advantage
// ============================================================================
function buildAdvantageField(flow, pressure, saturation) {
  const f = clamp01(flow);
  const p = clamp01(pressure);
  const s = clamp01(saturation);

  const flowScore = f;
  const pressureScore = 1 - Math.abs(p - 0.5) * 2;
  const saturationScore = s;

  const advantageScore = clamp01(
    flowScore * 0.45 + pressureScore * 0.30 + saturationScore * 0.25
  );

  let flowBand = f >= 0.8 ? "high" : f >= 0.5 ? "medium" : "low";
  let pressureBand =
    p >= 0.75 ? "high" :
    p <= 0.25 ? "low" :
    "normal";

  const shortPulseAdvantage = f > 0.85 && p < 0.65;

  return {
    flowRate: f,
    pressureIndex: p,
    saturation: s,
    flowBand,
    pressureBand,
    advantageScore,
    shortPulseAdvantage,
    advantageSignature: `circ-adv-${Math.round(advantageScore * 1000)}`
  };
}

// ============================================================================
// PRESENCE / HARMONICS — purely derived
// ============================================================================
function buildPresenceField(flow, pressure) {
  const f = clamp01(flow);
  const p = clamp01(pressure);

  const coherenceScore = clamp01(0.6 + f * 0.3 - Math.abs(p - 0.5) * 0.2);
  const harmonicDrift = clamp01(0.4 + (p - 0.5) * 0.4);

  const dualBandMode =
    p > 0.7 || f > 0.8 ? "dual" :
    p < 0.3 && f < 0.6 ? "symbolic" :
    "binary";

  const pulsePrewarm =
    f > 0.7 ? "preferred" :
    f > 0.4 ? "optional" :
    "disabled";

  const pulseCacheMode =
    f > 0.7 ? "circulation-cache-strong" :
    f > 0.4 ? "circulation-cache-normal" :
    "circulation-cache-weak";

  const pulseChunkMode =
    p > 0.7 ? "micro-chunk" :
    f > 0.7 ? "multi-chunk" :
    "single-chunk";

  const pulseRemember =
    coherenceScore > 0.8 ? "remember-strong" :
    coherenceScore > 0.5 ? "remember-normal" :
    "remember-weak";

  return {
    coherenceScore,
    harmonicDrift,
    dualBandMode,
    pulsePrewarm,
    pulseCacheMode,
    pulseChunkMode,
    pulseRemember
  };
}

function buildHarmonicsField(flow, pressure) {
  const f = clamp01(flow);
  const p = clamp01(pressure);

  return {
    flowHarmonic: f,
    pressureHarmonic: p,
    harmonicsSignature: hash(`HARMONICS::${f.toFixed(3)}::${p.toFixed(3)}`)
  };
}

// ============================================================================
// TRI-ENV / ADRENAL / TELEMETRY / PROXY / PAL FUSION
// ============================================================================
function fuseTriEnv(ctx) {
  if (!ctx) return { triEnvStress: 0 };
  return {
    triEnvStress: clamp01(
      Math.max(
        ctx.cortexStress ?? 0,
        ctx.somaticStress ?? 0,
        ctx.sensoryStress ?? 0
      )
    )
  };
}

function fuseAdrenal(ctx) {
  if (!ctx) return { adrenalStress: 0 };
  return { adrenalStress: clamp01(ctx.stressIndex ?? 0) };
}

function fuseTelemetry(ctx) {
  if (!ctx) return { telemetryPressure: 0 };
  return { telemetryPressure: clamp01(ctx.pressureIndex ?? 0) };
}

function fuseProxy(ctx) {
  if (!ctx) return { proxyModeStress: 0 };
  return { proxyModeStress: clamp01(ctx.stressIndex ?? 0) };
}

function fusePulsePal(ctx) {
  if (!ctx) return { pulsePalStress: 0 };
  return { pulsePalStress: clamp01(ctx.stressIndex ?? 0) };
}

// ============================================================================
// CAPACITY / SATURATION
// ============================================================================
function buildCapacity(user) {
  const base = Math.max(1, user.instances ?? 1);
  const max = Math.max(base, user.maxInstances ?? base);

  const saturation = clamp01(base / max);
  const capacityScore = saturation;

  return {
    baseInstances: base,
    maxInstances: max,
    saturation,
    capacityScore,
    capacitySignature: hash(`CAPACITY::${base}::${max}::${capacityScore}`)
  };
}

// ============================================================================
// FLOW + PRESSURE FUSION
// ============================================================================
function buildFlowPressure(cap, tri, adr, tel, prox, pal) {
  const c = cap.capacityScore;
  const s = cap.saturation;

  const triS = tri.triEnvStress;
  const adrS = adr.adrenalStress;
  const telP = tel.telemetryPressure;
  const proxS = prox.proxyModeStress;
  const palS = pal.pulsePalStress;

  const flowRate = clamp01(
    c * 0.5 + (1 - s) * 0.2 + triS * 0.15 + adrS * 0.15
  );

  const pressureIndex = clamp01(
    telP * 0.4 + adrS * 0.25 + triS * 0.15 + proxS * 0.1 + palS * 0.1
  );

  return { flowRate, pressureIndex };
}

// ============================================================================
// MAIN API — compute ONEBAND circulatory state
// ============================================================================
export function computeCirculatoryState(userSnapshot, contexts = {}) {
  circulatoryCycle++;

  const tri = fuseTriEnv(contexts.triEnvStressContext);
  const adr = fuseAdrenal(contexts.adrenalStressContext);
  const tel = fuseTelemetry(contexts.telemetryPressureContext);
  const prox = fuseProxy(contexts.proxyModeStressContext);
  const pal = fusePulsePal(contexts.pulsePalStressContext);

  const cap = buildCapacity(userSnapshot);
  const { flowRate, pressureIndex } = buildFlowPressure(cap, tri, adr, tel, prox, pal);

  const band = buildBand(flowRate, pressureIndex);
  const bandSignature = buildBandSignature(band);
  const binaryField = buildBinaryField(flowRate, pressureIndex, cap.saturation);
  const waveField = buildWaveField(flowRate, pressureIndex, band);
  const advantageField = buildAdvantageField(flowRate, pressureIndex, cap.saturation);
  const presenceField = buildPresenceField(flowRate, pressureIndex);
  const harmonicsField = buildHarmonicsField(flowRate, pressureIndex);
  const cycleSig = cycleSignature(circulatoryCycle);

  const healingState = {
    stable: pressureIndex < 0.8,
    overloadRisk: pressureIndex >= 0.8,
    underutilized: flowRate < 0.3 && cap.saturation < 0.5,
    notesSignature: hash(`HEALING::${flowRate}::${pressureIndex}::${cap.saturation}`)
  };

  return {
    flowField: {
      flowRate,
      baseInstances: cap.baseInstances,
      maxInstances: cap.maxInstances
    },

    pressureField: {
      pressureIndex,
      telemetryPressure: tel.telemetryPressure,
      adrenalStress: adr.adrenalStress,
      triEnvStress: tri.triEnvStress
    },

    saturationField: {
      saturation: cap.saturation,
      capacityScore: cap.capacityScore
    },

    advantageField,
    band,
    bandSignature,
    binaryField,
    waveField,
    presenceField,
    harmonicsField,
    circulatoryCycleSignature: cycleSig,
    healingState,

    diagnostics: {
      cycle: circulatoryCycle,
      tri,
      adr,
      tel,
      prox,
      pal,
      cap,
      flowRate,
      pressureIndex
    },

    meta: {
      layer: "PulseCirculatorySystem",
      version: "v30-IMMORTAL+++",
      identity: "PulseCirculatorySystem-v30-IMMORTAL+++"
    }
  };
}

// ============================================================================
// EXPORT
// ============================================================================
export const PulseCirculatorySystem = {
  compute: computeCirculatoryState,
  meta: {
    layer: "PulseCirculatorySystem",
    version: "v30-IMMORTAL+++"
  }
};

PulseRealm.CirculatorySystem = {
  PulseCirculatorySystem,
  computeCirculatoryState
}