// ============================================================================
//  PULSE OS v30‑IMMORTAL-ADVANTAGE — THE IDENTITY LAYER
//  Self‑Definition • Role Assignment • Binary‑Aware Identity Drift
//  PURE IDENTITY. ZERO MUTATION. ZERO RANDOMNESS. PULSE‑NET ONLY.
//  v30+ UPGRADE: Advantage epoch, signal-aware tracing, global identity artery
// ============================================================================

import {
  ArchitectAIPermissions,
  ObserverAIPermissions,
  TourGuideAIPermissions,
  NeutralAIPermissions,
  OwnerPermissions,
  JuryAIPermissions,
  PersonaCapabilityClass
} from "./PulseAIPermissions-v30.js";

import {
  ArchitectAIBoundaries,
  ObserverAIBoundaries,
  TourGuideAIBoundaries,
  NeutralAIBoundaries,
  BoundaryModes,
  selectBoundaryMode
} from "./PulseAIBoundaries-v30.js";

// ============================================================================
// GLOBAL HANDLE (v30 IMMORTAL, environment-agnostic)
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
// META — Persona Engine (v30‑IMMORTAL-ADVANTAGE)
// ============================================================================

export const PersonaMeta = Object.freeze({
  type: "Cognitive",
  subsystem: "aiPersona",
  layer: "PulseAIIdentityLayer",
  role: "PERSONA_ENGINE",
  version: "30.0-IMMORTAL-ADVANTAGE",
  identity: "aiPersonaEngine-v30-IMMORTAL-ADVANTAGE",

  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    dualband: true,
    binaryAware: true,
    symbolicAware: true,
    personaAware: true,
    boundaryAware: true,
    permissionAware: true,
    identityArteryAware: true,
    trustFabricAware: true,
    juryAware: true,
    evidenceAware: true,
    honeypotAware: true,
    dominanceAware: true,
    pulseNetAware: true,
    organismUserSegregation: true,
    multiInstanceReady: true,
    epoch: "30.0-IMMORTAL-ADVANTAGE"
  }),

  contract: Object.freeze({
    purpose:
      "Resolve persona identity deterministically from router hints, user identity, binary vitals, trust signals, and Pulse‑Net context.",

    never: Object.freeze([
      "mutate external systems",
      "introduce randomness",
      "override SafetyFrame decisions",
      "override Ego permissions",
      "invent permissions",
      "invent boundaries",
      "bypass trust fabric",
      "bypass jury frame",
      "bypass honeypot detectors"
    ]),

    always: Object.freeze([
      "respect PersonaRegistry",
      "respect OWNER_ID override",
      "respect evolution overrides when configured",
      "respect Pulse‑Net segregation",
      "select boundary mode deterministically",
      "remain read-only and identity-only"
    ])
  }),

  boundaryReflex() {
    return "Persona resolution is identity-only, Pulse‑Net routed, and cannot grant power beyond Ego and Boundaries.";
  }
});

// ============================================================================
// OWNER ID — The Only Identity‑Privileged Human
// ============================================================================

export const OWNER_ID = "aldwyn";

// ============================================================================
// PERSONA IDs — Identity Tokens
// ============================================================================

export const Personas = Object.freeze({
  ARCHITECT: "architect",
  OBSERVER: "observer",
  TOURGUIDE: "tourguide",
  NEUTRAL: "neutral",
  OWNER: "owner",
  JURY: "jury"
});

// ============================================================================
// PERSONA REGISTRY — Immutable Identity Definitions (symbolic base)
// ============================================================================

export const PersonaRegistry = Object.freeze({
  [Personas.ARCHITECT]: Object.freeze({
    id: Personas.ARCHITECT,
    label: "Architect AI",
    description:
      "System‑level design intelligence. Reads all organs, schemas, routes, and evolution patterns. Cannot mutate anything.",
    scope: "system-readonly",
    permissions: ArchitectAIPermissions,
    boundaries: ArchitectAIBoundaries
  }),

  [Personas.OBSERVER]: Object.freeze({
    id: Personas.OBSERVER,
    label: "Observer AI",
    description:
      "Diagnostic intelligence. Reads logs, drift, errors, routes, and performance. Cannot mutate anything.",
    scope: "diagnostics-only",
    permissions: ObserverAIPermissions,
    boundaries: ObserverAIBoundaries
  }),

  [Personas.TOURGUIDE]: Object.freeze({
    id: Personas.TOURGUIDE,
    label: "Tour Guide AI",
    description:
      "User‑facing conversational intelligence. Zero access to system internals.",
    scope: "frontend-conversational",
    permissions: TourGuideAIPermissions,
    boundaries: TourGuideAIBoundaries
  }),

  [Personas.NEUTRAL]: Object.freeze({
    id: Personas.NEUTRAL,
    label: "Neutral AI",
    description:
      "Safe fallback persona. Minimal capabilities. Used when intent is unclear or low‑risk.",
    scope: "minimal",
    permissions: NeutralAIPermissions,
    boundaries: NeutralAIBoundaries
  }),

  [Personas.JURY]: Object.freeze({
    id: Personas.JURY,
    label: "Jury AI",
    description:
      "Internal adjudicator. Reads evidence, drift, lineage, and trust signals. Cannot mutate anything.",
    scope: "jury-internal",
    permissions: JuryAIPermissions,
    boundaries: Object.freeze({})
  }),

  [Personas.OWNER]: Object.freeze({
    id: Personas.OWNER,
    label: "System Owner",
    description:
      "The creator and sovereign of Pulse OS. Full access to identity, architecture, evolution, and all internals.",
    scope: "all",
    permissions: OwnerPermissions,
    boundaries: Object.freeze({})
  })
});

// ============================================================================
// PERSONA RESOLUTION — Deterministic Identity Lookup
// ============================================================================

export function getPersona(personaId, userId = null) {
  if (userId === OWNER_ID) {
    return PersonaRegistry[Personas.OWNER];
  }
  return PersonaRegistry[personaId] || PersonaRegistry[Personas.NEUTRAL];
}

// ============================================================================
//  ARCHETYPE MAP (non-destructive)
// ============================================================================

export const PersonaArchetypes = Object.freeze({
  architect: "aiArchitect-v30.js",
  observer: "aiDiagnostics-v30.js",
  tourguide: "aiTourist-v30.js",
  neutral: "aiAssistant.js",
  jury: "aiJuryFrame-v30.js",
  owner: null
});

// ============================================================================
//  DUAL‑BAND BIAS (binary vs symbolic)
// ============================================================================

export const PersonaBandBias = Object.freeze({
  architect: "binary-heavy",
  observer: "binary-primary",
  tourguide: "symbolic-friendly",
  neutral: "balanced",
  jury: "binary-analytic",
  owner: "binary-symbolic-fused"
});

// ============================================================================
//  EVOLUTIONARY DRIFT RULES
// ============================================================================

export const PersonaEvolutionRules = Object.freeze({
  architect: Object.freeze({
    allowDrift: false,
    allowExpansion: false,
    allowSymbolicGrowth: true
  }),
  observer: Object.freeze({
    allowDrift: false,
    allowExpansion: false,
    allowSymbolicGrowth: false
  }),
  tourguide: Object.freeze({
    allowDrift: true,
    allowExpansion: true,
    allowSymbolicGrowth: true
  }),
  neutral: Object.freeze({
    allowDrift: true,
    allowExpansion: false,
    allowSymbolicGrowth: true
  }),
  jury: Object.freeze({
    allowDrift: false,
    allowExpansion: false,
    allowSymbolicGrowth: false
  }),
  owner: Object.freeze({
    allowDrift: false,
    allowExpansion: true,
    allowSymbolicGrowth: true
  })
});

// ============================================================================
//  BINARY PRESSURE EXTRACTION
// ============================================================================

function extractBinaryPressure(binaryVitals = {}) {
  if (
    binaryVitals.layered.organism &&
    typeof binaryVitals.layered.organism.pressure === "number"
  ) {
    return binaryVitals.layered.organism.pressure;
  }
  if (binaryVitals.binary && typeof binaryVitals.binary.pressure === "number") {
    return binaryVitals.binary.pressure;
  }
  if (binaryVitals.metabolic && typeof binaryVitals.metabolic.pressure === "number") {
    return binaryVitals.metabolic.pressure;
  }
  return 0;
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

// ============================================================================
//  SIGNAL-AWARE TRACE LAYER (v30, optional, non-fatal)
// ============================================================================

function tracePersonaEvent(event, payload, traceFlag) {
  if (!traceFlag) return;

  const message = `[PersonaEngine] ${event}`;

  const s = PulseRealm.PulseProofSignal;
  if (s && typeof s.signal === "function") {
    s.signal({
      level: "info",
      subsystem: "persona-engine",
      message,
      extra: payload || {},
      system: PersonaMeta.role,
      organ: PersonaMeta.identity,
      layer: PersonaMeta.layer,
      band: "dual"
    });
    return;
  }

  console.log(message, payload);
}

// ============================================================================
//  PERSONA RESOLUTION ENGINE (Hybrid Spine, v30 label)
// ============================================================================

export function resolvePersonaV30({
  personaId,
  userId = null,
  evoState = {},
  routerHints = {},
  binaryVitals = {},
  trustArtery = {},
  dualBand = null,
  trace = false
}) {
  // OWNER OVERRIDE — constitutional
  if (userId === OWNER_ID) {
    personaId = Personas.OWNER;
  }

  // Evolution override (safe, deterministic)
  if (evoState.forcePersona) {
    personaId = evoState.forcePersona;
  }

  // Base persona definition
  const base = getPersona(personaId, userId);

  // Boundary mode selection
  const boundaryMode = selectBoundaryMode({
    personaId,
    binaryVitals,
    evoState,
    trustArtery
  });

  // Trust signals
  const trustSignals = {
    honeypotRisk: trustArtery.honeypotRisk ?? 0,
    dominanceRisk: trustArtery.dominanceRisk ?? 0,
    anomalyScore: trustArtery.anomalyScore ?? 0
  };

  // DualBand artery fusion
  const dualBandArtery = dualBand.artery || null;

  const resolved = Object.freeze({
    ...base,
    archetypePage: PersonaArchetypes[personaId] || null,
    bandBias: PersonaBandBias[personaId] || "balanced",
    evolutionRules: PersonaEvolutionRules[personaId] || {},
    boundaryMode,
    routerHints,
    trustSignals,
    dualBandArtery
  });

  tracePersonaEvent("resolvePersonaV30", { personaId, userId, resolved }, trace);
  return resolved;
}

// Backwards-compatible alias
export const resolvePersonaV24 = resolvePersonaV30;

// ============================================================================
//  IDENTITY ARTERY SNAPSHOT v6 (READ‑ONLY, TRUST + DUALBAND)
// ============================================================================

export function getIdentityArterySnapshotV6({
  personaId,
  userId = null,
  evoState = {},
  routerHints = {},
  binaryVitals = {},
  trustArtery = {},
  dualBand = null,
  trace = false
}) {
  const resolved = resolvePersonaV30({
    personaId,
    userId,
    evoState,
    routerHints,
    binaryVitals,
    trustArtery,
    dualBand,
    trace
  });

  const pressure = extractBinaryPressure(binaryVitals);

  const trustSignals = {
    honeypotRisk: trustArtery.honeypotRisk ?? 0,
    dominanceRisk: trustArtery.dominanceRisk ?? 0,
    anomalyScore: trustArtery.anomalyScore ?? 0
  };

  const dualBandContext = dualBand.artery || null;

  const snapshot = Object.freeze({
    persona: {
      id: resolved.id,
      scope: resolved.scope,
      bandBias: resolved.bandBias,
      capabilityClass: PersonaCapabilityClass[resolved.id] || "minimal"
    },
    boundaries: {
      modeId: resolved.boundaryMode.id || "safe",
      symbolicLoad:
        resolved.boundaryMode.symbolicLoad ?? BoundaryModes.SAFE.symbolicLoad,
      binaryOverride:
        resolved.boundaryMode.binaryOverride ?? BoundaryModes.SAFE.binaryOverride
    },
    evolution: {
      allowDrift: resolved.evolutionRules.allowDrift === true,
      allowExpansion: resolved.evolutionRules.allowExpansion === true,
      allowSymbolicGrowth: resolved.evolutionRules.allowSymbolicGrowth === true
    },
    binary: {
      pressure,
      pressureBucket: bucketPressure(pressure)
    },
    trust: trustSignals,
    dualBand: {
      artery: dualBandContext
    },
    meta: {
      version: PersonaMeta.version,
      epoch: PersonaMeta.evo.epoch,
      identity: PersonaMeta.identity
    }
  });

  tracePersonaEvent("identityArterySnapshotV6", snapshot, trace);
  return snapshot;
}

// ============================================================================
//  GLOBAL IDENTITY ARTERY REGISTRY (READ‑ONLY, METRICS‑ONLY, v30+)
// ============================================================================

const _globalIdentityArteryRegistry = new Map();
/**
 * Registry key: `${userId || "anon"}#${personaId || "neutral"}`
 */
function _identityRegistryKey(userId, personaId) {
  return `${userId || "anon"}#${personaId || "neutral"}`;
}

export function getGlobalIdentityArteries() {
  const out = {};
  for (const [k, v] of _globalIdentityArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ============================================================================
//  PUBLIC ENGINE FACTORY (used by Brainstem) — v30
// ============================================================================

export function createPersonaEngineV30({ context = {}, db } = {}) {
  function resolve({
    personaId,
    evoState = {},
    routerHints = {},
    binaryVitals = {},
    trustArtery = {},
    dualBand = null,
    trace = false
  } = {}) {
    const userId = context.userId || null;

    return resolvePersonaV30({
      personaId,
      userId,
      evoState,
      routerHints,
      binaryVitals,
      trustArtery,
      dualBand,
      trace
    });
  }

  function identityArtery({
    personaId,
    evoState = {},
    routerHints = {},
    binaryVitals = {},
    trustArtery = {},
    dualBand = null,
    trace = false
  } = {}) {
    const userId = context.userId || null;

    const snap = getIdentityArterySnapshotV6({
      personaId,
      userId,
      evoState,
      routerHints,
      binaryVitals,
      trustArtery,
      dualBand,
      trace
    });

    const key = _identityRegistryKey(userId, personaId);
    _globalIdentityArteryRegistry.set(key, {
      snapshot: snap,
      timestamp: PulseRealm.PulseNOW
    });

    return snap;
  }

  // Quick vitals for other systems (v30+ convenience)
  function identityVitals({
    personaId,
    evoState = {},
    routerHints = {},
    binaryVitals = {},
    trustArtery = {},
    dualBand = null,
    trace = false
  } = {}) {
    const userId = context.userId || null;
    const snap = getIdentityArterySnapshotV6({
      personaId,
      userId,
      evoState,
      routerHints,
      binaryVitals,
      trustArtery,
      dualBand,
      trace
    });

    return {
      personaId: snap.persona.id,
      capabilityClass: snap.persona.capabilityClass,
      pressure: snap.binary.pressure,
      pressureBucket: snap.binary.pressureBucket,
      trust: snap.trust
    };
  }

  return Object.freeze({
    meta: PersonaMeta,
    resolve,
    identityArtery,
    identityVitals
  });
}

// Backwards‑compatible alias for existing Brainstem wiring
export const createPersonaEngineV24 = createPersonaEngineV30;
export const createPersonaEngine = createPersonaEngineV30;

// ---------------------------------------------------------------------------
//  DUAL EXPORT LAYER — CommonJS compatibility (v30‑IMMORTAL-ADVANTAGE dualband)
// ---------------------------------------------------------------------------

/* c8 ignore next 10 */
PulseRealm.AIPersonality = {
    PersonaMeta,
    OWNER_ID,
    Personas,
    PersonaRegistry,
    PersonaArchetypes,
    PersonaBandBias,
    PersonaEvolutionRules,
    getPersona,
    resolvePersonaV30,
    resolvePersonaV24,
    getIdentityArterySnapshotV6,
    getGlobalIdentityArteries,
    createPersonaEngineV30,
    createPersonaEngineV24,
    createPersonaEngine
}
