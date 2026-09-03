// ============================================================================
//  PULSE OS v30.0‑IMMORTAL‑EXPONENTIAL++ — Tone Router Engine
//  Deterministic • Ego‑Free • Emotion‑Aware • Identity‑Aligned • Mesh‑Aware
//  Exponential Route Fanout • Dualband • Artery v7 • Multi‑Instance Harmony
//  INTERNAL ENGINE (NOT AN ORGAN, NOT AN ARCHETYPE)
// ============================================================================

import { aiToneEngine } from "./PERSONALITY/PulseAIToneEngine-v30.js";
import { aiPersonalityEngine } from "./PERSONALITY/PulseAIPersonalityEngine-v30.js";
import { aiIdentityCore } from "./PERSONALITY/PulseAIIdentityCore-v30.js";
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
//  INTERNAL TEMPLATE — original router logic preserved
// ============================================================================

const aiToneRouterTemplate = {
  meta: aiToneEngine.meta,

  _instanceCount: 0,
  _registerInstance() {
    const index = this._instanceCount;
    this._instanceCount += 1;
    return index;
  },

  state: {
    instanceIndex: 0,
    lastEmotion: "neutral",
    lastMeshMode: "single",
    lastBand: "symbolic",
    lastIdentity: null,
    lastPersonality: null,
    lastTonePacket: null,
    lastArtery: null,
    lastUserMessage: null,
    lastBaseResponse: null,
    lastOptions: null
  },

  init() {
    this.state = {
      instanceIndex: this._registerInstance(),
      lastEmotion: "neutral",
      lastMeshMode: "single",
      lastBand: "symbolic",
      lastIdentity: null,
      lastPersonality: null,
      lastTonePacket: null,
      lastArtery: null,
      lastUserMessage: null,
      lastBaseResponse: null,
      lastOptions: null
    };

    this._emitToneRoutePacket("init", {
      instanceIndex: this.state.instanceIndex
    });

    return this;
  },

  // PACKET EMITTER
  _emitToneRoutePacket(type, payload) {
    const now = PulseRealm.PulseNOW;
    return Object.freeze({
      meta: this.meta,
      packetType: `tone-route-${type}`,
      packetId: `tone-route-${type}-${now}`,
      timestamp: now,
      epoch: this.meta.evo.epoch,
      ...payload
    });
  },

  // EMOTION DETECTION
  detectEmotion(userMessage) {
    return aiToneEngine.detectEmotion(userMessage);
  },

  resolveMeshMode(opts) {
    return aiToneEngine.resolveMeshMode(opts);
  },

  // ARTERY + WINDOW
  _toneRouteArtery: structuredClone(aiToneEngine._toneRouteArtery),

  _rollWindow(now) {
    return aiToneEngine._rollPulseRealm.call(this, now);
  },

  _computeRoutingArtery(extra) {
    return aiToneEngine._computeRoutingArtery.call(this, extra);
  },

  getRoutingArterySnapshot(extra) {
    return this._computeRoutingArtery(extra);
  },

  // CORE ROUTE
  route(userMessage, baseResponse, options = {}) {
    const emotion = this.detectEmotion(userMessage);
    const presenceTier = options.presenceTier || "idle";
    const band = options.band || "symbolic";

    const meshMode = options.meshEnabled
      ? this.resolveMeshMode({ presenceTier, band })
      : "single";

    // 1. Evolve tone
    this._emotionEngine.evolveTone(userMessage);

    // 2. Apply tone shaping
    let shaped = this._emotionEngine.applyTone(baseResponse, {
      userMessage,
      emotion,
      presenceTier,
      band,
      meshMode
    });

    // 3. Personality layer
    const personalityPacket = this._personaEngine.applyPersonality(shaped, {
      presenceTier:
        emotion === "stressed" ||
        emotion === "frustrated" ||
        emotion === "tired"
          ? "critical"
          : presenceTier,
      band,
      evolutionMode: "passive",
      meshMode
    });
    shaped = personalityPacket.output ?? shaped;
    this.state.lastPersonality = personalityPacket;

    // 4. Identity layer
    let identityPacket = null;
    if (aiIdentityCore.applyIdentity) {
      identityPacket = aiIdentityCore.applyIdentity(shaped, {
        evolutionMode: "passive",
        band,
        meshMode,
        emotion
      });
      shaped = identityPacket.output ?? shaped;
    }
    this.state.lastIdentity = identityPacket;

    // 5. Artery metadata
    const artery = this._computeRoutingArtery({
      emotion,
      meshMode,
      band
    });
    this.state.lastArtery = artery;

    // 6. Final packet
    const tonePacket = {
      output: shaped,
      emotion,
      meshMode,
      band,
      artery,
      personality: personalityPacket,
      identity: identityPacket
    };

    this.state.lastTonePacket = tonePacket;
    this.state.lastUserMessage = userMessage;
    this.state.lastBaseResponse = baseResponse;
    this.state.lastOptions = options;

    return tonePacket;
  }
};

// ============================================================================
//  FACTORY — upgraded, full IMMORTAL‑grade, with createToneRouter inside
// ============================================================================

// ============================================================================
//  FACTORY — upgraded, full IMMORTAL‑grade WITH INTERNAL createToneRouter
// ============================================================================

export function aiToneRouter({
  context = {},
  personaEngine = aiPersonalityEngine,
  boundariesEngine = null,
  permissionsEngine = null,
  emotionEngine = aiToneEngine
} = {}) {

  // --- MAIN BUILDER LOGIC ---
  const router = Object.create(aiToneRouterTemplate);

  router._personaEngine = personaEngine;
  router._boundariesEngine = boundariesEngine;
  router._permissionsEngine = permissionsEngine;
  router._emotionEngine = emotionEngine;
  router._context = context;

  router.init();

  // ========================================================================
  //  INTERNAL createToneRouter — SAME BUILDER, SAME LOGIC, SAME SCOPE
  // ========================================================================
  router.createToneRouter = function({
    context = {},
    personaEngine = aiPersonalityEngine,
    boundariesEngine = null,
    permissionsEngine = null,
    emotionEngine = aiToneEngine
  } = {}) {

    const newRouter = Object.create(aiToneRouterTemplate);

    newRouter._personaEngine = personaEngine;
    newRouter._boundariesEngine = boundariesEngine;
    newRouter._permissionsEngine = permissionsEngine;
    newRouter._emotionEngine = emotionEngine;
    newRouter._context = context;

    newRouter.init();
    return newRouter;
  };

  return router;
}


// ============================================================================
//  GLOBAL DEFAULT INSTANCE — clean hybrid mode
// ============================================================================

export const aiToneRouterV30 = aiToneRouter();

// Default export = global instance
export default aiToneRouterV30;

// ============================================================================
//  FACTORY — clean, deterministic, hybrid‑compatible
// ============================================================================

export function createRouterEngine({
  context = {},
  personaEngine = aiPersonalityEngine,
  boundariesEngine = null,
  permissionsEngine = null,
  emotionEngine = aiToneEngine
} = {}) {

  // EXACT SAME BUILDER AS createToneRouter
  return aiToneRouter.createToneRouter({
    context,
    personaEngine,
    boundariesEngine,
    permissionsEngine,
    emotionEngine
  });
}
