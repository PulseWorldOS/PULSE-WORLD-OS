/* ============================================================================
 *  PulseTranslatorSkeletalClient.js — v30-IMMORTAL-OMNIBAND
 *  CLIENT-SIDE SQL TRANSLATOR (PURE • DETERMINISTIC • ZERO IO)
 *
 *  ROLE:
 *    • Converts PulseField → SQL column definitions (client-safe, engine-aware)
 *    • Converts PulseSchema → SQL CREATE TABLE statements
 *    • Converts PulseField changes → SQL migration fragments
 *    • Emits engine profiles (SQL Server / Postgres / MySQL / Generic)
 *    • Preserves band/presence/harmonics/shifter + region/tenant/partition hints
 *
 *  GUARANTEES (IMMORTAL-TIER v30):
 *    • Deterministic: same schema → same SQL
 *    • Zero IO: no network, no filesystem, no DB connections
 *    • Zero Mutation: never mutates inputs
 *    • Engine-Agnostic Core + Engine-Specific Profiles
 *    • Band-Contract-Aware (symbolic/binary/dual)
 *    • Nullable-Envelope-Aware (JSON envelope)
 *    • Future-Engine-Ready (DuckDB, SQLite, etc.)
 * ========================================================================== */

export const PulseTranslatorSkeletalClientMeta = Object.freeze({
  identity: "PulseTranslatorSkeletalClient-v30-IMMORTAL-OMNIBAND",
  layer: "PulseClientTranslator",
  role: "SQL_TRANSLATOR_CLIENT",
  version: "30-IMMORTAL-OMNIBAND",
  deterministic: true,
  driftProof: true,
  zeroIO: true,
  zeroNetwork: true,
  zeroMutation: true,
  engineProfiles: ["generic-sql", "sqlserver", "postgres", "mysql"],
});

/* ============================================================================
 *  ENGINE PROFILES (TYPE DIALECTS)
 *
 *  These are *client-side* hints. Your backend adapter can override/upgrade
 *  them (e.g., NVARCHAR, DATETIME2, jsonb, etc.), but the mapping here is
 *  stable and deterministic.
 * ========================================================================== */

const ENGINE_PROFILES = Object.freeze({
  "generic-sql": {
    string: "VARCHAR(255)",
    text: "TEXT",
    json: "JSON",
    bool: "BOOLEAN",
    int: "INT",
    bigint: "BIGINT",
    float: "FLOAT",
    decimal: (scale = 2) => `DECIMAL(18,${scale})`,
    datetime: "DATETIME",
    binary: (size = 8192) => `VARBINARY(${size})`,
  },

  sqlserver: {
    string: "NVARCHAR(255)",
    text: "NVARCHAR(MAX)",
    json: "NVARCHAR(MAX)", // with CHECK(ISJSON(column)=1) in backend
    bool: "BIT",
    int: "INT",
    bigint: "BIGINT",
    float: "FLOAT",
    decimal: (scale = 2) => `DECIMAL(18,${scale})`,
    datetime: "DATETIME2(3)",
    binary: (size = 8192) => `VARBINARY(${size})`,
  },

  postgres: {
    string: "VARCHAR(255)",
    text: "TEXT",
    json: "JSONB",
    bool: "BOOLEAN",
    int: "INTEGER",
    bigint: "BIGINT",
    float: "DOUBLE PRECISION",
    decimal: (scale = 2) => `NUMERIC(18,${scale})`,
    datetime: "TIMESTAMPTZ",
    binary: (size = 8192) => `BYTEA`,
  },

  mysql: {
    string: "VARCHAR(255)",
    text: "LONGTEXT",
    json: "JSON",
    bool: "TINYINT(1)",
    int: "INT",
    bigint: "BIGINT",
    float: "DOUBLE",
    decimal: (scale = 2) => `DECIMAL(18,${scale})`,
    datetime: "DATETIME(3)",
    binary: (size = 8192) => `VARBINARY(${size})`,
  },
});

/* ============================================================================
 *  BEST-PRACTICE NOTES (ENGINE-AWARE)
 *
 *  These mirror your v24 notes but generalized for v30 multi-engine:
 *
 *  • STRING:
 *      - SQL Server: NVARCHAR(255)
 *      - Postgres: VARCHAR(255) or TEXT
 *      - MySQL: VARCHAR(255)
 *
 *  • DATE/TIME:
 *      - SQL Server: DATETIME2(3)
 *      - Postgres: TIMESTAMPTZ
 *      - MySQL: DATETIME(3)
 *
 *  • NULLABLE WRAPPER:
 *      - Represented as JSON envelope column.
 *
 *  • BAND / PRESENCE / HARMONICS / SHIFTER:
 *      - Stored as JSON or small VARCHAR depending on type.
 *
 *  • REGION / TENANT / PARTITION:
 *      - Short VARCHAR with deterministic length caps.
 *
 *  • INDEXING:
 *      - Clustered/primary on id (BIGINT snowflake).
 *      - Nonclustered/secondary on createdAt, updatedAt, userId, FKs.
 * ========================================================================== */

/* ---------------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------------ */
function normalizeSQLName(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_");
}

function getEngineProfile(engine = "generic-sql") {
  return ENGINE_PROFILES[engine] || ENGINE_PROFILES["generic-sql"];
}

/* ---------------------------------------------------------------------------
 * PulseField → SQL column definition (v30 OMNIBAND)
 *
 *  field: {
 *    name: string,
 *    type: string (PulseFieldTypes-like string),
 *    scale?: number,
 *    strictBand?: boolean,
 *    innerType?: string,   // for NULLABLE
 *    ...hints
 *  }
 *
 *  options: {
 *    engine?: "generic-sql" | "sqlserver" | "postgres" | "mysql",
 *    bandAsEnum?: boolean,          // map BAND to ENUM-like string
 *    jsonAsNative?: boolean,        // prefer native JSON type if engine supports
 *  }
 * ------------------------------------------------------------------------ */
export function translatePulseFieldClient(field, options = {}) {
  if (!field || typeof field !== "object") {
    throw new Error("Invalid PulseField for client translation");
  }

  const engine = options.engine || "generic-sql";
  const profile = getEngineProfile(engine);
  const columnName = normalizeSQLName(field.name);
  const t = String(field.type || "").toUpperCase();

  // Helper shortcuts
  const jsonType = options.jsonAsNative ? profile.json : profile.text;
  const decimalType = profile.decimal;
  const binaryType = profile.binary;

  // NULLABLE → JSON envelope
  if (t === "NULLABLE") {
    return `${columnName} ${jsonType}`;
  }

  // ENUM → string-ish
  if (t === "ENUM") {
    return `${columnName} ${profile.string}`;
  }

  // CURRENCY → DECIMAL(18,scale)
  if (t === "CURRENCY") {
    const scale = typeof field.scale === "number" ? field.scale : 2;
    return `${columnName} ${decimalType(scale)}`;
  }

  // PERCENT → FLOAT/DOUBLE
  if (t === "PERCENT") {
    return `${columnName} ${profile.float}`;
  }

  // BASIC NUMERIC / BOOLEAN / TEXT / STRING / DATE
  if (t === "INT" || t === "INTEGER") {
    return `${columnName} ${profile.int}`;
  }

  if (t === "BIGINT") {
    return `${columnName} ${profile.bigint}`;
  }

  if (t === "TEXT") {
    return `${columnName} ${profile.text}`;
  }

  if (t === "STRING") {
    return `${columnName} ${profile.string}`;
  }

  if (t === "BOOL" || t === "BOOLEAN") {
    return `${columnName} ${profile.bool}`;
  }

  if (t === "DATE" || t === "DATETIME" || t === "TIMESTAMP") {
    return `${columnName} ${profile.datetime}`;
  }

  // BINARY / PULSE_BINARY
  if (t === "BINARY" || t === "PULSE_BINARY") {
    return `${columnName} ${binaryType(8192)}`;
  }

  // BITFIELD
  if (t === "BITFIELD") {
    // Keep generic, backend can refine to BIT / VARBINARY(64)
    return `${columnName} ${binaryType(64)}`;
  }

  // PULSE / PRESENCE / HARMONICS / SHIFTER → JSON
  if (
    t === "PULSE" ||
    t === "PRESENCE" ||
    t === "HARMONICS" ||
    t === "PULSE_SHIFTER"
  ) {
    return `${columnName} ${jsonType}`;
  }

  // BAND → small string (symbolic/binary/dual)
  if (t === "BAND") {
    if (options.bandAsEnum) {
      // Client-side generic ENUM-like; backend can upgrade to real ENUM
      return `${columnName} ${profile.string}`;
    }
    return `${columnName} ${profile.string}`;
  }

  // REGION / TENANT / PARTITION / INDEX_HINT
  if (t === "REGION_CODE") {
    return `${columnName} VARCHAR(16)`;
  }

  if (t === "TENANT_ID") {
    return `${columnName} VARCHAR(128)`;
  }

  if (t === "PARTITION_KEY") {
    return `${columnName} VARCHAR(256)`;
  }

  if (t === "INDEX_HINT") {
    return `${columnName} ${jsonType}`;
  }

  // GEOPOINT / DOCUMENT_REF / MISC OBJECTS → JSON
  if (t === "GEOPOINT" || t === "DOCUMENT_REF" || t === "OBJECT" || t === "JSON") {
    return `${columnName} ${jsonType}`;
  }

  // DEFAULT STRING TYPE
  return `${columnName} ${profile.string}`;
}

/* ---------------------------------------------------------------------------
 * PulseSchema → SQL column list (v30)
 * ------------------------------------------------------------------------ */
export function translatePulseSchemaClient(schemaObject = {}, options = {}) {
  return Object.values(schemaObject).map((field) =>
    translatePulseFieldClient(field, options)
  );
}

/* ---------------------------------------------------------------------------
 * CREATE TABLE generator (v30)
 *
 *  options:
 *    engine?: profile name
 *    includeIfNotExists?: boolean
 * ------------------------------------------------------------------------ */
export function generateCreateTableClient(
  tableName,
  schemaObject = {},
  options = {}
) {
  const normalized = normalizeSQLName(tableName);
  const columns = translatePulseSchemaClient(schemaObject, options);
  const ifNotExists = options.includeIfNotExists ? "IF NOT EXISTS " : "";

  return `
CREATE TABLE ${ifNotExists}${normalized} (
  ${columns.join(",\n  ")}
);`.trim();
}

/* ---------------------------------------------------------------------------
 * Migration: ADD COLUMN (v30)
 * ------------------------------------------------------------------------ */
export function generateAddColumnClient(tableName, field, options = {}) {
  const normalized = normalizeSQLName(tableName);
  const col = translatePulseFieldClient(field, options);
  return `ALTER TABLE ${normalized} ADD ${col};`;
}

/* ---------------------------------------------------------------------------
 * Migration: DROP COLUMN (v30)
 * ------------------------------------------------------------------------ */
export function generateDropColumnClient(tableName, columnName) {
  const normalized = normalizeSQLName(tableName);
  const col = normalizeSQLName(columnName);
  return `ALTER TABLE ${normalized} DROP COLUMN ${col};`;
}

/* ---------------------------------------------------------------------------
 * Migration: RENAME COLUMN (new in v30)
 * ------------------------------------------------------------------------ */
export function generateRenameColumnClient(
  tableName,
  oldName,
  newName,
  options = {}
) {
  const engine = options.engine || "generic-sql";
  const normalizedTable = normalizeSQLName(tableName);
  const oldCol = normalizeSQLName(oldName);
  const newCol = normalizeSQLName(newName);

  if (engine === "sqlserver") {
    return `EXEC sp_rename '${normalizedTable}.${oldCol}', '${newCol}', 'COLUMN';`;
  }

  if (engine === "postgres") {
    return `ALTER TABLE ${normalizedTable} RENAME COLUMN ${oldCol} TO ${newCol};`;
  }

  if (engine === "mysql") {
    // MySQL requires full column definition; caller should supply it separately.
    return `-- MySQL rename requires full column definition\nALTER TABLE ${normalizedTable} RENAME COLUMN ${oldCol} TO ${newCol};`;
  }

  return `ALTER TABLE ${normalizedTable} RENAME COLUMN ${oldCol} TO ${newCol};`;
}
