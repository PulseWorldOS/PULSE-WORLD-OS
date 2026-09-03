// ============================================================================
//  PULSE OS — OUTER SENSE ORGAN (v32 IMMORTAL++)
//  FILE: _OUTERSENSES/PULSE-UNIVERSAL-TOUCH-DETECTOR-v32-IMMORTAL++.js
//  ORGAN: PulseTouchDetector
//  ROLE: Pure SKIN + Cookie Reader + IMMORTAL Router Hint Surface
//        v32+: One-band advantage, binary-aware, storage-aware, drift-proof,
//        world-aware (ProtocolPort v2 + Power v32 alignment)
//        Still NO module/import/export logic — only soft surfaces for others.

import { detectDeviceProfile } from "../PULSE-ENGINE/PulseEngineGPUProcessWorker-v31.js";
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
//  ROUTE HISTORY (IndexedDB) — unchanged semantics, v32 DB name
// ============================================================================
(function PulseTouchRouteHistoryV33() {
  const DB_NAME = "PulseTouchDetectorDB";
  const STORE   = "route_history";
  const MAX_ENTRIES = 100;

  // ------------------------------------------------------------
  // OPEN DB
  // ------------------------------------------------------------
  function openDB() {
    return new Promise((resolve) => {
      try {
        const req = indexedDB.open(DB_NAME, 1);

        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(STORE)) {
            db.createObjectStore(STORE, { keyPath: "id", autoIncrement: true });
          }
        };

        req.onsuccess = () => resolve(req.result);
        req.onerror   = () => resolve(null);
      } catch {
        resolve(null);
      }
    });
  }

  // ------------------------------------------------------------
  // GET LAST ROUTE
  // ------------------------------------------------------------
  async function getLastRoute(db) {
    return await new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE, "readonly");
        const store = tx.objectStore(STORE);
        const req = store.openCursor(null, "prev");

        req.onsuccess = (e) => {
          const cursor = e.target.result;
          resolve(cursor ? cursor.value.route : null);
        };
        req.onerror = () => resolve(null);
      } catch {
        resolve(null);
      }
    });
  }

  // ------------------------------------------------------------
  // ADD ROUTE
  // ------------------------------------------------------------
  async function addRoute(db, route) {
    return await new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE, "readwrite");
        const store = tx.objectStore(STORE);
        store.add({ route, ts: PulseRealm.PulseNOW });

        tx.oncomplete = () => resolve(true);
        tx.onerror    = () => resolve(false);
      } catch {
        resolve(false);
      }
    });
  }

  // ------------------------------------------------------------
  // TRIM HISTORY
  // ------------------------------------------------------------
  async function trimHistory(db) {
    return await new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE, "readwrite");
        const store = tx.objectStore(STORE);
        const req = store.getAllKeys();

        req.onsuccess = () => {
          const keys = req.result || [];
          const excess = keys.length - MAX_ENTRIES;

          if (excess > 0) {
            for (let i = 0; i < excess; i++) {
              store.delete(keys[i]);
            }
          }
          resolve(true);
        };

        req.onerror = () => resolve(false);
      } catch {
        resolve(false);
      }
    });
  }

  // ------------------------------------------------------------
  // MAIN EXECUTION
  // ------------------------------------------------------------
  (async () => {
    try {
      if (typeof indexedDB === "undefined" || typeof window === "undefined") return;

      const db = await  openDB();
      if (!db) return;

      const current = `/${PulseRealm.__PULSE_CURRENT_PAGE__}` || "/PulseWorldReality";

      const last = await getLastRoute(db);

      if (current !== last) {
        await addRoute(db, current);
        await trimHistory(db);
      }

      // Expose continuity (but now from IndexedDB)
      PulseRealm.__PULSE__ = PulseRealm.__PULSE__ || {};
      PulseRealm.__PULSE__.routeHistoryIndexedDB_v33 = true;

    } catch (err) {
      console.warn("[PulseTouchDetector v33] IndexedDB route history failed:", err);
    }
  })();
})();


// ============================================================================
//  IMMORTAL OVERLAYS — v32 (same semantics, world-aware tag added)
// ============================================================================

export const IMMORTAL_OVERLAYS_PulseTouchDetector = {
  drift: {
    allowed: false,
    notes: "Cookie parsing + schema semantics must remain stable."
  },
  pressure: {
    expectedLoad: "high",
    notes: "Runs on every edge request; must stay cheap."
  },
  stability: {
    uiLayout: "none",
    semantics: "stable",
    notes: "Only additive evolution allowed; existing fields must not change meaning."
  },
  load: {
    maxComponents: 1,
    notes: "Single skinState object per request."
  },
  chunking: {
    prewarm: [],
    cacheKey: "pulsetouch.detector.skinstate.v32"
  },
  worldLens: {
    awareOfWorlds: true,          // ⭐ v32: now world-aware
    worldBand: "oneband",
    worldRole: "touch_detector"
  },
  limbic: {
    band: "clinical_safety"
  },
  triHeart: {
    cognitive: "normalize_touch_state",
    emotional: "never_guess",
    behavioral: "feed_downstream_organs"
  },
  impulseSpeed: {
    primaryAction: "detect_pulse_touch",
    latencyTargetMs: 1
  },
  healingSurfaces: {
    enabled: false
  }
};

// ============================================================================
//  EXPERIENCE META — v32
// ============================================================================

export const AI_EXPERIENCE_META_PulseTouchDetector = {
  id: "pulsetouch.detector",
  kind: "edge_skin",
  version: "v32-IMMORTAL++",
  role: "Pulse‑Touch skin signal reader",
  surfaces: {
    band: [
      "touch",
      "edge",
      "skin",
      "fastlane",
      "advantage",
      "routing",
      "binary",
      "storage",
      "world_runtime",     // ⭐ v32
      "continuance",       // ⭐ v32
      "binary_field"       // ⭐ v32
    ],
    wave: ["clinical", "precise", "sensory"],
    binary: ["cookie_present", "cookie_missing"],
    presence: ["touch_state", "region_hint", "mode_hint"],
    advantage: [
      "safe_defaults",
      "schema_stable",
      "fastlane_hints",
      "continuous_pulse_hints",
      "hydration_tier_hints",
      "animation_tier_hints",
      "chunk_profile_hints",
      "presence_intensity_hints",
      "module_risk_hint",
      "binary_risk_hint",
      "storage_presence_hint"
    ],
    speed: "instant_compute"
  }
};

// ============================================================================
//  ORGAN META — v32
// ============================================================================

export const ORGAN_META_PulseTouchDetector = {
  id: "organ.pulsetouch.detector",
  organism: "PulseTouch",
  layer: "edge.skin",
  tier: "IMMORTAL",
  evoFlags: {
    deterministic: true,
    driftProof: true,
    safeDefaults: true,
    schemaStable: true,
    presenceAware: true,
    regionAware: true,
    trustAware: true,
    identityHintAware: true,
    dualBandAware: true,
    chunkProfileAware: true,
    pageHintAware: true,
    warmupAware: true,
    prePulseAware: true,
    preflightAware: true,
    hydrationTierAware: true,
    animationTierAware: true,
    advantageRouting: true,
    regionClusterAware: true,
    modeAware: true,
    presenceIntensityAware: true,
    cookieVersionAware: true,
    cookieIntegrityAware: true,
    cookieEvolutionAware: true,
    pulseStreamAware: true,
    fastLaneAware: true,
    temporalHintAware: true,

    moduleRiskAware: true,
    binaryAware: true,
    pulseBinaryAware: true,
    storageAware: true,
    indexedDBAware: true,

    // ⭐ v32
    worldRuntimeAware: true,
    continuanceAware: true,
    binaryFieldAware: true
  }
};

// ============================================================================
//  ORGAN CONTRACT — v32
// ============================================================================

export const ORGAN_CONTRACT_PulseTouchDetector = {
  inputs: { event: "edge request event with headers" },
  outputs: {
    skinState: "normalized pulse_touch state object (v32 schema, backward compatible)"
  },
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true,
    zeroPII: true,
    zeroTracking: true,
    zeroGuessing: true,
    zeroAssumptions: true
  }
};

// ============================================================================
//  HELPERS
// ============================================================================

function safeNumber(str, fallback = null) {
  const n = Number(str);
  return Number.isFinite(n) ? n : fallback;
}

function parseCookieHeader(cookieHeader) {
  if (!cookieHeader || typeof cookieHeader !== "string") return null;
  const raw = cookieHeader.split("; ").find((c) => c.startsWith("pulse_touch="));
  if (!raw) return null;

  const value = raw.replace("pulse_touch=", "");
  const parts = value.split("|");

  const parsed = {};
  for (const part of parts) {
    const [k, v] = part.split("=");
    if (k) parsed[k] = v;
  }
  return parsed;
}

function derivePresenceIntensity(presence) {
  switch (presence) {
    case "high":
    case "engaged":
      return "high";
    case "low":
    case "idle":
      return "low";
    default:
      return "medium";
  }
}

function deriveRegionCluster(region) {
  switch (region) {
    case "us":
    case "us-east":
    case "us-west":
      return "clusterA";
    case "eu":
    case "eu-west":
    case "eu-central":
      return "clusterB";
    case "apac":
    case "asia":
      return "clusterC";
    default:
      return "clusterUnknown";
  }
}

function deriveHydrationTier(h) {
  return h === "minimal" || h === "low"
    ? "minimal"
    : h === "full"
    ? "full"
    : "safe";
}

function deriveAnimationTier(a) {
  return a === "none" || a === "reduced" ? "reduced" : "smooth";
}

function deriveMode(m) {
  return m === "fast" || m === "turbo" ? "fast" : "safe";
}

function deriveTrustLevel(t) {
  return t === "2" ? "trusted" : t === "1" ? "suspicious" : "unknown";
}

function deriveCookieIntegrity(parsed) {
  const required = ["region", "mode", "presence", "page"];
  const missing = required.filter((k) => !parsed[k]);
  return missing.length === 0
    ? "intact"
    : missing.length <= 2
    ? "partial"
    : "unknown";
}

function deriveInitialModuleRiskFromCookie(parsed) {
  if (!parsed || typeof parsed !== "object") {
    return {
      hasMissingSubimports: false,
      hasWrongTierExports: false,
      hasGlobalExposureRisk: false,
      hasChunkProfileAnomaly: false,
      score: 0,
      source: "none"
    };
  }

  const hasMissingSubimports = parsed.moduleMissingSubimports === "1";
  const hasWrongTierExports = parsed.moduleWrongTierExports === "1";
  const hasGlobalExposureRisk =
    parsed.moduleGlobalExposureRisk === "1" || hasWrongTierExports;
  const hasChunkProfileAnomaly = parsed.moduleChunkProfileAnomaly === "1";

  let score = 0;
  if (hasMissingSubimports) score += 10;
  if (hasWrongTierExports) score += 10;
  if (hasGlobalExposureRisk) score += 5;
  if (hasChunkProfileAnomaly) score += 5;

  return {
    hasMissingSubimports,
    hasWrongTierExports,
    hasGlobalExposureRisk,
    hasChunkProfileAnomaly,
    score,
    source: score > 0 ? "cookie_hint" : "none"
  };
}

// ============================================================================
//  DETECTOR — v32
// ============================================================================

export function detectPulseTouch(event) {
  const headers = event.headers || {};
  const cookieHeader =
    headers.cookie || headers.Cookie || headers.COOKIE || "";

  const parsed = parseCookieHeader(cookieHeader);
  if (!parsed) return defaultPulseTouchState();

  const version = parsed.v || parsed.version || "0";
  const presence = parsed.presence || "unknown";
  const pulseStream = parsed.pulseStream || "continuous";
  const fastLane = parsed.fastLane || "enabled";
  const mode = deriveMode(parsed.mode || "fast");
  const region = parsed.region || "unknown";

  const hydration = parsed.hydration || "auto";
  const animation = parsed.animation || "auto";

  const presenceIntensity = derivePresenceIntensity(presence);
  const regionCluster = deriveRegionCluster(region);
  const hydrationTier = deriveHydrationTier(hydration);
  const animationTier = deriveAnimationTier(animation);
  const trustLevel = deriveTrustLevel(parsed.trusted || "0");
  const integrity = parsed.integrity || deriveCookieIntegrity(parsed);

  const originTs = safeNumber(parsed.originTs, null);
  const lastPulseTs = safeNumber(parsed.lastPulseTs, null);

  const pulseModuleRisk = deriveInitialModuleRiskFromCookie(parsed);

  return {
    region,
    trusted: parsed.trusted || "0",
    trustLevel,
    mode,
    presence,
    presenceIntensity,
    identity: parsed.identity || "anon",
    v: version,

    page: parsed.page || "index",
    chunkProfile: parsed.chunkProfile || "default",
    integrity,
    band: parsed.band || "dual",
    pulse: parsed.pulse || "early",
    evo: parsed.evo || "IMMORTAL",
    warmup: parsed.warmup || "auto",
    hydration,
    hydrationTier,
    animation,
    animationTier,

    pulseStream,
    fastLane,
    pulseOrigin: parsed.pulseOrigin || "edge",

    originTs,
    lastPulseTs,

    regionCluster,

    pulseModuleRisk,

    // ⭐ v32 world-aware soft surfaces
    worldBand: "oneband",
    worldRole: "touch_detector",
    worldVersion: "v32"
  };
}

// ============================================================================
//  DEFAULT STATE — v32
// ============================================================================

export function defaultPulseTouchState() {
  const region = "unknown";
  const presence = "unknown";
  const mode = "fast";

  const presenceIntensity = derivePresenceIntensity(presence);
  const regionCluster = deriveRegionCluster(region);
  const hydration = "auto";
  const animation = "auto";

  return {
    region,
    trusted: "0",
    trustLevel: "unknown",
    mode,
    presence,
    presenceIntensity,
    identity: "anon",
    v: "0",

    page: "index",
    chunkProfile: "default",
    integrity: "unknown",
    band: "dual",
    pulse: "early",
    evo: "IMMORTAL",
    warmup: "auto",
    hydration,
    hydrationTier: deriveHydrationTier(hydration),
    animation,
    animationTier: deriveAnimationTier(animation),

    pulseStream: "continuous",
    fastLane: "enabled",
    pulseOrigin: "edge",
    originTs: null,
    lastPulseTs: null,

    regionCluster,

    pulseModuleRisk: {
      hasMissingSubimports: false,
      hasWrongTierExports: false,
      hasGlobalExposureRisk: false,
      hasChunkProfileAnomaly: false,
      score: 0,
      source: "none"
    },

    // ⭐ v32 world-aware defaults
    worldBand: "oneband",
    worldRole: "touch_detector",
    worldVersion: "v32"
  };
}
// ============================================================
// PulseTouchDetector IndexedDB (v33 IMMORTAL)
// ============================================================
const TOUCH_DB_NAME = "PulseTouchDetectorDB";
const TOUCH_STORE   = "touch_state";

let touchDbPromise = null;

function openTouchDB() {
  if (touchDbPromise) return touchDbPromise;

  touchDbPromise = new Promise((resolve) => {
    try {
      const req = indexedDB.open(TOUCH_DB_NAME, 1);

      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(TOUCH_STORE)) {
          db.createObjectStore(TOUCH_STORE, { keyPath: "key" });
        }
      };

      req.onsuccess = () => resolve(req.result);
      req.onerror  = () => resolve(null);
    } catch {
      resolve(null);
    }
  });

  return touchDbPromise;
}

async function touchDbPut(key, value) {
  const db = await  openTouchDB();
  if (!db) return false;

  return await new Promise((resolve) => {
    const tx = db.transaction(TOUCH_STORE, "readwrite");
    tx.objectStore(TOUCH_STORE).put({ key, value });
    tx.oncomplete = () => resolve(true);
    tx.onerror    = () => resolve(false);
  });
}

async function touchDbGet(key) {
  const db = await  openTouchDB();
  if (!db) return null;

  return await new Promise((resolve) => {
    const tx = db.transaction(TOUCH_STORE, "readonly");
    const req = tx.objectStore(TOUCH_STORE).get(key);

    req.onsuccess = () => resolve(req.result.value || null);
    req.onerror   = () => resolve(null);
  });
}

// ============================================================================
//  ORGAN FACTORY — v32
// ============================================================================
export function PulseTouchDetector() {
  return {
    meta: ORGAN_META_PulseTouchDetector,
    contract: ORGAN_CONTRACT_PulseTouchDetector,
    overlays: IMMORTAL_OVERLAYS_PulseTouchDetector,
    detect: detectPulseTouch,
    defaultState: defaultPulseTouchState,

    // -------------------------------------------------------------
    // DEVICE PROFILE (NEW)
    // -------------------------------------------------------------
    getDeviceProfile() {
      try {
        return detectDeviceProfile();
      } catch {
        return { type: "unknown" };
      }
    },
        
    normalizeSkin(skin) {
      if (!skin) throw new Error("PulseTouchDetector.normalizeSkin: skin required");

      return {
        version: skin.version || "unknown",
        coord: skin.coord || null,
        mode: skin.mode || null,
        presence: skin.presence || null,
        band: skin.band || null,
        page: skin.page || null,
        isMobile: skin.isMobile || false,
        ts: typeof skin.ts === "number" ? skin.ts : null,
        intel: skin.intel || null,
        PulseGlobal: skin.PulseGlobal || {},
        booted: skin.booted || null,
        bootVideo: skin.bootVideo || null,
        bootWorld: skin.bootWorld || null
      };
    },

    // -------------------------------------------------------------
    // NORMALIZER (NEW)
    // Ensures every event has a stable, safe, predictable shape
    // -------------------------------------------------------------
   normalize(evt, type) {
      if (!evt) {
        throw new Error("PulseTouchDetector.normalize: evt is required");
      }

      return {
        type: type || evt.type || "unknown",
        map: evt.map || null,
        chunks: evt.chunks || null,
        normalizer: evt.normalizer || null,
        page: evt.page || null,
        prefix: evt.prefix || null,
        persistLocal: evt.persistLocal === true
      };
    },


    // -------------------------------------------------------------
    // MAP READY — IndexedDB only
    // -------------------------------------------------------------
    async onMapReady(evt) {
      const norm = this.normalize(evt, "map_ready");

      if (norm.persistLocal) {
        await touchDbPut("PulseOrganismMap_v33", norm.map);
      }

      PulseRealm.__PULSE_TOUCH__.onDetectorUpdate(norm);
    },

    // -------------------------------------------------------------
    // CHUNKS READY — IndexedDB only
    // -------------------------------------------------------------
    async onChunksReady(evt) {
      const norm = this.normalize(evt, "chunks_ready");

      if (norm.persistLocal) {
        await touchDbPut("PulseChunks_v33", norm.chunks);
      }

      PulseRealm.__PULSE_TOUCH__.onDetectorUpdate(norm);
    },

    // -------------------------------------------------------------
    // NORMALIZER READY — IndexedDB only
    // -------------------------------------------------------------
    async onNormalizerReady(evt) {
      const norm = this.normalize(evt, "normalizer_ready");

      if (norm.persistLocal) {
        await touchDbPut("PulseNormalizer_v33", norm.normalizer);
      }

      PulseRealm.__PULSE_TOUCH__.onDetectorUpdate(norm);
    },

    // -------------------------------------------------------------
    // LOADERS (NEW) — for Touch continuity
    // -------------------------------------------------------------
    async loadMap() {
      return await touchDbGet("PulseOrganismMap_v33");
    },

    async loadChunks() {
      return await touchDbGet("PulseChunks_v33");
    },

    async loadNormalizer() {
      return await touchDbGet("PulseNormalizer_v33");
    }
  };
}



PulseRealm.TouchDetector = {
  PulseTouchDetector,
  detectPulseTouch,
  defaultPulseTouchState,
  IMMORTAL_OVERLAYS_PulseTouchDetector,
  ORGAN_CONTRACT_PulseTouchDetector,
  ORGAN_META_PulseTouchDetector,
  detectDeviceProfile
}
PulseRealm.PulseTouchDetector = PulseTouchDetector;