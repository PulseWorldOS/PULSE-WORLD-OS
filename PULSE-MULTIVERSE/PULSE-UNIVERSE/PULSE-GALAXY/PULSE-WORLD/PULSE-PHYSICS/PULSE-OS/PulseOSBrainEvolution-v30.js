// ============================================================================
// FILE: /PulseOS/Brain/PulseOSEvolution-v30-Immortal-CoreMemory.js
// PULSE OS — v30-Immortal-DUALBAND-PulseBand-MeshBand-Artery
// “THE EVOLUTION ENGINE — ORGANISM-WIDE CNS/PNS/SPINE GROWTH + DRIFT INTELLIGENCE”
// CoreMemory-integrated • Immortal Drift/Lineage • BandFamily-aware
// Cache/Prewarm/Artery-aware • Chunk/Presence/Advantage/Topology-aware
// v30 SDN/OrganismMesh aligned • PulseBand + MeshBand lineage
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

import { PulseCoreGMemory } from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";
// Cortex is ONLY imported here — NOT in Brain
import { createPulseOSCortex } from "./PulseOSBrainCortex-v30.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




const CORE_MEMORY_NAMESPACE = "PulseOSBrainEvolution-v30";

// v30: explicit role tag for introspection
const PulseRole = "EVOLUTION-ENGINE";

// ============================================================================
//  DETERMINISTIC HELPERS (no Date, no randomness)
// ============================================================================

function stableStringify(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) {
    return "[" + value.map(stableStringify).join(",") + "]";
  }
  const keys = Object.keys(value).sort();
  return (
    "{" +
    keys.map((k) => JSON.stringify(k) + ":" + stableStringify(value[k])).join(",") +
    "}"
  );
}

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 1000000007;
  }
  return `h${h}`;
}

function normalizeBand(band) {
  const b = String(band || "dual").toLowerCase();
  return b === "binary" || b === "symbolic" || b === "dual" ? b : "dual";
}

const BAND_FAMILY = {
  PULSEBAND: "PulseBand",
  MESHBAND: "meshband"
};

function normalizeBandFamily(family) {
  const f = String(family || BAND_FAMILY.PULSEBAND).toLowerCase();
  return f === BAND_FAMILY.MESHBAND ? BAND_FAMILY.MESHBAND : BAND_FAMILY.PULSEBAND;
}

// v30: cacheChunk + prewarm + artery surfaces for evolution scans
function buildCacheChunkSurface({ intent, organism, iq, band, bandFamily }) {
  const shape = {
    intent: intent || "NO_INTENT",
    organs: organism ? Object.keys(organism) : [],
    iqKeys: iq ? Object.keys(iq) : [],
    band: normalizeBand(band),
    bandFamily: normalizeBandFamily(bandFamily),
    // v30: include route + gpu profiles for more precise cache keys
    chunkProfiles: iq.chunkingProfiles
      ? {
          hasDefault: !!iq.chunkingProfiles.default,
          routeCount: Object.keys(iq.chunkingProfiles.routes || {}).length,
          gpuCount: Object.keys(iq.chunkingProfiles.gpu || {}).length
        }
      : null
  };
  const serialized = stableStringify(shape);
  const cacheChunkKey = "evolution-cache::" + computeHash(serialized);
  return {
    cacheChunkKey,
    cacheChunkSignature: computeHash(cacheChunkKey),
    band: normalizeBand(band),
    bandFamily: normalizeBandFamily(bandFamily)
  };
}

function buildPrewarmSurface({ iq, band, bandFamily }) {
  const profiles = iq.chunkingProfiles || {};
  const hasCortexPrewarm = !!profiles.default || !!profiles.routes;

  let level = "none";
  const normBand = normalizeBand(band);
  if (hasCortexPrewarm && normBand === "binary") level = "aggressive";
  else if (hasCortexPrewarm && normBand === "dual") level = "medium";
  else if (hasCortexPrewarm) level = "light";

  const raw = stableStringify({
    hasCortexPrewarm,
    band: normBand,
    bandFamily: normalizeBandFamily(bandFamily),
    // v30: presence + mesh awareness baked into prewarm signature
    presenceEnabled: !!iq.presenceConfig.enabled,
    meshTopology: iq.meshPresenceConfig.topology || "none"
  });

  const prewarmKey = "evolution-prewarm::" + computeHash(raw);

  return {
    level,
    prewarmKey,
    band: normBand,
    bandFamily: normalizeBandFamily(bandFamily)
  };
}

// v30: artery load surface for Brain.CNSArtery / PNS / Spine bootstrap
function buildArteryLoadSurface({ iq, organism, band, bandFamily }) {
  const adv = iq.advantageField || {};
  const presenceConfig = iq.presenceConfig || {};
  const meshConfig = iq.meshPresenceConfig || {};
  const topo = iq.pulseTopology || {};

  const organCount = organism ? Object.keys(organism).length : 0;

  // deterministic, bounded 0..1 hints
  const presenceLoad = presenceConfig.enabled ? 0.45 : 0.1;
  const meshLoad = meshConfig.enabled ? 0.55 : 0.15;
  const advantageLoad =
    typeof adv.score === "number"
      ? Math.min(Math.max(Math.abs(adv.score), 0), 1)
      : 0.35;
  const topologyLoad =
    topo.momHeart || topo.dadHeart || topo.earnHeart ? 0.45 : 0.15;
  const cortexLoad =
    organCount > 0 ? Math.min(0.25 + organCount * 0.01, 0.85) : 0.25;

  const dualBandLoad = 0.7; // v30: dual-band primary
  const binaryOverlayLoad = 0.35; // v30: binary overlay stronger but still secondary
  const worldLensLoad = 0.25; // Brain is not internet center; keep modest
  const organismMeshLoad = meshConfig.enabled ? 0.55 : 0.25;

  const normBand = normalizeBand(band);
  const normFamily = normalizeBandFamily(bandFamily);

  return {
    cortexLoad,
    meshLoad,
    presenceLoad,
    advantageLoad,
    worldLensLoad,
    topologyLoad,
    organismMeshLoad,
    dualBandLoad,
    binaryOverlayLoad,
    band: normBand,
    bandFamily: normFamily
  };
}

// ============================================================================
//  CORE MEMORY INTEGRATION — immortal drift/lineage/health
// ============================================================================

function coreMemoryRecord(key, payload) {
  if (!key) return;
  try {
    if (PulseCoreGMemory && typeof PulseCoreGMemory.record === "function") {
      PulseCoreGMemory.record(CORE_MEMORY_NAMESPACE, key, payload);
    }
  } catch {
    // fail-open
  }
}

function coreMemoryRecall(key) {
  if (!key) return null;
  try {
    if (PulseCoreGMemory && typeof PulseCoreGMemory.recall === "function") {
      return PulseCoreGMemory.recall(CORE_MEMORY_NAMESPACE, key) || null;
    }
  } catch {
    // fail-open
  }
  return null;
}

function buildDriftStateKey(intent) {
  return `DRIFT_STATE::${String(intent || "NO_INTENT")}`;
}

function buildLineageKey(intent) {
  return `LINEAGE::${String(intent || "NO_INTENT")}`;
}

function buildOrganHealthKey(intent) {
  return `ORGAN_HEALTH::${String(intent || "NO_INTENT")}`;
}

function buildOrganismHealthKey(intent) {
  return `ORGANISM_HEALTH::${String(intent || "NO_INTENT")}`;
}

function buildArteryLoadKey(intent) {
  return `ARTERY_LOAD::${String(intent || "NO_INTENT")}`;
}

export function bootMemoryCore() {
  return PulseCoreGMemory;
}

// ============================================================================
//  EVOLUTION ENGINE — v30-Immortal-COREMEMORY
// ============================================================================

export function PulseOSEvolution({
  intent,
  organism,
  iq,
  understanding,
  // v30: optional band context for initial seeding
  band = "dual",
  bandFamily = "PulseBand",
  dnaTag = null,
  meshTag = null
} = {}) {
  let seq = 0;
  const nextSeq = () => ++seq;

  // --------------------------------------------------------------------------
  // Presence + chunking metadata
  // --------------------------------------------------------------------------

  function computePresenceDescriptors() {
    const presenceConfig = iq.presenceConfig || {};
    const meshConfig = iq.meshPresenceConfig || {};

    return {
      presenceField: {
        enabled: !!presenceConfig.enabled,
        bluetoothPreferred: !!presenceConfig.bluetoothPreferred,
        routes: presenceConfig.routes || [],
        // v30: pressure hint for SDN prewarm / CNS/PNS artery
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
        organs: organism ? Object.keys(organism) : []
      }
    };
  }

  function computeChunkingProfiles() {
    const profiles = iq.chunkingProfiles || {};
    return {
      defaultProfile: profiles.default || null,
      routeProfiles: profiles.routes || {},
      gpuProfiles: profiles.gpu || {},
      // v30: quick summary for cache/prewarm tuning
      summary: {
        hasDefault: !!profiles.default,
        routeCount: Object.keys(profiles.routes || {}).length,
        gpuCount: Object.keys(profiles.gpu || {}).length
      }
    };
  }

  // --------------------------------------------------------------------------
  // Drift + lineage state (seeded from CoreMemory if present)
  // --------------------------------------------------------------------------

  const driftKey = buildDriftStateKey(intent);
  const lineageKey = buildLineageKey(intent);
  const organHealthKey = buildOrganHealthKey(intent);
  const organismHealthKey = buildOrganismHealthKey(intent);
  const arteryLoadKey = buildArteryLoadKey(intent);

  const recalledDrift = coreMemoryRecall(driftKey);
  const recalledLineage = coreMemoryRecall(lineageKey);
  const recalledOrganHealth = coreMemoryRecall(organHealthKey);
  const recalledOrganismHealth = coreMemoryRecall(organismHealthKey);
  const recalledArteryLoad = coreMemoryRecall(arteryLoadKey);

  const initialBand = normalizeBand(band);
  const initialBandFamily = normalizeBandFamily(bandFamily);

  const DriftState = {
    lineage: Array.isArray(recalledLineage.lineage)
      ? recalledLineage.lineage.slice()
      : [],
    driftEvents: Array.isArray(recalledDrift.driftEvents)
      ? recalledDrift.driftEvents.slice()
      : [],
    organHealth:
      recalledOrganHealth && typeof recalledOrganHealth.organHealth === "object"
        ? { ...recalledOrganHealth.organHealth }
        : {},
    organismHealth:
      typeof recalledOrganismHealth.organismHealth === "number"
        ? recalledOrganismHealth.organismHealth
        : 1.0,
    lastScanSeq: recalledDrift.lastScanSeq || null,
    lastScanBand: recalledDrift.lastScanBand || initialBand,
    lastScanBandFamily:
      recalledDrift.lastScanBandFamily || initialBandFamily,
    lastDnaTag: recalledDrift.lastDnaTag || dnaTag,
    lastMeshTag: recalledDrift.lastMeshTag || meshTag,
    binaryDescriptor: recalledDrift.binaryDescriptor || null,
    presenceDescriptors: computePresenceDescriptors(),
    chunkingProfiles: computeChunkingProfiles(),

    cacheChunkSurface: recalledDrift.cacheChunkSurface || null,
    prewarmSurface: recalledDrift.prewarmSurface || null,

    arteryLoadSurface:
      recalledArteryLoad && typeof recalledArteryLoad.arteryLoadSurface === "object"
        ? { ...recalledArteryLoad.arteryLoadSurface }
        : buildArteryLoadSurface({
            iq,
            organism,
            band: initialBand,
            bandFamily: initialBandFamily
          })
  };

  // --------------------------------------------------------------------------
  // DRIFT SCANNER
  // --------------------------------------------------------------------------

  function scanDrift(
    Brain,
    {
      band: scanBand = initialBand,
      bandFamily: scanFamily = initialBandFamily,
      dnaTag: scanDnaTag = null,
      meshTag: scanMeshTag = null
    } = {}
  ) {
    const normBand = normalizeBand(scanBand);
    const normFamily = normalizeBandFamily(scanFamily);
    const drift = [];

    if (!Brain.intent) drift.push("missing-intent-map");
    if (!Brain.PulseOrganismMap) drift.push("missing-organism-map");
    if (!Brain.PulseIQMap) drift.push("missing-iq-map");

    const descriptor = Brain.BrainIntel.getBinaryOrganismDescriptor();
    DriftState.binaryDescriptor = descriptor || null;

    DriftState.presenceDescriptors = computePresenceDescriptors();
    DriftState.chunkingProfiles = computeChunkingProfiles();

    DriftState.lastScanSeq = nextSeq();
    DriftState.lastScanBand = normBand;
    DriftState.lastScanBandFamily = normFamily;
    DriftState.lastDnaTag = scanDnaTag;
    DriftState.lastMeshTag = scanMeshTag;
    DriftState.driftEvents.push(...drift);

    DriftState.lineage.push({
      seq: DriftState.lastScanSeq,
      band: normBand,
      bandFamily: normFamily,
      dnaTag: scanDnaTag,
      meshTag: scanMeshTag,
      event: "drift-scan"
    });

    DriftState.cacheChunkSurface = buildCacheChunkSurface({
      intent,
      organism,
      iq,
      band: normBand,
      bandFamily: normFamily
    });

    DriftState.prewarmSurface = buildPrewarmSurface({
      iq,
      band: normBand,
      bandFamily: normFamily
    });

    DriftState.arteryLoadSurface = buildArteryLoadSurface({
      iq,
      organism,
      band: normBand,
      bandFamily: normFamily
    });

    coreMemoryRecord(driftKey, {
      lastScanSeq: DriftState.lastScanSeq,
      lastScanBand: DriftState.lastScanBand,
      lastScanBandFamily: DriftState.lastScanBandFamily,
      lastDnaTag: DriftState.lastDnaTag,
      lastMeshTag: DriftState.lastMeshTag,
      driftEvents: DriftState.driftEvents.slice(),
      binaryDescriptor: DriftState.binaryDescriptor,
      cacheChunkSurface: DriftState.cacheChunkSurface,
      prewarmSurface: DriftState.prewarmSurface
    });

    coreMemoryRecord(lineageKey, {
      lineage: DriftState.lineage.slice()
    });

    coreMemoryRecord(arteryLoadKey, {
      arteryLoadSurface: { ...DriftState.arteryLoadSurface }
    });

    return drift;
  }

  // --------------------------------------------------------------------------
  // LINEAGE ENGINE
  // --------------------------------------------------------------------------

  function recordLineage(
    event,
    {
      band: lineageBand = initialBand,
      bandFamily: lineageFamily = initialBandFamily,
      dnaTag: lineageDnaTag = null,
      meshTag: lineageMeshTag = null
    } = {}
  ) {
    DriftState.lineage.push({
      seq: nextSeq(),
      band: normalizeBand(lineageBand),
      bandFamily: normalizeBandFamily(lineageFamily),
      dnaTag: lineageDnaTag,
      meshTag: lineageMeshTag,
      event
    });

    coreMemoryRecord(lineageKey, {
      lineage: DriftState.lineage.slice()
    });
  }

  // --------------------------------------------------------------------------
  // ORGAN HEALTH ENGINE
  // --------------------------------------------------------------------------

  function updateOrganHealth(
    organName,
    score,
    {
      band: healthBand = initialBand,
      bandFamily: healthFamily = initialBandFamily,
      dnaTag: healthDnaTag = null,
      meshTag: healthMeshTag = null
    } = {}
  ) {
    DriftState.organHealth[organName] = score;

    DriftState.lineage.push({
      seq: nextSeq(),
      band: normalizeBand(healthBand),
      bandFamily: normalizeBandFamily(healthFamily),
      dnaTag: healthDnaTag,
      meshTag: healthMeshTag,
      event: `organ-health-update:${organName}`
    });

    coreMemoryRecord(organHealthKey, {
      organHealth: { ...DriftState.organHealth }
    });

    coreMemoryRecord(lineageKey, {
      lineage: DriftState.lineage.slice()
    });
  }

  function computeOrganismHealth(
    {
      band: orgBand = initialBand,
      bandFamily: orgFamily = initialBandFamily,
      dnaTag: orgDnaTag = null,
      meshTag: orgMeshTag = null
    } = {}
  ) {
    const values = Object.values(DriftState.organHealth);
    DriftState.organismHealth =
      values.length === 0 ? 1.0 : values.reduce((a, b) => a + b, 0) / values.length;

    DriftState.lineage.push({
      seq: nextSeq(),
      band: normalizeBand(orgBand),
      bandFamily: normalizeBandFamily(orgFamily),
      dnaTag: orgDnaTag,
      meshTag: orgMeshTag,
      event: "organism-health-computed"
    });

    coreMemoryRecord(organismHealthKey, {
      organismHealth: DriftState.organismHealth
    });

    coreMemoryRecord(lineageKey, {
      lineage: DriftState.lineage.slice()
    });

    return DriftState.organismHealth;
  }

  // --------------------------------------------------------------------------
  // EVOLUTION → CORTEX BOOTSTRAP (v30-Immortal)
// --------------------------------------------------------------------------

  function bootCortex(
    Brain,
    {
      band: cortexBand = initialBand,
      bandFamily: cortexFamily = initialBandFamily,
      dnaTag: cortexDnaTag = null,
      meshTag: cortexMeshTag = null
    } = {}
  ) {
    const normBand = normalizeBand(cortexBand);
    const normFamily = normalizeBandFamily(cortexFamily);

    Brain.intent = intent;
    Brain.PulseOrganismMap = organism;
    Brain.PulseIQMap = iq;
    Brain.understanding = understanding;
    Brain.evolution = Evolution;

    recordLineage("cortex-boot", {
      band: normBand,
      bandFamily: normFamily,
      dnaTag: cortexDnaTag,
      meshTag: cortexMeshTag
    });

    const cortex = createPulseOSCortex({ Brain });

    cortex.boot({
      band: normBand,
      bandFamily: normFamily,
      cacheChunkSurface: DriftState.cacheChunkSurface,
      prewarmSurface: DriftState.prewarmSurface,
      arteryLoadSurface: DriftState.arteryLoadSurface
    });

    Brain.cortex = cortex;

    scanDrift(Brain, {
      band: normBand,
      bandFamily: normFamily,
      dnaTag: cortexDnaTag,
      meshTag: cortexMeshTag
    });

    return cortex;
  }

  // --------------------------------------------------------------------------
  // v30: INITIAL ARTERY LOADS SURFACE (for Brain.cognitiveBootstrap / CNS/PNS)
// --------------------------------------------------------------------------

  function getInitialArteryLoads() {
    return { ...DriftState.arteryLoadSurface };
  }

  // --------------------------------------------------------------------------
  // PUBLIC EVOLUTION ORGAN SURFACE
  // --------------------------------------------------------------------------

  const Evolution = {
    PulseRole,
    DriftState,
    scanDrift,
    recordLineage,
    updateOrganHealth,
    computeOrganismHealth,
    bootCortex,
    getPresenceDescriptors: () => DriftState.presenceDescriptors,
    getChunkingProfiles: () => DriftState.chunkingProfiles,
    getCacheChunkSurface: () => DriftState.cacheChunkSurface,
    getPrewarmSurface: () => DriftState.prewarmSurface,
    getArteryLoadSurface: () => DriftState.arteryLoadSurface,
    getInitialArteryLoads
  };

  return Evolution;
}

PulseRealm.OSBrainEvolution = {
  PulseOSEvolution
}

PulseRealm.PulseBrainEvolution = PulseOSEvolution;