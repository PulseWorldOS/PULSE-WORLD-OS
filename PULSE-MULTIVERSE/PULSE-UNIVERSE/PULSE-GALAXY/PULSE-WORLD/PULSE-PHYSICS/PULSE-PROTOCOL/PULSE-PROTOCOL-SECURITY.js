// PULSE-PROTOCOL-SECURITY.js
// v33.0 — IMMORTAL SECURITY + PULSE-IO + BINARY + KEYCHAIN + KILL SWITCH
// Trust-aware, evolution-stable security organ for PulseWorld
import {fs, path as PATH} from "../../PULSE-WORLD-PATH.js";

console.log("%c⟙ PULSE WORLD PROTOCOL v30.0 — [PulseSecurity] Trust-aware, evolution-stable security organ for PulseWorld Watching & Waiting..",
  "color:#90CAF9; font-weight:bold; font-family:monospace;"
);
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

// Optional integrations (all soft / optional)
const PulseChunks = PulseRealm.PulseChunks || null;
const PulsePresenceNormalizerStore = PulseRealm.PulsePresenceNormalizerStore || null;
const PulseChunkNormalizer = PulseRealm.PulseChunkNormalizer || null;

// Optional PulseFunction library (soft)
const PulseFunctionLibrary = PulseRealm.PulseFunctionLibrary || null;

// Optional higher organs (soft)
const PulseSecretsLayer = PulseRealm.PulseSecretsLayer || null;   // secure enclave (external)
const PulseOvermind = PulseRealm.PulseOvermind || null;           // execution brain (external)
const PulseApproval = PulseRealm.PulseApproval || null;           // authority organ (external)

// NEW: PulseIO + Binary codec (backend/offline, soft)
const PulseIO = PulseRealm.PulseIO || null;
const PulseBinaryKeyCodec = PulseRealm.PulseBinaryKeyCodec || null;

// Optional: TrustCore presence (for conceptual anchoring)
const PulseWorldTrustCore =
  PulseRealm.PulseWorldTrustCore || null;

// ============================================================================
//  PulseSignalKey Resolution
// ============================================================================

/**
 * Resolve the active PulseSignalKey and its source.
 */
export function resolvePulseSignalKey(envelope, context = {}) {
  const key =
    context.pulseSignalKey ||
    envelope.pulseSignalKey ||
    PulseRealm.PULSE_SIGNAL_KEY ||
    null;

  let source = "none";
  if (context.pulseSignalKey) source = "context";
  else if (envelope.pulseSignalKey) source = "envelope";
  else if (PulseRealm.PULSE_SIGNAL_KEY) source = "global";

  return { key, source };
}

// ============================================================================
//  PulseIO Text Parser + Keychain Manager
// ============================================================================

function safeJSON(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

export function buildPulseIOKeyChainManager(envMap) {
  const env = envMap || {};

  const keychain = {
    raw: { ...env },

    get(key) {
      return env[key] ?? null;
    },

    has(key) {
      return Object.prototype.hasOwnProperty.call(env, key);
    },
    
    stripe() {
      return {
        secretKey:
          env.STRIPE_PASSWORD ||
          env.STRIPE_SECRET_KEY ||
          env.STRIPE ||
          null,
        webhookSecret: env.STRIPE_WEBHOOK_SECRET || null
      };
    },

    firebase() {
      const cfg =
        env.FIREBASE_CONFIG &&
        safeJSON(env.FIREBASE_CONFIG);

      return {
        config: cfg,
        projectId: env.GCLOUD_PROJECT || cfg.projectId || null
      };
    },

    maps() {
      return {
        apiKey: env.GOOGLE_MAPS_KEY || null
      };
    },

    payments() {
      return {
        baseUrl: env.BASE_PAYMENT_URL || null,
        apiKey: env.TP_API_KEY || null
      };
    },

    messaging() {
      return {
        accountSid: env.ACCOUNT_SID || null,
        authToken: env.AUTH_TOKEN || null,
        messagingServiceSid: env.MESSAGING_SERVICE_SID || null
      };
    },

    email() {
      return {
        password: env.EMAIL_PASSWORD || null
      };
    },

    founderInsert() {
      return {
        apiKey: env.FOUNDER_INSERT_API_KEY || null,
        authDomain: env.FOUNDER_INSERT_AUTH_DOMAIN || null,
        projectId: env.FOUNDER_INSERT_PROJECT_ID || null,
        storageBucket: env.FOUNDER_INSERT_STORAGE_BUCKET || null,
        senderId: env.FOUNDER_INSERT_SENDER_ID || null,
        appId: env.FOUNDER_INSERT_APP_ID || null
      };
    },

    rateLimit() {
      return {
        pinCollection: env.PIN_COLLECTION || null,
        windowMs: Number(env.RATE_LIMIT_WINDOW_MS ?? 0) || null,
        maxRequests: Number(env.MAX_REQUESTS_PER_WINDOW ?? 0) || null,
        pinTtlMs: Number(env.PIN_TTL_MS ?? 0) || null
      };
    }
  };

  // Required for your one-liner warm-path usage
  keychain.Promise = () => Promise.resolve(keychain);
  return keychain;
}

let pulseIOKeychainCache = null;

function isBinaryByte(chunk) {
  return /^[01]{8}$/.test(chunk);
}

function decodeBinaryOrReturnRaw(value) {
  if (!value || typeof value !== "string") return value;

  // Detect binary blocks: "01010101 01100101 ..."
  const isBinary = /^[01\s]+$/.test(value.trim());
  if (!isBinary) return value;

  try {
    return value
      .trim()
      .split(/\s+/)
      .map(bin => String.fromCharCode(parseInt(bin, 2)))
      .join("");
  } catch {
    return value;
  }
}


/**
 * Parse PulseIO text into an env map.
 * Supports lines like:
 *   # PIN_TTL_MS = "00110011 00110000 ..."; // comment
 *   RATE_LIMIT_WINDOW_MS = "00110110 00110000 ...";
 *   PLAIN_KEY = "some text";
 */
function parsePulseIOText(text) {
  const env = {};
  if (!text || typeof text !== "string") return env;

  const lines = text.split(/\r?\n/);

  for (const rawLine of lines) {
    if (!rawLine) continue;

    let line = rawLine.trim();
    if (!line) continue;

    // Strip leading '#'
    line = line.replace(/^#\s*/, "").trim();
    if (!line) continue;

    // Strip trailing inline comments starting with //
    const commentIndex = line.indexOf("//");
    if (commentIndex !== -1) {
      line = line.slice(0, commentIndex).trim();
      if (!line) continue;
    }

    // Match: LABEL = "value";
    const match = line.match(/^([A-Z0-9_]+)\s*=\s*"([^"]*)"/);
    if (!match) continue;

    const label = match[1];
    const quotedValue = match[2];

    const decoded = decodeBinaryOrReturnRaw(quotedValue);
    env[label] = decoded;
  }

  return env;
}

// Optional: standalone scanner, now using same logic by default
function extractBinarySecrets(text) {
  const secrets = {};
  if (!text || typeof text !== "string") return secrets;

  const lines = text.split(/\r?\n/);

  for (let rawLine of lines) {
    if (!rawLine) continue;

    let line = rawLine.trim();
    if (!line) continue;

    // Remove leading "# "
    line = line.replace(/^#\s*/, "").trim();
    if (!line) continue;

    // Remove inline comments
    const commentIndex = line.indexOf("//");
    if (commentIndex !== -1) {
      line = line.slice(0, commentIndex).trim();
      if (!line) continue;
    }

    // Match KEY="VALUE"
    const match = line.match(/^([A-Z0-9_]+)\s*=\s*"([^"]*)"/);
    if (!match) continue;

    const key = match[1];
    const rawValue = match[2];

    secrets[key] = decodeBinaryOrReturnRaw(rawValue);
  }

  return secrets;
}


export function loadPulseIOKeyChain(options = {}) {
  function ensureKeychainShape(kc, env = {}) {
    // GET
    kc.get ??= (key) => env[key] ?? null;

    // EMAIL
    kc.email ??= () => ({
      password: env.EMAIL_PASSWORD || null,
      user: env.EMAIL_USER || null
    });

    // STRIPE
    kc.stripe ??= () => ({
      secretKey:
        env.STRIPE_PASSWORD ||
        env.STRIPE_SECRET_KEY ||
        env.STRIPE ||
        null,
      webhookSecret: env.STRIPE_WEBHOOK_SECRET || null
    });

    // PAYMENTS
    kc.payments ??= () => ({
      apiKey: env.TP_API_KEY || env.PAYMENTS_API_KEY || null,
      baseUrl: env.BASE_PAYMENT_URL || env.PAYMENTS_BASE_URL || null
    });

    // MAPS
    kc.maps ??= () => ({
      apiKey: env.GOOGLE_MAPS_KEY || env.GOOGLE_MAPS_API_KEY || null
    });

    // MESSAGING
    kc.messaging ??= () => ({
      accountSid: env.ACCOUNT_SID || null,
      authToken: env.AUTH_TOKEN || null,
      messagingServiceSid: env.MESSAGING_SERVICE_SID || null
    });

    // RATE LIMIT
    kc.rateLimit ??= () => ({
      pinCollection: env.PIN_COLLECTION || null,
      windowMs: Number(env.RATE_LIMIT_WINDOW_MS ?? 0) || null,
      maxRequests: Number(env.MAX_REQUESTS_PER_WINDOW ?? 0) || null,
      pinTtlMs: Number(env.PIN_TTL_MS ?? 0) || null
    });

    kc.Promise ??= () => Promise.resolve(kc);

    return kc;
  }

  // ⭐ PRIMARY: fallback loader (binary PulseIO)
  const fallback = loadPulseIOFallback(PulseRealm.PulseKey || {});
  if (fallback && fallback.keychain) {
    const env = fallback.secrets || {};
    return ensureKeychainShape(fallback.keychain || {}, env);
  }

  // ⭐ SECONDARY: legacy .pulseio text file
  const {
    cwd = (typeof process !== "undefined" && process.cwd) ? process.cwd() : "/",
    filename = ".pulseio",
    absolutePath = null
  } = options;

  try {
    if (!PATH || typeof PATH.resolve !== "function") {
      return ensureKeychainShape(buildPulseIOKeyChainManager({}), {});
    }

    const filePath = absolutePath || PATH.resolve(cwd, filename);
    if (!PATH.exists(filePath)) {
      return ensureKeychainShape(buildPulseIOKeyChainManager({}), {});
    }

    const text = PATH.readFile(filePath, "utf8");
    if (!text) {
      return ensureKeychainShape(buildPulseIOKeyChainManager({}), {});
    }

    const envMap = extractBinarySecrets(text);
    return ensureKeychainShape(buildPulseIOKeyChainManager(envMap), envMap);

  } catch {
    return ensureKeychainShape(buildPulseIOKeyChainManager({}), {});
  }
}


let pulseIOCache = null;

function loadPulseIOFallback(PulseKey) {
  try {
    // 0) If already loaded, re-inject and return
    if (pulseIOCache) {
      if (PulseKey.signal && pulseIOCache.keychain) {
        const injected = pulseIOCache.injected || {};

        PulseKey.signal.keychain      ??= pulseIOCache.keychain;
        PulseKey.signal.stripe        ??= injected.stripe || null;
        PulseKey.signal.firebase      ??= injected.firebase || null;
        PulseKey.signal.googleMaps    ??= injected.googleMaps || null;
        PulseKey.signal.payments      ??= injected.payments || null;
        PulseKey.signal.messaging     ??= injected.messaging || null;
        PulseKey.signal.email         ??= injected.email || null;
        PulseKey.signal.founderInsert ??= injected.founderInsert || null;
        PulseKey.signal.rateLimit     ??= injected.rateLimit || null;
      }
      return pulseIOCache;
    }

    if (!PATH || typeof PATH.resolve !== "function" || typeof PATH.dirname !== "function") {
      pulseIOCache = {
        snapshot: null,
        meta: null,
        secrets: null,
        keychain: null,
        injected: {}
      };
      return pulseIOCache;
    }

    // 1) Resolve PulseIO file path using PulseWorldPath
    const baseDir = PATH.dirname(import.meta.url.replace("file://", ""));
    const pulseIOPath = PATH.resolve(baseDir, "../../../../../../PulseIO");

    if (!PATH.exists(pulseIOPath)) {
      pulseIOCache = {
        snapshot: null,
        meta: null,
        secrets: null,
        keychain: null,
        injected: {}
      };
      return pulseIOCache;
    }

    // 2) Read + parse PulseIO file
    const text = PATH.readFile(pulseIOPath, "utf8");
    if (!text) {
      pulseIOCache = {
        snapshot: null,
        meta: null,
        secrets: null,
        keychain: null,
        injected: {}
      };
      return pulseIOCache;
    }

    const envMap = parsePulseIOText(text);
    const keychain = buildPulseIOKeyChainManager(envMap);

    const snapshot = null;
    const meta = {
      keys: Object.keys(envMap),
      hasStripe: !!keychain.stripe().secretKey,
      hasFirebase: !!keychain.firebase().config
    };

    const injected = {
      stripe: null,
      firebase: null,
      googleMaps: null,
      payments: null,
      messaging: null,
      email: null,
      founderInsert: null,
      rateLimit: null
    };

    // 3) Inject into PulseRealm.signal if present
    if (PulseKey.signal) {
      PulseKey.signal.keychain = keychain;

      const stripe = keychain.stripe();
      if (stripe.secretKey) {
        injected.stripe = {
          secret: stripe.secretKey,
          webhookSecret: stripe.webhookSecret || null,
          loadedFrom: "PulseIO-Fallback-Keychain"
        };
        PulseKey.signal.stripe = injected.stripe;
      }

      const firebase = keychain.firebase();
      if (firebase.config) {
        injected.firebase = {
          config: firebase.config,
          projectId: firebase.projectId
        };
        PulseKey.signal.firebase = injected.firebase;
      }

      const maps = keychain.maps();
      if (maps.apiKey) {
        injected.googleMaps = { apiKey: maps.apiKey };
        PulseKey.signal.googleMaps = injected.googleMaps;
      }

      const payments = keychain.payments();
      if (payments.baseUrl || payments.apiKey) {
        injected.payments = {
          baseUrl: payments.baseUrl || null,
          apiKey: payments.apiKey || null
        };
        PulseKey.signal.payments = injected.payments;
      }

      const messaging = keychain.messaging();
      if (messaging.accountSid || messaging.authToken || messaging.messagingServiceSid) {
        injected.messaging = { ...messaging };
        PulseKey.signal.messaging = injected.messaging;
      }

      const email = keychain.email();
      if (email.password) {
        injected.email = { password: email.password };
        PulseKey.signal.email = injected.email;
      }

      const founderInsert = keychain.founderInsert();
      if (founderInsert.apiKey) {
        injected.founderInsert = { ...founderInsert };
        PulseKey.signal.founderInsert = injected.founderInsert;
      }

      const rateLimit = keychain.rateLimit();
      injected.rateLimit = { ...rateLimit };
      PulseKey.signal.rateLimit = injected.rateLimit;
    }

    // 4) Cache snapshot
    pulseIOCache = {
      snapshot,
      meta,
      secrets: envMap,
      keychain,
      injected
    };

    // Optional: let TrustCore observe PulseIO load
    try {
      if (
        PulseWorldTrustCore &&
        typeof PulseWorldTrustCore.snapshotTrustCore === "function"
      ) {
        void PulseWorldTrustCore.snapshotTrustCore();
      }
    } catch {}

    return pulseIOCache;

  } catch {
    pulseIOCache = {
      snapshot: null,
      meta: null,
      secrets: null,
      keychain: null,
      injected: {}
    };
    return pulseIOCache;
  }
}


// ============================================================================
//  PULSE FUNCTION ORGAN (MEMORY-ONLY, OPTIONAL)
// ============================================================================
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

// ============================================================================
//  PulseSignalKeyBridge — IMMORTAL, PULSE-IO + BINARY + KEYCHAIN INJECTION
// ============================================================================

export function buildPulseSignalKeyBridge(envelope, context = {}) {
  const { key, source } = resolvePulseSignalKey(envelope, context);

  const PulseCoreGlobal = ensurePulseGlobal();
  PulseCoreGlobal.signal.key = key;
  PulseCoreGlobal.signal.source = source;

  // 1) PulseIO primary load (in-memory PulseIO, if present)
  let pulseIOSnapshot = null;
  let pulseIOMeta = null;

  try {
    if (key && typeof PulseIO !== "undefined" && PulseIO) {
      if (typeof PulseIO.getSnapshot === "function") {
        pulseIOSnapshot = PulseIO.getSnapshot(key) || null;
      }
      if (typeof PulseIO.getMeta === "function") {
        pulseIOMeta = PulseIO.getMeta(key) || null;
      }
    }
  } catch {
    pulseIOSnapshot = null;
    pulseIOMeta = null;
  }

  // 2) FALLBACK: Load PulseIO file from disk (and inject keychain + all organs)
  let fallbackSecrets = null;
  let keychain = null;

  if (!pulseIOSnapshot && !pulseIOMeta) {
    const fallback = loadPulseIOFallback(PulseCoreGlobal);
    pulseIOSnapshot = fallback.snapshot;
    pulseIOMeta = fallback.meta;
    fallbackSecrets = fallback.secrets;
    keychain = fallback.keychain || null;
  } else {
    keychain = PulseCoreGlobal.signal.keychain || null;
  }

  // 3) Binary key bits + meta
  let binaryBits = null;
  let binaryMeta = null;

  try {
    if (key && typeof PulseBinaryKeyCodec !== "undefined" && PulseBinaryKeyCodec) {
      if (typeof PulseBinaryKeyCodec.toBits === "function") {
        const bits = PulseBinaryKeyCodec.toBits(key);
        if (Array.isArray(bits)) {
          binaryBits = bits.filter((b) => b === 0 || b === 1);
        }
      }
      if (typeof PulseBinaryKeyCodec.meta === "function") {
        binaryMeta = PulseBinaryKeyCodec.meta(key) || null;
      }
    }
  } catch {
    binaryBits = null;
    binaryMeta = null;
  }

  // 4) Inject into PulseGlobal
  PulseCoreGlobal.signal.pulseIO = pulseIOSnapshot;
  PulseCoreGlobal.signal.pulseIOMeta = pulseIOMeta;
  PulseCoreGlobal.signal.binaryBits = binaryBits;
  PulseCoreGlobal.signal.binaryMeta = binaryMeta;

  if (keychain && !PulseCoreGlobal.signal.keychain) {
    PulseCoreGlobal.signal.keychain = keychain;
  }

  // 5) Stripe Key Auto‑Loader (from keychain)
  if (PulseCoreGlobal.signal.keychain && !PulseCoreGlobal.signal.stripe) {
    const stripeView = PulseCoreGlobal.signal.keychain.stripe();
    if (stripeView.secretKey) {
      PulseCoreGlobal.signal.stripe = {
        secret: stripeView.secretKey,
        webhookSecret: stripeView.webhookSecret || null,
        loadedFrom: "PulseIO-Keychain"
      };
    }
  }

  // Optional: let TrustCore observe key bridge construction
  try {
    if (
      PulseWorldTrustCore &&
      typeof PulseWorldTrustCore.snapshotTrustCore === "function"
    ) {
      void PulseWorldTrustCore.snapshotTrustCore();
    }
  } catch {}

  return {
    key,
    source,
    pulseIO: {
      snapshot: pulseIOSnapshot,
      meta: pulseIOMeta
    },
    binary: {
      bits: binaryBits,
      meta: binaryMeta
    },
    secrets: fallbackSecrets || null,
    keychain: PulseCoreGlobal.signal.keychain || null,
    stripe: PulseCoreGlobal.signal.stripe || null
  };
}

// ============================================================================
//  SECRETS HOST + KILL SWITCH + RUNTIME FREEZE (IMMORTAL v33)
// ============================================================================

export function createPulseSecretsHost(envelope, signalBridge) {
  const PulseCoreGlobal = ensurePulseGlobal();

  const state = {
    active: false,
    authority: "unknown"
  };

  PulseCoreGlobal.secrets.state = state;

  function activate(externalKey = null) {
    const keyToUse = externalKey || signalBridge.key || null;

    try {
      if (typeof PulseSecretsLayer !== "undefined" &&
          PulseSecretsLayer &&
          typeof PulseSecretsLayer.activate === "function") {
        const result = PulseSecretsLayer.activate({
          page: envelope.page,
          moduleId: envelope.id,
          pulseSignalKey: keyToUse
        });

        state.active = !!result.active;
        state.authority = result.authority || (state.active ? "approved" : "denied");
      } else {
        state.active = false;
        state.authority = "unknown";
      }
    } catch {
      state.active = false;
      state.authority = "denied";
    }

    // Optional: TrustCore snapshot on secrets activation
    try {
      if (
        PulseWorldTrustCore &&
        typeof PulseWorldTrustCore.snapshotTrustCore === "function"
      ) {
        void PulseWorldTrustCore.snapshotTrustCore();
      }
    } catch {}
  }

  function strip() {
    try {
      if (typeof PulseSecretsLayer !== "undefined" &&
          PulseSecretsLayer &&
          typeof PulseSecretsLayer.strip === "function") {
        PulseSecretsLayer.strip({
          page: envelope.page,
          moduleId: envelope.id,
          pulseSignalKey: signalBridge.key || null
        });
      }
    } catch {}
    state.active = false;
  }

  function stripKeys() {
    try {
      if (typeof PulseSecretsLayer !== "undefined" &&
          PulseSecretsLayer &&
          typeof PulseSecretsLayer.stripKeys === "function") {
        PulseSecretsLayer.stripKeys({
          page: envelope.page,
          moduleId: envelope.id,
          pulseSignalKey: signalBridge.key || null
        });
      }
    } catch {}
    state.active = false;
    state.authority = "denied";

    // Optional: TrustCore snapshot on key strip
    try {
      if (
        PulseWorldTrustCore &&
        typeof PulseWorldTrustCore.snapshotTrustCore === "function"
      ) {
        void PulseWorldTrustCore.snapshotTrustCore();
      }
    } catch {}
  }

  return {
    state,
    activate,
    strip,
    stripKeys
  };
}

// ============================================================================
//  RUNTIME FREEZE (IMMORTAL v33)
// ============================================================================

export function createRuntimeFreeze(envelope) {
  const PulseCoreGlobal = ensurePulseGlobal();

  const runtimeState = {
    frozen: false,
    reason: null
  };

  PulseCoreGlobal.runtime.state = runtimeState;

  function freeze(reason = "manual") {
    runtimeState.frozen = true;
    runtimeState.reason = reason;

    try {
      if (typeof PulseOvermind !== "undefined" &&
          PulseOvermind &&
          typeof PulseOvermind.freezeExecution === "function") {
        PulseOvermind.freezeExecution({ page: envelope.page, reason });
      }
    } catch {}

    try {
      if (PulseRealm.PulseContinuance && typeof PulseRealm.PulseContinuance.stopAll === "function") {
        PulseRealm.PulseContinuance.stopAll(envelope.page);
      }
    } catch {}

    // Optional: TrustCore snapshot on freeze
    try {
      if (
        PulseWorldTrustCore &&
        typeof PulseWorldTrustCore.snapshotTrustCore === "function"
      ) {
        void PulseWorldTrustCore.snapshotTrustCore();
      }
    } catch {}
  }

  return {
    state: runtimeState,
    freeze
  };
}

// ============================================================================
//  KILL SWITCH (IMMORTAL v33)
// ============================================================================

export function createKillSwitch(secretsHost, runtimeFreeze) {
  return {
    softKill(reason = "soft-kill") {
      try { secretsHost.strip(); } catch {}
      try { runtimeFreeze.freeze(reason); } catch {}
    },
    stripKeys() {
      try { secretsHost.stripKeys(); } catch {}
    },
    freezeExecution(reason = "manual") {
      try { runtimeFreeze.freeze(reason); } catch {}
    }
  };
}

// ============================================================================
//  PROTOCOL-SECURITY-PORT (v33 IMMORTAL++)
//  Thin protocol-facing wrapper over all security functions.
// ============================================================================



export const ProtocolSecurityPort = {
  // Resolve active PulseSignalKey
  resolveKey(envelope, context = {}) {
    return resolvePulseSignalKey(envelope, context);
  },

  // Build full PulseSignalKeyBridge (PulseIO + Binary + Keychain)
  keyBridge(envelope, context = {}) {
    return buildPulseSignalKeyBridge(envelope, context);
  },

  // Build secrets host (activation, strip, stripKeys)
  secretsHost(envelope, signalBridge) {
    return createPulseSecretsHost(envelope, signalBridge);
  },

  // Build runtime freeze controller
  freeze(envelope) {
    return createRuntimeFreeze(envelope);
  },

  // Build kill switch (softKill, stripKeys, freezeExecution)
  kill(secretsHost, runtimeFreeze) {
    return createKillSwitch(secretsHost, runtimeFreeze);
  },

  // Load PulseIO keychain (file-based fallback)
  loadKeychain(options = {}) {
    const kc = loadPulseIOKeyChain(options);

    // ⭐ Give the keychain a built‑in promise method
    kc.Promise = () => Promise.resolve(kc);

    return kc;
  },


  // Parse PulseIO text
  parsePulseIO(text) {
    return parsePulseIOText(text);
  },

  // Build keychain manager from env map
  buildKeychainManager(envMap) {
    return buildPulseIOKeyChainManager(envMap);
  }
};

PulseRealm.PulseSecurityPort = ProtocolSecurityPort;
PulseRealm.PulseProtocolSecurity = ProtocolSecurityPort;
PulseRealm.SecurityPort = {
  ProtocolSecurityPort,
  createRuntimeFreeze,
  createKillSwitch,
  createPulseSecretsHost,
  buildPulseSignalKeyBridge,
  loadPulseIOKeyChain,
  buildPulseIOKeyChainManager,
  resolvePulseSignalKey
};

export const PulseSecurityPort = ProtocolSecurityPort;
export default ProtocolSecurityPort;