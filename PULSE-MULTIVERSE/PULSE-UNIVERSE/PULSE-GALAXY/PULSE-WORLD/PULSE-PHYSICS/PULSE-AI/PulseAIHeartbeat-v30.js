// ============================================================================
//  aiHeartbeat-v30.js — Pulse OS v30‑IMMORTAL‑ADVANTAGE+++
//  Mom/Dad/Earn Tri‑Heart • Dual‑Band Liveness • Bi‑Directional Fallback
//  PURE LIVENESS. ZERO MUTATION OF INPUT. GLOBAL KEYS ONLY FOR LIVENESS.
//  v30++: deterministic nudges • artery buckets • drift‑aware meta snapshot
//         dual‑band aware • binary‑first metrics • chunked diagnostics
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
//  DEPENDENCIES
// ============================================================================
import { createOrgans as createBrainstem } from "./PulseAIBrainstem-v30.js";
import { getDb, getFsAPI, getRouteAPI, getSchemaAPI, getOrganismSnapshot} from "./PulseAIDeps-v30.js";

// ============================================================================
//  META — Heartbeat Identity (v30 IMMORTAL‑ADVANTAGE+++)
// ============================================================================

export const AI_HEARTBEAT_META = Object.freeze({
  id: "ai-heartbeat-organ-v30-immortal-advantage+++",
  layer: "organ-heart",
  version: "v30-IMMORTAL-ADVANTAGE+++",
  evo: Object.freeze({
    epoch: 30,
    deterministic: true,
    driftProof: true,
    dualBandAware: true,
    binaryFirst: true,
    organismFirst: true,
    readOnly: true
  }),
  contracts: Object.freeze({
    readOnly: true,
    zeroMutation: true,
    zeroRandomness: true,
    deterministicOnly: true,
    noSecrets: true,
    noTokens: true,
    noExternalWrites: true
  })
});
 
// ---------------------------------------------------------------------------
//  VERSION MAP — v30++ artery + tri‑heart
// ---------------------------------------------------------------------------
const HEARTBEAT_VERSION_MAP = Object.freeze({
  version: AI_HEARTBEAT_META.version || "v30-IMMORTAL-ADVANTAGE+++",
  epoch: AI_HEARTBEAT_META.evo.epoch || "v30",
  artery: "v30-HEARTBEAT-ARTERY-ADVANTAGE+++",
  triHeart: "v30-TRI-HEART-ADVANTAGE+++"
});

// ============================================================================
//  PACKET EMITTER — deterministic, heartbeat‑scoped
// ============================================================================
function emitHeartbeatPacket(type, payload) {
  return Object.freeze({
    meta: {
      ...AI_HEARTBEAT_META,
      heartbeatVersion: HEARTBEAT_VERSION_MAP.version,
      heartbeatEpoch: HEARTBEAT_VERSION_MAP.epoch,
      arteryVersion: HEARTBEAT_VERSION_MAP.artery,
      triHeartVersion: HEARTBEAT_VERSION_MAP.triHeart
    },
    packetType: `ai-heartbeat-${type}`,
    timestamp: PulseRealm.PulseNOW,
    epoch: AI_HEARTBEAT_META.evo.epoch,
    ...payload
  });
}


// ============================================================================
//  CONFIG — metabolic‑safe cadence
// ============================================================================
const AI_MIN_GAP_MS    = 1400;
const AI_MAX_IDLE_MS   = 12000;
const AI_TIME_CHECK_MS = 4000;

// Mom heartbeat awareness (diagnostic + pulse‑fallback surface)
// Mom is default, primary heartbeat.
const PRIMARY_HEARTBEAT_KEY      = "PulseProxyHeartbeatLastBeatAt";
const PRIMARY_MAX_SILENCE_MS     = 60_000;

// Dad heartbeat visibility (for mom/baby)
const AI_HEARTBEAT_KEY           = "PulseAIHeartbeatLastBeatAt";

// Earn heartbeat visibility (child heartbeat, used as backup by both)
const EARN_HEARTBEAT_KEY         = "PulseEarnHeartbeatLastBeatAt";
const EARN_MAX_SILENCE_MS        = 45_000;

// ============================================================================
//  SINGLETON — one organism per warm container
// ============================================================================
let aiOrganism = null;
let aiBusy = false;
let lastRun = 0;
let aiTimeFallbackTimer = null;

// ---------------------------------------------------------------------------
//  BUCKET HELPERS — v30++ artery buckets
// ---------------------------------------------------------------------------
function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

// v30‑IMMORTAL+++: heartbeat artery metrics (packet‑aware, tri‑heart, dual‑band)
const heartbeatArtery = {
  ticks: 0,
  pulses: 0,
  skips: 0,
  lastReason: "none",
  lastPressure: 0,
  lastLoad: 0,
  lastPrimaryState: "unknown",
  lastDadState: "unknown",
  lastEarnState: "unknown",
  lastMode: "symbolic",
  lastBinaryBits: 0,
  lastSymbolicKeys: 0,
  snapshot() {
    const pressureBucket = bucketPressure(this.lastPressure);
    const loadBucket = bucketPressure(this.lastLoad);
    const activityScore = Math.max(
      0,
      Math.min(
        1,
        this.ticks > 0
          ? 1 - this.skips / Math.max(1, this.ticks + this.pulses)
          : 0
      )
    );
    const activityBucket = bucketLevel(activityScore);

    return Object.freeze({
      ticks: this.ticks,
      pulses: this.pulses,
      skips: this.skips,
      lastReason: this.lastReason,
      lastPressure: this.lastPressure,
      lastLoad: this.lastLoad,
      lastPrimaryState: this.lastPrimaryState,
      lastDadState: this.lastDadState,
      lastEarnState: this.lastEarnState,
      lastMode: this.lastMode,
      lastBinaryBits: this.lastBinaryBits,
      lastSymbolicKeys: this.lastSymbolicKeys,
      pressureBucket,
      loadBucket,
      activityScore,
      activityBucket
    });
  }
};

// Healing / diagnostics for AI heartbeat
const aiHeartbeatHealing = {
  ticks: 0,
  pulses: 0,
  skips: 0,
  lastReason: "none",
  lastError: null,
  lastExitReason: null,
  lastPacket: null,
  lastPrimaryState: "unknown",
  lastDadState: "unknown",
  lastEarnState: "unknown",
  lastIdleMs: 0,
  lastMomPulseSurface: null,
  lastEarnPulseSurface: null,
  lastRandomNudgeAt: 0,
  lastMode: "symbolic",
  lastTriHeartCompute: null,
  lastTriHeartComputeDelta: null,
  lastComputeSurface: null,
  lastComputeDeltaPacket: null
};

// ============================================================================
//  HEARTBEAT STATE HELPERS
// ============================================================================

// Mom (primary)
function isPrimaryHeartbeatInactive(now = PulseRealm.PulseNOW) {
  try {
    const last = globalThis[PRIMARY_HEARTBEAT_KEY] || 0;
    if (!last) return true;
    const delta = now - last;
    return delta > PRIMARY_MAX_SILENCE_MS;
  } catch {
    return true;
  }
}

function updatePrimaryStateFlag(now = PulseRealm.PulseNOW) {
  const inactive = isPrimaryHeartbeatInactive(now);
  const state = inactive ? "primary_inactive" : "primary_active";
  heartbeatArtery.lastPrimaryState = state;
  aiHeartbeatHealing.lastPrimaryState = state;
  return inactive;
}

// Dad (this AI heartbeat)
function isDadHeartbeatInactive(now = PulseRealm.PulseNOW) {
  try {
    const last = globalThis[AI_HEARTBEAT_KEY] || 0;
    if (!last) return true;
    const delta = now - last;
    return delta > AI_MAX_IDLE_MS;
  } catch {
    return true;
  }
}

function updateDadStateFlag(now = PulseRealm.PulseNOW) {
  const inactive = isDadHeartbeatInactive(now);
  const state = inactive ? "dad_inactive" : "dad_active";
  heartbeatArtery.lastDadState = state;
  aiHeartbeatHealing.lastDadState = state;
  return inactive;
}

// Earn (child heartbeat)
function isEarnHeartbeatInactive(now = PulseRealm.PulseNOW) {
  try {
    const last = globalThis[EARN_HEARTBEAT_KEY] || 0;
    if (!last) return true;
    const delta = now - last;
    return delta > EARN_MAX_SILENCE_MS;
  } catch {
    return true;
  }
}

function updateEarnStateFlag(now = PulseRealm.PulseNOW) {
  const inactive = isEarnHeartbeatInactive(now);
  const state = inactive ? "earn_inactive" : "earn_active";
  heartbeatArtery.lastEarnState = state;
  aiHeartbeatHealing.lastEarnState = state;
  return inactive;
}

// ============================================================================
//  PULSE SURFACES
// ============================================================================
function buildMomPulseSurface() {
  const last = globalThis[PRIMARY_HEARTBEAT_KEY] || 0;
  const alive = last > 0;
  return {
    momPulseAlive: alive,
    momPulseLastBeatAt: last,
    momPulseFallbackState: alive ? "available" : "silent"
  };
}

function buildEarnPulseSurface() {
  const last = globalThis[EARN_HEARTBEAT_KEY] || 0;
  const alive = last > 0;
  return {
    earnPulseAlive: alive,
    earnPulseLastBeatAt: last,
    earnPulseFallbackState: alive ? "available" : "silent"
  };
}

// ============================================================================
//  PREWARM — optional, dual‑band aware, chunk‑safe
// ============================================================================
export function prewarmAiHeartbeat(dualBand = null, { trace = false } = {}) {
  const snapshot = getOrganismSnapshot(dualBand);
  const binaryBits =
    typeof snapshot.binary.stream === "string"
      ? snapshot.binary.stream.length
      : 0;
  const symbolicKeys = snapshot.symbolic
    ? Object.keys(snapshot.symbolic).length
    : 0;

  heartbeatArtery.lastBinaryBits = binaryBits;
  heartbeatArtery.lastSymbolicKeys = symbolicKeys;

  const packet = emitHeartbeatPacket("prewarm", {
    message:
      "AI heartbeat prewarmed; tri‑heart liveness + dual‑band metrics aligned.",
    binaryBits,
    symbolicKeys
  });
  aiHeartbeatHealing.lastPacket = packet;
  if (trace) console.log("[AI_HEARTBEAT-v30] prewarm", packet);
  return packet;
}

// ============================================================================
//  BOOT — create dual‑band organism
// ============================================================================
function bootAiOrganism() {
  if (aiOrganism) return aiOrganism;

  const db = getDb();
  const fsAPI = getFsAPI();
  const routeAPI = getRouteAPI();
  const schemaAPI = getSchemaAPI();

  const request = { userId: null, personaId: null };

  aiOrganism = createBrainstem(request, db, fsAPI, routeAPI, schemaAPI);
  aiOrganism.console.log("[HEARTBEAT] Brainstem created (dual‑band).");

  lastRun = PulseRealm.PulseNOW;
  return aiOrganism;
}

// ============================================================================
//  DETERMINISTIC NUDGE — v30++ (no Math.random)
// ============================================================================
function deterministicNudgeChance(now) {
  // 0–99 → <3 means ~3% of ticks, but no RNG
  return (now % 100) < 3;
}

// ============================================================================
//  RANDOM NUDGE (v30 deterministic) — soft, last‑resort liveness push
// ============================================================================
function randomHeartbeatNudge(reason = "random") {
  const now = PulseRealm.PulseNOW;
  if (!deterministicNudgeChance(now)) {
    return null;
  }

  try {

      self[AI_HEARTBEAT_KEY] = now;
    
  } catch {}

  aiHeartbeatHealing.lastRandomNudgeAt = now;
  aiHeartbeatHealing.lastExitReason = "random_nudge";
  aiHeartbeatHealing.lastReason = `random_nudge:${reason}`;

  const momSurface = buildMomPulseSurface();
  const earnSurface = buildEarnPulseSurface();
  aiHeartbeatHealing.lastMomPulseSurface = momSurface;
  aiHeartbeatHealing.lastEarnPulseSurface = earnSurface;

  const packet = emitHeartbeatPacket("random-nudge", {
    reason,
    randomNudgeAt: now,
    primaryState: heartbeatArtery.lastPrimaryState,
    dadState: heartbeatArtery.lastDadState,
    earnState: heartbeatArtery.lastEarnState,
    momPulseSurface: momSurface,
    earnPulseSurface: earnSurface
  });
  aiHeartbeatHealing.lastPacket = packet;

  aiOrganism.console.log(
    `[HEARTBEAT] Random nudge fired. reason=${reason}, primary=${heartbeatArtery.lastPrimaryState}, dad=${heartbeatArtery.lastDadState}, earn=${heartbeatArtery.lastEarnState}`
  );

  return packet;
}

// ============================================================================
//  CORE — one heartbeat tick (A‑B‑A: liveness → safety → organs → liveness)
// ============================================================================
async function aiHeartbeatTick(reason = "unknown") {
  const now = PulseRealm.PulseNOW;
  const primaryInactive = updatePrimaryStateFlag(now);
  const dadInactive = updateDadStateFlag(now);
  const earnInactive = updateEarnStateFlag(now);

  const organism = bootAiOrganism();
  const { context, organs, dualBand } = organism;

  const snapshot = getOrganismSnapshot(dualBand);
  const binaryAgent = organs.binaryAgent;
  const binaryDelta = organs.binaryDelta;

  const binaryBits =
    typeof snapshot.binary.stream === "string"
      ? snapshot.binary.stream.length
      : 0;
  const symbolicKeys = snapshot.symbolic
    ? Object.keys(snapshot.symbolic).length
    : 0;

  heartbeatArtery.lastBinaryBits = binaryBits;
  heartbeatArtery.lastSymbolicKeys = symbolicKeys;

  if (binaryAgent && binaryDelta) {
    const prevSurface = aiHeartbeatHealing.lastComputeSurface || null;

    const { surface, deltaPacket } =
      binaryAgent.computeIntelligenceSnapshot(
        snapshot.binary.inputs || [],
        {
          gpuPressure: snapshot.binary.gpu.pressure ?? 0,
          gpuLoad: snapshot.binary.gpu.load ?? 0,
          gpuUtil: snapshot.binary.gpu.util ?? 0
        },
        prevSurface
      );

    aiHeartbeatHealing.lastComputeSurface = surface;
    aiHeartbeatHealing.lastComputeDeltaPacket = deltaPacket || null;
  }

  const momComputeSurface = {
    pressure: 0,
    load: 0,
    advantage: 0,
    speed: 0,
    pressureBucket: "none",
    loadBucket: "none",
    advantageBucket: "none",
    speedBucket: "none",
    gpuPressure: 0,
    gpuLoad: 0,
    gpuUtil: 0,
    present: heartbeatArtery.lastPrimaryState === "primary_active",
    capacity: 1,
    capacityBucket: "high",
    cortexId: "mom",
    triHeartId: "mom",
    epoch: HEARTBEAT_VERSION_MAP.version,
    band: "symbolic"
  };

  const earnComputeSurface = {
    pressure: 0,
    load: 0,
    advantage: 0,
    speed: 0,
    pressureBucket: "none",
    loadBucket: "none",
    advantageBucket: "none",
    speedBucket: "none",
    gpuPressure: 0,
    gpuLoad: 0,
    gpuUtil: 0,
    present: heartbeatArtery.lastEarnState === "earn_active",
    capacity: 1,
    capacityBucket: "high",
    cortexId: "earn",
    triHeartId: "earn",
    epoch: HEARTBEAT_VERSION_MAP.version,
    band: "symbolic"
  };

  if (binaryDelta) {
    const triPrev = aiHeartbeatHealing.lastTriHeartCompute || null;
    const triNext = {
      mom: momComputeSurface,
      dad: aiHeartbeatHealing.lastComputeSurface || null,
      earn: earnComputeSurface
    };

    const triDeltaPacket = binaryDelta.triHeartComputeDelta(triPrev, triNext);
    aiHeartbeatHealing.lastTriHeartComputeDelta = triDeltaPacket;
    aiHeartbeatHealing.lastTriHeartCompute = triNext;
  }

  const pressure = snapshot.binary.metabolic.pressure ?? 0;
  const load     = snapshot.binary.metabolic.load ?? 0;

  heartbeatArtery.lastReason = reason;
  heartbeatArtery.lastPressure = pressure;
  heartbeatArtery.lastLoad = load;

  // A — Safety envelope
  if (now - lastRun < AI_MIN_GAP_MS) {
    heartbeatArtery.skips++;
    aiHeartbeatHealing.skips++;
    heartbeatArtery.lastReason = `cooldown:${reason}`;
    aiHeartbeatHealing.lastReason = `cooldown:${reason}`;

    console.log(
      `[HEARTBEAT] Skipped (cooldown). reason=${reason}, delta=${now - lastRun}ms`
    );
    const packet = emitHeartbeatPacket("tick-skip", {
      reason: "cooldown",
      deltaMs: now - lastRun,
      pressure,
      load,
      primaryState: heartbeatArtery.lastPrimaryState,
      dadState: heartbeatArtery.lastDadState,
      earnState: heartbeatArtery.lastEarnState
    });
    aiHeartbeatHealing.lastPacket = packet;

    randomHeartbeatNudge("cooldown");
    return;
  }

  if (aiBusy) {
    heartbeatArtery.skips++;
    aiHeartbeatHealing.skips++;
    heartbeatArtery.lastReason = `busy:${reason}`;
    aiHeartbeatHealing.lastReason = `busy:${reason}`;

    console.log(`[HEARTBEAT] Skipped (busy). reason=${reason}`);
    const packet = emitHeartbeatPacket("tick-skip", {
      reason: "busy",
      pressure,
      load,
      primaryState: heartbeatArtery.lastPrimaryState,
      dadState: heartbeatArtery.lastDadState,
      earnState: heartbeatArtery.lastEarnState
    });
    aiHeartbeatHealing.lastPacket = packet;

    randomHeartbeatNudge("busy");
    return;
  }

  if (pressure >= 0.85) {
    heartbeatArtery.skips++;
    aiHeartbeatHealing.skips++;
    heartbeatArtery.lastReason = `pressure:${reason}`;
    aiHeartbeatHealing.lastReason = `pressure:${reason}`;

    console.log(
      `[HEARTBEAT] Skipped (binary pressure=${pressure}). reason=${reason}`
    );
    const packet = emitHeartbeatPacket("tick-skip", {
      reason: "pressure",
      pressure,
      load,
      primaryState: heartbeatArtery.lastPrimaryState,
      dadState: heartbeatArtery.lastDadState,
      earnState: heartbeatArtery.lastEarnState
    });
    aiHeartbeatHealing.lastPacket = packet;

    randomHeartbeatNudge("pressure");
    return;
  }

  // B — Commit tick
  aiBusy = true;
  lastRun = now;
  heartbeatArtery.ticks++;
  aiHeartbeatHealing.ticks++;

  try {
   
      self[AI_HEARTBEAT_KEY] = now;
    
  } catch {}

  const startPacket = emitHeartbeatPacket("tick-start", {
    reason,
    pressure,
    load,
    primaryState: heartbeatArtery.lastPrimaryState,
    dadState: heartbeatArtery.lastDadState,
    earnState: heartbeatArtery.lastEarnState
  });
  aiHeartbeatHealing.lastPacket = startPacket;

  console.log(
    `[HEARTBEAT] Tick start. reason=${reason}, pressure=${pressure}, load=${load}, primary=${heartbeatArtery.lastPrimaryState}, dad=${heartbeatArtery.lastDadState}, earn=${heartbeatArtery.lastEarnState}`
  );

  try {
    // A — Dual‑band organs
    if (organs.cortex.run)    await organs.cortex.run();
    if (organs.nervous.pulse) await organs.nervous.pulse();
    if (organs.router.scan)   await organs.router.scan();

    // B — Symbolic organs
    if (organs.evolution.run)    await organs.evolution.run();
    if (organs.environment.scan) await organs.environment.scan();
    if (organs.power.update)     await organs.power.update();

    console.log("[HEARTBEAT] Tick complete.");
    const completePacket = emitHeartbeatPacket("tick-complete", {
      reason,
      pressure,
      load,
      primaryState: heartbeatArtery.lastPrimaryState,
      dadState: heartbeatArtery.lastDadState,
      earnState: heartbeatArtery.lastEarnState
    });
    aiHeartbeatHealing.lastPacket = completePacket;
    aiHeartbeatHealing.lastExitReason = "ok";
  } catch (err) {
    console.error("[HEARTBEAT] Tick error:", err);
    console.log(`[HEARTBEAT] Error: ${err.message}`);

    const momPulseSurface = buildMomPulseSurface();
    const earnPulseSurface = buildEarnPulseSurface();
    aiHeartbeatHealing.lastMomPulseSurface = momPulseSurface;
    aiHeartbeatHealing.lastEarnPulseSurface = earnPulseSurface;

    if (momPulseSurface.momPulseAlive) {
      const fallbackPacket = emitHeartbeatPacket("tick-fallback-mom-pulse", {
        reason,
        momPulseFallback: true,
        momPulseLastBeatAt: momPulseSurface.momPulseLastBeatAt,
        primaryState: heartbeatArtery.lastPrimaryState,
        dadState: heartbeatArtery.lastDadState,
        earnState: heartbeatArtery.lastEarnState,
        earnPulseSurface
      });
      aiHeartbeatHealing.lastPacket = fallbackPacket;
      aiHeartbeatHealing.lastError = null;
      aiHeartbeatHealing.lastExitReason = "fallback_mom_pulse";
      return fallbackPacket;
    }

    if (earnPulseSurface.earnPulseAlive) {
      const fallbackPacket = emitHeartbeatPacket("tick-fallback-earn-pulse", {
        reason,
        earnPulseFallback: true,
        earnPulseLastBeatAt: earnPulseSurface.earnPulseLastBeatAt,
        primaryState: heartbeatArtery.lastPrimaryState,
        dadState: heartbeatArtery.lastDadState,
        earnState: heartbeatArtery.lastEarnState,
        momPulseSurface
      });
      aiHeartbeatHealing.lastPacket = fallbackPacket;
      aiHeartbeatHealing.lastError = null;
      aiHeartbeatHealing.lastExitReason = "fallback_earn_pulse";
      return fallbackPacket;
    }

    const errorPacket = emitHeartbeatPacket("tick-error", {
      reason,
      error: String(err),
      pressure,
      load,
      primaryState: heartbeatArtery.lastPrimaryState,
      dadState: heartbeatArtery.lastDadState,
      earnState: heartbeatArtery.lastEarnState,
      momPulseSurface,
      earnPulseSurface
    });
    aiHeartbeatHealing.lastPacket = errorPacket;
    aiHeartbeatHealing.lastError = { message: String(err), reason };
    aiHeartbeatHealing.lastExitReason = "error";

    randomHeartbeatNudge("tick-error");
  } finally {
    aiBusy = false;
  }

  return startPacket;
}

// ============================================================================
//  MODE RESOLUTION — symbolic / binary / both
// ============================================================================
function resolveHeartbeatMode(source) {
  if (source && typeof source === "object") {
    if (source.mode === "binary" || source.mode === "symbolic" || source.mode === "both") {
      return source.mode;
    }
    if (source.binary === true && source.symbolic === true) return "both";
    if (source.binary === true) return "binary";
    if (source.symbolic === true) return "symbolic";
  }

  if (typeof source === "string") {
    const s = source.toLowerCase();
    if (s.startsWith("binary:") || s === "binary") return "binary";
    if (s.startsWith("symbolic:") || s === "symbolic") return "symbolic";
    if (s === "both" || s === "dual") return "both";
  }

  return "symbolic";
}

function getCurrentHeartbeatMode() {
  return (
    aiHeartbeatHealing.lastMode ||
    heartbeatArtery.lastMode ||
    "symbolic"
  );
}

// ============================================================================
//  PULSE ENTRY — ANY internal signal triggers a heartbeat
// ============================================================================
export function pulseAiHeartbeat(source = "unknown") {
  const now = PulseRealm.PulseNOW;
  updatePrimaryStateFlag(now);
  updateDadStateFlag(now);
  updateEarnStateFlag(now);

  const mode = resolveHeartbeatMode(source);

  const organism = bootAiOrganism();
  organism.console.log(
    `[HEARTBEAT] Pulse detected from: ${
      typeof source === "string" ? source : source.label || "unknown"
    }, mode=${mode}, primary=${heartbeatArtery.lastPrimaryState}, dad=${heartbeatArtery.lastDadState}, earn=${heartbeatArtery.lastEarnState}`
  );

  heartbeatArtery.pulses++;
  aiHeartbeatHealing.pulses++;
  aiHeartbeatHealing.lastMode = mode;
  heartbeatArtery.lastMode = mode;

  const packet = emitHeartbeatPacket("pulse", {
    source,
    mode,
    isBinary: mode === "binary" || mode === "both",
    isSymbolic: mode === "symbolic" || mode === "both",
    primaryState: heartbeatArtery.lastPrimaryState,
    dadState: heartbeatArtery.lastDadState,
    earnState: heartbeatArtery.lastEarnState
  });
  aiHeartbeatHealing.lastPacket = packet;

  try {

      self[AI_HEARTBEAT_KEY] = now;
      PulseRealm.PulseAIHeartbeatMode = mode;
    
  } catch {}

  void aiHeartbeatTick(`pulse:${typeof source === "string" ? source : "object"}`);
  return packet;
}

// ============================================================================
//  TIME FALLBACK — fires only if idle too long (dad self‑fallback)
// ============================================================================
function timeFallbackCheck() {
  const now = PulseRealm.PulseNOW;
  updatePrimaryStateFlag(now);
  updateDadStateFlag(now);
  updateEarnStateFlag(now);

  const organism = bootAiOrganism();
  const { context, dualBand } = organism;

  const idleFor = now - lastRun;
  const snapshot = getOrganismSnapshot(dualBand);
  const pressure = snapshot.binary.metabolic.pressure ?? 0;

  heartbeatArtery.lastPressure = pressure;
  aiHeartbeatHealing.lastIdleMs = idleFor;

  const mode = getCurrentHeartbeatMode();
  heartbeatArtery.lastMode = mode;
  aiHeartbeatHealing.lastMode = mode;

  if (idleFor >= AI_MAX_IDLE_MS) {
    console.log(
      `[HEARTBEAT] Time fallback triggered (idle=${idleFor}ms, pressure=${pressure}, mode=${mode}, primary=${heartbeatArtery.lastPrimaryState}, dad=${heartbeatArtery.lastDadState}, earn=${heartbeatArtery.lastEarnState})`
    );
    const packet = emitHeartbeatPacket("time-fallback", {
      idleMs: idleFor,
      pressure,
      mode,
      primaryState: heartbeatArtery.lastPrimaryState,
      dadState: heartbeatArtery.lastDadState,
      earnState: heartbeatArtery.lastEarnState
    });
    aiHeartbeatHealing.lastPacket = packet;
    try {
    
        PulseRealm.PulseAIHeartbeatMode = mode;
      
    } catch {}
    void aiHeartbeatTick("time-fallback");
  } else {
    console.log(
      `[HEARTBEAT] Time fallback check: idle=${idleFor}ms (no tick), mode=${mode}, primary=${heartbeatArtery.lastPrimaryState}, dad=${heartbeatArtery.lastDadState}, earn=${heartbeatArtery.lastEarnState}`
    );
    const packet = emitHeartbeatPacket("time-check", {
      idleMs: idleFor,
      pressure,
      mode,
      primaryState: heartbeatArtery.lastPrimaryState,
      dadState: heartbeatArtery.lastDadState,
      earnState: heartbeatArtery.lastEarnState,
      suppressed: false
    });
    aiHeartbeatHealing.lastPacket = packet;

    randomHeartbeatNudge("time-check");
  }
}

// ============================================================================
//  START — enable time fallback (independent pacer mode)
// ============================================================================
export function startAiHeartbeat() {
  if (aiTimeFallbackTimer) return;

  const organism = bootAiOrganism();

  const mode = getCurrentHeartbeatMode();
  heartbeatArtery.lastMode = mode;
  aiHeartbeatHealing.lastMode = mode;

  aiTimeFallbackTimer = setInterval(() => {
    timeFallbackCheck();
  }, AI_TIME_CHECK_MS);

  organism.console.log(
    `[HEARTBEAT] Time fallback active; mode=${mode}, check=${AI_TIME_CHECK_MS}ms, maxIdle=${AI_MAX_IDLE_MS}ms, primaryKey=${PRIMARY_HEARTBEAT_KEY}, earnKey=${EARN_HEARTBEAT_KEY}`
  );

  const packet = emitHeartbeatPacket("start", {
    mode,
    checkMs: AI_TIME_CHECK_MS,
    maxIdleMs: AI_MAX_IDLE_MS,
    primaryKey: PRIMARY_HEARTBEAT_KEY,
    primaryMaxSilenceMs: PRIMARY_MAX_SILENCE_MS,
    earnKey: EARN_HEARTBEAT_KEY,
    earnMaxSilenceMs: EARN_MAX_SILENCE_MS
  });
  aiHeartbeatHealing.lastPacket = packet;

  try {
   
      PulseRealm.PulseAIHeartbeatMode = mode;
    
  } catch {}
}

// ============================================================================
//  STOP — disable fallback
// ============================================================================
export function stopAiHeartbeat() {
  if (!aiTimeFallbackTimer) return;
  clearInterval(aiTimeFallbackTimer);
  aiTimeFallbackTimer = null;

  const mode = getCurrentHeartbeatMode();

  aiOrganism.console.log(
    `[HEARTBEAT] Time fallback stopped. mode=${mode}`
  );
  const packet = emitHeartbeatPacket("stop", { mode });
  aiHeartbeatHealing.lastPacket = packet;
}

// ============================================================================
//  WINDOW‑SAFE ARTERY SNAPSHOT — now mode + dual‑band surfaced
// ============================================================================
export function snapshotAiHeartbeat() {
  const momPulseSurface = buildMomPulseSurface();
  const earnPulseSurface = buildEarnPulseSurface();
  aiHeartbeatHealing.lastMomPulseSurface = momPulseSurface;
  aiHeartbeatHealing.lastEarnPulseSurface = earnPulseSurface;

  const mode = getCurrentHeartbeatMode();
  heartbeatArtery.lastMode = mode;
  aiHeartbeatHealing.lastMode = mode;

  try {
    
      PulseRealm.PulseAIHeartbeatMode = mode;
    
  } catch {}

  return emitHeartbeatPacket("snapshot", {
    mode,
    artery: heartbeatArtery.snapshot(),
    healing: { ...aiHeartbeatHealing },
    momPulseSurface,
    earnPulseSurface
  });
}

// ============================================================================
//  HEALING + DIAGNOSTICS EXPORTS — mode surfaced
// ============================================================================
export function getAiHeartbeatHealingState() {
  return {
    ...aiHeartbeatHealing,
    lastMode: getCurrentHeartbeatMode()
  };
}

export function getAiHeartbeatDiagnostics() {
  const mode = getCurrentHeartbeatMode();
  return {
    artery: {
      ...heartbeatArtery.snapshot(),
      mode
    },
    healing: {
      ...aiHeartbeatHealing,
      lastMode: mode
    },
    primaryState: heartbeatArtery.lastPrimaryState,
    dadState: heartbeatArtery.lastDadState,
    earnState: heartbeatArtery.lastEarnState
  };
}

// ============================================================================
//  COMMONJS EXPORT (for Node environments)
// ============================================================================
PulseRealm.AiHeartbeat = {
    AI_HEARTBEAT_META,
    prewarmAiHeartbeat,
    pulseAiHeartbeat,
    startAiHeartbeat,
    stopAiHeartbeat,
    snapshotAiHeartbeat,
    getAiHeartbeatHealingState,
    getAiHeartbeatDiagnostics
}
