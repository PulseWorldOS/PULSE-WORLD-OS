let userInteracted = false;

document.getElementById("search").addEventListener("click", (event) => {
  const text = document.getElementById("searchengineTextbox").innerText.trim();

  // Build Google search URL
  const url = "https://www.google.com/search?q=" + encodeURIComponent(text);

  // Navigate
  window.location.href = url;
});

document.getElementById("searchengineTextbox").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // stops newline insertion

    const text = document.getElementById("searchengineTextbox").innerText.trim();
    const url = "https://www.google.com/search?q=" + encodeURIComponent(text);
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
