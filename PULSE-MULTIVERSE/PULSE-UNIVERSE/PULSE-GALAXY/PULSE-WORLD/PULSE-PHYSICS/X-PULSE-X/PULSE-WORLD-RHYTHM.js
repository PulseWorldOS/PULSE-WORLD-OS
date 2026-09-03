// ============================================================================
// PulseWorldHeartRhythm-v33-IMMORTAL++-HYPERFRAME-CONTINUANCE-ONEBAND
// GLOBAL RHYTHM ORGAN — AUTO-RUNNING VERSION (v33)
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


export function createPulseWorldRhythmV33(config) {
  const {
    ExpansionOrgan,
    PulseNet,
    FirebaseAdapter,
    PulseLoggerStore,

    tickRate = 5000,
    maxBatchSize = 500,
    maxRetries = 3,
    backoffBaseMs = 500,

    maxBufferSize = 10000,
    jitterPct = 0,

    adaptiveTick = {
      enabled: true,
      minMs: 500,
      maxMs: 15000,
      backlogScale: 0.0005,
      trustBoost: 0.85,
      integrityBoost: 0.9,
      shortcutBoost: 0.75
    },

    onFlush = null,
    onFallback = null,
    onError = null,

    getContinuance = null,
    getNavState = null,
    getRuntimeFrame = null,
    getHyperFrame = null,
    getDeltaFrame = null,
    getOneBand = null,
    getTrustPulse = null,
    getCacheIntegrity = null,
    getShortcutActivation = null,

    clock = {
      now: () => PulseRealm.PulseNOW,
      setTimeout: (fn, ms) => setTimeout(fn, ms),
      clearTimeout: (id) => clearTimeout(id)
    }
  } = config;

  const RHYTHM_VERSION = "v33-IMMORTAL++-HYPERFRAME-CONTINUANCE-ONEBAND";

  // ---------------------------------------------------------------------------
  // AUTO-INTRODUCTION — IMMORTAL++ GLOBAL HEART ORGAN
  // ---------------------------------------------------------------------------
  console.log(
    "%c[PULSE-WORLD-RHYTHM v33] IMMORTAL++ HEART ORGAN ONLINE\n" +
    "→ Purpose: Maintain global world heartbeat & async flush cycle\n" +
    "→ Role: The ONLY async middleman between logs, Firebase, Expansion, PulseNet\n" +
    "→ Awareness: HyperFrame, DeltaFrame, RuntimeFrame, Continuance, OneBand\n" +
    "→ Influence: TrustPulse, CacheIntegrity, ShortcutActivation\n" +
    "→ Behavior: Adaptive tick, drift-proof, deterministic, auto-running\n" +
    "→ Status: Rhythm loop started automatically — no manual start required",
    "color:#ff00aa;font-weight:bold;font-size:12px;"
  );

  // ---------------------------------------------------------------------------
  // INTERNAL STATE
  // ---------------------------------------------------------------------------
  let retryBuffer = [];
  let inFlight = false;
  let stopped = false;
  let timerId = null;

  const stats = {
    version: RHYTHM_VERSION,
    totalFlushed: 0,
    totalFallbackFlushed: 0,
    totalFailed: 0,
    lastFlushAt: null,
    lastErrorAt: null,
    consecutiveFailures: 0
  };


  // ---------------------------------------------------------------------------
  // BUFFER MANAGEMENT
  // ---------------------------------------------------------------------------
  function enforceBufferCap() {
    if (maxBufferSize <= 0) return;
    if (retryBuffer.length <= maxBufferSize) return;

    const overflow = retryBuffer.length - maxBufferSize;
    retryBuffer.splice(0, overflow);

    console.warn(
      `[WorldRhythm-${RHYTHM_VERSION}] retryBuffer exceeded maxBufferSize=${maxBufferSize}, dropped ${overflow} entries.`
    );
  }

  function takeBatch(limit) {
    if (!retryBuffer.length) return [];
    if (retryBuffer.length <= limit) {
      const batch = retryBuffer;
      retryBuffer = [];
      return batch;
    }
    const batch = retryBuffer.slice(0, limit);
    retryBuffer = retryBuffer.slice(limit);
    return batch;
  }

  function pushBack(entries) {
    if (!entries || !entries.length) return;
    retryBuffer = entries.concat(retryBuffer);
    enforceBufferCap();
  }

  // ---------------------------------------------------------------------------
  // PRIMARY SINK — FIREBASE
  // ---------------------------------------------------------------------------
  async function flushToFirebase(batch) {
    if (!FirebaseAdapter || !FirebaseAdapter.batchWrite || !batch.length) {
      return { ok: true, count: 0, skipped: true };
    }

    try {
      await FirebaseAdapter.batchWrite(batch);

      stats.totalFlushed += batch.length;
      stats.lastFlushAt = clock.now();
      stats.consecutiveFailures = 0;

      if (onFlush) {
        onFlush({
          sink: "firebase",
          count: batch.length,
          retryBufferSize: retryBuffer.length,
          stats: { ...stats },
          continuance: getContinuance?.() || null,
          navState: getNavState?.() || null,
          runtimeFrame: getRuntimeFrame?.() || null,
          hyperFrame: getHyperFrame?.() || null,
          deltaFrame: getDeltaFrame?.() || null,
          trustPulse: getTrustPulse?.() || null,
          cacheIntegrity: getCacheIntegrity?.() || null,
          shortcutActivation: getShortcutActivation?.() || null,
          oneBand: getOneBand?.() || null
        });
      }

      return { ok: true, count: batch.length };
    } catch (err) {
      stats.totalFailed += batch.length;
      stats.lastErrorAt = clock.now();
      stats.consecutiveFailures += 1;

      if (onError) {
        onError(err, {
          sink: "firebase",
          batchSize: batch.length,
          retryBufferSize: retryBuffer.length,
          stats: { ...stats }
        });
      }

      return { ok: false, error: err };
    }
  }

  // ---------------------------------------------------------------------------
  // FALLBACK SINK — EXPANSION / PULSENET
  // ---------------------------------------------------------------------------
  async function flushViaFallback(batch) {
    if (!batch.length) return { ok: true, count: 0 };

    const hasExpansion = ExpansionOrgan?.sendIntent;
    const hasPulseNet = PulseNet?.send;

    if (!hasExpansion && !hasPulseNet) {
      return { ok: false, error: new Error("No fallback sinks configured") };
    }

    try {
      let expansionIntent = null;
      let netRes = null;

      if (hasExpansion) {
        expansionIntent = await ExpansionOrgan.sendIntent({
          type: "world:log:fallback",
          payload: batch,
          meta: {
            rhythmVersion: RHYTHM_VERSION,
            continuance: getContinuance?.() || null,
            trustPulse: getTrustPulse?.() || null
          }
        });
      }

      if (hasPulseNet) {
        netRes = await PulseNet.send({
          route: "/world/logs/fallback",
          method: "POST",
          body: {
            batch,
            rhythmVersion: RHYTHM_VERSION,
            continuance: getContinuance?.() || null,
            trustPulse: getTrustPulse?.() || null
          }
        });
      }

      stats.totalFallbackFlushed += batch.length;
      stats.lastFlushAt = clock.now();
      stats.consecutiveFailures = 0;

      if (onFallback) {
        onFallback({
          count: batch.length,
          expansionIntent,
          netRes,
          retryBufferSize: retryBuffer.length,
          stats: { ...stats },
          continuance: getContinuance?.() || null,
          trustPulse: getTrustPulse?.() || null
        });
      }

      return { ok: true, count: batch.length };
    } catch (err) {
      stats.totalFailed += batch.length;
      stats.lastErrorAt = clock.now();
      stats.consecutiveFailures += 1;

      if (onError) {
        onError(err, {
          sink: "fallback",
          batchSize: batch.length,
          retryBufferSize: retryBuffer.length,
          stats: { ...stats }
        });
      }

      return { ok: false, error: err };
    }
  }

  // ---------------------------------------------------------------------------
  // SINGLE FLUSH CYCLE
  // ---------------------------------------------------------------------------
  async function flushOnce() {
    let batch = takeBatch(maxBatchSize);

    if (!batch.length) {
      const drained = PulseLoggerStore.drainForHeartbeat();
      if (Array.isArray(drained) && drained.length) {
        batch =
          drained.length > maxBatchSize
            ? drained.slice(0, maxBatchSize)
            : drained;

        if (drained.length > maxBatchSize) {
          pushBack(drained.slice(maxBatchSize));
        }
      }
    }

    if (!batch.length) return { ok: true, count: 0 };

    const primary = await flushToFirebase(batch);
    if (primary.ok) return primary;

    const fallback = await flushViaFallback(batch);
    if (fallback.ok) return fallback;

    pushBack(batch);
    return { ok: false, error: fallback.error || primary.error };
  }

  // ---------------------------------------------------------------------------
  // ADAPTIVE TICK + JITTER
  // ---------------------------------------------------------------------------
  function computeTickDelayMs() {
    let base = tickRate;

    const trust = getTrustPulse?.();
    const integrity = getCacheIntegrity?.();
    const shortcut = getShortcutActivation?.();

    if (adaptiveTick.enabled) {
      const backlog = retryBuffer.length;
      base = base * (1 + backlog * (adaptiveTick.backlogScale || 0));

      if (trust?.approved) base *= adaptiveTick.trustBoost || 1;
      if (integrity?.verified) base *= adaptiveTick.integrityBoost || 1;
      if (shortcut?.enabled) base *= adaptiveTick.shortcutBoost || 1;

      base = Math.min(Math.max(base, adaptiveTick.minMs), adaptiveTick.maxMs);
    }

    if (jitterPct > 0) {
      const maxJitter = base * jitterPct;
      const delta = (Math.random() * 2 - 1) * maxJitter;
      base += delta;
    }

    return Math.max(10, Math.floor(base));
  }

  // ---------------------------------------------------------------------------
  // RHYTHM TICK
  // ---------------------------------------------------------------------------
  async function rhythmTick() {
    if (inFlight) return;

    inFlight = true;
    try {
      let attempt = 0;
      let lastError = null;

      while (attempt < maxRetries) {
        attempt += 1;
        const res = await flushOnce();
        if (res.ok) return;
        lastError = res.error || lastError;

        if (attempt < maxRetries) {
          const delay = backoffBaseMs * attempt;
          await new Promise(resolve => clock.setTimeout(resolve, delay));
        }
      }
    } finally {
      inFlight = false;
    }
  }

  // ---------------------------------------------------------------------------
  // GLOBAL RHYTHM LOOP — AUTO START
  // ---------------------------------------------------------------------------
  function scheduleNextTick() {
    if (stopped) return;
    const delay = computeTickDelayMs();
    timerId = clock.setTimeout(() => {
      rhythmTick()
        .catch(err => {
          if (onError) {
            onError(err, {
              sink: "tick",
              retryBufferSize: retryBuffer.length,
              stats: { ...stats }
            });
          }
        })
        .finally(() => scheduleNextTick());
    }, delay);
  }

  // AUTO-START THE RHYTHM LOOP
  scheduleNextTick();

  // ---------------------------------------------------------------------------
  // PUBLIC API
  // ---------------------------------------------------------------------------
  return {
    version: RHYTHM_VERSION,

    flush: () => rhythmTick(),

    stop: () => {
      stopped = true;
      if (timerId != null) {
        clock.clearTimeout(timerId);
        timerId = null;
      }
    },

    getRetryBuffer: () => retryBuffer.slice(),
    getStats: () => ({ ...stats })
  };
}

// Expose globally if needed
PulseRealm.WorldRhythm = {
  createPulseWorldRhythmV33
};
