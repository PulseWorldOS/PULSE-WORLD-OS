// ============================================================================
// PULSE-WORLD : PulseBeaconEngine-v30-OneBand-Hive.js
// ORGAN TYPE: Presence / Membrane Organism (Bluetooth-first, band-agnostic symbolic)
// VERSION: v30-OneBand-Hive (Mesh-v30+, OneBand-aware, HiveMesh-aware, Civilization/Town-aware)
// ============================================================================
//
// ROLE:
//   PulseBeaconEngine is the presence membrane of PulseWorld.
//   In practice it emits over Bluetooth via native driver,
//   but symbolically it represents ANY band as PulseBand when attached to the mesh.
//
//   It turns region + mesh + castle + user + worldCore + continuance + omniHosting
//   + beaconPresence + oneBand + distance + hiveMesh state into deterministic,
//   SafetyFrame-compliant presence frames AND EMITS THEM over Bluetooth.
//
//   v30-OneBand-Hive upgrades:
//     - OneBand-aware (any physical band can be treated as PulseBand in worldview).
//     - HiveMesh-aware (hive mentality: device is a cell, mesh is the organism).
//     - Distance-aware (distance tiers / reach / fabric health).
//     - Mesh-v30+ metrics (densityHealth.metrics, hivePressure, hiveSpan).
//     - BeaconPresence-aware (civilizationTier / townType / beaconMode).
//     - WorldMesh-aware via mesh snapshot (aggregated pressure).
//     - Keeps Immortal-GPU+-CI continuance/CI/binary/omni fields (symbolic).
//     - Still the ONLY Bluetooth emitter in the organism.
//
// CONTRACT:
//   - Never auto-connect, never bypass SafetyFrame.
//   - Never perform direct hardware I/O except via internal nativeBluetoothBroadcast.
//   - Never introduce randomness or async drift.
//   - Always remain deterministic, synthetic, and drift-proof in its logic.
//   - This organ is the ONLY Bluetooth membrane in the organism.
//   - Symbolically treats ANY attached band as PulseBand in worldview,
//     but physically only uses the attached Bluetooth driver.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});





// 2 — EXPORT GENOME METADATA
export const PulseBeaconMeta = {
  organId: "PulseBeaconEngine-v30-OneBand-Hive",
  version: "v30-OneBand-Hive",
  role: "PRESENCE_MEMBRANE_ORGANISM",
  epoch: "v30-OneBand-UNIVERSE"
};

// ============================================================================
// INTERNAL BLUETOOTH EMITTER (ONLY HARDWARE EDGE IN THE ORGANISM)
// ============================================================================

let _nativeBluetoothDriver = null; // platform-specific driver, internal only

export function attachNativeBluetoothDriver(driver) {
  // driver MUST implement: driver.broadcast(payload, profile)
  if (!driver || typeof driver.broadcast !== "function") {
    throw new Error("[PulseBeaconEngine-v30] Invalid native Bluetooth driver");
  }
  _nativeBluetoothDriver = driver;
  return { ok: true };
}

function nativeBluetoothBroadcast(payload, profile) {
  if (!_nativeBluetoothDriver) {
    throw new Error(
      "[PulseBeaconEngine-v30] nativeBluetoothBroadcast called with no attached driver"
    );
  }
  _nativeBluetoothDriver.broadcast(payload, profile);
}

// ============================================================================
// HELPERS
// ============================================================================

function clamp01(v) {
  if (v == null || Number.isNaN(v)) return 0;
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

function stableHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `be${h}`;
}

// ============================================================================
//  PulseExpansionMultiInstanceGovernor — IMMORTAL PSEUDO ORGAN
//  Governs: BeaconEngine, MeshBrain, GeoSpinCastle, NodeAdminCore
//  Prevents: Beacon Floods, Region Overlaps, Unbounded Multi‑Instance Growth
// ============================================================================

export const PulseExpansionMultiInstanceGovernor = (() => {

  const create = () => {

    // -----------------------------------------------------------------------
    // CONFIG — matches your BeaconEngine’s expectations
    // -----------------------------------------------------------------------
    const config = Object.freeze({
      canRunMultipleBeaconsPerRegion: true,
      preferSingleBeaconPerCastle: true,
      preventBeaconFlood: true,
      mergeOverlappingBeacons: true,
      splitRegionsOnlyWhenNeeded: true,
      onePrimaryBeaconPerRegionPreferred: true,
      version: "v34-IMMORTAL++"
    });

    // -----------------------------------------------------------------------
    // DECISION: Should we spawn a new beacon?
    // -----------------------------------------------------------------------
    const shouldSpawnBeacon = ({ regionState, demand, density }) => {
      // No region → no spawn
      if (!regionState) return false;

      // If region already has a primary beacon
      if (regionState.hasPrimaryBeacon && config.onePrimaryBeaconPerRegionPreferred) {
        // Only spawn additional beacons if density is high
        return density > 0.75 && config.canRunMultipleBeaconsPerRegion;
      }

      // If no beacon exists → spawn
      if (!regionState.hasPrimaryBeacon) return true;

      // If beacon exists but demand spike is extreme
      if (demand > 0.9 && density > 0.6) return true;

      return false;
    };

    // -----------------------------------------------------------------------
    // DECISION: Should we merge beacons?
    // -----------------------------------------------------------------------
    const shouldMergeBeacons = ({ beaconCount, overlapScore }) => {
      if (!config.mergeOverlappingBeacons) return false;

      // If too many beacons in same region
      if (beaconCount > 1 && overlapScore > 0.5) return true;

      return false;
    };

    // -----------------------------------------------------------------------
    // DECISION: Should we split region?
    // -----------------------------------------------------------------------
    const shouldSplitRegion = ({ density, load, cost }) => {
      if (!config.splitRegionsOnlyWhenNeeded) return false;

      // Split only when density is extremely high AND cost is low
      return density > 0.85 && load > 0.7 && cost < 0.4;
    };

    // -----------------------------------------------------------------------
    // DECISION: Should we retire a beacon?
    // -----------------------------------------------------------------------
    const shouldRetireBeacon = ({ idleTime, regionState }) => {
      if (!config.preventBeaconFlood) return false;

      // If beacon idle too long
      if (idleTime > 30000) return true;

      // If region has multiple beacons but low demand
      if (regionState.beaconCount > 1 && regionState.demand < 0.3) return true;

      return false;
    };

    // -----------------------------------------------------------------------
    // DECISION: Which beacon is primary?
    // -----------------------------------------------------------------------
    const pickPrimaryBeacon = (beacons = []) => {
      if (!beacons.length) return null;

      // Primary = highest health + lowest latency + oldest uptime
      return beacons
        .slice()
        .sort((a, b) =>
          (b.health - a.health) ||
          (a.latency - b.latency) ||
          (a.startedAt - b.startedAt)
        )[0];
    };

    // -----------------------------------------------------------------------
    // PUBLIC IMMORTAL INSTANCE
    // -----------------------------------------------------------------------
    return Object.freeze({
      config,
      shouldSpawnBeacon,
      shouldMergeBeacons,
      shouldSplitRegion,
      shouldRetireBeacon,
      pickPrimaryBeacon
    });
  };

  return Object.freeze({ create });

})();


// ============================================================================
// FACTORY: createPulseBeaconEngine — v30-OneBand-Hive
// ============================================================================

export function createPulseBeaconEngine({
  engineID = null,
  regionID = null,
  boundCastleID = null,
  trace = false,
  safetyPolicy = null, // fn({ mode, payload, signalProfile }) => { allowed: boolean, reason?: string }
  globalHints = null,  // unified global hints object
  oneBandId = "PULSE-ONEBAND",
  distanceModel = "distance-tier-symbolic"
} = {}) {
  // --------------------------------------------------------------------------
  // INTERNAL STATE
  // --------------------------------------------------------------------------
  let activeMode =
    "discovery"; // discovery | presence | adaptive | pulse-reach | pulse-storm | PULSE-MESH | pulse-expand | pulse-immortal | hive

  let tick = 0;

  const identity = Object.freeze({
    engineID: engineID || stableHash(`engine-${regionID || "global"}`),
    regionID,
    boundCastleID,
    createdBy: "PulseExpansion-v30-OneBand-Hive"
  });

  const payloadState = {
    regionTag: null,
    castlePresence: false,
    meshStatus: "unknown",      // unknown | weak | stable | strong
    meshPressureIndex: 0,       // 0–100 symbolic pressure index
    meshStrength: "unknown",    // unknown | weak | stable | strong
    loadHint: "light",          // light | medium | heavy
    experienceHint: "PulseWorld",
    userProfile: "unknown",     // unknown | new | known
    advantageHint: "neutral",   // neutral | boost | protect | expand
    fallbackBandLevel: 0,       // 0–3 symbolic band level
    coldStartPhase: "unknown"   // unknown | warming | active | cooling
  };

  const signalState = {
    powerLevel: "auto",      // low | medium | high | auto
    intervalProfile: "auto", // auto | frequent | steady | sparse
    maxRangeMeters: 50
  };

  const optInState = {
    requiresUserTap: true,
    requiresConsent: true,
    noSilentJoin: true
  };

  const telemetry = {
    activeMode: null,
    seenDevicesCount: 0,
    optInAttempts: 0,
    successfulJoins: 0,
    lastBroadcast: null,
    totalBroadcasts: 0
  };

  // v30 artery metrics (symbolic only)
  const artery = {
    totalBroadcasts: 0,
    lastMode: null,
    lastPayloadSize: 0,
    lastSignalPower: "auto",
    lastIntervalProfile: "auto",
    loadBucket: "idle",     // idle | low | medium | high | saturated
    pressureBucket: "none"  // none | low | medium | high | overload
  };

  // v30+ global → local hybrid hints
  let lastGlobalHints = globalHints || null;

  // External bridges
  let overmind = null;
  let nodeAdmin = null;

  // Attachments (mesh/user/worldCore/server/router/continuance/omniHosting/beaconPresence/oneBand/distance/hiveMesh)
  let meshSnapshotProvider = null;          // () => mesh.getSnapshot()
  let worldCoreSnapshotProvider = null;     // () => worldCore.snapshotWorld()
  let routerSnapshotProvider = null;        // () => router.getSnapshot()
  let serverSnapshotProvider = null;        // () => pulseServerSnapshot
  let continuanceSnapshotProvider = null;   // () => getLastContinuanceState()
  let omniHostingSnapshotProvider = null;   // () => getLastOmniHostingState()
  let beaconPresenceProvider = null;        // () => ({ ok, beaconPresence })
  let oneBandSnapshotProvider = null;       // () => oneBandView
  let distanceSnapshotProvider = null;      // () => distanceView
  let hiveMeshSnapshotProvider = null;      // () => hiveMeshView
  let userContext = null;                   // user/session context (symbolic only)

  // --------------------------------------------------------------------------
  // BASELINE DEFINITIONS
  // --------------------------------------------------------------------------
  const Modes = Object.freeze({
    baseline: {
      discovery: {
        description: "High-power, visible beacon for new users",
        powerProfile: "high",
        intervalProfile: "frequent"
      },
      presence: {
        description: "Low-power heartbeat for known Pulse devices",
        powerProfile: "low",
        intervalProfile: "steady"
      }
    },
    adaptive: {
      autoSwitchEnabled: true,
      densityAware: true,
      demandAware: true,
      regionTypeAware: true // home | venue | campus | city
    },
    organism: {
      "pulse-reach": {
        description: "Extended reach for sparse regions",
        powerProfile: "high",
        intervalProfile: "steady"
      },
      "pulse-storm": {
        description: "Short, intense bursts for high attention windows",
        powerProfile: "high",
        intervalProfile: "frequent"
      },
      "PULSE-MESH": {
        description: "Mesh-aware, cooperative presence",
        powerProfile: "medium",
        intervalProfile: "steady"
      },
      "pulse-expand": {
        description: "Gradual region expansion under mesh guidance",
        powerProfile: "medium",
        intervalProfile: "auto"
      },
      "pulse-immortal": {
        description: "Continuance/CI-aware immortal presence lane",
        powerProfile: "medium",
        intervalProfile: "steady"
      },
      "hive": {
        description: "HiveMesh-aware, organism-first presence (every node as a cell)",
        powerProfile: "medium",
        intervalProfile: "steady"
      }
    },
    defaults: {
      initialMode: "discovery"
    }
  });

  const PayloadProfiles = Object.freeze({
    newUserProfile: {
      showOnboardingHint: true,
      showFirstTimeTag: true
    },
    knownUserProfile: {
      showFastPathHint: true,
      showWelcomeBackTag: true
    }
  });

  const SignalLimits = Object.freeze({
    maxPowerProfile: "high",
    minIntervalProfile: "sane" // symbolic; enforced via mapping
  });

  const MultiInstance = Object.freeze({
    canRunMultipleBeaconsPerRegion: true,
    preferSingleBeaconPerCastle: true,
    governedBy: PulseExpansionMultiInstanceGovernor,
    preventBeaconFlood: true,
    mergeOverlappingBeacons: true,
    splitRegionsOnlyWhenNeeded: true,
    onePrimaryBeaconPerRegionPreferred: true
  });

  const Contracts = Object.freeze({
    mustBeUserVisible: true,
    mustBeUserControllable: true,
    mustRespectSafetyFrame: true,
    mustNotAutoConnect: true
  });

  // --------------------------------------------------------------------------
  // LOGGING / ARTERY
  // --------------------------------------------------------------------------
  function log(...args) {
    if (trace) console.log("[PulseBeaconEngine-v30]", ...args);
  }

  function bumpArtery(payload, profile) {
    artery.totalBroadcasts += 1;
    artery.lastMode = activeMode;
    artery.lastPayloadSize = payload ? JSON.stringify(payload).length : 0;
    artery.lastSignalPower = profile.powerProfile;
    artery.lastIntervalProfile = profile.intervalProfile;

    const load = clamp01(artery.totalBroadcasts / 16384);
    const pressure = clamp01(artery.lastPayloadSize / 8192);

    artery.loadBucket =
      load >= 0.9
        ? "saturated"
        : load >= 0.7
        ? "high"
        : load >= 0.4
        ? "medium"
        : load > 0
        ? "low"
        : "idle";

    artery.pressureBucket =
      pressure >= 0.9
        ? "overload"
        : pressure >= 0.7
        ? "high"
        : pressure >= 0.4
        ? "medium"
        : pressure > 0
        ? "low"
        : "none";
  }

  function getArterySnapshot() {
    return Object.freeze({
      ...artery
    });
  }

  function rememberBroadcast(payload, profile) {
    telemetry.activeMode = activeMode;
    telemetry.lastBroadcast = {
      timestamp: PulseRealm.PulseNOW,
      payload,
      profile
    };
    telemetry.totalBroadcasts += 1;
    bumpArtery(payload, profile);
  }

  function emitToOvermind(eventType, data) {
    if (!overmind || typeof overmind.emit !== "function") return;
    overmind.emit({
      organId: PulseBeaconMeta.organId,
      eventType,
      data,
      snapshot: getStateSnapshot()
    });
  }

  function emitToNodeAdmin(eventType, data) {
    if (!nodeAdmin || typeof nodeAdmin.onBeaconEvent !== "function") return;
    nodeAdmin.onBeaconEvent({
      organId: PulseBeaconMeta.organId,
      eventType,
      data,
      snapshot: getStateSnapshot()
    });
  }

  // --------------------------------------------------------------------------
  // ATTACHMENTS
  // --------------------------------------------------------------------------
  function attachMeshSnapshotProvider(provider) {
    meshSnapshotProvider = typeof provider === "function" ? provider : null;
    return { ok: true, hasProvider: !!meshSnapshotProvider };
  }

  function attachWorldCoreSnapshotProvider(provider) {
    worldCoreSnapshotProvider = typeof provider === "function" ? provider : null;
    return { ok: true, hasProvider: !!worldCoreSnapshotProvider };
  }

  function attachRouterSnapshotProvider(provider) {
    routerSnapshotProvider = typeof provider === "function" ? provider : null;
    return { ok: true, hasProvider: !!routerSnapshotProvider };
  }

  function attachServerSnapshotProvider(provider) {
    serverSnapshotProvider = typeof provider === "function" ? provider : null;
    return { ok: true, hasProvider: !!serverSnapshotProvider };
  }

  function attachContinuanceSnapshotProvider(provider) {
    continuanceSnapshotProvider = typeof provider === "function" ? provider : null;
    return { ok: true, hasProvider: !!continuanceSnapshotProvider };
  }

  function attachOmniHostingSnapshotProvider(provider) {
    omniHostingSnapshotProvider = typeof provider === "function" ? provider : null;
    return { ok: true, hasProvider: !!omniHostingSnapshotProvider };
  }

  function attachBeaconPresenceProvider(provider) {
    beaconPresenceProvider = typeof provider === "function" ? provider : null;
    return { ok: true, hasProvider: !!beaconPresenceProvider };
  }

  function attachOneBandSnapshotProvider(provider) {
    oneBandSnapshotProvider = typeof provider === "function" ? provider : null;
    return { ok: true, hasProvider: !!oneBandSnapshotProvider };
  }

  function attachDistanceSnapshotProvider(provider) {
    distanceSnapshotProvider = typeof provider === "function" ? provider : null;
    return { ok: true, hasProvider: !!distanceSnapshotProvider };
  }

  function attachHiveMeshSnapshotProvider(provider) {
    hiveMeshSnapshotProvider = typeof provider === "function" ? provider : null;
    return { ok: true, hasProvider: !!hiveMeshSnapshotProvider };
  }

  function attachUserContext(ctx) {
    userContext = ctx || null;
    emitToOvermind("user-context-updated", { userContext });
    emitToNodeAdmin("user-context-updated", { userContext });
    return { ok: true, userContext };
  }

  function attachOvermind(o) {
    overmind = o || null;
    return { ok: true, overmindAttached: !!overmind };
  }

  function attachNodeAdmin(n) {
    nodeAdmin = n || null;
    return { ok: true, nodeAdminAttached: !!nodeAdmin };
  }

  // --------------------------------------------------------------------------
  // READERS
  // --------------------------------------------------------------------------
  function safeCall(provider) {
    if (!provider || typeof provider !== "function") return null;
    try {
      return provider() || null;
    } catch {
      return null;
    }
  }

  function readMeshView() {
    return safeCall(meshSnapshotProvider);
  }

  function readWorldCoreView() {
    return safeCall(worldCoreSnapshotProvider);
  }

  function readContinuanceView() {
    return safeCall(continuanceSnapshotProvider);
  }

  function readOmniHostingView() {
    return safeCall(omniHostingSnapshotProvider);
  }

  function readBeaconPresence() {
    const res = safeCall(beaconPresenceProvider);
    if (!res || !res.ok) return null;
    return res.beaconPresence || null;
  }

  function readOneBandView() {
    return safeCall(oneBandSnapshotProvider);
  }

  function readDistanceView() {
    return safeCall(distanceSnapshotProvider);
  }

  function readHiveMeshView() {
    return safeCall(hiveMeshSnapshotProvider);
  }

  // --------------------------------------------------------------------------
  // GLOBAL HINTS
  // --------------------------------------------------------------------------
  function setGlobalHints(hints) {
    lastGlobalHints = hints || null;
    emitToOvermind("global-hints-updated", { hints: lastGlobalHints });
    emitToNodeAdmin("global-hints-updated", { hints: lastGlobalHints });
    return { ok: true, hints: lastGlobalHints };
  }

  function getGlobalHints() {
    return lastGlobalHints;
  }

  // --------------------------------------------------------------------------
  // MODE ENGINE
  // --------------------------------------------------------------------------
  function setMode(nextMode) {
    if (!nextMode || typeof nextMode !== "string") {
      return { ok: false, reason: "invalid-mode" };
    }

    const known =
      Modes.baseline[nextMode] ||
      Modes.organism[nextMode] ||
      (nextMode === "adaptive" ? Modes.adaptive : null);

    if (!known && nextMode !== "adaptive") {
      return { ok: false, reason: "unknown-mode" };
    }

    activeMode = nextMode;
    log("Mode set:", activeMode);
    emitToOvermind("mode-change", { mode: activeMode });
    emitToNodeAdmin("mode-change", { mode: activeMode });
    return { ok: true, mode: activeMode };
  }

  function getMode() {
    return activeMode;
  }

  // --------------------------------------------------------------------------
  // CONTINUANCE / CI / BINARY-DELTA / OMNI FIELDS
  // --------------------------------------------------------------------------
  function buildContinuanceField() {
    const cont = readContinuanceView();
    const risk = cont.riskReport || null;

    if (!risk) {
      return Object.freeze({
        globalRisk: 0,
        fallbackBandLevel: 0,
        prewarmHint: { shouldPrewarm: false, reason: "no_risk_report" },
        cacheHint: { keepHot: false, priority: "normal", gpuMode: "cpu" },
        chunkHint: { chunkAggression: 1, gpuMode: "cpu" },
        notes: ["no_continuance_state"]
      });
    }

    return Object.freeze({
      globalRisk: clamp01(risk.globalRisk || 0),
      fallbackBandLevel: risk.fallbackBandLevel ?? 0,
      prewarmHint: risk.prewarmHint || null,
      cacheHint: risk.cacheHint || null,
      chunkHint: risk.chunkHint || null,
      gpuMode: risk.gpuMode || "cpu",
      notes: Array.isArray(risk.notes) ? risk.notes.slice() : []
    });
  }

  function buildCIField() {
    const cont = readContinuanceView();
    const ciSurface = cont.lastPacket.ciSurface || null;

    if (!ciSurface) {
      return Object.freeze({
        ciActive: false,
        ciMode: "none",
        ciScore: 0
      });
    }

    return Object.freeze({
      ciActive: true,
      ciMode: ciSurface.mode || "unknown",
      ciScore: clamp01(ciSurface.ciScore ?? 1)
    });
  }

  function buildBinaryDeltaField() {
    const cont = readContinuanceView();
    const deltaPacket = cont.lastPacket.ciDeltaPacket || null;
    const delta = deltaPacket.delta || null;

    if (!delta) {
      return Object.freeze({
        deltaPresent: false,
        addedBits: 0,
        removedBits: 0,
        unchangedBits: 0
      });
    }

    return Object.freeze({
      deltaPresent: true,
      addedBits: delta.addedCount ?? 0,
      removedBits: delta.removedCount ?? 0,
      unchangedBits: delta.unchangedCount ?? 0
    });
  }

  function buildOmniHostingField() {
    const oh = readOmniHostingView();
    const placement = oh.lastPlacementPlan || null;
    const failover = oh.lastFailoverPlan || null;

    return Object.freeze({
      placement: placement
        ? {
            selectedHosts: placement.selectedHosts || [],
            eligibleHosts: placement.eligibleHosts || [],
            fallbackBandLevel: placement.fallbackBandLevel ?? 0,
            artery: placement.artery || null
          }
        : null,
      failover: failover
        ? {
            failoverTargets: failover.failoverTargets || [],
            fallbackBandLevel: failover.fallbackBandLevel ?? 0,
            artery: failover.artery || null
          }
        : null
    });
  }

  // --------------------------------------------------------------------------
  // ONEBAND / DISTANCE / HIVE FIELDS (SYMBOLIC)
// --------------------------------------------------------------------------
  function buildOneBandField() {
    const oneBandView = readOneBandView();
    const bandId = oneBandView.bandId || oneBandId;
    const span = oneBandView.span ?? null;
    const tier = oneBandView.tier ?? null;
    const health = oneBandView.health ?? null;
    const load = oneBandView.load ?? null;

    // Core idea: if we run on any band, that band is PulseBand in worldview.
    const isOnPulseBand = true;
    const physicalBandType = oneBandView.physicalBandType || "unknown"; // cellular | wifi | bt | sat | unknown

    return Object.freeze({
      bandId,
      span,
      tier,
      health,
      load,
      isOnPulseBand,
      physicalBandType
    });
  }

  function buildDistanceField() {
    const distanceView = readDistanceView();
    return Object.freeze({
      distanceModel,
      maxReach: distanceView.maxReach ?? null,
      tier: distanceView.tier ?? null,
      fabricHealth: distanceView.fabricHealth ?? null,
      stress: distanceView.stress ?? null
    });
  }

  function buildHiveField() {
    const hiveView = readHiveMeshView();
    return Object.freeze({
      hiveActive: !!hiveView,
      hiveId: hiveView.hiveId || null,
      hivePressure: hiveView.pressure ?? null,
      hiveSpan: hiveView.span ?? null,
      hiveDensity: hiveView.density ?? null,
      hiveRole: hiveView.role || "cell", // cell | hub | artery | brain (symbolic)
      organismPresence: hiveView.organismPresence || "unknown"
    });
  }

  // --------------------------------------------------------------------------
  // PRESENCE / ADVANTAGE / HINTS / BAND / CHUNK / IMMORTAL / BEACON PRESENCE
  // --------------------------------------------------------------------------
  function buildPresenceField() {
    const gh = lastGlobalHints || {};
    const presenceCtx = gh.presenceContext || {};
    const advantageCtx = gh.advantageContext || {};
    const fallbackCtx = gh.fallbackContext || {};

    const meshView = readMeshView();
    const wcView = readWorldCoreView();
    const contField = buildContinuanceField();
    const dh = meshView.densityHealth.metrics || null;

    const regionPresence =
      payloadState.regionTag ||
      presenceCtx.regionPresence ||
      wcView.advantageContext.presenceField.presenceTier ||
      regionID ||
      "unknown";

    const meshStrength =
      gh.meshStrength ||
      payloadState.meshStrength ||
      payloadState.meshStatus ||
      dh.meshStrength ||
      "unknown";

    const meshPressureIndex =
      gh.meshPressureIndex ??
      payloadState.meshPressureIndex ??
      dh.meshPressureIndex ??
      0;

    const fallbackBandLevel =
      fallbackCtx.fallbackBandLevel ??
      gh.fallbackBandLevel ??
      payloadState.fallbackBandLevel ??
      contField.fallbackBandLevel ??
      0;

    return Object.freeze({
      bandPresence: presenceCtx.bandPresence || "unknown",
      routerPresence: presenceCtx.routerPresence || "unknown",
      devicePresence: presenceCtx.devicePresence || "unknown",
      meshPresence: payloadState.meshStatus,
      meshStrength,
      meshPressureIndex,
      castlePresence: payloadState.castlePresence ? "present" : "absent",
      regionPresence,
      advantageBand: advantageCtx.advantageBand || payloadState.advantageHint || "neutral",
      fallbackBandLevel,
      coldStartPhase: payloadState.coldStartPhase
    });
  }

  function buildAdvantageField() {
    const gh = lastGlobalHints || {};
    const advantageCtx = gh.advantageContext || {};
    const wcView = readWorldCoreView();

    return Object.freeze({
      advantageScore: advantageCtx.score ?? null,
      advantageBand: advantageCtx.band || payloadState.advantageHint || "neutral",
      regionAdvantage: gh.regionAdvantage || wcView.advantageContext.advantageField || {},
      regionPresence: gh.regionPresence || wcView.advantageContext.presenceField || {}
    });
  }

  function buildHintsField() {
    const gh = lastGlobalHints || {};
    const fallbackCtx = gh.fallbackContext || {};
    const contField = buildContinuanceField();

    const fallbackBandLevel =
      fallbackCtx.fallbackBandLevel ??
      gh.fallbackBandLevel ??
      payloadState.fallbackBandLevel ??
      contField.fallbackBandLevel ??
      0;

    const chunkHints = {
      ...(gh.chunkHints || {}),
      ...(contField.chunkHint ? { chunkAggression: contField.chunkHint.chunkAggression } : {})
    };

    const cacheHints = {
      ...(gh.cacheHints || {}),
      ...(contField.cacheHint || {})
    };

    const prewarmHints = {
      ...(gh.prewarmHints || {}),
      ...(contField.prewarmHint || {})
    };

    return Object.freeze({
      fallbackBandLevel,
      chunkHints,
      cacheHints,
      prewarmHints,
      regionChunkPlan: gh.regionChunkPlan || {}
    });
  }

  function buildBandField() {
    const gh = lastGlobalHints || {};
    const bandSignature = gh.bandSignature || null;
    const binaryField = gh.binaryField || null;
    const waveField = gh.waveField || null;

    const ciField = buildCIField();
    const binaryDeltaField = buildBinaryDeltaField();
    const oneBandField = buildOneBandField();

    return Object.freeze({
      bandSignature,
      binaryField,
      waveField,
      ciField,
      binaryDeltaField,
      oneBandField
    });
  }

  function buildChunkPrewarmField() {
    const hintsField = buildHintsField();

    return Object.freeze({
      planVersion: "v30-Beacon-ChunkPrewarm-OneBand-Hive",
      fallbackBandLevel: hintsField.fallbackBandLevel,
      chunkHints: hintsField.chunkHints,
      cacheHints: hintsField.cacheHints,
      prewarmHints: hintsField.prewarmHints,
      regionChunkPlan: hintsField.regionChunkPlan
    });
  }

  function buildImmortalField() {
    const contField = buildContinuanceField();
    const ciField = buildCIField();
    const binaryDeltaField = buildBinaryDeltaField();
    const omniField = buildOmniHostingField();
    const hiveField = buildHiveField();

    return Object.freeze({
      epoch: PulseBeaconMeta.epoch,
      continuance: contField,
      ci: ciField,
      binaryDelta: binaryDeltaField,
      omniHosting: omniField,
      hive: hiveField,
      artery: getArterySnapshot()
    });
  }

  function buildBeaconPresenceField() {
    const beaconPresence = readBeaconPresence();

    if (!beaconPresence) {
      return Object.freeze({
        hasBeaconPresence: false,
        civilizationTier: "void",
        townType: "wilderness",
        beaconMode: "neutral",
        beaconStrength: "unknown",
        meshPressureBand: "unknown",
        costBand: "unknown"
      });
    }

    return Object.freeze({
      hasBeaconPresence: true,
      civilizationTier: beaconPresence.civilizationTier || "void",
      townType: beaconPresence.townType || "wilderness",
      beaconMode: beaconPresence.beaconMode || "neutral",
      beaconStrength: beaconPresence.beaconStrength || "unknown",
      meshPressureBand: beaconPresence.pressureBand || "unknown",
      costBand: beaconPresence.costBand || "unknown"
    });
  }

  // --------------------------------------------------------------------------
  // PAYLOAD ENGINE
  // --------------------------------------------------------------------------
  function updatePayloadFromContext(ctx = {}) {
    const {
      regionTag = null,
      castlePresence = null,
      meshStatus = null,
      meshPressureIndex = null,
      meshStrength = null,
      loadHint = null,
      userProfile = null,
      advantageHint = null,
      fallbackBandLevel = null,
      coldStartPhase = null
    } = ctx;

    if (regionTag !== null) payloadState.regionTag = regionTag;
    if (castlePresence !== null) payloadState.castlePresence = !!castlePresence;
    if (meshStatus !== null) payloadState.meshStatus = meshStatus;
    if (meshPressureIndex !== null) payloadState.meshPressureIndex = meshPressureIndex;
    if (meshStrength !== null) payloadState.meshStrength = meshStrength;
    if (loadHint !== null) payloadState.loadHint = loadHint;
    if (userProfile !== null) payloadState.userProfile = userProfile;
    if (advantageHint !== null) payloadState.advantageHint = advantageHint;
    if (fallbackBandLevel !== null) payloadState.fallbackBandLevel = fallbackBandLevel;
    if (coldStartPhase !== null) payloadState.coldStartPhase = coldStartPhase;

    // Mesh auto-hydration (symbolic only, v30 metrics)
    const meshView = readMeshView();
    const dh = meshView.densityHealth.metrics || null;
    if (dh) {
      if (typeof dh.meshPressureIndex === "number") {
        payloadState.meshPressureIndex = dh.meshPressureIndex;
      }
      if (typeof dh.meshStrength === "string") {
        payloadState.meshStrength = dh.meshStrength;
        payloadState.meshStatus = dh.meshStrength;
      }
    }

    emitToOvermind("payload-updated", { payloadState });
    emitToNodeAdmin("payload-updated", { payloadState });

    return { ok: true, payloadState: { ...payloadState } };
  }

  function buildPayload() {
    const base = {
      regionTag: payloadState.regionTag,
      castlePresence: payloadState.castlePresence,
      meshStatus: payloadState.meshStatus,
      meshStrength: payloadState.meshStrength,
      meshPressureIndex: payloadState.meshPressureIndex,
      loadHint: payloadState.loadHint,
      experienceHint: payloadState.experienceHint
    };

    let profileHints = {};
    if (payloadState.userProfile === "new") {
      profileHints = PayloadProfiles.newUserProfile;
    } else if (payloadState.userProfile === "known") {
      profileHints = PayloadProfiles.knownUserProfile;
    }

    const presenceField = buildPresenceField();
    const advantageField = buildAdvantageField();
    const hintsField = buildHintsField();
    const bandField = buildBandField();
    const chunkPrewarmField = buildChunkPrewarmField();
    const immortalField = buildImmortalField();
    const beaconPresenceField = buildBeaconPresenceField();
    const distanceField = buildDistanceField();

    return Object.freeze({
      ...base,
      ...profileHints,
      presenceField,
      advantageField,
      hintsField,
      bandField,
      chunkPrewarmField,
      immortalField,
      beaconPresenceField,
      distanceField,
      userContext: userContext || null,
      globalHints: {
        fallbackBandLevel: hintsField.fallbackBandLevel,
        chunkHints: hintsField.chunkHints,
        cacheHints: hintsField.cacheHints,
        prewarmHints: hintsField.prewarmHints,
        regionPresence: advantageField.regionPresence,
        regionAdvantage: advantageField.regionAdvantage,
        regionChunkPlan: hintsField.regionChunkPlan,
        bandSignature: bandField.bandSignature
      }
    });
  }

  // --------------------------------------------------------------------------
  // SIGNAL SHAPING ENGINE
  // --------------------------------------------------------------------------
  function computeSignalProfile({
    densityHint,
    demandHint,
    regionType,
    meshStatus
  } = {}) {
    let powerProfile = "medium";
    let intervalProfile = "steady";

    const baseline = Modes.baseline[activeMode];
    const organism = Modes.organism[activeMode];

    if (baseline) {
      powerProfile = baseline.powerProfile;
      intervalProfile = baseline.intervalProfile;
    } else if (organism) {
      powerProfile = organism.powerProfile;
      intervalProfile = organism.intervalProfile;
    } else if (activeMode === "adaptive") {
      powerProfile = "auto";
      intervalProfile = "auto";
    }

    // Simple symbolic shaping based on density / demand / meshStatus
    const mesh = meshStatus || payloadState.meshStatus || "unknown";
    const density = densityHint || "unknown";
    const demand = demandHint || "unknown";

    if (mesh === "weak") {
      powerProfile = "high";
      intervalProfile = "steady";
    } else if (mesh === "strong") {
      powerProfile = "low";
      intervalProfile = "steady";
    }

    if (density === "high" && demand === "high") {
      intervalProfile = "frequent";
    } else if (density === "low" && demand === "low") {
      intervalProfile = "sparse";
    }

    // Clamp to symbolic limits
    if (powerProfile === "insane") powerProfile = SignalLimits.maxPowerProfile;

    return Object.freeze({
      powerProfile,
      intervalProfile,
      maxRangeMeters: signalState.maxRangeMeters
    });
  }

  // --------------------------------------------------------------------------
  // SAFETY FRAME
  // --------------------------------------------------------------------------
  function checkSafety(payload, signalProfile) {
    if (!safetyPolicy) {
      return { allowed: true, reason: "no_safety_policy" };
    }
    try {
      const res = safetyPolicy({
        mode: activeMode,
        payload,
        signalProfile
      });
      if (!res || typeof res.allowed !== "boolean") {
        return { allowed: false, reason: "invalid_safety_response" };
      }
      return res;
    } catch {
      return { allowed: false, reason: "safety_policy_error" };
    }
  }

  // --------------------------------------------------------------------------
  // BROADCAST ENGINE
  // --------------------------------------------------------------------------
  function broadcastOnce() {
    tick += 1;

    const payload = buildPayload();
    const meshView = readMeshView();
    const densityHint = meshView.densityHealth.densityBand || "unknown";
    const demandHint = meshView.demandBand || "unknown";
    const regionType = meshView.regionType || "unknown";

    const signalProfile = computeSignalProfile({
      densityHint,
      demandHint,
      regionType,
      meshStatus: payload.meshStatus
    });

    const safety = checkSafety(payload, signalProfile);
    if (!safety.allowed) {
      log("Broadcast blocked by SafetyFrame:", safety.reason);
      emitToOvermind("broadcast-blocked", { reason: safety.reason, payload, signalProfile });
      emitToNodeAdmin("broadcast-blocked", { reason: safety.reason, payload, signalProfile });
      return { ok: false, reason: safety.reason };
    }

    nativeBluetoothBroadcast(payload, signalProfile);
    rememberBroadcast(payload, signalProfile);

    emitToOvermind("broadcast", { payload, signalProfile });
    emitToNodeAdmin("broadcast", { payload, signalProfile });

    return { ok: true, payload, signalProfile };
  }

  // --------------------------------------------------------------------------
  // SNAPSHOT
  // --------------------------------------------------------------------------
  function getStateSnapshot() {
    return Object.freeze({
      identity,
      activeMode,
      tick,
      payloadState: { ...payloadState },
      signalState: { ...signalState },
      optInState: { ...optInState },
      telemetry: { ...telemetry },
      artery: getArterySnapshot(),
      contracts: Contracts,
      multiInstance: MultiInstance
    });
  }

  // --------------------------------------------------------------------------
  // PUBLIC API
  // --------------------------------------------------------------------------
  return Object.freeze({
    meta: PulseBeaconMeta,
    identity,

    // Attachments
    attachMeshSnapshotProvider,
    attachWorldCoreSnapshotProvider,
    attachRouterSnapshotProvider,
    attachServerSnapshotProvider,
    attachContinuanceSnapshotProvider,
    attachOmniHostingSnapshotProvider,
    attachBeaconPresenceProvider,
    attachOneBandSnapshotProvider,
    attachDistanceSnapshotProvider,
    attachHiveMeshSnapshotProvider,
    attachUserContext,
    attachOvermind,
    attachNodeAdmin,

    // Global hints
    setGlobalHints,
    getGlobalHints,

    // Mode
    setMode,
    getMode,

    // Payload / broadcast
    updatePayloadFromContext,
    buildPayload,
    computeSignalProfile,
    broadcastOnce,

    // Snapshot
    getStateSnapshot
  });
}
// ============================================================================
//  PulseBeaconEngine — IMMORTAL PSEUDO‑CLASS (v30 IMMORTAL++)
// ============================================================================

export const PulseBeaconEngine = (() => {

  // ------------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
  // ------------------------------------------------------------
  const lane = {
    identity: null,

    activeMode: "discovery",
    tick: 0,

    payloadState: {
      regionTag: null,
      castlePresence: false,
      meshStatus: "unknown",
      meshPressureIndex: 0,
      meshStrength: "unknown",
      loadHint: "light",
      experienceHint: "PulseWorld",
      userProfile: "unknown",
      advantageHint: "neutral",
      fallbackBandLevel: 0,
      coldStartPhase: "unknown"
    },

    signalState: {
      powerLevel: "auto",
      intervalProfile: "auto",
      maxRangeMeters: 50
    },

    optInState: {
      requiresUserTap: true,
      requiresConsent: true,
      noSilentJoin: true
    },

    telemetry: {
      activeMode: null,
      seenDevicesCount: 0,
      optInAttempts: 0,
      successfulJoins: 0,
      lastBroadcast: null,
      totalBroadcasts: 0
    },

    artery: {
      totalBroadcasts: 0,
      lastMode: null,
      lastPayloadSize: 0,
      lastSignalPower: "auto",
      lastIntervalProfile: "auto",
      loadBucket: "idle",
      pressureBucket: "none"
    },

    lastGlobalHints: null,

    // Attachments
    overmind: null,
    nodeAdmin: null,

    meshSnapshotProvider: null,
    worldCoreSnapshotProvider: null,
    routerSnapshotProvider: null,
    serverSnapshotProvider: null,
    continuanceSnapshotProvider: null,
    omniHostingSnapshotProvider: null,
    beaconPresenceProvider: null,
    oneBandSnapshotProvider: null,
    distanceSnapshotProvider: null,
    hiveMeshSnapshotProvider: null,

    userContext: null,

    // Config
    oneBandId: "PULSE-ONEBAND",
    distanceModel: "distance-tier-symbolic",
    safetyPolicy: null,
    trace: false,

    // Constants
    Modes: null,
    PayloadProfiles: null,
    SignalLimits: null
  };

  // ------------------------------------------------------------
  // INIT
  // ------------------------------------------------------------
  const init = ({
    engineID = null,
    regionID = null,
    boundCastleID = null,
    trace = false,
    safetyPolicy = null,
    globalHints = null,
    oneBandId = "PULSE-ONEBAND",
    distanceModel = "distance-tier-symbolic"
  } = {}) => {

    lane.identity = Object.freeze({
      engineID: engineID || stableHash(`engine-${regionID || "global"}`),
      regionID,
      boundCastleID,
      createdBy: "PulseExpansion-v30-OneBand-Hive"
    });

    lane.activeMode = "discovery";
    lane.tick = 0;

    lane.lastGlobalHints = globalHints || null;
    lane.oneBandId = oneBandId;
    lane.distanceModel = distanceModel;
    lane.safetyPolicy = safetyPolicy;
    lane.trace = trace;

    // Constants
    lane.Modes = Object.freeze({
      baseline: {
        discovery: { powerProfile: "high", intervalProfile: "frequent" },
        presence: { powerProfile: "low", intervalProfile: "steady" }
      },
      adaptive: {
        autoSwitchEnabled: true,
        densityAware: true,
        demandAware: true,
        regionTypeAware: true
      },
      organism: {
        "pulse-reach": { powerProfile: "high", intervalProfile: "steady" },
        "pulse-storm": { powerProfile: "high", intervalProfile: "frequent" },
        "PULSE-MESH": { powerProfile: "medium", intervalProfile: "steady" },
        "pulse-expand": { powerProfile: "medium", intervalProfile: "auto" },
        "pulse-immortal": { powerProfile: "medium", intervalProfile: "steady" },
        "hive": { powerProfile: "medium", intervalProfile: "steady" }
      },
      defaults: { initialMode: "discovery" }
    });

    lane.PayloadProfiles = Object.freeze({
      newUserProfile: { showOnboardingHint: true, showFirstTimeTag: true },
      knownUserProfile: { showFastPathHint: true, showWelcomeBackTag: true }
    });

    lane.SignalLimits = Object.freeze({
      maxPowerProfile: "high",
      minIntervalProfile: "sane"
    });
  };

  // ------------------------------------------------------------
  // LOGGING
  // ------------------------------------------------------------
  const log = (...args) => {
    if (lane.trace) console.log("[PulseBeaconEngine]", ...args);
  };

  // ------------------------------------------------------------
  // ATTACHMENT SURFACES
  // ------------------------------------------------------------
  const attachMeshSnapshotProvider = (fn) => {
    lane.meshSnapshotProvider = typeof fn === "function" ? fn : null;
    return { ok: true };
  };

  const attachWorldCoreSnapshotProvider = (fn) => {
    lane.worldCoreSnapshotProvider = typeof fn === "function" ? fn : null;
    return { ok: true };
  };

  const attachRouterSnapshotProvider = (fn) => {
    lane.routerSnapshotProvider = typeof fn === "function" ? fn : null;
    return { ok: true };
  };

  const attachServerSnapshotProvider = (fn) => {
    lane.serverSnapshotProvider = typeof fn === "function" ? fn : null;
    return { ok: true };
  };

  const attachContinuanceSnapshotProvider = (fn) => {
    lane.continuanceSnapshotProvider = typeof fn === "function" ? fn : null;
    return { ok: true };
  };

  const attachOmniHostingSnapshotProvider = (fn) => {
    lane.omniHostingSnapshotProvider = typeof fn === "function" ? fn : null;
    return { ok: true };
  };

  const attachBeaconPresenceProvider = (fn) => {
    lane.beaconPresenceProvider = typeof fn === "function" ? fn : null;
    return { ok: true };
  };

  const attachOneBandSnapshotProvider = (fn) => {
    lane.oneBandSnapshotProvider = typeof fn === "function" ? fn : null;
    return { ok: true };
  };

  const attachDistanceSnapshotProvider = (fn) => {
    lane.distanceSnapshotProvider = typeof fn === "function" ? fn : null;
    return { ok: true };
  };

  const attachHiveMeshSnapshotProvider = (fn) => {
    lane.hiveMeshSnapshotProvider = typeof fn === "function" ? fn : null;
    return { ok: true };
  };

  const attachUserContext = (ctx) => {
    lane.userContext = ctx || null;
    return { ok: true, userContext: lane.userContext };
  };

  const attachOvermind = (o) => {
    lane.overmind = o || null;
    return { ok: true };
  };

  const attachNodeAdmin = (n) => {
    lane.nodeAdmin = n || null;
    return { ok: true };
  };

  // ------------------------------------------------------------
  // SAFE READER
  // ------------------------------------------------------------
  const safeCall = (provider) => {
    if (!provider || typeof provider !== "function") return null;
    try { return provider() || null; }
    catch { return null; }
  };

  // ------------------------------------------------------------
  // MODE ENGINE
  // ------------------------------------------------------------
  const setMode = (nextMode) => {
    const known =
      lane.Modes.baseline[nextMode] ||
      lane.Modes.organism[nextMode] ||
      (nextMode === "adaptive" ? lane.Modes.adaptive : null);

    if (!known) return { ok: false, reason: "unknown-mode" };

    lane.activeMode = nextMode;
    log("Mode set:", nextMode);
    return { ok: true, mode: nextMode };
  };

  const getMode = () => lane.activeMode;

  // ------------------------------------------------------------
  // PAYLOAD ENGINE
  // ------------------------------------------------------------
  const updatePayloadFromContext = (ctx = {}) => {
    Object.assign(lane.payloadState, ctx);
    return { ok: true, payloadState: { ...lane.payloadState } };
  };

  const buildPayload = () => {
    // Placeholder — user will paste their full logic here
    return {};
  };

  // ------------------------------------------------------------
  // SIGNAL ENGINE
  // ------------------------------------------------------------
  const computeSignalProfile = (opts = {}) => {
    // Placeholder — user will paste their full logic here
    return {};
  };

  // ------------------------------------------------------------
  // SAFETY FRAME
  // ------------------------------------------------------------
  const checkSafety = (payload, signalProfile) => {
    if (!lane.safetyPolicy) return { allowed: true };
    try {
      return lane.safetyPolicy({
        mode: lane.activeMode,
        payload,
        signalProfile
      });
    } catch {
      return { allowed: false, reason: "safety-policy-error" };
    }
  };

  // ------------------------------------------------------------
  // BROADCAST ENGINE
  // ------------------------------------------------------------
  const broadcast = () => {
    const payload = buildPayload();
    const profile = computeSignalProfile();

    const safe = checkSafety(payload, profile);
    if (!safe.allowed) return { ok: false, reason: safe.reason };

    lane.telemetry.totalBroadcasts++;
    lane.artery.totalBroadcasts++;

    return {
      ok: true,
      payload,
      profile
    };
  };

  // ------------------------------------------------------------
  // SNAPSHOT
  // ------------------------------------------------------------
  const getStateSnapshot = () => {
    return Object.freeze({
      identity: lane.identity,
      mode: lane.activeMode,
      payloadState: { ...lane.payloadState },
      signalState: { ...lane.signalState },
      telemetry: { ...lane.telemetry },
      artery: { ...lane.artery }
    });
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    init,
    log,

    // Attachments
    attachMeshSnapshotProvider,
    attachWorldCoreSnapshotProvider,
    attachRouterSnapshotProvider,
    attachServerSnapshotProvider,
    attachContinuanceSnapshotProvider,
    attachOmniHostingSnapshotProvider,
    attachBeaconPresenceProvider,
    attachOneBandSnapshotProvider,
    attachDistanceSnapshotProvider,
    attachHiveMeshSnapshotProvider,
    attachUserContext,
    attachOvermind,
    attachNodeAdmin,

    // Engines
    setMode,
    getMode,
    updatePayloadFromContext,
    buildPayload,
    computeSignalProfile,
    checkSafety,
    broadcast,

    // Snapshot
    getStateSnapshot
  };

})();

// ============================================================================
// CONTEXT — PulseBeaconEngineContext v31 IMMORTAL ONEBAND
// ============================================================================
export function getBeaconEngineContext(engine, extra = {}) {
  if (!engine) {
    return { ok: false, error: "No PulseBeaconEngine instance provided." };
  }

  // ------------------------------------------------------------
  // IDENTITY
  // ------------------------------------------------------------
  const identity = engine.identity || null;

  // ------------------------------------------------------------
  // INTERNAL STATE
  // ------------------------------------------------------------
  const mode = engine.activeMode || null;
  const tick = engine.tick || 0;

  const payloadState = engine.payloadState
    ? { ...engine.payloadState }
    : null;

  const signalState = engine.signalState
    ? { ...engine.signalState }
    : null;

  const telemetry = engine.telemetry
    ? { ...engine.telemetry }
    : null;

  const artery = engine.artery
    ? { ...engine.artery }
    : null;

  const lastGlobalHints = engine.lastGlobalHints || null;

  // ------------------------------------------------------------
  // ATTACHMENTS (providers + organ links)
  // ------------------------------------------------------------
  const overmind = engine.overmind || null;
  const nodeAdmin = engine.nodeAdmin || null;

  const meshSnapshot =
    engine.safeCall(engine.meshSnapshotProvider) || null;

  const worldCoreSnapshot =
    engine.safeCall(engine.worldCoreSnapshotProvider) || null;

  const routerSnapshot =
    engine.safeCall(engine.routerSnapshotProvider) || null;

  const serverSnapshot =
    engine.safeCall(engine.serverSnapshotProvider) || null;

  const continuanceSnapshot =
    engine.safeCall(engine.continuanceSnapshotProvider) || null;

  const omniHostingSnapshot =
    engine.safeCall(engine.omniHostingSnapshotProvider) || null;

  const beaconPresenceSnapshot =
    engine.safeCall(engine.beaconPresenceProvider) || null;

  const oneBandSnapshot =
    engine.safeCall(engine.oneBandSnapshotProvider) || null;

  const distanceSnapshot =
    engine.safeCall(engine.distanceSnapshotProvider) || null;

  const hiveMeshSnapshot =
    engine.safeCall(engine.hiveMeshSnapshotProvider) || null;

  const userContext = engine.userContext || null;

  // ------------------------------------------------------------
  // CONSTANTS (Modes, PayloadProfiles, SignalLimits)
  // ------------------------------------------------------------
  const modes = engine.Modes || null;
  const payloadProfiles = engine.PayloadProfiles || null;
  const signalLimits = engine.SignalLimits || null;

  // ------------------------------------------------------------
  // FINAL CONTEXT OBJECT
  // ------------------------------------------------------------
  return {
    ok: true,
    version: "v31-IMMORTAL-BEACON-ONEBAND",

    // Identity
    identity,
    mode,
    tick,

    // Internal state
    payloadState,
    signalState,
    telemetry,
    artery,
    lastGlobalHints,

    // Attachments + snapshots
    overmind,
    nodeAdmin,
    meshSnapshot,
    worldCoreSnapshot,
    routerSnapshot,
    serverSnapshot,
    continuanceSnapshot,
    omniHostingSnapshot,
    beaconPresenceSnapshot,
    oneBandSnapshot,
    distanceSnapshot,
    hiveMeshSnapshot,
    userContext,

    // Constants
    modes,
    payloadProfiles,
    signalLimits,

    // Extra injection
    ...extra
  };
}

PulseRealm.ExpansionBeaconEngine = {
  getBeaconEngineContext,
  PulseBeaconEngine,
  createPulseBeaconEngine,
  PulseBeaconMeta,
  PulseExpansionMultiInstanceGovernor
}