/*
===============================================================================
FILE: /PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSEWORLD-NETLIFY/PULSE-WORLD-HEARTBEAT.js
PULSE OS v30-IMMORTAL — WORLD HEARTBEAT PACEMAKER (NETLIFY • ONE-BAND • MESH-AWARE)
Pacemaker Timer • Logout • Security Sweep • Pulseband Cleanup • World Telemetry

ROLE:
  - Single immortal heartbeat spine for Netlify (handler + scheduled)
  - One-band binary/wave/advantage field for every cycle
  - World-aware: Users, PulseHistory, Pulseband, Identity, Security
  - Evidence-aware: logs to FUNCTION_ERRORS + TIMER_LOGS + Bridge logger
  - Mesh-aware: uses global ShadowDB / FirebaseAdmin / fetchFn / route
  - Netlify-ready: exports handler + named schedules

EVOLUTION v30:
  - Fixed runId scoping + fatal logging
  - Unified advantage field (cycleKind-aware)
  - One-band binary/wave field for all cycles
  - Safer DB access (null-guarded, no hard crash)
  - Cleaner seasonal + loyalty + security logic
  - Pulseband cleanup merged + optimized
  - Diagnostics snapshot (healing state) for Overmind / Admin
===============================================================================
*/
import { PulseVitalsLogger as logger, PulseVitalsMonitor, pulseLog, PulseUIFlow as initUIFlow, setdoc, getdoc, doc, PulseUIErrors, log, warn, error} from "../../PULSE-MULTIVERSE/_PROOF/PULSE-PROOF.js";

import { PulseCoreGMemory, createPulseCoreGovernor } from "../../PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";
import { db } from "../../PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/X-PULSE-X/3RDPARTY/PulseWorldFirebaseGenome-v30.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


function onSchedule(input, handler) {
  const ms = parseScheduleInterval(input);
  setInterval(() => handler({ time: PulseRealm.PulseNOW.toMillis() }), ms);
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

/* ============================================================================
   IMMORTAL META
=============================================================================== */

export const PulseProxyHeartbeatMeta = Object.freeze({
  layer: "PulseProxyHeartbeat",
  role: "WORLD_PACEMAKER",
  version: "30-Immortal-OneBand-Netlify",
  evo: {
    driftSafe: true,
    membraneSafe: true,
    organismWide: true,
    dualBandAware: true,
    binaryAware: true,
    waveAware: true,
    advantageAware: true,
    chunkPresenceAware: true,
    sessionAware: true,
    securityAware: true,
    loyaltyAware: true,
    pulsebandAware: true,
    evidenceAware: true,
    diagnosticsAware: true,
    netlifyReady: true
  }
});

/* ============================================================================
   SCHEDULER (Netlify-friendly)
=============================================================================== */

function parseInterval(str) {
  if (!str || typeof str !== "string") return 5 * 60 * 1000;

  const lower = str.toLowerCase().trim();

  if (lower.includes("second")) {
    const n = parseInt(lower);
    return isNaN(n) ? 1000 : n * 1000;
  }

  if (lower.includes("minute")) {
    const n = parseInt(lower);
    return isNaN(n) ? 5 * 60 * 1000 : n * 60 * 1000;
  }

  if (lower.includes("hour")) {
    const n = parseInt(lower);
    return isNaN(n) ? 60 * 60 * 1000 : n * 60 * 60 * 1000;
  }

  const fallback = parseInt(lower);
  return isNaN(fallback) ? 5 * 60 * 1000 : fallback * 60 * 1000;
}

/* ============================================================================
   ONE-BAND BINARY / WAVE / ADVANTAGE FIELDS
=============================================================================== */

function computeIntelHash(str) {
  const s = String(str || "");
  let h1 = 0x9e3779b1;
  let h2 = 0x85ebca77;

  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h1 = (h1 ^ (c * (i + 1))) >>> 0;
    h2 = (h2 + (c << (i % 5))) >>> 0;

    h1 = Math.imul(h1 ^ (h1 >>> 16), 0x85ebca6b);
    h2 = Math.imul(h2 ^ (h2 >>> 13), 0xc2b2ae35);
  }

  const final = ((h1 ^ h2) >>> 0).toString(16);
  return `intel-${final}`;
}

function buildBinaryField() {
  const patternLen = 14 + (PulseRealm.PulseNOW % 7);
  const density = 42 + (patternLen % 13);
  const surface = density + patternLen;

  const parity = surface & 1;
  const shiftDepth = Math.max(1, Math.floor(Math.log2(surface)));

  const binarySurface = { patternLen, density, surface };

  return {
    binaryPhenotypeSignature: computeIntelHash(
      `BINARY_PHENO::${patternLen}::${density}::${surface}`
    ),
    binarySurfaceSignature: computeIntelHash(
      `BINARY_SURFACE::${surface}::${shiftDepth}`
    ),
    binarySurface,
    parity,
    shiftDepth
  };
}

function buildWaveField() {
  const amplitude = 8 + (PulseRealm.PulseNOW % 5);
  const wavelength = amplitude * 2 + 3;
  const phase = (amplitude * wavelength) % 32;

  return {
    amplitude,
    wavelength,
    phase,
    band: "immortal-root",
    mode: "immortal-wave",
    waveSignature: computeIntelHash(
      `WAVE_SURFACE::${amplitude}::${wavelength}::${phase}`
    )
  };
}

function buildAdvantageField(binaryField, waveField, cycleKind = "generic") {
  const density = binaryField.binarySurface.density;
  const amplitude = waveField.amplitude;
  const wavelength = waveField.wavelength;

  const efficiency = (amplitude + 1) / (wavelength + 2);
  const stress = Math.min(1, density / 64);

  let kindBoost = 1.0;
  if (cycleKind === "logout") kindBoost = 1.0;
  else if (cycleKind === "security") kindBoost = 1.12;
  else if (cycleKind === "nudge") kindBoost = 1.08;

  const advantageScore = Math.min(1, efficiency * (1 + stress) * kindBoost);

  return {
    density,
    amplitude,
    wavelength,
    efficiency,
    stress,
    cycleKind,
    advantageScore,
    advantageSignature: computeIntelHash(
      `IMMORTAL_ADVANTAGE::${density}::${amplitude}::${wavelength}::${cycleKind}::${advantageScore}`
    )
  };
}

function buildHeartbeatCycleSignature(cycle, kind) {
  return computeIntelHash(
    `HEARTBEAT_CYCLE::${kind || "generic"}::${cycle}::${PulseRealm.PulseNOW % 9999}`
  );
}

function buildChunkingHints(cycleKind = "generic") {
  let baseSize = 64;
  let prewarm = true;

  const entropy = Math.floor(Math.random() * 16);

  switch (cycleKind) {
    case "logout":
      baseSize = 96;
      break;
    case "nudge":
    case "security":
      baseSize = 128;
      break;
    default:
      baseSize = 64;
  }

  const suggestedChunkSizeKB = baseSize + entropy;

  return {
    suggestedChunkSizeKB,
    suggestedPrewarm: prewarm,
    entropy,
    timerKind: cycleKind,
    prewarmWindowMs: 1500,
    confidence: 0.92
  };
}

function buildPresenceHints(cycleKind = "generic") {
  let windowMs = 5 * 60 * 1000;
  let pollMs = 60 * 1000;

  const entropy = (PulseRealm.PulseNOW % 777);

  switch (cycleKind) {
    case "logout":
      windowMs = 5 * 60 * 1000;
      pollMs = 60 * 1000;
      break;
    case "security":
      windowMs = 24 * 60 * 60 * 1000;
      pollMs = 60 * 60 * 1000;
      break;
    case "nudge":
      windowMs = 10 * 60 * 1000;
      pollMs = 2 * 60 * 1000;
      break;
    default:
      windowMs = 5 * 60 * 1000;
      pollMs = 60 * 1000;
  }

  const recommendedPresenceWindowMs = windowMs + entropy;
  const suggestedPollIntervalMs = pollMs;

  return {
    recommendedPresenceWindowMs,
    suggestedPollIntervalMs,
    entropy,
    timerKind: cycleKind,
    confidence: 0.94,
    presenceSignature: computeIntelHash(
      `PRESENCE_HINTS::${cycleKind}::${recommendedPresenceWindowMs}::${suggestedPollIntervalMs}`
    )
  };
}

/* ============================================================================
   HEALING STATE (WORLD DIAGNOSTICS)
=============================================================================== */

const heartbeatHealing = {
  cycles: 0,
  lastTimerLogoutRunId: null,
  lastSecuritySweepRunId: null,
  lastError: null,
  lastExitReason: null,
  lastCycleIndex: null,

  lastHeartbeatCycleSignature: null,
  lastBinaryField: null,
  lastWaveField: null,
  lastAdvantageField: null,
  lastChunkingHints: null,
  lastPresenceHints: null,
  lastTimerKind: null,

  meta: PulseProxyHeartbeatMeta
};

let HEARTBEAT_CYCLE = 0;
let SECURITY_SWEEP_CYCLE = 0;

/* ============================================================================
   SEASONAL SETTINGS
=============================================================================== */

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

function buildPulseSignature(cycle) {
  return `PULSE_NUDGE::${cycle}::${PulseRealm.PulseNOW}`;
}

/* ============================================================================
   NETLIFY HANDLER — BASIC HEARTBEAT PULSE (WORLD PING)
=============================================================================== */
export const handler = async (_event, _context) => {
  try {
    HEARTBEAT_CYCLE++;

    const signature = buildPulseSignature(HEARTBEAT_CYCLE);
    const binaryField = buildBinaryField();
    const waveField = buildWaveField();
    const advantageField = buildAdvantageField(binaryField, waveField, "generic");
    const chunkingHints = buildChunkingHints("generic");
    const presenceHints = buildPresenceHints("generic");

    // -------------------------------------------------------
    // HEALING SNAPSHOT
    // -------------------------------------------------------
    heartbeatHealing.cycles = HEARTBEAT_CYCLE;
    heartbeatHealing.lastCycleIndex = HEARTBEAT_CYCLE;
    heartbeatHealing.lastTimerKind = "generic";
    heartbeatHealing.lastHeartbeatCycleSignature = buildHeartbeatCycleSignature(
      HEARTBEAT_CYCLE,
      "generic"
    );
    heartbeatHealing.lastBinaryField = binaryField;
    heartbeatHealing.lastWaveField = waveField;
    heartbeatHealing.lastAdvantageField = advantageField;
    heartbeatHealing.lastChunkingHints = chunkingHints;
    heartbeatHealing.lastPresenceHints = presenceHints;
    heartbeatHealing.lastExitReason = "ok";

    // -------------------------------------------------------
    // LOGGING (IMMORTAL SAFE LOGGER)
    // -------------------------------------------------------
    PulseRealm.PulseLogger.log("heartbeat", "PING", {
      cycle: HEARTBEAT_CYCLE,
      signature,
      binaryField,
      waveField,
      advantageField,
      chunkingHints,
      presenceHints,
      meta: PulseProxyHeartbeatMeta
    });

    // -------------------------------------------------------
    // ROUTE SNAPSHOT (IMMORTAL SAFE)
    // -------------------------------------------------------
    createPulseCoreGovernor().setRouteSnapshot("world_heartbeat_last", {
      cycle: HEARTBEAT_CYCLE,
      signature,
      binaryField,
      waveField,
      advantageField,
      chunkingHints,
      presenceHints,
      ts: PulseRealm.PulseNOW
    });

   

    // -------------------------------------------------------
    // RESPONSE PACKET
    // -------------------------------------------------------
    const pulsePacket = {
      ok: true,
      pulse: true,
      cycle: HEARTBEAT_CYCLE,
      signature,
      binaryField,
      waveField,
      advantageField,
      chunkingHints,
      presenceHints,
      ts: PulseRealm.PulseNOW
    };

    return {
      statusCode: 200,
      body: JSON.stringify(pulsePacket)
    };

  } catch (err) {
    PulseRealm.PulseLogger.error("heartbeat-failed", err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        error: "heartbeat-failed",
        message: err.message || "unknown"
      })
    };
  }
};

/* ============================================================================
   TIMER: LOGOUT + PULSE HISTORY REPAIR (EVERY 5 MINUTES)
=============================================================================== */

export const timerLogout = onSchedule("every 5 minutes", async () => {
  if (!db) {
    console.error("[PulseProxyHeartbeat v30] timerLogout: DB or admin not available");
    return;
  }

  HEARTBEAT_CYCLE++;
  heartbeatHealing.cycles = HEARTBEAT_CYCLE;
  heartbeatHealing.lastCycleIndex = HEARTBEAT_CYCLE;
  heartbeatHealing.lastTimerKind = "logout";

  const heartbeatCycleSignature = buildHeartbeatCycleSignature(
    HEARTBEAT_CYCLE,
    "logout"
  );
  const binaryField = buildBinaryField();
  const waveField = buildWaveField();
  const advantageField = buildAdvantageField(
    binaryField,
    waveField,
    "logout"
  );
  const chunkingHints = buildChunkingHints("logout");
  const presenceHints = buildPresenceHints("logout");

  heartbeatHealing.lastHeartbeatCycleSignature = heartbeatCycleSignature;
  heartbeatHealing.lastBinaryField = binaryField;
  heartbeatHealing.lastWaveField = waveField;
  heartbeatHealing.lastAdvantageField = advantageField;
  heartbeatHealing.lastChunkingHints = chunkingHints;
  heartbeatHealing.lastPresenceHints = presenceHints;
  heartbeatHealing.lastExitReason = "ok";

  const runId = crypto.randomUUID();
  const logId = `LOGOUT_${runId}`;
  const errorPrefix = `ERR_${runId}_`;

  heartbeatHealing.lastTimerLogoutRunId = runId;

  const userChanges = {};
  const pulseChanges = {};

  try {
    PulseRealm.PulseLogger.log("heartbeat", "TIMER_LOGOUT_START", {
      heartbeatCycle: HEARTBEAT_CYCLE,
      heartbeatCycleSignature,
      binaryField,
      waveField,
      advantageField,
      chunkingHints,
      presenceHints,
      timerKind: "logout",
      meta: PulseProxyHeartbeatMeta
    });
  } catch (_) {}

  try {
    const now = PulseRealm.PulseNOW;
    const cutoff = new Date(now - 15 * 60 * 1000);

    // 1. SETTINGS
    let settings = {};
    let seasonalActive = false;
    let seasonalName = null;
    let seasonalMultiplier = 1;
    let calculationVersion = 1;

    try {
      const settingsSnap = await db.collection("Settings").doc("global").get();
      settings = settingsSnap.exists ? settingsSnap.data() : {};

      const season = getSeasonFromSettings(settings);
      seasonalActive = season.seasonalActive;
      seasonalName = season.seasonalName;
      seasonalMultiplier = season.seasonalMultiplier;

      calculationVersion = settings.calculationVersion ?? 1;
    } catch (err) {
      await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}SETTINGS`).set({
        fn: "timerLogout",
        stage: "settings_load",
        error: String(err),
        runId,
        createdAt: PulseRealm.PulseNOW
      });
    }

    // 2. LOGOUT USERS
    try {
      const snap = await db
        .collection("Users")
        .where("TPSecurity.lastAppActive", "<", cutoff)
        .where("TPSecurity.isLoggedIn", "==", true)
        .get();

      for (const docSnap of snap.docs) {
        const uid = docSnap.id;

        try {
          const u = docSnap.data() || {};
          const TPLoyalty = u.TPLoyalty || {};

          const correctedLoyalty = {
            ...TPLoyalty,
            seasonalActive,
            seasonalName,
            seasonalMultiplier,
            streakMultiplier: TPLoyalty.streakMultiplier ?? 1,
            streakCount: TPLoyalty.streakCount ?? 0,
            streakExpires: TPLoyalty.streakExpires ?? null,
            calculationVersion,
            updated: PulseRealm.PulseNOW
          };

          await docSnap.ref.update({
            "TPSecurity.isLoggedIn": false,
            TPLoyalty: correctedLoyalty
          });

          userChanges[uid] = "LogoutCHANGE";
        } catch (err) {
          userChanges[uid] = "LogoutNOCHANGE";

          await db
            .collection("FUNCTION_ERRORS")
            .doc(`${errorPrefix}${uid}`)
            .set({
              fn: "timerLogout",
              stage: "logout_update",
              uid,
              error: String(err),
              runId,
              createdAt: PulseRealm.PulseNOW
            });
        }
      }
    } catch (err) {
      await db
        .collection("FUNCTION_ERRORS")
        .doc(`${errorPrefix}LOGOUT_BLOCK`)
        .set({
          fn: "timerLogout",
          stage: "logout_block",
          error: String(err),
          runId,
          createdAt: PulseRealm.PulseNOW
        });
    }

    // 3. FIX PULSE HISTORY
    try {
      const usersSnap = await db.collection("Users").get();

      for (const userDoc of usersSnap.docs) {
        const uid = userDoc.id;

        try {
          const histRef = db
            .collection("PulseHistory")
            .doc(uid)
            .collection("entries");
          const histSnap = await histRef
            .where("pointsSnapshot", "==", null)
            .limit(50)
            .get();

          if (histSnap.empty) continue;

          for (const entry of histSnap.docs) {
            const entryKey = `${uid}/${entry.id}`;

            try {
              const h = entry.data();

              const snapshot = {
                type: h.type,
                label: h.label,
                amount: h.amount,
                basePoints: h.amount,
                tierMultiplier: h.tierMultiplier ?? 1,
                streakMultiplier: h.streakMultiplier ?? 1,
                seasonalMultiplier,
                tierBonusPoints: 0,
                streakBonusPoints: 0,
                seasonalBonusPoints: 0,
                fastDeliveryBonus: 0,
                delayPenalty: 0,
                totalPointsEarned: h.amount,
                seasonalActive,
                seasonalName,
                calculationVersion,
                ts: h.ts ?? now,
                createdAt: h.createdAt ?? now
              };

              await entry.ref.update({ pointsSnapshot: snapshot });

              pulseChanges[entryKey] = "LogoutCHANGE";
            } catch (err) {
              pulseChanges[entryKey] = "LogoutNOCHANGE";

              await db
                .collection("FUNCTION_ERRORS")
                .doc(
                  `${errorPrefix}${entryKey.replace("/", "_")}`
                )
                .set({
                  fn: "timerLogout",
                  stage: "pulsehistory_fix",
                  uid,
                  entryId: entry.id,
                  error: String(err),
                  runId,
                  createdAt: PulseRealm.PulseNOW
                });
            }
          }
        } catch (err) {
          await db
            .collection("FUNCTION_ERRORS")
            .doc(`${errorPrefix}${uid}`)
            .set({
              fn: "timerLogout",
              stage: "pulsehistory_query",
              uid,
              error: String(err),
              runId,
              createdAt: PulseRealm.PulseNOW
            });
        }
      }
    } catch (err) {
      await db
        .collection("FUNCTION_ERRORS")
        .doc(`${errorPrefix}PULSE_BLOCK`)
        .set({
          fn: "timerLogout",
          stage: "pulse_block",
          error: String(err),
          runId,
          createdAt: PulseRealm.PulseNOW
        });
    }

    // 4. TIMER LOG
    await db.collection("TIMER_LOGS").doc(logId).set({
      fn: "timerLogout",
      runId,
      users: userChanges,
      pulseHistory: pulseChanges,
      heartbeatCycle: HEARTBEAT_CYCLE,
      heartbeatCycleSignature,
      advantageField,
      chunkingHints,
      presenceHints,
      timerKind: "logout",
      createdAt: PulseRealm.PulseNOW
    });
  } catch (err) {
    heartbeatHealing.lastError = {
      message: String(err),
      stage: "timerLogout_fatal"
    };
    heartbeatHealing.lastExitReason = "fatal_error";

    try {
      await db
        .collection("FUNCTION_ERRORS")
        .doc(`ERR_FATAL_${runId}`)
        .set({
          fn: "timerLogout",
          stage: "fatal",
          error: String(err),
          runId,
          createdAt: PulseRealm.PulseNOW
        });
    } catch (_) {}
  }
});

/* ============================================================================
   TIMER: SECURITY SWEEP + PULSEBAND CLEANUP (EVERY 24 HOURS)
=============================================================================== */

export const securitySweep = onSchedule("every 24 hours", async () => {
  if (!db) {
    console.error("[PulseProxyHeartbeat v30] securitySweep: DB or admin not available");
    return;
  }

  SECURITY_SWEEP_CYCLE++;
  heartbeatHealing.lastTimerKind = "security";

  const securitySweepSignature = computeIntelHash(
    `SECURITY_SWEEP_CYCLE::${SECURITY_SWEEP_CYCLE}`
  );
  const binaryField = buildBinaryField();
  const waveField = buildWaveField();
  const advantageField = buildAdvantageField(
    binaryField,
    waveField,
    "security"
  );
  const chunkingHints = buildChunkingHints("security");
  const presenceHints = buildPresenceHints("security");

  heartbeatHealing.lastSecuritySweepRunId = `SECURE_${SECURITY_SWEEP_CYCLE}`;
  heartbeatHealing.lastBinaryField = binaryField;
  heartbeatHealing.lastWaveField = waveField;
  heartbeatHealing.lastAdvantageField = advantageField;
  heartbeatHealing.lastChunkingHints = chunkingHints;
  heartbeatHealing.lastPresenceHints = presenceHints;
  heartbeatHealing.lastExitReason = "ok";

  const runId = crypto.randomUUID();
  const logId = `SECURE_${runId}`;
  const errorPrefix = `ERR_${runId}_`;

  const rotatedUsers = [];
  const flaggedUsers = [];

  try {
    PulseRealm.PulseLogger.log("heartbeat", "SECURITY_SWEEP_START", {
      securitySweepCycle: SECURITY_SWEEP_CYCLE,
      securitySweepSignature,
      binaryField,
      waveField,
      advantageField,
      chunkingHints,
      presenceHints,
      timerKind: "security",
      meta: PulseProxyHeartbeatMeta
    });
  } catch (_) {}

  try {
    const nowMs = PulseRealm.PulseNOW.toMillis();
    const now = new Date(nowMs);

    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

    const dayOfWeek = now.getUTCDay();
    const weekNumber = Math.floor(nowMs / (7 * 24 * 60 * 60 * 1000));

    const isWeeklyCheckDay = dayOfWeek === 1;
    const isBiWeeklyIntegrityCheck =
      isWeeklyCheckDay && weekNumber % 2 === 0;

    const usersSnap = await db.collection("Users").get();

    for (const doc of usersSnap.docs) {
      const uid = doc.id;

      try {
        const u = doc.data() || {};
        const TPIdentity = u.TPIdentity || {};
        const TPSecurity = u.TPSecurity || {};

        let lastIssued = null;

        if (TPIdentity.lastJWTIssuedAt) {
          if (typeof TPIdentity.lastJWTIssuedAt.toMillis === "function") {
            lastIssued = TPIdentity.lastJWTIssuedAt.toMillis();
          } else if (TPIdentity.lastJWTIssuedAt._seconds) {
            lastIssued = TPIdentity.lastJWTIssuedAt._seconds * 1000;
          } else if (typeof TPIdentity.lastJWTIssuedAt === "number") {
            lastIssued = TPIdentity.lastJWTIssuedAt;
          }
        }

        const age = lastIssued ? nowMs - lastIssued : Infinity;
        const needs30DayRefresh = age > THIRTY_DAYS;

        const danger =
          TPSecurity.vaultLockdown ||
          TPSecurity.appLocked ||
          TPSecurity.hackerFlag ||
          TPSecurity.forceIdentityRefresh ||
          (TPSecurity.failedLoginAttempts > 5);

        const ipJump =
          TPSecurity.lastKnownIP &&
          TPSecurity.previousIP &&
          TPSecurity.lastKnownIP !== TPSecurity.previousIP;

        const deviceJump =
          TPSecurity.lastKnownDevice &&
          TPSecurity.previousDevice &&
          TPSecurity.lastKnownDevice !== TPSecurity.previousDevice;

        const needsEarlyRefresh = danger || ipJump || deviceJump;

        const totalFlags =
          (TPSecurity.failedLoginAttempts || 0) +
          (TPSecurity.hackerFlag ? 3 : 0) +
          (TPSecurity.vaultLockdown ? 5 : 0) +
          (TPSecurity.appLocked ? 5 : 0);

        if (totalFlags >= 10) {
          flaggedUsers.push({
            uid,
            email: TPIdentity.email || null,
            failedLoginAttempts: TPSecurity.failedLoginAttempts || 0,
            vaultLockdown: !!TPSecurity.vaultLockdown,
            appLocked: !!TPSecurity.appLocked,
            hackerFlag: !!TPSecurity.hackerFlag
          });
        }

        if (!needs30DayRefresh && !needsEarlyRefresh) continue;

        const rootResendToken = u.UserToken || null;
        const oldSessionToken = TPIdentity.resendToken || null;

        const newSessionToken = crypto.randomUUID();

        const reason = needsEarlyRefresh
          ? "early_security_refresh"
          : "30_day_rotation";

        try {
          await db.collection("IdentityHistory").add({
            uid,
            rootResendToken,
            oldSessionToken,
            newSessionToken,
            reason,
            dangerFlags: {
              vaultLockdown: TPSecurity.vaultLockdown || false,
              appLocked: TPSecurity.appLocked || false,
              hackerFlag: TPSecurity.hackerFlag || false,
              failedLoginAttempts: TPSecurity.failedLoginAttempts || 0,
              ipJump,
              deviceJump
            },
            runId,
            createdAt: PulseRealm.PulseNOW
          });
        } catch (err) {
          await db
            .collection("FUNCTION_ERRORS")
            .doc(`${errorPrefix}${uid}`)
            .set({
              fn: "securitySweep",
              stage: "identity_log",
              uid,
              error: String(err),
              runId,
              createdAt: PulseRealm.PulseNOW
            });
          continue;
        }

        try {
          await doc.ref.update({
            "TPIdentity.resendToken": newSessionToken,
            "TPIdentity.lastJWTIssuedAt":
              PulseRealm.PulseNOW,

            "TPSecurity.previousIP": TPSecurity.lastKnownIP || null,
            "TPSecurity.previousDevice": TPSecurity.lastKnownDevice || null,

            "TPSecurity.lastKnownIP": TPSecurity.lastKnownIP || null,
            "TPSecurity.lastKnownDevice": TPSecurity.lastKnownDevice || null,

            "TPSecurity.forceIdentityRefresh": false
          });
        } catch (err) {
          await db
            .collection("FUNCTION_ERRORS")
            .doc(`${errorPrefix}${uid}`)
            .set({
              fn: "securitySweep",
              stage: "user_update",
              uid,
              error: String(err),
              runId,
              createdAt: PulseRealm.PulseNOW
            });
          continue;
        }

        rotatedUsers.push(uid);
      } catch (err) {
        await db
          .collection("FUNCTION_ERRORS")
          .doc(`${errorPrefix}${uid}`)
          .set({
            fn: "securitySweep",
            stage: "user_loop",
            uid,
            error: String(err),
            runId,
            createdAt: PulseRealm.PulseNOW
          });
      }
    }

    // MERGED CLEANUP BLOCK (pulseband_sessions / errors / redownloads)
    try {
      const now = PulseRealm.PulseNOW;
      const cutoff24h = now - 24 * 60 * 60 * 1000;
      const cutoff7d = now - 7 * 24 * 60 * 60 * 1000;

      const deletedSessions = [];
      const deletedChunks = [];
      const deletedErrors = [];
      const deletedRedownloads = [];

      const sessionsSnap = await db.collection("pulseband_sessions").get();
      const batchSessions = db.batch();

      for (const s of sessionsSnap.docs) {
        const data = s.data() || {};
        const createdAt = data.createdAt.toMillis() || 0;

        if (createdAt < cutoff24h) {
          const chunksSnap = await s.ref.collection("chunks").get();

          for (const c of chunksSnap.docs) {
            batchSessions.delete(c.ref);
            deletedChunks.push(c.id);
          }

          batchSessions.delete(s.ref);
          deletedSessions.push(s.id);
        }
      }

      if (deletedSessions.length || deletedChunks.length) {
        await batchSessions.commit();
      }

      const errorsSnap = await db.collection("pulseband_errors").get();
      const batchErrors = db.batch();

      for (const e of errorsSnap.docs) {
        const createdAt = e.data().createdAt.toMillis() || 0;
        if (createdAt < cutoff7d) {
          batchErrors.delete(e.ref);
          deletedErrors.push(e.id);
        }
      }

      if (deletedErrors.length) {
        await batchErrors.commit();
      }

      const redlSnap = await db.collection("pulseband_redownloads").get();
      const batchRedl = db.batch();

      for (const r of redlSnap.docs) {
        const createdAt = r.data().createdAt.toMillis() || 0;
        if (createdAt < cutoff7d) {
          batchRedl.delete(r.ref);
          deletedRedownloads.push(r.id);
        }
      }

      if (deletedRedownloads.length) {
        await batchRedl.commit();
      }

      await db.collection("TIMER_LOGS").doc(`PB_CLEANUP_${runId}`).set({
        fn: "pulsebandCleanup",
        runId,
        deletedSessions,
        deletedChunks,
        deletedErrors,
        deletedRedownloads,
        createdAt: PulseRealm.PulseNOW
      });
    } catch (err) {
      await db
        .collection("FUNCTION_ERRORS")
        .doc(`ERR_PB_CLEANUP_${runId}`)
        .set({
          fn: "pulsebandCleanup",
          stage: "cleanup",
          error: String(err),
          runId,
          createdAt: PulseRealm.PulseNOW
        });
    }

    // TIMER LOG
    await db.collection("TIMER_LOGS").doc(logId).set({
      fn: "securitySweep",
      runId,
      rotatedUsers,
      flaggedUsers,
      sweepType: isWeeklyCheckDay ? "weekly" : "daily",
      integrityCheck: isBiWeeklyIntegrityCheck,
      rotationCount: rotatedUsers.length,
      flaggedCount: flaggedUsers.length,
      securitySweepCycle: SECURITY_SWEEP_CYCLE,
      securitySweepSignature,
      advantageField,
      chunkingHints,
      presenceHints,
      timerKind: "security",
      createdAt: PulseRealm.PulseNOW
    });
  } catch (err) {
    heartbeatHealing.lastError = {
      message: String(err),
      stage: "securitySweep_fatal"
    };
    heartbeatHealing.lastExitReason = "fatal_error";

    try {
      await db
        .collection("FUNCTION_ERRORS")
        .doc(`ERR_FATAL_${runId}`)
        .set({
          fn: "securitySweep",
          stage: "fatal",
          error: String(err),
          runId,
          createdAt: PulseRealm.PulseNOW
        });
    } catch (_) {}
  }
});

/* ============================================================================
   DIAGNOSTICS EXPORTS
=============================================================================== */

export function getPulseProxyHeartbeatHealingState() {
  return { ...heartbeatHealing };
}

export function getPulseProxyHeartbeatDiagnostics() {
  return {
    cycles: heartbeatHealing.cycles,
    lastTimerLogoutRunId: heartbeatHealing.lastTimerLogoutRunId,
    lastSecuritySweepRunId: heartbeatHealing.lastSecuritySweepRunId,
    lastError: heartbeatHealing.lastError,
    lastExitReason: heartbeatHealing.lastExitReason,
    lastCycleIndex: heartbeatHealing.lastCycleIndex,
    lastHeartbeatCycleSignature: heartbeatHealing.lastHeartbeatCycleSignature,
    lastTimerKind: heartbeatHealing.lastTimerKind,
    meta: PulseProxyHeartbeatMeta
  };
}

PulseRealm.WorldHeartbeat = {
  getPulseProxyHeartbeatDiagnostics,
  getPulseProxyHeartbeatHealingState,
  securitySweep,
  timerLogout,
  handler,
  heartbeatHealing,
  PulseProxyHeartbeatMeta,

}