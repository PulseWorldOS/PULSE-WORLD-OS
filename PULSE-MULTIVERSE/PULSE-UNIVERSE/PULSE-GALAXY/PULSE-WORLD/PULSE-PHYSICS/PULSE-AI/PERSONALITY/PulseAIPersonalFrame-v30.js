// ============================================================================
//  PULSE OS v30‑IMMORTAL++ — PERSONAL FRAME ORGAN
//  User Preferences • Tone • Abstraction • Verbosity • Persona Routing
//  PURE READ-ONLY TO BINARY. GUARDED WRITES TO PERSONAL MEMORY LANES.
//  DUALBAND • TRUST-AWARE • ARTERY-AWARE • WINDOW-SAFE • DETERMINISTIC
//  META‑STRIPPED • IDENTITY‑PRESERVING • PULSE‑BINARY READY.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});





// ============================================================================
//  PACKET EMITTER — v30 deterministic, personal-frame-scoped (no PersonalFrameMeta)
// ============================================================================
function emitPersonalFramePacket(type, payload = {}) {
  return Object.freeze({
    packetType: `personal-frame-${type}`,
    timestamp: 0,
    layer: "personal-frame",
    role: "preferences",
    ...payload
  });
}

// Optional: PulseBinary / IndexedDB‑style adapter
async function writePulseBinaryLog(adapter, kind, payload) {
  if (!adapter || typeof adapter.write !== "function") return false;
  const safePayload = Object.freeze({ ...payload });
  const keySeed = `${kind}::${safePayload.packetType || "personal-frame"}::${safePayload.userId || ""}`;
  const docId = `pf-${Math.abs(
    keySeed.split("").reduce((a, c, i) => (a + c.charCodeAt(0) * (i + 1)) % 1000003, 0)
  )}`;
  return adapter.write(`PERSONAL_FRAME_LOGS/${docId}`, safePayload);
}

// ============================================================================
//  ARTERY SNAPSHOT — v30 IMMORTAL++ (meta stripped, identity preserved)
// ============================================================================
function buildPersonalArterySnapshot({ context = {}, profile = {} } = {}) {
  return Object.freeze({
    type: "personal-frame-artery",
    personaId: context.personaId || null,
    evolutionMode: context.evolutionMode || "passive",
    ownerMode: context.userIsOwner === true,
    tone: profile.tone,
    abstraction: profile.abstraction,
    verbosity: profile.verbosity,
    presenceTier: context.presenceTier || "idle",
    band: context.band || "symbolic"
  });
}

// ============================================================================
//  PREWARM — v30 IMMORTAL++
// ============================================================================
export function prewarmPersonalFrame({
  trace = false,
  context = {},
  trustFabric = null,
  juryFrame = null,
  pulseBinaryAdapter = null
} = {}) {
  const artery = buildPersonalArterySnapshot({
    context,
    profile: {
      tone: "neutral",
      abstraction: "medium",
      verbosity: "normal"
    }
  });

  const packet = emitPersonalFramePacket("prewarm", {
    message: "PersonalFrame prewarmed and personal artery aligned.",
    artery
  });

  trustFabric.recordPersonalFramePrewarm({ artery });
  juryFrame.recordEvidence("personal-frame-prewarm", packet);
  writePulseBinaryLog(pulseBinaryAdapter, "prewarm", packet);

  if (trace) console.log("[PersonalFrame v30] prewarm", packet);
  return packet;
}
// ============================================================================
//  AiPersonalFrame — IMMORTAL PSEUDO‑CLASS (v30‑IMMORTAL++)
// ============================================================================

export const AiPersonalFrame = (() => {

  // -------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
  // -------------------------------------------------------
  const lane = {
    memoryAPI: null,
    pulseBinaryAdapter: null,

    defaultProfile: {
      tone: "neutral",
      abstraction: "medium",
      verbosity: "normal",
      safetyMode: "standard",
      personaBias: null
    },

    personalArtery: {
      lastTone: "neutral",
      lastAbstraction: "medium",
      lastVerbosity: "normal",
      lastPresenceTier: "idle",
      lastBand: "symbolic"
    }
  };

  // -------------------------------------------------------
  // INIT SURFACE
  // -------------------------------------------------------
  const init = ({ memoryAPI, defaultProfile = {}, pulseBinaryAdapter = null } = {}) => {
    lane.memoryAPI = memoryAPI || null;
    lane.pulseBinaryAdapter = pulseBinaryAdapter || null;

    lane.defaultProfile = Object.freeze({
      ...lane.defaultProfile,
      ...defaultProfile
    });

    lane.personalArtery.lastTone = lane.defaultProfile.tone;
    lane.personalArtery.lastAbstraction = lane.defaultProfile.abstraction;
    lane.personalArtery.lastVerbosity = lane.defaultProfile.verbosity;
  };

  // -------------------------------------------------------
  // PERSONAL ARTERY SNAPSHOT
  // -------------------------------------------------------
  const snapshot = (extra = {}) =>
    emitPersonalFramePacket(
      "snapshot",
      Object.freeze({
        tone: lane.personalArtery.lastTone,
        abstraction: lane.personalArtery.lastAbstraction,
        verbosity: lane.personalArtery.lastVerbosity,
        presenceTier: lane.personalArtery.lastPresenceTier,
        band: lane.personalArtery.lastBand,
        ...extra
      })
    );

  // -------------------------------------------------------
  // LOAD PROFILE — lineage-aware, deterministic
  // -------------------------------------------------------
  const loadProfile = async (context) => {
    const userId = context.userId || null;
    if (!userId || !lane.memoryAPI.getPersonalProfile) {
      return lane.defaultProfile;
    }

    const stored = await lane.memoryAPI.getPersonalProfile(userId);
    const profile = Object.freeze({
      ...lane.defaultProfile,
      ...(stored || {})
    });

    lane.personalArtery.lastTone = profile.tone;
    lane.personalArtery.lastAbstraction = profile.abstraction;
    lane.personalArtery.lastVerbosity = profile.verbosity;

    const packet = emitPersonalFramePacket("load-profile", {
      userId,
      profile
    });

    writePulseBinaryLog(lane.pulseBinaryAdapter, "load-profile", packet);
    return profile;
  };

  // -------------------------------------------------------
  // UPDATE PROFILE — IMMORTAL++ safe
  // -------------------------------------------------------
  const updateProfile = async (context, patch = {}) => {
    const userId = context.userId || null;
    if (!userId || !lane.memoryAPI.setPersonalProfile) return null;

    const current = await loadProfile(context);
    const next = { ...current, ...patch };

    await lane.memoryAPI.setPersonalProfile(userId, next);

    lane.personalArtery.lastTone = next.tone;
    lane.personalArtery.lastAbstraction = next.abstraction;
    lane.personalArtery.lastVerbosity = next.verbosity;

    const packet = emitPersonalFramePacket("update-profile", {
      userId,
      profile: next
    });

    writePulseBinaryLog(lane.pulseBinaryAdapter, "update-profile", packet);
    return Object.freeze(next);
  };

  // -------------------------------------------------------
  // SHAPE OUTPUT — Tone Engine v6 + Abstraction v5 + Verbosity v5
  // -------------------------------------------------------
  const shapeOutput = async ({ context, text }) => {
    const profile = await loadProfile(context);
    const presenceTier = context.presenceTier || "idle";
    const band = context.band || "symbolic";

    let result = String(text || "");

    // Verbosity v5
    if (profile.verbosity === "terse" && result.length > 600) {
      result = result.slice(0, 600) + " …";
    }

    if (profile.verbosity === "detailed") {
      result += "\n\nIf you'd like a shorter version, I can condense it.";
    }

    // Tone Engine v6
    if (profile.tone === "warm") {
      result =
        presenceTier === "critical"
          ? `Let’s keep this steady — ${result}`
          : `Alright — ${result}`;
    }

    if (profile.tone === "direct") {
      result = result.replace(/(?:\.\s*)?$/, ".");
    }

    if (profile.tone === "formal") {
      result = result.replace(/\bhey\b/gi, "Greetings");
    }

    if (profile.tone === "playful" && presenceTier !== "critical") {
      result += " 😄";
    }

    // Abstraction v5
    if (profile.abstraction === "low") {
      result = simplify(result);
    }

    if (profile.abstraction === "high") {
      result = expand(result);
    }

    lane.personalArtery.lastPresenceTier = presenceTier;
    lane.personalArtery.lastBand = band;

    const artery = buildPersonalArterySnapshot({ context, profile });

    const packet = emitPersonalFramePacket("shape-output", {
      userId: context.userId || null,
      profile,
      presenceTier,
      band,
      artery
    });

    writePulseBinaryLog(lane.pulseBinaryAdapter, "shape-output", packet);

    return { text: result, profile, artery };
  };

  // -------------------------------------------------------
  // INTERNAL HELPERS
  // -------------------------------------------------------
  const simplify = (text) =>
    text
      .replace(/however,/gi, "but")
      .replace(/therefore,/gi, "so")
      .replace(/in summary/gi, "basically")
      .trim();

  const expand = (text) =>
    text +
    "\n\nTo expand further: this can be broken down into principles, context, and practical implications.";

  // -------------------------------------------------------
  // IMMORTAL EXPORT
  // -------------------------------------------------------
  return {
    init,
    loadProfile,
    updateProfile,
    shapeOutput,
    snapshot
  };

})();

// ============================================================================
//  createPersonalFrameOrgan — IMMORTAL PSEUDO‑CLASS WRAPPER (v30)
// ============================================================================
export const createPersonalFrameOrgan = (config = {}) => {
  // Initialize the IMMORTAL AiPersonalFrame organ
  AiPersonalFrame.init(config);

  // Return a frozen surface (no class, no instance)
  return Object.freeze({
    descriptor: Object.freeze({
      kind: "PersonalFrameOrgan",
      version: "v30",
      role: "preferences"
    }),

    async loadProfile(context) {
      return AiPersonalFrame.loadProfile(context);
    },

    async updateProfile(context, patch) {
      return AiPersonalFrame.updateProfile(context, patch);
    },

    async shapeOutput(payload) {
      return AiPersonalFrame.shapeOutput(payload);
    },

    arterySnapshot(extra) {
      return AiPersonalFrame.snapshot(extra);
    }
  });
};


PulseRealm.AIPersonalFrame = {
    AiPersonalFrame,
    createPersonalFrameOrgan,
    prewarmPersonalFrame
}
