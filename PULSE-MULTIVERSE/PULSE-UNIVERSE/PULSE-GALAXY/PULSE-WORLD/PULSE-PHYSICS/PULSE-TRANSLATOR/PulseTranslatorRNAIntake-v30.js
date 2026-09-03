/*
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
===============================================================================
EXPORT_META = {
  organ: "PulseTranslator.RNAIntake",
  layer: "pulse_translator",
  stability: "IMMORTAL",
  deterministic: true,
  pure: true,

  consumes: [
    "FirestoreRuntimeValue",
    "FirestoreDocumentSnapshot"
  ],

  produces: [
    "PulseField",
    "PulseFieldSchemaMap"
  ],

  sideEffects: "none",
  network: "none",
  filesystem: "none",
  firestore: "no_execution"
}
===============================================================================
FILE: /pulse-translator/PulseTranslatorRNAIntake-v30.js
LAYER: THE RNA INTAKE TRANSLATOR (Firestore → Pulse)
SCHEMA: RNA_INTAKE_SCHEMA_VERSION = "v5-oneband"
===============================================================================
*/
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

const RNA_INTAKE_SCHEMA_VERSION = "v5-oneband";

import {
  PulseFieldTypes,
  PulseFieldRules,
  validatePulseField
} from "../PULSE-SPECS/PulseSpecsDNAGenome-v30.js";

// ---------------------------------------------------------------------------
// ROLE BLOCK — IMMORTAL RNA INTAKE ROLE (pure, zero‑IO, ONEBAND v30)
// ---------------------------------------------------------------------------
export const RNAIntakeRole = {
  type: "Organ",
  subsystem: "PulseTranslator",
  layer: "RNAIntake",
  version: "30.0-IMMORTAL-ONEBAND",
  identity: "PulseTranslator.RNAIntake",

  evo: {
    deterministic: true,
    pureCompute: true,
    driftProof: true,
    schemaVersioned: true,
    genomeDriven: true,
    firestoreIntake: true,
    arrayShapeAware: true,
    nestedObjectAware: true,
    advantageAware: true,
    binarySubstrateAware: true,
    worldRouterAware: true,
    schedulerAware: true,
    immortalEpochAware: true
  },

  schemaVersion: RNA_INTAKE_SCHEMA_VERSION
};

/* ============================================================================
   inferPulseTypeFromFirestore(value)
   Genome‑driven type inference for Firestore runtime values.
   v30 IMMORTAL-ONEBAND:
     • presence/harmonics/shifter
     • band / binary / pulse
     • region/tenant/partition/index hints
     • GeoPoint / DocumentReference
     • IntellHash / BinarySubstrate frame / WorldRouter / Scheduler / ImmortalEpoch
     • array shape + nested object awareness (schema only, no recursion explosion)
=============================================================================== */
export function inferPulseTypeFromFirestore(value) {
  if (value === null || value === undefined) {
    return PulseFieldTypes.NULLABLE;
  }

  // Firestore Timestamp
  if (value && typeof value.toDate === "function") {
    return PulseFieldTypes.TIMESTAMP;
  }

  // Firestore Bytes
  if (value && typeof value.toUint8Array === "function") {
    // ONEBAND: allow binary_frame detection via duck-typed metadata
    if (looksLikeBinaryFrame(value)) {
      return PulseFieldTypes.BINARY_SUBSTRATE_FRAME || PulseFieldTypes.BINARY;
    }
    return PulseFieldTypes.BINARY;
  }

  // Firestore GeoPoint (duck-typed)
  if (looksLikeGeoPoint(value)) {
    return PulseFieldTypes.GEOPOINT ?? PulseFieldTypes.OBJECT;
  }

  // Firestore DocumentReference (duck-typed)
  if (looksLikeDocumentRef(value)) {
    return PulseFieldTypes.DOCUMENT_REF ?? PulseFieldTypes.STRING;
  }

  const t = typeof value;

  if (t === "string") {
    // IMMORTAL band/presence/harmonics + router/epoch/intellHash detection (schema-only)
    if (looksLikeBand(value)) return PulseFieldTypes.BAND;
    if (looksLikeImmortalEpoch(value)) return PulseFieldTypes.IMMORTAL_EPOCH || PulseFieldTypes.STRING;
    if (looksLikeIntellHash(value)) return PulseFieldTypes.INTELL_HASH || PulseFieldTypes.STRING;
    if (looksLikeRegion(value)) return PulseFieldTypes.REGION_CODE;
    if (looksLikeTenant(value)) return PulseFieldTypes.TENANT_ID;
    if (looksLikePartition(value)) return PulseFieldTypes.PARTITION_KEY;
    return PulseFieldTypes.STRING;
  }

  if (t === "number") return PulseFieldTypes.NUMBER;
  if (t === "boolean") return PulseFieldTypes.BOOLEAN;

  if (Array.isArray(value)) {
    // v30: array shape awareness (schema-only, shallow)
    return PulseFieldTypes.ARRAY;
  }

  if (t === "object") {
    // IMMORTAL: presence/harmonics/shifter/index/router/scheduler detection
    if (looksLikePresence(value)) return PulseFieldTypes.PRESENCE;
    if (looksLikeHarmonics(value)) return PulseFieldTypes.HARMONICS;
    if (looksLikeShifter(value)) return PulseFieldTypes.PULSE_SHIFTER;
    if (looksLikeIndexHint(value)) return PulseFieldTypes.INDEX_HINT;
    if (looksLikeWorldRouterHint(value)) return PulseFieldTypes.WORLD_ROUTER_HINT || PulseFieldTypes.OBJECT;
    if (looksLikeSchedulerHint(value)) return PulseFieldTypes.SCHEDULER_HINT || PulseFieldTypes.OBJECT;

    // generic nested object
    return PulseFieldTypes.OBJECT;
  }

  return PulseFieldTypes.JSON;
}

/* ============================================================================
   translateFirestoreField(fieldName, value)
   Converts a Firestore field → canonical PulseField object.
   v30: adds schemaVersion + ruleHints (if available) + arrayShapeHint +
        advantageHints + bandHint when detectable.
=============================================================================== */
export function translateFirestoreField(fieldName, value) {
  const pulseType = inferPulseTypeFromFirestore(value);

  const nullable = value === null || value === undefined;
  const originalValueType = typeof value;

  const field = {
    schemaVersion: RNA_INTAKE_SCHEMA_VERSION,
    name: normalizeFieldName(fieldName),
    type: pulseType,
    source: "firestore",
    originalValueType,
    nullable
  };

  // Nullable wrapper
  if (nullable && field.type !== PulseFieldTypes.NULLABLE) {
    field.type = PulseFieldTypes.NULLABLE;
    field.innerType = inferInnerTypeForNullable(value);
  }

  // v30: array shape hint (schema-only, shallow)
  if (Array.isArray(value)) {
    field.arrayShapeHint = inferArrayShapeHint(value);
  }

  // v30: band hint when value encodes band semantics
  if (typeof value === "string" && looksLikeBand(value)) {
    field.bandHint = value;
  }

  // v30: immortal epoch hint
  if (typeof value === "string" && looksLikeImmortalEpoch(value)) {
    field.epochHint = value;
  }

  // v30: intellHash advantage hint (length + hex-ness only)
  if (typeof value === "string" && looksLikeIntellHash(value)) {
    field.advantageHints = {
      kind: "intell_hash",
      length: value.length
    };
  }

  // v30: rule hints from genome rules (if present)
  if (PulseFieldRules && typeof PulseFieldRules.inferRuleHints === "function") {
    field.ruleHints = PulseFieldRules.inferRuleHints(field) || null;
  }

  validatePulseField(field);
  return field;
}

/* ============================================================================
   translateFirestoreDocument(docData)
   Converts a plain Firestore JS object → PulseField schema map.
   v30: attaches schemaVersion + role identity + translatorVersion on envelope.
=============================================================================== */
export function translateFirestoreDocument(docData = {}) {
  const out = {};

  for (const [key, value] of Object.entries(docData)) {
    out[key] = translateFirestoreField(key, value);
  }

  return {
    schemaVersion: RNA_INTAKE_SCHEMA_VERSION,
    role: RNAIntakeRole.identity,
    translatorVersion: RNAIntakeRole.version,
    fields: out
  };
}

/* ============================================================================
   translateFirestoreSnapshot(snapshot)
   Accepts a Firestore DocumentSnapshot (read‑only).
=============================================================================== */
export function translateFirestoreSnapshot(snapshot) {
  if (!snapshot || typeof snapshot.data !== "function") {
    throw new Error("PulseTranslatorRNAIntake-v30: invalid snapshot");
  }

  const data = snapshot.data() || {};
  return translateFirestoreDocument(data);
}

/* ============================================================================
   IMMORTAL HELPERS — PURE, ZERO‑IO, ZERO‑DRIFT, ONEBAND
=============================================================================== */

function normalizeFieldName(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_");
}

function inferInnerTypeForNullable(value) {
  if (value === null || value === undefined) {
    return PulseFieldTypes.JSON;
  }
  // reuse inference but avoid NULLABLE again
  const t = inferPulseTypeFromFirestore(value);
  return t === PulseFieldTypes.NULLABLE ? PulseFieldTypes.JSON : t;
}

// v30: shallow array shape hint (no recursion explosion)
function inferArrayShapeHint(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return { kind: "empty", innerType: null };
  }

  const sample = arr[0];
  const innerType = inferPulseTypeFromFirestore(sample);
  return {
    kind: "homogeneous",
    innerType
  };
}

// IMMORTAL band/presence/harmonics/shifter detectors (schema-only)
function looksLikeBand(v) {
  return (
    typeof v === "string" &&
    (v === "symbolic" || v === "binary" || v === "dual")
  );
}

function looksLikeRegion(v) {
  return typeof v === "string" && /^[A-Z0-9_-]{1,16}$/.test(v);
}

function looksLikeTenant(v) {
  return typeof v === "string" && v.length <= 128 && v.includes("@tenant");
}

function looksLikePartition(v) {
  return typeof v === "string" && v.startsWith("partition:");
}

function looksLikePresence(obj) {
  return obj && typeof obj === "object" && obj.__presence === true;
}

function looksLikeHarmonics(obj) {
  return obj && typeof obj === "object" && obj.__harmonics === true;
}

function looksLikeShifter(obj) {
  return obj && typeof obj === "object" && obj.__shifter === true;
}

function looksLikeIndexHint(obj) {
  return obj && typeof obj === "object" && obj.__indexHint === true;
}

// World router hint detector
function looksLikeWorldRouterHint(obj) {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.route === "string" &&
    typeof obj.region === "string"
  );
}

// Scheduler hint detector
function looksLikeSchedulerHint(obj) {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.cron === "string" &&
    typeof obj.window === "string"
  );
}

// IntellHash detector (SHA-256 hex, 64 chars)
function looksLikeIntellHash(v) {
  return typeof v === "string" && /^[a-f0-9]{64}$/i.test(v);
}

// Immortal epoch detector (vN-IMMORTAL)
function looksLikeImmortalEpoch(v) {
  return typeof v === "string" && /^v[0-9]+-IMMORTAL$/i.test(v);
}

// BinarySubstrate frame duck-typing (bytes with optional tag/band metadata)
function looksLikeBinaryFrame(v) {
  // Firestore Bytes are opaque; allow optional attached metadata
  if (!v || typeof v !== "object") return false;
  if (typeof v.__binaryFrame === "boolean" && v.__binaryFrame === true) return true;
  return false;
}

// Firestore GeoPoint duck-typing
function looksLikeGeoPoint(v) {
  return (
    v &&
    typeof v === "object" &&
    typeof v.latitude === "number" &&
    typeof v.longitude === "number"
  );
}

// Firestore DocumentReference duck-typing
function looksLikeDocumentRef(v) {
  return (
    v &&
    typeof v === "object" &&
    typeof v.path === "string" &&
    typeof v.id === "string"
  );
}
// ============================================================================
// PulseTranslatorRNAIntake EXPORT (ONE CONSTANT + CREATE)
// ============================================================================
export const PulseTranslatorRNAIntake = {
  create: () => ({
    inferPulseTypeFromFirestore,
    translateFirestoreField,
    translateFirestoreDocument,
    translateFirestoreSnapshot,
    role: RNAIntakeRole
  }),
  version: RNAIntakeRole.version,
  layer: RNAIntakeRole.layer,
  identity: RNAIntakeRole.identity
};

export default PulseTranslatorRNAIntake;
