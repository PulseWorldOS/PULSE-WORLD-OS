
let userInteracted = false;
let engineType = "text";
let searchEngineActiveLink = null;
let searchMode = "Internal";
let searchEngineActivated = "*Google.com";

let engineURL = buildSearchURL("google.com");
let url = engineURL;

const timerBtn = document.getElementById("timerBtn");

function getFavicon(url) {
  const u = new URL(url);
  let icon = `${u.origin}/favicon.ico`;
  try {
    // 2. Strip subdomain → get root domain
    const parts = u.hostname.split(".");
    if (parts.length > 2) {
      const root = parts.slice(parts.length - 2).join(".");
      icon = `https://${root}/favicon.ico`;
    }
    console.log(icon);
    // Simple, reliable default: /favicon.ico on the origin
    return icon;
  } catch {
    return; // external ONLY — no fallback
  }
}

window.addEventListener("DOMContentLoaded", () => {
  updateModuleIcons();
});


async function updateModuleIcons() {
  const settings = await pbLoadExtensionSettings();

  
  searchEngineActiveLink = settings.externalSearchLink;
  searchMode = settings.searchMode;
  if (searchMode === "internal") {
    engineURL = "https://www.google.com/search?q=";
    searchEngineActivated = "Google.com";
    document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
  } else {
    engineURL = buildSearchURL(searchEngineActiveLink);
  }

  // EMAIL MODULE
  const emailIcon = document.getElementById("moduleEmailIcon");
  if (settings.emailMode === "internal") {
    emailIcon.innerText = "📧";      // your original emoji
    emailIcon.style.backgroundImage = "";
  } else {
    const fav = getFavicon(settings.externalEmailLink);
    if (fav) {
      emailIcon.innerText = "";
      emailIcon.style.backgroundImage = `url(${fav})`;
      emailIcon.style.backgroundSize = "contain";
      emailIcon.style.backgroundRepeat = "no-repeat";
    }
  }

  // BANK MODULE
  const bankIcon = document.getElementById("moduleBankIcon");
  if (settings.bankMode === "internal") {
    bankIcon.innerText = "🏦";      // your original emoji
    bankIcon.style.backgroundImage = "";
  } else {
    const fav = getFavicon(settings.externalBankLink);
    if (fav) {
      bankIcon.innerText = "";
      bankIcon.style.backgroundImage = `url(${fav})`;
      bankIcon.style.backgroundSize = "contain";
      bankIcon.style.backgroundRepeat = "no-repeat";
    }
  }

  // FAVORITES (always your emojis)
  document.getElementById("moduleFav1Icon").innerText = "⭐";
  document.getElementById("moduleFav1Icon").style.backgroundImage = "";

  document.getElementById("moduleFav2Icon").innerText = "⭐";
  document.getElementById("moduleFav2Icon").style.backgroundImage = "";
  
}
function cleanQuery(query) {
  if (!query) return "";
  return query.replace(/undefined/g, "").trim();
}

function buildSearchURL(engineURL, query) {
  if (query) query = cleanQuery(query);     // ← THIS removes the symbol
  const q = encodeURIComponent(query);
  
  // Normalize URL
  const url = engineURL.toLowerCase();

  // GOOGLE
  if (url.includes("google")) {
    searchEngineActivated = "Google.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://www.google.com/search?q=${q}`;
  }

  // YAHOO
  if (url.includes("yahoo")) {
    searchEngineActivated = "Yahoo.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://search.yahoo.com/search?p=${q}`;
  }

  // DUCKDUCKGO
  if (url.includes("duckduckgo") || url.includes("ddg")) {
    searchEngineActivated = "DuckDuckGo.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://duckduckgo.com/?q=${q}`;
  }

  // BING
  if (url.includes("bing")) {
    searchEngineActivated = "Bing.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://www.bing.com/search?q=${q}`;
  }

  // BRAVE
  if (url.includes("brave")) {
    searchEngineActivated = "Brave.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://search.brave.com/search?q=${q}`;
  }

  // BAIDU (China)
  if (url.includes("baidu")) {
    searchEngineActivated = "Baidu.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://www.baidu.com/s?wd=${q}`;
  }

  // NAVER (Korea)
  if (url.includes("naver")) {
    searchEngineActivated = "Naver.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://search.naver.com/search.naver?query=${q}`;
  }

  // YANDEX (Russia)
  if (url.includes("yandex")) {
    searchEngineActivated = "Yandex.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://yandex.com/search/?text=${q}`;
  }

  // ASK
  if (url.includes("ask")) {
    searchEngineActivated = "Ask.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://www.ask.com/web?q=${q}`;
  }

  // ECOSIA
  if (url.includes("ecosia")) {
    searchEngineActivated = "Ecosia.org";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://www.ecosia.org/search?q=${q}`;
  }

  // QWANT
  if (url.includes("qwant")) {
    searchEngineActivated = "Qwant.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
    return `https://www.qwant.com/?q=${q}`;
  }

  // Fallback: append query to custom engine
  searchEngineActivated = "Google.com";
  document.getElementById("search").textContent = "🔍 Pulse Search Engine (" + searchEngineActivated + ")";
  return `https://www.google.com/search?q=${q}`;
}


document.getElementById("searchus").addEventListener("click", (event) => {
  window.location.href = engineURL + encodeURIComponent("pulseworld.net");
});

document.getElementById("navigate").addEventListener("click", () => {
  let text = document.getElementById("searchengineTextbox").textContent.trim();

  // If ANY space exists → not navigation
  if (text.includes(" ")) {
    return; // do nothing
  }

  // Domain or domain + path
  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;

  const isDomainIntent = domainRegex.test(text);

  if (isDomainIntent) {
    window.location.href = "https://" + text;
  }
});


document.getElementById("images").addEventListener("click", (event) => {
  const text = document.getElementById("searchengineTextbox").textContent.trim();
  url = engineURL + encodeURIComponent(text) + "&sca_esv=97ecd86c81018411&hl=en&udm=2&biw=1920&bih=945&sxsrf=APpeQnum89enEMVZATiLWD0yh0mMe6oPJg%3A1788824443834&ei=e0ufas3CMvLMkPIP5PPV2Qw&ved=2ahUKEwiN7Kis0t2WAxVyJkQIHeR5NcsQ4dUDegQIBhAN&uact=5&oq=fsdfsdf&gs_lp=Egtnd3Mtd2l6LWltZyIHZnNkZnNkZjIKEAAYgAQYigUYQzIPEAAYgAQYChgLGLEDGIMBMgUQABiABDIJEAAYgAQYChgLMgkQABiABBgKGAsyBRAAGIAEMgkQABiABBgKGAsyCRAAGIAEGAoYCzIJEAAYgAQYChgLMgkQABiABBgKGAtIqANQAFgAcAF4AJABAJgBAKABAKoBALABALgBA8gBAJgCAaACAZgDAOIDBBgAIF3iAwQYACBe4gMEGAAgX-IDBBgAIGDiAwQYACBh4gMEGAAgYogGAZIHATGgBwCyBwC4BwDCBwMwLjHIBwGACAE&sclient=gws-wiz-img";
  document.getElementById("images").style.backgroundColor = "red";
  document.getElementById("videos").style.backgroundColor = "black";
  document.getElementById("text").style.backgroundColor = "black";
  engineType = "images";
});

document.getElementById("videos").addEventListener("click", (event) => {
  const text = document.getElementById("searchengineTextbox").textContent.trim();
  url = engineURL + encodeURIComponent(text) + "&sca_esv=97ecd86c81018411&udm=7&biw=1920&bih=945&sxsrf=APpeQnuWOgRcMsUytLVkUMU_oHzKtkSHyw%3A1788824889059&ei=OU2fao2bA7TVkPIP4qfi4AI&ved=2ahUKEwjNm8-A1N2WAxW0KkQIHeKTGCwQ4dUDegQIBRAM&uact=5&oq=canva&gs_lp=EhZnd3Mtd2l6LW1vZGVsZXNzLXZpZGVvIgVjYW52YTIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwA0iuAVAAWABwAXgBkAEAmAEAoAEAqgEAsAEAuAEDyAEAmAIBoAICmAMA4gMEGAAgXeIDBBgAIF7iAwQYACBf4gMEGAAgYOIDBBgAIGHiAwQYACBiiAYBkAYIkgcBMaAHALIHALgHAMIHAzAuMcgHAYAIAQ&sclient=gws-wiz-modeless-video";
  document.getElementById("videos").style.backgroundColor = "red";
  document.getElementById("images").style.backgroundColor = "black";
  document.getElementById("text").style.backgroundColor = "black";
  engineType = "videos";
});

document.getElementById("text").addEventListener("click", (event) => {
  const text = document.getElementById("searchengineTextbox").textContent.trim();
  url = buildSearchURL(engineURL, text);
  document.getElementById("text").style.backgroundColor = "red";
  document.getElementById("images").style.backgroundColor = "black";
  document.getElementById("videos").style.backgroundColor = "black";
  engineType = "text";
});

document.getElementById("search").addEventListener("click", (event) => {
  let text = document.getElementById("searchengineTextbox").textContent.trim();

  // Remove spaces just in case (e.g., "gmail . com")
  const cleaned = text.replace(/\s+/g, "");

  // Domain-only regex: matches "gmail.com", "pulseworld.net", "example.co.uk", etc.
  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Check if the cleaned text is *exactly* a domain
  const isPureDomain = domainRegex.test(cleaned);

  if (isPureDomain) {
    const origin = "https://" + cleaned;

    // ⭐ LIGHTWEIGHT PRE-GET-READY (no heavy systems)
    try {
      fetch(origin, { mode: "no-cors" }).catch(() => {});
    } catch (_) {}

    // ⭐ PURE DOMAIN → Navigate directly
    window.location.href = origin;
    return;
  }

  // ⭐ NOT a pure domain → treat as search
  if (engineType === "videos") {
    url = engineURL + encodeURIComponent(text) +
      "&sca_esv=97ecd86c81018411&udm=7&biw=1920&bih=945";
  } else if (engineType === "images") {
    url = engineURL + encodeURIComponent(text) +
      "&sca_esv=97ecd86c81018411&hl=en&udm=2&biw=1920&bih=945";
  } else {
    url = engineURL + encodeURIComponent(text);
  }

  window.location.href = url;
});


document.getElementById("searchengineTextbox").addEventListener("input", () => {
  let text = document.getElementById("searchengineTextbox").textContent.trim();
  const navigateIcon = document.getElementById("navigate");

  // If ANY space exists → it's a search query
  if (text.includes(" ")) {
    navigateIcon.style.display = "none";
    if (engineType === "videos") {
      document.getElementById("videos").style.backgroundColor = "red";
    } else if (engineType === "images") {
      document.getElementById("images").style.backgroundColor = "red";
    } else {
      document.getElementById("text").style.backgroundColor = "red";
    }
    return;
  }

  // Domain or domain + path (no spaces allowed)
  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;

  const isDomainIntent = domainRegex.test(text);

  if (isDomainIntent) {
    navigateIcon.style.display = "inline";
    navigateIcon.style.backgroundColor = "red";
    if (engineType === "videos") {
      document.getElementById("videos").style.backgroundColor = "black";
    } else if (engineType === "images") {
      document.getElementById("images").style.backgroundColor = "black";
    } else {
      document.getElementById("text").style.backgroundColor = "black";
    }
  } else {
    navigateIcon.style.display = "none";
    if (engineType === "videos") {
      document.getElementById("videos").style.backgroundColor = "red";
    } else if (engineType === "images") {
      document.getElementById("images").style.backgroundColor = "red";
    } else {
      document.getElementById("text").style.backgroundColor = "red";
    }
  }
});


document.getElementById("searchengineTextbox").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    let text = document.getElementById("searchengineTextbox").textContent.trim();

    // Domain or domain + path
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;
    const isDomainIntent = domainRegex.test(text);

    let url;

    if (isDomainIntent) {
      window.location.href = "https://" + text;
      return;
    }

    // Fallback: search
    if (engineType === "videos") {
      url = engineURL + encodeURIComponent(text) + "&udm=7";
    } else if (engineType === "images") {
      url = engineURL + encodeURIComponent(text) + "&udm=2";
    } else {
      url = engineURL + encodeURIComponent(text);
    }

    window.location.href = url;
  }
});

document.getElementById("moduleEmail").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();

    console.log("[FrontPage] Email module clicked. Settings:", settings);

    // INTERNAL MODE → open PulseWorld Email on the real domain
    if (settings.emailMode === "internal") {
        const internalURL = "https://www.pulseworld.net?Impulse=PulseWorldEmail";
        console.log("[FrontPage] Opening Internal PulseMail:", internalURL);

        chrome.tabs.create({ url: internalURL });
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.externalEmailLink?.trim() || "https://mail.google.com/";

    console.log("[FrontPage] Opening External Email Provider:", link);

    chrome.tabs.create({ url: link });
});


document.getElementById("moduleBank").addEventListener("click", async () => {

    const settings = await pbLoadExtensionSettings();

    console.log("[FrontPage] Bank module clicked. Settings:", settings);

    // INTERNAL MODE → open PulseWorld Bank on the real domain
    if (settings.bankMode === "internal") {
        const internalURL = "https://www.pulseworld.net?Impulse=PulseWorldRewards";
        console.log("[FrontPage] Opening Internal PulseBank:", internalURL);

        chrome.tabs.create({ url: internalURL });
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.externalBankLink?.trim() || "https://www.bankofamerica.com/";

    console.log("[FrontPage] Opening External Bank Provider:", link);

    chrome.tabs.create({ url: link });
});

// Any interaction cancels redirect
["keydown", "mousedown", "pointerdown", "touchstart", "input", "focus"].forEach(evt => {
  window.addEventListener(evt, () => {
    userInteracted = true;
  }, { once: true });
});
let timerX = 0;

setInterval(() => {
  timerX++;
  document.getElementById("timerBtn").textContent = timerX;
  if (!userInteracted && timerX === 8) {
    window.location.href = "https://www.pulseworld.net";
    timerX = 0;
  }
}, 1000);
