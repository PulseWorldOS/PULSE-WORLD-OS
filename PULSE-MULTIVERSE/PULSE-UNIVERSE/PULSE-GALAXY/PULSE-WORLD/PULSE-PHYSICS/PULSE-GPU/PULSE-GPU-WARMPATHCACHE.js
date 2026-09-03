// ============================================================================
// FILE: /PULSE-GPU/PulseGPUWarmPathCache-v32-IMMORTAL-INTEL-HYBRID.js
// PULSE OS — v32 IMMORTAL-INTEL-HYBRID
// PULSE‑GPU WARM PATH CACHE — GPU WARM PATH HINT ENGINE (v32)
//  Advantage‑Field‑Aware • Binary‑Indexed • INTEL Dual‑Hash Surfaces
//  Chunk‑Aware • Session‑Class‑Aware • Nervous‑System‑Linked • Earn‑Field‑Aware
//  CI‑Aware • Multi‑Band • Multi‑Lane • Prewarm‑Envelope Engine
//  Deterministic • No randomness • No IO • No GPU calls
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ---------------------------------------------------------------------------
// v32 HASH HELPERS — deterministic, INTEL‑hybrid
// ---------------------------------------------------------------------------
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 1000000007;
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
  const intelBase = { label, intel: intelPayload || {}, classic: classicString || "" };
  return {
    intel: computeHashIntelligence(intelBase),
    classic: computeHash(`${label}::${classicString || ""}`)
  };
}

function clamp01(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return n < 0 ? 0 : n > 1 ? 1 : n;
}

// ---------------------------------------------------------------------------
// v32 BINARY INDEX SURFACES — Warm Path + Cache Tier + Fanout + Budget
// ---------------------------------------------------------------------------
function buildWarmPathBinaryIndexV32({
  page,
  id,
  cacheTier,
  fanoutProfile,
  band,
  lane,
  prewarm,
  sessionClass,
  advantageWeight,
  earnBand,
  nervousSystemChannel
}) {
  const classic = [
    page || "index",
    id || "unknown",
    cacheTier || "none",
    fanoutProfile || "conservative",
    band || "symbolic",
    lane || "normal",
    prewarm || "lazy",
    sessionClass || "gpu_session_cold",
    `adv:${advantageWeight}`,
    earnBand || "none",
    nervousSystemChannel || "one-band"
  ].join("::");

  const intelPayload = {
    page: page || "index",
    id: id || "unknown",
    cacheTier,
    fanoutProfile,
    band,
    lane,
    prewarm,
    sessionClass,
    advantageWeight: clamp01(advantageWeight),
    earnBand,
    nervousSystemChannel
  };

  const sig = buildDualHashSignature(
    "GPU_WARM_PATH_V32_IMMORTAL_INTEL_HYBRID",
    intelPayload,
    classic
  );

  return {
    binaryIndexId: sig.classic,
    intelSignature: sig.intel
  };
}

function buildCacheTierIntelV32(cacheTier, trust, risk, pulseStream, fastLane) {
  const classic = [
    cacheTier,
    trust,
    risk,
    pulseStream,
    fastLane
  ].join("::");

  return buildDualHashSignature(
    "GPU_WARM_CACHE_TIER_V32_IMMORTAL_INTEL_HYBRID",
    { cacheTier, trust, risk, pulseStream, fastLane },
    classic
  );
}

function buildPrewarmBudgetIntelV32(cacheTier, pulseStream, chunkProfile, budget) {
  const classic = [
    cacheTier,
    pulseStream,
    chunkProfile,
    `budget:${budget}`
  ].join("::");

  return buildDualHashSignature(
    "GPU_WARM_PREWARM_BUDGET_V32_IMMORTAL_INTEL_HYBRID",
    { cacheTier, pulseStream, chunkProfile, prewarmBudget: budget },
    classic
  );
}

function buildFanoutIntelV32(cacheTier, risk, pulseStream, fanoutProfile) {
  const classic = [
    cacheTier,
    risk,
    pulseStream,
    fanoutProfile
  ].join("::");

  return buildDualHashSignature(
    "GPU_WARM_FANOUT_V32_IMMORTAL_INTEL_HYBRID",
    { cacheTier, risk, pulseStream, fanoutProfile },
    classic
  );
}

// ---------------------------------------------------------------------------
// v32 GPU SESSION CLASS — upgraded physics
// ---------------------------------------------------------------------------
function classifyGpuSessionV32({ cacheTier, pulseStream, chunkProfile, advantageScore, ciPressure }) {
  const tier = cacheTier || "none";
  const stream = pulseStream || "continuous";
  const profile = chunkProfile || "default";
  const adv = clamp01(advantageScore);
  const ci = clamp01(ciPressure);

  let sessionClass = "gpu_session_cold";

  if (tier === "strong") {
    if (stream === "continuous") sessionClass = "gpu_session_hot_continuous";
    else if (stream === "burst") sessionClass = "gpu_session_hot_burst";
    else sessionClass = "gpu_session_hot_single";
  } else if (tier === "medium") {
    sessionClass = profile.includes("gpu") ? "gpu_session_warm_visual" : "gpu_session_warm_generic";
  } else if (tier === "light") {
    sessionClass = "gpu_session_light";
  }

  if (ci > 0.7 && (tier === "strong" || tier === "medium")) {
    sessionClass = `${sessionClass}_ci_guarded`;
  }

  const classic = [tier, stream, profile, `adv:${adv}`, `ci:${ci}`, sessionClass].join("::");

  const sig = buildDualHashSignature(
    "GPU_SESSION_CLASS_V32_IMMORTAL_INTEL_HYBRID",
    { cacheTier: tier, pulseStream: stream, chunkProfile: profile, advantageScore: adv, ciPressure: ci, sessionClass },
    classic
  );

  return { sessionClass, sessionClassSignature: sig };
}

// ---------------------------------------------------------------------------
// v32 ADVANTAGE / EARN / NERVOUS SYSTEM shaping
// ---------------------------------------------------------------------------
function deriveAdvantageWeightV32({ advantageSnapshot, earnHints, presence, nervousSystemChannel }) {
  const advScore = clamp01(advantageSnapshot.advantageScore ?? 0);
  const earnYield = clamp01(earnHints.earnYieldScore ?? 0);
  const presenceBoost = presence === "active" ? 0.1 : presence === "idle" ? 0.05 : 0;
  const nsBoost = nervousSystemChannel === "dual-band" ? 0.05 : 0;

  let weight = advScore * 0.55 + earnYield * 0.25 + presenceBoost + nsBoost;
  return clamp01(weight);
}

function deriveEarnBandV32(earnHints) {
  if (!earnHints) return "none";
  if (earnHints.earnBand) return String(earnHints.earnBand);
  const p = earnHints.maxUtilizationPercent;
  if (typeof p === "number") {
    if (p >= 50) return "high";
    if (p >= 20) return "medium";
    if (p > 0) return "low";
  }
  return "none";
}

function deriveNervousSystemChannelV32(input) {
  const ch = input.nervousSystemChannel;
  if (ch === "one-band" || ch === "dual-band" || ch === "gpu-only") return ch;
  return "dual-band"; // v32 default
}

// ---------------------------------------------------------------------------
// v32 CACHE TIER / PREWARM / FANOUT physics
// ---------------------------------------------------------------------------
function computeCacheTierV32({ trust, risk, pulseStream, fastLane }) {
  const lowRisk = risk === "low" || risk === "unknown";
  const mediumRisk = risk === "medium";
  const goodTrust = trust === "trusted" || trust === "neutral";
  const cautiousTrust = trust === "suspicious";
  const goodStream = pulseStream === "continuous" || pulseStream === "burst";
  const fastLaneOk = fastLane === "enabled";

  if (goodTrust && lowRisk && goodStream && fastLaneOk) return "strong";
  if ((goodTrust && lowRisk) || (goodTrust && mediumRisk && goodStream)) return "medium";
  if ((goodTrust || cautiousTrust) && (lowRisk || mediumRisk)) return "light";
  return "none";
}

function computePrewarmBudgetV32({ cacheTier, pulseStream, chunkProfile, advantageWeight }) {
  let base =
    cacheTier === "strong" ? 90 :
    cacheTier === "medium" ? 65 :
    cacheTier === "light" ? 40 :
    0;

  if (pulseStream === "burst") base += 5;
  if (pulseStream === "single") base -= 10;
  if (chunkProfile.includes("gpu")) base += 8;

  base += Math.round((advantageWeight - 0.5) * 20);
  return Math.max(0, Math.min(100, base));
}

function computeFanoutProfileV32({ cacheTier, risk, pulseStream, advantageWeight }) {
  if (
    cacheTier === "strong" &&
    (risk === "low" || risk === "unknown") &&
    pulseStream !== "single" &&
    advantageWeight >= 0.4
  ) {
    return "aggressive";
  }
  if (cacheTier === "light" || risk === "high" || risk === "critical") {
    return "conservative";
  }
  return "balanced";
}

// ---------------------------------------------------------------------------
// v32 WARM PATH CONSTRUCTION
// ---------------------------------------------------------------------------
function buildWarmPathsV32({ page, chunkProfile, cacheTier, fanoutProfile, advantageWeight, earnBand, nervousSystemChannel }) {
  const warmPaths = [];
  if (cacheTier === "none") return warmPaths;

  const eager = cacheTier === "strong";
  const medium = cacheTier === "medium";
  const adv = clamp01(advantageWeight);

  warmPaths.push({
    id: `${page}:gpu-main`,
    priority: 1,
    prewarm: eager ? "eager" : medium ? "semi-eager" : "lazy",
    cacheHint: "primary",
    lane: "fast",
    band: "binary",
    throttle: fanoutProfile === "aggressive" ? "open" : "guarded",
    advantageWeight: adv,
    earnBand,
    nervousSystemChannel
  });

  if (chunkProfile.includes("gpu") || chunkProfile.includes("rich")) {
    warmPaths.push({
      id: `${page}:gpu-secondary`,
      priority: 2,
      prewarm: medium || eager ? "lazy" : "idle",
      cacheHint: "secondary",
      lane: "normal",
      band: "symbolic",
      throttle: fanoutProfile === "conservative" ? "tight" : "guarded",
      advantageWeight: adv * 0.7,
      earnBand,
      nervousSystemChannel
    });
  }

  warmPaths.push({
    id: `${page}:shell`,
    priority: 3,
    prewarm: eager ? "idle" : "background",
    cacheHint: "shell",
    lane: "shell",
    band: "symbolic",
    throttle: "tight",
    advantageWeight: adv * 0.4,
    earnBand: "none",
    nervousSystemChannel
  });

  return warmPaths;
}

// ---------------------------------------------------------------------------
// PUBLIC ORGAN — v32 IMMORTAL-INTEL-HYBRID
// ---------------------------------------------------------------------------
export const PulseGPUWarmPathCache = {
  compute(input = {}) {
    const page = input.page || "index";
    const chunkProfile = input.chunkProfile || "default";
    const gpuCapable = !!input.gpuCapable;
    const trust = input.trust || "unknown";
    const risk = input.risk || "unknown";
    const pulseStream = input.pulseStream || "continuous";
    const fastLane = input.fastLane || "enabled";

    const advantageSnapshot = input.advantageSnapshot || null;
    const earnHints = input.earnHints || null;
    const presence = input.presence || "active";
    const nervousSystemChannel = deriveNervousSystemChannelV32(input);
    const ciPressure = clamp01(input.ciPressure ?? 0);

    const advantageWeight = deriveAdvantageWeightV32({
      advantageSnapshot,
      earnHints,
      presence,
      nervousSystemChannel
    });

    const earnBand = deriveEarnBandV32(earnHints);

    // Hard guard
    if (!gpuCapable || trust === "hostile") {
      const cacheTier = "none";
      const cacheTierIntel = buildCacheTierIntelV32(cacheTier, trust, risk, pulseStream, fastLane);
      const sessionClassInfo = classifyGpuSessionV32({
        cacheTier,
        pulseStream,
        chunkProfile,
        advantageScore: advantageWeight,
        ciPressure
      });

      return {
        enabled: false,
        reason: !gpuCapable ? "gpu_not_capable" : "trust_hostile",
        warmPaths: [],
        cacheTier,
        cacheTierIntel,
        prewarmBudget: 0,
        prewarmBudgetIntel: buildPrewarmBudgetIntelV32(cacheTier, pulseStream, chunkProfile, 0),
        fanoutProfile: "conservative",
        fanoutIntel: buildFanoutIntelV32(cacheTier, risk, pulseStream, "conservative"),
        gpuSessionClass: sessionClassInfo.sessionClass,
        gpuSessionClassSignature: sessionClassInfo.sessionClassSignature,
        advantageField: {
          advantageWeight,
          ciPressure,
          nervousSystemChannel,
          earnBand,
          advantageSnapshot
        }
      };
    }

    const cacheTier = computeCacheTierV32({ trust, risk, pulseStream, fastLane });
    const cacheTierIntel = buildCacheTierIntelV32(cacheTier, trust, risk, pulseStream, fastLane);

    if (cacheTier === "none") {
      const sessionClassInfo = classifyGpuSessionV32({
        cacheTier,
        pulseStream,
        chunkProfile,
        advantageScore: advantageWeight,
        ciPressure
      });

      return {
        enabled: false,
        reason: "risk_or_stream_not_suitable",
        warmPaths: [],
        cacheTier,
        cacheTierIntel,
        prewarmBudget: 0,
        prewarmBudgetIntel: buildPrewarmBudgetIntelV32(cacheTier, pulseStream, chunkProfile, 0),
        fanoutProfile: "conservative",
        fanoutIntel: buildFanoutIntelV32(cacheTier, risk, pulseStream, "conservative"),
        gpuSessionClass: sessionClassInfo.sessionClass,
        gpuSessionClassSignature: sessionClassInfo.sessionClassSignature,
        advantageField: {
          advantageWeight,
          ciPressure,
          nervousSystemChannel,
          earnBand,
          advantageSnapshot
        }
      };
    }

    const prewarmBudget = computePrewarmBudgetV32({
      cacheTier,
      pulseStream,
      chunkProfile,
      advantageWeight
    });

    const prewarmBudgetIntel = buildPrewarmBudgetIntelV32(
      cacheTier,
      pulseStream,
      chunkProfile,
      prewarmBudget
    );

    const fanoutProfile = computeFanoutProfileV32({
      cacheTier,
      risk,
      pulseStream,
      advantageWeight
    });

    const fanoutIntel = buildFanoutIntelV32(cacheTier, risk, pulseStream, fanoutProfile);

    const warmPathsBase = buildWarmPathsV32({
      page,
      chunkProfile,
      cacheTier,
      fanoutProfile,
      advantageWeight,
      earnBand,
      nervousSystemChannel
    });

    const sessionClassInfo = classifyGpuSessionV32({
      cacheTier,
      pulseStream,
      chunkProfile,
      advantageScore: advantageWeight,
      ciPressure
    });

    const warmPaths = warmPathsBase.map((wp) => {
      const idx = buildWarmPathBinaryIndexV32({
        page,
        id: wp.id,
        cacheTier,
        fanoutProfile,
        band: wp.band,
        lane: wp.lane,
        prewarm: wp.prewarm,
        sessionClass: sessionClassInfo.sessionClass,
        advantageWeight: wp.advantageWeight,
        earnBand: wp.earnBand,
        nervousSystemChannel: wp.nervousSystemChannel
      });

      return {
        ...wp,
        binaryIndexId: idx.binaryIndexId,
        intelSignature: idx.intelSignature
      };
    });

    return {
      enabled: warmPaths.length > 0,
      reason: "planned",
      warmPaths,
      cacheTier,
      cacheTierIntel,
      prewarmBudget,
      prewarmBudgetIntel,
      fanoutProfile,
      fanoutIntel,
      gpuSessionClass: sessionClassInfo.sessionClass,
      gpuSessionClassSignature: sessionClassInfo.sessionClassSignature,
      advantageField: {
        advantageWeight,
        ciPressure,
        nervousSystemChannel,
        earnBand,
        advantageSnapshot
      }
    };
  }
};

PulseRealm.GPUWarmPathCache = PulseGPUWarmPathCache;