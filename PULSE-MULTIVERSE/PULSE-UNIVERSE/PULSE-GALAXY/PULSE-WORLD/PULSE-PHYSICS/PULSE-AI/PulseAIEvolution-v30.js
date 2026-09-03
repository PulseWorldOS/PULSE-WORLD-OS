// ============================================================================
// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-AI/PulseAIEvolution-v30-Immortal-Advantage+++.js
// LAYER: EVOLUTION ORGAN (Organism Awareness + Drift + Growth + Binary Evolution)
// VERSION: v30-IMMORTAL-ADVANTAGE+++
// ============================================================================
//
// ROLE:
//   • Detect unused imports, dead code, orphaned routes, unused components.
//   • Detect schema drift, organ drift, page drift, PulseEarn drift.
//   • Detect evolutionary patterns (“new limb”, “overgrowth”, “starvation”).
//   • Track binary + symbolic evolution (DualBand snapshot awareness).
//   • Provide owner‑only deep organism insight (code + routes + schemas + binary).
//   • Integrates with Architect + Earn + Power + Environment + DualBand + Finality.
//   • Emits evolution packets + recommendations (owner‑only).
//   • Never mutates anything.
//
// CONTRACT:
//   • READ‑ONLY.
//   • ZERO MUTATION.
//   • ZERO RANDOMNESS.
//   • DETERMINISTIC ANALYSIS ONLY.
//   • NO SECRET MATERIAL, NO KEYS, NO TOKENS.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import { Personas } from "./PERSONALITY/PulseAIPersonality-v30.js";
import { getOrganismSnapshot } from "./PulseAIDeps-v30.js";

// ============================================================================
//  META — Evolution Identity (v30 IMMORTAL-ADVANTAGE+++)
// ============================================================================

export const AI_EVOLUTION_META = Object.freeze({
  id: "ai-evolution-organ-v30-immortal-advantage+++",
  layer: "organ-evolution",
  version: "v30-IMMORTAL-ADVANTAGE+++",
  evo: Object.freeze({
    epoch: 30,
    deterministic: true,
    driftProof: true,
    dualBandAware: true,
    binaryFirst: true,
    organismFirst: true,
    readOnly: true
  }),
  contracts: Object.freeze({
    readOnly: true,
    zeroMutation: true,
    zeroRandomness: true,
    deterministicAnalysisOnly: true,
    noSecrets: true,
    noTokens: true,
    noExternalWrites: true
  })
});

// ============================================================================
//  INTERNAL CACHES — deterministic, in‑memory, per‑scope
// ============================================================================

const EVO_CACHE = Object.freeze({
  organismOverview: new Map(), // key: "organism", value: { packet, expiresAt }
  fileAnalysis: new Map(),     // key: filePath
  schemaAnalysis: new Map(),   // key: schemaName
  routeAnalysis: new Map()     // key: routePrefix
});

const ORGANISM_OVERVIEW_TTL_MS = 5 * 60 * 1000;  // 5 minutes
const FILE_ANALYSIS_TTL_MS     = 60 * 1000;      // 60 seconds
const SCHEMA_ANALYSIS_TTL_MS   = 60 * 1000;      // 60 seconds
const ROUTE_ANALYSIS_TTL_MS    = 60 * 1000;      // 60 seconds;

// ============================================================================
//  SHARED HELPERS — caching, snapshot summary, chunking, packets, detectors
// ============================================================================

function getCached(map, key) {
  const entry = map.get(key);
  if (!entry) return null;
  if (entry.expiresAt <= PulseRealm.PulseNOW) {
    map.delete(key);
    return null;
  }
  return entry.packet;
}

function setCached(map, key, packet, ttlMs) {
  if (!ttlMs || ttlMs <= 0) return;
  map.set(key, {
    packet,
    expiresAt: PulseRealm.PulseNOW + ttlMs
  });
}

function summarizeSnapshot(snapshot) {
  if (!snapshot) {
    return Object.freeze({
      present: false,
      binaryBits: 0,
      symbolicKeys: 0,
      dualBandPresent: false
    });
  }

  const binaryStr =
    typeof snapshot === "string"
      ? snapshot
      : typeof snapshot.binary === "string"
      ? snapshot.binary
      : "";

  const symbolic =
    snapshot && typeof snapshot.symbolic === "object"
      ? snapshot.symbolic
      : null;

  const symbolicKeys = symbolic ? Object.keys(symbolic).length : 0;
  const dualBandPresent = !!(binaryStr && symbolicKeys > 0);

  return Object.freeze({
    present: true,
    binaryBits: binaryStr.length,
    symbolicKeys,
    dualBandPresent
  });
}

function chunkArray(arr, size = 200) {
  if (!Array.isArray(arr) || size <= 0) return [];
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(Object.freeze(arr.slice(i, i + size)));
  }
  return Object.freeze(chunks);
}

function emitEvolutionPacket(
  type,
  payload,
  { severity = "info", driftLevel = "none" } = {}
) {
  return Object.freeze({
    meta: AI_EVOLUTION_META,
    packetType: `evo-${type}`,
    packetId: `evo-${type}-${PulseRealm.PulseNOW}`,
    timestamp: PulseRealm.PulseNOW,
    organismEpoch: AI_EVOLUTION_META.evo.epoch,
    severity,
    driftLevel,
    ...payload
  });
}

// DETECTORS — Pure, deterministic analysis

function detectUnusedImports(file) {
  if (!file.imports || !file.references) return [];
  return file.imports.filter((imp) => !file.references.includes(imp.name));
}

function detectOrphanedRoutes(routeMap) {
  if (!Array.isArray(routeMap)) return [];
  return routeMap.filter((r) => !r.inbound && !r.outbound);
}

function detectDeadComponents(files) {
  if (!Array.isArray(files)) return [];
  return files.filter(
    (f) =>
      f.type === "component" &&
      Array.isArray(f.references) &&
      f.references.length === 0
  );
}

function detectSchemaDrift(schemas) {
  const drift = [];

  if (!Array.isArray(schemas)) return drift;

  for (const s of schemas) {
    if (!s.expectedFields || !s.actualFields) continue;

    for (const key of Object.keys(s.expectedFields)) {
      if (!s.actualFields[key]) {
        drift.push({
          schema: s.name,
          field: key,
          issue: "missing"
        });
      }
    }

    for (const key of Object.keys(s.actualFields)) {
      if (!s.expectedFields[key]) {
        drift.push({
          schema: s.name,
          field: key,
          issue: "unexpected"
        });
      }
    }
  }

  return drift;
}

function detectOrganDrift(files) {
  if (!Array.isArray(files)) return [];

  return files
    .filter((f) => f.type === "organ")
    .map((f) => {
      const missingExports =
        f.expectedExports.filter((e) => !f.exports.includes(e)) || [];
      const unusedExports =
        f.exports.filter((e) => !f.references.includes(e)) || [];

      return {
        organ: f.name,
        missingExports,
        unusedExports
      };
    })
    .filter(
      (o) => o.missingExports.length > 0 || o.unusedExports.length > 0
    );
}

function detectPageDrift(files) {
  if (!Array.isArray(files)) return [];

  return files
    .filter((f) => f.type === "page")
    .map((f) => {
      const missingRoutes =
        f.expectedRoutes.filter((r) => !f.routes.includes(r)) || [];
      const unusedRoutes =
        f.routes.filter((r) => !f.references.includes(r)) || [];

      return {
        page: f.name,
        missingRoutes,
        unusedRoutes
      };
    })
    .filter(
      (p) => p.missingRoutes.length > 0 || p.unusedRoutes.length > 0
    );
}

function detectPulseEarnDrift(files) {
  if (!Array.isArray(files)) return null;

  const earn =
    files.find((f) => f.name === "PulseEarn-v31.js") ||
    null;

  if (!earn) return null;

  return {
    missingExports:
      earn.expectedExports.filter((e) => !earn.exports.includes(e)) || [],
    unusedImports: detectUnusedImports(earn),
    unusedExports:
      earn.exports.filter((e) => !earn.references.includes(e)) || [],
    deadPaths: earn.deadPaths || []
  };
}

function detectEvolutionaryPatterns({
  files = [],
  routes = [],
  schemaDrift = [],
  organDrift = [],
  pageDrift = []
}) {
  const fileCount = Array.isArray(files) ? files.length : 0;
  const routeCount = Array.isArray(routes) ? routes.length : 0;

  const deadComponents = detectDeadComponents(files);
  const orphanedRoutes = detectOrphanedRoutes(routes);

  const newLimb =
    fileCount > 0 &&
    (schemaDrift.length > 0 ||
      organDrift.length > 0 ||
      pageDrift.length > 0);

  const overgrowth =
    deadComponents.length > 10 || orphanedRoutes.length > 10;

  const starvation =
    fileCount > 0 &&
    schemaDrift.length === 0 &&
    organDrift.length === 0 &&
    pageDrift.length === 0 &&
    deadComponents.length === 0 &&
    orphanedRoutes.length === 0;

  return Object.freeze({
    newLimb,
    overgrowth,
    starvation,
    counts: {
      files: fileCount,
      routes: routeCount,
      schemaDrift: schemaDrift.length,
      organDrift: organDrift.length,
      pageDrift: pageDrift.length,
      deadComponents: deadComponents.length,
      orphanedRoutes: orphanedRoutes.length
    }
  });
}

// RECOMMENDATION ENGINE — conceptual, non‑binding

function buildRecommendations({
  schemaDrift,
  organDrift,
  pageDrift,
  deadComponents,
  orphanedRoutes,
  pulseEarnDrift,
  patterns,
  snapshotSummary
}) {
  const recs = [];

  if (schemaDrift.length > 0) {
    recs.push({
      type: "schema-drift",
      message:
        "Schema drift detected. Consider adding migrations or aligning expected vs actual fields.",
      count: schemaDrift.length
    });
  }

  if (organDrift.length > 0) {
    recs.push({
      type: "organ-drift",
      message:
        "Organ drift detected. Consider reviewing missing/unused exports for key organs.",
      count: organDrift.length
    });
  }

  if (pageDrift.length > 0) {
    recs.push({
      type: "page-drift",
      message:
        "Page drift detected. Consider aligning routes with page references.",
      count: pageDrift.length
    });
  }

  if (deadComponents.length > 0) {
    recs.push({
      type: "dead-components",
      message:
        "Dead components detected. Consider removing or wiring them to reduce overgrowth.",
      count: deadComponents.length
    });
  }

  if (orphanedRoutes.length > 0) {
    recs.push({
      type: "orphaned-routes",
      message:
        "Orphaned routes detected. Consider removing or connecting them to valid pages.",
      count: orphanedRoutes.length
    });
  }

  if (
    pulseEarnDrift &&
    (pulseEarnDrift.missingExports.length > 0 ||
      pulseEarnDrift.unusedExports.length > 0 ||
      pulseEarnDrift.unusedImports.length > 0 ||
      (pulseEarnDrift.deadPaths || []).length > 0)
  ) {
    recs.push({
      type: "earn-drift",
      message:
        "PulseEarn drift detected. Consider reviewing exports, imports, and dead paths in PulseEarn.",
      details: {
        missingExports: pulseEarnDrift.missingExports.length,
        unusedExports: pulseEarnDrift.unusedExports.length,
        unusedImports: pulseEarnDrift.unusedImports.length,
        deadPaths: (pulseEarnDrift.deadPaths || []).length
      }
    });
  }

  if (patterns.newLimb) {
    recs.push({
      type: "pattern-new-limb",
      message:
        "New limb pattern detected. Consider documenting and stabilizing this new structural growth."
    });
  }

  if (patterns.overgrowth) {
    recs.push({
      type: "pattern-overgrowth",
      message:
        "Overgrowth pattern detected. Consider pruning dead components and orphaned routes."
    });
  }

  if (patterns.starvation) {
    recs.push({
      type: "pattern-starvation",
      message:
        "Starvation pattern detected. Consider adding tests or evolution tasks to keep this area healthy."
    });
  }

  if (snapshotSummary.dualBandPresent) {
    recs.push({
      type: "dualband-health",
      message:
        "DualBand snapshot present. Consider tracking binary + symbolic evolution over time for organism health."
    });
  }

  return Object.freeze(recs);
}

// IDENTITY‑SAFE CLONING

function stripIdentityAnchors(record) {
  if (!record || typeof record !== "object") return record;
  const clone = { ...record };
  delete clone.uid;
  delete clone.userId;
  delete clone.resendToken;
  delete clone.identityRoot;
  delete clone.sessionRoot;
  delete clone.deviceFingerprint;
  return clone;
}

// ============================================================================
//  PREWARM ENGINE — v30‑EVO‑ADVANTAGE+++
// ============================================================================
//
// Warms:
//   • fsAPI.getAllFiles()
//   • routeAPI.getRouteMap()
//   • schemaAPI.getAllSchemas()
//   • organism snapshot summarizer (binary + symbolic)
//   • detectors + recommendation engine
// ============================================================================

export async function prewarmEvolutionOrgan(
  fsAPI,
  routeAPI,
  schemaAPI,
  dualBand = null,
  { trace = false } = {}
) {
  try {
    if (trace) console.log("[aiEvolution-v30] prewarm: starting");

    const [files, routes, schemas] = await Promise.all([
      fsAPI.getAllFiles().catch(() => []),
      routeAPI.getRouteMap().catch(() => []),
      schemaAPI.getAllSchemas().catch(() => [])
    ]);

    const sampleFiles = Array.isArray(files) ? files.slice(0, 5) : [];
    const sampleRoutes = Array.isArray(routes) ? routes.slice(0, 5) : [];
    const sampleSchemas = Array.isArray(schemas) ? schemas.slice(0, 5) : [];

    detectUnusedImports(sampleFiles[0] || null);
    detectDeadComponents(sampleFiles);
    detectOrphanedRoutes(sampleRoutes);
    detectSchemaDrift(sampleSchemas);
    detectOrganDrift(sampleFiles);
    detectPageDrift(sampleFiles);
    detectPulseEarnDrift(sampleFiles);

    const snapshot = getOrganismSnapshot(dualBand);
    summarizeSnapshot(snapshot);

    if (trace) console.log("[aiEvolution-v30] prewarm: complete");
    return true;
  } catch (err) {
    console.error("[aiEvolution-v30] prewarm failed:", err);
    return false;
  }
}

// ============================================================================
//  FACTORY — Evolution Organ API (v30‑EVO‑ADVANTAGE+++)
// ============================================================================

export function createEvolutionAPI(
  fsAPI,
  routeAPI,
  schemaAPI,
  dualBand = null
) {
  // ACCESS CONTROL — Owner + Architect Only
  function assertOwnerArchitect(context) {
    const allowed =
      context.userIsOwner && context.personaId === Personas.ARCHITECT;

    if (!allowed) {
      console.log(
        "aiEvolution-v30: access denied (requires owner + architect)."
      );
    }
    return allowed;
  }

  return Object.freeze({
    // ----------------------------------------------------------------------
    // FULL ORGANISM OVERVIEW (code + routes + schemas + snapshot + recs)
    // ----------------------------------------------------------------------
    async getOrganismOverview(context) {
      if (!assertOwnerArchitect(context)) return null;

      const cacheKey = "organism";
      const cached = getCached(EVO_CACHE.organismOverview, cacheKey);
      if (cached) {
        console.log("aiEvolution-v30: organism overview cache hit.");
        return cached;
      }

      const [files, routes, schemas] = await Promise.all([
        fsAPI.getAllFiles(),
        routeAPI.getRouteMap(),
        schemaAPI.getAllSchemas()
      ]);

      const unusedImports = files.flatMap((f) => detectUnusedImports(f));
      const orphanedRoutes = detectOrphanedRoutes(routes);
      const deadComponents = detectDeadComponents(files);
      const schemaDrift = detectSchemaDrift(schemas);
      const organDrift = detectOrganDrift(files);
      const pageDrift = detectPageDrift(files);
      const pulseEarnDrift = detectPulseEarnDrift(files);

      const snapshot = getOrganismSnapshot(dualBand);
      const snapshotSummary = summarizeSnapshot(snapshot);

      const patterns = detectEvolutionaryPatterns({
        files,
        routes,
        schemaDrift,
        organDrift,
        pageDrift
      });

      const recommendations = buildRecommendations({
        schemaDrift,
        organDrift,
        pageDrift,
        deadComponents,
        orphanedRoutes,
        pulseEarnDrift,
        patterns,
        snapshotSummary
      });

      const driftLevel =
        schemaDrift.length > 0 ||
        organDrift.length > 0 ||
        pageDrift.length > 0 ||
        deadComponents.length > 0 ||
        orphanedRoutes.length > 0
          ? "present"
          : "none";

      const packet = emitEvolutionPacket(
        "organism-overview",
        Object.freeze({
          unusedImports: chunkArray(
            unusedImports.map(stripIdentityAnchors)
          ),
          orphanedRoutes: chunkArray(
            orphanedRoutes.map(stripIdentityAnchors)
          ),
          deadComponents: chunkArray(
            deadComponents.map(stripIdentityAnchors)
          ),
          schemaDrift: chunkArray(schemaDrift.map(stripIdentityAnchors)),
          organDrift: chunkArray(organDrift.map(stripIdentityAnchors)),
          pageDrift: chunkArray(pageDrift.map(stripIdentityAnchors)),
          pulseEarnDrift,
          snapshotSummary,
          patterns,
          recommendations
        }),
        {
          severity: driftLevel === "present" ? "warn" : "info",
          driftLevel
        }
      );

      setCached(
        EVO_CACHE.organismOverview,
        cacheKey,
        packet,
        ORGANISM_OVERVIEW_TTL_MS
      );
      return packet;
    },

    // ----------------------------------------------------------------------
    // FILE‑LEVEL ANALYSIS
    // ----------------------------------------------------------------------
    async analyzeFile(context, filePath) {
      if (!assertOwnerArchitect(context)) return null;

      const cacheKey = filePath;
      const cached = getCached(EVO_CACHE.fileAnalysis, cacheKey);
      if (cached) {
        console.log(
          `aiEvolution-v30: file analysis cache hit "${filePath}".`
        );
        return cached;
      }

      const file = await fsAPI.getFile(filePath);
      if (!file) return null;

      const unusedImports = detectUnusedImports(file);

      const packet = emitEvolutionPacket(
        "file-analysis",
        Object.freeze({
          unusedImports,
          references: file.references || [],
          exports: file.exports || [],
          deadPaths: file.deadPaths || [],
          type: file.type || null,
          name: file.name || filePath
        }),
        {
          severity: unusedImports.length > 0 ? "info" : "info",
          driftLevel: unusedImports.length > 0 ? "present" : "none"
        }
      );

      setCached(EVO_CACHE.fileAnalysis, cacheKey, packet, FILE_ANALYSIS_TTL_MS);
      return packet;
    },

    // ----------------------------------------------------------------------
    // SCHEMA‑LEVEL ANALYSIS
    // ----------------------------------------------------------------------
    async analyzeSchema(context, schemaName) {
      if (!assertOwnerArchitect(context)) return null;

      const cacheKey = schemaName;
      const cached = getCached(EVO_CACHE.schemaAnalysis, cacheKey);
      if (cached) {
        console.log(
          `aiEvolution-v30: schema analysis cache hit "${schemaName}".`
        );
        return cached;
      }

      const schemas = await schemaAPI.getAllSchemas();
      const target = Array.isArray(schemas)
        ? schemas.filter((s) => s.name === schemaName)
        : [];

      const drift = detectSchemaDrift(target);

      const packet = emitEvolutionPacket(
        "schema-analysis",
        Object.freeze({
          schema: schemaName,
          schemaDrift: drift.map(stripIdentityAnchors)
        }),
        {
          severity: drift.length > 0 ? "warn" : "info",
          driftLevel: drift.length > 0 ? "present" : "none"
        }
      );

      setCached(
        EVO_CACHE.schemaAnalysis,
        cacheKey,
        packet,
        SCHEMA_ANALYSIS_TTL_MS
      );
      return packet;
    },

    // ----------------------------------------------------------------------
    // ROUTE‑LEVEL ANALYSIS
    // ----------------------------------------------------------------------
    async analyzeRoute(context, routePrefix) {
      if (!assertOwnerArchitect(context)) return null;

      const cacheKey = routePrefix;
      const cached = getCached(EVO_CACHE.routeAnalysis, cacheKey);
      if (cached) {
        console.log(
          `aiEvolution-v30: route analysis cache hit "${routePrefix}".`
        );
        return cached;
      }

      const routes = await routeAPI.getRouteMap();
      const scoped = Array.isArray(routes)
        ? routes.filter((r) => (r.path || "").startsWith(routePrefix))
        : [];

      const orphaned = detectOrphanedRoutes(scoped);

      const packet = emitEvolutionPacket(
        "route-analysis",
        Object.freeze({
          routePrefix,
          routes: scoped.map(stripIdentityAnchors),
          orphanedRoutes: orphaned.map(stripIdentityAnchors)
        }),
        {
          severity: orphaned.length > 0 ? "warn" : "info",
          driftLevel: orphaned.length > 0 ? "present" : "none"
        }
      );

      setCached(
        EVO_CACHE.routeAnalysis,
        cacheKey,
        packet,
        ROUTE_ANALYSIS_TTL_MS
      );
      return packet;
    }
  });
}

// ============================================================================
//  COMMONJS EXPORT (for Node environments)
// ============================================================================
PulseRealm.PulseAIEvolution = createEvolutionAPI;