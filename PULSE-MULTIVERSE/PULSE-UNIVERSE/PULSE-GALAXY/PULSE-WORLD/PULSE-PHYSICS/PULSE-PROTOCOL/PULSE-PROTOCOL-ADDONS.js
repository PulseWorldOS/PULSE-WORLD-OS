// ============================================================================
//  PULSE-PROTOCOL-ADDONS-v33.js
//  IMMORTAL v33.0 — Protocol Addons Registry + Loader (world-layer, ports-aware)
//  Two-state evolution model: EVOLVING (camelCase + vNN) or FINAL (ALL-CAPS)
// ============================================================================
//
//  ROLE:
//    - Central registry for all Protocol-level addons.
//    - Addons extend Ports, ProtocolPulse, and world-layer behavior.
//    - This sits beside PULSE-PROTOCOL-PORTS and is injected into Ports,
//      never the other way around.
//
//  ADDON SHAPE (convention, not enforced):
//    {
//      id: "addon.id",
//      version: "v33",
//      role: "description",
//      tier: "world" | "system" | "experimental" | ...,
//      enabled: true,
//      meta: { ... },
//      attach(ports, addons) { ... },   // optional: extend ports
//      init(context) { ... },           // optional: warm/init
//      api: { ... }                     // optional: exposed surface
//    }
//
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

import { PulseTrustCreatorFlagsMeta } from "../PULSE-TRUST/PulseTrustCreatorFlags-v33.js";

// ------------------------------------------------------------
// Soft global (optional)
// ------------------------------------------------------------

// Optional: TrustCore presence (conceptual anchoring only)
const PulseWorldTrustCore =
  PulseRealm.PulseWorldTrustCore || null;

// ------------------------------------------------------------
// Internal registry (id -> { id, factory, instance, meta, enabled })
// ------------------------------------------------------------
const __AddonRegistry = new Map();

// Small helper: safe log
function logAddon(level, msg, ...rest) {
  try {
    PulseRealm.PulseLog(
  "signal",`[PulseProtocolAddons] ${msg}`, ...rest);
  } catch {}
}

function normalizeId(id) {
  return String(id || "").trim();
}

// ------------------------------------------------------------
// Core registry operations
// ------------------------------------------------------------

/**
 * registerAddon(id, factoryOrInstance, meta?)
 *
 * - id: string (unique)
 * - factoryOrInstance:
 *     - function: (context) => instance
 *     - object: already-instantiated addon
 * - meta: optional symbolic metadata
 *
 * meta fields:
 *   - version: "v33" (string)
 *   - role: "description"
 *   - tier: "world" | "system" | ...
 *   - enabled: boolean (default true)
 */
export function registerAddon(id, factoryOrInstance, meta = {}) {
  const normalizedId = normalizeId(id);
  if (!normalizedId || !factoryOrInstance) return;

  const entry = {
    id: normalizedId,
    factory: typeof factoryOrInstance === "function" ? factoryOrInstance : null,
    instance:
      typeof factoryOrInstance === "function" ? null : factoryOrInstance,
    meta: {
      version: meta.version || "v33",
      role: meta.role || "addon",
      tier: meta.tier || "world",
      enabled:
        typeof meta.enabled === "boolean" ? meta.enabled : true,
      ...meta
    }
  };

  __AddonRegistry.set(normalizedId, entry);
  logAddon("log", `Registered addon "${normalizedId}"`, entry.meta);
}

/**
 * hasAddon(id) → boolean
 */
export function hasAddon(id) {
  const normalizedId = normalizeId(id);
  if (!normalizedId) return false;
  return __AddonRegistry.has(normalizedId);
}

/**
 * enableAddon(id, flag = true)
 */
export function enableAddon(id, flag = true) {
  const normalizedId = normalizeId(id);
  if (!normalizedId) return;

  const entry = __AddonRegistry.get(normalizedId);
  if (!entry) return;

  entry.meta.enabled = !!flag;
}

/**
 * getAddon(id, context?) → instance | null
 *
 * Lazily instantiates factory-based addons with the provided context:
 *   { ports, addons, env, G }
 */
export function getAddon(id, context = {}) {
  const normalizedId = normalizeId(id);
  if (!normalizedId) return null;
  const PulseGlobalNow = PulseRealm.PulseGlobalNow;
  const entry = __AddonRegistry.get(normalizedId);
  if (!entry) return null;

  if (entry.meta && entry.meta.enabled === false) {
    return null;
  }

  if (!entry.instance && entry.factory) {
    const ctx = {
      PulseGlobalNow,
      env: (typeof process !== "undefined" && process.env) || {},
      ports: context.ports || null,
      addons: context.addons || null,
      context
    };

    try {
      entry.instance = entry.factory(ctx) || null;
      if (entry.instance && typeof entry.instance === "object") {
        // Optional: attach id/meta onto instance for introspection
        if (!entry.instance.id) entry.instance.id = normalizedId;
        if (!entry.instance.meta) entry.instance.meta = entry.meta;
      }
      logAddon("log", `Instantiated addon "${normalizedId}"`);
    } catch (err) {
      logAddon("error", `Failed to instantiate addon "${normalizedId}"`, err);
      entry.instance = null;
    }
  }

  return entry.instance;
}

/**
 * listAddons(filterFn?) → { id, meta, enabled }[]
 *
 * filterFn(entry) → boolean (optional)
 */
export function listAddons(filterFn = null) {
  const out = [];
  for (const entry of __AddonRegistry.values()) {
    if (typeof filterFn === "function" && !filterFn(entry)) continue;
    out.push({
      id: entry.id,
      meta: entry.meta || {},
      enabled: entry.meta.enabled !== false
    });
  }
  return out;
}

/**
 * getAllAddonInstances(context?) → { [id]: instance }
 */
export function getAllAddonInstances(context = {}) {
  const addons = {};
  for (const entry of __AddonRegistry.values()) {
    if (entry.meta && entry.meta.enabled === false) continue;
    const instance = getAddon(entry.id, {
      ...context,
      addons
    });
    if (instance) {
      addons[entry.id] = instance;
    }
  }
  return addons;
}

// ------------------------------------------------------------
// World-layer attach / warm helpers
// ------------------------------------------------------------

/**
 * attachAllAddons(ports) → { ports, addons }
 *
 * - ports: the ProtocolPorts object (from PULSE-PROTOCOL-PORTS.js)
 * - returns:
 *     {
 *       ports,              // same reference
 *       addons: { [id]: instance }
 *     }
 *
 * For each addon:
 *   - instantiates it (if factory)
 *   - calls addon.attach(ports, addons) if present
 */
export function attachAllAddons(ports) {
  const addons = getAllAddonInstances({ ports });

  for (const [id, instance] of Object.entries(addons)) {
    try {
      if (typeof instance.attach === "function") {
        instance.attach(ports, addons);
        logAddon("log", `attach() completed for addon "${id}"`);
      }
    } catch (err) {
      logAddon("error", `attach() failed for addon "${id}"`, err);
    }
  }

  return { ports, addons };
}

/**
 * warmAllAddons(ports, options?) → { addons }
 *
 * Calls addon.init(context) if present.
 */
export async function warmAllAddons(ports, options = {}) {
  const addons = {};
  const PulseGlobalNow = PulseRealm.PulseGlobalNow;
  const contextBase = {
    PulseGlobalNow,
    ports,
    options
  };

  for (const entry of __AddonRegistry.values()) {
    if (entry.meta && entry.meta.enabled === false) continue;

    const instance = getAddon(entry.id, {
      ports,
      addons,
      options
    });
    if (!instance) continue;

    addons[entry.id] = instance;

    if (typeof instance.init === "function") {
      try {
        const ctx = { ...contextBase, addonId: entry.id, addon: instance };
        const maybePromise = instance.init(ctx);
        if (maybePromise && typeof maybePromise.then === "function") {
          await maybePromise;
        }
        logAddon("log", `init() completed for addon "${entry.id}"`);
      } catch (err) {
        logAddon("error", `init() failed for addon "${entry.id}"`, err);
      }
    }
  }

  // Optional: let TrustCore observe that addons have been warmed
  try {
    if (
      PulseWorldTrustCore &&
      typeof PulseWorldTrustCore.snapshotTrustCore === "function"
    ) {
      void PulseWorldTrustCore.snapshotTrustCore();
    }
  } catch {}

  return { addons };
}

// ------------------------------------------------------------
/**
 * getAddonApi(id, context?) → addon.api | null
 */
export function getAddonApi(id, context = {}) {
  const instance = getAddon(id, context);
  if (!instance || typeof instance !== "object") return null;
  return instance.api || null;
}


// ------------------------------------------------------------
// Export the protocol-facing Addons surface
// ------------------------------------------------------------
export const PulseProtocolAddons = {
  register: registerAddon,
  has: hasAddon,
  enable: enableAddon,
  get: getAddon,
  api: getAddonApi,
  list: listAddons,
  all: getAllAddonInstances,
  attachAll: attachAllAddons,
  warmAll: warmAllAddons
};

export default PulseProtocolAddons;

PulseRealm.ProtocolAddons = {
  PulseProtocolAddons,
  getAddonApi,
  warmAllAddons,
  attachAllAddons,
  getAllAddonInstances,
  listAddons,
  getAddon,
  enableAddon,
  hasAddon,
  registerAddon,
  PulseWorldTrustCore
}