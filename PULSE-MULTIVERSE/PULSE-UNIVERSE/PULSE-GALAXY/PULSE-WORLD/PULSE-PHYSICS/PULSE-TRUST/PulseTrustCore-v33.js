// ============================================================================
//  PULSE‑WORLD TRUST CORE v33.0.0 IMMORTAL++
//  Trust Substrate • Internal Keychain • Deterministic Clock • Ethics Profile
//  OneBand • Org‑Aware • Import‑Anchored, Not Import‑Dependent
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


export const PulseWorldTrustCoreMeta_v33 = Object.freeze({
  id: "PulseWorldTrustCore-v33++",
  version: "33.0.0",
  layer: "trust",
  role: "TRUST_SUBSTRATE_CORE",
  mind: false,
  description:
    "IMMORTAL++ internal trust substrate for Pulse, import‑anchored and deterministic.",
  identity: Object.freeze({
    type: "organ",
    name: "PulseWorldTrustCore",
    band: "trust_core",
    mind: false,
    immutable: true
  }),
  schema: Object.freeze({
    snapshotType: "trust_core_profile_v33",
    categories: Object.freeze(["TRUSTCORE"]),
    erReady: true
  })
});

// ============================================================================
//  INTERNAL STATE (MODULE‑LOCAL, NOT EXPORTED DIRECTLY)
// ============================================================================

const _state = {
  trustProfile: null,
  ethicsConstraints: null,
  monotonicTick: 0,
  importProvider: null,
  rotationHistory: [],
  eventLog: [], // ⭐ TrustCore event log
  organs: Object.freeze({
    juryFeed: null,
    juryFrame: null,
    juryCouncil: null,
    juryBoxCamera: null,
    creatorFlags: null,
    expansionCompliance: null,
    evidence: null,
    trustMeta: null
  })
};

// ============================================================================
//  EVENT RECORDER (PURE, DETERMINISTIC)
// ============================================================================

function _recordTrustEvent(kind, payload = {}) {
  try {
    const entry = Object.freeze({
      ts: _state.monotonicTick,
      kind,
      payload: Object.freeze({ ...payload })
    });

    _state.eventLog.push(entry);

    console.groupCollapsed(
      "❤️ PULSE TRUST CORE v33 - %c[PulseTrustCore] EVENT — " + kind,
      "color:#ffcc00; font-weight:bold;"
    );
    console.log("• tick:", _state.monotonicTick);
    console.log("• payload:", payload);
    console.groupEnd();

  } catch (err) {
    console.warn("❤️ PULSE TRUST CORE v33 - [PulseTrustCore] Failed to record trust event", err);
  }
}

// ============================================================================
//  PUBLIC EVENT RECORDER (SAFE, DETERMINISTIC)
// ============================================================================

function recordEvent(kind, payload = {}) {
  _recordTrustEvent(kind, payload);
}

// ============================================================================
//  UTILITIES (PURE, NON‑AI)
// ============================================================================

function _freezeProfile(profile) {
  if (!profile) return null;
  return Object.freeze({
    level: profile.level ?? 0,
    score: profile.score ?? 0,
    issuedAt: profile.issuedAt ?? 0,
    source: profile.source ?? "import",
    version: profile.version ?? "v33",
    tokenId: profile.tokenId ?? null
  });
}

function _freezeEthics(ethics) {
  if (!ethics) {
    return Object.freeze({
      forbiddenActions: [],
      softLimits: [],
      notes: null
    });
  }

  return Object.freeze({
    forbiddenActions: Array.isArray(ethics.forbiddenActions)
      ? [...ethics.forbiddenActions]
      : [],
    softLimits: Array.isArray(ethics.softLimits)
      ? [...ethics.softLimits]
      : [],
    notes: typeof ethics.notes === "string" ? ethics.notes : null
  });
}

function _validateGrant(importProvider, grant) {
  if (!importProvider || typeof importProvider.validateGrant !== "function") {
    return true;
  }
  try {
    return !!importProvider.validateGrant(grant);
  } catch {
    return false;
  }
}

function _buildTrustProfileFromGrant(grant) {
  if (!grant) {
    return _freezeProfile({
      level: 0,
      score: 0,
      issuedAt: 0,
      source: "none",
      version: "v33",
      tokenId: null
    });
  }

  return _freezeProfile({
    level: grant.level ?? 10,
    score: grant.score ?? 100,
    issuedAt: grant.issuedAt ?? (grant.serverTime ?? 0),
    source: grant.source ?? "import",
    version: grant.version ?? "v33",
    tokenId: grant.tokenId ?? null
  });
}

function _buildEthicsFromImport(importProvider) {
  if (!importProvider || typeof importProvider.getEthicsProfile !== "function") {
    return _freezeEthics(null);
  }
  try {
    const ethics = importProvider.getEthicsProfile();
    return _freezeEthics(ethics);
  } catch {
    return _freezeEthics(null);
  }
}

// ============================================================================
//  CORE INITIALIZATION / ROTATION
// ============================================================================

function _hydrateFromImports() {
  if (!_state.importProvider || typeof _state.importProvider.getTrustGrant !== "function") {

    const profile = _freezeProfile({
      level: 1,
      score: 10,
      issuedAt: _state.monotonicTick,
      source: "internal_fallback",
      version: "v33",
      tokenId: null
    });
    const ethics = _freezeEthics(null);

    _state.trustProfile = profile;
    _state.ethicsConstraints = ethics;

    _state.rotationHistory.push(Object.freeze({
      ts: _state.monotonicTick,
      reason: "no_import_provider",
      profile
    }));

    _recordTrustEvent("No_Trust_Fallback", {
      reason: "no_import_provider",
      profile
    });

    return;
  }

  let grant = null;
  try {
    grant = _state.importProvider.getTrustGrant();
  } catch {
    grant = null;
  }

  const valid = _validateGrant(_state.importProvider, grant);

  if (!valid) {
    if (_state.trustProfile) {
      _state.rotationHistory.push(Object.freeze({
        ts: _state.monotonicTick,
        reason: "invalid_import_grant_rejected",
        profile: _state.trustProfile
      }));

      _recordTrustEvent("Invalid_Import_Grant_Rejected", {
        previousProfile: _state.trustProfile
      });

      return;
    }

    const profile = _freezeProfile({
      level: 1,
      score: 10,
      issuedAt: _state.monotonicTick,
      source: "invalid_import_fallback",
      version: "v33",
      tokenId: null
    });
    const ethics = _freezeEthics(null);

    _state.trustProfile = profile;
    _state.ethicsConstraints = ethics;

    _state.rotationHistory.push(Object.freeze({
      ts: _state.monotonicTick,
      reason: "invalid_import_no_previous_profile",
      profile
    }));

    _recordTrustEvent("No_Previous_Trust_Fallback", {
      reason: "invalid_import_no_previous_profile",
      profile
    });

    return;
  }

  const profile = _buildTrustProfileFromGrant(grant);
  const ethics = _buildEthicsFromImport(_state.importProvider);

  _state.trustProfile = profile;
  _state.ethicsConstraints = ethics;

  _state.rotationHistory.push(Object.freeze({
    ts: _state.monotonicTick,
    reason: "import_grant_accepted",
    profile
  }));

  _recordTrustEvent("hydrate", {
    reason: "import_grant_accepted",
    profile
  });
}

function _ensureTrustProfile() {
  if (!_state.trustProfile) {
    _hydrateFromImports();
  }
}

// ============================================================================
//  PUBLIC API — TRUST PROFILE / ETHICS / CLOCK
// ============================================================================

function getTrustProfile() {
  _ensureTrustProfile();
  _state.monotonicTick++;

  _recordTrustEvent("Trust_Profile_Requested", {
    level: _state.trustProfile.level,
    score: _state.trustProfile.score
  });

  return _state.trustProfile;
}

function getEthicsConstraints() {
  _ensureTrustProfile();

  _recordTrustEvent("Ethics_Requested", {
    forbiddenActions: _state.ethicsConstraints.forbiddenActions.length
  });

  return _state.ethicsConstraints;
}

function getDeterministicTimestamp() {
  _ensureTrustProfile();
  _state.monotonicTick++;

  const base = _state.trustProfile.issuedAt ?? 0;
  const ts = base + _state.monotonicTick;

  _recordTrustEvent("Moment_Recalled", { ts });

  return ts;
}

// ============================================================================
//  PUBLIC API — IMPORT PROVIDER / ROTATION
// ============================================================================

function configureImportProvider(importProvider) {
  _state.importProvider = importProvider || null;

  _recordTrustEvent("Import_Provider_Configured", {
    provider: !!importProvider
  });
}

function validateOrRotateTrust() {
  _ensureTrustProfile();

  const profile = _state.trustProfile;

  const basicBroken =
    (profile.level ?? 0) <= 0 ||
    (profile.score ?? 0) <= 0;

  let revoked = false;
  if (_state.importProvider && typeof _state.importProvider.validateGrant === "function") {
    try {
      revoked = !_state.importProvider.validateGrant({
        level: profile.level,
        score: profile.score,
        issuedAt: profile.issuedAt,
        source: profile.source,
        version: profile.version,
        tokenId: profile.tokenId
      });
    } catch {
      revoked = false;
    }
  }

  if (basicBroken || revoked) {
    _state.rotationHistory.push(Object.freeze({
      ts: _state.monotonicTick,
      reason: basicBroken ? "basic_broken" : "revoked_by_import_provider",
      previousProfile: profile
    }));

    _recordTrustEvent("Trust_Rotation", {
      reason: basicBroken ? "basic_broken" : "revoked_by_import_provider",
      previousProfile: profile
    });

    _hydrateFromImports();
  } else {
    _recordTrustEvent("Trust_Validated", {
      level: profile.level,
      score: profile.score
    });
  }

  return _state.trustProfile;
}

// ============================================================================
//  PUBLIC API — ORGAN REGISTRY (META‑ONLY)
// ============================================================================

function registerOrgans(orgs = {}) {
  _state.organs = Object.freeze({
    juryFeed: orgs.juryFeed || null,
    juryFrame: orgs.juryFrame || null,
    juryCouncil: orgs.juryCouncil || null,
    juryBoxCamera: orgs.juryBoxCamera || null,
    creatorFlags: orgs.creatorFlags || null,
    expansionCompliance: orgs.expansionCompliance || null,
    evidence: orgs.evidence || null,
    trustMeta: orgs.trustMeta || null
  });

  _recordTrustEvent("Organs_Registered", {
    organs: Object.keys(orgs)
  });
}

function getOrgans() {
  return _state.organs;
}

// ============================================================================
//  PUBLIC API — SNAPSHOTS / EVENTS / ER‑READY
// ============================================================================

function snapshotTrustCore() {
  _ensureTrustProfile();

  const snap = Object.freeze({
    meta: PulseWorldTrustCoreMeta_v33,
    schema: PulseWorldTrustCoreMeta_v33.schema,
    ts: getDeterministicTimestamp(),
    trustProfile: _state.trustProfile,
    ethicsConstraints: _state.ethicsConstraints,
    monotonicTick: _state.monotonicTick,
    organs: _state.organs,
    rotationHistory: Object.freeze([..._state.rotationHistory]),
    events: Object.freeze([..._state.eventLog])
  });

  _recordTrustEvent("Moment_Witnessed", {
    tick: _state.monotonicTick
  });

  return snap;
}

function getTrustEvents() {
  return Object.freeze([..._state.eventLog]);
}

// ============================================================================
//  EXPORT — SINGLETON STYLE + NAMESPACED
// ============================================================================

export const PulseWorldTrustCore = Object.freeze({
  meta: PulseWorldTrustCoreMeta_v33,

  recordEvent, // ⭐ PUBLIC EVENT RECORDER

  getTrustProfile,
  getEthicsConstraints,
  getDeterministicTimestamp,

  configureImportProvider,
  validateOrRotateTrust,

  registerOrgans,
  getOrgans,

  snapshotTrustCore,
  getTrustEvents
});

export default PulseWorldTrustCore;

PulseRealm.PulseWorldTrustCore = PulseWorldTrustCore;
