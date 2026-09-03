// ============================================================================
// FILE: /PULSE-WORLD-TOUCH/PULSE-UNIVERSAL-TOUCH-THREATSHAPE-v32-IMMORTAL++-ONE-BAND.js
// PULSE WORLD OS — v32 IMMORTAL++
// TOUCH THREATSHAPE ENGINE — EARLY FIREWALL + MULTI-DIMENSIONAL RISK
// ROLE:
//   • Three-shape threat classifier (NOT_A_THREAT / POSSIBLE_THREAT / MAJOR_THREAT)
//   • Early firewall cortex (zero network, zero PII, zero inference)
//   • Module risk + Binary risk + Cookie integrity
//   • Header / Method / UA / Geo / Temporal / Region / PulseStream
//   • OneBand unified security band
//   • Continuance-aware + Runtime-aware
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
// META — v32 IMMORTAL++
// ============================================================================

export const PULSE_TOUCH_THREATSHAPE_VERSION = "v32-IMMORTAL++-ONE-BAND-THREATSHAPE";

export const AI_EXPERIENCE_META_PulseTouchThreatShape_V32 = {
  id: "pulsetouch.threatshape.v32",
  kind: "cortex_organ",
  version: PULSE_TOUCH_THREATSHAPE_VERSION,
  role: "threat_shape_engine",
  band: "touch",
  surfaces: {
    band: [
      "security",
      "threatshape",
      "risk",
      "headers",
      "geo",
      "ua",
      "module",
      "binary",
      "cookie",
      "continuance",
      "one_band"
    ],
    wave: ["analytical", "cold", "early_firewall"],
    binary: ["not_a_threat", "possible_threat", "major_threat"],
    presence: ["threatshape_state"],
    speed: "instant_compute"
  },
  invariants: {
    networkCalls: "none",
    sideEffects: "none",
    determinism: "strict",
    mutation: "forbidden"
  }
};

export const ORGAN_META_PulseTouchThreatShape_V32 = {
  id: "organ.pulsetouch.threatshape.v32",
  organism: "PulseTouch",
  layer: "edge.security.threatshape.v32",
  tier: "IMMORTAL++",
  evoFlags: {
    deterministic: true,
    driftProof: true,
    regionAware: true,
    clusterAware: true,
    pulseStreamAware: true,
    fastLaneAware: true,
    temporalAware: true,
    presenceAware: true,
    modeAware: true,
    headerAware: true,
    uaAware: true,
    geoAware: true,
    cookieAware: true,
    integrityAware: true,
    zeroPII: true,
    zeroTracking: true,
    zeroIdentityInference: true,
    failOpenAware: true,
    threeShapeModel: true,
    operatorAlertAware: true,
    hellnoAware: true,

    // module
    moduleAware: true,
    pulseImportAware: true,
    pulseExportAware: true,
    subimportAware: true,
    tierAware: true,

    // binary
    binaryAware: true,
    cookieIntegrityBandAware: true,

    // v32 additions
    continuanceAware: true,
    worldRuntimeAware: true,
    oneBandAware: true,
    bandFieldUnified: true
  }
};

export const ORGAN_CONTRACT_PulseTouchThreatShape_V32 = {
  inputs: {
    pulseTouch: "Pulse‑Touch skinState",
    event: "Edge event with headers (optional)",
    continuance: "Continuance v32 frame (optional)",
    worldRuntime: "WorldRuntime v32 frame (optional)"
  },
  outputs: {
    band: "touch",
    version: "v32",
    shape: "NOT_A_THREAT | POSSIBLE_THREAT | MAJOR_THREAT",
    riskScore: "numeric",
    recommendedAction: "allow | alert | hellno",
    reasons: "array of risk reasons",
    moduleRisk: "module-level risk",
    binaryRisk: "binary integrity risk",
    headerShape: "header classification",
    methodShape: "method classification",
    uaShape: "ua classification",
    geoShape: "geo classification",
    integrityRisk: "cookie integrity",
    continuanceHints: "continuance v32 hints",
    notifyOperator: "boolean",
    hellno: "boolean"
  },
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true,
    zeroPII: true
  }
};

export const IMMORTAL_OVERLAYS_PulseTouchThreatShape_V32 = {
  drift: { allowed: false },
  pressure: { expectedLoad: "high" },
  stability: { semantics: "stable" },
  load: { maxComponents: 1 },
  triHeart: {
    cognitive: "early_threat_classification",
    emotional: "no_emotion",
    behavioral: "fail_open_by_default"
  }
};

// ============================================================================
// HELPERS — v32 IMMORTAL++
// ============================================================================

function getHeader(headers, key) {
  return (
    headers[key] ||
    headers[key.toLowerCase()] ||
    headers[key.toUpperCase()]
  );
}

function classifyHeaderShape(headers) {
  const count = Object.keys(headers || {}).length;
  if (count === 0) return "empty";
  if (count < 5) return "minimal";
  if (count < 15) return "normal";
  return "heavy";
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

function classifyUA(ua) {
  if (!ua) return "unknown";
  const s = ua.toLowerCase();
  if (s.includes("curl") || s.includes("wget") || s.includes("httpclient")) return "script";
  if (s.includes("bot") || s.includes("spider") || s.includes("crawler")) return "bot";
  if (s.includes("chrome") || s.includes("safari") || s.includes("firefox") || s.includes("edge"))
    return "browser";
  return "unknown";
}

function classifyGeo(headers) {
  const c = getHeader(headers, "cf-ipcountry") || "unknown";
  if (c === "T1") return "tor";
  if (c === "unknown") return "unknown";
  return "normal";
}

function classifyCookieIntegrity(pulseTouch) {
  const required = ["region", "mode", "presence", "page"];
  const missing = required.filter((k) => !pulseTouch[k]);
  if (missing.length === 0) return "intact";
  if (missing.length <= 2) return "partial";
  return "unknown";
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

  return { score, riskBand, integrity };
}

function extractModuleRisk_v32(pulseTouch) {
  const explicit = pulseTouch.pulseModuleRisk;
  if (explicit && typeof explicit === "object") {
    return {
      hasMissingSubimports: !!explicit.hasMissingSubimports,
      hasWrongTierExports: !!explicit.hasWrongTierExports,
      hasGlobalExposureRisk: !!explicit.hasGlobalExposureRisk,
      hasChunkProfileAnomaly: !!explicit.hasChunkProfileAnomaly,
      score: explicit.score ?? 0,
      source: "skinState"
    };
  }

  try {
    if (PulseRealm.PulseImportWarmupCache) {
      const page = pulseTouch.page || "index";
      const entry = PulseRealm.PulseImportWarmupCache[page];
      if (entry) {
        const missing = entry.subimportValidation.missing.length || 0;
        const wrongTier = entry.exportsMeta.filter(
          (e) => e.tier === "global" || e.tier === "system"
        ).length || 0;

        let score = 0;
        if (missing > 0) score += 10;
        if (wrongTier > 0) score += 10;

        return {
          hasMissingSubimports: missing > 0,
          hasWrongTierExports: wrongTier > 0,
          hasGlobalExposureRisk: wrongTier > 0,
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
// CORE — buildThreatShape_v32
// ============================================================================

export function buildThreatShape_v32(pulseTouch, event = {}, continuance = null, worldRuntime = null) {
  const headers = event.headers || {};
  const method = event.httpMethod || event.method || "GET";

  const ua = getHeader(headers, "user-agent") || "";
  const referer = getHeader(headers, "referer") || "";
  const host = getHeader(headers, "host") || "";
  const scheme = getHeader(headers, "x-forwarded-proto") || "https";
  const cfBot = getHeader(headers, "cf-bot-score") || null;

  const headerShape = classifyHeaderShape(headers);
  const methodShape = classifyMethod(method);
  const uaShape = classifyUA(ua);
  const geoShape = classifyGeo(headers);
  const integrityRisk = classifyCookieIntegrity(pulseTouch);

  const moduleRisk = extractModuleRisk_v32(pulseTouch);
  const binaryRisk = computeBinaryRisk_v32(pulseTouch);

  let riskScore = 0;
  const reasons = [];

  // REGION
  const region = pulseTouch.region || "unknown";
  if (region === "kp") { riskScore += 80; reasons.push("region_blocked"); }
  else if (region === "ng") { riskScore += 40; reasons.push("region_restricted"); }
  else if (region === "unknown") { riskScore += 10; reasons.push("region_unknown"); }

  // PULSE STREAM
  const pulseStream = pulseTouch.pulseStream || "continuous";
  if (pulseStream === "single") { riskScore += 10; reasons.push("pulse_single"); }
  if (pulseStream === "burst") { riskScore += 5; reasons.push("pulse_burst"); }

  // FASTLANE
  if (pulseTouch.fastLane === "disabled") { riskScore += 5; reasons.push("fastlane_disabled"); }

  // TEMPORAL
  const { originTs, lastPulseTs } = pulseTouch;
  if (originTs && lastPulseTs && lastPulseTs > originTs) {
    const delta = lastPulseTs - originTs;
    if (delta > 15000) { riskScore += 10; reasons.push("temporal_drift"); }
    else if (delta > 5000) { riskScore += 5; reasons.push("temporal_suspicious"); }
  }

  // MODE / PRESENCE
  if (pulseTouch.mode === "safe") { riskScore += 5; reasons.push("mode_safe"); }
  if (pulseTouch.presence === "inactive" || pulseTouch.presence === "unknown") {
    riskScore += 5; reasons.push(`presence_${pulseTouch.presence}`);
  }

  // HEADER
  if (headerShape === "empty") { riskScore += 15; reasons.push("header_empty"); }
  if (headerShape === "heavy") { riskScore += 5; reasons.push("header_heavy"); }

  // METHOD
  if (methodShape === "mutating") { riskScore += 15; reasons.push("method_mutating"); }
  if (methodShape === "write") { riskScore += 8; reasons.push("method_write"); }

  // UA
  if (uaShape === "script") { riskScore += 15; reasons.push("ua_script"); }
  if (uaShape === "bot") { riskScore += 10; reasons.push("ua_bot"); }
  if (!ua) { riskScore += 5; reasons.push("ua_missing"); }

  // GEO
  if (geoShape === "tor") { riskScore += 20; reasons.push("geo_tor"); }
  if (geoShape === "unknown") { riskScore += 5; reasons.push("geo_unknown"); }

  // TLS
  if (scheme !== "https") { riskScore += 10; reasons.push("scheme_insecure"); }

  // REFERER
  if (referer && !referer.includes(host)) {
    riskScore += 5;
    reasons.push("referer_external");
  }

  // COOKIE INTEGRITY
  if (integrityRisk === "partial") { riskScore += 10; reasons.push("cookie_partial"); }
  if (integrityRisk === "unknown") { riskScore += 20; reasons.push("cookie_unknown"); }

  // BOT SCORE
  if (cfBot && Number(cfBot) < 30) {
    riskScore += 15;
    reasons.push("cfbot_low");
  }

  // MODULE RISK
  if (moduleRisk.score > 0) {
    const bounded = Math.min(20, moduleRisk.score);
    riskScore += bounded;
    reasons.push("module_risk");
  }

  // BINARY RISK
  if (binaryRisk.score > 0) {
    const bounded = Math.min(15, binaryRisk.score);
    riskScore += bounded;
    reasons.push("binary_risk");
  }

  // NORMALIZE
  riskScore = Math.min(100, Math.max(0, riskScore));

  // SHAPE
  let shape = "NOT_A_THREAT";
  let recommendedAction = "allow";

  if (riskScore >= 80) {
    shape = "MAJOR_THREAT";
    recommendedAction = "hellno";
  } else if (riskScore >= 40) {
    shape = "POSSIBLE_THREAT";
    recommendedAction = "alert";
  }

  const continuanceHints = continuance
    ? {
        logicalClock: continuance.logicalClock || 0,
        tick: continuance.tick || 0,
        bandUsage: continuance.bandUsage || null
      }
    : null;

  return {
    band: "touch",
    version: PULSE_TOUCH_THREATSHAPE_VERSION,
    shape,
    recommendedAction,
    riskScore,
    reasons,

    headerShape,
    methodShape,
    uaShape,
    geoShape,
    integrityRisk,

    moduleRisk,
    binaryRisk,

    continuanceHints,

    notifyOperator: shape === "POSSIBLE_THREAT",
    hellno: shape === "MAJOR_THREAT"
  };
}
// ============================================================================
// PulseTouchThreatShapeToSecurityDecision v32 IMMORTAL++
// Converts ThreatShape output → SecurityDecision object
// ============================================================================

export function PulseTouchThreatShapeToSecurityDecision_v32(threat) {
  const shape = threat.shape || "NOT_A_THREAT";

  let allow = false;
  let alertOperator = false;
  let block = false;
  let hellno = false;

  switch (shape) {
    case "NOT_A_THREAT":
      allow = true;
      break;

    case "POSSIBLE_THREAT":
      allow = true;          // fail-open
      alertOperator = true;  // operator email
      break;

    case "MAJOR_THREAT":
      block = true;
      hellno = true;
      break;
  }

  return {
    version: "v32-IMMORTAL++",
    shape,
    allow,
    alertOperator,
    block,
    hellno,
    riskScore: threat.riskScore || 0,
    reasons: threat.reasons || [],
    headerShape: threat.headerShape,
    methodShape: threat.methodShape,
    uaShape: threat.uaShape,
    geoShape: threat.geoShape,
    integrityRisk: threat.integrityRisk,
    moduleRisk: threat.moduleRisk,
    binaryRisk: threat.binaryRisk
  };
}

// ============================================================================
// FACTORY — v32 IMMORTAL++
// ============================================================================

export function PulseTouchThreatShape_V32() {
  return {
    meta: ORGAN_META_PulseTouchThreatShape_V32,
    contract: ORGAN_CONTRACT_PulseTouchThreatShape_V32,
    overlays: IMMORTAL_OVERLAYS_PulseTouchThreatShape_V32,
    build: buildThreatShape_v32
  };
}

PulseRealm.TouchThreatShape = {
  PulseTouchThreatShapeToSecurityDecision_v32,
  PulseTouchThreatShape_V32,
  buildThreatShape_v32,
  ORGAN_META_PulseTouchThreatShape_V32,
  ORGAN_CONTRACT_PulseTouchThreatShape_V32,
  IMMORTAL_OVERLAYS_PulseTouchThreatShape_V32
}