/* ------------------------------------------------------------
   PULSE DEVICE LAYER (Tier‑3)
   ------------------------------------------------------------
   Performance engine • Timing diagnostics • Reflex scaffolding
------------------------------------------------------------ */
globalThis.self = globalThis;

console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] 🔥 LOADED:", import.meta.url);

console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] 🔧 [Tier‑3] PulseDevice Layer: Boot sequence initiated...");

// ------------------------------------------------------------
// IMPORT MULTIVERSE ENGINE (Tier‑2)
// ------------------------------------------------------------

console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] 🔧 [Tier‑3] Linking to PulseMultiverse Engine...");
import "../PULSE-MULTIVERSE/PulseMultiverse.js";
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] 🔧 [Tier‑3] Multiverse link established.");

// ------------------------------------------------------------
// DEVICE CONTEXT (performance + reflex scaffolding)
// ------------------------------------------------------------

const deviceContext = {
    status: "initializing",
    bootTime: Date.now(),

    metrics: {
        ticks: 0,
        lastTick: Date.now(),
        avgDelta: 0,
        minDelta: Infinity,
        maxDelta: 0,
        jitterScore: 0
    },

    policies: {
        timing: {},
        performance: {},
        reflex: {}
    },

    reflex: {
        mirrorEnabled: false,
        lastEvent: null
    }
};

// ------------------------------------------------------------
// INTERNAL: DEVICE TICKER (REAL SPEED METRICS)
// ------------------------------------------------------------

function deviceTick() {
    const now = Date.now();
    const delta = now - deviceContext.metrics.lastTick;

    const m = deviceContext.metrics;

    m.ticks++;
    m.lastTick = now;

    // Update min/max delta
    if (delta < m.minDelta) m.minDelta = delta;
    if (delta > m.maxDelta) m.maxDelta = delta;

    // Update moving average
    if (m.avgDelta === 0) {
        m.avgDelta = delta;
    } else {
        m.avgDelta = (m.avgDelta * 0.9) + (delta * 0.1);
    }

    // Jitter score (difference between delta and avg)
    m.jitterScore = Math.abs(delta - m.avgDelta);

    // Tick log (short)
    console.log(
        `⏱️ [Tick ${m.ticks}] Δ=${delta}ms | avg=${m.avgDelta.toFixed(2)}ms`
    );
}

// ------------------------------------------------------------
// PERFORMANCE REPORT (EVERY 5 SECONDS)
// ------------------------------------------------------------

function performanceReport() {
    const m = deviceContext.metrics;

    console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] ");
    console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] 📊 [Tier‑3] DEVICE PERFORMANCE REPORT");
    console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] -------------------------------------");
    console.log(`Ticks:        ${m.ticks}`);
    console.log(`Avg Δ:        ${m.avgDelta.toFixed(2)}ms`);
    console.log(`Min Δ:        ${m.minDelta}ms`);
    console.log(`Max Δ:        ${m.maxDelta}ms`);
    console.log(`Jitter:       ${m.jitterScore.toFixed(2)}ms`);
    console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] -------------------------------------");
    console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] ");
}

// ------------------------------------------------------------
// BOOTSTRAP
// ------------------------------------------------------------

function bootDeviceLayer() {
    console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] 🔧 [Tier‑3] PulseDevice Layer: Initializing subsystems...");

    deviceContext.status = "ready";

    console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] 🔧 [Tier‑3] PulseDevice Layer: Ready.");
    console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] 🔧 [Tier‑3] Device heartbeat + performance metrics engaged.");

    // Tick every second
    setInterval(deviceTick, 1000);

    // Performance report every 5 seconds
    setInterval(performanceReport, 5000);
}

// Engage Tier‑3
bootDeviceLayer();

// ------------------------------------------------------------
// EXPORTS
// ------------------------------------------------------------

export { deviceContext, bootDeviceLayer };
