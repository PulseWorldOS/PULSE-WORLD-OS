// ============================================================================
// FILE: /PULSE-ENGINE/PulseEngineEvolutionaryMemory.js
// PULSE OS — v33-IMMORTAL-ENGINE-MEMORY
// ENGINE-LAYER MEMORY SURFACE (relays CoreMemory directly)
// ============================================================================
//
// ROLE (v33):
//   • Provide the memory API required by PulseEngineProcess.
//   • NO governor creation.
//   • NO memory wrapping.
//   • NO extra layers.
//   • Simply relay PulseCoreGMemory as the Engine MemoryOrgan.
//   • Deterministic, zero-gravity, zero-duplication.
//
// CONTRACT:
//   • savePage(model)
//   • loadPage()
//   • recordPageLineage(model)
//   • getPageLineage()
//   • getTier()
//   • getChannel()
//   • getEvolutionAdvisory()
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




export function createPulseEngineEvolutionaryMemory({
  dnaTag = "engine-memory",
  version = "33.0-IMMORTAL-ENGINE-MEMORY",
  log = console.log,
  warn = console.warn
} = {}) {

  // -------------------------------------------------------------------------
  // MEMORY ORGAN (ONLY SUBIMPORT)
  // -------------------------------------------------------------------------
  const CoreMemory = PulseRealm.PulseCoreMemory;

  // -------------------------------------------------------------------------
  // ENGINE MEMORY STATE (LOCAL CACHE ONLY)
  // -------------------------------------------------------------------------
  const EngineState = {
    lastPageModel: null,
    lastLineage: null,
    lastAdvisory: null,
    lastTier: "unknown",
    lastChannel: "default"
  };

  function safeLog(stage, details = {}) {
    try {
      log(`💾 PULSE CORE MEMORY v33 - [PulseEngineEvolutionaryMemory] ${stage}`, details);
    } catch {}
  }

  // -------------------------------------------------------------------------
  // SAVE PAGE MODEL
  // -------------------------------------------------------------------------
  async function savePage(model) {
    try {
      EngineState.lastPageModel = model;
      EngineState.lastLineage = model.lineage || null;

      CoreMemory.set("engine.page.model", "latest", model);
      CoreMemory.set("engine.page.lineage", "latest", model.lineage || {});
      CoreMemory.set("engine.page.adv", "latest", model.advantage || null);

      safeLog("SAVE_PAGE_OK", {
        sizeTier: model.advantage.sizeTier,
        unifiedAdvantage: model.unifiedAdvantage
      });

      return { ok: true };
    } catch (err) {
      const msg = String(err);
      warn("💾 PULSE CORE MEMORY v33 - [PulseEngineEvolutionaryMemory] SAVE_PAGE_ERROR", msg);
      return { ok: false, error: msg };
    }
  }

  // -------------------------------------------------------------------------
  // LOAD PAGE MODEL
  // -------------------------------------------------------------------------
  async function loadPage() {
    try {
      const model = CoreMemory.get("engine.page.model", "latest");
      if (!model) {
        safeLog("LOAD_PAGE_EMPTY");
        return null;
      }

      EngineState.lastPageModel = model;
      EngineState.lastLineage = model.lineage || null;

      safeLog("LOAD_PAGE_OK", {
        sizeTier: model.advantage.sizeTier,
        unifiedAdvantage: model.unifiedAdvantage
      });

      return model;
    } catch (err) {
      const msg = String(err);
      warn("💾 PULSE CORE MEMORY v33 - [PulseEngineEvolutionaryMemory] LOAD_PAGE_ERROR", msg);
      return null;
    }
  }

  // -------------------------------------------------------------------------
  // RECORD PAGE LINEAGE
  // -------------------------------------------------------------------------
  function recordPageLineage(model) {
    try {
      const lineage = model.lineage || {};
      EngineState.lastLineage = lineage;

      CoreMemory.set("engine.page.lineage", "latest", lineage);

      safeLog("LINEAGE_RECORD_OK", { lineage });
    } catch (err) {
      warn("💾 PULSE CORE MEMORY v33 - [PulseEngineEvolutionaryMemory] LINEAGE_RECORD_ERROR", String(err));
    }
  }

  // -------------------------------------------------------------------------
  // GET PAGE LINEAGE
  // -------------------------------------------------------------------------
  function getPageLineage() {
    try {
      return (
        EngineState.lastLineage ||
        CoreMemory.get("engine.page.lineage", "latest") ||
        {}
      );
    } catch {
      return {};
    }
  }

  // -------------------------------------------------------------------------
  // GET TIER
  // -------------------------------------------------------------------------
  function getTier() {
    try {
      const tier =
        CoreMemory.get("engine.page.tier", "latest") ||
        EngineState.lastTier ||
        "unknown";

      EngineState.lastTier = tier;
      return tier;
    } catch {
      return "unknown";
    }
  }

  // -------------------------------------------------------------------------
  // GET CHANNEL
  // -------------------------------------------------------------------------
  function getChannel() {
    try {
      const channel =
        CoreMemory.get("engine.page.channel", "latest") ||
        EngineState.lastChannel ||
        "default";

      EngineState.lastChannel = channel;
      return channel;
    } catch {
      return "default";
    }
  }

  // -------------------------------------------------------------------------
  // GET EVOLUTION ADVISORY
  // -------------------------------------------------------------------------
  function getEvolutionAdvisory() {
    try {
      const adv =
        CoreMemory.get("engine.page.adv", "latest") ||
        EngineState.lastAdvisory ||
        null;

      EngineState.lastAdvisory = adv;
      return adv;
    } catch {
      return null;
    }
  }

  // -------------------------------------------------------------------------
  // PUBLIC ENGINE MEMORY ORGAN
  // -------------------------------------------------------------------------
  const EngineMemory = {
    version,
    dnaTag,

    savePage,
    loadPage,

    recordPageLineage,
    getPageLineage,

    getTier,
    getChannel,
    getEvolutionAdvisory,

    CoreMemory
  };

  safeLog("Initializing Components..", { version, dnaTag });

  return EngineMemory;
}

// ============================================================================
// DEFAULT INSTANCE
// ============================================================================
export const PulseEngineEvolutionaryMemory =
  createPulseEngineEvolutionaryMemory();

PulseRealm.EngineEvolutionaryMemory = {
  createPulseEngineEvolutionaryMemory,
  PulseEngineEvolutionaryMemory
}