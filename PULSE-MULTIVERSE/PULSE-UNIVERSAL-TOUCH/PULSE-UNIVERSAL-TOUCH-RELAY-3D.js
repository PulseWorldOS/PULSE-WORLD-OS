// ============================================================================
// PULSE-MULTIVERSAL-TOUCH-RELAY-3D-v32-IMMORTAL++-INTEL
//  • 3D Internet Touch Organ + Presence/Advantage/Chunk surfaces
//  • PathPhysics + OutwardPulse + RelayBridge (v32 aligned)
//  • Continuance v32 + OneBand v32 + Binary v32 + Runtime v32 tolerant
//  • Same API, same behavior, fully deterministic except async I/O
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



function safe(fn, ...args) {
  try {
    if (typeof fn === "function") return fn(...args);
  } catch {}
  return undefined;
}

// ---------------------------------------------------------------------------
// Hash helpers — v32 IMMORTAL++
// ---------------------------------------------------------------------------
function computeHashClassic(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeHashIntel(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function dualSig(label, intelPayload, classicString) {
  return {
    intel: computeHashIntel({ label, intelPayload, classicString }),
    classic: computeHashClassic(`${label}::${classicString}`)
  };
}

// ---------------------------------------------------------------------------
// Presence / Advantage / Chunk for 3D routes — v32 aligned
// ---------------------------------------------------------------------------
function classifyPresenceTier_v32(pressure) {
  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

function build3DPresenceField_v32({ cosmosContext, presenceContext, advantageContext, cycleIndex }) {
  const meshStrength = Number(presenceContext.meshStrength || 0);
  const meshPressureExternal = Number(presenceContext.meshPressureIndex || 0);
  const castleLoadExternal = Number(presenceContext.castleLoadLevel || 0);

  const internalComposite =
    cycleIndex * 0.0001 +
    (advantageContext.baseScore || 0) * 0.01 +
    (advantageContext.routeCount || 0) * 0.001;

  const internalPressure = Math.floor(internalComposite * 1000);

  const meshPressureIndex = meshPressureExternal + internalPressure;
  const castleLoadLevel = castleLoadExternal;

  const pressure = meshPressureIndex + castleLoadLevel;
  const presenceTier = classifyPresenceTier_v32(pressure);

  const intelPayload = {
    kind: "touchRelay3DPresence",
    version: "v32-IMMORTAL++-INTEL",
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    meshStrength,
    cycleIndex,
    cosmos: cosmosContext
  };

  const classicString =
    `3D_PRESENCE::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`;

  const sig = dualSig("TOUCH_RELAY_3D_PRESENCE", intelPayload, classicString);

  return {
    presenceVersion: "v32-IMMORTAL++-INTEL",
    presenceTier,
    meshStrength,
    meshPressureIndex,
    castleLoadLevel,
    cosmosContext,
    presenceContext,
    advantageContext,
    cycleIndex,
    presenceSignatureIntel: sig.intel,
    presenceSignatureClassic: sig.classic
  };
}

function build3DAdvantageField_v32({ bestRoute, presenceField, routeCount }) {
  const hasRoute = !!bestRoute;
  const hopScore = hasRoute ? 1 : 0;
  const rttScore = bestRoute && typeof bestRoute.avgRttMs === "number"
    ? Math.max(0, 300 - bestRoute.avgRttMs) / 300
    : 0;

  const baseScore =
    hopScore * 0.02 +
    rttScore * 0.02 +
    (routeCount || 0) * 0.0005;

  const presenceBoost =
    presenceField.presenceTier === "critical" ? 0.02 :
    presenceField.presenceTier === "high" ? 0.015 :
    presenceField.presenceTier === "elevated" ? 0.01 :
    presenceField.presenceTier === "soft" ? 0.005 :
    0;

  const advantageScore = baseScore + presenceBoost;

  let advantageTier = 0;
  if (advantageScore >= 0.06) advantageTier = 3;
  else if (advantageScore >= 0.025) advantageTier = 2;
  else if (advantageScore > 0) advantageTier = 1;

  const intelPayload = {
    kind: "touchRelay3DAdvantage",
    version: "v32-IMMORTAL++",
    advantageScore,
    advantageTier,
    hasRoute,
    routeCount,
    presenceTier: presenceField.presenceTier
  };

  const classicString =
    `3D_ADVANTAGE::${presenceField.presenceTier}::${advantageTier}`;

  const sig = dualSig("TOUCH_RELAY_3D_ADVANTAGE", intelPayload, classicString);

  return {
    advantageVersion: "v32-IMMORTAL++",
    advantageScore,
    advantageTier,
    routeCount,
    hasRoute,
    advantageSignatureIntel: sig.intel,
    advantageSignatureClassic: sig.classic
  };
}

function build3DChunkPrewarmPlan_v32({ presenceField, advantageField }) {
  const basePriority =
    presenceField.presenceTier === "critical"
      ? 4
      : presenceField.presenceTier === "high"
      ? 3
      : presenceField.presenceTier === "elevated"
      ? 2
      : presenceField.presenceTier === "soft"
      ? 1
      : 0;

  const advantageBoost =
    advantageField.advantageTier >= 3 ? 2 :
    advantageField.advantageTier === 2 ? 1 :
    0;

  const priority = basePriority + advantageBoost;

  const intelPayload = {
    kind: "touchRelay3DChunkPlan",
    version: "v32-IMMORTAL++",
    priority,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier
  };

  const classicString =
    `3D_CHUNK_PLAN::${presenceField.presenceTier}::${priority}`;

  const sig = dualSig("TOUCH_RELAY_3D_CHUNK_PLAN", intelPayload, classicString);

  return {
    planVersion: "v32-IMMORTAL++",
    priority,
    band: presenceField.presenceTier,
    chunks: {
      pathPhysicsRoutes: true,
      outwardPulseTargets: true,
      relayBridgeEvents: true
    },
    cache: {
      hotRoutes: true,
      lastBestRoute: true,
      presenceField: true,
      advantageField: true
    },
    prewarm: {
      motionEngine: true,
      compass: true,
      gpu: true,
      db: true,
      relayNodes: true
    },
    chunkPlanSignatureIntel: sig.intel,
    chunkPlanSignatureClassic: sig.classic
  };
}

// ============================================================================
// PathPhysics — v32 tolerant (unchanged core)
// ============================================================================

function createPathPhysics3D_v32({ MemoryOrgan, trace = false } = {}) {
  const ROUTES_KEY = "pulse:v32:3d:pathPhysics:routes";

  function log(...args) {
    if (!trace || typeof console === "undefined") return;
    console.log("[PULSE-3D:PathPhysics-v32]", ...args);
  }

  function readRoutes() {
    const r = safe(MemoryOrgan.read, ROUTES_KEY);
    return Array.isArray(r) ? r : [];
  }

  function writeRoutes(routes) {
    safe(MemoryOrgan.write, ROUTES_KEY, Array.isArray(routes) ? routes : []);
  }

  function recordHopSample(sample) {
    const routes = readRoutes();
    routes.push({ ...sample, ts: PulseRealm.PulseNOW });
    if (routes.length > 2048) routes.splice(0, routes.length - 2048);
    writeRoutes(routes);
    log("hop sample recorded:", sample);
  }

  function pickBestRouteForClient({ clientId = null, isp = null, candidates = [] }) {
    const routes = readRoutes().filter(
      (r) => (clientId && r.clientId === clientId) || (isp && r.isp === isp)
    );
    if (!routes.length || !candidates.length) return null;

    let best = null;
    let bestScore = Infinity;

    for (const c of candidates) {
      const samples = routes.filter((r) => {
        if (c.edgeId && r.edgeId === c.edgeId) return true;
        if (c.satBeamId && r.satBeamId === c.satBeamId) return true;
        if (c.meshNodeId && r.meshNodeId === c.meshNodeId) return true;
        return false;
      });
      if (!samples.length) continue;
      const avg = samples.reduce((s, r) => s + (r.rttMs ?? 200), 0) / samples.length;
      if (avg < bestScore) {
        bestScore = avg;
        best = { ...c, avgRttMs: avg };
      }
    }

    return best;
  }

  return Object.freeze({
    recordHopSample,
    pickBestRouteForClient,
    getRoutes: () => readRoutes()
  });
}

// ============================================================================
// OutwardPulse — v32 tolerant
// ============================================================================

function createOutwardPulse3D_v32({
  trace = false,
  cosmosContext = {
    universeId: "u:default",
    timelineId: "t:main",
    branchId: "b:root",
    shardId: "s:primary"
  },
  presenceContext = {},
  advantageContext = {}
} = {}) {
  function log(...args) {
    if (!trace || typeof console === "undefined") return;
    console.log("[PULSE-3D:OutwardPulse-v32]", ...args);
  }

  async function pulseRelayTarget(target, meta = {}) {
    const payload = {
      target,
      meta,
      cosmos: cosmosContext,
      presence: presenceContext,
      advantage: advantageContext,
      ts: PulseRealm.PulseNOW
    };

    log("3D outward pulse → relay target:", payload);

    if (typeof fetch === "function" && target.warmUrl) {
      try {
        await fetch(target.warmUrl, {
          method: "HEAD",
          mode: "no-cors",
          cache: "no-store"
        });
      } catch {}
    }

    return payload;
  }

  return Object.freeze({
    pulseRelayTarget,
    pulseEdge: (edgeId, meta = {}) =>
      pulseRelayTarget({ kind: "edge", edgeId }, meta),
    pulseSatBeam: (satBeamId, meta = {}) =>
      pulseRelayTarget({ kind: "sat_beam", satBeamId }, meta),
    pulseMeshNode: (meshNodeId, meta = {}) =>
      pulseRelayTarget({ kind: "mesh_node", meshNodeId }, meta)
  });
}

// ============================================================================
// RelayBridge — v32 tolerant
// ============================================================================

function createRelayBridge3D_v32({
  Relay,
  PathPhysics3D,
  OutwardPulse3D,
  trace = false
} = {}) {
  function log(...args) {
    if (!trace || typeof console === "undefined") return;
    console.log("[PULSE-3D:RelayBridge-v32]", ...args);
  }

  function onRelaySensed(kind, meta = {}) {
    const hopSample = {
      clientId: meta.clientId || null,
      edgeId: meta.edgeId || meta.edge || null,
      isp: meta.isp || null,
      rttMs: meta.rttMs ?? null,
      routeHint: meta.routeHint || null,
      satBeamId: meta.satBeamId || null,
      meshNodeId: meta.meshNodeId || null,
      source: meta.source || kind
    };

    PathPhysics3D.recordHopSample(hopSample);

    if (hopSample.edgeId) OutwardPulse3D.pulseEdge(hopSample.edgeId, { source: "relay_sensed", kind });
    if (hopSample.satBeamId) OutwardPulse3D.pulseSatBeam(hopSample.satBeamId, { source: "relay_sensed", kind });
    if (hopSample.meshNodeId) OutwardPulse3D.pulseMeshNode(hopSample.meshNodeId, { source: "relay_sensed", kind });

    log("relay sensed → 3D bridge:", { kind, meta, hopSample });
  }

  if (Relay && typeof Relay.senseRelay === "function") {
    const original = Relay.senseRelay.bind(Relay);
    Relay.senseRelay = (kind, meta = {}) => {
      onRelaySensed(kind, meta);
      return original(kind, meta);
    };
  }

  return Object.freeze({ onRelaySensed });
}

// ============================================================================
// MAIN ORGAN — v32 IMMORTAL++
// ============================================================================

export function createPulseWorldTouchRelay3D_v32({
  Motion,
  MemoryOrgan,
  BrainOrgan,
  PulseDB,
  Reporter,
  Relay,

  sessionId = null,
  trace = false,
  cosmosContext = {
    universeId: "u:default",
    timelineId: "t:main",
    branchId: "b:root",
    shardId: "s:primary"
  },
  presenceContext = {},
  advantageContext = {}
} = {}) {
  if (!MemoryOrgan) throw new Error("[Relay3D-v32] MemoryOrgan is required.");
  if (!Motion) throw new Error("[Relay3D-v32] Motion (Compass/Engine) is required.");

  const ROLE = Object.freeze({
    identity: "PULSE-MULTIVERSAL-TOUCH-RELAY-3D-v32-IMMORTAL++-INTEL",
    layer: "organ",
    type: "3d_touch_relay",
    schemaVersion: "v32",
    version: "32.1-IMMORTAL++-INTEL"
  });

  function log(...args) {
    if (!trace || typeof console === "undefined") return;
    console.log("[Relay3D-v32]", ...args);
  }

  let cycleIndex = 0;

  const PathPhysics3D = createPathPhysics3D_v32({ MemoryOrgan, trace });
  const OutwardPulse3D = createOutwardPulse3D_v32({
    trace,
    cosmosContext,
    presenceContext,
    advantageContext
  });
  const RelayBridge3D = createRelayBridge3D_v32({
    Relay,
    PathPhysics3D,
    OutwardPulse3D,
    trace
  });

  async function on3DTouch(meta = {}) {
    cycleIndex += 1;
    log("3D Touch fired:", { meta, cycleIndex });

    try {
      await safe(Motion.prewarm.bind(Motion));
      const res = await safe(Motion.tick.bind(Motion));
      if (Reporter.recordTick && res.metrics) {
        await Reporter.recordTick(res);
      }
    } catch (err) {
      log("Motion prewarm/tick failed:", err);
    }

    const bestRoute = PathPhysics3D.pickBestRouteForClient({
      clientId: meta.clientId || null,
      isp: meta.isp || null,
      candidates: meta.routeCandidates || []
    });

    const routes = PathPhysics3D.getRoutes();
    const routeCount = routes.length;

    const presenceField = build3DPresenceField_v32({
      cosmosContext,
      presenceContext,
      advantageContext: { ...advantageContext, routeCount },
      cycleIndex
    });

    const advantageField = build3DAdvantageField_v32({
      bestRoute,
      presenceField,
      routeCount
    });

    const chunkPlan = build3DChunkPrewarmPlan_v32({
      presenceField,
      advantageField
    });

    const sig = dualSig(
      "TOUCH_RELAY_3D_TOUCH",
      {
        cycleIndex,
        sessionId,
        hasRoute: !!bestRoute,
        routeCount
      },
      `3D_TOUCH::${sessionId || "anon"}::${cycleIndex}::ROUTES::${routeCount}`
    );

    if (bestRoute) {
      await OutwardPulse3D.pulseRelayTarget(bestRoute, {
        source: "3d_touch",
        meta,
        cycleIndex
      });
    }

    if (BrainOrgan.evolve) {
      try {
        await BrainOrgan.evolve({
          type: "route:3d:optimize",
          payload: {
            bestRoute,
            meta,
            cosmos: cosmosContext,
            presence: presenceContext,
            advantage: advantageContext,
            sessionId,
            cycleIndex
          }
        });
      } catch (err) {
        log("BrainOrgan.evolve failed:", err);
      }
    }

        if (PulseDB.append) {
      try {
        await PulseDB.append("pulse:v32:3d:Touch_Events", {
          type: "3d_touch",
          meta,
          bestRoute,
          sessionId: sessionId || null,
          cosmos: cosmosContext,
          presenceField,
          advantageField,
          chunkPlan,
          schemaVersion: "v32",
          version: ROLE.version,
          signatureClassic: sig.classic,
          signatureIntel: sig.intel,
          timestamp: PulseRealm.PulseNOW
        });
      } catch {
        // never throw — DB logging is best‑effort only
      }
    }

    // FINAL RETURN SURFACE — IMMORTAL++ v32
    return {
      ok: true,
      bestRoute,
      cycleIndex,
      signatureClassic: sig.classic,
      signatureIntel: sig.intel,
      presenceField,
      advantageField,
      chunkPlan
    };
  }

  function getPathRoutes() {
    return PathPhysics3D.getRoutes();
  }

  // PUBLIC API — IMMORTAL++ ORGAN SURFACE
  return Object.freeze({
    role: ROLE,
    sessionId,
    cosmosContext,
    presenceContext,
    advantageContext,

    on3DTouch,

    PathPhysics3D,
    OutwardPulse3D,
    RelayBridge3D,

    pulseRelayTarget: OutwardPulse3D.pulseRelayTarget,
    pulseEdge: OutwardPulse3D.pulseEdge,
    pulseSatBeam: OutwardPulse3D.pulseSatBeam,
    pulseMeshNode: OutwardPulse3D.pulseMeshNode,

    getPathRoutes
  });
}

PulseRealm.TouchRelay3D = {
  createPulseWorldTouchRelay3D_v32
}

PulseRealm.PulseTouchRelay3D = createPulseWorldTouchRelay3D_v32;