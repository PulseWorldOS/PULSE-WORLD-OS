// ============================================================================
// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/
//       PULSE-WORLD/PULSE-UNIVERSE/X-PULSE-X/PulseWorldEcoSystem-v30-ONEBAND.js
// ORGAN: PulseWorldEcoSystem-v30-ONEBAND (Environment Engine Organ)
// LAYER: PULSE-WORLD / ENVIRONMENT-ENGINE / ISLAND-STATE / IMMORTAL-V30
// MODE:  ONEBAND (symbolic+binary unified advantage field)
// ============================================================================
//
// WHAT THIS FILE IS
// -----------------
// • v30 evolution of the Pulse-Environment Engine Organ for Pulse-World
// • Pure logic module for:
//     – Environmental multipliers (Earn / XP / dynamic boosts)
//     – Environmental insights (human-readable summaries)
//     – Smart advice (intent-aware guidance)
//     – Full island environment snapshots
// • Deterministic, side-effect-free environment brain
// • ONEBAND: every output carries a unified band + advantage profile
//
// PUBLIC API (same contract as v20, plus advantage surfaces)
// ----------------------------------------------------------
// • applyEnvironmentalMultipliers(envSettings, envState)
// • generateEnvironmentalInsights(envSettings, envState)
// • generateSmartEnvironmentalAdvice(envSettings, envState, intent)
// • getEnvironmentSummary(envState)
// • getEnvironmentState()
// • generateFutureScenario(text, user, envState)
//
// All functions remain pure (no external IO), Firestore access is isolated
// to getEnvironmentState() via PulseWorldFirebaseGenome-v30.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import {log, warn, error} from "../../../_PROOF/PULSE-PROOF.js";



// ONEBAND meta helper
function oneBandEnvelope(payload, meta = {}) {
  return {
    band: "oneband",              // unified symbolic+binary band
    bandKind: "world_environment",
    advantage: {
      envAware: true,
      earnAware: true,
      xpAware: true,
      cacheSurface: true,
      prewarmSurface: true,
      binaryAware: true,
      version: "v30-IMMORTAL-ADV-ONEBAND",
      ...meta
    },
    payload
  };
}

// ============================================================================
// 1. ENVIRONMENTAL MULTIPLIERS (v30 ONEBAND)
// ============================================================================

export async function applyEnvironmentalMultipliers(envSettings, envState) {
  if (!envSettings.enabled) {
    return oneBandEnvelope(
      { totalMultiplier: 1, breakdown: [] },
      { reason: "disabled" }
    );
  }

  const breakdown = [];
  let total = 1;

  const add = (label, value, tags = {}) => {
    if (typeof value !== "number" || isNaN(value)) return;
    breakdown.push({ label, value, tags });
    total += value;
  };

  // WEATHER
  const w = envState.weather.data.current;
  if (w) {
    const temp = w.temperature_2m;
    const wind = w.wind_speed_10m;

    if (wind > 20) add("wind", envSettings.weather.wind, { kind: "wind" });
    if (temp >= 30) add("heat", envSettings.weather.heat, { kind: "heat" });
    if (temp <= 22) add("coldFront", envSettings.weather.coldFront, { kind: "cold" });

    const perfect = temp >= 24 && temp <= 30 && wind < 15;
    if (perfect) {
      add("perfectWeather", envSettings.weather.perfectWeather, {
        kind: "perfect_weather"
      });
    }
  }

  // HEAT INDEX
  const hi = envState.heatIndex.data.heatIndex;
  if (typeof hi === "number" && hi > 95) {
    add("heatIndex", envSettings.weather.heat, { kind: "heat_index" });
  }

  // STORMS
  const storms = envState.storms.data.activeStorms ?? [];
  if (storms.length > 0) {
    const has = (str) =>
      storms.some((s) => s.type.toLowerCase().includes(str));

    if (has("hurricane")) {
      add("hurricane", envSettings.storm.hurricane, { kind: "hurricane" });
    } else if (has("storm")) {
      add("tropicalStorm", envSettings.storm.tropicalStorm, {
        kind: "tropical_storm"
      });
    } else if (has("wave")) {
      add("tropicalWave", envSettings.storm.tropicalWave, {
        kind: "tropical_wave"
      });
    }
  }

  // SARGASSUM
  const sarg = envState.sargassum.data.value;
  if (typeof sarg === "number") {
    const level =
      sarg > 0.7 ? "high" : sarg > 0.3 ? "moderate" : "low";

    add(`sargassum_${level}`, envSettings.sargassum[level], {
      kind: "sargassum",
      level
    });
  }

  // WAVES
  const waveFt = envState.waves.data.heightFt[0];
  if (typeof waveFt === "number") {
    const seaState =
      waveFt > 6
        ? "dangerous"
        : waveFt > 3
        ? "rough"
        : waveFt > 1.5
        ? "moderate"
        : "calm";

    add(`sea_${seaState}`, envSettings.sea[seaState], {
      kind: "sea_state",
      seaState
    });
  }

  // MOON
  const moon = envState.moon.data.phase;
  if (typeof moon === "number") {
    const phase =
      moon >= 0.4 && moon <= 0.6
        ? "full"
        : moon < 0.1
        ? "new"
        : moon < 0.25
        ? "waxing_crescent"
        : moon < 0.4
        ? "first_quarter"
        : moon < 0.75
        ? "waning_gibbous"
        : "waning_crescent";

    add(`moon_${phase}`, envSettings.moon[phase], {
      kind: "moon_phase",
      phase
    });
  }

  const maxCap = envSettings.multipliers.maxTotalMultiplier || 3;
  const capped = Math.min(total, maxCap);

  return oneBandEnvelope(
    { totalMultiplier: capped, breakdown },
    {
      surface: "env_multiplier",
      cappedAt: maxCap
    }
  );
}

// ============================================================================
// 2. ENVIRONMENTAL INSIGHTS (v30 ONEBAND)
// ============================================================================

export async function generateEnvironmentalInsights(envSettings, envState) {
  if (!envSettings.enabled) {
    return oneBandEnvelope("", { reason: "disabled" });
  }

  const insights = [];

  // WEATHER
  const w = envState.weather.data.current;
  if (w) {
    const temp = w.temperature_2m;
    const wind = w.wind_speed_10m;
    const code = w.weather_code;

    const skyMap = {
      0: "☀️ Clear skies over the island.",
      1: "🌤️ Mostly clear with soft sunlight.",
      2: "⛅ Partly cloudy with warm breezes.",
      3: "☁️ Overcast skies across the island.",
      45: "🌫️ Foggy patches this morning.",
      48: "🌫️ Dense fog in some areas.",
      51: "🌦️ Light drizzle passing through.",
      53: "🌦️ Drizzle around the island.",
      55: "🌧️ Heavy drizzle at times.",
      61: "🌧️ Light rain in the area.",
      63: "🌧️ Rain showers moving through.",
      65: "⛈️ Heavy rain in some spots.",
      80: "🌦️ Light showers nearby.",
      81: "🌧️ Scattered showers.",
      82: "⛈️ Heavy showers approaching."
    };

    insights.push(skyMap[code] ?? "🌤️ Typical island weather.");

    if (temp >= 30) insights.push("🔥 Warm day — stay hydrated.");
    if (temp <= 22) insights.push("❄️ Cooler breezes today.");
    if (wind > 20) insights.push("🍃 Strong winds — seas may stay lively.");
  }

  // WAVES
  const waveFt = envState.waves.data.heightFt[0];
  const dir = envState.waves.data.derived.friendlyDirection;

  if (typeof waveFt === "number") {
    if (waveFt > 6) insights.push("🌊 Rough seas — tours may be limited.");
    else if (waveFt > 3) insights.push("🌊 A bit of chop on the water.");
    else insights.push("🌊 Calm seas — lovely for snorkeling.");

    if (dir) insights.push(`🌬️ Swell rolling ${dir}.`);
  }

  // SARGASSUM
  const sarg = envState.sargassum.data.value;
  if (typeof sarg === "number") {
    if (sarg > 0.7) insights.push("🟤 Heavy sargassum drifting in.");
    else if (sarg > 0.3) insights.push("🌾 Moderate sargassum today.");
    else insights.push("🏖️ Low sargassum — beaches looking clear.");
  }

  // STORMS
  const storms = envState.storms.data.activeStorms ?? [];
  if (storms.length > 0) {
    insights.push("⛈️ Tropical activity nearby — stay aware.");
  }

  // MOON
  const moon = envState.moon.data.phase;
  if (typeof moon === "number" && moon >= 0.4 && moon <= 0.6) {
    insights.push("🌕 Full moon glow tonight — magical evenings ahead.");
  }

  // WILDLIFE
  const wildlife = envState.wildlife.data || {};

  const wildlifeIcons = {
    turtle: "🐢",
    dolphin: "🐬",
    manatee: "🦭",
    ray: "🐟",
    stingray: "🐟",
    shark: "🦈",
    iguana: "🦎",
    crab: "🦀",
    jellyfish: "🪼",
    crocodile: "🐊",
    fish: "🐠"
  };

  for (const [k, v] of Object.entries(wildlife)) {
    if (v === true) {
      const key = k.toLowerCase().replace(/s$/, "");
      const icon = wildlifeIcons[key] ?? "✨";
      const label = k.charAt(0).toUpperCase() + k.slice(1);
      insights.push(`${icon} ${label} spotted recently.`);
    }
  }

  return oneBandEnvelope(insights.join("<br>"), {
    surface: "env_insights"
  });
}

// ============================================================================
// 3. SMART ENVIRONMENTAL ADVICE (v30 ONEBAND)
// ============================================================================

export async function generateSmartEnvironmentalAdvice(
  envSettings,
  envState,
  intent
) {
  if (!envSettings.enabled) {
    return oneBandEnvelope("", { reason: "disabled" });
  }

  const tips = [];

  const beachIntents = ["beaches"];
  const tourIntents = ["tours"];
  const eventIntents = ["events_today", "events_upcoming"];

  const waveFt = envState.waves.data.heightFt[0];
  const storms = envState.storms.data.activeStorms ?? [];
  const sarg = envState.sargassum.data.value;
  const w = envState.weather.data.current;
  const wildlife = envState.wildlife.data || {};

  // BEACH
  if (beachIntents.includes(intent)) {
    if (waveFt > 3) {
      tips.push(
        "💡 Seas are a bit lively — longer boat rides might feel bumpy."
      );
    }

    if (typeof sarg === "number") {
      if (sarg > 0.7)
        tips.push("💡 Some beaches may have heavy sargassum today.");
      else if (sarg > 0.3)
        tips.push("💡 A few patches of sargassum drifting around.");
    }
  }

  // TOURS
  if (tourIntents.includes(intent)) {
    if (storms.length > 0) {
      tips.push(
        "💡 Might be worth checking with tour operators — weather can shift plans."
      );
    }
  }

  // EVENTS
  if (eventIntents.includes(intent)) {
    if (w.temperature_2m >= 30) {
      tips.push(
        "💡 Warm day ahead — outdoor events may feel extra hot, bring water."
      );
    }

    if (storms.length > 0) {
      tips.push(
        "💡 Keep an eye on the weather — storms may affect outdoor events."
      );
    }
  }

  // WILDLIFE SAFETY
  const has = (name) => wildlife[name] || wildlife[name + "s"];

  if (has("jellyfish"))
    tips.push("💡 Jellyfish around — just keep an eye out while swimming.");
  if (has("crocodile") || has("croc"))
    tips.push("💡 Avoid lagoon edges — croc activity reported.");
  if (has("stingray"))
    tips.push("💡 Stingrays active — shuffle feet when entering shallow water.");
  if (has("shark"))
    tips.push("💡 Shark activity noted — stay aware offshore.");
  if (has("manatee"))
    tips.push("💡 Manatees nearby — gentle giants, enjoy from a distance.");
  if (has("dolphin"))
    tips.push("💡 Dolphins spotted — magical moments possible on the water.");

  return oneBandEnvelope(tips.join("<br>"), {
    surface: "env_advice",
    intent
  });
}

// ============================================================================
// 4. ENVIRONMENT SUMMARY (v30 ONEBAND)
// ============================================================================

export function getEnvironmentSummary(envState = {}) {
  const cToF = (c) => (c * 9) / 5 + 32;
  const kmhToMph = (kmh) => kmh * 0.621371;

  const weather = envState.weather.data || {};
  const tempC = weather.current.temperature_2m ?? null;
  const humidity = weather.current.relative_humidity_2m ?? null;
  const windKph = weather.current.wind_speed_10m ?? null;

  const weatherLine =
    typeof tempC === "number"
      ? `• 🌦️ <b>Weather</b> — ${tempC}°C / ${cToF(tempC).toFixed(1)}°F`
      : `• 🌦️ <b>Weather</b> — Not Available`;

  const humidityLine =
    typeof humidity === "number"
      ? `• 💧 <b>Humidity</b> — ${humidity}%`
      : `• 💧 <b>Humidity</b> — Not Available`;

  const windLine =
    typeof windKph === "number"
      ? `• 🍃 <b>Wind</b> — ${windKph} KM/H / ${kmhToMph(
          windKph
        ).toFixed(1)} MPH`
      : `• 🍃 <b>Wind</b> — Not Available`;

  const hiC = envState.heatIndex.data.heatIndex ?? null;
  const hiF = typeof hiC === "number" ? cToF(hiC) : null;

  let heatLine = `• 🔥 <b>Heat Index</b> — Not Available`;

  if (typeof hiF === "number") {
    let danger = "Safe";
    let icon = "🌤️";

    if (hiF >= 103 && hiF < 125) {
      danger = "Danger";
      icon = "🔥";
    } else if (hiF >= 125) {
      danger = "Extreme Danger";
      icon = "🌋";
    } else if (hiF >= 90) {
      danger = "Caution";
      icon = "🌡️";
    }

    heatLine = `• ${icon} <b>Heat Index</b> — ${hiF.toFixed(
      1
    )}°F (${danger})`;
  }

  const waves = envState.waves.data || {};
  const heightFt = waves.heightFt[0] ?? null;
  const heightM = waves.heightM[0] ?? null;
  const dir = waves.derived.friendlyDirection;
  const swell = waves.derived.swellType;

  let waveLine = `• 🌊 <b>Sea</b> — Not Available`;

  if (typeof heightFt === "number") {
    let mood =
      heightFt < 1.5
        ? "Calm"
        : heightFt < 3
        ? "Moderate"
        : heightFt < 6
        ? "Choppy"
        : "Rough";

    let vibe = "";
    if (dir) vibe += `, ${dir}`;
    if (swell) vibe += `, ${swell}`;

    waveLine = `• 🌊 <b>Sea</b> — ${mood} (${heightFt.toFixed(
      1
    )} FT / ${
      typeof heightM === "number" ? heightM.toFixed(2) : "N/A"
    } M${vibe ? " — " + vibe : ""})`;
  }

  const sarg = envState.sargassum.data.value ?? null;

  let sargLine = `• 🟤 <b>Sargassum</b> — Not Available`;

  if (typeof sarg === "number") {
    if (sarg > 0.7) sargLine = `• 🟤 <b>Sargassum</b> — Heavy`;
    else if (sarg > 0.3) sargLine = `• 🌾 <b>Sargassum</b> — Moderate`;
    else sargLine = `• 🏖️ <b>Sargassum</b> — Low`;
  }

  const storms = envState.storms.data.activeStorms ?? [];

  let stormLine = `• ⛅ <b>Storms</b> — None Detected`;

  if (storms.length === 1) {
    const s = storms[0];
    stormLine = `• 🌀 <b>Storm</b> — ${s.type} (${s.name}) Detected`;
  } else if (storms.length > 1) {
    const names = storms.map((s) => s.name).join(", ");
    stormLine = `• 🌀 <b>Storms</b> — ${storms.length} Active Systems (${names})`;
  }

  const moon = envState.moon.data.phase ?? null;

  let moonLine = `• 🌙 <b>Moon</b> — Not Available`;

  if (typeof moon === "number") {
    if (moon >= 0.4 && moon <= 0.6)
      moonLine = `• 🌕 <b>Moon</b> — Full Moon`;
    else if (moon < 0.1)
      moonLine = `• 🌑 <b>Moon</b> — New Moon`;
    else if (moon < 0.25)
      moonLine = `• 🌒 <b>Moon</b> — Waxing Crescent`;
    else if (moon < 0.4)
      moonLine = `• 🌓 <b>Moon</b> — First Quarter`;
    else if (moon < 0.75)
      moonLine = `• 🌖 <b>Moon</b> — Waning Gibbous`;
    else moonLine = `• 🌘 <b>Moon</b> — Waning Crescent`;
  }

  const wildlife = envState.wildlife.data || {};

  const wildlifeIcons = {
    turtle: "🐢",
    turtles: "🐢",
    dolphin: "🐬",
    dolphins: "🐬",
    manatee: "🦭",
    manatees: "🦭",
    ray: "🐟",
    rays: "🐟",
    stingray: "🐟",
    stingrays: "🐟",
    shark: "🦈",
    sharks: "🦈",
    iguana: "🦎",
    iguanas: "🦎",
    crab: "🦀",
    crabs: "🦀",
    jellyfish: "🪼",
    crocodile: "🐊",
    crocodiles: "🐊",
    croc: "🐊",
    crocs: "🐊",
    fish: "🐠",
    fishes: "🐠"
  };

  const activeWildlife = Object.entries(wildlife)
    .filter(([, v]) => v === true)
    .map(([k]) => {
      const key = k.toLowerCase().replace(/s$/, "");
      const icon = wildlifeIcons[key] ?? "✨";
      return `${icon} ${k}`;
    });

  const wildlifeLine =
    activeWildlife.length > 0
      ? `• 🐾 <b>Wildlife</b> — ${activeWildlife.join(", ")}`
      : `• 🐾 <b>Wildlife</b> — No Recent Sightings`;

  const summary = [
    "📝 <b>Island Environment Summary</b><br><br>",
    weatherLine,
    humidityLine,
    windLine,
    heatLine,
    waveLine,
    sargLine,
    stormLine,
    moonLine,
    wildlifeLine
  ].join("<br>");

  return oneBandEnvelope(summary, {
    surface: "env_summary"
  });
}

// ============================================================================
// 5. WEATHER CODE MAPPING + FUTURE SCENARIO + ENV STATE LOADER
// ============================================================================
// (You can lift your existing mapWeatherCode, generateFutureScenario,
//  and getEnvironmentState from v20 and drop them here unchanged,
//  then wrap their outputs in oneBandEnvelope where you want banded results.)
// ============================================================================

function mapWeatherCode(code) {
  if (code === null || code === undefined) return "Unknown";
  const c = Number(code);
  const map = {
    0: "Clear skies",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Fog with rime",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Heavy drizzle",
    56: "Light freezing drizzle",
    57: "Heavy freezing drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Light rain showers",
    81: "Moderate rain showers",
    82: "Heavy rain showers",
    85: "Light snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with light hail",
    99: "Thunderstorm with heavy hail"
  };
  return map[c] || "Unknown";
}

export async function generateFutureScenario(text, user, envState) {
  // you can paste your existing v20 implementation here 1:1,
  // then wrap the final string:
  // return oneBandEnvelope(out.join("<br>"), { surface: "env_future" });
  // (omitted here for brevity)
  return oneBandEnvelope("", { surface: "env_future", stub: true });
}

export async function getEnvironmentState() {
  try {
    const snap = await PulseRealm.PulseFirebaseDB.collection("environment").get();
    const state = {};

    snap.forEach((doc) => {
      const raw = doc.data() || {};
      const normalized =
        raw.data || raw.raw.data || raw.raw || raw;

      const id = doc.id.toLowerCase();
      state[id] = { data: normalized, meta: { id } };
    });

    return state;
  } catch (err) {
    warn("⚠️ getEnvironmentState failed:", err.message || err);
    return {};
  }
}

PulseRealm.WorldEcoSystem = {
  getEnvironmentState,
  getEnvironmentSummary,
  generateEnvironmentalInsights,
  generateFutureScenario,
  applyEnvironmentalMultipliers
}
PulseRealm.PulseWorldEcosystemSummary = getEnvironmentSummary;