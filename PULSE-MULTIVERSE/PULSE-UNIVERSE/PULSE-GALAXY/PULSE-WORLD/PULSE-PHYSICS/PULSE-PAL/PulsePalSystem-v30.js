// ============================================================================
// FILE: /PULSE-PAL/PulsePalSystem-v30.js
// PULSE OS — v30 IMMORTAL+++
// PULSE‑PAL SYSTEM PAGE — DIAGNOSTIC MEMBRANE + WORLD‑OS + MODE + PERSONA + CIV LAYERS
// ============================================================================
//
// ROLE:
//   Pure UI diagnostic membrane for Pulse‑OS v30.
//   Reads ONLY from real organs:
//     • Presence
//     • Memory
//     • Router
//     • World
//     • Glow
//     • Anim
//     • CivLayer
//     • Media
//
//   NO daemon. NO bridge. NO CoreSystem.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import { PulsePalMemory } from "./PulsePalMemory-v30.js";

import { PulsePalIdentity } from "./PulsePalIdentity-v30.js";
import { PulsePalSettings } from "./PulsePalSettings-v30.js";
import { PulsePalWorld } from "./PulsePalWorld-v30.js";
import { PulsePalPresence } from "./PulsePalPresence-v30.js";
import { PulsePalMedia } from "./PulsePalMedia-v30.js";

// REAL ORGANS (new v30 cores)
import { PulsePalRouter } from "./PulsePalRouter-v30.js";
import { PulsePalGlow } from "./PulsePalGlow-v30.js";
import { PulsePalAnim } from "./PulsePalAnim-v30.js";
import { PulsePalCivLayer } from "./PulsePalCivLayer-v30.js";

const CoreMemory   = PulsePalMemory;
const CorePresence = PulsePalPresence;
const CoreRouter   = PulsePalRouter;
const CoreWorld    = PulsePalWorld;
const CoreGlow     = PulsePalGlow;
const CoreAnim     = PulsePalAnim;
const CoreCivLayer = PulsePalCivLayer;
const MediaBridge  = PulsePalMedia;

// ============================================================================
// IMPLEMENTATION — v30 IMMORTAL+++
// ============================================================================

export function PulsePalSystem({ Router, Icons, Media }) {

  // --------------------------------------------------------------------------
  // REAL SNAPSHOTS
  // --------------------------------------------------------------------------
  const presence    = CorePresence.snapshot() || {};
  const persona     = CoreMemory.persona()  || {};
  const routerState = CoreRouter.snapshot()   || {};
  const worldState  = CoreWorld.snapshot()    || {};
  const glowState   = CoreGlow.snapshot()     || {};
  const animState   = CoreAnim.snapshot()     || {};
  const civProfile  = CoreCivLayer.profile()  || {};

  // continuity derived from real organs only
  const continuity =
    persona.continuityScore ??
    worldState.continuityScore ??
    0;

  const activeMode =
    presence.mode ||
    presence.activeMode ||
    persona.tone.activeMode ||
    "advisor";

  const modeWeights =
    presence.modeWeights ||
    persona.modeInfluence ||
    {};

  // --------------------------------------------------------------------------
  // AVATAR RESOLUTION
  // --------------------------------------------------------------------------
  const palImages =
    Media.resolveAll("PulsePal") ||
    MediaBridge.resolveAll("PulsePal") ||
    [];

  let avatar = palImages[0] || Icons.resolve("pulse");

  const activeForm =
    presence.form ||
    persona.form ||
    "fox";

  if (palImages.length) {
    const lowerMode = activeMode.toLowerCase();
    const lowerForm = activeForm.toLowerCase();

    const match =
      palImages.find(src => src.toLowerCase().includes(lowerMode)) ||
      palImages.find(src => src.toLowerCase().includes(lowerForm));

    if (match) avatar = match;
  }

  // --------------------------------------------------------------------------
  // MODE WEIGHTS PANEL
  // --------------------------------------------------------------------------
  const modeWeightsList = Object.keys(modeWeights).length
    ? Object.entries(modeWeights)
        .sort((a, b) => (b[1] || 0) - (a[1] || 0))
        .slice(0, 8)
    : [];

  const modeHtml = modeWeightsList.length
    ? `
      <div class="evo-block">
        <h2>Mode Engine</h2>
        <p style="opacity:0.7;">Active mode blend:</p>
        <ul class="evo-list">
          ${modeWeightsList
            .map(([mode, w]) =>
              `<li class="evo-list-item">${mode}: ${(w * 100).toFixed(1)}%</li>`
            )
            .join("")}
        </ul>
      </div>
    `
    : `
      <div class="evo-block">
        <h2>Mode Engine</h2>
        <p style="opacity:0.7;">No mode weights computed yet.</p>
      </div>
    `;

  // --------------------------------------------------------------------------
  // PERSONA PANEL
  // --------------------------------------------------------------------------
  const personaTraits = persona.traits || persona || {};

  const personaHtml = Object.keys(personaTraits).length
    ? `
      <div class="evo-block">
        <h2>Persona Engine</h2>
        <ul class="evo-list">
          ${Object.entries(personaTraits)
            .map(([k, v]) =>
              `<li class="evo-list-item"><strong>${k}</strong>: ${String(v)}</li>`
            )
            .join("")}
        </ul>
      </div>
    `
    : `
      <div class="evo-block">
        <h2>Persona Engine</h2>
        <p style="opacity:0.7;">Persona not computed yet.</p>
      </div>
    `;

  // --------------------------------------------------------------------------
  // WORLD / CIVILIZATION PANEL
  // --------------------------------------------------------------------------
  const worlds = worldState.worlds || [];

  const civHtml = `
    <div class="evo-block">
      <h2>World‑OS & Civilization Layer</h2>
      <p style="opacity:0.75;">Diagnostics for worlds, shards, and civ‑profiles.</p>
      <ul class="evo-list">
        <li class="evo-list-item">
          <img src="${Icons.resolve("neon_ring")}" class="evo-icon" />
          Worlds Loaded: ${worlds.length}
        </li>
        <li class="evo-list-item">
          <img src="${Icons.resolve("router_node")}" class="evo-icon" />
          Active World: ${worldState.activeWorld || "None"}
        </li>
        <li class="evo-list-item">
          <img src="${Icons.resolve("pulse_wave")}" class="evo-icon" />
          Civ Tier: ${civProfile.tier || "sandbox"}
        </li>
        <li class="evo-list-item">
          <img src="${Icons.resolve("binary_matrix")}" class="evo-icon" />
          Civ Focus: ${civProfile.focus || "exploration"}
        </li>
      </ul>
    </div>
  `;

  // --------------------------------------------------------------------------
  // ROUTER PANEL
  // --------------------------------------------------------------------------
  const routerHtml = `
    <div class="evo-block">
      <h2>Router / Mesh</h2>
      <ul class="evo-list">
        <li class="evo-list-item">
          <img src="${Icons.resolve("router_node")}" class="evo-icon" />
          State: ${routerState.state || "connected"}
        </li>
        <li class="evo-list-item">
          <img src="${Icons.resolve("mesh")}" class="evo-icon" />
          Mesh Links: ${routerState.links || 0}
        </li>
        <li class="evo-list-item">
          <img src="${Icons.resolve("pulse_wave")}" class="evo-icon" />
          Latency Band: ${routerState.latencyBand || "low"}
        </li>
      </ul>
    </div>
  `;

  // --------------------------------------------------------------------------
  // GLOW / ANIM PANEL
  // --------------------------------------------------------------------------
  const glowAnimHtml = `
    <div class="evo-block">
      <h2>Glow & Animation</h2>
      <ul class="evo-list">
        <li class="evo-list-item">
          <img src="${Icons.resolve("neon_ring")}" class="evo-icon" />
          Glow Mode: ${glowState.mode}
        </li>
        <li class="evo-list-item">
          <img src="${Icons.resolve("pulse_wave")}" class="evo-icon" />
          Glow Intensity: ${glowState.intensity}
        </li>
        <li class="evo-list-item">
          <img src="${Icons.resolve("pulse_wave")}" class="evo-icon" />
          Anim State: ${animState.state}
        </li>
        <li class="evo-list-item">
          <img src="${Icons.resolve("settings")}" class="evo-icon" />
          Theme: ${glowState.theme}
        </li>
      </ul>
    </div>
  `;

  // --------------------------------------------------------------------------
  // MEDIA PANEL
  // --------------------------------------------------------------------------
  const mediaHtml = palImages.length
    ? `
      <div class="evo-block">
        <h2>Pulse‑Pal Media</h2>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          ${palImages.map(src => `<img src="${src}" class="pal-system-thumb" />`).join("")}
        </div>
      </div>
    `
    : "";

  // --------------------------------------------------------------------------
  // SYSTEM VITALS (DERIVED)
  // --------------------------------------------------------------------------
  const vitals = {
    core:    "Stable",
    router:  routerState.state || "connected",
    presence: presence.activity || "active",
    memory:  "Online",
    persona: Object.keys(personaTraits).length ? "Online" : "Idle",
    mode:    activeMode
  };

  const vitalsHtml = `
    <div class="evo-block">
      <h2>System Vitals</h2>
      <ul class="evo-list">
        <li class="evo-list-item"><img src="${Icons.resolve("stable")}" class="evo-icon" /> Core Engine: ${vitals.core}</li>
        <li class="evo-list-item"><img src="${Icons.resolve("router_node")}" class="evo-icon" /> Router Cortex: ${vitals.router}</li>
        <li class="evo-list-item"><img src="${Icons.resolve("presence")}" class="evo-icon" /> Presence Engine: ${vitals.presence}</li>
        <li class="evo-list-item"><img src="${Icons.resolve("memory")}" class="evo-icon" /> Memory Engine: ${vitals.memory}</li>
        <li class="evo-list-item"><img src="${Icons.resolve("ai_brain")}" class="evo-icon" /> Persona Engine: ${vitals.persona}</li>
        <li class="evo-list-item"><img src="${Icons.resolve("binary_matrix")}" class="evo-icon" /> Mode Engine: ${vitals.mode}</li>
      </ul>
    </div>
  `;

  // --------------------------------------------------------------------------
  // ORGAN STATUS PANEL
  // --------------------------------------------------------------------------
  const organs = [
    { label: "Presence", icon: "presence", status: vitals.presence },
    { label: "Memory",   icon: "memory",   status: vitals.memory },
    { label: "Persona",  icon: "ai_brain", status: vitals.persona },
    { label: "Mode",     icon: "binary_matrix", status: vitals.mode },
    { label: "Router",   icon: "router_node",   status: vitals.router },
    { label: "Glow",     icon: "neon_ring",     status: glowState.mode },
    { label: "Anim",     icon: "pulse_wave",    status: animState.state }
  ];

  const organsHtml = `
    <div class="evo-block">
      <h2>Organs</h2>
      <ul class="evo-list">
        ${organs.map(o => `
          <li class="evo-list-item">
            <img src="${Icons.resolve(o.icon)}" class="evo-icon" />
            ${o.label}: ${o.status}
          </li>
        `).join("")}
      </ul>
    </div>
  `;

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  return `
    <div id="pulsepal-system" class="evo-wrapper">

      <!-- HEADER -->
      <div class="evo-surface evo-breathe">
        <div style="display:flex; align-items:center; gap:18px;">
          <img src="${Icons.resolve("diagnostics_pulse")}" class="evo-icon" />
          <div>
            <h1 style="margin:0; font-size:1.6rem; color:#00eaff;">Pulse‑Pal System</h1>
            <p style="margin:0; opacity:0.75;">Internal diagnostics, continuity, and world‑OS overview.</p>
            <p style="margin:0; opacity:0.55; font-size:0.85rem;">
              Mode: <strong>${activeMode}</strong> · Form: ${activeForm} · Continuity: ${continuity}
            </p>
          </div>
        </div>
      </div>

      <!-- AVATAR -->
      <div class="evo-block">
        <h2>System Avatar</h2>
        <img src="${avatar}" class="pal-avatar-preview" />
        <p style="opacity:0.7; font-size:0.85rem;">Avatar adapts to mode, form, persona, and civ‑layer profile.</p>
      </div>

      ${vitalsHtml}
      ${organsHtml}
      ${routerHtml}
      ${civHtml}
      ${modeHtml}
      ${personaHtml}
      ${glowAnimHtml}
      ${mediaHtml}

    </div>
  `;
}
