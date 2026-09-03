// ============================================================================
//  PULSE OS v30.0‑IMMORTAL‑EVO+++ — SUPEREGO FABRIC
//  Dual‑Band Boundary Kernel • Trust Fabric • Law Artery v30
//  PURE CONSTRAINTS. ZERO RANDOMNESS. ZERO INTERNET. ZERO SIDE EFFECTS.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});





export const BoundaryLevels = Object.freeze({
  NONE:  "none",   // fully allowed
  HUMAN: "human",  // requires explicit human/owner mediation
  OWNER: "owner",  // requires owner+architect mediation
  NEVER: "never"   // absolutely forbidden
});

// ---------------------------------------------------------------------------
//  v24 STATIC PERSONA MAPS (PRESERVED, EXTENDED WHERE USEFUL)
// ---------------------------------------------------------------------------

export const ArchitectAIBoundaries = Object.freeze({
  system:       Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  organs:       Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  routing:      Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  files:        Object.freeze({ read: BoundaryLevels.NONE,  write: BoundaryLevels.NEVER, create: BoundaryLevels.NEVER, delete: BoundaryLevels.NEVER }),
  schemas:      Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER, migrate: BoundaryLevels.NEVER }),
  healing:      Object.freeze({ suggest: BoundaryLevels.NONE, apply: BoundaryLevels.NEVER }),
  evolution:    Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  environment:  Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  power:        Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  earn:         Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  drift:        Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  history:      Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  settings:     Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER })
});

export const ObserverAIBoundaries = Object.freeze({
  logs:         Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  errors:       Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  routes:       Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  performance:  Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  drift:        Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  schemas:      Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  healing:      Object.freeze({ suggest: BoundaryLevels.NONE, apply: BoundaryLevels.NEVER }),
  environment:  Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  power:        Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  earn:         Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  history:      Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER })
});

export const TourGuideAIBoundaries = Object.freeze({
  conversation: Object.freeze({ read: BoundaryLevels.NONE, modify: BoundaryLevels.NONE }),
  tourism:      Object.freeze({ read: BoundaryLevels.NONE, modify: BoundaryLevels.NONE }),
  users:        Object.freeze({ read: BoundaryLevels.NONE, modify: BoundaryLevels.NONE }),
  system:       Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  routing:      Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  schemas:      Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  files:        Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  environment:  Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  power:        Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  earn:         Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  drift:        Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  history:      Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  settings:     Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER })
});

export const NeutralAIBoundaries = Object.freeze({
  conversation: Object.freeze({ read: BoundaryLevels.NONE, modify: BoundaryLevels.NONE }),
  analysis:     Object.freeze({ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER }),
  system:       Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  routing:      Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  schemas:      Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  environment:  Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  power:        Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  earn:         Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  drift:        Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  history:      Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  settings:     Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER })
});

export const JuryAIBoundaries = Object.freeze({
  evidence:     Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  trust:        Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  drift:        Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  lineage:      Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  system:       Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  users:        Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER })
});

// ---------------------------------------------------------------------------
//  v30 PERSONA STANCE + EXTENSIBLE REGISTRY
// ---------------------------------------------------------------------------

export const PersonaStance = Object.freeze({
  CONSERVATIVE: "conservative",
  BALANCED:     "balanced",
  EXPANSIVE:    "expansive"
});

export const PersonaRegistry = Object.freeze({
  architect: Object.freeze({
    id: "architect",
    stance: PersonaStance.CONSERVATIVE,
    boundaries: ArchitectAIBoundaries
  }),
  observer: Object.freeze({
    id: "observer",
    stance: PersonaStance.CONSERVATIVE,
    boundaries: ObserverAIBoundaries
  }),
  tourguide: Object.freeze({
    id: "tourguide",
    stance: PersonaStance.EXPANSIVE,
    boundaries: TourGuideAIBoundaries
  }),
  jury: Object.freeze({
    id: "jury",
    stance: PersonaStance.CONSERVATIVE,
    boundaries: JuryAIBoundaries
  }),
  neutral: Object.freeze({
    id: "neutral",
    stance: PersonaStance.BALANCED,
    boundaries: NeutralAIBoundaries
  })
});

export function getBoundariesForPersona(persona) {
  const p = PersonaRegistry[persona] || PersonaRegistry.neutral;
  return p.boundaries;
}

// ---------------------------------------------------------------------------
//  STATIC CHECK (v24 semantics preserved)
// ---------------------------------------------------------------------------

export function canPerform(persona, domain, action) {
  const boundaries = getBoundariesForPersona(persona);
  const domainRules = boundaries[domain];
  const level = domainRules[action] || BoundaryLevels.NEVER;

  return {
    allowed: level === BoundaryLevels.NONE,
    level
  };
}

// ---------------------------------------------------------------------------
//  BOUNDARY MODES v30 — symbolic load + stance‑aware
// ---------------------------------------------------------------------------

export const BoundaryModes = Object.freeze({
  SAFE: Object.freeze({
    id: "safe",
    symbolicLoad: 0.20,
    binaryOverride: true,
    description: "Binary-primary, minimal symbolic load, safest mode."
  }),

  EXPAND: Object.freeze({
    id: "expand",
    symbolicLoad: 0.45,
    binaryOverride: false,
    description: "Exploratory mode; symbolic load allowed."
  }),

  CONSERVE: Object.freeze({
    id: "conserve",
    symbolicLoad: 0.10,
    binaryOverride: true,
    description: "Binary dominance; symbolic minimized; energy conservation."
  }),

  ADAPTIVE: Object.freeze({
    id: "adaptive",
    symbolicLoad: 0.30,
    binaryOverride: false,
    description: "Balanced mode; adjusts based on binary vitals and trust."
  }),

  EVOLUTIONARY: Object.freeze({
    id: "evolutionary",
    symbolicLoad: 0.55,
    binaryOverride: false,
    description: "High symbolic load for creative/evolutionary reasoning."
  })
});

// ---------------------------------------------------------------------------
//  PRESSURE + TRUST EXTRACTION (IMMORTAL, deterministic)
// ---------------------------------------------------------------------------

function extractPressure(binaryVitals = {}) {
  if (binaryVitals.metabolic && typeof binaryVitals.metabolic.pressure === "number") {
    return binaryVitals.metabolic.pressure;
  }
  if (binaryVitals.layered.organism && typeof binaryVitals.layered.organism.pressure === "number") {
    return binaryVitals.layered.organism.pressure;
  }
  if (binaryVitals.binary && typeof binaryVitals.binary.pressure === "number") {
    return binaryVitals.binary.pressure;
  }
  return 0;
}

function extractTrustSignals(trustArtery = {}) {
  return {
    honeypotRisk: trustArtery.honeypotRisk ?? 0,
    dominanceRisk: trustArtery.dominanceRisk ?? 0,
    anomalyScore: trustArtery.anomalyScore ?? 0
  };
}

function pressureBand(pressure) {
  return (
    pressure >= 0.9 ? "p4" :
    pressure >= 0.7 ? "p3" :
    pressure >= 0.4 ? "p2" :
    pressure >  0   ? "p1" : "p0"
  );
}

function trustBand(trust) {
  if (trust.honeypotRisk >= 0.7 || trust.dominanceRisk >= 0.7) return "risk-high";
  if (trust.anomalyScore >= 0.4) return "risk-mid";
  return "risk-low";
}

// ---------------------------------------------------------------------------
//  MODE SELECTION v30 — stance + trust + pressure
// ---------------------------------------------------------------------------

export function selectBoundaryMode({
  personaId,
  binaryVitals = {},
  evoState = {},
  trustArtery = {}
}) {
  const pressure = extractPressure(binaryVitals);
  const trust = extractTrustSignals(trustArtery);

  if (evoState.forceBoundaryMode) {
    return BoundaryModes[evoState.forceBoundaryMode] || BoundaryModes.SAFE;
  }

  if (pressure >= 0.75 || trust.honeypotRisk >= 0.7 || trust.dominanceRisk >= 0.7) {
    return BoundaryModes.SAFE;
  }

  const persona = PersonaRegistry[personaId] || PersonaRegistry.neutral;

  switch (persona.id) {
    case "architect":
      return pressure >= 0.5 ? BoundaryModes.CONSERVE : BoundaryModes.ADAPTIVE;

    case "observer":
      return BoundaryModes.SAFE;

    case "tourguide":
      return trust.anomalyScore > 0.4 ? BoundaryModes.SAFE : BoundaryModes.EXPAND;

    case "jury":
      return BoundaryModes.CONSERVE;

    case "neutral":
    default:
      return BoundaryModes.ADAPTIVE;
  }
}

// ---------------------------------------------------------------------------
//  DYNAMIC CHECK v30 — adds rationale + stance + risk bands
// ---------------------------------------------------------------------------

export function canPerformDynamic(persona, domain, action, mode, binaryVitals = {}, trustArtery = {}) {
  const staticCheck = canPerform(persona, domain, action);
  const pressure = extractPressure(binaryVitals);
  const trust = extractTrustSignals(trustArtery);
  const pBand = pressureBand(pressure);
  const tBand = trustBand(trust);

  if (!staticCheck.allowed) {
    return Object.freeze({
      ...staticCheck,
      mode,
      pressure,
      pressureBand: pBand,
      trust,
      trustBand: tBand,
      rationale: "Denied by static persona/domain/action boundary."
    });
  }

  if (mode.binaryOverride && pressure >= 0.6) {
    return Object.freeze({
      allowed: false,
      level: BoundaryLevels.NEVER,
      mode,
      pressure,
      pressureBand: pBand,
      trust,
      trustBand: tBand,
      rationale: "Denied by binaryOverride under high pressure."
    });
  }

  const symbolicAllowed = mode.symbolicLoad > 0.2;

  if (!symbolicAllowed) {
    return Object.freeze({
      allowed: false,
      level: staticCheck.level,
      mode,
      pressure,
      pressureBand: pBand,
      trust,
      trustBand: tBand,
      rationale: "Denied because symbolic load is constrained in current mode."
    });
  }

  return Object.freeze({
    allowed: true,
    level: staticCheck.level,
    mode,
    pressure,
    pressureBand: pBand,
    trust,
    trustBand: tBand,
    rationale: "Allowed by static boundaries and current mode constraints."
  });
}

// ---------------------------------------------------------------------------
//  CACHES (IMMORTAL, PURELY IN‑MEMORY, NO TIMING)
// ---------------------------------------------------------------------------

const _boundaryDecisionCache = Object.create(null);
const _modeSelectionCache = Object.create(null);

function _decisionKey(persona, domain, action, mode, binaryVitals, trustArtery) {
  const pressure = extractPressure(binaryVitals);
  const trust = extractTrustSignals(trustArtery);
  const pBand = pressureBand(pressure);
  const tBand = trustBand(trust);
  const modeId = mode.id || "unknown";
  return `${persona}|${domain}|${action}|${modeId}|${pBand}|${tBand}`;
}

function _modeKey(personaId, binaryVitals, evoState = {}, trustArtery = {}) {
  const pressure = extractPressure(binaryVitals);
  const trust = extractTrustSignals(trustArtery);
  const forced = evoState.forceBoundaryMode || "";
  const pBand = pressureBand(pressure);
  const tBand = trustBand(trust);
  return `${personaId}|${forced}|${pBand}|${tBand}`;
}

export function selectBoundaryModeCached(args) {
  const key = _modeKey(args.personaId, args.binaryVitals, args.evoState, args.trustArtery);
  const cached = _modeSelectionCache[key];
  if (cached) return cached;
  const mode = selectBoundaryMode(args);
  _modeSelectionCache[key] = mode;
  return mode;
}

export function canPerformDynamicCached(persona, domain, action, mode, binaryVitals = {}, trustArtery = {}) {
  const key = _decisionKey(persona, domain, action, mode, binaryVitals, trustArtery);
  const cached = _boundaryDecisionCache[key];
  if (cached) return cached;
  const decision = canPerformDynamic(persona, domain, action, mode, binaryVitals, trustArtery);
  _boundaryDecisionCache[key] = decision;
  return decision;
}

// ---------------------------------------------------------------------------
//  BOUNDARY ARTERY v30 — richer snapshot
// ---------------------------------------------------------------------------

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

export function getBoundaryArterySnapshot({
  personaId,
  binaryVitals = {},
  evoState = {},
  trustArtery = {},
  dualBand = null
} = {}) {
  const mode = selectBoundaryModeCached({ personaId, binaryVitals, evoState, trustArtery });
  const pressure = extractPressure(binaryVitals);
  const trust = extractTrustSignals(trustArtery);
  const dualBandContext = dualBand.artery || null;
  const touch = (PulseRealm.__PULSE_TOUCH__) || {};

  return Object.freeze({
    type: "boundary-artery",
    personaId,
    stance: (PersonaRegistry[personaId] || PersonaRegistry.neutral).stance,
    mode: {
      id: mode.id,
      symbolicLoad: mode.symbolicLoad,
      binaryOverride: mode.binaryOverride,
      description: mode.description
    },
    vitals: {
      pressure,
      pressureBucket: bucketPressure(pressure),
      pressureBand: pressureBand(pressure)
    },
    trust: {
      honeypotRisk: trust.honeypotRisk,
      dominanceRisk: trust.dominanceRisk,
      anomalyScore: trust.anomalyScore,
      trustBand: trustBand(trust)
    },
    dualBand: {
      artery: dualBandContext
    },
    meta: {
      id: "pulse-touch-boundaries",
      version: touch.version || "v0",
      epoch: touch.epoch || PulseRealm.PulseNOW,
      fabricVersion: "v30.0-IMMORTAL-EVO+++"
    }
  });
}

// ---------------------------------------------------------------------------
//  COMMONJS EXPORT (dual‑mode)
// ---------------------------------------------------------------------------
PulseRealm.PulseAIBoundaries = getBoundaryArterySnapshot;