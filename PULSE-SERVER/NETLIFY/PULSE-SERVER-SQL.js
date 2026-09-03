// netlify/functions/pulse-sql.js
import { createClient } from "@supabase/supabase-js";

// ⭐ Create Supabase client using Netlify extension variables
const supabase = createClient(
  process.env.SUPABASE_DATABASE_URL,
  process.env.PulseWorld_SUPABASE_ANON_KEY
);


// ⭐ Run a SQL query using Supabase's Postgres RPC or SQL endpoint
async function runPulseQuery(query, params = {}) {
  // Supabase SQL endpoint (requires service role key)
  const response = await fetch(`${process.env.SUPABASE_DATABASE_URL}/rest/v1/rpc/raw_sql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": process.env.SUPABASE_SERVICE_ROLE_KEY,
      "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
    },
    body: JSON.stringify({ query, params })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "SQL execution failed");
  }

  return data;
}

// ⭐ Netlify handler — THIS is what your browser calls
export async function handler(event) {
  try {
    const { query, params } = JSON.parse(event.body);

    const data = await runPulseQuery(query, params);

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, data })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: err.message })
    };
  }
}
