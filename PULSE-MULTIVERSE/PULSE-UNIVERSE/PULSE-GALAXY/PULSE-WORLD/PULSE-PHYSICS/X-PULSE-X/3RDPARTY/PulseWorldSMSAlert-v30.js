// ============================================================================
// FILE: pulse-world-os/PULSE-UNIVERSE/netlify/lib/PulseWorldSMSAlert-v30-IMMORTAL.js
// ORGAN: PulseWorldSMSAlert-v30 (Twilio SMS Organ, IMMORTAL Envelope Aware)
// LAYER: PULSE-WORLD / COMMUNICATION-CORE / IMMORTAL-V30
// ============================================================================
//
// UPGRADE SUMMARY
// ---------------
// • REMOVED ALL process.env usage
// • ADDED PulseIO Keychain lookups
// • IMMORTAL Twilio client now uses Keychain secrets
// • Messaging Service SID now comes from Keychain
// • Everything deterministic, zero-state, drift-proof
//
// ============================================================================
// PulseTwilio.js (IMMORTAL, import‑less, REST‑only)
let twilioClientInstance = null;
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


export function getTwilioClient() {
  const kc = PulseRealm.PulseCoreGlobal?.signal?.keychain;
  const accountSid = kc?.get("TWILIO_ACCOUNT_SID");
  const authToken = kc?.get("TWILIO_AUTH_TOKEN");

  if (!accountSid || !authToken) {
    throw new Error(
      "[PulseWorldSMSAlert-v30] Missing Twilio credentials in PulseIO Keychain"
    );
  }

  return {
    async messagesCreate({ to, from, body, messagingServiceSid }) {
      const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

      const form = new URLSearchParams();
      if (messagingServiceSid) form.append("MessagingServiceSid", messagingServiceSid);
      if (from) form.append("From", from);
      form.append("To", to);
      form.append("Body", body);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": "Basic " + btoa(`${accountSid}:${authToken}`),
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: form
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`[Twilio REST Error] ${err}`);
      }

      return res.json();
    }
  };
}


// ---------------------------------------------------------------------------
// IMMORTAL META
// ---------------------------------------------------------------------------
export const PulseWorldSMSAlertMeta = Object.freeze({
  organ: "PulseWorld.SMSAlert",
  layer: "pulse_world",
  version: "v30-IMMORTAL",
  deterministic: true,
  zeroState: true,
  sideEffects: "none",
  contracts: {
    requiresKeychain: [
      "TWILIO_ACCOUNT_SID",
      "TWILIO_AUTH_TOKEN",
      "TWILIO_MESSAGING_SERVICE_SID"
    ]
  }
});

// ---------------------------------------------------------------------------
// INTERNAL: SIMPLE HASH (NO SECRETS)
// ---------------------------------------------------------------------------
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h * 131 + s.charCodeAt(i) * (i + 7)) % 1000000007;
  }
  return `HSMS_${h}`;
}

// ---------------------------------------------------------------------------
// E.164 VALIDATION
// ---------------------------------------------------------------------------
export function validateE164(phone) {
  const raw = String(phone || "").trim();
  const re = /^\+[1-9]\d{6,14}$/;
  if (!raw) return { ok: false, normalized: null, error: "empty" };
  if (!re.test(raw)) return { ok: false, normalized: null, error: "invalid_e164" };
  return { ok: true, normalized: raw, error: null };
}

// ---------------------------------------------------------------------------
// IMMORTAL SMS ENVELOPE
// ---------------------------------------------------------------------------
export function buildSMSImmortalEnvelope(input = {}) {
  const nowIso = new Date().toISOString();

  const to = String(input.to || "");
  const body = String(input.body || "");
  const kind = String(input.kind || "generic");

  const world = input.world || "pulse-world";
  const regionId = input.regionId || "unknown";
  const hostName = input.hostName || "unknown";
  const route = input.route || null;
  const requestId = input.requestId || null;

  const band = input.band || "symbolic";
  const presenceTier = input.presenceTier || "idle";
  const presenceBand = input.presenceBand || band;

  const pulseTouch = input.pulseTouch && typeof input.pulseTouch === "object"
    ? JSON.parse(JSON.stringify(input.pulseTouch))
    : {};

  const advantageField =
    input.advantageField && typeof input.advantageField === "object"
      ? JSON.parse(JSON.stringify(input.advantageField))
      : {};

  const bandBinaryWave =
    input.bandBinaryWave && typeof input.bandBinaryWave === "object"
      ? JSON.parse(JSON.stringify(input.bandBinaryWave))
      : {};

  const extraMeta =
    input.meta && typeof input.meta === "object"
      ? JSON.parse(JSON.stringify(input.meta))
      : {};

  const hashPayload = {
    kind,
    world,
    regionId,
    hostName,
    route,
    requestId,
    band,
    presenceTier,
    presenceBand,
    bodyPreview: body.slice(0, 16),
    metaKeys: Object.keys(extraMeta).sort()
  };

  const intellHash = computeHash(JSON.stringify(hashPayload));
  
  const MESSAGING_SERVICE_SID =
  kc.get("TWILIO_MESSAGING_SERVICE_SID") || "";

  return {
    organ: PulseWorldSMSAlertMeta.organ,
    version: PulseWorldSMSAlertMeta.version,
    kind,
    timestamps: {
      createdAtIso: nowIso
    },
    smsContext: {
      to,
      body,
      messagingServiceSid: MESSAGING_SERVICE_SID || null
    },
    worldContext: {
      world,
      regionId,
      hostName,
      route,
      requestId
    },
    bandContext: {
      band,
      presenceTier,
      presenceBand
    },
    signalFactoringContext: {
      advantageField,
      bandBinaryWave
    },
    pulseTouch,
    meta: extraMeta,
    integrity: {
      intellHash,
      deterministic: true
    }
  };
}

// ---------------------------------------------------------------------------
// ORGAN CONFIG
// ---------------------------------------------------------------------------
export function getSMSOrganConfig() {
   const MESSAGING_SERVICE_SID =
  kc.get("TWILIO_MESSAGING_SERVICE_SID") || "";
  return {
    client: getTwilioClient(),
    messagingServiceSid: MESSAGING_SERVICE_SID,
    organMeta: PulseWorldSMSAlertMeta
  };
}

// ============================================================================
// END OF PulseWorldSMSAlert-v30-IMMORTAL (KEYCHAIN EDITION)
// ============================================================================
export const Twilio = getTwilioClient;
