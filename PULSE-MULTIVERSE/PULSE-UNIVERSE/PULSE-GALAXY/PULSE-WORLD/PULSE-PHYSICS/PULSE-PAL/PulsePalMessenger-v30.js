// ============================================================================
// FILE: /PULSE-PAL/PulsePalMessenger-v30.js
// PULSE OS — v30 IMMORTAL+++
// PULSE‑PAL MESSENGER — TOP ORGAN (CORE + SIGNAL BRIDGE + PANEL)
// ============================================================================
//
// ROLE:
//   This is the *top-level Messenger organ*.
//   It unifies:
//     • PulsePalMessengerCore (engine)
//     • PulsePalSignalBridge  (signal ingestion)
//     • PulsePalMessengerPanel (UI membrane)
//
//   It exposes:
//     • Unified API for signals, typing, app activity
//     • Bubble feed for UI
//     • Panel renderer
//
//   It NEVER:
//     • Reads message content
//     • Uses network
//     • Uses daemon
//     • Uses bridge frameworks
//
// CONTRACT:
//   • Pure logic + UI organ
//   • Deterministic
//   • Zero side effects
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { PulsePalMessengerCore } from "./PulsePalMessengerCore-v30.js";
import { PulsePalSignalBridge } from "./PulsePalSignalBridge-v30.js";
import { PulsePalMessengerPanel } from "./PulsePalMessengerPanel-v30.js";

// ---------------------------------------------------------------------------
// SINGLETON CORE INSTANCE
// ---------------------------------------------------------------------------
const _core = PulsePalMessengerCore;

// ---------------------------------------------------------------------------
// TOP-LEVEL ORGAN
// ---------------------------------------------------------------------------
export const PulsePalMessenger = {

  // -------------------------------------------------------
  // SNAPSHOT
  // -------------------------------------------------------
  snapshot() {
    return _core.snapshot();
  },

  // -------------------------------------------------------
  // SIGNAL INGESTION (Unified API)
  // -------------------------------------------------------
  pushSignal(sig) {
    return _core.pushSignal(sig);
  },

  ping(appName) {
    return _core.ping(appName);
  },

  setTyping(isTyping) {
    return _core.setTyping(isTyping);
  },

  setActiveApp(appName) {
    return _core.setActiveApp(appName);
  },

  // -------------------------------------------------------
  // CLEAR
  // -------------------------------------------------------
  clearBubbles() {
    return _core.clearBubbles();
  },

  clearSignals() {
    return _core.clearSignals();
  },

  // -------------------------------------------------------
  // SIGNAL BRIDGE (exposed through Messenger)
  // -------------------------------------------------------
  bridge: {
    onAppPing:       PulsePalSignalBridge.onAppPing,
    onBadgeUpdate:   PulsePalSignalBridge.onBadgeUpdate,
    onTyping:        PulsePalSignalBridge.onTyping,
    onAppActive:     PulsePalSignalBridge.onAppActive,
    onWorldEvent:    PulsePalSignalBridge.onWorldEvent,
    onCivEvent:      PulsePalSignalBridge.onCivEvent,
    onModeShift:     PulsePalSignalBridge.onModeShift
  },

  // -------------------------------------------------------
  // PANEL RENDERER
  // -------------------------------------------------------
  renderPanel(props) {
    return PulsePalMessengerPanel(props);
  }
};

// ---------------------------------------------------------------------------
// GLOBAL HOOK
// ---------------------------------------------------------------------------
try {
  PulseRealm.PulsePalMessenger = PulsePalMessenger;
} catch {}
