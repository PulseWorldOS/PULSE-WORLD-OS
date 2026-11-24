// PULSE-SERVER/NETLIFY/PULSE-SERVER-SQL.js
// Privacy-first Supabase Identity, Uniqueness Check, Alias Resolution & Stripe-ID Lookup

import {
  CORS_HEADERS,
  DEFAULT_EMAIL_DOMAIN,
  buildAliasEmail,
  getAllowedEmailDomains,
  getStripeClient,
  getSupabaseAdmin,
  isPlaceholderEmail,
  isPlaceholderName,
  isValidStripeAccountId,
  jsonResponse,
  maskEmail,
  normalizeIdentityName,
  parseBody,
  resolveAllowedDomain,
  sanitizeAliasHandle,
  stripTimestamp
} from "./_shared/pulse-domains.js";

// ============================================================================
//  RAW SQL EXECUTION (via Supabase RPC)
// ============================================================================

async function runPulseQuery(query, params = {}) {
  const url =
    process.env.SUPABASE_DATABASE_URL ||
    process.env.PulseWorld_SUPABASE_DATABASE_URL;
  const response = await fetch(`${url}/rest/v1/rpc/raw_sql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
    },
    body: JSON.stringify({ query, params })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || "SQL execution failed");
  }
  return data;
}

// ============================================================================
//  COMMAND PROCESSOR — handles browser Supabase command batches
// ============================================================================

async function processCommands(commands = []) {
  const results = [];
  const supabase = getSupabaseAdmin();

  for (const cmd of commands) {
    let result;

    if (cmd.type === "insert") {
      const { data, error } = await supabase
        .from(cmd.table)
        .insert(cmd.data)
        .select();
      if (error) throw error;
      result = data;
    }

    if (cmd.type === "update") {
      const { data, error } = await supabase
        .from(cmd.table)
        .update(cmd.data)
        .eq("id", cmd.id)
        .select();
      if (error) throw error;
      result = data;
    }

    if (cmd.type === "rpc") {
      const { data, error } = await supabase.rpc(cmd.name, cmd.params);
      if (error) throw error;
      result = data;
    }

    if (cmd.type === "sql") {
      result = await runPulseQuery(cmd.query, cmd.params);
    }

    results.push({ ok: true, cmd, result });
  }

  return results;
}

async function getAllTables() {
  const { data, error } = await getSupabaseAdmin().rpc("raw_sql", {
    query: `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `
  });
  if (error) throw error;
  return data;
}

async function getTableRows(table) {
  const { data, error } = await getSupabaseAdmin().from(table).select("*");
  if (error) throw error;
  return data;
}

async function getDoc(table, id) {
  const { data, error } = await getSupabaseAdmin()
    .from(table)
    .select("*")
    .eq("id", id)
    .single();
  if (error && error.code !== "PGRST116") throw error;
  return data || null;
}

// ============================================================================
//  IDENTITY HELPERS — Name Uniqueness, Alias Lookup & Privacy-First Stripe Pull
// ============================================================================

function isDuplicateError(err) {
  if (!err) return false;
  const code = String(err.code || "");
  const msg = String(err.message || "").toLowerCase();
  return (
    code === "23505" ||
    msg.includes("duplicate key") ||
    msg.includes("unique constraint") ||
    msg.includes("violates unique") ||
    msg.includes("already exists")
  );
}

function duplicateResponse(identityField, suggestions = []) {
  return jsonResponse(409, {
    ok: false,
    duplicate: true,
    available: false,
    field: identityField || "name",
    suggestions,
    error:
      "Identity conflict — this name is already claimed in the PulseWorld Continuity Layer. Please choose another name."
  });
}

async function getServerNow(client) {
  try {
    const { data: serverTime } = await client.rpc("pulse_server_time");
    if (serverTime?.now) {
      return new Date(serverTime.now).toISOString();
    }
  } catch {
    // RPC may not exist on all deployments — fallback to UTC ISO
  }
  return new Date().toISOString();
}

function isSameOwner(row, { localId, stripeID, userID } = {}) {
  if (!row) return false;
  if (userID && row.userID && row.userID === userID) return true;
  if (localId && (row.localId === localId || row.attrs?.localId === localId)) {
    return true;
  }
  if (
    stripeID &&
    isValidStripeAccountId(stripeID) &&
    row.stripeID &&
    row.stripeID.trim() === stripeID.trim()
  ) {
    return true;
  }
  return false;
}

async function findConflictingNameOwner(client, rawName, ownerHints = {}) {
  const cleanName = stripTimestamp(String(rawName || "")).replace(/\s+/g, " ").trim();
  const normalizedName = normalizeIdentityName(cleanName);
  const aliasHandle = sanitizeAliasHandle(cleanName).toLowerCase();

  // Query by exact case-insensitive name match
  const { data: nameMatches, error: nameErr } = await client
    .from("PulseIdentity")
    .select("userID, name, localId, stripeID, attrs")
    .ilike("name", cleanName)
    .limit(10);

  if (nameErr) throw nameErr;

  for (const row of nameMatches || []) {
    if (normalizeIdentityName(row.name) === normalizedName && !isSameOwner(row, ownerHints)) {
      return row;
    }
  }

  // Also check aliasHandle collisions (e.g. "Lockstep Router" vs "Lockstep-Router")
  const { data: handleMatches, error: handleErr } = await client
    .from("PulseIdentity")
    .select("userID, name, localId, stripeID, attrs")
    .ilike("attrs->>aliasHandle", aliasHandle)
    .limit(10);

  if (!handleErr && Array.isArray(handleMatches)) {
    for (const row of handleMatches) {
      const rowHandle = String(row.attrs?.aliasHandle || sanitizeAliasHandle(row.name)).toLowerCase();
      if (rowHandle === aliasHandle && !isSameOwner(row, ownerHints)) {
        return row;
      }
    }
  }

  return null;
}

async function buildNameSuggestions(client, rawName) {
  const base = sanitizeAliasHandle(rawName).slice(0, 28);
  const candidates = [
    `${base}-${Math.floor(10 + Math.random() * 89)}`,
    `${base}-Pulse`,
    `${base}-${Math.floor(100 + Math.random() * 899)}`
  ];
  const available = [];
  for (const candidate of candidates) {
    try {
      const conflict = await findConflictingNameOwner(client, candidate, {});
      if (!conflict) available.push(candidate);
    } catch {
      available.push(candidate);
    }
  }
  return available;
}

async function findIdentityRow(client, { localId, stripeID, userID } = {}) {
  if (userID) {
    const { data } = await client
      .from("PulseIdentity")
      .select("*")
      .eq("userID", userID)
      .maybeSingle();
    if (data) return data;
  }

  if (stripeID && isValidStripeAccountId(stripeID)) {
    const { data } = await client
      .from("PulseIdentity")
      .select("*")
      .eq("stripeID", stripeID.trim())
      .maybeSingle();
    if (data) return data;
  }

  if (localId) {
    const { data } = await client
      .from("PulseIdentity")
      .select("*")
      .eq("attrs->>localId", localId)
      .maybeSingle();
    if (data) return data;

    const { data: byCol } = await client
      .from("PulseIdentity")
      .select("*")
      .eq("localId", localId)
      .maybeSingle();
    if (byCol) return byCol;
  }

  return null;
}

function serializeIdentityRecord(row) {
  if (!row) return null;
  const attrs = row.attrs || {};
  const cleanName = stripTimestamp(row.name || attrs.name || "");
  const { domain: emailDomain } = resolveAllowedDomain(
    attrs.emailDomain || (row.email?.includes("@") ? row.email.split("@")[1] : DEFAULT_EMAIL_DOMAIN)
  );
  const aliasHandle = attrs.aliasHandle || (cleanName ? sanitizeAliasHandle(cleanName) : null);
  const aliasEmail =
    attrs.aliasEmail || (aliasHandle ? `${aliasHandle}@${emailDomain}` : row.email || null);
  const stripeID = isValidStripeAccountId(row.stripeID)
    ? row.stripeID.trim()
    : isValidStripeAccountId(attrs.tokenID)
      ? attrs.tokenID.trim()
      : isValidStripeAccountId(attrs.bank)
        ? attrs.bank.trim()
        : null;

  return {
    userID: row.userID,
    id: attrs.localId || row.localId || row.userID,
    name: cleanName || null,
    aliasHandle,
    emailDomain,
    aliasEmail,
    email: aliasEmail || row.email || null,
    userEmail: attrs.userEmail || attrs.realEmail || null,
    userName: attrs.userName || null,
    phone: row.phone || attrs.phone || null,
    country: attrs.country || "US",
    role: attrs.role || "User",
    pulseRole: attrs.pulseRole || "Entrepreneur",
    stripeID,
    bank: stripeID || attrs.bank || "Not Tethered",
    tokenID: stripeID,
    stripeStatus: attrs.stripeStatus || null,
    smsOpt: Boolean(attrs.smsOpt),
    emailOpt: Boolean(attrs.emailOpt),
    PulsePoints: attrs.PulsePoints ?? 0,
    pulse_points: attrs.PulsePoints ?? 0,
    host: row.host || attrs.host || null,
    lastPage: row.lastPage || null,
    proximity: row.proximity || null,
    lastProximity: row.lastProximity || null,
    online: row.online ?? false,
    inactive: row.inactive ?? false,
    photoURL: attrs.photoURL || null,
    aliasPhotoURL: attrs.aliasPhotoURL || null,
    bizphotoURL: attrs.bizphotoURL || null,
    bizaliasPhotoURL: attrs.bizaliasPhotoURL || null,
    created: row.created || null,
    updated_at: row.lastUpdated || attrs.syncedAt || row.created || null
  };
}

// ============================================================================
//  NETLIFY HANDLER
// ============================================================================

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(200, { ok: true });
  }

  try {
    const body =
      event.httpMethod === "GET"
        ? event.queryStringParameters || {}
        : parseBody(event);

    // ------------------------------------------------------------------------
    // 0. LIST ALLOWED EMAIL DOMAINS
    // ------------------------------------------------------------------------
    if (body.action === "listDomains") {
      return jsonResponse(200, {
        ok: true,
        defaultDomain: DEFAULT_EMAIL_DOMAIN,
        domains: getAllowedEmailDomains()
      });
    }

    // ------------------------------------------------------------------------
    // 1. SERVER-SIDE IDENTITY NAME AVAILABILITY CHECK
    // ------------------------------------------------------------------------
    if (body.action === "checkName") {
      const rawName = String(body.name || "").trim();
      const cleanName = stripTimestamp(rawName).replace(/\s+/g, " ").trim();
      const { domain: emailDomain } = resolveAllowedDomain(body.emailDomain);

      if (!cleanName || cleanName.length < 2) {
        return jsonResponse(200, {
          ok: true,
          available: false,
          reason: "too_short",
          error: "Identity name must be at least 2 characters."
        });
      }

      if (cleanName.length > 48) {
        return jsonResponse(200, {
          ok: true,
          available: false,
          reason: "too_long",
          error: "Identity name must be 48 characters or fewer."
        });
      }

      if (isPlaceholderName(cleanName)) {
        return jsonResponse(200, {
          ok: true,
          available: false,
          reason: "reserved",
          error: "Please pick a unique personal display name."
        });
      }

      const client = getSupabaseAdmin();
      const conflict = await findConflictingNameOwner(client, cleanName, {
        localId: body.localId || null,
        stripeID: body.stripeID || null,
        userID: body.userID || null
      });

      const aliasHandle = sanitizeAliasHandle(cleanName);
      const aliasPreview = `${aliasHandle}@${emailDomain}`;

      if (conflict) {
        const suggestions = await buildNameSuggestions(client, cleanName);
        return jsonResponse(200, {
          ok: true,
          available: false,
          reason: "taken",
          name: cleanName,
          normalized: normalizeIdentityName(cleanName),
          aliasHandle,
          aliasPreview,
          suggestions,
          error: `"${cleanName}" is already claimed in PulseWorld. Try one of the available alternatives.`
        });
      }

      return jsonResponse(200, {
        ok: true,
        available: true,
        name: cleanName,
        normalized: normalizeIdentityName(cleanName),
        aliasHandle,
        aliasPreview,
        emailDomain
      });
    }

    // ------------------------------------------------------------------------
    // 2. PRIVACY-FIRST PULL STRICTLY BY STRIPE ID
    //    ("The best held identity is one never held — Stripe holds real PII,
    //     PulseWorld holds stripeID + digital identity.")
    // ------------------------------------------------------------------------
    if (body.action === "getByStripeId") {
      const stripeID = String(body.stripeID || body.stripeId || body.account || "").trim();
      if (!isValidStripeAccountId(stripeID)) {
        return jsonResponse(400, {
          ok: false,
          error: "Invalid Stripe Account ID. Expected format: acct_..."
        });
      }

      const client = getSupabaseAdmin();
      const row = await findIdentityRow(client, { stripeID });

      // Pull live status directly from Stripe API (and fall back to Supabase Stripe Wrapper public."PulseUser")
      let stripeLive = null;
      let stripeSource = "none";

      try {
        const stripe = getStripeClient();
        const acct = await stripe.accounts.retrieve(stripeID);
        let balance = null;
        try {
          const bal = await stripe.balance.retrieve({ stripeAccount: stripeID });
          const avail = (bal.available || []).reduce((s, b) => s + b.amount, 0) / 100;
          const pend = (bal.pending || []).reduce((s, b) => s + b.amount, 0) / 100;
          balance = {
            availableBalance: avail.toFixed(2),
            pendingBalance: pend.toFixed(2),
            totalBalance: (avail + pend).toFixed(2)
          };
        } catch {
          // Connected account may not yet have balance enabled
        }

        stripeLive = {
          stripeID: acct.id,
          country: acct.country || "US",
          maskedEmail: maskEmail(acct.email),
          detailsSubmitted: Boolean(acct.details_submitted),
          chargesEnabled: Boolean(acct.charges_enabled),
          payoutsEnabled: Boolean(acct.payouts_enabled),
          transfersEnabled: acct.capabilities?.transfers === "active",
          requirementsDue: acct.requirements?.currently_due || [],
          disabledReason: acct.requirements?.disabled_reason || null,
          balance
        };
        stripeSource = "stripe_api";
      } catch (stripeErr) {
        // Fallback: check Supabase Stripe Foreign Data Wrapper table public."PulseUser"
        try {
          const { data: fdwRow } = await client
            .from("PulseUser")
            .select("*")
            .eq("id", stripeID)
            .maybeSingle();
          if (fdwRow) {
            stripeLive = {
              stripeID: fdwRow.id,
              country: fdwRow.country || "US",
              maskedEmail: maskEmail(fdwRow.email),
              detailsSubmitted: Boolean(fdwRow.attrs?.details_submitted),
              chargesEnabled: Boolean(fdwRow.attrs?.charges_enabled),
              payoutsEnabled: Boolean(fdwRow.attrs?.payouts_enabled)
            };
            stripeSource = "supabase_stripe_wrapper";
          }
        } catch {
          // Ignore wrapper fallback error
        }
        if (!stripeLive) {
          console.warn("[PULSE-SQL] Stripe retrieve warning:", stripeErr.message);
        }
      }

      if (!row && !stripeLive) {
        return jsonResponse(404, {
          ok: false,
          found: false,
          error: "No PulseWorld identity or Stripe Connect account found for that Stripe ID."
        });
      }

      const serialized = serializeIdentityRecord(row);
      return jsonResponse(200, {
        ok: true,
        found: true,
        stripeID,
        stripeSource,
        identity: serialized,
        stripe: stripeLive
      });
    }

    // ------------------------------------------------------------------------
    // 3. ALIAS LOOKUP (for multi-domain sending & Catch-All inbound verification)
    // ------------------------------------------------------------------------
    if (body.action === "lookupAlias") {
      const raw = String(body.alias || body.email || "").trim().toLowerCase();
      if (!raw) {
        return jsonResponse(400, { ok: false, error: "Missing alias or email" });
      }

      const [rawHandle, rawDom] = raw.includes("@") ? raw.split("@") : [raw, null];
      const handle = sanitizeAliasHandle(rawHandle).toLowerCase();
      const client = getSupabaseAdmin();

      let matched = null;

      if (raw.includes("@")) {
        const { data: byFull } = await client
          .from("PulseIdentity")
          .select("*")
          .ilike("attrs->>aliasEmail", raw)
          .maybeSingle();
        matched = byFull || null;
      }

      if (!matched) {
        const { data: byHandle } = await client
          .from("PulseIdentity")
          .select("*")
          .ilike("attrs->>aliasHandle", handle)
          .limit(5);
        if (Array.isArray(byHandle) && byHandle.length > 0) {
          matched =
            byHandle.find(
              (r) => !rawDom || String(r.attrs?.emailDomain || "").toLowerCase() === rawDom
            ) || byHandle[0];
        }
      }

      if (!matched) {
        const { data: byName } = await client
          .from("PulseIdentity")
          .select("*")
          .ilike("name", rawHandle.replace(/-/g, " "))
          .maybeSingle();
        matched = byName || null;
      }

      if (!matched) {
        const { data: byExactName } = await client
          .from("PulseIdentity")
          .select("*")
          .ilike("name", rawHandle)
          .maybeSingle();
        matched = byExactName || null;
      }

      if (!matched) {
        return jsonResponse(200, { ok: true, found: false, alias: raw });
      }

      const rec = serializeIdentityRecord(matched);
      return jsonResponse(200, {
        ok: true,
        found: true,
        name: rec.name,
        aliasHandle: rec.aliasHandle,
        emailDomain: rec.emailDomain,
        aliasEmail: rec.aliasEmail,
        hasStripeID: Boolean(rec.stripeID)
      });
    }

    // ------------------------------------------------------------------------
    // 4. IDENTITY SYNC (Save / Background Sync with Uniqueness Enforcement)
    // ------------------------------------------------------------------------
    if (body.action === "sync") {
      const {
        identity,
        photos,
        host,
        online,
        inactive,
        proximity,
        lastPage,
        lastProximity,
        enforceUnique = false
      } = body;

      if (!identity?.id) {
        return jsonResponse(400, { ok: false, error: "Missing identity.id" });
      }

      const client = getSupabaseAdmin();
      const now = await getServerNow(client);

      const incomingStripeID = isValidStripeAccountId(identity.tokenID)
        ? identity.tokenID.trim()
        : isValidStripeAccountId(identity.stripeID)
          ? identity.stripeID.trim()
          : isValidStripeAccountId(identity.bank)
            ? identity.bank.trim()
            : null;

      const existing = await findIdentityRow(client, {
        localId: identity.id,
        stripeID: incomingStripeID
      });

      const cleanName = stripTimestamp(
        identity.name || identity.userName || existing?.name || ""
      )
        .replace(/\s+/g, " ")
        .trim();

      // Enforce name uniqueness against OTHER owners
      if (cleanName && !isPlaceholderName(cleanName)) {
        const conflict = await findConflictingNameOwner(client, cleanName, {
          localId: identity.id,
          stripeID: incomingStripeID || existing?.stripeID || null,
          userID: existing?.userID || null
        });

        if (conflict) {
          const suggestions = await buildNameSuggestions(client, cleanName);
          return duplicateResponse("name", suggestions);
        }
      } else if (enforceUnique) {
        return jsonResponse(400, {
          ok: false,
          field: "name",
          error: "Please enter a valid Display Name before saving."
        });
      }

      const { domain: emailDomain } = resolveAllowedDomain(
        identity.emailDomain ||
          existing?.attrs?.emailDomain ||
          (identity.email?.includes("@") ? identity.email.split("@")[1] : null) ||
          host ||
          DEFAULT_EMAIL_DOMAIN
      );
      const aliasHandle = sanitizeAliasHandle(cleanName || identity.id);
      const aliasEmail = buildAliasEmail(cleanName || identity.id, emailDomain);

      // Preserve any real Stripe Connect ID already stored on the row
      const preservedStripeID =
        incomingStripeID ||
        (isValidStripeAccountId(existing?.stripeID) ? existing.stripeID.trim() : "") ||
        (isValidStripeAccountId(existing?.attrs?.tokenID) ? existing.attrs.tokenID.trim() : "");

      // Privacy-first: keep real email only in attrs if valid, while column `email` stores their digital alias email
      const cleanUserEmail = !isPlaceholderEmail(identity.userEmail)
        ? String(identity.userEmail).trim().toLowerCase()
        : !isPlaceholderEmail(existing?.attrs?.userEmail)
          ? existing.attrs.userEmail
          : null;

      const mergedAttrs = {
        ...(existing?.attrs || {}),
        ...identity,
        localId: identity.id,
        host: host || existing?.host || null,
        name: cleanName || existing?.name || aliasHandle,
        aliasHandle,
        emailDomain,
        aliasEmail,
        email: aliasEmail,
        userEmail: cleanUserEmail,
        tokenID: preservedStripeID || null,
        stripeID: preservedStripeID || null,
        bank: preservedStripeID || identity.bank || existing?.attrs?.bank || "Not Tethered",
        smsOpt: identity.smsOpt ?? existing?.attrs?.smsOpt ?? false,
        emailOpt: identity.emailOpt ?? existing?.attrs?.emailOpt ?? false,
        photoURL: photos?.photoURL || identity.photoURL || existing?.attrs?.photoURL || null,
        aliasPhotoURL:
          photos?.aliasPhotoURL || identity.aliasPhotoURL || existing?.attrs?.aliasPhotoURL || null,
        bizphotoURL:
          photos?.bizphotoURL || identity.bizphotoURL || existing?.attrs?.bizphotoURL || null,
        bizaliasPhotoURL:
          photos?.bizaliasPhotoURL ||
          identity.bizaliasPhotoURL ||
          existing?.attrs?.bizaliasPhotoURL ||
          null,
        syncedAt: now
      };

      // Note: email, name, stripeID use non-null safe strings so inserts work
      // both before and after running supabase-schema.sql.
      const payload = {
        email: aliasEmail,
        name: cleanName || existing?.name || aliasHandle,
        stripeID: preservedStripeID || "",
        attrs: mergedAttrs,
        phone: identity.phone || existing?.phone || null,
        lastUpdated: now,
        host: host || existing?.host || null,
        lastPage: lastPage ?? existing?.lastPage ?? null,
        online: online ?? existing?.online ?? true,
        inactive: inactive ?? existing?.inactive ?? false,
        localId: identity.id,
        proximity:
          typeof proximity === "object" && proximity !== null
            ? JSON.stringify(proximity)
            : proximity ?? existing?.proximity ?? null,
        lastProximity:
          typeof lastProximity === "object" && lastProximity !== null
            ? JSON.stringify(lastProximity)
            : lastProximity ?? existing?.lastProximity ?? null
      };

      let result;
      try {
        result = existing
          ? await client
              .from("PulseIdentity")
              .update(payload)
              .eq("userID", existing.userID)
              .select("userID, name, email, stripeID")
              .maybeSingle()
          : await client
              .from("PulseIdentity")
              .insert({ ...payload, created: now })
              .select("userID, name, email, stripeID")
              .maybeSingle();
      } catch (err) {
        if (isDuplicateError(err)) {
          const suggestions = await buildNameSuggestions(client, cleanName || aliasHandle);
          return duplicateResponse("name", suggestions);
        }
        throw err;
      }

      if (result.error) {
        if (isDuplicateError(result.error)) {
          const suggestions = await buildNameSuggestions(client, cleanName || aliasHandle);
          return duplicateResponse("name", suggestions);
        }
        console.error("❌ [PULSE-SQL] Supabase sync error:", result.error);
        return jsonResponse(500, { ok: false, error: result.error.message });
      }

      return jsonResponse(200, {
        ok: true,
        synced: identity.id,
        userID: result.data?.userID || existing?.userID || null,
        name: payload.name,
        aliasHandle,
        emailDomain,
        aliasEmail,
        stripeID: preservedStripeID || null
      });
    }

    // ------------------------------------------------------------------------
    // 5. EXTENSION TETHER SYNC (Fixed null crash when tetherCode doesn't exist)
    // ------------------------------------------------------------------------
    if (body.action === "extsync") {
      const { tetherCode, host, online, inactive } = body;
      if (!tetherCode) {
        return jsonResponse(400, { ok: false, error: "Missing tetherCode" });
      }

      const client = getSupabaseAdmin();
      const now = await getServerNow(client);

      const { data: existing, error: lookupError } = await client
        .from("PulseIdentity")
        .select("userID")
        .eq("tetherCode", tetherCode)
        .maybeSingle();

      if (lookupError) throw lookupError;

      if (!existing) {
        return jsonResponse(200, {
          ok: true,
          synced: false,
          tetherCode,
          reason: "No identity linked to this tetherCode yet"
        });
      }

      const payload = {
        lastUpdated: now,
        host: host || null,
        online: online ?? true,
        inactive: inactive ?? false,
        tetherID: existing.userID
      };

      const { error } = await client
        .from("PulseIdentity")
        .update(payload)
        .eq("userID", existing.userID);

      if (error) {
        if (isDuplicateError(error)) return duplicateResponse("identity");
        console.error("❌ [PULSE-SQL] extsync error:", error);
        return jsonResponse(500, { ok: false, error: error.message });
      }

      return jsonResponse(200, { ok: true, synced: tetherCode });
    }

    // ------------------------------------------------------------------------
    // 6. ADMIN READ (All Identities + Alias & Stripe Metadata)
    // ------------------------------------------------------------------------
    if (body.action === "read") {
      const { data, error } = await getSupabaseAdmin()
        .from("PulseIdentity")
        .select("*")
        .order("lastUpdated", { ascending: false, nullsFirst: false })
        .order("created", { ascending: false })
        .limit(1000);

      if (error) {
        console.error("❌ [PULSE-SQL] Admin read error:", error);
        return jsonResponse(500, { ok: false, error: error.message });
      }

      const users = (data || []).map((row) => ({
        ...row,
        ...(row.attrs || {}),
        ...serializeIdentityRecord(row)
      }));

      return jsonResponse(200, {
        ok: true,
        users,
        domains: getAllowedEmailDomains()
      });
    }

    // ------------------------------------------------------------------------
    // 7. LEGACY COMMANDS / RAW SQL / TABLE INSPECTION (Preserved + CORS Fixed)
    // ------------------------------------------------------------------------
    if (body.commands) {
      try {
        const results = await processCommands(body.commands);
        return jsonResponse(200, { ok: true, mode: "commands", results });
      } catch (err) {
        if (isDuplicateError(err)) return duplicateResponse("command");
        throw err;
      }
    }

    if (body.query) {
      try {
        const data = await runPulseQuery(body.query, body.params);
        return jsonResponse(200, { ok: true, mode: "sql", data });
      } catch (err) {
        if (isDuplicateError(err)) return duplicateResponse("sql");
        throw err;
      }
    }

    if (body.getAllTables) {
      const tables = await getAllTables();
      return jsonResponse(200, { ok: true, mode: "getAllTables", tables });
    }

    if (body.getTableRows) {
      const rows = await getTableRows(body.getTableRows);
      return jsonResponse(200, {
        ok: true,
        mode: "getTableRows",
        table: body.getTableRows,
        rows
      });
    }

    if (body.getDoc) {
      const { table, id } = body.getDoc;
      const doc = await getDoc(table, id);
      return jsonResponse(200, {
        ok: true,
        mode: "getDoc",
        table,
        id,
        doc
      });
    }

    return jsonResponse(400, {
      ok: false,
      error: "No action, commands, SQL, or pull request provided."
    });
  } catch (err) {
    if (isDuplicateError(err)) return duplicateResponse("general");
    console.error("❌ [PULSE-SQL] Unhandled error:", err);
    return jsonResponse(500, { ok: false, error: err.message });
  }
}
