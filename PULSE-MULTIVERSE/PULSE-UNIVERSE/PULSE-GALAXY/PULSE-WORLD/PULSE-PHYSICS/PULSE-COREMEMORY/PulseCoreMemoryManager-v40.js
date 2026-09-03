// ============================================================================
// FILE: /PULSE-COREMEMORY/PulseCoreMemoryManager-v40.js
// PULSE OS — v40 IMMORTAL
// MEMORY MANAGER — DEVICE-AWARE • WAVE-AWARE • TIER-AWARE • BINARY-FIRST
// “THE AUTONOMIC NERVOUS SYSTEM OF THE OS”
// ============================================================================
import { PulseBinaryOverlayV40 } from "./PulseCoreBinaryOverlay-v40.js";
import { PulseCoreSpeech }      from "./PulseCoreSpeech-v40.js";
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ---------------------------------------------------------------------------
// 1) GLOBAL HOLDER (exported BEFORE creation)
// ---------------------------------------------------------------------------
export const PulseCoreMemoryManager = {
  instance: null,
  version: "40.0-IMMORTAL-MEMORY-MANAGER",
  dnaTag:  "default-dna"
};

// ============================================================================
// 2) FACTORY — creates the real manager instance
// ============================================================================
export function createPulseCoreMemoryManager_v40({
  overlay  = PulseBinaryOverlayV40,          // REQUIRED — injected by Governor overlay
  speech   = PulseCoreSpeech,               // optional: PulseCoreSpeech
  presence = null,                          // optional: PulseCorePresence
  daemon   = null,                          // optional: PulseCoreDaemon
  dnaTag   = "default-dna",
  version  = "40.0-IMMORTAL-MEMORY-MANAGER",
  log      = console.log,
  warn     = console.warn
} = {}) {

  if (!overlay) {
    throw new Error("💾 PULSE CORE MEMORY v40 - [PulseCoreMemoryManager-v40] Missing overlay — must be injected");
  }

  const Governor   = overlay.Governor;
  const CoreMemory = overlay.CoreMemory;

  // Governor surfaces
  const deviceCtx = Governor?.deviceContext    || {};
  const waveCtx   = Governor?.waveContextHint  || {};

  // -------------------------------------------------------------------------
  // INTERNAL STATE
  // -------------------------------------------------------------------------
  const state = {
    mode: "PulseBand",          // "PulseBand" | "memorymode"
    lastFlush: 0,
    lastHeal: 0,
    lastHydrate: 0,
    lastTierCheck: 0,
    pressure: 0,
    storageTier: "indexeddb",   // "indexeddb" | "local" | "session" | "text"
    emergencyMode: false,
    lastFallbackReason: null
  };

  function safeLog(stage, details = {}) {
    try {
      log(
        `💾 PULSE CORE MEMORY v40 - [PulseCoreMemoryManager-v40] ${stage}`, details
      );
    } catch {}
  }

  // -------------------------------------------------------------------------
  // PRESSURE DETECTION (device + heap + governor)
  // -------------------------------------------------------------------------
  function detectPressure() {
    let heapPct = 0;
    try {
      const used  = performance.memory?.usedJSHeapSize   || 0;
      const total = performance.memory?.jsHeapSizeLimit  || 1;
      heapPct = used / total;
    } catch {}

    const govWrite = Governor?._pressure?.writeAvg?.() || 0;
    const govRead  = Governor?._pressure?.readAvg?.()  || 0;

    const deviceBandwidth = deviceCtx.bandwidthMbps || 0;
    const deviceStability = deviceCtx.stabilityScore || 1;

    const wavePenalty =
      waveCtx.primaryWave === "2g" ? 0.4 :
      waveCtx.primaryWave === "3g" ? 0.25 :
      waveCtx.primaryWave === "4g" ? 0.1 :
      0;

    const pressure =
      heapPct * 0.5 +
      govWrite * 0.25 +
      govRead * 0.15 +
      wavePenalty +
      (deviceBandwidth < 1 ? 0.1 : 0) +
      (deviceStability < 0.5 ? 0.1 : 0);

    state.pressure = Math.min(1, pressure);
    return state.pressure;
  }

  // -------------------------------------------------------------------------
  // STORAGE TIER MANAGEMENT
  // -------------------------------------------------------------------------
  function evaluateStorageTier() {
    const p = detectPressure();
    state.lastTierCheck = PulseRealm.PulseNOW;

    if (p < 0.55) {
      state.storageTier      = "indexeddb";
      state.emergencyMode    = false;
      state.lastFallbackReason = null;
      return;
    }

    if (p < 0.75) {
      state.storageTier      = "local";
      state.emergencyMode    = false;
      state.lastFallbackReason = "moderate-pressure";
      return;
    }

    if (p < 0.90) {
      state.storageTier      = "session";
      state.emergencyMode    = false;
      state.lastFallbackReason = "high-pressure";
      return;
    }

    state.storageTier        = "text";
    state.emergencyMode      = true;
    state.lastFallbackReason = "critical-pressure";
  }

  // -------------------------------------------------------------------------
  // FLUSH — Clear CoreMemory + tier-aware flush
  // -------------------------------------------------------------------------
  function flush() {
    try {
      CoreMemory.clearAll();
    } catch (err) {
      warn("[PulseCoreMemoryManager-v40] FLUSH_ERROR", String(err));
    }

    evaluateStorageTier();
    state.lastFlush = PulseRealm.PulseNOW;

    safeLog("FLUSH", {
      tier:      state.storageTier,
      emergency: state.emergencyMode,
      pressure:  state.pressure,
      reason:    state.lastFallbackReason
    });
  }

  // -------------------------------------------------------------------------
  // HYDRATE — store presence/daemon/speech snapshots
  // -------------------------------------------------------------------------
  function hydrate() {
    try {
      const presenceSnapshot = presence?.snapshot?.() || {};
      const daemonSnapshot   = daemon?.snapshot?.()   || {};
      const speechMessages   = speech?.messages?.()   || [];

      CoreMemory.setRouteSnapshot("memory-hydration", {
        lastPresence:    presenceSnapshot,
        lastDaemon:      daemonSnapshot,
        lastSpeechCount: speechMessages.length,
        deviceContext:   deviceCtx,
        waveContext:     waveCtx,
        storageTier:     state.storageTier,
        emergencyMode:   state.emergencyMode
      });

    } catch (err) {
      warn("[PulseCoreMemoryManager-v40] HYDRATE_ERROR", String(err));
    }

    state.lastHydrate = PulseRealm.PulseNOW;

    safeLog("HYDRATE", {
      tier:      state.storageTier,
      emergency: state.emergencyMode
    });
  }

  // -------------------------------------------------------------------------
  // HEAL — drift-proof cleanup + tier demotion
  // -------------------------------------------------------------------------
  function heal() {
    const p = detectPressure();

    if (p > 0.85) {
      try {
        CoreMemory.clearAll();
      } catch (err) {
        warn("[PulseCoreMemoryManager-v40] HEAL_FLUSH_ERROR", String(err));
      }
    }

    evaluateStorageTier();
    hydrate();
    state.lastHeal = PulseRealm.PulseNOW;

    safeLog("HEAL", {
      pressure:  p,
      tier:      state.storageTier,
      emergency: state.emergencyMode,
      reason:    state.lastFallbackReason
    });
  }

  // -------------------------------------------------------------------------
  // SNAPSHOT — full manager + core snapshot
  // -------------------------------------------------------------------------
  function snapshot() {
    let coreSnapshot = {};

    try {
      coreSnapshot = CoreMemory.getRouteSnapshot("global") || {};
    } catch (err) {
      warn("[PulseCoreMemoryManager-v40] SNAPSHOT_ERROR", String(err));
    }

    return {
      mode:              state.mode,
      pressure:          state.pressure,
      storageTier:       state.storageTier,
      emergencyMode:     state.emergencyMode,
      lastFallbackReason: state.lastFallbackReason,
      lastFlush:         state.lastFlush,
      lastHeal:          state.lastHeal,
      lastHydrate:       state.lastHydrate,
      lastTierCheck:     state.lastTierCheck,
      core:              coreSnapshot,
      deviceContext:     deviceCtx,
      waveContext:       waveCtx
    };
  }

  // -------------------------------------------------------------------------
  // SWITCH MODE — pulseband ↔ memorymode
  // -------------------------------------------------------------------------
  function switchMode(mode) {
    if (mode !== "PulseBand" && mode !== "memorymode") return;

    state.mode = mode;

    if (mode === "PulseBand") {
      heal();
    }

    if (mode === "memorymode") {
      flush();
      hydrate();
    }

    safeLog("SWITCH_MODE", {
      mode,
      tier:      state.storageTier,
      emergency: state.emergencyMode,
      pressure:  state.pressure
    });
  }

  // -------------------------------------------------------------------------
  // PUBLIC API — v40 IMMORTAL
  // -------------------------------------------------------------------------
  const instance = {
    mode:          () => state.mode,
    pressure:      () => state.pressure,
    storageTier:   () => state.storageTier,
    emergencyMode: () => state.emergencyMode,

    flush,
    hydrate,
    heal,
    snapshot,
    switchMode,

    overlay,
    Governor,
    CoreMemory,
    dnaTag,
    version
  };

  // -------------------------------------------------------------------------
  // 3) ASSIGN INSTANCE TO GLOBAL HOLDER
  // -------------------------------------------------------------------------
  PulseCoreMemoryManager.instance = instance;
  PulseCoreMemoryManager.version  = version;
  PulseCoreMemoryManager.dnaTag   = dnaTag;

  // ⭐ UPGRADED INITIALIZING LOG — rich, EVO-console friendly
  safeLog("Initializing Components..", {
    version,
    dnaTag,
    deviceCtx,
    waveCtx,
    initialTier:       state.storageTier,
    initialEmergency:  state.emergencyMode
  });

  return instance;
}

// Default export
export default createPulseCoreMemoryManager_v40;

PulseRealm.CoreMemoryManager = {
  createPulseCoreMemoryManager_v40,
  PulseCoreMemoryManager
};
