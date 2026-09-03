// netlify/functions/pulse-sql.js
import sql from "mssql";

// ⭐ Your MSSQL config
const config = {
    user: "YOUR_USERNAME",
    password: "YOUR_PASSWORD",
    server: "YOUR_SERVER",
    database: "YOUR_DATABASE",
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// ⭐ Internal: connect to SQL
async function connect() {
    return await sql.connect(config);
}

// ⭐ Internal: run a single query
async function runPulseQuery(query, params = {}) {
    const pool = await connect();
    const request = pool.request();

    // Add parameters if provided
    for (const key in params) {
        request.input(key, params[key]);
    }

    const result = await request.query(query);
    return result.recordset;
}

// ⭐ Internal: transaction wrapper
async function runPulseTransaction(callback) {
    const pool = await connect();
    const tx = new sql.Transaction(pool);

    await tx.begin();
    const request = new sql.Request(tx);

    try {
        const result = await callback(request);
        await tx.commit();
        return result;
    } catch (err) {
        await tx.rollback();
        throw err;
    }
}

// ⭐ Netlify handler — THIS is what the browser calls
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
