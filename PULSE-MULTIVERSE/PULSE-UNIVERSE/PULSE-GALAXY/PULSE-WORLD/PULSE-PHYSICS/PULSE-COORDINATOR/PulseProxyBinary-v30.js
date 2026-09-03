// ============================================================================
//  BinaryProxy-v30-IMMORTAL+++ONEBAND.js
//  PURE BINARY NERVE ROOT — v30++ IMMORTAL ONEBAND ADVANTAGE EDITION
//  + CACHE/CHUNK/PRESENCE/PREWARM/ADVANTAGE ENVELOPES (DETERMINISTIC META)
//  + RESOURCE/IMPULSE/ROUTER-MEMORY/PNS/PHYSIO/AGENT ENVELOPES (META-ONLY)
//  + UNIFIED ONEBAND FIELD (meshBand/pulseBand/oneBand) DOWN THE SPINE
//  + GPU/EARN/PRESENCE/MESH-TIER/LONG-RANGE/BT-PRESENCE AWARE (META-ONLY)
//  + PROXY MODE BAND (ADDON-ONLY, BINARY-SAFE TAP, PRESSURE-AWARE)
// ============================================================================
//  ROLE:
//    - Accept ONLY pure binary arrays (0/1).
//    - Encode using BinaryAgent (encoder).
//    - Exchange using encoder.process() (cortex / binary brain).
//    - Emit ONEBAND bandField + A‑B‑A bandSignature + binaryField + waveField.
//    - Emit cacheChunk + presence + prewarm + advantage envelopes (meta-only).
//    - Emit resourcePressure + impulseSpeed + routerMemory + PNS envelopes.
//    - Emit physiology + limbic + agents envelopes (meta-only).
//    - Deterministic fallback to symbolic proxy (PulseProxy / OS proxy).
//    - Expose Proxy Mode band for OS-level proxy / Pulse-Pal (addon-only).
//
//  ARCHITECTURE LAW (v30++ IMMORTAL ONEBAND):
//    - Binary adds ONLY binary representation + binary meta envelopes.
//    - No routing, no lineage, no patterns, no evolution logic here.
//    - No JSON except internal ops. No external objects.
//    - No randomness, no drift, no mutation of external state.
//    - All envelopes are deterministic, replayable, cache/prewarm aware.
//    - ONEBAND is unified: meshBand/pulseBand/oneBand always coherent.
//    - Proxy Mode is ADDON-ONLY: tap-only, no routing, no OS logic here.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

import { PulseVitalsLogger, PulseVitalsMonitor, PulseUIFlow, PulseUIErrors, log, warn, error,  PulseProofReflex, PulseUIRouteMemory, PulsePageScanner} from "../../../../../_PROOF/PULSE-PROOF.js";
import {pulseHeartOnce as PulseProxyHeart} from "./PulseProxyHeart-v30.js";
import {PulseUpdate as PulseProxyBloodPressure} from "./PulseProxyBloodPressure-v30.js";
import {PulseCirculatorySystem as PulseProxyCirculatorySystem} from "./PulseProxyCirculatorySystem-v30.js";

import {runUserScoring as PulseProxyHypothalamus} from "./PulseProxyHypothalamus-v30.js";
import {pulseProxySpineSnapshot as PulseProxySpine} from "./PulseProxySpine-v30.js";

// v30++: unified one-band PulseBand (symbolic+binary+mesh-aware)
import {pulseband} from "../PULSE-BAND/PULSE-BAND.js";   // unified PNS / one-band
import {pulseSynapse as PulseProxySynapse} from "./PulseProxySynapse-v30.js";          // Synapse junctions

import { PulseClient, PulseNet, PULSE_LIMBIC_SHADOW_META } from "./PulseProxyLimbic-v30.js";

import { scanUserScoresForInstanceHints, checkProxyHealthAndMetrics} from "./PulseProxyWBCells-v30.js";
import { pulseHistoryRepair, cleanupSessionsBefore, cleanupErrorsBefore, cleanupRedownloadsBefore, PulseProxyPNSNervousSystemBinary } from "../Pulse-Coordinator/PulseProxyPNSNervousSystem-v40.js";

import {PulseProxyOuterAgent} from "./PulseProxyOuterAgent-v30.js";
import {createPulseProxyInnerAgent} from "./PulseProxyInnerAgent-v30.js";

import {createImpulse as PulseProxyImpulse} from "./PulseProxyImpulse-v30.js";

import {PulseTelemetryOneBand as PulseProxyBloodstream} from "./PulseProxyBloodStream-v30.js";

import {runInstanceOrchestrator as PulseProxyAdrenalSystem} from "./PulseProxyAdrenalSystem-v30.js";

import {identity as PulseProxyBBB} from "./PulseProxyBBB-v30.js";

// --- PULSE-CORE MEMORY SPINE (FULL SPINE) ----------------------------------
import { PulseCoreGMemory} from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";


// CoreMemory bridge: structural, deterministic, keyed by memory surfaces.
export const CoreMemory = Object.freeze({
  raw: () => PulseCoreGMemory
});

// ---------------------------------------------------------------------------
// META — IMMORTAL BINARY NERVE ROOT v30++ ONEBAND
// ---------------------------------------------------------------------------
export const PulseOSBinaryProxyMeta = Object.freeze({
  layer: "BinaryProxy",
  role: "PURE_BINARY_NERVE_ROOT",
  version: "v30-IMMORTAL+++ONEBAND",
  target: "full-mesh",
  selfRepairable: true,
  evo: {
    dualMode: true,
    binaryAware: true,
    symbolicAware: true,
    presenceAware: true,
    bandAware: true,
    localAware: true,
    internetAware: true,

    // ONEBAND / MESH-BAND / PULSE-BAND
    oneBandAware: true,
    meshBandAware: true,
    pulseBandAware: true,
    unifiedBandField: true,

    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    driftProof: true,
    multiInstanceReady: true,

    unifiedAdvantageField: true,
    deterministicField: true,
    futureEvolutionReady: true,

    signalFactoringAware: true,
    meshPressureAware: true,
    auraPressureAware: true,
    flowAware: true,
    driftAware: true,

    meshTierAware: true,
    longRangeAware: true,
    bluetoothPresenceAware: true,
    gpuAware: true,
    earnAware: true,

    zeroCompute: true,
    zeroMutation: true,
    zeroRoutingInfluence: true
  }
});

export const BinaryProxyRole = "PURE_BINARY_NERVE_ROOT";

// ---------------------------------------------------------------------------
// HEALING STATE — IMMORTAL BINARY NERVE ROOT
// ---------------------------------------------------------------------------
const BinaryProxyHealingState = {
  layer: "BinaryProxy",
  role: "PURE_BINARY_NERVE_ROOT",
  version: "v30-IMMORTAL+++ONEBAND",
  lastCycle: 0,
  lastDir: null,
  lastBandSignature: null,
  lastBinarySurface: null,
  lastWaveField: null,
  lastAdvantageScoreHint: 1.0,
  lastResourcePressure: null,
  lastImpulseSpeedBand: null,
  lastRouterMemoryHint: null,
  lastPnsHint: null,
  lastOneBandField: null,
  cycleCount: 0,
  proxyModeEnabled: false
};

export function getBinaryProxyHealingState() {
  return { ...BinaryProxyHealingState };
}

// ---------------------------------------------------------------------------
// BINARY PROXY FACTORY (v30++ with ONEBAND + Proxy Mode band)
// ---------------------------------------------------------------------------
export function createBinaryProxy({
  encoder,
  fallbackProxyFactory,
  trace = false,
  proxyModeAdapter = null,   // OS-level proxy / Pulse-Pal hook (addon-only)
  oneBandContext = null      // optional: { oneBand, meshBand, pulseBand, earnTier, gpuTier, meshTier, longRangeCandidate, bluetoothPresence }
// eslint-disable-next-line no-unused-vars
} = {}) {
  if (!encoder) {
    throw new Error("BinaryProxy requires a BinaryAgent encoder");
  }

  let cycle = 0;
  const history = [];
  let proxyModeEnabled = !!proxyModeAdapter;

  // -------------------------------------------------------------------------
  //  SAFETY: PURE BINARY ONLY
  // -------------------------------------------------------------------------
  function isPureBinary(bits) {
    if (!Array.isArray(bits)) return false;
    for (let i = 0; i < bits.length; i++) {
      if (bits[i] !== 0 && bits[i] !== 1) return false;
    }
    return true;
  }

  function ensurePureBinaryOrFallback(op, bits, reason) {
    if (!isPureBinary(bits)) {
      return fallback(op, bits, reason);
    }
    return bits;
  }

  // -------------------------------------------------------------------------
  //  ONEBAND FIELD (unified band for mesh/pulse/one)
// -------------------------------------------------------------------------
  function buildOneBandField(dir) {
    const ctx = oneBandContext || {};
    const explicitOneBand =
      ctx.oneBand || ctx.meshBand || ctx.pulseBand || null;

    const oneBand = explicitOneBand || "one";

    const meshBand = oneBand;
    const pulseBand = oneBand;

    const earnTier = ctx.earnTier || "base";   // base | boosted | premium
    const gpuTier = ctx.gpuTier || "cool";     // cool | warm | hot
    const meshTier = ctx.meshTier || "host";   // host | satellite | relay

    const longRangeCandidate = !!ctx.longRangeCandidate;
    const bluetoothPresence = ctx.bluetoothPresence || null;

    const bandSignature = encoder.hash(
      `ONEBAND_FIELD::${oneBand}::${meshBand}::${pulseBand}::${earnTier}::${gpuTier}::${meshTier}::${longRangeCandidate ? "1" : "0"}::${cycle}`
    );

    const btSignature = bluetoothPresence
      ? encoder.hash(
          `ONEBAND_BT::${bluetoothPresence.deviceId || "none"}::${bluetoothPresence.transport || "none"}::${bluetoothPresence.proximityTier || "none"}::${cycle}`
        )
      : null;

    const field = {
      oneBand,
      meshBand,
      pulseBand,
      earnTier,
      gpuTier,
      meshTier,
      longRangeCandidate,
      bluetoothPresence: bluetoothPresence
        ? {
            deviceId: bluetoothPresence.deviceId || null,
            proximityTier: bluetoothPresence.proximityTier || null,
            transport: bluetoothPresence.transport || null,
            linkQuality: bluetoothPresence.linkQuality ?? null
          }
        : null,
      bandSignature,
      bluetoothSignature: btSignature
    };

    BinaryProxyHealingState.lastOneBandField = field;
    return field;
  }

  // -------------------------------------------------------------------------
  //  A‑B‑A SURFACES (binary-only phenotype, deterministic)
// -------------------------------------------------------------------------
  function buildBandSignature() {
    return encoder.hash("binary-band-v30-immortal-oneband");
  }

  function buildBinaryField() {
    const patternLen = 16;
    const density = patternLen + cycle + 128; // v30: slightly higher density
    const surface = density + patternLen;

    return {
      binaryPhenotypeSignature: encoder.hash(`BINARY_PHENO::${surface}`),
      binarySurfaceSignature: encoder.hash(`BINARY_SURF::${surface}`),
      binarySurface: { patternLen, density, surface },
      parity: surface % 2 === 0 ? 0 : 1,
      shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
    };
  }

  function buildWaveField() {
    const amplitude = (cycle + 1) * 24; // v30: slightly stronger wave
    const wavelength = amplitude + 12;
    const phase = amplitude % 48;

    return {
      amplitude,
      wavelength,
      phase,
      band: "binary",
      mode: "compression-wave"
    };
  }

  function buildCycleSignature() {
    return encoder.hash(`BINARY_PROXY_CYCLE::${cycle}::v30`);
  }

  // -------------------------------------------------------------------------
  //  v16+ CACHE/CHUNK/PRESENCE/PREWARM/ADVANTAGE ENVELOPES (META-ONLY)
// -------------------------------------------------------------------------
  function buildCacheChunkEnvelope(dir) {
    const chunkId = encoder.hash(`BINARY_CHUNK_ID::${dir}::${cycle}::v30`);
    const chunkBandSignature = encoder.hash(`BINARY_CHUNK_BAND::${cycle}::v30`);
    const chunkSurface = encoder.hash(`BINARY_CHUNK_SURF::${cycle}::v30`);

    return {
      cacheChunkId: chunkId,
      cacheChunkBandSignature: chunkBandSignature,
      cacheChunkSurfaceSignature: chunkSurface
    };
  }

  function buildPresenceEnvelope(dir) {
    const presenceId = encoder.hash(`BINARY_PRESENCE_ID::${dir}::${cycle}::v30`);
    const presenceSignature = encoder.hash(`BINARY_PRESENCE_SIG::${cycle}::v30`);
    const prewarmSignature = encoder.hash(`BINARY_PREWARM_SIG::${cycle}::v30`);

    return {
      presenceId,
      presenceSignature,
      prewarmSignature,
      presenceBand: "binary-nerve",
      presenceMode: dir
    };
  }

  function buildPrewarmEnvelope(dir) {
    const prewarmId = encoder.hash(`BINARY_PREWARM_ID::${dir}::${cycle}::v30`);
    const routeHint = encoder.hash(`BINARY_PREWARM_ROUTE::${cycle}::v30`);
    const cacheHint = encoder.hash(`BINARY_PREWARM_CACHE::${cycle}::v30`);
    const chunkHint = encoder.hash(`BINARY_PREWARM_CHUNK::${cycle}::v30`);

    return {
      prewarmId,
      routePrewarmSignature: routeHint,
      cachePrewarmSignature: cacheHint,
      chunkPrewarmSignature: chunkHint,
      prewarmBand: "binary",
      prewarmMode: "nerve-root"
    };
  }

  function buildAdvantageEnvelope(dir) {
    const advantageId = encoder.hash(`BINARY_ADV_ID::${dir}::${cycle}::v30`);
    const advantageFieldSignature = encoder.hash(
      `BINARY_ADV_FIELD::${cycle}::v30`
    );
    const advantageBandSignature = encoder.hash(
      `BINARY_ADV_BAND::${cycle}::v30`
    );

    // v30: advantageScoreHint can be slightly modulated by cycle (still deterministic)
    const advantageScoreHint =
      cycle === 0 ? 1.0 :
      cycle < 16 ? 0.95 :
      cycle < 64 ? 0.9 :
      0.85;

    return {
      advantageId,
      advantageFieldSignature,
      advantageBandSignature,
      advantageBand: "binary",
      advantageField: "binary-nerve-root",
      advantageScoreHint,
      cascadeLevelHint: 0
    };
  }

  // -------------------------------------------------------------------------
  //  v30++ RESOURCE / IMPULSE / ROUTER MEMORY / PNS ENVELOPES (META-ONLY)
// -------------------------------------------------------------------------
  function buildResourceEnvelope() {
    // Pure metadata wiring of resource pressure (CPU/GPU/memory) as seen by proxy
    // v30: slightly more nuanced but still deterministic constants
    const cpu = 0.35;
    const gpu = 0.3;
    const memory = 0.28;

    const resourceBand =
      cpu > 0.8 || gpu > 0.8 || memory > 0.8
        ? "hot"
        : cpu > 0.5 || gpu > 0.5 || memory > 0.5
        ? "warm"
        : "cool";

    const gpuEarnBias =
      gpu > 0.4 ? "gpu-preferred" :
      cpu > 0.4 ? "cpu-preferred" :
      "balanced";

    return {
      cpuPressure: cpu,
      gpuPressure: gpu,
      memoryPressure: memory,
      resourceBand,
      gpuEarnBias,
      resourceSignature: encoder.hash(
        `BINARY_RESOURCE::${cpu}::${gpu}::${memory}::${resourceBand}::${gpuEarnBias}::v30`
      )
    };
  }

  function buildImpulseEnvelope(dir) {
    // Impulse speed band is symbolic-only, but deterministic
    const impulseBand =
      dir === "exchange" ? "reflex" :
      dir === "in" ? "afferent" :
      "efferent";

    const impulseSpeed = dir === "exchange" ? "fast" : "normal";

    const earnBias =
      dir === "exchange" ? "earner-candidate" :
      dir === "out" ? "earner-outbound" :
      "earner-neutral";

    return {
      impulseBand,
      impulseSpeed,
      earnBias,
      impulseSignature: encoder.hash(
        `BINARY_IMPULSE::${dir}::${impulseBand}::${impulseSpeed}::${earnBias}::${cycle}::v30`
      )
    };
  }

  function buildRouterMemoryEnvelope() {
    // Router memory awareness is metadata-only: hints for CheckRouterMemory
    const routeWarmth =
      cycle === 0 ? "cold" :
      cycle < 8 ? "warming" :
      cycle < 64 ? "warm" :
      "hot";

    return {
      routerMemoryBand: "binary-router-memory",
      routeWarmth,
      routerMemorySignature: encoder.hash(
        `BINARY_ROUTER_MEMORY::${routeWarmth}::${cycle}::v30`
      )
    };
  }

  function buildPnsEnvelope() {
    // PNS awareness: binary nerve root knows if PNS / pulseband is wired
    const pnsAvailable = !!pulseband;
    const pnsBand = pnsAvailable ? "dual" : "none";

    return {
      pnsAvailable,
      pnsBand,
      pnsSignature: encoder.hash(
        `BINARY_PNS::${pnsAvailable ? "1" : "0"}::${pnsBand}::${cycle}::v30`
      )
    };
  }

  function buildPhysiologyEnvelope() {
    // Pure metadata wiring of circulatory / endocrine / barrier systems
    return {
      heart: !!PulseProxyHeart,
      bloodPressure: !!PulseProxyBloodPressure,
      circulatorySystem: !!PulseProxyCirculatorySystem,
      hypothalamus: !!PulseProxyHypothalamus,
      spine: !!PulseProxySpine,
      pns: !!pulseband,
      synapse: !!PulseProxySynapse,
      bloodstream: !!PulseProxyBloodstream,
      adrenalSystem: !!PulseProxyAdrenalSystem,
      bbb: !!PulseProxyBBB
    };
  }

  function buildLimbicEnvelope() {
    return {
      limbicMeta: PULSE_LIMBIC_SHADOW_META || null,
      clientAvailable: !!PulseClient,
      netAvailable: !!PulseNet
    };
  }

  function buildAgentsEnvelope() {
    return {
      outerAgentAvailable: !!PulseProxyOuterAgent,
      innerAgentFactoryAvailable: !!createPulseProxyInnerAgent,
      impulseAvailable: !!PulseProxyImpulse,
      historyRepairAvailable: !!pulseHistoryRepair
    };
  }

  // -------------------------------------------------------------------------
  //  HEALING STATE UPDATE
  // -------------------------------------------------------------------------
  function updateHealingState({
    dir,
    bandSignature,
    binaryField,
    waveField,
    advantageEnvelope,
    resourceEnvelope,
    impulseEnvelope,
    routerMemoryEnvelope,
    pnsEnvelope,
    oneBandField
  }) {
    BinaryProxyHealingState.lastCycle = cycle;
    BinaryProxyHealingState.lastDir = dir;
    BinaryProxyHealingState.lastBandSignature = bandSignature;
    BinaryProxyHealingState.lastBinarySurface =
      binaryField.binarySurface || null;
    BinaryProxyHealingState.lastWaveField = waveField || null;
    BinaryProxyHealingState.lastAdvantageScoreHint =
      typeof advantageEnvelope.advantageScoreHint === "number"
        ? advantageEnvelope.advantageScoreHint
        : BinaryProxyHealingState.lastAdvantageScoreHint;
    BinaryProxyHealingState.lastResourcePressure = resourceEnvelope || null;
    BinaryProxyHealingState.lastImpulseSpeedBand = impulseEnvelope || null;
    BinaryProxyHealingState.lastRouterMemoryHint = routerMemoryEnvelope || null;
    BinaryProxyHealingState.lastPnsHint = pnsEnvelope || null;
    BinaryProxyHealingState.lastOneBandField = oneBandField || null;
    BinaryProxyHealingState.cycleCount += 1;
    BinaryProxyHealingState.proxyModeEnabled = proxyModeEnabled;
  }

  // -------------------------------------------------------------------------
  //  v30+ BINARY ENVELOPE + ONEBAND + PROXY MODE TAP (ADDON-ONLY)
// -------------------------------------------------------------------------
  function buildBinaryEnvelope(dir, bits, encoded, extra = null) {
    const oneBandField = buildOneBandField(dir);
    const bandSignature = buildBandSignature();
    const binaryField = buildBinaryField();
    const waveField = buildWaveField();
    const cycleSignature = buildCycleSignature();
    const cacheChunkEnvelope = buildCacheChunkEnvelope(dir);
    const presenceEnvelope = buildPresenceEnvelope(dir);
    const prewarmEnvelope = buildPrewarmEnvelope(dir);
    const advantageEnvelope = buildAdvantageEnvelope(dir);
    const resourceEnvelope = buildResourceEnvelope();
    const impulseEnvelope = buildImpulseEnvelope(dir);
    const routerMemoryEnvelope = buildRouterMemoryEnvelope();
    const pnsEnvelope = buildPnsEnvelope();
    const physiologyEnvelope = buildPhysiologyEnvelope();
    const limbicEnvelope = buildLimbicEnvelope();
    const agentsEnvelope = buildAgentsEnvelope();

    const record = {
      dir,
      bits,
      encoded,
      oneBandField,
      bandSignature,
      binaryField,
      waveField,
      cycleSignature,
      cacheChunkEnvelope,
      presenceEnvelope,
      prewarmEnvelope,
      advantageEnvelope,
      resourceEnvelope,
      impulseEnvelope,
      routerMemoryEnvelope,
      pnsEnvelope,
      physiologyEnvelope,
      limbicEnvelope,
      agentsEnvelope
    };

    if (extra) {
      record.extra = extra;
    }

    history.push(record);

    updateHealingState({
      dir,
      bandSignature,
      binaryField,
      waveField,
      advantageEnvelope,
      resourceEnvelope,
      impulseEnvelope,
      routerMemoryEnvelope,
      pnsEnvelope,
      oneBandField
    });

    // PROXY MODE TAP (ADDON-ONLY, NO MUTATION OF BINARY FLOW)
    if (proxyModeEnabled && proxyModeAdapter && typeof proxyModeAdapter.tap === "function") {
      try {
        proxyModeAdapter.tap({
          dir,
          cycle,
          bits,
          encoded,
          oneBandField,
          bandSignature,
          binaryField,
          waveField,
          cycleSignature
        });
      } catch (e) {
        if (trace) {
          console.warn("[BinaryProxy v30] ProxyMode tap error:", e);
        }
      }
    }

    return {
      encoded,
      oneBandField,
      bandSignature,
      binaryField,
      waveField,
      cycleSignature,
      cacheChunkEnvelope,
      presenceEnvelope,
      prewarmEnvelope,
      advantageEnvelope,
      resourceEnvelope,
      impulseEnvelope,
      routerMemoryEnvelope,
      pnsEnvelope,
      physiologyEnvelope,
      limbicEnvelope,
      agentsEnvelope,
      healingState: getBinaryProxyHealingState()
    };
  }

  // -------------------------------------------------------------------------
  //  RECEIVE (binary → encoded)
// -------------------------------------------------------------------------
  function receive(bits) {
    cycle++;

    const pure = ensurePureBinaryOrFallback("receive", bits, "non-binary-input");
    const encoded = encoder.encode(pure);

    if (trace) {
      console.log("[BinaryProxy v30] IN:", pure);
    }

    const envelope = buildBinaryEnvelope("in", pure, encoded);
    return envelope.encoded;
  }

  // -------------------------------------------------------------------------
  //  SEND (binary → encoded)
// -------------------------------------------------------------------------
  function send(bits) {
    cycle++;

    const pure = ensurePureBinaryOrFallback("send", bits, "non-binary-output");
    const encoded = encoder.encode(pure);

    if (trace) {
      console.log("[BinaryProxy v30] OUT:", pure);
    }

    const envelope = buildBinaryEnvelope("out", pure, encoded);
    return envelope.encoded;
  }

  // -------------------------------------------------------------------------
  //  EXCHANGE (binary → cortex → binary)
// -------------------------------------------------------------------------
  function exchange(bits) {
    cycle++;

    const pure = ensurePureBinaryOrFallback(
      "exchange",
      bits,
      "non-binary-exchange"
    );

    const encodedIn = encoder.encode(pure);
    const response = encoder.process(encodedIn);

    const pureResponse = ensurePureBinaryOrFallback(
      "exchange",
      response,
      "cortex-non-binary-response"
    );

    const encodedOut = encoder.encode(pureResponse);

    if (trace) {
      console.log("[BinaryProxy v30] EXCHANGE IN:", pure);
      console.log("[BinaryProxy v30] EXCHANGE OUT:", pureResponse);
    }

    const envelope = buildBinaryEnvelope("exchange", pure, encodedOut, {
      responseBits: pureResponse
    });

    return envelope.encoded;
  }

  // -------------------------------------------------------------------------
  //  FALLBACK — deterministic, drift-proof, symbolic proxy bridge
  // -------------------------------------------------------------------------
  function fallback(op, bits, reason) {
    if (!fallbackProxyFactory) {
      throw new Error(
        `BinaryProxy fallback triggered (${reason}) but no fallbackProxyFactory provided`
      );
    }

    if (trace) {
      console.warn(`[BinaryProxy v30] FALLBACK (${op}):`, reason, bits);
    }

    // Attach limbic + agents metadata into the fallback payload
    const limbicEnvelope = buildLimbicEnvelope();
    const agentsEnvelope = buildAgentsEnvelope();

    return fallbackProxyFactory({
      jobId: `fallback-${op}`,
      pattern: "binary-fallback",
      payload: { bits, reason, limbicEnvelope, agentsEnvelope },
      priority: "normal",
      returnTo: null,
      parentLineage: null,
      pageId: "BINARY_PROXY_FALLBACK_V30"
    });
  }

  // -------------------------------------------------------------------------
  //  PROXY MODE CONTROL (v30+ ADDON)
// -------------------------------------------------------------------------
  function enableProxyMode(adapter) {
    if (adapter && typeof adapter.tap === "function") {
      proxyModeAdapter = adapter;
      proxyModeEnabled = true;
    }
    BinaryProxyHealingState.proxyModeEnabled = proxyModeEnabled;
    return proxyModeEnabled;
  }

  function disableProxyMode() {
    proxyModeEnabled = false;
    BinaryProxyHealingState.proxyModeEnabled = proxyModeEnabled;
    return proxyModeEnabled;
  }

  function getProxyModeStatus() {
    return {
      enabled: proxyModeEnabled,
      adapterAvailable: !!proxyModeAdapter
    };
  }

  function getProxyModePressureField() {
    // Pure symbolic pressure field derived from healing state + cycle
    const cycles = BinaryProxyHealingState.cycleCount || 0;
    const band = proxyModeEnabled ? "active" : "inactive";
    const load =
      cycles === 0 ? 0 :
      cycles < 32 ? 0.25 :
      cycles < 128 ? 0.5 :
      0.75;

    return {
      band,
      load,
      pressureSignature: encoder.hash(
        `BINARY_PROXY_MODE_PRESSURE::${band}::${load}::${cycles}::v30`
      )
    };
  }

  // -------------------------------------------------------------------------
  //  DIAGNOSTICS — uses WB cells (scores + health metrics)
// -------------------------------------------------------------------------
  async function diagnostics({ instanceId, beforeTimestamp } = {}) {
    const scores = await scanUserScoresForInstanceHints(instanceId || null);
    const health = await checkProxyHealthAndMetrics();

    return {
      role: BinaryProxyRole,
      meta: PulseOSBinaryProxyMeta,
      cycle,
      scores,
      health,
      beforeTimestamp: beforeTimestamp || null,
      proxyMode: getProxyModeStatus(),
      proxyModePressureField: getProxyModePressureField(),
      healingState: getBinaryProxyHealingState()
    };
  }

  // Inside createBinaryProxy(...)
  const BinaryIdentity = {
    value: null,
    set(v) { this.value = v },
    get() { return this.value }
  };
  

  // -------------------------------------------------------------------------
  //  MAINTENANCE — uses PNS purifier + history repair
  // -------------------------------------------------------------------------
  async function maintenance({ beforeTimestamp } = {}) {
    const ts = beforeTimestamp || PulseRealm.PulseNOW;

    const sessions = await cleanupSessionsBefore(ts);
    const errors = await cleanupErrorsBefore(ts);
    const redownloads = await cleanupRedownloadsBefore(ts);
    const historyFix = await pulseHistoryRepair({ before: ts });

    return {
      role: BinaryProxyRole,
      meta: PulseOSBinaryProxyMeta,
      cycle,
      sessions,
      errors,
      redownloads,
      historyFix,
      healingState: getBinaryProxyHealingState()
    };
  }

  // -------------------------------------------------------------------------
  //  PUBLIC API
  // -------------------------------------------------------------------------
  return {
    role: BinaryProxyRole,
    meta: PulseOSBinaryProxyMeta,
    identity: BinaryIdentity,
    receive,
    send,
    exchange,
    fallback,
    history,
    diagnostics,
    maintenance,
    // v30+ Proxy Mode addon
    enableProxyMode,
    disableProxyMode,
    getProxyModeStatus,
    getProxyModePressureField,
    getHealingState: getBinaryProxyHealingState
  };
}

