// ============================================================================
// FILE: /_EVOLUTION/PulseEvolutionaryAnimations-v33.js
// PULSE OS — v33-IMMORTAL-EVOLUTIONARY
// ANIMATION ORGAN — GENOME-AWARE, ADVANTAGE-AWARE, ROUTE+UPCOMING+MEMORY-AWARE
// ============================================================================
//
// ROLE (IMMORTAL v33):
//   • Builds FINAL animation CSS for Pulse OS UI (symbolic outward surface,
//     dual-band aware via v33 band metrics).
//   • Merges deterministically:
//       - Base Animation Genome (A0 membrane)
//       - Evolvable animation packs (evolutionSources.animations)
//       - Local animation packs (loader organ)
//       - IQMap animation skills (route + upcoming)
//   • Provides:
//       - Deterministic keyframe generation
//       - Timing token emission
//       - Route-aware animation bundles
//       - Upcoming-page animation prewarm
//       - Memory-v33 integration (experience blocks v2 + integrity v2)
//       - Styles-v33 integration hooks
//       - Unified advantage field v2 for CNS / Router / Memory / Brain
//
// CONTRACT:
//   • PURE FRONTEND ORGAN — no network, no timers, no eval, no DOM writes.
//   • Deterministic CSS generation (IMMORTAL).
//   • Evolvable: new animation packs appear automatically via inputs.
//   • One-band outward surface (CSS string), dual-band aware internally.
//
// SAFETY:
//   • DOM-safe: does NOT write to DOM directly.
//   • Memory-safe: no external side effects.
//   • Zero randomness, zero mutation of inputs.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import {
  PulseEvolutionaryAnimationsBaseGenomeV30 as PulseEvolutionaryAnimationsBaseGenomeV33
} from "./PulseEvolutionaryAnimationsGenome-v30.js";




// ============================================================================
// ROLE META — v33 IMMORTAL EVOLUTIONARY
// ============================================================================
export const AnimationsRole = Object.freeze({
  layer: "PulseEvolutionaryAnimations",
  version: "v33-Immortal-Evolutionary",
  role: "UI_ANIMATION_GENOME_ENGINE",
  identity: "PulseUI.EvolutionaryAnimations-v33",

  lineage: Object.freeze({
    root: "PulseAnimations-v11.3",
    parent: "PulseEvolutionaryAnimations-v30",
    ancestry: [
      "PulseAnimations-v11.3",
      "PulseAnimations-v14",
      "PulseAnimations-v16",
      "PulseEvolutionaryAnimations-v20",
      "PulseEvolutionaryAnimations-v30-Immortal",
      "PulseEvolutionaryAnimations-v33-Immortal"
    ]
  }),

  evo: Object.freeze({
    animationOrgan: true,
    animationGenomeAware: true,
    routeAware: true,
    upcomingAware: true,
    iqMapAware: true,
    memoryAware: true,
    stylesAware: true,

    dualBandAware: true,
    unifiedAdvantageField: true,
    unifiedAdvantageFieldV2: true,
    bandMetricsAware: true,
    genomeDeltaAware: true,
    integrityAware: true,
    integrityV2: true,
    experienceBlocksAware: true,
    experienceBlocksV2: true,

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
    v30ImpulseAligned: true,

    v33GenomeAware: true,
    v33AdvantageView: true,
    v33MemoryAligned: true,
    v33RouterAligned: true,
    v33ImpulseAligned: true,
    v33ConsoleAligned: true
  }),

  bands: Object.freeze({
    supported: ["symbolic"],
    default: "symbolic",
    behavior: "animation-genome-engine"
  })
});

// ============================================================================
// CONSTANTS — v33
// ============================================================================
const ANIMATIONS_SCHEMA_VERSION = "v7";

// ============================================================================
// HELPERS — deterministic, pure (v33)
// ============================================================================
function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h >>> 0;
}

function clamp01(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  if (n < 0) return 0;
  if (n > 1) return 1;
  return n;
}

function buildKeyframesCSS(skill) {
  if (!skill || !skill.keyframes) return "";
  return skill.keyframes;
}

function buildTimingTokenCSS(tokens) {
  return Object.entries(tokens || {})
    .map(([k, v]) => `:root { --${k}: ${v}; }`)
    .join("\n");
}

// ============================================================================
// BAND METRICS — v33 (advantageV2, balance, complexity)
// ============================================================================
function computeBandMetrics({ css, upcomingCss }) {
  const cssSize = (css || "").length;
  const upcomingSize = (upcomingCss || "").length;
  const total = cssSize + upcomingSize || 1;

  const symbolicWeight = cssSize / total;
  const binaryWeight = upcomingSize / total;

  const density = binaryWeight;
  const entropyHint = clamp01(1 - Math.abs(0.5 - density) * 2);
  const bandBalance = clamp01(1 - Math.abs(symbolicWeight - binaryWeight));
  const complexityHint = clamp01(density * entropyHint);

  const advantage = 0.4 * symbolicWeight + 0.6 * binaryWeight;

  const advantageV2 = clamp01(
    0.3 * symbolicWeight +
    0.5 * binaryWeight +
    0.2 * bandBalance
  );

  const sizeTier =
    total > 256 * 1024 ? "colossal" :
    total > 128 * 1024 ? "huge" :
    total > 64 * 1024  ? "large" :
    total > 16 * 1024  ? "medium" :
    total > 0          ? "small" :
                         "empty";

  return {
    schemaVersion: ANIMATIONS_SCHEMA_VERSION,
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

// ============================================================================
// INTEGRITY — v33 (entropy + balance + presence)
// ============================================================================
function computeIntegrity({ band }) {
  const base =
    0.35 * (band.advantageV2 ?? band.advantage ?? 0.5) +
    0.25 * (band.entropyHint ?? 0.5) +
    0.20 * (band.bandBalance ?? 0.5) +
    0.20 * (band.totalSize > 0 ? 1 : 0);

  const score = clamp01(base);

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

// ============================================================================
// EXPERIENCE BLOCKS — v33
// ============================================================================
function buildExperienceBlocks({ route, upcomingRoutes, band, integrity, genomeMeta }) {
  return {
    schemaVersion: ANIMATIONS_SCHEMA_VERSION,
    blocks: [
      {
        id: "animations.band",
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
        id: "animations.integrity",
        kind: "integrity",
        route,
        score: integrity.score,
        status: integrity.status,
        degraded: integrity.degraded,
        integrityVersion: integrity.integrityVersion
      },
      {
        id: "animations.genome",
        kind: "genomeMeta",
        route,
        baseGenomeVersion: genomeMeta.baseGenomeVersion,
        evoPackCount: genomeMeta.evoPackCount,
        localPackCount: genomeMeta.localPackCount,
        iqVersion: genomeMeta.iqVersion
      }
    ]
  };
}

// ============================================================================
// ENVELOPE BUILDER — v33 IMMORTAL
// ============================================================================
function buildAnimationEnvelope({
  route,
  upcomingRoutes,
  css,
  upcomingCss,
  genomeMeta
}) {
  const band = computeBandMetrics({ css, upcomingCss });
  const integrity = computeIntegrity({ band });
  const experience = buildExperienceBlocks({
    route,
    upcomingRoutes,
    band,
    integrity,
    genomeMeta
  });

  const base = {
    schemaVersion: ANIMATIONS_SCHEMA_VERSION,
    identity: AnimationsRole.identity,
    version: AnimationsRole.version,
    route,
    upcomingRoutes,
    css,
    upcomingCss,
    band,
    integrity,
    experience,
    timestamp: "NO_TIMESTAMP_v33"
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

  const signature =
    "ANIM_SIG_V33_" +
    hashString(sigBase).toString(16).padStart(8, "0");

  const envelopeId =
    "ANIM-" +
    ANIMATIONS_SCHEMA_VERSION +
    "-" +
    hashString(signature).toString(16).padStart(8, "0");

  return {
    ...base,
    id: envelopeId,
    signature,
    consoleMeta: {
      sizeTier: band.sizeTier,
      advantageV2: band.advantageV2,
      bandBalance: band.bandBalance,
      complexityHint: band.complexityHint,
      integrityStatus: integrity.status,
      signature
    }
  };
}

// ============================================================================
// ANIM STATE — v33 IMMORTAL
// ============================================================================
const AnimState = {
  // Route continuity
  lastRoute: null,
  lastUpcomingRoutes: [],

  // CSS surfaces
  lastCSS: "",
  lastUpcomingCSS: "",

  // Envelope continuity
  lastEnvelope: null,
  lastSignature: null,

  // Advantage fields
  lastAdvantage: null,     // legacy v30
  lastAdvantageV2: null,   // v33

  // Band metrics v33
  lastBandBalance: null,
  lastComplexityHint: null,

  // Integrity v33
  lastIntegrity: null,

  // Experience v33
  lastExperience: null,

  // Console meta v33
  lastConsoleMeta: null,

  // Genome delta readiness
  lastGenomeDelta: null
};


// ============================================================================
// ORGAN FACTORY — IMMORTAL v33
// ============================================================================
export function createPulseEvolutionaryAnimationsV33({
  IQMap,
  evolutionSources = {},
  localAnimationMap = {},
  MemoryOrgan = null,
  CNS = null,
  log = console.log,
  warn = console.warn
} = {}) {
  if (!IQMap) {
    IQMap = globalThis.PulseRealm?.PulseOrganismMap || {};
  }

  // -------------------------------------------------------------------------
  // LOGGING — v33 identity
  // -------------------------------------------------------------------------
  function safeLog(stage, details = {}) {
    try {
      log(`✨ PULSE MULTIVERSAL RENDERER v32.0 — [PulseEvolutionaryAnimations] ${stage}`, {
        schemaVersion: ANIMATIONS_SCHEMA_VERSION,
        identity: AnimationsRole.identity,
        version: AnimationsRole.version,
        ...details
      });
    } catch {}
  }

  // -------------------------------------------------------------------------
  // MERGE ANIMATION SOURCES (IMMORTAL, ONE-BAND SYMBOLIC)
// -------------------------------------------------------------------------
  const baseAnimations = PulseEvolutionaryAnimationsBaseGenomeV33.animations || {};
  const evoAnimations = evolutionSources.animations || {};
  const localAnimations = localAnimationMap || {};

  const mergedAnimations = Object.freeze({
    ...baseAnimations,
    ...evoAnimations,
    ...localAnimations
  });

  const genomeMeta = {
    baseGenomeVersion: PulseEvolutionaryAnimationsBaseGenomeV33.version || "v33",
    evoPackCount: Object.keys(evoAnimations).length,
    localPackCount: Object.keys(localAnimations).length,
    iqVersion: IQMap.version || null
  };

  // -------------------------------------------------------------------------
  // BUILD CSS FOR A SINGLE ROUTE
  // -------------------------------------------------------------------------
  function buildCSSForRoute(route) {
    const bundle = IQMap.getRouteUISkills(route) || {};
    const skills = IQMap.uiSkillsMap.skills || {};
    const tokens = IQMap.uiSkillsMap.timingTokens || {};

    const cssParts = [];

    // Base animation genome (A0 membrane)
    cssParts.push(PulseEvolutionaryAnimationsBaseGenomeV33.css || "");

    // Timing tokens
    cssParts.push(buildTimingTokenCSS(tokens));

    // Route-specific animation skills
    for (const id of bundle.animations || []) {
      const skill = skills[id];
      if (skill) cssParts.push(buildKeyframesCSS(skill));
    }

    // Evolvable + local animation packs
    for (const key of Object.keys(mergedAnimations)) {
      const pack = mergedAnimations[key];
      if (pack && pack.keyframes) {
        cssParts.push(pack.keyframes);
      }
    }

    return cssParts.join("\n\n");
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

    cssParts.push(PulseEvolutionaryAnimationsBaseGenomeV33.css || "");
    cssParts.push(buildTimingTokenCSS(tokens));

    for (const { kind, id } of flatSkills) {
      if (kind !== "animations") continue;
      const skill = skills[id];
      if (skill) cssParts.push(buildKeyframesCSS(skill));
    }

    // Evolvable + local animation packs
    for (const key of Object.keys(mergedAnimations)) {
      const pack = mergedAnimations[key];
      if (pack && pack.keyframes) {
        cssParts.push(pack.keyframes);
      }
    }

    return cssParts.join("\n\n");
  }

  // -------------------------------------------------------------------------
  // ENVELOPE + MEMORY + CNS — v33 IMMORTAL
  // -------------------------------------------------------------------------
  function finalizeEnvelope({ route, upcomingRoutes, css, upcomingCss }) {
    const envelope = buildAnimationEnvelope({
      route,
      upcomingRoutes,
      css,
      upcomingCss,
      genomeMeta
    });

    // STATE CONTINUITY — v33
    AnimState.lastRoute = route;
    AnimState.lastUpcomingRoutes = upcomingRoutes.slice();
    AnimState.lastCSS = css;
    AnimState.lastUpcomingCSS = upcomingCss;
    AnimState.lastEnvelope = envelope;
    AnimState.lastSignature = envelope.signature;

    // v33 band metrics continuity
    AnimState.lastAdvantage = envelope.band.advantage;       // legacy
    AnimState.lastAdvantageV2 = envelope.band.advantageV2;   // v33
    AnimState.lastBandBalance = envelope.band.bandBalance;
    AnimState.lastComplexityHint = envelope.band.complexityHint;

    // v33 integrity continuity
    AnimState.lastIntegrity = envelope.integrity;

    // v33 experience continuity
    AnimState.lastExperience = envelope.experience;

    // v33 console meta continuity
    AnimState.lastConsoleMeta = envelope.consoleMeta;

    // Memory integration (optional, advisory-style)
    try {
      MemoryOrgan.core.setRouteSnapshot("animations", envelope);
      safeLog("MEMORY_WRITE_OK", {
        route,
        id: envelope.id,
        integrityStatus: envelope.integrity.status
      });
    } catch (err) {
      warn("[PulseEvolutionaryAnimations-v33] MEMORY_WRITE_ERROR", String(err));
      safeLog("MEMORY_WRITE_ERROR", { error: String(err) });
    }

    // CNS impulse (optional, v33)
    try {
      CNS.emitImpulse("PulseEvolutionaryAnimations-v33", {
        schemaVersion: ANIMATIONS_SCHEMA_VERSION,
        source: AnimationsRole.identity,
        route,
        upcomingRoutes,

        // v33 band metrics
        advantageV2: envelope.band.advantageV2,
        bandBalance: envelope.band.bandBalance,
        complexityHint: envelope.band.complexityHint,

        // legacy fields preserved
        advantage: envelope.band.advantage,
        sizeTier: envelope.band.sizeTier,

        // integrity v33
        integrityStatus: envelope.integrity.status,
        integrityVersion: envelope.integrity.integrityVersion,
        degraded: envelope.integrity.degraded,

        // signature + timestamp
        signature: envelope.signature,
        timestamp: envelope.timestamp
      });

      safeLog("CNS_IMPULSE_OK", {
        route,
        sizeTier: envelope.band.sizeTier,
        integrityStatus: envelope.integrity.status
      });
    } catch (err) {
      warn("[PulseEvolutionaryAnimations-v33] CNS_IMPULSE_ERROR", String(err));
      safeLog("CNS_IMPULSE_ERROR", { error: String(err) });
    }

    return envelope;
  }

  // -------------------------------------------------------------------------
  // PUBLIC API — IMMORTAL ANIMATION ORGAN v33
  // -------------------------------------------------------------------------
  const PulseEvolutionaryAnimationsV33 = {
    AnimationsRole,
    AnimState,
    schemaVersion: ANIMATIONS_SCHEMA_VERSION,

    buildRouteAnimations(route, { upcomingRoutes = [] } = {}) {
      const css = buildCSSForRoute(route);
      const upcomingCss = buildUpcomingCSS(upcomingRoutes);

      const envelope = finalizeEnvelope({
        route,
        upcomingRoutes,
        css,
        upcomingCss
      });

      safeLog("BUILD_ROUTE_ANIMATIONS", {
        route,
        upcomingRoutes,
        cssSize: envelope.band.cssSize,
        upcomingSize: envelope.band.upcomingSize,
        sizeTier: envelope.band.sizeTier,
        advantageV2: envelope.band.advantageV2
      });

      return {
        css,
        upcomingCss,
        envelope
      };
    },

    buildUpcomingAnimations(routeSequence = []) {
      const css = buildUpcomingCSS(routeSequence);
      const route = AnimState.lastRoute || (routeSequence[0] || "unknown");

      const envelope = finalizeEnvelope({
        route,
        upcomingRoutes: routeSequence,
        css: AnimState.lastCSS || "",
        upcomingCss: css
      });

      safeLog("BUILD_UPCOMING_ANIMATIONS", {
        routes: routeSequence,
        upcomingSize: envelope.band.upcomingSize,
        sizeTier: envelope.band.sizeTier,
        advantageV2: envelope.band.advantageV2
      });

      return {
        css,
        envelope
      };
    },

    refreshFromIQMap() {
      safeLog("REFRESH_FROM_IQMAP", {
        lastRoute: AnimState.lastRoute,
        lastUpcomingRoutes: AnimState.lastUpcomingRoutes
      });

      if (!AnimState.lastRoute) return null;

      const css = buildCSSForRoute(AnimState.lastRoute);
      const upcomingCss = buildUpcomingCSS(AnimState.lastUpcomingRoutes || []);

      const envelope = finalizeEnvelope({
        route: AnimState.lastRoute,
        upcomingRoutes: AnimState.lastUpcomingRoutes || [],
        css,
        upcomingCss
      });

      return {
        css,
        upcomingCss,
        envelope
      };
    },

    // legacy
    getAdvantageSnapshot() {
      return AnimState.lastAdvantage ?? null;
    },

    // v33
    getAdvantageV2Snapshot() {
      return AnimState.lastAdvantageV2 ?? null;
    },

    getConsoleMetaSnapshot() {
      return AnimState.lastConsoleMeta ?? null;
    },

    getEnvelopeSnapshot() {
      return AnimState.lastEnvelope ?? null;
    }
  };

  safeLog("Initializing Components..", {
    identity: AnimationsRole.identity,
    version: AnimationsRole.version,
    schemaVersion: ANIMATIONS_SCHEMA_VERSION,
    baseGenomeVersion: genomeMeta.baseGenomeVersion,
    evoPackCount: genomeMeta.evoPackCount,
    localPackCount: genomeMeta.localPackCount
  });

  return PulseEvolutionaryAnimationsV33;
}

// ---------------------------------------------------------------------------
// GLOBAL REGISTRATION (optional, IMMORTAL v33)
// ---------------------------------------------------------------------------
try {

    PulseRealm.PulseEvolutionaryAnimationsV33 = createPulseEvolutionaryAnimationsV33;
 
} catch {}
