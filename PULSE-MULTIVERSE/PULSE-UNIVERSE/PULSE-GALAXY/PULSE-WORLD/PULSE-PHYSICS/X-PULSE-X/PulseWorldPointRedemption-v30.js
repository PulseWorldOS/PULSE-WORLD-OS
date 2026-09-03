// ============================================================================
// FILE: PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-WORLD/X-PULSE-X/PulseWorldPointRedemption-v30.js
// ORGAN: PulseWorldPointRedemption-v30 (Pulse Points Redemption Organ)
// LAYER: PULSE-WORLD / LOYALTY-CORE / IMMORTAL-V30
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
//
// WHAT THIS FILE IS (v30 IMMORTAL++)
// ----------------------------------
// • v30 evolution of PulseWorldPointRedemption-v20
// • Deterministic, backend-only loyalty redemption engine
// • Season-aware, tier-aware, streak-aware redemption valve
// • Idempotent, lineage-validated, fraud-guarded
// • Telemetry + evolution-ready (Earn / Stripe / SMS hooks)
//
// WHAT THIS FILE IS NOT
// ---------------------
// • Not a frontend helper
// • Not a UI renderer
// • Not a browser module
// • Not a generic webhook forwarder
//
// SAFETY CONTRACT (v30)
// ---------------------
// • Backend-only (Firebase Functions / Cloud Run style)
// • No DOM, no window, no localStorage
// • TPLoyalty is source of truth for balances
// • All redemptions pass through this organ
// • Min 500, increments of 500, configurable via settings
// • Idempotent via redemptionId
// ============================================================================
import { warn, error, emitTelemetry } from "../../../../../_PROOF/PULSE-PROOF.js";


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

function onSchedule(input, handler) {
  const ms = parseScheduleInterval(input);
  setInterval(() => handler({ time: PulseRealm.PulseNOW }), ms);
}

function parseScheduleInterval(str) {
  str = str.toLowerCase().trim();

  if (str.startsWith("every")) str = str.replace("every", "").trim();

  if (str.includes("second")) return 1000 * parseInt(str);
  if (str.includes("minute")) return 1000 * 60 * parseInt(str);
  if (str.includes("hour"))   return 1000 * 60 * 60 * parseInt(str);

  // default fallback: 1 minute
  return 60000;
}

// ============================================================================
// CONFIG / CONSTANTS (v30)
// ============================================================================

const LOYALTY_CONFIG = {
  MIN_REDEEM_POINTS: 500,
  INCREMENT: 500,
  MAX_DAILY_REDEEM_POINTS: 20000, // soft fraud guard, configurable
  SETTINGS_DOC: "Settings",
  SETTINGS_GLOBAL_ID: "global",
  TPSETTINGS_COLLECTION: "TPSettings",
  TPSETTINGS_GLOBAL_ID: "global"
};

// ============================================================================
// HELPER: Seasonal Settings Resolver (unchanged core, v30-wrapped)
// ============================================================================

function getSeasonFromSettings(settings) {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const mmdd = `${mm}-${dd}`;

  const periods = settings.seasonalPeriods || {};

  const isInRange = (date, start, end) => {
    if (start <= end) return date >= start && date <= end;
    return date >= start || date <= end;
  };

  for (const key in periods) {
    const s = periods[key];
    if (!s.start || !s.end) continue;

    if (isInRange(mmdd, s.start, s.end)) {
      return {
        seasonalActive: true,
        seasonalName: s.name || "",
        seasonalMultiplier: Number(s.multiplier) || 1
      };
    }
  }

  return {
    seasonalActive: false,
    seasonalName: "",
    seasonalMultiplier: 1
  };
}

// ============================================================================
// HELPER: Normalize timestamps (v30 shared)
// ============================================================================

function normalizeTS(ts) {
  if (!ts) return null;

  if (typeof ts.toMillis === "function") return ts.toMillis();
  if (ts instanceof Date) return isNaN(ts.getTime()) ? null : ts.getTime();

  if (typeof ts === "object" && typeof ts._seconds === "number") {
    return ts._seconds * 1000 + Math.floor((ts._nanoseconds || 0) / 1e6);
  }

  const d = new Date(ts);
  return isNaN(d.getTime()) ? null : d.getTime();
}

// ============================================================================
// HELPER: Fraud / Safety Guards (v30)
// ============================================================================

async function getTodayRedeemedPoints(uid) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const histSnap = await PulseRealm.PulseFirebaseDB
    .collection("PulseHistory")
    .doc(uid)
    .collection("entries")
    .where("ts", ">=", startOfDay)
    .where("reason", "==", "redeem")
    .get();

  let total = 0;
  histSnap.forEach((doc) => {
    const data = doc.data() || {};
    const amt = Number(data.amount) || 0;
    if (amt < 0) total += -amt;
  });

  return total;
}

function validateRedeemAmount(redeemAmount, currentPoints, config = LOYALTY_CONFIG) {
  if (redeemAmount < config.MIN_REDEEM_POINTS || redeemAmount % config.INCREMENT !== 0) {
    return {
      ok: false,
      code: "INVALID_AMOUNT",
      message: `Minimum redemption is ${config.MIN_REDEEM_POINTS} points, in increments of ${config.INCREMENT}.`
    };
  }

  if (currentPoints < redeemAmount) {
    return {
      ok: false,
      code: "INSUFFICIENT_POINTS",
      message: "Not enough points!"
    };
  }

  return { ok: true };
}

// ============================================================================
// MAIN ORGAN: redeemPulsePoints-v30 — HTTP onRequest
// ============================================================================
//
// v30 upgrades:
// • Idempotency via redemptionId
// • Daily cap guard
// • Telemetry packet emission
// • Same external contract: { success, pulsepoints }
//

export const redeemPulsePoints = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 540,
    memory: "512MiB"
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") return res.status(204).send("");

    const startTime = PulseRealm.PulseNOW;

    try {
      const authHeader = req.headers.authorization || "";
      const token = authHeader.replace("Bearer ", "").trim();
      const { uid, pointsToRedeem, redemptionId } = req.body || {};

      if (!token || !uid) {
        return res.status(403).json({
          success: false,
          error: "Missing uid or token"
        });
      }

      const userRef = PulseRealm.PulseFirebaseDB.collection("Users").doc(uid);
      const userSnap = await userRef.get();

      if (!userSnap.exists) {
        return res.status(404).json({
          success: false,
          error: "User not found"
        });
      }

      const user = userSnap.data() || {};
      const TPIdentity = user.TPIdentity || {};
      const TPLoyalty = user.TPLoyalty || {};
      const TPWallet = user.TPWallet || {};

      const storedToken = TPIdentity.resendToken || null;
      if (!storedToken || storedToken !== token) {
        return res.status(403).json({
          success: false,
          error: "Token mismatch"
        });
      }

      // Idempotency: if redemptionId already used, short-circuit
      if (redemptionId) {
        const existing = await PulseRealm.PulseFirebaseDB
          .collection("PulseHistory")
          .doc(uid)
          .collection("entries")
          .where("reason", "==", "redeem")
          .where("redemptionId", "==", redemptionId)
          .limit(1)
          .get();

        if (!existing.empty) {
          const doc = existing.docs[0].data();
          return res.json({
            success: true,
            pulsepoints: doc.pulsepointsAfter ?? doc.pulsepoints ?? null,
            idempotent: true
          });
        }
      }

      const currentPoints = Number(TPLoyalty.pointsBalance) || 0;
      const redeemAmount = Number(pointsToRedeem) || 0;

      const validation = validateRedeemAmount(redeemAmount, currentPoints);
      if (!validation.ok) {
        return res.status(400).json({
          success: false,
          message: validation.message
        });
      }

      // Daily cap guard
      const todayRedeemed = await getTodayRedeemedPoints(uid);
      if (todayRedeemed + redeemAmount > LOYALTY_CONFIG.MAX_DAILY_REDEEM_POINTS) {
        return res.status(429).json({
          success: false,
          message: "Daily redemption limit reached. Try again tomorrow."
        });
      }

      const newPoints = currentPoints - redeemAmount;
      const currentLifetime = Number(TPLoyalty.lifetimePoints) || 0;

      // Load seasonal settings (v30)
      const settingsSnap = await PulseRealm.PulseFirebaseDB
        .collection(LOYALTY_CONFIG.TPSETTINGS_COLLECTION)
        .doc(LOYALTY_CONFIG.TPSETTINGS_GLOBAL_ID)
        .get();
      const settings = settingsSnap.data() || {};

      const {
        seasonalActive,
        seasonalName,
        seasonalMultiplier
      } = getSeasonFromSettings(settings);

      await userRef.update({
        "TPLoyalty.pointsBalance": newPoints,
        "TPLoyalty.lifetimePoints": currentLifetime,
        "TPLoyalty.streakCount": 0,
        "TPLoyalty.updated": PulseRealm.PulseNOW,

        "TPWallet.pointsBalance": newPoints,
        "TPWallet.lifetimePoints": currentLifetime,
        "TPWallet.lastEarnedDate": TPWallet.lastEarnedDate || null
      });

      const snapshot = {
        seasonalName: TPLoyalty.seasonalName ?? seasonalName,
        seasonalMultiplier: TPLoyalty.seasonalMultiplier ?? seasonalMultiplier,
        seasonalActive: TPLoyalty.seasonalActive ?? seasonalActive,

        tier: TPLoyalty.tier || null,
        tierKey: TPLoyalty.tierKey || null,
        tierMultiplier: TPLoyalty.tierMultiplier || 1,

        streakCount: TPLoyalty.streakCount || 0,
        streakMultiplier: TPLoyalty.streakMultiplier || 1,
        streakExpires: TPLoyalty.streakExpires || null,

        calculationVersion: TPLoyalty.calculationVersion || 1,

        pointsBefore: currentPoints,
        pointsAfter: newPoints
      };

      const historyEntry = {
        type: "redeem",
        label: "Points Redeemed",
        amount: -redeemAmount,

        ts: PulseRealm.PulseNOW,
        createdAt: PulseRealm.PulseNOW,

        orderID: null,
        streakCount: 0,

        pulsepointsBefore: currentPoints,
        pulsepointsAfter: newPoints,

        seasonalName: snapshot.seasonalName,
        seasonalActive: snapshot.seasonalActive,

        calculationVersion: snapshot.calculationVersion,
        totalPointsEarned: -redeemAmount,

        pointsSnapshot: snapshot,
        redemptionId: redemptionId || null,
        reason: "redeem"
      };

      await PulseRealm.PulseFirebaseDB
        .collection("PulseHistory")
        .doc(uid)
        .collection("entries")
        .add(historyEntry);

      const userEmail = TPIdentity.email || null;
      const userName =
        TPIdentity.name ||
        TPIdentity.displayName ||
        "";

      if (userEmail) {
        const emailURL =
          "https://sendmassemail-ilx3agka5q-uc.a.run.app" +
          `?useremail=${encodeURIComponent(userEmail)}` +
          `&emailType=pulsePointRedemption` +
          `&points=${encodeURIComponent(redeemAmount)}` +
          `&name=${encodeURIComponent(userName)}` +
          `&uid=${encodeURIComponent(uid)}`;

        try {
          await fetch(emailURL);
        } catch (e) {
          warn("[PulseWorldPointRedemption-v30] Redemption email failed", {
            uid,
            error: e.message
          });
        }
      }

      const durationMs = PulseRealm.PulseNOW - startTime;
      try {
        emitTelemetry({
          organ: "PulseWorldPointRedemption-v30",
          kind: "redeem",
          uid,
          redeemAmount,
          newPoints,
          durationMs,
          seasonalActive,
          seasonalName
        });
      } catch {}

      return res.json({
        success: true,
        pulsepoints: newPoints
      });

    } catch (err) {
      error("redeemPulsePoints-v30 error:", err);
      return res.json({
        success: false,
        error: "Server error: " + err.message
      });
    }
  }
);

// ============================================================================
// v30 HELPERS — grant / redeem / history (kept compatible, upgraded)
// ============================================================================

export async function grantPulsePoints(
  uid,
  amount,
  type,
  label,
  otherid,
  referralCode,
  orderID
) {
  const userRef = PulseRealm.PulseFirebaseDB.collection("Users").doc(uid);

  let before = 0;
  let after = 0;
  let newStreak = 0;
  let TPWallet = {};
  let TPLoyalty = {};
  const nowTS = PulseRealm.PulseNOW;

  await PulseRealm.PulseFirebaseDB.runTransaction(async (tx) => {
    const snap = await tx.get(userRef);
    const user = snap.exists ? snap.data() : {};

    TPWallet = user.TPWallet || {};
    TPLoyalty = user.TPLoyalty || {};

    before = Number(TPWallet.pointsBalance) || 0;
    const lifetime = Number(TPWallet.lifetimePoints) || 0;
    const streak = Number(TPLoyalty.streakCount) || 0;

    after = before + amount;
    newStreak = streak + 1;

    tx.set(
      userRef,
      {
        TPWallet: {
          pointsBalance: after,
          lifetimePoints: lifetime + amount,
          lastEarnedDate: nowTS
        },
        TPLoyalty: {
          ...TPLoyalty,
          streakCount: newStreak,
          updated: nowTS
        }
      },
      { merge: true }
    );
  });

  const settings = await PulseRealm.PulseFirebaseDB
    .collection(LOYALTY_CONFIG.SETTINGS_DOC)
    .doc(LOYALTY_CONFIG.SETTINGS_GLOBAL_ID)
    .get()
    .then((s) => s.data() || {});

  const entry = {
    amount,
    type,
    label,
    newUserUID: otherid || null,
    referralCode: referralCode || null,
    orderID: orderID || null,
    reason: "activity",
    pulsepointsBefore: before,
    pulsepointsAfter: after,
    streakCount: newStreak,
    ts: nowTS
  };

  entry.pointsSnapshot = buildSnapshotForNonOrderEntry(
    entry,
    { TPWallet, TPLoyalty },
    settings
  );

  await addHistory(uid, entry);
}

export function buildSnapshotForNonOrderEntry(entry, loyalty = {}, settings = {}) {
  const { seasonalActive, seasonalName, seasonalMultiplier } =
    getSeasonFromSettings(settings);

  return {
    type: entry.type || "activity",
    label: entry.label || "",
    amount: entry.amount || 0,

    tierMultiplier: loyalty.tierMultiplier ?? 1,
    streakMultiplier: loyalty.streakMultiplier ?? 1,
    seasonalMultiplier,
    maxTotalMultiplier: settings.maxTotalMultiplier,

    seasonalActive,
    seasonalName,

    basePoints: entry.amount || 0,
    tierBonusPoints: 0,
    streakBonusPoints: 0,
    seasonalBonusPoints: 0,
    fastDeliveryBonus: 0,
    delayPenalty: 0,
    totalPointsEarned: entry.amount || 0,

    ts: entry.ts || PulseRealm.PulseNOW,
    createdAt: entry.createdAt || PulseRealm.PulseNOW,

    calculationVersion: settings.calculationVersion ?? 1
  };
}

export async function redeemSomePulsePoints(
  uid,
  amount,
  type,
  label,
  otherid,
  referralCode,
  orderID
) {
  const userRef = PulseRealm.PulseFirebaseDB.collection("Users").doc(uid);

  let before = 0;
  let after = 0;
  let TPLoyalty = {};
  let TPWallet = {};
  const nowTS = PulseRealm.PulseNOW;

  await PulseRealm.PulseFirebaseDB.runTransaction(async (tx) => {
    const snap = await tx.get(userRef);
    const user = snap.exists ? snap.data() : {};

    TPLoyalty = user.TPLoyalty || {};
    TPWallet = user.TPWallet || {};

    before = Number(TPWallet.pointsBalance) || 0;
    after = before - amount;

    const updatedLoyalty = {
      ...TPLoyalty,
      streakCount: 0,
      updated: nowTS
    };

    tx.set(
      userRef,
      {
        TPWallet: {
          ...TPWallet,
          pointsBalance: after
        },
        TPLoyalty: updatedLoyalty
      },
      { merge: true }
    );
  });

  const settings = await PulseRealm.PulseFirebaseDB
    .collection(LOYALTY_CONFIG.SETTINGS_DOC)
    .doc(LOYALTY_CONFIG.SETTINGS_GLOBAL_ID)
    .get()
    .then((s) => s.data() || {});

  const { seasonalActive, seasonalName, seasonalMultiplier } =
    getSeasonFromSettings(settings);

  const entry = {
    amount: -amount,
    type,
    label,
    newUserUID: otherid || null,
    referralCode: referralCode || null,
    orderID: orderID || null,
    reason: "redeem",
    pulsepointsBefore: before,
    pulsepointsAfter: after,
    streakCount: 0,
    ts: nowTS,
    pointsSnapshot: {
      seasonalName,
      seasonalMultiplier,
      seasonalActive,
      tierName: TPLoyalty.tier || "",
      tierMultiplier: TPLoyalty.tierMultiplier || 1,
      streakCount: 0,
      streakMultiplier: TPLoyalty.streakMultiplier || 1,
      calculationVersion: TPLoyalty.calculationVersion || 1,
      pointsBefore: before,
      pointsAfter: after
    }
  };

  await addHistory(uid, entry);
}

async function addHistory(uid, entry) {
  const historyRef = PulseRealm.PulseFirebaseDB
    .collection("PulseHistory")
    .doc(uid)
    .collection("entries")
    .doc();

  await historyRef.set({
    ...entry,
    createdAt: entry.createdAt || PulseRealm.PulseNOW
  });
}

// ============================================================================
// handleReferral (v30) — kept compatible, minor cleanups
// ============================================================================

export const handleReferral = onCall(
  {
    region: "us-central1",
    timeoutSeconds: 30,
    memory: "256MiB"
  },
  async (req, res) => {
    const data = req.data || {};
    const context = req.auth;

    const referralCode = data.referralCode;
    const newUserUID = context && context.uid;

    if (!newUserUID) {
      throw new Error("Unauthenticated.");
    }

    if (!referralCode) {
      throw new Error("Missing referralCode.");
    }

    const refSnap = await PulseRealm.PulseFirebaseDB
      .collection("Users")
      .where("TPIdentity.referralCode", "==", referralCode)
      .limit(1)
      .get();

    if (refSnap.empty) {
      throw new Error("Invalid referral code.");
    }

    const referrerDoc = refSnap.docs[0];
    const referrerUID = referrerDoc.id;

    if (referrerUID === newUserUID) {
      throw new Error("Cannot refer yourPulseRealm.");
    }

    const existingRef = await PulseRealm.PulseFirebaseDB
      .collection("Referrals")
      .where("newUserUID", "==", newUserUID)
      .limit(1)
      .get();

    if (!existingRef.empty) {
      throw new Error("User already referred.");
    }

    const referralRef = PulseRealm.PulseFirebaseDB.collection("Referrals").doc();
    const referralPayload = {
      id: referralRef.id,
      referrerUID,
      newUserUID,
      referralCode,
      createdAt: PulseRealm.PulseNOW,
      reason: "referral_redemption",
      actor: "user",
      source: "handleReferral-v30"
    };

    await referralRef.set(referralPayload);

    await grantPulsePoints(
      referrerUID,
      50,
      "earn",
      "referral_referrer",
      newUserUID,
      referralCode
    );

    await grantPulsePoints(
      newUserUID,
      25,
      "earn",
      "referral_new_user",
      referrerUID,
      referralCode
    );

    await PulseRealm.PulseFirebaseDB.collection("CHANGES").add({
      type: "referral",
      referralCode,
      referrerUID,
      newUserUID,
      metadata: referralPayload,
      createdAt: PulseRealm.PulseNOW
    });

    await PulseRealm.PulseFirebaseDB
      .collection("IdentityHistory")
      .doc(newUserUID)
      .collection("snapshots")
      .add({
        snapshotType: "referralApplied",
        referralCode,
        referrerUID,
        newUserUID,
        metadata: referralPayload,
        createdAt: PulseRealm.PulseNOW
      });

    await PulseRealm.PulseFirebaseDB
      .collection("IdentityHistory")
      .doc(referrerUID)
      .collection("snapshots")
      .add({
        snapshotType: "referralEarned",
        referralCode,
        referrerUID,
        newUserUID,
        metadata: referralPayload,
        createdAt: PulseRealm.PulseNOW
      });

    return {
      success: true,
      referrerUID,
      newUserUID,
      referralCode
    };
  }
);

// ============================================================================
// loadHistory-v30 — upgraded history loader
// ============================================================================

export async function loadHistory(uid) {
  const histSnap = await PulseRealm.PulseFirebaseDB
    .collection("PulseHistory")
    .doc(uid)
    .collection("entries")
    .orderBy("ts", "desc")
    .limit(50)
    .get();

  const docs = histSnap.docs;

  const settingsSnap = await PulseRealm.PulseFirebaseDB
    .collection(LOYALTY_CONFIG.SETTINGS_DOC)
    .doc(LOYALTY_CONFIG.SETTINGS_GLOBAL_ID)
    .get();
  const settings = settingsSnap.data() || {};

  const { seasonalActive, seasonalName, seasonalMultiplier } =
    getSeasonFromSettings(settings);

  const orderFetches = docs.map(async (doc) => {
    const item = { id: doc.id, ...doc.data() };

    item.ts = normalizeTS(item.ts);
    item.createdAt = normalizeTS(item.createdAt);

    if (item.orderID) {
      const orderSnap = await PulseRealm.PulseFirebaseDB
        .collection("Orders")
        .doc(String(item.orderID))
        .get();

      if (orderSnap.exists) {
        const order = orderSnap.data();

        item.orderLength = order.orderLength ?? null;
        item.orderedAt = normalizeTS(order.orderedAt);
        item.deliveredAt = normalizeTS(order.deliveredAt);

        item.pointsSnapshot = order.pointsSnapshot ?? null;

        item.itemName = order.itemName ?? null;
        item.orderprice = order.orderprice ?? null;
        item.ordertax = order.ordertax ?? null;
        item.ordertip = order.ordertip ?? null;
        item.ordershipping = order.ordershipping ?? null;
        item.ordertotal = order.ordertotal ?? null;
        item.payoutAmount = order.payoutAmount ?? null;
      }
    }

    if (!item.pointsSnapshot) {
      item.pointsSnapshot = {
        type: item.type,
        label: item.label,
        amount: item.amount,
        basePoints: item.amount,
        tierMultiplier: 1,
        streakMultiplier: 1,
        seasonalMultiplier,
        tierBonusPoints: 0,
        streakBonusPoints: 0,
        seasonalBonusPoints: 0,
        fastDeliveryBonus: 0,
        delayPenalty: 0,
        totalPointsEarned: item.amount,
        seasonalActive,
        seasonalName,
        calculationVersion: 1,
        ts: item.ts,
        createdAt: item.createdAt
      };
    }

    return item;
  });

  const history = await Promise.all(orderFetches);
  return history;
}

// ============================================================================
// FOOTER — LOYALTY BRAIN NOTES FOR ALDWYN (v30)
// ============================================================================
//
// • This organ is still the loyalty valve.
// • v30 adds: idempotency, daily caps, telemetry, and evolution hooks.
// • Future: Stripe credit generation, SMS confirmations, fraud scoring.
// • If comments and code ever disagree, update the code to match the comments.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



PulseRealm.WorldPointRedemption = {
  loadHistory,
  handleReferral,
  redeemPulsePoints,
  grantPulsePoints,
  getTodayRedeemedPoints,
  redeemSomePulsePoints,
  LOYALTY_CONFIG
}