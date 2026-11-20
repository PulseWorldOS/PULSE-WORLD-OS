
import "./PULSE-MULTIVERSAL-TOUCH.js";
import "./PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-GATE.js";

import "./_CREATION_BARRIER/PULSE-BOOT-BARRIER.js";
import "./_CREATION_BARRIER/PULSE-BOOT-WORLD.js";

import "./PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/X-PULSE-X/PULSE-WORLD-STRANDED-DNA.js";
import "./PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/X-PULSE-X/3RDPARTY/PULSE-WORLD-OPTIMIZE.js";

import "./_PROOF/PULSE-PROOF.js";
import "./PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-BAND/PULSE-BAND.js";
import "./PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-AI/PULSE-AI-ORGANISM.js";
import "./PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-OS/PulseOS-v30.js";

console.groupCollapsed(
  "%c[PULSEWORLD::OS] Importing PulseOSWorld.js...",
  "color:#00FFCC; font-weight:bold; font-family:monospace;"
);

console.log("🌐 Import Source:", import.meta.url);

// ============================================================================
// ⭐ SERVICE WORKER BOOT — UPGRADED WITH TIMING + SIGNATURE
// ============================================================================
if (typeof navigator !== "undefined" && navigator.serviceWorker && PulseRealm.ServiceWorkerOffline === false) {
  const swStart = performance.now();

  navigator.serviceWorker
    .register("./DriftCompanion.js", { updateViaCache: "none" })
    .then(reg => {
      console.log(
        "%c🗄️ PULSE CACHE/DB SYSTEM v60 - [PULSEWORLD] Service Worker Registered",
        "color:#00FF9C; font-weight:bold; font-family:monospace;"
      );

      console.log(
        "%c[PULSEWORLD::Speed] SW Registration Time:",
        "color:#00FFCC; font-family:monospace;",
        (performance.now() - swStart).toFixed(2) + "ms"
      );

      if (reg.waiting) {
        reg.waiting.postMessage({ type: "SKIP_WAITING" });
      }

      reg.addEventListener("updatefound", () => {
        const newSW = reg.installing;

        newSW.addEventListener("statechange", () => {
          if (newSW.state === "activated") {
            console.log(
              "%c🗄️ PULSE CACHE/DB SYSTEM v60 - [PULSEWORLD] SW → Activated Instantly!",
              "color:#00FF9C; font-weight:bold; font-family:monospace;"
            );

            navigator.serviceWorker.controller?.postMessage({
              type: "PULSE_WARM_BOOT",
              ts: Date.now()
            });

            navigator.serviceWorker.controller?.postMessage({
              type: "PULSE_PREFETCH",
              urls: [
                "/PulseWorldReality.txt",
                "/PULSE-ENGINE-BLOCK.txt",
                "/PulseWorldScanner.txt",
                "/PulseWorldInventory.txt",
                "/PulseWorldChallenge.txt",
                "/PulseWorldHistory.txt",
                "/PulseWorldMeshLink.txt",
                "/PulseWorldEmail.txt",
                "/PulsePalSettings.txt",
                "/PulseWorldAssets.txt",
                "/PulseWorldRewards.txt",
                "/PulseWorldVault.txt",
                "/PulseWorldFounders.txt",
                "/PulseWorldTeam.txt",
                
              ]
            });
          }
        });
      });

      if (reg.active) {
        console.log(
          "%c🗄️ PULSE CACHE/DB SYSTEM v60 - [PULSEWORLD] SW → Already Active (Warm Now)",
          "color:#00FF9C; font-weight:bold; font-family:monospace;"
        );

        navigator.serviceWorker.controller?.postMessage({
          type: "PULSE_WARM_BOOT",
          ts: Date.now()
        });
      }
    })
    .catch(() => {});
}

// ---------------------------------------------------------------------------
// REALM INITIALIZATION (SAFE / IDEMPOTENT)
// ---------------------------------------------------------------------------
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

PulseRealm.__os        ??= [];
PulseRealm.__osQueue     ??= [];
PulseRealm.__osSandbox   ??= {};


export const World = {
  name:    "Pulse World OS",
  version: "v30.0-IMMORTAL",
  realm:   PulseRealm,
  signature: "PulseMultiverse-OS-Core-v2",
  ts: Date.now(),
  log:     (...args) => (PulseRealm.PulseLog   ?? console.log)(...args),
  warn:    (...args) => (PulseRealm.PulseWarn  ?? console.warn)(...args),
  error:   (...args) => (PulseRealm.PulseError ?? console.error)(...args),
};

console.log(
  "%c[PULSEWORLD::OS] Binary OS Module ONLINE — Signature:",
  "color:#00FFCC; font-weight:bold; font-family:monospace;",
  World.signature
);
console.groupEnd();

export const world = World;
// DEFAULT EXPORT (for import speed from "...")
export default world;
