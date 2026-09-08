let userInteracted = false;
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
    return;
  }

  // Domain or domain + path (no spaces allowed)
  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;

  const isDomainIntent = domainRegex.test(text);

  if (isDomainIntent) {
    navigateIcon.style.display = "inline";
    navigateIcon.style.backgroundColor = "red";
  } else {
    navigateIcon.style.display = "none";
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
