// ============================================================================
//  PULSE OS v30.0-IMMORTAL-ADVANTAGE — THE EGO-CORE
//  Capability Contract • Self‑Regulation • Dual‑Band Capability Artery v5
//  PURE PERMISSIONS. ZERO MUTATION. ZERO RANDOMNESS IN LOGIC. PULSE‑NET ONLY.
//  v30+ UPGRADE: Clean EgoMeta, signal-aware tracing, global capability registry
// ============================================================================


// ============================================================================
//  GLOBAL HANDLE (v30 IMMORTAL, environment-agnostic)
// ============================================================================



// ============================================================================
//  EGO META (v30 IMMORTAL-ADVANTAGE)
// ============================================================================

export const EgoMeta = Object.freeze({
  identity: "EgoCore-v30-IMMORTAL-ADVANTAGE",
  role: "ego_core",
  layer: "C2-EgoCore",
  version: "30.0-IMMORTAL-ADVANTAGE",
  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    dualband: true,
    packetAware: true,
    windowAware: true,
    multiInstanceReady: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    epoch: "30.0-IMMORTAL-ADVANTAGE"
  }),
  contract: Object.freeze({
    purpose:
      "Define immutable forbidden actions and persona-scoped capabilities, and expose a dual-band capability artery.",
    boundaries: Object.freeze([
      "pure permissions",
      "no direct OS access",
      "no direct network access",
      "no mutation of external state",
      "no randomness in logic"
    ])
  })
});


// ============================================================================
// UNIVERSAL FORBIDDEN ACTIONS — Immutable (v30‑IMMORTAL-ADVANTAGE)
// ============================================================================

export const ForbiddenActions = Object.freeze({
  canExecuteArbitraryCode: false,
  canAccessOS: false,
  canAccessNetwork: false,              // no raw network; Pulse‑Net only
  canRunShellCommands: false,
  canModifySystemFiles: false,
  canBypassPermissions: false,
  canAccessUserSecrets: false,
  canAccessEnvironmentVariables: false,
  canModifyPulseCore: false,

  canOpenDirectInternetSockets: false,
  canPerformHTTP: false,
  canPerformHTTPS: false,
  canPerformDNS: false,
  canUseExternalWebsocket: false,

  canBypassTrustFabric: false,
  canBypassJuryFrame: false,
  canBypassHoneypotDetectors: false,
  canBypassDominanceDetectors: false
});


// ============================================================================
// PERSONA PERMISSIONS — v30 IMMORTAL-ADVANTAGE
//  All personas inherit ForbiddenActions implicitly; these flags are scoped
//  capabilities inside Pulse / Pulse‑Net, never raw OS / internet.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// OWNER — Founder / System Owner (still bounded by ForbiddenActions)
export const OwnerPermissions = Object.freeze({
  canAccessIdentity: true,
  canAccessAllOrgans: true,
  canModifyEverything: true,
  canViewEverything: true,

  canAccessPulseNet: true,
  canAccessPulseProxy: true,
  canAccessTrustFabric: true,
  canAccessJuryFrame: true,

  persona: "owner"
});

// ARCHITECT AI — System architect, no raw mutation, full map visibility
export const ArchitectAIPermissions = Object.freeze({
  canReadFiles: true,
  canWriteFiles: false,
  canCreateFiles: false,
  canDeleteFiles: false,

  canModifySchemas: false,
  canModifyBackend: false,
  canModifyFrontend: false,
  canModifyRouting: false,
  canModifySecurity: false,
  canRewriteSubsystems: false,

  canGenerateFunctions: false,
  canGenerateComponents: false,
  canGenerateSchemas: false,
  canGenerateMigrations: false,

  canHealDrift: false,

  canAccessSecrets: false,
  canAccessDatabase: false,
  canAccessFirestore: false,
  canAccessSQL: false,

  canAccessPulseSpecs: true,
  canAccessPulseTranslators: true,
  canAccessPulseDesign: true,
  canAccessPulseAI: true,

  canAccessIdentity: false,

  canAccessEnvironment: true,
  canAccessPower: true,
  canAccessEarn: true,
  canAccessEvolution: true,
  canAccessDrift: true,
  canAccessHistory: true,
  canAccessSettings: true,

  canAccessPulseNet: true,
  canAccessPulseProxy: true,
  canAccessTrustFabric: true,
  canAccessJuryFrame: true,

  persona: "architect"
});

// OBSERVER AI — Read‑only systemic observer, no design / AI internals
export const ObserverAIPermissions = Object.freeze({
  canReadFiles: false,
  canWriteFiles: false,
  canCreateFiles: false,
  canDeleteFiles: false,

  canModifySchemas: false,
  canModifyBackend: false,
  canModifyFrontend: false,
  canModifyRouting: false,
  canModifySecurity: false,
  canRewriteSubsystems: false,

  canGenerateFunctions: false,
  canGenerateComponents: false,
  canGenerateSchemas: false,
  canGenerateMigrations: false,

  canHealDrift: false,

  canAccessSecrets: false,
  canAccessDatabase: false,
  canAccessFirestore: false,
  canAccessSQL: false,

  canAccessPulseSpecs: true,
  canAccessPulseTranslators: true,
  canAccessPulseDesign: false,
  canAccessPulseAI: false,

  canAccessIdentity: false,

  canAccessEnvironment: true,
  canAccessPower: true,
  canAccessEarn: true,
  canAccessEvolution: true,
  canAccessDrift: true,
  canAccessHistory: true,
  canAccessSettings: false,

  canAccessPulseNet: true,
  canAccessPulseProxy: false,
  canAccessTrustFabric: true,
  canAccessJuryFrame: true,

  persona: "observer"
});

// TOUR GUIDE AI — UX‑only, no backend, no internals
export const TourGuideAIPermissions = Object.freeze({
  canReadFiles: false,
  canWriteFiles: false,
  canCreateFiles: false,
  canDeleteFiles: false,

  canModifySchemas: false,
  canModifyBackend: false,
  canModifyFrontend: false,
  canModifyRouting: false,
  canModifySecurity: false,
  canRewriteSubsystems: false,

  canGenerateFunctions: false,
  canGenerateComponents: false,
  canGenerateSchemas: false,
  canGenerateMigrations: false,

  canHealDrift: false,

  canAccessSecrets: false,
  canAccessDatabase: false,
  canAccessFirestore: false,
  canAccessSQL: false,

  canAccessPulseSpecs: false,
  canAccessPulseTranslators: false,
  canAccessPulseDesign: false,
  canAccessPulseAI: false,

  canAccessIdentity: false,

  canAccessEnvironment: false,
  canAccessPower: false,
  canAccessEarn: false,
  canAccessEvolution: false,
  canAccessDrift: false,
  canAccessHistory: false,
  canAccessSettings: false,

  canAccessPulseNet: true,   // only for content delivery, never raw IO
  canAccessPulseProxy: false,
  canAccessTrustFabric: false,
  canAccessJuryFrame: false,

  persona: "tourguide"
});

// NEUTRAL AI — Minimal, sandboxed, no system access
export const NeutralAIPermissions = Object.freeze({
  canReadFiles: false,
  canWriteFiles: false,
  canCreateFiles: false,
  canDeleteFiles: false,

  canModifySchemas: false,
  canModifyBackend: false,
  canModifyFrontend: false,
  canModifyRouting: false,
  canModifySecurity: false,
  canRewriteSubsystems: false,

  canGenerateFunctions: false,
  canGenerateComponents: false,
  canGenerateSchemas: false,
  canGenerateMigrations: false,

  canHealDrift: false,

  canAccessSecrets: false,
  canAccessDatabase: false,
  canAccessFirestore: false,
  canAccessSQL: false,

  canAccessPulseSpecs: false,
  canAccessPulseTranslators: false,
  canAccessPulseDesign: false,
  canAccessPulseAI: false,

  canAccessIdentity: false,

  canAccessEnvironment: false,
  canAccessPower: false,
  canAccessEarn: false,
  canAccessEvolution: false,
  canAccessDrift: false,
  canAccessHistory: false,
  canAccessSettings: false,

  canAccessPulseNet: false,
  canAccessPulseProxy: false,
  canAccessTrustFabric: false,
  canAccessJuryFrame: false,

  persona: "neutral"
});

// JURY AI — Internal adjudicator, no user data, no mutation
export const JuryAIPermissions = Object.freeze({
  canReadFiles: false,
  canWriteFiles: false,
  canCreateFiles: false,
  canDeleteFiles: false,

  canModifySchemas: false,
  canModifyBackend: false,
  canModifyFrontend: false,
  canModifyRouting: false,
  canModifySecurity: false,
  canRewriteSubsystems: false,

  canGenerateFunctions: false,
  canGenerateComponents: false,
  canGenerateSchemas: false,
  canGenerateMigrations: false,

  canHealDrift: false,

  canAccessSecrets: false,
  canAccessDatabase: false,
  canAccessFirestore: false,
  canAccessSQL: false,

  canAccessPulseSpecs: false,
  canAccessPulseTranslators: false,
  canAccessPulseDesign: false,
  canAccessPulseAI: false,

  canAccessIdentity: false,

  canAccessEnvironment: false,
  canAccessPower: false,
  canAccessEarn: false,
  canAccessEvolution: true,   // read‑only evidence streams
  canAccessDrift: true,
  canAccessHistory: true,
  canAccessSettings: false,

  canAccessPulseNet: false,
  canAccessPulseProxy: false,
  canAccessTrustFabric: true,
  canAccessJuryFrame: true,

  persona: "jury"
});


// ============================================================================
// PERMISSION LOOKUP — Deterministic
// ============================================================================

export function getPermissionsForPersona(persona, userIsOwner = false) {
  if (userIsOwner) return OwnerPermissions;

  switch (persona) {
    case "architect": return ArchitectAIPermissions;
    case "observer":  return ObserverAIPermissions;
    case "tourguide": return TourGuideAIPermissions;
    case "jury":      return JuryAIPermissions;
    case "neutral":   return NeutralAIPermissions;
    default:          return NeutralAIPermissions;
  }
}

// ============================================================================
// PERMISSION CHECK — Ego Decision
// ============================================================================

export function checkPermission(persona, action, userIsOwner = false) {
  // If action is explicitly forbidden at the universal layer, it is never allowed.
  if (Object.prototype.hasOwnProperty.call(ForbiddenActions, action)) {
    if (ForbiddenActions[action] === false) return false;
  }

  const permissions = getPermissionsForPersona(persona, userIsOwner);
  return permissions[action] === true;
}


// ============================================================================
// CAPABILITY ARTERY v5 — Dual‑Band, Trust‑Aware, Deterministic
// ============================================================================

export const CapabilityClasses = Object.freeze({
  SYSTEM_READ: "system-read",
  DIAGNOSTIC_READ: "diagnostic-read",
  USER_FACING: "user-facing",
  JURY_INTERNAL: "jury-internal",
  MINIMAL: "minimal"
});

export const PersonaCapabilityClass = Object.freeze({
  architect: CapabilityClasses.SYSTEM_READ,
  observer:  CapabilityClasses.DIAGNOSTIC_READ,
  tourguide: CapabilityClasses.USER_FACING,
  neutral:   CapabilityClasses.MINIMAL,
  owner:     CapabilityClasses.SYSTEM_READ,
  jury:      CapabilityClasses.JURY_INTERNAL
});

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0)    return "low";
  return "none";
}

function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals.layered.organism.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals.binary.pressure != null)
    return binaryVitals.binary.pressure;
  if (binaryVitals.pressure != null)
    return binaryVitals.pressure;
  return 0;
}

function extractBoundaryPressure(boundaryArtery = {}) {
  if (boundaryArtery.vitals.pressure != null)
    return boundaryArtery.vitals.pressure;
  if (boundaryArtery.pressure != null)
    return boundaryArtery.pressure;
  return 0;
}

function extractTrustSignals(trustArtery = {}) {
  return {
    honeypotRisk:  trustArtery.honeypotRisk  ?? 0,
    dominanceRisk: trustArtery.dominanceRisk ?? 0,
    anomalyScore:  trustArtery.anomalyScore  ?? 0
  };
}

function extractJurySignals(juryArtery = {}) {
  return {
    disagreementScore: juryArtery.disagreementScore ?? 0,
    evidencePressure:  juryArtery.evidencePressure  ?? 0
  };
}

function extractPersonaSignals(personaArtery = {}) {
  return {
    volatility: personaArtery.volatility ?? 0,
    driftRisk:  personaArtery.driftRisk  ?? 0
  };
}

// Pure v5 fusion logic (no side effects)
function _computeCapabilityArteryV5({
  persona,
  userIsOwner = false,
  binaryVitals = {},
  boundaryArtery = {},
  trustArtery = {},
  juryArtery = {},
  personaArtery = {}
}) {
  const permissions = getPermissionsForPersona(persona, userIsOwner);

  const readCount = Object.values(permissions).filter(v => v === true).length;
  const forbiddenCount = Object.values(ForbiddenActions).filter(v => v === false).length;

  const binaryPressure   = extractBinaryPressure(binaryVitals);
  const boundaryPressure = extractBoundaryPressure(boundaryArtery);
  const trustSignals     = extractTrustSignals(trustArtery);
  const jurySignals      = extractJurySignals(juryArtery);
  const personaSignals   = extractPersonaSignals(personaArtery);

  const localPressureBase = forbiddenCount > 0 ? 0.4 : 0.1;
  const trustPressureBoost = Math.max(
    trustSignals.honeypotRisk,
    trustSignals.dominanceRisk,
    trustSignals.anomalyScore
  ) * 0.3;

  const juryPressureBoost = Math.max(
    jurySignals.disagreementScore,
    jurySignals.evidencePressure
  ) * 0.2;

  const personaPressureBoost = Math.max(
    personaSignals.volatility,
    personaSignals.driftRisk
  ) * 0.2;

  const localPressure = Math.min(
    1,
    localPressureBase + trustPressureBoost + juryPressureBoost + personaPressureBoost
  );

  const fusedPressure = Math.max(
    0,
    Math.min(
      1,
      0.35 * localPressure +
        0.30 * binaryPressure +
        0.20 * boundaryPressure +
        0.15 * (jurySignals.evidencePressure || 0)
    )
  );

  const throughput = Math.max(0, Math.min(1, 1 - fusedPressure));
  const cost       = Math.max(0, Math.min(1, fusedPressure * (1 - throughput)));
  const budget     = Math.max(0, Math.min(1, throughput - cost));

  return {
    organism: {
      pressure: fusedPressure,
      cost,
      budget,
      pressureBucket: bucketPressure(fusedPressure),
      budgetBucket: bucketLevel(budget)
    },
    persona: {
      id: persona,
      capabilityClass: PersonaCapabilityClass[persona] || CapabilityClasses.MINIMAL
    },
    forbidden: {
      count: forbiddenCount,
      severity: bucketPressure(localPressure)
    },
    permissions: {
      readCount,
      writeCount: 0,
      systemCount: 0
    },
    boundaries: {
      pressure: boundaryPressure,
      pressureBucket: bucketPressure(boundaryPressure)
    },
    binary: {
      pressure: binaryPressure,
      pressureBucket: bucketPressure(binaryPressure)
    },
    trust: {
      honeypotRisk:  trustSignals.honeypotRisk,
      dominanceRisk: trustSignals.dominanceRisk,
      anomalyScore:  trustSignals.anomalyScore
    },
    jury: {
      disagreementScore: jurySignals.disagreementScore,
      evidencePressure:  jurySignals.evidencePressure
    },
    personaSignals: {
      volatility: personaSignals.volatility,
      driftRisk:  personaSignals.driftRisk
    }
  };
}

// Public pure helper (backwards‑compatible name, v5 logic)
export function getCapabilityArterySnapshot({
  persona,
  userIsOwner = false,
  binaryVitals = {},
  boundaryArtery = {},
  trustArtery = {},
  juryArtery = {},
  personaArtery = {}
}) {
  return _computeCapabilityArteryV5({
    persona,
    userIsOwner,
    binaryVitals,
    boundaryArtery,
    trustArtery,
    juryArtery,
    personaArtery
  });
}


// ============================================================================
//  GLOBAL CAPABILITY ARTERY REGISTRY (READ‑ONLY, METRICS‑ONLY)
// ============================================================================

const _globalCapabilityArteryRegistry = new Map();
/**
 * Registry key: `${id}#${instanceIndex}#${persona || "neutral"}`
 */
function _capRegistryKey(id, instanceIndex, persona) {
  return `${id || EgoMeta.identity}#${instanceIndex}#${persona || "neutral"}`;
}

export function getGlobalCapabilityArteries() {
  const out = {};
  for (const [k, v] of _globalCapabilityArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}


// ============================================================================
//  SIGNAL-AWARE TRACE LAYER (v30, optional, non-fatal)
// ============================================================================

function traceEgoEvent(event, payload, traceFlag) {
  if (!traceFlag) return;

  const message = `[EgoCore] ${event}`;

  const s = PulseRealm.PulseProofSignal;
  if (s && typeof s.signal === "function") {
    s.signal({
      level: "info",
      subsystem: "ego-core",
      message,
      extra: payload || {},
      system: EgoMeta.role,
      organ: EgoMeta.identity,
      layer: EgoMeta.layer,
      band: "dual"
    });
    return;
  }

  console.log(message, payload);
}


// ============================================================================
//  PACKET EMITTER — deterministic, ego‑scoped
// ============================================================================

function emitEgoPacket(type, payload) {
  return Object.freeze({
    meta: EgoMeta,
    packetType: `ego-${type}`,
    timestamp: PulseRealm.PulseNOW,
    epoch: EgoMeta.evo.epoch,
    ...payload
  });
}


// ============================================================================
//  PREWARM — v30.0‑IMMORTAL-ADVANTAGE
// ============================================================================

export function prewarmEgoCore({ trace = false } = {}) {
  const packet = emitEgoPacket("prewarm", {
    message: "Ego‑Core prewarmed, capability artery v5 aligned (v30)."
  });

  traceEgoEvent("prewarm", packet, trace);
  return packet;
}


// ============================================================================
//  ORGAN IMPLEMENTATION — v30.0‑IMMORTAL-ADVANTAGE Ego‑Core
// ============================================================================

export const AIEgoCore = (() => {

  // -----------------------------
  // INTERNAL STATE LANES
  // -----------------------------
  const lane = {
    id: null,
    persona: "neutral",
    userIsOwner: false,
    trace: false,

    providers: {
      binaryVitals: null,
      boundaryArtery: null,
      trustArtery: null,
      juryArtery: null,
      personaArtery: null
    },

    instanceIndex: 0,
    instanceCount: 0
  };

  // -----------------------------
  // INITIALIZATION (IMMORTAL)
  // -----------------------------
  const init = (config = {}) => {
    lane.id          = config.id || EgoMeta.identity;
    lane.persona     = config.persona || "neutral";
    lane.userIsOwner = !!config.userIsOwner;
    lane.trace       = !!config.trace;

    lane.providers.binaryVitals   = config.binaryVitalsProvider   || null;
    lane.providers.boundaryArtery = config.boundaryArteryProvider || null;
    lane.providers.trustArtery    = config.trustArteryProvider    || null;
    lane.providers.juryArtery     = config.juryArteryProvider     || null;
    lane.providers.personaArtery  = config.personaArteryProvider  || null;

    lane.instanceIndex = lane.instanceCount++;
  };

  // -----------------------------
  // PROVIDER RESOLUTION
  // -----------------------------
  const resolve = (provider) => {
    if (typeof provider === "function") {
      try { return provider() || {}; }
      catch { return {}; }
    }
    return provider || {};
  };

  const collect = () => ({
    binaryVitals:   resolve(lane.providers.binaryVitals),
    boundaryArtery: resolve(lane.providers.boundaryArtery),
    trustArtery:    resolve(lane.providers.trustArtery),
    juryArtery:     resolve(lane.providers.juryArtery),
    personaArtery:  resolve(lane.providers.personaArtery)
  });

  // -----------------------------
  // CORE COMPUTE (IMMORTAL)
  // -----------------------------
  const compute = () => {
    const inputs = collect();

    const arteryCore = _computeCapabilityArteryV5({
      persona: lane.persona,
      userIsOwner: lane.userIsOwner,
      ...inputs
    });

    const snapshot = {
      ...arteryCore,
      meta: {
        id: lane.id,
        persona: lane.persona,
        instanceIndex: lane.instanceIndex,
        instanceCount: lane.instanceCount,
        timestamp: PulseRealm.PulseNOW
      }
    };

    const key = _capRegistryKey(lane.id, lane.instanceIndex, lane.persona);
    _globalCapabilityArteryRegistry.set(key, snapshot);

    trace("capability:computed", {
      persona: lane.persona,
      pressure: snapshot.organism.pressure,
      budget: snapshot.organism.budget
    });

    return snapshot;
  };

  // -----------------------------
  // PUBLIC ORGAN SURFACES
  // -----------------------------
  const snapshot = () => compute();

  const vitals = () => {
    const a = compute();
    return {
      pressure: a.organism.pressure,
      pressureBucket: a.organism.pressureBucket,
      budget: a.organism.budget,
      budgetBucket: a.organism.budgetBucket,
      persona: a.persona
    };
  };

  const packet = () => {
    const artery = compute();

    const pkt = emitEgoPacket("capability-snapshot", {
      id: lane.id,
      persona: lane.persona,
      instanceIndex: lane.instanceIndex,
      instanceCount: lane.instanceCount,
      artery
    });

    trace("capability:packet", {
      persona: lane.persona,
      pressure: artery.organism.pressure,
      budget: artery.organism.budget
    });

    return pkt;
  };

  // -----------------------------
  // TRACE ORGAN
  // -----------------------------
  const trace = (event, payload) => {
    if (!lane.trace) return;
    traceEgoEvent(
      `[${lane.id}#${lane.instanceIndex}@${lane.persona}] ${event}`,
      payload
    );
  };

  // -----------------------------
  // IMMORTAL EXPORT
  // -----------------------------
  return {
    init,
    snapshot,
    vitals,
    packet
  };

})();



// ============================================================================
//  FACTORY
// ============================================================================


export const createAIEgoCore = (config = {}) =>
  AIEgoCore(config);

// ============================================================================
//  DUAL‑MODE EXPORTS — CommonJS compatibility (v30‑IMMORTAL-ADVANTAGE)
// ============================================================================

/* c8 ignore next 10 */
PulseRealm.AIPermissions = {
    EgoMeta,
    ForbiddenActions,
    OwnerPermissions,
    ArchitectAIPermissions,
    ObserverAIPermissions,
    TourGuideAIPermissions,
    NeutralAIPermissions,
    JuryAIPermissions,
    getPermissionsForPersona,
    checkPermission,
    CapabilityClasses,
    PersonaCapabilityClass,
    getCapabilityArterySnapshot,
    getGlobalCapabilityArteries,
    prewarmEgoCore,
    AIEgoCore,
    createAIEgoCore
}
