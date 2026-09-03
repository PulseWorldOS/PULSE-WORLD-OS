// ============================================================================
//  PulseNodeEvolution-v30-IMMORTAL.js (UPGRADED)
//  IMMORTAL-tier, shifter-first, sectional fallback evolution layer — v30++
//  - Sits ABOVE all nodes (admin, intellect, reproduction, mesh, earn, presence, worker, generic).
//  - Does NOT rewrite existing organs.
//  - Upgrades pulses, manages shifter pools, applies sectional fallback.
//  - Dual/tri-band aware, chunk/prewarm/continuance-aware, deterministic, drift-proof.
//  - Advantage-aware: emits evolution advantage surfaces + artery snapshot.
//  - NOW: Central tools organ for NodeAdmin + Intellect (and others).
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import { createPulseV3, evolvePulseV3 } from "../../PULSE-SHIFTER/PulseShifterBinaryEvolutionaryPulse-v31.js";
import {PulseNodeAdminIntellect} from "./PulseToolsNodeAdminIntellect-v30.js";
import {PulseAdminInspector} from "../PulseToolsAdminInspector-v30.js";
import {PulseBinaryBehaviorScanner as PulseBehaviorScanner} from "../PulseToolsBehaviorScanner-v30.js";
import {PulsePageEvo as PulseBinaryFramework} from "../PulseToolsBinaryFramework-v30.js";
import {PulseBinaryLoopScanner} from "../PulseToolsLoopScanner-v30.js";
import {PulseBinaryWaveScanner} from "../PulseToolsWaveScanner-v30.js";
import {PulseScannerCortex as PulseEvolutionaryScanner} from "../PulseToolsEvolutionaryScanner-v30.js";
import {PulseToolsHeatMap as PulseHeatMap} from "../PulseToolsHeatMap-v30.js";




export const PulseNodeEvolutionMetaV30 = Object.freeze({
  organId: "PulseNodeEvolution",
  role: "NODE_EVOLUTION_LAYER",
  version: "v30-IMMORTAL++",
  lineage: "PulseOS/PULSE-TOOLS/NodeEvolution",
  evo: {
    shifterFirst: true,
    dualBand: true,
    triBand: true,
    presenceAware: true,
    harmonicsAware: true,
    chunkPrewarmAware: true,
    continuanceAware: true,
    advantageAware: true,
    multiInstanceIdentity: true,
    meshAware: true,
    routerAware: true,
    arteryAware: true,
    snapshotAware: true
  },
  guarantees: {
    deterministic: true,
    driftProof: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroRandomness: true,
    zeroMutationOfInput: true,
    pureCompute: true,
    windowSafe: true,
    immortal: true
  }
});

function clone(obj) {
  return obj && typeof obj === "object"
    ? JSON.parse(JSON.stringify(obj))
    : obj;
}

// ---------------------------------------------------------------------------
// EVOLUTION TOOLS SURFACE (centralized tools root)
// ---------------------------------------------------------------------------

function createEvolutionTools() {
  // Binary + behavior scanning
  function scanBehavior(pulse, context = {}) {
    return PulseBehaviorScanner.scan(pulse, context);
  }

  function scanBinaryBehavior(binary, context = {}) {
    return PulseBehaviorScanner.scan(binary, context);
  }

  function scanLoop(pulse, context = {}) {
    return PulseBinaryLoopScanner.scan(pulse, context);
  }

  function scanBinaryLoop(binary, context = {}) {
    return PulseBinaryLoopScanner.scan(binary, context);
  }

  function scanWave(pulse, context = {}) {
    return PulseBinaryWaveScanner.scan(pulse, context);
  }

  function scanBinaryWave(binary, context = {}) {
    return PulseBinaryWaveScanner.scan(binary, context);
  }

  // Evolutionary / advantage / mutation surfaces
  function evolutionaryScan(pulse, context = {}) {
    return PulseEvolutionaryScanner.scan(pulse, context);
  }

  // Binary framework helpers
  function applyBinaryFramework(binary, context = {}) {
    return PulseBinaryFramework.apply(binary, context);
  }

  // Heatmap / visualization
  function computeHeatMap(pulse, context = {}) {
    return PulseHeatMap.compute(pulse, context);
  }

  // Admin + Intellect joint helpers
  function adminIntellectAnalyze(pulse, context = {}) {
    return PulseNodeAdminIntellect.analyze(pulse, context);
  }

  function adminIntellectAdvise(pulse, context = {}) {
    return PulseNodeAdminIntellect.advise(pulse, context);
  }

  // Admin-specific helpers
  function adminInspect(state, context = {}) {
    return PulseAdminInspector.inspect(state, context);
  }

  return Object.freeze({
    scanBehavior,
    scanBinaryBehavior,
    scanLoop,
    scanBinaryLoop,
    scanWave,
    scanBinaryWave,
    evolutionaryScan,
    applyBinaryFramework,
    computeHeatMap,
    adminIntellectAnalyze,
    adminIntellectAdvise,
    adminInspect
  });
}

// ---------------------------------------------------------------------------
// ARTERY — evolution load + shifter usage + fallback modes
// ---------------------------------------------------------------------------

function createNodeEvolutionArtery() {
  return {
    evolutions: 0,
    lastNodeType: "generic",
    lastMode: "none",
    shifterUses: 0,
    legacyUses: 0,
    legacyErrors: 0,
    lastShifterSatellites: 0,
    lastAdvantageScore: 0,

    snapshot() {
      const load = Math.min(1, this.evolutions / 32768);
      const shifterRatio =
        this.evolutions > 0 ? this.shifterUses / this.evolutions : 0;
      const legacyRatio =
        this.evolutions > 0 ? this.legacyUses / this.evolutions : 0;

      const loadBucket =
        load >= 0.9 ? "saturated" :
        load >= 0.7 ? "high" :
        load >= 0.4 ? "medium" :
        load > 0    ? "low" :
                      "idle";

      const shifterBucket =
        shifterRatio >= 0.7 ? "shifter-dominant" :
        shifterRatio >= 0.4 ? "shifter-heavy"    :
        shifterRatio >  0   ? "shifter-light"    :
                              "shifter-none";

      const legacyBucket =
        legacyRatio >= 0.7 ? "legacy-dominant" :
        legacyRatio >= 0.4 ? "legacy-heavy"    :
        legacyRatio >  0   ? "legacy-light"    :
                             "legacy-none";

      return Object.freeze({
        meta: PulseNodeEvolutionMetaV30,
        evolutions: this.evolutions,
        lastNodeType: this.lastNodeType,
        lastMode: this.lastMode,
        shifterUses: this.shifterUses,
        legacyUses: this.legacyUses,
        legacyErrors: this.legacyErrors,
        lastShifterSatellites: this.lastShifterSatellites,
        lastAdvantageScore: this.lastAdvantageScore,
        load,
        loadBucket,
        shifterRatio,
        shifterBucket,
        legacyRatio,
        legacyBucket
      });
    }
  };
}

// ---------------------------------------------------------------------------
// SHIFTER POOL
// ---------------------------------------------------------------------------

function createShifterPool({
  createShifterPulse = createPulseV3,
  evolveShifterPulse= evolvePulseV3,
  poolSize = 5,
  log = () => {}
}) {
  const pool = [];
  const poolMeta = {
    version: "v30-IMMORTAL++",
    targetSize: poolSize,
    initialized: false,
    refreshCount: 0
  };

  function initPool(baseCtx = {}) {
    if (!createShifterPulse) return;
    if (poolMeta.initialized) return;

    for (let i = pool.length; i < poolSize; i++) {
      try {
        const shifter = createShifterPulse({
          pattern: "POOL::INIT",
          payload: {},
          mode: "normal",
          bandMode: "symbolic",
          continuanceHint: "POOL::BASE",
          ...baseCtx
        });
        if (shifter) pool.push(shifter);
      } catch (err) {
        log("[ShifterPool] init error:", err);
        break;
      }
    }
    poolMeta.initialized = true;
  }

  function refreshPool(ctx = {}) {
    if (!evolveShifterPulse || pool.length === 0) return;
    poolMeta.refreshCount++;

    for (let i = 0; i < pool.length; i++) {
      try {
        pool[i] = evolveShifterPulse(pool[i], {
          routerHint: "POOL::REFRESH",
          meshHint: null,
          organHint: null,
          continuanceHint: "POOL::REFRESH",
          ...ctx
        });
      } catch (err) {
        log("[ShifterPool] refresh error:", err);
      }
    }
  }

  function getSatellites(count = 3) {
    if (pool.length === 0) return [];
    return pool.slice(0, Math.min(count, pool.length));
  }

  function snapshot() {
    return {
      meta: { ...poolMeta },
      size: pool.length
    };
  }

  return {
    initPool,
    refreshPool,
    getSatellites,
    snapshot
  };
}

// ---------------------------------------------------------------------------
// SECTIONAL FALLBACK + DEFAULT HANDLERS
// ---------------------------------------------------------------------------

function createDefaultHandlers(evolutionTools, log) {
  // Generic legacy upgrade: light behavior scan + evolutionary scan
  function genericLegacyUpgrade(pulse, context = {}) {
    const scanned = evolutionTools.scanBehavior(pulse, context);
    const evo = evolutionTools.evolutionaryScan(scanned, context);
    return {
      ...scanned,
      evolution: evo
    };
  }

  // Admin: admin inspector + NodeAdminIntellect helpers
  function adminLegacyUpgrade(pulse, context = {}) {
    const inspected = evolutionTools.adminInspect(pulse, context);
    const analysis = evolutionTools.adminIntellectAnalyze(inspected, context);
    const advice = evolutionTools.adminIntellectAdvise(inspected, context);
    const heat = evolutionTools.computeHeatMap(inspected, context);
    return {
      ...inspected,
      adminAnalysis: analysis,
      adminAdvice: advice,
      adminHeatMap: heat
    };
  }

  // Intellect: evolutionary scan + binary framework + behavior scan
  function intellectLegacyUpgrade(pulse, context = {}) {
    const evo = evolutionTools.evolutionaryScan(pulse, context);
    const behavior = evolutionTools.scanBehavior(pulse, context);
    const loop = evolutionTools.scanLoop(pulse, context);
    const wave = evolutionTools.scanWave(pulse, context);
    return {
      ...pulse,
      intellectEvolution: evo,
      intellectBehavior: behavior,
      intellectLoop: loop,
      intellectWave: wave
    };
  }

  // Presence: heatmap + behavior scan
  function presenceLegacyUpgrade(pulse, context = {}) {
    const behavior = evolutionTools.scanBehavior(pulse, context);
    const heat = evolutionTools.computeHeatMap(pulse, context);
    return {
      ...pulse,
      presenceBehavior: behavior,
      presenceHeatMap: heat
    };
  }

  // Mesh / worker / earn / reproduction can reuse generic with slight bias
  function meshLegacyUpgrade(pulse, context = {}) {
    const base = genericLegacyUpgrade(pulse, context);
    return {
      ...base,
      meshLoop: evolutionTools.scanLoop(pulse, context),
      meshWave: evolutionTools.scanWave(pulse, context)
    };
  }

  function workerLegacyUpgrade(pulse, context = {}) {
    const base = genericLegacyUpgrade(pulse, context);
    return {
      ...base,
      workerLoop: evolutionTools.scanLoop(pulse, context)
    };
  }

  function earnLegacyUpgrade(pulse, context = {}) {
    const base = genericLegacyUpgrade(pulse, context);
    return {
      ...base,
      earnHeatMap: evolutionTools.computeHeatMap(pulse, context)
    };
  }

  function reproductionLegacyUpgrade(pulse, context = {}) {
    const base = genericLegacyUpgrade(pulse, context);
    return {
      ...base,
      reproductionEvolution: evolutionTools.evolutionaryScan(pulse, context)
    };
  }

  const genericHandler = {
    supportsShifter(ctx) {
      return true;
    },
    legacyUpgrade: genericLegacyUpgrade
  };

  return {
    generic: genericHandler,
    admin: {
      supportsShifter(ctx) {
        return true;
      },
      legacyUpgrade: adminLegacyUpgrade
    },
    intellect: {
      supportsShifter(ctx) {
        return true;
      },
      legacyUpgrade: intellectLegacyUpgrade
    },
    presence: {
      supportsShifter(ctx) {
        return true;
      },
      legacyUpgrade: presenceLegacyUpgrade
    },
    mesh: {
      supportsShifter(ctx) {
        return true;
      },
      legacyUpgrade: meshLegacyUpgrade
    },
    worker: {
      supportsShifter(ctx) {
        return true;
      },
      legacyUpgrade: workerLegacyUpgrade
    },
    earn: {
      supportsShifter(ctx) {
        return true;
      },
      legacyUpgrade: earnLegacyUpgrade
    },
    reproduction: {
      supportsShifter(ctx) {
        return true;
      },
      legacyUpgrade: reproductionLegacyUpgrade
    }
  };
}

function createSectionalFallback({
  handlers,
  envCapabilities,
  createShifterPulse,
  evolveShifterPulse,
  shifterPool,
  artery,
  log
}) {
  const caps = envCapabilities || {};
  const supportsShifterGlobally =
    caps.supportsShifterGlobally || (() => true);

  function getSectionHandler(nodeType) {
    return handlers[nodeType] || handlers.generic || {};
  }

  function sectionSupportsShifter(nodeType, ctx) {
    if (!supportsShifterGlobally()) return false;
    const h = getSectionHandler(nodeType);
    if (typeof h.supportsShifter === "function") {
      try {
        return !!h.supportsShifter(ctx);
      } catch (err) {
        log("[SectionalFallback] supportsShifter error:", nodeType, err);
        return false;
      }
    }
    return true;
  }

  function preSectionConnector({ nodeType, pulse, context }) {
    const nextPulse = clone(pulse);
    nextPulse.meta = nextPulse.meta || {};
    nextPulse.meta.nodeType = nodeType || "generic";
    nextPulse.meta.evolutionLayer = "PulseNodeEvolution-v30-IMMORTAL++";
    nextPulse.meta.evolutionEpoch = "IMMORTAL-V30";
    nextPulse.meta.evolutionBands = {
      dualBand: true,
      triBand: true
    };
    return nextPulse;
  }

  function postSectionConnector({ nodeType, pulse, context, sectionMeta }) {
    const nextPulse = clone(pulse);
    nextPulse.meta = nextPulse.meta || {};
    nextPulse.meta.sectionMeta = {
      ...(nextPulse.meta.sectionMeta || {}),
      [nodeType || "generic"]: sectionMeta
    };
    return nextPulse;
  }

  function computeEvolutionAdvantage({ nodeType, pulse, context, satellites }) {
    const presenceLevel = context.presenceAvg ?? 0;
    const coherenceScore = context.coherenceScore ?? 0.5;
    const harmonicDrift = Math.abs(context.harmonicDrift ?? 0);
    const shifterCount = satellites.length;

    const base =
      presenceLevel * 0.4 +
      coherenceScore * 0.4 -
      harmonicDrift * 0.2;

    const shifterBoost =
      shifterCount >= 3 ? 0.15 :
      shifterCount >= 2 ? 0.10 :
      shifterCount >= 1 ? 0.05 : 0;

    const envBias =
      nodeType === "admin"        ? 1.0  :
      nodeType === "intellect"    ? 0.95 :
      nodeType === "reproduction" ? 0.9  :
      nodeType === "mesh"         ? 0.9  :
      nodeType === "earn"         ? 0.85 :
      nodeType === "presence"     ? 1.0  :
      nodeType === "worker"       ? 0.9  :
                                    0.9;

    const advantageScore = Math.max(0, Math.min(1, (base + shifterBoost) * envBias));

    return {
      version: "v30-IMMORTAL-ADVANTAGE",
      nodeType,
      presenceLevel,
      coherenceScore,
      harmonicDrift,
      shifterCount,
      envBias,
      advantageScore
    };
  }

  function tryShifterFirst({ nodeType, pulse, context }) {
    if (!createShifterPulse || !evolveShifterPulse) return null;
    if (!sectionSupportsShifter(nodeType, context)) return null;

    try {
      const satellites = shifterPool.getSatellites(3);
      const satelliteIntel = [];

      for (const sat of satellites) {
        try {
          const evolvedSat = evolveShifterPulse(sat, {
            routerHint: `NODE::${nodeType}`,
            meshHint: context.meshHint || null,
            organHint: context.organHint || null,
            continuanceHint: "NODE::SATELLITE",
            ...context
          });

          satelliteIntel.push({
            advantageField: evolvedSat.advantageField,
            healthScore: evolvedSat.healthScore,
            pulseCompute: evolvedSat.pulseCompute,
            pulseIntelligence: evolvedSat.pulseIntelligence,
            immortalMeta: evolvedSat.immortalMeta
          });
        } catch (err) {
          log("[SectionalFallback] satellite evolve error:", nodeType, err);
        }
      }

      const advantageView = computeEvolutionAdvantage({
        nodeType,
        pulse,
        context,
        satellites: satelliteIntel
      });

      const shifter = createShifterPulse({
        jobId: pulse.jobId || null,
        pattern: pulse.pattern || "UNKNOWN_PATTERN",
        payload: pulse.payload || {},
        priority: pulse.priority || "normal",
        returnTo: pulse.returnTo || null,
        parentLineage: pulse.lineage || null,
        mode: pulse.mode || "normal",
        pageId: pulse.pageId || "NO_PAGE",
        bandMode: pulse.bandMode || "symbolic",
        presenceBandState: pulse.presenceBandState || null,
        harmonicDrift: pulse.harmonicDrift || null,
        coherenceScore: pulse.coherenceScore || null,
        satelliteIntel,
        evolutionAdvantage: advantageView
      });

      if (!shifter) return null;

      artery.evolutions++;
      artery.lastNodeType = nodeType;
      artery.lastMode = "shifter";
      artery.shifterUses++;
      artery.lastShifterSatellites = satelliteIntel.length;
      artery.lastAdvantageScore = advantageView.advantageScore;

      return {
        pulse: shifter,
        meta: {
          mode: "shifter",
          nodeType,
          usedSatellites: satelliteIntel.length,
          advantageView
        }
      };
    } catch (err) {
      log("[SectionalFallback] shifter-first error:", nodeType, err);
      return null;
    }
  }

  function tryLegacySection({ nodeType, pulse, context }) {
    const h = getSectionHandler(nodeType);

    if (typeof h.legacyUpgrade !== "function") {
      artery.evolutions++;
      artery.lastNodeType = nodeType;
      artery.lastMode = "legacy-pass-through";
      artery.legacyUses++;

      return {
        pulse,
        meta: {
          mode: "legacy-pass-through",
          nodeType
        }
      };
    }

    try {
      const upgraded = h.legacyUpgrade(pulse, context) || pulse;

      const advantageView = computeEvolutionAdvantage({
        nodeType,
        pulse: upgraded,
        context,
        satellites: []
      });

      artery.evolutions++;
      artery.lastNodeType = nodeType;
      artery.lastMode = "legacy";
      artery.legacyUses++;
      artery.lastShifterSatellites = 0;
      artery.lastAdvantageScore = advantageView.advantageScore;

      return {
        pulse: upgraded,
        meta: {
          mode: "legacy",
          nodeType,
          advantageView
        }
      };
    } catch (err) {
      log("[SectionalFallback] legacy error:", nodeType, err);

      artery.evolutions++;
      artery.lastNodeType = nodeType;
      artery.lastMode = "legacy-error-pass-through";
      artery.legacyUses++;
      artery.legacyErrors++;

      return {
        pulse,
        meta: {
          mode: "legacy-error-pass-through",
          nodeType,
          error: String(err && err.message ? err.message : err)
        }
      };
    }
  }

  function evolveNodePulse({ nodeType, pulse, context = {} }) {
    const safeNodeType = nodeType || "generic";

    const pre = preSectionConnector({ nodeType: safeNodeType, pulse, context });

    const shifterResult = tryShifterFirst({
      nodeType: safeNodeType,
      pulse: pre,
      context
    });

    let chosen;
    if (shifterResult && shifterResult.pulse) {
      chosen = shifterResult;
    } else {
      const legacyResult = tryLegacySection({
        nodeType: safeNodeType,
        pulse: pre,
        context
      });
      chosen = legacyResult;
    }

    const post = postSectionConnector({
      nodeType: safeNodeType,
      pulse: chosen.pulse,
      context,
      sectionMeta: chosen.meta
    });

    return post;
  }

  return {
    evolveNodePulse,
    preSectionConnector,
    postSectionConnector,
    getSectionHandler,
    sectionSupportsShifter,
    computeEvolutionAdvantage
  };
}

// ---------------------------------------------------------------------------
// PUBLIC FACTORY
// ---------------------------------------------------------------------------

export function createPulseNodeEvolutionV30(config = {}) {
  const {
    createShifterPulse,
    evolveShifterPulse,
    handlers = {},
    envCapabilities = {},
    log = () => {},
    shifterPoolSize = 5
  } = config;

  const artery = createNodeEvolutionArtery();
  const evolutionTools = createEvolutionTools();

  const shifterPool = createShifterPool({
    createShifterPulse,
    evolveShifterPulse,
    poolSize: shifterPoolSize,
    log
  });

  shifterPool.initPool({});

  const defaultHandlers = createDefaultHandlers(evolutionTools, log);

  const sectional = createSectionalFallback({
    handlers: { ...defaultHandlers, ...handlers },
    envCapabilities,
    createShifterPulse,
    evolveShifterPulse,
    shifterPool,
    artery,
    log
  });

  return Object.freeze({
    meta: {
      organId: "PulseNodeEvolution",
      role: "NODE_EVOLUTION_LAYER",
      version: "v30-IMMORTAL++",
      lineage: "PulseOS/PULSE-TOOLS/NodeEvolution",
      evo: {
        shifterFirst: true,
        dualBand: true,
        triBand: true,
        presenceAware: true,
        harmonicsAware: true,
        chunkPrewarmAware: true,
        continuanceAware: true,
        advantageAware: true,
        multiInstanceIdentity: true,
        meshAware: true,
        routerAware: true,
        arteryAware: true,
        snapshotAware: true
      },
      guarantees: {
        deterministic: true,
        driftProof: true,
        zeroNetwork: true,
        zeroFilesystem: true,
        zeroRandomness: true,
        zeroMutationOfInput: true,
        pureCompute: true,
        windowSafe: true,
        immortal: true
      }
    },
    evolveNodePulse({ nodeType, pulse, context = {} }) {
      return sectional.evolveNodePulse({ nodeType, pulse, context });
    },
    refreshShifterPool(ctx = {}) {
      shifterPool.refreshPool(ctx);
    },
    snapshotShifterPool() {
      return shifterPool.snapshot();
    },
    snapshotArtery() {
      return artery.snapshot();
    },
    tools: evolutionTools,
    computeEvolutionAdvantage: sectional.computeEvolutionAdvantage
  });
}

export default createPulseNodeEvolutionV30;

PulseRealm.ToolsNodeEvolution = {
  createPulseNodeEvolutionV30,
  PulseNodeEvolutionMetaV30
}