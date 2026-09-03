
// PULSE-PROTOCOL-SIGNAL-v39.js
// IMMORTAL SYNC — SIGNAL + FINALITY + WORLDPORT + REGISTRY (ESM + DYNAMIC IMPORTS, PURE RELATIVE)
import { createEmailTransport,PulseWorldEmailAlert } from "../X-PULSE-X/3RDPARTY/PulseWorldEmailAlert-v20.js";
import { getStripe } from "../X-PULSE-X/3RDPARTY/PULSE-WORLD-BANK.js";
import { db, checkWorldDataHealth,PulseWorldFirebaseGenome } from "../X-PULSE-X/3RDPARTY/PulseWorldFirebaseGenome-v30.js";
import { PulseWorldExpressMiddleLayer } from "../X-PULSE-X/3RDPARTY/PULSE-WORLD-TRANSPORT.js";
import { PulseWorldCompiler } from "../X-PULSE-X/3RDPARTY/PULSE-WORLD-COMPILER.js";
import { PulseWorldBank_v31 as PulseWorldBank } from "../X-PULSE-X/3RDPARTY/PULSE-WORLD-BANK.js";
import { buildSMSImmortalEnvelope as PulseWorldSMSAlert } from "../../PULSE-PHYSICS/X-PULSE-X/3RDPARTY/PulseWorldSMSAlert-v30.js";
import { fs,path } from "../../PULSE-WORLD-PATH.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

console.log(
  "%c⟙ PULSE WORLD PROTOCOL v30.0 — [PulseSignal] Single Most Understood Organ that Speaks For Everything/Nothing! ;) I'm the Tasty part of the Secret Sauce!",
  "color:#90CAF9; font-weight:bold; font-family:monospace;"
);
function __normalizeCanonicalSignal(s) {
  if (!s || typeof s !== "object") s = {};

  return {
    id: s.id ?? "Pulse",
    type: s.type ?? "UPDATE",
    source: s.source ?? "PulseSignals",
    layer: s.layer ?? "PULSEWORLD",
    time: s.time ?? PulseRealm.PulseNOW,

    network: {
      bars: s.network?.bars ?? 0,
      route: s.network?.route ?? "Primary",
      band: s.network?.band ?? "Unknown",
      via: s.network?.via ?? "Unknown",
      internetRole: s.network?.internetRole ?? "Unknown",
      season: s.network?.season ?? "Unknown",
      nextWindow: s.network?.nextWindow ?? "Unknown"
    },

    device: {
      bars: s.device?.bars ?? s.network?.bars ?? 0
    },

    stability: {
      score: s.stability?.score ?? 0
    },

    latency: {
      ms: s.latency?.ms ?? 0
    },

    micro: {
      phase: s.micro?.phase ?? "Idle"
    },

    sync: {
      ageLabel: s.sync?.ageLabel ?? "Just now"
    },

    efficiency: {
      label: s.efficiency?.label ?? "Balanced"
    },

    health: {
      label: s.health?.label ?? "Excellent"
    },

    advantage: {
      multiplier: s.advantage?.multiplier ?? 1,
      percent: s.advantage?.percent ?? 0
    },

    orbital: {
      season: s.orbital?.season ?? "Unknown",
      nextContactWindow: s.orbital?.nextContactWindow ?? "Unknown"
    },

    state: s.state ?? "Active",
    phase: s.phase ?? "Idle"
  };
}

// ============================================================================
// PULSE SIGNALS V36 — IMMORTAL ORGAN, CREATES & MAINTAINS __PULSE_LAST_SIGNAL__
// ============================================================================
(function initPulseSignalsV36() {
  if (PulseRealm.PulseSignals) return; // already initialized

  // ============================================================
  // INTERNAL STATE (EXPANDED)
  // ============================================================
  const _timeline   = [];
  const _listeners  = {};          // eventName → [fn]
  const _observers  = [];          // global observers
  const _subscribers = [];         // 🔥 SUBSCRIBE TARGETS
  const _last       = {};          // eventName → last payload
  const _state      = {};          // domain → state object
  const _meta = {
    version: 36,
    surfaces: [
      "ProtocolSignalPort",
      "PulsePort.Global",
      "PulseSignals",
      "__PULSE_LAST_SIGNAL__"
    ],
    bootTime: PulseRealm.PulseNOW
  };

  // ============================================================
  // MERGE ENGINE FOR LAST_SIGNAL
  // ============================================================
  function __mergeLastSignal(prev, incoming) {
    const p = __normalizeCanonicalSignal(prev);
    const i = __normalizeCanonicalSignal(incoming);

    return __normalizeCanonicalSignal({
      ...p,
      ...i,

      network: {
        ...p.network,
        ...i.network
      },

      device: {
        ...p.device,
        ...i.device
      },

      stability: {
        ...p.stability,
        ...i.stability
      },

      latency: {
        ...p.latency,
        ...i.latency
      },

      micro: {
        ...p.micro,
        ...i.micro
      },

      sync: {
        ...p.sync,
        ...i.sync
      },

      efficiency: {
        ...p.efficiency,
        ...i.efficiency
      },

      health: {
        ...p.health,
        ...i.health
      },

      advantage: {
        ...p.advantage,
        ...i.advantage
      },

      orbital: {
        ...p.orbital,
        ...i.orbital
      }
    });
  }


  // ============================================================
  // TIMELINE APPEND (EXPANDED)
  // ============================================================
  function append(event, payload) {
    try {
      _timeline.push({
        event,
        payload,
        ts: PulseRealm.PulseNOW
      });

      if (_timeline.length > 5000) {
        _timeline.splice(0, 2500);
      }
    } catch {}
  }

  // ============================================================
  // EMIT (MAIN SIGNAL DISPATCH)
  // ============================================================
  function emit(event, payload) {
    try {
      _last[event] = payload;
      append(event, payload);

      // 🔥 FULL CANONICAL MERGE
      try {
        const merged = __mergeLastSignal(PulseRealm.__PULSE_LAST_SIGNAL__, {
          id:     payload.id     || event,
          type:   payload.type   || "UPDATE",
          source: payload.source || "PulseSignals",
          layer:  payload.layer  || "PULSEWORLD",
          time:   payload.time   || PulseRealm.PulseNOW,
          ...payload
        });

        PulseRealm.__PULSE_LAST_SIGNAL__ = merged;
      } catch {}

      // listeners
      const arr = _listeners[event];
      if (arr && arr.length) {
        for (const fn of arr) {
          try { fn(payload); } catch {}
        }
      }

      // observers
      for (const obs of _observers) {
        try { obs(event, payload); } catch {}
      }

      // 🔥 subscribers get FULL canonical signal
      if (_subscribers.length) {
        const packet = { state: PulseRealm.__PULSE_LAST_SIGNAL__ };
        for (const sub of _subscribers) {
          try { sub(packet); } catch {}
        }
      }

    } catch {}
  }


  // ============================================================
  // ON (REGISTER LISTENER)
  // ============================================================
  function on(event, fn) {
    if (typeof fn !== "function") return;
    if (!_listeners[event]) _listeners[event] = [];
    _listeners[event].push(fn);
  }

  // ============================================================
  // OBSERVE (GLOBAL OBSERVER)
  // ============================================================
  function observe(fn) {
    if (typeof fn === "function") {
      _observers.push(fn);
    }
  }

  // ============================================================
  // SUBSCRIBE (GLOBAL SNAPSHOT SUBSCRIPTION)
// ============================================================
  function subscribe(fn) {
    if (typeof fn !== "function") return;
    _subscribers.push(fn);

    // immediately push current snapshot if it exists
    try {
      if (PulseRealm.__PULSE_LAST_SIGNAL__) {
        fn({ state: PulseRealm.__PULSE_LAST_SIGNAL__ });
      }
    } catch {}
  }

  // ============================================================
  // STATE ENGINE (NEW)
  // ============================================================
  function setState(domain, value) {
    if (!domain) return;
    _state[domain] = { ...(value || {}) };
    emit(`state:${domain}`, _state[domain]);
  }

  function mergeState(domain, value) {
    if (!domain) return;
    const prev = _state[domain] || {};
    _state[domain] = { ...prev, ...(value || {}) };
    emit(`state:${domain}`, _state[domain]);
  }

  function getState(domain) {
    return domain ? (_state[domain] || {}) : { ..._state };
  }

  // ============================================================
  // SNAPSHOT (CANONICAL, MULTI-SURFACE)
  // ============================================================
  function snapshot() {
    try {
      return {
        meta: { ..._meta },
        last: { ..._last },
        timeline: _timeline.slice(0),
        state: { ..._state },
        external: {
          protocol: ProtocolSignalPort?.getSnapshot?.() || null,
          global: PulseRealm.PulsePort?.Global?.signal || null,
          legacy: PulseRealm.PulseSignals?.getState?.() || null,
          fallback: PulseRealm.__PULSE_LAST_SIGNAL__ || null
        }
      };
    } catch {
      return {
        meta: { ..._meta },
        last: {},
        timeline: [],
        state: {},
        external: {}
      };
    }
  }

  // ============================================================
  // PUBLIC API (EXPANDED)
  // ============================================================
  const PulseSignals = {
    emit,
    on,
    observe,
    subscribe,   // 🔥 HERE
    snapshot,

    state: {
      set: setState,
      merge: mergeState,
      get: getState
    },

    timeline: {
      append,
      load() {
        try { return _timeline.slice(0); }
        catch { return []; }
      }
    },

    meta: _meta
  };

  PulseRealm.PulseSignals = PulseSignals;

  // ============================================================
  // BOOT (UNCHANGED)
  // ============================================================
  queueMicrotask(() => {
    PulseRealm.PulseFinalityPort.boot();
  });

})();


// ============================================================================
// FINALITY PORT
// ============================================================================
export const FinalityPort = {
  __ports: new Map(),
  __booted: false,

  async boot() {
    if (this.__booted) return;
    this.__booted = true;

    PulseRealm.PulseLog(
      "signal",
      `[PulseFinalityPort] Boot Complete (IMMORTAL TAG, ASYNC DISPATCH, ESM)`
    );
  },

  port(name) {
    return this.__ports.get(name);
  },

  Ports(name) {
    return this.__ports.get(name);
  },

  async dispatch(channel, fn, context = {}) {
    const normalizedChannel = String(channel || "unknown").trim();

    try {
      const envelope = {
        channel: normalizedChannel,
        context,
        version: "v39-IMMORTAL",
        ts: PulseRealm.PulseNOW
      };

      const result = await fn(envelope);

      if (!context.__merged && SignalMirrorPolicy.enableFinalityMirror) {
        try {
          const port = PulseSignalPort.for("FinalityPort");
          port.emit(normalizedChannel, { envelope, result, __mirror: true });
        } catch {}
      }

      return result;
    } catch (err) {
      try {
        PulseRealm.PulseError(
          "signal",
          `[FinalityPort v39] Dispatch Error on channel "${channel}"`,
          err
        );
      } catch {}
      throw err;
    }
  }
};

// ---------------------------------------------------------------------------
// SOFT GLOBALS / OPTIONAL ORGANS
// ---------------------------------------------------------------------------
let PATH_ORGAN = null;
let PATH_pulseNetPortHandler = null;

const C_ID   = "color:#FFFF9C; font-weight:bold; font-family:monospace;";
const C_OK   = "color:#00FF9C; font-family:monospace;";
const C_INFO = "color:#E8F8FF; font-family:monospace;";
const C_WARN = "color:#FFE066; font-family:monospace;";
const C_ERR  = "color:#FF3B3B; font-weight:bold; font-family:monospace;";

export function onRequest(config, handler) {
  return async function(request) {
    const req = {
      method: request.method || "GET",
      query: request.query || {},
      body: request.body || {}
    };

    const res = {
      status(code) {
        this._status = code;
        return this;
      },
      json(obj) {
        return { status: this._status || 200, body: obj };
      }
    };

    return handler(req, res);
  };
}

export function onCall(handler) {
  return async function(input) {
    try {
      return await handler(input);
    } catch (err) {
      return { success: false, error: String(err.message || err) };
    }
  };
}

function onSchedule(input, handler) {
  const ms = parseScheduleInterval(input);
  setInterval(() => handler({ time: PulseRealm.PulseNOW }), ms);
}

function parseScheduleInterval(str) {
  str = str.toLowerCase().trim();

  if (str.startsWith("every")) str = str.replace("every", "").trim();

  if (str.includes("second")) return 1000 * parseInt(str);
  if (str.includes("minute")) return 1000 * 60 * parseInt(str);
  if (str.includes("hour"))   return 1000 * 60 * 60 * parseInt(str);

  return 60000;
}

export const deleteField = () => ({ nullValue: null });

const PulseChunks = PulseRealm.PulseChunks || null;
const PulsePresenceNormalizerStore = PulseRealm.PulsePresenceNormalizerStore || null;
const PulseChunkNormalizer = PulseRealm.PulseChunkNormalizer || null;

const PulseFunctionLibrary = PulseRealm.PulseFunctionLibrary || null;

const PulseSecretsLayer = PulseRealm.PulseSecretsLayer || null;
const PulseOvermind = PulseRealm.PulseOvermind || null;
const PulseApproval = PulseRealm.PulseApproval || null;

const PulseIO = PulseRealm.PulseIO || null;
const PulseBinaryKeyCodec = PulseRealm.PulseBinaryKeyCodec || null;

const PulseWorldTrustCore =
  PulseRealm.PulseWorldTrustCore || null;

// ---------------------------------------------------------------------------
// MIRROR POLICY
// ---------------------------------------------------------------------------
const SignalMirrorPolicy = (() => {
  const base = {
    enableFinalityMirror: true,
    maxMergedBurst: 1024
  };

  if (PulseRealm.PulseSignalMirrorPolicy && typeof PulseRealm.PulseSignalMirrorPolicy === "object") {
    return {
      ...base,
      ...PulseRealm.PulseSignalMirrorPolicy
    };
  }

  return base;
})();

// ---------------------------------------------------------------------------
// EVOLUTION-AWARE IMPORT RESOLVER (ESM, DYNAMIC IMPORT, PURE RELATIVE)
// ---------------------------------------------------------------------------
const EVOLUTION_MIN_VERSION = 20;
const EVOLUTION_CURRENT_VERSION = 33;

function splitPath(filePath) {
  const idx = filePath.lastIndexOf("/");
  if (idx === -1) {
    return { dir: "", base: filePath };
  }
  return {
    dir: filePath.slice(0, idx + 1),
    base: filePath.slice(1 + idx)
  };
}

function stripJsExt(base) {
  return base.endsWith(".js") ? base.slice(0, -3) : base;
}

function isAllCapsName(nameWithoutExt) {
  return nameWithoutExt === nameWithoutExt.toUpperCase();
}


const PulseWorldPath = {
  routes: new Map(),

  registerRoute(key, handler) {
    this.routes.set(key, handler);
  },

  resolve(key) {
    return this.routes.get(key) || null;
  },

  async handleRequest(req, res, context = {}) {
    const key = (req.params && req.params.route) || req.path || "/";
    const handler = this.resolve(key);
    if (typeof handler === "function") {
      return handler(req, res, context);
    }
    return res.status(404).json({ error: "Route Not Found" });
  }
};

// function pulseNetPortHandler(req, res, context = {}) {
//   return PulseWorldPath.handleRequest(req, res, context);
// }

// const PulseWorldCompiler = {
//   async handleCompilerEvent(event) {
//     return { ok: true, event };
//   }
// };

// const PulseWorldBank = {
//   getStripe() {
//     return {
//       async verifySignature(rawBody, headers, secret) {
//         return { valid: true, eventObj: { rawBody, headers, secret } };
//       }
//     };
//   },

//   async verifyStripeSignature({ rawBody, headers, stripe }) {
//     const secret = headers["stripe-signature"] || null;
//     const result = await stripe.verifySignature(rawBody, headers, secret);
//     return {
//       valid: !!result.valid,
//       eventObj: result.eventObj || null
//     };
//   },

//   async handleStripeWebhook(event) {
//     return { ok: true, event };
//   }
// };

// const PulseWorldEmailAlert = {
//   async sendAlert(payload) {
//     return { ok: true, payload };
//   }
// };

// const PulseWorldFirebaseGenome = {
//   async handleFirebaseEvent(event) {
//     return { ok: true, event };
//   }
// };

// const PulseWorldSMSAlert = {
//   async handleTwilioEvent(event) {
//     return { ok: true, event };
//   }
// };

// ---------------------------------------------------------------------------
// VIRTUAL FILESYSTEM (PulseVFS)
// ---------------------------------------------------------------------------
export const PulseVFS = {
  "../../../PULSE-WORLD/PULSE-WORLD-PATH.js": {
    get PulseWorldPath() { return typeof PulseWorldPath !== "undefined" ? PulseWorldPath : globalThis.PulseRealm?.PulseWorldPath; },
    get fs() { return typeof fs !== "undefined" ? fs : null; },
    get path() { return typeof path !== "undefined" ? path : null; }
  },

  get "../../PULSE-PHYSICS/X-PULSE-X/3RDPARTY/PULSE-WORLD-COMPILER.js"() {
    return PulseWorldCompiler;
  },

  get "../../PULSE-PHYSICS/X-PULSE-X/3RDPARTY/PULSE-WORLD-BANK.js"() {
    return PulseWorldBank;
  },

  get "../../PULSE-PHYSICS/X-PULSE-X/3RDPARTY/PulseWorldEmailAlert-v20.js"() {
    return PulseWorldEmailAlert;
  },

  get "../../PULSE-PHYSICS/X-PULSE-X/3RDPARTY/PulseWorldFirebaseGenome-v30.js"() {
    return PulseWorldFirebaseGenome;
  },

  get "../../PULSE-PHYSICS/X-PULSE-X/3RDPARTY/PulseWorldSMSAlert-v30.js"() {
    return PulseWorldSMSAlert;
  }
};


// ---------------------------------------------------------------------------
// OVERRIDDEN EVOLUTION IMPORT (USES VFS INSTEAD OF REAL FS)
// ---------------------------------------------------------------------------
async function evolutionImport(filePath) {
  if (!filePath) return null;

  const basePath = filePath.endsWith(".js") ? filePath : `${filePath}.js`;

  if (PulseVFS[basePath]) {
    return PulseVFS[basePath];
  }

  PulseRealm.PulseError("signal", "[PulseVFS] Missing virtual file:", basePath);
  throw new PulseRealm.PulseError("signal", "PulseVFS: File not found: " + basePath);
}

// ---------------------------------------------------------------------------
// ONE-PULSE MERGE ENGINE
// ---------------------------------------------------------------------------
const __PulseSignalPortRegistry = new Map();

export const __PulseMergedState = {
  last: null,
  pending: [],
  scheduled: false,

  add(raw) {
    if (!raw) return;

    if (this.pending.length >= SignalMirrorPolicy.maxMergedBurst) {
      this.pending.splice(
        0,
        this.pending.length - SignalMirrorPolicy.maxMergedBurst + 1
      );
    }

    this.pending.push(raw);

    if (!this.scheduled) {
      this.scheduled = true;
      queueMicrotask(() => {
        this.scheduled = false;
        this.flush();
      });
    }
  },

  compute(packets) {
    const merged = {};
    for (const p of packets) {
      if (!p) continue;
      for (const key of Object.keys(p)) {
        const value = p[key];
        if (value !== undefined) merged[key] = value;
      }
    }
    return merged;
  },

  changed(next) {
    const prev = this.last;
    const same = JSON.stringify(prev) === JSON.stringify(next);
    if (!same) this.last = next;
    return !same;
  },

  flush() {
    if (!this.pending.length) return;

    const packets = this.pending.slice();
    this.pending.length = 0;

    const merged = this.compute(packets);
    if (!this.changed(merged)) return;

    PulseRealm.PulseFinalityPort.dispatch("PULSE", async () => merged, {
      __merged: true,
      __packets: packets.length
    });

    try {
      if (PulseRealm.PulseSignals && typeof PulseRealm.PulseSignals.emit === "function") {
        PulseRealm.PulseSignals.emit("pulse:merged", {
          id: merged.id || "PULSE",
          type: merged.type || "MERGED",
          source: merged.source || "PulseSignalPort",
          layer: merged.layer || "PULSEWORLD",
          time: merged.time || PulseRealm.PulseNOW,
          ...merged
        });
      }
    } catch {}
  }
};

// ---------------------------------------------------------------------------
// PulseSignalPort
// ---------------------------------------------------------------------------
export function PulseSignalPort(portId = "default") {
  if (__PulseSignalPortRegistry.has(portId)) {
    return __PulseSignalPortRegistry.get(portId);
  }

  function emit(event, payload = {}) {
    try {
      __PulseMergedState.add({
        portId,
        event,
        ...payload
      });
    } catch (err) {
      try {
        PulseRealm.PulseError("signal", "[PulseSignalPort v39] Merge error:", err);
      } catch {}
    }
  }

  const instance = {
    portId,
    emit,
    dispatch: emit
  };

  __PulseSignalPortRegistry.set(portId, instance);
  return instance;
}

PulseSignalPort.for = function(id) {
  return PulseSignalPort(id);
};

// ---------------------------------------------------------------------------
// GLOBALS FOR WORLD PATH / NET PORT
// ---------------------------------------------------------------------------
export async function PulseSignal_NetPort(req, res, context = {}) {
  if (!PATH_pulseNetPortHandler) {
    PulseRealm.PulseError("signal", "[PulseSignal_NetPort] No pulseNetPortHandler available");
    return res.status(500).json({ error: "Port not ready" });
  }

  return PATH_pulseNetPortHandler(req, res, context);
}

// ---------------------------------------------------------------------------
// IMMORTAL REGISTRY (ALWAYS DEFINED, SYNC-SAFE)
// ---------------------------------------------------------------------------
export const PulseNetRegistry = {
  providers: new Map(),
  cache: new Map(),

  register(name, config) {
    this.providers.set(name, config);
  },

  get(name) {
    return this.providers.get(name);
  },

  async warmAll() {
    PulseRealm.PulseLog("signal", `[PulseNetPort] Warming Network World Access Layers!`);
    for (const [name, provider] of this.providers.entries()) {
      try {
        if (provider.warm && !this.cache.has(name)) {
          const warmed = await provider.warm();
          this.cache.set(name, warmed);
        }
      } catch (err) {
        PulseRealm.PulseError("signal", `[PulseNetPort] Warm Failed for ${name}`, err);
      }
    }
  },

  getCached(name) {
    return this.cache.get(name) || null;
  }
};

export let PATH_PROVIDER        = null;
export let ESBUILD_PROVIDER     = null;
export let STRIPE_PROVIDER      = null;
export let EMAIL_ALERT_PROVIDER = null;
export let FIREBASE_PROVIDER    = null;
export let TWILIO_PROVIDER      = null;
export let PATH                 = null;
export let FIREBASE_ADMIN                       = null;
export let FIREBASE_DB                          = null;
export let FIREBASE_FUNCTIONS                   = null;
export let FIREBASE_ON_CALL                     = null;
export let FIREBASE_ON_REQUEST                  = null;
export let FIREBASE_CHECK_WORLD_DATA_HEALTH     = null;
export let FIREBASE_EXPRESS                     = null;
export let FIREBASE_ON_DOCUMENT_WRITTEN         = null;
export let FIREBASE_ON_DOCUMENT_WRITTEN_WITHCTX = null;
export let FIREBASE_ON_SCHEDULE                 = null;

// ---------------------------------------------------------------------------
// WORLD PORT BOOT
// ---------------------------------------------------------------------------
let __PulseWorldPortPromise = null;

export async function buildPulseWorldPort() {
  if (__PulseWorldPortPromise) return __PulseWorldPortPromise;

  __PulseWorldPortPromise = (async () => {
    PulseRealm.PulseLog("signal", `[PulseWorldPort] Building World Port to Organism..`);

    // -------------------------------------------------------------
    // PATH PROVIDER (STATIC IMPORT)
    // -------------------------------------------------------------
    PulseNetRegistry.register("path", {
      warm: async () => {
     

        const handler = PulseWorldPath || null;

        PATH = path;
        PATH_ORGAN = PulseWorldPath;
        PATH_pulseNetPortHandler = handler;

        const warmed = {
          ...PATH_ORGAN,
          PATH: PulseWorldPath,
          pathOrgan: PATH_ORGAN,
          pulseNetPortHandler: handler,
          fs: fs || null,
          path: path || null
        };

        PATH_PROVIDER = warmed;
        return warmed;
      },

      verify: async () => ({ valid: true, eventObj: null }),

      handle: async () => ({
        PATH,
        pathOrgan: PATH_ORGAN,
        pulseNetPortHandler: PATH_pulseNetPortHandler,
        fs: PATH_ORGAN.fs || null,
        path: PATH_ORGAN.path || null
      }),

      finality: "SYSTEM:PATH_READY"
    });

    // -------------------------------------------------------------
    // ESBUILD PROVIDER (STATIC FROM PulseVFS)
    // -------------------------------------------------------------
    PulseNetRegistry.register("esbuild", {
      warm: async () => {
        const mod = PulseVFS["../../PULSE-PHYSICS/X-PULSE-X/3RDPARTY/PULSE-WORLD-COMPILER.js"];
        const warmed = { ...mod };
        ESBUILD_PROVIDER = warmed;
        return warmed;
      },

      verify: async ({ rawBody }) => ({ valid: true, eventObj: rawBody }),

      handle: async event => {
        const cached = PulseNetRegistry.getCached("esbuild");
        if (cached.handleCompilerEvent) {
          return cached.handleCompilerEvent(event);
        }
        return { ok: true, event };
      },

      finality: "INFRA:ESBUILD_READY"
    });

    // -------------------------------------------------------------
    // STRIPE PROVIDER (STATIC FROM PulseVFS)
    // -------------------------------------------------------------
    PulseNetRegistry.register("stripe", {
      warm: async () => {
        const stripe = getStripe() || null;

        const warmed = {
          stripe,
          bank: PulseVFS["../../PULSE-PHYSICS/X-PULSE-X/3RDPARTY/PULSE-WORLD-BANK.js"]
        };

        STRIPE_PROVIDER = warmed;
        return warmed;
      },

      verify: async ({ rawBody, headers }) => {
        const cached = PulseNetRegistry.getCached("stripe");
        if (!cached.bank) return { valid: false, eventObj: null };

        return cached.bank.verifyStripeSignature({
          rawBody,
          headers,
          stripe: cached.stripe
        });
      },

      handle: async event => {
        const cached = PulseNetRegistry.getCached("stripe");
        if (!cached.bank) return { ok: false, error: "Stripe bank not ready" };
        return cached.bank.handleStripeWebhook(event);
      },

      finality: "BANK:STRIPE_WEBHOOK"
    });

    // -------------------------------------------------------------
    // EMAIL ALERT PROVIDER (STATIC)
    // -------------------------------------------------------------
    PulseNetRegistry.register("email_alert", {
      warm: async () => {
        const warmed = {
          createEmailTransport,

          send: async (opts = {}) => {
            return createEmailTransport.sendMail({
              from: `"PulseWorld Alerts" <${process.env.PULSE_SMTP_USER}>`,
              ...opts
            });
          },

          handleEmailEvent: createEmailTransport || (async () => ({ ok: true }))
        };

        EMAIL_ALERT_PROVIDER = warmed;
        return warmed;
      },

      verify: async ({ rawBody }) => ({ valid: true, eventObj: rawBody }),

      handle: async event => {
        const email = PulseNetRegistry.getCached("email_alert");
        if (!email.handleEmailEvent) {
          return { ok: false, error: "Email provider not ready" };
        }
        return email.handleEmailEvent(event);
      },

      finality: "EMAIL:ALERT_READY"
    });

    // -------------------------------------------------------------
    // FIREBASE PROVIDER (STATIC)
    // -------------------------------------------------------------
    PulseNetRegistry.register("firebase", {
      warm: async () => {
        const warmed = {
          db: db || null,
          onCall: onCall || null,
          onRequest: onRequest || null,
          checkWorldDataHealth: checkWorldDataHealth || null,
          express: PulseWorldExpressMiddleLayer || null,
          onSchedule: onSchedule || null
        };

        FIREBASE_PROVIDER                      = warmed;
        FIREBASE_ADMIN                         = warmed.admin;
        FIREBASE_DB                            = warmed.db;
        FIREBASE_FUNCTIONS                     = warmed.functions;
        FIREBASE_ON_CALL                       = warmed.onCall;
        FIREBASE_ON_REQUEST                    = warmed.onRequest;
        FIREBASE_CHECK_WORLD_DATA_HEALTH       = warmed.checkWorldDataHealth;
        FIREBASE_EXPRESS                       = warmed.express;
        FIREBASE_ON_DOCUMENT_WRITTEN           = warmed.onDocumentWritten;
        FIREBASE_ON_DOCUMENT_WRITTEN_WITHCTX   = warmed.onDocumentWrittenWithAuthContext;
        FIREBASE_ON_SCHEDULE                   = warmed.onSchedule;

        return warmed;
      },

      verify: async ({ rawBody }) => ({ valid: true, eventObj: rawBody }),

      handle: async event => {
        const fb = PulseNetRegistry.getCached("firebase");
        if (!fb.handleFirebaseEvent) {
          return { ok: false, error: "Firebase not ready" };
        }
        return fb.handleFirebaseEvent(event);
      },

      finality: "FIREBASE:EVENT"
    });

    // -------------------------------------------------------------
    // TWILIO PROVIDER (STATIC FROM PulseVFS)
    // -------------------------------------------------------------
    PulseNetRegistry.register("twilio", {
      warm: async () => {
        const mod = PulseVFS["../../PULSE-PHYSICS/X-PULSE-X/3RDPARTY/PulseWorldSMSAlert-v30.js"];
        const warmed = { ...mod };
        TWILIO_PROVIDER = warmed;
        return warmed;
      },

      verify: async ({ rawBody }) => ({ valid: true, eventObj: rawBody }),

      handle: async event => {
        const tw = PulseNetRegistry.getCached("twilio");
        if (!tw.handleTwilioEvent) {
          return { ok: false, error: "Twilio not ready" };
        }
        return tw.handleTwilioEvent(event);
      },

      finality: "SMS:TWILIO_WEBHOOK"
    });

    // -------------------------------------------------------------
    // WARM ALL PROVIDERS
    // -------------------------------------------------------------
    await PulseNetRegistry.warmAll();

    try {
      if (PulseWorldTrustCore.snapshotTrustCore) {
        void PulseWorldTrustCore.snapshotTrustCore();
      }
    } catch {}

    // -------------------------------------------------------------
    // WORLD PORT HANDLER
    // -------------------------------------------------------------
    const worldPort = {
      PulseNetRegistry,

      async handler(req, res) {
        try {
          if (req.method !== "POST") {
            return res.status(405).json({ error: "Method Not Allowed" });
          }

          const providerName = req.params.provider;
          const provider = PulseNetRegistry.get(providerName);

          if (!provider) {
            return res.status(404).json({ error: "Unknown Provider" });
          }

          const rawBody =
            req.rawBody ||
            req.bodyRaw ||
            req.body ||
            "";

          const verification = await provider.verify({
            rawBody,
            headers: req.headers
          });

          if (!verification.valid) {
            return res.status(400).json({ error: "Invalid Signature" });
          }

          await PulseRealm.PulseFinalityPort.dispatch(provider.finality, async () => {
            await provider.handle(verification.eventObj);
          });

          return res.status(200).json({ ok: true });
        } catch (err) {
          PulseRealm.PulseError("signal", "[PULSE-WORLD-PORT] ERROR:", err);
          return res.status(500).json({ error: "Internal" });
        }
      }
    };

    try {
      if (PulseRealm.PulseFinalityPort.__ports) {
        PulseRealm.PulseFinalityPort.__ports.set("PulseWorldPort", worldPort);
        PulseRealm.PulseFinalityPort.WorldPort = worldPort;
        PulseRealm.PulseFinalityPort.NetPort = PulseSignal_NetPort;
      }
    } catch {}

    PulseRealm.PulseLog("signal", `[PulseWorldPort] Built World Port to Organism Securely!`);
    return worldPort;
  })();

  return __PulseWorldPortPromise;
}


// ============================================================================
// AUTO-START + READY HELPER
// ============================================================================
buildPulseWorldPort().catch(err => {
  PulseRealm.PulseError("signal", "[buildPulseWorldPort] Auto-build failed:", err);
});

export async function ensurePulseWorldPortReady() {
  buildPulseWorldPort();
  return {
    PATH_PROVIDER,
    ESBUILD_PROVIDER,
    STRIPE_PROVIDER,
    EMAIL_ALERT_PROVIDER,
    FIREBASE_PROVIDER,
    TWILIO_PROVIDER
  };
}

// ============================================================================
// PROTOCOL SIGNAL PORT
// ============================================================================
export const ProtocolSignalPort = {
  emit(event, payload = {}) {
    const port = PulseSignalPort.for("default");
    return port.emit(event, payload);
  },

  dispatch(channel, fn, context = {}) {
    return PulseRealm.PulseFinalityPort.dispatch(channel, fn, context);
  },

  for(id) {
    return PulseSignalPort.for(id);
  },

  getSnapshot(id = "default") {
    try {
      const merged = __PulseMergedState.last || null;
      const external = PulseRealm.PulseSignals?.snapshot?.() || null;

      return {
        id,
        merged,
        external
      };
    } catch (err) {
      return {
        id,
        error: String(err)
      };
    }
  },

  finality: PulseRealm.PulseFinalityPort,
  net: PulseSignal_NetPort,
  world: buildPulseWorldPort,
  registry: PulseNetRegistry
};

// ============================================================================
// REGISTRY ACCESSORS + GLOBALS
// ============================================================================
export function __getPulseNetRegistry() {
  return PulseNetRegistry;
}

export default ProtocolSignalPort;

PulseRealm.SignalPorts = {
  ProtocolSignalPort,
  __getPulseNetRegistry,
  ensurePulseWorldPortReady,
  buildPulseWorldPort,
  PulseNetRegistry,
  PulseSignalPort,
  __PulseMergedState,
  PulseVFS
};

PulseRealm.SignalPort = ProtocolSignalPort;
PulseRealm.PulseSignalPort = ProtocolSignalPort;
PulseRealm.PulseSignalPortEmit = ProtocolSignalPort.emit;
PulseRealm.PulseFinalityPort = FinalityPort;
PulseRealm.ProtocolSignalPort = ProtocolSignalPort;
