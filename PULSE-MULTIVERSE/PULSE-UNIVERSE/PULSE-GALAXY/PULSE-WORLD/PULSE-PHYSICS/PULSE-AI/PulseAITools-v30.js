// ============================================================================
//  PULSE OS v30‑IMMORTAL‑OMEGA — THE INSTRUMENTS ORGAN v30
//  Cognitive Analysis Organ • Multiverse Diagnostic Stack • Evolutionary Sensors
//  PURE ANALYSIS • ZERO MUTATION • ZERO IO • ZERO RANDOMNESS • PULSE‑NET ONLY
// ============================================================================
//
//  ROLE (v30‑IMMORTAL‑OMEGA):
//    INSTRUMENTS v30 is the *unified sensorium* for the organism:
//      • Level 1: Raw structure analysis (schema, shape, size, entropy)
//      • Level 2: Drift + compatibility (schema, contracts, lineage)
//      • Level 3: Performance + slowdown (hotspots, payloads, routes)
//      • Level 4: Reliability + anomaly (logs, errors, traces, patterns)
//      • Level 5: Evolutionary dynamics (lineage, forks, advantage fields)
//      • Level 6: Multiverse coherence (cross‑world consistency, tool mesh)
//
//    It remains:
//      • PURE ANALYSIS ONLY
//      • NO mutations, NO writes, NO network, NO randomness
//      • Feeds Cortex / Router / Evolution / Jury / Ego / PowerPrime
//
//  CONTRACT:
//    • ZERO randomness
//    • ZERO mutation
//    • ZERO side effects (beyond logging callbacks)
//    • ZERO identity leakage
//    • PURE deterministic analysis
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
// SECTION 0 — META
// ============================================================================

export const InstrumentsMetaV30 = Object.freeze({
  type: "Cognitive",
  subsystem: "aiInstruments",
  layer: "PulseInstrumentsLayer",
  role: "INSTRUMENTS_ORGAN_V30",
  version: "30-Immortal-Omega",
  identity: "aiInstruments-v30-Immortal-Omega",
  evo: Object.freeze({
    deterministic: true,
    dualband: true,
    multiverseAware: true,
    toolMeshAware: true,
    driftAware: true,
    slowdownAware: true,
    anomalyAware: true,
    lineageAware: true,
    arteryAware: true,
    personaAware: true,
    juryAware: true,
    trustFabricAware: true,
    epoch: "30-Immortal-Omega"
  }),
  contract: Object.freeze({
    never: Object.freeze([
      "mutate external systems",
      "perform IO or network",
      "introduce randomness",
      "override Router/Cortex decisions",
      "override Ego permissions",
      "bypass trust fabric",
      "bypass jury frame"
    ]),
    always: Object.freeze([
      "remain read-only",
      "remain deterministic",
      "respect persona boundaries",
      "respect capability arteries",
      "emit diagnostics only"
    ])
  })
});


// ============================================================================
// SECTION 1 — IMPORTS (TRANSLATORS + SPECS)
// ============================================================================

import {
  translateFirestoreDocument,
  translateFirestoreField
} from "../PULSE-TRANSLATOR/PulseTranslatorRNAIntake-v30.js";

import {
  translatePulseSchemaToFirestore
} from "../PULSE-TRANSLATOR/PulseTranslatorRNAOutput-v30.js";

import {
  translateSQLSchema
} from "../PULSE-TRANSLATOR/PulseTranslatorSkeletalIntake-v30.js";

import { validatePulseField } from "../PULSE-SPECS/PulseSpecsDNAGenome-v30.js";


// ============================================================================
// SECTION 2 — ANALYSIS ARTERY v6 (GLOBAL, PURE, MULTI‑LEVEL)
// ============================================================================

const _INSTRUMENTS_ARTERY_V30 = {
  windowMs: 60000,
  windowStart: PulseRealm.PulseNOW,
  windowAnalyses: 0,
  windowHeavyAnalyses: 0,
  totalAnalyses: 0,
  totalHeavyAnalyses: 0,
  instanceCount: 0,
  levelCounts: {
    L1: 0,
    L2: 0,
    L3: 0,
    L4: 0,
    L5: 0,
    L6: 0
  }
};

function _registerInstrumentsInstanceV30() {
  const index = _INSTRUMENTS_ARTERY_V30.instanceCount;
  _INSTRUMENTS_ARTERY_V30.instanceCount += 1;
  return index;
}

export const AI_INSTRUMENTS_INSTANCE_INDEX_V30 = _registerInstrumentsInstanceV30();

function _rollInstrumentsWindowV30(now) {
  if (now - _INSTRUMENTS_ARTERY_V30.windowStart >= _INSTRUMENTS_ARTERY_V30.windowMs) {
    _INSTRUMENTS_ARTERY_V30.windowStart = now;
    _INSTRUMENTS_ARTERY_V30.windowAnalyses = 0;
    _INSTRUMENTS_ARTERY_V30.windowHeavyAnalyses = 0;
    _INSTRUMENTS_ARTERY_V30.levelCounts = {
      L1: 0,
      L2: 0,
      L3: 0,
      L4: 0,
      L5: 0,
      L6: 0
    };
  }
}

function _bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function _bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function _bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

function _computeInstrumentsArteryV30() {
  const now = PulseRealm.PulseNOW;
  _rollInstrumentsWindowV30(now);

  const elapsedMs = Math.max(1, now - _INSTRUMENTS_ARTERY_V30.windowStart);
  const analysesPerSec =
    (_INSTRUMENTS_ARTERY_V30.windowAnalyses / elapsedMs) * 1000;

  const instanceCount = _INSTRUMENTS_ARTERY_V30.instanceCount || 1;
  const harmonicLoad = analysesPerSec / instanceCount;

  const heavyRate =
    _INSTRUMENTS_ARTERY_V30.windowAnalyses > 0
      ? _INSTRUMENTS_ARTERY_V30.windowHeavyAnalyses /
        _INSTRUMENTS_ARTERY_V30.windowAnalyses
      : 0;

  const pressure = Math.min(1, (harmonicLoad / 128 + heavyRate) / 2);
  const throughput = Math.max(0, 1 - pressure);
  const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
  const budget = Math.max(0, Math.min(1, throughput - cost));

  return Object.freeze({
    meta: InstrumentsMetaV30,
    instanceIndex: AI_INSTRUMENTS_INSTANCE_INDEX_V30,
    instanceCount,
    analysesPerSec,
    harmonicLoad,
    heavyRate,
    pressure,
    throughput,
    cost,
    budget,
    pressureBucket: _bucketPressure(pressure),
    throughputBucket: _bucketLevel(throughput),
    costBucket: _bucketCost(cost),
    budgetBucket: _bucketLevel(budget),
    levels: { ..._INSTRUMENTS_ARTERY_V30.levelCounts }
  });
}

export function getInstrumentsArterySnapshotV30() {
  return _computeInstrumentsArteryV30();
}

function _markAnalysisV30({ heavy = false, level = "L1" } = {}) {
  const now = PulseRealm.PulseNOW;
  _rollInstrumentsWindowV30(now);
  _INSTRUMENTS_ARTERY_V30.windowAnalyses += 1;
  _INSTRUMENTS_ARTERY_V30.totalAnalyses += 1;
  if (heavy) {
    _INSTRUMENTS_ARTERY_V30.windowHeavyAnalyses += 1;
    _INSTRUMENTS_ARTERY_V30.totalHeavyAnalyses += 1;
  }
  if (_INSTRUMENTS_ARTERY_V30.levelCounts[level] != null) {
    _INSTRUMENTS_ARTERY_V30.levelCounts[level] += 1;
  }

  const artery = _computeInstrumentsArteryV30();
  if (
    artery.pressureBucket === "overload" ||
    artery.budgetBucket === "critical"
  ) {
    // Soft spiral warning — non‑blocking, logging only
    // (keeps harmony, never blocks organism)
    console.log("[aiInstruments-v30] spiral-warning", artery);
  }
}


// ============================================================================
// SECTION 3 — CORE HELPERS (STRUCTURE, ENTROPY, SIZE)
// ============================================================================

function _safeNumber(v, fallback = 0) {
  return typeof v === "number" && !Number.isNaN(v) ? v : fallback;
}

function _estimateEntropy(str) {
  if (!str || typeof str !== "string") return 0;
  const freq = Object.create(null);
  for (const ch of str) freq[ch] = (freq[ch] || 0) + 1;
  const len = str.length || 1;
  let h = 0;
  for (const k of Object.keys(freq)) {
    const p = freq[k] / len;
    h -= p * Math.log2(p);
  }
  return h / 8; // normalized-ish
}

function _describeShape(value) {
  if (value === null || value === undefined) return "nullish";
  if (Array.isArray(value)) return "array";
  if (typeof value === "object") return "object";
  return typeof value;
}

function _sizeHint(value) {
  try {
    const s = JSON.stringify(value);
    return s ? s.length : 0;
  } catch {
    return 0;
  }
}


// ============================================================================
// SECTION 4 — FIRESTORE ANALYSIS v30 (L1–L3)
// ============================================================================

export function analyzeFirestoreDocV30(context, docData = {}) {
  _markAnalysisV30({ heavy: true, level: "L1" });
  console.log("v30: Analyzing Firestore document (L1–L3)...");

  const pulseSchema = translateFirestoreDocument(docData);
  console.log("v30: Translated Firestore → PulseFields.");

  const structural = [];
  for (const [key, field] of Object.entries(pulseSchema)) {
    const original = docData[key];
    const shape = _describeShape(original);
    const size = _sizeHint(original);
    const entropy = _estimateEntropy(
      typeof original === "string" ? original : JSON.stringify(original || "")
    );

    structural.push({ key, shape, size, entropy });

    try {
      validatePulseField(field);
    } catch {
      context.flagMismatch(key, "valid PulseField", "invalid PulseField");
    }

    if (original === null || original === undefined) {
      context.flagMissingField(key);
    }
  }

  // L3 slowdown hints
  detectSlowdownPatternsV30(context, docData);

  return Object.freeze({
    pulseSchema,
    structural
  });
}


// ============================================================================
// SECTION 5 — SQL ANALYSIS v30 (L1–L3)
// ============================================================================

export function analyzeSQLSchemaV30(context, sqlSchema = {}) {
  _markAnalysisV30({ heavy: true, level: "L1" });
  console.log("v30: Analyzing SQL schema (L1–L3)...");

  const pulseSchema = translateSQLSchema(sqlSchema);
  console.log("v30: Translated SQL → PulseFields.");

  const structural = [];
  for (const [key, field] of Object.entries(pulseSchema)) {
    const col = sqlSchema[key] || {};
    const shape = _describeShape(col);
    const size = _sizeHint(col);
    const entropy = _estimateEntropy(JSON.stringify(col || ""));

    structural.push({ key, shape, size, entropy });

    try {
      validatePulseField(field);
    } catch {
      context.flagMismatch(key, "valid PulseField", "invalid PulseField");
    }
  }

  detectSlowdownPatternsV30(context, sqlSchema);

  return Object.freeze({
    pulseSchema,
    structural
  });
}


// ============================================================================
// SECTION 6 — DRIFT DETECTION v30 (L2)
// ============================================================================

export function detectDriftV30(context, pulseSchema = {}, firestoreSchema = {}) {
  _markAnalysisV30({ level: "L2" });
  console.log("v30: Checking for schema drift (L2)...");

  const driftEvents = [];

  for (const key of Object.keys(pulseSchema)) {
    if (!firestoreSchema[key]) {
      const msg = `Field "${key}" missing in Firestore.`;
      context.flagDrift(msg);
      driftEvents.push({ key, type: "missing", message: msg });
      continue;
    }

    const expected = pulseSchema[key].type;
    const actual = firestoreSchema[key].type;

    if (expected !== actual) {
      const msg = `Field "${key}" type mismatch: expected ${expected}, got ${actual}`;
      context.flagDrift(msg);
      driftEvents.push({ key, type: "type-mismatch", message: msg });
    }
  }

  return Object.freeze({
    driftDetected: !!driftEvents.length,
    driftEvents
  });
}


// ============================================================================
// SECTION 7 — SLOWDOWN DETECTION v30 (L3)
// ============================================================================

export function detectSlowdownPatternsV30(context, data) {
  _markAnalysisV30({ level: "L3" });
  console.log("v30: Checking for slowdown patterns (L3)...");

  const hints = [];

  if (!data) {
    const msg = "Null or undefined data object.";
    context.flagSlowdown(msg);
    hints.push(msg);
  } else {
    if (Array.isArray(data) && data.length > 200) {
      const msg = "Large array detected.";
      context.flagSlowdown(msg);
      hints.push(msg);
    }

    if (typeof data === "object" && !Array.isArray(data)) {
      const keys = Object.keys(data);
      if (keys.length > 100) {
        const msg = "Large object with many keys.";
        context.flagSlowdown(msg);
        hints.push(msg);
      }
    }

    const size = _sizeHint(data);
    if (size > 50000) {
      const msg = "Very large JSON payload.";
      context.flagSlowdown(msg);
      hints.push(msg);
    }
  }

  return Object.freeze({
    slowdownHints: hints,
    size: _sizeHint(data)
  });
}


// ============================================================================
// SECTION 8 — PULSE SCHEMA VALIDATION v30 (L1)
// ============================================================================

export function validatePulseSchemaV30(context, schema = {}) {
  _markAnalysisV30({ level: "L1" });
  console.log("v30: Validating Pulse schema (L1)...");

  const mismatches = [];

  for (const [key, field] of Object.entries(schema)) {
    try {
      validatePulseField(field);
    } catch {
      const msg = `Field "${key}" invalid PulseField.`;
      context.flagMismatch(key, "valid PulseField", "invalid PulseField");
      mismatches.push({ key, message: msg });
    }
  }

  return Object.freeze({
    mismatches
  });
}


// ============================================================================
// SECTION 9 — ROUTE ANALYSIS v30 (L3–L4)
// ============================================================================

export function analyzeRouteV30(context, pathway = {}) {
  _markAnalysisV30({ level: "L3" });
  console.log("v30: Analyzing pathway descriptor (L3–L4)...");

  const diagnostics = [];

  if (!pathway || typeof pathway !== "object") {
    const msg = 'Pathway must be a valid object.';
    context.flagMismatch("pathway", "valid object", "invalid object");
    diagnostics.push(msg);
    return Object.freeze({ pathway: null, diagnostics });
  }

  if (!Array.isArray(pathway.hops)) {
    const msg = 'Pathway.hops must be an array.';
    context.flagMismatch("hops", "array", typeof pathway.hops);
    diagnostics.push(msg);
  }

  if (typeof pathway.reliability === "number" && pathway.reliability < 0.9) {
    const msg = "Low reliability pathway detected.";
    context.flagSlowdown(msg);
    diagnostics.push(msg);
  }

  if (Array.isArray(pathway.hops)) {
    const hopCount = pathway.hops.length;
    if (hopCount > 10) {
      const msg = "Deep routing chain detected.";
      context.flagSlowdown(msg);
      diagnostics.push(msg);
    }
  }

  return Object.freeze({
    pathway,
    diagnostics
  });
}


// ============================================================================
// SECTION 10 — LOG ANALYSIS v30 (L4)
// ============================================================================

export function analyzeLogsV30(context, logs = []) {
  _markAnalysisV30({ level: "L4" });
  console.log("v30: Analyzing logs (L4)...");

  const anomalies = [];

  if (!Array.isArray(logs)) {
    const msg = "Logs must be an array.";
    context.flagMismatch("logs", "array", typeof logs);
    anomalies.push(msg);
    return Object.freeze({ logs: [], anomalies });
  }

  if (logs.length > 500) {
    const msg = "Large log set detected.";
    context.flagSlowdown(msg);
    anomalies.push(msg);
  }

  const critical = logs.filter(l => l.severity === "critical");
  if (critical.length > 0) {
    const msg = "Critical log entries detected.";
    context.flagDrift(msg);
    anomalies.push(msg);
  }

  return Object.freeze({
    logs,
    anomalies,
    criticalCount: critical.length
  });
}


// ============================================================================
// SECTION 11 — ERROR ANALYSIS v30 (L4)
// ============================================================================

export function analyzeErrorsV30(context, errors = []) {
  _markAnalysisV30({ level: "L4" });
  console.log("v30: Analyzing errors (L4)...");

  const anomalies = [];

  if (!Array.isArray(errors)) {
    const msg = "Errors must be an array.";
    context.flagMismatch("errors", "array", typeof errors);
    anomalies.push(msg);
    return Object.freeze({ errors: [], anomalies, criticalCount: 0 });
  }

  const critical = errors.filter(e => e.severity === "critical");
  if (critical.length > 0) {
    const msg = "Critical errors detected in system logs.";
    context.flagDrift(msg);
    anomalies.push(msg);
  }

  return Object.freeze({
    errors,
    anomalies,
    criticalCount: critical.length
  });
}


// ============================================================================
// SECTION 12 — EVOLUTIONARY PATTERN DETECTION v30 (L5–L6)
// ============================================================================

export function detectEvolutionaryPatternsV30(context, pulse = {}) {
  _markAnalysisV30({ level: "L5" });
  console.log("v30: Detecting evolutionary patterns (L5–L6)...");

  const notes = [];

  if (pulse.lineage && Array.isArray(pulse.lineage)) {
    const depth = pulse.lineage.length;
    if (depth > 20) {
      const msg = "Deep lineage chain detected.";
      context.flagSlowdown(msg);
      notes.push(msg);
    }
  }

  if (pulse.advantageField) {
    const msg = "Advantage field active.";
    console.log(msg);
    notes.push(msg);
  }

  if (pulse.forks && Array.isArray(pulse.forks) && pulse.forks.length > 0) {
    notes.push(`Forks detected: ${pulse.forks.length} branch(es).`);
  }

  if (pulse.coherenceScore != null) {
    notes.push(`Multiverse coherence score: ${pulse.coherenceScore}.`);
  }

  return Object.freeze({
    pulse,
    notes
  });
}


// ============================================================================
// SECTION 13 — TOOL MESH / MULTIVERSE ANALYZER v30 (L6)
// ============================================================================

/**
 * analyzeToolMeshV30
 *   tools: array of { id, type, version, latencyMs, errorRate, calls, worldId }
 */
export function analyzeToolMeshV30(context, tools = []) {
  _markAnalysisV30({ level: "L6" });
  console.log("v30: Analyzing tool mesh / multiverse (L6)...");

  if (!Array.isArray(tools)) {
    context.flagMismatch("tools", "array", typeof tools);
    return Object.freeze({
      tools: [],
      worlds: {},
      hotspots: [],
      anomalies: []
    });
  }

  const worlds = {};
  const hotspots = [];
  const anomalies = [];

  for (const t of tools) {
    const worldId = t.worldId || "default";
    if (!worlds[worldId]) {
      worlds[worldId] = {
        tools: 0,
        totalLatency: 0,
        totalCalls: 0,
        totalErrors: 0
      };
    }
    const w = worlds[worldId];
    w.tools += 1;
    w.totalLatency += _safeNumber(t.latencyMs, 0);
    w.totalCalls += _safeNumber(t.calls, 0);
    w.totalErrors += Math.round(_safeNumber(t.errorRate, 0) * _safeNumber(t.calls, 0));

    if (t.latencyMs >= 1500 || t.errorRate >= 0.2) {
      hotspots.push({
        id: t.id,
        worldId,
        latencyMs: t.latencyMs,
        errorRate: t.errorRate
      });
    }
  }

  for (const [worldId, w] of Object.entries(worlds)) {
    const avgLatency =
      w.tools > 0 ? w.totalLatency / w.tools : 0;
    const errorRate =
      w.totalCalls > 0 ? w.totalErrors / w.totalCalls : 0;

    if (avgLatency >= 1500 || errorRate >= 0.2) {
      anomalies.push({
        worldId,
        avgLatency,
        errorRate
      });
    }
  }

  return Object.freeze({
    tools,
    worlds,
    hotspots,
    anomalies
  });
}


// ============================================================================
// SECTION 14 — PUBLIC FACTORY (v30)
// ============================================================================

export function createInstrumentsV30() {
  return Object.freeze({
    meta: InstrumentsMetaV30,
    artery: getInstrumentsArterySnapshotV30,

    analyzeFirestoreDoc: analyzeFirestoreDocV30,
    analyzeSQLSchema: analyzeSQLSchemaV30,
    detectDrift: detectDriftV30,
    detectSlowdownPatterns: detectSlowdownPatternsV30,
    validatePulseSchema: validatePulseSchemaV30,
    analyzeRoute: analyzeRouteV30,
    analyzeLogs: analyzeLogsV30,
    analyzeErrors: analyzeErrorsV30,
    detectEvolutionaryPatterns: detectEvolutionaryPatternsV30,
    analyzeToolMesh: analyzeToolMeshV30
  });
}

export const analyzeFirestoreDoc = analyzeFirestoreDocV30;
export const analyzeSQLSchema = analyzeSQLSchemaV30;
export const detectDrift = detectDriftV30;
export const detectSlowdownPatterns = detectSlowdownPatternsV30;
export const validatePulseSchema = validatePulseSchemaV30;


// ============================================================================
// SECTION 15 — DUAL EXPORT LAYER (CommonJS)
// ============================================================================

PulseRealm.AITools = {
    InstrumentsMetaV30,
    AI_INSTRUMENTS_INSTANCE_INDEX_V30,
    getInstrumentsArterySnapshotV30,
    analyzeFirestoreDocV30,
    analyzeSQLSchemaV30,
    detectDriftV30,
    detectSlowdownPatternsV30,
    validatePulseSchemaV30,
    analyzeRouteV30,
    analyzeLogsV30,
    analyzeErrorsV30,
    detectEvolutionaryPatternsV30,
    analyzeToolMeshV30,
    createInstrumentsV30
}