// ============================================================================
// FILE: PulseOSPresence-v30-IMMORTAL++++.js
// PULSE OS PRESENCE ORGAN — v30.0-IMMORTAL++++
// OS-Level Presence • Deterministic • Metadata-Only • Membrane-Safe
// No Organs Exposed • No Identity Leaks • No Routing
// Dualband + Advantage + CoreMemory + Artery + Mesh-Presence-Aware
// ============================================================================
//
// LAWS (v30+IMMORTAL+PRESENCE+MESH+COREMEMORY):
//   • Presence organ is OS-level only — NOT a router, NOT a mesh brain.
//   • Emits metadata-only presence; never exposes organs, routes, CNS, or secrets.
//   • Never performs network calls, never talks to server directly.
//   • Internet center is Expansion ⇄ Server; Presence is a local field emitter.
//   • Binary-aware and dualband-aware, but symbolic-primary in semantics.
//   • Safe to broadcast into MeshBus / PresenceRelay as a self-presence packet.
//   • May carry advantage hints, but never computes or fetches advantage itPulseRealm.
//   • May carry CoreMemory references, but never dereferences or mutates them.
//   • All advantage/world-lens/topology are snapshots from Brain/Expansion, not here.
//   • Packet-aware + artery-aware: presence packets are deterministic and bounded.
//   • v30: presence density + advantage score harmonized with global PULSE_* fields.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});






// v30 meta kernel (epoch + evo)
const PresenceMeta = Object.freeze({
  id: "PulseOSPresence",
  layer: "A0", // OS-core presence layer
  role: "OS_PRESENCE_ORGAN",
  version: "30.0-IMMORTAL++++",
  epoch: "v30-IMMORTAL++++",
  evo: Object.freeze({
    presenceOrgan: true,
    osLevel: true,
    deterministic: true,
    driftProof: true,
    zeroTrustSurface: true,
    zeroSecrets: true,
    zeroRouting: true,
    zeroOrgans: true,

    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,

    meshAware: true,
    bluetoothPresenceAware: true,

    internetCenterExternal: true,
    snapshotOnlyInputs: true,
    advantageHintAware: true,
    meshPresenceHintAware: true,
    coreMemoryAware: true,
    multiInstanceReady: true,
    clusterCoherence: true,

    packetAware: true,
    arteryAware: true
  })
});

// ============================================================================
//  PRESENCE ORGAN — v30.0-IMMORTAL++++
// ============================================================================

export function createPulseOSPresence({
  SystemClock,       // uptime + organism age (safe, injected)
  IdentityDirectory, // safeName + safeId (no secrets)
  DeviceFingerprint, // safe, non-PII fingerprint (optional)
  CoreMemory,        // optional: { latestPresenceSnapshotId?: () => string | null }
  log,
  warn,
  error
}) {
  const meta = Object.freeze({
    layer: "PulseOSPresence",
    role: "OS_PRESENCE_ORGAN",
    version: "30.0-IMMORTAL++++",
    identity: "PulseOSPresence-v30.0-IMMORTAL++++",
    kernel: PresenceMeta,
    evo: Object.freeze({
      ...PresenceMeta.evo,
      epoch: PresenceMeta.epoch
    }),
    contract: Object.freeze({
      never: [
        "expose internal organs",
        "expose routing tables",
        "expose CNS",
        "expose private identity",
        "expose permissions",
        "expose OS internals",
        "dereference CoreMemory",
        "mutate CoreMemory"
      ],
      always: [
        "emit metadata-only presence",
        "stay deterministic",
        "stay membrane-safe",
        "stay binary-first",
        "stay read-only",
        "stay dualband-aware",
        "emit packet-scoped presence",
        "keep artery metrics bounded",
        "treat CoreMemory as opaque reference"
      ]
    })
  });

  // --------------------------------------------------------------------------
  // SAFE ACCESSORS
  // --------------------------------------------------------------------------
  function safeNow() {
    try {
      return typeof SystemClock.now === "function"
        ? SystemClock.now()
        : PulseRealm.PulseNOW;
    } catch {
      return PulseRealm.PulseNOW;
    }
  }

  function safeUptimeSeconds() {
    try {
      return typeof SystemClock.uptimeSeconds === "function"
        ? SystemClock.uptimeSeconds()
        : 0;
    } catch {
      return 0;
    }
  }

  function safeOrganismAgeDays() {
    try {
      return typeof SystemClock.organismAgeDays === "function"
        ? SystemClock.organismAgeDays()
        : 0;
    } catch {
      return 0;
    }
  }

  function safeDisplayName() {
    try {
      return typeof IdentityDirectory.safeName === "function"
        ? IdentityDirectory.safeName("self")
        : "PulseOS";
    } catch {
      return "PulseOS";
    }
  }

  function safePublicId() {
    try {
      return typeof IdentityDirectory.safeId === "function"
        ? IdentityDirectory.safeId("self")
        : "pulseos-self";
    } catch {
      return "pulseos-self";
    }
  }

  function safeFingerprint() {
    try {
      return typeof DeviceFingerprint.safeFingerprint === "function"
        ? DeviceFingerprint.safeFingerprint()
        : null;
    } catch {
      return null;
    }
  }

  // v30: optional global presence density + advantage score hints
  function clamp01(v) {
    const n = typeof v === "number" ? v : 0;
    if (n <= 0) return 0;
    if (n >= 1) return 1;
    return n;
  }

  function safePresenceDensity() {
    try {
     
        const v = PulseRealm.PULSE_PRESENCE_DENSITY;
        if (typeof v === "number") {
          return clamp01(v);
        }
      
    } catch {}
    return 0;
  }

  function safeAdvantageScore() {
    try {
      
        const v = PulseRealm.PULSE_ADVANTAGE_SCORE;
        if (typeof v === "number") {
          return clamp01(v);
        }
      
    } catch {}
    return 0;
  }

  // v30: local advantage hint (still metadata-only, no network)
  function safeAdvantageHint() {
    try {
      const injected =
        typeof SystemClock.advantageHint === "function"
          ? SystemClock.advantageHint()
          : null;

      if (injected && typeof injected === "object") {
        return {
          band: injected.band ?? "neutral",
          score: injected.score ?? null,
          stability: injected.stability ?? 1,
          ageMs: injected.ageMs ?? 0,
          source: injected.source ?? "injected",
          confidence: injected.confidence ?? 1,
          deviceTier: injected.deviceTier ?? "unknown",
          networkTier: injected.networkTier ?? "unknown",
          gpuTier: injected.gpuTier ?? "unknown"
        };
      }

      const score = safeAdvantageScore();

      return {
        band: score > 0 ? "advantaged" : "neutral",
        score,
        stability: 1,
        ageMs: 0,
        source: "os-presence",
        confidence: 1,
        deviceTier: "unknown",
        networkTier: "unknown",
        gpuTier: "unknown"
      };
    } catch {
      return {
        band: "neutral",
        score: null,
        stability: 1,
        ageMs: 0,
        source: "fallback",
        confidence: 1,
        deviceTier: "unknown",
        networkTier: "unknown",
        gpuTier: "unknown"
      };
    }
  }

  // v30: mesh presence hint (topology-only, no routing)
  function safeMeshPresenceHint() {
    return {
      topology: "local-os-core",
      band: "mesh",
      relayPreferred: true
    };
  }

  // v30: CoreMemory reference (opaque id only)
  function safeCoreMemoryRef() {
    try {
      if (CoreMemory && typeof CoreMemory.latestPresenceSnapshotId === "function") {
        return CoreMemory.latestPresenceSnapshotId() || null;
      }
      return null;
    } catch {
      return null;
    }
  }

  // --------------------------------------------------------------------------
  // ARTERY HELPERS (aligned with v30 membranes)
  // --------------------------------------------------------------------------
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

  function bucketCost(v) {
    if (v >= 0.8) return "heavy";
    if (v >= 0.5) return "moderate";
    if (v >= 0.2) return "light";
    if (v > 0) return "negligible";
    return "none";
  }

  // --------------------------------------------------------------------------
  // PRESENCE ARTERY — bounded, deterministic, metadata-only (v30)
  // --------------------------------------------------------------------------
  function computePresenceArtery() {
    const uptime = safeUptimeSeconds();
    const ageDays = safeOrganismAgeDays();

    const uptimeNorm = clamp01(uptime / (60 * 60 * 24)); // up to 1 day
    const ageNorm = clamp01(ageDays / 365);              // up to 1 year

    const presenceDensity = safePresenceDensity();
    const advantageScore = safeAdvantageScore();

    const stability = 1 - Math.abs(uptimeNorm - ageNorm) * 0.3;
    const drift = 0; // presence organ is drift-proof by contract

    const throughput = clamp01(0.7 + uptimeNorm * 0.3);
    const pressure = clamp01(
      0.1 +
      ageNorm * 0.2 +
      presenceDensity * 0.2 +
      advantageScore * 0.1
    );
    const cost = clamp01(pressure * (1 - throughput));
    const budget = clamp01(throughput - cost);

    return Object.freeze({
      throughput,
      throughputBucket: bucketLevel(throughput),

      pressure,
      pressureBucket: bucketPressure(pressure),

      cost,
      costBucket: bucketCost(cost),

      budget,
      budgetBucket: bucketLevel(budget),

      uptimeSeconds: uptime,
      organismAgeDays: ageDays,
      stability,
      drift,

      presenceDensity,
      advantageScore
    });
  }

  // --------------------------------------------------------------------------
  // PACKET EMITTER — deterministic, presence-scoped
  // --------------------------------------------------------------------------
  function emitPresencePacket(type, payload) {
    return Object.freeze({
      meta,
      packetType: `presence-${type}`,
      timestamp: safeNow(),
      epoch: meta.evo.epoch,
      ...payload
    });
  }

  // --------------------------------------------------------------------------
  // OS PRESENCE SIGNATURE (metadata-only, deterministic)
  // --------------------------------------------------------------------------
  function getPresenceSignature() {
    const now = safeNow();
    const uptime = safeUptimeSeconds();
    const ageDays = safeOrganismAgeDays();
    const displayName = safeDisplayName();
    const publicId = safePublicId();
    const fingerprint = safeFingerprint();
    const advantageHint = safeAdvantageHint();
    const meshHint = safeMeshPresenceHint();
    const coreMemoryRef = safeCoreMemoryRef();
    const artery = computePresenceArtery();

    return {
      meta,
      os: {
        displayName,
        publicId,
        fingerprint,
        version: meta.version
      },
      time: {
        now,
        uptimeSeconds: uptime,
        organismAgeDays: ageDays
      },
      presenceBand: "OS_CORE",
      bands: {
        symbolic: true,
        binary: true,
        default: "symbolic"
      },
      health: {
        status: "alive",
        stability: "stable",
        drift: "none"
      },
      mesh: {
        topologyHint: meshHint.topology,
        band: meshHint.band,
        relayPreferred: meshHint.relayPreferred
      },
      advantage: {
        band: advantageHint.band,
        score: advantageHint.score,
        deviceTier: advantageHint.deviceTier,
        networkTier: advantageHint.networkTier,
        gpuTier: advantageHint.gpuTier
      },
      coreMemory: {
        snapshotRef: coreMemoryRef
      },
      artery
    };
  }

  // --------------------------------------------------------------------------
  // SELF PRESENCE PACKET (for PresenceRelay / Mesh / HUD)
  // --------------------------------------------------------------------------
  function getSelfPresencePacket() {
    const sig = getPresenceSignature();
    return {
      uid: sig.os.publicId,
      displayName: sig.os.displayName,

      presenceBand: sig.presenceBand,

      uptimeSeconds: sig.time.uptimeSeconds,
      organismAgeDays: sig.time.organismAgeDays,

      fingerprint: sig.os.fingerprint,

      advantageHint: sig.advantage,
      meshPresenceHint: sig.mesh,

      coreMemoryRef: sig.coreMemory.snapshotRef,

      presenceArtery: sig.artery
    };
  }

  // --------------------------------------------------------------------------
  // SNAPSHOT PACKET — window-safe presence snapshot
  // --------------------------------------------------------------------------
  function snapshotPresence() {
    const sig = getPresenceSignature();
    return emitPresencePacket("snapshot", {
      signature: sig
    });
  }

  // --------------------------------------------------------------------------
  // HEARTBEAT — emits local presence packet (no network)
  // --------------------------------------------------------------------------
  function heartbeat() {
    try {
      const packet = getSelfPresencePacket();
      const wrapped = emitPresencePacket("heartbeat", {
        selfPresence: packet
      });
      log("presence", "OS heartbeat", wrapped);
      return wrapped;
    } catch (err) {
      warn("presence", "OS heartbeat failed", err);
      return null;
    }
  }

  return Object.freeze({
    meta,
    getPresenceSignature,
    getSelfPresencePacket,
    snapshotPresence,
    heartbeat
  });
}

// Default export for simple wiring
export const DefaultPulseOSPresence = {
  create: createPulseOSPresence
};

export default DefaultPulseOSPresence;
// ============================================================================
//  PulseOSPresence — IMMORTAL PSEUDO‑CLASS (v31++)
// ============================================================================

export const PulseOSPresence = (() => {
  // ------------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
  // ------------------------------------------------------------
  const lane = {
    SystemClock: null,
    IdentityDirectory: null,
    DeviceFingerprint: null,
    CoreMemory: null,
    log: console.log,
    warn: console.warn,
    error: console.error,
    meta: Object.freeze({
      layer: "PulseOSPresence",
      role: "OS_PRESENCE_ORGAN",
      version: "30.0-IMMORTAL++++",
      identity: "PulseOSPresence-v30.0-IMMORTAL++++",
      kernel: PresenceMeta,
      evo: Object.freeze({
        ...PresenceMeta.evo,
        epoch: PresenceMeta.epoch
      })
    })
  };

  // ------------------------------------------------------------
  // INIT
  // ------------------------------------------------------------
  const init = ({
    SystemClock,
    IdentityDirectory,
    DeviceFingerprint,
    CoreMemory,
    log = console.log,
    warn = console.warn,
    error = console.error
  } = {}) => {
    lane.SystemClock = SystemClock || null;
    lane.IdentityDirectory = IdentityDirectory || null;
    lane.DeviceFingerprint = DeviceFingerprint || null;
    lane.CoreMemory = CoreMemory || null;
    lane.log = log;
    lane.warn = warn;
    lane.error = error;
  };

  // ------------------------------------------------------------
  // SAFE ACCESSORS
  // ------------------------------------------------------------
  const safeNow = () => {
    try { return lane.SystemClock.now() ?? PulseRealm.PulseNOW; }
    catch { return PulseRealm.PulseNOW; }
  };

  const safeUptimeSeconds = () => {
    try { return lane.SystemClock.uptimeSeconds() ?? 0; }
    catch { return 0; }
  };

  const safeOrganismAgeDays = () => {
    try { return lane.SystemClock.organismAgeDays() ?? 0; }
    catch { return 0; }
  };

  const safeDisplayName = () => {
    try { return lane.IdentityDirectory.safeName("self") ?? "PulseOS"; }
    catch { return "PulseOS"; }
  };

  const safePublicId = () => {
    try { return lane.IdentityDirectory.safeId("self") ?? "pulseos-self"; }
    catch { return "pulseos-self"; }
  };

  const safeFingerprint = () => {
    try { return lane.DeviceFingerprint.safeFingerprint() ?? null; }
    catch { return null; }
  };

  const clamp01 = (v) => {
    const n = typeof v === "number" ? v : 0;
    return n <= 0 ? 0 : n >= 1 ? 1 : n;
  };

  const safePresenceDensity = () => {
    try {
      
        const v = PulseRealm.PULSE_PRESENCE_DENSITY;
        if (typeof v === "number") return clamp01(v);
      
    } catch {}
    return 0;
  };

  const safeAdvantageScore = () => {
    try {
      
        const v = PulseRealm.PULSE_ADVANTAGE_SCORE;
        if (typeof v === "number") return clamp01(v);
      
    } catch {}
    return 0;
  };

  const safeAdvantageHint = () => {
    try {
      const injected = lane.SystemClock.advantageHint();
      if (injected && typeof injected === "object") {
        return {
          band: injected.band ?? "neutral",
          score: injected.score ?? null,
          stability: injected.stability ?? 1,
          ageMs: injected.ageMs ?? 0,
          source: injected.source ?? "injected",
          confidence: injected.confidence ?? 1,
          deviceTier: injected.deviceTier ?? "unknown",
          networkTier: injected.networkTier ?? "unknown",
          gpuTier: injected.gpuTier ?? "unknown"
        };
      }

      const score = safeAdvantageScore();
      return {
        band: score > 0 ? "advantaged" : "neutral",
        score,
        stability: 1,
        ageMs: 0,
        source: "os-presence",
        confidence: 1,
        deviceTier: "unknown",
        networkTier: "unknown",
        gpuTier: "unknown"
      };
    } catch {
      return {
        band: "neutral",
        score: null,
        stability: 1,
        ageMs: 0,
        source: "fallback",
        confidence: 1,
        deviceTier: "unknown",
        networkTier: "unknown",
        gpuTier: "unknown"
      };
    }
  };

  const safeMeshPresenceHint = () => ({
    topology: "local-os-core",
    band: "mesh",
    relayPreferred: true
  });

  const safeCoreMemoryRef = () => {
    try {
      return lane.CoreMemory.latestPresenceSnapshotId() ?? null;
    } catch {
      return null;
    }
  };

  // ------------------------------------------------------------
  // ARTERY HELPERS
  // ------------------------------------------------------------
  const bucketLevel = (v) => {
    if (v >= 0.9) return "elite";
    if (v >= 0.75) return "high";
    if (v >= 0.5) return "medium";
    if (v >= 0.25) return "low";
    return "critical";
  };

  const bucketPressure = (v) => {
    if (v >= 0.9) return "overload";
    if (v >= 0.7) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0) return "low";
    return "none";
  };

  const bucketCost = (v) => {
    if (v >= 0.8) return "heavy";
    if (v >= 0.5) return "moderate";
    if (v >= 0.2) return "light";
    if (v > 0) return "negligible";
    return "none";
  };

  const computePresenceArtery = () => {
    const uptime = safeUptimeSeconds();
    const ageDays = safeOrganismAgeDays();

    const uptimeNorm = clamp01(uptime / 86400);
    const ageNorm = clamp01(ageDays / 365);

    const presenceDensity = safePresenceDensity();
    const advantageScore = safeAdvantageScore();

    const throughput = clamp01(0.7 + uptimeNorm * 0.3);
    const pressure = clamp01(
      0.1 + ageNorm * 0.2 + presenceDensity * 0.2 + advantageScore * 0.1
    );
    const cost = clamp01(pressure * (1 - throughput));
    const budget = clamp01(throughput - cost);

    return Object.freeze({
      throughput,
      throughputBucket: bucketLevel(throughput),
      pressure,
      pressureBucket: bucketPressure(pressure),
      cost,
      costBucket: bucketCost(cost),
      budget,
      budgetBucket: bucketLevel(budget),
      uptimeSeconds: uptime,
      organismAgeDays: ageDays,
      stability: 1,
      drift: 0,
      presenceDensity,
      advantageScore
    });
  };

  // ------------------------------------------------------------
  // PRESENCE SIGNATURE
  // ------------------------------------------------------------
  const getPresenceSignature = () => {
    const now = safeNow();
    const uptime = safeUptimeSeconds();
    const ageDays = safeOrganismAgeDays();
    const displayName = safeDisplayName();
    const publicId = safePublicId();
    const fingerprint = safeFingerprint();
    const advantageHint = safeAdvantageHint();
    const meshHint = safeMeshPresenceHint();
    const coreMemoryRef = safeCoreMemoryRef();
    const artery = computePresenceArtery();

    return {
      meta: lane.meta,
      os: {
        displayName,
        publicId,
        fingerprint,
        version: lane.meta.version
      },
      time: {
        now,
        uptimeSeconds: uptime,
        organismAgeDays: ageDays
      },
      presenceBand: "OS_CORE",
      bands: {
        symbolic: true,
        binary: true,
        default: "symbolic"
      },
      health: {
        status: "alive",
        stability: "stable",
        drift: "none"
      },
      mesh: {
        topologyHint: meshHint.topology,
        band: meshHint.band,
        relayPreferred: meshHint.relayPreferred
      },
      advantage: {
        band: advantageHint.band,
        score: advantageHint.score,
        deviceTier: advantageHint.deviceTier,
        networkTier: advantageHint.networkTier,
        gpuTier: advantageHint.gpuTier
      },
      coreMemory: {
        snapshotRef: coreMemoryRef
      },
      artery
    };
  };

  // ------------------------------------------------------------
  // PRESENCE FIELD
  // ------------------------------------------------------------
  const buildPresenceField = () => {
    const sig = getPresenceSignature();

    return Object.freeze({
      presenceBand: sig.presenceBand,
      displayName: sig.os.displayName,
      publicId: sig.os.publicId,
      fingerprint: sig.os.fingerprint,

      uptimeSeconds: sig.time.uptimeSeconds,
      organismAgeDays: sig.time.organismAgeDays,

      advantageBand: sig.advantage.band,
      advantageScore: sig.advantage.score,

      meshTopology: sig.mesh.topologyHint,
      meshRelayPreferred: sig.mesh.relayPreferred,

      coreMemoryRef: sig.coreMemory.snapshotRef,

      artery: sig.artery
    });
  };

  // ------------------------------------------------------------
  // SELF PRESENCE PACKET + SNAPSHOT + HEARTBEAT
  // ------------------------------------------------------------
  const getSelfPresencePacket = () => {
    const sig = getPresenceSignature();
    return {
      uid: sig.os.publicId,
      displayName: sig.os.displayName,
      presenceBand: sig.presenceBand,
      uptimeSeconds: sig.time.uptimeSeconds,
      organismAgeDays: sig.time.organismAgeDays,
      fingerprint: sig.os.fingerprint,
      advantageHint: sig.advantage,
      meshPresenceHint: sig.mesh,
      coreMemoryRef: sig.coreMemory.snapshotRef,
      presenceArtery: sig.artery
    };
  };

  const snapshotPresence = () => ({
    meta: lane.meta,
    packetType: "presence-snapshot",
    timestamp: safeNow(),
    signature: getPresenceSignature()
  });

  const heartbeat = () => {
    try {
      const packet = getSelfPresencePacket();
      const wrapped = {
        meta: lane.meta,
        packetType: "presence-heartbeat",
        timestamp: safeNow(),
        selfPresence: packet
      };
      lane.log("presence", "OS heartbeat", wrapped);
      return wrapped;
    } catch (err) {
      lane.warn("presence", "OS heartbeat failed", err);
      return null;
    }
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    meta: lane.meta,
    init,
    safeNow,
    safeUptimeSeconds,
    safeOrganismAgeDays,
    safeDisplayName,
    safePublicId,
    safeFingerprint,
    safePresenceDensity,
    safeAdvantageScore,
    safeAdvantageHint,
    safeMeshPresenceHint,
    safeCoreMemoryRef,
    computePresenceArtery,
    getPresenceSignature,
    buildPresenceField,
    getSelfPresencePacket,
    snapshotPresence,
    heartbeat
  };
})();

PulseRealm.OSPresence = {
  PulseOSPresence,
  createPulseOSPresence,
  PresenceMeta
}
PulseRealm.PulseOSPresence = PulseOSPresence;
PulseRealm.PulseOSPresenceBuild = createPulseOSPresence;