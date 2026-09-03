// ============================================================================
// FILE: /PulseEvolutionaryIconsGenome-v30.js
// PULSE OS — v30++ IMMORTAL EVOLUTIONARY
// UNIVERSAL ICON GENOME (A0 ICON MEMBRANE)
// ============================================================================
//
// ROLE (IMMORTAL):
//   • Foundational icon genome for Pulse OS UI
//   • Provides universal icon membrane (A0)
//   • Deterministic, drift-proof, evolvable
//   • Auto-integrated with:
//       - Icons Organ (IMMORTAL)
//       - Styles Organ (IMMORTAL)
//       - Animations Organ (IMMORTAL)
//       - IQMap UI Skills Genome
//       - Memory-v30++
//       - Router-v30
//
// CONTRACT:
//   • STATIC but EVOLVABLE
//   • Never mutated at runtime
//   • Always included exactly once
//   • Page-specific icon skills may extend/override
//
// SAFETY:
//   • IMMORTAL: deterministic, pure, zero side effects
//   • Zero network, zero filesystem, zero randomness
//   • Zero dynamic imports, zero eval
//   • Zero mutation of inputs
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

export const ICON_SCHEMA_VERSION = "v30++";

// ============================================================================
// GPU‑FRIENDLY GLOW + STROKE MAPS (IMMORTAL, PURE)
// ============================================================================

const GlowMapV30 = Object.freeze({
  cyan:    "drop-shadow(0 0 6px rgba(0,255,255,0.45))",
  green:   "drop-shadow(0 0 6px rgba(0,255,150,0.45))",
  red:     "drop-shadow(0 0 6px rgba(255,60,60,0.45))",
  gold:    "drop-shadow(0 0 8px rgba(255,215,0,0.55))",
  purple:  "drop-shadow(0 0 8px rgba(180,0,255,0.55))",
  white:   "drop-shadow(0 0 6px rgba(255,255,255,0.45))",
  blue:    "drop-shadow(0 0 6px rgba(80,160,255,0.45))",
  orange:  "drop-shadow(0 0 6px rgba(255,150,0,0.45))",
  yellow:  "drop-shadow(0 0 6px rgba(255,255,0,0.45))"
});

const StrokeMapV30 = Object.freeze({
  cyan:    "#00eaff",
  green:   "#00ff99",
  red:     "#ff4d4d",
  gold:    "#ffd700",
  purple:  "#b300ff",
  white:   "#ffffff",
  black:   "#000000",
  blue:    "#4da3ff",
  orange:  "#ff9900",
  yellow:  "#ffff66",
  brown:   "#8b4513"
});

// ============================================================================
// IMMORTAL ICON HELPERS (PURE BUILDERS)
// ============================================================================

function svg(strings, ...values) {
  return strings.reduce((acc, s, i) => acc + s + (values[i] ?? ""), "");
}

function encodeSVG(svgString) {
  // IMMORTAL: deterministic, no randomness, no IO
  if (typeof btoa === "function") {
    return btoa(svgString);
  }
  // Fallback for non-browser environments (pure, deterministic)
  return Buffer.from(svgString, "utf8").toString("base64");
}

// Optional: GPU-friendly glow transform
export function buildGlowMapV30(svgSource) {
  return svgSource
    .replace(/stroke-width="[^"]+"/g, `stroke-width="3"`)
    .replace(/stroke="[^"]+"/g, `stroke="${StrokeMapV30.cyan}"`)
    .replace(/fill="[^"]+"/g, `fill="none"`);
}

// ============================================================================
// BASE ICONS (A0 MEMBRANE) — IMMORTAL CORE
// ============================================================================

const BaseIconsV30 = Object.freeze({
  pulse: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M3 12h4l2-6 4 12 2-6h6"
            stroke="${StrokeMapV30.cyan}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${GlowMapV30.cyan}" />
    </svg>
  `,

  check: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7"
            stroke="${StrokeMapV30.green}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${GlowMapV30.green}" />
    </svg>
  `,

  alert: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            stroke="${StrokeMapV30.red}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${GlowMapV30.red}" />
    </svg>
  `,

  info: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10"
              stroke="${StrokeMapV30.cyan}"
              stroke-width="2"
              filter="${GlowMapV30.cyan}" />
      <path d="M12 16v-4m0-4h.01"
            stroke="${StrokeMapV30.cyan}"
            stroke-width="2"
            stroke-linecap="round" />
    </svg>
  `,

  stable: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10"
              stroke="${StrokeMapV30.green}"
              stroke-width="2"
              filter="${GlowMapV30.green}" />
      <path d="M8 12l3 3 5-5"
            stroke="${StrokeMapV30.green}"
            stroke-width="2"
            stroke-linecap="round" />
    </svg>
  `
});

// ============================================================================
// TIER ICONS (IMMORTAL, CRITICAL, SYSTEM, EXPERIMENTAL)
// ============================================================================

const TierIconsV30 = Object.freeze({
  immortal: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8"
              stroke="${StrokeMapV30.gold}"
              stroke-width="2"
              filter="${GlowMapV30.gold}" />
    </svg>
  `,

  critical: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8"
              stroke="${StrokeMapV30.red}"
              stroke-width="2"
              filter="${GlowMapV30.red}" />
    </svg>
  `,

  system: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8"
              stroke="${StrokeMapV30.blue}"
              stroke-width="2"
              filter="${GlowMapV30.blue}" />
    </svg>
  `,

  experimental: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8"
              stroke="${StrokeMapV30.purple}"
              stroke-width="2"
              filter="${GlowMapV30.purple}" />
    </svg>
  `
});

// ============================================================================
// EXPANDED ICON PACK (V30) — UI, SYSTEM, TROPIC, TECH, ECONOMY, WEATHER
// ============================================================================

const ExpandedIconsV30 = Object.freeze({
  // UI / SYSTEM --------------------------------------------------------------
  plus: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14"
            stroke="${StrokeMapV30.white}"
            stroke-width="2"
            filter="${GlowMapV30.purple}" />
    </svg>
  `,

  edit: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 20h9M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z"
            stroke="${StrokeMapV30.gold}"
            stroke-width="2"
            filter="${GlowMapV30.gold}" />
    </svg>
  `,

  close: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M6 18L18 6"
            stroke="${StrokeMapV30.red}"
            stroke-width="2"
            filter="${GlowMapV30.red}" />
    </svg>
  `,

  menu: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16M4 12h16M4 18h16"
            stroke="${StrokeMapV30.white}"
            stroke-width="2"
            filter="${GlowMapV30.cyan}" />
    </svg>
  `,

  warning: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 9v4m0 4h.01M3 19h18L12 3 3 19z"
            stroke="${StrokeMapV30.yellow}"
            stroke-width="2"
            filter="${GlowMapV30.yellow}" />
    </svg>
  `,

  danger: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10"
              stroke="${StrokeMapV30.red}"
              stroke-width="2"
              filter="${GlowMapV30.red}" />
      <path d="M12 7v6m0 4h.01"
            stroke="${StrokeMapV30.red}"
            stroke-width="2" />
    </svg>
  `,

  user: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4"
              stroke="${StrokeMapV30.white}"
              stroke-width="2"
              filter="${GlowMapV30.white}" />
      <path d="M4 20c1-4 4-6 8-6s7 2 8 6"
            stroke="${StrokeMapV30.white}"
            stroke-width="2"
            stroke-linecap="round" />
    </svg>
  `,

  home: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M3 12l9-8 9 8v8H3v-8z"
            stroke="${StrokeMapV30.cyan}"
            stroke-width="2"
            filter="${GlowMapV30.cyan}" />
    </svg>
  `,

  // NODEADMIN / SYSTEM ROLES -------------------------------------------------
  nodeadmin: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4"
              stroke="${StrokeMapV30.blue}"
              stroke-width="2"
              filter="${GlowMapV30.blue}" />
      <path d="M4 20c1-4 4-6 8-6s7 2 8 6"
            stroke="${StrokeMapV30.blue}"
            stroke-width="2"
            stroke-linecap="round" />
    </svg>
  `,

  server: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="6"
            stroke="${StrokeMapV30.yellow}"
            stroke-width="2"
            filter="${GlowMapV30.yellow}" />
      <rect x="4" y="14" width="16" height="6"
            stroke="${StrokeMapV30.yellow}"
            stroke-width="2"
            filter="${GlowMapV30.yellow}" />
    </svg>
  `,

  router_node: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3"
              stroke="${StrokeMapV30.blue}"
              stroke-width="2"
              filter="${GlowMapV30.blue}" />
      <path d="M12 5v2M12 17v2M5 12h2M17 12h2M7 7l1.5 1.5M15.5 15.5L17 17M7 17l1.5-1.5M15.5 8.5L17 7"
            stroke="${StrokeMapV30.white}"
            stroke-width="1.5" />
    </svg>
  `,

  // TROPIC / BELIZE ----------------------------------------------------------
  palm: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 22v-8M8 8c2-3 6-3 8 0M6 6c2-2 6-2 8 0M10 7c-2-2-4-2-6-1"
            stroke="${StrokeMapV30.green}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${GlowMapV30.green}" />
    </svg>
  `,

  beach_wave: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M3 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0"
            stroke="${StrokeMapV30.cyan}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${GlowMapV30.cyan}" />
      <path d="M3 20h18"
            stroke="${StrokeMapV30.white}"
            stroke-width="1"
            stroke-linecap="round" />
    </svg>
  `,

  coconut: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="13" r="6"
              stroke="${StrokeMapV30.brown}"
              stroke-width="2" />
      <circle cx="10" cy="11" r="1"
              stroke="${StrokeMapV30.white}"
              stroke-width="1" />
      <circle cx="13" cy="10" r="1"
              stroke="${StrokeMapV30.white}"
              stroke-width="1" />
    </svg>
  `,

  // WEATHER ------------------------------------------------------------------
  sun: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4"
              stroke="${StrokeMapV30.yellow}"
              stroke-width="2"
              filter="${GlowMapV30.yellow}" />
      <path d="M12 3v2M12 19v2M5 12h2M17 12h2M6 6l1.5 1.5M16.5 16.5L18 18M6 18l1.5-1.5M16.5 7.5L18 6"
            stroke="${StrokeMapV30.yellow}"
            stroke-width="1.5" />
    </svg>
  `,

  rain: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M6 14h10a3 3 0 000-6 4 4 0 00-7.8 1"
            stroke="${StrokeMapV30.white}"
            stroke-width="2"
            stroke-linecap="round" />
      <path d="M8 16l-1 3M12 16l-1 3M16 16l-1 3"
            stroke="${StrokeMapV30.cyan}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${GlowMapV30.cyan}" />
    </svg>
  `,

  storm: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M6 13h10a3 3 0 000-6 4 4 0 00-7.8 1"
            stroke="${StrokeMapV30.white}"
            stroke-width="2"
            stroke-linecap="round" />
      <path d="M11 14l-2 4h3l-2 4"
            stroke="${StrokeMapV30.yellow}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${GlowMapV30.yellow}" />
    </svg>
  `,

  // TECH / OS ----------------------------------------------------------------
  cpu: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="7" y="7" width="10" height="10"
            stroke="${StrokeMapV30.white}"
            stroke-width="2"
            filter="${GlowMapV30.white}" />
      <rect x="10" y="10" width="4" height="4"
            stroke="${StrokeMapV30.cyan}"
            stroke-width="2"
            filter="${GlowMapV30.cyan}" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"
            stroke="${StrokeMapV30.white}"
            stroke-width="1.5" />
    </svg>
  `,

  gpu: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="4" y="6" width="16" height="12"
            stroke="${StrokeMapV30.green}"
            stroke-width="2"
            filter="${GlowMapV30.green}" />
      <circle cx="12" cy="12" r="3"
              stroke="${StrokeMapV30.green}"
              stroke-width="2" />
      <path d="M4 9h-2M4 15h-2M22 9h-2M22 15h-2"
            stroke="${StrokeMapV30.white}"
            stroke-width="1.5" />
    </svg>
  `,

  ai_brain: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M9 5a3 3 0 00-3 3v2a3 3 0 003 3v2a3 3 0 003 3"
            stroke="${StrokeMapV30.purple}"
            stroke-width="2"
            filter="${GlowMapV30.purple}" />
      <path d="M15 5a3 3 0 013 3v2a3 3 0 01-3 3v2a3 3 0 01-3 3"
            stroke="${StrokeMapV30.cyan}"
            stroke-width="2"
            filter="${GlowMapV30.cyan}" />
    </svg>
  `,

  binary_matrix: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M6 6h3v3H6zM11 6h3v3h-3zM16 6h3v3h-3zM6 11h3v3H6zM11 11h3v3h-3zM16 11h3v3h-3zM6 16h3v3H6zM11 16h3v3h-3zM16 16h3v3h-3z"
            stroke="${StrokeMapV30.white}"
            stroke-width="1.2"
            filter="${GlowMapV30.white}" />
    </svg>
  `,

  diagnostics_pulse: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M3 12h4l2-4 3 8 2-4h7"
            stroke="${StrokeMapV30.cyan}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${GlowMapV30.cyan}" />
    </svg>
  `,

  // ECONOMY ------------------------------------------------------------------
  coin: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="6"
              stroke="${StrokeMapV30.gold}"
              stroke-width="2"
              filter="${GlowMapV30.gold}" />
      <path d="M10 10h4v4h-4z"
            stroke="${StrokeMapV30.gold}"
            stroke-width="1.5" />
    </svg>
  `,

  wallet: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="4" y="7" width="16" height="10" rx="2"
            stroke="${StrokeMapV30.orange}"
            stroke-width="2"
            filter="${GlowMapV30.orange}" />
      <circle cx="16" cy="12" r="1"
              stroke="${StrokeMapV30.white}"
              stroke-width="1" />
    </svg>
  `,

  trending_up: svg`
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 16l5-5 4 4 7-9"
            stroke="${StrokeMapV30.green}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${GlowMapV30.green}" />
      <path d="M15 7h5v5"
            stroke="${StrokeMapV30.green}"
            stroke-width="2" />
    </svg>
  `
});

// ============================================================================
// IMMORTAL GENOME OBJECT (V30++)
// ============================================================================

export const PulseEvolutionaryIconsGenomeV30 = Object.freeze({
  schemaVersion: ICON_SCHEMA_VERSION,
  identity: "PulseEvolutionaryIconsGenome",
  version: "30.0-Immortal-Evolutionary",
  layer: "pulse_ui",
  role: "icon_genome_a0",

  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    schemaVersioned: true,
    iconGenome: true,
    binaryAware: true,
    glowAware: true,
    tierAware: true,
    evolvable: true,
    futureEvolutionReady: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroRandomness: true
  }),

  baseIcons: BaseIconsV30,
  tierIcons: TierIconsV30,
  expandedIcons: ExpandedIconsV30,
  glow: GlowMapV30,
  stroke: StrokeMapV30
});

// ============================================================================
// IMMORTAL MERGER — PURE, DETERMINISTIC (V30++)
// ============================================================================
//
// Merge order (IMMORTAL):
//   1. Base Genome (cannot be overridden)
//   2. Tier icons (base + evolvable tiers)
//   3. Evolvable icons (evolutionSources.icons)
//   4. Local loader icons (highest priority)
//
// No mutation of inputs, no global state.
// ============================================================================


export function mergeIconGenomesV30({
  evolutionSources = {},
  localIconMap = {},
  baseGenome = PulseEvolutionaryIconsGenomeV30
} = {}) {
  const baseIcons = Object.freeze({ ...baseGenome.baseIcons });
  const baseTiers = Object.freeze({ ...baseGenome.tierIcons });

  const evoIcons = Object.freeze({ ...(evolutionSources.icons || {}) });
  const evoTiers = Object.freeze({ ...(evolutionSources.iconTiers || {}) });

  const localIcons = Object.freeze({ ...(localIconMap || {}) });

  const expandedIcons = Object.freeze({
    ...baseGenome.expandedIcons,
    ...evoIcons,
    ...localIcons
  });

  const tierIcons = Object.freeze({
    ...baseTiers,
    ...evoTiers
  });

  return Object.freeze({
    baseIcons,
    expandedIcons,
    tierIcons
  });
}

// ============================================================================
// EVOLUTION + LOCAL LOADERS (PURE, NO GLOBAL MUTATION)
// ============================================================================

export function buildEvolutionaryIconsV30(evolutionSources = {}, currentExpanded = {}) {
  const icons = evolutionSources.icons || {};
  return Object.freeze({
    ...currentExpanded,
    ...icons
  });
}

export function loadLocalIconsV30(localIconMap = {}, currentExpanded = {}) {
  return Object.freeze({
    ...currentExpanded,
    ...localIconMap
  });
}

// ============================================================================
// ROUTE-AWARE + UPCOMING-PAGE AWARE ICON PREWARM (V30++)
// ============================================================================
//
// IQMap.getRouteUISkills(route) returns:
//   { icons: ["vault", "mascot", ...], ... }
//
// IQMap.planUpcomingSkills([route]) returns:
//   { flatSkills: [{kind:"icons", id:"vault"}, ...] }
//
// This remains pure: no mutation, no IO.
// ============================================================================


export function getIconsForRouteV30(IQMap, route) {
  const bundle = (IQMap && IQMap.getRouteUISkills(route)) || {};
  const skills = (IQMap && IQMap.uiSkillsMap && IQMap.uiSkillsMap.skills) || {};

  const icons = [];

  for (const id of bundle.icons || []) {
    const skill = skills[id];
    if (skill && skill.iconName) icons.push(skill.iconName);
  }

  return icons;
}

export function getIconsForUpcomingV30(IQMap, routeSequence = []) {
  const plan = (IQMap && IQMap.planUpcomingSkills(routeSequence)) || { flatSkills: [] };
  const flatSkills = plan.flatSkills || [];
  const skills = (IQMap && IQMap.uiSkillsMap && IQMap.uiSkillsMap.skills) || {};

  const icons = [];

  for (const { kind, id } of flatSkills) {
    if (kind !== "icons") continue;
    const skill = skills[id];
    if (skill && skill.iconName) icons.push(skill.iconName);
  }

  return icons;
}

// ============================================================================
// AUTO-GENERATE CSS VARIABLES FOR ICONS (V30++)
// ============================================================================
//
// Emits:
//
//   :root { --icon-vault: url("data:image/svg+xml;base64,..."); }
//
// Pure: no DOM writes, just returns CSS string.
// ============================================================================


export function buildIconCSSVariablesV30(genome = PulseEvolutionaryIconsGenomeV30) {
  const all = Object.freeze({
    ...genome.baseIcons,
    ...genome.expandedIcons,
    ...genome.tierIcons
  });

  const css = [];

  for (const [name, svgSource] of Object.entries(all)) {
    const encoded = encodeSVG(svgSource);
    css.push(`:root { --icon-${name}: url("data:image/svg+xml;base64,${encoded}"); }`);
  }

  return css.join("\n");
}
