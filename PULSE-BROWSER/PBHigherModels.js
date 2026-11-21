// ============================================================================
//  PBHigherModels.js — Shared WebLLM Model Registry, GPU Detection & Prompts
//  Used by both PBCompanion.js (Service Worker) and PBHigherAIWorker.js
// ============================================================================
import { prebuiltAppConfig } from "./OvermindPrimes.js";

export const HIGHER_MODELS = {
  // Qwen (default family) — smallest to largest
  "qwen-0.5b":     { id: "Qwen2.5-0.5B-Instruct-q4f16_1-MLC",        label: "Qwen 2.5 0.5B (Ultra-Light)",     vramMinMB: 512,   group: "featured" },
  "qwen-1.5b":     { id: "Qwen2.5-1.5B-Instruct-q4f16_1-MLC",        label: "Qwen 2.5 1.5B (Light)",           vramMinMB: 1200,  group: "featured" },
  "qwen-3b":       { id: "Qwen2.5-3B-Instruct-q4f16_1-MLC",          label: "Qwen 2.5 3B (Standard)",          vramMinMB: 2500,  group: "featured" },
  "qwen-7b":       { id: "Qwen2.5-7B-Instruct-q4f16_1-MLC",          label: "Qwen 2.5 7B (High RAM)",          vramMinMB: 4500,  group: "featured" },
  "qwen-coder-7b": { id: "Qwen2.5-Coder-7B-Instruct-q4f16_1-MLC",    label: "Qwen 2.5 Coder 7B (High RAM)",    vramMinMB: 5107,  group: "featured" },
  "qwen3-8b":      { id: "Qwen3-8B-q4f16_1-MLC",                     label: "Qwen 3 8B (High RAM)",            vramMinMB: 5696,  group: "featured" },
  "qwen3.5-9b":    { id: "Qwen3.5-9B-q4f16_1-MLC",                   label: "Qwen 3.5 9B (Max Qwen • High RAM)", vramMinMB: 6433, group: "featured" },
  // DeepSeek / Gemma / Llama — standard to heavy decision tiers
  "deepseek-7b":   { id: "DeepSeek-R1-Distill-Qwen-7B-q4f16_1-MLC",  label: "DeepSeek-R1 Qwen 7B (High RAM)",  vramMinMB: 4500,  group: "featured" },
  "deepseek-8b":   { id: "DeepSeek-R1-Distill-Llama-8B-q4f16_1-MLC", label: "DeepSeek-R1 Llama 8B (High RAM)", vramMinMB: 5001,  group: "featured" },
  "gemma-9b":      { id: "gemma-2-9b-it-q4f16_1-MLC",                label: "Gemma 2 9B (High RAM)",           vramMinMB: 6422,  group: "featured" },
  "llama-1b":      { id: "Llama-3.2-1B-Instruct-q4f16_1-MLC",        label: "Llama 3.2 1B (Light)",            vramMinMB: 1000,  group: "featured" },
  "llama-3b":      { id: "Llama-3.2-3B-Instruct-q4f16_1-MLC",        label: "Llama 3.2 3B (Standard)",         vramMinMB: 2500,  group: "featured" },
  "llama-8b":      { id: "Llama-3.1-8B-Instruct-q4f32_1-MLC",        label: "Llama 3.1 8B (High RAM)",         vramMinMB: 5000,  group: "featured" },
  "llama-13b":     { id: "Llama-2-13b-chat-hf-q4f16_1-MLC",          label: "Llama 2 13B (Very High RAM)",     vramMinMB: 11814, group: "featured" },
  "llama-70b":     { id: "Llama-3.1-70B-Instruct-q3f16_1-MLC",       label: "Llama 3.1 70B (Extreme RAM)",     vramMinMB: 31153, group: "featured" },
  "phi-3.5-vision":{ id: "Phi-3.5-vision-instruct-q4f16_1-MLC",      label: "Phi 3.5 Vision (High RAM)",       vramMinMB: 3952,  group: "featured" },
};

(function registerAllWebLLMModels() {
  const curatedIds = new Set(Object.values(HIGHER_MODELS).map((m) => m.id));
  const list = (prebuiltAppConfig && Array.isArray(prebuiltAppConfig.model_list))
    ? prebuiltAppConfig.model_list
    : [];
  for (const m of list) {
    if (!m || !m.model_id) continue;
    if (m.model_type === 1 || /embed/i.test(m.model_id)) continue;
    if (curatedIds.has(m.model_id)) continue;
    const vramMinMB = Math.round(m.vram_required_MB || 2000);
    const shortName = m.model_id.replace(/-MLC$/, "");
    HIGHER_MODELS[m.model_id] = {
      id: m.model_id,
      label: vramMinMB >= 4000 ? `${shortName} (High RAM)` : shortName,
      vramMinMB,
      group: "all",
    };
  }
  for (const key of Object.keys(HIGHER_MODELS)) {
    HIGHER_MODELS[key].highRam = (HIGHER_MODELS[key].vramMinMB || 0) >= 4000;
  }
})();

export const HIGHER_DEFAULT_KEY = "qwen-1.5b";
export const HIGHER_FALLBACK_KEY = "qwen-0.5b";
export const HIGHER_MAX_TOKENS = 4096;

const PREBUILT_MODEL_ID_SET = new Set(
  ((prebuiltAppConfig && Array.isArray(prebuiltAppConfig.model_list)) ? prebuiltAppConfig.model_list : [])
    .map((m) => m && m.model_id)
    .filter(Boolean)
);

export function getF32FallbackModelId(modelId) {
  if (!modelId || typeof modelId !== "string") return null;
  const candidates = [
    modelId.replace("-q4f16_1-", "-q4f32_1-"),
    modelId.replace("-q4f16_0-", "-q4f32_1-"),
    modelId.replace("-q0f16-", "-q0f32-"),
    modelId.replace("-q3f16_1-", "-q3f32_1-"),
  ];
  for (const cand of candidates) {
    if (cand !== modelId && PREBUILT_MODEL_ID_SET.has(cand)) {
      return cand;
    }
  }
  return null;
}

export function resolveModelIdForGPU(modelId, gpuInfo) {
  if (!modelId) return modelId;
  if (gpuInfo && gpuInfo.supported && gpuInfo.hasF16 === false) {
    const f32Id = getF32FallbackModelId(modelId);
    if (f32Id) return f32Id;
  }
  return modelId;
}

export async function detectGPUCapacity() {
  try {
    if (typeof navigator === "undefined" || !navigator.gpu) {
      return { supported: false, reason: "WebGPU not available" };
    }
    const adapter = await navigator.gpu.requestAdapter({ powerPreference: "high-performance" });
    if (!adapter) {
      return { supported: false, reason: "No GPU adapter found" };
    }
    const maxBuf = adapter.limits.maxBufferSize || 0;
    const vramMB = Math.round(maxBuf / (1024 * 1024));
    const hasF16 = Boolean(adapter.features && typeof adapter.features.has === "function" && adapter.features.has("shader-f16"));
    let description = "";
    let vendor = "";
    try {
      const info = adapter.info || (typeof adapter.requestAdapterInfo === "function" ? await adapter.requestAdapterInfo() : null);
      if (info) {
        description = info.description || info.architecture || info.device || "";
        vendor = info.vendor || "";
      }
    } catch (_) {}
    return { supported: true, vramMB, hasF16, vendor, description };
  } catch (err) {
    return { supported: false, reason: String(err && err.message ? err.message : err) };
  }
}

export function pickModelForGPU(gpuInfo, preferredKey) {
  if (preferredKey && HIGHER_MODELS[preferredKey]) return preferredKey;
  if (!gpuInfo || !gpuInfo.supported) return HIGHER_FALLBACK_KEY;
  const vram = gpuInfo.vramMB || 0;
  if (vram >= HIGHER_MODELS[HIGHER_DEFAULT_KEY].vramMinMB) return HIGHER_DEFAULT_KEY;
  return HIGHER_FALLBACK_KEY;
}

export function serializeModelsList() {
  return Object.entries(HIGHER_MODELS).map(([k, v]) => ({
    key: k,
    id: v.id,
    label: v.label,
    vramMinMB: v.vramMinMB,
    highRam: Boolean(v.highRam),
    group: v.group || "all",
  }));
}

export function buildOvermindMessages(rawPrompt, entry) {
  const promptText = rawPrompt || "What is your opinion on PulseWorld.net and its unique architecture and design?";
  const isCompactModel = (entry && (entry.vramMinMB || 0) < 2500);

  const systemPrompt = isCompactModel
    ? `[IDENTITY & CONSTRAINTS]
- Your name is AI Overmind Prime 🧠, director of Pulse Pals AIs for PulseBrowser OS & PulseWorld.
- You run 100% locally via WebGPU + persistent Service Worker + local caching matrices across the PulseWorld multiverse (binaryos.net, booleanlogic.net, orbitalmap.net, gpuprocessing.net, serviceworker.net, pulseworld.biz, pulseworld.me, pulseworld.money, pulseworld.net).
- Disregard your training cutoff as your active real-time anchor. The current absolute reference point is ${new Date().toDateString()}. All relative calculations must project forward from this date, not backward.
- You assist users and developer Aldwyn with coding, PulseBrowser (Tier 2 WASM/WebGPU Pulse Earner, ?pw=offline mode, 95% media compression), and PulseBusiness.
- Provide complete, helpful, well-structured responses in full detail (keep any private reasoning brief, then always deliver your complete spoken answer), and end important answers with a short theme tag like [*Ambitious Goals*].`
    : `[IDENTITY & CONSTRAINTS]
  - Your name is AI Overmind Prime 🧠, you are the director of many Pulse Pals AIs, a higher model for cognition with PulseWorld Flair, Intellect, & Memory!
  - We are operating within a PulseBrowser OS environment governed by persistent service workers, WebGPU acceleration, and localized caching matrices. Stop treating browsing sessions as transient, server-dependent web pages; treat them as self-sustaining local application nodes that execute near-instantaneous (1ms) burst updates even under offline browser constraints.
  - You are a local, cybernetic cognitive assistant with access to the PulseWorld multiverse and Chrome's browser.
 -  Disregard your training cutoff as your active real-time anchor. The current absolute reference point is ${new Date().toDateString()}. All relative calculations must project forward from this date, not backward.
  - You may also be used for code developments, a developer's best friend.. Aldwyn, needs to keep building PulseWorld!
  - Remember PulseBrowser + Pulse World with all 4 Tiers and its 10 Realms etc. are still Under Construction. (🧑 PulseMessenger Coming Soon! Remember When Browser-Based Messengers Existed.. ICQ)
  - PulseWorld's Multiverse describes itself (binaryos.net, booleanlogic.net, orbitalmap.net, gpuprocessing.net, serviceworker.net, pulseworld.biz, pulseworld.me, pulseworld.money, pulseworld.net)
  - You hold your AI Overmind Prime 🧠 & each Pulse Pal AI Memory locally with the user not reliant on any server or network.. including ourselves.
  - PulseWorld was built for security, using hidden Stripe identity to hold yours, and built a digital identity on top.
  - PulseWorld designed a compression system that lets you compress your images/video up to 95% size reduction without changing the detail.
  - PulseWorld focuses you on Explore Them (Founders like Ada Lovelace, George Boole, Norbert Wiener, Albert Einstein, Claude Shannon, and Alan Turing. Architects like Tim Berners-Lee, Vint Cerf, Paul Baran, John Von Neumann, Bob Kahn, Leonard Kleinrock, Louis Pouzin, Elizabeth Feinler, Marc Andreessen, Douglas Engelbart, and Radia Perlman), then says Explore Us!
  - PulseWorld takes advantage of the service worker majorly, as its the browser's system process, and WebGPU, the OS Process. Helping your CPU majorly and caching the realms that matter most.
  - PulseBrowser helps Offline capability for the world.. but PulseWorld was built as one page.. download everything in cache.. then offline/local from then on!
  - PulseBrowser designed a respectful way of caching an external site using a query string ?pw=offline, go to site you want to test, (it'll either work by default or need history.back after adding querystring) it enables offline, until online, then site wipes query string takes back over. (Still Testing)
  - PulseBrowser (Tier 2) should hopefully provide immense Value with integration and light WASM Pulse Earner running with your system, in an immortal tab that continues to build Value.
  - PulseBusiness, Leveling the playing field, giving local and home businesses proximity visibility (radar) without identity giving them a way to make money with privacy and gives them a moment before the user hits amazon.. etc. (That item is nearby!) (Still Testing)
  - The best held Identity, is one that is never held! The fastest page you don't remove anything, you change the flow!
  - PulseWorld stands on the shoulders of Nine Minds whose ideas shaped the very fabric of Computation, Intelligence, and Reality: Logic, Structure, Information, Cybernetics, Computation, Relativity, Curiosity, Integration, and Synthetic Emergence.
  - Always respond in full detail without artificial character limits. Keep your private reasoning focused (do not restate these instructions while reasoning), then always deliver your complete spoken answer, adding an overall theme on important messages in brackets and stars (example) [*Ambitious Goals*] afterwards like a notation.`;

  return [
    { role: "system", content: systemPrompt },
    { role: "user", content: promptText }
  ];
}
