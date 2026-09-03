/* ------------------------------------------------------------
   PULSEWORLD OS — ROOT BOOT SEQUENCE (Tier‑0)
   ------------------------------------------------------------
   OS Kernel • Layered Boot • Timing Diagnostics • Subsystem Metrics
------------------------------------------------------------ */
globalThis.self = globalThis;

console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] 🔥 LOADED:", import.meta.url);

const bootStart = performance.now();
const bootTime = new Date().toLocaleString();

console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] ");
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] ============================================================");
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] 🚀  PULSEWORLD OS — BOOT SEQUENCE INITIATED");
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] ============================================================");
console.log(`🕒  Boot Time: ${bootTime}`);
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] 🔭  Architecture: Tier‑0 → Tier‑3 → Tier‑2");
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] 🌐  Publish Layer: PULSE-MULTIVERSE");
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] 📡  Device Layer: PULSE-DEVICE");
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] 🛠️  Server Layer: PULSE-SERVER (attaches later)");
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] ------------------------------------------------------------");
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] ");

/* ------------------------------------------------------------
   BOOT TIER‑3 (DEVICE LAYER)
------------------------------------------------------------ */

const deviceBootStart = performance.now();
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] 🔧 [Tier‑0] Engaging PulseDevice Layer...");

import "./PulseDevice.js";

const deviceBootEnd = performance.now();
console.log(`🔧 [Tier‑0] PulseDevice Layer engaged. (Δ=${(deviceBootEnd - deviceBootStart).toFixed(2)}ms)`);
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] ");

/* ------------------------------------------------------------
   FUTURE: SERVER ATTACH POINT (Tier‑1)
------------------------------------------------------------ */

const serverAttachStart = performance.now();

console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] 📡 [Tier‑0] Server Layer attach point ready.");

import "../../PULSE-SERVER/FIREBASE/PULSE-WORLD-SERVER.js";
import "../../PULSE-SERVER/NETLIFY/PULSE-WORLD-SERVER.js";
import "./PULSE-SERVER/NETLIFY/PULSE-WORLD-HEARTBEAT.js";
import "../../PULSE-SERVER/FIREBASE/index.js";
import "./PULSE-SERVER/PULSEWORLDNET-PREWARM.js";

const serverAttachEnd = performance.now();
console.log(`📡 [Tier‑0] Server attach initialized. (Δ=${(serverAttachEnd - serverAttachStart).toFixed(2)}ms)`);
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] ");

/* ------------------------------------------------------------
   FINAL OS BANNER + PERFORMANCE SUMMARY
------------------------------------------------------------ */

const bootEnd = performance.now();
const totalBoot = (bootEnd - bootStart).toFixed(2);

console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] ");
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] ============================================================");
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] ✨  PULSEWORLD OS BOOT COMPLETE");
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] ============================================================");
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] 🌈  All layers operational.");
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] 🧠  Multiverse engine linked.");
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] 🔧  Device layer active.");
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] 📡  Server attach point standing by.");
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] ------------------------------------------------------------");
console.log(`⚡ Total Boot Time: ${totalBoot}ms`);
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] ============================================================");
console.log("🌐 PULSE BOOT WORLD v40.0 — [PulseDeviceLayer] ");
