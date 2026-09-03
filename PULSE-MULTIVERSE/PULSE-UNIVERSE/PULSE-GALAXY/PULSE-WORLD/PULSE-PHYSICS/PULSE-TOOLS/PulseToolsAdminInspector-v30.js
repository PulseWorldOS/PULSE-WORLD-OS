// ============================================================================
// FILE: /OS/Scanner/PulseAdminInspector-v30-Immortal-GPU+-CI-Delta.js
// PULSE OS — v30‑IMMORTAL‑GPU+‑CI‑DELTA
// ADMIN INSPECTOR ORGAN — MULTI‑MODE (BINARY | ENV | PRESENCE | GPU | CI | DELTA | HYBRID)
// ============================================================================
// ROLE (v30‑IMMORTAL):
//   - Inspect ALL layers (body/home/town/node/kitchen/crab/etc).
//   - Mode "binary": strict binary anomaly detection (symbolic only).
//   - Mode "environment": physical/environmental anomaly detection.
//   - Mode "presence": detect presence‑voids, spikes, shadows, echoes, fractals.
//   - Mode "gpu": symbolic GPU pressure/warp/thermal anomaly detection (NO heavy compute).
//   - Mode "ci": CI‑surface instability, persona collapse, flakiness fields.
//   - Mode "delta": binary‑delta anomaly scoring (symbolic only).
//   - Mode "hybrid": combine all modes with dual‑band weighting.
//   - Detect anomalies in density/contrast/wave/energy/loop/spin/presence/gpu/ci/delta.
//   - Multi‑spin + multi‑sentinel interference analysis.
//   - NodeAdmin‑IMMORTAL harmonic lattice drift detection.
//   - Presence‑wave coupling collapse + fractal collapse detection.
//   - Provide attention scores + repair hints + escalation vectors.
//   - Tier‑aware escalation (Proxy → Mesh → NodeAdmin‑EVO → PresenceCore).
//   - ZERO randomness. ZERO mutation of inputs. PURE symbolic inspection.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝



// ============================================================================
// META (v30)
// ============================================================================

export const PulseAdminInspectorMeta = Object.freeze({
  version: "30.0-IMMORTAL-GPU+-CI-DELTA",
  id: "PulseAdminInspector",
  role: "ADMIN INSPECTOR ORGAN",
  modes: [
    "binary",
    "environment",
    "presence",
    "gpu",
    "ci",
    "delta",
    "hybrid"
  ],
  guarantees: {
    randomness: "ZERO",
    mutation: "NONE",
    compute: "SYMBOLIC_ONLY"
  },
  notes: [
    "Multi-layer anomaly inspector (body/home/town/node/etc).",
    "Symbolic GPU/CI/delta analysis with no heavy compute.",
    "Tier-aware escalation: Proxy → Mesh → NodeAdmin-EVO → PresenceCore."
  ]
});

// ============================================================================
// INTERNAL HELPERS
// ============================================================================

function clamp01(v) {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

const avg = (arr) =>
  arr && arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

const flattenGrid = (grid) => {
  if (!Array.isArray(grid) || !grid.length || !Array.isArray(grid[0])) return [];
  const out = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      out.push(grid[y][x]);
    }
  }
  return out;
};

// ============================================================================
// ARTERY METRICS (symbolic, window‑safe)
// ============================================================================

const inspectorArtery = {
  inspections: 0,
  lastMode: null,
  lastFlagCount: 0,
  presenceOps: 0,
  gpuOps: 0,
  ciOps: 0,
  deltaOps: 0,
  harmonicOps: 0,
  waveOps: 0,
  binaryOps: 0,
  environmentOps: 0
};

function bumpArtery(kind, flagsCount) {
  inspectorArtery.inspections += 1;
  inspectorArtery.lastMode = kind;
  inspectorArtery.lastFlagCount = flagsCount;

  if (kind === "presence") inspectorArtery.presenceOps += 1;
  if (kind === "gpu") inspectorArtery.gpuOps += 1;
  if (kind === "ci") inspectorArtery.ciOps += 1;
  if (kind === "delta") inspectorArtery.deltaOps += 1;
  if (kind === "harmonic") inspectorArtery.harmonicOps += 1;
  if (kind === "wave") inspectorArtery.waveOps += 1;
  if (kind === "binary") inspectorArtery.binaryOps += 1;
  if (kind === "environment") inspectorArtery.environmentOps += 1;
}

export function snapshotAdminInspectorArtery() {
  const load = clamp01(inspectorArtery.inspections / 8192);
  const pressure = clamp01(inspectorArtery.lastFlagCount / 256);

  const loadBucket =
    load >= 0.9
      ? "saturated"
      : load >= 0.7
      ? "high"
      : load >= 0.4
      ? "medium"
      : load > 0
      ? "low"
      : "idle";

  const pressureBucket =
    pressure >= 0.9
      ? "overload"
      : pressure >= 0.7
      ? "high"
      : pressure >= 0.4
      ? "medium"
      : pressure > 0
      ? "low"
      : "none";

  return Object.freeze({
    ...inspectorArtery,
    load,
    loadBucket,
    pressure,
    pressureBucket
  });
}

// ============================================================================
// PRESENCE ANOMALIES (v30, symbolic)
// ============================================================================

function detectPresence(grid, layer, mode) {
  if (mode !== "presence" && mode !== "hybrid") return [];

  const flags = [];
  const flat = flattenGrid(grid);
  if (!flat.length) return flags;

  const presences = flat.map((c) => c.presence ?? 0);
  const p = avg(presences);

  if (p < 0.05) {
    flags.push({
      type: "presence-void",
      layer,
      severity: "high",
      hint: "increase-presence-density"
    });
  }

  if (p > 0.92) {
    flags.push({
      type: "presence-spike",
      layer,
      severity: "medium",
      hint: "redistribute-presence"
    });
  }

  const variance = avg(presences.map((v) => Math.abs(v - p)));
  if (variance > 0.35) {
    flags.push({
      type: "presence-shadow",
      layer,
      severity: "medium",
      hint: "smooth-presence-field"
    });
  }

  if (flat.some((c) => c.tags.includes("presence-echo"))) {
    flags.push({
      type: "presence-echo",
      layer,
      severity: "low",
      hint: "monitor-echo-patterns"
    });
  }

  const highCells = presences.filter((v) => v > 0.8).length;
  const lowCells = presences.filter((v) => v < 0.1).length;
  const ratio = flat.length ? (highCells + lowCells) / flat.length : 0;
  if (ratio > 0.85) {
    flags.push({
      type: "presence-fractal-collapse",
      layer,
      severity: "high",
      hint: "reseed-midrange-presence"
    });
  }

  return flags;
}

// ============================================================================
// NODEADMIN‑IMMORTAL HARMONIC LATTICE DRIFT (v30)
// ============================================================================

function detectHarmonics(harmonics, mode) {
  if (!harmonics || !harmonics.length) return [];
  if (mode !== "environment" && mode !== "hybrid" && mode !== "presence") return [];

  const drift = avg(harmonics.map((h) => Math.abs(h.phaseDrift ?? 0)));
  const lattice = avg(harmonics.map((h) => Math.abs(h.latticeDrift ?? 0)));

  const flags = [];

  if (drift > 0.18) {
    flags.push({
      type: "harmonic-drift",
      severity: "medium",
      hint: "re-align-nodeadmin-phase"
    });
  }

  if (lattice > 0.22) {
    flags.push({
      type: "harmonic-lattice-drift",
      severity: "high",
      hint: "rebuild-harmonic-lattice"
    });
  }

  return flags;
}

// ============================================================================
// PRESENCE‑WAVE COUPLING + COLLAPSE (v30)
// ============================================================================

function detectPresenceWaveCoupling(history, mode) {
  if (!Array.isArray(history) || history.length < 6) return [];
  if (mode !== "presence" && mode !== "hybrid") return [];

  const last = history.slice(-6);
  const weak = last.every(
    (h) => (h.wave ?? 0) < 0.05 && (h.presence ?? 0) < 0.05
  );

  const flags = [];

  if (weak) {
    flags.push({
      type: "presence-wave-collapse",
      severity: "high",
      hint: "inject-wave-or-presence"
    });
  }

  const oscillation = last.map((h) => (h.wave ?? 0) - (h.presence ?? 0));
  const oscAvg = avg(oscillation);
  const oscVar = avg(oscillation.map((v) => Math.abs(v - oscAvg)));
  if (oscVar > 0.4) {
    flags.push({
      type: "presence-wave-desync",
      severity: "medium",
      hint: "re-sync-presence-wave-coupling"
    });
  }

  return flags;
}

// ============================================================================
// GPU ANOMALIES (symbolic, NO heavy compute)
// ============================================================================

function detectGPU(gpuStats, mode) {
  if (mode !== "gpu" && mode !== "hybrid") return [];
  if (!gpuStats) return [];

  const {
    utilization = 0, // 0–1
    memoryPressure = 0, // 0–1
    temperature = 0, // C
    warpDivergence = 0 // 0–1
  } = gpuStats;

  const flags = [];

  if (utilization > 0.95 && memoryPressure > 0.85) {
    flags.push({
      type: "gpu-saturation",
      severity: "high",
      hint: "offload-noncritical-work-to-cpu-or-idle"
    });
  }

  if (warpDivergence > 0.6) {
    flags.push({
      type: "gpu-warp-divergence",
      severity: "medium",
      hint: "simplify-kernels-or-rebalance-workloads"
    });
  }

  if (temperature > 85) {
    flags.push({
      type: "gpu-thermal-risk",
      severity: "medium",
      hint: "reduce-gpu-duty-cycle-or-improve-cooling"
    });
  }

  if (utilization < 0.05 && memoryPressure < 0.05) {
    flags.push({
      type: "gpu-underutilized",
      severity: "low",
      hint: "consider-prewarm-or-advantage-mapping"
    });
  }

  return flags;
}

// ============================================================================
// CI SURFACE ANOMALIES (symbolic)
// ============================================================================

function detectCI(ciSurface, mode) {
  if (mode !== "ci" && mode !== "hybrid") return [];
  if (!ciSurface) return [];

  const {
    flakinessScore = 0, // 0–1
    failureRate = 0, // 0–1
    mode: ciMode = "unknown",
    personaStable = true
  } = ciSurface;

  const flags = [];

  if (flakinessScore > 0.6 || failureRate > 0.4) {
    flags.push({
      type: "ci-instability",
      severity: "medium",
      ciMode,
      hint: "stabilize-tests-or-reduce-scope"
    });
  }

  if (!personaStable) {
    flags.push({
      type: "ci-persona-collapse",
      severity: "high",
      ciMode,
      hint: "lock-ci-persona-and-freeze-config"
    });
  }

  return flags;
}

// ============================================================================
// BINARY‑DELTA ANOMALIES (symbolic only)
// ============================================================================

function detectBinaryDelta(deltaPacket, mode) {
  if (mode !== "delta" && mode !== "hybrid" && mode !== "binary") return [];
  if (!deltaPacket || !deltaPacket.delta) return [];

  const { addedCount = 0, removedCount = 0, unchangedCount = 0 } =
    deltaPacket.delta;

  const total = addedCount + removedCount + unchangedCount || 1;
  const changeRatio = (addedCount + removedCount) / total;

  const flags = [];

  if (changeRatio > 0.9 && total > 1024) {
    flags.push({
      type: "binary-delta-overwrite",
      severity: "high",
      hint: "verify-delta-source-and-rollback-if-unexpected"
    });
  } else if (changeRatio > 0.6) {
    flags.push({
      type: "binary-delta-heavy-change",
      severity: "medium",
      hint: "run-shadow-logger-and-compare-snapshots"
    });
  }

  if (unchangedCount === 0 && total > 0) {
    flags.push({
      type: "binary-delta-no-stable-core",
      severity: "medium",
      hint: "ensure-core-binary-surfaces-remain-stable"
    });
  }

  return flags;
}

// ============================================================================
// BINARY / ENVIRONMENT / WAVE / LOOP / SPIN / ENERGY (symbolic stubs, v30)
// ============================================================================

function detectBinary(bits, mode) {
  if (mode !== "binary" && mode !== "hybrid" && mode !== "delta") return [];
  if (!bits || typeof bits !== "string") return [];

  const len = bits.length;
  if (!len) return [];

  const ones = [...bits].filter((b) => b === "1").length;
  const ratio = ones / len;

  const flags = [];

  if (ratio < 0.05 || ratio > 0.95) {
    flags.push({
      type: "binary-imbalance",
      severity: "low",
      hint: "check-entropy-or-source"
    });
  }

  return flags;
}

function detectEnvironment(env, mode) {
  if (mode !== "environment" && mode !== "hybrid") return [];
  if (!env) return [];

  const { temperature = 0, humidity = 0, noise = 0 } = env;
  const flags = [];

  if (temperature > 40) {
    flags.push({
      type: "env-overheat",
      severity: "medium",
      hint: "cool-environment"
    });
  }

  if (humidity > 0.9) {
    flags.push({
      type: "env-humidity-risk",
      severity: "low",
      hint: "dehumidify-environment"
    });
  }

  if (noise > 0.8) {
    flags.push({
      type: "env-noise-interference",
      severity: "low",
      hint: "reduce-noise-or-shield-signals"
    });
  }

  return flags;
}

function detectWaveCollapse(waveHistory, mode) {
  if (!Array.isArray(waveHistory) || !waveHistory.length) return [];
  if (mode !== "environment" && mode !== "hybrid" && mode !== "presence") return [];

  const last = waveHistory.slice(-8);
  const avgWave = avg(last.map((w) => w.amplitude ?? 0));

  const flags = [];
  if (avgWave < 0.03) {
    flags.push({
      type: "wave-collapse",
      severity: "medium",
      hint: "reintroduce-wave-sources"
    });
  }

  return flags;
}

function detectLoop(loopHistory, mode) {
  if (!Array.isArray(loopHistory) || !loopHistory.length) return [];
  if (mode !== "environment" && mode !== "hybrid") return [];

  const last = loopHistory.slice(-10);
  const stuck = last.every((l) => l.state === "same");

  return stuck
    ? [
        {
          type: "loop-stuck",
          severity: "medium",
          hint: "introduce-perturbation-or-break-loop"
        }
      ]
    : [];
}

function detectSpin(spins, mode) {
  if (!Array.isArray(spins) || !spins.length) return [];
  if (mode !== "environment" && mode !== "hybrid") return [];

  const imbalance = avg(spins.map((s) => Math.abs(s.spin ?? 0)));
  if (imbalance > 0.8) {
    return [
      {
        type: "spin-imbalance",
        severity: "low",
        hint: "rebalance-spin-vectors"
      }
    ];
  }
  return [];
}

function detectEnergy(nodeEnergy, mode) {
  if (!nodeEnergy) return [];
  if (mode !== "environment" && mode !== "hybrid") return [];

  const { level = 0, volatility = 0 } = nodeEnergy;
  const flags = [];

  if (level < 0.1) {
    flags.push({
      type: "energy-low",
      severity: "medium",
      hint: "increase-energy-input"
    });
  }

  if (volatility > 0.7) {
    flags.push({
      type: "energy-volatility",
      severity: "medium",
      hint: "stabilize-energy-sources"
    });
  }

  return flags;
}

// ============================================================================
// MULTI‑SENTINEL INTERFERENCE (v30)
// ============================================================================

function detectMultiSentinelInterference(spins, harmonics, mode) {
  if (mode !== "environment" && mode !== "hybrid" && mode !== "presence") return [];
  if (!Array.isArray(spins) || !Array.isArray(harmonics)) return [];

  const spinCount = spins.length;
  const harmonicCount = harmonics.length;

  if (spinCount < 2 || harmonicCount < 2) return [];

  const avgSpin = avg(spins.map((s) => Math.abs(s.spin ?? 0)));
  const avgPhase = avg(harmonics.map((h) => Math.abs(h.phaseDrift ?? 0)));

  if (avgSpin > 0.6 && avgPhase > 0.15) {
    return [
      {
        type: "multi-sentinel-interference",
        severity: "medium",
        hint: "reduce-sentinel-density-or-desync-phases"
      }
    ];
  }

  return [];
}

// ============================================================================
// TIER ESCALATION (v30)
// ============================================================================

function escalate(flags, { fallbackProxy, fallbackMesh, fallbackNode, fallbackPresenceCore }) {
  if (!flags.length) return;

  const high = flags.some((f) => f.severity === "high");
  const med = flags.some((f) => f.severity === "medium");

  if (high && fallbackPresenceCore.exchange) {
    return fallbackPresenceCore.exchange(flags);
  }

  if (high && fallbackNode.exchange) {
    return fallbackNode.exchange(flags);
  }

  if (med && fallbackMesh.exchange) {
    return fallbackMesh.exchange(flags);
  }

  if (fallbackProxy.exchange) {
    return fallbackProxy.exchange(flags);
  }
}

// ============================================================================
// PUBLIC FACTORY — v30‑IMMORTAL‑GPU+‑CI‑DELTA
// ============================================================================

export function createPulseAdminInspector({
  fallbackProxy,
  fallbackMesh,
  fallbackNode,
  fallbackPresenceCore,
  trace = false
} = {}) {
  const allowedModes = [
    "binary",
    "environment",
    "presence",
    "gpu",
    "ci",
    "delta",
    "hybrid"
  ];

  let mode = "environment";

  function setMode(m) {
    mode = allowedModes.includes(m) ? m : "environment";
    if (trace) console.log("[AdminInspector‑v30] mode:", mode);
  }

  function inspectAll({
    body,
    home,
    town,
    node,
    bits,
    spins,
    loopHistory,
    waveHistory,
    nodeEnergy,
    harmonics,
    presenceHistory,
    environment,
    gpuStats,
    ciSurface,
    binaryDeltaPacket
  }) {
    let flags = [];

    flags.push(...detectPresence(body, "body", mode));
    flags.push(...detectPresence(home, "home", mode));
    flags.push(...detectPresence(town, "town", mode));
    flags.push(...detectPresence(node, "node", mode));

    flags.push(...detectHarmonics(harmonics, mode));
    flags.push(...detectPresenceWaveCoupling(presenceHistory, mode));
    flags.push(...detectGPU(gpuStats, mode));
    flags.push(...detectCI(ciSurface, mode));
    flags.push(...detectBinaryDelta(binaryDeltaPacket, mode));

    flags.push(...detectBinary(bits, mode));
    flags.push(...detectEnvironment(environment, mode));
    flags.push(...detectWaveCollapse(waveHistory, mode));
    flags.push(...detectLoop(loopHistory, mode));
    flags.push(...detectSpin(spins, mode));
    flags.push(...detectEnergy(nodeEnergy, mode));

    flags.push(...detectMultiSentinelInterference(spins, harmonics, mode));

    bumpArtery(mode, flags.length);
    escalate(flags, { fallbackProxy, fallbackMesh, fallbackNode, fallbackPresenceCore });

    if (trace) console.log("[AdminInspector‑v30] flags:", flags);

    return flags;
  }

  return {
    meta: PulseAdminInspectorMeta,
    setMode,
    inspectAll,
    snapshotArtery: snapshotAdminInspectorArtery
  };
}

export default {
  Meta: PulseAdminInspectorMeta,
  createPulseAdminInspector,
  snapshotAdminInspectorArtery
};

export function EvolutionAdminInspectorTools(config = {}) {
  const instance = createPulseAdminInspector(config);

  return Object.freeze({
    meta: instance.meta,
    setMode: instance.setMode,
    inspectAll: instance.inspectAll,
    snapshotArtery: instance.snapshotArtery
  });
}

// ============================================================================
// ORGAN EXPORT (IMMORTAL)
// ============================================================================

export const PulseAdminInspector = Object.freeze({
  Meta: PulseAdminInspectorMeta,

  // canonical organ factory
  create(config = {}) {
    return createPulseAdminInspector(config);
  },

  // STATIC INSPECT FUNCTION (IMMORTAL)
  inspect(state, context = {}) {
    const instance = createPulseAdminInspector({});
    return instance.inspectAll({
      body: state.body,
      home: state.home,
      town: state.town,
      node: state.node,
      bits: state.bits,
      spins: state.spins,
      loopHistory: state.loopHistory,
      waveHistory: state.waveHistory,
      nodeEnergy: state.nodeEnergy,
      harmonics: state.harmonics,
      presenceHistory: state.presenceHistory,
      environment: context.environment,
      gpuStats: context.gpuStats,
      ciSurface: context.ciSurface,
      binaryDeltaPacket: context.binaryDeltaPacket
    });
  },

  // STATIC INSPECT-ALL (direct passthrough)
  inspectAll(input) {
    const instance = createPulseAdminInspector({});
    return instance.inspectAll(input);
  },

  // STATIC SETMODE
  setMode(mode) {
    const instance = createPulseAdminInspector({});
    return instance.setMode(mode);
  },

  // artery snapshot
  snapshotArtery() {
    return snapshotAdminInspectorArtery();
  }
});

PulseRealm.ToolsAdminInspector = {
  PulseAdminInspector,
  createPulseAdminInspector,
  snapshotAdminInspectorArtery,
  PulseAdminInspectorMeta,
  detectEnvironment
}