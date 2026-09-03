// ============================================================================
//  PULSE OS v30‑IMMORTAL+++ — ASSISTANT ORGAN
//  Proactive • Interpretive • Gap‑Filling • Owner‑Aware • Context‑Layered
//  PURE STRUCTURE. ZERO ACTION IN THE WORLD. ZERO TIMING. ZERO MUTATION.
//  DETERMINISTIC • IMMORTAL TICK • PRESSURE‑AWARE • DUALBAND‑READY
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
// IMMORTAL HELPERS — ZERO TIMING, ZERO RANDOMNESS
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
  if (v > 0)   return "low";
  return "none";
}

function bucketComplexity(len) {
  if (len >= 2000) return "extreme";
  if (len >= 800)  return "high";
  if (len >= 300)  return "medium";
  if (len > 0)     return "low";
  return "none";
}

// IMMORTAL monotonic tick (no Date.now, no randomness)
let IMMORTAL_TICK = 0;
function immortalTick() {
  IMMORTAL_TICK += 1;
  return IMMORTAL_TICK;
}

// Safe deterministic clamp
function clamp01(v) {
  if (v <= 0) return 0;
  if (v >= 1) return 1;
  return v;
}

// ============================================================================
// INTERNAL ANALYZERS — v30‑IMMORTAL+++
// ============================================================================

// Intent bands: planning, emotional, technical, meta, transactional
function analyzeIntent(input = "") {
  const text = String(input || "").toLowerCase();

  const isPlanning =
    text.includes("plan") ||
    text.includes("roadmap") ||
    text.includes("schedule") ||
    text.includes("steps") ||
    text.includes("timeline");

  const isEmotional =
    text.includes("i feel") ||
    text.includes("i'm scared") ||
    text.includes("i am scared") ||
    text.includes("i'm worried") ||
    text.includes("i am worried") ||
    text.includes("i'm sad") ||
    text.includes("i am sad") ||
    text.includes("overwhelmed");

  const isTechnical =
    text.includes("architecture") ||
    text.includes("protocol") ||
    text.includes("api") ||
    text.includes("complexity") ||
    text.includes("throughput") ||
    text.includes("latency") ||
    text.includes("bandwidth");

  const isMeta =
    text.includes("how do you work") ||
    text.includes("how do you think") ||
    text.includes("explain yourself") ||
    text.includes("what are you");

  const isTransactional =
    text.includes("email") ||
    text.includes("message") ||
    text.includes("draft") ||
    text.includes("reply") ||
    text.includes("respond");

  return Object.freeze({
    planning: isPlanning,
    emotional: isEmotional,
    technical: isTechnical,
    meta: isMeta,
    transactional: isTransactional
  });
}

// Gap detector v2 — richer structural + ambiguity detection
function detectGaps(input) {
  const text = String(input || "").toLowerCase();
  const length = text.length;

  const needsMath =
    /\d+\s*[\+\-\*\/]\s*\d+/.test(text) ||
    /how much|how many|total|difference|sum|split|divide|ratio|percent/.test(text);

  const needsStructure =
    text.includes("plan") ||
    text.includes("steps") ||
    text.includes("organize") ||
    text.includes("help me figure") ||
    text.includes("roadmap") ||
    length > 160;

  const ambiguous =
    /maybe|sort of|kind of|not sure|idk|i don't know|confused/.test(text) ||
    (!needsMath && !needsStructure && length < 40);

  const missingGoal =
    !/goal|target|deadline|finish|complete|ship|launch/.test(text) &&
    length > 40;

  return Object.freeze({
    needsMath,
    needsStructure,
    ambiguous,
    missingGoal,
    length
  });
}

// Owner‑awareness stub (purely structural, no identity resolution)
function inferOwnerContext(context = {}) {
  const ownerLabel =
    context.ownerLabel ||
    context.ownerName ||
    context.userLabel ||
    "owner";

  const band =
    context.band ||
    context.mode ||
    "dual";

  return Object.freeze({
    ownerLabel,
    band
  });
}

// ============================================================================
// AUTO‑MATH v5 — IMMORTAL, deterministic, pressure‑aware
// ============================================================================
function autoMath(input, binaryVitals = {}) {
  const binaryPressure = extractBinaryPressure(binaryVitals);
  const text = String(input || "");

  try {
    const match = text.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);
    if (!match) return null;

    const a = Number(match[1]);
    const op = match[2];
    const b = Number(match[3]);

    let result = null;
    if (op === "+") result = a + b;
    if (op === "-") result = a - b;
    if (op === "*") result = a * b;
    if (op === "/") result = b !== 0 ? a / b : null;

    const pressureBucket = bucketPressure(binaryPressure);

    let safeResult = result;
    if (binaryPressure >= 0.7 && result != null) {
      const s = String(result);
      safeResult = Number(s.slice(0, 10)); // deterministic truncation
    }

    return Object.freeze({
      expression: `${a} ${op} ${b}`,
      result: safeResult,
      pressure: binaryPressure,
      pressureBucket
    });
  } catch {
    return null;
  }
}

// ============================================================================
// CLARIFIER v2 — deterministic, structured
// ============================================================================
function buildClarification(input, gaps, intent, ownerCtx) {
  const questions = [];

  if (gaps.missingGoal) {
    questions.push("What is the main goal or outcome you care about most");
  }
  if (gaps.needsStructure) {
    questions.push("What constraints or dependencies should the structure respect");
  }
  if (gaps.ambiguous) {
    questions.push("What part of this feels most unclear or fuzzy to you");
  }
  if (intent.planning) {
    questions.push("What is the time horizon (hours, days, weeks, months)");
  }
  if (intent.technical) {
    questions.push("What scale, throughput, or reliability targets matter here");
  }

  if (questions.length === 0) {
    questions.push("What does success look like when this is resolved");
  }

  return Object.freeze({
    type: "clarification",
    owner: ownerCtx.ownerLabel,
    band: ownerCtx.band,
    input,
    questions,
    message:
      "Clarifying questions are structural only — no decisions made, no actions taken."
  });
}

// ============================================================================
// ORGANIZER v2 — deterministic, pressure‑aware
// ============================================================================
function organize(items = [], binaryVitals = {}) {
  const binaryPressure = extractBinaryPressure(binaryVitals);

  const grouped = {
    highPriority: items.filter(i => i.priority === "high"),
    mediumPriority: items.filter(i => i.priority === "medium"),
    lowPriority: items.filter(i => i.priority === "low")
  };

  const pressureBucket = bucketPressure(binaryPressure);

  const safeGrouped =
    binaryPressure >= 0.8
      ? { highPriority: grouped.highPriority }
      : grouped;

  return Object.freeze({
    type: "organization",
    grouped: safeGrouped,
    pressure: binaryPressure,
    pressureBucket,
    message: "Items organized by priority only. No scheduling, no external actions."
  });
}

// ============================================================================
// DRAFT BUILDER v2 — deterministic, pressure + complexity aware
// ============================================================================
function draft(type, content, binaryVitals = {}) {
  const binaryPressure = extractBinaryPressure(binaryVitals);
  const text = String(content || "");
  const complexity = bucketComplexity(text.length);

  let maxLen = 600;
  if (binaryPressure >= 0.7) maxLen = 280;
  if (binaryPressure >= 0.9) maxLen = 160;

  const safeContent = text.slice(0, maxLen);

  return Object.freeze({
    type: "draft",
    draftType: type,
    complexity,
    content: safeContent,
    pressure: binaryPressure,
    pressureBucket: bucketPressure(binaryPressure),
    message:
      "Draft is structural text only. No sending, no side effects, no external calls."
  });
}

// ============================================================================
// PRIORITY MAPPER v2 — deterministic
// ============================================================================
function prioritize(tasks = [], binaryVitals = {}) {
  const binaryPressure = extractBinaryPressure(binaryVitals);

  const ordered = [...tasks].sort((a, b) => {
    const wa = a.weight ?? 0;
    const wb = b.weight ?? 0;
    return wa - wb;
  });

  const limit =
    binaryPressure >= 0.9 ? 2 :
    binaryPressure >= 0.7 ? 3 :
    binaryPressure >= 0.4 ? 5 :
    ordered.length;

  const safeTasks = ordered.slice(0, limit);

  return Object.freeze({
    type: "priority-map",
    tasks: safeTasks,
    pressure: binaryPressure,
    pressureBucket: bucketPressure(binaryPressure),
    message: "Tasks ordered structurally by weight. No commitments, no scheduling."
  });
}

// ============================================================================
// SUMMARY BUILDER v2 — deterministic, pressure‑aware
// ============================================================================
function summarize(text, binaryVitals = {}) {
  const binaryPressure = extractBinaryPressure(binaryVitals);
  const words = String(text || "").split(/\s+/);
  const complexity = bucketComplexity(text.length || 0);

  let slice = 60;
  if (binaryPressure >= 0.7) slice = 30;
  if (binaryPressure >= 0.9) slice = 18;

  const summary = words.slice(0, slice).join(" ") + (words.length > slice ? " ..." : "");

  return Object.freeze({
    type: "summary",
    originalLength: text.length || 0,
    complexity,
    summary,
    pressure: binaryPressure,
    pressureBucket: bucketPressure(binaryPressure),
    message: "High-level structural summary only. No interpretation of intent beyond compression."
  });
}

// ============================================================================
// CONTEXT SNAPSHOT v1 — deterministic, non‑persistent
// ============================================================================
function buildContextSnapshot({ input = "", binaryVitals = {}, context = {} } = {}) {
  const binaryPressure = extractBinaryPressure(binaryVitals);
  const intent = analyzeIntent(input);
  const gaps = detectGaps(input);
  const ownerCtx = inferOwnerContext(context);

  return Object.freeze({
    type: "assistant-context-snapshot",
    tick: immortalTick(),
    owner: ownerCtx.ownerLabel,
    band: ownerCtx.band,
    input: {
      length: input.length,
      complexity: bucketComplexity(input.length)
    },
    intent,
    gaps,
    pressure: binaryPressure,
    pressureBucket: bucketPressure(binaryPressure)
  });
}

// ============================================================================
// INTERPRETIVE ASSIST v2 — IMMORTAL, deterministic
// ============================================================================
function interpret(input, binaryVitals = {}, context = {}) {
  const binaryPressure = extractBinaryPressure(binaryVitals);
  const intent = analyzeIntent(input);
  const gaps = detectGaps(input);
  const ownerCtx = inferOwnerContext(context);
  const math = gaps.needsMath ? autoMath(input, binaryVitals) : null;

  const shouldClarify =
    gaps.ambiguous ||
    gaps.missingGoal ||
    (!gaps.needsMath && !gaps.needsStructure && input.length < 40);

  const clarification = shouldClarify
    ? buildClarification(input, gaps, intent, ownerCtx)
    : null;

  return Object.freeze({
    type: "interpretation",
    tick: immortalTick(),
    owner: ownerCtx.ownerLabel,
    band: ownerCtx.band,
    input,
    intent,
    gaps,
    autoMath: math,
    clarification,
    pressure: binaryPressure,
    pressureBucket: bucketPressure(binaryPressure),
    message:
      "Request interpreted structurally. Gaps filled symbolically only. No external actions, no commitments."
  });
}

// ============================================================================
// ASSISTANT ARTERY v5 — IMMORTAL, deterministic
// ============================================================================
function assistantArtery({ input = "", binaryVitals = {}, context = {} } = {}) {
  const binaryPressure = extractBinaryPressure(binaryVitals);
  const gaps = detectGaps(input);
  const intent = analyzeIntent(input);
  const ownerCtx = inferOwnerContext(context);

  const basePressure =
    (gaps.needsMath ? 0.25 : 0) +
    (gaps.needsStructure ? 0.25 : 0) +
    (gaps.ambiguous ? 0.15 : 0) +
    (gaps.missingGoal ? 0.15 : 0);

  const combined = clamp01(0.6 * basePressure + 0.4 * binaryPressure);

  return Object.freeze({
    type: "assistant-artery",
    tick: immortalTick(),
    owner: ownerCtx.ownerLabel,
    band: ownerCtx.band,
    organism: {
      pressure: combined,
      pressureBucket: bucketPressure(combined)
    },
    input: {
      length: input.length,
      complexity: bucketComplexity(input.length),
      needsMath: gaps.needsMath,
      needsStructure: gaps.needsStructure,
      ambiguous: gaps.ambiguous,
      missingGoal: gaps.missingGoal
    },
    intent
  });
}

// ============================================================================
// PUBLIC ASSISTANT API — v30‑IMMORTAL+++
// ============================================================================
export function createAssistantOrgan(context = {}) {
  function prewarm() {
    return true;
  }

  return Object.freeze({
    prewarm,

    log(message) {
      // Structural logging hook only; no side effects required.
      console.log(`aiAssistant[v30]: ${message}`);
    },

    // Core upgraded surfaces
    clarify(input, binaryVitals = {}) {
      const gaps = detectGaps(input);
      const intent = analyzeIntent(input);
      const ownerCtx = inferOwnerContext(context);
      return buildClarification(input, gaps, intent, ownerCtx);
    },

    organize,
    draft,
    prioritize,
    summarize,

    interpret(input, binaryVitals = {}) {
      return interpret(input, binaryVitals, context);
    },

    assistantArtery(options = {}) {
      return assistantArtery({ ...options, context });
    },

    contextSnapshot(options = {}) {
      return buildContextSnapshot({ ...options, context });
    }
  });
}

PulseRealm.AIAssistant = {
  createAssistantOrgan
}