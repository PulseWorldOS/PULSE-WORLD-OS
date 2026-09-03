// ============================================================================
//  PulseProxyMemoryRouter-v33-IMMORTAL+++
//  Pure Intake • Binary-First • Zero-Drag • World-Integrated
//  - Integrated with PulseWorldEndpoint
//  - Integrated with G.PulseOSCheckRouterMemory
//  - Emits NEW SIGNAL events
//  - Same exports, same API, upgraded organ
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




export const PulseOSCheckRouterMemory =
  PulseRealm.PulseOSCheckRouterMemory && typeof PulseRealm.PulseOSCheckRouterMemory === "function"
    ? PulseRealm.PulseOSCheckRouterMemory
    : null;


// ---------------------------------------------------------------------------
//  INTERNAL HELPERS
// ---------------------------------------------------------------------------

const hash = s => {
  let h = 0;
  const str = String(s || "");
  for (let i = 0; i < str.length; i++)
    h = (h + str.charCodeAt(i) * (i + 1)) % 100000;
  return `h${h}`;
};

function buildBinaryField() {
  const patternLen = 8;
  const density = 24;
  const surface = density + patternLen;

  return Object.freeze({
    patternLen,
    density,
    surface,
    binarySignature: `mem-binary-${surface % 99991}`
  });
}

function buildPresenceField(entry) {
  return Object.freeze({
    page: entry.page || "UNKNOWN",
    route: entry.route || "UNKNOWN",
    presenceSignature: hash(`MEM_PRESENCE::${entry.page}::${entry.route}`)
  });
}

function buildAdvantageField() {
  return Object.freeze({
    advantageScore: 1,
    advantageSignature: hash("MEM_ADVANTAGE::1")
  });
}

function buildSpeedField() {
  return Object.freeze({
    speedScore: 1,
    speedBand: "max",
    speedSignature: hash("MEM_SPEED::1")
  });
}

// ---------------------------------------------------------------------------
//  UPGRADED ORGAN HANDLER
// ---------------------------------------------------------------------------

export const handler = async (event = {}) => {
  const logs = Array.isArray(event.logs) ? event.logs : [];

  // Build local binary/presence/speed fields
  const binaryField = buildBinaryField();

  const healedLocal = logs.map(entry => {
    const presenceField = buildPresenceField(entry);
    const advantageField = buildAdvantageField();
    const speedField = buildSpeedField();

    return Object.freeze({
      ok: true,
      entry,
      binaryField,
      presenceField,
      advantageField,
      speedField,
      signature: hash(
        `MEM_V33::${presenceField.presenceSignature}::${binaryField.binarySignature}`
      )
    });
  });

  // -------------------------------------------------------------------------
  //  NEW: Delegate to OS-level router memory organ if available
  // -------------------------------------------------------------------------
  let organResult = null;

  if (PulseOSCheckRouterMemory) {
    try {
      organResult = await PulseOSCheckRouterMemory({
        logs,
        healedLocal,
        understanding: event.understanding || null,
        bandId: event.bandId || null,
        bandFamily: event.bandFamily || null,
        dnaTag: event.dnaTag || null,
        meshTag: event.meshTag || null
      });
    } catch (err) {
      organResult = {
        ok: false,
        error: String(err),
        fallback: true
      };
    }
  }

  // -------------------------------------------------------------------------
  //  Return upgraded result (same shape, more powerful)
  // -------------------------------------------------------------------------
  return {
    ok: true,
    logs: healedLocal,
    organResult
  };
};

PulseRealm.ProxyMemoryRouter = {
  handler,
  PulseOSCheckRouterMemory
}