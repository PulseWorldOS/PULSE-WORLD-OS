// PULSE-PROTOCOL-CORE-v33.js
// IMMORTAL v33.0 — Universal Membrane over ProtocolWorld + PulsePort + Page + Ports
// ----------------------------------------------------------------------
//
//  - Attaches to ProtocolWorld (World → Scheduler → Kernel → Runtime → Substrate)
//  - Preserves PulsePort genius (import/export/subimport/organism)
//  - Provides a safe, finite, deterministic membrane surface
//  - Hybrid: world-aware + PulsePort-aware + Page-aware + Ports-aware
//  - PORT is the ultimate expression surface (logs, impulses, timeline, world)
//  - Integrated with PulseWorldAuthority IMMORTAL v33 (mesh/core/experience pace)
// ----------------------------------------------------------------------
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

import { PulseWorldAuthority } from "./PULSE-PROTOCOL-AUTHORITY.js";
import {fs, path as PATH} from "../../PULSE-WORLD-PATH.js";

import { PulseTouchStorageV32 } from "../../../../../PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-STORAGE.js";

console.log("%c⟙ PULSE WORLD PROTOCOL v30.0 — [PulsePortCore] Universal Membrane over ProtocolWorld + PulsePort + Page + Ports Running..",
  "color:#90CAF9; font-weight:bold; font-family:monospace;"
);


const PulseChunks = PulseRealm.PulseChunks || null;
const PulsePresenceNormalizerStore = PulseRealm.PulsePresenceNormalizerStore || null;
const PulseChunkNormalizer = PulseRealm.PulseChunkNormalizer || null;

const PulseFunctionLibrary = PulseRealm.PulseFunctionLibrary || null;

const PulseSecretsLayer = PulseRealm.PulseSecretsLayer || null;   // secure enclave (external)
const PulseOvermind = PulseRealm.PulseOvermind || null;           // execution brain (external)
const PulseApproval = PulseRealm.PulseApproval || null;           // authority organ (external)

const PulseIO = PulseRealm.PulseIO || null;
const PulseBinaryKeyCodec = PulseRealm.PulseBinaryKeyCodec || null;

// Optional: ProtocolPorts / ProtocolPort (if already attached by Authority)
const PulseProtocolPorts = PulseRealm.PulseProtocolPorts || null;
const PulseProtocolPort = PulseRealm.PulseProtocolPort || null;

// ----------------------------------------------------------------------
// META: AI / ORGAN descriptors for this bridge organ
// ----------------------------------------------------------------------

export const AI_EXPERIENCE_META_PulseSignalPort = {
  id: "pulse.signal_port",
  kind: "bridge_organ",
  version: "v33-IMMORTAL++-UNIFIED-BAND",
  role: "pulse_signal_bridge",
  surfaces: {
    band: [
      "signal",
      "module",
      "chunks",
      "memory",
      "secrets_host",
      "kill_switch",
      "runtime_freeze",
      "pulse_signal_key",
      "pulse_io_bridge",
      "binary_key_projection",
      "pulse_port",
      "unified_band",
      "ports_family",
      "world_membrane"
    ],
    wave: ["quiet", "structural", "deterministic"],
    presence: ["signal_port_state"],
    speed: "sync"
  }
};

export const ORGAN_META_PulseSignalPort = {
  id: "organ.pulse.signal_port",
  organism: "PulseWorldOS",
  layer: "bridge.signal_port",
  tier: "IMMORTAL",
  evoFlags: {
    deterministic: true,
    driftProof: true,
    asyncSafe: true,
    zeroPII: true,
    zeroTracking: true,

    moduleAware: true,
    chunkAware: true,
    presenceAware: true,
    warmupAware: true,
    analyticsAware: true,
    predictorAware: true,
    advantageAware: true,

    pulseImportAware: true,
    pulseExportAware: true,
    subimportAware: true,
    tierAware: true,
    registryAware: true,

    secretsHostAware: true,
    killSwitchAware: true,
    runtimeFreezeAware: true,

    pulseSignalKeyAware: true,
    pulseIOAware: true,
    binaryKeyAware: true,
    pulsePortAware: true,
    unifiedBandAware: true,
    deltaMemoryAware: true,
    portsFamilyAware: true,
    worldMembraneAware: true
  }
};

export const ORGAN_CONTRACT_PulseSignalPort = {
  inputs: {
    moduleEnvelope: "Optional pre-normalized module envelope (from Warmup / Chunks)",
    context:
      "Optional context: { page, region, mode, advantage, predictor, analytics, pulseSignalKey, band, bandFamily, dnaTag, meshTag }"
  },
  outputs: {
    PulseImport: "Function: (id: string) => any | null",
    PulseExport: "Function: (id: string, value: any, meta?: object) => void",
    PulseSubimport: "Function: (id: string, subpath: string) => any | null",
    registrySnapshot: "Current module registry snapshot",
    moduleEnvelope: "Normalized module envelope for current page/context",
    secrets: "Secrets host surface: { active, authority, softKill, stripKeys }",
    runtime: "Runtime control surface: { freeze, frozen }",
    signal: "PulseSignalKey bridge surface: { key, source, pulseIO, binary }",
    unifiedBand: "Unified band context: { band, bandFamily, dnaTag, meshTag }",
    deltaMemory: "Delta memory resolver surface",
    portsFamily: "ProtocolPorts family (if present)",
    worldStatus: "Authority/world readiness snapshot"
  },
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true
  }
};

export const IMMORTAL_OVERLAYS_PulseSignalPort = {
  drift: { allowed: false },
  pressure: { expectedLoad: "medium" },
  stability: { semantics: "stable" },
  load: { maxComponents: 1 }
};

// ----------------------------------------------------------------------
// Registry + module envelope handling
// ----------------------------------------------------------------------

const REGISTRY_MAX = 256;

function createRegistry() {
  return {
    modules: {}, // key: moduleId → { exports, imports, meta, ts }
    order: []    // insertion order for trimming
  };
}

function registryKeyFromContext(context = {}) {
  const page = context.page || "PulseWorldReality";
  const region = context.region || "unknown";
  const mode = context.mode || "safe";
  return `${page}::${region}::${mode}`;
}

function trimRegistry(state) {
  const { modules, order } = state;
  if (!order || order.length <= REGISTRY_MAX) return;

  const excess = order.length - REGISTRY_MAX;
  for (let i = 0; i < excess; i++) {
    const key = order[i];
    if (key && modules[key]) {
      delete modules[key];
    }
  }
  state.order = order.slice(excess);
}

function safeNormalize(value, typeHint = null, options = {}) {
  if (!PulseChunkNormalizer || typeof PulseChunkNormalizer.normalizeChunkValue !== "function") {
    return value;
  }
  try {
    return PulseChunkNormalizer.normalizeChunkValue(value, typeHint, options);
  } catch {
    return value;
  }
}

export function unwrapOnce(value) {
  if (!PulseChunkNormalizer || typeof PulseChunkNormalizer.unwrap !== "function") {
    return value;
  }
  try {
    return PulseChunkNormalizer.unwrap(value);
  } catch {
    return value;
  }
}

function normalizeBandIdentity({ band, bandFamily, dnaTag, meshTag }) {
  return {
    band: PulseRealm.ONE_BAND.id,
    bandFamily: bandFamily || "core",
    dnaTag: dnaTag || "binary",
    meshTag: meshTag || null
  };
}

function normalizeBandContext(context = {}) {
  const band = context.band || context.__band || PulseRealm.ONE_BAND.id;
  const bandFamily = context.bandFamily || context.__bandFamily || "core";
  const dnaTag = context.dnaTag || context.__dnaTag || "binary";
  const meshTag = context.meshTag || context.__meshTag || null;

  const normalized = normalizeBandIdentity({ band, bandFamily, dnaTag, meshTag });

  return {
    ...context,
    band: normalized.band,
    bandFamily: normalized.bandFamily,
    dnaTag: normalized.dnaTag,
    meshTag: normalized.meshTag,
    __band: normalized.band,
    __bandFamily: normalized.bandFamily,
    __dnaTag: normalized.dnaTag,
    __meshTag: normalized.meshTag
  };
}

// ----------------------------------------------------------------------
// Module envelope resolution
// ----------------------------------------------------------------------

function normalizeModuleEnvelope(rawEnvelope = {}, context = {}) {
  const page = context.page || rawEnvelope.page || "PulseWorldReality";

  const exportsMeta = rawEnvelope.exportsMeta || rawEnvelope.exports || {};
  const importsMeta = rawEnvelope.importsMeta || rawEnvelope.imports || {};
  const exportTiers = rawEnvelope.exportTiers || {};
  const subimports = rawEnvelope.subimports || {};
  const chunkProfile = rawEnvelope.chunkProfile || null;
  const lineage = rawEnvelope.lineage || null;

  const pulseSignalKey =
    rawEnvelope.pulseSignalKey ||
    context.pulseSignalKey ||
    PulseRealm.PULSE_SIGNAL_KEY ||
    null;

  const tier =
    rawEnvelope.tier ||
    context.tier ||
    rawEnvelope.layer ||
    "default";

  return {
    id: rawEnvelope.id || `module::${page}`,
    page,
    exportsMeta,
    importsMeta,
    exportTiers,
    subimports,
    chunkProfile,
    lineage,
    pulseSignalKey,
    tier,
    ts: 0 // IMMORTAL: no PulseRealm.PulseNOW
  };
}

export function resolveModuleEnvelope(context = {}) {
  const page = context.page || "PulseWorldReality";

  try {
    const cache = PulseRealm.PulseImportWarmupCache || {};
    if (cache && cache[page]) {
      return normalizeModuleEnvelope(cache[page], context);
    }
  } catch {}

  try {
    if (PulseChunks && typeof PulseChunks.getModuleEnvelope === "function") {
      const raw = PulseChunks.getModuleEnvelope(page);
      if (raw) return normalizeModuleEnvelope(raw, context);
    }
  } catch {}

  return normalizeModuleEnvelope({}, context);
}

// ----------------------------------------------------------------------
// Touch storage: registry persistence
// ----------------------------------------------------------------------

const REGISTRY_STORE = "chunks";
const __textEncoder = new TextEncoder();
const __textDecoder = new TextDecoder();

function encodeRegistryKey(key) {
  return __textEncoder.encode(key);
}

function encodeRegistryRecord(record) {
  const json = JSON.stringify(record);
  return __textEncoder.encode(json);
}

function decodeRegistryRecord(binary) {
  if (!binary) return null;
  try {
    const view = binary instanceof Uint8Array ? binary : new Uint8Array(binary);
    const json = __textDecoder.decode(view);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

const __PulseTouchStorage = PulseTouchStorageV32();

async function registryPut(key, record) {
  const k = encodeRegistryKey(key);
  const v = encodeRegistryRecord(record);
  const { ok } = await __PulseTouchStorage.put(REGISTRY_STORE, k, v);
  return ok;
}

async function registryGet(key) {
  const k = encodeRegistryKey(key);
  const { ok, result } = await __PulseTouchStorage.get(REGISTRY_STORE, k);
  if (!ok) return null;
  return decodeRegistryRecord(result);
}

async function registryDelete(key) {
  const k = encodeRegistryKey(key);
  const { ok } = await __PulseTouchStorage.delete(REGISTRY_STORE, k);
  return ok;
}

async function registerModule(state, envelope) {
  if (!state || !state.modules || !state.order || !envelope) return;

  const key = envelope.id;
  if (!key) return;

  if (!state.modules[key]) {
    state.order.push(key);
  }
  const meta = {
    page: envelope.page,
    tier: envelope.tier || "default",
    exportTiers: envelope.exportTiers || {},
    subimports: envelope.subimports || {},
    chunkProfile: envelope.chunkProfile || null,
    lineage: envelope.lineage || null,
    pulseSignalKey: envelope.pulseSignalKey || null,
    ts: envelope.ts || 0
  };
  state.modules[key] = {
    id: key,
    exports: {},
    imports: envelope.importsMeta || {},
    meta
  };
  trimRegistry(state);
  try {
    await registryPut(key, meta);
  } catch {
    // IMMORTAL: never throw from persistence
  }
}

export function getModuleRecord(state, moduleId) {
  if (!state || !state.modules || !moduleId) return null;
  return state.modules[moduleId] || null;
}

// ----------------------------------------------------------------------
// PulseGlobal + function organ builder
// ----------------------------------------------------------------------

function ensurePulseGlobal() {
  if (!PulseRealm.PulseCoreGlobal) PulseRealm.PulseCoreGlobal = {};
  if (!PulseRealm.PulseCoreGlobal.pulseFunctions) PulseRealm.PulseCoreGlobal.pulseFunctions = {};
  if (!PulseRealm.PulseCoreGlobal.secrets) PulseRealm.PulseCoreGlobal.secrets = {};
  if (!PulseRealm.PulseCoreGlobal.runtime) PulseRealm.PulseCoreGlobal.runtime = {};
  if (!PulseRealm.PulseCoreGlobal.signal) PulseRealm.PulseCoreGlobal.signal = {};
  if (!PulseRealm.PulseCoreGlobal.routeMemory) PulseRealm.PulseCoreGlobal.routeMemory = {};
  if (!PulseRealm.PulseCoreGlobal.world) PulseRealm.PulseCoreGlobal.world = {};
  if (!PulseRealm.PulseCoreGlobal.ports) PulseRealm.PulseCoreGlobal.ports = {};
  return PulseRealm.PulseCoreGlobal;
}

export function buildPulseFunctionOrgan(fnId) {
  const PulseCoreGlobal = ensurePulseGlobal();

  if (PulseCoreGlobal.pulseFunctions[fnId]) {
    return PulseCoreGlobal.pulseFunctions[fnId];
  }

  let fn = null;

  try {
    if (PulseFunctionLibrary && typeof PulseFunctionLibrary[fnId] === "function") {
      fn = PulseFunctionLibrary[fnId];
    }
  } catch {}

  try {
    if (!fn && PulseChunks && typeof PulseChunks.getPulseFunction === "function") {
      const candidate = PulseChunks.getPulseFunction(fnId);
      if (typeof candidate === "function") {
        fn = candidate;
      }
    }
  } catch {}

  if (!fn) {
    fn = function inertPulseFunction() {
      return null;
    };
  }

  const organFn = function PulseFunctionWrapper(...args) {
    try {
      return fn(...args);
    } catch {
      return null;
    }
  };

  PulseCoreGlobal.pulseFunctions[fnId] = organFn;
  return organFn;
}

// ----------------------------------------------------------------------
// Fuzzy export resolution + DeltaMemory
// ----------------------------------------------------------------------

export function stringSimilarity(a, b) {
  if (!a || !b) return 0;
  if (a === b) return 1;

  const aSet = new Set(String(a));
  const bSet = new Set(String(b));

  let overlap = 0;
  for (const ch of aSet) {
    if (bSet.has(ch)) overlap++;
  }

  const maxLen = Math.max(aSet.size, bSet.size) || 1;
  return overlap / maxLen;
}

export function resolveExportIdWithFuzzy(record, requestedId, options = {}) {
  const { minScore = 0.8 } = options;

  if (!record || !record.exports || !requestedId) {
    return { id: null, score: 0, exact: false };
  }

  const keys = Object.keys(record.exports);
  if (keys.length === 0) {
    return { id: null, score: 0, exact: false };
  }

  if (record.exports[requestedId]) {
    return { id: requestedId, score: 1, exact: true };
  }

  let bestId = null;
  let bestScore = 0;

  for (const key of keys) {
    const score = stringSimilarity(requestedId, key);
    if (score > bestScore) {
      bestScore = score;
      bestId = key;
    }
  }

  if (bestScore >= minScore && bestId) {
    return { id: bestId, score: bestScore, exact: false };
  }

  return { id: null, score: bestScore, exact: false };
}

const DeltaMemory = Object.freeze({
  cache: Object.create(null)
});

function computeModuleHashFromRecord(record) {
  if (!record) return "null";
  const exports = record.exports || {};
  const names = Object.keys(exports).sort();
  return JSON.stringify(names);
}

export const DeltaMemoryResolver_v50 = {
  resolveExportForModule(state, moduleId, tester) {
    const record = getModuleRecord(state, moduleId);
    if (!record) return { exportId: null };

    const hash = computeModuleHashFromRecord(record);
    const cached = DeltaMemory.cache[moduleId];

    if (cached && cached.hash === hash && record.exports[cached.exportName]) {
      return { exportId: cached.exportName };
    }

    const candidates = Object.keys(record.exports || {});
    for (const exportName of candidates) {
      const entry = record.exports[exportName];
      if (!entry) continue;

      const value = entry.value;
      if (typeof tester === "function") {
        try {
          const ok = tester(value, exportName, record);
          if (!ok) continue;
        } catch {
          continue;
        }
      }

      DeltaMemory.cache[moduleId] = { hash, exportName };
      return { exportId: exportName };
    }

    delete DeltaMemory.cache[moduleId];
    return { exportId: null };
  },

  clearForModule(moduleId) {
    if (!moduleId) return;
    delete DeltaMemory.cache[moduleId];
  },

  clearAll() {
    for (const k of Object.keys(DeltaMemory.cache)) {
      delete DeltaMemory.cache[k];
    }
  }
};

// ----------------------------------------------------------------------
// Preloading / warmup
// ----------------------------------------------------------------------

async function preloadModuleExports(state, moduleId) {
  const record = getModuleRecord(state, moduleId);
  if (!record) return false;

  try {
    if (typeof record.warmup === "function") {
      await record.warmup();
    }
  } catch {}

  try {
    const exports = record.exports || {};
    for (const key of Object.keys(exports)) {
      const entry = exports[key];
      if (!entry) continue;

      const v = entry.value;

      if (typeof v === "function") {
        void v;
      }

      if (v && typeof v === "object") {
        for (const subKey of Object.keys(v)) {
          try {
            void v[subKey];
          } catch {}
        }
      }
    }
  } catch {}

  try {
    if (record.exportTiers) {
      for (const tierName of Object.keys(record.exportTiers)) {
        const tierList = record.exportTiers[tierName] || [];
        for (const t of tierList) {
          void t;
        }
      }
    }
  } catch {}

  try {
    if (record.lineage) {
      void record.lineage;
    }
  } catch {}

  return true;
}

async function preloadAllModules(state, options = {}) {
  const modules = Object.values(state.modules || {});
  if (!modules.length) return false;

  const {
    mode = "auto",
    firstTier = "core",
    maxParallel = Infinity
  } = options;

  const core = [];
  const rest = [];

  for (const mod of modules) {
    const metaTier = mod.meta.tier || mod.meta.layer || "default";
    if (metaTier === firstTier) core.push(mod);
    else rest.push(mod);
  }

  for (const mod of core) {
    try {
      await preloadModuleExports(state, mod.id);
    } catch {}
  }

  const remaining = rest.slice();

  if (mode === "sequential") {
    for (const mod of remaining) {
      try {
        await preloadModuleExports(state, mod.id);
      } catch {}
    }
    return true;
  }

  const parallelLimit = Number.isFinite(maxParallel)
    ? Math.max(1, maxParallel)
    : remaining.length;

  let index = 0;
  async function worker() {
    while (index < remaining.length) {
      const mod = remaining[index++];
      try {
        await preloadModuleExports(state, mod.id);
      } catch {}
    }
  }

  const workers = [];
  for (let i = 0; i < parallelLimit; i++) {
    workers.push(worker());
  }

  await Promise.all(workers);
  return true;
}

export function createOrganismPreloader(state) {
  return {
    preloadAll(options = {}) {
      return preloadAllModules(state, { mode: "auto", ...options });
    },
    preloadSequential(options = {}) {
      return preloadAllModules(state, { mode: "sequential", ...options });
    },
    preloadParallel(options = {}) {
      return preloadAllModules(state, { mode: "parallel", ...options });
    }
  };
}

// ----------------------------------------------------------------------
// Registry snapshot
// ----------------------------------------------------------------------

export function registrySnapshot(state) {
  const out = {};
  const modules = state.modules || {};

  for (const key of Object.keys(modules)) {
    const rec = modules[key];
    if (!rec) continue;

    out[key] = {
      exports: Object.keys(rec.exports || {}),
      imports: rec.imports || {},
      meta: rec.meta || {}
    };
  }
  return out;
}

// ----------------------------------------------------------------------
// CORE SURFACE: integrate with PulseWorldAuthority IMMORTAL v33
// ----------------------------------------------------------------------

// Single shared registry state for this core membrane
const CORE_REGISTRY_STATE = createRegistry();

// Preloader bound to this registry
const CORE_PRELOADER = createOrganismPreloader(CORE_REGISTRY_STATE);

// Authority status helper
function getAuthorityStatus() {
  try {
    if (typeof PulseWorldAuthority.status === "function") {
      return PulseWorldAuthority.status();
    }
  } catch {}
  return null;
}

// World/ports binding helpers (symbolic, no hard dependency)
function bindWorldSurface(worldSurface) {
  const PulseCoreGlobal = ensurePulseGlobal();
  PulseCoreGlobal.world.surface = worldSurface || null;
}

function bindPortsFamily(portsFamily) {
  const PulseCoreGlobal = ensurePulseGlobal();
  PulseCoreGlobal.ports.family = portsFamily || null;
}

// If Authority already attached ports/world, bind them softly
try {
  if (PulseProtocolPorts) {
    bindPortsFamily(PulseProtocolPorts);
  }
  if (PulseRealm.PulseWorld && typeof PulseRealm.PulseWorld === "object") {
    bindWorldSurface(PulseRealm.PulseWorld);
  }
} catch {}

// Core surface: what we expose as "PulseCore" via Authority
export const PulseProtocolCore = {
  meta: {
    id: "core.pulse.protocol",
    tier: "IMMORTAL",
    layer: "core.membrane",
    organism: "PulseWorldOS",
    version: "v33-IMMORTAL++"
  },
  state: CORE_REGISTRY_STATE,
  preloader: CORE_PRELOADER,

  // Registry / module envelope
  resolveModuleEnvelope,
  normalizeBandContext,
  registryKeyFromContext,
  registerModule,
  getModuleRecord,
  registrySnapshot,

  // Pulse function organs
  buildPulseFunctionOrgan,
  DeltaMemoryResolver_v50,

  // Meta descriptors
  AI_EXPERIENCE_META_PulseSignalPort,
  ORGAN_META_PulseSignalPort,
  ORGAN_CONTRACT_PulseSignalPort,
  IMMORTAL_OVERLAYS_PulseSignalPort,

  // Authority / world / ports helpers
  authorityStatus: getAuthorityStatus,
  bindWorldSurface,
  bindPortsFamily
};

// Attach this core surface into the world via Authority
try {
  PulseWorldAuthority.attachCore(PulseProtocolCore);
} catch {
  // IMMORTAL: core must never throw on attach
}

// Also expose Authority alias for compatibility
export const PulseProtocolAuthority = PulseWorldAuthority;

export default PulseProtocolCore;


PulseRealm.ProtocolCore = {
  PulseProtocolCore,
  // Registry / module envelope
  resolveModuleEnvelope,
  normalizeBandContext,
  registryKeyFromContext,
  registerModule,
  getModuleRecord,
  registrySnapshot,

  // Pulse function organs
  buildPulseFunctionOrgan,
  DeltaMemoryResolver_v50,

  // Meta descriptors
  AI_EXPERIENCE_META_PulseSignalPort,
  ORGAN_META_PulseSignalPort,
  ORGAN_CONTRACT_PulseSignalPort,
  IMMORTAL_OVERLAYS_PulseSignalPort,

  // Authority / world / ports helpers
  authorityStatus: getAuthorityStatus,
  bindWorldSurface,
  bindPortsFamily
}

PulseRealm.PulseProtocolCore = PulseProtocolCore;
PulseRealm.PulseCorePort = PulseProtocolCore;