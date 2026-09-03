// ============================================================================
// FILE: /PULSE-PAL/PulsePalHistoryScanner-v30+.js
// PULSE OS — v30 IMMORTAL++
// PULSE‑PAL HISTORY SCANNER — REAL PRESENCE + REAL SIGNAL + REAL BAND
// ============================================================================

import { PulsePalMemory } from "./PulsePalMemory-v30.js";
import { PulsePalSpeech } from "./PulsePalSpeech-v30.js";

import { PulsePalSettings } from "./PulsePalSettings-v30.js";
import { PulsePalPresence } from "./PulsePalPresence-v30.js";

// REAL signal + band modules (read-only)
import { ProtocolSignalPort, __PulseMergedState } from "../../PULSE-PHYSICS/PULSE-PROTOCOL/PULSE-PROTOCOL.js";
import { pulseband } from "../../PULSE-PHYSICS/PULSE-BAND/PULSE-BAND.js";

// REAL organs only — no Bridge
const CoreMemory   = PulsePalMemory;
const CoreSpeech   = PulsePalSpeech;
const CoreSettings = PulsePalSettings;
const CorePresence = PulsePalPresence;

// REAL signal + band snapshots
const CoreSignal = ProtocolSignalPort;
const CoreBand   = pulseband;

// ============================================================================
// IMPLEMENTATION — v30 IMMORTAL++
// ============================================================================
export function PulsePalHistoryScanner({ Router, Icons, Media }) {

  // --------------------------------------------------------------------------
  // CORE SNAPSHOTS (READ-ONLY)
  // --------------------------------------------------------------------------
  const memoryTimeline = CoreMemory.timeline() || [];
  const memoryGraph    = CoreMemory.graph()    || {};
  const persona        = CoreMemory.persona()  || {};
  const tone           = CoreMemory.tone()     || {};
  const continuity     = CoreMemory.continuity() || {};
  const settings       = CoreSettings.snapshot() || {};
  const presence       = CorePresence.snapshot() || {};

  const speechStats = CoreSpeech.stats() || {};

  // Avatar
  const palImages = Media.resolveAll("PulsePal") || [];
  const avatar = palImages[0] || Icons.resolve("pulse");

  // --------------------------------------------------------------------------
  // SIGNAL + BAND SNAPSHOTS (REAL MODULES)
  // --------------------------------------------------------------------------
  const signalSnapshot =
    CoreSignal.getSnapshot() ||
    CoreSignal.merged()   ||
    null;

  const bandSnapshot =
    CoreBand.snapshot() ||
    null;

  // --------------------------------------------------------------------------
  // DERIVED MODELS
  // --------------------------------------------------------------------------
  const timeline = memoryTimeline || [];
  const graph    = memoryGraph.graph    || memoryGraph || {};
  const entities = memoryGraph.entities || {};
  const topics   = memoryGraph.topics   || {};

  const personaModel = persona || {};
  const toneModel    = tone    || {};

  // Presence‑aware tone
  const toneLabel   = presence.tone   || toneModel.label   || "Neutral";
  const toneBand    = presence.band   || toneModel.band    || "Companion";
  const toneEnergy  = presence.energy || toneModel.energy  || "Balanced";
  const toneFocus   = presence.focus  || toneModel.focus   || "General";

  const version = settings.version || "v30 IMMORTAL++";
  const lineage = settings.lineage || "Pulse‑OS Evolutionary";

  // --------------------------------------------------------------------------
  // SIGNAL + BAND SUMMARY
  // --------------------------------------------------------------------------
  const signalBandLabel =
    signalSnapshot.bandLabel ||
    signalSnapshot.band      ||
    bandSnapshot.band        ||
    "Unified";

  const signalStability =
    signalSnapshot.stability.score ??
    signalSnapshot.stabilityScore   ??
    null;

  const signalLatency =
    signalSnapshot.latency.ms ??
    signalSnapshot.latencyMs   ??
    null;

  const bandAdvantage =
    bandSnapshot.advantage.multiplier ??
    null;

  const bandAdvantagePercent =
    bandSnapshot.advantage.percent ??
    null;

  const routeHint =
    bandSnapshot.route ||
    null;

  // --------------------------------------------------------------------------
  // TIMELINE SUMMARY
  // --------------------------------------------------------------------------
  function summarizeTimeline(tl) {
    if (!Array.isArray(tl) || !tl.length) {
      return { count: 0, firstTs: null, lastTs: null, spanMinutes: 0 };
    }
    const sorted = [...tl].sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
    const firstTs = sorted[0].timestamp || null;
    const lastTs  = sorted[sorted.length - 1].timestamp || null;
    const spanMs  = firstTs && lastTs ? (lastTs - firstTs) : 0;
    return {
      count: tl.length,
      firstTs,
      lastTs,
      spanMinutes: spanMs > 0 ? Math.round(spanMs / 60000) : 0
    };
  }

  const timelineSummary = summarizeTimeline(timeline);

  // --------------------------------------------------------------------------
  // HTML SECTIONS (unchanged logic, pure UI)
  // --------------------------------------------------------------------------
  const timelineHtml = timeline.length
    ? timeline.map(item => `
        <li class="evo-list-item">
          <strong>[${item.type || "event"}]</strong>
          ${item.timestamp
            ? ` — <span style="opacity:0.7;">${new Date(item.timestamp).toLocaleString()}</span>`
            : ""}
          <br/>
          ${item.text || item.value || ""}
        </li>
      `).join("")
    : `<li class="evo-list-item" style="opacity:0.7;">No timeline entries yet.</li>`;

  const graphBuckets = graph.buckets || graph.clusters || graph || {};
  const graphKeys = Object.keys(graphBuckets);
  const graphHtml = graphKeys.length
    ? graphKeys.map(key => {
        const bucket = graphBuckets[key];
        const size = Array.isArray(bucket.items) ? bucket.items.length
                   : Array.isArray(bucket)        ? bucket.length
                   : bucket.count                || 0;
        const label = bucket.label || key;
        return `
          <li class="evo-list-item">
            <strong>${label}</strong>: ${size} items
          </li>
        `;
      }).join("")
    : `<li class="evo-list-item">Graph empty.</li>`;

  const entitiesHtml = Object.keys(entities).length
    ? Object.entries(entities).map(([k, v]) => `
        <li class="evo-list-item">
          <strong>${k}</strong>
          <span style="opacity:0.75; font-size:0.85rem;">
            (${v.type || "entity"}, seen ${v.count || v.frequency || 1}×)
          </span>
        </li>
      `).join("")
    : `<li class="evo-list-item">No entities extracted.</li>`;

  const topicsHtml = Object.keys(topics).length
    ? Object.entries(topics).map(([k, v]) => `
        <li class="evo-list-item">
          <strong>${k}</strong>
          <span style="opacity:0.75; font-size:0.85rem;">
            (weight ${v.weight || v.score || 1})
          </span>
        </li>
      `).join("")
    : `<li class="evo-list-item">No topics detected.</li>`;

  const personaTraits = personaModel.traits || personaModel || {};
  const personaHtml = Object.keys(personaTraits).length
    ? Object.entries(personaTraits).map(([k, v]) => `
        <li class="evo-list-item">
          <strong>${k}</strong>: ${String(v)}
        </li>
      `).join("")
    : `<li class="evo-list-item">Persona not computed.</li>`;

  const toneHtml = Object.keys(toneModel).length
    ? Object.entries(toneModel).map(([k, v]) => `
        <li class="evo-list-item">
          <strong>${k}</strong>: ${String(v)}
        </li>
      `).join("")
    : `<li class="evo-list-item">Tone not computed.</li>`;

  const speechStatsHtml = Object.keys(speechStats).length
    ? Object.entries(speechStats).map(([k, v]) => `
        <li class="evo-list-item">
          <strong>${k}</strong>: ${String(v)}
        </li>
      `).join("")
    : `<li class="evo-list-item">No conversation stats available yet.</li>`;

  const mediaHtml = palImages.length
    ? `
      <div class="evo-block" data-hook="pulsepal.history.media">
        <h2>Pulse‑Pal Media</h2>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          ${palImages.map(src => `
            <div class="pal-history-thumb-frame">
              <img src="${src}" class="pal-history-thumb" />
            </div>
          `).join("")}
        </div>
      </div>
    `
    : "";

  const signalPanelHtml = `
    <div class="evo-block" data-hook="pulsepal.history.signal">
      <h2>Signal & Band</h2>
      <ul class="evo-list">
        <li class="evo-list-item"><strong>Band</strong>: ${signalBandLabel}</li>
        <li class="evo-list-item"><strong>Stability</strong>: ${signalStability ?? "Unknown"}</li>
        <li class="evo-list-item"><strong>Latency</strong>: ${signalLatency != null ? signalLatency + " ms" : "Unknown"}</li>
        <li class="evo-list-item"><strong>PulseBand Advantage</strong>: ${
          bandAdvantage != null ? bandAdvantage + "×" : "—"
        } ${
          bandAdvantagePercent != null ? "(" + bandAdvantagePercent + "% better)" : ""
        }</li>
        <li class="evo-list-item"><strong>Route</strong>: ${routeHint || "Not classified"}</li>
      </ul>
    </div>
  `;

  const exportPanelHtml = `
    <div class="evo-block" data-hook="pulsepal.history.export">
      <h2>Snapshot Export</h2>
      <pre class="evo-code">
${JSON.stringify(
  {
    version,
    lineage,
    tone: { toneLabel, toneBand, toneEnergy, toneFocus },
    timelineSummary,
    speechStats,
    signal: {
      band: signalBandLabel,
      stability: signalStability,
      latencyMs: signalLatency,
      advantage: bandAdvantage,
      advantagePercent: bandAdvantagePercent,
      route: routeHint
    }
  },
  null,
  2
)}
      </pre>
    </div>
  `;

  // ========================================================================
  // RENDER
  // ========================================================================
  return `
    <div id="pulsepal-history" class="evo-wrapper">

      <div class="evo-surface evo-breathe" data-hook="pulsepal.history.header">
        <div style="display:flex; align-items:center; gap:18px;">
          <img src="${avatar}" class="evo-icon" />
          <div>
            <h1 style="margin:0;">Pulse‑Pal History Scanner</h1>
            <p style="margin:0; opacity:0.75;">
              ${toneLabel} • ${toneBand} • Energy: ${toneEnergy} • Focus: ${toneFocus}
            </p>
            <p style="margin:0; opacity:0.6; font-size:0.8rem;">
              Version: ${version} • Lineage: ${lineage}
            </p>
            <p style="margin:0; opacity:0.6; font-size:0.8rem;">
              Timeline: ${timelineSummary.count} events • Span: ${timelineSummary.spanMinutes} min
            </p>
          </div>
        </div>
      </div>

      ${signalPanelHtml}

      <div class="evo-block" data-hook="pulsepal.history.timeline">
        <h2>Timeline</h2>
        <ul class="evo-list">${timelineHtml}</ul>
      </div>

      <div class="evo-block" data-hook="pulsepal.history.graph">
        <h2>Memory Graph</h2>
        <ul class="evo-list">${graphHtml}</ul>
      </div>

      <div class="evo-block" data-hook="pulsepal.history.entities">
        <h2>Entities</h2>
        <ul class="evo-list">${entitiesHtml}</ul>
      </div>

      <div class="evo-block" data-hook="pulsepal.history.topics">
        <h2>Topics</h2>
        <ul class="evo-list">${topicsHtml}</ul>
      </div>

      <div class="evo-block" data-hook="pulsepal.history.persona">
        <h2>Persona Traits</h2>
        <ul class="evo-list">${personaHtml}</ul>
      </div>

      <div class="evo-block" data-hook="pulsepal.history.tone">
        <h2>Tone</h2>
        <ul class="evo-list">${toneHtml}</ul>
      </div>

      <div class="evo-block" data-hook="pulsepal.history.activity">
        <h2>Conversation Activity</h2>
        <ul class="evo-list">${speechStatsHtml}</ul>
      </div>

      ${mediaHtml}
      ${exportPanelHtml}

    </div>
  `;
}
