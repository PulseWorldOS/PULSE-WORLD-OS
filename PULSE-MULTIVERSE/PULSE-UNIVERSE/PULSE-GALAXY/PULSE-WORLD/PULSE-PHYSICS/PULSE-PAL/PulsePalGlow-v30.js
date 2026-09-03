// ============================================================================
//  PulsePalGlow-v30 — IMMORTAL PSEUDO ORGAN
//  Global Glow Profile: Color + Intensity + Theme
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

export const PulsePalGlow = (() => {

  const create = () => {
    // Internal state (formerly this.state)
    let state = {
      version: "v30-IMMORTAL+++",
      mode: "cyan",        // cyan | purple | gold | stealth
      intensity: "medium", // low | medium | high
      theme: "dark",       // dark | neon | glass | terminal
      lastSetAt: null
    };

    const snapshot = () => ({ ...state });

    const stamp = () => { state.lastSetAt = PulseRealm.PulseNOW; };

    // -------------------------------------------------------------
    // MODE
    // -------------------------------------------------------------
    const setMode = (mode) => {
      const allowed = ["cyan", "purple", "gold", "stealth"];
      if (!allowed.includes(mode)) return snapshot();
      state.mode = mode;
      stamp();
      return snapshot();
    };

    // -------------------------------------------------------------
    // INTENSITY
    // -------------------------------------------------------------
    const setIntensity = (level) => {
      const allowed = ["low", "medium", "high"];
      if (!allowed.includes(level)) return snapshot();
      state.intensity = level;
      stamp();
      return snapshot();
    };

    // -------------------------------------------------------------
    // THEME
    // -------------------------------------------------------------
    const setTheme = (theme) => {
      const allowed = ["dark", "neon", "glass", "terminal"];
      if (!allowed.includes(theme)) return snapshot();
      state.theme = theme;
      stamp();
      return snapshot();
    };

    // -------------------------------------------------------------
    // PUBLIC IMMORTAL INSTANCE
    // -------------------------------------------------------------
    return Object.freeze({
      snapshot,
      setMode,
      setIntensity,
      setTheme
    });
  };

  // Singleton instance (same behavior as your original _glowCore)
  const instance = create();

  try { PulseRealm.PulsePalGlow = instance; } catch {}

  return instance;
})();
