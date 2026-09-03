let userInteracted = false;

// Any interaction cancels redirect
["keydown", "mousedown", "pointerdown", "touchstart", "input", "focus"].forEach(evt => {
  window.addEventListener(evt, () => {
    userInteracted = true;
  }, { once: true });
});

// Manual enter button
document.getElementById("enter").addEventListener("click", () => {
  window.location.href = "https://www.pulseworld.net";
});

// Auto‑redirect ONLY if user did not type or interact
setTimeout(() => {
  if (!userInteracted) {
    window.location.href = "https://www.pulseworld.net";
  }
}, 8500);
