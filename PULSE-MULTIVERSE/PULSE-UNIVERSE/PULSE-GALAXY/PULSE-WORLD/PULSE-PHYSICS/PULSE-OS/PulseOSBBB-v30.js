// ============================================================================
//  PulseOSOuterBBB-v30-IMMORTAL-SPINE++++.js
//  OUTER BLOOD–BRAIN BARRIER — OS SHELL PERIMETER (v30++++ IMMORTAL)
//  Dualband • PulseBand+MeshBand • Presence-Aware • Mesh-Aware • Expansion-Aware
//  Trust-Boundary v30 • Continuance-Guard v30 • Prewarm/Lane Intel v30
//  PURE PERMISSION. ZERO BACKEND. ZERO NETWORK. ZERO UI.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});




// ============================================================================
//  FACTORY — BBB MUST HAVE ZERO IMPORTS (all deps injected)
// ============================================================================
export function createPulseOSBBB({ log } = {}) {
  const BBBMeta = {
    layer: "OuterBBB",
    version: "30-IMMORTAL-SPINE++++",
    generation: "v30++++",
    dualBand: true,
    bandFamilyAware: true,
    symbolicSurface: true,
    binaryCompressionSurface: true,

    // v30++++ metadata
    trustBoundary: "v30",
    continuanceGuard: "v30",
    presenceAware: true,
    meshAware: true,
    expansionAware: true,
    advantageAware: true
  };

  const BAND_FAMILY = {
    PULSEBAND: "PulseBand",
    MESHBAND: "meshband"
  };

  function normalizeBand(band) {
    const b = String(band || "dual").toLowerCase();
    return b === "binary" || b === "symbolic" || b === "dual" ? b : "dual";
  }

  function normalizeBandFamily(family) {
    const f = String(family || BAND_FAMILY.PULSEBAND).toLowerCase();
    return f === BAND_FAMILY.MESHBAND ? BAND_FAMILY.MESHBAND : BAND_FAMILY.PULSEBAND;
  }

  // ========================================================================
  //  SHELL STATE ENUM — v30++++
  // ========================================================================
  const SHELL_STATES = {
    NO_SHELL: "no-shell",
    ANON_SHELL: "anon-shell",
    AUTH_SHELL: "auth-shell"
  };

  // ========================================================================
  //  ROUTE CLASSIFICATION — v30++++
// ========================================================================
  const HARD_NO_SHELL_ROUTES = new Set([
    "login",
    "404",
    "expired",
    "maintenance",
    "offline",
    "fatal",
    "panic"
  ]);

  const ANON_SHELL_ROUTES = new Set([
    "main",
    "landing",
    "marketing",
    "moat",
    "public",
    "welcome"
  ]);

  const PRESENCE_PRIORITY_ROUTES = new Set([
    "main",
    "home",
    "dashboard",
    "play",
    "session",
    "party"
  ]);

  const PREFETCH_PRIORITY_ROUTES = new Set([
    "main",
    "home",
    "dashboard",
    "library",
    "store"
  ]);

  const ADVANTAGE_ROUTE_TIERS = {
    critical: new Set(["dashboard", "session", "party", "play"]),
    high: new Set(["home", "main", "library"]),
    medium: new Set(["store", "public", "landing"]),
    low: new Set(["marketing", "moat"])
  };

  function classifyAdvantageTier(route) {
    const r = (route || "").toLowerCase();
    if (ADVANTAGE_ROUTE_TIERS.critical.has(r)) return "critical";
    if (ADVANTAGE_ROUTE_TIERS.high.has(r)) return "high";
    if (ADVANTAGE_ROUTE_TIERS.medium.has(r)) return "medium";
    return "low";
  }

  // ========================================================================
  //  determineShellState — pure, deterministic, v30++++
// ========================================================================
  function determineShellState({ routeName, hasIdentity }) {
    const route = (routeName || "").toLowerCase();

    if (HARD_NO_SHELL_ROUTES.has(route)) return SHELL_STATES.NO_SHELL;
    if (ANON_SHELL_ROUTES.has(route)) return SHELL_STATES.ANON_SHELL;
    if (hasIdentity) return SHELL_STATES.AUTH_SHELL;

    return SHELL_STATES.ANON_SHELL;
  }

  // ========================================================================
  //  guardPulseBand — v30++++ trust boundary + continuance guard
  // ========================================================================
  function guardPulseBand({
    routeName,
    hasIdentity,
    band = "dual",
    bandFamily = "PulseBand",
    dnaTag = null,
    meshTag = null
  } = {}) {
    const shellState = determineShellState({ routeName, hasIdentity });
    const normBand = normalizeBand(band);
    const normFamily = normalizeBandFamily(bandFamily);

    const advantageTier = classifyAdvantageTier(routeName);

    const allowPulseBand =
      shellState === SHELL_STATES.ANON_SHELL ||
      shellState === SHELL_STATES.AUTH_SHELL;

    const allowIdentity = shellState === SHELL_STATES.AUTH_SHELL;

    return {
      shellState,
      allowPulseBand,
      allowIdentity,

      band: normBand,
      bandFamily: normFamily,
      dnaTag,
      meshTag,

      trustBoundary: BBBMeta.trustBoundary,
      continuanceGuard: BBBMeta.continuanceGuard,
      advantageTier
    };
  }

  // ========================================================================
  //  buildCacheHints — v30++++ lane/prewarm intelligence
  // ========================================================================
  function buildCacheHints({
    routeName,
    band = "dual",
    bandFamily = "PulseBand"
  } = {}) {
    const route = (routeName || "").toLowerCase();

    const prewarm = PREFETCH_PRIORITY_ROUTES.has(route);
    const presenceCritical = PRESENCE_PRIORITY_ROUTES.has(route);

    const advantageTier = classifyAdvantageTier(route);

    return {
      route,
      prewarmChunks: prewarm,
      prewarmPresence: presenceCritical,
      suggestedBands: {
        symbolic: true,
        binary: true,
        band: normalizeBand(band),
        bandFamily: normalizeBandFamily(bandFamily)
      },

      advantageTier,
      laneHints: {
        hot: prewarm,
        presence: presenceCritical
      }
    };
  }

  // ========================================================================
  //  buildPresenceDirectives — v30++++ presence + mesh + expansion metadata
  // ========================================================================
  function buildPresenceDirectives({
    routeName,
    hasIdentity,
    bluetoothAvailable,
    meshAvailable,
    band = "dual",
    bandFamily = "PulseBand"
  } = {}) {
    const route = (routeName || "").toLowerCase();
    const presenceCritical = PRESENCE_PRIORITY_ROUTES.has(route);

    const enablePresenceField =
      presenceCritical && (hasIdentity || route === "party");

    const enableBluetoothPresence =
      enablePresenceField && !!bluetoothAvailable;

    const enableMeshPresence =
      enablePresenceField && !!meshAvailable;

    const advantageTier = classifyAdvantageTier(route);

    return {
      route,
      enablePresenceField,
      enableBluetoothPresence,
      enableMeshPresence,

      band: normalizeBand(band),
      bandFamily: normalizeBandFamily(bandFamily),

      advantageTier,
      expansionAware: true,
      meshAware: enableMeshPresence,
      presenceAware: enablePresenceField
    };
  }

  // ========================================================================
  //  PUBLIC BBB INTERFACE — v30++++ IMMORTAL
  // ========================================================================
  return {
    BBBMeta,
    SHELL_STATES,
    determineShellState,
    guardPulseBand,
    buildCacheHints,
    buildPresenceDirectives
  };
}

PulseRealm.OSBBB = {
  createPulseOSBBB
}