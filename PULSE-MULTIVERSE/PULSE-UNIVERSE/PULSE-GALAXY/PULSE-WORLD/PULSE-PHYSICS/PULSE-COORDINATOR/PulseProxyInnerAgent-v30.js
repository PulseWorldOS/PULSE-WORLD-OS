// ============================================================================
//  PulseProxyInnerAgent-v30-IMMORTAL+++ ONEBAND
//  Pure Bridge • Binary-First • Zero-Drag • Unified Surfaces
//  CNS ↔ Router ↔ Proxy Spine ↔ Brain / LTM / Pages
// ============================================================================

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
  const patternLen = 10;
  const density = 30;
  const surface = density + patternLen;

  return Object.freeze({
    patternLen,
    density,
    surface,
    binaryPhenotypeSignature: `inner-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `inner-binary-surface-${(surface * 11) % 99991}`,
    parity: surface % 2,
    shiftDepth: Math.floor(Math.log2(surface || 1))
  });
}

function buildWaveField(type = "inner") {
  const t = String(type);
  const amplitude = 12 + (t.length % 6);
  const wavelength = amplitude + 4;
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
    `ONEBAND_INNER::${binaryField.surface}::${waveField.amplitude}::${waveField.phase}`
  );
}

// ============================================================================
// UNIFIED PRESENCE — binary-first
// ============================================================================
function buildPresenceField(type, target) {
  const focus =
    type.includes("focus") || target === "Pages"
      ? "focused"
      : "neutral";

  return Object.freeze({
    type,
    target,
    focus,
    presenceSignature: hash(`INNER_PRESENCE::${type}::${target}::${focus}`)
  });
}

// ============================================================================
// UNIFIED SPEED — binary-first
// ============================================================================
function buildSpeedField({ outerSpeed, proxySpeed }) {
  const o = outerSpeed.speedScore ?? 0;
  const p = proxySpeed.speedScore ?? 0;
  const combined = clamp01((o + p) / 2);

  return Object.freeze({
    outerSpeed: o,
    proxySpeed: p,
    speedScore: combined,
    speedBand:
      combined < 0.25 ? "slow" :
      combined < 0.6  ? "steady" :
                        "quickened",
    speedSignature: hash(`INNER_SPEED::${combined}`)
  });
}

// ============================================================================
// UNIFIED ADVANTAGE — binary-first
// ============================================================================
function buildAdvantageField({ outerAdvantage, proxyAdvantage }) {
  const oa = outerAdvantage.advantageScore ?? 0;
  const pa = proxyAdvantage.advantageScore ?? 0;
  const combined = clamp01((oa + pa) / 2);

  return Object.freeze({
    outerAdvantage: oa,
    proxyAdvantage: pa,
    advantageScore: combined,
    advantageSignature: hash(`INNER_ADV::${combined}`)
  });
}

// ============================================================================
// TARGET RESOLUTION — simplified v30
// ============================================================================
function resolveTarget(type) {
  if (!type || typeof type !== "string")
    return { target: null };

  if (type.startsWith("brain:") || type === "PING_BRAIN")
    return { target: "Brain" };

  if (type.startsWith("ltm:") || type === "LONG_TERM_MEMORY")
    return { target: "LongTermMemory" };

  if (type.startsWith("page:") || type === "PAGE_REQUEST")
    return { target: "Pages" };

  return { target: "Brain" };
}

// ============================================================================
// FACTORY — v30 IMMORTAL+++ INNER AGENT
// ============================================================================
export function createPulseProxyInnerAgent({
  Brain,
  LongTermMemory,
  Pages
} = {}) {

  async function dispatch(target, type, payload, binaryPayload, context) {
    const args = [type, payload || {}, binaryPayload || null, context || {}];

    if (target === "Brain") return await Brain.handle(...args);
    if (target === "LongTermMemory") return await LongTermMemory.handle(...args);
    if (target === "Pages") return await Pages.handle(...args);

    return { error: "UnknownTarget" };
  }

  // ========================================================================
  // PUBLIC ENTRY — PURE v30 ONEBAND BRIDGE
  // ========================================================================
  async function handle({
    type,
    payload,
    binaryPayload,
    context,
    outerAgentContext,
    proxySpineContext
  } = {}) {

    const { target } = resolveTarget(type);

    const binaryField = buildBinaryField();
    const waveField = buildWaveField(type);
    const oneBandSignature = buildOneBandSignature(binaryField, waveField);

    const presenceField = buildPresenceField(type, target);

    const speedField = buildSpeedField({
      outerSpeed: outerAgentContext.speedField,
      proxySpeed: proxySpineContext.speedField
    });

    const advantageField = buildAdvantageField({
      outerAdvantage: outerAgentContext.advantageField,
      proxyAdvantage: proxySpineContext.advantageField
    });

    const res = await dispatch(
      target,
      type,
      payload,
      binaryPayload,
      {
        ...context,
        innerAgentPresence: presenceField,
        innerAgentSpeed: speedField,
        innerAgentAdvantage: advantageField
      }
    );

    return Object.freeze({
      ok: !res.error,
      target,
      type,
      oneBandSignature,
      binaryField,
      waveField,
      presenceField,
      speedField,
      advantageField,
      result: res
    });
  }

  return { handle };
}
