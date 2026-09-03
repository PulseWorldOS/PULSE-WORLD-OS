/**
 * ============================================================================
 * ORGAN: PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-WORLD/PULSE-SPECS/
 *        PulseSpecsMuscleMemory-v30++
 * VERSION: v30-IMMORTAL++ (ONE-BAND / ADVANTAGE-AWARE / GPU-READY)
 * LAYER: MEMORY (Associative / Vector / Muscle Cortex)
 * ROLE: Maintain embeddings + semantic retrieval for fast, learned recall.
 * ============================================================================
 *
 * This organ:
 *   - takes text chunks (from SkeletalSpecs, NetworkSpecs, or GenomeSpecs)
 *   - embeds them via an injected embedding backend (GPU-aware)
 *   - stores vector entries in a vector backend (Qdrant, Pinecone, pgvector, etc.)
 *   - retrieves nearest neighbors for a query
 *   - supports OneBand routing (symbolic + binary unified)
 *   - supports advantage hints (gpu, warmPath, earn)
 *   - supports worldRouterHint + schedulerHint metadata
 *   - supports TTL + namespace partitioning
 *
 * It is a TRANSLATOR between:
 *   - internal text/specs
 *   - your vector backend
 *
 * BACKEND CONTRACT (v30++ ONEBAND)
 * --------------------------------
 * embedBackend MUST implement:
 *   - embed(texts: string[]) → Promise<number[][]>
 *
 * vectorBackend MUST implement:
 *   - upsert({ namespace, vectors, ttlMs?, band?, signal?, warmPath? })
 *   - query({ namespace, vector, topK, filter?, band?, signal?, warmPath? })
 *   - delete?({ namespace, ids })
 *
 * No network logic here — pure logic organ.
 */

// ============================================================================
// CONSTANTS — ONEBAND / VERSION / TTL
// ============================================================================

export const MUSCLE_VERSION = "v30-muscle-immortal++";
export const MUSCLE_BAND = "oneband";
export const DEFAULT_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days for semantic memory
export const DEFAULT_TOPK = 12;

// ============================================================================
// PUBLIC API — v30++
// ============================================================================
//
//  ███╗   ███╗██╗   ██╗███████╗ ██████╗██╗     ███████╗
//  ████╗ ████║██║   ██║██╔════╝██╔════╝██║     ██╔════╝
//  ██╔████╔██║██║   ██║█████╗  ██║     ██║     █████╗  
//  ██║╚██╔╝██║██║   ██║██╔══╝  ██║     ██║     ██╔══╝  
//  ██║ ╚═╝ ██║╚██████╔╝███████╗╚██████╗███████╗███████╗
//  ╚═╝     ╚═╝ ╚═════╝ ╚══════╝ ╚═════╝╚══════╝╚══════╝


/**
 * Index content into muscle memory (semantic cortex).
 *
 * @param {Object} params
 */
export async function indexMuscleMemory({
  subjectId,
  items,
  embedBackend,
  vectorBackend,
  ttlMs = DEFAULT_TTL_MS,
  advantage = {},
  signal = null,
  warmPath = true,
  worldRouterHint = null,
  schedulerHint = null
}) {
  if (!items || items.length === 0) return;

  // Extract text
  const texts = items.map((i) => i.text);

  // GPU-aware embedding
  const embeddings = await embedBackend.embed(texts, {
    gpu: !!advantage.gpu,
    warmPath: !!advantage.warmPath
  });

  // Build vector entries
  const vectors = items.map((item, i) => ({
    id: item.id,
    values: embeddings[i],
    metadata: {
      subjectId,
      version: MUSCLE_VERSION,
      band: MUSCLE_BAND,
      advantage,
      worldRouterHint,
      schedulerHint
    }
  }));

  // Upsert into vector backend
  await vectorBackend.upsert({
    namespace: muscleNamespace(subjectId),
    vectors,
    ttlMs,
    band: MUSCLE_BAND,
    signal,
    warmPath
  });
}

/**
 * Query muscle memory for nearest neighbors.
 *
 * @param {Object} params
 */
export async function queryMuscleMemory({
  subjectId,
  queryText,
  topK = DEFAULT_TOPK,
  embedBackend,
  vectorBackend,
  filter = null,
  advantage = {},
  signal = null,
  warmPath = true
}) {
  // Embed query
  const [embedding] = await embedBackend.embed([queryText], {
    gpu: !!advantage.gpu,
    warmPath: !!advantage.warmPath
  });

  // Query vector backend
  const result = await vectorBackend.query({
    namespace: muscleNamespace(subjectId),
    vector: embedding,
    topK,
    filter,
    band: MUSCLE_BAND,
    signal,
    warmPath
  });

  // Normalize result shape
  return (result.matches || []).map((m) => ({
    id: m.id,
    score: m.score,
    metadata: m.metadata || {},
    vector: m.values || null
  }));
}

/**
 * Delete specific vector entries (optional).
 */
export async function deleteMuscleEntries({
  subjectId,
  ids,
  vectorBackend
}) {
  if (!vectorBackend.delete) return false;

  await vectorBackend.delete({
    namespace: muscleNamespace(subjectId),
    ids
  });

  return true;
}

/**
 * Clear entire muscle memory namespace (optional).
 */
export async function clearMuscleMemory({
  subjectId,
  vectorBackend
}) {
  if (!vectorBackend.delete) return false;

  // Delete by wildcard (backend-specific)
  await vectorBackend.delete({
    namespace: muscleNamespace(subjectId),
    ids: ["*"]
  });

  return true;
}

// ============================================================================
// INTERNAL HELPERS — NAMESPACE / KEYS
// ============================================================================

function muscleNamespace(subjectId) {
  return `muscle:v30:oneband:${subjectId}`;
}
