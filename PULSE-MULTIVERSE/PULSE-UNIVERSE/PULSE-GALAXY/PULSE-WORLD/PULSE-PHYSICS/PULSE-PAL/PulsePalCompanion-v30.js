// ============================================================================
// FILE: /PULSE-PAL/PulsePalCompanion-v30.js
// PULSE OS — v30 ORBITAL IMMORTAL+++
// PULSE‑PAL COMPANION — REAL PRESENCE + MESSENGER‑AWARE + BRIDGE‑FREE
// ============================================================================

import { PulsePalMemory } from "./PulsePalMemory-v30.js";
import { PulsePalSpeech } from "./PulsePalSpeech-v30.js";

import { PulsePalSettings } from "./PulsePalSettings-v30.js";
import { PulsePalPresence } from "./PulsePalPresence-v30.js";
import { PulsePalMessenger } from "./PulsePalMessenger-v30.js";


const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

// REAL organs only
const CoreMemory    = PulsePalMemory;
const CoreSpeech    = PulsePalSpeech;
const CoreSettings  = PulsePalSettings;
const CorePresence  = PulsePalPresence;
const CoreMessenger = PulsePalMessenger;

// ============================================================================
// IMPLEMENTATION — v30 ORBITAL IMMORTAL+++
// ============================================================================
export function PulsePalCompanion({ Router, Icons, Media } = {}) {

  // --------------------------------------------------------------------------
  // REAL SNAPSHOTS
  // --------------------------------------------------------------------------
  const presence    = CorePresence.snapshot()     || {};
  const persona     = CoreMemory.persona()      || {};
  const continuity  = CoreMemory.continuity()   || {};
  const settings    = CoreSettings.snapshot()     || {};
  const messages    = CoreSpeech.messages()     || [];
  const memory      = CoreMemory.snapshot()     || {};
  const messenger   = CoreMessenger.snapshot()    || {};

  // --------------------------------------------------------------------------
  // MESSENGER PRESENCE
  // --------------------------------------------------------------------------
  const typing        = messenger.presence.typing;
  const lastPing      = messenger.presence.lastPing;
  const lastActiveApp = messenger.presence.lastActiveApp;
  const unreadSignals = messenger.bubbles.length;

  // --------------------------------------------------------------------------
  // PRESENCE MODEL (REAL)
  // --------------------------------------------------------------------------
  const tone   = presence.tone   || "neutral";
  const energy = presence.energy || "idle";
  const trust  = presence.trust  || "standard";
  const bond   = presence.bond   || "balanced";
  const intent = presence.intent || null;

  // --------------------------------------------------------------------------
  // CONTINUITY LABELS
  // --------------------------------------------------------------------------
  const sessions = continuity.sessions ?? 0;
  const streak   = continuity.streakDays ?? 0;

  const isDeepBond = bond === "deep" || sessions > 50;

  const bondingLabel =
    isDeepBond
      ? "Deep bond"
      : bond === "light"
      ? "Light bond"
      : "Balanced bond";

  const continuityLine =
    sessions > 0 || streak > 0
      ? `${sessions} sessions • ${streak}-day streak`
      : "Early days — we’re still learning each other.";

  // --------------------------------------------------------------------------
  // SIGNAL LINE (MESSENGER + DEVICE)
  // --------------------------------------------------------------------------
  const bars    = messenger.device.bars ?? null;
  const latency = messenger.device.latency ?? null;

  const signalBits = [];

  if (typing)          signalBits.push("Typing…");
  if (lastActiveApp)   signalBits.push(`Active: ${lastActiveApp}`);
  if (lastPing)        signalBits.push(`Ping ${new Date(lastPing).toLocaleTimeString()}`);
  if (unreadSignals)   signalBits.push(`${unreadSignals} signals`);
  if (bars != null)    signalBits.push(`${bars}/4 bars`);
  if (latency != null) signalBits.push(`${latency}ms`);

  const signalLine =
    signalBits.length > 0
      ? signalBits.join(" • ")
      : "Signal adapting in the background.";

  // --------------------------------------------------------------------------
  // AVATAR RESOLUTION
  // --------------------------------------------------------------------------
  const palImages = Media.resolveAll("PulsePal") || [];

  function pickAvatar() {
    const mode = settings.avatarMode || settings.personaMode || "system";

    const lower = mode.toLowerCase();

    const match = palImages.find(i => i.toLowerCase().includes(lower));
    return match || palImages[0] || Icons.resolve("assistant");
  }

  const avatar = pickAvatar();

  // --------------------------------------------------------------------------
  // AURA COLOR
  // --------------------------------------------------------------------------
  const auraColor =
    tone === "warm"
      ? "rgba(255,120,180,0.55)"
      : tone === "focused"
      ? "rgba(0,255,180,0.55)"
      : tone === "calm"
      ? "rgba(120,200,255,0.45)"
      : "rgba(160,180,200,0.45)";

  // --------------------------------------------------------------------------
  // WORLD / CONTEXT HOOK
  // --------------------------------------------------------------------------
  const path = `/${PulseRealm.__PULSE_CURRENT_PAGE__}` || "/";

  let worldHint = "This companion tunes itself to how you use the OS.";

  if (path.includes("pulseworld")) {
    worldHint = "Your worlds and signals shape how I respond.";
  } else if (path.includes("tasks")) {
    worldHint = "Your flow, signals, and tasks all influence my guidance.";
  } else if (path.includes("civ")) {
    worldHint = "Your civilization tier affects how I prioritize signals.";
  } else if (path.includes("system")) {
    worldHint = "System vitals and messenger signals are live.";
  }

  // --------------------------------------------------------------------------
  // GALLERY
  // --------------------------------------------------------------------------
  const galleryHtml = palImages.length
    ? `
      <div class="evo-block">
        <h2>Pulse‑Pal Gallery</h2>
        <p class="pal-subline">
          Different faces for different modes — human, fox, system, and beyond.
        </p>
        <div class="pal-gallery-row">
          ${palImages
            .map(
              (src) => `
            <div class="pal-image-frame">
              <div class="pal-image-aura"></div>
              <img src="${src}" class="pal-image" alt="Pulse‑Pal Image" />
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `
    : `
      <div class="evo-block">
        <h2>Pulse‑Pal Gallery</h2>
        <p style="opacity:0.6;">No Pulse‑Pal images found.</p>
      </div>
    `;

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  return `
    <div id="pulsepal-companion" class="evo-wrapper">

      <!-- HEADER -->
      <div class="evo-surface evo-breathe">
        <div class="pal-header-row">
          <div class="pal-avatar-preview-wrap">
            <div class="pal-avatar-aura" style="background:${auraColor};"></div>
            <img src="${avatar}" class="pal-avatar-preview" alt="Pulse‑Pal Avatar" />
          </div>
          <div class="pal-header-text">
            <h1>Pulse‑Pal Companion</h1>
            <p>${tone}</p>
            <div class="pal-tag-row">
              <span class="pal-tag pal-tag-strong">${bondingLabel}</span>
              <span class="pal-tag">Trust: ${trust}</span>
              <span class="pal-tag">Energy: ${energy}</span>
              <span class="pal-tag">Intent: ${intent || "—"}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- BONDING + TRUST -->
      <div class="evo-block">
        <h2>Bonding & Trust</h2>
        <p class="pal-subline">
          Messenger signals now influence bonding and continuity.
        </p>
        <div class="pal-metrics">
          <div class="pal-metric-pill">${continuityLine}</div>
          <div class="pal-metric-pill">${signalLine}</div>
        </div>
      </div>

      <!-- PERSONA PANEL -->
      <div class="evo-block">
        <h2>Persona Influence</h2>
        <p class="pal-subline">
          These sliders describe how I show up — warmth, focus, and expressiveness.
        </p>
        <p>Warmth: ${persona.warmth ?? 0}</p>
        <p>Focus: ${persona.focus ?? 0}</p>
        <p>Expressiveness: ${persona.expressiveness || "medium"}</p>
        <p>Mode: ${settings.personaMode || settings.avatarMode || "system"}</p>
      </div>

      <!-- WORLD / CONTEXT HOOK -->
      <div class="evo-block">
        <h2>Context & World</h2>
        <p>${worldHint}</p>
      </div>

      <!-- GALLERY -->
      ${galleryHtml}

    </div>
  `;
}
