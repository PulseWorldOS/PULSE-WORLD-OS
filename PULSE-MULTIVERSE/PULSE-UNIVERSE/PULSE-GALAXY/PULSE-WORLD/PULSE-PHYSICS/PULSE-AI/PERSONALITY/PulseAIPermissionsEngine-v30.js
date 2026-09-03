// ============================================================================
//  PULSE OS v30‑IMMORTAL++ — PERMISSIONS ENGINE
//  Dual‑Band Safety Contract • Deterministic • Drift‑Proof • Trust‑Aware
//  PURE CONTRACT ORACLE. ZERO MUTATION. ZERO RANDOMNESS.
//  META‑STRIPPED • IDENTITY‑PRESERVING • PULSE‑BINARY READY.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import { getPermissionsForPersona, ForbiddenActions } from "./PulseAIPermissions-v30.js";

// ============================================================================
//  INTERNAL HELPERS
// ============================================================================
function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function extractTrustSignals(trustArtery = {}) {
  return {
    honeypotRisk: trustArtery.honeypotRisk ?? 0,
    dominanceRisk: trustArtery.dominanceRisk ?? 0,
    anomalyScore: trustArtery.anomalyScore ?? 0
  };
}

function bucketRisk(v) {
  if (v >= 0.9) return "severe";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

// v30 packet emitter: no PermissionsMeta, no Date.now
function emitPermissionsPacket(type, payload = {}) {
  return Object.freeze({
    packetType: `permissions-${type}`,
    timestamp: 0,
    layer: "permissions-engine",
    role: "contract-oracle",
    ...payload
  });
}

// Optional: PulseBinary / IndexedDB‑style adapter
async function writePulseBinaryLog(adapter, kind, payload) {
  if (!adapter || typeof adapter.write !== "function") return false;
  const safePayload = Object.freeze({ ...payload });
  const keySeed = `${kind}::${safePayload.packetType || "permissions"}::${safePayload.persona || ""}::${safePayload.action || ""}`;
  const docId = `perm-${Math.abs(
    keySeed.split("").reduce((a, c, i) => (a + c.charCodeAt(0) * (i + 1)) % 1000003, 0)
  )}`;
  return adapter.write(`PERMISSIONS_LOGS/${docId}`, safePayload);
}

// ============================================================================
//  PREWARM — v30 IMMORTAL++
// ============================================================================
export function prewarmPermissionsEngine({
  trace = false,
  trustFabric = null,
  juryFrame = null,
  pulseBinaryAdapter = null
} = {}) {
  const packet = emitPermissionsPacket("prewarm", {
    message: "Permissions engine prewarmed and lineage oracle aligned."
  });

  trustFabric.recordPermissionsPrewarm({});
  juryFrame.recordEvidence("permissions-prewarm", packet);
  writePulseBinaryLog(pulseBinaryAdapter, "prewarm", packet);

  if (trace) console.log("[PermissionsEngine v30] prewarm", packet);
  return packet;
}

// ============================================================================
//  PERMISSIONS ENGINE — v30‑IMMORTAL++ (META‑STRIPPED, IDENTITY‑PRESERVING)
// ============================================================================
export function createPermissionsEngine({
  context = {},
  trustFabric = null,
  juryFrame = null,
  pulseBinaryAdapter = null
} = {}) {
  const userIsOwner = context.userIsOwner === true;
  const lineage = context.lineage || null;
  const identity = context.identity || null;

  // --------------------------------------------------------------------------
  //  IMMORTAL: lineage‑aware permission drift correction
  // --------------------------------------------------------------------------
  function applyLineageDrift(basePerms) {
    if (!lineage || !Array.isArray(lineage.changes)) return basePerms;

    const drifted = new Set(lineage.changes.map(c => c.capability));
    const corrected = { ...basePerms };

    for (const cap of drifted) {
      if (corrected[cap] === true) corrected[cap] = false;
    }

    return corrected;
  }

  // --------------------------------------------------------------------------
  //  RESOLVE — persona → base permissions → lineage → forbidden actions
  // --------------------------------------------------------------------------
  function resolve(personaId) {
    const persona = personaId || "neutral";

    const base = getPermissionsForPersona(persona, userIsOwner);
    const lineageCorrected = applyLineageDrift(base);

    const merged = Object.freeze({
      ...lineageCorrected,
      ...ForbiddenActions
    });

    const packet = emitPermissionsPacket("resolve", {
      persona,
      ownerMode: userIsOwner === true,
      lineageAware: !!lineage,
      identity
    });

    trustFabric.recordPermissionsResolve({
      persona,
      ownerMode: userIsOwner === true,
      lineageAware: !!lineage,
      identity
    });

    juryFrame.recordEvidence("permissions-resolve", packet);
    writePulseBinaryLog(pulseBinaryAdapter, "resolve", packet);

    return merged;
  }

  // --------------------------------------------------------------------------
  //  CHECK — deterministic capability check (trust‑aware)
// --------------------------------------------------------------------------
  function check(personaId, action, { trustArtery = {} } = {}) {
    const perms = resolve(personaId);
    const allowed = perms[action] === true;

    const trust = extractTrustSignals(trustArtery);
    const risk = Math.max(
      trust.honeypotRisk,
      trust.dominanceRisk,
      trust.anomalyScore
    );
    const riskBucket = bucketRisk(risk);

    const packet = emitPermissionsPacket("check", {
      persona: personaId || "neutral",
      action,
      allowed,
      trustRisk: risk,
      trustRiskBucket: riskBucket,
      trustSignals: trust,
      identity
    });

    trustFabric.recordPermissionsCheck({
      persona: personaId || "neutral",
      action,
      allowed,
      trustRisk: risk,
      trustRiskBucket: riskBucket,
      identity
    });

    juryFrame.recordEvidence("permissions-check", packet);
    writePulseBinaryLog(pulseBinaryAdapter, "check", packet);

    return allowed;
  }

  // --------------------------------------------------------------------------
  //  CAPABILITY ARTERY SNAPSHOT — window-safe, aggregate only
  // --------------------------------------------------------------------------
  function capabilityArterySnapshot(personaId) {
    const persona = personaId || "neutral";
    const perms = resolve(persona);

    let allowedCount = 0;
    let forbiddenCount = 0;

    for (const [k, v] of Object.entries(perms)) {
      if (k in ForbiddenActions) {
        if (ForbiddenActions[k] === false) forbiddenCount += 1;
      } else if (v === true) {
        allowedCount += 1;
      }
    }

    const budget = Math.max(
      0,
      Math.min(1, allowedCount / (allowedCount + forbiddenCount || 1))
    );
    const bucket = bucketLevel(budget);

    const artery = Object.freeze({
      organism: {
        budget,
        budgetBucket: bucket
      },
      persona: {
        id: persona,
        ownerMode: userIsOwner === true
      },
      forbidden: {
        count: forbiddenCount
      },
      identity
    });

    const packet = emitPermissionsPacket("artery", {
      persona,
      organismBudget: budget,
      budgetBucket: bucket,
      identity
    });

    trustFabric.recordPermissionsArtery({
      persona,
      budget,
      bucket,
      identity
    });

    juryFrame.recordEvidence("permissions-artery", packet);
    writePulseBinaryLog(pulseBinaryAdapter, "artery", packet);

    return artery;
  }

  // --------------------------------------------------------------------------
  //  WINDOW‑SAFE SNAPSHOT — v30
  // --------------------------------------------------------------------------
  function snapshot() {
    const snap = Object.freeze({
      version: "v30",
      lineageAware: !!lineage,
      ownerMode: userIsOwner === true,
      identity
    });

    const packet = emitPermissionsPacket("snapshot", snap);

    trustFabric.recordPermissionsSnapshot({
      ownerMode: userIsOwner === true,
      lineageAware: !!lineage,
      identity
    });

    juryFrame.recordEvidence("permissions-snapshot", packet);
    writePulseBinaryLog(pulseBinaryAdapter, "snapshot", packet);

    return packet;
  }

  // --------------------------------------------------------------------------
  //  IMMORTAL++ ENGINE EXPORT
  // --------------------------------------------------------------------------
  return Object.freeze({
    descriptor: Object.freeze({
      kind: "PermissionsEngine",
      version: "v30",
      role: "contract-oracle"
    }),
    resolve,
    check,
    snapshot,
    capabilityArterySnapshot
  });
}

PulseRealm.PulseAIPermissionsEngine = createPermissionsEngine;