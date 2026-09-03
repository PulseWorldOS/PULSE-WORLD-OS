// ============================================================================
//  PULSE OS v30‑IMMORTAL-ONE-BAND-CIVILIZATION — PULSE CASTLE (PRESENCE / HOST)
//  PulseCastle-v30-Immortal-OneBand-Civilization.js
// ============================================================================
//
//  ROLE (v30++ ONE-BAND CIVILIZATION):
//    - Primary presence + host organ for all PulseServer instances.
//    - Every castle is a ONE-BAND node: any band ⇒ PulseBand ⇒ our mesh.
//    - Region identity + region security authority for the organism.
//    - Civilization-tier + town-type + cost-band aware per castle.
//    - Maintains castle identity, region physics, region tier, and region load.
//    - Manages castles (region/host nodes) and their attached servers.
//    - Manages user bindings + world cores per castle (user‑aware).
//    - Maintains awareness of other castles (mesh awareness, world-mesh aware).
//    - Maintains treasury, soldier, morale, and governance pressure.
//    - Maintains symbolic expansion routes + NodeAdmin loops to servers.
//    - Maintains artery metrics per castle (v30++ per‑castle arteries).
//    - Integrates with Mesh, BeaconMesh, BeaconPresence, Touch, Net, Runtime,
//      Scheduler, Overmind, Earn, Proxy, BinaryMesh, DualBand Organism.
//    - ONE-BAND: presence is an action; band is unified symbolic signal.
//    - Pure symbolic registry + mapping. No compute math, no routing, no AI.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import { PulseVitalsLogger as logger, PulseVitalsMonitor, pulseLog, PulseUIFlow as initUIFlow, db, setdoc, getdoc, doc, log, warn, error} from "../../../../../_PROOF/PULSE-PROOF.js";
import { PulseExpansionMeta, PulseExpansion, getPulseExpansionContext} from "./PULSE-EXPANSION-WORLD.js";
import { PulseServerMeta, createPulseServer} from "./PULSE-EXPANSION-SERVER.js";
import { PulseUserExMeta as PulseUserMeta,  createPulseUser} from "./PULSE-EXPANSION-USER.js";
import { PulseMeshMeta} from "../PULSE-MESH/PULSE-MESH.js";
import { BinaryMeshMeta2 as BinaryMeshMeta} from "../PULSE-MESH/PULSE-MESH-BINARY.js";
import { PulseBeaconEngine} from "./PULSE-EXPANSION-BEACON-ENGINE.js";
import { PulseBeaconMesh, PulseBeaconMeshMeta} from "./PULSE-EXPANSION-BEACON-MESH.js";
import { BeaconPresenceMeta} from "./PULSE-EXPANSION-BEACON-PRESENCE.js";
import { getPulseRuntimeContext } from "../X-PULSE-X/PULSE-WORLD-RUNTIME.js";
import { getPulseSchedulerContextV33 as getPulseSchedulerContext } from "../X-PULSE-X/PULSE-WORLD-SCHEDULER.js";
import { getPulseOvermindContext } from "../X-PULSE-X/PULSE-WORLD-ALDWYN.js";
import { createPulseEarnSendSystem_v31 } from "../PULSE-EARN/PULSES/PulseEarnSendSystem-v31.js";
import { createBinarySendV30 as PulseSendBin } from "../PULSE-SEND/PulseSendBinary-v30.js";
import { getProxyContext, getProxyPressure, getProxyBoost, getProxyFallback, getProxyMode, getProxyLineage} from "../Pulse-Coordinator/PulseProxyContext-v30.js";
import { createPulseNodeEvolutionV30 } from "../PULSE-TOOLS/AI/PulseToolsNodeEvolution-v30.js";
import { createBinaryWavePulse } from "../PULSE-BAND/PULSE-BAND-BINARY-WAVE.js";

// Touch is client‑only. Expansion organs must not import it.
// Provide a safe, inert server-side context instead.




function getPulseTouchContext() {
  return {
    band: "PulseBand",
    deviceId: null,
    route: "server",
    ts: PulseRealm.PulseNOW,
    server: true
  };
}


export const PulseCastleMeta = Object.freeze({
  organId: "PulseCastle-v30-Immortal-OneBand-Civilization",
  role: "PULSE_CASTLE_HOST",
  version: "v30-Immortal-OneBand-Civilization",
  layer: "Castle",
  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroDynamicImports: true,
    zeroEval: true,
    meshAware: true,
    worldMeshAware: true,
    presenceAware: true,
    advantageAware: true,
    costAware: true,
    civilizationAware: true,
    oneBandUnified: true
  })
});

const _castleEvolution = createPulseNodeEvolutionV30({
  nodeType: "castle",
  trace: false
});

// ============================================================================
//  TYPES
// ============================================================================
export const CastleRegistrationResult = ({
  castleId,
  regionId,
  hostName,
  presenceField,
  meta = {}
} = {}) => {
  const state = {
    castleId,
    regionId,
    hostName,
    presenceField,
    meta
  };

  return {
    state,
    describe: () => ({ ...state })
  };
};

export const CastlePresenceState = ({
  castlesById,
  meshLinksByCastleId,
  meta = {}
} = {}) => {
  const state = {
    castlesById,
    meshLinksByCastleId,
    meta
  };

  return {
    state,
    describe: () => ({ ...state })
  };
};

export const ServerAttachResult = ({
  castleId,
  serverId,
  serverMeta,
  attached,
  meta = {}
} = {}) => {
  const state = {
    castleId,
    serverId,
    serverMeta,
    attached,
    meta
  };

  return {
    state,
    describe: () => ({ ...state })
  };
};

export const ServerDetachResult = ({
  castleId,
  serverId,
  detached,
  meta = {}
} = {}) => {
  const state = {
    castleId,
    serverId,
    detached,
    meta
  };

  return {
    state,
    describe: () => ({ ...state })
  };
};

export const CastleMeshState = ({
  castlesByCastleId,
  meshLinksByCastleId,
  meta = {}
} = {}) => {
  const state = {
    castlesById: castlesByCastleId,
    meshLinksByCastleId,
    meta
  };

  return {
    state,
    describe: () => ({ ...state })
  };
};

export const CastleUserRegistrationResult = ({
  castleId,
  userId,
  regionId,
  hostName,
  userMeta,
  worldCoreSnapshot,
  boundServers = [],
  meta = {}
} = {}) => {
  const state = {
    castleId,
    userId,
    regionId,
    hostName,
    userMeta,
    worldCoreSnapshot,
    boundServers,
    meta
  };

  return {
    state,
    describe: () => ({ ...state })
  };
};

export const CastleUserBindingState = ({
  castleId,
  usersById,
  bindingsByServerId,
  meta = {}
} = {}) => {
  const state = {
    castleId,
    usersById,
    bindingsByServerId,
    meta
  };

  return {
    state,
    describe: () => ({ ...state })
  };
};

export const CastleExpansionRouteState = ({
  routesById,
  meta = {}
} = {}) => {
  const state = {
    routesById,
    meta
  };

  return {
    state,
    describe: () => ({ ...state })
  };
};

export const CastleNodeAdminLoopState = ({
  loopsById,
  meta = {}
} = {}) => {
  const state = {
    loopsById,
    meta
  };

  return {
    state,
    describe: () => ({ ...state })
  };
};


// ============================================================================
//  INTERNAL STATE (symbolic, deterministic)
// ============================================================================
const castlesById = Object.create(null);
const meshLinksByCastleId = Object.create(null);

const usersById = Object.create(null);
const userBindingsByServerId = Object.create(null);

const expansionRoutesById = Object.create(null);
const nodeAdminLoopsById = Object.create(null);

const castleArteriesById = Object.create(null);

// ============================================================================
//  HELPERS + ORGANISM CONTEXT
// ============================================================================
function createCastleArtery(castleId) {
  const artery = {
    castleId,
    ticks: 0,
    presenceUpdates: 0,
    serversAttached: 0,
    serversDetached: 0,
    usersRegistered: 0,
    routesRegistered: 0,
    loopsSpawned: 0,
    meshLinks: 0,
    treasuryDelta: 0,
    prewarms: 0,
    lastPresenceScore: 0,
    lastLoadIndex: 0,
    lastStressIndex: 0,
    lastCivilizationTier: "void",
    lastTownType: "wilderness",
    lastCostBand: "unknown",
    snapshot() {
      return Object.freeze({
        castleId: artery.castleId,
        ticks: artery.ticks,
        presenceUpdates: artery.presenceUpdates,
        serversAttached: artery.serversAttached,
        serversDetached: artery.serversDetached,
        usersRegistered: artery.usersRegistered,
        routesRegistered: artery.routesRegistered,
        loopsSpawned: artery.loopsSpawned,
        meshLinks: artery.meshLinks,
        treasuryDelta: artery.treasuryDelta,
        prewarms: artery.prewarms,
        lastPresenceScore: artery.lastPresenceScore,
        lastLoadIndex: artery.lastLoadIndex,
        lastStressIndex: artery.lastStressIndex,
        lastCivilizationTier: artery.lastCivilizationTier,
        lastTownType: artery.lastTownType,
        lastCostBand: artery.lastCostBand
      });
    }
  };
  return artery;
}

function stableHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 1000000007;
  }
  return `c${h}`;
}

function clamp01(x) {
  if (x == null || Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

export function buildOrganismContext(extra = {}) {
  const expansion = getPulseExpansionContext() || {};
  const touch = getPulseTouchContext() || {};
  const runtime = getPulseRuntimeContext() || {};
  const scheduler = getPulseSchedulerContext() || {};
  const overmind = getPulseOvermindContext() || {};
  const earn = PulseRealm.PulseEarnContext() || {};

  const proxy = getProxyContext() || {};
  const proxyPressure = getProxyPressure() ?? 0;
  const proxyBoost = getProxyBoost() ?? 0;
  const proxyFallback = getProxyFallback() ?? false;
  const proxyMode = getProxyMode() || "normal";
  const proxyLineage = getProxyLineage() || null;

  return {
    expansion,
    touch,
    runtime,
    scheduler,
    overmind,
    earn,
    meshMeta: PulseMeshMeta,
    beaconMeshMeta: PulseBeaconMeshMeta,
    binaryMeshMeta: BinaryMeshMeta,
    beaconPresenceMeta: BeaconPresenceMeta,
    proxy,
    proxyPressure,
    proxyBoost,
    proxyFallback,
    proxyMode,
    proxyLineage,
    ...extra
  };
}

// ============================================================================
// CONTEXT — PulseCastleContext v31 IMMORTAL ONEBAND
// ============================================================================
export function getPulseCastleContext(extra = {}) {
  // ------------------------------------------------------------
  // BASE ORGANISM CONTEXT (canonical)
  // ------------------------------------------------------------
  const base = buildOrganismContext();

  // ------------------------------------------------------------
  // CASTLE META (STATIC)
  // ------------------------------------------------------------
  const castleMeta = {
    version: "v31-IMMORTAL-CASTLE-ONEBAND",
    meshMeta: PulseMeshMeta || null,
    beaconMeshMeta:PulseBeaconMeshMeta
        || null,
    binaryMeshMeta:BinaryMeshMeta
        || null,
    beaconPresenceMeta:BeaconPresenceMeta
        || null
  };

  // ------------------------------------------------------------
  // FINAL CONTEXT OBJECT (same shape, same order)
  // ------------------------------------------------------------
  return {
    ok: true,
    version: "v31-IMMORTAL-CASTLE-ONEBAND",

    // Organ surfaces (exact same fields, same order)
    expansion: base.expansion,
    touch: base.touch,
    runtime: base.runtime,
    scheduler: base.scheduler,
    overmind: base.overmind,
    earn: base.earn,

    // Castle meta surfaces
    castleMeta,

    // Proxy surfaces (same order, same names)
    proxy: base.proxy,
    proxyPressure: base.proxyPressure,
    proxyBoost: base.proxyBoost,
    proxyFallback: base.proxyFallback,
    proxyMode: base.proxyMode,
    proxyLineage: base.proxyLineage,

    // Extra injection
    ...extra
  };
}


function buildCastleId({ regionId, hostName }) {
  return stableHash(`CASTLE::${regionId}::${hostName}`);
}

function buildUserId({ regionId, hostName, userKey }) {
  return stableHash(`USER::${regionId}::${hostName}::${userKey || "default"}`);
}

function buildRouteId({ fromCastleId, toServerId, toServerUrl, hops }) {
  return stableHash(
    `ROUTE::${fromCastleId}::${toServerId || ""}::${toServerUrl || ""}::${JSON.stringify(
      hops || []
    )}`
  );
}

function buildLoopId({ routeId, originCastleId }) {
  return stableHash(`LOOP::${routeId}::${originCastleId}`);
}

// ============================================================================
//  ONE-BAND CIVILIZATION PRESENCE COMPUTE
// ============================================================================

function computeUnifiedBand() {
  // Any band ⇒ PulseBand ⇒ unified symbolic band
  return "pulseband-unified";
}

export function computeCastlePresence(castle) {
  const serverCount = Object.keys(castle.serversById || {}).length;
  const soldierCount = Object.keys(castle.soldiersById || {}).length;
  const capacityHint = castle.presenceField.capacityHint ?? 1;

  const rawLoad =
    (serverCount + soldierCount * 0.5) / Math.max(1, capacityHint * 4);
  let loadIndex = clamp01(rawLoad);

  const proxyPressure = getProxyPressure() ?? 0;
  loadIndex = clamp01(loadIndex + proxyPressure * 0.1);

  let stressIndex = clamp01(
    loadIndex >= 0.8 ? 0.9 :
    loadIndex >= 0.6 ? 0.7 :
    loadIndex >= 0.3 ? 0.4 :
    0.1
  );

  if (getProxyFallback()) {
    stressIndex = clamp01(stressIndex + 0.15);
  }

  let presenceScore = clamp01(
    loadIndex * 0.6 +
      (1 - Math.abs(0.5 - loadIndex) * 2) * 0.4
  );

  const proxyBoost = getProxyBoost() ?? 0;
  presenceScore = clamp01(presenceScore + proxyBoost * 0.05);

  let tier = castle.presenceField.tier || "normal";
  if (presenceScore >= 0.7) tier = "high";
  else if (presenceScore >= 0.4) tier = "normal";
  else tier = "low";

  // Binary waveform injection
  let binaryWave = null;
  try {
    binaryWave = castle.binaryPulse.nextPulse();
  } catch {}

  if (binaryWave.presencePulse.presenceBandState) {
    presenceScore = clamp01(presenceScore + 0.05);
  }

  if (binaryWave.harmonicsPulse.harmonicDrift) {
    stressIndex = clamp01(stressIndex - 0.03);
  }

  if (binaryWave.coherencePulse.coherenceScore) {
    presenceScore = clamp01(presenceScore + 0.02);
  }

  const unifiedBand = computeUnifiedBand();

  return {
    loadIndex,
    stressIndex,
    presenceScore,
    tier,
    unifiedBand,
    proxyPressure,
    proxyBoost,
    proxyFallback: !!getProxyFallback(),
    proxyMode: getProxyMode() || "normal"
  };
}

export function summarizeCastlePresence(castles = castlesById) {
  const byRegion = {};
  const meshSnapshot = {};

  for (const castleId in castles) {
    const castle = castles[castleId];
    const region = castle.regionId || "unknown-region";

    const presenceMetrics = computeCastlePresence(castle);
    const presenceField = {
      ...(castle.presenceField || {}),
      ...presenceMetrics
    };

    if (!byRegion[region]) {
      byRegion[region] = {
        castles: [],
        totalLoad: 0,
        avgLoad: 0,
        count: 0
      };
    }

    byRegion[region].castles.push({
      castleId,
      regionId: castle.regionId,
      hostName: castle.hostName,
      presenceField
    });

    byRegion[region].totalLoad += presenceMetrics.loadIndex;
    byRegion[region].count++;
  }

  for (const region in byRegion) {
    const r = byRegion[region];
    r.avgLoad = r.count > 0 ? r.totalLoad / r.count : 0;
  }

  for (const [id, set] of Object.entries(meshLinksByCastleId)) {
    meshSnapshot[id] = new Set(set);
  }

  return {
    byRegion,
    meshLinksByCastleId: meshSnapshot
  };
}

function ensureCastle(castleId, regionId, hostName, presenceField) {
  if (!castlesById[castleId]) {
    castlesById[castleId] = {
      castleId,
      regionId,
      hostName,
      presenceField: {
        regionId,
        hostName,
        tier: "normal",
        capacityHint: 1,
        tags: [],
        loadIndex: 0,
        stressIndex: 0,
        presenceScore: 0,
        unifiedBand: computeUnifiedBand(),
        civilizationTier: "void",
        townType: "wilderness",
        costBand: "unknown",
        ...(presenceField || {})
      },
      serversById: Object.create(null),
      soldiersById: Object.create(null),
      treasury: {
        balance: 0,
        lastDelta: 0,
        proxyPressure: 0,
        proxyBoost: 0
      },
      binaryPulse: createBinaryWavePulse({
        spins: 10,
        regionId,
        hostName,
        bluetoothContext: getPulseTouchContext().bluetooth || null
      })
    };

    castleArteriesById[castleId] = createCastleArtery(castleId);
  } else if (presenceField) {
    castlesById[castleId].presenceField = {
      ...castlesById[castleId].presenceField,
      ...presenceField
    };
  }

  if (!meshLinksByCastleId[castleId]) {
    meshLinksByCastleId[castleId] = new Set();
  }

  const metrics = computeCastlePresence(castlesById[castleId]);
  castlesById[castleId].presenceField = {
    ...castlesById[castleId].presenceField,
    ...metrics
  };

  const artery = castleArteriesById[castleId] || createCastleArtery(castleId);
  artery.lastPresenceScore = metrics.presenceScore;
  artery.lastLoadIndex = metrics.loadIndex;
  artery.lastStressIndex = metrics.stressIndex;
  artery.meshLinks = meshLinksByCastleId[castleId].size;

  castlesById[castleId].treasury.proxyPressure = getProxyPressure() ?? 0;
  castlesById[castleId].treasury.proxyBoost = getProxyBoost() ?? 0;

  return castlesById[castleId];
}

function linkCastles(aId, bId) {
  if (!meshLinksByCastleId[aId]) meshLinksByCastleId[aId] = new Set();
  if (!meshLinksByCastleId[bId]) meshLinksByCastleId[bId] = new Set();
  if (aId === bId) return;
  meshLinksByCastleId[aId].add(bId);
  meshLinksByCastleId[bId].add(aId);
}

function ensureUser({
  castleId,
  regionId,
  hostName,
  userId,
  userKey,
  worldCoreConfig = {}
}) {
  const effectiveUserId =
    userId || buildUserId({ regionId, hostName, userKey });

  if (!usersById[effectiveUserId]) {
    const worldCore =
      typeof createPulseWorldCore === "function"
        ? createPulseUser({
            regionID: regionId,
            serverMode: true,
            ...worldCoreConfig
          })
        : null;

    const worldCoreSnapshot = worldCore.getSnapshot() || null;

    usersById[effectiveUserId] = {
      userId: effectiveUserId,
      castleId,
      regionId,
      hostName,
      userMeta: PulseUserMeta,
      worldCore,
      worldCoreSnapshot,
      servers: new Set()
    };

    logger.log("castle", "register_user", {
      castleId,
      userId: effectiveUserId,
      regionId,
      hostName
    });
  }

  return usersById[effectiveUserId];
}

function computePeopleNeedsForCastle(castle) {
  const presence = castle.presenceField || {};
  const stress = presence.stressIndex ?? 0;
  const load = presence.loadIndex ?? 0;
  const morale = castle.moraleIndex ?? 0;
  const population = castle.population || 0;

  const needScore = morale * 0.4 + stress * 0.4 + load * 0.2;

  return {
    population,
    morale,
    stress,
    load,
    needScore,
    governanceStabilityIndex: 1 - (needScore * 0.5 + stress * 0.5)
  };
}

function bindServerToUserInternal({ castleId, serverId, userId }) {
  const user = usersById[userId];
  const castle = castlesById[castleId];
  if (!user || !castle) {
    return { ok: false, reason: "castle_or_user_not_found" };
  }

  user.servers.add(serverId);
  userBindingsByServerId[serverId] = userId;

  logger.log("castle", "bind_server_user", {
    castleId,
    serverId,
    userId
  });

  return { ok: true };
}

function snapshotMesh() {
  const castlesSnapshot = {};
  for (const [id, c] of Object.entries(castlesById)) {
    castlesSnapshot[id] = {
      castleId: c.castleId,
      regionId: c.regionId,
      hostName: c.hostName,
      presenceField: c.presenceField,
      servers: Object.keys(c.serversById),
      soldiers: Object.keys(c.soldiersById || {}),
      binaryWave: castlesById[id].binaryPulse.nextPulseEcho() || null,
      treasury: {
        balance: c.treasury.balance,
        lastDelta: c.treasury.lastDelta,
        proxyPressure: c.treasury.proxyPressure,
        proxyBoost: c.treasury.proxyBoost
      }
    };
  }

  const meshSnapshot = {};
  for (const [id, set] of Object.entries(meshLinksByCastleId)) {
    meshSnapshot[id] = Array.from(set);
  }

  return { castlesSnapshot, meshSnapshot };
}

function snapshotUsersForCastle(castleId) {
  const users = {};
  const bindings = {};

  for (const [uid, u] of Object.entries(usersById)) {
    if (u.castleId !== castleId) continue;
    users[uid] = {
      userId: u.userId,
      regionId: u.regionId,
      hostName: u.hostName,
      userMeta: u.userMeta,
      worldCoreSnapshot: u.worldCoreSnapshot,
      servers: Array.from(u.servers)
    };
  }

  for (const [serverId, userId] of Object.entries(userBindingsByServerId)) {
    const u = usersById[userId];
    if (!u || u.castleId !== castleId) continue;
    bindings[serverId] = userId;
  }

  return { users, bindings };
}

// ---------------------------------------------------------------------------
// Expansion routes + NodeAdmin loops (symbolic only)
// ---------------------------------------------------------------------------
function registerExpansionRouteInternal({
  fromCastleId,
  toServerId = null,
  toServerUrl = null,
  hops = [],
  loopHint = {}
}) {
  if (!fromCastleId) {
    return { ok: false, reason: "missing_fromCastleId" };
  }

  const routeId = buildRouteId({ fromCastleId, toServerId, toServerUrl, hops });

  expansionRoutesById[routeId] = {
    routeId,
    fromCastleId,
    toServerId,
    toServerUrl,
    hops: Array.from(hops || []),
    loopHint: {
      intervalHint: loopHint.intervalHint || "steady",
      pressureHint: loopHint.pressureHint || "normal"
    },
    tags: loopHint.tags || [],
    proxyMode: getProxyMode() || "normal",
    proxyPressure: getProxyPressure() ?? 0
  };

  logger.log("castle", "register_expansion_route", {
    routeId,
    fromCastleId,
    toServerId,
    toServerUrl,
    hops: expansionRoutesById[routeId].hops,
    loopHint: expansionRoutesById[routeId].loopHint,
    proxyMode: expansionRoutesById[routeId].proxyMode,
    proxyPressure: expansionRoutesById[routeId].proxyPressure
  });

  return { ok: true, routeId };
}

function spawnNodeAdminLoopInternal({
  routeId,
  originCastleId,
  intervalHint = "steady",
  pressureHint = "normal"
}) {
  const route = expansionRoutesById[routeId];
  if (!route) {
    return { ok: false, reason: "route_not_found" };
  }

  const loopId = buildLoopId({
    routeId,
    originCastleId: originCastleId || route.fromCastleId
  });

  nodeAdminLoopsById[loopId] = {
    loopId,
    routeId,
    originCastleId: originCastleId || route.fromCastleId,
    targetServerId: route.toServerId || null,
    intervalHint,
    pressureHint,
    active: true,
    proxyMode: getProxyMode() || "normal",
    proxyPressure: getProxyPressure() ?? 0
  };

  logger.log("castle", "spawn_nodeadmin_loop", {
    loopId,
    routeId,
    originCastleId: nodeAdminLoopsById[loopId].originCastleId,
    targetServerId: nodeAdminLoopsById[loopId].targetServerId,
    intervalHint,
    pressureHint,
    proxyMode: nodeAdminLoopsById[loopId].proxyMode,
    proxyPressure: nodeAdminLoopsById[loopId].proxyPressure
  });

  return { ok: true, loopId };
}

function snapshotExpansionRoutes() {
  const routes = {};
  for (const [id, r] of Object.entries(expansionRoutesById)) {
    routes[id] = { ...r };
  }
  return routes;
}

function snapshotNodeAdminLoops() {
  const loops = {};
  for (const [id, l] of Object.entries(nodeAdminLoopsById)) {
    loops[id] = { ...l };
  }
  return loops;
}

// ---------------------------------------------------------------------------
// Beacon Engine singleton for Castle + BeaconMesh
// ---------------------------------------------------------------------------
let _beaconEngineInstance = null;

export function setBeaconEngineInstance(engine) {
  _beaconEngineInstance = engine;
}

export function getBeaconEngineContext() {
  if (!_beaconEngineInstance) {
    try {
      _beaconEngineInstance =
        typeof PulseBeaconEngine === "function"
          ? new PulseBeaconEngine()
          : PulseBeaconEngine;
    } catch {
      return null;
    }
  }
  return _beaconEngineInstance;
}

// ============================================================================
//  EXECUTOR HELPERS — APPLY EXPANSION PLAN
// ============================================================================
function spawnCastleInternal({ regionId, hostName, presenceField = null }) {
  const rId = regionId || "unknown-region";
  const hName = hostName || "unknown-host";
  const castleId = buildCastleId({ regionId: rId, hostName: hName });
  const castle = ensureCastle(castleId, rId, hName, presenceField);
  return castle;
}

function spawnServersForCastleInternal({
  castleId,
  count = 1,
  serverConfig = {}
}) {
  const castle = castlesById[castleId];
  if (!castle) return [];
  const artery = castleArteriesById[castleId];
  const created = [];
  for (let i = 0; i < count; i++) {
    const effectiveServerId = stableHash(
      `SERVER::${castleId}::${JSON.stringify(serverConfig)}::${i}`
    );

    if (!castle.serversById[effectiveServerId]) {
      const server =
        typeof createPulseServer === "function"
          ? createPulseServer({
              castleId,
              serverId: effectiveServerId,
              ...serverConfig
            })
          : null;

      castle.serversById[effectiveServerId] = {
        serverId: effectiveServerId,
        serverMeta: PulseServerMeta,
        server
      };
      if (artery) artery.serversAttached += 1;
      logger.log("castle", "attach_server_auto", {
        castleId,
        serverId: effectiveServerId
      });

      created.push(effectiveServerId);
    }
  }
  return created;
}

function spawnUsersForCastleInternal({
  castleId,
  regionId,
  hostName,
  count = 1,
  worldCoreConfig = {}
}) {
  const created = [];
  for (let i = 0; i < count; i++) {
    const userKey = `auto-user-${i}`;
    const user = ensureUser({
      castleId,
      regionId,
      hostName,
      userKey,
      worldCoreConfig
    });
    created.push(user.userId);
  }
  return created;
}

function applySoldierDelegationInternal(actions = []) {
  for (const act of actions) {
    const castle = castlesById[act.castleId];
    if (!castle) continue;

    castle.soldiersById = castle.soldiersById || Object.create(null);

    for (let i = 0; i < (act.spawn || 0); i++) {
      const soldierId = stableHash(
        `SOLDIER::${act.castleId}::${act.reason || "spawn"}::${i}`
      );
      castle.soldiersById[soldierId] = {
        soldierId,
        castleId: act.castleId,
        reason: act.reason || "spawn"
      };
      logger.log("castle", "spawn_soldier_auto", {
        castleId: act.castleId,
        soldierId,
        reason: act.reason
      });
    }

    for (let i = 0; i < (act.kill || 0); i++) {
      const ids = Object.keys(castle.soldiersById);
      const victim = ids[0];
      if (!victim) break;
      delete castle.soldiersById[victim];
      logger.log("castle", "kill_soldier_auto", {
        castleId: act.castleId,
        soldierId: victim,
        reason: act.reason
      });
    }
  }
}

function applyMeshRebalanceInternal(actions = []) {
  for (const act of actions) {
    if (act.action === "link") {
      linkCastles(act.castleId, act.targetCastleId);
      logger.log("castle", "mesh_link_auto", {
        castleId: act.castleId,
        targetCastleId: act.targetCastleId
      });
    }
  }
}

// ============================================================================
//  ROUTE DEFENSE + NODEADMIN ORBITS
// ============================================================================
function defendRouteInternal({ routeId, soldierCount = 2 }) {
  const route = expansionRoutesById[routeId];
  if (!route) {
    logger.log("castle", "defend_route_missing", { routeId });
    return { ok: false, reason: "route_not_found" };
  }

  const originCastleId = route.fromCastleId;
  const castle = castlesById[originCastleId];
  if (!castle) {
    logger.log("castle", "defend_route_castle_missing", {
      routeId,
      originCastleId
    });
    return { ok: false, reason: "castle_not_found" };
  }

  castle.soldiersById = castle.soldiersById || Object.create(null);

  for (let i = 0; i < soldierCount; i++) {
    const soldierId = stableHash(
      `SOLDIER_DEFEND::${originCastleId}::${routeId}::${i}`
    );
    castle.soldiersById[soldierId] = {
      soldierId,
      castleId: originCastleId,
      routeId,
      role: "defender"
    };
    logger.log("castle", "spawn_soldier_defender", {
      castleId: originCastleId,
      soldierId,
      routeId
    });
  }

  return { ok: true, routeId, originCastleId, soldiers: soldierCount };
}

function spawnNodeAdminOrbitInternal({
  castleId,
  intervalHint = "steady",
  pressureHint = "normal"
}) {
  const castle = castlesById[castleId];
  if (!castle) {
    return { ok: false, reason: "castle_not_found" };
  }

  const loopId = stableHash(`ORBIT::${castleId}::${intervalHint}::${pressureHint}`);

  nodeAdminLoopsById[loopId] = {
    loopId,
    routeId: null,
    originCastleId: castleId,
    targetServerId: null,
    intervalHint,
    pressureHint,
    active: true,
    proxyMode: getProxyMode() || "normal",
    proxyPressure: getProxyPressure() ?? 0,
    orbit: true
  };

  logger.log("castle", "spawn_nodeadmin_orbit", {
    loopId,
    castleId,
    intervalHint,
    pressureHint,
    proxyMode: nodeAdminLoopsById[loopId].proxyMode,
    proxyPressure: nodeAdminLoopsById[loopId].proxyPressure
  });

  return { ok: true, loopId };
}

// ============================================================================
//  CASTLE ORGAN — createPulseCastle (v30-Immortal-OneBand-Civilization)
// ============================================================================

export const createPulseCastle = (config = {}) => {
  
const PulseCastleMeta = Object.freeze({
  organId: "PulseCastle-v30-Immortal-OneBand-Civilization",
  role: "PULSE_CASTLE_HOST",
  version: "v30-Immortal-OneBand-Civilization",
  layer: "Castle",
  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroDynamicImports: true,
    zeroEval: true,
    meshAware: true,
    worldMeshAware: true,
    presenceAware: true,
    advantageAware: true,
    costAware: true,
    civilizationAware: true,
    oneBandUnified: true
  })
});
  const state = {
    meta: PulseCastleMeta,
    config: {
      autoMeshByRegion: true,
      autoMeshAll: false,
      autoBindServerToUser: true,
      demoUsersOnBoot: true,
      regionId: null,
      ...config
    },
    engineTickId: 0
  };

  // ---------------------------------------------------------------------------
  //  ORGAN METHODS (IMMORTAL++)
  // ---------------------------------------------------------------------------
  const spawnCastle = ({ regionId, hostName, presenceField = null }) => {
    const castle = spawnCastleInternal({ regionId, hostName, presenceField });

    return CastleRegistrationResult({
      castleId: castle.castleId,
      regionId: castle.regionId,
      hostName: castle.hostName,
      presenceField: castle.presenceField,
      meta: { unifiedBand: castle.presenceField.unifiedBand }
    });
  };

  const spawnServers = ({ castleId, count = 1, serverConfig = {} }) => {
    return spawnServersForCastleInternal({ castleId, count, serverConfig });
  };

  const spawnUsers = ({
    castleId,
    regionId,
    hostName,
    count = 1,
    worldCoreConfig = {}
  }) => {
    return spawnUsersForCastleInternal({
      castleId,
      regionId,
      hostName,
      count,
      worldCoreConfig
    });
  };

  const summarizePresence = () => {
    const summary = summarizeCastlePresence();

    return CastlePresenceState({
      castlesById,
      meshLinksByCastleId,
      meta: {
        unifiedBand: computeUnifiedBand(),
        version: "v30-Immortal-OneBand-Civilization"
      }
    });
  };

  const snapshotMeshState = () => snapshotMesh();

  const snapshotUsers = (castleId) => {
    const { users, bindings } = snapshotUsersForCastle(castleId);

    return CastleUserBindingState({
      castleId,
      usersById: users,
      bindingsByServerId: bindings,
      meta: {}
    });
  };

  const registerExpansionRoute = (args) => registerExpansionRouteInternal(args);

  const spawnNodeAdminLoop = (args) => spawnNodeAdminLoopInternal(args);

  const snapshotExpansionRoutes = () =>
    CastleExpansionRouteState({
      routesById: snapshotExpansionRoutes(),
      meta: {}
    });

  const snapshotNodeAdminLoops = () =>
    CastleNodeAdminLoopState({
      loopsById: snapshotNodeAdminLoops(),
      meta: {}
    });

  // ---------------------------------------------------------------------------
  //  PUBLIC API
  // ---------------------------------------------------------------------------
  return {
    state,

    spawnCastle,
    spawnServers,
    spawnUsers,

    summarizePresence,
    snapshotMesh: snapshotMeshState,
    snapshotUsers,

    registerExpansionRoute,
    spawnNodeAdminLoop,

    snapshotExpansionRoutes,
    snapshotNodeAdminLoops,
    handle(req) {
      try {
        const { action, payload = {} } = req || {};

        switch (action) {
          case "spawnCastle":
            return spawnCastle(payload);

          case "spawnServers":
            return spawnServers(payload);

          case "spawnUsers":
            return spawnUsers(payload);

          case "summarizePresence":
            return summarizePresence();

          case "snapshotMesh":
            return snapshotMeshState();

          case "snapshotUsers":
            return snapshotUsers(payload.castleId);

          case "registerExpansionRoute":
            return registerExpansionRoute(payload);

          case "spawnNodeAdminLoop":
            return spawnNodeAdminLoop(payload);

          case "snapshotExpansionRoutes":
            return snapshotExpansionRoutes();

          case "snapshotNodeAdminLoops":
            return snapshotNodeAdminLoops();

          default:
            return {
              ok: false,
              error: "Unknown castle action",
              action,
              payload
            };
        }
      } catch (err) {
        return {
          ok: false,
          error: "Castle handle failure",
          message: err?.message,
          stack: err?.stack
        };
      }
    }

  };
};


export default createPulseCastle;

PulseRealm.ExpansionCastle = {
  createPulseCastle,
  applyMeshRebalanceInternal,
  applySoldierDelegationInternal,
  defendRouteInternal,
  spawnCastleInternal,
  spawnNodeAdminOrbitInternal,
  spawnUsersForCastleInternal,
  spawnServersForCastleInternal,
  snapshotNodeAdminLoops,
  snapshotExpansionRoutes,
  spawnNodeAdminLoopInternal,
  registerExpansionRouteInternal,
  ensureUser,
  ensureCastle,
  computePeopleNeedsForCastle,
  summarizeCastlePresence,
  computeCastlePresence,
  getPulseCastleContext,
  buildOrganismContext,
  PulseCastleMeta,
  CastleRegistrationResult,
  CastlePresenceState,
  ServerAttachResult,
  ServerDetachResult,
  CastleMeshState,
  CastleUserRegistrationResult,
  CastleUserBindingState,
  CastleExpansionRouteState,
  CastleNodeAdminLoopState
}

PulseRealm.PulseWorldCastle = createPulseCastle;