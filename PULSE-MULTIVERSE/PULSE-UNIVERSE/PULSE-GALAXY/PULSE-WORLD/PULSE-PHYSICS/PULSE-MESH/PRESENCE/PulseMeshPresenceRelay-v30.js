// ============================================================================
// FILE: PulseMeshPresenceRelay-v30-IMMORTAL-ADVANTAGE+++.js
// PULSE MESH PRESENCE RELAY — v30-IMMORTAL-ADVANTAGE+++
// Global Mesh Presence • RF/Satellite/GroundStation Aware • Multi-Band Windows
// Metadata-Only • Membrane-Safe • Deterministic • NodeAdmin/Overmind-Ready
// ============================================================================


const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



export function createPulseMeshPresenceRelay({
  MeshBus,            // safe metadata-only pub/sub
  SystemClock,        // uptime + age (safe)
  IdentityDirectory,  // safeName + safeId (no secrets)
  log,
  warn,
  error
}) {

  // -------------------------------------------------------------------------
  // META — v30 IMMORTAL-ADVANTAGE+++
  // -------------------------------------------------------------------------
  const meta = Object.freeze({
    layer: "PulseMeshPresenceRelay",
    role: "MESH_PRESENCE_RELAY",
    version: "v30-IMMORTAL-ADVANTAGE+++",
    lineage: "PulseMesh-v30",
    target: "full-mesh",
    selfRepairable: true,

    evo: Object.freeze({
      // Core guarantees
      deterministic: true,
      driftProof: true,
      zeroTrustSurface: true,
      zeroSecrets: true,
      zeroRouting: true,
      zeroOrgans: true,
      zeroCompute: true,
      zeroMutation: true,
      zeroNetworkFetch: true,
      safeRouteFree: true,
      multiInstanceReady: true,
      futureEvolutionReady: true,

      // Presence + band
      presenceRelay: true,
      meshLevel: true,
      presenceAware: true,
      bandAware: true,
      binaryAware: true,
      symbolicAware: true,
      dualBand: true,
      advantageAware: true,
      unifiedAdvantageField: true,

      // Spatial + RF + satellite
      regionAware: true,
      beaconAware: true,
      bluetoothAware: true,
      rfBandAware: true,
      satelliteAware: true,
      groundStationAware: true,
      orbitBandAware: true,          // LEO/MEO/GEO/DEEP
      fallbackTierAware: true,       // local/region/global/orbit

      // Pressure + health
      meshPressureAware: true,
      flowPressureAware: true,
      presenceHealthAware: true,     // stability + age windows

      // Admin / Overmind
      nodeAdminReady: true,
      overmindWindowReady: true,
      presenceAIWindowReady: true
    }),

    contract: Object.freeze({
      never: [
        "expose internal mesh topology",
        "expose routing tables",
        "expose CNS",
        "expose private identity",
        "expose permissions",
        "expose OS internals",
        "perform routing decisions",
        "perform pressure gating"
      ],
      always: [
        "relay metadata-only presence",
        "stay deterministic",
        "stay membrane-safe",
        "stay read-only",
        "stay mesh-level only"
      ]
    })
  });

  // -------------------------------------------------------------------------
  // INTERNAL STATE — v30
  // -------------------------------------------------------------------------
  const nearbyMap = new Map();        // uid -> enriched presence packet
  const bandStats = new Map();        // band -> { count, lastSeen }
  const regionStats = new Map();      // regionTag -> { count, lastSeen }
  const beaconStats = new Map();      // beaconId -> { count, lastSeen }
  const bluetoothStats = new Map();   // proximityTier -> { count, lastSeen }
  const rfBandStats = new Map();      // rfBand -> { count, lastSeen }
  const satelliteStats = new Map();   // satelliteId/orbitBand -> { count, lastSeen }
  const fallbackTierStats = new Map();// fallbackTier -> { count, lastSeen }

  let lastScanAt = 0;

  // -------------------------------------------------------------------------
  // HELPERS — v30
  // -------------------------------------------------------------------------
  function safeNow() {
    try { return SystemClock.now ? SystemClock.now() : PulseRealm.PulseNOW; }
    catch { return PulseRealm.PulseNOW; }
  }

  function safeDisplayName(uid) {
    try { return IdentityDirectory.safeName ? IdentityDirectory.safeName(uid) : uid; }
    catch { return uid; }
  }

  function normalizePresenceBand(band) {
    if (!band) return "mesh";
    const v = String(band).toLowerCase();
    if (v.includes("binary")) return "binary";
    if (v.includes("symbolic")) return "symbolic";
    if (v.includes("dual")) return "dual";
    if (v.includes("mesh")) return "mesh";
    return "mesh";
  }

  function classifySystemAgeDays(days) {
    if (typeof days !== "number" || !Number.isFinite(days)) return "unknown";
    if (days < 7) return "new";
    if (days < 90) return "growing";
    if (days < 365) return "established";
    return "veteran";
  }

  function classifyFallbackTier(packet) {
    // Purely metadata-based: where this presence *claims* it can be reached.
    const tier =
      packet.fallbackTier ||
      packet.fallback.tier ||
      packet.meshStatus.fallbackTier ||
      "local";

    const v = String(tier).toLowerCase();
    if (v.includes("orbit") || v.includes("sat")) return "orbit";
    if (v.includes("global")) return "global";
    if (v.includes("region")) return "region";
    return "local";
  }

  function classifyOrbitBand(satField) {
    if (!satField) return null;
    const band =
      satField.orbitBand ||
      satField.orbit ||
      satField.layer ||
      null;
    if (!band) return null;
    const v = String(band).toLowerCase();
    if (v.includes("leo")) return "LEO";
    if (v.includes("meo")) return "MEO";
    if (v.includes("geo")) return "GEO";
    if (v.includes("deep")) return "DEEP";
    return "OTHER";
  }

  function updateStats(map, key, now) {
    if (!key) return;
    const prev = map.get(key) || { count: 0, lastSeen: 0 };
    map.set(key, { count: prev.count + 1, lastSeen: now });
  }

  function updateBandStats(band, now) {
    updateStats(bandStats, normalizePresenceBand(band), now);
  }

  function updateRegionStats(regionTag, now) {
    if (!regionTag) return;
    updateStats(regionStats, regionTag, now);
  }

  function updateBeaconStats(beaconId, now) {
    if (!beaconId) return;
    updateStats(beaconStats, beaconId, now);
  }

  function updateBluetoothStats(bt, now) {
    if (!bt) return;
    const tier = bt.proximityTier || bt.proximity || "unknown";
    updateStats(bluetoothStats, tier, now);
  }

  function updateRfBandStats(rfBand, now) {
    if (!rfBand) return;
    updateStats(rfBandStats, rfBand, now);
  }

  function updateSatelliteStats(satField, now) {
    if (!satField) return;
    const orbitBand = classifyOrbitBand(satField) || "UNKNOWN";
    const satKey = satField.satelliteId || satField.id || orbitBand;
    updateStats(satelliteStats, satKey, now);
  }

  function updateFallbackTierStats(tier, now) {
    if (!tier) return;
    updateStats(fallbackTierStats, tier, now);
  }

  function extractUid(packet) {
    if (!packet) return null;
    if (packet.uid) return packet.uid;
    if (packet.presenceField.uid) return packet.presenceField.uid;
    return null;
  }

  // -------------------------------------------------------------------------
  // ENRICH PRESENCE — v30
  // -------------------------------------------------------------------------
  function enrichPresence(packet) {
    const now = safeNow();
    const uid = extractUid(packet);
    if (!uid) return null;

    const presenceField = packet.presenceField || packet.presence || null;
    const advantageField = packet.advantageField || packet.advantage || null;
    const bluetoothField = packet.bluetoothPresence || packet.bluetooth || null;
    const rfField = packet.rfPresence || packet.rf || null;
    const satelliteField = packet.satellitePresence || packet.satellite || null;
    const groundStationField = packet.groundStationPresence || packet.groundStation || null;

    const distance =
      packet.distance ??
      presenceField.distance ??
      null;

    const presenceBand =
      normalizePresenceBand(
        packet.presenceBand ??
        presenceField.presenceBand ??
        packet.bandSignature ??
        "mesh"
      );

    const systemAgeDays =
      packet.systemAgeDays ??
      presenceField.systemAgeDays ??
      null;

    const regionTag =
      packet.regionTag ??
      presenceField.regionTag ??
      presenceField.region ??
      null;

    const beaconId =
      packet.beaconId ??
      presenceField.beaconId ??
      null;

    const meshStatus =
      packet.meshStatus ??
      presenceField.meshStatus ??
      null;

    const advantageHint =
      packet.advantageHint ??
      advantageField.hint ??
      null;

    const advantageVector = advantageField.vector ?? null;

    const rfBand =
      rfField.band ||
      rfField.rfBand ||
      null;

    const orbitBand = classifyOrbitBand(satelliteField);
    const fallbackTier = classifyFallbackTier(packet);

    const systemAgeBand = classifySystemAgeDays(systemAgeDays);

    return {
      uid,
      displayName: safeDisplayName(uid),

      distance,
      regionTag,
      beaconId,
      meshStatus,

      presenceBand,
      systemAgeDays,
      systemAgeBand,

      lastSeen: now,
      presenceAgeMs: 0,
      lineage: "presence-relay-v30",
      stability: 1,

      advantageHint,
      advantageVector,

      bluetooth: bluetoothField || null,
      rf: rfField || null,
      satellite: satelliteField || null,
      groundStation: groundStationField || null,

      rfBand: rfBand || null,
      orbitBand: orbitBand || null,
      fallbackTier,

      _rawPresenceField: presenceField || null,
      _rawAdvantageField: advantageField || null,
      _rawBluetoothField: bluetoothField || null,
      _rawRfField: rfField || null,
      _rawSatelliteField: satelliteField || null,
      _rawGroundStationField: groundStationField || null
    };
  }

  // -------------------------------------------------------------------------
  // MESH PRESENCE HANDLER — v30
  // -------------------------------------------------------------------------
  function handleMeshPresence(packet) {
    try {
      if (!packet) return;

      const enriched = enrichPresence(packet);
      if (!enriched) return;

      nearbyMap.set(enriched.uid, enriched);

      const now = enriched.lastSeen;
      updateBandStats(enriched.presenceBand, now);
      updateRegionStats(enriched.regionTag, now);
      updateBeaconStats(enriched.beaconId, now);
      updateBluetoothStats(enriched.bluetooth, now);
      updateRfBandStats(enriched.rfBand, now);
      updateSatelliteStats(enriched.satellite, now);
      updateFallbackTierStats(enriched.fallbackTier, now);

      log("presence", "Mesh presence update (v30+++) ", {
        uid: enriched.uid,
        band: enriched.presenceBand,
        region: enriched.regionTag,
        beacon: enriched.beaconId,
        rfBand: enriched.rfBand,
        orbitBand: enriched.orbitBand,
        fallbackTier: enriched.fallbackTier
      });
    } catch (err) {
      warn("presence", "Mesh presence handler failed", err);
    }
  }

  // -------------------------------------------------------------------------
  // SUBSCRIBE — IMMORTAL
  // -------------------------------------------------------------------------
  function subscribe() {
    try {
      if (!MeshBus || typeof MeshBus.on !== "function") return;
      MeshBus.on("presence", handleMeshPresence);
      log("presence", "MeshPresenceRelay v30+++ subscribed to MeshBus");
    } catch (err) {
      warn("presence", "MeshPresenceRelay subscribe failed", err);
    }
  }

  // -------------------------------------------------------------------------
  // NEARBY SCAN — v30 (multi-band, multi-orbit, fallback-aware)
// -------------------------------------------------------------------------
  function scanNearby({
    maxAgeMs = 60_000,
    band = "any",
    regionTag = null,
    beaconId = null,
    bluetoothTier = null,
    rfBand = null,
    orbitBand = null,
    fallbackTier = null,
    limit = null
  } = {}) {
    try {
      const now = safeNow();
      lastScanAt = now;

      const result = [];
      const bandFilter = band === "any" ? null : normalizePresenceBand(band);
      const orbitFilter = orbitBand ? String(orbitBand).toUpperCase() : null;
      const fallbackFilter = fallbackTier ? String(fallbackTier).toLowerCase() : null;
      const rfFilter = rfBand ? String(rfBand).toLowerCase() : null;

      for (const [uid, p] of nearbyMap.entries()) {
        const age = now - (p.lastSeen || 0);

        if (age > maxAgeMs) {
          nearbyMap.delete(uid);
          continue;
        }

        const stability =
          age < 10_000 ? 1 :
          age < 20_000 ? 0.8 :
          age < 40_000 ? 0.6 :
          0.4;

        if (bandFilter && normalizePresenceBand(p.presenceBand) !== bandFilter) continue;
        if (regionTag && p.regionTag !== regionTag) continue;
        if (beaconId && p.beaconId !== beaconId) continue;

        if (bluetoothTier) {
          const bt = p.bluetooth;
          const tier = bt.proximityTier || bt.proximity || "unknown";
          if (tier !== bluetoothTier) continue;
        }

        if (rfFilter) {
          const rf = (p.rfBand || "").toLowerCase();
          if (!rf || rf !== rfFilter) continue;
        }

        if (orbitFilter) {
          const ob = (p.orbitBand || "").toUpperCase();
          if (!ob || ob !== orbitFilter) continue;
        }

        if (fallbackFilter) {
          const ft = (p.fallbackTier || "").toLowerCase();
          if (!ft || ft !== fallbackFilter) continue;
        }

        result.push({
          uid: p.uid,
          displayName: p.displayName,
          distance: p.distance,
          presenceBand: p.presenceBand,
          systemAgeDays: p.systemAgeDays,
          systemAgeBand: p.systemAgeBand,
          presenceAgeMs: age,
          stability,
          regionTag: p.regionTag,
          beaconId: p.beaconId,
          meshStatus: p.meshStatus,
          lineage: p.lineage,
          advantageHint: p.advantageHint ?? null,
          bluetooth: p.bluetooth || null,
          rfBand: p.rfBand || null,
          orbitBand: p.orbitBand || null,
          fallbackTier: p.fallbackTier || null
        });

        if (typeof limit === "number" && limit > 0 && result.length >= limit) break;
      }

      return Object.freeze(result);
    } catch (err) {
      warn("presence", "scanNearby failed", err);
      return Object.freeze([]);
    }
  }

  // -------------------------------------------------------------------------
  // WINDOWS + SNAPSHOTS — v30
  // -------------------------------------------------------------------------
  function getBandStats() {
    const out = {};
    for (const [band, s] of bandStats.entries()) {
      out[band] = { count: s.count, lastSeen: s.lastSeen };
    }
    return Object.freeze(out);
  }

  function getRegionStats() {
    const out = {};
    for (const [region, s] of regionStats.entries()) {
      out[region] = { count: s.count, lastSeen: s.lastSeen };
    }
    return Object.freeze(out);
  }

  function getBeaconStats() {
    const out = {};
    for (const [beacon, s] of beaconStats.entries()) {
      out[beacon] = { count: s.count, lastSeen: s.lastSeen };
    }
    return Object.freeze(out);
  }

  function getBluetoothStats() {
    const out = {};
    for (const [tier, s] of bluetoothStats.entries()) {
      out[tier] = { count: s.count, lastSeen: s.lastSeen };
    }
    return Object.freeze(out);
  }

  function getRfBandStats() {
    const out = {};
    for (const [band, s] of rfBandStats.entries()) {
      out[band] = { count: s.count, lastSeen: s.lastSeen };
    }
    return Object.freeze(out);
  }

  function getSatelliteStats() {
    const out = {};
    for (const [key, s] of satelliteStats.entries()) {
      out[key] = { count: s.count, lastSeen: s.lastSeen };
    }
    return Object.freeze(out);
  }

  function getFallbackTierStats() {
    const out = {};
    for (const [tier, s] of fallbackTierStats.entries()) {
      out[tier] = { count: s.count, lastSeen: s.lastSeen };
    }
    return Object.freeze(out);
  }

  function getNearbyPresenceWindow(options = {}) {
    const nearby = scanNearby(options);
    return Object.freeze({
      nearbyPresence: nearby,
      bandStats: getBandStats(),
      regionStats: getRegionStats(),
      beaconStats: getBeaconStats(),
      bluetoothStats: getBluetoothStats(),
      rfBandStats: getRfBandStats(),
      satelliteStats: getSatelliteStats(),
      fallbackTierStats: getFallbackTierStats(),
      lastScanAt
    });
  }

  function getPresenceSnapshot(options = {}) {
    const nearby = scanNearby(options);
    return Object.freeze({
      meta,
      count: nearby.length,
      bands: getBandStats(),
      regions: getRegionStats(),
      beacons: getBeaconStats(),
      bluetooth: getBluetoothStats(),
      rfBands: getRfBandStats(),
      satellites: getSatelliteStats(),
      fallbackTiers: getFallbackTierStats(),
      lastScanAt,
      nearby
    });
  }

  // -------------------------------------------------------------------------
  // BROADCAST SELF PRESENCE — v30 (mesh + RF + satellite hints)
// -------------------------------------------------------------------------
  function broadcastSelfPresence(selfPresencePacket) {
    try {
      if (!MeshBus || typeof MeshBus.emit !== "function") return;
      if (!selfPresencePacket || !selfPresencePacket.uid) return;

      MeshBus.emit("presence", {
        uid: selfPresencePacket.uid,
        distance: 0,
        presenceBand: selfPresencePacket.presenceBand ?? "OS_CORE",
        systemAgeDays: selfPresencePacket.organismAgeDays ?? null,
        advantageHint: selfPresencePacket.advantageHint ?? null,
        regionTag: selfPresencePacket.regionTag ?? null,
        beaconId: selfPresencePacket.beaconId ?? null,
        meshStatus: selfPresencePacket.meshStatus ?? null,
        bluetooth: selfPresencePacket.bluetooth ?? null,
        rf: selfPresencePacket.rf ?? null,
        satellite: selfPresencePacket.satellite ?? null,
        groundStation: selfPresencePacket.groundStation ?? null,
        fallbackTier: selfPresencePacket.fallbackTier ?? "local"
      });
    } catch (err) {
      warn("presence", "broadcastSelfPresence failed", err);
    }
  }

  // -------------------------------------------------------------------------
  // INIT
  // -------------------------------------------------------------------------
  subscribe();

  return Object.freeze({
    meta,

    scanNearby,
    getNearbyPresenceWindow,
    getPresenceSnapshot,

    getBandStats,
    getRegionStats,
    getBeaconStats,
    getBluetoothStats,
    getRfBandStats,
    getSatelliteStats,
    getFallbackTierStats,

    broadcastSelfPresence
  });
}

export const DefaultPulseMeshPresenceRelay = {
  create: createPulseMeshPresenceRelay
};

export default DefaultPulseMeshPresenceRelay;

PulseRealm.MeshPresenceRelay = {
  createPulseMeshPresenceRelay,
  DefaultPulseMeshPresenceRelay
}

PulseRealm.PulseMeshPresence = createPulseMeshPresenceRelay;