// ============================================================================
// PulseGPUConfig-v30-IMMORTAL-INTEL-OMEGA.js
// IMMORTAL GPU COMMANDMENTS — NOW A CALLABLE ORGAN
// Deterministic • Drift-Proof • Capability-Aware • Pure Config Organ
// ============================================================================
// META


const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



  export const PULSE_GPU_CONFIG_META = {
    layer: "PulseGPUConfig",
    role: "GPU_COMMANDMENTS",
    version: "v30-IMMORTAL-INTEL-OMEGA",
    deterministic: true,
    driftProof: true,
    pulseSendReady: true,
    selfRepairReady: true,
    binaryAware: true,
    symbolicAware: true,
    dispatchAware: true,
    memoryAware: true,
    presenceAware: true,
    cognitiveFrameAware: true,
    computerIntelligenceAware: true,
    warmPathAware: true,
    nervousSystemAware: true,
    synapseAware: true,
    geneticMemoryAware: true,
    gpuModeAware: true,
    evolutionAware: true,
    capabilityProfile: readCapabilityProfile()
  };

// COMMANDMENT V — INSIGHT THRESHOLDS
  export const INSIGHT_THRESHOLDS = {
    MIN_STEP_DELTA_PERCENT: 5,
    MAX_STEP_DELTA_PERCENT: 200,

    MIN_DISPATCH_PATTERN_DELTA_PERCENT: 3,

    MIN_COMPUTER_INTELLIGENCE_DELTA: 0.02,
    MIN_COGNITIVE_ALIGNMENT_DELTA: 0.03,

    MIN_PRESSURE_BAND_DELTA: 0.05,
    MIN_WARM_PATH_TIER_DELTA: 1,
    MIN_GENETIC_SAMPLE_DELTA: 5,

    MIN_GPU_EVOLUTION_SCORE_DELTA: 0.03,
    MIN_EARN_SURVIVAL_SCORE_DELTA: 0.02,
    MIN_GPU_MODE_STABILITY_DELTA: 1,
    MIN_BINARY_INDEX_SURFACE_DELTA: 3,

    meta: { ...PULSE_GPU_CONFIG_META, block: "INSIGHT_THRESHOLDS" }
  };

  // COMMANDMENT I — PERFORMANCE TRUTH
  export const SCORE_CONSTANTS = {
    MAX_FPS: 480,
    MAX_STUTTERS: 1000,
    CRASH_PENALTY: 0.45,

    AVG_FPS_WEIGHT: 0.55,
    MIN_FPS_WEIGHT: 0.35,
    STUTTER_WEIGHT: 0.3,

    BINARY_MODE_BONUS: 0.08,
    STABILITY_FIELD_WEIGHT: 0.14,

    COMPUTER_INTELLIGENCE_BONUS: 0.05,
    COGNITIVE_FRAME_ALIGNMENT_WEIGHT: 0.07,

    WARM_PATH_ALIGNMENT_BONUS: 0.06,
    PRESSURE_STABILITY_WEIGHT: 0.12,
    NERVOUS_SYSTEM_HEALTH_WEIGHT: 0.08,

    GPU_EVOLUTION_SCORE_WEIGHT: 0.10,
    GPU_SURVIVAL_SCORE_WEIGHT: 0.10,
    EARN_SURVIVAL_COMPAT_BONUS: 0.06,
    BINARY_INDEX_ALIGNMENT_BONUS: 0.05,
    GPU_MODE_STABILITY_WEIGHT: 0.09,

    meta: { ...PULSE_GPU_CONFIG_META, block: "SCORE_CONSTANTS" }
  };

  // COMMANDMENT III — USER WILL
  export const DEFAULT_USER_PREFERENCES = {
    allowAutoFixLowRegressions: false,
    allowAutoFixMediumRegressions: false,
    allowAutoFixHighRegressions: false,
    allowAutoFixCriticalRegressions: false,

    allowAutoApplyOptimalSettings: false,
    allowAutoTierChanges: false,

    preferBinaryStablePaths: true,
    allowSymbolicFallbackOnInstability: true,

    allowPerDevicePresenceTuning: true,
    allowPerInstanceProfiles: true,

    allowComputerIntelligenceScoring: true,
    allowCognitiveFrameLogging: true,
    allowEarnModeOptimizations: true,

    allowWarmPathPrewarm: true,
    allowAggressiveWarmPathOnTrustedLowRisk: true,
    allowNervousSystemDeepTracingOnDebug: false,
    allowHealerAutoRepairHints: true,
    allowLymphNodeImmuneFiltering: true,

    allowGpuEvolutionBoostForEarn: true,
    allowGpuEvolutionBoostForGames: true,
    allowSurvivalScoreGatingForEarnJobs: true,
    allowBinaryIndexRoutingHints: true,
    allowGpuModeAdaptiveScheduling: true,
    allowEarnSurvivalDiagnosticsLogging: true,

    meta: { ...PULSE_GPU_CONFIG_META, block: "DEFAULT_USER_PREFERENCES" }
  };
// ---------------------------------------------------------------------------
// INTERNAL: Capability substrate reader (safe, pure)
// ---------------------------------------------------------------------------
function readCapabilityProfile() {
 
  const p = PulseRealm.PULSE_DEVICE_PROFILE;
  if (!p || typeof p !== "object") return null;

  return {
    capabilityTier: p.capabilityTier,
    capabilityScore: p.capabilityScore,
    gpuScore: p.gpuScore,
    gpuRam: p.gpuRam,
    bandwidthMbps: p.bandwidthMbps,
    stabilityScore: p.stabilityScore
  };
}

  // COMMANDMENT II — FAILURE SEVERITY
  const SEVERITY_THRESHOLDS = {
    LOW: 5,
    MEDIUM: 12,
    HIGH: 25,
    CRITICAL: 40,

    BINARY_REGRESSION_EXTRA_SENSITIVITY: 5,
    CI_REGRESSION_EXTRA_SENSITIVITY: 3,

    WARM_PATH_REGRESSION_EXTRA_SENSITIVITY: 4,
    HIGH_PRESSURE_EXTRA_SENSITIVITY: 6,

    EVOLUTION_REGRESSION_EXTRA_SENSITIVITY: 4,
    SURVIVAL_SCORE_DROP_EXTRA_SENSITIVITY: 6,
    GPU_MODE_FLAP_EXTRA_SENSITIVITY: 5,

    meta: { ...PULSE_GPU_CONFIG_META, block: "SEVERITY_THRESHOLDS" }
  };

  // COMMANDMENT IV — TRACE LIMITS
  const TRACE_LIMITS = {
    MAX_STEPS_PER_SESSION: 1000,
    MAX_DURATION_MS: 90 * 60 * 1000,
    MAX_WARNINGS: 100000,
    MAX_ERRORS: 100000,
    MAX_STUTTERS: 100000,
    MAX_VRAM_MB: 4_000_000,

    MAX_DISPATCH_HISTORY: 4096,
    MAX_BINARY_PATTERN_HISTORY: 1024,

    MAX_COGNITIVE_FRAMES_PER_SESSION: 256,
    MAX_COMPUTER_INTELLIGENCE_RECORDS: 256,

    MAX_SENSORY_STEPS_PER_SESSION: 2048,
    MAX_WARM_PATH_EVENTS_PER_SESSION: 512,
    MAX_HEALER_REPORTS_PER_SESSION: 128,
    MAX_LYMPH_NODE_ACTIONS_PER_SESSION: 256,

    MAX_GPU_EVOLUTION_EVENTS_PER_SESSION: 512,
    MAX_EARN_SURVIVAL_EVALS_PER_SESSION: 1024,
    MAX_GPU_MODE_TRANSITIONS_PER_SESSION: 512,
    MAX_BINARY_INDEX_UPDATES_PER_SESSION: 2048,

    meta: { ...PULSE_GPU_CONFIG_META, block: "TRACE_LIMITS" }
  };

  // COMMANDMENT VI — MEMORY RULES
  const MEMORY_RULES = {
    MAX_ENTRIES_PER_GAME: 80,
    MAX_ENTRIES_TOTAL: 4000,

    MAX_GPU_MEMORY_SNAPSHOTS: 512,
    MAX_GPU_DISPATCH_HINT_SETS: 512,

    MAX_COGNITIVE_FRAME_HISTORY: 512,
    MAX_COMPUTER_INTELLIGENCE_HISTORY: 512,

    MAX_GENETIC_MEMORY_PATTERNS: 4096,
    MAX_WARM_PATH_CACHE_ENTRIES: 1024,
    MAX_HEALER_CACHE_ENTRIES: 1024,
    MAX_LYMPH_NODE_CACHE_ENTRIES: 1024,

    MAX_GPU_EVOLUTION_HISTORY: 1024,
    MAX_EARN_SURVIVAL_HISTORY: 2048,
    MAX_GPU_MODE_HISTORY: 1024,
    MAX_BINARY_INDEX_HISTORY: 2048,

    meta: { ...PULSE_GPU_CONFIG_META, block: "MEMORY_RULES" }
  };

  // COMMANDMENT VII — GPU MODES
  const GPU_MODE_TIERS = {
    MODES: ["idle", "warmup", "active", "burst", "recovery"],
    MODE_PRIORITY: {
      idle: 0,
      warmup: 1,
      active: 2,
      burst: 3,
      recovery: -1
    },
    MODE_STABILITY_TARGETS: {
      idle: 0.99,
      warmup: 0.97,
      active: 0.95,
      burst: 0.92,
      recovery: 0.90
    },
    MODE_EARN_WEIGHT: {
      idle: 0.0,
      warmup: 0.4,
      active: 0.7,
      burst: 0.8,
      recovery: 0.2
    },
    MODE_GAME_WEIGHT: {
      idle: 0.0,
      warmup: 0.3,
      active: 0.8,
      burst: 1.0,
      recovery: 0.3
    },

    meta: { ...PULSE_GPU_CONFIG_META, block: "GPU_MODE_TIERS" }
  };

  // COMMANDMENT VIII — EVOLUTION + SURVIVAL
  const EVOLUTION_THRESHOLDS = {
    GPU_EVOLUTION_TIERS: {
      TIER_0: 0.0,
      TIER_1: 0.25,
      TIER_2: 0.50,
      TIER_3: 0.75,
      TIER_4: 0.92
    },
    EARN_SURVIVAL_SCORE_MIN_APPROVE: 0.0,
    EARN_SURVIVAL_SCORE_STRONG_APPROVE: 0.01,
    EARN_SURVIVAL_SCORE_EXCELLENT: 0.05,

    GPU_EVOLUTION_EARN_BOOST_MAX: 0.15,
    GPU_EVOLUTION_GAME_BOOST_MAX: 0.10,

    meta: { ...PULSE_GPU_CONFIG_META, block: "EVOLUTION_THRESHOLDS" }
  };

  // COMMANDMENT IX — BAND POLICIES
  const BAND_POLICIES = {
    DEFAULT_BAND: "symbolic",
    PREFERRED_EARN_BAND: "binary",
    PREFERRED_GAME_BAND: "binary",

    BINARY_INDEX_MAX_SURFACE: 100000,
    BINARY_INDEX_MIN_DENSITY_FOR_PRIORITY: 5,

    ALLOW_BAND_SWITCH_ON_INSTABILITY: true,
    ALLOW_BAND_LOCK_ON_STABLE_HIGH_EVOLUTION: true,

    meta: { ...PULSE_GPU_CONFIG_META, block: "BAND_POLICIES" }
  };

  // COMMANDMENT X — SAFETY GUARDS
  const SAFETY_GUARDS = {
    MAX_THERMAL_CRITICAL_SESSIONS: 3,
    MAX_BATTERY_CRITICAL_SESSIONS: 3,
    MAX_CONSECUTIVE_CRASHES: 2,

    REQUIRE_SURVIVAL_CHECK_FOR_HIGH_LOAD_EARN: true,
    REQUIRE_SURVIVAL_CHECK_FOR_BURST_MODE: true,

    DISABLE_EARN_ON_PERSISTENT_CRITICAL_THERMAL: true,
    DISABLE_BURST_ON_PERSISTENT_LOW_BATTERY: true,

    meta: { ...PULSE_GPU_CONFIG_META, block: "SAFETY_GUARDS" }
  };
  
// ============================================================================
//  PulseGPUConfigImmortal — IMMORTAL PSEUDO‑CLASS (v31)
// ============================================================================

export const PulseGPUConfigImmortal = (() => {

  // ------------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
// ------------------------------------------------------------
 

  const scoreConstants = () => SCORE_CONSTANTS;

  const severityThresholds = () => SEVERITY_THRESHOLDS;

  const userPreferences = () => DEFAULT_USER_PREFERENCES;

  const traceLimits = () => TRACE_LIMITS;

  const insightThresholds = () => INSIGHT_THRESHOLDS;

  const memoryRules = () => MEMORY_RULES;

  const gpuModeTiers = () => GPU_MODE_TIERS;

  const evolutionThresholds = () => EVOLUTION_THRESHOLDS;

  const bandPolicies = () => BAND_POLICIES;

  const safetyGuards = () => SAFETY_GUARDS;

  const diagnostics = () => ({
    meta: PULSE_GPU_CONFIG_META,
    capabilityProfile: readCapabilityProfile(),
    scoreConstants: SCORE_CONSTANTS,
    severityThresholds: SEVERITY_THRESHOLDS
  });

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    scoreConstants,
    severityThresholds,
    userPreferences,
    traceLimits,
    insightThresholds,
    memoryRules,
    gpuModeTiers,
    evolutionThresholds,
    bandPolicies,
    safetyGuards,
    diagnostics
  };

})();

PulseRealm.GPUCommandments = {
  PulseGPUConfigImmortal,
  readCapabilityProfile,
  DEFAULT_USER_PREFERENCES,
  SCORE_CONSTANTS,
  INSIGHT_THRESHOLDS,
  SAFETY_GUARDS,
  PULSE_GPU_CONFIG_META
}