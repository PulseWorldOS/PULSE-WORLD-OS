let userInteracted = false;
let url = "https://www.google.com";

document.getElementById("searchus").addEventListener("click", (event) => {
  window.location.href = "https://www.google.com/search?q=" + encodeURIComponent("pulseworld.net");
});

document.getElementById("images").addEventListener("click", (event) => {
  const text = document.getElementById("searchengineTextbox").innerText.trim();
  url = "https://www.google.com/search?q=" + encodeURIComponent(text) + "&sca_esv=97ecd86c81018411&hl=en&udm=2&biw=1920&bih=945&sxsrf=APpeQnum89enEMVZATiLWD0yh0mMe6oPJg%3A1788824443834&ei=e0ufas3CMvLMkPIP5PPV2Qw&ved=2ahUKEwiN7Kis0t2WAxVyJkQIHeR5NcsQ4dUDegQIBhAN&uact=5&oq=fsdfsdf&gs_lp=Egtnd3Mtd2l6LWltZyIHZnNkZnNkZjIKEAAYgAQYigUYQzIPEAAYgAQYChgLGLEDGIMBMgUQABiABDIJEAAYgAQYChgLMgkQABiABBgKGAsyBRAAGIAEMgkQABiABBgKGAsyCRAAGIAEGAoYCzIJEAAYgAQYChgLMgkQABiABBgKGAtIqANQAFgAcAF4AJABAJgBAKABAKoBALABALgBA8gBAJgCAaACAZgDAOIDBBgAIF3iAwQYACBe4gMEGAAgX-IDBBgAIGDiAwQYACBh4gMEGAAgYogGAZIHATGgBwCyBwC4BwDCBwMwLjHIBwGACAE&sclient=gws-wiz-img";
  document.getElementById("images").style.backgroundColor = "red";
  document.getElementById("videos").style.backgroundColor = "black";
  document.getElementById("text").style.backgroundColor = "black";
});

document.getElementById("videos").addEventListener("click", (event) => {
  const text = document.getElementById("searchengineTextbox").innerText.trim();
  url = "https://www.google.com/search?q=" + encodeURIComponent(text) + "&sca_esv=97ecd86c81018411&udm=7&biw=1920&bih=945&sxsrf=APpeQnuWOgRcMsUytLVkUMU_oHzKtkSHyw%3A1788824889059&ei=OU2fao2bA7TVkPIP4qfi4AI&ved=2ahUKEwjNm8-A1N2WAxW0KkQIHeKTGCwQ4dUDegQIBRAM&uact=5&oq=canva&gs_lp=EhZnd3Mtd2l6LW1vZGVsZXNzLXZpZGVvIgVjYW52YTIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwA0iuAVAAWABwAXgBkAEAmAEAoAEAqgEAsAEAuAEDyAEAmAIBoAICmAMA4gMEGAAgXeIDBBgAIF7iAwQYACBf4gMEGAAgYOIDBBgAIGHiAwQYACBiiAYBkAYIkgcBMaAHALIHALgHAMIHAzAuMcgHAYAIAQ&sclient=gws-wiz-modeless-video";
  document.getElementById("videos").style.backgroundColor = "red";
  document.getElementById("images").style.backgroundColor = "black";
  document.getElementById("text").style.backgroundColor = "black";
});

document.getElementById("text").addEventListener("click", (event) => {
  const text = document.getElementById("searchengineTextbox").innerText.trim();
  url = "https://www.google.com/search?q=" + encodeURIComponent(text);
  document.getElementById("text").style.backgroundColor = "red";
  document.getElementById("images").style.backgroundColor = "black";
  document.getElementById("videos").style.backgroundColor = "black";
});

document.getElementById("search").addEventListener("click", (event) => {
  const text = document.getElementById("searchengineTextbox").innerText.trim();
  url = "https://www.google.com/search?q=" + encodeURIComponent(text);
  window.location.href = url;
});

document.getElementById("searchengineTextbox").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // stops newline insertion
    const text = document.getElementById("searchengineTextbox").innerText.trim();
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
