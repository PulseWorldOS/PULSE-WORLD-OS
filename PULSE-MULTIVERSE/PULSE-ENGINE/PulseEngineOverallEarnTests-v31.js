// ============================================================================
// PulseEngineOverallEarnTests-v31.js
// v31 IMMORTAL GPU+EARN+HARMONICS TEST HUB — Centralized Test Runner
// ============================================================================
//
// SINGLE ENTRY POINT for all v31 Earn‑Market system test modules.
//
// Design:
//   - Pure compute (no Touch, no pulses, no IO requirements).
//   - Can run in Node, Browser, or inside PulseEngine itPulseRealm.
//   - Tests are pluggable modules: { name, run(engine, context?) }.
//   - Engine + healing state (if available) are passed into tests via context.
//   - v31‑aware world identity + GPU/Earn/Pixel/Harmonics context.
//   - Triple‑threat aware: GPU + Earn + Pixel + Harmonics surfaces.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import {
  PulseEarnMktAuctioneerTest_v31 as AuctioneerTest,
  PulseEarnMktAuctioneer,
  PulseEarnMktAuctioneerHealingState
} from "../PULSE-EARN/MARKETS/PulseEarnMktAuctioneerTest-v31.js";

import {
  PulseEarnMktAmbassadorTest,
  PulseEarnMktAmbassador,
  PulseEarnMktAmbassadorHealingState
} from "../PULSE-EARN/MARKETS/PulseEarnMktAmbassadorTest-v31.js";

import {
  PulseEarnMktAnkrTest,
  PulseEarnMktAnkr,
  PulseEarnMktAnkrHealingState
} from "../PULSE-EARN/MARKETS/PulseEarnMktAnkrTest-v31.js";

import {
  PulseEarnMktExecTest,
  PulseEarnMktExec,
  PulseEarnMktExecHealingState
} from "../PULSE-EARN/MARKETS/PulseEarnMktExecTest-v31.js";

import {
  PulseEarnMktFluenceTest,
  PulseEarnMktFluence,
  PulseEarnMktFluenceHealingState
} from "../PULSE-EARN/MARKETS/PulseEarnMktFluenceTest-v31.js";

import {
  PulseEarnMktForagerTest,
  PulseEarnMktForager,
  PulseEarnMktForagerHealingState
} from "../PULSE-EARN/MARKETS/PulseEarnMktForagerTest-v31.js";

import {
  PulseEarnMktGolemTest,
  PulseEarnMktGolem,
  PulseEarnMktGolemHealingState
} from "../PULSE-EARN/MARKETS/PulseEarnMktGolemTest-v31.js";





const TestRegistry = [];

// ============================================================================
// 2. REGISTRATION — Triple‑Threat‑Aware Test Modules
// ============================================================================

export function registerTestModule(testModule, options = {}) {
  if (!testModule || typeof testModule.run !== "function") {
    console.warn("[PulseEngineOverallEarnTests-v31] Invalid test module:", testModule);
    return;
  }

  const wrapped = {
    module: testModule,
    name: testModule.name || options.name || "Unnamed Test",
    engine: options.engine || null,
    getHealingState: options.getHealingState || null,
    engineId: options.engineId || "UnknownEngine_v31",
    // optional harmonics/telemetry hints for this engine
    harmonicsRole: options.harmonicsRole || null,
    band: options.band || "symbolic"
  };

  TestRegistry.push(wrapped);
}

registerTestModule(AuctioneerTest, {
  engine: PulseEarnMktAuctioneer,
  getHealingState: PulseEarnMktAuctioneerHealingState,
  engineId: "PulseEarnMktAuctioneer_v31",
  harmonicsRole: "auctioneer",
  band: "dual"
});

registerTestModule(PulseEarnMktAmbassadorTest, {
  engine: PulseEarnMktAmbassador,
  getHealingState: PulseEarnMktAmbassadorHealingState,
  engineId: "PulseEarnMktAmbassador_v31",
  harmonicsRole: "ambassador",
  band: "dual"
});

registerTestModule(PulseEarnMktAnkrTest, {
  engine: PulseEarnMktAnkr,
  getHealingState: PulseEarnMktAnkrHealingState,
  engineId: "PulseEarnMktAnkr_v31",
  harmonicsRole: "ankr",
  band: "dual"
});

registerTestModule(PulseEarnMktExecTest, {
  engine: PulseEarnMktExec,
  getHealingState: PulseEarnMktExecHealingState,
  engineId: "PulseEarnMktExec_v31",
  harmonicsRole: "exec",
  band: "dual"
});

registerTestModule(PulseEarnMktFluenceTest, {
  engine: PulseEarnMktFluence,
  getHealingState: PulseEarnMktFluenceHealingState,
  engineId: "PulseEarnMktFluence_v31",
  harmonicsRole: "fluence",
  band: "dual"
});

registerTestModule(PulseEarnMktForagerTest, {
  engine: PulseEarnMktForager,
  getHealingState: PulseEarnMktForagerHealingState,
  engineId: "PulseEarnMktForager_v31",
  harmonicsRole: "forager",
  band: "dual"
});

registerTestModule(PulseEarnMktGolemTest, {
  engine: PulseEarnMktGolem,
  getHealingState: PulseEarnMktGolemHealingState,
  engineId: "PulseEarnMktGolem_v31",
  harmonicsRole: "golem",
  band: "dual"
});

// ============================================================================
// 3. CONTEXT BUILDER — GPU/Earn/Pixel/Harmonics Aware
// ============================================================================

function readGlobalDeviceProfile() {
  if (typeof window === "undefined") return null;
  return PulseRealm.PULSE_DEVICE_PROFILE || null;
}

function readGlobalHarmonicsProfile() {
  if (typeof window === "undefined") return null;
  return PulseRealm.PULSE_HARMONICS_PROFILE_V31 || PulseRealm.PULSE_HARMONICS_PROFILE || null;
}

function readGlobalCosmos() {
  if (typeof window === "undefined") {
    return {
      universeId: "u:earn-tests",
      timelineId: "t:earn-tests",
      branchId: "b:root",
      shardId: "s:primary"
    };
  }
  return (
    PulseRealm.PULSE_COSMOS || {
      universeId: "u:earn-tests",
      timelineId: "t:earn-tests",
      branchId: "b:root",
      shardId: "s:primary"
    }
  );
}

function readGlobalPresence() {
  if (typeof window === "undefined") {
    return {
      band: "earn-tests",
      deviceId: "earn-tests-device",
      route: "/earn-tests"
    };
  }
  return (
    PulseRealm.PULSE_PRESENCE || {
      band: "earn-tests",
      deviceId: "earn-tests-device",
      route: `/${PulseRealm.__PULSE_CURRENT_PAGE__}` || "/earn-tests"
    }
  );
}


function readGlobalAdvantage() {
  if (typeof window === "undefined") {
    return {
      advantageScore: 1.0,
      cascadeLevel: 0,
      timeSavedMs: 0
    };
  }
  return (
    PulseRealm.PULSE_ADVANTAGE || {
      advantageScore: 1.0,
      cascadeLevel: 0,
      timeSavedMs: 0
    }
  );
}

function buildTestContext(entry, index) {
  const healingSnapshot = entry.getHealingState ? entry.getHealingState() : null;

  const deviceProfile = readGlobalDeviceProfile();
  const harmonicsProfile = readGlobalHarmonicsProfile();
  const cosmosContext = readGlobalCosmos();
  const presenceContext = readGlobalPresence();
  const advantageContext = readGlobalAdvantage();

  return {
    // v31 world identity
    worldVersion: "v31-IMMORTAL-GPU-EARN-PIXEL-HARMONICS",

    // engine identity for this test
    engineId: entry.engineId,
    engine: entry.engine,

    // registry metadata
    testIndex: index,
    testName: entry.name,
    harmonicsRole: entry.harmonicsRole || null,
    band: entry.band || "symbolic",

    // live healing snapshot at test start (if available)
    healingSnapshot,

    // convenience: direct access to healing accessor (may be null)
    getHealingState: entry.getHealingState,

    // v31 GPU/pixel context
    gpuContext: {
      capabilityProfile: deviceProfile,
      deviceProfile
    },

    // v31 harmonics context
    harmonicsContext: {
      profile: harmonicsProfile,
      role: entry.harmonicsRole || null
    },

    // v31 cosmos/presence/advantage context
    cosmosContext,
    presenceContext,
    advantageContext
  };
}

// ============================================================================
// 4. RUN ALL TESTS — IMMORTAL GPU+EARN+HARMONICS SUITE
// ============================================================================

export async function runAllEarnTests() {
  console.log("=======================================================");
  console.log(" PULSE‑ENGINE v31 — OVERALL EARN TEST SUITE");
  console.log(" IMMORTAL GPU+EARN+PIXEL+HARMONICS");
  console.log("=======================================================\n");

  console.log(`Loaded ${TestRegistry.length} Earn‑Market test modules\n`);

  const results = [];

  for (let i = 0; i < TestRegistry.length; i++) {
    const entry = TestRegistry[i];
    const { module: test, engine, getHealingState, engineId } = entry;
    const label = entry.name || test.name || "Unnamed Test";

    console.log(`🔹 Running Earn Test [${i}]: ${label}`);
    console.log(`   Engine: ${engineId}`);
    if (entry.harmonicsRole) {
      console.log(`   Harmonics Role: ${entry.harmonicsRole}`);
    }
    console.log("");

    const context = buildTestContext(entry, i);
    const startedAt = PulseRealm.PulseNOW;

    try {
      const maybePromise = test.run(engine, context);
      const output =
        maybePromise && typeof maybePromise.then === "function"
          ? await maybePromise
          : maybePromise;

      const durationMs = PulseRealm.PulseNOW - startedAt;
      const finalHealing = getHealingState ? getHealingState() : null;

      results.push({
        name: label,
        engineId,
        ok: true,
        durationMs,
        output,
        finalHealing,
        harmonicsRole: entry.harmonicsRole || null
      });

      console.log(`   ✔ PASS — ${label} (${durationMs} ms)\n`);
    } catch (err) {
      const durationMs = PulseRealm.PulseNOW - startedAt;
      const finalHealing = getHealingState ? getHealingState() : null;

      results.push({
        name: label,
        engineId,
        ok: false,
        durationMs,
        error: err,
        finalHealing,
        harmonicsRole: entry.harmonicsRole || null
      });

      console.error(`   ✖ FAIL — ${label} (${durationMs} ms)`);
      console.error(err, "\n");
    }
  }

  console.log("=======================================================");
  console.log(" EARN TEST SUITE COMPLETE (GPU+EARN+PIXEL+HARMONICS)");
  console.log("=======================================================\n");

  return {
    ok: results.every((r) => r.ok),
    results
  };
}

// ============================================================================
// 5. RUN SINGLE TEST BY NAME
// ============================================================================

export async function runEarnTestByName(name) {
  const entry = TestRegistry.find((t) => t.name === name);
  if (!entry) {
    console.warn(`[PulseEngineOverallEarnTests-v31] No test found with name: ${name}`);
    return null;
  }

  const { module: test, engine, getHealingState, engineId } = entry;
  const label = entry.name || test.name || name;

  console.log("=======================================================");
  console.log(` PULSE‑ENGINE v31 — SINGLE EARN TEST RUN: ${label}`);
  console.log(" IMMORTAL GPU+EARN+PIXEL+HARMONICS");
  console.log("=======================================================\n");
  console.log(`   Engine: ${engineId}`);
  if (entry.harmonicsRole) {
    console.log(`   Harmonics Role: ${entry.harmonicsRole}`);
  }
  console.log("");

  const context = buildTestContext(entry, 0);
  const startedAt = PulseRealm.PulseNOW;

  try {
    const maybePromise = test.run(engine, context);
    const output =
      maybePromise && typeof maybePromise.then === "function"
        ? await maybePromise
        : maybePromise;

    const durationMs = PulseRealm.PulseNOW - startedAt;
    const finalHealing = getHealingState ? getHealingState() : null;

    console.log(`   ✔ PASS — ${label} (${durationMs} ms)\n`);

    return {
      name: label,
      engineId,
      ok: true,
      durationMs,
      output,
      finalHealing,
      harmonicsRole: entry.harmonicsRole || null
    };
  } catch (err) {
    const durationMs = PulseRealm.PulseNOW - startedAt;
    const finalHealing = getHealingState ? getHealingState() : null;

    console.error(`   ✖ FAIL — ${label} (${durationMs} ms)`);
    console.error(err, "\n");

    return {
      name: label,
      engineId,
      ok: false,
      durationMs,
      error: err,
      finalHealing,
      harmonicsRole: entry.harmonicsRole || null
    };
  }
}

// ============================================================================
// 6. BROWSER SURFACE — Debug + One‑Call Entrypoints
// ============================================================================

  console.log(
    "[PulseEngineOverallEarnTests-v31] Ready — call PulseEarnRunAllTests_v31() or PulseEarnRunTestByName_v31(name)"
  );


  PulseRealm.PulseEarnOverallTests = {
    runAllEarnTests,
    runEarnTestByName,
    registerTestModule,
    PulseEarnMktAuctioneer,
    PulseEarnMktAmbassador,
    PulseEarnMktAnkr,
    PulseEarnMktExec,
    PulseEarnMktFluence,
    PulseEarnMktForager,
    PulseEarnMktGolem
  }
