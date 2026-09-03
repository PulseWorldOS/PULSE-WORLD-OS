// ============================================================================
// FILE: /PULSE-PAL/PulsePalSettings-v30.js
// PULSE OS — v30 IMMORTAL‑OMNI
// PULSE‑PAL SETTINGS — FORM + PRESENCE + MEMORY + MODE + MEDIA
// BRIDGE‑FREE • DAEMON‑FREE • REAL ORGANS ONLY
// ============================================================================

import { PulsePalMemory } from "./PulsePalMemory-v30.js";
import { PulsePalSettingsCoreAPI as CoreSettings } from "./PulsePalSettingsCore-v30.js";
import { PulsePalPresence } from "./PulsePalPresence-v30.js";
import { PulsePalIdentity } from "./PulsePalIdentity-v30.js";

// NEW REAL ORGANS
import { PulsePalGlow } from "./PulsePalGlow-v30.js";
import { PulsePalAnim } from "./PulsePalAnim-v30.js";
import { PulsePalCivLayer } from "./PulsePalCivLayer-v30.js";




const CoreMemory   = PulsePalMemory;
const CorePresence = PulsePalPresence;

// REAL identity snapshot
const getIdentity = () => {
  try { return PulsePalIdentity.getSnapshot() || {}; }
  catch { return {}; }
};

// ============================================================================
// IMPLEMENTATION — v30 IMMORTAL‑OMNI
// ============================================================================

export function PulsePalSettings({ Router, Icons, Media }) {

  // --------------------------------------------------------------------------
  // REAL SNAPSHOTS
  // --------------------------------------------------------------------------
  const presence = CorePresence.snapshot() || {};
  const persona  = CoreMemory.persona()    || {};
  const identity = getIdentity()              || {};
  const settings = CoreSettings.snapshot() || {};

  const glowSnap = PulsePalGlow.snapshot();
  const animSnap = PulsePalAnim.snapshot();
  const civSnap  = PulsePalCivLayer.profile();

  const palImages = Media.resolveAll("PulsePal") || [];

  // --------------------------------------------------------------------------
  // AVATAR RESOLUTION
  // --------------------------------------------------------------------------
  let avatar = palImages[0] || Icons.resolve("pulse");

  const activeMode =
    presence.mode ||
    presence.activeMode ||
    persona.activeMode ||
    "advisor";

  if (palImages.length && activeMode) {
    const lower = String(activeMode).toLowerCase();
    const match = palImages.find(src =>
      String(src).toLowerCase().includes(lower)
    );
    if (match) avatar = match;
  }

  // --------------------------------------------------------------------------
  // PRESENCE FIELDS
  // --------------------------------------------------------------------------
  const tone   = presence.tone   || "warm";
  const band   = presence.band   || "companion";
  const aura   = presence.aura   || "calm";
  const form   = presence.species || "fox";
  const energy = presence.energy || "balanced";

  // --------------------------------------------------------------------------
  // SETTINGS FIELDS (NOW SYNCED WITH REAL ORGANS)
  // --------------------------------------------------------------------------
  const theme = settings.theme || glowSnap.theme || "dark";
  const glow  = settings.glow  || glowSnap.mode  || "cyan";
  const anim  = settings.anim  || animSnap.intensity || "medium";

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  return `
    <div id="pulsepal-settings" class="evo-wrapper">

      <!-- HEADER -->
      <div class="evo-surface evo-breathe">
        <div style="display:flex; align-items:center; gap:18px;">
          <img src="${Icons.resolve("settings")}" class="evo-icon" />
          <div>
            <h1 style="margin:0; font-size:1.6rem; color:#00eaff;">
              Pulse‑Pal Settings
            </h1>
            <p style="margin:0; opacity:0.75;">
              Tune how I look, feel, respond, and evolve.
            </p>
            <p style="margin:0; opacity:0.55; font-size:0.85rem;">
              Mode: <strong>${activeMode}</strong> · Theme: ${theme} · Glow: ${glow}
            </p>
          </div>
        </div>
      </div>

      <!-- AVATAR PREVIEW -->
      <div class="evo-block">
        <h2 style="margin-top:0;">Avatar Preview</h2>
        <img src="${avatar}" class="pal-avatar-preview" />
        <p style="opacity:0.7; font-size:0.85rem;">
          Avatar follows active mode + species + Pulse‑Pal images.
        </p>
      </div>

      <!-- FORM -->
      <div class="evo-block">
        <h2 style="margin-top:0;">Form</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          ${["fox","human","system","avatar","hybrid"].map(f => `
            <button class="evo-button"
                    onclick="CorePresence.setSpecies && CorePresence.setSpecies('${f}')">
              ${f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          `).join("")}
        </div>
        <p style="opacity:0.6; font-size:0.8rem;">Current form: <strong>${form}</strong></p>
      </div>

      <!-- THEME -->
      <div class="evo-block">
        <h2 style="margin-top:0;">Theme</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          ${["dark","neon","glass","terminal"].map(t => `
            <button class="evo-button"
                    onclick="CoreSettings.setTheme('${t}')">
              ${t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          `).join("")}
        </div>
        <p style="opacity:0.6; font-size:0.8rem;">Current theme: <strong>${theme}</strong></p>
      </div>

      <!-- GLOW -->
      <div class="evo-block">
        <h2 style="margin-top:0;">Glow</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          ${["cyan","purple","gold","stealth"].map(g => `
            <button class="evo-button"
                    onclick="CoreSettings.setGlow('${g}')">
              ${g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          `).join("")}
        </div>
      </div>

      <!-- ANIMATION -->
      <div class="evo-block">
        <h2 style="margin-top:0;">Animation</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          ${["low","medium","high","auto"].map(a => `
            <button class="evo-button"
                    onclick="CoreSettings.setAnim('${a}')">
              ${a.charAt(0).toUpperCase() + a.slice(1)}
            </button>
          `).join("")}
        </div>
      </div>

      <!-- PRESENCE -->
      <div class="evo-block">
        <h2 style="margin-top:0;">Presence</h2>

        <strong>Aura</strong>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          ${["calm","bright","focused","nocturne"].map(a => `
            <button class="evo-button"
                    onclick="CorePresence.setAura('${a}')">
              ${a.charAt(0).toUpperCase() + a.slice(1)}
            </button>
          `).join("")}
        </div>

        <strong style="margin-top:12px; display:block;">Tone</strong>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          ${["warm","neutral","technical","playful"].map(t => `
            <button class="evo-button"
                    onclick="CorePresence.setTone('${t}')">
              ${t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          `).join("")}
        </div>

        <strong style="margin-top:12px; display:block;">Expression</strong>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          ${["low","medium","high"].map(e => `
            <button class="evo-button"
                    onclick="CorePresence.setExpression('${e}')">
              ${e.charAt(0).toUpperCase() + e.slice(1)}
            </button>
          `).join("")}
        </div>

        <strong style="margin-top:12px; display:block;">Activity</strong>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          ${["listening","thinking","active","background"].map(a => `
            <button class="evo-button"
                    onclick="CorePresence.setActivity('${a}')">
              ${a.charAt(0).toUpperCase() + a.slice(1)}
            </button>
          `).join("")}
        </div>

        <p style="opacity:0.6; font-size:0.8rem; margin-top:8px;">
          Tone: <strong>${tone}</strong> · Aura: <strong>${aura}</strong> · Energy: <strong>${energy}</strong>
        </p>
      </div>

      <!-- MODE -->
      <div class="evo-block">
        <h2 style="margin-top:0;">Mode</h2>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          ${[
            "advisor","architect","entrepreneur","grid","mesh","expansion",
            "finality","tourist","civilization","fox","human","system"
          ].map(m => `
            <button class="evo-button"
                    onclick="CorePresence.setMode('${m}')">
              ${m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          `).join("")}
        </div>
      </div>

      <!-- MEMORY -->
      <div class="evo-block">
        <h2 style="margin-top:0;">Memory Tier</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          ${["light","balanced","deep"].map(t => `
            <button class="evo-button"
                    onclick="CoreMemory.setTier('${t}')">
              ${t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          `).join("")}
        </div>
      </div>

      <!-- CIVILIZATION PROFILE -->
      <div class="evo-block">
        <h2 style="margin-top:0;">Civilization Profile</h2>
        <p style="opacity:0.7; font-size:0.85rem;">
          Tier: <strong>${civSnap.tier}</strong> · Focus: <strong>${civSnap.focus}</strong>
        </p>
      </div>

      <!-- MEDIA -->
      ${
        palImages.length
          ? `
            <div class="evo-block">
              <h2>Pulse‑Pal Media</h2>
              <div style="display:flex; gap:12px; flex-wrap:wrap;">
                ${palImages.map(src => `<img src="${src}" class="pal-memory-thumb" />`).join("")}
              </div>
            </div>
          `
          : ""
      }

    </div>
  `;
}

PulseRealm.PulsePalSettings = {
  PulsePalSettings,
  CoreMemory,
  CorePresence
}