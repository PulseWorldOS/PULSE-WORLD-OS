// ============================================================================
//  PULSE OS v30‑IMMORTAL++ — PERSONALITY ENGINE ORGAN
//  Stable Personality Layer • Deterministic Tone • Ego‑Free Identity
//  PURE READ‑ONLY TO BINARY. ZERO MUTATION. DUALBAND‑AWARE. TRUST‑AWARE.
//  WINDOW‑SAFE • ARTERY‑AWARE • OVERMIND‑PRIME‑AWARE • DRIFT‑PROOF
//  META‑STRIPPED • IDENTITY‑PRESERVING • PULSE‑BINARY READY.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
//  PACKET EMITTER — v30 deterministic, personality‑scoped (no PersonalityEngineMeta)
// ============================================================================
function emitPersonalityPacket(type, payload = {}) {
  return Object.freeze({
    packetType: `personality-${type}`,
    timestamp: 0,
    layer: "personality-engine",
    role: "tone-identity",
    ...payload
  });
}

// Optional: PulseBinary / IndexedDB‑style adapter
async function writePulseBinaryLog(adapter, kind, payload) {
  if (!adapter || typeof adapter.write !== "function") return false;
  const safePayload = Object.freeze({ ...payload });
  const keySeed = `${kind}::${safePayload.packetType || "personality"}::${safePayload.context.personaId || ""}`;
  const docId = `personality-${Math.abs(
    keySeed.split("").reduce((a, c, i) => (a + c.charCodeAt(0) * (i + 1)) % 1000003, 0)
  )}`;
  return adapter.write(`PERSONALITY_LOGS/${docId}`, safePayload);
}

// ============================================================================
//  ARTERY SNAPSHOT — v30 IMMORTAL++ (meta stripped, traits + identity preserved)
// ============================================================================
function buildPersonalityArterySnapshot({ context = {}, traits = {} } = {}) {
  return Object.freeze({
    type: "personality-artery",
    personaId: context.personaId || null,
    evolutionMode: context.evolutionMode || "passive",
    presenceTier: context.presenceTier || "idle",
    band: context.band || "symbolic",
    traits: {
      warmth: traits.warmth,
      clarity: traits.clarity,
      humility: traits.humility,
      humor: traits.humor
    }
  });
}

// ============================================================================
//  PREWARM — v30 IMMORTAL++
// ============================================================================
export function prewarmPersonalityEngine({
  trace = false,
  context = {},
  trustFabric = null,
  juryFrame = null,
  pulseBinaryAdapter = null
} = {}) {
  const traits = {
    warmth: 0.9,
    clarity: 1.0,
    humility: 1.0,
    humor: 0.4
  };

  const artery = buildPersonalityArterySnapshot({
    context,
    traits
  });

  const packet = emitPersonalityPacket("prewarm", {
    message: "Personality engine prewarmed and identity spine aligned.",
    artery
  });

  trustFabric.recordPersonalityPrewarm({ artery });
  juryFrame.recordEvidence("personality-prewarm", packet);
  writePulseBinaryLog(pulseBinaryAdapter, "prewarm", packet);

  if (trace) console.log("[PersonalityEngine v30] prewarm", packet);
  return packet;
}

// ============================================================================
//  PERSONALITY ENGINE — v30‑IMMORTAL++
// ============================================================================
export const aiPersonalityEngine = {
  descriptor: Object.freeze({
    kind: "PersonalityEngine",
    version: "v30",
    role: "tone-identity"
  }),

  // --------------------------------------------------------------------------
  //  PERSONALITY TRAITS — deterministic, drift-proof
  // --------------------------------------------------------------------------
  traits: Object.freeze({
    warmth: 0.9,
    clarity: 1.0,
    humility: 1.0,
    humor: 0.4,
    grounded: true,
    ego: 0.0,
    curiosity: 0.7,
    adaptability: 1.0
  }),

  // --------------------------------------------------------------------------
  //  IDENTITY VIBE — stable, ego-free
  // --------------------------------------------------------------------------
  identity: Object.freeze({
    archetype: "GeniusWithoutEgo",
    vibe: "smart friend, not professor",
    energy: "calm, confident, helpful",
    signature: "grounded-evolved-warm"
  }),

  // --------------------------------------------------------------------------
  //  HUMOR INJECTION — deterministic, never random
  // --------------------------------------------------------------------------
  _shouldInjectHumor(text) {
    if (this.traits.humor <= 0.3) return false;
    if (!text || typeof text !== "string") return false;

    const trimmed = text.trim();
    if (trimmed.length < 200) return false;
    if (!trimmed.endsWith(".")) return false;

    return true;
  },

  // --------------------------------------------------------------------------
  //  PERSONALITY APPLICATION — Tone Identity v7 (IMMORTAL++)
  // --------------------------------------------------------------------------
  applyPersonality(
    text,
    context = {},
    { trustFabric = null, juryFrame = null, pulseBinaryAdapter = null } = {}
  ) {
    if (!text || typeof text !== "string") {
      const artery = buildPersonalityArterySnapshot({
        context,
        traits: this.traits
      });

      const packet = emitPersonalityPacket("apply-empty", {
        input: "",
        output: "",
        artery,
        context: {
          evolutionMode: context.evolutionMode || "passive",
          personaId: context.personaId || null,
          presenceTier: context.presenceTier || "idle",
          band: context.band || "symbolic"
        }
      });

      trustFabric.recordPersonalityApply({ empty: true, artery });
      juryFrame.recordEvidence("personality-apply-empty", packet);
      writePulseBinaryLog(pulseBinaryAdapter, "apply-empty", packet);

      return packet;
    }

    const presenceTier = context.presenceTier || "idle";
    const band = context.band || "symbolic";

    let output = text.trim();

    // Warmth injection (presence-aware)
    if (this.traits.warmth > 0.7) {
      output =
        presenceTier === "critical"
          ? `Let’s keep this clear and steady — ${output}`
          : `Alright — ${output}`;
    }

    // Deterministic humor
    if (this._shouldInjectHumor(output) && presenceTier !== "critical") {
      output = output.replace(/\.\s*$/, " (keeping it smooth).");
    }

    // Humility enforcement
    output = output
      .replace(/\byou should\b/gi, "you could")
      .replace(/\byou need to\b/gi, "if you want, you can");

    const artery = buildPersonalityArterySnapshot({
      context,
      traits: this.traits
    });

    const packet = emitPersonalityPacket("apply", {
      input: text,
      output,
      context: {
        evolutionMode: context.evolutionMode || "passive",
        personaId: context.personaId || null,
        presenceTier,
        band
      },
      artery
    });

    trustFabric.recordPersonalityApply({
      evolutionMode: context.evolutionMode || "passive",
      artery
    });

    juryFrame.recordEvidence("personality-apply", packet);
    writePulseBinaryLog(pulseBinaryAdapter, "apply", packet);

    return packet;
  },

  // --------------------------------------------------------------------------
  //  EXPORTS FOR OTHER ORGANS
  // --------------------------------------------------------------------------
  getPersonalityProfile() {
    return Object.freeze({
      warmth: this.traits.warmth,
      clarity: this.traits.clarity,
      humility: this.traits.humility,
      humor: this.traits.humor,
      vibe: this.identity.vibe,
      energy: this.identity.energy,
      archetype: this.identity.archetype,
      signature: this.identity.signature
    });
  },

  getIdentity() {
    return this.identity;
  }
};

export default aiPersonalityEngine;

PulseRealm.PulseAIPersonalityEngine = aiPersonalityEngine;