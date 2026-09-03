// ============================================================================
// FILE: PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-WORLD/X-PULSE-X/PulseSpecsGenomeRouter-v30-IMMORTAL++.js
// ORGAN: PulseSpecsGenomeRouter-v30++ (Genome → Memory Router Organ, OneBand)
// LAYER: PULSE-WORLD / DATA-ROUTING / INTELLEDB / IMMORTAL-V30++ / ONE-BAND
// ============================================================================
//
// ROLE (v30++ ONE-BAND):
//   The Genome Router reads PulseSpecsDNAGenome-v30.js and decides:
//     • Which MEMORY ORGAN to use (LongTerm, ShortTerm, Muscle)
//     • Which BAND to favor (symbolic / binary / dual) as ONE-BAND contract
//     • How to route PulseFields → correct memory tier + router hints
//     • How to interpret field metadata deterministically (no IO, no DB)
//
//   This is the “brainstem” of INTELLEDB™ in v30++ ONE-BAND:
//     • Evolutionary memory
//     • Hot-path memory
//     • Semantic/vector memory
//     • WorldRouter + Scheduler hints
//     • IntellHash + BinarySubstrate awareness
//
// THIS FILE IS:
//   • A pure logic organ (no network, no storage)
//   • A deterministic router
//   • A metadata interpreter
//   • A memory-tier + band + router-hint selector
//
// THIS FILE IS NOT:
//   • A database client
//   • A translator implementation
//   • A storage engine
//   • A Firestore/SQL wrapper
//
// DEPENDENCIES (v30++):
//   • PulseSpecsDNAGenome-v30.js (source of truth for PulseFields)
//   • PulseSpecsLongTermMemory-v30.js (or v20-compatible)
//   • PulseSpecsShortTermMemory-v30.js (or v20-compatible)
//   • PulseSpecsMuscleMemory-v30.js (or v20-compatible)
//   • Pure-spec only: no runtime globals, no window, no fetch.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// AI EXPERIENCE META — IMMORTAL ORGAN BLOCK (v30++)
// ============================================================================
//
//   • Organ ID: PulseSpecsGenomeRouter-v30-IMMORTAL++
//   • Contract: PURE-LOGIC / ONE-BAND / INTELLEDB-ROUTER
//   • Inputs:  PulseSpecsDNAGenome.fields[fieldName]
//   • Outputs: RoutingDescriptor (tier, band, routerHints, schedulerHints, etc.)
//   • Guarantees:
//       – Deterministic for same genome
//       – No side effects
//       – Backwards-compatible with v20 callers
//
// ============================================================================



// ============================================================================
// IMPORTS
// ============================================================================

import { PulseSpecsDNAGenome } from "./PulseSpecsDNAGenome-v30.js";

// MEMORY ORGANS (can be v20 or v30, router is version-agnostic)
import * as LongTermMemory from "./PulseSpecsLongTermMemory-v30.js";
import * as ShortTermMemory from "./PulseSpecsShortTermMemory-v30.js";
import * as MuscleMemory from "./PulseSpecsMuscleMemory-v30.js";
import { route, Router  } from "../PULSE-OS/PulseOSCNSNervousSystem-v30.js";


// ============================================================================
// INTERNAL HELPERS — v30++ ONE-BAND
// ============================================================================

function assertKnownField(fieldName, field) {
  if (!field) {
    throw new Error(`Unknown PulseField in GenomeRouter: ${fieldName}`);
  }
}

function resolveBand(field) {
  // Explicit band wins if present
  if (field.band === "symbolic" || field.band === "binary" || field.band === "dual") {
    return field.band;
  }

  // Binary-leaning hints
  if (
    field.type === "binary" ||
    field.type === "pulse_binary" ||
    field.type === "binary_frame" ||
    field.type === "pulse_shifter_binary"
  ) {
    return "binary";
  }

  // Semantic / vector / presence / harmonics → dual by default
  if (
    field.semantic === true ||
    field.vector === true ||
    field.embedding === true ||
    field.presence === true ||
    field.harmonics === true
  ) {
    return "dual";
  }

  // Default: symbolic (safe for most schema fields)
  return "symbolic";
}

function resolveMemoryTier(field) {
  // 1. LONG-TERM MEMORY (persistent, evolutionary)
  if (
    field.longTerm === true ||
    field.persistent === true ||
    field.evolutionary === true ||
    field.history === true
  ) {
    return "long_term";
  }

  // 2. MUSCLE MEMORY (vector embeddings, semantic recall)
  if (
    field.vector === true ||
    field.embedding === true ||
    field.semantic === true ||
    field.searchable === true
  ) {
    return "muscle_memory";
  }

  // 3. SHORT-TERM MEMORY (hot cache, ephemeral)
  if (
    field.shortTerm === true ||
    field.cache === true ||
    field.ephemeral === true ||
    field.hot === true
  ) {
    return "short_term";
  }

  // 4. DEFAULT → SHORT-TERM MEMORY
  return "short_term";
}

function resolveMemoryOrgan(tier) {
  if (tier === "long_term") return LongTermMemory;
  if (tier === "muscle_memory") return MuscleMemory;
  return ShortTermMemory;
}

function resolveRouterHints(field) {
  // v30+ Genome: world_router_hint + scheduler_hint + region/tenant/partition
  const routerHint = field.worldRouterHint || field.world_router_hint || null;
  const schedulerHint = field.schedulerHint || field.scheduler_hint || null;

  const region = field.region || field.region_code || null;
  const tenant = field.tenant || field.tenant_id || null;
  const partition = field.partition || field.partition_key || null;

  return {
    worldRouterHint: routerHint,
    schedulerHint,
    region,
    tenant,
    partition
  };
}

function resolveIntellHashAndBinaryFrame(field) {
  const hasIntellHash =
    field.type === "intell_hash" ||
    field.intellHash === true ||
    field.intell_hash === true;

  const hasBinaryFrame =
    field.type === "binary_frame" ||
    field.binaryFrame === true ||
    field.binary_frame === true;

  return {
    hasIntellHash,
    hasBinaryFrame
  };
}

function resolvePresenceAndHarmonics(field) {
  const presence = field.presence || null;
  const harmonics = field.harmonics || null;

  return {
    presence,
    harmonics
  };
}


// ============================================================================
// CORE ROUTER — v30++ ONE-BAND
// ============================================================================
//
// RoutingDescriptor:
//   {
//     fieldName,
//     field,
//     tier: "long_term" | "short_term" | "muscle_memory",
//     organ: LongTermMemory | ShortTermMemory | MuscleMemory,
//     band: "symbolic" | "binary" | "dual",
//     routerHints: { worldRouterHint, schedulerHint, region, tenant, partition },
//     intellHash: { hasIntellHash, hasBinaryFrame },
//     presence: { presence, harmonics }
//   }
//

export function routePulseField(fieldName) {
  const field = PulseSpecsDNAGenome.fields[fieldName];
  assertKnownField(fieldName, field);

  const tier = resolveMemoryTier(field);
  const organ = resolveMemoryOrgan(tier);
  const band = resolveBand(field);
  const routerHints = resolveRouterHints(field);
  const intellHash = resolveIntellHashAndBinaryFrame(field);
  const presence = resolvePresenceAndHarmonics(field);

  return {
    fieldName,
    field,
    tier,
    organ,
    band,
    routerHints,
    intellHash,
    presence
  };
}

// v30++: explicit descriptor API (for callers that want full routing info)
export function getRoutingDescriptor(fieldName) {
  return routePulseField(fieldName);
}


// ============================================================================
// HIGH-LEVEL ROUTER API — IMMORTAL v30++ ONE-BAND
// ============================================================================
//
// These functions hide routing + memory organ selection, but now pass the full
// RoutingDescriptor into the memory organs so they can be band-aware, router-
// hint-aware, and intell-hash-aware without re-reading the genome.
//
// Memory organ contracts (recommended v30++ signature):
//   save({ fieldName, value, field, context, routing })
//   load({ fieldName, field, context, routing })
//   delete({ fieldName, field, context, routing })
//

export async function savePulseField(fieldName, value, context = {}) {
  const routing = routePulseField(fieldName);
  const organ = routing.organ;

  if (typeof organ.save === "function") {
    return organ.save({
      fieldName,
      value,
      field: routing.field,
      context,
      routing
    });
  }

  // Backwards-compatible: organ without save() just returns value
  return value;
}

export async function loadPulseField(fieldName, context = {}) {
  const routing = routePulseField(fieldName);
  const organ = routing.organ;

  if (typeof organ.load === "function") {
    return organ.load({
      fieldName,
      field: routing.field,
      context,
      routing
    });
  }

  // Backwards-compatible: organ without load() returns null
  return null;
}

export async function deletePulseField(fieldName, context = {}) {
  const routing = routePulseField(fieldName);
  const organ = routing.organ;

  if (typeof organ.delete === "function") {
    return organ.delete({
      fieldName,
      field: routing.field,
      context,
      routing
    });
  }

  // Backwards-compatible: organ without delete() is a no-op
  return true;
}


// ============================================================================
// BULK HELPERS — v30++
// ============================================================================
//
// Convenience helpers to route multiple fields at once using the same genome.
//

export function routePulseFields(fieldNames = []) {
  return fieldNames.map((name) => routePulseField(name));
}

export async function savePulseFields(valuesByFieldName = {}, context = {}) {
  const entries = Object.entries(valuesByFieldName);
  const results = {};

  for (const [fieldName, value] of entries) {
    results[fieldName] = await savePulseField(fieldName, value, context);
  }

  return results;
}

export async function loadPulseFields(fieldNames = [], context = {}) {
  const results = {};

  for (const fieldName of fieldNames) {
    results[fieldName] = await loadPulseField(fieldName, context);
  }

  return results;
}

export async function deletePulseFields(fieldNames = [], context = {}) {
  const results = {};

  for (const fieldName of fieldNames) {
    results[fieldName] = await deletePulseField(fieldName, context);
  }

  return results;
}


// ============================================================================
// FOOTER — INTELLEDB™ v30++ ONE-BAND NOTES FOR ALDWYN
// ============================================================================
//
// ⭐ ONE-BAND CONTRACT:
//      • Every field now carries an explicit or inferred band:
//          – symbolic / binary / dual
//      • Memory organs receive full routing descriptor (tier + band + hints).
//
// ⭐ GENOME-AWARE ROUTING:
//      • Uses PulseSpecsDNAGenome-v30 fields as the only source of truth.
//      • Respects:
//          – longTerm / persistent / evolutionary / history
//          – shortTerm / cache / ephemeral / hot
//          – vector / embedding / semantic / searchable
//          – worldRouterHint / schedulerHint / region / tenant / partition
//          – intell_hash / binary_frame / presence / harmonics
//
// ⭐ BACKWARDS COMPATIBLE:
//      • Existing v20 callers using save/load/delete still work.
//      • New v30++ callers can consume getRoutingDescriptor() directly.
//
// ⭐ THIS IS THE GENOME ROUTER FOR INTELLEDB™ v30++ ONE-BAND.
// ============================================================================



PulseRealm.SpecsGenomeRouter = {
  deletePulseField,
  loadPulseField,
  savePulseField,
  deletePulseFields,
  loadPulseFields,
  savePulseFields,
  routePulseField
}