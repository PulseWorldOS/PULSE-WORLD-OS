// ============================================================================
//  PulseEarnReflexRouter-v31.0-Immortal-ADV-PLUSPLUS.js
//  Reflex → Earn Synapse (v31 Immortal-ADV-PLUSPLUS + Advantage‑M31++ +
//  Chunk/Prewarm/Factoring + v31 RouterComputeProfile / Pressure / PI)
//  Deterministic, Zero-Async, Zero-Routing, Zero-Sending
//  Pure Reflex → Earn Handoff with DualBand + DualHash + Presence/Advantage surfaces

import { healingState } from "./PulseEarnHeartbeat-v31.js";

// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




const routedReflexes = new Map();
let reflexRouteCycle = 0;

export const routerHealing = {
  version: "v31.0-Immortal-ADV-PLUSPLUS",
  cycleCount: 0,

  lastReflexId: null,
  lastPattern: null,
  lastLineageDepth: null,

  lastBand: "symbolic",
  lastBandSignatureIntel: null,
  lastBandSignatureClassic: null,
  lastBinaryField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastChunkPrewarmPlan: null,

  lastRouterSignatureIntel: null,
  lastRouterSignatureClassic: null,
  lastDualHashField: null,
  lastHashIntellectSignature: null,

  lastDeviceProfileSnapshot: null,
  lastReflexSliceContext: null,

  // v31++ overlays
  lastRouterComputeProfileV31: null,
  lastRouterPressureProfileV31: null,
  lastRouterPulseIntelligenceV31: null
};

// ============================================================================
// HELPERS — v31 dual-hash + intel
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
  return `HINTEL31_${h}`;
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
    classic: classicHash,
    primary: classicHash,
    intellect: intelHash
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

function getOrCreateReflexRouteState(reflexId) {
  let state = routedReflexes.get(reflexId);
  if (!state) {
    state = {
      reflexId,
      count: 0,
      firstSeenCycle: reflexRouteCycle,
      lastSeenCycle: null
    };
    routedReflexes.set(reflexId, state);
  }
  return state;
}

function getReflexIdFromEarnReflex(earnReflex) {
  if (earnReflex.meta.reflexId) return earnReflex.meta.reflexId;
  const pulseId = earnReflex.meta.sourcePulseId || earnReflex.payload.pulseId || earnReflex.jobId || "UNKNOWN_PULSE";
  const organ = earnReflex.meta.sourceOrgan || "UNKNOWN_ORGAN";
  const reason = earnReflex.meta.sourceReason || "unknown_reason";
  return `${pulseId}::${organ}::${reason}`;
}

// ============================================================================
// A‑B‑A BINARY + WAVE (v31 Immortal-ADV-PLUSPLUS)
// ============================================================================

function buildRouteBandBinaryWave(earnReflex, reflexId, cycleIndex, device) {
  const pattern = earnReflex.pattern || "NO_PATTERN";
  const band = normalizeBand(
    earnReflex.meta.band ||
    earnReflex.band ||
    device.band ||
    "symbolic"
  );

  const patternLen = pattern.length;
  const lineageDepth = earnReflex.lineage.length || 0;
  const gpuScore = device.gpuScore || 0;
  const bandwidth = device.bandwidthMbps || 0;

  const surface = patternLen + lineageDepth + gpuScore + bandwidth + cycleIndex;

  const intelPayload = {
    kind: "routerBandBinaryWave",
    version: "v31.0",
    patternLen,
    lineageDepth,
    gpuScore,
    bandwidth,
    cycleIndex,
    surface,
    band
  };

  const classicString = `RFX_ROUTER31_BANDWAVE::${band}::${surface}`;
  const bandDual = buildDualHashSignature("REFLEX_ROUTER31_BANDWAVE", intelPayload, classicString);

  const binaryField = {
    binaryReflexSignature: computeHash(`BREFLEX_ROUTE31::${reflexId}::${surface}`),
    binarySurfaceSignature: computeHash(`BSURF_RFX_ROUTE31::${surface}`),
    binarySurface: {
      patternLen,
      lineageDepth,
      gpuScore,
      bandwidth,
      cycle: cycleIndex,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    density: patternLen + lineageDepth + gpuScore + bandwidth,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1))),
    bandIntelSignature: bandDual.intel
  };

  const waveField = {
    amplitude: patternLen + gpuScore + bandwidth,
    wavelength: cycleIndex || 1,
    phase: (patternLen + lineageDepth + cycleIndex) % 16,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave",
    waveIntelSignature: bandDual.intel
  };

  const bandSignature = bandDual.classic;

  routerHealing.lastBand = band;
  routerHealing.lastBandSignatureIntel = bandDual.intel;
  routerHealing.lastBandSignatureClassic = bandSignature;
  routerHealing.lastBinaryField = binaryField;
  routerHealing.lastWaveField = waveField;

  return { band, bandSignature, bandDual, binaryField, waveField };
}

// ============================================================================
// PRESENCE FIELD (v31 Immortal-ADV-PLUSPLUS)
// ============================================================================

function buildPresenceField(earnReflex, device, cycleIndex) {
  const patternLen = (earnReflex.pattern || "").length;
  const lineageDepth = earnReflex.lineage.length || 0;
  const stability = device.stabilityScore ?? 0.8;

  const magnitude = patternLen + lineageDepth;
  let presenceTier = "presence_idle";
  if (magnitude >= 100) presenceTier = "presence_high";
  else if (magnitude >= 30) presenceTier = "presence_mid";
  else if (magnitude > 0) presenceTier = "presence_low";

  const presenceBand = normalizeBand(device.presenceBand || device.band || "symbolic");

  const intelPayload = {
    kind: "routerPresence",
    version: "v31.0-Immortal-ADV-PLUSPLUS",
    presenceTier,
    patternLen,
    lineageDepth,
    stability,
    cycleIndex,
    presenceBand
  };

  const classicString =
    `RFX_ROUTER31_PRESENCE::${presenceTier}::${patternLen}::${lineageDepth}::${cycleIndex}::${presenceBand}`;

  const dual = buildDualHashSignature("REFLEX_ROUTER31_PRESENCE", intelPayload, classicString);

  const presenceField = {
    presenceVersion: "v31.0-Immortal-ADV-PLUSPLUS",
    presenceTier,
    presenceBand,
    patternLen,
    lineageDepth,
    stability,
    cycleIndex,
    presenceSignature: dual.classic,
    presenceIntellectSignature: dual.intel
  };

  routerHealing.lastPresenceField = presenceField;
  return presenceField;
}

// ============================================================================
// ADVANTAGE‑M31++ FIELD (structural-only, richer surface)
// ============================================================================

function buildAdvantageField(earnReflex, device, bandPack, presenceField) {
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
    kind: "routerAdvantage",
    version: "M-31.0-REFLEX-ROUTER",
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
    `RFX_ROUTER31_ADVANTAGE::${presenceTier}::${advantageTier}`;

  const dual = buildDualHashSignature("REFLEX_ROUTER31_ADVANTAGE", intelPayload, classicString);

  const advantageField = {
    advantageVersion: "M-31.0-REFLEX-ROUTER",
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
    advantageSignature: dual.classic,
    advantageIntelSignature: dual.intel
  };

  routerHealing.lastAdvantageField = advantageField;
  return advantageField;
}

// ============================================================================
// CHUNK / CACHE / PREWARM PLAN (v31-AdvantageM)
// ============================================================================

function buildChunkPrewarmPlan(earnReflex, device, presenceField, advantageField) {
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
    kind: "routerChunkPlan",
    version: "v31.0-AdvantageM-ReflexRouter",
    priorityLabel,
    bandPresence: presenceField.presenceTier,
    planSurface,
    advantageTier: advantageField.advantageTier
  };

  const classicString =
    `RFX_ROUTER31_CHUNKPLAN::${presenceField.presenceTier}::${priorityLabel}::${planSurface}`;

  const dual = buildDualHashSignature("REFLEX_ROUTER31_CHUNKPLAN", intelPayload, classicString);

  const chunkPrewarmPlan = {
    planVersion: "v31.0-AdvantageM-ReflexRouter",
    priorityLabel,
    bandPresence: presenceField.presenceTier,
    planSurface,
    chunks: {
      reflexEnvelope: true,
      earnHandoff: true,
      routerDiagnosticsEnvelope: true
    },
    cache: {
      reflexRouterDiagnostics: true,
      deviceProfile: true,
      presenceAdvantageSnapshot: true
    },
    prewarm: {
      nervousSystem: presenceField.presenceTier !== "presence_idle",
      receptorLayer: presenceField.presenceTier !== "presence_idle",
      earnSystem: presenceField.presenceTier === "presence_high"
    },
    chunkPlanSignature: dual.classic,
    chunkPlanIntelSignature: dual.intel
  };

  routerHealing.lastChunkPrewarmPlan = chunkPrewarmPlan;
  return chunkPrewarmPlan;
}

// ============================================================================
// v31++ ROUTER COMPUTE / PRESSURE / PULSE INTELLIGENCE
// ============================================================================

function deriveRouterFactoringSignal({ presenceField, advantageField }) {
  const mag =
    (presenceField.patternLen || 0) +
    (presenceField.lineageDepth || 0) +
    (advantageField.advantageScore || 0) * 1000;

  const scaled = clamp01(mag / 300);
  return scaled >= 0.6 ? 1 : 0;
}

function buildRouterComputeProfileV31(reflexId, bandPack, presenceField, advantageField) {
  const density = bandPack.binaryField.density;
  const amplitude = bandPack.waveField.amplitude;

  let computeTier = "router_tier_low";
  const magnitude = density + amplitude;
  if (magnitude >= 800) computeTier = "router_tier_ultra";
  else if (magnitude >= 400) computeTier = "router_tier_high";
  else if (magnitude >= 150) computeTier = "router_tier_mid";

  const factoringSignal = deriveRouterFactoringSignal({ presenceField, advantageField });

  const profile = {
    profileVersion: "ROUTER-COMPUTE-31++",
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

  routerHealing.lastRouterComputeProfileV31 = profile;
  return profile;
}

function buildRouterPressureProfileV31(presenceField, advantageField) {
  const magnitude =
    (presenceField.patternLen || 0) +
    (presenceField.lineageDepth || 0) +
    (advantageField.advantageScore || 0) * 1000;

  let pressureTier = "router_pressure_idle";
  if (magnitude >= 300) pressureTier = "router_pressure_critical";
  else if (magnitude >= 200) pressureTier = "router_pressure_high";
  else if (magnitude >= 80) pressureTier = "router_pressure_elevated";
  else if (magnitude > 0) pressureTier = "router_pressure_soft";

  const profile = {
    profileVersion: "ROUTER-PRESSURE-31++",
    pressureTier,
    presenceTier: presenceField.presenceTier,
    patternLen: presenceField.patternLen,
    lineageDepth: presenceField.lineageDepth,
    advantageScore: advantageField.advantageScore,
    advantageTier: advantageField.advantageTier
  };

  routerHealing.lastRouterPressureProfileV31 = profile;
  return profile;
}

function computeRouterPulseIntelligenceV31({
  presenceField,
  advantageField,
  computeProfileV31,
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

  const factoring = computeProfileV31.factoringSignal ? 1 : 0;
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
    routerPulseIntelligenceVersion: "ROUTER-PI-31++",
    solvednessScore,
    factoringSignal: computeProfileV31.factoringSignal ? "high" : "low",
    computeTier,
    readinessScore,
    band,
    advantageTier
  };

  routerHealing.lastRouterPulseIntelligenceV31 = intel;
  return intel;
}

// ============================================================================
// DIAGNOSTICS (v31, dualhash-aware surfaces)
// ============================================================================

function buildReflexDiagnostics(earnReflex, reflexId, state, bandPack, presenceField, advantageField, chunkPrewarmPlan) {
  const pattern = earnReflex.pattern || "NO_PATTERN";
  const lineageDepth = earnReflex.lineage.length || 0;

  const intelPayload = {
    kind: "routerDiagnostics",
    version: "v31.0",
    reflexId,
    pattern,
    lineageDepth,
    cycleIndex: reflexRouteCycle,
    instanceCount: state.count
  };

  const classicString =
    `RFX_ROUTER31_DIAG::${reflexId}::${pattern}::${reflexRouteCycle}`;

  const dual = buildDualHashSignature("REFLEX_ROUTER31_DIAG", intelPayload, classicString);

  return {
    reflexId,
    pattern,
    lineageDepth,
    cycleIndex: reflexRouteCycle,
    instanceCount: state.count,
    firstSeenCycle: state.firstSeenCycle,
    lastSeenCycle: state.lastSeenCycle,

    patternHash: computeHash(pattern),
    lineageHash: computeHash(String(lineageDepth)),
    reflexHash: computeHash(reflexId),
    cycleHash: computeHash(String(reflexRouteCycle)),

    band: bandPack.band,
    bandSignature: bandPack.bandSignature,
    bandIntelSignature: bandPack.bandDual.intel,

    binaryField: bandPack.binaryField,
    waveField: bandPack.waveField,

    presenceField,
    advantageField,
    chunkPrewarmPlan,

    diagnosticsSignature: dual.classic,
    diagnosticsIntelSignature: dual.intel
  };
}

// ============================================================================
// ROUTER SIGNATURE + DUALHASH FIELD (v31)
// ============================================================================

function buildRouterSignatures(reflexId, diagnostics, presenceField, bandPack, advantageField) {
  const base =
    `${reflexId}::${diagnostics.pattern}::${diagnostics.cycleIndex}` +
    `::${bandPack.band}::${presenceField.presenceTier}::${advantageField.advantageScore}`;

  const dual = buildDualHashSignature("REFLEX_ROUTER31", base, base);

  const routerSignatureClassic = dual.primary;
  const hashIntellectSignature = dual.intellect;

  const dualHashField = {
    label: "REFLEX_ROUTER31",
    basePayload: base,
    primarySignature: dual.primary,
    intellectSignature: dual.intellect
  };

  routerHealing.lastRouterSignatureClassic = routerSignatureClassic;
  routerHealing.lastRouterSignatureIntel = hashIntellectSignature;
  routerHealing.lastDualHashField = dualHashField;
  routerHealing.lastHashIntellectSignature = hashIntellectSignature;

  return { routerSignatureClassic, dualHashField, hashIntellectSignature };
}

// ============================================================================
// PUBLIC API — v31 Immortal-ADV-PLUSPLUS Reflex Router
// ============================================================================

export const PulseEarnReflexRouter = {

  // Pure handoff builder: no routing/sending, just a deterministic envelope
  route(earnReflex, reflexSliceContext = {}, deviceProfile = {}) {
    reflexRouteCycle++;
    routerHealing.cycleCount++;

    if (!earnReflex || !earnReflex.meta.reflex) {
      return {
        ok: false,
        reason: "invalid_reflex",
        reflex: earnReflex
      };
    }

    const reflexId = getReflexIdFromEarnReflex(earnReflex);
    const state = getOrCreateReflexRouteState(reflexId);
    state.count++;
    state.lastSeenCycle = reflexRouteCycle;

    routerHealing.lastReflexId = reflexId;
    routerHealing.lastPattern = earnReflex.pattern || null;
    routerHealing.lastLineageDepth = earnReflex.lineage.length || 0;
    routerHealing.lastDeviceProfileSnapshot = {
      band: deviceProfile.band,
      presenceBand: deviceProfile.presenceBand,
      gpuScore: deviceProfile.gpuScore,
      bandwidthMbps: deviceProfile.bandwidthMbps,
      stabilityScore: deviceProfile.stabilityScore
    };
    routerHealing.lastReflexSliceContext = reflexSliceContext || null;

    const bandPack = buildRouteBandBinaryWave(
      earnReflex,
      reflexId,
      reflexRouteCycle,
      deviceProfile
    );

    const presenceField = buildPresenceField(
      earnReflex,
      deviceProfile,
      reflexRouteCycle
    );

    const advantageField = buildAdvantageField(
      earnReflex,
      deviceProfile,
      bandPack,
      presenceField
    );

    const chunkPrewarmPlan = buildChunkPrewarmPlan(
      earnReflex,
      deviceProfile,
      presenceField,
      advantageField
    );

    const routerComputeProfileV31 = buildRouterComputeProfileV31(
      reflexId,
      bandPack,
      presenceField,
      advantageField
    );

    const routerPressureProfileV31 = buildRouterPressureProfileV31(
      presenceField,
      advantageField
    );

    const routerPulseIntelligenceV31 = computeRouterPulseIntelligenceV31({
      presenceField,
      advantageField,
      computeProfileV31: routerComputeProfileV31,
      band: bandPack.band
    });

    const diagnostics = buildReflexDiagnostics(
      earnReflex,
      reflexId,
      state,
      bandPack,
      presenceField,
      advantageField,
      chunkPrewarmPlan
    );

    const { routerSignatureClassic, dualHashField, hashIntellectSignature } =
      buildRouterSignatures(reflexId, diagnostics, presenceField, bandPack, advantageField);

    const handoff = {
      kind: "ReflexRouterHandoff",
      version: "31.0-Immortal-ADV-PLUSPLUS",
      identity: "PulseEarnReflexRouter-v31.0-Immortal-ADV-PLUSPLUS",
      reflexId,
      pattern: earnReflex.pattern,
      jobId: earnReflex.jobId,
      payload: earnReflex.payload,
      meta: {
        fromReflex: true,
        originReflexIdentity: earnReflex.EarnRole.identity,
        routerSignature: routerSignatureClassic,
        hashIntellectSignature,
        band: bandPack.band,
        bandSignature: bandPack.bandSignature,
        reflexSliceContext,
        cycleIndex: reflexRouteCycle
      }
    };

    return {
      ok: true,
      reflexId,
      handoff,
      diagnostics,
      routerSignature: routerSignatureClassic,
      hashIntellectSignature,
      dualHashField,
      band: bandPack.band,
      bandSignature: bandPack.bandSignature,
      binaryField: bandPack.binaryField,
      waveField: bandPack.waveField,
      presenceField,
      advantageField,
      chunkPrewarmPlan,
      routerComputeProfileV31,
      routerPressureProfileV31,
      routerPulseIntelligenceV31
    };
  },

  getRoutedState(reflexId) {
    if (reflexId) return routedReflexes.get(reflexId) || null;
    return Array.from(routedReflexes.values());
  },

  getHealingState() {
    return { ...routerHealing };
  }
};

PulseRealm.EarnReflexRouter = {
  PulseEarnReflexRouter,
  routerHealing
}