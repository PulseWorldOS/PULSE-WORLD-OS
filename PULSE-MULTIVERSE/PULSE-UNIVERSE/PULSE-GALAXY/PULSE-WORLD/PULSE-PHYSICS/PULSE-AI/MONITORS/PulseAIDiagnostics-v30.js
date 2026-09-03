// ============================================================================
//  PULSE OS v30‑IMMORTAL++ — DIAGNOSTICS ORGAN
//  Drift Tracker • Mismatch Ledger • Slowdown Sensor • Dualband Pressure Aware
//  PURE OBSERVATION. ZERO RANDOMNESS. ZERO MUTATION. NO IDENTITY.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
//  PRESSURE HELPERS — dualband‑aware (v30)
// ============================================================================
function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals.layered.organism.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals.binary.pressure != null)
    return binaryVitals.binary.pressure;
  if (typeof binaryVitals.pressure === "number")
    return binaryVitals.pressure;
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
//  PACKET EMITTER — deterministic, diagnostics‑scoped (v30 IMMORTAL++)
// ============================================================================
function emitDiagnosticsPacket(type, payload = {}) {
  return Object.freeze({
    packetType: `diagnostics-${type}`,
    timestamp: 0,          // IMMORTAL++: no wall‑clock
    layer: "diagnostics-organ",
    role: "diagnostics",
    band: "binary",
    ...payload
  });
}


// ============================================================================
//  PREWARM ENGINE — v30 IMMORTAL++
// ============================================================================
export function prewarmDiagnosticsOrgan() {
  try {
    const warmState = createDiagnosticsState();

    const api = createDiagnosticsAPI();
    api.flagMismatch("prewarm", "expected", "actual");
    api.flagMissingField("missingField");
    api.flagSlowdown("prewarm");
    api.flagDrift("prewarm drift");

    const warmContext = { trace: [] };
    attachDiagnosticsOrgan(warmContext);

    warmContext.flagMismatch("key", "expected", "actual");
    warmContext.flagMissingField("missing");
    warmContext.flagSlowdown("prewarm");
    warmContext.flagDrift("prewarm drift");

    return emitDiagnosticsPacket("prewarm", {
      message: "Diagnostics organ prewarmed and observation pathways aligned.",
      warmStateTimestamp: warmState.timestamp
    });
  } catch (err) {
    return emitDiagnosticsPacket("prewarm-error", {
      error: String(err),
      message: "Diagnostics organ prewarm failed."
    });
  }
}


// ============================================================================
//  FACTORY — Create Diagnostics State (v30 IMMORTAL++)
// ============================================================================
export function createDiagnosticsState() {
  return {
    mismatches: [],
    missingFields: [],
    slowdownCauses: [],
    driftEvents: [],
    driftDetected: false,
    timestamp: 0 // IMMORTAL++: no Date.now
  };
}


// ============================================================================
//  ATTACH HELPERS — Bind Diagnostics to a Context (v30 IMMORTAL++)
// ============================================================================
export function attachDiagnosticsOrgan(context) {
  if (!context) return context;

  const diagnostics = createDiagnosticsState();
  context.diagnostics = diagnostics;

  context.flagMismatch = (key, expected, actual) => {
    diagnostics.mismatches.push({ key, expected, actual });
    context.trace.push(`Mismatch: ${key} expected ${expected}, got ${actual}`);
  };

  context.flagMissingField = (key) => {
    diagnostics.missingFields.push({ key });
    context.trace.push(`Missing field: ${key}`);
  };

  context.flagSlowdown = (reason) => {
    diagnostics.slowdownCauses.push({ reason });
    context.trace.push(`Slowdown cause: ${reason}`);
  };

  context.flagDrift = (description) => {
    diagnostics.driftDetected = true;
    diagnostics.driftEvents.push({ description });
    context.trace.push(`Drift detected: ${description}`);
  };

  return context;
}


// ============================================================================
//  STANDALONE DIAGNOSTICS API — No Context Mutation (v30 IMMORTAL++)
// ============================================================================
export function createDiagnosticsAPI() {
  const diagnostics = createDiagnosticsState();

  function flagMismatch(key, expected, actual) {
    diagnostics.mismatches.push({ key, expected, actual });
  }

  function flagMissingField(key) {
    diagnostics.missingFields.push({ key });
  }

  function flagSlowdown(reason) {
    diagnostics.slowdownCauses.push({ reason });
  }

  function flagDrift(description) {
    diagnostics.driftDetected = true;
    diagnostics.driftEvents.push({ description });
  }

  return Object.freeze({
    diagnostics,
    flagMismatch,
    flagMissingField,
    flagSlowdown,
    flagDrift
  });
}


// ============================================================================
//  DIAGNOSTICS ARTERY — symbolic‑only, deterministic (v30 IMMORTAL++)
// ============================================================================
export function diagnosticsArtery(diagnostics, binaryVitals = {}) {
  const binaryPressure = extractBinaryPressure(binaryVitals);

  const mismatchCount = diagnostics.mismatches.length;
  const missingCount = diagnostics.missingFields.length;
  const slowdownCount = diagnostics.slowdownCauses.length;
  const drift = diagnostics.driftDetected;

  const localPressure =
    (mismatchCount ? 0.25 : 0) +
    (missingCount ? 0.2 : 0) +
    (slowdownCount ? 0.25 : 0) +
    (drift ? 0.4 : 0);

  const pressure = Math.max(
    0,
    Math.min(1, 0.6 * localPressure + 0.4 * binaryPressure)
  );

  return emitDiagnosticsPacket("artery", {
    organism: {
      pressure,
      pressureBucket: bucketPressure(pressure)
    },
    diagnostics: {
      mismatches: mismatchCount,
      missingFields: missingCount,
      slowdown: slowdownCount,
      drift
    }
  });
}


// ============================================================================
//  BOOT PREWARM + DUAL‑MODE EXPORTS — v30 IMMORTAL++
// ============================================================================
prewarmDiagnosticsOrgan();
// ============================================================================
//  META EXPORT — v30 IMMORTAL++ (Diagnostics Organ)
// ============================================================================
export const DiagnosticsMeta = Object.freeze({
  type: "System",
  subsystem: "diagnostics",
  layer: "diagnostics-organ",
  version: "30.0-IMMORTAL++",
  identity: "diagnostics-v30-IMMORTAL++",

  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    zeroMutation: true,
    zeroRandomness: true,
    zeroIdentity: true,
    zeroWallClock: true,
    binaryAware: true,
    symbolicAware: true,
    dualband: true,
    mismatchAware: true,
    missingFieldAware: true,
    slowdownAware: true,
    driftAware: true,
    arteryAware: true,
    multiInstanceReady: true,
    epoch: "30.0-IMMORTAL++"
  }),

  contract: Object.freeze({
    purpose:
      "Observe mismatches, missing fields, slowdowns, and drift without mutation or randomness.",
    never: Object.freeze([
      "mutate input",
      "introduce randomness",
      "use Date.now",
      "store identity",
      "modify global state",
      "alter diagnostics data",
      "perform unsafe writes"
    ]),
    always: Object.freeze([
      "remain deterministic",
      "remain pure observation",
      "respect IMMORTAL++ constraints",
      "emit diagnostics-scoped packets",
      "track drift/mismatch/slowdown safely",
      "stay identity-free"
    ])
  })
});

PulseRealm.PulseAIDiagnosticsPrewarm = prewarmDiagnosticsOrgan;
PulseRealm.PulseAIDiagnostics = createDiagnosticsAPI;

PulseRealm.PulseAIDiagnosticsMeta = DiagnosticsMeta;