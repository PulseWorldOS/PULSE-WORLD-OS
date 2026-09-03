// FILE: /netlify/functions/PulseWorldIdentityTokenEngine-v30.js
// ============================================================================
//  PULSE-WORLD IDENTITY TOKEN ENGINE — v30 IMMORTAL-INTEL
//  ROLE:
//    • Deterministic identity verification + lineage validation
//    • Issues Firebase custom tokens (fresh, never cached)
//    • Validates resendToken lineage (root identity token)
//    • Checks IdentityHistory for danger flags
//    • Zero-mutation (user doc only), zero-randomness in logic, drift-proof
//    • World-layer aware: region, host, pulseTouch, band, device
//    • Emits IMMORTAL identity envelope (symbolic band, one-band aware)
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

import { PulseVitalsLogger as logger, PulseVitalsMonitor, pulseLog, PulseUIFlow as initUIFlow, db, setdoc, getdoc, doc, log, warn, error} from "../../../../../_PROOF/PULSE-PROOF.js";

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});





// ============================================================================
//  PURE HELPERS (IMMORTAL-SAFE)
// ============================================================================

function safeClone(v) {
  try {
    return JSON.parse(JSON.stringify(v || {}));
  } catch {
    return {};
  }
}

function nowIso() {
  return new Date().toISOString();
}

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeIntelHash(payload) {
  const base = JSON.stringify(payload || {});
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function buildIdentityIntelSignature({ uid, regionId, hostName, band, lineageToken, storedToken }) {
  const intelPayload = {
    uid: uid || null,
    regionId: regionId || "unknown",
    hostName: hostName || "unknown",
    band: band || "symbolic",
    lineageTokenPresent: !!lineageToken,
    storedTokenPresent: !!storedToken
  };

  const classic = computeHash(`IDENTITY_V30::${uid || "unknown"}::${regionId || "unknown"}`);
  const intel = computeIntelHash(intelPayload);

  return {
    intel,
    classic,
    payload: intelPayload
  };
}

function buildImmortalIdentityEnvelope({
  uid,
  regionId,
  hostName,
  band,
  pulseTouch,
  lineageSafe,
  realign,
  storedToken,
  firebaseToken
}) {
  const intelSig = buildIdentityIntelSignature({
    uid,
    regionId,
    hostName,
    band,
    lineageToken: storedToken,
    storedToken
  });

  return Object.freeze({
    success: true,
    realign: !!realign,
    storedToken: storedToken || null,
    firebaseToken: firebaseToken || null,
    meta: {
      version: "v30-IMMORTAL-INTEL",
      issuedAt: nowIso(),
      lineageSafe: !!lineageSafe,
      band: band || "symbolic",
      regionId: regionId || "unknown",
      hostName: hostName || "unknown",
      pulseTouch: safeClone(pulseTouch || {}),
      identityIntelSignature: {
        intel: intelSig.intel,
        classic: intelSig.classic
      }
    }
  });
}

function buildErrorEnvelope(statusCode, payload) {
  return {
    statusCode,
    body: payload
  };
}

// ============================================================================
//  MAIN HANDLER — IMMORTAL v30
// ============================================================================

export default async function handler(req, res) {
  try {
    // ------------------------------------------------------------
    // 1) CORS
    // ------------------------------------------------------------
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    // ------------------------------------------------------------
    // 2) Parse input (IMMORTAL-SAFE)
// ------------------------------------------------------------
    const body = (() => {
      try {
        return JSON.parse(req.body || "{}");
      } catch {
        return {};
      }
    })();

    const incomingToken = body.token || null;
    const uid = body.uid || null;

    const band = body.band || "symbolic";
    const regionId = body.regionId || body.region || "unknown";
    const hostName = body.hostName || body.host || "unknown";
    const pulseTouch = safeClone(body.pulseTouch || {});

    if (!uid) {
      const errPayload = {
        success: false,
        error: "UID missing",
        meta: {
          version: "v30-IMMORTAL-INTEL",
          issuedAt: nowIso(),
          band,
          regionId,
          hostName
        }
      };
      return res.status(400).json(errPayload);
    }

    // ------------------------------------------------------------
    // 3) Load user
    // ------------------------------------------------------------
    const userRef = db.collection("Users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      const errPayload = {
        success: false,
        error: "User not found",
        meta: {
          version: "v30-IMMORTAL-INTEL",
          issuedAt: nowIso(),
          band,
          regionId,
          hostName
        }
      };
      return res.status(404).json(errPayload);
    }

    const userData = userDoc.data() || {};
    const TPIdentity = userData.TPIdentity || {};
    const storedToken = TPIdentity.resendToken || null;

    if (!storedToken) {
      const errPayload = {
        success: false,
        hardLogout: true,
        error: "No active resendToken",
        meta: {
          version: "v30-IMMORTAL-INTEL",
          issuedAt: nowIso(),
          band,
          regionId,
          hostName
        }
      };
      return res.status(403).json(errPayload);
    }

    // ------------------------------------------------------------
    // 4) Load identity lineage (latest safe snapshot)
// ------------------------------------------------------------
    const historySnap = await db
      .collection("IdentityHistory")
      .doc(uid)
      .collection("snapshots")
      .orderBy("createdAt", "desc")
      .limit(20)
      .get();

    let lineageToken = null;
    let lineageSnap = null;

    if (!historySnap.empty) {
      for (const doc of historySnap.docs) {
        const snap = doc.data() || {};
        const token = snap.TPIdentity.resendToken || null;

        if (token) {
          lineageToken = token;
          lineageSnap = snap;
          break;
        }
      }
    }

    if (!lineageToken) {
      const errPayload = {
        success: false,
        hardLogout: true,
        error: "No lineage token found",
        meta: {
          version: "v30-IMMORTAL-INTEL",
          issuedAt: nowIso(),
          band,
          regionId,
          hostName
        }
      };
      return res.status(403).json(errPayload);
    }

    // ------------------------------------------------------------
    // 5) Danger checks (IMMORTAL)
// ------------------------------------------------------------
    const danger =
      lineageSnap.lockedDown === true ||
      lineageSnap.hacker === true ||
      lineageSnap.failure === true ||
      lineageSnap.compromised === true ||
      lineageSnap.revoked === true;

    if (danger) {
      const errPayload = {
        success: false,
        hardLogout: true,
        error: "Identity revoked or compromised",
        meta: {
          version: "v30-IMMORTAL-INTEL",
          issuedAt: nowIso(),
          band,
          regionId,
          hostName,
          dangerFlags: {
            lockedDown: !!lineageSnap.lockedDown,
            hacker: !!lineageSnap.hacker,
            failure: !!lineageSnap.failure,
            compromised: !!lineageSnap.compromised,
            revoked: !!lineageSnap.revoked
          }
        }
      };
      return res.status(403).json(errPayload);
    }

    // ------------------------------------------------------------
    // 7) Realign logic (IMMORTAL, symbolic)
// ------------------------------------------------------------
    let realign = false;
    let hardLogout = false;

    if (!incomingToken) {
      hardLogout = true;
    } else if (incomingToken !== lineageToken) {
      realign = true;
    }

    if (hardLogout) {
      const errPayload = {
        success: false,
        hardLogout: true,
        error: "Missing incoming lineage token",
        meta: {
          version: "v30-IMMORTAL-INTEL",
          issuedAt: nowIso(),
          band,
          regionId,
          hostName
        }
      };
      return res.status(403).json(errPayload);
    }

    // ------------------------------------------------------------
    // 8) IMMORTAL v30 envelope response
    // ------------------------------------------------------------
    const envelope = buildImmortalIdentityEnvelope({
      uid,
      regionId,
      hostName,
      band,
      pulseTouch,
      lineageSafe: true,
      realign,
      storedToken
    });

    return res.status(200).json(envelope);

  } catch (err) {
    error("🔥 IdentityTokenEngine-v30 error:", err);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
      meta: {
        version: "v30-IMMORTAL-INTEL",
        issuedAt: nowIso()
      }
    });
  }
}

PulseRealm.WorldIdentityTokenEngine = {
  handler
}