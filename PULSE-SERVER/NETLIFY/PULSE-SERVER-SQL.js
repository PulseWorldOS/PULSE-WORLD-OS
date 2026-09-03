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
//  NETLIFY HANDLER — receives commands OR raw SQL
// ============================================================================

export async function handler(event) {
  try {
    const body = JSON.parse(event.body || "{}");

    // ⭐ If browser sent commands → process them
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

    // ⭐ If browser sent raw SQL → run it
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

    // ⭐ Nothing provided
    return {
      statusCode: 400,
      body: JSON.stringify({
        ok: false,
        error: "No commands or SQL provided."
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
