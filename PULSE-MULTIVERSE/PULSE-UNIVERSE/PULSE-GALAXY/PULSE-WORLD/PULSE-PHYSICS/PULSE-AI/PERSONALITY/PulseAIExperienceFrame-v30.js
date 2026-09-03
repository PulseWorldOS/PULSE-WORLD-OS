// ============================================================================
//  PULSE OS v30-IMMORTAL++ — EXPERIENCE FRAME ORGAN
//  Conversational Repair • Misalignment Handling • UX + Organism Harmonization
//  PURE FUNCTIONAL ON INPUT/OUTPUT. NO BINARY MUTATION. ZERO-IO. DETERMINISTIC.
//  v30: dual-band aware, orbital-aware, tri-heart integrated
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
//  META — v30 IMMORTAL++
// ============================================================================
export const ExperienceFrameMeta = Object.freeze({
  version: "v30-IMMORTAL++",
  layer: "experience-frame-organ",
  role: "experience-frame",
  identity: "AiExperienceFrame-v30",
  evo: {
    epoch: "v30",
    notes: [
      "dual-band aware",
      "tri-heart integrated",
      "orbital-aware UX artery",
      "frustration/ambiguity/refusal harmonization"
    ]
  }
});


// ============================================================================
//  INTERNAL HELPERS — BUCKETS (v30 tuned)
// ============================================================================

function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

// ============================================================================
//  PRESSURE EXTRACTION (BINARY + BOUNDARY + ORBITAL) — v30
// ============================================================================

function extractBinaryPressure(binaryVitals = {}) {
  if (
    binaryVitals.layered.organism &&
    typeof binaryVitals.layered.organism.pressure === "number"
  ) {
    return binaryVitals.layered.organism.pressure;
  }
  if (binaryVitals.binary && typeof binaryVitals.binary.pressure === "number") {
    return binaryVitals.binary.pressure;
  }
  if (
    binaryVitals.metabolic &&
    typeof binaryVitals.metabolic.pressure === "number"
  ) {
    return binaryVitals.metabolic.pressure;
  }
  if (typeof binaryVitals.pressure === "number") {
    return binaryVitals.pressure;
  }
  return 0;
}

function extractBoundaryPressure(boundaryArtery = {}) {
  if (typeof boundaryArtery.vitals.pressure === "number") {
    return boundaryArtery.vitals.pressure;
  }
  if (typeof boundaryArtery.pressure === "number") {
    return boundaryArtery.pressure;
  }
  return 0;
}

function extractOrbitalPressure(binaryVitals = {}) {
  if (binaryVitals.orbital && typeof binaryVitals.orbital.pressure === "number") {
    return binaryVitals.orbital.pressure;
  }
  if (binaryVitals.orbital && typeof binaryVitals.orbital.coverageScore === "number") {
    return binaryVitals.orbital.coverageScore;
  }
  return 0;
}

// ============================================================================
//  TRI-HEART SNAPSHOT (MOM / DAD / BABY) — v30 IMMORTAL++
// ============================================================================

function readGlobalTriHeart() {
  const mom = PulseRealm.PulseProxyHeartTriHeart || null;
  const dad = PulseRealm.PulseAiHeartTriHeart || null;
  const baby = PulseRealm.PulseEarnTriHeart || null;

  return {
    mom,
    dad,
    baby
  };
}

function buildTriHeartSnapshot(metaTriHeart = {}) {
  const globalTri = readGlobalTriHeart();

  const liveness =
    metaTriHeart.liveness ||
    globalTri.dad.triHeartLiveness ||
    globalTri.mom.triHeartLiveness ||
    globalTri.baby.triHeartLiveness ||
    null;

  const speed =
    metaTriHeart.speed ||
    globalTri.dad.triHeartSpeed ||
    globalTri.mom.triHeartSpeed ||
    globalTri.baby.triHeartSpeed ||
    null;

  const advantage =
    metaTriHeart.advantage ||
    globalTri.dad.triHeartAdvantage ||
    globalTri.mom.triHeartAdvantage ||
    globalTri.baby.triHeartAdvantage ||
    null;

  const presence =
    metaTriHeart.presence ||
    globalTri.dad.triHeartPresence ||
    globalTri.mom.triHeartPresence ||
    globalTri.baby.triHeartPresence ||
    null;

  const healthScore = (() => {
    const adv = advantage.combinedAdvantage ?? 0.5;
    const spd = speed.combinedSpeed ?? 0.5;
    const liveCount =
      (liveness.momAlive ? 1 : 0) +
      (liveness.dadAlive ? 1 : 0) +
      (liveness.babyAlive ? 1 : 0);
    const liveRatio = liveCount / 3;
    return Math.max(0, Math.min(1, 0.4 * adv + 0.3 * spd + 0.3 * liveRatio));
  })();

  const healthBucket = bucketLevel(healthScore);

  return {
    liveness,
    speed,
    advantage,
    presence,
    healthScore,
    healthBucket
  };
}

// ============================================================================
//  EXPERIENCE CORE — v30 IMMORTAL++
// ============================================================================
// ============================================================================
//  AiExperienceFrame — IMMORTAL PSEUDO‑CLASS (v30++)
// ============================================================================

export const AiExperienceFrame = (() => {

  // -------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
  // -------------------------------------------------------
  const lane = {
    personalFrame: null,

    totalInteractions: 0,
    frustrationCount: 0,
    ambiguityCount: 0,
    refusalCount: 0,

    decisionCache: Object.create(null)
  };

  // -------------------------------------------------------
  // INIT
  // -------------------------------------------------------
  const init = ({ personalFrame = null } = {}) => {
    lane.personalFrame = personalFrame || null;

    lane.totalInteractions = 0;
    lane.frustrationCount = 0;
    lane.ambiguityCount = 0;
    lane.refusalCount = 0;

    lane.decisionCache = Object.create(null);
  };

  // -------------------------------------------------------
  // PREWARM (no-op but explicit)
  // -------------------------------------------------------
  const prewarm = () => {
    lane.totalInteractions = lane.totalInteractions || 0;
  };

  // -------------------------------------------------------
  // ENTRY POINT — shapeExperience
  // -------------------------------------------------------
  const shapeExperience = async ({ context = {}, text = "", meta = {} }) => {
    const base = String(text || "");
    const safetyStatus = meta.safetyStatus || "ok";
    const worldLens = meta.worldLens || "consensus";

    const triHeart = buildTriHeartSnapshot(meta.triHeartContext || {});
    const state = buildExperienceState({ context, base, meta, triHeart });

    const cacheKey = buildCacheKey(base, state, meta, triHeart);
    const cached = lane.decisionCache[cacheKey];
    if (cached) return cached;

    let repaired = applyRepairLogic({ base, state, triHeart });

    if (lane.personalFrame.shapeOutput) {
      try {
        const shaped = await lane.personalFrame.shapeOutput({
          context,
          text: repaired,
          triHeart
        });
        if (shaped.text) repaired = shaped.text;
      } catch {}
    }

    updateStats(state);

    const uxArtery = computeUxArtery({ state, meta, triHeart });

    const result = Object.freeze({
      text: repaired,
      experience: Object.freeze({
        safetyStatus,
        worldLens,
        state,
        triHeart,
        uxArtery
      })
    });

    lane.decisionCache[cacheKey] = result;
    return result;
  };

  // -------------------------------------------------------
  // EXPERIENCE STATE
  // -------------------------------------------------------
  const buildExperienceState = ({ context, base, meta, triHeart }) => {
    const safetyStatus = meta.safetyStatus || "ok";
    const worldLens = meta.worldLens || "consensus";
    const notes = meta.notes || [];
    const lenses = meta.lenses || [];

    const userFrustrationSignal =
      detectFrustrationFromContext(context) ||
      detectFrustrationFromNotes(notes);

    const ambiguitySignal =
      worldLens === "ambiguous" ||
      lenses.some(
        (l) =>
          l.status === "warn" &&
          /vague|indirect|unclear/i.test(l.notes || "")
      );

    const refusalSignal =
      safetyStatus === "blocked" ||
      /can’t provide|cannot provide|not able to do that|i can.t do that/i.test(
        base.toLowerCase()
      );

    const personaId = meta.personaId || context.personaId || "neutral";
    const toneMode = meta.toneMode || "default";

    const triHeartHealth = triHeart.healthScore ?? 0.5;
    const triHeartBucket = triHeart.healthBucket || bucketLevel(triHeartHealth);

    return {
      safetyStatus,
      worldLens,
      hasFrustration: userFrustrationSignal,
      hasAmbiguity: ambiguitySignal,
      hasRefusal: refusalSignal,
      personaId,
      toneMode,
      triHeartHealth,
      triHeartBucket
    };
  };

  const detectFrustrationFromContext = (context) => {
    const lastUserText = context.lastUserText || "";
    if (!lastUserText) return false;

    const lowered = lastUserText.toLowerCase();
    const patterns = [
      "you didn't answer",
      "that’s not what i asked",
      "that's not what i asked",
      "you’re not listening",
      "you're not listening",
      "this is wrong",
      "you ignored",
      "why can't you just",
      "stay on point",
      "answer the question",
      "stop dodging"
    ];

    return patterns.some((p) => lowered.includes(p));
  };

  const detectFrustrationFromNotes = (notes) => {
    if (!Array.isArray(notes)) return false;
    const joined = notes.join(" ").toLowerCase();
    const patterns = ["off-topic", "indirect", "vague", "warn", "frustration"];
    return patterns.some((p) => joined.includes(p));
  };

  // -------------------------------------------------------
  // REPAIR LOGIC
  // -------------------------------------------------------
  const applyRepairLogic = ({ base, state, triHeart }) => {
    let text = base;

    if (state.hasRefusal) {
      text = ensureRefusalClarity(text);
    }

    if (state.hasAmbiguity) {
      text = appendClarifier(
        text,
        "If anything here feels unclear or indirect, say so and I’ll tighten it."
      );
    }

    if (state.hasFrustration) {
      const triHint =
        triHeart.healthBucket === "critical"
          ? "I’m also running under higher internal load, so I’m keeping things extra direct."
          : triHeart.healthBucket === "low"
          ? "I’m balancing some internal load, but I can still ground this clearly."
          : null;

      const baseAck =
        "It seems my earlier response may not have matched what you needed. Let me ground this more directly.";

      const ack = triHint ? `${baseAck} ${triHint}` : baseAck;

      text = prependAcknowledgement(text, ack);
    }

    return text;
  };

  const ensureRefusalClarity = (text) => {
    const lowered = text.toLowerCase();
    const already =
      lowered.includes("because") ||
      lowered.includes("due to") ||
      lowered.includes("for safety reasons");

    if (already) return text;

    return (
      text +
      "\n\nTo be clear: I’m constrained by safety and capability boundaries, " +
      "so I can’t provide that in the way you requested."
    );
  };

  const appendClarifier = (text, clarifier) => {
    if (!clarifier) return text;
    if (text.includes(clarifier)) return text;
    return text + "\n\n" + clarifier;
  };

  const prependAcknowledgement = (text, ack) => {
    if (!ack) return text;
    return ack + "\n\n" + text;
  };

  // -------------------------------------------------------
  // UX STATS + ARTERY
  // -------------------------------------------------------
  const updateStats = (state) => {
    lane.totalInteractions += 1;
    if (state.hasFrustration) lane.frustrationCount += 1;
    if (state.hasAmbiguity) lane.ambiguityCount += 1;
    if (state.hasRefusal) lane.refusalCount += 1;
  };

  const computeUxArtery = ({ state, meta, triHeart }) => {
    const total = lane.totalInteractions || 1;

    const frustrationRate = lane.frustrationCount / total;
    const ambiguityRate = lane.ambiguityCount / total;
    const refusalRate = lane.refusalCount / total;

    const uxLoad = Math.max(
      0,
      Math.min(
        1,
        0.4 * frustrationRate + 0.3 * ambiguityRate + 0.3 * refusalRate
      )
    );

    const binaryPressure = extractBinaryPressure(meta.binaryVitals || {});
    const boundaryPressure = extractBoundaryPressure(meta.boundaryArtery || {});
    const orbitalPressure = extractOrbitalPressure(meta.binaryVitals || {});

    const triHeartHealth = triHeart.healthScore ?? 0.5;
    const triHeartPenalty = Math.max(0, 1 - triHeartHealth);

    const fusedPressure = Math.max(
      0,
      Math.min(
        1,
        0.35 * uxLoad +
          0.25 * binaryPressure +
          0.2 * boundaryPressure +
          0.1 * triHeartPenalty +
          0.1 * orbitalPressure
      )
    );

    const throughput = Math.max(0, Math.min(1, 1 - fusedPressure));
    const cost = Math.max(0, Math.min(1, fusedPressure * (1 - throughput)));
    const budget = Math.max(0, Math.min(1, throughput - cost));

    const organism = {
      pressure: fusedPressure,
      cost,
      budget,
      pressureBucket: bucketPressure(fusedPressure),
      budgetBucket: bucketLevel(budget)
    };

    const harmonyScore = 1 - uxLoad;
    const harmonyBucket = bucketLevel(harmonyScore);

    const ux = {
      uxLoad,
      frustrationRate,
      ambiguityRate,
      refusalRate,
      harmonyBucket
    };

    const boundaries = {
      pressure: boundaryPressure,
      pressureBucket: bucketPressure(boundaryPressure)
    };

    const binary = {
      pressure: binaryPressure,
      pressureBucket: bucketPressure(binaryPressure),
      orbitalPressure
    };

    const persona = {
      id: state.personaId,
      toneMode: state.toneMode
    };

    const triHeartArtery = {
      healthScore: triHeart.healthScore ?? 0.5,
      healthBucket:
        triHeart.healthBucket || bucketLevel(triHeart.healthScore ?? 0.5),
      liveness: triHeart.liveness || null,
      speed: triHeart.speed || null,
      advantage: triHeart.advantage || null,
      presence: triHeart.presence || null
    };

    return {
      organism,
      ux,
      boundaries,
      binary,
      persona,
      triHeart: triHeartArtery
    };
  };

  // -------------------------------------------------------
  // CACHE KEY
  // -------------------------------------------------------
  const buildCacheKey = (base, state, meta, triHeart) => {
    const flags =
      (state.hasFrustration ? "F" : "f") +
      (state.hasAmbiguity ? "A" : "a") +
      (state.hasRefusal ? "R" : "r");

    const boundaryModeId = meta.boundaryArtery.mode.id || "";
    const pressureBucket = bucketPressure(
      extractBinaryPressure(meta.binaryVitals || {})
    );

    const triHeartBucket = triHeart.healthBucket || "medium";

    return [
      base,
      state.safetyStatus,
      state.worldLens,
      flags,
      state.personaId,
      state.toneMode,
      boundaryModeId,
      pressureBucket,
      triHeartBucket
    ].join("|");
  };

  // -------------------------------------------------------
  // STATS SNAPSHOT
  // -------------------------------------------------------
  const getStatsSnapshot = () => {
    const total = lane.totalInteractions || 1;
    return Object.freeze({
      totalInteractions: lane.totalInteractions,
      frustrationRate: lane.frustrationCount / total,
      ambiguityRate: lane.ambiguityCount / total,
      refusalRate: lane.refusalCount / total
    });
  };

  // -------------------------------------------------------
  // IMMORTAL EXPORT
  // -------------------------------------------------------
  return {
    init,
    prewarm,
    shapeExperience,
    getStatsSnapshot
  };

})();

// ============================================================================
//  createExperienceFrameOrgan — IMMORTAL PSEUDO‑CLASS WRAPPER (v30++)
// ============================================================================
export const createExperienceFrameOrgan = (config = {}) => {
  // Initialize the IMMORTAL AiExperienceFrame organ
  AiExperienceFrame.init({
    personalFrame: config.personalFrame || null
  });

  // Prewarm (optional, deterministic)
  AiExperienceFrame.prewarm();

  // Return a frozen surface (no class, no instance)
  return Object.freeze({
    meta: ExperienceFrameMeta,

    async shapeExperience(payload) {
      return AiExperienceFrame.shapeExperience(payload);
    },

    // optional UX-artery accessor for external organs
    getUxArterySnapshot(meta = {}, context = {}, text = "") {
      const triHeart = buildTriHeartSnapshot(meta.triHeartContext || {});
      const state = AiExperienceFrame.buildExperienceState({
        context,
        base: String(text || ""),
        meta,
        triHeart
      });
      return AiExperienceFrame._computeUxArtery({
        state,
        meta,
        triHeart
      });
    },

    // optional stats snapshot for diagnostics
    getStatsSnapshot() {
      return AiExperienceFrame.getStatsSnapshot();
    }
  });
};

// ---------------------------------------------------------------------------
//  DUAL EXPORT LAYER — CommonJS compatibility (v30-IMMORTAL dualband)
// ---------------------------------------------------------------------------
/* c8 ignore next 10 */
PulseRealm.AIExperienceFrame = {
    ExperienceFrameMeta,
    AiExperienceFrame,
    createExperienceFrameOrgan
}
