// ============================================================================
// FILE: /PULSE-COREMEMORY/PulseRouterMemoryAdapter-v40.js
// PULSE OS — v40 IMMORTAL
// ROUTER MEMORY ADAPTER — FULL CONTEXTUAL ROUTE INTELLIGENCE
// “ROUTER THINKS ONCE. ROUTES FOREVER. NEVER DRIFT.”
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { createPulseCoreMemoryAdapter_v40 } from "./PulseCoreAIMemoryAdapter-v40.js";

let ROUTER_EPOCH = 0;
function nextRouterEpoch() { return ++ROUTER_EPOCH; }

export function createPulseRouterMemoryAdapter_v40(opts = {}) {
  const base = createPulseCoreMemoryAdapter_v40({
    ...opts,
    kind: "router"
  });

  const overlay       = base.overlay;
  const Governor      = base.Governor;
  const MemoryManager = base.MemoryManager;

  // -------------------------------------------------------------------------
  // CONTEXT SNAPSHOT (router-specific)
  // -------------------------------------------------------------------------
  function getRouterContext(routeId, payload) {
    const ctx = {
      ...base.wrap(routeId, payload, "router-context")?.context,
      routeId,
      epoch: nextRouterEpoch(),
      routeSize:
        typeof payload === "object"
          ? JSON.stringify(payload).length
          : String(payload || "").length,
      wave: Governor?.waveContextHint?.primaryWave || "unknown",
      device: Governor?.deviceContext?.platform || "unknown",
      pressure: MemoryManager?.pressure?.() || 0,
      tier: MemoryManager?.storageTier?.() || "indexeddb"
    };

    return ctx;
  }

  // -------------------------------------------------------------------------
  // REGISTER ROUTE SHAPE — v40 (context-aware)
  // -------------------------------------------------------------------------
  function registerRouteShape(routeId, shape) {
    const ctx = getRouterContext(routeId, shape);

    try {
      overlay.touch(routeId, ctx.epoch, {
        dataType: "route-shape",
        dnaTag: base.dnaTag,
        version: base.version,
        epoch: ctx.epoch,
        band: "binary",
        routeSize: ctx.routeSize,
        wave: ctx.wave,
        device: ctx.device,
        tier: ctx.tier,
        pressure: ctx.pressure
      });
    } catch {}

    return base.wrap(routeId, {
      shape,
      context: ctx
    }, "route-shape");
  }

  // -------------------------------------------------------------------------
  // LOOKUP ROUTE SHAPE — v40 (context-aware)
  // -------------------------------------------------------------------------
  function getRouteShape(routeId, shape) {
    const ctx = getRouterContext(routeId, shape);

    try {
      overlay.touch(routeId, ctx.epoch, {
        dataType: "route-lookup",
        dnaTag: base.dnaTag,
        version: base.version,
        epoch: ctx.epoch,
        band: "binary",
        routeSize: ctx.routeSize,
        wave: ctx.wave,
        device: ctx.device,
        tier: ctx.tier,
        pressure: ctx.pressure
      });
    } catch {}

    return base.wrap(routeId, {
      lookup: shape,
      context: ctx
    }, "route-lookup");
  }

  // -------------------------------------------------------------------------
  // HOT PROMOTION — v40
  // -------------------------------------------------------------------------
  function promoteHot(routeId, key) {
    try {
      overlay.markHot(routeId, key);
      base.overlay.Governor?._pressure?.markRouteHot?.(routeId);
    } catch {}

    return base.promoteHot(routeId, key);
  }

  // -------------------------------------------------------------------------
  // PUBLIC API — v40 IMMORTAL
  // -------------------------------------------------------------------------
  return Object.freeze({
    ...base,

    registerRouteShape,
    getRouteShape,
    promoteHot
  });
}

PulseRealm.CoreRouterMemoryAdapter = { createPulseRouterMemoryAdapter_v40 };
