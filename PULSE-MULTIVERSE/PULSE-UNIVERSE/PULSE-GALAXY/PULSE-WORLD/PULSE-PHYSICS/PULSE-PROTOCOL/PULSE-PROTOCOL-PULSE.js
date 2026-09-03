// PULSE-PROTOCOL-PULSE-v33.js
// IMMORTAL v33.0 — PURE PORT + AUTHORITY TIMING MODEL + expressFile() + EVOLUTION RESOLVER

// ------------------------------------------------------------
// 1. CORE IMPORT (must run first)
// ------------------------------------------------------------
import {getModuleRecord,unwrapOnce,createOrganismPreloader,buildPulseFunctionOrgan,resolveExportIdWithFuzzy, PulseProtocolAuthority as PulseWorldAuthority} from "./PULSE-PROTOCOL-CORE.js";
import {fs, path as PATH} from "../../PULSE-WORLD-PATH.js";
import { emailTemplates } from "../X-PULSE-X/3RDPARTY/PulseWorldEmailTemplate-v30.js";
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

console.log("%c⟙ PULSE WORLD PROTOCOL v30.0 — [PulsePort] Pulse Protocol Authority Timing Model + Evolution Resolver Spinning..",
  "color:#90CAF9; font-weight:bold; font-family:monospace;"
);
// ------------------------------------------------------------
// 2. AUTHORITY EXECUTION / REGISTRATION BLOCK
// ------------------------------------------------------------
(() => {
  try {
    PulseRealm.__PulseAuthorityBooted = true;

    if (typeof PulseWorldAuthority.status === "function") {
      const status = PulseWorldAuthority.status();
      void status;
    }
  } catch {}
})();

// ------------------------------------------------------------
// 3. PURE STATE
// ------------------------------------------------------------

const PulseChunks = PulseRealm.PulseChunks || null;
const PulsePresenceNormalizerStore = PulseRealm.PulsePresenceNormalizerStore || null;
const PulseChunkNormalizer = PulseRealm.PulseChunkNormalizer || null;
const PulseFunctionLibrary = PulseRealm.PulseFunctionLibrary || null;
const PulseSecretsLayer = PulseRealm.PulseSecretsLayer || null;
const PulseOvermind = PulseRealm.PulseOvermind || null;
const PulseApproval = PulseRealm.PulseApproval || null;
const PulseIO = PulseRealm.PulseIO || null;
const PulseBinaryKeyCodec = PulseRealm.PulseBinaryKeyCodec || null;

// Optional: TrustCore presence (for conceptual anchoring, not hard dependency)
const PulseWorldTrustCore = PulseRealm.PulseWorldTrustCore || null;

// ------------------------------------------------------------
// 4. EVOLUTION RESOLUTION CONSTANTS + CACHE
// ------------------------------------------------------------
const EVOLUTION_MIN_VERSION = 30;
const EVOLUTION_CURRENT_VERSION = 33;

// In‑memory + global cache so we don’t “correct” the same path twice
const RESOLUTION_CACHE =
  (PulseRealm.__PulseImportResolutionCache =
    PulseRealm.__PulseImportResolutionCache || Object.create(null));

// ============================================================================
//  EVOLUTION‑AWARE FILE RESOLVER
//  Two file types only:
//    1) EVOLVING:  camelCase + -vNN   (PulseWorldVault-v33.js)
//    2) FINAL:     ALL-CAPS-DASHED    (PULSE-WORLD-VAULT.js)
// ============================================================================
function isAllCapsName(nameWithoutExt) {
  return nameWithoutExt === nameWithoutExt.toUpperCase();
}

function toUpperDashFromCamel(root) {
  // PulseWorldVault -> PULSE-WORLD-VAULT
  return root
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toUpperCase();
}

function splitPath(filePath) {
  const idx = filePath.lastIndexOf("/");
  if (idx === -1) {
    return { dir: "", base: filePath };
  }
  return {
    dir: filePath.slice(0, idx + 1),
    base: filePath.slice(idx + 1)
  };
}

function stripJsExt(base) {
  return base.endsWith(".js") ? base.slice(0, -3) : base;
}

export function resolveConfigDocumentPath(filePath) {
  if (!PATH || !filePath) return filePath;

  const { dir, base } = splitPath(filePath);

  // Strip extension if present
  const baseNoExt = base.replace(/.(\(txt|md|html)$/i, "");

  // ---------------------------------------------------------
  // 1. FOLDER-FIRST RULE (OCD LAW #1)
  // ---------------------------------------------------------
  try {
    const exact = PATH.resolve(filePath);
    if (PATH.exists(exact)) {
      return filePath;
    }
  } catch {}

  // ---------------------------------------------------------
  // 2. If already PulseWorldSomething, try .txt/.html
  // ---------------------------------------------------------
  if (/^PulseWorld[A-Z]/.test(baseNoExt)) {
    const txt = `${dir}${baseNoExt}.txt`;
    if (PATH.exists(PATH.resolve(txt))) return txt;

    const html = `${dir}${baseNoExt}.html`;
    if (PATH.exists(PATH.resolve(html))) return html;
  }

  // ---------------------------------------------------------
  // 3. OCD WORLD FALLBACK
  // CapitalizeEveryWord + prefix PulseWorld
  // ---------------------------------------------------------
  const normalized =
    baseNoExt[0].toUpperCase() + baseNoExt.slice(1);

  const worldName = `PulseWorld${normalized}`;

  const worldTxt = `${dir}${worldName}.txt`;
  if (PATH.exists(PATH.resolve(worldTxt))) return worldTxt;

  const worldHtml = `${dir}${worldName}.html`;
  if (PATH.exists(PATH.resolve(worldHtml))) return worldHtml;

  // ---------------------------------------------------------
  // 4. Nothing matched — return original
  // ---------------------------------------------------------
  return filePath;
}


export function resolveEvolutionFilePath(filePath) {
  if (!PATH || !filePath) return filePath;

  if (RESOLUTION_CACHE[filePath]) {
    return RESOLUTION_CACHE[filePath];
  }

  const { dir, base } = splitPath(filePath);
  const baseNoExt = stripJsExt(base);

  // ---------------------------------------------------------
  // 0. PULSEConfig — DOCUMENT ORGAN (NO EVOLUTION)
  // ---------------------------------------------------------
  if (filePath.includes("/PULSEConfig/")) {
    const resolvedDoc = resolveConfigDocumentPath(filePath);
    RESOLUTION_CACHE[filePath] = resolvedDoc;
    return resolvedDoc;
  }

  // ---------------------------------------------------------
  // 1. FOLDER-FIRST RULE (OCD LAW #1)
  // ---------------------------------------------------------
  try {
    const exact = PATH.resolve(filePath);
    if (PATH.exists(exact)) {
      RESOLUTION_CACHE[filePath] = filePath;
      return filePath;
    }
  } catch {}

  // ---------------------------------------------------------
  // 2. COSMIC OVERRIDES
  // ---------------------------------------------------------
  if (dir.includes("PULSE-MULTIVERSE")) {
    const multiversal = `${dir}PULSE-MULTIVERSAL-${toUpperDashFromCamel(baseNoExt)}.js`;
    if (PATH.exists(PATH.resolve(multiversal))) {
      RESOLUTION_CACHE[filePath] = multiversal;
      return multiversal;
    }
  }

  if (dir.includes("PULSE-UNIVERSE")) {
    const universal = `${dir}PULSE-UNIVERSAL-${toUpperDashFromCamel(baseNoExt)}.js`;
    if (PATH.exists(PATH.resolve(universal))) {
      RESOLUTION_CACHE[filePath] = universal;
      return universal;
    }
  }

  if (dir.includes("PULSE-GALAXY")) {
    const galactic = `${dir}PULSE-GALACTIC-${toUpperDashFromCamel(baseNoExt)}.js`;
    if (PATH.exists(PATH.resolve(galactic))) {
      RESOLUTION_CACHE[filePath] = galactic;
      return galactic;
    }
  }

  // ---------------------------------------------------------
  // 3. LOGGER SPECIAL CASE
  // ---------------------------------------------------------
  if (baseNoExt.toLowerCase().includes("logger")) {
    const proofLogger = `${dir}PULSE-PROOF-LOGGER.js`;
    if (PATH.exists(PATH.resolve(proofLogger))) {
      RESOLUTION_CACHE[filePath] = proofLogger;
      return proofLogger;
    }
  }

  // ---------------------------------------------------------
  // 4. FINAL ORGANS (ALL CAPS = EVOLVED)
  // ---------------------------------------------------------
  if (isAllCapsName(baseNoExt)) {
    const finalCandidate = `${dir}${baseNoExt}.js`;
    if (PATH.exists(PATH.resolve(finalCandidate))) {
      RESOLUTION_CACHE[filePath] = finalCandidate;
      return finalCandidate;
    }
    RESOLUTION_CACHE[filePath] = filePath;
    return filePath;
  }

  // ---------------------------------------------------------
  // 5. EVOLVING ORGANS (PascalCase-vNN)
  // ---------------------------------------------------------
  const root = baseNoExt.split("-")[0];

  for (let v = EVOLUTION_CURRENT_VERSION; v >= EVOLUTION_MIN_VERSION; v--) {
    const candidate = `${dir}${root}-v${v}.js`;
    if (PATH.exists(PATH.resolve(candidate))) {
      RESOLUTION_CACHE[filePath] = candidate;
      return candidate;
    }
  }

  // ---------------------------------------------------------
  // 6. FINAL FALLBACK (UPPER-DASH)
  // ---------------------------------------------------------
  const upper = toUpperDashFromCamel(root);
  const upperCandidate = `${dir}${upper}.js`;
  if (PATH.exists(PATH.resolve(upperCandidate))) {
    RESOLUTION_CACHE[filePath] = upperCandidate;
    return upperCandidate;
  }

  // ---------------------------------------------------------
  // 7. WORLD FALLBACK (PulseWorldSomething)
  // ---------------------------------------------------------
  const worldEvolving = `${dir}PulseWorld${root}-v${EVOLUTION_CURRENT_VERSION}.js`;
  if (PATH.exists(PATH.resolve(worldEvolving))) {
    RESOLUTION_CACHE[filePath] = worldEvolving;
    return worldEvolving;
  }

  const worldFinal = `${dir}PULSE-WORLD-${upper}.js`;
  if (PATH.exists(PATH.resolve(worldFinal))) {
    RESOLUTION_CACHE[filePath] = worldFinal;
    return worldFinal;
  }

  // ---------------------------------------------------------
  // 8. Nothing matched — return original
  // ---------------------------------------------------------
  RESOLUTION_CACHE[filePath] = filePath;
  return filePath;
}


// ============================================================================
//  PULSEIMPORT / PULSEEXPORT / SUBIMPORT
// ============================================================================
export function createPulseExport(state, envelope) {
  const moduleId = envelope.id;

  return function PulseExport(exportId, value, meta = {}) {
    if (!exportId) return;

    const record = getModuleRecord(state, moduleId);
    if (!record) return;

    const normalized = unwrapOnce(value);

    if (!record.exports) {
      record.exports = {};
    }

    record.exports[exportId] = {
      value: normalized,
      meta: {
        tier: meta.tier || envelope.exportTiers[exportId] || "default",
        ts: 0,
        ...meta
      }
    };
  };
}

export function createPulseImport(state, envelope) {
  const moduleId = envelope.id;

  return function PulseImport(exportId, pulseFlag = false) {
    if (!exportId) return null;

    if (exportId === "ORGANISM" && pulseFlag === false) {
      return createOrganismPreloader(state);
    }

    if (pulseFlag === true) {
      return buildPulseFunctionOrgan(exportId);
    }

    const record = getModuleRecord(state, moduleId);
    if (!record) return null;

    const { id: resolvedId } = resolveExportIdWithFuzzy(record, exportId, {
      minScore: 0.8
    });

    if (!resolvedId) return null;

    const entry = record.exports[resolvedId];
    if (!entry) return null;

    return entry.value;
  };
}

export function createPulseSubimport(state, envelope) {
  const moduleId = envelope.id;

  return function PulseSubimport(exportId, subpath) {
    if (!exportId || !subpath) return null;

    const record = getModuleRecord(state, moduleId);
    if (!record) return null;

    const entry = record.exports[exportId];
    if (!entry) return null;

    const value = entry.value;
    if (!value || typeof value !== "object") return null;

    const parts = String(subpath).split(".").filter(Boolean);
    let current = value;

    for (const p of parts) {
      if (!current || typeof current !== "object") return null;
      current = current[p];
    }

    return current;
  };
}

// ============================================================================
//  PULSEPORT — PURE PORT
// ============================================================================
export function createPulsePort(state, envelope) {
  const moduleId = envelope.id;

  return function PulsePort(id, arg = undefined, meta = {}) {
    if (!id) return null;

    if (id === "ORGANISM" && arg === undefined) {
      return createOrganismPreloader(state);
    }

    if (arg === true) {
      return buildPulseFunctionOrgan(id);
    }

    if (arg !== undefined && arg !== true && typeof arg !== "string") {
      const record = getModuleRecord(state, moduleId);
      if (!record) return;

      const normalized = unwrapOnce(arg);

      if (!record.exports) {
        record.exports = {};
      }

      record.exports[id] = {
        value: normalized,
        meta: {
          tier: meta.tier || envelope.exportTiers[id] || "default",
          ts: 0,
          ...meta
        }
      };

      return normalized;
    }

    if (typeof arg === "string") {
      const record = getModuleRecord(state, moduleId);
      if (!record) return null;

      const entry = record.exports[id];
      if (!entry) return null;

      let current = entry.value;
      const parts = arg.split(".").filter(Boolean);

      for (const p of parts) {
        if (!current || typeof current !== "object") return null;
        current = current[p];
      }

      return current;
    }

    const record = getModuleRecord(state, moduleId);
    if (!record) return null;

    const { id: resolvedId } = resolveExportIdWithFuzzy(record, id, {
      minScore: 0.8
    });

    if (!resolvedId) return null;

    const entry = record.exports[resolvedId];
    if (!entry) return null;

    return entry.value;
  };
}

// ============================================================================
//  AUTO‑BIND PulsePort
// ============================================================================
const __ProtocolState = { modules: Object.create(null) };
const __ProtocolEnvelope = {
  id: "PULSE-PROTOCOL-PULSE",
  exportTiers: Object.create(null)
};

__ProtocolState.modules[__ProtocolEnvelope.id] = {
  id: __ProtocolEnvelope.id,
  exports: {},
  exportTiers: __ProtocolEnvelope.exportTiers,
  lineage: "PROTOCOL",
  warmup: null
};

export const PulsePort = createPulsePort(__ProtocolState, __ProtocolEnvelope);

try {
  if (typeof PulseWorldAuthority.attachPort === "function") {
    PulseWorldAuthority.attachPort(PulsePort);
  }
} catch {}


// ============================================================================
//  FILE SCANNER (PURE)
// ============================================================================
function scanExportedFunctionsFromFile(filePath) {
  if (!PATH) return [];

  const resolved = PATH.resolve(filePath);
  if (!PATH.exists(resolved)) return [];

  const content = PATH.readFile(resolved, "utf8");
  if (!content) return [];

  const lines = content.split("\n");
  const functions = [];

  const exportRegexes = [
    /export function (\w+)/,
    /export async function (\w+)/,
    /export const (\w+)\s*=/,
    /export default function (\w+)/
  ];

  lines.forEach((line, index) => {
    for (const regex of exportRegexes) {
      const match = line.match(regex);
      if (match) {
        functions.push({
          name: match[1],
          line: index + 1,
          file: resolved
        });
      }
    }
  });

  return functions;
}

// ============================================================================
//  PROTOCOL SURFACE (PURE) + expressFile() + EVOLUTION RESOLVER
// ============================================================================
export const ProtocolPulsePort = {
  import(id, pulseFlag = false) {
    return PulsePort(id, pulseFlag);
  },

  export(id, value, meta = {}) {
    return PulsePort(id, value, meta);
  },

  subimport(id, subpath) {
    if (!id || !subpath) return null;
    return PulsePort(id, String(subpath));
  },

  organism() {
    return PulsePort("ORGANISM");
  },

  scanFileExports(filePath) {
    return scanExportedFunctionsFromFile(filePath);
  },

  registerFileNamespace(namespaceName, filePath, moduleObj) {
    if (!namespaceName || !filePath || !moduleObj) return null;

    const funcs = scanExportedFunctionsFromFile(filePath);
    const registry = {};

    for (const f of funcs) {
      const fn = moduleObj[f.name];
      if (typeof fn === "function") {
        registry[f.name] = fn;
      }
    }

    return registry;
  },

  // Expose resolver for debugging / tooling
  resolveFilePath(filePath) {
    if (!PATH) return filePath;
    return resolveEvolutionFilePath(filePath);
  },

  // ⭐ IMMORTAL v33.0 — EVOLUTION‑AWARE ONE-LINE FILE EXPRESSION
  async expressFile(namespaceName, filePath) {
    if (!namespaceName || !filePath) return null;
    if (!PATH) {
      PulseRealm.PulseWarn(
        "signal",
        "[PulsePort] Pulse Protocol Route Expression Not Ready for ExpressFile:",
        filePath
      );
      return null;
    }

    const resolvedPath = resolveEvolutionFilePath(filePath);

    try {
      const resolved = PATH.resolve(resolvedPath);
      if (!PATH.exists(resolved)) {
        PulseRealm.PulseWarn(
          "signal",
          "[PulsePort] Pulse Protocol Route ExpressFile Missing:",
          resolved
        );
        return null;
      }

      const moduleObj = await import(resolved);
      const registry = {};

      // ⭐ FIX: Accept objects AND functions
      for (const key of Object.keys(moduleObj)) {
        const value = moduleObj[key];

        // Accept:
        // ✔ functions
        // ✔ objects (your email templates)
        // Ignore:
        // ✖ undefined
        // ✖ null
        if (value !== undefined && value !== null) {
          registry[key] = value;
        }
      }

      PulsePort(namespaceName, registry, { tier: "world" });

      PulseRealm.PulseLog(
        "signal",
        `[PulsePort] Pulse Protocol Route Expressed Namespace "${namespaceName}" from `,
        resolvedPath
      );

      try {
        if (
          PulseWorldTrustCore &&
          typeof PulseWorldTrustCore.snapshotTrustCore === "function"
        ) {
          void PulseWorldTrustCore.snapshotTrustCore();
        }
      } catch {}

      return registry;
    } catch (err) {
      PulseRealm.PulseError(
        "signal",
        "[PulsePort] Pulse Protocol Route ExpressFile Failed:",
        err
      );
      return null;
    }
  },

  async autoInit() {
    try {
      PulseRealm.PulseLog(
  "signal","[PulsePort] Pulse Protocol Route Initializaing...");

      if (!PATH) {
        PulseRealm.PulseWarn(
  "signal","[PulsePort] Pulse Protocol Routh Not Attached; Skipping EmailTemplates Initialization!");
        return;
      }

      const defaultFile =
        `https://${PulseRealm.CurrentHost}/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/X-PULSE-X/3RDPARTY/PulseWorldEmailTemplate-v30.js`;

      PulseRealm.EmailTemplates = emailTemplates;
      await this.expressFile("emailTemplates", defaultFile);
    } catch (err) {
      PulseRealm.PulseError(
  "signal","[PulsePort] Pulse Protocol Route Initialization Failed:", err);
    }
  }
};

export default ProtocolPulsePort;

PulseRealm.ProtocolPulse = {
  ProtocolPulsePort,
  createOrganismPreloader,
  scanExportedFunctionsFromFile,
  PulsePort,
  createPulseImport,
  createPulseExport,
  createPulsePort,
  createPulseSubimport,
  resolveEvolutionFilePath
}
PulseRealm.PulseProtocolPort = ProtocolPulsePort;