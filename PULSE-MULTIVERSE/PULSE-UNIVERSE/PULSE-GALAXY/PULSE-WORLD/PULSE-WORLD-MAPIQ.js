// ============================================================================
//  FILE: /X-PULSE-X/PulseIQMap-v32-Immortal-Advantage++++++.js
//  PULSE IQ MAP v32 — ONE-BAND UNIFICATION + ORBITAL + CONNECTIVITY FIELDS
// ----------------------------------------------------------------------------
//  ROLE:
//    • Consciousness layer of PULSE-WORLD (organism + UI + comfort).
//    • One-band unification: "PulseBand" as the canonical execution band.
//    • Satellite + groundstation aware (symbolic only, no ephemeris here).
//    • Connectivity-aware: pulseNet-first, deterministic, zero-IO.
//    • Fully aligned with v32 organism, v32 intent, v32 chunker, v32 arteries.
// ----------------------------------------------------------------------------
//  INPUTS (contracts, not wires):
//    • PulseWorldOrganismMap v32 (symbolic organism genome).
//    • PulseWorldUniverse / Galactic Map v32 (cosmic topology).
//    • PulseAIChunker v32 (symbolic chunker).
//    • PulseIntentMap v32 (founder contract; enforced symbolically).
// ----------------------------------------------------------------------------
//  OUTPUTS:
//    • IQMap snapshot: routes, organism expectations, UI skills genome,
//      comfort patterns, chunking profiles, orbital + connectivity awareness.
//    • Helper API: getRouteUISkills, planUpcomingSkills, buildComfortPlan,
//      getConnectivityPlan, getOrbitalAwareness, refreshSkills, interpretRoute.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { PulseWorldPath, classifySystemName } from "./PULSE-WORLD-PATH.js";
import { createPulseAIChunkerV40 } from "./PULSE-PHYSICS/PULSE-AI/PULSE-AI-CHUNKER.js";
import { getPulseOrganismMapV32 } from "./PULSE-WORLD-MAPORGANISM.js";
import { PulseWorldContract as PULSE_WORLD_CONTRACT_V40} from "../../PULSE-UNIVERSAL-PULSAR.js";
import { createPulseAIChunker as createPulseAIChunkerV32 } from "./PULSE-PHYSICS/PULSE-AI/PULSE-AI-CHUNKER.js";
import { PulseIntentMap } from "./PULSE-WORLD-MAPINTENT.js";




// -----------------------------------------------------------------------------
// VERSION MAP — CENTRALIZED VERSION TAGS FOR ALL SUB‑COMPONENTS (v32)
// -----------------------------------------------------------------------------
const VERSION_MAP = {
  organism: "v40-IMMORTAL-ORGANISM",
  iq: "v40-IMMORTAL-ADVANTAGE++++++",

  uiSkillsGenome: "v40-UI-SKILLS-GENOME-ADVANTAGE++++++",
  uiSkillsBuilder: "v40-UI-SKILLS-BUILDER-ADVANTAGE++++++",
  uiCompiler: "v40-UI-COMPILER-PAGE-IMMORTAL",

  patternEngine: "v40-PATTERN-ENGINE-COMFORT",
  patternRegistry: "v40-PATTERN-REGISTRY-COMFORT",
  patternPlanner: "v40-PATTERN-PLANNER-COMFORT",
  patternExecutor: "v40-PATTERN-EXECUTOR-COMFORT",

  orbitalAwareness: "v40-ORBITAL-AWARENESS-IQ",
  bandModel: "v40-ONE-BAND-PULSEBAND",

  connectivityAwareness: "v40-CONNECTIVITY-AWARENESS-IQ",
  connectivityPlanner: "v40-CONNECTIVITY-PLANNER-IQ"
};

// -----------------------------------------------------------------------------
// FRONTEND / WORLD TOPOLOGY (WORLD‑LAYER VIEW, v32)
// -----------------------------------------------------------------------------
const FRONTEND_ROOT = "PULSE-WORLD";

const FRONTEND_FILES = [
  "index.html",
  "PulseWorldChallenge.html",
  "PulseWorldSendOff.html",
  "PulseWorldNebula.html",
  "PulseWorldExplanation.html",
  "PulseWorldTiers.html",
  "404.html",
  "cookies.html",
  "data.html",
  "error.html",
  "expire.html",
  "termsofuse.html",
  "privacy.html"
];

const FRONTEND_SYSTEMS = [
  "PULSEConfig",
  "PULSEAdmin",
  "PULSEDirectory",
  "PULSEDelivery",
  "PULSERewards",
  "PULSEVault",
  "PULSEBarrier",
  "PULSELogin"
];

const WORLD_FOLDERS = [
  "_PROOF",
  "_CREATION_BARRIER",
  "_EVOLUTION",
  "_ICONS",
  "_ANIMATIONS",
  "_BACKGROUNDS",
  "_VIDEOS",
  "_PICTURES",
  "_SOUNDS",
  "_LOADERS",
  "_README",
  "PULSE-BOOT",
  "PULSEConfig"
];


// -----------------------------------------------------------------------------
// ORBITAL / SATELLITE AWARENESS (symbolic only, v32)
// -----------------------------------------------------------------------------
const ORBITAL_META = Object.freeze({
  version: VERSION_MAP.orbitalAwareness,
  description:
    "Symbolic orbital awareness for IQ Map: satellites, groundstations, orbital seasons.",
  bands: ["groundstation", "satellite", "orbital-band"],
  fields: [
    "contactDensity",
    "orbitalReach",
    "orbitalPriority",
    "orbitalDominant",
    "avgContactDensity",
    "avgOrbitalReach",
    "contactWindows",
    "skySeason"
  ],
  notes: [
    "IQ Map does not compute ephemeris.",
    "IQ Map consumes symbolic orbitalField from universe snapshot.",
    "Aligned with v40 connectivity + routing expectations.",
    "Used to bias UI expectations, comfort, prewarm, and connectivity plans."
  ]
});


// -----------------------------------------------------------------------------
// CONNECTIVITY AWARENESS (symbolic only, aligned with PulseIntentMap v32)
// -----------------------------------------------------------------------------
const CONNECTIVITY_META = Object.freeze({
  version: VERSION_MAP.connectivityAwareness,
  description:
    "Symbolic connectivity awareness: pulseNet-first, deterministic, zero-IO.",
  layers: [
    "local_device",
    "local_mesh",
    "pulseNet",
    "direct_horizon",
    "satellite_link"
  ],
  notes: [
    "IQ Map never performs network IO.",
    "IQ Map only emits symbolic connectivity plans.",
    "PulseNet remains canonical gateway per PulseIntentMap v40.",
    "Direct horizon is symbolic only.",
    "Satellite link is symbolic fallback for orbital seasons."
  ]
});

function buildPageExpectationsV40() {
  const patterns = [
    { match: /^\/$/, page: "PulseEvolutionaryPage-v40" },

    // Identity / Login / Barrier
    { match: /login/, page: "PulseWorldLogin-v40" },
    { match: /barrier/, page: "PulseWorldBarrier-v40" },

    // World / Organism
    { match: /organism/, page: "PulseOSDashboard-v40" },
    { match: /world/, page: "PulseWorldDashboard-v40" },
    { match: /immune/, page: "PulseOSImmunities-v40" },
    { match: /diagnostics/, page: "PulseOSDiagnostics-v40" },

    // Dashboard
    { match: /^\/dashboard/, page: "PulseWorldInventory-v40" },

    // Messaging / Send
    { match: /send/, page: "PulseSendDashboard-v40" },

    // Economy / Earn
    { match: /earn/, page: "PulseEarnDashboard-v40" },

    // GPU / Compute
    { match: /gpu/, page: "PulseGPUDashboard-v40" },

    // Awareness / Presence
    { match: /aware/, page: "PulseAwareDashboard-v40" },

    // AI
    { match: /ai/, page: "PulseAIDashboard-v40" },

    // Scanner
    { match: /scanner/, page: "PulseWorldScanner-v40" },

    // Proxy / Band
    { match: /pulseband/, page: "PulseBandDashboard-v40" },
    { match: /proxy/, page: "PulseProxyDashboard-v40" },

    // Admin / Domain
    { match: /admin/, page: "PulseWorldDomain-v40" },

    // Directory / Events
    { match: /directory/, page: "PulseDirectory-v40" },
    { match: /events/, page: "PulseEvents-v40" },

    // Delivery
    { match: /delivery/, page: "PulseDelivery-v40" },

    // Rewards
    { match: /rewards/, page: "PulseWorldRewards-v40" },
    { match: /referral/, page: "PulseWorldTrustLink-v40" },

    // Vault
    { match: /vault/, page: "PulseWorldVault-v40" },

    // User Records
    { match: /userrecords/, page: "PulseWorldSkills-v40" },

    // Orbital / Satellite / Ground
    { match: /orbital/, page: "PulseOrbitalDashboard-v40" },
    { match: /satellite/, page: "PulseSatelliteDashboard-v40" },
    { match: /groundstation/, page: "PulseGroundStationDashboard-v40" }
  ];

  return new Proxy(
    {},
    {
      get(_, route) {
        if (typeof route !== "string")
          return ["PulseEvolutionaryPage-v40"];

        for (const p of patterns) {
          if (p.match.test(route)) return [p.page];
        }

        return ["PulseEvolutionaryPage-v40"];
      }
    }
  );
}
function interpretRouteV40(path = "", genome, pageExpectations) {
  if (!path || typeof path !== "string") return "/";

  const clean = path.toLowerCase().split("?")[0].split("#")[0];
  if (clean === "/" || clean === "") return "/";

  // Direct match via expectations
  if (pageExpectations[clean]) return clean;

  // Match frontend files
  const asHtml = clean.replace("/", "") + ".html";
  if (FRONTEND_FILES.includes(asHtml)) return clean;

  // Match frontend systems
  const asSystem = clean.replace("/", "");
  if (FRONTEND_SYSTEMS.includes(asSystem)) return clean;

  // Match organism systems
  if (genome.systems && genome.systems[asSystem]) return clean;

  // Classifier fallback
  const classified = classifySystemName(asSystem);
  if (classified.kind !== "system") return clean;

  return "/";
}

const ONE_BAND = Object.freeze({
  id: "PulseBand",
  description: "Unified execution band for PULSE WORLD (binary + symbolic fused).",
  lanes: 32,
  dualBand: true,
  notes: [
    "Binary primary, symbolic overlay.",
    "All IQ chunking uses band='pulseband' at the IQ layer.",
    "Aligned with chunker32 + dualBandArteryV32.",
    "ExecutionModelV32 ensures deterministic fusion of binary + symbolic lanes."
  ]
});

PulseRealm.ONE_BAND = ONE_BAND;

// -----------------------------------------------------------------------------
// ORGANISM INTERPRETATION — SYSTEM → ORGANS EXPECTATIONS (v32)
// -----------------------------------------------------------------------------
function buildOrganExpectationsFromGenomeV40(genome) {
  const systems = genome.systems || {};
  const organsBySystem = {};

  for (const [systemKey, systemDef] of Object.entries(systems)) {
    const classifier = classifySystemName(systemKey);

    const organs = (systemDef.organs || []).map(org => ({
      id: org.id || org,
      evolved: /^[A-Z0-9\-]+$/.test(org.id || org),
      version: org.version || "v40",
      layer: classifier.layer,
      kind: classifier.kind,
      filePath: PulseWorldPath.resolveSystemFolder(systemKey)
    }));

    organsBySystem[systemKey] = organs;
  }

  return organsBySystem;
}
function normalizeConnectivityEnvironmentV40(env = {}) {
  return {
    hasCell: !!env.hasCell,
    hasWifi: !!env.hasWifi,
    hasBluetooth: !!env.hasBluetooth,
    hasSatellite: !!env.hasSatellite,
    hasMesh: !!env.hasMesh,
    offlineMode: !!env.offlineMode,
    pulseNetHealthy: env.pulseNetHealthy !== false,
    directAllowedSymbolically: true,
    horizonReach: env.horizonReach || "unknown"
  };
}

function buildConnectivityPlanV40(route, env = {}, snapshot = null, genome = null) {
  const e = normalizeConnectivityEnvironmentV40(env);

  const plan = {
    version: VERSION_MAP.connectivityPlanner,
    executionModel: "ExecutionModelV40",
    route,
    primary: "pulseNet",
    secondary: null,
    tertiary: null,
    notes: []
  };

  // Offline mode overrides everything
  if (e.offlineMode) {
    plan.primary = "local_device";
    plan.secondary = "offline_cache";
    plan.notes.push("offlineModeActive", "localDeviceOnly", "cacheReplay");
    return plan;
  }

  // Healthy pulseNet
  if (e.pulseNetHealthy) {
    plan.primary = "pulseNet";
    plan.secondary = e.hasMesh ? "local_mesh" : "local_device";
    plan.notes.push("pulseNetSupremacy", "organismBoundaryIntact");
    return plan;
  }

  // Degraded pulseNet
  plan.notes.push("pulseNetDegraded", "routeAroundDamage");

  if (e.hasMesh || e.hasWifi || e.hasBluetooth || e.hasCell) {
    plan.primary = "local_mesh";
    plan.secondary = "local_device";
    plan.tertiary = "direct_horizon";
    plan.notes.push("meshFallbackPreferred");
  } else {
    plan.primary = "local_device";
    plan.secondary = "direct_horizon";
    plan.notes.push("localDeviceOnly", "directInternetHorizon");
  }

  if (e.hasSatellite) {
    plan.notes.push("satelliteReachAvailable");
  }

  plan.notes.push("symbolicConnectivityPlan");

  return plan;
}

const DRIFT_METADATA_V40 = {
  lastScan: null,
  lastRepair: null,
  signatures: [],
  repairOrgans: [
    "PulseBandCleanup-v40",
    "PulseHistoryRepair-v40",
    "PulseOSHealer-v40",
    "PulseProxyHealer-v40",
    "PulseWorldPathHealer-v40",
    "PulseExecutionModelV40Healer",
    "PulseChunkerV40Healer"
  ],
  scannerOrgans: [
    "PulseFileScanner-v40",
    "PulseCodeAnalyzer-v40",
    "PulseExecutionModelV40Scanner",
    "PulseChunkerV40Scanner"
  ]
};

// -----------------------------------------------------------------------------
// CHUNKER — IMMORTAL 32‑LANE SYMBOLIC CHUNKER FOR IQ MAP (ONE-BAND, v32)
// -----------------------------------------------------------------------------
const iqChunker = createPulseAIChunkerV40({
  id: "PulseAIChunker-IQMap-v40",
  defaultChunkSize: 8192,
  maxChunkSize: 65536,
  trace: false,
  lanes: PulseRealm.ONE_BAND.lanes,
  dualBand: PulseRealm.ONE_BAND.dualBand,
  executionModel: "ExecutionModelV40"
});


// Prewarm patterns for routes, organism, UI, comfort patterns, orbital, connectivity
iqChunker.prewarmPattern("routes", {
  defaultChunkSize: 2048,
  maxChunkSize: 16384,
  band: PulseRealm.ONE_BAND.id,
  lanes: PulseRealm.ONE_BAND.lanes
});

iqChunker.prewarmPattern("organism_ui", {
  defaultChunkSize: 4096,
  maxChunkSize: 32768,
  band: PulseRealm.ONE_BAND.id,
  lanes: PulseRealm.ONE_BAND.lanes
});

iqChunker.prewarmPattern("ui_skills", {
  defaultChunkSize: 4096,
  maxChunkSize: 32768,
  band: PulseRealm.ONE_BAND.id,
  lanes: PulseRealm.ONE_BAND.lanes
});

iqChunker.prewarmPattern("ui_icons", {
  defaultChunkSize: 2048,
  maxChunkSize: 8192,
  band: PulseRealm.ONE_BAND.id,
  lanes: PulseRealm.ONE_BAND.lanes
});

iqChunker.prewarmPattern("ui_animations", {
  defaultChunkSize: 2048,
  maxChunkSize: 8192,
  band: PulseRealm.ONE_BAND.id,
  lanes: PulseRealm.ONE_BAND.lanes
});

iqChunker.prewarmPattern("ui_styles", {
  defaultChunkSize: 2048,
  maxChunkSize: 8192,
  band: PulseRealm.ONE_BAND.id,
  lanes: PulseRealm.ONE_BAND.lanes
});

iqChunker.prewarmPattern("ui_hooks", {
  defaultChunkSize: 1024,
  maxChunkSize: 4096,
  band: PulseRealm.ONE_BAND.id,
  lanes: 16 // stays 16 — correct for hook density
});

iqChunker.prewarmPattern("comfort_patterns", {
  defaultChunkSize: 1024,
  maxChunkSize: 8192,
  band: PulseRealm.ONE_BAND.id,
  lanes: 16
});

iqChunker.prewarmPattern("orbital_awareness", {
  defaultChunkSize: 1024,
  maxChunkSize: 8192,
  band: PulseRealm.ONE_BAND.id,
  lanes: 16
});

iqChunker.prewarmPattern("connectivity_awareness", {
  defaultChunkSize: 1024,
  maxChunkSize: 8192,
  band: PulseRealm.ONE_BAND.id,
  lanes: 16
});

// -----------------------------------------------------------------------------
// CHUNKING PROFILES — HOW ROUTES / UI / COMFORT / ORBITAL / CONNECTIVITY CHUNK
// -----------------------------------------------------------------------------
function buildChunkingProfilesV40(genome, pageExpectations, organExpectations) {
  const routeProfiles = {};
  for (const route of Object.keys(pageExpectations)) {
    routeProfiles[route] = {
      label: "routes",
      band: PulseRealm.ONE_BAND.id,
      lanes: PulseRealm.ONE_BAND.lanes,
      executionModel: "ExecutionModelV40"
    };
  }

  const uiProfiles = {
    skills: {
      label: "ui_skills",
      band: PulseRealm.ONE_BAND.id,
      lanes: PulseRealm.ONE_BAND.lanes,
      executionModel: "ExecutionModelV40"
    },
    icons: {
      label: "ui_icons",
      band: PulseRealm.ONE_BAND.id,
      lanes: PulseRealm.ONE_BAND.lanes
    },
    animations: {
      label: "ui_animations",
      band: PulseRealm.ONE_BAND.id,
      lanes: PulseRealm.ONE_BAND.lanes
    },
    styles: {
      label: "ui_styles",
      band: PulseRealm.ONE_BAND.id,
      lanes: PulseRealm.ONE_BAND.lanes
    },
    hooks: {
      label: "ui_hooks",
      band: PulseRealm.ONE_BAND.id,
      lanes: 16
    }
  };

  const comfortProfiles = {
    comfort: {
      label: "comfort_patterns",
      band: PulseRealm.ONE_BAND.id,
      lanes: 16
    }
  };

  const orbitalProfiles = {
    orbital: {
      label: "orbital_awareness",
      band: PulseRealm.ONE_BAND.id,
      lanes: 16
    }
  };

  const connectivityProfiles = {
    connectivity: {
      label: "connectivity_awareness",
      band: PulseRealm.ONE_BAND.id,
      lanes: 16
    }
  };

  return {
    default: {
      label: "routes",
      band: PulseRealm.ONE_BAND.id,
      lanes: PulseRealm.ONE_BAND.lanes,
      executionModel: "ExecutionModelV40"
    },
    routes: routeProfiles,
    ui: uiProfiles,
    comfort: comfortProfiles,
    orbital: orbitalProfiles,
    connectivity: connectivityProfiles
  };
}

// -----------------------------------------------------------------------------
// EVOLVABLE UI SKILLS GENOME — FROM RAW SOURCES → SKILL PACKS (v32)
// -----------------------------------------------------------------------------
function buildEvolutionarySkillsFromSourcesV40(sources) {
  const skills = {};
  const packs = {};

  const addPack = packName => {
    if (!packs[packName]) packs[packName] = { id: packName, skills: [] };
  };

  const addSkill = (id, skill) => {
    skills[id] = skill;
    const packName = skill.pack || "default";
    addPack(packName);
    packs[packName].skills.push(id);
  };

  // animations
  for (const [id, anim] of Object.entries(sources.animations || {})) {
    addSkill(id, {
      id,
      kind: "animation",
      pack: anim.pack || "animations",
      role: anim.role || null,
      class: anim.class || null,
      css: anim.css || "",
      meta: anim.meta || {},
      executionModel: "ExecutionModelV40"
    });
  }

  // styles
  for (const [id, style] of Object.entries(sources.styles || {})) {
    addSkill(id, {
      id,
      kind: "style",
      pack: style.pack || "styles",
      role: style.role || null,
      class: style.class || null,
      css: style.css || "",
      meta: style.meta || {},
      executionModel: "ExecutionModelV40"
    });
  }

  // icons
  for (const [id, icon] of Object.entries(sources.icons || {})) {
    addSkill(id, {
      id,
      kind: "icon",
      pack: icon.pack || "icons",
      role: icon.role || null,
      class: icon.class || null,
      svg: icon.svg || "",
      meta: icon.meta || {},
      executionModel: "ExecutionModelV40"
    });
  }

  // hooks
  for (const [id, hook] of Object.entries(sources.hooks || {})) {
    addSkill(id, {
      id,
      kind: "hook",
      pack: hook.pack || "hooks",
      role: hook.role || null,
      config: hook.config || {},
      meta: hook.meta || {},
      executionModel: "ExecutionModelV40"
    });
  }

  return {
    version: VERSION_MAP.uiSkillsGenome,
    executionModel: "ExecutionModelV40",
    skills,
    packs,
    timingTokens: sources.timing || {},
    pictures: sources.pictures || {},
    sounds: sources.sounds || {}
  };
}


// -----------------------------------------------------------------------------
// UI SKILLS INDEX — FAST LOOKUPS BY PACK / KIND / ROLE / CLASS / ICON (v32)
// -----------------------------------------------------------------------------
function buildUISkillsIndexV40(skillsMap) {
  const skills = skillsMap.skills || {};
  const byPack = {};
  const byKind = {};
  const byRole = {};
  const byClass = {};
  const byIcon = {};

  for (const [id, skill] of Object.entries(skills)) {
    const pack = skill.pack || "unknown";
    const kind = skill.kind || "unknown";

    if (!byPack[pack]) byPack[pack] = [];
    byPack[pack].push(id);

    if (!byKind[kind]) byKind[kind] = [];
    byKind[kind].push(id);

    if (skill.role) {
      if (!byRole[skill.role]) byRole[skill.role] = [];
      byRole[skill.role].push(id);
    }

    if (skill.class) {
      if (!byClass[skill.class]) byClass[skill.class] = [];
      byClass[skill.class].push(id);
    }

    if (kind === "icon") {
      if (!byIcon[id]) byIcon[id] = [];
      byIcon[id].push(id);
    }
  }

  return {
    byPack,
    byKind,
    byRole,
    byClass,
    byIcon,
    executionModel: "ExecutionModelV40"
  };
}

// ============================================================================
// ROUTE → UI SKILLS EXPECTATIONS — PER‑PAGE BUNDLES (v40)
// ============================================================================
function buildRouteUISkillExpectationsV40(pageExpectations, uiIndex) {
  const routeSkills = {};

  for (const route of Object.keys(pageExpectations)) {
    const base = {
      animations: [],
      styles: [],
      icons: [],
      hooks: []
    };

    // ROOT — WORLD LANDING
    if (route === "/") {
      base.animations.push(
        "PulseEvolutionaryLandingGlow-v30",
        "PulseEvolutionaryBreatheWorld-v30"
      );
      base.styles.push(
        "PulseEvolutionaryBlockRoot-v30",
        "PulseEvolutionaryTitleRoot-v30",
        "PulseEvolutionaryContentRoot-v30"
      );
      base.icons.push("home", "pulse", "world_root");
    }

    // DASHBOARD — ORGANISM DIAGNOSTICS
    if (route === "/dashboard") {
      base.animations.push(
        "PulseEvolutionaryShimmerDiagnostics-v30",
        "PulseEvolutionaryRouteTransition-v30"
      );
      base.styles.push(
        "PulseEvolutionaryBlockPanel-v30",
        "PulseEvolutionaryContentPanel-v30",
        "PulseEvolutionaryButtonPrimary-v30"
      );
      base.icons.push("diagnostics_pulse", "cpu", "gpu", "organism");
    }

    // EARN — IMMORTAL ADVANTAGE
    if (route === "/earn") {
      base.animations.push(
        "PulseEvolutionaryCoinSpin-v30",
        "PulseEvolutionaryBadgePop-v30"
      );
      base.styles.push(
        "PulseEvolutionaryButtonReward-v30",
        "PulseEvolutionaryTierImmortal-v30"
      );
      base.icons.push("coin", "wallet", "badge", "trending_up");
    }

    // ORGANISM — BRAIN / MAP VIEW
    if (route === "/organism") {
      base.animations.push(
        "PulseEvolutionaryNeuralPulse-v30",
        "PulseEvolutionaryBinaryFlow-v30"
      );
      base.styles.push(
        "PulseEvolutionaryBinarySpectral-v30",
        "PulseEvolutionaryImpulseRipple-v30"
      );
      base.icons.push("ai_brain", "binary_matrix", "router_node", "organism_map");
    }

    // SCANNER — FILE / WORLD SCAN
    if (route === "/scanner" || route === "/scanner/file") {
      base.animations.push("PulseEvolutionaryScanBeam-v30");
      base.styles.push("PulseEvolutionaryContentScan-v30");
      base.icons.push("search", "diagnostics_pulse", "file_search");
    }

    // PROXY — BOUNDARY / NETWORK
    if (route === "/proxy" || route.startsWith("/proxy/")) {
      base.animations.push("PulseEvolutionaryRouterHop-v30");
      base.styles.push("PulseEvolutionaryContentProxy-v30");
      base.icons.push("router_node", "boundary", "network");
    }

    // REWARDS — IMMORTAL CELEBRATION
    if (route === "/rewards") {
      base.animations.push(
        "PulseEvolutionaryConfettiFall-v30",
        "PulseEvolutionaryBadgeGlow-v30"
      );
      base.styles.push("PulseEvolutionaryTierImmortal-v30");
      base.icons.push("badge", "coin", "trophy");
    }

    // ORBITAL — SKY / CONTACT WINDOWS
    if (route === "/orbital") {
      base.animations.push(
        "PulseEvolutionaryOrbitalSweep-v30",
        "PulseEvolutionarySkyBreathe-v30"
      );
      base.styles.push(
        "PulseEvolutionaryOrbitalGrid-v30",
        "PulseEvolutionaryOrbitalPanel-v30"
      );
      base.icons.push("satellite", "groundstation", "globe");
    }

    // SATELLITE — PASS / LINK
    if (route === "/satellite") {
      base.animations.push(
        "PulseEvolutionarySatellitePass-v30",
        "PulseEvolutionarySatelliteLink-v30"
      );
      base.styles.push(
        "PulseEvolutionarySatelliteTrack-v30",
        "PulseEvolutionarySatelliteWindow-v30"
      );
      base.icons.push("satellite", "orbit", "antenna");
    }

    // GROUNDSTATION — COVERAGE / CONTACT
    if (route === "/groundstation") {
      base.animations.push(
        "PulseEvolutionaryGroundLink-v30",
        "PulseEvolutionaryContactWindow-v30"
      );
      base.styles.push(
        "PulseEvolutionaryGroundPanel-v30",
        "PulseEvolutionaryRegionCoverage-v30"
      );
      base.icons.push("antenna", "region", "cloud");
    }

    routeSkills[route] = base;
  }

  return routeSkills;
}

// ============================================================================
// UI SKILLS META — COUNTS, PACK DISTRIBUTION, ROUTE COVERAGE (v40)
// ============================================================================
function buildUISkillsMetaV40(skillsMap, uiIndex, routeUISkills) {
  const skills = skillsMap.skills || {};
  const totalSkills = Object.keys(skills).length;

  const animationsCount = (uiIndex.byKind.animation || []).length;
  const stylesCount = (uiIndex.byKind.style || []).length;
  const iconsCount = (uiIndex.byKind.icon || []).length;
  const hooksCount = (uiIndex.byKind.hook || []).length;

  const packs = skillsMap.packs || {};
  const packCounts = {};
  for (const [packName, pack] of Object.entries(packs)) {
    packCounts[packName] = (pack.skills || []).length;
  }

  const routesWithUISkills = Object.keys(routeUISkills || {}).length;

  return {
    version: VERSION_MAP.uiSkillsGenome,
    executionModel: "ExecutionModelV40",
    totalSkills,
    animationsCount,
    stylesCount,
    iconsCount,
    hooksCount,
    packCounts,
    routesWithUISkills
  };
}

// ============================================================================
// COMFORT PATTERN REGISTRY — “SECURITY” AS COMFORT & SAFETY (v40)
// ============================================================================
const ComfortPatternRegistryV40 = Object.freeze({
  comfort_baseline: {
    id: "comfort_baseline",
    description: "Always‑on comfort: predictable, gentle, non‑surprising behavior.",
    phases: ["stabilize", "soften", "reassure"],
    steps: [
      "avoid_sudden_changes",
      "use_consistent_motion",
      "use_consistent_colors",
      "avoid_visual_noise",
      "keep_latency_predictable",
      "avoid_jarring_sounds"
    ],
    executionModel: "ExecutionModelV40"
  },

  comfort_transition: {
    id: "comfort_transition",
    description: "Make transitions feel safe and guided.",
    phases: ["prepare", "move", "land"],
    steps: [
      "preview_next_state",
      "use_soft_easing",
      "keep_focus_visible",
      "avoid_full_context_loss",
      "confirm_new_state"
    ],
    executionModel: "ExecutionModelV40"
  },

  comfort_feedback: {
    id: "comfort_feedback",
    description: "Always show that the system heard you.",
    phases: ["acknowledge", "progress", "complete"],
    steps: [
      "instant_ack",
      "show_progress",
      "show_completion",
      "avoid_silent_failures",
      "use_human_language"
    ],
    executionModel: "ExecutionModelV40"
  },

  comfort_orbital: {
    id: "comfort_orbital",
    description:
      "Make orbital / satellite behavior feel predictable despite contact windows.",
    phases: ["anticipate", "bridge", "reconnect"],
    steps: [
      "show_next_contact_window",
      "show_current_coverage_quality",
      "buffer_user_actions_during_gaps",
      "replay_buffered_actions_on_reconnect",
      "avoid_blame_language_for_sky_gaps"
    ],
    executionModel: "ExecutionModelV40"
  },

  comfort_connectivity: {
    id: "comfort_connectivity",
    description:
      "Make connectivity shifts (pulseNet ↔ mesh ↔ direct horizon) feel safe and non-threatening.",
    phases: ["sense", "explain", "reassure"],
    steps: [
      "show_connectivity_status_symbolically",
      "avoid_technical_blame_language",
      "offer_offline_capabilities",
      "queue_actions_for_later",
      "celebrate_reconnect_gently"
    ],
    executionModel: "ExecutionModelV40"
  }
});

export const ComfortPatternTagsV40 = Object.freeze({
  DEFAULT: ["comfort_baseline","comfort_feedback"],

  NAVIGATION: [ "comfort_baseline","comfort_transition", "comfort_feedback" ],

  LOADING: ["comfort_baseline","comfort_feedback"],

  ERROR: [ "comfort_baseline", "comfort_feedback"],

  SUCCESS: ["comfort_baseline","comfort_feedback" ],

  ORBITAL: ["comfort_baseline", "comfort_orbital","comfort_feedback"  ],

  CONNECTIVITY: ["comfort_baseline","comfort_connectivity", "comfort_feedback" ],

  IMMORTAL: ["comfort_baseline","comfort_transition", "comfort_feedback", "comfort_orbital", "comfort_connectivity" ]
});

const comfortPatternChunks = iqChunker.chunkJSON(ComfortPatternRegistryV40, {
  label: "comfort_patterns",
  band: PulseRealm.ONE_BAND.id,
  lanes: PulseRealm.ONE_BAND.lanes
});

export function buildComfortPlanV40(contextTag = "DEFAULT") {
  const tag = String(contextTag).toUpperCase();
  const ids = ComfortPatternTagsV40[tag] || ComfortPatternTagsV40.DEFAULT;

  const patterns = ids
    .map(id => ComfortPatternRegistryV40[id])
    .filter(Boolean);

  const phases = [];
  const steps = [];

  for (const pattern of patterns) {
    for (const phase of pattern.phases) {
      if (!phases.includes(phase)) phases.push(phase);
    }
    for (const step of pattern.steps) {
      if (!steps.includes(step)) steps.push(step);
    }
  }

  return {
    version: VERSION_MAP.patternPlanner,
    executionModel: "ExecutionModelV40",
    contextTag: tag,
    patternIds: ids,
    phases,
    steps
  };
}


// ============================================================================
// ORBITAL AWARENESS VIEW — CONSUMES UNIVERSE SNAPSHOT (symbolic, v40)
// ============================================================================
function buildOrbitalAwarenessFromUniverseV40(
  universeSnapshot,
  genome,
  galactic
) {
  const orbitalField = universeSnapshot.orbitalField || {
    totalOrbitalWorlds: 0,
    avgContactDensity: 0,
    avgOrbitalReach: 0,
    maxOrbitalPriority: 0,
    orbitalDominant: false
  };

  const multispin = universeSnapshot.multispin || {};
  const dominantBand = multispin.dominantBand || "other";

  const season =
    dominantBand === "satellite"
      ? "orbital-season"
      : dominantBand === "groundstation"
      ? "sky-season"
      : "neutral";

  return {
    version: VERSION_MAP.orbitalAwareness,
    executionModel: "ExecutionModelV40",
    orbitalField,
    dominantBand,
    season,
    cosmicHierarchy: galactic.hierarchy || null
  };
}

// ============================================================================
// CONNECTIVITY SNAPSHOT VIEW — SYMBOLIC ONLY (v40)
// ============================================================================
function buildConnectivitySnapshotV40(
  universeSnapshot,
  env = {},
  genome,
  galactic
) {
  const orbitalAwareness = buildOrbitalAwarenessFromUniverseV40(
    universeSnapshot || {},
    genome,
    galactic
  );

  const connectivityPlan = buildConnectivityPlanV40(
    "/",
    env,
    null,
    genome
  );

  return {
    version: VERSION_MAP.connectivityAwareness,
    executionModel: "ExecutionModelV40",
    meta: CONNECTIVITY_META,
    orbitalSeason: orbitalAwareness.season,
    connectivityPlan
  };
}


// ============================================================================
// MAIN BUILDER — IMMORTAL EVOLVABLE IQ MAP (v40)
// ============================================================================
export async function buildPulseIQMapEvolvableV40(
  evolutionSources,
  universeSnapshot,
  connectivityEnv
) {
  // -------------------------------------------------------------------------
  // GENOME + CONTRACT (v40)
  // -------------------------------------------------------------------------
  const genome = getPulseOrganismMapV32();
  const galactic = PULSE_WORLD_CONTRACT_V40;

  const pageExpectations = buildPageExpectationsV40(genome);
  const organExpectations = buildOrganExpectationsFromGenomeV40(genome);
  const chunkingProfiles = buildChunkingProfilesV40(
    genome,
    pageExpectations,
    organExpectations
  );

  // -------------------------------------------------------------------------
  // TOPOLOGY — FILE-BASED OS VIEW
  // -------------------------------------------------------------------------
  const topology = {
    backendRoot: "PULSE-WORLD-OS",
    publishRoot: FRONTEND_ROOT,
    frontendFiles: FRONTEND_FILES,
    frontendSystems: FRONTEND_SYSTEMS,
    worldFolders: WORLD_FOLDERS,
    cosmicHierarchy: galactic.hierarchy || null,
    executionModel: "ExecutionModelV40",
    architectureGenome: genome.architecture || null,
    classifierVersion: "classifySystemName-v40",
    pathOrganVersion: "PulseWorldPath-v40"
  };

  const topologyChunks = iqChunker.chunkJSON(topology, {
    label: "routes",
    band: PulseRealm.ONE_BAND.id
  });

  const organsChunks = iqChunker.chunkJSON(organExpectations, {
    label: "organism_ui",
    band: PulseRealm.ONE_BAND.id
  });

  const pagesChunks = iqChunker.chunkJSON(pageExpectations, {
    label: "routes",
    band: PulseRealm.ONE_BAND.id
  });

  const driftChunks = iqChunker.chunkJSON(DRIFT_METADATA_V40, {
    label: "comfort_patterns",
    band: PulseRealm.ONE_BAND.id
  });

  const chunkingProfilesChunks = iqChunker.chunkJSON(chunkingProfiles, {
    label: "routes",
    band: PulseRealm.ONE_BAND.id
  });

  // -------------------------------------------------------------------------
  // ORBITAL + CONNECTIVITY AWARENESS (v40)
// -------------------------------------------------------------------------
  const orbitalAwareness = buildOrbitalAwarenessFromUniverseV40(
    universeSnapshot || {},
    genome,
    galactic
  );

  const orbitalChunks = iqChunker.chunkJSON(orbitalAwareness, {
    label: "orbital_awareness",
    band: PulseRealm.ONE_BAND.id
  });

  const connectivitySnapshot = buildConnectivitySnapshotV40(
    universeSnapshot || {},
    connectivityEnv || {},
    genome,
    galactic
  );

  const connectivityChunks = iqChunker.chunkJSON(connectivitySnapshot, {
    label: "connectivity_awareness",
    band: PulseRealm.ONE_BAND.id
  });

  // -------------------------------------------------------------------------
  // UI SKILLS GENOME (v40)
// -------------------------------------------------------------------------
  let currentEvolutionSources = evolutionSources || {};

  const buildUISkills = () => {
    const uiSkillsMap = buildEvolutionarySkillsFromSourcesV40(
      currentEvolutionSources,
      genome,
      pageExpectations
    );

    const uiSkillsIndex = buildUISkillsIndexV40(uiSkillsMap);
    const routeUISkills = buildRouteUISkillExpectationsV40(
      pageExpectations,
      uiSkillsIndex
    );

    const uiGenomeMeta = buildUISkillsMetaV40(
      uiSkillsMap,
      uiSkillsIndex,
      routeUISkills
    );

    const uiSkillsChunks = iqChunker.chunkJSON(uiSkillsMap, {
      label: "ui_skills",
      band: PulseRealm.ONE_BAND.id
    });

    const uiSkillsIndexChunks = iqChunker.chunkJSON(uiSkillsIndex, {
      label: "ui_skills",
      band: PulseRealm.ONE_BAND.id
    });

    const routeUISkillsChunks = iqChunker.chunkJSON(routeUISkills, {
      label: "ui_skills",
      band: PulseRealm.ONE_BAND.id
    });

    const uiTimingChunks = iqChunker.chunkJSON(
      uiSkillsMap.timingTokens || {},
      {
        label: "ui_styles",
        band: PulseRealm.ONE_BAND.id
      }
    );

    const uiHooksChunks = iqChunker.chunkJSON(
      Object.fromEntries(
        Object.entries(uiSkillsMap.skills || {}).filter(
          ([, s]) => s.kind === "hook"
        )
      ),
      {
        label: "ui_hooks",
        band: PulseRealm.ONE_BAND.id
      }
    );

    return {
      uiSkillsMap,
      uiSkillsIndex,
      routeUISkills,
      uiGenomeMeta,
      uiSkillsChunks,
      uiSkillsIndexChunks,
      routeUISkillsChunks,
      uiTimingChunks,
      uiHooksChunks
    };
  };

  let {
    uiSkillsMap,
    uiSkillsIndex,
    routeUISkills,
    uiGenomeMeta,
    uiSkillsChunks,
    uiSkillsIndexChunks,
    routeUISkillsChunks,
    uiTimingChunks,
    uiHooksChunks
  } = buildUISkills();

  // -------------------------------------------------------------------------
  // EVOLUTIONARY API
  // -------------------------------------------------------------------------
  function refreshSkills(nextEvolutionSources) {
    currentEvolutionSources =
      nextEvolutionSources || currentEvolutionSources || {};

    const rebuilt = buildUISkills();

    uiSkillsMap = rebuilt.uiSkillsMap;
    uiSkillsIndex = rebuilt.uiSkillsIndex;
    routeUISkills = rebuilt.routeUISkills;
    uiGenomeMeta = rebuilt.uiGenomeMeta;
    uiSkillsChunks = rebuilt.uiSkillsChunks;
    uiSkillsIndexChunks = rebuilt.uiSkillsIndexChunks;
    routeUISkillsChunks = rebuilt.routeUISkillsChunks;
    uiTimingChunks = rebuilt.uiTimingChunks;
    uiHooksChunks = rebuilt.uiHooksChunks;
  }

  function getRouteUISkills(route) {
    const r = interpretRouteV40(route, genome, pageExpectations);
    return (
      routeUISkills[r] || {
        animations: [],
        styles: [],
        icons: [],
        hooks: []
      }
    );
  }

  function planUpcomingSkills(routeSequence = []) {
    const merged = {
      animations: new Set(),
      styles: new Set(),
      icons: new Set(),
      hooks: new Set()
    };

    for (const r of routeSequence) {
      const skills = getRouteUISkills(r);
      for (const a of skills.animations || []) merged.animations.add(a);
      for (const s of skills.styles || []) merged.styles.add(s);
      for (const i of skills.icons || []) merged.icons.add(i);
      for (const h of skills.hooks || []) merged.hooks.add(h);
    }

    const flatSkills = [];
    for (const a of merged.animations)
      flatSkills.push({ kind: "animations", id: a });
    for (const s of merged.styles) flatSkills.push({ kind: "styles", id: s });
    for (const i of merged.icons) flatSkills.push({ kind: "icons", id: i });
    for (const h of merged.hooks) flatSkills.push({ kind: "hooks", id: h });

    return { flatSkills, merged };
  }

  function getOrbitalAwareness() {
    return orbitalAwareness;
  }

  function getConnectivityPlanForRoute(route, env) {
    return buildConnectivityPlanV40(
      route,
      env || connectivityEnv || {},
      connectivitySnapshot,
      genome
    );
  }

  // -------------------------------------------------------------------------
  // SNAPSHOT
  // -------------------------------------------------------------------------
  const snapshot = {
    version: VERSION_MAP.iq,
    organismVersion: VERSION_MAP.organism,
    bandModel: PulseRealm.ONE_BAND,
    topology,
    topologyChunks,
    organsChunks,
    pagesChunks,
    driftChunks,
    chunkingProfiles,
    chunkingProfilesChunks,
    orbitalAwareness,
    orbitalChunks,
    connectivitySnapshot,
    connectivityChunks,
    uiSkillsMap,
    uiSkillsIndex,
    routeUISkills,
    uiGenomeMeta,
    uiSkillsChunks,
    uiSkillsIndexChunks,
    routeUISkillsChunks,
    uiTimingChunks,
    uiHooksChunks,
    comfortPatternChunks,
    comfortMeta: {
      registryVersion: VERSION_MAP.patternRegistry,
      tags: Object.keys(ComfortPatternTagsV40)
    }
  };

  return {
    snapshot,
    getRouteUISkills,
    planUpcomingSkills,
    buildComfortPlanV40,
    getOrbitalAwareness,
    getConnectivityPlan: getConnectivityPlanForRoute,
    refreshSkills
  };
}
// ============================================================================
// PulseIQMapEvolvableV40 — IMMORTAL EVOLVABLE IQ MAP (v32)
// ============================================================================
// ---------------------------------------------------------------------------
// PULSE-WORLD IQ MAP — EVOLUTIONARY v40 IMMORTAL
// ---------------------------------------------------------------------------
export const PulseIQMapEvolvableV40 = (
  evolutionSources = {},
  universeSnapshot = {},
  connectivityEnv = {}
) => {
  // -------------------------------------------------------------------------
  // GENOME + CONTRACT (v40)
  // -------------------------------------------------------------------------
  const genome = getPulseOrganismMapV32();
  const galactic = PULSE_WORLD_CONTRACT_V40;

  const pageExpectations = buildPageExpectationsV40(genome);
  const organExpectations = buildOrganExpectationsFromGenomeV40(genome);
  const chunkingProfiles = buildChunkingProfilesV40(
    genome,
    pageExpectations,
    organExpectations
  );

  // -------------------------------------------------------------------------
  // TOPOLOGY — FILE-BASED OS VIEW
  // -------------------------------------------------------------------------
  const topology = {
    backendRoot: "PULSE-WORLD-OS",
    publishRoot: FRONTEND_ROOT,
    frontendFiles: FRONTEND_FILES,
    frontendSystems: FRONTEND_SYSTEMS,
    worldFolders: WORLD_FOLDERS,
    cosmicHierarchy: galactic.hierarchy || null,
    executionModel: "ExecutionModelV40",
    architectureGenome: genome.architecture || null,
    classifierVersion: "classifySystemName-v40",
    pathOrganVersion: "PulseWorldPath-v40"
  };

  const topologyChunks = iqChunker.chunkJSON(topology, {
    label: "routes",
    band: PulseRealm.ONE_BAND.id
  });

  const organsChunks = iqChunker.chunkJSON(organExpectations, {
    label: "organism_ui",
    band: PulseRealm.ONE_BAND.id
  });

  const pagesChunks = iqChunker.chunkJSON(pageExpectations, {
    label: "routes",
    band: PulseRealm.ONE_BAND.id
  });

  const driftChunks = iqChunker.chunkJSON(DRIFT_METADATA_V40, {
    label: "comfort_patterns",
    band: PulseRealm.ONE_BAND.id
  });

  const chunkingProfilesChunks = iqChunker.chunkJSON(chunkingProfiles, {
    label: "routes",
    band: PulseRealm.ONE_BAND.id
  });

  // -------------------------------------------------------------------------
  // ORBITAL + CONNECTIVITY AWARENESS (v40)
  // -------------------------------------------------------------------------
  const orbitalAwareness = buildOrbitalAwarenessFromUniverseV40(
    universeSnapshot || {},
    genome,
    galactic
  );

  const orbitalChunks = iqChunker.chunkJSON(orbitalAwareness, {
    label: "orbital_awareness",
    band: PulseRealm.ONE_BAND.id
  });

  const connectivitySnapshot = buildConnectivitySnapshotV40(
    universeSnapshot || {},
    connectivityEnv || {},
    genome,
    galactic
  );

  const connectivityChunks = iqChunker.chunkJSON(connectivitySnapshot, {
    label: "connectivity_awareness",
    band: PulseRealm.ONE_BAND.id
  });

  let currentEvolutionSources = evolutionSources || {};

  // -------------------------------------------------------------------------
  // INTERNAL: UI SKILLS GENOME (v40)
  // -------------------------------------------------------------------------
  const buildUISkills = () => {
    const uiSkillsMap = buildEvolutionarySkillsFromSourcesV40(
      currentEvolutionSources,
      genome,
      pageExpectations
    );

    const uiSkillsIndex = buildUISkillsIndexV40(uiSkillsMap);
    const routeUISkills = buildRouteUISkillExpectationsV40(
      pageExpectations,
      uiSkillsIndex
    );

    const uiGenomeMeta = buildUISkillsMetaV40(
      uiSkillsMap,
      uiSkillsIndex,
      routeUISkills
    );

    const uiSkillsChunks = iqChunker.chunkJSON(uiSkillsMap, {
      label: "ui_skills",
      band: PulseRealm.ONE_BAND.id
    });

    const uiSkillsIndexChunks = iqChunker.chunkJSON(uiSkillsIndex, {
      label: "ui_skills",
      band: PulseRealm.ONE_BAND.id
    });

    const routeUISkillsChunks = iqChunker.chunkJSON(routeUISkills, {
      label: "ui_skills",
      band: PulseRealm.ONE_BAND.id
    });

    const uiTimingChunks = iqChunker.chunkJSON(
      uiSkillsMap.timingTokens || {},
      {
        label: "ui_styles",
        band: PulseRealm.ONE_BAND.id
      }
    );

    const uiHooksChunks = iqChunker.chunkJSON(
      Object.fromEntries(
        Object.entries(uiSkillsMap.skills || {}).filter(
          ([, s]) => s.kind === "hook"
        )
      ),
      {
        label: "ui_hooks",
        band: PulseRealm.ONE_BAND.id
      }
    );

    return {
      uiSkillsMap,
      uiSkillsIndex,
      routeUISkills,
      uiGenomeMeta,
      uiSkillsChunks,
      uiSkillsIndexChunks,
      routeUISkillsChunks,
      uiTimingChunks,
      uiHooksChunks
    };
  };

  // Initial UI skills genome
  let {
    uiSkillsMap,
    uiSkillsIndex,
    routeUISkills,
    uiGenomeMeta,
    uiSkillsChunks,
    uiSkillsIndexChunks,
    routeUISkillsChunks,
    uiTimingChunks,
    uiHooksChunks
  } = buildUISkills();

  // -------------------------------------------------------------------------
  // PUBLIC API — EVOLUTIONARY
  // -------------------------------------------------------------------------
  const refreshSkills = nextEvolutionSources => {
    currentEvolutionSources =
      nextEvolutionSources || currentEvolutionSources || {};
    const rebuilt = buildUISkills();

    uiSkillsMap = rebuilt.uiSkillsMap;
    uiSkillsIndex = rebuilt.uiSkillsIndex;
    routeUISkills = rebuilt.routeUISkills;
    uiGenomeMeta = rebuilt.uiGenomeMeta;
    uiSkillsChunks = rebuilt.uiSkillsChunks;
    uiSkillsIndexChunks = rebuilt.uiSkillsIndexChunks;
    routeUISkillsChunks = rebuilt.routeUISkillsChunks;
    uiTimingChunks = rebuilt.uiTimingChunks;
    uiHooksChunks = rebuilt.uiHooksChunks;
  };

  const getRouteUISkills = route => {
    const r = interpretRouteV40(route, genome, pageExpectations);
    return (
      routeUISkills[r] || {
        animations: [],
        styles: [],
        icons: [],
        hooks: []
      }
    );
  };

  const planUpcomingSkills = (routeSequence = []) => {
    const merged = {
      animations: new Set(),
      styles: new Set(),
      icons: new Set(),
      hooks: new Set()
    };

    for (const r of routeSequence) {
      const skills = getRouteUISkills(r);
      for (const a of skills.animations || []) merged.animations.add(a);
      for (const s of skills.styles || []) merged.styles.add(s);
      for (const i of skills.icons || []) merged.icons.add(i);
      for (const h of skills.hooks || []) merged.hooks.add(h);
    }

    const flatSkills = [];
    for (const a of merged.animations)
      flatSkills.push({ kind: "animations", id: a });
    for (const s of merged.styles) flatSkills.push({ kind: "styles", id: s });
    for (const i of merged.icons) flatSkills.push({ kind: "icons", id: i });
    for (const h of merged.hooks) flatSkills.push({ kind: "hooks", id: h });

    return { flatSkills, merged };
  };

  const getOrbitalAwareness = () => orbitalAwareness;

  const getConnectivityPlan = (route, env) =>
    buildConnectivityPlanV40(route, env || {}, connectivitySnapshot, genome);

  const getSnapshot = () => ({
    version: VERSION_MAP.iq,
    organismVersion: VERSION_MAP.organism,
    bandModel: PulseRealm.ONE_BAND,
    topology,
    topologyChunks,
    organsChunks,
    pagesChunks,
    driftChunks,
    chunkingProfiles,
    chunkingProfilesChunks,
    orbitalAwareness,
    orbitalChunks,
    connectivitySnapshot,
    connectivityChunks,
    uiSkillsMap,
    uiSkillsIndex,
    routeUISkills,
    uiGenomeMeta,
    uiSkillsChunks,
    uiSkillsIndexChunks,
    routeUISkillsChunks,
    uiTimingChunks,
    uiHooksChunks,
    comfortPatternChunks,
    comfortMeta: {
      registryVersion: VERSION_MAP.patternRegistry,
      tags: Object.keys(ComfortPatternTagsV40)
    }
  });

  return Object.freeze({
    genome,
    galactic,
    pageExpectations,
    organExpectations,
    chunkingProfiles,
    topology,
    topologyChunks,
    organsChunks,
    pagesChunks,
    driftChunks,
    chunkingProfilesChunks,
    orbitalAwareness,
    orbitalChunks,
    connectivitySnapshot,
    connectivityChunks,
    uiSkillsMap,
    uiSkillsIndex,
    routeUISkills,
    uiGenomeMeta,
    uiSkillsChunks,
    uiSkillsIndexChunks,
    routeUISkillsChunks,
    uiTimingChunks,
    uiHooksChunks,
    refreshSkills,
    getRouteUISkills,
    planUpcomingSkills,
    getOrbitalAwareness,
    getConnectivityPlan,
    getSnapshot
  });
};

PulseRealm.PulseWorldMap = {
  PulseIQMapEvolvableV40
}

PulseRealm.PulseWorldIQMap = PulseIQMapEvolvableV40;
