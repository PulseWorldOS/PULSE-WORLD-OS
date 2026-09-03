// ============================================================================
// FILE: /PULSE-PAL/PulsePalMessenger-v30.js
// PULSE OS — v30 IMMORTAL+++
// PULSE‑PAL MESSENGER — SIGNAL‑BASED MESSAGE ENGINE + BUBBLE FEEDER
// ============================================================================
//
// ROLE:
//   A *signal messenger* — NOT a chat app.
//   It detects:
//     • app-level notification signals
//     • badge counts
//     • "new message" pings
//     • typing indicators
//     • presence changes
//     • mode/persona/world/civ signals
//
//   It emits:
//     • bubble events
//     • messenger stream events
//     • PulsePal "reply" triggers
//
//   It NEVER:
//     • reads message content from other apps
//     • hooks into private APIs
//     • impersonates apps
//     • accesses networks
//
// CONTRACT:
//   • Pure logic organ
//   • Deterministic
//   • No network
//   • No daemon
//   • No bridge
//   • Feeds UI-only bubble surfaces
// ============================================================================
// ============================================================================
//  PulsePalMessengerCore — IMMORTAL PSEUDO‑CLASS (v31 IMMORTAL)
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




export const PulsePalMessengerCore = (() => {

  // ------------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
  // ------------------------------------------------------------
  const lane = {
    version: "v30 IMMORTAL+++",
    lineage: "Pulse‑OS Evolutionary",

    signals: [],
    bubbles: [],

    presence: {
      typing: false,
      lastPing: null,
      lastActiveApp: null
    },

    stats: {
      totalSignals: 0,
      totalBubbles: 0,
      lastSignalAt: null,
      lastBubbleAt: null
    }
  };

  // ------------------------------------------------------------
  // SNAPSHOT
  // ------------------------------------------------------------
  const snapshot = () => ({
    version: lane.version,
    lineage: lane.lineage,
    presence: { ...lane.presence },
    stats: { ...lane.stats },
    signals: [...lane.signals],
    bubbles: [...lane.bubbles]
  });

  // ------------------------------------------------------------
  // SIGNAL INGESTION
  // ------------------------------------------------------------
  const pushSignal = (signal) => {
    const now = PulseRealm.PulseNOW;

    const normalized = {
      id: `sig_${now}_${Math.random().toString(36).slice(2)}`,
      app: signal.app || "unknown",
      type: signal.type || "ping",
      value: signal.value || null,
      timestamp: now
    };

    lane.signals.push(normalized);
    lane.stats.totalSignals++;
    lane.stats.lastSignalAt = now;

    if (lane.signals.length > 256) {
      lane.signals.shift();
    }

    _emitBubbleFromSignal(normalized);
    return normalized;
  };

  // ------------------------------------------------------------
  // BUBBLE EMISSION
  // ------------------------------------------------------------
  const _emitBubbleFromSignal = (sig) => {
    const now = PulseRealm.PulseNOW;

    const bubble = {
      id: `bubble_${now}_${Math.random().toString(36).slice(2)}`,
      app: sig.app,
      type: sig.type,
      label: _labelForSignal(sig),
      icon: _iconForSignal(sig),
      timestamp: now
    };

    lane.bubbles.push(bubble);
    lane.stats.totalBubbles++;
    lane.stats.lastBubbleAt = now;

    if (lane.bubbles.length > 128) {
      lane.bubbles.shift();
    }

    return bubble;
  };

  const _labelForSignal = (sig) => {
    switch (sig.type) {
      case "ping":   return `${sig.app} pinged`;
      case "badge":  return `${sig.app} has new activity`;
      case "typing": return `${sig.app} is typing`;
      case "active": return `${sig.app} opened`;
      case "world":  return `World signal: ${sig.value}`;
      case "civ":    return `Civ signal: ${sig.value}`;
      case "mode":   return `Mode shift: ${sig.value}`;
      default:       return `Signal from ${sig.app}`;
    }
  };

  const _iconForSignal = (sig) => {
    switch (sig.type) {
      case "ping":   return "notification";
      case "badge":  return "badge";
      case "typing": return "typing";
      case "active": return "app";
      case "world":  return "neon_ring";
      case "civ":    return "civ_world";
      case "mode":   return "binary_matrix";
      default:       return "pulse";
    }
  };

  // ------------------------------------------------------------
  // PRESENCE SIGNALS
  // ------------------------------------------------------------
  const setTyping = (isTyping) => {
    lane.presence.typing = !!isTyping;
    pushSignal({ app: "PulsePal", type: "typing", value: isTyping });
  };

  const setActiveApp = (appName) => {
    lane.presence.lastActiveApp = appName;
    pushSignal({ app: appName, type: "active" });
  };

  const ping = (appName) => {
    lane.presence.lastPing = PulseRealm.PulseNOW;
    pushSignal({ app: appName, type: "ping" });
  };

  // ------------------------------------------------------------
  // CLEAR / RESET
  // ------------------------------------------------------------
  const clearBubbles = () => {
    lane.bubbles = [];
  };

  const clearSignals = () => {
    lane.signals = [];
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    snapshot,
    pushSignal,
    setTyping,
    setActiveApp,
    ping,
    clearBubbles,
    clearSignals
  };

})();


// ============================================================================
// SINGLETON + PUBLIC API
// ============================================================================
const _messengerCore = PulsePalMessengerCore;

export const PulsePalMessenger = {
  snapshot: () => _messengerCore.snapshot(),
  pushSignal: sig => _messengerCore.pushSignal(sig),
  setTyping: v => _messengerCore.setTyping(v),
  setActiveApp: a => _messengerCore.setActiveApp(a),
  ping: a => _messengerCore.ping(a),
  clearBubbles: () => _messengerCore.clearBubbles(),
  clearSignals: () => _messengerCore.clearSignals()
};

try {
  PulseRealm.PulsePalMessenger = {
    PulsePalMessenger,
    PulsePalMessengerCore
  }
} catch {}
