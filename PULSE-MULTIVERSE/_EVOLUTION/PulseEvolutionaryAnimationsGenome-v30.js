// ============================================================================
// FILE: /_EVOLUTION/PulseEvolutionaryAnimationsGenome-v30.js
// PULSE OS — v30-IMMORTAL-EVOLUTIONARY
// UNIVERSAL ANIMATION GENOME (A0+ ANIMATION MEMBRANE)
// ============================================================================
//
// ROLE (v30 IMMORTAL):
//   Next-gen universal animation membrane for Pulse OS UI.
//   v20 → v30: more dimensionality, more hooks, more determinism.
//
//   • deterministic, GPU-friendly, mobile-safe
//   • binary-aware, contrast-aware motion
//   • neon-native, HDR-friendly glow pulses
//   • cinematic breathing + heartbeat + focus states
//   • vault / door / portal / wormhole sequences
//   • smoke / fog / volumetric particle atmospherics
//   • mascot / character / avatar hooks (multi-state)
//   • weather + wildlife FX (Belize-tropic, day/night aware)
//   • Earn / economy / badge / streak FX
//   • route / CNS / impulse / memory-aware hooks
//   • sound / picture / haptic hooks via data- attributes
//   • shimmer v5, impulse-flash v4, scanline v4, binary-flow v2
//   • evolvable asset mapping via Organism Map
//
// CONTRACT:
//   • This genome is STATIC but EVOLVABLE.
//   • Always included by PulseEvolutionaryStyles-v30.
//   • Never duplicated, never drifted, never mutated at runtime.
//   • Page-specific animation skills may override or extend it.
//
// SAFETY:
//   • IMMORTAL: deterministic, drift-proof, no side effects.
//   • DOM-safe: applied only through the Styles Organ.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



export const PulseEvolutionaryAnimationsBaseGenomeV30 = Object.freeze({
  id: "base_animations_v30",
  kind: "animation_pack",
  version: "30.0-Immortal-Evolutionary",
  description: "Universal Pulse OS v30 Animation Genome (A0+ Animation Membrane)",

  css: `
/* ============================================================================  
   PulseEvolutionaryAnimations.css — v30‑IMMORTAL
   UNIVERSAL ANIMATION ORGAN FOR PULSE UI (EVOLVABLE)
   ============================================================================ */

/* CORE TIMING + MOTION TOKENS ---------------------------------------------- */
:root {
  /* Time scales */
  --evo-fast:        0.22s;
  --evo-fast-plus:   0.16s;
  --evo-med:         0.50s;
  --evo-slow:        1.15s;
  --evo-loop-short:  2.2s;
  --evo-loop-med:    4.4s;
  --evo-loop-long:   8.8s;

  /* Motion curves */
  --evo-ease-soft:   cubic-bezier(0.25, 0.1, 0.25, 1.0);
  --evo-ease-snappy: cubic-bezier(0.2, 0.8, 0.2, 1.0);
  --evo-ease-breath: cubic-bezier(0.4, 0.0, 0.2, 1.0);

  /* Neon palette (HDR-aware) */
  --evo-neon-cyan:    #00eaff;
  --evo-neon-green:   #00ff99;
  --evo-neon-red:     #ff4d4d;
  --evo-neon-gold:    #ffd700;
  --evo-neon-purple:  #b300ff;
  --evo-neon-blue:    #4da3ff;
  --evo-neon-amber:   #ffb347;
  --evo-neon-pink:    #ff4dff;

  /* Binary / CNS accent tokens */
  --evo-binary-line:  rgba(0,255,255,0.4);
  --evo-cns-pulse:    rgba(0,255,150,0.7);

  /* Evolvable picture registry */
  --picture-toucan-silhouette: "";
  --picture-jaguar-eyes: "";
  --picture-dolphin-silhouette: "";
  --picture-ocean-wave-tile: "";
  --picture-mascot-idle: "";
  --picture-mascot-alert: "";
  --picture-mascot-sleep: "";
  --picture-vault-bg: "";
  --picture-belize-sunset: "";
  --picture-belize-night: "";

  /* Evolvable sound registry */
  --sound-vault-open: "";
  --sound-mascot-talk: "";
  --sound-earn-badge: "";
  --sound-streak-up: "";
  --sound-route-complete: "";

  /* Evolvable haptic registry (semantic tokens) */
  --haptic-tap-soft: "";
  --haptic-tap-strong: "";
  --haptic-earn: "";
}

/* ============================================================================  
   PULSE GLOW v4 (HDR-aware, softer base, stronger crest)
   ============================================================================ */
@keyframes pulse-glow-v4 {
  0%   { box-shadow: 0 0 4px rgba(0,255,255,0.18); }
  35%  { box-shadow: 0 0 26px rgba(0,255,255,0.78); }
  70%  { box-shadow: 0 0 14px rgba(0,255,255,0.45); }
  100% { box-shadow: 0 0 4px rgba(0,255,255,0.18); }
}

.evo-pulse {
  animation: pulse-glow-v4 2.6s var(--evo-ease-soft) infinite;
}

/* ============================================================================  
   BREATHING PANEL v4 (focus-aware)
   ============================================================================ */
@keyframes evo-breathe-v4 {
  0%   { transform: scale(1); opacity: 0.9; }
  40%  { transform: scale(1.015); opacity: 1; }
  60%  { transform: scale(1.025); opacity: 1; }
  100% { transform: scale(1); opacity: 0.9; }
}

.evo-breathe {
  animation: evo-breathe-v4 4.4s var(--evo-ease-breath) infinite;
}

.evo-breathe-focus {
  animation: evo-breathe-v4 3.2s var(--evo-ease-breath) infinite;
  outline: 1px solid rgba(0,234,255,0.5);
  outline-offset: 2px;
}

/* ============================================================================  
   SHIMMER v5 (directional + intensity token)
   ============================================================================ */
@keyframes evo-shimmer-v5 {
  0%   { transform: translateX(-180%); opacity: 0.0; }
  10%  { opacity: 0.4; }
  90%  { opacity: 0.4; }
  100% { transform: translateX(180%); opacity: 0.0; }
}

.evo-shimmer {
  position: relative;
  overflow: hidden;
}

.evo-shimmer::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 180%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent 0%,
    rgba(255,255,255,0.18) 50%,
    transparent 100%
  );
  transform: translateX(-180%);
  animation: evo-shimmer-v5 2.6s linear infinite;
}

/* ============================================================================  
   NEON FLICKER v4 (subtle, less eye fatigue)
   ============================================================================ */
@keyframes evo-flicker-v4 {
  0%, 16%, 22%, 48%, 100% { opacity: 1; }
  18%, 20%, 50%          { opacity: 0.38; }
}

.evo-flicker {
  animation: evo-flicker-v4 3.4s linear infinite;
}

/* ============================================================================  
   BINARY SCAN v4
   ============================================================================ */
@keyframes evo-scan-v4 {
  0%   { background-position: 0 0; }
  100% { background-position: 0 140%; }
}

.evo-binary-scan {
  background-image: repeating-linear-gradient(
    to bottom,
    rgba(0,255,255,0.12) 0px,
    rgba(0,255,255,0.12) 2px,
    transparent 2px,
    transparent 6px
  );
  animation: evo-scan-v4 1.8s linear infinite;
}

/* ============================================================================  
   ORGANISM HEARTBEAT v4
   ============================================================================ */
@keyframes evo-heartbeat-v4 {
  0%   { transform: scale(1); }
  16%  { transform: scale(1.08); }
  32%  { transform: scale(1); }
  54%  { transform: scale(1.05); }
  76%  { transform: scale(1); }
  100% { transform: scale(1); }
}

.evo-heartbeat {
  animation: evo-heartbeat-v4 3.0s var(--evo-ease-breath) infinite;
}

/* ============================================================================  
   CNS IMPULSE FLASH v4
   ============================================================================ */
@keyframes evo-impulse-flash-v4 {
  0%   { box-shadow: 0 0 0 rgba(0,255,255,0); }
  35%  { box-shadow: 0 0 30px rgba(0,255,255,0.8); }
  100% { box-shadow: 0 0 0 rgba(0,255,255,0); }
}

.evo-impulse {
  animation: evo-impulse-flash-v4 0.44s var(--evo-ease-snappy);
}

/* ============================================================================  
   ROUTE TRANSITION GLOW v3
   ============================================================================ */
@keyframes evo-route-transition-v3 {
  0%   { box-shadow: 0 0 0 rgba(0,255,255,0); }
  50%  { box-shadow: 0 0 24px rgba(0,255,255,0.55); }
  100% { box-shadow: 0 0 0 rgba(0,255,255,0); }
}

.evo-route-active {
  animation: evo-route-transition-v3 0.6s var(--evo-ease-snappy);
}

/* ============================================================================  
   IMMORTAL TIER GLOW v3
   ============================================================================ */
@keyframes evo-immortal-glow-v3 {
  0%   { filter: drop-shadow(0 0 6px rgba(180,0,255,0.45)); }
  50%  { filter: drop-shadow(0 0 18px rgba(180,0,255,0.9)); }
  100% { filter: drop-shadow(0 0 6px rgba(180,0,255,0.45)); }
}

.evo-immortal {
  animation: evo-immortal-glow-v3 3.0s var(--evo-ease-soft) infinite;
}

/* ============================================================================  
   VAULT / DOOR / PORTAL / WORMHOLE PACK
   ============================================================================ */
@keyframes evo-vault-wheel-spin-v2 {
  0%   { transform: rotate(0deg); }
  40%  { transform: rotate(140deg); }
  100% { transform: rotate(200deg); }
}

@keyframes evo-vault-door-open-v2 {
  0%   { transform: translateZ(0) rotateY(0deg); }
  40%  { transform: translateZ(12px) rotateY(-28deg); }
  100% { transform: translateZ(24px) rotateY(-65deg); }
}

.evo-vault {
  position: relative;
  transform-style: preserve-3d;
  perspective: 1300px;
}

.evo-vault-wheel {
  animation: evo-vault-wheel-spin-v2 1.5s var(--evo-ease-snappy) forwards;
  transform-origin: center;
}

.evo-vault-door {
  transform-origin: left center;
  animation: evo-vault-door-open-v2 1.7s var(--evo-ease-snappy) forwards;
}

@keyframes evo-vault-smoke-v2 {
  0%   { opacity: 0; transform: scale(0.8) translateY(10px); filter: blur(6px); }
  40%  { opacity: 0.95; transform: scale(1.06) translateY(0); filter: blur(11px); }
  100% { opacity: 0; transform: scale(1.25) translateY(-12px); filter: blur(15px); }
}

.evo-vault-smoke {
  pointer-events: none;
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, rgba(255,255,255,0.2), transparent 60%);
  mix-blend-mode: screen;
  animation: evo-vault-smoke-v2 1.4s var(--evo-ease-soft) forwards;
}

/* PORTAL / WORMHOLE -------------------------------------------------------- */
@keyframes evo-portal-open-v2 {
  0%   { transform: scale(0.4); opacity: 0; box-shadow: 0 0 0 rgba(0,255,255,0); }
  50%  { transform: scale(1.08); opacity: 1; box-shadow: 0 0 30px rgba(0,255,255,0.8); }
  100% { transform: scale(1); opacity: 1; box-shadow: 0 0 14px rgba(0,255,255,0.45); }
}

@keyframes evo-portal-swirl-v2 {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.evo-portal {
  position: relative;
  border-radius: 999px;
  border: 1px solid rgba(0,255,255,0.55);
  box-shadow: 0 0 20px rgba(0,255,255,0.65);
  animation: evo-portal-open-v2 0.85s var(--evo-ease-snappy) forwards;
}

.evo-portal-ring {
  position: absolute;
  inset: 10%;
  border-radius: 999px;
  border: 1px solid rgba(0,255,255,0.4);
  animation: evo-portal-swirl-v2 5.4s linear infinite;
}

/* ============================================================================  
   SMOKE / FOG / VOLUMETRIC PARTICLE PACK
   ============================================================================ */
@keyframes evo-smoke-vortex-v2 {
  0%   { transform: translate(-10px, 10px) scale(0.9); opacity: 0.0; }
  30%  { opacity: 0.7; }
  60%  { transform: translate(10px, -10px) scale(1.08); opacity: 0.85; }
  100% { transform: translate(22px, -22px) scale(1.18); opacity: 0; }
}

.evo-smoke-vortex {
  position: absolute;
  inset: -40px;
  background: radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%);
  mix-blend-mode: screen;
  filter: blur(10px);
  pointer-events: none;
  animation: evo-smoke-vortex-v2 4.6s var(--evo-ease-soft) infinite;
}

@keyframes evo-cyber-mist-v2 {
  0%   { transform: translateX(-22px); opacity: 0.0; }
  20%  { opacity: 0.4; }
  80%  { opacity: 0.4; }
  100% { transform: translateX(22px); opacity: 0.0; }
}

.evo-cyber-mist {
  position: absolute;
  inset: -30px;
  background: linear-gradient(
    to right,
    rgba(0,255,255,0.10),
    rgba(0,255,150,0.12),
    rgba(0,255,255,0.10)
  );
  mix-blend-mode: screen;
  filter: blur(12px);
  pointer-events: none;
  animation: evo-cyber-mist-v2 8.6s linear infinite;
}

@keyframes evo-particle-burst-v2 {
  0%   { transform: translate(0,0) scale(0.4); opacity: 1; }
  100% { transform: translate(var(--evo-px, 20px), var(--evo-py, -20px)) scale(1.25); opacity: 0; }
}

.evo-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: radial-gradient(circle, #00eaff, transparent 70%);
  pointer-events: none;
  animation: evo-particle-burst-v2 0.7s var(--evo-ease-snappy) forwards;
}

/* ============================================================================  
   MASCOT / CHARACTER / AVATAR PACK v2
   ============================================================================ */
@keyframes evo-mascot-idle-v2 {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-4px); }
  100% { transform: translateY(0); }
}

@keyframes evo-mascot-blink-v2 {
  0%, 92%, 100% { transform: scaleY(1); }
  94%, 96%      { transform: scaleY(0.1); }
}

@keyframes evo-mascot-talk-v2 {
  0%   { transform: scaleY(1); }
  25%  { transform: scaleY(0.7); }
  50%  { transform: scaleY(1.1); }
  75%  { transform: scaleY(0.8); }
  100% { transform: scaleY(1); }
}

@keyframes evo-mascot-breathe-sleep {
  0%   { transform: translateY(0) scale(1); opacity: 0.8; }
  50%  { transform: translateY(2px) scale(0.98); opacity: 1; }
  100% { transform: translateY(0) scale(1); opacity: 0.8; }
}

.evo-mascot {
  transform-origin: center bottom;
  animation: evo-mascot-idle-v2 4.0s var(--evo-ease-breath) infinite;
}

.evo-mascot-eyes {
  transform-origin: center;
  animation: evo-mascot-blink-v2 6.2s linear infinite;
}

.evo-mascot-mouth-talking {
  transform-origin: center;
  animation: evo-mascot-talk-v2 0.30s var(--evo-ease-snappy) infinite;
}

.evo-mascot-sleep {
  background-image: var(--picture-mascot-sleep);
  animation: evo-mascot-breathe-sleep 5.4s var(--evo-ease-breath) infinite;
}

/* ============================================================================  
   WEATHER FX PACK (BELIZE TROPIC v2)
   ============================================================================ */
@keyframes evo-rain-fall-v2 {
  0%   { background-position: 0 -40px; opacity: 0.0; }
  10%  { opacity: 0.5; }
  90%  { opacity: 0.5; }
  100% { background-position: 0 40px; opacity: 0.0; }
}

.evo-weather-rain {
  pointer-events: none;
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
    to bottom,
    rgba(0,255,255,0.38) 0px,
    transparent 40px
  );
  background-size: 2px 40px;
  mix-blend-mode: screen;
  animation: evo-rain-fall-v2 1.3s linear infinite;
}

@keyframes evo-lightning-flash-v2 {
  0%, 92%, 100% { opacity: 0; }
  94%          { opacity: 1; }
  96%          { opacity: 0.25; }
}

.evo-weather-storm {
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.95), transparent 60%);
  mix-blend-mode: screen;
  opacity: 0;
  animation: evo-lightning-flash-v2 3.6s linear infinite;
}

@keyframes evo-sun-glow-v2 {
  0%   { transform: scale(0.95); opacity: 0.7; }
  50%  { transform: scale(1.06); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.7; }
}

.evo-weather-sun {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 999px;
  background: radial-gradient(circle, #ffd700, transparent 70%);
  mix-blend-mode: screen;
  animation: evo-sun-glow-v2 5.0s var(--evo-ease-breath) infinite;
}

/* CLOUD DRIFT --------------------------------------------------------------- */
@keyframes evo-cloud-drift-v2 {
  0%   { transform: translateX(-40px); opacity: 0.0; }
  20%  { opacity: 0.65; }
  80%  { opacity: 0.65; }
  100% { transform: translateX(40px); opacity: 0.0; }
}

.evo-weather-clouds {
  position: absolute;
  inset: 10% 0 40% 0;
  background: radial-gradient(circle, rgba(255,255,255,0.45), transparent 70%);
  filter: blur(10px);
  mix-blend-mode: screen;
  animation: evo-cloud-drift-v2 17s linear infinite;
}

/* DAY / NIGHT BACKDROP ------------------------------------------------------ */
.evo-belize-sunset {
  background-image: var(--picture-belize-sunset);
  background-size: cover;
  background-position: center;
}

.evo-belize-night {
  background-image: var(--picture-belize-night);
  background-size: cover;
  background-position: center;
}

/* ============================================================================  
   WILDLIFE FX PACK (BELIZE v2)
   ============================================================================ */

/* TOUCAN FLYBY -------------------------------------------------------------- */
@keyframes evo-toucan-fly-v2 {
  0%   { transform: translateX(-20%) translateY(-10px); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateX(120%) translateY(10px); opacity: 0; }
}

.evo-wildlife-toucan {
  position: absolute;
  top: 12%;
  left: -20%;
  width: 120px;
  height: 60px;
  background: var(--picture-toucan-silhouette) center/contain no-repeat;
  animation: evo-toucan-fly-v2 13s linear infinite;
}

/* JAGUAR PROWL -------------------------------------------------------------- */
@keyframes evo-jaguar-prowl-v2 {
  0%   { transform: translateX(0); opacity: 0.0; }
  10%  { opacity: 0.75; }
  90%  { opacity: 0.75; }
  100% { transform: translateX(40px); opacity: 0.0; }
}

.evo-wildlife-jaguar-eyes {
  position: absolute;
  bottom: 12%;
  left: 10%;
  width: 80px;
  height: 30px;
  background: var(--picture-jaguar-eyes) center/contain no-repeat;
  animation: evo-jaguar-prowl-v2 10.5s var(--evo-ease-soft) infinite;
}

/* DOLPHIN SPLASH ------------------------------------------------------------ */
@keyframes evo-dolphin-arc-v2 {
  0%   { transform: translate(-10%, 20%) scale(0.9); opacity: 0; }
  20%  { opacity: 1; }
  50%  { transform: translate(20%, -10%) scale(1.06); }
  80%  { opacity: 1; }
  100% { transform: translate(50%, 20%) scale(0.9); opacity: 0; }
}

.evo-wildlife-dolphin {
  position: absolute;
  bottom: 8%;
  left: 5%;
  width: 120px;
  height: 80px;
  background: var(--picture-dolphin-silhouette) center/contain no-repeat;
  animation: evo-dolphin-arc-v2 15.5s var(--evo-ease-soft) infinite;
}

/* ============================================================================  
   TECH / ORGAN FX PACK v2
   ============================================================================ */

/* BINARY FLOW v2 ------------------------------------------------------------ */
@keyframes evo-binary-flow-v2 {
  0%   { background-position: 0 0; opacity: 0.0; }
  10%  { opacity: 0.45; }
  90%  { opacity: 0.45; }
  100% { background-position: 0 100%; opacity: 0.0; }
}

.evo-binary-flow {
  background-image: linear-gradient(
    to bottom,
    var(--evo-binary-line) 0px,
    transparent 18px
  );
  background-size: 2px 18px;
  animation: evo-binary-flow-v2 2.0s linear infinite;
}

/* NEURAL PULSE -------------------------------------------------------------- */
@keyframes evo-neural-pulse-v2 {
  0%   { box-shadow: 0 0 0 rgba(0,255,150,0); }
  50%  { box-shadow: 0 0 20px var(--evo-cns-pulse); }
  100% { box-shadow: 0 0 0 rgba(0,255,150,0); }
}

.evo-neural {
  animation: evo-neural-pulse-v2 2.4s var(--evo-ease-soft) infinite;
}

/* ROUTER HOP ---------------------------------------------------------------- */
@keyframes evo-router-hop-v2 {
  0%   { stroke-dashoffset: 40; }
  100% { stroke-dashoffset: 0; }
}

.evo-router-line {
  stroke-dasharray: 40;
  animation: evo-router-hop-v2 1.1s var(--evo-ease-snappy) forwards;
}

/* MEMORY SAVE --------------------------------------------------------------- */
@keyframes evo-memory-save-v2 {
  0%   { box-shadow: 0 0 0 rgba(0,255,255,0); }
  50%  { box-shadow: 0 0 20px rgba(0,255,255,0.8); }
  100% { box-shadow: 0 0 0 rgba(0,255,255,0); }
}

.evo-memory-save {
  animation: evo-memory-save-v2 0.55s var(--evo-ease-snappy);
}

/* ============================================================================  
   EARN / ECONOMY / STREAK FX PACK v2
   ============================================================================ */

/* COIN SPIN ----------------------------------------------------------------- */
@keyframes evo-coin-spin-v2 {
  0%   { transform: rotateY(0deg); }
  50%  { transform: rotateY(180deg); }
  100% { transform: rotateY(360deg); }
}

.evo-earn-coin {
  transform-style: preserve-3d;
  animation: evo-coin-spin-v2 1.3s linear infinite;
}

/* BADGE EARNED -------------------------------------------------------------- */
@keyframes evo-badge-pop-v2 {
  0%   { transform: scale(0.4); opacity: 0; }
  40%  { transform: scale(1.12); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes evo-confetti-fall-v2 {
  0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(40px) rotate(200deg); opacity: 0; }
}

.evo-badge-earned {
  animation: evo-badge-pop-v2 0.42s var(--evo-ease-snappy) forwards;
}

.evo-confetti {
  position: absolute;
  width: 6px;
  height: 10px;
  background: linear-gradient(to bottom, #ffd700, #00eaff);
  animation: evo-confetti-fall-v2 0.85s var(--evo-ease-snappy) forwards;
}

/* STREAK FLARE -------------------------------------------------------------- */
@keyframes evo-streak-flare {
  0%   { box-shadow: 0 0 0 rgba(255,215,0,0); transform: scale(1); }
  40%  { box-shadow: 0 0 26px rgba(255,215,0,0.9); transform: scale(1.06); }
  100% { box-shadow: 0 0 0 rgba(255,215,0,0); transform: scale(1); }
}

.evo-streak {
  animation: evo-streak-flare 0.7s var(--evo-ease-snappy);
}

/* ============================================================================  
   NAVIGATION / ROUTE FX PACK v2
   ============================================================================ */
@keyframes evo-route-slide-v2 {
  0%   { transform: translateX(12px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

.evo-route-enter {
  animation: evo-route-slide-v2 0.32s var(--evo-ease-snappy);
}

@keyframes evo-route-ripple-v2 {
  0%   { transform: scale(0.4); opacity: 0.7; }
  100% { transform: scale(1.7); opacity: 0; }
}

.evo-route-ripple {
  position: absolute;
  border-radius: 999px;
  border: 1px solid rgba(0,255,255,0.65);
  animation: evo-route-ripple-v2 0.55s var(--evo-ease-snappy) forwards;
}

/* ROUTE COMPLETE ------------------------------------------------------------ */
@keyframes evo-route-complete {
  0%   { box-shadow: 0 0 0 rgba(0,255,150,0); }
  50%  { box-shadow: 0 0 22px rgba(0,255,150,0.9); }
  100% { box-shadow: 0 0 0 rgba(0,255,150,0); }
}

.evo-route-complete {
  animation: evo-route-complete 0.6s var(--evo-ease-snappy);
}

/* ============================================================================  
   BRAND / AESTHETIC FX PACK v2
   ============================================================================ */
@keyframes evo-neon-ring-v2 {
  0%   { box-shadow: 0 0 6px rgba(0,234,255,0.4); }
  50%  { box-shadow: 0 0 20px rgba(0,234,255,0.95); }
  100% { box-shadow: 0 0 6px rgba(0,234,255,0.4); }
}

.evo-neon-ring {
  border-radius: 999px;
  border: 1px solid rgba(0,234,255,0.75);
  animation: evo-neon-ring-v2 3.2s var(--evo-ease-soft) infinite;
}

/* ============================================================================  
   TROPIC BELIZE PACK v2
   ============================================================================ */
@keyframes evo-palm-sway-v2 {
  0%   { transform: rotate(-2deg); }
  50%  { transform: rotate(3.5deg); }
  100% { transform: rotate(-2deg); }
}

.evo-palm {
  transform-origin: bottom center;
  animation: evo-palm-sway-v2 6.4s var(--evo-ease-breath) infinite;
}

@keyframes evo-ocean-wave-v2 {
  0%   { background-position: 0 0; }
  100% { background-position: 90px 0; }
}

.evo-ocean {
  background-image: var(--picture-ocean-wave-tile);
  background-repeat: repeat-x;
  animation: evo-ocean-wave-v2 7.6s linear infinite;
}

/* ============================================================================  
   SOUND / PICTURE / HAPTIC HOOK CLASSES
   ============================================================================ */

[data-sound] { }
[data-picture] { }
[data-haptic] { }

[data-picture="vault-bg"] {
  background-image: var(--picture-vault-bg);
}

[data-picture="mascot-idle"] {
  background-image: var(--picture-mascot-idle);
}

[data-picture="mascot-alert"] {
  background-image: var(--picture-mascot-alert);
}

[data-picture="belize-sunset"] {
  background-image: var(--picture-belize-sunset);
}

[data-picture="belize-night"] {
  background-image: var(--picture-belize-night);
}

[data-sound="vault-open"] {
  --sound-src: var(--sound-vault-open);
}

[data-sound="mascot-talk"] {
  --sound-src: var(--sound-mascot-talk);
}

[data-sound="earn-badge"] {
  --sound-src: var(--sound-earn-badge);
}

[data-sound="streak-up"] {
  --sound-src: var(--sound-streak-up);
}

[data-sound="route-complete"] {
  --sound-src: var(--sound-route-complete);
}

[data-haptic="tap-soft"] {
  --haptic-src: var(--haptic-tap-soft);
}

[data-haptic="tap-strong"] {
  --haptic-src: var(--haptic-tap-strong);
}

[data-haptic="earn"] {
  --haptic-src: var(--haptic-earn);
}
`
});
