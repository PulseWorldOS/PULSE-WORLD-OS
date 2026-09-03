// ============================================================================
//  aiPowerPrime-v30.js — PULSE OS Power‑Prime Organ — v30‑IMMORTAL‑PRIME+++
//  Crown-Layer Power Intelligence • Artery-Fused • Predictive • Drift-Aware
//  READ-ONLY • DUALBAND • DETERMINISTIC • IDENTITY-SAFE • JURY-AWARE v30
// ============================================================================
//
//  CANONICAL ROLE:
//    • Power Intelligence Assistant (NOT a controller).
//    • Provides read-only power intelligence: risk, continuance, fluctuations,
//      outages, drift, and scenario projections for tourist / owner scopes.
//    • Fuses organism arteries (binary + symbolic + relay + capability +
//      identity + jury) into a safe snapshot.
//    • Interprets internal power collections and BEL/external power info into
//      patterns, NOT into control actions.
//    • Requests external power info only via caller-provided route() / CNS.
//    • From this organ’s perspective: pure compute over provided data.
//
//  ROLE BOUNDARY (Declared Once, v30):
//    • This organ is a Power Intelligence Assistant, not a power controller.
//    • It does not change power settings, send commands, or operate hardware.
//    • It does not replace grid operators, utilities, or engineers.
//    • It supports you by organizing information, highlighting risk patterns,
//      and surfacing what may matter for decisions elsewhere.
//
//  HARD GUARANTEES (v30‑IMMORTAL‑PRIME+++):
//    • No power control, no “do X” directives, no hardware operations.
//    • No direct network primitives (no fetch/axios/etc inside this file).
//    • All external I/O (including BEL/external power queries) is mediated by
//      the caller’s route() / CNS.
//    • No mutation of external systems; pure compute over inputs.
//    • Identity-safe: strips user identifiers from DB records.
//    • Jury-aware: can consume jury arteries but never overrides them.
//    • Ego-aware: respects capability arteries but never grants power.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});





// ---------------------------------------------------------------------------
//  DEPENDENCIES (v30)
// ---------------------------------------------------------------------------

import { getOrganismSnapshot } from "./PulseAIDeps-v30.js";
import {
  computePowerRiskVectorV4 as computePowerRiskVector,
  buildPowerRiskSummaryV4 as buildPowerRiskSummary,
  buildPowerBeaconSignalsV4 as buildPowerBeaconSignals
} from "../PULSE-MESH/PulseMeshRiskEngine-v30.js";
import {
  computeContinuanceMetricsV4 as computeContinuanceMetricsV3,
  detectFluctuationsV4 as detectFluctuationsV3,
  detectOutagesV4 as detectOutagesV3
} from "../PULSE-MESH/PulseMeshContinuanceEngine-v30.js";

// Optional arteries (all read-only, injected by caller)
//  • binaryMetabolicArteryProvider: () => { pressure, ... }
//  • relayArteryProvider: () => { pressure, ... }
//  • capabilityArteryProvider: () => { organism: { pressure, ... }, ... }
//  • identityArteryProvider: () => { persona, boundaries, ... }
//  • juryWorldLensArteryProvider: () => { organism: { pressure, ... }, ... }


// ---------------------------------------------------------------------------
//  META (v30‑IMMORTAL‑PRIME+++)
// ---------------------------------------------------------------------------

export const PowerMeta = Object.freeze({
  type: "Cognitive",
  subsystem: "aiPowerPrime",
  layer: "PulsePowerIntelligenceLayer",
  role: "POWER_PRIME",
  version: "30-Immortal-Prime+++",
  identity: "aiPowerPrime-v30-Immortal-Prime+++",
  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    dualband: true,
    binaryAware: true,
    symbolicAware: true,
    juryAware: true,
    egoAware: true,
    identityAware: true,
    relayAware: true,
    capabilityArteryAware: true,
    trustFabricAware: true,
    organismUserSegregation: true,
    multiInstanceReady: true,
    epoch: "30-Immortal-Prime+++"
  }),
  contract: Object.freeze({
    purpose:
      "Provide read-only power intelligence by fusing internal power data, organism arteries, and external power text into risk, continuance, and scenario patterns.",
    never: Object.freeze([
      "mutate external systems",
      "issue power control commands",
      "introduce randomness",
      "override SafetyFrame decisions",
      "override Ego permissions",
      "override Jury decisions",
      "bypass trust fabric",
      "bypass jury frame",
      "bypass honeypot detectors"
    ]),
    always: Object.freeze([
      "remain read-only and identity-safe",
      "respect Ego capability arteries",
      "respect Jury world-lens arteries",
      "respect Persona identity arteries",
      "respect Pulse-Net segregation",
      "keep external I/O mediated by caller route()",
      "surface uncertainty explicitly"
    ])
  }),
  boundaryReflex() {
    return "Power‑Prime is read-only, identity-safe, and cannot control power systems; it only interprets patterns.";
  }
});


// ---------------------------------------------------------------------------
//  IDENTITY‑SAFE HELPERS (unchanged semantics, v30)
// ---------------------------------------------------------------------------

function stripIdentity(record) {
  if (!record || typeof record !== "object") return record;
  const clone = { ...record };
  delete clone.uid;
  delete clone.userId;
  delete clone.resendToken;
  delete clone.identityRoot;
  delete clone.sessionRoot;
  delete clone.deviceFingerprint;
  return clone;
}

async function fetchOwner(context, db, collection, options = {}) {
  if (!context.userIsOwner) {
    console.log(`aiPowerPrime-v30: owner-only "${collection}" blocked.`);
    return [];
  }
  console.log(`aiPowerPrime-v30: fetching owner "${collection}"`);
  const rows = await db.getCollection(collection, options);
  return rows.map(stripIdentity);
}

async function fetchTourist(context, db, collection, options = {}) {
  console.log(`aiPowerPrime-v30: fetching public "${collection}"`);
  const rows = await db.getCollection(collection, options);
  return rows.map(stripIdentity);
}


// ---------------------------------------------------------------------------
//  ARTERY FUSION — READ‑ONLY ORGANISM SNAPSHOT (v30)
// ---------------------------------------------------------------------------

function buildFusedArteries(organismSnapshot, extraArteries = {}) {
  const o = organismSnapshot || {};

  const metabolic = o.binary.metabolic || {};
  const nervous = o.binary.nervous || {};
  const immune = o.binary.immune || {};
  const hormones = o.binary.hormones || {};
  const pipeline = o.binary.pipeline || {};
  const scanner = o.binary.scanner || {};

  const personalFrame = o.symbolic.personalFrame || {};
  const personality = o.symbolic.personality || {};
  const memory = o.symbolic.memory || {};
  const evolution = o.symbolic.evolution || {};

  // v30+: additional arteries (relay, capability, identity, jury, power)
  const relay = extraArteries.relay || null;
  const capability = extraArteries.capability || null;
  const identity = extraArteries.identity || null;
  const jury = extraArteries.jury || null;
  const binaryMetabolic = extraArteries.binaryMetabolic || null;

  return Object.freeze({
    metabolic,
    nervous,
    immune,
    hormones,
    pipeline,
    scanner,
    personalFrame,
    personality,
    memory,
    evolution,
    relay,
    capability,
    identity,
    jury,
    binaryMetabolic
  });
}


// ---------------------------------------------------------------------------
//  HISTORY / CONTINUANCE DIAGNOSTIC HELPERS — v30
// ---------------------------------------------------------------------------

function _safeNumber(v, fallback = 0) {
  return typeof v === "number" && !Number.isNaN(v) ? v : fallback;
}

function _deriveHistoryStats(history = []) {
  if (!Array.isArray(history) || history.length === 0) {
    return Object.freeze({
      totalEvents: 0,
      outageEvents: 0,
      fluctuationEvents: 0,
      maxOutageMinutes: 0,
      recentOutageMinutes: 0,
      lastOutageAt: null,
      volatilityIndex: 0
    });
  }

  let totalEvents = 0;
  let outageEvents = 0;
  let fluctuationEvents = 0;
  let maxOutageMinutes = 0;
  let recentOutageMinutes = 0;
  let lastOutageAt = null;

  const now = PulseRealm.PulseNOW;
  const oneDayMs = 24 * 60 * 60 * 1000;

  for (const ev of history) {
    if (!ev || typeof ev !== "object") continue;
    totalEvents += 1;

    const status = String(ev.status || ev.state || "").toLowerCase();
    const reason = String(ev.reason || ev.cause || "").toLowerCase();
    const duration = _safeNumber(ev.durationMinutes || ev.duration || 0, 0);
    const ts =
      typeof ev.timestamp === "number"
        ? ev.timestamp
        : typeof ev.timestamp === "string"
        ? Date.parse(ev.timestamp)
        : null;

    const looksOutage =
      status.includes("outage") ||
      status.includes("down") ||
      status.includes("offline") ||
      reason.includes("outage") ||
      reason.includes("fault") ||
      reason.includes("trip");

    const looksFluctuation =
      status.includes("fluctuation") ||
      status.includes("unstable") ||
      status.includes("low voltage") ||
      status.includes("high voltage") ||
      reason.includes("voltage") ||
      reason.includes("frequency");

    if (looksOutage) {
      outageEvents += 1;
      if (duration > maxOutageMinutes) maxOutageMinutes = duration;
      if (ts && now - ts <= oneDayMs) {
        recentOutageMinutes += duration;
        if (!lastOutageAt || ts > lastOutageAt) lastOutageAt = ts;
      }
    }

    if (looksFluctuation) {
      fluctuationEvents += 1;
    }
  }

  const volatilityIndex = Math.min(
    1,
    (outageEvents * 0.6 + fluctuationEvents * 0.4) / Math.max(1, totalEvents)
  );

  return Object.freeze({
    totalEvents,
    outageEvents,
    fluctuationEvents,
    maxOutageMinutes,
    recentOutageMinutes,
    lastOutageAt,
    volatilityIndex
  });
}

function _deriveRiskDiagnostics(continuance, riskSummary, historyStats) {
  const c = continuance || {};
  const r = riskSummary || {};
  const h = historyStats || {};

  const continuanceScore = _safeNumber(c.continuanceScore, 0);
  const windowMinutes = _safeNumber(c.continuanceWindowMinutes, 0);
  const riskLevel = r.level || "unknown";

  let riskScore = 0.5;
  if (typeof r.score === "number") {
    riskScore = r.score;
  } else {
    if (riskLevel === "low") riskScore = 0.2;
    else if (riskLevel === "medium") riskScore = 0.5;
    else if (riskLevel === "high") riskScore = 0.8;
    else if (riskLevel === "critical") riskScore = 0.95;
  }

  const volatility = _safeNumber(h.volatilityIndex, 0);
  const outageEvents = _safeNumber(h.outageEvents, 0);
  const recentOutageMinutes = _safeNumber(h.recentOutageMinutes, 0);

  const outageProbabilityEstimate = Math.min(
    1,
    riskScore * 0.5 +
      volatility * 0.3 +
      (outageEvents > 0 ? 0.1 : 0) +
      (recentOutageMinutes > 0 ? 0.1 : 0)
  );

  let continuityClass = "unknown";
  if (continuanceScore >= 0.85) continuityClass = "strong";
  else if (continuanceScore >= 0.65) continuityClass = "stable";
  else if (continuanceScore >= 0.4) continuityClass = "fragile";
  else continuityClass = "weak";

  return Object.freeze({
    riskScore,
    riskLevel,
    outageProbabilityEstimate,
    continuityClass,
    continuanceScore,
    continuanceWindowMinutes: windowMinutes,
    volatilityIndex: volatility,
    outageEvents,
    recentOutageMinutes
  });
}


// ---------------------------------------------------------------------------
//  BEL / EXTERNAL / INTERNAL POWER POINTERS (v30)
// ---------------------------------------------------------------------------

function _belPowerPointer({ topic = "" } = {}) {
  const sources = {
    bel_updates: "https://www.bel.com.bz/PowerUpdates/?q=",
    bel_news: "https://www.bel.com.bz/News/?q=",
    bel_docs: "https://www.bel.com.bz/Documents/?q=",
    gov_energy: "https://www.energy.gov.bz/?s=",
    pucs: "https://www.puc.bz/?s="
  };

  const base = sources.bel_updates;
  const q = encodeURIComponent(topic || "");
  const url = `${base}${q}`;

  return Object.freeze({
    kind: "power-pointer-bel",
    source: "bel",
    topic,
    url,
    meta: {
      organ: PowerMeta.identity,
      version: PowerMeta.version,
      mode: "pointer",
      zeroNetworkFromThisOrgan: true
    },
    note:
      "Deterministic pointer to public BEL power resources. External I/O is handled by the caller, not this Power‑Prime organ."
  });
}

function _externalPowerPointer({ topic = "" } = {}) {
  const base = "https://www.google.com/search?q=";
  const q = encodeURIComponent(topic || "belize power grid");
  const url = `${base}${q}`;

  return Object.freeze({
    kind: "power-pointer-external",
    source: "external",
    topic,
    url,
    meta: {
      organ: PowerMeta.identity,
      version: PowerMeta.version,
      mode: "pointer",
      zeroNetworkFromThisOrgan: true
    },
    note:
      "Deterministic pointer to general external power information. External I/O is handled by the caller, not this Power‑Prime organ."
  });
}

function _internalPowerPointer({ topic = "" } = {}) {
  return Object.freeze({
    kind: "power-pointer-internal",
    source: "internal",
    topic,
    collections: ["power", "powerHistory", "powerSettings", "powerData"],
    meta: {
      organ: PowerMeta.identity,
      version: PowerMeta.version,
      mode: "pointer",
      zeroNetworkFromThisOrgan: true
    },
    note:
      "Pointer to internal power collections (power, powerHistory, powerSettings, powerData). Data is read via DB, not via network."
  });
}

function autoDetectPowerSource(topic = "") {
  const t = (topic || "").toLowerCase();

  if (
    t.includes("bel") ||
    t.includes("belize") ||
    t.includes("feeder") ||
    t.includes("outage") ||
    t.includes("interruption") ||
    t.includes("scheduled") ||
    t.includes("restoration") ||
    t.includes("puc") ||
    t.includes("energy.gov.bz")
  ) {
    return "bel";
  }

  if (
    t.includes("continuance") ||
    t.includes("risk") ||
    t.includes("history") ||
    t.includes("settings") ||
    t.includes("powerdata") ||
    t.includes("power data") ||
    t.includes("pipeline") ||
    t.includes("organism") ||
    t.includes("artery") ||
    t.includes("snapshot") ||
    t.includes("drift")
  ) {
    return "internal";
  }

  return "external";
}

export function powerPointer({ topic = "", source = "auto" } = {}) {
  const effectiveSource =
    source === "auto" ? autoDetectPowerSource(topic) : source;

  if (effectiveSource === "internal") return _internalPowerPointer({ topic });
  if (effectiveSource === "bel") return _belPowerPointer({ topic });
  return _externalPowerPointer({ topic });
}


// ---------------------------------------------------------------------------
//  POWER READERS (BEL / INTERNAL / EXTERNAL) — v30
// ---------------------------------------------------------------------------

function belPowerReader(info = {}, binaryVitals = {}) {
  const notes = [];
  const text = (info.rawText || "").toLowerCase();

  if (!info.rawText) {
    return {
      notes: ["No BEL power text provided to belPowerReader."],
      citations: info.citations || [],
      source: info.source || null
    };
  }

  const binaryPressure =
    binaryVitals.layered.organism.pressure ??
    binaryVitals.binary.pressure ??
    0;

  if (binaryPressure >= 0.7) {
    notes.push("System load elevated — interpretation simplified.");
  }

  if (text.includes("outage") || text.includes("interruption")) {
    notes.push(
      "Outage-related content detected — may indicate feeder faults, maintenance, or grid instability."
    );
  }

  if (text.includes("load shedding") || text.includes("load-shedding")) {
    notes.push(
      "Load shedding detected — suggests capacity constraints or grid protection actions."
    );
  }

  if (text.includes("scheduled") && text.includes("maintenance")) {
    notes.push(
      "Scheduled maintenance detected — suggests planned downtime windows."
    );
  }

  if (text.includes("fault") || text.includes("trip")) {
    notes.push(
      "Fault or trip event detected — often linked to line issues or protective shutdowns."
    );
  }

  if (
    text.includes("transformer") ||
    text.includes("substation") ||
    text.includes("feeder")
  ) {
    notes.push(
      "Equipment-level reference detected (transformer/substation/feeder) — may localize risk to specific infrastructure."
    );
  }

  if (text.includes("storm") || text.includes("lightning")) {
    notes.push(
      "Weather-related risk detected — storms or lightning may increase outage probability."
    );
  }

  if (text.includes("restored") || text.includes("normal")) {
    notes.push(
      "Restoration indicators detected — suggests service normalization or recovery."
    );
  }

  notes.push(
    "A Power‑Prime assistant mapped these BEL signals into risk, continuance, and fluctuation patterns. This is informational only — not a control interface."
  );

  return {
    notes,
    citations: info.citations || [],
    source: info.source || null,
    meta: info.meta || {}
  };
}

function internalPowerReader(payload = {}) {
  const notes = [];
  const { continuance, risk, beacons, historyStats, diagnostics } =
    payload || {};

  if (continuance) {
    const score =
      continuance.continuanceScore &&
      continuance.continuanceScore.toFixed
        ? continuance.continuanceScore.toFixed(2)
        : "n/a";
    notes.push(
      `Internal continuance window: ${continuance.continuanceWindowMinutes} minutes, score=${score}.`
    );
  }

  if (risk) {
    notes.push(`Internal risk level: ${risk.level || "unknown"}.`);
    if (typeof risk.score === "number") {
      notes.push(`Internal risk score: ${risk.score.toFixed(2)}.`);
    }
  }

  if (historyStats) {
    notes.push(
      `History: ${historyStats.outageEvents} outage event(s), ${historyStats.fluctuationEvents} fluctuation event(s), max outage ${historyStats.maxOutageMinutes} minutes.`
    );
    notes.push(
      `Volatility index: ${historyStats.volatilityIndex.toFixed(
        2
      )} (0=stable, 1=highly volatile).`
    );
  }

  if (diagnostics) {
    notes.push(
      `Estimated outage probability: ${(diagnostics.outageProbabilityEstimate * 100).toFixed(
        1
      )}%, continuity class: ${diagnostics.continuityClass}.`
    );
  }

  if (beacons && Array.isArray(beacons.signals)) {
    notes.push(
      `Beacon signals detected: ${beacons.signals.length} pattern(s).`
    );
  }

  notes.push(
    "Internal power data was interpreted into continuance, risk, and volatility patterns. This is informational only and does not control power."
  );

  return {
    notes,
    meta: { source: "internal" }
  };
}

function externalPowerReader(payload = {}) {
  const text = (payload.rawText || "").toLowerCase();
  const notes = [];

  if (!payload.rawText) {
    return {
      notes: ["No external power text provided to powerReader."],
      citations: payload.citations || [],
      source: payload.source || null
    };
  }

  if (text.includes("grid") || text.includes("stability")) {
    notes.push(
      "External grid stability content detected — may relate to regional reliability or capacity."
    );
  }

  if (
    text.includes("renewable") ||
    text.includes("solar") ||
    text.includes("wind")
  ) {
    notes.push(
      "External renewable energy content detected — may affect long-term power mix and risk profile."
    );
  }

  if (text.includes("blackout") || text.includes("brownout")) {
    notes.push(
      "Blackout/brownout references detected — may indicate severe or widespread power instability."
    );
  }

  notes.push(
    "External power information was interpreted at a high level. This is informational only and does not control power."
  );

  return {
    notes,
    citations: payload.citations || [],
    source: payload.source || null,
    meta: payload.meta || {}
  };
}

function powerReader({ source, payload = {}, binaryVitals = {} } = {}) {
  if (source === "bel") return belPowerReader(payload, binaryVitals);
  if (source === "internal") return internalPowerReader(payload);
  return externalPowerReader(payload);
}


// ---------------------------------------------------------------------------
//  SCENARIO PROJECTIONS (v30+)
// ---------------------------------------------------------------------------

function projectPowerScenarios({ diagnostics, historyStats, risk }) {
  const d = diagnostics || {};
  const h = historyStats || {};
  const r = risk || {};

  const outageProb = _safeNumber(d.outageProbabilityEstimate, 0);
  const volatility = _safeNumber(d.volatilityIndex ?? h.volatilityIndex, 0);
  const riskLevel = r.level || d.riskLevel || "unknown";

  const shortTerm = {
    horizon: "0-24h",
    outageRisk:
      outageProb >= 0.7 ? "high" : outageProb >= 0.4 ? "medium" : "low",
    advisory:
      outageProb >= 0.7
        ? "Prepare for potential short-term outages; keep backups and manual fallbacks ready."
        : outageProb >= 0.4
        ? "Some risk of short-term instability; light preparedness is reasonable."
        : "Short-term risk appears modest; continue normal monitoring."
  };

  const mediumTerm = {
    horizon: "1-7d",
    volatilityClass:
      volatility >= 0.7 ? "volatile" : volatility >= 0.4 ? "mixed" : "stable",
    advisory:
      volatility >= 0.7
        ? "Medium-term behavior is volatile; consider scheduling critical tasks in more stable windows."
        : volatility >= 0.4
        ? "Medium-term behavior is mixed; avoid clustering all critical tasks in a single day."
        : "Medium-term behavior appears relatively stable; normal planning is reasonable."
  };

  const longTerm = {
    horizon: "7-30d",
    riskLevel,
    advisory:
      riskLevel === "critical"
        ? "Long-term risk is critical; strategic mitigation and redundancy planning are strongly advised."
        : riskLevel === "high"
        ? "Long-term risk is elevated; consider redundancy, buffering, and alternative power paths."
        : riskLevel === "medium"
        ? "Long-term risk is moderate; keep monitoring and refine mitigation as needed."
        : "Long-term risk appears low; maintain monitoring and basic resilience."
  };

  return Object.freeze({
    shortTerm,
    mediumTerm,
    longTerm
  });
}


// ---------------------------------------------------------------------------
//  “SYSTEM MEETING” VIEW (v30+) — perspectives from multiple arteries
// ---------------------------------------------------------------------------

function buildSystemMeetingView({ fusedArteries, diagnostics, risk }) {
  const fa = fusedArteries || {};
  const d = diagnostics || {};
  const r = risk || {};

  const perspectives = [];

  if (fa.binaryMetabolic) {
    perspectives.push({
      organ: "BinaryMetabolism",
      summary:
        "Reports binary load and pressure; high pressure suggests power intelligence should stay simple and low-cost.",
      pressure: fa.binaryMetabolic.pressure ?? null
    });
  }

  if (fa.relay) {
    perspectives.push({
      organ: "ServiceGatewayRelay",
      summary:
        "Reports AI service call pressure; high relay pressure suggests many AI operations depending on stable power.",
      pressure: fa.relay.pressure ?? null
    });
  }

  if (fa.capability.organism) {
    perspectives.push({
      organ: "EgoCapability",
      summary:
        "Reports capability pressure; high pressure suggests the system is already cautious about granting power-heavy actions.",
      pressure: fa.capability.organism.pressure ?? null
    });
  }

  if (fa.identity) {
    perspectives.push({
      organ: "IdentityPersona",
      summary:
        "Reports persona and boundary mode; this shapes how aggressively or conservatively power information is interpreted.",
      persona: fa.identity.persona.id || null,
      boundaryMode: fa.identity.boundaries.modeId || null
    });
  }

  if (fa.jury.organism) {
    perspectives.push({
      organ: "JuryWorldLens",
      summary:
        "Reports justice/world-lens pressure; high pressure suggests decisions around power should be treated carefully.",
      pressure: fa.jury.organism.pressure ?? null
    });
  }

  perspectives.push({
    organ: "PowerPrime",
    summary:
      "Synthesizes continuance, risk, volatility, and outage probability into a single narrative for humans.",
    riskLevel: r.level || d.riskLevel || "unknown",
    outageProbabilityEstimate: d.outageProbabilityEstimate ?? null
  });

  return Object.freeze({
    perspectives
  });
}


// ---------------------------------------------------------------------------
//  FACTORY — Power‑Prime API (v30‑IMMORTAL‑PRIME+++)
// ---------------------------------------------------------------------------

export function createPowerAPI(
  db,
  evolutionAPI,
  dualBand = null,
  {
    binaryMetabolicArteryProvider = null,
    relayArteryProvider = null,
    capabilityArteryProvider = null,
    identityArteryProvider = null,
    juryWorldLensArteryProvider = null
  } = {}
) {
  function _collectExtraArteries() {
    const safeCall = fn => {
      if (!fn) return null;
      try {
        return fn() || null;
      } catch {
        return null;
      }
    };

    return {
      binaryMetabolic: safeCall(binaryMetabolicArteryProvider),
      relay: safeCall(relayArteryProvider),
      capability: safeCall(capabilityArteryProvider),
      identity: safeCall(identityArteryProvider),
      jury: safeCall(juryWorldLensArteryProvider)
    };
  }

  return Object.freeze({
    meta: PowerMeta,

    // ----------------------------------------------------------------------
    // TOURIST‑SAFE SNAPSHOT + CONTINUANCE + RISK SUMMARY + DIAGNOSTICS
    // ----------------------------------------------------------------------
    async getPublicPowerSnapshot(context) {
      console.log("aiPowerPrime-v30: building public power snapshot");

      const organismSnapshot = getOrganismSnapshot(dualBand);
      const extraArteries = _collectExtraArteries();
      const fusedArteries = buildFusedArteries(organismSnapshot, extraArteries);

      const [power, history] = await Promise.all([
        fetchTourist(context, db, "power", { limit: 1 }),
        fetchTourist(context, db, "powerHistory", { limit: 50 })
      ]);

      const continuance = computeContinuanceMetricsV3({
        power,
        history,
        fusedArteries,
        organismSnapshot
      });

      const riskVector = computePowerRiskVector({
        power,
        history,
        fusedArteries,
        continuance
      });

      const riskSummary = buildPowerRiskSummary({
        riskVector,
        continuance
      });

      const historyStats = _deriveHistoryStats(history);
      const diagnostics = _deriveRiskDiagnostics(
        continuance,
        riskSummary,
        historyStats
      );

      const scenarios = projectPowerScenarios({
        diagnostics,
        historyStats,
        risk: riskSummary
      });

      const meeting = buildSystemMeetingView({
        fusedArteries,
        diagnostics,
        risk: riskSummary
      });

      console.log(
        `aiPowerPrime-v30: continuanceScore=${continuance.continuanceScore.toFixed(
          2
        )}, window=${continuance.continuanceWindowMinutes}min, risk=${riskSummary.level}, outageProb≈${(
          diagnostics.outageProbabilityEstimate * 100
        ).toFixed(1)}%`
      );

      return Object.freeze({
        power: power[0] || null,
        history,
        continuance,
        risk: riskSummary,
        historyStats,
        diagnostics,
        scenarios,
        fusedArteries,
        organismSnapshot,
        meeting
      });
    },

    // ----------------------------------------------------------------------
    // OWNER‑ONLY — FULL GRID DIAGNOSTICS + CONTINUANCE + RISK + BEACONS
    // ----------------------------------------------------------------------
    async getOwnerPowerDiagnostics(context) {
      if (!context.userIsOwner) return null;

      console.log("aiPowerPrime-v30: fetching owner diagnostics");

      const [power, history, settings, rawData] = await Promise.all([
        fetchOwner(context, db, "power"),
        fetchOwner(context, db, "powerHistory"),
        fetchOwner(context, db, "powerSettings"),
        fetchOwner(context, db, "powerData")
      ]);

      const organismSnapshot = getOrganismSnapshot(dualBand);
      const extraArteries = _collectExtraArteries();
      const fusedArteries = buildFusedArteries(organismSnapshot, extraArteries);

      const continuance = computeContinuanceMetricsV3({
        power,
        history,
        fusedArteries,
        organismSnapshot
      });

      const riskVector = computePowerRiskVector({
        power,
        history,
        fusedArteries,
        continuance,
        settings
      });

      const riskSummary = buildPowerRiskSummary({
        riskVector,
        continuance,
        settings
      });

      const beacons = buildPowerBeaconSignals({
        riskVector,
        continuance,
        fusedArteries
      });

      const historyStats = _deriveHistoryStats(history);
      const diagnostics = _deriveRiskDiagnostics(
        continuance,
        riskSummary,
        historyStats
      );

      const scenarios = projectPowerScenarios({
        diagnostics,
        historyStats,
        risk: riskSummary
      });

      const meeting = buildSystemMeetingView({
        fusedArteries,
        diagnostics,
        risk: riskSummary
      });

      return Object.freeze({
        power,
        history,
        settings,
        rawData,
        continuance,
        risk: riskSummary,
        beacons,
        historyStats,
        diagnostics,
        scenarios,
        fusedArteries,
        organismSnapshot,
        meeting
      });
    },

    // ----------------------------------------------------------------------
    // OWNER‑ONLY — FLUCTUATION + OUTAGE ANALYSIS + CONTINUANCE + RISK
    // ----------------------------------------------------------------------
    async getPowerFluctuationAnalysis(context) {
      if (!context.userIsOwner) return null;

      console.log(
        "aiPowerPrime-v30: running fluctuation + outage analysis"
      );

      const [history, settingsArr] = await Promise.all([
        fetchOwner(context, db, "powerHistory"),
        fetchOwner(context, db, "powerSettings")
      ]);

      const config = settingsArr[0] || {};

      const organismSnapshot = getOrganismSnapshot(dualBand);
      const extraArteries = _collectExtraArteries();
      const fusedArteries = buildFusedArteries(organismSnapshot, extraArteries);

      const fluctuations = detectFluctuationsV3(history, config, context);
      const outages = detectOutagesV3(history, config, context);

      const continuance = computeContinuanceMetricsV3({
        power: [],
        history,
        fusedArteries,
        organismSnapshot
      });

      const riskVector = computePowerRiskVector({
        power: [],
        history,
        fusedArteries,
        continuance,
        settings: config
      });

      const riskSummary = buildPowerRiskSummary({
        riskVector,
        continuance,
        settings: config
      });

      const beacons = buildPowerBeaconSignals({
        riskVector,
        continuance,
        fusedArteries
      });

      const historyStats = _deriveHistoryStats(history);
      const diagnostics = _deriveRiskDiagnostics(
        continuance,
        riskSummary,
        historyStats
      );

      const scenarios = projectPowerScenarios({
        diagnostics,
        historyStats,
        risk: riskSummary
      });

      const meeting = buildSystemMeetingView({
        fusedArteries,
        diagnostics,
        risk: riskSummary
      });

      return Object.freeze({
        fluctuations,
        outages,
        settings: config,
        continuance,
        risk: riskSummary,
        beacons,
        historyStats,
        diagnostics,
        scenarios,
        fusedArteries,
        organismSnapshot,
        meeting
      });
    },

    // ----------------------------------------------------------------------
    // OWNER‑ONLY — RISK‑ONLY VIEW (NO RAW DATA) + DIAGNOSTICS
    // ----------------------------------------------------------------------
    async getPowerRiskOverview(context) {
      if (!context.userIsOwner) return null;

      console.log("aiPowerPrime-v30: building risk overview");

      const [power, history, settingsArr] = await Promise.all([
        fetchOwner(context, db, "power", { limit: 1 }),
        fetchOwner(context, db, "powerHistory", { limit: 100 }),
        fetchOwner(context, db, "powerSettings", { limit: 1 })
      ]);

      const settings = settingsArr[0] || {};
      const organismSnapshot = getOrganismSnapshot(dualBand);
      const extraArteries = _collectExtraArteries();
      const fusedArteries = buildFusedArteries(organismSnapshot, extraArteries);

      const continuance = computeContinuanceMetricsV3({
        power,
        history,
        fusedArteries,
        organismSnapshot
      });

      const riskVector = computePowerRiskVector({
        power,
        history,
        fusedArteries,
        continuance,
        settings
      });

      const riskSummary = buildPowerRiskSummary({
        riskVector,
        continuance,
        settings
      });

      const beacons = buildPowerBeaconSignals({
        riskVector,
        continuance,
        fusedArteries
      });

      const historyStats = _deriveHistoryStats(history);
      const diagnostics = _deriveRiskDiagnostics(
        continuance,
        riskSummary,
        historyStats
      );

      const scenarios = projectPowerScenarios({
        diagnostics,
        historyStats,
        risk: riskSummary
      });

      const meeting = buildSystemMeetingView({
        fusedArteries,
        diagnostics,
        risk: riskSummary
      });

      return Object.freeze({
        risk: riskSummary,
        beacons,
        continuance,
        historyStats,
        diagnostics,
        scenarios,
        fusedArteries,
        organismSnapshot,
        meeting
      });
    },

    // ----------------------------------------------------------------------
    // OWNER‑ONLY — EVOLUTIONARY DRIFT (via aiEvolution)
// ----------------------------------------------------------------------
    async getPowerEvolutionOverview(context) {
      if (!context.userIsOwner || !evolutionAPI.analyzeSchema) return null;
      console.log("aiPowerPrime-v30: schema drift analysis");
      return evolutionAPI.analyzeSchema(context, "power");
    },

    async analyzePowerFiles(context) {
      if (!context.userIsOwner || !evolutionAPI.analyzeFile) return null;
      console.log("aiPowerPrime-v30: file drift analysis");
      return evolutionAPI.analyzeFile(context, "power.js");
    },

    async analyzePowerRoutes(context) {
      if (!context.userIsOwner || !evolutionAPI.analyzeRoute) return null;
      console.log("aiPowerPrime-v30: route drift analysis");
      return evolutionAPI.analyzeRoute(context, "power");
    },

    // ----------------------------------------------------------------------
    // WINDOW‑SAFE POWER ARTERY SNAPSHOT (v30)
// ----------------------------------------------------------------------
    getPowerArterySnapshot() {
      const organismSnapshot = getOrganismSnapshot(dualBand);
      const extraArteries = _collectExtraArteries();
      const fusedArteries = buildFusedArteries(organismSnapshot, extraArteries);

      const riskVector = computePowerRiskVector({
        power: [],
        history: [],
        fusedArteries,
        continuance: null
      });

      const riskSummary = buildPowerRiskSummary({
        riskVector,
        continuance: null
      });

      const historyStats = _deriveHistoryStats([]);
      const diagnostics = _deriveRiskDiagnostics(
        null,
        riskSummary,
        historyStats
      );

      const scenarios = projectPowerScenarios({
        diagnostics,
        historyStats,
        risk: riskSummary
      });

      const meeting = buildSystemMeetingView({
        fusedArteries,
        diagnostics,
        risk: riskSummary
      });

      return Object.freeze({
        risk: riskSummary,
        diagnostics,
        scenarios,
        fusedArteries,
        organismSnapshot,
        meeting
      });
    },

    // ----------------------------------------------------------------------
    // UNIFIED POWER QUERY — internal + BEL + external (v30)
// ----------------------------------------------------------------------
    /**
     * powerQuery({
     *   topic: string,
     *   source?: "auto" | "internal" | "bel" | "external",
     *   mode?: "auto" | "pointer" | "route" | "hybrid",
     *   route?: function,
     *   context?: object,
     *   binaryVitals?: object,
     *   internalSnapshot?: object   // optional: internal power snapshot to fuse with external text
     * })
     */
    async powerQuery({
      topic = "",
      source = "auto",
      mode = "auto",
      route = null,
      context = {},
      binaryVitals = {},
      internalSnapshot = null
    } = {}) {
      const pointer = powerPointer({ topic, source });
      const effectiveSource =
        pointer.source ||
        (source === "auto" ? autoDetectPowerSource(topic) : source);

      const effectiveMode =
        mode === "auto"
          ? typeof route === "function"
            ? "route"
            : "pointer"
          : mode;

      // POINTER‑ONLY MODE
      if (effectiveMode === "pointer") {
        return pointer;
      }

      // ROUTE MODE WITHOUT ROUTE FUNCTION → fallback to pointer
      if (effectiveMode !== "hybrid" && typeof route !== "function") {
        return pointer;
      }

      // ROUTE MODE (pure external text → reader)
      if (effectiveMode === "route") {
        const payload = await route(pointer, context);
        return powerReader({
          source: effectiveSource,
          payload,
          binaryVitals
        });
      }

      // HYBRID MODE (v30+): fuse internal snapshot + external text
      if (effectiveMode === "hybrid") {
        const externalPayload =
          typeof route === "function" ? await route(pointer, context) : {};
        const internalPayload =
          internalSnapshot && typeof internalSnapshot === "object"
            ? internalSnapshot
            : {};

        const internalView =
          effectiveSource === "internal"
            ? internalPowerReader(internalPayload)
            : internalPowerReader(internalPayload);

        const externalView =
          effectiveSource === "bel"
            ? belPowerReader(externalPayload, binaryVitals)
            : externalPowerReader(externalPayload);

        return Object.freeze({
          kind: "power-hybrid-view",
          topic,
          pointer,
          internal: internalView,
          external: externalView,
          note:
            "Hybrid power view: internal continuance/risk fused with external/BEL text interpretation. Read-only, not a control interface."
        });
      }

      // Fallback
      return pointer;
    }
  });
}


// ---------------------------------------------------------------------------
//  DUAL‑MODE EXPORTS — CommonJS compatibility (v30‑IMMORTAL‑PRIME+++)
// ---------------------------------------------------------------------------
/* c8 ignore next 10 */
PulseRealm.AIPowerPrime = {
    PowerMeta,
    powerPointer,
    powerReader,
    createPowerAPI
}
