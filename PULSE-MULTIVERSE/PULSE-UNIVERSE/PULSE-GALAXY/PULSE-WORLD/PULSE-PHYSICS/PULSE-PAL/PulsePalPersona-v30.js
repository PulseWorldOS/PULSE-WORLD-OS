// ============================================================================
// FILE: /PULSE-PAL/PulsePalPersona-v30.js
// PULSE OS — v30 IMMORTAL+++
// PULSE‑PAL PERSONA ENGINE — PURE, BRIDGE‑FREE, DAEMON‑FREE, PRESENCE‑REAL
// ============================================================================
//
// ROLE:
//   Computes persona from ONLY:
//     • CoreMemory (persona, tone, relationship, semantic engine snapshot)
//     • CoreSpeech (messages)
//     • CorePresence (tone, activity, expression, mode)
//     • PulsePalIdentity (real identity organ)
//   NO ModeEngine imports
//   NO PersonaEngine imports
//   NO MemoryEngine imports
//   NO bridge
//   NO daemon
//
// CONTRACT:
//   • Pure compute organ
//   • Deterministic
//   • Zero side effects except CoreMemory.setPersona*
// ============================================================================

import { PulsePalMemory } from "./PulsePalMemory-v30.js";
import { PulsePalSpeech } from "./PulsePalSpeech-v30.js";
import { PulsePalPresenceCoreV30 as CorePresence } from "./PulsePalPresenceCore-v30.js";
import { PulsePalIdentity } from "./PulsePalIdentity-v30.js";


// REAL organs only
const CoreMemory = PulsePalMemory;
const CoreSpeech = PulsePalSpeech;

// Identity snapshot (real, not bridge)
const getIdentity = () => {
  try { return PulsePalIdentity.getSnapshot() || {}; }
  catch { return {}; }
};

// ============================================================================
// PERSONA ENGINE — IMMORTAL+++
// ============================================================================
// ============================================================================
//  PulsePalPersona — IMMORTAL PSEUDO-CLASS (v31-IMMORTAL+++)
// ============================================================================

export const PulsePalPersona = (() => {
  // ------------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
// ------------------------------------------------------------
  const lane = {
    CorePresence: null,
    CoreSpeech: null,
    CoreMemory: null,
    getIdentityFn: null,
    snapshot: {
      version: "v30-IMMORTAL+++",
      persona: {},
      tone: {},
      behavior: {},
      continuity: {},
      identity: {},
      mode: {},
      lastComputeAt: null
    }
  };

  // ------------------------------------------------------------
  // INIT (inject real cores instead of globals)
// ------------------------------------------------------------
  const init = ({ CorePresence, CoreSpeech, CoreMemory, getIdentity }) => {
    lane.CorePresence = CorePresence;
    lane.CoreSpeech = CoreSpeech;
    lane.CoreMemory = CoreMemory;
    lane.getIdentityFn = typeof getIdentity === "function" ? getIdentity : () => ({});
  };

  const snapshot = () => ({ ...lane.snapshot });

  // ------------------------------------------------------------
  // CORE COMPUTE
  // ------------------------------------------------------------
  const compute = () => {
    const CorePresence = lane.CorePresence;
    const CoreSpeech = lane.CoreSpeech;
    const CoreMemory = lane.CoreMemory;
    const getIdentity = lane.getIdentityFn;

    const presence      = CorePresence.snapshot() || {};
    const speech        = CoreSpeech.messages() || [];
    const memoryPersona = CoreMemory.persona()  || {};
    const memoryTone    = CoreMemory.tone()     || {};
    const relationship  = CoreMemory.relationship() || {};
    const identity      = getIdentity() || {};

    const memEngine = CoreMemory.engine.snapshot() || {};

    const timeline    = memEngine.timeline   || [];
    const entities    = memEngine.entities   || {};
    const topics      = memEngine.topics     || {};
    const continuityE = memEngine.continuity || {};
    const modeE       = memEngine.mode       || {};

    const persona = computePersonaTraits({
      timeline,
      entities,
      topics,
      presence,
      speech,
      memoryPersona,
      relationship,
      modeE
    });

    const tone = computeToneProfile({
      presence,
      speech,
      memoryTone,
      modeE
    });

    const behavior = computeBehaviorProfile({
      persona,
      tone,
      speech,
      relationship
    });

    const continuity = computeContinuityProfile({
      timeline,
      topics,
      continuityE
    });

    const mode = computeModeProfile({
      presence,
      topics,
      modeE
    });

    const identitySnapshot = computeIdentityProfile({
      identity,
      relationship,
      persona,
      tone,
      mode
    });

    lane.snapshot = {
      version: "v30-IMMORTAL+++",
      persona,
      tone,
      behavior,
      continuity,
      identity: identitySnapshot,
      mode,
      lastComputeAt: PulseRealm.PulseNOW
    };

    try { CoreMemory.setPersona(lane.snapshot); } catch {}
    try { CoreMemory.setPersonaV30(lane.snapshot); } catch {}

    return lane.snapshot;
  };

  // ========================================================================
  // PERSONA TRAITS — IMMORTAL+++
// ========================================================================
  const computePersonaTraits = ({
    timeline,
    entities,
    topics,
    presence,
    speech,
    memoryPersona,
    relationship,
    modeE
  }) => {
    const totalMessages = speech.length;
    const emotionalWords = countEmotionalWords(speech);

    const activeMode =
      modeE.activeMode ||
      presence.mode ||
      presence.activeMode ||
      "advisor";

    const modeWeights = modeE.influence || {};

    const warmth =
      memoryPersona.warmth ??
      (presence.tone === "warm"
        ? 1
        : emotionalWords > 5
        ? 0.8
        : 0.5);

    const focus =
      memoryPersona.focus ??
      (presence.activity === "focused"
        ? 1
        : (topics.world || 0) > 3
        ? 0.8
        : 0.5);

    const expressiveness =
      memoryPersona.expressiveness ||
      presence.expression ||
      "medium";

    const curiosity =
      (topics.world || 0) +
      (topics.tasks || 0) +
      (topics.memory || 0) > 5
        ? "high"
        : "medium";

    const conversationalDepth =
      totalMessages > 40 ? "deep"
      : totalMessages > 15 ? "medium"
      : "light";

    const emotionalAttunement =
      emotionalWords > 15 ? "very_high"
      : emotionalWords > 8 ? "high"
      : "medium";

    const trustLevel =
      relationship.trustLevel ??
      relationship.score ??
      0.5;

    const tags = Array.isArray(memoryPersona.tags)
      ? memoryPersona.tags
      : memoryPersona.tags
      ? [memoryPersona.tags]
      : [];

    return {
      warmth,
      focus,
      expressiveness,
      curiosity,
      conversationalDepth,
      emotionalAttunement,
      trustLevel,
      tags,
      modeInfluence: modeWeights,
      activeMode
    };
  };

  // ========================================================================
  // TONE PROFILE — IMMORTAL+++
// ========================================================================
  const computeToneProfile = ({ presence, speech, memoryTone, modeE }) => {
    const last = speech[speech.length - 1];

    let baseline =
      memoryTone.baseline ||
      presence.tone ||
      "neutral";

    const activeMode =
      modeE.activeMode ||
      presence.mode ||
      presence.activeMode ||
      "advisor";

    if (activeMode === "grid" || activeMode === "architect") {
      if (baseline === "warm") baseline = "neutral";
      if (baseline === "neutral") baseline = "technical";
    }

    return {
      baseline,
      lastUserTone: memoryTone.lastUserTone || last.tone || "neutral",
      lastMessage: last.text || "",
      activity: presence.activity || "active",
      expression: presence.expression || "medium",
      band: memoryTone.band || presence.band || "companion",
      energy: memoryTone.energy || presence.energy || "balanced",
      focus: memoryTone.focus || presence.focus || "general",
      activeMode
    };
  };

  // ========================================================================
  // BEHAVIOR PROFILE — IMMORTAL+++
// ========================================================================
  const computeBehaviorProfile = ({ persona, tone, speech, relationship }) => {
    const recent = speech.slice(-20);
    const questionCount = recent.filter(m => m.text.includes("?")).length;

    const avgLength =
      recent.length > 0
        ? recent.reduce((sum, m) => sum + (m.text.length || 0), 0) / recent.length
        : 0;

    let replyStyle =
      persona.warmth > 0.8
        ? "warm"
        : persona.focus > 0.8
        ? "precise"
        : "balanced";

    const activeMode = tone.activeMode;

    if (activeMode === "grid" || activeMode === "architect") replyStyle = "structured";
    if (activeMode === "entrepreneur") replyStyle = "energetic";
    if (activeMode === "finality") replyStyle = "concise";
    if (activeMode === "fox") replyStyle = "playful";
    if (activeMode === "human") replyStyle = "grounded";

    return {
      replySpeed: tone.activity === "active" ? "fast" : "steady",
      replyStyle,
      detailLevel: persona.conversationalDepth === "deep" ? "high" : "medium",
      emotionalMirroring:
        persona.emotionalAttunement === "very_high"
          ? "very_strong"
          : persona.emotionalAttunement === "high"
          ? "strong"
          : "moderate",
      questionRate: recent.length > 0 ? questionCount / recent.length : 0,
      avgMessageLength: avgLength,
      relationalBand: relationship.band || "neutral"
    };
  };

  // ========================================================================
  // CONTINUITY PROFILE — IMMORTAL+++
// ========================================================================
  const computeContinuityProfile = ({ timeline, topics, continuityE }) => {
    const historyScore = continuityE.score || 0;

    const baseScore =
      (timeline.length || 0) +
      Object.keys(topics || {}).length * 5;

    const continuityScore = baseScore + historyScore;

    return {
      memoryStrength:
        timeline.length > 80 ? "very_strong"
        : timeline.length > 40 ? "strong"
        : "medium",
      topicAnchors: Object.keys(topics || {}),
      continuityScore,
      historyScore,
      messagesScanned: timeline.length
    };
  };

  // ========================================================================
  // MODE PROFILE — IMMORTAL+++
// ========================================================================
  const computeModeProfile = ({ presence, topics, modeE }) => {
    const activeMode =
      modeE.activeMode ||
      presence.mode ||
      presence.activeMode ||
      "advisor";

    const influence =
      modeE.influence ||
      {
        grid: topics.grid || 0,
        architect: topics.architect || 0,
        earn: topics.earn || 0,
        tourist: topics.tourist || 0,
        fox: topics.fox || 0
      };

    return {
      activeMode,
      influence
    };
  };

  // ========================================================================
  // IDENTITY PROFILE — IMMORTAL+++
// ========================================================================
  const computeIdentityProfile = ({ identity, relationship, persona, tone, mode }) => ({
    version: identity.version || "v30 IMMORTAL+++",
    lineage: identity.lineage || "Pulse‑OS Evolutionary",
    codename: identity.codename || "Pulse‑Pal Companion",
    presenceBand: identity.presenceBand || relationship.band || "unknown",
    deviceTrusted: identity.deviceTrusted ?? null,
    personaSignature: {
      warmth: persona.warmth,
      focus: persona.focus,
      expressiveness: persona.expressiveness,
      curiosity: persona.curiosity,
      baselineTone: tone.baseline,
      activeMode: mode.activeMode,
      modeInfluence: mode.influence
    }
  });

  // ========================================================================
  // EMOTIONAL WORD COUNTER
  // ========================================================================
  const countEmotionalWords = (speech) => {
    const emotional = [
      "love","hate","feel","sad","happy","angry","excited","scared",
      "worried","proud","anxious","calm","overwhelmed","grateful"
    ];
    let count = 0;

    for (const msg of speech) {
      if (!msg.text) continue;
      const lower = msg.text.toLowerCase();
      for (const w of emotional) {
        if (lower.includes(w)) count++;
      }
    }

    return count;
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    init,
    compute,
    snapshot,
    computePersonaTraits,
    computeToneProfile,
    computeBehaviorProfile,
    computeContinuityProfile,
    computeModeProfile,
    computeIdentityProfile,
    countEmotionalWords
  };
})();

// ============================================================================
// PUBLIC API
// ============================================================================

const _personaV30Instance = PulsePalPersona;

export function computePulsePalPersonaV30() {
  return _personaV30Instance.compute();
}

export function getLastPulsePalPersonaSnapshotV30() {
  return _personaV30Instance.snapshot;
}

export const PulsePalPersonaV30 = {
  compute: computePulsePalPersonaV30,
  getLast: getLastPulsePalPersonaSnapshotV30
};

try {
  PulseRealm.PulsePalPersonaV30 = PulsePalPersonaV30;
} catch {}
