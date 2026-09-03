// ============================================================================
//  PulseSendEngine-v30-IMMORTAL-INTEL-UNIFIED.js
//  Transport Engine Organ • Pulse‑Agnostic • Deterministic Movement Muscle
//  v30 IMMORTAL-INTEL-UNIFIED:
//    - Unified band: symbolic + binary-first, dual-band aware
//    - Binary surfaces v30: signature / cacheChunk / prewarm / presence
//    - CacheChunk v30 + Prewarm v30 + Presence v30 (pulse-level + binary-level)
//    - Degradation v30 + ImmortalMeta v30 + MeshFactoring echo
//    - DualHash (primary/secondary) on all major surfaces
//    - MovementIntelligence v30 IMMORTAL-INTEL-UNIFIED
//    - Pure, deterministic, zero IO, zero randomness, zero time
// ============================================================================
//
//  SAFETY CONTRACT (v30-IMMORTAL-INTEL-UNIFIED):
//  ---------------------------------------------
//  • No randomness.
//  • No timestamps.
//  • No external IO.
//  • Pure deterministic movement.
//  • Zero mutation outside instance.

// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
//  INTERNAL HELPERS — deterministic, pure
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
    h = (h * 131 + s.charCodeAt(i) * (i + 19)) % 1048573; // 20-bit, v30
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

function clamp01(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  if (n < 0) return 0;
  if (n > 1) return 1;
  return n;
}

function normalizeBand(band) {
  const x = String(band || "symbolic").toLowerCase();
  return x === "binary" ? "binary" : "symbolic";
}


// ============================================================================
//  BINARY SURFACE EXTRACTION (unified band, binary-first)
// ============================================================================

function extractBinarySurface(pulse) {
  const p = pulse.payload || {};
  const binaryPattern  = p.binaryPattern || null;
  const binaryMode     = p.binaryMode || null;
  const binaryPayload  = p.binaryPayload || null;
  const binaryHints    = p.binaryHints || null;
  const binaryStrength = typeof p.binaryStrength === "number" ? p.binaryStrength : null;

  const hasBinary =
    !!binaryPattern ||
    !!binaryMode ||
    !!binaryPayload ||
    !!binaryHints ||
    binaryStrength !== null;

  const routerHint = p.routerHint ?? (binaryHints && binaryHints.routerHint) ?? null;
  const meshHint   = p.meshHint   ?? (binaryHints && binaryHints.meshHint)   ?? null;
  const organHint  = p.organHint  ?? (binaryHints && binaryHints.organHint)  ?? null;

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


// ============================================================================
//  DEGRADATION + IMMORTAL META v30
// ============================================================================

function classifyDegradationTier(healthScore) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;
  if (h >= 0.975) return "microDegrade";
  if (h >= 0.90)  return "softDegrade";
  if (h >= 0.60)  return "midDegrade";
  if (h >= 0.20)  return "hardDegrade";
  return "criticalDegrade";
}

function extractImmortalMeta(pulse) {
  const meta = pulse.immortalMeta || {};
  return {
    presenceBandState: meta.presenceBandState ?? null,
    harmonicDrift: meta.harmonicDrift ?? null,
    coherenceScore: meta.coherenceScore ?? null,
    dualBandMode: meta.dualBandMode ?? null,
    shifterBand: meta.shifterBand ?? null,
    meshFactoringProfile: meta.meshFactoringProfile ?? null
  };
}


// ============================================================================
//  v30 BINARY SURFACES (signature / cacheChunk / prewarm / presence)
//  (shared with BinarySend / MeshBinary / Adapter v30)
// ============================================================================

function computeBinarySignature(bits) {
  let h = 0;
  for (let i = 0; i < bits.length; i++) {
    h = (h + bits[i] * (i + 13)) % 131072; // 17-bit deterministic
  }
  return `b30_${h}`;
}

function computeBinaryCacheChunk(bits) {
  let acc = 1;
  for (let i = 0; i < bits.length; i++) {
    acc = (acc * 31 + bits[i]) % 8191; // 13-bit
  }
  return `cc30_${acc}`;
}

function computeBinaryPrewarm(bits) {
  const len = bits.length;
  if (len >= 4096) return "prewarm-ultra-max";
  if (len >= 2048) return "prewarm-ultra";
  if (len >= 512)  return "prewarm-aggressive";
  if (len >= 128)  return "prewarm-medium";
  if (len >= 32)   return "prewarm-light";
  return "prewarm-none";
}

function computeBinaryPresence(bits) {
  const len = bits.length;
  if (len >= 8192) return "presence-global-max";
  if (len >= 2048) return "presence-global";
  if (len >= 512)  return "presence-page";
  return "presence-local";
}


// ============================================================================
//  cacheChunk / prewarm / presence surfaces (pulse-level, v30 dual-hash)
// ============================================================================

function buildCacheChunkSurface({ pulse, targetOrgan, pathway, mode }) {
  const band = normalizeBand(pulse.band || pulse.bandMode || "symbolic");
  const shape = {
    pattern: pulse.pattern || "",
    lineageDepth: Array.isArray(pulse.lineage) ? pulse.lineage.length : 0,
    targetOrgan,
    pathway,
    mode,
    band
  };
  const raw = stableStringify(shape);
  const cacheChunkKey = "engine30-cache::" + computeHash(raw);
  const cacheChunkDual = computeDualHash(cacheChunkKey);

  return {
    cacheChunkKey,
    cacheChunkSignature: cacheChunkDual.primary,
    cacheChunkSignatureDual: cacheChunkDual,
    cacheChunkShape: shape
  };
}

function buildPrewarmSurface({ pulse, targetOrgan }) {
  const priority = pulse.priority || "normal";
  const band = normalizeBand(pulse.band || pulse.bandMode || "symbolic");
  let level = "none";

  if (priority === "critical" || priority === "high") level = "aggressive";
  else if (priority === "normal") level = "medium";
  else if (priority === "low") level = "light";

  const raw = stableStringify({ priority, targetOrgan, band });
  const prewarmKey = "engine30-prewarm::" + computeHash(raw);
  const prewarmDual = computeDualHash(prewarmKey);

  return {
    level,
    band,
    prewarmKey,
    prewarmSignature: prewarmDual.primary,
    prewarmSignatureDual: prewarmDual
  };
}

function buildPresenceSurface({ pulse, targetOrgan }) {
  const pattern = pulse.pattern || "";
  const band = normalizeBand(pulse.band || pulse.bandMode || "symbolic");
  let scope = "local";

  if (pattern.includes("/global")) scope = "global";
  else if (pattern.includes("/page")) scope = "page";

  const raw = stableStringify({ pattern, targetOrgan, scope, band });
  const presenceKey = "engine30-presence::" + computeHash(raw);
  const presenceDual = computeDualHash(presenceKey);

  return {
    scope,
    band,
    presenceKey,
    presenceSignature: presenceDual.primary,
    presenceSignatureDual: presenceDual
  };
}


// ============================================================================
//  degradation + immortal surfaces (v30 dual-hash)
// ============================================================================

function buildDegradationSurface({ pulse }) {
  const healthScore = typeof pulse.healthScore === "number"
    ? clamp01(pulse.healthScore)
    : 1.0;

  const degradationTier = classifyDegradationTier(healthScore);
  const shape = { healthScore, degradationTier };
  const hashDual = computeDualHash(shape);

  return {
    healthScore,
    degradationTier,
    degradationHash: hashDual.primary,
    degradationHashDual: hashDual
  };
}

function buildImmortalSurface({ pulse }) {
  const immortalMeta = extractImmortalMeta(pulse);
  const raw = stableStringify(immortalMeta);
  const immortalDual = computeDualHash("engine30-immortal::" + raw);

  return {
    immortalMeta,
    immortalSignature: immortalDual.primary,
    immortalSignatureDual: immortalDual
  };
}


// ============================================================================
//  MESH FACTORING ECHO (optional, metadata-only)
// ============================================================================

function buildMeshFactoringEcho({ pulse }) {
  const meta = extractImmortalMeta(pulse);
  const profile = meta.meshFactoringProfile || null;

  const shape = {
    hasMeshFactoring: !!profile,
    profile
  };

  const dual = computeDualHash(shape);

  return {
    hasMeshFactoring: !!profile,
    meshFactoringProfile: profile,
    meshFactoringSignature: dual.primary,
    meshFactoringSignatureDual: dual
  };
}


// ============================================================================
//  MOVEMENT DIAGNOSTICS (symbolic + binary + v30 surfaces)
// ============================================================================

function buildMovementDiagnostics({ pulse, targetOrgan, pathway, mode }) {
  const pattern = pulse.pattern || "NO_PATTERN";
  const lineageDepth = Array.isArray(pulse.lineage) ? pulse.lineage.length : 0;
  const pulseType = pulse.pulseType || pulse.PulseRole.identity || "UNKNOWN_PULSE_TYPE";
  const band = normalizeBand(pulse.band || pulse.bandMode || "symbolic");

  const binary = extractBinarySurface(pulse);
  const degradation = buildDegradationSurface({ pulse });
  const immortal = buildImmortalSurface({ pulse });
  const meshFactoring = buildMeshFactoringEcho({ pulse });

  const patternDual = computeDualHash(pattern);
  const lineageDual = computeDualHash(String(lineageDepth));
  const pulseTypeDual = computeDualHash(pulseType);
  const organDual = computeDualHash(String(targetOrgan || "NO_ORGAN"));
  const pathwayDual = computeDualHash(pathway || {});
  const modeDual = computeDualHash(mode || "normal");
  const bandDual = computeDualHash(band);

  const binaryPatternDual = binary.binaryPattern ? computeDualHash(binary.binaryPattern) : null;
  const binaryModeDual = binary.binaryMode ? computeDualHash(binary.binaryMode) : null;

  return {
    pattern,
    lineageDepth,
    pulseType,
    targetOrgan,
    pathway,
    mode,
    band,

    binary,
    degradation,
    immortal,
    meshFactoring,

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
    bandHash: bandDual.primary,
    bandHashDual: bandDual,

    binaryPatternHash: binaryPatternDual ? binaryPatternDual.primary : null,
    binaryPatternHashDual: binaryPatternDual,
    binaryModeHash: binaryModeDual ? binaryModeDual.primary : null,
    binaryModeHashDual: binaryModeDual
  };
}


// ============================================================================
//  MOVEMENT INTELLIGENCE (v30 IMMORTAL-INTEL-UNIFIED)
// ============================================================================

function computeMovementIntelligence({
  diagnostics,
  cacheChunkSurface,
  prewarmSurface,
  presenceSurface,
  degradationSurface,
  immortalSurface,
  meshFactoringSurface
}) {
  const patternLen = (diagnostics.pattern || "").length;
  const lineageDepth = diagnostics.lineageDepth || 0;
  const hasBinary = diagnostics.binary.hasBinary ? 1 : 0;

  const presenceScope = presenceSurface.scope || "local";
  const presenceWeight =
    presenceScope === "global-max"    ? 1.1 :
    presenceScope === "global"        ? 1.0 :
    presenceScope === "page"          ? 0.7 :
    presenceScope === "local"         ? 0.4 :
    0.2;

  const prewarmLevel = prewarmSurface.level || "none";
  const prewarmWeight =
    prewarmLevel === "aggressive"      ? 1.0 :
    prewarmLevel === "medium"          ? 0.7 :
    prewarmLevel === "light"           ? 0.4 :
    prewarmLevel === "ultra"           ? 1.1 :
    prewarmLevel === "ultra-max"       ? 1.2 :
    0.1;

  const cacheWeight = cacheChunkSurface.cacheChunkKey ? 0.6 : 0.2;

  const healthScore = degradationSurface.healthScore ?? 1.0;
  const healthWeight =
    healthScore >= 0.975 ? 1.0 :
    healthScore >= 0.90  ? 0.8 :
    healthScore >= 0.60  ? 0.5 :
    healthScore >= 0.20  ? 0.3 :
    0.1;

  const coherenceScore = immortalSurface.immortalMeta.coherenceScore ?? 1.0;
  const coherenceWeight =
    coherenceScore >= 0.9 ? 1.0 :
    coherenceScore >= 0.7 ? 0.7 :
    coherenceScore >= 0.4 ? 0.4 :
    0.2;

  const meshFactoringBoost = meshFactoringSurface.hasMeshFactoring ? 0.1 : 0.0;

  const structuralScore =
    patternLen * 0.0005 +
    lineageDepth * 0.001 +
    hasBinary * 0.12;

  const solvednessScore = clamp01(
    structuralScore * 0.4 +
    presenceWeight * 0.2 +
    prewarmWeight * 0.15 +
    cacheWeight * 0.1 +
    healthWeight * 0.1 +
    coherenceWeight * 0.05 +
    meshFactoringBoost
  );

  const computeTier =
    solvednessScore >= 0.9 ? "nearSolution" :
    solvednessScore >= 0.7 ? "highValue"    :
    solvednessScore >= 0.4 ? "normal"       :
    solvednessScore >= 0.2 ? "lowPriority"  :
    "avoidCompute";

  const readinessScore = clamp01(
    solvednessScore * 0.7 +
    hasBinary * 0.1
  );

  const intelShape = {
    layer: "PulseSendEngine",
    version: "v30-IMMORTAL-INTEL-UNIFIED",
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
    band: diagnostics.band,
    hasMeshFactoring: meshFactoringSurface.hasMeshFactoring
  };

  const intelDual = computeDualHash(intelShape);

  return {
    ...intelShape,
    movementIntelligenceSignature: intelDual.primary,
    movementIntelligenceSignatureDual: intelDual
  };
}


// ============================================================================
//  FACTORY — Create the PulseSendEngine (v30-IMMORTAL-INTEL-UNIFIED)
// ============================================================================

export function createPulseSendEngineV30({ pulseMesh, log } = {}) {
  return {

    move({ pulse, targetOrgan, pathway, mode = "normal" }) {
      const effectivePathway =
        pathway ||
        (pulseMesh && typeof pulseMesh.pathwayFor === "function"
          ? pulseMesh.pathwayFor(targetOrgan, mode)
          : null);

      const diagnostics = buildMovementDiagnostics({
        pulse,
        targetOrgan,
        pathway: effectivePathway,
        mode
      });

      const cacheChunkSurface = buildCacheChunkSurface({
        pulse,
        targetOrgan,
        pathway: effectivePathway,
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

      const degradationSurface = buildDegradationSurface({ pulse });
      const immortalSurface = buildImmortalSurface({ pulse });
      const meshFactoringSurface = buildMeshFactoringEcho({ pulse });

      const movementIntelligence = computeMovementIntelligence({
        diagnostics,
        cacheChunkSurface,
        prewarmSurface,
        presenceSurface,
        degradationSurface,
        immortalSurface,
        meshFactoringSurface
      });

      const movementShape = {
        pulse,
        targetOrgan,
        pathway: effectivePathway,
        mode,
        movementTier: degradationSurface.degradationTier,
        band: diagnostics.band
      };
      const movementDual = computeDualHash(movementShape);
      const movementSignature = movementDual.primary;

      if (log && typeof log === "function") {
        log("[PulseSendEngine-v30-IMMORTAL-INTEL-UNIFIED] Movement fired", {
          jobId: pulse.jobId,
          diagnostics,
          cacheChunkSurface,
          prewarmSurface,
          presenceSurface,
          degradationSurface,
          immortalSurface,
          meshFactoringSurface,
          movementIntelligence,
          movementSignature
        });
      }

      // Binary echo (optional) if pulse carries raw bits
      let binaryEcho = null;
      const binaryPayload = diagnostics.binary.binaryPayload;
      if (Array.isArray(binaryPayload)) {
        const sig = computeBinarySignature(binaryPayload);
        const cc = computeBinaryCacheChunk(binaryPayload);
        const pre = computeBinaryPrewarm(binaryPayload);
        const pres = computeBinaryPresence(binaryPayload);
        const dual = computeDualHash({
          sig,
          cc,
          pre,
          pres,
          len: binaryPayload.length
        });
        binaryEcho = {
          signature: sig,
          cacheChunk: cc,
          prewarm: pre,
          presence: pres,
          binaryEchoSignature: dual.primary,
          binaryEchoSignatureDual: dual
        };
      }

      return {
        packet: {
          pulse,
          targetOrgan,
          pathway: effectivePathway,
          mode,
          movementSignature,
          movementSignatureDual: movementDual,
          diagnostics,
          cacheChunkSurface,
          prewarmSurface,
          presenceSurface,
          degradationSurface,
          immortalSurface,
          meshFactoringSurface,
          movementIntelligence,
          binaryEcho
        }
      };
    }
  };
}


// ============================================================================
//  ORGAN EXPORT — PulseSendEngine v30 (guarded, requires factory)
// ============================================================================

export const PulseSendEngineV30 = {

  move({ pulse, targetOrgan, pathway, mode }) {
    const pulseType = pulse.pulseType || pulse.PulseRole.identity || "UNKNOWN_PULSE_TYPE";
    const pattern = pulse.pattern || "NO_PATTERN";
    const lineageDepth = Array.isArray(pulse.lineage) ? pulse.lineage.length : 0;
    const band = normalizeBand(pulse.band || pulse.bandMode || "symbolic");

    throw new Error(
      `[PulseSendEngine-v30-IMMORTAL-INTEL-UNIFIED] move() called before initialization.\n` +
      `• pulseType: ${pulseType}\n` +
      `• pattern: ${pattern}\n` +
      `• lineageDepth: ${lineageDepth}\n` +
      `• band: ${band}\n` +
      `• targetOrgan: ${targetOrgan || "NO_ORGAN"}\n` +
      `• pathway: ${pathway || "NO_PATHWAY"}\n` +
      `• mode: ${mode || "NO_MODE"}\n` +
      `Use createPulseSendEngineV30(...) to wire dependencies.`
    );
  }
};

PulseRealm.SendEngine = {
  PulseSendEngineV30,
  createPulseSendEngineV30
}

PulseRealm.PulseSendEngine = PulseSendEngineV30;
PulseRealm.PulseSendEngineBuild = createPulseSendEngineV30;