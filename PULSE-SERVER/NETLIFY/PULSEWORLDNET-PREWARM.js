// ============================================================================
//  PULSE-PREWARM-v9 — SELF-ORIGIN IGNITION + PRESENCE DAEMON
//  Warm current universe + run inactivity sweep every 2 minutes.
//  Prevents multiverse hammering, DNS spam, Netlify illusions.
// ============================================================================
globalThis.PulseRealm = globalThis;
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

import { getSupabase } from "./_shared/supabase.js";

export async function handler() {

  const CURRENT = (PulseRealm.location?.origin ?? "").toLowerCase();

  // ==========================================================================
  //  SAFE WARM HELPER — ONLY WARMS CURRENT SITE
  // ==========================================================================
  const warm = async (internetURL, localURL) => {
    try {
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
  //  IGNITE CURRENT UNIVERSE
  // ==========================================================================
  const igniteOnce = async () => {
    await warm(CURRENT, "/");
    await warm("/", null);
    await warm("../pulse-multiverse/DriftCompanion.js", null);
    await warm("../pulse-multiverse/pulse-multiversal-touch.js", null);
    await warm("../pulse-multiverse/index.html", null);
    await warm("../pulse-multiverse/_creation_barrier/pulse-boot-barrier.js", null);
    await warm("../pulse-multiverse/_creation_barrier/pulse-boot-world.js", null);
    await warm("../pulse-multiverse/PULSEConfig/PulseWorldReality.txt", null);
    await warm("../pulse-multiverse/PULSEConfig/PulseWorldInventory.txt", null);
  };

  // ==========================================================================
  //  PRESENCE DAEMON — RUNS EVERY 2 MINUTES
  // ==========================================================================
  const runPresenceSweep = async () => {
    const client = getSupabase();
    const now = Date.now();

    const inactiveCutoff = new Date(now - 5 * 60_000).toISOString();   // 5 minutes
    const offlineCutoff  = new Date(now - 15 * 60_000).toISOString();  // 15 minutes

    // ⭐ INACTIVE (idle but tab still open)
    // online=true AND lastUpdated older than 5 minutes
    await client
      .from("PulseIdentity")
      .update({ inactive: true })
      .eq("online", true)
      .lt("lastUpdated", inactiveCutoff);

    // ⭐ OFFLINE (idle too long)
    // online=true AND lastUpdated older than 15 minutes
    await client
      .from("PulseIdentity")
      .update({ online: false, inactive: false })
      .eq("online", true)
      .lt("lastUpdated", offlineCutoff);
  };

  // ==========================================================================
  //  MAIN LOOP — 60 SECONDS
  // ==========================================================================
  const start = Date.now();
  let lastSweep = Date.now();

  while (Date.now() - start < 60000) {

    // Warm universe
    await igniteOnce();

    // Run presence sweep every 2 minutes
    if (Date.now() - lastSweep > 120000) {
      await runPresenceSweep();
      lastSweep = Date.now();
    }
  }

  return {
    statusCode: 200,
    body: "PULSE PREWARM COMPLETE — IGNITION + PRESENCE DAEMON"
  };
}
