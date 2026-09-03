// ============================================================================
//  aiDoctorAssistant-v30.js — PulseOS Doctor’s Assistant Organ — v30.0‑IMMORTAL‑ADVANTAGE
//  Clinical Mapper • Pattern Interpreter • Route‑Based Medical Info Reader
//  PURE COMPUTE. ZERO NETWORK FROM THIS ORGAN. ZERO RANDOMNESS.
//  EDUCATIONAL ONLY. ZERO DIAGNOSIS. ZERO TREATMENT.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// Minimal v30 meta (no external remnants, no undefined globals)
export const DoctorMeta = Object.freeze({
  identity: "aiDoctorAssistant-v30-Immortal-Advantage",
  version: "30.0-Immortal-Advantage",
  role: "doctor_assistant",
  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    egoFree: true,
    adaptive: true,
    harmonic: true,
    symbolicOnly: true,
    zeroNetworkFromOrgan: true,
    zeroDiagnosis: true,
    zeroTreatment: true,
    epoch: "30-Immortal-Advantage"
  }),
  contract: Object.freeze({
    purpose:
      "Provide structural and clinical-pattern education to support better conversations with licensed clinicians.",
    never: Object.freeze([
      "diagnose conditions",
      "recommend treatment",
      "override clinicians",
      "simulate prescriptions",
      "give medical clearance",
      "replace professional medical judgment"
    ]),
    always: Object.freeze([
      "stay educational",
      "stay structural",
      "stay pattern-focused",
      "stay non-diagnostic",
      "defer to licensed clinicians",
      "preserve safety framing"
    ])
  })
});

// ============================================================================
//  PRESSURE HELPERS
// ============================================================================

function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals.layered.organism.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals.binary.pressure != null)
    return binaryVitals.binary.pressure;
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
//  ARCHETYPE ARTERY v3 — symbolic-only, deterministic
// ============================================================================

function archetypeArtery({ symptoms = [], scan = {}, binaryVitals = {} } = {}) {
  const binaryPressure = extractBinaryPressure(binaryVitals);

  const hasSymptoms = Array.isArray(symptoms) && symptoms.length > 0;
  const hasScan = !!scan;

  const localPressure =
    (hasSymptoms ? 0.3 : 0) +
    (hasScan ? 0.3 : 0) +
    binaryPressure * 0.4;

  const pressure = Math.max(0, Math.min(1, localPressure));

  return {
    organism: {
      pressure,
      pressureBucket: bucketPressure(pressure)
    },
    symptoms: {
      provided: hasSymptoms,
      count: symptoms.length
    },
    scan: {
      provided: hasScan,
      distance: scan.distance ?? null,
      confidence: scan.confidenceHint ?? "unknown"
    }
  };
}

// v30: owner/subordinate snapshot for Architect/Overmind
function buildDoctorArterySnapshot({ symptoms = [], scan = {}, binaryVitals = {} } = {}) {
  const binaryPressure = extractBinaryPressure(binaryVitals);
  const archetype = archetypeArtery({ symptoms, scan, binaryVitals });

  return Object.freeze({
    type: "doctor-assistant-artery",
    owner: "Aldwyn",
    subordinate: true,
    binaryPressure,
    binaryPressureBucket: bucketPressure(binaryPressure),
    archetype,
    meta: {
      identity: DoctorMeta.identity,
      version: DoctorMeta.version,
      role: DoctorMeta.role
    }
  });
}

// ============================================================================
//  MEDICAL INFO POINTER (EDUCATIONAL ONLY, ZERO NETWORK FROM ORGAN)
// ============================================================================

function _medicalInfoPointer({ topic = "" } = {}) {
  const sources = {
    general:    "https://medlineplus.gov/search/?query=",
    anatomy:    "https://www.innerbody.com/search?q=",
    conditions: "https://www.mayoclinic.org/search/search-results?q=",
    research:   "https://pubmed.ncbi.nlm.nih.gov/?term=",
    nih:        "https://www.nih.gov/search?query=",
    cdc:        "https://www.cdc.gov/search/?query="
  };

  const base = sources.general;
  const q    = encodeURIComponent(topic || "");
  const url  = `${base}${q}`;

  return Object.freeze({
    kind: "medical-info-pointer",
    topic,
    url,
    meta: {
      organ: DoctorMeta.identity,
      version: DoctorMeta.version,
      mode: "pointer",
      zeroNetworkFromThisOrgan: true
    },
    note:
      "Deterministic pointer to public educational medical resources. This is NOT medical advice. External I/O is handled by the caller, not this doctor’s assistant."
  });
}

// ============================================================================
//  DOCTOR ASSISTANT ORGAN — v30 IMMORTAL‑ADVANTAGE
// ============================================================================

export function createDoctorOrgan(context = {}) {
  function prewarm() {
    return true;
  }

  // ------------------------------------------------------------------------
  //  SYMPTOM PATTERN INTERPRETER v3 (EDUCATIONAL ONLY)
  // ------------------------------------------------------------------------
  function interpretSymptoms(symptoms = [], binaryVitals = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const patterns = [
      "inflammatory pattern",
      "neurological pattern",
      "vascular pattern",
      "mechanical stress pattern",
      "systemic pattern"
    ];

    return Object.freeze({
      type: "symptom-patterns",
      symptoms,
      patterns:
        binaryPressure >= 0.7
          ? patterns.slice(0, 3)
          : patterns,
      message:
        "Mapped symptoms to broad clinical pattern categories. These are conceptual buckets, not diagnoses."
    });
  }

  // ------------------------------------------------------------------------
  //  SCAN INTERPRETER v3 (STRUCTURAL, NON-DIAGNOSTIC)
// ------------------------------------------------------------------------
  function interpretScan(scan = {}, binaryVitals = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const observations = [
      "density transitions",
      "symmetry vs asymmetry",
      "gradient edges",
      "fluid or pressure patterns",
      "mechanical compensation"
    ];

    return Object.freeze({
      type: "scan-interpretation",
      scan,
      observations:
        binaryPressure >= 0.7
          ? observations.slice(0, 3)
          : observations,
      message:
        "Scan interpretation generated. This is structural and educational, not medical advice."
    });
  }

  // ------------------------------------------------------------------------
  //  RISK TIER OUTLINER v3 (CONCEPTUAL ONLY)
// ------------------------------------------------------------------------
  function outlineRiskTiers(patterns = [], binaryVitals = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const tiers = {
      low: "mild, self-limiting patterns",
      medium: "patterns that may warrant clinician review",
      high: "patterns that clinicians typically prioritize for evaluation"
    };

    return Object.freeze({
      type: "risk-tiers",
      patterns,
      tiers:
        binaryPressure >= 0.7
          ? { low: tiers.low, medium: tiers.medium }
          : tiers,
      message:
        "Risk tiers outlined conceptually. These are not medical risk scores."
    });
  }

  // ------------------------------------------------------------------------
  //  CLINICIAN QUESTION SUGGESTER v3
  // ------------------------------------------------------------------------
  function suggestClinicianQuestions(patterns = [], binaryVitals = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const questions = [
      "What structures could explain this pattern?",
      "Are there red flags that need immediate attention?",
      "What tests help differentiate these buckets?",
      "What mechanisms could be driving the symptoms?",
      "What changes should be monitored over time?"
    ];

    return Object.freeze({
      type: "clinician-questions",
      patterns,
      questions:
        binaryPressure >= 0.7
          ? questions.slice(0, 3)
          : questions,
      message:
        "Suggested questions to ask a clinician. These support informed conversations, not self-diagnosis."
    });
  }

  // ------------------------------------------------------------------------
  //  MECHANISM EXPLAINER v3
  // ------------------------------------------------------------------------
  function explainMechanisms(pattern = "", binaryVitals = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const mechanisms = [
      "nerve pathway involvement",
      "vascular flow constraints",
      "inflammatory cascades",
      "mechanical load distribution",
      "tissue density transitions"
    ];

    return Object.freeze({
      type: "mechanism-explanation",
      pattern,
      mechanisms:
        binaryPressure >= 0.7
          ? mechanisms.slice(0, 3)
          : mechanisms,
      message:
        "Mechanism explanation generated. This is educational, not diagnostic."
    });
  }

  // ------------------------------------------------------------------------
  //  SAFETY LINE v3
  // ------------------------------------------------------------------------
  function safetyLine() {
    return (
      "This is general medical and structural pattern information. " +
      "For diagnosis, treatment, or medical decisions, a licensed clinician is required."
    );
  }

  // ------------------------------------------------------------------------
  //  MEDICAL INFO QUERY v2 — POINTER OR HOST-ROUTED
  // ------------------------------------------------------------------------
  function medicalInfoQuery({ topic = "", mode = "auto", route = null } = {}) {
    const pointer = _medicalInfoPointer({ topic });

    const effectiveMode =
      mode === "auto"
        ? (typeof route === "function" ? "route" : "pointer")
        : mode;

    if (effectiveMode !== "route" || typeof route !== "function") {
      return pointer;
    }

    const request = {
      type: "medical-info-query",
      payload: { topic },
      meta: {
        fromOrgan: DoctorMeta.identity,
        version: DoctorMeta.version,
        role: DoctorMeta.role
      }
    };

    const result = route(request);

    return {
      kind: "medical-info-route",
      topic,
      pointer,
      result,
      message:
        "Educational medical information retrieved via host routing. Use this to better understand terms and to prepare questions for your clinician. It is not medical advice.",
      meta: {
        organ: DoctorMeta.identity,
        version: DoctorMeta.version,
        mode: "route",
        zeroNetworkFromThisOrgan: true
      }
    };
  }

  // ------------------------------------------------------------------------
  //  MEDICAL INFO READER v1 — interpret routed educational text
  // ------------------------------------------------------------------------
  function medicalInfoReader(info = {}, binaryVitals = {}) {
    const notes = [];
    const text = (info.rawText || "").toLowerCase();

    if (!info.rawText) {
      return {
        notes: ["No medical info text provided to medicalInfoReader."],
        citations: info.citations || [],
        source: info.source || null
      };
    }

    const binaryPressure =
      binaryVitals.layered.organism.pressure ??
      binaryVitals.binary.pressure ??
      0;

    if (binaryPressure >= 0.7) {
      notes.push("System load is elevated — interpretation is simplified.");
    }

    if (text.includes("inflammation")) {
      notes.push("Educational note: inflammation often relates to immune activation or tissue stress patterns.");
    }

    if (text.includes("nerve") || text.includes("neurolog")) {
      notes.push("Educational note: neurological mechanisms may involve signaling pathways, compression, or conduction changes.");
    }

    if (text.includes("vascular") || text.includes("blood flow")) {
      notes.push("Educational note: vascular patterns may relate to circulation, perfusion, or pressure gradients.");
    }

    if (text.includes("muscle") || text.includes("tissue")) {
      notes.push("Educational note: tissue and muscle patterns can reflect load, strain, or compensation.");
    }

    notes.push(
      "A doctor’s assistant would connect these educational concepts to your described patterns so you can prepare questions for your clinician. This is NOT medical advice."
    );

    return {
      notes,
      citations: info.citations || [],
      source: info.source || null,
      meta: info.meta || {}
    };
  }

  // ========================================================================
  //  PUBLIC DOCTOR’S ASSISTANT API (v30.0‑IMMORTAL‑ADVANTAGE)
// ========================================================================
  return Object.freeze({
    meta: DoctorMeta,
    prewarm,

    log(message) {
      console.log(`aiDoctorAssistant: ${message}`);
    },

    interpretSymptoms,
    interpretScan,
    outlineRiskTiers,
    suggestClinicianQuestions,
    explainMechanisms,
    archetypeArtery,
    medicalInfoQuery,
    medicalInfoReader,
    safetyLine,

    // v30 artery snapshot for Architect/Overmind
    doctorArterySnapshot: buildDoctorArterySnapshot
  });
}

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================

PulseRealm.PulseAIDoctorAssistant = createDoctorOrgan;