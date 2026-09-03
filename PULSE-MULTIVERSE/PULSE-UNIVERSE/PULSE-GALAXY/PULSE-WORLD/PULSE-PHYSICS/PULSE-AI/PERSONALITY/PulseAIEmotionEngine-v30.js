// ============================================================================
//  aiEmotionEngine-v30-Orbital.js — Pulse OS v30‑IMMORTAL++
//  Emotion Organ • Subtle Affect Detection • Tone Routing Surface
//  PURE AFFECT. ZERO DIAGNOSIS. ZERO CLINICAL INTERPRETATION.
//  v30: NO META • NO IDENTITY • NO OWNER • NO WALL-CLOCK
//       ORBITAL-AWARE PRESSURE • ROUTING HINTS • DUALBAND TONE
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
//  PRESSURE HELPERS — dualband‑aware (v30)
// ============================================================================
function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals.layered.organism.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals.binary.pressure != null)
    return binaryVitals.binary.pressure;
  if (typeof binaryVitals.pressure === "number")
    return binaryVitals.pressure;
  return 0;
}

function extractOrbitalPressure(binaryVitals = {}) {
  // Optional orbital field from universe / pulsar / artery
  // binaryVitals.orbital.pressure or .coverageScore etc.
  if (binaryVitals.orbital.pressure != null)
    return binaryVitals.orbital.pressure;
  if (binaryVitals.orbital.coverageScore != null)
    return binaryVitals.orbital.coverageScore;
  return 0;
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}


// ============================================================================
//  PACKET EMITTER — deterministic, emotion‑scoped (v30 IMMORTAL++)
// ============================================================================
function emitEmotionPacket(type, payload = {}) {
  return Object.freeze({
    packetType: `emotion-${type}`,
    timestamp: 0,        // IMMORTAL++: no wall-clock
    layer: "emotion-organ",
    role: "emotion",
    band: "symbolic",
    ...payload
  });
}


// ============================================================================
//  CORE DETECTORS (pure, stateless, drift‑proof)
// ============================================================================

const EMOTION_KEYWORDS = {
  casual: ["lol", "haha", ":)", "lmao", "rofl"],
  stressed: ["worried", "idk", "confused", "overwhelmed", "anxious"],
  frustrated: ["angry", "upset", "annoyed", "wtf", "why won't", "this sucks"],
  focused: ["evolve", "improve", "optimize", "refactor", "upgrade", "ship"],
  drained: ["tired", "exhausted", "burnt", "burned out", "drained"],
  energized: ["excited", "hyped", "pumped", "let's go", "so ready"],
  low: ["sad", "down", "bleh", "meh"],
  calm: ["relaxed", "calm", "steady", "chill"],
  intense: ["never ever", "absolutely not", "no way", "i swear"]
};

function coreDetectEmotion(message) {
  if (!message) return "neutral";

  const msg = String(message).toLowerCase();

  for (const [label, words] of Object.entries(EMOTION_KEYWORDS)) {
    for (const w of words) {
      if (msg.includes(w)) {
        if (label === "intense") return "frustrated";
        return label;
      }
    }
  }

  // fallback heuristics
  if (msg.includes("!")) {
    if (msg.includes("why") || msg.includes("what the"))
      return "frustrated";
    return "energized";
  }

  if (msg.includes("?") && msg.length > 80)
    return "stressed";

  return "neutral";
}

function coreDetectIntensity(message) {
  if (!message) return 0.2;

  const s = String(message);
  const len = s.length;
  const exclamations = (s.match(/!/g) || []).length;
  const caps = (s.match(/[A-Z]{3,}/g) || []).length;

  let base = 0.3;

  if (len < 20) base += 0.05;
  else if (len > 200) base += 0.2;
  else base += 0.1;

  base += Math.min(0.3, exclamations * 0.05);
  base += Math.min(0.2, caps * 0.05);

  if (base > 1) base = 1;
  if (base < 0) base = 0;

  return base;
}

function coreDetectFrustrationHint(emotion, intensity) {
  if (emotion === "frustrated" || emotion === "stressed") {
    if (intensity >= 0.7) return "high-frustration";
    if (intensity >= 0.4) return "medium-frustration";
    return "low-frustration";
  }
  return "none";
}

function coreDetectEngagementHint(emotion, intensity) {
  if (emotion === "energized" || emotion === "focused") {
    if (intensity >= 0.7) return "hyper-engaged";
    if (intensity >= 0.4) return "engaged";
    return "curious";
  }
  if (emotion === "drained" || emotion === "low") {
    if (intensity >= 0.6) return "fatigued";
    return "soft";
  }
  return "neutral";
}


// ============================================================================
//  TONE ROUTING — symbolic, deterministic, dualband‑aware
// ============================================================================
//
//  toneProfile:
//    - primaryTone: "direct" | "gentle" | "playful" | "structured" | "grounding"
//    - safetyBias: "high" | "normal"
//    - verbosity: "low" | "medium" | "high"
//    - satelliteHint: "anchor" | "expand" | "none"
//

function deriveToneProfile({ emotion, intensity, binaryPressure, orbitalPressure }) {
  let primaryTone = "direct";
  let safetyBias = "normal";
  let verbosity = "medium";
  let satelliteHint = "none";

  // base on emotion
  switch (emotion) {
    case "frustrated":
    case "stressed":
      primaryTone = "grounding";
      safetyBias = "high";
      verbosity = intensity > 0.6 ? "low" : "medium";
      break;

    case "drained":
    case "low":
      primaryTone = "gentle";
      safetyBias = "high";
      verbosity = "low";
      break;

    case "energized":
    case "focused":
      primaryTone = "structured";
      safetyBias = "normal";
      verbosity = "high";
      break;

    case "casual":
      primaryTone = "playful";
      safetyBias = "normal";
      verbosity = "medium";
      break;

    case "calm":
      primaryTone = "direct";
      safetyBias = "normal";
      verbosity = "medium";
      break;

    default:
      primaryTone = "direct";
      safetyBias = "normal";
      verbosity = "medium";
      break;
  }

  // adjust by binary pressure
  if (binaryPressure >= 0.7) {
    // system under load → keep responses tighter
    verbosity = "low";
  } else if (binaryPressure <= 0.3 && (emotion === "focused" || emotion === "energized")) {
    // plenty of headroom + high engagement → allow more detail
    verbosity = "high";
  }

  // orbital hint: if orbitalPressure high, we can "expand" into more global/systemic framing
  if (orbitalPressure >= 0.5 && (emotion === "focused" || emotion === "energized")) {
    satelliteHint = "expand";
  } else if (orbitalPressure >= 0.5 && (emotion === "frustrated" || emotion === "stressed")) {
    satelliteHint = "anchor"; // keep things grounded even if orbital systems are active
  } else {
    satelliteHint = "none";
  }

  return Object.freeze({
    primaryTone,
    safetyBias,
    verbosity,
    satelliteHint
  });
}


// ============================================================================
//  EMOTION ARTERY — symbolic‑only, deterministic, dualband‑aware (v30)
// ============================================================================
function emotionArtery({ message = "", binaryVitals = {} } = {}) {
  const pressure = extractBinaryPressure(binaryVitals);
  const orbitalPressure = extractOrbitalPressure(binaryVitals);

  const emotion = coreDetectEmotion(message);
  const intensity = coreDetectIntensity(message);

  const localPressure =
    (emotion === "frustrated" ? 0.3 : 0) +
    (emotion === "drained" ? 0.2 : 0) +
    (intensity > 0.6 ? 0.2 : 0);

  const combined = Math.max(
    0,
    Math.min(1, 0.6 * localPressure + 0.4 * pressure)
  );

  const toneProfile = deriveToneProfile({
    emotion,
    intensity,
    binaryPressure: pressure,
    orbitalPressure
  });

  return emitEmotionPacket("artery", {
    organism: {
      pressure: combined,
      pressureBucket: bucketPressure(combined),
      orbitalPressure
    },
    emotion,
    intensity,
    toneProfile
  });
}


// ============================================================================
//  FACTORY — v30 IMMORTAL++
// ============================================================================
export function createEmotionEngine({ context = {}, personaEngine = null } = {}) {
  const base = {
    context,
    personaEngine,

    detectEmotion(message) {
      return coreDetectEmotion(message);
    },

    detectIntensity(message) {
      return coreDetectIntensity(message);
    },

    deriveTone(message, binaryVitals = {}) {
      const emotion = coreDetectEmotion(message);
      const intensity = coreDetectIntensity(message);
      const pressure = extractBinaryPressure(binaryVitals);
      const orbitalPressure = extractOrbitalPressure(binaryVitals);

      const toneProfile = deriveToneProfile({
        emotion,
        intensity,
        binaryPressure: pressure,
        orbitalPressure
      });

      const frustrationHint = coreDetectFrustrationHint(emotion, intensity);
      const engagementHint = coreDetectEngagementHint(emotion, intensity);

      return emitEmotionPacket("tone", {
        emotion,
        intensity,
        toneProfile,
        frustrationHint,
        engagementHint,
        pressure,
        pressureBucket: bucketPressure(pressure),
        orbitalPressure
      });
    },

    interpret(message, binaryVitals = {}) {
      const emotion = coreDetectEmotion(message);
      const intensity = coreDetectIntensity(message);
      const pressure = extractBinaryPressure(binaryVitals);
      const orbitalPressure = extractOrbitalPressure(binaryVitals);

      const toneProfile = deriveToneProfile({
        emotion,
        intensity,
        binaryPressure: pressure,
        orbitalPressure
      });

      const frustrationHint = coreDetectFrustrationHint(emotion, intensity);
      const engagementHint = coreDetectEngagementHint(emotion, intensity);

      return emitEmotionPacket("detected", {
        emotion,
        intensity,
        message,
        contextSnapshot: {
          personaId: personaEngine.getActivePersona().id ?? null
        },
        pressure,
        pressureBucket: bucketPressure(pressure),
        orbitalPressure,
        frustrationHint,
        engagementHint,
        toneProfile
      });
    },

    artery(input) {
      return emotionArtery(input);
    }
  };

  return Object.freeze(base);
}

// Backwards‑compatible alias
export const aiEmotionEngine = createEmotionEngine;


// ============================================================================
//  EMOTION ENGINE PREWARM — v30 IMMORTAL++
// ============================================================================
export function prewarmEmotionEngine() {
  try {
    const warmSamples = [
      "lol this is funny",
      "idk I'm confused",
      "I'm angry about this",
      "I want to evolve the system",
      "neutral baseline",
      "I'm exhausted but still pushing",
      "I'm excited to ship this",
      "this is frustrating but I'll fix it",
      "I'm calm and steady",
      "feeling a bit down today",
      "NEVER EVER MERGE THESE PAGES AGAIN",
      "okay, let's upgrade this cleanly and precisely"
    ];

    const warmEngine = createEmotionEngine({ context: {} });

    for (const msg of warmSamples) {
      warmEngine.detectEmotion(msg);
      warmEngine.detectIntensity(msg);
      warmEngine.interpret(msg, { pressure: 0.2, orbital: { pressure: 0.3 } });
      warmEngine.artery({ message: msg, binaryVitals: { pressure: 0.2, orbital: { pressure: 0.3 } } });
      warmEngine.deriveTone(msg, { pressure: 0.2, orbital: { pressure: 0.3 } });
    }

    return emitEmotionPacket("prewarm", {
      message: "Emotion engine prewarmed and affect/tone pathways aligned."
    });
  } catch (err) {
    return emitEmotionPacket("prewarm-error", {
      error: String(err),
      message: "Emotion engine prewarm failed."
    });
  }
}


// ============================================================================
//  DEFAULT EXPORT (ESM + CJS)
// ============================================================================
export default aiEmotionEngine;

PulseRealm.AIEmotionEngine = {
    aiEmotionEngine,
    createEmotionEngine,
    prewarmEmotionEngine,
    default: aiEmotionEngine
}
