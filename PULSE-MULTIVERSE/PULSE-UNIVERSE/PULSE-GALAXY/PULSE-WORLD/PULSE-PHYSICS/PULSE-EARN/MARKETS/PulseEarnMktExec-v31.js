// ============================================================================
// FILE: /PULSE-EARN/PulseEarnMktExec-v31.js
// PULSE EARN — v31 MARKET EXEC (iExec) ORGAN
// IMMORTAL‑INTEL‑OMEGA + BinaryWave + GPU‑Aware + DualHash
// PURE RECEPTOR — deterministic, no IO, no randomness.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
// META
// ============================================================================
export const PulseEarnMktExecMeta_v31 = Object.freeze({
  identity: "PulseEarnMktExec",
  version: "v31-Exec-Immortal-Intel-Omega",
  role: "MARKET_EXEC",
  schemaVersion: "v2",
  guarantees: {
    pureReceptor: true,
    deterministic: true,
    dualHash: true,
    binaryWave: true,
    gpuAware: true,
    presenceAware: true,
    advantageAware: true
  }
});

// ============================================================================
// LOGGING
// ============================================================================
function logExec(stage, details = {}) {
  console.log(
    JSON.stringify({
      organ: "PulseEarnMktExec",
      version: PulseEarnMktExecMeta_v31.version,
      stage,
      ...details
    })
  );
}

// ============================================================================
// HASH HELPERS — v31 IMMORTAL‑INTEL‑OMEGA
// ============================================================================
function computeHash(str) {
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

function buildDualHashSignature(label, intelPayload, classicString = "") {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString
  };
  return {
    intel: computeHashIntelligence(intelBase),
    classic: computeHash(`${label}::${classicString}`)
  };
}

function normalizeBand(b) {
  const x = String(b || "symbolic").toLowerCase();
  return x === "binary" ? "binary" : "symbolic";
}

// ============================================================================
// HEALING STATE — v31 IMMORTAL‑INTEL‑OMEGA
// ============================================================================
export const execHealing = {
  lastOk: true,
  lastError: null,
  lastJobKind: null,
  lastPayloadShape: null,
  lastCycle: 0,

  // signatures
  lastRunSignatureIntel: null,
  lastRunSignatureClassic: null,
  lastPingSignatureIntel: null,
  lastPingSignatureClassic: null,
  lastSubmitSignatureIntel: null,
  lastSubmitSignatureClassic: null,

  // presence / advantage / binarywave
  lastPresenceField: null,
  lastAdvantageField: null,
  lastBinaryField: null,
  lastWaveField: null,
  lastBinaryWaveCarrier: null,

  // gpu
  lastGpuProfile: null,

  lastUpdatedAt: PulseRealm.PulseNOW
};

// ============================================================================
// GPU PROFILE — v31 IMMORTAL CAPABILITY
// ============================================================================
function detectGpuProfile() {
  const dev =
    (PulseRealm.PULSE_DEVICE_PROFILE) ||
    (PulseRealm.PULSE_DEVICE_PROFILE) ||
    null;

  if (dev) {
    const gpuPressure = Math.max(
      0,
      Math.min(1, (dev.capabilityScore || 0) / 10000)
    );
    const profile = {
      gpuTier: dev.capabilityTier,
      gpuScore: dev.gpuScore,
      gpuRam: dev.gpuRam,
      bandwidth: dev.bandwidthMbps,
      stability: dev.stabilityScore,
      capabilityScore: dev.capabilityScore,
      gpuPressure
    };
    execHealing.lastGpuProfile = profile;
    return profile;
  }

  // fallback
  const fallback = {
    gpuTier: "elite",
    gpuScore: 7200,
    gpuRam: 24,
    bandwidth: 500,
    stability: 0.97,
    capabilityScore:
      7200 * 0.5 +
      3600 * 0.2 +
      4800 * 0.2 +
      500 * 0.05 +
      0.97 * 0.05,
    gpuPressure: 0.72
  };
  execHealing.lastGpuProfile = fallback;
  return fallback;
}

// ============================================================================
// PRESENCE FIELD — v31
// ============================================================================
function buildPresenceField(kind, payload, cycle) {
  const jobLen = String(kind || "").length;
  const payloadSize = Object.keys(payload || {}).length;

  const magnitude = jobLen + payloadSize + cycle;

  let presenceTier = "presence_idle";
  if (magnitude >= 40) presenceTier = "presence_high";
  else if (magnitude >= 20) presenceTier = "presence_mid";
  else if (magnitude > 0) presenceTier = "presence_low";

  const field = {
    presenceVersion: "v31-Exec-Immortal",
    presenceTier,
    jobLen,
    payloadSize,
    cycle
  };

  execHealing.lastPresenceField = field;
  return field;
}

// ============================================================================
// ADVANTAGE FIELD — v31
// ============================================================================
function buildAdvantageField(presenceField, gpuProfile) {
  const base =
    (presenceField.jobLen || 0) * 0.0002 +
    (presenceField.payloadSize || 0) * 0.0001 +
    (gpuProfile.gpuScore || 0) * 0.00002 +
    (gpuProfile.bandwidth || 0) * 0.00001;

  const advantageTier =
    base >= 0.08 ? 3 : base >= 0.04 ? 2 : base >= 0.01 ? 1 : 0;

  const field = {
    advantageVersion: "v31-Exec-Immortal",
    advantageScore: base,
    advantageTier
  };

  execHealing.lastAdvantageField = field;
  return field;
}

// ============================================================================
// BINARY + WAVE FIELDS — v31
// ============================================================================
function buildBinaryField(kind, cycle, gpuProfile) {
  const density =
    String(kind || "").length +
    cycle +
    (gpuProfile.gpuScore || 0) * 0.001;

  const surface = density + cycle;

  const field = {
    binarySurface: {
      density,
      surface,
      parity: surface % 2 === 0 ? 0 : 1,
      shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
    }
  };

  execHealing.lastBinaryField = field;
  return field;
}

function buildWaveField(kind, cycle, gpuProfile) {
  const amplitude =
    cycle +
    (gpuProfile.gpuRam || 0) +
    (String(kind || "").length % 7);

  const wavelength = amplitude + 5;
  const phase = (amplitude + cycle) % 16;

  const field = {
    amplitude,
    wavelength,
    phase,
    mode: "symbolic-wave"
  };

  execHealing.lastWaveField = field;
  return field;
}

// ============================================================================
// BINARYWAVE CARRIER — v31
// ============================================================================
function buildBinaryWaveCarrier(kind, cycle, presenceField, gpuProfile) {
  const band = gpuProfile.gpuTier !== "none" ? "binary" : "symbolic";

  const carrier = {
    version: "v31-BinaryWave-Exec",
    band,
    cycle,
    presenceTier: presenceField.presenceTier,
    gpuTier: gpuProfile.gpuTier,
    gpuPressure: gpuProfile.gpuPressure
  };

  const sig = buildDualHashSignature(
    "EXEC_BINARYWAVE_V31",
    carrier,
    `${band}::${cycle}`
  );

  execHealing.lastBinaryWaveCarrier = carrier;
  return {
    carrier,
    signatureIntel: sig.intel,
    signatureClassic: sig.classic
  };
}

// ============================================================================
// EXEC ORGAN — v31 IMMORTAL‑INTEL‑OMEGA
// ============================================================================
export const PulseEarnMktExec_v31 = {
  id: "iexec",
  name: "iExec",
  version: "v31-Immortal-Intel-Omega",
  lineage: "Exec-v31-Immortal-Intel-Omega",

  // -------------------------------------------------------------------------
  // PING
  // -------------------------------------------------------------------------
  ping() {
    execHealing.lastCycle++;
    const cycle = execHealing.lastCycle;

    const gpuProfile = detectGpuProfile();
    const presenceField = buildPresenceField("ping", {}, cycle);
    const advantageField = buildAdvantageField(presenceField, gpuProfile);
    const binaryField = buildBinaryField("ping", cycle, gpuProfile);
    const waveField = buildWaveField("ping", cycle, gpuProfile);
    const binaryWave = buildBinaryWaveCarrier(
      "ping",
      cycle,
      presenceField,
      gpuProfile
    );

    const sig = buildDualHashSignature(
      "EXEC_PING_V31",
      { cycle, presenceTier: presenceField.presenceTier },
      `PING::${cycle}`
    );

    execHealing.lastPingSignatureIntel = sig.intel;
    execHealing.lastPingSignatureClassic = sig.classic;

    return {
      ok: true,
      cycle,
      presenceField,
      advantageField,
      binaryField,
      waveField,
      binaryWaveCarrier: binaryWave.carrier,
      signatureIntel: sig.intel,
      signatureClassic: sig.classic,
      gpuProfile
    };
  },

  // -------------------------------------------------------------------------
  // RUN JOB
  // -------------------------------------------------------------------------
  async runJob(kind, payload = {}) {
    execHealing.lastCycle++;
    const cycle = execHealing.lastCycle;

    execHealing.lastJobKind = kind;
    execHealing.lastPayloadShape = Object.keys(payload || {});

    const gpuProfile = detectGpuProfile();
    const presenceField = buildPresenceField(kind, payload, cycle);
    const advantageField = buildAdvantageField(presenceField, gpuProfile);
    const binaryField = buildBinaryField(kind, cycle, gpuProfile);
    const waveField = buildWaveField(kind, cycle, gpuProfile);
    const binaryWave = buildBinaryWaveCarrier(
      kind,
      cycle,
      presenceField,
      gpuProfile
    );

    const sig = buildDualHashSignature(
      "EXEC_RUN_V31",
      { kind, cycle },
      `${kind}::${cycle}`
    );

    execHealing.lastRunSignatureIntel = sig.intel;
    execHealing.lastRunSignatureClassic = sig.classic;

    logExec("RUN_JOB", { kind, payloadShape: execHealing.lastPayloadShape });

    return {
      ok: true,
      kind,
      cycle,
      echo: true,
      presenceField,
      advantageField,
      binaryField,
      waveField,
      binaryWaveCarrier: binaryWave.carrier,
      signatureIntel: sig.intel,
      signatureClassic: sig.classic,
      gpuProfile
    };
  },

  // -------------------------------------------------------------------------
  // SUBMIT RESULT
  // -------------------------------------------------------------------------
  submitResult(job, result = {}) {
    execHealing.lastCycle++;
    const cycle = execHealing.lastCycle;

    const gpuProfile = detectGpuProfile();
    const presenceField = buildPresenceField("submit", job || {}, cycle);
    const advantageField = buildAdvantageField(presenceField, gpuProfile);
    const binaryField = buildBinaryField("submit", cycle, gpuProfile);
    const waveField = buildWaveField("submit", cycle, gpuProfile);
    const binaryWave = buildBinaryWaveCarrier(
      "submit",
      cycle,
      presenceField,
      gpuProfile
    );

    const sig = buildDualHashSignature(
      "EXEC_SUBMIT_V31",
      { jobId: job.id || null, cycle },
      `${job.id || "NONE"}::${cycle}`
    );

    execHealing.lastSubmitSignatureIntel = sig.intel;
    execHealing.lastSubmitSignatureClassic = sig.classic;

    return {
      ok: true,
      cycle,
      jobId: job.id || null,
      resultEchoed: !!result,
      presenceField,
      advantageField,
      binaryField,
      waveField,
      binaryWaveCarrier: binaryWave.carrier,
      signatureIntel: sig.intel,
      signatureClassic: sig.classic,
      gpuProfile
    };
  }
};

// ============================================================================
// HEALING STATE EXPORT
// ============================================================================
export function getPulseEarnMktExecHealingState_v31() {
  return { ...execHealing };
}

// ============================================================================
// WINDOW REGISTRATION
// ============================================================================
PulseRealm.PulseEarnMktExec = {
  PulseEarnMktExec_v31,
  getPulseEarnMktExecHealingState_v31,
  execHealing,
  PulseEarnMktExecMeta_v31
}
