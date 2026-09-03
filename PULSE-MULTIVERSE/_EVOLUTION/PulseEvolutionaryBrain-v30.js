// ============================================================================
// FILE: /_EVOLUTION/PulseEvolutionaryBrain-v33.js
// PULSE OS — v33-IMMORTAL-OMNI+++
// UI PAGE BRAIN / PAGE CORTEX — ROUTER+IMPULSE+MEMORY+BINARY+STYLES FUSION
// ============================================================================
//
// ROLE (v33-IMMORTAL-OMNI+++):
//   THE PAGE BRAIN — deterministic UI cortex + coordination layer.
//   • Wires Router + Styles + Memory + Binary + Code + CNS into one evolution loop.
//   • Chooses restore vs fresh evolve with explicit boot path + advantageV2 view.
//   • Reads Router/Styles/Memory/Binary envelopes as a unified OwnerAdvantageView.
//   • Emits CNS impulses for restore/evolve/boot with route + lineage + health hints.
//   • Maintains deterministic state + health for the page brain across evolutions.
//
// CONTRACT:
//   • PURE ORCHESTRATION — no IO, no network, no filesystem.
//   • Delegates persistence to MemoryOrgan.
//   • Delegates evolution to CodeOrgan.
//   • Delegates binary work to BinaryOrgan.
//   • Delegates routing to RouterOrgan.
//   • Delegates CSS to StylesOrgan.
//   • Deterministic output only, schema-versioned.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import { createPulseEvolutionaryRouterV33 } from "./PulseEvolutionaryRouter-v30.js";
import { createPulseEvolutionaryImpulseV33 } from "./PulseEvolutionaryImpulse-v30.js";
import { createPulseEvolutionaryMemoryV33 } from "./PulseEvolutionaryMemory-v30.js";
import { createPulseEvolutionaryBinaryV33 } from "./PulseEvolutionaryBinary-v30.js";
import { createPulseEvolutionaryStylesV33 } from "./PulseEvolutionaryStyles-v30.js";




// v33 brain schema for boot/health/owner-advantage metadata
const BRAIN_SCHEMA_VERSION_V33 = "v7";

// ---------------------------------------------------------------------------
// ROLE — v33 IMMORTAL EVOLUTIONARY BRAIN
// ---------------------------------------------------------------------------
export const BrainRoleV33 = {
  type: "Organ",
  subsystem: "UI",
  layer: "PageBrain",
  version: "33.0-Immortal-Omni+++",
  identity: "PulseEvolutionaryBrain-v33",

  evo: {
    driftProof: true,
    deterministic: true,

    pageBrain: true,
    dualBandAware: true,
    memoryAware: true,
    cnsAware: true,
    routeAware: true,
    unifiedAdvantageField: true,
    futureEvolutionReady: true,
    binaryAware: true,
    lineageAware: true,
    bootPathAware: true,
    errorAware: true,
    schemaVersioned: true,
    advantageView: true,
    healthAware: true,
    stylesAware: true,
    routerAware: true,
    impulseAware: true,

    // v20 upgrades
    v20SchemaAware: true,
    v20AdvantageHealth: true,
    v20BootMeta: true,
    v20ConsoleAligned: true,
    v20PageEvoAligned: true,

    // v30 upgrades
    v30OwnerAdvantageView: true,
    v30UnifiedAdvantageSnapshot: true,
    v30HealthAdvantageCoupled: true,
    v30ConsoleBridgeReady: true,
    v30DiagnosticsAligned: true,

    // v33 upgrades
    v33RouterStylesMemoryBinaryFusion: true,
    v33AdvantageV2Aligned: true,
    v33OrganismEnvelopeAware: true
  }
};

// ---------------------------------------------------------------------------
// HEALTH + ADVANTAGE HELPERS — v33
// ---------------------------------------------------------------------------
function clamp01(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  if (n < 0) return 0;
  if (n > 1) return 1;
  return n;
}

// Health is a deterministic function of:
//   • lastMode: "restore" vs "fresh" vs other
//   • lastError: presence of error
//   • lastAdvantage: sizeTier + entropyHint + unifiedAdvantageV2
//
function computeBrainHealthV33({ lastMode, lastError, lastAdvantage }) {
  const hasError = !!lastError;
  const modeScore =
    lastMode === "restore" ? 1.0 :
    lastMode === "fresh"   ? 0.9 :
                             0.7;

  const sizeTier = lastAdvantage.sizeTier || "unknown";
  const entropyHint = lastAdvantage.entropyHint ?? 0.5;
  const unifiedV2 = lastAdvantage.unifiedAdvantageV2 ?? lastAdvantage.unifiedScore ?? 0.8;

  let sizeScore = 0.9;
  if (sizeTier === "colossal") sizeScore = 0.5;
  else if (sizeTier === "huge") sizeScore = 0.6;
  else if (sizeTier === "large") sizeScore = 0.75;
  else if (sizeTier === "medium") sizeScore = 0.85;
  else if (sizeTier === "small") sizeScore = 0.95;
  else if (sizeTier === "empty") sizeScore = 0.8;

  const entropyScore = 0.7 + entropyHint * 0.3;

  let health =
    modeScore * 0.25 +
    sizeScore * 0.25 +
    entropyScore * 0.2 +
    unifiedV2 * 0.3;

  if (hasError) health *= 0.5;

  const status =
    health > 0.9 ? "excellent" :
    health > 0.75 ? "good" :
    health > 0.6 ? "fair" :
    health > 0.4 ? "degraded" :
                   "critical";

  return {
    health,
    status,
    hasError,
    sizeTier,
    entropyHint,
    unifiedAdvantageV2: unifiedV2
  };
}

function buildBootPathMetaV33({ bootPath, eventSeq, lastMode, lastError }) {
  return {
    schemaVersion: BRAIN_SCHEMA_VERSION_V33,
    bootPath,
    lastMode,
    lastError: lastError || null,
    seq: eventSeq
  };
}

// v33: unified owner-facing advantage snapshot
function buildOwnerAdvantageViewV33({ brainState }) {
  const h = brainState.lastHealth || null;
  const adv = brainState.lastAdvantage || null;

  return {
    schemaVersion: BRAIN_SCHEMA_VERSION_V33,
    identity: BrainRoleV33.identity,
    version: BrainRoleV33.version,

    healthStatus: h.status || "unknown",
    healthScore: h.health ?? null,
    hasError: !!h.hasError,

    advantage: adv || null,

    lastMode: brainState.lastMode,
    lastBootPath: brainState.lastBootPath,
    lastError: brainState.lastError || null,
    eventSeq: brainState.eventSeq
  };
}

// ---------------------------------------------------------------------------
// FACTORY — PULSE EVOLUTIONARY BRAIN v33
// ---------------------------------------------------------------------------
export function createPulseEvolutionaryBrainV33({
  Evolution,
  CNS,
  IQMap = PulseRealm.PulseOrganismMap,
  MemoryOrgan: MemoryOrganInput = null,
  RouterOrgan: RouterOrganInput = null,
  ImpulseOrgan: ImpulseOrganInput = null,
  BinaryOrgan: BinaryOrganInput = null,
  StylesOrgan: StylesOrganInput = null,
  createCode,
  log = console.log,
  warn = console.warn
} = {}) {
  // -------------------------------------------------------------------------
  // BRAIN STATE — deterministic, in‑memory only
  // -------------------------------------------------------------------------
  const BrainState = {
    initialized: false,
    lastMode: null,
    lastResult: null,
    lastBootPath: null,
    lastError: null,
    eventSeq: 0,
    lastAdvantage: null,
    lastHealth: null,
    lastOwnerAdvantageView: null
  };

  function nextSeq() {
    BrainState.eventSeq += 1;
    return BrainState.eventSeq;
  }

  function safeLog(stage, details = {}) {
    try {
      log(
        "🧠🌐 PULSE BOOT AI v32.0 — [PulseEvolutionaryBrain]",
        stage,
        {
          schemaVersion: BRAIN_SCHEMA_VERSION_V33,
          seq: BrainState.eventSeq,
          identity: BrainRoleV33.identity,
          version: BrainRoleV33.version,
          ...details
        }
      );
    } catch {
      // never throw
    }
  }

  function refreshOwnerAdvantageView() {
    BrainState.lastOwnerAdvantageView = buildOwnerAdvantageViewV33({
      brainState: BrainState
    });
    return BrainState.lastOwnerAdvantageView;
  }

  // -------------------------------------------------------------------------
  // ORGANS — Router / Impulse / Memory / Binary / Styles / Code
  // -------------------------------------------------------------------------
  const MemoryOrgan =
    MemoryOrganInput ||
    createPulseEvolutionaryMemoryV33({
      routeId: "page",
      IQMap,
      CNS,
      log,
      warn
    });

  const RouterOrgan =
    RouterOrganInput ||
    createPulseEvolutionaryRouterV33({
      CNS,
      Evolution,
      MemoryOrgan,
      ImpulseOrgan: null, // wired after ImpulseOrgan exists
      IQMap,
      log,
      warn
    });

  const ImpulseOrgan =
    ImpulseOrganInput ||
    createPulseEvolutionaryImpulseV33({
      CNS,
      Evolution,
      Router: RouterOrgan,
      Memory: MemoryOrgan,
      IQMap,
      log,
      warn
    });

  // Patch Router with ImpulseOrgan now that it exists
  if (!RouterOrganInput && RouterOrgan && !RouterOrgan.ImpulseOrgan) {
    // no mutation of external contract; just advisory wiring if present
    RouterOrgan.ImpulseOrgan = ImpulseOrgan;
  }

  const BinaryOrgan =
    BinaryOrganInput ||
    createPulseEvolutionaryBinaryV33({
      Evolution,
      RouteOrgan: RouterOrgan,
      log,
      warn
    });

  const StylesOrgan =
    StylesOrganInput ||
    createPulseEvolutionaryStylesV33({
      IQMap,
      Icons: null,
      Animations: null,
      MemoryOrgan,
      Router: RouterOrgan,
      CNS,
      log,
      warn
    });

  const CodeOrgan =
    typeof createCode === "function"
      ? createCode({
          Evolution,
          LongTermMemory: MemoryOrgan,
          CNS,
          RouterOrgan,
          ImpulseOrgan,
          BinaryOrgan,
          StylesOrgan,
          log,
          warn
        })
      : null;

  if (!MemoryOrgan) warn("[PulseEvolutionaryBrain-v33] NO_MEMORY_ORGAN");
  if (!CodeOrgan) warn("[PulseEvolutionaryBrain-v33] NO_CODE_ORGAN");
  if (!RouterOrgan) warn("[PulseEvolutionaryBrain-v33] NO_ROUTER_ORGAN");
  if (!StylesOrgan) warn("[PulseEvolutionaryBrain-v33] NO_STYLES_ORGAN");
  if (!BinaryOrgan) warn("[PulseEvolutionaryBrain-v33] NO_BINARY_ORGAN");

  // -------------------------------------------------------------------------
  // ADVANTAGE TAP — fuse Binary + Router + Styles + Memory into one view
  // -------------------------------------------------------------------------
  function buildUnifiedAdvantageSnapshot() {
    const binarySnap =
      BinaryOrgan?.getAdvantageSnapshot?.() || null;
    const unifiedAdv =
      BinaryOrgan?.getUnifiedAdvantageV2?.() ??
      BinaryOrgan?.getUnifiedAdvantage?.() ??
      binarySnap?.unifiedScore ??
      0.8;

    const routerExp = RouterOrgan?.RouterState?.lastExperience || null;
    const routerAdv = routerExp?.blocks?.find?.(
      (b) => b.id === "router.advantage"
    ) || null;
    const routerSuper = routerAdv?.advantageSuper ?? null;

    const stylesEnv = StylesOrgan?.getLastEnvelope?.() || null;
    const stylesBand = StylesOrgan?.getLastBand?.() || null;
    const stylesIntegrity = StylesOrgan?.getLastIntegrity?.() || null;

    const memTier = MemoryOrgan?.getTier?.() || "info";
    const memChannel = MemoryOrgan?.getChannel?.() || "memory";

    const sizeTier = binarySnap?.sizeTier || "unknown";
    const entropyHint = binarySnap?.entropyHint ?? 0.5;

    return {
      sizeTier,
      entropyHint,
      unifiedAdvantageV2: unifiedAdv,
      unifiedScore: unifiedAdv,
      binary: binarySnap,
      routerAdvantageSuper: routerSuper,
      stylesEnv,
      stylesBand,
      stylesIntegrity,
      memoryTier: memTier,
      memoryChannel: memChannel
    };
  }

  function tapAdvantageFromBinary(binaryPayload) {
    if (!BinaryOrgan || !binaryPayload) return null;
    try {
      const enc = BinaryOrgan.encode(binaryPayload);
      if (enc.ok && enc.advantage) {
        const fused = buildUnifiedAdvantageSnapshot();
        BrainState.lastAdvantage = fused;
        return fused;
      }
    } catch (err) {
      warn("[PulseEvolutionaryBrain-v33] ADVANTAGE_TAP_ERROR", String(err));
    }
    return null;
  }

  function refreshAdvantageFromOrgans() {
    const fused = buildUnifiedAdvantageSnapshot();
    BrainState.lastAdvantage = fused;
    return fused;
  }

  // -------------------------------------------------------------------------
  // RESTORE PATH — try to restore existing page model
  // -------------------------------------------------------------------------
  async function restore() {
    nextSeq();

    if (!MemoryOrgan || !CodeOrgan) {
      const errorInfo = "MissingOrgans";
      BrainState.lastMode = "restore";
      BrainState.lastError = errorInfo;
      safeLog("RESTORE_MISSING_ORGANS", { error: errorInfo });

      const advantage = BrainState.lastAdvantage || refreshAdvantageFromOrgans();
      const health = computeBrainHealthV33({
        lastMode: BrainState.lastMode,
        lastError: BrainState.lastError,
        lastAdvantage: advantage
      });
      BrainState.lastHealth = health;
      const ownerView = refreshOwnerAdvantageView();

      return {
        ok: false,
        error: errorInfo,
        brainHealth: health,
        ownerAdvantageView: ownerView,
        bootPathMeta: buildBootPathMetaV33({
          bootPath: "restore",
          eventSeq: BrainState.eventSeq,
          lastMode: BrainState.lastMode,
          lastError: BrainState.lastError
        })
      };
    }

    try {
      const model = await MemoryOrgan.loadPage();
      if (!model) {
        BrainState.lastMode = "restore";
        BrainState.lastError = "NoSavedPage";
        safeLog("RESTORE_EMPTY");

        const advantage = BrainState.lastAdvantage || refreshAdvantageFromOrgans();
        const health = computeBrainHealthV33({
          lastMode: BrainState.lastMode,
          lastError: BrainState.lastError,
          lastAdvantage: advantage
        });
        BrainState.lastHealth = health;
        BrainState.lastAdvantage = advantage;
        const ownerView = refreshOwnerAdvantageView();

        return {
          ok: false,
          error: "NoSavedPage",
          brainHealth: health,
          ownerAdvantageView: ownerView,
          bootPathMeta: buildBootPathMetaV33({
            bootPath: "restore",
            eventSeq: BrainState.eventSeq,
            lastMode: BrainState.lastMode,
            lastError: BrainState.lastError
          })
        };
      }

      const res =
        (await CodeOrgan.restore()) ?? { ok: true, model };

      BrainState.lastMode = "restore";
      BrainState.lastResult = res || null;
      BrainState.lastError = res.ok ? null : (res.error || null);

      const advantage =
        tapAdvantageFromBinary(res.binaryPayload || null) ||
        refreshAdvantageFromOrgans();

      const health = computeBrainHealthV33({
        lastMode: BrainState.lastMode,
        lastError: BrainState.lastError,
        lastAdvantage: advantage
      });
      BrainState.lastHealth = health;
      BrainState.lastAdvantage = advantage;
      const ownerView = refreshOwnerAdvantageView();

      CNS.emitImpulse("PulseEvolutionaryBrain-v33", {
        event: "restore",
        ok: !!res.ok,
        health,
        bootPath: "restore",
        advantage,
        ownerAdvantageView: ownerView
      });

      safeLog("RESTORE_DONE", {
        ok: !!res.ok,
        healthStatus: health.status
      });

      return {
        ...res,
        brainHealth: health,
        ownerAdvantageView: ownerView,
        bootPathMeta: buildBootPathMetaV33({
          bootPath: "restore",
          eventSeq: BrainState.eventSeq,
          lastMode: BrainState.lastMode,
          lastError: BrainState.lastError
        })
      };
    } catch (err) {
      const msg = String(err);
      BrainState.lastMode = "restore";
      BrainState.lastError = msg;

      const advantage = BrainState.lastAdvantage || refreshAdvantageFromOrgans();
      const health = computeBrainHealthV33({
        lastMode: BrainState.lastMode,
        lastError: BrainState.lastError,
        lastAdvantage: advantage
      });
      BrainState.lastHealth = health;
      BrainState.lastAdvantage = advantage;
      const ownerView = refreshOwnerAdvantageView();

      CNS.emitImpulse("PulseEvolutionaryBrain-v33", {
        event: "restore",
        ok: false,
        health,
        bootPath: "restore",
        ownerAdvantageView: ownerView
      });

      safeLog("RESTORE_ERROR", { error: msg, healthStatus: health.status });
      return {
        ok: false,
        error: "RestoreError",
        brainHealth: health,
        ownerAdvantageView: ownerView,
        bootPathMeta: buildBootPathMetaV33({
          bootPath: "restore",
          eventSeq: BrainState.eventSeq,
          lastMode: BrainState.lastMode,
          lastError: BrainState.lastError
        })
      };
    }
  }

  // -------------------------------------------------------------------------
  // FRESH EVOLVE PATH — new page evolution
  // -------------------------------------------------------------------------
  async function freshEvolve({
    type = "page:init",
    payload,
    binaryPayload,
    context
  } = {}) {
    nextSeq();

    if (!CodeOrgan) {
      const errorInfo = "MissingCodeOrgan";
      BrainState.lastMode = "fresh";
      BrainState.lastError = errorInfo;
      safeLog("FRESH_EVOLVE_MISSING_CODE", { error: errorInfo });

      const advantage = BrainState.lastAdvantage || refreshAdvantageFromOrgans();
      const health = computeBrainHealthV33({
        lastMode: BrainState.lastMode,
        lastError: BrainState.lastError,
        lastAdvantage: advantage
      });
      BrainState.lastHealth = health;
      BrainState.lastAdvantage = advantage;
      const ownerView = refreshOwnerAdvantageView();

      return {
        ok: false,
        error: errorInfo,
        brainHealth: health,
        ownerAdvantageView: ownerView
      };
    }

    try {
      const res = await CodeOrgan.evolve({ type, payload, binaryPayload, context });
      BrainState.lastMode = "fresh";
      BrainState.lastResult = res || null;
      BrainState.lastError = res.ok ? null : (res.error || null);

      const advantage =
        tapAdvantageFromBinary(binaryPayload || res.binaryPayload || null) ||
        refreshAdvantageFromOrgans();

      const health = computeBrainHealthV33({
        lastMode: BrainState.lastMode,
        lastError: BrainState.lastError,
        lastAdvantage: advantage
      });
      BrainState.lastHealth = health;
      BrainState.lastAdvantage = advantage;
      const ownerView = refreshOwnerAdvantageView();

      CNS.emitImpulse("PulseEvolutionaryBrain-v33", {
        event: "freshEvolve",
        ok: !!res.ok,
        health,
        bootPath: "fresh",
        advantage,
        ownerAdvantageView: ownerView
      });

      safeLog("FRESH_EVOLVE_DONE", {
        ok: !!res.ok,
        healthStatus: health.status
      });

      return {
        ...res,
        brainHealth: health,
        ownerAdvantageView: ownerView
      };
    } catch (err) {
      const msg = String(err);
      BrainState.lastMode = "fresh";
      BrainState.lastError = msg;

      const advantage = BrainState.lastAdvantage || refreshAdvantageFromOrgans();
      const health = computeBrainHealthV33({
        lastMode: BrainState.lastMode,
        lastError: BrainState.lastError,
        lastAdvantage: advantage
      });
      BrainState.lastHealth = health;
      BrainState.lastAdvantage = advantage;
      const ownerView = refreshOwnerAdvantageView();

      CNS.emitImpulse("PulseEvolutionaryBrain-v33", {
        event: "freshEvolve",
        ok: false,
        health,
        bootPath: "fresh",
        ownerAdvantageView: ownerView
      });

      safeLog("FRESH_EVOLVE_ERROR", { error: msg, healthStatus: health.status });
      return {
        ok: false,
        error: "FreshEvolveError",
        brainHealth: health,
        ownerAdvantageView: ownerView
      };
    }
  }

  // -------------------------------------------------------------------------
  // BOOT PATH (RESTORE → FALLBACK FRESH)
// -------------------------------------------------------------------------
  async function boot({ payload, binaryPayload, context } = {}) {
    nextSeq();
    safeLog("BOOT_START");

    const restored = await restore();
    if (restored.ok) {
      BrainState.initialized = true;
      BrainState.lastBootPath = "restore";

      const meta = buildBootPathMetaV33({
        bootPath: "restore",
        eventSeq: BrainState.eventSeq,
        lastMode: BrainState.lastMode,
        lastError: BrainState.lastError
      });

      safeLog("BOOT_RESTORE_PATH", {
        healthStatus: restored.brainHealth.status
      });

      return {
        ...restored,
        bootPathMeta: meta
      };
    }

    const fresh = await freshEvolve({
      type: "page:init",
      payload,
      binaryPayload,
      context
    });
    BrainState.initialized = true;
    BrainState.lastBootPath = "fresh";

    const meta = buildBootPathMetaV33({
      bootPath: "fresh",
      eventSeq: BrainState.eventSeq,
      lastMode: BrainState.lastMode,
      lastError: BrainState.lastError
    });

    safeLog("BOOT_FRESH_PATH", {
      healthStatus: fresh.brainHealth.status
    });

    return {
      ...fresh,
      bootPathMeta: meta
    };
  }

  function prewarm() {
    try {
      // Touch READ
      const snapshot = MemoryOrgan.read("memory:prewarm:init") || null;

      // Touch WRITE
      MemoryOrgan.write("memory:prewarm:init", {
        ts: Date.now(),
        status: "initialized"
      });

      // Touch LOAD (if envelope exists)
      MemoryOrgan.loadPage?.();

      return true;
    } catch (err) {
      console.warn("💾 MemoryOrgan PREWARM failed:", err);
      return false;
    }
  }


  // -------------------------------------------------------------------------
  // PUBLIC ORGAN SURFACE
  // -------------------------------------------------------------------------
  const PulseEvolutionaryBrainV33 = {
    BrainRole: BrainRoleV33,
    BrainState,
    boot,
    prewarm,
    restore,
    freshEvolve,

    getHealthSnapshot() {
      return BrainState.lastHealth || null;
    },

    getAdvantageSnapshot() {
      return BrainState.lastAdvantage || null;
    },

    getOwnerAdvantageView() {
      return BrainState.lastOwnerAdvantageView || refreshOwnerAdvantageView();
    },

    // expose wired organs for console/diagnostics
    organs: {
      MemoryOrgan,
      RouterOrgan,
      ImpulseOrgan,
      BinaryOrgan,
      StylesOrgan,
      CodeOrgan
    }
  };

  safeLog("Initializing Components..", {
    identity: BrainRoleV33.identity,
    version: BrainRoleV33.version,
    schemaVersion: BRAIN_SCHEMA_VERSION_V33
  });

  return PulseEvolutionaryBrainV33;
}

// ---------------------------------------------------------------------------
// GLOBAL REGISTRATION (WINDOW-SAFE, IMMORTAL)
// ---------------------------------------------------------------------------
try {
  
    PulseRealm.PulseEvolutionaryBrainV33 = createPulseEvolutionaryBrainV33;
  
} catch {
  // never throw
}
