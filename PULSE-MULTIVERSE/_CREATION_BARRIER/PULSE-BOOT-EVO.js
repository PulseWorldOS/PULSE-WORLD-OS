// ============================================================
// PULSE-BOOT-EVO.js — UI BUILDER (v30.9 ONE-BAND + ORBITAL + INTERNET-OPTIONAL)
// ============================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

PulseRealm.PulseLog(
  "boot","[PULSE-BOOT-EVO] Running UI Builder, Better, More Evolutionary!");

// 1. Get wrapper
const root = document.getElementById("evo-wrapper");

if (!root) {
  console.error("[PULSE-EVO] ERROR: #evo-wrapper not found.");
}

// ============================================================
// 2. Inject FULL HTML structure (UPGRADED v30.9)
// ============================================================

root.innerHTML = String.raw`

  <!-- MOBILE MENU -->
  <div class="mobile-menu" id="mobileMenu">
    <div class="mobile-menu-panel">
      <div class="mobile-menu-header">
        <div class="tp-logo-wrapper">
          <img class="tp-logo-circle-mobile offline-img"
               src="./_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo2.png"
               alt="Pulse World Logo">
        </div>
        <h1 class="tp-header-mobile">Pulse World OS</h1>
        <button class="mobile-menu-close" id="mobileMenuClose">&times;</button>
      </div>

      <div class="mobile-menu-nav">
        <a href="#tp-os-hero">Home</a>
        <a href="#tp-use-cases">Capabilities</a>
        <a href="#tp-live-demo">Live Demo</a>
        <a href="#pricing">Access</a>
        <a href="#faq">FAQ</a>
        <a href="#contact">Contact</a>
        <a href="/">Enter Pulse‑World</a>
      </div>

      <div class="mobile-menu-cta">
        <a class="btn btn-primary" href="/">Enter Pulse‑World</a>
        <a class="btn" style="background:#fff;color:#333;" href="#tp-use-cases">Explore Capabilities</a>
      </div>
    </div>
  </div>

  <!-- HEADER -->
  <header class="topmenu">
    <div class="header-inner">
      <div class="tp-logo-wrapper">
        <img class="tp-logo-circle offline-img"
             src="./_EXPRESSIONS/_PEX/BUILD/PulseWorldOSLogo2.png"
             alt="Pulse Logo">
      </div>

      <h1 class="tp-header">Pulse World OS</h1>

      <nav>
        <a href="#tp-os-hero">Home</a>
        <a href="#tp-use-cases">Capabilities</a>
        <a href="#tp-live-demo">Live Demo</a>
        <a href="#pricing">Access</a>
        <a href="#faq">FAQ</a>
        <a href="#contact">Contact</a>
      </nav>

      <div class="header-cta">
        <a href="/" class="btn btn-primary">Enter Pulse‑World</a>
      </div>

      <button class="mobile-menu-toggle" id="mobileMenuToggle">
        <span></span>
      </button>
    </div>
  </header>

  <!-- HERO -->
  <section class="hero gradient-bg" id="tp-os-hero">
    <div class="hero-inner">
      <div class="hero-grid">

        <div class="hero-lashes">
          <div class="hero-eyebrow">
            <span class="badge">A Multiversal Operating System</span>
          </div>

          <h1 class="hero-title">Pulse World OS</h1>

          <p class="hero-subtitle">
            A GPU‑accelerated, browser‑native operating system that powers identity, motion, intelligence, and live performance across worlds, networks, and devices.
          </p>

          <div class="hero-ctas">
            <a href="#tp-live-demo" class="btn btn-primary">Run Live Demo</a>
            <a href="#tp-use-cases" class="btn btn-outline">Explore Capabilities</a>
          </div>

          <div class="hero-meta">
            Built for the Multiverse. Engineered for the Future.  
            <br>Lightly powered by Tropic Pulse.
          </div>
        </div>

        <div class="hero-phone">
          <div class="phone-frame">
            <div class="phone-inner">
              <img class="phone-screen-img"
                   src="./_EXPRESSIONS/_PEX/BUILD/PulseOSPhone.png"
                   alt="OS Preview">
            </div>
          </div>
          <div class="phone-glow"></div>
        </div>

      </div>
    </div>
  </section>

  <!-- LIVE DEMO -->
  <section class="section" id="tp-live-demo">
    <div class="container">

      <div class="section-header">
        <div class="section-eyebrow">Live in Your Browser</div>
        <h2 class="section-title">Test Pulse World OS</h2>
        <p class="section-subtitle">
          Upload a file and watch Pulse‑World wrap it with GPU acceleration, PulseBand metrics, and network intelligence — instantly.
        </p>
      </div>

      <div class="feature-grid" style="grid-template-columns:minmax(0,2fr) minmax(0,1.4fr);">

        <div class="feature-card" style="background:#111;padding:20px;">
          <h3>Run a Test</h3>
          <p>You can run this test once every 15 minutes per device.</p>

          <div style="display:flex;flex-direction:column;gap:10px;">
            <input type="file" id="tp-test-file" accept="image/*,application/json" />
            <button class="btn btn-primary" id="tp-test-button">Run Test</button>
            <div id="tp-test-status"></div>
          </div>
        </div>

        <div class="feature-card" style="background:#111;padding:20px;">
          <h3>What You’ll See</h3>
          <ul style="list-style:none;padding:0;margin:0;">
            <li>• GPU warm state</li>
            <li>• PulseBand advantage</li>
            <li>• Network route prediction</li>
            <li>• CPU & memory impact</li>
          </ul>
          <div id="tp-test-metrics" style="margin-top:14px;color:#FFD400;">
            Metrics will appear here after your test runs.
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- USE CASES -->
  <section class="section" id="tp-use-cases">
    <div class="container">
      <div class="section-header">
        <div class="section-eyebrow">Beyond Apps</div>
        <h2 class="section-title">One OS. Infinite Worlds.</h2>
        <p class="section-subtitle">
          Pulse World OS powers dashboards, networks, overlays, marketplaces, and real‑time systems across any device or environment.
        </p>
      </div>

      <div class="feature-grid">

        <div class="feature-card">
          <img class="offline-img" src="./_EXPRESSIONS/_PEX/BUILD/PulseBackbone.png">
          <div class="feature-card-overlay">
            <div class="feature-card-title">Pulse Backbone</div>
            <div class="feature-card-text">
              PulseBand, PulseNet, and PulseMesh — a living infrastructure that adapts, heals, and expands in real time.
            </div>
          </div>
        </div>

        <div class="feature-card">
          <img class="offline-img" src="./_EXPRESSIONS/_PEX/BUILD/LocalNetworks.png">
          <div class="feature-card-overlay">
            <div class="feature-card-title">Local Networks</div>
            <div class="feature-card-text">
              Build living maps of cities, islands, or campuses with identity and trust baked in.
            </div>
          </div>
        </div>

        <div class="feature-card">
          <img class="offline-img" src="./_EXPRESSIONS/_PEX/BUILD/PulseEarn.png">
          <div class="feature-card-overlay">
            <div class="feature-card-title">Pulse Earn</div>
            <div class="feature-card-text">
              Value, motion, and momentum fused into one living layer. Coming soon.
            </div>
          </div>
        </div>

        <div class="feature-card">
          <img class="offline-img" src="./_EXPRESSIONS/_PEX/BUILD/PulseGPU.png">
          <div class="feature-card-overlay">
            <div class="feature-card-title">Pulse‑GPU</div>
            <div class="feature-card-text">
              A graphics engine for your entire business — rendered in real time.
            </div>
          </div>
        </div>

        <div class="feature-card">
          <img class="offline-img" src="./_EXPRESSIONS/_PEX/BUILD/PulseLoyalty.png">
          <div class="feature-card-overlay">
            <div class="feature-card-title">Identity & Loyalty</div>
            <div class="feature-card-text">
              Device‑aware identity, points, and rewards that travel across every experience.
            </div>
          </div>
        </div>

        <div class="feature-card">
          <img class="offline-img" src="./_EXPRESSIONS/_PEX/BUILD/AdminPanels.png">
          <div class="feature-card-overlay">
            <div class="feature-card-title">Admin Dashboards</div>
            <div class="feature-card-text">
              Live performance, health, and behavior — powered by PulseBand.
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer style="background:#000;padding:40px 0;text-align:center;color:#aaa;">
    <div style="max-width:900px;margin:0 auto;">

      <h3 style="color:#00e6c7;font-weight:800;">Pulse World OS</h3>
      <p style="max-width:600px;margin:10px auto 20px;">
        A multiversal operating system for identity, motion, intelligence, and real‑time performance.
      </p>

      <p style="margin-top:20px;color:#666;">
        Lightly Offered from Tropic Pulse — Belize’s original network.
      </p>

      <div style="margin-top:20px;font-size:0.85rem;color:#555;">
        © 2026 Pulse World OS. All Rights Reserved.
      </div>
    </div>
  </footer>


`;

// ============================================================================
//  PULSE-EVO v30.9 — IMMORTAL+++ ONE-BAND + ORBITAL + INTERNET-OPTIONAL
// ============================================================================

// IMMORTAL COLOR CONSTANTS
const C_ID   = "color:#26C6DA; font-weight:bold; font-family:monospace;";
const C_OK   = "color:#00FF9C; font-family:monospace;";
const C_INFO = "color:#E8F8FF; font-family:monospace;";
const C_WARN = "color:#FFE066; font-family:monospace;";
const C_ERR  = "color:#FF3B3B; font-weight:bold; font-family:monospace;";

// PULSE-CHRONO v30
let _pulseChronoLast = performance.now();
function _pulseChronoLabel(absolute) {
  const now = performance.now();
  const diff = now - _pulseChronoLast;
  const label = absolute ? `@${now.toFixed(1)}ms` : `+${diff.toFixed(1)}ms`;
  _pulseChronoLast = now;
  return label;
}

function logID(msg, absolute = false, ...rest) {
  const time = _pulseChronoLabel(absolute);
  PulseRealm.PulseLog(
  "boot",`%c[PULSE-EVO] %c${msg} %c${time}`, C_ID, C_INFO, "color:#999;font-weight:300;", ...rest);
}
function logOK(msg, absolute = false, ...rest) {
  const time = _pulseChronoLabel(absolute);
  PulseRealm.PulseLog(
  "boot",`%c[PULSE-EVO] %c${msg} %c${time}`, C_ID, C_OK, "color:#999;font-weight:300;", ...rest);
}
function logWarn(msg, absolute = false, ...rest) {
  const time = _pulseChronoLabel(absolute);
  console.warn(`%c[PULSE-EVO] %c${msg} %c${time}`, C_ID, C_WARN, "color:#999;font-weight:300;", ...rest);
}
function logErr(msg, absolute = false, ...rest) {
  const time = _pulseChronoLabel(absolute);
  console.error(`%c[PULSE-EVO] %c${msg} %c${time}`, C_ID, C_ERR, "color:#999;font-weight:300;", ...rest);
}

logID.reset = () => {
  _pulseChronoLast = performance.now();
  PulseRealm.PulseLog(
  "boot",`%c[PULSE-EVO] %cTimer reset`, C_ID, C_WARN);
};

// DOM TIMING
logID("BOOT MEMBRANE START");
PulseRealm.__EVO_DOM_START = performance.now();
logID("DOM START", true);

// IMMORTAL IndexedDB Pulse Cache
const EvoPulseStore = PulseRealm.PulseDB.store("pulse_state");

// In-memory snapshot
PulseRealm.__PULSE_LAST_SIGNAL__ = PulseRealm.__PULSE_LAST_SIGNAL__ || null;

// Helpers: network + orbital normalization
function normalizeNetworkView(state) {
  const net = state.network || {};
  const route = net.route || state.route || "primary";
  const band = net.band || PulseRealm.ONE_BAND.id;
  const via = net.via || net.mode || "mesh";

  let internetRole = "unused";
  if (via === "internet" || route === "internet-primary") {
    internetRole = "primary";
  } else if (net.internetFallback === true || route === "internet-fallback") {
    internetRole = "fallback";
  }

  const orbital = state.orbital || {};
  const season = orbital.season || "neutral";
  const nextWindow = orbital.nextContactWindow || null;

  return {
    band,
    via,
    route,
    internetRole,
    season,
    nextWindow
  };
}

function labelInternetRole(internetRole) {
  switch (internetRole) {
    case "primary":
      return "Internet: Primary Route";
    case "fallback":
      return "Internet: Fallback Only";
    default:
      return "Internet: Optional";
  }
}

function labelVia(via) {
  switch (via) {
    case "groundstation":
      return "Route: Groundstation";
    case "satellite":
      return "Route: Satellite";
    case "mesh":
      return "Route: Mesh / Local";
    case "internet":
      return "Route: Internet";
    default:
      return `Route: ${via}`;
  }
}

function labelOrbitalSeason(season) {
  switch (season) {
    case "orbital-season":
      return "Orbital Season: Satellite-Dominant";
    case "sky-season":
      return "Orbital Season: Groundstation-Dominant";
    default:
      return "Orbital Season: Neutral";
  }
}

function labelContactWindow(nextWindow) {
  if (!nextWindow) return "Contact: Continuous / Local";
  const start = new Date(nextWindow.startTs || 0);
  const end = new Date(nextWindow.endTs || 0);
  if (!nextWindow.startTs || !nextWindow.endTs) {
    return "Contact: Scheduled";
  }
  return `Contact: ${start.toLocaleTimeString()} → ${end.toLocaleTimeString()}`;
}

  document.addEventListener("DOMContentLoaded", async () => {
    const domEnd = performance.now();
    const domTotal = (domEnd - (PulseRealm.__EVO_DOM_START || domEnd)).toFixed(1);
    logOK(`DOM READY — ${domTotal}ms`);

    const $ = (id) => document.getElementById(id);

    const PB = {
      bars:       $("pb-bars-text"),
      phone:      $("pb-phonebars-text"),
      stability:  $("pb-stability"),
      latency:    $("pb-latency"),
      micro:      $("pb-micro"),
      route:      $("pb-route"),
      state:      $("pb-state"),
      sync:       $("pb-sync"),
      efficiency: $("pb-efficiency"),
      health:     $("pb-health"),
      advantage:  $("pb-advantage"),
      estimated:  $("pb-estimated"),
      band:       $("pb-band"),
      via:        $("pb-via"),
      internet:   $("pb-internet-role"),
      orbital:    $("pb-orbital"),
      contact:    $("pb-contact")
    };

    // IMMORTAL RESTORE FROM INDEXEDDB
    try {
      const cached = EvoPulseStore.get("last");
      if (cached) {
        PulseRealm.__PULSE_LAST_SIGNAL__ = cached;
        logOK("Restored IMMORTAL pulse snapshot (EVO) from IndexedDB");
      }
    } catch (err) {
      logWarn("EVO IndexedDB restore failed", err);
    }

    function getSnap() {
      return PulseRealm.__PULSE_LAST_SIGNAL__ || null;
    }

    function updateUI() {
      const s = getSnap();
      if (!s) return;

      const netView = normalizeNetworkView(s);

      PB.bars       && (PB.bars.textContent       = s.network.bars ?? "—");
      PB.phone      && (PB.phone.textContent      = s.device.bars ?? s.network.bars ?? "—");
      PB.stability  && (PB.stability.textContent  = s.stability.score != null ? s.stability.score + "%" : "—");
      PB.latency    && (PB.latency.textContent    = s.latency.ms != null ? s.latency.ms + " ms" : "—");
      PB.micro      && (PB.micro.textContent      = s.micro.phase ?? s.phase ?? "Idle");
      PB.route      && (PB.route.textContent      = netView.route || "Primary");
      PB.state      && (PB.state.textContent      = s.state ?? "Active");
      PB.sync       && (PB.sync.textContent       = s.sync.ageLabel ?? "Just now");
      PB.efficiency && (PB.efficiency.textContent = s.efficiency.label ?? "Balanced");
      PB.health     && (PB.health.textContent     = s.health.label ?? "Excellent");
      PB.advantage  && (PB.advantage.textContent  = (s.advantage.multiplier ?? 1) + "× Faster");
      PB.estimated  && (PB.estimated.textContent  = (s.advantage.percent ?? 0) + "% better");

      PB.band &&
        (PB.band.textContent = `Band: ${netView.band || PulseRealm.ONE_BAND.id}`);

      PB.via &&
        (PB.via.textContent = labelVia(netView.via));

      PB.internet &&
        (PB.internet.textContent = labelInternetRole(netView.internetRole));

      PB.orbital &&
        (PB.orbital.textContent = labelOrbitalSeason(netView.season));

      PB.contact &&
        (PB.contact.textContent = labelContactWindow(netView.nextWindow));
    }

    // PulseSignal subscription — IMMORTAL IndexedDB persistence
    try {
      const PS = PulseRealm.PulseSignals;

      if (PS.subscribe) {
        PS.subscribe(async (packet) => {
          const state = packet.state || packet;
          PulseRealm.__PULSE_LAST_SIGNAL__ = state;

          try {
            EvoPulseStore.set("last", state);
          } catch {}

          updateUI();
        });

        logOK("PulseSignal v30.9 (EVO) subscribed");
      }
    } catch (err) {
      logErr("PulseSignal subscription failed (EVO)", err);
    }

    // Base loop
    const uiInterval = setInterval(updateUI, 120);

    (function rafLoop() {
      updateUI();
      requestAnimationFrame(rafLoop);
    })();

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) updateUI();
    });

    window.addEventListener("online",  updateUI);
    window.addEventListener("offline", updateUI);

    ["click", "keydown", "mousemove", "touchstart"].forEach((evt) => {
      window.addEventListener(evt, updateUI, { passive: true });
    });

    logOK("Pulse Engine v30.9 (EVO) active — ONE-BAND, ORBITAL, INTERNET-OPTIONAL");

    // GPU Lymph Tempo
    try {
      PulseRealm.PulseGpuLymphTempo.attachToUi(updateUI);
      logOK("GPU Lymph Tempo attached (EVO)");
    } catch (err) {
      logWarn("GPU Lymph Tempo attach failed (EVO)");
    }

    // World-ready phase
    [100, 200, 500].forEach((delay) => {
      setTimeout(async () => {
        try {
          if (PulseRealm.PulseSignals) {
            PulseRealm.__PULSE_LAST_SIGNAL__ = PulseRealm.PulsePort.Global.signal;
            EvoPulseStore.set("last", PulseRealm.__PULSE_LAST_SIGNAL__);
            updateUI();
            logOK(`World‑Ready (${delay}ms, EVO): PulsePort.Global signal applied`);
          }
        } catch {}
      }, delay);
    });

    // Core systems boot
    try {
      PulseRealm.PulseBand.emit("request", {
        type: "start",
        band: PulseRealm.ONE_BAND.id,
        mode: "one-band",
        internetOptional: true
      });

      PulseRealm.PulseBand.on("signal", async (p) => {
        PulseRealm.__PULSE_LAST_SIGNAL__ = p.state || p;
        EvoPulseStore.set("last", PulseRealm.__PULSE_LAST_SIGNAL__);
        updateUI();
      });

      PulseRealm.BinaryOS.boot({
        band: PulseRealm.ONE_BAND.id,
        internetOptional: true
      });
      PulseRealm.DualBandAI.boot({
        canonicalBand: PulseRealm.ONE_BAND.id,
        internetOptional: true
      });

      logOK("Core systems booted (EVO, ONE-BAND)");
    } catch (err) {
      logErr("Core boot failed (EVO)", err);
    }

    logOK("EVO PAGE v30.9 DOM INIT COMPLETE");

    PulseRealm.__PULSE_EVO_CLEANUP__ = () => {
      clearInterval(uiInterval);
      logID("PULSE-EVO cleanup invoked");
    };
  });

