// ============================================================================
// FILE: /PULSE-PAL/PulsePalMessengerPanel-v30.js
// PULSE OS — v30 IMMORTAL+++
// PULSE‑PAL MESSENGER PANEL — BUBBLE STREAM + SIGNAL FEED
// ============================================================================
//
// ROLE:
//   UI membrane that displays:
//     • Messenger bubbles (from PulsePalMessengerCore)
//     • Signal feed (ping, badge, typing, world, civ, mode)
//     • Typing indicator
//     • App activity
//
//   It NEVER:
//     • Reads message content
//     • Sends network messages
//
// CONTRACT:
//   • Pure UI Organ
//   • Deterministic render
//   • Zero side effects
// ============================================================================

import { PulsePalMessenger } from "./PulsePalMessengerCore-v30.js";
import { PulsePalPresence } from "./PulsePalPresence-v30.js";
import { PulsePalMedia } from "./PulsePalMedia-v30.js";

const CoreMessenger = PulsePalMessenger;
const CorePresence  = PulsePalPresence;
const MediaBridge   = PulsePalMedia;

export function PulsePalMessengerPanel({ Router, Icons, Media }) {

  const messenger = CoreMessenger.snapshot();
  const presence  = CorePresence.snapshot() || {};

  const palImages =
    Media.resolveAll("PulsePal") ||
    MediaBridge.resolveAll("PulsePal") ||
    [];

  let avatar = palImages[0] || Icons.resolve("pulse");

  // --------------------------------------------------------------------------
  // RENDER BUBBLE STREAM
  // --------------------------------------------------------------------------
  function renderBubble(b) {
    return `
      <div class="evo-surface evo-route-enter"
           style="display:flex; gap:14px; align-items:flex-start;">
        <img src="${Icons.resolve(b.icon)}" class="evo-icon" />
        <div>
          <div style="font-weight:600; color:#00eaff;">
            ${b.app}
          </div>
          <div style="opacity:0.85;">
            ${b.label}
          </div>
          <div style="opacity:0.55; font-size:0.75rem;">
            ${new Date(b.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // RENDER PANEL
  // --------------------------------------------------------------------------
  return `
    <div id="pulsepal-messenger-panel" class="evo-wrapper">

      <!-- HEADER -->
      <div class="evo-surface evo-breathe">
        <div style="display:flex; gap:18px; align-items:center;">
          <img src="${avatar}" class="pal-avatar-preview" />
          <div>
            <h1 style="margin:0;">Pulse‑Pal Messenger</h1>
            <p style="margin:0; opacity:0.75;">
              Signal‑based messenger — pings, badges, typing, world/civ signals
            </p>
            <p style="margin:0; opacity:0.55; font-size:0.85rem;">
              Typing: <strong>${messenger.presence.typing ? "Yes" : "No"}</strong> ·
              Last Ping: ${messenger.presence.lastPing ? new Date(messenger.presence.lastPing).toLocaleTimeString() : "None"} ·
              Active App: ${messenger.presence.lastActiveApp || "None"}
            </p>
          </div>
        </div>
      </div>

      <!-- SIGNAL STREAM -->
      <div class="evo-block">
        <h2>Signal Stream</h2>
        <div style="display:flex; flex-direction:column; gap:14px;">
          ${messenger.bubbles.map(renderBubble).join("")}
        </div>
      </div>

      <!-- CLEAR BUTTONS -->
      <div class="evo-block">
        <button class="evo-button" onclick="PulsePalMessenger.clearBubbles()">
          Clear Bubbles
        </button>
        <button class="evo-button" onclick="PulsePalMessenger.clearSignals()">
          Clear Signals
        </button>
      </div>

    </div>
  `;
}
