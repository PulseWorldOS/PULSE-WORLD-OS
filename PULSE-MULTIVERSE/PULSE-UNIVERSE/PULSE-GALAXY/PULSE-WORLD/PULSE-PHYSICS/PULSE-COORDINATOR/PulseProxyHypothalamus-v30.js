// ============================================================================
//  PulseHypothalamus-v30-IMMORTAL+++ ONEBAND
//  Homeostasis Organ • Binary-First • Unified Advantage • Unified Stress
//  Always-Ready • Zero Drag • OneBand Surfaces • Deterministic
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
// HELPERS — deterministic, pure
// ============================================================================
const clamp01 = v => Math.max(0, Math.min(1, v));
const hash = s => {
  let h = 0;
  const str = String(s || "");
  for (let i = 0; i < str.length; i++)
    h = (h + str.charCodeAt(i) * (i + 1)) % 100000;
  return `h${h}`;
};

// ============================================================================
// ONEBAND SURFACES — binary-first
// ============================================================================
function buildBinaryField() {
  const patternLen = 18;
  const density = 54;
  const surface = density + patternLen;

  return Object.freeze({
    patternLen,
    density,
    surface,
    binaryPhenotypeSignature: `hypo-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `hypo-binary-surface-${(surface * 11) % 99991}`,
    parity: surface % 2,
    shiftDepth: Math.floor(Math.log2(surface || 1))
  });
}

function buildWaveField() {
  const amplitude = 14;
  const wavelength = amplitude + 5;
  const phase = amplitude % 16;

  return Object.freeze({
    amplitude,
    wavelength,
    phase,
    band: "binary",
    mode: "binary-wave"
  });
}

function buildOneBandSignature(binaryField, waveField) {
  return hash(
    `ONEBAND_HYPO::${binaryField.surface}::${waveField.amplitude}::${waveField.phase}`
  );
}

// ============================================================================
// UNIFIED ORGANISM OVERLAY — v30 IMMORTAL+++
// ============================================================================
function buildOrganismOverlay(ctx = {}) {
  const flow = clamp01(ctx.flowRate || 0);
  const pressure = clamp01(ctx.pressureIndex || 0);
  const adrenal = clamp01(ctx.adrenalStress || 0);
  const tri = clamp01(ctx.triEnvStress || 0);
  const proxy = clamp01(ctx.proxyPressure || 0);

  const load = Math.max(pressure, adrenal, tri, proxy);
  const fusion = clamp01(flow * 0.5 + (1 - load) * 0.5);

  return Object.freeze({
    flow,
    pressure,
    adrenal,
    tri,
    proxy,
    organismLoad: load,
    organismFlow: flow,
    fusionScore: fusion,
    overlaySignature: hash(`ORG_HYPO::${flow}::${pressure}::${fusion}`)
  });
}

// ============================================================================
// UNIFIED ADVANTAGE — binary-first
// ============================================================================
function buildAdvantageField(trust, mesh, phase, hub, organismOverlay) {
  const t = clamp01(trust / 100);
  const m = clamp01(mesh / 100);
  const p = clamp01(phase / 4);
  const h = hub ? 1 : 0;

  const base = t * 0.4 + m * 0.3 + p * 0.2 + h * 0.1;
  const fusion = organismOverlay.fusionScore;

  const score = clamp01(base * (0.8 + fusion * 0.4));

  return Object.freeze({
    trustNorm: t,
    meshNorm: m,
    phaseNorm: p,
    hubNorm: h,
    organismFusion: fusion,
    advantageScore: score,
    advantageSignature: hash(
      `HYPO_ADV::${t}::${m}::${p}::${h}::${fusion}::${score}`
    )
  });
}

// ============================================================================
// UNIFIED STRESS / PRESENCE
// ============================================================================
function buildPresenceField(trust, mesh) {
  const t = clamp01(trust / 100);
  const m = clamp01(mesh / 100);
  const presence = clamp01((t + m) / 2);

  return Object.freeze({
    presence,
    presenceSignature: hash(`HYPO_PRESENCE::${presence}`)
  });
}

// ============================================================================
// INSTANCE ALLOCATION — v30 unified formula
// ============================================================================
function allocateInstances(phase, hub, tier, earnMode, testEarn) {
  let base = phase >= 2 ? 2 : 1;

  if (hub) base *= 2;
  if (tier === "upgraded") base *= 2;
  if (tier === "highend") base *= 2;
  if (earnMode) base = Math.floor(base * 1.5);
  if (testEarn) base = 16;

  const max =
    testEarn
      ? 16
      : tier === "upgraded"
      ? 8
      : tier === "highend"
      ? 8
      : 4;

  return Math.max(1, Math.min(base, max));
}

// ============================================================================
// HYPOTHALAMUS CYCLE
// ============================================================================
let HYPO_CYCLE = 0;

// ============================================================================
// MAIN — runUserScoring v30 IMMORTAL+++
// ============================================================================
export async function runUserScoring({
  db,
  organismAdvantageContext = {}
} = {}) {
  HYPO_CYCLE++;

  if (!db) {
    return { ok: false, error: "db_missing" };
  }

  const binaryField = buildBinaryField();
  const waveField = buildWaveField();
  const oneBandSignature = buildOneBandSignature(binaryField, waveField);
  const organismOverlay = buildOrganismOverlay(organismAdvantageContext);

  let snap;
  try {
    snap = await db.collection("UserMetrics").get();
  } catch (err) {
    return { ok: false, error: "read_UserMetrics_failed" };
  }

  const batch = db.batch();
  let processed = 0;

  for (const doc of snap.docs) {
    const m = doc.data() || {};
    const trust = Number(m.totalRequests || 0) / 100 * 20 +
                  Number(m.meshRelays || 0) / 10 * 20 +
                  Number(m.hubSignals || 0) / 5 * 20 +
                  (m.avgLatency < 150 ? 20 : 0) +
                  Math.min(Number(m.stabilityScore || 0), 20);

    const trustScore = Math.min(trust, 100);

    const meshScore =
      Math.min(Number(m.meshRelays || 0) / 5, 40) +
      Math.min(Number(m.meshPings || 0) / 10, 20) +
      Math.min(Number(m.hubSignals || 0) / 5, 20) +
      (m.avgLatency < 150 ? 20 : 0);

    const phase =
      trustScore < 25 ? 1 :
      trustScore < 50 ? 2 :
      trustScore < 75 ? 3 : 4;

    const hub =
      Number(m.meshRelays || 0) > 50 ||
      Number(m.hubSignals || 0) > 20 ||
      Number(m.totalRequests || 0) > 500;

    const tier = m.deviceTier || "normal";
    const earnMode = !!m.earnMode;
    const testEarn = !!m.testEarnActive;

    const instances = allocateInstances(
      phase,
      hub,
      tier,
      earnMode,
      testEarn
    );

    const advantageField = buildAdvantageField(
      trustScore,
      meshScore,
      phase,
      hub,
      organismOverlay
    );

    const presenceField = buildPresenceField(trustScore, meshScore);

    batch.set(
      db.collection("UserScores").doc(doc.id),
      {
        userId: doc.id,
        trustScore,
        meshScore,
        phase,
        hub,
        deviceTier: tier,
        earnMode,
        testEarnActive: testEarn,
        instances,
        oneBandSignature,
        binaryField,
        waveField,
        advantageField,
        presenceField,
        organismOverlay,
        hypoCycle: HYPO_CYCLE,
        lastUpdated: PulseRealm.PulseNOW
      },
      { merge: true }
    );

    processed++;
  }

  try {
    await batch.commit();
    return {
      ok: true,
      processed,
      hypoCycle: HYPO_CYCLE,
      oneBandSignature,
      binaryField,
      waveField,
      organismOverlay
    };
  } catch (err) {
    return { ok: false, error: "commit_failed" };
  }
}
