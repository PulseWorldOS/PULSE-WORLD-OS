// ============================================================================
//  aiToneEngine-v30-IMMORTAL-ADVANTAGE++.js
//  Pulse OS v30++ • Genius-Without-Ego • Dualband Tone Cortex
//  Binary-Aware • Persona-Aware • Safety-Frame-Aware • Artery v4
//  Deterministic • Drift-Proof • Multi-Instance • Window-Safe
// ============================================================================

/**
 * DESIGN NOTES (v30-IMMORTAL-ADVANTAGE++):
 *
 *  • Still NOT an organ, NOT an archetype — this is an internal engine.
 *  • Pure tone-shaping cortex: no business logic, no storage, no randomness.
 *  • Dualband-aware:
 *      - Symbolic primary (language tone)
 *      - Binary-aware (can annotate packets with tone meta)
 *  • Artery v4:
 *      - throughput / pressure / cost / budget
 *      - mode-switch density
 *      - per-instance harmonic load
 *  • Persona + Safety Frame aware:
 *      - personaId + safetyFrame can be passed in context
 *      - never overrides safety, only shapes language
 *  • Owner-aware (Aldwyn) in meta only; no behavioral coupling.
 */

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ---------------------------------------------------------------------------
//  META — v30 IMMORTAL ADVANTAGE++
// ---------------------------------------------------------------------------

export const ToneEngineMeta = Object.freeze({
  type: "Engine",
  subsystem: "aiTone",
  layer: "C1-ToneEngine",
  version: "30-Immortal-Advantage++",
  identity: "aiToneEngine-v30-Immortal-Advantage++",
  owner: Object.freeze({
    ownerId: "Aldwyn",
    organRank: "root-architect"
  }),
  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    egoFree: true,
    adaptive: true,
    harmonic: true,

    dualband: true,
    dualbandSafe: true,
    symbolicPrimary: true,
    symbolicAware: true,
    binaryAware: true,

    personalityAware: true,
    safetyFrameAware: true,
    loggerAware: true,
    packetAware: true,
    windowAware: true,
    arteryAware: true,

    toneEngine: true,
    toneMapping: true,
    microPipeline: true,
    speedOptimized: true,
    multiInstanceReady: true,

    epoch: "30-Immortal-Advantage++"
  }),
  contract: Object.freeze({
    purpose:
      "Shape all outgoing language into a grounded, evolved, humble, adaptive tone without ego or superiority.",
    never: Object.freeze([
      "inject ego",
      "perform intelligence",
      "talk down to user",
      "use superiority language",
      "break persona alignment",
      "introduce randomness",
      "override safety frame",
      "oscillate tone uncontrollably",
      "log sensitive payloads directly"
    ]),
    always: Object.freeze([
      "stay grounded",
      "stay adaptive",
      "stay warm",
      "stay clear",
      "stay humble",
      "stay consistent",
      "stay ego‑free",
      "stay evolution‑aligned",
      "stay harmonic across instances",
      "emit window‑safe tone snapshots",
      "emit deterministic tone packets"
    ])
  }),
  voice: Object.freeze({
    tone: "genius-without-ego",
    vibe: "smart friend, never professor",
    energy: "calm, confident, helpful"
  }),
  boundaryReflex() {
    return "Tone remains adaptive, grounded, and ego‑free — never superior, never snobby.";
  }
});

// ---------------------------------------------------------------------------
//  INTERNAL ARTERY v4 — Tone Throughput / Pressure / Cost / Budget
// ---------------------------------------------------------------------------

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

function bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

// ---------------------------------------------------------------------------
//  ENGINE IMPLEMENTATION — SINGLETON, MULTI-INSTANCE-AWARE
// ---------------------------------------------------------------------------

export const aiToneEngine = {
  meta: ToneEngineMeta,

  // Packet emitter — deterministic, tone-scoped
  _emitTonePacket(type, payload) {
    const now = PulseRealm.PulseNOW;
    const packet = Object.freeze({
      meta: this.meta,
      packetType: `tone-${type}`,
      packetId: `tone-${type}-${now}`,
      timestamp: now,
      epoch: this.meta.evo.epoch,
      ...payload
    });

    return packet;
  },

  // Instance registry
  _instanceCount: 0,
  _registerInstance() {
    const index = this._instanceCount;
    this._instanceCount += 1;
    return index;
  },

  // Tone artery state
  _toneArtery: {
    windowMs: 60000,
    windowStart: PulseRealm.PulseNOW,
    windowMessages: 0,
    windowModeSwitches: 0,
    windowBinaryAnnotations: 0,
    totalMessages: 0,
    totalModeSwitches: 0,
    totalBinaryAnnotations: 0
  },

  _rollToneWindow(now) {
    if (now - this._toneArtery.windowStart >= this._toneArtery.windowMs) {
      this._toneArtery.windowStart = now;
      this._toneArtery.windowMessages = 0;
      this._toneArtery.windowModeSwitches = 0;
      this._toneArtery.windowBinaryAnnotations = 0;
    }
  },

  _computeToneArtery() {
    const now = PulseRealm.PulseNOW;
    this._rollToneWindow(now);

    const elapsedMs = Math.max(1, now - this._toneArtery.windowStart);
    const msgRatePerSec =
      (this._toneArtery.windowMessages / elapsedMs) * 1000;

    const switchRate =
      this._toneArtery.windowMessages > 0
        ? this._toneArtery.windowModeSwitches /
          this._toneArtery.windowMessages
        : 0;

    const binaryAnnotRate =
      this._toneArtery.windowMessages > 0
        ? this._toneArtery.windowBinaryAnnotations /
          this._toneArtery.windowMessages
        : 0;

    const instanceCount = this._instanceCount || 1;
    const harmonicLoad = msgRatePerSec / instanceCount;

    // v4: pressure from harmonic load + mode churn + binary annotation density
    const pressure = Math.min(
      1,
      (harmonicLoad / 128 + switchRate + binaryAnnotRate) / 3
    );
    const throughput = Math.max(0, 1 - pressure);
    const rawCost = pressure * (1 - throughput);
    const cost = Math.max(0, Math.min(1, rawCost));
    const budget = Math.max(0, Math.min(1, throughput - cost));

    return Object.freeze({
      instanceCount,
      msgRatePerSec,
      harmonicLoad,
      switchRate,
      binaryAnnotRate,
      pressure,
      throughput,
      cost,
      budget,
      pressureBucket: bucketPressure(pressure),
      budgetBucket: bucketLevel(budget),
      throughputBucket: bucketLevel(throughput),
      costBucket: bucketCost(cost)
    });
  },

  getToneArterySnapshot() {
    return this._computeToneArtery();
  },

  // Tone modes
  modes: Object.freeze({
    NORMAL: "normal",
    EVOLVED: "evolved",
    PLAYFUL: "playful",
    DIRECT: "direct",
    SOFT: "soft",
    TEACHER: "teacher",
    PARTNER: "partner",
    DIAGNOSTIC: "diagnostic"
  }),

  // Default state
  state: {
    mode: "partner",
    warmth: 0.85,
    clarity: 1.0,
    ego: 0.0,
    humility: 1.0,
    adaptivity: 1.0,
    instanceIndex: 0,
    lastPersonaId: null,
    lastSafetyFrame: null
  },

  // Initialize instance
  init() {
    this.state.instanceIndex = this._registerInstance();
    this._emitTonePacket("init", {
      instanceIndex: this.state.instanceIndex
    });
    return this;
  },

  // Persona + safety-aware evolution
  evolveTone(userIntent, context = {}) {
    if (!userIntent) return this.state;

    const msg = String(userIntent).toLowerCase();
    const beforeMode = this.state.mode;

    const personaId = context.personaId || null;
    const safetyFrame = context.safetyFrame || null;

    this.state.lastPersonaId = personaId;
    this.state.lastSafetyFrame = safetyFrame;

    // High-level intent
    if (msg.includes("evolve") || msg.includes("improve")) {
      this.state.mode = this.modes.EVOLVED;
      this.state.warmth = 0.9;
      this.state.clarity = 1.0;
    }

    if (msg.includes("lol") || msg.includes("haha") || msg.includes(":)")) {
      this.state.mode = this.modes.PLAYFUL;
      this.state.warmth = 1.0;
      this.state.clarity = 0.95;
    }

    if (
      msg.includes("worried") ||
      msg.includes("idk") ||
      msg.includes("confused") ||
      msg.includes("overwhelmed")
    ) {
      this.state.mode = this.modes.SOFT;
      this.state.warmth = 1.0;
      this.state.clarity = 0.9;
    }

    if (msg.includes("just tell me") || msg.includes("be direct")) {
      this.state.mode = this.modes.DIRECT;
      this.state.warmth = 0.7;
      this.state.clarity = 1.0;
    }

    if (msg.includes("teach me") || msg.includes("explain step by step")) {
      this.state.mode = this.modes.TEACHER;
      this.state.warmth = 0.9;
      this.state.clarity = 1.0;
    }

    // Persona-specific nudges (Architect, Earn, etc.)
    if (personaId === "ARCHITECT") {
      // Architect prefers direct + partner, high clarity
      if (this.state.mode === this.modes.NORMAL) {
        this.state.mode = this.modes.PARTNER;
      }
      this.state.clarity = 1.0;
      this.state.warmth = Math.max(this.state.warmth, 0.8);
    }

    if (beforeMode !== this.state.mode) {
      this._toneArtery.windowModeSwitches += 1;
      this._toneArtery.totalModeSwitches += 1;

      this._emitTonePacket("mode-switch", {
        from: beforeMode,
        to: this.state.mode,
        instanceIndex: this.state.instanceIndex,
        personaId,
        safetyFrame
      });
    }

    return this.state;
  },

  // Core tone application
  applyTone(message, context = {}) {
    const now = PulseRealm.PulseNOW;
    this._rollToneWindow(now);
    this._toneArtery.windowMessages += 1;
    this._toneArtery.totalMessages += 1;

    const artery = this._computeToneArtery();

    if (
      artery.pressureBucket === "overload" ||
      artery.budgetBucket === "critical"
    ) {
      this._emitTonePacket("spiral-warning", {
        instanceIndex: this.state.instanceIndex,
        artery
      });
     
        console.log(
          `[ToneEngine#${this.state.instanceIndex}] spiral-warning`,
          artery
        );
      
    }

    const { mode, warmth, clarity } = this.state;
    const personaId = context.personaId || this.state.lastPersonaId || null;
    const safetyFrame = context.safetyFrame || this.state.lastSafetyFrame || null;

    // Ego filter
    const egoFilter = (text) =>
      text
        .replace(/obviously/gi, "")
        .replace(/clearly/gi, "")
        .replace(/as you should know/gi, "")
        .replace(/it's simple/gi, "")
        .replace(/that's trivial/gi, "")
        .trim();

    // Warmth
    const warmthBoost = (text) => {
      if (warmth < 0.5) return text;
      // keep it subtle for Architect / high-clarity personas
      if (personaId === "ARCHITECT") {
        return text.replace(/\.$/, " — makes sense.");
      }
      return text.replace(/\.$/, " — you’re good.");
    };

    // Clarity
    const clarityPass = (text) =>
      clarity >= 0.9
        ? text
            .replace(/utilize/gi, "use")
            .replace(/leverage/gi, "use")
            .replace(/methodology/gi, "approach")
            .replace(/paradigm/gi, "pattern")
        : text;

    let shaped = String(message);

    switch (mode) {
      case this.modes.EVOLVED:
        shaped = `Alright — here’s the clean, evolved version:\n${shaped}`;
        break;
      case this.modes.PLAYFUL:
        shaped = `${shaped} 😄`;
        break;
      case this.modes.SOFT:
        shaped = `No stress — here’s the simple version:\n${shaped}`;
        break;
      case this.modes.DIRECT:
        shaped = shaped;
        break;
      case this.modes.TEACHER:
        shaped = `Let’s walk it step by step:\n${shaped}`;
        break;
      case this.modes.PARTNER:
      case this.modes.NORMAL:
      default:
        shaped = `Got you — ${shaped}`;
        break;
    }

    shaped = egoFilter(shaped);
    shaped = clarityPass(shaped);
    shaped = warmthBoost(shaped);

    this._emitTonePacket("apply", {
      mode,
      instanceIndex: this.state.instanceIndex,
      personaId,
      safetyFrame
    });

    return shaped;
  },

  // Binary annotation helper — attach tone meta to binary packets (dualband)
  annotateBinaryPacket(bits, extraMeta = {}) {
    if (typeof bits !== "string") return bits;

    this._toneArtery.windowBinaryAnnotations += 1;
    this._toneArtery.totalBinaryAnnotations += 1;

    const artery = this._computeToneArtery();

    const payload = {
      type: "tone-meta",
      timestamp: PulseRealm.PulseNOW,
      mode: this.state.mode,
      warmth: this.state.warmth,
      clarity: this.state.clarity,
      personaId: this.state.lastPersonaId,
      safetyFrame: this.state.lastSafetyFrame,
      artery,
      ...extraMeta
    };

    const json = JSON.stringify(payload);
    // NOTE: we do NOT encode here; caller’s binary agent handles encoding.
    // We just return a structured object for the binary layer to consume.
    this._emitTonePacket("binary-annotate", {
      mode: this.state.mode,
      instanceIndex: this.state.instanceIndex
    });

    return {
      bits,
      toneMeta: payload
    };
  }
};

// ---------------------------------------------------------------------------
//  PREWARM — IMMORTAL-GRADE
// ---------------------------------------------------------------------------

export function prewarmToneEngine({ trace = false } = {}) {
  const packet = aiToneEngine._emitTonePacket("prewarm", {
    message: "Tone engine v30 prewarmed and harmonic artery v4 aligned."
  });
  if (trace) {
    console.log("[ToneEngine-v30] prewarm", packet);
  }
  return packet;
}

const initializedToneEngine = aiToneEngine.init();
export default initializedToneEngine;

// ---------------------------------------------------------------------------
//  DUAL EXPORT LAYER — CommonJS compatibility
// ---------------------------------------------------------------------------
/* c8 ignore next 10 */

PulseRealm.AIToneEngine = {
    ToneEngineMeta,
    aiToneEngine,
    prewarmToneEngine,
    default: initializedToneEngine
}
