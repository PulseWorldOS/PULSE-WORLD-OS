/*
===============================================================================
FILE: /PULSE-BAND/PulseBandOne-v40-IMMORTAL-INTEL-OMEGA-SPINE.js
UNIFIED PULSEBAND NERVOUS SYSTEM — v40 ONEBAND IMMORTAL-INTEL-OMEGA-SPINE
Closer to device layer • Organ-resolved • Optional self-fallback • Safe Nebula
===============================================================================
*/

// ============================================================================
// SUBIMPORTS — ADJUST PATHS TO YOUR TREE
// ============================================================================
import { PulseVitalsLogger as PulseLogger, PulseVitalsMonitor, PulseUIFlow, PulseUIErrors, log, warn, error,  PulseProofReflex, PulseUIRouteMemory, PulsePageScanner} from "../../../../../_PROOF/PULSE-PROOF.js";
import { PulseGPUAstralNervousSystem } from "../PULSE-GPU/PulseGPUAstralNervousSystem-v30.js";
import { PulseProxyImpulse, PulseProxyImpulseStrategy } from "../Pulse-Coordinator/PulseProxyImpulse-v30.js";
import { PulseProxyPNSNervousSystemBinary } from "../Pulse-Coordinator/PulseProxyPNSNervousSystem-v40.js";
import { PulseOSCheckRouterMemory } from "../Pulse-Coordinator/PulseProxyMemoryRouter-v30.js";
import { PulseProxyContext } from "../Pulse-Coordinator/PulseProxyContext-v30.js";
import { PulseProxyFront } from "../Pulse-Coordinator/PulseProxyFront-v30.js";
import { PulseProxyOuterAgent } from "../Pulse-Coordinator/PulseProxyOuterAgent-v30.js";
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
// OPTIONAL ORGAN RESOLUTION — DEVICE-LAYER FRIENDLY
// ============================================================================
function resolveOrgan(primary, fallbackPath) {
  if (primary) return primary;
  try {
    const root = typeof self !== "undefined" ? self : globalThis;
    const parts = (fallbackPath || "").split(".");
    let cur = root;
    for (const p of parts) {
      if (!p) continue;
      cur = cur && cur[p];
    }
    return cur || null;
  } catch {
    return null;
  }
}

function resolveLogger() {
  const base =
    PulseLogger ||
    resolveOrgan(null, "PulseLogger") ||
    console;

  if (typeof base === "function") {
    return {
      log: (...args) => { try { base(...args); } catch { console.log(...args); } },
      error: (...args) => { try { base(...args); } catch { console.error(...args); } },
      nervous: (...args) => { try { base(...args); } catch { console.log(...args); } }
    };
  }

  return {
    log: typeof base.log === "function"
      ? (...args) => { try { base.log(...args); } catch { console.log(...args); } }
      : (...args) => { console.log(...args); },

    error: typeof base.error === "function"
      ? (...args) => { try { base.error(...args); } catch { console.error(...args); } }
      : (...args) => { console.error(...args); },

    nervous: typeof base.nervous === "function"
      ? (...args) => { try { base.nervous(...args); } catch { console.log(...args); } }
      : (...args) => { console.log(...args); }
  };
}

// ============================================================================
// CORE MEMORY v40 ACCESSOR (NO TDZ, NO DIRECT IMPORT)
// ============================================================================
function Core() {
  try {
    const root = typeof self !== "undefined" ? self : globalThis;
    return root.PulseCoreMemory || null;
  } catch {
    return null;
  }
}

// ============================================================================
// ONEBAND CONTEXT — v40 IMMORTAL-INTEL-OMEGA-SPINE
// ============================================================================
const PULSEBAND_ONE_CONTEXT_V40 = {
  layer: "PulseBandOne",
  role: "UNIFIED_NERVOUS_SYSTEM",
  purpose:
    "Unified sensorimotor integration + connectivity + GPU warmup + CNS/PNS bridge + mesh/earn hints + chunk/cache/prewarm/advantage/presence/impulse-speed fields",
  context:
    "Maintains live/snapshot/gpuPerformance mirrors, fires nervous events, propagates reflexes, synchronizes with Mesh Spine + Flow + Cortex + Evolution + Proxy/Router/Identity/OuterAgent/RouterMemory",
  target: "full-os",
  version: "40-IMMORTAL-INTEL-OMEGA-SPINE",
  mode: "oneband",
  binaryPartner: "BinaryProxy-v20.4-Immortal-ABA-ADVANTAGE-PRESENCE-PLUS",
  selfRepairable: true,
  evo: {
    deterministic: true,
    driftProof: true,
    multiInstanceReady: true,
    parallelSafe: true,
    zeroDriftCloning: true,

    bandAware: true,
    oneBandAware: true,
    binaryAware: true,
    symbolicAware: true,
    dualBandAware: true,
    presenceAware: true,
    presenceFieldAware: true,
    waveFieldAware: true,
    binaryFieldAware: true,

    advantageCascadeAware: true,
    unifiedAdvantageField: true,
    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,
    coldStartAware: true,
    routeWarmthAware: true,

    impulseSpeedAware: true,
    impulseDensityAware: true,
    meshPressureAware: true,
    auraPressureAware: true,

    meshAware: true,
    meshTierAware: true,
    longRangeAware: true,
    bluetoothPresenceAware: true,

    limbicAware: true,
    triHeartAware: true,
    cortexSync: true,
    brainSync: true,
    evolutionSync: true,

    zeroRouting: true,
    zeroMarketplace: true,
    zeroScoring: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroRandomness: true,
    zeroNetwork: true,
    zeroIO: true,
    zeroExternalMutation: true,
    zeroWindowMutation: true,
    zeroDOM: true,

    // v40: we actually do GPU warmup + timers + async
    zeroGPUExecution: false,
    deterministicField: true,
    unifiedBandField: true,
    futureEvolutionReady: true
  }
};

export const PulseBandOneMeta = Object.freeze({
  layer: "PulseBandOne",
  role: "UNIFIED_PNS_NERVOUS_SYSTEM",
  version: "v40-IMMORTAL-INTEL-OMEGA-SPINE",
  identity: "PulseBandOne-v40-IMMORTAL-INTEL-OMEGA-SPINE",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    multiInstanceReady: true,
    parallelSafe: true,

    unifiedOneBand: true,
    sensorimotorIntegration: true,
    connectivityMirror: true,
    gpuWarmupControl: true,
    reflexPropagation: true,
    nervousEventEmitter: true,
    nervousSnapshotEngine: true,
    nervousLiveMirror: true,
    nervousGpuPerformanceMirror: true,
    unifiedAdvantageField: true,
    cortexSync: true,
    brainSync: true,
    evolutionSync: true,

    advantageCascadeAware: true,
    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,
    coldStartAware: true,
    routeWarmthAware: true,
    impulseSpeedAware: true,
    impulseDensityAware: true,

    meshTierAware: true,
    longRangeAware: true,
    bluetoothPresenceAware: true,

    zeroConsole: false,
    zeroRouting: true,
    zeroMarketplace: true,
    zeroScoring: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroRandomness: true,
    zeroTimers: false,
    zeroAsync: false,
    zeroNetwork: true,
    zeroIO: true,
    zeroExternalMutation: true,
    zeroWindowMutation: true,
    zeroDOM: true,
    zeroGPUExecution: false,

    bandAware: true,
    waveFieldAware: true,
    binaryFieldAware: true,
    symbolicAware: true,
    binaryAware: true,
    dualBandAware: true,
    presenceAware: true,
    presenceFieldAware: true,

    worldLensAware: false
  }),

  contract: Object.freeze({
    input: [
      "ImpulseTraveler",
      "GpuNervousState",
      "BinaryPnsSnapshot",
      "DualBandContext",
      "AdvantageContext",
      "PresenceContext",
      "RouterMemoryPresenceField",
      "OuterAgentExperienceField",
      "MeshTierContext",
      "LongRangeContext",
      "BluetoothPresenceContext"
    ],
    output: [
      "PnsLiveSnapshot",
      "PnsGpuPerformanceSnapshot",
      "PnsNervousEvent",
      "PnsOneBandSignature",
      "PnsBinaryField",
      "PnsWaveField",
      "PnsPresenceField",
      "PnsAdvantageField",
      "PnsChunkCachePrewarmHints",
      "PnsImpulseSpeedField",
      "PnsMeshTierField",
      "PnsLongRangeField",
      "PnsBluetoothPresenceField",
      "PnsDiagnostics",
      "PnsHealingState"
    ]
  }),

  bands: Object.freeze({
    supported: ["one", "binary", "symbolic", "dual"],
    default: "one",
    behavior: "unified-oneband"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A-ONEBAND",
    baseline:
      "binary nervous math + symbolic nervous mirror + unified oneband field → CNS/PNS sync",
    adaptive:
      "binary-field + wave-field + presence overlays + GPU warmup surfaces + chunk/cache/prewarm hints + unified advantage + impulse-speed + mesh-tier/long-range/BLE fields",
    return:
      "deterministic nervous surfaces + signatures + unified advantage + hints + impulse-speed + mesh-tier/long-range/BLE"
  })
});

// ============================================================================
// DIAGNOSTIC LOGGING
// ============================================================================
export function nervousLog(stage, payload = {}) {
  const { log, nervous } = resolveLogger();
  try {
    const enabled =
      (typeof self !== "undefined" && PulseRealm.PULSE_NERVOUS_DIAGNOSTICS) ||
      false;

    if (!enabled) return;

    const ts = PulseRealm.PulseNOW;
    const safePayload =
      payload && typeof payload === "object"
        ? payload
        : { value: String(payload) };

    const packet = {
      layer: "PulseBandOne",
      stage,
      ts,
      ...safePayload
    };

    log("[ONEBAND:NERV]", JSON.stringify(packet));
    nervous(packet);

    try {
      const signals =
        (typeof self !== "undefined" && (PulseRealm.PulseSignals || resolveOrgan(null, "PulseSignals"))) ||
        null;
      if (signals && typeof signals.emit === "function") {
        signals.emit("pulseband.nervous", packet);
      }
    } catch {
      // never throw
    }
  } catch {
    // never throw
  }
}

// ============================================================================
// HELPERS
// ============================================================================
const nowMs = () => PulseRealm.PulseNOW.toMillis();

const safeSeconds = (v) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
};

const getSafeTimestamp = (status) => {
  if (status.lastSyncTimestamp != null) return status.lastSyncTimestamp;
  if (status.lastSyncSeconds != null)
    return nowMs() - status.lastSyncSeconds * 1000;
  return nowMs();
};

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 99991;
  }
  return `h${h}`;
}

// ============================================================================
// ONEBAND FIELD BUILDERS (semantics preserved from v35)
// ============================================================================
function buildOneBand() {
  return "one";
}

function buildOneBandSignature(band) {
  return computeHash(`PNS_ONEBAND::${band}`);
}

function buildBinaryField(latency, gpuReady) {
  const base = Number.isFinite(latency) ? Math.max(0, latency) : 0;
  const depth = gpuReady ? 6 : 4;
  const density = Math.min(2048, base + depth * 17);
  const surface = density + depth;
  return {
    binaryPhenotypeSignature: `oneband-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `oneband-binary-surface-${(surface * 19) % 99991}`,
    binarySurface: { depth, density, surface },
    parity: surface % 2,
    shiftDepth: Math.floor(Math.log2(surface || 1))
  };
}

function buildWaveField(latencyClass, networkHealth) {
  const key = `${latencyClass || "Unknown"}::${networkHealth || "Unknown"}`;
  const amplitude = 11 + (key.length % 11);
  const wavelength = amplitude + 13;
  const phase = (amplitude * 7) % 32;
  return {
    amplitude,
    wavelength,
    phase,
    band: "oneband-nervous",
    mode: "symbolic-wave",
    waveSignature: computeHash(`ONEBAND_WAVE::${key}::${amplitude}`)
  };
}

function buildPresenceField(connectivityMode, online, routerPresenceField, outerAgentPresenceField) {
  const focus =
    connectivityMode === "local"
      ? "local-focus"
      : connectivityMode === "online"
      ? "network-focus"
      : "auto-focus";

  const state = online ? "present" : "degraded";

  const routerState = (routerPresenceField && routerPresenceField.state) || "unknown";
  const outerState = (outerAgentPresenceField && outerAgentPresenceField.state) || "unknown";

  return {
    focus,
    state,
    routerState,
    outerAgentState: outerState,
    presenceSignature: computeHash(
      `ONEBAND_PRESENCE::${connectivityMode || "auto"}::${online ? "1" : "0"}::${routerState}::${outerState}`
    )
  };
}

function buildAdvantageFieldFromStatus(status, advantageContext = {}) {
  const latency = Number.isFinite(status.latency) ? status.latency : 0;
  const gpuReady = !!status.gpuReady;
  const online = !!status.online;

  const latencyScore =
    latency <= 0 ? 1.0 :
    latency < 60 ? 0.98 :
    latency < 120 ? 0.9 :
    latency < 250 ? 0.7 :
    latency < 450 ? 0.45 :
    0.25;

  const gpuScore = gpuReady ? 1.0 : 0.55;
  const connectivityScore = online ? 1.0 : 0.35;

  const baseAdvantage =
    latencyScore * 0.5 + gpuScore * 0.3 + connectivityScore * 0.2;

  const externalBoost =
    typeof advantageContext.externalBoost === "number"
      ? advantageContext.externalBoost
      : 0;

  const meshPressure =
    typeof advantageContext.meshPressure === "number"
      ? advantageContext.meshPressure
      : 0;

  const advantageScore = Math.max(
    0.1,
    Math.min(1.5, baseAdvantage + externalBoost + meshPressure * 0.1)
  );

  const timeSavedMs = Math.floor((1 - latencyScore) * 80);

  return {
    advantageScore,
    timeSavedMs,
    cascadeLevel: advantageContext.cascadeLevel || 0,
    field: "oneband-nervous",
    advantageSignature: computeHash(
      `ONEBAND_ADVANTAGE::${latency}::${gpuReady ? "1" : "0"}::${online ? "1" : "0"}::${advantageScore}`
    )
  };
}

function buildChunkCachePrewarmHints(status) {
  const latency = Number.isFinite(status.latency) ? status.latency : 0;
  const gpuReady = !!status.gpuReady;
  const online = !!status.online;

  const coldStart =
    latency <= 0 || (!gpuReady && latency > 220);

  const routeWarmth =
    coldStart ? "cold" :
    latency < 100 ? "warm" :
    latency < 220 ? "warming" :
    "hot";

  const chunkHint =
    coldStart ? "bootstrap-chunk" :
    latency > 260 ? "route-chunk" :
    latency > 140 ? "mesh-chunk" :
    "none";

  const cacheHint =
    coldStart ? "bootstrap-cache" :
    latency > 260 ? "route-cache" :
    latency > 140 ? "mesh-cache" :
    "none";

  const prewarmHint =
    !gpuReady || !online || coldStart || latency > 260;

  return {
    prewarmHint,
    chunkHint,
    cacheHint,
    routeWarmth,
    hintSignature: computeHash(
      `ONEBAND_HINTS::${latency}::${gpuReady ? "1" : "0"}::${online ? "1" : "0"}::${routeWarmth}`
    )
  };
}

function buildImpulseSpeedField(impulseStats) {
  const total = impulseStats.total || 0;
  const windowMs = impulseStats.windowMs || 1000;
  const hopsAvg = impulseStats.avgHops || 0;
  const maxDepth = impulseStats.maxDepth || 0;

  const impulsesPerSecond = windowMs > 0 ? (total * 1000) / windowMs : 0;

  let band = "idle";
  if (impulsesPerSecond > 200) band = "storm";
  else if (impulsesPerSecond > 80) band = "high";
  else if (impulsesPerSecond > 20) band = "active";
  else if (impulsesPerSecond > 0) band = "light";

  const density = Math.min(1, impulsesPerSecond / 250);
  const depthScore = Math.min(1, (hopsAvg + maxDepth) / 16);

  const advantage = (0.6 + density * 0.3 + depthScore * 0.1);

  return {
    impulsesPerSecond,
    windowMs,
    avgHops: hopsAvg,
    maxDepth,
    band,
    density,
    depthScore,
    advantage,
    impulseSpeedSignature: computeHash(
      `ONEBAND_IMPULSE_SPEED::${impulsesPerSecond}::${band}::${hopsAvg}::${maxDepth}`
    )
  };
}

function buildMeshTierField(meshTier = "host") {
  return {
    meshTier,
    meshTierSignature: computeHash(`ONEBAND_MESHTIER::${meshTier}`)
  };
}

function buildLongRangeField(longRangeCandidate = false, longRangeBias = 0) {
  const band =
    longRangeCandidate && longRangeBias > 0 ? "long-range-active" :
    longRangeCandidate ? "long-range-candidate" :
    "local";

  return {
    longRangeCandidate: !!longRangeCandidate,
    longRangeBias,
    band,
    longRangeSignature: computeHash(
      `ONEBAND_LONGRANGE::${longRangeCandidate ? "1" : "0"}::${longRangeBias}::${band}`
    )
  };
}

function buildBluetoothPresenceField(bluetoothPresence = null) {
  if (!bluetoothPresence) {
    return {
      deviceId: null,
      proximityTier: null,
      transport: null,
      linkQuality: null,
      bleSignature: computeHash("ONEBAND_BLE::none")
    };
  }

  const deviceId = bluetoothPresence.deviceId || null;
  const proximityTier = bluetoothPresence.proximityTier || null;
  const transport = bluetoothPresence.transport || null;
  const linkQuality = bluetoothPresence.linkQuality ?? null;

  return {
    deviceId,
    proximityTier,
    transport,
    linkQuality,
    bleSignature: computeHash(
      `ONEBAND_BLE::${deviceId || "none"}::${proximityTier || "none"}::${transport || "none"}`
    )
  };
}

// ============================================================================
// HEALING STATE — ONEBAND NERVOUS ROOT
// ============================================================================
const nervousHealingState = {
  ...PULSEBAND_ONE_CONTEXT_V40,
  lastUpdateTs: null,
  lastImpulseIntent: null,
  lastImpulseSpeedBand: "idle",
  lastAdvantageScore: 1.0,
  lastRouteWarmth: "cold",
  lastLatencyClass: "Unknown",
  lastNetworkHealth: "Unknown",
  lastMeshTier: "host",
  lastLongRangeBand: "local",
  lastBleProximity: null,
  cycleCount: 0
};

function updateNervousHealingState({ status, advantageField, impulseSpeedField, meshTierField, longRangeField, bleField }) {
  nervousHealingState.lastUpdateTs = nowMs();
  nervousHealingState.lastAdvantageScore =
    typeof advantageField.advantageScore === "number"
      ? advantageField.advantageScore
      : nervousHealingState.lastAdvantageScore;

  nervousHealingState.lastRouteWarmth =
    status.chunkCachePrewarmHints.routeWarmth ||
    nervousHealingState.lastRouteWarmth;

  nervousHealingState.lastLatencyClass =
    status.latencyClass || nervousHealingState.lastLatencyClass;

  nervousHealingState.lastNetworkHealth =
    status.networkHealth || nervousHealingState.lastNetworkHealth;

  nervousHealingState.lastImpulseSpeedBand =
    impulseSpeedField.band || nervousHealingState.lastImpulseSpeedBand;

  nervousHealingState.lastMeshTier =
    meshTierField.meshTier || nervousHealingState.lastMeshTier;

  nervousHealingState.lastLongRangeBand =
    longRangeField.band || nervousHealingState.lastLongRangeBand;

  nervousHealingState.lastBleProximity =
    bleField.proximityTier || nervousHealingState.lastBleProximity;

  nervousHealingState.cycleCount += 1;
}

export function getPulseBandOneHealingState() {
  return { ...nervousHealingState };
}

// ============================================================================
// RECURSION + SPEED GOVERNOR + SAFE NEBULA
// ============================================================================
const RecursionGovernor = (() => {
  let depth = 0;
  const maxDepth = 8;

  let windowStart = performance.now();
  let calls = 0;
  const windowMs = 1000;
  const maxCallsPerWindow = 800;

  function enter(label) {
    depth++;
    if (depth > maxDepth) {
      triggerSafeNebula(`depth:${depth}`, label);
      return false;
    }

    const now = performance.now();
    if (now - windowStart > windowMs) {
      windowStart = now;
      calls = 0;
    }
    calls++;
    if (calls > maxCallsPerWindow) {
      triggerSafeNebula(`rate:${calls}/window`, label);
      return false;
    }

    return true;
  }

  function exit() {
    if (depth > 0) depth--;
  }

  return { enter, exit };
})();

function triggerSafeNebula(reason, label) {
  const { error } = resolveLogger();
  try {
    error("PULSEBAND SAFE NEBULA TRIGGERED", { reason, label });
  } catch {}

  try {
    const cm = Core();
    if (cm) {
      cm.set?.("pulseband.safeNebula", {
        ts: PulseRealm.PulseNOW,
        reason,
        label
      });

      cm.router?.setRouteSnapshot?.({
        route: "SafeNebula",
        severity: "critical",
        reason,
        source: "PulseBandOne"
      });
    }
  } catch {}

  try {
    const root = typeof self !== "undefined" ? self : globalThis;
    const pb = root.PulsePulseBand;
    if (pb && pb.state && pb.engine && pb.connectivity) {
      pb.engine.pageEnabled = false;
      pb.engine.globalEnabled = false;
      pb.connectivity.mode = "local";
      pb.state.state = "SafeNebula";
      pb.state.route = "SafeNebula";
      pb.emit?.("safe-nebula", { reason, label });
    }
  } catch {}
}
  // ============================================================
  // MERGE ENGINE FOR PULSEBAND LAST SIGNAL
  // ============================================================
  function mergePulseBandLast(prev, incoming) {
    const p = prev || {};
    const i = incoming || {};

    return {
      id: i.id ?? p.id ?? "Pulse",
      time: i.time ?? p.time ?? PulseRealm.PulseNOW,
      source: i.source ?? p.source ?? "PulseBandOne",
      layer: i.layer ?? p.layer ?? "PULSEWORLD",
      type: i.type ?? p.type ?? "UPDATE",

      network: {
        bars: i.network?.bars ?? p.network?.bars ?? 0,
        route: i.network?.route ?? p.network?.route ?? "Primary",
        band: i.network?.band ?? p.network?.band ?? "Unknown",
        via: i.network?.via ?? p.network?.via ?? "Unknown",
        internetRole: i.network?.internetRole ?? p.network?.internetRole ?? "Unknown",
        season: i.network?.season ?? p.network?.season ?? "Unknown",
        nextWindow: i.network?.nextWindow ?? p.network?.nextWindow ?? "Unknown"
      },

      device: {
        bars: i.device?.bars ?? p.device?.bars ?? 0
      },

      stability: {
        score: i.stability?.score ?? p.stability?.score ?? 0
      },

      latency: {
        ms: i.latency?.ms ?? p.latency?.ms ?? 0
      },

      micro: {
        phase: i.micro?.phase ?? p.micro?.phase ?? "Idle"
      },

      sync: {
        ageLabel: i.sync?.ageLabel ?? p.sync?.ageLabel ?? "Just now"
      },

      efficiency: {
        label: i.efficiency?.label ?? p.efficiency?.label ?? "Balanced"
      },

      health: {
        label: i.health?.label ?? p.health?.label ?? "Excellent"
      },

      advantage: {
        multiplier: i.advantage?.multiplier ?? p.advantage?.multiplier ?? 1,
        percent: i.advantage?.percent ?? p.advantage?.percent ?? 0
      },

      state: i.state ?? p.state ?? "Active",
      phase: i.phase ?? p.phase ?? "Idle"
    };
  }

async function scanDeviceEnvironment() {
  const conn = navigator.connection || navigator.webkitConnection || navigator.mozConnection;
  const battery = navigator.getBattery ? await navigator.getBattery() : null;

  // RAF smoothness
  const rafSamples = [];
  let last = performance.now();
  for (let i = 0; i < 30; i++) {
    await new Promise(resolve => {
      requestAnimationFrame(ts => {
        rafSamples.push(ts - last);
        last = ts;
        resolve();
      });
    });
  }
  const rafAvg = rafSamples.reduce((a,b)=>a+b,0) / rafSamples.length;
  const rafSmoothness = Math.max(0, Math.min(100, 100 - Math.abs(rafAvg - 16.6)));

  return {
    connection: {
      effectiveType: conn?.effectiveType ?? "unknown",
      downlink: conn?.downlink ?? 0,
      rtt: conn?.rtt ?? 0,
      saveData: conn?.saveData ?? false,
      online: navigator.onLine
    },

    device: {
      cores: navigator.hardwareConcurrency ?? null,
      memory: navigator.deviceMemory ?? null,
      userAgent: navigator.userAgent ?? null
    },

    battery: battery ? {
      level: battery.level,
      charging: battery.charging
    } : null,

    raf: {
      smoothness: rafSmoothness,
      avgFrame: rafAvg
    }
  };
}
function scanPulseWorld(pulseband) {
  return {
    pulsebandBars: pulseband.state.live.pulsebandBars ?? 0,
    phoneBars: pulseband.state.live.phoneBars ?? 0,
    latency: pulseband.state.live.latency ?? 0,
    latencyClass: pulseband.state.live.latencyClass ?? "Unknown",
    networkHealth: pulseband.state.live.networkHealth ?? "Unknown",
    microWindowActive: pulseband.state.live.microWindowActive ?? false,
    route: pulseband.state.live.route ?? "Primary",
    state: pulseband.state.live.state ?? "Idle",
    efficiency: pulseband.state.live.efficiency ?? 100,
    phoneKbps: pulseband.state.live.phoneKbps ?? 0,
    appKbps: pulseband.state.live.appKbps ?? 0,

    gpu: pulseband.state.gpuPerformance ?? {},

    waveField: pulseband.state.waveField ?? null,
    binaryField: pulseband.state.binaryField ?? null,
    presenceField: pulseband.state.presenceField ?? null,
    advantageField: pulseband.state.advantageField ?? null,
    impulseSpeedField: pulseband.state.impulseSpeedField ?? null,
    meshTierField: pulseband.state.meshTierField ?? null,
    longRangeField: pulseband.state.longRangeField ?? null,
    bluetoothPresenceField: pulseband.state.bluetoothPresenceField ?? null,

    driftScore: pulseband.state.snapshot?.driftScore ?? 0,
    reflexScore: pulseband.state.snapshot?.reflexScore ?? 1
  };
}
async function scanPulseEnvironment(pulseband) {
  const device = await scanDeviceEnvironment();
  const pulse = scanPulseWorld(pulseband);

  return {
    id: "PulseEnv",
    type: "ENVIRONMENT",
    source: "PulseBandOne",
    layer: "PULSEWORLD",
    time: PulseRealm.PulseNOW,

    device,
    pulse
  };
}

// ============================================================================
// FACTORY — PULSEBAND ONE v40 (UPGRADED — FULL LAST_SIGNAL SUPPORT)
// ============================================================================
export function createPulseBandOne({
  PulseGPUOverride,
  ImpulseOverride,
  ImpulseStrategyOverride,
  PNSBinaryOverride,
  CheckRouterMemoryOverride,
  ProxyContextOverride,
  ProxyFrontOverride,
  ProxyOuterAgentOverride
} = {}) {

  const { log } = resolveLogger();

  // Resolve organs
  const PulseGPU =
    PulseGPUOverride ||
    PulseGPUAstralNervousSystem ||
    resolveOrgan(null, "PulseGPUAstralNervousSystem");

  const Impulse =
    ImpulseOverride ||
    PulseProxyImpulse ||
    resolveOrgan(null, "PulseProxyImpulse");

  const ImpulseStrategy =
    ImpulseStrategyOverride ||
    PulseProxyImpulseStrategy ||
    resolveOrgan(null, "PulseProxyImpulseStrategy");

  const PNSBinary =
    PNSBinaryOverride ||
    PulseProxyPNSNervousSystemBinary ||
    resolveOrgan(null, "PulseProxyPNSNervousSystemBinary");

  const CheckRouterMemory =
    CheckRouterMemoryOverride ||
    PulseOSCheckRouterMemory ||
    resolveOrgan(null, "PulseOSCheckRouterMemory");

  const PulseProxyContextResolved =
    ProxyContextOverride ||
    PulseProxyContext ||
    resolveOrgan(null, "PulseProxyContext");

  const PulseProxyFrontResolved =
    ProxyFrontOverride ||
    PulseProxyFront ||
    resolveOrgan(null, "PulseProxyFront");

  const PulseProxyOuterAgentResolved =
    ProxyOuterAgentOverride ||
    PulseProxyOuterAgent ||
    resolveOrgan(null, "PulseProxyOuterAgent");

  // ============================================================
  // CREATE PULSEBAND ONE ORGAN
  // ============================================================
  const pulseband = {
    meta: {
      ...PULSEBAND_ONE_CONTEXT_V40,
      meta: PulseBandOneMeta,
      version: "v40-ImmortalHybrid",
      band: "one",
      bandId: PulseRealm.ONE_BAND.id || "PulseBand"
    },

    PulseBandLastSignal: null,

    listeners: {},
    on(event, handler) {
      if (!this.listeners[event]) this.listeners[event] = [];
      this.listeners[event].push(handler);
    },
    off(event, handler) {
      if (!this.listeners[event]) return;
      this.listeners[event] = this.listeners[event].filter((h) => h !== handler);
    },

    emit(event, payload) {
      const list = this.listeners[event] || [];

      // 🔥 FILTER OUT SESSION FLOW EVENTS
      const sessionFlowTypes = ["start", "next", "ack", "request"];
      if (sessionFlowTypes.includes(payload?.type)) {
        for (const h of list) {
          try { h(payload); } catch {}
        }
        return;
      }

      // 🔥 BUILD FULL SIGNAL FROM PULSEBAND STATE
      const fullSignal = {
        id: payload.id || event,
        type: payload.type || "PulseBand",
        source: "PulseBandOne",
        layer: "PULSEWORLD",
        time: PulseRealm.PulseNOW,

        network: {
          bars: this.state.pulsebandBars ?? this.state.live.pulsebandBars ?? 0,
          route: this.state.route ?? this.state.live.route ?? "Primary",
          band: this.state.band ?? this.meta.bandId ?? "Unknown",
          via: this.state.via ?? "mesh",
          internetRole: this.state.internetRole ?? "unused",
          season: this.state.orbital?.season ?? "neutral",
          nextWindow: this.state.orbital?.nextContactWindow ?? null
        },

        device: {
          bars: this.state.phoneBars ?? this.state.live.phoneBars ?? 0
        },

        stability: {
          score: this.state.stability?.score ?? 0
        },

        latency: {
          ms: this.state.latency ?? this.state.live.latency ?? 0
        },

        micro: {
          phase: this.state.micro?.phase ?? "Idle"
        },

        sync: {
          ageLabel: this.state.sync?.ageLabel ?? "Just now"
        },

        efficiency: {
          label: this.state.efficiency?.label ?? "Balanced"
        },

        health: {
          label: this.state.health?.label ?? "Excellent"
        },

        advantage: {
          multiplier: this.state.advantage?.multiplier ?? 1,
          percent: this.state.advantage?.percent ?? 0
        },

        state: this.state.state ?? this.state.live.state ?? "Active",
        phase: this.state.phase ?? "Idle"
      };

      // 🔥 MERGE INTO PulseBandLastSignal
      this.PulseBandLastSignal = mergePulseBandLast(PulseRealm.__PULSE_LAST_SIGNAL__, fullSignal);

      // 🔥 Emit into PulseSignals
      try {
        if (PulseRealm.PulseSignals?.emit) {
          PulseRealm.PulseSignals.emit("pulseband:update", PulseRealm.__PULSE_LAST_SIGNAL__);
        }
      } catch {}

      // 🔥 Update global LAST_SIGNAL
      try {
        PulseRealm.__PULSE_LAST_SIGNAL__ = this.PulseBandLastSignal;
      } catch {}

      // 🔥 Fire listeners (if any)
      for (const h of list) {
        try { h(fullSignal); } catch {}
      }
    },

    // ============================================================
    // GPU, ENGINE, CONNECTIVITY, STATUS, SESSION FLOW
    // (UNCHANGED LOGIC — BUT NOW ALL EMIT() CALLS UPDATE LAST_SIGNAL)
    // ============================================================

    gpu: {
      ready: false,
      packages: null,
      warmupScore: 0,
      thermalState: "Unknown"
    },

    engine: {
      initialized: false,
      pageEnabled: true,
      globalEnabled: true,
      reflexMode: "auto",
      cortexLinked: false
    },

    connectivity: {
      mode: "auto",
      online: true,
      source: "unknown",
      lastLatencySpike: null,
      spikeCount: 0
    },

    impulseStats: {
      windowMs: 2000,
      total: 0,
      avgHops: 0,
      maxDepth: 0
    },

    pulseStatus: {
      lastPulseTs: null,
      lastPulseOk: false,
      lastError: null,
      lastMeshReach: null,
      lastDeviceId: null
    },

    state: {
      live: {
        pulsebandBars: 0,
        phoneBars: 0,
        latency: 0,
        latencyClass: "Unknown",
        networkHealth: "Unknown",
        microWindowActive: false,
        lastUpdateTimestamp: 0,
        lastSyncTimestamp: null,
        lastSyncSeconds: 0,
        route: "Primary",
        state: "Idle",
        efficiency: 100,
        efficiencyMode: null,
        phoneKbps: 0,
        appKbps: 0
      },
      snapshot: {
        advantage: 1.0,
        timeSaved: 0,
        lastUpdateTimestamp: 0,
        driftScore: 0,
        reflexScore: 1.0
      },
      gpuPerformance: {
        warm: false,
        smoothness: 0,
        pacing: "Unknown",
        stalls: 0,
        efficiency: 100,
        load: 0,
        frameBudget: 16.6,
        frameVariance: 0
      },
      latency: 0,
      latencyClass: "Unknown",
      networkHealth: "Unknown",
      microWindowActive: false,
      lastSyncTimestamp: null,
      lastSyncSeconds: 0,
      route: "Primary",
      state: "Idle",
      efficiency: 100,
      efficiencyMode: null,
      phoneKbps: 0,
      appKbps: 0,
      pulsebandBars: 0,
      phoneBars: 0,
      advantage: 1.0,
      timeSaved: 0,
      connectivityMode: "auto",
      online: true,
      band: "one",
      bandSignature: null,
      binaryField: null,
      waveField: null,
      presenceField: null,
      advantageField: null,
      chunkCachePrewarmHints: null,
      impulseSpeedField: null,
      meshTierField: null,
      longRangeField: null,
      bluetoothPresenceField: null
    },

    // ============================================================
    // STATUS UPDATE (UNCHANGED LOGIC — EMIT() NOW UPDATES LAST_SIGNAL)
    // ============================================================
    setStatus(partial = {}) {
      const now = nowMs();
      const live = {
        ...this.state.live,
        ...(partial.live || {})
      };

      live.lastUpdateTimestamp = now;
      if (live.lastSyncTimestamp == null) {
        live.lastSyncTimestamp = getSafeTimestamp(live);
      }
      live.lastSyncSeconds = safeSeconds((now - live.lastSyncTimestamp) / 1000);

      this.state.live = live;

      this.state.latency = live.latency;
      this.state.latencyClass = live.latencyClass;
      this.state.networkHealth = live.networkHealth;
      this.state.microWindowActive = !!live.microWindowActive;
      this.state.lastSyncTimestamp = live.lastSyncTimestamp;
      this.state.lastSyncSeconds = live.lastSyncSeconds;
      this.state.route = live.route;
      this.state.state = live.state;
      this.state.efficiency = live.efficiency;
      this.state.efficiencyMode = live.efficiencyMode;
      this.state.phoneKbps = live.phoneKbps;
      this.state.appKbps = live.appKbps;
      this.state.pulsebandBars = live.pulsebandBars;
      this.state.phoneBars = live.phoneBars;

      const status = {
        latency: this.state.latency,
        latencyClass: this.state.latencyClass,
        networkHealth: this.state.networkHealth,
        online: this.state.online,
        gpuReady: this.gpu.ready,
        chunkCachePrewarmHints: this.state.chunkCachePrewarmHints || {}
      };

      const band = buildOneBand();
      const bandSignature = buildOneBandSignature(band);
      const binaryField = buildBinaryField(status.latency, status.gpuReady);
      const waveField = buildWaveField(status.latencyClass, status.networkHealth);
      const presenceField = buildPresenceField(
        this.state.connectivityMode || this.connectivity.mode,
        this.state.online,
        partial.routerPresenceField || null,
        partial.outerAgentPresenceField || null
      );
      const advantageField = buildAdvantageFieldFromStatus(
        status,
        partial.advantageContext || {}
      );
      const chunkCachePrewarmHints = buildChunkCachePrewarmHints(status);
      const impulseSpeedField = buildImpulseSpeedField(this.impulseStats);
      const meshTierField = buildMeshTierField(
        (partial.meshTierContext && partial.meshTierContext.meshTier) || "host"
      );
      const longRangeField = buildLongRangeField(
        !!(partial.longRangeContext && partial.longRangeContext.longRangeCandidate),
        (partial.longRangeContext && partial.longRangeContext.longRangeBias) || 0
      );
      const bluetoothPresenceField = buildBluetoothPresenceField(
        partial.bluetoothPresenceContext || null
      );

      this.state.band = band;
      this.state.bandSignature = bandSignature;
      this.state.binaryField = binaryField;
      this.state.waveField = waveField;
      this.state.presenceField = presenceField;
      this.state.advantageField = advantageField;
      this.state.chunkCachePrewarmHints = chunkCachePrewarmHints;
      this.state.impulseSpeedField = impulseSpeedField;
      this.state.meshTierField = meshTierField;
      this.state.longRangeField = longRangeField;
      this.state.bluetoothPresenceField = bluetoothPresenceField;

      this.state.snapshot.advantage = advantageField.advantageScore;
      this.state.snapshot.timeSaved = advantageField.timeSavedMs;
      this.state.snapshot.lastUpdateTimestamp = now;

      updateNervousHealingState({
        status: {
          ...status,
          chunkCachePrewarmHints
        },
        advantageField,
        impulseSpeedField,
        meshTierField,
        longRangeField,
        bleField: bluetoothPresenceField
      });

      try {
        const cm = Core();
        if (cm && cm.set) {
          cm.set("pulseband.status", {
            ts: now,
            state: this.state,
            healing: getPulseBandOneHealingState()
          });
        }
      } catch {}

      this.emit("status", { ts: now, state: this.state });
    },

    // ============================================================
    // GPU INIT, ENGINE INIT, CONNECTIVITY, PULSE SUCCESS/FAILURE
    // (UNCHANGED LOGIC — EMIT() NOW UPDATES LAST_SIGNAL)
    // ============================================================

    async initGraphics(rawAssets = {}) {
      if (!RecursionGovernor.enter("initGraphics")) return;
      try {
        nervousLog("GPU_INIT_CALLED");
        if (!PulseGPU || !PulseGPU.BrainInput || !PulseGPU.PulseGPUBrainExport) {
          nervousLog("GPU_INIT_MISSING_GPU_ORGAN");
          return;
        }
        const input = PulseGPU.BrainInput({
          rawTextures: rawAssets.textures || [],
          rawMeshes: rawAssets.meshes || [],
          rawAnimations: rawAssets.animations || [],
          rawShaders: rawAssets.shaders || [],
          rawScenes: rawAssets.scenes || []
        });
        const packages = PulseGPU.PulseGPUBrainExport.buildAndStore(input);
        this.gpu.packages = packages;
        this.gpu.ready = !!packages;
        this.gpu.warmupScore = packages ? 1.0 : 0.0;
        nervousLog("GPU_INIT_READY", { gpuReady: this.gpu.ready });
      } catch (err) {
        this.gpu.ready = false;
        this.gpu.warmupScore = 0;
        nervousLog("GPU_INIT_FAILED", { error: String(err) });
      } finally {
        RecursionGovernor.exit();
      }
    },

    async initEngine() {
      if (!RecursionGovernor.enter("initEngine")) return;
      try {
        if (this.engine.initialized) {
          nervousLog("ENGINE_INIT_SKIPPED", { initialized: true });
          return;
        }
        nervousLog("ENGINE_INIT_START");
        this.engine.initialized = true;
        this.setStatus({
          live: {
            latency: 1,
            networkHealth: "Excellent",
            latencyClass: "Excellent",
            state: "Warm",
            route: "Pulse"
          }
        });
        nervousLog("ENGINE_INIT_READY", { initialized: true });
      } finally {
        RecursionGovernor.exit();
      }
    },

    enableForPage() {
      if (!RecursionGovernor.enter("enableForPage")) return;
      try {
        nervousLog("PAGE_ENABLE");
        this.engine.pageEnabled = true;
        this.emit("page-toggle", { pageEnabled: true });
      } finally {
        RecursionGovernor.exit();
      }
    },

    disableForPage() {
      if (!RecursionGovernor.enter("disableForPage")) return;
      try {
        nervousLog("PAGE_DISABLE");
        this.engine.pageEnabled = false;
        this.emit("page-toggle", { pageEnabled: false });
      } finally {
        RecursionGovernor.exit();
      }
    },

    setConnectivityMode(mode) {
      if (!RecursionGovernor.enter("setConnectivityMode")) return;
      try {
        if (!["auto", "online", "local"].includes(mode)) return;
        this.connectivity.mode = mode;
        this.state.connectivityMode = mode;
        nervousLog("CONNECTIVITY_MODE_SET", { mode });
        this.emit("connectivity-mode-change", { mode });
      } finally {
        RecursionGovernor.exit();
      }
    },

    setConnectivity({ online, source = "manual" } = {}) {
      if (!RecursionGovernor.enter("setConnectivity")) return;
      try {
        if (typeof online !== "boolean") return;
        this.connectivity.online = online;
        this.connectivity.source = source;
        this.state.online = online;
        nervousLog("CONNECTIVITY_STATE_SET", { online, source });
        this.emit("connectivity-change", {
          online,
          source,
          mode: this.connectivity.mode
        });
      } finally {
        RecursionGovernor.exit();
      }
    },

    receivePulseSendResult(resultPacket = {}) {
      if (!RecursionGovernor.enter("receivePulseSendResult")) return;
      try {
        const hops = Array.isArray(resultPacket.impulse && resultPacket.impulse.path)
          ? resultPacket.impulse.path.length
          : 0;
        const depth = (resultPacket.impulse && resultPacket.impulse.depth) || hops || 0;
        const prevTotal = this.impulseStats.total || 0;
        const prevAvg = this.impulseStats.avgHops || 0;
        const newAvg = (prevAvg * prevTotal + hops) / (prevTotal + 1 || 1);
        this.impulseStats.total = prevTotal + 1;
        this.impulseStats.avgHops = newAvg;
        this.impulseStats.maxDepth = Math.max(
          this.impulseStats.maxDepth || 0,
          depth
        );
        this.emit("pulse-send-result", resultPacket);
      } catch (err) {
        nervousLog("PULSEBAND_RECEIVE_PULSE_SEND_RESULT_ERROR", {
          error: String(err)
        });
      } finally {
        RecursionGovernor.exit();
      }
    },

    onPulseSuccess(payload = {}) {
      if (!RecursionGovernor.enter("onPulseSuccess")) return;
      try {
        const ts = nowMs();
        this.pulseStatus.lastPulseTs = ts;
        this.pulseStatus.lastPulseOk = true;
        this.pulseStatus.lastError = null;
        this.pulseStatus.lastMeshReach =
          payload.meshReach || this.pulseStatus.lastMeshReach || null;
        this.pulseStatus.lastDeviceId =
          payload.deviceId || this.pulseStatus.lastDeviceId || null;
        this.setConnectivity({ online: true, source: "pulse" });
        this.emit("pulse-success", { ts, payload });
    } finally {
      RecursionGovernor.exit();
    }
    },

    // ------------------------------------------------------------------------
    // PULSE FAILURE
    // ------------------------------------------------------------------------
    onPulseFailure(reason = "unknown") {
      if (!RecursionGovernor.enter("onPulseFailure")) return;
      try {
        const ts = nowMs();
        this.pulseStatus.lastPulseTs = ts;
        this.pulseStatus.lastPulseOk = false;
        this.pulseStatus.lastError = reason;

        this.emit("pulse-failure", { ts, reason });
      } finally {
        RecursionGovernor.exit();
      }
    },

    start(options = {}) {
      if (!RecursionGovernor.enter("start")) return null;
      try {
        const sessionId = crypto.randomUUID();
        scanPulseEnvironment(this).then(env => {
          this.emit("environment", env);
        });
        this.emit("request", {
          type: "start",
          userId: options.userId || "anonymous",
          sessionId,
          band: this.meta.bandId
        });
      

        return sessionId;
      } finally {
        RecursionGovernor.exit();
      }
    },

    getState() {
      return this.state;
    },

    next(sessionId, userId) {
      if (!RecursionGovernor.enter("next")) return;
      try {
        if (!sessionId) return;

        // 🔥 SCAN ENVIRONMENT
        const env = scanPulseEnvironment(this);

        // 🔥 EMIT FULL SIGNAL
        this.emit("environment", env);

        this.emit("request", {
          type: "next",
          sessionId,
          userId: userId || "anonymous",
          band: this.meta.bandId
        });
      } finally {
        RecursionGovernor.exit();
      }
    },

    ack(sessionId, userId, ackToken) {
      if (!RecursionGovernor.enter("ack")) return;
      try {
        if (!sessionId) return;

        // 🔥 SCAN ENVIRONMENT
        const env = scanPulseEnvironment(this);

        // 🔥 EMIT FULL SIGNAL
        this.emit("environment", env);

        this.emit("request", {
          type: "ack",
          sessionId,
          userId: userId || "anonymous",
          ackToken: ackToken || null,
          band: this.meta.bandId
        });
      } finally {
        RecursionGovernor.exit();
      }
    }
  };

  // ---------------------------------------------------------------------------
  // GLOBAL SPINE BINDING
  // ---------------------------------------------------------------------------
  try {
    const root = typeof self !== "undefined" ? self : globalThis;
    root.PulsePulseBand = pulseband;
  } catch {}

  return pulseband;
}

// ============================================================================
// GLOBAL PULSEBAND (AUTO-CREATED, SINGLETON, PAGE-WIDE)
// ============================================================================
// PHASE 1 — Minimal shell immediately
const pulsebandShell = {
  listeners: {},
  state: {},
  live: {},
  meta: { bandId: "PULSEWORLD" },
  PulseBandLastSignal: null,

  async init() {
    // Shell initialization placeholder (hydrated later)
  },

  getState() {
    return this.state;
  },

  on(event, handler) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(handler);
  },

  off(event, handler) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter((h) => h !== handler);
  },

  emit(event, payload) {
    const list = this.listeners[event] || [];

    // 🔥 FILTER OUT SESSION FLOW EVENTS
    const sessionFlowTypes = ["start", "next", "ack", "request"];
    if (sessionFlowTypes.includes(payload?.type)) {
      for (const h of list) {
        try { h(payload); } catch {}
      }
      return;
    }

    // If we don't have state yet (pre‑hydrate), just forward payload
    if (!this.state || !this.live) {
      for (const h of list) {
        try { h(payload); } catch {}
      }
      return;
    }

    // 🔥 BUILD FULL SIGNAL FROM PULSEBAND STATE
    const fullSignal = {
      id: payload?.id || event || "PulseBand",
      type: payload?.type || "PulseBand",
      source: "PulseBandOne",
      layer: "PULSEWORLD",
      time: PulseRealm.PulseNOW,

      network: {
        bars: this.state.pulsebandBars ?? this.state.live.pulsebandBars ?? 0,
        route: this.state.route ?? this.state.live.route ?? "Primary",
        band: this.state.band ?? this.meta.bandId ?? "Unknown",
        via: this.state.via ?? "mesh",
        internetRole: this.state.internetRole ?? "unused",
        season: this.state.orbital?.season ?? "neutral",
        nextWindow: this.state.orbital?.nextContactWindow ?? null
      },

      device: {
        bars: this.state.phoneBars ?? this.state.live.phoneBars ?? 0
      },

      stability: {
        score: this.state.stability?.score ?? 0
      },

      latency: {
        ms: this.state.latency ?? this.state.live.latency ?? 0
      },

      micro: {
        phase: this.state.micro?.phase ?? "Idle"
      },

      sync: {
        ageLabel: this.state.sync?.ageLabel ?? "Just now"
      },

      efficiency: {
        label: this.state.efficiency?.label ?? "Balanced"
      },

      health: {
        label: this.state.health?.label ?? "Excellent"
      },

      advantage: {
        multiplier: this.state.advantage?.multiplier ?? 1,
        percent: this.state.advantage?.percent ?? 0
      },

      state: this.state.state ?? this.state.live.state ?? "Active",
      phase: this.state.phase ?? "Idle"
    };

    // 🔥 MERGE INTO PulseBandLastSignal
    this.PulseBandLastSignal = mergePulseBandLast(PulseRealm.__PULSE_LAST_SIGNAL__, fullSignal);

    // 🔥 Emit into PulseSignals
    try {
      if (PulseRealm.PulseSignals?.emit) {
        PulseRealm.PulseSignals.emit("pulseband:update", this.PulseBandLastSignal);
      }
    } catch {}

    // 🔥 Update global LAST_SIGNAL
    try {
      PulseRealm.__PULSE_LAST_SIGNAL__ = this.PulseBandLastSignal;
    } catch {}

    // 🔥 Fire listeners
    for (const h of list) {
      try { h(fullSignal); } catch {}
    }
  },

  start(options = {}) {
    if (!RecursionGovernor.enter("start")) return null;
    try {
      const sessionId = crypto.randomUUID();

      // 🔥 SCAN ENVIRONMENT (if available)
      if (typeof scanPulseEnvironment === "function") {
        scanPulseEnvironment(this).then(env => {
          this.emit("environment", env);
        }).catch(() => {});
      }

      // 🔥 SESSION FLOW (still filtered in emit)
      this.emit("request", {
        type: "start",
        userId: options.userId || "anonymous",
        sessionId,
        band: this.meta.bandId
      });

      return sessionId;
    } finally {
      RecursionGovernor.exit();
    }
  }
};


// Attach shell IMMEDIATELY so Portal can call .on()
PulseRealm.PulseBand = pulsebandShell;

// Export the shell as the public pulseband
export const pulseband = pulsebandShell;


// ============================================================================
// PHASE 2 — Hydrate the shell AFTER all modules load
// ============================================================================
queueMicrotask(() => {
  const full = createPulseBandOne();   // your full factory

  // Copy all fields from full PulseBand into the shell
  Object.assign(pulsebandShell, full);
  
  // Keep the same reference so Portal listeners remain intact
  PulseRealm.PulseBand = pulsebandShell;
});


// Optional: keep a default export too if any legacy code used it
export default pulseband;
