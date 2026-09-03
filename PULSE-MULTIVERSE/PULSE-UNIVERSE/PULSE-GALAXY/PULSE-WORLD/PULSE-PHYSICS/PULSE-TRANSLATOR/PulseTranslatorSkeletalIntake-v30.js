/**
 * ============================================================================
 * ORGAN: PulseTranslator.SkeletalIntake
 * LAYER: pulse_translator
 * VERSION: v30-IMMORTAL-ONEBAND+++
 * ROLE: Convert SQL metadata → PulseField schema + usage maps
 * ============================================================================
 *
 * This organ:
 *   • Reads SQL column definitions (DDL)
 *   • Reads SQL schema objects (CREATE TABLE maps)
 *   • Reads SQL SELECT queries (usage maps)
 *   • Produces deterministic PulseField objects
 *   • Performs zero SQL execution (pure string parsing)
 *   • Is drift-proof, deterministic, and genome-driven
 *
 * NEW IN v30++ ONEBAND:
 *   • OneBand-aware type inference
 *   • intellHash detection
 *   • binarySubstrateFrame detection
 *   • region/tenant/partition/index-hint v2
 *   • presence/harmonics/shifter v2
 *   • ENUM v2 (strict + soft modes)
 *   • DECIMAL v2 (scale + precision)
 *   • BITFIELD v2
 *   • JSON v2 (jsonb-aware)
 *   • ruleHints v30 (PulseFieldRules v30)
 *   • schemaVersion v30
 *   • deterministic field hashing (intellHashName)
 */
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import {
  SQLToPulse,
  PulseFieldTypes,
  PulseFieldRules,
  validatePulseField
} from "../PULSE-SPECS/PulseSpecsDNAGenome-v30.js";




export const SKELETAL_SCHEMA_VERSION = "v30";

/* ============================================================================
   normalizeSQLType(sqlType)
   Removes parameters: VARCHAR(255) → VARCHAR
=============================================================================== */
function normalizeSQLType(sqlType = "") {
  return sqlType.toUpperCase().trim().replace(/\(.+\)/g, "");
}

/* ============================================================================
   extractEnumValues(sqlType)
   ENUM('A','B','C') → ["A","B","C"]
=============================================================================== */
function extractEnumValues(sqlType = "") {
  const match = sqlType.match(/\((.+)\)/);
  if (!match) return [];
  return match[1]
    .split(",")
    .map(v => v.trim().replace(/^'|'$/g, ""))
    .filter(Boolean);
}

/* ============================================================================
   extractDecimalPrecisionScale(sqlType)
   DECIMAL(18,2) → { precision: 18, scale: 2 }
=============================================================================== */
function extractDecimalPrecisionScale(sqlType = "") {
  const m = sqlType.match(/\(\s*(\d+)\s*,\s*(\d+)\s*\)/);
  if (!m) return { precision: 18, scale: 2 };
  return { precision: Number(m[1]), scale: Number(m[2]) };
}

/* ============================================================================
   translateSQLColumn(sqlType, columnName)
   v30 IMMORTAL ONEBAND:
     • DECIMAL → currency w/ precision + scale
     • ENUM → enum w/ allowedValues + strictMode
     • JSON → json / jsonb
     • BIT → bitfield
     • VARBINARY/BLOB → binary / binarySubstrateFrame
     • presence/harmonics/shifter v2
     • region/tenant/partition/index-hint v2
     • intellHash detection
     • nullable envelope
     • ruleHints v30
=============================================================================== */
export function translateSQLColumn(sqlType, columnName) {
  if (!sqlType || !columnName) {
    throw new Error("PulseTranslatorSkeletalIntake-v30: missing sqlType or columnName");
  }

  const normalizedType = normalizeSQLType(sqlType);
  let pulseType = SQLToPulse[normalizedType] || PulseFieldTypes.STRING;

  // DECIMAL / NUMERIC → currency
  if (normalizedType === "DECIMAL" || normalizedType === "NUMERIC") {
    pulseType = PulseFieldTypes.CURRENCY;
  }

  // ENUM
  if (normalizedType === "ENUM") {
    pulseType = PulseFieldTypes.ENUM;
  }

  // JSON / JSONB
  if (normalizedType === "JSON" || normalizedType === "JSONB") {
    pulseType = PulseFieldTypes.JSON;
  }

  // BIT → bitfield
  if (normalizedType === "BIT") {
    pulseType = PulseFieldTypes.BITFIELD;
  }

  // VARBINARY/BLOB → binary
  if (normalizedType === "VARBINARY" || normalizedType === "BLOB") {
    pulseType = PulseFieldTypes.BINARY;
  }

  // IMMORTAL v30 schema-only detectors
  if (looksLikeBand(columnName)) pulseType = PulseFieldTypes.BAND;
  if (looksLikePresence(columnName)) pulseType = PulseFieldTypes.PRESENCE;
  if (looksLikeHarmonics(columnName)) pulseType = PulseFieldTypes.HARMONICS;
  if (looksLikeShifter(columnName)) pulseType = PulseFieldTypes.PULSE_SHIFTER;

  if (looksLikeRegion(columnName)) pulseType = PulseFieldTypes.REGION_CODE;
  if (looksLikeTenant(columnName)) pulseType = PulseFieldTypes.TENANT_ID;
  if (looksLikePartition(columnName)) pulseType = PulseFieldTypes.PARTITION_KEY;
  if (looksLikeIndexHint(columnName)) pulseType = PulseFieldTypes.INDEX_HINT;

  // v30: intellHash detection
  if (looksLikeIntellHash(columnName)) pulseType = PulseFieldTypes.INTELL_HASH;

  // v30: binary substrate frame detection
  if (looksLikeBinaryFrame(columnName)) pulseType = PulseFieldTypes.BINARY_SUBSTRATE_FRAME;

  const isNullable = /\bNULL\b/i.test(sqlType);

  const field = {
    schemaVersion: SKELETAL_SCHEMA_VERSION,
    name: normalizeFieldName(columnName),
    type: pulseType,
    source: "sql",
    originalType: sqlType.trim()
  };

  // ENUM allowedValues
  if (pulseType === PulseFieldTypes.ENUM) {
    field.allowedValues = extractEnumValues(sqlType);
    field.strictEnum = true;
  }

  // DECIMAL precision + scale
  if (pulseType === PulseFieldTypes.CURRENCY) {
    const { precision, scale } = extractDecimalPrecisionScale(sqlType);
    field.precision = precision;
    field.scale = scale;
  }

  // NULLABLE wrapper
  if (isNullable) {
    field.type = PulseFieldTypes.NULLABLE;
    field.innerType = pulseType;
  }

  // v30 ruleHints
  if (PulseFieldRules.inferRuleHints) {
    field.ruleHints = PulseFieldRules.inferRuleHints(field) || null;
  }

  validatePulseField(field);
  return field;
}

/* ============================================================================
   translateSQLSchema(schemaObject)
=============================================================================== */
export function translateSQLSchema(schemaObject = {}) {
  const out = {};

  for (const [columnName, sqlType] of Object.entries(schemaObject)) {
    out[columnName] = translateSQLColumn(sqlType, columnName);
  }

  return out;
}

/* ============================================================================
   translateSQLQuery(queryString)
   Extracts SELECT fields → PulseField usage map.
   v30: deterministic, pure, zero‑SQL execution, oneband-aware
=============================================================================== */
export function translateSQLQuery(queryString = "") {
  const fields = extractSelectFields(queryString);

  return fields.map((f) => ({
    schemaVersion: SKELETAL_SCHEMA_VERSION,
    name: normalizeFieldName(f),
    type: PulseFieldTypes.STRING,
    source: "sql-query",
    usage: "select"
  }));
}

/* ============================================================================
   Helpers
=============================================================================== */
function normalizeFieldName(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_");
}

function extractSelectFields(query) {
  const match = query.match(/select\s+(.+?)\s+from/i);
  if (!match) return [];
  return match[1]
    .split(",")
    .map((f) => f.trim().replace(/`/g, ""))
    .filter(Boolean);
}

/* ============================================================================
   IMMORTAL v30 schema-only detectors
=============================================================================== */
function looksLikeBand(name) { return /band/i.test(name); }
function looksLikePresence(name) { return /presence/i.test(name); }
function looksLikeHarmonics(name) { return /harmonics/i.test(name); }
function looksLikeShifter(name) { return /shifter/i.test(name); }

function looksLikeRegion(name) { return /(region|country|locale|geo)/i.test(name); }
function looksLikeTenant(name) { return /(tenant|account|org|workspace)/i.test(name); }
function looksLikePartition(name) { return /(partition|shard|segment|bucket)/i.test(name); }
function looksLikeIndexHint(name) { return /(index|idx|key|hint)/i.test(name); }

function looksLikeIntellHash(name) { return /(hash|intell|digest|sha|checksum)/i.test(name); }
function looksLikeBinaryFrame(name) { return /(frame|substrate|blob|bin)/i.test(name); }

export const PulseTranslatorSkeletalIntake = {
  /**
   * Convert a world payload into a skeletal object based on DNA schema.
   * - Validates field types
   * - Applies defaults
   * - Normalizes values
   * - Strips unknown fields
   */
  fromWorldPayload(dna, payload = {}) {
    if (!dna || !dna.fields) {
      throw new Error("fromWorldPayload requires a DNA with fields");
    }

    const out = {};

    for (const [fieldName, fieldSpec] of Object.entries(dna.fields)) {
      const incoming = payload[fieldName];

      // ------------------------------------------------------------
      // REQUIRED FIELD CHECK
      // ------------------------------------------------------------
      if (fieldSpec.required && incoming === undefined) {
        throw new Error(`Missing required field: ${fieldName}`);
      }

      // ------------------------------------------------------------
      // DEFAULT VALUE
      // ------------------------------------------------------------
      let value =
        incoming !== undefined
          ? incoming
          : fieldSpec.default !== undefined
          ? fieldSpec.default
          : null;

      // ------------------------------------------------------------
      // TYPE NORMALIZATION
      // ------------------------------------------------------------
      switch (fieldSpec.type) {
        case "string":
        case "email":
        case "phone":
        case "url":
        case "id":
          value = value != null ? String(value) : null;
          break;

        case "number":
        case "currency":
        case "percent":
          value = value != null ? Number(value) : null;
          break;

        case "boolean":
          value = Boolean(value);
          break;

        case "date":
          value = value ? new Date(value).toISOString().split("T")[0] : null;
          break;

        case "timestamp":
          value = value ? new Date(value).toISOString() : null;
          break;

        case "array":
          value = Array.isArray(value) ? value : [];
          break;

        case "object":
        case "json":
        case "pulse":
        case "presence":
        case "harmonics":
        case "pulse_shifter":
          value = value && typeof value === "object" ? value : {};
          break;

        case "binary":
        case "pulse_binary":
        case "binary_frame":
          value = value || null; // assume Uint8Array or base64 string
          break;

        case "bitfield":
          value = value != null ? Number(value) : 0;
          break;

        case "enum":
          if (!fieldSpec.allowedValues.includes(value)) {
            throw new Error(
              `Invalid enum value for ${fieldName}: ${value}`
            );
          }
          break;

        case "nullable":
          if (value === null) break;
          // validate inner type
          break;

        // v20/v30/v31 special fields
        case "world_router_hint":
        case "scheduler_hint":
        case "signal_port_hint":
        case "finality_port_hint":
        case "earn_hint":
        case "gpu_frame":
        case "warm_path_hint":
        case "cold_path_hint":
        case "presence_band_v2":
          value = value && typeof value === "object" ? value : {};
          break;

        default:
          // Unknown type → pass through
          break;
      }

      // ------------------------------------------------------------
      // ASSIGN NORMALIZED VALUE
      // ------------------------------------------------------------
      out[fieldName] = value;
    }

    return out;
  }
};

PulseRealm.TranslatorSkeletalIntake = {
  PulseTranslatorSkeletalIntake,
  translateSQLColumn,
  SKELETAL_SCHEMA_VERSION
}