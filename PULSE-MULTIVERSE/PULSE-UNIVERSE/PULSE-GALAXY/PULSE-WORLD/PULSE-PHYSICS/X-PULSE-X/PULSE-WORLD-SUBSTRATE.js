// ============================================================================
// FILE: PulseWorldBinarySubstrate-v31.js
// ROOT:  PULSE-X
// LAYER: WorldBinary / BinarySubstrate / ThroughputFabric
// ----------------------------------------------------------------------------
// ROLE (v31 IMMORTAL-CONTINUANCE-ONEBAND):
//   • Pure binary frame substrate for PULSE-X v31.
//   • Extends v30 by adding continuance + navState + worldRuntimeFrame hints.
//   • Still no intel/signatures/device-profile — minimal, explicit tags only.
//   • Deterministic, pure compute, no IO.
// ----------------------------------------------------------------------------
// SUPPORTED PAYLOAD TYPES (same semantic family as v30):
//   - SNAPSHOT
//   - DELTA
//   - DEPLOYMENT_PLAN
//   - MULTI_PLAN
//   - EXECUTION_RESULT
//
// v31 ADDITIONS (all carried as metadata only):
//   - navState: { currentPageId, targetPageId, transitionState }
//   - continuance: { logicalClock, tick, bandUsage, cacheHits, cacheMisses }
//   - worldRuntimeFrameSummary: { hotPages, hotRoutes, hotGpu, hotProxy, hotEarn }
//   - oneBandMode: "one-band" | "dual-compatible"
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


// ============================================================================
// PAYLOAD TYPES — v31
// ============================================================================

export const BinaryPayloadTypeV31 = Object.freeze({
  SNAPSHOT: 1,
  DELTA: 2,
  DEPLOYMENT_PLAN: 3,
  MULTI_PLAN: 4,
  EXECUTION_RESULT: 5
});

export const BinaryPayloadTypeReverseV31 = Object.freeze({
  1: "SNAPSHOT",
  2: "DELTA",
  3: "DEPLOYMENT_PLAN",
  4: "MULTI_PLAN",
  5: "EXECUTION_RESULT"
});

// ============================================================================
// LOW-LEVEL ENCODING HELPERS (fixed-width length prefix, LE) — v31
// ============================================================================

function writeUint8(view, offset, value) {
  view.setUint8(offset, value & 0xff);
  return offset + 1;
}

function readUint8(view, offset) {
  return [view.getUint8(offset), offset + 1];
}

function encodeString(str) {
  const s = String(str ?? "");
  const utf8 = new TextEncoder().encode(s);
  const len = utf8.length;

  const buf = new ArrayBuffer(4 + len);
  const view = new DataView(buf);

  view.setUint32(0, len, true);
  new Uint8Array(buf, 4).set(utf8);

  return new Uint8Array(buf);
}

function decodeString(view, offset) {
  if (offset + 4 > view.byteLength) return ["", offset];
  const len = view.getUint32(offset, true);
  const start = offset + 4;
  const end = start + len;
  if (end > view.byteLength) return ["", end];

  const slice = new Uint8Array(view.buffer, view.byteOffset + start, len);
  const str = new TextDecoder().decode(slice);

  return [str, end];
}

// ============================================================================
// GENERIC NUMERIC HELPERS — v31
// ============================================================================

function clamp01(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

function safeNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

// ============================================================================
// SNAPSHOT PACKER (v31, binary-first, continuance-aware)
// ----------------------------------------------------------------------------
// snapshot = {
//   snapshotId,
//   instanceId,
//   lineageRootId,
//   logicalClock,
//   regionId,
//   hostName,
//   configVersion,
//   role,
//   mode,
//   healthFlags,
//   meta,
//   presence,
//   page,
//   chunkProfile,
//   identity,
//   trusted,
//   advantage,          // legacy string
//   band,               // "symbolic" | "binary" | "dual"
//   pulseTouch,         // { ... }
//
//   // v30 surfaces:
//   advantageTier,      // 0..3
//   advantageScore,     // 0..1
//   throughputClass,    // "throughput_extreme" | "high" | "normal" | "low"
//   throughputScore,    // 0..1
//   worldWaveIndex,
//   substrateLaneId,
//   substratePhaseIndex,
//   binaryDensity,
//   waveAmplitude,
//
//   // v31 additions (metadata only):
//   oneBandMode,        // "one-band" | "dual-compatible"
//   navState,           // { currentPageId, targetPageId, transitionState }
//   continuance,        // { logicalClock, tick, bandUsage, cacheHits, cacheMisses }
//   worldRuntimeFrameSummary // { hotPages, hotRoutes, hotGpu, hotProxy, hotEarn }
// }
// ============================================================================

export function packSnapshotV31(snapshot) {
  const {
    snapshotId = "",
    instanceId = "",
    lineageRootId = "",
    logicalClock = "",
    regionId = "",
    hostName = "",
    configVersion = "",
    role = "",
    mode = "",
    healthFlags = {},
    meta = {},
    presence = "",
    page = "",
    chunkProfile = "",
    identity = "",
    trusted = "",
    advantage = "",
    band = "dual",
    pulseTouch = {},

    advantageTier = 0,
    advantageScore = 0,
    throughputClass = "throughput_low",
    throughputScore = 0,
    worldWaveIndex = null,
    substrateLaneId = null,
    substratePhaseIndex = null,
    binaryDensity = 0,
    waveAmplitude = 0,

    oneBandMode = "one-band",
    navState = null,
    continuance = null,
    worldRuntimeFrameSummary = null
  } = snapshot || {};

  const healthFlagsStr = JSON.stringify(healthFlags || {});
  const metaStr = JSON.stringify(meta || {});
  const touchMetaStr = JSON.stringify(pulseTouch || {});

  const frameMeta = {
    tag: "SNAPSHOT",
    band,
    payloadType: BinaryPayloadTypeV31.SNAPSHOT,
    advantageTier,
    advantageScore,
    throughputClass,
    throughputScore,
    worldWaveIndex,
    substrateLaneId,
    substratePhaseIndex,
    binaryDensity,
    waveAmplitude,
    oneBandMode,
    navState: navState || null,
    continuance: continuance || null,
    worldRuntimeFrameSummary: worldRuntimeFrameSummary || null
  };

  const frameMetaStr = JSON.stringify(frameMeta);

  const fields = [
    snapshotId,
    instanceId,
    lineageRootId,
    String(logicalClock),
    regionId,
    hostName,
    configVersion,
    role,
    mode,
    healthFlagsStr,
    metaStr,
    presence,
    page,
    chunkProfile,
    identity,
    trusted,
    advantage,
    band,
    touchMetaStr,
    frameMetaStr
  ];

  const encoded = fields.map(encodeString);
  const totalSize = 1 + encoded.reduce((s, f) => s + f.length, 0);

  const buf = new ArrayBuffer(totalSize);
  const view = new DataView(buf);
  let o = 0;

  o = writeUint8(view, o, BinaryPayloadTypeV31.SNAPSHOT);

  for (const ef of encoded) {
    new Uint8Array(buf, o).set(ef);
    o += ef.length;
  }

  return new Uint8Array(buf);
}

// ============================================================================
// DELTA PACKER (v31)
// ----------------------------------------------------------------------------
// delta = {
//   instanceId,
//   snapshotBeforeId,
//   snapshotAfterId,
//   changes,
//   pulseTouch,
//   band,
//
//   // v30 surfaces:
//   advantageTier,
//   advantageScore,
//   throughputClass,
//   throughputScore,
//   worldWaveIndex,
//   substrateLaneId,
//   substratePhaseIndex,
//   binaryDensity,
//   waveAmplitude,
//
//   // v31 additions:
//   oneBandMode,
//   navState,
//   continuance,
//   worldRuntimeFrameSummary
// }
// ============================================================================

export function packDeltaV31(delta) {
  const {
    instanceId = "",
    snapshotBeforeId = "",
    snapshotAfterId = "",
    changes = {},
    pulseTouch = {},
    band = "dual",

    advantageTier = 0,
    advantageScore = 0,
    throughputClass = "throughput_low",
    throughputScore = 0,
    worldWaveIndex = null,
    substrateLaneId = null,
    substratePhaseIndex = null,
    binaryDensity = 0,
    waveAmplitude = 0,

    oneBandMode = "one-band",
    navState = null,
    continuance = null,
    worldRuntimeFrameSummary = null
  } = delta || {};

  const changesStr = JSON.stringify(changes || {});
  const touchMetaStr = JSON.stringify(pulseTouch || {});

  const frameMeta = {
    tag: "DELTA",
    band,
    payloadType: BinaryPayloadTypeV31.DELTA,
    advantageTier,
    advantageScore,
    throughputClass,
    throughputScore,
    worldWaveIndex,
    substrateLaneId,
    substratePhaseIndex,
    binaryDensity,
    waveAmplitude,
    oneBandMode,
    navState: navState || null,
    continuance: continuance || null,
    worldRuntimeFrameSummary: worldRuntimeFrameSummary || null
  };

  const frameMetaStr = JSON.stringify(frameMeta);

  const fields = [
    instanceId,
    snapshotBeforeId,
    snapshotAfterId,
    changesStr,
    touchMetaStr,
    band,
    frameMetaStr
  ];

  const encoded = fields.map(encodeString);
  const totalSize = 1 + encoded.reduce((s, f) => s + f.length, 0);

  const buf = new ArrayBuffer(totalSize);
  const view = new DataView(buf);
  let o = 0;

  o = writeUint8(view, o, BinaryPayloadTypeV31.DELTA);

  for (const ef of encoded) {
    new Uint8Array(buf, o).set(ef);
    o += ef.length;
  }

  return new Uint8Array(buf);
}

// ============================================================================
// DEPLOYMENT PLAN PACKER (v31)
// ----------------------------------------------------------------------------
// plan = {
//   instanceId,
//   actions: [{ type, regionId, hostName, patch, meta }],
//   pulseTouch,
//   band,
//
//   // v30 surfaces:
//   advantageTier,
//   advantageScore,
//   throughputClass,
//   throughputScore,
//   worldWaveIndex,
//   substrateLaneId,
//   substratePhaseIndex,
//   binaryDensity,
//   waveAmplitude,
//
//   // v31 additions:
//   oneBandMode,
//   navState,
//   continuance,
//   worldRuntimeFrameSummary
// }
// ============================================================================

export function packDeploymentPlanV31(plan) {
  const {
    instanceId = "",
    actions = [],
    pulseTouch = {},
    band = "symbolic",

    advantageTier = 0,
    advantageScore = 0,
    throughputClass = "throughput_low",
    throughputScore = 0,
    worldWaveIndex = null,
    substrateLaneId = null,
    substratePhaseIndex = null,
    binaryDensity = 0,
    waveAmplitude = 0,

    oneBandMode = "one-band",
    navState = null,
    continuance = null,
    worldRuntimeFrameSummary = null
  } = plan || {};

  const actionsStr = JSON.stringify(
    (actions || []).map((a) => ({
      t: a.type,
      r: a.regionId || "",
      h: a.hostName || "",
      p: a.patch || null,
      m: a.meta || null
    }))
  );

  const touchMetaStr = JSON.stringify(pulseTouch || {});

  const frameMeta = {
    tag: "DEPLOYMENT_PLAN",
    band,
    payloadType: BinaryPayloadTypeV31.DEPLOYMENT_PLAN,
    advantageTier,
    advantageScore,
    throughputClass,
    throughputScore,
    worldWaveIndex,
    substrateLaneId,
    substratePhaseIndex,
    binaryDensity,
    waveAmplitude,
    oneBandMode,
    navState: navState || null,
    continuance: continuance || null,
    worldRuntimeFrameSummary: worldRuntimeFrameSummary || null
  };

  const frameMetaStr = JSON.stringify(frameMeta);

  const fields = [
    instanceId,
    actionsStr,
    touchMetaStr,
    band,
    frameMetaStr
  ];

  const encoded = fields.map(encodeString);
  const totalSize = 1 + encoded.reduce((s, f) => s + f.length, 0);

  const buf = new ArrayBuffer(totalSize);
  const view = new DataView(buf);
  let o = 0;

  o = writeUint8(view, o, BinaryPayloadTypeV31.DEPLOYMENT_PLAN);

  for (const ef of encoded) {
    new Uint8Array(buf, o).set(ef);
    o += ef.length;
  }

  return new Uint8Array(buf);
}

// ============================================================================
// MULTI-ORGANISM PLAN PACKER (v31)
// ----------------------------------------------------------------------------
// multiPlan = {
//   instances: [{
//     instanceId,
//     deploymentPlan: { actions: [...] },
//     pulseTouch,
//     band
//   }],
//   band,
//
//   // v30 surfaces:
//   advantageTier,
//   advantageScore,
//   throughputClass,
//   throughputScore,
//   worldWaveIndex,
//   substrateLaneId,
//   substratePhaseIndex,
//   binaryDensity,
//   waveAmplitude,
//
//   // v31 additions:
//   oneBandMode,
//   navState,
//   continuance,
//   worldRuntimeFrameSummary
// }
// ============================================================================

export function packMultiOrganismPlanV31(multiPlan, defaultBand = "symbolic") {
  const band = multiPlan.band || defaultBand || "symbolic";

  const {
    advantageTier = 0,
    advantageScore = 0,
    throughputClass = "throughput_low",
    throughputScore = 0,
    worldWaveIndex = null,
    substrateLaneId = null,
    substratePhaseIndex = null,
    binaryDensity = 0,
    waveAmplitude = 0,

    oneBandMode = "one-band",
    navState = null,
    continuance = null,
    worldRuntimeFrameSummary = null
  } = multiPlan || {};

  const instancesPayload = (multiPlan.instances || []).map((bundle) => ({
    id: bundle.instanceId,
    plan: (bundle.deploymentPlan.actions || []).map((a) => ({
      t: a.type,
      r: a.regionId || "",
      h: a.hostName || "",
      p: a.patch || null,
      m: a.meta || null
    })),
    touch: bundle.pulseTouch || bundle.touch || null,
    band: bundle.band || band
  }));

  const baseFields = [
    JSON.stringify(instancesPayload),
    band
  ];

  const frameMeta = {
    tag: "MULTI_PLAN",
    band,
    payloadType: BinaryPayloadTypeV31.MULTI_PLAN,
    advantageTier,
    advantageScore,
    throughputClass,
    throughputScore,
    worldWaveIndex,
    substrateLaneId,
    substratePhaseIndex,
    binaryDensity,
    waveAmplitude,
    oneBandMode,
    navState: navState || null,
    continuance: continuance || null,
    worldRuntimeFrameSummary: worldRuntimeFrameSummary || null
  };

  const frameMetaStr = JSON.stringify(frameMeta);

  const fields = [...baseFields, frameMetaStr];
  const encoded = fields.map(encodeString);
  const totalSize = 1 + encoded.reduce((s, f) => s + f.length, 0);

  const buf = new ArrayBuffer(totalSize);
  const view = new DataView(buf);
  let o = 0;

  o = writeUint8(view, o, BinaryPayloadTypeV31.MULTI_PLAN);

  for (const ef of encoded) {
    new Uint8Array(buf, o).set(ef);
    o += ef.length;
  }

  return new Uint8Array(buf);
}

// ============================================================================
// EXECUTION RESULT PACKER (v31)
// ----------------------------------------------------------------------------
// exec = {
//   instanceId,
//   newState,
//   logs,
//   pulseTouch,
//   band,
//
//   // v30 metadata surfaces:
//   advantageTier,
//   advantageScore,
//   throughputClass,
//   throughputScore,
//   worldWaveIndex,
//   substrateLaneId,
//   substratePhaseIndex,
//   binaryDensity,
//   waveAmplitude,
//
//   // v31 additions:
//   oneBandMode,
//   navState,
//   continuance,
//   worldRuntimeFrameSummary
// }
// ============================================================================

export function packExecutionResultV31(exec) {
  const touch = exec.pulseTouch || exec.touch || {};
  const band = exec.band || touch.band || "binary";

  const {
    advantageTier = 0,
    advantageScore = 0,
    throughputClass = "throughput_low",
    throughputScore = 0,
    worldWaveIndex = null,
    substrateLaneId = null,
    substratePhaseIndex = null,
    binaryDensity = 0,
    waveAmplitude = 0,

    oneBandMode = "one-band",
    navState = null,
    continuance = null,
    worldRuntimeFrameSummary = null
  } = exec || {};

  const touchMeta = touch && Object.keys(touch).length > 0 ? touch : null;

  const frameMeta = {
    tag: "EXECUTION_RESULT",
    band,
    payloadType: BinaryPayloadTypeV31.EXECUTION_RESULT,
    advantageTier,
    advantageScore,
    throughputClass,
    throughputScore,
    worldWaveIndex,
    substrateLaneId,
    substratePhaseIndex,
    binaryDensity,
    waveAmplitude,
    oneBandMode,
    navState: navState || null,
    continuance: continuance || null,
    worldRuntimeFrameSummary: worldRuntimeFrameSummary || null
  };

  const frameMetaStr = JSON.stringify(frameMeta);

  const baseFields = [
    exec.instanceId || "",
    JSON.stringify(exec.newState || {}),
    JSON.stringify(exec.logs || []),
    JSON.stringify(touchMeta || {}),
    band,
    frameMetaStr
  ];

  const encoded = baseFields.map(encodeString);
  const totalSize = 1 + encoded.reduce((s, f) => s + f.length, 0);

  const buf = new ArrayBuffer(totalSize);
  const view = new DataView(buf);
  let o = 0;

  o = writeUint8(view, o, BinaryPayloadTypeV31.EXECUTION_RESULT);

  for (const ef of encoded) {
    new Uint8Array(buf, o).set(ef);
    o += ef.length;
  }

  return new Uint8Array(buf);
}

// ============================================================================
// UNPACKER (v31 IMMORTAL-CONTINUANCE)
// ----------------------------------------------------------------------------
// • Pure binary unpacker.
// • Reads exactly what v31 packers write.
// • All v31 additions live inside frameMeta.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



export function unpackBinaryPayloadV31(uint8) {
  if (!uint8) return null;

  const view = new DataView(uint8.buffer, uint8.byteOffset, uint8.byteLength);
  let o = 0;

  const [type, o2] = readUint8(view, o);
  o = o2;

  const tag = BinaryPayloadTypeReverseV31[type] || "UNKNOWN";

  const fields = [];
  while (o < view.byteLength) {
    const [str, next] = decodeString(view, o);
    fields.push(str);
    o = next;
  }

  switch (tag) {
    case "SNAPSHOT": {
      const [
        snapshotId,
        instanceId,
        lineageRootId,
        logicalClock,
        regionId,
        hostName,
        configVersion,
        role,
        mode,
        healthFlagsStr,
        metaStr,
        presence,
        page,
        chunkProfile,
        identity,
        trusted,
        advantage,
        band,
        touchMetaStr,
        frameMetaStr
      ] = fields;

      return {
        payloadType: "SNAPSHOT",
        snapshotId,
        instanceId,
        lineageRootId,
        logicalClock,
        regionId,
        hostName,
        configVersion,
        role,
        mode,
        healthFlags: JSON.parse(healthFlagsStr || "{}"),
        meta: JSON.parse(metaStr || "{}"),
        presence,
        page,
        chunkProfile,
        identity,
        trusted,
        advantage,
        band,
        pulseTouch: JSON.parse(touchMetaStr || "{}"),
        frameMeta: JSON.parse(frameMetaStr || "{}")
      };
    }

    case "DELTA": {
      const [
        instanceId,
        snapshotBeforeId,
        snapshotAfterId,
        changesStr,
        touchMetaStr,
        band,
        frameMetaStr
      ] = fields;

      return {
        payloadType: "DELTA",
        instanceId,
        snapshotBeforeId,
        snapshotAfterId,
        changes: JSON.parse(changesStr || "{}"),
        pulseTouch: JSON.parse(touchMetaStr || "{}"),
        band,
        frameMeta: JSON.parse(frameMetaStr || "{}")
      };
    }

    case "DEPLOYMENT_PLAN": {
      const [
        instanceId,
        actionsStr,
        touchMetaStr,
        band,
        frameMetaStr
      ] = fields;

      return {
        payloadType: "DEPLOYMENT_PLAN",
        instanceId,
        actions: JSON.parse(actionsStr || "[]"),
        pulseTouch: JSON.parse(touchMetaStr || "{}"),
        band,
        frameMeta: JSON.parse(frameMetaStr || "{}")
      };
    }

    case "MULTI_PLAN": {
      const [
        instancesStr,
        band,
        frameMetaStr
      ] = fields;

      return {
        payloadType: "MULTI_PLAN",
        instances: JSON.parse(instancesStr || "[]"),
        band,
        frameMeta: JSON.parse(frameMetaStr || "{}")
      };
    }

    case "EXECUTION_RESULT": {
      const [
        instanceId,
        newStateStr,
        logsStr,
        touchMetaStr,
        band,
        frameMetaStr
      ] = fields;

      return {
        payloadType: "EXECUTION_RESULT",
        instanceId,
        newState: JSON.parse(newStateStr || "{}"),
        logs: JSON.parse(logsStr || "[]"),
        pulseTouch: JSON.parse(touchMetaStr || "{}"),
        band,
        frameMeta: JSON.parse(frameMetaStr || "{}")
      };
    }

    default:
      return { error: "Unknown payload type (v31)", rawTag: tag, fields };
  }
}

// ============================================================================
// EXPORTED API (v31 IMMORTAL-CONTINUANCE)
// ============================================================================

const BinarySubstrateV31 = {
  BinaryPayloadType: BinaryPayloadTypeV31,
  BinaryPayloadTypeReverse: BinaryPayloadTypeReverseV31,
  packSnapshotV31,
  packDeltaV31,
  packDeploymentPlanV31,
  packMultiOrganismPlanV31,
  packExecutionResultV31,
  unpackBinaryPayloadV31
};

export const BinarySubstrate = BinarySubstrateV31;

export function createBinarySubstrate(config = {}) {

  /**
   * Pack an organism definition into a binary image.
   * Kernel doesn't care about the symbolic shape — only that
   * the substrate returns a Uint8Array.
   */
  function packOrganism(organismDefinition) {
    // OrganismDefinition MUST contain a snapshot-like structure.
    // We treat it as a v31 SNAPSHOT.
    return packSnapshotV31(organismDefinition);
  }

  /**
   * Restore an organism from a binary snapshot.
   * Returns a handle the Kernel can execute.
   */
  function restoreOrganism(snapshotBinary) {
    const unpacked = unpackBinaryPayloadV31(snapshotBinary);

    if (!unpacked || unpacked.payloadType !== "SNAPSHOT") {
      throw new Error("Substrate v31: restoreOrganism() expected SNAPSHOT payload");
    }

    return {
      type: "organism",
      snapshot: unpacked,
      binary: snapshotBinary
    };
  }

  /**
   * Produce a stable snapshot of the organism.
   * Kernel uses this for continuance, migration, replay.
   */
  function snapshotOrganism(organismHandle, options = {}) {
    if (!organismHandle || !organismHandle.snapshot) {
      throw new Error("Substrate v31: invalid organismHandle for snapshot");
    }

    // Repack the snapshot using v31 packer
    return packSnapshotV31(organismHandle.snapshot);
  }

  /**
   * Optional: pack deltas, plans, execution results.
   * Kernel may not use these directly, but World/Hosting layers will.
   */
  function packDelta(delta) {
    return packDeltaV31(delta);
  }

  function packDeploymentPlan(plan) {
    return packDeploymentPlanV31(plan);
  }

  function packMultiPlan(multiPlan) {
    return packMultiOrganismPlanV31(multiPlan);
  }

  function packExecutionResult(exec) {
    return packExecutionResultV31(exec);
  }

  /**
   * Expose the raw unpacker for higher layers.
   */
  function unpack(binary) {
    return unpackBinaryPayloadV31(binary);
  }

  /**
   * Substrate surface returned to Kernel.
   */
  const substrate = {
    packOrganism,
    restoreOrganism,
    snapshotOrganism,

    // Optional extended surfaces:
    packDelta,
    packDeploymentPlan,
    packMultiPlan,
    packExecutionResult,
    unpack,

    // Raw v31 packers/unpackers if needed
    BinarySubstrate
  };

  return Object.freeze(substrate);
}

PulseRealm.WorldSubstrate = {
  createBinarySubstrate,
  unpackBinaryPayloadV31,
  packExecutionResultV31,
  packMultiOrganismPlanV31,
  packDeltaV31,
  packDeploymentPlanV31,
  packSnapshotV31
}