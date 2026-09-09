// netlify/functions/pulse-sql.js
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

// ============================================================================
//  RAW SQL EXECUTION (via Supabase RPC)
// ============================================================================

async function runPulseQuery(query, params = {}) {
  const response = await fetch(
    `${process.env.SUPABASE_DATABASE_URL}/rest/v1/rpc/raw_sql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": process.env.SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      },
      body: JSON.stringify({ query, params })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "SQL execution failed");
  }

  return data;
}

// ============================================================================
//  COMMAND PROCESSOR — handles browser fake Supabase commands
// ============================================================================

async function processCommands(commands = []) {
  const results = [];

  for (const cmd of commands) {
    let result;

    // ⭐ INSERT
    if (cmd.type === "insert") {
      const { data, error } = await getSupabase()
        .from(cmd.table)
        .insert(cmd.data)
        .select();

      if (error) throw error;
      result = data;
    }

    // ⭐ UPDATE
    if (cmd.type === "update") {
      const { data, error } = await getSupabase()
        .from(cmd.table)
        .update(cmd.data)
        .eq("id", cmd.id)
        .select();

      if (error) throw error;
      result = data;
    }

    // ⭐ RPC CALL
    if (cmd.type === "rpc") {
      const { data, error } = await getSupabase().rpc(cmd.name, cmd.params);
      if (error) throw error;
      result = data;
    }

    // ⭐ RAW SQL
    if (cmd.type === "sql") {
      result = await runPulseQuery(cmd.query, cmd.params);
    }

    results.push({ ok: true, cmd, result });
  }

  return results;
}

// ============================================================================
//  NEW: GET ALL TABLES
// ============================================================================

async function getAllTables() {
  const { data, error } = await getSupabase().rpc("raw_sql", {
    query: `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
  });

  if (error) throw error;
  return data;
}

// ============================================================================
//  NEW: GET ALL ROWS FROM A TABLE
// ============================================================================

async function getTableRows(table) {
  const { data, error } = await getSupabase().from(table).select("*");
  if (error) throw error;
  return data;
}

// ============================================================================
//  NEW: GET SINGLE DOC BY ID
// ============================================================================

async function getDoc(table, id) {
  const { data, error } = await getSupabase()
    .from(table)
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data || null;
}

// ============================================================================
//  NETLIFY HANDLER — receives commands OR raw SQL OR pulls
// ============================================================================

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, x-pulse-mode",
  "Content-Type": "application/json; charset=utf-8"
};

export async function handler(event) {
  // Handle OPTIONS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ ok: true })
    };
  }
  try {
    const body = JSON.parse(event.body || "{}");

    // ⭐ COMMANDS
    if (body.commands) {
      const results = await processCommands(body.commands);

      return {
        statusCode: 200,
        body: JSON.stringify({
          ok: true,
          mode: "commands",
          results
        })
      };
    }

    // ⭐ RAW SQL
    if (body.query) {
      const data = await runPulseQuery(body.query, body.params);

      return {
        statusCode: 200,
        body: JSON.stringify({
          ok: true,
          mode: "sql",
          data
        })
      };
    }

    // ⭐ GET ALL TABLES
    if (body.getAllTables) {
      const tables = await getAllTables();
      return {
        statusCode: 200,
        body: JSON.stringify({
          ok: true,
          mode: "getAllTables",
          tables
        })
      };
    }

    // ⭐ GET ALL ROWS FROM TABLE
    if (body.getTableRows) {
      const rows = await getTableRows(body.getTableRows);
      return {
        statusCode: 200,
        body: JSON.stringify({
          ok: true,
          mode: "getTableRows",
          table: body.getTableRows,
          rows
        })
      };
    }

    // ⭐ GET DOC BY ID
    if (body.getDoc) {
      const { table, id } = body.getDoc;
      const doc = await getDoc(table, id);

      return {
        statusCode: 200,
        body: JSON.stringify({
          ok: true,
          mode: "getDoc",
          table,
          id,
          doc
        })
      };
    }

    // ⭐ FIRE-AND-FORGET IDENTITY SYNC (called every 7s from browser interval)
    // PulseIdentity is the existing production table.  The browser's local id
    // is kept in attrs.localId because PulseIdentity.userID is a UUID.
    if (body.action === "sync") {
      const { identity, photos } = body;
      if (!identity?.id) {
        return {
          statusCode: 400,
          headers: CORS_HEADERS,
          body: JSON.stringify({ ok: false, error: "Missing identity.id" })
        };
      }

      const now = new Date().toISOString();
      const attrs = {
        ...identity,
        localId: identity.id,
        photoURL: photos?.photoURL || identity.photoURL || null,
        aliasPhotoURL: photos?.aliasPhotoURL || identity.aliasPhotoURL || null,
        bizphotoURL: photos?.bizphotoURL || identity.bizphotoURL || null,
        bizaliasPhotoURL: photos?.bizaliasPhotoURL || identity.bizaliasPhotoURL || null,
        syncedAt: now
      };
      const client = getSupabase();
      const { data: existing, error: lookupError } = await client
        .from("PulseIdentity")
        .select("userID")
        .eq("attrs->>localId", identity.id)
        .maybeSingle();

      if (lookupError) throw lookupError;

      const payload = {
        email: identity.email || identity.userEmail || null,
        name: identity.name || identity.userName || null,
        stripeID: identity.bank || null,
        attrs
      };
      const { error } = existing
        ? await client.from("PulseIdentity").update(payload).eq("userID", existing.userID)
        : await client.from("PulseIdentity").insert({ ...payload, created: now });

      if (error) {
        console.error("❌ [PULSE-SQL] Supabase sync error:", error);
        return {
          statusCode: 500,
          headers: CORS_HEADERS,
          body: JSON.stringify({ ok: false, error: error.message })
        };
      }

      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ ok: true, synced: identity.id })
      };
    }

    // ⭐ ADMIN READ — fetches production PulseIdentity records (Admin page only)
    if (body.action === "read") {
      const { data, error } = await getSupabase()
        .from("PulseIdentity")
        .select("*")
        .order("created", { ascending: false })
        .limit(1000);

      if (error) {
        console.error("❌ [PULSE-SQL] Admin read error:", error);
        return {
          statusCode: 500,
          headers: CORS_HEADERS,
          body: JSON.stringify({ ok: false, error: error.message })
        };
      }

      const users = (data || []).map((row) => ({
        ...row,
        ...(row.attrs || {}),
        id: row.attrs?.localId || row.userID,
        name: row.name || row.attrs?.name || null,
        email: row.email || row.attrs?.email || row.attrs?.userEmail || null,
        pulse_points: row.attrs?.PulsePoints ?? 0,
        updated_at: row.attrs?.syncedAt || row.created || null
      }));

      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ ok: true, users })
      };
    }

    // ⭐ NOTHING PROVIDED
    return {
      statusCode: 400,
      body: JSON.stringify({
        ok: false,
        error: "No commands, SQL, or pull request provided."
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        error: err.message
      })
    };
  }
}
