// ============================================================================
// FILE: /PULSE-PAL/PulsePalMedia-v30.js
// PULSE OS — v30 IMMORTAL+++
// PULSE‑PAL MEDIA ORGAN — BRIDGE‑FREE, MODE‑AWARE AVATAR RESOLVER
// ============================================================================
//
// ROLE:
//   Central media organ for Pulse‑Pal surfaces.
//   It provides a deterministic, bridge‑free way to resolve:
//     • Pulse‑Pal avatar images (generic + mode‑specific)
//     • Fox / Human / System / World variants
//     • File‑name–based hints for modes (advisor, architect, grid, fox, …)
//     • A small snapshot for UIs + engines (Mode Engine, Identity, Home, etc.)
//
// CONTRACT:
//   • Pure logic organ (no network)
//   • Bridge‑optional (can read from PulseProofBridge.coremedia if present,
//     but never requires it)
//   • Deterministic given inputs
//   • Zero side effects
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { PulseCoreMemoryManager } from "../PULSE-COREMEMORY/PulseCoreMemoryManager-v40.js";
import { PulsePalSettings } from "./PulsePalSettings-v30.js";




// Optional MemoryManager instance
const MemoryManager = PulseCoreMemoryManager.instance || null;

// Optional bridge media (if present, but never required)
let BridgeMedia = null;
try {
  if (PulseRealm.PulseProofBridge.coremedia) {
    BridgeMedia = PulseRealm.PulseProofBridge.coremedia;
  }
} catch {
  // ignore
}

// Settings (for avatar mode hints if needed)
const CoreSettings = PulsePalSettings;

// ============================================================================
// INTERNAL HELPERS
// ============================================================================

function safeArray(x) {
  return Array.isArray(x) ? x : x ? [x] : [];
}

function unique(list) {
  const seen = new Set();
  const out = [];
  for (const v of list) {
    if (!v) continue;
    const s = String(v);
    if (seen.has(s)) continue;
    seen.add(s);
    out.push(v);
  }
  return out;
}

function normalizeSrc(src) {
  return String(src || "").trim();
}

// Try to resolve media via a generic "Media"‑like object
function resolveFromMediaLike(mediaLike, key) {
  if (!mediaLike) return [];
  try {
    if (typeof mediaLike.resolveAll === "function") {
      return safeArray(mediaLike.resolveAll(key)).map(normalizeSrc);
    }
  } catch {
    // ignore
  }
  return [];
}

// Try to resolve media via MemoryManager (if it exposes any media index)
function resolveFromMemoryManager(key) {
  if (!MemoryManager) return [];
  try {
    const mediaApi = MemoryManager.media || MemoryManager.coremedia || null;
    if (!mediaApi) return [];
    if (typeof mediaApi.resolveAll === "function") {
      return safeArray(mediaApi.resolveAll(key)).map(normalizeSrc);
    }
    if (Array.isArray(mediaApi.files)) {
      const lowerKey = String(key).toLowerCase();
      return mediaApi.files
        .filter(f => String(f).toLowerCase().includes(lowerKey))
        .map(normalizeSrc);
    }
  } catch {
    // ignore
  }
  return [];
}

// ============================================================================
//  IMMORTAL PSEUDO ORGAN: PulsePalMedia
// ============================================================================

export const PulsePalMedia = (() => {

  const create = () => {
    let snapshot = {
      palImages: [],
      foxImages: [],
      humanImages: [],
      worldImages: [],
      systemImages: [],
      files: []
    };

    // ------------------------------------------------------------------------
    // INTERNAL: UPDATE SNAPSHOT BUCKETS
    // ------------------------------------------------------------------------
    const updateSnapshotForKey = (key, list) => {
      const lowerKey = String(key).toLowerCase();
      if (lowerKey === "pulsepal") {
        snapshot.palImages = list;
      } else if (lowerKey === "pulsepalfox") {
        snapshot.foxImages = list;
      } else if (lowerKey === "pulsepalhuman") {
        snapshot.humanImages = list;
      } else if (lowerKey === "pulsepalworld") {
        snapshot.worldImages = list;
      }

      snapshot.files = unique([...snapshot.files, ...list]);
    };

    // ------------------------------------------------------------------------
    // RESOLVE ALL — PRIMARY ENTRYPOINT
    //   key examples: "PulsePal", "PulsePalFox", "PulsePalHuman", "PulsePalWorld"
    // ------------------------------------------------------------------------
    const resolveAll = (key = "PulsePal", context = {}) => {
      const localMedia = context.Media || context.media || null;

      const fromContext = resolveFromMediaLike(localMedia, key);
      const fromBridge  = resolveFromMediaLike(BridgeMedia, key);
      const fromMemory  = resolveFromMemoryManager(key);

      const merged = unique([...fromContext, ...fromBridge, ...fromMemory]);

      updateSnapshotForKey(key, merged);

      return merged;
    };

    // ------------------------------------------------------------------------
    // MODE‑AWARE AVATAR RESOLUTION
    //   Returns a small map of mode -> src and form -> src
    //   Used directly by Pulse‑Pal Mode Engine.
    // ------------------------------------------------------------------------
    const resolveModeAvatars = (context = {}) => {
      const localMedia = context.Media || context.media || null;

      const palImages   = resolveAll("PulsePal", { Media: localMedia });
      const foxImages   = resolveAll("PulsePalFox", { Media: localMedia });
      const humanImages = resolveAll("PulsePalHuman", { Media: localMedia });
      const worldImages = resolveAll("PulsePalWorld", { Media: localMedia });

      const modes = {};
      const forms = {};

      const ingest = (src) => {
        const lower = String(src).toLowerCase();
        if (lower.includes("fox"))    forms.fox = forms.fox || src;
        if (lower.includes("human"))  forms.human = forms.human || src;
        if (lower.includes("world"))  forms.world = forms.world || src;
        if (lower.includes("system")) forms.system = forms.system || src;

        const candidates = [
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
        for (const m of candidates) {
          if (lower.includes(m)) {
            modes[m] = modes[m] || src;
          }
        }
      };

      [...palImages, ...foxImages, ...humanImages, ...worldImages].forEach(ingest);

      if (!forms.fox && foxImages[0])   forms.fox = foxImages[0];
      if (!forms.human && humanImages[0]) forms.human = humanImages[0];
      if (!forms.world && worldImages[0]) forms.world = worldImages[0];

      snapshot.palImages    = palImages;
      snapshot.foxImages    = foxImages;
      snapshot.humanImages  = humanImages;
      snapshot.worldImages  = worldImages;
      snapshot.systemImages = snapshot.systemImages || [];

      return { modes, forms };
    };

    // ------------------------------------------------------------------------
    // SNAPSHOT — FOR UI / DEBUGGING
    // ------------------------------------------------------------------------
    const getSnapshot = () => ({
      palImages:   [...snapshot.palImages],
      foxImages:   [...snapshot.foxImages],
      humanImages: [...snapshot.humanImages],
      worldImages: [...snapshot.worldImages],
      systemImages: [...snapshot.systemImages],
      files:       [...snapshot.files]
    });

    return Object.freeze({
      resolveAll,
      resolveModeAvatars,
      snapshot: getSnapshot
    });
  };

  const instance = create();

  try {
   
      PulseRealm.PulsePalMedia = instance;
    
  } catch {
    // never throw
  }

  return instance;
})();
