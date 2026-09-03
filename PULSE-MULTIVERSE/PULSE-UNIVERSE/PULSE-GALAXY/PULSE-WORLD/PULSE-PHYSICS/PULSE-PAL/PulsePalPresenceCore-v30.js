// ============================================================================
// FILE: /PULSE-PAL/PulsePalPresenceCore-v30.js
// PULSE OS — v30 IMMORTAL-EVO+++
// PULSE‑PAL PRESENCE CORE — ONE-BAND PRESENCE STATE + SNAPSHOT + SETTERS
// ============================================================================
//
// ROLE (v30):
//   Single source of truth for Pulse‑Pal presence across ALL layers:
//     • tone, band, energy, focus
//     • activity (listening / thinking / active / background)
//     • mode (advisor, architect, grid, fox, human, civilization, etc.)
//     • species (fox / human / system / avatar)
//     • aura + expression
//     • worldMode / civTier / challengeBand
//     • modeWeights / modeBlend (for Mode/Persona engines)
//
// CONTRACT:
//   • Pure logic organ (no DOM, no HTML, no network)
//   • Deterministic setters
//   • Evolvable (additive fields only)
//   • Exposed as CorePresence for all UI organs/pages
// ============================================================================

const DEFAULT_STATE = {
  // core presence band
  tone: "warm",          // warm / neutral / technical / playful / mentor
  band: "companion",     // companion / system / game / civ / etc.
  energy: "balanced",    // low / balanced / high
  focus: "general",      // general / focused / deep

  // activity
  activity: "listening", // listening / thinking / active / background
  activityMode: null,    // optional alias

  // archetype / mode
  mode: "advisor",       // advisor / architect / grid / mesh / fox / human / ...
  modeWeights: {},       // { modeName: weight }
  modeBlend: {},         // alias for engines that expect modeBlend

  // species / avatar band
  species: "fox",        // fox / human / system / avatar

  // aura + expression
  aura: "calm",          // calm / bright / focused / nocturne
  auraBand: null,        // alias
  expression: "medium",  // low / medium / high
  expressionLevel: null, // alias

  // world / civ hooks
  worldMode: "default",  // default / city / colony / empire / cosmos
  civTier: "settler",    // settler / builder / navigator / architect
  challengeBand: "balanced", // cozy / balanced / intense

  // optional warmth override for persona glance
  warmth: null
};
// ============================================================================
//  PulsePalPresenceCore — IMMORTAL PSEUDO‑CLASS (v31 IMMORTAL)
// ============================================================================

export const PulsePalPresenceCore = (() => {

  // ------------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
  // ------------------------------------------------------------
  const lane = {
    state: { ...DEFAULT_STATE }
  };

  // ------------------------------------------------------------
  // SNAPSHOT (READ‑ONLY VIEW)
// ------------------------------------------------------------
  const snapshot = () => ({
    ...lane.state
  });

  // ------------------------------------------------------------
  // INTERNAL MERGE (keeps aliases in sync)
// ------------------------------------------------------------
  const _merge = (patch) => {
    lane.state = { ...lane.state, ...patch };

    // aura <-> auraBand
    if (patch.aura && !patch.auraBand) {
      lane.state.auraBand = lane.state.aura;
    }
    if (patch.auraBand && !patch.aura) {
      lane.state.aura = lane.state.auraBand;
    }

    // expression <-> expressionLevel
    if (patch.expression && !patch.expressionLevel) {
      lane.state.expressionLevel = lane.state.expression;
    }
    if (patch.expressionLevel && !patch.expression) {
      lane.state.expression = lane.state.expressionLevel;
    }

    // modeWeights <-> modeBlend
    if (patch.modeWeights && !patch.modeBlend) {
      lane.state.modeBlend = lane.state.modeWeights;
    }
    if (patch.modeBlend && !patch.modeWeights) {
      lane.state.modeWeights = lane.state.modeBlend;
    }

    // activity <-> activityMode
    if (patch.activity && !patch.activityMode) {
      lane.state.activityMode = lane.state.activity;
    }
    if (patch.activityMode && !patch.activity) {
      lane.state.activity = lane.state.activityMode;
    }
  };

  // ------------------------------------------------------------
  // SIMPLE SETTERS (UI surfaces)
// ------------------------------------------------------------
  const setTone          = (tone)          => tone          && _merge({ tone });
  const setBand          = (band)          => band          && _merge({ band });
  const setEnergy        = (energy)        => energy        && _merge({ energy });
  const setFocus         = (focus)         => focus         && _merge({ focus });
  const setActivity      = (activity)      => activity      && _merge({ activity });
  const setMode          = (mode)          => mode          && _merge({ mode });
  const setSpecies       = (species)       => species       && _merge({ species });
  const setAura          = (aura)          => aura          && _merge({ aura });
  const setExpression    = (level)         => level         && _merge({ expression: level });
  const setWorldMode     = (worldMode)     => worldMode     && _merge({ worldMode });
  const setCivTier       = (civTier)       => civTier       && _merge({ civTier });
  const setChallengeBand = (challengeBand) => challengeBand && _merge({ challengeBand });

  // ------------------------------------------------------------
  // MODE WEIGHTS / BLEND
  // ------------------------------------------------------------
  const setModeWeights = (weights) =>
    weights && typeof weights === "object" && _merge({ modeWeights: { ...weights } });

  const setModeBlend = (blend) =>
    blend && typeof blend === "object" && _merge({ modeBlend: { ...blend } });

  // ------------------------------------------------------------
  // WARMTH OVERRIDE
  // ------------------------------------------------------------
  const setWarmth = (value) =>
    value != null && _merge({ warmth: value });

  // ------------------------------------------------------------
  // RESET
  // ------------------------------------------------------------
  const reset = () => {
    lane.state = { ...DEFAULT_STATE };
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    snapshot,

    setTone,
    setBand,
    setEnergy,
    setFocus,
    setActivity,
    setMode,
    setSpecies,
    setAura,
    setExpression,
    setWorldMode,
    setCivTier,
    setChallengeBand,

    setModeWeights,
    setModeBlend,
    setWarmth,

    reset
  };

})();


// Singleton instance
const _presenceCoreInstance = PulsePalPresenceCore;

// PUBLIC API (what other organs/pages import as CorePresence)
export const PulsePalPresenceCoreV30 = {
  snapshot: () => _presenceCoreInstance.snapshot(),
  setTone: (t) => _presenceCoreInstance.setTone(t),
  setBand: (b) => _presenceCoreInstance.setBand(b),
  setEnergy: (e) => _presenceCoreInstance.setEnergy(e),
  setFocus: (f) => _presenceCoreInstance.setFocus(f),
  setActivity: (a) => _presenceCoreInstance.setActivity(a),
  setMode: (m) => _presenceCoreInstance.setMode(m),
  setSpecies: (s) => _presenceCoreInstance.setSpecies(s),
  setAura: (a) => _presenceCoreInstance.setAura(a),
  setExpression: (x) => _presenceCoreInstance.setExpression(x),
  setWorldMode: (w) => _presenceCoreInstance.setWorldMode(w),
  setCivTier: (c) => _presenceCoreInstance.setCivTier(c),
  setChallengeBand: (c) => _presenceCoreInstance.setChallengeBand(c),
  setModeWeights: (w) => _presenceCoreInstance.setModeWeights(w),
  setModeBlend: (b) => _presenceCoreInstance.setModeBlend(b),
  setWarmth: (v) => _presenceCoreInstance.setWarmth(v),
  reset: () => _presenceCoreInstance.reset()
};

try {
  
    PulseRealm.CorePresence = PulsePalPresenceCoreV30;
    PulseRealm.PulsePalPresenceCoreV30 = PulsePalPresenceCoreV30;
  
} catch {
  // never throw
}
