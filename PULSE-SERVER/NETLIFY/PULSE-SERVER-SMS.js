// PULSE-SERVER/NETLIFY/PULSE-SERVER-SMS.js
// Secure Twilio SMS Netlify Serverless Function (Node 20 native fetch — zero client secrets).
// Required Netlify env vars:
//   TWILIO_ACCOUNT_SID
//   TWILIO_AUTH_TOKEN
//   TWILIO_MESSAGING_SERVICE_SID  (recommended) OR TWILIO_FROM_NUMBER (e.g. +15551234567)

import {
  getSupabaseAdmin,
  isValidStripeAccountId,
  jsonResponse,
  normalizeE164,
  parseBody
} from "./_shared/pulse-domains.js";

async function lookupPhoneFromIdentity({ stripeID, localId }) {
  if (!isValidStripeAccountId(stripeID) && !localId) return null;
  try {
    const supabase = getSupabaseAdmin();
    let row = null;
    if (isValidStripeAccountId(stripeID)) {
      const { data } = await supabase
        .from("PulseIdentity")
        .select("phone, attrs")
        .eq("stripeID", stripeID.trim())
        .maybeSingle();
      row = data || null;
    }
    if (!row && localId) {
      const { data } = await supabase
        .from("PulseIdentity")
        .select("phone, attrs")
        .eq("attrs->>localId", localId)
        .maybeSingle();
      row = data || null;
    }
    if (!row) return null;
    return {
      phone: row.phone || row.attrs?.phone || null,
      smsOpt: row.attrs?.smsOpt ?? true
    };
  } catch (err) {
    console.warn("[PULSE-SMS] Identity phone lookup warning:", err.message);
    return null;
  }
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(200, { ok: true });
  }

  const body =
    event.httpMethod === "GET"
      ? event.queryStringParameters || {}
      : parseBody(event);

  const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
  const authToken = process.env.TWILIO_AUTH_TOKEN || "";
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID || "";
  const fromNumber = process.env.TWILIO_FROM_NUMBER || "";
  const configured = Boolean(accountSid && authToken && (messagingServiceSid || fromNumber));

  // Readiness check (zero secrets exposed)
  if (body.action === "status" || event.httpMethod === "GET") {
    return jsonResponse(200, {
      ok: true,
      provider: "twilio",
      configured,
      hasAccountSid: Boolean(accountSid),
      hasAuthToken: Boolean(authToken),
      hasMessagingServiceSid: Boolean(messagingServiceSid),
      hasFromNumber: Boolean(fromNumber)
    });
  }

  if (!configured) {
    return jsonResponse(503, {
      ok: false,
      success: false,
      error:
        "Twilio SMS is not configured yet — add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_MESSAGING_SERVICE_SID (or TWILIO_FROM_NUMBER) in Netlify Environment Variables."
    });
  }

  let rawTo = body.to || body.phone || "";
  const messageText = String(body.body || body.message || body.text || "").trim();

  if (!messageText) {
    return jsonResponse(400, {
      ok: false,
      success: false,
      error: "SMS message body is required."
    });
  }

  if (messageText.length > 1600) {
    return jsonResponse(400, {
      ok: false,
      success: false,
      error: "SMS message exceeds 1600 characters."
    });
  }

  // Optional privacy-first lookup by stripeID or localId if `to` was not passed
  if (!rawTo && (body.stripeID || body.localId)) {
    const resolved = await lookupPhoneFromIdentity({
      stripeID: body.stripeID,
      localId: body.localId
    });
    if (!resolved?.phone) {
      return jsonResponse(404, {
        ok: false,
        success: false,
        error: "No phone number found for the requested PulseWorld identity."
      });
    }
    if (resolved.smsOpt === false && !body.bypassOptIn) {
      return jsonResponse(403, {
        ok: false,
        success: false,
        error: "User has SMS notifications opted out."
      });
    }
    rawTo = resolved.phone;
  }

  const normalized = normalizeE164(rawTo, body.defaultCountryCode || "+1");
  if (!normalized.ok) {
    return jsonResponse(400, {
      ok: false,
      success: false,
      error: normalized.error
    });
  }

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(accountSid)}/Messages.json`;
    const form = new URLSearchParams();
    form.append("To", normalized.normalized);
    form.append("Body", messageText);

    if (messagingServiceSid) {
      form.append("MessagingServiceSid", messagingServiceSid);
    } else if (fromNumber) {
      form.append("From", fromNumber);
    }

    const authHeader = "Basic " + Buffer.from(`${accountSid}:${authToken}`).toString("base64");

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: form.toString()
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("❌ [PULSE-SMS] Twilio REST error:", res.status, data);
      return jsonResponse(res.status >= 400 && res.status < 600 ? res.status : 502, {
        ok: false,
        success: false,
        twilioCode: data.code || null,
        error: data.message || `Twilio API error (HTTP ${res.status})`
      });
    }

    return jsonResponse(200, {
      ok: true,
      success: true,
      sid: data.sid,
      status: data.status,
      to: data.to || normalized.normalized,
      kind: body.kind || "generic"
    });
  } catch (err) {
    console.error("❌ [PULSE-SMS] Unhandled error:", err);
    return jsonResponse(500, {
      ok: false,
      success: false,
      error: err.message
    });
  }
}
