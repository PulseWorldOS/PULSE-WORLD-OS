// ============================================================================
// FILE: /PULSE-PAL/PulsePalTasks-v30.js
// PULSE OS — v30 IMMORTAL+++
// PULSE‑PAL TASK CORTEX — HYBRID PRODUCTIVITY + CIVILIZATION + WORLD‑OS
// ============================================================================
//
// ROLE:
//   Hybrid task membrane for:
//     • Real‑world productivity tasks
//     • Civilization / world‑building tasks
//
// CONTRACT:
//   • Pure UI Organ (no network)
//   • Deterministic render
//   • Evolvable via TaskCore / Memory Engine / Mode Engine / CivLayer
//   • Zero side effects
// ============================================================================

import { PulsePalMemory } from "./PulsePalMemory-v30.js";

import { PulsePalTasksCoreAPI as CoreTasks } from "./PulsePalTasksCore-v30.js";
import { PulsePalIdentity } from "./PulsePalIdentity-v30.js";
import { PulsePalSettings } from "./PulsePalSettings-v30.js";
import { PulsePalWorld } from "./PulsePalWorld-v30.js";
import { PulsePalPresence } from "./PulsePalPresence-v30.js";
import { PulsePalMedia } from "./PulsePalMedia-v30.js";
import { PulsePalCivLayer } from "./PulsePalCivLayer-v30.js";

const CoreMemory   = PulsePalMemory;
const CorePresence = PulsePalPresence;
const CoreSettings = PulsePalSettings;
const CoreWorld    = PulsePalWorld;
const CoreCivLayer = PulsePalCivLayer;
const MediaBridge  = PulsePalMedia;

// ============================================================================
// IMPLEMENTATION — v30 IMMORTAL+++
// ============================================================================
export function PulsePalTasks({ Router, Icons, Media }) {

  // --------------------------------------------------------------------------
  // CORE SNAPSHOTS (REAL ORGANS ONLY)
  // --------------------------------------------------------------------------
  const tasks       = CoreTasks.list()    || [];
  const worldTasks  = CoreTasks.world()   || [];
  const civTasks    = CoreTasks.civ()     || [];
  const history     = CoreTasks.history() || [];

  const presence    = CorePresence.snapshot() || {};
  const persona     = CoreMemory.persona()  || {};
  const settings    = CoreSettings.snapshot() || {};
  const worldState  = CoreWorld.snapshot()    || {};
  const civProfile  = CoreCivLayer.profile()  || {};

  // continuity now derived from persona/world only (daemon removed)
  const continuityScore =
    persona.continuityScore ??
    worldState.continuityScore ??
    0;

  const activeMode =
    presence.mode ||
    persona.tone.activeMode ||
    "advisor";

  const activeForm =
    presence.form ||
    persona.form ||
    "fox";

  const civTier =
    civProfile.tier ||
    "settler";

  const activeWorld =
    worldState.activeWorld ||
    "none";

  // REAL suggestions from TaskCore (daemon removed)
  const suggestions =
    CoreTasks.suggestions({
      mode: activeMode,
      civTier,
      world: activeWorld
    }) || [];

  // --------------------------------------------------------------------------
  // MEDIA — MODE + FORM AWARE AVATAR
  // --------------------------------------------------------------------------
  const palImages =
    Media.resolveAll("PulsePal") ||
    MediaBridge.resolveAll("PulsePal") ||
    [];

  let avatar = palImages[0] || Icons.resolve("pulse");

  if (palImages.length) {
    const lowerMode = activeMode.toLowerCase();
    const lowerForm = activeForm.toLowerCase();
    const match =
      palImages.find(src => src.toLowerCase().includes(lowerMode)) ||
      palImages.find(src => src.toLowerCase().includes(lowerForm));
    if (match) avatar = match;
  }

  // --------------------------------------------------------------------------
  // FLOW METER — v30 (presence + persona + continuity + civ tier)
  // --------------------------------------------------------------------------
  const flowScore =
    (presence.focus === "high" ? 30 : 10) +
    (presence.energy === "high" ? 30 : 10) +
    (persona.warmth > 0.8 ? 10 : 5) +
    (persona.focus > 0.8 ? 10 : 5) +
    (continuityScore > 40 ? 10 : 0) +
    (civTier === "architect" ? 10 : 0);

  const flowBand =
    flowScore > 80 ? "Prime Flow"
    : flowScore > 60 ? "Strong Flow"
    : flowScore > 40 ? "Steady Flow"
    : "Low Flow";

  // --------------------------------------------------------------------------
  // TASK CATEGORIES — v30 hybrid
  // --------------------------------------------------------------------------
  const categories = [
    { id: "real",  label: "Real‑World Tasks",     icon: "check" },
    { id: "world", label: "World Tasks",          icon: "neon_ring" },
    { id: "civ",   label: "Civilization Tasks",   icon: "civ_world" }
  ];

  // --------------------------------------------------------------------------
  // TASK RECOMMENDATION ENGINE — v30
  // --------------------------------------------------------------------------
  function scoreTask(t) {
    let score = 0;

    // Mode affinity
    if (t.mode && t.mode.includes(activeMode)) score += 3;

    // Persona affinity
    if (t.persona && t.persona.includes("warm") && persona.warmth > 0.7) score += 1;
    if (t.persona && t.persona.includes("focused") && persona.focus > 0.7) score += 1;

    // Presence energy
    if (presence.energy === "high" && t.energy === "high") score += 2;

    // Civ tier
    if (t.civTier && t.civTier === civTier) score += 2;

    // World match
    if (t.world && t.world === activeWorld) score += 2;

    // Continuity
    if (continuityScore > 40) score += 1;

    return score;
  }

  const allTasks = [
    ...tasks.map(t => ({ ...t, type: "real" })),
    ...worldTasks.map(t => ({ ...t, type: "world" })),
    ...civTasks.map(t => ({ ...t, type: "civ" }))
  ];

  const recommended = allTasks
    .map(t => ({ task: t, score: scoreTask(t) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(x => x.task);

  // --------------------------------------------------------------------------
  // HTML HELPERS
  // --------------------------------------------------------------------------
  function renderTaskList(label, list) {
    if (!list || list.length === 0) {
      return `<li class="evo-list-item" style="opacity:0.7;">No ${label} tasks.</li>`;
    }
    return list
      .map(t => `
        <li class="evo-list-item">
          <img src="${Icons.resolve("check")}" class="evo-icon" />
          <strong>${t.label || t.name || "Task"}</strong>
          <div style="opacity:0.75; font-size:0.85rem;">
            ${t.description || ""}
          </div>
        </li>
      `)
      .join("");
  }

  function renderRecommended() {
    if (!recommended.length) {
      return `<p style="opacity:0.7;">As we build more tasks, I’ll highlight the ones that fit your mode, world, and civ tier.</p>`;
    }
    return `
      <ul class="evo-list">
        ${recommended
          .map(t => `
            <li class="evo-list-item">
              <img src="${Icons.resolve("lightning")}" class="evo-icon" />
              <strong>${t.label || t.name}</strong>
              <div style="opacity:0.75; font-size:0.85rem;">
                ${t.description || ""}
              </div>
            </li>
          `)
          .join("")}
      </ul>
    `;
  }

  // --------------------------------------------------------------------------
  // RENDER — v30 IMMORTAL+++
// --------------------------------------------------------------------------
  return `
    <div id="pulsepal-tasks" class="evo-wrapper">

      <!-- HEADER -->
      <div class="evo-surface evo-breathe">
        <div style="display:flex; gap:18px; align-items:center;">
          <img src="${avatar}" class="pal-avatar-preview" />
          <div>
            <h1 style="margin:0;">Pulse‑Pal Tasks</h1>
            <p style="margin:0; opacity:0.75;">Hybrid Task Cortex — Real + World + Civilization</p>
            <p style="margin:0; opacity:0.55; font-size:0.85rem;">
              Mode: <strong>${activeMode}</strong> · Form: ${activeForm} · Civ Tier: ${civTier} · Continuity: ${continuityScore}
            </p>
          </div>
        </div>
      </div>

      <!-- FLOW METER -->
      <div class="evo-block">
        <h2>Flow Meter</h2>
        <p style="opacity:0.75;">${flowBand} (${flowScore})</p>
        <div style="height:8px; background:#0ff2; border-radius:4px; margin-top:6px;">
          <div style="height:8px; width:${flowScore}%; background:#0ff; border-radius:4px;"></div>
        </div>
      </div>

      <!-- RECOMMENDED -->
      <div class="evo-block">
        <h2>Recommended For Now</h2>
        ${renderRecommended()}
      </div>

      <!-- TASK CATEGORIES -->
      <div class="evo-block">
        <h2>Task Categories</h2>
        <div style="display:flex; flex-direction:column; gap:18px;">
          ${categories.map(cat => `
            <div class="evo-surface evo-route-enter"
                 style="display:flex; align-items:center; gap:16px; cursor:pointer;"
                 onclick="Router.go('pulsepal.tasks.${cat.id}')">

              <img src="${Icons.resolve(cat.icon)}" class="evo-icon" />

              <div style="flex:1;">
                <div style="font-size:1.2rem; color:#00eaff;">${cat.label}</div>
                <div style="opacity:0.75; font-size:0.9rem;">
                  ${
                    cat.id === "real"
                      ? tasks.length
                      : cat.id === "world"
                      ? worldTasks.length
                      : civTasks.length
                  } tasks available
                </div>
              </div>

              <img src="${Icons.resolve("arrow_right")}" class="evo-icon" />
            </div>
          `).join("")}
        </div>
      </div>

      <!-- REAL TASKS -->
      <div class="evo-block">
        <h2>Real‑World Tasks</h2>
        <ul class="evo-list">
          ${renderTaskList("real", tasks)}
        </ul>
        <button class="evo-button" onclick="CoreTasks.add({ label:'New Task', type:'real' })">
          <img src="${Icons.resolve("plus")}" class="evo-icon" />
          Add Task
        </button>
      </div>

      <!-- WORLD TASKS -->
      <div class="evo-block">
        <h2>World Tasks</h2>
        <p style="opacity:0.75;">Tasks tied to your active world: <strong>${activeWorld}</strong></p>
        <ul class="evo-list">
          ${renderTaskList("world", worldTasks)}
        </ul>
      </div>

      <!-- CIVILIZATION TASKS -->
      <div class="evo-block">
        <h2>Civilization Tasks</h2>
        <p style="opacity:0.75;">Tier: <strong>${civTier}</strong></p>
        <ul class="evo-list">
          ${renderTaskList("civilization", civTasks)}
        </ul>
      </div>

      <!-- SUGGESTIONS -->
      ${
        suggestions.length
          ? `
      <div class="evo-block">
        <h2>Suggested Tasks</h2>
        <ul class="evo-list">
          ${suggestions.map(s => `
            <li class="evo-list-item">
              <img src="${Icons.resolve("lightning")}" class="evo-icon" />
              ${s}
            </li>
          `).join("")}
        </ul>
      </div>
      `
          : ""
      }

      <!-- HISTORY -->
      ${
        history.length
          ? `
      <div class="evo-block">
        <h2>Task History</h2>
        <ul class="evo-list">
          ${history.slice(-12).map(h => `
            <li class="evo-list-item">
              <img src="${Icons.resolve("history")}" class="evo-icon" />
              ${h}
            </li>
          `).join("")}
        </ul>
      </div>
      `
          : ""
      }

      <!-- MEDIA -->
      ${
        palImages.length
          ? `
      <div class="evo-block">
        <h2>Pulse‑Pal Media</h2>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          ${palImages.map(src => `<img src="${src}" class="pal-task-thumb" />`).join("")}
        </div>
      </div>
      `
          : ""
      }

    </div>
  `;
}
