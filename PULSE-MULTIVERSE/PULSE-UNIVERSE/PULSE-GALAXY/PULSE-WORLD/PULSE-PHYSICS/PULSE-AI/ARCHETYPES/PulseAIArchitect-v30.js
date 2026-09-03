// ============================================================================
//  PULSE OS v30.0‑IMMORTAL‑EVO++++ — ARCHITECT ORGAN
//  System + Identity + Architecture Insight + Drift Radar + Route Graph
//  PURE READ-ONLY. ZERO IDENTITY LEAKAGE. ZERO MUTATION. ZERO TIMING.
//  DUALBAND • PRESSURE-AWARE • OWNER‑ONLY • DETERMINISTIC
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
//  IMMORTAL HELPERS — ZERO TIMING, ZERO RANDOMNESS
// ============================================================================
function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals.layered.organism.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals.binary.pressure != null)
    return binaryVitals.binary.pressure;
  return 0;
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

// IMMORTAL monotonic tick (no Date.now, no randomness)
let ARCHITECT_TICK = 0;
function immortalTick() {
  ARCHITECT_TICK += 1;
  return ARCHITECT_TICK;
}

// Pressure‑aware truncation (deterministic)
function pressureSlice(arrayOrString, maxLow, maxHigh, binaryPressure) {
  const hi = Math.max(maxLow, maxHigh);
  const lo = Math.min(maxLow, maxHigh);
  const limit = binaryPressure >= 0.7 ? lo : hi;

  if (Array.isArray(arrayOrString)) {
    return arrayOrString.slice(0, limit);
  }
  if (typeof arrayOrString === "string") {
    return arrayOrString.slice(0, limit);
  }
  return arrayOrString;
}

// ============================================================================
//  ARCHITECT ORGAN v30 — FACTORY
// ============================================================================
export function createArchitectOrgan({ db, evolutionAPI, personas, chunker } = {}) {
  // --------------------------------------------------------------------------
  // ACCESS CONTROL — OWNER + ARCHITECT PERSONA ONLY
  // --------------------------------------------------------------------------
  function assertOwnerArchitect(context) {
    const isOwner = context.userIsOwner === true;
    const isArchitect =
      context.personaId &&
      personas &&
      personas.ARCHITECT &&
      context.personaId === personas.ARCHITECT;

    if (!isOwner || !isArchitect) {
      console.log("aiArchitect: access denied (not owner+architect).");
      return false;
    }
    return true;
  }

  // --------------------------------------------------------------------------
  // IDENTITY STRIPPER — ZERO IDENTITY LEAKAGE
  // --------------------------------------------------------------------------
  function stripIdentityAnchors(record) {
    if (!record || typeof record !== "object") return record;
    const clone = { ...record };
    delete clone.uid;
    delete clone.userId;
    delete clone.resendToken;
    delete clone.identityRoot;
    delete clone.sessionRoot;
    delete clone.deviceFingerprint;
    delete clone.ip;
    delete clone.userAgent;
    return clone;
  }

  async function fetchOwnerCollection(context, collection, options = {}) {
    if (!assertOwnerArchitect(context)) return [];
    const rows = await db.getCollection(collection, options);
    return rows.map(stripIdentityAnchors);
  }

  function prewarm() {
    return true;
  }

  // --------------------------------------------------------------------------
  // WEB STACK MAPPER v2 — LAYERED VIEW
  // --------------------------------------------------------------------------
  function mapWebStack(filePath) {
    const lower = String(filePath || "").toLowerCase();

    let layer = "unknown";
    let kind = "unknown";

    if (lower.endsWith(".html")) {
      layer = "presentation";
      kind = "html-document";
    } else if (lower.endsWith(".css")) {
      layer = "presentation";
      kind = "style-sheet";
    } else if (lower.endsWith(".js")) {
      layer = "logic";
      kind = "javascript-module";
    } else if (lower.endsWith(".json")) {
      layer = "config";
      kind = "schema-or-config";
    } else if (lower.endsWith(".ts")) {
      layer = "logic";
      kind = "typescript-module";
    } else if (lower.endsWith(".sql")) {
      layer = "data";
      kind = "sql-schema-or-query";
    }

    return {
      filePath,
      layer,
      kind,
      message:
        `File mapped as ${kind} in the ${layer} layer. ` +
        "HTML/CSS/JS/TS/SQL are treated as imports in a layered web stack."
    };
  }

  function describeLayering() {
    return {
      layers: [
        "binary / hardware",
        "OS / runtime",
        "backend services",
        "API / routing",
        "domain logic",
        "frontend logic (JS/TS)",
        "presentation (HTML/CSS)"
      ],
      message:
        "Architecture is modeled as layers-of-layers; each layer can have its own organs, observers, and arteries."
    };
  }

  // --------------------------------------------------------------------------
  // FILE SCAN v30 — READ‑ONLY, PRESSURE‑AWARE, CHUNKER‑AWARE
  // --------------------------------------------------------------------------
  async function scanFile(context, { filePath, contents, binaryVitals = {} }) {
    if (!assertOwnerArchitect(context)) return null;

    const stackInfo = mapWebStack(filePath);
    const size = typeof contents === "string" ? contents.length : 0;
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const basic = {
      filePath,
      size,
      empty: size === 0,
      stackInfo
    };

    let evo = null;
    if (evolutionAPI.scanFile) {
      evo = await evolutionAPI.scanFile(context, { filePath, contents });
    } else if (evolutionAPI.analyzeFile) {
      evo = await evolutionAPI.analyzeFile(context, filePath);
    }

    const tick = immortalTick();

    const payload = {
      ...basic,
      evo,
      tick,
      note:
        binaryPressure >= 0.7
          ? "High system load — architect view simplified."
          : "Architect view generated — read-only structural insight."
    };

    if (chunker.chunkJSON) {
      chunker.chunkJSON(payload, {
        label: "architect.scanFile",
        band: "symbolic"
      });
    }

    console.log("aiArchitect: scanFile completed.");

    return Object.freeze(payload);
  }

  // --------------------------------------------------------------------------
  // DEAD COMPONENTS / ORPHAN ROUTES / SCHEMA DRIFT — v30
  // --------------------------------------------------------------------------
  async function getDeadComponents(context, { binaryVitals = {} } = {}) {
    if (!assertOwnerArchitect(context) || !evolutionAPI.getDeadComponents) {
      return Object.freeze([]);
    }
    const rows = await evolutionAPI.getDeadComponents(context);
    console.log("aiArchitect: fetched dead components.");
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const sliced = pressureSlice(rows, 20, rows.length, binaryPressure);
    return Object.freeze(sliced);
  }

  async function getOrphanedRoutes(context, { binaryVitals = {} } = {}) {
    if (!assertOwnerArchitect(context) || !evolutionAPI.getOrphanedRoutes) {
      return Object.freeze([]);
    }
    const rows = await evolutionAPI.getOrphanedRoutes(context);
    console.log("aiArchitect: fetched orphaned routes.");
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const sliced = pressureSlice(rows, 20, rows.length, binaryPressure);
    return Object.freeze(sliced);
  }

  async function getSchemaDriftReport(context, { binaryVitals = {} } = {}) {
    if (!assertOwnerArchitect(context) || !evolutionAPI.getSchemaDriftReport) {
      return null;
    }
    const report = await evolutionAPI.getSchemaDriftReport(context);
    console.log("aiArchitect: fetched schema drift report.");
    const binaryPressure = extractBinaryPressure(binaryVitals);

    if (!report) return null;

    if (binaryPressure >= 0.7 && Array.isArray(report.issues)) {
      return {
        ...report,
        issues: report.issues.slice(0, 20)
      };
    }

    return report;
  }

  // --------------------------------------------------------------------------
  // ROUTE GRAPH + SERVICE MAP v30 — PURE STRUCTURE
  // --------------------------------------------------------------------------
  async function getRouteGraph(context, { binaryVitals = {} } = {}) {
    if (!assertOwnerArchitect(context) || !evolutionAPI.getRouteGraph) {
      return null;
    }
    const graph = await evolutionAPI.getRouteGraph(context);
    const binaryPressure = extractBinaryPressure(binaryVitals);

    if (!graph || !Array.isArray(graph.routes)) return graph;

    const routes = pressureSlice(graph.routes, 50, graph.routes.length, binaryPressure);
    return Object.freeze({
      ...graph,
      routes
    });
  }

  async function getServiceMap(context, { binaryVitals = {} } = {}) {
    if (!assertOwnerArchitect(context) || !evolutionAPI.getServiceMap) {
      return null;
    }
    const map = await evolutionAPI.getServiceMap(context);
    const binaryPressure = extractBinaryPressure(binaryVitals);

    if (!map || !Array.isArray(map.services)) return map;

    const services = pressureSlice(map.services, 50, map.services.length, binaryPressure);
    return Object.freeze({
      ...map,
      services
    });
  }

  // --------------------------------------------------------------------------
  // ARCHITECT ARTERY v5 — SYSTEM PRESSURE + DRIFT + ROUTES
  // --------------------------------------------------------------------------
  function architectArtery({ diagnostics = {}, binaryVitals = {} } = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const deadCount = diagnostics.deadComponents || 0;
    const orphanCount = diagnostics.orphanRoutes || 0;
    const schemaIssues = diagnostics.schemaIssues || 0;
    const drift = diagnostics.driftDetected === true;
    const routeCount = diagnostics.routeCount || 0;
    const serviceCount = diagnostics.serviceCount || 0;

    const localPressure =
      (deadCount ? 0.25 : 0) +
      (orphanCount ? 0.2 : 0) +
      (schemaIssues ? 0.25 : 0) +
      (drift ? 0.3 : 0) +
      (routeCount > 500 ? 0.2 : 0) +
      (serviceCount > 100 ? 0.2 : 0);

    const pressure = Math.max(
      0,
      Math.min(1, 0.6 * localPressure + 0.4 * binaryPressure)
    );

    const artery = {
      organism: {
        pressure,
        pressureBucket: bucketPressure(pressure)
      },
      architecture: {
        deadComponents: deadCount,
        orphanRoutes: orphanCount,
        schemaIssues,
        drift,
        routeCount,
        serviceCount
      },
      tick: immortalTick()
    };

    if (chunker.chunkJSON) {
      chunker.chunkJSON(artery, {
        label: "architect.artery",
        band: "symbolic"
      });
    }

    return artery;
  }

  // --------------------------------------------------------------------------
  // PUBLIC SURFACE v30 — OWNER‑ONLY, READ‑ONLY
  // --------------------------------------------------------------------------
  return Object.freeze({
    meta: {
      id: "pulse-touch-architect",
      version: (PulseRealm.PULSE_TOUCH_VERSION) || "v30",
      layer: "touch",
      role: "architect",
      evo: {
        band: (PulseRealm.__PULSE_TOUCH__.band) || "dualband",
        mode: (PulseRealm.__PULSE_TOUCH__.mode) || "daemon",
        profile: "architect-v30-immortal"
      }
    },
    prewarm,

    log(message) {
      console.debug("[aiArchitect]", message);
    },

    // IDENTITY + SECURITY (OWNER VIEW, STRIPPED)
    async getIdentityHistory(context, options = {}) {
      const rows = await fetchOwnerCollection(context, "identityHistory", options);
      console.log("aiArchitect: fetched identityHistory.");
      return Object.freeze(rows);
    },

    async getSecurityViolations(context, options = {}) {
      const rows = await fetchOwnerCollection(context, "securityViolations", options);
      console.log("aiArchitect: fetched securityViolations.");
      return Object.freeze(rows);
    },

    // SYSTEM LOGS (DESIGN-TIME)
    async getFunctionErrors(context, options = {}) {
      const rows = await fetchOwnerCollection(context, "functionErrors", options);
      return Object.freeze(rows);
    },

    async getChangeLogs(context, options = {}) {
      const rows = await fetchOwnerCollection(context, "CHANGES", options);
      return Object.freeze(rows);
    },

    // ENVIRONMENT + POWER (OWNER VIEW)
    async getEnvironmentInternal(context, options = {}) {
      const rows = await fetchOwnerCollection(context, "environment", options);
      return Object.freeze(rows);
    },

    async getPowerHistoryInternal(context, options = {}) {
      const rows = await fetchOwnerCollection(context, "powerHistory", options);
      return Object.freeze(rows);
    },

    // EVOLUTIONARY ANALYSIS (via evolutionAPI)
    async getOrganismOverview(context, { binaryVitals = {} } = {}) {
      if (!assertOwnerArchitect(context) || !evolutionAPI.getOrganismOverview) return null;
      const overview = await evolutionAPI.getOrganismOverview(context);
      const binaryPressure = extractBinaryPressure(binaryVitals);

      if (!overview || !Array.isArray(overview.organs)) return overview;

      const organs = pressureSlice(overview.organs, 50, overview.organs.length, binaryPressure);
      return {
        ...overview,
        organs
      };
    },

    async analyzeFile(context, filePath, { binaryVitals = {} } = {}) {
      if (!assertOwnerArchitect(context) || !evolutionAPI.analyzeFile) return null;
      const stackInfo = mapWebStack(filePath);
      const evo = await evolutionAPI.analyzeFile(context, filePath);
      const binaryPressure = extractBinaryPressure(binaryVitals);

      const result = {
        stackInfo,
        evo:
          binaryPressure >= 0.7 &&
          evo &&
          Array.isArray(evo.issues)
            ? { ...evo, issues: evo.issues.slice(0, 20) }
            : evo
      };

      if (chunker.chunkJSON) {
        chunker.chunkJSON(result, {
          label: "architect.analyzeFile",
          band: "symbolic"
        });
      }

      return result;
    },

    async analyzeRoute(context, routeId) {
      if (!assertOwnerArchitect(context) || !evolutionAPI.analyzeRoute) return null;
      return evolutionAPI.analyzeRoute(context, routeId);
    },

    async analyzeSchema(context, schemaName) {
      if (!assertOwnerArchitect(context) || !evolutionAPI.analyzeSchema) return null;
      return evolutionAPI.analyzeSchema(context, schemaName);
    },

    // v30 ADDITIONS
    getDeadComponents,
    getOrphanedRoutes,
    getSchemaDriftReport,
    getRouteGraph,
    getServiceMap,
    scanFile,
    describeLayering,
    mapWebStack,
    architectArtery
  });
}


export default createArchitectOrgan;

PulseRealm.AIArchitect = {
    createArchitectOrgan
}