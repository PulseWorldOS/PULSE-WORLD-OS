// netlify/functions/pulse-sql.js
import { createClient } from "@supabase/supabase-js";

// ⭐ Create Supabase client using Netlify extension variables
const supabase = createClient(
  process.env.SUPABASE_DATABASE_URL,
  process.env.PulseWorld_SUPABASE_ANON_KEY
);

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
      const { data, error } = await supabase
        .from(cmd.table)
        .insert(cmd.data)
        .select();

      if (error) throw error;
      result = data;
    }

    // ⭐ UPDATE
    if (cmd.type === "update") {
      const { data, error } = await supabase
        .from(cmd.table)
        .update(cmd.data)
        .eq("id", cmd.id)
        .select();

      if (error) throw error;
      result = data;
    }

    // ⭐ RPC CALL
    if (cmd.type === "rpc") {
      const { data, error } = await supabase.rpc(cmd.name, cmd.params);
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
  const { data, error } = await supabase.rpc("raw_sql", {
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
  const { data, error } = await supabase.from(table).select("*");
  if (error) throw error;
  return data;
}

// ============================================================================
//  NEW: GET SINGLE DOC BY ID
// ============================================================================

async function getDoc(table, id) {
  const { data, error } = await supabase
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
