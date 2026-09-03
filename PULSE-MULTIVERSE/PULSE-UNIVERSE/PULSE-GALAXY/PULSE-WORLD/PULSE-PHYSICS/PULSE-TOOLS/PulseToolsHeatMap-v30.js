// ============================================================================
// FILE: /PulseOS/Scanner/PulseHeatMap-v30-IMMORTAL-GPU+-CI-DELTA.js
// PULSE OS — v30‑IMMORTAL‑GPU+‑CI‑DELTA
// UNIVERSAL HEATMAP ORGAN — ROLE-COLOR, PRESENCE, HARMONICS, MULTI-SPIN, DUAL-BAND,
// GPU/CI/DELTA/CONTINUANCE-AWARE, ADVANTAGE VIEW, ARTERY SNAPSHOT
// ============================================================================
// ROLE (v30‑IMMORTAL‑GPU+‑CI‑DELTA):
//   - Convert any grid into a universal, role-colored, multi-overlay heatmap.
//   - Environment-aware (body/home/town/kitchen/crab/etc).
//   - Presence-aware (presenceAvg, presenceGradient).
//   - Harmonics-aware (phaseDrift, coherenceScore).
//   - Dual-band aware (binary + pulse + presence).
//   - Multi-spin aware (spin divergence weighting).
//   - GPU-aware (utilization, memoryPressure, temperature, warpDivergence).
//   - CI-aware (flakiness, failureRate, persona stability).
//   - Binary-delta-aware (change density, overwrite risk).
//   - Continuance/hosting/schema-aware (fallback bands, chunk/cache/prewarm hints).
//   - Deterministic color mapping (epoch-stable).
//   - Renderer-agnostic output.
//   - Role-aware overlays (nodeAdmin, reproduction, castle, server, expansion).
//   - Shifter-aware: visually distinct, static-like overlays for shifter pulses.
//   - Advantage-aware: exposes advantageView surfaces for higher-level organs.
//   - Artery-aware: surface load/pressure + overlay usage buckets.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝



export const HeatMapMeta = {
    organ: "PulseHeatMap",
    role: "Universal Heatmap Organ — Presence/Harmonics/Multi‑Spin/Dual‑Band/GPU/CI/Delta/Continuance",
    version: "v30-IMMORTAL-GPU+-CI-DELTA",
    epoch: "IMMORTAL",
    guarantees: {
      deterministic: true,
      zeroRandomness: true,
      zeroMutationOfInput: true,
      pureCompute: true,
      windowSafe: true,
      driftProof: true
    },
    overlays: {
      presence: true,
      harmonics: true,
      multiSpin: true,
      dualBand: true,
      gpu: true,
      ci: true,
      delta: true,
      continuance: true,
      shifter: true
    },
    arteryAware: true,
    advantageAware: true
  };


function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function safeNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

// ============================================================================
// ARTERY — HEATMAP LOAD + PRESSURE + OVERLAY USAGE (WINDOW-SAFE)
// ============================================================================

const heatMapArtery = {
  maps: 0,
  lastEnvType: null,
  lastWidth: 0,
  lastHeight: 0,
  lastAdvantageScore: 0,
  lastCellCount: 0,
  presenceOps: 0,
  harmonicsOps: 0,
  gpuOps: 0,
  ciOps: 0,
  deltaOps: 0,
  continuanceOps: 0,
  shifterOps: 0
};

function bumpHeatMapArtery({
  envType,
  width,
  height,
  advantageScore,
  cellCount,
  presenceUsed,
  harmonicsUsed,
  gpuUsed,
  ciUsed,
  deltaUsed,
  continuanceUsed,
  shifterUsed
}) {
  heatMapArtery.maps += 1;
  heatMapArtery.lastEnvType = envType;
  heatMapArtery.lastWidth = width;
  heatMapArtery.lastHeight = height;
  heatMapArtery.lastAdvantageScore = advantageScore;
  heatMapArtery.lastCellCount = cellCount;

  if (presenceUsed) heatMapArtery.presenceOps += 1;
  if (harmonicsUsed) heatMapArtery.harmonicsOps += 1;
  if (gpuUsed) heatMapArtery.gpuOps += 1;
  if (ciUsed) heatMapArtery.ciOps += 1;
  if (deltaUsed) heatMapArtery.deltaOps += 1;
  if (continuanceUsed) heatMapArtery.continuanceOps += 1;
  if (shifterUsed) heatMapArtery.shifterOps += 1;
}

export function snapshotHeatMapArtery() {
  const load = clamp01(heatMapArtery.maps / 16384);
  const pressure = clamp01(heatMapArtery.lastCellCount / 65536);

  const loadBucket =
    load >= 0.9
      ? "saturated"
      : load >= 0.7
      ? "high"
      : load >= 0.4
      ? "medium"
      : load > 0
      ? "low"
      : "idle";

  const pressureBucket =
    pressure >= 0.9
      ? "overload"
      : pressure >= 0.7
      ? "high"
      : pressure >= 0.4
      ? "medium"
      : pressure > 0
      ? "low"
      : "none";

  return Object.freeze({
    ...heatMapArtery,
    load,
    loadBucket,
    pressure,
    pressureBucket
  });
}

// ============================================================================
// CORE ORGAN
// ============================================================================

export function createPulseHeatMap({ trace = false } = {}) {
  // ENVIRONMENT TEMPLATES (v30 — same API, extensible)
  const templates = {
    body: {
      sprite: "silhouette-body",
      mapCoord: (x, y, W, H) => ({ envX: x / W, envY: y / H })
    },
    home: {
      sprite: "silhouette-home",
      mapCoord: (x, y, W, H) => ({ envX: x / W, envY: y / H })
    },
    town: {
      sprite: "silhouette-town",
      mapCoord: (x, y, W, H) => ({ envX: x / W, envY: y / H })
    },
    kitchen: {
      sprite: "silhouette-kitchen",
      mapCoord: (x, y, W, H) => ({ envX: x / W, envY: y / H })
    },
    crab: {
      sprite: "silhouette-crab",
      mapCoord: (x, y, W, H) => ({ envX: x / W, envY: y / H })
    }
  };

  function registerTemplate(name, sprite, mapCoord) {
    templates[name] = { sprite, mapCoord };
  }

  // -------------------------------------------------------------------------
  // CELL + GRADIENT HELPERS
  // -------------------------------------------------------------------------

  function sampleCell(grid, x, y) {
    if (!grid || y < 0 || y >= grid.length) return null;
    if (x < 0 || x >= grid[0].length) return null;
    return grid[y][x];
  }

  function computeLocalGradient(grid, x, y) {
    const c = sampleCell(grid, x, y);
    if (!c) {
      return {
        gradientMagnitude: 0,
        gradientDirection: 0,
        presenceGradient: 0
      };
    }

    const left = sampleCell(grid, x - 1, y) || c;
    const right = sampleCell(grid, x + 1, y) || c;
    const up = sampleCell(grid, x, y - 1) || c;
    const down = sampleCell(grid, x, y + 1) || c;

    const dCenter = c.density ?? 0;
    const dX = (right.density ?? dCenter) - (left.density ?? dCenter);
    const dY = (down.density ?? dCenter) - (up.density ?? dCenter);

    const pCenter = c.presence ?? 0;
    const pX = (right.presence ?? pCenter) - (left.presence ?? pCenter);
    const pY = (down.presence ?? pCenter) - (up.presence ?? pCenter);

    const gradientMagnitude = clamp(Math.sqrt(dX * dX + dY * dY), 0, 2);
    const gradientDirection = Math.atan2(dY, dX);
    const presenceGradient = clamp(Math.sqrt(pX * pX + pY * pY), 0, 2);

    return {
      gradientMagnitude,
      gradientDirection,
      presenceGradient
    };
  }

  // -------------------------------------------------------------------------
  // PULSE SIGNATURE (DUAL-BAND) + EXTENDED BINARY FIELD
  // -------------------------------------------------------------------------

  function computePulseSignature(cell) {
    const density = clamp(cell.density ?? 0, 0, 1);
    const wave = clamp(cell.wave ?? 0, 0, 1);
    const presence = clamp(cell.presence ?? 0, 0, 1);
    const contrast = clamp(cell.contrast ?? 0, 0, 1);

    const binaryBand = clamp(density * 0.6 + contrast * 0.4, 0, 1);
    const pulseBand = clamp(wave * 0.7 + presence * 0.3, 0, 1);
    const dualBandCoherence = clamp(1 - Math.abs(binaryBand - pulseBand), 0, 1);

    const pulseType =
      pulseBand > 0.75
        ? "surge"
        : pulseBand > 0.5
        ? "active"
        : pulseBand > 0.25
        ? "idle"
        : "cold";

    const binaryBucket =
      binaryBand > 0.85
        ? "binary-saturated"
        : binaryBand > 0.6
        ? "binary-high"
        : binaryBand > 0.35
        ? "binary-medium"
        : binaryBand > 0.1
        ? "binary-low"
        : "binary-minimal";

    return {
      binaryBand,
      pulseBand,
      dualBandCoherence,
      pulseType,
      binaryBucket
    };
  }

  // -------------------------------------------------------------------------
  // SHIFTER STATIC (v30 — same semantics, richer fields)
// -------------------------------------------------------------------------

  function computeShifterStatic(cell, gradientMagnitude, harmonicDrift) {
    const isShifter =
      Array.isArray(cell.tags) && cell.tags.includes("shifter");

    if (!isShifter) {
      return {
        isShifter: false,
        shifterStaticIntensity: 0,
        shifterNoiseBand: 0,
        shifterEdgeSharpness: 0,
        shifterPhaseBand: "none"
      };
    }

    const density = clamp(cell.density ?? 0, 0, 1);
    const wave = clamp(cell.wave ?? 0, 0, 1);
    const presence = clamp(cell.presence ?? 0, 0, 1);

    const staticBase =
      0.4 * wave +
      0.3 * gradientMagnitude +
      0.2 * harmonicDrift +
      0.1 * (1 - presence);

    const shifterStaticIntensity = clamp(staticBase, 0, 1);
    const shifterNoiseBand = clamp(wave * 0.8 + density * 0.2, 0, 1);
    const shifterEdgeSharpness = clamp(gradientMagnitude * 0.9, 0, 1);

    const shifterPhaseBand =
      shifterStaticIntensity > 0.8
        ? "shifter-storm"
        : shifterStaticIntensity > 0.6
        ? "shifter-flare"
        : shifterStaticIntensity > 0.4
        ? "shifter-flow"
        : "shifter-weak";

    return {
      isShifter: true,
      shifterStaticIntensity,
      shifterNoiseBand,
      shifterEdgeSharpness,
      shifterPhaseBand
    };
  }

  function shifterOverlayColor(staticIntensity) {
    if (staticIntensity > 0.8) return "rgb(255, 0, 255)";
    if (staticIntensity > 0.6) return "rgb(180, 0, 255)";
    if (staticIntensity > 0.4) return "rgb(0, 255, 255)";
    if (staticIntensity > 0.2) return "rgb(120, 255, 255)";
    return null;
  }

  // -------------------------------------------------------------------------
  // BASE HEAT COLOR (PRESENCE + HARMONICS BIASED)
// -------------------------------------------------------------------------

  function baseHeatColorFromValue(v, presence = 0, coherence = 0) {
    const x = clamp(v, 0, 1);
    const p = clamp(presence, 0, 1);
    const h = clamp(coherence, 0, 1);

    const bias = h * 0.2 - p * 0.1;
    const y = clamp(x + bias, 0, 1);

    if (y > 0.85) return "rgb(255, 0, 0)";
    if (y > 0.7) return "rgb(255, 80, 0)";
    if (y > 0.55) return "rgb(255, 150, 0)";
    if (y > 0.4) return "rgb(255, 220, 0)";
    if (y > 0.25) return "rgb(180, 255, 0)";
    if (y > 0.1) return "rgb(80, 255, 80)";
    return "rgb(0, 180, 255)";
  }

  // -------------------------------------------------------------------------
  // ROLE COLOR (NODEADMIN / REPRODUCTION / CASTLE / SERVER / EXPANSION)
// -------------------------------------------------------------------------

  function roleColorForCell(cell, envType) {
    const tags = cell.tags || [];
    const has = (t) => tags.includes(t);

    if (has("nodeadmin") || has("node-admin")) {
      if (envType === "body") return "rgb(140, 190, 255)";
      if (envType === "home") return "rgb(230, 210, 170)";
      if (envType === "town") return "rgb(255, 255, 255)";
      return "rgb(90, 170, 255)";
    }

    if (has("reproduction-admin")) return "rgb(60, 210, 120)";
    if (has("castle")) return "rgb(255, 150, 40)";
    if (has("server")) return "rgb(255, 230, 80)";
    if (has("expansion")) return "rgb(255, 60, 60)";

    return null;
  }

  // -------------------------------------------------------------------------
  // MULTI-SPIN BOOST (SPIN SNAPSHOTS)
// -------------------------------------------------------------------------

  function spinBoost(spins, x, y) {
    if (!Array.isArray(spins) || spins.length < 2) return 0;

    let total = 0;
    let count = 0;

    for (let i = 1; i < spins.length; i++) {
      const prevRow = spins[i - 1][y] || [];
      const currRow = spins[i][y] || [];
      const prev = prevRow[x] || {};
      const curr = currRow[x] || {};

      const diff =
        Math.abs((curr.density ?? 0) - (prev.density ?? 0)) +
        Math.abs((curr.presence ?? 0) - (prev.presence ?? 0));

      total += diff;
      count++;
    }

    return count ? clamp(total / count, 0, 1) * 0.2 : 0;
  }

  // -------------------------------------------------------------------------
  // GPU OVERLAY (SYMBOLIC HEAT / WARP STRESS)
// -------------------------------------------------------------------------

  function gpuOverlayForCell(gpuStats) {
    if (!gpuStats) {
      return {
        gpuHeat: 0,
        gpuWarpStress: 0,
        gpuState: "gpu-unknown"
      };
    }

    const {
      utilization = 0,
      memoryPressure = 0,
      temperature = 0,
      warpDivergence = 0
    } = gpuStats;

    const heat = clamp01(
      0.5 * utilization + 0.3 * memoryPressure + 0.2 * (temperature / 100)
    );
    const warpStress = clamp01(warpDivergence);

    const gpuState =
      heat > 0.85
        ? "gpu-surge"
        : heat > 0.65
        ? "gpu-hot"
        : heat > 0.35
        ? "gpu-warm"
        : heat > 0.1
        ? "gpu-idle"
        : "gpu-cold";

    return {
      gpuHeat: heat,
      gpuWarpStress: warpStress,
      gpuState
    };
  }

  // -------------------------------------------------------------------------
  // CI OVERLAY (FLAKINESS / PERSONA STABILITY)
// -------------------------------------------------------------------------

  function ciOverlayForCell(ciSurface) {
    if (!ciSurface) {
      return {
        ciInstability: 0,
        ciState: "ci-unknown",
        ciMode: "unknown"
      };
    }

    const {
      flakinessScore = 0,
      failureRate = 0,
      personaStable = true,
      mode: ciMode = "unknown"
    } = ciSurface;

    const instability = clamp01(0.6 * flakinessScore + 0.4 * failureRate);

    const ciState =
      !personaStable
        ? "ci-persona-collapse"
        : instability > 0.7
        ? "ci-unstable"
        : instability > 0.4
        ? "ci-fragile"
        : instability > 0.1
        ? "ci-watch"
        : "ci-stable";

    return {
      ciInstability: instability,
      ciState,
      ciMode
    };
  }

  // -------------------------------------------------------------------------
  // BINARY DELTA OVERLAY (CHANGE DENSITY / OVERWRITE RISK)
// -------------------------------------------------------------------------

  function binaryDeltaOverlayForCell(binaryDeltaPacket) {
    if (!binaryDeltaPacket || !binaryDeltaPacket.delta) {
      return {
        binaryChangeRatio: 0,
        binaryOverwriteRisk: "overwrite-risk-minimal"
      };
    }

    const { addedCount = 0, removedCount = 0, unchangedCount = 0 } =
      binaryDeltaPacket.delta;

    const total = addedCount + removedCount + unchangedCount || 1;
    const changeRatio = (addedCount + removedCount) / total;

    const binaryOverwriteRisk =
      changeRatio > 0.9 && total > 1024
        ? "overwrite-risk-high"
        : changeRatio > 0.6
        ? "overwrite-risk-medium"
        : changeRatio > 0.3
        ? "overwrite-risk-low"
        : "overwrite-risk-minimal";

    return {
      binaryChangeRatio: clamp01(changeRatio),
      binaryOverwriteRisk
    };
  }

  // -------------------------------------------------------------------------
  // CONTINUANCE / HOSTING / SCHEMA OVERLAY (SYMBOLIC)
// -------------------------------------------------------------------------

  function continuanceOverlayForCell({
    continuanceField,
    omniHostingField,
    schemaField
  }) {
    const fallbackBandLevel =
      continuanceField.fallbackBandLevel ??
      omniHostingField.fallbackBandLevel ??
      schemaField.fallbackBandLevel ??
      0;

    const chunkHints =
      continuanceField.chunkHints ??
      omniHostingField.chunkHints ??
      schemaField.chunkHints ??
      null;

    const cacheHints =
      continuanceField.cacheHints ??
      omniHostingField.cacheHints ??
      schemaField.cacheHints ??
      null;

    const prewarmHints =
      continuanceField.prewarmHints ??
      omniHostingField.prewarmHints ??
      schemaField.prewarmHints ??
      null;

    const advantageField =
      continuanceField.advantageField ??
      omniHostingField.advantageField ??
      schemaField.advantageField ??
      null;

    const advantageScore = advantageField.advantageScore ?? 1.0;

    const fallbackBand =
      fallbackBandLevel === 3
        ? "fallback-critical"
        : fallbackBandLevel === 2
        ? "fallback-high"
        : fallbackBandLevel === 1
        ? "fallback-medium"
        : "fallback-normal";

    return {
      fallbackBandLevel,
      fallbackBand,
      chunkHints,
      cacheHints,
      prewarmHints,
      advantageScore
    };
  }

  // -------------------------------------------------------------------------
  // DIAGNOSTICS (PER-CELL ISSUE LIST)
// -------------------------------------------------------------------------

  function diagnoseCell(cell, {
    presenceAvg,
    harmonicDrift,
    coherenceScore,
    envType,
    gradientMagnitude,
    pulseSignature,
    shifterStatic
  }) {
    const issues = [];

    if (coherenceScore < 0.35) {
      issues.push({
        type: "harmonic-instability",
        severity: coherenceScore < 0.2 ? "high" : "medium",
        icon: "⚠️"
      });
    }

    if (harmonicDrift > 0.55) {
      issues.push({
        type: "phase-drift",
        severity: harmonicDrift > 0.75 ? "high" : "medium",
        icon: "⚡"
      });
    }

    if ((cell.presence ?? 0) < presenceAvg * 0.4) {
      issues.push({
        type: "presence-low",
        severity: "low",
        icon: "⬇️"
      });
    }

    if ((cell.presence ?? 0) > presenceAvg * 1.8) {
      issues.push({
        type: "presence-spike",
        severity: "medium",
        icon: "⬆️"
      });
    }

    if ((cell.density ?? 0) < 0.05 && (cell.wave ?? 0) > 0.4) {
      issues.push({
        type: "density-degradation",
        severity: "high",
        icon: "🛑"
      });
    }

    if ((cell.contrast ?? 0) < 0.05 && (cell.density ?? 0) > 0.3) {
      issues.push({
        type: "contrast-collapse",
        severity: "medium",
        icon: "❗"
      });
    }

    if (cell.tags.includes("server") && (cell.density ?? 0) > 0.85) {
      issues.push({
        type: "server-overload",
        severity: "high",
        icon: "🔥"
      });
    }

    if (cell.tags.includes("castle") && coherenceScore < 0.4) {
      issues.push({
        type: "castle-weakening",
        severity: "medium",
        icon: "🏚️"
      });
    }

    if (cell.tags.includes("expansion") && harmonicDrift > 0.6) {
      issues.push({
        type: "expansion-instability",
        severity: "high",
        icon: "💥"
      });
    }

    if (gradientMagnitude > 0.9) {
      issues.push({
        type: "gradient-fracture",
        severity: "high",
        icon: "🪓"
      });
    } else if (gradientMagnitude > 0.6) {
      issues.push({
        type: "gradient-edge",
        severity: "medium",
        icon: "〰️"
      });
    }

    if (pulseSignature.dualBandCoherence < 0.4) {
      issues.push({
        type: "dualband-decoherence",
        severity: "medium",
        icon: "🌀"
      });
    }

    if (shifterStatic.isShifter && shifterStatic.shifterStaticIntensity > 0.4) {
      issues.push({
        type: "shifter-static",
        severity:
          shifterStatic.shifterStaticIntensity > 0.75 ? "high" : "medium",
        icon: "📡"
      });
    }

    return issues;
  }

  // -------------------------------------------------------------------------
  // ADVANTAGE VIEW (GLOBAL HEATMAP SUMMARY)
// -------------------------------------------------------------------------

  function buildAdvantageView({
    presenceAvg,
    harmonicDrift,
    coherenceScore,
    envType,
    width,
    height,
    gpuStats,
    ciSurface,
    binaryDeltaPacket
  }) {
    const area = width * height;

    const presenceWeight =
      presenceAvg * 0.6 +
      clamp(coherenceScore, 0, 1) * 0.3 -
      clamp(harmonicDrift, 0, 1) * 0.2;

    const envBias =
      envType === "body"
        ? 1.0
        : envType === "home"
        ? 0.9
        : envType === "town"
        ? 0.8
        : envType === "kitchen"
        ? 0.85
        : envType === "crab"
        ? 0.75
        : 0.8;

    const gpuHeat =
      gpuStats &&
      clamp01(
        0.5 * (gpuStats.utilization ?? 0) +
          0.3 * (gpuStats.memoryPressure ?? 0) +
          0.2 * ((gpuStats.temperature ?? 0) / 100)
      );

    const ciInstability =
      ciSurface &&
      clamp01(
        0.6 * (ciSurface.flakinessScore ?? 0) +
          0.4 * (ciSurface.failureRate ?? 0)
      );

    let deltaChangeRatio = 0;
    if (binaryDeltaPacket && binaryDeltaPacket.delta) {
      const { addedCount = 0, removedCount = 0, unchangedCount = 0 } =
        binaryDeltaPacket.delta;
      const total = addedCount + removedCount + unchangedCount || 1;
      deltaChangeRatio = clamp01((addedCount + removedCount) / total);
    }

    const overlayPenalty =
      (gpuHeat ?? 0) * 0.15 +
      (ciInstability ?? 0) * 0.15 +
      deltaChangeRatio * 0.1;

    const advantageScore = clamp(
      presenceWeight * envBias - overlayPenalty,
      0,
      1
    );

    return {
      version: "v30-IMMORTAL-GPU+-CI-DELTA-ADVANTAGE",
      envType,
      width,
      height,
      area,
      presenceAvg,
      harmonicDrift,
      coherenceScore,
      envBias,
      gpuHeat: gpuHeat ?? 0,
      ciInstability: ciInstability ?? 0,
      deltaChangeRatio,
      overlayPenalty,
      advantageScore
    };
  }

  // -------------------------------------------------------------------------
  // PER-CELL HEAT + OVERLAYS
  // -------------------------------------------------------------------------

  function buildCellHeat({
    grid,
    spins,
    x,
    y,
    envType,
    presenceAvg,
    harmonicDrift,
    coherenceScore,
    gpuStats,
    ciSurface,
    binaryDeltaPacket,
    continuanceField,
    omniHostingField,
    schemaField
  }) {
    const cell = sampleCell(grid, x, y) || {};

    const { gradientMagnitude, gradientDirection, presenceGradient } =
      computeLocalGradient(grid, x, y);

    const pulseSignature = computePulseSignature(cell);
    const shifterStatic = computeShifterStatic(
      cell,
      gradientMagnitude,
      harmonicDrift
    );

    let value =
      0.4 * (cell.density ?? 0) +
      0.25 * (cell.contrast ?? 0) +
      0.2 * (cell.wave ?? 0) +
      0.15 * (cell.presence ?? 0);

    value += spinBoost(spins, x, y);
    value = clamp(value, 0, 1);

    const baseColor = baseHeatColorFromValue(
      value,
      presenceAvg,
      coherenceScore
    );
    const roleColor = roleColorForCell(cell, envType);
    const shifterColor = shifterOverlayColor(
      shifterStatic.shifterStaticIntensity
    );
    const finalColor = shifterColor || roleColor || baseColor;

    const gpuOverlay = gpuOverlayForCell(gpuStats);
    const ciOverlay = ciOverlayForCell(ciSurface);
    const deltaOverlay = binaryDeltaOverlayForCell(binaryDeltaPacket);
    const contOverlay = continuanceOverlayForCell({
      continuanceField,
      omniHostingField,
      schemaField
    });

    const diagnostics = diagnoseCell(cell, {
      presenceAvg,
      harmonicDrift,
      coherenceScore,
      envType,
      gradientMagnitude,
      pulseSignature,
      shifterStatic
    });

    return {
      x,
      y,
      value,
      baseColor,
      roleColor,
      shifterColor,
      finalColor,

      gradientMagnitude,
      gradientDirection,
      presenceGradient,

      pulseSignature,
      shifterStatic,

      gpuHeat: gpuOverlay.gpuHeat,
      gpuWarpStress: gpuOverlay.gpuWarpStress,
      gpuState: gpuOverlay.gpuState,

      ciInstability: ciOverlay.ciInstability,
      ciState: ciOverlay.ciState,
      ciMode: ciOverlay.ciMode,

      binaryChangeRatio: deltaOverlay.binaryChangeRatio,
      binaryOverwriteRisk: deltaOverlay.binaryOverwriteRisk,

      fallbackBand: contOverlay.fallbackBand,
      fallbackBandLevel: contOverlay.fallbackBandLevel,
      chunkHints: contOverlay.chunkHints,
      cacheHints: contOverlay.cacheHints,
      prewarmHints: contOverlay.prewarmHints,
      advantageScoreLocal: contOverlay.advantageScore,

      diagnostics
    };
  }

  // -------------------------------------------------------------------------
  // BUILD HEATMAP (MAIN ORGAN FUNCTION, v30)
// -------------------------------------------------------------------------

  function buildHeatMap({
    grid,
    spins = [],
    envType = "body",
    presenceAvg = 0,
    harmonicDrift = 0,
    coherenceScore = 0,
    gpuStats = null,
    ciSurface = null,
    binaryDeltaPacket = null,
    continuanceField = null,
    omniHostingField = null,
    schemaField = null
  }) {
    if (!Array.isArray(grid) || grid.length === 0) {
      const advantageView = buildAdvantageView({
        presenceAvg,
        harmonicDrift,
        coherenceScore,
        envType,
        width: 0,
        height: 0,
        gpuStats,
        ciSurface,
        binaryDeltaPacket
      });

      bumpHeatMapArtery({
        envType,
        width: 0,
        height: 0,
        advantageScore: advantageView.advantageScore,
        cellCount: 0,
        presenceUsed: !!presenceAvg,
        harmonicsUsed: !!(harmonicDrift || coherenceScore),
        gpuUsed: !!gpuStats,
        ciUsed: !!ciSurface,
        deltaUsed: !!binaryDeltaPacket,
        continuanceUsed:
          !!continuanceField || !!omniHostingField || !!schemaField,
        shifterUsed: false
      });

      return {
        meta: {
          organ: "PulseHeatMap",
          role: "Universal Heatmap Organ — Presence/Harmonics/Multi‑Spin/Dual‑Band/GPU/CI/Delta/Continuance",
          version: "v30-IMMORTAL-GPU+-CI-DELTA",
          epoch: "IMMORTAL",
          guarantees: {
            deterministic: true,
            zeroRandomness: true,
            zeroMutationOfInput: true,
            pureCompute: true,
            windowSafe: true,
            driftProof: true
          },
          overlays: {
            presence: true,
            harmonics: true,
            multiSpin: true,
            dualBand: true,
            gpu: true,
            ci: true,
            delta: true,
            continuance: true,
            shifter: true
          },
          arteryAware: true,
          advantageAware: true
        },
        envType,
        width: 0,
        height: 0,
        sprite: null,
        cells: [],
        advantageView,
        artery: snapshotHeatMapArtery()
      };
    }

    const height = grid.length;
    const width = grid[0].length;
    const tmpl = templates[envType] || templates.body;

    const cells = [];
    let anyShifter = false;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const cellHeat = buildCellHeat({
          grid,
          spins,
          x,
          y,
          envType,
          presenceAvg,
          harmonicDrift,
          coherenceScore,
          gpuStats,
          ciSurface,
          binaryDeltaPacket,
          continuanceField,
          omniHostingField,
          schemaField
        });

        const envCoord = tmpl.mapCoord(x, y, width - 1, height - 1);

        anyShifter = anyShifter || cellHeat.shifterStatic.isShifter;

        cells.push({
          x: cellHeat.x,
          y: cellHeat.y,
          envX: envCoord.envX,
          envY: envCoord.envY,
          sprite: tmpl.sprite,

          value: cellHeat.value,
          color: cellHeat.finalColor,
          heatColor: cellHeat.baseColor,
          roleColor: cellHeat.roleColor,
          shifterOverlayColor: cellHeat.shifterColor,

          diagnostics: cellHeat.diagnostics,
          warningIcon: cellHeat.diagnostics[0].icon ?? null,
          severity: cellHeat.diagnostics[0].severity ?? "none",

          binaryBand: cellHeat.pulseSignature.binaryBand,
          pulseBand: cellHeat.pulseSignature.pulseBand,
          dualBandCoherence: cellHeat.pulseSignature.dualBandCoherence,
          pulseType: cellHeat.pulseSignature.pulseType,
          binaryBucket: cellHeat.pulseSignature.binaryBucket,

          gradientMagnitude: cellHeat.gradientMagnitude,
          gradientDirection: cellHeat.gradientDirection,
          presenceGradient: cellHeat.presenceGradient,

          isShifter: cellHeat.shifterStatic.isShifter,
          shifterStaticIntensity: cellHeat.shifterStatic.shifterStaticIntensity,
          shifterNoiseBand: cellHeat.shifterStatic.shifterNoiseBand,
          shifterEdgeSharpness: cellHeat.shifterStatic.shifterEdgeSharpness,
          shifterPhaseBand: cellHeat.shifterStatic.shifterPhaseBand,

          gpuHeat: cellHeat.gpuHeat,
          gpuWarpStress: cellHeat.gpuWarpStress,
          gpuState: cellHeat.gpuState,

          ciInstability: cellHeat.ciInstability,
          ciState: cellHeat.ciState,
          ciMode: cellHeat.ciMode,

          binaryChangeRatio: cellHeat.binaryChangeRatio,
          binaryOverwriteRisk: cellHeat.binaryOverwriteRisk,

          fallbackBand: cellHeat.fallbackBand,
          fallbackBandLevel: cellHeat.fallbackBandLevel,
          chunkHints: cellHeat.chunkHints,
          cacheHints: cellHeat.cacheHints,
          prewarmHints: cellHeat.prewarmHints,
          advantageScoreLocal: cellHeat.advantageScoreLocal
        });
      }
    }

    const advantageView = buildAdvantageView({
      presenceAvg,
      harmonicDrift,
      coherenceScore,
      envType,
      width,
      height,
      gpuStats,
      ciSurface,
      binaryDeltaPacket
    });

    bumpHeatMapArtery({
      envType,
      width,
      height,
      advantageScore: advantageView.advantageScore,
      cellCount: cells.length,
      presenceUsed: !!presenceAvg,
      harmonicsUsed: !!(harmonicDrift || coherenceScore),
      gpuUsed: !!gpuStats,
      ciUsed: !!ciSurface,
      deltaUsed: !!binaryDeltaPacket,
      continuanceUsed:
        !!continuanceField || !!omniHostingField || !!schemaField,
      shifterUsed: anyShifter
    });

    if (trace) {
      console.log("[PulseHeatMap-v30] built heatmap", {
        envType,
        width,
        height,
        advantageScore: advantageView.advantageScore,
        cells: cells.length
      });
    }

    return {
      meta: {
        organ: "PulseHeatMap",
        role: "Universal Heatmap Organ — Presence/Harmonics/Multi‑Spin/Dual‑Band/GPU/CI/Delta/Continuance",
        version: "v30-IMMORTAL-GPU+-CI-DELTA",
        epoch: "IMMORTAL",
        guarantees: {
          deterministic: true,
          zeroRandomness: true,
          zeroMutationOfInput: true,
          pureCompute: true,
          windowSafe: true,
          driftProof: true
        },
        overlays: {
          presence: true,
          harmonics: true,
          multiSpin: true,
          dualBand: true,
          gpu: true,
          ci: true,
          delta: true,
          continuance: true,
          shifter: true
        },
        arteryAware: true,
        advantageAware: true
      },

      envType,
      sprite: tmpl.sprite,
      width,
      height,
      cells,
      advantageView,
      artery: snapshotHeatMapArtery()
    };
  }

  function compute(grid, context = {}) {
    const { harmonicDrift = 0 } = context;

    const H = grid.length;
    const W = grid[0].length;

    const out = [];

    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const cell = grid[y][x];

        const grad = computeLocalGradient(grid, x, y);
        const sig = computePulseSignature(cell);
        const shifter = computeShifterStatic(cell, grad.gradientMagnitude, harmonicDrift);

        out.push({
          x, y,
          ...grad,
          ...sig,
          ...shifter
        });
      }
    }

    return Object.freeze({
      meta: {
        organ: "PulseHeatMap",
        role: "Universal Heatmap Organ — Presence/Harmonics/Multi‑Spin/Dual‑Band/GPU/CI/Delta/Continuance",
        version: "v30-IMMORTAL-GPU+-CI-DELTA",
        epoch: "IMMORTAL",
        guarantees: {
          deterministic: true,
          zeroRandomness: true,
          zeroMutationOfInput: true,
          pureCompute: true,
          windowSafe: true,
          driftProof: true
        },
        overlays: {
          presence: true,
          harmonics: true,
          multiSpin: true,
          dualBand: true,
          gpu: true,
          ci: true,
          delta: true,
          continuance: true,
          shifter: true
        },
        arteryAware: true,
        advantageAware: true
      },
      width: W,
      height: H,
      cells: out
    });
  }


  // -------------------------------------------------------------------------
  // PUBLIC ORGAN EXPORT
  // -------------------------------------------------------------------------

  return Object.freeze({
    meta: HeatMapMeta,
    registerTemplate,
    buildHeatMap,
    compute,
    snapshotArtery: snapshotHeatMapArtery
  });
}

export default {
  meta: HeatMapMeta,
  createPulseHeatMap,
  snapshotHeatMapArtery
};

export const PulseToolsHeatMap = Object.freeze({
  // canonical organ factory
  create(config = {}) {
    return createPulseHeatMap(config);
  },

  // STATIC COMPUTE FUNCTION (IMMORTAL)
  compute(grid, context = {}) {
    const instance = createPulseHeatMap({});
    return instance.compute(grid, context);
  },

  // artery snapshot (standard PulseOS organ pattern)
  snapshotArtery() {
    return snapshotHeatMapArtery();
  }
});

PulseRealm.ToolsHeatMap = {
  PulseToolsHeatMap,
  createPulseHeatMap,
  snapshotHeatMapArtery,
  HeatMapMeta,
  heatMapArtery
}