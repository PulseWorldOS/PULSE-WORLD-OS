/**
// ============================================================================
//  PULSE-WORLD-UNIVERSE-PULSAR-UNIVERSE v30-Orbital-Immortal++  (PURE ESM)
// ============================================================================
 *  ROLE: Universe-layer symbolic orchestrator / multispin / civilization lens
 *  VERSION: v30-Orbital-Immortal++
 *  LAYER: Universe (pure symbolic, no storage, no I/O)
 * ============================================================================
 *
 *  WHAT THIS ORGAN IS:
 *  -------------------
 *  This is the "universe brain" for Pulse-World.
 *  It does NOT talk to the network, AWS, IndexedDB, or hardware.
 *  It ONLY:
 *    - Reads symbolic snapshots from "world providers".
 *    - Computes:
 *        * Multispin (which band is dominant: firebase/netlify/local/edge/groundstation/satellite/other)
 *        * Civilization field (tiers, density, pressure, orbital reach)
 *        * Health field (overall density/pressure band)
 *        * Game universe field (epochMode + season)
 *    - Returns a clean, deterministic snapshot.
 *
 *  WHAT THIS ORGAN IS NOT:
 *  -----------------------
 *    - No AWS SDK.
 *    - No Ground Station API calls.
 *    - No IndexedDB / binary / PulsePort logic.
 *    - No routing, no scheduling, no real-time.
 *
 *  YOU FEED IT SNAPSHOTS, IT GIVES YOU SYMBOLIC TRUTH.
 *
 *  ORBITAL UPGRADE (v30):
 *  ----------------------
 *  New world kinds:
 *    - "groundstation"
 *        Represents AWS Ground Station ingest as a WORLD.
 *        Think of it as:
 *          * RF → IP bridge.
 *          * Contact windows (when satellite is visible).
 *          * Dataflow endpoint groups (which regions can see the sky).
 *        You DO NOT call AWS from here.
 *        Instead, your AWS/VPC ingest layer:
 *          * Receives frames / contacts.
 *          * Aggregates them into symbolic hints:
 *              - contactDensity (0–1): how often we have contact.
 *              - orbitalReach (0–1): how many regions/meshes are covered.
 *              - orbitalPriority (0–1): how much we want to bias toward sky.
 *          * Passes those hints into civilizationHints for this worldId.
 *
 *    - "satellite"
 *        Represents the orbital presence / vertical axis as a WORLD.
 *        Think of it as:
 *          * Global broadcast layer.
 *          * Vertical fallback path.
 *          * "Sky mesh" that sees many ground meshes at once.
 *        Again: no real satellite API here.
 *        You feed it symbolic hints:
 *          - contactDensity: how often the satellite is "online" to us.
 *          - orbitalReach: how many ground regions it can see.
 *          - orbitalPriority: how much we want to favor orbital routing.
 *
 *  CONCEPTS TO THINK ABOUT (SATELLITE + AWS GROUND STATION):
 *  ---------------------------------------------------------
 *  1. Contact Windows (AWS Ground Station):
 *     - Each scheduled contact is a "breath" of the sky.
 *     - More contacts per day → higher contactDensity.
 *     - You can aggregate:
 *         contactDensity = (totalContactSeconds / totalDaySeconds)
 *     - This organ doesn't compute that; your ingest layer does.
 *
 *  2. Dataflow Endpoint Groups:
 *     - Each endpoint group is a region of your organism that can see the sky.
 *     - More endpoint groups / regions → higher orbitalReach.
 *     - You can think:
 *         orbitalReach = (#regionsWithEndpoint / #totalRegions)
 *
 *  3. Frame Rate / Throughput:
 *     - Symbolic orbitalPressure.
 *     - High throughput = more "load" on orbital path.
 *     - You can map:
 *         orbitalPressure ~ normalized(frameRate or Mbps)
 *     - Here we just bias density/pressure using orbital hints.
 *
 *  4. Being in a Satellite (conceptually, for Pulse-World):
 *     - You are above the mesh, not inside it.
 *     - You see multiple ground clusters at once.
 *     - You can:
 *         * Broadcast presence updates globally.
 *         * Provide fallback when ground internet is fragmented.
 *         * Act as a "vertical spine" for the organism.
 *     - Symbolically:
 *         * orbitalReach → how many ground worlds you can help.
 *         * orbitalPriority → how much we trust / favor orbital path.
 *
 *  5. How this helps AWS Ground Station integration:
 *     - You keep AWS-specific logic OUTSIDE this file.
 *     - Your AWS/VPC service:
 *         * Talks to Ground Station.
 *         * Tracks contacts, frames, throughput.
 *         * Computes:
 *             - contactDensity
 *             - orbitalReach
 *             - orbitalPriority
 *         * Calls setCivilizationHint(worldId, { ...orbital hints... }).
 *     - This organ then:
 *         * Treats GroundStation/Satellite as worlds.
 *         * Lets them influence multispin + civilization fields.
 *         * But never depends on them (fallback: they can vanish).
 *
 *  6. Resilience / Fallback Thinking:
 *     - If GroundStation goes down:
 *         * This world just stops contributing density/pressure.
 *         * Universe still spins with firebase/netlify/local/edge.
 *     - If Satellite goes down:
 *         * Same: orbital band weight drops.
 *         * Universe still spins; season may change (no more orbital-season).
 *     - This organ never breaks if sky disappears.
 *       It just reflects that the sky is quiet.
 *
 *  7. IndexedDB / Binary / IMMORTAL++ v30:
 *     - All of that lives in PulsePort / IMMORTAL++ layers.
 *     - They can:
 *         * Store snapshots from this organ.
 *         * Compress them.
 *         * Version them.
 *     - This organ stays pure math.
 *
 * ============================================================================
 */
// ============================================================================
//  PULSE-WORLD-UNIVERSE-PULSAR-UNIVERSE v30-Orbital-Immortal++  (PURE ESM)
// ============================================================================
//
//  PURE SYMBOLIC UNIVERSE ORGAN
//  - Knows about:
//      • Worlds (firebase / netlify / local / edge / groundstation / satellite / other)
//      • Civilization tiers, cost bands, epochs, seasons
//      • Orbital hints (contactDensity / orbitalReach / orbitalPriority)
//      • Multispin band dominance
//      • Global health + game/epoch mode
//      • Orbital / satellite dominance (orbital-season)
//
//  v30-Orbital UPGRADE:
//    - Stronger orbital semantics for groundstation/satellite worlds
//    - Satellite coverage + contact density surfaced cleanly
//    - Universe-level “orbitalField” for quick satellite awareness
//    - Fully compatible with existing providers + civ hints
//
// ============================================================================
// HELPERS
// ============================================================================
// ============================================================================
//  PULSE-GALACTIC-AWS v30-Orbital-Immortal++  (PURE ESM)
// ============================================================================
//  ROLE: Galaxy-layer AWS + Orbital orchestrator (symbolic only)
//  LAYER: Galaxy (above worlds, below universe game logic)
//  VERSION: v30-Orbital-Immortal++
//
//  WHAT THIS ORGAN DOES (SYMBOLIC ONLY):
//  -------------------------------------
//  - Tracks satellites, ground stations, and their symbolic orbital hints.
//  - Aggregates multi-satellite constellations (overlaps, cooperation windows).
//  - Predicts future passes / visibility windows in a simple, deterministic way.
//  - Exposes "routes" and "patterns" for higher layers (Universe / Game).
//  - Provides hooks for IMMORTAL++ memory layers to:
//      * store orbital patterns
//      * recall them
//      * version them
//
//  WHAT THIS ORGAN DOES NOT DO:
//  ----------------------------
//  - No AWS SDK calls.
//  - No Ground Station API calls.
//  - No real TLE parsing or orbital mechanics.
//  - No IndexedDB / binary / PulsePort directly.
//  - No network I/O.
//
//  YOU FEED IT SYMBOLIC ORBITAL HINTS, IT GIVES YOU:
//    - Galaxy snapshot of satellites + ground stations.
//    - Constellation overlaps.
//    - Simple future-pass predictions.
//    - Memory-ready pattern objects.
//
// ============================================================================

import { PulseGalacticProxy } from "./PULSE-GALACTIC-PROXY.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clamp01(v) {
  if (v == null || Number.isNaN(v)) return 0;
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

function stableHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 1000003;
  }
  return `gal${h}`;
}

function safeCall(fn, ...args) {
  if (typeof fn !== "function") return null;
  try {
    return fn(...args);
  } catch {
    return null;
  }
}

// Simple deterministic pseudo-random (for jittering predictions without real RNG)
function pseudoRandom(seed) {
  let x = seed % 2147483647;
  if (x <= 0) x += 2147483646;
  x = (x * 16807) % 2147483647;
  return (x - 1) / 2147483646;
}

// ---------------------------------------------------------------------------
// Types (symbolic)
// ---------------------------------------------------------------------------
//
// Satellite:
//   id: string
//   name: string
//   orbitClass: "LEO" | "MEO" | "GEO" | "HEO" | "OTHER"
//   orbitalPeriodSec: number (approx)
//   inclinationDeg: number
//   groundTrackHint: { regions: string[] } // symbolic regions
//   contactDensity: 0..1
//   orbitalReach: 0..1
//   orbitalPriority: 0..1
//   lastContactTs: number | null (ms)
//   lastKnownPhase: 0..1 (0..1 along orbit)
//
// GroundStation:
//   id: string
//   region: string
//   latitude: number
//   longitude: number
//   visibilityRadiusKm: number
//   contactDensity: 0..1
//   orbitalReach: 0..1
//   orbitalPriority: 0..1
//
// MemoryAdapter (optional, symbolic):
//   {
//     savePattern(kind, payload) -> Promise<void> | void
//     loadPatterns(kind, query) -> Promise<array> | array
//   }
//
// ---------------------------------------------------------------------------
// ============================================================================
//  PULSE-GALACTIC-AWS-ORBITAL.js
//  “Orbital Galaxy Layer / AWS Constellation / Satellite + GroundStation Engine”
//  Fully upgraded with PulseGalacticProxy import + integration.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



export function createPulseGalaxyAwsOrbital({
  galaxyID = null,
  trace = false,
  memoryAdapter = null
} = {}) {
  const identity = Object.freeze({
    galaxyID: galaxyID || stableHash("PULSE-GALACTIC-AWS"),
    version: "v30-Orbital-Immortal++",
    layer: "galaxy-aws-orbital"
  });

  const log = (...args) =>
    trace &&
    PulseRealm.PulseLog("galaxy", "[PulseGalaxyAWS v30-Orbital]", ...args);

  // Registries
  const satellites = new Map();     // id -> satellite
  const groundStations = new Map(); // id -> groundStation

  // -------------------------------------------------------------------------
  // Registry API
  // -------------------------------------------------------------------------

  function registerSatellite(sat) {
    if (!sat || !sat.id) {
      return { ok: false, reason: "invalid-satellite" };
    }
    const normalized = {
      id: sat.id,
      name: sat.name || sat.id,
      orbitClass: sat.orbitClass || "LEO",
      orbitalPeriodSec: sat.orbitalPeriodSec || 5400, // ~90 min default
      inclinationDeg: sat.inclinationDeg ?? 0,
      groundTrackHint: sat.groundTrackHint || { regions: [] },
      contactDensity: clamp01(sat.contactDensity ?? 0),
      orbitalReach: clamp01(sat.orbitalReach ?? 0),
      orbitalPriority: clamp01(sat.orbitalPriority ?? 0),
      lastContactTs: sat.lastContactTs ?? null,
      lastKnownPhase: clamp01(sat.lastKnownPhase ?? 0)
    };
    satellites.set(normalized.id, normalized);
    log("registerSatellite", normalized.id);
    return { ok: true, satellite: normalized };
  }

  function unregisterSatellite(id) {
    satellites.delete(id);
    log("unregisterSatellite", id);
    return { ok: true };
  }

  function registerGroundStation(gs) {
    if (!gs || !gs.id) {
      return { ok: false, reason: "invalid-groundstation" };
    }
    const normalized = {
      id: gs.id,
      region: gs.region || "unknown",
      latitude: gs.latitude ?? 0,
      longitude: gs.longitude ?? 0,
      visibilityRadiusKm: gs.visibilityRadiusKm ?? 2000,
      contactDensity: clamp01(gs.contactDensity ?? 0),
      orbitalReach: clamp01(gs.orbitalReach ?? 0),
      orbitalPriority: clamp01(gs.orbitalPriority ?? 0)
    };
    groundStations.set(normalized.id, normalized);
    log("registerGroundStation", normalized.id);
    return { ok: true, groundStation: normalized };
  }

  function unregisterGroundStation(id) {
    groundStations.delete(id);
    log("unregisterGroundStation", id);
    return { ok: true };
  }

  function listSatellites() {
    return Array.from(satellites.values());
  }

  function listGroundStations() {
    return Array.from(groundStations.values());
  }

  // -------------------------------------------------------------------------
  // Simple orbital phase model
  // -------------------------------------------------------------------------
  //
  // We treat each satellite as:
  //   phase(t) = (phase0 + (t - t0) / orbitalPeriodSec) mod 1
  //
  // Where:
  //   - phase0 is lastKnownPhase
  //   - t0 is lastContactTs (or a synthetic origin)
  //
  // Visibility is symbolic:
  //   - A satellite is "near" a ground station when:
  //       * phase is within some band (e.g., 0.2 wide) of a station-specific offset.
  //   - We don't compute real geometry; we just give deterministic patterns.

  function computeSatellitePhaseAtTime(sat, tMs) {
    const periodSec = sat.orbitalPeriodSec || 5400;
    const periodMs = periodSec * 1000;
    const originTs = sat.lastContactTs ?? 0;
    const basePhase = sat.lastKnownPhase ?? 0;

    if (periodMs <= 0) return basePhase;

    const dt = tMs - originTs;
    const cycles = dt / periodMs;
    const phase = (basePhase + cycles) % 1;
    return phase < 0 ? phase + 1 : phase;
  }

  function computeSatellitePhaseNow(sat, nowMs = PulseRealm.PulseNOW) {
    return computeSatellitePhaseAtTime(sat, nowMs);
  }

  // -------------------------------------------------------------------------
  // Visibility / pass prediction (symbolic)
  // -------------------------------------------------------------------------
  //
  // For each satellite + ground station pair, we compute:
  //   - approximate nextPassStartTs
  //   - approximate nextPassEndTs
  //   - visibilityScore (0..1)
  //
  // We use a simple phase window:
  //   - Each ground station gets a deterministic phaseOffset based on its id.
  //   - Satellite is "in view" when |phase - phaseOffset| < windowWidth/2.
  //   - We then compute the next time this condition will be met.

  function computePhaseOffsetForGroundStation(gs) {
    // Deterministic offset based on id
    const seed = stableHash(gs.id).length * 9973;
    return pseudoRandom(seed) % 1;
  }

  function computeNextPassForPair(sat, gs, nowMs = PulseRealm.PulseNOW) {
    const periodSec = sat.orbitalPeriodSec || 5400;
    const periodMs = periodSec * 1000;
    if (periodMs <= 0) return null;

    const phaseNow = computeSatellitePhaseAtTime(sat, nowMs);
    const offset = computePhaseOffsetForGroundStation(gs);

    const windowWidth = 0.18; // ~65 degrees of orbit
    const half = windowWidth / 2;

    // We want phase in [offset - half, offset + half] mod 1
    // Compute distance in phase space
    let dist = Math.abs(phaseNow - offset);
    if (dist > 0.5) dist = 1 - dist;

    if (dist <= half) {
      // Already in pass
      const remainingPhase = half - dist;
      const remainingMs = remainingPhase * periodMs;
      const startTs = nowMs - dist * periodMs;
      const endTs = nowMs + remainingMs;
      const visibilityScore = clamp01(1 - dist / half);
      return {
        inPassNow: true,
        startTs,
        endTs,
        visibilityScore
      };
    }

    // Not in pass: compute time until next entry
    const phaseToEdge = dist - half;
    const phaseToStart = (1 - phaseToEdge) % 1;
    const timeToStartMs = phaseToStart * periodMs;
    const startTs = nowMs + timeToStartMs;
    const endTs = startTs + windowWidth * periodMs;
    const visibilityScore = clamp01(gs.orbitalPriority * sat.orbitalPriority);

    return {
      inPassNow: false,
      startTs,
      endTs,
      visibilityScore
    };
  }

  function buildPassPredictions(nowMs = PulseRealm.PulseNOW) {
    const sats = listSatellites();
    const gss = listGroundStations();

    const passes = [];

    for (const sat of sats) {
      for (const gs of gss) {
        const pass = computeNextPassForPair(sat, gs, nowMs);
        if (!pass) continue;

        passes.push({
          satelliteId: sat.id,
          groundStationId: gs.id,
          satelliteName: sat.name,
          groundStationRegion: gs.region,
          orbitClass: sat.orbitClass,
          nextPass: pass
        });
      }
    }

    // Sort by start time
    passes.sort((a, b) => (a.nextPass.startTs || 0) - (b.nextPass.startTs || 0));

    return passes;
  }

  // -------------------------------------------------------------------------
  // Constellation overlaps (multi-satellite cooperation)
  // -------------------------------------------------------------------------
  //
  // We want to know when multiple satellites are in view of the same region
  // or overlapping regions, so we can:
  //   - treat them as a "virtual constellation"
  //   - plan multi-satellite routes
  //   - bias multispin / civilization fields upstream
  //
  // We compute:
  //   - overlapping passes within a time window
  //   - simple "cooperation windows" where >=2 satellites are visible.

  function buildConstellationWindows({ horizonMs = 6 * 60 * 60 * 1000 } = {}) {
    const nowMs = PulseRealm.PulseNOW.toMillis();
    const passes = buildPassPredictions(nowMs);

    const windows = [];

    // For each ground station, find overlapping passes
    const byGS = new Map();
    for (const p of passes) {
      const key = p.groundStationId;
      if (!byGS.has(key)) byGS.set(key, []);
      byGS.get(key).push(p);
    }

    for (const [gsId, gsPasses] of byGS.entries()) {
      // Only consider passes within horizon
      const filtered = gsPasses.filter(
        p => p.nextPass.startTs <= nowMs + horizonMs
      );

      // Sweep-line style overlap detection
      for (let i = 0; i < filtered.length; i++) {
        const a = filtered[i];
        const aStart = a.nextPass.startTs;
        const aEnd = a.nextPass.endTs;

        const group = [a];

        for (let j = i + 1; j < filtered.length; j++) {
          const b = filtered[j];
          const bStart = b.nextPass.startTs;
          const bEnd = b.nextPass.endTs;

          const overlapStart = Math.max(aStart, bStart);
          const overlapEnd = Math.min(aEnd, bEnd);

          if (overlapEnd > overlapStart) {
            group.push(b);
          }
        }

        // ⭐ satellitesInSelf (correct variable name)
        const satellitesInSelf = Array.from(
          new Set(group.map(g => g.satelliteId))
        );

        if (satellitesInSelf.length >= 2) {
          const windowStart = Math.max(...group.map(g => g.nextPass.startTs));
          const windowEnd = Math.min(...group.map(g => g.nextPass.endTs));

          windows.push({
            groundStationId: gsId,
            groundStationRegion: group[0].groundStationRegion,
            satellites: satellitesInSelf,
            startTs: windowStart,
            endTs: windowEnd,

            // cooperationScore using satellitesInSelf
            cooperationScore: clamp01(
              satellitesInSelf.length / 4 +
              group.reduce(
                (acc, g) => acc + (g.nextPass.visibilityScore || 0),
                0
              ) / (group.length * 2)
            )
          });
        }
      }

    }

    // Deduplicate by (gsId, startTs, endTs, satellites)
    const dedup = [];
    const seen = new Set();
    for (const w of windows) {
      const key = `${w.groundStationId}:${w.startTs}:${w.endTs}:${w.satellites.join(
        ","
      )}`;
      if (seen.has(key)) continue;
      seen.add(key);
      dedup.push(w);
    }

    dedup.sort((a, b) => a.startTs - b.startTs);

    return dedup;
  }

  // -------------------------------------------------------------------------
  // Route / pattern memory hooks
  // -------------------------------------------------------------------------
  //
  // We don't implement storage here; we just expose clean pattern objects
  // and call memoryAdapter.savePattern / loadPatterns if provided.

  async function persistOrbitalPatterns({ nowMs = PulseRealm.PulseNOW } = {}) {
    if (!memoryAdapter || typeof memoryAdapter.savePattern !== "function") {
      return { ok: false, reason: "no-memory-adapter" };
    }

    const passes = buildPassPredictions(nowMs);
    const windows = buildConstellationWindows({ horizonMs: 6 * 60 * 60 * 1000 });

    const payload = {
      ts: nowMs,
      identity,
      passes,
      constellationWindows: windows
    };

    await safeCall(memoryAdapter.savePattern, "orbitalPatterns", payload);

    return { ok: true };
  }

  async function loadOrbitalPatterns(query = {}) {
    if (!memoryAdapter || typeof memoryAdapter.loadPatterns !== "function") {
      return { ok: false, reason: "no-memory-adapter", patterns: [] };
    }

    const patterns =
      (await safeCall(memoryAdapter.loadPatterns, "orbitalPatterns", query)) ||
      [];

    return { ok: true, patterns };
  }

  // -------------------------------------------------------------------------
  // Galaxy snapshot
  // -------------------------------------------------------------------------

  function getSnapshot({ nowMs = PulseRealm.PulseNOW } = {}) {
    const sats = listSatellites().map(s => ({
      ...s,
      phaseNow: computeSatellitePhaseNow(s, nowMs)
    }));
    const gss = listGroundStations();
    const passes = buildPassPredictions(nowMs);
    const constellationWindows = buildConstellationWindows({
      horizonMs: 6 * 60 * 60 * 1000
    });

    // Simple galaxy-level orbital field
    let totalSat = sats.length;
    let avgContactDensity =
      totalSat === 0
        ? 0
        : sats.reduce((acc, s) => acc + s.contactDensity, 0) / totalSat;
    let avgOrbitalReach =
      totalSat === 0
        ? 0
        : sats.reduce((acc, s) => acc + s.orbitalReach, 0) / totalSat;
    let maxOrbitalPriority = sats.reduce(
      (acc, s) => Math.max(acc, s.orbitalPriority),
      0
    );

    const orbitalDominant =
      avgOrbitalReach > 0.4 || maxOrbitalPriority > 0.5 || passes.length > 0;

    const orbitalField = Object.freeze({
      totalSatellites: totalSat,
      totalGroundStations: gss.length,
      avgContactDensity,
      avgOrbitalReach,
      maxOrbitalPriority,
      orbitalDominant,
      passCount: passes.length,
      constellationWindowCount: constellationWindows.length
    });

    return Object.freeze({
      identity,
      satellites: sats,
      groundStations: gss,
      passes,
      constellationWindows,
      orbitalField
    });
  }

  // -------------------------------------------------------------------------
  // Galactic Proxy integration (AWS → Galaxy → Proxy)
  // -------------------------------------------------------------------------

  async function routeClientViaGalacticProxy(requestContext = {}) {
    const result = await PulseGalacticProxy.routeToSatellite(requestContext);
    log("routeClientViaGalacticProxy", result);
    return result;
  }

  PulseRealm.GalacticAWS = {
    identity,

    // registry
    registerSatellite,
    unregisterSatellite,
    registerGroundStation,
    unregisterGroundStation,
    listSatellites,
    listGroundStations,

    // orbital math
    computeSatellitePhaseAtTime,
    computeSatellitePhaseNow,
    computeNextPassForPair,
    buildPassPredictions,
    buildConstellationWindows,

    // memory hooks
    persistOrbitalPatterns,
    loadOrbitalPatterns,

    // snapshot
    getSnapshot,

    // proxy integration
    routeClientViaGalacticProxy
  };

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  return Object.freeze({
    identity,

    // registry
    registerSatellite,
    unregisterSatellite,
    registerGroundStation,
    unregisterGroundStation,
    listSatellites,
    listGroundStations,

    // orbital math
    computeSatellitePhaseAtTime,
    computeSatellitePhaseNow,
    computeNextPassForPair,
    buildPassPredictions,
    buildConstellationWindows,

    // memory hooks
    persistOrbitalPatterns,
    loadOrbitalPatterns,

    // snapshot
    getSnapshot,

    // proxy integration
    routeClientViaGalacticProxy
  });
}

export default createPulseGalaxyAwsOrbital;

/**
 * ============================================================================
 *  AWS GROUND STATION + ORBITAL INTERNET APPENDIX
 *  (Real-world concepts, settings, abilities, and orbital ideas)
 * ============================================================================
 *
 *  AWS GROUND STATION — WHAT IT ACTUALLY IS:
 *  ----------------------------------------
 *  AWS Ground Station is a fully managed service that lets you:
 *    - Schedule satellite passes (contact windows)
 *    - Downlink data from satellites (RF → IP)
 *    - Uplink commands to satellites
 *    - Route satellite data directly into your AWS VPC
 *
 *  It replaces:
 *    - Owning antennas
 *    - RF equipment
 *    - Tracking systems
 *    - Ground infrastructure
 *
 *  Instead, AWS provides:
 *    - Global antenna network
 *    - Multi-region coverage
 *    - High-rate downlink (X-band)
 *    - TT&C (S-band)
 *    - Secure VPC integration
 *
 *
 *  CONTACT WINDOWS — THE SKY OPENS AND CLOSES:
 *  -------------------------------------------
 *  Satellites in LEO (Low Earth Orbit) are NOT always visible.
 *  They pass overhead in "windows" that last 5–15 minutes.
 *
 *  Key concepts:
 *    - Pass duration: how long the satellite is visible
 *    - Pass frequency: how many times per day
 *    - Elevation angle: higher = better signal
 *    - Visibility region: which AWS Ground Station region can see it
 *
 *  Engineering ideas:
 *    - You can schedule passes automatically
 *    - You can prioritize high-elevation passes for best SNR
 *    - You can chain passes across multiple AWS regions
 *
 *
 *  DATAFLOW ENDPOINT GROUPS — WHERE THE SKY LANDS:
 *  -----------------------------------------------
 *  A Dataflow Endpoint Group defines:
 *    - Which AWS region receives the downlink
 *    - Which VPC/subnets the data flows into
 *    - Which compute resources process the stream
 *
 *  Think of it as:
 *    "Where does the satellite plug into your cloud?"
 *
 *  You can:
 *    - Route different satellites to different regions
 *    - Build multi-region ingest pipelines
 *    - Use EC2/ECS/Lambda/Kinesis for processing
 *
 *
 *  FREQUENCY BANDS & MODULATION — THE RF REALITY:
 *  ----------------------------------------------
 *  AWS Ground Station supports:
 *    - S-band (telemetry, tracking, command)
 *    - X-band (high-rate downlink)
 *    - UHF (legacy)
 *
 *  Common modulation/coding:
 *    - BPSK / QPSK / OQPSK
 *    - CCSDS frames
 *    - Viterbi / Reed-Solomon
 *    - Turbo / LDPC
 *
 *  Concepts:
 *    - Higher frequency = more bandwidth, more atmospheric loss
 *    - Lower frequency = more reliable, lower throughput
 *
 *
 *  ORBITAL INTERNET — WHAT YOU CAN DO:
 *  -----------------------------------
 *  AWS Ground Station is NOT continuous internet like Starlink.
 *  But you CAN build orbital internet-like behaviors:
 *
 *    1. Store-and-forward networks:
 *       Satellite collects → dumps during passes → AWS distributes globally.
 *
 *    2. Delay-Tolerant Networking (DTN):
 *       Perfect for remote sensors, oceans, polar regions, disaster zones.
 *
 *    3. Global broadcast:
 *       Satellite → AWS → CloudFront/S3/Kinesis → entire planet.
 *
 *    4. Orbital caching:
 *       Satellites carry:
 *         - compressed data
 *         - ML models
 *         - precomputed maps
 *         - sensor fusion results
 *
 *    5. Orbital ML inference:
 *       Satellites run:
 *         - object detection
 *         - anomaly detection
 *         - environmental classification
 *       Then downlink only results, not raw data.
 *
 *
 *  MULTI-SATELLITE CONSTELLATIONS — THE BIG LEAP:
 *  ----------------------------------------------
 *  AWS Ground Station supports multiple satellites.
 *
 *  You can:
 *    - Schedule passes across different orbits
 *    - Merge data from multiple spacecraft
 *    - Build a "virtual constellation"
 *    - Create global coverage patterns
 *    - Fuse optical + radar + IR data
 *
 *  Concept:
 *    "The sky becomes a distributed sensor network."
 *
 *
 *  ORBITAL DATA TYPES — WHAT SATELLITES SEND:
 *  ------------------------------------------
 *  Real satellites downlink:
 *    - Optical imagery
 *    - SAR (radar) imagery
 *    - Infrared / thermal data
 *    - AIS / ADS-B (ship/aircraft tracking)
 *    - Weather data
 *    - Environmental sensors
 *    - RF spectrum captures
 *    - Telemetry / health data
 *    - Command acknowledgements
 *
 *
 *  AWS GROUND STATION SETTINGS YOU SHOULD KNOW:
 *  --------------------------------------------
 *  1. Antenna selection:
 *       - Region
 *       - Antenna type
 *       - Frequency band
 *
 *  2. Mission profile:
 *       - Modulation
 *       - Coding
 *       - Polarization
 *       - Dataflow endpoints
 *
 *  3. Contact scheduling:
 *       - On-demand
 *       - Reserved
 *       - Predictive (based on orbital elements)
 *
 *  4. Dataflow configuration:
 *       - VPC
 *       - Subnets
 *       - Security groups
 *       - Routing tables
 *
 *  5. Downlink processing:
 *       - EC2
 *       - ECS
 *       - Lambda
 *       - Kinesis
 *
 *  6. Storage:
 *       - S3
 *       - Glacier
 *
 *
 *  ORBITAL IDEAS — WHAT YOU CAN DO IN SPACE:
 *  -----------------------------------------
 *  1. Orbital CDN:
 *       Cache data on satellites → broadcast during passes.
 *
 *  2. Orbital ML edge compute:
 *       Run inference in orbit → downlink only results.
 *
 *  3. Orbital sensor fusion:
 *       Combine optical + radar + IR + RF.
 *
 *  4. Orbital weather engine:
 *       Real-time atmospheric modeling from space.
 *
 *  5. Orbital RF mapping:
 *       Detect interference, jamming, illegal transmitters.
 *
 *  6. Orbital disaster response:
 *       Detect fires, floods, storms, earthquakes.
 *
 *  7. Orbital agriculture:
 *       Monitor crop health, soil moisture, irrigation.
 *
 *  8. Orbital maritime awareness:
 *       Track ships globally.
 *
 *  9. Orbital aviation awareness:
 *       Track aircraft globally.
 *
 *  10. Orbital timekeeping:
 *       Ultra-precise timing signals.
 *
 *
 *  THE BIG IDEA — WHY ORBIT MATTERS:
 *  ---------------------------------
 *  Orbit gives you:
 *    - Global perspective
 *    - Planet-scale sensing
 *    - Multi-region visibility
 *    - Disaster resilience
 *    - Independence from ground infrastructure
 *
 *  Orbit is the highest vantage point humanity has.
 *  AWS Ground Station is the bridge between that vantage point and your cloud.
 *
 * ============================================================================
 */
