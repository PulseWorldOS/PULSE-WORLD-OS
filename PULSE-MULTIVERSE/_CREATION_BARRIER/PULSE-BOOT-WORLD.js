// =======================================
// PULSE-UNIVERSAL-TOUCH-WORLD v38 (PORTAL-INTEGRATED)
// Multiversal Gateway + RAM-Native Assets + TXT-Membrane World
// data-pulse-viewport / data-pulse-portal / data-pulse-* aware
// =======================================

  import { PulsePortalAPI } from "./PULSE-BOOT-PORTAL.js";
  
  const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

console.log(
  "%c🌐 PULSE BOOT WORLD v38.0 — [PulseBootWorld] Pulse Boot Portal/World Projection Initiated!",
  "color:#29B6F6; font-weight:bold; font-family:monospace;"
);

function normalizeTxtUrl(url) {
  if (typeof url !== "string") return url;
  // strip a trailing ".txt" before query/hash (semantic only)
  return url.replace(/\.txt(?=($|[?#]))/i, "");
}

// =======================================
// NETWORK
// =======================================
export const PulseNetworkStatus = {
  status: "unknown",                 // online, offline, degraded, proxy, captive, pulse-stable
  paradigm: "legacy",                // legacy, pulse-universal-touch-world, pulse-temporal-os
  lastChange: null,
  lastCheck: null,
  networkClass: "unclassified",      // local, wan, lan, captive, proxy, unstable
  latency: null,
  jitter: null,
  drift: null,
  dnsTrusted: false,
  proxyDetected: false,
  logs: [],

  log(event, data = {}) {
    const ts = PulseRealm.PulseNOW;
    this.logs.push({ ts, event, ...data });
  },

  setStatus(status, reason = null) {
    const ts = PulseRealm.PulseNOW;
    this.status = status;
    this.lastChange = ts;
    this.log("status-change", { status, reason });
  },

  setNetworkClass(nClass, reason = null) {
    const ts = PulseRealm.PulseNOW;
    this.networkClass = nClass;
    this.log("network-class", { nClass, reason });
  },

  markDNS(trusted = true, reason = "DNS-TRUST-ANCHOR") {
    const ts = PulseRealm.PulseNOW;
    this.dnsTrusted = trusted;
    this.log("dns-trust", { trusted, reason });
  },

  markProxy(detected = true, reason = "PROXY-DETECTED") {
    const ts = PulseRealm.PulseNOW;
    this.proxyDetected = detected;
    this.log("proxy-status", { detected, reason });
  },

  updateMetrics({ latency, jitter, drift }) {
    const ts = PulseRealm.PulseNOW;
    this.latency = latency;
    this.jitter = jitter;
    this.drift = drift;
    this.lastCheck = ts;
    this.log("metrics-update", { latency, jitter, drift });
  },

  markNewParadigm(reason = "PULSE-TEMPORAL-OS") {
    const ts = PulseRealm.PulseNOW;
    this.paradigm = "pulse-temporal-os";
    this.log("paradigm-shift", { reason });
  },

  getStatus() {
    return {
      status: this.status,
      paradigm: this.paradigm,
      lastChange: this.lastChange,
      lastCheck: this.lastCheck,
      networkClass: this.networkClass,
      latency: this.latency,
      jitter: this.jitter,
      drift: this.drift,
      dnsTrusted: this.dnsTrusted,
      proxyDetected: this.proxyDetected,
      logs: [...this.logs]
    };
  }
};


// =======================================
// PROXY
// =======================================
export const PulseProxy = {
  proxies: new Map(),
  metrics: new Map(),
  logs: [],

  register(id, config = {}) {
    const proxy = {
      id,
      targetOrigin: config.targetOrigin || "*",
      sandbox: config.sandbox || "safe", // safe | raw | temporal | degraded
      headers: config.headers || {},
      meta: {
        dnsTrusted: false,
        proxyClass: "unclassified", // local, wan, vpn, corporate, transparent, pulse
        latency: null,
        jitter: null,
        drift: null,
        ...config.meta
      }
    };

    this.proxies.set(id, proxy);
    this.log("proxy-register", { id, config });
  },

  classifyProxy(id, proxyClass, reason = "classification-update") {
    const proxy = this.proxies.get(id);
    if (!proxy) return;

    proxy.meta.proxyClass = proxyClass;
    this.log("proxy-classify", { id, proxyClass, reason });
  },

  markDNS(id, trusted = true, reason = "dns-trust-update") {
    const proxy = this.proxies.get(id);
    if (!proxy) return;

    proxy.meta.dnsTrusted = trusted;
    this.log("proxy-dns", { id, trusted, reason });
  },

  updateMetrics(id, { latency, jitter, drift }) {
    const proxy = this.proxies.get(id);
    if (!proxy) return;

    proxy.meta.latency = latency;
    proxy.meta.jitter = jitter;
    proxy.meta.drift = drift;

    this.metrics.set(id, { latency, jitter, drift, ts: PulseRealm.PulseNOW });
    this.log("proxy-metrics", { id, latency, jitter, drift });
  },

  get(id) {
    return this.proxies.get(id) || null;
  },

  async fetch(url, proxyId = null) {
    const proxy = proxyId ? this.get(proxyId) : null;
    const wireUrl = url;

    let opts = { mode: "cors" };

    if (proxy) {
      opts = {
        mode:
          proxy.sandbox === "raw"
            ? "cors"
            : proxy.sandbox === "safe"
            ? "no-cors"
            : proxy.sandbox === "temporal"
            ? "cors"
            : "cors",

        headers: proxy.headers || {}
      };

      this.log("proxy-fetch", {
        proxyId,
        url,
        sandbox: proxy.sandbox,
        headers: proxy.headers
      });
    }

    try {
      const res = await fetch(wireUrl, opts);
      const text = await res.text();

      this.log("proxy-fetch-success", {
        proxyId,
        url,
        status: res.status
      });

      return {
        ok: true,
        text,
        status: res.status,
        url: wireUrl,
        proxyId
      };
    } catch (err) {
      this.log("proxy-fetch-error", {
        proxyId,
        url,
        error: err.message
      });

      return {
        ok: false,
        error: err.message,
        url: wireUrl,
        proxyId
      };
    }
  },

  log(event, data = {}) {
    const ts = PulseRealm.PulseNOW;
    this.logs.push({ ts, event, ...data });
  },

  getStatus() {
    return {
      proxies: Array.from(this.proxies.values()),
      metrics: Array.from(this.metrics.entries()),
      logs: [...this.logs]
    };
  }
};

// =======================================
// WORLD VIEW
// =======================================
export const PulseWorldView = {
  viewports: new Map(),
  proxies: PulseRealm.PulseProxy,
  ethics: PulseRealm.PulseEthics,
  worldState: null,
  lastUpdate: null,
  logs: [],
  metrics: new Map(),

  log(event, data = {}) {
    const ts = PulseRealm.PulseNOW;
    this.logs.push({ ts, event, ...data });
  },

  registerViewport(id, config = {}) {
    const vp = {
      id,
      type: config.type || "default", // boot, main, overlay, holo, debug
      element: config.element || null,
      sandbox: config.sandbox || "pure", // pure | safe | raw | temporal
      meta: config.meta || {},
      lastRender: null
    };

    this.viewports.set(id, vp);
    this.log("viewport-register", { id, config });
  },

  getViewport(id) {
    return this.viewports.get(id) || null;
  },

  // ============================================================
  // RENDER EXTERNAL (HTML)
  // ============================================================
  async renderExternal(url, { viewportId = null, proxyId = null } = {}) {
    const vp = viewportId ? this.getViewport(viewportId) : null;

    // Build context for ethics
    const context = {
      dnsTrusted: PulseNetworkStatus.dnsTrusted,
      proxyClass: proxyId ? PulseProxy.get(proxyId)?.meta.proxyClass : "none",
      drift: PulseNetworkStatus.drift,
      jitter: PulseNetworkStatus.jitter,
      userMode: "safe"
    };

    const ethicsCheck = this.ethics.evaluate(
      { type: "external", url },
      context
    );

    if (!ethicsCheck.allowed) {
      this.log("render-denied", {
        url,
        viewportId,
        proxyId,
        rule: ethicsCheck.rule
      });
      return {
        ok: false,
        error: `Denied by ethics: ${ethicsCheck.rule}`,
        url,
        viaViewport: vp?.id || null,
        viaProxy: proxyId,
        ts: PulseRealm.PulseNOW
      };
    }

    const result = await this.proxies.fetch(url, proxyId);

    if (vp && vp.element && result.ok && result.text) {
      vp.element.innerHTML = result.text;
      vp.lastRender = PulseRealm.PulseNOW;
      this.log("render-external", {
        url,
        viewportId: vp.id,
        proxyId,
        sandbox: vp.sandbox
      });
    }

    return {
      ok: result.ok,
      url: result.url,
      viaViewport: vp?.id || null,
      viaProxy: proxyId,
      content: result.ok ? result.text : null,
      error: result.ok ? null : result.error,
      ts: PulseRealm.PulseNOW
    };
  },

  // ============================================================
  // RENDER VIDEO
  // ============================================================
  renderVideo({ src, autoplay = true, muted = true, loop = false, viewportId = "boot" }) {
    const vp = this.getViewport(viewportId) || this.getViewport("default");
    if (!vp || !vp.element) return;

    vp.element.innerHTML = `
      <video
        src="${src}"
        ${autoplay ? "autoplay" : ""}
        ${muted ? "muted" : ""}
        ${loop ? "loop" : ""}
        playsinline
        style="width:100%;height:100%;object-fit:cover;">
      </video>
    `;

    vp.lastRender = PulseRealm.PulseNOW;
    this.log("render-video", { src, viewportId: vp.id });
  },

  // ============================================================
  // RENDER IMAGE
  // ============================================================
  renderImage({ objectUrl, viewportId = "boot", fit = "contain" }) {
    const vp = this.getViewport(viewportId) || this.getViewport("default");
    if (!vp || !vp.element) return;

    vp.element.innerHTML = `
      <img
        src="${objectUrl}"
        style="width:100%;height:100%;object-fit:${fit};" />
    `;

    vp.lastRender = PulseRealm.PulseNOW;
    this.log("render-image", { objectUrl, viewportId: vp.id });
  },

  // ============================================================
  // RENDER RAW HTML
  // ============================================================
  renderHtml({ viewportId = "default", html = "" }) {
    const vp = this.getViewport(viewportId) || this.getViewport("default");
    if (!vp || !vp.element) return;

    vp.element.innerHTML = html;
    vp.lastRender = PulseRealm.PulseNOW;
    this.log("render-html", { viewportId: vp.id });
  },

  // ============================================================
  // WORLD STATE
  // ============================================================
  setWorldState(state) {
    this.worldState = state;
    this.lastUpdate = PulseRealm.PulseNOW;
    this.log("world-state-update", { state });
  },

  snapshot() {
    return {
      viewports: [...this.viewports.values()],
      proxies: [...this.proxies.proxies.values()],
      ethicsLogs: [...this.ethics.logs],
      worldState: this.worldState || null,
      lastUpdate: this.lastUpdate || null,
      logs: [...this.logs]
    };
  }
};

// =======================================
// ETHICS
// =======================================
export const PulseEthics = {
  rules: [],
  logs: [],

  addRule(name, fn, priority = 10) {
    this.rules.push({ name, fn, priority });
    this.rules.sort((a, b) => a.priority - b.priority);
  },

  log(event, data = {}) {
    const ts = PulseRealm.PulseNOW;
    this.logs.push({ ts, event, ...data });
  },

  initDefaults() {
    // =======================================
    // ROUTING RULES
    // =======================================
    this.addRule("deny-hellno-route", (action) => {
      if (action.type === "route" && action.route?.includes("hellno")) {
        return false;
      }
      return true;
    }, 1);

    this.addRule("deny-null-route", (action) => {
      if (action.type === "route" && (!action.route || action.route === "")) {
        return false;
      }
      return true;
    }, 1);

    // =======================================
    // NETWORK / PROXY RULES
    // =======================================
    this.addRule("deny-untrusted-dns", (action, context) => {
      if (context?.dnsTrusted === false) {
        return false;
      }
      return true;
    }, 2);

    this.addRule("deny-unknown-proxy", (action, context) => {
      if (context?.proxyClass === "unclassified") {
        return false;
      }
      return true;
    }, 2);

    this.addRule("deny-degraded-proxy", (action, context) => {
      if (context?.proxyClass === "degraded") {
        return false;
      }
      return true;
    }, 2);

    // =======================================
    // DEVICE TIER RULES
    // =======================================
    this.addRule("deny-high-drift", (action, context) => {
      if (context?.drift && context.drift > 150) {
        return false;
      }
      return true;
    }, 3);

    this.addRule("deny-high-jitter", (action, context) => {
      if (context?.jitter && context.jitter > 120) {
        return false;
      }
      return true;
    }, 3);

    // =======================================
    // USER TIER RULES
    // =======================================
    this.addRule("deny-unsafe-external", (action, context) => {
      if (action.type === "external" && context?.userMode === "safe") {
        if (action.url?.startsWith("http://")) {
          return false;
        }
      }
      return true;
    }, 4);

    // =======================================
    // DEFAULT ALLOW
    // =======================================
    this.addRule("allow-default", () => true, 99);
  },

  evaluate(action, context = {}) {
    for (const rule of this.rules) {
      const result = rule.fn(action, context);
      if (result === false) {
        this.log("ethics-deny", { action, rule: rule.name, context });
        return { allowed: false, rule: rule.name };
      }
    }

    this.log("ethics-allow", { action, context });
    return { allowed: true, rule: null };
  },

  getStatus() {
    return {
      rules: [...this.rules],
      logs: [...this.logs]
    };
  }
};


PulseEthics.initDefaults();

// =======================================
// CONTINUANCE
// =======================================
export const PulseContinuance = {
  state: new Map(),
  logs: [],
  metrics: new Map(),

  log(event, data = {}) {
    const ts = PulseRealm.PulseNOW;
    this.logs.push({ ts, event, ...data });
  },

  set(key, value, { ttl = null, category = "default", version = 1 } = {}) {
    const entry = {
      value,
      ts: PulseRealm.PulseNOW,
      ttl,
      category,
      version
    };

    this.state.set(key, entry);
    this.log("continuance-set", { key, value, ttl, category, version });
  },

  get(key) {
    const entry = this.state.get(key);
    if (!entry) return null;

    // TTL expiration
    if (entry.ttl && PulseRealm.PulseNOW - entry.ts > entry.ttl) {
      this.state.delete(key);
      this.log("continuance-expired", { key });
      return null;
    }

    return entry.value;
  },

  getMeta(key) {
    return this.state.get(key) || null;
  },

  snapshot() {
    return [...this.state.entries()].map(([k, v]) => ({
      key: k,
      value: v.value,
      ts: v.ts,
      ttl: v.ttl,
      category: v.category,
      version: v.version
    }));
  }
};


// =======================================
// SCHEMA
// =======================================
export const PulseSchema = {
  types: new Map(),
  logs: [],

  log(event, data = {}) {
    const ts = PulseRealm.PulseNOW;
    this.logs.push({ ts, event, ...data });
  },

  register(type, schema) {
    const entry = {
      type,
      schema,
      version: schema.version || 1,
      category: schema.category || "default"
    };

    this.types.set(type, entry);
    this.log("schema-register", { type, schema });
  },

  validate(type, obj) {
    const entry = this.types.get(type);
    if (!entry) return { ok: false, error: "unknown-type" };

    const schema = entry.schema;
    const errors = [];

    for (const key in schema.fields) {
      const rule = schema.fields[key];
      const value = obj[key];

      if (rule.required && value == null) {
        errors.push(`missing:${key}`);
      }

      if (rule.type && typeof value !== rule.type) {
        errors.push(`type:${key}`);
      }
    }

    return {
      ok: errors.length === 0,
      errors
    };
  },

  get(type) {
    return this.types.get(type) || null;
  }
};


// =======================================
// OMNI
// =======================================
export const PulseOmni = {
  hints: {},
  logs: [],

  log(event, data = {}) {
    const ts = PulseRealm.PulseNOW;
    this.logs.push({ ts, event, ...data });
  },

  setHint(key, value, { ttl = null, category = "default", score = 1 } = {}) {
    this.hints[key] = {
      value,
      ts: PulseRealm.PulseNOW,
      ttl,
      category,
      score
    };

    this.log("omni-set", { key, value, ttl, category, score });
  },

  getHint(key, fallback = null) {
    const entry = this.hints[key];
    if (!entry) return fallback;

    // TTL expiration
    if (entry.ttl && PulseRealm.PulseNOW - entry.ts > entry.ttl) {
      delete this.hints[key];
      this.log("omni-expired", { key });
      return fallback;
    }

    return entry.value;
  },

  snapshot() {
    return Object.entries(this.hints).map(([key, v]) => ({
      key,
      value: v.value,
      ts: v.ts,
      ttl: v.ttl,
      category: v.category,
      score: v.score
    }));
  }
};

function stripTimestamp(alias) {
  if (!alias || typeof alias !== "string") return "";
  return alias.replace(/-M#.*$/, "");
}

// =======================================
// IDENTITY
// =======================================
export function PulseIdentity() {
  return {
    // ============================================================
    // CORE IDENTITY (MATCHES save())
    // ============================================================
    id: `world-${Math.random().toString(36).slice(2)}`,
    createdAt: PulseRealm.PulseNOW,
    tier: "temporal-os",

    name: stripTimestamp(PulseRealm.PulseUser) ?? "Unknown Pulse User",
    email: PulseRealm.PulseEmail ?? `${stripTimestamp(PulseRealm.PulseUser || "Unknown")}@PulseWorld.Net`,
    userEmail: PulseRealm.PulseUserEmail ?? "YourEmail@Domain.com",
    userName: PulseRealm.PulseUserName ?? "Aldwyn",
    phone: PulseRealm.PulsePhone ?? "(555) 555-5555",
    country: PulseRealm.PulseCountry ?? "US",

    role: PulseRealm.PulseRole ?? "User",
    pulseRole: PulseRealm.PulseWorldRole ?? "Entrepreneur",

    bank: PulseRealm.PulseBank ?? "Unknown Stripe ID",
    bankURL: PulseRealm.PulseBankURL || "https://www.pulseworld.net/?Impulse=PulseWorldBank",
    stripeLogin: PulseRealm.PulseBankURL || "https://billing.stripe.com/p/login/4gM14mdIx8kK1w13KcfIs00",
    tokenID: PulseRealm.PulseBankID || null,
    assetsWallet: PulseRealm.PulseAssets || null,

    drift: PulseRealm.DriftSignature ?? PulseRealm.GenerateDriftSignature,
    device: PulseRealm.PulseTrustedDevice ?? true,

    photoURL: PulseRealm.PulsePhoto ?? "./_EXPRESSIONS/_PEX/BUILD/FrustratedLogo.webp.pex",
    aliasPhotoURL: PulseRealm.PulseAliasPhoto ?? "./_EXPRESSIONS/_PEX/BUILD/FrustratedAlias.webp.pex",
    bizphotoURL: PulseRealm.PulseBizPhoto ?? "./_EXPRESSIONS/_PEX/BUILD/FrustratedBizLogo.webp.pex",
    bizaliasPhotoURL: PulseRealm.PulseBizAliasPhoto ?? "./_EXPRESSIONS/_PEX/BUILD/FrustratedBizAlias.webp.pex",

    PulsePoints: PulseRealm.PulsePoints || 0,
    PulseLoyalty: PulseRealm.PulseTierPhoto ?? "./_EXPRESSIONS/_PEX/BUILD/PulseSeed.webp.pex",

    // ============================================================
    // BOOT WORLD EXTENSIONS (KEPT EXACTLY AS YOU WROTE THEM)
    // ============================================================
    deviceFingerprint: null,
    browserFingerprint: null,
    dnsOrigin: null,
    proxyClass: null,
    worldSignature: null,
    logs: [],

    log(event, data = {}) {
      const ts = PulseRealm.PulseNOW;
      this.logs.push({ ts, event, ...data });
    },

    generateDNSOrigin() {
      const now = PulseRealm.PulseNOW;
      const drift = this.drift || "unknown-drift";
      const device = this.deviceFingerprint || "unknown-device";
      const browser = this.browserFingerprint || "unknown-browser";

      const origin = [
        "dns",
        this.id,
        drift,
        device.slice(0, 12),
        browser.slice(0, 12),
        now
      ].join("-");

      this.log("dns-origin", { origin });
      return origin;
    },

    initialize({ dnsOrigin, proxyClass, deviceFp, browserFp }) {
      this.deviceFingerprint = deviceFp || this.generateDeviceFingerprint();
      this.browserFingerprint = browserFp || this.generateBrowserFingerprint();

      this.dnsOrigin = dnsOrigin || this.generateDNSOrigin();
      this.proxyClass = proxyClass || "unclassified";
      this.worldSignature = this.generateWorldSignature();
      this.PulsePoints = PulseRealm.PulsePoints || 0;

      this.log("identity-initialize", {
        id: this.id,
        createdAt: this.createdAt,
        tier: this.tier,
        name: this.name,
        email: this.email,
        userEmail: this.userEmail,
        userName: this.userName,
        role: this.role,
        bank: this.bank,
        drift: this.drift,
        device: this.device,
        photoURL: this.photoURL,
        PulsePoints: this.PulsePoints,
        dnsOrigin: this.dnsOrigin,
        proxyClass: this.proxyClass,
        deviceFingerprint: this.deviceFingerprint,
        browserFingerprint: this.browserFingerprint,
        worldSignature: this.worldSignature
      });
    },

    generateDeviceFingerprint() {
      const fp = `dev-${Math.random().toString(36).slice(2)}-${PulseRealm.PulseNOW}`;
      this.log("device-fingerprint", { fp });
      return fp;
    },

    generateBrowserFingerprint() {
      const fp = `browser-${navigator.userAgent}-${Math.random().toString(36).slice(2)}`;
      this.log("browser-fingerprint", { fp });
      return fp;
    },

    generateWorldSignature() {
      const sig = `sig-${this.id}-${this.deviceFingerprint}-${this.browserFingerprint}`;
      this.log("world-signature", { sig });
      return sig;
    },

    shiftParadigm(reason = "PULSE-TEMPORAL-OS") {
      this.tier = "temporal-os";
      this.log("identity-paradigm-shift", { reason });
    },

    getIdentity() {
      return {
        id: this.id,
        createdAt: this.createdAt,
        tier: this.tier,
        name: this.name,
        email: this.email,
        userEmail: this.userEmail,
        userName: this.userName,
        role: this.role,
        bank: this.bank,
        drift: this.drift,
        device: this.device,
        photoURL: this.photoURL,
        PulsePoints: this.PulsePoints,
        dnsOrigin: this.dnsOrigin,
        proxyClass: this.proxyClass,
        deviceFingerprint: this.deviceFingerprint,
        browserFingerprint: this.browserFingerprint,
        worldSignature: this.worldSignature,
        logs: [...this.logs]
      };
    }
  };
}


// =======================================
// IMAGE
// =======================================
export const PulseImage = {
  images: new Map(),
  logs: [],
  metrics: new Map(),

  log(event, data = {}) {
    const ts = PulseRealm.PulseNOW;
    this.logs.push({ ts, event, ...data });
  },

  // ============================================================
  // RAW LOADING (PulseChunks → Proxy → Network)
  // ============================================================
  async loadRaw(url, { proxyId = null } = {}) {
    const wireUrl = url;

    // 1. Try PulseChunks (offline tier)
    if (PulseRealm.PulseChunks && typeof PulseRealm.PulseChunks.getImage === "function") {
      const bytes = await PulseRealm.PulseChunks.getImage(wireUrl);
      if (bytes) {
        this.log("load-raw-pulsechunks", { wireUrl });
        return { bytes: new Uint8Array(bytes), wireUrl, source: "pulsechunks" };
      }
    }

    // 2. Ethics check
    const context = {
      dnsTrusted: PulseNetworkStatus.dnsTrusted,
      proxyClass: proxyId ? PulseProxy.get(proxyId)?.meta.proxyClass : "none",
      drift: PulseNetworkStatus.drift,
      jitter: PulseNetworkStatus.jitter,
      userMode: "safe"
    };

    const ethicsCheck = PulseEthics.evaluate(
      { type: "external-image", url: wireUrl },
      context
    );

    if (!ethicsCheck.allowed) {
      this.log("load-raw-denied", { wireUrl, rule: ethicsCheck.rule });
      throw new Error("Denied by ethics: " + ethicsCheck.rule);
    }

    // 3. Proxy-aware network fetch
    const proxy = proxyId ? PulseProxy.get(proxyId) : null;

    const opts = proxy
      ? {
          mode: proxy.sandbox === "raw" ? "cors" : "no-cors",
          headers: proxy.headers || {}
        }
      : { mode: "cors" };

    try {
      const res = await fetch(wireUrl, opts);
      const buf = await res.arrayBuffer();

      this.log("load-raw-network", {
        wireUrl,
        proxyId,
        status: res.status
      });

      return {
        bytes: new Uint8Array(buf),
        wireUrl,
        source: proxy ? "proxy" : "network"
      };
    } catch (err) {
      this.log("load-raw-error", { wireUrl, proxyId, error: err.message });
      throw err;
    }
  },

  // ============================================================
  // REGISTER IMAGE (Temporal)
  // ============================================================
  async register(
    id,
    { url, type = "image/png", proxyId = null, category = "default" } = {}
  ) {
    const { bytes, wireUrl, source } = await this.loadRaw(url, { proxyId });

    const blob = new Blob([bytes], { type });
    const objectUrl = URL.createObjectURL(blob);

    const semanticUrl = normalizeTxtUrl(wireUrl);

    const entry = {
      id,
      url: semanticUrl,
      wireUrl,
      type,
      bytesLength: bytes.length,
      objectUrl,
      source,
      category,
      ts: PulseRealm.PulseNOW,
      worldSignature: PulseIdentity.worldSignature
    };

    this.images.set(id, entry);
    this.log("image-register", entry);

    return entry;
  },

  // ============================================================
  // GET IMAGE
  // ============================================================
  get(id) {
    return this.images.get(id) || null;
  },

  // ============================================================
  // SNAPSHOT
  // ============================================================
  snapshot() {
    return {
      images: [...this.images.values()],
      logs: [...this.logs],
      metrics: [...this.metrics.entries()]
    };
  }
};


// =======================================
// EXPRESSION
// =======================================
export const PulseExpression = {
  logs: [],
  classifiers: new Map(),

  log(event, data = {}) {
    const ts = PulseRealm.PulseNOW;
    this.logs.push({ ts, event, ...data });
  },

  // ============================================================
  // CORE CREATION (Temporal)
  // ============================================================
  create(type, payload = {}, context = {}) {
    const ts = PulseRealm.PulseNOW;

    const expression = {
      type,
      payload,
      context: {
        ...context,
        dnsTrusted: PulseNetworkStatus.dnsTrusted,
        proxyClass: PulseNetworkStatus.proxyDetected ? PulseNetworkStatus.proxyClass : "none",
        drift: PulseNetworkStatus.drift,
        jitter: PulseNetworkStatus.jitter,
        worldSignature: PulseIdentity.worldSignature,
        deviceFingerprint: PulseIdentity.deviceFingerprint,
        browserFingerprint: PulseIdentity.browserFingerprint,
        tier: PulseIdentity.tier,
        ts
      },
      ts
    };

    this.log("expression-create", { type, payload, context: expression.context });
    return expression;
  },

  // ============================================================
  // CLASSIFICATION ENGINE
  // ============================================================
  registerClassifier(name, fn) {
    this.classifiers.set(name, fn);
    this.log("classifier-register", { name });
  },

  classify(expression) {
    const results = [];

    for (const [name, fn] of this.classifiers.entries()) {
      const result = fn(expression);
      if (result) {
        results.push({ classifier: name, result });
      }
    }

    this.log("expression-classify", { expression, results });
    return results;
  },

  // ============================================================
  // TOUCH EXPRESSIONS
  // ============================================================
  fromTouch(pulseInput, context = {}) {
    return this.create(
      "touch",
      {
        intent: pulseInput.intent || "unknown",
        payload: pulseInput.payload || {}
      },
      context
    );
  },

  // ============================================================
  // NETWORK EXPRESSIONS
  // ============================================================
  fromNetwork(statusObj) {
    return this.create("network", {
      status: statusObj.status,
      paradigm: statusObj.paradigm,
      lastChange: statusObj.lastChange,
      networkClass: statusObj.networkClass,
      latency: statusObj.latency,
      jitter: statusObj.jitter,
      drift: statusObj.drift
    });
  },

  // ============================================================
  // WORLD VIEW EXPRESSIONS
  // ============================================================
  fromWorldView(viewEvent) {
    return this.create("world-view", viewEvent);
  },

  // ============================================================
  // PROXY EXPRESSIONS
  // ============================================================
  fromProxy(proxyEvent) {
    return this.create("proxy", {
      id: proxyEvent.id,
      proxyClass: proxyEvent.proxyClass,
      dnsTrusted: proxyEvent.dnsTrusted,
      latency: proxyEvent.latency,
      jitter: proxyEvent.jitter,
      drift: proxyEvent.drift
    });
  },

  // ============================================================
  // IMAGE EXPRESSIONS
  // ============================================================
  fromImage(imageInput, context = {}) {
    const semanticUrl = normalizeTxtUrl(imageInput.url);

    return this.create(
      "image",
      {
        id: imageInput.id || semanticUrl,
        url: imageInput.url,
        type: imageInput.type || "image/png",
        viewportId: imageInput.viewportId || "default",
        fit: imageInput.fit || "contain",
        semanticUrl,
        bytesLength: imageInput.bytesLength,
        source: imageInput.source,
        worldSignature: PulseIdentity.worldSignature
      },
      context
    );
  },

  // ============================================================
  // ROUTE EXPRESSIONS
  // ============================================================
  fromRoute(route, context = {}) {
    const realRoute = normalizeTxtUrl(route);
    return this.create("route", { route: realRoute }, context);
  },

  // ============================================================
  // EXTERNAL EXPRESSIONS
  // ============================================================
  fromExternal(url, options = {}, context = {}) {
    const semanticUrl = normalizeTxtUrl(url);
    return this.create(
      "external",
      {
        url,
        semanticUrl,
        ...options
      },
      context
    );
  },

  // ============================================================
  // RENDER EXPRESSIONS
  // ============================================================
  fromRender(viewportId, html, context = {}) {
    return this.create(
      "render",
      {
        viewportId,
        html,
        worldSignature: PulseIdentity.worldSignature
      },
      context
    );
  },

  // ============================================================
  // SNAPSHOT
  // ============================================================
  snapshot() {
    return {
      logs: [...this.logs],
      classifiers: [...this.classifiers.entries()]
    };
  }
};

// =======================================
// CODE
// =======================================
export const PulseCode = {
  handlers: new Map(),
  pipelines: new Map(),
  logs: [],
  metrics: new Map(),

  log(event, data = {}) {
    const ts = PulseRealm.PulseNOW;
    this.logs.push({ ts, event, ...data });
  },

  // ============================================================
  // REGISTER HANDLER
  // ============================================================
  register(type, handler, { priority = 10, group = "default" } = {}) {
    this.handlers.set(type, { handler, priority, group });
    this.log("handler-register", { type, priority, group });
  },

  // ============================================================
  // REGISTER PIPELINE (multi-stage execution)
  // ============================================================
  registerPipeline(name, stages = []) {
    this.pipelines.set(name, stages);
    this.log("pipeline-register", { name, stages });
  },

  // ============================================================
  // RUN EXPRESSION
  // ============================================================
  async run(expression, env = {}) {
    const ts = PulseRealm.PulseNOW;

    // -------------------------------------------
    // ETHICS CHECK
    // -------------------------------------------
    const ethicsResult = env.ethics
      ? env.ethics.evaluate(expression, env)
      : { allowed: true };

    if (!ethicsResult.allowed) {
      this.log("blocked-by-ethics", {
        expression,
        rule: ethicsResult.rule
      });

      return {
        blocked: true,
        rule: ethicsResult.rule,
        ts
      };
    }

    // -------------------------------------------
    // PIPELINE EXECUTION (if exists)
    // -------------------------------------------
    if (this.pipelines.has(expression.type)) {
      const stages = this.pipelines.get(expression.type);
      const results = [];

      for (const stage of stages) {
        const handler = this.handlers.get(stage);
        if (!handler) {
          this.log("pipeline-missing-handler", { stage });
          continue;
        }

        const result = await handler.handler(expression, env);
        results.push({ stage, result });

        this.log("pipeline-stage", { stage, result });
      }

      return {
        handled: true,
        pipeline: expression.type,
        results,
        ts
      };
    }

    // -------------------------------------------
    // DIRECT HANDLER EXECUTION
    // -------------------------------------------
    const entry = this.handlers.get(expression.type);

    if (!entry) {
      this.log("no-handler", { expression });
      return { handled: false, ts };
    }

    const result = await entry.handler(expression, env);

    this.log("handler-executed", {
      type: expression.type,
      result
    });

    return {
      handled: true,
      result,
      ts
    };
  },

  // ============================================================
  // SNAPSHOT
  // ============================================================
  snapshot() {
    return {
      handlers: [...this.handlers.entries()],
      pipelines: [...this.pipelines.entries()],
      logs: [...this.logs],
      metrics: [...this.metrics.entries()]
    };
  }
};


// Default handlers
PulseCode.register("network", (expr, env) => {
  env.log("network-event", expr.payload);
});

PulseCode.register("touch", (expr, env) => {
  env.log("touch-event", expr.payload);
});

PulseCode.register("gate-event", (expr, env) => {
  env.log("gate-event", expr.payload);
});

PulseCode.register("route", (expr, env) => {
  env.log("route-event", expr.payload);
  return { handled: true };
});

PulseCode.register("boot-video", (expr, env) => {
  env.view.renderVideo({
    src: expr.payload.src,
    autoplay: expr.payload.autoplay ?? true,
    muted: expr.payload.muted ?? true,
    loop: expr.payload.loop ?? false,
    viewportId: expr.payload.viewportId || "boot"
  });
});

PulseCode.register("video", (expr, env) => {
  env.view.renderVideo({
    src: expr.payload.src,
    autoplay: expr.payload.autoplay ?? true,
    muted: expr.payload.muted ?? true,
    loop: expr.payload.loop ?? false,
    viewportId: expr.payload.viewportId || "default"
  });
});

PulseCode.register("image", async (expr, env) => {
  const { id, url, type, viewportId, fit } = expr.payload;
  const imgMeta = await env.image.register(id, { url, type });

  env.view.renderImage({
    objectUrl: imgMeta.objectUrl,
    viewportId,
    fit
  });

  env.log("image-loaded", {
    id: imgMeta.id,
    bytesLength: imgMeta.bytesLength,
    objectUrl: imgMeta.objectUrl,
    wireUrl: imgMeta.wireUrl,
    url: imgMeta.url
  });

  return { handled: true };
});

PulseCode.register("boot-image", async (expr, env) => {
  const payload = {
    ...expr.payload,
    viewportId: expr.payload.viewportId || "boot"
  };
  return PulseCode.handlers.get("image")({ ...expr, payload }, env);
});

PulseCode.register("external", async (expr, env) => {
  const { url, viewportId, proxyId } = expr.payload;
  const result = await env.view.renderExternal(url, { viewportId, proxyId });
  env.log("external-render", result);
  return { handled: true, result };
});

PulseCode.register("render", (expr, env) => {
  env.view.renderHtml({
    viewportId: expr.payload.viewportId || "default",
    html: expr.payload.html || ""
  });
  env.log("render-html", { viewportId: expr.payload.viewportId });
  return { handled: true };
});

// =======================================
// BOOT WORLD (PORTAL-INTEGRATED)
// =======================================
export const PulseBootWorld = {
  initialized: false,
  membraneOpen: false,
  externalUrl: "https://www.pulseworld.net",

  // Core organs (wired into TouchWorld)
  network: PulseNetworkStatus,
  ethics: PulseEthics,
  code: PulseCode,
  expression: PulseExpression,
  image: PulseImage,
  identity: PulseIdentity,
  omni: PulseOmni,
  schema: PulseSchema,
  continuance: PulseContinuance,
  worldview: PulseWorldView,
  proxy: PulseProxy,

  // ============================================================
  // PUBLIC BOOT ENTRY (USED BY PULSE-BOOT / BARRIER)
  // ============================================================
  async boot(route, options = {}) {
    // ⭐ If already booted, do NOT re-wire or re-attach anything
    if (this.initialized && PulseRealm.PulseWorld) {
      const world = PulseRealm.PulseWorld;

      world.network = this.network;
      world.route = world.route || {};
      world.route.current = route || world.route.current || null;
      world.route.meta = {
        ...(world.route.meta || {}),
        bootOptions: options,
        bootedAt: PulseRealm.PulseNOW
      };

      console.log(
        "🌐 PULSE BOOT WORLD v40.0 — WORLD Re-Booted (no re-init).",
        { route: world.route.current }
      );

      return world;
    }

    // WORLD must already be present on window (no imports here)
    const world = PulseRealm.PulseUniversalTouchWorld ? PulseRealm.PulseUniversalTouchWorld : null;

    if (!world) {
      console.error("🌐 PULSE BOOT WORLD v40.0 — PulseUniversalTouchWorld Not Available!");
      return null;
    }

    // One-time init of world + portal wiring
    this.init(world);

    // Attach route/meta onto world (lightweight)
    world.network = this.network;
    world.route = world.route || {};
    world.route.current = route || world.route.current || null;
    world.route.meta = {
      ...(world.route.meta || {}),
      bootOptions: options,
      bootedAt: PulseRealm.PulseNOW
    };

    if (!PulseRealm.PulseWorld) PulseRealm.PulseWorld = world;
    if (!PulseRealm.PulseTouchWorld) PulseRealm.PulseTouchWorld = world;

    console.groupCollapsed(
      "%c🌐 PULSE BOOT WORLD v40.0 — Pulse World Multiverse Instance Booted!",
      "color:#7DF9FF;font-weight:bold;"
    );

    console.log("%cCurrent Pulse World Route:", "color:#00FF9C;font-weight:bold;");
    console.log({ route: world.route.current });

    console.groupEnd();

    return world;
  },

  // ============================================================
  // INIT — One-Time Wiring
  // ============================================================
  init(world) {
    if (this.initialized) return;
    this.initialized = true;

    this.installNavigationInterception(world);
    this.installViewportVisualMembrane(world);
    this.installImageInterception(world);
    this.installMultiversalSignal(world);

    // Portal integration
    try {
      world.portal = PulsePortalAPI;

      world.VitalsMonitor      = PulsePortalAPI.VitalsMonitor || null;
      world.Logger             = PulsePortalAPI.Logger || null;
      world.Understanding      = PulsePortalAPI.Understanding || null;
      world.SurfaceEnvironment = PulsePortalAPI.SurfaceEnvironment || null;
      world.UIFlow             = PulsePortalAPI.UIFlow || null;
      world.Errors             = PulsePortalAPI.Errors || null;
      world.portalMeta         = PulsePortalAPI.meta || null;

      if (!PulseRealm.PulsePortal) PulseRealm.PulsePortal = PulsePortalAPI;
      if (!PulseRealm.PulseVitalsMonitor && world.VitalsMonitor)
        PulseRealm.PulseVitalsMonitor = world.VitalsMonitor;
      if (!PulseRealm.PulseWorldLogger && world.Logger)
        PulseRealm.PulseWorldLogger = world.Logger;

      console.groupCollapsed(
        "%c🌐 PULSE BOOT WORLD v40.0 — Pulse World Portal Integrated",
        "color:#7DF9FF;font-weight:bold;"
      );

      console.log("%cPortal Metadata:", "color:#00FF9C;font-weight:bold;");
      console.log({ portalMeta: world.portalMeta });

      console.groupEnd();

    } catch (err) {
      console.error("🌐 PULSE BOOT WORLD v40.0 — Portal Integration Failed:", err);
    }

    world.network.markNewParadigm("boot-world-primary-visual-membrane+portal");
  },

  // ============================================================
  // NAVIGATION INTERCEPTION
  // ============================================================
  installNavigationInterception(world) {
    if (window.__PulseNavInterceptInstalled) return;
    window.__PulseNavInterceptInstalled = true;

    document.addEventListener("click", (e) => {
      const a = e.target.closest("[data-pulse-route]");
      if (!a) return;

      let route = a.getAttribute("data-pulse-route");
      if (!route || route.startsWith("#")) return;

      const semanticRoute = normalizeTxtUrl(route);

      e.preventDefault();
      e.stopPropagation();

      const expr = world.expression.fromRoute(route);
      const ethicsResult = world.ethics.evaluate(expr, { world });

      if (!ethicsResult.allowed) {
        console.warn("Blocked by ethics:", ethicsResult.rule);
        return;
      }

      world.code.run(expr, {
        world,
        network: world.network,
        view: world.view,
        ethics: world.ethics,
        proxy: world.proxy,
        continuance: world.continuance,
        schema: world.schema,
        omni: world.omni,
        identity: world.identity,
        image: world.image,
        log: console.log
      });

      if (world.route.navigate) {
        world.route.navigate(semanticRoute);
      } else {
        location.href = semanticRoute;
      }
    });

    console.log("🌐 PULSE BOOT WORLD v40.0 — Navigation Interception Installed.");
  },

  // ============================================================
  // VIEWPORT VISUAL MEMBRANE
  // ============================================================
  installViewportVisualMembrane(world) {
    if (window.__PulseViewportMembraneInstalled) return;
    window.__PulseViewportMembraneInstalled = true;

    const view = world.view;

    function passthroughHtml(html) {
      return html;
    }

    view.renderExternal = async (url, { viewportId = null, proxyId = null } = {}) => {
      const expr = world.expression.fromExternal(url, { viewportId, proxyId });
      const ethicsResult = world.ethics.evaluate(expr, { world });

      if (!ethicsResult.allowed) {
        console.warn("Blocked external by ethics:", ethicsResult.rule);
        return {
          url,
          viaViewport: viewportId,
          viaProxy: proxyId,
          content: null,
          error: "blocked-by-ethics",
          ts: PulseRealm.PulseNOW
        };
      }

      const result = await world.proxy.fetch(url, proxyId);
      const vp = viewportId ? view.getViewport(viewportId) : view.getViewport("default");

      if (vp && vp.element && result.ok && result.text) {
        const html = passthroughHtml(result.text);
        vp.element.innerHTML = html;
      }

      world.code.run(expr, {
        world,
        network: world.network,
        view: world.view,
        ethics: world.ethics,
        proxy: world.proxy,
        continuance: world.continuance,
        schema: world.schema,
        omni: world.omni,
        identity: world.identity,
        image: world.image,
        log: console.log
      });

      return {
        url: result.url,
        viaViewport: viewportId,
        viaProxy: proxyId,
        content: result.ok ? result.text : null,
        error: result.ok ? null : result.error,
        ts: PulseRealm.PulseNOW
      };
    };

    view.renderHtml = ({ viewportId = "default", html = "" }) => {
      const vp = view.getViewport(viewportId) || view.getViewport("default");
      if (!vp || !vp.element) return;

      const expr = world.expression.fromRender(viewportId, html);
      const ethicsResult = world.ethics.evaluate(expr, { world });

      if (!ethicsResult.allowed) {
        console.warn("Blocked render-html by ethics:", ethicsResult.rule);
        return;
      }

      const safeHtml = passthroughHtml(html);
      vp.element.innerHTML = safeHtml;

      world.code.run(expr, {
        world,
        network: world.network,
        view: world.view,
        ethics: world.ethics,
        proxy: world.proxy,
        continuance: world.continuance,
        schema: world.schema,
        omni: world.omni,
        identity: world.identity,
        image: world.image,
        log: console.log
      });
    };

    console.log("🌐 PULSE BOOT WORLD v40.0 — Viewport Visual Membrane Installed.");
  },

  // ============================================================
  // IMAGE INTERCEPTION
  // ============================================================
  installImageInterception(world) {
    if (window.__PulseImageInterceptInstalled) return;
    window.__PulseImageInterceptInstalled = true;

    function resolvePulseImage(path) {
      if (!path) return null;
      const name = path.split("/").pop() || "";
      if (!name.includes(".")) return path + ".png";
      return path;
    }

    async function hydrateNode(node) {
      if (node.tagName === "IMG") {
        const raw = node.getAttribute("data-pulse-src") || node.getAttribute("src");
        if (!raw) return;

        const resolved = resolvePulseImage(raw);
        node.setAttribute("src", resolved);
        return;
      }

      if (node.tagName === "VIDEO") {
        const raw = node.getAttribute("data-pulse-poster") || node.getAttribute("poster");
        if (!raw) return;

        const resolved = resolvePulseImage(raw);
        node.setAttribute("poster", resolved);
        return;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const bgRaw = node.getAttribute("data-pulse-bg");
        if (bgRaw) {
          const resolved = resolvePulseImage(bgRaw);
          node.style.backgroundImage = `url(${resolved})`;
        }
      }
    }

    function hydrateTree(root) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, null);
      let node = root;
      while (node) {
        hydrateNode(node);
        node = walker.nextNode();
      }
    }

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (!(node instanceof Element)) continue;

          if (
            node.hasAttribute("data-pulse-src") ||
            node.hasAttribute("data-pulse-bg") ||
            node.hasAttribute("data-pulse-poster")
          ) {
            hydrateNode(node);
          }

          const pulseChildren = node.querySelectorAll(
            "[data-pulse-src], [data-pulse-bg], [data-pulse-poster]"
          );
          pulseChildren.forEach(hydrateNode);
        }
      }
    });

    const start = () => {
      hydrateTree(document.body);
      observer.observe(document.body, { childList: true, subtree: true });
    };

    if (document.body) start();
    else window.addEventListener("DOMContentLoaded", start);

    console.log("🌐 PULSE BOOT WORLD v40.0 — Image Interception Installed.");
  },

  // ============================================================
  // MULTIVERSAL SIGNAL (WORLD AWARENESS)
  // ============================================================
  installMultiversalSignal(world) {
    if (window.__PulseMultiversalSignalInstalled) return;
    window.__PulseMultiversalSignalInstalled = true;

    window.addEventListener("message", (event) => {
      if (!event.data || !event.data.targetUrl) return;

      const wireUrl = String(event.data.targetUrl);
      const semanticUrl = normalizeTxtUrl(wireUrl);

      this.externalUrl = semanticUrl;
      this.membraneOpen = true;

      const btn = document.getElementById("continueBtn");
      if (btn) btn.setAttribute("data-pulse-route", semanticUrl);

      const expr = world.expression.create("gate-event", {
        event: "multiversal-target-received",
        url: wireUrl,
        semanticUrl
      });

      world.code.run(expr, {
        world,
        network: world.network,
        view: world.view,
        ethics: world.ethics,
        proxy: world.proxy,
        continuance: world.continuance,
        schema: world.schema,
        omni: world.omni,
        identity: world.identity,
        image: world.image,
        log: console.log
      });
    });

    console.log("🌐 PULSE BOOT WORLD v40.0 — Multiversal Signal Installed.");
  },

  // ============================================================
  // SNAPSHOT
  // ============================================================
  snapshot() {
    return {
      initialized: this.initialized,
      membraneOpen: this.membraneOpen,
      externalUrl: this.externalUrl,
      ts: PulseRealm.PulseNOW
    };
  }
};

// =======================================
// PULSE UNIVERSAL TOUCH WORLD (UPGRADED)
// Path‑Agnostic, Index‑Safe, Touch‑First
// =======================================
export const PulseUniversalTouchWorld = {
  // ============================================================
  // CORE ORGANS (Temporal OS)
  // ============================================================
  network: PulseNetworkStatus,
  view: PulseWorldView,
  ethics: PulseEthics,
  expression: PulseExpression,
  code: PulseCode,
  proxy: PulseProxy,
  continuance: PulseContinuance,
  schema: PulseSchema,
  omni: PulseOmni,
  identity: PulseIdentity,
  image: PulseImage,

  // ============================================================
  // BOOT (Overwritten by BootWorld)
  // ============================================================
  boot: PulseBootWorld.boot,
  portal: PulseBootWorld.init,

  // ============================================================
  // EXPRESS — The Root Organ
  // ============================================================
  express(type, payload = {}, context = {}) {
    const expr = this.expression.create(type, payload, {
      ...context,
      worldSignature: this.identity.worldSignature,
      deviceFingerprint: this.identity.deviceFingerprint,
      browserFingerprint: this.identity.browserFingerprint,
      dnsTrusted: this.network.dnsTrusted,
      proxyClass: this.network.proxyClass,
      drift: this.network.drift,
      jitter: this.network.jitter,
      tier: this.identity.tier
    });

    return this.code.run(expr, {
      world: this,
      network: this.network,
      view: this.view,
      ethics: this.ethics,
      proxy: this.proxy,
      continuance: this.continuance,
      schema: this.schema,
      omni: this.omni,
      identity: this.identity,
      image: this.image,
      log: console.log
    });
  },

  // ============================================================
  // VIDEO (Path‑Agnostic)
  // ============================================================
  video(src, options = {}) {
    return this.express("video", { src, ...options });
  },

  bootVideo(src, options = {}) {
    const finalSrc = src || "../../../../_EXPRESSIONS/_VIDEOS/PulseWorldOSBoot";
    return this.express("boot-video", { src: finalSrc, ...options });
  },

  // ============================================================
  // EXTERNAL
  // ============================================================
  external(url, options = {}) {
    return this.express("external", { url, ...options });
  },

  // ============================================================
  // RENDER
  // ============================================================
  render(viewportId, html) {
    return this.express("render", { viewportId, html });
  },

  // ============================================================
  // IMAGE (Path‑Agnostic)
  // ============================================================
  imageExpr(url, options = {}) {
    return this.express("image", { url, ...options });
  },

  bootImage(url, options = {}) {
    const finalUrl = url || "../../../../_EXPRESSIONS/_PEX/BUILD/PulseWorldBarrier-Delta.webp.pex";
    return this.express("boot-image", { url: finalUrl, ...options });
  }
};


export class PulseWorldUser {
  constructor(identity, business, shop, upgrades, mentor, game) {
    this.identity  = identity;
    this.business  = business;
    this.shop      = shop;
    this.upgrades  = upgrades;
    this.mentor    = mentor;
    this.game      = game;

    this.initialized = false;
    this.loadedFromStorage = false;

    this.network     = PulseNetworkStatus;
    this.ethics      = PulseEthics;
    this.code        = PulseCode;
    this.expression  = PulseExpression;
    this.image       = PulseImage;
    this.omni        = PulseOmni;
    this.schema      = PulseSchema;
    this.continuance = PulseContinuance;
    this.worldview   = PulseWorldView;
    this.proxy       = PulseProxy;
  }

  initialize() {
    if (this.initialized) return;

    this.identity.initialize({
      dnsOrigin: null,
      proxyClass: "unclassified",
      deviceFp: null,
      browserFp: null
    });

    this.business?.initialize?.();
    this.shop?.initialize?.();
    this.upgrades?.initialize?.();
    this.mentor?.initialize?.();
    this.game?.initialize?.();

    this.initialized = true;
  }

  save() {
    const snapshot = {
      identity: this.identity.getIdentity(),
      business: this.business.getSnapshot?.(),
      shop: this.shop.getSnapshot?.(),
      upgrades: this.upgrades.getSnapshot?.(),
      mentor: this.mentor.getSnapshot?.(),
      game: this.game.getSnapshot?.()
    };

    localStorage.setItem("PulseWorldUser", JSON.stringify(snapshot));
  }

  load() {
    const raw = localStorage.getItem("PulseWorldUser");
    if (!raw) return;

    const data = JSON.parse(raw);

    this.identity.load?.(data.identity);
    this.business.load?.(data.business);
    this.shop.load?.(data.shop);
    this.upgrades.load?.(data.upgrades);
    this.mentor.load?.(data.mentor);
    this.game.load?.(data.game);

    this.loadedFromStorage = true;
  }

  updatePhoto(newPhoto) {
    this.identity.photoURL = newPhoto;
    this.save();
  }

  updateBusiness(info) {
    this.business.update(info);
    this.save();
  }

  updateShop(info) {
    this.shop.update(info);
    this.save();
  }

  updateIdentity(info) {
    Object.assign(this.identity, info);
    this.save();
  }

  // // ============================================================
  // // WORLD INTERACTION
  // // ============================================================
  // openShop() {
  //   loadInternalPage("PulseWorldShop");
  // }

  // openBusiness() {
  //   loadInternalPage("PulseWorldBusiness");
  // }

  // openIdentity() {
  //   loadInternalPage("PulseWorldIdentity");
  // }
}

PulseRealm.PulseWorldUser = new PulseWorldUser(
  PulseIdentity(),
  // PulseBusiness(),
  // PulseShop(),
  // PulseUpgrades(),
  // PulseMentor(),
  // PulseGame()
);

PulseRealm.PulseWorldUser.initialize();



  PulseRealm.PulseBootWorld = PulseBootWorld;

  PulseRealm.PulseNetwork = PulseNetworkStatus;
  PulseRealm.PulseImage = PulseImage;
  PulseRealm.PulseProxy = PulseProxy;
  PulseRealm.PulseEthics = PulseEthics;
  PulseRealm.PulseCode = PulseCode;
  PulseRealm.PulseOmni = PulseOmni;
  PulseRealm.PulseExpression = PulseExpression;
  PulseRealm.PulseUniversalTouchWorld = PulseUniversalTouchWorld;
  PulseRealm.PulseIdentity = PulseIdentity;
  PulseRealm.PulseNetworkStatus = PulseNetworkStatus;
  PulseRealm.PulseContinuance = PulseContinuance;
  PulseRealm.PulseSchema = PulseSchema;
  PulseRealm.PulseWorldView = PulseWorldView;