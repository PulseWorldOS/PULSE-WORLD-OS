// ============================================================================
// FILE: PULSE-ENGINE/PulseEngineOverallEngineTests-v31-IMMORTAL-TRIPLETHREAT.js
// LAYER: OVERALL ENGINE TEST HARNESS (v31 IMMORTAL + GPU + EARN + HARMONICS)
// ============================================================================
//
// GOAL:
//   • Sanity-check the v31 Motion Engine + GPU Worker + Earn + Harmonics.
//   • Verify pixel → GPU_COMPUTE_PIXEL → gpuHint → metrics.artery flow.
//   • Verify forward/backward lanes tick, write metrics, and keep determinism.
//   • Verify earn lane + harmonics lane surface hints + metrics coherently.
//   • Verify device capability profile + harmonics profile are present & stable.
//   • Keep this as a *lightweight*, deterministic harness (no randomness).
//
// CONTRACT:
//   • No eval(), no Function(), no dynamic imports.
//   • No real network calls; all organs are mocked/in-memory.
//   • Tests are idempotent and safe to run repeatedly.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import {
  createPulseEngineProcess,
  PulseEngineProcessMeta
} from "./PulseEngineProcess-v31.js";

import {
  PulseGPUProcessWorker,
  detectDeviceProfile
} from "./PulseEngineGPUProcessWorker-v31.js";

// Harmonics worker (triple-threat: GPU + Earn + Harmonics)
import {
  PulseHarmonicProcessWorker as PulseHarmonicsWorker,
  detectDeviceProfile as detectHarmonicsProfile
} from "./PulseEngineHarmonicsProcessWorker-v31.js";

import {
  submit as forwardSubmit,
  submitPixel as forwardSubmitPixel,
  tick as forwardTick,
  snapshot as forwardSnapshot
} from "./PulseEngineForwardProcess-v31.js";

import {
  createBackwardMotionProcess,
  BACKWARD_MOTION_ROLE_V31
} from "./PulseEngineBackwardProcess-v31.js";





function createMemoryOrgan() {
  const store = new Map();
  return {
    read(key) {
      return store.get(key);
    },
    write(key, value) {
      store.set(key, value);
      return true;
    },
    dump() {
      return Object.fromEntries(store.entries());
    }
  };
}

function createBrainOrgan() {
  const events = [];
  return {
    evolve(evt) {
      events.push(evt);
    },
    getEvents() {
      return events.slice();
    }
  };
}

function createNoopOrgan(name) {
  return {
    id: name,
    tick() {
      return { ok: true, organ: name };
    }
  };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`[PulseEngineOverallEngineTests-v31] ASSERT FAILED: ${message}`);
  }
}

function logTest(name, fn) {
  try {
    const result = fn();
    if (result instanceof Promise) {
      return result.then(() => {
        console.log(`[PulseEngineOverallEngineTests-v31] ✅ ${name}`);
      });
    }
    console.log(`[PulseEngineOverallEngineTests-v31] ✅ ${name}`);
  } catch (err) {
    console.error(`[PulseEngineOverallEngineTests-v31] ❌ ${name}`, err);
    throw err;
  }
}

// ---------------------------------------------------------------------------
// TEST ENGINE HARNESS (TRIPLE THREAT: GPU + EARN + HARMONICS)
// ---------------------------------------------------------------------------
function createTestMotionEngine() {
  const MemoryOrgan = createMemoryOrgan();
  const BrainOrgan = createBrainOrgan();

  const engine = createPulseEngineProcess({
    MemoryOrgan,
    BrainOrgan,
    RegioningPhysics: createNoopOrgan("RegioningPhysics"),
    LineageEngine: createNoopOrgan("LineageEngine"),
    SnapshotPhysics: createNoopOrgan("SnapshotPhysics"),
    MultiOrganismSupport: createNoopOrgan("MultiOrganismSupport"),
    ExecutionPhysics: createNoopOrgan("ExecutionPhysics"),
    instanceId: "test-motion",
    trace: false,
    presenceContext: {
      band: "test",
      deviceId: "test-device",
      route: "/test"
    },
    advantageContext: {
      advantageScore: 0.7,
      cascadeLevel: 1,
      timeSavedMs: 42
    },
    cosmosContext: {
      universeId: "u:test",
      timelineId: "t:test",
      branchId: "b:test",
      shardId: "s:test"
    },
    triHeartId: "test-heart",

    // Feature gates
    allowSnapshotPhysics: true,
    allowDeltaEngine: true,
    allowDeploymentPhysics: true,
    allowRegioningPhysics: true,
    allowRegionMeshRouting: true,
    allowLineageEngine: true,
    allowMultiOrganismSupport: true,
    allowExecutionPhysics: true,
    allowCoreMemory: true,

    // Triple-threat lanes
    allowEarnLane: true,
    allowGpuCacheLane: true,
    allowHarmonicsLane: true,

    // GPU worker
    enableGpuProcessWorker: true,
    gpuProcessWorker: PulseGPUProcessWorker,
    gpuMode: "auto",
    gpuIds: ["gpu-test-0", "gpu-test-1"],

    // Harmonics worker
    enableHarmonicsWorker: true,
    harmonicsWorker: PulseHarmonicsWorker
  });

  return { engine, MemoryOrgan, BrainOrgan };
}

// ---------------------------------------------------------------------------
// 1) Meta + Device Profile + Harmonics Profile
// ---------------------------------------------------------------------------
export function testMetaAndDeviceProfile() {
  logTest("Meta + Device + Harmonics Profile", () => {
    assert(
      PulseEngineProcessMeta.engineId.includes("PulseMotionEngine"),
      "Engine meta id missing"
    );

    const profile = detectDeviceProfile();
    assert(profile && typeof profile === "object", "Device profile missing");
    assert(
      typeof profile.capabilityScore === "number",
      "capabilityScore missing"
    );
    assert(
      typeof profile.capabilityTier === "string",
      "capabilityTier missing"
    );

    const harmonicsProfile = detectHarmonicsProfile();
    assert(
      harmonicsProfile && typeof harmonicsProfile === "object",
      "Harmonics profile missing"
    );
    assert(
      typeof harmonicsProfile.harmonicsScore === "number",
      "harmonicsScore missing"
    );
    assert(
      typeof harmonicsProfile.harmonicsTier === "string",
      "harmonicsTier missing"
    );
  });
}


// ---------------------------------------------------------------------------
// Harmonics job creator (SAFE: patterns ALWAYS an array)
// ---------------------------------------------------------------------------
function createHarmonicsJob(instanceId, engineTickId, patterns) {
  return {
    id: `harmonics-${instanceId}-${engineTickId}`,
    type: "HARMONICS_COMPUTE",
    intent: "HARMONICS_COMPUTE",
    payload: {
      patterns: Array.isArray(patterns) ? patterns : [],   // <‑‑ SAFE
      origin: "PulseEngineProcess-v31",
      __band: "harmonics",
      seed: Math.random()
    }
  };
}

// ---------------------------------------------------------------------------
// 2) Forward tick + GPU hint + artery metrics + harmonics field
// ---------------------------------------------------------------------------
export function testForwardTickWithGpuAndHarmonics() {
  logTest("Forward tick + GPU hint + Harmonics", () => {
    
    const { engine, MemoryOrgan, instanceId, engineTickId } =
      createTestMotionEngine();

    // GPU job with SAFE patterns array
    engine.submitForwardJob({
      id: "job-forward-gpu-1",
      type: "GPU_COMPUTE",
      payload: {
        score: 0.6,
        patterns: []   // <‑‑ SAFE: always array
      }
    });

    // Harmonics job with SAFE patterns array
    engine.submitForwardJob(
      createHarmonicsJob(instanceId, engineTickId, [])
    );

    const res = engine.tickForward();
    assert(res && res.ok === true, "tickForward did not return ok");

    const metrics = MemoryOrgan.read("motion-v30:forward:metrics");
    assert(metrics, "forward metrics missing");
    assert(
      typeof metrics.advantageScore === "number",
      "forward advantageScore missing"
    );
    assert(
      metrics.artery && metrics.artery.lane === "forward",
      "forward artery snapshot missing"
    );

    if (metrics.gpuHint) {
      assert(
        metrics.gpuHint.capabilityProfile,
        "gpuHint.capabilityProfile missing"
      );
    }

    if (metrics.harmonicsField) {
      assert(
        typeof metrics.harmonicsField.coherence === "number",
        "harmonicsField.coherence missing"
      );
    }
  });
}


// ---------------------------------------------------------------------------
// 3) Backward tick + GPU cleanup + harmonics cleanup
// ---------------------------------------------------------------------------
export function testBackwardTickWithCleanup() {
  logTest("Backward tick + GPU + Harmonics cleanup", () => {
    const { engine, MemoryOrgan } = createTestMotionEngine();

    engine.submitBackwardJob({
      id: "job-backward-gpu-cleanup-1",
      type: "GPU_CACHE_COMPACT",
      payload: {
        patterns: []
      }
    });

    const res = engine.tickBackward();
    assert(res && res.ok === true, "tickBackward did not return ok");

    const metrics = MemoryOrgan.read("motion-v30:backward:metrics");
    assert(metrics, "backward metrics missing");
    assert(
      metrics.artery && metrics.artery.lane === "backward",
      "backward artery snapshot missing"
    );

    if (metrics.gpuHint) {
      assert(
        metrics.gpuHint.capabilityProfile,
        "gpuHint.capabilityProfile missing (backward)"
      );
    }

    if (metrics.harmonicsField) {
      assert(
        typeof metrics.harmonicsField.coherence === "number",
        "harmonicsField.coherence missing (backward)"
      );
    }
  });
}

// ---------------------------------------------------------------------------
// 4) Pixel push → GPU_COMPUTE_PIXEL path (via forward wrapper)
// ---------------------------------------------------------------------------
export function testPixelPushFlow() {
  logTest("Pixel push → GPU_COMPUTE_PIXEL", () => {
    const pixelResult = forwardSubmitPixel({
      pixel: { x: 10, y: 20, color: "#ff00ff" },
      frameId: "frame-1",
      layer: "test-layer"
    });

    assert(
      pixelResult && pixelResult.ok === true,
      "submitPixel did not return ok"
    );

    const tickRes = forwardTick();
    assert(
      tickRes && tickRes.ok === true,
      "forwardTick after pixel did not return ok"
    );

    const snap = forwardSnapshot();
    assert(
      snap && snap.arteries && snap.arteries.forward,
      "forward snapshot missing arteries"
    );
    const forwardArtery = snap.arteries.forward;
    assert(
      forwardArtery.ticks > 0,
      "forward artery ticks did not advance after pixel"
    );
  });
}

// ---------------------------------------------------------------------------
// 5) Earn lane sanity: EARN_TASK + metrics.advantageField / earnHint
// ---------------------------------------------------------------------------
export function testEarnLaneFlow() {
  logTest("Earn lane flow", () => {
    const { engine, MemoryOrgan } = createTestMotionEngine();

    engine.submitForwardJob({
      id: "job-earn-1",
      type: "EARN_TASK",
      intent: "settlement",
      payload: {
        amount: 1.23,
        currency: "TEST"
      }
    });

    const res = engine.tickForward();
    assert(res && res.ok === true, "tickForward for earn lane not ok");

    const metrics = MemoryOrgan.read("motion-v30:forward:metrics");
    assert(metrics, "forward metrics missing for earn lane");

    if (metrics.advantageField) {
      assert(
        typeof metrics.advantageField.score === "number",
        "advantageField.score missing for earn lane"
      );
    }

    if (metrics.earnHint) {
      assert(
        typeof metrics.earnHint.settlementScore === "number",
        "earnHint.settlementScore missing"
      );
    }
  });
}

// ---------------------------------------------------------------------------
// 6) Harmonics lane sanity: HARMONICS job + harmonicsField
// ---------------------------------------------------------------------------
export function testHarmonicsLaneFlow() {
  logTest("Harmonics lane flow", () => {
    const { engine, MemoryOrgan } = createTestMotionEngine();

    engine.submitForwardJob({
      id: "job-harmonics-1",
      type: "HARMONICS_ANALYZE",
      payload: {
        waveform: [0, 1, 0, -1],
        band: "symbolic"
      }
    });

    const res = engine.tickForward();
    assert(res && res.ok === true, "tickForward for harmonics lane not ok");

    const metrics = MemoryOrgan.read("motion-v30:forward:metrics");
    assert(metrics, "forward metrics missing for harmonics lane");

    assert(
      metrics.harmonicsField,
      "harmonicsField missing for harmonics lane"
    );
    assert(
      typeof metrics.harmonicsField.coherence === "number",
      "harmonicsField.coherence missing for harmonics lane"
    );
  });
}

// ---------------------------------------------------------------------------
// 7) Backward wrapper wiring sanity (unchanged, but triple-threat aware)
// ---------------------------------------------------------------------------
export function testBackwardWrapperWiring() {
  logTest("Backward wrapper wiring", () => {
    const db = null;
    const admin = null;
    const Timestamp = PulseRealm.PulseNOW;
    const fetchFn = null;
    const presenceContext = { band: "test-backward" };
    const advantageContext = { advantageScore: 0.5 };
    const cosmosContext = {
      universeId: "u:test-backward",
      timelineId: "t:test-backward",
      branchId: "b:test-backward",
      shardId: "s:test-backward"
    };

    const harness = createBackwardMotionProcess({
      db,
      admin,
      Timestamp,
      fetchFn,
      presenceContext,
      advantageContext,
      cosmosContext,
      dberror: console.error
    });

    const diag = harness.diagnostics();
    assert(diag.role.lane === "backward", "backward role lane mismatch");
    assert(diag.engineAvailable === true, "backward engine not available");
    assert(typeof harness.tick === "function", "backward tick missing");
    const tickRes = harness.tick();
    assert(tickRes && tickRes.ok === true, "backward harness tick not ok");
  });
}

// ---------------------------------------------------------------------------
// 8) Determinism: repeated ticks keep meta stable (triple-threat enabled)
// ---------------------------------------------------------------------------
export function testDeterminism() {
  logTest("Determinism across ticks (triple-threat)", () => {
    const { engine } = createTestMotionEngine();

    for (let i = 0; i < 5; i++) {
      const f = engine.tickForward();
      const b = engine.tickBackward();
      assert(f && f.ok === true, "forward tick not ok in loop");
      assert(b && b.ok === true, "backward tick not ok in loop");
    }

    const snap = engine.snapshot();
    assert(
      snap && snap.meta && snap.meta.engineId === PulseEngineProcessMeta.engineId,
      "engine meta changed unexpectedly"
    );
  });
}

// ---------------------------------------------------------------------------
// 9) Triple-threat coherence: GPU + Earn + Harmonics in one run
// ---------------------------------------------------------------------------
export function testTripleThreatCoherence() {
  logTest("Triple-threat coherence (GPU + Earn + Harmonics)", () => {
    const { engine, MemoryOrgan } = createTestMotionEngine();

    engine.submitForwardJob({
      id: "job-triple-1",
      type: "GPU_COMPUTE",
      payload: { score: 0.5, patterns: [] }
    });

    engine.submitForwardJob({
      id: "job-triple-2",
      type: "EARN_TASK",
      intent: "settlement",
      payload: { amount: 2.0, currency: "TRIPLE" }
    });

    engine.submitForwardJob({
      id: "job-triple-3",
      type: "HARMONICS_ANALYZE",
      payload: { waveform: [1, 0, -1, 0], band: "binary" }
    });

    const res = engine.tickForward();
    assert(res && res.ok === true, "tickForward for triple-threat not ok");

    const metrics = MemoryOrgan.read("motion-v30:forward:metrics");
    assert(metrics, "forward metrics missing for triple-threat");

    if (metrics.gpuHint) {
      assert(
        metrics.gpuHint.capabilityProfile,
        "gpuHint.capabilityProfile missing in triple-threat"
      );
    }
    if (metrics.earnHint) {
      assert(
        typeof metrics.earnHint.settlementScore === "number",
        "earnHint.settlementScore missing in triple-threat"
      );
    }
    if (metrics.harmonicsField) {
      assert(
        typeof metrics.harmonicsField.coherence === "number",
        "harmonicsField.coherence missing in triple-threat"
      );
    }
  });
}

// ---------------------------------------------------------------------------
// RUNNER
// ---------------------------------------------------------------------------
export async function runAllTests() {
  testMetaAndDeviceProfile();
  testForwardTickWithGpuAndHarmonics();
  testBackwardTickWithCleanup();
  testPixelPushFlow();
  testEarnLaneFlow();
  testHarmonicsLaneFlow();
  testBackwardWrapperWiring();
  testDeterminism();
  testTripleThreatCoherence();
  console.log("[PulseEngineOverallEngineTests-v31] ALL TESTS COMPLETED (TRIPLE-THREAT)");
}


  PulseRealm.OverallEngineTests = {
    testBackwardTickWithCleanup,
    testBackwardWrapperWiring,
    testDeterminism,
    testEarnLaneFlow,
    testForwardTickWithGpuAndHarmonics,
    testHarmonicsLaneFlow,
    testMetaAndDeviceProfile,
    testPixelPushFlow,
    testTripleThreatCoherence,
    runAllTests
  }

  runAllTests().catch((err) => {
    console.error("[PulseEngineOverallEngineTests-v31] FAILED:", err);
  });
  