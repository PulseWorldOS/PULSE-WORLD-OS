// ============================================================================
//  PulseSendImpulse-v30-IMMORTAL-INTEL-UNIBAND.js
//  Nerve‑Spark • Pulse‑Agnostic Trigger Organ • Unified Band Impulse
//  v30 IMMORTAL-INTEL-UNIBAND:
//    - Unified band (symbolic + binary) with explicit bandMode
//    - Binary-aware + CacheChunk v30 + Prewarm v30 + Presence v30
//    - Degradation v30 + Advantage v30 + DualBand + ImmortalMeta v30
//    - ImpulseSpeed / ImpulseBurst / ImpulsePriority surfaces
//    - DualHash + INTEL hash on all major surfaces
//    - ImpulseIntelligence v30 IMMORTAL-INTEL-UNIBAND
//    - Pure, deterministic, zero IO, zero randomness, zero time
// ============================================================================
//
//  SAFETY CONTRACT (v30-IMMORTAL-INTEL-UNIBAND):
//  ---------------------------------------------
//  • No network.
//  • No async.
//  • No randomness.
//  • No timestamps.
//  • No mutation outside instance.
//  • Deterministic, drift-proof surfaces.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});





// ============================================================================
//  INTERNAL HELPERS — deterministic, tiny, pure
// ============================================================================

function stableStringify(v) {
  if (v === null || typeof v !== "object") return JSON.stringify(v);
  if (Array.isArray(v)) return "[" + v.map(stableStringify).join(",") + "]";
  const keys = Object.keys(v).sort();
  return (
    "{" +
    keys.map(k => JSON.stringify(k) + ":" + stableStringify(v[k])).join(",") +
    "}"
  );
}

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 7)) % 524288; // 19-bit, v30
  }
  return `h30_${h}`;
}

function computeHashAlt(str) {
  let h = 1;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h * 257 + s.charCodeAt(i) * (i + 23)) % 1048573; // 20-bit, v30
  }
  return `h30b_${h}`;
}

function computeDualHash(value) {
  const s = typeof value === "string" ? value : stableStringify(value);
  return {
    primary: computeHash(s),
    secondary: computeHashAlt(s)
  };
}

// INTEL hash — structure-aware, no IO, no time.
function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 11)) % 1000000007;
  }
  return `HINTEL30_${h}`;
}

function buildDualHashSignature(label, intelPayload, classicString) {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intelHash = computeHashIntelligence(intelBase);
  const classicHash = computeHash(`${label}::${classicString || ""}`);
  return {
    intel: intelHash,
    classic: classicHash
  };
}

function clamp01(v) {
  return Math.max(0, Math.min(1, Number.isFinite(v) ? v : 0));
}

function normalizeBand(band) {
  const x = String(band || "symbolic").toLowerCase();
  return x === "binary" ? "binary" : "symbolic";
}


// ============================================================================
//  BINARY SURFACE EXTRACTION (unified band)
// ============================================================================

function extractBinarySurfaceFromPulse(pulse) {
  const payload = pulse.payload || {};

  const binaryPattern  = payload.binaryPattern || null;
  const binaryMode     = payload.binaryMode || null;
  const binaryPayload  = payload.binaryPayload || null;
  const binaryHints    = payload.binaryHints || null;
  const binaryStrength = typeof payload.binaryStrength === "number"
    ? payload.binaryStrength
    : null;

  const hasBinary =
    !!binaryPattern ||
    !!binaryMode ||
    !!binaryPayload ||
    !!binaryHints ||
    binaryStrength !== null;

  const routerHint = payload.routerHint ?? (binaryHints && binaryHints.routerHint) ?? null;
  const meshHint   = payload.meshHint   ?? (binaryHints && binaryHints.meshHint)   ?? null;
  const organHint  = payload.organHint  ?? (binaryHints && binaryHints.organHint)  ?? null;

  return {
    hasBinary,
    binaryPattern,
    binaryMode,
    binaryPayload,
    binaryHints,
    binaryStrength,
    routerHint,
    meshHint,
    organHint
  };
}

function classifyDegradationTier(healthScore) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;
  if (h >= 0.97) return "microDegrade";
  if (h >= 0.88) return "softDegrade";
  if (h >= 0.55) return "midDegrade";
  if (h >= 0.18) return "hardDegrade";
  return "criticalDegrade";
}

function extractImmortalMetaFromPulse(pulse) {
  const meta = pulse.immortalMeta || {};
  return {
    presenceBandState: meta.presenceBandState ?? null,
    harmonicDrift: meta.harmonicDrift ?? null,
    coherenceScore: meta.coherenceScore ?? null,
    dualBandMode: meta.dualBandMode ?? null,
    shifterBand: meta.shifterBand ?? null
  };
}


// ============================================================================
//  v30 cacheChunk / prewarm / presence surfaces (unified band)
// ============================================================================

function buildCacheChunkSurface({ pulse, targetOrgan, pathway, mode }) {
  const shape = {
    pattern: pulse.pattern || "",
    lineageDepth: Array.isArray(pulse.lineage) ? pulse.lineage.length : 0,
    targetOrgan,
    pathway,
    mode,
    bandMode: normalizeBand(pulse.bandMode || pulse.band)
  };
  const raw = stableStringify(shape);
  const cacheChunkKey = "impulse30-cache::" + computeHash(raw);
  const dual = computeDualHash(cacheChunkKey);

  return {
    cacheChunkKey,
    cacheChunkSignature: dual.primary,
    cacheChunkSignatureDual: dual,
    cacheChunkShape: shape
  };
}

function buildPrewarmSurface({ pulse, targetOrgan }) {
  const priority = pulse.priority || "normal";
  let level = "none";

  if (priority === "critical" || priority === "high") level = "aggressive";
  else if (priority === "normal") level = "medium";
  else if (priority === "low") level = "light";

  const raw = stableStringify({ priority, targetOrgan });
  const prewarmKey = "impulse30-prewarm::" + computeHash(raw);
  const dual = computeDualHash(prewarmKey);

  return {
    level,
    prewarmKey,
    prewarmSignature: dual.primary,
    prewarmSignatureDual: dual
  };
}

function buildPresenceSurface({ pulse, targetOrgan }) {
  const pattern = pulse.pattern || "";
  let scope = "local";

  if (pattern.includes("/global")) scope = "global";
  else if (pattern.includes("/page")) scope = "page";

  const raw = stableStringify({ pattern, targetOrgan, scope });
  const presenceKey = "impulse30-presence::" + computeHash(raw);
  const dual = computeDualHash(presenceKey);

  return {
    scope,
    presenceKey,
    presenceSignature: dual.primary,
    presenceSignatureDual: dual
  };
}

function buildDegradationSurface({ pulse }) {
  const healthScore = typeof pulse.healthScore === "number"
    ? pulse.healthScore
    : 1.0;

  const degradationTier = classifyDegradationTier(healthScore);
  const shape = { healthScore, degradationTier };
  const dual = computeDualHash(shape);

  return {
    healthScore,
    degradationTier,
    degradationHash: dual.primary,
    degradationHashDual: dual
  };
}

function buildImmortalSurface({ pulse }) {
  const immortalMeta = extractImmortalMetaFromPulse(pulse);
  const raw = stableStringify(immortalMeta);
  const dual = computeDualHash("impulse30-immortal::" + raw);

  return {
    immortalMeta,
    immortalSignature: dual.primary,
    immortalSignatureDual: dual
  };
}


// ============================================================================
//  ADVANTAGE + DUAL-BAND SURFACE (v30 unified band)
// ============================================================================

function buildAdvantageSurface({ pulse }) {
  const advantageField = pulse.advantageField || {};
  const band = normalizeBand(pulse.band || pulse.bandMode || "symbolic");

  const advantageScore = Number(advantageField.advantageScore || 0);
  const advantageTier  = Number(advantageField.advantageTier  || 0);

  const shape = {
    advantageScore,
    advantageTier,
    band
  };

  const dual = computeDualHash(shape);

  return {
    advantageScore,
    advantageTier,
    band,
    advantageSignature: dual.primary,
    advantageSignatureDual: dual
  };
}


// ============================================================================
//  IMPULSE SPEED / BURST SURFACES (v30)
// ============================================================================

function buildImpulseSpeedSurface({ pulse, advantageSurface, degradationSurface }) {
  const priority = pulse.priority || "normal";
  const advantageTier = advantageSurface.advantageTier || 0;
  const degradationTier = degradationSurface.degradationTier || "midDegrade";

  let baseSpeed =
    priority === "critical" ? 1.0 :
    priority === "high"     ? 0.85 :
    priority === "normal"   ? 0.6 :
    priority === "low"      ? 0.4 :
    0.3;

  if (advantageTier >= 2) baseSpeed += 0.15;
  else if (advantageTier === 1) baseSpeed += 0.05;

  if (degradationTier === "criticalDegrade") baseSpeed *= 0.4;
  else if (degradationTier === "hardDegrade") baseSpeed *= 0.6;
  else if (degradationTier === "midDegrade") baseSpeed *= 0.8;

  const clampedSpeed = Math.max(0.1, Math.min(1.2, baseSpeed));

  const shape = {
    priority,
    advantageTier,
    degradationTier,
    impulseSpeed: clampedSpeed
  };

  const dual = computeDualHash(shape);

  return {
    impulseSpeed: clampedSpeed,
    impulseSpeedSignature: dual.primary,
    impulseSpeedSignatureDual: dual
  };
}

function buildImpulseBurstSurface({ pulse, binarySurface }) {
  const hasBinary = binarySurface.hasBinary ? 1 : 0;
  const binaryStrength = typeof binarySurface.binaryStrength === "number"
    ? clamp01(binarySurface.binaryStrength)
    : 0;

  const pattern = pulse.pattern || "";
  const isGlobal = pattern.includes("/global");
  const isPage   = pattern.includes("/page");

  let burstMode = "burst-none";

  if (hasBinary && binaryStrength >= 0.8 && isGlobal) {
    burstMode = "burst-max";
  } else if (hasBinary && binaryStrength >= 0.5 && (isGlobal || isPage)) {
    burstMode = "burst-strong";
  } else if (hasBinary && binaryStrength > 0) {
    burstMode = "burst-light";
  }

  const shape = {
    hasBinary: !!hasBinary,
    binaryStrength,
    isGlobal,
    isPage,
    burstMode
  };

  const dual = computeDualHash(shape);

  return {
    burstMode,
    burstSignature: dual.primary,
    burstSignatureDual: dual
  };
}


// ============================================================================
//  IMPULSE DIAGNOSTICS (symbolic + binary + v30 surfaces)
// ============================================================================

function buildImpulseDiagnostics({ pulse, targetOrgan, pathway, mode }) {
  const pattern = pulse.pattern || "NO_PATTERN";
  const lineageDepth = Array.isArray(pulse.lineage) ? pulse.lineage.length : 0;
  const pulseType = pulse.pulseType || pulse.PulseRole.identity || "UNKNOWN_PULSE_TYPE";

  const binarySurface = extractBinarySurfaceFromPulse(pulse);
  const immortalSurface = buildImmortalSurface({ pulse });
  const degradationSurface = buildDegradationSurface({ pulse });
  const advantageSurface = buildAdvantageSurface({ pulse });

  const patternDual   = computeDualHash(pattern);
  const lineageDual   = computeDualHash(String(lineageDepth));
  const pulseTypeDual = computeDualHash(pulseType);
  const organDual     = computeDualHash(String(targetOrgan || "NO_ORGAN"));
  const pathwayDual   = computeDualHash(pathway || {});
  const modeDual      = computeDualHash(mode || "normal");

  const binaryPatternDual = binarySurface.binaryPattern
    ? computeDualHash(binarySurface.binaryPattern)
    : null;
  const binaryModeDual = binarySurface.binaryMode
    ? computeDualHash(binarySurface.binaryMode)
    : null;

  return {
    pattern,
    lineageDepth,
    pulseType,
    targetOrgan: targetOrgan || "NO_ORGAN",
    pathway: pathway || "NO_PATHWAY",
    mode,

    binary: binarySurface,
    immortal: immortalSurface,
    degradation: degradationSurface,
    advantage: advantageSurface,

    patternHash: patternDual.primary,
    patternHashDual: patternDual,
    lineageHash: lineageDual.primary,
    lineageHashDual: lineageDual,
    pulseTypeHash: pulseTypeDual.primary,
    pulseTypeHashDual: pulseTypeDual,
    organHash: organDual.primary,
    organHashDual: organDual,
    pathwayHash: pathwayDual.primary,
    pathwayHashDual: pathwayDual,
    modeHash: modeDual.primary,
    modeHashDual: modeDual,

    binaryPatternHash: binaryPatternDual ? binaryPatternDual.primary : null,
    binaryPatternHashDual: binaryPatternDual,
    binaryModeHash: binaryModeDual ? binaryModeDual.primary : null,
    binaryModeHashDual: binaryModeDual
  };
}


// ============================================================================
//  IMPULSE INTELLIGENCE (v30 IMMORTAL-INTEL-UNIBAND)
// ============================================================================

function computeImpulseIntelligence({
  diagnostics,
  cacheChunkSurface,
  prewarmSurface,
  presenceSurface,
  degradationSurface,
  immortalSurface,
  advantageSurface,
  impulseSpeedSurface,
  impulseBurstSurface
}) {
  const patternLen = (diagnostics.pattern || "").length;
  const lineageDepth = diagnostics.lineageDepth || 0;
  const hasBinary = diagnostics.binary.hasBinary ? 1 : 0;

  const presenceScope = presenceSurface.scope || "local";
  const presenceWeight =
    presenceScope === "global" ? 1.0 :
    presenceScope === "page"   ? 0.7 :
    presenceScope === "local"  ? 0.4 :
    0.2;

  const prewarmLevel = prewarmSurface.level || "none";
  const prewarmWeight =
    prewarmLevel === "aggressive" ? 1.0 :
    prewarmLevel === "medium"     ? 0.7 :
    prewarmLevel === "light"      ? 0.4 :
    0.1;

  const cacheWeight = cacheChunkSurface.cacheChunkKey ? 0.6 : 0.2;

  const healthScore = degradationSurface.healthScore ?? 1.0;
  const healthWeight =
    healthScore >= 0.97 ? 1.0 :
    healthScore >= 0.88 ? 0.8 :
    healthScore >= 0.55 ? 0.5 :
    healthScore >= 0.18 ? 0.3 :
    0.1;

  const coherenceScore = immortalSurface.immortalMeta.coherenceScore ?? 1.0;
  const coherenceWeight =
    coherenceScore >= 0.9 ? 1.0 :
    coherenceScore >= 0.7 ? 0.7 :
    coherenceScore >= 0.4 ? 0.4 :
    0.2;

  const advantageScore = advantageSurface.advantageScore || 0;
  const advantageTier  = advantageSurface.advantageTier  || 0;
  const bandIsBinary   = advantageSurface.band === "binary" ? 1 : 0;

  const impulseSpeed = impulseSpeedSurface.impulseSpeed || 0.6;
  const burstMode = impulseBurstSurface.burstMode || "burst-none";
  const burstWeight =
    burstMode === "burst-max"     ? 1.0 :
    burstMode === "burst-strong"  ? 0.7 :
    burstMode === "burst-light"   ? 0.4 :
    0.1;

  const structuralScore =
    patternLen * 0.0005 +
    lineageDepth * 0.001 +
    hasBinary * 0.1;

  const solvednessScore = clamp01(
    structuralScore * 0.25 +
    presenceWeight * 0.15 +
    prewarmWeight * 0.15 +
    cacheWeight * 0.1 +
    healthWeight * 0.1 +
    coherenceWeight * 0.1 +
    advantageScore * 0.1 +
    impulseSpeed * 0.05 +
    burstWeight * 0.05
  );

  const computeTier =
    solvednessScore >= 0.9 ? "nearSolution" :
    solvednessScore >= 0.7 ? "highValue"    :
    solvednessScore >= 0.4 ? "normal"       :
    solvednessScore >= 0.2 ? "lowPriority"  :
    "avoidCompute";

  const readinessScore = clamp01(
    solvednessScore * 0.6 +
    bandIsBinary * 0.1 +
    (advantageTier >= 2 ? 0.2 : advantageTier === 1 ? 0.1 : 0)
  );

  const intelShape = {
    layer: "PulseSendImpulse",
    version: "v30-IMMORTAL-INTEL-UNIBAND",
    solvednessScore,
    computeTier,
    readinessScore,
    presenceScope,
    prewarmLevel,
    hasBinary: !!hasBinary,
    patternLen,
    lineageDepth,
    healthScore,
    coherenceScore,
    advantageScore,
    advantageTier,
    band: advantageSurface.band,
    impulseSpeed,
    burstMode
  };

  const dual = computeDualHash(intelShape);
  const intelSig = buildDualHashSignature(
    "PULSE_SEND_IMPULSE_INTELLIGENCE_V30",
    intelShape,
    `IMPULSE_INTEL::SOLV:${solvednessScore.toFixed(4)}::TIER:${computeTier}`
  );

  return {
    ...intelShape,
    impulseIntelligenceSignature: dual.primary,
    impulseIntelligenceSignatureDual: dual,
    impulseIntelligenceIntelSignature: intelSig.intel,
    impulseIntelligenceClassicSignature: intelSig.classic
  };
}


// ============================================================================
//  FACTORY — Create the Impulse Organ (v30-IMMORTAL-INTEL-UNIBAND)
// ============================================================================

export function createPulseSendImpulse({ mover, log }) {
  return {

    fire({ pulse, targetOrgan, pathway, mode = "normal" }) {
      const diagnostics = buildImpulseDiagnostics({
        pulse,
        targetOrgan,
        pathway,
        mode
      });

      const cacheChunkSurface = buildCacheChunkSurface({
        pulse,
        targetOrgan,
        pathway,
        mode
      });

      const prewarmSurface = buildPrewarmSurface({
        pulse,
        targetOrgan
      });

      const presenceSurface = buildPresenceSurface({
        pulse,
        targetOrgan
      });

      const degradationSurface = diagnostics.degradation;
      const immortalSurface = diagnostics.immortal;
      const advantageSurface = diagnostics.advantage;

      const impulseSpeedSurface = buildImpulseSpeedSurface({
        pulse,
        advantageSurface,
        degradationSurface
      });

      const impulseBurstSurface = buildImpulseBurstSurface({
        pulse,
        binarySurface: diagnostics.binary
      });

      const impulseIntelligence = computeImpulseIntelligence({
        diagnostics,
        cacheChunkSurface,
        prewarmSurface,
        presenceSurface,
        degradationSurface,
        immortalSurface,
        advantageSurface,
        impulseSpeedSurface,
        impulseBurstSurface
      });

      const impulseShape = {
        pulse,
        targetOrgan,
        pathway,
        mode,
        impulseSpeed: impulseSpeedSurface.impulseSpeed,
        burstMode: impulseBurstSurface.burstMode
      };
      const impulseDual = computeDualHash(impulseShape);
      const impulseSignature = impulseDual.primary;

      log && log("[PulseSendImpulse-v30-IMMORTAL-INTEL-UNIBAND] Spark fired", {
        jobId: pulse.jobId,
        diagnostics,
        cacheChunkSurface,
        prewarmSurface,
        presenceSurface,
        degradationSurface,
        immortalSurface,
        advantageSurface,
        impulseSpeedSurface,
        impulseBurstSurface,
        impulseIntelligence,
        impulseSignature
      });

      const movement = mover.move({
        pulse,
        targetOrgan,
        pathway,
        mode
      });

      return {
        impulseSignature,
        impulseSignatureDual: impulseDual,
        diagnostics,
        cacheChunkSurface,
        prewarmSurface,
        presenceSurface,
        degradationSurface,
        immortalSurface,
        advantageSurface,
        impulseSpeedSurface,
        impulseBurstSurface,
        impulseIntelligence,
        movement
      };
    }
  };
}


// ============================================================================
//  ORGAN EXPORT — PulseSendImpulse (v30-IMMORTAL-INTEL-UNIBAND)
// ============================================================================

export const PulseSendImpulse = {

  fire({ pulse, targetOrgan, pathway, mode }) {
    const pulseType = pulse.pulseType || pulse.PulseRole.identity || "UNKNOWN_PULSE_TYPE";
    const pattern = pulse.pattern || "NO_PATTERN";
    const lineageDepth = Array.isArray(pulse.lineage) ? pulse.lineage.length : 0;

    throw new Error(
      `[PulseSendImpulse-v30-IMMORTAL-INTEL-UNIBAND] fire() called before initialization.\n` +
      `• pulseType: ${pulseType}\n` +
      `• pattern: ${pattern}\n` +
      `• lineageDepth: ${lineageDepth}\n` +
      `• targetOrgan: ${targetOrgan || "NO_ORGAN"}\n` +
      `• pathway: ${pathway || "NO_PATHWAY"}\n` +
      `• mode: ${mode || "NO_MODE"}\n` +
      `Use createPulseSendImpulse(...) to wire dependencies.`
    );
  }
};

PulseRealm.SendImpulse = {
  PulseSendImpulse,
  createPulseSendImpulse
}