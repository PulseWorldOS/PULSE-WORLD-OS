// ============================================================================
//  PulseProxyImpulse-v30.js  (UPGRADED INTERNALLY TO v40)
//  BACKWARDS-COMPATIBLE EXPORT SURFACE
//  import { PulseProxyImpulse, PulseProxyImpulseStrategy, createImpulse }
//    from "./PulseProxyImpulse-v30.js";
//  → NOW RUNS FULL v40 UNIFIED IMPULSE ENGINE + STRATEGY
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ---------------------------------------------------------------------------
// PURE HELPERS
// ---------------------------------------------------------------------------
const clamp01 = v => Math.max(0, Math.min(1, v));
const hash = s => {
  let h = 0;
  const str = String(s || "");
  for (let i = 0; i < str.length; i++)
    h = (h + str.charCodeAt(i) * (i + 1)) % 100000;
  return `h${h}`;
};

// ---------------------------------------------------------------------------
// INTERNAL v40 ENGINE (hidden behind v30 exports)
// ---------------------------------------------------------------------------
function createUnifiedImpulseEngine_v40({
  Governor = PulseRealm.PulseGovernor,
  MemoryManager = PulseRealm.PulseMemoryManager,
  UserScoresStore = PulseRealm.UserScoresStoreInstance,
  Adapters = PulseRealm.PulseAdapters,
  GPU = PulseRealm.CoreGPUOrchestratorInstance,
  log    = console.log,
  warn   = console.warn
} = {}) {

  if (!Governor || !MemoryManager || !Adapters)
    throw new Error("[UnifiedImpulseEngine-v40] Missing core organs");

  let IMPULSE_CYCLE = 0;

  // -------------------------------------------------------
  // INTERNAL FIELD BUILDERS
  // -------------------------------------------------------
  const buildBinaryField = (hops, pressure) => {
    const patternLen = 12 + hops;
    const density = patternLen + 24 + Math.floor(pressure * 8);
    const surface = density + patternLen;

    return Object.freeze({
      patternLen,
      density,
      surface,
      parity: surface % 2,
      shiftDepth: Math.floor(Math.log2(surface || 1)),
      binaryPhenotypeSignature: `impulse-binary-pheno-${surface % 99991}`,
      binarySurfaceSignature: `impulse-binary-surface-${(surface * 11) % 99991}`
    });
  };

  const buildWaveField = (intent, wave, device) => {
    const plen = String(intent).length || 1;
    const amplitude = 10 + (plen % 8);
    const wavelength = amplitude + 4;
    const phase = amplitude % 16;

    return Object.freeze({
      amplitude,
      wavelength,
      phase,
      wave,
      device,
      band: "binary",
      mode: "binary-wave"
    });
  };

  const buildOrganismOverlay = ctx => {
    const flow = clamp01(ctx.flowRate || 0);
    const pressure = clamp01(ctx.pressureIndex || 0);
    const trust = clamp01(ctx.trustScore || 0);
    const mesh = clamp01(ctx.meshScore || 0);

    const load = Math.max(pressure, ctx.adrenalStress || 0, ctx.triEnvStress || 0);
    const fusion = clamp01(flow * 0.4 + (1 - load) * 0.4 + (trust + mesh) * 0.1);

    return Object.freeze({
      flow,
      pressure,
      trust,
      mesh,
      organismLoad: load,
      fusionScore: fusion,
      overlaySignature: hash(`ORG_IMPULSE::${flow}::${pressure}::${fusion}`)
    });
  };

  const buildAdvantageField = ({ energy, hops, organismOverlay }) => {
    const e = clamp01(energy);
    const h = Math.max(0, hops);
    const fusion = organismOverlay.fusionScore;
    const trust = organismOverlay.trust;
    const mesh = organismOverlay.mesh;

    const efficiency = e / (1 + h);
    const advantageScore = clamp01(
      efficiency * (0.6 + fusion * 0.3 + (trust + mesh) * 0.1)
    );

    return Object.freeze({
      energy: e,
      hops: h,
      efficiency,
      trust,
      mesh,
      organismFusion: fusion,
      advantageScore,
      advantageSignature: hash(
        `IMPULSE_ADV::${e}::${h}::${fusion}::${trust}::${mesh}::${advantageScore}`
      )
    });
  };

  const buildSpeedField = ({ hops, urgency, factor }) => {
    const hopPenalty = 1 / (1 + hops);
    const speedScore = clamp01(
      urgency * 0.6 + hopPenalty * 0.3 + (1 / factor) * 0.1
    );

    const band =
      speedScore < 0.25 ? "slow" :
      speedScore < 0.6  ? "steady" :
                          "quickened";

    return Object.freeze({
      hops,
      urgency,
      factor,
      speedScore,
      speedBand: band,
      speedSignature: hash(`IMPULSE_SPEED::${hops}::${urgency}::${factor}`)
    });
  };

  const buildPresenceField = (intent, page, wave, device) => {
    const focus =
      String(intent).includes("focus") || String(page).includes("focus")
        ? "focused"
        : "neutral";

    return Object.freeze({
      intent,
      page,
      wave,
      device,
      focus,
      presenceSignature: hash(
        `IMPULSE_PRESENCE::${intent}::${page}::${wave}::${device}::${focus}`
      )
    });
  };

  // -------------------------------------------------------
  // CREATE IMPULSE
  // -------------------------------------------------------
  function createImpulse(intent, { page = "UNKNOWN_PAGE", energy = 1 } = {}) {
    IMPULSE_CYCLE++;

    const wave = Governor?.waveContextHint?.primaryWave || "unknown";
    const device = Governor?.deviceContext?.platform || "unknown";
    const pressureIndex = MemoryManager?.pressure?.() || 0;

    const selfScore = UserScoresStore?.getUserScore?.("self") || {};
    const trustScore = selfScore.trustScore || 0;
    const meshScore = selfScore.meshScore || 0;

    const hops = 0;
    const urgency = 0;
    const factor = 1;

    const binaryField = buildBinaryField(hops, pressureIndex);
    const waveField = buildWaveField(intent, wave, device);

    const organismOverlay = buildOrganismOverlay({
      pressureIndex,
      trustScore,
      meshScore
    });

    const advantageField = buildAdvantageField({ energy, hops, organismOverlay });
    const speedField = buildSpeedField({ hops, urgency, factor });
    const presenceField = buildPresenceField(intent, page, wave, device);

    return Object.freeze({
      ok: true,
      impulseCycle: IMPULSE_CYCLE,
      intent,
      page,
      hops,
      urgency,
      factor,
      energy,
      binaryField,
      waveField,
      organismOverlay,
      advantageField,
      speedField,
      presenceField
    });
  }

  // -------------------------------------------------------
  // STRATEGY
  // -------------------------------------------------------
  function routeImpulse(impulse) {
    const pressure = impulse.organismOverlay.pressure;
    const wave = impulse.waveField.wave;
    const gpuAvailable = !!GPU;

    let target = null;

    if (pressure > 0.8) {
      target = Adapters.proxy;
    } else if (gpuAvailable && impulse.intent === "compute") {
      target = Adapters.mesh;
    } else if (wave === "wifi") {
      target = Adapters.send;
    } else {
      target = Adapters.router;
    }

    return Object.freeze({
      impulse,
      target,
      routeSignature: hash(`ROUTE::${impulse.intent}::${target?.kind || "none"}`)
    });
  }

  return Object.freeze({
    createImpulse,
    routeImpulse
  });
}

// ============================================================================
//  LEGACY EXPORT SURFACE (v30 API, v40 ENGINE)
// ============================================================================

let __engine = null;
const ensureEngine = () => (__engine ??= createUnifiedImpulseEngine_v40({}));

// v30 legacy API
export function PulseProxyImpulse(intent, options = {}) {
  return ensureEngine().createImpulse(intent, options);
}

export function PulseProxyImpulseStrategy(impulse) {
  return ensureEngine().routeImpulse(impulse);
}

// NEW: direct createImpulse export for modern callers
export function createImpulse(intent, options = {}) {
  return ensureEngine().createImpulse(intent, options);
}

// OPTIONAL: export full engine for advanced callers
export const PulseProxyImpulseEngine = {
  ensureEngine,
  createUnifiedImpulseEngine_v40
};

// GLOBAL ATTACHMENT
PulseRealm.PulseProxyImpulse_v40 = {
  PulseProxyImpulse,
  PulseProxyImpulseStrategy,
  createImpulse,
  PulseProxyImpulseEngine
};
