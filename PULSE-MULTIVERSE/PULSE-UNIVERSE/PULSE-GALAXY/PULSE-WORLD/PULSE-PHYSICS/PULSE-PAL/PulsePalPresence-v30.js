// ============================================================================
// FILE: /PULSE-PAL/PulsePalPresence-v30.js
// PULSE OS — v30 IMMORTAL‑EVO+++
// PULSE‑PAL PRESENCE MEMBRANE — ONE-BAND PRESENCE + MODE + AURA + AVATAR
// BRIDGE‑FREE • DAEMON‑FREE • REAL PRESENCE • REAL MEMORY • REAL MODE ENGINE
// ============================================================================


import { PulsePalMemory } from "./PulsePalMemory-v30.js";
import { PulsePalSpeech } from "./PulsePalSpeech-v30.js";

import { PulsePalPresenceCore } from "./PulsePalPresenceCore-v30.js";   // your real presence organ
import { PulsePalSettings } from "./PulsePalSettings-v30.js";
import { PulsePalIdentity } from "./PulsePalIdentity-v30.js";
import { PulsePalModeEngine } from "./PulsePalModeEngine-v30.js";
import { PulsePalPersonaEngine } from "./PulsePalPersonaEngine-v30.js";
import { PulsePalWorld } from "./PulsePalWorld-v30.js";

// REAL organs only
const CorePresence = PulsePalPresenceCore;
const CoreMemory   = PulsePalMemory;
const CoreSpeech   = PulsePalSpeech;
const CoreSettings = PulsePalSettings;
const CoreWorld    = PulsePalWorld;

// REAL identity snapshot
const getIdentity = () => {
  try { return PulsePalIdentity.getSnapshot() || {}; }
  catch { return {}; }
};

// REAL mode snapshot
const getModeSnapshot = () => {
  try { return PulsePalModeEngine.getLast() || {}; }
  catch { return {}; }
};

// REAL persona snapshot
const getPersonaSnapshot = () => {
  try { return PulsePalPersonaEngine.getLast() || {}; }
  catch { return {}; }
};

// ============================================================================
// IMPLEMENTATION — v30 IMMORTAL‑EVO+++
// ============================================================================

export function PulsePalPresence({ Router, Icons, Media }) {

  // --------------------------------------------------------------------------
  // REAL SNAPSHOTS
  // --------------------------------------------------------------------------
  const presence   = CorePresence.snapshot() || {};
  const persona    = CoreMemory.persona()    || {};
  const identity   = getIdentity()              || {};
  const modeSnap   = getModeSnapshot()          || {};
  const personaV30 = getPersonaSnapshot()       || {};
  const worldSnap  = CoreWorld.snapshot()    || {};

  const palImages = Media.resolveAll("PulsePal") || [];

  // --------------------------------------------------------------------------
  // UNIFIED ONE-BAND PRESENCE MODEL
  // --------------------------------------------------------------------------
  const activeMode =
    presence.mode ||
    presence.activeMode ||
    modeSnap.activeMode ||
    "advisor";

  const species =
    presence.species ||
    personaV30.persona.form.form ||
    "fox";

  const auraBand =
    presence.aura ||
    presence.auraBand ||
    personaV30.tone.aura ||
    "calm";

  const toneBand =
    presence.tone ||
    personaV30.tone.baseline ||
    "warm";

  const activityMode =
    presence.activity ||
    presence.activityMode ||
    "active";

  const expressionLevel =
    presence.expression ||
    personaV30.tone.expression ||
    "medium";

  const worldMode =
    presence.worldMode ||
    worldSnap.worldMode ||
    "default";

  const civTier =
    presence.civTier ||
    worldSnap.civTier ||
    "settler";

  const challengeBand =
    presence.challengeBand ||
    personaV30.behavior.challengePolicy ||
    "balanced";

  const continuityScore =
    personaV30.continuity.continuityScore ||
    persona.continuityScore ||
    0;

  // --------------------------------------------------------------------------
  // AVATAR RESOLUTION (mode + species aware)
  // --------------------------------------------------------------------------
  let avatar = palImages[0] || Icons.resolve("pulse");

  if (palImages.length) {
    const lowerMode = String(activeMode).toLowerCase();
    const lowerSpecies = String(species).toLowerCase();

    const speciesMatch = palImages.find(src =>
      String(src).toLowerCase().includes(lowerSpecies)
    );
    const modeMatch = palImages.find(src =>
      String(src).toLowerCase().includes(lowerMode)
    );

    avatar = speciesMatch || modeMatch || avatar;
  }

  // --------------------------------------------------------------------------
  // MODE WEIGHTS (from presence or mode engine)
  // --------------------------------------------------------------------------
  const modeWeights =
    presence.modeWeights ||
    modeSnap.weights ||
    {};

  const modeWeightsList = Object.keys(modeWeights).length
    ? Object.entries(modeWeights)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
    : [];

  // --------------------------------------------------------------------------
  // CIV OVERLAY
  // --------------------------------------------------------------------------
  const civOverlayText = `
    World Mode: ${worldMode} • Civ Tier: ${civTier} • Challenge: ${challengeBand}
  `;

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  return `
    <div id="pulsepal-presence" class="evo-wrapper">

      <!-- HEADER -->
      <div class="evo-surface evo-breathe">
        <div style="display:flex; align-items:center; gap:18px;">
          <img src="${Icons.resolve('presence')}" class="evo-icon" />
          <div>
            <h1 style="margin:0; font-size:1.6rem; color:#00eaff;">
              Pulse‑Pal Presence (One Band)
            </h1>
            <p style="margin:0; opacity:0.75;">
              ${toneBand} • ${activityMode} • Aura: ${auraBand}
            </p>
            <p style="margin:0; opacity:0.55; font-size:0.85rem;">
              Active Mode: <strong>${activeMode}</strong> · Continuity: ${continuityScore}
            </p>
            <p style="margin:0; opacity:0.55; font-size:0.8rem;">
              ${civOverlayText}
            </p>
          </div>
        </div>
      </div>

      <!-- AVATAR + MODE -->
      <div class="evo-block">
        <div style="display:flex; gap:24px; flex-wrap:wrap; align-items:flex-start;">

          <!-- AVATAR -->
          <div style="flex:0 0 auto;">
            <h2 style="margin-top:0;">Avatar Preview</h2>
            <img src="${avatar}" class="pal-avatar-preview" />
            <p style="margin:8px 0 0; opacity:0.7; font-size:0.85rem;">
              Avatar follows unified presence: mode + species + Pulse‑Pal images.
            </p>
          </div>

          <!-- MODE -->
          <div style="flex:1 1 260px;">
            <h2 style="margin-top:0;">Archetype Mode</h2>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              ${[
                "advisor","architect","entrepreneur","grid","mesh","tourist",
                "expansion","finality","civilization","strategy","fox","human","system"
              ].map(m => `
                <button class="evo-button"
                        onclick="CorePresence.setMode && CorePresence.setMode('${m}')">
                  ${m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              `).join("")}
            </div>

            ${
              modeWeightsList.length
                ? `
                  <div style="margin-top:12px;">
                    <p style="margin:0 0 4px; opacity:0.7; font-size:0.85rem;">
                      Mode blend (top weights):
                    </p>
                    <ul class="evo-list" style="margin:0;">
                      ${modeWeightsList
                        .map(([mode, w]) =>
                          `<li class="evo-list-item">${mode}: ${(w * 100).toFixed(1)}%</li>`
                        )
                        .join("")}
                    </ul>
                  </div>
                `
                : ""
            }
          </div>

        </div>
      </div>

      <!-- SPECIES -->
      <div class="evo-block">
        <h2 style="margin-top:0;">Species</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          ${["fox","human","system","avatar"].map(s => `
            <button class="evo-button"
                    onclick="CorePresence.setSpecies && CorePresence.setSpecies('${s}')">
              ${s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          `).join("")}
        </div>
      </div>

      <!-- WORLD / CIV -->
      <div class="evo-block">
        <h2 style="margin-top:0;">World & Civilization</h2>
        <p style="opacity:0.75; font-size:0.9rem;">
          Pure presence flags for future civ layers.
        </p>

        <div style="display:flex; gap:16px; flex-wrap:wrap; margin-bottom:8px;">
          ${["default","city","colony","empire","cosmos"].map(w => `
            <button class="evo-button"
                    onclick="CorePresence.setWorldMode && CorePresence.setWorldMode('${w}')">
              ${w.charAt(0).toUpperCase() + w.slice(1)}
            </button>
          `).join("")}
        </div>

        <div style="display:flex; gap:16px; flex-wrap:wrap; margin-bottom:8px;">
          ${["settler","builder","navigator","architect"].map(t => `
            <button class="evo-button"
                    onclick="CorePresence.setCivTier && CorePresence.setCivTier('${t}')">
              ${t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          `).join("")}
        </div>

        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          ${["cozy","balanced","intense"].map(c => `
            <button class="evo-button"
                    onclick="CorePresence.setChallengeBand && CorePresence.setChallengeBand('${c}')">
              ${c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          `).join("")}
        </div>
      </div>

      <!-- AURA -->
      <div class="evo-block">
        <h2 style="margin-top:0;">Aura</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          ${["calm","bright","focused","nocturne"].map(a => `
            <button class="evo-button"
                    onclick="CorePresence.setAura && CorePresence.setAura('${a}')">
              ${a.charAt(0).toUpperCase() + a.slice(1)}
            </button>
          `).join("")}
        </div>
      </div>

      <!-- EXPRESSION -->
      <div class="evo-block">
        <h2 style="margin-top:0;">Expression</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          ${["low","medium","high"].map(e => `
            <button class="evo-button"
                    onclick="CorePresence.setExpression && CorePresence.setExpression('${e}')">
              ${e.charAt(0).toUpperCase() + e.slice(1)}
            </button>
          `).join("")}
        </div>
      </div>

      <!-- TONE -->
      <div class="evo-block">
        <h2 style="margin-top:0;">Tone</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          ${["warm","neutral","technical","playful"].map(t => `
            <button class="evo-button"
                    onclick="CorePresence.setTone && CorePresence.setTone('${t}')">
              ${t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          `).join("")}
        </div>
      </div>

      <!-- ACTIVITY -->
      <div class="evo-block">
        <h2 style="margin-top:0;">Activity</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          ${["listening","thinking","active","background"].map(a => `
            <button class="evo-button"
                    onclick="CorePresence.setActivity && CorePresence.setActivity('${a}')">
              ${a.charAt(0).toUpperCase() + a.slice(1)}
            </button>
          `).join("")}
        </div>
      </div>

      <!-- CONTINUITY -->
      <div class="evo-block">
        <h2 style="margin-top:0;">Continuity</h2>
        <p style="opacity:0.8;">Continuity Score: <strong>${continuityScore}</strong></p>
      </div>

    </div>
  `;
}
