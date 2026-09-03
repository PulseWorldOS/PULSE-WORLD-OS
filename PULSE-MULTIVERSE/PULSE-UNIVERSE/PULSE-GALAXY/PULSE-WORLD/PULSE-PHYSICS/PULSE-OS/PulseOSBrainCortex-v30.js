// ============================================================================
// FILE: /PULSE-OS/PulseOSCortex-v30-IMMORTAL-Spine++++.js
// PULSE OS — v30-SPINE-DUALBAND-PulseBand+MeshBand-Presence++
// “THE CORTEX ORGAN — HIGH‑LEVEL COGNITION + ORGAN SUPERVISOR (v30++++)”
// ============================================================================
//
// ROLE (v30-SPINE-DUALBAND-PulseBand+MeshBand):
// ---------------------------------------------
// • Receives PulseOSBrain (CNS) directly
// • Reads intent, IQ, OrganismMap, Evolution from Brain
// • Cortex is symbolic‑primary, binary‑aware, mesh‑aware, bandFamily‑aware
// • Pure frontend, deterministic, zero timing, zero backend
// • Continuance-aware (never halts organism)
// • Dual-band aware (symbolic | binary | dual) — tagging only
// • BandFamily aware (pulseband | meshband) — tagging only
// • Binary-aware but NEVER executes binary logic
// • Symbolic-primary: Cortex always thinks in symbolic mode
// • Presence-aware + mesh-aware + chunk/prewarm-aware (via Evolution/BrainIntel)
// • Advantage-aware (device/route tiers via IQ metadata, if present)
// • World-layer aware (can surface world/expansion hints via IQ, if present)
// • Evolution-integrated: lineage + drift + artery/cache/prewarm surfaces
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




const BAND_FAMILY = {
  PULSEBAND: "PulseBand",
  MESHBAND: "meshband"
};

function normalizeBand(band) {
  const b = String(band || "dual").toLowerCase();
  return b === "binary" || b === "symbolic" || b === "dual" ? b : "dual";
}

function normalizeBandFamily(family) {
  const f = String(family || BAND_FAMILY.PULSEBAND).toLowerCase();
  return f === BAND_FAMILY.MESHBAND ? BAND_FAMILY.MESHBAND : BAND_FAMILY.PULSEBAND;
}

// ============================================================================
//  BOOT SURFACE — v30++++
// ============================================================================
export function bootCortex({ Brain, ...options } = {}) {
  if (!Brain) {
    throw new Error("PulseOSCortex v30++++: Missing CNS Brain injection.");
  }

  const cortex = createPulseOSCortex({ Brain });
  return cortex.boot(options);
}

// ============================================================================
//  FACTORY — Cortex receives the CNS Brain directly (v30++++)
// ============================================================================
export function createPulseOSCortex({ Brain }) {
  if (!Brain) {
    throw new Error("PulseOSCortex v30++++: Missing CNS Brain injection.");
  }

  // ⭐ The ONLY correct way Cortex sees Evolution
  const Evolution = Brain.evolution || null;

  // v30: advantage + world hints from IQ, if present
  function computeAdvantageProfile() {
    const iq = Brain.PulseIQMap || {};
    const advantage = iq.advantage || {};
    const device = advantage.device || {};
    const network = advantage.network || {};
    const gpu = advantage.gpu || {};
    const routes = advantage.routes || {};
    const world = advantage.world || {};

    return {
      deviceTier: device.tier || "unknown",
      networkTier: network.tier || "unknown",
      gpuTier: gpu.tier || "unknown",
      routeTiers: routes,
      worldTier: world.tier || "unknown",
      raw: advantage
    };
  }

  function computePresenceDescriptors() {
    // Prefer Evolution surfaces if available
    if (Evolution.getPresenceDescriptors) {
      return Evolution.getPresenceDescriptors();
    }

    if (Brain.BrainIntel.getPresenceDescriptors) {
      return Brain.BrainIntel.getPresenceDescriptors();
    }

    const iq = Brain.PulseIQMap || {};
    const organism = Brain.PulseOrganismMap || {};

    const presenceConfig = iq.presenceConfig || {};
    const meshConfig = iq.meshPresenceConfig || {};

    return {
      presenceField: {
        enabled: !!presenceConfig.enabled,
        bluetoothPreferred: !!presenceConfig.bluetoothPreferred,
        routes: presenceConfig.routes || [],
        pressureHint: presenceConfig.routes
          ? Math.min(presenceConfig.routes.length * 0.05, 1)
          : 0
      },
      meshPresence: {
        enabled: !!meshConfig.enabled,
        topology: meshConfig.topology || "none",
        routes: meshConfig.routes || [],
        pressureHint: meshConfig.routes
          ? Math.min(meshConfig.routes.length * 0.05, 1)
          : 0
      },
      organismSnapshot: {
        organs: Object.keys(organism || {})
      }
    };
  }

  function computeChunkingProfiles() {
    // Prefer Evolution surfaces if available
    if (Evolution.getChunkingProfiles) {
      return Evolution.getChunkingProfiles();
    }

    if (Brain.BrainIntel.getChunkingProfiles) {
      return Brain.BrainIntel.getChunkingProfiles();
    }

    const iq = Brain.PulseIQMap || {};
    const profiles = iq.chunkingProfiles || {};

    return {
      defaultProfile: profiles.default || null,
      routeProfiles: profiles.routes || {},
      gpuProfiles: profiles.gpu || {},
      summary: {
        hasDefault: !!profiles.default,
        routeCount: Object.keys(profiles.routes || {}).length,
        gpuCount: Object.keys(profiles.gpu || {}).length
      }
    };
  }

  function computeArteryLoadSurface() {
    if (Evolution.getArteryLoadSurface) {
      return Evolution.getArteryLoadSurface();
    }
    if (Evolution.getInitialArteryLoads) {
      return Evolution.getInitialArteryLoads();
    }
    return null;
  }

  const CortexState = {
    booted: false,
    routeName: "main",
    hasIdentity: false,

    IntentMap: Brain.intent || null,
    IQMap: Brain.PulseIQMap || {},
    OrganismMap: Brain.PulseOrganismMap || {},

    understanding: Brain.understanding || null,

    band: "dual",
    bandFamily: BAND_FAMILY.PULSEBAND,
    symbolicPrimary: true,
    binaryAware: true,
    meshAware: true,

    lastScan: null,

    presenceDescriptors: computePresenceDescriptors(),
    chunkingProfiles: computeChunkingProfiles(),
    advantageProfile: computeAdvantageProfile(),
    arteryLoadSurface: computeArteryLoadSurface()
  };

  // ========================================================================
  //  BOOT — v30++++
  // ========================================================================
  function bootCortexFn({
    band = "dual",
    bandFamily = "PulseBand",
    dnaTag = null,
    meshTag = null,
    cacheChunkSurface = null,
    prewarmSurface = null,
    arteryLoadSurface = null
  } = {}) {
    const normBand = normalizeBand(band);
    const normFamily = normalizeBandFamily(bandFamily);

    CortexState.band = normBand;
    CortexState.bandFamily = normFamily;

    if (!CortexState.booted) {
      CortexState.booted = true;
    }

    CortexState.presenceDescriptors = computePresenceDescriptors();
    CortexState.chunkingProfiles = computeChunkingProfiles();
    CortexState.advantageProfile = computeAdvantageProfile();
    CortexState.arteryLoadSurface =
      arteryLoadSurface || computeArteryLoadSurface();

    // Let Evolution know Cortex booted with full band context
    Evolution.recordLineage("cortex-boot-v30++++", {
      band: normBand,
      bandFamily: normFamily,
      dnaTag,
      meshTag
    });

    // Give Evolution a chance to rescan drift with this band context
    Evolution.scanDrift(Brain, {
      band: normBand,
      bandFamily: normFamily,
      dnaTag,
      meshTag
    });

    // Optional: let Brain log the boot event
    Brain.log("[Cortex v30-IMMORTAL-SPINE++++] Boot complete", {
      CortexState,
      cacheChunkSurface: cacheChunkSurface ?? Evolution.getCacheChunkSurface(),
      prewarmSurface: prewarmSurface ?? Evolution.getPrewarmSurface(),
      arteryLoadSurface: CortexState.arteryLoadSurface
    });

    return CortexState;
  }

  // ========================================================================
  //  UPDATE — v30++++
// ========================================================================
  function updateCortex(
    ctx = {},
    {
      band = CortexState.band,
      bandFamily = CortexState.bandFamily,
      dnaTag = null,
      meshTag = null
    } = {}
  ) {
    const normBand = normalizeBand(band);
    const normFamily = normalizeBandFamily(bandFamily);

    CortexState.band = normBand;
    CortexState.bandFamily = normFamily;

    CortexState.routeName = ctx.routeName ?? CortexState.routeName;
    CortexState.hasIdentity = ctx.hasIdentity ?? CortexState.hasIdentity;

    CortexState.presenceDescriptors = computePresenceDescriptors();
    CortexState.chunkingProfiles = computeChunkingProfiles();
    CortexState.advantageProfile = computeAdvantageProfile();
    CortexState.arteryLoadSurface = computeArteryLoadSurface();

    Evolution.recordLineage("cortex-update-v30++++", {
      band: normBand,
      bandFamily: normFamily,
      routeName: CortexState.routeName,
      hasIdentity: CortexState.hasIdentity,
      dnaTag,
      meshTag
    });

    return CortexState;
  }

  // ========================================================================
  //  FILE SCANNING — v30++++ (symbolic-only, metadata)
// ========================================================================
  function scanFile(
    filePath,
    {
      band = CortexState.band,
      bandFamily = CortexState.bandFamily,
      dnaTag = null,
      meshTag = null
    } = {}
  ) {
    const scanner =
      Brain.understanding.fileScanner ||
      Brain.understanding.PulseFileScanner ||
      Brain.understanding.scanner ||
      null;

    if (!scanner || typeof scanner.scanFile !== "function") {
      Brain.warn(
        "⚠️ [Cortex v30++++] scanFile requested but no scanner organ available.",
        { filePath }
      );
      return {
        ok: false,
        error: "SCANNER_NOT_AVAILABLE",
        filePath
      };
    }

    const result = scanner.scanFile(filePath);

    CortexState.lastScan = {
      filePath,
      result
    };

    Evolution.recordLineage("cortex-scan-file-v30++++", {
      filePath,
      band: normalizeBand(band),
      bandFamily: normalizeBandFamily(bandFamily),
      dnaTag,
      meshTag
    });

    Evolution.scanDrift(Brain, {
      band: normalizeBand(band),
      bandFamily: normalizeBandFamily(bandFamily),
      dnaTag,
      meshTag
    });

    return result;
  }

  // ========================================================================
  //  PUBLIC API — v30++++
// ========================================================================
  const cortexAPI = {
    boot: bootCortexFn,
    update: updateCortex,
    state: CortexState,
    isReady: () => CortexState.booted,

    scanFile,

    // Reserved hooks for future nervous system wiring
    initializeNervousSystem() {},
    initializeOrgans() {}
  };

  return cortexAPI;
}

PulseRealm.OSBrainCortex = {
  createPulseOSCortex
}