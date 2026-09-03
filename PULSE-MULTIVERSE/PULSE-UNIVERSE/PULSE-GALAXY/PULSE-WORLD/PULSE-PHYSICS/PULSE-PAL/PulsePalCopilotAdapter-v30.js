// ============================================================================
// FILE: /PULSE-PAL/PulsePalCopilotAdapter-v30.js
// PULSE OS — v30 ORBITAL IMMORTAL++
// COPILOT ADAPTER — REAL PRESENCE + BRIDGE‑FREE VERSION
// ============================================================================
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { PulsePalMemory } from "./PulsePalMemory-v30.js";
import { PulsePalSpeech } from "./PulsePalSpeech-v30.js";

import { PulsePalSettings } from "./PulsePalSettings-v30.js";
import { PulsePalPresence } from "./PulsePalPresence-v30.js";

// REAL organs only — no Bridge, no ghost organs
const CoreSpeech   = PulsePalSpeech;
const CoreMemory   = PulsePalMemory;
const CoreSettings = PulsePalSettings;
const CorePresence = PulsePalPresence;

// ============================================================================
// IMPLEMENTATION — v30 ORBITAL IMMORTAL++
// ============================================================================
export function PulsePalCopilotAdapter({ db } = {}) {

  // --------------------------------------------------------------------------
  // INTERNAL STATE — IMMORTAL++
  // --------------------------------------------------------------------------
  const state = {
    activeAI: null,
    sessionId: null,
    threadId: null,
    lastHashes: new Set(),
    observer: null,
    lastScanTs: 0,
    scanThrottleMs: 140,
    maxHashes: 2000,
    lastTurnIndex: 0
  };

  // --------------------------------------------------------------------------
  // UTILITIES
  // --------------------------------------------------------------------------
  const safeNow = () => {
    try { return PulseRealm.PulseNOW; } catch { return 0; }
  };

  const safeUuid = () => {
    try { return crypto.randomUUID(); }
    catch {
      return "copilot-" + safeNow() + "-" + Math.random().toString(16).slice(2);
    }
  };

  const trimHashSet = () => {
    if (state.lastHashes.size > state.maxHashes) {
      state.lastHashes = new Set();
    }
  };

  const hashMessage = (key) => {
    try {
      return btoa(unescape(encodeURIComponent(key))).slice(0, 40);
    } catch {
      return String(key.length) + "::" + String(key.charCodeAt(0) || 0);
    }
  };

  const normalizeRole = (role, node) => {
    const r = (role || "").toLowerCase();
    if (r === "user" || r === "me" || r === "human") return "user";
    if (r === "assistant" || r === "bot" || r === "ai") return "assistant";

    const cls = node.classList || { contains: () => false };
    if (cls.contains("assistant") || cls.contains("bot") || cls.contains("ai")) return "assistant";
    if (cls.contains("user") || cls.contains("me")) return "user";

    return "assistant";
  };

  const extractMarkdown = (node) => {
    const text = node.innerText.trim() || "";
    return { text, markdown: text };
  };

  // --------------------------------------------------------------------------
  // DETECT COPILOT
  // --------------------------------------------------------------------------
  function detectCopilot() {
    const href = window.location.href || "";

    const isCopilot =
      document.querySelector("cwc-chat") ||
      document.querySelector("[data-copilot-root]") ||
      document.querySelector("[data-telemetry-id='CopilotChat']") ||
      href.includes("copilot.microsoft.com") ||
      href.includes("bing.com/chat") ||
      href.includes("copilot");

    if (isCopilot && state.activeAI !== "copilot") {
      state.activeAI = "copilot";
      state.sessionId = safeUuid();
      state.threadId = href.split("#")[0] || href;

      // Presence‑aware semantic session start
      try {
        CoreMemory.semantic.addTimeline({
          type: "ai_session_start",
          ai: "copilot",
          timestamp: safeNow(),
          sessionId: state.sessionId,
          threadId: state.threadId,
          presence: CorePresence.snapshot() || {}
        });
      } catch {}
    }
  }

  // --------------------------------------------------------------------------
  // MESSAGE CAPTURE
  // --------------------------------------------------------------------------
  function captureMessage({ role, text, markdown, turnIndex }) {
    if (!text) return;

    if (!state.activeAI) detectCopilot();
    if (!state.activeAI) return;

    const key = `${state.threadId}::${turnIndex}::${role}::${text}`;
    const hash = hashMessage(key);

    if (state.lastHashes.has(hash)) return;
    trimHashSet();
    state.lastHashes.add(hash);

    const ts = safeNow();
    const presenceSnapshot = CorePresence.snapshot() || {};

    const evt = {
      ai: "copilot",
      role,
      text,
      markdown,
      timestamp: ts,
      sessionId: state.sessionId,
      threadId: state.threadId,
      turnIndex,
      presence: presenceSnapshot
    };

    // CoreSpeech timeline
    try { CoreSpeech.add(evt); } catch {}

    // Semantic memory timeline
    try {
      CoreMemory.semantic.addTimeline({
        type: "speech",
        role,
        text,
        markdown,
        timestamp: ts,
        ai: "copilot",
        sessionId: state.sessionId,
        threadId: state.threadId,
        turnIndex,
        presence: presenceSnapshot
      });
    } catch {}

    // Incremental semantic engine — now presence‑aware
    try {
      CoreMemory.engine.incremental({
        speech: CoreSpeech.messages() || [],
        memory: CoreMemory.snapshot() || {},
        settings: CoreSettings.snapshot() || {},
        presence: presenceSnapshot
      });
    } catch {}

    // Optional DB persistence
    try { db.messages.insert(evt); } catch {}
  }

  // --------------------------------------------------------------------------
  // DOM SCAN
  // --------------------------------------------------------------------------
  function scanDom() {
    const now = performance.now ? performance.now() : safeNow();
    if (now - state.lastScanTs < state.scanThrottleMs) return;
    state.lastScanTs = now;

    if (document.visibilityState && document.visibilityState !== "visible") return;

    detectCopilot();
    if (!state.activeAI) return;

    const roots = [
      "cwc-chat-message",
      "[data-message-role]",
      ".message",
      ".assistant",
      ".user",
      "[data-content='message']"
    ];

    const nodes = document.querySelectorAll(roots.join(","));
    let turnIndex = state.lastTurnIndex || 0;

    nodes.forEach((node) => {
      const explicitRole = node.getAttribute("data-message-role");
      const { text, markdown } = extractMarkdown(node);
      if (!text) return;

      const role = normalizeRole(explicitRole, node);
      turnIndex += 1;

      captureMessage({ role, text, markdown, turnIndex });
    });

    state.lastTurnIndex = turnIndex;
  }

  // --------------------------------------------------------------------------
  // OBSERVER LIFECYCLE
  // --------------------------------------------------------------------------
  function start() {
    detectCopilot();
    if (!state.activeAI) return;
    if (state.observer) return;

    const observer = new MutationObserver(() => scanDom());
    observer.observe(document.body, { childList: true, subtree: true });
    state.observer = observer;

    scanDom();

    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.visibilityState === "visible") scanDom();
      },
      { passive: true }
    );
  }

  function stop() {
    if (state.observer) {
      state.observer.disconnect();
      state.observer = null;
    }
  }

  // --------------------------------------------------------------------------
  // PUBLIC API
  // --------------------------------------------------------------------------
  return Object.freeze({
    aiActive: () => state.activeAI,
    sessionId: () => state.sessionId,
    threadId: () => state.threadId,
    scanDom,
    start,
    stop,
    captureMessage
  });
}
