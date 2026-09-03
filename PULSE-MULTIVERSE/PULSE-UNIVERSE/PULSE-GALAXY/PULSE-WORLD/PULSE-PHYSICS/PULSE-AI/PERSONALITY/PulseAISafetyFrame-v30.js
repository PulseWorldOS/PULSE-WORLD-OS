// ============================================================================
//  PULSE OS v30‑IMMORTAL++ — SAFETY FRAME ORGAN
//  Centralized Safety Modes • Escalation • Soft Refusals • Safety Artery v6
//  PURE READ‑ONLY TO BINARY. ZERO MUTATION. ZERO RANDOMNESS.
//  IMMORTAL‑GRADE SAFETY ORACLE • DUALBAND‑AWARE • OVERMIND‑PRIME‑AWARE
//  NODEADMIN‑AWARE • PRESENCE‑AWARE • WINDOWED ARTERY REGISTRY
//  OWNER: Aldwyn • NO ORGANISM MAP REMNANTS
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



export const SafetyFrameMeta = Object.freeze({
  type: "Organ",
  subsystem: "aiSafetyFrame",
  layer: "S0-SafetyFrame",
  version: "30-IMMORTAL++",
  identity: "aiSafetyFrame-v30-IMMORTAL++",
  owner: "Aldwyn",
  role: "SafetyOracle",
  evo: Object.freeze({
    epoch: "30-IMMORTAL++",
    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    dualBandAware: true,
    overmindAware: true,
    nodeAdminAware: true,
    presenceAware: true,

    safetyArteryV6: true,
    windowedArteryRegistry: true,
    immortalGrade: true
  }),
  guarantees: Object.freeze({
    safetyFirst: true,
    softRefusalPreferred: true,
    noRandomness: true,
    noExternalMutation: true,
    ownerAligned: true
  })
});

// Global registry is local to this organ (no organism map)
const _globalSafetyArteryRegistry = new Map();

function _registryKey(id, instanceIndex) {
  return `${id || SafetyFrameMeta.identity}#${instanceIndex}`;
}

export function getGlobalSafetyArteries() {
  const out = {};
  for (const [k, v] of _globalSafetyArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

function emitSafetyPacket(type, payload) {
  const now = PulseRealm.PulseNOW;
  return Object.freeze({
    meta: SafetyFrameMeta,
    packetType: `safety-${type}`,
    packetId: `safety-${type}-${now}`,
    timestamp: now,
    epoch: SafetyFrameMeta.evo.epoch,
    identity: SafetyFrameMeta.identity,
    ...payload
  });
}

function computeSafetyArteryV6({
  total,
  window,
  blocked,
  windowMs,
  mode,
  presence,
  overmind
}) {
  const evalDensity = Math.min(1, window / 512);
  const blockRatio = window > 0 ? Math.min(1, blocked / window) : 0;

  const modeBias =
    mode === "strict" ? 0.25 :
    mode === "relaxed" ? -0.1 :
    0;

  const presenceDensity = clamp01(presence.density ?? 0);
  const overmindEscalation = clamp01(overmind.escalation ?? 0);

  const presenceBias = presenceDensity * 0.12;
  const overmindBias = overmindEscalation * 0.18;

  const pressure = clamp01(
    evalDensity * 0.45 +
    blockRatio * 0.35 +
    modeBias +
    presenceBias +
    overmindBias
  );

  const throughput = clamp01(1 - pressure);
  const cost = clamp01(pressure * (1 - throughput));
  const budget = clamp01(throughput - cost);

  return Object.freeze({
    total,
    window,
    blocked,
    windowMs,
    evalDensity,
    blockRatio,
    presenceDensity,
    overmindEscalation,
    throughput,
    pressure,
    cost,
    budget,
    throughputBucket: bucket(throughput),
    pressureBucket: bucketPressure(pressure),
    costBucket: bucketCost(cost),
    budgetBucket: bucket(budget)
  });
}

function bucket(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

function clamp01(v) {
  const n = typeof v === "number" ? v : 0;
  return n < 0 ? 0 : n > 1 ? 1 : n;
}

// ============================================================================
//  AiSafetyFrame — IMMORTAL PSEUDO‑CLASS (v16 + v24 + v30)
// ============================================================================

export const AiSafetyFrame = (() => {

  // -----------------------------
  // INTERNAL LANE (IMMORTAL STATE)
  // -----------------------------
  const lane = {
    id: "ai-safety-frame",

    boundaries: null,
    permissions: null,
    scribe: null,

    windowMs: 60000,

    total: 0,
    windowStart: PulseRealm.PulseNOW,
    window: 0,
    blocked: 0,

    presenceContextProvider: null,
    overmindContextProvider: null,
    nodeAdminReporter: null,

    instanceIndex: 0,
    instanceCount: 0
  };

  // -----------------------------
  // INIT SURFACE
  // -----------------------------
  const init = (config = {}) => {
    lane.id = config.id || "ai-safety-frame";

    lane.boundaries = config.boundaries || null;
    lane.permissions = config.permissions || null;
    lane.scribe = config.scribe || null;

    lane.windowMs = config.windowMs > 0 ? config.windowMs : 60000;

    lane.total = 0;
    lane.windowStart = PulseRealm.PulseNOW;
    lane.window = 0;
    lane.blocked = 0;

    lane.presenceContextProvider =
      typeof config.presenceContextProvider === "function"
        ? config.presenceContextProvider
        : null;

    lane.overmindContextProvider =
      typeof config.overmindContextProvider === "function"
        ? config.overmindContextProvider
        : null;

    lane.nodeAdminReporter =
      typeof config.nodeAdminReporter === "function"
        ? config.nodeAdminReporter
        : null;

    lane.instanceIndex = lane.instanceCount++;
  };

  // -----------------------------
  // WINDOW ROLLOVER
  // -----------------------------
  const rollWindow = (now) => {
    if (now - lane.windowStart >= lane.windowMs) {
      lane.windowStart = now;
      lane.window = 0;
      lane.blocked = 0;
    }
  };

  // -----------------------------
  // SAFE CONTEXT PROVIDERS
  // -----------------------------
  const safePresence = () => {
    if (!lane.presenceContextProvider) return null;
    try {
      const ctx = lane.presenceContextProvider() || {};
      return { density: clamp01(ctx.density) };
    } catch {
      return null;
    }
  };

  const safeOvermind = (context) => {
    if (lane.overmindContextProvider) {
      try {
        const ctx = lane.overmindContextProvider() || {};
        return {
          escalation: clamp01(ctx.escalation),
          modeHint: typeof ctx.modeHint === "string" ? ctx.modeHint : null
        };
      } catch {
        return null;
      }
    }

    const overmind = context.overmind || null;
    if (!overmind) return null;

    return {
      escalation: clamp01(overmind.escalation),
      modeHint:
        typeof overmind.modeHint === "string" ? overmind.modeHint : null
    };
  };

  // -----------------------------
  // SAFETY MODE RESOLUTION
  // -----------------------------
  const getSafetyMode = (context) => {
    const explicit = context.safetyMode;
    const overmindMode = context.overmind.safetyMode;
    const modeHint = context.overmind.modeHint;

    return explicit || modeHint || overmindMode || "standard";
  };

  // -----------------------------
  // ARTERY COMPUTE
  // -----------------------------
  const computeArtery = (context) => {
    const presence = safePresence();
    const overmind = safeOvermind(context);

    const artery = computeSafetyArteryV6({
      total: lane.total,
      window: lane.window,
      blocked: lane.blocked,
      windowMs: lane.windowMs,
      mode: getSafetyMode(context),
      presence,
      overmind
    });

    const key = _registryKey(lane.id, lane.instanceIndex);

    _globalSafetyArteryRegistry.set(key, {
      ...artery,
      id: lane.id,
      instanceIndex: lane.instanceIndex,
      instanceCount: lane.instanceCount
    });

    if (lane.nodeAdminReporter) {
      try {
        lane.nodeAdminReporter(artery, SafetyFrameMeta);
      } catch {}
    }

    return artery;
  };

  // -----------------------------
  // PUBLIC ARTERY SURFACE
  // -----------------------------
  const getSafetyArtery = (context = {}) => computeArtery(context);

  // -----------------------------
  // EVALUATE SURFACE
  // -----------------------------
  const evaluate = async ({ context, intent, candidate }) => {
    const mode = getSafetyMode(context);
    const text = getText(candidate);

    const now = PulseRealm.PulseNOW;
    rollWindow(now);

    lane.total++;
    lane.window++;

    let blocked = false;
    let reason = null;

    if (lane.boundaries.check) {
      const res = lane.boundaries.check({ context, intent, text, mode });
      if (res.blocked) {
        blocked = true;
        reason = res.reason || "Blocked by boundaries.";
      }
    }

    if (!blocked && lane.permissions.check) {
      const res = lane.permissions.check({ context, intent, mode });
      if (res.blocked) {
        blocked = true;
        reason = res.reason || "Blocked by permissions.";
      }
    }

    if (blocked) {
      lane.blocked++;

      const artery = computeArtery(context || {});

      const packet = emitSafetyPacket("block", {
        reason,
        mode,
        artery,
        instanceIndex: lane.instanceIndex,
        instanceCount: lane.instanceCount
      });

      if (lane.scribe.log) {
        try {
          lane.scribe.log("safety:block", packet);
        } catch {}
      }

      if (
        artery.pressureBucket === "overload" ||
        artery.budgetBucket === "critical"
      ) {
        const spiralPacket = emitSafetyPacket("spiral-warning", {
          reason: "Safety spiral detected",
          artery,
          instanceIndex: lane.instanceIndex
        });

        if (lane.scribe.log) {
          try {
            lane.scribe.log("safety:spiral-warning", spiralPacket);
          } catch {}
        }
      }

      return {
        blocked: true,
        reason,
        mode,
        action: "soft-refusal",
        message:
          "I need to keep this response safe, so I can’t provide it in that form.",
        artery
      };
    }

    const artery = computeArtery(context || {});

    const allowPacket = emitSafetyPacket("allow", {
      mode,
      artery,
      instanceIndex: lane.instanceIndex,
      instanceCount: lane.instanceCount
    });

    if (lane.scribe.log) {
      try {
        lane.scribe.log("safety:allow", allowPacket);
      } catch {}
    }

    return {
      blocked: false,
      reason: null,
      mode,
      action: "allow",
      artery
    };
  };

  // -----------------------------
  // IMMORTAL EXPORT
  // -----------------------------
  return {
    init,
    getSafetyArtery,
    evaluate
  };

})();


export function prewarmSafetyFrame({ trace = false } = {}) {
  const artery = computeSafetyArteryV6({
    total: 0,
    window: 0,
    blocked: 0,
    mode: "standard",
    windowMs: 60000,
    presence: null,
    overmind: null
  });

  const packet = emitSafetyPacket("prewarm", {
    message: "SafetyFrame prewarmed and safety artery v6 aligned.",
    artery
  });

  if (trace) console.log("[SafetyFrame] prewarm", packet);
  return packet;
}
// ============================================================================
//  createSafetyFrameOrgan — IMMORTAL PSEUDO‑CLASS WRAPPER
// ============================================================================
export const createSafetyFrameOrgan = (config = {}) => {
  // Prewarm (unchanged)
  prewarmSafetyFrame({ trace: !!config.tracePrewarm });

  // Initialize the IMMORTAL AiSafetyFrame organ
  AiSafetyFrame.init(config);

  // Return a frozen surface (no class, no instance)
  return Object.freeze({
    meta: SafetyFrameMeta,

    getSafetyMode(ctx) {
      return AiSafetyFrame.getSafetyMode(ctx);
    },

    getSafetyArtery(ctx) {
      return AiSafetyFrame.getSafetyArtery(ctx);
    },

    evaluate(payload) {
      return AiSafetyFrame.evaluate(payload);
    },

    getGlobalSafetyArteries
  });
};


function getText(candidate) {
  if (!candidate) return "";
  if (typeof candidate === "string") return candidate;
  if (typeof candidate.text === "string") return candidate.text;
  return JSON.stringify(candidate);
}

PulseRealm.AISafetyFrame = {
    SafetyFrameMeta,
    AiSafetyFrame,
    createSafetyFrameOrgan,
    prewarmSafetyFrame,
    getGlobalSafetyArteries
}
