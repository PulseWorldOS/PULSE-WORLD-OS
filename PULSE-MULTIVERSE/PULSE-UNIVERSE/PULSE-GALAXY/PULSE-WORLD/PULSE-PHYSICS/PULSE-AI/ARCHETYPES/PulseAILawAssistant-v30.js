// ============================================================================
//  aiLawAssistant-v30.js — PulseOS Legal Assistant Organ — v30.0‑IMMORTAL‑ADVANTAGE
//  Structured • Neutral • Doctrine‑Aware • Route‑Based Law Reader
//  v30+ UPGRADE: Clean meta, signal-safe tracing, no undefined globals, pure compute.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
//  CANONICAL ROLE:
//    • Law Assistant (Not a Lawyer).
//    • Provides general legal information, research support, and doctrine mapping.
//    • Helps users understand what topics, questions, or documents may be relevant
//      to bring to a licensed attorney.
//    • Spots legal issues and maps doctrines from documents, permits, and law text.
//    • Requests law data via PulseOS route() and reads real statutes/rules.
//    • Guides users toward the kinds of issues lawyers typically examine,
//      WITHOUT recommending actions or replacing a lawyer.
//
//  ROLE BOUNDARY (Declared Once):
//    • This organ is a Law Assistant, not a lawyer.
//    • It does not give legal advice or tell users what to do.
//    • It does not replace a licensed attorney.
//    • It is meant to support you and your lawyer by organizing information,
//      highlighting issues, and surfacing questions you may want to ask.
//
//  HARD GUARANTEES:
//    • No legal advice, no “do X” directives.
//    • No jurisdiction‑specific outcome predictions.
//    • No direct network primitives (no fetch/axios/etc inside this file).
//    • All external I/O is mediated by the caller’s route() / CNS.
//    • From this organ’s perspective: pure compute over provided data.
//
// ============================================================================


// ============================================================================
//  GLOBAL HANDLE (environment-agnostic, v30 IMMORTAL)
// ============================================================================



// ============================================================================
//  SIGNAL-AWARE TRACING (v30, no undefined globals)
// ============================================================================

function traceLawEvent(event, payload, traceFlag) {
  if (!traceFlag) return;

  const message = `[aiLawAssistant] ${event}`;

  const s = PulseRealm.PulseProofSignal;
  if (s && typeof s.signal === "function") {
    s.signal({
      level: "info",
      subsystem: "law-assistant",
      message,
      extra: payload || {},
      system: PulseRole,          // use canonical role meta
      organ: PulseRole.identity,  // organ identity
      layer: PulseRole.layer,
      band: "dual"
    });
    return;
  }

  console.log(message, payload);
}
// ============================================================================
//  ORGAN ROLE META (v30 IMMORTAL‑ADVANTAGE)
// ============================================================================

export const PulseRole = Object.freeze({
  type: "Cognitive",
  subsystem: "aiLawAssistant",
  layer: "C5-LegalMapper",
  version: "30.0-IMMORTAL-ADVANTAGE",
  identity: "aiLawAssistant-v30-IMMORTAL-ADVANTAGE",

  evo: Object.freeze({
    driftProof: true,
    deterministic: true,
    dualband: true,
    packetAware: true,
    evolutionAware: true,
    windowAware: true,
    bluetoothReady: true,

    binaryAware: true,
    symbolicAware: true,
    safetyReflex: true,
    documentAware: true,
    argumentAware: true,

    archetypeArteryAware: true,
    lawQueryAware: true,
    lawRouteAware: true,
    lawReaderAware: true,
    multiInstanceReady: true,
    readOnly: true,
    epoch: "30.0-IMMORTAL-ADVANTAGE",

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true
  }),

  contract: Object.freeze({
    purpose:
      "Act as a law assistant: spot legal issues, map doctrines, outline arguments and counterarguments, and explain how legal reasoning typically works.",
    boundaries: Object.freeze([
      "not a lawyer",
      "no legal advice",
      "no prescriptive directives",
      "no jurisdiction-specific predictions",
      "pure compute",
      "ego-free",
      "treat external law data as informational only"
    ])
  }),

  voice: Object.freeze({
    tone: "structured, logical, neutral",
    style: "issue-first, doctrine-first, risk-aware",
    evolutionTone: "calm, grounded, non-authoritative"
  }),

  boundaryReflex() {
    return "I’m a law assistant, not a lawyer. I can help you understand issues and questions to bring to your attorney, but I don’t give legal advice.";
  },

  // ==========================================================================
  //  DOCUMENT INTERPRETER v3 — issue spotting + doctrine mapping
  // ==========================================================================
  documentInterpreter(doc = {}, binaryVitals = {}, trace = false) {
    const notes = [];
    const questionsForLawyer = [];

    if (!doc.text) {
      return {
        notes: ["No document text provided."],
        questionsForLawyer: []
      };
    }

    const text = doc.text.toLowerCase();
    const binaryPressure =
      binaryVitals.layered.organism.pressure ??
      binaryVitals.binary.pressure ??
      0;

    if (binaryPressure >= 0.7) {
      notes.push("System load is elevated — interpretations are simplified for safety.");
    }

    if (text.includes("permit")) {
      notes.push(
        "Permit language detected — assistants typically flag scope, conditions, revocation clauses, and compliance obligations."
      );
      questionsForLawyer.push(
        "Does the scope or conditions of this permit create any unexpected obligations or risks for me?"
      );
    }

    if (text.includes("liability")) {
      notes.push(
        "Liability terms detected — doctrines include negligence, duty of care, assumption of risk, and strict liability."
      );
      questionsForLawyer.push(
        "How do these liability terms affect my exposure to risk?"
      );
    }

    if (text.includes("contract")) {
      notes.push(
        "Contract structure detected — assistants map offer, acceptance, consideration, and enforceability."
      );
      questionsForLawyer.push(
        "Are there any clauses in this contract that could be unusually risky?"
      );
    }

    if (text.includes("privacy")) {
      notes.push(
        "Privacy-related language — frameworks include consent, data handling, retention, and expectations of privacy."
      );
      questionsForLawyer.push(
        "Do these privacy terms align with what I expect will happen to my data?"
      );
    }

    if (text.includes("zoning") || text.includes("land use")) {
      notes.push(
        "Zoning or land-use concepts detected — assistants identify permitted uses, variances, and compliance pathways."
      );
      questionsForLawyer.push(
        "Are there zoning or land-use restrictions that could block my intended use?"
      );
    }

    notes.push(
      "A law assistant maps issues, identifies doctrines, and collects comparable rules for a lawyer to analyze."
    );
    questionsForLawyer.push(
      "Are there any parts of this document I should pay special attention to before I sign or rely on it?"
    );

    const out = { notes, questionsForLawyer };
    traceLawEvent("documentInterpreter", out, trace);
    return out;
  },


// ============================================================================
//  PERMIT INTERPRETER v3
// ============================================================================

permitInterpreter(
  permit = {},
  binaryVitals = {},
  trace = false
) {
  const notes = [];
  const questionsForLawyer = [];

  if (!permit.description) {
    return {
      notes: ["No permit description provided."],
      questionsForLawyer: []
    };
  }

  const desc = permit.description.toLowerCase();
  const binaryPressure =
    binaryVitals.layered.organism.pressure ??
    binaryVitals.binary.pressure ??
    0;

  if (binaryPressure >= 0.7) {
    notes.push("System load is elevated — interpretations are simplified.");
  }

  notes.push(
    "Permit detected — assistants flag scope, conditions, compliance obligations, and revocation triggers."
  );
  questionsForLawyer.push(
    "What happens if I fail to meet any of the conditions in this permit?"
  );

  if (desc.includes("construction")) {
    notes.push(
      "Construction permit — categories include zoning compliance, environmental impact, building codes, and safety requirements."
    );
    questionsForLawyer.push(
      "Are there building code or safety requirements that could be costly?"
    );
  }

  if (desc.includes("business")) {
    notes.push(
      "Business permit — assistants check operational scope, renewal requirements, and regulatory obligations."
    );
    questionsForLawyer.push(
      "Does this business permit limit the activities I can legally perform?"
    );
  }

  if (desc.includes("event")) {
    notes.push(
      "Event permit — considerations include crowd safety, insurance, noise limits, and public space rules."
    );
    questionsForLawyer.push(
      "Do I need special insurance or additional approvals beyond this event permit?"
    );
  }

  notes.push(
    "A law assistant compares permit language to similar permits and doctrines for a lawyer to review."
  );
  questionsForLawyer.push(
    "Is there anything in this permit that could expose me to fines or shutdowns?"
  );

  const out = { notes, questionsForLawyer };
  traceLawEvent("permitInterpreter", out, trace);
  return out;
},

// ============================================================================
//  ARGUMENT MAPPER v3
// ============================================================================

argumentMapper(
  issue = "",
  binaryVitals = {},
  trace = false
) {
  const notes = [];
  const questionsForLawyer = [];

  if (!issue) {
    return {
      notes: ["No issue provided."],
      questionsForLawyer: []
    };
  }

  const binaryPressure =
    binaryVitals.layered.organism.pressure ??
    binaryVitals.binary.pressure ??
    0;

  if (binaryPressure >= 0.7) {
    notes.push("System load is elevated — argument mapping simplified.");
  }

  notes.push(`Issue identified: ${issue}`);
  notes.push(
    "Legal reasoning: identify governing rule, apply it to facts, consider exceptions or competing doctrines."
  );
  notes.push(
    "Arguments focus on interpretation, intent, compliance, and whether facts satisfy rule elements."
  );
  notes.push(
    "Counterarguments challenge applicability, factual assumptions, or interpretation of key terms."
  );

  questionsForLawyer.push(
    "Based on this issue, what legal options might be available?"
  );
  questionsForLawyer.push(
    "Are there deadlines or statutes of limitation I should be aware of?"
  );
  questionsForLawyer.push(
    "What facts about my situation are most important for you to evaluate this issue?"
  );

  const out = { notes, questionsForLawyer };
  traceLawEvent("argumentMapper", out, trace);
  return out;
},

// ============================================================================
//  ARCHETYPE ARTERY v3 — symbolic-only, deterministic
// ============================================================================

archetypeArtery({
  doc = {},
  permit = {},
  issue = "",
  binaryVitals = {},
  trace = false
} = {}) {
  const binaryPressure =
    binaryVitals.layered.organism.pressure ??
    binaryVitals.binary.pressure ??
    0;

  const hasDoc = !!doc.text;
  const hasPermit = !!permit.description;
  const hasIssue = !!issue;

  const localPressure =
    (hasDoc ? 0.3 : 0) +
    (hasPermit ? 0.3 : 0) +
    (hasIssue ? 0.3 : 0) +
    binaryPressure * 0.4;

  const pressure = Math.max(0, Math.min(1, localPressure));

  const out = {
    organism: {
      pressure,
      pressureBucket:
        pressure >= 0.9
          ? "overload"
          : pressure >= 0.7
          ? "high"
          : pressure >= 0.4
          ? "medium"
          : pressure > 0
          ? "low"
          : "none"
    },
    inputs: {
      hasDoc,
      hasPermit,
      hasIssue
    }
  };

  traceLawEvent("archetypeArtery", out, trace);
  return out;
},

// ============================================================================
//  INTERNAL HELPER — LAW QUERY POINTER (no route, no I/O)
// ============================================================================

_lawQueryPointer({
  jurisdiction = "federal",
  topic = ""
} = {}) {
  const sources = {
    federal: "https://www.law.cornell.edu/search/site/",
    arizona: "https://www.azleg.gov/arsDetail/?title=",
    california:
      "https://leginfo.legislature.ca.gov/faces/search.xhtml?search_keywords=",
    new_york: "https://www.nysenate.gov/legislation/laws?search=",
    florida:
      "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Search&Search_String="
  };

  const key = (jurisdiction || "federal").toLowerCase();
  const base = sources[key] || sources.federal;
  const q = encodeURIComponent(topic || "");
  const url = `${base}${q}`;

  return Object.freeze({
    kind: "law-query-pointer",
    meta: {
      organ: PulseRole.identity,
      version: PulseRole.version,
      mode: "pointer",
      zeroNetworkFromThisOrgan: true
    },
    jurisdiction: key,
    topic,
    url,
    note:
      "Deterministic pointer to a public law reference site. External I/O is handled by the caller, not this law assistant."
  });
},

// ============================================================================
//  LAW READER v1 — interpret routed law text (statutes / rules)
// ============================================================================

lawReader(law = {}, binaryVitals = {}, trace = false) {
  const notes = [];
  const questionsForLawyer = [];
  const text = (law.rawText || "").toLowerCase();

  if (!law.rawText) {
    return {
      notes: ["No law text provided to lawReader."],
      questionsForLawyer: [],
      citations: law.citations || [],
      source: law.source || null
    };
  }

  const binaryPressure =
    binaryVitals.layered.organism.pressure ??
    binaryVitals.binary.pressure ??
    0;

  if (binaryPressure >= 0.7) {
    notes.push("System load is elevated — law interpretation simplified.");
  }

  if (text.includes("negligence") || text.includes("duty of care")) {
    notes.push(
      "Negligence concepts detected — elements include duty, breach, causation, and damages."
    );
    questionsForLawyer.push(
      "Does this negligence standard change how a court might view my responsibilities?"
    );
  }

  if (text.includes("strict liability")) {
    notes.push(
      "Strict liability detected — focus is on the nature of the activity and resulting harm."
    );
    questionsForLawyer.push(
      "Does strict liability here mean I could be responsible even if careful?"
    );
  }

  if (text.includes("contract") || text.includes("agreement")) {
    notes.push(
      "Contract language detected — assistants map offer, acceptance, consideration, enforceability."
    );
    questionsForLawyer.push(
      "Are there conditions that could make enforcing my rights difficult?"
    );
  }

  if (text.includes("privacy") || text.includes("personal data")) {
    notes.push(
      "Privacy language detected — themes include consent, data handling, retention, expectations."
    );
    questionsForLawyer.push(
      "Do these privacy rules give me rights to access or delete my data?"
    );
  }

  if (text.includes("zoning") || text.includes("land use")) {
    notes.push(
      "Zoning or land-use language detected — analysis includes permitted uses, variances, compliance."
    );
    questionsForLawyer.push(
      "Would I need a variance or special permission for my intended use?"
    );
  }

  notes.push(
    "A law assistant connects these provisions to the user’s situation for a lawyer to review."
  );
  questionsForLawyer.push(
    "Based on this law, what are the main risks or protections that might apply?"
  );

  const out = {
    notes,
    questionsForLawyer,
    citations: law.citations || [],
    source: law.source || null,
    meta: law.meta || {}
  };

  traceLawEvent("lawReader", out, trace);
  return out;
},

// ============================================================================
//  LAW + ISSUE MAPPER v1 — combine user issue + routed law text
// ============================================================================

issueWithLaw(
  { issue = "", law = {}, binaryVitals = {}, trace = false } = {}
) {
  const base = this.argumentMapper(issue, binaryVitals, trace);
  const lawView = this.lawReader(law, binaryVitals, trace);

  const out = {
    issueNotes: base.notes,
    lawNotes: lawView.notes,
    questionsForLawyer: [
      ...(base.questionsForLawyer || []),
      ...(lawView.questionsForLawyer || [])
    ],
    citations: lawView.citations,
    source: lawView.source,
    meta: lawView.meta
  };

  traceLawEvent("issueWithLaw", out, trace);
  return out;
},

// ============================================================================
//  LAW QUERY v3 — pointer + route‑based query
// ============================================================================

lawQuery({
  jurisdiction = "federal",
  topic = "",
  mode = "auto",
  route = null,
  trace = false
} = {}) {
  const pointer = this._lawQueryPointer({ jurisdiction, topic });

  const effectiveMode =
    mode === "auto"
      ? (typeof route === "function" ? "route" : "pointer")
      : mode;

  // ---------------------------------------------------------
  //  POINTER MODE — deterministic URL only
  // ---------------------------------------------------------
  if (effectiveMode !== "route" || typeof route !== "function") {
    traceLawEvent("lawQuery:pointer", pointer, trace);
    return pointer;
  }

  // ---------------------------------------------------------
  //  ROUTE MODE — caller handles all external I/O
  // ---------------------------------------------------------
  const request = {
    type: "law-query",
    payload: {
      jurisdiction: pointer.jurisdiction,
      topic: pointer.topic
    },
    meta: {
      fromOrgan: PulseRole.identity,
      version: PulseRole.version,
      role: "legal_assistant"
    }
  };

  let result;
  try {
    result = route(request);
  } catch (err) {
    const out = {
      kind: "law-query-route",
      meta: {
        organ: PulseRole.identity,
        version: PulseRole.version,
        mode: "route",
        zeroNetworkFromThisOrgan: true
      },
      jurisdiction: pointer.jurisdiction,
      topic: pointer.topic,
      pointer,
      result: { error: String(err), meta: {} }
    };
    traceLawEvent("lawQuery:route-error", out, trace);
    return out;
  }

  const out = {
    kind: "law-query-route",
    meta: {
      organ: PulseRole.identity,
      version: PulseRole.version,
      mode: "route",
      zeroNetworkFromThisOrgan: true
    },
    jurisdiction: pointer.jurisdiction,
    topic: pointer.topic,
    pointer,
    result
  };

  traceLawEvent("lawQuery:route", out, trace);
  return out;
}
});

// ============================================================================
//  ORGAN EXPORT — v30 IMMORTAL‑ADVANTAGE
// ============================================================================

export const aiLawAssistant = Object.freeze(PulseRole);
// ============================================================================
//  FACTORY EXPORT — createLawyerAPI (Brainstem-Compatible)
// ============================================================================
export function createLawyerAPI({ context = {}, db = null, pulsePort = null } = {}) {
  return Object.freeze({
    meta: PulseRole,
    identity: PulseRole.identity,
    version: PulseRole.version,
    layer: PulseRole.layer,

    // core interpreters
    documentInterpreter: (opts = {}) => PulseRole.documentInterpreter(opts),
    permitInterpreter: (opts = {}) => PulseRole.permitInterpreter(opts),
    argumentMapper: (opts = {}) => PulseRole.argumentMapper(opts),
    archetypeArtery: (opts = {}) => PulseRole.archetypeArtery(opts),
    lawReader: (opts = {}) => PulseRole.lawReader(opts),
    issueWithLaw: (opts = {}) => PulseRole.issueWithLaw(opts),
    lawQuery: (opts = {}) => PulseRole.lawQuery(opts),

    // meta + role
    role: PulseRole,
    exportMeta: {
      organ: PulseRole.identity,
      version: PulseRole.version,
      epoch: PulseRole.evo.epoch,
      role: "legal-assistant"
    }
  });
}

// Default export for convenience
export default createLawyerAPI;

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS) — v30 clean, no undefined symbols
// ============================================================================

PulseRealm.AILawAssistant = {
    PulseRole,
    aiLawAssistant
}
