/* ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
===============================================================================
EXPORT_META = {
  organ: "PulseTranslator.RNAOutput",
  layer: "pulse_translator",
  stability: "IMMORTAL",
  deterministic: true,
  pure: true,

  consumes: [
    "PulseField",
    "PulseFieldSchemaMap",
    "PulseDataObject"
  ],

  produces: [
    "FirestoreSafeValue",
    "FirestoreDocumentPayload"
  ],

  sideEffects: "none",
  network: "none",
  filesystem: "none",
  firestore: "no_execution"
}
===============================================================================
FILE: /pulse-translator/PulseTranslatorRNAOutput-v30.js
LAYER: THE RNA OUTPUT TRANSLATOR (Pulse → Firestore) — v30 IMMORTAL ONE-BAND
SCHEMA: RNA_OUTPUT_SCHEMA_VERSION = "v5"
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
  PulseToFirestore,
  PulseFieldTypes,
  validatePulseField
} from "../PULSE-SPECS/PulseSpecsDNAGenome-v30.js";

const RNA_OUTPUT_SCHEMA_VERSION = "v5";

/* ============================================================================
   ROLE BLOCK — v30 IMMORTAL ONE-BAND
=============================================================================== */
export const RNAOutputRole = {
  type: "Organ",
  subsystem: "PulseTranslator",
  layer: "RNAOutput",
  version: "30.0-IMMORTAL-OneBand+++",
  identity: "PulseTranslator.RNAOutput",

  evo: {
    deterministic: true,
    pureCompute: true,
    driftProof: true,
    firestoreOutput: true,
    genomeDriven: true,

    nullableEnvelopeAware: true,
    enumContractAware: true,
    currencyScaleAware: true,
    percentModeAware: true,
    bandContractAware: true,
    indexHintAware: true,
    jsonFallbackAware: true,

    // v30+ advantages
    intellHashAware: true,
    binarySubstrateAware: true,
    worldRouterAware: true,
    schedulerAware: true,
    immortalEpochAware: true,
    geoPointAware: true,
    documentRefAware: true,
    oneBandRoutingAware: true
  },

  schemaVersion: RNA_OUTPUT_SCHEMA_VERSION
};

/* ============================================================================
   translatePulseFieldToFirestore(field, value)
   PulseField + value → Firestore‑safe value (v30 IMMORTAL ONE-BAND).
=============================================================================== */
export function translatePulseFieldToFirestore(field, value) {
  validatePulseField(field);

  // --------------------------------------------------------------------------
  // NULLABLE WRAPPER (envelope‑aware, zero‑drift)
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.NULLABLE) {
    if (value === null || value === undefined) {
      return null;
    }

    const innerType = field.innerType || PulseFieldTypes.JSON;
    return translatePulseFieldToFirestore(
      { ...field, type: innerType },
      value
    );
  }

  // --------------------------------------------------------------------------
  // ENUM → string (respect enum contract if present)
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.ENUM) {
    const raw = value ?? "";
    const str = String(raw);

    const enumValues =
      field.enumValues ||
      field.allowedValues ||
      field.values ||
      null;

    if (Array.isArray(enumValues) && enumValues.length > 0) {
      if (enumValues.includes(str)) {
        return str;
      }
      // deterministic fallback
      return String(enumValues[0]);
    }

    return str;
  }

  // --------------------------------------------------------------------------
  // CURRENCY → number (fixed scale, finite, clamped)
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.CURRENCY) {
    const num = Number(value);
    if (!isFinite(num)) return 0;

    const scale =
      typeof field.scale === "number"
        ? field.scale
        : 2;

    const scaled = Number(num.toFixed(scale));

    const maxAbs =
      typeof field.maxAbs === "number"
        ? field.maxAbs
        : 1e12;

    const clamped =
      scaled > maxAbs ? maxAbs :
      scaled < -maxAbs ? -maxAbs :
      scaled;

    return clamped;
  }

  // --------------------------------------------------------------------------
  // PERCENT → number (0–100 or normalized 0–1, clamped)
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.PERCENT) {
    const num = Number(value);
    if (!isFinite(num)) return 0;

    if (field.normalized) {
      const n = Math.max(0, Math.min(1, num));
      return n;
    }

    const p = Math.max(0, Math.min(100, num));
    return p;
  }

  // --------------------------------------------------------------------------
  // INTELL_HASH → hex string (length 64, deterministic)
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.INTELL_HASH) {
    if (value == null) return "";
    let hex = String(value).trim().toLowerCase();
    hex = hex.replace(/[^0-9a-f]/g, "");
    if (hex.length !== 64) {
      // deterministic padding/truncation
      if (hex.length > 64) hex = hex.slice(0, 64);
      else hex = hex.padEnd(64, "0");
    }
    return hex;
  }

  // --------------------------------------------------------------------------
  // BINARY / PULSE_BINARY / BINARY_SUBSTRATE_FRAME → Firestore bytes
  // --------------------------------------------------------------------------
  if (
    field.type === PulseFieldTypes.BINARY ||
    field.type === PulseFieldTypes.PULSE_BINARY ||
    field.type === PulseFieldTypes.BINARY_SUBSTRATE_FRAME
  ) {
    if (value == null) return null;

    if (value instanceof Uint8Array) return value;
    if (typeof value === "string") return value; // base64 or tagged frame string

    return null;
  }

  // --------------------------------------------------------------------------
  // PULSE / PRESENCE / HARMONICS / SHIFTER → map (zero‑mutation)
  // --------------------------------------------------------------------------
  if (
    field.type === PulseFieldTypes.PULSE ||
    field.type === PulseFieldTypes.PRESENCE ||
    field.type === PulseFieldTypes.HARMONICS ||
    field.type === PulseFieldTypes.PULSE_SHIFTER
  ) {
    if (value && typeof value === "object") {
      return shallowCloneObject(value);
    }
    return {};
  }

  // --------------------------------------------------------------------------
  // BAND → string (one-band contract aware)
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.BAND) {
    const raw = value ?? "";
    const str = String(raw);

    const allowed = ["symbolic", "binary", "dual"];

    if (field.strictBand) {
      if (allowed.includes(str)) {
        return str;
      }
      // default one-band mode
      return field.defaultBand || "dual";
    }

    // soft contract: if invalid, fall back to dual
    if (!allowed.includes(str)) {
      return field.defaultBand || "dual";
    }

    return str;
  }

  // --------------------------------------------------------------------------
  // REGION / TENANT / PARTITION / INDEX_HINT → string/map
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.REGION_CODE) {
    return normalizeRegionCode(value);
  }

  if (field.type === PulseFieldTypes.TENANT_ID) {
    return normalizeTenantId(value);
  }

  if (field.type === PulseFieldTypes.PARTITION_KEY) {
    return normalizePartitionKey(value);
  }

  if (field.type === PulseFieldTypes.INDEX_HINT) {
    if (value && typeof value === "object") {
      return shallowCloneObject(value);
    }
    return {};
  }

  // --------------------------------------------------------------------------
  // WORLD_ROUTER_HINT / SCHEDULER_HINT → map (routing metadata)
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.WORLD_ROUTER_HINT) {
    if (value && typeof value === "object") {
      return shallowCloneObject(value);
    }
    return {};
  }

  if (field.type === PulseFieldTypes.SCHEDULER_HINT) {
    if (value && typeof value === "object") {
      return shallowCloneObject(value);
    }
    return {};
  }

  // --------------------------------------------------------------------------
  // IMMORTAL_EPOCH → string ("vN-IMMORTAL" normalized)
  // --------------------------------------------------------------------------
  if (field.type === PulseFieldTypes.IMMORTAL_EPOCH) {
    const raw = value == null ? "" : String(value).trim();
    const match = raw.match(/^v(\d+)-IMMORTAL$/i);
    if (match) {
      return `v${match[1]}-IMMORTAL`;
    }
    // deterministic fallback: v30-IMMORTAL
    return "v30-IMMORTAL";
  }

  // --------------------------------------------------------------------------
  // GEOPOINT / DOCUMENT_REF (if present in genome) → pass-through
  // --------------------------------------------------------------------------
  if (PulseFieldTypes.GEOPOINT && field.type === PulseFieldTypes.GEOPOINT) {
    // assume Firestore GeoPoint-compatible object
    if (value && typeof value === "object") {
      return value;
    }
    return null;
  }

  if (PulseFieldTypes.DOCUMENT_REF && field.type === PulseFieldTypes.DOCUMENT_REF) {
    // assume Firestore DocumentReference-compatible object
    if (value && typeof value === "object") {
      return value;
    }
    return null;
  }

  // --------------------------------------------------------------------------
  // BASE TYPE MAPPING (Genome → Firestore)
  // --------------------------------------------------------------------------
  const fsType = PulseToFirestore[field.type] || "string";

  switch (fsType) {
    case "string": {
      if (value == null) return "";
      return String(value);
    }

    case "number": {
      const num = Number(value);
      return isFinite(num) ? num : 0;
    }

    case "boolean": {
      return Boolean(value);
    }

    case "timestamp": {
      if (value instanceof Date) return value;
      if (typeof value === "number" && isFinite(value)) return new Date(value);
      if (typeof value === "string") {
        const d = new Date(value);
        return isNaN(d.getTime()) ? new Date(0) : d;
      }
      return new Date(0);
    }

    case "array": {
      if (!Array.isArray(value)) return [];
      return value.slice();
    }

    case "map": {
      if (value && typeof value === "object") {
        return shallowCloneObject(value);
      }
      return {};
    }

    case "bytes": {
      return value ?? null;
    }

    default:
      return value;
  }
}

/* ============================================================================
   translatePulseSchemaToFirestore(schemaObject, dataObject)
   PulseField schema + data → Firestore document (v30 deterministic).
=============================================================================== */
export function translatePulseSchemaToFirestore(
  schemaObject = {},
  dataObject = {}
) {
  const out = {};

  for (const [key, field] of Object.entries(schemaObject)) {
    const value = dataObject[key];
    out[key] = translatePulseFieldToFirestore(field, value);
  }

  return out;
}

/* ============================================================================
   generateFirestoreWritePayload(schemaObject, dataObject)
   Firestore‑ready payload for setDoc/updateDoc.
=============================================================================== */
export function generateFirestoreWritePayload(
  schemaObject = {},
  dataObject = {}
) {
  return translatePulseSchemaToFirestore(schemaObject, dataObject);
}

/* ============================================================================
   IMMORTAL HELPERS — PURE, ZERO‑IO, ZERO‑DRIFT
=============================================================================== */

function shallowCloneObject(obj) {
  if (!obj || typeof obj !== "object") return {};
  const out = {};
  for (const k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      out[k] = obj[k];
    }
  }
  return out;
}

function normalizeRegionCode(value) {
  const raw = value == null ? "" : String(value);
  const up = raw.toUpperCase().replace(/[^A-Z0-9_-]/g, "");
  return up.slice(0, 16);
}

function normalizeTenantId(value) {
  const raw = value == null ? "" : String(value);
  const trimmed = raw.trim();
  if (trimmed.length > 128) {
    return trimmed.slice(0, 128);
  }
  return trimmed;
}

function normalizePartitionKey(value) {
  const raw = value == null ? "" : String(value);
  const norm = raw.startsWith("partition:")
    ? raw
    : `partition:${raw}`;
  return norm.slice(0, 256);
}
// ============================================================================
// PulseTranslatorRNAOutput EXPORT (ONE CONSTANT + CREATE)
// ============================================================================
export const PulseTranslatorRNAOutput = {
  create: () => ({
    translatePulseFieldToFirestore,
    translatePulseSchemaToFirestore,
    generateFirestoreWritePayload,
    role: RNAOutputRole
  }),
  version: RNAOutputRole.version,
  layer: RNAOutputRole.layer,
  identity: RNAOutputRole.identity
};

export default PulseTranslatorRNAOutput;
