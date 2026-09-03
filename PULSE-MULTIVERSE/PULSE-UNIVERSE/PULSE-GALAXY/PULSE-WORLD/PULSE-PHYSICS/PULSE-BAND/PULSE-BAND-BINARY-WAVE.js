// ============================================================================
// FILE: PulseBinaryWave-v41-IMMORTAL-PULSEBAND-FUSION.js
// Pulse OS v41-IMMORTAL — Binary Wave • OneBand • CheckBand • Device-Wave Fusion
// PURE BINARY • ANY WAVE • PULSEBAND-ONLY • ROUTE/PAGE/KEY/CAPABILITY/DEVICE-AWARE
// v41: WaveContext + PulseBandContext + RouteMemory + SignalKey + WorldHints
//      + IMMORTAL CAPABILITY SUBSTRATE (GPU/CPU/BANDWIDTH/STABILITY)
//      + PulseBandOne + CheckBand + PulseSignals fusion
//      Satellite/Cellular/WiFi/BLE/Mesh/Wired-agnostic, no IO, no randomness.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import { PulseBandOneMeta, getPulseBandOneHealingState} from "./PULSE-BAND.js";
import { getCheckBandStateSnapshot, projectWorldBandForUser} from "./PULSE-BAND-CHECK.js";

import { createPulseV3 as createPulseV2Shifter } from "../PULSE-SHIFTER/PulseShifterEvolutionaryPulse-v31.js";
import { createPulseV3 as createPulseBinaryShifterEvolutionaryPulse } from "../PULSE-SHIFTER/PulseShifterBinaryEvolutionaryPulse-v31.js";
import { createLegacyPulse as createPulseV1Legacy } from "../PULSE-SEND/PULSES/PulseSendLegacyPulse-v31.js";
import { PulseEarnContinuancePulse as createPulseV3Continuance } from "../PULSE-EARN/PULSES/PulseEarnContinuancePulse-v31.js";
import { createPulseV2 as createPulseV2Earn } from "../PULSE-SEND/PULSES/PulseSendV2EvolutionEngine-v31.js";
import { createPulseV3_v31 as createPulseV3 } from "../PULSE-SEND/PULSES/PulseSendV3UnifiedOrganism-v31.js";


// ============================================================================
// LOGGER / SIGNALS — device-safe, never null
// ============================================================================

// Universal self resolver
const SELF =
  typeof self !== "undefined" ? self :
  typeof window !== "undefined" ? window :
  globalThis;

// PulseLogger
const PulseLogger =
  (SELF && PulseRealm.PulseLogger) ||
  {
    log: (...args) => console.log("[PULSE]", ...args),
    error: (...args) => console.error("[PULSE]", ...args),
    nervous: (...args) => console.log("[PULSE:NERV]", ...args),
    binaryWave: (...args) => console.log("[PULSE:BINARYWAVE]", ...args)
  };

// PulseSignals
const PulseSignals =
  (SELF && PulseRealm.PulseSignals) || null;


function binaryWaveLog(stage, payload = {}) {
  try {
    const packet = {
      stage,
      ts: PulseRealm.PulseNOW,
      layer: "PulseBinaryWave",
      version: "v41-IMMORTAL-FUSION",
      ...payload
    };
    PulseLogger.binaryWave(packet);
    if (PulseSignals && typeof PulseSignals.emit === "function") {
      PulseSignals.emit("binarywave.event", packet);
    }
  } catch {
    // never throw
  }
}

// ============================================================================
// IMMORTAL CAPABILITY SUBSTRATE (v41 upgrade)
// Reads global capability profile and injects into BinaryWave
// ============================================================================

function getImmortalCapabilityProfile() {
  const device =
    PulseRealm.PULSE_DEVICE_PROFILE ||
    PulseRealm.PULSE_DEVICE_CAPABILITY ||
    null;

  // Fallback #1 — inferred strong profile (your system)
  if (!device) {
    const gpuScore = 7200;
    const cpuScore = 3600;
    const memScore = 4800;
    const bandwidth = 500;
    const stability = 0.97;
    const capabilityScore =
      gpuScore * 0.5 +
      cpuScore * 0.2 +
      memScore * 0.2 +
      bandwidth * 0.05 +
      stability * 0.05;

    return {
      gpuTier: "elite",
      gpuScore,
      gpuRam: 24,
      bandwidthMbps: bandwidth,
      stabilityScore: stability,
      capabilityScore,
      capabilityTier: "elite",
      userAgent: (PulseRealm.navigator && PulseRealm.navigator.userAgent) || null,
      platform: (PulseRealm.navigator && PulseRealm.navigator.platform) || null
    };
  }

  // Fallback #2 — legacy safe profile if tier missing
  if (!device.capabilityTier) {
    return {
      gpuTier: device.gpuTier || "high",
      gpuScore: device.gpuScore || 6000,
      gpuRam: device.gpuRam || 24,
      bandwidthMbps: device.bandwidthMbps || 500,
      stabilityScore: device.stabilityScore || 0.9,
      capabilityScore: device.capabilityScore || 6000,
      capabilityTier: device.capabilityTier || "high",
      userAgent: device.userAgent || (PulseRealm.navigator && PulseRealm.navigator.userAgent) || null,
      platform: device.platform || (PulseRealm.navigator && PulseRealm.navigator.platform) || null
    };
  }

  return {
    ...device,
    userAgent: device.userAgent || (PulseRealm.navigator && PulseRealm.navigator.userAgent) || null,
    platform: device.platform || (PulseRealm.navigator && PulseRealm.navigator.platform) || null
  };
}

// Global IMMORTAL capability context
const IMMORTAL_CAPABILITY = getImmortalCapabilityProfile();

// ============================================================================
// CORE MEMORY — DELTA MEMORY / LAST ROUTE / LAST WAVE
// ============================================================================

const CoreMemory = PulseRealm.PulseCoreMemory;
const ROUTE = "binarywave-v41";

const KEY_LAST_PACKET = "last-binarywave-packet";
const KEY_LAST_ROUTE = "last-route-context";
const KEY_LAST_WAVE = "last-wave-context";
const KEY_LAST_SIGNAL_KEY = "last-pulse-signal-key";
const KEY_LAST_DEVICE_ENV = "last-device-environment";
const KEY_LAST_CHECKBAND = "last-checkband-snapshot";

// ============================================================================
// HASH / INTELLHASH HELPERS (deterministic, bounded)
// ============================================================================

function computeHash(str) {
  let h = 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeAltHash(str) {
  let h = 1;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i) * (i + 7)) % 1000003;
  }
  return `a${h}`;
}

function computeThirdHash(str) {
  let h = 7;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h * 131 + s.charCodeAt(i) * (i + 13)) % 1000033;
  }
  return `t${h}`;
}

function computeTriHash(str) {
  const primary = computeHash(str);
  const secondary = computeAltHash(str);
  const tertiary = computeThirdHash(str);
  const combined = computeHash(primary + "::" + secondary + "::" + tertiary);
  return { primary, secondary, tertiary, combined };
}

function computeIntellHash(payload, advantageHint = null) {
  const json = JSON.stringify(payload ?? {});
  const base = computeTriHash(json);
  const size = json.length;
  const advantage = advantageHint ?? null;
  return {
    intellHash: base.combined,
    size,
    advantage
  };
}

// ============================================================================
// DEVICE / SURFACE ENVIRONMENT SNAPSHOT — STRUCTURED-CLONE SAFE
// (browser-only, optional; used for wave inference + diagnostics)
// ============================================================================

function buildSurfaceEnvironment() {
  try {
    const nav = PulseRealm.navigator || {};
    const scr = PulseRealm.screen || {};

    const device = {
      hardwareConcurrency:
        typeof nav.hardwareConcurrency === "number"
          ? nav.hardwareConcurrency
          : null,
      maxTouchPoints:
        typeof nav.maxTouchPoints === "number" ? nav.maxTouchPoints : null
    };

    const screen = {
      width: typeof scr.width === "number" ? scr.width : null,
      height: typeof scr.height === "number" ? scr.height : null,
      availWidth: typeof scr.availWidth === "number" ? scr.availWidth : null,
      availHeight: typeof scr.availHeight === "number" ? scr.availHeight : null,
      colorDepth: typeof scr.colorDepth === "number" ? scr.colorDepth : null,
      pixelRatio:
        typeof PulseRealm.devicePixelRatio === "number"
          ? PulseRealm.devicePixelRatio
          : null
    };

    const input = {
      touchCapable:
        typeof nav.maxTouchPoints === "number" && nav.maxTouchPoints > 0
          ? true
          : false
    };

    let prefersReducedMotion = null;
    let prefersDarkMode = null;

    // Universal SELF resolver
    const SELF =
      typeof self !== "undefined" ? self :
      typeof window !== "undefined" ? window :
      globalThis;

    // Only run matchMedia if it exists
    if (typeof SELF.matchMedia === "function") {
      try {
        prefersReducedMotion = SELF
          .matchMedia("(prefers-reduced-motion: reduce)")
          .matches;
      } catch {
        prefersReducedMotion = null;
      }

      try {
        prefersDarkMode = SELF
          .matchMedia("(prefers-color-scheme: dark)")
          .matches;
      } catch {
        prefersDarkMode = null;
      }
    }


    const preferences = {
      prefersReducedMotion,
      prefersDarkMode
    };

    const location = {
      href: PulseRealm.location && PulseRealm.location.href || null,
      pathname: PulseRealm.location && PulseRealm.location.pathname || null,
      search: PulseRealm.location && PulseRealm.location.search || null
    };

    const referrer = PulseRealm.document && PulseRealm.document.referrer || null;
    const origin = PulseRealm.location && PulseRealm.location.origin || null;

    const network = {
      online: typeof nav.onLine === "boolean" ? nav.onLine : null,
      effectiveType:
        PulseRealm.navigator &&
        PulseRealm.navigator.connection &&
        PulseRealm.navigator.connection.effectiveType
          ? PulseRealm.navigator.connection.effectiveType
          : null
    };

    const visibility =
      PulseRealm.document && typeof PulseRealm.document.visibilityState === "string"
        ? PulseRealm.document.visibilityState
        : null;

    const perf = PulseRealm.performance || null;
    const performanceSnapshot = perf
      ? {
          timeOrigin:
            typeof perf.timeOrigin === "number" ? perf.timeOrigin : null,
          now:
            typeof perf.now === "function"
              ? (() => {
                  try {
                    return perf.now();
                  } catch {
                    return null;
                  }
                })()
              : null
        }
      : null;

    const memorySnapshot =
      nav.deviceMemory != null
        ? {
            deviceMemory: nav.deviceMemory
          }
        : null;

    return Object.freeze({
      runtime: "browser",
      userAgent: nav.userAgent || IMMORTAL_CAPABILITY.userAgent || null,
      language: nav.language || null,
      platform: nav.platform || IMMORTAL_CAPABILITY.platform || null,
      online: nav.onLine ?? null,
      screen,
      device,
      input,
      preferences,
      location,
      network,
      referrer,
      origin,
      visibility,
      performance: performanceSnapshot,
      memory: memorySnapshot
    });
  } catch {
    return null;
  }
}

// ============================================================================
// WAVE CONTEXT / PULSEBAND CONTEXT — now device/5g/4g/3g/2g/1g aware
// ============================================================================

function inferWaveFromDeviceEnv(deviceEnv) {
  if (!deviceEnv || !deviceEnv.network) return null;

  const eff = deviceEnv.network.effectiveType || "";
  const lower = String(eff).toLowerCase();

  if (lower.includes("5g")) return "5g";
  if (lower.includes("4g")) return "4g";
  if (lower.includes("3g")) return "3g";
  if (lower.includes("2g")) return "2g";
  if (lower.includes("slow-2g")) return "2g";
  if (lower.includes("wifi")) return "wifi";
  return null;
}

function normalizeWaveContext(raw = {}, deviceEnv = null) {
  const inferred = inferWaveFromDeviceEnv(deviceEnv);
  const wave = raw.wave || raw.band || inferred || null;

  let primaryWave = "unknown";
  let waveClass = "generic";

  switch (wave) {
    case "1g":
    case "2g":
    case "3g":
    case "4g":
    case "5g":
    case "cellular":
      primaryWave = "cellular";
      waveClass = "rf-cellular";
      break;
    case "wifi":
    case "wifi24":
    case "wifi5":
    case "wifi6":
      primaryWave = "wifi";
      waveClass = "rf-wifi";
      break;
    case "bluetooth":
    case "ble":
    case "bluetoothClassic":
    case "bluetoothLE":
      primaryWave = "bluetooth";
      waveClass = "rf-short-range";
      break;
    case "satellite":
    case "satelliteDownlink":
    case "satelliteUplink":
      primaryWave = "satellite";
      waveClass = "rf-satellite";
      break;
    case "mesh":
      primaryWave = "mesh";
      waveClass = "rf-mesh";
      break;
    case "wired":
      primaryWave = "wired";
      waveClass = "wired";
      break;
    default:
      primaryWave = "unknown";
      waveClass = "generic";
      break;
  }

  return {
    primaryWave,
    waveClass,
    rawWave: wave,
    carrierHint: raw.carrierHint || null,
    towerId: raw.towerId || null,
    satelliteId: raw.satelliteId || null,
    meshNodeId: raw.meshNodeId || null
  };
}
function buildPulseBandContext({
  waveContext = {},
  routeContext = {},
  worldContext = {},
  pulseSignalKey = null,
  deviceEnv = null
} = {}) {
  const wave = normalizeWaveContext(waveContext, deviceEnv);

  const capability = {
    tier: IMMORTAL_CAPABILITY.capabilityTier,
    score: IMMORTAL_CAPABILITY.capabilityScore,
    gpuScore: IMMORTAL_CAPABILITY.gpuScore,
    gpuRam: IMMORTAL_CAPABILITY.gpuRam,
    bandwidth: IMMORTAL_CAPABILITY.bandwidthMbps,
    stability: IMMORTAL_CAPABILITY.stabilityScore,
    userAgent: IMMORTAL_CAPABILITY.userAgent || (deviceEnv && deviceEnv.userAgent) || null,
    platform: IMMORTAL_CAPABILITY.platform || (deviceEnv && deviceEnv.platform) || null
  };

  const IDENTITY_META = {
    version: "v70-IMMORTAL",
    organism: "PulseOS",
    realm: "browser",
    timestamp: () => PulseRealm.PulseNOW,
    uid: () => PulseRealm.crypto?.randomUUID?.() || ("uid-" + Math.random().toString(36).slice(2)),
    signature: "identity-meta-core"
  };

  // v31 route identity resolution (NOT file paths)
  const safePageId = routeContext.pageId || "PulseWorldReality";
  let resolved = { IDENTITY_META };
  try {
    if (PulseRealm.PulseRouteCarpet && typeof PulseRealm.PulseRouteCarpet.resolveRoute === "function") {
      resolved = PulseRealm.PulseRouteCarpet.resolveRoute(safePageId) || { IDENTITY_META };
    }
  } catch {
    resolved = { IDENTITY_META };
  }

  const route = {
    route:
      (resolved.IDENTITY_META && resolved.IDENTITY_META.ROUTE_ID) ||
      routeContext.route ||
      "/",

    pageId:
      safePageId ||
      (resolved.IDENTITY_META && resolved.IDENTITY_META.PAGE_ID) ||
      "PulseWorldReality",

    organismId: routeContext.organismId || "PulseWorldOS",
    deviceId: routeContext.deviceId || null,
    hydraNodeId: routeContext.hydraNodeId || null,
    capabilityTier: capability.tier,
    capabilityScore: capability.score
  };

  const world = {
    world: worldContext.world || "pulse-world",
    region: worldContext.region || null,
    tenantId: worldContext.tenantId || null,
    systemAgeMs: worldContext.systemAgeMs ?? null,
    capabilityTier: capability.tier,
    capabilityScore: capability.score
  };

  const band = {
    band: "PulseBand",
    waveAgnostic: true,
    primaryWave: wave.primaryWave,
    waveClass: wave.waveClass,
    capabilityTier: capability.tier,
    capabilityScore: capability.score
  };

  let checkBandSnapshot = null;
  let checkBandUserProjection = null;
  try {
    checkBandSnapshot = getCheckBandStateSnapshot() || null;
    if (route.deviceId && checkBandSnapshot && Array.isArray(checkBandSnapshot.users)) {
      const userData = checkBandSnapshot.users.find(
        (u) => u.userId === route.deviceId
      );
      if (userData) {
        checkBandUserProjection = projectWorldBandForUser({
          userId: route.deviceId,
          data: userData,
          orchestratorMode: checkBandSnapshot.mode
        });
      }
    }
  } catch {
    checkBandSnapshot = null;
    checkBandUserProjection = null;
  }

  let nervousHealing = null;
  try {
    nervousHealing = getPulseBandOneHealingState();
  } catch {
    nervousHealing = null;
  }

  const fusedSignalKey =
    pulseSignalKey ||
    computeTriHash(
      JSON.stringify({
        route: route.route,
        pageId: route.pageId,
        wave: wave.primaryWave,
        deviceId: route.deviceId || null
      })
    ).combined;

  const context = {
    band,
    wave,
    route,
    world,
    capability,
    pulseSignalKey: fusedSignalKey,
    deviceEnv,
    checkBandSnapshot,
    checkBandUserProjection,
    nervousHealing,
    pulseBandOneMeta: PulseBandOneMeta || null
  };

  CoreMemory.set(ROUTE, KEY_LAST_DEVICE_ENV, deviceEnv);
  CoreMemory.set(ROUTE, KEY_LAST_CHECKBAND, {
    snapshot: checkBandSnapshot,
    projection: checkBandUserProjection
  });

  return context;
}

// ============================================================================
// BINARY FRAME
// ============================================================================

function createBinaryFrame(bits, mode, sequenceId, pulseBandContext) {
  const len = Array.isArray(bits) ? bits.length : 0;
  const frameId = computeHash(
    `${mode}:${sequenceId}:${len}:${pulseBandContext.band.primaryWave}:${pulseBandContext.capability.tier}`
  );

  return {
    type: "BinaryWaveFrame-v41",
    frameId,
    mode,
    sequenceId,
    bitsLength: len,
    pulseBand: pulseBandContext.band,
    waveContext: pulseBandContext.wave,
    routeContext: pulseBandContext.route,
    worldContext: pulseBandContext.world,
    capabilityContext: pulseBandContext.capability,
    pulseSignalKey: pulseBandContext.pulseSignalKey,
    deviceEnv: pulseBandContext.deviceEnv || null,
    checkBand: {
      snapshot: pulseBandContext.checkBandSnapshot || null,
      projection: pulseBandContext.checkBandUserProjection || null
    },
    nervousHealing: pulseBandContext.nervousHealing || null,
    epoch: "v41-IMMORTAL-FUSION"
  };
}

// ============================================================================
// INLINE SURFACES (Presence / Harmonics / Coherence / Band / Continuance)
// ============================================================================

function createPresencePulse() {
  return function surfacePresence({ bits, mode, sequenceId, ctx }) {
    const len = Array.isArray(bits) ? bits.length : 0;
    return {
      type: "PulsePresence-v41",
      mode,
      sequenceId,
      bitsLength: len,
      band: ctx.band,
      route: ctx.route,
      world: ctx.world,
      wave: ctx.wave,
      capability: ctx.capability,
      checkBandProjection: ctx.checkBandUserProjection || null,
      epoch: "v41-IMMORTAL-FUSION"
    };
  };
}

function createHarmonicsPulse() {
  return function surfaceHarmonics({ bits, mode, sequenceId, ctx }) {
    const len = Array.isArray(bits) ? bits.length : 0;
    const capabilityFactor = Math.min((ctx.capability.score || 0) / 10000, 1);
    return {
      type: "PulseHarmonics-v41",
      mode,
      sequenceId,
      bitsLength: len,
      band: ctx.band,
      wave: ctx.wave,
      capability: ctx.capability,
      harmonicsIntensity: capabilityFactor,
      epoch: "v41-IMMORTAL-FUSION"
    };
  };
}

function createCoherencePulse() {
  return function surfaceCoherence({ bits, mode, sequenceId, ctx }) {
    const len = Array.isArray(bits) ? bits.length : 0;
    const baseCoherence = Math.min(len / 64, 1);
    const capabilityFactor = Math.min((ctx.capability.score || 0) / 10000, 1);
    const coherenceScore = Math.min(
      baseCoherence * (0.7 + 0.3 * capabilityFactor),
      1
    );

    return {
      type: "PulseCoherence-v41",
      mode,
      sequenceId,
      bitsLength: len,
      coherenceScore,
      band: ctx.band,
      wave: ctx.wave,
      capability: ctx.capability,
      epoch: "v41-IMMORTAL-FUSION"
    };
  };
}

function createBandPulse() {
  return function surfaceBand({ bits, mode, sequenceId, ctx }) {
    const len = Array.isArray(bits) ? bits.length : 0;
    return {
      type: "PulseBand-v41",
      mode,
      sequenceId,
      bitsLength: len,
      band: ctx.band,
      wave: ctx.wave,
      capability: ctx.capability,
      epoch: "v41-IMMORTAL-FUSION"
    };
  };
}

function createContinuancePulse() {
  return function surfaceContinuance({ bits, mode, sequenceId, ctx }) {
    const len = Array.isArray(bits) ? bits.length : 0;
    return {
      type: "PulseContinuance-v41",
      mode,
      sequenceId,
      bitsLength: len,
      continuitySignature: `cont-${sequenceId}-${len}-${ctx.capability.tier}`,
      band: ctx.band,
      world: ctx.world,
      capability: ctx.capability,
      epoch: "v41-IMMORTAL-FUSION"
    };
  };
}

// ============================================================================
// SEND SURFACES (Legacy / Earn / Normal)
// ============================================================================

function createSendLegacyPulse() {
  return function surfaceSendLegacy({ bits, mode, sequenceId, v2Pulse, ctx }) {
    const len = Array.isArray(bits) ? bits.length : 0;
    const healthScore = v2Pulse && v2Pulse.healthScore != null ? v2Pulse.healthScore : null;
    const tier = v2Pulse && v2Pulse.tier != null ? v2Pulse.tier : null;

    return {
      type: "PulseSendLegacy-v41",
      mode,
      sequenceId,
      bitsLength: len,
      sendIntent: "legacy",
      healthScore,
      tier,
      band: ctx.band,
      wave: ctx.wave,
      capability: ctx.capability,
      epoch: "v41-IMMORTAL-FUSION"
    };
  };
}

function createSendEarnPulse() {
  return function surfaceSendEarn({ bits, mode, sequenceId, v2Pulse, ctx }) {
    const len = Array.isArray(bits) ? bits.length : 0;
    const advantageField =
      v2Pulse && v2Pulse.advantageField != null ? v2Pulse.advantageField : null;
    const healthScore =
      v2Pulse && v2Pulse.healthScore != null ? v2Pulse.healthScore : null;

    return {
      type: "PulseSendEarn-v41",
      mode,
      sequenceId,
      bitsLength: len,
      sendIntent: "earn",
      advantageField,
      healthScore,
      band: ctx.band,
      wave: ctx.wave,
      capability: ctx.capability,
      epoch: "v41-IMMORTAL-FUSION"
    };
  };
}

function createNormalPulseSurface() {
  return function surfaceNormal({ bits, mode, sequenceId }) {
    const len = Array.isArray(bits) ? bits.length : 0;
    const baselineScore = Math.min(len / 32, 1);
    return {
      type: "PulseNormal-v41",
      mode,
      sequenceId,
      bitsLength: len,
      baselineScore,
      baselineSignature: computeTriHash(String(baselineScore)),
      epoch: "v41-IMMORTAL-FUSION"
    };
  };
}

// ============================================================================
// MAIN ORGAN: createBinaryWavePulse — v41-IMMORTAL-PULSEBAND-FUSION
// ============================================================================

export function createBinaryWavePulse({
  fallbackProxy = {},
  fallbackMesh = {},
  fallbackNode = {},
  spins = 10,
  trace = false,
  maxBitsLength = 64,

  // PULSEBAND CONTEXT
  waveContext = {},
  routeContext = {},
  worldContext = {},
  pulseSignalKey = null
} = {}) {
  let counter = 0;

  const deviceEnv = buildSurfaceEnvironment();

  // Adapt spin count slightly by capability
  const capabilitySpinBoost = Math.min(
    Math.floor((IMMORTAL_CAPABILITY.capabilityScore || 0) / 2000),
    8
  );
  const effectiveSpins = spins + capabilitySpinBoost;
  const spinOffsets = Array.from({ length: effectiveSpins }, (_, i) => i);

  const pulseBandContext = buildPulseBandContext({
    waveContext,
    routeContext,
    worldContext,
    pulseSignalKey,
    deviceEnv
  });

  const shifterBinary = createPulseBinaryShifterEvolutionaryPulse();
  const v1LegacySurface = createPulseV1Legacy();
  const v3ContinuanceSurf = createPulseV3Continuance();
  const presenceSurf = createPresencePulse();
  const harmonicsSurf = createHarmonicsPulse();
  const coherenceSurf = createCoherencePulse();
  const bandSurf = createBandPulse();
  const continuanceSurf = createContinuancePulse();
  const sendLegacySurf = createSendLegacyPulse();
  const sendEarnSurf = createSendEarnPulse();
  const normalSurf = createNormalPulseSurface();

  function isPureBinary(bits) {
    if (!Array.isArray(bits)) return false;
    for (let i = 0; i < bits.length; i++) {
      if (bits[i] !== 0 && bits[i] !== 1) return false;
    }
    return true;
  }

  function isAnomalous(bits) {
    if (!Array.isArray(bits)) return true;
    if (bits.length === 0) return true;
    if (bits.length > maxBitsLength) return true;
    return false;
  }

  function fallback(reason, bits) {
    const report = {
      reason,
      bits,
      sequenceId: counter,
      pulseBandContext,
      capability: pulseBandContext.capability
    };

    binaryWaveLog("fallback", report);

    if (trace) {
      console.warn("[PulseBinaryWave v41-IMMORTAL-FUSION] FALLBACK:", report);
    }

    if (PulseSignals && typeof PulseSignals.emit === "function") {
      try {
        PulseSignals.emit("binarywave.error", {
          reason,
          bitsLength: Array.isArray(bits) ? bits.length : null,
          context: pulseBandContext
        });
      } catch {}
    }

    if (fallbackProxy && typeof fallbackProxy.exchange === "function") {
      return fallbackProxy.exchange(bits, reason, report);
    }
    if (fallbackMesh && typeof fallbackMesh.exchange === "function") {
      return fallbackMesh.exchange(bits, reason, report);
    }
    if (fallbackNode && typeof fallbackNode.exchange === "function") {
      return fallbackNode.exchange(bits, reason, report);
    }

    throw new Error(`PulseBinaryWave fallback (${reason}) with no handlers`);
  }

  function ensurePureBinaryOrFallback(reason, bits) {
    if (!isPureBinary(bits) || isAnomalous(bits)) {
      return fallback(reason, bits);
    }
    return bits;
  }

  function generateBits(n) {
    return n.toString(2).split("").map(Number);
  }

  function xorBits(a, b) {
    const len = Math.min(a.length, b.length);
    const out = new Array(len);
    for (let i = 0; i < len; i++) out[i] = a[i] ^ b[i];
    return out;
  }

  function rotateBits(bits, shift) {
    const n = bits.length;
    if (n === 0) return [];
    const out = new Array(n);
    const s = ((shift % n) + n) % n;
    for (let i = 0; i < n; i++) out[(i + s) % n] = bits[i];
    return out;
  }

  function invertBits(bits) {
    const out = new Array(bits.length);
    for (let i = 0; i < bits.length; i++) out[i] = bits[i] === 0 ? 1 : 0;
    return out;
  }

  function generateMultiSpin(bits) {
    if (!bits.length) return [];
    const out = [];
    for (let i = 0; i < spinOffsets.length; i++) {
      const offset = spinOffsets[i];
      const rotated = rotateBits(bits, offset);
      const xorred = xorBits(bits, rotated);
      const shifted = xorred.map((b, idx) =>
        (idx + offset) % 2 === 0 ? b : b ^ 1
      );
      out.push(shifted);
    }
    return out;
  }

  function surfaceV2Shifter(bits, mode) {
    try {
      return createPulseV2Shifter({
        jobId: `v2shifter-${mode}-${counter}`,
        pattern: `binary/${mode}/${bits.length}`,
        payload: {
          bitsLength: bits.length,
          mode,
          sequenceId: counter,
          pulseBandContext
        },
        priority: "normal",
        returnTo: null,
        parentLineage: null,
        mode: "normal",
        pageId: pulseBandContext.route.pageId || "BINARY_V2_SHIFTER"
      });
    } catch (err) {
      binaryWaveLog("v2shifter_error", { error: String(err) });
      return null;
    }
  }

  function surfaceV2Earn(bits, mode) {
    try {
      return createPulseV2Earn({
        jobId: `v2earn-${mode}-${counter}`,
        pattern: `binary/${mode}/${bits.length}`,
        payload: {
          bitsLength: bits.length,
          mode,
          sequenceId: counter,
          pulseBandContext
        },
        priority: "normal",
        returnTo: null,
        parentLineage: null,
        mode: "normal",
        pageId: pulseBandContext.route.pageId || "BINARY_V2_EARN"
      });
    } catch (err) {
      binaryWaveLog("v2earn_error", { error: String(err) });
      return null;
    }
  }

  function surfaceShifter(bits, mode) {
    try {
      return shifterBinary.createFromBits({
        bits,
        jobId: `shifter-${mode}-${counter}`,
        priority: "normal",
        pageId: pulseBandContext.route.pageId || "BINARY_SHIFTER",
        patternPrefix: "bp",
        trace
      });
    } catch (err) {
      binaryWaveLog("shifter_error", { error: String(err) });
      return null;
    }
  }

  function surfaceV1(bits, mode) {
    try {
      return v1LegacySurface({
        bits,
        mode,
        sequenceId: counter,
        immortalMeta: pulseBandContext
      });
    } catch (err) {
      binaryWaveLog("v1legacy_error", { error: String(err) });
      return null;
    }
  }

  function surfaceV3Continuance(bits, mode) {
    try {
      return v3ContinuanceSurf({
        bits,
        mode,
        sequenceId: counter,
        immortalMeta: pulseBandContext
      });
    } catch (err) {
      binaryWaveLog("v3continuance_error", { error: String(err) });
      return null;
    }
  }

  function surfaceV3Unified(bits, mode) {
    try {
      const pattern = `binary/${mode}/${bits.length}`;
      const payload = {
        bitsLength: bits.length,
        mode,
        sequenceId: counter,
        pulseBandContext
      };
      return createPulseV3({
        jobId: `v3unified-${mode}-${counter}`,
        pattern,
        payload,
        priority: "normal",
        returnTo: null,
        parentLineage: null,
        mode: "normal",
        pageId: pulseBandContext.route.pageId || "BINARY_V3_UNIFIED"
      });
    } catch (err) {
      binaryWaveLog("v3unified_error", { error: String(err) });
      return null;
    }
  }

  function surfacePresence(bits, mode) {
    try {
      return presenceSurf({
        bits,
        mode,
        sequenceId: counter,
        ctx: pulseBandContext
      });
    } catch (err) {
      binaryWaveLog("presence_error", { error: String(err) });
      return null;
    }
  }

  function surfaceHarmonics(bits, mode) {
    try {
      return harmonicsSurf({
        bits,
        mode,
        sequenceId: counter,
        ctx: pulseBandContext
      });
    } catch (err) {
      binaryWaveLog("harmonics_error", { error: String(err) });
      return null;
    }
  }

  function surfaceCoherence(bits, mode) {
    try {
      return coherenceSurf({
        bits,
        mode,
        sequenceId: counter,
        ctx: pulseBandContext
      });
    } catch (err) {
      binaryWaveLog("coherence_error", { error: String(err) });
      return null;
    }
  }

  function surfaceBand(bits, mode) {
    try {
      return bandSurf({
        bits,
        mode,
        sequenceId: counter,
        ctx: pulseBandContext
      });
    } catch (err) {
      binaryWaveLog("band_error", { error: String(err) });
      return null;
    }
  }

  function surfaceContinuance(bits, mode) {
    try {
      return continuanceSurf({
        bits,
        mode,
        sequenceId: counter,
        ctx: pulseBandContext
      });
    } catch (err) {
      binaryWaveLog("continuance_error", { error: String(err) });
      return null;
    }
  }

  function surfaceSendLegacy(bits, mode, v2PulsePrimary) {
    try {
      return sendLegacySurf({
        bits,
        mode,
        sequenceId: counter,
        v2Pulse: v2PulsePrimary,
        ctx: pulseBandContext
      });
    } catch (err) {
      binaryWaveLog("send_legacy_error", { error: String(err) });
      return null;
    }
  }

  function surfaceSendEarn(bits, mode, v2PulsePrimary) {
    try {
      return sendEarnSurf({
        bits,
        mode,
        sequenceId: counter,
        v2Pulse: v2PulsePrimary,
        ctx: pulseBandContext
      });
    } catch (err) {
      binaryWaveLog("send_earn_error", { error: String(err) });
      return null;
    }
  }

  function surfaceNormal(bits, mode) {
    try {
      return normalSurf({
        bits,
        mode,
        sequenceId: counter
      });
    } catch (err) {
      binaryWaveLog("normal_error", { error: String(err) });
      return null;
    }
  }

  // WRAP — UNIFIED BINARY WAVE PACKET (v41)
  function wrap(mode, bitsOrMulti) {
    const primaryBits =
      Array.isArray(bitsOrMulti) && typeof bitsOrMulti[0] === "number"
        ? bitsOrMulti
        : Array.isArray(bitsOrMulti) && Array.isArray(bitsOrMulti[0])
          ? bitsOrMulti[0]
          : [];

    const bitsSignature = computeTriHash(JSON.stringify(primaryBits));
    const modeSignature = computeTriHash(mode);
    const sequenceSignature = computeTriHash(String(counter));
    const contextSignature = computeTriHash(JSON.stringify(pulseBandContext));
    const capabilitySignature = computeTriHash(
      JSON.stringify(pulseBandContext.capability)
    );

    const binaryFrame = createBinaryFrame(
      primaryBits,
      mode,
      counter,
      pulseBandContext
    );

    const v2PulseShifter = surfaceV2Shifter(primaryBits, mode);
    const v2PulseEarn = surfaceV2Earn(primaryBits, mode);

    const normalPulse = surfaceNormal(primaryBits, mode);
    const v3UnifiedPulse = surfaceV3Unified(primaryBits, mode);
    const v3Continuance = surfaceV3Continuance(primaryBits, mode);
    const continuance = surfaceContinuance(primaryBits, mode);
    const v1Legacy = surfaceV1(primaryBits, mode);
    const shifterPulse = surfaceShifter(primaryBits, mode);
    const presencePulse = surfacePresence(primaryBits, mode);
    const harmonicsPulse = surfaceHarmonics(primaryBits, mode);
    const coherencePulse = surfaceCoherence(primaryBits, mode);
    const bandPulse = surfaceBand(primaryBits, mode);

    const sendLegacy = surfaceSendLegacy(primaryBits, mode, v2PulseShifter);
    const sendEarn = surfaceSendEarn(primaryBits, mode, v2PulseShifter);

    const v2PrimaryAdvantage =
      v2PulseShifter && v2PulseShifter.advantageField != null
        ? v2PulseShifter.advantageField
        : null;
    const v2PrimaryHealth =
      v2PulseShifter && v2PulseShifter.healthScore != null
        ? v2PulseShifter.healthScore
        : null;
    const v2PrimaryTier =
      v2PulseShifter && v2PulseShifter.tier != null
        ? v2PulseShifter.tier
        : null;
    const v2PrimaryIntel =
      v2PulseShifter &&
      (v2PulseShifter.pulseIntelligence || v2PulseShifter.pulseCompute)
        ? v2PulseShifter.pulseIntelligence || v2PulseShifter.pulseCompute
        : null;

    const v3UnifiedIntel =
      v3UnifiedPulse && v3UnifiedPulse.pulseIntelligence != null
        ? v3UnifiedPulse.pulseIntelligence
        : null;
    const v3UnifiedHealth =
      v3UnifiedPulse && v3UnifiedPulse.healthScore != null
        ? v3UnifiedPulse.healthScore
        : null;
    const v3UnifiedTier =
      v3UnifiedPulse && v3UnifiedPulse.tier != null
        ? v3UnifiedPulse.tier
        : null;

    const carrierIntel = {
      v2Primary: v2PrimaryIntel,
      v3Unified: v3UnifiedIntel
    };

    const carrierAdvantage = {
      v2PrimaryAdvantage,
      v2PrimaryHealth,
      v2PrimaryTier,
      v3UnifiedHealth,
      v3UnifiedTier,
      capabilityTier: pulseBandContext.capability.tier,
      capabilityScore: pulseBandContext.capability.score
    };

    const carrierSignature = computeTriHash(
      JSON.stringify({
        mode,
        sequenceId: counter,
        bitsSignature,
        carrierAdvantage,
        carrierIntel,
        pulseBandContext
      })
    );

    const intellHash = computeIntellHash(
      {
        mode,
        sequenceId: counter,
        bitsSignature,
        carrierAdvantage,
        carrierIntel,
        pulseBandContext
      },
      v2PrimaryAdvantage || v3UnifiedHealth || null
    );

    const packet = {
      mode,
      sequenceId: counter,
      binaryWaveform: bitsOrMulti,
      pulseBandContext,
      binaryFrame,

      normalPulse,
      v3UnifiedPulse,
      v3ContinuancePulse: v3Continuance,

      v2PulseShifter,
      v2PulseEarn,

      continuancePulse: continuance,
      v1Legacy,
      shifterPulse,

      presencePulse,
      harmonicsPulse,
      coherencePulse,
      bandPulse,

      sendLegacyPulse: sendLegacy,
      sendEarnPulse: sendEarn,

      carrierAdvantage,
      carrierIntel,

      signatures: {
        bitsSignature,
        modeSignature,
        sequenceSignature,
        contextSignature,
        capabilitySignature,
        carrierSignature,
        intellHash
      }
    };

    CoreMemory.set(ROUTE, KEY_LAST_PACKET, packet);
    CoreMemory.set(ROUTE, KEY_LAST_ROUTE, pulseBandContext.route);
    CoreMemory.set(ROUTE, KEY_LAST_WAVE, pulseBandContext.wave);
    CoreMemory.set(ROUTE, KEY_LAST_SIGNAL_KEY, pulseBandContext.pulseSignalKey);

    binaryWaveLog("packet", {
      mode,
      sequenceId: counter,
      bitsLength:
        Array.isArray(bitsOrMulti) && typeof bitsOrMulti[0] === "number"
          ? bitsOrMulti.length
          : Array.isArray(bitsOrMulti) && Array.isArray(bitsOrMulti[0])
            ? bitsOrMulti[0].length
            : 0,
      primaryWave: pulseBandContext.wave.primaryWave,
      waveClass: pulseBandContext.wave.waveClass
    });

    if (PulseSignals && typeof PulseSignals.emit === "function") {
      try {
        PulseSignals.emit("binarywave.packet", {
          mode,
          sequenceId: counter,
          frameId: binaryFrame.frameId,
          band: pulseBandContext.band,
          wave: pulseBandContext.wave,
          route: pulseBandContext.route,
          world: pulseBandContext.world,
          capability: pulseBandContext.capability
        });
      } catch {}
    }

    return packet;
  }

  // MODES
  function nextPulse() {
    counter++;
    const bits = ensurePureBinaryOrFallback(
      "invalid-base",
      generateBits(counter)
    );
    if (trace) console.log("[PulseBinaryWave v41-IMMORTAL-FUSION] BASE:", bits);
    return wrap("base", bits);
  }

  function nextPulseFast() {
    counter++;
    const bits = ensurePureBinaryOrFallback(
      "invalid-fast",
      generateBits(counter)
    );
    if (trace) console.log("[PulseBinaryWave v41-IMMORTAL-FUSION] FAST:", bits);
    return wrap("fast", bits);
  }

  function nextPulseSlow() {
    counter += 0.25;
    const bits = ensurePureBinaryOrFallback(
      "invalid-slow",
      generateBits(Math.floor(counter))
    );
    if (trace) console.log("[PulseBinaryWave v41-IMMORTAL-FUSION] SLOW:", bits);
    return wrap("slow", bits);
  }

  function nextPulseDeep() {
    counter += 0.05;
    const bits = ensurePureBinaryOrFallback(
      "invalid-deep",
      generateBits(Math.floor(counter))
    );
    if (trace) console.log("[PulseBinaryWave v41-IMMORTAL-FUSION] DEEP:", bits);
    return wrap("deep", bits);
  }

  function nextPulseMulti() {
    counter++;
    const bits = ensurePureBinaryOrFallback(
      "invalid-multi",
      generateBits(counter)
    );
    const multi = generateMultiSpin(bits);
    if (trace)
      console.log("[PulseBinaryWave v41-IMMORTAL-FUSION] MULTI:", multi);
    return wrap("multi", multi);
  }

  function nextPulseEcho() {
    counter++;
    const bits = ensurePureBinaryOrFallback(
      "invalid-echo",
      generateBits(counter)
    );
    if (trace) console.log("[PulseBinaryWave v41-IMMORTAL-FUSION] ECHO:", bits);
    return wrap("echo", bits);
  }

  function nextPulseReflect() {
    counter++;
    const bits = ensurePureBinaryOrFallback(
      "invalid-reflect",
      generateBits(counter)
    );
    const inverted = invertBits(bits);
    if (trace)
      console.log("[PulseBinaryWave v41-IMMORTAL-FUSION] REFLECT:", inverted);
    return wrap("reflect", inverted);
  }

  function nextPulseBurst() {
    counter++;
    const base = ensurePureBinaryOrFallback(
      "invalid-burst",
      generateBits(counter)
    );
    const burst = [base, invertBits(base), rotateBits(base, 1)];
    if (trace)
      console.log("[PulseBinaryWave v41-IMMORTAL-FUSION] BURST:", burst);
    return wrap("burst", burst);
  }

  return {
    nextPulse,
    nextPulseFast,
    nextPulseSlow,
    nextPulseDeep,
    nextPulseMulti,
    nextPulseEcho,
    nextPulseReflect,
    nextPulseBurst,
    fallback,
    pulseBandContext
  };
}

export function initBinaryWave(PulseBand) {

  // Listener for wave generation
  function handleBinaryWaveRequest(payload) {
    try {
      const wave = createBinaryWavePulse(payload?.bits || []);

      // Persist last wave state
      CoreMemory.set("PulseBand", "last_wave", wave);

      // Emit wave result back into PulseBand
      PulseBand.emit("binarywave:generated", {
        wave,
        ts: PulseRealm.PulseNOW
      });

    } catch (err) {
      console.warn("[BinaryWave::v41] Wave generation error", err);
    }
  }

  // Attach listener
  PulseBand.on("binarywave:generate", handleBinaryWaveRequest);

  // Return API
  return PulseBinaryWaveAPI_v41;
}

// HOT MEMORY ACCESSOR

export function getLastBinaryWaveState() {
  CoreMemory.prewarm();
  return {
    lastPacket: CoreMemory.get(ROUTE, KEY_LAST_PACKET),
    lastRoute: CoreMemory.get(ROUTE, KEY_LAST_ROUTE),
    lastWave: CoreMemory.get(ROUTE, KEY_LAST_WAVE),
    lastPulseSignalKey: CoreMemory.get(ROUTE, KEY_LAST_SIGNAL_KEY),
    lastDeviceEnvironment: CoreMemory.get(ROUTE, KEY_LAST_DEVICE_ENV),
    lastCheckBand: CoreMemory.get(ROUTE, KEY_LAST_CHECKBAND)
  };
}

const PulseBinaryWaveAPI_v41 = {
  createBinaryWavePulse,
  getLastBinaryWaveState,
  CoreMemory
};

export const PulseBinaryWave = createBinaryWavePulse;
