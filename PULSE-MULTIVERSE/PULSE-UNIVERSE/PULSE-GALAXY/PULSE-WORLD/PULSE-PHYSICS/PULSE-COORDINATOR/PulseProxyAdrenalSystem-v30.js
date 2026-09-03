// ============================================================================
//  PulseProxyAdrenalSystem-v30-IMMORTAL+++.js
//  ADRENAL SYSTEM — v30 IMMORTAL+++ ONEBAND
//  Tri‑Environment + Mesh + GPU + Earn + Presence Stress Fusion
//  Dynamic ONEBAND Reflex • Instance Orchestrator • Advantage‑Aware
//  v30++: Backend + Device + Browser, Proxy‑Mode/Pulse‑Pal aware, dual‑band
//         → unified ONEBAND field, presence/mesh/earn/gpu overlays,
//         cache/prewarm/chunk/remember hints (metadata‑only).
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
//  ROLE:
//    - Fight‑or‑flight reflex organ for Pulse‑Earn / Pulse‑Proxy / Pulse‑Pal.
//    - Scales worker “cells” based on tri‑environment + mesh + earn + gpu stress.
//    - Emits ONEBAND surfaces: oneBandSignature, oneBandBinaryField, oneBandWaveField,
//      oneBandPresenceField, oneBandAdvantageField, oneBandImpulseSpeedField.
//    - Dynamic ONEBAND: band is always "one", but diagnostics expose sub‑modes.
//    - Tri‑environment stress: cortex (backend), somatic (device), sensory (browser).
//    - Extended stress: meshTier, earnMode, gpuReady, longRange, bluetooth presence.
//    - Max‑dominant fusion: finalStress = max(all stress contributors).
//    - Backend‑only core logic (no Date.now inside math), accepts external stress.
// ============================================================================


//
//  SAFETY CONTRACT (v30 IMMORTAL+++):
//  ---------------------------------
//  • No routing decisions.
//  • No network fetches here (db is injected/global).
//  • No randomness; all fields deterministic from inputs + cycle counters.
//  • No mutation outside module‑local state and db writes.
//  • ONEBAND surfaces are metadata‑only, replayable, drift‑proof.
// ============================================================================


import { PulseVitalsLogger as logger, PulseVitalsMonitor, pulseLog, PulseUIFlow as initUIFlow, db, setdoc, getdoc, doc, log, warn, error} from "../../../../../_PROOF/PULSE-PROOF.js";

// ============================================================================
//  ORCHESTRATOR MODES
// ============================================================================
export const ORCHESTRATOR_MODES = {
  NORMAL: "normal",
  EARN_STRESS: "earn-stress",
  DRAIN: "drain"
};

// ============================================================================
//  PHYSIOLOGICAL LIMITS (INSTANCE CAPS)
// ============================================================================
export const NORMAL_MAX     = 4;
export const UPGRADED_MAX   = 8;
export const HIGHEND_MAX    = 8;
export const TEST_EARN_MAX  = 16;

export const UPGRADED_MULT  = 2;
export const HIGHEND_MULT   = 2;
export const EARN_MODE_MULT = 1.5;

// v30++: ONEBAND stress multiplier ranges
export const ONEBAND_STRESS_MIN_MULT = 0.75;
export const ONEBAND_STRESS_MAX_MULT = 2.5;

export const ENABLE_INSTANCE_LOGGING = true;
export const INSTANCE_LOG_COLLECTION = "UserInstanceLogs";

// ============================================================================
//  ADRENAL CONTEXT META — v30 IMMORTAL+++ ONEBAND
// ============================================================================
export const ADRENAL_CONTEXT = Object.freeze({
  layer: "AdrenalSystem",
  role: "ONEBAND_STRESS_ORCHESTRATOR",
  version: "v30-IMMORTAL+++",
  mode: "oneband",
  target: "full-os",
  selfRepairable: true,
  evo: {
    triEnvAware: true,
    meshTierAware: true,
    earnAware: true,
    gpuAware: true,
    longRangeAware: true,
    bluetoothPresenceAware: true,

    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    driftProof: true,
    multiInstanceReady: true,
    parallelSafe: true,

    unifiedAdvantageField: true,
    deterministicField: true,
    futureEvolutionReady: true,

    bandAware: true,
    oneBandAware: true,
    presenceAware: true,
    impulseSpeedAware: true
  }
});

// ============================================================================
//  INTERNAL STATE — Active “cells” per user
// ============================================================================
const activeWorkers = new Map(); // userId -> worker[]

let adrenalSeq = 0;
let adrenalCycle = 0;

// ============================================================================
//  HELPERS — deterministic hash
// ============================================================================
function hashString(raw) {
  let acc = 0;
  const s = String(raw || "");
  for (let i = 0; i < s.length; i++) {
    acc = (acc + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return acc;
}

// ============================================================================
//  TRI‑ENV + EXTENDED STRESS FIELD + ONEBAND SURFACES
// ============================================================================

function buildTriEnvStressField({ cortexStress, somaticStress, sensoryStress }) {
  const c = typeof cortexStress === "number" ? Math.max(0, cortexStress) : 0;
  const s = typeof somaticStress === "number" ? Math.max(0, somaticStress) : 0;
  const y = typeof sensoryStress === "number" ? Math.max(0, sensoryStress) : 0;

  const finalStress = Math.max(c, s, y);
  const dominantSource =
    finalStress === c ? "cortex" :
    finalStress === s ? "somatic" :
    finalStress === y ? "sensory" :
    "none";

  return {
    cortexStress: c,
    somaticStress: s,
    sensoryStress: y,
    finalStress,
    dominantSource
  };
}

function buildExtendedStressField({
  triEnv,
  meshTier,
  earnMode,
  gpuReady,
  longRangeCandidate,
  bluetoothPresence
}) {
  const meshPressure =
    meshTier === "relay"      ? 0.8 :
    meshTier === "satellite"  ? 0.6 :
    meshTier === "host"       ? 0.3 :
                                0.2;

  const earnPressure = earnMode ? 0.6 : 0.1;

  const gpuPressure = gpuReady ? 0.25 : 0.7;

  const longRangePressure = longRangeCandidate ? 0.5 : 0.15;

  const btPressure =
    bluetoothPresence && bluetoothPresence.linkQuality != null
      ? Math.max(0, Math.min(1, 1 - bluetoothPresence.linkQuality))
      : 0.2;

  const contributors = [
    triEnv.finalStress,
    meshPressure,
    earnPressure,
    gpuPressure,
    longRangePressure,
    btPressure
  ];

  const finalStress = Math.max(...contributors);
  const clamped = Math.max(0, Math.min(1, finalStress));

  return {
    meshTier,
    earnMode,
    gpuReady,
    longRangeCandidate,
    bluetoothPresence: !!bluetoothPresence,
    meshPressure,
    earnPressure,
    gpuPressure,
    longRangePressure,
    btPressure,
    finalStress: clamped
  };
}

// ONEBAND band is always "one", but we keep a diagnostic sub‑mode
function computeOneBandMode(extended) {
  const s = extended.finalStress;

  if (s >= 0.75) return "one-binary";
  if (s >= 0.45) return "one-dual";
  if (s >= 0.25) return "one-symbolic";
  return "one-idle";
}

function buildOneBandSignature(oneBandMode, triEnv, extended) {
  const raw = `ADRENAL_ONEBAND::${oneBandMode}::${triEnv.dominantSource}::${extended.meshTier}::${extended.earnMode ? "earn" : "noearn"}`;
  const acc = hashString(raw);
  return `adrenal-oneband-${acc}`;
}

function buildOneBandBinaryField(extended) {
  const level = extended.finalStress;
  const basePattern = 16;
  const patternLen = basePattern + Math.floor(level * 24);
  const density = patternLen + Math.floor(level * 64);
  const surface = density + patternLen;

  return {
    binaryPhenotypeSignature: `adrenal-one-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `adrenal-one-binary-surface-${(surface * 11) % 99991}`,
    binarySurface: { patternLen, density, surface },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildOneBandWaveField(extended, oneBandMode) {
  const level = extended.finalStress;
  const ampBase =
    oneBandMode === "one-binary"   ? 12 :
    oneBandMode === "one-dual"     ? 9  :
    oneBandMode === "one-symbolic" ? 7  :
                                     4;

  const amplitude = level * 24 + ampBase;
  const wavelength = amplitude + 6;
  const phase = amplitude % 32;

  return {
    amplitude,
    wavelength,
    phase,
    band: "one",
    mode: oneBandMode
  };
}

function buildAdrenalCycleSignature(cycle) {
  return `adrenal-oneband-cycle-${(cycle * 7919) % 99991}`;
}

function buildOneBandPresenceField(triEnv, extended, oneBandMode) {
  const level = extended.finalStress;

  const presenceBandState =
    level > 0.8 ? "deep-presence" :
    level > 0.5 ? "stable-presence" :
    level > 0.2 ? "light-presence" :
                  "idle-presence";

  const harmonicDrift = Math.max(0, Math.min(1, level));

  const coherenceScore = Math.max(
    0.2,
    Math.min(1.0, 0.7 + level * 0.2 - level * 0.1)
  );

  const pulsePrewarm =
    oneBandMode === "one-binary" || oneBandMode === "one-dual"
      ? "preferred"
      : "optional";

  const pulseCacheMode =
    level >= 0.5 ? "stress-cache" : "normal-cache";

  const pulseChunkMode =
    level > 0.6 ? "multi-chunk" : "single-chunk";

  const pulseRemember =
    level >= 0.3 ? "remember-strong" : "remember-weak";

  const dualBandMode =
    oneBandMode === "one-binary" ? "binary" :
    oneBandMode === "one-dual"   ? "dual"   :
                                   "symbolic";

  return {
    presenceBandState,
    harmonicDrift,
    coherenceScore,
    pulsePrewarm,
    pulseCacheMode,
    pulseChunkMode,
    pulseRemember,
    dualBandMode,
    triEnv: {
      cortexStress: triEnv.cortexStress,
      somaticStress: triEnv.somaticStress,
      sensoryStress: triEnv.sensoryStress,
      dominantSource: triEnv.dominantSource
    },
    extended: {
      meshTier: extended.meshTier,
      earnMode: extended.earnMode,
      gpuReady: extended.gpuReady,
      longRangeCandidate: extended.longRangeCandidate,
      bluetoothPresence: extended.bluetoothPresence
    }
  };
}

function buildOneBandAdvantageField(extended) {
  const s = extended.finalStress;

  // Lower stress → higher advantage (more headroom)
  const stressPenalty = s;
  const baseAdvantage = 1.1 - stressPenalty * 0.6;

  const meshBoost =
    extended.meshTier === "relay"     ? 0.05 :
    extended.meshTier === "satellite" ? 0.03 :
                                        0.0;

  const earnBoost = extended.earnMode ? 0.07 : 0.0;
  const gpuBoost  = extended.gpuReady ? 0.05 : -0.05;

  const rawScore = baseAdvantage + meshBoost + earnBoost + gpuBoost;
  const advantageScore = Math.max(0.2, Math.min(1.3, rawScore));

  const cascadeLevel =
    s > 0.8 ? 2 :
    s > 0.4 ? 1 :
              0;

  const timeSavedMs = Math.floor((1 - s) * 120);

  return {
    advantageScore,
    timeSavedMs,
    cascadeLevel,
    field: "adrenal-oneband",
    advantageSignature: `adrenal-one-adv-${hashString(
      `${advantageScore}::${cascadeLevel}::${extended.meshTier}::${extended.earnMode ? "earn" : "noearn"}`
    )}`
  };
}

function buildOneBandImpulseSpeedField(extended, { totalImpulses, avgHops, maxDepth }) {
  const total = totalImpulses || 0;
  const hopsAvg = avgHops || 0;
  const depth = maxDepth || 0;

  // Interpret stress as “pressure” on impulse flow
  const impulsesPerSecond = total; // caller can normalize window externally

  let band = "idle";
  if (impulsesPerSecond > 200) band = "storm";
  else if (impulsesPerSecond > 80) band = "high";
  else if (impulsesPerSecond > 20) band = "active";
  else if (impulsesPerSecond > 0) band = "light";

  const density = Math.min(1, impulsesPerSecond / 250);
  const depthScore = Math.min(1, (hopsAvg + depth) / 16);

  const advantage = 0.6 + density * 0.25 + depthScore * 0.15;

  return {
    impulsesPerSecond,
    avgHops: hopsAvg,
    maxDepth: depth,
    band,
    density,
    depthScore,
    advantage,
    impulseSpeedSignature: `adrenal-one-impulse-${hashString(
      `${impulsesPerSecond}::${band}::${hopsAvg}::${depth}`
    )}`
  };
}

// ============================================================================
//  DEVICE TIER → MAX INSTANCES
// ============================================================================
function getDeviceMax(deviceTier, testEarnActive, orchestratorMode) {
  if (orchestratorMode === ORCHESTRATOR_MODES.DRAIN) return 1;
  if (testEarnActive) return TEST_EARN_MAX;

  switch (deviceTier) {
    case "upgraded": return UPGRADED_MAX;
    case "highend":  return HIGHEND_MAX;
    default:         return NORMAL_MAX;
  }
}

// ============================================================================
//  COMPUTE FINAL INSTANCE COUNT — v30 IMMORTAL+++ ONEBAND
// ============================================================================
function computeFinalInstances(base, deviceTier, earnMode, testEarnActive, orchestratorMode, extendedStress) {
  const safeBase = base && base > 0 ? base : 1;
  let final = safeBase;

  if (orchestratorMode === ORCHESTRATOR_MODES.DRAIN) {
    final = 1;
  } else {
    if (deviceTier === "upgraded") final *= UPGRADED_MULT;
    if (deviceTier === "highend")  final *= HIGHEND_MULT;

    if (earnMode) final = Math.floor(final * EARN_MODE_MULT);

    if (orchestratorMode === ORCHESTRATOR_MODES.EARN_STRESS) {
      final = Math.max(final, safeBase * 2);
    }

    if (testEarnActive) final = TEST_EARN_MAX;

    // v30++: ONEBAND stress multiplier
    const s = extendedStress.finalStress;
    const stressMult =
      ONEBAND_STRESS_MIN_MULT +
      (ONEBAND_STRESS_MAX_MULT - ONEBAND_STRESS_MIN_MULT) * s;

    final = Math.floor(final * stressMult);
  }

  const max = getDeviceMax(deviceTier, testEarnActive, orchestratorMode);
  const clamped = Math.max(1, Math.min(final, max));

  return {
    finalInstances: clamped,
    maxAllowed: max
  };
}

// ============================================================================
//  LOG USER SNAPSHOT — deterministic (no Date.now in math)
// ============================================================================
async function logUserInstanceSnapshot(userId, snapshot) {
  if (!ENABLE_INSTANCE_LOGGING || !db || !db.collection) return;

  try {
    await db.collection(INSTANCE_LOG_COLLECTION).add({
      ...ADRENAL_CONTEXT,
      userId,
      seq: ++adrenalSeq,
      ...snapshot
    });
  } catch (err) {
    logger.error("adrenal", "snapshot_log_failed", { error: String(err) });
  }
}

// ============================================================================
//  LAUNCH / KILL WORKERS
// ============================================================================
function launchWorker(userId, workerIndex, orchestratorMode, oneBandMode) {
  const workerName = `${userId}-instance-${workerIndex}`;

  logger.log("adrenal", "launch", {
    userId,
    workerName,
    workerIndex,
    mode: orchestratorMode,
    oneBandMode,
    context: ADRENAL_CONTEXT,
    seq: ++adrenalSeq
  });

  return {
    name: workerName,
    userId,
    index: workerIndex,
    mode: orchestratorMode,
    oneBandMode,
    seq: adrenalSeq
  };
}

function killWorker(worker) {
  if (!worker) return;

  logger.log("adrenal", "shutdown", {
    worker: worker.name,
    userId: worker.userId,
    index: worker.index,
    mode: worker.mode,
    oneBandMode: worker.oneBandMode,
    seq: ++adrenalSeq
  });
}

// ============================================================================
//  MAIN ORCHESTRATOR LOOP — v30 IMMORTAL+++ ONEBAND
// ============================================================================
//
//  runInstanceOrchestrator({
//    mode,
//    cortexStress,
//    somaticStress,
//    sensoryStress,
//    meshTier,
//    earnMode,
//    gpuReady,
//    longRangeCandidate,
//    bluetoothPresence,
//    impulseStats: { total, avgHops, maxDepth }
//  })
//
export async function runInstanceOrchestrator(pulse) {
  adrenalCycle++;

  const requestedMode = pulse.mode;
  const orchestratorMode =
    requestedMode && Object.values(ORCHESTRATOR_MODES).includes(requestedMode)
      ? requestedMode
      : ORCHESTRATOR_MODES.NORMAL;

  const cortexStress  = typeof pulse.cortexStress  === "number" ? pulse.cortexStress  : 0;
  const somaticStress = typeof pulse.somaticStress === "number" ? pulse.somaticStress : 0;
  const sensoryStress = typeof pulse.sensoryStress === "number" ? pulse.sensoryStress : 0;

  const meshTier          = pulse.meshTier || "host"; // host | satellite | relay
  const earnMode          = !!pulse.earnMode;
  const gpuReady          = !!pulse.gpuReady;
  const longRangeCandidate = !!pulse.longRangeCandidate;
  const bluetoothPresence = pulse.bluetoothPresence || null;

  const triEnvStressField = buildTriEnvStressField({
    cortexStress,
    somaticStress,
    sensoryStress
  });

  const extendedStressField = buildExtendedStressField({
    triEnv: triEnvStressField,
    meshTier,
    earnMode,
    gpuReady,
    longRangeCandidate,
    bluetoothPresence
  });

  const oneBandMode = computeOneBandMode(extendedStressField);
  const oneBandSignature = buildOneBandSignature(oneBandMode, triEnvStressField, extendedStressField);
  const oneBandBinaryField = buildOneBandBinaryField(extendedStressField);
  const oneBandWaveField = buildOneBandWaveField(extendedStressField, oneBandMode);
  const oneBandPresenceField = buildOneBandPresenceField(triEnvStressField, extendedStressField, oneBandMode);
  const adrenalCycleSignature = buildAdrenalCycleSignature(adrenalCycle);

  const impulseStats = pulse.impulseStats || {};
  const oneBandImpulseSpeedField = buildOneBandImpulseSpeedField(
    extendedStressField,
    {
      totalImpulses: impulseStats.total || 0,
      avgHops: impulseStats.avgHops || 0,
      maxDepth: impulseStats.maxDepth || 0
    }
  );

  const oneBandAdvantageField = buildOneBandAdvantageField(extendedStressField);

  logger.log("adrenal", "tick_start", {
    ...ADRENAL_CONTEXT,
    pulseId: pulse.jobId || pulse.id || null,
    pulseLineage: pulse.lineage || null,
    pulseMode: orchestratorMode,
    adrenalCycleSignature,

    cortexStress,
    somaticStress,
    sensoryStress,
    triEnvStressField,

    meshTier,
    earnMode,
    gpuReady,
    longRangeCandidate,
    bluetoothPresence: !!bluetoothPresence,
    extendedStressField,

    oneBandMode,
    oneBandSignature,
    oneBandBinaryField,
    oneBandWaveField,
    oneBandPresenceField,
    oneBandAdvantageField,
    oneBandImpulseSpeedField,

    seq: ++adrenalSeq
  });

  if (!db || !db.collection) {
    logger.error("adrenal", "no_db_available", {});
    return false;
  }

  const snap = await db.collection("UserScores").get();

  for (const doc of snap.docs) {
    const userId = doc.id;
    const data = doc.data() || {};

    const baseInstances   = data.instances ?? 1;
    const deviceTier      = data.deviceTier ?? "normal";
    const userEarnMode    = data.earnMode ?? false;
    const testEarnActive  = data.testEarnActive ?? false;

    const {
      finalInstances,
      maxAllowed
    } = computeFinalInstances(
      baseInstances,
      deviceTier,
      userEarnMode,
      testEarnActive,
      orchestratorMode,
      extendedStressField
    );

    if (!activeWorkers.has(userId)) {
      activeWorkers.set(userId, []);
    }

    const currentWorkers = activeWorkers.get(userId);

    logger.log("adrenal", "state", {
      userId,
      baseInstances,
      deviceTier,
      earnMode: userEarnMode,
      testEarnActive,
      current: currentWorkers.length,
      final: finalInstances,
      maxAllowed,
      mode: orchestratorMode,

      meshTier,
      triEnvStressField,
      extendedStressField,

      oneBandMode,
      oneBandSignature,
      oneBandBinaryField,
      oneBandWaveField,
      oneBandPresenceField,
      oneBandAdvantageField,
      oneBandImpulseSpeedField,

      seq: ++adrenalSeq
    });

    // SCALE UP
    if (currentWorkers.length < finalInstances) {
      const needed = finalInstances - currentWorkers.length;

      logger.log("adrenal", "scale_up", {
        userId,
        needed,
        from: currentWorkers.length,
        to: finalInstances,
        mode: orchestratorMode,
        oneBandMode,
        extendedStressField,
        seq: ++adrenalSeq
      });

      for (let i = 0; i < needed; i++) {
        const workerIndex = currentWorkers.length;
        const worker = launchWorker(userId, workerIndex, orchestratorMode, oneBandMode);
        currentWorkers.push(worker);
      }
    }

    // SCALE DOWN
    if (currentWorkers.length > finalInstances) {
      const extra = currentWorkers.length - finalInstances;

      logger.log("adrenal", "scale_down", {
        userId,
        extra,
        from: currentWorkers.length,
        to: finalInstances,
        mode: orchestratorMode,
        oneBandMode,
        extendedStressField,
        seq: ++adrenalSeq
      });

      for (let i = 0; i < extra; i++) {
        const worker = currentWorkers.pop();
        killWorker(worker);
      }
    }

    // SNAPSHOT
    await logUserInstanceSnapshot(userId, {
      baseInstances,
      finalInstances,
      deviceTier,
      earnMode: userEarnMode,
      testEarnActive,
      currentWorkers: currentWorkers.length,
      maxAllowed,
      mode: orchestratorMode,

      meshTier,
      triEnvStressField,
      extendedStressField,

      oneBandMode,
      oneBandSignature,
      oneBandBinaryField,
      oneBandWaveField,
      oneBandPresenceField,
      oneBandAdvantageField,
      oneBandImpulseSpeedField
    });
  }

  logger.log("adrenal", "tick_complete", {
    mode: orchestratorMode,
    adrenalCycleSignature,
    triEnvStressField,
    extendedStressField,
    oneBandMode,
    oneBandSignature,
    seq: ++adrenalSeq
  });

  return true;
}

PulseRealm.AdrenalSystem = {
  runInstanceOrchestrator,
  logUserInstanceSnapshot,
  ADRENAL_CONTEXT,
  NORMAL_MAX,
  UPGRADED_MAX,
  HIGHEND_MAX,
  TEST_EARN_MAX,
  UPGRADED_MULT,
  HIGHEND_MULT,
  EARN_MODE_MULT,
  ONEBAND_STRESS_MIN_MULT,
  ONEBAND_STRESS_MAX_MULT,
  ENABLE_INSTANCE_LOGGING,
  INSTANCE_LOG_COLLECTION
}
