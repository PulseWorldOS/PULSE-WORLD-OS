// ============================================================================
// FILE: /PULSE-PAL/PulsePalPersonaEngine-v30+++.js
// PULSE OS — v30 IMMORTAL+++
// PULSE‑PAL PERSONA ENGINE — MULTI-BAND TRAITS + TONE + CONTINUITY + IDENTITY + CIV
// BRIDGE‑FREE • DAEMON‑FREE • PRESENCE‑REAL
// ============================================================================

import { PulsePalMemory } from "./PulsePalMemory-v30.js";
import { PulsePalSpeech } from "./PulsePalSpeech-v30.js";

import { PulsePalIdentity } from "./PulsePalIdentity-v30.js";
import { PulsePalSettings } from "./PulsePalSettings-v30.js";
import { PulsePalWorld } from "./PulsePalWorld-v30.js";
import { PulsePalPresence } from "./PulsePalPresence-v30.js";
import { PulsePalPersonaV30 as PulsePalPersona } from "./PulsePalPersona-v30.js";
import { PulsePalModeEngine } from "./PulsePalModeEngine-v30.js";

// REAL organs only
const CorePresence = PulsePalPresence;
const CoreMemory   = PulsePalMemory;
const CoreSettings = PulsePalSettings;
const CoreWorld    = PulsePalWorld;
const CoreSpeech   = PulsePalSpeech;
const CorePersona  = PulsePalPersona;

// REAL identity snapshot
const getIdentity = () => {
  try { return PulsePalIdentity.getSnapshot() || {}; }
  catch { return {}; }
};

// REAL mode snapshot
const getModeSnapshot = () => {
  try { return PulsePalModeEngine.getLast() || null; }
  catch { return null; }
};

// REAL memory engine snapshot
const getMemoryEngineSnapshot = () => {
  try { return CoreMemory.engine.snapshot() || null; }
  catch { return null; }
};

// REAL persona-v30 snapshot
const getPersonaV30Snapshot = () => {
  try { return CorePersona.getLast() || null; }
  catch { return null; }
};

// ============================================================================
// PERSONA ENGINE CORE — IMMORTAL+++
// ============================================================================

export const PulsePalPersonaEngineCore = {
  lastSnapshot: null,

  compute(context = {}) {
    // -----------------------------------------------------------------------
    // REAL SURFACES
    // -----------------------------------------------------------------------
    const memoryPersona  = CoreMemory.persona()      || {};
    const memoryTone     = CoreMemory.tone()         || {};
    const relationship   = CoreMemory.relationship() || {};
    const presence       = CorePresence.snapshot()   || {};
    const identity       = getIdentity()                || {};
    const speechMessages = CoreSpeech.messages()     || [];

    // -----------------------------------------------------------------------
    // ENGINE SURFACES
    // -----------------------------------------------------------------------
    const memEngine      = getMemoryEngineSnapshot()    || {};
    const modeSnapshot   = getModeSnapshot()            || {};
    const personaV30     = getPersonaV30Snapshot()      || {};

    const timeline       = memEngine.timeline   || [];
    const entities       = memEngine.entities   || {};
    const topics         = memEngine.topics     || {};
    const continuityE    = memEngine.continuity || {};
    const modeE          = memEngine.mode       || {};

    // -----------------------------------------------------------------------
    // WORLD SURFACES
    // -----------------------------------------------------------------------
    const worldState     = CoreWorld.state()   || {};
    const worldTime      = CoreWorld.time()    || {};
    const worldMemory    = CoreWorld.memory()  || {};

    // -----------------------------------------------------------------------
    // COMPUTE SUB‑SURFACES
    // -----------------------------------------------------------------------
    const personaLattice = PulsePalPersonaEngineCore.buildPersonaLattice({
      memoryPersona,
      relationship,
      presence
    });

    const tone = PulsePalPersonaEngineCore.buildToneSnapshot({
      memoryTone,
      presence,
      lastMessage: speechMessages[speechMessages.length - 1]
    });

    const behavior = PulsePalPersonaEngineCore.buildBehaviorSnapshot({
      speechMessages,
      relationship
    });

    const continuity = PulsePalPersonaEngineCore.buildContinuitySnapshot({
      timeline,
      topics,
      continuityE,
      worldState,
      worldMemory
    });

    const identitySnapshot = PulsePalPersonaEngineCore.buildIdentitySnapshot({
      identity,
      relationship
    });

    const form = PulsePalPersonaEngineCore.buildFormSnapshot({
      memoryPersona,
      presence
    });

    const mode = PulsePalPersonaEngineCore.buildModeSnapshot({
      presence,
      memoryPersona,
      modeSnapshot,
      modeE
    });

    const civPersona = PulsePalPersonaEngineCore.buildCivPersonaSnapshot({
      worldState,
      worldTime,
      worldMemory
    });

    // -----------------------------------------------------------------------
    // FINAL SNAPSHOT
    // -----------------------------------------------------------------------
    const snapshot = {
      version: "v30-IMMORTAL+++",
      persona: {
        warmth: personaLattice.social.warmth,
        focus: personaLattice.cognitive.focus,
        expressiveness: personaLattice.social.expressiveness,
        trustLevel: personaLattice.social.trustLevel,
        palWeight: personaLattice.social.palWeight,
        tags: personaLattice.tags,
        bands: personaLattice.bands,
        form,
        mode
      },
      tone,
      behavior,
      continuity,
      civPersona,
      identity: identitySnapshot,
      lastComputeAt: new Date().toISOString()
    };

    PulsePalPersonaEngineCore.lastSnapshot = snapshot;
    return snapshot;
  },

  // ========================================================================
  // PERSONA LATTICE — IMMORTAL+++
  // ========================================================================
  buildPersonaLattice({ memoryPersona, relationship, presence }) {
    const warmth =
      memoryPersona.warmth ??
      (presence.tone === "warm" ? 1 : 0.6);

    const focus =
      memoryPersona.focus ??
      (presence.activity === "focused" ? 1 : 0.6);

    const expressiveness =
      memoryPersona.expressiveness ||
      presence.expression ||
      "medium";

    const trustLevel =
      relationship.trustLevel ??
      relationship.score ??
      0.5;

    const tags = Array.isArray(memoryPersona.tags)
      ? memoryPersona.tags
      : memoryPersona.tags
      ? [memoryPersona.tags]
      : [];

    const abstractionLevel =
      memoryPersona.abstractionLevel ?? 0.7;

    const planningDepth =
      memoryPersona.planningDepth ?? 0.6;

    const complexityPreference =
      memoryPersona.complexityPreference ?? 0.7;

    const riskAppetite =
      memoryPersona.riskAppetite ?? 0.5;

    const cooperationBias =
      memoryPersona.cooperationBias ?? 0.7;

    const explorationDrive =
      memoryPersona.explorationDrive ?? 0.8;

    const form =
      memoryPersona.form ||
      presence.form ||
      "human";

    const archetype =
      memoryPersona.archetype ||
      (form === "fox" ? "trickster" : "guardian");

    const tricksterLevel =
      memoryPersona.tricksterLevel ??
      (form === "fox" ? 0.8 : 0.3);

    const guardianLevel =
      memoryPersona.guardianLevel ??
      (form === "human" ? 0.8 : 0.4);

    return {
      social: {
        warmth,
        trustLevel,
        expressiveness,
        palWeight: 0.5
      },
      cognitive: {
        focus,
        abstractionLevel,
        planningDepth,
        complexityPreference
      },
      game: {
        riskAppetite,
        cooperationBias,
        explorationDrive
      },
      mythic: {
        form,
        archetype,
        tricksterLevel,
        guardianLevel
      },
      tags,
      bands: {
        social: { warmth, trustLevel, expressiveness },
        cognitive: { focus, abstractionLevel, planningDepth, complexityPreference },
        game: { riskAppetite, cooperationBias, explorationDrive },
        mythic: { form, archetype, tricksterLevel, guardianLevel }
      }
    };
  },

  // ========================================================================
  // TONE SNAPSHOT — IMMORTAL+++
  // ========================================================================
  buildToneSnapshot({ memoryTone, presence, lastMessage }) {
    return {
      baseline: memoryTone.baseline || presence.tone || "neutral",
      lastUserTone: memoryTone.lastUserTone || lastMessage.tone || "neutral",
      band: memoryTone.band || presence.band || "companion",
      energy: memoryTone.energy || presence.energy || "balanced",
      focus: memoryTone.focus || presence.focus || "general",
      aura: presence.aura || "calm",
      activity: presence.activity || "active",
      lastMessageText: lastMessage.text || "",
      lastMessageRole: lastMessage.role || "unknown"
    };
  },

  // ========================================================================
  // BEHAVIOR SNAPSHOT — IMMORTAL+++
  // ========================================================================
  buildBehaviorSnapshot({ speechMessages, relationship }) {
    const recent = speechMessages.slice(-20);
    const questionCount = recent.filter(m => m.text.includes("?")).length;

    const avgLength =
      recent.length > 0
        ? recent.reduce((s, m) => s + (m.text.length || 0), 0) / recent.length
        : 0;

    const relationalBand = relationship.band || "neutral";

    const styleHint =
      avgLength > 220 ? "long_form"
      : avgLength > 80 ? "medium_form"
      : "short_form";

    return {
      engagement: Math.min(1, speechMessages.length / 200),
      questionRate: recent.length > 0 ? questionCount / recent.length : 0,
      avgMessageLength: avgLength,
      relationalBand,
      styleHint,
      verbosityPolicy: styleHint === "long_form" ? "high" : styleHint === "medium_form" ? "medium" : "low",
      initiativePolicy: speechMessages.length > 60 ? "high" : speechMessages.length > 20 ? "medium" : "low",
      challengePolicy: relationalBand === "trusted" ? "medium" : "low"
    };
  },

  // ========================================================================
  // CONTINUITY SNAPSHOT — IMMORTAL+++
  // ========================================================================
  buildContinuitySnapshot({ timeline, topics, continuityE, worldState, worldMemory }) {
    const historyScore = continuityE.score || 0;

    const baseScore =
      (timeline.length || 0) +
      Object.keys(topics || {}).length * 5;

    const continuityScore = baseScore + historyScore;

    const worldDrift = worldState.driftScore ?? 0;
    const worldContinuity = Math.max(0, 100 - worldDrift);

    const projectContinuity =
      worldMemory.projects
        ? Object.keys(worldMemory.projects).length * 5
        : 0;

    const identityContinuity =
      Math.round((continuityScore * 0.5) + (projectContinuity * 0.3) + (worldContinuity * 0.2));

    return {
      historyScore,
      continuityScore,
      messagesScanned: timeline.length,
      worldContinuity,
      projectContinuity,
      identityContinuity
    };
  },

  // ========================================================================
  // IDENTITY SNAPSHOT — IMMORTAL+++
  // ========================================================================
  buildIdentitySnapshot({ identity, relationship }) {
    return {
      uid: identity.uid || null,
      identityVersion: identity.identityVersion || null,
      presenceBand: identity.presenceBand || relationship.band || "unknown",
      advantageBand: identity.advantageBand || "neutral",
      earnBand: identity.earnBand || "unknown",
      deviceTrusted: identity.deviceTrusted ?? null,
      sessionAge: identity.sessionAge ?? null,
      binarySignature: identity.binarySignature || null,
      presenceSignature: identity.presenceSignature || null,
      relationshipBand: relationship.band || null
    };
  },

  // ========================================================================
  // FORM SNAPSHOT — IMMORTAL+++
  // ========================================================================
  buildFormSnapshot({ memoryPersona, presence }) {
    const form =
      memoryPersona.form ||
      presence.form ||
      "human";

    return {
      form,
      modeFormBias:
        form === "fox" ? "playful"
        : form === "human" ? "grounded"
        : "neutral"
    };
  },

  // ========================================================================
  // MODE SNAPSHOT — IMMORTAL+++
  // ========================================================================
  buildModeSnapshot({ presence, memoryPersona, modeSnapshot, modeE }) {
    const activeMode =
      modeSnapshot.activeMode ||
      modeE.activeMode ||
      presence.mode ||
      presence.activeMode ||
      memoryPersona.activeMode ||
      "advisor";

    const influence =
      modeSnapshot.weights ||
      modeE.influence ||
      memoryPersona.modeWeights ||
      {};

    return {
      activeMode,
      influence
    };
  },

  // ========================================================================
  // CIV PERSONA SNAPSHOT — IMMORTAL+++
  // ========================================================================
  buildCivPersonaSnapshot({ worldState, worldTime, worldMemory }) {
    return {
      governanceStyle: worldState.governanceStyle || "builder",
      stabilityPreference: worldState.stabilityPreference ?? 0.7,
      innovationBias: worldState.innovationBias ?? 0.6,
      worlds: worldMemory.worlds || [],
      factions: worldMemory.factions || [],
      epochs: worldMemory.epochs || [
        {
          label: "default",
          tick: worldTime.tick || 0,
          cycle: worldTime.cycle || 0,
          epoch: worldTime.epoch || "v30"
        }
      ]
    };
  },

  getLastSnapshot() {
    return PulsePalPersonaEngineCore.lastSnapshot;
  }
};


// ============================================================================
// PUBLIC API
// ============================================================================

const _personaEngineInstance = PulsePalPersonaEngineCore;

export function computePulsePalPersona(context = {}) {
  return _personaEngineInstance.compute(context);
}

export function getLastPulsePalPersonaSnapshot() {
  return _personaEngineInstance.getLastSnapshot();
}

export const PulsePalPersonaEngine = {
  compute: computePulsePalPersona,
  getLast: getLastPulsePalPersonaSnapshot
};

try {
  PulseRealm.PulsePalPersonaEngine = PulsePalPersonaEngine;
} catch {}
