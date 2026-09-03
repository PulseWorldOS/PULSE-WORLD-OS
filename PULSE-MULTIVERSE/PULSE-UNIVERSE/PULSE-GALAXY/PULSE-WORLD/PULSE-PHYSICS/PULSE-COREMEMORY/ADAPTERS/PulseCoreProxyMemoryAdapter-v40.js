// ============================================================================
// FILE: /PULSE-COREMEMORY/PulseProxyMemoryAdapter-v40.js
// PULSE OS — v40 IMMORTAL
// PROXY MEMORY ADAPTER — FULL DEVICE + WORLD INTELLIGENCE
// “PROXY NEVER FETCHES TWICE. NEVER DECODES TWICE. NEVER DRIFTS.”
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { createPulseCoreMemoryAdapter_v40 } from "./PulseCoreAIMemoryAdapter-v40.js";

let PROXY_EPOCH = 0;
function nextProxyEpoch() { return ++PROXY_EPOCH; }

export function createPulseProxyMemoryAdapter_v40(opts = {}) {
  const base = createPulseCoreMemoryAdapter_v40({
    ...opts,
    kind: "proxy"
  });

  const overlay       = base.overlay;
  const Governor      = base.Governor;
  const MemoryManager = base.MemoryManager;

  // -------------------------------------------------------------------------
  // DEVICE + WORLD CONTEXT SNAPSHOT — v40
  // -------------------------------------------------------------------------
  function getProxyContext(routeId, payload, dataType, modeOverride) {
    const mode = resolveMode(modeOverride);

    const ctx = {
      ...base.wrap(routeId, payload, "proxy-context")?.context,
      routeId,
      epoch: nextProxyEpoch(),
      proxySize:
        typeof payload === "object"
          ? JSON.stringify(payload).length
          : String(payload || "").length,

      // proxy mode
      mode,

      // device signals
      device: Governor?.deviceContext?.platform || "unknown",
      battery: navigator?.getBattery ? "unknown" : "unsupported",
      online: navigator?.onLine ?? true,
      visibility: document?.visibilityState || "visible",

      // wave signals
      wave: Governor?.waveContextHint?.primaryWave || "unknown",

      // performance signals
      pressure: MemoryManager?.pressure?.() || 0,
      tier: MemoryManager?.storageTier?.() || "indexeddb",
      writeAvg: Governor?._pressure?.writeAvg?.() || 0,
      readAvg: Governor?._pressure?.readAvg?.() || 0,

      // UI signals
      scrollX: window?.scrollX ?? 0,
      scrollY: window?.scrollY ?? 0,
      viewportW: window?.innerWidth ?? 0,
      viewportH: window?.innerHeight ?? 0,

      // input signals
      lastMouseX: window?.__pulse_last_mouse_x ?? 0,
      lastMouseY: window?.__pulse_last_mouse_y ?? 0,
      lastScrollDelta: window?.__pulse_last_scroll_delta ?? 0,

      dataType
    };

    return ctx;
  }

  // -------------------------------------------------------------------------
  // MODE RESOLUTION — v40
  // -------------------------------------------------------------------------
  function resolveMode(modeOverride) {
    const m = modeOverride || opts.defaultMode || "online";

    if (m === "online") return "online";
    if (m === "offline") return "offline";
    if (m === "cache-only") return "cache-only";
    if (m === "fail-open") return "fail-open";

    return "online";
  }

  // -------------------------------------------------------------------------
  // INBOUND — v40 (context-aware)
  // -------------------------------------------------------------------------
  function inbound(routeId, payload, modeOverride) {
    const ctx = getProxyContext(routeId, payload, "proxy-in", modeOverride);

    try {
      overlay.touch(routeId, ctx.epoch, {
        dataType: "proxy-in",
        dnaTag: base.dnaTag,
        version: base.version,
        epoch: ctx.epoch,
        band: "binary",
        proxySize: ctx.proxySize,
        mode: ctx.mode,
        wave: ctx.wave,
        device: ctx.device,
        tier: ctx.tier,
        pressure: ctx.pressure,
        scrollX: ctx.scrollX,
        scrollY: ctx.scrollY,
        viewportW: ctx.viewportW,
        viewportH: ctx.viewportH
      });
    } catch {}

    return base.wrap(routeId, {
      inbound: payload,
      context: ctx
    }, "proxy-in");
  }

  // -------------------------------------------------------------------------
  // OUTBOUND — v40 (context-aware)
  // -------------------------------------------------------------------------
  function outbound(routeId, payload, modeOverride) {
    const ctx = getProxyContext(routeId, payload, "proxy-out", modeOverride);

    try {
      overlay.touch(routeId, ctx.epoch, {
        dataType: "proxy-out",
        dnaTag: base.dnaTag,
        version: base.version,
        epoch: ctx.epoch,
        band: "binary",
        proxySize: ctx.proxySize,
        mode: ctx.mode,
        wave: ctx.wave,
        device: ctx.device,
        tier: ctx.tier,
        pressure: ctx.pressure,
        scrollX: ctx.scrollX,
        scrollY: ctx.scrollY,
        viewportW: ctx.viewportW,
        viewportH: ctx.viewportH
      });
    } catch {}

    return base.wrap(routeId, {
      outbound: payload,
      context: ctx
    }, "proxy-out");
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

    inbound,
    outbound,
    promoteHot
  });
}

PulseRealm.CoreProxyMemoryAdapter = { createPulseProxyMemoryAdapter_v40 };
