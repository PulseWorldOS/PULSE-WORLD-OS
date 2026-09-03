// ============================================================================
//  PulsePalAnim-v30 — IMMORTAL PSEUDO ORGAN
//  Pure state engine for animation intensity + state + load band
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

export const PulsePalAnim = (() => {

  const create = () => {
    // Internal state (formerly this.state)
    let state = {
      version: "v30-IMMORTAL+++",
      intensity: "medium",   // low | medium | high | auto
      state: "online",       // online | idle | paused
      loadBand: "balanced",  // light | balanced | heavy
      lastSetAt: null
    };

    const snapshot = () => ({ ...state });

    const recomputeLoadBand = () => {
      const { intensity, state: s } = state;

      if (s === "paused" || s === "idle") {
        state.loadBand = "light";
        return;
      }

      if (intensity === "low")     state.loadBand = "light";
      if (intensity === "medium")  state.loadBand = "balanced";
      if (intensity === "high")    state.loadBand = "heavy";
      if (intensity === "auto")    state.loadBand = "balanced";
    };

    const setIntensity = (level) => {
      const allowed = ["low", "medium", "high", "auto"];
      if (!allowed.includes(level)) return snapshot();
      state.intensity = level;
      state.lastSetAt = PulseRealm.PulseNOW;
      recomputeLoadBand();
      return snapshot();
    };

    const setState = (newState) => {
      const allowed = ["online", "idle", "paused"];
      if (!allowed.includes(newState)) return snapshot();
      state.state = newState;
      state.lastSetAt = PulseRealm.PulseNOW;
      recomputeLoadBand();
      return snapshot();
    };

    return Object.freeze({
      snapshot,
      setIntensity,
      setState
    });
  };

  // Singleton instance (same as your original _animCore)
  const instance = create();

  // Public API
  try { PulseRealm.PulsePalAnim = instance; } catch {}

  return instance;
})();
