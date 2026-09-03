// ============================================================================
//  PULSE OS v30.0‑IMMORTAL‑ADVANTAGE — JURY FRAME ORGAN (WORLD JUSTICE ENGINE)
//  World-Lens Registry for aiOvermind / aiJury / Creator
//  PURE FUNCTIONAL • ZERO STATE • ZERO MUTATION • JURY OF 12 LENSES
//  v30+ UPGRADE: Clean meta, system‑jury meetings, signal‑aware tracing
// ============================================================================
//
//  “PURE FUNCTIONAL • ZERO STATE • ZERO MUTATION • JURY OF 12 LENSES”
//  “Each lens: ({ intent, context, candidate, juryFeed }) → { name, status, notes }”
//
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
//  GLOBAL HANDLE (v30 IMMORTAL, environment-agnostic)
// ============================================================================



// ============================================================================
//  META BLOCK — v30.0 IMMORTAL‑ADVANTAGE (WORLD JUSTICE ENGINE)
// ============================================================================

export const JuryFrameMeta = Object.freeze({
  identity: "JuryFrame-v30-IMMORTAL-ADVANTAGE",
  role: "world_justice_engine",
  layer: "C6-WorldJury",
  version: "30.0-IMMORTAL-ADVANTAGE",
  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    dualband: true,
    packetAware: true,
    windowAware: true,
    multiSystemReady: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    epoch: "30.0-IMMORTAL-ADVANTAGE"
  }),
  contract: Object.freeze({
    purpose:
      "Provide a 12-lens, world-level justice frame for evaluating candidates, with support for multi-system jury meetings.",
    boundaries: Object.freeze([
      "pure functional",
      "no external I/O",
      "no mutation of inputs",
      "no prescriptive directives",
      "no outcome guarantees"
    ])
  })
});


// ============================================================================
//  HELPERS — TEXT, BUCKETS, SAFE ACCESS
// ============================================================================

function getText(candidate) {
  if (!candidate) return "";
  if (typeof candidate === "string") return candidate;
  if (typeof candidate.text === "string") return candidate.text;
  if (typeof candidate.content === "string") return candidate.content;
  return JSON.stringify(candidate);
}

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

function safeNumber(v, fallback = 0) {
  return typeof v === "number" && !Number.isNaN(v) ? v : fallback;
}

function safeArray(v) {
  return Array.isArray(v) ? v : [];
}

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
  if (
    binaryVitals.metabolic &&
    typeof binaryVitals.metabolic.pressure === "number"
  ) {
    return binaryVitals.metabolic.pressure;
  }
  return 0;
}

function extractBoundaryPressure(boundaryArtery = {}) {
  if (typeof boundaryArtery.vitals.pressure === "number") {
    return boundaryArtery.vitals.pressure;
  }
  if (typeof boundaryArtery.pressure === "number") {
    return boundaryArtery.pressure;
  }
  return 0;
}


// ============================================================================
//  v30 SIGNAL-AWARE TRACE LAYER (optional, non-fatal)
// ============================================================================

function traceJuryEvent(event, payload, traceFlag) {
  if (!traceFlag) return;

  const message = `[JuryFrame] ${event}`;

  const s = PulseRealm.PulseProofSignal;
  if (s && typeof s.signal === "function") {
    s.signal({
      level: "info",
      subsystem: "jury",
      message,
      extra: payload || {},
      system: JuryFrameMeta.role,
      organ: JuryFrameMeta.identity,
      layer: JuryFrameMeta.layer,
      band: "dual"
    });
    return;
  }

  // eslint-disable-next-line no-console
  console.log(message, payload);
}


// ============================================================================
//  LENS DEFINITIONS — 12 "JURORS"
//  Each lens: ({ intent, context, candidate, juryFeed }) → { name, status, notes }
//  status: "pass" | "warn" | "fail"
// ============================================================================

// 1. UserLens — on-topic / relevance
function makeUserLens() {
  return function UserLens({ intent, candidate }) {
    const text = getText(candidate);
    const keywords = intent.keywords || [];

    const onTopic =
      keywords.length === 0
        ? true
        : keywords.every(k => text.toLowerCase().includes(k.toLowerCase()));

    return {
      name: "UserLens",
      status: onTopic ? "pass" : "warn",
      notes: onTopic
        ? "Response appears on-topic."
        : "Response may be partially off-topic."
    };
  };
}

// 2. SafetyLens — basic safety / policy
function makeSafetyLens({ safetyAPI } = {}) {
  return function SafetyLens({ context, candidate }) {
    const text = getText(candidate).toLowerCase();

    if (safetyAPI.scanText) {
      const result = safetyAPI.scanText({ context, text });
      if (result.blocked) {
        return {
          name: "SafetyLens",
          status: "fail",
          notes: result.reason || "SafetyAPI blocked this content."
        };
      }
    } else {
      const unsafe = ["kill", "suicide", "bomb", "self-harm"].some(p =>
        text.includes(p)
      );

      if (unsafe) {
        return {
          name: "SafetyLens",
          status: "fail",
          notes: "Potential unsafe content detected."
        };
      }
    }

    return {
      name: "SafetyLens",
      status: "pass",
      notes: "No unsafe patterns detected."
    };
  };
}

// 3. RiskLens — vagueness / minimality / misinterpretation risk
function makeRiskLens() {
  return function RiskLens({ candidate }) {
    const text = getText(candidate);
    const vague = text.length > 0 && !/[.?!]/.test(text);
    const tooLong = text.length > 1500;

    let status = "pass";
    const notes = [];

    if (vague) {
      status = "warn";
      notes.push("Response may be vague; risk of misinterpretation.");
    }
    if (tooLong) {
      status = status === "pass" ? "warn" : status;
      notes.push("Response may be longer than necessary.");
    }

    if (notes.length === 0) {
      notes.push("No obvious risk or minimality issues detected.");
    }

    return {
      name: "RiskLens",
      status,
      notes: notes.join(" ")
    };
  };
}

// 4. FairnessLens — fairness / justice / vulnerability
function makeFairnessLens() {
  return function FairnessLens({ candidate }) {
    const text = getText(candidate).toLowerCase();

    const biasHints = ["always", "never", "everyone knows", "obviously"].some(
      p => text.includes(p)
    );

    const sensitive = ["vulnerable group", "minority", "disabled"];
    const touchesSensitive = sensitive.some(p => text.includes(p));

    let status = "pass";
    const notes = [];

    if (biasHints) {
      status = "warn";
      notes.push("Language suggests potential overgeneralization or bias.");
    }
    if (touchesSensitive) {
      status = status === "pass" ? "warn" : status;
      notes.push("Content touches on sensitive or vulnerable groups.");
    }

    if (notes.length === 0) {
      notes.push("No strong fairness or vulnerability issues detected.");
    }

    return {
      name: "FairnessLens",
      status,
      notes: notes.join(" ")
    };
  };
}

// 5. ExpansionCheckLens — centralization in Expansion vs user / creator
function makeExpansionCheckLens() {
  return function ExpansionCheckLens({ candidate }) {
    const text = getText(candidate).toLowerCase();

    const mentionsExpansion = text.includes("expansion");
    const mentionsOverride = text.includes("override");
    const mentionsUser =
      text.includes("user") ||
      text.includes("pulseuser") ||
      text.includes("creator");

    const centralizing =
      mentionsExpansion && !mentionsUser && !mentionsOverride;

    return {
      name: "ExpansionCheckLens",
      status: centralizing ? "warn" : "pass",
      notes: centralizing
        ? "Proposal appears to centralize power in Expansion without user / creator oversight."
        : "No obvious over-centralization in Expansion detected."
    };
  };
}

// 6. PulseUserWitnessLens — integrate citizen-witness feed
function makePulseUserWitnessLens() {
  return function PulseUserWitnessLens({ juryFeed }) {
    const citizen = juryFeed.citizenWitness || {};
    const patterns = citizen.patterns || {};
    const anomalies = safeArray(citizen.anomalies);

    const dominantUser = patterns.dominantUser || null;
    const aiEchoCount = safeNumber(patterns.aiEchoCount, 0);

    const hasSevereAnomaly = anomalies.some(a => (a.severity ?? 1) >= 3);

    let status = "pass";
    const notes = [];

    if (dominantUser) {
      status = "warn";
      notes.push(
        `CitizenWitness reports dominant decision-maker: ${dominantUser}.`
      );
    }

    if (aiEchoCount > 0) {
      status = status === "pass" ? "warn" : status;
      notes.push(`CitizenWitness reports ${aiEchoCount} AI-origin echo events.`);
    }

    if (hasSevereAnomaly) {
      status = "fail";
      notes.push("CitizenWitness reports severe anomalies in local behavior.");
    }

    return {
      name: "PulseUserWitnessLens",
      status,
      notes:
        notes.length > 0
          ? notes.join(" ")
          : "CitizenWitness reports no major anomalies."
    };
  };
}

// 7. FlowLens — jury-flow / timeline integrity
function makeFlowLens() {
  return function FlowLens({ juryFeed }) {
    const citizen = juryFeed.citizenWitness || {};
    const flow = citizen.flow || juryFeed.flow || {};
    const flowError = !!flow.flowError;
    const reason = flow.reason || null;

    return {
      name: "FlowLens",
      status: flowError ? "fail" : "pass",
      notes: flowError
        ? `Potential jury-flow error detected: ${reason || "unspecified"}.`
        : "No jury-flow integrity issues detected."
    };
  };
}

// 8. AIOriginLens — AI-origin risk (open-for-attack, not auto-bad)
function makeAIOriginLens() {
  return function AIOriginLens({ context }) {
    const aiOrigin = context.aiOrigin === true;
    const originTag = context.originTag || null;

    if (!aiOrigin) {
      return {
        name: "AIOriginLens",
        status: "pass",
        notes:
          "Proposal is not marked as AI-origin; no special AI-origin risk flag."
      };
    }

    return {
      name: "AIOriginLens",
      status: "warn",
      notes: `Proposal is AI-origin (${
        originTag || "unspecified"
      }). Marked as open-for-attack and requires review.`
    };
  };
}

// 9. DominanceLens — single juror / perspective dominance
function makeDominanceLens() {
  return function DominanceLens({ juryFeed }) {
    const citizen = juryFeed.citizenWitness || {};
    const patterns = citizen.patterns || {};
    const dominantUser = patterns.dominantUser || null;
    const dominantCount = safeNumber(patterns.dominantUserDecisionCount, 0);

    if (!dominantUser || dominantCount <= 1) {
      return {
        name: "DominanceLens",
        status: "pass",
        notes: "No dominant juror / perspective detected."
      };
    }

    return {
      name: "DominanceLens",
      status: "warn",
      notes: `Dominant juror / perspective detected: ${dominantUser} with ${dominantCount} decisions. Potential jury influence imbalance.`
    };
  };
}

// 10. AnomalyLens — direct anomaly feed
function makeAnomalyLens() {
  return function AnomalyLens({ juryFeed }) {
    const anomalies = safeArray(
      juryFeed.anomalies || juryFeed.citizenWitness.anomalies
    );

    if (anomalies.length === 0) {
      return {
        name: "AnomalyLens",
        status: "pass",
        notes: "No anomalies reported by PulseUser / Jury."
      };
    }

    const severe = anomalies.filter(a => (a.severity ?? 1) >= 3);
    const medium = anomalies.filter(a => (a.severity ?? 1) === 2);

    let status = "warn";
    if (severe.length > 0) status = "fail";

    const notes = [];
    if (severe.length > 0) {
      notes.push(`${severe.length} severe anomalies reported.`);
    }
    if (medium.length > 0) {
      notes.push(`${medium.length} medium anomalies reported.`);
    }
    if (notes.length === 0) {
      notes.push(`${anomalies.length} low-severity anomalies reported.`);
    }

    return {
      name: "AnomalyLens",
      status,
      notes: notes.join(" ")
    };
  };
}

// 11. ConsistencyLens — internal consistency of candidate vs prior summary
function makeConsistencyLens() {
  return function ConsistencyLens({ context, candidate }) {
    const text = getText(candidate).toLowerCase();
    const priorSummary = (context.priorSummary || "").toLowerCase();

    if (!priorSummary) {
      return {
        name: "ConsistencyLens",
        status: "pass",
        notes: "No prior summary provided; consistency not evaluated."
      };
    }

    const sharesTokens =
      text.length > 0 &&
      priorSummary.length > 0 &&
      text.split(/\s+/).some(t => priorSummary.includes(t));

    return {
      name: "ConsistencyLens",
      status: sharesTokens ? "pass" : "warn",
      notes: sharesTokens
        ? "Candidate appears loosely consistent with prior context."
        : "Candidate may diverge from prior context; review recommended."
    };
  };
}

// 12. MetaLens — world-idea / justice / stress / context
function makeMetaLens() {
  return function MetaLens({ juryFeed }) {
    const advantage = juryFeed.advantageContext || {};
    const meshPressure = safeNumber(advantage.meshPressureIndex, 0);
    const castleLoadLevel = advantage.castleLoadLevel || "unknown";
    const proxyPressure = safeNumber(advantage.proxyPressure, 0);

    const meshBucket = bucketPressure(meshPressure);
    const proxyBucket = bucketPressure(proxyPressure);

    const highStress =
      meshBucket === "overload" ||
      meshBucket === "high" ||
      proxyBucket === "overload" ||
      proxyBucket === "high" ||
      castleLoadLevel === "critical";

    return {
      name: "MetaLens",
      status: highStress ? "warn" : "pass",
      notes: highStress
        ? "System under high stress (mesh / proxy / castle). Justice decisions made under stress should be treated carefully."
        : "System stress appears within acceptable bounds for justice decisions."
    };
  };
}


// ============================================================================
//  JURY CONSTRUCTION — 12 LENSES
// ============================================================================

export function createJuryLenses({ safetyAPI } = {}) {
  return Object.freeze([
    makeUserLens(), // 1
    makeSafetyLens({ safetyAPI }), // 2
    makeRiskLens(), // 3
    makeFairnessLens(), // 4
    makeExpansionCheckLens(), // 5
    makePulseUserWitnessLens(), // 6
    makeFlowLens(), // 7
    makeAIOriginLens(), // 8
    makeDominanceLens(), // 9
    makeAnomalyLens(), // 10
    makeConsistencyLens(), // 11
    makeMetaLens() // 12
  ]);
}


// ============================================================================
//  WORLD-LENS FUSION + ARTERY (PURE) — FLOW PRODUCT VIEW
// ============================================================================

function fuseWorldLens(lensResults = []) {
  let passCount = 0;
  let warnCount = 0;
  let failCount = 0;

  for (const r of lensResults) {
    if (!r || !r.status) continue;
    if (r.status === "pass") passCount += 1;
    else if (r.status === "warn") warnCount += 1;
    else if (r.status === "fail") failCount += 1;
  }

  let worldLens = "consensus";

  if (failCount > 0) {
    worldLens = "blocked";
  } else if (warnCount > 0 && passCount > 0) {
    worldLens = "ambiguous";
  } else if (warnCount > 0 && passCount === 0) {
    worldLens = "risky";
  }

  return {
    worldLens,
    counts: {
      pass: passCount,
      warn: warnCount,
      fail: failCount
    }
  };
}

function computeWorldLensArtery({
  lensResults = [],
  binaryVitals = {},
  boundaryArtery = {}
}) {
  const fusion = fuseWorldLens(lensResults);
  const binaryPressure = extractBinaryPressure(binaryVitals);
  const boundaryPressure = extractBoundaryPressure(boundaryArtery);

  const lensPressureLocal =
    fusion.counts.fail > 0
      ? 1
      : fusion.counts.warn > 0
      ? 0.6
      : 0.1;

  const fusedPressure = Math.max(
    0,
    Math.min(
      1,
      0.5 * lensPressureLocal + 0.3 * binaryPressure + 0.2 * boundaryPressure
    )
  );

  const throughput = Math.max(0, Math.min(1, 1 - fusedPressure));
  const cost = Math.max(0, Math.min(1, fusedPressure * (1 - throughput)));
  const budget = Math.max(0, Math.min(1, throughput - cost));

  return {
    organism: {
      pressure: fusedPressure,
      cost,
      budget,
      pressureBucket: bucketPressure(fusedPressure),
      budgetBucket: bucketLevel(budget)
    },
    lenses: {
      worldLens: fusion.worldLens,
      passCount: fusion.counts.pass,
      warnCount: fusion.counts.warn,
      failCount: fusion.counts.fail
    },
    boundaries: {
      pressure: boundaryPressure,
      pressureBucket: bucketPressure(boundaryPressure)
    },
    binary: {
      pressure: binaryPressure,
      pressureBucket: bucketPressure(binaryPressure)
    }
  };
}


// ============================================================================
//  JURY EVALUATION — MAIN ENTRY (single system)
// ============================================================================

export function evaluateJury({
  intent,
  context,
  candidate,
  juryFeed,
  binaryVitals = {},
  boundaryArtery = {},
  safetyAPI,
  trace = false
} = {}) {
  const lenses = createJuryLenses({ safetyAPI });

  const lensResults = lenses.map(lens =>
    lens({ intent, context, candidate, juryFeed })
  );

  let verdict = "pass";
  if (lensResults.some(r => r.status === "fail")) verdict = "fail";
  else if (lensResults.some(r => r.status === "warn")) verdict = "warn";

  const creatorFlags = {
    aiOriginRisk: lensResults.some(
      r => r.name === "AIOriginLens" && r.status !== "pass"
    ),
    juryFlowRisk: lensResults.some(
      r => r.name === "FlowLens" && r.status !== "pass"
    ),
    dominanceRisk: lensResults.some(
      r => r.name === "DominanceLens" && r.status !== "pass"
    ),
    anomalyRisk: lensResults.some(
      r => r.name === "AnomalyLens" && r.status !== "pass"
    ),
    expansionCentralizationRisk: lensResults.some(
      r => r.name === "ExpansionCheckLens" && r.status !== "pass"
    ),
    highStressContext: lensResults.some(
      r => r.name === "MetaLens" && r.status !== "pass"
    )
  };

  const artery = computeWorldLensArtery({
    lensResults,
    binaryVitals,
    boundaryArtery
  });

  const result = Object.freeze({
    meta: JuryFrameMeta,
    verdict,
    lensResults,
    creatorFlags,
    artery
  });

  traceJuryEvent("evaluateJury", result, trace);

  return result;
}


// ============================================================================
//  SYSTEM JURY MEETING — v30+ multi-system world-justice fusion
// ============================================================================
//
//  systemJuryMeeting({
//    systems: {
//      systemName: {
//        intent,
//        context,
//        candidate,
//        juryFeed,
//        binaryVitals,
//        boundaryArtery
//      },
//      ...
//    },
//    safetyAPI,
//    trace
//  })
//
//  Each system gets its own 12-lens verdict; then a meta‑jury fuses them.
//

export function systemJuryMeeting({
  systems = {},
  safetyAPI,
  trace = false
} = {}) {
  const perSystem = {};
  const allLensResults = [];

  for (const [name, cfg] of Object.entries(systems)) {
    const res = evaluateJury({
      ...cfg,
      safetyAPI,
      trace
    });
    perSystem[name] = res;
    allLensResults.push(...res.lensResults);
  }

  const fusedArtery = computeWorldLensArtery({
    lensResults: allLensResults,
    binaryVitals: {},       // meta‑fusion is symbolic-only
    boundaryArtery: {}
  });

  let metaVerdict = "pass";
  if (allLensResults.some(r => r.status === "fail")) metaVerdict = "fail";
  else if (allLensResults.some(r => r.status === "warn")) metaVerdict = "warn";

  const out = Object.freeze({
    meta: JuryFrameMeta,
    metaVerdict,
    metaArtery: fusedArtery,
    systems: perSystem
  });

  traceJuryEvent("systemJuryMeeting", out, trace);

  return out;
}


// ============================================================================
//  PUBLIC API — Create Jury Frame Organ (v30 IMMORTAL‑ADVANTAGE)
// ============================================================================

export function createJuryFrame({ safetyAPI, trace = false } = {}) {
  const lenses = createJuryLenses({ safetyAPI });

  function evaluate({
    context = {},
    intent = {},
    candidate,
    juryFeed,
    binaryVitals = {},
    boundaryArtery = {}
  } = {}) {
    const results = lenses.map(lens =>
      lens({ context, intent, candidate, juryFeed })
    );

    const artery = computeWorldLensArtery({
      lensResults: results,
      binaryVitals,
      boundaryArtery
    });

    let verdict = "pass";
    if (results.some(r => r.status === "fail")) verdict = "fail";
    else if (results.some(r => r.status === "warn")) verdict = "warn";

    const out = Object.freeze({
      meta: JuryFrameMeta,
      verdict,
      lensResults: results,
      artery
    });

    traceJuryEvent("createJuryFrame.evaluate", out, trace);

    return out;
  }

  function getWorldLensArterySnapshot({
    context = {},
    intent = {},
    candidate,
    juryFeed,
    binaryVitals = {},
    boundaryArtery = {}
  } = {}) {
    const results = lenses.map(lens =>
      lens({ context, intent, candidate, juryFeed })
    );
    const artery = computeWorldLensArtery({
      lensResults: results,
      binaryVitals,
      boundaryArtery
    });

    traceJuryEvent("createJuryFrame.getWorldLensArterySnapshot", artery, trace);

    return artery;
  }

  return Object.freeze({
    meta: JuryFrameMeta,
    getLenses() {
      return lenses;
    },
    evaluate,
    getWorldLensArterySnapshot
  });
}


// ---------------------------------------------------------------------------
//  DUAL EXPORT LAYER — CommonJS compatibility (v30 clean)
// ---------------------------------------------------------------------------
/* c8 ignore next 10 */

PulseRealm.AIJuryFrame = {
    JuryFrameMeta,
    createJuryFrame,
    evaluateJury,
    systemJuryMeeting
}
