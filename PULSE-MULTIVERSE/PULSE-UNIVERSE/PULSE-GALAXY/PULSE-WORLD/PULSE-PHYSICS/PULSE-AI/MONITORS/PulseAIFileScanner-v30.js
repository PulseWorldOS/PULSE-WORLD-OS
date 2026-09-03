// ============================================================================
// FILE: /PULSE-AI/PulseFileScanner-v30-IMMORTAL++.js
// PULSE OS v30‑IMMORTAL++ — FILE SCANNER ORGAN
// Symbolic Cognition • Structural Analysis • Drift + Lineage + Trust + Advantage
// PURE SYMBOLIC ENGINE. ZERO MUTATION. DUALBAND + PULSE-NET SAFE.
// Global artery registry • chunk-hints aware • v30 IMMORTAL++ (no meta, no wall-clock)
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

import {fs, path} from "../../../PULSE-WORLD-PATH.js";
// ============================================================================
// HELPERS — BUCKETS + PRESSURE + TRUST / COMPLEXITY / ADVANTAGE
// ============================================================================

function _clamp01(v) {
  const n = typeof v === "number" ? v : 0;
  if (n <= 0) return 0;
  if (n >= 1) return 1;
  return n;
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals.layered.organism.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals.binary.pressure != null)
    return binaryVitals.binary.pressure;
  return 0;
}

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 1000003;
  }
  return `h${h}`;
}

function computeComplexityMetrics(content) {
  const length = content.length;
  const lines = content.split(/\r?\n/).length;
  const importCount = (content.match(/import\s+/g) || []).length;
  const requireCount = (content.match(/require\(/g) || []).length;
  const exportCount = (content.match(/export\s+/g) || []).length;
  const functionCount = (content.match(/function\s+|=>/g) || []).length;
  const classCount = (content.match(/class\s+[A-Za-z0-9_]+/g) || []).length;

  const complexityScore = Math.min(
    1,
    (importCount +
      requireCount +
      exportCount +
      functionCount +
      classCount) / 250
  );

  return {
    length,
    lines,
    importCount,
    requireCount,
    exportCount,
    functionCount,
    classCount,
    complexityScore
  };
}

function computeTrustSignals(report, complexity) {
  const driftCount = report.drift.length || 0;
  const hasMixedModule = report.drift.includes("MIXED_MODULE_SYSTEM");
  const hasCjsOnly = report.drift.includes("CJS_ONLY_ORGAN");
  const heavyImports = complexity.importCount + complexity.requireCount > 20;
  const heavyExports = complexity.exportCount > 20;

  const honeypotRisk =
    hasMixedModule || heavyImports
      ? Math.min(1, 0.4 + complexity.complexityScore)
      : 0.1;

  const dominanceRisk =
    driftCount > 0 || heavyExports
      ? Math.min(1, 0.5 + complexity.complexityScore)
      : 0.05;

  const anomalyScore = Math.min(
    1,
    driftCount * 0.2 +
      (hasMixedModule ? 0.3 : 0) +
      (heavyImports ? 0.2 : 0) +
      (heavyExports ? 0.1 : 0) +
      complexity.complexityScore * 0.3
  );

  return {
    honeypotRisk,
    dominanceRisk,
    anomalyScore,
    driftCount
  };
}

// v24++: advantage field — time saved / risk avoided / review priority
function computeAdvantageField({ trustSignals, complexity }) {
  const anomaly = trustSignals.anomalyScore ?? 0;
  const honeypot = trustSignals.honeypotRisk ?? 0;
  const dominance = trustSignals.dominanceRisk ?? 0;

  const reviewPriority = Math.min(
    1,
    0.4 * anomaly + 0.3 * honeypot + 0.3 * dominance
  );

  const timeSavedMs = Math.round(
    (complexity.lines || 0) * (0.5 + anomaly * 1.5)
  );

  return {
    advantageScore: reviewPriority,
    advantageBand:
      reviewPriority >= 0.7
        ? "critical"
        : reviewPriority >= 0.4
        ? "elevated"
        : "normal",
    cascadeLevel: reviewPriority >= 0.7 ? 3 : reviewPriority >= 0.4 ? 2 : 1,
    field: "file_scanner",
    timeSavedMs,
    description:
      "Symbolic-only file scanner advantage: review prioritization + time-saved estimate for high-risk files."
  };
}

// ============================================================================
// ANALYSIS ENGINE — Pure symbolic cognition
// ============================================================================

function analyzeContent(filePath, content) {
  const report = {
    ok: true,
    filePath,
    size: content.length,
    esmExports: [],
    cjsExports: [],
    imports: [],
    drift: [],
    layerViolations: [],
    visibility: "unknown",
    summary: ""
  };

  const esmExportRegex = /export\s+(?:const|function|class)\s+([A-Za-z0-9_]+)/g;
  let match;
  while ((match = esmExportRegex.exec(content)) !== null) {
    report.esmExports.push(match[1]);
  }

  const cjsExportRegex = /module\.exports\s*=\s*{([^}]+)}/;
  const cjsMatch = content.match(cjsExportRegex);

  if (cjsMatch) {
    const names = cjsMatch[1]
      .split(",")
      .map((s) => s.trim().replace(/:.*$/, ""))
      .filter(Boolean);

    report.cjsExports.push(...names);
  }

  const importRegex = /import\s+.*?from\s+["'](.+?)["']/g;
  while ((match = importRegex.exec(content)) !== null) {
    report.imports.push(match[1]);
  }

  if (report.cjsExports.length > 0 && report.esmExports.length === 0) {
    report.drift.push("CJS_ONLY_ORGAN");
  }

  if (report.esmExports.length > 0 && report.cjsExports.length > 0) {
    report.drift.push("MIXED_MODULE_SYSTEM");
  }

  report.visibility = report.esmExports.length > 0 ? "visible" : "invisible";

  report.summary = generateSummary(report);

  return report;
}

function generateSummary(r) {
  return `
File: ${r.filePath}
Size: ${r.size} chars

ESM Exports: ${r.esmExports.join(", ") || "none"}
CJS Exports: ${r.cjsExports.join(", ") || "none"}

Visibility: ${r.visibility}
Drift: ${r.drift.join(", ") || "none"}

Imports:
${r.imports.map((i) => " - " + i).join("\n") || " none"}
`.trim();
}

// ============================================================================
// GLOBAL SCANNER ARTERY REGISTRY v5+ (READ-ONLY, METRICS-ONLY)
// ============================================================================

const _globalScannerArteryRegistry = new Map();

function _registryKey(id) {
  return id || "default";
}

export function getGlobalScannerArteries() {
  const out = {};
  for (const [k, v] of _globalScannerArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ============================================================================
// FILE SCANNER ARTERY v5 — Symbolic-only, deterministic, trust + advantage aware
// ============================================================================

export function getScannerArterySnapshotV5({
  ok = false,
  filePath = "",
  report = null,
  binaryVitals = {},
  dualBand = null,
  trust = null,
  identitySnapshot = null,
  environmentSnapshot = null,
  scannerId = "PulseFileScanner"
} = {}) {
  const basePressure = extractBinaryPressure(binaryVitals);

  const driftCount = report.drift.length || 0;
  const importCount = report.imports.length || 0;
  const esmCount = report.esmExports.length || 0;
  const cjsCount = report.cjsExports.length || 0;

  const localPressure =
    driftCount > 0
      ? 0.6
      : esmCount > 0 && cjsCount > 0
      ? 0.5
      : importCount > 10
      ? 0.3
      : 0.1;

  const fusedPressure = Math.max(
    0,
    Math.min(1, 0.7 * localPressure + 0.3 * basePressure)
  );

  const complexity = trust.complexity || null;
  const trustSignals = trust.trustSignals || null;
  const advantage = trust.advantage || null;

  const honeypotRisk = trustSignals.honeypotRisk ?? 0;
  const dominanceRisk = trustSignals.dominanceRisk ?? 0;
  const anomalyScore = trustSignals.anomalyScore ?? 0;

  const arterySignature = computeHash(
    [
      "SCANNER_ARTERY_V5",
      scannerId,
      filePath,
      fusedPressure.toFixed(3),
      driftCount,
      importCount,
      esmCount,
      cjsCount,
      honeypotRisk.toFixed(3),
      dominanceRisk.toFixed(3),
      anomalyScore.toFixed(3),
      advantage.advantageScore.toFixed(3) ?? "0.000"
    ].join("::")
  );

  const dualBandContext = dualBand.artery || null;

  const identityField = identitySnapshot
    ? {
        uid: identitySnapshot.uid || null,
        presenceBand: identitySnapshot.presence.band || "unknown",
        advantageBand: identitySnapshot.advantage.advantageBand || "neutral",
        topologyBandSource: identitySnapshot.topology.bandSource || "identity",
        binarySignature: identitySnapshot.binarySignature || null
      }
    : null;

  const environmentField = environmentSnapshot
    ? {
        runtime: environmentSnapshot.runtime || null,
        origin: environmentSnapshot.origin || null,
        page: environmentSnapshot.page || null,
        online: environmentSnapshot.online ?? null
      }
    : null;

  const chunkHints = {
    backendProfile: "backend-logs",
    aiProfile: "backend-logs",
    presenceTag: "file-scanner",
    band: "dual",
    worldBand: "backend",
    estimatedBytes: complexity.length || 0
  };

  const artery = Object.freeze({
    organism: {
      pressure: fusedPressure,
      pressureBucket: bucketPressure(fusedPressure)
    },
    file: {
      ok,
      filePath,
      driftCount,
      esmCount,
      cjsCount,
      importCount,
      complexity
    },
    binary: {
      pressure: basePressure,
      pressureBucket: bucketPressure(basePressure)
    },
    trust: {
      honeypotRisk,
      dominanceRisk,
      anomalyScore
    },
    advantage,
    dualBand: {
      artery: dualBandContext
    },
    identity: identityField,
    environment: environmentField,
    chunkHints,
    meta: {
      version: "v30-IMMORTAL++",
      epoch: 0,
      identity: null,
      scannerId,
      arterySignature
    }
  });

  _globalScannerArteryRegistry.set(_registryKey(scannerId), artery);

  return artery;
}

// ============================================================================
// FILE SCANNER FACTORY — v30‑IMMORTAL++
// ============================================================================

export function createPulseFileScanner({
  id = "PulseFileScanner",
  backendMode = false,
  Evolution = null,
  TrustFabric = null,
  JuryFrame = null,
  binaryVitals = {},
  dualBand = null,
  identitySnapshot = null,
  environmentSnapshot = null
} = {}) {

  function prewarm() {
    return {
      ok: true,
      epoch: 0,
      identity: null,
      id
    };
  }

  function scanFile(filePath) {
    if (!backendMode) {
      return {
        ok: false,
        error: "BACKEND_DISABLED",
        message: "File scanning requires backendMode=true",
        filePath,
        artery: getScannerArterySnapshotV5({
          ok: false,
          filePath,
          binaryVitals,
          report: null,
          dualBand,
          trust: null,
          identitySnapshot,
          environmentSnapshot,
          scannerId: id
        })
      };
    }

    const fullPath = path.resolve(process.cwd(), filePath);

    if (!fs.existsSync(fullPath)) {
      Evolution.recordLineage("scanner-file-not-found", {
        filePath,
        epoch: 0,
        scannerId: id
      });
      TrustFabric.recordEvidence("scanner-file-not-found", {
        filePath,
        epoch: 0,
        scannerId: id
      });

      return {
        ok: false,
        error: "FILE_NOT_FOUND",
        filePath,
        fullPath,
        artery: getScannerArterySnapshotV5({
          ok: false,
          filePath,
          binaryVitals,
          report: null,
          dualBand,
          trust: null,
          identitySnapshot,
          environmentSnapshot,
          scannerId: id
        })
      };
    }

    const content = fs.readFileSync(fullPath, "utf8");
    const report = analyzeContent(filePath, content);
    const complexity = computeComplexityMetrics(content);
    const trustSignals = computeTrustSignals(report, complexity);
    const advantage = computeAdvantageField({ trustSignals, complexity });

    Evolution.recordLineage("scanner-file-analyzed", {
      filePath,
      epoch: 0,
      drift: report.drift,
      complexity,
      advantage,
      scannerId: id
    });
    Evolution.scanDrift({ scannerReport: report });

    TrustFabric.recordEvidence("scanner-file-analyzed", {
      filePath,
      epoch: 0,
      trustSignals,
      complexity,
      advantage,
      scannerId: id
    });

    JuryFrame.submitScannerEvidence({
      filePath,
      report,
      complexity,
      trustSignals,
      advantage,
      epoch: 0,
      scannerId: id
    });

    const artery = getScannerArterySnapshotV5({
      ok: true,
      filePath,
      report,
      binaryVitals,
      dualBand,
      trust: { complexity, trustSignals, advantage },
      identitySnapshot,
      environmentSnapshot,
      scannerId: id
    });

    return {
      ...report,
      complexity,
      trustSignals,
      advantage,
      artery
    };
  }

  return Object.freeze({
    id,
    prewarm,
    scanFile,
    getScannerArterySnapshotV5,
    getGlobalScannerArteries
  });
}

PulseRealm.PulseAIFileScanner = createPulseFileScanner;