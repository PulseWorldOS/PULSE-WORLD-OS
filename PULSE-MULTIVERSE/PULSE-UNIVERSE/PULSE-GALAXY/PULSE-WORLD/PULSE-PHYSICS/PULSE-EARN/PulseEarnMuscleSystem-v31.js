// ============================================================================
//  PulseEarnMuscleSystem-v31-Immortal-INTEL-Superior.js
//  THE MUSCLE SYSTEM (v31-IMMORTAL-INTEL + Advantage‑M‑31++ + Triple Presence
//  + Dual-Hash + GPU/Lane-aware + Chunk/Pressure Surfaces)
//  Deterministic Worker Supervisor + Profit Orchestrator
//  Zero async, zero compute mutation, zero routing mutation
//  IMMORTAL: presence/advantage/plan are descriptive-only, no hidden governors.
//  31++: MuscleComputeProfile + MusclePressureProfile + Tri-Heart overlays
//        + GPU lane awareness + band/binary/wave v31
// ============================================================================

import { fetchJobFromMarketplace } from "./PulseEarnNervousSystem-v31.js";
import { submitPulseEarnResult as submitMarketplaceResult } from "./PulseEarnLymphNodes-v31.js";
import { getPulseEarnDeviceProfile } from "./PulseEarnSkeletalSystem-v30.js";


const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
// Deterministic Hash + Dual-Hash Helper (v31-IMMORTAL-INTEL)
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

function buildDualHashSignature(label, intelPayload, classicString = "") {
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
    primary: classicHash
  };
}

function normalizeBand(b) {
  const x = String(b || "symbolic").toLowerCase();
  return x === "binary" ? "binary" : "symbolic";
}

function clamp01(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

function safeNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

// ============================================================================
// Healing Metadata — Muscle Memory Log (v31-IMMORTAL-INTEL-Superior)
// ============================================================================

export const engineHealing = {
  running: false,
  engineState: "idle",
  cycleCount: 0,
  lastJob: null,
  lastResult: null,
  lastSubmission: null,
  lastError: null,
  lastReason: null,

  lastTendonContext: null,
  lastVolatility: null,

  eventSeq: 0,

  // Dual-hash signatures
  lastEngineSignature: null,
  lastJobSignature: null,
  lastResultSignature: null,
  lastSubmissionSignature: null,

  // A-B-A + Presence
  lastBand: "symbolic",
  lastBandSignature: null,
  lastBandSignatureIntel: null,
  lastBandSignatureClassic: null,
  lastBinaryField: null,
  lastWaveField: null,

  // Triple Presence (v31)
  lastPresencePreFetch: null,
  lastPresencePreExecute: null,
  lastPresencePostExecute: null,

  lastAdvantagePreFetch: null,
  lastAdvantagePreExecute: null,
  lastAdvantagePostExecute: null,

  lastChunkPlanPreFetch: null,
  lastChunkPlanPreExecute: null,
  lastChunkPlanPostExecute: null,

  // 31++ overlays
  lastMuscleComputeProfile: null,
  lastMusclePressureProfile: null,

  // 31++ tri-heart overlays
  triHeartLiveness: null,
  triHeartAdvantage: null,
  triHeartSpeed: null,
  triHeartPresence: null
};

let engineCycle = 0;

// ============================================================================
// Presence Field (v31-IMMORTAL-INTEL)
// Descriptive-only: tiers from simple structural counts, no perf scoring.
// ============================================================================



function buildPresenceField(job, device, cycleIndex) {
  const jobLen = (job.id || "").length;
  const marketLen = (job.marketplaceId || "").length;
  const stability = device.stabilityScore ?? 0.7;
  const gpuScore = safeNumber(device.gpuScore ?? 0, 0);
  const laneCount = safeNumber(device.gpuLaneCount ?? 0, 0);

  const magnitude = jobLen + marketLen + Math.floor(gpuScore / 1000);
  let presenceTier = "presence_idle";
  if (magnitude >= 60) presenceTier = "presence_high";
  else if (magnitude >= 20) presenceTier = "presence_mid";
  else if (magnitude > 0) presenceTier = "presence_low";

  const payload = {
    presenceVersion: "v31-IMMORTAL-INTEL",
    presenceTier,
    jobLen,
    marketLen,
    stability,
    gpuScore,
    gpuLaneCount: laneCount,
    cycleIndex
  };

  const sig = buildDualHashSignature("MUSCLE_PRESENCE_V31", payload, "");

  return {
    ...payload,
    presenceSignaturePrimary: sig.primary,
    presenceSignature: sig.primary,
    presenceIntelSignature: sig.intel
  };
}

// ============================================================================
// Advantage‑M Field (v31-IMMORTAL-INTEL)
// Structural-only: descriptive fields + GPU/binary/wave awareness.
// ============================================================================



function buildAdvantageField(job, device, bandPack, presenceField) {
  const gpuScore = safeNumber(device.gpuScore ?? 0, 0);
  const bandwidth = safeNumber(device.bandwidthMbps ?? 0, 0);
  const laneCount = safeNumber(device.gpuLaneCount ?? 0, 0);
  const laneUtil = clamp01(device.gpuLaneUtilization ?? 0);

  const density = safeNumber(bandPack.binaryField.density ?? 0, 0);
  const amplitude = safeNumber(bandPack.waveField.amplitude ?? 0, 0);

  const structuralScore =
    gpuScore * 0.0002 +
    bandwidth * 0.0001 +
    laneCount * 0.001 +
    laneUtil * 0.05 +
    density * 0.00001 +
    amplitude * 0.00001;

  const advantageTier =
    structuralScore >= 0.08 ? 3 :
    structuralScore >= 0.04 ? 2 :
    structuralScore >= 0.01 ? 1 :
    0;

  const payload = {
    advantageVersion: "M-31.0",
    band: bandPack.band,
    gpuScore,
    bandwidth,
    gpuLaneCount: laneCount,
    gpuLaneUtilization: laneUtil,
    binaryDensity: density,
    waveAmplitude: amplitude,
    presenceTier: presenceField.presenceTier,
    structuralScore,
    advantageTier
  };

  const sig = buildDualHashSignature("MUSCLE_ADVANTAGE_V31", payload, "");

  return {
    ...payload,
    advantageSignaturePrimary: sig.primary,
    advantageSignature: sig.primary,
    advantageIntelSignature: sig.intel
  };
}

// ============================================================================
// Chunk / Cache / Prewarm Plan (v31 IMMORTAL-INTEL)
// Plan surface only; no hidden throttling or perf governors.
// ============================================================================



function buildChunkPrewarmPlan(job, device, presenceField) {
  let priorityLabel = "normal";
  if (presenceField.presenceTier === "presence_high") priorityLabel = "high";
  else if (presenceField.presenceTier === "presence_mid") priorityLabel = "medium";
  else if (presenceField.presenceTier === "presence_low") priorityLabel = "low";

  const gpuScore = safeNumber(device.gpuScore ?? 0, 0);
  const laneCount = safeNumber(device.gpuLaneCount ?? 0, 0);

  const chunkAggression =
    gpuScore >= 8000 ? 1.0 :
    gpuScore >= 4000 ? 0.7 :
    gpuScore >= 1000 ? 0.4 :
    0.2;

  const payload = {
    planVersion: "v31.0-AdvantageM",
    priorityLabel,
    bandPresence: presenceField.presenceTier,
    chunkAggression,
    gpuScore,
    gpuLaneCount: laneCount,
    chunks: {
      jobEnvelope: true,
      metabolismBlueprint: true,
      marketplaceHandshake: true
    },
    cache: {
      deviceProfile: true,
      muscleDiagnostics: true,
      gpuProfile: true
    },
    prewarm: {
      pulseSendSystem: presenceField.presenceTier !== "presence_idle",
      lymphNodes: presenceField.presenceTier !== "presence_idle",
      nervousSystem: presenceField.presenceTier !== "presence_idle"
    }
  };

  const sig = buildDualHashSignature("MUSCLE_CHUNKPLAN_V31", payload, "");

  return {
    ...payload,
    chunkPlanSignaturePrimary: sig.primary,
    chunkPlanSignature: sig.primary,
    chunkPlanIntelSignature: sig.intel
  };
}

// ============================================================================
// A-B-A Band/Binary/Wave (v31-IMMORTAL-INTEL)
// ============================================================================

function buildEngineBandBinaryWave(job, result, cycleIndex, device) {
  const band = normalizeBand(
    result.band ||
    job.band ||
    job.meta.band ||
    device.band ||
    "symbolic"
  );
  engineHealing.lastBand = band;

  const bandPayload = {
    band,
    cycleIndex,
    jobId: job.id || null,
    marketplaceId: job.marketplaceId || null
  };
  const bandSig = buildDualHashSignature("MUSCLE_BAND_V31", bandPayload, band);
  engineHealing.lastBandSignature = bandSig.primary;
  engineHealing.lastBandSignatureIntel = bandSig.intel;
  engineHealing.lastBandSignatureClassic = bandSig.classic;

  const jobIdLength = (job.id || "").length;
  const marketLength = (job.marketplaceId || "").length;
  const gpuScore = safeNumber(device.gpuScore ?? 0, 0);
  const laneCount = safeNumber(device.gpuLaneCount ?? 0, 0);

  const surface =
    jobIdLength +
    marketLength +
    cycleIndex +
    Math.floor(gpuScore / 1000) +
    laneCount;

  const binaryField = {
    binaryEngineSignature: computeHash(`BENGINE_V31::${surface}`),
    binarySurfaceSignature: computeHash(`BSURF_ENGINE_V31::${surface}`),
    binarySurface: {
      jobIdLength,
      marketLength,
      gpuScore,
      laneCount,
      cycle: cycleIndex,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    density: jobIdLength + marketLength + laneCount,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
  engineHealing.lastBinaryField = binaryField;

  const waveField = {
    amplitude: jobIdLength + marketLength + Math.floor(gpuScore / 1000),
    wavelength: cycleIndex || 1,
    phase: (jobIdLength + cycleIndex + laneCount) % 16,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
  engineHealing.lastWaveField = waveField;

  return { band, binaryField, waveField };
}

// ============================================================================
// Muscle Compute Profile + Pressure Profile + Tri-Heart (31++)
// ============================================================================

function buildMuscleComputeProfile(device, bandPack, advantageField) {
  const gpuScore = safeNumber(device.gpuScore ?? 0, 0);
  const bandwidth = safeNumber(device.bandwidthMbps ?? 0, 0);
  const laneCount = safeNumber(device.gpuLaneCount ?? 0, 0);
  const laneUtil = clamp01(device.gpuLaneUtilization ?? 0);

  const computeTier =
    gpuScore >= 12000 ? "tier_ultra" :
    gpuScore >= 8000  ? "tier_extreme" :
    gpuScore >= 4000  ? "tier_high" :
    gpuScore >= 1000  ? "tier_mid" :
    "tier_low";

  const profile = {
    profileVersion: "MUSCLE-COMPUTE-31++",
    routeBand: bandPack.band,
    gpuScore,
    bandwidthMbps: bandwidth,
    gpuLaneCount: laneCount,
    gpuLaneUtilization: laneUtil,
    computeTier,
    binaryDensity: bandPack.binaryField.density,
    waveAmplitude: bandPack.waveField.amplitude,
    advantageTier: advantageField.advantageTier,
    structuralScore: advantageField.structuralScore
  };

  engineHealing.lastMuscleComputeProfile = profile;
  return profile;
}

function buildMusclePressureProfile(presenceField, advantageField) {
  const magnitude =
    (presenceField.jobLen || 0) +
    (presenceField.marketLen || 0) +
    (advantageField.binaryDensity || 0) +
    (advantageField.waveAmplitude || 0) +
    Math.floor((advantageField.structuralScore || 0) * 1000);

  let pressureTier = "pressure_idle";
  if (magnitude >= 120) pressureTier = "pressure_critical";
  else if (magnitude >= 60) pressureTier = "pressure_high";
  else if (magnitude >= 25) pressureTier = "pressure_elevated";
  else if (magnitude > 0) pressureTier = "pressure_soft";

  const profile = {
    profileVersion: "MUSCLE-PRESSURE-31++",
    pressureTier,
    presenceTier: presenceField.presenceTier,
    jobLen: presenceField.jobLen || 0,
    marketLen: presenceField.marketLen || 0,
    binaryDensity: advantageField.binaryDensity || 0,
    waveAmplitude: advantageField.waveAmplitude || 0,
    structuralScore: advantageField.structuralScore || 0,
    advantageTier: advantageField.advantageTier || 0
  };

  engineHealing.lastMusclePressureProfile = profile;
  return profile;
}

function buildTriHeartFields(presenceField, advantageField, computeProfile, pressureProfile) {
  const liveness = {
    triHeartVersion: "MUSCLE-TRI-31++",
    alive: true,
    presenceTier: presenceField.presenceTier,
    computeTier: computeProfile.computeTier
  };

  const advantage = {
    triHeartVersion: "MUSCLE-TRI-31++",
    binaryDensity: advantageField.binaryDensity ?? 0,
    waveAmplitude: advantageField.waveAmplitude ?? 0,
    structuralScore: advantageField.structuralScore ?? 0,
    advantageTier: advantageField.advantageTier ?? 0
  };

  const speed = {
    triHeartVersion: "MUSCLE-TRI-31++",
    contractionSpeedTier: pressureProfile.pressureTier,
    contractionContinuity: engineHealing.engineState === "running"
  };

  const presence = {
    triHeartVersion: "MUSCLE-TRI-31++",
    presenceTier: presenceField.presenceTier
  };

  engineHealing.triHeartLiveness = liveness;
  engineHealing.triHeartAdvantage = advantage;
  engineHealing.triHeartSpeed = speed;
  engineHealing.triHeartPresence = presence;

  return { liveness, advantage, speed, presence };
}

// ============================================================================
// Signature Builders (v31 dual-hash surfaces)
// ============================================================================

function buildEngineSignature() {
  const payload = {
    engineState: engineHealing.engineState,
    cycleCount: engineHealing.cycleCount,
    lastJobId: engineHealing.lastJob.id || "NO_JOB"
  };
  const sig = buildDualHashSignature("ENGINE_V31", payload, "");
  return { combined: sig.primary };
}

function buildJobSignature(job) {
  const payload = {
    jobId: job.id || null,
    marketplaceId: job.marketplaceId || null
  };
  const sig = buildDualHashSignature("JOB_V31", payload, "");
  return { combined: sig.primary };
}

function buildResultSignature(job, result) {
  const success =
    result && typeof result.success === "boolean"
      ? result.success
      : null;

  const payload = {
    jobId: job.id || null,
    success
  };
  const sig = buildDualHashSignature("RESULT_V31", payload, "");
  return { combined: sig.primary };
}

function buildSubmissionSignature(job, submission) {
  const payload = {
    jobId: job.id || null,
    submissionOk: submission.ok ?? null
  };
  const sig = buildDualHashSignature("SUBMISSION_V31", payload, "");
  return { combined: sig.primary };
}

// ============================================================================
// FACTORY — createEarnEngine (v31-IMMORTAL-INTEL-Superior)
// ============================================================================

export function createEarnEngine({
  pulseSendSystem,
  log = console.log
} = {}) {
  if (!pulseSendSystem || typeof pulseSendSystem.compute !== "function") {
    throw new Error("[EarnEngine-v31-IMMORTAL-INTEL] pulseSendSystem.compute(job, ctx) required.");
  }

  const engine = {
    // -----------------------------------------------------------------------
    // start() — Begin deterministic contraction mode
    // -----------------------------------------------------------------------
    start() {
      if (engineHealing.running) return;

      engineHealing.running = true;
      engineHealing.engineState = "running";
      const sig = buildEngineSignature();
      engineHealing.lastEngineSignature = sig.combined;

      this.running = true;
      this.engineState = "running";
      this.lastEngineSignature = sig.combined;
    },

    // -----------------------------------------------------------------------
    // stop() — Controlled Relaxation
    // -----------------------------------------------------------------------
    stop() {
      if (!engineHealing.running) return;

      engineHealing.running = false;
      engineHealing.engineState = "stopped";
      const sig = buildEngineSignature();
      engineHealing.lastEngineSignature = sig.combined;

      this.running = false;
      this.engineState = "stopped";
      this.lastEngineSignature = sig.combined;
    },

    // -----------------------------------------------------------------------
    // cycle() — ONE deterministic contraction cycle (TRIPLE PRESENCE + dual-hash)
    // -----------------------------------------------------------------------
    cycle() {
      if (!engineHealing.running) return null;

      try {
        engineCycle++;
        engineHealing.cycleCount++;

        // ============================================================
        // 0. PRE-FETCH PRESENCE (deviceProfile A)
        // ============================================================
        const deviceA = getPulseEarnDeviceProfile();
        const preFetchPresence = buildPresenceField(
          null,
          deviceA,
          engineHealing.cycleCount
        );
        const preFetchBandPack = {
          band: "symbolic",
          binaryField: { density: 0 },
          waveField: { amplitude: 0 }
        };
        const preFetchAdvantage = buildAdvantageField(
          null,
          deviceA,
          preFetchBandPack,
          preFetchPresence
        );
        const preFetchChunk = buildChunkPrewarmPlan(
          null,
          deviceA,
          preFetchPresence
        );

        engineHealing.lastPresencePreFetch = preFetchPresence;
        engineHealing.lastAdvantagePreFetch = preFetchAdvantage;
        engineHealing.lastChunkPlanPreFetch = preFetchChunk;

        // ============================================================
        // 1. FETCH JOB
        // ============================================================
        const job = fetchJobFromMarketplace();
        if (!job) return null;

        engineHealing.lastJob = job;
        const jobSig = buildJobSignature(job);
        engineHealing.lastJobSignature = jobSig.combined;

        const tendonContext = job.impulse.flags.earner_context || null;
        const volatility = job.impulse.flags.earner_volatility ?? null;

        engineHealing.lastTendonContext = tendonContext;
        engineHealing.lastVolatility = volatility;

        // ============================================================
        // 2. PRE-EXECUTE PRESENCE (deviceProfile B)
        // ============================================================
        const deviceB = getPulseEarnDeviceProfile();
        const preExecutePresence = buildPresenceField(
          job,
          deviceB,
          engineHealing.cycleCount
        );
        const preExecuteBandPack = buildEngineBandBinaryWave(
          job,
          null,
          engineHealing.cycleCount,
          deviceB
        );
        const preExecuteAdvantage = buildAdvantageField(
          job,
          deviceB,
          preExecuteBandPack,
          preExecutePresence
        );
        const preExecuteChunk = buildChunkPrewarmPlan(
          job,
          deviceB,
          preExecutePresence
        );
        const preExecuteCompute = buildMuscleComputeProfile(
          deviceB,
          preExecuteBandPack,
          preExecuteAdvantage
        );
        const preExecutePressure = buildMusclePressureProfile(
          preExecutePresence,
          preExecuteAdvantage
        );
        const preExecuteTriHeart = buildTriHeartFields(
          preExecutePresence,
          preExecuteAdvantage,
          preExecuteCompute,
          preExecutePressure
        );

        engineHealing.lastPresencePreExecute = preExecutePresence;
        engineHealing.lastAdvantagePreExecute = preExecuteAdvantage;
        engineHealing.lastChunkPlanPreExecute = preExecuteChunk;

        // ============================================================
        // 3. EXECUTE JOB
        // ============================================================
        const result = pulseSendSystem.compute(job, {
          tendonContext,
          volatility
        });

        engineHealing.lastResult = result;
        const resultSig = buildResultSignature(job, result);
        engineHealing.lastResultSignature = resultSig.combined;

        const postExecuteBandPack = buildEngineBandBinaryWave(
          job,
          result,
          engineHealing.cycleCount,
          deviceB
        );

        // ============================================================
        // 4. POST-EXECUTE PRESENCE (deviceProfile B reused)
        // ============================================================
        const postExecutePresence = buildPresenceField(
          job,
          deviceB,
          engineHealing.cycleCount
        );
        const postExecuteAdvantage = buildAdvantageField(
          job,
          deviceB,
          postExecuteBandPack,
          postExecutePresence
        );
        const postExecuteChunk = buildChunkPrewarmPlan(
          job,
          deviceB,
          postExecutePresence
        );
        const postExecuteCompute = buildMuscleComputeProfile(
          deviceB,
          postExecuteBandPack,
          postExecuteAdvantage
        );
        const postExecutePressure = buildMusclePressureProfile(
          postExecutePresence,
          postExecuteAdvantage
        );
        const postExecuteTriHeart = buildTriHeartFields(
          postExecutePresence,
          postExecuteAdvantage,
          postExecuteCompute,
          postExecutePressure
        );

        engineHealing.lastPresencePostExecute = postExecutePresence;
        engineHealing.lastAdvantagePostExecute = postExecuteAdvantage;
        engineHealing.lastChunkPlanPostExecute = postExecuteChunk;

        // ============================================================
        // 5. SUBMIT RESULT
        // ============================================================
        const submission = submitMarketplaceResult(job, result);
        engineHealing.lastSubmission = submission;
        const subSig = buildSubmissionSignature(job, submission);
        engineHealing.lastSubmissionSignature = subSig.combined;

        const engineSig = buildEngineSignature();
        engineHealing.lastEngineSignature = engineSig.combined;

        return {
          job,
          result,
          submission,

          // A-B-A
          band: postExecuteBandPack.band,
          binaryField: postExecuteBandPack.binaryField,
          waveField: postExecuteBandPack.waveField,

          // Triple Presence
          presencePreFetch: preFetchPresence,
          presencePreExecute: preExecutePresence,
          presencePostExecute: postExecutePresence,

          advantagePreFetch: preFetchAdvantage,
          advantagePreExecute: preExecuteAdvantage,
          advantagePostExecute: postExecuteAdvantage,

          chunkPrewarmPreFetch: preFetchChunk,
          chunkPrewarmPreExecute: preExecuteChunk,
          chunkPrewarmPostExecute: postExecuteChunk,

          // 31++ compute/pressure/tri-heart (post-execute surfaces returned)
          muscleComputeProfile: postExecuteCompute,
          musclePressureProfile: postExecutePressure,
          triHeartLivenessField: postExecuteTriHeart.liveness,
          triHeartAdvantageField: postExecuteTriHeart.advantage,
          triHeartSpeedField: postExecuteTriHeart.speed,
          triHeartPresenceField: postExecuteTriHeart.presence,

          // Dual-hash surfaces
          engineSignature: engineSig.combined,
          jobSignature: jobSig.combined,
          resultSignature: resultSig.combined,
          submissionSignature: subSig.combined,

          cycleIndex: engineHealing.cycleCount
        };
      } catch (err) {
        engineHealing.lastError =
          err && err.message ? err.message : String(err);
        return null;
      }
    },

    // -----------------------------------------------------------------------
    // diagnostics()
    // -----------------------------------------------------------------------
    diagnostics() {
      return {
        engineState: engineHealing.engineState,
        cycleCount: engineHealing.cycleCount,
        lastJobId: engineHealing.lastJob.id || null,
        lastError: engineHealing.lastError || null,
        lastTendonContext: engineHealing.lastTendonContext,
        lastVolatility: engineHealing.lastVolatility,

        // Dual-hash
        lastEngineSignature: engineHealing.lastEngineSignature,
        lastJobSignature: engineHealing.lastJobSignature,
        lastResultSignature: engineHealing.lastResultSignature,
        lastSubmissionSignature: engineHealing.lastSubmissionSignature,

        // A-B-A
        band: engineHealing.lastBand,
        bandSignature: engineHealing.lastBandSignature,
        bandSignatureIntel: engineHealing.lastBandSignatureIntel,
        bandSignatureClassic: engineHealing.lastBandSignatureClassic,
        binaryField: engineHealing.lastBinaryField,
        waveField: engineHealing.lastWaveField,

        // Triple Presence
        presencePreFetch: engineHealing.lastPresencePreFetch,
        presencePreExecute: engineHealing.lastPresencePreExecute,
        presencePostExecute: engineHealing.lastPresencePostExecute,

        advantagePreFetch: engineHealing.lastAdvantagePreFetch,
        advantagePreExecute: engineHealing.lastAdvantagePreExecute,
        advantagePostExecute: engineHealing.lastAdvantagePostExecute,

        chunkPrewarmPreFetch: engineHealing.lastChunkPlanPreFetch,
        chunkPrewarmPreExecute: engineHealing.lastChunkPlanPreExecute,
        chunkPrewarmPostExecute: engineHealing.lastChunkPlanPostExecute,

        // 31++ overlays
        muscleComputeProfile: engineHealing.lastMuscleComputeProfile,
        musclePressureProfile: engineHealing.lastMusclePressureProfile,
        triHeartLivenessField: engineHealing.triHeartLiveness,
        triHeartAdvantageField: engineHealing.triHeartAdvantage,
        triHeartSpeedField: engineHealing.triHeartSpeed,
        triHeartPresenceField: engineHealing.triHeartPresence
      };
    }
  };

  return engine;
}

// ============================================================================
// Export healing metadata
// ============================================================================

export function getEarnEngineHealingState() {
  return { ...engineHealing };
}

export default createEarnEngine;

PulseRealm.EarnMuscleSystem = {
  getEarnEngineHealingState,
  createEarnEngine,
  engineHealing
}
PulseRealm.PulseEarnMuscleSystem = createEarnEngine;