/**
 * ============================================================================
 * ORGAN: PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-WORLD/PULSE-SPECS/PulseSpecsLongTermMemory
 * VERSION: v30-IMMORTAL++
 * LAYER: MEMORY (Persistent / Long-Term / OneBand)
 * ROLE: Persist and retrieve GenomeSpecs and related long-lived state.
 * BAND: ONEBAND (binary-first, symbolic-compatible)
 * ============================================================================
 *
 * This organ does NOT decide *what* the genome is.
 * That’s the job of PulseSpecsGenomeTranslator-v30.
 *
 * This organ:
 *   - stores GenomeSpecs (v30-IMMORTAL++)
 *   - retrieves GenomeSpecs
 *   - updates GenomeSpecs
 *   - enforces versioning and integrity
 *   - routes by region/tenant/partition when hints are present
 *   - is signal-aware (organismState / dualBandContext optional)
 *
 * It is a TRANSLATOR between:
 *   - internal GenomeSpec objects
 *   - your chosen storage backend (DB, KV, file, etc.)
 *
 * BACKEND CONTRACT (ONEBAND)
 * --------------------------
 * backend MUST implement (all pure, deterministic):
 *   - put({ key, value, band?, region?, tenant?, partition?, signal? })
 *   - get({ key, band?, region?, tenant?, partition?, signal? }) → value | null
 *   - delete?({ key, band?, region?, tenant?, partition?, signal? })
 *   - listByPrefix?({ prefix, band?, region?, tenant?, partition?, signal? }) → Array<{ key, value }>
 *
 * No network details here — this organ is pure logic + routing hints only.
 */
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



// ============================================================================
// CONSTANTS — GENOME VERSION / BAND / EPOCH
// ============================================================================

export const GENOME_SPEC_VERSION = "v30-genome-immortal++";
export const GENOME_BAND = "oneband";
export const GENOME_EPOCH = "v30-IMMORTAL++";

// ============================================================================
// PUBLIC CONTRACT
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

/**
 * Save a GenomeSpec to long-term storage (ONEBAND, v30).
 *
 * @param {Object} params
 * @param {Object} params.genomeSpec - GenomeSpec v30-IMMORTAL++.
 * @param {Object} params.backend    - Storage backend adapter (injected).
 * @param {Object} [params.hints]    - Optional routing hints:
 *   { region?, tenant?, partition?, band?, signal?, context? }
 * @returns {Promise<void>}
 */
export async function saveGenome({ genomeSpec, backend, hints = {} }) {
  validateBackend(backend);
  validateGenomeSpecShape(genomeSpec);

  const {
    region = genomeSpec.region || null,
    tenant = genomeSpec.tenant || null,
    partition = genomeSpec.partition || null,
    band = GENOME_BAND,
    signal = null,
    context = null
  } = hints;

  const key = buildGenomeKey({
    subjectId: genomeSpec.subjectId,
    region,
    tenant,
    partition
  });

  const payload = attachMeta(genomeSpec, { region, tenant, partition });

  await backend.put({
    key,
    value: payload,
    band,
    region,
    tenant,
    partition,
    signal,
    context
  });
}

/**
 * Load a GenomeSpec from long-term storage.
 *
 * @param {Object} params
 * @param {string} params.subjectId
 * @param {Object} params.backend
 * @param {Object} [params.hints] - Optional routing hints:
 *   { region?, tenant?, partition?, band?, signal?, context? }
 * @returns {Promise<Object|null>} GenomeSpec or null if not found.
 */
export async function loadGenome({ subjectId, backend, hints = {} }) {
  validateBackend(backend);

  const {
    region = null,
    tenant = null,
    partition = null,
    band = GENOME_BAND,
    signal = null,
    context = null
  } = hints;

  const key = buildGenomeKey({ subjectId, region, tenant, partition });

  const value = await backend.get({
    key,
    band,
    region,
    tenant,
    partition,
    signal,
    context
  });

  if (!value) return null;

  return normalizeLoadedGenome(value);
}

/**
 * Merge and persist an updated GenomeSpec (ONEBAND, v30).
 *
 * @param {Object} params
 * @param {Object} params.newGenomeSpec
 * @param {Object} params.backend
 * @param {Object} [params.hints] - Optional routing hints.
 * @returns {Promise<Object>} merged GenomeSpec
 */
export async function upsertGenome({ newGenomeSpec, backend, hints = {} }) {
  validateBackend(backend);
  validateGenomeSpecShape(newGenomeSpec);

  const existing = await loadGenome({
    subjectId: newGenomeSpec.subjectId,
    backend,
    hints
  });

  const merged = mergeGenomes(existing, newGenomeSpec);
  await saveGenome({ genomeSpec: merged, backend, hints });
  return merged;
}

/**
 * Soft-delete a GenomeSpec (marks as retired, does not erase history).
 *
 * @param {Object} params
 * @param {string} params.subjectId
 * @param {Object} params.backend
 * @param {Object} [params.hints]
 * @returns {Promise<Object|null>} retired GenomeSpec or null if not found.
 */
export async function retireGenome({ subjectId, backend, hints = {} }) {
  const existing = await loadGenome({ subjectId, backend, hints });
  if (!existing) return null;

  const retired = {
    ...existing,
    retired: true,
    retiredAt: new Date().toISOString(),
    retiredEpoch: GENOME_EPOCH
  };

  await saveGenome({ genomeSpec: retired, backend, hints });
  return retired;
}

/**
 * Hard-delete a GenomeSpec (if backend supports delete).
 *
 * @param {Object} params
 * @param {string} params.subjectId
 * @param {Object} params.backend
 * @param {Object} [params.hints]
 * @returns {Promise<boolean>} true if delete attempted.
 */
export async function deleteGenome({ subjectId, backend, hints = {} }) {
  validateBackend(backend);

  if (typeof backend.delete !== "function") {
    // Backend does not support hard delete; treat as no-op.
    return false;
  }

  const {
    region = null,
    tenant = null,
    partition = null,
    band = GENOME_BAND,
    signal = null,
    context = null
  } = hints;

  const key = buildGenomeKey({ subjectId, region, tenant, partition });

  await backend.delete({
    key,
    band,
    region,
    tenant,
    partition,
    signal,
    context
  });

  return true;
}

/**
 * List all GenomeSpecs for a tenant/partition (if backend supports prefix).
 *
 * @param {Object} params
 * @param {Object} params.backend
 * @param {Object} [params.filter] - { tenant?, region?, partition? }
 * @param {Object} [params.hints]  - { band?, signal?, context? }
 * @returns {Promise<Array<Object>>}
 */
export async function listGenomes({ backend, filter = {}, hints = {} }) {
  validateBackend(backend);

  if (typeof backend.listByPrefix !== "function") {
    return [];
  }

  const {
    region = filter.region || null,
    tenant = filter.tenant || null,
    partition = filter.partition || null
  } = filter;

  const {
    band = GENOME_BAND,
    signal = null,
    context = null
  } = hints;

  const prefix = buildGenomePrefix({ region, tenant, partition });

  const rows = await backend.listByPrefix({
    prefix,
    band,
    region,
    tenant,
    partition,
    signal,
    context
  });

  return (rows || []).map((row) => normalizeLoadedGenome(row.value));
}

// ============================================================================
// INTERNAL HELPERS — KEYS / MERGE / VALIDATION
// ============================================================================

function buildGenomeKey({ subjectId, region, tenant, partition }) {
  // Key shape is deterministic and one-band aware.
  // region/tenant/partition are hints baked into the key for sharding.
  const parts = [
    "genome",
    GENOME_EPOCH,
    GENOME_BAND,
    region || "global",
    tenant || "default",
    partition || "root",
    String(subjectId || "unknown")
  ];
  return parts.join(":");
}

function buildGenomePrefix({ region, tenant, partition }) {
  const parts = [
    "genome",
    GENOME_EPOCH,
    GENOME_BAND,
    region || "global",
    tenant || "default",
    partition || "root"
  ];
  return parts.join(":") + ":";
}

/**
 * Merge two GenomeSpecs conservatively (v30-IMMORTAL++).
 *
 * @param {Object|null} oldG
 * @param {Object} newG
 * @returns {Object}
 */
function mergeGenomes(oldG, newG) {
  if (!oldG) {
    return normalizeLoadedGenome(newG);
  }

  const oldLineage = oldG.lineage || {};
  const newLineage = newG.lineage || {};

  const mergedEpochs = [
    ...(Array.isArray(oldLineage.epochs) ? oldLineage.epochs : []),
    ...(Array.isArray(newLineage.epochs) ? newLineage.epochs : [])
  ];

  const traits = unionStrings(oldG.traits, newG.traits);
  const skills = unionStrings(oldG.skills, newG.skills);
  const habits = unionStrings(oldG.habits, newG.habits);

  const merged = {
    ...newG,
    specVersion: GENOME_SPEC_VERSION,
    epoch: GENOME_EPOCH,
    band: GENOME_BAND,
    lineage: {
      firstSeenAt: oldLineage.firstSeenAt || newLineage.firstSeenAt || newG.capturedAt,
      lastSeenAt: newLineage.lastSeenAt || newG.capturedAt || oldLineage.lastSeenAt,
      epochs: mergedEpochs
    },
    traits,
    skills,
    habits,
    stability: newG.stability, // latest wins
    retired: newG.retired ?? oldG.retired ?? false,
    retiredAt: newG.retiredAt ?? oldG.retiredAt ?? null,
    retiredEpoch: newG.retiredEpoch ?? oldG.retiredEpoch ?? null
  };

  return merged;
}

function unionStrings(a, b) {
  const set = new Set([
    ...((Array.isArray(a) ? a : []).filter(Boolean)),
    ...((Array.isArray(b) ? b : []).filter(Boolean))
  ]);
  return Array.from(set);
}

function validateBackend(backend) {
  if (!backend || typeof backend !== "object") {
    throw new Error("[PulseSpecsLongTermMemory-v30] backend adapter is required");
  }
  if (typeof backend.put !== "function" || typeof backend.get !== "function") {
    throw new Error(
      "[PulseSpecsLongTermMemory-v30] backend must implement put/get({ key, value })"
    );
  }
}

/**
 * Minimal shape validation for GenomeSpec v30-IMMORTAL++.
 * This is intentionally light: schema contract is enforced by translator.
 */
function validateGenomeSpecShape(genomeSpec) {
  if (!genomeSpec || typeof genomeSpec !== "object") {
    throw new Error("[PulseSpecsLongTermMemory-v30] genomeSpec must be an object");
  }
  if (!genomeSpec.subjectId) {
    throw new Error("[PulseSpecsLongTermMemory-v30] genomeSpec.subjectId is required");
  }
}

/**
 * Normalize a loaded GenomeSpec into v30-IMMORTAL++ shape.
 *
 * Handles older v20 specs by upgrading in-place.
 */
function normalizeLoadedGenome(raw) {
  if (!raw || typeof raw !== "object") return raw;

  const specVersion = raw.specVersion || "v20-genome";
  const upgraded = { ...raw };

  if (specVersion !== GENOME_SPEC_VERSION) {
    // Lightweight upgrade path: keep lineage/traits/skills/habits, stamp new version.
    upgraded.specVersion = GENOME_SPEC_VERSION;
    upgraded.epoch = GENOME_EPOCH;
    upgraded.band = GENOME_BAND;
  }

  upgraded.traits = Array.isArray(upgraded.traits) ? upgraded.traits : [];
  upgraded.skills = Array.isArray(upgraded.skills) ? upgraded.skills : [];
  upgraded.habits = Array.isArray(upgraded.habits) ? upgraded.habits : [];

  upgraded.lineage = upgraded.lineage || {
    firstSeenAt: upgraded.capturedAt || null,
    lastSeenAt: upgraded.capturedAt || null,
    epochs: []
  };

  return upgraded;
}

/**
 * Attach routing/meta hints to a GenomeSpec before persistence.
 */
function attachMeta(genomeSpec, { region, tenant, partition }) {
  return {
    ...genomeSpec,
    specVersion: GENOME_SPEC_VERSION,
    epoch: GENOME_EPOCH,
    band: GENOME_BAND,
    region: region || genomeSpec.region || null,
    tenant: tenant || genomeSpec.tenant || null,
    partition: partition || genomeSpec.partition || null
  };
}

PulseRealm.SpecsLongTermMemory = {
  listGenomes,
  deleteGenome,
  loadGenome,
  retireGenome,
  saveGenome,
  upsertGenome
}