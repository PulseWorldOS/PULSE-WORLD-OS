// ============================================================================
// FILE: PULSE-MULTIVERSE/PulseOSKernel.js
// PURPOSE: Pulse World OS — Speed Import (1st CDN compile)
// UPGRADED: Multiverse Diagnostics + Atomic Ops + SAB + Mirror Intelligence
// ============================================================================

console.groupCollapsed(
  "%c[PULSEWORLD::Speed] Importing PulseOSSpeed.js from Port.ServiceWorker.Net!",
  "color:#00FFCC; font-weight:bold; font-family:monospace;"
);

console.log("🌐 Import Source:", import.meta.url);

// ---------------------------------------------------------------------------
// REALM INITIALIZATION
// ---------------------------------------------------------------------------
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});
PulseRealm.__speed = PulseRealm.__speed || {};
PulseRealm.__mirrors = PulseRealm.__mirrors || {};
PulseRealm.__atomic = PulseRealm.__atomic || {};
PulseRealm.__sab = PulseRealm.__sab || {};



// ---------------------------------------------------------------------------
// IMPORT DRIFT COMPANION
// ---------------------------------------------------------------------------
import "./DriftCompanion.js";
console.log("🔧 ServiceWorker.Net's DriftCompanion Imported!");

// ============================================================================
// ⭐ AUTOMATED MULTI-DOMAIN FAILOVER ENGINE — UPGRADED WITH DIAGNOSTICS
// ============================================================================

const PULSE_MIRROR_DOMAINS = [
  "https://www.pulseworld.net",
  "https://www.pulseworld.me",
  "https://www.pulseworld.biz",
  "https://www.pulseworld.money",
  "https://www.serviceworker.net",
  "https://www.binaryos.net",
  "https://www.gpuprocessing.net",
  "https://www.booleanlogic.net",
  "https://www.orbitalmap.net"
];

PulseRealm.activeMirrorIndex = PulseRealm.activeMirrorIndex ?? 0;

PulseRealm.__mirrors.failures = PulseRealm.__mirrors.failures || {};
PulseRealm.__mirrors.latency = PulseRealm.__mirrors.latency || {};

export async function fetchWithFailover(resourcePath, options = {}) {
  const timeoutMs = options.timeoutMs ?? 3100;

  const path = resourcePath.startsWith("http")
    ? new URL(resourcePath).pathname + new URL(resourcePath).search
    : resourcePath.startsWith("/")
    ? resourcePath
    : "/" + resourcePath;

  const hostOrder = [];
  for (let i = 0; i < PULSE_MIRROR_DOMAINS.length; i++) {
    const idx = (PulseRealm.activeMirrorIndex + i) % PULSE_MIRROR_DOMAINS.length;
    hostOrder.push({ domain: PULSE_MIRROR_DOMAINS[idx], index: idx });
  }

  console.groupCollapsed(
    "%c[PULSEWORLD::Speed] Failover Attempt",
    "color:#00FFCC; font-family:monospace;"
  );
  console.table(hostOrder);
  console.groupEnd();

  let lastErr = null;

  for (const item of hostOrder) {
    const targetUrl = `${item.domain}${path}`;
    const start = performance.now();

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      const fetchOpts = { ...options, signal: controller.signal };
      delete fetchOpts.timeoutMs;

      const res = await fetch(targetUrl, fetchOpts);
      clearTimeout(timer);

      const latency = (performance.now() - start).toFixed(2);
      PulseRealm.__mirrors.latency[item.domain] = latency;

      console.log(
        `%c[PULSEWORLD::Speed] Mirror Response: ${item.domain} (${latency}ms)`,
        "color:#00FFCC; font-family:monospace;"
      );

      if (res.status >= 500 && res.status <= 504) {
        console.warn(
          `[PULSEWORLD::Speed] Mirror ${item.domain} returned HTTP ${res.status}. Falling over…`
        );
        PulseRealm.__mirrors.failures[item.domain] =
          (PulseRealm.__mirrors.failures[item.domain] ?? 0) + 1;
        continue;
      }

      PulseRealm.activeMirrorIndex = item.index;
      PulseRealm.activeMirrorHost = item.domain;

      console.log(
        `%c[PULSEWORLD::Speed] Active Mirror Set → ${item.domain}`,
        "color:#00FFCC; font-family:monospace;"
      );

      return res;
    } catch (err) {
      console.warn(
        `[PULSEWORLD::Speed] Mirror ${item.domain} unreachable (${err.message}).`
      );
      PulseRealm.__mirrors.failures[item.domain] =
        (PulseRealm.__mirrors.failures[item.domain] ?? 0) + 1;
      lastErr = err;
    }
  }

  throw lastErr || new Error("All Pulse mirror domains unreachable.");
}

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
                "/PulseWorldInventory.txt",
                "/PulseWorldChallenge.txt",
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

// ============================================================================
// ⭐ ATOMIC SPEED COUNTER
// ============================================================================
PulseRealm.__atomic.speedCounter = new Int32Array(new SharedArrayBuffer(4));

PulseRealm.incrementSpeed = () => {
  Atomics.add(PulseRealm.__atomic.speedCounter, 0, 1);
  const v = Atomics.load(PulseRealm.__atomic.speedCounter, 0);
  console.log("⚛️ [PULSEWORLD::SpeedAtomic] Counter:", v);
  return v;
};

// ============================================================================
// ⭐ SHAREDARRAYBUFFER SPEED LANE
// ============================================================================
PulseRealm.__sab.speedBuffer = new SharedArrayBuffer(1024);
PulseRealm.__sab.speedView = new Uint8Array(PulseRealm.__sab.speedBuffer);

PulseRealm.sendSpeedMessage = msg => {
  const bytes = new TextEncoder().encode(msg);
  PulseRealm.__sab.speedView.set(bytes);
  console.log("📡 [PULSEWORLD::SpeedSAB] Message Sent:", msg);
};

// ============================================================================
// ⭐ SPEED ENGINE PROFILER
// ============================================================================
PulseRealm.__speed.profile = () => {
  return {
    activeMirror: PulseRealm.activeMirrorHost,
    mirrorLatency: PulseRealm.__mirrors.latency,
    mirrorFailures: PulseRealm.__mirrors.failures,
    atomicSpeed: Atomics.load(PulseRealm.__atomic.speedCounter, 0),
    ts: Date.now()
  };
};

// ============================================================================
// ⭐ PUBLIC KERNEL EXPORT
// ============================================================================
export const PulseOSKernel = {
  version: "v60",
  mirrorDomains: PULSE_MIRROR_DOMAINS,
  getActiveHost: () =>
    PulseRealm.activeMirrorHost ??
    PULSE_MIRROR_DOMAINS[PulseRealm.activeMirrorIndex ?? 0],
  fetchWithFailover,
  warmBoot: () => {
    if (typeof navigator !== "undefined") {
      navigator.serviceWorker?.controller?.postMessage({
        type: "PULSE_WARM_BOOT",
        ts: Date.now()
      });
    }
  }
};

// ============================================================================
// ⭐ SPEED EXPORT — UPGRADED WITH SIGNATURE + PROFILER
// ============================================================================
export const Speed = {
  engine: "PulseWorld Timing Engine",
  lcp: 0.45,
  cls: 0,
  ts: Date.now(),
  signature: "PulseMultiverse-Speed-Core-v1",
  profile: PulseRealm.__speed.profile
};

console.log(
  "%c[PULSEWORLD::Speed] Speed Module ONLINE — Signature:",
  "color:#00FFCC; font-weight:bold; font-family:monospace;",
  Speed.signature
);
console.groupEnd();
export const speed = Speed;
export default speed;

// OPTIONAL: re-export DriftCompanion API
export * from "./DriftCompanion.js";
