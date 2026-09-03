// ============================================================================
//  PulseEarnSendSystem-v31-LYMPH-NODES.js
//  Earn → Pulse → Send Conductor (v31 LYMPH-NODES + IMMORTAL-INTEL)
//  Deterministic, Governed Single-Pass, DualBand + DualHash +
//  Presence/Advantage/Chunk + LymphNodes/Immune/Liquidity surfaces
// ============================================================================
// Legacy bridge imports (v24 Earn core – unchanged)
import { createEarn, evolveEarn, readCoreMemoryEarn, writeCoreMemoryEarn } from "../PulseEarn-v31.js";
import { PulseSDN } from "../../PULSE-OS/PulseOSSDNPrewarm-v30.js";
import { PulseEarnContinuancePulse } from "./PulseEarnContinuancePulse-v31.js";



// ---------------------------------------------------------------------------
// Deterministic Hash Helpers — v31 IMMORTAL-INTEL
// ---------------------------------------------------------------------------
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
  const base = JSON.stringify(payload || {});
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

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

function clamp01(x) {
  if (x == null || Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

function normalizeCachePriority(p) {
  if (!p) return "normal";
  const v = String(p).toLowerCase();
  if (v === "critical" || v === "high" || v === "low") return v;
  return "normal";
}

function deriveFactoringSignalFromContext({
  meshPressureIndex = 0,
  cachePriority = "normal",
  prewarmNeeded = false
}) {
  const pressure = clamp01(meshPressureIndex / 100);
  const highPressure = pressure >= 0.7;
  const criticalCache = cachePriority === "critical";

  if (criticalCache || prewarmNeeded) return 1;
  if (highPressure) return 1;
  return 0;
}

// ---------------------------------------------------------------------------
// Healing Metadata — Send Conductor Activity Log (v31-LYMPH-NODES)
// ---------------------------------------------------------------------------
export const sendHealing = {
  version: "v31-LYMPH-NODES-IMMORTAL-INTEL",
  cycleCount: 0,
  lastImpulseId: null,
  lastEarnPattern: null,
  lastEarnLineageDepth: 0,
  lastFallbackUsed: false,

  lastBand: "symbolic",
  lastBandSignatureClassic: null,
  lastBandSignatureIntel: null,
  lastBinaryField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastPresenceSignatureClassic: null,
  lastPresenceSignatureIntel: null,

  lastAdvantageField: null,
  lastAdvantageSignatureClassic: null,
  lastAdvantageSignatureIntel: null,

  lastChunkPrewarmPlan: null,
  lastChunkPrewarmSignatureClassic: null,
  lastChunkPrewarmSignatureIntel: null,

  lastFactoringSignal: 0,

  lastSendSignatureClassic: null,
  lastSendSignatureIntel: null,
  lastMetaSignatureClassic: null,
  lastMetaSignatureIntel: null,

  // v31+ lymph / immune / liquidity overlays
  lastLymphNodesField: null,
  lastImmuneField: null,
  lastLiquidityField: null,

  lastError: null
};

export function getPulseEarnSendSystemHealingState_v31() {
  return { ...sendHealing };
}

// ---------------------------------------------------------------------------
// Legacy / Envelope Helpers (unchanged behavior)
// ---------------------------------------------------------------------------
function isEarnReentryImpulse(impulse) {
  if (!impulse || !impulse.payload) return false;

  const earn = impulse.payload.earn;
  if (!earn) return false;

  if (earn.role.identity === "PulseEarn-v16") return true;
  if (earn.__earnEnvelope === true) return true;

  return false;
}

function tagImpulseAsEarnSent(impulse, pulseCompatibleEarn) {
  const basePayload = impulse.payload || {};

  return {
    ...impulse,
    payload: {
      ...basePayload,
      earn: {
        ...(pulseCompatibleEarn || {}),
        __earnEnvelope: true
      },
      __earnSent: true
    }
  };
}

function tryEarnV11(impulse) {
  try {
    const baseEarn = createEarn({
      jobId: impulse.tickId,
      pattern:
        impulse.intent ||
        impulse.payload.pattern ||
        "UNKNOWN_EARN_PATTERN",
      payload: impulse.payload || {},
      priority: impulse.payload.priority || "normal",
      returnTo: impulse.payload.returnTo || null,
      parentLineage: impulse.payload.parentLineage || null,
      pageId: impulse.payload.pageId || "NO_PAGE"
    });

    const evolved =
      typeof evolveEarn === "function"
        ? evolveEarn(baseEarn, {
            source: "PulseEarnSendSystem-v31-LYMPH-NODES",
            intent: impulse.intent,
            lineage: impulse.payload.parentLineage || null
          })
        : baseEarn;

    return { ok: true, earn: evolved || baseEarn };
  } catch (err) {
    return { ok: false, error: err };
  }
}

function buildEarnV1Continuance(impulse) {
  const cont = PulseEarnContinuancePulse.build(impulse);
  return cont.earn;
}

function wrapEarnForPulse(earn) {
  return {
    PulseRole: earn.EarnRole,
    jobId: earn.jobId,
    pattern: earn.pattern,
    payload: earn.payload,
    priority: earn.priority,
    returnTo: earn.returnTo,
    lineage: earn.lineage,
    pageId: earn.pageId,
    meta: {
      ...(earn.meta || {}),
      origin: "Earn",
      earnVersion: earn.EarnRole.version || "unknown",
      earnIdentity: earn.EarnRole.identity || "Earn",
      earnEnvelope: true
    },

    earn: {
      role: earn.EarnRole,
      pattern: earn.pattern,
      lineage: earn.lineage,
      meta: earn.meta,
      __earnEnvelope: true
    }
  };
}

// ---------------------------------------------------------------------------
// Band / Binary / Wave Surfaces — v31
// ---------------------------------------------------------------------------
function buildEarnSendBandBinaryWave(earn, fallbackUsed, cycleIndex, deviceProfile) {
  const band = normalizeBand(
    earn.meta.band ||
    earn.band ||
    deviceProfile.band ||
    "symbolic"
  );

  const patternLen = String(earn.pattern || "").length;
  const lineageDepth = earn.lineage.length || 0;
  const fallbackFlag = fallbackUsed ? 1 : 0;
  const gpuScore = deviceProfile.gpuScore || 0;

  const surface =
    patternLen +
    lineageDepth +
    fallbackFlag +
    gpuScore +
    cycleIndex;

  const intelPayload = {
    kind: "earnSendBand",
    version: "v31-LYMPH-NODES",
    cycleIndex,
    band,
    patternLen,
    lineageDepth,
    fallbackFlag,
    gpuScore,
    surface
  };

  const classicString =
    `BAND:${band}` +
    `::PAT:${patternLen}` +
    `::LIN:${lineageDepth}` +
    `::FB:${fallbackFlag}` +
    `::GPU:${gpuScore}` +
    `::CYCLE:${cycleIndex}`;

  const sig = buildDualHashSignature("EARN_SEND_BAND_V31", intelPayload, classicString);

  const binaryField = {
    binaryEarnSendSignature: computeHash(`BESEND_V31::${surface}`),
    binarySurfaceSignature: computeHash(`BSURF_ESEND_V31::${surface}`),
    binarySurface: {
      patternLen,
      lineageDepth,
      fallbackFlag,
      gpuScore,
      cycle: cycleIndex,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    density: patternLen + lineageDepth + gpuScore,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };

  const waveField = {
    amplitude: patternLen + gpuScore,
    wavelength: cycleIndex || 1,
    phase: (patternLen + lineageDepth + cycleIndex) % 8,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };

  sendHealing.lastBand = band;
  sendHealing.lastBandSignatureClassic = sig.classic;
  sendHealing.lastBandSignatureIntel = sig.intel;
  sendHealing.lastBinaryField = binaryField;
  sendHealing.lastWaveField = waveField;

  return { band, bandSignatureClassic: sig.classic, bandSignatureIntel: sig.intel, binaryField, waveField };
}

// ---------------------------------------------------------------------------
// Presence Field — v31
// ---------------------------------------------------------------------------
function buildPresenceField(earn, deviceProfile, fallbackUsed, cycleIndex) {
  const patternLen = String(earn.pattern || "").length;
  const lineageDepth = earn.lineage.length || 0;
  const band = normalizeBand(deviceProfile.band || earn.band || "symbolic");

  const composite =
    patternLen * 0.001 +
    lineageDepth * 0.002 +
    (fallbackUsed ? -0.003 : 0.003) +
    (deviceProfile.stabilityScore || 0.7) * 0.01;

  const presenceTier =
    composite >= 0.02 ? "presence_high" :
    composite >= 0.005 ? "presence_mid" :
    patternLen + lineageDepth > 0 ? "presence_low" :
    "presence_idle";

  const presenceField = {
    presenceVersion: "v31-LYMPH-NODES-SEND",
    presenceTier,
    band,
    patternLen,
    lineageDepth,
    fallbackUsed,
    cycleIndex
  };

  const intelPayload = {
    kind: "earnSendPresence",
    version: "v31-LYMPH-NODES",
    cycleIndex,
    presenceTier,
    band,
    patternLen,
    lineageDepth,
    fallbackUsed
  };

  const classicString =
    `PRES:${presenceTier}` +
    `::BAND:${band}` +
    `::PAT:${patternLen}` +
    `::LIN:${lineageDepth}` +
    `::FB:${fallbackUsed ? 1 : 0}` +
    `::CYCLE:${cycleIndex}`;

  const sig = buildDualHashSignature("EARN_SEND_PRESENCE_V31", intelPayload, classicString);

  sendHealing.lastPresenceField = presenceField;
  sendHealing.lastPresenceSignatureClassic = sig.classic;
  sendHealing.lastPresenceSignatureIntel = sig.intel;

  return { presenceField, presenceSignatureClassic: sig.classic, presenceSignatureIntel: sig.intel };
}

// ---------------------------------------------------------------------------
// Advantage‑M Field — v31
// ---------------------------------------------------------------------------
function buildAdvantageField({
  earn,
  deviceProfile,
  bandPack,
  presenceField,
  factoringSignal,
  serverPressure = 0,
  serverBoost = 0,
  earnLineageDepth = 0,
  earnPatternLen = 0,
  earnFallbackPenalty = 0,
  cycleIndex
}) {
  const gpuScore = Number(deviceProfile.gpuScore || 0);
  const bandwidth = Number(deviceProfile.bandwidthMbps || 0);
  const cpuScore = Number(deviceProfile.cpuScore || 0);
  const thermalHeadroom = Number(deviceProfile.thermalHeadroom || 0);
  const deviceTier = deviceProfile.tier || "unknown";

  const density = Number(bandPack.binaryField.density || 0);
  const amplitude = Number(bandPack.waveField.amplitude || 0);
  const band = bandPack.band || "symbolic";

  const presenceTier = presenceField.presenceTier || "presence_idle";

  const presenceBoost =
    presenceTier === "presence_high" ? 0.02 :
    presenceTier === "presence_mid"  ? 0.01 :
    presenceTier === "presence_low"  ? 0.005 :
    0;

  const factoringIntensity =
    factoringSignal === "critical" ? 3 :
    factoringSignal === "high"     ? 2 :
    factoringSignal === "medium"   ? 1 :
    0;

  const factoringBoost = factoringIntensity * 0.01;

  const tierBoost =
    deviceTier === "ultra" ? 0.02 :
    deviceTier === "high"  ? 0.015 :
    deviceTier === "mid"   ? 0.01 :
    deviceTier === "low"   ? 0.005 :
    0;

  const serverPressureBoost = Math.min(serverPressure * 0.01, 0.05);
  const serverBoostBoost = Math.min(serverBoost * 0.01, 0.05);

  const advantageScore =
    gpuScore * 0.0004 +
    cpuScore * 0.0002 +
    bandwidth * 0.00015 +
    density * 0.00001 +
    amplitude * 0.00001 +
    presenceBoost +
    factoringBoost +
    tierBoost +
    serverPressureBoost +
    serverBoostBoost +
    earnFallbackPenalty +
    earnLineageDepth * 0.0005 +
    earnPatternLen * 0.00001;

  const advantageField = {
    advantageVersion: "M-31.0-Immortal-CHUNK-SEND-LYMPH",
    band,
    advantageScore,
    presenceTier,
    factoringSignal,
    gpuScore,
    cpuScore,
    bandwidth,
    thermalHeadroom,
    deviceTier,
    lineageDepth: earnLineageDepth,
    earnPatternLen,
    earnFallbackPenalty,
    binaryDensity: density,
    waveAmplitude: amplitude,
    boosts: {
      presenceBoost,
      factoringBoost,
      tierBoost,
      serverPressureBoost,
      serverBoostBoost
    },
    cycleIndex
  };

  const intelPayload = {
    kind: "earnSendAdvantage",
    version: "v31-LYMPH-NODES",
    cycleIndex,
    advantageScore,
    presenceTier,
    factoringSignal,
    gpuScore,
    cpuScore,
    bandwidth,
    thermalHeadroom,
    deviceTier,
    lineageDepth: earnLineageDepth,
    earnPatternLen,
    earnFallbackPenalty,
    binaryDensity: density,
    waveAmplitude: amplitude
  };

  const classicString =
    `ADV:${advantageScore.toFixed(6)}` +
    `::PRES:${presenceTier}` +
    `::FACT:${factoringSignal}` +
    `::GPU:${gpuScore}` +
    `::CPU:${cpuScore}` +
    `::BW:${bandwidth}` +
    `::TIER:${deviceTier}` +
    `::LIN:${earnLineageDepth}` +
    `::PAT:${earnPatternLen}` +
    `::FB:${earnFallbackPenalty}`;

  const sig = buildDualHashSignature("EARN_SEND_ADVANTAGE_V31", intelPayload, classicString);

  sendHealing.lastAdvantageField = advantageField;
  sendHealing.lastAdvantageSignatureClassic = sig.classic;
  sendHealing.lastAdvantageSignatureIntel = sig.intel;
  sendHealing.lastFactoringSignal = factoringSignal;

  return { advantageField, advantageSignatureClassic: sig.classic, advantageSignatureIntel: sig.intel };
}

// ---------------------------------------------------------------------------
// Chunk / Cache / Prewarm Plan — v31 + LymphNodes
// ---------------------------------------------------------------------------
function buildChunkPrewarmPlan({
  earn,
  deviceProfile,
  presenceField,
  factoringSignal,
  serverPressure = 0,
  serverRecommendedChunk = null,
  serverRecommendedPrewarm = null,
  earnLineageDepth = 0,
  earnPatternLen = 0,
  cycleIndex
}) {
  let priorityLabel = "idle";

  if (presenceField.presenceTier === "presence_high") {
    priorityLabel = "high";
  } else if (presenceField.presenceTier === "presence_mid") {
    priorityLabel = "medium";
  } else if (presenceField.presenceTier === "presence_low") {
    priorityLabel = "low";
  }

  if (earnLineageDepth > 6 && priorityLabel !== "high") {
    priorityLabel = "medium";
  }

  const deviceTier = deviceProfile.tier || "unknown";
  const deviceKind = deviceProfile.kind || "generic";
  const devicePerf = Number(deviceProfile.performanceIndex || 0);

  const deviceBoost =
    devicePerf >= 90 ? "ultra" :
    devicePerf >= 70 ? "high" :
    devicePerf >= 40 ? "medium" :
    "low";

  const factoringIntensity =
    factoringSignal === "critical"
      ? 3
      : factoringSignal === "high"
      ? 2
      : factoringSignal === "medium"
      ? 1
      : 0;

  const lymphNodeTier =
    presenceField.presenceTier === "presence_high" || factoringIntensity >= 2
      ? "lymph_overdrive"
      : presenceField.presenceTier === "presence_mid"
      ? "lymph_active"
      : presenceField.presenceTier === "presence_low"
      ? "lymph_soft"
      : "lymph_idle";

  const immuneScanRequired =
    presenceField.presenceTier === "presence_high" ||
    factoringIntensity >= 2 ||
    earnLineageDepth >= 5;

  const liquidityTier =
    serverPressure >= 80
      ? "liquidity_conserve"
      : serverPressure >= 40
      ? "liquidity_balance"
      : "liquidity_open";

  const plan = {
    planVersion: "v31.0-AdvantageM-Immortal-CHUNK-SEND-LYMPH",
    priorityLabel,
    presenceTier: presenceField.presenceTier,
    factoringSignal,
    lineageDepth: earnLineageDepth,
    deviceTier,
    deviceKind,
    deviceBoost,

    chunks: {
      jobEnvelope: true,
      metabolismBlueprint: true,
      marketplaceHandshake: true,
      lineageChunk: earnLineageDepth > 4,
      devicePerfChunk: deviceBoost !== "low",
      serverRecommendedChunk: !!serverRecommendedChunk,
      lymphNodeMap: lymphNodeTier !== "lymph_idle",
      immuneDiagnosticsChunk: immuneScanRequired
    },

    cache: {
      deviceProfile: true,
      survivalDiagnostics: true,
      performanceCache: deviceBoost === "ultra" || deviceBoost === "high",
      lymphHistoryCache: lymphNodeTier !== "lymph_idle"
    },

    prewarm: {
      metabolismOrgan: presenceField.presenceTier !== "presence_idle",
      lymphaticHandshake:
        presenceField.presenceTier !== "presence_idle" &&
        deviceBoost !== "low",
      immuneSystemScan: immuneScanRequired,
      lineagePrewarm: earnLineageDepth >= 5,
      serverRecommendedPrewarm: !!serverRecommendedPrewarm
    },

    lymphNodes: {
      lymphNodeTier,
      immuneScanRequired,
      liquidityTier
    },

    meta: {
      cycleIndex,
      devicePerf,
      factoringIntensity,
      serverPressure,
      earnPatternLen
    }
  };

  const intelPayload = {
    kind: "earnSendChunkPrewarm",
    version: "v31-LYMPH-NODES",
    cycleIndex,
    priorityLabel,
    presenceTier: presenceField.presenceTier,
    factoringSignal,
    lineageDepth: earnLineageDepth,
    deviceTier,
    deviceKind,
    deviceBoost,
    devicePerf,
    factoringIntensity,
    serverPressure,
    earnPatternLen,
    lymphNodeTier,
    liquidityTier
  };

  const classicString =
    `PLAN_V31:${priorityLabel}` +
    `::PRES:${presenceField.presenceTier}` +
    `::FACT:${factoringSignal}` +
    `::LIN:${earnLineageDepth}` +
    `::DTIER:${deviceTier}` +
    `::DKIND:${deviceKind}` +
    `::DBOOST:${deviceBoost}` +
    `::DPERF:${devicePerf}` +
    `::SP:${serverPressure}` +
    `::PAT:${earnPatternLen}` +
    `::LYMPH:${lymphNodeTier}` +
    `::LIQ:${liquidityTier}` +
    `::CYCLE:${cycleIndex}`;

  const sig = buildDualHashSignature("EARN_SEND_CHUNK_PREWARM_V31", intelPayload, classicString);

  sendHealing.lastChunkPrewarmPlan = plan;
  sendHealing.lastChunkPrewarmSignatureClassic = sig.classic;
  sendHealing.lastChunkPrewarmSignatureIntel = sig.intel;

  sendHealing.lastLymphNodesField = plan.lymphNodes;
  sendHealing.lastImmuneField = {
    immuneScanRequired,
    immuneSystemScan: plan.prewarm.immuneSystemScan
  };
  sendHealing.lastLiquidityField = {
    liquidityTier,
    serverPressure
  };

  return { chunkPrewarmPlan: plan, chunkPrewarmSignatureClassic: sig.classic, chunkPrewarmSignatureIntel: sig.intel };
}

// ---------------------------------------------------------------------------
// Send Conductor Meta — v31-LYMPH-NODES
// ---------------------------------------------------------------------------
function buildSendConductorMeta({
  cycleIndex,
  earn,
  bandPack,
  presenceField,
  advantageField,
  chunkPrewarmPlan,
  factoringSignal
}) {
  const intelPayload = {
    kind: "earnSendConductor",
    version: "v31-LYMPH-NODES",
    cycleIndex,
    pattern: earn.pattern || "NO_PATTERN",
    lineageDepth: earn.lineage.length || 0,
    band: bandPack.band,
    factoringSignal,
    presenceTier: presenceField.presenceTier,
    advantageScore: advantageField.advantageScore,
    chunkPriority: chunkPrewarmPlan.priorityLabel,
    lymphNodeTier: chunkPrewarmPlan.lymphNodes.lymphNodeTier || "lymph_idle",
    liquidityTier: chunkPrewarmPlan.lymphNodes.liquidityTier || "liquidity_open"
  };

  const classicString =
    `SEND_COND_V31` +
    `::PAT:${earn.pattern || "NO_PATTERN"}` +
    `::LIN:${earn.lineage.length || 0}` +
    `::BAND:${bandPack.band}` +
    `::FACT:${factoringSignal}` +
    `::PRES:${presenceField.presenceTier}` +
    `::ADV:${advantageField.advantageScore.toFixed(6)}` +
    `::CHUNK:${chunkPrewarmPlan.priorityLabel}` +
    `::LYMPH:${chunkPrewarmPlan.lymphNodes.lymphNodeTier || "lymph_idle"}` +
    `::LIQ:${chunkPrewarmPlan.lymphNodes.liquidityTier || "liquidity_open"}` +
    `::CYCLE:${cycleIndex}`;

  const sig = buildDualHashSignature("EARN_SEND_CONDUCTOR_META_V31", intelPayload, classicString);

  sendHealing.lastMetaSignatureClassic = sig.classic;
  sendHealing.lastMetaSignatureIntel = sig.intel;

  return {
    layer: "PulseEarnSendSystem",
    role: "EARN_SEND_CONDUCTOR_META_V31_LYMPH",
    version: "v31-LYMPH-NODES",
    signatures: {
      metaSignatureIntel: sig.intel,
      metaSignatureClassic: sig.classic,
      bandSignatureIntel: bandPack.bandSignatureIntel,
      bandSignatureClassic: bandPack.bandSignatureClassic,
      presenceSignatureIntel: sendHealing.lastPresenceSignatureIntel,
      presenceSignatureClassic: sendHealing.lastPresenceSignatureClassic,
      advantageSignatureIntel: sendHealing.lastAdvantageSignatureIntel,
      advantageSignatureClassic: sendHealing.lastAdvantageSignatureClassic,
      chunkPrewarmSignatureIntel: sendHealing.lastChunkPrewarmSignatureIntel,
      chunkPrewarmSignatureClassic: sendHealing.lastChunkPrewarmSignatureClassic
    },
    profile: {
      cycleIndex,
      pattern: earn.pattern || "NO_PATTERN",
      lineageDepth: earn.lineage.length || 0,
      band: bandPack.band,
      factoringSignal,
      presenceTier: presenceField.presenceTier,
      advantageScore: advantageField.advantageScore,
      chunkPriority: chunkPrewarmPlan.priorityLabel,
      lymphNodeTier: chunkPrewarmPlan.lymphNodes.lymphNodeTier || "lymph_idle",
      liquidityTier: chunkPrewarmPlan.lymphNodes.liquidityTier || "liquidity_open"
    }
  };
}

// ---------------------------------------------------------------------------
// PUBLIC API — createPulseEarnSendSystem (v31-LYMPH-NODES)
// ---------------------------------------------------------------------------
export function createPulseEarnSendSystem_v31({
  sendSystem=PulseRealm.PulseSendSystem,
  sdn = PulseSDN,
  log = console.log,
  deviceProfile = null
}) {
  function emitSDN(event, payload) {
    if (!sdn || typeof sdn.emitImpulse !== "function") return;
    try {
      sdn.emitImpulse(event, payload);
    } catch (err) {
      log && log("[PulseEarnSendSystem-v31-LYMPH-NODES] SDN emit failed (non‑fatal)", {
        event,
        err
      });
    }
  }

  return {
    // Deterministic Single‑Pass Earn → Pulse → Send
    send(impulse, context = {}) {
      sendHealing.cycleCount++;

      const cycleIndex = impulse.tickId || sendHealing.cycleCount;
      const meshSignals = context.meshSignals || {};
      const serverAdvantageHints = context.serverAdvantageHints || {};
      const globalHints = context.globalHints || {};

      const cachePriority = normalizeCachePriority(globalHints.cacheHints.priority);
      const prewarmNeeded = !!(globalHints.prewarmHints.shouldPrewarm);
      const meshPressureIndex = meshSignals.meshPressureIndex || 0;

      const factoringSignal = deriveFactoringSignalFromContext({
        meshPressureIndex,
        cachePriority,
        prewarmNeeded
      });

      emitSDN("earnSend:begin_v31", {
        tickId: impulse.tickId,
        intent: impulse.intent,
        cycleIndex,
        cachePriority,
        prewarmNeeded,
        meshPressureIndex,
        factoringSignal
      });

      sendHealing.lastImpulseId = impulse.tickId || null;
      sendHealing.lastError = null;

      // GOVERNOR — block Earn re-entry
      if (isEarnReentryImpulse(impulse)) {
        const blocked = {
          ok: false,
          blocked: true,
          reason: "earn_reentry_blocked",
          impulse,
          note: "Earn → Send → Earn loop prevented.",
          factoringSignal
        };
        sendHealing.lastError = "earn_reentry_blocked";
        emitSDN("earnSend:blocked_v31", blocked);
        return blocked;
      }

      // Legacy bridge
      const v11 = tryEarnV11(impulse);

      let earn = null;
      let usedFallback = false;

      if (v11.ok) {
        earn = v11.earn;
        emitSDN("earnSend:earn-v11_v31", {
          tickId: impulse.tickId,
          pattern: earn.pattern,
          lineageDepth: earn.lineage.length
        });
      } else {
        earn = buildEarnV1Continuance(impulse);
        usedFallback = true;
        emitSDN("earnSend:earn-v1-fallback_v31", {
          tickId: impulse.tickId,
          error: String(v11.error),
          pattern: earn.pattern
        });
      }

      sendHealing.lastEarnPattern = earn.pattern || null;
      sendHealing.lastEarnLineageDepth = earn.lineage.length || 0;
      sendHealing.lastFallbackUsed = usedFallback;

      // Wrap Earn organism for Pulse
      const pulseCompatibleEarn = wrapEarnForPulse(earn);

      emitSDN("earnSend:wrapped_v31", {
        tickId: impulse.tickId,
        earnIdentity: earn.EarnRole.identity,
        pulseCompatibleEarn
      });

      // Tag impulse as Earn → Pulse
      const governedImpulse = tagImpulseAsEarnSent(
        impulse,
        pulseCompatibleEarn
      );

      // Band/Binary/Wave
      const bandPack = buildEarnSendBandBinaryWave(
        earn,
        usedFallback,
        cycleIndex,
        deviceProfile || {}
      );

      // Presence
      const { presenceField } = buildPresenceField(
        earn,
        deviceProfile || {},
        usedFallback,
        cycleIndex
      );

      // Server hints
      const serverPressure = Number(serverAdvantageHints.pressure || 0);
      const serverBoost = Number(serverAdvantageHints.boost || 0);
      const serverRecommendedFactoring = serverAdvantageHints.recommendedFactoring || null;
      const serverRecommendedChunk = serverAdvantageHints.recommendedChunk || null;
      const serverRecommendedPrewarm = serverAdvantageHints.recommendedPrewarm || null;

      const earnLineageDepth = earn.lineage.length || 0;
      const earnPatternLen = (earn.pattern || "").length;
      const earnFallbackPenalty = usedFallback ? -0.02 : 0;

      const factoringMerged =
        serverRecommendedFactoring ||
        factoringSignal;

      // Advantage
      const { advantageField } = buildAdvantageField({
        earn,
        deviceProfile: deviceProfile || {},
        bandPack,
        presenceField,
        factoringSignal: factoringMerged,
        serverPressure,
        serverBoost,
        earnLineageDepth,
        earnPatternLen,
        earnFallbackPenalty,
        cycleIndex
      });

      // Chunk/Prewarm + LymphNodes
      const { chunkPrewarmPlan } = buildChunkPrewarmPlan({
        earn,
        deviceProfile: deviceProfile || {},
        presenceField,
        factoringSignal: factoringMerged,
        serverPressure,
        serverRecommendedChunk,
        serverRecommendedPrewarm,
        earnLineageDepth,
        earnPatternLen,
        cycleIndex
      });

      // Send signature (dualhash)
      const sendIntelPayload = {
        kind: "earnSend",
        version: "v31-LYMPH-NODES",
        cycleIndex,
        pattern: earn.pattern || "NO_PATTERN",
        lineageDepth: earn.lineage.length || 0,
        fallback: !!usedFallback,
        band: bandPack.band,
        factoringSignal: factoringMerged
      };

      const sendClassicString =
        `${earn.pattern || "NO_PATTERN"}` +
        `::LINEAGE:${earn.lineage.length || 0}` +
        `::${usedFallback ? "fallback" : "primary"}` +
        `::BAND:${bandPack.band}` +
        `::FACT:${factoringMerged}` +
        `::CYCLE:${cycleIndex}`;

      const sendSig = buildDualHashSignature(
        "EARN_SEND_CONDUCTOR_V31",
        sendIntelPayload,
        sendClassicString
      );

      sendHealing.lastSendSignatureClassic = sendSig.classic;
      sendHealing.lastSendSignatureIntel = sendSig.intel;

      // Meta block (includes lymph/liquidity)
      const sendConductorMeta = buildSendConductorMeta({
        cycleIndex,
        earn,
        bandPack,
        presenceField,
        advantageField,
        chunkPrewarmPlan,
        factoringSignal: factoringMerged
      });

      // Delegate to PulseSendSystem
      let result;
      try {
        result = sendSystem.send(governedImpulse);
      } catch (err) {
        sendHealing.lastError = String(err && err.message ? err.message : err);
        const failure = {
          ok: false,
          error: sendHealing.lastError,
          earn,
          pulseCompatibleEarn,
          fallback: usedFallback,

          sendSignatureClassic: sendSig.classic,
          sendSignatureIntel: sendSig.intel,

          band: bandPack.band,
          bandSignatureClassic: bandPack.bandSignatureClassic,
          bandSignatureIntel: bandPack.bandSignatureIntel,
          binaryField: bandPack.binaryField,
          waveField: bandPack.waveField,

          presenceField,
          advantageField,
          chunkPrewarmPlan,
          factoringSignal: factoringMerged,

          lymphNodesField: sendHealing.lastLymphNodesField,
          immuneField: sendHealing.lastImmuneField,
          liquidityField: sendHealing.lastLiquidityField,

          sendConductorMeta
        };
        emitSDN("earnSend:error_v31", failure);
        return failure;
      }

      const out = {
        ok: true,
        earn,
        pulseCompatibleEarn,
        result,
        fallback: usedFallback,

        sendSignatureClassic: sendSig.classic,
        sendSignatureIntel: sendSig.intel,

        band: bandPack.band,
        bandSignatureClassic: bandPack.bandSignatureClassic,
        bandSignatureIntel: bandPack.bandSignatureIntel,
        binaryField: bandPack.binaryField,
        waveField: bandPack.waveField,

        presenceField,
        advantageField,
        chunkPrewarmPlan,
        factoringSignal: factoringMerged,

        lymphNodesField: sendHealing.lastLymphNodesField,
        immuneField: sendHealing.lastImmuneField,
        liquidityField: sendHealing.lastLiquidityField,

        sendConductorMeta
      };

      emitSDN("earnSend:complete_v31", out);
      return out;
    }
  };
}

export const evolveEarnSend = evolveEarn;
export const createEarnSend = createEarn;
export const readCoreMemoryEarnSend = readCoreMemoryEarn;
export const writeCoreMemoryEarnSend = writeCoreMemoryEarn;

PulseRealm.EarnSendSystem = {
  createPulseEarnSendSystem_v31,
  sendHealing
}
PulseRealm.PulseEarnSendSystem = createPulseEarnSendSystem_v31;