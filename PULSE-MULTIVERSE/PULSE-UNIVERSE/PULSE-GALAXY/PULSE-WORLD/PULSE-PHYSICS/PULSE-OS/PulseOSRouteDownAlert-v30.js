
// ============================================================================
// FILE: /Pulse-Coordinator/RouteDownAlert-v30-IMMORTAL++++.js
// PULSE OS — v30.0-IMMORTAL++++
// IMMUNE ALERT ORGAN / ROUTE FAILURE SENTINEL / AUTO-EMAIL
// ============================================================================
//
// LAWS (v30+IMMORTAL+IMMUNE):
//   • This is an immune organ, not a router and not a mesh brain.
//   • It only reacts to route failures and emits metadata + alerts.
//   • No routing, no CNS mutation, no mesh control, no random behavior.
//   • Deterministic artery metrics, bounded, bucketed.
//   • May call the email organ, but never talks to core servers directly.
//   • Presence/advantage-aware only as metadata (no computation of topology).
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { PulseVitalsLogger as logger, PulseVitalsMonitor, pulseLog, PulseUIFlow as initUIFlow, db, setdoc, getdoc, doc, log, warn, error} from "../../../../../_PROOF/PULSE-PROOF.js";
import { PulseSignalPort, __getPulseNetRegistry  } from "../../PULSE-PROTOCOL/PULSE-PROTOCOL.js";
const { PulseWorldEmailAlert } = __getPulseNetRegistry ().getCached("email_alert"); // ⭐ Evolution-safe PulseWorld Email subimport

// ============================================================================
// META KERNEL — v30 IMMORTAL++++
// ============================================================================
export const RouteDownAlertMeta = Object.freeze({
  id: "RouteDownAlertOrgan",
  layer: "IMMUNE",
  role: "ROUTE_FAILURE_SENTINEL",
  version: "30.0-IMMORTAL++++",
  epoch: "v30-IMMORTAL++++",
  evo: Object.freeze({
    immuneOrgan: true,
    osLevel: true,
    deterministic: true,
    driftProof: true,
    zeroRouting: true,
    zeroSecrets: true,
    zeroOrgansMutation: true,

    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,

    presenceAware: true,
    advantageAware: true,
    arteryAware: true,
    packetAware: true
  })
});

// ============================================================================
// IMMUNE ORGAN FACTORY — v30 IMMORTAL++++
// ============================================================================
export function createRouteDownAlertOrgan() {
  const VERSION = RouteDownAlertMeta.version;
  const ORGAN_ID = "RouteDownAlert-v30-IMMORTAL++++";

  // --------------------------------------------------------------------------
  // SAFE HELPERS
  // --------------------------------------------------------------------------
  function safeParse(event) {
    try {
      return JSON.parse(event.body || "{}");
    } catch {
      return {};
    }
  }

  function safeString(v, fallback) {
    return typeof v === "string" && v.trim().length > 0 ? v : fallback;
  }

  function safeContext(raw) {
    if (!raw || typeof raw !== "object") return {};
    return {
      binaryMode: safeString(raw.binaryMode, "unknown"),
      pipelineId: safeString(raw.pipelineId, ""),
      sceneType: safeString(raw.sceneType, ""),
      workloadClass: safeString(raw.workloadClass, ""),
      presenceTag: safeString(raw.presenceTag, "RouteDownAlert"),
      advantageBand: safeString(raw.advantageBand, "neutral")
    };
  }

  function safeBand(v) {
    return safeString(v, "symbolic");
  }

  function safePresenceTag(v) {
    return safeString(v, "RouteDownAlert");
  }

  function clamp01(v) {
    const n = typeof v === "number" ? v : 0;
    if (n <= 0) return 0;
    if (n >= 1) return 1;
    return n;
  }

  // --------------------------------------------------------------------------
  // IMMUNE ARTERY — v30 BUCKETS
  // --------------------------------------------------------------------------
  function bucketLevel(v) {
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

  function computeImmuneArtery({ severity = 0.6, context = {} }) {
    const workload =
      context.workloadClass === "critical" ? 1 :
      context.workloadClass === "high"     ? 0.8 :
      context.workloadClass === "medium"   ? 0.5 :
      context.workloadClass === "low"      ? 0.3 :
      0.4;

    const sev = clamp01(severity);
    const pressure = clamp01(sev * 0.7 + workload * 0.3);
    const throughput = clamp01(1 - pressure);
    const cost = clamp01(pressure * (1 - throughput));
    const budget = clamp01(throughput - cost);

    return Object.freeze({
      severity: sev,
      workloadClass: context.workloadClass,
      throughput,
      throughputBucket: bucketLevel(throughput),
      pressure,
      pressureBucket: bucketPressure(pressure),
      cost,
      costBucket: bucketCost(cost),
      budget,
      budgetBucket: bucketLevel(budget)
    });
  }

  // --------------------------------------------------------------------------
  // AUTO EMAIL — uses PulseWorldEmailAlert DIRECTLY (IMMUNE CHANNEL)
// --------------------------------------------------------------------------
  async function sendEmail(payload, artery) {
    const severityLabel = payload.severity >= 0.8 ? "critical" : "error";

    const emailPayload = {
      title: `ROUTE FAILURE: ${payload.routeId}`,
      message:
        `Route failure detected.\n\n` +
        `Error: ${payload.error}\n` +
        `Route: ${payload.routeId}\n` +
        `Band: ${payload.band}\n` +
        `Presence: ${payload.presenceTag}`,
      routeId: payload.routeId,
      error: payload.error,
      band: payload.band,
      presenceTag: payload.presenceTag,
      context: payload.context,
      artery,
      organ: ORGAN_ID,
      version: VERSION,
      epoch: RouteDownAlertMeta.epoch
    };

    try {
      if (severityLabel === "critical") {
        await PulseWorldEmailAlert.sendCriticalAlert(emailPayload);
      } else {
        await PulseWorldEmailAlert.sendErrorAlert(emailPayload);
      }
    } catch (err) {
      error("🟥 EMAIL SEND FAILURE (RouteDownAlert-v30):", err);
    }
  }

  // --------------------------------------------------------------------------
  // HANDLER — v30 IMMORTAL++++
// --------------------------------------------------------------------------
  const handler = async (event) => {
    try {
      const raw = safeParse(event);

      const context = safeContext(raw.context);

      const payload = {
        error: safeString(raw.error, "Unknown error"),
        type: safeString(raw.type, "Unknown route"),
        routeId: safeString(raw.routeId, "unknown"),
        context,
        band: safeBand(raw.__band),
        presenceTag: safePresenceTag(raw.__presence || context.presenceTag),
        severity:
          typeof raw.severity === "number"
            ? clamp01(raw.severity)
            : 0.6
      };

      const artery = computeImmuneArtery({
        severity: payload.severity,
        context
      });

      log("🧬 IMMUNE ALERT (v30-IMMORTAL++++ ) — ROUTE FAILURE", {
        meta: RouteDownAlertMeta,
        organId: ORGAN_ID,
        version: VERSION,
        ...payload,
        artery
      });

      await sendEmail(payload, artery);

      return {
        statusCode: 200,
        body: JSON.stringify({
          ok: true,
          message: "RouteDownAlert received",
          ...payload,
          artery,
          organ: ORGAN_ID,
          version: VERSION,
          epoch: RouteDownAlertMeta.epoch
        })
      };
    } catch (err) {
      error("🟥 IMMUNE ALERT NODE ERROR (v30-IMMORTAL++++):", err);

      return {
        statusCode: 500,
        body: JSON.stringify({
          ok: false,
          message: "RouteDownAlert internal error",
          organ: ORGAN_ID,
          version: VERSION,
          epoch: RouteDownAlertMeta.epoch
        })
      };
    }
  };

  return Object.freeze({
    meta: { organId: ORGAN_ID, version: VERSION, kernel: RouteDownAlertMeta },
    handler
  });
}

// ============================================================================
// SINGLETON HANDLER EXPORT
// ============================================================================
const _organSingleton = createRouteDownAlertOrgan();
export const handler = _organSingleton.handler;

export default {
  createRouteDownAlertOrgan,
  handler
};
