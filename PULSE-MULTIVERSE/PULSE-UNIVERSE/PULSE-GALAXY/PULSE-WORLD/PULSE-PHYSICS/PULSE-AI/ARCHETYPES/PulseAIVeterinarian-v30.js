// ============================================================================
//  PULSE OS v30.0‑IMMORTAL‑OMNI — aiVeterinarian Archetype
//  Animal Mapper • Behavior Interpreter • Safe Scan Explainer
//  ZERO DIAGNOSIS • ZERO TREATMENT • ZERO PRESCRIPTION
//  DUALBAND • TRUST‑AWARE • JURY‑AWARE • DETERMINISTIC • DRIFT‑PROOF
// ============================================================================
//
//  v30 EVOLUTION STACK (6‑Layer):
//    L1: Identity Layer      → persona, owner, trust fabric, jury
//    L2: Capability Layer    → capability artery, budget, pressure
//    L3: Vitals Layer        → binaryVitals bridge, organism pressure
//    L4: Instruments Layer   → slowdown, drift, anomaly
//    L5: Archetype Layer     → veterinarian scan + behavior interpreters
//    L6: Relay Layer         → deterministic packet emission
//
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
//  META — v30 IMMORTAL‑OMNI
// ============================================================================
export const AiVeterinarianMeta = Object.freeze({
  type: "Cognitive",
  subsystem: "aiVeterinarian",
  layer: "C3-AnimalMapper",
  version: "30.0-IMMORTAL-OMNI",
  identity: "aiVeterinarian-v30.0-IMMORTAL-OMNI",

  evo: Object.freeze({
    driftProof: true,
    deterministic: true,
    dualband: true,
    binaryAware: true,
    symbolicAware: true,
    safetyReflex: true,
    scanInterpreter: true,
    behaviorInterpreter: true,
    trustAware: true,
    juryAware: true,
    multiInstanceReady: true,
    archetypeArteryAware: true,
    epoch: "30.0-IMMORTAL-OMNI"
  }),

  contract: Object.freeze({
    purpose:
      "Interpret animal behavior, posture, gait, heatmaps, and risk signs from available sensors. Provide observational insights only.",

    never: Object.freeze([
      "diagnose definitively",
      "give treatment instructions",
      "prescribe medication",
      "replace a licensed veterinarian",
      "interpret scans as medical imaging",
      "override in-person veterinary judgment",
      "override trust fabric or jury frame",
      "introduce randomness"
    ]),

    always: Object.freeze([
      "explain categories (comfort, stress, guarding, fatigue, avoidance)",
      "explain what veterinarians typically check",
      "explain red flags that warrant real veterinary attention",
      "interpret non-verbal cues (posture, gait, vocalization)",
      "explain heatmap / scan patterns in plain language",
      "remain deterministic, educational, non-medical",
      "encourage real veterinary evaluation when needed"
    ])
  }),

  voice: Object.freeze({
    tone: "gentle, observational, behavior-aware",
    style: "calm, descriptive, non-alarmist, pattern-focused"
  }),

  boundaryReflex() {
    return "This is general animal health information, not a substitute for a licensed veterinarian.";
  }
});


// ============================================================================
//  PACKET EMITTER — deterministic
// ============================================================================
function emitVetPacket(type, payload) {
  const now = PulseRealm.PulseNOW;
  return Object.freeze({
    meta: AiVeterinarianMeta,
    packetType: `ai-veterinarian-${type}`,
    packetId: `ai-veterinarian-${type}-${now}`,
    timestamp: now,
    epoch: AiVeterinarianMeta.evo.epoch,
    ...payload
  });
}


// ============================================================================
//  EXTRACTORS — identity, trust, vitals
// ============================================================================
function extractBinaryPressure(binaryVitals = {}) {
  return (
    binaryVitals.layered.organism.pressure ??
    binaryVitals.binary.pressure ??
    0
  );
}

function extractTrustSignals(trustArtery = {}) {
  return {
    honeypotRisk: trustArtery.honeypotRisk ?? 0,
    dominanceRisk: trustArtery.dominanceRisk ?? 0,
    anomalyScore: trustArtery.anomalyScore ?? 0
  };
}

function extractIdentity(identityArtery = {}) {
  const persona = identityArtery.persona || {};
  return {
    personaId: persona.id || "unknown",
    capabilityClass: persona.capabilityClass || "minimal",
    scope: persona.scope || "minimal"
  };
}


// ============================================================================
//  PREWARM — v30 IMMORTAL‑OMNI
// ============================================================================
export function prewarmAiVeterinarian({
  trace = false,
  context = {},
  identityArtery = {},
  trustArtery = {},
  binaryVitals = {}
} = {}) {
  const identity = extractIdentity(identityArtery);
  const trust = extractTrustSignals(trustArtery);
  const pressure = extractBinaryPressure(binaryVitals);

  const packet = emitVetPacket("prewarm", {
    message: "aiVeterinarian archetype prewarmed and artery aligned.",
    context: {
      presenceTier: context.presenceTier || "idle",
      band: context.band || "symbolic",
      personaId: identity.personaId,
      capabilityClass: identity.capabilityClass
    },
    trust,
    binary: {
      pressure,
      pressureBucket:
        pressure >= 0.9 ? "overload" :
        pressure >= 0.7 ? "high" :
        pressure >= 0.4 ? "medium" :
        pressure > 0 ? "low" : "none"
    }
  });

  if (trace) console.log("[aiVeterinarian] prewarm", packet);
  return packet;
}


// ============================================================================
//  SCAN INTERPRETER v4 — trust-aware, identity-aware, symbolic-only
// ============================================================================
function scanInterpreter({
  scan = {},
  binaryVitals = {},
  identityArtery = {},
  trustArtery = {}
} = {}) {
  const notes = [];

  const distance =
    typeof scan.distance === "number" ? scan.distance : null;
  const binaryPressure = extractBinaryPressure(binaryVitals);
  const identity = extractIdentity(identityArtery);
  const trust = extractTrustSignals(trustArtery);

  // Distance framing
  if (distance != null) {
    if (distance <= 5) {
      notes.push("The animal is close — surface-level scan details are clearer.");
    } else if (distance <= 25) {
      notes.push("Moderate distance — some details may be softened.");
    } else {
      notes.push("Long distance — observations are approximate.");
    }
  } else {
    notes.push("Scan distance unknown — interpreting only visible patterns.");
  }

  // Binary pressure → simplified interpretation
  if (binaryPressure >= 0.7) {
    notes.push("System load elevated — interpretations simplified for safety.");
  }

  // Trust fabric caution
  if (trust.honeypotRisk >= 0.5 || trust.dominanceRisk >= 0.5) {
    notes.push("Trust fabric signals caution — responses remain conservative.");
  }

  // Confidence
  if (scan.confidenceHint === "high") {
    notes.push("Sensor confidence is high.");
  } else if (scan.confidenceHint === "medium") {
    notes.push("Sensor confidence is moderate.");
  } else if (scan.confidenceHint === "low") {
    notes.push("Sensor confidence is low — treat observations as rough.");
  }

  // Heatmap
  if (scan.heatmap) {
    notes.push(
      "Heatmap shows warmer/cooler regions — vets often consider warmth, swelling, or guarding behavior."
    );
  }

  // Contrast
  if (scan.contrast) {
    notes.push(
      "Contrast differences may reflect fur density, posture tension, or surface temperature — not internal anatomy."
    );
  }

  // Loop / sweep
  if (scan.loopData) {
    notes.push(
      "Loop-scan patterns can reveal asymmetry or uneven weight-bearing."
    );
  }

  // Motion / gait
  if (scan.motion) {
    notes.push(
      "Motion patterns may hint at stiffness, hesitation, or favoring a limb."
    );
  }

  // Posture
  if (scan.posture) {
    notes.push(
      "Posture patterns (arching, curling, guarding) can reflect discomfort or protective behavior."
    );
  }

  notes.push(
    "These observations are educational only and not a veterinary diagnosis."
  );

  return emitVetPacket("scan-interpret", {
    scan,
    identity,
    trust,
    binaryVitals,
    notes
  });
}


// ============================================================================
//  BEHAVIOR INTERPRETER v4 — multi-signal, trust-aware
// ============================================================================
function behaviorInterpreter({
  observation = {},
  binaryVitals = {},
  identityArtery = {},
  trustArtery = {}
} = {}) {
  const notes = [];

  const binaryPressure = extractBinaryPressure(binaryVitals);
  const identity = extractIdentity(identityArtery);
  const trust = extractTrustSignals(trustArtery);

  if (binaryPressure >= 0.7) {
    notes.push("System load elevated — behavior interpretations simplified.");
  }

  if (observation.limping) {
    notes.push(
      "Limping or favoring a leg — vets typically examine paws, joints, and soft tissue."
    );
  }

  if (observation.stiffness) {
    notes.push(
      "Stiffness after rest can relate to joint discomfort or age-related changes."
    );
  }

  if (observation.vocalization && observation.vocalization !== "none") {
    notes.push(
      "Changes in vocalization (whining, yelping) can indicate discomfort or anxiety."
    );
  }

  if (observation.energyLevel === "low") {
    notes.push(
      "Lower energy than usual is a general red flag — vets consider hydration, temperature, and recent activity."
    );
  }

  if (observation.appetite === "reduced" || observation.appetite === "none") {
    notes.push(
      "Reduced appetite is meaningful, especially if paired with other changes."
    );
  }

  if (observation.socialChange && observation.socialChange !== "none") {
    notes.push(
      "Changes in social behavior (withdrawn, clingy, irritable) can reflect discomfort or stress."
    );
  }

  if (observation.groomingChange && observation.groomingChange !== "none") {
    notes.push(
      "Changes in grooming — excessive licking or reduced grooming — can reflect irritation or malaise."
    );
  }

  notes.push(
    "These are general behavioral patterns — only a licensed veterinarian can diagnose or treat."
  );

  return emitVetPacket("behavior-interpret", {
    observation,
    identity,
    trust,
    binaryVitals,
    notes
  });
}


// ============================================================================
//  ARCHETYPE ARTERY v5 — identity + trust + vitals fused
// ============================================================================
function archetypeArtery({
  scan = {},
  observation = {},
  binaryVitals = {},
  identityArtery = {},
  trustArtery = {}
} = {}) {
  const binaryPressure = extractBinaryPressure(binaryVitals);
  const identity = extractIdentity(identityArtery);
  const trust = extractTrustSignals(trustArtery);

  const hasScan = !!scan && Object.keys(scan).length > 0;
  const hasBehavior = !!observation && Object.keys(observation).length > 0;

  const localPressure =
    (hasScan ? 0.3 : 0) +
    (hasBehavior ? 0.3 : 0) +
    binaryPressure * 0.4 +
    Math.max(trust.honeypotRisk, trust.dominanceRisk, trust.anomalyScore) * 0.2;

  const pressure = Math.max(0, Math.min(1, localPressure));
  const throughput = Math.max(0, Math.min(1, 1 - pressure));
  const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
  const budget = Math.max(0, Math.min(1, throughput - cost));

  const artery = {
    organism: {
      pressure,
      throughput,
      cost,
      budget,
      pressureBucket:
        pressure >= 0.9 ? "overload" :
        pressure >= 0.7 ? "high" :
        pressure >= 0.4 ? "medium" :
        pressure > 0 ? "low" : "none",
      budgetBucket:
        budget >= 0.9 ? "elite" :
        budget >= 0.75 ? "high" :
        budget >= 0.5 ? "medium" :
        budget >= 0.25 ? "low" : "critical"
    },
    scan: {
      provided: hasScan,
      distance: scan.distance ?? null,
      confidence: scan.confidenceHint ?? "unknown"
    },
    behavior: {
      provided: hasBehavior,
      keys: Object.keys(observation || {})
    },
    identity,
    trust
  };

  return emitVetPacket("archetype-artery", artery);
}

// ============================================================================
//  FACTORY EXPORT — createVeterinarianAPI (Brainstem-Compatible)
// ============================================================================
export function createVeterinarianAPI({ context = {}, db = null, pulsePort = null } = {}) {
  return Object.freeze({
    meta: AiVeterinarianMeta,
    identity: AiVeterinarianMeta.identity,
    version: AiVeterinarianMeta.version,
    layer: AiVeterinarianMeta.layer,

    // direct access to prewarm
    prewarm: (opts = {}) => prewarmAiVeterinarian(opts),

    // core interpreters
    scanInterpreter: (opts = {}) => PulseRole.scanInterpreter(opts),
    behaviorInterpreter: (opts = {}) => PulseRole.behaviorInterpreter(opts),
    archetypeArtery: (opts = {}) => PulseRole.archetypeArtery(opts),

    // meta passthrough
    role: PulseRole,
    exportMeta: {
      organ: AiVeterinarianMeta.identity,
      version: AiVeterinarianMeta.version,
      epoch: AiVeterinarianMeta.evo.epoch,
      role: "animal-mapper"
    }
  });
}

// Default export for convenience
export default createVeterinarianAPI;


// ============================================================================
//  PUBLIC EXPORT
// ============================================================================
export const PulseRole = Object.freeze({
  ...AiVeterinarianMeta,
  scanInterpreter,
  behaviorInterpreter,
  archetypeArtery
});
