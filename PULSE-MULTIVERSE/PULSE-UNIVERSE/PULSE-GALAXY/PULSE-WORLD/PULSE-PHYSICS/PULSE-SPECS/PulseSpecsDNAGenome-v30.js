// ============================================================================
// FILE: PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-WORLD/PULSE-SPECS/PulseSpecsDNAGenome-v30-IMMORTAL++-ONEBAND.js
// [pulse:specs] PULSE_SPECS_DNA_GENOME v30-IMMORTAL++-ONEBAND
// OS Data Genome • Canonical Field Language • Deterministic Translation Spec
// PURE SPEC — NO IO • NO NETWORK • NO AI • NO RUNTIME
// ============================================================================
//
// IDENTITY — THE OS DNA GENOME (v30-IMMORTAL++-ONEBAND):
// ------------------------------------------------------
// • Immutable genetic blueprint of Pulse OS (v10.4 → v30 IMMORTAL++).
// • Canonical PulseField language for all v12+ subsystems (GPU, Earn, Mesh).
// • Source of truth for SQL ↔ Pulse ↔ Firestore ↔ WorldDataProvider mappings.
// • Validation rulebook for translators + healers + shifter engines.
// • Schema cortex foundation for AI reasoning + component generation.
// • Drift‑proof, deterministic, backwards‑compatible, evolution‑safe.
// • Binary‑aware, pulse‑aware, dual‑band‑capable, but ONE‑BAND unified surface.
// • Presence / harmonics / IMMORTAL band metadata surfaced as pure schema only.
// • Multi‑backend aware (firebase/sql/worldDataProvider/custom/edge‑mesh).
// • v30++ adds: SignalPort hints, FinalityPort hints, EarnHint, GPUFrame,
//   WarmPathHint, ColdPathHint, PresenceBand v2, and Epoch‑30 stability.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
//
// NOTE: v30++ adds no breaking primitives. New types must degrade cleanly.
// ============================================================================


//  PULSE FIELDS CONTEXT — v31 IMMORTAL ONEBAND
// ============================================================================
export const PULSE_FIELDS_CONTEXT = Object.freeze({
  version: "v31-IMMORTAL++-ONEBAND",
  epoch: "v31-IMMORTAL",
  bandModel: "one-band-unified",
  notes: [
    "Binary-first substrate, symbolic-compatible.",
    "All routing/signal/finality hints are schema-only.",
    "Pure spec: no IO, no runtime, no side effects."
  ]
});

// ============================================================================
//  PULSE FIELD TYPES
// ============================================================================
export const PulseFieldTypes = {
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean",
  DATE: "date",
  TIMESTAMP: "timestamp",
  ARRAY: "array",
  OBJECT: "object",
  ID: "id",
  EMAIL: "email",
  PHONE: "phone",
  URL: "url",
  JSON: "json",

  // v1.2+ extensions
  ENUM: "enum",
  CURRENCY: "currency",
  PERCENT: "percent",
  NULLABLE: "nullable",

  // v11‑Evo binary/pulse extensions
  BINARY: "binary",
  BITFIELD: "bitfield",
  PULSE: "pulse",
  PULSE_BINARY: "pulse_binary",

  // v14 IMMORTAL band/shifter extensions
  BAND: "band",
  PRESENCE: "presence",
  HARMONICS: "harmonics",
  PULSE_SHIFTER: "pulse_shifter",
  PULSE_SHIFTER_BINARY: "pulse_shifter_binary",

  // v17 multi‑backend / world‑layer hints
  REGION_CODE: "region_code",
  TENANT_ID: "tenant_id",
  PARTITION_KEY: "partition_key",
  INDEX_HINT: "index_hint",

  // v20 IMMORTAL new field types
  INTELL_HASH: "intell_hash",
  BINARY_SUBSTRATE_FRAME: "binary_frame",
  WORLD_ROUTER_HINT: "world_router_hint",
  SCHEDULER_HINT: "scheduler_hint",
  IMMORTAL_EPOCH: "immortal_epoch",

  // v30++ ONE‑BAND extensions
  ONE_BAND_MODE: "one_band_mode",
  SIGNAL_PORT_HINT: "signal_port_hint",
  FINALITY_PORT_HINT: "finality_port_hint",
  EARN_HINT: "earn_hint",
  GPU_FRAME: "gpu_frame",
  WARM_PATH_HINT: "warm_path_hint",
  COLD_PATH_HINT: "cold_path_hint",
  PRESENCE_BAND_V2: "presence_band_v2"
};

// ============================================================================
//  PULSE FIELD RULES
// ============================================================================
export const PulseFieldRules = {
  string: { maxLength: 2048, trim: true },
  number: { allowFloat: true },
  boolean: {},
  date: { format: "YYYY-MM-DD" },
  timestamp: { format: "ISO8601" },
  array: { elementType: "any", maxLength: 1024 },
  object: { strict: false },
  id: { pattern: /^[A-Za-z0-9_-]+$/ },
  email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  phone: { pattern: /^[0-9+\-() ]+$/ },
  url: { pattern: /^https?:\/\/[^\s]+$/ },
  json: {},

  enum: {
    baseType: "string",
    allowedValues: [],
    maxLength: 255
  },
  currency: {
    baseType: "number",
    scale: 2,
    min: -90071992547409.91,
    max:  90071992547409.91
  },
  percent: {
    baseType: "number",
    normalized: false,
    min: 0,
    max: 100
  },
  nullable: {
    wrapper: true,
    allowNull: true
  },

  binary: {
    baseType: "string",
    encoding: "base64",
    maxLength: 8192
  },
  bitfield: {
    baseType: "number",
    min: 0
  },
  pulse: {
    baseType: "json",
    strict: false
  },
  pulse_binary: {
    baseType: "binary"
  },

  band: {
    baseType: "string",
    allowedValues: ["symbolic", "binary", "dual"],
    maxLength: 32
  },
  presence: {
    baseType: "json",
    strict: false
  },
  harmonics: {
    baseType: "json",
    strict: false
  },
  pulse_shifter: {
    baseType: "json",
    strict: false
  },
  pulse_shifter_binary: {
    baseType: "binary"
  },

  region_code: {
    baseType: "string",
    maxLength: 16
  },
  tenant_id: {
    baseType: "string",
    maxLength: 128
  },
  partition_key: {
    baseType: "string",
    maxLength: 256
  },
  index_hint: {
    baseType: "json",
    strict: false
  },

  intell_hash: {
    baseType: "string",
    encoding: "hex",
    length: 64,
    carriesSize: true,
    carriesAdvantageHint: true
  },

  binary_frame: {
    baseType: "binary",
    fixedWidth: true,
    carriesTag: true,
    carriesBand: true,
    carriesSize: true
  },

  world_router_hint: {
    baseType: "json",
    strict: false,
    fields: {
      route: "string",
      region: "string",
      tenant: "string",
      priority: "number"
    }
  },

  scheduler_hint: {
    baseType: "json",
    strict: false,
    fields: {
      cron: "string",
      window: "string",
      priority: "number"
    }
  },

  immortal_epoch: {
    baseType: "string",
    pattern: /^v[0-9]+-IMMORTAL(\+\+)?$/
  },

  one_band_mode: {
    baseType: "string",
    allowedValues: ["one-band", "dual-compatible"],
    maxLength: 32
  },

  signal_port_hint: {
    baseType: "json",
    strict: false,
    fields: {
      portId: "string",
      channel: "string",
      reliability: "string",
      qos: "number"
    }
  },

  finality_port_hint: {
    baseType: "json",
    strict: false,
    fields: {
      portId: "string",
      commitMode: "string",
      retryPolicy: "string",
      finalityWindowMs: "number"
    }
  },

  earn_hint: {
    baseType: "json",
    strict: false,
    fields: {
      earnProfile: "string",
      advantageBand: "string",
      yieldHint: "number"
    }
  },

  gpu_frame: {
    baseType: "json",
    strict: false,
    fields: {
      dispatchSignature: "string",
      shapeSignature: "string",
      binaryMode: "string",
      pressureBand: "string"
    }
  },

  warm_path_hint: {
    baseType: "json",
    strict: false,
    fields: {
      cacheTier: "string",
      priority: "number",
      prewarm: "boolean"
    }
  },

  cold_path_hint: {
    baseType: "json",
    strict: false,
    fields: {
      penaltyBand: "string",
      safeFallback: "boolean"
    }
  },

  presence_band_v2: {
    baseType: "json",
    strict: false,
    fields: {
      band: "string",
      context: "string",
      dnaTag: "string",
      instanceId: "string"
    }
  }
};

// ============================================================================
//  SQL → Pulse
// ============================================================================
export const SQLToPulse = {
  VARCHAR:   PulseFieldTypes.STRING,
  TEXT:      PulseFieldTypes.STRING,
  INT:       PulseFieldTypes.NUMBER,
  INTEGER:   PulseFieldTypes.NUMBER,
  BIGINT:    PulseFieldTypes.NUMBER,
  FLOAT:     PulseFieldTypes.NUMBER,
  DOUBLE:    PulseFieldTypes.NUMBER,
  BOOLEAN:   PulseFieldTypes.BOOLEAN,
  DATE:      PulseFieldTypes.DATE,
  TIMESTAMP: PulseFieldTypes.TIMESTAMP,
  JSON:      PulseFieldTypes.JSON,

  DECIMAL:   PulseFieldTypes.NUMBER,
  NUMERIC:   PulseFieldTypes.NUMBER,

  VARBINARY: PulseFieldTypes.BINARY,
  BLOB:      PulseFieldTypes.BINARY,
  BIT:       PulseFieldTypes.BITFIELD
};

// ============================================================================
//  Firestore → Pulse
// ============================================================================
export const FirestoreToPulse = {
  string:    PulseFieldTypes.STRING,
  number:    PulseFieldTypes.NUMBER,
  boolean:   PulseFieldTypes.BOOLEAN,
  timestamp: PulseFieldTypes.TIMESTAMP,
  array:     PulseFieldTypes.ARRAY,
  map:       PulseFieldTypes.OBJECT,
  null:      PulseFieldTypes.JSON,
  bytes:     PulseFieldTypes.BINARY
};

// ============================================================================
//  Pulse → SQL
// ============================================================================
export const PulseToSQL = {
  string:   "VARCHAR(255)",
  number:   "DOUBLE",
  boolean:  "BOOLEAN",
  date:     "DATE",
  timestamp:"TIMESTAMP",
  array:    "JSON",
  object:   "JSON",
  id:       "VARCHAR(64)",
  email:    "VARCHAR(255)",
  phone:    "VARCHAR(32)",
  url:      "VARCHAR(512)",
  json:     "JSON",

  enum:     "VARCHAR(255)",
  currency: "DECIMAL(18,2)",
  percent:  "DOUBLE",
  nullable: "JSON",

  binary:        "VARBINARY(8192)",
  bitfield:      "BIGINT",
  pulse:         "JSON",
  pulse_binary:  "VARBINARY(8192)",

  band:                 "VARCHAR(32)",
  presence:             "JSON",
  harmonics:            "JSON",
  pulse_shifter:        "JSON",
  pulse_shifter_binary: "VARBINARY(8192)",

  region_code:   "VARCHAR(16)",
  tenant_id:     "VARCHAR(128)",
  partition_key: "VARCHAR(256)",
  index_hint:    "JSON",

  intell_hash:          "CHAR(64)",
  binary_frame:         "VARBINARY(8192)",
  world_router_hint:    "JSON",
  scheduler_hint:       "JSON",
  immortal_epoch:       "VARCHAR(32)",

  one_band_mode:        "VARCHAR(32)",
  signal_port_hint:     "JSON",
  finality_port_hint:   "JSON",
  earn_hint:            "JSON",
  gpu_frame:            "JSON",
  warm_path_hint:       "JSON",
  cold_path_hint:       "JSON",
  presence_band_v2:     "JSON"
};

// ============================================================================
//  Pulse → Firestore
// ============================================================================
export const PulseToFirestore = {
  string:   "string",
  number:   "number",
  boolean:  "boolean",
  date:     "timestamp",
  timestamp:"timestamp",
  array:    "array",
  object:   "map",
  id:       "string",
  email:    "string",
  phone:    "string",
  url:      "string",
  json:     "map",

  enum:     "string",
  currency: "number",
  percent:  "number",
  nullable: "map",

  binary:        "bytes",
  bitfield:      "number",
  pulse:         "map",
  pulse_binary:  "bytes",

  band:                 "string",
  presence:             "map",
  harmonics:            "map",
  pulse_shifter:        "map",
  pulse_shifter_binary: "bytes",

  region_code:   "string",
  tenant_id:     "string",
  partition_key: "string",
  index_hint:    "map",

  intell_hash:          "string",
  binary_frame:         "bytes",
  world_router_hint:    "map",
  scheduler_hint:       "map",
  immortal_epoch:       "string",

  one_band_mode:        "string",
  signal_port_hint:     "map",
  finality_port_hint:   "map",
  earn_hint:            "map",
  gpu_frame:            "map",
  warm_path_hint:       "map",
  cold_path_hint:       "map",
  presence_band_v2:     "map"
};

// ============================================================================
//  Pulse → World Data Provider
// ============================================================================
export const PulseToWorldDataProvider = {
  string:   "string",
  number:   "number",
  boolean:  "boolean",
  date:     "date",
  timestamp:"timestamp",
  array:    "array",
  object:   "object",
  id:       "id",
  email:    "string",
  phone:    "string",
  url:      "string",
  json:     "json",

  enum:     "string",
  currency: "number",
  percent:  "number",
  nullable: "nullable",

  binary:        "binary",
  bitfield:      "number",
  pulse:         "json",
  pulse_binary:  "binary",

  band:                 "string",
  presence:             "json",
  harmonics:            "json",
  pulse_shifter:        "json",
  pulse_shifter_binary: "binary",

  region_code:   "string",
  tenant_id:     "string",
  partition_key: "string",
  index_hint:    "json",

  intell_hash:          "string",
  binary_frame:         "binary",
  world_router_hint:    "json",
  scheduler_hint:       "json",
  immortal_epoch:       "string",

  one_band_mode:        "string",
  signal_port_hint:     "json",
  finality_port_hint:   "json",
  earn_hint:            "json",
  gpu_frame:            "json",
  warm_path_hint:       "json",
  cold_path_hint:       "json",
  presence_band_v2:     "json"
};

// ============================================================================
//  VALIDATION
// ============================================================================
export function validatePulseField(field) {
  if (!field || !field.type) {
    throw new Error("PulseField missing type");
  }

  const rules = PulseFieldRules[field.type];
  if (!rules) {
    throw new Error(`Unknown PulseField type: ${field.type}`);
  }

  if (field.type === "enum") {
    if (!Array.isArray(field.allowedValues) || field.allowedValues.length === 0) {
      throw new Error("PulseField enum requires non-empty allowedValues array");
    }
  }

  if (field.type === "nullable") {
    if (!field.innerType || !PulseFieldRules[field.innerType]) {
      throw new Error("PulseField nullable requires valid innerType");
    }
  }

  return true;
}

// ============================================================================
//  PulseSpecsDNAGenome-v31 — IMMORTAL ONEBAND CONTINUANCE GENOME
// ============================================================================

export const PulseSpecsDNAGenome = (() => {

  // INTERNAL DNA REGISTRY
  const _registry = Object.create(null);

  // --------------------------------------------------------------------------
  // REGISTER DNA
  // --------------------------------------------------------------------------
  function registerDNA(dna) {
    if (!dna || !dna.name) {
      throw new Error("DNA must have a name");
    }
    _registry[dna.name] = dna;
  }

  // --------------------------------------------------------------------------
  // PUBLIC ACCESSOR — THE ONE YOU NEED
  // --------------------------------------------------------------------------
  function getDNA(dnaName) {
    if (!dnaName) throw new Error("getDNA requires dnaName");
    const dna = _registry[dnaName];
    if (!dna) throw new Error(`Unknown DNA: ${dnaName}`);
    return dna;
  }

  // --------------------------------------------------------------------------
  // OPTIONAL HELPERS
  // --------------------------------------------------------------------------
  function listDNA() {
    return Object.keys(_registry);
  }

  function hasDNA(name) {
    return !!_registry[name];
  }

  // --------------------------------------------------------------------------
  // EXPORT PUBLIC API
  // --------------------------------------------------------------------------
  return {
    registerDNA,
    getDNA,     // ⭐ EXACTLY WHAT YOU ASKED FOR
    listDNA,
    hasDNA
  };

})();


// ============================================================================
//  FINAL SPEC EXPORT
// ============================================================================
export const PULSE_FIELDS_SPEC = Object.freeze({
  ...PULSE_FIELDS_CONTEXT,
  types: Object.freeze({ ...PulseFieldTypes }),
  rules: Object.freeze({ ...PulseFieldRules }),
  sqlToPulse: Object.freeze({ ...SQLToPulse }),
  firestoreToPulse: Object.freeze({ ...FirestoreToPulse }),
  pulseToSQL: Object.freeze({ ...PulseToSQL }),
  pulseToFirestore: Object.freeze({ ...PulseToFirestore }),
  pulseToWorldDataProvider: Object.freeze({ ...PulseToWorldDataProvider }),

});
