// ============================================================================
// FILE: PULSE-UNIVERSE/PULSE-MULTIVERSE/PULSEWORLD/X-PULSE-X/PulseWorldSystemAlert-v30.js
// ORGAN: PulseWorldSystemAlert-v30 (System Failure Alert Organ)
// LAYER: PULSE-WORLD / SYSTEM-MONITORING / IMMORTAL-V30
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝ ╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
//
// ============================================================================
// IMMORTAL ORGAN META — v30
// ============================================================================
//
// EXPORT_META = {
//   organ: "PulseWorld.SystemAlert",
//   layer: "pulse_world",
//   stability: "IMMORTAL",
//   deterministic: "per-alert",
//
//   consumes: [
//     "SystemFailureReport",
//     "SuspiciousClientReport"
//   ],
//
//   produces: [
//     "SystemAlertEnvelope",
//     "ForensicEvent"
//   ],
//
//   sideEffects: "log_only",
//   network: "none",
//   filesystem: "none"
// }
//
// ============================================================================

import { PulseVitalsLogger as logger, PulseVitalsMonitor, pulseLog, PulseUIFlow as initUIFlow, db, setdoc, getdoc, doc, log, warn, error} from "../../../../../_PROOF/PULSE-PROOF.js";
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




export function onRequest(config, handler) {
  return async function(request) {
    const req = {
      method: request.method || "GET",
      query: request.query || {},
      body: request.body || {}
    };

    const res = {
      status(code) {
        this._status = code;
        return this;
      },
      json(obj) {
        return { status: this._status || 200, body: obj };
      }
    };

    return handler(req, res);
  };
}


// ============================================================================
// LAYER CONSTANTS + DIAGNOSTICS
// ============================================================================

const LAYER_ID = "IMMUNE-LAYER";
const LAYER_NAME = "IMMUNE SENTINEL";
const LAYER_ROLE = "FORENSIC ANTIGEN CAPTURE";

const REPORTER_DIAGNOSTICS_ENABLED =
  process.env.PULSE_REPORTER_DIAGNOSTICS === "true" ||
  process.env.PULSE_DIAGNOSTICS === "true";

function logReporter(stage, details = {}) {
  if (!REPORTER_DIAGNOSTICS_ENABLED) return;

  log(
    JSON.stringify({
      pulseLayer: LAYER_ID,
      pulseName: LAYER_NAME,
      pulseRole: LAYER_ROLE,
      stage,
      ...details
    })
  );
}

// ============================================================================
// PURE HELPERS — IMMORTAL, DETERMINISTIC
// ============================================================================

function safeJsonParse(body) {
  try {
    return JSON.parse(body || "{}");
  } catch {
    return { parseError: true };
  }
}

function redactPayload(payload) {
  if (!payload || typeof payload !== "object") return {};

  const clone = { ...payload };

  const sensitive = [
    "jwt",
    "token",
    "auth",
    "secret",
    "headers",
    "stack",
    "password",
    "apiKey",
    "stripeSecret",
    "twilioAuthToken",
    "firebaseCustomToken"
  ];

  for (const key of sensitive) {
    if (clone[key] !== undefined) {
      clone[key] = "[REDACTED]";
    }
  }

  return clone;
}

function classifySeverity(safePayload) {
  const level = (safePayload.level || safePayload.severity || "").toLowerCase();
  const reason = String(safePayload.reason || safePayload.message || "");

  if (level === "critical") return "critical";
  if (level === "error") return "error";
  if (level === "warn" || level === "warning") return "warn";

  if (
    reason.includes("OUT_OF_SYNC") ||
    reason.includes("DB_WRITE_FAILED") ||
    reason.includes("PAYMENT_FAILED") ||
    reason.includes("SECURITY") ||
    reason.includes("COMPROMISED")
  ) {
    return "critical";
  }

  if (
    reason.includes("TIMEOUT") ||
    reason.includes("RETRY_LIMIT") ||
    reason.includes("NETWORK_ERROR")
  ) {
    return "error";
  }

  return "info";
}

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function buildSystemAlertEnvelope(safePayload) {
  const source = safePayload.source || "unknown";
  const reason = safePayload.reason || safePayload.message || "unspecified";
  const severity = classifySeverity(safePayload);
  const ts = new Date().toISOString();

  const envelope = {
    schemaVersion: "v30",
    layer: "pulse_world",
    organ: "PulseWorld.SystemAlert",
    role: "SystemFailureAlert",
    createdAt: ts,
    source,
    reason,
    severity,
    worldContext: {
      layerId: LAYER_ID,
      layerName: LAYER_NAME,
      layerRole: LAYER_ROLE
    },
    routingHints: {
      dbLog: true,
      smsAlert: severity === "critical",
      emailAlert: severity === "error" || severity === "critical",
      slackAlert: severity !== "info"
    },
    payload: safePayload
  };

  const classicString =
    `SYSALERT::${source}` +
    `::SEV:${severity}` +
    `::REASON:${reason}` +
    `::TS:${ts}`;

  const signatures = {
    intel: computeHashIntelligence(envelope),
    classic: computeHash(classicString)
  };

  return {
    envelopeId: signatures.intel,
    envelope,
    signatures
  };
}

// ============================================================================
// MAIN HANDLER — System Failure Intake (Netlify-style)
// ============================================================================
//
// Receives failure alerts from ANY PulseWorld subsystem:
//   • EarnEngine
//   • PulseWorldBank (Stripe)
//   • Vault / Loyalty
//   • SMS / Email organs
//   • Future subsystems
//
// Must remain:
//   • deterministic
//   • safe
//   • non‑throwing
//   • JSON‑returning
//
// ============================================================================

export async function handler(event, context) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: "Method Not Allowed"
      };
    }

    const rawPayload = safeJsonParse(event.body || "{}");
    const safePayload = redactPayload(rawPayload);

    const { envelopeId, envelope } = buildSystemAlertEnvelope(safePayload);

    error("⚠️ SYSTEM FAILURE DETECTED (v30):", {
      envelopeId,
      severity: envelope.severity,
      source: envelope.source,
      reason: envelope.reason
    });

    // Advisory only — no side effects beyond logging
    // Future: a healer/orchestrator organ can subscribe to SystemAlerts collection
    // and fan out to SMS/Email/Slack using routingHints.

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        received: true,
        envelopeId,
        severity: envelope.severity
      })
    };
  } catch (err) {
    error("SystemAlert-v30 handler error:", err.message || "unknown");

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: "Internal Server Error"
      })
    };
  }
}

// ============================================================================
// BACKEND ENTRY POINT — “IMMUNE SENTINEL CAPTURE” (Firebase HTTPS)
// ============================================================================
//
// Secondary entry point for suspicious client reports (reportDanger).
// Writes forensic events into CHANGES + IdentityHistory.
//
// ============================================================================

export const reportSuspiciousClient = onRequest(
  { cors: true, maxInstances: 10 },
  async (req, res) => {
    logReporter("INTAKE_START", {
      hasBody: !!req.body,
      ipHeader: req.headers["x-forwarded-for"]
    });

    try {
      const {
        reason,
        identitySnapshot,
        tokenSnapshot,
        userAgent,
        ts,
        language,
        platform,
        deviceMemory,
        hardwareConcurrency,
        screenWidth,
        screenHeight,
        referrer,
        url
      } = req.body || {};

      if (!reason) {
        logReporter("MISSING_REASON", {});
        return res.status(400).json({
          success: false,
          error: "Missing reason"
        });
      }

      const ip =
        req.headers["x-forwarded-for"].split(",")[0].trim() ||
        req.ip ||
        "unknown";

      const uid =
        identitySnapshot && identitySnapshot.uid
          ? identitySnapshot.uid
          : null;

      const forensicPayload = {
        reason,
        uid,
        identitySnapshot: identitySnapshot || null,
        tokenSnapshot: tokenSnapshot || null,
        userAgent: userAgent || null,
        clientTimestamp: ts || null,
        serverTimestamp: PulseRealm.PulseNOW,
        language: language || null,
        platform: platform || null,
        deviceMemory: deviceMemory || null,
        hardwareConcurrency: hardwareConcurrency || null,
        screenWidth: screenWidth || null,
        screenHeight: screenHeight || null,
        referrer: referrer || null,
        url: url || null,
        ip,
        source: "reportDanger",
        actor: "client"
      };

      const { envelopeId, envelope } = buildSystemAlertEnvelope({
        source: "reportSuspiciousClient",
        reason,
        uid,
        ip,
        userAgent,
        url,
        language,
        platform
      });

      logReporter("FORENSIC_PAYLOAD_BUILT", {
        uid,
        reason,
        envelopeId,
        hasIdentitySnapshot: !!identitySnapshot,
        hasTokenSnapshot: !!tokenSnapshot
      });

      await db.collection("CHANGES").add({
        type: "suspiciousClient",
        envelopeId,
        envelope,
        forensicPayload
      });

      logReporter("GLOBAL_LOG_WRITTEN", { uid, envelopeId });

      if (uid) {
        await db
          .collection("IdentityHistory")
          .doc(uid)
          .collection("danger")
          .add({
            envelopeId,
            envelope,
            forensicPayload
          });

        logReporter("USER_LOG_WRITTEN", { uid, envelopeId });
      }

      logReporter("INTAKE_COMPLETE", { uid, envelopeId });

      return res.json({ success: true, envelopeId });

    } catch (err) {
      error("reportSuspiciousClient-v30 error", err);

      logReporter("FATAL_ERROR", {
        message: err.message || "Unknown error"
      });

      return res.status(500).json({
        success: false,
        error: "Internal error"
      });
    }
  }
);
