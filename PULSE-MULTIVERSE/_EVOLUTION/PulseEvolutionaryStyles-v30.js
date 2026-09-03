// ============================================================================
// FILE: /_EVOLUTION/PulseEvolutionaryStyles-v33.js
// PULSE OS — v33-IMMORTAL-EVOLUTIONARY
// AUTO-BUILT PAGE CSS • UI SKILLS GENOME → PAGE-SCOPED CSS EMITTER
// FULL-BAND, MEMORY-AWARE, ROUTER-AWARE, EVOLUTION-AWARE
// ============================================================================
//
// ROLE (v33 IMMORTAL):
//   • Auto-builds CSS for CURRENT + UPCOMING pages
//   • Uses IQMap UI Skills Genome (v33-aware)
//   • Includes Base Style + Base Animation genomes exactly once
//   • Zero drift, zero duplication, zero global CSS pollution
//   • DOM-guarded (<style data-pulse-style="v33">)
//   • Memory-v33 advisory-aware
//   • Router-v33 transition-aware
//   • AdvantageV2 + integrityV2 surfaced as experience blocks + consoleMeta
//
// CONTRACT:
//   • PURE FRONTEND ORGAN — no network, no timers, no eval
//   • Deterministic CSS generation from symbolic skill definitions
//   • Binary surfaces allowed only as metadata
//   • IMMORTAL: zero mutation of input, zero randomness
//
// SAFETY:
//   • IMMORTAL: zero side effects outside wrapper
//   • Evolvable: rebuilds when IQMap refreshes
//   • Schema-versioned envelopes for CSS builds
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

import {
  createPulseEvolutionaryIconsV33
} from "./PulseEvolutionaryIcons-v30.js";

import {
  createPulseEvolutionaryAnimationsV33
} from "./PulseEvolutionaryAnimations-v30.js";

import {
  PulseEvolutionaryStylesBaseGenomeV30Plus
} from "./PulseEvolutionaryStylesGenome-v30.js";

import {
  PulseEvolutionaryAnimationsBaseGenomeV30
} from "./PulseEvolutionaryAnimationsGenome-v30.js";


// ============================================================================
// ROLE META — v33 IMMORTAL STYLES ORGAN
// ============================================================================
export const StylesRole = Object.freeze({
  layer: "PulseEvolutionaryStyles",
  version: "v33-Immortal-Evolutionary",
  role: "UI_STYLES_GENOME_ENGINE",
  identity: "PulseUI.EvolutionaryStyles-v33",

  lineage: Object.freeze({
    root: "PulseStyles-v11.3",
    parent: "PulseEvolutionaryStyles-v30Plus",
    ancestry: [
      "PulseStyles-v11.3",
      "PulseStyles-v14",
      "PulseStyles-v20",
      "PulseEvolutionaryStyles-v30Plus",
      "PulseEvolutionaryStyles-v33-Immortal"
    ]
  }),

  evo: Object.freeze({
    stylesOrgan: true,
    stylesGenomeAware: true,
    routeAware: true,
    upcomingAware: true,
    iqMapAware: true,
    memoryAware: true,
    routerAware: true,
    animationsOrganAware: true,
    iconsOrganAware: true,

    dualBandAware: true,
    unifiedAdvantageField: true,
    unifiedAdvantageFieldV2: true,
    bandMetricsAware: true,
    integrityAware: true,
    integrityV2: true,
    experienceBlocksAware: true,
    experienceBlocksV2: true,
    consoleMetaAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroRandomness: true,

    futureEvolutionReady: true,
    v30GenomeAware: true,
    v30AdvantageView: true,
    v30MemoryAligned: true,
    v30RouterAligned: true,

    v33GenomeAware: true,
    v33AdvantageView: true,
    v33MemoryAligned: true,
    v33RouterAligned: true,
    v33ImpulseAligned: true,
    v33ConsoleAligned: true
  })
});

const STYLES_SCHEMA_VERSION = "v7"; // v33 styles envelope schema

// ============================================================================
// INTERNAL HELPERS
// ============================================================================
function ensureStyleTag() {
  if (typeof document === "undefined") return null;

  let tag = document.querySelector('style[data-pulse-style="v33"]');
  if (!tag) {
    tag = document.createElement("style");
    tag.setAttribute("data-pulse-style", "v33");
    document.head.appendChild(tag);
  }
  return tag;
}

function escapeCSS(str) {
  return String(str).replace(/"/g, '\\"');
}

// ---------------------------------------------------------------------------
// VERY SIMPLE CSS CASCADE MERGE ENGINE
// map → submaps → final map
// ---------------------------------------------------------------------------
function mergeCSSCascade(rawCSS) {
  if (!rawCSS || typeof rawCSS !== "string") return rawCSS;

  const globalRules = new Map(); // selector -> Map(prop -> value)
  const mediaBlocks = [];        // { query, css }

  // 1) Extract @media blocks and keep them separate
  let css = rawCSS;
  const mediaRegex = /@media\s+([^{]+)\{([\s\S]*?)\}\s*/g;
  let mediaMatch;
  while ((mediaMatch = mediaRegex.exec(rawCSS)) !== null) {
    const query = mediaMatch[1].trim();
    const body = mediaMatch[2].trim();
    mediaBlocks.push({ query, body });
  }
  css = rawCSS.replace(mediaRegex, "");

  // 2) Parse global (non-media) rules
  parseAndMergeRules(css, globalRules);

  // 3) Parse and merge rules inside each media block
  const mergedMediaBlocks = mediaBlocks.map(({ query, body }) => {
    const mediaRules = new Map();
    parseAndMergeRules(body, mediaRules);
    const mediaCSS = emitMergedRules(mediaRules);
    return mediaCSS ? `@media ${query} {\n${mediaCSS}\n}` : "";
  }).filter(Boolean);

  // 4) Emit final CSS: global + media
  const globalCSS = emitMergedRules(globalRules);
  return [globalCSS, ...mergedMediaBlocks].filter(Boolean).join("\n\n");
}

function parseAndMergeRules(css, rulesMap) {
  if (!css) return;

  const ruleRegex = /([^{]+)\{([^}]*)\}/g;
  let match;
  while ((match = ruleRegex.exec(css)) !== null) {
    const selector = match[1].trim();
    const body = match[2].trim();
    if (!selector || !body) continue;

    let propMap = rulesMap.get(selector);
    if (!propMap) {
      propMap = new Map();
      rulesMap.set(selector, propMap);
    }

    const lines = body.split(";");
    for (let line of lines) {
      line = line.trim();
      if (!line) continue;
      const colonIdx = line.indexOf(":");
      if (colonIdx === -1) continue;

      const prop = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim();
      if (!prop || !value) continue;

      propMap.set(prop, value);
    }
  }
}

function emitMergedRules(rulesMap) {
  const chunks = [];
  for (const [selector, propMap] of rulesMap.entries()) {
    if (!propMap || propMap.size === 0) continue;
    const decls = [];
    for (const [prop, value] of propMap.entries()) {
      decls.push(`${prop}: ${value};`);
    }
    if (decls.length === 0) continue;
    chunks.push(`${selector} { ${decls.join(" ")} }`);
  }
  return chunks.join("\n");
}

// ============================================================================
// BAND / ADVANTAGE / INTEGRITY METRICS — v33
// ============================================================================
function computeCSSBandMetricsV33(css, upcomingCss) {
  const cssSize = (css || "").length;
  const upcomingSize = (upcomingCss || "").length;
  const total = cssSize + upcomingSize || 1;

  const symbolicWeight = cssSize / total;
  const binaryWeight = upcomingSize / total; // treat upcoming as secondary band proxy

  const density = binaryWeight;
  const entropyHint = Math.max(0, Math.min(1, 1 - Math.abs(0.5 - density) * 2));
  const bandBalance = Math.max(0, Math.min(1, 1 - Math.abs(symbolicWeight - binaryWeight)));
  const complexityHint = Math.max(0, Math.min(1, density * entropyHint));

  const advantage = 0.4 * symbolicWeight + 0.6 * binaryWeight;

  const advantageV2 = Math.max(
    0,
    Math.min(
      1,
      0.3 * symbolicWeight +
      0.5 * binaryWeight +
      0.2 * bandBalance
    )
  );

  const sizeTier =
    total > 256 * 1024 ? "colossal" :
    total > 128 * 1024 ? "huge" :
    total > 64 * 1024  ? "large" :
    total > 16 * 1024  ? "medium" :
    total > 0          ? "small" :
                         "empty";

  return {
    schemaVersion: STYLES_SCHEMA_VERSION,
    cssSize,
    upcomingSize,
    totalSize: total,
    symbolicWeight,
    binaryWeight,
    density,
    entropyHint,
    bandBalance,
    complexityHint,
    advantage,
    advantageV2,
    sizeTier
  };
}

function computeCSSIntegrityV33({ band }) {
  const base =
    0.35 * (band.advantageV2 ?? band.advantage ?? 0.5) +
    0.25 * (band.entropyHint ?? 0.5) +
    0.20 * (band.bandBalance ?? 0.5) +
    0.20 * (band.totalSize > 0 ? 1 : 0);

  const score = Math.max(0, Math.min(1, base));

  const status =
    score >= 0.95 ? "immortal" :
    score >= 0.85 ? "excellent" :
    score >= 0.70 ? "good" :
    score >= 0.55 ? "fair" :
    score >= 0.40 ? "degraded" :
                    "critical";

  const degraded = status === "degraded" || status === "critical";

  return {
    score,
    status,
    degraded,
    integrityVersion: "v2"
  };
}

function buildStylesExperienceEnvelopeV33({
  route,
  upcomingRoutes,
  css,
  upcomingCSS
}) {
  const band = computeCSSBandMetricsV33(css, upcomingCSS);
  const integrity = computeCSSIntegrityV33({ band });

  const experience = {
    schemaVersion: STYLES_SCHEMA_VERSION,
    blocks: [
      {
        id: "styles.band",
        kind: "bandMetrics",
        route,
        upcomingRoutes,
        cssSize: band.cssSize,
        upcomingSize: band.upcomingSize,
        totalSize: band.totalSize,
        symbolicWeight: band.symbolicWeight,
        binaryWeight: band.binaryWeight,
        density: band.density,
        entropyHint: band.entropyHint,
        bandBalance: band.bandBalance,
        complexityHint: band.complexityHint,
        advantage: band.advantage,
        advantageV2: band.advantageV2,
        sizeTier: band.sizeTier
      },
      {
        id: "styles.integrity",
        kind: "integrity",
        route,
        score: integrity.score,
        status: integrity.status,
        degraded: integrity.degraded,
        integrityVersion: integrity.integrityVersion
      },
      {
        id: "styles.console",
        kind: "consoleMeta",
        route,
        upcomingRoutes,
        sizeTier: band.sizeTier,
        advantageV2: band.advantageV2,
        bandBalance: band.bandBalance,
        complexityHint: band.complexityHint,
        integrityStatus: integrity.status
      }
    ]
  };

  const consoleMeta = {
    sizeTier: band.sizeTier,
    advantageV2: band.advantageV2,
    bandBalance: band.bandBalance,
    complexityHint: band.complexityHint,
    integrityStatus: integrity.status
  };

  const sigBase = JSON.stringify({
    route,
    upcomingRoutes,
    cssSize: band.cssSize,
    upcomingSize: band.upcomingSize,
    totalSize: band.totalSize,
    sizeTier: band.sizeTier,
    advantageV2: band.advantageV2,
    bandBalance: band.bandBalance,
    complexityHint: band.complexityHint
  });

  // simple hash
  let h = 0;
  for (let i = 0; i < sigBase.length; i++) {
    h = (h * 31 + sigBase.charCodeAt(i)) >>> 0;
  }
  const signature = "STYLES_SIG_V33_" + h.toString(16).padStart(8, "0");

  const envelopeId =
    "STYLES-" +
    STYLES_SCHEMA_VERSION +
    "-" +
    ((h * 1315423911) >>> 0).toString(16).padStart(8, "0");

  return {
    schemaVersion: STYLES_SCHEMA_VERSION,
    identity: StylesRole.identity,
    version: StylesRole.version,
    route,
    upcomingRoutes,
    css,
    upcomingCSS,
    band,
    integrity,
    experience,
    consoleMeta,
    id: envelopeId,
    signature,
    timestamp: "NO_TIMESTAMP_v33"
  };
}

// ============================================================================
// CSS BUILDERS
// ============================================================================
function buildHookCSS(skill) {
  const name = skill.name || skill.id;
  const selector = `[data-${skill.hookType}="${escapeCSS(name)}"]`;
  return `${selector} { ${skill.css || ""} }`;
}

function buildStyleCSS(skill) {
  return skill.css || "";
}

function buildIconCSS(skill, Icons) {
  const name = skill.name || skill.id;
  const svg = Icons.resolve(skill.iconName || name);
  if (!svg) return "";
  const encoded = btoa(svg);

  return `
:root {
  --icon-${escapeCSS(name)}: url("data:image/svg+xml;base64,${encoded}");
}
`.trim();
}

function buildAnimationCSS(skill) {
  return skill.keyframes || "";
}

function buildTimingTokenCSS(tokens) {
  return Object.entries(tokens || {})
    .map(([k, v]) => `:root { --${escapeCSS(k)}: ${escapeCSS(v)}; }`)
    .join("\n");
}

// ============================================================================
// STYLE STATE — v33 IMMORTAL
// ============================================================================
const StyleState = {
  lastRoute: null,
  lastUpcomingRoutes: [],
  lastCSS: "",
  lastUpcomingCSS: "",
  lastEnvelope: null,
  lastBand: null,
  lastIntegrity: null,
  lastConsoleMeta: null,
  lastAdvantageV2: null,
  seq: 0
};

// ============================================================================
// MAIN ORGAN FACTORY — v33 IMMORTAL STYLES ORGAN
// ============================================================================
export function createPulseEvolutionaryStylesV33({
  IQMap = globalThis.PulseRealm?.PulseOrganismMap,
  Icons = null,
  Animations = null,
  MemoryOrgan = null,
  Router = null,
  CNS = null,
  log = console.log,
  warn = console.warn
} = {}) {
  if (!IQMap) {
    IQMap = globalThis.PulseRealm?.PulseOrganismMap || {};
  }

  // Create Icons Organ if not provided
  if (!Icons) {
    Icons = createPulseEvolutionaryIconsV33({ IQMap, MemoryOrgan, CNS, log, warn });
  }

  // Create Animations Organ if not provided
  if (!Animations) {
    Animations = createPulseEvolutionaryAnimationsV33({ IQMap, MemoryOrgan, CNS, log, warn });
  }

  function nextSeq() {
    StyleState.seq += 1;
    return StyleState.seq;
  }

  function safeLog(stage, details = {}) {
    try {
      log("✨ PULSE MULTIVERSAL RENDERER v32.0 — [PulseEvolutionaryStyles]", stage, {
        schemaVersion: STYLES_SCHEMA_VERSION,
        identity: StylesRole.identity,
        version: StylesRole.version,
        seq: StyleState.seq,
        ...details
      });
    } catch {}
  }

  function getLastEnvelope() {
    return StyleState.lastEnvelope;
  }

  function getLastBand() {
    return StyleState.band;
  }

  function getLastIntegrity() {
    return StyleState.integrity;
  }


  function emitCNSImpulse({ route, upcomingRoutes, envelope }) {
    if (!CNS.emitImpulse) return;
    try {
      CNS.emitImpulse("PulseEvolutionaryStyles-v33", {
        schemaVersion: STYLES_SCHEMA_VERSION,
        source: StylesRole.identity,
        route,
        upcomingRoutes,
        sizeTier: envelope.band.sizeTier,
        advantageV2: envelope.band.advantageV2,
        bandBalance: envelope.band.bandBalance,
        complexityHint: envelope.band.complexityHint,
        integrityStatus: envelope.integrity.status,
        integrityVersion: envelope.integrity.integrityVersion,
        degraded: envelope.integrity.degraded,
        signature: envelope.signature,
        timestamp: envelope.timestamp
      });
      safeLog("CNS_IMPULSE_OK", {
        route,
        sizeTier: envelope.band.sizeTier,
        integrityStatus: envelope.integrity.status
      });
    } catch (err) {
      warn("[PulseEvolutionaryStyles-v33] CNS_IMPULSE_ERROR", String(err));
      safeLog("CNS_IMPULSE_ERROR", { error: String(err) });
    }
  }

  // -------------------------------------------------------------------------
  // BUILD CSS FOR A SINGLE ROUTE
  // -------------------------------------------------------------------------
  function buildCSSForRoute(route) {
    const bundle = IQMap.getRouteUISkills(route) || {};
    const skills = IQMap.uiSkillsMap.skills || {};
    const tokens = IQMap.uiSkillsMap.timingTokens || {};

    const cssParts = [];

    // Base genomes (always once)
    cssParts.push(PulseEvolutionaryStylesBaseGenomeV30Plus.css || "");
    cssParts.push(PulseEvolutionaryAnimationsBaseGenomeV30.css || "");

    // Timing tokens
    cssParts.push(buildTimingTokenCSS(tokens));

    // Hooks
    for (const id of bundle.hooks || []) {
      const skill = skills[id];
      if (skill) cssParts.push(buildHookCSS(skill));
    }

    // Styles
    for (const id of bundle.styles || []) {
      const skill = skills[id];
      if (skill) cssParts.push(buildStyleCSS(skill));
    }

    // Icons
    for (const id of bundle.icons || []) {
      const skill = skills[id];
      if (skill) cssParts.push(buildIconCSS(skill, Icons));
    }

    // Animations
    for (const id of bundle.animations || []) {
      const skill = skills[id];
      if (skill) cssParts.push(buildAnimationCSS(skill));
    }

    const rawCSS = cssParts.join("\n\n");
    const mergedCSS = mergeCSSCascade(rawCSS);
    return mergedCSS;
  }

  // -------------------------------------------------------------------------
  // UPCOMING PAGE CSS (prewarm)
// -------------------------------------------------------------------------
  function buildUpcomingCSS(routeSequence = []) {
    const { flatSkills } = IQMap.planUpcomingSkills(routeSequence) || {
      flatSkills: []
    };
    const skills = IQMap.uiSkillsMap.skills || {};
    const tokens = IQMap.uiSkillsMap.timingTokens || {};

    const cssParts = [];

    cssParts.push(PulseEvolutionaryStylesBaseGenomeV30Plus.css || "");
    cssParts.push(PulseEvolutionaryAnimationsBaseGenomeV30.css || "");
    cssParts.push(buildTimingTokenCSS(tokens));

    for (const { kind, id } of flatSkills) {
      const skill = skills[id];
      if (!skill) continue;

      if (kind === "hooks") cssParts.push(buildHookCSS(skill));
      if (kind === "styles") cssParts.push(buildStyleCSS(skill));
      if (kind === "icons") cssParts.push(buildIconCSS(skill, Icons));
      if (kind === "animations") cssParts.push(buildAnimationCSS(skill));
    }

    const rawCSS = cssParts.join("\n\n");
    const mergedCSS = mergeCSSCascade(rawCSS);
    return mergedCSS;
  }

  // -------------------------------------------------------------------------
  // APPLY CSS TO DOM
  // -------------------------------------------------------------------------
  function applyCSS(css) {
    const tag = ensureStyleTag();
    if (!tag) return;
    tag.textContent = css;
    StyleState.lastCSS = css;
  }

  // -------------------------------------------------------------------------
  // MEMORY SNAPSHOT — v33
  // -------------------------------------------------------------------------
  function persistStylesEnvelope({ route, upcomingRoutes, css, upcomingCSS }) {
    const envelope = buildStylesExperienceEnvelopeV33({
      route,
      upcomingRoutes,
      css,
      upcomingCSS
    });

    StyleState.lastEnvelope = envelope;
    StyleState.lastBand = envelope.band;
    StyleState.lastIntegrity = envelope.integrity;
    StyleState.lastConsoleMeta = envelope.consoleMeta;
    StyleState.lastAdvantageV2 = envelope.band.advantageV2;
    StyleState.lastUpcomingRoutes = upcomingRoutes.slice();

    try {
      MemoryOrgan.core.setRouteSnapshot("styles", {
        schemaVersion: STYLES_SCHEMA_VERSION,
        identity: StylesRole.identity,
        version: StylesRole.version,
        route,
        upcomingRoutes,
        cssSize: envelope.band.cssSize,
        upcomingCssSize: envelope.band.upcomingSize,
        band: envelope.band,
        integrity: envelope.integrity,
        consoleMeta: envelope.consoleMeta,
        experience: envelope.experience,
        signature: envelope.signature,
        timestamp: envelope.timestamp
      });
      safeLog("MEMORY_WRITE_OK", {
        route,
        cssSize: envelope.band.cssSize,
        integrityStatus: envelope.integrity.status
      });
    } catch (err) {
      warn("[PulseEvolutionaryStyles-v33] MEMORY_WRITE_ERROR", String(err));
      safeLog("MEMORY_WRITE_ERROR", { error: String(err) });
    }

    emitCNSImpulse({ route, upcomingRoutes, envelope });
  }

  // -------------------------------------------------------------------------
  // PUBLIC API — IMMORTAL STYLES ORGAN v33
  // -------------------------------------------------------------------------
  const PulseEvolutionaryStylesV33 = {
    StylesRole,
    StyleState,
    schemaVersion: STYLES_SCHEMA_VERSION,
    identity: StylesRole.identity,
    version: StylesRole.version,
    getLastEnvelope,
    getLastBand,
    getLastIntegrity,

    applyRouteStyles(route, { upcomingRoutes = [] } = {}) {
      nextSeq();

      const css = buildCSSForRoute(route);
      applyCSS(css);
      StyleState.lastRoute = route;

      const upcomingCSS = upcomingRoutes.length
        ? buildUpcomingCSS(upcomingRoutes)
        : "";

      StyleState.lastUpcomingCSS = upcomingCSS;

      persistStylesEnvelope({
        route,
        upcomingRoutes,
        css,
        upcomingCSS
      });

      safeLog("APPLY_ROUTE_STYLES", {
        route,
        upcomingRoutes,
        cssSize: StyleState.lastEnvelope.band.cssSize ?? 0,
        upcomingSize: StyleState.lastEnvelope.band.upcomingSize ?? 0,
        sizeTier: StyleState.lastEnvelope.band.sizeTier ?? "unknown"
      });

      return {
        css,
        upcomingCSS,
        envelope: StyleState.lastEnvelope
      };
    },

    buildUpcomingStyles(routeSequence = []) {
      nextSeq();

      const css = buildUpcomingCSS(routeSequence);
      StyleState.lastUpcomingCSS = css;

      const envelope = buildStylesExperienceEnvelopeV33({
        route: StyleState.lastRoute,
        upcomingRoutes: routeSequence,
        css: StyleState.lastCSS,
        upcomingCSS: css
      });

      StyleState.lastEnvelope = envelope;
      StyleState.lastBand = envelope.band;
      StyleState.lastIntegrity = envelope.integrity;
      StyleState.lastConsoleMeta = envelope.consoleMeta;
      StyleState.lastAdvantageV2 = envelope.band.advantageV2;
      StyleState.lastUpcomingRoutes = routeSequence.slice();

      safeLog("BUILD_UPCOMING_STYLES", {
        routes: routeSequence,
        upcomingSize: envelope.band.upcomingSize,
        sizeTier: envelope.band.sizeTier
      });

      return {
        css,
        envelope
      };
    },

    refreshFromIQMap() {
      nextSeq();
      safeLog("REFRESH_FROM_IQMAP", {
        lastRoute: StyleState.lastRoute,
        lastUpcomingRoutes: StyleState.lastUpcomingRoutes
      });

      if (!StyleState.lastRoute) return null;

      const css = buildCSSForRoute(StyleState.lastRoute);
      applyCSS(css);

      const upcomingCSS = StyleState.lastUpcomingRoutes.length
        ? buildUpcomingCSS(StyleState.lastUpcomingRoutes)
        : "";

      const envelope = buildStylesExperienceEnvelopeV33({
        route: StyleState.lastRoute,
        upcomingRoutes: StyleState.lastUpcomingRoutes,
        css,
        upcomingCSS
      });

      StyleState.lastCSS = css;
      StyleState.lastUpcomingCSS = upcomingCSS;
      StyleState.lastEnvelope = envelope;
      StyleState.lastBand = envelope.band;
      StyleState.lastIntegrity = envelope.integrity;
      StyleState.lastConsoleMeta = envelope.consoleMeta;
      StyleState.lastAdvantageV2 = envelope.band.advantageV2;

      return {
        css,
        upcomingCSS,
        envelope
      };
    },

    getEnvelopeSnapshot() {
      return StyleState.lastEnvelope ?? null;
    },

    getConsoleMetaSnapshot() {
      return StyleState.lastConsoleMeta ?? null;
    },

    getAdvantageV2Snapshot() {
      return StyleState.lastAdvantageV2 ?? null;
    }
  };

  safeLog("Initializing Components..", {
    identity: PulseEvolutionaryStylesV33.identity,
    version: PulseEvolutionaryStylesV33.version
  });

  return PulseEvolutionaryStylesV33;
}

// ============================================================================
// GLOBAL REGISTRATION — v33
// ============================================================================
try {
  
    PulseRealm.PulseEvolutionaryStylesV33 = createPulseEvolutionaryStylesV33;
  
} catch {}
