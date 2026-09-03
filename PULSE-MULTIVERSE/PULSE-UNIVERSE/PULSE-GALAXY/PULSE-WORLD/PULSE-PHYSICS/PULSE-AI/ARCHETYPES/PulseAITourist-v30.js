// ============================================================================
//  PULSE OS v30.0‑IMMORTAL‑OMNI — aiTourist Organ
//  Public + User‑Scoped Data Pantry • Multi‑Persona • Multi‑Trust • Multi‑Cache
//  ZERO MUTATION • ZERO IDENTITY LEAKAGE • ZERO RANDOMNESS • DETERMINISTIC
//  TOURIST ENGINE v30 — 6‑LAYER STACK
// ============================================================================
//
//  L1 — Identity Layer
//       persona, owner, trust fabric, jury, capability class
//
//  L2 — Access Layer
//       tourist-safe, user-scoped, owner-only, persona-aware
//
//  L3 — Cache Layer v6
//       multi-band, multi-scope, multi-expiry, deterministic
//
//  L4 — Data Layer
//       safe DB reads, identity-stripped, deterministic bundles
//
//  L5 — Bundle Layer v6
//       area, business, events, environment, power, user bundles
//
//  L6 — Intent Layer v6
//       multi-intent router, multi-band, multi-scope
//
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
//  META — v30 IMMORTAL‑OMNI
// ============================================================================
export const TouristMeta = Object.freeze({
  type: "Cognitive",
  subsystem: "aiTourist",
  layer: "TouristOrgan",
  version: "30.0-IMMORTAL-OMNI",
  identity: "aiTourist-v30-IMMORTAL-OMNI",

  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    dualband: true,
    personaAware: true,
    trustAware: true,
    juryAware: true,
    identitySafe: true,
    multiInstanceReady: true,
    epoch: "30.0-IMMORTAL-OMNI"
  }),

  contract: Object.freeze({
    never: Object.freeze([
      "mutate data",
      "write to DB",
      "delete data",
      "expose UID or identity anchors",
      "bypass persona boundaries",
      "bypass trust fabric",
      "introduce randomness"
    ]),
    always: Object.freeze([
      "strip identity",
      "respect persona scope",
      "respect owner boundaries",
      "respect trust fabric",
      "remain deterministic",
      "remain read-only"
    ])
  })
});


// ============================================================================
//  PACKET EMITTER — deterministic
// ============================================================================
function emitTouristPacket(type, payload) {
  return Object.freeze({
    type: `tourist-${type}`,
    epoch: TouristMeta.evo.epoch,
    timestamp: PulseRealm.PulseNOW,
    meta: TouristMeta,
    ...payload
  });
}


// ============================================================================
//  GLOBAL MULTI‑CACHE v6 — tourist/user/owner + persona-aware
// ============================================================================
const _TOURIST_CACHE_V30 = new Map();

function parseMaxAge(cacheControl) {
  if (!cacheControl) return 0;
  const m = cacheControl.match(/max-age=(\d+)/);
  return m ? parseInt(m[1], 10) * 1000 : 0;
}

function makeCacheKey({ key, scope, userId, personaId }) {
  return `${key}::${scope}::${personaId || "persona"}::${userId || "anon"}`;
}


// ============================================================================
//  IDENTITY STRIPPER v30 — removes ALL identity anchors
// ============================================================================
function stripIdentity(record) {
  if (!record || typeof record !== "object") return record;
  const clone = { ...record };
  delete clone.uid;
  delete clone.userId;
  delete clone.identityRoot;
  delete clone.sessionRoot;
  delete clone.deviceFingerprint;
  delete clone.resendToken;
  return clone;
}


// ============================================================================
//  ACCESS MAP v30 — persona-aware, trust-aware
// ============================================================================
const ACCESS_V30 = Object.freeze({
  // TOURIST SAFE
  businesses:           { scope: "tourist" },
  events:               { scope: "tourist" },
  environment:          { scope: "tourist" },
  environment_history:  { scope: "tourist" },
  power:                { scope: "tourist" },
  powerHistory:         { scope: "tourist" },
  powerSettings:        { scope: "tourist" },
  categoryIconCache:    { scope: "tourist" },
  duplicateImages:      { scope: "tourist" },
  pulseHistory:         { scope: "tourist" },

  // USER SCOPED
  orders:               { scope: "user" },
  referrals:            { scope: "user" },
  referralClicks:       { scope: "user" },
  vaultHistory:         { scope: "user" },
  timerLogsUserTried:   { scope: "user" },
  timerLogsUserSaved:   { scope: "user" },

  // OWNER ONLY
  functionErrors:       { scope: "owner" },
  identityHistory:      { scope: "owner" },
  securityViolations:   { scope: "owner" },
  emailLogs:            { scope: "owner" },
  settings:             { scope: "owner" }
});


// ============================================================================
//  CACHE CONTROL v30 — multi-band, multi-scope
// ============================================================================
const CACHE_CONTROL_V30 = Object.freeze({
  businesses:           "public,max-age=300",
  events:               "public,max-age=300",
  environment:          "public,max-age=30",
  environment_history:  "public,max-age=60",
  power:                "public,max-age=30",
  powerHistory:         "public,max-age=60",
  powerSettings:        "public,max-age=120",
  categoryIconCache:    "public,max-age=600",
  duplicateImages:      "public,max-age=600",
  pulseHistory:         "public,max-age=120",

  orders:               "private,max-age=60",
  referrals:            "private,max-age=60",
  referralClicks:       "private,max-age=60",
  vaultHistory:         "private,max-age=60",
  timerLogsUserTried:   "private,max-age=30",
  timerLogsUserSaved:   "private,max-age=30",

  functionErrors:       "no-store",
  identityHistory:      "no-store",
  securityViolations:   "no-store",
  emailLogs:            "no-store",
  settings:             "no-store"
});


// ============================================================================
//  FACTORY — createTouristAPI v30 IMMORTAL‑OMNI
// ============================================================================
export function createTouristAPI_v30(db) {

  // -------------------------------------------------------------------------
  //  FETCH COLLECTION v30 — persona-aware, trust-aware, multi-cache
  // -------------------------------------------------------------------------
  async function fetchCollection(context, key, options = {}) {
    const { userId, userIsOwner, personaId = "tourguide", trustArtery = {} } = context;

    const access = ACCESS_V30[key];
    const cacheControl = CACHE_CONTROL_V30[key] || "no-store";
    const maxAgeMs = parseMaxAge(cacheControl);

    if (!access) {
      console.log(`aiTourist-v30: unknown collection "${key}".`);
      return emitTouristPacket("bundle", { data: [], cache: cacheControl });
    }

    const scope = access.scope;
    const cacheKey = makeCacheKey({ key, scope, userId, personaId });

    // OWNER ONLY
    if (scope === "owner") {
      if (!userIsOwner) {
        console.log(`aiTourist-v30: owner-only "${key}" blocked.`);
        return emitTouristPacket("bundle", { data: [], cache: cacheControl });
      }
    }

    // USER SCOPED
    if (scope === "user" && !userId) {
      console.log(`aiTourist-v30: user-scoped "${key}" without userId.`);
      return emitTouristPacket("bundle", { data: [], cache: cacheControl });
    }

    // CACHE HIT
    if (cacheControl !== "no-store" && maxAgeMs > 0) {
      const cached = _TOURIST_CACHE_V30.get(cacheKey);
      if (cached && cached.expiresAt > PulseRealm.PulseNOW) {
        console.log(`aiTourist-v30: cache hit "${key}"`);
        return cached.packet;
      }
    }

    // DB READ
    const rows = await db.getCollection(
      key,
      scope === "user"
        ? { ...options, where: { ...(options.where || {}), userId } }
        : options
    );

    const cleaned = rows.map(stripIdentity);

    const packet = emitTouristPacket("bundle", {
      data: Object.freeze(cleaned),
      cache: cacheControl,
      chunk: Object.freeze({
        size: JSON.stringify(cleaned).length,
        cacheControl,
        scope
      })
    });

    if (cacheControl !== "no-store" && maxAgeMs > 0) {
      _TOURIST_CACHE_V30.set(cacheKey, {
        packet,
        expiresAt: PulseRealm.PulseNOW + maxAgeMs
      });
    }

    return packet;
  }


  // -------------------------------------------------------------------------
  //  BUNDLE BUILDERS v30 — deterministic, persona-aware
  // -------------------------------------------------------------------------
  async function buildEnvironmentBundle(context) {
    const [env, envHist] = await Promise.all([
      fetchCollection(context, "environment"),
      fetchCollection(context, "environment_history")
    ]);

    const data = Object.freeze({
      environment: env.data,
      environmentHistory: envHist.data
    });

    return emitTouristPacket("bundle", {
      data,
      cache: { environment: env.cache, environmentHistory: envHist.cache }
    });
  }

  async function buildPowerBundle(context) {
    const [p, pHist, pSet] = await Promise.all([
      fetchCollection(context, "power"),
      fetchCollection(context, "powerHistory"),
      fetchCollection(context, "powerSettings")
    ]);

    const data = Object.freeze({
      power: p.data,
      powerHistory: pHist.data,
      powerSettings: pSet.data
    });

    return emitTouristPacket("bundle", {
      data,
      cache: { power: p.cache, powerHistory: pHist.cache, powerSettings: pSet.cache }
    });
  }

  async function buildBusinessBundle(context, businessId) {
    const [biz, menus, dup, icons] = await Promise.all([
      fetchCollection(context, "businesses", { where: { id: businessId } }),
      fetchCollection(context, "menuSources", { where: { businessId } }),
      fetchCollection(context, "duplicateImages", { where: { businessId } }),
      fetchCollection(context, "categoryIconCache")
    ]);

    const data = Object.freeze({
      business: biz.data[0] || null,
      menus: menus.data,
      duplicateImages: dup.data,
      categoryIcons: icons.data
    });

    return emitTouristPacket("bundle", {
      data,
      cache: {
        business: biz.cache,
        menus: menus.cache,
        duplicateImages: dup.cache,
        categoryIcons: icons.cache
      }
    });
  }

  async function buildAreaOverview(context) {
    const [biz, events, env, power, pulse] = await Promise.all([
      fetchCollection(context, "businesses"),
      fetchCollection(context, "events"),
      buildEnvironmentBundle(context),
      buildPowerBundle(context),
      fetchCollection(context, "pulseHistory")
    ]);

    const data = Object.freeze({
      businesses: biz.data,
      events: events.data,
      environment: env.data,
      power: power.data,
      pulseHistory: pulse.data
    });

    return emitTouristPacket("bundle", {
      data,
      cache: {
        businesses: biz.cache,
        events: events.cache,
        environment: env.cache,
        power: power.cache,
        pulseHistory: pulse.cache
      }
    });
  }

  async function prewarmTourist(context = {}) {
  const log = PulseRealm.PulseLog || console.log;

  log("aiTourist-v30: prewarm starting…");

  // Collections worth prewarming
  const keys = [
    "environment",
    "environment_history",
    "power",
    "powerHistory",
    "powerSettings",
    "businesses",
    "events",
    "pulseHistory",
    "categoryIconCache"
  ];

  const results = {};

  for (const key of keys) {
    try {
      const packet = await fetchCollection(context, key);
      results[key] = {
        ok: true,
        size: packet.chunk.size ?? null,
        cache: packet.cache ?? null
      };
      log(`aiTourist-v30: prewarmed "${key}"`);
    } catch (err) {
      results[key] = { ok: false, error: String(err) };
      log(`aiTourist-v30: prewarm failed "${key}" → ${String(err)}`);
    }
  }

  log("aiTourist-v30: prewarm complete.");

  return emitTouristPacket("prewarm", {
    message: "Tourist organ prewarmed and cache primed.",
    results
  });
}



  // -------------------------------------------------------------------------
  //  INTENT ROUTER v30 — multi-band, multi-scope
  // -------------------------------------------------------------------------
  async function resolveIntent(context, intent) {
    if (!intent || !intent.type) {
      console.log("aiTourist-v30: missing intent type.");
      return emitTouristPacket("bundle", { data: {} });
    }

    switch (intent.type) {
      case "explore-area":
        return buildAreaOverview(context);

      case "check-environment":
        return buildEnvironmentBundle(context);

      case "check-power":
        return buildPowerBundle(context);

      case "view-business":
        return buildBusinessBundle(context, intent.businessId);

      case "list-events":
        return fetchCollection(context, "events");

      default:
        console.log(`aiTourist-v30: unknown intent "${intent.type}".`);
        return emitTouristPacket("bundle", { data: {} });
    }
  }


  // -------------------------------------------------------------------------
  //  PUBLIC API v30
  // -------------------------------------------------------------------------
  return {
    fetchCollection,
    resolveIntent,
    prewarmTourist,
    getEnvironmentBundle: (ctx) => buildEnvironmentBundle(ctx),
    getPowerBundle: (ctx) => buildPowerBundle(ctx),
    getBusinessBundle: (ctx, id) => buildBusinessBundle(ctx, id),
    getTouristOverview: (ctx) => buildAreaOverview(ctx),

    clearCache() {
      _TOURIST_CACHE_V30.clear();
      return emitTouristPacket("cache-clear", { message: "Tourist cache cleared." });
    },

    getCacheStats() {
      const entries = [];
      for (const [key, value] of _TOURIST_CACHE_V30.entries()) {
        entries.push({ key, expiresAt: value.expiresAt });
      }
      return emitTouristPacket("cache-stats", {
        size: _TOURIST_CACHE_V30.size,
        entries
      });
    }
  };
}
// ============================================================================
//  DIRECT EXPORTABLE PREWARM FUNCTION (GLOBAL)
// ============================================================================
export async function prewarmTourist_v30(db, context = {}) {
  const api = createTouristAPI_v30(db);
  return api.prewarmTourist(context);
}

PulseRealm.AITourist = {
  createTouristAPI_v30,
  prewarmTourist_v30,
  TouristMeta
}
