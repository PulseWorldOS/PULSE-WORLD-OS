/*
===============================================================================
FILE: /PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PulsePageScanner-v30.js
LAYER: A2 DRIFT INTELLIGENCE • v30-IMMORTAL++
===============================================================================

EXPORT_META = {
  organ: "PulseUI.PageScanner",
  layer: "pulse_ui",
  stability: "IMMORTAL",
  deterministic: true,
  pure: false,

  consumes: [
    "SourceA",
    "SourceB",
    "Context"
  ],

  produces: [
    "DriftPacket",
    "StructuralDrift",
    "LineageDrift",
    "ModuleModeDrift",
    "ExportDrift",
    "ContractDrift",
    "PathDrift"
  ],

  sideEffects: "indexeddb_and_corememory_write_only",
  network: "none",
  filesystem: "none",
  storage: "indexeddb_only"
}
*/
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

import { PulseCoreGMemory } from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";

const C_ID   = "color:#29B6F6; font-weight:bold; font-family:monospace;";
const C_OK   = "color:#00FF9C; font-family:monospace;";
const C_INFO = "color:#E8F8FF; font-family:monospace;";
const C_WARN = "color:#FFE066; font-family:monospace;";
const C_ERR  = "color:#FF3B3B; font-weight:bold; font-family:monospace;";

console.log("%c🌐 PULSE MULTIVERSAL BOOT v40.0 — [PulseBootScanner v30] %cA2 Drift Intelligence %c→ %s",
    C_ID, C_INFO, C_OK,
    " Scanning Environment.."
  );
// ============================================================================
//  IMMORTAL++: NO DIRECT BRIDGE IMPORT — ALWAYS USE GLOBAL BRIDGE
// ============================================================================

const PAGESCANNER_SCHEMA_VERSION = "30.0";
const PAGESCANNER_VERSION = "30.0-IMMORTAL++";
const PAGESCANNER_ROUTE_ID = "pageScanner";




// ============================================================================
//  IMMORTAL++ BRIDGE RESOLUTION — NEVER IMPORT, NEVER TDZ
// ============================================================================

function getBridge() {
  try {
    return PulseRealm.PulseProofBridge || null;
  } catch {
    return null;
  }
}

function getCoreMemory() {
  return PulseCoreGMemory || null;
}

function getDiagnosticsBus() {
  const b = getBridge();
  return b.diagnosticsBus || null;
}

function getEvidenceBus() {
  const b = getBridge();
  return b.evidenceBus || null;
}

const PAGESCANNER_DB_NAME = "PulsePageScannerDB";
const PAGESCANNER_STORE_NAME = "buffer";
const PAGESCANNER_DB_MAX = 4000;

function openPageScannerDB() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      resolve(null);
      return;
    }

    const req = indexedDB.open(PAGESCANNER_DB_NAME, 1);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(PAGESCANNER_STORE_NAME)) {
        const store = db.createObjectStore(PAGESCANNER_STORE_NAME, {
          keyPath: "id",
          autoIncrement: true
        });
        store.createIndex("ts", "ts", { unique: false });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function psLoadBuffer(limit = PAGESCANNER_DB_MAX) {
  try {
    const db = await openPageScannerDB();
    if (!db) return [];

    const tx = db.transaction(PAGESCANNER_STORE_NAME, "readonly");
    const store = tx.objectStore(PAGESCANNER_STORE_NAME);
    const index = store.index("ts");

    const results = [];
    const req = index.openCursor(null, "next");

    return await new Promise((resolve) => {
      req.onsuccess = () => {
        const cursor = req.result;
        if (!cursor) {
          const trimmed =
            results.length > limit
              ? results.slice(results.length - limit)
              : results;
          resolve(trimmed);
          return;
        }
        results.push(cursor.value);
        cursor.continue();
      };
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

function psMirrorBufferToCoreMemory(buf) {
  try {
    const core = getCoreMemory();
    if (!core || typeof core.setRouteSnapshot !== "function") return;

    const envelope = {
      schemaVersion: PAGESCANNER_SCHEMA_VERSION,
      version: PAGESCANNER_VERSION,
      routeId: PAGESCANNER_ROUTE_ID,
      buffer: buf,
      timestamp: PulseRealm.PulseNOW
    };

    core.setRouteSnapshot(PAGESCANNER_ROUTE_ID, envelope);
  } catch {
    // best-effort only
  }
}

async function psSaveEntry(entry) {
  try {
    const db = await openPageScannerDB();
    if (!db) return;

    const tx = db.transaction(PAGESCANNER_STORE_NAME, "readwrite");
    const store = tx.objectStore(PAGESCANNER_STORE_NAME);
    store.add(entry);

    tx.oncomplete = async () => {
      // After write, trim + mirror
      const buf = await psLoadBuffer(PAGESCANNER_DB_MAX);
      psMirrorBufferToCoreMemory(buf);
    };
    tx.onerror = () => {};
  } catch {
    // best-effort only
  }
}

async function psClearDB() {
  try {
    const db = await openPageScannerDB();
    if (!db) return;

    const tx = db.transaction(PAGESCANNER_STORE_NAME, "readwrite");
    const store = tx.objectStore(PAGESCANNER_STORE_NAME);
    store.clear();

    tx.oncomplete = () => {};
    tx.onerror = () => {};
  } catch {
    // best-effort only
  }
}

function appendPageScannerRecord(kind, payload) {
  const entry = {
    ts: PulseRealm.PulseNOW,
    schemaVersion: PAGESCANNER_SCHEMA_VERSION,
    kind,
    payload
  };

  psSaveEntry(entry);

  // Diagnostics bus mirror
  try {
    getDiagnosticsBus().emit("PageScanner.record", entry);
  } catch {}

  // Evidence bus mirror (low-entropy drift intel)
  try {
    getEvidenceBus().emit("PageScanner.trace", {
      kind,
      ts: entry.ts,
      schemaVersion: PAGESCANNER_SCHEMA_VERSION
    });
  } catch {}
}

export const PulsePageScannerStore = {
  async getAll() {
    return psLoadBuffer(PAGESCANNER_DB_MAX);
  },

  async tail(n = 200) {
    const buf = await psLoadBuffer(PAGESCANNER_DB_MAX);
    return buf.slice(Math.max(0, buf.length - n));
  },

  async clear() {
    psClearDB();

    try {
      const core = getCoreMemory();
      core.setRouteSnapshot(PAGESCANNER_ROUTE_ID, {
        schemaVersion: PAGESCANNER_SCHEMA_VERSION,
        version: PAGESCANNER_VERSION,
        routeId: PAGESCANNER_ROUTE_ID,
        buffer: [],
        cleared: true,
        timestamp: PulseRealm.PulseNOW
      });
    } catch {}
  }
};

// ============================================================================
// ROLE
// ============================================================================

export const PageScannerRole = {
  type: "Organ",
  subsystem: "UI",
  layer: "PageScanner",
  version: PAGESCANNER_VERSION,
  identity: "PulsePageScanner-v30",

  evo: {
    driftProof: true,
    deterministic: true,
    dualBand: true,
    binaryAware: true,
    symbolicAware: true,
    structuralEngine: true,
    lineageEngine: true,
    moduleEngine: true,
    exportEngine: true,
    contractEngine: true,
    pathEngine: true,
    futureEvolutionReady: true,
    evidenceAware: true,
    diagnosticsAware: true,
    adminPanelAware: true,
    portalAware: true,
    touchAware: true,
    uiFlowAware: true,
    errorSpineAware: true,
    coreMemoryMirrored: true,
    overmindAware: true,
    governorAware: true,
    timeAxisAware: true,
    sessionAware: true,
    multiMindAware: true,
    oneBandAligned: true
  }
};

// ============================================================================
// DRIFT TIERS + CHANNELS
// ============================================================================

const DriftTiers = Object.freeze({
  none: "none",
  low: "low",
  medium: "medium",
  high: "high",
  critical: "critical",
  immortal: "immortal"
});

const DriftChannels = Object.freeze({
  ui: "ui",
  system: "system",
  evolution: "evolution",
  memory: "memory",
  devtools: "devtools",
  earn: "earn",
  admin: "admin",
  portal: "portal",
  touch: "touch",
  ai: "ai"
});

// ============================================================================
// INTERNAL: deterministic signature generator
// ============================================================================

function deterministicSignature(obj) {
  const json = JSON.stringify(obj || {});
  let hash = 0;
  for (let i = 0; i < json.length; i++) {
    hash = (hash * 31 + json.charCodeAt(i)) >>> 0;
  }
  return "PSIG_" + hash.toString(16).padStart(8, "0");
}

function safeNormalizeError(err, origin) {
  try {
    const packet = PulseRealm.PulseUIErrors.normalizeError(err, origin);
    appendPageScannerRecord("error", { origin, packet });
    PulseRealm.PulseUIErrors.broadcast(packet);
  } catch {}
}

// ---------------------------------------------------------------------------
// Extract variable names from JS source
// ---------------------------------------------------------------------------

function extractVars(source = "") {
  appendPageScannerRecord("extractVars_in", { sourceLength: source.length });
  try {
    const vars = [...source.matchAll(/(?:const|let|var)\s+([A-Za-z0-9_]+)/g)].map(
      (m) => m[1]
    );
    appendPageScannerRecord("extractVars_out", { vars });
    return vars;
  } catch (err) {
    safeNormalizeError(err, "pagescanner.extractVars");
    return [];
  }
}

// ---------------------------------------------------------------------------
// Normalize names (strip suffixes, digits, casing)
// ---------------------------------------------------------------------------

function normalizeName(name = "") {
  appendPageScannerRecord("normalizeName_in", { name });
  try {
    const out = name
      .replace(/[\d_]+$/, "")
      .replace(/(Field|State|Mode|Organ|Organism)$/i, "")
      .toLowerCase();
    appendPageScannerRecord("normalizeName_out", { out });
    return out;
  } catch (err) {
    safeNormalizeError(err, "pagescanner.normalize");
    return "";
  }
}

// ---------------------------------------------------------------------------
// Detect lineage drift between two sets of variables
// ---------------------------------------------------------------------------

function detectLineage(varsA = [], varsB = []) {
  appendPageScannerRecord("detectLineage_in", { varsA, varsB });
  try {
    const splits = [];

    for (const a of varsA) {
      const normA = normalizeName(a);

      for (const b of varsB) {
        const normB = normalizeName(b);

        if (normA === normB && a !== b) {
          splits.push({ canonical: a, drifted: b });
        }
      }
    }

    appendPageScannerRecord("detectLineage_out", { splits });
    return splits;
  } catch (err) {
    safeNormalizeError(err, "pagescanner.detectLineage");
    return [];
  }
}

// ---------------------------------------------------------------------------
// Detect and rewrite illegal admin imports (frontend-safe)
// ---------------------------------------------------------------------------

function rewriteIllegalImports(source = "") {
  appendPageScannerRecord("rewriteIllegalImports_in", {
    sourceLength: source.length
  });
  try {
    let rewritten = false;
    let out = source;

    if (out.includes("firebase-admin")) {
      out = out.replace(/firebase-admin/g, "firebase/functions");
      rewritten = true;
    }

    if (out.includes("@google-cloud/")) {
      out = out.replace(/@google-cloud\//g, "@google-cloud/browser/");
      rewritten = true;
    }

    appendPageScannerRecord("rewriteIllegalImports_out", {
      rewritten
    });
    return out;
  } catch (err) {
    safeNormalizeError(err, "pagescanner.rewriteIllegalImports");
    return source;
  }
}

// ---------------------------------------------------------------------------
// Detect module mode drift (ESM vs CJS)
// ---------------------------------------------------------------------------

function detectModuleMode(source = "") {
  appendPageScannerRecord("detectModuleMode_in", {
    sourceLength: source.length
  });
  try {
    const esm = /import\s+.*from\s+['"]/.test(source);
    const cjs = /require\s*\(/.test(source);

    const out = Object.freeze({
      esm,
      cjs,
      mixed: esm && cjs
    });

    appendPageScannerRecord("detectModuleMode_out", out);
    return out;
  } catch (err) {
    safeNormalizeError(err, "pagescanner.detectModuleMode");
    const out = Object.freeze({ esm: false, cjs: false, mixed: false });
    appendPageScannerRecord("detectModuleMode_out_error", out);
    return out;
  }
}

// ---------------------------------------------------------------------------
// Detect export drift (ESM/CJS)
// ---------------------------------------------------------------------------

function detectExportDrift(source = "", vars = []) {
  appendPageScannerRecord("detectExportDrift_in", {
    sourceLength: source.length,
    vars
  });
  try {
    const hasESM = /export\s+/.test(source);
    const hasCJS = /module\.exports/.test(source);

    const out = Object.freeze({
      missingESM: !hasESM,
      missingCJS: !hasCJS,
      vars
    });

    appendPageScannerRecord("detectExportDrift_out", out);
    return out;
  } catch (err) {
    safeNormalizeError(err, "pagescanner.detectExportDrift");
    const out = Object.freeze({
      missingESM: false,
      missingCJS: false,
      vars
    });
    appendPageScannerRecord("detectExportDrift_out_error", out);
    return out;
  }
}

// ---------------------------------------------------------------------------
// Detect structural drift (shape + field mismatches)
// ---------------------------------------------------------------------------

function detectStructural(sourceA = "", sourceB = "") {
  appendPageScannerRecord("detectStructural_in", {
    sourceALength: sourceA?.length || 0,
    sourceBLength: sourceB?.length || 0
  });

  // ------------------------------------------------------------
  // 0. If either source is missing → skip structural detection
  // ------------------------------------------------------------
  if (!sourceA || !sourceB) {
    const out = Object.freeze({
      shapeA: [],
      shapeB: [],
      missingInA: [],
      missingInB: [],
      substructureMismatch: false,
      severity: 0,
      mismatch: false
    });

    appendPageScannerRecord("detectStructural_skipped_missing_source", out);
    return out;
  }

  // ------------------------------------------------------------
  // 1. Normal structural detection
  // ------------------------------------------------------------
  try {
    const extractShape = (src) => {
      const matches = [...src.matchAll(/return\s+{([^}]+)}/gs)];
      return matches.map((m) => {
        return m[1]
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .map((field) => {
            const [key] = field.split(":").map((x) => x.trim());
            return key;
          });
      });
    };

    const shapeA = extractShape(sourceA);
    const shapeB = extractShape(sourceB);

    const flatA = shapeA.flat();
    const flatB = shapeB.flat();

    const missingInB = flatA.filter((f) => !flatB.includes(f));
    const missingInA = flatB.filter((f) => !flatA.includes(f));

    const substructureMismatch =
      JSON.stringify(shapeA) !== JSON.stringify(shapeB);

    const severity =
      missingInA.length +
      missingInB.length +
      Math.abs(flatA.length - flatB.length) +
      (substructureMismatch ? 1 : 0);

    const out = Object.freeze({
      shapeA,
      shapeB,
      missingInA,
      missingInB,
      substructureMismatch,
      severity,
      mismatch: severity > 0
    });

    appendPageScannerRecord("detectStructural_out", out);
    return out;
  } catch (err) {
    safeNormalizeError(err, "pagescanner.detectStructural");

    const out = Object.freeze({
      shapeA: [],
      shapeB: [],
      missingInA: [],
      missingInB: [],
      substructureMismatch: false,
      severity: 0,
      mismatch: false
    });

    appendPageScannerRecord("detectStructural_out_error", out);
    return out;
  }
}


// ---------------------------------------------------------------------------
// Detect contract drift (function signature mismatches)
// ---------------------------------------------------------------------------

function detectContract(sourceA = "", sourceB = "") {
  appendPageScannerRecord("detectContract_in", {
    sourceALength: sourceA.length,
    sourceBLength: sourceB.length
  });
  try {
    const sigA = [...sourceA.matchAll(/function\s+([A-Za-z0-9_]+)\(([^)]*)\)/g)].map(
      (m) => ({
        name: m[1],
        params: m[2].split(",").map((s) => s.trim()).filter(Boolean)
      })
    );

    const sigB = [...sourceB.matchAll(/function\s+([A-Za-z0-9_]+)\(([^)]*)\)/g)].map(
      (m) => ({
        name: m[1],
        params: m[2].split(",").map((s) => s.trim()).filter(Boolean)
      })
    );

    const out = Object.freeze({
      sigA,
      sigB,
      mismatch: JSON.stringify(sigA) !== JSON.stringify(sigB)
    });

    appendPageScannerRecord("detectContract_out", out);
    return out;
  } catch (err) {
    safeNormalizeError(err, "pagescanner.detectContract");
    const out = Object.freeze({
      sigA: [],
      sigB: [],
      mismatch: false
    });
    appendPageScannerRecord("detectContract_out_error", out);
    return out;
  }
}

// ---------------------------------------------------------------------------
// Detect path drift (file moved or renamed)
// ---------------------------------------------------------------------------

function detectPathDrift(importLine = "") {
  appendPageScannerRecord("detectPathDrift_in", { importLine });
  try {
    const match = importLine.match(/from\s+['"](.+?)['"]/);
    if (!match) {
      appendPageScannerRecord("detectPathDrift_out", { result: null });
      return null;
    }

    const path = match[1];
    const exists = false; // cannot check filesystem in browser

    const out = Object.freeze({
      path,
      exists,
      drift: !exists
    });

    appendPageScannerRecord("detectPathDrift_out", out);
    return out;
  } catch (err) {
    safeNormalizeError(err, "pagescanner.detectPathDrift");
    appendPageScannerRecord("detectPathDrift_out_error", { error: true });
    return null;
  }
}

// ---------------------------------------------------------------------------
// INTERNAL: map severity → drift tier
// ---------------------------------------------------------------------------

function mapSeverityToTier(severity) {
  if (severity <= 0) return DriftTiers.none;
  if (severity === 1) return DriftTiers.low;
  if (severity === 2) return DriftTiers.medium;
  if (severity <= 4) return DriftTiers.high;
  if (severity <= 8) return DriftTiers.critical;
  return DriftTiers.immortal;
}

// ---------------------------------------------------------------------------
// Build drift intelligence packet (adapter-ready)
// ---------------------------------------------------------------------------

function buildDriftPacket(context = {}) {
  appendPageScannerRecord("buildDriftPacket_in", { context });

  try {
    const structural = context.structural || {};
    const severity =
      typeof structural.severity === "number" ? structural.severity : 0;

    const tooFar = severity >= 3;
    const tier = mapSeverityToTier(severity);
    const channel = context.channel || DriftChannels.devtools;
    const modeKind = context.binarySource ? "dual" : "symbolic";

    const base = {
      schemaVersion: PAGESCANNER_SCHEMA_VERSION,
      role: PageScannerRole.identity,
      version: PageScannerRole.version,
      type: "pagescanner-drift-intel",
      timestamp: PulseRealm.PulseNOW,
      severity,
      tooFar,
      tier,
      channel,
      modeKind,
      structural: {
        shapeA: structural.shapeA || [],
        shapeB: structural.shapeB || [],
        missingInA: structural.missingInA || [],
        missingInB: structural.missingInB || [],
        substructureMismatch: !!structural.substructureMismatch
      },
      lineage: context.lineage || null,
      moduleMode: context.moduleMode || null,
      exportDrift: context.exportDrift || null,
      contract: context.contract || null,
      path: context.path || null,
      sourceMeta: context.sourceMeta || null
    };

    const signature = deterministicSignature(base);
    const out = Object.freeze({
      ...base,
      signature
    });

    appendPageScannerRecord("buildDriftPacket_out", out);

    try {
      getDiagnosticsBus().emit("PageScanner.driftPacket", out);
    } catch {}

    try {
      getEvidenceBus().emit("PageScanner.driftEvidence", {
        signature,
        tier,
        channel,
        severity,
        timestamp: base.timestamp
      });
    } catch {}

    return out;
  } catch (err) {
    safeNormalizeError(err, "pagescanner.buildDriftPacket");

    const base = {
      schemaVersion: PAGESCANNER_SCHEMA_VERSION,
      role: PageScannerRole.identity,
      version: PageScannerRole.version,
      type: "pagescanner-drift-intel",
      timestamp: PulseRealm.PulseNOW,
      error: true
    };

    const out = Object.freeze({
      ...base,
      signature: deterministicSignature(base)
    });

    appendPageScannerRecord("buildDriftPacket_out_error", out);
    return out;
  }
}

function scanRouteImages(root = document) {
  const results = new Set();

  const normalize = url => {
    if (!url) return "";
    return url.split("?")[0].split("#")[0].trim();
  };

  // ------------------------------------------------------------
  // 1) <img src> and <img srcset>
  // ------------------------------------------------------------
  try {
    const imgs = root.querySelectorAll("img");
    for (const img of imgs) {
      const src = normalize(img.getAttribute("src"));
      if (src) results.add(src);

      const srcset = img.getAttribute("srcset");
      if (srcset) {
        const parts = srcset.split(",").map(x => x.trim().split(" ")[0]);
        for (const p of parts) {
          const clean = normalize(p);
          if (clean) results.add(clean);
        }
      }
    }
  } catch {}

  // ------------------------------------------------------------
  // 2) <source srcset>
  // ------------------------------------------------------------
  try {
    const sources = root.querySelectorAll("source[srcset]");
    for (const s of sources) {
      const set = s.getAttribute("srcset");
      if (!set) continue;

      const parts = set.split(",").map(x => x.trim().split(" ")[0]);
      for (const p of parts) {
        const clean = normalize(p);
        if (clean) results.add(clean);
      }
    }
  } catch {}

  // ------------------------------------------------------------
  // 3) CSS background-image
  // ------------------------------------------------------------
  try {
    const all = root.querySelectorAll("*");
    for (const el of all) {
      const style = getComputedStyle(el);
      const bg = style.backgroundImage;

      if (bg && bg !== "none") {
        const matches = bg.match(/url\((.*?)\)/g);
        if (matches) {
          for (const m of matches) {
            const url = m.replace(/url\((['"]?)(.*?)\1\)/, "$2");
            const clean = normalize(url);
            if (clean) results.add(clean);
          }
        }
      }
    }
  } catch {}

  // ------------------------------------------------------------
  // 4) Inline CSS: style="background:url(...)"
  // ------------------------------------------------------------
  try {
    const all = root.querySelectorAll("*");
    for (const el of all) {
      const inline = el.getAttribute("style");
      if (inline && inline.includes("url(")) {
        const matches = inline.match(/url\((.*?)\)/g);
        if (matches) {
          for (const m of matches) {
            const url = m.replace(/url\((['"]?)(.*?)\1\)/, "$2");
            const clean = normalize(url);
            if (clean) results.add(clean);
          }
        }
      }
    }
  } catch {}

  // ------------------------------------------------------------
  // 5) <video poster>
  // ------------------------------------------------------------
  try {
    const videos = root.querySelectorAll("video[poster]");
    for (const v of videos) {
      const poster = normalize(v.getAttribute("poster"));
      if (poster) results.add(poster);
    }
  } catch {}

  return Array.from(results);
}



// ---------------------------------------------------------------------------
// PUBLIC ORGAN
// ---------------------------------------------------------------------------
export const PulsePageScanner = Object.freeze({
  PageScannerRole,

  extractVars,
  normalize: normalizeName,
  detectLineage,
  rewriteIllegalImports,
  detectModuleMode,
  detectExportDrift,
  detectStructural,
  detectContract,
  detectPathDrift,
  buildDriftPacket,

  // ⭐ NEW: Route image scanner
  scanRouteImages,

  DriftTiers,
  DriftChannels,
  schemaVersion: PAGESCANNER_SCHEMA_VERSION
});


export default PulsePageScanner;

// ============================================================================
// GLOBAL EXPOSURE OF IMMORTAL STORE
// ============================================================================

try {
    PulseRealm.PulsePageScanner = PulsePageScanner;
    PulseRealm.PulsePageScannerStore = PulsePageScannerStore;
  
} catch {}
