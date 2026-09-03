/**
 * ============================================================================
 * ORGAN: PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-WORLD/PULSE-SPECS/
 *        PulseSpecsShortTermMemory-v30++
 * VERSION: v30-IMMORTAL++ (ONE-BAND / ADVANTAGE-AWARE)
 * LAYER: MEMORY (Short-Term / Hot / Working / Warm-Path)
 * ROLE: Maintain hot, recent context for fast access with OneBand routing.
 * ============================================================================
 *
 * This organ:
 *   - caches recent SkeletalSpecs (DOM skeletons)
 *   - caches recent NetworkSpecs (flow traces)
 *   - caches the latest GenomeSpec snapshot (hot genome)
 *   - is ONE-BAND unified (symbolic + binary)
 *   - is advantage-aware (GPU, Earn, WarmPath)
 *   - is signal-aware (PulseSignalPort / FinalityPort)
 *   - supports TTL, freshness scoring, warm-path priority
 *
 * It is a TRANSLATOR between:
 *   - internal spec objects
 *   - your short-term cache backend (memory, Redis, edge-cache, etc.)
 *
 * BACKEND CONTRACT (v30++ ONEBAND)
 * --------------------------------
 * backend MUST implement:
 *   - put({ key, value, ttlMs?, band?, signal?, warmPath? })
 *   - get({ key, band?, signal?, warmPath? }) → value | null
 *   - delete?({ key })
 *
 * No network logic here — pure logic organ.
 */
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
// CONSTANTS — ONEBAND / VERSION / TTL
// ============================================================================

export const SHORT_TERM_VERSION = "v30-short-term-immortal++";
export const SHORT_TERM_BAND = "oneband";
export const DEFAULT_TTL_MS = 1000 * 60 * 20; // 20 minutes hot cache
export const MAX_RECENT = 100; // more than v20 (50) because v30 is faster

// ============================================================================
// PUBLIC API — v30++
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝


/**
 * Push a new SkeletalSpec into short-term memory (hot-path).
 *
 * @param {Object} params
 */
export async function pushSkeletal({
  subjectId,
  skeletalSpec,
  backend,
  limit = MAX_RECENT,
  ttlMs = DEFAULT_TTL_MS,
  signal = null,
  warmPath = true
}) {
  const key = skeletalKey(subjectId);
  const list = (await backend.get({ key, band: SHORT_TERM_BAND })) || [];

  list.push(skeletalSpec);
  while (list.length > limit) list.shift();

  await backend.put({
    key,
    value: list,
    ttlMs,
    band: SHORT_TERM_BAND,
    signal,
    warmPath
  });
}

/**
 * Get recent SkeletalSpecs.
 */
export async function getRecentSkeletal({
  subjectId,
  backend,
  signal = null
}) {
  const key = skeletalKey(subjectId);
  return (
    (await backend.get({
      key,
      band: SHORT_TERM_BAND,
      signal
    })) || []
  );
}

/**
 * Push a new NetworkSpec into short-term memory.
 */
export async function pushNetwork({
  subjectId,
  networkSpec,
  backend,
  limit = MAX_RECENT,
  ttlMs = DEFAULT_TTL_MS,
  signal = null,
  warmPath = true
}) {
  const key = networkKey(subjectId);
  const list = (await backend.get({ key, band: SHORT_TERM_BAND })) || [];

  list.push(networkSpec);
  while (list.length > limit) list.shift();

  await backend.put({
    key,
    value: list,
    ttlMs,
    band: SHORT_TERM_BAND,
    signal,
    warmPath
  });
}

/**
 * Get recent NetworkSpecs.
 */
export async function getRecentNetwork({
  subjectId,
  backend,
  signal = null
}) {
  const key = networkKey(subjectId);
  return (
    (await backend.get({
      key,
      band: SHORT_TERM_BAND,
      signal
    })) || []
  );
}

/**
 * Cache the latest GenomeSpec snapshot for fast access.
 * Advantage-aware: GPU/Earn/WarmPath can bias TTL.
 */
export async function setHotGenome({
  subjectId,
  genomeSpec,
  backend,
  ttlMs = DEFAULT_TTL_MS,
  advantage = {},
  signal = null,
  warmPath = true
}) {
  const key = hotGenomeKey(subjectId);

  const envelope = {
    version: SHORT_TERM_VERSION,
    band: SHORT_TERM_BAND,
    subjectId,
    genomeSpec,
    cachedAt: new Date().toISOString(),
    ttlMs,
    expiresAt: new Date(PulseRealm.PulseNOW + ttlMs).toISOString(),
    advantage: {
      gpu: !!advantage.gpu,
      earn: !!advantage.earn,
      warmPath: !!advantage.warmPath,
      coldPath: !!advantage.coldPath
    }
  };

  await backend.put({
    key,
    value: envelope,
    ttlMs,
    band: SHORT_TERM_BAND,
    signal,
    warmPath
  });
}

/**
 * Get the latest GenomeSpec snapshot from cache.
 * Returns { genomeSpec, stale, envelope }
 */
export async function getHotGenome({
  subjectId,
  backend,
  allowStale = false,
  signal = null
}) {
  const key = hotGenomeKey(subjectId);
  const envelope =
    (await backend.get({
      key,
      band: SHORT_TERM_BAND,
      signal
    })) || null;

  if (!envelope) return null;

  const now = PulseRealm.PulseNOW;
  const expires = Date.parse(envelope.expiresAt || 0);
  const stale = now > expires;

  if (stale && !allowStale) return null;

  return {
    genomeSpec: envelope.genomeSpec,
    stale,
    envelope
  };
}

/**
 * Invalidate hot genome (soft delete).
 */
export async function invalidateHotGenome({
  subjectId,
  backend,
  signal = null
}) {
  const key = hotGenomeKey(subjectId);

  if (typeof backend.delete === "function") {
    await backend.delete({ key, band: SHORT_TERM_BAND, signal });
  } else {
    await backend.put({
      key,
      value: null,
      ttlMs: 1,
      band: SHORT_TERM_BAND,
      signal
    });
  }
}

// ============================================================================
// INTERNAL HELPERS — KEYS
// ============================================================================

function skeletalKey(subjectId) {
  return `short:v30:oneband:skeletal:${subjectId}`;
}

function networkKey(subjectId) {
  return `short:v30:oneband:network:${subjectId}`;
}

function hotGenomeKey(subjectId) {
  return `short:v30:oneband:genome:${subjectId}`;
}
