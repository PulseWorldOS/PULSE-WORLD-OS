
let userInteracted = false;

function getFavicon(url) {
  try {
    const u = new URL(url);
    // Simple, reliable default: /favicon.ico on the origin
    return `${u.origin}/favicon.ico`;
  } catch {
    return null; // external ONLY — no fallback
  }
}

window.addEventListener("DOMContentLoaded", () => {
  updateModuleIcons();
});


async function updateModuleIcons() {
  const settings = await pbLoadSettings();

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



let engineType = "text";
const text = document.getElementById("searchengineTextbox").innerText.trim();
let url = "https://www.google.com/search?q=" + encodeURIComponent(text);

document.getElementById("searchus").addEventListener("click", (event) => {
  window.location.href = "https://www.google.com/search?q=" + encodeURIComponent("pulseworld.net");
});

document.getElementById("navigate").addEventListener("click", () => {
  let text = document.getElementById("searchengineTextbox").innerText.trim();

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
  const text = document.getElementById("searchengineTextbox").innerText.trim();
  url = "https://www.google.com/search?q=" + encodeURIComponent(text) + "&sca_esv=97ecd86c81018411&hl=en&udm=2&biw=1920&bih=945&sxsrf=APpeQnum89enEMVZATiLWD0yh0mMe6oPJg%3A1788824443834&ei=e0ufas3CMvLMkPIP5PPV2Qw&ved=2ahUKEwiN7Kis0t2WAxVyJkQIHeR5NcsQ4dUDegQIBhAN&uact=5&oq=fsdfsdf&gs_lp=Egtnd3Mtd2l6LWltZyIHZnNkZnNkZjIKEAAYgAQYigUYQzIPEAAYgAQYChgLGLEDGIMBMgUQABiABDIJEAAYgAQYChgLMgkQABiABBgKGAsyBRAAGIAEMgkQABiABBgKGAsyCRAAGIAEGAoYCzIJEAAYgAQYChgLMgkQABiABBgKGAtIqANQAFgAcAF4AJABAJgBAKABAKoBALABALgBA8gBAJgCAaACAZgDAOIDBBgAIF3iAwQYACBe4gMEGAAgX-IDBBgAIGDiAwQYACBh4gMEGAAgYogGAZIHATGgBwCyBwC4BwDCBwMwLjHIBwGACAE&sclient=gws-wiz-img";
  document.getElementById("images").style.backgroundColor = "red";
  document.getElementById("videos").style.backgroundColor = "black";
  document.getElementById("text").style.backgroundColor = "black";
  engineType = "images";
});

document.getElementById("videos").addEventListener("click", (event) => {
  const text = document.getElementById("searchengineTextbox").innerText.trim();
  url = "https://www.google.com/search?q=" + encodeURIComponent(text) + "&sca_esv=97ecd86c81018411&udm=7&biw=1920&bih=945&sxsrf=APpeQnuWOgRcMsUytLVkUMU_oHzKtkSHyw%3A1788824889059&ei=OU2fao2bA7TVkPIP4qfi4AI&ved=2ahUKEwjNm8-A1N2WAxW0KkQIHeKTGCwQ4dUDegQIBRAM&uact=5&oq=canva&gs_lp=EhZnd3Mtd2l6LW1vZGVsZXNzLXZpZGVvIgVjYW52YTIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwA0iuAVAAWABwAXgBkAEAmAEAoAEAqgEAsAEAuAEDyAEAmAIBoAICmAMA4gMEGAAgXeIDBBgAIF7iAwQYACBf4gMEGAAgYOIDBBgAIGHiAwQYACBiiAYBkAYIkgcBMaAHALIHALgHAMIHAzAuMcgHAYAIAQ&sclient=gws-wiz-modeless-video";
  document.getElementById("videos").style.backgroundColor = "red";
  document.getElementById("images").style.backgroundColor = "black";
  document.getElementById("text").style.backgroundColor = "black";
  engineType = "videos";
});

document.getElementById("text").addEventListener("click", (event) => {
  const text = document.getElementById("searchengineTextbox").innerText.trim();
  url = "https://www.google.com/search?q=" + encodeURIComponent(text);
  document.getElementById("text").style.backgroundColor = "red";
  document.getElementById("images").style.backgroundColor = "black";
  document.getElementById("videos").style.backgroundColor = "black";
  engineType = "text";
});

document.getElementById("search").addEventListener("click", (event) => {
  let text = document.getElementById("searchengineTextbox").innerText.trim();
  // Remove spaces just in case (e.g., "gmail . com")
  const cleaned = text.replace(/\s+/g, "");
  // Domain-only regex: matches "gmail.com", "pulseworld.net", "example.co.uk", etc.
  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Check if the cleaned text is *exactly* a domain
  const isPureDomain = domainRegex.test(cleaned);
  let url;
  if (isPureDomain) {
    // ⭐ PURE DOMAIN → Navigate directly
    window.location.href = "https://" + cleaned;
    return;
  }
  // ⭐ NOT a pure domain → treat as search
  if (engineType === "videos") {
    url = "https://www.google.com/search?q=" + encodeURIComponent(text) +
      "&sca_esv=97ecd86c81018411&udm=7&biw=1920&bih=945";
  } else if (engineType === "images") {
    url = "https://www.google.com/search?q=" + encodeURIComponent(text) +
      "&sca_esv=97ecd86c81018411&hl=en&udm=2&biw=1920&bih=945";
  } else {
    url = "https://www.google.com/search?q=" + encodeURIComponent(text);
  }

  window.location.href = url;
});


document.getElementById("searchengineTextbox").addEventListener("input", () => {
  let text = document.getElementById("searchengineTextbox").innerText.trim();
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

    let text = document.getElementById("searchengineTextbox").innerText.trim();

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
      url = "https://www.google.com/search?q=" + encodeURIComponent(text) + "&udm=7";
    } else if (engineType === "images") {
      url = "https://www.google.com/search?q=" + encodeURIComponent(text) + "&udm=2";
    } else {
      url = "https://www.google.com/search?q=" + encodeURIComponent(text);
    }

    window.location.href = url;
  }
});

document.getElementById("moduleEmail").addEventListener("click", async () => {

    const settings = await pbLoadSettings();

    console.log("[FrontPage] Email module clicked. Settings:", settings);

    // INTERNAL MODE → open PulseWorld Email on the real domain
    if (settings.emailMode === "internal") {
        const internalURL = "https://www.pulseworld.net?Impulse=PulseWorldEmail";
        console.log("[FrontPage] Opening Internal PulseMail:", internalURL);

        chrome.tabs.create({ url: internalURL });
        return;
    }

    // EXTERNAL MODE → open user’s chosen provider
    const link = settings.externalEmailLink?.trim();

    console.log("[FrontPage] Opening External Email Provider:", link);

    chrome.tabs.create({ url: link });
});

// Any interaction cancels redirect
["keydown", "mousedown", "pointerdown", "touchstart", "input", "focus"].forEach(evt => {
  window.addEventListener(evt, () => {
    userInteracted = true;
  }, { once: true });
});

// Auto‑redirect ONLY if user did not type or interact
setTimeout(() => {
  if (!userInteracted) {
    window.location.href = "https://www.pulseworld.net";
  }
}, 8500);
