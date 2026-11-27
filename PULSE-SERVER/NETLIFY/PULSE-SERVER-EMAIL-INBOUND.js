// PULSE-SERVER/NETLIFY/PULSE-SERVER-EMAIL-INBOUND.js
// Catch-All Inbound Reply Router across all 9 PulseWorld domains.
// Called by the Cloudflare Email Routing Worker (PULSE-SERVER/CLOUDFLARE/pulse-email-router-worker.js)
// or Brevo Inbound Parsing webhook whenever an external sender emails <alias>@<pulseworld-domain>.
//
// Privacy-First Routing:
//   1. Looks up <alias>@<domain> in Supabase public."PulseIdentity"
//   2. Resolves the user's real email via Stripe Connect (using their "stripeID")
//      or fallback attrs.userEmail in Supabase
//   3. Forwards the message privately via Brevo without exposing the user's real email!
//
// Required Netlify env vars:
//   INBOUND_EMAIL_SECRET      (shared secret header x-pulse-inbound-secret)
//   BREVO_API_KEY
//   SUPABASE_DATABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
// Optional env vars:
//   STRIPE_SECRET_KEY         (enables Stripe-backed real email lookup)
//   ADMIN_FALLBACK_EMAIL      (where aiovermind@ / admin@ / unmatched emails forward)

import crypto from "node:crypto";
import {
  DEFAULT_EMAIL_DOMAIN,
  getHeader,
  getStripeClient,
  getSupabaseAdmin,
  isPlaceholderEmail,
  isValidStripeAccountId,
  jsonResponse,
  maskEmail,
  parseBody,
  resolveAllowedDomain,
  sanitizeAliasHandle
} from "./_shared/pulse-domains.js";

const ADMIN_ALIASES = new Set([
  "aiovermind",
  "aiovermindprime",
  "admin",
  "support",
  "postmaster",
  "hello",
  "info",
  "security",
  "billing"
]);

function safeCompareSecret(provided, expected) {
  if (!provided || !expected) return false;
  const a = Buffer.from(String(provided));
  const b = Buffer.from(String(expected));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function extractEmailAddress(raw) {
  if (!raw) return "";
  const str = String(raw).trim();
  const angle = str.match(/<([^>]+)>/);
  return (angle ? angle[1] : str).trim().toLowerCase();
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function resolveAliasDestination(recipientEmail) {
  const cleanRecipient = extractEmailAddress(recipientEmail);
  const atIdx = cleanRecipient.indexOf("@");
  if (atIdx <= 0) {
    return { found: false, reason: "invalid_recipient" };
  }

  const rawHandle = cleanRecipient.slice(0, atIdx);
  const rawDomain = cleanRecipient.slice(atIdx + 1);
  const { domain, valid } = resolveAllowedDomain(rawDomain);
  if (!valid) {
    return { found: false, reason: "unauthorized_domain", domain: rawDomain };
  }

  const handle = sanitizeAliasHandle(rawHandle).toLowerCase();

  // Check admin system aliases first
  if (ADMIN_ALIASES.has(handle) && process.env.ADMIN_FALLBACK_EMAIL) {
    return {
      found: true,
      routeType: "admin_alias",
      aliasEmail: `${handle}@${domain}`,
      domain,
      destinationEmail: process.env.ADMIN_FALLBACK_EMAIL.trim().toLowerCase(),
      ownerName: "PulseWorld Admin"
    };
  }

  const supabase = getSupabaseAdmin();
  let matched = null;

  // 1. Exact aliasEmail match
  const { data: byFull } = await supabase
    .from("PulseIdentity")
    .select("*")
    .ilike("attrs->>aliasEmail", `${handle}@${domain}`)
    .maybeSingle();
  matched = byFull || null;

  // 2. Match by aliasHandle across any of the 9 PulseWorld domains
  if (!matched) {
    const { data: byHandle } = await supabase
      .from("PulseIdentity")
      .select("*")
      .ilike("attrs->>aliasHandle", handle)
      .limit(5);
    if (Array.isArray(byHandle) && byHandle.length > 0) {
      matched =
        byHandle.find(
          (r) => String(r.attrs?.emailDomain || "").toLowerCase() === domain
        ) || byHandle[0];
    }
  }

  // 3. Fallback match by Identity Name (handles spaces vs hyphens like "Lockstep Router")
  if (!matched) {
    const { data: byName } = await supabase
      .from("PulseIdentity")
      .select("*")
      .or(`name.ilike.${handle},name.ilike.${handle.replace(/-/g, " ")}`)
      .limit(5);
    if (Array.isArray(byName) && byName.length > 0) {
      matched = byName[0];
    }
  }

  if (!matched) {
    if (process.env.ADMIN_FALLBACK_EMAIL) {
      return {
        found: true,
        routeType: "catchall_admin_fallback",
        aliasEmail: `${handle}@${domain}`,
        domain,
        destinationEmail: process.env.ADMIN_FALLBACK_EMAIL.trim().toLowerCase(),
        ownerName: "PulseWorld Catch-All Admin"
      };
    }
    return { found: false, reason: "alias_not_found", aliasEmail: `${handle}@${domain}` };
  }

  // Resolve real destination email (Privacy-First: check Stripe via stripeID first, then Supabase attrs)
  let destinationEmail = null;
  let emailSource = null;

  const stripeID = isValidStripeAccountId(matched.stripeID)
    ? matched.stripeID.trim()
    : isValidStripeAccountId(matched.attrs?.tokenID)
      ? matched.attrs.tokenID.trim()
      : null;

  if (stripeID && process.env.STRIPE_SECRET_KEY) {
    try {
      const stripe = getStripeClient();
      const acct = await stripe.accounts.retrieve(stripeID);
      if (acct?.email && !isPlaceholderEmail(acct.email)) {
        destinationEmail = acct.email.trim().toLowerCase();
        emailSource = "stripe_connect";
      }
    } catch (stripeErr) {
      console.warn("[PULSE-INBOUND] Stripe email lookup fallback:", stripeErr.message);
    }
  }

  if (!destinationEmail && !isPlaceholderEmail(matched.attrs?.userEmail)) {
    destinationEmail = matched.attrs.userEmail.trim().toLowerCase();
    emailSource = "supabase_attrs";
  }

  if (!destinationEmail && !isPlaceholderEmail(matched.attrs?.realEmail)) {
    destinationEmail = matched.attrs.realEmail.trim().toLowerCase();
    emailSource = "supabase_real_email";
  }

  if (!destinationEmail) {
    return {
      found: false,
      reason: "owner_has_no_real_email",
      aliasEmail: `${handle}@${domain}`,
      ownerName: matched.name
    };
  }

  return {
    found: true,
    routeType: "user_alias",
    emailSource,
    aliasEmail: `${handle}@${domain}`,
    domain,
    destinationEmail,
    ownerName: matched.name || handle,
    userID: matched.userID
  };
}

function pickPulseRecipient(item) {
  const candidates = [
    ...(Array.isArray(item.To) ? item.To.map((t) => t?.Address || t) : []),
    ...(Array.isArray(item.Cc) ? item.Cc.map((c) => c?.Address || c) : []),
    item.DeliveredTo,
    item.Recipient
  ].filter(Boolean);

  for (const addr of candidates) {
    const clean = extractEmailAddress(addr);
    const at = clean.indexOf("@");
    if (at > 0 && resolveAllowedDomain(clean.slice(at + 1)).valid) {
      return clean;
    }
  }
  return extractEmailAddress(candidates[0] || "");
}

function normalizeInboundItems(body) {
  // Support Brevo Inbound Parsing webhook format ({ items: [...] })
  if (Array.isArray(body.items)) {
    return body.items.map((item) => ({
      to: pickPulseRecipient(item),
      from: item.From?.Address || "",
      fromName: item.From?.Name || "",
      subject: item.Subject || "(No Subject)",
      text: item.RawTextBody || item.ExtractedMarkdownMessage || "",
      html: item.RawHtmlBody || "",
      messageId: item.MessageId || null
    }));
  }

  // Standard Cloudflare Email Worker JSON payload
  return [
    {
      to: body.to || body.recipient || "",
      from: body.from || body.sender || "",
      fromName: body.fromName || "",
      subject: body.subject || "(No Subject)",
      text: body.text || body.rawText || "",
      html: body.html || "",
      messageId: body.messageId || null
    }
  ];
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(200, { ok: true });
  }

  const expectedSecret = process.env.INBOUND_EMAIL_SECRET;
  const providedSecret =
    getHeader(event, "x-pulse-inbound-secret") ||
    event.queryStringParameters?.secret ||
    "";

  if (!expectedSecret) {
    return jsonResponse(503, {
      ok: false,
      error: "INBOUND_EMAIL_SECRET is not configured in Netlify environment variables."
    });
  }

  if (!safeCompareSecret(providedSecret, expectedSecret)) {
    return jsonResponse(401, { ok: false, error: "Unauthorized inbound webhook request" });
  }

  // Dry-run diagnostic mode: GET ?testAlias=Lockstep-Router@pulseworld.net
  if (event.httpMethod === "GET") {
    const testAlias = event.queryStringParameters?.testAlias || "";
    if (!testAlias) {
      return jsonResponse(200, {
        ok: true,
        status: "ready",
        brevoConfigured: Boolean(process.env.BREVO_API_KEY)
      });
    }
    const resolution = await resolveAliasDestination(testAlias);
    return jsonResponse(200, {
      ok: true,
      dryRun: true,
      found: resolution.found,
      routeType: resolution.routeType || null,
      emailSource: resolution.emailSource || null,
      aliasEmail: resolution.aliasEmail || testAlias,
      destinationMasked: resolution.destinationEmail
        ? maskEmail(resolution.destinationEmail)
        : null,
      reason: resolution.reason || null
    });
  }

  const brevoApiKey = process.env.BREVO_API_KEY;
  if (!brevoApiKey) {
    return jsonResponse(503, {
      ok: false,
      error: "BREVO_API_KEY is not configured — cannot forward inbound reply."
    });
  }

  try {
    const body = parseBody(event);
    const items = normalizeInboundItems(body);
    const results = [];

    for (const msg of items) {
      const resolution = await resolveAliasDestination(msg.to);
      if (!resolution.found) {
        results.push({
          ok: false,
          to: msg.to,
          routed: false,
          reason: resolution.reason
        });
        continue;
      }

      const originalSender = extractEmailAddress(msg.from);
      if (!originalSender || isPlaceholderEmail(originalSender)) {
        results.push({ ok: false, to: msg.to, routed: false, reason: "invalid_sender" });
        continue;
      }

      // Prevent forwarding loops
      if (originalSender === resolution.destinationEmail) {
        results.push({ ok: true, to: msg.to, routed: false, reason: "loop_prevented" });
        continue;
      }

      const senderLabel = msg.fromName
        ? `${msg.fromName} (${originalSender})`
        : originalSender;

      const relayFromEmail = resolution.aliasEmail || `relay@${DEFAULT_EMAIL_DOMAIN}`;
      const bodyHtml = msg.html
        ? msg.html
        : `<pre style="white-space:pre-wrap; font-family:inherit; line-height:1.6;">${escapeHtml(msg.text || "(Empty message)")}</pre>`;

      const wrappedHtml = `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; max-width:640px; margin:0 auto;">
          <div style="background:#0f172a; color:#7dd3fc; padding:12px 16px; border-radius:10px 10px 0 0; font-size:13px;">
            <strong>PulseWorld Alias Relay</strong> • Message to <strong>${escapeHtml(resolution.aliasEmail)}</strong><br/>
            <span style="color:#cbd5e1;">From: ${escapeHtml(senderLabel)}</span>
          </div>
          <div style="padding:18px; border:1px solid #cbd5e1; border-top:none; border-radius:0 0 10px 10px; background:#ffffff; color:#111827;">
            ${bodyHtml}
          </div>
        </div>
      `;

      const forwardPayload = {
        sender: {
          name: `${msg.fromName || originalSender} via PulseWorld`,
          email: relayFromEmail
        },
        to: [{ email: resolution.destinationEmail, name: resolution.ownerName }],
        replyTo: { email: originalSender, name: msg.fromName || originalSender },
        subject: `[${resolution.aliasEmail}] ${msg.subject}`,
        htmlContent: wrappedHtml,
        textContent: `PulseWorld Alias Relay (${resolution.aliasEmail})\nFrom: ${senderLabel}\n\n${msg.text || ""}`,
        headers: {
          "X-PulseWorld-Routed-For": resolution.aliasEmail,
          "X-PulseWorld-Route-Type": resolution.routeType
        }
      };

      const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": brevoApiKey
        },
        body: JSON.stringify(forwardPayload)
      });

      const brevoData = await brevoRes.json().catch(() => ({}));
      results.push({
        ok: brevoRes.ok,
        routed: brevoRes.ok,
        alias: resolution.aliasEmail,
        routeType: resolution.routeType,
        destinationMasked: maskEmail(resolution.destinationEmail),
        messageId: brevoData.messageId || null,
        error: brevoRes.ok ? null : brevoData.message || `HTTP ${brevoRes.status}`
      });
    }

    return jsonResponse(200, { ok: true, processed: results.length, results });
  } catch (err) {
    console.error("❌ [PULSE-INBOUND] Unhandled error:", err);
    return jsonResponse(500, { ok: false, error: err.message });
  }
}
