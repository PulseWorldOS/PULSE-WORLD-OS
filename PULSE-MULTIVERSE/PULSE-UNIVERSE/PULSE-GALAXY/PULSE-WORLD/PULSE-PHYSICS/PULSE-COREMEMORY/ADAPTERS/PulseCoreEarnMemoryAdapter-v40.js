// ============================================================================
// FILE: /PULSE-COREMEMORY/PulseEarnMemoryAdapter-v40.js
// PULSE OS — v40 IMMORTAL
// EARN MEMORY ADAPTER — FULL ECONOMIC INTELLIGENCE
// “EARN FLOWS IN. VALUE ACCUMULATES. NOTHING DRIFTS.”
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { createPulseCoreMemoryAdapter_v40 } from "./PulseCoreAIMemoryAdapter-v40.js";

let EARN_EPOCH = 0;
function nextEarnEpoch() { return ++EARN_EPOCH; }

export function createPulseEarnMemoryAdapter_v40(opts = {}) {
  const base = createPulseCoreMemoryAdapter_v40({
    ...opts,
    kind: "earn"
  });

  const overlay       = base.overlay;
  const Governor      = base.Governor;
  const MemoryManager = base.MemoryManager;

  // -------------------------------------------------------------------------
  // ECONOMIC CONTEXT SNAPSHOT — v40
  // -------------------------------------------------------------------------
  function getEarnContext(routeId, payload, dataType) {
    const ctx = {
      ...base.wrap(routeId, payload, "earn-context")?.context,
      routeId,
      epoch: nextEarnEpoch(),
      earnSize:
        typeof payload === "object"
          ? JSON.stringify(payload).length
          : String(payload || "").length,
      dataType,
      wave: Governor?.waveContextHint?.primaryWave || "unknown",
      device: Governor?.deviceContext?.platform || "unknown",
      pressure: MemoryManager?.pressure?.() || 0,
      tier: MemoryManager?.storageTier?.() || "indexeddb",
      rewardPotential:
        typeof payload === "object" && payload.reward
          ? payload.reward
          : 0
    };

    return ctx;
  }

  // -------------------------------------------------------------------------
  // REGISTER EARN SIGNAL — v40
  // -------------------------------------------------------------------------
  function registerEarnSignal(routeId, earnPayload) {
    const ctx = getEarnContext(routeId, earnPayload, "earn-signal");

    try {
      overlay.touch(routeId, ctx.epoch, {
        dataType: "earn-signal",
        dnaTag: base.dnaTag,
        version: base.version,
        epoch: ctx.epoch,
        band: "binary",
        earnSize: ctx.earnSize,
        rewardPotential: ctx.rewardPotential,
        wave: ctx.wave,
        device: ctx.device,
        tier: ctx.tier,
        pressure: ctx.pressure
      });
    } catch {}

    return base.wrap(routeId, {
      signal: earnPayload,
      context: ctx
    }, "earn-signal");
  }

  // -------------------------------------------------------------------------
  // REGISTER EARN META — v40
  // -------------------------------------------------------------------------
  function registerEarnMeta(routeId, metaObj) {
    const ctx = getEarnContext(routeId, metaObj, "earn-meta");

    try {
      overlay.touch(routeId, ctx.epoch, {
        dataType: "earn-meta",
        dnaTag: base.dnaTag,
        version: base.version,
        epoch: ctx.epoch,
        band: "binary",
        earnSize: ctx.earnSize,
        wave: ctx.wave,
        device: ctx.device,
        tier: ctx.tier,
        pressure: ctx.pressure
      });
    } catch {}

    return base.wrap(routeId, {
      meta: metaObj,
      context: ctx
    }, "earn-meta");
  }

  // -------------------------------------------------------------------------
  // REGISTER EARN ATTACHMENT — v40
  // -------------------------------------------------------------------------
  function registerEarnAttachment(routeId, attachment) {
    const ctx = getEarnContext(routeId, attachment, "earn-attachment");

    try {
      overlay.touch(routeId, ctx.epoch, {
        dataType: "earn-attachment",
        dnaTag: base.dnaTag,
        version: base.version,
        epoch: ctx.epoch,
        band: "binary",
        earnSize: ctx.earnSize,
        wave: ctx.wave,
        device: ctx.device,
        tier: ctx.tier,
        pressure: ctx.pressure
      });
    } catch {}

    return base.wrap(routeId, {
      attachment,
      context: ctx
    }, "earn-attachment");
  }

  // -------------------------------------------------------------------------
  // REGISTER EARN FORMULA — v40
  // -------------------------------------------------------------------------
  function registerEarnFormula(routeId, formulaStruct) {
    const ctx = getEarnContext(routeId, formulaStruct, "earn-formula");

    try {
      overlay.touch(routeId, ctx.epoch, {
        dataType: "earn-formula",
        dnaTag: base.dnaTag,
        version: base.version,
        epoch: ctx.epoch,
        band: "binary",
        earnSize: ctx.earnSize,
        wave: ctx.wave,
        device: ctx.device,
        tier: ctx.tier,
        pressure: ctx.pressure
      });
    } catch {}

    return base.wrap(routeId, {
      formula: formulaStruct,
      context: ctx
    }, "earn-formula");
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

    registerEarnSignal,
    registerEarnMeta,
    registerEarnAttachment,
    registerEarnFormula,

    promoteHot
  });
}

PulseRealm.CoreEarnMemoryAdapter = { createPulseEarnMemoryAdapter_v40 };
