// ============================================================================
// FILE: /PULSE-PAL/PulsePalSkills-v30.js
// PULSE OS — v30 IMMORTAL+++
// PULSE‑PAL SKILLS PAGE — PURE UI (NO DAEMON, NO BRIDGE, NO GHOST IMPORTS)
// ============================================================================
//
// ROLE:
//   Displays Pulse‑Pal’s abilities using ONLY:
//     • CorePresence snapshot
//     • CoreMemory persona snapshot
//     • Identity snapshot
//     • IQMap (passed in)
//     • Media (passed in)
//     • Router + Icons (passed in)
//
// CONTRACT:
//   • Pure UI organ
//   • No network
//   • No daemon
//   • No bridge
//   • No ghost imports
//   • No circular imports
// ============================================================================

import { PulsePalMemory } from "./PulsePalMemory-v30.js";
import { PulsePalPresenceCoreV30 as CorePresence } from "./PulsePalPresenceCore-v30.js";
import { PulsePalIdentity } from "./PulsePalIdentity-v30.js";

// REAL organs only
const CoreMemory = PulsePalMemory;

// Identity snapshot (real organ)
const getIdentity = () => {
  try { return PulsePalIdentity.getSnapshot() || {}; }
  catch { return {}; }
};

// ============================================================================
// IMPLEMENTATION — PURE UI PAGE
// ============================================================================

export function PulsePalSkills({ Router, Icons, IQMap, Media }) {

  // --------------------------------------------------------------------------
  // REAL SNAPSHOTS
  // --------------------------------------------------------------------------
  const presence = CorePresence.snapshot();
  const persona  = CoreMemory.persona() || {};
  const identity = getIdentity();

  // --------------------------------------------------------------------------
  // IQMap (skills + categories)
  // --------------------------------------------------------------------------
  const categories = IQMap.skillCategories || [
    { id: "core",   label: "Core Intelligence",   icon: "ai_brain" },
    { id: "world",  label: "Pulse‑World",         icon: "neon_ring" },
    { id: "tools",  label: "Tools & Utilities",   icon: "binary_matrix" },
    { id: "earn",   label: "Earn & Economy",      icon: "coin" },
    { id: "civ",    label: "Civilization Layer",  icon: "civ_world" },
    { id: "games",  label: "Games & Scenarios",   icon: "controller" }
  ];

  const skillsByCategory = IQMap.skillsByCategory || {};

  // --------------------------------------------------------------------------
  // PRESENCE + PERSONA CONTEXT
  // --------------------------------------------------------------------------
  const activeMode = presence.mode || presence.activeMode || "advisor";
  const activeBand = presence.band || "companion";
  const activity   = presence.activity || "active";

  const personaTraits = persona.traits || persona || {};
  const personaModes  = persona.modeInfluence || {};

  // --------------------------------------------------------------------------
  // MEDIA — AVATAR RESOLUTION
  // --------------------------------------------------------------------------
  const palImages = Media.resolveAll("PulsePal") || [];
  let avatar = palImages[0] || Icons.resolve("pulse");

  if (palImages.length) {
    const lowerMode = activeMode.toLowerCase();
    const match = palImages.find(src => src.toLowerCase().includes(lowerMode));
    if (match) avatar = match;
  }

  // --------------------------------------------------------------------------
  // MODE INFLUENCE (normalized)
  // --------------------------------------------------------------------------
  const modeEntries = Object.entries(personaModes)
    .filter(([, v]) => typeof v === "number" && v > 0);

  const totalInfluence = modeEntries.reduce((acc, [, v]) => acc + v, 0) || 1;

  const normalizedModeInfluence = modeEntries
    .map(([mode, value]) => [mode, value / totalInfluence])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  // --------------------------------------------------------------------------
  // RECOMMENDED SKILLS (simple scoring)
  // --------------------------------------------------------------------------
  function scoreSkill(skill) {
    let score = 0;

    if (skill.modeAffinity.includes(activeMode)) score += 3;
    if (skill.personaAffinity.includes("warm") && personaTraits.warmth === "high") score += 1;
    if (skill.personaAffinity.includes("focused") && personaTraits.focus === "high") score += 1;

    return score;
  }

  const allSkills = Object.values(skillsByCategory).flat() || [];

  const recommendedSkills = allSkills
    .map(s => ({ skill: s, score: scoreSkill(s) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(x => x.skill);

  // --------------------------------------------------------------------------
  // HTML HELPERS
  // --------------------------------------------------------------------------
  function renderRecommended() {
    if (!recommendedSkills.length) {
      return `<p style="opacity:0.7;">No recommendations yet — explore more skills.</p>`;
    }

    return `
      <ul class="evo-list">
        ${recommendedSkills.map(skill => `
          <li class="evo-list-item">
            <strong>${skill.label || skill.name}</strong><br/>
            <span style="opacity:0.75;">${skill.description || "No description."}</span>
          </li>
        `).join("")}
      </ul>
    `;
  }

  function renderModeInfluence() {
    if (!normalizedModeInfluence.length) {
      return `<p style="opacity:0.7;">No mode influence detected yet.</p>`;
    }

    return `
      <ul class="evo-list">
        ${normalizedModeInfluence.map(([mode, w]) => `
          <li class="evo-list-item">${mode}: ${(w * 100).toFixed(1)}%</li>
        `).join("")}
      </ul>
    `;
  }

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  return `
    <div id="pulsepal-skills" class="evo-wrapper">

      <!-- HEADER -->
      <div class="evo-surface evo-breathe">
        <div style="display:flex; align-items:center; gap:18px;">
          <img src="${Icons.resolve("binary_matrix")}" class="evo-icon" />
          <div>
            <h1 style="margin:0; font-size:1.6rem; color:#00eaff;">Pulse‑Pal Skills</h1>
            <p style="margin:0; opacity:0.75;">
              Explore what I can do — from core intelligence to world‑building.
            </p>
            <p style="margin:0; opacity:0.55; font-size:0.85rem;">
              Mode: <strong>${activeMode}</strong> • Band: ${activeBand} • Activity: ${activity}
            </p>
          </div>
        </div>
      </div>

      <!-- AVATAR -->
      <div class="evo-block">
        <h2>Ability Cortex Avatar</h2>
        <img src="${avatar}" class="pal-avatar-preview" />
      </div>

      <!-- MODE INFLUENCE -->
      <div class="evo-block">
        <h2>Mode Influence</h2>
        ${renderModeInfluence()}
      </div>

      <!-- RECOMMENDED -->
      <div class="evo-block">
        <h2>Recommended For Now</h2>
        ${renderRecommended()}
      </div>

      <!-- CATEGORIES -->
      <div class="evo-block">
        <h2>Skill Categories</h2>
        <div style="display:flex; flex-direction:column; gap:18px;">
          ${categories.map(cat => `
            <div class="evo-surface evo-route-enter"
                 style="display:flex; align-items:center; gap:16px; cursor:pointer;"
                 onclick="Router.go('pulsepal.skills.${cat.id}')">

              <img src="${Icons.resolve(cat.icon)}" class="evo-icon" />

              <div style="flex:1;">
                <div style="font-size:1.2rem; color:#00eaff;">${cat.label}</div>
                <div style="opacity:0.75; font-size:0.9rem;">
                  ${(skillsByCategory[cat.id].length || 0)} skills available
                </div>
              </div>

              <img src="${Icons.resolve("arrow_right")}" class="evo-icon" />
            </div>
          `).join("")}
        </div>
      </div>

    </div>
  `;
}
