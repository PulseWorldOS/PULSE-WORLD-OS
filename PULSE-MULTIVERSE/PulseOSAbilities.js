// ============================================================================
// FILE: PULSE-MULTIVERSE/PulseOSAbilities.js
// PURPOSE: Pulse World OS — Abilities Module (Idempotent v2.0 Upgrade)
// ============================================================================

console.groupCollapsed(
  "%c[PULSEWORLD::Abilities] Importing PulseOSAbilities.js...",
  "color:#00FFCC; font-weight:bold; font-family:monospace;"
);

console.log("🌐 Import Source:", import.meta.url);

// ---------------------------------------------------------------------------
// REALM INITIALIZATION (SAFE / IDEMPOTENT)
// ---------------------------------------------------------------------------
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

PulseRealm.__abilities        ??= [];
PulseRealm.__abilityQueue     ??= [];
PulseRealm.__abilitySandbox   ??= {};
PulseRealm.__atomic           ??= {};
PulseRealm.__sab              ??= {};

console.log("🧬 PulseRealm Initialized:", PulseRealm);


// ---------------------------------------------------------------------------
// ABILITY REGISTRATION (NO DUPLICATES)
// ---------------------------------------------------------------------------
if (!PulseRealm.__abilities.some(a => a.name === "PulseOSAbilities")) {
  PulseRealm.__abilities.push({
    name: "PulseOSAbilities",
    version: "v2.0.0",
    ts: Date.now(),
    source: import.meta.url
  });
  console.table(PulseRealm.__abilities);
} else {
  console.log("📦 Ability Already Registered — Skipping");
}

// ---------------------------------------------------------------------------
// RAF LOOP — RUN ONLY ONCE
// ---------------------------------------------------------------------------
if (!PulseRealm.__PULSE_RAF_ACTIVE__) {
  PulseRealm.__PULSE_RAF_ACTIVE__ = true;

  console.log(
    "✨ PULSE MULTIVERSAL RENDERER — Activating Single RAF Loop"
  );

  let rafBeats = 0;
  let lastBeat = performance.now();

  (function rafLoop() {
    rafBeats++;
    const now = performance.now();

    if (now - lastBeat > 2000) {
      console.log(
        "%c[PULSEWORLD::RAF] Heartbeat Stable — " + rafBeats + " frames",
        "color:#00FFCC; font-family:monospace;"
      );
      lastBeat = now;
    }

    requestAnimationFrame(rafLoop);
  })();
} else {
  console.log("✨ RAF Loop Already Active — Skipping");
}

// ---------------------------------------------------------------------------
// PERSISTENT STORAGE — RUN ONLY ONCE
// ---------------------------------------------------------------------------
if (!PulseRealm.__persistChecked) {
  PulseRealm.__persistChecked = true;

  const persistStart = performance.now();

  navigator.storage.persist().then(granted => {
    console.log(
      "%c[PULSEWORLD::Storage] Persistent Storage:",
      "color:#00FFCC; font-family:monospace;",
      granted ? "GRANTED" : "DENIED"
    );

    console.log(
      "%c[PULSEWORLD::Storage] Response Time:",
      "color:#00FFCC; font-family:monospace;",
      (performance.now() - persistStart).toFixed(2) + "ms"
    );
  });
} else {
  console.log("💾 Persistent Storage Already Checked — Skipping");
}

// ---------------------------------------------------------------------------
// WEBGPU WARM PATH — RUN ONLY ONCE
// ---------------------------------------------------------------------------
if (!PulseRealm.__gpuWarmPath) {
  PulseRealm.__gpuWarmPath = true;

  if (navigator.gpu) {
    console.log("🎮 [PULSEWORLD::GPU] WebGPU Interface Detected!");

    const gpuStart = performance.now();

    navigator.gpu.requestAdapter().then(adapter => {
      console.log(
        "%c[PULSEWORLD::GPU] Adapter Response Time:",
        "color:#00FFCC; font-family:monospace;",
        (performance.now() - gpuStart).toFixed(2) + "ms"
      );

      if (!adapter) {
        console.log("🎮 [PULSEWORLD::GPU] Adapter Request FAILED");
        return;
      }

      const deviceStart = performance.now();

      adapter.requestDevice().then(device => {
        console.log(
          "%c[PULSEWORLD::GPU] Device Response Time:",
          "color:#00FFCC; font-family:monospace;",
          (performance.now() - deviceStart).toFixed(2) + "ms"
        );

        if (!device) {
          console.log("🎮 [PULSEWORLD::GPU] Device Request FAILED");
          return;
        }

        PulseRealm.__gpuDevice = device;
        console.log("🎮 [PULSEWORLD::GPU] Compute Layer ONLINE!");
      });
    });
  } else {
    console.log("🎮 [PULSEWORLD::GPU] WebGPU NOT Available");
  }
} else {
  console.log("🎮 GPU Warm Path Already Completed — Skipping");
}

// ---------------------------------------------------------------------------
// ATOMIC OPERATIONS — RUN ONLY ONCE
// ---------------------------------------------------------------------------
if (!PulseRealm.__atomic.counter) {
  PulseRealm.__atomic.counter = new Int32Array(new SharedArrayBuffer(4));
  console.log("⚛️ Atomic Counter Initialized");
} else {
  console.log("⚛️ Atomic Counter Already Exists — Skipping");
}

PulseRealm.atomicIncrement ??= () => {
  Atomics.add(PulseRealm.__atomic.counter, 0, 1);
  const v = Atomics.load(PulseRealm.__atomic.counter, 0);
  console.log("⚛️ [PULSEWORLD::Atomic] Counter:", v);
  return v;
};

// ---------------------------------------------------------------------------
// SHAREDARRAYBUFFER — RUN ONLY ONCE
// ---------------------------------------------------------------------------
if (!PulseRealm.__sab.buffer) {
  PulseRealm.__sab.buffer = new SharedArrayBuffer(1024);
  PulseRealm.__sab.view = new Uint8Array(PulseRealm.__sab.buffer);
  console.log("📡 SAB Initialized");
} else {
  console.log("📡 SAB Already Exists — Skipping");
}

PulseRealm.sendMessage ??= msg => {
  const bytes = new TextEncoder().encode(msg);
  PulseRealm.__sab.view.set(bytes);
  console.log("📡 [PULSEWORLD::SAB] Message Sent:", msg);
};

// ---------------------------------------------------------------------------
// ABILITY QUEUE — SAFE
// ---------------------------------------------------------------------------
PulseRealm.queueAbility ??= fn => {
  PulseRealm.__abilityQueue.push(fn);
  console.log("📦 [PULSEWORLD::Queue] Ability Queued:", fn.name);
};

PulseRealm.runAbilityQueue ??= () => {
  console.log("🚀 [PULSEWORLD::Queue] Running Ability Queue…");
  for (const fn of PulseRealm.__abilityQueue) {
    try {
      fn();
      console.log("✅ Ability Executed:", fn.name);
    } catch (err) {
      console.error("❌ Ability Error:", fn.name, err);
    }
  }
};

// ---------------------------------------------------------------------------
// ABILITY SANDBOX — SAFE
// ---------------------------------------------------------------------------
PulseRealm.registerAbility ??= (name, fn) => {
  if (!PulseRealm.__abilitySandbox[name]) {
    PulseRealm.__abilitySandbox[name] = fn;
    console.log("🧪 [PULSEWORLD::Sandbox] Ability Registered:", name);
  } else {
    console.log("🧪 Ability Already Exists — Skipping:", name);
  }
};

// ---------------------------------------------------------------------------
// EXPORT
// ---------------------------------------------------------------------------
export const Abilities = {
  name: "Pulse World Abilities",
  version: "v2.0.0",
  realm: PulseRealm,
  signature: "PulseMultiverse-Ability-Core-v2",
  ts: Date.now()
};

console.log(
  "%c[PULSEWORLD::Abilities] Ability Module ONLINE — Signature:",
  "color:#00FFCC; font-weight:bold; font-family:monospace;",
  Abilities.signature
);

console.groupEnd();
export const abilities = Abilities;
export default Abilities;
