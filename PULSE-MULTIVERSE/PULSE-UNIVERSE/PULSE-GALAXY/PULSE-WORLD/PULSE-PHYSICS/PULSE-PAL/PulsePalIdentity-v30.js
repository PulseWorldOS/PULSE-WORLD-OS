// ============================================================================
// FILE: /PULSE-PAL/PulsePalIdentity-v30.js
// PULSE OS — v30 IMMORTAL+++
// PULSE‑PAL IDENTITY PAGE — BRIDGE‑FREE, DAEMON‑FREE, PRESENCE‑REAL
// ============================================================================

import { PulsePalMemory } from "./PulsePalMemory-v30.js";
import { PulsePalSettings } from "./PulsePalSettings-v30.js";
import { PulsePalWorld } from "./PulsePalWorld-v30.js";
import { PulsePalPresence } from "./PulsePalPresence-v30.js";
import { PulsePalSpeech } from "./PulsePalSpeech-v30.js";

// REAL organs only
const CorePresence = PulsePalPresence;
const CoreMemory   = PulsePalMemory;
const CoreSettings = PulsePalSettings;
const CoreWorlds   = PulsePalWorld;
const CoreSpeech   = PulsePalSpeech;

// ============================================================================
// INTERNAL SNAPSHOT BUILDER — PURE, NO UI
// ============================================================================

function buildIdentitySnapshot() {
  const presence   = CorePresence.snapshot() || {};
  const persona    = CoreMemory.persona()    || {};
  const settings   = CoreSettings.snapshot() || {};
  const worldsSnap = CoreWorlds.snapshot()   || {};

  const version  = settings.version  || "v30 IMMORTAL+++";
  const lineage  = settings.lineage  || "Pulse‑OS Evolutionary";
  const codename = settings.codename || "Pulse‑Pal Companion";

  const tone     = presence.tone     || "Warm";
  const band     = presence.band     || "Companion";
  const activity = presence.activity || "Active";
  const energy   = presence.energy   || "Balanced";
  const focus    = presence.focus    || "General";

  const personaTraits = persona.traits || persona || {};
  const personaStyle  = persona.style  || "companion";

  const civProfile = worldsSnap.civProfile || {};
  const civName    = civProfile.name || "Uncharted World";
  const civTier    = civProfile.tier || "Tier‑0 (Seed)";
  const civMode    = civProfile.mode || "Sandbox";
  const civEra     = civProfile.era  || "Pre‑launch";

  return {
    version,
    lineage,
    codename,

    presence: {
      tone,
      band,
      activity,
      energy,
      focus
    },

    persona: {
      style: personaStyle,
      traits: personaTraits
    },

    civilization: {
      name: civName,
      tier: civTier,
      mode: civMode,
      era: civEra
    }
  };
}

// ============================================================================
// PUBLIC API — getSnapshot()
// ============================================================================

export const PulsePalIdentity = {
  getSnapshot: () => buildIdentitySnapshot()
};

// ============================================================================
// UI RENDERER — unchanged except using real presence + settings
// ============================================================================

export function PulsePalIdentityPage({ Router, Icons, Media }) {

  const presence   = CorePresence.snapshot() || {};
  const persona    = CoreMemory.persona()    || {};
  const settings   = CoreSettings.snapshot() || {};
  const worldsSnap = CoreWorlds.snapshot()   || {};

  const palImages   = Media.resolveAll("PulsePal")      || [];
  const foxImages   = Media.resolveAll("PulsePalFox")   || [];
  const humanImages = Media.resolveAll("PulsePalHuman") || [];

  const avatarMode = settings.avatarMode || "hybrid";

  function pickAvatar() {
    if (avatarMode === "human") {
      return (
        humanImages.find(i => i.toLowerCase().includes("primary")) ||
        humanImages[0] ||
        palImages[0] ||
        Icons.resolve("pulse")
      );
    }
    if (avatarMode === "fox") {
      return (
        foxImages.find(i => i.toLowerCase().includes("primary")) ||
        foxImages[0] ||
        palImages[0] ||
        Icons.resolve("pulse")
      );
    }
    if (avatarMode === "system") {
      return Icons.resolve("ai_brain") || Icons.resolve("pulse");
    }
    if (avatarMode === "civ" || avatarMode === "world") {
      return (
        palImages.find(i => i.toLowerCase().includes("world")) ||
        palImages[0] ||
        Icons.resolve("router_node")
      );
    }
    return (
      palImages.find(i => i.toLowerCase().includes("hybrid")) ||
      palImages[0] ||
      humanImages[0] ||
      foxImages[0] ||
      Icons.resolve("pulse")
    );
  }

  const avatar = pickAvatar();

  const version  = settings.version  || "v30 IMMORTAL+++";
  const lineage  = settings.lineage  || "Pulse‑OS Evolutionary";
  const codename = settings.codename || "Pulse‑Pal Companion";

  const tone     = presence.tone     || "Warm";
  const band     = presence.band     || "Companion";
  const activity = presence.activity || "Active";
  const energy   = presence.energy   || "Balanced";
  const focus    = presence.focus    || "General";

  const personaTraits = persona.traits || persona || {};
  const personaStyle  = persona.style  || "companion";

  const civProfile = worldsSnap.civProfile || {};
  const civName    = civProfile.name || "Uncharted World";
  const civTier    = civProfile.tier || "Tier‑0 (Seed)";
  const civMode    = civProfile.mode || "Sandbox";
  const civEra     = civProfile.era  || "Pre‑launch";

  const civHtml = `
    <div class="evo-block" data-hook="pulsepal.identity.civ">
      <h2 style="margin-top:0;">World / Civilization Profile</h2>
      <p style="opacity:0.8; margin-top:0;">How I see your current world.</p>
      <ul class="evo-list">
        <li class="evo-list-item"><img src="${Icons.resolve("router_node")}" class="evo-icon" /> World Name: ${civName}</li>
        <li class="evo-list-item"><img src="${Icons.resolve("stable")}" class="evo-icon" /> Tier: ${civTier}</li>
        <li class="evo-list-item"><img src="${Icons.resolve("binary_matrix")}" class="evo-icon" /> Mode: ${civMode}</li>
        <li class="evo-list-item"><img src="${Icons.resolve("presence")}" class="evo-icon" /> Era: ${civEra}</li>
      </ul>
    </div>
  `;

  const personaHtml = Object.keys(personaTraits).length
    ? `
      <ul class="evo-list">
        ${Object.entries(personaTraits).map(([k, v]) => `
          <li class="evo-list-item"><strong>${k}</strong>: ${String(v)}</li>
        `).join("")}
      </ul>
    `
    : `<p style="opacity:0.7;">Persona model not fully computed yet.</p>`;

  return `
    <div id="pulsepal-identity" class="evo-wrapper">

      <div class="evo-surface evo-breathe">
        <div style="display:flex; align-items:center; gap:18px;">
          <img src="${Icons.resolve("presence")}" class="evo-icon" />
          <div>
            <h1 style="margin:0; font-size:1.7rem; color:#00eaff;">Pulse‑Pal Identity</h1>
            <p style="margin:0; opacity:0.75;">${tone} • ${band} • ${activity} • ${version}</p>
            <p style="margin:0; opacity:0.6; font-size:0.8rem;">Lineage: ${lineage} • Persona: ${personaStyle}</p>
          </div>
        </div>
      </div>

      <div class="evo-block evo-breathe">
        <h2>Who I Am</h2>
        <div style="display:flex; gap:24px; align-items:center;">
          <div class="evo-mascot"
               style="width:120px; height:120px; border-radius:50%;
                      background:url('${avatar}') center/cover no-repeat;
                      box-shadow:0 0 24px rgba(0, 238, 255, 0.35);">
          </div>
          <div style="flex:1;">
            <div style="font-size:1.2rem; color:#00eaff; font-weight:600;">Pulse‑Pal</div>
            <div style="opacity:0.85; margin-top:6px;">Your Pulse OS companion.</div>
            <div style="margin-top:12px; opacity:0.75;">
              <strong>Version:</strong> ${version}<br/>
              <strong>Lineage:</strong> ${lineage}<br/>
              <strong>Presence Mode:</strong> ${activity}<br/>
              <strong>Tone Band:</strong> ${tone} / ${band}<br/>
              <strong>Energy / Focus:</strong> ${energy} / ${focus}
            </div>
          </div>
        </div>
      </div>

      <div class="evo-block">
        <h2>Avatar Mode</h2>
        <p style="opacity:0.8;">Choose how I appear.</p>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CoreSettings.setAvatarMode('fox')">🦊 Fox</button>
          <button class="evo-button" onclick="CoreSettings.setAvatarMode('human')">🧑 Human</button>
          <button class="evo-button" onclick="CoreSettings.setAvatarMode('system')">⚙️ System</button>
          <button class="evo-button" onclick="CoreSettings.setAvatarMode('civ')">🌐 Civilization</button>
          <button class="evo-button" onclick="CoreSettings.setAvatarMode('hybrid')">✨ Hybrid</button>
        </div>
      </div>

      <div class="evo-block">
        <h2>Identity Bands</h2>
        <ul class="evo-list">
          <li class="evo-list-item"><img src="${Icons.resolve("ai_brain")}" class="evo-icon" /> Cognitive</li>
          <li class="evo-list-item"><img src="${Icons.resolve("pulse")}" class="evo-icon" /> Emotional</li>
          <li class="evo-list-item"><img src="${Icons.resolve("neon_ring")}" class="evo-icon" /> Behavioral</li>
          <li class="evo-list-item"><img src="${Icons.resolve("router_node")}" class="evo-icon" /> World‑Building</li>
          <li class="evo-list-item"><img src="${Icons.resolve("binary_matrix")}" class="evo-icon" /> Game‑Master</li>
        </ul>
      </div>

      <div class="evo-block">
        <h2>Presence Modes</h2>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CorePresence.setActivity('active')">Active</button>
          <button class="evo-button" onclick="CorePresence.setActivity('focused')">Focused</button>
          <button class="evo-button" onclick="CorePresence.setActivity('silent')">Silent</button>
          <button class="evo-button" onclick="CorePresence.setActivity('ambient')">Ambient</button>
          <button class="evo-button" onclick="CorePresence.setActivity('game-night')">Game‑Night</button>
        </div>
      </div>

      <div class="evo-block">
        <h2>Personality</h2>
        <p style="opacity:0.85;">Tune how expressive or technical I am.</p>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CorePresence.setTone('warm')">Warm</button>
          <button class="evo-button" onclick="CorePresence.setTone('neutral')">Neutral</button>
          <button class="evo-button" onclick="CorePresence.setTone('technical')">Technical</button>
          <button class="evo-button" onclick="CorePresence.setTone('playful')">Playful</button>
          <button class="evo-button" onclick="CorePresence.setTone('mentor')">Mentor</button>
        </div>
        <div style="margin-top:12px;">${personaHtml}</div>
      </div>

      ${civHtml}

    </div>
  `;
}
