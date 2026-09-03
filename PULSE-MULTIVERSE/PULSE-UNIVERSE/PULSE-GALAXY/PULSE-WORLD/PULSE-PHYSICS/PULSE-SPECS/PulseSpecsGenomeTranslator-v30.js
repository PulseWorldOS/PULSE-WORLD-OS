/**
 * ============================================================================
 * ORGAN: PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-WORLD/PULSE-SPECS/PulseSpecsGenomeTranslator
 * VERSION: v30-IMMORTAL++ (ONE-BAND)
 * LAYER: MEMORY / EVOLUTION / ONE-BAND (Backend Intelligence Layer)
 * ROLE: Convert SkeletalSpecs + NetworkSpecs → deterministic GenomeSpec
 *       + PulseField-ready, router-aware, one-band genome envelope.
 * ============================================================================
 *
 *  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
 *  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
 *  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
 *  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
 *  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
 *  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
 *
 * HIGH-LEVEL PURPOSE (v30-IMMORTAL++)
 * -----------------------------------
 * This organ is the organism’s *genetic memory* translator.
 *
 * It ingests:
 *   - SkeletalSpecs (DOM-level semantic skeletons)
 *   - NetworkSpecs (proxy-level flow maps)
 *
 * And emits a long-lived, deterministic:
 *
 *   GenomeSpec v30-IMMORTAL++
 *
 * PLUS a PulseField-ready, router-aware envelope:
 *
 *   GenomeEnvelope:
 *     - genome: GenomeSpec
 *     - pulseFields: normalized PulseFields for storage
 *     - routerHints: world_router_hint + scheduler_hint
 *     - immortalEpoch: "v30-IMMORTAL"
 *     - band: "dual" | "symbolic" | "binary" (ONE-BAND default: "dual")
 *
 * The GenomeSpec describes:
 *   - lineage   → when this subject appeared and how it evolved
 *   - epochs    → coarse temporal segments with dominant modes/flows
 *   - traits    → stable structural characteristics
 *   - skills    → observable capabilities
 *   - habits    → temporal/behavioral patterns
 *   - stability → confidence in the genome’s reliability
 *   - intellHash → deterministic hash of the genome (for drift detection)
 *
 * This powers:
 *   - personalization
 *   - prewarm and routing
 *   - Earn reputation and tiers
 *   - PulseWorld identity and mastery
 *   - INTELLEDB™ genome routing + memory tier selection
 *
 * IMMORTAL-TIER GUARANTEES
 * ------------------------
 * 1. Deterministic:
 *    Same history → same GenomeSpec + same intellHash.
 *
 * 2. Zero Hallucination:
 *    Only infers from observable patterns.
 *    No psychological profiling, no identity guessing.
 *
 * 3. Schema Stability:
 *    GenomeSpec v30-IMMORTAL++ is a hard contract.
 *
 * 4. Safety:
 *    - No PII inference
 *    - No personality diagnosis
 *    - No sensitive attribute inference
 *
 * 5. One-Band:
 *    - All outputs are band-tagged ("dual" by default).
 *    - Ready for binary + symbolic substrates without branching logic.
 *
 * INPUT CONTRACT
 * --------------
 * buildGenomeSpec({
 *   skeletalHistory: Array<SkeletalSpec>,
 *   networkHistory: Array<NetworkSpec>,
 *   subjectId: string,
 *   timestamp: string (ISO 8601)
 * })
 *
 * OUTPUT CONTRACT (GenomeSpec v30-IMMORTAL++)
 * -------------------------------------------
 * {
 *   specVersion: "v30-genome",
 *   subjectId: string,
 *   capturedAt: string,
 *   lineage: {
 *     firstSeenAt: string,
 *     lastSeenAt: string,
 *     epochs: Array<{
 *       id: string,
 *       start: string,
 *       end: string,
 *       dominantMode: string,
 *       dominantFlows: string[],
 *       activityScore: number,      // 0–1 normalized activity for epoch
 *       llmIntensity: number        // 0–1 normalized LLM usage
 *     }>
 *   },
 *   traits: string[],               // stable structural characteristics
 *   skills: string[],               // observable capabilities
 *   habits: string[],               // temporal/behavioral patterns
 *   stability: number,              // 0–1 confidence score
 *   band: "dual" | "symbolic" | "binary",
 *   immortalEpoch: "v30-IMMORTAL",
 *   intellHash: string              // hex SHA-256 of canonical genome JSON
 * }
 *
 * ENVELOPE CONTRACT (for PulseFields + routers)
 * ---------------------------------------------
 * buildGenomeEnvelope(params) → {
 *   genome: GenomeSpec,
 *   pulseFields: {
 *     subjectId: { type: "id", value: string },
 *     immortalEpoch: { type: "immortal_epoch", value: "v30-IMMORTAL" },
 *     band: { type: "band", value: "dual" },
 *     intellHash: { type: "intell_hash", value: string },
 *     worldRouterHint: {
 *       type: "world_router_hint",
 *       value: { route, region, tenant, priority }
 *     },
 *     schedulerHint: {
 *       type: "scheduler_hint",
 *       value: { cron, window, priority }
 *     }
 *   },
 *   routerHints: {
 *     worldRouterHint: { route, region, tenant, priority },
 *     schedulerHint: { cron, window, priority }
 *   }
 * }
 */

// ============================================================================
// PURE HELPERS — NO IO, NO NETWORK, NO RUNTIME
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



/**
 * Build a GenomeSpec from Skeletal + Network history.
 *
 * @param {Object} params
 * @param {Array<Object>} params.skeletalHistory - Array of SkeletalSpecs.
 * @param {Array<Object>} params.networkHistory  - Array of NetworkSpecs.
 * @param {string} params.subjectId              - Stable subject identifier.
 * @param {string} params.timestamp              - ISO 8601 capture time.
 * @param {("dual"|"symbolic"|"binary")} [params.band="dual"] - One-band tag.
 * @returns {Object} GenomeSpec v30-IMMORTAL++.
 */
export function buildGenomeSpec({
  skeletalHistory,
  networkHistory,
  subjectId,
  timestamp,
  band = "dual"
}) {
  const skeletal = Array.isArray(skeletalHistory) ? skeletalHistory : [];
  const network = Array.isArray(networkHistory) ? networkHistory : [];

  const lineage = buildLineage(skeletal, network, timestamp);
  const traits = inferTraits(skeletal, network);
  const skills = inferSkills(skeletal, network);
  const habits = inferHabits(skeletal, network);
  const stability = computeStabilityScore(skeletal, network);
  const llmUsageScore = computeLLMUsageScore(network);
  const canonical = {
    specVersion: "v30-genome",
    subjectId,
    capturedAt: timestamp,
    lineage,
    traits,
    skills,
    habits,
    stability,
    band: normalizeBand(band),
    immortalEpoch: "v30-IMMORTAL",
    llmUsageScore
  };

  const intellHash = computeIntellHash(canonical);

  return {
    ...canonical,
    intellHash
  };
}

/**
 * Build a router-ready GenomeEnvelope with PulseField metadata.
 *
 * @param {Object} params - Same as buildGenomeSpec + optional router hints.
 * @param {Object} [params.worldRouterHint] - { route, region, tenant, priority }
 * @param {Object} [params.schedulerHint]   - { cron, window, priority }
 * @returns {Object} GenomeEnvelope
 */
export function buildGenomeEnvelope({
  skeletalHistory,
  networkHistory,
  subjectId,
  timestamp,
  band = "dual",
  worldRouterHint,
  schedulerHint
}) {
  const genome = buildGenomeSpec({
    skeletalHistory,
    networkHistory,
    subjectId,
    timestamp,
    band
  });

  const routerHints = buildRouterHints(genome, {
    worldRouterHint,
    schedulerHint
  });

  const pulseFields = {
    subjectId: {
      type: "id",
      value: genome.subjectId
    },
    immortalEpoch: {
      type: "immortal_epoch",
      value: genome.immortalEpoch
    },
    band: {
      type: "band",
      value: genome.band
    },
    intellHash: {
      type: "intell_hash",
      value: genome.intellHash
    },
    worldRouterHint: {
      type: "world_router_hint",
      value: routerHints.worldRouterHint
    },
    schedulerHint: {
      type: "scheduler_hint",
      value: routerHints.schedulerHint
    }
  };

  return {
    genome,
    pulseFields,
    routerHints
  };
}

// ============================================================================
// LINEAGE: FIRST SEEN, LAST SEEN, EPOCHS (v30+ with activity + LLM intensity)
// ============================================================================

function buildLineage(skeletalHistory, networkHistory, now) {
  const firstSeen = findFirstTimestamp(skeletalHistory, networkHistory) || now;
  const epochs = buildEpochs(skeletalHistory, networkHistory);

  return {
    firstSeenAt: firstSeen,
    lastSeenAt: now,
    epochs
  };
}

function findFirstTimestamp(skeletalHistory, networkHistory) {
  const times = [];

  for (const s of skeletalHistory) {
    if (s.meta.capturedAt) times.push(s.meta.capturedAt);
  }
  for (const n of networkHistory) {
    if (n.capturedAt) times.push(n.capturedAt);
  }

  if (times.length === 0) return null;

  times.sort();
  return times[0];
}

function buildEpochs(skeletalHistory, networkHistory) {
  const buckets = new Map();
  const bucketKey = (iso) => (iso ? iso.slice(0, 10) : "unknown");

  for (const s of skeletalHistory) {
    const t = s.meta.capturedAt;
    if (!t) continue;
    const key = bucketKey(t);
    if (!buckets.has(key)) {
      buckets.set(key, { skeletal: [], network: [] });
    }
    buckets.get(key).skeletal.push(s);
  }

  for (const n of networkHistory) {
    const t = n.capturedAt;
    if (!t) continue;
    const key = bucketKey(t);
    if (!buckets.has(key)) {
      buckets.set(key, { skeletal: [], network: [] });
    }
    buckets.get(key).network.push(n);
  }

  const keys = Array.from(buckets.keys()).sort();
  const epochs = [];

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const bucket = buckets.get(key);

    const start = findBucketStart(bucket);
    const end = findBucketEnd(bucket);

    const dominantMode = computeDominantMode(bucket.skeletal);
    const dominantFlows = computeDominantFlowKinds(bucket.network);
    const activityScore = computeEpochActivityScore(bucket);
    const llmIntensity = computeEpochLLMIntensity(bucket.network);

    epochs.push({
      id: `epoch-${i + 1}`,
      start,
      end,
      dominantMode,
      dominantFlows,
      activityScore,
      llmIntensity
    });
  }

  return epochs;
}

function findBucketStart(bucket) {
  const times = [];

  for (const s of bucket.skeletal) {
    if (s.meta.capturedAt) times.push(s.meta.capturedAt);
  }
  for (const n of bucket.network) {
    if (n.capturedAt) times.push(n.capturedAt);
  }

  if (times.length === 0) return "";
  times.sort();
  return times[0];
}

function findBucketEnd(bucket) {
  const times = [];

  for (const s of bucket.skeletal) {
    if (s.meta.capturedAt) times.push(s.meta.capturedAt);
  }
  for (const n of bucket.network) {
    if (n.capturedAt) times.push(n.capturedAt);
  }

  if (times.length === 0) return "";
  times.sort();
  return times[times.length - 1];
}

function computeDominantMode(skeletalList) {
  const counts = new Map();

  for (const s of skeletalList) {
    const mode = s.focus.mode || "unknown";
    counts.set(mode, (counts.get(mode) || 0) + 1);
  }

  if (counts.size === 0) return "unknown";

  let bestMode = "unknown";
  let bestCount = -1;

  for (const [mode, count] of counts.entries()) {
    if (count > bestCount) {
      bestCount = count;
      bestMode = mode;
    }
  }

  return bestMode;
}

function computeDominantFlowKinds(networkList) {
  const counts = new Map();

  for (const n of networkList) {
    const flows = Array.isArray(n.flows) ? n.flows : [];
    for (const f of flows) {
      const kind = f.kind || "other";
      counts.set(kind, (counts.get(kind) || 0) + 1);
    }
  }

  const entries = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  return entries.slice(0, 3).map(([kind]) => kind);
}

function computeEpochActivityScore(bucket) {
  const skeletalCount = bucket.skeletal.length;
  const networkCount = bucket.network.length;
  const total = skeletalCount + networkCount;
  if (total === 0) return 0;

  const normalized = Math.min(1, total / 50);
  return Number(normalized.toFixed(3));
}

function computeEpochLLMIntensity(networkList) {
  let totalLLM = 0;
  for (const n of networkList) {
    totalLLM += n.summary.llmCalls || 0;
  }
  const normalized = Math.min(1, totalLLM / 100);
  return Number(normalized.toFixed(3));
}

// ============================================================================
// TRAITS: STABLE STRUCTURAL CHARACTERISTICS (v30+ minor extensions)
// ============================================================================

function inferTraits(skeletalHistory, networkHistory) {
  const traits = new Set();

  // Page mode traits
  if (skeletalHistory.some((s) => s.focus.mode === "chat")) {
    traits.add("uses-chat-interfaces");
  }
  if (skeletalHistory.some((s) => s.focus.mode === "editor")) {
    traits.add("uses-editors");
  }
  if (skeletalHistory.some((s) => s.focus.mode === "article")) {
    traits.add("reads-articles");
  }

  // Network traits
  if (networkHistory.some((n) => (n.summary.llmCalls || 0) > 0)) {
    traits.add("llm-network-usage");
  }
  if (networkHistory.some((n) => (n.summary.apiCalls || 0) > 0)) {
    traits.add("api-network-usage");
  }

  // Structural multi-surface trait (e.g., multiple distinct modes)
  const modes = new Set(
    skeletalHistory.map((s) => s.focus.mode).filter(Boolean)
  );
  if (modes.size >= 3) {
    traits.add("multi-surface-usage");
  }

  return Array.from(traits);
}

// ============================================================================
// SKILLS: OBSERVABLE CAPABILITIES (v30+ same guarantees, extra tags)
// ============================================================================

function inferSkills(skeletalHistory, networkHistory) {
  const skills = new Set();

  // Code authoring
  const usesCode = skeletalHistory.some((s) =>
    s.content.blocks.some((b) => b.type === "code")
  );
  if (usesCode) skills.add("code-authoring");

  // Long-form writing
  const longForm = skeletalHistory.some((s) =>
    s.content.blocks.some((b) => (b.text || "").length > 800)
  );
  if (longForm) skills.add("long-form-writing");

  // Multi-language (very rough: presence of non-ASCII)
  const multilingual = skeletalHistory.some((s) =>
    s.content.blocks.some((b) => /[^\x00-\x7F]/.test(b.text || ""))
  );
  if (multilingual) skills.add("multilingual-usage");

  // LLM orchestration (multiple LLM calls in flows)
  const orchestratesLLM = networkHistory.some(
    (n) => (n.summary.llmCalls || 0) > 3
  );
  if (orchestratesLLM) skills.add("llm-orchestration");

  // Multi-session orchestration (many sessions over time)
  const sessionCount = networkHistory.length;
  if (sessionCount > 50) {
    skills.add("high-session-orchestration");
  }

  return Array.from(skills);
}

// ============================================================================
// HABITS: TEMPORAL / BEHAVIORAL PATTERNS (v30+ same, deterministic)
// ============================================================================

function inferHabits(skeletalHistory, networkHistory) {
  const habits = new Set();

  const timestamps = collectTimestamps(skeletalHistory, networkHistory);
  if (timestamps.length === 0) return [];

  // Time-of-day habits
  const hours = timestamps.map((t) => new Date(t).getHours());
  const nightUsage = hours.filter((h) => h >= 22 || h < 5).length;
  const dayUsage = hours.length - nightUsage;

  if (nightUsage > dayUsage && nightUsage > 5) {
    habits.add("active-late-night");
  } else if (dayUsage > nightUsage && dayUsage > 5) {
    habits.add("active-daytime");
  }

  // Session length habits (approximate via NetworkSpec durations)
  const durations = networkHistory
    .map((n) => n.summary.durationMs || 0)
    .filter((d) => d > 0);

  if (durations.length > 0) {
    const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
    if (avg < 60_000) habits.add("short-sessions");
    else if (avg > 10 * 60_000) habits.add("long-sessions");
  }

  return Array.from(habits);
}

function collectTimestamps(skeletalHistory, networkHistory) {
  const times = [];

  for (const s of skeletalHistory) {
    if (s.meta.capturedAt) times.push(s.meta.capturedAt);
  }
  for (const n of networkHistory) {
    if (n.capturedAt) times.push(n.capturedAt);
  }

  return times.sort();
}

// ============================================================================
// STABILITY + LLM USAGE SCORE (v30+)
// ============================================================================

function computeStabilityScore(skeletalHistory, networkHistory) {
  const skeletalCount = skeletalHistory.length;
  const networkCount = networkHistory.length;

  const timestamps = collectTimestamps(skeletalHistory, networkHistory);
  if (timestamps.length === 0) return 0;

  const first = new Date(timestamps[0]).getTime();
  const last = new Date(timestamps[timestamps.length - 1]).getTime();
  const spanMs = Math.max(0, last - first);

  const skeletalScore = Math.min(1, skeletalCount / 50);
  const networkScore = Math.min(1, networkCount / 50);
  const spanScore = Math.min(1, spanMs / (30 * 24 * 60 * 60 * 1000)); // 30 days

  const stability = skeletalScore * 0.4 + networkScore * 0.4 + spanScore * 0.2;
  return Number(stability.toFixed(3));
}

function computeLLMUsageScore(networkHistory) {
  let totalLLM = 0;
  let totalSessions = networkHistory.length || 1;

  for (const n of networkHistory) {
    totalLLM += n.summary.llmCalls || 0;
  }

  const avgPerSession = totalLLM / totalSessions;
  const normalized = Math.min(1, avgPerSession / 20);
  return Number(normalized.toFixed(3));
}

// ============================================================================
// BAND + INTELLHASH + ROUTER HINTS (v30+ ONE-BAND)
// ============================================================================

function normalizeBand(band) {
  if (band === "symbolic" || band === "binary" || band === "dual") {
    return band;
  }
  return "dual";
}

/**
 * Deterministic pseudo-SHA-256 style hash for IMMORTAL specs.
 * NOTE: This is a pure, deterministic, non-cryptographic stand-in.
 *
 * @param {Object} genomeCanonical
 * @returns {string} hex string (length 64)
 */
function computeIntellHash(genomeCanonical) {
  const json = JSON.stringify(genomeCanonical, Object.keys(genomeCanonical).sort());
  let h1 = 0x811c9dc5;
  let h2 = 0x811c9dc5;

  for (let i = 0; i < json.length; i++) {
    const c = json.charCodeAt(i);
    h1 ^= c;
    h1 = (h1 * 0x01000193) >>> 0;
    h2 += c * (i + 1);
    h2 = (h2 * 0x01000193) >>> 0;
  }

  const toHex = (n) => n.toString(16).padStart(8, "0");
  const base = toHex(h1) + toHex(h2) + toHex(h1 ^ h2) + toHex(h1 + h2);
  return (base + base).slice(0, 64);
}

/**
 * Build router hints with safe defaults.
 *
 * @param {Object} genome
 * @param {Object} hints
 * @returns {{ worldRouterHint: Object, schedulerHint: Object }}
 */
function buildRouterHints(genome, hints = {}) {
  const stability = genome.stability ?? 0;
  const llmUsageScore = genome.llmUsageScore ?? 0;

  const defaultWorldRouterHint = {
    route: "genome",
    region: "global",
    tenant: "default",
    priority: Math.round(stability * 100)
  };

  const defaultSchedulerHint = {
    cron: stability > 0.7 ? "0 * * * *" : "0 */6 * * *",
    window: "rolling",
    priority: Math.round(llmUsageScore * 100)
  };

  return {
    worldRouterHint: {
      ...defaultWorldRouterHint,
      ...(hints.worldRouterHint || {})
    },
    schedulerHint: {
      ...defaultSchedulerHint,
      ...(hints.schedulerHint || {})
    }
  };
}

PulseRealm.SpecsGenomeTranslator = {
  buildGenomeEnvelope,
  buildGenomeSpec
}