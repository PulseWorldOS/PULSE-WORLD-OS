// PULSE-SERVER/NETLIFY/PULSE-SERVER-EMAIL.js
// Multi-Domain Dynamic Email Alias Sender via Brevo Transactional REST API.
// Zero hardcoded credentials; works on Node 20/22 with native fetch across all PulseWorld domains.
// Required Netlify env var:
//   BREVO_API_KEY
// Optional env vars:
//   PULSE_ALLOWED_EMAIL_DOMAINS (comma-separated extra domains beyond the 9 PulseWorld domains)
//   PULSE_DEFAULT_FROM_ALIAS    (default: AIOvermindPrime)

import {
  DEFAULT_EMAIL_DOMAIN,
  getAllowedEmailDomains,
  getSupabaseAdmin,
  isPlaceholderEmail,
  isValidStripeAccountId,
  jsonResponse,
  parseBody,
  resolveAllowedDomain,
  sanitizeAliasHandle,
  stripTimestamp
} from "./_shared/pulse-domains.js";

function parseAddressList(value) {
  if (!value) return [];
  const rawList = Array.isArray(value) ? value : String(value).split(/[;,]+/);
  return rawList
    .map((item) => {
      if (typeof item === "object" && item?.email) {
        return { email: String(item.email).trim().toLowerCase(), name: item.name || undefined };
      }
      const str = String(item || "").trim();
      const angle = str.match(/^(.*)<([^>]+)>$/);
      if (angle) {
        return {
          name: angle[1].trim().replace(/^["']|["']$/g, "") || undefined,
          email: angle[2].trim().toLowerCase()
        };
      }
      return { email: str.toLowerCase() };
    })
    .filter((entry) => entry.email && !isPlaceholderEmail(entry.email));
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildBrandedHtml({ mode, fromDisplay, fromEmail, subject, htmlBody, textBody, templateId }) {
  const innerContent =
    htmlBody && String(htmlBody).trim()
      ? htmlBody
      : `<p style="white-space:pre-wrap; line-height:1.6;">${escapeHtml(textBody || "")}</p>`;

  if (mode === "raw") {
    return innerContent;
  }

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; max-width:640px; margin:0 auto; padding:24px; background:#0b0f17; color:#e6f4ff; border-radius:14px; border:1px solid #1d2d44;">
      <div style="text-align:center; margin-bottom:18px;">
        <img
          src="https://www.pulseworld.net/_EXPRESSIONS/_PICTURES/PulseWorldOSLogo.webp.pex"
          alt="PulseWorld OS"
          style="width:72px; height:auto; border-radius:12px;"
        />
        <div style="font-size:12px; color:#5eead4; letter-spacing:1.2px; text-transform:uppercase; margin-top:8px;">
          PulseWorld OS • ${mode === "admin" ? "Admin Dispatch" : "Digital Identity Mail"}
        </div>
      </div>

      <div style="background:#111827; padding:18px 20px; border-radius:10px; border:1px solid #1f2937; color:#f3f4f6; line-height:1.6;">
        ${innerContent}
      </div>

      <div style="margin-top:18px; padding-top:12px; border-top:1px solid #1f2937; font-size:12px; color:#9ca3af;">
        <div><strong>Sent From:</strong> ${escapeHtml(fromDisplay)} &lt;${escapeHtml(fromEmail)}&gt;</div>
        ${templateId && mode === "admin" ? `<div><strong>Template:</strong> ${escapeHtml(templateId)}</div>` : ""}
        <div style="margin-top:6px;">
          Replying to this message routes privately through PulseWorld Identity Alias Relay — your personal email stays protected.
        </div>
      </div>
    </div>
  `;
}

async function resolveSavedIdentityAlias({ localId, stripeID }) {
  if (!localId && !isValidStripeAccountId(stripeID)) return null;
  try {
    const supabase = getSupabaseAdmin();
    let row = null;
    if (isValidStripeAccountId(stripeID)) {
      const { data } = await supabase
        .from("PulseIdentity")
        .select("name, email, attrs")
        .eq("stripeID", stripeID.trim())
        .maybeSingle();
      row = data || null;
    }
    if (!row && localId) {
      const { data } = await supabase
        .from("PulseIdentity")
        .select("name, email, attrs")
        .eq("attrs->>localId", localId)
        .maybeSingle();
      row = data || null;
    }
    if (!row) return null;
    return {
      name: stripTimestamp(row.name || row.attrs?.name || ""),
      aliasHandle: row.attrs?.aliasHandle || sanitizeAliasHandle(row.name || ""),
      emailDomain: row.attrs?.emailDomain || DEFAULT_EMAIL_DOMAIN
    };
  } catch (err) {
    console.warn("[PULSE-EMAIL] Supabase alias lookup skipped:", err.message);
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

  // Status / readiness endpoint (zero secrets exposed)
  if (body.action === "status" || event.httpMethod === "GET") {
    return jsonResponse(200, {
      ok: true,
      provider: "brevo",
      configured: Boolean(process.env.BREVO_API_KEY),
      defaultDomain: DEFAULT_EMAIL_DOMAIN,
      domains: getAllowedEmailDomains()
    });
  }

  try {
    const brevoApiKey = process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      return jsonResponse(503, {
        ok: false,
        success: false,
        error:
          "Email relay is not configured yet — add BREVO_API_KEY in Netlify Environment Variables."
      });
    }

    const templateId = body.templateId || "PulseCustomMessage";
    const payload = body.payload && typeof body.payload === "object" ? body.payload : body;
    const mode = body.mode || payload.mode || (templateId === "PulseCustomMessage" ? "user" : "admin");

    const toList = parseAddressList(payload.to || body.to || payload.email || body.email);
    const ccList = parseAddressList(payload.cc || body.cc);

    if (!toList.length) {
      return jsonResponse(400, {
        ok: false,
        success: false,
        error: "Please enter a valid recipient email address in the 'To' field."
      });
    }

    const subject = String(
      payload.subject || body.subject || `PulseWorld Message (${templateId})`
    ).trim();
    const htmlBody = payload.html || body.html || "";
    const textBody =
      payload.text ||
      body.text ||
      (htmlBody ? String(htmlBody).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "");

    if (!htmlBody && !textBody) {
      return jsonResponse(400, {
        ok: false,
        success: false,
        error: "Email body cannot be empty."
      });
    }

    // Resolve sender alias & domain (supports all 9 PulseWorld domains dynamically)
    const savedAlias = await resolveSavedIdentityAlias({
      localId: body.localId || payload.localId || payload.meta?.localId || null,
      stripeID: body.stripeID || payload.stripeID || payload.meta?.stripeID || null
    });

    const rawFromAlias =
      body.fromAlias ||
      payload.fromAlias ||
      (typeof payload.from === "string" && payload.from.includes("@")
        ? payload.from.split("@")[0]
        : null) ||
      savedAlias?.aliasHandle ||
      (mode === "admin" ? process.env.PULSE_DEFAULT_FROM_ALIAS || "AIOvermindPrime" : "PulseUser");

    const rawFromDomain =
      body.fromDomain ||
      payload.fromDomain ||
      (typeof payload.from === "string" && payload.from.includes("@")
        ? payload.from.split("@")[1]
        : null) ||
      savedAlias?.emailDomain ||
      DEFAULT_EMAIL_DOMAIN;

    const { domain: verifiedDomain, valid: domainAllowed } = resolveAllowedDomain(rawFromDomain);
    if (!domainAllowed) {
      return jsonResponse(403, {
        ok: false,
        success: false,
        error: `Domain "${rawFromDomain}" is not in the authorized PulseWorld email domain list.`,
        allowedDomains: getAllowedEmailDomains()
      });
    }

    const aliasHandle = sanitizeAliasHandle(rawFromAlias);
    const fromEmail = `${aliasHandle}@${verifiedDomain}`;
    const fromDisplay =
      String(
        body.fromName ||
          payload.fromName ||
          savedAlias?.name ||
          (mode === "admin" ? "PulseWorld Overmind" : aliasHandle)
      ).trim() || aliasHandle;

    // Reply-To defaults to the user's dynamic PulseWorld alias so replies hit Catch-All routing
    // and never expose the user's private email address!
    // Note: pulseworld.net keeps its GoDaddy/Proofpoint MX for AIOvermind@pulseworld.net, so
    // non-admin user aliases on pulseworld.net route replies via @pulseworld.me (our Catch-All
    // identity domain), which resolves the exact same aliasHandle back to the user privately.
    const customReplyTo = parseAddressList(body.replyTo || payload.replyTo)[0] || null;
    const defaultReplyEmail =
      verifiedDomain === "pulseworld.net" && mode !== "admin"
        ? `${aliasHandle}@pulseworld.me`
        : fromEmail;
    const replyToObj = customReplyTo || { email: defaultReplyEmail, name: fromDisplay };

    const finalHtml = buildBrandedHtml({
      mode,
      fromDisplay,
      fromEmail,
      subject,
      htmlBody,
      textBody,
      templateId
    });

    const brevoPayload = {
      sender: { name: fromDisplay, email: fromEmail },
      to: toList,
      ...(ccList.length ? { cc: ccList } : {}),
      replyTo: replyToObj,
      subject,
      htmlContent: finalHtml,
      textContent: textBody || subject,
      headers: {
        "X-PulseWorld-Alias": fromEmail,
        "X-PulseWorld-Template": String(templateId)
      }
    };

    const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": brevoApiKey
      },
      body: JSON.stringify(brevoPayload)
    });

    const brevoData = await brevoRes.json().catch(() => ({}));

    if (!brevoRes.ok) {
      console.error("❌ [PULSE-EMAIL] Brevo API error:", brevoRes.status, brevoData);
      return jsonResponse(brevoRes.status >= 400 && brevoRes.status < 600 ? brevoRes.status : 502, {
        ok: false,
        success: false,
        provider: "brevo",
        from: fromEmail,
        error:
          brevoData.message ||
          `Brevo rejected email send (HTTP ${brevoRes.status}). Verify DNS/DKIM for ${verifiedDomain} in Brevo.`
      });
    }

    return jsonResponse(200, {
      ok: true,
      success: true,
      provider: "brevo",
      messageId: brevoData.messageId || null,
      from: fromEmail,
      fromName: fromDisplay,
      replyTo: replyToObj.email,
      to: toList.map((r) => r.email),
      domain: verifiedDomain
    });
  } catch (err) {
    console.error("❌ [PULSE-EMAIL] Unhandled error:", err);
    return jsonResponse(500, {
      ok: false,
      success: false,
      error: err.message
    });
  }
}
