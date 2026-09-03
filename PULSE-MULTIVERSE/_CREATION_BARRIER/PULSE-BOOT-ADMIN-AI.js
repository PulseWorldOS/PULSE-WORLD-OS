// ============================================================================
//  PULSE OS v30‑IMMORTAL‑EVO++++++ — ADMIN PANEL DIAGNOSTICS ORGAN
//  Summary Cards v7 • Issue Table v7 • Trace • Meta • Diagnostics-Artery v7
//  AI Evidence View • AI Activity View • Advantage/Speed/Experience Fields v2
//  Binary+Symbolic Lanes • TimeAxis/Session/MultiTenant Aware
//  PURE OBSERVATION. ZERO MUTATION. ZERO IDENTITY LEAKAGE.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




const C_ID   = "color:#00FF9C; font-weight:bold; font-family:monospace;";
const C_OK   = "color:#00FF9C; font-family:monospace;";
const C_INFO = "color:#E8F8FF; font-family:monospace;";
const C_WARN = "color:#FFE066; font-family:monospace;";
const C_ERR  = "color:#FF3B3B; font-weight:bold; font-family:monospace;";


console.log("%c🧠🌐 PULSE BOOT AI v32.0 — [PulseBootAdminAI v30] %cSummary/Issue/Trace Diagnostics Artery at your Service %c→ %s",
  C_ID, C_INFO, C_OK,
  " Pure Observation/No Mutation!"
);

export const AdminDiagnosticsMetaV30 = Object.freeze({
  layer: "PulseAIAdminDiagnosticsFrame",
  role: "ADMIN_DIAGNOSTICS_ORGAN",
  version: "30-Immortal-Evo++++++",
  identity: "aiAdminDiagnostics-v30-Immortal-Evo++++++",

  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    dualband: true,
    windowAware: true,
    packetAware: false,
    readOnly: true,
    multiInstanceReady: true,
    diagnosticsArteryAware: true,
    epoch: "30-Immortal-Evo++++++",

    evidenceAware: true,
    aiAuditAware: true,
    multiMindAware: true,
    pulseGovernorAware: true,

    advantageFieldAware: true,
    speedFieldAware: true,
    experienceFieldAware: true,
    chunkCachePrewarmAware: true,

    // v30+ extras
    timeAxisAware: true,
    sessionAware: true,
    routeSnapshotAware: true,
    multiTenantAware: true,
    binaryVitalsV2Aware: true,
    uiRuntimeAware: true,
    routeMemoryAware: true
  }),

  contract: Object.freeze({
    purpose: Object.freeze([
      "Transform diagnostics into UI-facing structures",
      "Provide summary cards, issue lists, and trace output",
      "Expose AI evidence and AI activity summaries for admin audit",
      "Expose advantage/speed/experience fields for owner advantage view",
      "Integrate binary+symbolic vitals, time-axis, and session context",
      "Support admin dashboards and debugging tools",
      "Stay read-only and identity-safe"
    ]),
    never: Object.freeze([
      "mutate diagnostics",
      "modify context",
      "expose identity anchors",
      "write to external systems",
      "change organism state",
      "override SafetyFrame",
      "override PermissionsEngine"
    ]),
    always: Object.freeze([
      "summarize",
      "structure",
      "format",
      "stay deterministic",
      "stay ego-free",
      "stay admin-facing only"
    ])
  })
});

// ============================================================================
// HELPERS — PRESSURE + BUCKETS + EVIDENCE BUCKETS + ADVANTAGE FIELDS v2
// ============================================================================

function extractBinaryPressureV2(binaryVitals = {}) {
  // v30: prefer layered.v2 if present, then layered, then binary
  if (binaryVitals.layeredV2.organism.pressure != null)
    return binaryVitals.layeredV2.organism.pressure;
  if (binaryVitals.layered.organism.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals.binary.pressure != null)
    return binaryVitals.binary.pressure;
  return 0;
}

function extractSymbolicPressure(binaryVitals = {}) {
  if (binaryVitals.symbolic.pressure != null)
    return binaryVitals.symbolic.pressure;
  return 0;
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0)   return "low";
  return "none";
}

function bucketEvidenceMatch(matchPct) {
  if (matchPct >= 0.95) return "excellent";
  if (matchPct >= 0.85) return "good";
  if (matchPct >= 0.7)  return "fair";
  if (matchPct >= 0.5)  return "weak";
  return "critical";
}

function bucketDrift(drift) {
  if (drift <= 0.01) return "none";
  if (drift <= 0.05) return "low";
  if (drift <= 0.15) return "medium";
  if (drift <= 0.3)  return "high";
  return "severe";
}

function bucketAdvantage(score) {
  if (score >= 0.9) return "dominant";
  if (score >= 0.7) return "strong";
  if (score >= 0.5) return "present";
  if (score > 0)    return "weak";
  return "none";
}

function bucketSpeed(score) {
  if (score >= 0.9) return "blazing";
  if (score >= 0.7) return "fast";
  if (score >= 0.5) return "steady";
  if (score > 0)    return "slow";
  return "idle";
}

function bucketExperience(score) {
  if (score >= 0.9) return "legendary";
  if (score >= 0.7) return "expert";
  if (score >= 0.5) return "seasoned";
  if (score > 0)    return "novice";
  return "none";
}

// ============================================================================
//  PUBLIC API — Create Admin Diagnostics Organ (v30‑IMMORTAL‑EVO++++++)
// ============================================================================

export function createAdminDiagnosticsOrganV30(context = {}) {
  const diagnostics = context.diagnostics || {};
  const trace = Array.isArray(context.trace) ? [...context.trace] : [];

  // AI evidence + AI activity inputs (read-only views)
  const evidence = context.evidence || {
    match: 0,
    mismatch: 0,
    omission: 0,
    drift: 0,
    lastCheck: null
  };

  const aiActivity = Array.isArray(context.aiActivity)
    ? context.aiActivity
    : [];

  const governorMode = context.governorMode || {
    pulseMode: "normal", // normal | elevated | fallback
    mindMode: "multi",   // multi | one
    aiMode: "active"     // active | readOnly
  };

  // Advantage / speed / experience fields (owner advantage view) v2
  const advantageField = context.advantageField || {
    score: 0,
    label: "Advantage",
    lastUpdate: null,
    lanes: {
      binary: 0,
      symbolic: 0,
      mesh: 0
    }
  };

  const speedField = context.speedField || {
    score: 0,
    label: "Speed",
    lastUpdate: null,
    lanes: {
      binary: 0,
      symbolic: 0,
      mesh: 0
    }
  };

  const experienceField = context.experienceField || {
    score: 0,
    label: "Experience",
    lastUpdate: null,
    lanes: {
      binary: 0,
      symbolic: 0,
      mesh: 0
    }
  };

  // v30+ context: time axis, session, tenant, route snapshots
  const timeAxis = context.timeAxis || {
    epoch: null,
    lastEventTs: null,
    windowMs: null
  };

  const session = context.session || {
    sessionId: null,
    tenantId: null,
    surface: null,
    route: null
  };

  const routeSnapshots = Array.isArray(context.routeSnapshots)
    ? context.routeSnapshots
    : [];

  function prewarm() {
    // symbolic-only prewarm hook for future chunk cache integration
    return true;
  }

  // --------------------------------------------------------------------------
  // SUMMARY CARDS v7 — binary+symbolic-pressure-aware + evidence-aware + advantage fields v2
  // --------------------------------------------------------------------------
  function buildSummaryCards(binaryVitals = {}) {
    const mismatchCount = diagnostics.mismatches.length || 0;
    const missingCount = diagnostics.missingFields.length || 0;
    const slowdownCount = diagnostics.slowdownCauses.length || 0;
    const drift = diagnostics.driftDetected === true;

    const binaryPressure = extractBinaryPressureV2(binaryVitals);
    const symbolicPressure = extractSymbolicPressure(binaryVitals);
    const combinedPressure = Math.max(binaryPressure, symbolicPressure);
    const simplified = combinedPressure >= 0.7;

    const totalEvidence =
      (evidence.match || 0) +
      (evidence.mismatch || 0) +
      (evidence.omission || 0) || 1;

    const matchPct = (evidence.match || 0) / totalEvidence;
    const mismatchPct = (evidence.mismatch || 0) / totalEvidence;
    const omissionPct = (evidence.omission || 0) / totalEvidence;
    const evidenceBucket = bucketEvidenceMatch(matchPct);
    const driftBucket = bucketDrift(evidence.drift || 0);

    const advantageScore = advantageField.score || 0;
    const speedScore = speedField.score || 0;
    const experienceScore = experienceField.score || 0;

    const advantageBucket = bucketAdvantage(advantageScore);
    const speedBucket = bucketSpeed(speedScore);
    const experienceBucket = bucketExperience(experienceScore);

    return Object.freeze([
      {
        id: "overall-health",
        title: "Overall Health",
        icon: drift || mismatchCount || missingCount ? "warning" : "check",
        severity: drift || mismatchCount || missingCount ? "warning" : "ok",
        description:
          drift
            ? "Schema drift detected."
            : mismatchCount || missingCount
            ? "Data issues detected."
            : "No major issues detected."
      },
      {
        id: "mismatches",
        title: "Field Mismatches",
        icon: mismatchCount ? "error" : "check",
        severity: mismatchCount ? "error" : "ok",
        count: simplified ? Math.min(mismatchCount, 5) : mismatchCount,
        description:
          mismatchCount
            ? `${mismatchCount} mismatched fields.`
            : "No mismatched fields."
      },
      {
        id: "missing-fields",
        title: "Missing Fields",
        icon: missingCount ? "warning" : "check",
        severity: missingCount ? "warning" : "ok",
        count: simplified ? Math.min(missingCount, 5) : missingCount,
        description:
          missingCount
            ? `${missingCount} missing fields.`
            : "No missing fields."
      },
      {
        id: "performance",
        title: "Performance Signals",
        icon: slowdownCount ? "turtle" : "bolt",
        severity: slowdownCount ? "warning" : "ok",
        count: simplified ? Math.min(slowdownCount, 5) : slowdownCount,
        description:
          slowdownCount
            ? `${slowdownCount} slowdown patterns detected.`
            : "No slowdown patterns."
      },
      {
        id: "drift",
        title: "Schema Drift",
        icon: drift ? "split" : "link",
        severity: drift ? "error" : "ok",
        description: drift ? "Schema drift detected." : "No schema drift."
      },
      {
        id: "ai-evidence",
        title: "AI Evidence Alignment",
        icon: mismatchPct > 0 || omissionPct > 0 ? "file-search" : "check",
        severity:
          evidenceBucket === "excellent" || evidenceBucket === "good"
            ? "ok"
            : "warning",
        matchPct: Math.round(matchPct * 100),
        mismatchPct: Math.round(mismatchPct * 100),
        omissionPct: Math.round(omissionPct * 100),
        drift: evidence.drift || 0,
        driftBucket,
        description:
          evidenceBucket === "excellent"
            ? "AI outputs strongly aligned with evidential records."
            : evidenceBucket === "good"
            ? "AI outputs mostly aligned with evidential records."
            : evidenceBucket === "fair"
            ? "Some mismatches/omissions — review critical flows."
            : evidenceBucket === "weak"
            ? "Significant mismatches/omissions — audit recommended."
            : "Critical misalignment — treat AI outputs as untrusted until reviewed."
      },
      {
        id: "advantage-field",
        title: advantageField.label || "Advantage",
        icon: "sparkles",
        severity:
          advantageBucket === "dominant" || advantageBucket === "strong"
            ? "ok"
            : advantageBucket === "present"
            ? "info"
            : "weak",
        score: advantageScore,
        bucket: advantageBucket,
        lanes: Object.freeze(advantageField.lanes || {}),
        description:
          advantageBucket === "dominant"
            ? "Strong systemic advantage active."
            : advantageBucket === "strong"
            ? "Clear advantage present."
            : advantageBucket === "present"
            ? "Some advantage available."
            : advantageBucket === "weak"
            ? "Minimal advantage — can be improved."
            : "No measurable advantage yet."
      },
      {
        id: "speed-field",
        title: speedField.label || "Speed",
        icon: "gauge",
        severity:
          speedBucket === "blazing" || speedBucket === "fast"
            ? "ok"
            : speedBucket === "steady"
            ? "info"
            : "weak",
        score: speedScore,
        bucket: speedBucket,
        lanes: Object.freeze(speedField.lanes || {}),
        description:
          speedBucket === "blazing"
            ? "Peak throughput and responsiveness."
            : speedBucket === "fast"
            ? "High performance under load."
            : speedBucket === "steady"
            ? "Stable performance."
            : speedBucket === "slow"
            ? "Slow under current load."
            : "Idle or no signal."
      },
      {
        id: "experience-field",
        title: experienceField.label || "Experience",
        icon: "orbit",
        severity:
          experienceBucket === "legendary" || experienceBucket === "expert"
            ? "ok"
            : experienceBucket === "seasoned"
            ? "info"
            : "weak",
        score: experienceScore,
        bucket: experienceBucket,
        lanes: Object.freeze(experienceField.lanes || {}),
        description:
          experienceBucket === "legendary"
            ? "Extremely rich experience history."
            : experienceBucket === "expert"
            ? "Deep experience accumulated."
            : experienceBucket === "seasoned"
            ? "Solid experience base."
            : experienceBucket === "novice"
            ? "Early-stage experience."
            : "No meaningful experience yet."
      },
      {
        id: "time-axis",
        title: "Time Axis",
        icon: "timeline",
        severity: "info",
        epoch: timeAxis.epoch || null,
        lastEventTs: timeAxis.lastEventTs || null,
        windowMs: timeAxis.windowMs || null,
        description: "Time-windowed view of recent diagnostics and AI activity."
      },
      {
        id: "session-context",
        title: "Session & Tenant",
        icon: "id-card",
        severity: "info",
        sessionId: session.sessionId || null,
        tenantId: session.tenantId || null,
        surface: session.surface || null,
        route: session.route || null,
        description: "Session, tenant, and surface context for this diagnostics frame."
      }
    ]);
  }

  // --------------------------------------------------------------------------
  // ISSUE LIST v7 — binary+symbolic-pressure-aware + evidence-aware
  // --------------------------------------------------------------------------
  function buildIssueList(binaryVitals = {}) {
    const issues = [];

    const binaryPressure = extractBinaryPressureV2(binaryVitals);
    const symbolicPressure = extractSymbolicPressure(binaryVitals);
    const combinedPressure = Math.max(binaryPressure, symbolicPressure);
    const simplified = combinedPressure >= 0.7;

    (diagnostics.mismatches || []).forEach((m, index) => {
      if (simplified && index >= 10) return;
      issues.push({
        type: "mismatch",
        severity: "error",
        key: m.key,
        message: `Field "${m.key}" mismatch: expected ${m.expected}, got ${m.actual}`,
        hint: "Align this field with the Pulse schema."
      });
    });

    (diagnostics.missingFields || []).forEach((f, index) => {
      if (simplified && index >= 10) return;
      issues.push({
        type: "missing",
        severity: "warning",
        key: f.key,
        message: `Missing field "${f.key}"`,
        hint: "Add this field or update the schema."
      });
    });

    (diagnostics.slowdownCauses || []).forEach((s, index) => {
      if (simplified && index >= 10) return;
      issues.push({
        type: "slowdown",
        severity: "warning",
        key: null,
        message: `Potential slowdown cause: ${s.reason}`,
        hint: "Consider simplifying this data.",
        id: `slowdown-${index}`
      });
    });

    if (diagnostics.driftDetected) {
      issues.push({
        type: "drift",
        severity: "error",
        key: null,
        message: "Schema drift detected.",
        hint: "Run a full audit and align schemas."
      });
    }

    const totalEvidence =
      (evidence.match || 0) +
      (evidence.mismatch || 0) +
      (evidence.omission || 0) || 1;

    const matchPct = (evidence.match || 0) / totalEvidence;
    const mismatchPct = (evidence.mismatch || 0) / totalEvidence;
    const omissionPct = (evidence.omission || 0) / totalEvidence;
    const evidenceBucket = bucketEvidenceMatch(matchPct);

    if (evidenceBucket === "fair" || evidenceBucket === "weak" || evidenceBucket === "critical") {
      issues.push({
        type: "ai-evidence",
        severity: evidenceBucket === "critical" ? "error" : "warning",
        key: null,
        message: `AI evidence alignment is ${evidenceBucket}. Matches: ${Math.round(
          matchPct * 100
        )}%, mismatches: ${Math.round(
          mismatchPct * 100
        )}%, omissions: ${Math.round(omissionPct * 100)}%.`,
        hint:
          "Use the Evidence Checker to inspect specific answers and compare them against raw records."
      });
    }

    if ((evidence.drift || 0) > 0.05) {
      const driftBucket = bucketDrift(evidence.drift || 0);
      issues.push({
        type: "ai-drift",
        severity: driftBucket === "severe" ? "error" : "warning",
        key: null,
        message: `AI drift detected at ${Math.round(
          (evidence.drift || 0) * 100
        )}%.`,
        hint: "Review AI behavior and consider OneMindMode + read-only for investigation."
      });
    }

    // v30+: route snapshot anomalies
    (routeSnapshots || []).forEach((snap, index) => {
      if (!snap || !snap.anomaly) return;
      if (simplified && index >= 10) return;
      issues.push({
        type: "route-anomaly",
        severity: snap.severity || "warning",
        key: snap.routeId || null,
        message: `Route anomaly on "${snap.routeId || "unknown"}": ${snap.anomaly}`,
        hint: "Inspect route snapshots and UI runtime state for this route."
      });
    });

    return Object.freeze(issues);
  }

  // --------------------------------------------------------------------------
  // ADMIN DIAGNOSTICS ARTERY v7 — symbolic-only, deterministic
  //  Aware of AI evidence + governor mode + advantage/speed/experience + lanes.
// --------------------------------------------------------------------------
  function diagnosticsArtery({ binaryVitals = {} } = {}) {
    const mismatchCount = diagnostics.mismatches.length || 0;
    const missingCount = diagnostics.missingFields.length || 0;
    const slowdownCount = diagnostics.slowdownCauses.length || 0;
    const drift = diagnostics.driftDetected === true;

    const binaryPressure = extractBinaryPressureV2(binaryVitals);
    const symbolicPressure = extractSymbolicPressure(binaryVitals);

    const localPressure =
      (mismatchCount ? 0.3 : 0) +
      (missingCount ? 0.2 : 0) +
      (slowdownCount ? 0.3 : 0) +
      (drift ? 0.4 : 0);

    const combinedPressure = Math.max(binaryPressure, symbolicPressure);

    const pressure = Math.max(
      0,
      Math.min(1, 0.5 * localPressure + 0.5 * combinedPressure)
    );

    const totalEvidence =
      (evidence.match || 0) +
      (evidence.mismatch || 0) +
      (evidence.omission || 0) || 1;

    const matchPct = (evidence.match || 0) / totalEvidence;
    const mismatchPct = (evidence.mismatch || 0) / totalEvidence;
    const omissionPct = (evidence.omission || 0) / totalEvidence;
    const evidenceBucket = bucketEvidenceMatch(matchPct);
    const driftBucket = bucketDrift(evidence.drift || 0);

    const advantageScore = advantageField.score || 0;
    const speedScore = speedField.score || 0;
    const experienceScore = experienceField.score || 0;

    return {
      organism: {
        pressure,
        pressureBucket: bucketPressure(pressure),
        binaryPressure,
        symbolicPressure
      },
      diagnostics: {
        mismatches: mismatchCount,
        missingFields: missingCount,
        slowdown: slowdownCount,
        drift
      },
      aiEvidence: {
        matchPct,
        mismatchPct,
        omissionPct,
        evidenceBucket,
        drift: evidence.drift || 0,
        driftBucket
      },
      aiAdvantage: {
        score: advantageScore,
        bucket: bucketAdvantage(advantageScore),
        label: advantageField.label || "Advantage",
        lanes: Object.freeze(advantageField.lanes || {})
      },
      aiSpeed: {
        score: speedScore,
        bucket: bucketSpeed(speedScore),
        label: speedField.label || "Speed",
        lanes: Object.freeze(speedField.lanes || {})
      },
      aiExperience: {
        score: experienceScore,
        bucket: bucketExperience(experienceScore),
        label: experienceField.label || "Experience",
        lanes: Object.freeze(experienceField.lanes || {})
      },
      governorMode: {
        pulseMode: governorMode.pulseMode || "normal",
        mindMode: governorMode.mindMode || "multi",
        aiMode: governorMode.aiMode || "active"
      },
      timeAxis: {
        epoch: timeAxis.epoch || null,
        lastEventTs: timeAxis.lastEventTs || null,
        windowMs: timeAxis.windowMs || null
      },
      session: {
        sessionId: session.sessionId || null,
        tenantId: session.tenantId || null,
        surface: session.surface || null,
        route: session.route || null
      }
    };
  }

  // --------------------------------------------------------------------------
  // AI ACTIVITY SUMMARY — symbolic-only, deterministic (v30 lanes-aware)
// --------------------------------------------------------------------------
  function buildAIActivitySummary() {
    const items = aiActivity.map((ai) => {
      const ev = ai.evidence || {};
      const total =
        (ev.match || 0) + (ev.mismatch || 0) + (ev.omission || 0) || 1;
      const matchPct = (ev.match || 0) / total;
      const mismatchPct = (ev.mismatch || 0) / total;
      const omissionPct = (ev.omission || 0) / total;
      const evidenceBucket = bucketEvidenceMatch(matchPct);

      return {
        id: ai.id,
        role: ai.role,
        lane: ai.lane,
        tags: ai.tags || [],
        status: ai.status || "idle", // idle | active | readOnly | isolated
        lastAction: ai.lastAction || null,
        lastAnswerId: ai.lastAnswerId || null,
        mode: Object.freeze({
          canAct: !!ai.mode.canAct,
          readOnly: !!ai.mode.readOnly,
          isolated: !!ai.mode.isolated
        }),
        evidence: Object.freeze({
          matchPct,
          mismatchPct,
          omissionPct,
          evidenceBucket,
          drift: ev.drift || 0
        }),
        // v30+: per-lane advantage/speed/experience hints if provided
        lanes: Object.freeze(ai.lanes || {})
      };
    });

    return Object.freeze(items);
  }

  // --------------------------------------------------------------------------
  // PUBLIC ADMIN DIAGNOSTICS API (v30‑IMMORTAL‑EVO++++++)
  // --------------------------------------------------------------------------
  return Object.freeze({
    meta: AdminDiagnosticsMetaV30,
    prewarm,

    log(message) {
      const context = {
        logStep(msg) {
          console.log(msg);
        }
      };
      context.logStep(`aiAdminDiagnostics-v30: ${message}`);
    },

    buildModel({ binaryVitals = {}, meta = {} } = {}) {
      const summaryCards = buildSummaryCards(binaryVitals);
      const issueList = buildIssueList(binaryVitals);
      const artery = diagnosticsArtery({ binaryVitals });
      const aiActivitySummary = buildAIActivitySummary();

      return Object.freeze({
        summaryCards,
        issueList,
        trace,
        artery,
        aiActivity: aiActivitySummary,
        evidence: Object.freeze({
          lastCheck: evidence.lastCheck || null,
          match: evidence.match || 0,
          mismatch: evidence.mismatch || 0,
          omission: evidence.omission || 0,
          drift: evidence.drift || 0
        }),
        governorMode: Object.freeze({
          pulseMode: governorMode.pulseMode || "normal",
          mindMode: governorMode.mindMode || "multi",
          aiMode: governorMode.aiMode || "active"
        }),
        timeAxis: Object.freeze({
          epoch: timeAxis.epoch || null,
          lastEventTs: timeAxis.lastEventTs || null,
          windowMs: timeAxis.windowMs || null
        }),
        session: Object.freeze({
          sessionId: session.sessionId || null,
          tenantId: session.tenantId || null,
          surface: session.surface || null,
          route: session.route || null
        }),
        routeSnapshots: Object.freeze(routeSnapshots),
        meta: Object.freeze({
          personaId: context.personaId,
          driftDetected: diagnostics.driftDetected === true,
          totalIssues: issueList.length,
          version: AdminDiagnosticsMetaV30.version,
          ...meta
        })
      });
    },
    onError(envelope) {
      try {
        // 1. Update diagnostics mismatch/missing/slowdown counters
        try {
          diagnostics.lastError = {
            id: envelope.id,
            severity: envelope.severity,
            message: envelope.packet.message,
            route: envelope.packet.route,
            surface: envelope.packet.surface,
            time: envelope.timestamp
          };

          diagnostics.errorCount = (diagnostics.errorCount || 0) + 1;
        } catch (err) {
          console.warn("[AdminDiagnostics:onError diagnostics update failed]", err);
        }

        // 2. Update evidence alignment snapshot
        try {
          if (evidence && typeof evidence === "object") {
            const sev = envelope.severity || "unknown";

            // Increment mismatch/omission if severity suggests it
            if (sev === "error") evidence.mismatch = (evidence.mismatch || 0) + 1;
            else if (sev === "warning") evidence.omission = (evidence.omission || 0) + 1;

            evidence.lastCheck = envelope.timestamp;
          }
        } catch (err) {
          console.warn("[AdminDiagnostics:onError evidence update failed]", err);
        }

        // 3. Update routeSnapshots (v30+)
        try {
          const snap = {
            routeId: envelope.packet.route || "unknown",
            anomaly: envelope.packet.message || "UI Error",
            severity: envelope.severity || "warning",
            time: envelope.timestamp
          };

          routeSnapshots.push(snap);
          if (routeSnapshots.length > 50) routeSnapshots.shift();
        } catch (err) {
          console.warn("[AdminDiagnostics:onError routeSnapshots failed]", err);
        }

        // 4. Update timeAxis
        try {
          timeAxis.lastEventTs = envelope.timestamp;
          if (!timeAxis.epoch) timeAxis.epoch = envelope.timestamp;
        } catch (err) {
          console.warn("[AdminDiagnostics:onError timeAxis failed]", err);
        }

        // 5. Emit signal for observers
        try {
          PulseRealm.PulseSignals.emit("admin.diagnostics.error", {
            envelope,
            severity: envelope.severity,
            route: envelope.packet.route,
            surface: envelope.packet.surface
          });
        } catch (err) {
          console.warn("[AdminDiagnostics:onError signal failed]", err);
        }

        // 6. Emit SDN impulse
        try {
          PulseRealm.PulseSDN.emitImpulse("admin.diagnostics.error", {
            modeKind: "dual",
            executionContext: {
              sceneType: "admin-diagnostics",
              workloadClass: "diagnostics-error",
              dispatchSignature: "AdminDiagnosticsOrganV30",
              shapeSignature: "diagnostics-error-spine",
              extensionId: "AdminDiagnosticsOrganV30"
            },
            envelope
          });
        } catch (err) {
          console.warn("[AdminDiagnostics:onError SDN failed]", err);
        }

      } catch (err) {
        console.warn("[AdminDiagnostics:onError failed]", err);
      }
    },
    diagnosticsArtery
  });
}

// ============================================================================
//  NODE/COMMONJS EXPORTS
// ============================================================================


  PulseRealm.AdminDiagnosticsOrgan = createAdminDiagnosticsOrganV30;
