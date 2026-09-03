// ============================================================================
//  PulseCoreMemoryAdapter-v40.js — IMMORTAL
//  UNIVERSAL MEMORY ADAPTER — CONTEXT-AWARE, PURE BINARY, ZERO DRIFT
//  “EVERY ORGAN SPEAKS THROUGH ME. I NEVER DRIFT.”
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


export function createPulseCoreMemoryAdapter_v40({
  overlay,                     // REQUIRED — injected by BinaryOverlay v40
  kind,                        // REQUIRED — adapter type ("ai", "router", etc.)
  dnaTag = "default-dna",
  version = "40.0-IMMORTAL-ADAPTER",
  log    = console.log,
  warn   = console.warn
} = {}) {

  if (!overlay) throw new Error(`[${kind}-Adapter-v40] Missing overlay`);

  const Governor      = overlay.Governor;
  const CoreMemory    = overlay.CoreMemory;
  const MemoryManager = overlay.MemoryManager;

  function safeLog(stage, details = {}) {
    try { log(`[${kind}-Adapter-v40]`, stage, JSON.stringify(details)); }
    catch {}
  }

  // -------------------------------------------------------------------------
  // CONTEXT SNAPSHOT
  // -------------------------------------------------------------------------
  function getContext(routeId) {
    return {
      routeId,
      pressure: MemoryManager?.pressure?.() || 0,
      tier: MemoryManager?.storageTier?.() || "indexeddb",
      emergency: MemoryManager?.emergencyMode?.() || false,
      wave: Governor?.waveContextHint?.primaryWave || "unknown",
      device: Governor?.deviceContext?.platform || "unknown",
      writeAvg: Governor?._pressure?.writeAvg?.() || 0,
      readAvg: Governor?._pressure?.readAvg?.() || 0
    };
  }

  // -------------------------------------------------------------------------
  // WRAP — canonicalize + context + binary band
  // -------------------------------------------------------------------------
  function wrap(routeId, payload, dataType) {
    const ctx = getContext(routeId);

    try {
      return overlay.canonicalize({
        kind,
        routeId,
        dataType,
        payload,
        context: ctx,
        dnaTag,
        version
      });
    } catch (err) {
      warn(`[${kind}-Adapter-v40] WRAP_ERROR`, String(err));
      return null;
    }
  }

  // -------------------------------------------------------------------------
  // HOT PROMOTION
  // -------------------------------------------------------------------------
  function promoteHot(routeId, key) {
    try {
      overlay.markHot(routeId, key);
      safeLog("HOT_PROMOTE", { routeId, key });
    } catch {}
  }

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------
  return Object.freeze({
    kind,
    version,
    dnaTag,

    wrap,
    promoteHot,

    overlay,
    Governor,
    CoreMemory,
    MemoryManager
  });
}
