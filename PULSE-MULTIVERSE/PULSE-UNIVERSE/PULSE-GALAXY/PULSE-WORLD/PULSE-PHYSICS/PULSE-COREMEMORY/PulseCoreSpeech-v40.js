// ============================================================================
// FILE: /PULSE-COREMEMORY/PulseCoreSpeech-v40.js
// PULSE OS — v40 IMMORTAL
// CORE SPEECH ORGAN — FULL CONTEXTUAL MESSAGE ENGINE
// “THE VOICE OF THE ORGANISM. THE MEMORY OF THE CONVERSATION.”
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { PulseBinaryOverlayV40 } from "./PulseCoreBinaryOverlay-v40.js";

export function createPulseCoreSpeech_v40({
  overlay = PulseBinaryOverlayV40,
  routeId = "speech-stream",
  dnaTag = "default-dna",
  version = "40.0-IMMORTAL-SPEECH",
  log    = console.log,
  warn   = console.warn
} = {}) {

  if (!overlay) throw new Error("💾 PULSE CORE MEMORY v40 - [PulseCoreSpeech-v40] Missing overlay");

  const Governor      = overlay.Governor;
  const CoreMemory    = overlay.CoreMemory;
  const MemoryManager = overlay.MemoryManager;

  const state = {
    messages: [],
    typing: false,
    lastUpdated: 0,
    lastUserMessage: null,
    lastAssistantMessage: null
  };

  function safeLog(stage, details = {}) {
    try { log(`💾 PULSE CORE MEMORY v40 - [PulseCoreSpeech-v40] ${stage}`, details); }
    catch {}
  }

  // ---------------------------------------------------------------------------
  // CONTEXT SNAPSHOT (speech-aware)
  // ---------------------------------------------------------------------------
  function getContext() {
    return {
      pressure: MemoryManager?.pressure?.() || 0,
      tier: MemoryManager?.storageTier?.() || "indexeddb",
      emergency: MemoryManager?.emergencyMode?.() || false,
      wave: Governor?.waveContextHint?.primaryWave || "unknown",
      device: Governor?.deviceContext?.platform || "unknown",
      writeAvg: Governor?._pressure?.writeAvg?.() || 0,
      readAvg: Governor?._pressure?.readAvg?.() || 0,
      lastUser: state.lastUserMessage,
      lastAssistant: state.lastAssistantMessage
    };
  }

  // ---------------------------------------------------------------------------
  // LOAD FROM CORE MEMORY
  // ---------------------------------------------------------------------------
  function loadFromCoreMemory() {
    try {
      const snapshot = CoreMemory.getRouteSnapshot(routeId);
      if (snapshot && Array.isArray(snapshot.messages)) {
        state.messages = [...snapshot.messages];
        state.lastUpdated = snapshot.lastUpdated || 0;
        state.lastUserMessage = snapshot.lastUserMessage || null;
        state.lastAssistantMessage = snapshot.lastAssistantMessage || null;
      }

      safeLog("LOAD_FROM_CORE_MEMORY", {
        count: state.messages.length,
        routeId
      });
    } catch (err) {
      warn("[PulseCoreSpeech-v40] LOAD_ERROR", String(err));
    }
  }

  // ---------------------------------------------------------------------------
  // PERSIST MESSAGE (binary + contextual)
  // ---------------------------------------------------------------------------
  function persistMessage(evt) {
    const ctx = getContext();

    try {
      overlay.canonicalize({
        kind: "speech-event",
        event: evt,
        context: ctx
      });

      overlay.touch(routeId, evt.timestamp, {
        dataType: "speech-event",
        dnaTag,
        version
      });

      state.lastUpdated = evt.timestamp;

      CoreMemory.setRouteSnapshot(routeId, {
        messages: [...state.messages],
        lastUpdated: state.lastUpdated,
        lastUserMessage: state.lastUserMessage,
        lastAssistantMessage: state.lastAssistantMessage
      });

    } catch (err) {
      warn("[PulseCoreSpeech-v40] PERSIST_ERROR", String(err));
    }
  }

  // ---------------------------------------------------------------------------
  // SNAPSHOT (identity + world compatible)
  // ---------------------------------------------------------------------------
  function snapshot() {
    return {
      routeId,
      version,
      dnaTag,
      lastUpdated: state.lastUpdated,
      count: state.messages.length,
      messages: [...state.messages],
      lastUserMessage: state.lastUserMessage,
      lastAssistantMessage: state.lastAssistantMessage,
      context: getContext()
    };
  }

  // ---------------------------------------------------------------------------
  // PUBLIC API
  // ---------------------------------------------------------------------------
  function messages() {
    return [...state.messages];
  }

  function pushUserMessage(text) {
    const evt = {
      role: "user",
      text,
      timestamp: PulseRealm.PulseNOW,
      context: getContext()
    };

    state.messages.push(evt);
    state.lastUserMessage = text;

    persistMessage(evt);
  }

  function pushAssistantMessage(text) {
    const evt = {
      role: "assistant",
      text,
      timestamp: PulseRealm.PulseNOW,
      context: getContext()
    };

    state.messages.push(evt);
    state.lastAssistantMessage = text;

    persistMessage(evt);
  }

  function typing(stateValue) {
    state.typing = !!stateValue;
  }

  const PulseCoreSpeech = {
    messages,
    pushUserMessage,
    pushAssistantMessage,
    typing,
    loadFromCoreMemory,
    snapshot,
    routeId,
    dnaTag,
    version,
    overlay,
    Governor,
    CoreMemory,
    MemoryManager
  };

  loadFromCoreMemory();

  safeLog("INITIALIZED", {
    version,
    dnaTag,
    routeId,
    context: getContext()
  });

  return PulseCoreSpeech;
}

export const PulseCoreSpeech = createPulseCoreSpeech_v40;

export default createPulseCoreSpeech_v40;

PulseRealm.CoreSpeech = { createPulseCoreSpeech_v40 };
PulseRealm.PulseCoreSpeech = createPulseCoreSpeech_v40;
