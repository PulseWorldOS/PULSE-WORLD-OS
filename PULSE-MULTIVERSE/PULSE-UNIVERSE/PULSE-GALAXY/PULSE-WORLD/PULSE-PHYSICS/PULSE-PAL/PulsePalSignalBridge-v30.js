// ============================================================================
// FILE: /PULSE-PAL/PulsePalSignalBridge-v30.js
// PULSE OS — v30 IMMORTAL+++
// PULSE‑PAL SIGNAL BRIDGE — OS / APP EVENT NORMALIZER
// ============================================================================
//
// ROLE:
//   Converts device/app events into normalized signals for PulsePalMessenger.
//   Examples:
//     • onAppPing("WhatsApp")
//     • onBadgeUpdate("Discord", 3)
//     • onTyping("Messenger", true)
//     • onWorldEvent("Shard‑3 awakened")
//     • onCivEvent("Tier upgraded: Builder")
//     • onModeShift("architect")
//
//   It NEVER:
//     • Reads message content
//     • Hooks into private APIs
//     • Sends network traffic
//
// CONTRACT:
//   • Pure logic layer
//   • Deterministic
//   • Feeds PulsePalMessengerCore
// ============================================================================

import { PulsePalMessenger } from "./PulsePalMessengerCore-v30.js";

export const PulsePalSignalBridge = {

  // -------------------------------------------------------
  // APP SIGNALS
  // -------------------------------------------------------
  onAppPing(appName) {
    PulsePalMessenger.pushSignal({
      app: appName,
      type: "ping"
    });
  },

  onBadgeUpdate(appName, count) {
    PulsePalMessenger.pushSignal({
      app: appName,
      type: "badge",
      value: count
    });
  },

  onTyping(appName, isTyping) {
    PulsePalMessenger.pushSignal({
      app: appName,
      type: "typing",
      value: isTyping
    });
  },

  onAppActive(appName) {
    PulsePalMessenger.pushSignal({
      app: appName,
      type: "active"
    });
  },

  // -------------------------------------------------------
  // WORLD / CIV / MODE SIGNALS
  // -------------------------------------------------------
  onWorldEvent(eventLabel) {
    PulsePalMessenger.pushSignal({
      app: "PulseWorld",
      type: "world",
      value: eventLabel
    });
  },

  onCivEvent(eventLabel) {
    PulsePalMessenger.pushSignal({
      app: "CivLayer",
      type: "civ",
      value: eventLabel
    });
  },

  onModeShift(mode) {
    PulsePalMessenger.pushSignal({
      app: "PulsePal",
      type: "mode",
      value: mode
    });
  }
};

try {
  PulseRealm.PulsePalSignalBridge = PulsePalSignalBridge;
} catch {}
