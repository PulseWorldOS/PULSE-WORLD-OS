// ============================================================================
//  PULSE GPU SETTINGS RESTORER v50-OneBand-IMMORTAL-INTEL-OMEGA
//  “COGNITIVE RECOGNITION LAYER / RESTORATION PLANNER / ONE-BAND GPU MODE”
//  Pure logic • Deterministic • Immortal-Intel-Omega • Chunk-aware • Dispatch-aware
//  Consumes Cognitive Intelligence v50-IMMORTAL-ONEBAND + Capability Surface
// ============================================================================

import { CognitiveFrame } from "./PulseGPUCognitiveIntelligence-v30.js";
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
//  PulseDeviceProfileRegistrar-v50 (Auto-Run Version)
// ============================================================================

export async function setPulseDeviceProfile(profile = {}) {
  const cpuLogical = navigator.hardwareConcurrency ?? 0;

  const memoryLimitMB =
    performance?.memory?.jsHeapSizeLimit
      ? Math.floor(performance.memory.jsHeapSizeLimit / 1024 / 1024)
      : 0;

  const memoryUsedMB =
    performance?.memory?.usedJSHeapSize
      ? Math.floor(performance.memory.usedJSHeapSize / 1024 / 1024)
      : null;

  const memoryPressure =
    memoryUsedMB && memoryLimitMB
      ? Math.round((memoryUsedMB / memoryLimitMB) * 100)
      : null;

  const normalized = {
    // Core identity
    id: profile.id ?? "Pulse-GPU-Earner",

    // CPU
    cpuCores: profile.cpuCores ?? cpuLogical,
    cpuLogical: profile.cpuLogical ?? cpuLogical,
    cpuPhysical: profile.cpuPhysical ?? (cpuLogical ? Math.ceil(cpuLogical / 2) : 0),
    cpuModel: profile.cpuModel ?? (navigator.userAgentData?.platform || navigator.platform || "Unknown-CPU"),
    cpuVendor: profile.cpuVendor ?? (() => {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.includes("intel")) return "Intel";
      if (ua.includes("amd")) return "AMD";
      if (ua.includes("apple")) return "Apple Silicon";
      return "UnknownVendor";
    })(),
    cpuArchitecture: profile.cpuArchitecture ?? (() => {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.includes("arm")) return "ARM";
      if (ua.includes("x86")) return "x86";
      if (ua.includes("x64")) return "x64";
      return "UnknownArch";
    })(),
    cpuScore: profile.cpuScore ?? null,

    // Memory
    memoryMB: profile.memoryMB ?? memoryLimitMB,
    memoryTotalMB: profile.memoryTotalMB ?? memoryLimitMB,
    memoryUsedMB: profile.memoryUsedMB ?? memoryUsedMB,
    memoryPressure: profile.memoryPressure ?? memoryPressure,

    // GPU
    gpuModel: profile.gpuModel ?? "unknown",
    gpuVendor: profile.gpuVendor ?? "UnknownVendor",
    gpuScore: profile.gpuScore ?? 0,
    gpuRam: profile.gpuRam ?? null,
    gpuTier: profile.gpuTier ?? null,

    // Network / stability
    bandwidthMbps: profile.bandwidthMbps ?? 0,
    stabilityScore: profile.stabilityScore ?? 0,

    // Capability / power
    capabilityTier: profile.capabilityTier ?? null,
    capabilityScore: profile.capabilityScore ?? null,
    thermalHeadroomScore: profile.thermalHeadroomScore ?? null,
    powerProfile: profile.powerProfile ?? null,

    // Band + version
    band: profile.band ?? "symbolic",
    version: profile.version ?? "v50-device-profile",
    ts: PulseRealm.PulseNOW
  };

  PulseRealm.PULSE_DEVICE_PROFILE = normalized;

  PulseRealm.PulseWorld = PulseRealm.PulseWorld || {};
  PulseRealm.PulseWorld.Device = normalized;

  return normalized;
}



function pulseTimestamp() {
  const d = new Date();

  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  const ms = String(d.getMilliseconds()).padStart(3, '0');

  return `${hours}:${minutes}:${seconds}:${ms}`;
}
// ============================================================================
//  PULSE REALM GPU TEST (Callable, No Auto-Run)
// ============================================================================

PulseRealm.PulseGpuTest = async function runGpuTest() {
  try {
    let gpuModel = "unknown";
    let gpuVendor = "UnknownVendor";
    let gpuScore = 0;
    let gpuTier = "Minimal";

    // ---------------------------------------------------------
    // 1. REAL GPU TEST: WebGPU Adapter Capability
    // ---------------------------------------------------------
    if (navigator.gpu) {
      try {
        const adapter = await navigator.gpu.requestAdapter();
        if (adapter) {
          gpuModel = adapter.name ?? "WebGPU";
          gpuVendor = adapter.vendor ?? "UnknownVendor";

          const computeUnits =
            adapter.limits?.maxComputeWorkgroupsPerDimension ??
            adapter.limits?.maxComputeWorkgroupSizeX ??
            adapter.limits?.maxComputeInvocationsPerWorkgroup ??
            0;

          gpuScore = Math.round(
            computeUnits * 1.5 +
            (adapter.limits?.maxComputeWorkgroupSizeX ?? 0) / 4 +
            (adapter.limits?.maxComputeInvocationsPerWorkgroup ?? 0) / 12
          );

          gpuTier =
            computeUnits >= 64 ? "Ultra" :
            computeUnits >= 32 ? "High" :
            computeUnits >= 16 ? "Medium" :
            computeUnits >= 8  ? "Low" :
                                 "Minimal";
        }
      } catch {
        // WebGPU present but adapter failed
      }
    }

    // ---------------------------------------------------------
    // 2. REAL GPU PERFORMANCE TEST: Local Decode Benchmark
    // ---------------------------------------------------------
    let decodeTime = 0;

    try {
      const img = new Image();
      img.src = "./_EXPRESSIONS/_PEX/BUILD/_TESTS/PULSE-GPU-TEST-BENCHMARK.png"; // LOCAL, NO NETWORK
      const start = performance.now();

      await img.decode(); // REAL GPU DECODE
      decodeTime = performance.now() - start;

    } catch {
      decodeTime = 0;
    }

    // ---------------------------------------------------------
    // 3. REAL GPU PIPELINE TEST: Canvas Draw
    // ---------------------------------------------------------
    let drawTime = 0;

    try {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");

      const start = performance.now();

      for (let i = 0; i < 2000; i++) {
        ctx.fillStyle = `rgb(${i % 255}, ${(i * 2) % 255}, ${(i * 3) % 255})`;
        ctx.fillRect(0, 0, 256, 256);
      }

      drawTime = performance.now() - start;

    } catch {
      drawTime = 0;
    }

    // ---------------------------------------------------------
    // 4. Save Profile (NO NETWORK METRICS)
    // ---------------------------------------------------------
    await setPulseDeviceProfile({
      gpuModel,
      gpuVendor,
      gpuScore,
      gpuTier,
      decodeTime,
      drawTime,
      band: "binary"
    });

    console.groupCollapsed(
      "%c✨ PULSE GPU PROFILE UPDATED (Manual Trigger, No Network)",
      "color:#7DF9FF;font-weight:bold;"
    );

    console.log("%cDevice Profile:", "color:#00FF9C;font-weight:bold;");
    console.log(PulseRealm.PULSE_DEVICE_PROFILE);

    console.groupEnd();

  } catch (err) {
    console.warn(
      "✨ PULSE GPU PROFILE FAILED:",
      err
    );
  }
};


// ============================================================================
//  CAPABILITY PROFILE SURFACE
// ============================================================================

const RAW_DEVICE_PROFILE = PulseRealm.PULSE_DEVICE_PROFILE || null;

function buildCapabilityProfile(raw) {
  if (!raw || typeof raw !== "object") return null;

  return {
    capabilityTier: raw.capabilityTier ?? null,
    capabilityScore: raw.capabilityScore ?? null,
    gpuScore: raw.gpuScore ?? null,
    gpuRam: raw.gpuRam ?? null,
    bandwidthMbps: raw.bandwidthMbps ?? null,
    stabilityScore: raw.stabilityScore ?? null,
    cpuScore: raw.cpuScore ?? null,
    thermalHeadroomScore: raw.thermalHeadroomScore ?? null,
    powerProfile: raw.powerProfile ?? null
  };
}

export const CAPABILITY_PROFILE = buildCapabilityProfile(RAW_DEVICE_PROFILE);

// ============================================================================
//  RESTORER CONTEXT
// ============================================================================

const RESTORER_VERSION = "50.0-OneBand-Immortal-Intel-Omega";

const RESTORER_CONTEXT = {
  layer: "PulseGPUSettingsRestorer",
  version: RESTORER_VERSION,
  gpuMode: "one-band",
  capabilityProfile: CAPABILITY_PROFILE,
  evo: {
    oneBandGpuMode: true,
    deterministic: true,
    driftProof: true,
    chunkAware: true,
    dispatchAware: true,
    presenceAware: true,
    symbolicAware: true,
    binaryAware: true,
    gpuMemoryAware: true,
    gpuAdvantageAware: true,
    capabilityAware: true,
    routingContract: "PulseSendSystem-v16-Immortal-Intel",
    gpuOrganContract: "PulseGPU-v30-Immortal-Intel",
    binaryGpuOrganContract: "PulseBinaryGPU-v30-Immortal-Intel",
    earnCompatibility: "Earn-v30-GPU"
  }
};

// ============================================================================
//  Build CognitiveFrame for advice → plan (v50-OneBand-Immortal-Intel-Omega)
// ============================================================================

function buildCognitiveFrameForAdvice(
  advice,
  gpuContext,
  {
    dnaTag = "default-dna",
    instanceId = "",
    version = RESTORER_VERSION,
    earnMode = false,
    chunkContext = null
  } = {}
) {
  if (!advice || typeof advice !== "object") return null;

  const narrativeSummary =
    ({
      regression: "Performance regression detected; restoration recommended.",
      suboptimal: "Suboptimal configuration detected; optimal settings available.",
      "tier-upgrade-opportunity": "Tier upgrade opportunity detected.",
      improvement: "Performance improvement detected; no restoration required.",
      "rechunk-needed":
        "Chunk layout misaligned; GPU chunk strategy update recommended."
    }[advice.type] || "Advice received for GPU configuration.");

  const cognition = {
    adviceType: advice.type,
    severity: advice.severity,
    deltaPercent: advice.deltaPercent,
    gameProfile: advice.gameProfile,
    hardwareProfile: advice.hardwareProfile,
    tierProfile: advice.tierProfile,
    gpuContext,
    chunkContext,
    capabilityProfile: CAPABILITY_PROFILE
  };

  const performance = {
    baselineScore: advice.extra?.baselineMetrics?.score ?? null,
    currentScore: advice.extra?.currentMetrics?.score ?? null,
    deltaPercent: advice.deltaPercent ?? null,
    label:
      typeof advice.deltaPercent === "number"
        ? advice.deltaPercent > 0
          ? "better"
          : "worse"
        : "unknown"
  };

  const narrative = {
    summary: narrativeSummary,
    details: {
      type: advice.type,
      severity: advice.severity,
      deltaPercent: advice.deltaPercent,
      gpuPattern: advice.gpuPattern,
      gpuShapeSignature: advice.gpuShapeSignature,
      chunkProfile:
        advice.chunkProfile ||
        (chunkContext && chunkContext.chunkProfile) ||
        null,
      chunkSessionId: chunkContext?.sessionId || null,
      capabilityProfile: CAPABILITY_PROFILE
    }
  };

  return new CognitiveFrame({
    cognition,
    interpretation: {},
    narrative,
    tier: {
      currentTier: advice.tierProfile?.tierId || null,
      tierHistory: advice.tierProfile?.history || []
    },
    performance,
    dispatch: {
      gpuPattern: advice.gpuPattern || null,
      gpuShapeSignature: advice.gpuShapeSignature || null
    },
    advantage: {
      earnMode,
      dnaTag,
      instanceId,
      version
    },
    meta: {
      layer: RESTORER_CONTEXT.layer,
      version: RESTORER_CONTEXT.version
    }
  });
}

// ============================================================================
//  Plan validator
// ============================================================================

function validatePlan(plan) {
  return (
    plan &&
    typeof plan === "object" &&
    typeof plan.action === "string" &&
    typeof plan.reason === "string" &&
    plan.meta?.layer === "PulseGPUSettingsRestorer"
  );
}

// ============================================================================
//  PulseGPUSettingsRestorer v50-OneBand-IMMORTAL-INTEL-OMEGA
//  IMMORTAL PSEUDO ORGAN (no class, no this)
// ============================================================================

export const PulseGPUSettingsRestorer = (() => {

  const meta = { ...RESTORER_CONTEXT };

  // -------------------------------------------------------------
  // INTERNAL: GPU CONTEXT BUILDER
  // -------------------------------------------------------------
  function buildGpuContext(deviceProfile = RAW_DEVICE_PROFILE) {
    if (!deviceProfile) return null;

    return {
      gpuModel: deviceProfile.gpuModel,
      gpuVendor: deviceProfile.gpuVendor,
      gpuScore: deviceProfile.gpuScore,
      gpuRam: deviceProfile.gpuRam,
      capabilityTier: deviceProfile.capabilityTier,
      capabilityScore: deviceProfile.capabilityScore,
      bandwidthMbps: deviceProfile.bandwidthMbps,
      stabilityScore: deviceProfile.stabilityScore
    };
  }

  // -------------------------------------------------------------
  // INTERNAL: PLAN BUILDER
  // -------------------------------------------------------------
  function buildPlan(base) {
    const plan = {
      ...base,
      meta: {
        layer: meta.layer,
        version: meta.version,
        gpuMode: meta.gpuMode
      }
    };
    return validatePlan(plan) ? plan : null;
  }

  // -------------------------------------------------------------
  // PUBLIC: RESTORE ENTRYPOINT
  // -------------------------------------------------------------
  async function restoreFromAdvice(advice, chunkContext = null) {
    const gpuContext = buildGpuContext();
    const frame = buildCognitiveFrameForAdvice(advice, gpuContext, {
      chunkContext
    });

    if (!frame) return null;

    // Simple mapping: advice.type → plan.action
    const presence = { meta };

    if (advice.type === "regression") {
      return buildPlan({
        action: "restore-baseline",
        reason: "Performance regression detected; restoring baseline GPU settings.",
        targetSettings: advice.baselineSettings,
        baselineSettings: advice.baselineSettings,
        extra: {
          deltaPercent: advice.deltaPercent,
          baselineMetrics: advice.extra?.baselineMetrics,
          repairHint: advice.extra?.repairHint || "suggest-baseline-settings"
        },
        gpuContext,
        ...presence
      });
    }

    if (advice.type === "tier-upgrade-opportunity") {
      return buildPlan({
        action: "upgrade-tier",
        reason:
          "A higher tier configuration has historically delivered better performance.",
        targetSettings: advice.baselineSettings,
        baselineSettings: advice.baselineSettings,
        extra: {
          deltaPercent: advice.deltaPercent,
          oldTierProfile: advice.extra?.oldTierProfile,
          newTierProfile: advice.extra?.newTierProfile,
          newTierMetrics: advice.extra?.newTierMetrics,
          repairHint: advice.extra?.repairHint || "upgrade-tier"
        },
        gpuContext,
        ...presence
      });
    }

    if (advice.type === "suboptimal") {
      return buildPlan({
        action: "optimize-settings",
        reason:
          "Suboptimal configuration detected; applying recommended GPU settings.",
        targetSettings: advice.baselineSettings,
        baselineSettings: advice.baselineSettings,
        extra: {
          deltaPercent: advice.deltaPercent,
          baselineMetrics: advice.extra?.baselineMetrics,
          repairHint: advice.extra?.repairHint || "optimize-settings"
        },
        gpuContext,
        ...presence
      });
    }

    if (advice.type === "rechunk-needed") {
      return buildPlan({
        action: "update-chunk-strategy",
        reason:
          "Chunk layout misaligned; updating GPU chunk strategy for better performance.",
        targetSettings: advice.baselineSettings,
        baselineSettings: advice.baselineSettings,
        extra: {
          deltaPercent: advice.deltaPercent,
          chunkProfile: advice.chunkProfile,
          repairHint: advice.extra?.repairHint || "update-chunk-strategy"
        },
        gpuContext,
        ...presence
      });
    }

    // Default: improvement or unknown → no-op plan
    return buildPlan({
      action: "no-op",
      reason:
        "No restoration required; current GPU configuration is acceptable.",
      targetSettings: advice.baselineSettings,
      baselineSettings: advice.baselineSettings,
      extra: {
        deltaPercent: advice.deltaPercent,
        baselineMetrics: advice.extra?.baselineMetrics,
        repairHint: advice.extra?.repairHint || "no-op"
      },
      gpuContext,
      ...presence
    });
  }

  return {
    meta,
    restoreFromAdvice
  };
})();
