// ============================================================================
// FILE: /PulseOS/Organs/Memory/PulseOSShortTermMemory.js
// PULSE OS — v12.3-Presence
// “THE SHORT‑TERM MEMORY / HIPPOCAMPAL BUFFER”
// DUAL‑BAND NEURAL MEMORY • PREWARM + CHUNK • MULTI‑PRESENCE SNAPSHOTS
// OFFLINE‑ABSOLUTE • ZERO MUTATION AFTER INSERTION
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


import { corsHandler, fetch } from "../X-PULSE-X/3RDPARTY/PULSE-WORLD-TRANSPORT.js";
import {db } from "../X-PULSE-X/3RDPARTY/PulseWorldFirebaseGenome-v30.js";
import { getStripe as Stripe, PulseWorldBank_v31, handleStripeWebhook } from "../X-PULSE-X/3RDPARTY/PULSE-WORLD-BANK.js";
import { createEmailTransport } from "../X-PULSE-X/3RDPARTY/PulseWorldEmailAlert-v20.js";
import { getTwilioClient as twilio } from "../X-PULSE-X/3RDPARTY/PulseWorldSMSAlert-v30.js";

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

// ---------------------------------------------------------------------------
// LAYER CONSTANTS — NOW FULLY USED
// ---------------------------------------------------------------------------
const LAYER_ID   = "SHORT-TERM-MEMORY";
const LAYER_NAME = "THE HIPPOCAMPAL BUFFER";
const LAYER_ROLE = "B-LAYER NEURAL MEMORY";
const LAYER_VER  = "12.3-Presence";

// ============================================================================
// MEMORY CONTEXT — organism-wide identity (v12.3-Presence → upgraded v15)
// ============================================================================
const MEMORY_CONTEXT = {
  label: "MEMORY",
  layer: "B‑Layer",
  layerId: LAYER_ID,
  layerName: LAYER_NAME,
  layerRole: LAYER_ROLE,
  purpose: "Short‑Term Neural Buffer",
  context: "Stores logs before Heart.js flush",
  version: LAYER_VER,
  generation: "v12",
  target: "os-core",

  evo: {
    driftProof: true,
    deterministicNeuron: true,
    unifiedAdvantageField: true,
    multiInstanceReady: true,
    multiPresenceReady: true,

    zeroNetwork: true,
    zeroMutation: true,
    zeroTiming: true,
    offlineAbsolute: true,

    binaryAware: true,
    symbolicAware: true,
    dualModeAware: true,

    executionContextAware: true,
    pressureAware: true,
    dispatchAware: true,

    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,
    presenceAware: true,
    dualBandChunking: true,
    streamingFriendly: true,
    batchFriendly: true,
    gpuBufferAware: true
  }
};

// ============================================================================
// ORGAN META — v15 IMMORTAL
// ============================================================================
export const PulseOSShortTermMemoryMeta = Object.freeze({
  layer: "PulseOSShortTermMemory",
  layerId: LAYER_ID,
  layerName: LAYER_NAME,
  layerRole: LAYER_ROLE,
  version: "v12.3-Presence-CHUNK-MAX",
  identity: `PulseOSShortTermMemory-${LAYER_VER}-Immortal`,

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    multiInstanceReady: true,
    multiPresenceReady: true,

    shortTermNeuralBuffer: true,
    hippocampalBuffer: true,
    neuralMemoryOrgan: true,
    offlineAbsolute: true,
    zeroMutationAfterInsertion: true,
    immutableEntries: true,
    preHeartFlushBuffer: true,

    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,
    presenceAware: true,
    dualBandChunking: true,
    streamingFriendly: true,
    batchFriendly: true,
    gpuBufferAware: true,

    zeroNetwork: true,
    zeroBackend: true,
    zeroTiming: true,
    zeroStateMutation: true,
    zeroExternalMutation: true,
    zeroCompute: true,
    zeroUserCode: true,
    zeroDynamicImports: true,
    zeroEval: true,

    symbolicAware: true,
    binaryAware: true,
    dualModeAware: true,
    executionContextAware: true,
    pressureAware: true,
    dispatchAware: true,

    worldLensAware: false
  }),

  contract: Object.freeze({
    input: [
      "LogEntry",
      "ImpulseContext",
      "DualBandContext",
      "ExecutionContext"
    ],
    output: [
      "ShortTermMemorySnapshot",
      "ShortTermMemoryChunks",
      "ShortTermPresenceView",
      "ShortTermMemoryDiagnostics",
      "ShortTermMemorySignatures",
      "ShortTermMemoryHealingState"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseOS-v11-Evo",
    parent: "PulseOS-v12.3-Presence",
    ancestry: [
      "PulseOSShortTermMemory-v9",
      "PulseOSShortTermMemory-v10",
      "PulseOSShortTermMemory-v11",
      "PulseOSShortTermMemory-v11-Evo",
      "PulseOSShortTermMemory-v11-Evo-Prime",
      "PulseOSShortTermMemory-v12.3-Presence"
    ]
  }),

  bands: Object.freeze({
    supported: ["symbolic", "binary"],
    default: "symbolic",
    behavior: "short-term-memory"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "log entry → immutable insertion → pre-heart snapshot",
    adaptive: "binary-tagged metadata surfaces + chunked presence views",
    return: "deterministic short-term memory snapshot + chunks + signatures"
  })
});

// ============================================================================
// HELPERS — deterministic structural signature
// ============================================================================
function stableStringify(value) {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return "[" + value.map(stableStringify).join(",") + "]";
  }
  const keys = Object.keys(value).sort();
  const parts = keys.map(k => JSON.stringify(k) + ":" + stableStringify(value[k]));
  return "{" + parts.join(",") + "}";
}

function buildMemorySignature(entry) {
  return stableStringify({
    eventType: entry.eventType || "unknown",
    modeKind: entry.modeKind || "symbolic",
    executionContext: entry.executionContext || {},
    pressureSnapshot: entry.pressureSnapshot || {},
    layerId: LAYER_ID,
    layerRole: LAYER_ROLE,
    layerName: LAYER_NAME,
    layerVersion: LAYER_VER
  });
}

// ============================================================================
// STRUCTURAL DEDUPE — drift-proof
// ============================================================================
function isStructurallySame(a, b) {
  if (!a || !b) return false;
  return a.memorySignature === b.memorySignature;
}

// ============================================================================
// CHUNK + PRESENCE HELPERS — zero-mutation, offline-absolute
// ============================================================================
function buildChunk(entries, index, totalChunks) {
  return {
    ...MEMORY_CONTEXT,
    kind: "ShortTermMemoryChunk",
    layerId: LAYER_ID,
    layerName: LAYER_NAME,
    layerRole: LAYER_ROLE,
    chunkIndex: index,
    chunkCount: totalChunks,
    count: entries.length,
    logs: entries
  };
}

function buildPresenceView(logs) {
  const count = logs.length;

  const byMode = { symbolic: 0, binary: 0, dual: 0 };
  const byEventType = {};
  const bySubsystem = {};

  for (const entry of logs) {
    const mode = entry.modeKind || "symbolic";
    if (byMode[mode] !== undefined) byMode[mode] += 1;

    const eventType = entry.eventType || "unknown";
    byEventType[eventType] = (byEventType[eventType] || 0) + 1;

    const subsystem = entry.subsystem || "unknown";
    bySubsystem[subsystem] = (bySubsystem[subsystem] || 0) + 1;
  }

  return {
    ...MEMORY_CONTEXT,
    kind: "ShortTermPresenceView",
    layerId: LAYER_ID,
    layerName: LAYER_NAME,
    layerRole: LAYER_ROLE,
    totalLogs: count,
    byMode,
    byEventType,
    bySubsystem
  };
}

// ============================================================================
// SHORT‑TERM MEMORY ORGAN — v15 IMMORTAL
// ============================================================================
export const PulseOSShortTermMemory = {
  _logs: [],
  _maxLogs: 750,

  // --------------------------------------------------------------------------
  // PUSH — immutable insertion, dual-band aware
  // --------------------------------------------------------------------------
  push(entry) {
    if (!entry || typeof entry !== "object") return;

    const memorySignature = buildMemorySignature(entry);

    const wrapped = {
      ...entry,
      ...MEMORY_CONTEXT,
      layerId: LAYER_ID,
      layerName: LAYER_NAME,
      layerRole: LAYER_ROLE,
      memoryVersion: LAYER_VER,
      memorySignature
    };

    const last = this._logs[this._logs.length - 1];

    if (last && isStructurallySame(last, wrapped)) {
      return;
    }

    this._logs.push(wrapped);

    if (this._logs.length > this._maxLogs) {
      this._logs.shift();
    }
  },

  // --------------------------------------------------------------------------
  // GET ALL — immutable read
  // --------------------------------------------------------------------------
  getAll() {
    return [...this._logs];
  },

  // --------------------------------------------------------------------------
  // CLEAR — after flush
  // --------------------------------------------------------------------------
  clear() {
    this._logs = [];
  },

  // --------------------------------------------------------------------------
  // HAS LOGS
  // --------------------------------------------------------------------------
  hasLogs() {
    return this._logs.length > 0;
  },

  // --------------------------------------------------------------------------
  // SNAPSHOT — offline-absolute
  // --------------------------------------------------------------------------
  snapshot() {
    return {
      ...MEMORY_CONTEXT,
      kind: "ShortTermMemorySnapshot",
      layerId: LAYER_ID,
      layerName: LAYER_NAME,
      layerRole: LAYER_ROLE,
      version: LAYER_VER,
      count: this._logs.length,
      logs: [...this._logs]
    };
  },

  // --------------------------------------------------------------------------
  // CHUNKS — GPU / streaming friendly view
  // --------------------------------------------------------------------------
  getChunks({ maxChunkSize = 128 } = {}) {
    const logs = this._logs;
    if (!logs.length) return [];

    const size = Math.max(1, maxChunkSize | 0);
    const totalChunks = Math.ceil(logs.length / size);
    const chunks = [];

    for (let i = 0; i < totalChunks; i++) {
      const start = i * size;
      const end = start + size;
      const slice = logs.slice(start, end);
      chunks.push(buildChunk(slice, i, totalChunks));
    }

    return chunks;
  },

  // --------------------------------------------------------------------------
  // PREWARM SNAPSHOT — cache-ready, chunk-indexed view
  // --------------------------------------------------------------------------
  prewarmSnapshot({ maxChunkSize = 128 } = {}) {
    const chunks = this.getChunks({ maxChunkSize });

    return {
      ...MEMORY_CONTEXT,
      kind: "ShortTermMemoryPrewarm",
      layerId: LAYER_ID,
      layerName: LAYER_NAME,
      layerRole: LAYER_ROLE,
      version: LAYER_VER,
      totalLogs: this._logs.length,
      totalChunks: chunks.length,
      chunks
    };
  },

  // --------------------------------------------------------------------------
  // PRESENCE VIEW — multi-presence, dual-band summary
  // --------------------------------------------------------------------------
  presenceView() {
    return buildPresenceView(this._logs);
  }
};


function currency(amount, displayCurrency = "$") {
  let raw = String(amount || "").replace(/BZ?\$|\$/g, "").trim();
  const num = Number(raw);
  const safe = isNaN(num) ? "0.00" : num.toFixed(2);

  let cur = String(displayCurrency || "$").trim().toUpperCase();
  cur = cur === "USD" || cur === "$" || cur === "US$" ? "$" : "BZ$";

  return `${cur}${safe}`;
}

function formatDisplayAmount(displayCurrency, amount) {
  const safeAmount = Number(amount);
  const finalAmount = isNaN(safeAmount) ? "0.00" : safeAmount.toFixed(2);

  let cur = String(displayCurrency || "$").trim().toUpperCase();
  cur = cur === "USD" || cur === "$" || cur === "US$" ? "$" : "BZ$";

  return currency(finalAmount, cur);
}
// FILE: functions/PULSE-MULTIVERSE/PULSEWORLD/X-PULSE-X/sendDynamicEmail-clean.js
export const sendDynamicEmail = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 60,
    memory: "512MiB"
    // ❌ Removed: secrets: [EMAIL_PASSWORD]
  },
  async (req, res) => {
    try {
      corsHandler(req, res, async () => {
        if (req.method !== "POST" && req.method !== "GET") {
          return res.status(405).json({ success: false, error: "Method not allowed" });
        }

        // ---------------------------------------------------------
        // 1️⃣ PARSE INPUT
        // ---------------------------------------------------------
        const isGet = req.method === "GET";
        const email = String(
          (isGet ? req.query.email : req.body.email) || ""
        ).trim().toLowerCase();

        const emailType = String(
          (isGet ? req.query.emailType : req.body.emailType) || ""
        ).trim();

        const rawPayload =
          (isGet ? req.query.payload : req.body.payload) || {};

        const payload =
          typeof rawPayload === "string"
            ? JSON.parse(rawPayload || "{}")
            : rawPayload || {};

        if (!email || !email.includes("@")) {
          return res.status(400).json({ success: false, error: "Invalid email" });
        }

        if (!emailType) {
          return res.status(400).json({ success: false, error: "Missing emailType" });
        }

        const template = emailTemplates[emailType];
        if (!template) {
          return res.status(400).json({
            success: false,
            error: `Unknown emailType: ${emailType}`
          });
        }

        // ---------------------------------------------------------
        // 2️⃣ LOOKUP USER (OPTIONAL)
        // ---------------------------------------------------------
        let userID = null;
        let username = "Friend";

        const snap = await db
          .collection("Users")
          .where("TPIdentity.email", "==", email)
          .limit(1)
          .get();

        if (!snap.empty) {
          const doc = snap.docs[0];
          const data = doc.data() || {};
          const TPIdentity = data.TPIdentity || {};

          userID = doc.id;
          username =
            TPIdentity.displayName ||
            TPIdentity.name ||
            username;
        }

        // ---------------------------------------------------------
        // 3️⃣ BUILD FINAL PAYLOAD
        // ---------------------------------------------------------
        const finalPayload = {
          ...payload,
          email,
          userID,
          name: username,
          username
        };

        // ---------------------------------------------------------
        // 4️⃣ RENDER SUBJECT + HTML
        // ---------------------------------------------------------
        const subject =
          typeof template.subject === "function"
            ? template.subject(finalPayload)
            : template.subject || `Pulse World`;

        const html = template.html(finalPayload);

        const headers =
          template.headers ||
          (template.important
            ? {
                "X-Priority": "1",
                "X-MSMail-Priority": "High",
                Importance: "high"
              }
            : {});

        // ---------------------------------------------------------
        // 5️⃣ WRITE EMAIL LOG (PENDING)
        // ---------------------------------------------------------
        const now = PulseRealm.PulseNOW;
        const logRef = await db.collection("EmailLogs").add({
          date: now,
          to: email,
          type: emailType,
          payload: finalPayload,
          html,
          subject,
          status: "Pending",
          createdAt: now,
          updatedAt: now
        });

        const logId = logRef.id;

        // ---------------------------------------------------------
        // 6️⃣ SEND EMAIL (NOW USING ENV VAR)
        // ---------------------------------------------------------
        const EMAIL_PASSWORD_VALUE = process.env.EMAIL_PASSWORD;

        if (!EMAIL_PASSWORD_VALUE) {
          console.error("❌ Missing EMAIL_PASSWORD in environment");
          return res.status(500).json({
            success: false,
            error: "Missing EMAIL_PASSWORD environment variable"
          });
        }

        const transporter = createEmailTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "AIOvermind@PulseWorld.Net",
            pass: EMAIL_PASSWORD_VALUE
          }
        });

        const info = await transporter.sendMail({
          from: `"Overmind Prime" <AIOvermind@PulseWorld.Net>`,
          to: email,
          bcc: "FordFamilyDelivery@gmail.com",
          subject,
          html,
          headers
        });

        // ---------------------------------------------------------
        // 7️⃣ UPDATE EMAIL LOG (SENT)
        // ---------------------------------------------------------
        await logRef.update({
          status: "Sent",
          sentAt: PulseRealm.PulseNOW,
          transportMessageId: info.messageId || null
        });

        return res.json({
          success: true,
          logId,
          email,
          emailType
        });
      });
    } catch (err) {
      console.error("❌ [sendDynamicEmail-clean ERROR]", err);

      const safeError = String(
        err.message ||
          err.raw.message ||
          err.raw.error.message ||
          err.response.data.error ||
          err.toString() ||
          "Unknown error"
      )
        .replace(/'/g, "&#39;")
        .replace(/"/g, "&quot;");

      return res.status(500).json({
        success: false,
        error: safeError
      });
    }
  }
);
//=======================================================================================================
//=======================================================================================================
// ----------------------
// EMAIL TEMPLATES
// ----------------------
// Each template receives a payload object and returns HTML.
// You can expand these with your full branded HTML later.

const emailTemplates = {
newUser: {
  subject: () => "Welcome to Pulse World!",
  important: true,
  html: (payload) => {
    const { logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="display:block; opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" 
           style="background-color:#f4f4f4; padding:40px 0;">
      <tr>
        <td align="center" style="background-color:#f4f4f4;">

          <!-- Main Card -->
          <table width="600" border="0" cellspacing="0" cellpadding="0" 
                 style="background:#ffffff; border-radius:14px; overflow:hidden;">

            <!-- BIG HEADER IMAGE -->
            <tr>
              <td>
                <img src="https://www.pulseworld.net/Welcome"
                     alt="Pulse World Header"
                     width="600"
                     style="display:block; width:100%; max-width:600px;">
              </td>
            </tr>

            <!-- Inner Padding -->
            <tr>
              <td style="padding:30px;">

                <!-- Welcome Title -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" 
                        style="font-size:28px; font-weight:bold; color:#222;">
                      Welcome to Pulse World!
                    </td>
                  </tr>

                  <tr>
                    <td align="center" 
                        style="font-size:16px; color:#666; padding-top:8px;">
                      Your account has been successfully created!
                    </td>
                  </tr>

                  <!-- Toucan Image -->
                  <tr>
                    <td align="center" style="padding:25px 0;">
                      <img src="./_EXPRESSIONS/_PEX/BUILD/ToucanLogo-Mini"
                           alt="Pulse World Toucan"
                           width="180"
                           style="display:block; border-radius:12px;">
                    </td>
                  </tr>

                  <!-- Message -->
                  <tr>
                    <td align="center" 
                        style="font-size:18px; color:#555; padding:25px 20px 10px 20px; line-height:24px;">
                      You’re all set! Your Pulse World account is ready to use.  
                      If you plan to accept payments for Pulse World services,  
                      please check your email for important setup instructions.
                    </td>
                  </tr>

                  <!-- Social Media Section -->
                  <tr>
                    <td align="center" style="padding-top:20px;">
                      <div style="font-size:14px; color:#555; margin-bottom:10px;">
                        Enjoy these moments! Share your successes with Pulse World on social media.
                      </div>
                      <a href="https://linktr.ee/tropicpulse" target="_blank">
                        <img src="../_EXPRESSIONS/_PEX/BUILD/SocialMedia"
                             alt="Social Media Icons"
                             width="180"
                             style="display:block; margin:auto;">
                      </a>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

          </table>

          ${trackingPixel}

        </td>
      </tr>
    </table>
  </body>
</html>`;
  }
},

  loyalty: {
  subject: (payload) => "Pulse World: My Pulse Loyalty Enrollment Setup!",
  important: true,
  html: (payload) => {
    const { name, email, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0; width:1px; height:1px;">`
        : "";

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My Pulse Loyalty Enrollment Setup</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f5f7;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #1f2933;
    }
    .wrapper {
      width: 100%;
      background-color: #f3f5f7;
      padding: 24px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
    }
    .header {
      background: linear-gradient(135deg, #00c2a8, #00a0ff);
      padding: 24px 24px 20px;
      text-align: left;
      color: #ffffff;
    }
    .logo-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .logo-circle {
      width: 70px;
      height: 70px;
      border-radius: 999px;
      background: none !important;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
    .brand-text {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0.03em;
    }
    .tagline {
      font-size: 12px;
      opacity: 0.9;
    }
    .header-title {
      margin-top: 18px;
      font-size: 22px;
      font-weight: 700;
    }
    .header-subtitle {
      margin-top: 6px;
      font-size: 14px;
      opacity: 0.95;
    }
    .content {
      padding: 24px 24px 8px;
      font-size: 14px;
      line-height: 1.6;
    }
    .content h2 {
      font-size: 20px;
      margin: 0 0 12px;
      color: #111827;
    }
    .pill {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 999px;
      background-color: #ecfdf5;
      color: #047857;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .highlight-box {
      margin: 16px 0;
      padding: 12px 14px;
      border-radius: 12px;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
    }
    .highlight-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6b7280;
      margin-bottom: 4px;
    }
    .highlight-value {
      font-size: 13px;
      font-weight: 600;
      color: #111827;
    }
    .button-row {
      margin: 22px 0 10px;
      text-align: left;
    }
    .primary-button {
      display: inline-block;
      padding: 10px 18px;
      border-radius: 999px;
      background: linear-gradient(135deg, #00c2a8, #00a0ff);
      color: #ffffff !important;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .secondary-note {
      font-size: 12px;
      color: #6b7280;
      margin-top: 8px;
    }
    .list-title {
      margin-top: 18px;
      font-size: 13px;
      font-weight: 600;
      color: #111827;
    }
    .list {
      margin: 8px 0 0;
      padding-left: 18px;
      font-size: 13px;
      color: #4b5563;
    }
    .footer {
      padding: 14px 24px 20px;
      font-size: 11px;
      color: #9ca3af;
      text-align: left;
      border-top: 1px solid #e5e7eb;
      background-color: #f9fafb;
    }
    .footer strong {
      color: #4b5563;
    }
    .footer-links {
      margin-top: 6px;
    }
    .footer-links span {
      margin-right: 10px;
    }
    @media (max-width: 600px) {
      .container {
        border-radius: 0;
      }
      .header, .content, .footer {
        padding-left: 18px;
        padding-right: 18px;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="logo-row">
          <div style="text-align:center; width:100%;">
            <div style="display:inline-block; text-align:center;">
              <div class="logo-circle" style="margin:0 auto 10px auto;">
                <img 
                  src="../_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo2.png"
                  alt="Pulse World Toucan"
                  width="60"
                  style="display:block; border-radius:50%;">
              </div>
              <div>
                <div class="brand-text">Pulse World</div>
                <div class="tagline">Enjoy these moments.</div>
              </div>
            </div>
          </div>
        </div>

        <div style="text-align:center; width:100%;">
          <div class="header-title" style="display:inline-block; text-align:center;">My Pulse Loyalty Enrollment</div>
          <div class="header-subtitle" style="display:inline-block; text-align:center;">
            Your rewards journey is ready—just complete your enrollment in the app.
          </div>
        </div>
      </div>

      <div class="content">
        <div style="text-align:center; width:100%;">
          <span class="pill">My Pulse Loyalty</span>
          <h2>Your Pulse Loyalty Enrollment</h2>
        </div>

        <p>Hi ${name || "there"},</p>

        <p>
          Your <strong>Pulse Loyalty</strong> setup is ready. Open the
          <strong>Pulse World</strong> app and complete your enrollment in
          <strong>My Pulse Loyalty</strong> to start earning rewards on every eligible order and delivery.
        </p>

        <div class="highlight-box">
          <div class="highlight-label">Account email</div>
          <div class="highlight-value">${email || "N/A"}</div>
        </div>

        <div class="button-row">
          <div class="thebutton" style="text-align:center;">
            <a class="primary-button" href="https://linktr.ee/tropicpulse">
              Open Pulse World App
            </a>
          </div>
          <div class="secondary-note">
            If the button doesn’t work, just open the Pulse World app on your device and look for
            <strong>My Pulse Loyalty</strong> in the menu.
          </div>
        </div>

        <div class="list-title">Once you complete enrollment, you can:</div>
        <ul class="list">
          <li>Earn rewards automatically on eligible orders and deliveries</li>
          <li>View your Pulse Loyalty Member Card in the app</li>
          <li>Track your progress toward future perks and offers</li>
        </ul>

        <p style="margin-top: 18px;">
          If you didn’t request this or believe this email was sent in error, you can safely ignore it—your account
          will remain unchanged.
        </p>

        <p style="margin-top: 18px;">
          Welcome to the island’s most rewarding experience.
        </p>

        <p>
          <strong>Pulse World</strong><br/>
          Enjoy these moments.
        </p>
      </div>

      <div class="footer">
        <div><strong>Pulse World</strong> — San Pedro, Ambergris Caye</div>
        <div class="footer-links">
          <span>App: Pulse World</span>
          <span>Category: My Pulse Loyalty</span>
        </div>
        <div style="margin-top: 6px;">
          You’re receiving this email because a Pulse Loyalty enrollment was started using this address.
        </div>
      </div>
    </div>

    ${trackingPixel}
  </div>
</body>
</html>`;
  }
},

  sendPayout: {
    subject: (payload) => {
  const { orderID, delivererEmail } = payload;
return `Pulse World: Payout for your Delivery: ${orderID}`;
},
    html: (payload) => {
    const {payoutAmount, stripeAccountID, orderID, delivererEmail, pendingBalance, availableBalance,  displayCurrency, transferCurrency, displayAmount, logId } = payload;
    let formatted = displayAmount || payoutAmount;
    
    const payoutAmountFormatted = formatDisplayAmount(displayCurrency,formatted);
    const formattedavailable = formatDisplayAmount(displayCurrency,availableBalance);
    const formattedpending = formatDisplayAmount(displayCurrency,pendingBalance);
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0; width:1px; height:1px;">`
        : "";
return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Your Payout Has Been Sent</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f5f7;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #1f2933;
    }
    .wrapper {
      width: 100%;
      background-color: #f3f5f7;
      padding: 24px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
    }
    .header {
      background: linear-gradient(135deg, #00c2a8, #00a0ff);
      padding: 24px 24px 20px;
      text-align: center;
      color: #ffffff;
    }
    .brand-text {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0.03em;
    }
    .tagline {
      font-size: 12px;
      opacity: 0.9;
    }
    .header-title {
      margin-top: 18px;
      font-size: 22px;
      font-weight: 700;
    }
    .header-subtitle {
      margin-top: 6px;
      font-size: 14px;
      opacity: 0.95;
    }
    .content {
      padding: 24px 24px 8px;
      font-size: 14px;
      line-height: 1.6;
    }
    .highlight-box {
      margin: 16px 0;
      padding: 12px 14px;
      border-radius: 12px;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
    }
    .highlight-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6b7280;
      margin-bottom: 4px;
    }
    .highlight-value {
      font-size: 13px;
      font-weight: 600;
      color: #111827;
    }
    .footer {
      padding: 14px 24px 20px;
      font-size: 11px;
      color: #9ca3af;
      text-align: left;
      border-top: 1px solid #e5e7eb;
      background-color: #f9fafb;
    }
    .footer strong {
      color: #4b5563;
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="container">

      <!-- HEADER -->
      <div class="header">

        <!-- Logo -->
        <img 
          src="../_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo2.png"
          alt="Pulse World Logo"
          width="70"
          height="70"
          style="display:block; margin:0 auto 14px auto; border-radius:50%; object-fit:cover;"
        >

        <div class="brand-text">Pulse World</div>
        <div class="tagline">Enjoy these moments.</div>

        <div class="header-title">Your Payout Has Been Sent!</div>
        <div class="header-subtitle">
          Your earnings have been transferred to your Stripe balance.
        </div>
      </div>

      <!-- CONTENT -->
      <div class="content">

        <!-- DETAILS -->
        <div class="highlight-box">
          <div class="highlight-label">Order ID</div>
          <div class="highlight-value">${orderID}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Deliverer Email</div>
          <div class="highlight-value">${delivererEmail}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Payout Amount</div>
          <div class="highlight-value" style="font-size:20px; font-weight:700;">
            ${payoutAmountFormatted}
          </div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Current Wallet Balance</div>
          <div class="highlight-value">${formattedavailable}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Pending Payments to Bank</div>
          <div class="highlight-value" style="color:green;">
            ${formattedpending}
          </div>
        </div>

        <p style="margin-top: 18px;">
          Your payout has been successfully deposited into your Stripe balance.  
          Funds will become available based on your Stripe payout schedule.
        </p>

        <p>
          <strong>Pulse World</strong><br/>
          Enjoy these moments.
        </p>
      </div>

      <!-- FOOTER -->
      <div class="footer">
        <div><strong>Pulse World</strong> — San Pedro, Ambergris Caye</div>
        <div style="margin-top: 6px;">
          You’re receiving this email because a payout was processed for your delivery.
        </div>
      </div>

    </div>

    ${trackingPixel}

  </div>
</body>
</html>`;
}
},

  stripeOnboarding: {
  subject: (payload) => "Pulse World: Getting Paid Soon?!",
  important: true,
  html: (payload) => {
    const { email, getPaidLink, reSendLink, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src=https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0; display:block;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" 
           style="background-color:#f4f4f4; padding:40px 0;">
      <tr>
        <td align="center">

          <!-- Main Card -->
          <table width="600" border="0" cellspacing="0" cellpadding="0" 
                 style="background:#ffffff; border-radius:14px; overflow:hidden;">

            <!-- Inner Padding -->
            <tr>
              <td style="padding:30px;">

                <!-- Header Text -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" 
                        style="font-size:28px; font-weight:bold; color:#222;">
                      Stripe + Pulse World
                    </td>
                  </tr>

                  <tr>
                    <td align="center" 
                        style="font-size:18px; color:#666; padding-top:8px;">
                      Automated, Instant Payments for Vendors/Deliverers!
                    </td>
                  </tr>

                  <!-- Toucan Image -->
                  <tr>
                    <td align="center" style="padding:25px 0;">
                      <img src="./_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo2.png"
                           alt="Pulse World Toucan"
                           width="220"
                           style="display:block; border-radius:12px;">
                    </td>
                  </tr>

                  <!-- Message -->
                  <tr>
                    <td align="center" 
                        style="font-size:16px; color:#444; padding:0 20px 20px 20px; line-height:24px;">
                      To start receiving automated payouts through Pulse World, please complete your
                      Stripe payment setup. This ensures we know exactly where to send your earnings.
                    </td>
                  </tr>

                  <!-- Get Paid Button -->
                  <tr>
                    <td align="center" style="padding-bottom:20px;">
                      <a href="${getPaidLink}"
                         style="background-color:#00a86b;
                                color:#ffffff;
                                padding:14px 32px;
                                text-decoration:none;
                                font-size:18px;
                                font-weight:bold;
                                border-radius:8px;
                                display:inline-block;">
                        Get Paid
                      </a>
                    </td>
                  </tr>

                  <!-- Expiration Note -->
                  <tr>
                    <td align="center" 
                        style="font-size:14px; color:#e63946; padding:0 20px 20px 20px; line-height:20px;">
                      Your Stripe payment link expires in 24 hours.  
                      If it expires or you need a new one, click below to resend your setup link.
                    </td>
                  </tr>

                  <!-- Resend Link Button -->
                  <tr>
                    <td align="center" style="padding-bottom:30px;">
                      <a href="${reSendLink}"
                         style="background-color:#007bff;
                                color:#ffffff;
                                padding:12px 28px;
                                text-decoration:none;
                                font-size:16px;
                                font-weight:bold;
                                border-radius:8px;
                                display:inline-block;">
                        Resend Stripe Link
                      </a>
                    </td>
                  </tr>

                  <!-- Footer Note -->
                  <tr>
                    <td align="center" 
                        style="font-size:12px; color:#777; line-height:18px; padding:0 20px;">
                      To receive payments through Pulse World, you must complete your Stripe setup 
                      before accepting or delivering any orders.
                    </td>
                  </tr>

                  <!-- Social Media Section -->
                  <tr>
                    <td align="center" style="padding-top:30px;">
                      <div style="font-size:14px; color:#555; margin-bottom:10px;">
                        Enjoy these moments! Share your successes with Pulse World on social media.
                      </div>
                      <a href="https://linktr.ee/tropicpulse" target="_blank">
                        <img src="./_EXPRESSIONS/_PEX/BUILD/SocialMedia"
                             alt="Social Media Icons"
                             width="180"
                             style="display:block; margin:auto;">
                      </a>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

          </table>
          <!-- End Main Card -->

        </td>
      </tr>
    </table>

    ${trackingPixel}

  </body>
</html>`;
  }
},

  resendStripeLink: {
  subject: (payload) => "Pulse World: Stripe Payments Link Resent!",
  important: true,
  html: (payload) => {
    const { email, getPaidLink, reSendLink, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src=https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0; display:block;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" 
           style="background-color:#f4f4f4; padding:40px 0;">
      <tr>
        <td align="center">

          <!-- Main Card -->
          <table width="600" border="0" cellspacing="0" cellpadding="0" 
                 style="background:#ffffff; border-radius:14px; padding:30px;">

            <!-- Header -->
            <tr>
              <td align="center" 
                  style="font-size:28px; font-weight:bold; color:#222;">
                Pulse World
              </td>
            </tr>

            <tr>
              <td align="center" 
                  style="font-size:18px; color:#666; padding-top:8px;">
                Your Stripe Payments Link Has Been Resent!
              </td>
            </tr>

            <!-- Toucan Image -->
            <tr>
              <td align="center" style="padding:25px 0;">
                <img src="./_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo2.png"
                     alt="Pulse World Toucan"
                     width="220"
                     style="display:block; border-radius:12px;">
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td align="center" 
                  style="font-size:16px; color:#444; padding:0 20px 20px 20px; line-height:24px;">
                We’ve generated a fresh Stripe onboarding link so you can complete your 
                payment setup and start receiving payouts through Pulse World.
              </td>
            </tr>

            <!-- Get Paid Button -->
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <a href="${getPaidLink}"
                   style="background-color:#00a86b;
                          color:#ffffff;
                          padding:14px 32px;
                          text-decoration:none;
                          font-size:18px;
                          font-weight:bold;
                          border-radius:8px;
                          display:inline-block;">
                  Get Paid
                </a>
              </td>
            </tr>

            <!-- Expiration Note -->
            <tr>
              <td align="center" 
                  style="font-size:14px; color:#e63946; padding:0 20px 20px 20px; line-height:20px;">
                Your Stripe payment link expires in 24 hours.  
                If it expires or you need a new one, click below to resend your setup link.
              </td>
            </tr>

            <!-- Resend Link Button -->
            <tr>
              <td align="center" style="padding-bottom:30px;">
                <a href="${reSendLink}"
                   style="background-color:#007bff;
                          color:#ffffff;
                          padding:10px 26px;
                          text-decoration:none;
                          font-size:14px;
                          border-radius:6px;
                          display:inline-block;">
                  Resend Stripe Link
                </a>
              </td>
            </tr>

            <!-- Footer Note -->
            <tr>
              <td align="center" 
                  style="font-size:12px; color:#777; line-height:18px; padding:0 20px;">
                To receive payments through Pulse World, you must complete your Stripe setup 
                before accepting or delivering any orders.
              </td>
            </tr>

            <!-- Social Media Section -->
            <tr>
              <td align="center" style="padding-top:30px;">
                <div style="font-size:14px; color:#555; margin-bottom:10px;">
                  Enjoy these moments! Share your successes with Pulse World on social media.
                </div>
                <a href="https://linktr.ee/tropicpulse" target="_blank">
                  <img src="./_EXPRESSIONS/_PEX/BUILD/SocialMedia"
                       alt="Social Media Icons"
                       width="180"
                       style="display:block; margin:auto;">
                </a>
              </td>
            </tr>

          </table>
          <!-- End Main Card -->

        </td>
      </tr>
    </table>

    ${trackingPixel}

  </body>
</html>`;
  }
},

  pulsePointRedemption: {
  subject: (payload) => {
    const { points } = payload;
    return `Redemption Requested: ${points} Pulse Points Redemption`;
  },
  important: true,
  html: (payload) => {
    const { 
      name, 
      email, 
      points, 
      availableBalance, 
      pendingBalance, 
      displayCurrency, 
      transferCurrency, 
      displayAmount, 
      logId 
    } = payload;

    const pointToMoney = points / 100;
    let formatted = pointToMoney || displayAmount;

    const payoutAmountFormatted = formatDisplayAmount(displayCurrency, formatted);
    const formattedavailable = formatDisplayAmount(displayCurrency, availableBalance);
    const formattedpending = formatDisplayAmount(displayCurrency, pendingBalance);

    // Correct 1x1 tracking pixel
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0; display:block;">`
        : "";

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Pulse Points Redemption Requested</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f5f7;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #1f2933;
    }
    .wrapper {
      width: 100%;
      background-color: #f3f5f7;
      padding: 24px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
    }
    .header {
      background: linear-gradient(135deg, #00c2a8, #00a0ff);
      padding: 24px 24px 20px;
      text-align: center;
      color: #ffffff;
    }
    .logo-circle {
      width: 70px;
      height: 70px;
      border-radius: 999px;
      background: none !important;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
    .brand-text {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0.03em;
    }
    .tagline {
      font-size: 12px;
      opacity: 0.9;
    }
    .header-title {
      margin-top: 18px;
      font-size: 22px;
      font-weight: 700;
    }
    .header-subtitle {
      margin-top: 6px;
      font-size: 14px;
      opacity: 0.95;
    }
    .content {
      padding: 24px 24px 8px;
      font-size: 14px;
      line-height: 1.6;
    }
    .pill {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 999px;
      background-color: #ecfdf5;
      color: #047857;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .highlight-box {
      margin: 16px 0;
      padding: 12px 14px;
      border-radius: 12px;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
    }
    .highlight-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6b7280;
      margin-bottom: 4px;
    }
    .highlight-value {
      font-size: 13px;
      font-weight: 600;
      color: #111827;
    }
    .footer {
      padding: 14px 24px 20px;
      font-size: 11px;
      color: #9ca3af;
      text-align: left;
      border-top: 1px solid #e5e7eb;
      background-color: #f9fafb;
    }
    .footer strong {
      color: #4b5563;
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="container">

      <!-- HEADER -->
      <div class="header">

        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center">
              <img 
                src="./_EXPRESSIONS/_PEX/BUILD/ToucanLogo-Mini"
                alt="Pulse World Logo"
                width="70"
                height="70"
                style="
                  display:block;
                  margin:0 auto 14px auto;
                  border-radius:50%;
                  object-fit:cover;
                ">
            </td>
          </tr>

          <tr>
            <td align="center">
              <img 
                src="./_EXPRESSIONS/_PEX/BUILD/CointoWallet"
                alt="Coin to Wallet"
                width="120"
                style="display:block; margin:0 auto 10px auto;">
            </td>
          </tr>
        </table>

        <div class="brand-text">Pulse World</div>
        <div class="tagline">Enjoy these moments.</div>

        <div class="header-title">Pulse Points Redemption Requested</div>
        <div class="header-subtitle">
          Your Pulse Points will be converted into Wallet Balance within 24–48 hours.
        </div>
      </div>

      <!-- CONTENT -->
      <div class="content">

        <div style="text-align:center; width:100%;">
          <span class="pill">Pulse Points</span>
          <h2>Redeeming ${points} Pulse Points</h2>
        </div>

        <p>Hi ${name},</p>

        <p>
          Pulse World has received your request to convert 
          <strong>${points}</strong> Pulse Points into Wallet Balance.
          Your payout will be processed shortly.
        </p>

        <div class="highlight-box">
          <div class="highlight-label">User Email</div>
          <div class="highlight-value">${email}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Pulse Points Redeemed</div>
          <div class="highlight-value">${points}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Estimated Wallet Balance Added</div>
          <div class="highlight-value" style="font-size:20px; font-weight:700;">
            ${payoutAmountFormatted}
          </div>
        </div>

        <p style="margin-top: 18px;">
          Your Pulse Points have already been deducted from your account.  
          You will receive a confirmation once the wallet balance is updated.
        </p>

        <p>
          <strong>Pulse World</strong><br/>
          Enjoy these moments.
        </p>
      </div>

      <div class="footer">
        <div><strong>Pulse World</strong> — San Pedro, Ambergris Caye</div>
        <div style="margin-top: 6px;">
          You’re receiving this email because a Pulse Points redemption was requested.
        </div>
      </div>

    </div>

    ${trackingPixel}

  </div>
</body>
</html>`;
  }
},

pulsePointsGifted: {
  subject: (payload) => {
    const { points } = payload;
    return `Pulse World: You have Earned ${points} Pulse Points!`;
  },
  important: true,
  html: (payload) => {
    const { 
      name, 
      email, 
      points, 
      tipAmount, 
      itemPrice, 
      totalPrice, 
      taxAmount, 
      shipping, 
      payoutAmount, 
      logId 
    } = payload;

    const num = (v) => {
      if (v == null) return 0;
      const decoded = decodeURIComponent(String(v));
      if (decoded.includes("|")) {
        return decoded
          .split("|")
          .map(x => Number(x) || 0)
          .reduce((a, b) => a + b, 0);
      }
      const n = Number(decoded);
      return isNaN(n) ? 0 : Number(n.toFixed(2));
    };

    const tip = num(tipAmount ?? payload.ordertip ?? payload.tip);
    const priceRaw = itemPrice ?? payload.orderprice ?? payload.orderamount ?? null;
    const price = num(priceRaw);

    let payout = num(payoutAmount);
    if (payout === 0) {
      payout = Number((tip + price * 0.05).toFixed(2));
    }

    const formattedordertotal  = `BZ$${Number(totalPrice).toFixed(2)}`;
    const formattedorderamount = `BZ$${price.toFixed(2)}`;
    const formattedtip         = `BZ$${Number(tipAmount).toFixed(2)}`;
    const formattedtax         = `BZ$${Number(taxAmount).toFixed(2)}`;

    // ✅ Correct 1×1 tracking pixel
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src=https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0; display:block;">`
        : "";

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Pulse Points Awarded</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f5f7;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #1f2933;
    }
    .wrapper {
      width: 100%;
      background-color: #f3f5f7;
      padding: 24px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
    }
    .header {
      background: linear-gradient(135deg, #00c2a8, #00a0ff);
      padding: 24px 24px 20px;
      text-align: left;
      color: #ffffff;
    }
    .logo-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .logo-circle {
      width: 70px;
      height: 70px;
      border-radius: 999px;
      background: none !important;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
    .brand-text {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0.03em;
    }
    .tagline {
      font-size: 12px;
      opacity: 0.9;
    }
    .header-title {
      margin-top: 18px;
      font-size: 22px;
      font-weight: 700;
    }
    .header-subtitle {
      margin-top: 6px;
      font-size: 14px;
      opacity: 0.95;
    }
    .content {
      padding: 24px 24px 8px;
      font-size: 14px;
      line-height: 1.6;
    }
    .pill {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 999px;
      background-color: #ecfdf5;
      color: #047857;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .highlight-box {
      margin: 16px 0;
      padding: 12px 14px;
      border-radius: 12px;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
    }
    .highlight-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6b7280;
      margin-bottom: 4px;
    }
    .highlight-value {
      font-size: 13px;
      font-weight: 600;
      color: #111827;
    }
    .footer {
      padding: 14px 24px 20px;
      font-size: 11px;
      color: #9ca3af;
      text-align: left;
      border-top: 1px solid #e5e7eb;
      background-color: #f9fafb;
    }
    .footer strong {
      color: #4b5563;
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="container">

      <div class="header">
        <div class="logo-row">
          <div style="text-align:center; width:100%;">
            <div style="display:inline-block; text-align:center;">
              <div class="logo-circle" style="margin:0 auto 10px auto;">
                <img 
                  src="./_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo2.png"
                  alt="Pulse World Toucan"
                  width="60"
                  style="display:block; border-radius:50%;">
              </div>
              <div>
                <div class="brand-text">Pulse World</div>
                <div class="tagline">Enjoy these moments.</div>
              </div>
            </div>
          </div>
        </div>

        <div style="text-align:center; width:100%;">
          <div class="header-title">Pulse Points Awarded</div>
          <div class="header-subtitle">
            Your delivery has earned you new Pulse Points.
          </div>
        </div>
      </div>

      <div class="content">

        <div style="text-align:center; width:100%;">
          <span class="pill">Pulse Points</span>
          <h2>You’ve Earned ${points || "0"} Pulse Points</h2>
        </div>

        <p>Hi ${name || "there"},</p>

        <p>
          Thank you for your service. Pulse World has credited 
          <strong><span style="font-size:16px;">${points || "0"}</span> Pulse Points</strong>
          to your profile for your recent delivery.
        </p>

        <div class="highlight-box">
          <div class="highlight-label">Deliverer Email</div>
          <div class="highlight-value">${email || "N/A"}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Order Item Price</div>
          <div class="highlight-value">${formattedorderamount}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Belize Tax (12.5%)</div>
          <div class="highlight-value">${formattedtax}</div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Tip</div>
          <div class="highlight-value" style="font-weight:bold; font-size:22px;">
            ${formattedtip}
          </div>
        </div>

        <div class="highlight-box">
          <div class="highlight-label">Order Total Price</div>
          <div class="highlight-value">${formattedordertotal}</div>
        </div>

        <p style="margin-top: 18px;">
          Stay tuned—your Pulse Points will soon unlock rewards, perks, and exclusive benefits.
        </p>

        <p>
          <strong>Pulse World</strong><br/>
          Enjoy these moments.
        </p>
      </div>

      <div class="footer">
        <div><strong>Pulse World</strong> — San Pedro, Ambergris Caye</div>
        <div style="margin-top: 6px;">
          You’re receiving this email because a delivery was completed using this address.
        </div>
      </div>
    </div>

    ${trackingPixel}

  </div>
</body>
</html>`;
  }
},

rolechange: {
  subject: (payload) => "Pulse World: Role Change Requested",
  important: true,
  html: (payload) => {
    const { role, payFrequency, payDay, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src=https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;display:block;">`
        : "";

    const payDayRow = payDay
      ? `<tr>
          <td style="padding:10px 12px;border:1px solid #e2e2e2;background:#fafafa;width:40%;font-size:13px;color:#777;">
            Payday
          </td>
          <td style="padding:10px 12px;border:1px solid #e2e2e2;font-size:13px;color:#222;">
            ${payDay}
          </td>
        </tr>`
      : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e2e2e2;">
            
            <!-- Logo -->
            <tr>
              <td align="center" style="padding:20px 20px 10px 20px;">
                <img src="./_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo2.png" alt="Pulse World" style="max-width:180px;height:auto;display:block;">
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td style="padding:10px 20px 20px 20px;">
                <h2 style="margin:0 0 10px 0;font-size:20px;color:#222;text-align:center;">
                  Role & Pay Frequency Updated
                </h2>
                <p style="margin:0 0 16px 0;font-size:14px;color:#555;text-align:center;">
                  Your account details have been updated. Please review the changes below.
                </p>

                <!-- Data Table -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">

                  <tr>
                    <td style="padding:10px 12px;border:1px solid #e2e2e2;background:#fafafa;width:40%;font-size:13px;color:#777;">
                      Role
                    </td>
                    <td style="padding:10px 12px;border:1px solid #e2e2e2;font-size:13px;color:#222;">
                      ${role}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:10px 12px;border:1px solid #e2e2e2;background:#fafafa;width:40%;font-size:13px;color:#777;">
                      Pay Frequency
                    </td>
                    <td style="padding:10px 12px;border:1px solid #e2e2e2;font-size:13px;color:#222;">
                      ${payFrequency.toUpperCase()}
                    </td>
                  </tr>

                  ${payDayRow}

                </table>

                <p style="margin:16px 0 0 0;font-size:12px;color:#999;text-align:center;">
                  If you believe this change is incorrect, please contact <a href="mailto:AIOvermind@PulseWorld.Net">Pulse World support</a>.
                </p>
              </td>
            </tr>

          </table>
        </td>
        ${trackingPixel}
      </tr>
    </table>
  </body>
</html>`;
  }
},

  newEvent: {
  subject: (payload) => "New Event on Pulse World",
  important: false,
  html: (payload) => {
    const { title, Fromdate, Todate, Fromtime, Totime, Venue, description, summary, unsubscribeUrl, language, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src=https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;display:block;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7;padding:30px 0;font-family:'Poppins',sans-serif;">
  <tr>
    <td align="center">

      <!-- Main Container -->
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:18px;overflow:hidden;border:3px solid #000;">
        
        <!-- Header -->
        <tr>
          <td align="center" style="background:#ffff99;padding:30px 20px;">
            <img src="./_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo2.png" 
                 alt="Pulse World Toucan" width="120" style="display:block;margin-bottom:10px;border-radius:50%;border:3px solid #000;">
            <h1 style="margin:0;font-size:26px;color:#000;">A New Event Just Hit Pulse World!</h1>
          </td>
        </tr>

        <!-- Cartoon Event Icon -->
        <tr>
          <td align="center" style="padding:20px;">
            <img src="./_EXPRESSIONS/_PEX/BUILD/NewEvent" 
                 alt="New Event Illustration" width="160" 
                 style="display:block;margin:0 auto 10px;">
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:0 30px 30px;color:#333;font-size:16px;line-height:1.6;">
            <p style="margin-top:0;">
              A brand‑new event has just been added to Pulse World — and you won’t want to miss it!
            </p>

            <div style="background:#f0faff;border:2px solid #00aaff;border-radius:12px;padding:18px;margin:20px 0;">
              <p style="margin:0;font-size:18px;font-weight:600;color:#000;">${title}</p>
              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <strong>${summary}</strong>
              </p>

              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <span style="color:green; font-size:16px;">Date:</span>
                <strong>${Fromdate} → ${Todate}</strong><br>
                <span style="color:green; font-size:16px;">Time:</span>
                <strong>${Fromtime} → ${Totime}</strong>
              </p>
              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <span style="color:green; font-size:16px;">Venue:</span>
                <strong>${Venue}</strong>
              </p>
              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <span style="color:green; font-size:16px;">Language:</span>
                <strong>${language}</strong>
              </p>
              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <span style="color:green; font-size:16px;">Description:</span>
                <strong>${description}</strong>
              </p>
            </div>

            <p>
              Open the Pulse World app to get full details and stay in the loop with everything happening around San Pedro!
            </p>

            <p style="margin-top:25px;text-align:center;">
              <a href="https://linktr.ee/tropicpulse" 
                 style="background:#00aaff;color:#fff;padding:14px 24px;border-radius:10px;text-decoration:none;font-weight:600;display:inline-block;">
                View Event on Pulse World
              </a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
<tr>
  <td align="center" style="background:#fafafa; padding:20px; font-size:13px; color:#777; line-height:1.5;">
    Powered by Pulse World • San Pedro’s Everything App<br><br>
    <em>This email was automatically generated because a new event was added to Pulse World.</em>
  </td>
</tr>

<!-- Unsubscribe Footer -->
<tr>
  <td align="center" style="padding:10px;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center">

          <table width="500" cellpadding="0" cellspacing="0" border="0"
                 style="background:#ffffff; border:2px solid #e5e5e5; border-radius:14px; padding:10px;">
            <tr>
              <td align="center" style="padding:10px;">

                <img 
                  src="./_EXPRESSIONS/_PEX/BUILD/Welcome"
                  alt="Pulse World Logo"
                  width="120"
                  style="display:block; margin-bottom:10px; border-radius:12px;"
                />

                <p style="font-family:Arial, sans-serif; font-size:14px; color:#555;">
                  Don’t want to receive these updates?
                </p>

                <a href="${unsubscribeUrl}"
                   style="font-family:Arial, sans-serif; font-size:14px; color:#4a90e2; text-decoration:none; font-weight:bold;">
                   Unsubscribe from Pulse World mass emails
                </a>

              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>

  </td>
</tr>
      </table>
    </td>
    ${trackingPixel}
  </tr>
</table>
</body>
</html>`;
  }
},

  newBusiness: {
  subject: (payload) => "New Business on Pulse World",
  important: false,
  html: (payload) => {
    const { busname, summary, description, busemail, link, location, unsubscribeUrl, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src=https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;display:block;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7;padding:30px 0;font-family:'Poppins',sans-serif;">
  <tr>
    <td align="center">

      <!-- Main Container -->
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:18px;overflow:hidden;border:3px solid #000;">
        
        <!-- Header -->
        <tr>
          <td align="center" style="background:#ffff99;padding:30px 20px;">
            <img src="./_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo2.png" 
                 alt="Pulse World Toucan" width="120" style="display:block;margin-bottom:10px;border-radius:50%;border:3px solid #000;">
            <h1 style="margin:0;font-size:26px;color:#000;">A New Business Just Joined Pulse World!</h1>
          </td>
        </tr>

        <!-- Cartoon Building -->
        <tr>
          <td align="center" style="padding:20px;">
            <img src="./_EXPRESSIONS/_PEX/BUILD/NewBusiness" 
                 alt="New Business Illustration" width="160" 
                 style="display:block;margin:0 auto 10px;">
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:0 30px 30px;color:#333;font-size:16px;line-height:1.6;">
            <p style="margin-top:0;">
              We’re excited to welcome a brand‑new local business to the Pulse World community!
            </p>

            <div style="background:#f0faff;border:2px solid #00aaff;border-radius:12px;padding:18px;margin:20px 0;">
              <p style="margin:0;font-size:18px;font-weight:600;color:#000;">${busname}</p>
              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <strong>${summary}</strong>
              </p>

              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <span style="color:green; font-size:16px;">Location:</span>
                <strong>${location}</strong>
              </p>

              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <span style="color:green; font-size:16px;">Description:</span>
                <strong>${description}</strong>
              </p>

              <p style="margin:6px 0 0;font-size:15px;color:#555;">
                <span style="color:green; font-size:16px;">Email:</span>
                <strong>${busemail}</strong>
              </p>
            </div>

            <p>
              Be sure to check them out on the Pulse World app and show your support for another amazing local business in San Pedro!
            </p>

            <p style="margin-top:25px;text-align:center;">
              <a href="https://linktr.ee/tropicpulse" 
                 style="background:#00aaff;color:#fff;padding:14px 24px;border-radius:10px;text-decoration:none;font-weight:600;display:inline-block;">
                Explore on Pulse World
              </a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
<tr>
  <td align="center" style="background:#fafafa; padding:20px; font-size:13px; color:#777; line-height:1.5;">
    Powered by Pulse World • San Pedro’s Everything App<br><br>
    <em>This email was automatically generated because a new business was added to Pulse World.</em>
  </td>
</tr>

<!-- Unsubscribe Footer -->
<tr>
  <td align="center" style="padding:10px;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center">

          <table width="500" cellpadding="0" cellspacing="0" border="0"
                 style="background:#ffffff; border:2px solid #e5e5e5; border-radius:14px; padding:10px;">
            <tr>
              <td align="center" style="padding:10px;">

                <img 
                  src="./_EXPRESSIONS/_PEX/BUILD/Welcome"
                  alt="Pulse World Logo"
                  width="120"
                  style="display:block; margin-bottom:10px; border-radius:12px;"
                />

                <p style="font-family:Arial, sans-serif; font-size:14px; color:#555;">
                  Don’t want to receive these updates?
                </p>

                <a href="${unsubscribeUrl}"
                   style="font-family:Arial, sans-serif; font-size:14px; color:#4a90e2; text-decoration:none; font-weight:bold;">
                   Unsubscribe from Pulse World mass emails
                </a>

              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>

  </td>
</tr>
      </table>
    </td>
    ${trackingPixel}
  </tr>
</table>
</body>
</html>`;
  }
},

adminPulseRedemptionNotice: {
  subject: "Pulse Points Redemption – Vault Credit Needed",
  html: ({ name, uid, points, walletAmount }) => `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" 
           style="background-color:#f4f4f4; padding:40px 0;">
      <tr>
        <td align="center">

          <!-- Main Card -->
          <table width="600" border="0" cellspacing="0" cellpadding="0" 
                 style="background:#ffffff; border-radius:14px; overflow:hidden; border:1px solid #e0e0e0;">

            <!-- Header -->
            <tr>
              <td style="padding:25px; text-align:center; background:#fafafa; border-bottom:1px solid #e0e0e0;">
                <h2 style="margin:0; font-size:22px; color:#222;">
                  Pulse Points Redemption Alert
                </h2>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px;">

                <p style="font-size:16px; color:#333; margin-top:0;">
                  A user has redeemed Pulse Points and requires a manual credit to their <strong>Pulse World Vault Wallet</strong>.
                </p>

                <table width="100%" border="0" cellspacing="0" cellpadding="0" 
                       style="background:#fafafa; padding:15px; border-radius:8px; border:1px solid #ddd; margin:20px 0;">
                  <tr>
                    <td style="font-size:15px; padding:5px 0;"><strong>Name:</strong> ${name}</td>
                  </tr>
                  <tr>
                    <td style="font-size:15px; padding:5px 0;"><strong>UID:</strong> ${uid}</td>
                  </tr>
                  <tr>
                    <td style="font-size:15px; padding:5px 0;"><strong>Points Redeemed:</strong> ${points}</td>
                  </tr>
                  <tr>
                    <td style="font-size:15px; padding:5px 0;"><strong>Vault Credit Amount:</strong> $${walletAmount}</td>
                  </tr>
                </table>

                <p style="font-size:15px; color:#333;">
                  Please credit this amount to the user's Pulse World Vault Wallet.  
                  This manual credit should be completed within <strong>24–48 hours</strong>.
                </p>

                <p style="font-size:14px; color:#777; margin-top:30px;">
                  — Pulse World System Notification
                </p>

              </td>
            </tr>

          </table>
          <!-- End Main Card -->

        </td>
      </tr>
    </table>
  </body>
</html>`
},

NoCredits: {
  subject: (payload) => "You're out of Mass Notification Credits",
  html: (payload) => {
    const { email, paymentLink, eventID, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src=https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;display:block;">`
        : "";

    return `<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f9f9; padding:40px 0; font-family:Arial, sans-serif;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:white; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#00c6ff,#0072ff); padding:30px; text-align:center;">
            <img src="./_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo2.png" alt="Pulse World" width="90" style="margin-bottom:10px;">
            <h1 style="color:white; margin:0; font-size:26px; font-weight:bold;">
              You're Out of Credits
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:30px; color:#333;">
            <p style="font-size:16px; line-height:1.6; margin:0 0 20px;">
              Hey Friend,
            </p>

            <p style="font-size:16px; line-height:1.6; margin:0 0 20px;">
              You’ve used your free Mass Notification credits. To keep sending island‑wide announcements, you’ll need to purchase additional credits.
            </p>

            <p style="font-size:16px; line-height:1.6; margin:0 0 25px;">
              Each credit is <strong>BZ$10</strong> and lets you broadcast a new event or business update to the entire Pulse World community.
            </p>

            <!-- Button -->
            <table cellpadding="0" cellspacing="0" style="margin:30px auto;">
              <tr>
                <td align="center" style="background:#00a86b; padding:14px 28px; border-radius:8px;">
                  <a href="${paymentLink}" 
                     style="color:white; text-decoration:none; font-size:18px; font-weight:bold; display:block;">
                    Buy Credits
                  </a>
                </td>
              </tr>
            </table>

            <p style="font-size:14px; color:#666; line-height:1.6; margin-top:20px;">
              Once your purchase is complete, your credits will be added instantly and you can continue sending notifications without interruption.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f0f7f7; padding:20px; text-align:center; font-size:12px; color:#777;">
            Pulse World • San Pedro, Belize<br>
            You’re receiving this message because you attempted to send a Mass Notification.
          </td>
        </tr>

      </table>
      ${trackingPixel}
    </td>
  </tr>
</table>`;
  }
}
};


// export const onPulseHistoryChanged = onDocumentWritten(
//   "PulseHistory/{uid}/entries/{entryId}",
//   async (event) => {
//     try {
//       const before = event.data.before.data() || {};
//       const after  = event.data.after.data() || {};

//       const location = event.location || "";
//       const source   = event.source || "";
//       const project  = event.project || "";

//       await logChange(
//         "PulseHistory",
//         before,
//         after,
//         `${event.params.uid}/${event.params.entryId}`,
//         location,
//         source,
//         project
//       );

//       // ⭐ Update timestamp
//       await event.data.after.ref.update({
//         updatedAt: PulseRealm.PulseNOW
//       });

//     } catch (err) {
//       console.error("onPulseHistoryChanged error:", err);
//       await db.collection("FUNCTION_ERRORS").add({
//         fn: "onPulseHistoryChanged",
//         params: event.params,
//         error: String(err),
//         createdAt: PulseRealm.PulseNOW
//       });
//     }
//   }
// );

// export const onBusinessChanged = onDocumentWritten(
//   "Businesses/{busId}",
//   async (event) => {
//     try {
//       const before = event.data.before.data() || {};
//       const after  = event.data.after.data() || {};

//       // Prevent infinite loops
//       if (after._changeLogged === true) {
//         return;
//       }

//       const location = event.location || "";
//       const source   = event.source || "";
//       const project  = event.project || "";

//       await logChange(
//         "Businesses",
//         before,
//         after,
//         event.params.busId,
//         location,
//         source,
//         project
//       );

//       // ⭐ Mark + timestamp
//       await event.data.after.ref.update({
//         _changeLogged: true,
//         updatedAt: PulseRealm.PulseNOW
//       });

//     } catch (err) {
//       console.error("onBusinessChanged error:", err);
//       await db.collection("FUNCTION_ERRORS").add({
//         fn: "onBusinessChanged",
//         params: event.params,
//         error: String(err),
//         createdAt: PulseRealm.PulseNOW
//       });
//     }
//   }
// );

// export const onEventChanged = onDocumentWritten(
//   "Events/{eventId}",
//   async (event) => {
//     try {
//       const before = event.data.before.data() || {};
//       const after  = event.data.after.data() || {};

//       if (after._changeLogged === true) {
//         return;
//       }

//       const location = event.location || "";
//       const source   = event.source || "";
//       const project  = event.project || "";

//       await logChange(
//         "Events",
//         before,
//         after,
//         event.params.eventId,
//         location,
//         source,
//         project
//       );

//       // ⭐ Mark + timestamp
//       await event.data.after.ref.update({
//         _changeLogged: true,
//         updatedAt: PulseRealm.PulseNOW
//       });

//     } catch (err) {
//       console.error("onEventChanged error:", err);
//       await db.collection("FUNCTION_ERRORS").add({
//         fn: "onEventChanged",
//         params: event.params,
//         error: String(err),
//         createdAt: PulseRealm.PulseNOW
//       });
//     }
//   }
// );

// export const onOrderChanged = onDocumentWritten(
//   "Orders/{orderId}",
//   async (event) => {
//     try {
//       const before = event.data.before.data() || {};
//       const after  = event.data.after.data() || {};

//       const location = event.location || "";
//       const source   = event.source || "";
//       const project  = event.project || "";

//       await logChange(
//         "Orders",
//         before,
//         after,
//         event.params.orderId,
//         location,
//         source,
//         project
//       );

//       // ⭐ Add timestamp
//       await event.data.after.ref.update({
//         updatedAt: PulseRealm.PulseNOW
//       });

//     } catch (err) {
//       console.error("onOrderChanged error:", err);
//       await db.collection("FUNCTION_ERRORS").add({
//         fn: "onOrderChanged",
//         params: event.params,
//         error: String(err),
//         createdAt: PulseRealm.PulseNOW
//       });
//     }
//   }
// );

// export const onUserChanged = onDocumentWrittenWithAuthContext(
//   "Users/{uid}",
//   async (event) => {
//     return handleUserChange(event, true);
//   }
// );

// export const onUserChangedNoAuth = onDocumentWritten(
//   "Users/{uid}",
//   async (event) => {
//     return handleUserChange(event, false);
//   }
// );

// export const onSettingsChanged = onDocumentWritten(
//   "Settings/global",
//   async (event) => {
//     try {
//       const before = event.data.before.data() || {};
//       const after  = event.data.after.data() || {};

//       const location = event.location || "";
//       const source   = event.source || "";
//       const project  = event.project || "";

//       await logChange(
//         "Settings",
//         before,
//         after,
//         "global",
//         location,
//         source,
//         project
//       );

//       // ⭐ Add updatedAt
//       await event.data.after.ref.update({
//         updatedAt: PulseRealm.PulseNOW
//       });
//     } catch (err) {
//       console.error("onSettingsChanged error:", err);
//       await db.collection("FUNCTION_ERRORS").add({
//         fn: "onSettingsChanged",
//         params: event.params,
//         error: String(err),
//         createdAt: PulseRealm.PulseNOW
//       });
//     }
//   }
// );


// export const onPulseHistoryChangedwAuth = onDocumentWrittenWithAuthContext(
//   "PulseHistory/{uid}/entries/{entryId}",
//   async (event) => {
//     try {
//       const actorUID  = event.auth.uid || null;
//       const targetUID = event.params.uid;
//       const entryId   = event.params.entryId;

//       const before = event.data.before.data() || {};
//       const after  = event.data.after.data() || {};

//       const location = event.location || "";
//       const source   = event.source || "";
//       const project  = event.project || "";

//       // -----------------------------------------
//       // SECURITY: Cross-user write detection
//       // -----------------------------------------
//       if (actorUID && actorUID !== targetUID) {
//         await db.collection("USER_TRIED").add({
//           reason: "cross_user_write_pulsehistory",
//           actorUID,
//           targetUID,
//           entryId,
//           before,
//           after,
//           path: `PulseHistory/${targetUID}/entries/${entryId}`,
//           userAgent: event.auth.token.userAgent || null,
//           ts: PulseRealm.PulseNOW,
//           createdAt: PulseRealm.PulseNOW
//         });
//         return;
//       }

//       // -----------------------------------------
//       // Normal diff logging
//       // -----------------------------------------
//       await logChange(
//         "PulseHistory",
//         before,
//         after,
//         `${targetUID}/${entryId}`,
//         location,
//         source,
//         project,
//         actorUID
//       );

//       // ⭐ Add updatedAt
//       await event.data.after.ref.update({
//         updatedAt: PulseRealm.PulseNOW
//       });

//     } catch (err) {
//       console.error("onPulseHistoryChanged error:", err);
//       await db.collection("FUNCTION_ERRORS").add({
//         fn: "onPulseHistoryChanged",
//         params: event.params,
//         error: String(err),
//         createdAt: PulseRealm.PulseNOW
//       });
//     }
//   }
// );

// export const onBusinessChangedwAuth = onDocumentWrittenWithAuthContext(
//   "Businesses/{busId}",
//   async (event) => {
//     try {
//       const actorUID = event.auth.uid || null;
//       const busId    = event.params.busId;

//       const before = event.data.before.data() || {};
//       const after  = event.data.after.data() || {};

//       // Prevent infinite loops
//       if (after._changeLogged === true) {
//         return;
//       }

//       const location = event.location || "";
//       const source   = event.source || "";
//       const project  = event.project || "";

//       // -----------------------------------------
//       // SECURITY: Business owner mismatch
//       // -----------------------------------------
//       const ownerUID = after.ownerUID || before.ownerUID || null;

//       if (actorUID && ownerUID && actorUID !== ownerUID) {
//         await db.collection("USER_TRIED").add({
//           reason: "cross_user_write_business",
//           actorUID,
//           ownerUID,
//           busId,
//           before,
//           after,
//           path: `Businesses/${busId}`,
//           userAgent: event.auth.token.userAgent || null,
//           ts: PulseRealm.PulseNOW,
//           createdAt: PulseRealm.PulseNOW
//         });
//         return;
//       }

//       await logChange(
//         "Businesses",
//         before,
//         after,
//         busId,
//         location,
//         source,
//         project,
//         actorUID
//       );

//       // ⭐ Mark + timestamp (single update to avoid recursion)
//       await event.data.after.ref.update({
//         _changeLogged: true,
//         updatedAt: PulseRealm.PulseNOW
//       });

//     } catch (err) {
//       console.error("onBusinessChanged error:", err);
//       await db.collection("FUNCTION_ERRORS").add({
//         fn: "onBusinessChanged",
//         params: event.params,
//         error: String(err),
//         createdAt: PulseRealm.PulseNOW
//       });
//     }
//   }
// );

// export const onEventChangedwAuth = onDocumentWrittenWithAuthContext(
//   "Events/{eventId}",
//   async (event) => {
//     try {
//       const actorUID = event.auth.uid || null;
//       const eventId  = event.params.eventId;

//       const before = event.data.before.data() || {};
//       const after  = event.data.after.data() || {};

//       // Prevent infinite loops
//       if (after._changeLogged === true) {
//         return;
//       }

//       const location = event.location || "";
//       const source   = event.source || "";
//       const project  = event.project || "";

//       // -----------------------------------------
//       // SECURITY: Event owner mismatch
//       // -----------------------------------------
//       const ownerUID = after.ownerUID || before.ownerUID || null;

//       if (actorUID && ownerUID && actorUID !== ownerUID) {
//         await db.collection("USER_TRIED").add({
//           reason: "cross_user_write_event",
//           actorUID,
//           ownerUID,
//           eventId,
//           before,
//           after,
//           path: `Events/${eventId}`,
//           userAgent: event.auth.token.userAgent || null,
//           ts: PulseRealm.PulseNOW,
//           createdAt: PulseRealm.PulseNOW
//         });
//         return;
//       }

//       await logChange(
//         "Events",
//         before,
//         after,
//         eventId,
//         location,
//         source,
//         project,
//         actorUID
//       );

//       // ⭐ Mark + timestamp
//       await event.data.after.ref.update({
//         _changeLogged: true,
//         updatedAt: PulseRealm.PulseNOW
//       });

//     } catch (err) {
//       console.error("onEventChanged error:", err);
//       await db.collection("FUNCTION_ERRORS").add({
//         fn: "onEventChanged",
//         params: event.params,
//         error: String(err),
//         createdAt: PulseRealm.PulseNOW
//       });
//     }
//   }
// );

// export const onOrderChangedwAuth = onDocumentWrittenWithAuthContext(
//   "Orders/{orderId}",
//   async (event) => {
//     try {
//       const actorUID = event.auth.uid || null;
//       const orderId  = event.params.orderId;

//       const before = event.data.before.data() || {};
//       const after  = event.data.after.data() || {};

//       const location = event.location || "";
//       const source   = event.source || "";
//       const project  = event.project || "";

//       // -----------------------------------------
//       // SECURITY: Order owner mismatch
//       // -----------------------------------------
//       const ownerUID = after.userUID || before.userUID || null;

//       if (actorUID && ownerUID && actorUID !== ownerUID) {
//         await db.collection("USER_TRIED").add({
//           reason: "cross_user_write_order",
//           actorUID,
//           ownerUID,
//           orderId,
//           before,
//           after,
//           path: `Orders/${orderId}`,
//           userAgent: event.auth.token.userAgent || null,
//           ts: PulseRealm.PulseNOW,
//           createdAt: PulseRealm.PulseNOW
//         });
//         return;
//       }

//       // -----------------------------------------
//       // Normal diff logging
//       // -----------------------------------------
//       await logChange(
//         "Orders",
//         before,
//         after,
//         orderId,
//         location,
//         source,
//         project,
//         actorUID
//       );

//       // ⭐ Add updatedAt
//       await event.data.after.ref.update({
//         updatedAt: PulseRealm.PulseNOW
//       });

//     } catch (err) {
//       console.error("onOrderChanged error:", err);
//       await db.collection("FUNCTION_ERRORS").add({
//         fn: "onOrderChanged",
//         params: event.params,
//         error: String(err),
//         createdAt: PulseRealm.PulseNOW
//       });
//     }
//   }
// );

async function handleUserChange(event, hasAuth) {
  try {
    const actorUID  = hasAuth ? (event.auth.uid || null) : null;
    const targetUID = event.params.uid;

    // Raw before/after
    const beforeRaw = event.data.before.data() || {};
    const afterRaw  = event.data.after.data() || {};

    const location  = event.location || "";
    const source    = event.source || "";
    const project   = event.project || "";

    // ---------------------------------------------------------
    // 1️⃣ Cross-user write guard
    // ---------------------------------------------------------
    if (hasAuth && actorUID && actorUID !== targetUID) {
      await db.collection("USER_TRIED").add({
        reason: "cross_user_write",
        actorUID,
        targetUID,
        before: beforeRaw,
        after: afterRaw,
        path: `Users/${targetUID}`,
        userAgent: event.auth.token.userAgent || null,
        ts: PulseRealm.PulseNOW,
        createdAt: PulseRealm.PulseNOW
      });
      return;
    }

    // ---------------------------------------------------------
    // 2️⃣ Prevent re-logging loops
    // ---------------------------------------------------------
    if (afterRaw._changeLogged === true) {
      return;
    }

    // ---------------------------------------------------------
    // 3️⃣ Clean internal fields + prepare for diff
    // ---------------------------------------------------------
    const stripInternal = (obj) => {
      if (!obj || typeof obj !== "object") return obj;
      const out = {};
      for (const k of Object.keys(obj)) {
        if (k.startsWith("_")) continue;
        out[k] = stripInternal(obj[k]);
      }
      return out;
    };

    const before = stripInternal(beforeRaw);
    const after  = stripInternal(afterRaw);

    // ---------------------------------------------------------
    // 4️⃣ Enforce NEW TOKEN RULES
    // Root-level resendToken is illegal
    // TPIdentity.resendToken is the ONLY valid token
    // ---------------------------------------------------------
    const beforeRootToken = beforeRaw.resendToken ?? null;
    const afterRootToken  = afterRaw.resendToken ?? null;

    const beforeIdentity = before.TPIdentity || {};
    const afterIdentity  = after.TPIdentity || {};

    const beforeSessionToken = beforeIdentity.resendToken ?? null;
    const afterSessionToken  = afterIdentity.resendToken ?? null;

    // ❌ If root token changed → illegal unless initial system set
    if (beforeRootToken !== afterRootToken) {
      const isInitialSet =
        (beforeRootToken === null || beforeRootToken === undefined) &&
        afterRootToken &&
        (source === "verifyPin" || source === "system_init");

      if (!isInitialSet) {
        await db.collection("SECURITY_VIOLATIONS").add({
          uid: targetUID,
          reason: "root_resendToken_modified",
          beforeRootToken,
          afterRootToken,
          actorUID,
          source,
          location,
          project,
          createdAt: PulseRealm.PulseNOW
        });

        // Revert root token
        await event.data.after.ref.update({
          resendToken: beforeRootToken,
          _changeLogged: true
        });

        return;
      }
    }

    // ---------------------------------------------------------
    // 5️⃣ Detect drift between root + TPIdentity token
    // ---------------------------------------------------------
    if (
      afterRootToken &&
      afterSessionToken &&
      afterRootToken !== afterSessionToken
    ) {
      await db.collection("DRIFT_LOGS").add({
        uid: targetUID,
        rootResendToken: afterRootToken,
        sessionResendToken: afterSessionToken,
        reason: "token_drift_detected",
        actorUID,
        source,
        location,
        project,
        createdAt: PulseRealm.PulseNOW
      });
    }

    // ---------------------------------------------------------
    // 6️⃣ Deep diff (field-level)
    // ---------------------------------------------------------
    const diff = {};
    function walk(b, a, path = "") {
      const keys = new Set([...Object.keys(b || {}), ...Object.keys(a || {})]);

      for (const key of keys) {
        const full = path ? `${path}.${key}` : key;

        const bv = b ? b[key] : undefined;
        const av = a ? a[key] : undefined;

        if (deepEqual(bv, av)) continue;

        if (
          typeof bv === "object" &&
          typeof av === "object" &&
          bv &&
          av &&
          !Array.isArray(bv) &&
          !Array.isArray(av)
        ) {
          walk(bv, av, full);
        } else {
          diff[full] = {
            from: bv ?? null,
            to: av ?? null
          };
        }
      }
    }

    walk(before, after);

    // ---------------------------------------------------------
    // 🧠 NEW: Versioning Engine (micro + mid + global)
    // ---------------------------------------------------------

    const changedGroups = new Set();

    // Detect which TP groups changed
    for (const path of Object.keys(diff)) {
      if (path.startsWith("TPIdentity.")) changedGroups.add("TPIdentity");
      if (path.startsWith("TPLoyalty.")) changedGroups.add("TPLoyalty");
      if (path.startsWith("TPNotifications.")) changedGroups.add("TPNotifications");
      if (path.startsWith("TPWallet.")) changedGroups.add("TPWallet");
      if (path.startsWith("TPSecurity.")) changedGroups.add("TPSecurity");
      // TPFirebaseAuth is intentionally excluded (no versioning)
    }

    // ---------------------------------------------------------
    // 1️⃣ Micro update — only ONE group changed
    // ---------------------------------------------------------
    if (changedGroups.size === 1) {
      const group = [...changedGroups][0];

      await event.data.after.ref.update({
        [`${group}.calculationVersion`]: increment(1),
        updatedAt: PulseRealm.PulseNOW
      });
    }
    const increment = (n = 1) => ({ integerIncrement: n });
    // ---------------------------------------------------------
    // 2️⃣ Mid update — MULTIPLE groups changed
    // ---------------------------------------------------------
    if (changedGroups.size > 1) {
      await event.data.after.ref.update({
        UserVersion: increment(1),
        updatedAt: PulseRealm.PulseNOW
      });
    }

    // ---------------------------------------------------------
    // 3️⃣ Global update — bump CACHE_CONTROL.usersVersion
    // ---------------------------------------------------------
    if (changedGroups.size > 0) {
      const controlRef = db.collection("Config").doc("CACHE_CONTROL");
      await controlRef.update({
        usersVersion: increment(1)
      });
    }
    // ---------------------------------------------------------
    // 7️⃣ If no diff → snapshot only
    // ---------------------------------------------------------
    if (Object.keys(diff).length === 0) {
      await db
        .collection("TPIdentityHistory")
        .doc(targetUID)
        .collection("snapshots")
        .add({
          user: afterRaw,
          rootResendToken: afterRootToken,
          sessionResendToken: afterSessionToken,
          location,
          source,
          project,
          note: "No diff, snapshot only",
          actorUID,
          createdAt: PulseRealm.PulseNOW
        });

      await event.data.after.ref.update({ _changeLogged: true });
      return;
    }

    // ---------------------------------------------------------
    // 8️⃣ Log full diff
    // ---------------------------------------------------------
    await db.collection("CHANGES").add({
      collection: "Users",
      docId: targetUID,
      diff,
      timestamp: PulseRealm.PulseNOW,
      processed: false,
      actor: actorUID
        ? { type: "USER", uid: actorUID }
        : { type: "SYSTEM", uid: null },
      location,
      source,
      project,
      createdAt: PulseRealm.PulseNOW
    });

    // ---------------------------------------------------------
    // 9️⃣ Log TPIdentity-only diff if changed
    // ---------------------------------------------------------
    if (!deepEqual(beforeIdentity, afterIdentity)) {
      const identityDiff = {};
      for (const k of Object.keys(diff)) {
        if (k.startsWith("TPIdentity.")) {
          identityDiff[k] = diff[k];
        }
      }

      await db.collection("CHANGES").add({
        collection: "Users.TPIdentity",
        docId: targetUID,
        diff: identityDiff,
        timestamp: PulseRealm.PulseNOW,
        processed: false,
        actor: actorUID
          ? { type: "USER", uid: actorUID }
          : { type: "SYSTEM", uid: null },
        location,
        source,
        project,
        createdAt: PulseRealm.PulseNOW
      });
    }

    // ---------------------------------------------------------
    // 🔟 Snapshot with both tokens
    // ---------------------------------------------------------
    await db
      .collection("TPIdentityHistory")
      .doc(targetUID)
      .collection("snapshots")
      .add({
        user: afterRaw,
        rootResendToken: afterRootToken,
        sessionResendToken: afterSessionToken,
        location,
        source,
        project,
        actorUID,
        createdAt: PulseRealm.PulseNOW
      });

    // ---------------------------------------------------------
    // 1️⃣1️⃣ Mark as logged
    // ---------------------------------------------------------
    await event.data.after.ref.update({ _changeLogged: true });

  } catch (err) {
    await db.collection("FUNCTION_ERRORS").add({
      fn: "handleUserChange",
      params: event.params,
      error: String(err),
      createdAt: PulseRealm.PulseNOW
    });
  }
}

// export const onSettingsChangedwAuth = onDocumentWrittenWithAuthContext(
//   "Settings/global",
//   async (event) => {
//     try {
//       const actorUID = event.auth.uid || null;   // Who performed the write
//       const before   = event.data.before.data() || {};
//       const after    = event.data.after.data() || {};

//       const location = event.location || "";
//       const source   = event.source || "";
//       const project  = event.project || "";

//       // -----------------------------------------
//       // 0️⃣ SECURITY CHECK: ONLY ALLOW AUTHORIZED ADMINS
//       // -----------------------------------------
//       // You can customize this list or fetch from Firestore
//       const allowedAdmins = [
//         "EcqiBcTTnqwg8QwSKYWy"
//       ];

//       if (!actorUID || !allowedAdmins.includes(actorUID)) {
//         // Log the unauthorized attempt
//         await db.collection("USER_TRIED").add({
//           reason: "unauthorized_settings_write",
//           actorUID,
//           path: "Settings/global",
//           before,
//           after,
//           userAgent: event.auth.token.userAgent || null,
//           ts: PulseRealm.PulseNOW,
//           createdAt: PulseRealm.PulseNOW
//         });

//         // Optional: revert the write
//         // await event.data.after.ref.set(before, { merge: false });

//         // Optional: flag the actor
//         // await db.collection("DANGER_FLAGS").doc(actorUID).set({ flagged: true }, { merge: true });

//         return; // Do NOT continue normal processing
//       }

//       // -----------------------------------------
//       // 1️⃣ Log the settings diff
//       // -----------------------------------------
//       await logChange(
//         "Settings",
//         before,
//         after,
//         "global",
//         location,
//         source,
//         project,
//         actorUID
//       );

//     } catch (err) {
//       console.error("onSettingsChanged error:", err);

//       await db.collection("FUNCTION_ERRORS").add({
//         fn: "onSettingsChanged",
//         params: event.params,
//         error: String(err),
//         createdAt: PulseRealm.PulseNOW
//       });
//     }
//   }
// );

function deepEqual(a, b) {
  if (a === b) return true;

  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return a === b;

  // Arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  // Objects
  if (typeof a === "object") {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;

    for (const key of aKeys) {
      if (!deepEqual(a[key], b[key])) return false;
    }
    return true;
  }

  return false;
}

async function logChange(
  collection,
  before,
  after,
  docId,
  location,
  source,
  project,
  actorUID = null
) {
  const timestamp = PulseRealm.PulseNOW;

  // Strip internal fields
  const clean = (obj) => {
    if (!obj || typeof obj !== "object") return obj;
    const out = {};
    for (const k of Object.keys(obj)) {
      if (k.startsWith("_")) continue;
      out[k] = clean(obj[k]);
    }
    return out;
  };

  before = clean(before || {});
  after = clean(after || {});

  // Deep diff collector
  const diff = {};

  function walk(b, a, path = "") {
    const keys = new Set([...Object.keys(b || {}), ...Object.keys(a || {})]);

    for (const key of keys) {
      const full = path ? `${path}.${key}` : key;

      const bv = b ? b[key] : undefined;
      const av = a ? a[key] : undefined;

      // Identical → skip
      if (deepEqual(bv, av)) continue;

      // Recurse into nested objects
      if (
        typeof bv === "object" &&
        typeof av === "object" &&
        bv &&
        av &&
        !Array.isArray(bv) &&
        !Array.isArray(av)
      ) {
        walk(bv, av, full);
      } else {
        diff[full] = {
          from: bv ?? null,
          to: av ?? null
        };
      }
    }
  }

  walk(before, after);

  // Determine actor
  const actor = actorUID
    ? { type: "USER", uid: actorUID }
    : after._actor || { type: "SYSTEM", uid: null };

  // No diff → still log
  if (Object.keys(diff).length === 0) {
    await db.collection("CHANGES").add({
      collection,
      docId,
      diff: {},
      timestamp,
      processed: false,
      actor,
      location,
      source,
      project,
      note: "No diff, handler executed",
      createdAt: PulseRealm.PulseNOW
    });
    return;
  }

  // Normal diff logging
  await db.collection("CHANGES").add({
    collection,
    docId,
    diff,
    timestamp,
    processed: false,
    actor,
    location,
    source,
    project,
    createdAt: PulseRealm.PulseNOW
  });
}

PulseRealm.OSShortTermMemory = {
  logChange,
  handleUserChange,
  sendDynamicEmail,
  emailTemplates,
  PulseOSShortTermMemory,
  PulseOSShortTermMemoryMeta,
  MEMORY_CONTEXT
}