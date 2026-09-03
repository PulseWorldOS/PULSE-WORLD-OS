// ============================================================================
// FILE: /PULSE-EARN/PulseEarnMktGolem-v31.js
// PULSE EARN — v31 MARKET GOLEM (GPU.NET / GOLEM) ORGAN
// v31 IMMORTAL-INTEL-GPU — dual-hash, presence, advantage-lite, GPU-aware
// PURE ORGAN: no network IO, no randomness, no async side-effects
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
// META
// ============================================================================

export const PulseEarnMktGolemMeta = Object.freeze({
  identity: "PulseEarnMktGolem",
  version: "v31-Golem-Immortal-GPU",
  role: "MARKET_GOLEM",
  schemaVersion: "v2",
  guarantees: {
    pureOrgan: true,
    gpuAware: true,
    cpuFriendly: true,
    workerFriendly: true,
    dualHashIntel: true
  }
});



function logGolem(stage, details = {}) {
  try {
    console.log(
      JSON.stringify({
        organ: "PulseEarnMktGolem",
        version: PulseEarnMktGolemMeta.version,
        stage,
        ...details
      })
    );
  } catch {
    // non-fatal
  }
}

// ============================================================================
// HASH HELPERS — v31 IMMORTAL-INTEL (dual-hash)
// ============================================================================

function computeHashClassic(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function buildDualHashSignature(label, intelPayload, classicString) {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intelHash = computeHashIntelligence(intelBase);
  const classicHash = computeHashClassic(`${label}::${classicString || ""}`);
  return {
    intel: intelHash,
    classic: classicHash
  };
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

// ============================================================================
// HEALING STATE — v31 IMMORTAL-INTEL-GPU
// ============================================================================

export const golemHealingState = {
  lastOk: true,
  lastError: null,
  lastUpdatedAt: PulseRealm.PulseNOW,

  lastRunKind: null,
  lastRunPayloadShape: null,
  lastLatencyMs: null,

  lastBand: "symbolic",
  lastBandSignatureIntel: null,
  lastBandSignatureClassic: null,

  lastPresenceField: null,
  lastGpuProfile: null,
  lastAdvantageScore: 0,

  lastRunSignatureIntel: null,
  lastRunSignatureClassic: null,

  cycleCount: 0,
  lastCycleIndex: 0
};

// ============================================================================
// DEVICE / GPU PROFILE — v31 IMMORTAL CAPABILITY SNAPSHOT
// ============================================================================

function detectDeviceProfileSoft() {

  const fromGlobal = PulseRealm.PULSE_DEVICE_PROFILE || null;
  if (fromGlobal && typeof fromGlobal === "object") {
    return {
      gpuScore: Number(fromGlobal.gpuScore || 0),
      gpuRam: Number(fromGlobal.gpuRam || 0),
      bandwidthMbps: Number(fromGlobal.bandwidthMbps || 0),
      stabilityScore: Number(fromGlobal.stabilityScore || 0.9),
      capabilityScore: Number(fromGlobal.capabilityScore || 0),
      gpuCount: Number(fromGlobal.gpuCount || 0)
    };
  }

  // v31 safe inferred mid-tier profile
  const inferred = {
    gpuScore: 5200,
    gpuRam: 16,
    bandwidthMbps: 300,
    stabilityScore: 0.95,
    capabilityScore: 5200 * 0.7 + 300 * 0.2 + 0.95 * 0.1,
    gpuCount: 1
  };

  return inferred;
}

function classifyGpuTier(deviceProfile = {}) {
  const score = Number(deviceProfile.gpuScore || 0);
  if (score >= 8000) return "elite";
  if (score >= 5000) return "high";
  if (score >= 2500) return "mid";
  if (score > 0) return "low";
  return "none";
}

function buildGpuProfile(deviceProfile = {}) {
  const base = detectDeviceProfileSoft();
  const merged = {
    ...base,
    ...deviceProfile
  };

  const gpuTier = classifyGpuTier(merged);
  const gpuPressure = clamp01((merged.gpuScore || 0) / 10000);

  const profile = {
    gpuTier,
    gpuScore: Number(merged.gpuScore || 0),
    gpuRam: Number(merged.gpuRam || 0),
    bandwidth: Number(merged.bandwidthMbps || 0),
    stability: Number(merged.stabilityScore || 0.9),
    capabilityScore: Number(merged.capabilityScore || 0),
    gpuPressure,
    gpuCount: Number(merged.gpuCount || 0)
  };

  golemHealingState.lastGpuProfile = profile;
  return profile;
}

// ============================================================================
// PRESENCE FIELD — v31 GOLEM PRESENCE SNAPSHOT
// ============================================================================

function buildPresenceField(kind, payload, gpuProfile, cycleIndex, globalHints = {}) {
  const presenceContext = globalHints.presenceContext || {};
  const meshSignals = globalHints.meshSignals || {};
  const castleSignals = globalHints.castleSignals || {};
  const regionContext = globalHints.regionContext || {};

  const meshStrength = Number(meshSignals.meshStrength || 0);
  const meshPressureIndex = Number(meshSignals.meshPressureIndex || 0);
  const castleLoadLevel = Number(castleSignals.loadLevel || 0);

  const kindLen = String(kind || "").length;
  const payloadSize = payload && typeof payload === "object"
    ? Object.keys(payload).length
    : 0;

  const internalPressure =
    kindLen * 0.5 +
    payloadSize * 0.25 +
    (gpuProfile.gpuPressure || 0) * 40;

  const pressure = meshPressureIndex + castleLoadLevel + internalPressure;

  let presenceTier = "idle";
  if (pressure >= 150) presenceTier = "critical";
  else if (pressure >= 100) presenceTier = "high";
  else if (pressure >= 50) presenceTier = "elevated";
  else if (pressure > 0) presenceTier = "soft";

  const intelPayload = {
    kind: "golemPresence",
    version: "v31-IMMORTAL-INTEL-GPU",
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    meshStrength,
    kindLen,
    payloadSize,
    gpuTier: gpuProfile.gpuTier,
    gpuPressure: gpuProfile.gpuPressure,
    cycleIndex
  };

  const classicString =
    `GOLEM_PRESENCE::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`;

  const sig = buildDualHashSignature("GOLEM_PRESENCE", intelPayload, classicString);

  const presenceField = {
    presenceVersion: "v31-IMMORTAL-INTEL-GPU",
    presenceTier,
    bandPresence: presenceContext.bandPresence || "symbolic",
    routerPresence: presenceContext.routerPresence || "stable",
    devicePresence: presenceContext.devicePresence || "golem",

    meshPresence:
      presenceContext.meshPresence ||
      (meshStrength > 0 ? "mesh-active" : "mesh-idle"),
    castlePresence:
      presenceContext.castlePresence ||
      castleSignals.castlePresence ||
      "golem-region",
    regionPresence:
      presenceContext.regionPresence ||
      regionContext.regionTag ||
      "unknown-region",

    regionId: regionContext.regionId || "golem-region",
    castleId: castleSignals.castleId || "golem-castle",

    meshStrength,
    meshPressureIndex,
    castleLoadLevel,
    kindLen,
    payloadSize,
    cycleIndex,

    presenceSignatureIntel: sig.intel,
    presenceSignatureClassic: sig.classic
  };

  golemHealingState.lastPresenceField = presenceField;
  return presenceField;
}

// ============================================================================
// ADVANTAGE-LITE — v31 GOLEM (GPU + bandwidth + presence tier)
// ============================================================================

function computeAdvantageLite(gpuProfile, presenceField) {
  const gpuScore = gpuProfile.gpuScore || 0;
  const bandwidth = gpuProfile.bandwidth || 0;
  const stability = gpuProfile.stability || 0.9;

  const base =
    gpuScore * 0.0005 +
    bandwidth * 0.0003 +
    stability * 0.02;

  const tierBoost =
    presenceField.presenceTier === "critical"
      ? 0.03
      : presenceField.presenceTier === "high"
      ? 0.02
      : presenceField.presenceTier === "elevated"
      ? 0.01
      : presenceField.presenceTier === "soft"
      ? 0.005
      : 0;

  const advantageScore = base + tierBoost;
  golemHealingState.lastAdvantageScore = advantageScore;
  return advantageScore;
}

// ============================================================================
// BAND SIGNATURE — v31 GOLEM
// ============================================================================

function buildBandSignature(band, cycleIndex) {
  const intelPayload = {
    kind: "golemBand",
    band: normalizeBand(band),
    cycleIndex
  };
  const classicString = `GOLEM_BAND::${normalizeBand(band)}::CYCLE::${cycleIndex}`;
  const sig = buildDualHashSignature("GOLEM_BAND", intelPayload, classicString);

  golemHealingState.lastBand = normalizeBand(band);
  golemHealingState.lastBandSignatureIntel = sig.intel;
  golemHealingState.lastBandSignatureClassic = sig.classic;

  return sig;
}

// ============================================================================
// RUN JOB — v31 dual-hash + presence + GPU profile + advantage-lite
// ============================================================================

export const PulseEarnMktGolem_v31 = {
  async runJob(kind, payload = {}, deviceProfile = {}, globalHints = {}) {
    const start = PulseRealm.PulseNOW;
    golemHealingState.cycleCount += 1;
    const cycleIndex = golemHealingState.cycleCount;
    golemHealingState.lastCycleIndex = cycleIndex;

    const gpuProfile = buildGpuProfile(deviceProfile);
    const presenceField = buildPresenceField(
      kind,
      payload,
      gpuProfile,
      cycleIndex,
      globalHints
    );

    const band =
      gpuProfile.gpuTier === "elite" || gpuProfile.gpuTier === "high"
        ? "binary"
        : "symbolic";

    const bandSig = buildBandSignature(band, cycleIndex);
    const advantageScore = computeAdvantageLite(gpuProfile, presenceField);

    let ok = true;
    let error = null;

    try {
      logGolem("RUN_JOB_V31", {
        kind,
        payloadShape: Object.keys(payload || {}),
        cycleIndex,
        gpuTier: gpuProfile.gpuTier,
        band,
        presenceTier: presenceField.presenceTier
      });
    } catch (err) {
      ok = false;
      error = String(err);
    }

    const latency = PulseRealm.PulseNOW - start;
    golemHealingState.lastLatencyMs = latency;
    golemHealingState.lastRunKind = kind;
    golemHealingState.lastRunPayloadShape = Object.keys(payload || {});
    golemHealingState.lastOk = ok;
    golemHealingState.lastError = error;
    golemHealingState.lastUpdatedAt = PulseRealm.PulseNOW;

    const intelPayload = {
      kind: "golemRunJob",
      version: "v31-IMMORTAL-INTEL-GPU",
      jobKind: kind,
      cycleIndex,
      ok,
      latency,
      presenceTier: presenceField.presenceTier,
      gpuTier: gpuProfile.gpuTier,
      advantageScore
    };

    const classicString =
      `GOLEM_RUN_JOB::${kind || "unknown"}::CYCLE::${cycleIndex}::OK::${ok ? 1 : 0}`;

    const sig = buildDualHashSignature("GOLEM_RUN_JOB", intelPayload, classicString);
    golemHealingState.lastRunSignatureIntel = sig.intel;
    golemHealingState.lastRunSignatureClassic = sig.classic;

    return {
      ok,
      kind,
      echo: true,
      error,
      latency,
      cycleIndex,
      band,
      gpuProfile,
      presenceField,
      advantageScore,
      runSignatureIntel: sig.intel,
      runSignatureClassic: sig.classic,
      bandSignatureIntel: bandSig.intel,
      bandSignatureClassic: bandSig.classic
    };
  }
};

// ============================================================================
// HEALING STATE EXPORT
// ============================================================================

export function getPulseEarnMktGolemHealingState() {
  return {
    ...golemHealingState
  };
}

// ============================================================================
// GLOBAL REGISTRATION (BROWSER)
// ============================================================================

  PulseRealm.PulseEarnMktGolem = {
    PulseEarnMktGolem_v31,
    getPulseEarnMktGolemHealingState,
    golemHealingState,
    PulseEarnMktGolemMeta
  }
