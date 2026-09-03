// ============================================================================
// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/PULSE-DESIGN/fileClassifier-v17-IMMORTAL.js
// LAYER: THE ANATOMIST (Structural Classifier + Identity Mapper + Evolutionary Morphology)
// ============================================================================

// ============================================================================
// INTERNAL TYPES (conceptual, not enforced at runtime)
// ============================================================================
//
// FileSignature {
//   path: string
//   ext: string
//   pathSegments: string[]
//   sizeApprox: number
//   firstLine: string | null
//   hasPulseBand: boolean
//   hasHealing: boolean
//   dataSources: {
//     firestore: boolean
//     sql: boolean
//     pulseFields: boolean
//     firestoreAdmin: boolean
//     gpu: boolean
//     vast: boolean
//   }
//   imports: string[]
//   exports: {
//     hasDefault: boolean
//     hasNamed: boolean
//     named: string[]
//   }
//   genomeTags: string[]
//   translatorTags: string[]
//   runtimeTags: string[]
//   substrateTags: string[]
//   schedulerTags: string[]
//   contentIncludes: (...tokens: string[]) => boolean
// }
//
// FileClassification {
//   type: string
//   organHints: string[]
//   confidence: number
//   patternId: string
// }
// ============================================================================
import {PulseWorldFS as fs, PulseWorldNodePath as path} from "../../PULSE-WORLD-PATH.js"
// ============================================================================
// v17 PATTERN REGISTRY — Evolvable Structural Patterns
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




const TYPE_PATTERNS = [
  // -----------------------------
  // UI / ROUTING
  // -----------------------------
  {
    id: "next_page",
    organType: "page",
    organHints: ["ui", "route"],
    match(sig) {
      return (
        sig.ext === ".js" &&
        sig.pathSegments.includes("pages") &&
        (sig.exports.hasDefault || sig.exports.named.includes("Page"))
      );
    }
  },
  {
    id: "ui_component",
    organType: "component",
    organHints: ["ui"],
    match(sig) {
      return (
        sig.ext === ".js" &&
        sig.pathSegments.includes("components") &&
        (sig.exports.hasDefault || sig.exports.named.length > 0)
      );
    }
  },
  {
    id: "layout_component",
    organType: "layout",
    organHints: ["ui", "layout"],
    match(sig) {
      return (
        sig.ext === ".js" &&
        (sig.pathSegments.includes("layouts") ||
          sig.path.toLowerCase().includes("layout")) &&
        (sig.exports.hasDefault || sig.exports.named.includes("Layout"))
      );
    }
  },

  // -----------------------------
  // API / BACKEND
  // -----------------------------
  {
    id: "api_route",
    organType: "api",
    organHints: ["api"],
    match(sig) {
      const lowerPath = sig.path.toLowerCase();
      return (
        sig.ext === ".js" &&
        (sig.pathSegments.includes("api") ||
          lowerPath.includes("/api/") ||
          lowerPath.endsWith(".api.js")) &&
        (sig.exports.named.includes("GET") ||
          sig.exports.named.includes("POST") ||
          sig.exports.named.includes("handler"))
      );
    }
  },
  {
    id: "config_file",
    organType: "config",
    organHints: ["config"],
    match(sig) {
      const lower = sig.path.toLowerCase();
      return (
        sig.ext === ".js" &&
        (lower.endsWith(".config.js") ||
          lower.endsWith("config.js") ||
          sig.pathSegments.includes("config"))
      );
    }
  },

  // -----------------------------
  // HOOKS / STATE
  // -----------------------------
  {
    id: "hook_file",
    organType: "hook",
    organHints: ["hook", "state"],
    match(sig) {
      const base = path.basename(sig.path).toLowerCase();
      return (
        sig.ext === ".js" &&
        (base.startsWith("use") || base.includes(".hook")) &&
        sig.contentIncludes("useState", "useEffect", "useMemo")
      );
    }
  },
  {
    id: "store_file",
    organType: "store",
    organHints: ["state"],
    match(sig) {
      const lower = sig.path.toLowerCase();
      return (
        sig.ext === ".js" &&
        (lower.includes("store") || lower.includes("state")) &&
        sig.contentIncludes("createStore", "configureStore", "createSlice")
      );
    }
  },

  // -----------------------------
  // UTILITIES
  // -----------------------------
  {
    id: "util_file",
    organType: "util",
    organHints: ["util"],
    match(sig) {
      const lower = sig.path.toLowerCase();
      return (
        sig.ext === ".js" &&
        (lower.includes("/utils/") ||
          lower.includes("/lib/") ||
          lower.endsWith(".util.js") ||
          lower.endsWith(".utils.js")) &&
        !sig.exports.hasDefault
      );
    }
  },

  // -----------------------------
  // PULSE WORLD ORGANS (v17+)
  // -----------------------------
  {
    id: "pulse_runtime_organ",
    organType: "organ",
    organHints: ["runtime", "organ", "core"],
    match(sig) {
      const lower = sig.path.toLowerCase();
      return (
        lower.includes("pulseruntime") ||
        lower.includes("runtime-v2") ||
        sig.contentIncludes("PulseRuntimeV2Meta") ||
        sig.contentIncludes("runPulseTickV2")
      );
    }
  },
  {
    id: "pulse_scheduler_organ",
    organType: "organ",
    organHints: ["scheduler", "macro_orchestrator"],
    match(sig) {
      const lower = sig.path.toLowerCase();
      return (
        lower.includes("pulsescheduler") ||
        sig.contentIncludes("PulseSchedulerMeta") ||
        sig.contentIncludes("createPulseScheduler")
      );
    }
  },
  {
    id: "binary_substrate_organ",
    organType: "organ",
    organHints: ["binary", "substrate", "transport"],
    match(sig) {
      const lower = sig.path.toLowerCase();
      return (
        lower.includes("binarysubstrate") ||
        sig.contentIncludes("BinarySubstrateV2Meta") ||
        sig.contentIncludes("packSnapshot") ||
        sig.contentIncludes("unpackBinaryPayload")
      );
    }
  },
  {
    id: "translator_rna_intake",
    organType: "translator",
    organHints: ["translator", "firestore", "rna_intake"],
    match(sig) {
      const lower = sig.path.toLowerCase();
      return (
        lower.includes("rnainput") ||
        lower.includes("rnaintake") ||
        sig.contentIncludes("PulseTranslatorRNAIntake") ||
        sig.contentIncludes("inferPulseTypeFromFirestore")
      );
    }
  },
  {
    id: "translator_rna_output",
    organType: "translator",
    organHints: ["translator", "firestore", "rna_output"],
    match(sig) {
      const lower = sig.path.toLowerCase();
      return (
        lower.includes("rnaoutput") ||
        sig.contentIncludes("PulseTranslatorRNAOutput") ||
        sig.contentIncludes("translatePulseFieldToFirestore")
      );
    }
  },
  {
    id: "translator_skeletal_intake",
    organType: "translator",
    organHints: ["translator", "sql", "skeletal_intake"],
    match(sig) {
      const lower = sig.path.toLowerCase();
      return (
        lower.includes("skeletalintake") ||
        sig.contentIncludes("PulseTranslatorSkeletalIntake") ||
        sig.contentIncludes("translateSQLColumn")
      );
    }
  },
  {
    id: "translator_skeletal_output",
    organType: "translator",
    organHints: ["translator", "sql", "skeletal_output"],
    match(sig) {
      const lower = sig.path.toLowerCase();
      return (
        lower.includes("skeletal") &&
        sig.contentIncludes("generateCreateTable") &&
        sig.contentIncludes("PulseToSQL")
      );
    }
  },
  {
    id: "pulse_specs_genome",
    organType: "specs",
    organHints: ["genome", "specs", "dna"],
    match(sig) {
      const lower = sig.path.toLowerCase();
      return (
        lower.includes("pulsespecsdnagenome") ||
        sig.contentIncludes("PULSE_FIELDS_SPEC") ||
        sig.contentIncludes("PulseFieldTypes") ||
        sig.contentIncludes("validatePulseField")
      );
    }
  },
  {
    id: "pulse_design_architect",
    organType: "organ",
    organHints: ["design", "architect", "orchestrator"],
    match(sig) {
      const lower = sig.path.toLowerCase();
      return (
        lower.includes("architect") &&
        sig.contentIncludes("buildPulseManifest") &&
        sig.contentIncludes("PulseOrganismMap")
      );
    }
  },
  {
    id: "pulse_design_cartographer",
    organType: "organ",
    organHints: ["design", "cartographer", "terrain"],
    match(sig) {
      const lower = sig.path.toLowerCase();
      return (
        lower.includes("repowalker") ||
        lower.includes("cartographer") ||
        sig.contentIncludes("walkRepo(")
      );
    }
  },
  {
    id: "pulse_design_archivist",
    organType: "organ",
    organHints: ["design", "archivist", "manifest"],
    match(sig) {
      const lower = sig.path.toLowerCase();
      return (
        lower.includes("manifestbuilder") ||
        lower.includes("archivist") ||
        sig.contentIncludes("buildManifest(")
      );
    }
  },
  {
    id: "pulse_design_surveyor",
    organType: "organ",
    organHints: ["design", "surveyor", "blueprint"],
    match(sig) {
      const lower = sig.path.toLowerCase();
      return (
        lower.includes("manifestwriter") ||
        lower.includes("surveyor") ||
        sig.contentIncludes("writeManifest(")
      );
    }
  }
];

// ============================================================================
// PUBLIC API — Anatomical Classification (v17 IMMORTAL)
// ============================================================================
export function classifyFile(filePath, content = "", options = {}) {
  if (!filePath) {
    throw new Error("fileClassifier-v17: missing filePath");
  }

  const {
    band = "dual",
    worldTarget = "hybrid",
    size = null,
    mtimeMs = null
  } = options || {};

  const signature = buildFileSignature(filePath, content, {
    band,
    worldTarget,
    size,
    mtimeMs
  });

  const classification = classifyFromSignature(signature);

  const usesPulseBand = signature.hasPulseBand;
  const usesHealing = signature.hasHealing;
  const dataSources = buildDataSourcesArray(signature);

  const genomeHints = buildGenomeHints(signature, classification);
  const translatorHints = buildTranslatorHints(signature);

  return {
    // original fields (backwards‑compatible)
    path: filePath,
    ext: signature.ext,
    type: classification.type,
    usesPulseBand,
    usesHealing,
    dataSources,

    // v14+ enriched fields (preserved)
    classification,
    bands: {
      pulseBand: signature.hasPulseBand,
      healing: signature.hasHealing
    },
    signals: {
      firestore: signature.dataSources.firestore,
      sql: signature.dataSources.sql,
      pulseFields: signature.dataSources.pulseFields
    },

    // v17+ enriched fields
    signature,
    genomeHints,
    translatorHints
  };
}

// ============================================================================
// SIGNATURE BUILDER — Structural + Content Signature (v17 IMMORTAL)
// ============================================================================
function buildFileSignature(filePath, content, opts) {
  const ext = path.extname(filePath) || "";
  const pathSegments = filePath.split(/[\\/]/).filter(Boolean);
  const sizeApprox = typeof content === "string" ? content.length : 0;
  const firstLine = extractFirstLine(content);

  const hasPulseBand = detectPulseBand(content);
  const hasHealing = detectHealing(content);
  const dataSources = detectDataSourcesFlags(content);
  const imports = detectImports(content);
  const exportsInfo = detectExports(content);

  const genomeTags = detectGenomeTags(content, pathSegments);
  const translatorTags = detectTranslatorTags(content, pathSegments);
  const runtimeTags = detectRuntimeTags(content, pathSegments);
  const substrateTags = detectSubstrateTags(content, pathSegments);
  const schedulerTags = detectSchedulerTags(content, pathSegments);

  const sig = {
    path: filePath,
    ext,
    pathSegments,
    sizeApprox,
    firstLine,
    hasPulseBand,
    hasHealing,
    dataSources,
    imports,
    exports: exportsInfo,
    genomeTags,
    translatorTags,
    runtimeTags,
    substrateTags,
    schedulerTags,
    band: opts.band,
    worldTarget: opts.worldTarget,
    size: opts.size,
    mtimeMs: opts.mtimeMs,
    contentIncludes: (...tokens) => contentIncludesAll(content, tokens)
  };

  return sig;
}

// ============================================================================
// CLASSIFICATION — Pattern Registry + Fallback
// ============================================================================
function classifyFromSignature(sig) {
  for (const pattern of TYPE_PATTERNS) {
    try {
      if (pattern.match(sig)) {
        return {
          type: pattern.organType,
          organHints: pattern.organHints || [],
          confidence: 0.9,
          patternId: pattern.id
        };
      }
    } catch {
      // pattern failure should never break classification; continue
    }
  }

  // Fallback: legacy folder‑based heuristics (kept as last resort)
  const legacyType = legacyDetectType(sig.path);

  return {
    type: legacyType,
    organHints: [],
    confidence: legacyType === "unknown" ? 0.2 : 0.6,
    patternId: "legacy_fallback"
  };
}

// ============================================================================
// LEGACY TYPE DETECTION — Fallback Only (for backward compatibility)
// ============================================================================
function legacyDetectType(filePath) {
  const lower = filePath.toLowerCase();

  if (lower.includes("/pages/") && lower.endsWith(".js")) return "page";
  if (lower.includes("/components/") && lower.endsWith(".js")) return "component";
  if (lower.includes("/layouts/") && lower.endsWith(".js")) return "layout";
  if (lower.includes("/api/") && lower.endsWith(".js")) return "api";

  return "unknown";
}

// ============================================================================
// FEATURE DETECTION — PulseBand
// ============================================================================
function detectPulseBand(content) {
  if (!content) return false;
  return (
    content.includes("usePulseBand") ||
    content.includes("PulseBand") ||
    content.toLowerCase().includes("PulseBand")
  );
}

// ============================================================================
// FEATURE DETECTION — Healing Hooks
// ============================================================================
function detectHealing(content) {
  if (!content) return false;
  const lower = content.toLowerCase();
  return (
    lower.includes("usehealing") ||
    lower.includes("healing") ||
    content.includes("HealHook")
  );
}

// ============================================================================
// DATA SOURCE DETECTION — Flags (Firestore, SQL, PulseFields, GPU, Vast, etc.)
// ============================================================================
function detectDataSourcesFlags(content) {
  const lower = (content || "").toLowerCase();

  const firestore =
    lower.includes("collection(") ||
    lower.includes("getdoc(") ||
    lower.includes("getdocs(") ||
    lower.includes("@firebase/firestore");

  const firestoreAdmin =
    lower.includes("firebase-admin") ||
    lower.includes("admin.firestore(");

  const sql =
    (content || "").includes("SELECT ") ||
    (content || "").includes("INSERT ") ||
    (content || "").includes("UPDATE ") ||
    (content || "").includes("DELETE ") ||
    lower.includes("knex(") ||
    lower.includes("prisma.");

  const pulseFields =
    lower.includes("pulse_field") ||
    (content || "").includes("PulseField") ||
    lower.includes("pulse.fields") ||
    lower.includes("pulsefieldtypes");

  const gpu =
    lower.includes("cuda") ||
    lower.includes("webgpu") ||
    lower.includes("gpu") ||
    lower.includes("tensor");

  const vast =
    lower.includes("vast.ai") ||
    lower.includes("vastAdapter") ||
    lower.includes("vast_adapter");

  return {
    firestore,
    sql,
    pulseFields,
    firestoreAdmin,
    gpu,
    vast
  };
}

function buildDataSourcesArray(sig) {
  const sources = [];
  if (sig.dataSources.firestore) sources.push({ type: "firestore" });
  if (sig.dataSources.firestoreAdmin) sources.push({ type: "firestore-admin" });
  if (sig.dataSources.sql) sources.push({ type: "sql" });
  if (sig.dataSources.pulseFields) sources.push({ type: "pulse-fields" });
  if (sig.dataSources.gpu) sources.push({ type: "gpu" });
  if (sig.dataSources.vast) sources.push({ type: "vast" });
  return sources;
}

// ============================================================================
// GENOME / TRANSLATOR / RUNTIME / SUBSTRATE / SCHEDULER TAGGING
// ============================================================================

function detectGenomeTags(content, pathSegments) {
  const tags = [];
  const lower = (content || "").toLowerCase();
  const joined = pathSegments.join("/").toLowerCase();

  if (lower.includes("pulsefieldtypes") || lower.includes("pulse_fields_spec")) {
    tags.push("pulse-genome");
  }
  if (joined.includes("pulse-specs") || joined.includes("dnagenome")) {
    tags.push("pulse-specs-dnagenome");
  }
  if (lower.includes("sqltopulse") || lower.includes("firestoretopulse")) {
    tags.push("pulse-genome-transcription");
  }

  return tags;
}

function detectTranslatorTags(content, pathSegments) {
  const tags = [];
  const lower = (content || "").toLowerCase();
  const joined = pathSegments.join("/").toLowerCase();

  if (joined.includes("rnainput") || joined.includes("rnaintake")) {
    tags.push("translator-rna-intake");
  }
  if (joined.includes("rnaoutput")) {
    tags.push("translator-rna-output");
  }
  if (joined.includes("skeletalintake")) {
    tags.push("translator-skeletal-intake");
  }
  if (joined.includes("skeletal") && lower.includes("generatetable")) {
    tags.push("translator-skeletal-output");
  }
  if (lower.includes("pulsetranslator")) {
    tags.push("translator-core");
  }

  return tags;
}

function detectRuntimeTags(content, pathSegments) {
  const tags = [];
  const lower = (content || "").toLowerCase();
  const joined = pathSegments.join("/").toLowerCase();

  if (joined.includes("pulseruntime") || lower.includes("pulseruntimev2meta")) {
    tags.push("runtime-core");
  }
  if (lower.includes("runpulsetickv2")) {
    tags.push("runtime-tick");
  }

  return tags;
}

function detectSubstrateTags(content, pathSegments) {
  const tags = [];
  const lower = (content || "").toLowerCase();
  const joined = pathSegments.join("/").toLowerCase();

  if (joined.includes("binarysubstrate") || lower.includes("binarysubstratev2meta")) {
    tags.push("binary-substrate");
  }
  if (lower.includes("packsnapshot") || lower.includes("unpackbinarypayload")) {
    tags.push("binary-frames");
  }

  return tags;
}

function detectSchedulerTags(content, pathSegments) {
  const tags = [];
  const lower = (content || "").toLowerCase();
  const joined = pathSegments.join("/").toLowerCase();

  if (joined.includes("pulsescheduler") || lower.includes("pulseschedulermeta")) {
    tags.push("scheduler-core");
  }
  if (lower.includes("runpipeline(") || lower.includes("runmacrotick(")) {
    tags.push("scheduler-pipeline");
  }

  return tags;
}

function buildGenomeHints(signature, classification) {
  const hints = [];

  if (signature.genomeTags.length > 0) {
    hints.push(...signature.genomeTags);
  }
  if (signature.translatorTags.length > 0) {
    hints.push(...signature.translatorTags);
  }
  if (signature.runtimeTags.length > 0) {
    hints.push(...signature.runtimeTags);
  }
  if (signature.substrateTags.length > 0) {
    hints.push(...signature.substrateTags);
  }
  if (signature.schedulerTags.length > 0) {
    hints.push(...signature.schedulerTags);
  }

  if (classification.type === "translator") {
    hints.push("translator-organ");
  }
  if (classification.type === "organ") {
    hints.push("organ-core");
  }

  return Array.from(new Set(hints));
}

function buildTranslatorHints(signature) {
  const hints = [];

  if (signature.translatorTags.includes("translator-rna-intake")) {
    hints.push("firestore-intake");
  }
  if (signature.translatorTags.includes("translator-rna-output")) {
    hints.push("firestore-output");
  }
  if (signature.translatorTags.includes("translator-skeletal-intake")) {
    hints.push("sql-intake");
  }
  if (signature.translatorTags.includes("translator-skeletal-output")) {
    hints.push("sql-output");
  }

  if (signature.dataSources.firestore) {
    hints.push("firestore-aware");
  }
  if (signature.dataSources.sql) {
    hints.push("sql-aware");
  }
  if (signature.dataSources.pulseFields) {
    hints.push("pulsefields-aware");
  }

  return Array.from(new Set(hints));
}

// ============================================================================
// IMPORT / EXPORT DETECTION — Lightweight Structural Hints
// ============================================================================
export function detectImports(content) {
  if (!content) return [];
  const lines = content.split(/\r?\n/);
  const imports = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("import ")) {
      imports.push(trimmed);
    }
  }

  return imports;
}

export function detectExports(content) {
  if (!content) {
    return {
      hasDefault: false,
      hasNamed: false,
      named: []
    };
  }

  const lines = content.split(/\r?\n/);
  let hasDefault = false;
  const named = new Set();

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("export default")) {
      hasDefault = true;
    }

    if (trimmed.startsWith("export const ")) {
      const name = extractNameAfter(trimmed, "export const ");
      if (name) named.add(name);
    }

    if (trimmed.startsWith("export function ")) {
      const name = extractNameAfter(trimmed, "export function ");
      if (name) named.add(name);
    }

    if (trimmed.startsWith("export class ")) {
      const name = extractNameAfter(trimmed, "export class ");
      if (name) named.add(name);
    }

    if (trimmed.startsWith("export {")) {
      const inner = trimmed.replace(/^export\s*\{/, "").replace(/\}.*$/, "");
      inner
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((n) => named.add(n.split(/\s+as\s+/)[0]));
    }
  }

  return {
    hasDefault,
    hasNamed: named.size > 0,
    named: Array.from(named)
  };
}

// ============================================================================
// SMALL HELPERS
// ============================================================================
function extractFirstLine(content) {
  if (!content) return null;
  const idx = content.indexOf("\n");
  if (idx === -1) return content.trim() || null;
  return content.slice(0, idx).trim() || null;
}

function contentIncludesAll(content, tokens) {
  if (!content) return false;
  for (const t of tokens) {
    if (!t) continue;
    if (!content.includes(t)) return false;
  }
  return true;
}

function extractNameAfter(line, prefix) {
  const rest = line.slice(prefix.length).trim();
  if (!rest) return null;
  const match = rest.match(/^([A-Za-z0-9_$]+)/);
  return match ? match[1] : null;
}

PulseRealm.DesignFileClassifier = {
  classifyFile,
  detectExports,
  detectImports
}

PulseRealm.PulseGenome = (function () {

  // ------------------------------------------------------------
  // INTERNAL GENOME STATE (IMMUTABLE AT RUNTIME)
  // ------------------------------------------------------------
  const Genome = {
    version: "32.0-IMMORTAL",
    dnaTag: "default-dna",

    // Core identity
    organism: "PulseWorld",
    build: "v32",
    epoch: PulseRealm.PulseNOW,

    // Static genome fields (examples)
    capabilities: {
      routing: true,
      vitals: true,
      cortex: true,
      mesh: true,
      overlays: true,
      evolutions: true,
      binary: true
    },

    // Static structural hints
    structure: {
      organs: [
        "CoreMemory",
        "CoreEvolutions",
        "PulseWorldShadow",
        "PulseVitals",
        "PulseBridge",
        "PulseTouch",
        "PulseRouter",
        "PulseCortex",
        "PulseMesh"
      ],
      binaryBands: ["primary", "secondary"],
      storage: ["IndexedDB"]
    },

    // Optional: stable constants used across the organism
    constants: {
      ROUTE_TTL_MS: 24 * 60 * 60 * 1000,
      EVO_TTL_MS: 7 * 24 * 60 * 60 * 1000
    }
  };

  // ------------------------------------------------------------
  // SNAPSHOT — PURE, SAFE, ZERO-DRIFT
  // ------------------------------------------------------------
  function snapshot() {
    try {
      return {
        version: Genome.version,
        dnaTag: Genome.dnaTag,
        organism: Genome.organism,
        build: Genome.build,

        // stable identity
        epoch: Genome.epoch,

        // static capabilities
        capabilities: { ...Genome.capabilities },

        // structural hints
        structure: {
          organs: [...Genome.structure.organs],
          binaryBands: [...Genome.structure.binaryBands],
          storage: [...Genome.structure.storage]
        },

        // constants
        constants: { ...Genome.constants }
      };
    } catch {
      return {};
    }
  }

  // ------------------------------------------------------------
  // PUBLIC API
  // ------------------------------------------------------------
  return Object.freeze({
    snapshot,
    version: Genome.version,
    dnaTag: Genome.dnaTag
  });

})();
