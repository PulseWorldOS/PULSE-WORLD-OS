// ============================================================================
// FILE: /PULSE-PAL/PulsePalBubble-v30.js
// PULSE OS — v30 ORBITAL IMMORTAL+++
// PULSE‑PAL BUBBLE — REAL PRESENCE + MESSENGER‑AWARE + BRIDGE‑FREE
// ============================================================================

import { PulsePalMemory } from "./PulsePalMemory-v30.js";
import { PulsePalSpeech } from "./PulsePalSpeech-v30.js";

import { PulsePalPresence } from "./PulsePalPresence-v30.js";
import { PulsePalMessenger } from "./PulsePalMessenger-v30.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

// REAL organs only
const CoreMemory    = PulsePalMemory;
const CoreSpeech    = PulsePalSpeech;
const CorePresence  = PulsePalPresence;
const CoreMessenger = PulsePalMessenger;

// ============================================================================
// IMPLEMENTATION — v30 ORBITAL IMMORTAL+++
// ============================================================================
export function PulsePalBubble({ Router, Icons, Media } = {}) {

  // --------------------------------------------------------------------------
  // SNAPSHOTS — REAL ORGANS ONLY
  // --------------------------------------------------------------------------
  const presence  = CorePresence.snapshot()  || {};
  const memory    = CoreMemory.snapshot()  || {};
  const messages  = CoreSpeech.messages()  || [];
  const messenger = CoreMessenger.snapshot() || {};

  // --------------------------------------------------------------------------
  // MESSENGER‑AWARE SNIPPET
  // --------------------------------------------------------------------------
  const lastBubble = messenger.bubbles[messenger.bubbles.length - 1];

  let snippet = "Tap to open Pulse‑Pal.";

  if (lastBubble) {
    snippet = lastBubble.label.length > 96
      ? lastBubble.label.slice(0, 93) + "…"
      : lastBubble.label;
  } else {
    // fallback to speech snippet
    const last = messages[messages.length - 1];
    const lastText =
      last && typeof last.text === "string" && last.text.trim().length > 0
        ? last.text.trim()
        : "";

    snippet =
      lastText.length > 0
        ? (lastText.length > 96 ? lastText.slice(0, 93) + "…" : lastText)
        : "Tap to open Pulse‑Pal and explore what this OS can do.";
  }

  // --------------------------------------------------------------------------
  // REAL PRESENCE MODEL
  // --------------------------------------------------------------------------
  const tone     = presence.tone     || "neutral";
  const mode     = presence.mode     || "guide";
  const energy   = presence.energy   || "idle";
  const intent   = presence.intent   || null;
  const activity = presence.activity || "Idle";

  // --------------------------------------------------------------------------
  // MESSENGER PRESENCE
  // --------------------------------------------------------------------------
  const typing       = messenger.presence.typing;
  const lastPing     = messenger.presence.lastPing;
  const lastActiveApp= messenger.presence.lastActiveApp;

  // --------------------------------------------------------------------------
  // UNREAD COUNT (MESSENGER + SPEECH)
  // --------------------------------------------------------------------------
  const unreadMessenger = messenger.bubbles.length;
  const unreadSpeech =
    typeof memory.unreadCount === "number"
      ? memory.unreadCount
      : Math.max(0, messages.length - 1);

  const unreadTotal = unreadMessenger + unreadSpeech;

  const unreadLabel =
    unreadTotal > 0
      ? `${unreadTotal} new`
      : typing
      ? "Typing…"
      : activity;

  // --------------------------------------------------------------------------
  // AVATAR
  // --------------------------------------------------------------------------
  const palImages = Media.resolveAll("PulsePal") || [];
  const avatar    = palImages[0] ||
                    Icons.resolve("pulse") ||
                    Icons.resolve("assistant") ||
                    "";

  // --------------------------------------------------------------------------
  // AURA COLOR
  // --------------------------------------------------------------------------
  const auraColor =
    tone === "warm"
      ? "rgba(0, 234, 255, 0.55)"
      : tone === "focused"
      ? "rgba(0, 255, 180, 0.55)"
      : tone === "calm"
      ? "rgba(120, 200, 255, 0.45)"
      : "rgba(160, 180, 200, 0.45)";

  // --------------------------------------------------------------------------
  // ACTIVE / IDLE STATE
  // --------------------------------------------------------------------------
  const isAlert =
    energy === "high" ||
    intent === "assist" ||
    intent === "explain" ||
    typing ||
    unreadMessenger > 0;

  const bubbleState = isAlert ? "active" : "idle";

  // --------------------------------------------------------------------------
  // CONTEXT HINT
  // --------------------------------------------------------------------------
  const path = `/${PulseRealm.__PULSE_CURRENT_PAGE__}` || "/";


  let contextHint = "Ask Pulse‑Pal how to use this OS.";

  if (path.includes("pulseworld")) {
    contextHint = "Your worlds are evolving — tap to explore.";
  } else if (path.includes("tasks")) {
    contextHint = "Need help with tasks or flow?";
  } else if (path.includes("civ")) {
    contextHint = "Your civilization tier influences your tasks and signals.";
  } else if (path.includes("system")) {
    contextHint = "System vitals and presence are live.";
  }

  // --------------------------------------------------------------------------
  // CLICK HANDLER
  // --------------------------------------------------------------------------
  const clickHandler = `
    (function(){
      try {
        if (Router && typeof Router.go === 'function') {
          Router.go('pulsepal.messenger');
          return;
        }
        if (PulseRealm.PulseRouter && typeof PulseRealm.PulseRouter.go === 'function') {
          PulseRealm.PulseRouter.go('pulsepal.messenger');
          return;
        }
      } catch (e) {}
    })()
  `;

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  return `
    <div id="pulsepal-bubble-root" data-pulsepal-state="${bubbleState}">
      <div class="pulsepal-bubble-shell"
           onclick="${clickHandler.replace(/\n/g, " ")}">

        <div class="pulsepal-bubble-3d">

          <div class="pulsepal-bubble-avatar-wrap">
            <div class="pulsepal-bubble-aura" style="background:${auraColor};"></div>
            <img src="${avatar}" class="pulsepal-bubble-avatar" alt="Pulse‑Pal Avatar" />
          </div>

          <div class="pulsepal-bubble-text">

            <div class="pulsepal-bubble-title-row">
              <div class="pulsepal-bubble-title">Pulse‑Pal</div>
              <div class="pulsepal-bubble-chip">
                ${mode.charAt(0).toUpperCase() + mode.slice(1)}
              </div>
            </div>

            <div class="pulsepal-bubble-snippet">${snippet}</div>

            <div class="pulsepal-bubble-meta">
              ${unreadLabel}
              ${lastActiveApp ? ` • ${lastActiveApp}` : ""}
              ${lastPing ? ` • ping ${new Date(lastPing).toLocaleTimeString()}` : ""}
            </div>

            <div class="pulsepal-bubble-hint">${contextHint}</div>

          </div>

        </div>

      </div>
    </div>
  `;
}
