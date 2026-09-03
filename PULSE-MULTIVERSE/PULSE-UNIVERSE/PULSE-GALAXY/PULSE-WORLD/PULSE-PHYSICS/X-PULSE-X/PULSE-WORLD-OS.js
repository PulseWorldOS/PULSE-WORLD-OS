#!/usr/bin/env node
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

import { AI_EXPERIENCE_META_PulsePresenceNormalizerV32 } from "../../../../PULSE-UNIVERSAL-TOUCH/PULSE-UNIVERSAL-TOUCH-MYPULSECHUNKS";
import { PulseWorldDevice as os,PulseWorldDevice } from "./PULSE-WORLD-OS-DEVICE";
import { PulseWorldPath, fs,path } from "../../PULSE-WORLD-PATH.js";
/**
 * =============================================================================
 *  PULSE-WORLD-OS CONTINUANCE DAEMON — v30-IMMORTAL-WORLD-OS-PAL-PROXY-BINARY-ONEBAND
 *  File: PULSE-WORLD-OS.js  (server-side / device-side organism runtime)
 *
 *  v30++ ONE-BAND UPGRADE:
 *    • Single “oneBand” field across GPU / PROXY / EARN / MEMORY / ROUTE / WORLD / PAL.
 *    • Every organ gets a unified oneBandMode + oneBandScore + oneBandSignature.
 *    • World-OS snapshot exposes oneBand summary for dashboards + binary substrate.
 *    • All previous behavior preserved, only strictly additive + deterministic.
 * =============================================================================
 */



"use strict";


/* =============================================================================
 *  META
 * ============================================================================= */
const EXPORT_META = {
  version: "v30-IMMORTAL-WORLD-OS-PAL-PROXY-BINARY-ONEBAND",
  cli: {
    flags: [
      "--root <dir>           Root directory to scan for PULSE* organs",
      "--interval <ms>        Tick interval (default 5000)",
      "--json                 Output JSON snapshot instead of TUI",
      "--once                 Run a single tick and exit",
      "--quiet                Suppress TUI output",
      "--no-color             Disable ANSI colors",
      "--snapshot-file <path> Write last snapshot to file",
      "--oneband              Force ONE-BAND mode for all organs"
    ]
  }
};

const AI_EXPERIENCE_META = {
  layer: "PulseWorldOSDaemon",
  version: "v30-IMMORTAL++-ONEBAND",
  binaryAware: true,
  gpuLymphAware: true,
  palAware: true,
  proxyAware: true,
  worldOSAware: true,
  oneBandAware: true
};

/* =============================================================================
 *  COLORS + ICONS
 * ============================================================================= */
let COLORS = {
  reset:  "\x1b[0m",
  bold:   "\x1b[1m",
  dim:    "\x1b[2m",
  red:    "\x1b[31m",
  green:  "\x1b[32m",
  yellow: "\x1b[33m",
  blue:   "\x1b[34m",
  magenta:"\x1b[35m",
  cyan:   "\x1b[36m",
  gray:   "\x1b[90m"
};

const ICONS = {
  band:   "📶",
  gpu:    "🎮",
  send:   "📡",
  grid:   "🧮",
  earn:   "💰",
  cache:  "📦",
  route:  "🛰️",
  vitals: "❤️",
  ok:     "✅",
  warn:   "⚠️",
  err:    "❌",
  heat:   "🔥",
  cold:   "❄️",
  chunk:  "📦",
  bolt:   "⚡",
  evo:    "🧬",
  boot:   "🚀",
  world:  "🌍",
  os:     "🖥️",
  proxy:  "🧩",
  binary: "🔢",
  upgrade:"⬆️",
  pal:    "🧑‍🤝‍🧑",
  oneband:"🧲"
};

/* =============================================================================
 *  CLI PARSING
 * ============================================================================= */
function parseCliArgs(argv) {
  const args = argv.slice(2);
  const config = {
    rootDir: __dirname,
    tickMs: 5000,
    json: false,
    once: false,
    quiet: false,
    noColor: false,
    snapshotFile: null,
    oneBand: false
  };

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--root" && args[i + 1]) {
      config.rootDir = path.resolve(args[++i]);
    } else if (a === "--interval" && args[i + 1]) {
      const v = parseInt(args[++i], 10);
      if (Number.isFinite(v) && v > 0) config.tickMs = v;
    } else if (a === "--json") {
      config.json = true;
    } else if (a === "--once") {
      config.once = true;
    } else if (a === "--quiet") {
      config.quiet = true;
    } else if (a === "--no-color") {
      config.noColor = true;
    } else if (a === "--snapshot-file" && args[i + 1]) {
      config.snapshotFile = path.resolve(args[++i]);
    } else if (a === "--oneband") {
      config.oneBand = true;
    } else if (a === "--help" || a === "-h") {
      printHelpAndExit();
    }
  }

  if (config.noColor) {
    COLORS = Object.fromEntries(Object.keys(COLORS).map(k => [k, ""]));
  }

  return config;
}

function printHelpAndExit() {
  console.log("PulseWorld-OS Continuance Daemon — v30-IMMORTAL-WORLD-OS-PAL-PROXY-BINARY-ONEBAND");
  console.log("");
  console.log("Usage:");
  console.log("  node PULSE-WORLD-OS.js [options]");
  console.log("");
  console.log("Options:");
  for (const line of EXPORT_META.cli.flags) {
    console.log("  " + line);
  }
  console.log("");
  process.exit(0);
}

/* =============================================================================
 *  CONFIGURATION
 * ============================================================================= */
const CLI_CONFIG = parseCliArgs(process.argv);

const CONFIG = {
  tickMs: CLI_CONFIG.tickMs,
  rootDir: CLI_CONFIG.rootDir,
  oneBand: CLI_CONFIG.oneBand,
  thresholds: {
    cpuWarm: 40,
    cpuHot:  75,
    memWarm: 50,
    memHot:  80
  },
  patterns: {
    organPrefix: /^PULSE/i
  },
  bootPatterns: {
    world: /WORLD/i,
    os: /OS/i,
    route: /ROUTE|NET|WORLDROUTE/i,
    boot: /BOOT|LOADER|START/i
  },
  pictures: {
    folder: "_PICTURES",
    palPrefix: /^PulsePal/i,
    extensions: /.(\(png|jpg|jpeg|gif|webp|svg)$/i
  },
  backgrounds: {
    folder: "_BACKGROUNDS",
    palPrefix: /^PulsePal/i,
    extensions: /.(\(png|jpg|jpeg|gif|webp|svg)$/i
  },
  proxyPatterns: {
    proxy: /PROXY/i,
    binary: /BINARY/i,
    organism: /ORGANISM/i
  },
  palPatterns: {
    pal: /PAL/i,
    world: /PALWORLD|WORLDPAL/i,
    media: /MEDIA|PIC|IMAGE|PHOTO|AVATAR|SKIN/i
  },
  upgradePatterns: {
    immortal: /IMMORTAL/i,
    evo: /EVO/i,
    max: /MAX/i,
    aba: /ABA/i,
    upgrade: /UPGRADE|UPGRADED|UPGRADING/i
  },
  output: {
    json: CLI_CONFIG.json,
    once: CLI_CONFIG.once,
    quiet: CLI_CONFIG.quiet,
    snapshotFile: CLI_CONFIG.snapshotFile
  }
};

/* =============================================================================
 *  PROCESS SNAPSHOT
 * ============================================================================= */
function clamp(v, min, max) {
  return v < min ? min : v > max ? max : v;
}

function getProcessSnapshot() {
  const mem = process.memoryUsage();
  const rssMb = mem.rss / 1024 / 1024;
  const heapMb = mem.heapUsed / 1024 / 1024;
  const heapTotalMb = mem.heapTotal / 1024 / 1024;

  const load = os.loadavg()[0] || 0;
  const cores = os.cpus().length || 1;
  const cpuApprox = clamp((load / cores) * 100, 0, 100);

  return {
    rssMb,
    heapMb,
    heapTotalMb,
    cpuApprox: Math.round(cpuApprox),
    timestamp: new Date().toISOString(),
    host: os.hostname(),
    platform: process.platform,
    pid: process.pid
  };
}

/* =============================================================================
 *  ONE-BAND HELPERS
 * ============================================================================= */
function computeOneBandSignature(organ) {
  const seed = JSON.stringify({
    id: organ.id,
    type: organ.type,
    bootRole: organ.bootRole,
    routeRole: organ.routeRole,
    proxyRole: organ.proxyRole,
    binaryRole: organ.binaryRole,
    organismRole: organ.organismRole,
    palRole: organ.palRole,
    advantageTier: organ.advantageTier,
    advantageScore: organ.advantageScore,
    throughputClass: organ.throughputClass,
    throughputScore: organ.throughputScore,
    substrateLaneId: organ.substrateLaneId,
    substratePhaseIndex: organ.substratePhaseIndex,
    worldWaveIndex: organ.worldWaveIndex
  });

  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return "ONEBAND-" + h.toString(16).padStart(8, "0");
}

function computeOneBandScore(organ) {
  let score = 0;

  if (organ.type === "gpu") score += 15;
  if (organ.type === "earn") score += 15;
  if (organ.type === "cache") score += 10;
  if (organ.type === "route") score += 10;
  if (organ.proxyRole || organ.binaryRole || organ.organismRole) score += 20;
  if (organ.palRole) score += 10;

  score += (organ.advantageTier || 0) * 5;
  score += (organ.advantageScore || 0) * 10;
  score += (organ.throughputScore || 0) * 5;

  if (organ.substrateLaneId != null) score += 5;
  if (organ.substratePhaseIndex != null) score += 5;
  if (organ.worldWaveIndex != null) score += 5;

  return clamp(score, 0, 100);
}

/* =============================================================================
 *  ORGAN CLASS — v31 ONE-BAND + DEVICE
 * ============================================================================= */
export const PulseOrgan = {
  id: null,
  instanceId: 1,

  type: null,
  icon: null,
  color: null,

  lastRun: null,
  status: "idle",

  cpu: 0,
  mem: 0,

  advantage: 1.0,
  advantageTier: 0,
  advantageScore: 0,

  prewarmed: false,
  prechunked: false,

  continuanceScore: 0,

  bootRole: null,
  routeRole: null,

  proxyRole: null,
  binaryRole: null,
  organismRole: null,

  palRole: null,
  palTier: null,
  palContinuanceScore: 0,

  upgradeHints: null,

  proxyModeHint: null,
  proxyTier: null,
  proxyContinuanceScore: 0,

  substrateLaneId: null,
  substratePhaseIndex: null,
  worldWaveIndex: null,

  throughputClass: "throughput_low",
  throughputScore: 0,

  oneBandMode: CONFIG.oneBand ? "forced" : "auto",
  oneBandScore: 0,
  oneBandSignature: null,

  // ===========================================================
  // DEVICE LAYER
  // ===========================================================

  deviceAware: true,

  deviceMode: "off",
  deviceActive: false,

  deviceHeartbeat: null,

  devicePresenceTier: "offline",

  deviceContinuanceScore: 0,

  deviceAdvantageBonus: 0,
  deviceThroughputBonus: 0,

  meta: {
    type: null,

    bootRole: null,
    routeRole: null,

    proxyRole: null,
    binaryRole: null,
    organismRole: null,

    palRole: null,

    upgradeHints: null,

    proxyModeHint: null,
    proxyTier: null,
    palTier: null,

    oneBandMode:
      CONFIG.oneBand ? "forced" : "auto",

    evo: {
      prewarmAware: false,
      prechunkAware: false,
      advantageAware: false,

      worldOSAware: false,

      proxyAware: false,
      palAware: false,

      binarySubstrateAware: false,

      cacheAware: false,
      gpuAware: false,

      throughputAware: false,

      substrateLaneAware: false,
      substratePhaseAware: false,

      oneBandAware: true,

      // DEVICE EVO
      deviceAware: true,
      heartbeatAware: true,
      presenceAware: true
    }
  },

  // ---------------------------------------------------------------------------
  // INIT (replaces constructor)
  // ---------------------------------------------------------------------------

  init(folderName, instanceId = 1) {

    this.id = folderName;
    this.instanceId = instanceId;

    this.type =
      this.inferType(folderName);

    this.icon =
      this.resolveIcon(this.type);

    this.color =
      this.resolveColor(this.type);

    this.bootRole =
      this.inferBootRole(folderName);

    this.routeRole =
      this.inferRouteRole(folderName);

    this.proxyRole =
      this.inferProxyRole(folderName);

    this.binaryRole =
      this.inferBinaryRole(folderName);

    this.organismRole =
      this.inferOrganismRole(folderName);

    this.palRole =
      this.inferPalRole(folderName);

    this.upgradeHints =
      this.inferUpgradeHints(folderName);

    this.proxyModeHint =
      this.computeProxyModeHint();

    this.proxyTier =
      this.computeProxyTier();

    this.palTier =
      this.computePalTier();

    this.meta.type = this.type;

    this.meta.bootRole =
      this.bootRole;

    this.meta.routeRole =
      this.routeRole;

    this.meta.proxyRole =
      this.proxyRole;

    this.meta.binaryRole =
      this.binaryRole;

    this.meta.organismRole =
      this.organismRole;

    this.meta.palRole =
      this.palRole;

    this.meta.upgradeHints =
      this.upgradeHints;

    this.meta.proxyModeHint =
      this.proxyModeHint;

    this.meta.proxyTier =
      this.proxyTier;

    this.meta.palTier =
      this.palTier;

    this.meta.oneBandMode =
      this.oneBandMode;

    this.meta.evo.worldOSAware =
      !!this.bootRole ||
      !!this.routeRole;

    this.meta.evo.proxyAware =
      !!this.proxyRole ||
      !!this.binaryRole ||
      !!this.organismRole;

    this.meta.evo.palAware =
      !!this.palRole;

    this.meta.evo.binarySubstrateAware =
      !!this.binaryRole;

    this.meta.evo.cacheAware =
      this.type === "cache";

    this.meta.evo.gpuAware =
      this.type === "gpu";

    // =====================================================
    // DEVICE INIT
    // =====================================================

    try {

      this.deviceMode =
        PulseWorldDevice.getDeviceMode();

      this.deviceActive =
        this.deviceMode === "on";

    } catch {

      this.deviceMode = "off";
      this.deviceActive = false;
    }

    return this;
  },

  // ---------------------------------------------------------------------------
  // DEVICE REFRESH
  // ---------------------------------------------------------------------------

  refreshDeviceState() {

    try {

      this.deviceMode =
        PulseWorldDevice.getDeviceMode();

      this.deviceActive =
        this.deviceMode === "on";

    } catch {

      this.deviceMode = "off";
      this.deviceActive = false;
    }

    if (
      typeof window !== "undefined" &&
      window.PulseWorldDaemon
    ) {

      this.deviceHeartbeat =
        window.PulseWorldDaemon
          .lastHeartbeat;
    }

    if (
      this.deviceHeartbeat?.deviceActive
    ) {

      this.devicePresenceTier =
        "heartbeat";

    } else if (
      this.deviceActive
    ) {

      this.devicePresenceTier =
        "connected";

    } else {

      this.devicePresenceTier =
        "offline";
    }
  },

  // ---------------------------------------------------------------------------
  // TYPE + ROLE INFERENCE
  // ---------------------------------------------------------------------------

  inferType(name) {

    const n = name.toUpperCase();

    if (n.includes("GPU"))
      return "gpu";

    if (n.includes("SEND"))
      return "send";

    if (n.includes("ROUTE"))
      return "route";

    if (n.includes("EARN"))
      return "earn";

    if (n.includes("CACHE"))
      return "cache";

    if (n.includes("GRID"))
      return "grid";

    return "generic";
  },

  inferBootRole(name) {

    const n = name.toUpperCase();

    if (CONFIG.bootPatterns.world.test(n))
      return "world";

    if (CONFIG.bootPatterns.os.test(n))
      return "os";

    if (CONFIG.bootPatterns.boot.test(n))
      return "boot";

    return null;
  },

  inferRouteRole(name) {

    const n = name.toUpperCase();

    if (CONFIG.bootPatterns.route.test(n))
      return "route";

    return null;
  },

  inferProxyRole(name) {

    const n = name.toUpperCase();

    if (CONFIG.proxyPatterns.proxy.test(n))
      return "proxy";

    return null;
  },

  inferBinaryRole(name) {

    const n = name.toUpperCase();

    if (CONFIG.proxyPatterns.binary.test(n))
      return "binary";

    return null;
  },

  inferOrganismRole(name) {

    const n = name.toUpperCase();

    if (CONFIG.proxyPatterns.organism.test(n))
      return "organism";

    return null;
  },

  inferPalRole(name) {

    const n = name.toUpperCase();

    if (
      !CONFIG.palPatterns.pal.test(n)
    ) {
      return null;
    }

    if (
      CONFIG.palPatterns.world.test(n)
    ) {
      return "pal-world";
    }

    if (
      CONFIG.palPatterns.media.test(n)
    ) {
      return "pal-media";
    }

    return "pal-core";
  },

  inferUpgradeHints(name) {

    const n = name.toUpperCase();

    return {
      immortal:
        CONFIG.upgradePatterns
          .immortal
          .test(n),

      evo:
        CONFIG.upgradePatterns
          .evo
          .test(n),

      max:
        CONFIG.upgradePatterns
          .max
          .test(n),

      aba:
        CONFIG.upgradePatterns
          .aba
          .test(n)
    };
  },

  computeProxyModeHint() {

    if (
      this.proxyRole &&
      this.binaryRole &&
      this.organismRole
    ) {
      return "dual-band-organism";
    }

    if (
      this.proxyRole &&
      this.binaryRole
    ) {
      return "binary-proxy-bridge";
    }

    if (this.proxyRole) {
      return "proxy-only";
    }

    return null;
  },

  computeProxyTier() {

    if (this.upgradeHints.aba)
      return "immortal-max-aba";

    if (this.upgradeHints.max)
      return "immortal-max";

    if (this.upgradeHints.evo)
      return "immortal-evo";

    if (this.upgradeHints.immortal)
      return "immortal";

    return "normal";
  },

  computePalTier() {

    if (this.upgradeHints.aba)
      return "immortal-max-aba";

    if (this.upgradeHints.max)
      return "immortal-max";

    if (this.upgradeHints.evo)
      return "immortal-evo";

    if (this.upgradeHints.immortal)
      return "immortal";

    return "normal";
  },

  resolveIcon(type) {

    switch (type) {

      case "gpu":
        return ICONS.gpu;

      case "send":
        return ICONS.send;

      case "route":
        return ICONS.route;

      case "earn":
        return ICONS.earn;

      case "cache":
        return ICONS.cache;

      case "grid":
        return ICONS.grid;

      default:
        return ICONS.band;
    }
  },

  resolveColor(type) {

    switch (type) {

      case "gpu":
        return COLORS.magenta;

      case "send":
        return COLORS.cyan;

      case "route":
        return COLORS.blue;

      case "earn":
        return COLORS.yellow;

      case "cache":
        return COLORS.green;

      case "grid":
        return COLORS.gray;

      default:
        return COLORS.reset;
    }
  },
  // ---------------------------------------------------------------------------
  // TICK — FULL EVOLUTIONARY UPDATE + DEVICE LAYER
  // ---------------------------------------------------------------------------
  async tick(globalSnapshot, worldBinaryView = null) {

    this.lastRun = new Date();

    this.refreshDeviceState();

    const baseCpu =
      globalSnapshot.cpuApprox || 0;

    const coordinatorCpu =
      Math.round(baseCpu * 0.15);

    const baseMemPct =
      globalSnapshot &&
      globalSnapshot.heapTotalMb > 0
        ? (
            globalSnapshot.heapMb /
            globalSnapshot.heapTotalMb
          ) * 100
        : 0;

    const memField =
      clamp(baseMemPct * 0.5, 0, 100);

    switch (this.type) {

      case "gpu":
        this.cpu =
          clamp(coordinatorCpu + 5, 0, 100);

        this.mem =
          clamp(memField + 10, 0, 100);
        break;

      case "cache":
        this.cpu =
          clamp(coordinatorCpu + 2, 0, 100);

        this.mem =
          clamp(memField + 15, 0, 100);
        break;

      case "earn":
      case "grid":

        this.cpu =
          clamp(coordinatorCpu + 3, 0, 100);

        this.mem =
          clamp(memField + 5, 0, 100);
        break;

      case "send":
      case "route":

        this.cpu =
          clamp(coordinatorCpu + 1, 0, 100);

        this.mem =
          clamp(memField + 2, 0, 100);
        break;

      default:

        this.cpu = coordinatorCpu;
        this.mem = memField;
        break;
    }

    const hint =
      worldBinaryView?.organs?.[this.id] ||
      worldBinaryView?.byId?.[this.id] ||
      null;

    if (hint) {

      this.advantageTier =
        hint.advantageTier ??
        this.advantageTier;

      this.advantageScore =
        hint.advantageScore ??
        this.advantageScore;

      this.throughputClass =
        hint.throughputClass ||
        this.throughputClass;

      this.throughputScore =
        hint.throughputScore ??
        this.throughputScore;

      this.substrateLaneId =
        hint.substrateLaneId ??
        this.substrateLaneId;

      this.substratePhaseIndex =
        hint.substratePhaseIndex ??
        this.substratePhaseIndex;

      this.worldWaveIndex =
        hint.worldWaveIndex ??
        this.worldWaveIndex;

      this.prewarmed =
        hint.prewarmed || this.prewarmed;

      this.prechunked =
        hint.prechunked || this.prechunked;

      this.meta.evo.prewarmAware =
        this.meta.evo.prewarmAware ||
        this.prewarmed;

      this.meta.evo.prechunkAware =
        this.meta.evo.prechunkAware ||
        this.prechunked;

      this.meta.evo.advantageAware = true;
      this.meta.evo.throughputAware = true;

      this.meta.evo.substrateLaneAware =
        this.meta.evo.substrateLaneAware ||
        !!this.substrateLaneId;

      this.meta.evo.substratePhaseAware =
        this.meta.evo.substratePhaseAware ||
        !!this.substratePhaseIndex;
    }

    // =========================================================
    // DEVICE ADVANTAGE ENGINE
    // =========================================================

    this.deviceAdvantageBonus = 0;
    this.deviceThroughputBonus = 0;

    if (this.deviceActive) {
      this.deviceAdvantageBonus += 0.15;
      this.deviceThroughputBonus += 5;
    }

    if (this.deviceHeartbeat?.deviceActive) {
      this.deviceAdvantageBonus += 0.25;
      this.deviceThroughputBonus += 10;
    }

    if (
      this.type === "gpu" &&
      this.deviceActive
    ) {
      this.deviceAdvantageBonus += 0.30;
    }

    if (
      this.proxyRole &&
      this.deviceActive
    ) {
      this.deviceAdvantageBonus += 0.20;
    }

    if (
      this.binaryRole &&
      this.deviceActive
    ) {
      this.deviceAdvantageBonus += 0.15;
    }

    if (
      this.palRole &&
      this.deviceHeartbeat?.deviceActive
    ) {
      this.deviceAdvantageBonus += 0.40;
    }

    const tierBoost =
      (this.advantageTier || 0) * 0.25;

    const scoreBoost =
      this.advantageScore || 0;

    this.advantage =
      1.0 +
      tierBoost +
      scoreBoost +
      this.deviceAdvantageBonus;

    this.throughputScore =
      clamp(
        this.throughputScore +
        (this.deviceThroughputBonus / 100),
        0,
        1
      );

    this.status =
      this.cpu >= CONFIG.thresholds.cpuHot
        ? "hot"
        : this.cpu >= CONFIG.thresholds.cpuWarm
          ? "warm"
          : "running";

    let cont = 0;

    if (this.prewarmed) cont += 20;
    if (this.prechunked) cont += 20;
    if (this.advantageTier >= 1) cont += 20;

    cont +=
      (this.advantageScore || 0) * 20;

    cont +=
      (this.throughputScore || 0) * 20;

    if (this.substrateLaneId !== null)
      cont += 10;

    if (this.substratePhaseIndex !== null)
      cont += 10;

    if (this.worldWaveIndex !== null)
      cont += 10;

    this.continuanceScore =
      clamp(cont, 0, 100);

    // =========================================================
    // DEVICE CONTINUITY
    // =========================================================

    let deviceCont = 0;

    if (this.deviceActive)
      deviceCont += 20;

    if (
      this.deviceHeartbeat?.deviceActive
    ) {
      deviceCont += 20;
    }

    if (
      this.devicePresenceTier ===
      "heartbeat"
    ) {
      deviceCont += 20;
    }

    this.deviceContinuanceScore =
      clamp(deviceCont, 0, 100);

    this.continuanceScore =
      clamp(
        this.continuanceScore +
        (this.deviceContinuanceScore * 0.25),
        0,
        100
      );

    let proxyScore =
      this.continuanceScore * 0.6;

    if (this.proxyRole) proxyScore += 20;
    if (this.binaryRole) proxyScore += 20;
    if (this.organismRole) proxyScore += 20;

    if (
      this.proxyRole &&
      this.deviceActive
    ) {
      proxyScore += 20;
    }

    this.proxyContinuanceScore =
      clamp(proxyScore, 0, 100);

    let palScore =
      this.continuanceScore * 0.7;

    if (this.palRole)
      palScore += 30;

    if (
      this.palRole === "pal-media"
    ) {
      palScore += 20;
    }

    if (
      this.palRole === "pal-world"
    ) {
      palScore += 10;
    }

    if (
      this.palRole &&
      this.deviceHeartbeat?.deviceActive
    ) {
      palScore += 20;
    }

    this.palContinuanceScore =
      clamp(palScore, 0, 100);

    this.oneBandScore =
      computeOneBandScore(this);

    this.oneBandSignature =
      computeOneBandSignature(this);
  },

  // ---------------------------------------------------------------------------
  // RENDER LINE
  // ---------------------------------------------------------------------------
  renderLine() {

    const c = COLORS;

    const cpuColor =
      this.cpu >= CONFIG.thresholds.cpuHot
        ? c.red
        : this.cpu >= CONFIG.thresholds.cpuWarm
          ? c.yellow
          : c.green;

    const memColor =
      this.mem >= CONFIG.thresholds.memHot
        ? c.red
        : this.mem >= CONFIG.thresholds.memWarm
          ? c.yellow
          : c.green;

    const statusIcon =
      this.status === "hot"
        ? ICONS.heat
        : this.status === "warm"
          ? ICONS.warn
          : ICONS.ok;

    const evoIcon =
      this.meta.evo.prewarmAware ||
      this.meta.evo.prechunkAware ||
      this.meta.evo.advantageAware
        ? ICONS.evo
        : "";

    const deviceBadge =
      this.devicePresenceTier === "heartbeat"
        ? "📱💓"
        : this.devicePresenceTier === "connected"
          ? "📱"
          : "";

    const bootBadge =
      this.bootRole === "boot"
        ? ICONS.boot
        : this.bootRole === "os"
          ? ICONS.os
          : this.bootRole === "world"
            ? ICONS.world
            : "";

    const routeBadge =
      this.routeRole === "route"
        ? ICONS.route
        : "";

    const proxyBadge =
      this.proxyRole ||
      this.binaryRole ||
      this.organismRole
        ? ICONS.proxy
        : "";

    const palBadge =
      this.palRole
        ? ICONS.pal
        : "";

    const upgradeBadge =
      this.upgradeHints.immortal ||
      this.upgradeHints.evo ||
      this.upgradeHints.max ||
      this.upgradeHints.aba
        ? ICONS.upgrade
        : "";

    const laneBadge =
      this.substrateLaneId !== null
        ? `${ICONS.grid}${this.substrateLaneId}`
        : "";

    const phaseBadge =
      this.substratePhaseIndex !== null
        ? `${ICONS.send}${this.substratePhaseIndex}`
        : "";

    const waveBadge =
      this.worldWaveIndex !== null
        ? `${ICONS.world}${this.worldWaveIndex}`
        : "";

    const throughputBadge =
      this.throughputClass === "throughput_ultra"
        ? `${ICONS.bolt}ULTRA`
        : this.throughputClass === "throughput_high"
          ? `${ICONS.bolt}HIGH`
          : this.throughputClass === "throughput_medium"
            ? `${ICONS.bolt}MED`
            : "LOW";

    const oneBandBadge =
      `${ICONS.oneband}${this.oneBandScore.toFixed(0)}`;

    return [

      `${this.color}${this.icon}${COLORS.reset} ${c.bold}${this.id}${c.reset} ${statusIcon}${evoIcon}${deviceBadge}${bootBadge}${routeBadge}${proxyBadge}${palBadge}${upgradeBadge}`,

      `CPU: ${cpuColor}${this.cpu.toFixed(0)}%${c.reset}`,

      `MEM: ${memColor}${this.mem.toFixed(0)}%${c.reset}`,

      `ADV: ${c.cyan}${this.advantage.toFixed(2)}×${c.reset}`,

      `DEVICE: ${this.devicePresenceTier.toUpperCase()}`,

      `LANE: ${laneBadge}`,

      `PHASE: ${phaseBadge}`,

      `WAVE: ${waveBadge}`,

      `THR: ${throughputBadge}`,

      `ONEBAND: ${oneBandBadge}`,

      `CONT: ${this.continuanceScore.toFixed(0)}`,

      `D-CONT: ${this.deviceContinuanceScore.toFixed(0)}`,

      `P-CONT: ${this.proxyContinuanceScore.toFixed(0)}`,

      this.palRole
        ? `PAL-CONT: ${this.palContinuanceScore.toFixed(0)}`
        : ""

    ]
      .filter(Boolean)
      .join("  |  ");
  },

  // ---------------------------------------------------------------------------
  // SNAPSHOT
  // ---------------------------------------------------------------------------
  toSnapshot() {

    return {

      id: this.id,
      type: this.type,

      status: this.status,

      cpu: this.cpu,
      mem: this.mem,

      advantage: this.advantage,
      advantageTier: this.advantageTier,
      advantageScore: this.advantageScore,

      deviceMode: this.deviceMode,
      deviceActive: this.deviceActive,

      devicePresenceTier:
        this.devicePresenceTier,

      deviceContinuanceScore:
        this.deviceContinuanceScore,

      deviceAdvantageBonus:
        this.deviceAdvantageBonus,

      deviceThroughputBonus:
        this.deviceThroughputBonus,

      deviceHeartbeat:
        this.deviceHeartbeat,

      prewarmed: this.prewarmed,
      prechunked: this.prechunked,

      continuanceScore:
        this.continuanceScore,

      bootRole: this.bootRole,
      routeRole: this.routeRole,

      proxyRole: this.proxyRole,
      binaryRole: this.binaryRole,
      organismRole: this.organismRole,

      palRole: this.palRole,
      palTier: this.palTier,

      palContinuanceScore:
        this.palContinuanceScore,

      proxyModeHint:
        this.proxyModeHint,

      proxyTier:
        this.proxyTier,

      proxyContinuanceScore:
        this.proxyContinuanceScore,

      substrateLaneId:
        this.substrateLaneId,

      substratePhaseIndex:
        this.substratePhaseIndex,

      worldWaveIndex:
        this.worldWaveIndex,

      throughputClass:
        this.throughputClass,

      throughputScore:
        this.throughputScore,

      oneBandMode:
        this.oneBandMode,

      oneBandScore:
        this.oneBandScore,

      oneBandSignature:
        this.oneBandSignature,

      meta: this.meta
    };
  }
};

/* =============================================================================
 *  MEDIA RESOLVER
 * ============================================================================= */
export const PulseMediaResolver = {

  rootDir: null,
  cache: [],
  lastScanAt: null,

  deviceMode: "off",

  meta: {
    version: "v30-IMMORTAL-DEVICE",
    cacheAware: true,
    prewarmAware: true,
    prechunkAware: true,
    substrateSafe: true,
    deviceAware: true
  },

  init(rootDir) {

    this.rootDir = rootDir;
    this.cache = [];
    this.lastScanAt = null;

    try {
      this.deviceMode =
        PulseWorldDevice.getDeviceMode();
    } catch {
      this.deviceMode = "off";
    }

    return this;
  },

  scan() {

    try {
      this.deviceMode =
        PulseWorldDevice.getDeviceMode();
    } catch {}

    const folder =
      path.join(
        this.rootDir,
        CONFIG.pictures.folder
      );

    let files = [];

    try {

      files =
        fs.readdirSync(
          folder,
          { withFileTypes: true }
        )
        .filter(f => f.isFile())
        .map(f => f.name);

    } catch {

      this.cache = [];
      this.lastScanAt =
        new Date().toISOString();

      return;
    }

    this.cache = files
      .filter(
        f =>
          CONFIG.pictures.palPrefix.test(f) &&
          CONFIG.pictures.extensions.test(f)
      )
      .map(
        f =>
          path.join(
            CONFIG.pictures.folder,
            f
          )
      );

    this.lastScanAt =
      new Date().toISOString();
  },

  resolveAll(prefix = "PulsePal") {

    let results =
      this.cache.filter(
        f => f.includes(prefix)
      );

    if (this.deviceMode === "on") {

      results = [
        ...results.filter(
          f =>
            f.includes("Device") ||
            f.includes("Mobile")
        ),
        ...results.filter(
          f =>
            !f.includes("Device") &&
            !f.includes("Mobile")
        )
      ];
    }

    return results;
  }
};


/* =============================================================================
 *  PAL HISTORY SCANNER HOOK
 * ============================================================================= */
export const PulsePalHistoryScannerHook = {

  rootDir: null,
  scanner: null,

  deviceMode: "off",
  lastHeartbeat: null,

  meta: {
    version: "v30-IMMORTAL-DEVICE",
    continuityAware: true,
    substrateSafe: true,
    zeroChurn: true,
    deviceAware: true
  },

  init(rootDir) {

    this.rootDir = rootDir;
    this.scanner = null;

    try {

      this.deviceMode =
        PulseWorldDevice.getDeviceMode();

    } catch {

      this.deviceMode = "off";
    }

    try {

      const modPath =
        path.join(
          rootDir,
          "PULSE-PAL",
          "PulsePalHistoryScanner-v30.js"
        );

      if (fs.existsSync(modPath)) {
        this.scanner =
          require(modPath);
      }

    } catch {

      this.scanner = null;
    }

    return this;
  },

  async scan() {

    try {
      this.deviceMode =
        PulseWorldDevice.getDeviceMode();
    } catch {}

    if (
      typeof window !== "undefined" &&
      window.PulseWorldDaemon
    ) {

      this.lastHeartbeat =
        window.PulseWorldDaemon.lastHeartbeat;
    }

    if (
      this.scanner &&
      typeof this.scanner.scan === "function"
    ) {

      try {

        const result =
          await this.scanner.scan();

        return {

          ...result,

          version:
            "v30-IMMORTAL-DEVICE",

          deviceMode:
            this.deviceMode,

          deviceHeartbeat:
            this.lastHeartbeat,

          lastScanAt:
            new Date().toISOString()
        };

      } catch {}
    }

    const history = {

      version:
        "v30-IMMORTAL-DEVICE",

      messagesScanned: 0,

      lastScanAt:
        new Date().toISOString(),

      sources: [],

      continuityScore: 0,

      deviceMode:
        this.deviceMode,

      deviceHeartbeat:
        this.lastHeartbeat
    };

    const palLogDir =
      path.join(
        this.rootDir,
        "PULSE-PAL",
        "logs"
      );

    try {

      const files =
        fs.readdirSync(
          palLogDir,
          { withFileTypes: true }
        )
        .filter(f => f.isFile())
        .map(f => f.name);

      history.sources.push(
        palLogDir
      );

      history.messagesScanned =
        files.length;

      history.continuityScore =
        Math.min(
          100,
          files.length * 2
        );

    } catch {
      // no logs
    }

    //
    // DEVICE BONUS
    //

    if (
      this.deviceMode === "on"
    ) {
      history.continuityScore += 10;
    }

    if (
      this.lastHeartbeat?.deviceActive
    ) {
      history.continuityScore += 15;
    }

    history.continuityScore =
      Math.min(
        100,
        history.continuityScore
      );

    return history;
  }
};

export const PulseBandDaemon = {

  organs: [],
  tickCount: 0,
  timer: null,
  lastSnapshot: null,
  media: null,

  // ============================================================
  // DEVICE LAYER
  // ============================================================

  deviceLayer: null,
  deviceMode: "off",
  lastHeartbeat: null,

  bootMap: {
    world: [],
    os: [],
    boot: [],
    route: [],
    other: []
  },

  proxySummary: {
    proxyCount: 0,
    binaryCount: 0,
    organismCount: 0,
    dualBandCount: 0,
    immortalProxyCount: 0,
    avgProxyContinuance: 0
  },

  palSummary: {
    palCount: 0,
    palWorldCount: 0,
    palMediaCount: 0,
    palCoreCount: 0,
    immortalPalCount: 0,
    avgPalContinuance: 0,
    palMediaFilesCount: 0,
    palMediaFiles: []
  },

  palHistory: {
    messagesScanned: 0,
    lastScanAt: null,
    sources: [],
    continuityScore: 0
  },

  palPersona: {
    persona: null,
    tone: null,
    behavior: null,
    continuity: null,
    identity: null,
    lastComputeAt: null
  },

  palHelperSuggestions: {
    priority: "normal",
    notes: [],
    actions: []
  },

  binarySubstrateSummary: {
    frameCount: 0,
    lastTag: null,
    lastBand: null,
    avgAdvantageTier: 0,
    avgAdvantageScore: 0,
    throughputClass: "throughput_low",
    avgThroughputScore: 0
  },

  gpuLymphSummary: {
    version: "v30-IMMORTAL++",
    lastStatus: null,
    lastActionsCount: 0,
    lastAdvantageSnapshot: null,
    lastEarnProfile: null,
    lastPresence: null
  },

  oneBandSummary: {
    avgOneBandScore: 0,
    maxOneBandScore: 0,
    minOneBandScore: 0,
    oneBandOrganCount: 0
  },

  worldBinaryView: null,
  palHistoryScanner: null,

  init() {

    this.organs = [];
    this.tickCount = 0;
    this.timer = null;
    this.lastSnapshot = null;

    this.media =
      Object.create(PulseMediaResolver)
        .init(CONFIG.rootDir);

    this.palHistoryScanner =
      Object.create(PulsePalHistoryScannerHook)
        .init(CONFIG.rootDir);

    this.deviceLayer = PulseWorldDevice;
    this.deviceMode = "off";
    this.lastHeartbeat = null;

    if (typeof window !== "undefined") {
      window.PulseWorldDaemon = this;
    }

    if (this.deviceLayer) {
      this.deviceLayer.init();
      this.deviceMode =
        this.deviceLayer.getDeviceMode();
    }

    return this;
  },

  onHeartbeat(data) {

    this.lastHeartbeat = data;

    this.deviceMode =
      data?.deviceActive
        ? "on"
        : "off";
  },

  getDeviceSnapshot() {

    return {
      mode: this.deviceMode,
      lastHeartbeat: this.lastHeartbeat,
      active:
        this.lastHeartbeat?.deviceActive || false,
      timestamp:
        this.lastHeartbeat?.timestamp || null
    };
  },

  buildOneBandSummary() {

    let sum = 0;
    let max = 0;
    let min = 100;
    let count = 0;

    for (const organ of this.organs) {
      const s = organ.oneBandScore || 0;

      sum += s;
      max = Math.max(max, s);
      min = Math.min(min, s);
      count++;
    }

    if (count === 0) {
      this.oneBandSummary = {
        avgOneBandScore: 0,
        maxOneBandScore: 0,
        minOneBandScore: 0,
        oneBandOrganCount: 0
      };

      return;
    }

    this.oneBandSummary = {
      avgOneBandScore: Math.round(sum / count),
      maxOneBandScore: Math.round(max),
      minOneBandScore: Math.round(min),
      oneBandOrganCount: count
    };
  },

  buildPalHelperSuggestions() {

    const notes = [];
    const actions = [];
    let priority = "normal";

    if (this.palSummary.palCount === 0) {
      notes.push(
        "No Pulse‑Pal organs detected. Create PULSE-PAL to enable companion features."
      );

      actions.push(
        "Create PULSE-PAL folder and restart daemon."
      );

      priority = "high";
    }

    if (
      this.palSummary.palMediaFilesCount === 0
    ) {

      notes.push(
        "No Pulse‑Pal media detected in _PICTURES. Add PulsePal*.png/jpg/etc for avatar/skin."
      );

      actions.push(
        "Drop PulsePal images into _PICTURES and restart daemon."
      );

      if (priority !== "high") {
        priority = "elevated";
      }
    }

    if (
      this.palSummary.avgPalContinuance < 40 &&
      this.palSummary.palCount > 0
    ) {

      notes.push(
        "Pulse‑Pal continuance is low. Consider prewarming PAL organs or adding history/logs."
      );

      actions.push(
        "Increase PAL usage or add logs in PULSE-PAL/logs."
      );
    }

    this.palHelperSuggestions = {
      priority,
      notes,
      actions
    };
  },

  async tickOnce() {

    if (this.deviceLayer) {
      this.deviceMode =
        this.deviceLayer.getDeviceMode();
    }

    const proc =
      getProcessSnapshot();

    for (const organ of this.organs) {
      await organ.tick(
        proc,
        this.worldBinaryView
      );
    }

    this.buildProxySummary();
    this.buildPalSummary();
    this.buildOneBandSummary();
    this.buildPalHelperSuggestions();

    this.palHistory =
      await this.palHistoryScanner.scan();

    const snapshot = {

      meta: this.getConfig(),

      tick: this.tickCount,

      process: proc,

      bootMap: this.bootMap,

      proxySummary:
        this.proxySummary,

      palSummary:
        this.palSummary,

      palHistory:
        this.palHistory,

      palHelperSuggestions:
        this.palHelperSuggestions,

      binarySubstrateSummary:
        this.binarySubstrateSummary,

      gpuLymphSummary:
        this.gpuLymphSummary,

      oneBandSummary:
        this.oneBandSummary,

      device:
        this.getDeviceSnapshot(),

      organs:
        this.organs.map(
          o => o.toSnapshot()
        )
    };

    this.lastSnapshot = snapshot;
    this.tickCount += 1;

    if (CONFIG.output.snapshotFile) {

      try {

        fs.writeFileSync(
          CONFIG.output.snapshotFile,
          JSON.stringify(
            snapshot,
            null,
            2
          ),
          "utf8"
        );

      } catch (e) {
        // ignore
      }
    }

    if (
      !CONFIG.output.quiet &&
      !CONFIG.output.json
    ) {
      this.renderTui(snapshot);
    }

    if (CONFIG.output.json) {
      console.log(
        JSON.stringify(
          snapshot,
          null,
          2
        )
      );
    }

    return snapshot;
  },

  renderTui(snapshot) {

    const c = COLORS;

    console.clear();

    console.log(
      `${c.bold}${ICONS.os} Pulse‑World‑OS v30 ONE‑BAND${c.reset}  ` +
      `${ICONS.vitals} CPU ~${snapshot.process.cpuApprox}%  ` +
      `${ICONS.cache} MEM ~${snapshot.process.heapMb.toFixed(1)}MB`
    );

    console.log(
      `${ICONS.oneband} ONE‑BAND avg=${snapshot.oneBandSummary.avgOneBandScore} ` +
      `max=${snapshot.oneBandSummary.maxOneBandScore} ` +
      `organs=${snapshot.oneBandSummary.oneBandOrganCount}`
    );

    console.log("");

    console.log(
      `📱 Device Mode: ${snapshot.device.mode}`
    );

    if (snapshot.device.timestamp) {

      console.log(
        `💓 Heartbeat: ${
          snapshot.device.active
            ? "ACTIVE"
            : "OFF"
        }`
      );

      console.log(
        `🕒 Last Beat: ${new Date(
          snapshot.device.timestamp
        ).toLocaleTimeString()}`
      );
    }

    console.log("");

    for (const organ of this.organs) {
      console.log(
        organ.renderLine()
      );
    }

    console.log("");

    console.log(
      `${ICONS.proxy} Proxy: ${snapshot.proxySummary.proxyCount} ` +
      `binary=${snapshot.proxySummary.binaryCount} ` +
      `organism=${snapshot.proxySummary.organismCount} ` +
      `avgPCont=${snapshot.proxySummary.avgProxyContinuance}`
    );

    console.log(
      `${ICONS.pal} Pal: ${snapshot.palSummary.palCount} ` +
      `mediaFiles=${snapshot.palSummary.palMediaFilesCount} ` +
      `avgPalCont=${snapshot.palSummary.avgPalContinuance}`
    );
  },

  start() {

    this.discoverOrgans();

    if (this.deviceLayer) {
      this.deviceMode =
        this.deviceLayer.getDeviceMode();
    }

    const runTick = async () => {

      await this.tickOnce();

      if (CONFIG.output.once) {
        process.exit(0);
      }
    };

    runTick();

    this.timer =
      setInterval(
        runTick,
        CONFIG.tickMs
      );
  },

  stop() {

    if (this.timer) {
      clearInterval(
        this.timer
      );
    }
  }
};


/* =============================================================================
 *  ENTRYPOINT
 * ============================================================================= */

  const daemon = PulseBandDaemon;
  daemon.start();

window.WorldOS = {
  PulseBandDaemon,
  PulsePalHistoryScannerHook,
  PulseMediaResolver,
  PulseOrgan,
  CONFIG,
  CLI_CONFIG,
  AI_EXPERIENCE_META,
  EXPORT_META
}