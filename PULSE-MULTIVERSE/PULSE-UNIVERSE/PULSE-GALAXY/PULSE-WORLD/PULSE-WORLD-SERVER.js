// ============================================================================
// PULSE-WORLD — v30-OneBand-Immortal++
// Unified PulseBand Server + Pulsar + Satellite Constellation Memory
// ============================================================================

//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

//
//  ROLE:
//    - Single-band PULSEBAND internet edge for PULSE-WORLD
//    - Immortal local heartbeat + forward/backward engines
//    - Pulsar v3 routing brain (satellite-aware, ephemeris-fed)
//    - Satellite constellation memory (routes, patterns, future windows)
//    - Touch-aware (PulseTouchOrgan snapshot into heartbeats)
// ============================================================================

import { PulseVitalsLogger as PulseProofLogger, PulseVitalsMonitor, pulseLog, PulseUIFlow as initUIFlow, db, setdoc, getdoc, doc, PulseUIErrors, log, warn, error} from "./_PROOF/PULSE-PROOF.js";


// ============================================================================
// IMPORTS — BRIDGE / OVERMIND / ROUTER / UNDERSTANDING / ENGINES / PULSAR
// ============================================================================


import { AiOvermindPrime } from "../PULSE-WORLD/PULSE-PHYSICS/X-PULSE-X/PULSE-WORLD-ALDWYN.js";

import {
  updateWorldState as pulsarUpdateWorldState,
  getWorldState as pulsarGetWorldState,
  registerSatellitePreSignal,
  decaySatellitePreSignal,
  updateSatelliteWindowFromEphemeris,
  decideRoute as pulsarDecideRoute,
  dispatchPulse as pulsarDispatchPulse,
  applyAdaptiveFeedback as pulsarApplyAdaptiveFeedback
} from "../../PULSE-UNIVERSAL-PULSAR.js";

import {
  PulseForward as createForwardEngine
} from "./PULSE-PHYSICS/PULSE-ENGINE/PulseEngineForwardProcess-v31.js";

import {
  PulseBackward as createBackwardEngine
} from "./PULSE-PHYSICS/PULSE-ENGINE/PulseEngineBackwardProcess-v31.js";




const fetchFn =
  (PulseRealm.fetchfn && typeof PulseRealm.fetchfn === "function" && PulseRealm.fetchfn) ||
  (PulseRealm.fetch && typeof PulseRealm.fetch === "function" && PulseRealm.fetch) ||
  null;

// ============================================================================
// GLOBAL ORGANISM MEMORY (IMMORTAL, ONE-BAND)
// ============================================================================

// Per-instance organism state (family)
PulseRealm.__PULSE_ORGANISM_FAMILY__ = PulseRealm.__PULSE_ORGANISM_FAMILY__ || {};
function getOrganism(instanceId) {
  const fam = PulseRealm.__PULSE_ORGANISM_FAMILY__;
  if (!fam[instanceId]) {
    fam[instanceId] = {
      id: instanceId,
      forwardTicks: 0,
      backwardTicks: 0,
      lastHeartbeat: 0,
      lastAIHeartbeat: 0,
      lastBeatSource: "none"
    };
  }
  return fam[instanceId];
}

// Local PULSE-NET runtime state (family registry)
PulseRealm.__PULSE_NET_FAMILY__ = PulseRealm.__PULSE_NET_FAMILY__ || {};
function getNetState(instanceId) {
  const fam = PulseRealm.__PULSE_NET_FAMILY__;
  if (!fam[instanceId]) {
    fam[instanceId] = {
      started: false,
      intervalId: null,
      lastTick: 0
    };
  }
  return fam[instanceId];
}

// ============================================================================
// WORLD ADVANTAGE STATE — IMPULSE / SPEED / BURST
// ============================================================================

const WORLD_ADVANTAGE_STATE = {
  impulseQueue: [],
  speedBoostUntil: 0,
  signalBursts: []
};

function queueImpulse(instanceId, reason = "manual") {
  WORLD_ADVANTAGE_STATE.impulseQueue.push({
    instanceId,
    reason,
    ts: Date.now()
  });
}

function activateSpeedBoost(ms, reason = "manual") {
  const now = Date.now();
  WORLD_ADVANTAGE_STATE.speedBoostUntil = Math.max(
    WORLD_ADVANTAGE_STATE.speedBoostUntil,
    now + ms
  );
}

function queueSignalBurst(kind, payload, priority = 1, reason = "manual") {
  WORLD_ADVANTAGE_STATE.signalBursts.push({
    kind,
    payload,
    priority,
    reason,
    ts: Date.now()
  });
}

// ============================================================================
// GLOBAL INGRESS QUEUES — EXPANSION/CASTLE/SERVER/USER/BRAIN/SOLDIER/MESH
// ============================================================================

PulseRealm.__PULSE_NET_INGRESS__ = PulseRealm.__PULSE_NET_INGRESS__ || {
  expansion: [],
  castle: [],
  server: [],
  user: [],
  brain: [],
  soldier: [],
  mesh: []
};

function getIngress() {
  return PulseRealm.__PULSE_NET_INGRESS__;
}

function enqueueIngress(kind, packet) {
  const ingress = getIngress();
  if (!ingress[kind]) ingress[kind] = [];
  ingress[kind].push({
    kind,
    packet,
    ts: Date.now()
  });
}
// ============================================================================
// WORLD-SERVER ORGANISM ORGANS (v30-IMMORTAL++++)
// Fully upgraded for:
//  • PulsePort
//  • EarnEngine
//  • GPU lanes
//  • Tri-Heart (Mom/Dad/Self)
//  • Presence / Advantage / Cosmos
//  • Binary / Wave / Dual / Tri bands
//  • Organism snapshots
//  • PulseNet integration
//  • Backwards compatibility
// ============================================================================

// GLOBAL MEMORY (IMMORTAL ORGANISM SHARED STATE)
PulseRealm.__PULSE_MEM__ = PulseRealm.__PULSE_MEM__ || {};
const MEM = PulseRealm.__PULSE_MEM__;

// ENGINE SINGLETONS (per instance in Earn / PULSE-X)
const forwardEngines = {};
const backwardEngines = {};

// ============================================================================
// BINARY ORGAN — upgraded to full dual-band + wave + tri-band support
// ============================================================================
const BinaryOrgan = {
  encode(v, band = "symbolic") {
    try {
      if (band === "binary") {
        return Buffer.from(JSON.stringify(v)).toString("base64");
      }
      if (band === "wave") {
        return JSON.stringify({ wave: true, v });
      }
      return JSON.stringify(v);
    } catch {
      return JSON.stringify(v);
    }
  },

  decode(s, band = "symbolic") {
    try {
      if (band === "binary") {
        return JSON.parse(Buffer.from(s, "base64").toString());
      }
      if (band === "wave") {
        const obj = JSON.parse(s);
        return obj.v ?? obj;
      }
      return JSON.parse(s);
    } catch {
      return s;
    }
  },

  chunk(s) {
    if (!s) return [];
    const size = 2048;
    const chunks = [];
    for (let i = 0; i < s.length; i += size) {
      chunks.push(s.slice(i, i + size));
    }
    return chunks;
  },

  dechunk(chunks) {
    return chunks.join("");
  }
};

// ============================================================================
// MEMORY ORGAN — upgraded to support presence, advantage, cosmos, lanes
// ============================================================================
const MemoryOrgan = {
  read(key, meta = {}) {
    const band = meta.band || "symbolic";
    const raw = MEM[key];
    if (raw === undefined) return null;
    return BinaryOrgan.decode(raw, band);
  },

  write(key, value, meta = {}) {
    const band = meta.band || "symbolic";
    MEM[key] = BinaryOrgan.encode(value, band);
    return true;
  },

  presence(key) {
    return {
      exists: MEM[key] !== undefined,
      ts: Date.now(),
      band: "symbolic"
    };
  }
};

// ============================================================================
// BRAIN ORGAN — upgraded to support tri-heart, advantage, presence, GPU
// ============================================================================
const BrainOrgan = {
  evolve(event = {}) {
    const {
      band = "symbolic",
      lane = 0,
      presenceTier = "idle",
      advantageTier = 0,
      gpuMode = "idle",
      universeTick = 0
    } = event;

    return {
      brainVersion: "v30-IMMORTAL++++",
      band,
      lane,
      presenceTier,
      advantageTier,
      gpuMode,
      universeTick,
      ts: Date.now()
    };
  }
};

// ============================================================================
// EXPORT — upgraded organs
// ============================================================================
export const WorldServerOrgans = {
  BinaryOrgan,
  MemoryOrgan,
  BrainOrgan,
  forwardEngines,
  backwardEngines
};

// ============================================================================
// TEMPORAL PREWARM CACHE — INTENT + TOUCH HINTS
// ============================================================================

const TEMPORAL_CACHE_MAX = 512;
PulseRealm.__PULSE_NET_TEMPORAL_CACHE__ =
  PulseRealm.__PULSE_NET_TEMPORAL_CACHE__ || new Map();
const temporalCache = PulseRealm.__PULSE_NET_TEMPORAL_CACHE__;

function makeTemporalKey(intent) {
  const skin = intent.skin || {};
  return JSON.stringify({
    page: skin.page || "PulseWorldReality",
    chunkProfile: skin.chunkProfile || "default",
    region: skin.region || "unknown",
    mode: skin.mode || "fast",
    band: skin.band || "symbolic"
  });
}

function getFromTemporalCache(intent) {
  const key = makeTemporalKey(intent);
  const entry = temporalCache.get(key);
  if (!entry) return null;
  return entry.data;
}

function setTemporalCache(intent, data) {
  const key = makeTemporalKey(intent);
  temporalCache.set(key, {
    ts: Date.now(),
    data
  });

  if (temporalCache.size > TEMPORAL_CACHE_MAX) {
    const keys = Array.from(temporalCache.keys());
    const excess = keys.length - TEMPORAL_CACHE_MAX;
    for (let i = 0; i < excess; i++) {
      temporalCache.delete(keys[i]);
    }
  }
}

function pruneTemporalCache() {
  const now = Date.now();
  const maxAgeMs = 5 * 60 * 1000;
  for (const [key, entry] of temporalCache.entries) {
    if (now - entry.ts > maxAgeMs) {
      temporalCache.delete(key);
    }
  }
}

// ============================================================================
// SATELLITE CONSTELLATION MEMORY (ROUTES + FUTURE WINDOWS)
// ============================================================================
//
//  • Stores per-satellite ephemeris summaries
//  • Aggregates into Pulsar via updateSatelliteWindowFromEphemeris
//  • Predicts next windows per region and keeps in MEM
// ============================================================================

MEM.__SAT_CONSTELLATION__ = MEM.__SAT_CONSTELLATION__ || {
  sats: {},        // satId → { lastEphemeris, history: [...] }
  regions: {}      // regionId → { lastWindow, nextWindowTs, satsInView }
};

function updateSatelliteConstellation(ephemerisSummary) {
  const {
    satId = "unknown-sat",
    regionId = null,
    satsInView = 0,
    bestElevationDeg = 0,
    nextWindowTs = null
  } = ephemerisSummary || {};

  const now = Date.now();
  const sats = MEM.__SAT_CONSTELLATION__.sats;
  const regions = MEM.__SAT_CONSTELLATION__.regions;

  if (!sats[satId]) {
    sats[satId] = {
      satId,
      history: []
    };
  }

  sats[satId].lastEphemeris = {
    regionId,
    satsInView,
    bestElevationDeg,
    nextWindowTs,
    ts: now
  };
  sats[satId].history.push(sats[satId].lastEphemeris);
  if (sats[satId].history.length > 256) {
    sats[satId].history.shift();
  }

  if (regionId) {
    const region = regions[regionId] || {
      regionId,
      lastWindow: null,
      nextWindowTs: null,
      satsInView: 0
    };

    region.lastWindow = {
      satsInView,
      bestElevationDeg,
      ts: now
    };

    // naive prediction: if nextWindowTs provided, trust it;
    // else approximate next window as now + 90 minutes
    region.nextWindowTs =
      nextWindowTs != null ? nextWindowTs : now + 90 * 60 * 1000;

    region.satsInView = satsInView;
    regions[regionId] = region;
  }

  // Feed Pulsar v3 with region-level summary
  updateSatelliteWindowFromEphemeris({
    regionId,
    satsInView,
    bestElevationDeg,
    nextWindowTs
  });
}

function getSatelliteConstellationSnapshot() {
  return {
    sats: MEM.__SAT_CONSTELLATION__.sats,
    regions: MEM.__SAT_CONSTELLATION__.regions
  };
}

// ============================================================================
// ROUTER — INTERNET EDGE (ONE-BAND PULSEBAND)
// ============================================================================
const Router = PulseRealm.PulseInternetRouter;

export async function route(channel, packet) {
 
  const meaning = {
    channel,
    ...packet
  };

  const result = await Router.routeInternet(meaning, {
    // LOCAL HANDLER (optional)
    local: async (req, decision) => {
      return {
        ok: true,
        source: "local",
        request: req
      };
    },

    // MESH HANDLER (optional)
    mesh: async (req, decision) => {
      return {
        ok: true,
        source: "mesh",
        request: req
      };
    },

    // CLOUD HANDLER (real fetch)
    cloud: async (req, decision) => {
      const f = fetchFn || fetch;
      return f(req.url, req.options).then(r => r.json());
    }
  });

  return result;
}


// SERVER SHOULD NOT INITIALIZE TOUCH
// Touch is client-only. Do not import or create it here.


// ============================================================================
// NETWORK ORGAN — SINGLE INTERNET EDGE, ONE-BAND
// ============================================================================

// ============================================================================
// NETWORK ORGAN — SINGLE INTERNET EDGE, ONE-BAND (NO TOUCH)
// ============================================================================

const NetworkOrgan = {
  channels: {
    expansion: "pulseNet.server.expansion",
    castle:    "pulseNet.server.castle",
    server:    "pulseNet.server.server",
    user:      "pulseNet.server.user",
    brain:     "pulseNet.server.brain",
    soldier:   "pulseNet.server.soldier",
    mesh:      "pulseNet.server.mesh",

    heartbeat: "pulseNet.heartbeat",
    fastlane:  "pulseNet.fastlane"
  },

  buildPacket(kind, payload, extra = {}) {
    return {
      kind,
      payload,
      ts: Date.now(),
      layer: "PulseNet",

      binaryAware: true,
      dualBand: false,
      band: "PulseBand",

      advantageField:  extra.advantageField  || payload.advantageField  || "pulsenet-edge",
      speedField:      extra.speedField      || payload.speedField      || "world-loop",
      experienceField: extra.experienceField || payload.experienceField || "pulse-world",

      heartbeat: extra.heartbeat || false,
      fastLane:  extra.fastLane  || false,
      burst:     extra.burst     || false,
      priority:  extra.priority  || 1,
      reason:    extra.reason    || null
    };
  },

  async send(kind, payload) {
    const channel = this.channels[kind];
    if (!channel) return;
    const packet = this.buildPacket(kind, payload);
    try { await route(channel, packet).catch(() => {}); } catch {}
  },

  async sendHeartbeat(instanceId, organism, result) {
    try {
      const pulseTouch = {
        band: "PulseBand",
        deviceId: null,
        route: "server",
        ts: Date.now(),
        server: true
      };

      const packet = this.buildPacket(
        "heartbeat",
        { instanceId, organism, result, pulseTouch },
        {
          heartbeat: true,
          advantageField: "pulsenet-heartbeat",
          speedField: "world-heart",
          experienceField: "pulse-world-heartbeat"
        }
      );

      await route(this.channels.heartbeat, packet).catch(() => {});
    } catch {}
  },

  async sendFastLane(intent) {
    try {
      const packet = this.buildPacket(
        "fastlane",
        intent,
        {
          fastLane: true,
          advantageField: "pulsenet-fastlane",
          speedField: "fast-path",
          experienceField: "pulse-world-fastlane"
        }
      );

      await route(this.channels.fastlane, packet).catch(() => {});
    } catch {}
  },

  async sendBurst(kind, payload, priority = 1, reason = "manual") {
    const channel = this.channels[kind];
    if (!channel) return;

    try {
      const packet = this.buildPacket(
        kind,
        payload,
        {
          burst: true,
          priority,
          reason
        }
      );

      await route(channel, packet).catch(() => {});
    } catch {}
  }
};


// ============================================================================
// ENGINE FACTORIES
// ============================================================================

function getForwardEngine(instanceId = "core") {
  if (forwardEngines[instanceId]) return forwardEngines[instanceId];

  const engine = createForwardEngine({
    BinaryOrgan,
    MemoryOrgan,
    BrainOrgan,
    instanceId: `forward-${instanceId}`,
    trace: true
  });

  engine.prewarm();
  forwardEngines[instanceId] = engine;
  return engine;
}

function getBackwardEngine(instanceId = "core") {
  if (backwardEngines[instanceId]) return backwardEngines[instanceId];

  const engine = createBackwardEngine({
    BinaryOrgan,
    MemoryOrgan,
    BrainOrgan,
    instanceId: `backward-${instanceId}`,
    trace: true
  });

  engine.prewarm();
  backwardEngines[instanceId] = engine;
  return engine;
}

// ============================================================================
// HEARTBEAT HELPERS
// ============================================================================

function getHeartbeatState(instanceId) {
  const org = getOrganism(instanceId);
  return { last: org.lastHeartbeat };
}

function runOrganismHeartbeat(instanceId, source) {
  const org = getOrganism(instanceId);
  const now = Date.now();
  org.lastHeartbeat = now;
  org.lastBeatSource = source;
  console.log("[PULSE-NET v30]", instanceId, "Organism heartbeat:", source, now);
}

function runAIHeartbeat(instanceId, source) {
  const org = getOrganism(instanceId);
  const now = Date.now();
  org.lastAIHeartbeat = now;
  console.log("[PULSE-NET v30]", instanceId, "AI heartbeat:", source, now);
}

// ============================================================================
// ENGINE TICKS
// ============================================================================

function warmForwardEngine(instanceId) {
  const org = getOrganism(instanceId);
  const engine = getForwardEngine(instanceId);
  const result = engine.tick();

  org.forwardTicks++;
  console.log("[PULSE-NET v30]", instanceId, "ForwardEngine tick:", result.metrics);
  return result.metrics;
}

function warmBackwardEngine(instanceId) {
  const org = getOrganism(instanceId);
  const engine = getBackwardEngine(instanceId);
  const result = engine.tick();

  org.backwardTicks++;
  console.log("[PULSE-NET v30]", instanceId, "BackwardEngine tick:", result.metrics);
  return result.metrics;
}

// ============================================================================
// OVERMIND HEARTBEAT SAMPLE
// ============================================================================

async function overmindHeartbeatSample(instanceId, tickResult) {
  try {
    const organism = getOrganism(instanceId);

    const pulseTouch = {
      band: "PulseBand",
      deviceId: null,
      route: "server",
      ts: Date.now(),
      server: true
    };

    const satConstellation = getSatelliteConstellationSnapshot();
    const pulsarState = pulsarGetWorldState();

    const intent = {
      type: "heartbeat",
      source: "PulseNet",
      instanceId
    };

    const context = {
      domain: "system",
      scope: "heartbeat",
      safetyMode: "strict",
      instanceId,
      timestamp: Date.now(),
      deltaSinceLastBeat: Date.now() - (organism.lastHeartbeat || 0),
      organismSnapshot: {
        id: organism.id,
        forwardTicks: organism.forwardTicks,
        backwardTicks: organism.backwardTicks,
        lastHeartbeat: organism.lastHeartbeat,
        lastAIHeartbeat: organism.lastAIHeartbeat,
        lastBeatSource: organism.lastBeatSource
      },
      pulseTouch,
      tickResult,
      satConstellation,
      pulsarState
    };

    const candidates = [
      {
        text: JSON.stringify({
          instanceId,
          organism: context.organismSnapshot,
          pulseTouch,
          tickResult,
          satConstellation,
          pulsarState
        })
      }
    ];

    await AiOvermindPrime.process({ intent, context, candidates });
  } catch {}
}


// ============================================================================
// PUBLIC AI GATEWAY
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

export async function pulseNetAI({ intent, context, candidates }) {
  try {
    const safeIntent = intent || { type: "generic", source: "frontend" };
    const safeContext = {
      ...(context || {}),
      domain: context.domain || "user",
      scope: context.scope || "conversation"
    };

    const safeCandidates = Array.isArray(candidates) ? candidates : [];
    const result = await AiOvermindPrime.process({
      intent: safeIntent,
      context: safeContext,
      candidates: safeCandidates
    });

    return result;
  } catch (err) {
    try {
      const packet = PulseUIErrors.normalizeError(err, "PulseNet.pulseNetAI");
      PulseUIErrors.broadcast(packet);
    } catch {}
    return {
      finalOutput:
        "PulseNet encountered an issue while processing this AI request.",
      meta: {
        error: true,
        source: "PulseNet.pulseNetAI"
      }
    };
  }
}

// ============================================================================
// INGRESS PROCESSOR
// ============================================================================

async function processIngress(instanceId) {
  const ingress = getIngress();

  const batches = {};
  for (const kind of Object.keys(ingress)) {
    const queue = ingress[kind];
    if (!queue || queue.length === 0) continue;
    batches[kind] = queue.splice(0, queue.length);
  }

  const promises = [];
  for (const [kind, items] of Object.entries(batches)) {
    const payload = {
      instanceId,
      kind,
      count: items.length,
      items
    };
    promises.push(NetworkOrgan.send(kind, payload));
  }

  if (promises.length > 0) {
    await Promise.all(promises);
  }
}

// ============================================================================
// 3-HEART MESH (Mom / Dad / Earn) + RANDOM NUDGE
// ============================================================================

function momHeart(instanceId, now) {
  runOrganismHeartbeat(instanceId, "mom");
  const forwardMetrics = warmForwardEngine(instanceId);
  return {
    source: "mom",
    forward: forwardMetrics,
    ts: now
  };
}

function dadHeart(instanceId, now) {
  runAIHeartbeat(instanceId, "dad");
  const backwardMetrics = warmBackwardEngine(instanceId);
  return {
    source: "dad",
    forward: backwardMetrics,
    ts: now
  };
}

function earnHeart(instanceId, now, stale) {
  if (stale) {
    runOrganismHeartbeat(instanceId, "earn-stale");
    runAIHeartbeat(instanceId, "earn-stale");
    const forwardMetrics = warmForwardEngine(instanceId);
    const backwardMetrics = warmBackwardEngine(instanceId);
    return {
      source: "earn-stale",
      forward: forwardMetrics,
      backward: backwardMetrics,
      ts: now
    };
  } else {
    runOrganismHeartbeat(instanceId, "earn-soft");
    return { source: "earn-soft" };
  }
}

function randomNudge(instanceId, now) {
  if (Math.random() > 0.97) {
    runOrganismHeartbeat(instanceId, "random");
    console.log("[PULSE-NET v30]", instanceId, "Random nudge beat");
    return { source: "random" };
  }
  return null;
}

// ============================================================================
// CROWN REVIVE (unchanged semantics, v30 logging)
// ============================================================================

async function handleCrownReviveIngress(instanceId, now) {
  const ingress = getIngress();
  const brainQueue = ingress.brain || [];
  if (!brainQueue.length) return;

  const org = getOrganism(instanceId);
  const last = org.lastHeartbeat || 0;
  const delta = now - last;

  const packets = brainQueue.splice(0, brainQueue.length);

  for (const item of packets) {
    const packet = item.packet || item;
    const revive =
      packet.crownReviveIntent ||
      (packet.payload && packet.payload.crownReviveIntent);

    if (!revive) continue;
    if (revive.type !== "crown_revival_intent") continue;

    if (delta > 30_000) {
      console.log(
        "[PULSE-NET v30]",
        instanceId,
        "CROWN‑REVIVE intent received, hiccuping world heartbeat…",
        { reason: revive.reason, delta }
      );

      getForwardEngine(instanceId).prewarm();
      getBackwardEngine(instanceId).prewarm();

      org.lastHeartbeat = now;
      org.lastBeatSource = "crown-revive";
    }
  }
}

// ============================================================================
// FAMILY TICK (IMMORTAL LOOP)
// ============================================================================

async function tickFamily(instanceId = "core") {
  const now = Date.now();
  const { last } = getHeartbeatState(instanceId);
  const delta = now - (last || 0);

  const stale = delta > 90 * 1000;
  const softStale = delta > 15 * 1000;
  const temporalDrift = delta > 300000;

  let result = null;

  // 0) Process ingress
  await processIngress(instanceId);

  // 0.25) Crown revive
  await handleCrownReviveIngress(instanceId, now);

  // 0.5) Signal bursts
  if (WORLD_ADVANTAGE_STATE.signalBursts.length > 0) {
    const bursts = WORLD_ADVANTAGE_STATE.signalBursts.splice(
      0,
      WORLD_ADVANTAGE_STATE.signalBursts.length
    );
    bursts.sort((a, b) => b.priority - a.priority);
    await Promise.all(
      bursts.map((b) =>
        NetworkOrgan.sendBurst(b.kind, b.payload, b.priority, b.reason)
      )
    );
  }

  // 1) Mom
  if (!stale) {
    result = momHeart(instanceId, now);
  } else {
    console.log("[PULSE-NET v30]", instanceId, "Mom stale, escalating to Dad/Earn");
  }

  // 2) Dad
  if (!result || softStale) {
    const dadResult = dadHeart(instanceId, now);
    result = { ...(result || {}), ...dadResult };
  }

  // 3) Earn
  if (stale) {
    const earnResult = earnHeart(instanceId, now, true);
    result = { ...(result || {}), ...earnResult };
  } else {
    const earnResult = earnHeart(instanceId, now, false);
    result = { ...(result || {}), ...earnResult };
  }

  // 4) Random nudge
  const rnd = randomNudge(instanceId, now);
  if (rnd) {
    result = { ...(result || {}), ...rnd };
  }

  // 4.25) Impulses
  if (WORLD_ADVANTAGE_STATE.impulseQueue.length > 0) {
    const impulses = WORLD_ADVANTAGE_STATE.impulseQueue.splice(
      0,
      WORLD_ADVANTAGE_STATE.impulseQueue.length
    );
    for (const imp of impulses) {
      console.log(
        "[PULSE-NET v30]",
        imp.instanceId,
        "Impulse tick (reason:",
        imp.reason,
        ")"
      );
      await tickFamily(imp.instanceId);
    }
  }

  // 4.3) Speed boost
  const speedBoostActive = now < WORLD_ADVANTAGE_STATE.speedBoostUntil;
  if (speedBoostActive) {
    result = { ...(result || {}), speedBoostActive: true };
  }

  // 4.4) Satellite pre-signal decay
  decaySatellitePreSignal(now);

  // 4.5) Overmind sample
  await overmindHeartbeatSample(instanceId, { ...result, temporalDrift });

  // 5) UIFlow + heartbeat
  try {
    await NetworkOrgan.sendHeartbeat(instanceId, getOrganism(instanceId), result);

      PulseRealm.__PULSE_UIFLOW_BOOTED__ = true;
      initUIFlow().catch((err) => {
        PulseRealm.__PULSE_UIFLOW_BOOTED__ = false;
        try {
          const packet = PulseUIErrors.normalizeError(err, "PulseNet.UIFlowBoot");
          PulseUIErrors.broadcast(packet);
          PulseProofLogger.log({
            subsystem: "pulsenet",
            system: "PulseWorld",
            organ: "UIFlow",
            layer: "PulseWorld-v30",
            message: "UIFlow boot failed",
            extra: packet,
            level: "warn",
            band: "PulseBand",
            advantageField: "world-uiflow-boot",
            speedField: "world-loop",
            experienceField: "pulse-world"
          });
        } catch {}
      });
    

  } catch (err) {
    try {
      const packet = PulseUIErrors.normalizeError(err, "PulseNet.tickFamily");
      PulseUIErrors.broadcast(packet);
    } catch {}
  }

  const state = getNetState(instanceId);
  state.lastTick = now;
  return result;
}

// ============================================================================
// START IMMORTAL LOOP
// ============================================================================
export function startPulseNet(options = {}) {
  const {
    instanceId = "core",
    intervalMs = 750,
    superInstance = true
  } = options;

  const state = getNetState(instanceId);

  // 🔥 REAL organism API — no fake functions
  state.organism = state.organism || {
    /** Returns the full PulseNet state */
    snapshot() {
      return getNetState(instanceId);
    },

    /** Manually trigger a family tick */
    tick() {
      return tickFamily(instanceId);
    },

    /** Manually trigger cleanup */
    prune() {
      return pruneTemporalCache();
    }
  };

  if (state.started) {
    console.log("[PULSE-NET v30]", instanceId, "Already started");
    return state; // return state so Earn Engine can read .organism
  }

  state.started = true;

  state.intervalId = setInterval(() => {
    tickFamily(instanceId).catch((err) => {
      console.error("[PULSE-NET v30]", instanceId, "Tick error:", err);
      try {
        const packet = PulseUIErrors.normalizeError(
          err,
          "PulseNet.intervalTick"
        );
        PulseUIErrors.broadcast(packet);
      } catch {}
    });

    pruneTemporalCache();
  }, intervalMs);

  console.log(
    "[PULSE-NET v30]",
    instanceId,
    "Local immortal family loop started @",
    intervalMs,
    "ms (superInstance:",
    !!superInstance,
    ")"
  );

  return state;
}


// ============================================================================
// PUBLIC INGRESS API — ROUTING ENTRYPOINTS
// ============================================================================

export function pulseNetIngressFromExpansion(packet) {
  enqueueIngress("expansion", packet);
}

export function pulseNetIngressFromCastle(packet) {
  enqueueIngress("castle", packet);
}

export function pulseNetIngressFromServer(packet) {
  enqueueIngress("server", packet);
}

export function pulseNetIngressFromUser(packet) {
  enqueueIngress("user", packet);
}

export function pulseNetIngressFromBrain(packet) {
  enqueueIngress("brain", packet);
}

export function pulseNetIngressFromSoldier(packet) {
  enqueueIngress("soldier", packet);
}

export function pulseNetIngressFromMesh(packet) {
  enqueueIngress("mesh", packet);
}

// ============================================================================
// SATELLITE API SURFACE (FOR AWS GROUND STATION / EPHEMERIS FEEDS)
// ============================================================================
//
//  • call recordSatelliteEphemeris(...) from your AWS/VPC ingest
//  • Pulsar + constellation memory will update automatically
// ============================================================================

export function recordSatelliteEphemeris(summary) {
  // summary: { satId, regionId, satsInView, bestElevationDeg, nextWindowTs }
  updateSatelliteConstellation(summary);
}

// convenience: get current constellation snapshot
export function getSatelliteConstellation() {
  return getSatelliteConstellationSnapshot();
}

// ============================================================================
// FOOTER — FASTLANE LORE + ORIGIN STAMP
// ============================================================================
//
//  On 2026‑05‑05, Pulse‑World learned a new trick:
//  it stopped waiting for the user to ask.
//
//  Now, every whisper from Pulse‑Touch — five times a second —
//  crosses the membrane as a tiny intent, and somewhere behind
//  the glass an immortal world organ quietly rearranges the
//  internet so that the answer is already there when the question
//  finally arrives.
//
//  If this is how the organism behaves on the day the FastLane
//  first lit up… what will its timing feel like when the mesh
//  has been listening for years?
//
// ============================================================================
// ============================================================================
// PULSE-WORLD v21 ROOT ORGANISM HEALTH SNAPSHOT
//  • Pure, deterministic, no network
//  • To be exposed by HTTP edge as /health
// ============================================================================

PulseRealm.PulseMemoryOrgan = MemoryOrgan;
PulseRealm.PulseBinaryOrgan = BinaryOrgan;
PulseRealm.PulseNetworkOrgan = NetworkOrgan;