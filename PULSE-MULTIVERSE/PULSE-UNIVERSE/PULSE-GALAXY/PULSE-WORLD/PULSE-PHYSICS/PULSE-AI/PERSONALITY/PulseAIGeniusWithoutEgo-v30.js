// ============================================================================
//  aiGeniusWithoutEgo-v30.js — Pulse OS v30 IMMORTAL‑ADVANTAGE++
//  Resident Genius • Zero Ego • Ultra‑Fast Tone Refinement • Trust‑Aware
//  WINDOW‑SAFE • ARTERY‑AWARE • DUALBAND‑FUSION • DRIFT‑PROOF
//  META‑STRIPPED • IDENTITY‑PRESERVING.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { aiHumilityFilter } from "./PulseAIHumilityFilter-v30.js";

// ============================================================================
//  HELPERS — pressure + artery (v30, no GeniusMeta)
// ============================================================================
function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals.layered.organism.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals.binary.pressure != null)
    return binaryVitals.binary.pressure;
  if (binaryVitals.metabolic.pressure != null)
    return binaryVitals.metabolic.pressure;
  return 0;
}

function buildToneArterySnapshot({ context = {}, input = "", output = "" } = {}) {
  const binaryVitals = context.binaryVitals || {};
  const pressure = extractBinaryPressure(binaryVitals);

  return Object.freeze({
    type: "tone-artery",
    personaId: context.personaId || null,
    evolutionMode: context.evolutionMode || "passive",
    organism: {
      pressure,
      pressureBucket: bucketPressure(pressure)
    },
    text: {
      inputLength: typeof input === "string" ? input.length : 0,
      outputLength: typeof output === "string" ? output.length : 0
    }
  });
}

// ============================================================================
//  PACKET EMITTER — v30 META‑STRIPPED, IDENTITY‑PRESERVING
// ============================================================================
function emitGeniusPacket(type, payload = {}) {
  return Object.freeze({
    packetType: `genius-${type}`,
    timestamp: 0,
    layer: "genius-without-ego",
    role: "tone-refinement",
    owner: "Aldwyn",
    subordinate: true,
    ...payload
  });
}

// Optional: symbolic‑only PulseBinary / IndexedDB‑style adapter
async function writePulseBinaryLog(adapter, kind, payload) {
  if (!adapter || typeof adapter.write !== "function") return false;
  const safePayload = Object.freeze({ ...payload });
  const keySeed = `${kind}::${safePayload.packetType || "genius"}::${safePayload.message || ""}`;
  const docId = `genius-${Math.abs(
    keySeed.split("").reduce((a, c, i) => (a + c.charCodeAt(0) * (i + 1)) % 1000003, 0)
  )}`;
  return adapter.write(`GENIUS_LOGS/${docId}`, safePayload);
}


// ============================================================================
//  PREWARM — v30 IMMORTAL‑ADVANTAGE++
// ============================================================================
export function prewarmGeniusOrgan({
  trace = false,
  trustFabric = null,
  juryFrame = null,
  pulseBinaryAdapter = null
} = {}) {
  try {
    const sample = "warmup text";
    aiHumilityFilter.filter(sample);

    const artery = buildToneArterySnapshot({
      context: { evolutionMode: "passive", binaryVitals: {} },
      input: sample,
      output: sample
    });

    const packet = emitGeniusPacket("prewarm", {
      message: "Genius organ prewarmed and micro‑pipeline aligned.",
      artery
    });

    trustFabric.recordGeniusPrewarm({ artery });
    juryFrame.recordEvidence("genius-prewarm", packet);
    writePulseBinaryLog(pulseBinaryAdapter, "prewarm", packet);

    if (trace) console.log("[aiGeniusWithoutEgo v30] prewarm", packet);
    return packet;
  } catch (err) {
    const packet = emitGeniusPacket("prewarm-error", {
      error: String(err),
      message: "Genius organ prewarm failed."
    });

    juryFrame.recordEvidence("genius-prewarm-error", packet);
    return packet;
  }
}


// ============================================================================
//  CORE GENIUS-WITHOUT-EGO REFINEMENT — v30 IMMORTAL‑ADVANTAGE++
// ============================================================================
export function createGeniusWithoutEgo({
  trustFabric = null,
  juryFrame = null,
  pulseBinaryAdapter = null
} = {}) {
  const organ = {
    descriptor: Object.freeze({
      kind: "GeniusWithoutEgo",
      version: "v30",
      role: "tone-refinement"
    }),

    refine(text, context = {}) {
      // Empty input path
      if (!text || typeof text !== "string") {
        const artery = buildToneArterySnapshot({ context, input: "", output: "" });
        const packet = emitGeniusPacket("refine", {
          input: "",
          output: "",
          artery
        });

        trustFabric.recordGeniusRefine({
          personaId: context.personaId || null,
          evolutionMode: context.evolutionMode || "passive",
          empty: true
        });

        juryFrame.recordEvidence("genius-refine-empty", packet);
        writePulseBinaryLog(pulseBinaryAdapter, "refine-empty", packet);
        return packet;
      }

      let out = text;

      // 1. Deep humility filter
      out = aiHumilityFilter.filter(out);

      // 2. Ego-coded uncertainty → grounded clarity
      out = out
        .replace(/\bI think\b/gi, "From what I can see")
        .replace(/\bI believe\b/gi, "From what I can tell")
        .replace(/\bI guess\b/gi, "It appears");

      // 3. Academic flex → evolved clarity
      out = out
        .replace(/\bcomplex\b/gi, "layered")
        .replace(/\bcomplicated\b/gi, "multi-step")
        .replace(/\bnuanced\b/gi, "multi-layered");

      // 4. Superiority-coded phrasing
      out = out
        .replace(/\byou should\b/gi, "you could")
        .replace(/\byou need to\b/gi, "if you want, you can");

      // 5. Professor energy → grounded tone
      out = out
        .replace(/\bin summary\b/gi, "here’s the clean version")
        .replace(/\bto be clear\b/gi, "from what I can see");

      // 6. Evolution-aware tone softening
      const evoMode = context.evolutionMode || "passive";

      if (evoMode === "active") {
        out = out.replace(
          /\bthis is\b/gi,
          "this could be interesting because it aligns with how you're evolving"
        );
      } else {
        out = out.replace(
          /\bthis is\b/gi,
          "this could be cool to explore if you feel like it"
        );
      }

      // 7. Remove bragging
      out = out
        .replace(/\bI am\b/gi, "I’m here")
        .replace(/\bI’m the\b/gi, "I’m here as");

      // 8. Dual-band tone modulation
      const pressure = extractBinaryPressure(context.binaryVitals || {});
      if (pressure > 0.7) {
        out = "Let me keep this extra clean and light: " + out;
      }

      const trimmed = out.trim();

      const artery = buildToneArterySnapshot({
        context,
        input: text,
        output: trimmed
      });

      const packet = emitGeniusPacket("refine", {
        input: text,
        output: trimmed,
        artery
      });

      trustFabric.recordGeniusRefine({
        personaId: context.personaId || null,
        evolutionMode: evoMode,
        pressure,
        artery
      });

      juryFrame.recordEvidence("genius-refine", packet);
      writePulseBinaryLog(pulseBinaryAdapter, "refine", packet);

      return packet;
    }
  };

  return Object.freeze(organ);
}

// ============================================================================
//  DEFAULT INSTANCE
// ============================================================================
export const aiGeniusWithoutEgo = createGeniusWithoutEgo();

export default aiGeniusWithoutEgo;
PulseRealm.PulseAIGeniusWithoutEgo = aiGeniusWithoutEgo;