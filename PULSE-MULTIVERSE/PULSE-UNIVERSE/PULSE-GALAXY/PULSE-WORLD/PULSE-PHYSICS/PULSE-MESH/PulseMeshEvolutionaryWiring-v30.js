// ============================================================================
// FILE: EvolutionaryWiring-v30-IMMORTAL-ADVANTAGE+++.js
// PulseMesh Wiring Organ • Nervous System Pathway Selector
// Binary-Aware • Presence-Aware • Bluetooth-Aware • Advantage-Aware • Drift-Proof
// Deterministic • Zero Payload Mutation • Zero Network • Zero Randomness
// v30-IMMORTAL-ADVANTAGE+++ • Satellite-Fallback-Aware • Signal-Factoring-Aware
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// Very small deterministic hash for pattern strings (metadata-only)
function simplePatternHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h.toString(16);
}

// Build a wiring key from organ + lineage depth + mode + band + presenceTag + pattern hash
function buildWiringKey(targetOrgan, pulse) {
  const depth = Array.isArray(pulse.lineage) ? pulse.lineage.length : 0;
  const mode = pulse.mode || "symbolic";
  const band = pulse.band || "symbolic";
  const presenceTag = pulse.flags.aura_presence_tag || "none";
  const pattern = (pulse.pattern || "").toLowerCase();
  const patternHash = simplePatternHash(pattern);

  return `${targetOrgan}::d${depth}::${mode}::${band}::${presenceTag}::p${patternHash}`;
}

function clamp01(v) {
  if (typeof v !== "number" || Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(1, v));
}

// Infer default wiring surface from organ + pattern + mode + presence band + advantage hints + bluetooth hints
function inferDefaultWiring(targetOrgan, pulse) {
  const p = (pulse.pattern || "").toLowerCase();
  const mode = pulse.mode || "symbolic";
  const band = pulse.band || "symbolic";

  const binaryBias = clamp01(pulse.flags.aura_binary_mesh_bias ?? 0);
  const factoringBias = clamp01(pulse.flags.aura_factoring_bias ?? 0);

  // v30++: bluetooth presence bias (metadata-only)
  const btBias = clamp01(
    pulse.flags.bluetooth_proximity_bias ??
    pulse.flags.bluetooth_link_quality_bias ??
    0
  );

  const prefersBinary =
    band === "binary" ||
    mode === "binary" ||
    binaryBias > 0.3 ||
    btBias > 0.4;

  const prefersDual = band === "dual" || mode === "dual";
  const prefersFactored = factoringBias > 0.4;

  // Presence-band + advantage + bluetooth bias first
  if (prefersBinary) {
    if (targetOrgan === "GPU")  return prefersFactored ? "gpuBinaryFactoredBurst"   : "gpuBinaryBurst";
    if (targetOrgan === "Earn") return prefersFactored ? "earnBinaryFactoredChain"  : "earnBinaryChain";
    if (targetOrgan === "OS")   return "osBinaryBridge";
    if (targetOrgan === "Mesh") return prefersFactored ? "meshBinaryFactoredSignal" : "meshBinarySignal";
    return prefersFactored ? "binaryFactoredPreferred" : "binaryPreferred";
  }

  if (prefersDual) {
    if (targetOrgan === "GPU")  return prefersFactored ? "gpuDualFactoredBurst"   : "gpuDualBurst";
    if (targetOrgan === "Earn") return prefersFactored ? "earnDualFactoredChain"  : "earnDualChain";
    if (targetOrgan === "OS")   return "osDualBridge";
    if (targetOrgan === "Mesh") return prefersFactored ? "meshDualFactoredSignal" : "meshDualSignal";
    return prefersFactored ? "dualFactoredPreferred" : "dualPreferred";
  }

  // Symbolic defaults with pattern hints
  if (targetOrgan === "GPU")  return prefersFactored ? "gpuFactoredBurst"        : "gpuBurst";
  if (targetOrgan === "Earn") return prefersFactored ? "earnFactoredCreditChain" : "earnCreditChain";
  if (targetOrgan === "OS")   return "osBridge";
  if (targetOrgan === "Mesh") return prefersFactored ? "meshFactoredSignal"      : "meshSignal";

  if (p.includes("gpu"))  return prefersFactored ? "gpuFactoredBurst"        : "gpuBurst";
  if (p.includes("earn")) return prefersFactored ? "earnFactoredCreditChain" : "earnCreditChain";
  if (p.includes("os"))   return "osBridge";
  if (p.includes("mesh")) return prefersFactored ? "meshFactoredSignal"      : "meshSignal";

  return prefersFactored ? "neutralFactored" : "neutral";
}

export function createPulseMeshWiring({ log } = {}) {
  const memory = Object.create(null); // wiringKey → entry

  const meta = {
    layer: "PulseMeshWiring",
    role: "WIRING_ORGAN",
    version: "30-IMMORTAL-ADVANTAGE+++",
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      driftProof: true,
      patternAware: true,
      lineageAware: true,
      reflexReady: true,
      wiringReady: true,
      selfRepairReady: true,

      dualModeReady: true,
      binaryAware: true,
      symbolicAware: true,
      presenceAware: true,
      bandAware: true,

      advantageAware: true,
      unifiedAdvantageField: true,
      deterministicField: true,
      futureEvolutionReady: true,

      // v30 IMMORTAL-ADVANTAGE+++ extensions
      signalFactoringAware: true,
      hormonesAware: true,
      immuneCommanderAware: true,
      meshPressureAware: true,
      auraPressureAware: true,
      flowAware: true,

      zeroCompute: true,
      zeroMutation: true,
      zeroRoutingInfluence: true,
      zeroNetwork: true,
      zeroRandomness: true,

      // Bluetooth + satellite presence
      bluetoothPresenceAware: true,
      bluetoothMeshAware: true,
      satelliteFallbackAware: true,

      v24Compat: true
    }
  };

  function createEntry(surface, pulse) {
    return {
      surface,
      successCount: 0,
      failureCount: 0,
      band: pulse.band || "symbolic",
      presenceTag: pulse.flags.aura_presence_tag || "none",
      advantage: {
        binaryPreferenceSamples: 0,
        binaryPreferenceTotal: 0,
        factoringBiasSamples: 0,
        factoringBiasTotal: 0
      },
      bluetooth: {
        biasSamples: 0,
        biasTotal: 0
      }
    };
  }

  function wiringFor(targetOrgan, pulse) {
    const key = buildWiringKey(targetOrgan, pulse);
    let entry = memory[key];

    if (!entry) {
      const surface = inferDefaultWiring(targetOrgan, pulse);
      entry = memory[key] = createEntry(surface, pulse);
    }

    log && log("[PulseMesh-Wiring-v30] Selecting wiring surface", {
      jobId: pulse.jobId,
      pattern: pulse.pattern,
      targetOrgan,
      lineageDepth: Array.isArray(pulse.lineage) ? pulse.lineage.length : 0,
      mode: pulse.mode || "symbolic",
      band: pulse.band || "symbolic",
      presenceTag: pulse.flags.aura_presence_tag || "none",
      wiringKey: key,
      surface: entry.surface,
      successCount: entry.successCount,
      failureCount: entry.failureCount,
      advantage: entry.advantage,
      bluetooth: entry.bluetooth
    });

    return entry.surface;
  }

  function remember(targetOrgan, pulse, outcome = "success") {
    const key = buildWiringKey(targetOrgan, pulse);
    let entry = memory[key];

    if (!entry) {
      const surface = inferDefaultWiring(targetOrgan, pulse);
      entry = memory[key] = createEntry(surface, pulse);
    }

    if (outcome === "success") {
      entry.successCount += 1;
    } else if (outcome === "failure") {
      entry.failureCount += 1;
    }

    // Advantage tracking
    const binaryBias = clamp01(pulse.flags.aura_binary_mesh_bias ?? 0);
    const factoringBias = clamp01(pulse.flags.aura_factoring_bias ?? 0);

    if (binaryBias > 0) {
      entry.advantage.binaryPreferenceSamples += 1;
      entry.advantage.binaryPreferenceTotal += binaryBias;
    }

    if (factoringBias > 0) {
      entry.advantage.factoringBiasSamples += 1;
      entry.advantage.factoringBiasTotal += factoringBias;
    }

    // v30++: Bluetooth bias tracking (metadata-only)
    const btBias = clamp01(
      pulse.flags.bluetooth_proximity_bias ??
      pulse.flags.bluetooth_link_quality_bias ??
      0
    );

    if (btBias > 0) {
      entry.bluetooth.biasSamples += 1;
      entry.bluetooth.biasTotal += btBias;
    }

    // Self-repair: if failures dominate, switch to safeFallback
    if (entry.failureCount > entry.successCount) {
      entry.surface = "safeFallback";
    }

    log && log("[PulseMesh-Wiring-v30] Remembering wiring", {
      jobId: pulse.jobId,
      pattern: pulse.pattern,
      targetOrgan,
      mode: pulse.mode || "symbolic",
      band: pulse.band || "symbolic",
      presenceTag: pulse.flags.aura_presence_tag || "none",
      wiringKey: key,
      surface: entry.surface,
      successCount: entry.successCount,
      failureCount: entry.failureCount,
      advantage: entry.advantage,
      bluetooth: entry.bluetooth
    });

    return entry;
  }

  // Snapshot for cognition / awareness / backend AI
  function snapshot() {
    const entries = [];
    for (const key in memory) {
      if (!Object.prototype.hasOwnProperty.call(memory, key)) continue;
      const e = memory[key];

      const btSamples = e.bluetooth.biasSamples || 0;
      const btAvg = btSamples > 0 ? e.bluetooth.biasTotal / btSamples : 0;

      entries.push({
        key,
        surface: e.surface,
        successCount: e.successCount,
        failureCount: e.failureCount,
        band: e.band,
        presenceTag: e.presenceTag,
        advantage: {
          binaryPreferenceSamples: e.advantage.binaryPreferenceSamples,
          binaryPreferenceAvg:
            e.advantage.binaryPreferenceSamples > 0
              ? e.advantage.binaryPreferenceTotal / e.advantage.binaryPreferenceSamples
              : 0,
          factoringBiasSamples: e.advantage.factoringBiasSamples,
          factoringBiasAvg:
            e.advantage.factoringBiasSamples > 0
              ? e.advantage.factoringBiasTotal / e.advantage.factoringBiasSamples
              : 0
        },
        bluetooth: {
          biasSamples: btSamples,
          biasAvg: btAvg
        }
      });
    }

    return {
      meta,
      entriesCount: entries.length,
      entries
    };
  }

  return {
    meta,
    wiringFor,
    remember,
    snapshot
  };
}

PulseRealm.MeshEvolutionaryWiring = {
  createPulseMeshWiring
}
PulseRealm.PulseMeshEvolutionaryWiring = createPulseMeshWiring;