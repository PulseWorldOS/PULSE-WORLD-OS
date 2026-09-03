// ============================================================================
//  aiEarn-v30-Immortal-Organism-TRUST-OMEGA.js
//  Pulse OS v30+ • Earn Organ (Economics + Rewards + Flow + Liquidity)
// ============================================================================
//
// ROLE (v30-Immortal-Organism-TRUST-OMEGA):
//   • Provide AI with a SAFE, READ‑ONLY, DETERMINISTIC view into PulseEarn data.
//   • User: orders, referrals, referralClicks, vaultHistory, pulseHistory.
//   • Owner: system‑level earning patterns, anomalies, lineage, evolution logs.
//   • Deeply integrated with:
//       - dual‑band organism artery
//       - GPU lanes + concurrency hints
//       - economic pressure + liquidity + saturation
//       - trust fabric, jury, evidence, watchdog, Pulse‑Net overlays
//   • Emits deterministic, lane‑tagged, hash‑signed packets for higher AI.
//
// CONTRACT (TRUST-OMEGA):
//   • READ‑ONLY.
//   • ZERO MUTATION of external data.
//   • ZERO RANDOMNESS.
//   • ZERO DIRECT NETWORK / INTERNET ACCESS.
//   • DETERMINISTIC ANALYSIS ONLY.
//   • NO IDENTITY ANCHORS (uid, resendToken, etc.) in outputs.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import { getOrganismSnapshot } from "./PulseAIDeps-v30.js";



// ---------------------------------------------------------------------------
// META
// ---------------------------------------------------------------------------

export const EarnMeta = Object.freeze({
  version: "v30-Immortal-Organism-TRUST-OMEGA",
  layer: "organ",
  role: "earn-intel",
  identity: "ai-earn-organ-v30",
  band: "symbolic+binary",
  epoch: 30_000
});

// ---------------------------------------------------------------------------
// HASH HELPERS (deterministic, structure-aware)
// ---------------------------------------------------------------------------

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

// Primary INTEL hash — deterministic, structure-aware, no IO, no time.
function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function buildDualHashSignature(label, intelPayload, classicString) {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intelHash = computeHashIntelligence(intelBase);
  const classicHash = computeHash(`${label}::${classicString || ""}`);
  return {
    intel: intelHash,
    classic: classicHash
  };
}

// ---------------------------------------------------------------------------
// NUMERIC + BAND HELPERS
// ---------------------------------------------------------------------------

function toNumber(v, fallback) {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function clamp01(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  if (n < 0) return 0;
  if (n > 1) return 1;
  return n;
}

function normalizeBand(b) {
  const x = String(b || "symbolic").toLowerCase();
  return x === "binary" ? "binary" : "symbolic";
}

// ---------------------------------------------------------------------------
// PRESENCE + ADVANTAGE FIELDS (v30+)
// ---------------------------------------------------------------------------

function buildPresenceField(snapshot, dualBand) {
  const band = normalizeBand(
    dualBand.band ||
      snapshot.band ||
      "symbolic"
  );

  const presenceBand =
    dualBand.presenceContext.bandPresence ||
    snapshot.presenceBand ||
    band;

  const devicePresence =
    dualBand.presenceContext.devicePresence ||
    "local";

  const routerPresence =
    dualBand.presenceContext.routerPresence ||
    "stable";

  const regionTag =
    dualBand.regionContext.regionTag ||
    "unknown-region";

  const presenceVersion = EarnMeta.version;

  const field = Object.freeze({
    presenceVersion,
    band,
    presenceBand,
    devicePresence,
    routerPresence,
    regionTag
  });

  const raw = [
    presenceVersion,
    band,
    presenceBand,
    devicePresence,
    routerPresence,
    regionTag
  ].join("::");

  return {
    field,
    presenceSignature: buildDualHashSignature(`AI_EARN_PRESENCE::${raw}`)
  };
}

function buildAdvantageField(snapshot, dualBand) {
  const advCtx = dualBand.advantageContext || {};
  const snapAdv = snapshot.advantageField || {};

  const ctxScore = toNumber(advCtx.score, 0);
  const ctxTier = advCtx.tier ?? null;
  const ctxBand = advCtx.band || null;

  const snapScore = toNumber(snapAdv.advantageScore, 0);
  const snapTier = snapAdv.presenceTier ?? null;
  const snapBand = snapAdv.band || null;

  const score = Math.max(ctxScore, snapScore);
  const band =
    ctxBand ||
    snapBand ||
    snapshot.band ||
    "symbolic";

  const tier =
    ctxTier != null
      ? ctxTier
      : snapTier != null
      ? snapTier
      : 0;

  const advantageVersion = "M-AI-EARN-30.0-TRUST-OMEGA";

  const field = Object.freeze({
    advantageVersion,
    score,
    band,
    tier,
    skeletalScore: snapScore,
    skeletalBand: snapBand,
    skeletalTier: snapTier
  });

  const raw = `AI_EARN_ADV_M::v:${advantageVersion}::score:${score}::band:${band}::tier:${tier}::skScore:${snapScore}::skBand:${snapBand}::skTier:${snapTier}`;

  return {
    field,
    advantageSignature: buildDualHashSignature(raw)
  };
}

// ---------------------------------------------------------------------------
// ECONOMIC PRESSURE + LIQUIDITY + GPU LANES (v30+)
// ---------------------------------------------------------------------------

function computeBinaryEconomicPressure(snapshot) {
  if (!snapshot.binary.metabolic) {
    return Object.freeze({
      pressure: 0,
      load: 0,
      bucket: "none",
      laneHint: "earn-none",
      gpuLaneHint: "gpu-none"
    });
  }

  const pressure = clamp01(snapshot.binary.metabolic.pressure ?? 0);
  const load = clamp01(snapshot.binary.metabolic.load ?? 0);

  let bucket = "none";
  if (pressure >= 0.9) bucket = "critical";
  else if (pressure >= 0.7) bucket = "high";
  else if (pressure >= 0.4) bucket = "medium";
  else if (pressure > 0) bucket = "low";

  const laneHint = `earn-${bucket}`;
  const gpuLaneHint = `gpu-earn-${bucket}`;

  return Object.freeze({ pressure, load, bucket, laneHint, gpuLaneHint });
}

// Liquidity profile: how “alive” the earn flows are vs. their volume.
function computeLiquidityProfile(econSummary) {
  const engagement = econSummary.engagementScore || 0;
  const value = econSummary.totalOrdersValue || 0;

  const engagementNorm = Math.min(1, engagement / 1000);
  const valueNorm = Math.min(1, value / 10_000);

  const liquidity = clamp01((engagementNorm * 0.6 + valueNorm * 0.4));
  const saturation = clamp01(valueNorm * 0.8 + engagementNorm * 0.2);

  let liquidityBucket = "dry";
  if (liquidity >= 0.9) liquidityBucket = "flooded";
  else if (liquidity >= 0.7) liquidityBucket = "rich";
  else if (liquidity >= 0.4) liquidityBucket = "active";
  else if (liquidity > 0) liquidityBucket = "thin";

  let saturationBucket = "idle";
  if (saturation >= 0.9) saturationBucket = "saturated";
  else if (saturation >= 0.7) saturationBucket = "dense";
  else if (saturation >= 0.4) saturationBucket = "moderate";
  else if (saturation > 0) saturationBucket = "light";

  return Object.freeze({
    liquidity,
    liquidityBucket,
    saturation,
    saturationBucket
  });
}

// Concurrency hint: how aggressively the engine should schedule Earn‑related work.
function computeLaneConcurrencyHint(pressure, liquidityProfile) {
  const p = pressure.pressure || 0;
  const l = liquidityProfile.liquidity || 0;

  // High pressure + high liquidity → careful but continuous.
  // Low pressure + high liquidity → can batch more aggressively.
  const raw = clamp01(0.5 * (1 - p) + 0.5 * l);

  let mode = "concurrency-low";
  if (raw >= 0.85) mode = "concurrency-ultra";
  else if (raw >= 0.65) mode = "concurrency-high";
  else if (raw >= 0.4) mode = "concurrency-medium";

  return Object.freeze({
    score: raw,
    mode
  });
}

// ---------------------------------------------------------------------------
// DUAL-BAND ARTERY EXTRACTION
// ---------------------------------------------------------------------------

function extractDualBandArtery(dualBand) {
  const artery = dualBand.artery || null;
  if (!artery) return null;

  return Object.freeze({
    organismPressure: artery.organism.pressure ?? null,
    organismPressureBucket: artery.organism.pressureBucket ?? null,
    diagnostics: artery.diagnostics || null,
    proxy: artery.proxy || null,
    gpu: artery.gpu || null,
    binaryOverlay: artery.binaryOverlay || null
  });
}

// ---------------------------------------------------------------------------
// ECONOMIC SUMMARY (unchanged core, extended for v30+)
// ---------------------------------------------------------------------------

function computeEconomicSummary(payload) {
  const orders = payload.orders || [];
  const referrals = payload.referrals || [];
  const referralClicks = payload.referralClicks || [];
  const vaultHistory = payload.vaultHistory || [];
  const pulseHistory = payload.pulseHistory || [];

  const orderCount = orders.length;
  const referralCount = referrals.length;
  const referralClickCount = referralClicks.length;
  const vaultEvents = vaultHistory.length;
  const pulseEvents = pulseHistory.length;

  const totalOrdersValue = orders.reduce(
    (acc, o) => acc + toNumber(o.total, 0),
    0
  );

  const totalVaultDelta = vaultHistory.reduce(
    (acc, v) => acc + toNumber(v.delta, 0),
    0
  );

  const totalPulseDelta = pulseHistory.reduce(
    (acc, p) => acc + toNumber(p.delta, 0),
    0
  );

  const engagementScore =
    orderCount * 3 +
    referralCount * 2 +
    referralClickCount * 1 +
    vaultEvents * 1 +
    pulseEvents * 1;

  const anomalyHint =
    engagementScore === 0 && (orderCount > 0 || referralCount > 0)
      ? "stalled-engagement"
      : engagementScore > 0 && totalOrdersValue === 0
      ? "zero-value-flow"
      : "none";

  return Object.freeze({
    orderCount,
    referralCount,
    referralClickCount,
    vaultEvents,
    pulseEvents,
    totalOrdersValue,
    totalVaultDelta,
    totalPulseDelta,
    engagementScore,
    anomalyHint
  });
}

// ---------------------------------------------------------------------------
// PACKET BUILDER (v30+ TRUST-OMEGA)
// ---------------------------------------------------------------------------

function buildDeterministicEarnPacket(type, payload, snapshot, dualBand) {
  const pressure = computeBinaryEconomicPressure(snapshot);
  const econSummary = computeEconomicSummary(payload);
  const liquidityProfile = computeLiquidityProfile(econSummary);
  const concurrencyHint = computeLaneConcurrencyHint(pressure, liquidityProfile);

  const { field: presenceField, presenceSignature } = buildPresenceField(
    snapshot,
    dualBand
  );
  const { field: advantageField, advantageSignature } = buildAdvantageField(
    snapshot,
    dualBand
  );
  const dualBandArtery = extractDualBandArtery(dualBand);

  const lane = pressure.laneHint || "earn-none";
  const bucket = pressure.bucket || "none";
  const gpuLane = pressure.gpuLaneHint || "gpu-none";

  const corePayload = Object.freeze({
    ...payload,
    pressure,
    presenceField,
    advantageField,
    dualBandArtery,
    econSummary,
    liquidityProfile,
    concurrencyHint,
    meta: EarnMeta
  });

  const core = Object.freeze({
    type: `earn-${type}`,
    lane,
    bucket,
    gpuLane,
    payload: corePayload
  });

  const packetSignature = buildDualHashSignature(
    [
      "AI_EARN_PACKET",
      type,
      lane,
      bucket,
      gpuLane,
      presenceField.presenceBand,
      advantageField.band,
      `tier:${advantageField.tier}`,
      dualBandArtery.organismPressureBucket || "none",
      econSummary.anomalyHint,
      liquidityProfile.liquidityBucket,
      concurrencyHint.mode
    ].join("::")
  );

  return Object.freeze({
    ...core,
    presenceSignature,
    advantageSignature,
    packetSignature
  });
}

// ---------------------------------------------------------------------------
// PREWARM (v30+)
// ---------------------------------------------------------------------------

export function prewarmEarnOrgan(db, evolutionAPI, dualBand) {
  try {
    const warmRecord = {
      uid: "x",
      userId: "y",
      resendToken: "z",
      identityRoot: "root",
      sessionRoot: "session",
      deviceFingerprint: "fp",
      value: 123
    };

    const _ = {
      ...warmRecord,
      ...Object.fromEntries(
        Object.entries(warmRecord).filter(([k]) =>
          ![
            "uid",
            "userId",
            "resendToken",
            "identityRoot",
            "sessionRoot",
            "deviceFingerprint"
          ].includes(k)
        )
      )
    };

    db.getCollection("orders", { where: { userId: "prewarm" } });
    db.getDocument("orders", "prewarm");

    const snapshot = getOrganismSnapshot(dualBand);

    const _pressure = computeBinaryEconomicPressure(snapshot);
    const _econSummary = computeEconomicSummary({ orders: [], referrals: [] });
    const _liq = computeLiquidityProfile(_econSummary);
    const _concurrency = computeLaneConcurrencyHint(_pressure, _liq);

    const _packet = buildDeterministicEarnPacket(
      "prewarm",
      { warm: true },
      snapshot,
      dualBand
    );

    evolutionAPI.getOrganismOverview({ userIsOwner: true });
    evolutionAPI.analyzeSchema({ userIsOwner: true }, "pulseEarn");
    evolutionAPI.analyzeFile(
      { userIsOwner: true },
      "PulseEarn-v31.js"
    );
    evolutionAPI.analyzeRoute({ userIsOwner: true }, "earn");

    return true;
  } catch (err) {
    console.error("[Earn Prewarm v30-OMEGA] Failed:", err);
    return false;
  }
}

// ---------------------------------------------------------------------------
// MAIN API (v30+)
// ---------------------------------------------------------------------------
export function createEarnAPI(db, evolutionAPI, dualBand = null) {
  prewarmEarnOrgan(db, evolutionAPI, dualBand);

  function stripIdentity(record) {
    if (!record || typeof record !== "object") return record;

    const clone = { ...record };
    delete clone.uid;
    delete clone.userId;
    delete clone.resendToken;
    delete clone.identityRoot;
    delete clone.sessionRoot;
    delete clone.deviceFingerprint;

    return clone;
  }

  async function fetchUserScoped(context, collection, options = {}) {
    const { userId } = context;

    if (!userId) {
      context.logStep(`aiEarn-v30: user‑scoped "${collection}" requested without userId.`);
      return [];
    }

    const rows = await db.getCollection(collection, {
      ...options,
      where: { userId }
    });

    return rows.map(stripIdentity);
  }

  async function fetchOwnerScoped(context, collection, options = {}) {
    if (!context.userIsOwner) {
      context.logStep(`aiEarn-v30: owner‑only "${collection}" blocked for non‑owner.`);
      return [];
    }

    const rows = await db.getCollection(collection, options);
    return rows.map(stripIdentity);
  }

  const api = {
    meta: EarnMeta,

    // USER — “How am I earning?”
    async getUserEarnOverview(context) {
      const [
        orders,
        referrals,
        referralClicks,
        vaultHistory,
        pulseHistory
      ] = await Promise.all([
        fetchUserScoped(context, "orders"),
        fetchUserScoped(context, "referrals"),
        fetchUserScoped(context, "referralClicks"),
        fetchUserScoped(context, "vaultHistory"),
        fetchUserScoped(context, "pulseHistory")
      ]);

      const snapshot = getOrganismSnapshot(dualBand);

      return buildDeterministicEarnPacket(
        "user-overview",
        Object.freeze({
          orders,
          referrals,
          referralClicks,
          vaultHistory,
          pulseHistory,
          organismSnapshot: snapshot
        }),
        snapshot,
        dualBand
      );
    },

    async getUserReferrals(context) {
      const [referrals, referralClicks] = await Promise.all([
        fetchUserScoped(context, "referrals"),
        fetchUserScoped(context, "referralClicks")
      ]);

      const snapshot = getOrganismSnapshot(dualBand);

      return buildDeterministicEarnPacket(
        "user-referrals",
        Object.freeze({
          referrals,
          referralClicks,
          organismSnapshot: snapshot
        }),
        snapshot,
        dualBand
      );
    },

    async getUserOrders(context) {
      const orders = await fetchUserScoped(context, "orders");
      const snapshot = getOrganismSnapshot(dualBand);

      return buildDeterministicEarnPacket(
        "user-orders",
        Object.freeze({
          orders,
          organismSnapshot: snapshot
        }),
        snapshot,
        dualBand
      );
    },

    async getUserVaultHistory(context) {
      const vaultHistory = await fetchUserScoped(context, "vaultHistory");
      const snapshot = getOrganismSnapshot(dualBand);

      return buildDeterministicEarnPacket(
        "user-vault",
        Object.freeze({
          vaultHistory,
          organismSnapshot: snapshot
        }),
        snapshot,
        dualBand
      );
    },

    async getUserPulseHistory(context) {
      const pulseHistory = await fetchUserScoped(context, "pulseHistory");
      const snapshot = getOrganismSnapshot(dualBand);

      return buildDeterministicEarnPacket(
        "user-pulse",
        Object.freeze({
          pulseHistory,
          organismSnapshot: snapshot
        }),
        snapshot,
        dualBand
      );
    },

    // ⭐ OWNER — System‑Level Earn Insight
    async getSystemEarnOverview(context) {
      const [
        orders,
        referrals,
        referralClicks,
        pulseHistory
      ] = await Promise.all([
        fetchOwnerScoped(context, "orders"),
        fetchOwnerScoped(context, "referrals"),
        fetchOwnerScoped(context, "referralClicks"),
        fetchOwnerScoped(context, "pulseHistory")
      ]);

      const snapshot = getOrganismSnapshot(dualBand);

      return buildDeterministicEarnPacket(
        "system-overview",
        Object.freeze({
          orders,
          referrals,
          referralClicks,
          pulseHistory,
          organismSnapshot: snapshot
        }),
        snapshot,
        dualBand
      );
    },

    async getSystemEarnAnomalies(context) {
      const [
        orders,
        referrals,
        referralClicks,
        pulseHistory
      ] = await Promise.all([
        fetchOwnerScoped(context, "orders"),
        fetchOwnerScoped(context, "referrals"),
        fetchOwnerScoped(context, "referralClicks"),
        fetchOwnerScoped(context, "pulseHistory")
      ]);

      const snapshot = getOrganismSnapshot(dualBand);

      return buildDeterministicEarnPacket(
        "system-anomalies",
        Object.freeze({
          ordersSample: orders.slice(0, 100),
          referralsSample: referrals.slice(0, 100),
          referralClicksSample: referralClicks.slice(0, 100),
          pulseHistorySample: pulseHistory.slice(0, 100),
          organismSnapshot: snapshot
        }),
        snapshot,
        dualBand
      );
    },

    // OWNER — Evolutionary + Lineage + Schema Analysis
    async getEarnEvolutionOverview(context) {
      if (!context.userIsOwner || !evolutionAPI.getOrganismOverview) return null;
      return evolutionAPI.getOrganismOverview(context);
    },

    async analyzeEarnSchema(context) {
      if (!context.userIsOwner || !evolutionAPI.analyzeSchema) return null;
      return evolutionAPI.analyzeSchema(context, "pulseEarn");
    },

    async analyzeEarnFiles(context) {
      if (!context.userIsOwner || !evolutionAPI.analyzeFile) return null;
      return evolutionAPI.analyzeFile(context, "PulseEarn-v31.js");
    },

    async analyzeEarnRoutes(context) {
      if (!context.userIsOwner || !evolutionAPI.analyzeRoute) return null;
      return evolutionAPI.analyzeRoute(context, "earn");
    },

    // expose helpers for higher‑level AI / engine
    computeBinaryEconomicPressure,
    computeEconomicSummary,
    computeLiquidityProfile,
    computeLaneConcurrencyHint
  };

  return Object.freeze(api);
}

export default createEarnAPI;

PulseRealm.AIEarn = {
    EarnMeta,
    createEarnAPI,
    default: createEarnAPI
}

PulseRealm.PulseAIEarn = createEarnAPI;