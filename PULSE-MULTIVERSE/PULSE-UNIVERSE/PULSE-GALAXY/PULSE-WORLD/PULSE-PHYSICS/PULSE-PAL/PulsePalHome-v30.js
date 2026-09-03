// ============================================================================
// FILE: /PULSE-PAL/PulsePalHome-v30.js
// PULSE OS — v30 IMMORTAL+++
// PULSE‑PAL HOME PAGE — REAL PRESENCE + MEDIA + SYSTEM + WORLDS
// ============================================================================

import { PulsePalMemory } from "./PulsePalMemory-v30.js";
import { PulsePalSpeech } from "./PulsePalSpeech-v30.js";
import { PulseCoreMemoryManager } from "../PULSE-COREMEMORY/PulseCoreMemoryManager-v30.js";
import { PulsePalSystem } from "./PulsePalSystem-v30.js";
import { PulsePalSettings } from "./PulsePalSettings-v30.js";
import { PulsePalMemoryEngine } from "./PulsePalMemoryEngine-v30.js";

import { PulsePalPresence } from "./PulsePalPresence-v30.js";

// REAL organs only
const CoreMemory   = PulsePalMemory;
const CoreSpeech   = PulsePalSpeech;
const CoreSettings = PulsePalSettings;
const CoreSystem   = PulsePalSystem;
const CorePresence = PulsePalPresence;

// Optional MemoryManager instance
const MemoryManager = PulseCoreMemoryManager.instance || null;

// ============================================================================
// IMPLEMENTATION — v30 IMMORTAL+++
// ============================================================================
export function PulsePalHome({ Router, Icons, Media }) {

  // --------------------------------------------------------------------------
  // CORE SNAPSHOTS (REAL ORGANS ONLY)
  // --------------------------------------------------------------------------
  const presence = CorePresence.snapshot() || {};
  const system   = CoreSystem.vitals()     || {};
  const persona  = CoreMemory.persona()    || {};
  const toneMeta = CoreMemory.tone()       || {};
  const settings = CoreSettings.snapshot() || {};

  // --------------------------------------------------------------------------
  // AVATAR RESOLUTION
  // --------------------------------------------------------------------------
  const palImages = Media.resolveAll("PulsePal") || [];
  let avatar = palImages[0] || Icons.resolve("pulse");

  if (settings.avatarMode === "human") {
    avatar = palImages.find(i => i.toLowerCase().includes("human")) || avatar;
  } else if (settings.avatarMode === "fox") {
    avatar = palImages.find(i => i.toLowerCase().includes("fox")) || avatar;
  }

  // --------------------------------------------------------------------------
  // VERSION / LINEAGE (from settings)
  // --------------------------------------------------------------------------
  const version = settings.version || "v30 IMMORTAL+++";
  const lineage = settings.lineage || "Pulse‑OS Evolutionary";

  // --------------------------------------------------------------------------
  // PRESENCE MODEL (REAL PRESENCE ORGAN)
  // --------------------------------------------------------------------------
  const tone     = presence.tone     || toneMeta.label   || "Warm";
  const band     = presence.band     || toneMeta.band    || "Companion";
  const activity = presence.activity || "Active";
  const energy   = presence.energy   || toneMeta.energy  || "Balanced";
  const focus    = presence.focus    || toneMeta.focus   || "General";

  // --------------------------------------------------------------------------
  // PERSONA PREVIEW
  // --------------------------------------------------------------------------
  const personaTraits = persona.traits || persona || {};
  const personaKeys   = Object.keys(personaTraits);

  const personaHtml = personaKeys.length
    ? personaKeys.slice(0, 6).map(k => `
        <li class="evo-list-item">
          <strong>${k}</strong>: ${String(personaTraits[k])}
        </li>
      `).join("")
    : `
      <li class="evo-list-item" style="opacity:0.7;">
        Persona model not computed yet.
      </li>
    `;

  // --------------------------------------------------------------------------
  // WORLD SEEDS (IMAGINATION‑ONLY)
  // --------------------------------------------------------------------------
  const worldSeeds = [
    {
      id: "belize-archipelago",
      label: "Belize Archipelago Network",
      desc: "Local delivery, mesh routes, and identity‑aware markets.",
      icon: Icons.resolve("router_node")
    },
    {
      id: "city-civilization",
      label: "City‑Scale Civilization Sim",
      desc: "Districts, factions, and resource flows as a living city.",
      icon: Icons.resolve("binary_matrix")
    },
    {
      id: "starport",
      label: "Starport Operations Layer",
      desc: "Vendors, riders, and users as terminals in a logistics graph.",
      icon: Icons.resolve("ai_brain")
    }
  ];

  const worldsHtml = worldSeeds.map(seed => `
    <li class="evo-list-item" data-world-id="${seed.id}">
      <img src="${seed.icon}" class="evo-icon" />
      <div>
        <div style="font-weight:600;">${seed.label}</div>
        <div style="opacity:0.75; font-size:0.85rem;">${seed.desc}</div>
      </div>
    </li>
  `).join("");

  // --------------------------------------------------------------------------
  // SYSTEM STATUS PANEL (REAL SYSTEM VITALS)
  // --------------------------------------------------------------------------
  const bandStatus   = system.pulseband || "Adaptive";
  const netStatus    = system.network   || "Healthy";
  const gpuStatus    = system.gpu       || "Warm";
  const memoryStatus = system.memory    || "Balanced";

  // --------------------------------------------------------------------------
  // AURA COLOR (DERIVED FROM TONE)
  // --------------------------------------------------------------------------
  const auraColor =
    tone === "Warm"      ? "rgba(255,120,180,0.55)" :
    tone === "Focused"   ? "rgba(0,255,180,0.55)"  :
    tone === "Calm"      ? "rgba(120,200,255,0.45)":
                            "rgba(160,180,200,0.45)";

  // ========================================================================
  // RENDER
  // ========================================================================
  return `
    <div id="pulsepal-home" class="evo-wrapper">

      <style>
        #pulsepal-home .pal-avatar-frame {
          position:relative;
          width:72px;
          height:72px;
          border-radius:999px;
          overflow:hidden;
          background:#050816;
          box-shadow:
            0 14px 30px rgba(0,0,0,0.7),
            0 0 0 1px rgba(0,234,255,0.25);
        }
        #pulsepal-home .pal-avatar-aura {
          position:absolute;
          inset:-10px;
          background:${auraColor};
          filter:blur(18px);
          opacity:0.7;
          z-index:-1;
        }
        #pulsepal-home .pal-avatar-img {
          width:100%;
          height:100%;
          object-fit:cover;
        }
      </style>

      <!-- HEADER / IDENTITY -------------------------------------------------->
      <div class="evo-surface evo-breathe">
        <div style="display:flex; align-items:center; gap:18px;">
          <div class="pal-avatar-frame">
            <div class="pal-avatar-aura"></div>
            <img src="${avatar}" class="pal-avatar-img" />
          </div>
          <div>
            <h1 style="margin:0; font-size:1.8rem; color:#00eaff;">Pulse‑Pal</h1>
            <p style="margin:0; opacity:0.8;">${tone} • ${band} • ${activity}</p>
            <p style="margin:0; opacity:0.65; font-size:0.8rem;">
              Energy: ${energy} • Focus: ${focus} • ${version}
            </p>
          </div>
        </div>
      </div>

      <!-- QUICK ACTIONS ------------------------------------------------------>
      <div class="evo-block">
        <h2>Quick Actions</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="Router.go('pulsepal.chat')">
            <img src="${Icons.resolve("ai_brain")}" class="evo-icon" /> Chat
          </button>
          <button class="evo-button" onclick="Router.go('pulsepal.skills')">
            <img src="${Icons.resolve("binary_matrix")}" class="evo-icon" /> Skills
          </button>
          <button class="evo-button" onclick="Router.go('pulsepal.tasks')">
            <img src="${Icons.resolve("check")}" class="evo-icon" /> Tasks
          </button>
          <button class="evo-button" onclick="Router.go('pulsepal.system')">
            <img src="${Icons.resolve("diagnostics_pulse")}" class="evo-icon" /> System
          </button>
          <button class="evo-button" onclick="Router.go('pulsepal.settings')">
            <img src="${Icons.resolve("settings")}" class="evo-icon" /> Settings
          </button>
          <button class="evo-button" onclick="Router.go('pulsepal.history')">
            <img src="${Icons.resolve("timeline")}" class="evo-icon" /> History
          </button>
          <button class="evo-button" onclick="Router.go('pulsepal.worlds')">
            <img src="${Icons.resolve("router_node")}" class="evo-icon" /> Worlds
          </button>
        </div>
      </div>

      <!-- PRESENCE ----------------------------------------------------------->
      <div class="evo-block evo-breathe">
        <h2>Presence</h2>
        <div style="display:flex; align-items:center; gap:24px;">
          <div class="pal-avatar-frame" style="width:64px;height:64px;">
            <div class="pal-avatar-aura"></div>
            <img src="${avatar}" class="pal-avatar-img" />
          </div>
          <p style="flex:1; opacity:0.85;">
            ${activity} • ${tone}<br/>
            I’m here and ready — chat, explore skills, manage tasks,
            check system state, or step into a world‑scale scenario.
          </p>
        </div>
      </div>

      <!-- SYSTEM STATUS ------------------------------------------------------>
      <div class="evo-block">
        <h2>System Status</h2>
        <ul class="evo-list">
          <li class="evo-list-item">
            <img src="${Icons.resolve("stable")}" class="evo-icon" />
            Core Systems: ${system.core || "Stable"}
          </li>
          <li class="evo-list-item">
            <img src="${Icons.resolve("presence")}" class="evo-icon" />
            Presence Engine: ${system.presence || "Active"}
          </li>
          <li class="evo-list-item">
            <img src="${Icons.resolve("router_node")}" class="evo-icon" />
            Router Cortex: ${system.router || "Connected"}
          </li>
          <li class="evo-list-item">
            <img src="${Icons.resolve("ai_brain")}" class="evo-icon" />
            Pal Intelligence: ${system.anim || "Online"}
          </li>
          <li class="evo-list-item">
            <img src="${Icons.resolve("PulseBand")}" class="evo-icon" />
            PulseBand: ${bandStatus}
          </li>
          <li class="evo-list-item">
            <img src="${Icons.resolve("network")}" class="evo-icon" />
            Network Health: ${netStatus}
          </li>
          <li class="evo-list-item">
            <img src="${Icons.resolve("gpu")}" class="evo-icon" />
            GPU Tempo: ${gpuStatus}
          </li>
          <li class="evo-list-item">
            <img src="${Icons.resolve("memory")}" class="evo-icon" />
            Memory Load: ${memoryStatus}
          </li>
        </ul>
      </div>

      <!-- PERSONA PREVIEW ---------------------------------------------------->
      <div class="evo-block">
        <h2>Persona Preview</h2>
        <p style="opacity:0.75;">Read‑only view of how the companion engine models our bond and style.</p>
        <ul class="evo-list">${personaHtml}</ul>
      </div>

      <!-- WORLD SEEDS -------------------------------------------------------->
      <div class="evo-block">
        <h2>World Seeds & Civilization Modes</h2>
        <p style="opacity:0.75;">
          Imagination‑only presets — no network calls, just shared language for planning.
        </p>
        <ul class="evo-list">${worldsHtml}</ul>
      </div>

    </div>
  `;
}
