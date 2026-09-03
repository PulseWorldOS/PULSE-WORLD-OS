/*
===============================================================================
FILE: /PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PulseWorldImmuneSystem-v30.js
LAYER: WORLD IMMUNE SYSTEM ORGAN — DRIFT & DAMAGE DETECTOR — v30
===============================================================================
EXPORT_META = {
  organ: "PulseWorld.ImmuneSystem",
  layer: "pulse_world",
  stability: "STABLE",
  deterministic: "per-scan",

  consumes: [
    "OfflineLogs",
    "EvolutionEnvelopes",
    "CompilerState",
    "RuntimeState"
  ],

  produces: [
    "DriftReport",
    "RepairPlan"
  ],

  sideEffects: "log_only",
  network: "none",
  filesystem: "none"
}
===============================================================================
*/
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// ============================================================================
// PULSE OS — v30
// WORLD IMMUNE SYSTEM — DRIFT & DAMAGE DETECTION
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



const IMMUNE_SCHEMA_VERSION = "v3";

export const ImmuneRole = Object.freeze({
  organ: "PulseWorld.ImmuneSystem",
  identity: "PulseWorld.ImmuneSystem.v30",
  layer: "pulse_world",
  version: "v30-IMMORTAL",
  stability: "STABLE",
  deterministic: "per-scan",
  sideEffects: "log_only",
  network: "none",
  filesystem: "none"
});

// ---------------------------------------------------------------------------
// INTERNAL HELPERS — ANALYSIS ONLY
// ---------------------------------------------------------------------------
function analyzeLogsForDrift(logs = []) {
  const result = {
    total: logs.length,
    criticalErrors: 0,
    runtimeMountErrors: 0,
    compilerErrors: 0,
    memoryErrors: 0,
    heartbeatErrors: 0,
    routesWithErrors: new Set()
  };

  for (const entry of logs) {
    const level = entry.level || "log";
    const msg = String(entry.message || "");
    const subsystem = entry.subsystem || "unknown";
    const page = entry.page || entry.route || null;

    if (level === "critical" || msg.includes("[CRITICAL]")) {
      result.criticalErrors += 1;
      if (page) result.routesWithErrors.add(page);
    }

    if (msg.includes("MOUNT_ERROR") || msg.includes("UNMOUNT_ERROR")) {
      result.runtimeMountErrors += 1;
      if (page) result.routesWithErrors.add(page);
    }

    if (msg.includes("COMPILE_ERROR") || msg.includes("COMPILE_INVALID_GENOME")) {
      result.compilerErrors += 1;
      if (page) result.routesWithErrors.add(page);
    }

    if (msg.includes("SAVE_ERROR") || msg.includes("LOAD_ERROR") || msg.includes("FLUSH_ERROR")) {
      result.memoryErrors += 1;
      if (page) result.routesWithErrors.add(page);
    }

    if (subsystem === "heart" || subsystem === "heartbeat") {
      if (msg.includes("flush FAILED") || msg.includes("Max retries reached")) {
        result.heartbeatErrors += 1;
      }
    }
  }

  result.routesWithErrors = Array.from(result.routesWithErrors);
  return result;
}

function analyzeMemoryEnvelopes(envelopes = []) {
  let degradedCount = 0;
  let criticalCount = 0;
  const degradedRoutes = new Set();
  const criticalRoutes = new Set();

  for (const env of envelopes) {
    const integrity = env.integrity || {};
    const status = integrity.status || "unknown";
    const routeId = env.routeId || env.route || "unknown";

    if (status === "degraded") {
      degradedCount += 1;
      degradedRoutes.add(routeId);
    } else if (status === "critical") {
      criticalCount += 1;
      criticalRoutes.add(routeId);
    }
  }

  return {
    total: envelopes.length,
    degradedCount,
    criticalCount,
    degradedRoutes: Array.from(degradedRoutes),
    criticalRoutes: Array.from(criticalRoutes)
  };
}

function buildRepairPlan({ logAnalysis, memoryAnalysis }) {
  const tasks = [];

  if (logAnalysis.compilerErrors > 0) {
    tasks.push({
      id: "repair.compiler",
      kind: "recompileRoutes",
      routes: logAnalysis.routesWithErrors,
      reason: "Compiler errors detected in logs"
    });
  }

  if (logAnalysis.runtimeMountErrors > 0) {
    tasks.push({
      id: "repair.runtime",
      kind: "remountRoutes",
      routes: logAnalysis.routesWithErrors,
      reason: "Runtime mount errors detected in logs"
    });
  }

  if (memoryAnalysis.degradedCount > 0 || memoryAnalysis.criticalCount > 0) {
    tasks.push({
      id: "repair.memory",
      kind: "reloadMemoryEnvelopes",
      routes: [
        ...memoryAnalysis.degradedRoutes,
        ...memoryAnalysis.criticalRoutes
      ],
      reason: "Degraded or critical memory envelopes detected"
    });
  }

  if (logAnalysis.heartbeatErrors > 0) {
    tasks.push({
      id: "repair.heartbeat",
      kind: "inspectHeartRhythm",
      routes: [],
      reason: "Heartbeat flush errors detected"
    });
  }

  return {
    schemaVersion: IMMUNE_SCHEMA_VERSION,
    tasks
  };
}

// ---------------------------------------------------------------------------
 // FACTORY — IMMUNE SYSTEM ORGAN v30
// ---------------------------------------------------------------------------
export function createPulseWorldImmuneSystem({
  PulseLoggerStore = null,
  EvolutionMemory = null, // optional: { listEnvelopesForRoutes?: fn }
  log = console.log,
  warn = console.warn
} = {}) {
  const ImmuneState = {
    lastReport: null,
    lastRepairPlan: null,
    lastError: null,
    scanSeq: 0
  };

  function nextSeq() {
    ImmuneState.scanSeq += 1;
    return ImmuneState.scanSeq;
  }

  function safeLog(stage, details = {}) {
    try {
      log(
        `[PulseWorldImmuneSystem-v30] ${stage}`,
        {
          schemaVersion: IMMUNE_SCHEMA_VERSION,
          seq: ImmuneState.scanSeq,
          organ: ImmuneRole.organ,
          version: ImmuneRole.version,
          ...details
        }
      );
    } catch {
      // never throw
    }
  }

  function scan() {
    nextSeq();

    try {
      // 1) Collect logs
      let logs = [];
      if (PulseLoggerStore && typeof PulseLoggerStore.getAll === "function") {
        logs = PulseLoggerStore.getAll();
      }

      const logAnalysis = analyzeLogsForDrift(logs);

      // 2) Collect memory envelopes (optional)
      let envelopes = [];
      if (EvolutionMemory && typeof EvolutionMemory.listEnvelopesForRoutes === "function") {
        envelopes = EvolutionMemory.listEnvelopesForRoutes(logAnalysis.routesWithErrors);
      }

      const memoryAnalysis = analyzeMemoryEnvelopes(envelopes);

      // 3) Build repair plan
      const repairPlan = buildRepairPlan({ logAnalysis, memoryAnalysis });

      const report = {
        schemaVersion: IMMUNE_SCHEMA_VERSION,
        logAnalysis,
        memoryAnalysis,
        repairPlanSummary: {
          taskCount: repairPlan.tasks.length
        }
      };

      ImmuneState.lastReport = report;
      ImmuneState.lastRepairPlan = repairPlan;
      ImmuneState.lastError = null;

      safeLog("SCAN_OK", {
        totalLogs: logAnalysis.total,
        routesWithErrors: logAnalysis.routesWithErrors.length,
        memoryDegraded: memoryAnalysis.degradedCount,
        memoryCritical: memoryAnalysis.criticalCount,
        repairTasks: repairPlan.tasks.length
      });

      return {
        ok: true,
        report,
        repairPlan
      };
    } catch (err) {
      const msg = String(err);
      ImmuneState.lastError = msg;
      warn("[PulseWorldImmuneSystem-v30] SCAN_ERROR", msg);
      safeLog("SCAN_ERROR", { error: msg });
      return { ok: false, error: "ScanError" };
    }
  }

  const PulseWorldImmuneSystem = {
    ImmuneRole,
    ImmuneState,
    scan
  };

  safeLog("Initializing Components..", {
    identity: ImmuneRole.identity,
    version: ImmuneRole.version,
    schemaVersion: IMMUNE_SCHEMA_VERSION
  });

  return PulseWorldImmuneSystem;
}

PulseRealm.WorldImmuneSystem = {
  createPulseWorldImmuneSystem,
  ImmuneRole,
  IMMUNE_SCHEMA_VERSION
}