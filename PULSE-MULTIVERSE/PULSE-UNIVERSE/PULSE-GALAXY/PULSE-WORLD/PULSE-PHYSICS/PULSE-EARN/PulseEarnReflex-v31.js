// ============================================================================
//  PulseEarnReflex-v31.0-Immortal-ADV-PLUSPLUS.js
//  Side-Attached Earn Reflex (v31 Immortal-ADV-PLUSPLUS + Advantage‑M30 +
//  Chunk/Prewarm/Factoring + 30++ Overlays)
//  Pure deterministic reflex builder (zero routing, zero sending, zero compute)
//  Binary-first A-B-A + DualHash + Presence/Advantage/Chunk surfaces
//  + v30 ReflexComputeProfile / ReflexPressureProfile / TriHeart30 / PulseIntelligence
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




const reflexInstances = new Map();
let reflexCycle = 0;

export const reflexHealing = {
  cycleCount: 0,

  lastReflexId: null,
  lastPulseId: null,
  lastOrgan: null,
  lastReason: null,

  lastBand: "symbolic",
  lastBandSignatureIntel: null,
  lastBandSignatureClassic: null,

  lastBinaryField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastChunkPrewarmPlan: null,

  lastReflexSignatureIntel: null,
  lastReflexSignatureClassic: null,
  lastDualHashField: null,
  lastHashIntellectSignature: null,

  // v30++ overlays
  lastReflexComputeProfileV30: null,
  lastReflexPressureProfileV30: null,
  lastReflexTriHeartFieldV30: null,
  lastReflexPulseIntelligenceV30: null,

  // v31 healing status
  status: "healthy", // healthy | error
  lastError: null
};

// ============================================================================
// HELPERS
// ============================================================================

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

// Primary INTEL hash — deterministic, structure-aware, no IO, no time.
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
  const classicHash = computeHash(`${label}::${classicString || ""}`);
  return {
    intel: intelHash,
    classic: classicHash
  };
}

function normalizeBand(b) {
  const x = String(b || "symbolic").toLowerCase();
  return x === "binary" ? "binary" : "symbolic";
}

function clamp01(x) {
  if (x == null || Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

function getPulseId(p) {
  return (
    p.pulseId ||
    p.id ||
    p.tickId ||
    p.jobId ||
    "UNKNOWN_PULSE"
  );
}

function getOrgan(e) {
  return e.organ || e.module || "UNKNOWN_ORGAN";
}

function getReason(e) {
  return e.reason || "unknown_reason";
}

function getReflexId(event, pulse) {
  return `${getPulseId(pulse)}::${getOrgan(event)}::${getReason(event)}`;
}

// ============================================================================
// A-B-A BINARY + WAVE (v30 Immortal-ADV-PLUSPLUS)
// ============================================================================

function buildReflexBandBinaryWave(event, pulse, reflexId, cycleIndex, device) {
  const band = normalizeBand(
    event.band ||
    pulse.band ||
    pulse.meta.band ||
    device.band ||
    "symbolic"
  );

  const pulseLen = String(getPulseId(pulse)).length;
  const organLen = String(getOrgan(event)).length;
  const reasonLen = String(getReason(event)).length;
  const gpuScore = device.gpuScore || 0;
  const bandwidth = device.bandwidthMbps || 0;

  const surface = pulseLen + organLen + reasonLen + gpuScore + bandwidth + cycleIndex;

  const intelPayload = {
    kind: "reflexBandBinaryWave",
    version: "v30.0",
    pulseLen,
    organLen,
    reasonLen,
    gpuScore,
    bandwidth,
    cycleIndex,
    surface,
    band
  };

  const classicString = `RFX30_BANDWAVE::${band}::${surface}`;
  const dual = buildDualHashSignature("REFLEX30_BANDWAVE", intelPayload, classicString);

  const binaryField = {
    binaryReflexSignatureIntel: dual.intel,
    binaryReflexSignatureClassic: dual.classic,
    binarySurfaceSignatureIntel: dual.intel,
    binarySurfaceSignatureClassic: dual.classic,
    binarySurface: {
      pulseLen,
      organLen,
      reasonLen,
      gpuScore,
      bandwidth,
      cycle: cycleIndex,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    density: organLen + reasonLen + gpuScore + bandwidth,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };

  const waveIntelPayload = {
    kind: "reflexWaveSurface",
    version: "v30.0",
    organLen,
    gpuScore,
    bandwidth,
    cycleIndex,
    surface
  };

  const waveClassicString = `RFX30_WAVE::${organLen}::${cycleIndex}`;
  const waveDual = buildDualHashSignature("REFLEX30_WAVE", waveIntelPayload, waveClassicString);

  const waveField = {
    waveReflexSignatureIntel: waveDual.intel,
    waveReflexSignatureClassic: waveDual.classic,
    amplitude: organLen + gpuScore + bandwidth,
    wavelength: cycleIndex || 1,
    phase: (organLen + reasonLen + cycleIndex) % 16,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };

  const bandSigDual = buildDualHashSignature(
    "REFLEX30_BAND",
    { band, cycleIndex },
    `REFLEX30_BAND::${band}::${cycleIndex}`
  );

  reflexHealing.lastBand = band;
  reflexHealing.lastBandSignatureIntel = bandSigDual.intel;
  reflexHealing.lastBandSignatureClassic = bandSigDual.classic;
  reflexHealing.lastBinaryField = binaryField;
  reflexHealing.lastWaveField = waveField;

  return { band, bandSignatureIntel: bandSigDual.intel, bandSignatureClassic: bandSigDual.classic, binaryField, waveField };
}

// ============================================================================
// PRESENCE FIELD (v30 Immortal-ADV-PLUSPLUS)
// ============================================================================

function buildPresenceField(event, pulse, device, cycleIndex) {
  const organLen = String(getOrgan(event)).length;
  const reasonLen = String(getReason(event)).length;
  const pulseLen = String(getPulseId(pulse)).length;
  const stability = device.stabilityScore ?? 0.8;

  const magnitude = organLen + reasonLen + pulseLen;
  let presenceTier = "presence_idle";
  if (magnitude >= 60) presenceTier = "presence_high";
  else if (magnitude >= 20) presenceTier = "presence_mid";
  else if (magnitude > 0) presenceTier = "presence_low";

  const presenceBand = normalizeBand(device.presenceBand || device.band || "symbolic");

  const intelPayload = {
    kind: "reflexPresence",
    version: "v30.0-Immortal-ADV-PLUSPLUS",
    presenceTier,
    organLen,
    reasonLen,
    pulseLen,
    stability,
    cycleIndex,
    presenceBand
  };

  const classicString =
    `RFX30_PRESENCE::${presenceTier}::${organLen}::${reasonLen}::${pulseLen}::${cycleIndex}::${presenceBand}`;

  const dual = buildDualHashSignature("REFLEX30_PRESENCE", intelPayload, classicString);

  const presenceField = {
    presenceVersion: "v30.0-Immortal-ADV-PLUSPLUS",
    presenceTier,
    presenceBand,
    organLen,
    reasonLen,
    pulseLen,
    stability,
    cycleIndex,
    presenceSignatureIntel: dual.intel,
    presenceSignatureClassic: dual.classic
  };

  reflexHealing.lastPresenceField = presenceField;
  return presenceField;
}

// ============================================================================
// ADVANTAGE‑M30 FIELD (structural-only, richer surface)
// ============================================================================

function buildAdvantageField(event, pulse, device, bandPack, presenceField) {
  const gpuScore = device.gpuScore || 0;
  const bandwidth = device.bandwidthMbps || 0;
  const chunkBudgetKB = device.chunkField.chunkBudgetKB ?? 0;
  const cacheLines = device.chunkField.cacheLines ?? 0;
  const prewarmSlots = device.chunkField.prewarmSlots ?? 0;

  const density = bandPack.binaryField.density;
  const amplitude = bandPack.waveField.amplitude;

  const presenceTier = presenceField.presenceTier;

  const advantageScore =
    gpuScore * 0.0005 +
    bandwidth * 0.0002 +
    density * 0.00001 +
    amplitude * 0.00001 +
    (chunkBudgetKB + cacheLines + prewarmSlots) * 0.000001 +
    (presenceTier === "presence_high" ? 0.01 : 0);

  let advantageTier = 0;
  if (advantageScore >= 0.05) advantageTier = 3;
  else if (advantageScore >= 0.02) advantageTier = 2;
  else if (advantageScore > 0) advantageTier = 1;

  const intelPayload = {
    kind: "reflexAdvantage",
    version: "M-30.0-REFLEX",
    band: bandPack.band,
    presenceBand: presenceField.presenceBand,
    gpuScore,
    bandwidth,
    binaryDensity: density,
    waveAmplitude: amplitude,
    chunkBudgetKB,
    cacheLines,
    prewarmSlots,
    presenceTier,
    advantageScore,
    advantageTier
  };

  const classicString =
    `RFX30_ADVANTAGE::${presenceTier}::${advantageTier}`;

  const dual = buildDualHashSignature("REFLEX30_ADVANTAGE", intelPayload, classicString);

  const advantageField = {
    advantageVersion: "M-30.0-REFLEX",
    band: bandPack.band,
    presenceBand: presenceField.presenceBand,
    gpuScore,
    bandwidth,
    binaryDensity: density,
    waveAmplitude: amplitude,
    chunkBudgetKB,
    cacheLines,
    prewarmSlots,
    presenceTier,
    advantageScore,
    advantageTier,
    advantageSignatureIntel: dual.intel,
    advantageSignatureClassic: dual.classic
  };

  reflexHealing.lastAdvantageField = advantageField;
  return advantageField;
}

// ============================================================================
// CHUNK / CACHE / PREWARM PLAN (v30-AdvantageM)
// ============================================================================

function buildChunkPrewarmPlan(event, pulse, device, presenceField, advantageField) {
  let priorityLabel = "normal";
  if (presenceField.presenceTier === "presence_high") priorityLabel = "high";
  else if (presenceField.presenceTier === "presence_mid") priorityLabel = "medium";
  else if (presenceField.presenceTier === "presence_low") priorityLabel = "low";

  if (advantageField.advantageScore >= 0.05) priorityLabel = "high";
  else if (advantageField.advantageScore >= 0.02 && priorityLabel === "normal") {
    priorityLabel = "medium";
  }

  const planSurface =
    (device.chunkField.chunkBudgetKB ?? 0) +
    (device.chunkField.cacheLines ?? 0) * 2 +
    (device.chunkField.prewarmSlots ?? 0) * 3;

  const intelPayload = {
    kind: "reflexChunkPlan",
    version: "v30.0-AdvantageM-Reflex",
    priorityLabel,
    bandPresence: presenceField.presenceTier,
    planSurface,
    advantageTier: advantageField.advantageTier
  };

  const classicString =
    `RFX30_CHUNKPLAN::${presenceField.presenceTier}::${priorityLabel}::${planSurface}`;

  const dual = buildDualHashSignature("REFLEX30_CHUNKPLAN", intelPayload, classicString);

  const chunkPrewarmPlan = {
    planVersion: "v30.0-AdvantageM-Reflex",
    priorityLabel,
    bandPresence: presenceField.presenceTier,
    planSurface,
    chunks: {
      reflexEnvelope: true,
      earnHandoff: true,
      reflexDiagnosticsEnvelope: true
    },
    cache: {
      reflexDiagnostics: true,
      deviceProfile: true,
      presenceAdvantageSnapshot: true
    },
    prewarm: {
      earnSystem: presenceField.presenceTier !== "presence_idle",
      reflexRouter: presenceField.presenceTier !== "presence_idle",
      nervousSystem: presenceField.presenceTier === "presence_high",
      muscleSystem: presenceField.presenceTier === "presence_high"
    },
    chunkPlanSignatureIntel: dual.intel,
    chunkPlanSignatureClassic: dual.classic
  };

  reflexHealing.lastChunkPrewarmPlan = chunkPrewarmPlan;
  return chunkPrewarmPlan;
}

// ============================================================================
// v30++ REFLEX COMPUTE / PRESSURE / TRI‑HEART / PULSE INTELLIGENCE
// ============================================================================

function deriveReflexFactoringSignal({ presenceField, advantageField }) {
  const mag =
    (presenceField.organLen || 0) +
    (presenceField.reasonLen || 0) +
    (presenceField.pulseLen || 0);

  const adv = advantageField.advantageScore || 0;
  const scaled = clamp01((mag + adv * 1000) / 300);
  return scaled >= 0.6 ? 1 : 0;
}

function buildReflexComputeProfileV30(reflexId, bandPack, presenceField, advantageField) {
  const density = bandPack.binaryField.density;
  const amplitude = bandPack.waveField.amplitude;

  let computeTier = "reflex_tier_low";
  const magnitude = density + amplitude;
  if (magnitude >= 800) computeTier = "reflex_tier_ultra";
  else if (magnitude >= 400) computeTier = "reflex_tier_high";
  else if (magnitude >= 150) computeTier = "reflex_tier_mid";

  const factoringSignal = deriveReflexFactoringSignal({ presenceField, advantageField });

  const profile = {
    profileVersion: "REFLEX-COMPUTE-30++",
    reflexId,
    band: bandPack.band,
    binaryDensity: density,
    waveAmplitude: amplitude,
    presenceTier: presenceField.presenceTier,
    advantageScore: advantageField.advantageScore,
    advantageTier: advantageField.advantageTier,
    computeTier,
    factoringSignal
  };

  reflexHealing.lastReflexComputeProfileV30 = profile;
  return profile;
}

function buildReflexPressureProfileV30(presenceField, advantageField) {
  const magnitude =
    (presenceField.organLen || 0) +
    (presenceField.reasonLen || 0) +
    (presenceField.pulseLen || 0) +
    (advantageField.advantageScore || 0) * 1000;

  let pressureTier = "reflex_pressure_idle";
  if (magnitude >= 300) pressureTier = "reflex_pressure_critical";
  else if (magnitude >= 200) pressureTier = "reflex_pressure_high";
  else if (magnitude >= 80) pressureTier = "reflex_pressure_elevated";
  else if (magnitude > 0) pressureTier = "reflex_pressure_soft";

  const profile = {
    profileVersion: "REFLEX-PRESSURE-30++",
    pressureTier,
    presenceTier: presenceField.presenceTier,
    organLen: presenceField.organLen,
    reasonLen: presenceField.reasonLen,
    pulseLen: presenceField.pulseLen,
    advantageScore: advantageField.advantageScore,
    advantageTier: advantageField.advantageTier
  };

  reflexHealing.lastReflexPressureProfileV30 = profile;
  return profile;
}

function buildTriHeartFieldV30(presenceField, advantageField, computeProfileV30) {
  const tri = {
    triHeartVersion: "REFLEX-TRI-30++",
    liveness: {
      alive: true,
      presenceTier: presenceField.presenceTier
    },
    advantage: {
      advantageTier: advantageField.advantageTier,
      advantageScore: advantageField.advantageScore
    },
    speed: {
      contractionSpeedTier: computeProfileV30.computeTier
    },
    presence: {
      presenceTier: presenceField.presenceTier
    }
  };

  reflexHealing.lastReflexTriHeartFieldV30 = tri;
  return tri;
}

function computeReflexPulseIntelligenceV30({
  presenceField,
  advantageField,
  computeProfileV30,
  band
}) {
  const advantageScore = advantageField.advantageScore || 0;
  const advantageTier = advantageField.advantageTier || 0;

  const presenceTier = presenceField.presenceTier || "presence_idle";
  const presenceWeight =
    presenceTier === "presence_high"
      ? 1.0
      : presenceTier === "presence_mid"
      ? 0.7
      : presenceTier === "presence_low"
      ? 0.4
      : 0.2;

  const factoring = computeProfileV30.factoringSignal ? 1 : 0;
  const bandIsBinary = band === "binary" ? 1 : 0;

  const solvednessScore = Math.max(
    0,
    Math.min(
      advantageScore * 10 * 0.4 +
        presenceWeight * 0.3 +
        factoring * 0.2 +
        bandIsBinary * 0.1,
      1
    )
  );

  const computeTier =
    solvednessScore >= 0.9
      ? "nearSolution"
      : solvednessScore >= 0.7
      ? "highValue"
      : solvednessScore >= 0.4
      ? "normal"
      : solvednessScore >= 0.2
      ? "lowPriority"
      : "avoidCompute";

  const readinessScore = Math.max(
    0,
    Math.min(
      solvednessScore * 0.6 +
        (bandIsBinary ? 0.15 : 0) +
        (advantageTier >= 2 ? 0.25 : advantageTier === 1 ? 0.1 : 0),
      1
    )
  );

  const intel = {
    reflexPulseIntelligenceVersion: "REFLEX-PI-30++",
    solvednessScore,
    factoringSignal: computeProfileV30.factoringSignal ? "high" : "low",
    computeTier,
    readinessScore,
    band,
    advantageTier
  };

  reflexHealing.lastReflexPulseIntelligenceV30 = intel;
  return intel;
}

// ============================================================================
// REFLEX ORGANISM BUILDER (v30)
// ============================================================================

function buildReflexEarn(event, pulse, instanceContext) {
  const pulseId = getPulseId(pulse);
  const organ = getOrgan(event);
  const reason = getReason(event);

  const pattern = `EarnReflex:${organ}:${reason}`;
  const patternSignature = computeHash(pattern);
  const patternIntellectSignature = computeHashIntelligence(pattern);

  return {
    EarnRole: {
      kind: "EarnReflex",
      version: "30.0-Immortal-ADV-PLUSPLUS",
      identity: "EarnReflex-v30.0-Immortal-ADV-PLUSPLUS"
    },

    jobId: pulseId,
    pattern,
    patternSignature,
    patternIntellectSignature,

    payload: {
      pulseId,
      organ,
      reason,
      blocked: !!event.blocked,
      lineageDepth: event.lineageDepth,
      returnToDepth: event.returnToDepth,
      fallbackDepth: event.fallbackDepth,
      instanceContext,
      cycleIndex: reflexCycle,
      rawEvent: event
    },

    priority: "low",
    returnTo: null,
    lineage: [],

    meta: {
      reflex: true,
      origin: "PulseEarnReflex-v30.0-Immortal-ADV-PLUSPLUS",
      sourceOrgan: organ,
      sourceReason: reason,
      sourcePulseId: pulseId,
      instanceContext,
      cycleIndex: reflexCycle,
      patternSignature,
      patternIntellectSignature
    }
  };
}

// ============================================================================
// REFLEX SIGNATURE + DUALHASH FIELD (v30)
// ============================================================================

function buildReflexSignatures(reflexId, presenceField, bandPack, advantageField) {
  const intelPayload = {
    reflexId,
    presenceTier: presenceField.presenceTier,
    band: bandPack.band,
    advantageScore: advantageField.advantageScore,
    advantageTier: advantageField.advantageTier
  };

  const classicString =
    `REFLEX30::${reflexId}::${presenceField.presenceTier}::${bandPack.band}`;

  const dual = buildDualHashSignature("REFLEX30", intelPayload, classicString);

  const reflexSignatureClassic = dual.classic;
  const hashIntellectSignature = dual.intel;

  const dualHashField = {
    label: "REFLEX30",
    intelPayload,
    classicString,
    reflexSignatureClassic,
    hashIntellectSignature
  };

  reflexHealing.lastReflexSignatureClassic = reflexSignatureClassic;
  reflexHealing.lastReflexSignatureIntel = hashIntellectSignature;
  reflexHealing.lastDualHashField = dualHashField;
  reflexHealing.lastHashIntellectSignature = hashIntellectSignature;

  return { reflexSignatureClassic, dualHashField, hashIntellectSignature };
}

// ============================================================================
// PUBLIC API — FULL v31 Immortal-ADV-PLUSPLUS REFLEX (error-safe)
// ============================================================================

export const PulseEarnReflex = {

  fromGovernorEvent(event, pulse, instanceContext, deviceProfile = {}) {
    reflexCycle++;
    reflexHealing.cycleCount++;

    const reflexId = getReflexId(event, pulse);
    reflexHealing.lastReflexId = reflexId;
    reflexHealing.lastPulseId = getPulseId(pulse);
    reflexHealing.lastOrgan = getOrgan(event);
    reflexHealing.lastReason = getReason(event);

    try {
      let state = reflexInstances.get(reflexId);
      if (!state) {
        state = {
          reflexId,
          count: 0,
          firstSeenCycle: reflexCycle,
          lastSeenCycle: null
        };
        reflexInstances.set(reflexId, state);
      }

      state.count++;
      state.lastSeenCycle = reflexCycle;

      const earnReflex = buildReflexEarn(event, pulse, instanceContext);

      const bandPack = buildReflexBandBinaryWave(
        event,
        pulse,
        reflexId,
        reflexCycle,
        deviceProfile
      );

      const presenceField = buildPresenceField(
        event,
        pulse,
        deviceProfile,
        reflexCycle
      );

      const advantageField = buildAdvantageField(
        event,
        pulse,
        deviceProfile,
        bandPack,
        presenceField
      );

      const chunkPrewarmPlan = buildChunkPrewarmPlan(
        event,
        pulse,
        deviceProfile,
        presenceField,
        advantageField
      );

      const reflexComputeProfileV30 = buildReflexComputeProfileV30(
        reflexId,
        bandPack,
        presenceField,
        advantageField
      );

      const reflexPressureProfileV30 = buildReflexPressureProfileV30(
        presenceField,
        advantageField
      );

      const reflexTriHeartFieldV30 = buildTriHeartFieldV30(
        presenceField,
        advantageField,
        reflexComputeProfileV30
      );

      const reflexPulseIntelligenceV30 = computeReflexPulseIntelligenceV30({
        presenceField,
        advantageField,
        computeProfileV30: reflexComputeProfileV30,
        band: bandPack.band
      });

      const { reflexSignatureClassic, dualHashField, hashIntellectSignature } =
        buildReflexSignatures(reflexId, presenceField, bandPack, advantageField);

      const diagnostics = {
        reflexId,
        pulseId: getPulseId(pulse),
        organ: getOrgan(event),
        reason: getReason(event),
        cycleIndex: reflexCycle,
        instanceCount: state.count,
        firstSeenCycle: state.firstSeenCycle,
        lastSeenCycle: state.lastSeenCycle,

        band: bandPack.band,
        bandSignatureIntel: bandPack.bandSignatureIntel,
        bandSignatureClassic: bandPack.bandSignatureClassic,
        binaryField: bandPack.binaryField,
        waveField: bandPack.waveField,

        presenceField,
        advantageField,
        chunkPrewarmPlan,

        dualHashField,
        reflexSignatureClassic,
        hashIntellectSignature,

        reflexComputeProfileV30,
        reflexPressureProfileV30,
        reflexTriHeartFieldV30,
        reflexPulseIntelligenceV30
      };

      reflexHealing.status = "healthy";
      reflexHealing.lastError = null;

      return {
        ok: true,
        reflexId,
        state,
        instanceContext,
        diagnostics,
        reflexSignature: reflexSignatureClassic,
        hashIntellectSignature,
        dualHashField,
        band: bandPack.band,
        bandSignatureIntel: bandPack.bandSignatureIntel,
        bandSignatureClassic: bandPack.bandSignatureClassic,
        binaryField: bandPack.binaryField,
        waveField: bandPack.waveField,
        presenceField,
        advantageField,
        chunkPrewarmPlan,
        reflexComputeProfileV30,
        reflexPressureProfileV30,
        reflexTriHeartFieldV30,
        reflexPulseIntelligenceV30,
        earnReflex
      };
    } catch (err) {
      // v31 error-safe reflex surface
      reflexHealing.status = "error";
      reflexHealing.lastError = err && err.message ? err.message : String(err || "unknown_error");

      const band = normalizeBand(reflexHealing.lastBand);
      const surface = reflexCycle;

      const binaryField = {
        binaryReflexSignatureIntel: computeHashIntelligence({
          organ: "PulseEarnReflex",
          mode: "error",
          surface,
          cycle: reflexCycle
        }),
        binaryReflexSignatureClassic: computeHash(`REFLEX_ERROR::${surface}::${reflexCycle}`),
        binarySurfaceSignatureIntel: computeHashIntelligence({
          organ: "PulseEarnReflex",
          mode: "error_surface",
          surface,
          cycle: reflexCycle
        }),
        binarySurfaceSignatureClassic: computeHash(`REFLEX_ERROR_SURFACE::${surface}::${reflexCycle}`),
        binarySurface: {
          pulseLen: 0,
          organLen: 0,
          reasonLen: 0,
          gpuScore: 0,
          bandwidth: 0,
          cycle: reflexCycle,
          surface
        },
        parity: surface % 2 === 0 ? 0 : 1,
        density: 0,
        shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
      };
      reflexHealing.lastBinaryField = binaryField;

      const waveField = {
        waveReflexSignatureIntel: computeHashIntelligence({
          organ: "PulseEarnReflex",
          mode: "error_wave",
          surface,
          cycle: reflexCycle
        }),
        waveReflexSignatureClassic: computeHash(`REFLEX_ERROR_WAVE::${surface}::${reflexCycle}`),
        amplitude: 1,
        wavelength: reflexCycle || 1,
        phase: (1 + reflexCycle) % 16,
        band,
        mode: band === "binary" ? "compression-wave" : "symbolic-wave"
      };
      reflexHealing.lastWaveField = waveField;

      const presenceField = reflexHealing.lastPresenceField || {
        presenceVersion: "v30.0-Immortal-ADV-PLUSPLUS",
        presenceTier: "presence_error",
        presenceBand: band,
        organLen: 0,
        reasonLen: 0,
        pulseLen: 0,
        stability: 0,
        cycleIndex: reflexCycle,
        presenceSignatureIntel: computeHashIntelligence({
          kind: "reflexPresenceError",
          cycleIndex: reflexCycle
        }),
        presenceSignatureClassic: computeHash(`RFX30_PRESENCE_ERROR::${reflexCycle}`)
      };

      const advantageField = reflexHealing.lastAdvantageField || {
        advantageVersion: "M-30.0-REFLEX",
        band,
        presenceBand: presenceField.presenceBand || band,
        gpuScore: 0,
        bandwidth: 0,
        binaryDensity: 0,
        waveAmplitude: 0,
        chunkBudgetKB: 0,
        cacheLines: 0,
        prewarmSlots: 0,
        presenceTier: presenceField.presenceTier || "presence_error",
        advantageScore: 0,
        advantageTier: 0,
        advantageSignatureIntel: computeHashIntelligence({
          kind: "reflexAdvantageError",
          cycleIndex: reflexCycle
        }),
        advantageSignatureClassic: computeHash(`RFX30_ADVANTAGE_ERROR::${reflexCycle}`)
      };

      const chunkPrewarmPlan = reflexHealing.lastChunkPrewarmPlan || {
        planVersion: "v30.0-AdvantageM-Reflex",
        priorityLabel: "normal",
        bandPresence: presenceField.presenceTier || "presence_error",
        planSurface: 0,
        chunks: {
          reflexEnvelope: false,
          earnHandoff: false,
          reflexDiagnosticsEnvelope: false
        },
        cache: {
          reflexDiagnostics: false,
          deviceProfile: false,
          presenceAdvantageSnapshot: false
        },
        prewarm: {
          earnSystem: false,
          reflexRouter: false,
          nervousSystem: false,
          muscleSystem: false
        },
        chunkPlanSignatureIntel: computeHashIntelligence({
          kind: "reflexChunkPlanError",
          cycleIndex: reflexCycle
        }),
        chunkPlanSignatureClassic: computeHash(`RFX30_CHUNKPLAN_ERROR::${reflexCycle}`)
      };

      const reflexComputeProfileV30 = buildReflexComputeProfileV30(
        reflexId,
        { band, binaryField, waveField },
        presenceField,
        advantageField
      );

      const reflexPressureProfileV30 = buildReflexPressureProfileV30(
        presenceField,
        advantageField
      );

      const reflexTriHeartFieldV30 = buildTriHeartFieldV30(
        presenceField,
        advantageField,
        reflexComputeProfileV30
      );

      const reflexPulseIntelligenceV30 = computeReflexPulseIntelligenceV30({
        presenceField,
        advantageField,
        computeProfileV30: reflexComputeProfileV30,
        band
      });

      const { reflexSignatureClassic, dualHashField, hashIntellectSignature } =
        buildReflexSignatures(
          reflexId,
          presenceField,
          { band, binaryField, waveField },
          advantageField
        );

      const diagnostics = {
        reflexId,
        pulseId: getPulseId(pulse),
        organ: getOrgan(event),
        reason: getReason(event),
        cycleIndex: reflexCycle,
        instanceCount: null,
        firstSeenCycle: null,
        lastSeenCycle: null,

        band,
        bandSignatureIntel: reflexHealing.lastBandSignatureIntel,
        bandSignatureClassic: reflexHealing.lastBandSignatureClassic,
        binaryField,
        waveField,

        presenceField,
        advantageField,
        chunkPrewarmPlan,

        dualHashField,
        reflexSignatureClassic,
        hashIntellectSignature,

        reflexComputeProfileV30,
        reflexPressureProfileV30,
        reflexTriHeartFieldV30,
        reflexPulseIntelligenceV30,

        error: reflexHealing.lastError
      };

      return {
        ok: false,
        error: reflexHealing.lastError,
        reflexId,
        instanceContext,
        diagnostics,
        reflexSignature: reflexSignatureClassic,
        hashIntellectSignature,
        dualHashField,
        band,
        binaryField,
        waveField,
        presenceField,
        advantageField,
        chunkPrewarmPlan,
        reflexComputeProfileV30,
        reflexPressureProfileV30,
        reflexTriHeartFieldV30,
        reflexPulseIntelligenceV30
      };
    }
  },

  getReflexState(reflexId) {
    if (reflexId) return reflexInstances.get(reflexId) || null;
    return Array.from(reflexInstances.values());
  },

  getHealingState() {
    return { ...reflexHealing };
  }
};

PulseRealm.EarnReflex = {
  PulseEarnReflex,
  reflexHealing
}