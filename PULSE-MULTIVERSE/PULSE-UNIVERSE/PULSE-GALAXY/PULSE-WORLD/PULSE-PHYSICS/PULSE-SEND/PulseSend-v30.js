// ============================================================================
//  FILE: PulseSend-v30-IMMORTAL-ORGANISM.js — PulseSend Organism v30++
//  Evolutionary Transport Organ • Unified Multi-Band • Mesh + Instincts v30
//  Pattern + Lineage + Shape • SDN + Mesh-Aware + Evolutionary Thought/Design
//  30.0: Unified band fabric (binary-first + multi-band profile)
//        EvolutionaryInstincts v30 + EvolutionaryThought v30 + Design v30
//        Mesh v30 TriHash + Mesh Factoring v30 + Presence Relay v30
//        Deterministic IMMORTAL meta surfaces across the chain.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
//  SAFETY CONTRACT (v30-IMMORTAL-ORGANISM):
//  ----------------------------------------
//  • No randomness.
//  • No timestamps.
//  • No external IO.
//  • Pure deterministic transport chain.
//  • Zero mutation outside instance.
//  • Metadata-only intelligence + factoring + evolutionary surfaces.
// ============================================================================


//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

import { PulseVitalsLogger, PulseVitalsMonitor, PulseUIFlow, PulseUIErrors, log, warn, error,  PulseProofReflex, PulseUIRouteMemory, PulsePageScanner} from "../../../../../_PROOF/PULSE-PROOF.js";
// ============================================================================
//  EVOLUTION ENGINES — v30 Unified Band Stack
// ============================================================================
import { createPulseV3 as PulseV3SymShifter} from "../PULSE-SHIFTER/PulseShifterEvolutionaryPulse-v31.js";
import { createPulseV3_v31 as PulseV3UnifiedOrganism }  from "./PULSES/PulseSendV3UnifiedOrganism-v31.js";
import { createPulseV2 as PulseV2EvolutionEngine }  from "./PULSES/PulseSendV2EvolutionEngine-v31.js";
import { createPulseSendImpulse as PulseSendImpulse } from "./PulseSendImpulse-v30.js";
import { createLegacyPulse as PulseSendLegacyPulse } from "./PULSES/PulseSendLegacyPulse-v31.js";
import { PulseRouterMesh } from "../PULSE-ROUTER/PulseRouterMesh-v30.js";
import { adaptPulseSendPacket as PulseSendAdapter } from "./PulseSendAdapter-v30.js";
import { createPulseSendEngineV30 as PulseSendEngine } from "./PulseSendEngine-v30.js";
import { createPulseSendReturn as PulseSendReturn } from "./PulseSendReturn-v30.js";
import { createPulseSendSystem as PulseSendSystem } from "./PULSES/PulseSendSystem-v31.js";
import { applyMeshSignalFactoring} from "../PULSE-MESH/PulseMeshSignalFactoring-v30.js";
import {  PulseRouterEvolutionaryInstincts} from "../PULSE-ROUTER/PulseRouterEvolutionaryInstincts-v30.js";
import { PulseRouterEvolutionaryDesign} from "../PULSE-ROUTER/PulseRouterEvolutionaryDesign-v30.js";
import { createPulseRouterThoughtV30 as PulseRouterEvolutionaryThought} from "../PULSE-ROUTER/PulseRouterEvolutionaryThought-v30.js";
import { PulseRouterCommandments} from "../PULSE-ROUTER/PulseRouterCommandments-v30.js";
import { createPulseMeshPresenceRelay as PulseMeshPresenceRelay} from "../PULSE-MESH/PRESENCE/PulseMeshPresenceRelay-v30.js";
import { PulseCoreGMemory } from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";




// Simple Earn adapter helpers (deterministic, structural)
export function readCoreMemorySend(memoryKey) {
  try {
    const adapter = PulseCoreGMemory.send();
    if (!adapter || typeof adapter.read !== "function") return null;
    return adapter.read(memoryKey) || null;
  } catch {
    return null;
  }
}

export function writeCoreMemorySend(memoryKey, value) {
  try {
    const adapter = PulseCoreGMemory.send();
    if (!adapter || typeof adapter.write !== "function") return;
    adapter.write(memoryKey, value);
  } catch {
    // IMMORTAL: swallow, never throw
  }
}

// ============================================================================
//  INTERNAL HELPERS — deterministic, pure
// ============================================================================
function computeHash(str) {
  const s = String(str || "");
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function stableStringify(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) {
    return "[" + value.map(stableStringify).join(",") + "]";
  }
  const keys = Object.keys(value).sort();
  return (
    "{" +
    keys.map((k) => JSON.stringify(k) + ":" + stableStringify(value[k])).join(",") +
    "}"
  );
}

function clamp01(v) {
  if (typeof v !== "number" || Number.isNaN(v)) return 0;
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}


// ============================================================================
//  DUAL HASH — v30 IMMORTAL (symbolic/binary, backed by computeHash)
// ============================================================================
function computeDualHash(label, payload) {
  const raw = label + "::" + stableStringify(payload || {});
  const primary = computeHash(raw);
  const secondary = computeHash(primary + "::" + label);
  return { primary, secondary };
}


// ============================================================================
//  COSMOS HELPERS — v30 IMMORTAL
// ============================================================================
function normalizeCosmos(cosmos = {}) {
  return {
    universeId: cosmos.universeId || "u:default",
    timelineId: cosmos.timelineId || "t:main",
    branchId: cosmos.branchId || "b:root",
    worldId: cosmos.worldId || "w:primary",
    shardId: cosmos.shardId || "s:0"
  };
}

function cosmosSignature(cosmos) {
  const raw = `${cosmos.universeId}|${cosmos.timelineId}|${cosmos.branchId}|${cosmos.worldId}|${cosmos.shardId}`;
  let h = 0;
  for (let i = 0; i < raw.length; i++) {
    h = (h * 31 + raw.charCodeAt(i)) >>> 0;
  }
  return `cx30-${h.toString(16)}`;
}


// ============================================================================
//  FALLBACK / MOVEMENT / ROUTE / PATHWAY / RETURN SURFACES (v30)
// ============================================================================
function buildFallbackSurface(type, error) {
  const shape = {
    fallbackType: type,
    errorMessage: error ? String(error) : null
  };
  const dual = computeDualHash("FALLBACK_SURFACE_V30", shape);
  return {
    ...shape,
    fallbackDualHashPrimary: dual.primary,
    fallbackDualHashSecondary: dual.secondary
  };
}

function buildSendDiagnostics({ jobId, pattern, mode, pulseType, bandMode, bandProfile }) {
  const shape = {
    jobId,
    patternLength: (pattern || "").length,
    mode,
    pulseType,
    bandMode: bandMode || "binary",
    bandProfile: bandProfile || "unified"
  };
  const patternHash = computeHash(pattern || "");
  const modeHash = computeHash(mode || "normal");
  const bandHash = computeHash(bandMode || "binary");
  const dual = computeDualHash("SEND_DIAGNOSTICS_V30", shape);
  return {
    ...shape,
    patternHash,
    modeHash,
    bandHash,
    diagnosticsDualHashPrimary: dual.primary,
    diagnosticsDualHashSecondary: dual.secondary
  };
}

function buildMovementSurface(movement) {
  if (!movement || !movement.packet) {
    const shape = {
      hasPacket: false,
      movementSignature: "NO_PACKET"
    };
    const dual = computeDualHash("MOVEMENT_SURFACE_V30", shape);
    return {
      ...shape,
      movementDualHashPrimary: dual.primary,
      movementDualHashSecondary: dual.secondary
    };
  }

  const raw = JSON.stringify(movement.packet);
  const shape = {
    hasPacket: true,
    movementSignature: computeHash(raw)
  };
  const dual = computeDualHash("MOVEMENT_SURFACE_V30", shape);
  return {
    ...shape,
    movementDualHashPrimary: dual.primary,
    movementDualHashSecondary: dual.secondary
  };
}

function buildRouteSurface(targetOrgan, evolutionaryThoughtRoute, instinctsRecord, designRecord) {
  const raw = JSON.stringify({
    targetOrgan,
    evolutionaryThoughtRoute,
    instinctsRecordKey: instinctsRecord ? instinctsRecord.key : null,
    designRouteId: designRecord ? designRecord.routeId : null
  });
  const shape = {
    targetOrgan,
    evolutionaryThoughtRoute,
    instinctsKey: instinctsRecord ? instinctsRecord.key : null,
    designRouteId: designRecord ? designRecord.routeId : null,
    routeSignature: computeHash(raw)
  };
  const dual = computeDualHash("ROUTE_SURFACE_V30", shape);
  return {
    ...shape,
    routeDualHashPrimary: dual.primary,
    routeDualHashSecondary: dual.secondary
  };
}

function buildPathwaySurface(pathway) {
  const raw = JSON.stringify(pathway || {});
  const shape = {
    pathway,
    pathwaySignature: computeHash(raw)
  };
  const dual = computeDualHash("PATHWAY_SURFACE_V30", shape);
  return {
    ...shape,
    pathwayDualHashPrimary: dual.primary,
    pathwayDualHashSecondary: dual.secondary
  };
}

function buildReturnSurface(result) {
  const ok = result && result.ok !== false;
  const raw = JSON.stringify(result || {});
  const shape = {
    ok,
    returnSignature: computeHash(raw)
  };
  const dual = computeDualHash("RETURN_SURFACE_V30", shape);
  return {
    ...shape,
    returnDualHashPrimary: dual.primary,
    returnDualHashSecondary: dual.secondary
  };
}


// ============================================================================
//  30.0 Pulse Intelligence (Unified Band + Instincts + Mesh Factoring)
// ============================================================================
function computePulseIntelligenceV30({
  advantageField = {},
  presenceField = {},
  factoringSignal,
  bandMode,
  bandProfile,
  meshFactoringProfile = null,
  instinctsAdvantageField = null
}) {
  const advantageScore = Number(advantageField.advantageScore || 0);
  const advantageTier  = Number(advantageField.advantageTier  || 0);

  const presenceTier = presenceField.presenceTier || "idle";
  const presenceWeight =
    presenceTier === "critical" ? 1.0 :
    presenceTier === "high"     ? 0.85 :
    presenceTier === "elevated" ? 0.7 :
    presenceTier === "soft"     ? 0.5 :
    presenceTier === "low"      ? 0.35 :
    0.2;

  const factoring = factoringSignal ? 1 : 0;
  const bandIsBinary = bandMode === "binary" ? 1 : 0;
  const bandIsUnified = bandProfile === "unified" ? 1 : 0;

  const meshPressure = meshFactoringProfile
    ? Number(meshFactoringProfile.pressure || 0)
    : 0;

  const instinctsBoost =
    instinctsAdvantageField != null
      ? clamp01(instinctsAdvantageField)
      : 0.5;

  const solvednessScore = Math.max(
    0,
    Math.min(
      advantageScore * 4.5 +
      presenceWeight * 0.3 +
      factoring * 0.2 +
      meshPressure * 0.2 +
      instinctsBoost * 0.3,
      1
    )
  );

  const computeTier =
    solvednessScore >= 0.9 ? "nearSolution" :
    solvednessScore >= 0.7 ? "highValue"    :
    solvednessScore >= 0.4 ? "normal"       :
    solvednessScore >= 0.2 ? "lowPriority"  :
    "avoidCompute";

  const readinessScore = Math.max(
    0,
    Math.min(
      solvednessScore * 0.5 +
      (bandIsBinary ? 0.2 : 0.1) +
      (bandIsUnified ? 0.15 : 0.05) +
      (advantageTier >= 2 ? 0.2 : advantageTier === 1 ? 0.1 : 0),
      1
    )
  );

  return {
    solvednessScore,
    factoringSignal: factoring ? "high" : "low",
    computeTier,
    readinessScore,
    bandMode,
    bandProfile,
    advantageTier,
    meshPressure,
    instinctsBoost
  };
}


// ============================================================================
//  30.0 Surfaces — cacheChunk / prewarm / presence (dual-hash + burst)
// ============================================================================
function deriveBurstMode({ priority, mode }) {
  const p = priority || "normal";
  const m = mode || "normal";

  if (p === "critical" || p === "high") {
    if (m === "realtime" || m === "reflex") return "bluetoothBurst";
    return "powerBurst";
  }
  if (p === "normal" && (m === "realtime" || m === "reflex")) {
    return "lightBurst";
  }
  return "none";
}

function buildCacheChunkSurface({
  jobId,
  pattern,
  targetOrgan,
  pathway,
  mode,
  pulseType,
  bandMode,
  bandProfile
}) {
  const shape = {
    jobId: jobId || "NO_JOB",
    pattern: pattern || "",
    targetOrgan: targetOrgan || null,
    pathway: pathway || null,
    mode: mode || "normal",
    pulseType: pulseType || "UNKNOWN",
    bandMode: bandMode || "binary",
    bandProfile: bandProfile || "unified"
  };

  const serialized = stableStringify(shape);
  const cacheChunkKey = "psend30-cache::" + computeHash(serialized);

  const dual = computeDualHash("CACHE_CHUNK_SURFACE_V30", {
    cacheChunkKey,
    shape
  });

  return {
    cacheChunkKey,
    cacheChunkSignature: computeHash(cacheChunkKey),
    cacheChunkDualHashPrimary: dual.primary,
    cacheChunkDualHashSecondary: dual.secondary,
    cacheChunkShape: shape
  };
}

function buildPrewarmSurface({ priority, mode, pathway }) {
  const safePriority = priority || "normal";
  const safeMode = mode || "normal";
  const hasPathway = !!pathway;

  let level = "none";
  if (safePriority === "high" || safePriority === "critical") {
    level = "aggressive";
  } else if (safePriority === "normal" && hasPathway) {
    level = "medium";
  } else if (safePriority === "low" && hasPathway) {
    level = "light";
  }

  const burstMode = deriveBurstMode({ priority: safePriority, mode: safeMode });

  const shape = {
    priority: safePriority,
    mode: safeMode,
    hasPathway,
    level,
    burstMode
  };

  const raw = stableStringify(shape);
  const prewarmKey = "psend30-prewarm::" + computeHash(raw);

  const dual = computeDualHash("PREWARM_SURFACE_V30", {
    prewarmKey,
    shape
  });

  return {
    level,
    burstMode,
    prewarmKey,
    prewarmShape: shape,
    prewarmDualHashPrimary: dual.primary,
    prewarmDualHashSecondary: dual.secondary
  };
}

function buildPresenceSurface({ pattern, pathway, bandMode, bandProfile }) {
  const safePattern = pattern || "";
  const hasPathway = !!pathway;

  let scope = "local";
  if (hasPathway && safePattern.includes("/global")) {
    scope = "global";
  } else if (hasPathway && safePattern.includes("/page")) {
    scope = "page";
  }

  const shape = {
    pattern: safePattern,
    hasPathway,
    scope,
    bandMode: bandMode || "binary",
    bandProfile: bandProfile || "unified"
  };

  const raw = stableStringify(shape);
  const presenceKey = "psend30-presence::" + computeHash(raw);

  const dual = computeDualHash("PRESENCE_SURFACE_V30", {
    presenceKey,
    shape
  });

  return {
    scope,
    presenceKey,
    presenceShape: shape,
    presenceDualHashPrimary: dual.primary,
    presenceDualHashSecondary: dual.secondary
  };
}


// ============================================================================
//  TECH SURFACE v3 — USE ALL IMPORTS + unified band + meshFactoring + instincts
// ============================================================================
function buildTechSurfaceV3({
  jobId,
  pattern,
  payload,
  priority,
  returnTo,
  mode,
  bandMode,
  bandProfile,
  meshFactoringProfile,
  instinctsSnapshot,
  designSnapshot
}) {
  const v3sym = PulseV3SymShifter
    ? PulseV3SymShifter({
        jobId,
        pattern,
        payload,
        priority,
        returnTo,
        mode,
        bandMode: bandMode || "binary",
        bandProfile: bandProfile || "unified"
      })
    : null;

  const v2 = PulseV2EvolutionEngine.createPulseV2
    ? PulseV2EvolutionEngine.createPulseV2({
        jobId,
        pattern,
        payload,
        priority,
        returnTo,
        mode
      })
    : null;

  const v3 = PulseV3UnifiedOrganism.createPulseV3
    ? PulseV3UnifiedOrganism.createPulseV3({
        jobId,
        pattern,
        payload,
        priority,
        returnTo,
        mode
      })
    : null;

  const impulse = PulseSendImpulse.createImpulse
    ? PulseSendImpulse.createImpulse({
        jobId,
        pattern,
        payload,
        priority,
        returnTo,
        mode
      })
    : null;

  const legacy = PulseSendLegacyPulse.createLegacyPulse
    ? PulseSendLegacyPulse.createLegacyPulse({
        jobId,
        pattern,
        payload,
        priority,
        returnTo,
        mode
      })
    : null;

  const adapter = PulseSendAdapter.adapt
    ? PulseSendAdapter.adapt({
        jobId,
        pattern,
        payload,
        priority,
        returnTo,
        mode
      })
    : null;

  const engine = PulseSendEngine.engine
    ? PulseSendEngine.engine({
        jobId,
        pattern,
        payload,
        priority,
        returnTo,
        mode
      })
    : null;

  const ret = PulseSendReturn.ret
    ? PulseSendReturn.ret({
        jobId,
        pattern,
        payload,
        priority,
        returnTo,
        mode
      })
    : null;

  const system = PulseSendSystem.conduct
    ? PulseSendSystem.conduct({
        jobId,
        pattern,
        payload,
        priority,
        returnTo,
        mode
      })
    : null;

  const shape = {
    v3sym,
    v2,
    v3,
    impulse,
    legacy,
    adapter,
    engine,
    ret,
    system,
    bandMode: bandMode || "binary",
    bandProfile: bandProfile || "unified",
    meshFactoringProfile,
    instinctsSnapshot,
    designSnapshot
  };

  const dual = computeDualHash("TECH_SURFACE_V3", shape);

  return {
    ...shape,
    techDualHashPrimary: dual.primary,
    techDualHashSecondary: dual.secondary
  };
}


// ============================================================================
//  FACTORY — Build the Full PulseSend v30++ IMMORTAL-ORGANISM
// ============================================================================
export function createPulseSend({
  createPulseV3,
  createPulseV2,
  createPulseV1,
  pulseRouter,   // expected: EvolutionaryThought v30 wrapper
  pulseMesh,     // expected: PulseMeshRouter v30
  createPulseSendMover,
  createPulseSendImpulse,
  createPulseSendReturn,
  log,
  sdn
}) {
  const mover = createPulseSendMover({ pulseMesh, log });
  const impulse = createPulseSendImpulse({ mover, log });
  const returnArc = createPulseSendReturn({ impulse, pulseRouter, pulseMesh, log });

  const instincts = PulseRouterEvolutionaryInstincts();
  const designCortex = PulseRouterEvolutionaryDesign();
  const thoughtRouter = PulseRouterEvolutionaryThought({ log });

  function emitSDN(source, payload) {
    if (!sdn || typeof sdn.emitImpulse !== "function") return;
    try {
      sdn.emitImpulse(source, payload);
    } catch (e) {
      log && log("[PulseSend-v30] SDN emit failed (non-fatal)", { source, error: e });
    }
  }

  // ========================================================================
  //  PUBLIC API — send()  (unified-band, dual-band aware, v30 surfaces)
  // ========================================================================
  function send({
    jobId,
    pattern,
    payload = {},
    priority = "normal",
    returnTo = null,
    mode = "normal",
    // v30++ band/presence hints (optional)
    bandMode = "binary",
    bandProfile = "unified", // unified / binary-only / analog / radio / hybrid
    presenceField = null,
    advantageField = null
  }) {

    let pulse = null;
    let pulseType = null;
    let fallbackSurface = null;

    emitSDN("send:begin", {
      jobId,
      pattern,
      priority,
      returnTo,
      mode,
      bandMode,
      bandProfile
    });

    // ⭐ Tier 0 — binary-first SymShifter v3 (if wired)
    try {
      if (createPulseV2 && typeof createPulseV2 === "function") {
        pulse = PulseV3SymShifter
          ? PulseV3SymShifter({
              jobId,
              pattern,
              payload,
              priority,
              returnTo,
              mode,
              bandMode,
              bandProfile
            })
          : createPulseV2({
              jobId,
              pattern,
              payload,
              priority,
              returnTo,
              mode
            });
        pulseType = "Pulse-v3-SymShifter-unified-band";
      }
    } catch (errSym) {
      fallbackSurface = buildFallbackSurface("v3sym→v3", errSym);
      emitSDN("send:pulse-fallback", {
        jobId,
        pattern,
        from: "v3sym",
        to: "v3",
        error: String(errSym)
      });
      pulse = null;
      pulseType = null;
    }

    // ⭐ Tier 1 — Pulse v3
    if (!pulse) {
      try {
        pulse = createPulseV3({
          jobId,
          pattern,
          payload,
          priority,
          returnTo,
          mode
        });
        pulseType = "Pulse-v3";
      } catch (errV3) {
        fallbackSurface = buildFallbackSurface("v3→v2", errV3);
        emitSDN("send:pulse-fallback", {
          jobId,
          pattern,
          from: "v3",
          to: "v2",
          error: String(errV3)
        });
      }
    }

    // ⭐ Tier 2 — Pulse v2 (classic)
    if (!pulse) {
      try {
        pulse = createPulseV2({
          jobId,
          pattern,
          payload,
          priority,
          returnTo,
          mode
        });
        pulseType = "Pulse-v2";
      } catch (errV2) {
        fallbackSurface = buildFallbackSurface("v2→v1", errV2);
        emitSDN("send:pulse-fallback", {
          jobId,
          pattern,
          from: "v2",
          to: "v1",
          error: String(errV2)
        });
      }
    }

    // ⭐ Tier 3 — Pulse v1
    if (!pulse) {
      pulse = createPulseV1({
        jobId,
        pattern,
        payload,
        priority,
        returnTo,
        mode
      });
      pulseType = "Pulse-v1";
      fallbackSurface = buildFallbackSurface("none→v1", "v3/v2 creation failed");
      emitSDN("send:pulse-fallback", {
        jobId,
        pattern,
        from: "none",
        to: "v1"
      });
    }

    // v30++: enforce bandMode / bandProfile / presence on pulse surface if missing
    const effectiveBand = pulse.bandMode || bandMode || "binary";
    const effectiveBandProfile = pulse.bandProfile || bandProfile || "unified";

    pulse.bandMode = effectiveBand;
    pulse.band = effectiveBand;
    pulse.bandProfile = effectiveBandProfile;

    if (presenceField && !pulse.presenceField) {
      pulse.presenceField = presenceField;
    }
    if (advantageField && !pulse.advantageField) {
      pulse.advantageField = advantageField;
    }

    emitSDN("send:pulse-created", {
      jobId,
      pattern,
      mode,
      pulseType,
      bandMode: effectiveBand,
      bandProfile: effectiveBandProfile
    });

    // ⭐ Optional mesh signal factoring (metadata-only)
    let meshFactoringProfile = null;
    try {
      if (applyMeshSignalFactoring && pulseMesh) {
        const factoringImpulse = {
          id: jobId || pattern || "psend30",
          band: effectiveBand,
          bandProfile: effectiveBandProfile,
          presenceField: pulse.presenceField || {},
          advantageField: pulse.advantageField || {},
          flags: {
            aura_factoring_bias: 0,
            mesh_factor_depth: 0,
            mesh_factor_bias: 0
          }
        };
        applyMeshSignalFactoring(factoringImpulse, {
          band: effectiveBand,
          bandProfile: effectiveBandProfile,
          presenceField: pulse.presenceField || {},
          advantageField: pulse.advantageField || {},
          deviceProfile: pulseMesh.deviceProfile || {}
        });
        meshFactoringProfile = factoringImpulse.flags.mesh_factoring_profile || null;
      }
    } catch (e) {
      // factoring is advisory only
      log && log("[PulseSend-v30] mesh factoring advisory failed", { error: e });
    }

    // ⭐ Evolutionary Thought routing (brainstem v30)
    const thoughtDecision = thoughtRouter.route(pulse, {
      imports: [],
      settings: {},
      healthScore: pulse.healthScore
    });

    // ⭐ Evolutionary Instincts record (route DNA v30)
    const instinctsRecord = instincts.recordRoute({
      routeShape: {
        pattern,
        lineage: pulse.lineage || [],
        pageId: pulse.pageId || "NO_PAGE",
        bandMode: effectiveBand,
        bandProfile: effectiveBandProfile
      },
      routeStats: {
        successCount: 0,
        failureCount: 0,
        degradationEvents: 0
      },
      healthScore: pulse.healthScore || 1,
      pattern,
      lineage: pulse.lineage || [],
      pageId: pulse.pageId || "NO_PAGE",
      payload,
      cosmos: normalizeCosmos(pulse.cosmos || {})
    });

    // ⭐ Evolutionary Design record (design cortex v30)
    const designRecord = designCortex.recordDesign({
      routeId: thoughtDecision.routeKey || pattern || "NO_ROUTE",
      design: {
        pattern,
        bandMode: effectiveBand,
        bandProfile: effectiveBandProfile,
        meshPath: thoughtDecision.targetOrgan || null
      },
      designStats: {
        stability: 1.0,
        clarity: 1.0,
        lineageStrength: 1.0,
        meshAffinity: 0.9,
        earnAffinity: 0.8,
        cosmosStability: 1.0
      },
      pattern,
      lineage: pulse.lineage || [],
      pageId: pulse.pageId || "NO_PAGE",
      payload,
      cosmos: normalizeCosmos(pulse.cosmos || {})
    });

    // ⭐ Route (using provided pulseRouter, expected to align with thoughtDecision)
    const targetOrgan = pulseRouter.route(pulse);
    const routeSurface = buildRouteSurface(
      targetOrgan,
      thoughtDecision,
      instinctsRecord,
      designRecord
    );

    // ⭐ Pathway (mesh v30)
    const pathway = pulseMesh.pathwayFor(targetOrgan, mode);
    const pathwaySurface = buildPathwaySurface(pathway);

    emitSDN("send:routed", {
      jobId,
      pattern,
      targetOrgan,
      pathway,
      mode,
      pulseType,
      bandMode: effectiveBand,
      bandProfile: effectiveBandProfile
    });

    // ⭐ Movement
    const movement = impulse.fire({ pulse, targetOrgan, pathway, mode });
    const movementSurface = buildMovementSurface(movement);

    emitSDN("send:movement", {
      jobId,
      pattern,
      targetOrgan,
      pathway,
      mode,
      pulseType,
      movementMeta: movementSurface
    });

    // ⭐ Return Arc
    const result = returnArc.handle(movement.packet, mode);
    const returnSurface = buildReturnSurface(result);

    emitSDN("send:return", {
      jobId,
      pattern,
      mode,
      pulseType,
      resultMeta: returnSurface
    });

    // ⭐ Memory (router-level remember)
    pulseRouter.remember(
      pulse,
      targetOrgan,
      "success",
      pulse.healthScore || 1
    );

    emitSDN("send:complete", {
      jobId,
      pattern,
      targetOrgan,
      mode,
      pulseType,
      bandMode: effectiveBand,
      bandProfile: effectiveBandProfile
    });

    // ⭐ 30.0 surfaces — cacheChunk / prewarm / presence
    const cacheChunkSurface = buildCacheChunkSurface({
      jobId,
      pattern,
      targetOrgan,
      pathway,
      mode,
      pulseType,
      bandMode: effectiveBand,
      bandProfile: effectiveBandProfile
    });

    const prewarmSurface = buildPrewarmSurface({
      priority,
      mode,
      pathway
    });

    const presenceSurface = buildPresenceSurface({
      pattern,
      pathway,
      bandMode: effectiveBand,
      bandProfile: effectiveBandProfile
    });

    // ⭐ TECH SURFACE v3 (uses ALL imports + band + meshFactoring + instincts/design)
    const techSurface = buildTechSurfaceV3({
      jobId,
      pattern,
      payload,
      priority,
      returnTo,
      mode,
      bandMode: effectiveBand,
      bandProfile: effectiveBandProfile,
      meshFactoringProfile,
      instinctsSnapshot: instincts.getSnapshot(),
      designSnapshot: designCortex.getSnapshot()
    });

    // ⭐ INTELLIGENCE v30++ (IMMORTAL-ORGANISM)
    const instinctsAdvantageField = instinctsRecord
      ? instinctsRecord.advantageField
      : null;

    const pulseIntelligence = computePulseIntelligenceV30({
      advantageField: pulse.advantageField || {},
      presenceField: pulse.presenceField || {},
      factoringSignal: pulse.factoringSignal || null,
      bandMode: effectiveBand,
      bandProfile: effectiveBandProfile,
      meshFactoringProfile,
      instinctsAdvantageField
    });

    const pulseIntelligenceDualHash = computeDualHash(
      "PULSE_INTELLIGENCE_V30",
      pulseIntelligence
    );

    // ⭐ GLOBAL SEND DUAL-HASH (unified-band)
    const sendSignaturePayload = {
      jobId,
      pattern,
      mode,
      pulseType,
      targetOrgan,
      pathway,
      priority,
      returnTo,
      bandMode: effectiveBand,
      bandProfile: effectiveBandProfile
    };

    const sendDualHash = computeDualHash("PULSE_SEND_V30", sendSignaturePayload);

    // ⭐ Return full telemetry
    return {
      movement,
      result,
      mode,
      pulseType,
      bandMode: effectiveBand,
      bandProfile: effectiveBandProfile,

      // ⭐ top-level intelligence
      pulseIntelligence,
      pulseIntelligenceDualHash,

      // ⭐ global send dual-hash
      sendDualHashPrimary: sendDualHash.primary,
      sendDualHashSecondary: sendDualHash.secondary,

      fallbackSurface,
      routeSurface,
      pathwaySurface,
      movementSurface,
      returnSurface,

      cacheChunkSurface,
      prewarmSurface,
      presenceSurface,

      techSurface,

      diagnostics: {
        ...buildSendDiagnostics({
          jobId,
          pattern,
          mode,
          pulseType,
          bandMode: effectiveBand,
          bandProfile: effectiveBandProfile
        }),

        // ⭐ mirrored intelligence + signature + dual-hash
        pulseIntelligence,
        pulseIntelligenceSignature: computeHash(JSON.stringify(pulseIntelligence)),
        pulseIntelligenceDualHashPrimary: pulseIntelligenceDualHash.primary,
        pulseIntelligenceDualHashSecondary: pulseIntelligenceDualHash.secondary,

        sendDualHashPrimary: sendDualHash.primary,
        sendDualHashSecondary: sendDualHash.secondary
      }
    };
  }

  return {
    send
  };
}


// ============================================================================
//  ORGAN EXPORT — ⭐ PulseSend (v30++ IMMORTAL-ORGANISM)
// ============================================================================
export const PulseSend = {

  send(...args) {
    throw new Error(
      "[PulseSend-v30] PulseSend.send() was called before initialization. " +
      "Use createPulseSend(...) to wire dependencies."
    );
  }
};
PulseRealm.PulseSend = {
  PulseSend,
  createPulseSend,
  readCoreMemorySend,
  writeCoreMemorySend
}
PulseRealm.PulseSend = PulseSend;
PulseRealm.PulseSendBuild = createPulseSend;