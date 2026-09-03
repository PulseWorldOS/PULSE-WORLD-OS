// netlify/functions/pulse-server-admin.js

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, x-pulse-mode",
  "Content-Type": "application/json; charset=utf-8"
};

export async function handler(event, context) {
  // Handle OPTIONS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ ok: true })
    };
  }

  try {
    // ------------------------------------------------------------
    // Parse incoming POST body
    // ------------------------------------------------------------
    const body = JSON.parse(event.body || "{}");

    // Client sends:
    // {
    //   code: "...",
    //   meta: {...}
    // }
    const adminCode = body.code?.trim();
    const meta = body.meta || {};

    // ------------------------------------------------------------
    // ADMIN PASSWORD (server-side only)
    // ------------------------------------------------------------
    // const ADMIN_PASSWORD = process.env.PULSE_ADMIN_PASSWORD || "pulseworldnet";
    const ADMIN_PASSWORD = "pulseworldnet";

    // ------------------------------------------------------------
    // Validate admin code
    // ------------------------------------------------------------
    if (adminCode === ADMIN_PASSWORD) {
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: true,
          status: "ok",
          mode: "domain",   // or "domain"
          timestamp: new Date().toISOString(),
          meta
        })
      };
    }

    // ------------------------------------------------------------
    // INVALID PASSWORD
    // ------------------------------------------------------------
    return {
      statusCode: 401,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        status: "invalid",
        mode: "challenge",
        timestamp: new Date().toISOString(),
        meta
      })
    };

  } catch (err) {
    console.error("❌ PulseWorld Admin Auth Error:", err);

    // ------------------------------------------------------------
    // SERVER ERROR
    // ------------------------------------------------------------
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: false,
        status: "error",
        message: err.message,
        timestamp: new Date().toISOString()
      })
    };
  }
}
