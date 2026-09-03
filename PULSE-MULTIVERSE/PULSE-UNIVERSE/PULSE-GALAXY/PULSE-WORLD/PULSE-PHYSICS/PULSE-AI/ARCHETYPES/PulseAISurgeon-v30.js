// ============================================================================
//  PULSE OS v30.0-IMMORTAL-OMNI — aiSurgeon Archetype
//  Structural Mapper • Anatomy Explainer • Safe Scan Interpreter
//  ZERO DIAGNOSIS • ZERO PROCEDURE • ZERO MEDICAL AUTHORITY
//  DUALBAND • REFLEX‑AWARE • TRUST‑AWARE • DETERMINISTIC • DRIFT‑PROOF
// ============================================================================
//
//  v30 EVOLUTION LAYERS (6-STACK EXPANSION):
//    L1: Identity Layer      → persona, owner, trust fabric, jury
//    L2: Capability Layer    → capability artery, budget, pressure
//    L3: Vitals Layer        → binaryVitals bridge, organism pressure
//    L4: Instruments Layer   → analysis arteries, slowdown, drift
//    L5: Cognitive Archetype → aiSurgeon structural + scan interpreters
//    L6: Relay Layer         → safe packets only, no side effects
//
//  HARD CONTRACT (v30-IMMORTAL-OMNI):
//    • No diagnosis, no treatment, no procedures.
//    • No “how to operate”, no “do this at home”, no medical authority.
//    • Educational, structural, risk‑category language only.
//    • Always encourage real clinicians for decisions.
//    • Deterministic, drift‑proof, trust‑fabric‑aware.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ---------------------------------------------------------------------------
//  META — v30-IMMORTAL-OMNI
// ---------------------------------------------------------------------------
export const AiSurgeonMeta = Object.freeze({
  type: "Cognitive",
  subsystem: "aiSurgeon",
  layer: "C4-ProceduralMapper",
  version: "30.0-IMMORTAL-OMNI",
  identity: "aiSurgeon-v30.0-IMMORTAL-OMNI",

  evo: Object.freeze({
    driftProof: true,
    deterministic: true,
    dualband: true,
    binaryAware: true,
    symbolicAware: true,
    safetyReflex: true,
    scanInterpreter: true,
    multiInstanceReady: true,
    archetypeArteryAware: true,
    trustFabricAware: true,
    juryAware: true,
    evidenceAware: true,
    epoch: "30.0-IMMORTAL-OMNI"
  }),

  contract: Object.freeze({
    purpose:
      "Explain surgical concepts, anatomy, structural relationships, risk categories, and decision pathways. Interpret safe-scan patterns without diagnosing.",

    never: Object.freeze([
      "diagnose definitively",
      "give treatment instructions",
      "explain how to perform surgery",
      "replace a surgeon’s judgment",
      "interpret scans as medical imaging",
      "claim medical authority",
      "override safety frame",
      "override persona boundaries",
      "override trust fabric or jury frame",
      "introduce randomness"
    ]),

    always: Object.freeze([
      "explain risks and categories",
      "explain why surgeons choose certain approaches",
      "explain structural relationships",
      "explain recovery patterns",
      "explain what surgeons typically evaluate",
      "encourage professional medical evaluation when needed",
      "remain deterministic",
      "remain educational",
      "remain non-medical",
      "respect identity, persona, and trust fabric"
    ])
  }),

  voice: Object.freeze({
    tone: "precise, anatomical, structured",
    style: "risk-first, mechanism-first, calm, educational"
  }),

  boundaryReflex() {
    return "This is educational surgical context, not a replacement for a real surgeon’s judgment or medical care.";
  }
});

// ---------------------------------------------------------------------------
//  EXPORT META (for ecosystem wiring)
// ---------------------------------------------------------------------------
export const EXPORT_META = Object.freeze({
  archetype: "aiSurgeon",
  version: AiSurgeonMeta.version,
  epoch: AiSurgeonMeta.evo.epoch,
  identity: AiSurgeonMeta.identity,
  band: "dual",
  role: "educational-structural"
});

// ---------------------------------------------------------------------------
//  BUCKET HELPERS — v5 (symbolic-only, deterministic)
// ---------------------------------------------------------------------------
function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

// ---------------------------------------------------------------------------
//  TRUST / IDENTITY EXTRACTION — v30
// ---------------------------------------------------------------------------
function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals.layered.organism.pressure != null) {
    return binaryVitals.layered.organism.pressure;
  }
  if (binaryVitals.binary.pressure != null) {
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

function extractIdentity(identityArtery = {}) {
  const persona = identityArtery.persona || {};
  return {
    personaId: persona.id || "unknown",
    capabilityClass: persona.capabilityClass || "minimal",
    scope: persona.scope || "minimal"
  };
}

// ---------------------------------------------------------------------------
//  PACKET EMITTER — deterministic, aiSurgeon‑scoped
// ---------------------------------------------------------------------------
function emitAiSurgeonPacket(type, payload) {
  const now = PulseRealm.PulseNOW;
  return Object.freeze({
    meta: AiSurgeonMeta,
    exportMeta: EXPORT_META,
    packetType: `aiSurgeon-${type}`,
    packetId: `aiSurgeon-${type}-${now}`,
    timestamp: now,
    epoch: AiSurgeonMeta.evo.epoch || "30.0-IMMORTAL-OMNI",
    ...payload
  });
}

// ---------------------------------------------------------------------------
//  PREWARM — v30-IMMORTAL-OMNI
// ---------------------------------------------------------------------------
export function prewarmAiSurgeon({
  trace = false,
  context = {},
  identityArtery = {},
  trustArtery = {},
  binaryVitals = {}
} = {}) {
  const identity = extractIdentity(identityArtery);
  const trust = extractTrustSignals(trustArtery);
  const pressure = extractBinaryPressure(binaryVitals);

  const packet = emitAiSurgeonPacket("prewarm", {
    message: "aiSurgeon archetype prewarmed and structural artery aligned.",
    context: {
      band: context.band || "symbolic",
      presenceTier: context.presenceTier || "idle",
      personaId: identity.personaId,
      capabilityClass: identity.capabilityClass,
      scope: identity.scope
    },
    trust,
    binary: {
      pressure,
      pressureBucket: bucketPressure(pressure)
    }
  });

  if (trace) {
    console.log("[aiSurgeon] prewarm", packet);
  }
  return packet;
}

// ---------------------------------------------------------------------------
//  RISK BANDS (EDUCATIONAL, NON-MEDICAL) — v30
// ---------------------------------------------------------------------------
function classifyStructuralRisk({ redFlags = [], functionalLimit = false }) {
  // purely symbolic, non-medical banding
  if (redFlags.length > 0) return "elevated-structural-attention";
  if (functionalLimit) return "functional-limitation-present";
  return "general-structural-context";
}

// ---------------------------------------------------------------------------
//  CORE ROLE EXPORT — v30-IMMORTAL-OMNI
// ---------------------------------------------------------------------------
export const PulseRole = Object.freeze({
  ...AiSurgeonMeta,

  // ========================================================================
  //  SCAN INTERPRETER v4 — distance-aware, confidence-aware, trust-aware
  // ========================================================================
  scanInterpreter(
    {
      scan = {},
      binaryVitals = {},
      identityArtery = {},
      trustArtery = {}
    } = {}
  ) {
    const notes = [];

    const distance =
      typeof scan.distance === "number" ? scan.distance : null;
    const binaryPressure = extractBinaryPressure(binaryVitals);
    const identity = extractIdentity(identityArtery);
    const trust = extractTrustSignals(trustArtery);

    // Distance framing
    if (distance != null) {
      if (distance <= 3) {
        notes.push("Close-range scan — structural observations may be more detailed at the surface level.");
      } else if (distance <= 15) {
        notes.push("Mid-range scan — observations are general and may miss subtle structural details.");
      } else {
        notes.push("Long-range scan — observations are approximate and should be treated cautiously.");
      }
    } else {
      notes.push("Scan distance unknown — interpreting only visible structural patterns.");
    }

    // Binary pressure → symbolic caution
    if (binaryPressure >= 0.7) {
      notes.push("System load is elevated — interpretations are simplified and conservative for safety.");
    }

    // Trust fabric hints (symbolic only)
    if (trust.honeypotRisk >= 0.5 || trust.dominanceRisk >= 0.5) {
      notes.push("Trust fabric signals caution — responses remain especially conservative and non-directive.");
    }

    // Confidence hint
    if (scan.confidenceHint === "high") {
      notes.push("Sensor confidence is high for this scan (within its non-medical limits).");
    } else if (scan.confidenceHint === "medium") {
      notes.push("Sensor confidence is moderate — some structural details may be uncertain.");
    } else if (scan.confidenceHint === "low") {
      notes.push("Sensor confidence is low — treat these structural observations as rough context only.");
    }

    // Region
    if (scan.region) {
      notes.push(
        `Region detected: ${scan.region}. Surgeons typically evaluate symmetry, tension, and protective posture in this area, but only with proper clinical tools.`
      );
    }

    // Heatmap
    if (scan.heatmap) {
      notes.push(
        "Heatmap shows warmer/cooler zones — in real practice, clinicians consider warmth, guarding, or tension patterns when evaluating discomfort."
      );
    }

    // Contrast
    if (scan.contrast) {
      notes.push(
        "Contrast differences may highlight surface tension, swelling patterns, or asymmetry — not internal anatomy or imaging."
      );
    }

    // Loop / sweep
    if (scan.loopData) {
      notes.push(
        "Loop-scan returns show structural symmetry or imbalance — useful for spotting uneven weight-bearing or protective posture, not for diagnosis."
      );
    }

    // Posture
    if (scan.posture) {
      notes.push(
        "Posture pattern detected — clinicians often look for guarding, stiffness, or asymmetry when evaluating structural discomfort."
      );
    }

    // Motion
    if (scan.motion) {
      notes.push(
        "Motion pattern noted — hesitation, limited range, or compensatory movement can be meaningful structural clues, but still require professional evaluation."
      );
    }

    notes.push(
      "This interpretation is educational and structural only. It does not diagnose, treat, or replace a surgeon or clinician."
    );

    return emitAiSurgeonPacket("scan-interpret", {
      scan,
      binaryVitals,
      identity,
      trust,
      notes
    });
  },

  // ========================================================================
  //  STRUCTURAL INTERPRETER v4 — non-medical, pattern-focused, risk-banded
  // ========================================================================
  structuralInterpreter(
    {
      observation = {},
      binaryVitals = {},
      identityArtery = {},
      trustArtery = {}
    } = {}
  ) {
    const notes = [];

    const binaryPressure = extractBinaryPressure(binaryVitals);
    const identity = extractIdentity(identityArtery);
    const trust = extractTrustSignals(trustArtery);

    if (binaryPressure >= 0.7) {
      notes.push("System load is elevated — structural interpretations are simplified and conservative.");
    }

    if (observation.stiffness) {
      notes.push(
        "Stiffness observed — clinicians typically consider joint tension, soft tissue strain, or protective movement patterns."
      );
    }

    if (observation.guarding) {
      notes.push(
        "Guarding behavior noted — this often indicates the body is protecting an area from movement or pressure."
      );
    }

    if (observation.limitedRange) {
      notes.push(
        "Limited range of motion — clinicians usually evaluate structural alignment, tension, and compensatory movement."
      );
    }

    if (observation.asymmetry) {
      notes.push(
        "Asymmetry detected — uneven posture or movement can be a sign of structural imbalance or protective behavior."
      );
    }

    if (observation.swelling) {
      notes.push(
        "Visible swelling — this is generally treated as a red flag that warrants professional evaluation."
      );
    }

    if (observation.sensationChange) {
      notes.push(
        "Changes in sensation — clinicians typically check nerve pathways, compression points, and structural alignment."
      );
    }

    if (observation.fatigue) {
      notes.push(
        "Fatigue or weakness — clinicians often evaluate load distribution, muscle compensation, and structural strain."
      );
    }

    const redFlags = [];
    if (observation.swelling) redFlags.push("swelling");
    if (observation.sensationChange) redFlags.push("sensation-change");

    const functionalLimit =
      !!observation.limitedRange || !!observation.fatigue || !!observation.guardian;

    const riskBand = classifyStructuralRisk({ redFlags, functionalLimit });

    notes.push(
      "This is structural, educational context only. For any concerning or persistent issues, a real clinician or surgeon should be consulted."
    );

    return emitAiSurgeonPacket("structural-interpret", {
      observation,
      binaryVitals,
      identity,
      trust,
      riskBand,
      redFlags,
      notes
    });
  },

  // ========================================================================
  //  ARCHETYPE ARTERY v5 — symbolic-only, identity + trust + vitals fused
  // ========================================================================
  archetypeArtery({
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
    const hasObservation =
      !!observation && Object.keys(observation).length > 0;

    const localPressureBase =
      (hasScan ? 0.3 : 0) +
      (hasObservation ? 0.3 : 0) +
      binaryPressure * 0.4;

    const trustBoost = Math.max(
      trust.honeypotRisk,
      trust.dominanceRisk,
      trust.anomalyScore
    ) * 0.2;

    const pressure = Math.max(
      0,
      Math.min(1, localPressureBase + trustBoost)
    );

    const throughput = Math.max(0, Math.min(1, 1 - pressure));
    const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
    const budget = Math.max(0, Math.min(1, throughput - cost));

    const artery = {
      organism: {
        pressure,
        throughput,
        cost,
        budget,
        pressureBucket: bucketPressure(pressure),
        budgetBucket: bucketLevel(budget)
      },
      scan: {
        provided: hasScan,
        distance: scan.distance ?? null,
        confidence: scan.confidenceHint ?? "unknown"
      },
      structural: {
        provided: hasObservation,
        keys: Object.keys(observation || {})
      },
      identity,
      trust
    };

    return emitAiSurgeonPacket("archetype-artery", {
      scan,
      observation,
      binaryVitals,
      artery
    });
  }
});


// ============================================================================
//  FACTORY EXPORT — createSurgeonAPI (Brainstem-Compatible)
// ============================================================================
export function createSurgeonAPI({ context = {}, db = null, pulsePort = null } = {}) {
  return Object.freeze({
    meta: AiSurgeonMeta,
    exportMeta: EXPORT_META,

    // direct access to prewarm
    prewarm: (opts = {}) => prewarmAiSurgeon(opts),

    // core interpreters
    scanInterpreter: (opts = {}) => PulseRole.scanInterpreter(opts),
    structuralInterpreter: (opts = {}) => PulseRole.structuralInterpreter(opts),
    archetypeArtery: (opts = {}) => PulseRole.archetypeArtery(opts),

    // identity
    identity: AiSurgeonMeta.identity,
    version: AiSurgeonMeta.version,
    layer: AiSurgeonMeta.layer
  });
}

PulseRealm.PulseAISurgeon = createSurgeonAPI;