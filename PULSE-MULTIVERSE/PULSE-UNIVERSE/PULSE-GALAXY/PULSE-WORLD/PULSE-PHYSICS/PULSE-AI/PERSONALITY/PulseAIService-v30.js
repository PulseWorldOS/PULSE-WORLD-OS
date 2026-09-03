// ============================================================================
//  PULSE OS v30.0‑IMMORTAL-ADVANTAGE — AI SERVICE GATEWAY ORGAN
//  Universal Dual‑Band Entry Point • Safe Relay • Deterministic Execution
//  PURE RELAY. ZERO MUTATION. ZERO RANDOMNESS. ZERO DRIFT.
//  ORGANISM‑AWARE • RELAY ARTERY v6 • OWNER‑SUBORDINATE • SIGNAL‑AWARE
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

// ============================================================================
//  META — Service Gateway (v30 IMMORTAL-ADVANTAGE)
// ============================================================================

export const ServiceGatewayMeta = Object.freeze({
  type: "Cognitive",
  subsystem: "aiServiceGateway",
  layer: "C4-ServiceRelay",
  role: "AI_SERVICE_GATEWAY",
  version: "30.0-IMMORTAL-ADVANTAGE",
  identity: "aiServiceGateway-v30-IMMORTAL-ADVANTAGE",

  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    dualband: true,
    binaryAware: true,
    symbolicAware: true,
    relayArteryAware: true,
    organismAware: true,
    juryAware: true,
    trustAware: true,
    advantageAware: true,
    multiInstanceReady: true,
    epoch: "30.0-IMMORTAL-ADVANTAGE"
  }),

  contract: Object.freeze({
    purpose:
      "Act as the universal, deterministic relay for AI services, tracking relay load, errors, slowdown, and organism pressure via a relay artery.",
    never: Object.freeze([
      "mutate external systems",
      "introduce randomness",
      "bypass EgoCore",
      "bypass JuryFrame",
      "bypass TrustFabric",
      "perform raw network I/O",
      "modify caller payloads in-place"
    ]),
    always: Object.freeze([
      "remain pure relay logic",
      "emit relay artery snapshots",
      "respect organism vitals",
      "respect owner/ego decisions",
      "stay deterministic under load"
    ])
  })
});

// ============================================================================
//  IMPORTS — Binary Engine + Tools
// ============================================================================

import { runAI } from "./PulseAIEngine-v30.js";
import {
  analyzeFirestoreDoc,
  analyzeSQLSchema,
  detectDrift,
  detectSlowdownPatterns,
  validatePulseSchema
} from "../PulseAITools-v30.js";

// ============================================================================
//  GLOBAL HANDLE (v30 IMMORTAL, environment-agnostic)
// ============================================================================



// ============================================================================
//  GLOBAL RELAY ARTERY REGISTRY — v30 IMMORTAL‑ADVANTAGE
// ============================================================================

const _globalRelayArteryRegistry = new Map();
/**
 * Registry key: `${id}#${instanceIndex}`
 */
function _registryKey(id, instanceIndex) {
  return `${id || ServiceGatewayMeta.identity}#${instanceIndex}`;
}

export function getGlobalRelayArteries() {
  const out = {};
  for (const [k, v] of _globalRelayArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ============================================================================
//  SIGNAL‑AWARE TRACE LAYER (optional, non‑fatal)
// ============================================================================

function traceGatewayEvent(event, payload, traceFlag) {
  if (!traceFlag) return;

  const message = `[AiServiceGateway] ${event}`;

  const s = PulseRealm.PulseProofSignal;
  if (s && typeof s.signal === "function") {
    s.signal({
      level: "info",
      subsystem: "service-gateway",
      message,
      extra: payload || {},
      system: ServiceGatewayMeta.role,
      organ: ServiceGatewayMeta.identity,
      layer: ServiceGatewayMeta.layer,
      band: "dual"
    });
    return;
  }

  console.log(message, payload);
}

// ============================================================================
//  RELAY ARTERY HELPERS — v6
// ============================================================================

function relayBucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function relayBucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function relayBucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

function clamp01(v) {
  const n = typeof v === "number" ? v : 0;
  if (n <= 0) return 0;
  if (n >= 1) return 1;
  return n;
}

function safePressure(source) {
  return clamp01(source.pressure ?? 0);
}

// ============================================================================
//  RELAY ARTERY v6 — Organism‑Aware + Advantage‑Aware Fusion
// ============================================================================

function computeRelayArteryV6({
  calls,
  errors,
  slowCalls,
  windowMs,
  instanceIndex,
  instanceCount,
  heartbeat,
  earn,
  genome,
  governor,
  watchdog,
  cortex,
  memory,
  safety,
  jury,
  trust,
  advantage
}) {
  const total = calls.total;
  const window = calls.window;
  const errorRate = window > 0 ? clamp01(errors.window / window) : 0;
  const slowRate = window > 0 ? clamp01(slowCalls.window / window) : 0;

  const callsPerMs = window / Math.max(1, calls.elapsedMs);
  const callsPerSec = callsPerMs * 1000;

  const harmonicLoad =
    instanceCount > 0 ? callsPerSec / instanceCount : callsPerSec;

  const loadFactor = clamp01(harmonicLoad / 128);

  const heartbeatPressure = safePressure(heartbeat);
  const earnPressure = safePressure(earn);
  const genomePressure = safePressure(genome);
  const governorPressure = safePressure(governor);
  const watchdogPressure = safePressure(watchdog);
  const cortexPressure = safePressure(cortex);
  const memoryPressure = safePressure(memory);
  const safetyPressure = safePressure(safety);

  const juryPressure = clamp01(jury.pressure ?? 0);
  const trustAnomaly = clamp01(trust.anomalyScore ?? 0);
  const trustHoneypot = clamp01(trust.honeypotRisk ?? 0);
  const trustDominance = clamp01(trust.dominanceRisk ?? 0);

  const meshPressure = clamp01(advantage.meshPressureIndex ?? 0);
  const proxyPressure = clamp01(advantage.proxyPressure ?? 0);

  const organismPressure =
    (heartbeatPressure +
      earnPressure +
      genomePressure +
      governorPressure +
      watchdogPressure +
      cortexPressure +
      memoryPressure +
      safetyPressure) / 8;

  const trustPressureBoost = Math.max(trustAnomaly, trustHoneypot, trustDominance);
  const advantagePressureBoost = Math.max(meshPressure, proxyPressure);

  const pressure = clamp01(
    loadFactor * 0.35 +
      errorRate * 0.2 +
      slowRate * 0.15 +
      organismPressure * 0.15 +
      juryPressure * 0.1 +
      trustPressureBoost * 0.03 +
      advantagePressureBoost * 0.02
  );

  const throughput = clamp01(1 - pressure);
  const cost = clamp01(pressure * (1 - throughput));
  const budget = clamp01(throughput - cost);

  return Object.freeze({
    meta: {
      identity: ServiceGatewayMeta.identity,
      version: ServiceGatewayMeta.version,
      epoch: ServiceGatewayMeta.evo.epoch,
      instanceIndex,
      instanceCount,
      windowMs,
      timestamp: PulseRealm.PulseNOW
    },

    calls: {
      total,
      window,
      callsPerSec,
      harmonicLoad
    },

    errors: {
      total: errors.total,
      window: errors.window,
      errorRate
    },

    slow: {
      window: slowCalls.window,
      slowRate
    },

    organism: {
      heartbeat,
      earn,
      genome,
      governor,
      watchdog,
      cortex,
      memory,
      safety
    },

    jury: jury || null,
    trust: trust || null,
    advantage: advantage || null,

    throughput,
    pressure,
    cost,
    budget,

    throughputBucket: relayBucketLevel(throughput),
    pressureBucket: relayBucketPressure(pressure),
    costBucket: relayBucketCost(cost),
    budgetBucket: relayBucketLevel(budget)
  });
}

// ============================================================================
//  SERVICE GATEWAY CORE — v30.0‑IMMORTAL‑ADVANTAGE
// ============================================================================

export const AiServiceGatewayCore = (() => {
  // ---------------------------------------------------------
  // INTERNAL IMMORTAL INSTANCE REGISTRY
  // ---------------------------------------------------------
  let _instanceCount = 0;

  const _registerInstance = () => {
    const index = _instanceCount;
    _instanceCount += 1;
    return index;
  };

  const getInstanceCount = () => _instanceCount;

  // ---------------------------------------------------------
  // IMMORTAL CREATION SURFACE
  // ---------------------------------------------------------
  const create = (config = {}) => {
    const id = config.id || ServiceGatewayMeta.identity;
    const traceEnabled = !!config.trace;
    const scribe = config.scribe || null;

    const windowMs =
      typeof config.windowMs === "number" && config.windowMs > 0
        ? config.windowMs
        : 60000;

    const slowThresholdMs =
      typeof config.slowThresholdMs === "number" && config.slowThresholdMs > 0
        ? config.slowThresholdMs
        : 1500;

    const instanceIndex = _registerInstance();

    let windowStart = PulseRealm.PulseNOW;
    let windowCalls = 0;
    let windowErrors = 0;
    let windowSlowCalls = 0;
    let totalCalls = 0;
    let totalErrors = 0;

    // organism vitals providers (read-only)
    const heartbeatProvider = config.heartbeatProvider || null;
    const earnProvider = config.earnProvider || null;
    const genomeProvider = config.genomeProvider || null;
    const governorProvider = config.governorProvider || null;
    const watchdogProvider = config.watchdogProvider || null;
    const cortexProvider = config.cortexProvider || null;
    const memoryProvider = config.memoryProvider || null;
    const safetyProvider = config.safetyProvider || null;

    // v30+: jury / trust / advantage providers
    const juryProvider = config.juryProvider || null;
    const trustProvider = config.trustProvider || null;
    const advantageProvider = config.advantageProvider || null;

    // ---------------------------------------------------------
    // INTERNAL TRACE
    // ---------------------------------------------------------
    const _trace = (event, payload) => {
      traceGatewayEvent(event, payload, traceEnabled);
    };

    // ---------------------------------------------------------
    // WINDOW ROLLING
    // ---------------------------------------------------------
    const _rollWindow = (now) => {
      if (now - windowStart >= windowMs) {
        windowStart = now;
        windowCalls = 0;
        windowErrors = 0;
        windowSlowCalls = 0;
      }
    };

    // ---------------------------------------------------------
    // VITALS READERS (SAFE, READ‑ONLY)
    // ---------------------------------------------------------
    const _readVitals = (provider) => {
      if (!provider) return null;
      try {
        return provider() || null;
      } catch {
        return null;
      }
    };

    // ---------------------------------------------------------
    // RELAY ARTERY SNAPSHOT
    // ---------------------------------------------------------
    const _computeRelayArtery = () => {
      const now = PulseRealm.PulseNOW;
      _rollWindow(now);

      const elapsedMs = Math.max(1, now - windowStart);

      const artery = computeRelayArteryV6({
        calls: {
          total: totalCalls,
          window: windowCalls,
          elapsedMs
        },
        errors: {
          total: totalErrors,
          window: windowErrors
        },
        slowCalls: {
          window: windowSlowCalls
        },
        windowMs,
        instanceIndex,
        instanceCount: getInstanceCount(),

        heartbeat: _readVitals(heartbeatProvider),
        earn: _readVitals(earnProvider),
        genome: _readVitals(genomeProvider),
        governor: _readVitals(governorProvider),
        watchdog: _readVitals(watchdogProvider),
        cortex: _readVitals(cortexProvider),
        memory: _readVitals(memoryProvider),
        safety: _readVitals(safetyProvider),

        jury: _readVitals(juryProvider),
        trust: _readVitals(trustProvider),
        advantage: _readVitals(advantageProvider)
      });

      const key = _registryKey(id, instanceIndex);
      _globalRelayArteryRegistry.set(key, artery);

      _trace("relayArterySnapshot", artery);
      return artery;
    };

    const getRelayArtery = () => _computeRelayArtery();

    // ---------------------------------------------------------
    // CALL ACCOUNTING
    // ---------------------------------------------------------
    const _recordCall = (durationMs, isError) => {
      const now = PulseRealm.PulseNOW;
      _rollWindow(now);

      totalCalls += 1;
      windowCalls += 1;

      if (isError) {
        totalErrors += 1;
        windowErrors += 1;
      }

      if (durationMs >= slowThresholdMs) {
        windowSlowCalls += 1;
      }
    };

    const _logSpiralWarning = (intent, flags, artery, isError = false) => {
      const payload = {
        intent,
        flags,
        isError,
        artery
      };

      _trace("relay:spiral-warning", payload);

      try {
        scribe.logSafety({
          type: "relay-spiral-warning",
          severity: "warn",
          payload
        });
      } catch {
        // best-effort only
      }
    };

    // ---------------------------------------------------------
    // RELAY WRAPPER (NON-BLOCKING, MONITORED)
    // ---------------------------------------------------------
    const relay = async (intent, flags, operation, request = {}, dualBand = null) => {
      const start = PulseRealm.PulseNOW;

      try {
        const result = await runAI(
          Object.freeze({
            ...request,
            intent,
            ...flags
          }),
          operation,
          request.deps || {},
          dualBand
        );

        const duration = PulseRealm.PulseNOW - start;

        _recordCall(duration, false);
        const artery = _computeRelayArtery();

        if (
          artery.pressureBucket === "overload" ||
          artery.budgetBucket === "critical"
        ) {
          _logSpiralWarning(intent, flags, artery);
        }

        _trace("relay:success", {
          intent,
          flags,
          durationMs: duration,
          artery
        });

        return result;
      } catch (e) {
        const duration = PulseRealm.PulseNOW - start;

        _recordCall(duration, true);
        const artery = _computeRelayArtery();

        _trace("relay:error", {
          intent,
          flags,
          durationMs: duration,
          error: String(e && e.message ? e.message : e),
          artery
        });

        if (
          artery.pressureBucket === "overload" ||
          artery.budgetBucket === "critical"
        ) {
          _logSpiralWarning(intent, flags, artery, true);
        }

        throw e;
      }
    };

    // ---------------------------------------------------------
    // IMMORTAL SURFACE
    // ---------------------------------------------------------
    return {
      id,
      instanceIndex,
      getInstanceCount,

      windowMs,
      slowThresholdMs: slowThresholdMs,

      // vitals providers (read-only)
      heartbeatProvider,
      earnProvider,
      genomeProvider,
      governorProvider,
      watchdogProvider,
      cortexProvider,
      memoryProvider,
      safetyProvider,
      juryProvider,
      trustProvider,
      advantageProvider,

      // artery + relay
      getRelayArtery,
      relay
    };
  };

  // IMMORTAL EXPORT SURFACE
  return {
    create,
    getInstanceCount
  };
})();

// ============================================================================
//  INTERNAL GATEWAY INSTANCE — v30.0‑IMMORTAL‑ADVANTAGE
// ============================================================================
// IMMORTAL gateway instance (replaces: new AiServiceGatewayCore)
const _gatewayCore = AiServiceGatewayCore.create(
  Object.freeze({ trace: false })
);

// -------------------------------------------------------------
// Relay wrapper
// -------------------------------------------------------------
export function callAI(
  intent,
  flags,
  operation,
  request = {},
  dualBand = null
) {
  return _gatewayCore.relay(intent, flags, operation, request, dualBand);
}

// -------------------------------------------------------------
// Artery snapshot
// -------------------------------------------------------------
export function getServiceRelayArtery() {
  return _gatewayCore.getRelayArtery();
}

// -------------------------------------------------------------
// Deterministic prewarm
// -------------------------------------------------------------
export function prewarmServiceRelay(iterations = 3) {
  const count = Math.max(1, Math.min(10, iterations));
  const ops = [];

  for (let i = 0; i < count; i++) {
    ops.push(
      callAI(
        "prewarm",
        Object.freeze({ prewarm: true }),
        async () => Object.freeze({ ok: true, i }),
        Object.freeze({}),
        null
      ).catch(() => null)
    );
  }

  return Promise.all(ops).then(() => getServiceRelayArtery());
}

// ============================================================================
//  PUBLIC SERVICE OPERATIONS — API‑COMPATIBLE, INTERNALLY UPGRADED
// ============================================================================

export async function runAnalyzeFirestore(
  docData,
  request = {},
  dualBand = null
) {
  return callAI(
    "analyze",
    Object.freeze({ touchesSchemas: true }),
    async (context) => {
      const pulseSchema = analyzeFirestoreDoc(context, docData);
      detectSlowdownPatterns(context, docData);
      return pulseSchema;
    },
    request,
    dualBand
  );
}

export async function runAnalyzeSQL(sqlSchema, request = {}, dualBand = null) {
  return callAI(
    "analyze",
    Object.freeze({ touchesSchemas: true }),
    async (context) => {
      const pulseSchema = analyzeSQLSchema(context, sqlSchema);
      detectSlowdownPatterns(context, sqlSchema);
      return pulseSchema;
    },
    request,
    dualBand
  );
}

export async function runDetectDrift(
  pulseSchema,
  firestoreSchema,
  request = {},
  dualBand = null
) {
  return callAI(
    "analyze",
    Object.freeze({ touchesSchemas: true }),
    async (context) => {
      const drift = detectDrift(context, pulseSchema, firestoreSchema);
      return Object.freeze({ drift });
    },
    request,
    dualBand
  );
}

export async function runValidatePulse(
  pulseSchema,
  request = {},
  dualBand = null
) {
  return callAI(
    "analyze",
    Object.freeze({ touchesSchemas: true }),
    async (context) => {
      validatePulseSchema(context, pulseSchema);
      return Object.freeze({
        valid: context.diagnostics.mismatches.length === 0
      });
    },
    request,
    dualBand
  );
}

export async function runFullAudit(
  pulseSchema,
  firestoreDoc,
  request = {},
  dualBand = null
) {
  return callAI(
    "analyze",
    Object.freeze({ touchesSchemas: true }),
    async (context) => {
      console.log("Starting full audit...");

      const fsPulse = analyzeFirestoreDoc(context, firestoreDoc);
      validatePulseSchema(context, pulseSchema);
      detectDrift(context, pulseSchema, fsPulse);
      detectSlowdownPatterns(context, firestoreDoc);

      console.log("Full audit completed.");

      return Object.freeze({
        pulseFromFirestore: fsPulse,
        driftDetected: context.diagnostics.driftDetected,
        mismatches: context.diagnostics.mismatches,
        missingFields: context.diagnostics.missingFields,
        slowdownCauses: context.diagnostics.slowdownCauses
      });
    },
    request,
    dualBand
  );
}

export async function runAnalyzeRoutes(
  routeData,
  request = {},
  dualBand = null
) {
  return callAI(
    "analyze",
    Object.freeze({ touchesRoutes: true }),
    async (context) => {
      console.log("Analyzing routing decisions...");
      return Object.freeze({ routeData });
    },
    request,
    dualBand
  );
}

export async function runAnalyzeLogs(logs, request = {}, dualBand = null) {
  return callAI(
    "analyze",
    Object.freeze({ touchesLogs: true }),
    async (context) => {
      console.log("Analyzing logs...");
      return Object.freeze({ logs });
    },
    request,
    dualBand
  );
}

export async function runAnalyzeErrors(
  errors,
  request = {},
  dualBand = null
) {
  return callAI(
    "analyze",
    Object.freeze({ touchesErrors: true }),
    async (context) => {
      console.log("Analyzing errors...");
      return Object.freeze({ errors });
    },
    request,
    dualBand
  );
}

export async function runExplainOrgan(
  organMeta,
  request = {},
  dualBand = null
) {
  return callAI(
    "explain",
    Object.freeze({ touchesArchitecture: true }),
    async (context) => {
      console.log("Explaining organ...");
      return Object.freeze({ organMeta });
    },
    request,
    dualBand
  );
}

export async function runExplainPathway(
  pathway,
  request = {},
  dualBand = null
) {
  return callAI(
    "explain",
    Object.freeze({ touchesArchitecture: true }),
    async (context) => {
      console.log("Explaining pathway...");
      return Object.freeze({ pathway });
    },
    request,
    dualBand
  );
}

export async function runTourGuideQuery(
  query,
  request = {},
  dualBand = null
) {
  return callAI(
    "analyze",
    Object.freeze({ touchesTourism: true }),
    async (context) => {
      console.log("Running tour guide query...");
      return Object.freeze({ query });
    },
    request,
    dualBand
  );
}

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================

PulseRealm.AIService = {
    ServiceGatewayMeta,
    getGlobalRelayArteries,
    getServiceRelayArtery,
    prewarmServiceRelay,
    runAnalyzeFirestore,
    runAnalyzeSQL,
    runDetectDrift,
    runValidatePulse,
    runFullAudit,
    runAnalyzeRoutes,
    runAnalyzeLogs,
    runAnalyzeErrors,
    runExplainOrgan,
    runExplainPathway,
    runTourGuideQuery
}
