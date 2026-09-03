

console.groupCollapsed(
  "%c[PULSEWORLD::Senses] Importing PulseOSSenses.js...",
  "color:#00FFCC; font-weight:bold; font-family:monospace;"
);

console.log("🌐 Import Source:", import.meta.url);

// ---------------------------------------------------------------------------
// REALM INITIALIZATION (SAFE / IDEMPOTENT)
// ---------------------------------------------------------------------------
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

PulseRealm.__senses        ??= [];
PulseRealm.__sensesQueue     ??= [];
PulseRealm.__sensesSandbox   ??= {};

console.log("🧬 PulseRealm Initialized:", PulseRealm);
// ============================================================================
// PulseWorld — default export for external CDN import
// Usage:  import world from "https://port.pulseworld.net"
// Gives external developers a live handle to the running Pulse World OS state.
// The logger fix ensures these systems log helpfully, not spammy.
// ============================================================================


export const Senses = {
  name:    "Pulse Senses OS",
  version: "v30.0-IMMORTAL",
  realm:   PulseRealm,
  signature: "PulseMultiverse-Senses-Core-v2",
  ts: Date.now(),
  log:     (...args) => (PulseRealm.PulseLog   ?? console.log)(...args),
  warn:    (...args) => (PulseRealm.PulseWarn  ?? console.warn)(...args),
  error:   (...args) => (PulseRealm.PulseError ?? console.error)(...args),
};

console.log(
  "%c[PULSEWORLD::Senses] Senses Module ONLINE — Signature:",
  "color:#00FFCC; font-weight:bold; font-family:monospace;",
  Touch.signature
);
console.groupEnd();

export const senses = Senses;
// DEFAULT EXPORT (for import speed from "...")
export default senses;
