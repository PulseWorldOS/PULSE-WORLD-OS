// ============================================================================
// FILE: /PULSE-COREMEMORY/PulseSendMemoryAdapter-v40.js
// PULSE OS — v40 IMMORTAL
// SEND MEMORY ADAPTER — FULL OUTBOUND INTELLIGENCE
// “SEND ONCE. ROUTE FOREVER. NEVER DRIFT.”
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { createPulseCoreMemoryAdapter_v40 } from "./PulseCoreAIMemoryAdapter-v40.js";

let SEND_EPOCH = 0;
function nextSendEpoch() { return ++SEND_EPOCH; }

export function createPulseSendMemoryAdapter_v40(opts = {}) {
  const base = createPulseCoreMemoryAdapter_v40({
    ...opts,
    kind: "send"
  });

  const overlay       = base.overlay;
  const Governor      = base.Governor;
  const MemoryManager = base.MemoryManager;

  // -------------------------------------------------------------------------
  // CHANNEL RESOLUTION — v40 (context-aware)
  // -------------------------------------------------------------------------
  function resolveChannel(channelOverride) {
    const ctxTier = MemoryManager?.storageTier?.() || "indexeddb";
    const wave    = Governor?.waveContextHint?.primaryWave || "unknown";

    // channel override wins
    if (channelOverride) return String(channelOverride);

    // wave-aware channel selection
    if (wave === "2g" || wave === "3g") return "compressed-http";
    if (wave === "wifi") return "http";
    if (wave === "ethernet") return "direct";

    // tier fallback
    if (ctxTier === "localstorage") return "local-proxy";

    return "http";
  }

  // -------------------------------------------------------------------------
  // SEND CONTEXT SNAPSHOT — v40
  // -------------------------------------------------------------------------
  function getSendContext(routeId, payload, channelOverride) {
    const ctx = {
      ...base.wrap(routeId, payload, "send-context")?.context,
      routeId,
      epoch: nextSendEpoch(),
      sendSize:
        typeof payload === "object"
          ? JSON.stringify(payload).length
          : String(payload || "").length,
      channel: resolveChannel(channelOverride),
      wave: Governor?.waveContextHint?.primaryWave || "unknown",
      device: Governor?.deviceContext?.platform || "unknown",
      pressure: MemoryManager?.pressure?.() || 0,
      tier: MemoryManager?.storageTier?.() || "indexeddb"
    };

    return ctx;
  }

  // -------------------------------------------------------------------------
  // PREPARE OUTBOUND — v40 (context-aware, channel-aware)
  // -------------------------------------------------------------------------
  function prepareOutbound(routeId, payload, channelOverride) {
    const ctx = getSendContext(routeId, payload, channelOverride);

    try {
      overlay.touch(routeId, ctx.epoch, {
        dataType: "send",
        dnaTag: base.dnaTag,
        version: base.version,
        epoch: ctx.epoch,
        band: "binary",
        sendSize: ctx.sendSize,
        channel: ctx.channel,
        wave: ctx.wave,
        device: ctx.device,
        tier: ctx.tier,
        pressure: ctx.pressure
      });
    } catch {}

    return overlay.interceptOutbound({
      kind: "send",
      routeId,
      payload,
      context: ctx
    });
  }

  // -------------------------------------------------------------------------
  // HOT PROMOTION — v40
  // -------------------------------------------------------------------------
  function promoteHot(routeId, key) {
    try {
      overlay.markHot(routeId, key);
      Governor?._pressure?.markRouteHot?.(routeId);
    } catch {}

    return base.promoteHot(routeId, key);
  }

  // -------------------------------------------------------------------------
  // PUBLIC API — v40 IMMORTAL
  // -------------------------------------------------------------------------
  return Object.freeze({
    ...base,

    prepareOutbound,
    promoteHot
  });
}

PulseRealm.CoreSendMemoryAdapter = { createPulseSendMemoryAdapter_v40 };
