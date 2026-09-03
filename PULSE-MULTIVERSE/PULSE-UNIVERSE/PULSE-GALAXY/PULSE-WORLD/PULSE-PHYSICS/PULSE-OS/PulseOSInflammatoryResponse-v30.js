// ============================================================================
//  PULSE OS HEALER — v30-IMMORTAL-Evo-BINARY-MAX++++
//  INFLAMMATORY RESPONSE ORGAN — PURE IMMUNE TRANSFORMER (v30++++)
//  • Zero compute, zero network, zero timers, zero DB
//  • Deterministic immune surface only (builders → artifacts)
//  • Symbolic-primary, binary-aware, dual-band-tagged
//  • Advantage-aware (device/network/GPU tiers as metadata only)
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
// CONTEXT — v30++++ (keeps V24 name for compatibility)
// ============================================================================
const HEALER_CONTEXT_V24 = Object.freeze({
  epoch: "v30-IMMORTAL-Evo-BINARY-MAX++++",
  deterministic: true,
  driftAware: true,
  dualBandAware: true,
  binaryAware: true,
  symbolicPrimary: true,
  advantageAware: true
});

// ============================================================================
// HELPERS — PURE BUILDERS (ZERO TIME, ZERO DB, ZERO SIDE EFFECTS)
// ============================================================================

function buildHealerLog(base, extra = {}) {
  return {
    ...HEALER_CONTEXT_V24,
    kind: "OSHealerLog",
    ...base,
    ...extra
    // Worker attaches timestamps / ids
  };
}

function buildDriftSignature(subsystem, base, extra = {}) {
  return {
    ...HEALER_CONTEXT_V24,
    kind: "DriftSignature",
    subsystem,
    type: base.type || "unknown",
    severity: base.severity || "info",
    details: base.details || null,
    ...extra
    // Worker attaches timestamps / ids
  };
}

function buildFunctionLogHint(base, extra = {}) {
  return {
    ...HEALER_CONTEXT_V24,
    kind: "FunctionLogHint",
    processed: false,
    subsystem: base.subsystem || "unknown",
    severity: base.severity || "info",
    hintCode: base.hintCode || "UNSPECIFIED_HINT",
    ...base,
    ...extra
    // Worker attaches timestamps / ids
  };
}

// ============================================================================
// PUBLIC ORGAN FACTORY — PURE, IMPORT-FREE, ZERO-COMPUTE (v30++++)
// ============================================================================
export function createPulseOSHealerV30({ modeKind = "dual", bandFamily = "PulseBand" } = {}) {
  const identity = {
    ...HEALER_CONTEXT_V24,
    modeKind,
    bandFamily,
    version: "v30-IMMORTAL++++",
    layer: "os_healer",
    advantageAware: true
  };

  // 1) OSEvents → Healer Logs (observation only)
  function transformOSEventToHealerLog(osEventDoc) {
    if (!osEventDoc) return null;

    const { id, data } = osEventDoc;
    const ev = data || {};

    if (ev.type !== "function_log_ingested") return null;

    return buildHealerLog(
      {
        source: "OSEvents",
        eventId: id,
        type: "function_log_seen"
      },
      {
        subsystem: ev.subsystem ?? null,
        fileName: ev.fileName ?? null,
        functionName: ev.functionName ?? null,
        note: ev.note ?? null
      }
    );
  }

  // 2) SubsystemHealerLogs → HealerLog + DriftSignature + FunctionLogHint
  function transformSubsystemLog(subsystemDoc) {
    if (!subsystemDoc) return null;

    const { id, data } = subsystemDoc;
    const logEntry = data || {};
    const subsystem = logEntry.subsystem || "unknown";
    const type = logEntry.type || "unknown";

    const artifacts = {
      healerLog: null,
      driftSignature: null,
      functionLogHint: null
    };

    const driftMeta = {
      version: identity.version,
      layer: identity.layer
      // Worker attaches timestamp
    };

    // PulseBand — latency_bar_mismatch
    if (subsystem === "PulseBand" && type === "latency_bar_mismatch") {
      artifacts.healerLog = buildHealerLog(
        {
          source: "PulseBand",
          eventId: id,
          type: "latency_bar_mismatch_seen"
        },
        {
          latency: logEntry.latency,
          bars: logEntry.bars
        }
      );

      artifacts.driftSignature = buildDriftSignature(
        "PulseBand",
        {
          type: "latency_bar_mismatch",
          severity: "warning",
          details: { latency: logEntry.latency, bars: logEntry.bars }
        },
        driftMeta
      );

      artifacts.functionLogHint = buildFunctionLogHint({
        hintCode: "PB_LATENCY_BAR_MISMATCH",
        subsystem: "PulseBand",
        fileName: "PulseBand.js",
        functionName: "setStatus",
        fieldName: "latencyClass",
        note: "Latency and bar count mismatch; review thresholds."
      });

      return artifacts;
    }

    // PulseNet — unstable_signal_slope
    if (subsystem === "PulseNet" && type === "unstable_signal_slope") {
      artifacts.healerLog = buildHealerLog(
        {
          source: "PulseNet",
          eventId: id,
          type: "unstable_signal_slope_seen"
        },
        {
          slope: logEntry.slope,
          score: logEntry.score
        }
      );

      artifacts.driftSignature = buildDriftSignature(
        "PulseNet",
        {
          type: "unstable_signal_slope",
          severity: "warning",
          details: { slope: logEntry.slope, score: logEntry.score }
        },
        driftMeta
      );

      artifacts.functionLogHint = buildFunctionLogHint({
        hintCode: "PN_UNSTABLE_SIGNAL_SLOPE",
        subsystem: "PulseNet",
        fileName: "PulseNet.js",
        functionName: "updateSignalFromPulseBand",
        fieldName: "signalSlope",
        note: "Unstable signal slope; consider smoothing PulseRealm."
      });

      return artifacts;
    }

    // PulseClient — fallback_spike
    if (subsystem === "PulseClient" && type === "fallback_spike") {
      artifacts.healerLog = buildHealerLog(
        {
          source: "PulseClient",
          eventId: id,
          type: "fallback_spike_seen"
        },
        {
          count: logEntry.count
        }
      );

      artifacts.driftSignature = buildDriftSignature(
        "PulseClient",
        {
          type: "fallback_spike",
          severity: "warning",
          details: { count: logEntry.count }
        },
        driftMeta
      );

      artifacts.functionLogHint = buildFunctionLogHint({
        hintCode: "PC_FALLBACK_SPIKE",
        subsystem: "PulseClient",
        fileName: "PulseClient.js",
        functionName: "pulseFetch",
        fieldName: "route",
        note: "Frequent fallback to phone route; review proxy timeouts."
      });

      return artifacts;
    }

    // Proxy — instance_out_of_bounds
    if (subsystem === "Proxy" && type === "instance_out_of_bounds") {
      artifacts.healerLog = buildHealerLog(
        {
          source: "Proxy",
          eventId: id,
          type: "instance_out_of_bounds_seen"
        },
        {
          userId: logEntry.userId,
          instances: logEntry.instances
        }
      );

      artifacts.driftSignature = buildDriftSignature(
        "Proxy",
        {
          type: "instance_out_of_bounds",
          severity: "critical",
          details: { userId: logEntry.userId, instances: logEntry.instances }
        },
        driftMeta
      );

      artifacts.functionLogHint = buildFunctionLogHint({
        hintCode: "PX_INSTANCE_OUT_OF_BOUNDS",
        subsystem: "Proxy",
        fileName: "PulseUserScoring.js",
        functionName: "allocateInstances",
        fieldName: "instances",
        note: "Instance count outside sane bounds; review allocation formula."
      });

      return artifacts;
    }

    // Unknown subsystem/type → no artifacts (but still deterministic)
    return artifacts;
  }

  return {
    meta: identity,
    transformOSEventToHealerLog,
    transformSubsystemLog
  };
}

// Backwards-compatible aliases
export const HEALER_CONTEXT_V12_3 = HEALER_CONTEXT_V24;
export function createPulseOSHealerV24(opts) {
  return createPulseOSHealerV30(opts);
}

PulseRealm.OSInflammatoryResponse = {
  createPulseOSHealerV24,
  createPulseOSHealerV30,
  HEALER_CONTEXT_V12_3,
  HEALER_CONTEXT_V24
}