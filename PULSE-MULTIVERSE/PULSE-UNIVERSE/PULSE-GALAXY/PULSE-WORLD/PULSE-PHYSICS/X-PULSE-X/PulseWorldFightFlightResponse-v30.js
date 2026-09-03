// ============================================================================
//  PULSE OS — PulseWorldFightFlightResponse v40‑IMMORTAL‑PORTAL‑REFLEX++
//  DUAL‑v40 ADRENAL REFLEX LOOP — “ACT NOW” + AI CONSOLE + BINARY ONEBAND + CNS
//  White/Silver Organ • Reflex • Renewal • Non‑Interference
//  PURE REFLEX. ZERO COGNITION. ZERO NETWORK. ZERO BACKEND.
//  NO TIMERS. NO AUTONOMY. CNS / PORTAL‑TRIGGERED ONLY.
//  IMMORTAL‑INTEL HASH DOCTRINE + DUAL‑BAND (symbolic + binary‑oneband)
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


import {
  PulseVitalsLogger,
  PulseVitalsMonitor,
  PulseUIFlow,
  PulseUIErrors,
  log,
  warn,
  error,
  PulseProofReflex,
  PulseUIRouteMemory,
  PulsePageScanner
} from "../../../../../_PROOF/PULSE-PROOF.js";

import {
  createPulseOSCNSNervousSystem as PulseCNSNervousSystem
} from "../../PULSE-PHYSICS/PULSE-OS/PulseOSCNSNervousSystem-v30.js";

export const PulseWorldFightFlightResponseMetaV40 = Object.freeze({
  version: "v40-IMMORTAL-PORTAL-REFLEX-CNS",
  organId: "PulseWorldFightFlightResponse",
  band: "dual",
  role: "reflex",
  safetyContract: Object.freeze({
    network: "none",
    timers: "none",
    filesystem: "none",
    backend: "none",
    cognition: "none",
    determinism: "strict",
    cnsIntegration: "v40"
  })
});

export const ACTNOW_CONTEXT_V40 = Object.freeze({
  band: "dual",
  mode: "reflex-only",
  source: "PulseWorld",
  safetyMode: "strict",
  version: PulseWorldFightFlightResponseMetaV40.version,
  cnsMode: "integrated",
  cnsVersion: "v40"
});

// ============================================================================
//  HASH DOCTRINE — IMMORTAL v40 (classic + intel)
// ============================================================================

function classicHash(str = "") {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function intelHash(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function dualHash(label, intelPayload, classicString) {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intel = intelHash(intelBase);
  const classic = classicHash(`${label}::${classicString || ""}`);
  return { intel, classic };
}

// ============================================================================
//  CNS → Fight‑or‑Flight Integration Helper (v40)
// ============================================================================

function integrateCNSIntoFightFlight(cnsPacket = null) {
  if (!cnsPacket) return null;

  return {
    fate: cnsPacket.fate || "ok",
    severity: cnsPacket.severity || 0,
    driftSignature: cnsPacket.driftSignature || "",
    tier: cnsPacket.tier || "",
    degraded: !!cnsPacket.degraded
  };
}

function resolveCNSContextFromSystem() {
  if (!PulseCNSNervousSystem) return null;

  try {
    if (typeof PulseCNSNervousSystem.getCurrentState === "function") {
      const state = PulseCNSNervousSystem.getCurrentState();
      return integrateCNSIntoFightFlight(state || null);
    }

    if (PulseCNSNervousSystem.current) {
      return integrateCNSIntoFightFlight(PulseCNSNervousSystem.current);
    }
  } catch {
    // reflex must not throw
  }

  return null;
}

// ============================================================================
//  HELPERS — deterministic packet signature (v40)
// ============================================================================

function buildActNowSignatureFromPacketV40(packet = {}) {
  const profileId =
    (packet.profile && (packet.profile.id || packet.profile.chunkProfile)) ||
    "unknown-profile";

  const laneCount =
    (packet.profile && packet.profile.lanes) ||
    packet.lanes ||
    1;

  const chunkCount = Array.isArray(packet.chunks)
    ? packet.chunks.length
    : 0;

  const payloadHashBase = JSON.stringify(packet.chunks || []);
  const payloadHash = intelHash({ kind: "ActNowChunks", payloadHashBase });

  const reason = packet.reason || "compiler_chunk_update";
  const source = packet.source || "PulseWorld";

  const cnsFate = packet.cns?.fate || "ok";
  const cnsSeverity = packet.cns?.severity || 0;
  const cnsDrift = packet.cns?.driftSignature || "";
  const cnsTier = packet.cns?.tier || "";
  const cnsDegraded = !!packet.cns?.degraded;

  const intelPayload = {
    profileId,
    laneCount,
    chunkCount,
    payloadHash,
    reason,
    source,
    cnsFate,
    cnsSeverity,
    cnsDrift,
    cnsTier,
    cnsDegraded
  };

  const classicString =
    `ACTNOW_v40::PROFILE:${profileId}` +
    `::LANES:${laneCount}` +
    `::CHUNKS:${chunkCount}` +
    `::REASON:${reason}` +
    `::SOURCE:${source}` +
    `::CNS_FATE:${cnsFate}` +
    `::CNS_SEVERITY:${cnsSeverity}` +
    `::CNS_DRIFT:${cnsDrift}` +
    `::CNS_TIER:${cnsTier}` +
    `::CNS_DEGRADED:${cnsDegraded}`;

  const sig = dualHash("PULSE_ACTNOW_PACKET_v40", intelPayload, classicString);

  return Object.freeze({
    profileId,
    laneCount,
    chunkCount,
    payloadHash,
    reason,
    source,
    cnsFate,
    cnsSeverity,
    cnsDrift,
    cnsTier,
    cnsDegraded,
    signatures: {
      intel: sig.intel,
      classic: sig.classic
    }
  });
}

// ============================================================================
//  ROUTE / PAGE CHANGE MAPPING — SendOff / Challenge / Nebula + CNS
// ============================================================================

function resolveRouteChangeFromReason(reason = "", intent = "", route = "", cnsFate = "") {
  const r = String(reason || "").toLowerCase();
  const i = String(intent || "").toLowerCase();
  const f = String(cnsFate || "").toLowerCase();

  const base = {
    targetKind: "none",
    targetRouteId: route || "unknown",
    targetBlueprintId: null
  };

  // CNS fate has priority
  if (f === "sendoff") {
    return {
      targetKind: "PulseWorldSendOff",
      targetRouteId: "pulseworld_sendoff",
      targetBlueprintId: "blueprint_pulseworld_sendoff_v40"
    };
  }

  if (f === "challenge") {
    return {
      targetKind: "PulseWorldChallenge",
      targetRouteId: "pulseworld_challenge",
      targetBlueprintId: "blueprint_pulseworld_challenge_v40"
    };
  }

  if (f === "nebula") {
    return {
      targetKind: "PulseWorldNebula",
      targetRouteId: "pulseworld_nebula",
      targetBlueprintId: "blueprint_pulseworld_nebula_v40"
    };
  }

  if (f === "404") {
    return {
      targetKind: "PulseWorldNebula",
      targetRouteId: "pulseworld_nebula",
      targetBlueprintId: "blueprint_pulseworld_nebula_v40"
    };
  }

  // Legacy reason/intent mapping
  if (r.includes("sendoff") || i.includes("sendoff")) {
    return {
      targetKind: "PulseWorldSendOff",
      targetRouteId: "pulseworld_sendoff",
      targetBlueprintId: "blueprint_pulseworld_sendoff_v40"
    };
  }

  if (r.includes("challenge") || i.includes("challenge")) {
    return {
      targetKind: "PulseWorldChallenge",
      targetRouteId: "pulseworld_challenge",
      targetBlueprintId: "blueprint_pulseworld_challenge_v40"
    };
  }

  if (r.includes("nebula") || i.includes("nebula")) {
    return {
      targetKind: "PulseWorldNebula",
      targetRouteId: "pulseworld_nebula",
      targetBlueprintId: "blueprint_pulseworld_nebula_v40"
    };
  }

  if (r.includes("error") || r.includes("drift")) {
    return {
      targetKind: "PulseWorldNebula",
      targetRouteId: "pulseworld_nebula",
      targetBlueprintId: "blueprint_pulseworld_nebula_v40"
    };
  }

  return base;
}

// ============================================================================
//  NARRATIVE BUILDER — AI Console message fabric (v40)
// ============================================================================

function buildNarrativeV40({ packet, signature, event, routeChange }) {
  const route = packet.route || "unknown";
  const intent = packet.intent || "compile";
  const profileId = signature.profileId || "unknown-profile";
  const chunkCount = signature.chunkCount ?? 0;

  const summary =
    `Pulse v40: Evolving route "${route}" for intent "${intent}" ` +
    `(profile: ${profileId}, chunks: ${chunkCount}).`;

  const integrityHint =
    (event.analysis && (event.analysis.integrityStatus || event.analysis.status)) ||
    "unknown";

  const healingHint =
    (event.report && (event.report.healingPlan && event.report.healingPlan.kind)) ||
    event.report?.renewalKind ||
    "frontend_hot_swap";

  const bandHint =
    (event.dualBandContext && event.dualBandContext.band) ||
    "dual";

  const routeHint = routeChange
    ? {
        targetKind: routeChange.targetKind,
        targetRouteId: routeChange.targetRouteId,
        targetBlueprintId: routeChange.targetBlueprintId
      }
    : null;

  const cnsHint = {
    fate: signature.cnsFate,
    severity: signature.cnsSeverity,
    driftSignature: signature.cnsDrift,
    tier: signature.cnsTier,
    degraded: signature.cnsDegraded
  };

  return Object.freeze({
    summary,
    integrityHint,
    healingHint,
    bandHint,
    route,
    intent,
    profileId,
    chunkCount,
    signatures: signature.signatures || null,
    routeHint,
    cnsHint
  });
}

// ============================================================================
//  FACTORY — Dual v40 Reflex Organ (ACTNow + Runtime + AI Console + Binary + CNS)
// ============================================================================

export function createPulseWorldFightFlightResponseV40({
  PulseImmunity,
  PulseSurgeonGeneral,
  PulseAIConsole,    // v30 or v33/v40 console organ
  PulseUIRuntime,    // optional, for runtime-aware hints + page changes
  PulseWorldSendOff, // optional page orchestrators
  PulseWorldChallenge,
  PulseWorldNebula
} = {}) {
  if (!PulseImmunity || !PulseSurgeonGeneral) {
    throw new Error("FightFlight v40: PulseImmunity and PulseSurgeonGeneral are required.");
  }

  // ------------------------------------------------------------------------
  // PAGE CHANGE DRIVER — SendOff / Challenge / Nebula + Runtime + CNS
  // ------------------------------------------------------------------------
  function drivePageChange(routeChange, packet, signature) {
    if (!routeChange || routeChange.targetKind === "none") return;

    const kind = routeChange.targetKind;

    if (PulseUIRuntime && typeof PulseUIRuntime.mountBlueprint === "function") {
      const blueprint = {
        id: routeChange.targetBlueprintId,
        routeId: routeChange.targetRouteId,
        layoutTree: null,
        styleBundle: null,
        animationBundle: null
      };

      try {
        PulseUIRuntime.mountBlueprint({ blueprint });
      } catch {
        // never throw from reflex
      }
    }

    try {
      if (kind === "PulseWorldSendOff" && PulseWorldSendOff) {
        if (typeof PulseWorldSendOff.onActNowSendOff === "function") {
          PulseWorldSendOff.onActNowSendOff({
            routeId: routeChange.targetRouteId,
            profileId: signature.profileId,
            reason: signature.reason,
            source: signature.source,
            cnsFate: signature.cnsFate,
            packet
          });
        }
      }

      if (kind === "PulseWorldChallenge" && PulseWorldChallenge) {
        if (typeof PulseWorldChallenge.onActNowChallenge === "function") {
          PulseWorldChallenge.onActNowChallenge({
            routeId: routeChange.targetRouteId,
            profileId: signature.profileId,
            reason: signature.reason,
            source: signature.source,
            cnsFate: signature.cnsFate,
            packet
          });
        }
      }

      if (kind === "PulseWorldNebula" && PulseWorldNebula) {
        if (typeof PulseWorldNebula.onActNowNebula === "function") {
          PulseWorldNebula.onActNowNebula({
            routeId: routeChange.targetRouteId,
            profileId: signature.profileId,
            reason: signature.reason,
            source: signature.source,
            cnsFate: signature.cnsFate,
            packet
          });
        }
      }
    } catch {
      // reflex must not throw
    }
  }

  // ------------------------------------------------------------------------
  // AI CONSOLE ANNOUNCEMENT (v40, deterministic)
// ------------------------------------------------------------------------
  function announceToAIConsole(narrative) {
    if (!PulseAIConsole) return;

    const line = narrative.summary || "Pulse v40: Evolution event triggered.";

    try {
      if (typeof PulseAIConsole.onSystemNarration === "function") {
        PulseAIConsole.onSystemNarration(line, {
          route: narrative.route,
          intent: narrative.intent,
          profileId: narrative.profileId,
          chunkCount: narrative.chunkCount,
          integrityHint: narrative.integrityHint,
          healingHint: narrative.healingHint,
          bandHint: narrative.bandHint,
          signatures: narrative.signatures || null,
          routeHint: narrative.routeHint || null,
          cnsHint: narrative.cnsHint || null
        });
        return;
      }

      if (typeof PulseAIConsole.ingestDiagnosticsSnapshot === "function") {
        PulseAIConsole.ingestDiagnosticsSnapshot({
          route: narrative.route,
          intent: narrative.intent,
          integrityHint: narrative.integrityHint,
          healingHint: narrative.healingHint,
          bandHint: narrative.bandHint,
          signatures: narrative.signatures || null,
          routeHint: narrative.routeHint || null,
          cnsHint: narrative.cnsHint || null
        });
      }

      if (typeof PulseAIConsole.ingestAdvantageFields === "function") {
        PulseAIConsole.ingestAdvantageFields({
          advantageField: { score: 1, label: "actnow_reflex" },
          speedField: { score: 1, label: "instant" },
          experienceField: { score: 1, label: "immortal_v40" },
          trueSpeedField: { score: 1, label: "reflex" },
          governorMode: {
            pulseMode: "normal",
            mindMode: "multi",
            aiMode: "active"
          }
        });
      }

      if (typeof PulseAIConsole.onUserInput === "function") {
        const routeHintStr = narrative.routeHint
          ? ` → route:${narrative.routeHint.targetRouteId} kind:${narrative.routeHint.targetKind}`
          : "";
        const cnsStr = narrative.cnsHint?.fate
          ? ` [CNS:${narrative.cnsHint.fate}/sev:${narrative.cnsHint.severity}]`
          : "";
        PulseAIConsole.onUserInput(
          `Pulse:actnow${cnsStr} ${routeHintStr} — ${line}`
        );
      }
    } catch {
      // Reflex must never throw because of console
    }
  }

  // ------------------------------------------------------------------------
  // CORE REFLEX — PURE, ZERO COGNITION (dual‑band + CNS)
// ------------------------------------------------------------------------
  function reflex(snapshot, {
    modeKind = "dual",
    triggerKind = "generic",
    dualBandContext = null,
    cnsContext = null
  } = {}) {
    if (!snapshot) return null;

    const analysis = PulseImmunity.analyze(snapshot);
    const report   = PulseSurgeonGeneral.command(analysis);

    const runtimeHint = PulseUIRuntime
      ? {
          runtimeRole: PulseUIRuntime.UIRuntimeRole?.identity || "ui.runtime",
          runtimeVersion: PulseUIRuntime.UIRuntimeRole?.version || "v40",
          mountSeq: PulseUIRuntime.RuntimeState?.mountSeq ?? 0
        }
      : null;

    return {
      ...ACTNOW_CONTEXT_V40,
      modeKind,
      triggerKind,
      kind: "AdrenalReflexEvent",
      analysis,
      report,
      dualBandContext,
      runtimeHint,
      cnsContext
    };
  }

  // ------------------------------------------------------------------------
  // ACTNOW PACKET REFLEX — WITH AI CONSOLE + PAGE CHANGE + CNS (v40)
// ------------------------------------------------------------------------
  function fromActNowPacketV40(packet, {
    modeKind = "dual",
    triggerKind = "actnow_packet",
    organismState = null,
    dualBandContext = null
  } = {}) {
    if (!packet) return null;

    let cnsContext = integrateCNSIntoFightFlight(packet.cns || null);
    if (!cnsContext) {
      cnsContext = resolveCNSContextFromSystem();
    }

    const signature = buildActNowSignatureFromPacketV40({
      ...packet,
      cns: cnsContext
    });

    const routeChange = resolveRouteChangeFromReason(
      signature.reason,
      packet.intent,
      packet.route,
      signature.cnsFate
    );

    const snapshot = Object.freeze({
      kind: "ActNowPacketSnapshotV40",
      actNowPacket: {
        profile: packet.profile || null,
        chunks: Array.isArray(packet.chunks) ? packet.chunks : [],
        payloadHash: signature.payloadHash,
        reason: signature.reason,
        source: signature.source,
        signatures: signature.signatures
      },
      dualBandContext,
      organismState,
      signature,
      route: packet.route || "unknown",
      intent: packet.intent || "compile",
      routeChange,
      cnsContext
    });

    const event = reflex(snapshot, {
      modeKind,
      triggerKind,
      dualBandContext,
      cnsContext
    });

    const diagnostics = {
      ok: true,
      profileId: signature.profileId,
      laneCount: signature.laneCount,
      chunkCount: signature.chunkCount,
      signatures: signature.signatures,
      routeChange,
      cnsFate: signature.cnsFate,
      cnsSeverity: signature.cnsSeverity,
      cnsDrift: signature.cnsDrift,
      cnsTier: signature.cnsTier,
      cnsDegraded: signature.cnsDegraded
    };

    const healingState = {
      renewalSuggested: true,
      renewalKind: "frontend_hot_swap",
      renewalBand: dualBandContext?.band || "symbolic",
      renewalProfile: signature.profileId
    };

    const narrative = buildNarrativeV40({ packet, signature, event, routeChange });

    drivePageChange(routeChange, packet, signature);
    announceToAIConsole(narrative);

    return {
      event,
      diagnostics,
      signature,
      healingState,
      narrative,
      snapshot
    };
  }

  // ------------------------------------------------------------------------
  // COMPILE SNAPSHOT REFLEX — v40 console / PulseAI + CNS
  // ------------------------------------------------------------------------
  function fromCompileSnapshotV40(compileSnapshot, {
    modeKind = "dual",
    triggerKind = "compile_snapshot",
    organismState = null,
    dualBandContext = null
  } = {}) {
    if (!compileSnapshot) return null;

    let cnsContext = integrateCNSIntoFightFlight(compileSnapshot.cns || null);
    if (!cnsContext) {
      cnsContext = resolveCNSContextFromSystem();
    }

    const packet = {
      route: compileSnapshot.route || "unknown",
      intent: compileSnapshot.intent || "compile",
      profile: compileSnapshot.profile || {
        id: compileSnapshot.profileId || "unknown-profile"
      },
      chunks: compileSnapshot.chunks || [],
      lanes: compileSnapshot.lanes || 1,
      reason: compileSnapshot.reason || "compile_snapshot",
      source: compileSnapshot.source || "PulseWorld",
      cns: cnsContext
    };

    const result = fromActNowPacketV40(packet, {
      modeKind,
      triggerKind,
      organismState,
      dualBandContext
    });

    return {
      ...result,
      compileSnapshot
    };
  }

  return Object.freeze({
    meta: PulseWorldFightFlightResponseMetaV40,
    context: ACTNOW_CONTEXT_V40,

    reflex,
    fromActNowPacket: fromActNowPacketV40,
    fromCompileSnapshot: fromCompileSnapshotV40
  });
}

export default createPulseWorldFightFlightResponseV40;

PulseRealm.WorldFightFlightResponse = {
  createPulseWorldFightFlightResponseV40,
  PulseWorldFightFlightResponseMetaV40,
  ACTNOW_CONTEXT_V40
};
