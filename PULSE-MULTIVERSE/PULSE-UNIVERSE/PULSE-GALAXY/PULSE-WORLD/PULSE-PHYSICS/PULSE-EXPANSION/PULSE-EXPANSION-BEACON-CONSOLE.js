/** ============================================================================
 *  PULSE-WORLD : PulseBeaconConsole-v30-OneBand-Hive.js
 *  ROLE: Global expansion console + Overmind control surface
 *  VERSION: v30-OneBand-Hive (AIWorld + Mesh30+ + OneBand + HiveMesh + BeaconPresence)
 * ============================================================================
 *
 *  PURPOSE:
 *    Overmind-facing "brain" of PulseWorld expansion.
 *    Controls global hints, modes, payload shaping, and expansion pulses.
 *
 *    It consumes (BeaconEngine v30-OneBand-Hive, symbolic only):
 *      - beacon.getStateSnapshot()
 *      - beacon.getTelemetry()
 *      - beacon.getGlobalHints()
 *      - beacon.setGlobalHints()
 *      - beacon.updatePayloadFromContext()
 *      - beacon.broadcastOnce()
 *      - beacon.buildPresenceField()
 *      - beacon.buildAdvantageField()
 *      - beacon.buildHintsField()
 *      - beacon.buildBandField()              // includes OneBand field
 *      - beacon.buildChunkPrewarmField()
 *      - beacon.buildBeaconPresenceField()
 *      - beacon.buildImmortalField()          // includes Hive + artery
 *      - beacon.buildContinuanceField()
 *      - beacon.buildCIField()
 *      - beacon.buildBinaryDeltaField()
 *      - beacon.buildOmniHostingField()
 *      - beacon.buildDistanceField()          // NEW v30
 *      - beacon.buildOneBandField()           // NEW v30 (any band == PulseBand)
 *      - beacon.buildHiveField()              // NEW v30 (hive mentality)
 *
 *    It produces (symbolic only):
 *      - global organism hints (fallback/chunk/cache/prewarm/advantage/presence/world/continuance/CI/binaryDelta)
 *      - civilization-tier hints
 *      - town-type hints
 *      - cost-band hints
 *      - OneBand / PulseBand hints (any band on our mesh == PulseBand)
 *      - hiveMesh / hive-role hints
 *      - mode changes (including hive mode)
 *      - payload updates
 *      - expansion pulses
 *      - region-scoped hint updates
 *      - band / advantage / prewarm / continuance / CI / world-core oriented directives
 *
 *  CONTRACT:
 *    - Never compute signal physics.
 *    - Never compute presence/advantage/band/chunk/continuance/CI/binaryDelta fields itPulseRealm.
 *    - Never mutate engine internals.
 *    - Only call Beacon Engine APIs and symbolically merge fields.
 *    - Always deterministic.
 *    - Pure symbolic Overmind surface.
 * ============================================================================ */

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




export const PulseBeaconConsoleMeta = {
  organId: "PulseBeaconConsole-v30-OneBand-Hive",
  version: "v30-OneBand-Hive",
  role: "OVERMIND_CONSOLE"
};

// ============================================================================
// HELPERS
// ============================================================================
function clamp01(x) {
  if (x == null || Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

function stableHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 1000003;
  }
  return `bc${h}`;
}

// Console artery metrics
const _consoleArtery = {
  totalOps: 0,
  hintsOps: 0,
  modeOps: 0,
  payloadOps: 0,
  pulseOps: 0,
  directiveOps: 0,
  worldOps: 0,
  continuanceOps: 0,
  ciOps: 0,
  lastOpKind: null
};

function _bump(kind) {
  _consoleArtery.totalOps++;
  if (kind === "hints") _consoleArtery.hintsOps++;
  if (kind === "mode") _consoleArtery.modeOps++;
  if (kind === "payload") _consoleArtery.payloadOps++;
  if (kind === "pulse") _consoleArtery.pulseOps++;
  if (kind === "directive") _consoleArtery.directiveOps++;
  if (kind === "world") _consoleArtery.worldOps++;
  if (kind === "continuance") _consoleArtery.continuanceOps++;
  if (kind === "ci") _consoleArtery.ciOps++;
  _consoleArtery.lastOpKind = kind;
}

export function getBeaconConsoleArterySnapshot() {
  const total = Math.max(1, _consoleArtery.totalOps || 1);
  const load = clamp01(total / 16384);

  const loadBucket =
    load >= 0.9 ? "saturated" :
    load >= 0.7 ? "high" :
    load >= 0.4 ? "medium" :
    load > 0 ? "low" : "idle";

  return Object.freeze({
    ..._consoleArtery,
    load,
    loadBucket
  });
}

// ============================================================================
// GLOBAL HINT MERGING (v30 OneBand/Hive)
// ============================================================================
function mergeHints(prev = {}, patch = {}) {
  return {
    ...prev,

    presenceContext: {
      ...(prev.presenceContext || {}),
      ...(patch.presenceContext || {})
    },

    advantageContext: {
      ...(prev.advantageContext || {}),
      ...(patch.advantageContext || {})
    },

    fallbackContext: {
      ...(prev.fallbackContext || {}),
      ...(patch.fallbackContext || {})
    },

    chunkHints: {
      ...(prev.chunkHints || {}),
      ...(patch.chunkHints || {})
    },

    cacheHints: {
      ...(prev.cacheHints || {}),
      ...(patch.cacheHints || {})
    },

    prewarmHints: {
      ...(prev.prewarmHints || {}),
      ...(patch.prewarmHints || {})
    },

    regionChunkPlan: {
      ...(prev.regionChunkPlan || {}),
      ...(patch.regionChunkPlan || {})
    },

    regionHints: {
      ...(prev.regionHints || {}),
      ...(patch.regionHints || {})
    },

    // civilization + town + cost
    civilizationHints: {
      ...(prev.civilizationHints || {}),
      ...(patch.civilizationHints || {})
    },

    townHints: {
      ...(prev.townHints || {}),
      ...(patch.townHints || {})
    },

    costHints: {
      ...(prev.costHints || {}),
      ...(patch.costHints || {})
    },

    // OneBand / PulseBand / Hive overlays (symbolic)
    oneBandHints: {
      ...(prev.oneBandHints || {}),
      ...(patch.oneBandHints || {})
    },

    hiveHints: {
      ...(prev.hiveHints || {}),
      ...(patch.hiveHints || {})
    },

    // v20+ overlays
    continuanceHint: {
      ...(prev.continuanceHint || {}),
      ...(patch.continuanceHint || {})
    },

    ciHint: {
      ...(prev.ciHint || {}),
      ...(patch.ciHint || {})
    },

    binaryDeltaHint: {
      ...(prev.binaryDeltaHint || {}),
      ...(patch.binaryDeltaHint || {})
    },

    worldAdvantage: {
      ...(prev.worldAdvantage || {}),
      ...(patch.worldAdvantage || {})
    },

    worldTruth: {
      ...(prev.worldTruth || {}),
      ...(patch.worldTruth || {})
    },

    consoleTags: {
      ...(prev.consoleTags || {}),
      ...(patch.consoleTags || {})
    },

    bandSignature:
      patch.bandSignature != null
        ? patch.bandSignature
        : prev.bandSignature,

    fallbackBandLevel:
      patch.fallbackBandLevel != null
        ? patch.fallbackBandLevel
        : prev.fallbackBandLevel
  };
}

// ============================================================================
// ORGAN: PulseBeaconConsole v30-OneBand-Hive
// ============================================================================
export function PulseBeaconConsole({ beacon }) {
  if (!beacon) throw new Error("PulseBeaconConsole requires a Beacon Engine instance");

  const identity = Object.freeze({
    consoleId: stableHash("PULSE_BEACON_CONSOLE_V30_ONEBAND_HIVE"),
    version: PulseBeaconConsoleMeta.version,
    role: PulseBeaconConsoleMeta.role
  });

  function _safe(target, method) {
    try {
      if (!target || typeof target[method] !== "function") return null;
      return target[method]();
    } catch {
      return null;
    }
  }

  return Object.freeze({
    meta: PulseBeaconConsoleMeta,
    identity,

    // v30 preferred
    getConsoleArterySnapshot: () => getBeaconConsoleArterySnapshot(),

    // legacy name
    getBeaconConsoleArterySnapshot: () => getBeaconConsoleArterySnapshot(),

    // SNAPSHOTS
    getSnapshot() {
      _bump("hints");
      return beacon.getStateSnapshot();
    },

    getTelemetry() {
      _bump("hints");
      return beacon.getTelemetry() || null;
    },

    // FIELDS (delegated)
    getPresenceField() {
      _bump("hints");
      return beacon.buildPresenceField();
    },

    getAdvantageField() {
      _bump("hints");
      return beacon.buildAdvantageField();
    },

    getHintsField() {
      _bump("hints");
      return beacon.buildHintsField();
    },

    getBandField() {
      _bump("hints");
      return beacon.buildBandField();
    },

    getChunkPrewarmField() {
      _bump("hints");
      return beacon.buildChunkPrewarmField();
    },

    getBeaconPresenceField() {
      _bump("hints");
      return beacon.buildBeaconPresenceField() || null;
    },

    // v30: distance / OneBand / Hive / Immortal overlays
    getDistanceField() {
      _bump("world");
      return _safe(beacon, "buildDistanceField");
    },

    getOneBandField() {
      _bump("world");
      // any band we run on is PulseBand in worldview
      return _safe(beacon, "buildOneBandField");
    },

    getHiveField() {
      _bump("world");
      return _safe(beacon, "buildHiveField");
    },

    getImmortalField() {
      _bump("world");
      return _safe(beacon, "buildImmortalField");
    },

    getContinuanceOverlayField() {
      _bump("continuance");
      return _safe(beacon, "buildContinuanceField");
    },

    getCIOverlayField() {
      _bump("ci");
      return _safe(beacon, "buildCIField");
    },

    getBinaryDeltaOverlayField() {
      _bump("hints");
      return _safe(beacon, "buildBinaryDeltaField");
    },

    getOmniHostingField() {
      _bump("world");
      return _safe(beacon, "buildOmniHostingField");
    },

    // GLOBAL HINTS
    setGlobalHints(h) {
      _bump("hints");
      return beacon.setGlobalHints(h);
    },

    getGlobalHints() {
      _bump("hints");
      return beacon.getGlobalHints();
    },

    mergeGlobalHints(patch = {}) {
      _bump("hints");
      const current = beacon.getGlobalHints() || {};
      const merged = mergeHints(current, patch);
      return beacon.setGlobalHints(merged);
    },

    // REGION HINTS
    setRegionScopedHints(regionId, patch = {}) {
      _bump("hints");
      const current = beacon.getGlobalHints() || {};
      const regionHints = { ...(current.regionHints || {}) };

      regionHints[regionId] = {
        ...(regionHints[regionId] || {}),
        ...patch
      };

      const merged = mergeHints(current, { regionHints });
      return beacon.setGlobalHints(merged);
    },

    // Civilization / Town / Cost hints
    setCivilizationHints(regionId, { civilizationTier, townType, costBand } = {}) {
      _bump("world");
      const current = beacon.getGlobalHints() || {};

      const civ = {
        ...(current.civilizationHints || {}),
        [regionId]: civilizationTier || "void"
      };

      const towns = {
        ...(current.townHints || {}),
        [regionId]: townType || "wilderness"
      };

      const costs = {
        ...(current.costHints || {}),
        [regionId]: costBand || "unknown"
      };

      const merged = mergeHints(current, {
        civilizationHints: civ,
        townHints: towns,
        costHints: costs
      });

      return beacon.setGlobalHints(merged);
    },

    // v30: OneBand / Hive hints (any band == PulseBand on our mesh)
    setOneBandHiveHints(regionId, {
      bandId = "PULSE-ONEBAND",
      physicalBandType = "unknown",
      hiveRole = "cell",
      hiveTier = "local",
      notes = []
    } = {}) {
      _bump("world");
      const current = beacon.getGlobalHints() || {};

      const oneBandHints = {
        ...(current.oneBandHints || {}),
        [regionId]: {
          bandId,
          physicalBandType,
          isOnPulseBand: true,
          notes
        }
      };

      const hiveHints = {
        ...(current.hiveHints || {}),
        [regionId]: {
          hiveRole,
          hiveTier,
          notes
        }
      };

      const merged = mergeHints(current, {
        oneBandHints,
        hiveHints
      });

      return beacon.setGlobalHints(merged);
    },

    // CONTINUANCE + WORLD OVERLAYS
    applyContinuanceAndWorldOverlays({
      continuanceRiskReport = null,
      omniHostingPlan = null,
      worldAdvantageContext = null,
      worldTruthVectors = null,
      ciOverlay = null,
      binaryDeltaOverlay = null,
      consoleTags = {}
    } = {}) {
      _bump("world");

      const patch = {};

      if (continuanceRiskReport) {
        patch.continuanceHint = {
          globalRisk: continuanceRiskReport.globalRisk,
          band: continuanceRiskReport.fallbackBandLevel,
          notes: Array.isArray(continuanceRiskReport.notes)
            ? continuanceRiskReport.notes.slice()
            : []
        };
        patch.fallbackBandLevel = continuanceRiskReport.fallbackBandLevel;
        patch.chunkHints = {
          ...(patch.chunkHints || {}),
          ...(continuanceRiskReport.chunkHint || {})
        };
        patch.cacheHints = {
          ...(patch.cacheHints || {}),
          ...(continuanceRiskReport.cacheHint || {})
        };
        patch.prewarmHints = {
          ...(patch.prewarmHints || {}),
          ...(continuanceRiskReport.prewarmHint || {})
        };
      }

      if (omniHostingPlan) {
        patch.presenceContext = {
          ...(patch.presenceContext || {}),
          ...(omniHostingPlan.presenceField || {})
        };
        patch.advantageContext = {
          ...(patch.advantageContext || {}),
          ...(omniHostingPlan.advantageField || {})
        };
        patch.fallbackBandLevel =
          omniHostingPlan.fallbackBandLevel ?? patch.fallbackBandLevel;
        patch.chunkHints = {
          ...(patch.chunkHints || {}),
          ...(omniHostingPlan.chunkHint || {})
        };
        patch.cacheHints = {
          ...(patch.cacheHints || {}),
          ...(omniHostingPlan.cacheHint || {})
        };
        patch.prewarmHints = {
          ...(patch.prewarmHints || {}),
          ...(omniHostingPlan.prewarmHint || {})
        };
      }

      if (worldAdvantageContext) {
        patch.worldAdvantage = {
          ...(patch.worldAdvantage || {}),
          ...(worldAdvantageContext.world || {})
        };
        patch.consoleTags = {
          ...(patch.consoleTags || {}),
          ...(worldAdvantageContext.tags || {})
        };
      }

      if (worldTruthVectors) {
        patch.worldTruth = {
          ...(patch.worldTruth || {}),
          loadVector: worldTruthVectors.loadVector || null,
          healthVector: worldTruthVectors.healthVector || null,
          densityVector: worldTruthVectors.densityVector || null,
          stressVector: worldTruthVectors.stressVector || null
        };
        patch.consoleTags = {
          ...(patch.consoleTags || {}),
          ...(worldTruthVectors.tags || {})
        };
      }

      if (ciOverlay) {
        patch.ciHint = {
          ...(patch.ciHint || {}),
          ...ciOverlay
        };
      }

      if (binaryDeltaOverlay) {
        patch.binaryDeltaHint = {
          ...(patch.binaryDeltaHint || {}),
          ...binaryDeltaOverlay
        };
      }

      if (consoleTags && Object.keys(consoleTags).length) {
        patch.consoleTags = (patch.consoleTags || {});
      }

      const current = beacon.getGlobalHints() || {};
      const merged = mergeHints(current, patch);
      return beacon.setGlobalHints(merged);
    },

    // MODE CONTROL
    setMode(mode) {
      _bump("mode");
      return beacon.setMode(mode);
    },

    setDiscoveryMode() { return this.setMode("discovery"); },
    setPresenceMode() { return this.setMode("presence"); },
    setAdaptiveMode() { return this.setMode("adaptive"); },
    setMeshMode() { return this.setMode("PULSE-MESH"); },
    setExpandMode() { return this.setMode("pulse-expand"); },
    setReachMode() { return this.setMode("pulse-reach"); },
    setStormMode() { return this.setMode("pulse-storm"); },
    setColdStartMode() { return this.setMode("pulse-coldstart"); },
    setAIWorldMode() { return this.setMode("pulse-aiworld"); },
    setHiveMode() { return this.setMode("hive"); }, // NEW v30 hive mentality

    // PAYLOAD CONTROL
    updatePayload(payloadUpdate) {
      _bump("payload");
      return beacon.updatePayloadFromContext(payloadUpdate);
    },

    updateRegionPayload(regionId, patch = {}) {
      _bump("payload");
      return beacon.updatePayloadFromContext({
        ...patch,
        regionTag: regionId
      });
    },

    // PULSES
    pulse(contextHints = {}) {
      _bump("pulse");
      return beacon.broadcastOnce(contextHints);
    },

    pulseDiscovery(ctx = {}) { this.setDiscoveryMode(); return this.pulse(ctx); },
    pulsePresence(ctx = {}) { this.setPresenceMode(); return this.pulse(ctx); },
    pulseAdaptive(ctx = {}) { this.setAdaptiveMode(); return this.pulse(ctx); },
    pulseMesh(ctx = {}) { this.setMeshMode(); return this.pulse(ctx); },
    pulseExpand(ctx = {}) { this.setExpandMode(); return this.pulse(ctx); },
    pulseReach(ctx = {}) { this.setReachMode(); return this.pulse(ctx); },
    pulseStorm(ctx = {}) { this.setStormMode(); return this.pulse(ctx); },
    pulseColdStart(ctx = {}) { this.setColdStartMode(); return this.pulse(ctx); },
    pulseAIWorld(ctx = {}) { this.setAIWorldMode(); return this.pulse(ctx); },

    // NEW: hive pulse (organism-first)
    pulseHive(ctx = {}) {
      _bump("pulse");
      this.setHiveMode();
      return this.pulse(ctx);
    },

    pulseRegion(
      regionId,
      {
        densityHint = "medium",
        demandHint = "medium",
        regionType = "venue",
        meshStatus = "unknown",
        worldTag = null
      } = {}
    ) {
      _bump("pulse");
      return beacon.broadcastOnce({
        densityHint,
        demandHint,
        regionType,
        meshStatus,
        regionId,
        worldTag
      });
    },

    pulseCivilization(
      regionId,
      {
        civilizationTier = "outpost",
        townType = "wilderness",
        costBand = "unknown",
        contextHints = {}
      } = {}
    ) {
      _bump("pulse");

      const current = beacon.getGlobalHints() || {};
      const merged = mergeHints(current, {
        civilizationHints: {
          ...(current.civilizationHints || {}),
          [regionId]: civilizationTier
        },
        townHints: {
          ...(current.townHints || {}),
          [regionId]: townType
        },
        costHints: {
          ...(current.costHints || {}),
          [regionId]: costBand
        }
      });

      beacon.setGlobalHints(merged);

      return beacon.broadcastOnce({
        ...contextHints,
        regionId,
        civilizationTier,
        townType,
        costBand
      });
    },

    // v30: pulse with OneBand/Hive overlays
    pulseOneBandHive(
      regionId,
      {
        bandId = "PULSE-ONEBAND",
        physicalBandType = "unknown",
        hiveRole = "cell",
        hiveTier = "local",
        contextHints = {}
      } = {}
    ) {
      _bump("pulse");

      this.setOneBandHiveHints(regionId, {
        bandId,
        physicalBandType,
        hiveRole,
        hiveTier
      });

      this.setHiveMode();

      return beacon.broadcastOnce({
        ...contextHints,
        regionId,
        bandId,
        physicalBandType,
        hiveRole,
        hiveTier
      });
    },

    // v20+: pulse with overlays
    pulseWithOverlays({
      mode = null,
      contextHints = {},
      continuanceRiskReport = null,
      omniHostingPlan = null,
      worldAdvantageContext = null,
      worldTruthVectors = null,
      ciOverlay = null,
      binaryDeltaOverlay = null
    } = {}) {
      _bump("pulse");

      if (mode) beacon.setMode(mode);

      this.applyContinuanceAndWorldOverlays({
        continuanceRiskReport,
        omniHostingPlan,
        worldAdvantageContext,
        worldTruthVectors,
        ciOverlay,
        binaryDeltaOverlay
      });

      return beacon.broadcastOnce(contextHints);
    },

    // ------------------------------------------------------------------------
    // DIRECTIVES
    // ------------------------------------------------------------------------
    directive(directive) {
      _bump("directive");
      return beacon.applyDirective(directive);
    },

    regionDirective(
      regionId,
      {
        mode = null,
        payloadUpdate = {},
        globalHintsPatch = {},
        broadcastNow = false,
        contextHints = {}
      } = {}
    ) {
      _bump("directive");

      const patchedPayload = {
        ...payloadUpdate,
        regionTag: regionId
      };

      const current = beacon.getGlobalHints() || {};
      const mergedHints =
        Object.keys(globalHintsPatch).length > 0
          ? mergeHints(current, {
              ...globalHintsPatch,
              regionHints: {
                ...(current.regionHints || {}),
                [regionId]: {
                  ...((current.regionHints || {})[regionId] || {}),
                  ...(globalHintsPatch.regionHints || {})
                }
              }
            })
          : undefined;

      const directive = {
        mode,
        payloadUpdate: patchedPayload,
        globalHints: mergedHints,
        broadcastNow,
        contextHints: {
          ...contextHints,
          regionId
        }
      };

      return beacon.applyDirective(directive);
    },

    regionCivilizationDirective(
      regionId,
      {
        mode = null,
        payloadUpdate = {},
        civilizationTier = null,
        townType = null,
        costBand = null,
        globalHintsPatch = {},
        broadcastNow = false,
        contextHints = {}
      } = {}
    ) {
      _bump("world");

      const current = beacon.getGlobalHints() || {};

      const civPatch = {};
      if (civilizationTier != null) {
        civPatch.civilizationHints = {
          ...(current.civilizationHints || {}),
          [regionId]: civilizationTier
        };
      }
      if (townType != null) {
        civPatch.townHints = {
          ...(current.townHints || {}),
          [regionId]: townType
        };
      }
      if (costBand != null) {
        civPatch.costHints = {
          ...(current.costHints || {}),
          [regionId]: costBand
        };
      }

      const mergedHints = mergeHints(current, {
        ...globalHintsPatch,
        ...civPatch
      });

      const directive = {
        mode,
        payloadUpdate: {
          ...payloadUpdate,
          regionTag: regionId
        },
        globalHints: mergedHints,
        broadcastNow,
        contextHints: {
          ...contextHints,
          regionId,
          civilizationTier,
          townType,
          costBand
        }
      };

      return beacon.applyDirective(directive);
    },

    regionContinuanceDirective(
      regionId,
      {
        mode = null,
        payloadUpdate = {},
        continuanceRiskReport = null,
        globalHintsPatch = {},
        broadcastNow = false,
        contextHints = {}
      } = {}
    ) {
      _bump("continuance");

      const current = beacon.getGlobalHints() || {};

      const continuancePatch = continuanceRiskReport
        ? {
            continuanceHint: {
              globalRisk: continuanceRiskReport.globalRisk,
              band: continuanceRiskReport.fallbackBandLevel,
              notes: Array.isArray(continuanceRiskReport.notes)
                ? continuanceRiskReport.notes.slice()
                : []
            },
            fallbackBandLevel:
              continuanceRiskReport.fallbackBandLevel ??
              current.fallbackBandLevel
          }
        : {};

      const mergedHints = mergeHints(current, {
        ...globalHintsPatch,
        ...continuancePatch
      });

      const directive = {
        mode,
        payloadUpdate: {
          ...payloadUpdate,
          regionTag: regionId
        },
        globalHints: mergedHints,
        broadcastNow,
        contextHints: {
          ...contextHints,
          regionId
        }
      };

      return beacon.applyDirective(directive);
    }
  });
}

export default PulseBeaconConsole;
// ============================================================================
// CONTEXT — PulseBeaconConsoleContext v31 IMMORTAL ONEBAND
// ============================================================================
export function getPulseBeaconConsoleContext(consoleInstance, extra = {}) {
  if (!consoleInstance) {
    return { ok: false, error: "No PulseBeaconConsole instance provided." };
  }

  const beacon = consoleInstance.meta.beacon || consoleInstance.beacon || null;

  // ------------------------------------------------------------
  // IDENTITY + META
  // ------------------------------------------------------------
  const identity = consoleInstance.identity || null;
  const meta = consoleInstance.meta || null;

  // ------------------------------------------------------------
  // SNAPSHOTS (delegated to beacon)
  // ------------------------------------------------------------
  const snapshot =
    typeof consoleInstance.getSnapshot === "function"
      ? consoleInstance.getSnapshot()
      : null;

  const telemetry =
    typeof consoleInstance.getTelemetry === "function"
      ? consoleInstance.getTelemetry()
      : null;

  const presenceField =
    typeof consoleInstance.getPresenceField === "function"
      ? consoleInstance.getPresenceField()
      : null;

  const advantageField =
    typeof consoleInstance.getAdvantageField === "function"
      ? consoleInstance.getAdvantageField()
      : null;

  const hintsField =
    typeof consoleInstance.getHintsField === "function"
      ? consoleInstance.getHintsField()
      : null;

  const bandField =
    typeof consoleInstance.getBandField === "function"
      ? consoleInstance.getBandField()
      : null;

  const chunkPrewarmField =
    typeof consoleInstance.getChunkPrewarmField === "function"
      ? consoleInstance.getChunkPrewarmField()
      : null;

  const beaconPresenceField =
    typeof consoleInstance.getBeaconPresenceField === "function"
      ? consoleInstance.getBeaconPresenceField()
      : null;

  // ------------------------------------------------------------
  // ONEBAND / HIVE / IMMORTAL / DISTANCE OVERLAYS
  // ------------------------------------------------------------
  const distanceField =
    typeof consoleInstance.getDistanceField === "function"
      ? consoleInstance.getDistanceField()
      : null;

  const oneBandField =
    typeof consoleInstance.getOneBandField === "function"
      ? consoleInstance.getOneBandField()
      : null;

  const hiveField =
    typeof consoleInstance.getHiveField === "function"
      ? consoleInstance.getHiveField()
      : null;

  const immortalField =
    typeof consoleInstance.getImmortalField === "function"
      ? consoleInstance.getImmortalField()
      : null;

  const continuanceOverlayField =
    typeof consoleInstance.getContinuanceOverlayField === "function"
      ? consoleInstance.getContinuanceOverlayField()
      : null;

  const ciOverlayField =
    typeof consoleInstance.getCIOverlayField === "function"
      ? consoleInstance.getCIOverlayField()
      : null;

  const binaryDeltaOverlayField =
    typeof consoleInstance.getBinaryDeltaOverlayField === "function"
      ? consoleInstance.getBinaryDeltaOverlayField()
      : null;

  const omniHostingField =
    typeof consoleInstance.getOmniHostingField === "function"
      ? consoleInstance.getOmniHostingField()
      : null;

  // ------------------------------------------------------------
  // GLOBAL HINTS
  // ------------------------------------------------------------
  const globalHints =
    typeof consoleInstance.getGlobalHints === "function"
      ? consoleInstance.getGlobalHints()
      : null;

  // ------------------------------------------------------------
  // FINAL CONTEXT OBJECT
  // ------------------------------------------------------------
  return {
    ok: true,
    version: "v31-IMMORTAL-BEACON-CONSOLE-ONEBAND",

    // Identity + meta
    identity,
    meta,

    // Beacon reference
    beacon,

    // Core snapshots
    snapshot,
    telemetry,
    presenceField,
    advantageField,
    hintsField,
    bandField,
    chunkPrewarmField,
    beaconPresenceField,

    // Overlays
    distanceField,
    oneBandField,
    hiveField,
    immortalField,
    continuanceOverlayField,
    ciOverlayField,
    binaryDeltaOverlayField,
    omniHostingField,

    // Global hints
    globalHints,

    // Extra injection
    ...extra
  };
}

PulseRealm.ExpansionBeaconConsole = {
  getPulseBeaconConsoleContext,
  PulseBeaconConsole,
  PulseBeaconConsoleMeta
}