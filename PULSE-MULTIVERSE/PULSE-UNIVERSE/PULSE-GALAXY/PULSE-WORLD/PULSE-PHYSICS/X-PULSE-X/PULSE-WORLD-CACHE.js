// ============================================================================
//  PulseWorldBinaryCache-v33.js — IMMORTAL++-HYPERFRAME (TIMELINE CLIENT)
//  PURE BINARY WORLD STATE ADAPTER + CACHE/HISTORY ACCESS LAYER
//  “THE WORLD REMEMBERS. YOU CAN PULL IT ON DEMAND.”
// ============================================================================

import { PulseCoreGMemory } from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";
import {
  generateHash,
  getLastSnapshot,
  saveSnapshot,
  getPulseWorldHistory_v33,
  bootPulseWorld_v33
} from "./PULSE-WORLD-CACHESTORE.js";

// ============================================================================
//  INTERNAL CONSTANTS
// ============================================================================
const CACHE_VERSION = "v33-IMMORTAL++-HYPERFRAME";

// ============================================================================
//  AUTO-INTRODUCTION ON IMPORT
// ============================================================================
(() => {
  console.log(
    "🗄️ PULSE CACHE/DB SYSTEM v33.0 — %c[PULSE-WORLD-BINARYCACHE] IMMORTAL++ CLIENT READY\n" +
    "→ Runtime adapter initialized\n" +
    "→ Timeline store linked\n" +
    "→ World hydration available\n" +
    "→ Snapshot export + history access online",
    "color:#00ff88;font-weight:bold;font-size:12px;"
  );
})();

// ============================================================================
//  SAFE HELPERS (LOCAL ONLY, NO STORAGE LOGIC)
// ============================================================================
function safeObj(v) { return v && typeof v === "object" ? v : {}; }
function safeArr(v) { return Array.isArray(v) ? v : []; }
function safeBool(v, fallback = false) { return typeof v === "boolean" ? v : fallback; }
function safeStr(v, fallback = null) { return typeof v === "string" ? v : fallback; }

// ============================================================================
//  RUNTIME FRAME RESOLUTION (WORLD-SIDE ONLY)
// ============================================================================
function resolveRuntimeFrame_v33(world) {
  if (!world) return {};

  const rf = safeObj(world.runtimeFrame);
  const r  = safeObj(world.runtime);
  const hf = safeObj(world.hyperFrame);
  const df = safeObj(world.deltaFrame);

  if (Object.keys(hf).length) return hf;
  if (Object.keys(rf).length) return rf;
  if (Object.keys(r).length)  return r;
  return df;
}

// ============================================================================
//  ATTACH RUNTIME (WORLD-SIDE ONLY)
// ============================================================================
function attachRuntime_v33(world, frame) {
  const f = safeObj(frame);

  world.runtime      = safeObj(world.runtime);
  world.runtimeFrame = safeObj(world.runtimeFrame);
  world.hyperFrame   = safeObj(world.hyperFrame);
  world.deltaFrame   = safeObj(world.deltaFrame);

  world.runtime.binaryCacheFrame      = f;
  world.runtimeFrame.binaryCacheFrame = f;
  world.hyperFrame.binaryCacheFrame   = f;
  world.deltaFrame.binaryCacheFrame   = f;

  world.runtime.binaryCacheVersion      = CACHE_VERSION;
  world.runtimeFrame.binaryCacheVersion = CACHE_VERSION;
  world.hyperFrame.binaryCacheVersion   = CACHE_VERSION;
  world.deltaFrame.binaryCacheVersion   = CACHE_VERSION;
}

// ============================================================================
//  APPLY WORLD STATE — PURE BINARY + HYPERFRAME + CONTINUANCE
// ============================================================================
export function applyPulseWorldBinary_v33(world) {
  if (!world || typeof world !== "object") return world;

  let inst = null;
  try { inst = PulseCoreGMemory.create() || null; }
  catch { inst = null; }

  if (!inst) return world;

  // Normalize world fields
  world.entities    = safeObj(world.entities);
  world.waves       = safeArr(world.waves);
  world.meta        = safeObj(world.meta);
  world.flags       = safeObj(world.flags);
  world.navState    = world.navState ?? null;
  world.continuance = world.continuance ?? null;

  const predictions = safeObj(world.predictions);
  predictions.nextPages  = safeArr(predictions.nextPages);
  predictions.nextRoutes = safeArr(predictions.nextRoutes);
  world.predictions = predictions;

  world.oneBandLanes = world.oneBandLanes ?? null;
  world.binaryField  = world.binaryField  ?? null;

  world.hyperFrame = world.hyperFrame ?? null;
  world.deltaFrame = world.deltaFrame ?? null;

  const cacheIntegrity = safeObj(world.cacheIntegrity);
  cacheIntegrity.hash     = cacheIntegrity.hash ?? null;
  cacheIntegrity.verified = safeBool(cacheIntegrity.verified, false);
  world.cacheIntegrity    = cacheIntegrity;

  const trustPulse = safeObj(world.trustPulse);
  trustPulse.approved  = safeBool(trustPulse.approved, false);
  trustPulse.timestamp = trustPulse.timestamp ?? null;
  world.trustPulse     = trustPulse;

  const shortcutActivation = safeObj(world.shortcutActivation);
  shortcutActivation.enabled  = safeBool(shortcutActivation.enabled, false);
  shortcutActivation.lastUsed = shortcutActivation.lastUsed ?? null;
  world.shortcutActivation    = shortcutActivation;

  world.meta.version          = safeStr(world.meta.version, world.meta.version || CACHE_VERSION);
  world.meta.binaryCacheLayer = "PulseWorldBinaryCache-v33";

  const unifiedRuntime = resolveRuntimeFrame_v33(world);

  // Inject into PulseCoreGMemory (live runtime)
  try {
    inst.set("world", "entities",         world.entities);
    inst.set("world", "waves",            world.waves);
    inst.set("world", "meta",             world.meta);
    inst.set("world", "navState",         world.navState);
    inst.set("world", "continuance",      world.continuance);
    inst.set("world", "runtimeFrame",     unifiedRuntime);
    inst.set("world", "predictions",      world.predictions);
    inst.set("world", "oneBandLanes",     world.oneBandLanes);
    inst.set("world", "binaryField",      world.binaryField);

    inst.set("world", "hyperFrame",         world.hyperFrame);
    inst.set("world", "deltaFrame",         world.deltaFrame);
    inst.set("world", "cacheIntegrity",     world.cacheIntegrity);
    inst.set("world", "trustPulse",         world.trustPulse);
    inst.set("world", "shortcutActivation", world.shortcutActivation);

    inst.set("world", "__binaryCacheVersion", CACHE_VERSION);
  } catch {
    return world;
  }

  attachRuntime_v33(world, unifiedRuntime);

  world.flags.worldBinaryEnabled      = true;
  world.flags.worldBinaryCacheVersion = CACHE_VERSION;

  return world;
}

// ============================================================================
//  HIGH-LEVEL CACHE API (USES STORE — NO DUPLICATED STORAGE LOGIC)
// ============================================================================

// Save current world into timeline (normalized first)
export async function snapshotPulseWorld_v33(world) {
  const normalized = applyPulseWorldBinary_v33(world);
  await saveSnapshot(normalized);
  return normalized;
}

// Load latest snapshot and hydrate into live runtime
export async function hydrateLatestPulseWorld_v33() {
  const last = await getLastSnapshot();
  if (!last) return null;

  const hash = generateHash(last.world);
  const verified = (hash === last.hash);

  const world = applyPulseWorldBinary_v33(last.world);
  world.cacheIntegrity = {
    hash,
    verified
  };

  return world;
}

// Boot world: use store’s boot logic, then normalize + inject
export async function bootPulseWorldBinary_v33(initialWorld = {}) {
  const world = await bootPulseWorld_v33(initialWorld);
  return applyPulseWorldBinary_v33(world);
}

// Pull full history (raw snapshots) for inspection / export / GitHub sync
export async function getPulseWorldBinaryHistory_v33() {
  const history = await getPulseWorldHistory_v33();
  return history.map(entry => {
    const hash = generateHash(entry.world);
    return {
      timestamp: entry.timestamp,
      version: entry.version,
      hash,
      verified: hash === entry.hash,
      world: entry.world
    };
  });
}

// Export a specific snapshot by timestamp (for GitHub, logs, etc.)
export async function exportPulseWorldSnapshot_v33(timestamp) {
  const history = await getPulseWorldHistory_v33();
  const match = history.find(h => h.timestamp === timestamp);
  if (!match) return null;

  const hash = generateHash(match.world);
  return {
    timestamp: match.timestamp,
    version: match.version,
    hash,
    verified: hash === match.hash,
    world: match.world
  };
}

// Get a lightweight summary of latest cache for UI / debug panels
export async function getPulseWorldCacheSummary_v33() {
  const last = await getLastSnapshot();
  if (!last) return null;

  const hash = generateHash(last.world);
  return {
    timestamp: last.timestamp,
    version: last.version,
    hash,
    verified: hash === last.hash,
    entitiesCount: Object.keys(safeObj(last.world.entities)).length,
    wavesCount: safeArr(last.world.waves).length,
    meta: safeObj(last.world.meta)
  };
}

export default applyPulseWorldBinary_v33;
