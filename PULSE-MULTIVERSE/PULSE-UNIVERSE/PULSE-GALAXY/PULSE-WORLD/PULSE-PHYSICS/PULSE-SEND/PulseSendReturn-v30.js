// ============================================================================
//  PulseSendReturn-v30-IMMORTAL-INTEL+++.js
//  Return Arc • Pulse‑Agnostic Bounce‑Back Organ • Handles returnTo Logic
//  v30-IMMORTAL-INTEL+++:
//    • Binary-aware + Movement-aware + DualStack-aware + Band-aware Return Surface
//    • CacheChunk + Prewarm + Presence + MeshFactoring return surfaces (dual-hash)
//    • DualHash surfaces (primary + secondary) + INTEL signature
//    • Return Intelligence v30 (IMMORTAL-safe, logic-only, v30 surfaces-aware)
//    • Ancestry + Advantage echo preserved (pass-through only)
//    • Ready for meshFactoringProfile + unified bandMode (binary/symbolic)
// ============================================================================

// ============================================================================
//  INTERNAL HELPERS — deterministic, tiny, pure
// ============================================================================

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 5)) % 262144; // v24: 18‑bit
  }
  return `h24_${h}`;
}

function computeHashAlt(str) {
  let h = 1;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h * 131 + s.charCodeAt(i) * (i + 17)) % 524287; // v24: 19‑bit
  }
  return `h24b_${h}`;
}

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

function computeDualHash(value) {
  const s = typeof value === "string" ? value : stableStringify(value);
  return {
    primary: computeHash(s),
    secondary: computeHashAlt(s)
  };
}

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

function normalizeBand(band, bandMode) {
  const b = (band || bandMode || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

// ============================================================================
//  v30 RETURN SURFACES — cacheChunk / prewarm / presence / meshFactoring
// ============================================================================

function buildCacheChunkSurface({ pulse, targetOrgan, pathway, mode, bandMode }) {
  const shape = {
    pattern: pulse.pattern || "NO_PATTERN",
    lineageDepth: Array.isArray(pulse.lineage) ? pulse.lineage.length : 0,
    targetOrgan: targetOrgan || "NO_ORGAN",
    pathway: pathway || "NO_PATHWAY",
    mode: mode || "normal",
    bandMode: bandMode || "symbolic"
  };
  const raw = stableStringify(shape);
  const cacheChunkKey = "return-cache::" + computeHash(raw);
  const dual = computeDualHash(cacheChunkKey);

  return {
    cacheChunkKey,
    cacheChunkSignature: dual.primary,
    cacheChunkSignatureDual: dual,
    cacheChunkShape: shape
  };
}

function buildPrewarmSurface({ pulse, targetOrgan, bandMode }) {
  const priority = pulse.priority || "normal";
  let level = "none";

  if (priority === "critical" || priority === "high") level = "aggressive";
  else if (priority === "normal") level = "medium";
  else if (priority === "low") level = "light";

  const shape = {
    priority,
    targetOrgan: targetOrgan || "NO_ORGAN",
    bandMode: bandMode || "symbolic"
  };

  const raw = stableStringify(shape);
  const prewarmKey = "return-prewarm::" + computeHash(raw);
  const dual = computeDualHash(prewarmKey);

  return {
    level,
    prewarmKey,
    prewarmSignature: dual.primary,
    prewarmSignatureDual: dual,
    prewarmShape: shape
  };
}

function buildPresenceSurface({ pulse, targetOrgan, bandMode }) {
  const pattern = pulse.pattern || "NO_PATTERN";
  let scope = "local";

  if (pattern.includes("/global")) scope = "global";
  else if (pattern.includes("/page")) scope = "page";

  const shape = {
    pattern,
    targetOrgan: targetOrgan || "NO_ORGAN",
    scope,
    bandMode: bandMode || "symbolic"
  };

  const raw = stableStringify(shape);
  const presenceKey = "return-presence::" + computeHash(raw);
  const dual = computeDualHash(presenceKey);

  return {
    scope,
    presenceKey,
    presenceSignature: dual.primary,
    presenceSignatureDual: dual,
    presenceShape: shape
  };
}

function buildMeshFactoringSurface({ meshFactoringProfile, bandMode }) {
  const profile = meshFactoringProfile || null;
  const shape = {
    bandMode: bandMode || "symbolic",
    meshFactoringProfile: profile
  };
  const dual = computeDualHash(shape);

  return {
    meshFactoringProfile: profile,
    meshFactoringSignature: dual.primary,
    meshFactoringSignatureDual: dual
  };
}

// ============================================================================
//  RETURN INTELLIGENCE v30 (IMMORTAL-safe, logic-only, v30 surfaces-aware)
// ============================================================================

function computeReturnIntelligenceV30({
  binarySurface,
  hasReturnTarget,
  hasMovementSignature,
  lineageDepth,
  cacheChunkSurface,
  prewarmSurface,
  presenceSurface,
  meshFactoringSurface,
  bandMode
}) {
  const band = normalizeBand(bandMode, bandMode);
  const bandIsBinary = band === "binary" ? 1 : 0;

  const binaryWeight = binarySurface.hasBinary ? 0.35 : 0.1;
  const returnWeight = hasReturnTarget ? 0.35 : 0.0;
  const movementWeight = hasMovementSignature ? 0.15 : 0.0;
  const lineageWeight = lineageDepth > 0 ? Math.min(lineageDepth / 12, 0.15) : 0;

  const presenceScope = presenceSurface.scope || "local";
  const presenceWeight =
    presenceScope === "global" ? 0.15 :
    presenceScope === "page"   ? 0.10 :
    presenceScope === "local"  ? 0.05 :
    0.0;

  const prewarmLevel = prewarmSurface.level || "none";
  const prewarmWeight =
    prewarmLevel === "aggressive" ? 0.15 :
    prewarmLevel === "medium"     ? 0.10 :
    prewarmLevel === "light"      ? 0.05 :
    0.0;

  const cacheWeight = cacheChunkSurface.cacheChunkKey ? 0.10 : 0.0;

  const meshPressure = meshFactoringSurface.meshFactoringProfile.pressure || 0;
  const meshWeight = Math.max(0, Math.min(meshPressure * 0.15, 0.15));

  const solvednessScore = Math.max(
    0,
    Math.min(
      binaryWeight +
      returnWeight +
      movementWeight +
      lineageWeight +
      presenceWeight +
      prewarmWeight +
      cacheWeight +
      meshWeight,
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
      solvednessScore * 0.7 +
      (hasReturnTarget ? 0.1 : 0) +
      (binarySurface.hasBinary ? 0.1 : 0) +
      bandIsBinary * 0.05,
      1
    )
  );

  const intelShape = {
    layer: "PulseSendReturn",
    version: "v30-IMMORTAL-INTEL+++",
    solvednessScore,
    computeTier,
    readinessScore,
    hasReturnTarget,
    hasBinary: binarySurface.hasBinary,
    hasMovementSignature,
    presenceScope,
    prewarmLevel,
    lineageDepth,
    bandMode: band,
    meshPressure
  };

  const intelDual = computeDualHash(intelShape);

  return {
    ...intelShape,
    returnIntelligenceSignature: intelDual.primary,
    returnIntelligenceSignatureDual: intelDual
  };
}

// ============================================================================
//  DIAGNOSTICS — v30 dual-hash + intelligence
// ============================================================================

function buildReturnDiagnosticsV30({
  pulse,
  movementPacket,
  returnTo,
  targetOrgan,
  pathway,
  mode,
  bandMode,
  cacheChunkSurface,
  prewarmSurface,
  presenceSurface,
  meshFactoringSurface
}) {
  const pattern = pulse.pattern || "NO_PATTERN";
  const lineageDepth = Array.isArray(pulse.lineage) ? pulse.lineage.length : 0;
  const pulseType = pulse.pulseType || pulse.PulseRole.identity || "UNKNOWN_PULSE_TYPE";

  const binarySurface = extractBinarySurfaceFromPulse(pulse);

  const movementSignature = movementPacket.movementSignature || null;
  const movementDiagnostics = movementPacket.diagnostics || null;

  const patternDual = computeDualHash(pattern);
  const lineageDual = computeDualHash(String(lineageDepth));
  const pulseTypeDual = computeDualHash(pulseType);
  const returnTargetDual = computeDualHash(String(returnTo || "NO_RETURN_TARGET"));
  const organDual = computeDualHash(String(targetOrgan || "NO_ORGAN"));
  const pathwayDual = computeDualHash(pathway || "NO_PATHWAY");
  const modeDual = computeDualHash(mode || "normal");
  const bandDual = computeDualHash(bandMode || "symbolic");

  const binaryPatternHashDual = binarySurface.binaryPattern
    ? computeDualHash(binarySurface.binaryPattern)
    : null;
  const binaryModeHashDual = binarySurface.binaryMode
    ? computeDualHash(binarySurface.binaryMode)
    : null;
  const binaryRouterHintHashDual = binarySurface.routerHint
    ? computeDualHash(binarySurface.routerHint)
    : null;
  const binaryMeshHintHashDual = binarySurface.meshHint
    ? computeDualHash(binarySurface.meshHint)
    : null;
  const binaryOrganHintHashDual = binarySurface.organHint
    ? computeDualHash(binarySurface.organHint)
    : null;

  const intelligence = computeReturnIntelligenceV30({
    binarySurface,
    hasReturnTarget: !!returnTo,
    hasMovementSignature: !!movementSignature,
    lineageDepth,
    cacheChunkSurface,
    prewarmSurface,
    presenceSurface,
    meshFactoringSurface,
    bandMode
  });

  const intelligenceDual = computeDualHash(intelligence);

  return {
    // Core symbolic surface
    pattern,
    lineageDepth,
    pulseType,
    returnTo: returnTo || "NO_RETURN_TARGET",
    targetOrgan: targetOrgan || "NO_ORGAN",
    pathway: pathway || "NO_PATHWAY",
    mode,
    bandMode,

    // Binary surface
    binary: binarySurface,

    // Movement packet surface
    movementSignature,
    movementDiagnostics,

    // v30 return surfaces
    cacheChunkSurface,
    prewarmSurface,
    presenceSurface,
    meshFactoringSurface,

    // Intelligence
    returnIntelligence: intelligence,
    returnIntelligenceSignature: intelligenceDual.primary,
    returnIntelligenceSignatureDual: intelligenceDual,

    // Hashes (dual)
    patternHash: patternDual.primary,
    patternHashDual: patternDual,
    lineageHash: lineageDual.primary,
    lineageHashDual: lineageDual,
    pulseTypeHash: pulseTypeDual.primary,
    pulseTypeHashDual: pulseTypeDual,
    returnTargetHash: returnTargetDual.primary,
    returnTargetHashDual: returnTargetDual,
    organHash: organDual.primary,
    organHashDual: organDual,
    pathwayHash: pathwayDual.primary,
    pathwayHashDual: pathwayDual,
    modeHash: modeDual.primary,
    modeHashDual: modeDual,
    bandHash: bandDual.primary,
    bandHashDual: bandDual,

    // Binary hashes (dual)
    binaryPatternHash: binaryPatternHashDual ? binaryPatternHashDual.primary : null,
    binaryPatternHashDual,
    binaryModeHash: binaryModeHashDual ? binaryModeHashDual.primary : null,
    binaryModeHashDual,
    binaryRouterHintHash: binaryRouterHintHashDual ? binaryRouterHintHashDual.primary : null,
    binaryRouterHintHashDual,
    binaryMeshHintHash: binaryMeshHintHashDual ? binaryMeshHintHashDual.primary : null,
    binaryMeshHintHashDual,
    binaryOrganHintHash: binaryOrganHintHashDual ? binaryOrganHintHashDual.primary : null,
    binaryOrganHintHashDual
  };
}

// ============================================================================
//  FACTORY — Return Organ (v30-IMMORTAL-INTEL+++)
// ============================================================================

export function createPulseSendReturn({
  impulse,
  pulseRouter,
  pulseMesh,
  log,
  // optional mesh factoring profile provider (metadata-only)
  getMeshFactoringProfile
}) {
  return {

    // movementOrPulse is usually movement.packet from Impulse/Mover,
    // but we stay backward-compatible with a raw pulse.
    handle(movementOrPulse, modeOverride = "normal", bandOverride = null) {
      const movementPacket = movementOrPulse && movementOrPulse.packet
        ? movementOrPulse.packet
        : movementOrPulse;

      const packet = movementPacket || {};
      const pulse = packet.pulse || movementOrPulse || {};

      const {
        returnTo,
        pattern = "UNKNOWN_PATTERN",
        lineage = [],
        bandMode: pulseBandMode
      } = pulse;

      const lineageDepth = Array.isArray(lineage) ? lineage.length : 0;
      const pulseType = pulse.PulseRole.identity || "UNKNOWN_PULSE_TYPE";
      const mode = modeOverride || packet.mode || pulse.mode || "normal";
      const bandMode = bandOverride || pulseBandMode || "symbolic";

      const meshFactoringProfile =
        typeof getMeshFactoringProfile === "function"
          ? getMeshFactoringProfile({ pulse, mode, bandMode })
          : null;

      const meshFactoringSurface = buildMeshFactoringSurface({
        meshFactoringProfile,
        bandMode
      });

      const cacheChunkSurface = buildCacheChunkSurface({
        pulse,
        targetOrgan: null,
        pathway: null,
        mode,
        bandMode
      });

      const prewarmSurface = buildPrewarmSurface({
        pulse,
        targetOrgan: null,
        bandMode
      });

      const presenceSurface = buildPresenceSurface({
        pulse,
        targetOrgan: null,
        bandMode
      });

      // ⭐ No return target → end of chain
      if (!returnTo) {
        const diagnostics = buildReturnDiagnosticsV30({
          pulse,
          movementPacket: packet,
          returnTo: null,
          targetOrgan: null,
          pathway: null,
          mode,
          bandMode,
          cacheChunkSurface,
          prewarmSurface,
          presenceSurface,
          meshFactoringSurface
        });

        log && log("[PulseSendReturn-v30-IMMORTAL-INTEL+++] No returnTo target — chain complete", {
          jobId: pulse.jobId,
          diagnostics
        });

        return {
          completed: true,
          returned: false,
          diagnostics,
          pulse,
          movementIn: packet
        };
      }

      // ⭐ Return target exists → route the return pulse
      log && log("[PulseSendReturn-v30-IMMORTAL-INTEL+++] Returning pulse", {
        jobId: pulse.jobId,
        pattern,
        returnTo,
        lineageDepth,
        mode,
        bandMode,
        pulseType
      });

      // ⭐ Step 1 — determine return target via Router
      const targetOrgan = pulseRouter.route({
        ...pulse,
        targetHint: returnTo,
        mode,
        bandMode
      });

      // ⭐ Step 2 — determine pathway via Mesh
      const pathway = pulseMesh.pathwayFor(targetOrgan, mode);

      const cacheChunkSurface2 = buildCacheChunkSurface({
        pulse,
        targetOrgan,
        pathway,
        mode,
        bandMode
      });

      const prewarmSurface2 = buildPrewarmSurface({
        pulse,
        targetOrgan,
        bandMode
      });

      const presenceSurface2 = buildPresenceSurface({
        pulse,
        targetOrgan,
        bandMode
      });

      const diagnostics = buildReturnDiagnosticsV30({
        pulse,
        movementPacket: packet,
        returnTo,
        targetOrgan,
        pathway,
        mode,
        bandMode,
        cacheChunkSurface: cacheChunkSurface2,
        prewarmSurface: prewarmSurface2,
        presenceSurface: presenceSurface2,
        meshFactoringSurface
      });

      // ⭐ v30 return signature (dual-hash, binary + hints + movement + band aware)
      const signatureShape = {
        pattern: diagnostics.pattern,
        returnTo: diagnostics.returnTo,
        targetOrgan: diagnostics.targetOrgan,
        mode: diagnostics.mode,
        bandMode: diagnostics.bandMode,
        binaryPattern: diagnostics.binary.binaryPattern || "NO_BINARY_PATTERN",
        routerHint: diagnostics.binary.routerHint || "NO_ROUTER_HINT",
        meshHint: diagnostics.binary.meshHint || "NO_MESH_HINT",
        organHint: diagnostics.binary.organHint || "NO_ORGAN_HINT",
        movementSignature: diagnostics.movementSignature || "NO_MOVEMENT_SIGNATURE"
      };

      const returnSignatureDual = computeDualHash(signatureShape);

      // ⭐ Step 3 — fire impulse back (prevent infinite loops)
      const backMovement = impulse.fire({
        pulse: {
          ...pulse,
          returnTo: null, // prevent infinite loops
          mode,
          bandMode
        },
        targetOrgan,
        pathway,
        mode
      });

      return {
        completed: true,
        returned: true,
        returnSignature: returnSignatureDual.primary,
        returnSignatureDual,
        diagnostics,
        movement: backMovement,
        movementIn: packet
      };
    }
  };
}

// ============================================================================
//  ORGAN EXPORT — ⭐ PulseSendReturn (v30-IMMORTAL-INTEL+++)
// ============================================================================

export const PulseSendReturn = {
  handle(movementOrPulse, mode, bandMode) {
    const pulse = movementOrPulse && movementOrPulse.pulse
      ? movementOrPulse.pulse
      : movementOrPulse || {};

    const pulseType = pulse.pulseType || pulse.PulseRole.identity || "UNKNOWN_PULSE_TYPE";
    const pattern = pulse.pattern || "NO_PATTERN";
    const lineageDepth = Array.isArray(pulse.lineage) ? pulse.lineage.length : 0;

    throw new Error(
      `[PulseSendReturn-v30-IMMORTAL-INTEL+++] handle() called before initialization.\n` +
      `• pulseType: ${pulseType}\n` +
      `• pattern: ${pattern}\n` +
      `• lineageDepth: ${lineageDepth}\n` +
      `• mode: ${mode || "NO_MODE"}\n` +
      `• bandMode: ${bandMode || "NO_BAND"}\n` +
      `Use createPulseSendReturn(...) to wire dependencies.`
    );
  }
};
