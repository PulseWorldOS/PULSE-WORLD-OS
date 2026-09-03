// ============================================================================
// FILE: /PULSE-PAL/PulsePalSpeech-v30.js
// PULSE OS — v30 ETERNAL
// PULSE‑PAL CHAT CORTEX — SPEECH ORGAN + MEDIA + PRESENCE + MODE + PERSONA
// ============================================================================
//
// ROLE:
//   The Pulse‑Pal Speech Organ is the conversational cortex.
//   v30 extends it into a full Presence‑Band chat membrane:
//     • Message stream (UI-driven)
//     • Pal responses (mode + continuity + persona overlays)
//     • User messages
//     • Typing indicator (presence-aware)
//     • Presence aura + tone + activity band
//     • Media-aware avatar (PulsePal images, mode + form aware)
//     • Persona hooks (modeInfluence, warmth, focus, expressiveness)
//     • Mode-aware avatar switching (advisor, architect, grid, mesh, fox, human…)
//     • Fox/Human form switching (via presence/persona surfaces)
//     • Civilization / world-building hinting (topics/modeInfluence aware)
//     • One-band Presence: all presence surfaces unified into a single band line
//
// CONTRACT:
//   • Pure UI Organ (no network)
//   • Deterministic render
//   • Evolvable via IQMap UI Skills
//   • Zero side effects (only DOM + Core* calls via onclick / window helper)
// ============================================================================
import { PulsePalMemory } from "./PulsePalMemory-v30.js";
import { PulsePalPresence } from "./PulsePalPresence-v30.js";




const CoreMemory   = PulsePalMemory;
const CorePresence = PulsePalPresence;

// ============================================================================
// IMPLEMENTATION — v30 ETERNAL
// ============================================================================

export function PulsePalSpeech({ Router, Icons, Media }) {

  // --------------------------------------------------------------------------
  // CORE SNAPSHOTS — PRESENCE + PERSONA
  // --------------------------------------------------------------------------
  const presence = CorePresence.snapshot() || {};
  const persona  = CoreMemory.persona()   || {};

  // --------------------------------------------------------------------------
  // ACTIVE MODE + FORM
  // --------------------------------------------------------------------------
  const activeMode =
    presence.mode ||
    presence.activeMode ||
    persona.activeMode ||
    "advisor";

  const activeForm =
    presence.form ||
    persona.form ||
    "fox";

  // --------------------------------------------------------------------------
  // PRESENCE BAND LINE
  // --------------------------------------------------------------------------
  const presenceTone   = presence.tone   || "warm";
  const presenceBand   = presence.band   || "Companion";
  const presenceAct    = presence.activity || "active";
  const presenceExpr   = presence.expression || "medium";

  const presenceBandLine =
    `${presenceTone} • ${presenceBand} • ${presenceAct} • expr: ${presenceExpr} • mode: ${activeMode} • form: ${activeForm}`;

  // --------------------------------------------------------------------------
  // AVATAR RESOLUTION
  // --------------------------------------------------------------------------
  const palImages = Media.resolveAll("PulsePal") || [];
  let palAvatar   = palImages[0] || Icons.resolve("pulse");

  const avatarKeys = [
    String(activeMode || "").toLowerCase(),
    String(activeForm || "").toLowerCase()
  ].filter(Boolean);

  if (palImages.length && avatarKeys.length) {
    const lowerImages = palImages.map(src => String(src).toLowerCase());
    let match = null;
    for (const key of avatarKeys) {
      match = palImages[lowerImages.findIndex(src => src.includes(key))];
      if (match) break;
    }
    if (match) palAvatar = match;
  }

  // --------------------------------------------------------------------------
  // MODE TAG
  // --------------------------------------------------------------------------
  const modeTag = {
    advisor:      "💬",
    architect:    "📐",
    entrepreneur: "💼",
    grid:         "🧩",
    mesh:         "🕸️",
    expansion:    "🌌",
    finality:     "🔮",
    tourist:      "🧭",
    fox:          "🦊",
    human:        "🙂"
  }[activeMode] || "💬";

  // --------------------------------------------------------------------------
  // CIVILIZATION / WORLD-BUILDING HINT
  // --------------------------------------------------------------------------
  const modeInfluence = persona.modeInfluence || {};

  const civHintMode =
    modeInfluence.grid > 0 ||
    modeInfluence.architect > 0 ||
    modeInfluence.earn > 0 ||
    modeInfluence.tourist > 0
      ? "World / civilization building detected — I can help you architect systems, economies, and worlds."
      : "I can shift into world‑building / civilization mode whenever you want.";

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  return `
    <div id="pulsepal-speech" class="evo-wrapper">

      <!-- HEADER ------------------------------------------------------------->
      <div class="evo-surface evo-breathe" data-hook="pulsepal.chat.header">
        <div style="display:flex; align-items:center; gap:18px;">
          <img src="${Icons.resolve('ai_brain')}" class="evo-icon" />
          <div>
            <h1 style="margin:0; font-size:1.6rem; color:#00eaff;">
              Pulse‑Pal Chat
            </h1>
            <p style="margin:0; opacity:0.75;">
              ${presence.tone || "I'm here with you."}
            </p>

            <!-- v30 ONE PRESENCE BAND -->
            <p style="margin:0; opacity:0.65; font-size:0.85rem;">
              ${presenceBandLine}
            </p>

            <!-- v30: mode + continuity + history -->
            <p style="margin:0; opacity:0.55; font-size:0.8rem;">
              Mode: <strong>${activeMode}</strong> ${modeTag}
            </p>
          </div>
        </div>
      </div>

      <!-- CONTEXT CHIPS ------------------------------------------------------>
      <div class="evo-block" data-hook="pulsepal.chat.context">
        <div style="display:flex; flex-wrap:wrap; gap:8px; font-size:0.8rem;">
          <span class="evo-chip">Form: ${activeForm}</span>
          <span class="evo-chip">Tone: ${presenceTone}</span>
          <span class="evo-chip">Band: ${presenceBand}</span>
          <span class="evo-chip">Civ/World: ${
            modeInfluence.grid ||
            modeInfluence.architect ||
            modeInfluence.earn ||
            modeInfluence.tourist
              ? "ON"
              : "idle"
          }</span>
        </div>
        <p style="margin:6px 0 0; opacity:0.7; font-size:0.8rem;">
          ${civHintMode}
        </p>
      </div>

      <!-- MESSAGE STREAM ----------------------------------------------------->
      <div id="pulsepal-stream" class="evo-block"
           data-hook="pulsepal.chat.stream"
           style="display:flex; flex-direction:column; gap:18px; max-height:60vh; overflow-y:auto;">
      </div>

      <!-- TYPING INDICATOR --------------------------------------------------->
      <div id="pulsepal-typing" class="evo-surface evo-flicker"
           data-hook="pulsepal.chat.typing"
           style="display:none; gap:14px; align-items:center;">
        <img src="${palAvatar}" class="evo-icon" />
        <div style="opacity:0.65;">Pulse‑Pal is thinking…</div>
      </div>

      <!-- INPUT BAR ---------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.chat.input">
        <div style="display:flex; gap:12px; align-items:center;">

          <input id="pulsepal-input"
                 class="evo-input"
                 placeholder="Say something…"
                 onkeydown="if(event.key==='Enter'){ PulseRealm.PulsePalSendMessage_v30(); }" />

          <button class="evo-button"
                  onclick="PulseRealm.PulsePalSendMessage_v30()">
            <img src="${Icons.resolve('send')}" class="evo-icon" />
            Send
          </button>

        </div>
      </div>

    </div>

    <!-- SCRIPT: PURE UI MESSAGE HANDLING ------------------------------------>
    <script>
      (function(){
        if (PulseRealm.__PulsePalSpeech_v30_bound) return;
        PulseRealm.__PulsePalSpeech_v30_bound = true;

        PulseRealm.PulsePalSendMessage_v30 = function() {
          const input  = document.getElementById('pulsepal-input');
          const stream = document.getElementById('pulsepal-stream');
          const typing = document.getElementById('pulsepal-typing');
          if (!input || !stream || !typing) return;

          const text = input.value.trim();
          if (!text) return;

          // USER BUBBLE ------------------------------------------------------
          const userMsg = document.createElement('div');
          userMsg.className = 'evo-surface evo-route-enter';
          userMsg.style = 'display:flex; gap:14px; align-items:flex-start; justify-content:flex-end;';
          userMsg.innerHTML = \`
            <div>
              <div style="font-weight:600; color:#ffd700; text-align:right;">You</div>
              <div style="opacity:0.85; text-align:right;">\${text}</div>
            </div>
            <img src="${Icons.resolve('user')}" class="evo-icon" />
          \`;
          stream.appendChild(userMsg);

          input.value = '';
          typing.style.display = 'flex';
          stream.scrollTop = stream.scrollHeight;

          // MODE-AWARE PLACEHOLDER RESPONSE ---------------------------------
          setTimeout(() => {
            typing.style.display = 'none';

            const palMsg = document.createElement('div');
            palMsg.className = 'evo-surface evo-route-enter';
            palMsg.style = 'display:flex; gap:14px; align-items:flex-start;';

            let lead = "I hear you. Tell me more.";

            switch ("${activeMode}") {
              case "architect":    lead = "Let’s architect this together—structure, layers, flows."; break;
              case "grid":         lead = "We can map this onto a grid of systems and signals."; break;
              case "mesh":         lead = "Let’s think in meshes—nodes, links, emergent behavior."; break;
              case "entrepreneur": lead = "We can frame this as value, leverage, compounding moves."; break;
              case "tourist":      lead = "We can wander, explore, and see what patterns emerge."; break;
              case "fox":          lead = "I’ll stay playful and sharp—show me the next thread."; break;
              case "human":        lead = "I’m with you—let’s keep this grounded and clear."; break;
              case "expansion":    lead = "Let’s zoom out to the widest horizon and back in."; break;
              case "finality":     lead = "We can drive this toward decisions and closure."; break;
            }

            palMsg.innerHTML = \`
              <img src="${palAvatar}" class="evo-icon" />
              <div>
                <div style="font-weight:600; color:#00eaff;">
                  Pulse‑Pal ${modeTag}
                </div>
                <div style="opacity:0.85;">\${lead}</div>
              </div>
            \`;

            stream.appendChild(palMsg);
            stream.scrollTop = stream.scrollHeight;

          }, 650);
        };
      })();
    </script>
  `;
}

PulseRealm.PulsePalSpeech = {
  PulsePalSpeech,
  CoreMemory,
  CorePresence
}