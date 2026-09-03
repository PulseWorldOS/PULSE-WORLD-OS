// ============================================================================
//  PulseCoreLayers-v40.js — v40-IMMORTAL-LAYERS (TIER-AWARE, PRESSURE-AWARE)
//  ORGANISM‑WIDE MEMORY LAYER ORGAN (BINARY-SPINE-AWARE, DEVICE/WAVE-AWARE)
//  “RAM IS FAST. DISK IS PERSISTENT. GPU IS OPTIONAL. TIERS NEVER DRIFT.”
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
//  MEMORY LAYER DEFINITIONS — v40 (tier-aware, identity-strong)
// ============================================================================
export const PulseCoreLayers = {
  RAM: {
    id: "ram",
    speed: "fastest",
    volatility: "volatile",
    kind: "memory",
    tier: "runtime"
  },

  DISK_PRIMARY: {
    id: "disk-primary",
    speed: "medium",
    volatility: "persistent",
    kind: "storage",
    tier: "indexeddb-primary"
  },

  DISK_SECONDARY: {
    id: "disk-secondary",
    speed: "medium",
    volatility: "persistent",
    kind: "storage",
    tier: "indexeddb-secondary"
  },

  LOCAL_TIER: {
    id: "local-tier",
    speed: "medium-fast",
    volatility: "persistent",
    kind: "storage",
    tier: "localstorage"
  },

  SESSION_TIER: {
    id: "session-tier",
    speed: "fast",
    volatility: "transient",
    kind: "storage",
    tier: "sessionstorage"
  },

  TEXT_TIER: {
    id: "text-tier",
    speed: "slow",
    volatility: "persistent",
    kind: "storage",
    tier: "text-fallback"
  },

  GPU: {
    id: "gpu",
    speed: "fast",
    volatility: "volatile",
    kind: "compute",
    tier: "gpu"
  },

  PROXY: {
    id: "proxy",
    speed: "fast",
    volatility: "transient",
    kind: "edge",
    tier: "edge"
  }
};

// ============================================================================
//  CLASSIFICATION HELPERS
// ============================================================================
function isHotDataType(dataType) {
  if (!dataType) return false;
  const t = String(dataType);
  return (
    t.startsWith("ai-") ||
    t.startsWith("gpu-") ||
    t === "inbound" ||
    t === "outbound" ||
    t === "proxy-in" ||
    t === "proxy-out"
  );
}

function isColdDataType(dataType) {
  if (!dataType) return false;
  const t = String(dataType);
  return (
    t === "log" ||
    t === "audit" ||
    t === "history" ||
    t === "archive"
  );
}

function isCriticalDataType(dataType) {
  if (!dataType) return false;
  const t = String(dataType);
  return (
    t === "core-state" ||
    t === "checkpoint" ||
    t === "route-snapshot"
  );
}

// ============================================================================
//  LAYER DECISION ENGINE — v40 (OVERLAY-AWARE, TIER-AWARE, PRESSURE-AWARE)
// ============================================================================
export function createPulseCoreLayerRules({
  overlay = null,
  log    = console.log,
  warn   = console.warn
} = {}) {
  function safeLog(stage, details = {}) {
    try {
      log(
        `💾 PULSE CORE MEMORY v40 - [PulseCoreLayers-v40] ${stage}`,
        details
      );
    } catch {}
  }

  function getPressureSnapshot() {
    try {
      const gov = overlay?.Governor;
      if (!gov || !gov._pressure) return { writeAvg: 0, readAvg: 0 };
      return {
        writeAvg: gov._pressure.writeAvg(),
        readAvg: gov._pressure.readAvg()
      };
    } catch {
      return { writeAvg: 0, readAvg: 0 };
    }
  }

  function getTierSnapshot() {
    try {
      const mm = overlay?.MemoryManager || PulseRealm.PulseCoreMemoryManager;
      if (!mm || !mm.instance) {
        return {
          storageTier: "indexeddb",
          emergencyMode: false,
          pressure: 0
        };
      }
      const inst = mm.instance;
      return {
        storageTier: inst.storageTier?.() || "indexeddb",
        emergencyMode: inst.emergencyMode?.() || false,
        pressure: inst.pressure?.() || 0
      };
    } catch {
      return {
        storageTier: "indexeddb",
        emergencyMode: false,
        pressure: 0
      };
    }
  }

  function getWaveSnapshot() {
    try {
      const gov = overlay?.Governor;
      const wave = gov?.waveContextHint?.primaryWave || "unknown";
      return { primaryWave: wave };
    } catch {
      return { primaryWave: "unknown" };
    }
  }

  // -------------------------------------------------------------------------
  // DECIDE PLACEMENT — v40
  // -------------------------------------------------------------------------
  function decidePlacement(dataType, dnaTag, routeId) {
    const route = routeId || "global";
    const { writeAvg, readAvg } = getPressureSnapshot();
    const { storageTier, emergencyMode, pressure } = getTierSnapshot();
    const { primaryWave } = getWaveSnapshot();

    let primary   = PulseCoreLayers.DISK_PRIMARY.id;
    let secondary = PulseCoreLayers.DISK_SECONDARY.id;
    let ram       = PulseCoreLayers.RAM.id;
    let gpu       = PulseCoreLayers.GPU.id;
    let proxy     = PulseCoreLayers.PROXY.id;
    let tier      = storageTier;

    // HOT DATA → RAM + GPU + fast tiers
    if (isHotDataType(dataType)) {
      primary   = PulseCoreLayers.DISK_PRIMARY.id;
      secondary = PulseCoreLayers.DISK_SECONDARY.id;
      ram       = PulseCoreLayers.RAM.id;
      gpu       = PulseCoreLayers.GPU.id;
      proxy     = PulseCoreLayers.PROXY.id;

      if (storageTier === "localstorage" || storageTier === "sessionstorage") {
        tier = storageTier;
      }
    }

    // COLD DATA → disk + local tier
    if (isColdDataType(dataType)) {
      primary   = PulseCoreLayers.DISK_PRIMARY.id;
      secondary = PulseCoreLayers.DISK_SECONDARY.id;
      ram       = PulseCoreLayers.RAM.id;
      gpu       = PulseCoreLayers.GPU.id;
      proxy     = PulseCoreLayers.PROXY.id;

      if (storageTier === "localstorage") {
        tier = "localstorage";
      }
    }

    // CRITICAL DATA → prefer primary disk + local tier, avoid text unless emergency
    if (isCriticalDataType(dataType)) {
      primary   = PulseCoreLayers.DISK_PRIMARY.id;
      secondary = PulseCoreLayers.DISK_SECONDARY.id;
      ram       = PulseCoreLayers.RAM.id;
      gpu       = PulseCoreLayers.GPU.id;
      proxy     = PulseCoreLayers.PROXY.id;

      if (emergencyMode) {
        tier = "text-fallback";
      } else if (storageTier === "localstorage") {
        tier = "localstorage";
      } else {
        tier = "indexeddb";
      }
    }

    // High write pressure → log, but keep layout
    if (writeAvg > 1.2) {
      safeLog("DECIDE_HIGH_WRITE_PRESSURE", {
        dataType,
        route,
        writeAvg,
        storageTier,
        pressure
      });
    }

    // High read pressure → prefer RAM for hot data
    if (readAvg > 1.3 && isHotDataType(dataType)) {
      safeLog("DECIDE_HIGH_READ_PRESSURE", {
        dataType,
        route,
        readAvg,
        storageTier,
        pressure
      });
    }

    // Wave penalties: low-grade waves → bias to local/text tiers
    if (primaryWave === "2g" || primaryWave === "3g") {
      if (!isCriticalDataType(dataType)) {
        if (pressure > 0.7) {
          tier = "localstorage";
        }
        if (pressure > 0.9) {
          tier = "text-fallback";
        }
      }
    }

    return {
      primary,
      secondary,
      ram,
      gpu,
      proxy,
      tier,
      routeId: route,
      emergencyMode,
      pressure,
      wave: primaryWave
    };
  }

  // -------------------------------------------------------------------------
  // PROMOTION / DEMOTION / FLUSH RULES — v40
  // -------------------------------------------------------------------------
  function shouldPromote({ dataType, hits = 0, idleMs = 0 } = {}) {
    if (!isHotDataType(dataType)) return false;
    if (idleMs > 30_000) return false;
    return hits > 8;
  }

  function shouldDemote({ dataType, idleMs = 0, pressure = 0 } = {}) {
    if (isHotDataType(dataType)) {
      if (pressure > 0.8) return idleMs > 15_000;
      return idleMs > 60_000;
    }
    if (isColdDataType(dataType)) {
      return idleMs > 5 * 60_000;
    }
    return idleMs > 3 * 60_000;
  }

  function shouldFlush({ idleMs = 0, pressure = 0, emergencyMode = false } = {}) {
    if (emergencyMode) return idleMs > 30_000 || pressure > 0.9;
    return idleMs > 10 * 60_000;
  }

  const PulseCoreLayerRules = {
    decidePlacement,
    shouldPromote,
    shouldDemote,
    shouldFlush
  };

  // ⭐ UPGRADED: “Initializing Components..” now logs real component state
  safeLog("Initializing Components..", {
    version: "40.0-IMMORTAL-MEMORY-MANAGER",
    dnaTag: "default-dna",
    tierCtx: getTierSnapshot(),
    pressureCtx: getPressureSnapshot(),
    waveCtx: getWaveSnapshot()
  });

  return PulseCoreLayerRules;
}


// ============================================================================
//  PUBLIC ORGAN — v40 (TIER-AWARE, OVERLAY-AWARE)
// ============================================================================
export function createPulseCoreLayersOrgan({
  overlay = null,
  log = console.log,
  warn = console.warn,
  error = console.error
} = {}) {
  const PulseCoreLayerRules = createPulseCoreLayerRules({ overlay, log });

  const PulseCoreLayersOrgan = {
    PulseCoreLayers,
    PulseCoreLayerRules,
    overlay
  };

  return PulseCoreLayersOrgan;
}

PulseRealm.CoreLayers = {
  createPulseCoreLayerRules,
  createPulseCoreLayersOrgan,
  PulseCoreLayers
};
