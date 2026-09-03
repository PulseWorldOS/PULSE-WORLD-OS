// ============================================================================
//  PulseOSIdentityBBB-v30.js
//  PULSE OS v30‑IMMORTAL — BLOOD–BRAIN BARRIER (BBB)
//  Identity Gate • Trust Fusion • Core Security Organ
//  HYBRID‑IMMORTAL IDENTITY (LOCAL + REMOTE + PROXY‑MODE + TRI‑ENV CONTEXT)
//  PURE VERIFICATION. ZERO DRIFT. A‑B‑A BAND + BINARY/WAVE + PRESENCE/HARMONICS.
//  v30++: IndexedDB-first identity cache + unified dual-band advantage surfaces.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝




// ============================================================================
// ⭐ INTERNAL LOGGER SHIM — Safe, zero‑import
// ============================================================================
function safeLog(...args)  { try { console.log(...args); } catch {} }
function safeWarn(...args) { try { console.warn(...args); } catch {} }
function safeError(...args){ try { console.error(...args); } catch {} }


// ============================================================================
// ⭐ VERSION MAP — The Genome of PulseOS (v30‑IMMORTAL)
// ============================================================================
export const PulseVersion = {
  identity:      "30-Immortal",
  brain:         "30-Immortal",
  gpu:           "30-Immortal",
  orchestrator:  "30-Immortal",
  engine:        "30-Immortal",
  optimizer:     "30-Immortal",
  synapse:       "30-Immortal",
  band:          "30-Immortal",
  router:        "30-Immortal",
  marketplaces:  "30-Immortal",
  telemetry:     "30-Immortal",
  limbic:        "30-Immortal",
  governor:      "30-Immortal",
  understanding: "30-Immortal",
  proxy:         "30-Immortal",
  earn:          "30-Immortal",
  send:          "30-Immortal"
};


// ============================================================================
// ⭐ ROLE MAP — Organ Metaphors (v30‑IMMORTAL)
// ============================================================================
export const PulseRoles = {
  identity:      "BLOOD–BRAIN BARRIER (BBB) — Identity Gate",
  brain:         "ANALYST CORTEX — Cognitive Engine",
  gpu:           "ASTRAL NERVOUS SYSTEM — GPU Organ",
  orchestrator:  "BRAINSTEM — Autonomic Control",
  engine:        "MOTOR CORTEX — Execution Organ",
  optimizer:     "GUARDIAN — Safety + Efficiency",
  synapse:       "ELECTRICAL JUNCTION — Signal Bridge",
  band:          "BODY INTERFACE — A‑B‑A Surface",
  router:        "CONSULATE — Routing Intelligence",
  marketplaces:  "EMBASSY LEDGER — Marketplace Registry",
  telemetry:     "BLOODSTREAM — Metrics Flow",
  limbic:        "LIMBIC SHADOW — Emotional Heuristics",
  governor:      "GLOBAL LOOP GOVERNOR — System Regulator",
  understanding: "CORTICAL OPENER — Organism Loader",
  proxy:         "ADRENAL SYSTEM — Reflex Scaling",
  earn:          "ECONOMIC ORGAN — Marketplace Engine",
  send:          "TRANSPORT SYSTEM — Outbound Layer"
};


// ============================================================================
// ⭐ LINEAGE MAP — Evolutionary Identity (v30‑IMMORTAL)
// ============================================================================
export const PulseLineage = {
  identity:      "bbb-core-immortal-30",
  brain:         "analysis-core-immortal-30",
  gpu:           "astral-core-immortal-30",
  orchestrator:  "autonomic-core-immortal-30",
  engine:        "execution-core-immortal-30",
  optimizer:     "guardian-core-immortal-30",
  synapse:       "junction-core-immortal-30",
  band:          "interface-core-immortal-30",
  router:        "consulate-core-immortal-30",
  marketplaces:  "embassy-core-immortal-30",
  telemetry:     "bloodstream-core-immortal-30",
  limbic:        "shadow-core-immortal-30",
  governor:      "governor-core-immortal-30",
  understanding: "cortical-opener-core-immortal-30",
  proxy:         "adrenal-core-immortal-30",
  earn:          "economic-core-immortal-30",
  send:          "transport-core-immortal-30"
};


// ============================================================================
// ⭐ MODE MAP — A/B/A Routing Modes (v30‑IMMORTAL)
// ============================================================================
const IdentityModes = {
  LOCAL_ONLY:   "local-only",     // A
  HYBRID:       "hybrid",         // A → B → A
  OFFLINE_ONLY: "offline-only"    // A
};


// ============================================================================
// ⭐ STORAGE KEYS — v30‑IMMORTAL Identity Cache (IndexedDB-first)
// ============================================================================
const IDENTITY_DB_NAME = "PulseIdentityDB";
const IDENTITY_DB_STORE = "identity";
const IDENTITY_DB_KEY = "primary";

const IDENTITY_STORAGE_KEYS = [
  "tp_identity_v30",
  "tp_identity_v20",
  "tp_identity_v12_3",
  "tp_identity_v11",
  "tp_identity_v10",
  "tp_identity_v9"
];

export const PulseOSIdentityBBBMeta = Object.freeze({
  layer: "PulseOSIdentityBBB",
  role: "BLOOD_BRAIN_BARRIER_IDENTITY_ORGAN",
  version: "v30-Immortal-Hybrid",
  identity: "PulseOSIdentityBBB-v30-Immortal-Hybrid",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    multiInstanceReady: true,

    identityGate: true,
    trustFilter: true,
    coreSecurityOrgan: true,
    centralizedIdentityAuthority: true,
    lineageAuthority: true,
    modeAuthority: true,
    bandAuthority: true,

    binaryFieldEmitter: true,
    waveFieldEmitter: true,
    abaBandAware: true,

    presenceAware: true,
    harmonicsAware: true,
    dualBandAware: true,
    dualBandCompatible: true,
    passivePrewarm: true,
    passiveCache: true,
    passiveChunk: true,
    passiveRemember: true,

    hybridIdentity: true,
    localIdentityAware: true,
    remoteIdentityAware: true,

    proxyModeIdentityAware: true,
    proxyModeIdentityFirstClass: true,
    proxyModeConfidenceAware: true,

    triEnvIdentityAware: true,
    cortexIdentityAware: true,
    somaticIdentityAware: true,
    sensoryIdentityAware: true,

    zeroImports: true,
    zeroRandomness: true,
    zeroTimestamps: true,
    zeroTimers: true,
    zeroAsync: false,
    zeroNetwork: false,
    zeroIO: false,
    zeroExternalMutation: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroEnvironmentAccess: false,

    symbolicAware: true,
    binaryAware: true,
    lineageAware: true,
    patternAware: true,
    shapeAware: true,
    evolutionAware: true,

    worldLensAware: false
  }),

  contract: Object.freeze({
    input: [
      "IdentityPayload",
      "IdentityMode",
      "DualBandContext",
      "LineageContext",
      "ProxyModeIdentityContext",
      "TriEnvIdentityContext"
    ],
    output: [
      "IdentitySnapshot",
      "IdentitySignature",
      "IdentityBandSignature",
      "IdentityBinaryField",
      "IdentityWaveField",
      "IdentityPresenceField",
      "IdentityDiagnostics",
      "IdentityHealingState"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseOS-v11",
    parent: "PulseOS-v30-Immortal",
    ancestry: [
      "PulseIdentity-v7",
      "PulseIdentity-v8",
      "PulseIdentity-v9",
      "PulseIdentity-v10",
      "PulseIdentity-v11",
      "PulseIdentity-v11-Evo",
      "PulseIdentity-v11-Evo-Prime",
      "PulseIdentity-v11.2-Evo-BINARY-MAX",
      "PulseOSIdentityBBB-v12.3-Evo-BINARY-MAX",
      "PulseOSIdentityBBB-v20-Immortal-Hybrid"
    ]
  }),

  bands: Object.freeze({
    supported: ["symbolic", "binary", "dual"],
    default: "symbolic",
    behavior: "identity-gate"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "identity → verification → trust fusion → identity snapshot",
    adaptive: "binary-field + wave-field + presence overlays + tri-env fusion + proxy-mode fusion",
    return: "deterministic identity snapshot + signatures"
  })
});


// ============================================================================
// ⭐ A‑B‑A SURFACES — Identity Band + Binary/Wave Fields (v30)
// ============================================================================
let identityCycle = 0;

function buildIdentityBand() {
  return "symbolic-root";
}

function buildIdentityBandSignature() {
  const raw = "BBB_BAND::symbolic-root::v30-immortal";
  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `bbb-band-${acc}`;
}

function buildIdentityBinaryField() {
  const patternLen = 20;
  const density = 20 + 40;
  const surface = density + patternLen;

  return {
    binaryPhenotypeSignature: `bbb-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `bbb-binary-surface-${(surface * 7) % 99991}`,
    binarySurface: { patternLen, density, surface },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildIdentityWaveField() {
  const amplitude = 16;
  const wavelength = amplitude + 4;
  const phase = amplitude % 16;

  return {
    amplitude,
    wavelength,
    phase,
    band: "symbolic-root",
    mode: "symbolic-wave"
  };
}

function buildIdentityCycleSignature() {
  return `bbb-cycle-${(identityCycle * 7919) % 99991}`;
}

function buildIdentityPresence(mode, hasLocal, hasRemote, trustedDevice, proxyModeIdentity, triEnvContext) {
  const local = !!hasLocal;
  const remote = !!hasRemote;
  const trusted = !!trustedDevice;
  const proxyStrong = !!(proxyModeIdentity && proxyModeIdentity.confidence >= 0.7);

  const cortexId = triEnvContext.cortexIdentity || null;
  const somaticId = triEnvContext.somaticIdentity || null;
  const sensoryId = triEnvContext.sensoryIdentity || null;

  const triEnvSources = [
    cortexId ? 1 : 0,
    somaticId ? 1 : 0,
    sensoryId ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  let presenceBandState = "offline-presence";
  if (remote && trusted) presenceBandState = "deep-presence";
  else if (remote || proxyStrong) presenceBandState = "stable-presence";
  else if (local || triEnvSources > 0) presenceBandState = "light-presence";

  const harmonicBase =
    remote ? 0.08 :
    proxyStrong ? 0.12 :
    local ? 0.22 :
    triEnvSources > 0 ? 0.28 :
    0.6;

  const harmonicDrift = Math.max(0, Math.min(1, harmonicBase));

  const coherenceBase =
    remote ? 0.97 :
    proxyStrong ? 0.93 :
    local ? 0.88 :
    triEnvSources > 0 ? 0.82 :
    0.6;

  const coherenceScore = Math.max(0.2, Math.min(1.0, coherenceBase - harmonicDrift * 0.1));

  const dualBandMode =
    remote || proxyStrong ? "dual" :
    local ? "symbolic" :
    "binary";

  const pulsePrewarm =
    remote || proxyStrong ? "preferred" :
    local || triEnvSources > 0 ? "optional" :
    "disabled";

  const pulseCacheMode =
    remote || proxyStrong ? "identity-cache-strong" :
    local ? "identity-cache-local" :
    triEnvSources > 0 ? "identity-cache-tri-env" :
    "identity-cache-weak";

  const pulseChunkMode =
    remote || proxyStrong ? "multi-chunk" :
    "single-chunk";

  const pulseRemember =
    trusted || proxyStrong ? "remember-strong" :
    remote || local || triEnvSources > 0 ? "remember-normal" :
    "remember-weak";

  return {
    presenceBandState,
    harmonicDrift,
    coherenceScore,
    dualBandMode,
    pulsePrewarm,
    pulseCacheMode,
    pulseChunkMode,
    pulseRemember
  };
}


function openIdentityDB() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      return resolve(null);
    }

    const req = indexedDB.open(IDENTITY_DB_NAME, 1);
    req.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(IDENTITY_DB_STORE)) {
        db.createObjectStore(IDENTITY_DB_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
  });
}

async function loadIdentityFromIndexedDB() {
  const db = await  openIdentityDB();
  if (!db) return null;

  return await new Promise((resolve) => {
    try {
      const tx = db.transaction(IDENTITY_DB_STORE, "readonly");
      const store = tx.objectStore(IDENTITY_DB_STORE);
      const getReq = store.get(IDENTITY_DB_KEY);
      getReq.onsuccess = () => {
        const value = getReq.result || null;
        resolve(value);
      };
      getReq.onerror = () => resolve(null);
    } catch (_) {
      resolve(null);
    }
  });
}

async function saveIdentityToIndexedDB(identity) {
  const db = await  openIdentityDB();
  if (!db) return;

  return await new Promise((resolve) => {
    try {
      const tx = db.transaction(IDENTITY_DB_STORE, "readwrite");
      const store = tx.objectStore(IDENTITY_DB_STORE);
      const putReq = store.put(identity, IDENTITY_DB_KEY);
      putReq.onsuccess = () => resolve(true);
      putReq.onerror = () => resolve(false);
    } catch (_) {
      resolve(false);
    }
  });
}


async function loadLocalIdentity() {
  // IndexedDB primary
  const idbIdentity = await loadIdentityFromIndexedDB();
  if (idbIdentity && typeof idbIdentity === "object") {
    const required = ["uid", "userEmail", "sessionToken"];
    const missing = required.filter((f) => !idbIdentity[f]);
    if (missing.length === 0) {
      return {
        ...idbIdentity,
        trustedDevice: idbIdentity.trustedDevice === true,
        storageKey: "indexeddb"
      };
    }
  }
  return null;
}


// ============================================================================
// ⭐ REMOTE VERIFY — v30‑IMMORTAL (behavior preserved, metadata upgraded)
// ============================================================================
async function verifyRemoteIdentity(localIdentity, proxyModeIdentity) {
  if (typeof fetch !== "function") {
    safeWarn("[BBB v30] Remote verification unavailable (no fetch)");
    return null;
  }

  try {
    const res = await fetch("/api/pulse/identity/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        uid: localIdentity.uid ?? proxyModeIdentity.uid ?? null,
        sessionToken: localIdentity.sessionToken ?? proxyModeIdentity.sessionToken ?? null,
        proxyModeIdentity: proxyModeIdentity || null
      })
    });

    if (!res.ok) {
      safeWarn("[BBB v30] Remote verification failed", { status: res.status });
      return null;
    }

    const data = await res.json().catch(() => ({}));

    const required = ["uid", "userEmail", "sessionToken"];
    const missing = required.filter((f) => !data[f]);

    if (missing.length > 0) {
      safeWarn("[BBB v30] Remote identity incomplete", { missing });
      return null;
    }

    const normalized = {
      uid: data.uid,
      userEmail: data.userEmail,
      sessionToken: data.sessionToken,
      trustedDevice: data.trustedDevice === true
    };

    try {
      await saveIdentityToIndexedDB(normalized);
    } catch (_) {}

    return normalized;

  } catch (err) {
    safeWarn("[BBB v30] Remote verification error", String(err));
    return null;
  }
}


// ============================================================================
// ⭐ PROXY‑MODE IDENTITY FUSION — v30‑IMMORTAL
// ============================================================================
function fuseProxyModeIdentity(localIdentity, remoteIdentity, proxyModeIdentity, triEnvContext) {
  if (!proxyModeIdentity) {
    return { fused: remoteIdentity || localIdentity || null, source: "no-proxy" };
  }

  const confidence = typeof proxyModeIdentity.confidence === "number"
    ? Math.max(0, Math.min(1, proxyModeIdentity.confidence))
    : 0.5;

  const proxyUid = proxyModeIdentity.uid || remoteIdentity.uid || localIdentity.uid || null;
  const proxyEmail = proxyModeIdentity.userEmail || remoteIdentity.userEmail || localIdentity.userEmail || null;
  const proxyToken = proxyModeIdentity.sessionToken || remoteIdentity.sessionToken || localIdentity.sessionToken || null;

  const triEnvScore =
    (triEnvContext.cortexIdentity ? 0.2 : 0) +
    (triEnvContext.somaticIdentity ? 0.2 : 0) +
    (triEnvContext.sensoryIdentity ? 0.2 : 0);

  const effectiveConfidence = Math.max(confidence, triEnvScore);

  if (!proxyUid || !proxyEmail || !proxyToken) {
    return { fused: remoteIdentity || localIdentity || null, source: "proxy-weak" };
  }

  const fused = {
    uid: proxyUid,
    userEmail: proxyEmail,
    sessionToken: proxyToken,
    trustedDevice: proxyModeIdentity.trustedDevice === true || localIdentity.trustedDevice === true,
    proxyModeConfidence: effectiveConfidence,
    proxyModeSource: proxyModeIdentity.source || "proxy-mode",
    triEnvContext: triEnvContext || null
  };

  return { fused, source: "proxy-strong" };
}


// ============================================================================
// ⭐ OFFLINE IDENTITY — v30‑IMMORTAL A‑B‑A
// ============================================================================
function buildOfflineIdentity(reason, mode, proxyModeIdentity, triEnvContext) {
  const band = buildIdentityBand();
  const bandSignature = buildIdentityBandSignature();
  const binaryField = buildIdentityBinaryField();
  const waveField = buildIdentityWaveField();
  const presence = buildIdentityPresence(
    mode,
    false,
    false,
    false,
    proxyModeIdentity,
    triEnvContext
  );

  return {
    uid: null,
    userEmail: null,
    sessionToken: null,
    trustedDevice: false,
    offline: true,
    reason,
    lineage: PulseLineage.identity,

    band,
    bandSignature,
    binaryField,
    waveField,
    identityCycleSignature: buildIdentityCycleSignature(),

    presenceBandState: presence.presenceBandState,
    harmonicDrift: presence.harmonicDrift,
    coherenceScore: presence.coherenceScore,
    dualBandMode: presence.dualBandMode,
    pulsePrewarm: presence.pulsePrewarm,
    pulseCacheMode: presence.pulseCacheMode,
    pulseChunkMode: presence.pulseChunkMode,
    pulseRemember: presence.pulseRemember,

    meta: {
      layer: "PulseIdentity",
      version: PulseVersion.identity,
      mode,
      evo: PulseRoles.identity,
      lineage: PulseLineage.identity
    }
  };
}


// ============================================================================
// ⭐ IDENTITY LOADER — BBB v30‑IMMORTAL HYBRID ENGINE (A‑B‑A)
// ============================================================================
export async function identity(modeOrOptions) {
  identityCycle++;
  safeLog("[BBB v30] Identity Request (v30‑Immortal A‑B‑A)");

  let mode = IdentityModes.HYBRID;
  let proxyModeIdentity = null;
  let triEnvContext = null;

  if (typeof modeOrOptions === "string") {
    mode = modeOrOptions;
  } else if (modeOrOptions && typeof modeOrOptions === "object") {
    if (typeof modeOrOptions.mode === "string") {
      mode = modeOrOptions.mode;
    }
    if (modeOrOptions.proxyModeIdentity && typeof modeOrOptions.proxyModeIdentity === "object") {
      proxyModeIdentity = modeOrOptions.proxyModeIdentity;
    }
    if (modeOrOptions.triEnvContext && typeof modeOrOptions.triEnvContext === "object") {
      triEnvContext = modeOrOptions.triEnvContext;
    }
  }

  if (!Object.values(IdentityModes).includes(mode)) {
    safeWarn("[BBB v30] Invalid mode, defaulting to HYBRID", { mode });
    mode = IdentityModes.HYBRID;
  }

  try {
    // ============================================================
    // A‑PATH: LOCAL FIRST (IndexedDB + legacy cache)
// ============================================================
    const localIdentity = await loadLocalIdentity();

    if (localIdentity) {
      safeLog("[BBB v30] Local identity validated (A‑path)", {
        storageKey: localIdentity.storageKey
      });

      const band = buildIdentityBand();
      const bandSignature = buildIdentityBandSignature();
      const binaryField = buildIdentityBinaryField();
      const waveField = buildIdentityWaveField();
      const presence = buildIdentityPresence(
        "local",
        true,
        false,
        localIdentity.trustedDevice,
        proxyModeIdentity,
        triEnvContext
      );

      const base = {
        uid: localIdentity.uid,
        userEmail: localIdentity.userEmail,
        sessionToken: localIdentity.sessionToken,
        trustedDevice: localIdentity.trustedDevice,
        offline: false,
        lineage: PulseLineage.identity,

        band,
        bandSignature,
        binaryField,
        waveField,
        identityCycleSignature: buildIdentityCycleSignature(),

        presenceBandState: presence.presenceBandState,
        harmonicDrift: presence.harmonicDrift,
        coherenceScore: presence.coherenceScore,
        dualBandMode: presence.dualBandMode,
        pulsePrewarm: presence.pulsePrewarm,
        pulseCacheMode: presence.pulseCacheMode,
        pulseChunkMode: presence.pulseChunkMode,
        pulseRemember: presence.pulseRemember,

        meta: {
          layer: "PulseIdentity",
          version: PulseVersion.identity,
          mode: "local"
        }
      };

      if (mode === IdentityModes.LOCAL_ONLY || mode === IdentityModes.OFFLINE_ONLY) {
        return base;
      }

      // ============================================================
      // B‑PATH: REMOTE VERIFY (HYBRID ONLY)
// ============================================================
      const remote = await verifyRemoteIdentity(localIdentity, proxyModeIdentity);
      const { fused, source } = fuseProxyModeIdentity(localIdentity, remote, proxyModeIdentity, triEnvContext);

      if (fused) {
        safeLog("[BBB v30] Identity fused (HYBRID)", { source });

        const rPresence = buildIdentityPresence(
          "hybrid-fused",
          !!localIdentity,
          !!remote,
          fused.trustedDevice,
          proxyModeIdentity,
          triEnvContext
        );

        return {
          ...fused,
          offline: false,
          lineage: PulseLineage.identity,

          band,
          bandSignature,
          binaryField,
          waveField,
          identityCycleSignature: buildIdentityCycleSignature(),

          presenceBandState: rPresence.presenceBandState,
          harmonicDrift: rPresence.harmonicDrift,
          coherenceScore: rPresence.coherenceScore,
          dualBandMode: rPresence.dualBandMode,
          pulsePrewarm: rPresence.pulsePrewarm,
          pulseCacheMode: rPresence.pulseCacheMode,
          pulseChunkMode: rPresence.pulseChunkMode,
          pulseRemember: rPresence.pulseRemember,

          meta: {
            layer: "PulseIdentity",
            version: PulseVersion.identity,
            mode: "hybrid-fused",
            source
          }
        };
      }

      safeWarn("[BBB v30] Remote/Proxy fusion failed, staying on local (A‑path)");
      const lfPresence = buildIdentityPresence(
        "local-fallback",
        true,
        false,
        localIdentity.trustedDevice,
        proxyModeIdentity,
        triEnvContext
      );

      return {
        ...base,
        presenceBandState: lfPresence.presenceBandState,
        harmonicDrift: lfPresence.harmonicDrift,
        coherenceScore: lfPresence.coherenceScore,
        dualBandMode: lfPresence.dualBandMode,
        pulsePrewarm: lfPresence.pulsePrewarm,
        pulseCacheMode: lfPresence.pulseCacheMode,
        pulseChunkMode: lfPresence.pulseChunkMode,
        pulseRemember: lfPresence.pulseRemember,
        meta: {
          layer: "PulseIdentity",
          version: PulseVersion.identity,
          mode: "local-fallback"
        }
      };
    }

    // ============================================================
    // NO LOCAL IDENTITY
// ============================================================
    safeWarn("[BBB v30] No valid local identity found");

    if (mode === IdentityModes.HYBRID) {
      const remote = await verifyRemoteIdentity(null, proxyModeIdentity);
      const { fused, source } = fuseProxyModeIdentity(null, remote, proxyModeIdentity, triEnvContext);

      if (fused) {
        safeLog("[BBB v30] Identity obtained via remote/proxy fusion without local cache", { source });

        const band = buildIdentityBand();
        const bandSignature = buildIdentityBandSignature();
        const binaryField = buildIdentityBinaryField();
        const waveField = buildIdentityWaveField();
        const presence = buildIdentityPresence(
          "hybrid-remote-proxy",
          false,
          !!remote,
          fused.trustedDevice,
          proxyModeIdentity,
          triEnvContext
        );

        return {
          ...fused,
          offline: false,
          lineage: PulseLineage.identity,

          band,
          bandSignature,
          binaryField,
          waveField,
          identityCycleSignature: buildIdentityCycleSignature(),

          presenceBandState: presence.presenceBandState,
          harmonicDrift: presence.harmonicDrift,
          coherenceScore: presence.coherenceScore,
          dualBandMode: presence.dualBandMode,
          pulsePrewarm: presence.pulsePrewarm,
          pulseCacheMode: presence.pulseCacheMode,
          pulseChunkMode: presence.pulseChunkMode,
          pulseRemember: presence.pulseRemember,

          meta: {
            layer: "PulseIdentity",
            version: PulseVersion.identity,
            mode: "hybrid-remote-proxy",
            source
          }
        };
      }

      safeWarn("[BBB v30] Remote/Proxy identity unavailable in HYBRID mode");
    }

    // ============================================================
    // FINAL A‑PATH: OFFLINE SAFE FALLBACK
// ============================================================
    const offlineIdentity = buildOfflineIdentity(
      "No valid local identity and remote/proxy verification unavailable.",
      "offline-fallback",
      proxyModeIdentity,
      triEnvContext
    );

    safeLog("[BBB v30] Returning offline identity fallback");
    return offlineIdentity;

  } catch (err) {
    safeError("[BBB v30] Identity load failed", err);

    return buildOfflineIdentity(
      "Identity loader crashed; safe offline fallback.",
      "crash-fallback",
      null,
      null
    );
  }
}

PulseRealm.ProxyBBB = {
  identity,
  verifyRemoteIdentity,
  loadIdentityFromIndexedDB,
  saveIdentityToIndexedDB,
  loadLocalIdentity
}