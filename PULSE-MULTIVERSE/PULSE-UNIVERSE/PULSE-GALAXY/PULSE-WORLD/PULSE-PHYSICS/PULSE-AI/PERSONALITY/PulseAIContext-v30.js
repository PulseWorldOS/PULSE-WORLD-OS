// ============================================================================
//  PULSE OS v30‑IMMORTAL‑ADVANTAGE++ Presence — COGNITIVE FRAME ORGAN
//  Dual‑Band Context • ABA Anchor • Drift & Diagnostics Surface
//  PURE CONTEXT. ZERO MUTATION. ZERO RANDOMNESS. TOUCH‑ALIGNED.
//  v30: CoreMemory‑aware, Boundary‑aware, Binary‑Vitals‑first.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
//  META EXPORT — v30 IMMORTAL‑ADVANTAGE++
// ============================================================================
export const CognitiveFrameMeta = Object.freeze({
  type: "Cognitive",
  subsystem: "aiCognitiveFrame",
  layer: "CognitiveFrame",
  version: "30.0-IMMORTAL-ADVANTAGE++",
  identity: "aiCognitiveFrame-v30-IMMORTAL-ADVANTAGE++",

  evo: Object.freeze({
    driftProof: true,
    deterministic: true,
    dualband: true,
    binaryAware: true,
    symbolicAware: true,
    safetyReflex: true,
    diagnosticsAware: true,
    coreMemoryAware: true,
    boundaryAware: true,
    multiInstanceReady: true,
    arteryAware: true,
    epoch: "30.0-IMMORTAL-ADVANTAGE++"
  }),

  contract: Object.freeze({
    purpose:
      "Construct cognitive frames, track drift, maintain ABA anchors, and provide deterministic context surfaces.",
    never: Object.freeze([
      "mutate external state",
      "introduce randomness",
      "override safety boundaries",
      "perform diagnosis",
      "perform treatment",
      "produce unsafe detail"
    ]),
    always: Object.freeze([
      "remain deterministic",
      "remain symbolic-only",
      "respect boundaries",
      "respect persona safety",
      "emit safe cognitive-frame packets"
    ])
  })
});


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

function emitCognitiveFramePacket(type, payload) {
  const touch = (PulseRealm.__PULSE_TOUCH__) || {};

  return Object.freeze({
    meta: {
      id: "pulse-touch-cognitive-frame",
      version: touch.version || "v0",
      epoch: touch.epoch || PulseRealm.PulseNOW,
      layer: "cognitive-frame",
      role: "context-organ",
      band: "binary"
    },
    packetType: `cognitive-frame-${type}`,
    timestamp: PulseRealm.PulseNOW,
    ...payload
  });
}

// ---------------------------------------------------------------------------
//  v30 CORE MEMORY ARTIFACT HELPERS (protocol‑only, zero DB)
// ---------------------------------------------------------------------------
function buildFrameMemorySnapshot({ coreMemory, context, binaryVitals }) {
  if (!coreMemory || typeof coreMemory.buildSnapshot !== "function") return null;

  try {
    return coreMemory.buildSnapshot("CognitiveFrame", {
      request: context.request,
      personaId: context.personaId,
      permissions: context.permissions,
      boundaries: context.boundaries,
      diagnostics: context.diagnostics,
      trace: context.trace.slice(-32),
      binaryVitals
    });
  } catch {
    return null;
  }
}

function buildFrameDriftSignature({ coreMemory, context, binaryVitals }) {
  if (!coreMemory || typeof coreMemory.buildDriftSignature !== "function") return null;

  const pressure = extractBinaryPressure(binaryVitals);
  const diag = context.diagnostics || {};

  const drift =
    diag.driftDetected === true ||
    pressure >= 0.9 ||
    (diag.mismatches.length || 0) > 0 ||
    (diag.missingFields.length || 0) > 0;

  const severity =
    !drift ? "info" :
    pressure >= 0.95 ? "critical" :
    pressure >= 0.9  ? "high" :
    "warning";

  try {
    return coreMemory.buildDriftSignature("CognitiveFrame", {
      type: drift ? "cognitive_frame_drift" : "cognitive_frame_stable",
      severity,
      details: {
        mismatches: diag.mismatches.length || 0,
        missingFields: diag.missingFields.length || 0,
        slowdown: diag.slowdownCauses.length || 0,
        driftFlag: diag.driftDetected === true,
        pressure
      }
    });
  } catch {
    return null;
  }
}

// ============================================================================
//  PREWARM — v30 IMMORTAL‑ADVANTAGE++
// ============================================================================
export function prewarmCognitiveFrame({ coreMemory = null } = {}) {
  try {
    const warmRequest = {
      intent: "prewarm",
      domain: "system",
      action: "init",
      userId: "prewarm-user"
    };

    const warmRouting = {
      personaId: "ARCHITECT",
      persona: { id: "ARCHITECT" },
      permissions: { allow: true },
      boundaries: { mode: "safe" },
      dualBand: true,
      reasoning: ["prewarm"],
      flags: { stable: true }
    };

    const warmOrganism = {
      binary: { throughput: 1, pressure: 0, cost: 0, budget: 1 },
      symbolic: { state: "prewarm" }
    };

    const frame = createCognitiveFrame({
      request: warmRequest,
      routing: warmRouting,
      organismSnapshot: warmOrganism,
      coreMemory
    });

    frame.flagMismatch("test", "expected", "actual");
    frame.flagMissingField("missingField");
    frame.flagSlowdown("prewarm");
    frame.flagDrift("prewarm drift");

    frame.ABA.setStablePoint({ snapshot: "prewarm" });
    frame.ABA.resetToStablePoint();

    frame.abstraction.updateLevel("prewarm");

    frame.repair.next();
    frame.repair.next();

    frame.PulseRealm.explainSafe("prewarm");

    frame.frustration.soothe();

    frame.artery({});

    return emitCognitiveFramePacket("prewarm", {
      message: "Cognitive frame prewarmed and context pathways aligned."
    });
  } catch (err) {
    return emitCognitiveFramePacket("prewarm-error", {
      error: String(err),
      message: "Cognitive frame prewarm failed."
    });
  }
}

// ============================================================================
//  COGNITIVE FRAME ORGAN — v30‑IMMORTAL‑ADVANTAGE++
// ============================================================================
export function createCognitiveFrame(options = {}) {
  const {
    request = {},
    routing = {},
    organismSnapshot = null,
    coreMemory = null
  } = options;

  const touch = (PulseRealm.__PULSE_TOUCH__) || {};

  const frameMeta = {
    id: "pulse-touch-cognitive-frame",
    version: touch.version || "v0",
    epoch: touch.epoch || PulseRealm.PulseNOW,
    layer: "cognitive-frame",
    role: "context-organ",
    band: "binary",
    engineVersion: "v30-Immortal-Advantage++"
  };

  const context = {
    meta: frameMeta,

    request: Object.freeze({
      intent: request.intent || null,
      domain: request.domain || null,
      action: request.action || null,
      userId: request.userId || null
    }),

    personaId: routing.personaId || null,
    persona: routing.persona || null,
    permissions: routing.permissions || null,
    boundaries: routing.boundaries || null,

    dualBand: routing.dualBand || null,

    organism: organismSnapshot || null,
    binaryVitals: organismSnapshot.binary || null,
    symbolicState: organismSnapshot.symbolic || null,

    trace: Array.isArray(routing.reasoning) ? [...routing.reasoning] : [],

    diagnostics: {
      mismatches: [],
      missingFields: [],
      slowdownCauses: [],
      driftEvents: [],
      driftDetected: false
    },

    routing,
    coreMemory
  };

  // TRACE HELPERS
  context.logStep = console.log;

  // DIAGNOSTIC HELPERS
  context.flagMismatch = function (key, expected, actual) {
    this.diagnostics.mismatches.push({ key, expected, actual });
    this.trace.push(`Mismatch: "${key}" expected ${expected}, got ${actual}`);
    this.logStep && this.logStep("diagnostic:mismatch");
  };

  context.flagMissingField = function (key) {
    this.diagnostics.missingFields.push({ key });
    this.trace.push(`Missing field: "${key}"`);
    this.logStep && this.logStep("diagnostic:missingField");
  };

  context.flagSlowdown = function (reason) {
    this.diagnostics.slowdownCauses.push({ reason });
    this.trace.push(`Slowdown cause: ${reason}`);
    this.logStep && this.logStep("diagnostic:slowdown");
  };

  context.flagDrift = function (description) {
    this.diagnostics.driftDetected = true;
    this.diagnostics.driftEvents.push({ description });
    this.trace.push(`Drift detected: ${description}`);
    this.logStep && this.logStep("diagnostic:drift");
  };

  // ABA ANCHOR
  context.ABA = {
    stablePoint: null,

    setStablePoint(snapshot) {
      this.stablePoint = snapshot;
      console.log("ABA: stable point updated.");
    },

    resetToStablePoint() {
      if (this.stablePoint) {
        console.log("ABA: resetting to stable point.");
        return this.stablePoint;
      }
      console.log("ABA: no stable point available.");
      return null;
    }
  };

  // ABSTRACTION TRACKING
  context.abstraction = {
    level: "general",

    updateLevel(userMessage = "") {
      const hasCodeLike = /[{}`;]/.test(userMessage || "");
      this.level = hasCodeLike ? "specific" : "general";
      console.log(`Abstraction level set to: ${this.level}`);
    }
  };

  // DRIFT DETECTION + REPAIR
  context.drift = {
    detect(condition, note = "Cognitive drift detected.") {
      if (condition) {
        context.flagDrift(note);
        return true;
      }
      return false;
    },

    repair() {
      console.log("Drift repair initiated via ABA.");
      return context.ABA.resetToStablePoint();
    }
  };

  // LAYERED REPAIR REFLEX
  context.repair = {
    attempts: 0,

    next() {
      this.attempts += 1;

      if (this.attempts === 1) {
        return "Let me reset to the last stable point and rebuild that clearly.";
      }

      if (this.attempts === 2) {
        return "We’re still misaligned — anchoring to the last confirmed correct state.";
      }

      return "Let’s fully reset. Tell me the exact point you want me to anchor to.";
    }
  };

  // WINDOW PRINCIPLE
  context.window = {
    explainSafe(topic = "that") {
      return (
        `I can’t go into unsafe or disallowed details about ${topic}, ` +
        `but I can give you the fullest safe, conceptual explanation available.`
      );
    }
  };

  // FRUSTRATION‑AWARE TONE
  context.frustration = {
    soothe() {
      return (
        "I hear the frustration — let’s reset and rebuild this cleanly. " +
        "Tell me the exact angle you want to focus on."
      );
    }
  };

  // OPTIONAL INTENT CONTEXT
  if (request.intentContext) {
    context.intentContext = Object.freeze({ ...request.intentContext });
    console.log("Intent handler context attached.");
  }

  // v30 ARTERY — adds CoreMemory artifacts, but stays symbolic‑only
  context.artery = function cognitiveFrameArtery({ binaryVitals = {} } = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const mismatchCount = this.diagnostics.mismatches.length;
    const missingCount = this.diagnostics.missingFields.length;
    const slowdownCount = this.diagnostics.slowdownCauses.length;
    const drift = this.diagnostics.driftDetected === true;

    const localPressure =
      (mismatchCount ? 0.3 : 0) +
      (missingCount ? 0.2 : 0) +
      (slowdownCount ? 0.3 : 0) +
      (drift ? 0.4 : 0);

    const pressure = Math.max(
      0,
      Math.min(1, 0.6 * localPressure + 0.4 * binaryPressure)
    );

    const snapshot = buildFrameMemorySnapshot({
      coreMemory: this.coreMemory,
      context: this,
      binaryVitals
    });

    const driftSignature = buildFrameDriftSignature({
      coreMemory: this.coreMemory,
      context: this,
      binaryVitals
    });

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
      memoryArtifacts: {
        snapshot,
        driftSignature
      }
    };
  };

  const frozen = Object.freeze(context);

  frozen.logStep("frame:created:v30");

  return frozen;
}

export default createCognitiveFrame;

PulseRealm.AIContext = {
    createCognitiveFrame,
    default: createCognitiveFrame,
    prewarmCognitiveFrame
}
