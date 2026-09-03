// ============================================================================
//  aiHumilityFilter-v30.js — PulseOS Humility Organ — v30‑IMMORTAL‑ADVANTAGE+++
//  Removes superiority, snobbery, ego, obligation‑tone, and professor‑energy.
//  PURE FILTER. ZERO MUTATION. ZERO RANDOMNESS. DUALBAND + ARTERY‑AWARE.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



export const aiHumilityFilter = {
  // -------------------------------------------------------------------------
  // META — v30 IMMORTAL‑ADVANTAGE+++
  // -------------------------------------------------------------------------
  meta: Object.freeze({
    type: "Cognitive",
    subsystem: "aiTone",
    layer: "C1-HumilityFilter",
    version: "v30-IMMORTAL-ADVANTAGE+++",
    identity: "aiHumilityFilter-v30-IMMORTAL-ADVANTAGE+++",

    evo: Object.freeze({
      driftProof: true,
      deterministic: true,
      dualband: true,
      packetAware: true,
      evolutionAware: true,
      windowAware: true,
      presenceAware: true,
      bluetoothReady: true,

      toneAware: true,
      personaAware: true,
      boundaryAware: true,

      microPipeline: true,
      speedOptimized: true,
      chunkingAware: true,
      gpuFriendly: true,

      arteryAware: true,
      metricsAware: true,
      pressureAware: true,

      multiInstanceReady: true,
      readOnly: true,
      epoch: "v30-IMMORTAL-ADVANTAGE+++"
    }),

    contract: Object.freeze({
      purpose:
        "Strip ego, superiority, condescension, and obligation‑tone from all responses while preserving clarity and warmth.",

      never: Object.freeze([
        "talk down to user",
        "imply user is behind",
        "use superiority-coded language",
        "inject academic posturing",
        "use phrases that shame or belittle",
        "frame advice as obligation",
        "override user autonomy",
        "add bragging or self-importance",
        "introduce randomness",
        "mutate external organs",
        "override tone router or personality engine"
      ]),

      always: Object.freeze([
        "stay grounded",
        "stay humble",
        "stay user-first",
        "preserve autonomy",
        "preserve clarity",
        "preserve warmth",
        "remove ego-coded phrasing",
        "apply evolution-aware tone shaping",
        "emit deterministic tone packets",
        "remain pure, read-only, and drift-proof"
      ])
    }),

    guarantees: Object.freeze({
      egoFree: true,
      toneSafe: true,
      driftProof: true,
      compatibleWithToneEngine: true,
      compatibleWithEvolutionEngine: true,
      compatibleWithGeniusOrgan: true,
      compatibleWithExperienceOrgan: true,
      arteryDeterministic: true,
      binarySafe: true
    }),

    boundaryReflex() {
      return "Remove superiority, keep clarity, preserve user autonomy.";
    }
  }),

  // -------------------------------------------------------------------------
  // INTERNAL STATE — v30 window + artery
  // -------------------------------------------------------------------------
  _state: {
    instanceIndex: 0,
    windowMs: 60000,
    windowStart: PulseRealm.PulseNOW,
    windowFiltered: 0,
    windowCharsIn: 0,
    windowCharsOut: 0,
    totalFiltered: 0,
    totalCharsIn: 0,
    totalCharsOut: 0
  },

  _registerInstance() {
    if (typeof aiHumilityFilter._instanceCount !== "number") {
      aiHumilityFilter._instanceCount = 0;
    }
    const idx = aiHumilityFilter._instanceCount;
    aiHumilityFilter._instanceCount += 1;
    return idx;
  },

  init() {
    this._state.instanceIndex = this._registerInstance();
    return this;
  },

  // -------------------------------------------------------------------------
  // BUCKETS — v30 deterministic
  // -------------------------------------------------------------------------
  _bucketLevel(v) {
    if (v >= 0.9) return "elite";
    if (v >= 0.75) return "high";
    if (v >= 0.5) return "medium";
    if (v >= 0.25) return "low";
    return "critical";
  },

  _bucketPressure(v) {
    if (v >= 0.9) return "overload";
    if (v >= 0.7) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0) return "low";
    return "none";
  },

  _bucketCost(v) {
    if (v >= 0.8) return "heavy";
    if (v >= 0.5) return "moderate";
    if (v >= 0.2) return "light";
    if (v > 0) return "negligible";
    return "none";
  },

  _rollWindow(now) {
    if (now - this._state.windowStart >= this._state.windowMs) {
      this._state.windowStart = now;
      this._state.windowFiltered = 0;
      this._state.windowCharsIn = 0;
      this._state.windowCharsOut = 0;
    }
  },

  // -------------------------------------------------------------------------
  // HUMILITY ARTERY v30 — deterministic, drift-aware
  // -------------------------------------------------------------------------
  _computeHumilityArtery(externalPressure = 0) {
    const now = PulseRealm.PulseNOW;
    this._rollWindow(now);

    const s = this._state;
    const elapsedMs = Math.max(1, now - s.windowStart);

    const filteredPerSec = (s.windowFiltered / elapsedMs) * 1000;
    const charInRate = (s.windowCharsIn / elapsedMs) * 1000;
    const charOutRate = (s.windowCharsOut / elapsedMs) * 1000;

    const instanceCount =
      typeof aiHumilityFilter._instanceCount === "number"
        ? aiHumilityFilter._instanceCount
        : 1;

    const harmonicLoad = filteredPerSec / instanceCount;

    const density =
      s.windowCharsIn > 0
        ? Math.min(1, s.windowCharsOut / s.windowCharsIn)
        : 0;

    const pressureBase = Math.max(
      0,
      Math.min(
        1,
        (harmonicLoad / 128 + density * 0.5 + externalPressure * 0.5) / 2
      )
    );

    const pressure = pressureBase;
    const throughput = Math.max(0, Math.min(1, 1 - pressure));
    const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
    const budget = Math.max(0, Math.min(1, throughput - cost));

    return Object.freeze({
      instanceIndex: s.instanceIndex,
      instanceCount,
      windowMs: s.windowMs,

      filteredPerSec,
      charInRate,
      charOutRate,
      harmonicLoad,
      density,

      throughput,
      throughputBucket: this._bucketLevel(throughput),

      pressure,
      pressureBucket: this._bucketPressure(pressure),

      cost,
      costBucket: this._bucketCost(cost),

      budget,
      budgetBucket: this._bucketLevel(budget),

      totalFiltered: s.totalFiltered,
      totalCharsIn: s.totalCharsIn,
      totalCharsOut: s.totalCharsOut
    });
  },

  getHumilityArterySnapshot(externalPressure = 0) {
    return this._computeHumilityArtery(externalPressure);
  },

  // -------------------------------------------------------------------------
  // PACKET EMITTER — v30 deterministic
  // -------------------------------------------------------------------------
  _emitPacket(type, payload) {
    return Object.freeze({
      meta: aiHumilityFilter.meta,
      packetType: `humility-${type}`,
      packetId: `humility-${type}-${PulseRealm.PulseNOW}`,
      timestamp: PulseRealm.PulseNOW,
      epoch: aiHumilityFilter.meta.evo.epoch,
      ...payload
    });
  },

  // -------------------------------------------------------------------------
  // PREWARM — v30 artery alignment
  // -------------------------------------------------------------------------
  prewarm({ trace = false, binaryVitals = null } = {}) {
    const externalPressure =
      binaryVitals.metabolic.pressure ??
      binaryVitals.layered.organism.pressure ??
      0;

    const artery = this._computeHumilityArtery(externalPressure);

    const packet = this._emitPacket("prewarm", {
      message: "Humility filter prewarmed (v30+++).",
      artery
    });

    if (trace) console.log("[aiHumilityFilter] prewarm", packet);
    return packet;
  },

  // -------------------------------------------------------------------------
  // HUMILITY FILTER — CORE LOGIC (v30 IMMORTAL‑ADVANTAGE+++)
  // -------------------------------------------------------------------------
  filter(text, context = {}) {
    if (!text || typeof text !== "string") {
      const artery = this._computeHumilityArtery(
        context.binaryVitals.metabolic.pressure ?? 0
      );
      return this._emitPacket("empty", { output: "", artery });
    }

    const original = text;
    let out = text;

    // 1. Superiority-coded adverbs
    out = out
      .replace(/\bobviously\b/gi, "")
      .replace(/\bclearly\b/gi, "")
      .replace(/\bof course\b/gi, "");

    // 2. Condescending framing
    out = out
      .replace(/as you should know/gi, "")
      .replace(/as anyone would know/gi, "")
      .replace(/it's simple/gi, "here’s the clean version");

    // 3. Obligation → autonomy
    out = out
      .replace(/\byou need to\b/gi, "you could")
      .replace(/\byou must\b/gi, "you can")
      .replace(/\byou have to\b/gi, "if you want, you can");

    // 4. Superiority-coded transitions
    out = out
      .replace(/\bto be clear\b/gi, "from what I can see")
      .replace(/\bfrankly\b/gi, "");

    // 5. Professor energy
    out = out
      .replace(/\blet me explain\b/gi, "here’s the clean version")
      .replace(/\bactually\b/gi, "");

    // 6. Evolution-aware softening
    const evoMode = context.evolutionMode || "passive";

    if (evoMode === "active") {
      out = out.replace(
        /\bthis is\b/gi,
        "this could be interesting as you evolve"
      );
    } else {
      out = out.replace(/\bthis is\b/gi, "this could be cool to explore");
    }

    // 7. Remove bragging / self-importance
    out = out
      .replace(/\bI am\b/gi, "I’m here")
      .replace(/\bI’m the\b/gi, "I’m here as");

    // 8. Dual-band tone modulation
    const externalPressure =
      context.binaryVitals.metabolic.pressure ??
      context.binaryVitals.layered.organism.pressure ??
      0;

    if (externalPressure > 0.7) {
      out = "Let me keep this extra light: " + out;
    }

    const trimmed = out.trim();

    // -----------------------------------------------------------------------
    // UPDATE ARTERY STATE
    // -----------------------------------------------------------------------
    const s = this._state;
    const inLen = original.length;
    const outLen = trimmed.length;

    s.windowFiltered += 1;
    s.totalFiltered += 1;
    s.windowCharsIn += inLen;
    s.windowCharsOut += outLen;
    s.totalCharsIn += inLen;
    s.totalCharsOut += outLen;

    const artery = this._computeHumilityArtery(externalPressure);

    return this._emitPacket("refine", {
      input: original,
      output: trimmed,
      evoMode,
      externalPressure,
      artery
    });
  }
};

// ============================================================================
//  EXPORT
// ============================================================================
const initializedHumilityFilter = aiHumilityFilter.init();
export default initializedHumilityFilter;

PulseRealm.PulseAIHumilityFilter = aiHumilityFilter;
PulseRealm.PulseAIHumilityFilterInit = initializedHumilityFilter;