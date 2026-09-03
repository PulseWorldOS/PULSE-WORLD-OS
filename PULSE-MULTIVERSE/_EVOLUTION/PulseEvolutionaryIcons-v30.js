// ============================================================================
// FILE: /_EVOLUTION/PulseEvolutionaryIcons-v33.js
// PULSE OS — v33-IMMORTAL-EVOLUTIONARY
// ICON ORGAN — ONEBAND-BINARY, GENOME-AWARE, ADVANTAGE-AWARE
// ============================================================================
//
// ROLE (v33 IMMORTAL):
//   • Builds FINAL icon maps for Pulse OS UI (one-band binary-first).
//   • Merges deterministically:
//       - Base Icon Genome (A0+ membrane)
//       - Evolvable icon packs (evolutionSources.icons)
//       - Local loader icons
//       - Tier icons (immortal, critical, warning, etc.)
//   • Provides:
//       - Deterministic icon resolution
//       - Binary-friendly variants
//       - GPU glow variants
//       - Route-aware icon bundles
//       - Upcoming-page icon prewarm
//       - CSS variable generation (v33 optimized)
//       - IQMap integration
//       - Memory-v33 integration
//       - Advantage field for CNS / Router / PageEvo
//
// CONTRACT:
//   • PURE FRONTEND ORGAN — no network, no filesystem, no eval.
//   • IMMORTAL: zero drift, zero mutation of input.
//   • Evolvable: new icons appear automatically.
//   • One-band outward surface, dual-band aware internally.
//
// SAFETY:
//   • DOM-safe: does not write to DOM directly.
//   • Memory-safe: no external side effects.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import {
  PulseEvolutionaryIconsGenomeV30 as PulseEvolutionaryIconsBaseGenomeV33,
  mergeIconGenomesV30 as mergeIconGenomes
} from "./PulseEvolutionaryIconsGenome-v30.js";


function safeLog(stage, details = {}) {
    try {
      console.log("🛰️ PULSE MULTIVERSAL ROUTER v32.0 — [PulseEvolutionaryIcons]", stage, details);
    } catch {}
  }


// ============================================================================
// CONSTANTS — v33
// ============================================================================
const ICONS_SCHEMA_VERSION = "v7";

// ============================================================================
// HELPERS — deterministic, pure
// ============================================================================

// Binary-friendly variant
function toBinaryFriendly(svg) {
  if (!svg) return "";
  return svg
    .replace(/stroke="[^"]+"/g, `stroke="#ffffff"`)
    .replace(/fill="[^"]+"/g, `fill="none"`)
    .replace(/filter="[^"]+"/g, "");
}

// GPU glow variant
function toGlowMap(svg) {
  if (!svg) return "";
  return svg
    .replace(/stroke-width="[^"]+"/g, `stroke-width="3"`)
    .replace(/stroke="[^"]+"/g, `stroke="#00eaff"`)
    .replace(/fill="[^"]+"/g, `fill="none"`);
}

// Encode SVG → CSS variable
function encodeSVG(svg) {
  if (!svg) return "";
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Advantage metrics
function computeIconAdvantage(svg) {
  if (!svg) return { size: 0, entropy: 0, tier: "empty" };

  const size = svg.length;
  const entropy = Math.min(1, (size % 997) / 997);

  const tier =
    size > 8000 ? "colossal" :
    size > 4000 ? "huge" :
    size > 2000 ? "large" :
    size > 800  ? "medium" :
    size > 0    ? "small" :
                  "empty";

  return { size, entropy, tier };
}

// ============================================================================
// ICON ORGAN FACTORY — IMMORTAL v33
// ============================================================================
export function createPulseEvolutionaryIconsV33({
  evolutionSources = {},
  localIconMap = {},
  IQMap = null,
  MemoryOrgan = null,
  CNS = null,
  log = console.log,
  warn = console.warn
} = {}) {

  // IMMORTAL deterministic merge
  const {
    baseIcons: mergedBaseIcons,
    expandedIcons: mergedExpandedIcons,
    tierIcons: mergedTierIcons
  } = mergeIconGenomes({
    evolutionSources,
    localIconMap,
    baseGenome: PulseEvolutionaryIconsBaseGenomeV33
  });

  const baseIcons = Object.freeze({ ...mergedBaseIcons });
  const expandedIcons = Object.freeze({ ...mergedExpandedIcons });
  const tierIcons = Object.freeze({ ...mergedTierIcons });

  // ========================================================================
  // ROUTE-AWARE ICON EXTRACTION
  // ========================================================================
  function getIconsForRoute(route) {
    if (!IQMap) return [];

    const bundle = IQMap.getRouteUISkills(route) || {};
    const skills = IQMap.uiSkillsMap.skills || {};

    const icons = [];

    for (const id of bundle.icons || []) {
      const skill = skills[id];
      if (skill.iconName) icons.push(skill.iconName);
    }

    return icons;
  }

  // UPCOMING PAGE ICON PREWARM
  function getIconsForUpcoming(routeSequence = []) {
    if (!IQMap) return [];

    const { flatSkills } = IQMap.planUpcomingSkills(routeSequence);
    const skills = IQMap.uiSkillsMap.skills || {};

    const icons = [];

    for (const { kind, id } of flatSkills) {
      if (kind !== "icons") continue;
      const skill = skills[id];
      if (skill.iconName) icons.push(skill.iconName);
    }

    return icons;
  }

  // ========================================================================
  // CSS VARIABLE GENERATION (v33 optimized)
  // ========================================================================
  function buildCSSVariables() {
    const css = [];

    const all = {
      ...baseIcons,
      ...expandedIcons,
      ...tierIcons
    };

    for (const [name, svg] of Object.entries(all)) {
      if (!svg) continue;
      css.push(`:root { --icon-${name}: url("${encodeSVG(svg)}"); }`);
    }

    return css.join("\n");
  }

  // ========================================================================
  // ICON RESOLUTION (one-band outward, dual-band aware)
// ========================================================================
  function resolveIcon(name, { tier = null, binaryMode = false, glow = false } = {}) {
    let svg =
      (tier && tierIcons[tier]) ||
      baseIcons[name] ||
      expandedIcons[name] ||
      tierIcons.immortal ||
      "";

    if (!svg) return "";

    if (glow) svg = toGlowMap(svg);
    else if (binaryMode) svg = toBinaryFriendly(svg);

    return svg;
  }

  // ========================================================================
  // ADVANTAGE SNAPSHOT
  // ========================================================================
  function computeAllAdvantages() {
    const out = {};

    const all = {
      ...baseIcons,
      ...expandedIcons,
      ...tierIcons
    };

    for (const [name, svg] of Object.entries(all)) {
      out[name] = computeIconAdvantage(svg);
    }

    return out;
  }

  // ========================================================================
  // MEMORY + CNS INTEGRATION — v33
  // ========================================================================
  function emitIconEnvelope() {
    const advantages = computeAllAdvantages();

    const envelope = {
      schemaVersion: ICONS_SCHEMA_VERSION,
      identity: "PulseEvolutionaryIcons-v33",
      version: "33.0-Immortal-Evolutionary",
      counts: {
        base: Object.keys(baseIcons).length,
        expanded: Object.keys(expandedIcons).length,
        tiers: Object.keys(tierIcons).length
      },
      advantages,
      timestamp: "NO_TIMESTAMP_v33"
    };

    try {
      MemoryOrgan.core.setRouteSnapshot("icons", envelope);
    } catch (err) {
      try {
        warn("[PulseEvolutionaryIcons-v33] MEMORY_WRITE_ERROR", String(err));
      } catch {}
    }

    try {
      CNS.emitImpulse("PulseEvolutionaryIcons-v33", {
        schemaVersion: ICONS_SCHEMA_VERSION,
        source: "icons",
        advantages,
        counts: envelope.counts,
        timestamp: envelope.timestamp
      });
    } catch (err) {
      try {
        warn("[PulseEvolutionaryIcons-v33] CNS_IMPULSE_ERROR", String(err));
      } catch {}
    }

    return envelope;
  }

  // ========================================================================
  // PUBLIC ORGAN — IMMORTAL ICON ENGINE v33
  // ========================================================================
  const PulseIconsV33 = Object.freeze({
    identity: "PulseEvolutionaryIcons-v33",
    version: "33.0-Immortal-Evolutionary",
    schemaVersion: ICONS_SCHEMA_VERSION,

    base: baseIcons,
    expanded: expandedIcons,
    tier: tierIcons,

    resolve(name, opts = {}) {
      return resolveIcon(name, opts);
    },

    list() {
      return {
        base: Object.keys(baseIcons),
        expanded: Object.keys(expandedIcons),
        tiers: Object.keys(tierIcons)
      };
    },

    forRoute(route) {
      return getIconsForRoute(route);
    },

    forUpcoming(routeSequence) {
      return getIconsForUpcoming(routeSequence);
    },

    cssVariables() {
      return buildCSSVariables();
    },

    getAdvantageSnapshot() {
      return computeAllAdvantages();
    },

    emitEnvelope() {
      return emitIconEnvelope();
    }
  });

  safeLog("Initializing Components..", {
    identity: "PulseEvolutionaryIcons-v33",
    version: "33.0-Immortal-Evolutionary",
    schemaVersion: ICONS_SCHEMA_VERSION
  });

  try {
    console.groupCollapsed(
      "%c✨ PULSE MULTIVERSAL RENDERER v32.0 — [PulseEvolutionaryIcons-v33] Scanning of Pulse World Expressions: (Icons)",
      "color:#7DF9FF; font-weight:bold;"
    );

    console.log("%cIcon Counts:", "color:#00FF9C; font-weight:bold;");
    console.log({
      baseCount: Object.keys(baseIcons).length,
      expandedCount: Object.keys(expandedIcons).length,
      tierCount: Object.keys(tierIcons).length
    });

    console.groupEnd();

  } catch {}

  return PulseIconsV33;
}


// ============================================================================
// GLOBAL REGISTRATION — v33
// ============================================================================
try {
  
    PulseRealm.PulseEvolutionaryIconsV33 = createPulseEvolutionaryIconsV33;
  
} catch {}
