// ============================================================================
//  PULSE-PREWARM-v8 — SELF-ORIGIN IGNITION (NO MULTIVERSE HAMMERING)
//  Each universe warms ONLY itself + its own local fallbacks.
//  Prevents 15s hangs, 499 spam, DNS hammering, Netlify load illusions.
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

export async function handler() {

  // ==========================================================================
  //  DETECT CURRENT UNIVERSE (THE SITE WE ARE RUNNING ON)
  // ==========================================================================
  const CURRENT = (globalThis.location?.origin ?? "").toLowerCase();

  // ==========================================================================
  //  LOCAL FALLBACKS (ONLY FOR CURRENT SITE)
  // ==========================================================================
  const SITE_LOCAL              = "/";
  const TOUCH_GATE_LOCAL        = "../pulse-multiverse/pulse-universe/pulse-universal-touch-gate.js";
  const TOUCH_ENGINE_LOCAL      = "../pulse-multiverse/pulse-multiversal-touch.js";
  const BOOT_BARRIER_LOCAL      = "../pulse-multiverse/_creation_barrier/pulse-boot-barrier.js";
  const BOOT_WORLD_LOCAL        = "../pulse-multiverse/_creation_barrier/pulse-boot-world.js";
  const WORLD_ROUTE_TXT_LOCAL   = "../pulse-multiverse/PULSEConfig/PulseWorldReality.txt";
  const WORLD_LOGIN_TXT_LOCAL   = "../pulse-multiverse/PULSEConfig/PulseWorldInventory.txt";
  const WORLD_HTML_LOCAL        = "../pulse-multiverse/index.html";
  const WORLD_404_LOCAL         = "../pulse-multiverse/404.html";

  // ==========================================================================
  //  SAFE WARM HELPER — ONLY WARMS CURRENT SITE
  // ==========================================================================
  const warm = async (internetURL, localURL) => {
    try {
      // Only warm if URL matches CURRENT origin
      if (internetURL.toLowerCase().startsWith(CURRENT)) {
        await fetch(internetURL, { cache: "no-store" });
      }
    } catch (_) {
      if (!localURL) return;
      try {
        await fetch(localURL, { cache: "no-store" });
      } catch (_) {}
    }
  };

  // ==========================================================================
  //  SINGLE IGNITION PASS — ONLY CURRENT SITE
  // ==========================================================================
  const igniteOnce = async () => {

    // Warm the CURRENT site only
    await warm(CURRENT, SITE_LOCAL);
    
    await warm(SITE_LOCAL, null);
    // Warm local fallbacks (never internet)
    await warm(TOUCH_ENGINE_LOCAL, null);
    await warm(WORLD_HTML_LOCAL, null);
    await warm(BOOT_BARRIER_LOCAL, null);
    await warm(BOOT_WORLD_LOCAL, null);
    await warm(WORLD_ROUTE_TXT_LOCAL, null);
    await warm(WORLD_LOGIN_TXT_LOCAL, null);
  };

  // ==========================================================================
  //  MICRO-PULSE LOOP — FULL 60 SECONDS, NO MULTIVERSE HAMMERING
  // ==========================================================================
  const start = Date.now();
  while (Date.now() - start < 60000) {
    await igniteOnce();
  }

  // ==========================================================================
  //  DONE
  // ==========================================================================
  return {
    statusCode: 200,
    body: "PULSE PREWARM COMPLETE — SELF-ORIGIN ONLY — NO MULTIVERSE HAMMERING"
  };
}
