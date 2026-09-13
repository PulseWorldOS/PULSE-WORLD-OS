// ============================================================================
//  PULSE-PREWARM-v9 — SELF-ORIGIN IGNITION + PRESENCE DAEMON
//  Warm current universe + run inactivity sweep every 2 minutes.
//  Prevents multiverse hammering, DNS spam, Netlify illusions.
// ============================================================================

import { createClient } from "@supabase/supabase-js";

// ⭐ Lazy Supabase client — only created when handler runs, not at module load
// This prevents crashes during cold starts if env vars are momentarily unavailable
let _supabase = null;
function getSupabase() {
  if (!_supabase) {
    const url = process.env.SUPABASE_DATABASE_URL;
    // This function is the server-side boundary for both background sync and
    // the admin-only read.  It must use the server-only key: the database has
    // RLS enabled and the browser must never receive this credential.
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error("Supabase env vars not set (SUPABASE_DATABASE_URL / SUPABASE_SERVICE_ROLE_KEY)");
    _supabase = createClient(url, key);
  }
  return _supabase;
}

export async function handler() {

  const CURRENT = (globalThis.location?.origin ?? "").toLowerCase();

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

  // Run presence sweep immediately
  await runPresenceSweep();

  // Then warm for 5–10 seconds max
  const start = Date.now();
  while (Date.now() - start < 10000) {
    await igniteOnce();
  }


  return {
    statusCode: 200,
    body: "PULSE PREWARM COMPLETE — IGNITION + PRESENCE DAEMON"
  };
}
