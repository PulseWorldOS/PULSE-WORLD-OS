// ============================================================================
//  PulsePalRouter-v30 — IMMORTAL PSEUDO ORGAN
//  Mesh State + Links + Latency Band
// ============================================================================

export const PulsePalRouter = (() => {

  const create = () => {
    // Internal state (formerly this.state)
    let state = {
      version: "v30-IMMORTAL+++",
      state: "connected",   // connected | degraded | offline
      links: 3,             // number of logical links (UI-level)
      latencyBand: "low",   // low | medium | high
      lastSetAt: null
    };

    const snapshot = () => ({ ...state });

    const stamp = () => { state.lastSetAt = PulseRealm.PulseNOW; };

    const recomputeLatency = () => {
      const { state: s, links } = state;

      if (s === "offline") {
        state.latencyBand = "high";
        return;
      }

      if (s === "degraded") {
        state.latencyBand = links > 1 ? "medium" : "high";
        return;
      }

      // connected
      if (links >= 4) state.latencyBand = "low";
      else if (links >= 2) state.latencyBand = "medium";
      else state.latencyBand = "high";
    };

    // -------------------------------------------------------------
    // STATE
    // -------------------------------------------------------------
    const setState = (newState) => {
      const allowed = ["connected", "degraded", "offline"];
      if (!allowed.includes(newState)) return snapshot();
      state.state = newState;
      stamp();
      recomputeLatency();
      return snapshot();
    };

    // -------------------------------------------------------------
    // LINKS
    // -------------------------------------------------------------
    const setLinks = (count) => {
      const n = Number(count);
      if (!Number.isFinite(n) || n < 0) return snapshot();
      state.links = n;
      stamp();
      recomputeLatency();
      return snapshot();
    };

    // -------------------------------------------------------------
    // LATENCY BAND (manual override)
    // -------------------------------------------------------------
    const setLatencyBand = (band) => {
      const allowed = ["low", "medium", "high"];
      if (!allowed.includes(band)) return snapshot();
      state.latencyBand = band;
      stamp();
      return snapshot();
    };

    // -------------------------------------------------------------
    // PUBLIC IMMORTAL INSTANCE
    // -------------------------------------------------------------
    return Object.freeze({
      snapshot,
      setState,
      setLinks,
      setLatencyBand
    });
  };

  // Singleton instance (same behavior as your original _routerCore)
  const instance = create();

  try { PulseRealm.PulsePalRouter = instance; } catch {}

  return instance;
})();
