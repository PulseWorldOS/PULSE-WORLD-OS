// ============================================================================
//  PULSE OS v30‑IMMORTAL++ — ENVIRONMENT ORGAN
//  Event‑Based Environment Surface • ShortBand / LongBand • DualBand‑Aware
//  PURE ENVIRONMENT. ZERO TIME. ZERO IDENTITY. ZERO META.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import { getOrganismSnapshot } from "./PulseAIDeps-v30.js";

// ============================================================================
//  HELPERS — PRESSURE + HASH + IDENTITY STRIP
// ============================================================================
function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals.layered.organism.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals.binary.pressure != null)
    return binaryVitals.binary.pressure;
  if (typeof binaryVitals.pressure === "number")
    return binaryVitals.pressure;
  return 0;
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function computeHash(str) {
  const s = String(str || "");
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 1000003;
  }
  return `h${h}`;
}

function stripIdentity(record) {
  if (!record || typeof record !== "object") return record;

  const clone = { ...record };

  delete clone.uid;
  delete clone.userId;
  delete clone.resendToken;
  delete clone.identityRoot;
  delete clone.sessionRoot;
  delete clone.deviceFingerprint;

  delete clone.email;
  delete clone.phone;
  delete clone.ip;
  delete clone.session;
  delete clone.token;
  delete clone.auth;
  delete clone.browserFingerprint;

  return clone;
}

// ============================================================================
//  PACKET EMITTER — v30 IMMORTAL++ (no meta, no time)
// ============================================================================
function emitEnvironmentPacket(type, payload = {}) {
  return Object.freeze({
    packetType: `environment-${type}`,
    timestamp: 0,
    layer: "environment-organ",
    role: "environment",
    band: "symbolic",
    ...payload
  });
}

// ============================================================================
//  EVENT‑BASED CACHE — shortBand / longBand (no time, hash‑driven)
// ============================================================================
const environmentCache = {
  shortBand: { data: null, signature: null },
  longBand: { data: null, signature: null }
};

async function fetchCollection(db, collection, options = {}) {
  const rows = await db.getCollection(collection, options);
  return rows.map(stripIdentity);
}

// shortBand = short‑horizon environment (ex‑hourly)
async function rebuildShortBandIfNeeded(db, context) {
  const [weather, heatIndex, waves, storms] = await Promise.all([
    fetchCollection(db, "weather", { limit: 1 }),
    fetchCollection(db, "heatIndex", { limit: 1 }),
    fetchCollection(db, "waves", { limit: 1 }),
    fetchCollection(db, "storms", { limit: 1 })
  ]);

  const data = Object.freeze({
    weather: weather[0] || null,
    heatIndex: heatIndex[0] || null,
    waves: waves[0] || null,
    storms: storms[0] || null
  });

  const signature = computeHash(JSON.stringify(data));

  if (environmentCache.shortBand.signature !== signature) {
    console.log("env:shortBand-rebuild");
    environmentCache.shortBand = { data, signature };
  } else {
    console.log("env:shortBand-stable");
  }

  return environmentCache.shortBand.data;
}

// longBand = long‑horizon environment (ex‑daily)
async function rebuildLongBandIfNeeded(db, context) {
  const [sargassum, moon, wildlife, seasons, holidays] = await Promise.all([
    fetchCollection(db, "sargassum", { limit: 1 }),
    fetchCollection(db, "moon", { limit: 1 }),
    fetchCollection(db, "wildlife", { limit: 1 }),
    fetchCollection(db, "seasons", { limit: 1 }),
    fetchCollection(db, "holidays", { limit: 1 })
  ]);

  const data = Object.freeze({
    sargassum: sargassum[0] || null,
    moon: moon[0] || null,
    wildlife: wildlife[0] || null,
    seasons: seasons[0] || null,
    holidays: holidays[0] || null
  });

  const signature = computeHash(JSON.stringify(data));

  if (environmentCache.longBand.signature !== signature) {
    console.log("env:longBand-rebuild");
    environmentCache.longBand = { data, signature };
  } else {
    console.log("env:longBand-stable");
  }

  return environmentCache.longBand.data;
}

// ============================================================================
//  ANOMALY DETECTION — deterministic, drift‑proof
// ============================================================================
function detectJumps(arr, label, context) {
  const anomalies = [];
  if (!Array.isArray(arr)) return anomalies;

  for (let i = 1; i < arr.length; i++) {
    const prev = arr[i - 1];
    const curr = arr[i];
    if (!prev || !curr) continue;
    if (typeof prev.value !== "number" || typeof curr.value !== "number") continue;

    const base = prev.value === 0 ? 1 : prev.value;
    const diff = Math.abs(curr.value - prev.value);
    const pct = (diff / base) * 100;

    if (pct >= 25) {
      anomalies.push({
        type: `${label}_jump`,
        deviation: pct,
        from: prev.value,
        to: curr.value
      });

      console.log(`env:anomaly ${label} ${pct.toFixed(1)}%`);
    }
  }

  return anomalies;
}

// ============================================================================
//  ENVIRONMENT ARTERY — symbolic‑only, dualband‑aware
// ============================================================================
function environmentArtery({ binaryVitals = {} } = {}) {
  const pressure = extractBinaryPressure(binaryVitals);
  const localPressure = 0.2;

  const combined = Math.max(
    0,
    Math.min(1, 0.6 * localPressure + 0.4 * pressure)
  );

  return emitEnvironmentPacket("artery", {
    organism: {
      pressure: combined,
      pressureBucket: bucketPressure(combined)
    }
  });
}

// ============================================================================
//  PUBLIC API — v30 IMMORTAL++ Environment Organ
// ============================================================================
export function createEnvironmentAPI(db, evolutionAPI, dualBand = null) {
  // ------------------------------------------------------------------------
  // PUBLIC ENVIRONMENT — tourist‑safe, event‑based cache
  // ------------------------------------------------------------------------
  async function getPublicEnvironment(context = {}) {
    console.log("env:public");

    const organismSnapshot = getOrganismSnapshot(dualBand);
    const shortBand = await rebuildShortBandIfNeeded(db, context);
    const longBand = await rebuildLongBandIfNeeded(db, context);

    return emitEnvironmentPacket("public", {
      shortBand,
      longBand,
      organismSnapshot
    });
  }

  // ------------------------------------------------------------------------
  // INTERNAL ENVIRONMENT — owner‑only, richer fields
  // ------------------------------------------------------------------------
  async function getInternalEnvironment(context = {}) {
    if (!context.userIsOwner) return null;

    console.log("env:internal");

    const [internal, settings, history] = await Promise.all([
      fetchCollection(db, "environment", { where: { scope: "internal" } }),
      fetchCollection(db, "environmentSettings"),
      fetchCollection(db, "environmentHistory")
    ]);

    const organismSnapshot = getOrganismSnapshot(dualBand);

    return emitEnvironmentPacket("internal", {
      internal: internal[0] || null,
      settings,
      history,
      organismSnapshot
    });
  }

  // ------------------------------------------------------------------------
  // ENVIRONMENT ANOMALIES — owner‑only, deterministic
  // ------------------------------------------------------------------------
  async function getEnvironmentAnomalies(context = {}) {
    if (!context.userIsOwner) return null;

    console.log("env:anomalies");

    const [weatherHistory, heatHistory, waveHistory] = await Promise.all([
      fetchCollection(db, "weatherHistory"),
      fetchCollection(db, "heatIndexHistory"),
      fetchCollection(db, "waveHistory")
    ]);

    return emitEnvironmentPacket("anomalies", {
      anomalies: [
        ...detectJumps(weatherHistory, "weather", context),
        ...detectJumps(heatHistory, "heatIndex", context),
        ...detectJumps(waveHistory, "waves", context)
      ]
    });
  }

  // ------------------------------------------------------------------------
  // EVOLUTION OVERVIEW — owner‑only, evolution‑aware
  // ------------------------------------------------------------------------
  async function getEnvironmentEvolutionOverview(context = {}) {
    if (!context.userIsOwner || !evolutionAPI.analyzeSchema) return null;

    console.log("env:evolution");

    const result = await evolutionAPI.analyzeSchema(context, "environment");

    return emitEnvironmentPacket("evolution", { result });
  }

  // ------------------------------------------------------------------------
  // FILE + ROUTE ANALYSIS — owner‑only, evolution‑aware
  // ------------------------------------------------------------------------
  async function analyzeEnvironmentFiles(context = {}) {
    if (!context.userIsOwner || !evolutionAPI.analyzeFile) return null;

    console.log("env:files");

    const result = await evolutionAPI.analyzeFile(context, "environment.js");

    return emitEnvironmentPacket("files", { result });
  }

  async function analyzeEnvironmentRoutes(context = {}) {
    if (!context.userIsOwner || !evolutionAPI.analyzeRoute) return null;

    console.log("env:routes");

    const result = await evolutionAPI.analyzeRoute(context, "environment");

    return emitEnvironmentPacket("routes", { result });
  }

  // ------------------------------------------------------------------------
  // PUBLIC SURFACE
  // ------------------------------------------------------------------------
  return Object.freeze({
    getPublicEnvironment,
    getInternalEnvironment,
    getEnvironmentAnomalies,
    getEnvironmentEvolutionOverview,
    analyzeEnvironmentFiles,
    analyzeEnvironmentRoutes,
    environmentArtery
  });
}

export default createEnvironmentAPI;
