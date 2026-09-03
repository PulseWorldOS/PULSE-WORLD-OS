import {
  PulseVitalsLogger,
  PulseVitalsMonitor,
  PulseUIFlow,
  PulseUIErrors,
  log,
  warn,
  error,
  PulseProofReflex,
  PulseUIRouteMemory,
  PulsePageScanner
} from "../../../../../_PROOF/PULSE-PROOF.js";
import { PulseBinaryWave } from "../PULSE-BAND/PULSE-BAND-BINARY-WAVE.js";
import { PulseSchedulerV33 as PulseWorldScheduler } from "./PULSE-WORLD-SCHEDULER.js";
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// NEW: WiFi worker / profile import (adjust path as needed)
import {
  PulseWifiProcessWorker,
  detectWifiProfile
} from "../../../../../PULSE-ENGINE/PulseEngineWIFIProcessWorker-v31.js";


// ============================================================
//  IMMORTAL AUTORUN
// ============================================================

(async function IMMORTAL_AUTORUN_V40() {
  console.log(
    "🧬 PULSE STRANDED DNA v34.0 — %c[PulseWorld::StrandedDNA] New Hydra Mesh Packet Streaming Process Initiated!",
    "color:#00FFCC; font-weight:bold; font-family:monospace;"
  );

  const targets = resolvePulseWorldTargets_v40();

  for (const world of targets) {
    try {
      // let WiFi worker feed a hint into this world’s DNA before scheduling
      strandedDNAWifiJob_v40(world, { type: "WIFI_STREAM" });
      await autoAttachWorldBinaryThroughput_v40(world);
    } catch (err) {
      console.warn("[PulseWorld::StrandedDNA] AutoAttach Failed:", err);
    }
  }
})();


// ============================================================
//  AUTO‑ATTACH BINARY THROUGHPUT
// ============================================================

export async function autoAttachWorldBinaryThroughput_v40(worldLike) {
  if (!worldLike || typeof worldLike !== "object") return;
  if (!Object.isExtensible(worldLike)) return;
  if (isStorageLike(worldLike)) return;

  worldLike.flags = worldLike.flags || {};

  // 1) Load persisted flags
  try {
    const persisted = await loadWorldFlags(worldLike);
    if (persisted && typeof persisted === "object") {
      worldLike.flags = persisted;
    }
  } catch {}

  // 2) Attach Binary Wave Pulse Engine
  try {
    worldLike.binaryWavePulse = PulseBinaryWave({
      worldContext: worldLike,
      waveContext: worldLike.waveContext || {},
      routeContext: worldLike.routeContext || {},
      pulseSignalKey: worldLike.flags.pulseSignalKey || null,
      spins: 10,
      trace: false
    });

    worldLike.flags.binaryWavePulseAttached = true;
  } catch (err) {
    worldLike.flags.binaryWavePulseAttachError = String(err);
  }

  // 3) Apply Stranded DNA + Scheduler (now WiFi-aware)
  try {
    await applyWorldBinaryThroughputScheduler_v40(worldLike);
    worldLike.flags.worldBinaryThroughputAutoAttached = true;
  } catch (err) {
    worldLike.flags.worldBinaryThroughputAutoAttachError = String(err);
  }

  // 4) Persist flags
  try {
    await saveWorldFlags(worldLike, worldLike.flags);
  } catch {}
}

// ============================================================
//  WORLD ROOT SCAN (GLOBAL RUNTIME)
// ============================================================

function resolvePulseWorldTargets_v40() {
  console.log(
    "🧬 PULSE STRANDED DNA v34.0 — %c[PulseWorld::StrandedDNA] Scanning Global Runtime for Internet World Roots...",
    "color:#00FFCC; font-weight:bold; font-family:monospace;"
  );

  const targets = new Set();

  function looksLikeWorld(obj) {
    if (!obj || typeof obj !== "object") return false;

    if (isWorldCandidate_v40(obj)) return true;

    if (obj.__pulseWorld === true) return true;
    if (obj.__pulseMultiverse === true) return true;
    if (obj.__pulseRealm === true) return true;

    if ("worldId" in obj) return true;
    if ("worldContext" in obj) return true;
    if ("routeContext" in obj) return true;
    if ("waveContext" in obj) return true;

    if (obj.meta && typeof obj.meta === "object") {
      const m = obj.meta;
      if (m.type === "pulse-world") return true;
      if (m.type === "pulse-multiverse") return true;
      if (m.type === "pulse-realm") return true;
    }

    const name = obj.constructor?.name?.toLowerCase() || "";
    if (name.includes("world")) return true;
    if (name.includes("multiverse")) return true;
    if (name.includes("realm")) return true;

    const keys = Object.keys(obj);
    if (keys.some(k => k.toLowerCase().includes("world"))) return true;
    if (keys.some(k => k.toLowerCase().includes("multiverse"))) return true;
    if (keys.some(k => k.toLowerCase().includes("realm"))) return true;

    return false;
  }

  function scanObject(obj) {
    if (!obj || typeof obj !== "object") return;

    let keys;
    try {
      keys = Object.keys(obj);
    } catch {
      return;
    }

    for (const key of keys) {
      let value;
      try {
        value = obj[key];
      } catch {
        continue;
      }
      if (!value) continue;

      if (Array.isArray(value)) {
        for (const item of value) {
          if (looksLikeWorld(item)) targets.add(item);
        }
        continue;
      }

      if (typeof value === "object") {
        if (looksLikeWorld(value)) targets.add(value);
        continue;
      }

      if (typeof value === "function") {
        try {
          if (looksLikeWorld(value.prototype)) {
            targets.add(value.prototype);
          }
        } catch {}
      }
    }
  }

  const surfaces = [
    PulseRealm,
    typeof window !== "undefined" ? window : null,
    typeof globalThis !== "undefined" ? globalThis : null,
    typeof self !== "undefined" ? self : null,
    typeof frames !== "undefined" ? frames : null,
    typeof window !== "undefined" ? PulseRealm.PulseGlobalNow : null,
    typeof window !== "undefined" ? PulseRealm.PulseGlobalPast : null,
    typeof window !== "undefined" ? PulseRealm.PulseGlobalFuture : null
  ];

  for (const surface of surfaces) {
    if (!surface) continue;
    scanObject(surface);
  }

  console.log(
    "🧬 PULSE STRANDED DNA v34.0 — %c[PulseWorld::StrandedDNA:~Drift~] Pulse World Multiversal Spatial Drifts Detected:",
    "color:#00FFCC; font-weight:bold; font-family:monospace;",
    `${targets.size}`
  );

  return targets;
}


function clamp01(v) {
  const n = Number(v);
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
}
function safeNumber(v, fallback = 0, min = -Infinity, max = Infinity) {
  if (v == null) return fallback;
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}
function safeObj(v) {
  if (!v || typeof v !== "object") return {};
  if (Array.isArray(v)) return {};        // avoid array traps
  return v;                               // leave object intact
}

function safeInt(v, fallback = 0, min = 0, max = Number.MAX_SAFE_INTEGER) {
  if (v == null) return fallback;
  const n = parseInt(v, 10);
  if (!Number.isFinite(n)) return fallback;
  if (!Number.isInteger(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}


const PULSE_DB_NAME = "PulseStrandedDNADB";
const PULSE_DB_STORE_FLAGS = "worldFlags";

function openPulseDB() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      resolve(null);
      return;
    }
    const req = indexedDB.open(PULSE_DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(PULSE_DB_STORE_FLAGS)) {
        db.createObjectStore(PULSE_DB_STORE_FLAGS);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function getWorldId(worldLike) {
  return (
    worldLike.id ||
    worldLike.key ||
    worldLike.worldId ||
    worldLike.name ||
    null
  );
}

async function loadWorldFlags(worldLike) {
  const worldId = getWorldId(worldLike);
  if (!worldId) return null;
  const db = await openPulseDB();
  if (!db) return null;
  return await new Promise((resolve, reject) => {
    const tx = db.transaction(PULSE_DB_STORE_FLAGS, "readonly");
    const store = tx.objectStore(PULSE_DB_STORE_FLAGS);
    const req = store.get(worldId);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

async function saveWorldFlags(worldLike, flags) {
  const worldId = getWorldId(worldLike);
  if (!worldId) return;
  const db = await openPulseDB();
  if (!db) return;
  return await new Promise((resolve, reject) => {
    const tx = db.transaction(PULSE_DB_STORE_FLAGS, "readwrite");
    const store = tx.objectStore(PULSE_DB_STORE_FLAGS);
    const req = store.put(flags, worldId);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// ============================================================
//  RUNTIME FRAME RESOLUTION
// ============================================================

function resolveRuntimeFrame_v40(world) {
  if (!world || typeof world !== "object") return {};
  const hf  = safeObj(world.hyperFrame);
  const rf  = safeObj(world.runtimeFrame);
  const r   = safeObj(world.runtime);
  const df  = safeObj(world.deltaFrame);
  const obf = safeObj(world.oneBandFrame);
  const cf  = safeObj(world.continuanceFrame);
  const bf  = safeObj(world.binaryFieldFrame);

  if (Object.keys(hf).length)  return hf;
  if (Object.keys(rf).length)  return rf;
  if (Object.keys(r).length)   return r;
  if (Object.keys(obf).length) return obf;
  if (Object.keys(cf).length)  return cf;
  if (Object.keys(bf).length)  return bf;
  return df;
}

// ============================================================
//  BINARY PLAN ATTACHMENT
// ============================================================

function attachBinaryPlan_v40(world, plan) {
  if (!world || typeof world !== "object") return;

  world.runtime          = safeObj(world.runtime);
  world.runtimeFrame     = safeObj(world.runtimeFrame);
  world.hyperFrame       = safeObj(world.hyperFrame);
  world.deltaFrame       = safeObj(world.deltaFrame);
  world.oneBandFrame     = safeObj(world.oneBandFrame);
  world.continuanceFrame = safeObj(world.continuanceFrame);
  world.binaryFieldFrame = safeObj(world.binaryFieldFrame);

  const frames = [
    world.runtime,
    world.runtimeFrame,
    world.hyperFrame,
    world.deltaFrame,
    world.oneBandFrame,
    world.continuanceFrame,
    world.binaryFieldFrame
  ];

  // ------------------------------------------------------------
  // 1) SAFE NON‑CIRCULAR PLAN REF FOR FRAMES
  // ------------------------------------------------------------
  // Frames must NOT contain the full plan (it contains hyperFrame → circular)
  // So we attach a lightweight, serialization‑safe reference.
  const planRef = {
    version: plan.version,
    laneCount: plan.strandedDNA?.laneCount ?? 0,
    totalStrands: plan.strandedDNA?.totalStrands ?? 0,
    totalLanes: plan.strandedDNA?.totalLanes ?? 0,
    totalEntities: plan.strandedDNA?.totalEntities ?? 0,
    waves: plan.waves?.map(w => ({
      index: w.index,
      entities: w.entities.slice()
    })) || []
  };

  for (const f of frames) {
    try {
      Object.defineProperty(f, "binaryThroughputPlan", {
        value: planRef,
        enumerable: false,     // JSON.stringify will skip it
        writable: true,
        configurable: true
      });
    } catch {}
  }

  // ------------------------------------------------------------
  // 2) FULL PLAN ATTACHED AT WORLD ROOT (NON‑CIRCULAR)
  // ------------------------------------------------------------
  // World-level plan is safe because ProtocolSignal never JSON.stringifies world directly.
  try {
    Object.defineProperty(world, "binaryThroughputPlan", {
      value: plan,
      enumerable: false,       // avoid accidental serialization
      writable: true,
      configurable: true
    });
  } catch {}
}


// ============================================================
//  WIFI PROFILE + HINT ATTACHMENT
// ============================================================

function attachWifiProfile_v40(world) {
  if (!world || typeof world !== "object") return;

  const wifiProfile = detectWifiProfile();

  world.runtime          = safeObj(world.runtime);
  world.runtimeFrame     = safeObj(world.runtimeFrame);
  world.hyperFrame       = safeObj(world.hyperFrame);
  world.deltaFrame       = safeObj(world.deltaFrame);
  world.oneBandFrame     = safeObj(world.oneBandFrame);
  world.continuanceFrame = safeObj(world.continuanceFrame);
  world.binaryFieldFrame = safeObj(world.binaryFieldFrame);

  const frames = [
    world.runtime,
    world.runtimeFrame,
    world.hyperFrame,
    world.deltaFrame,
    world.oneBandFrame,
    world.continuanceFrame,
    world.binaryFieldFrame
  ];

  for (const f of frames) {
    try {
      f.wifiProfile = wifiProfile;
    } catch {}
  }

  try {
    world.wifiProfile = wifiProfile;
  } catch {}

  return wifiProfile;
}

// WiFi worker → stranded DNA integration
export function applyWifiHintToStrandedDNA_v40(world, wifiHint) {
  if (!world || typeof world !== "object") return;
  const hint = safeObj(wifiHint);

  world.runtime          = safeObj(world.runtime);
  world.runtimeFrame     = safeObj(world.runtimeFrame);
  world.hyperFrame       = safeObj(world.hyperFrame);
  world.deltaFrame       = safeObj(world.deltaFrame);
  world.oneBandFrame     = safeObj(world.oneBandFrame);
  world.continuanceFrame = safeObj(world.continuanceFrame);
  world.binaryFieldFrame = safeObj(world.binaryFieldFrame);

  const frames = [
    world.runtime,
    world.runtimeFrame,
    world.hyperFrame,
    world.deltaFrame,
    world.oneBandFrame,
    world.continuanceFrame,
    world.binaryFieldFrame
  ];

  const pacingMs = safeNumber(hint.wifi?.pacingWindowMs, 25);
  const advScore = clamp01(hint.advantageScore || 0.5);
  const channelId = hint.wifi?.channelId || "wifi-0";

  for (const f of frames) {
    try {
      f.wifiHint        = hint;
      f.wifiPacingMs    = pacingMs;
      f.wifiAdvantage   = advScore;
      f.wifiChannelId   = channelId;
      f.wifiMode        = hint.wifi?.wifiMode || "dual";
      f.wifiSuggestions = hint.suggestions || [];
    } catch {}
  }

  try {
    world.wifiHint      = hint;
    world.wifiPacingMs  = pacingMs;
    world.wifiChannelId = channelId;
  } catch {}
}

// Convenience: let WiFi worker drive stranded DNA for a world
export function strandedDNAWifiJob_v40(world, job) {
  // ---------------------------------------------------------
  // FIX: Skip worlds that cannot be mutated (email page issue)
  // ---------------------------------------------------------
  if (!world || !Object.isExtensible(world)) {
    console.warn("⚠️ [StrandedDNA] Skipping non‑extensible world:", world);
    return null;
  }

  const wifiWorker = PulseWifiProcessWorker;
  if (!wifiWorker || typeof wifiWorker.submit !== "function") return null;

  const hint = wifiWorker.submit(job || { type: "WIFI_PACKET" });

  applyWifiHintToStrandedDNA_v40(world, hint);
  return hint;
}


// ============================================================
//  ENTITY NORMALIZATION
// ============================================================

function normalizeWorldEntities_v40(world) {
  const entities = Array.isArray(world.entities) ? world.entities : [];
  const normalized = [];

  const navState       = world.navState || null;
  const runtimeFrame   = resolveRuntimeFrame_v40(world);
  const trustPulse     = safeObj(world.trustPulse);
  const cacheIntegrity = safeObj(world.cacheIntegrity);

  for (const ent of entities) {
    if (!ent || typeof ent !== "object") continue;

    const id =
      ent.id ||
      ent.key ||
      ent.pageId ||
      `entity_${normalized.length}`;

    const meta          = safeObj(ent.meta);
    const earnChunker   = safeObj(meta.earnChunker);
    const meshChunker   = safeObj(meta.meshChunker);
    const gpuProfile    = safeObj(meta.gpuProfile);
    const proxyProfile  = safeObj(meta.proxyProfile);

    const hasAnyProfile =
      Object.keys(earnChunker).length ||
      Object.keys(meshChunker).length ||
      Object.keys(gpuProfile).length ||
      Object.keys(proxyProfile).length;

    if (!hasAnyProfile) continue;

    const throughputClass =
      earnChunker.throughputClass ||
      meshChunker.throughputClass ||
      gpuProfile.throughputClass ||
      proxyProfile.throughputClass ||
      "throughput_low";

    const throughputScore =
      safeNumber(earnChunker.throughputScore) ||
      safeNumber(meshChunker.throughputScore) ||
      safeNumber(gpuProfile.throughputScore) ||
      safeNumber(proxyProfile.throughputScore);

    const advantageTier =
      safeNumber(earnChunker.advantageTier) ||
      safeNumber(meshChunker.advantageTier) ||
      safeNumber(gpuProfile.advantageTier) ||
      safeNumber(proxyProfile.advantageTier);

    const advantageScore =
      safeNumber(earnChunker.advantageScore) ||
      safeNumber(meshChunker.advantageScore) ||
      safeNumber(gpuProfile.advantageScore) ||
      safeNumber(proxyProfile.advantageScore);

    const binaryDensity =
      safeNumber(earnChunker.binaryDensity) ||
      safeNumber(meshChunker.binaryDensity) ||
      safeNumber(gpuProfile.binaryDensity) ||
      safeNumber(proxyProfile.binaryDensity);

    const waveAmplitude =
      safeNumber(earnChunker.waveAmplitude) ||
      safeNumber(meshChunker.waveAmplitude) ||
      safeNumber(gpuProfile.waveAmplitude) ||
      safeNumber(proxyProfile.waveAmplitude);

    let navBoost = 0;
    if (navState) {
      if (ent.pageId && ent.pageId === navState.currentPageId) navBoost += 0.1;
      if (ent.pageId && ent.pageId === navState.targetPageId)  navBoost += 0.2;
    }

    let runtimeBoost = 0;
    if (runtimeFrame.hotPages && ent.pageId && runtimeFrame.hotPages[ent.pageId]) {
      runtimeBoost += 0.15;
    }

    const trustBoost     = trustPulse.approved ? 0.05 : 0;
    const integrityBoost = cacheIntegrity.verified ? 0.05 : 0;

    normalized.push({
      id,
      ref: ent,
      throughputClass,
      throughputScore: clamp01(
        throughputScore + navBoost + runtimeBoost + trustBoost + integrityBoost
      ),
      advantageTier,
      advantageScore,
      binaryDensity,
      waveAmplitude
    });
  }

  return normalized;
}

// ============================================================
//  WAVE CLASSIFICATION
// ============================================================

function classifyEntityWave_v40(entity) {
  const cls   = entity.throughputClass;
  const score = clamp01(entity.throughputScore);

  if (cls === "throughput_extreme") return 0;
  if (cls === "throughput_high")    return 1;
  if (cls === "throughput_normal")  return 2;
  if (cls === "throughput_low")     return 3;

  if (score >= 0.9) return 0;
  if (score >= 0.7) return 1;
  if (score >= 0.4) return 2;
  return 3;
}

function buildWorldWaves_v40(entities) {
  const waves = [[], [], [], []];

  for (const ent of entities) {
    const idx = classifyEntityWave_v40(ent);
    waves[idx].push(ent);
  }

  for (const wave of waves) {
    wave.sort((a, b) => {
      const s = (b.throughputScore || 0) - (a.throughputScore || 0);
      if (s !== 0) return s;
      const t = (b.advantageTier || 0) - (a.advantageTier || 0);
      if (t !== 0) return t;
      return (b.binaryDensity || 0) - (a.binaryDensity || 0);
    });
  }

  return waves;
}

// ============================================================
//  STRANDED DNA TRANSPORT PLAN — WIFI-AWARE
// ============================================================

function buildStrandedDNATransportPlan_v40(waves, world) {
  // ensure wifi profile is attached
  const wifiProfile = attachWifiProfile_v40(world) || {};
  const runtimeFrame = resolveRuntimeFrame_v40(world);
  const runtime      = safeObj(world.runtime);

  const hintedLaneCount =
    safeInt(runtime.throughputLaneCount) ||
    safeInt(runtimeFrame.throughputLaneCount) ||
    64;

  const maxEntitiesInAnyWave = Math.max(
    1,
    ...waves.map(w => (Array.isArray(w) ? w.length : 0))
  );

  const baseLaneCount = Math.min(hintedLaneCount || 64, maxEntitiesInAnyWave);
  const laneCount     = Math.min(Math.max(baseLaneCount, 1), 256);

  const strandedWaves = [];
  let globalStrandId  = 0;
  let totalStrands    = 0;
  let totalLanes      = 0;
  let totalEntities   = 0;

  // derive pacing from wifi tier
  const tier = wifiProfile.capabilityTier || "medium";
  let basePacingMs = 25;

  if (tier === "immortal") basePacingMs = 5;
  else if (tier === "elite") basePacingMs = 10;
  else if (tier === "high") basePacingMs = 15;
  else if (tier === "medium") basePacingMs = 25;
  else basePacingMs = 40;

  for (let waveIndex = 0; waveIndex < waves.length; waveIndex++) {
    const waveEntities = waves[waveIndex] || [];
    const lanes = new Array(laneCount).fill(null).map((_, laneIndex) => ({
      laneIndex,
      strandId: null,
      entities: []
    }));

    for (let i = 0; i < waveEntities.length; i++) {
      const ent       = waveEntities[i];
      const laneIndex = i % laneCount;
      const lane      = lanes[laneIndex];

      if (lane.strandId == null) {
        lane.strandId = globalStrandId++;
        totalStrands += 1;
      }

      lane.entities.push(ent.id);
      totalEntities += 1;
    }

    const activeLanes = lanes.filter(l => l.entities.length > 0);
    totalLanes += activeLanes.length;

    strandedWaves.push({
      waveIndex,
      laneCount,
      strandCount: activeLanes.length,
      entityCount: waveEntities.length,
      lanes: activeLanes,
      pacingMs: basePacingMs,      // wifi-aware pacing per wave
      wifiTier: tier,
      wifiProfile
    });
  }

  return {
    laneCount,
    totalStrands,
    totalLanes,
    totalEntities,
    waves: strandedWaves,
    wifiProfile
  };
}

// ============================================================
//  WORLD BINARY THROUGHPUT SCHEDULER
// ============================================================

export function applyWorldBinaryThroughputScheduler_v40(world) {
  if (!world || typeof world !== "object") return world;

  world.meta         = world.meta  || {};
  world.flags        = world.flags || {};
  world.runtime      = safeObj(world.runtime);
  world.runtimeFrame = safeObj(world.runtimeFrame);

  const entities = normalizeWorldEntities_v40(world);

  if (entities.length === 0) {
    world.flags.worldBinaryThroughputEnabled = false;
    const emptyPlan = {
      version: "v40-IMMORTAL++-HYPERFRAME",
      waves: [],
      strandedDNA: {
        laneCount: 0,
        totalStrands: 0,
        totalLanes: 0,
        totalEntities: 0,
        waves: [],
        wifiProfile: attachWifiProfile_v40(world) || {}
      },
      hyperFrame:        safeObj(world.hyperFrame),
      deltaFrame:        safeObj(world.deltaFrame),
      oneBandFrame:      safeObj(world.oneBandFrame),
      continuanceFrame:  safeObj(world.continuanceFrame),
      binaryFieldFrame:  safeObj(world.binaryFieldFrame),
      trustPulse:        safeObj(world.trustPulse),
      cacheIntegrity:    safeObj(world.cacheIntegrity),
      worldRuntimeFrame: resolveRuntimeFrame_v40(world),
      scheduling: { enabled: false }
    };
    attachBinaryPlan_v40(world, emptyPlan);
    return world;
  }

  const waves       = buildWorldWaves_v40(entities);
  const strandedDNA = buildStrandedDNATransportPlan_v40(waves, world);

  const plan = {
    version: "v40-IMMORTAL++-HYPERFRAME",
    waves: waves.map((waveEntities, index) => ({
      index,
      entities: waveEntities.map(e => e.id)
    })),
    strandedDNA,
    hyperFrame:        safeObj(world.hyperFrame),
    deltaFrame:        safeObj(world.deltaFrame),
    oneBandFrame:      safeObj(world.oneBandFrame),
    continuanceFrame:  safeObj(world.continuanceFrame),
    binaryFieldFrame:  safeObj(world.binaryFieldFrame),
    trustPulse:        safeObj(world.trustPulse),
    cacheIntegrity:    safeObj(world.cacheIntegrity),
    worldRuntimeFrame: resolveRuntimeFrame_v40(world)
  };

  // integrate PulseWorldScheduler
  try {
    if (typeof PulseWorldScheduler === "function") {
      plan.scheduling = PulseWorldScheduler({
        waves,
        strandedDNA,
        world,
        version: "v40"
      });
    } else {
      plan.scheduling = {
        enabled: false,
        reason: "PulseWorldScheduler not available"
      };
    }
  } catch (err) {
    plan.scheduling = {
      enabled: false,
      error: String(err)
    };
  }

  world.flags.worldBinaryThroughputEnabled = true;
  world.flags.worldBinaryThroughputDebug   = true;

  attachBinaryPlan_v40(world, plan);

  console.log(
    "🧬 PULSE STRANDED DNA v34.0 — %c[PulseWorld::StrandedDNA:Present] Lanes=%d, TotalStrands=%d, TotalLanes=%d, TotalEntities=%d",
    "color:#00FFCC; font-weight:bold; font-family:monospace;",
    strandedDNA.laneCount,
    strandedDNA.totalStrands,
    strandedDNA.totalLanes,
    strandedDNA.totalEntities
  );

  return world;
}

// ============================================================
//  WORLD CANDIDATE / STORAGE DETECTION
// ============================================================

function isStorageLike(obj) {
  if (!obj || typeof obj !== "object") return false;
  const StorageCtor =
    typeof Storage === "function"
      ? Storage
      : typeof PulseRealm.Storage === "function"
      ? PulseRealm.Storage
      : null;

  if (StorageCtor && obj instanceof StorageCtor) return true;

  return (
    typeof obj.getItem === "function" &&
    typeof obj.setItem === "function" &&
    typeof obj.removeItem === "function"
  );
}

function isWorldCandidate_v40(obj) {
  if (!obj || typeof obj !== "object") return false;

  if (obj.__pulseWorld === true) return true;
  if (obj.__pulseMultiverse === true) return true;
  if (obj.__pulseRealm === true) return true;

  if (obj.meta && typeof obj.meta === "object") {
    const t = obj.meta.type;
    if (t === "pulse-world") return true;
    if (t === "pulse-multiverse") return true;
    if (t === "pulse-realm") return true;
  }

  if ("worldId" in obj && "worldContext" in obj) return true;
  if ("routeContext" in obj && "waveContext" in obj) return true;
  if (Array.isArray(obj.entities) && obj.hyperFrame) return true;

  if ("resolveRoute" in obj && "loadOrganismMap" in obj) return false;
  if ("listeners" in obj && "emit" in obj && "on" in obj) return false;
  if ("systems" in obj && "pages" in obj) return false;
  if ("pulseBandSurface" in obj || "binarySurface" in obj) return false;

  return false;
}
