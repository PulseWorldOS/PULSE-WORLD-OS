// ============================================================================
//  PulseProxyOuterAgent-v30-IMMORTAL+++ ONEBAND
//  Pure Boundary Organ • Binary-First • Zero-Drag • Unified Surfaces
//  External Negotiator • Job Courier • Experience Surface
// ============================================================================

// ============================================================================
// HELPERS — deterministic, pure
// ============================================================================
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
function buildBinaryField(url = "") {
  const len = url.length;
  const density = len === 0 ? 0 : Math.min(1, len / 4096);
  const surface = len + Math.floor(density * 2000);

  return Object.freeze({
    urlLength: len,
    density,
    surface,
    binarySignature: `outer-binary-${surface % 99991}`
  });
}

function buildWaveField(stage = "UNKNOWN") {
  const amplitude = 8 + (stage.length % 8);
  const wavelength = amplitude + 6;
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
    `ONEBAND_OUTER::${binaryField.surface}::${waveField.amplitude}::${waveField.phase}`
  );
}

// ============================================================================
// UNIFIED PRESENCE — binary-first
// ============================================================================
function buildPresenceField(presenceContext = {}) {
  const online = presenceContext.online !== false;
  const focus = online ? "present" : "degraded";

  return Object.freeze({
    focus,
    presenceSignature: hash(`OUTER_PRESENCE::${focus}`)
  });
}

// ============================================================================
// UNIFIED SPEED — binary-first
// ============================================================================
function buildSpeedField(binaryField) {
  const density = binaryField.density || 0;
  const speedScore = density;
  const speedBand =
    speedScore < 0.25 ? "slow" :
    speedScore < 0.6  ? "steady" :
                        "quickened";

  return Object.freeze({
    speedScore,
    speedBand,
    speedSignature: hash(`OUTER_SPEED::${speedScore}`)
  });
}

// ============================================================================
// UNIFIED ADVANTAGE — binary-first
// ============================================================================
function buildAdvantageField(binaryField, speedField) {
  const density = binaryField.density || 0;
  const speed = speedField.speedScore || 0;
  const advantageScore = Math.min(1, (density + speed) / 2);

  return Object.freeze({
    advantageScore,
    advantageSignature: hash(`OUTER_ADV::${advantageScore}`)
  });
}
// ============================================================================
//  PulseProxyOuterAgent — IMMORTAL PSEUDO‑CLASS (v31 IMMORTAL+++)
// ============================================================================

export const PulseProxyOuterAgent = (() => {

  // ------------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
  // ------------------------------------------------------------
  const lane = {
    deviceId: null,
    baseUrl: "https://www.pulseworld.net/proxy",
    presenceContext: {}
  };

  // ------------------------------------------------------------
  // INIT
  // ------------------------------------------------------------
  const init = ({ deviceId, baseUrl, presenceContext } = {}) => {
    lane.deviceId = deviceId ?? null;
    lane.baseUrl = baseUrl || "https://www.pulseworld.net/proxy";
    lane.presenceContext = presenceContext || {};
  };

  // ------------------------------------------------------------
  // NEGOTIATE (core IMMORTAL logic)
// ------------------------------------------------------------
  const negotiate = async (descriptor) => {
    const { url, options, stage } = descriptor;

    const binaryField = buildBinaryField(url);
    const waveField = buildWaveField(stage);
    const oneBandSignature = buildOneBandSignature(binaryField, waveField);
    const presenceField = buildPresenceField(lane.presenceContext);
    const speedField = buildSpeedField(binaryField);
    const advantageField = buildAdvantageField(binaryField, speedField);

    let json = null;
    try {
      const res = await fetch(url, options || {});
      json = await res.json().catch(() => ({ ok: res.ok, status: res.status }));
    } catch (err) {
      json = { error: true, message: String(err) };
    }

    return Object.freeze({
      ...json,
      ok: !json.error,
      oneBandSignature,
      binaryField,
      waveField,
      presenceField,
      speedField,
      advantageField
    });
  };

  // ------------------------------------------------------------
  // PUBLIC SURFACES
  // ------------------------------------------------------------
  const register = () =>
    negotiate({
      stage: "REGISTER",
      url: `${lane.baseUrl}/registerDevice`,
      options: {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId: lane.deviceId })
      }
    });

  const requestJob = () =>
    negotiate({
      stage: "REQUEST_JOB",
      url: `${lane.baseUrl}/getJob?deviceId=${encodeURIComponent(lane.deviceId)}`,
      options: {}
    });

  const submitResult = (jobId, result) =>
    negotiate({
      stage: "SUBMIT_RESULT",
      url: `${lane.baseUrl}/submitJob`,
      options: {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId: lane.deviceId, jobId, result })
      }
    });

  const syncCredits = () =>
    negotiate({
      stage: "SYNC_CREDITS",
      url: `${lane.baseUrl}/syncCredits?deviceId=${encodeURIComponent(lane.deviceId)}`,
      options: {}
    });

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    init,
    negotiate,
    register,
    requestJob,
    submitResult,
    syncCredits
  };

})();
