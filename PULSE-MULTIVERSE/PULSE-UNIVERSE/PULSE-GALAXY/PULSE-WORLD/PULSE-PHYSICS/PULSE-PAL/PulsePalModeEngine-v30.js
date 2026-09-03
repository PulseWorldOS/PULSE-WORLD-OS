// ============================================================================
// FILE: /PULSE/CORE/PulsePalModeEngine-v30.js
// PULSE OS — v30 IMMORTAL++
// PULSE‑PAL MODE ENGINE — BRIDGE‑FREE, PRESENCE‑DRIVEN, MEDIA‑AWARE
// ============================================================================

import { PulsePalMemory } from "./PulsePalMemory-v30.js";
import { PulsePalSpeech } from "./PulsePalSpeech-v30.js";
import { PulsePalPresence } from "./PulsePalPresence-v30.js";
import { PulsePalSettings } from "./PulsePalSettings-v30.js";
import { PulsePalIdentity } from "./PulsePalIdentity-v30.js";
import { PulsePalMemoryEngine } from "./PulsePalMemoryEngine-v30.js";
import { PulsePalMedia } from "./PulsePalMedia-v30.js";   // NEW




// REAL organs only — no Bridge, no Daemon
const CoreMemory   = PulsePalMemory;
const CoreSpeech   = PulsePalSpeech;
const CoreSettings = PulsePalSettings;
const CorePresence = PulsePalPresence;
const CoreMedia    = PulsePalMedia;

// Identity snapshot (real, not bridge)
const getIdentity = () => {
  try { return PulsePalIdentity.getSnapshot() || {}; }
  catch { return {}; }
};

// Base archetypes
const DEFAULT_MODES = [
  "advisor",
  "architect",
  "entrepreneur",
  "expansion",
  "finality",
  "grid",
  "mesh",
  "tourist",
  "fox",
  "human"
];

// ============================================================================
// IMMORTAL PSEUDO ORGAN — v30 IMMORTAL++
// ============================================================================

const PulsePalModeEngineCore = (() => {
  const create = () => {
    let lastSnapshot = null;
    const modes = new Set(DEFAULT_MODES);

    const resolveAvatars = ({ media, filenames }) => {
      const avatars = { modes: {}, forms: {} };

      const ingest = (src) => {
        const lower = String(src).toLowerCase();
        for (const mode of modes) {
          if (lower.includes(mode)) {
            avatars.modes[mode] = avatars.modes[mode] || src;
          }
        }
        if (lower.includes("fox"))   avatars.forms.fox   = avatars.forms.fox   || src;
        if (lower.includes("human")) avatars.forms.human = avatars.forms.human || src;
      };

      if (Array.isArray(filenames)) {
        for (const f of filenames) ingest(f);
      }

      if (media && typeof media.resolveAll === "function") {
        const palImages = media.resolveAll("PulsePal") || [];
        for (const src of palImages) ingest(src);
      }

      return avatars;
    };

    const computeModeWeights = ({
      speechMessages,
      presence,
      memoryPersona,
      memoryTone,
      memoryMode,
      identity,
      allAvatars
    }) => {
      const weights = {};
      for (const mode of modes) weights[mode] = 0;

      const presenceMode = presence.mode || presence.activeMode;
      if (presenceMode && weights[presenceMode] != null) {
        weights[presenceMode] += 2.0;
      }

      const influence = memoryMode.influence || {};
      for (const [mode, v] of Object.entries(influence)) {
        if (weights[mode] != null) weights[mode] += Number(v) * 1.5;
      }

      const tags = memoryPersona.tags || [];
      for (const tag of tags) {
        const t = String(tag).toLowerCase();
        for (const mode of modes) {
          if (t.includes(mode)) weights[mode] += 1.0;
        }
      }

      const recent = speechMessages.slice(-24);
      for (const msg of recent) {
        const text = (msg.text || "").toLowerCase();
        for (const mode of modes) {
          if (text.includes(mode)) weights[mode] += 0.7;
        }
        if (text.includes("earn"))      weights.entrepreneur += 0.6;
        if (text.includes("grid"))      weights.grid         += 0.6;
        if (text.includes("architect")) weights.architect    += 0.6;
        if (text.includes("tourist"))   weights.tourist      += 0.6;
        if (text.includes("final"))     weights.finality     += 0.6;
        if (text.includes("human"))     weights.human        += 0.4;
        if (text.includes("fox"))       weights.fox          += 0.4;
      }

      const band = identity.presenceBand || "";
      if (band.toLowerCase().includes("professional")) weights.human += 0.3;
      if (band.toLowerCase().includes("play"))         weights.fox   += 0.3;

      for (const mode of Object.keys(allAvatars.modes || {})) {
        weights[mode] += 0.2;
      }

      const sum = Object.values(weights).reduce((a, b) => a + b, 0) || 1;
      for (const m of Object.keys(weights)) weights[m] /= sum;

      return weights;
    };

    const pickActiveMode = ({ presence, settings, memoryMode, weights }) => {
      const presenceMode = presence.mode || presence.activeMode;
      if (presenceMode && weights[presenceMode] != null) return presenceMode;

      const settingsMode = settings.personaMode;
      if (settingsMode && weights[settingsMode] != null) return settingsMode;

      const memoryActive = memoryMode.activeMode;
      if (memoryActive && weights[memoryActive] != null) return memoryActive;

      return Object.entries(weights).sort((a, b) => b[1] - a[1])[0][0];
    };

    const pickActiveForm = ({ presence, settings, identity }) => {
      if (settings.avatarMode === "fox")   return "fox";
      if (settings.avatarMode === "human") return "human";

      if (presence.form === "fox")   return "fox";
      if (presence.form === "human") return "human";

      const band = identity.presenceBand || "";
      if (band.toLowerCase().includes("play"))         return "fox";
      if (band.toLowerCase().includes("professional")) return "human";

      return "fox";
    };

    const pickAvatar = ({ allAvatars, activeMode, activeForm }) => {
      const modeAvatar = allAvatars.modes[activeMode];
      const formAvatar = allAvatars.forms[activeForm];

      if (modeAvatar && formAvatar) {
        if (String(modeAvatar).toLowerCase().includes(activeForm)) return modeAvatar;
        return formAvatar;
      }

      return modeAvatar || formAvatar ||
        Object.values(allAvatars.modes || {})[0] ||
        Object.values(allAvatars.forms || {})[0] ||
        null;
    };

    const compute = (context = {}) => {
      if (Array.isArray(context.extraModes)) {
        for (const m of context.extraModes) {
          if (m && typeof m === "string") modes.add(m.toLowerCase());
        }
      }

      const speechMessages = CoreSpeech.messages()   || [];
      const presence       = CorePresence.snapshot() || {};
      const memoryPersona  = CoreMemory.persona()    || {};
      const memoryTone     = CoreMemory.tone()       || {};
      const memoryMode     = CoreMemory.mode()       || {};
      const settings       = CoreSettings.snapshot() || {};
      const identity       = getIdentity()              || {};

      const allAvatars = resolveAvatars({
        media: CoreMedia,
        filenames: context.fileNames || context.filenames
      });

      const weights = computeModeWeights({
        speechMessages,
        presence,
        memoryPersona,
        memoryTone,
        memoryMode,
        identity,
        allAvatars
      });

      const activeMode = pickActiveMode({
        presence,
        settings,
        memoryMode,
        weights
      });

      const activeForm = pickActiveForm({
        presence,
        settings,
        identity
      });

      const avatar = pickAvatar({
        allAvatars,
        activeMode,
        activeForm
      });

      const snapshot = {
        version: "v30-IMMORTAL++",
        activeMode,
        activeForm,
        weights,
        avatar,
        allAvatars,
        personaTags: memoryPersona.tags || [],
        lastComputeAt: PulseRealm.PulseNOW
      };

      lastSnapshot = snapshot;
      return snapshot;
    };

    const getLastSnapshot = () => lastSnapshot;

    return Object.freeze({
      compute,
      getLastSnapshot
    });
  };

  return { create };
})();

// ============================================================================
// PUBLIC API
// ============================================================================

const _modeEngineInstance = PulsePalModeEngineCore.create();

export function computePulsePalMode(context = {}) {
  return _modeEngineInstance.compute(context);
}

export function getLastPulsePalModeSnapshot() {
  return _modeEngineInstance.getLastSnapshot();
}

export const PulsePalModeEngine = {
  compute: computePulsePalMode,
  getLast: getLastPulsePalModeSnapshot
};

try {
  PulseRealm.PulsePalModeEngine = PulsePalModeEngine;
} catch {}
