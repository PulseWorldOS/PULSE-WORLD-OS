// ============================================================================
//  PULSE OS v30‑IMMORTAL++ — DELIVERY ENGINE
//  Delivery Organ • Clarity Engine • Drift‑Proof Formatting
//  PURE DELIVERY. ZERO MUTATION OF MEANING. ZERO RANDOMNESS.
//  v30: NO META COUPLING, NO IDENTITY, NO WALL‑CLOCK, NO CONSOLE.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ─────────────────────────────────────────────────────────────
// PRESSURE HELPERS — v30 IMMORTAL++
// ─────────────────────────────────────────────────────────────
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


// ─────────────────────────────────────────────────────────────
// PACKET EMITTER — deterministic, delivery‑scoped (v30 IMMORTAL++)
// ─────────────────────────────────────────────────────────────
function emitDeliveryPacket(type, payload) {
  return Object.freeze({
    packetType: `delivery-${type}`,
    timestamp: 0, // IMMORTAL++: no wall‑clock coupling
    layer: "delivery-engine",
    role: "delivery-organ",
    band: "binary",
    ...payload
  });
}


// ─────────────────────────────────────────────────────────────
// CORE DELIVERY ORGAN — v30‑IMMORTAL++
// ─────────────────────────────────────────────────────────────
export const aiDeliveryEngine = {
  // CORE DELIVERY LOGIC (meaning‑preserving cleanup)
  deliver(text) {
    if (!text || typeof text !== "string") {
      return "";
    }

    let output = text;

    // Remove excessive whitespace (but keep single spaces)
    output = output.replace(/\s+/g, " ");

    // Fix double punctuation
    output = output.replace(/\. \./g, ".");

    // Remove accidental trailing commas or periods (collapse runs)
    output = output.replace(/[,\.]+$/, (match) => match[0]);

    // Trim edges
    output = output.trim();

    return output;
  },

  // ADVANCED DELIVERY — STRUCTURE CLEANUP (line‑level)
  structure(text) {
    if (!text || typeof text !== "string") return "";

    return text
      .replace(/\n\s*\n\s*\n/g, "\n\n") // collapse triple+ newlines
      .replace(/–/g, "-")              // normalize en-dash
      .replace(/—/g, "-")              // normalize em-dash
      .trim();
  },

  // FINAL DELIVERY PIPELINE — idempotent, drift‑proof
  finalize(text) {
    const delivered = this.deliver(text);
    const structured = this.structure(delivered);
    return structured;
  },

  // OPTIONAL: PACKETIZED FINAL DELIVERY — v30 IMMORTAL++
  finalizePacket(text, binaryVitals = {}) {
    const output = this.finalize(text);
    const length = output.length;
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const localPressure =
      (length > 2000 ? 0.4 : 0) +
      (length > 800 ? 0.3 : 0) +
      (length > 200 ? 0.2 : 0);

    const pressure = Math.max(
      0,
      Math.min(1, 0.6 * localPressure + 0.4 * binaryPressure)
    );

    return emitDeliveryPacket("finalize", {
      text: output,
      length,
      organism: {
        pressure,
        pressureBucket: bucketPressure(pressure)
      }
    });
  },

  // DELIVERY ARTERY — symbolic-only, deterministic
  deliveryArtery({ text = "", binaryVitals = {} } = {}) {
    const length = typeof text === "string" ? text.length : 0;
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const localPressure =
      (length > 2000 ? 0.4 : 0) +
      (length > 800 ? 0.3 : 0) +
      (length > 200 ? 0.2 : 0);

    const pressure = Math.max(
      0,
      Math.min(1, 0.6 * localPressure + 0.4 * binaryPressure)
    );

    return {
      organism: {
        pressure,
        pressureBucket: bucketPressure(pressure)
      },
      delivery: {
        length
      }
    };
  }
};


// ─────────────────────────────────────────────────────────────
// DELIVERY ENGINE PREWARM — v30‑IMMORTAL++
// ─────────────────────────────────────────────────────────────
export function prewarmDeliveryEngine() {
  try {
    const warmText = `
      This   is   a   prewarm   test.  .
      
      
      With --- dashes — and em-dashes.
    `;

    aiDeliveryEngine.deliver(warmText);
    aiDeliveryEngine.structure(warmText);
    aiDeliveryEngine.finalize(warmText);
    aiDeliveryEngine.finalizePacket(warmText, { binary: { pressure: 0 } });
    aiDeliveryEngine.deliveryArtery({
      text: warmText,
      binaryVitals: { binary: { pressure: 0 } }
    });

    return emitDeliveryPacket("prewarm", {
      message: "Delivery engine prewarmed and formatting pathways aligned."
    });
  } catch (err) {
    return emitDeliveryPacket("prewarm-error", {
      error: String(err),
      message: "Delivery engine prewarm failed."
    });
  }
}

export default aiDeliveryEngine;


// ─────────────────────────────────────────────────────────────
// BOOT PREWARM + DUAL‑MODE EXPORTS — v30 IMMORTAL++
// ─────────────────────────────────────────────────────────────
prewarmDeliveryEngine();
PulseRealm.PulseAIDeliveryEngine = aiDeliveryEngine;
PulseRealm.PulseAIDeliveryEnginePrearm = prewarmDeliveryEngine;