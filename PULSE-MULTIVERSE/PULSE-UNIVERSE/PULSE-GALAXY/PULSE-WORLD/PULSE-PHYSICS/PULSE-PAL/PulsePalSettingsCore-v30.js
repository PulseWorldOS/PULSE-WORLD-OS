// ============================================================================
// FILE: /PULSE-PAL/PulsePalSettingsCore-v30.js
// PULSE OS — v30 IMMORTAL‑OMNI
// PULSE‑PAL SETTINGS CORE — THEME + GLOW + ANIM + PERSONA + PRESETS
// PURE LOGIC ORGAN • BRIDGE‑FREE • DAEMON‑FREE
// ============================================================================

import { PulsePalGlow } from "./PulsePalGlow-v30.js";
import { PulsePalAnim } from "./PulsePalAnim-v30.js";
import { PulsePalCivLayer } from "./PulsePalCivLayer-v30.js";
// ============================================================================
//  PulsePalSettingsCore — IMMORTAL PSEUDO‑CLASS (v31 IMMORTAL‑OMNI)
// ============================================================================

export const PulsePalSettingsCore = (() => {

  // ------------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
  // ------------------------------------------------------------
  const lane = {
    state: {
      version: "v30 IMMORTAL‑OMNI",
      lineage: "Pulse‑OS Evolutionary",

      theme: "dark",
      glow: "cyan",
      anim: "medium",

      avatarMode: "hybrid",

      persona: {
        warmth: "medium",
        focus: "medium",
        expressiveness: "medium"
      },

      memoryTier: "balanced",
      lastPreset: null
    }
  };

  // ------------------------------------------------------------
  // SNAPSHOT
  // ------------------------------------------------------------
  const snapshot = () => ({ ...lane.state });

  // ------------------------------------------------------------
  // BASIC SETTERS (SYNC WITH REAL ORGANS)
  // ------------------------------------------------------------
  const setTheme = (theme) => {
    const allowed = ["dark", "neon", "glass", "terminal"];
    if (!allowed.includes(theme)) return;
    lane.state.theme = theme;
    try { PulsePalGlow.setTheme(theme); } catch {}
  };

  const setGlow = (glow) => {
    const allowed = ["cyan", "purple", "gold", "stealth"];
    if (!allowed.includes(glow)) return;
    lane.state.glow = glow;
    try { PulsePalGlow.setMode(glow); } catch {}
  };

  const setAnim = (anim) => {
    const allowed = ["low", "medium", "high", "auto"];
    if (!allowed.includes(anim)) return;
    lane.state.anim = anim;
    try { PulsePalAnim.setIntensity(anim); } catch {}
  };

  const setAvatarMode = (mode) => {
    const allowed = ["fox", "human", "system", "civ", "hybrid"];
    if (!allowed.includes(mode)) return;
    lane.state.avatarMode = mode;
  };

  const setMemoryTier = (tier) => {
    const allowed = ["light", "balanced", "deep"];
    if (!allowed.includes(tier)) return;
    lane.state.memoryTier = tier;
  };

  // ------------------------------------------------------------
  // PERSONA TUNING
  // ------------------------------------------------------------
  const setPersona = (trait, level) => {
    const allowedTraits = ["warmth", "focus", "expressiveness"];
    const allowedLevels = ["low", "medium", "high"];
    if (!allowedTraits.includes(trait)) return;
    if (!allowedLevels.includes(level)) return;

    lane.state.persona = {
      ...lane.state.persona,
      [trait]: level
    };
  };

  // ------------------------------------------------------------
  // PRESETS (SYNC WITH REAL ORGANS)
  // ------------------------------------------------------------
  const applyPreset = (preset) => {
    switch (preset) {

      case "work_focus":
        setTheme("dark");
        setGlow("cyan");
        setAnim("low");
        setAvatarMode("human");
        lane.state.persona = { warmth: "medium", focus: "high", expressiveness: "medium" };
        setMemoryTier("balanced");
        try { PulsePalCivLayer.setTier("sandbox"); } catch {}
        break;

      case "play_civilization":
        setTheme("neon");
        setGlow("gold");
        setAnim("high");
        setAvatarMode("civ");
        lane.state.persona = { warmth: "high", focus: "medium", expressiveness: "high" };
        setMemoryTier("deep");
        try {
          PulsePalCivLayer.setTier("epic");
          PulsePalCivLayer.setFocus("exploration");
        } catch {}
        break;

      case "build_architect":
        setTheme("glass");
        setGlow("purple");
        setAnim("medium");
        setAvatarMode("system");
        lane.state.persona = { warmth: "medium", focus: "high", expressiveness: "medium" };
        setMemoryTier("deep");
        try {
          PulsePalCivLayer.setTier("local");
          PulsePalCivLayer.setFocus("governance");
        } catch {}
        break;

      case "rest_low":
        setTheme("dark");
        setGlow("stealth");
        setAnim("low");
        setAvatarMode("hybrid");
        lane.state.persona = { warmth: "high", focus: "low", expressiveness: "low" };
        setMemoryTier("light");
        try {
          PulsePalCivLayer.setTier("sandbox");
          PulsePalCivLayer.setFocus("culture");
        } catch {}
        break;

      default:
        return;
    }

    lane.state.lastPreset = preset;
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    snapshot,

    setTheme,
    setGlow,
    setAnim,
    setAvatarMode,
    setMemoryTier,
    setPersona,
    applyPreset
  };

})();

// ============================================================================
// SINGLETON + PUBLIC API
// ============================================================================

const _settingsCoreInstance = PulsePalSettingsCore;

export const PulsePalSettingsCoreAPI = {
  snapshot: () => _settingsCoreInstance.snapshot(),
  setTheme: theme => _settingsCoreInstance.setTheme(theme),
  setGlow: glow => _settingsCoreInstance.setGlow(glow),
  setAnim: anim => _settingsCoreInstance.setAnim(anim),
  setAvatarMode: mode => _settingsCoreInstance.setAvatarMode(mode),
  setMemoryTier: tier => _settingsCoreInstance.setMemoryTier(tier),
  setPersona: (trait, level) => _settingsCoreInstance.setPersona(trait, level),
  applyPreset: preset => _settingsCoreInstance.applyPreset(preset)
};

try {
  PulseRealm.PulsePalSettingsCore = PulsePalSettingsCoreAPI;
} catch {}
