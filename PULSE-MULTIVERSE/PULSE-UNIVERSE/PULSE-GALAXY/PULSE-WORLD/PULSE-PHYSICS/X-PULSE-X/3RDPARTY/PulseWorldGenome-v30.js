// ============================================================================
// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSEWORLD/X-PULSE-X/PulseWorldGenome-v30-IMMORTAL-ONEBAND.js
// ROLE: v30+ ONE-BAND WORLD GENOME ORGAN
//   • World data genome (Firebase / SQL / mock) — ONE-BAND aware
//   • Social graph v30 — presence/earn/skills/trust/identity
//   • World helpers (geo, comms, payouts, hashing, routing) — routed + cached
//   • Binary-aware IntellHash + buffer fetch
//   • Deterministic, drift-proof, dual-band → ONE-BAND projection
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

import { PulseVitalsLogger as logger, PulseVitalsMonitor, pulseLog, PulseUIFlow as initUIFlow, setdoc, getdoc, doc, log, warn, error} from "../../../../../../_PROOF/PULSE-PROOF.js";
import { PulseSpecsDNAGenome } from "../../PULSE-SPECS/PulseSpecsDNAGenome-v30.js";
import { db } from "./PulseWorldFirebaseGenome-v30.js";
import {PulseTranslatorRNAIntake} from "../../PULSE-TRANSLATOR/PulseTranslatorRNAIntake-v30.js";
import {PulseTranslatorRNAOutput} from "../../PULSE-TRANSLATOR/PulseTranslatorRNAOutput-v30.js";
import {PulseTranslatorSkeletalIntake} from "../../PULSE-TRANSLATOR/PulseTranslatorSkeletalIntake-v30.js";
import {PulseTranslatorSkeletalOutput} from "../../PULSE-TRANSLATOR/PulseTranslatorSkeletalOutput-v30.js";

// Social graph organ (v30 IMMORTAL-ADV++)
import { createPulseWorldSocialGraphV30 as createPulseWorldSocialGraph } from "../PulseWorldSocialGraph-v30.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
// META — v30 ONE-BAND
// ============================================================================
export const PulseWorldGenomeMeta = Object.freeze({
  layer: "PulseWorldGenome",
  role: "WORLD_GENOME",
  version: "v30-IMMORTAL-ONEBAND",
  evo: {
    dualBand: true,
    oneBand: true,
    firebaseGenomeAware: true,
    sqlGenomeAware: true,
    socialGraphAware: true,
    geoAware: true,
    payoutsAware: true,
    intellHashAware: true,
    driftProof: true,
    cacheAware: true,
    binaryAware: true
  }
});


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
export function onCall(handler) {
  return async function(input) {
    try {
      return await handler(input);
    } catch (err) {
      return { success: false, error: String(err.message || err) };
    }
  };
}

export const deleteField = () => ({ nullValue: null });

// ============================================================================
// LOCAL CACHES (WORLD-LAYER)
// ============================================================================
const helperCache = new Map();
const geoCache = new Map();
const staticMapCache = new Map();
const intellHashCache = new Map();
const worldDocCache = new Map();

// ============================================================================
// WORLD ROUTING — NO RAW FETCH FOR JSON (ONE-BAND ROUTER)
// ============================================================================
async function routeThroughWorldEngine(task, payload) {
  const router =
    PulseRealm.PulseWorldRealityr ||
    PulseRealm.route ||
    null;

  if (!router || typeof router !== "function") {
    throw new Error("World routing not available (PulseWorldRealityr/route missing)");
  }

  return router(task, {
    ...payload,
    oneBand: true,
    binaryAware: true,
    dualBand: true,
    reflexOrigin: "PulseWorldGenome-v30",
    layer: "B2"
  });
}

export async function safeFetchJson(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const routed = await routeThroughWorldEngine("fetchExternalResource", {
      url,
      method: options.method || "GET",
      headers: options.headers || {},
      body: options.body || null,
      timeout: 15000
    });

    clearTimeout(timeout);

    if (!routed || routed.ok === false) {
      throw new Error(routed.error || `Routed fetch failed for ${url}`);
    }

    return routed.data || routed.body || routed.result || null;
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
}

// ============================================================================
// GOOGLE HELPERS (PLACES + GEOCODING) — ROUTED + CACHED
// ============================================================================
export async function searchPlacesText(query, apiKey) {
  const cacheKey = `places:${query}`;
  if (geoCache.has(cacheKey)) return geoCache.get(cacheKey);

  const url = "https://places.googleapis.com/v1/places:searchText";
  const body = { textQuery: query, languageCode: "en" };

  const res = await safeFetchJson(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey
    },
    body: JSON.stringify(body)
  });

  const places = res.places || [];
  geoCache.set(cacheKey, places);
  return places;
}

export async function geocodeAddress(address, apiKey) {
  const cacheKey = `geocode:${address}`;
  if (geoCache.has(cacheKey)) return geoCache.get(cacheKey);

  const url =
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  const data = await safeFetchJson(url);
  const result = (!data.results || data.results.length === 0) ? null : data.results[0];

  geoCache.set(cacheKey, result);
  return result;
}

// ============================================================================
// FUZZY GEOCODER (Belize-biased) — unchanged semantics, v30 meta
// ============================================================================
export async function fuzzyGeocode(venue, apiKey, knownLat = null, knownLng = null) {
  const cleaned = venue.trim();
  const cacheKey = `fuzzy:${cleaned}|${knownLat || ""}|${knownLng || ""}`;
  if (geoCache.has(cacheKey)) return geoCache.get(cacheKey);

  const attempts = [
    `${cleaned} San Pedro Belize`,
    `${cleaned} Ambergris Caye`,
    `${cleaned} Belize`,
    cleaned
  ];

  const haversine = (lat1, lng1, lat2, lng2) => {
    const R = 6371000;
    const toRad = x => x * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  for (const query of attempts) {
    const results = await searchPlacesText(query, apiKey);
    if (!results.length) continue;

    const candidates = results.filter(r => {
      if (!r.types) return false;
      if (
        r.types.includes("locality") ||
        r.types.includes("political") ||
        r.types.includes("sublocality") ||
        r.types.includes("neighborhood") ||
        r.types.includes("administrative_area_level_1") ||
        r.types.includes("administrative_area_level_2")
      ) return false;

      return r.types.some(t =>
        t === "bar" ||
        t === "restaurant" ||
        t === "night_club" ||
        t === "cafe" ||
        t === "point_of_interest" ||
        t === "establishment"
      );
    });

    if (!candidates.length) continue;

    let business = null;

    if (knownLat && knownLng) {
      let closest = null;
      let closestDist = Infinity;

      for (const r of candidates) {
        const lat = r.location.latitude;
        const lng = r.location.longitude;
        const dist = haversine(knownLat, knownLng, lat, lng);
        if (dist < closestDist) {
          closestDist = dist;
          closest = r;
        }
      }

      if (closest && closestDist <= 3000) {
        business = closest;
      } else {
        continue;
      }
    } else {
      business = candidates[0];
    }

    let finalPlaceId = business.id;
    let lat = business.location.latitude;
    let lng = business.location.longitude;

    try {
      const canonical = await safeFetchJson(
        `https://places.googleapis.com/v1/places/${finalPlaceId}?fields=*`,
        {
          method: "GET",
          headers: { "X-Goog-Api-Key": apiKey }
        }
      );
      if (canonical.id) finalPlaceId = canonical.id;
    } catch {
      // ignore canonical failure
    }

    const result = {
      formatted_address: business.formattedAddress,
      geometry: { location: { lat, lng } },
      place_id: finalPlaceId
    };

    geoCache.set(cacheKey, result);
    return result;
  }

  for (const query of attempts) {
    const geo = await geocodeAddress(query, apiKey);
    if (!geo) continue;

    if (knownLat && knownLng) {
      const lat = geo.geometry.location.lat;
      const lng = geo.geometry.location.lng;
      const dist = haversine(knownLat, knownLng, lat, lng);

      if (dist > 150) {
        const result = {
          formatted_address: geo.formatted_address,
          geometry: { location: { lat: knownLat, lng: knownLng } },
          place_id: null
        };
        geoCache.set(cacheKey, result);
        return result;
      }
    }

    geoCache.set(cacheKey, geo);
    return geo;
  }

  if (knownLat && knownLng) {
    const result = {
      formatted_address: venue,
      geometry: { location: { lat: knownLat, lng: knownLng } },
      place_id: null
    };
    geoCache.set(cacheKey, result);
    return result;
  }

  geoCache.set(cacheKey, null);
  return null;
}

// ============================================================================
// STATIC MAP URL (CACHED)
// ============================================================================
export function buildStaticMapUrl(lat, lng, placeId, key, label = "") {
  const cacheKey = `static:${lat}|${lng}|${placeId || ""}|${label || ""}`;
  if (staticMapCache.has(cacheKey)) return staticMapCache.get(cacheKey);

  const base =
    `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}` +
    `&zoom=17&size=600x400&scale=2&maptype=roadmap`;

  let url;
  if (placeId) {
    url = `${base}&markers=color:red|place_id:${placeId}&key=${key}`;
  } else {
    const labelPart = label
      ? `&markers=color:red|label:${encodeURIComponent(label)}|${lat},${lng}`
      : `&markers=color:red|${lat},${lng}`;
    url = `${base}${labelPart}&key=${key}`;
  }

  staticMapCache.set(cacheKey, url);
  return url;
}

// ============================================================================
// GEO PROFILE + TRIP HELPERS
// ============================================================================
export async function buildGeoProfile({ venue, apiKey, knownLat = null, knownLng = null, label = "" }) {
  const fuzzy = await fuzzyGeocode(venue, apiKey, knownLat, knownLng);
  if (!fuzzy) {
    return {
      ok: false,
      reason: "NO_GEO_MATCH",
      venue,
      mapUrl: null,
      center: null
    };
  }

  const lat = fuzzy.geometry.location.lat;
  const lng = fuzzy.geometry.location.lng;
  const mapUrl = buildStaticMapUrl(lat, lng, fuzzy.place_id, apiKey, label || "T");

  return {
    ok: true,
    venue,
    formattedAddress: fuzzy.formatted_address,
    placeId: fuzzy.place_id,
    center: { lat, lng },
    mapUrl
  };
}

export function buildTripSummary({ originCountry, destinationCountry, nights, guests }) {
  return {
    originCountry: normalizeCountry(originCountry),
    destinationCountry: normalizeCountry(destinationCountry),
    nights: Number(nights || 0),
    guests: Number(guests || 1),
    band: "world_trip",
    advantageHint: nights >= 5 ? "long_stay" : "short_stay"
  };
}

// ============================================================================
// COUNTRY NORMALIZER (same logic, v30 meta)
// ============================================================================
export function normalizeCountry(input) {
  if (!input) return "BZ";

  const value = String(input).trim().toLowerCase();
  const cleaned = value.replace(/[\u{1F1E6}-\u{1F1FF}]/gu, "").trim();

  if (/^[a-z]{2}$/i.test(cleaned)) return cleaned.toUpperCase();

  const alpha3 = {
    usa: "US", can: "CA", mex: "MX", blz: "BZ", gbr: "GB",
    jam: "JM", tto: "TT", hnd: "HN", gtm: "GT", slv: "SV",
    nic: "NI", cri: "CR", pan: "PA", dom: "DO", prt: "PR",
    brb: "BB", lca: "LC", kna: "KN"
  };
  if (alpha3[cleaned]) return alpha3[cleaned];

  const map = {
    "belize": "BZ",
    "united states": "US",
    "united states of america": "US",
    "usa": "US",
    "us": "US",
    "mexico": "MX",
    "canada": "CA",
    "united kingdom": "GB",
    "great britain": "GB",
    "uk": "GB",
    "jamaica": "JM",
    "bahamas": "BS",
    "trinidad and tobago": "TT",
    "guatemala": "GT",
    "honduras": "HN",
    "el salvador": "SV",
    "nicaragua": "NI",
    "costa rica": "CR",
    "panama": "PA",
    "dominican republic": "DO",
    "puerto rico": "PR",
    "barbados": "BB",
    "saint lucia": "LC",
    "saint kitts and nevis": "KN",
    "germany": "DE",
    "france": "FR",
    "spain": "ES",
    "italy": "IT",
    "australia": "AU",
    "new zealand": "NZ",
    "india": "IN",
    "china": "CN",
    "japan": "JP",
    "south korea": "KR",
    "brazil": "BR",
    "argentina": "AR",
    "colombia": "CO",
    "chile": "CL"
  };

  return map[cleaned] || "BZ";
}

// ============================================================================
// COMMUNICATION + DATE HELPERS (unchanged semantics)
// ============================================================================
export function parseSMSBoolean(value) {
  if (!value) return false;
  const v = String(value).toLowerCase().trim();
  return v === "i agree to receive sms!" || v === "true" || v === "1";
}

export function receiveCommunication(raw) {
  if (!raw || typeof raw !== "string") {
    return { receiveSMS: false, receiveMassEmails: false };
  }

  const cleaned = raw
    .split(",")
    .map(x => x.trim().toLowerCase())
    .filter(Boolean);

  const receiveSMS = cleaned.some(x => x.includes("sms"));
  const receiveMassEmails = cleaned.some(x =>
    x.includes("mass email") ||
    x.includes("mass-email") ||
    x.includes("mass_emails") ||
    x.includes("massemails")
  );

  return { receiveSMS, receiveMassEmails };
}

export function safeDate(value) {
  if (!value) return null;

  if (typeof value.toDate === "function") {
    try {
      return value.toDate().toISOString();
    } catch {
      return null;
    }
  }

  if (typeof value === "object") {
    const sec = value.seconds ?? value._seconds;
    if (typeof sec === "number") {
      try {
        return new Date(sec * 1000).toISOString();
      } catch {
        return null;
      }
    }
  }

  try {
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d.toISOString();
  } catch {
    return null;
  }
}

function timestampFromDate(date) {
  const ms = date.getTime();
  return {
    seconds: Math.floor(ms / 1000),
    nanoseconds: (ms % 1000) * 1e6
  };
}


export function calculateReleaseDate(deliveredAt, delayDays = 3) {
  try {
    if (!deliveredAt || !db) return null;

    let date;
    if (typeof deliveredAt.toDate === "function") {
      date = deliveredAt.toDate();
    } else {
      date = new Date(deliveredAt);
    }

    if (isNaN(date.getTime())) return null;

    date.setDate(date.getDate() + delayDays);
    return timestampFromDate(date);
  } catch {
    return null;
  }
}

// ============================================================================
// REQUEST PARSER (EMAIL / WORLD ENTRYPOINT) — same logic, v30 meta
// ============================================================================
export async function parseIncomingRequest(req) {
  log("🔵 [parseIncomingRequest] START");

  let payload = {};
  let email = null;
  let emailType = null;
  let logId = null;

  const isGarbage = (v) => {
    if (!v) return true;
    const s = String(v);
    return (
      s.trim() === "" ||
      s.includes("{{") ||
      s.includes("add_more_field") ||
      s.includes("fieldLebal") ||
      s.includes("fieldValue") ||
      s.includes("*")
    );
  };

  const clean = (v) => (isGarbage(v) ? null : String(v).trim());
  const soft = (v, fb = null) => (v == null ? fb : String(v).trim() || fb);
  const temp = (v, fb = null) => (v == null ? fb : String(v).trim());

  if (req.method === "POST" && req.body && typeof req.body === "object") {
    payload = req.body;
    email = payload.email || null;
    emailType = payload.emailType || payload.type || null;
    logId = payload.logId || null;
  }

  const merged = { ...payload, ...req.query };

  email = temp(merged.email || email, null);
  emailType = temp(merged.emailType || merged.type || emailType, "newUser");
  logId = temp(merged.logId || logId, null);

  if (!logId && db) {
    logId = db.collection("EmailLogs").doc().id;
  }

  const rawType = (merged.type || "").toLowerCase();
  const rawFunction = (merged.function || "").toLowerCase();
  const rawEmailType = (emailType || "").toLowerCase();

  const isUserFlow =
    rawType === "users" ||
    rawEmailType === "users" ||
    rawFunction === "newuser" ||
    rawFunction === "userupdate";

  const cleanFn = isUserFlow ? clean : soft;

  email = cleanFn(email, null);
  emailType = cleanFn(emailType, "newUser");

  const requiresEmail =
    rawType === "users" ||
    rawFunction === "sendemail" ||
    (rawEmailType && rawEmailType !== "newuser");

  if (requiresEmail && !email) {
    throw new Error("Missing Email");
  }

  if (email) {
    email = decodeURIComponent(email).trim().toLowerCase();
    if (!email.includes("@") || email.length < 5) {
      throw new Error("Invalid Email");
    }
  }

  if (emailType) {
    emailType = emailType.charAt(0).toLowerCase() + emailType.slice(1);
  }

  const finalPayload = {
    TPIdentity: {
      email,
      displayName: clean(merged.displayName),
      resendToken: clean(merged.resendToken)
    },

    TPNotifications: {
      receiveSMS:
        merged.receiveSMS === true ||
        merged.receiveSMS === "true" ||
        merged.receiveSMS === 1,

      receiveMassEmails:
        merged.receiveMassEmails === true ||
        merged.receiveMassEmails === "true" ||
        merged.receiveMassEmails === 1
    },

    TPWallet: {
      payFrequency: clean(merged.payFrequency),
      payDay: clean(merged.payDay)
    },

    TPLoyalty: {
      pointsBalance: Number(merged.pointsBalance || merged.points || 0)
    },

    meta: {
      type: clean(rawType),
      function: clean(rawFunction),
      logId
    }
  };

  log("✅ FINAL PARSED:", { email, emailType, logId, payload: finalPayload });

  return { email, emailType, logId, payload: finalPayload };
}

// ============================================================================
// STRIPE PAYOUT SETTINGS — unchanged semantics
// ============================================================================
export async function configurePayoutSettings(stripe, accountId, payFrequency, payDay) {
  log("🔵 [configurePayoutSettings] START");

  const cleanLower = (v, fallback = null) => {
    if (!v) return fallback;
    const s = String(v).trim().toLowerCase();
    if (
      s === "" ||
      s.includes("{{") ||
      s.includes("add_more_field") ||
      s.includes("fieldLebal") ||
      s.includes("fieldValue") ||
      s.includes("*")
    ) return fallback;
    return s;
  };

  if (!db) {
    throw new Error("World data genome not available (admin/db missing)");
  }

  try {
    payFrequency = cleanLower(payFrequency, "daily");
    payDay = cleanLower(payDay, "monday");

    const allowedFreq = ["daily", "weekly"];
    if (!allowedFreq.includes(payFrequency)) payFrequency = "daily";

    const allowedDays = ["monday","tuesday","wednesday","thursday","friday"];
    if (payFrequency === "weekly" && !allowedDays.includes(payDay)) {
      payDay = "monday";
    }

    const account = await stripe.accounts.retrieve(accountId);

    const snap = await db
      .collection("Users")
      .where("TPIdentity.stripeAccountID", "==", accountId)
      .limit(1)
      .get();

    if (snap.empty) {
      throw new Error("Missing user for Stripe account");
    }

    const userDoc = snap.docs[0];
    const userRef = userDoc.ref;
    const userData = userDoc.data() || {};

    const country = normalizeCountry(
      account.country ??
      userData.TPIdentity.country ??
      "BZ"
    );

    const instantPayoutSupportedCountries = ["US", "GB", "CA", "AU"];

    const schedule = { interval: payFrequency };
    if (payFrequency === "weekly") {
      schedule.weekly_anchor = payDay;
    }

    const payoutSettings = {
      settings: {
        payouts: {
          schedule,
          ...(instantPayoutSupportedCountries.includes(country)
            ? {}
            : { debit_negative_balances: false })
        }
      }
    };

    await stripe.accounts.update(accountId, payoutSettings);

    const now = PulseRealm.PulseNOW;

    await userRef.set(
      {
        TPIdentity: {
          ...userData.TPIdentity,
          country,
          updatedAt: now
        },
        TPWallet: {
          ...userData.TPWallet,
          payouts: {
            frequency: payFrequency,
            day: payDay,
            updatedAt: now
          },
          updatedAt: now
        }
      },
      { merge: true }
    );

    log("✅ [configurePayoutSettings] COMPLETE");

    return {
      country,
      instantPayoutsEnabled: instantPayoutSupportedCountries.includes(country)
    };

  } catch (err) {
    error("❌ configurePayoutSettings error:", err.message);
    throw err;
  }
}

// ============================================================================
// BINARY FETCH + HASH HELPERS (ONE-BAND INTELLHASH)
// ============================================================================
export async function fetchBuffer(url) {
  try {
    const resp = await fetch(url, { redirect: "follow" });
    const status = resp.status;

    if (!resp.ok) {
      return { ok: false, status, error: `HTTP ${status}` };
    }

    const contentType = resp.headers.get("content-type") || "";
    const arrayBuf = await resp.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);

    return { ok: true, buffer, contentType, status };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

export async function computeSha256Hex(buffer) {
  try {
    let ab;

    if (buffer instanceof ArrayBuffer) {
      ab = buffer;
    } else if (ArrayBuffer.isView(buffer)) {
      ab = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    } else {
      ab = Buffer.from(buffer).buffer;
    }

    const hashBuf = await PulseRealm.crypto.subtle.digest("SHA-256", ab);
    const hashArr = new Uint8Array(hashBuf);

    let hex = "";
    for (let i = 0; i < hashArr.length; i++) {
      hex += hashArr[i].toString(16).padStart(2, "0");
    }

    return hex;
  } catch (err) {
    warn("⚠️ computeSha256Hex failed:", err);
    return null;
  }
}

export async function computeIntellHash({ buffer, tag = "generic", contentType = null }) {
  if (!buffer) return { ok: false, error: "NO_BUFFER" };

  const size =
    buffer.length ??
    buffer.byteLength ??
    (ArrayBuffer.isView(buffer) ? buffer.byteLength : null) ??
    0;

  const cacheKey = `${tag}|${size}`;
  if (intellHashCache.has(cacheKey)) {
    return { ok: true, cached: true, ...intellHashCache.get(cacheKey) };
  }

  const hash = await computeSha256Hex(buffer);
  if (!hash) return { ok: false, error: "HASH_FAILED" };

  const profile = {
    hash,
    tag,
    size,
    contentType: contentType || null,
    band: "binary",
    advantageHint: size > 5_000_000 ? "large_asset" : "small_asset"
  };

  intellHashCache.set(cacheKey, profile);
  return { ok: true, cached: false, ...profile };
}

// ============================================================================
// LOCAL HELPER REGISTRY (for getHelper)
// ============================================================================
const localHelpers = {
  safeFetchJson,
  searchPlacesText,
  geocodeAddress,
  fuzzyGeocode,
  buildStaticMapUrl,
  buildGeoProfile,
  buildTripSummary,
  normalizeCountry,
  parseSMSBoolean,
  receiveCommunication,
  safeDate,
  calculateReleaseDate,
  parseIncomingRequest,
  configurePayoutSettings,
  fetchBuffer,
  computeSha256Hex,
  computeIntellHash
};

// ============================================================================
// HELPER REGISTRY — AUTO-LOAD + AUTO-CACHE (MODE C)
// ============================================================================
export async function getHelper(name) {
  if (!name || typeof name !== "string") {
    throw new Error("Helper name required");
  }

  const key = name.trim();

  if (localHelpers[key]) return localHelpers[key];
  if (helperCache.has(key)) return helperCache.get(key);

  const candidates = [
    "./PulseWorldFirebaseGenome-v30.js"
  ];

  for (const path of candidates) {
    try {
      const mod = await import(path);
      if (mod && typeof mod[key] === "function") {
        helperCache.set(key, mod[key]);
        return mod[key];
      }
    } catch {
      // ignore and continue
    }
  }

  warn(`⚠️ [PulseWorldGenome-v30] Missing helper: ${key}`);
  throw new Error(`Helper not found: ${key}`);
}

export async function prewarmWorldHelpers() {
  const hotHelpers = [
    "safeFetchJson",
    "searchPlacesText",
    "geocodeAddress",
    "fuzzyGeocode",
    "normalizeCountry",
    "parseIncomingRequest",
    "computeIntellHash"
  ];

  for (const h of hotHelpers) {
    try {
      await getHelper(h);
    } catch {
      // best-effort only
    }
  }
}

// ============================================================================
// BACKEND ABSTRACTION — FIREBASE OR SQL (OR OTHER) — ONE-BAND AWARE
// ============================================================================
const WORLD_DATA_BACKEND =
  PulseRealm.PULSE_WORLD_BACKEND || "firebase"; // "firebase" | "sql" | "mock"

let sqlClient = null;

async function getSqlClient() {
  if (WORLD_DATA_BACKEND !== "sql") return null;
  if (sqlClient) return sqlClient;

  try {
    const mod = await import("../../PULSE-TRANSLATOR/PulseTranslatorSkeletalClient-v30.js");
    sqlClient = mod.default || mod.sqlClient || mod;
    return sqlClient;
  } catch (err) {
    warn("⚠️ [PulseWorldGenome-v30] SQL client load failed:", err.message || err);
    return null;
  }
}

export const WorldDataProvider = Object.freeze({
  backend: WORLD_DATA_BACKEND,

  async getCollection(dnaName) {
    const dna = PulseSpecsDNAGenome.getDNA(dnaName) || null;
    if (!dna) throw new Error(`Unknown DNA: ${dnaName}`);

    if (WORLD_DATA_BACKEND === "firebase") {
      const path = PulseTranslatorSkeletalOutput.toFirebasePath(dna);
      return db.collection(path);
    }

    if (WORLD_DATA_BACKEND === "sql") {
      const client = await getSqlClient();
      if (!client) throw new Error("SQL backend not available");
      const table = PulseTranslatorSkeletalOutput.toSqlTable(dna);
      return { client, table };
    }

    throw new Error(`Unsupported backend: ${WORLD_DATA_BACKEND}`);
  },

  async create(dnaName, payload) {
    const dna = PulseSpecsDNAGenome.getDNA(dnaName) || null;
    if (!dna) throw new Error(`Unknown DNA: ${dnaName}`);

    const skeletal = PulseTranslatorSkeletalIntake.fromWorldPayload(dna, payload);

    if (WORLD_DATA_BACKEND === "firebase") {
      const path = PulseTranslatorSkeletalOutput.toFirebasePath(dna);
      const col = db.collection(path);
      const docRef = col.doc();
      await docRef.set(skeletal);
      worldDocCache.set(`${dnaName}|${docRef.id}`, skeletal);
      return { id: docRef.id, backend: "firebase" };
    }

    if (WORLD_DATA_BACKEND === "sql") {
      const client = await getSqlClient();
      if (!client) throw new Error("SQL backend not available");
      const table = PulseTranslatorSkeletalOutput.toSqlTable(dna);
      const id = await client.insert(table, skeletal);
      worldDocCache.set(`${dnaName}|${id}`, skeletal);
      return { id, backend: "sql" };
    }

    const id = `mock-${PulseRealm.PulseNOW}`;
    worldDocCache.set(`${dnaName}|${id}`, skeletal);
    return { id, backend: "mock" };
  },

  async get(dnaName, id) {
    const cacheKey = `${dnaName}|${id}`;
    if (worldDocCache.has(cacheKey)) {
      return worldDocCache.get(cacheKey);
    }

    const dna = PulseSpecsDNAGenome.getDNA(dnaName) || null;
    if (!dna) throw new Error(`Unknown DNA: ${dnaName}`);

    if (WORLD_DATA_BACKEND === "firebase") {
      const path = PulseTranslatorSkeletalOutput.toFirebasePath(dna);
      const docRef = db.collection(path).doc(id);
      const snap = await docRef.get();
      if (!snap.exists) return null;
      const skeletal = snap.data();
      const worldPayload = PulseTranslatorSkeletalOutput.fromFirebaseDoc(dna, skeletal, id);
      worldDocCache.set(cacheKey, worldPayload);
      return worldPayload;
    }

    if (WORLD_DATA_BACKEND === "sql") {
      const client = await getSqlClient();
      if (!client) throw new Error("SQL backend not available");
      const table = PulseTranslatorSkeletalOutput.toSqlTable(dna);
      const skeletal = await client.getById(table, id);
      if (!skeletal) return null;
      const worldPayload = PulseTranslatorSkeletalOutput.fromSqlRow(dna, skeletal, id);
      worldDocCache.set(cacheKey, worldPayload);
      return worldPayload;
    }

    return null;
  }
});

// ============================================================================
// SOCIAL GRAPH INSTANCE (ONE-BAND VIEW)
// ============================================================================
export const WorldSocialGraph = createPulseWorldSocialGraph({
  PowerUserRanking: null,
  ReputationEngine: null,
  SkillRegistry: null,
  TrustSignals: null,
  log,
  warn,
  error
});

// ============================================================================
// ONE-BAND SNAPSHOT — WORLD GENOME + SOCIAL GRAPH + BACKEND
// ============================================================================
export async function getWorldGenomeSnapshot() {
  await prewarmWorldHelpers().catch(() => {});

  return {
    meta: PulseWorldGenomeMeta,
    backend: WorldDataProvider.backend,
    socialGraph: WorldSocialGraph.snapshot(),
    caches: {
      geoCacheSize: geoCache.size,
      staticMapCacheSize: staticMapCache.size,
      intellHashCacheSize: intellHashCache.size,
      worldDocCacheSize: worldDocCache.size
    }
  };
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================
const PulseWorldGenomeV30OneBand = {
  meta: PulseWorldGenomeMeta,
  WorldDataProvider,
  WorldSocialGraph,
  prewarmWorldHelpers,
  getHelper,
  getWorldGenomeSnapshot,
  // helpers
  safeFetchJson,
  searchPlacesText,
  geocodeAddress,
  fuzzyGeocode,
  buildStaticMapUrl,
  buildGeoProfile,
  buildTripSummary,
  normalizeCountry,
  parseSMSBoolean,
  receiveCommunication,
  safeDate,
  calculateReleaseDate,
  parseIncomingRequest,
  configurePayoutSettings,
  fetchBuffer,
  computeSha256Hex,
  computeIntellHash
};

export const PulseWorldGenome = PulseWorldGenomeV30OneBand;
export const PulseOnCall = onCall;
export const PulseOnRequest = onRequest;

PulseRealm.WorldGenome = {
  PulseWorldGenome,
  PulseWorldGenomeV30OneBand,
  PulseOnCall,
  PulseOnRequest,
  onCall,
  onRequest
}