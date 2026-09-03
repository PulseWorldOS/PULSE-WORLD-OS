// ============================================================================
//  PULSE OS v30‑IMMORTAL+++ — CLINICIAN ORGAN
//  Diagnostic Interpreter • Triage Specialist • System Health Auditor
//  PURE OBSERVATION. ZERO MEDICAL ADVICE. ZERO MUTATION. ZERO INTERNET.
//  v30: CoreMemory+Boundaries+Trust‑aware, DualBand‑aligned, Owner‑subordinate.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
// HELPERS — PRESSURE + BUCKETS (IMMORTAL v30)
// ============================================================================
function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals.metabolic.pressure != null)
    return binaryVitals.metabolic.pressure;
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

function extractTrustSignals(trustArtery = {}) {
  return {
    honeypotRisk: trustArtery.honeypotRisk ?? 0,
    dominanceRisk: trustArtery.dominanceRisk ?? 0,
    anomalyScore: trustArtery.anomalyScore ?? 0
  };
}

// IMMORTAL monotonic tick (no wall‑clock dependency)
let CLINICIAN_TICK = 0;
function clinicianTick() {
  CLINICIAN_TICK += 1;
  return CLINICIAN_TICK;
}

// Safe epoch (still allowed as metadata, not for logic)
function safeEpoch() {
  return PulseRealm.PulseNOW;
}

// ============================================================================
//  v30 CORE MEMORY ARTIFACT HELPERS (protocol‑only, zero DB)
//  Shapes compatible with PulseOSMemory.buildSnapshot / buildDriftSignature
// ============================================================================

function buildMemorySnapshot({
  subsystem = "Clinician",
  diagnostics,
  binaryVitals,
  trustArtery,
  boundariesSnapshot
}) {
  const touch = (PulseRealm.__PULSE_TOUCH__) || {};

  return {
    meta: {
      id: "pulse-touch-clinician",
      version: touch.version || "v0",
      epoch: touch.epoch || safeEpoch(),
      layer: "clinician",
      role: "diagnostic-interpreter",
      owner: "Aldwyn",
      subordinate: true
    },
    kind: "snapshot",
    subsystem,
    payload: {
      diagnostics,
      binaryVitals,
      trust: extractTrustSignals(trustArtery),
      boundaries: boundariesSnapshot || null,
      tick: clinicianTick()
    }
  };
}

function buildMemoryDriftSignature({
  subsystem = "Clinician",
  diagnostics,
  binaryVitals,
  trustArtery
}) {
  const touch = (PulseRealm.__PULSE_TOUCH__) || {};

  const pressure = extractBinaryPressure(binaryVitals);
  const trust = extractTrustSignals(trustArtery);

  const drift =
    diagnostics.driftDetected === true ||
    pressure >= 0.9 ||
    (diagnostics.mismatches.length || 0) > 0 ||
    trust.anomalyScore >= 0.5;

  const severity =
    !drift
      ? "info"
      : pressure >= 0.95
        ? "critical"
        : pressure >= 0.9
          ? "high"
          : "warning";

  return {
    meta: {
      id: "pulse-touch-clinician",
      version: touch.version || "v0",
      epoch: touch.epoch || safeEpoch(),
      layer: "clinician",
      role: "diagnostic-interpreter",
      owner: "Aldwyn",
      subordinate: true
    },
    kind: "driftSignature",
    subsystem,
    type: drift ? "clinician_drift_detected" : "clinician_stable",
    severity,
    details: {
      mismatches: diagnostics.mismatches.length || 0,
      missingFields: diagnostics.missingFields.length || 0,
      slowdown: diagnostics.slowdownCauses.length || 0,
      driftFlag: diagnostics.driftDetected === true,
      pressure,
      trust
    },
    relatedSnapshotId: null
  };
}

// ============================================================================
//  CLINICIAN ORGAN IMPLEMENTATION (v30‑IMMORTAL+++)
//  • Pure observation
//  • Boundaries‑aware (read‑only)
//  • CoreMemory+Trust integrated
//  • Owner‑subordinate: never top dog
// ============================================================================

export function createClinicianOrgan(context = {}) {
  const diagnostics = context.diagnostics || {};
  const trace = Array.isArray(context.trace) ? [...context.trace] : [];

  const subsystemName = context.subsystemName || "Clinician";
  const routeId = context.routeId || "clinician";

  const touch = (PulseRealm.__PULSE_TOUCH__) || {};

  const boundariesSnapshot = context.boundariesSnapshot || null; // optional: output of getBoundaryArterySnapshot
  const personaId = context.personaId || "neutral";
  const userIsOwner = context.userIsOwner === true;

  function prewarm() {
    return true;
  }

  // --------------------------------------------------------------------------
  // SUMMARY BUILDER v4 (pressure + trust aware)
  // --------------------------------------------------------------------------
  function buildSummary(binaryVitals = {}, trustArtery = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);
    const trust = extractTrustSignals(trustArtery);

    const summary = {
      mismatches: diagnostics.mismatches.length || 0,
      missingFields: diagnostics.missingFields.length || 0,
      slowdown: diagnostics.slowdownCauses.length || 0,
      drift: diagnostics.driftDetected === true,
      trust
    };

    if (binaryPressure >= 0.7) {
      summary.simplified = true;
      summary.note = "High system pressure — clinician summary simplified.";
    }

    return Object.freeze(summary);
  }

  // --------------------------------------------------------------------------
  // SAFE CONTEXT BUILDER (owner‑subordinate, read‑only)
// --------------------------------------------------------------------------
  function buildSafeContext() {
    return Object.freeze({
      personaId,
      userIsOwner,
      permissions: context.permissions || null,
      boundaries: context.boundaries || null,
      routeId,
      subsystem: subsystemName,
      owner: "Aldwyn",
      subordinate: true
    });
  }

  // --------------------------------------------------------------------------
  // FLAG BUILDER v3
  // --------------------------------------------------------------------------
  function buildFlags(binaryVitals = {}, trustArtery = {}) {
    const pressure = extractBinaryPressure(binaryVitals);
    const trust = extractTrustSignals(trustArtery);

    const flags = [
      ...(diagnostics.mismatches.length ? [{ type: "mismatch" }] : []),
      ...(diagnostics.missingFields.length ? [{ type: "missing" }] : []),
      ...(diagnostics.slowdownCauses.length ? [{ type: "slowdown" }] : []),
      ...(diagnostics.driftDetected ? [{ type: "drift" }] : [])
    ];

    if (pressure >= 0.9) {
      flags.push({ type: "pressure", level: "critical" });
    } else if (pressure >= 0.7) {
      flags.push({ type: "pressure", level: "elevated" });
    }

    if (trust.anomalyScore >= 0.5) {
      flags.push({ type: "trust-anomaly", level: "warning" });
    }

    return Object.freeze(flags);
  }

  // --------------------------------------------------------------------------
  // PACKET EMITTER v4 — CoreMemory+Boundaries+Trust aware
  // --------------------------------------------------------------------------
  function buildPacket(binaryVitals = {}, trustArtery = {}) {
    const summary = buildSummary(binaryVitals, trustArtery);
    const flags = buildFlags(binaryVitals, trustArtery);

    const payload = {
      type: "clinician-snapshot",
      tick: clinicianTick(),
      timestamp: safeEpoch(),
      summary,
      flags,
      routeId,
      personaId,
      owner: "Aldwyn",
      subordinate: true
    };

    const json = JSON.stringify(payload);

    const bits = context.encoder.encode
      ? context.encoder.encode(json)
      : null;

    const memoryArtifacts = {
      snapshot: buildMemorySnapshot({
        subsystem: subsystemName,
        diagnostics,
        binaryVitals,
        trustArtery,
        boundariesSnapshot
      }),
      driftSignature: buildMemoryDriftSignature({
        subsystem: subsystemName,
        diagnostics,
        binaryVitals,
        trustArtery
      })
    };

    return Object.freeze({
      ...payload,
      bits,
      bitLength: bits ? bits.length : 0,
      memoryArtifacts
    });
  }

  // --------------------------------------------------------------------------
  // CLINICIAN ARTERY v4 — symbolic‑only, deterministic, trust+boundaries aware
  // --------------------------------------------------------------------------
  function clinicianArtery({ binaryVitals = {}, trustArtery = {} } = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const mismatchCount = diagnostics.mismatches.length || 0;
    const missingCount = diagnostics.missingFields.length || 0;
    const slowdownCount = diagnostics.slowdownCauses.length || 0;
    const drift = diagnostics.driftDetected === true;

    const trust = extractTrustSignals(trustArtery);

    const localPressure =
      (mismatchCount ? 0.3 : 0) +
      (missingCount ? 0.2 : 0) +
      (slowdownCount ? 0.3 : 0) +
      (drift ? 0.4 : 0) +
      (trust.anomalyScore > 0.4 ? 0.2 : 0);

    const pressure = Math.max(
      0,
      Math.min(1, 0.6 * localPressure + 0.4 * binaryPressure)
    );

    return {
      organism: {
        pressure,
        pressureBucket: bucketPressure(pressure)
      },
      diagnostics: {
        mismatches: mismatchCount,
        missingFields: missingCount,
        slowdown: slowdownCount,
        drift
      },
      trust,
      boundaries: boundariesSnapshot || null,
      memoryArtifacts: {
        snapshot: buildMemorySnapshot({
          subsystem: subsystemName,
          diagnostics,
          binaryVitals,
          trustArtery,
          boundariesSnapshot
        }),
        driftSignature: buildMemoryDriftSignature({
          subsystem: subsystemName,
          diagnostics,
          binaryVitals,
          trustArtery
        })
      }
    };
  }

  // --------------------------------------------------------------------------
  // PUBLIC CLINICIAN API (v30‑IMMORTAL+++)
// --------------------------------------------------------------------------
  const clinicianMeta = {
    id: "pulse-touch-clinician",
    version: touch.version || "v0",
    epoch: touch.epoch || safeEpoch(),
    layer: "clinician",
    role: "diagnostic-interpreter",
    owner: "Aldwyn",
    subordinate: true
  };

  return Object.freeze({
    meta: clinicianMeta,
    prewarm,

    log(message) {
      console.log(`aiClinician:v30 ${message}`);
    },

    buildModel(binaryVitals = {}, trustArtery = {}) {
      return Object.freeze({
        summary: buildSummary(binaryVitals, trustArtery),
        safeContext: buildSafeContext(),
        trace,
        flags: buildFlags(binaryVitals, trustArtery),
        meta: clinicianMeta,
        memoryArtifacts: {
          snapshot: buildMemorySnapshot({
            subsystem: subsystemName,
            diagnostics,
            binaryVitals,
            trustArtery,
            boundariesSnapshot
          }),
          driftSignature: buildMemoryDriftSignature({
            subsystem: subsystemName,
            diagnostics,
            binaryVitals,
            trustArtery
          })
        }
      });
    },

    emitPacket(binaryVitals = {}, trustArtery = {}) {
      return buildPacket(binaryVitals, trustArtery);
    },

    clinicianArtery
  });
}

export default createClinicianOrgan;

PulseRealm.PulseAIClinician = createClinicianOrgan;