// ============================================================================
//  PULSE OS v30.0‑IMMORTAL‑EVO++ — BINARY CORTEX ORGAN
//  aiBinaryAgent-v30.js
//  Binary Compute Cortex • Artery Metrics • Compute-Intelligence Surfaces
//  PURE BINARY PHYSIOLOGY. ZERO SYMBOLIC. ZERO RANDOMNESS.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ---------------------------------------------------------
//  IMMORTAL HELPERS — ZERO RANDOMNESS, MONOTONIC EPOCH
// ---------------------------------------------------------

let IMMORTAL_TICK = 0;
function immortalEpoch() {
  IMMORTAL_TICK += 1;
  return IMMORTAL_TICK;
}

function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals.layered.organism.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals.binary.pressure != null)
    return binaryVitals.binary.pressure;
  return 0;
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

// ---------------------------------------------------------
//  BINARY AGENT PREWARM ENGINE — v30 IMMORTAL
// ---------------------------------------------------------

export function prewarmAIBinaryAgent(config = {}) {
  try {
    const {
      encoder,
      compute,
      trace,
      measurePressure,
      measureThroughput,
      measureCost,
      measureBudget,
      deltaEngine,              // optional: AIBinaryDelta or compatible
      sampleComputeSurface      // optional: (phase) => surface
    } = config;

    const localTrace = !!trace;
    const traceFn = localTrace
      ? (event, payload) =>
          console.log("[AIBinaryAgent:prewarm:v30]", event, payload)
      : () => {};

    // Warm encoder encode/decode
    if (encoder.encode && encoder.decode) {
      const warmJson = JSON.stringify({ id: "prewarm-v30", bits: 0 });
      const warmBits = encoder.encode(warmJson);
      encoder.decode(warmBits, "string");
      traceFn("encoder:warm", { bits: warmBits.length });
    }

    // Warm binary compute arteries
    if (typeof compute === "function" && encoder.encode) {
      const token = encoder.encode("prewarm-compute-v30");
      compute(token);
      traceFn("compute:warm", { tokenBits: token.length });
    }

    // Warm pressure/throughput/cost/budget meters if present
    if (typeof measurePressure === "function") {
      measurePressure();
      traceFn("measurePressure:warm");
    }
    if (typeof measureThroughput === "function") {
      measureThroughput();
      traceFn("measureThroughput:warm");
    }
    if (typeof measureCost === "function") {
      measureCost();
      traceFn("measureCost:warm");
    }
    if (typeof measureBudget === "function") {
      measureBudget();
      traceFn("measureBudget:warm");
    }

    // Warm compute‑intelligence + delta engine if provided
    if (deltaEngine && typeof deltaEngine.computeDelta === "function") {
      const prevSurface =
        (typeof sampleComputeSurface === "function"
          ? sampleComputeSurface("prev")
          : { pressure: 0.1, load: 0.1, advantage: 0, speed: 0.1 });

      const nextSurface =
        (typeof sampleComputeSurface === "function"
          ? sampleComputeSurface("next")
          : { pressure: 0.2, load: 0.2, advantage: 0.05, speed: 0.2 });

      deltaEngine.computeDelta(prevSurface, nextSurface);
      traceFn("deltaEngine:warm", { prevSurface, nextSurface });
    }

    return true;
  } catch (err) {
    console.error("[AIBinaryAgent Prewarm v30] Failed:", err);
    return false;
  }
}

// ---------------------------------------------------------
//  ORGAN IMPLEMENTATION — v30 IMMORTAL‑EVO++
// ---------------------------------------------------------

export const AIBinaryAgent = (() => {
  // ---------------------------------------------------------
  // IMMORTAL CREATION SURFACE
  // ---------------------------------------------------------
  const create = (config = {}) => {
    const id = config.id || "ai-binary-agent";
    const maxBits =
      typeof config.maxBits === "number" ? config.maxBits : 64;
    const maxInputs =
      typeof config.maxInputs === "number" ? config.maxInputs : 64;
    const traceEnabled = !!config.trace;

    const gpuHints = Object.freeze({
      allowGPU: !!config.allowGPU,
      preferredBatchSize: config.preferredBatchSize || 0,
      preferredBufferBits: config.preferredBufferBits || maxBits,
      pressure: config.gpuPressure ?? 0,
      load: config.gpuLoad ?? 0,
      util: config.gpuUtil ?? 0,
      pressureBucket: config.gpuPressureBucket ?? null,
      loadBucket: config.gpuLoadBucket ?? null,
      utilBucket: config.gpuUtilBucket ?? null
    });

    const deltaEngine = config.deltaEngine || null;
    const triHeartId = config.triHeartId || "dad";
    const sampleComputeSurface = config.sampleComputeSurface || null;

    const historySize =
      typeof config.historySize === "number" ? config.historySize : 32;
    const overloadThreshold =
      typeof config.overloadThreshold === "number"
        ? config.overloadThreshold
        : 0.9;

    const surfaceHistory = [];

    // ---------------------------------------------------------
    // INTERNAL TRACE
    // ---------------------------------------------------------
    const _trace = (event, payload) => {
      if (!traceEnabled) return;
      console.log(`[${id}:v30] ${event}`, payload);
    };

    // ---------------------------------------------------------
    //  BINARY COMPUTE ARTERY METRICS
    // ---------------------------------------------------------
    const _computeComputeThroughput = (inputCount, avgBits) => {
      const countFactor = Math.min(1, inputCount / maxInputs);
      const sizeFactor = Math.min(1, avgBits / maxBits);
      const raw = Math.max(0, 1 - (countFactor * 0.5 + sizeFactor * 0.5));
      return Math.min(1, raw);
    };

    const _computeComputePressure = (inputCount, totalBits) => {
      const density = inputCount + totalBits / maxBits;
      const raw = Math.min(1, density / (maxInputs + 32));
      return Math.max(0, raw);
    };

    const _computeComputeCost = (pressure, throughput) => {
      const raw = pressure * (1 - throughput);
      return Math.max(0, Math.min(1, raw));
    };

    const _computeComputeBudget = (throughput, cost) => {
      const raw = throughput - cost;
      return Math.max(0, Math.min(1, raw));
    };

    const _bucketLevel = (v) => bucketLevel(v);
    const _bucketPressure = (v) => bucketPressure(v);
    const _bucketCost = (v) => bucketCost(v);

    const _computeArtery = (binaryInputs) => {
      const inputCount = binaryInputs.length;

      let totalBits = 0;
      for (const b of binaryInputs) totalBits += b.length;

      const avgBits = inputCount > 0 ? totalBits / inputCount : 0;

      const throughput = _computeComputeThroughput(inputCount, avgBits);
      const pressure = _computeComputePressure(inputCount, totalBits);
      const cost = _computeComputeCost(pressure, throughput);
      const budget = _computeComputeBudget(throughput, cost);

      const artery = {
        throughput,
        throughputBucket: _bucketLevel(throughput),

        pressure,
        pressureBucket: _bucketPressure(pressure),

        cost,
        costBucket: _bucketCost(cost),

        budget,
        budgetBucket: _bucketLevel(budget),

        inputCount,
        totalBits,
        avgBits
      };

      artery.overload = pressure >= overloadThreshold;
      artery.overloadBucket = artery.overload ? "overload" : "normal";

      return artery;
    };

    // ---------------------------------------------------------
    //  COMPUTE‑INTELLIGENCE SURFACE — v30 IMMORTAL
    // ---------------------------------------------------------
    const _buildComputeIntelligenceSurface = (
      arteryMetrics = {},
      extras = {},
      binaryVitals = {}
    ) => {
      const {
        throughput = 0,
        pressure = 0,
        cost = 0,
        budget = 0,
        throughputBucket,
        pressureBucket,
        costBucket,
        budgetBucket,
        inputCount = 0,
        totalBits = 0,
        avgBits = 0,
        overload = false,
        overloadBucket = "normal"
      } = arteryMetrics;

      const {
        gpuPressure = gpuHints.pressure ?? 0,
        gpuLoad = gpuHints.load ?? 0,
        gpuUtil = gpuHints.util ?? 0,
        gpuPressureBucket = gpuHints.pressureBucket ?? null,
        gpuLoadBucket = gpuHints.loadBucket ?? null,
        gpuUtilBucket = gpuHints.utilBucket ?? null,
        capacity = 1,
        capacityBucket = "high",
        present = true
      } = extras;

      const organismPressure = extractBinaryPressure(binaryVitals);

      return Object.freeze({
        pressure,
        load: 1 - throughput,
        cost,
        budget,

        pressureBucket: pressureBucket || _bucketPressure(pressure),
        loadBucket: _bucketLevel(1 - throughput),
        costBucket: costBucket || _bucketCost(cost),
        budgetBucket: budgetBucket || _bucketLevel(budget),

        speed: throughput,
        speedBucket: _bucketLevel(throughput),

        capacity,
        capacityBucket,
        present: !!present,

        gpuPressure,
        gpuLoad,
        gpuUtil,
        gpuPressureBucket:
          gpuPressureBucket || _bucketPressure(gpuPressure),
        gpuLoadBucket: gpuLoadBucket || _bucketLevel(gpuLoad),
        gpuUtilBucket: gpuUtilBucket || _bucketLevel(gpuUtil),

        inputCount,
        totalBits,
        avgBits,

        overload,
        overloadBucket,
        organismPressure,
        organismPressureBucket: bucketPressure(organismPressure),

        cortexId: id,
        triHeartId,
        epoch: immortalEpoch(),
        band: "binary"
      });
    };

    const _pushSurfaceHistory = (surface) => {
      surfaceHistory.push(surface);
      if (surfaceHistory.length > historySize) {
        surfaceHistory.shift();
      }
    };

    const getSurfaceHistory = () => Object.freeze([...surfaceHistory]);

    const getLastSurface = () => {
      if (surfaceHistory.length === 0) return null;
      return surfaceHistory[surfaceHistory.length - 1];
    };

    // ---------------------------------------------------------
    //  BINARY ENCODING / DECODING
    // ---------------------------------------------------------
    const encodeNumber = (value) => {
      if (typeof value === "bigint") return value.toString(2);
      if (typeof value !== "number" || !Number.isFinite(value)) {
        throw new TypeError("encodeNumber expects a finite number or bigint");
      }
      return Math.trunc(value).toString(2);
    };

    const decodeNumber = (binaryStr) => {
      if (!/^[01]+$/.test(binaryStr)) {
        throw new TypeError("decodeNumber expects a binary string");
      }
      if (binaryStr.length > 53) {
        return BigInt("0b" + binaryStr);
      }
      return parseInt(binaryStr, 2);
    };

    const _assertBinary = (str) => {
      if (typeof str !== "string" || !/^[01]+$/.test(str)) {
        throw new TypeError("expected binary string");
      }
    };

    const _bytesToBinary = (bytes) => {
      let out = "";
      for (const byte of bytes) {
        out += byte.toString(2).padStart(8, "0");
      }

      if (out.length > maxBits && maxBits > 0) {
        _trace("bytesToBinary:truncated", {
          originalBits: out.length,
          maxBits
        });
        return out.slice(-maxBits);
      }

      return out;
    };

    const _binaryToBytes = (binaryStr) => {
      _assertBinary(binaryStr);

      const padded = binaryStr.padStart(
        Math.ceil(binaryStr.length / 8) * 8,
        "0"
      );

      const bytes = [];
      for (let i = 0; i < padded.length; i += 8) {
        bytes.push(parseInt(padded.slice(i, i + 8), 2));
      }

      return Uint8Array.from(bytes);
    };

    const encode = (value) => {
      if (typeof value === "number" || typeof value === "bigint") {
        return encodeNumber(value);
      }
      if (typeof value === "string") {
        const bytes = Buffer.from(value, "utf8");
        return _bytesToBinary(bytes);
      }
      if (value instanceof Uint8Array || Buffer.isBuffer(value)) {
        return _bytesToBinary(value);
      }
      if (typeof value === "object" && value !== null) {
        const json = JSON.stringify(value);
        const bytes = Buffer.from(json, "utf8");
        return _bytesToBinary(bytes);
      }
      throw new TypeError("encode: unsupported type");
    };

    const decode = (binaryStr, type = "number") => {
      switch (type) {
        case "number":
          return decodeNumber(binaryStr);
        case "bigint":
          return BigInt("0b" + binaryStr);
        case "string": {
          const bytes = _binaryToBytes(binaryStr);
          return Buffer.from(bytes).toString("utf8");
        }
        case "bytes":
          return _binaryToBytes(binaryStr);
        case "json": {
          const bytes = _binaryToBytes(binaryStr);
          const text = Buffer.from(bytes).toString("utf8");
          return JSON.parse(text);
        }
        default:
          throw new TypeError(`decode: unsupported target type "${type}"`);
      }
    };

    // ---------------------------------------------------------
    //  PUBLIC: computeIntelligenceSnapshot v30
    // ---------------------------------------------------------
    const computeIntelligenceSnapshot = (
      inputs = [],
      {
        extras = {},
        prevSurface = null,
        binaryVitals = {}
      } = {}
    ) => {
      const binaryInputs = inputs.map((v) => encode(v));
      const artery = _computeArtery(binaryInputs);
      const surface = _buildComputeIntelligenceSurface(
        artery,
        extras,
        binaryVitals
      );

      let deltaPacket = null;
      if (
        deltaEngine &&
        typeof deltaEngine.computeDelta === "function" &&
        prevSurface
      ) {
        deltaPacket = deltaEngine.computeDelta(prevSurface, surface);
        _trace("computeIntelligence:delta", {
          prevSurface,
          surface
        });
      } else {
        _trace("computeIntelligence:surface", { surface });
      }

      _pushSurfaceHistory(surface);

      return { artery, surface, deltaPacket };
    };

    // ---------------------------------------------------------
    //  BINARY COMPUTE SURFACE (Presence‑aware)
    // ---------------------------------------------------------
    const computeBinary = (fn, ...inputs) => {
      if (typeof fn !== "function") {
        throw new TypeError("computeBinary expects a function");
      }

      const binaryInputs = inputs.map((v) => encode(v));
      const artery = _computeArtery(binaryInputs);

      _trace("computeBinary:inputs", {
        binaryInputs,
        artery,
        gpuHints
      });

      const result = fn(binaryInputs);

      _trace("computeBinary:rawResult", result);

      if (Array.isArray(result)) {
        result.forEach((r) => _assertBinary(r));
      } else {
        _assertBinary(result);
      }

      return result;
    };

    const computeAndProject = (fn, projector, ...inputs) => {
      const binaryResult = computeBinary(fn, ...inputs);

      if (Array.isArray(binaryResult)) {
        const projected = binaryResult.map((b) => projector(b));
        _trace("computeAndProject:projected", projected);
        return projected;
      }

      const projected = projector(binaryResult);
      _trace("computeAndProject:projected", projected);
      return projected;
    };

    // ---------------------------------------------------------
    //  EXAMPLE BINARY OPS
    // ---------------------------------------------------------
    const addBinary = (aBin, bBin) => {
      _assertBinary(aBin);
      _assertBinary(bBin);

      const a = BigInt("0b" + aBin);
      const b = BigInt("0b" + bBin);
      const sum = a + b;

      const out = sum.toString(2);
      _trace("addBinary", { aBin, bBin, out });
      return out;
    };

    const andBinary = (aBin, bBin) => {
      _assertBinary(aBin);
      _assertBinary(bBin);

      const len = Math.max(aBin.length, bBin.length);
      const a = aBin.padStart(len, "0");
      const b = bBin.padStart(len, "0");

      let out = "";
      for (let i = 0; i < len; i++) {
        out += a[i] === "1" && b[i] === "1" ? "1" : "0";
      }

      _trace("andBinary", { a, b, out });
      return out.replace(/^0+(?=\d)/, "") || "0";
    };

    const orBinary = (aBin, bBin) => {
      _assertBinary(aBin);
      _assertBinary(bBin);

      const len = Math.max(aBin.length, bBin.length);
      const a = aBin.padStart(len, "0");
      const b = bBin.padStart(len, "0");

      let out = "";
      for (let i = 0; i < len; i++) {
        out += a[i] === "1" || b[i] === "1" ? "1" : "0";
      }

      _trace("orBinary", { a, b, out });
      return out.replace(/^0+(?=\d)/, "") || "0";
    };

    const xorBinary = (aBin, bBin) => {
      _assertBinary(aBin);
      _assertBinary(bBin);

      const len = Math.max(aBin.length, bBin.length);
      const a = aBin.padStart(len, "0");
      const b = bBin.padStart(len, "0");

      let out = "";
      for (let i = 0; i < len; i++) {
        out += a[i] !== b[i] ? "1" : "0";
      }

      _trace("xorBinary", { a, b, out });
      return out.replace(/^0+(?=\d)/, "") || "0";
    };

    // ---------------------------------------------------------
    // IMMORTAL SURFACE
    // ---------------------------------------------------------
    return {
      id,
      maxBits,
      maxInputs,
      gpuHints,
      deltaEngine,
      triHeartId,
      sampleComputeSurface,
      historySize,
      overloadThreshold,

      getSurfaceHistory,
      getLastSurface,
      computeIntelligenceSnapshot,

      encodeNumber,
      decodeNumber,
      encode,
      decode,

      computeBinary,
      computeAndProject,

      addBinary,
      andBinary,
      orBinary,
      xorBinary
    };
  };

  return { create };
})();


// ---------------------------------------------------------
//  PRESENCE SURFACE / FACTORY EXPORT — v30.0‑IMMORTAL‑EVO++
// ---------------------------------------------------------


export const createAIBinaryAgent = (config = {}) => {
  prewarmAIBinaryAgent(config);
  return AIBinaryAgent(config);
};
export const BinaryAgentPresence = Object.freeze({
  meta: {
    id: "ai-binary-agent",
    version: (PulseRealm.__PULSE_TOUCH_VERSION) || "v30.0-IMMORTAL-EVO++",
    layer: "binary",
    role: "binary-cortex",
    band: "binary"
  },

  create: createAIBinaryAgent,
  prewarm: prewarmAIBinaryAgent,
  organ: "AIBinaryAgent"
});

// ---------------------------------------------------------
//  COMMONJS FALLBACK EXPORT (Dual‑Mode)
// ---------------------------------------------------------
PulseRealm.AIBinaryAgent = {
    AIBinaryAgent,
    createAIBinaryAgent,
    BinaryAgentPresence,
    prewarmAIBinaryAgent
}

// Default ES export for v30‑IMMORTAL surface usage
export default createAIBinaryAgent;
