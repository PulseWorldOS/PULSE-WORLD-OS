/* ============================================================================
===============================================================================
EXPORT_META = {
  organ: "PulseTranslator.SkeletalOutput",
  layer: "pulse_translator",
  stability: "IMMORTAL",
  deterministic: true,
  pure: true,

  consumes: [
    "PulseField",
    "PulseFieldSchemaMap",
    "PulseTableName",
    "PulseSqlDialect"
  ],

  produces: [
    "SQLColumnDefinition",
    "SQLColumnDefinition[]",
    "SQLCreateTableStatement",
    "SQLMigrationFragment",
    "SQLIndexDefinition[]"
  ],

  sideEffects: "none",
  network: "none",
  filesystem: "none",
  sql: "no_execution"
}
===============================================================================
FILE: /pulse-translator/PulseTranslatorSkeletalOutput-v30.js
LAYER: PULSE → SQL SKELETAL OUTPUT (IMMORTAL v30 EVO+++)
DIALECTS: sqlserver | postgres | mysql (deterministic, drift-proof)
===============================================================================
*/
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

import {
  PulseToSQL,
  PulseFieldTypes,
  validatePulseField
} from "../PULSE-SPECS/PulseSpecsDNAGenome-v30.js";

const SKELETAL_OUTPUT_SCHEMA_VERSION = "v5"; // v30 EVO+++

/**
 * Dialect-aware type mapping helpers
 * sqlDialect: "sqlserver" | "postgres" | "mysql"
 */

function jsonType(sqlDialect) {
  if (sqlDialect === "postgres") return "JSONB";
  if (sqlDialect === "mysql") return "JSON";
  return "NVARCHAR(MAX)"; // sqlserver
}

function varBinaryType(sqlDialect, bytes = 8192) {
  if (sqlDialect === "postgres") return "BYTEA";
  if (sqlDialect === "mysql") return `VARBINARY(${bytes})`;
  return `VARBINARY(${bytes})`; // sqlserver
}

function textType(sqlDialect, length = 255) {
  if (sqlDialect === "postgres") return length ? `VARCHAR(${length})` : "TEXT";
  if (sqlDialect === "mysql") return length ? `VARCHAR(${length})` : "TEXT";
  return length ? `VARCHAR(${length})` : "NVARCHAR(MAX)"; // sqlserver
}

function doubleType(sqlDialect) {
  if (sqlDialect === "postgres") return "DOUBLE PRECISION";
  if (sqlDialect === "mysql") return "DOUBLE";
  return "FLOAT"; // sqlserver
}

function boolType(sqlDialect) {
  if (sqlDialect === "postgres") return "BOOLEAN";
  if (sqlDialect === "mysql") return "TINYINT(1)";
  return "BIT"; // sqlserver
}

/* ============================================================================
   translatePulseField(field, sqlDialect)
   Converts a PulseField → SQL column definition (IMMORTAL bone, v30 EVO+++).
   v30:
     • nullable envelope → dialect JSON envelope
     • enum → VARCHAR(255) (dialect-safe)
     • currency → DECIMAL(18,scale)
     • percent → DOUBLE/DOUBLE PRECISION/FLOAT
     • binary/pulse_binary → dialect VARBINARY/BYTEA
     • presence/harmonics/shifter → JSON/JSONB/NVARCHAR(MAX)
     • band → VARCHAR(32)
     • region/tenant/partition → VARCHAR(16/128/256)
     • bitfield → VARBINARY(64)/BYTEA
     • indexHint → JSON
     • ruleHints-aware: primaryKey, unique, indexed, clustered hints (returned separately)
=============================================================================== */
export function translatePulseField(field, sqlDialect = "sqlserver") {
  validatePulseField(field);

  const columnName = normalizeSQLName(field.name);
  const baseType = resolveBaseType(field, sqlDialect);

  return `${columnName} ${baseType}`;
}

function resolveBaseType(field, sqlDialect) {
  // NULLABLE envelope → JSON envelope (dialect-aware)
  if (field.type === PulseFieldTypes.NULLABLE) {
    return jsonType(sqlDialect);
  }

  // ENUM → VARCHAR(255)
  if (field.type === PulseFieldTypes.ENUM) {
    return textType(sqlDialect, 255);
  }

  // CURRENCY → DECIMAL(18,scale)
  if (field.type === PulseFieldTypes.CURRENCY) {
    const scale = typeof field.scale === "number" ? field.scale : 2;
    return `DECIMAL(18,${scale})`;
  }

  // PERCENT → DOUBLE
  if (field.type === PulseFieldTypes.PERCENT) {
    return doubleType(sqlDialect);
  }

  // BINARY / PULSE_BINARY → VARBINARY/BYTEA
  if (
    field.type === PulseFieldTypes.BINARY ||
    field.type === PulseFieldTypes.PULSE_BINARY
  ) {
    return varBinaryType(sqlDialect, 8192);
  }

  // BITFIELD → VARBINARY(64)/BYTEA
  if (field.type === PulseFieldTypes.BITFIELD) {
    return varBinaryType(sqlDialect, 64);
  }

  // PULSE / PRESENCE / HARMONICS / SHIFTER → JSON
  if (
    field.type === PulseFieldTypes.PULSE ||
    field.type === PulseFieldTypes.PRESENCE ||
    field.type === PulseFieldTypes.HARMONICS ||
    field.type === PulseFieldTypes.PULSE_SHIFTER
  ) {
    return jsonType(sqlDialect);
  }

  // BAND → VARCHAR(32)
  if (field.type === PulseFieldTypes.BAND) {
    return textType(sqlDialect, 32);
  }

  // REGION / TENANT / PARTITION → VARCHAR
  if (field.type === PulseFieldTypes.REGION_CODE) {
    return textType(sqlDialect, 16);
  }

  if (field.type === PulseFieldTypes.TENANT_ID) {
    return textType(sqlDialect, 128);
  }

  if (field.type === PulseFieldTypes.PARTITION_KEY) {
    return textType(sqlDialect, 256);
  }

  // INDEX_HINT → JSON
  if (field.type === PulseFieldTypes.INDEX_HINT) {
    return jsonType(sqlDialect);
  }

  // BOOLEAN → dialect bool
  if (field.type === PulseFieldTypes.BOOLEAN) {
    return boolType(sqlDialect);
  }

  // DEFAULT GENOME MAPPING
  const sqlType = PulseToSQL[field.type];
  if (sqlType) return sqlType;

  // Fallback
  return textType(sqlDialect, 255);
}

/* ============================================================================
   translatePulseSchema(schemaObject, sqlDialect)
   Returns array of column definitions (no PK/indices).
=============================================================================== */
export function translatePulseSchema(schemaObject = {}, sqlDialect = "sqlserver") {
  const columns = [];

  for (const field of Object.values(schemaObject)) {
    columns.push(translatePulseField(field, sqlDialect));
  }

  return columns;
}

/* ============================================================================
   extractIndexDefinitions(schemaObject, sqlDialect)
   v30 EVO+++:
     • Reads field.ruleHints / field.index / field.primaryKey / field.unique
     • Produces dialect-agnostic index definitions (later rendered to SQL)
=============================================================================== */
export function extractIndexDefinitions(schemaObject = {}, sqlDialect = "sqlserver") {
  const indices = [];
  const primaryKeys = [];

  for (const field of Object.values(schemaObject)) {
    const name = normalizeSQLName(field.name);
    const hints = field.ruleHints || {};
    const isPk = field.primaryKey || hints.primaryKey === true;
    const isUnique = field.unique || hints.unique === true;
    const isIndexed = field.index || hints.indexed === true;

    if (isPk) {
      primaryKeys.push(name);
    } else if (isUnique) {
      indices.push({
        kind: "unique",
        columns: [name],
        sqlDialect
      });
    } else if (isIndexed) {
      indices.push({
        kind: "index",
        columns: [name],
        sqlDialect
      });
    }
  }

  return { primaryKeys, indices };
}

/* ============================================================================
   generateCreateTable(tableName, schemaObject, sqlDialect)
   v30 EVO+++:
     • Includes PRIMARY KEY clause (if any)
     • Leaves indices as separate statements (via generateIndexStatements)
=============================================================================== */
export function generateCreateTable(tableName, schemaObject = {}, sqlDialect = "sqlserver") {
  const normalized = normalizeSQLName(tableName);
  const columns = translatePulseSchema(schemaObject, sqlDialect);
  const { primaryKeys } = extractIndexDefinitions(schemaObject, sqlDialect);

  const pkClause =
    primaryKeys.length > 0
      ? `,\n  PRIMARY KEY (${primaryKeys.join(", ")})`
      : "";

  return `
CREATE TABLE ${normalized} (
  ${columns.join(",\n  ")}${pkClause}
);`.trim();
}

/* ============================================================================
   generateIndexStatements(tableName, schemaObject, sqlDialect)
   v30 EVO+++:
     • Generates CREATE INDEX / CREATE UNIQUE INDEX statements
=============================================================================== */
export function generateIndexStatements(tableName, schemaObject = {}, sqlDialect = "sqlserver") {
  const normalized = normalizeSQLName(tableName);
  const { indices } = extractIndexDefinitions(schemaObject, sqlDialect);

  const stmts = [];

  indices.forEach((idx, i) => {
    const cols = idx.columns.join(", ");
    const baseName = `${normalized}_${idx.columns.join("_")}_${idx.kind}_${i + 1}`;
    const indexName = normalizeSQLName(baseName);

    const unique = idx.kind === "unique" ? "UNIQUE " : "";

    stmts.push(
      `CREATE ${unique}INDEX ${indexName} ON ${normalized} (${cols});`
    );
  });

  return stmts;
}

/* ============================================================================
   generateAddColumn(tableName, field, sqlDialect)
=============================================================================== */
export function generateAddColumn(tableName, field, sqlDialect = "sqlserver") {
  validatePulseField(field);

  const normalized = normalizeSQLName(tableName);
  const columnDef = translatePulseField(field, sqlDialect);

  return `ALTER TABLE ${normalized} ADD ${columnDef};`;
}

/* ============================================================================
   generateDropColumn(tableName, columnName)
=============================================================================== */
export function generateDropColumn(tableName, columnName) {
  const normalized = normalizeSQLName(tableName);
  const col = normalizeSQLName(columnName);

  return `ALTER TABLE ${normalized} DROP COLUMN ${col};`;
}

/* ============================================================================
   generateMigrationFragment(oldSchema, newSchema, tableName, sqlDialect)
   v30 EVO+++ (very conservative):
     • Columns in newSchema but not in oldSchema → ADD COLUMN
     • Columns in oldSchema but not in newSchema → DROP COLUMN
     • No in-place type changes (left to higher-level migrator)
=============================================================================== */
export function generateMigrationFragment(
  oldSchema = {},
  newSchema = {},
  tableName,
  sqlDialect = "sqlserver"
) {
  const stmts = [];
  const oldKeys = new Set(Object.keys(oldSchema));
  const newKeys = new Set(Object.keys(newSchema));

  // Additions
  for (const key of newKeys) {
    if (!oldKeys.has(key)) {
      stmts.push(generateAddColumn(tableName, newSchema[key], sqlDialect));
    }
  }

  // Deletions
  for (const key of oldKeys) {
    if (!newKeys.has(key)) {
      stmts.push(generateDropColumn(tableName, key));
    }
  }

  return stmts;
}

/* ============================================================================
   Helpers
=============================================================================== */
function normalizeSQLName(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_");
}
// ------------------------------------------------------------
  // NEW: Direct helpers for Firebase + SQL path resolution
  // ------------------------------------------------------------
  // ============================================================================
//  PulseTranslatorSkeletalOutput-v31
//  Converts skeletal objects to backend-ready formats
//  + resolves backend paths/tables
//  + converts SQL rows → Pulse
//  + converts Firebase docs → Pulse
// ============================================================================

export const PulseTranslatorSkeletalOutput = {

  // ------------------------------------------------------------
  //  FIREBASE PATH RESOLUTION
  // ------------------------------------------------------------
  toFirebasePath(dna) {
    if (!dna || !dna.name) {
      throw new Error("toFirebasePath requires a DNA with a name");
    }

    // DNA override
    if (dna.backend.firebasePath) {
      return dna.backend.firebasePath;
    }

    // Default: lowercase plural
    return dna.name.toLowerCase() + "s";
  },

  // ------------------------------------------------------------
  //  SQL TABLE RESOLUTION
  // ------------------------------------------------------------
  toSqlTable(dna) {
    if (!dna || !dna.name) {
      throw new Error("toSqlTable requires a DNA with a name");
    }

    // DNA override
    if (dna.backend.sqlTable) {
      return dna.backend.sqlTable;
    }

    // Default: snake_case
    return dna.name
      .replace(/[A-Z]/g, m => "_" + m.toLowerCase())
      .replace(/^_/, "");
  },

  // ------------------------------------------------------------
  //  SQL ROW → PULSE OBJECT
  // ------------------------------------------------------------
  fromSqlRow(dna, row) {
    if (!dna || !dna.fields) {
      throw new Error("fromSqlRow requires a DNA with fields");
    }
    if (!row || typeof row !== "object") {
      throw new Error("fromSqlRow requires a SQL row object");
    }

    const out = {};

    for (const [fieldName, fieldSpec] of Object.entries(dna.fields)) {
      let value = row[fieldName];

      switch (fieldSpec.type) {
        case "number":
        case "currency":
        case "percent":
        case "bitfield":
          value = value != null ? Number(value) : null;
          break;

        case "boolean":
          value = Boolean(value);
          break;

        case "date":
        case "timestamp":
          value = value ? new Date(value).toISOString() : null;
          break;

        case "json":
        case "object":
        case "pulse":
        case "presence":
        case "harmonics":
        case "pulse_shifter":
          try {
            value = value ? JSON.parse(value) : {};
          } catch {
            value = {};
          }
          break;

        case "binary":
        case "pulse_binary":
        case "binary_frame":
          value = value || null; // assume Buffer or base64
          break;

        default:
          // string, id, email, url, etc.
          value = value ?? null;
      }

      out[fieldName] = value;
    }

    return out;
  },

  // ------------------------------------------------------------
  //  FIREBASE DOC → PULSE OBJECT
  // ------------------------------------------------------------
  fromFirebaseDoc(dna, doc) {
    if (!dna || !dna.fields) {
      throw new Error("fromFirebaseDoc requires a DNA with fields");
    }
    if (!doc || typeof doc.data !== "function") {
      throw new Error("fromFirebaseDoc requires a Firestore document");
    }

    const data = doc.data() || {};
    const out = {};

    for (const [fieldName, fieldSpec] of Object.entries(dna.fields)) {
      let value = data[fieldName];

      switch (fieldSpec.type) {
        case "number":
        case "currency":
        case "percent":
        case "bitfield":
          value = value != null ? Number(value) : null;
          break;

        case "boolean":
          value = Boolean(value);
          break;

        case "date":
        case "timestamp":
          value = value ? new Date(value.toDate()).toISOString() : null;
          break;

        case "json":
        case "object":
        case "pulse":
        case "presence":
        case "harmonics":
        case "pulse_shifter":
          value = value || {};
          break;

        case "binary":
        case "pulse_binary":
        case "binary_frame":
          value = value || null; // Firestore bytes
          break;

        default:
          value = value ?? null;
      }

      out[fieldName] = value;
    }

    return out;
  }
};
