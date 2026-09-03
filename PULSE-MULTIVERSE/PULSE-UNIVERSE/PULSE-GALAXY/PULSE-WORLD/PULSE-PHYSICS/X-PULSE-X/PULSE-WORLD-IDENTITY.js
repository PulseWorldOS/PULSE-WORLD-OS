// ============================================================================
// FILE: Pulse-Coordinator/PULSE-WORLD-IDENTITY.js
// PULSE IDENTITY ENGINE — v30-Immortal-WorldPresence-ADVANTAGE++
// “THE SELF++++WORLD • BINARY-FIRST IDENTITY ENGINE • DUALBAND PRESENCE + WORLD + ADVANTAGE CORE”
// ============================================================================
//
// ROLE (v30-Immortal-WorldPresence-ADVANTAGE++):
//   • Canonical identity + presence + world + advantage validator for a binary-first organism.
//   • Dualband identity engine (Symbolic A → Binary B → Symbolic A) with compression + world metadata.
//   • Backbone of PulseBand / PulseNet / CheckBand / RouterMemory / PulseWorldSocialGraph identity field.
//   • Preserves lineage, drift markers, binary signatures, device trust, presence field, world field, advantage field.
//   • Presence-aware: Bluetooth / device / band presence surfaces, offline-first survival.
//   • World-aware: worldBand, social profile, trust/reputation, skill tiers, job/earn readiness.
//   • Advantage-aware: unified advantage hints, cascade level, time-saved descriptors, world-advantage overlays.
//   • Deterministic, replayable, lineage-safe, drift-aware, cache/chunk/prewarm-aware, artery-aware.
//   • Returns authoritative v30 identity + presence + world + advantage snapshot + unified SELF signature.
//
// CONTRACT (v30-Immortal-WorldPresence-ADVANTAGE++):
//   • Fail-open: invalid identity → null (frontend + PulseBand handle fallback).
//   • Never mutate original input; always clone/normalize.
//   • Always return structurally complete v30 identity snapshot when valid.
//   • Never trust external identity providers blindly; token is treated as hint only.
//   • No astral layers, no legacy PNS, no translator cores.
//   • Binary-first nervous system compliance; dualband compression + unified world+advantage field.
//   • No network fetch; no timers beyond PulseRealm.PulseNOW; no randomness; no external mutation.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


// ============================================================================
// LAYER CONSTANTS + DIAGNOSTICS
// ============================================================================

const LAYER_ID   = "IDENTITY-LAYER-BINARY-WORLD";
const LAYER_NAME = "THE SELF++++WORLD";
const LAYER_ROLE = "BINARY-FIRST SENSE-OF-SELF + WORLD ENGINE";
const LAYER_VER  = "30-Immortal-WorldPresence-ADVANTAGE++";

const IDENTITY_DIAGNOSTICS_ENABLED =
  PulseRealm.PULSE_IDENTITY_DIAGNOSTICS === "true" ||
  PulseRealm.PULSE_DIAGNOSTICS === "true";

function safeLog(...args)  { try { console.log(...args); } catch {} }
function safeError(...args){ try { console.error(...args); } catch {} }

const logSelf = (stage, details = {}) => {
  if (!IDENTITY_DIAGNOSTICS_ENABLED) return;

  safeLog(JSON.stringify({
    pulseLayer: LAYER_ID,
    pulseName:  LAYER_NAME,
    pulseRole:  LAYER_ROLE,
    pulseVer:   LAYER_VER,
    stage,
    ...details
  }));
};

// ============================================================================
// MODE RESOLUTION — A/B/A routing metadata
// ============================================================================

function resolveMode(event) {
  try {
    const headers = event.headers || {};
    return (
      headers["x-pulse-mode"] ||
      headers["X-Pulse-Mode"] ||
      "identity"
    ).toString();
  } catch {
    return "identity";
  }
}

// ============================================================================
// SIGNATURES — v30-Immortal-WorldPresence-ADVANTAGE++
// ============================================================================

function computeBinarySignature(identity) {
  try {
    const seed = JSON.stringify({
      uid: identity.uid,
      lineage: identity.lineage,
      drift: identity.drift,
      presenceBand: identity.presence.band || "unknown",
      worldBand: identity.world.worldBand || "unknown",
      advantageScore: identity.advantage.advantageScore ?? null,
      trustScore: identity.world.trustScore ?? null,
      reputationScore: identity.world.reputationScore ?? null
    });

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }

    return "BIN30-" + hash.toString(16).padStart(8, "0");
  } catch {
    return "BIN30-00000000";
  }
}

function computePresenceSignature(identity, presence) {
  try {
    const seed = JSON.stringify({
      uid: identity.uid,
      deviceId: presence.deviceId || null,
      bluetooth: !!presence.bluetooth,
      band: presence.band || "unknown",
      route: presence.route || "unknown",
      presenceLevel: presence.presenceLevel || "Unknown",
      lastSeenMs: presence.lastSeenMs || 0
    });

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }

    return "PRES30-" + hash.toString(16).padStart(8, "0");
  } catch {
    return "PRES30-00000000";
  }
}

function computeWorldSignature(world) {
  try {
    const seed = JSON.stringify({
      worldBand: world.worldBand || "presence",
      systemAge: world.systemAge || 0,
      skillTier: world.skillTier || null,
      mentorTier: world.mentorTier || null,
      trustScore: world.trustScore || 0,
      reputationScore: world.reputationScore || 0,
      followers: world.followersCount || 0,
      following: world.followingCount || 0
    });

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }

    return "WORLD30-" + hash.toString(16).padStart(8, "0");
  } catch {
    return "WORLD30-00000000";
  }
}

function computeAdvantageSignature(advantage) {
  try {
    const seed = JSON.stringify({
      score: advantage.advantageScore ?? null,
      band: advantage.advantageBand || "neutral",
      cascadeLevel: advantage.cascadeLevel ?? 0,
      field: advantage.field || "identity",
      worldAdvantageBand: advantage.worldAdvantageBand || "neutral",
      timeSavedMs: advantage.timeSavedMs ?? null
    });

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }

    return "ADV30-" + hash.toString(16).padStart(8, "0");
  } catch {
    return "ADV30-00000000";
  }
}

function computeTopologySignature(topology) {
  try {
    const seed = JSON.stringify({
      momHeart: topology.momHeart.identity || null,
      dadHeart: topology.dadHeart.identity || null,
      babyHeart: topology.babyHeart.identity || null,
      bandSource: topology.bandSource || "unknown",
      fallbackRules: topology.fallbackRules || null
    });

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }

    return "TOPO30-" + hash.toString(16).padStart(8, "0");
  } catch {
    return "TOPO30-00000000";
  }
}

function computeArterySignature(artery) {
  try {
    const seed = JSON.stringify({
      throughputBucket: artery.throughputBucket || "unknown",
      pressureBucket: artery.pressureBucket || "unknown",
      budgetBucket: artery.budgetBucket || "unknown",
      reproductionHint: artery.reproductionHint || "none",
      earnReadiness: artery.earnReadiness || "unknown"
    });

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }

    return "ARTERY30-" + hash.toString(16).padStart(8, "0");
  } catch {
    return "ARTERY30-00000000";
  }
}

// Unified SELF signature — one-band, all layers fused
function computeUnifiedSelfSignature(snap) {
  try {
    const seed = JSON.stringify({
      uid: snap.uid,
      identityVersion: snap.identityVersion,
      binarySignature: snap.binarySignature,
      presenceSignature: snap.presenceSignature,
      worldSignature: snap.worldSignature,
      advantageSignature: snap.advantageSignature,
      topologySignature: snap.topologySignature,
      arterySignature: snap.arterySignature,
      mode: snap.mode,
      layer: snap.layer
    });

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }

    return "SELF30-" + hash.toString(16).padStart(8, "0");
  } catch {
    return "SELF30-00000000";
  }
}

// ============================================================================
// SAFE HELPERS — TYPE-SAFE NORMALIZATION
// ============================================================================

function safeStr(v, d = "") {
  return typeof v === "string" ? v : d;
}

function safeBool(v, d = false) {
  return typeof v === "boolean" ? v : d;
}

function safeObj(v, d = {}) {
  return typeof v === "object" && v !== null ? v : d;
}

function safeNum(v, d = 0) {
  return typeof v === "number" && !isNaN(v) ? v : d;
}

function safeArr(v, d = []) {
  return Array.isArray(v) ? v : d;
}

// ============================================================================
// ADVANTAGE + TOPOLOGY + WORLD HINTS — metadata-only, no network
// ============================================================================

function safeAdvantageHint(advantageContext = {}, worldContext = {}) {
  try {
    const score = safeNum(
      advantageContext.advantageScore,
      advantageContext.score ?? null
    );
    const band = safeStr(
      advantageContext.advantageBand,
      advantageContext.band || "neutral"
    );

    const worldAdvantageBand = safeStr(
      worldContext.worldAdvantageBand,
      worldContext.worldBand || "presence"
    );

    return {
      advantageScore: score,
      advantageBand: band,
      worldAdvantageBand,
      regionAdvantage: safeObj(advantageContext.regionAdvantage, {}),
      cascadeHints: safeObj(advantageContext.cascadeHints, {}),
      cascadeLevel: safeNum(advantageContext.cascadeLevel, 0),
      timeSavedMs: safeNum(advantageContext.timeSavedMs, null),
      field: safeStr(advantageContext.field, "identity")
    };
  } catch {
    return {
      advantageScore: null,
      advantageBand: "neutral",
      worldAdvantageBand: "presence",
      regionAdvantage: {},
      cascadeHints: {},
      cascadeLevel: 0,
      timeSavedMs: null,
      field: "identity"
    };
  }
}

function safeTopologyHint(topologyContext = {}) {
  try {
    const mom = safeObj(topologyContext.momHeart, null);
    const dad = safeObj(topologyContext.dadHeart, null);
    const baby = safeObj(topologyContext.babyHeart, null);

    const fallbackRules = safeObj(topologyContext.fallbackRules, {
      babyPulseSource: "mom-or-dad",
      momFallbackToDad: true,
      dadFallbackToMom: true
    });

    return {
      momHeart: mom
        ? { identity: mom.identity || "mom-heart", role: mom.role || "MOM_HEART" }
        : null,
      dadHeart: dad
        ? { identity: dad.identity || "dad-heart", role: dad.role || "DAD_HEART" }
        : null,
      babyHeart: baby
        ? { identity: baby.identity || "baby-heart", role: baby.role || "EARN_HEART" }
        : null,
      bandSource: safeStr(topologyContext.bandSource, "identity"),
      fallbackRules
    };
  } catch {
    return {
      momHeart: null,
      dadHeart: null,
      babyHeart: null,
      bandSource: "identity",
      fallbackRules: {
        babyPulseSource: "mom-or-dad",
        momFallbackToDad: true,
        dadFallbackToMom: true
      }
    };
  }
}

function safeWorldPresenceHint(worldContext = {}, socialContext = {}) {
  try {
    const trustScore = safeNum(worldContext.trustScore, socialContext.trustScore || 0);
    const reputationScore = safeNum(
      worldContext.reputationScore,
      socialContext.reputationScore || 0
    );

    return {
      worldBand: safeStr(worldContext.worldBand, "presence"),
      systemAge: safeNum(worldContext.systemAge, socialContext.systemAge || 0),
      presenceBand: safeStr(worldContext.presenceBand, socialContext.presenceBand || "symbolic"),
      skillTier: safeStr(worldContext.skillTier, socialContext.skillTier || null),
      mentorTier: safeStr(worldContext.mentorTier, socialContext.mentorTier || null),
      trustScore,
      reputationScore,
      followersCount: safeNum(worldContext.followersCount, socialContext.followersCount || 0),
      followingCount: safeNum(worldContext.followingCount, socialContext.followingCount || 0),
      jobReadiness: safeStr(worldContext.jobReadiness, socialContext.jobReadiness || "unknown"),
      earnReadiness: safeStr(worldContext.earnReadiness, socialContext.earnReadiness || "unknown")
    };
  } catch {
    return {
      worldBand: "presence",
      systemAge: 0,
      presenceBand: "symbolic",
      skillTier: null,
      mentorTier: null,
      trustScore: 0,
      reputationScore: 0,
      followersCount: 0,
      followingCount: 0,
      jobReadiness: "unknown",
      earnReadiness: "unknown"
    };
  }
}

function safeSocialSnapshot(socialContext = {}) {
  try {
    return {
      hasGraph: !!socialContext.hasGraph,
      nodeDegree: safeNum(socialContext.nodeDegree, 0),
      mentorCount: safeNum(socialContext.mentorCount, 0),
      menteeCount: safeNum(socialContext.menteeCount, 0),
      partyCount: safeNum(socialContext.partyCount, 0),
      sessionCount: safeNum(socialContext.sessionCount, 0),
      coworkCount: safeNum(socialContext.coworkCount, 0),
      lastSnapshotTs: safeNum(socialContext.lastSnapshotTs, 0)
    };
  } catch {
    return {
      hasGraph: false,
      nodeDegree: 0,
      mentorCount: 0,
      menteeCount: 0,
      partyCount: 0,
      sessionCount: 0,
      coworkCount: 0,
      lastSnapshotTs: 0
    };
  }
}

function safeArterySnapshot(arteryContext = {}) {
  try {
    return {
      throughput: safeNum(arteryContext.throughput, 0),
      pressure: safeNum(arteryContext.pressure, 0),
      cost: safeNum(arteryContext.cost, 0),
      budget: safeNum(arteryContext.budget, 0),
      throughputBucket: safeStr(arteryContext.throughputBucket, "critical"),
      pressureBucket: safeStr(arteryContext.pressureBucket, "none"),
      costBucket: safeStr(arteryContext.costBucket, "none"),
      budgetBucket: safeStr(arteryContext.budgetBucket, "critical"),
      reproductionHint: safeStr(arteryContext.reproductionHint, "none"),
      earnReadiness: safeStr(arteryContext.earnReadiness, "unknown")
    };
  } catch {
    return {
      throughput: 0,
      pressure: 0,
      cost: 0,
      budget: 0,
      throughputBucket: "critical",
      pressureBucket: "none",
      costBucket: "none",
      budgetBucket: "critical",
      reproductionHint: "none",
      earnReadiness: "unknown"
    };
  }
}

// ============================================================================
// HELPERS — NORMALIZE IDENTITY TO v30-Immortal-WorldPresence-ADVANTAGE++ SHAPE
// ============================================================================

export function normalizeIdentity(
  raw,
  mode,
  presenceContext = {},
  worldContext = {},
  advantageContext = {},
  topologyContext = {},
  socialContext = {},
  arteryContext = {},
  admin // optional for deterministic time; falls back to PulseRealm.PulseNOW
) {
  if (!raw || typeof raw !== "object") return null;

  // ---------------------------------------------------------------------------
  // 1. DRIFT‑PROOF TIMESTAMP (IMMORTAL)
  // ---------------------------------------------------------------------------
  let now;
  try {
    if (admin && admin.firestore && admin.firestore.Timestamp) {
      now = admin.firestore.Timestamp.now().toMillis();
    } else {
      now = PulseRealm.PulseNOW;
    }
  } catch {
    now = PulseRealm.PulseNOW;
  }

  // ---------------------------------------------------------------------------
  // 2. CANONICAL PRESENCE SNAPSHOT
  // ---------------------------------------------------------------------------
  const presence = Object.freeze({
    deviceId: safeStr(presenceContext.deviceId, ""),
    bluetooth: safeBool(presenceContext.bluetooth, false),
    band: safeStr(presenceContext.band, "unknown"),
    route: safeStr(presenceContext.route, "unknown"),
    lastSeenMs: safeNum(presenceContext.lastSeenMs, 0),
    presenceLevel: safeStr(presenceContext.presenceLevel, "Unknown"),
    page: safeStr(presenceContext.page, null),
    mode: safeStr(presenceContext.mode, null)
  });

  // ---------------------------------------------------------------------------
  // 3. CANONICAL WORLD / ADVANTAGE / TOPOLOGY / SOCIAL / ARTERY SNAPSHOTS
  // ---------------------------------------------------------------------------
  const world = Object.freeze(safeWorldPresenceHint(worldContext, socialContext));
  const advantage = Object.freeze(safeAdvantageHint(advantageContext, world));
  const topology = Object.freeze(safeTopologyHint(topologyContext));
  const social = Object.freeze(safeSocialSnapshot(socialContext));
  const artery = Object.freeze(safeArterySnapshot(arteryContext));

  // ---------------------------------------------------------------------------
  // 4. CANONICAL IDENTITY SNAPSHOT (IMMORTAL v30)
// ---------------------------------------------------------------------------
  const normalized = {
    // Core identity
    uid: safeStr(raw.uid || raw.userId, null),
    email: safeStr(raw.email),
    name: safeStr(raw.name),
    roles: safeArr(raw.roles),

    // Identity health + drift markers
    identityHealth: safeStr(raw.identityHealth, "Unknown"),
    drift: safeObj(raw.drift, {}),

    // Lineage + versioning
    identityVersion: LAYER_VER,
    lineage: safeObj(raw.lineage, {}),
    repairMode: safeStr(raw.repairMode, "none"),

    // Device + session
    trustedDevice: safeBool(raw.trustedDevice, false),
    sessionAge: safeNum(raw.sessionAge, 0),
    lastVaultVisit: safeNum(raw.lastVaultVisit, 0),

    // Device profile
    deviceProfile: safeObj(raw.deviceProfile, {
      platform: safeStr(raw.platform, "unknown"),
      userAgent: safeStr(raw.userAgent, null)
    }),

    // Session profile
    sessionProfile: safeObj(raw.sessionProfile, {
      entryRoute: safeStr(raw.entryRoute, null),
      lastRoute: safeStr(raw.lastRoute, null)
    }),

    // Deterministic timestamps
    createdAt: safeNum(raw.createdAt, now),
    updatedAt: now,

    // Contextual layers
    presence,
    world,
    advantage,
    topology,
    social,
    artery,

    // Layer + mode
    layer: LAYER_NAME,
    context:
      "Canonical backend identity + presence + world + advantage + topology + social + artery snapshot (v30-Immortal-WorldPresence-ADVANTAGE++)",
    mode
  };

  // ---------------------------------------------------------------------------
  // 5. FREEZE BEFORE SIGNATURES (IMMORTAL RULE)
  // ---------------------------------------------------------------------------
  Object.freeze(normalized);

  // ---------------------------------------------------------------------------
  // 6. SIGNATURES (IMMUTABLE, DETERMINISTIC) + UNIFIED SELF
  // ---------------------------------------------------------------------------
  const withSignatures = {
    ...normalized,
    binarySignature: computeBinarySignature(normalized),
    presenceSignature: computePresenceSignature(normalized, presence),
    worldSignature: computeWorldSignature(world),
    advantageSignature: computeAdvantageSignature(advantage),
    topologySignature: computeTopologySignature(topology),
    arterySignature: computeArterySignature(artery)
  };

  return Object.freeze({
    ...withSignatures,
    unifiedSelfSignature: computeUnifiedSelfSignature(withSignatures)
  });
}

// ============================================================================
// DUALBAND IDENTITY REPAIR — A → B → A
// ============================================================================

async function repairIdentity(identity) {
  if (!identity) return null;

  return {
    ...identity,
    uid: identity.uid || identity.userId || null,
    resendToken: identity.resendToken || null
  };
}

async function dualbandRepair(identity) {
  const symbolic = await repairIdentity(identity);

  const binary = {
    ...symbolic,
    binaryCompressed: true,
    binarySignature: computeBinarySignature(symbolic)
  };

  return {
    ...binary,
    repairMode: "dualband-world"
  };
}

// ============================================================================
// IDENTITY LOADER — token → minimal identity seed (no DB, no cache wiring)
// ============================================================================

export async function validateAndLoadIdentity(token) {
  if (!token || typeof token !== "string") return null;

  const raw = token.replace("identity=", "").trim();
  if (!raw) return null;

  let decoded;
  try {
    decoded = JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
  } catch {
    return null;
  }

  if (!decoded.uid) return null;

  return {
    uid: decoded.uid,
    resendToken: decoded.resendToken || null,
    tokenVersion: decoded.version || "unknown",
    source: "token"
  };
}

// ============================================================================
// IDENTITY DIAGNOSTICS SNAPSHOT — metadata-only
// ============================================================================

function buildIdentityDiagnostics(normalized, mode) {
  if (!normalized) {
    return {
      ok: false,
      mode,
      reason: "IDENTITY_NULL"
    };
  }

  return {
    ok: true,
    mode,
    uid: normalized.uid || null,
    identityVersion: normalized.identityVersion,
    presenceBand: normalized.presence.band || "unknown",
    presenceLevel: normalized.presence.presenceLevel || "Unknown",
    worldBand: normalized.world.worldBand || "presence",
    systemAge: normalized.world.systemAge || 0,
    skillTier: normalized.world.skillTier || null,
    mentorTier: normalized.world.mentorTier || null,
    trustScore: normalized.world.trustScore || 0,
    reputationScore: normalized.world.reputationScore || 0,
    jobReadiness: normalized.world.jobReadiness || "unknown",
    earnReadiness: normalized.world.earnReadiness || "unknown",
    advantageBand: normalized.advantage.advantageBand || "neutral",
    advantageScore: normalized.advantage.advantageScore ?? null,
    topologyBandSource: normalized.topology.bandSource || "identity",
    binarySignature: normalized.binarySignature,
    presenceSignature: normalized.presenceSignature,
    worldSignature: normalized.worldSignature,
    advantageSignature: normalized.advantageSignature,
    topologySignature: normalized.topologySignature,
    arterySignature: normalized.arterySignature,
    unifiedSelfSignature: normalized.unifiedSelfSignature
  };
}
function mergePulseIdentity(saved, active) {
  return {
    id: saved.id ?? active.id,
    uid: saved.uid ?? active.uid,
    createdAt: saved.createdAt ?? active.createdAt,
    tier: saved.tier ?? active.tier,

    name: saved.name ?? active.name,
    email: saved.email ?? active.email,
    userEmail: saved.userEmail ?? active.userEmail,
    userName: saved.userName ?? active.userName,
    phone: saved.phone ?? active.phone,
    country: saved.country ?? active.country,

    role: saved.role ?? active.role,
    pulseRole: saved.pulseRole ?? active.pulseRole,

    bank: saved.bank ?? active.bank,
    bankURL: saved.bankURL ?? active.bankURL,
    stripeLogin: saved.stripeLogin ?? active.stripeLogin,

    drift: saved.drift ?? active.drift,
    device: saved.device ?? active.device,

    photoURL: saved.photoURL ?? active.photoURL,
    aliasPhotoURL: saved.aliasPhotoURL ?? active.aliasPhotoURL,
    bizphotoURL: saved.bizphotoURL ?? active.bizphotoURL,
    bizaliasPhotoURL: saved.bizaliasPhotoURL ?? active.bizaliasPhotoURL,

    PulsePoints: saved.PulsePoints ?? active.PulsePoints ?? 0,
    PulseLoyalty: saved.PulseLoyalty ?? active.PulseLoyalty,

    deviceFingerprint: saved.deviceFingerprint ?? active.deviceFingerprint,
    browserFingerprint: saved.browserFingerprint ?? active.browserFingerprint,
    dnsOrigin: saved.dnsOrigin ?? active.dnsOrigin,
    proxyClass: saved.proxyClass ?? active.proxyClass,
    worldSignature: saved.worldSignature ?? active.worldSignature,

    logs: [
      ...(active.logs || []),
      ...(saved.logs || [])
    ]
  };
}

// ============================================================================
// BACKEND ENTRY POINT — “THE SELF++++WORLD” v30-Immortal-WorldPresence-ADVANTAGE++
// ============================================================================

export const handler = async (event, context) => {
  const mode = resolveMode(event);

  logSelf("INTAKE_START", {
    hasCookie: !!event.headers.cookie,
    mode
  });

  try {
    const token = event.headers.cookie || "";
    logSelf("TOKEN_LOADED", { tokenLength: token.length, mode });

    const identity = await validateAndLoadIdentity(token);

    if (!identity) {
      logSelf("IDENTITY_INVALID", { mode });
      return {
        statusCode: 401,
        body: JSON.stringify(null)
      };
    }

    logSelf("IDENTITY_LOADED", {
      uid: identity.uid || null,
      mode
    });

    // ⭐ ACTIVE IDENTITY SCHEMA (PulseIdentity builder)
    const active = PulseRealm.PulseIdentity();

    // ⭐ MERGE SAVED + ACTIVE
    const merged = mergePulseIdentity(identity, active);

    logSelf("IDENTITY_MERGED", {
      uid: merged.uid || null,
      mode
    });

    // ⭐ REPAIR MERGED IDENTITY
    const repaired = await dualbandRepair(merged);

    logSelf("IDENTITY_REPAIRED", {
      uid: repaired.uid || null,
      mode
    });

    // Context injection
    const presenceContext = event.presenceContext || {};
    const worldContext = event.worldContext || {};
    const advantageContext = event.advantageContext || {};
    const topologyContext = event.topologyContext || {};
    const socialContext = event.socialContext || {};
    const arteryContext = event.arteryContext || {};

    // ⭐ NORMALIZE REPAIRED IDENTITY
    const normalized = normalizeIdentity(
      repaired,
      mode,
      presenceContext,
      worldContext,
      advantageContext,
      topologyContext,
      socialContext,
      arteryContext
    );

    const diagnostics = buildIdentityDiagnostics(normalized, mode);

    logSelf("IDENTITY_NORMALIZED", {
      uid: normalized.uid || null,
      version: normalized.identityVersion,
      presenceSignature: normalized.presenceSignature,
      worldSignature: normalized.worldSignature,
      advantageSignature: normalized.advantageSignature,
      topologySignature: normalized.topologySignature,
      arterySignature: normalized.arterySignature,
      unifiedSelfSignature: normalized.unifiedSelfSignature,
      mode
    });

    logSelf("RETURN_SELF", {
      uid: normalized.uid || null,
      mode
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        snapshot: normalized,
        diagnostics
      })
    };

  } catch (err) {
    safeError("CheckIdentity v30-Immortal-WorldPresence-ADVANTAGE++ error:", err);

    logSelf("FATAL_ERROR", {
      message: err.message || "Unknown error",
      mode
    });

    return {
      statusCode: 500,
      body: JSON.stringify(null)
    };
  }
};
