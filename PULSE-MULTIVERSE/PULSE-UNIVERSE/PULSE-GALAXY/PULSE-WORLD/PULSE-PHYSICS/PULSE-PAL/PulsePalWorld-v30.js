// ============================================================================
// FILE: /PULSE-PAL/PulsePalWorld-v34.js
// PULSE OS — v34 ORBITAL IMMORTAL+++
// PULSE‑PAL WORLD CORTEX — WORLD ENGINE + PRESENCE + MEDIA + TASK/CIV HOOKS
// ============================================================================
//
// ROLE:
//   The Pulse‑Pal World Cortex is the world membrane itPulseRealm.
//   It renders and manages (from real organs only):
//     • World Layers (surface, deep, meta, civ)
//     • World Entities (nodes, objects, proxies, people, factions)
//     • World State (mood, tone, drift, stability, threat, prosperity)
//     • World Time (ticks, cycles, epochs, seasons, eras)
//     • World Memory (semantic world graph + continuity bands)
//     • World Presence (world‑aware aura + mode‑aware overlays)
//     • World Persona (advisor / architect / grid / fox / human / civilization)
//     • World Evolution (versioning, lineage, patches)
//     • World Media (world images, avatars, tilesets)
//     • World Hooks for Tasks, Skills, Persona, Presence, Civilization
//     • Bubble + Companion integration (live presence + messenger‑aware bubble)
//
// CONTRACT:
//   • Pure UI Organ
//   • Deterministic render
//   • Real organs only (no bridge, no daemon)
//   • Zero side effects
// ============================================================================
import { PulseVitalsLogger, PulseVitalsMonitor, PulseUIFlow, PulseUIErrors, log, warn, error,  PulseProofReflex, PulseUIRouteMemory, PulsePageScanner} from "../../../../../_PROOF/PULSE-PROOF.js";
import { PulsePalMemory } from "./PulsePalMemory-v30.js";
import { PulsePalSpeech } from "./PulsePalSpeech-v30.js";

import { PulsePalMedia } from "./PulsePalMedia-v30.js";
import { PulsePalTasks } from "./PulsePalTasks-v30.js";
import { PulsePalSkills } from "./PulsePalSkills-v30.js";
import { PulsePalIdentity } from "./PulsePalIdentity-v30.js";
import { PulsePalSettings } from "./PulsePalSettings-v30.js";
import { PulsePalPresence } from "./PulsePalPresence-v30.js";
import { PulsePalPersonaV30 as PulsePalPersona } from "./PulsePalPersona-v30.js";
import { PulsePalModeEngine } from "./PulsePalModeEngine-v30.js";

import { PulsePalBubble } from "./PulsePalBubble-v30.js";
import { PulsePalCompanion } from "./PulsePalCompanion-v30.js";
import { PulsePalMessenger } from "./PulsePalMessenger-v30.js";

// REAL organs only
const CorePresence = PulsePalPresence;
const CoreMemory   = PulsePalMemory;
const CoreSettings = PulsePalSettings;
const CoreSpeech   = PulsePalSpeech;
const CorePersona  = PulsePalPersona;
const CoreMode     = PulsePalModeEngine;

const MediaBridge  = PulsePalMedia;
const CoreTasks    = PulsePalTasks;
const CoreSkills   = PulsePalSkills;

// ============================================================================
// IMPLEMENTATION — v34 ORBITAL IMMORTAL+++ (BARRIER‑HYBRID)
// ============================================================================
// NOTE: Signature upgraded to work with Barrier:
//   PulsePalWorld(chosenRoute, sharedOptions)
//   where sharedOptions = { Router, Icons, Media, engine, gpu, proxyURL2, ... }
// ============================================================================
export function PulsePalWorld(
  route,
  { Router, Icons, Media, engine, gpu, proxyURL2 } = {}
) {

  // --------------------------------------------------------------------------
  // WORLD SNAPSHOTS — FROM MEMORY + PRESENCE (NO COREWORLD, NO DAEMON)
  // --------------------------------------------------------------------------
  const memSnap        = CoreMemory.snapshot()   || {};
  const presence       = CorePresence.snapshot() || {};
  const persona        = CoreMemory.persona()    || {};
  const settings       = CoreSettings.snapshot() || {};
  const modeSnap       = CoreMode.getLast()      || {};
  const messengerSnap  = PulsePalMessenger.snapshot() || {};

  const worldState      = memSnap.worldState || memSnap.world || {};
  const worldLayers     = worldState.layers  || [];
  const worldEntities   = worldState.entities || [];
  const worldTime       = worldState.time    || {};
  const worldMemory     = worldState.memory  || memSnap.worldMemory || {};
  const worldContinuity = worldState.continuity || memSnap.worldContinuity || {};

  const palImages   = Media.resolveAll("PulsePal")      || [];
  const worldImages = MediaBridge.resolveAll("PulseWorld") || [];

  // Engine + GPU (from Barrier / PulseEngine)
  const engineState = engine || null;
  const gpuState    = gpu    || { supported: false, reason: "none" };

  // --------------------------------------------------------------------------
  // MODES + FORMS
  // --------------------------------------------------------------------------
  const avatarMode  = settings.avatarMode  || "fox";
  const personaMode = settings.personaMode || persona.tone.activeMode || "advisor";

  const activeMode =
    presence.mode ||
    presence.activeMode ||
    modeSnap.activeMode ||
    persona.tone.activeMode ||
    personaMode ||
    "advisor";

  const continuityScore =
    worldContinuity.score ??
    memSnap.continuityScore ??
    0;

  // --------------------------------------------------------------------------
  // AVATAR RESOLUTION (FOX / HUMAN / MODE)
  // --------------------------------------------------------------------------
  const foxImages   = palImages.filter(src => src.toLowerCase().includes("fox"));
  const humanImages = palImages.filter(src => src.toLowerCase().includes("human"));
  let avatarBase    = palImages[0] || Icons.resolve("pulse");

  let avatar =
    avatarMode === "human"
      ? (humanImages[0] || avatarBase)
      : (foxImages[0]   || avatarBase);

  if (palImages.length && activeMode) {
    const lower = String(activeMode).toLowerCase();
    const match = palImages.find(src => String(src).toLowerCase().includes(lower));
    if (match) avatar = match;
  }

  // --------------------------------------------------------------------------
  // WORLD CIVILIZATION / GAME LAYER
  // --------------------------------------------------------------------------
  const civState = worldState.civilization || {};
  const civEra   = civState.era   || "Proto‑Era";
  const civTier  = civState.tier  || "Seed";
  const civScore = civState.score || 0;

  const civHtml = `
    <div class="evo-block" data-hook="pulsepal.world.civ">
      <h2>Civilization Layer</h2>
      <p>Era: ${civEra}</p>
      <p>Tier: ${civTier}</p>
      <p>World Score: ${civScore}</p>
      <p style="opacity:0.75; font-size:0.9rem;">
        This layer can map tasks, skills, and worlds into a civilization‑style progression.
      </p>
    </div>
  `;

  // --------------------------------------------------------------------------
  // WORLD LAYERS HTML
  // --------------------------------------------------------------------------
  const layersHtml = worldLayers.length
    ? worldLayers.map(l => `
        <li class="evo-list-item">
          <img src="${Icons.resolve('layers')}" class="evo-icon" />
          <strong>${l.name || "Layer"}</strong> — ${l.state || "active"}
        </li>
      `).join("")
    : `<li class="evo-list-item" style="opacity:0.7;">No world layers defined yet.</li>`;

  // --------------------------------------------------------------------------
  // WORLD ENTITIES HTML
  // --------------------------------------------------------------------------
  const entitiesHtml = worldEntities.length
    ? worldEntities.map(e => `
        <li class="evo-list-item">
          <img src="${Icons.resolve('entity')}" class="evo-icon" />
          ${e.id || "Entity"} — ${e.type || "node"}
          ${e.faction ? ` — <span style="opacity:0.75;">${e.faction}</span>` : ""}
        </li>
      `).join("")
    : `<li class="evo-list-item" style="opacity:0.7;">No entities registered.</li>`;

  // --------------------------------------------------------------------------
  // WORLD STATE EXTENDED
  // --------------------------------------------------------------------------
  const mood        = worldState.mood        || "Neutral";
  const tone        = worldState.tone        || presence.tone || "Calm";
  const drift       = worldState.drift       || "Stable";
  const stability   = worldState.stability   || "High";
  const threat      = worldState.threat      || "Low";
  const prosperity  = worldState.prosperity  || "Emergent";

  // --------------------------------------------------------------------------
  // WORLD TIME EXTENDED
  // --------------------------------------------------------------------------
  const tick   = worldTime.tick   || 0;
  const cycle  = worldTime.cycle  || 0;
  const epoch  = worldTime.epoch  || "v30";
  const season = worldTime.season || "All‑Season";
  const era    = worldTime.era    || civEra;

  // --------------------------------------------------------------------------
  // WORLD MEMORY PANEL
  // --------------------------------------------------------------------------
  const worldMemoryJson = JSON.stringify(worldMemory, null, 2);

  // --------------------------------------------------------------------------
  // WORLD CONTINUITY PANEL
  // --------------------------------------------------------------------------
  const continuityHtml = `
    <div class="evo-block" data-hook="pulsepal.world.continuity">
      <h2>World Continuity</h2>
      <p>Continuity Score: <strong>${continuityScore}</strong></p>
      <p style="opacity:0.75; font-size:0.9rem;">
        Tracks how coherent and stable the world has been across sessions.
      </p>
    </div>
  `;

  // --------------------------------------------------------------------------
  // TASK / SKILL HOOKS
  // --------------------------------------------------------------------------
  const taskCount  = CoreTasks.list().length || 0;
  const skillCount = CoreSkills.count() || 0;

  const hooksHtml = `
    <div class="evo-block" data-hook="pulsepal.world.hooks">
      <h2>World Hooks</h2>
      <p>Linked Tasks: ${taskCount}</p>
      <p>Linked Skills: ${skillCount}</p>
      <p style="opacity:0.75; font-size:0.9rem;">
        Tasks and skills can be mapped to regions, factions, or eras for civilization‑style play.
      </p>
      <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:8px;">
        <button class="evo-button" onclick="Router && Router.go && Router.go('pulsepal.tasks')">
          <img src="${Icons.resolve('check')}" class="evo-icon" />
          View Tasks
        </button>
        <button class="evo-button" onclick="Router && Router.go && Router.go('pulsepal.skills')">
          <img src="${Icons.resolve('binary_matrix')}" class="evo-icon" />
          View Skills
        </button>
      </div>
    </div>
  `;

  // --------------------------------------------------------------------------
  // MEDIA PANEL
  // --------------------------------------------------------------------------
  const mediaHtml = palImages.length || worldImages.length
    ? `
      <div class="evo-block" data-hook="pulsepal.world.media">
        <h2>World Media</h2>
        <p style="opacity:0.75; font-size:0.9rem;">
          Pulse‑Pal + World images, tiles, and avatars.
        </p>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          ${palImages.map(src => `<img src="${src}" class="pal-world-thumb" />`).join("")}
          ${worldImages.map(src => `<img src="${src}" class="pal-world-thumb" />`).join("")}
        </div>
      </div>
    `
    : "";

  // --------------------------------------------------------------------------
  // BUBBLE + COMPANION EMBED (LIVE WORLD‑AWARE SURFACES)
  // --------------------------------------------------------------------------
  const bubbleHtml    = PulsePalBubble({ Router, Icons, Media });
  const companionHtml = PulsePalCompanion({ Router, Icons, Media });

  // --------------------------------------------------------------------------
  // OPTIONAL MESSENGER SUMMARY (WORLD‑SIDE VIEW)
  // --------------------------------------------------------------------------
  const messengerSummaryHtml = `
    <div class="evo-block" data-hook="pulsepal.world.messenger">
      <h2>Messenger Signals</h2>
      <p style="opacity:0.8; font-size:0.9rem;">
        Bubbles: ${messengerSnap.bubbles.length || 0} •
        Signals: ${messengerSnap.signals.length || 0}
      </p>
      <p style="opacity:0.7; font-size:0.85rem;">
        Typing: ${messengerSnap.presence.typing ? "Yes" : "No"} •
        Last App: ${messengerSnap.presence.lastActiveApp || "None"}
      </p>
    </div>
  `;

  // --------------------------------------------------------------------------
  // ROUTE + ENGINE PANEL (BARRIER / ENGINE / GPU AWARENESS)
// --------------------------------------------------------------------------
  const routeHtml = `
    <div class="evo-block" data-hook="pulsepal.world.route">
      <h2>World Route</h2>
      <p>Current Route: <strong>${route || "index"}</strong></p>
      <p style="opacity:0.75; font-size:0.9rem;">
        Route provided by PulseBarrier as the active world context.
      </p>
    </div>
  `;

  const engineHtml = `
    <div class="evo-block" data-hook="pulsepal.world.engine">
      <h2>Engine & GPU</h2>
      <p>Engine Compass: <strong>${engineState ? "online" : "offline"}</strong></p>
      <p>GPU: <strong>${gpuState.supported ? gpuState.reason : "none"}</strong></p>
      <p style="opacity:0.75; font-size:0.9rem;">
        Engine + GPU provide warm‑path physics, parallel decode, and IMMORTAL hydration for this world.
      </p>
    </div>
  `;

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  return `
    <div id="pulsepal-world" class="evo-wrapper">

      <!-- HEADER ------------------------------------------------------------->
      <div class="evo-surface evo-breathe" data-hook="pulsepal.world.header">
        <div style="display:flex; align-items:center; gap:18px;">
          <img src="${avatar}" class="pal-avatar-preview" />
          <div>
            <h1 style="margin:0; font-size:1.6rem; color:#00eaff;">
              Pulse‑Pal World
            </h1>
            <p style="margin:0; opacity:0.75;">
              ${presence.tone || "The world is alive and mode‑aware."}
            </p>
            <p style="margin:0; opacity:0.55; font-size:0.85rem;">
              Mode: <strong>${activeMode}</strong> ·
              Continuity: ${continuityScore} ·
              Era: ${era} ·
              GPU: ${gpuState.supported ? gpuState.reason : "none"}
            </p>
          </div>
        </div>
      </div>

      <!-- WORLD STATE -------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.world.state">
        <h2>World State</h2>
        <p>Mood: ${mood}</p>
        <p>Tone: ${tone}</p>
        <p>Drift: ${drift}</p>
        <p>Stability: ${stability}</p>
        <p>Threat: ${threat}</p>
        <p>Prosperity: ${prosperity}</p>
      </div>

      <!-- WORLD LAYERS ------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.world.layers">
        <h2>World Layers</h2>
        <ul class="evo-list">
          ${layersHtml}
        </ul>
      </div>

      <!-- WORLD ENTITIES ----------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.world.entities">
        <h2>Entities</h2>
        <ul class="evo-list">
          ${entitiesHtml}
        </ul>
      </div>

      <!-- WORLD TIME --------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.world.time">
        <h2>World Time</h2>
        <p>Tick: ${tick}</p>
        <p>Cycle: ${cycle}</p>
        <p>Epoch: ${epoch}</p>
        <p>Season: ${season}</p>
        <p>Era: ${era}</p>
      </div>

      <!-- WORLD MEMORY ------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.world.memory">
        <h2>World Memory</h2>
        <pre class="evo-surface" style="padding:12px; opacity:0.85;">
${worldMemoryJson}
        </pre>
      </div>

      <!-- WORLD CONTINUITY --------------------------------------------------->
      ${continuityHtml}

      <!-- CIVILIZATION / GAME LAYER ----------------------------------------->
      ${civHtml}

      <!-- WORLD HOOKS (TASKS / SKILLS) -------------------------------------->
      ${hooksHtml}

      <!-- MESSENGER SUMMARY -------------------------------------------------->
      ${messengerSummaryHtml}

      <!-- ROUTE + ENGINE / GPU PANELS --------------------------------------->
      ${routeHtml}
      ${engineHtml}

      <!-- LIVE BUBBLE SURFACE ----------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.world.bubble">
        <h2>Live Bubble</h2>
        ${bubbleHtml}
      </div>

      <!-- COMPANION PANEL ---------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.world.companion">
        <h2>Companion</h2>
        ${companionHtml}
      </div>

      <!-- MEDIA PANEL -------------------------------------------------------->
      ${mediaHtml}

    </div>
  `;
}
