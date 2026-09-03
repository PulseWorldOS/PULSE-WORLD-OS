// ============================================================================
// FILE: /PULSE-WORLD-TOUCH/PULSE-UNIVERSAL-TOUCH-SECURITY-v32-IMMORTAL++-ONE-BAND.js
// PULSE OS — v32 IMMORTAL++ ONE-BAND SECURITY CORTEX
// ROLE: Risk Engine + Trust Classifier + ThreatShape + Module Risk + Binary Risk
//       + Continuance-aware + OneBand-aware + Runtime-aware
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import {
  buildThreatShape_v32 as PulseTouchThreatShape,
  PulseTouchThreatShapeToSecurityDecision_v32 as PulseThreatShapeToDecision
} from "./PULSE-UNIVERSAL-TOUCH-THREATSHAPE.js";


// ============================================================================
// META — v32 IMMORTAL++
// ============================================================================

export const PULSE_TOUCH_SECURITY_VERSION = "v32-IMMORTAL++-ONE-BAND-SECURITY";

export const AI_EXPERIENCE_META_PulseTouchSecurity_V32 = {
  id: "pulsetouch.security.v32",
  kind: "cortex_organ",
  version: PULSE_TOUCH_SECURITY_VERSION,
  role: "risk_engine",
  band: "touch",
  surfaces: {
    band: [
      "security",
      "trust",
      "risk",
      "shape",
      "headers",
      "module",
      "binary",
      "one_band",
      "continuance"
    ],
    wave: ["analytical", "cold", "precise", "binary_intel"],
    binary: ["allow", "challenge", "deny"],
    presence: ["security_state"],
    speed: "instant_compute"
  },
  invariants: {
    networkCalls: "none",
    sideEffects: "none",
    determinism: "strict",
    mutation: "forbidden"
  }
};

export const ORGAN_META_PulseTouchSecurity_V32 = {
  id: "organ.pulsetouch.security.v32",
  organism: "PulseTouch",
  layer: "edge.security.v32",
  tier: "IMMORTAL++",
  evoFlags: {
    deterministic: true,
    driftProof: true,
    trustClassifier: true,
    riskScoring: true,
    presenceAware: true,
    regionAware: true,
    identityHintAware: true,
    trustHintAware: true,

    zeroPII: true,
    zeroTracking: true,
    coldLogic: true,
    hostileAware: true,

    chunkProfileAware: true,
    warmupAware: true,
    preflightAware: true,
    deterministicRouting: true,

    moduleRiskAware: true,
    pulseImportAware: true,
    pulseExportAware: true,
    subimportAware: true,
    tierAware: true,

    binaryRiskAware: true,
    cookieIntegrityBandAware: true,

    oneBandAware: true,
    bandFieldUnified: true,

    // v32 additions
    continuanceAware: true,
    worldRuntimeAware: true,
    binarySubstrateV32: true,
    touchV32Aligned: true
  }
};

export const ORGAN_CONTRACT_PulseTouchSecurity_V32 = {
  inputs: {
    pulseTouch: "Pulse‑Touch skinState",
    event: "Edge / Netlify event with headers",
    continuance: "Continuance v32 frame (optional)",
    worldRuntime: "WorldRuntime v32 frame (optional)"
  },
  outputs: {
    band: "touch",
    version: "v32",
    riskScore: "numeric",
    trustLevel: "trusted | neutral | suspicious | hostile",
    action: "allow | challenge | hellno",
    advantage: "v32 advantage surface",
    threatShape: "ThreatShape object",
    headerShape: "header classification",
    methodShape: "method classification",
    geoShape: "geo classification",
    uaShape: "ua classification",
    moduleRisk: "module-level risk",
    binaryRisk: "binary integrity risk",
    threatDecision: "allow | challenge | deny",
    continuanceHints: "continuance v32 hints"
  },
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true,
    zeroPII: true
  }
};

export const IMMORTAL_OVERLAYS_PulseTouchSecurity_V32 = {
  drift: { allowed: false },
  pressure: { expectedLoad: "high" },
  stability: { semantics: "stable" },
  load: { maxComponents: 1 }
};

// ============================================================================
// HELPERS — v32 (pure, deterministic)
// ============================================================================

function getHeader(headers, key) {
  if (!headers) return undefined;
  return (
    headers[key] ||
    headers[String(key).toLowerCase()] ||
    headers[String(key).toUpperCase()]
  );
}

function classifyMethod(method) {
  switch ((method || "GET").toUpperCase()) {
    case "GET": return "read";
    case "HEAD": return "read_head";
    case "POST": return "write";
    case "PUT":
    case "PATCH":
    case "DELETE": return "mutating";
    default: return "unknown";
  }
}

function classifyGeo(headers) {
  const country = getHeader(headers, "cf-ipcountry") || "unknown";
  if (country === "T1") return "tor";
  if (country === "unknown") return "unknown";
  return "normal";
}

function classifyUA(ua) {
  if (!ua) return "unknown";
  const s = ua.toLowerCase();
  if (s.includes("curl") || s.includes("wget") || s.includes("httpclient")) return "script";
  if (s.includes("bot") || s.includes("spider") || s.includes("crawler")) return "bot";
  if (s.includes("chrome") || s.includes("safari") || s.includes("firefox") || s.includes("edge"))
    return "browser";
  return "unknown";
}

function classifyHeaderShape(headers) {
  const count = Object.keys(headers || {}).length;
  if (count === 0) return "empty";
  if (count < 5) return "minimal";
  if (count < 15) return "normal";
  return "heavy";
}

function normalizePageId(raw) {
  if (!raw) return "index";
  let s = String(raw);
  const h = s.indexOf("#");
  if (h !== -1) s = s.slice(0, h);
  const q = s.indexOf("?");
  if (q !== -1) s = s.slice(0, q);
  if (s.endsWith("/")) s = s.slice(0, -1);
  return s || "index";
}

function computeBinaryRisk_v32(pulseTouch) {
  const integrity = pulseTouch.integrity || "unknown";
  const version = pulseTouch.v || "0";
  const band = pulseTouch.band || "touch";
  const evo = pulseTouch.evo || "IMMORTAL";

  let score = 0;
  if (integrity === "unknown") score += 15;
  else if (integrity === "partial") score += 5;

  if (version === "0") score += 10;
  if (band !== "touch") score += 3;
  if (evo !== "IMMORTAL") score += 5;

  let riskBand = "low";
  if (score >= 25) riskBand = "high";
  else if (score >= 10) riskBand = "medium";

  return {
    score,
    riskBand,
    integrityBand:
      integrity === "intact"
        ? "intact"
        : integrity === "partial"
        ? "partial"
        : "unknown"
  };
}

function extractModuleRisk_v32(pulseTouch) {
  const explicit = pulseTouch.pulseModuleRisk;
  if (explicit && typeof explicit === "object") {
    return {
      hasMissingSubimports: !!explicit.hasMissingSubimports,
      hasWrongTierExports: !!explicit.hasWrongTierExports,
      hasGlobalExposureRisk: !!explicit.hasGlobalExposureRisk,
      hasChunkProfileAnomaly: !!explicit.hasChunkProfileAnomaly,
      score: typeof explicit.score === "number" ? explicit.score : 0,
      source: "skinState"
    };
  }

  try {
    if (PulseRealm.PulseImportWarmupCache) {
      const page = normalizePageId(pulseTouch.page || "index");
      const entry = PulseRealm.PulseImportWarmupCache[page];
      if (entry && typeof entry === "object") {
        const missing = Array.isArray(entry.subimportValidation.missing)
          ? entry.subimportValidation.missing.length
          : 0;

        const wrongTierExports = Array.isArray(entry.exportsMeta)
          ? entry.exportsMeta.filter(
              (e) => e.tier === "global" || e.tier === "system"
            ).length
          : 0;

        let score = 0;
        if (missing > 0) score += 10;
        if (wrongTierExports > 0) score += 10;

        return {
          hasMissingSubimports: missing > 0,
          hasWrongTierExports: wrongTierExports > 0,
          hasGlobalExposureRisk: wrongTierExports > 0,
          hasChunkProfileAnomaly: false,
          score,
          source: "warmup_cache"
        };
      }
    }
  } catch {}

  return {
    hasMissingSubimports: false,
    hasWrongTierExports: false,
    hasGlobalExposureRisk: false,
    hasChunkProfileAnomaly: false,
    score: 0,
    source: "none"
  };
}

// ============================================================================
// CORE — evaluateSecurity_v32
// ============================================================================

export function evaluateSecurity_v32(pulseTouch, event, continuance = null, worldRuntime = null) {
  const headers = event.headers || {};
  const method = event.httpMethod || event.method || "GET";

  const ip =
    getHeader(headers, "x-forwarded-for") ||
    getHeader(headers, "client-ip") ||
    getHeader(headers, "x-nf-client-connection-ip") ||
    "unknown";

  const ua = getHeader(headers, "user-agent") || "";
  const referer =
    getHeader(headers, "referer") || getHeader(headers, "referrer") || "";
  const scheme = getHeader(headers, "x-forwarded-proto") || "https";
  const host = getHeader(headers, "host") || "";
  const cfBot = getHeader(headers, "cf-bot-score") || null;

  const methodShape = classifyMethod(method);
  const geoShape = classifyGeo(headers);
  const uaShape = classifyUA(ua);
  const headerShape = classifyHeaderShape(headers);

  let riskScore = 0;

  if (pulseTouch.trusted === "0") riskScore += 40;
  if (pulseTouch.region === "unknown") riskScore += 20;
  if (pulseTouch.identity === "anon") riskScore += 20;
  if (pulseTouch.presence === "unknown") riskScore += 10;
  if (ip === "unknown") riskScore += 10;

  const threatShapeObj = PulseTouchThreatShape(pulseTouch, event || {});
  const threatDecision = PulseThreatShapeToDecision(threatShapeObj);

  if (threatShapeObj.shape === "MAJOR_THREAT") riskScore += 25;
  else if (threatShapeObj.shape === "POSSIBLE_THREAT") riskScore += 10;

  if (pulseTouch.presence === "inactive") riskScore += 5;
  if (pulseTouch.mode === "safe") riskScore += 5;
  if (pulseTouch.region === "global") riskScore += 5;

  if (pulseTouch.pulseStream === "single") riskScore += 5;
  if (pulseTouch.pulseStream === "burst") riskScore += 2;

  if (pulseTouch.fastLane === "disabled") riskScore += 5;

  if (pulseTouch.originTs && pulseTouch.lastPulseTs) {
    const delta = pulseTouch.lastPulseTs - pulseTouch.originTs;
    if (delta > 5000) riskScore += 5;
  }

  if (methodShape === "mutating") riskScore += 15;
  if (methodShape === "write") riskScore += 8;

  if (geoShape === "tor") riskScore += 20;
  if (geoShape === "unknown") riskScore += 5;

  if (uaShape === "script") riskScore += 15;
  if (uaShape === "bot") riskScore += 10;
  if (!ua) riskScore += 5;

  if (headerShape === "empty") riskScore += 15;
  if (headerShape === "heavy") riskScore += 5;

  if (scheme !== "https") riskScore += 10;

  if (cfBot && Number(cfBot) < 30) riskScore += 15;

  if (referer && !referer.includes(host)) riskScore += 5;

  const moduleRisk = extractModuleRisk_v32(pulseTouch);
  if (moduleRisk.score > 0) riskScore += Math.min(20, moduleRisk.score);

  const binaryRisk = computeBinaryRisk_v32(pulseTouch);
  if (binaryRisk.score > 0) riskScore += Math.min(15, binaryRisk.score);

  if (riskScore < 0) riskScore = 0;
  if (riskScore > 200) riskScore = 200;

  let trustLevel = "trusted";
  let action = "allow";

  if (riskScore >= 80) {
    trustLevel = "hostile";
    action = "hellno";
  } else if (riskScore >= 50) {
    trustLevel = "suspicious";
    action = "challenge";
  } else if (riskScore >= 20) {
    trustLevel = "neutral";
    action = "allow";
  }

  const continuanceHints = continuance
    ? {
        logicalClock: continuance.logicalClock || 0,
        tick: continuance.tick || 0,
        bandUsage: continuance.bandUsage || null
      }
    : null;

  const advantage = {
    version: PULSE_TOUCH_SECURITY_VERSION,
    band: "touch",

    hydrationTier:
      trustLevel === "hostile"
        ? "minimal"
        : trustLevel === "suspicious"
        ? "safe"
        : "full",

    animationTier:
      trustLevel === "hostile"
        ? "none"
        : trustLevel === "suspicious"
        ? "reduced"
        : "smooth",

    chunkStrategy:
      pulseTouch.mode === "fast" ? "aggressive" : "safe",

    warmupProfile:
      trustLevel === "hostile"
        ? "minimal"
        : trustLevel === "suspicious"
        ? "safe"
        : "full",

    regionCluster: pulseTouch.regionCluster || pulseTouch.region || "unknown",
    presenceIntensity:
      pulseTouch.presenceIntensity || pulseTouch.presence || "unknown",
    pulseStream: pulseTouch.pulseStream || "continuous",
    fastLane: pulseTouch.fastLane || "enabled",

    temporal: {
      originTs: pulseTouch.originTs || null,
      lastPulseTs: pulseTouch.lastPulseTs || null
    },

    threatShape: threatShapeObj,
    headerShape,
    methodShape,
    geoShape,
    uaShape,

    moduleRisk,

    binary: {
      score: binaryRisk.score,
      riskBand: binaryRisk.riskBand,
      integrityBand: binaryRisk.integrityBand
    },

    threatDecision,
    continuanceHints
  };

  return {
    band: "touch",
    version: PULSE_TOUCH_SECURITY_VERSION,
    riskScore,
    trustLevel,
    action,
    advantage,
    threatShape: threatShapeObj,
    headerShape,
    methodShape,
    geoShape,
    uaShape,
    moduleRisk,
    binaryRisk,
    threatDecision,
    continuanceHints
  };
}

// ============================================================================
// FACTORY — v32 IMMORTAL++
// ============================================================================

export function PulseTouchSecurity_V32() {
  return {
    meta: ORGAN_META_PulseTouchSecurity_V32,
    contract: ORGAN_CONTRACT_PulseTouchSecurity_V32,
    overlays: IMMORTAL_OVERLAYS_PulseTouchSecurity_V32,
    evaluate: evaluateSecurity_v32
  };
}

PulseRealm.TouchSecurity = {
  PulseTouchSecurity_V32,
  evaluateSecurity_v32,
  ORGAN_META_PulseTouchSecurity_V32,
  ORGAN_CONTRACT_PulseTouchSecurity_V32,
  IMMORTAL_OVERLAYS_PulseTouchSecurity_V32,
  PULSE_TOUCH_SECURITY_VERSION
}