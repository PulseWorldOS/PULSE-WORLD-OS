// ============================================================
//  PulseWorldDevice.js
//  Device Tier Interface + Daemon Integration Layer
// ============================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

export const PulseWorldDevice = (() => {

  // ------------------------------------------------------------
  // 1. DEVICE MODE PERSISTENCE
  // ------------------------------------------------------------
  function setDeviceMode(mode) {
    localStorage.setItem("pulse_device", mode);
    sendToSW(mode === "on" ? "PULSE_DEVICE_ON" : "PULSE_DEVICE_OFF");
  }

  function getDeviceMode() {
    return localStorage.getItem("pulse_device") || "off";
  }

  // ------------------------------------------------------------
  // 2. SERVICE WORKER MESSAGE CHANNEL
  // ------------------------------------------------------------
  function sendToSW(msg) {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(msg);
    }
  }

  // ------------------------------------------------------------
  // 3. HEARTBEAT LISTENER (SW → DEVICE PAGE)
  // ------------------------------------------------------------
  if (typeof navigator !== "undefined" && navigator.serviceWorker) {
    navigator.serviceWorker.addEventListener("message", event => {
      const data = event.data;

      if (data.type === "PULSE_HEARTBEAT") {
        updateHeartbeatUI(data);
        if (typeof window !== "undefined" && typeof window.PulseWorldDaemon?.onHeartbeat === "function") {
          window.PulseWorldDaemon.onHeartbeat(data);
        }
      }
    });
  }

  // ------------------------------------------------------------
  // 4. DEVICE UI (CONTROL PANEL)
  // ------------------------------------------------------------
  function renderDeviceUI() {
    const container = document.getElementById("pulse-device-panel");
    if (!container) return;

    container.innerHTML = `
      <div class="pulse-device-title">PulseWorld Device Layer</div>

      <div class="pulse-device-section">
        <button id="pulse-device-on" class="pulse-btn">Enable Device Mode</button>
        <button id="pulse-device-off" class="pulse-btn">Disable Device Mode</button>
      </div>

      <div class="pulse-device-section">
        <div id="pulse-heartbeat-status" class="pulse-status">
          Heartbeat: waiting...
        </div>
      </div>
    `;

    document.getElementById("pulse-device-on").onclick = () => setDeviceMode("on");
    document.getElementById("pulse-device-off").onclick = () => setDeviceMode("off");
  }

  // ------------------------------------------------------------
  // 5. HEARTBEAT UI UPDATE
  // ------------------------------------------------------------
  function updateHeartbeatUI(data) {
    const el = document.getElementById("pulse-heartbeat-status");
    if (!el) return;

    el.textContent = `Heartbeat: ${data.deviceActive ? "Device Mode Active" : "Device Mode Off"} — ${new Date(data.timestamp).toLocaleTimeString()}`;
  }

  // ------------------------------------------------------------
  // 6. INITIALIZATION
  // ------------------------------------------------------------
  function init() {
    renderDeviceUI();

    // Restore device mode on boot
    const mode = getDeviceMode();
    sendToSW(mode === "on" ? "PULSE_DEVICE_ON" : "PULSE_DEVICE_OFF");

    // Ask SW for heartbeat immediately
    sendToSW("PULSE_HEARTBEAT_REQUEST");
  }

  return { init, setDeviceMode, getDeviceMode };

})();

PulseRealm.PulseWorldDevice = PulseWorldDevice;