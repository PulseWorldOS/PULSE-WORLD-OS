// ============================================================================
// FILE: /PULSE-PAL/PulsePalMemory-v30.js
// PULSE OS — v30 COSMIC++
// PULSE‑PAL MEMORY PAGE — BRIDGE‑FREE, DAEMON‑FREE, PRESENCE‑AWARE
// ============================================================================

import { PulseCoreGMemory} from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";
import { PulsePalSpeech } from "./PulsePalSpeech-v30.js";
import { PulsePalPresence } from "./PulsePalPresence-v30.js";
import { PulsePalSettings } from "./PulsePalSettings-v30.js";
import { PulsePalMemoryEngine } from "./PulsePalMemoryEngine-v30.js";
import { PulseCoreMemoryManager } from "../PULSE-COREMEMORY/PulseCoreMemoryManager-v40.js";




// REAL organs only
const CoreMemory        = new Proxy({}, { get: (t, p) => { try { return PulseCoreGMemory[p]; } catch(e) { return (PulseRealm?.PulseCoreMemory || {})[p]; } } });
const CoreSpeech        = PulsePalSpeech;
const CoreSettings      = PulsePalSettings;
const CorePresence      = PulsePalPresence;
const CoreMemoryEngine  = PulsePalMemoryEngine;

// Optional MemoryManager instance (or factory)
const MemoryManager = PulseCoreMemoryManager.instance || PulseCoreMemoryManager || null;

// ============================================================================
// IMPLEMENTATION — v30 COSMIC++
// ============================================================================
export function PulsePalMemory({ Router, Icons, Media }) {

  // --------------------------------------------------------------------------
  // CORE SNAPSHOTS (REAL ORGANS ONLY)
  // --------------------------------------------------------------------------
  const items        = CoreMemory.items()        || [];
  const timeline     = CoreMemory.timeline()     || [];
  const persona      = CoreMemory.persona()      || {};
  const tone         = CoreMemory.tone()         || {};
  const continuity   = CoreMemory.continuity()   || {};
  const speechStats  = CoreSpeech.stats()        || {};
  const settings     = CoreSettings.snapshot()   || {};
  const presence     = CorePresence.snapshot()   || {};
  const engineSnap   = CoreMemoryEngine.snapshot() || {};
  const managerSnap  = MemoryManager.snapshot()  || null;

  // --------------------------------------------------------------------------
  // VERSION / LINEAGE (from settings or defaults)
  // --------------------------------------------------------------------------
  const version = settings.version || "v30 COSMIC++";
  const lineage = settings.lineage || "Pulse‑OS Evolutionary";

  // --------------------------------------------------------------------------
  // CONTINUITY + MODES + BANDS (DERIVED + PRESENCE‑AWARE)
  // --------------------------------------------------------------------------
  const continuityScore =
    presence.continuityScore ??
    continuity.continuityScore ??
    continuity.score ??
    0;

  const activeMode =
    presence.activityMode ||
    presence.activity ||
    persona.tone.activeMode ||
    persona.activeMode ||
    tone.activeMode ||
    "advisor";

  const recallBand =
    presence.band ||
    tone.recallBand ||
    persona.recallBand ||
    "Companion";

  const recallTone =
    presence.toneLabel ||
    presence.tone ||
    tone.label ||
    tone.lastUserTone ||
    "How I remember and recall.";

  const modeInfluence =
    persona.modeInfluence ||
    persona.persona.modeInfluence ||
    {};

  const modeList = Object.entries(modeInfluence)
    .filter(([_, v]) => typeof v === "number")
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  // --------------------------------------------------------------------------
  // WORLD / CIVILIZATION HOOKS (DERIVED ONLY)
  // --------------------------------------------------------------------------
  const worldModel = persona.worlds || {};
  const worldEntries = Object.entries(worldModel)
    .filter(([_, v]) => v && typeof v === "object")
    .sort((a, b) => (b[1].weight || 0) - (a[1].weight || 0))
    .slice(0, 8);

  // --------------------------------------------------------------------------
  // MEDIA + AVATAR (MODE / WORLD AWARE)
  // --------------------------------------------------------------------------
  const palImages = Media.resolveAll("PulsePal") || [];
  let avatar      = palImages[0] || Icons.resolve("pulse");

  // Mode‑aware avatar
  if (palImages.length && activeMode) {
    const lower = String(activeMode).toLowerCase();
    const match = palImages.find(src => String(src).toLowerCase().includes(lower));
    if (match) avatar = match;
  }

  // World‑aware avatar
  if (palImages.length && worldEntries.length) {
    const topWorld = worldEntries[0][0];
    const lowerWorld = String(topWorld).toLowerCase();
    const worldMatch = palImages.find(src =>
      String(src).toLowerCase().includes(lowerWorld)
    );
    if (worldMatch) avatar = worldMatch;
  }

  // --------------------------------------------------------------------------
  // MEMORY TIERS (DERIVED ONLY)
  // --------------------------------------------------------------------------
  function classifyTier(item) {
    const tier = item.tier || item.level || item.band;
    if (!tier) return "balanced";
    const lower = String(tier).toLowerCase();
    if (lower.includes("light")) return "light";
    if (lower.includes("deep"))  return "deep";
    if (lower.includes("core"))  return "core";
    return "balanced";
  }

  const tierBuckets = { light: [], balanced: [], deep: [], core: [] };

  items.forEach(i => {
    const t = classifyTier(i);
    tierBuckets[t].push(i);
  });

  const recentTimeline = timeline.slice(-40).reverse();

  // --------------------------------------------------------------------------
  // HTML HELPERS
  // --------------------------------------------------------------------------
  function renderModeInfluence() {
    if (!modeList.length) {
      return `<p style="opacity:0.7;">No mode influence detected yet.</p>`;
    }
    return `
      <ul class="evo-list">
        ${modeList
          .map(([mode, w]) =>
            `<li class="evo-list-item"><strong>${mode}</strong>: ${(w * 100).toFixed(1)}%</li>`
          )
          .join("")}
      </ul>
    `;
  }

  function renderTierBucket(label, key) {
    const bucket = tierBuckets[key] || [];
    if (!bucket.length) {
      return `
        <div class="evo-block">
          <h3>${label}</h3>
          <p style="opacity:0.7;">No ${label.toLowerCase()} memories yet.</p>
        </div>
      `;
    }
    return `
      <div class="evo-block">
        <h3>${label}</h3>
        <ul class="evo-list">
          ${bucket
            .slice(0, 20)
            .map(i => {
              const label = i.label || i.title || i.key || i.id || "Memory";
              const summary =
                i.summary ||
                i.text ||
                i.value ||
                (i.payload && JSON.stringify(i.payload).slice(0, 120) + "…") ||
                "";
              return `
                <li class="evo-list-item">
                  <strong>${label}</strong>
                  ${summary ? `<br/><span style="opacity:0.8;">${summary}</span>` : ""}
                </li>
              `;
            })
            .join("")}
        </ul>
      </div>
    `;
  }

  function renderWorlds() {
    if (!worldEntries.length) {
      return `<p style="opacity:0.75;">No worlds detected yet.</p>`;
    }
    return `
      <ul class="evo-list">
        ${worldEntries
          .map(([name, data]) => {
            const weight = data.weight || data.score || 0;
            const kind   = data.kind || "world";
            const era    = data.era || data.age || "current";
            return `
              <li class="evo-list-item">
                <strong>${name}</strong>
                <span style="opacity:0.75; font-size:0.85rem;">
                  (${kind}, era: ${era}, weight ${(weight * 100).toFixed(1)}%)
                </span>
              </li>
            `;
          })
          .join("")}
      </ul>
    `;
  }

  function renderTimeline() {
    if (!recentTimeline.length) {
      return `<li class="evo-list-item">Timeline empty.</li>`;
    }
    return recentTimeline
      .map(evt => {
        const ts = evt.timestamp ? new Date(evt.timestamp).toLocaleString() : "";
        const label = evt.type || "event";
        const text  = evt.text || evt.value || "";
        const world = evt.world || evt.realm || evt.project || "";
        return `
          <li class="evo-list-item">
            <strong>[${label}]</strong>
            ${ts ? ` — <span style="opacity:0.7;">${ts}</span>` : ""}
            ${world ? ` — <span style="opacity:0.7;">${world}</span>` : ""}
            <br/>${text}
          </li>
        `;
      })
      .join("");
  }

  function renderSpeechStats() {
    const keys = Object.keys(speechStats || {});
    if (!keys.length) {
      return `<li class="evo-list-item">No conversation stats available yet.</li>`;
    }
    return keys
      .map(k => `<li class="evo-list-item"><strong>${k}</strong>: ${String(speechStats[k])}</li>`)
      .join("");
  }

  function renderPresenceSnapshot() {
    if (!presence || !Object.keys(presence).length) {
      return `<p style="opacity:0.7;">Presence model not computed yet.</p>`;
    }
    return `
      <pre class="evo-surface" style="padding:12px; max-height:260px; overflow:auto;">
${JSON.stringify(presence, null, 2)}
      </pre>
    `;
  }

  function renderMemoryEnginePanel() {
    if (!CoreMemoryEngine) {
      return `<p style="opacity:0.7;">Memory engine not attached.</p>`;
    }
    return `
      <div class="evo-block">
        <h2>Memory Engine</h2>
        <p style="opacity:0.75;">
          Semantic clustering, tiers, and graph updates run here. Controls are deterministic and local.
        </p>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          <button class="evo-button"
                  onclick="PulseRealm.PulsePalMemoryEngine.runLightScan()">
            Light Scan
          </button>
          <button class="evo-button"
                  onclick="PulseRealm.PulsePalMemoryEngine.runDeepScan()">
            Deep Scan
          </button>
          <button class="evo-button"
                  onclick="PulseRealm.PulsePalMemoryEngine.recluster()">
            Recluster
          </button>
        </div>
        <pre class="evo-surface" style="padding:12px; margin-top:8px; max-height:220px; overflow:auto;">
${JSON.stringify(engineSnap || {}, null, 2)}
        </pre>
      </div>
    `;
  }

  function renderMemoryManagerPanel() {
    if (!MemoryManager || !managerSnap) {
      return `
        <div class="evo-block">
          <h2>Memory Manager</h2>
          <p style="opacity:0.7;">
            Memory Manager not active or snapshot unavailable. CoreMemory still operates normally.
          </p>
        </div>
      `;
    }
    return `
      <div class="evo-block">
        <h2>Memory Manager</h2>
        <p style="opacity:0.75;">
          Controls Pulse‑Band vs Memory‑Mode, hydration, healing, and pressure‑aware flushing.
        </p>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          <button class="evo-button"
                  onclick="PulseRealm.PulseCoreMemoryManager.flush()">
            Flush
          </button>
          <button class="evo-button"
                  onclick="PulseRealm.PulseCoreMemoryManager.hydrate()">
            Hydrate
          </button>
          <button class="evo-button"
                  onclick="PulseRealm.PulseCoreMemoryManager.heal()">
            Heal
          </button>
          <button class="evo-button"
                  onclick="PulseRealm.PulseCoreMemoryManager.switchMode('pulseband')">
            Pulse‑Band Mode
          </button>
          <button class="evo-button"
                  onclick="PulseRealm.PulseCoreMemoryManager.switchMode('memorymode')">
            Memory Mode
          </button>
        </div>
        <pre class="evo-surface" style="padding:12px; margin-top:8px; max-height:220px; overflow:auto;">
${JSON.stringify(managerSnap, null, 2)}
        </pre>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  return `
    <div id="pulsepal-memory" class="evo-wrapper">

      <div class="evo-surface evo-breathe">
        <div style="display:flex; gap:18px; align-items:center;">
          <img src="${Icons.resolve("memory")}" class="evo-icon" />
          <div>
            <h1>Pulse‑Pal Memory Cortex</h1>
            <p style="opacity:0.75;">${recallTone}</p>
            <p style="opacity:0.55; font-size:0.85rem;">
              Mode: <strong>${activeMode}</strong> · Recall Band: ${recallBand} · Continuity: ${continuityScore}<br/>
              Version: ${version} • Lineage: ${lineage}
            </p>
          </div>
        </div>
      </div>

      <div class="evo-block">
        <h2>Memory Avatar</h2>
        <div style="display:flex; gap:24px; align-items:center; flex-wrap:wrap;">
          <img src="${avatar}" class="pal-avatar-preview" />
          <div style="flex:1; min-width:220px;">
            <p style="opacity:0.8;">
              Avatar follows active mode, worlds, and Pulse‑Pal images.
            </p>
          </div>
        </div>
      </div>

      <div class="evo-block">
        <h2>Presence Snapshot</h2>
        ${renderPresenceSnapshot()}
      </div>

      <div class="evo-block">
        <h2>Mode Influence</h2>
        ${renderModeInfluence()}
      </div>

      <div class="evo-block">
        <h2>Worlds & Civilizations</h2>
        ${renderWorlds()}
      </div>

      <div class="evo-block">
        <h2>Memory Tier</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CoreMemory.setTier && CoreMemory.setTier('light')">Light</button>
          <button class="evo-button" onclick="CoreMemory.setTier && CoreMemory.setTier('balanced')">Balanced</button>
          <button class="evo-button" onclick="CoreMemory.setTier && CoreMemory.setTier('deep')">Deep</button>
          <button class="evo-button" onclick="CoreMemory.setTier && CoreMemory.setTier('core')">Core</button>
        </div>
      </div>

      <div class="evo-grid">
        ${renderTierBucket("Light Memories", "light")}
        ${renderTierBucket("Balanced Memories", "balanced")}
        ${renderTierBucket("Deep Memories", "deep")}
        ${renderTierBucket("Core Memories", "core")}
      </div>

      <div class="evo-block">
        <h2>Timeline (Recent)</h2>
        <ul class="evo-list">${renderTimeline()}</ul>
      </div>

      <div class="evo-block">
        <h2>Persona Snapshot</h2>
        <pre class="evo-surface" style="padding:12px; max-height:320px; overflow:auto;">
${JSON.stringify(persona, null, 2)}
        </pre>
      </div>

      <div class="evo-block">
        <h2>Conversation Activity</h2>
        <ul class="evo-list">${renderSpeechStats()}</ul>
      </div>

      ${renderMemoryEnginePanel()}
      ${renderMemoryManagerPanel()}

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
