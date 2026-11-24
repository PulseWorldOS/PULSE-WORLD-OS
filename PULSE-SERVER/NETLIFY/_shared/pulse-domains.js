// PULSE-SERVER/NETLIFY/_shared/pulse-domains.js
// Shared constants and helpers for PulseWorld Netlify serverless functions.
// Lives in a subdirectory so Netlify bundles it with callers without exposing it as a standalone endpoint.

import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

export const DEFAULT_EMAIL_DOMAIN = "pulseworld.net";

export const PULSE_EMAIL_DOMAINS = Object.freeze([
  "pulseworld.net",
  "pulseworld.me",
  "pulseworld.biz",
  "pulseworld.money",
  "binaryos.net",
  "booleanlogic.net",
  "gpuprocessing.net",
  "orbitalmap.net",
  "serviceworker.net"
]);

export const CORS_HEADERS = Object.freeze({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Requested-With, x-pulse-mode, x-pulse-inbound-secret, stripe-signature",
  "Content-Type": "application/json; charset=utf-8"
});

// Stripe Connect Express supported ISO 3166-1 alpha-2 country codes
export const STRIPE_CONNECT_SUPPORTED_COUNTRIES = new Set([
  "AE", "AT", "AU", "BE", "BG", "BR", "CA", "CH", "CY", "CZ",
  "DE", "DK", "EE", "ES", "FI", "FR", "GB", "GH", "GI", "GR",
  "HK", "HR", "HU", "ID", "IE", "IN", "IT", "JP", "KE", "LI",
  "LT", "LU", "LV", "MT", "MX", "MY", "NG", "NL", "NO", "NZ",
  "PL", "PT", "RO", "SE", "SG", "SI", "SK", "TH", "US", "ZA"
]);

export function jsonResponse(statusCode, payload, extraHeaders = {}) {
  return {
    statusCode,
    headers: { ...CORS_HEADERS, ...extraHeaders },
    body: JSON.stringify(payload)
  };
}

export function getAllowedEmailDomains() {
  const extraRaw = process.env.PULSE_ALLOWED_EMAIL_DOMAINS || "";
  const extra = extraRaw
    .split(",")
    .map((d) => normalizeRawDomain(d))
    .filter(Boolean);
  const merged = new Set([...PULSE_EMAIL_DOMAINS, ...extra]);
  return Array.from(merged);
}

export function normalizeRawDomain(input) {
  if (!input || typeof input !== "string") return "";
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "")
    .replace(/^@/, "");
}

export function resolveAllowedDomain(input) {
  const cleaned = normalizeRawDomain(input);
  const allowed = getAllowedEmailDomains();
  if (cleaned && allowed.includes(cleaned)) {
    return { domain: cleaned, valid: true };
  }
  return { domain: DEFAULT_EMAIL_DOMAIN, valid: !cleaned };
}

export function stripTimestamp(alias) {
  if (!alias || typeof alias !== "string") return "";
  return alias.replace(/-M#.*$/, "").trim();
}

export function normalizeIdentityName(name) {
  return stripTimestamp(String(name || ""))
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function sanitizeAliasHandle(rawName) {
  const base = stripTimestamp(String(rawName || ""))
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "")
    .replace(/[-_.]{2,}/g, "-")
    .replace(/^[-_.]+|[-_.]+$/g, "")
    .slice(0, 64);
  return base || "pulse-user";
}

export function buildAliasEmail(rawName, rawDomain) {
  const handle = sanitizeAliasHandle(rawName);
  const { domain } = resolveAllowedDomain(rawDomain);
  return `${handle}@${domain}`;
}

export function isPlaceholderName(name) {
  const cleaned = normalizeIdentityName(name);
  if (!cleaned || cleaned.length < 2) return true;
  return /^(unknown|unknown pulse user|guest|anonymous|none|null|undefined)$/i.test(cleaned);
}

export function isPlaceholderEmail(email) {
  const cleaned = String(email || "").trim().toLowerCase();
  if (!cleaned) return true;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned)) return true;
  if (
    cleaned === "youremail@domain.com" ||
    cleaned === "unknown@domain.com" ||
    cleaned.startsWith("unknown@") ||
    cleaned.startsWith("unknown pulse user@")
  ) {
    return true;
  }
  return false;
}

export function isValidStripeAccountId(val) {
  return typeof val === "string" && /^acct_[A-Za-z0-9]+$/.test(val.trim());
}

export function resolveStripeCountry(rawCountry) {
  const upper = String(rawCountry || "").trim().toUpperCase();
  if (upper && STRIPE_CONNECT_SUPPORTED_COUNTRIES.has(upper)) {
    return { country: upper, fallbackUsed: false, originalCountry: upper };
  }
  return {
    country: "US",
    fallbackUsed: Boolean(upper && upper !== "US"),
    originalCountry: upper || "US"
  };
}

export function maskEmail(email) {
  const str = String(email || "").trim();
  const at = str.indexOf("@");
  if (at <= 1) return str ? "***" : null;
  const local = str.slice(0, at);
  const domain = str.slice(at + 1);
  return `${local[0]}${"*".repeat(Math.min(local.length - 1, 5))}@${domain}`;
}

export function parseBody(event) {
  if (!event || !event.body) return {};
  try {
    const raw = event.isBase64Encoded
      ? Buffer.from(event.body, "base64").toString("utf8")
      : event.body;
    return JSON.parse(raw || "{}");
  } catch {
    return {};
  }
}

export function getHeader(event, name) {
  if (!event?.headers) return "";
  const target = name.toLowerCase();
  for (const [k, v] of Object.entries(event.headers)) {
    if (k.toLowerCase() === target) return v || "";
  }
  return "";
}

let _supabase = null;
export function getSupabaseAdmin() {
  if (!_supabase) {
    const url =
      process.env.SUPABASE_DATABASE_URL ||
      process.env.PulseWorld_SUPABASE_DATABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error(
        "Supabase env vars not set (SUPABASE_DATABASE_URL / SUPABASE_SERVICE_ROLE_KEY)"
      );
    }
    _supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false }
    });
  }
  return _supabase;
}

let _stripe = null;
export function getStripeClient() {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    throw new Error("STRIPE_SECRET_KEY is not configured in Netlify environment variables");
  }
  if (!_stripe) {
    _stripe = new Stripe(secret);
  }
  return _stripe;
}

export function normalizeE164(phone, defaultCountryCode = "+1") {
  const raw = String(phone || "").trim();
  if (!raw) return { ok: false, normalized: null, error: "Phone number is required" };
  if (/^\+[1-9]\d{6,14}$/.test(raw)) {
    return { ok: true, normalized: raw, error: null };
  }
  const digits = raw.replace(/\D/g, "");
  // Reject obvious fake placeholder numbers like (555) 555-5555
  if (/^5555555555$|^15555555555$|^0+$/.test(digits)) {
    return { ok: false, normalized: null, error: "Placeholder phone number cannot receive SMS" };
  }
  if (digits.length === 10 && defaultCountryCode === "+1") {
    return { ok: true, normalized: `+1${digits}`, error: null };
  }
  if (digits.length === 11 && digits.startsWith("1") && defaultCountryCode === "+1") {
    return { ok: true, normalized: `+${digits}`, error: null };
  }
  if (digits.length >= 7 && digits.length <= 15 && raw.startsWith("+")) {
    return { ok: true, normalized: `+${digits}`, error: null };
  }
  return {
    ok: false,
    normalized: null,
    error: "Invalid phone number — use E.164 format (e.g. +15551234567)"
  };
}
