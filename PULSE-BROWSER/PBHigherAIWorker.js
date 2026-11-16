// ============================================================================
//  PBHigherAIWorker.js — Dedicated Web Worker for WebLLM (OvermindPrimes)
//  Runs completely isolated from PBCompanion Service Worker (MellowEarner,
//  WASM Earner SoakTest, WarmBoot) and UI threads.
// ============================================================================
import { CreateMLCEngine } from "./OvermindPrimes.js";
import {
  HIGHER_MODELS,
  HIGHER_DEFAULT_KEY,
  HIGHER_MAX_TOKENS,
  detectGPUCapacity,
  pickModelForGPU,
  serializeModelsList,
  buildOvermindMessages,
} from "./PBHigherModels.js";

let epoch = 0;
let hydratedOnce = false;
let enabled = false;
let userDisabled = false;
let ready = false;
let loading = false;
let generating = false;
let phase = "idle"; // idle | loading | ready | prefill | generating | error
let errorText = null;
let lastProgress = null;
let activeModelKey = null;
let gpuInfo = null;
let activeEngine = null;
let enginePromise = null;
let queue = Promise.resolve();

function post(msg) {
  try {
    self.postMessage(msg);
  } catch (_) {}
}

function broadcastProgress(p) {
  lastProgress = p;
  post({ kind: "progress", progress: p });
}

async function unloadCurrentEngine() {
  const prev = activeEngine;
  activeEngine = null;
  enginePromise = null;
  ready = false;
  loading = false;
  generating = false;
  if (prev) {
    try {
      if (typeof prev.interruptGenerate === "function") prev.interruptGenerate();
    } catch (_) {}
    try {
      if (typeof prev.unload === "function") await prev.unload();
    } catch (_) {}
  }
}

async function ensureGPU(forceRefresh = false) {
  if (!gpuInfo || forceRefresh) {
    gpuInfo = await detectGPUCapacity();
  }
  return gpuInfo;
}

function startEngineLoad(modelKey) {
  if (enginePromise) return enginePromise;

  const chosenKey = (modelKey && HIGHER_MODELS[modelKey]) ? modelKey : (activeModelKey || HIGHER_DEFAULT_KEY);
  const entry = HIGHER_MODELS[chosenKey] || HIGHER_MODELS[HIGHER_DEFAULT_KEY];
  const myEpoch = ++epoch;

  activeModelKey = chosenKey;
  ready = false;
  loading = true;
  phase = "loading";
  errorText = null;

  broadcastProgress({
    stage: "loading",
    modelKey: chosenKey,
    modelLabel: entry.label,
    progress: 0,
    text: `Initializing ${entry.label}…`,
  });

  enginePromise = (async () => {
    await unloadCurrentEngineInternalExceptPromise();
    const engine = await CreateMLCEngine(entry.id, {
      initProgressCallback: (initProgress) => {
        if (myEpoch !== epoch) return;
        broadcastProgress({
          stage: "loading",
          modelKey: chosenKey,
          modelLabel: entry.label,
          progress: initProgress.progress ?? 0,
          text: initProgress.text || "Loading…",
          timeElapsed: initProgress.timeElapsed || 0,
        });
      },
    });
    if (myEpoch !== epoch) {
      try { await engine.unload(); } catch (_) {}
      throw new Error("Model switch cancelled this load");
    }
    activeEngine = engine;
    ready = true;
    loading = false;
    phase = "ready";
    errorText = null;
    broadcastProgress({
      stage: "ready",
      modelKey: chosenKey,
      modelLabel: entry.label,
      progress: 1,
      text: `${entry.label} Ready 🧠`,
    });
    return engine;
  })().catch((err) => {
    if (myEpoch === epoch) {
      enginePromise = null;
      activeEngine = null;
      ready = false;
      loading = false;
      phase = "error";
      errorText = err && err.message ? err.message : String(err);
      broadcastProgress({
        stage: "error",
        modelKey: chosenKey,
        modelLabel: entry.label,
        text: "AI failed to load: " + errorText,
      });
    }
    throw err;
  });

  return enginePromise;
}

async function unloadCurrentEngineInternalExceptPromise() {
  const prev = activeEngine;
  activeEngine = null;
  if (prev) {
    try {
      if (typeof prev.interruptGenerate === "function") prev.interruptGenerate();
    } catch (_) {}
    try {
      if (typeof prev.unload === "function") await prev.unload();
    } catch (_) {}
  }
}

async function getStatusSnapshot(autoResume = false) {
  const gpu = await ensureGPU(false);
  const recommendedKey = pickModelForGPU(gpu, null);
  const recommendedEntry = HIGHER_MODELS[recommendedKey];
  const modelKey = activeModelKey || recommendedKey;
  const entry = HIGHER_MODELS[modelKey] || recommendedEntry;

  if (autoResume && enabled && !userDisabled && !enginePromise && !loading && !ready) {
    startEngineLoad(modelKey).catch((err) => {
      console.error("[PBHigherAIWorker] Auto-resume failed:", err);
    });
  }

  return {
    ok: true,
    enabled,
    userDisabled,
    ready,
    loading,
    generating,
    phase,
    error: errorText,
    lastProgress,
    modelKey,
    modelLabel: entry.label,
    recommendedKey,
    recommendedLabel: recommendedEntry.label,
    gpuInfo: gpu,
    models: serializeModelsList(),
  };
}

async function runAsk(id, promptText) {
  if (!enabled) {
    post({
      kind: "reply",
      id,
      prompt: promptText || null,
      text: "⚠️ AI is not enabled yet. Click Enable to download and start the model first.",
      error: true,
    });
    return;
  }

  const chosenKey = activeModelKey || HIGHER_DEFAULT_KEY;
  const entry = HIGHER_MODELS[chosenKey] || HIGHER_MODELS[HIGHER_DEFAULT_KEY];

  try {
    generating = true;
    phase = ready ? "prefill" : "loading";
    post({
      kind: "stream",
      id,
      modelKey: chosenKey,
      modelLabel: entry.label,
      phase,
      text: "",
    });

    const engine = await startEngineLoad(chosenKey);
    phase = "prefill";
    post({
      kind: "stream",
      id,
      modelKey: chosenKey,
      modelLabel: entry.label,
      phase: "prefill",
      text: "",
    });

    const messages = buildOvermindMessages(promptText, entry);
    const maxTokens = (entry.vramMinMB || 0) < 2500 ? 1024 : HIGHER_MAX_TOKENS;

    const asyncChunks = await engine.chat.completions.create({
      messages,
      max_tokens: maxTokens,
      temperature: 0.6,
      top_p: 0.9,
      repetition_penalty: 1.1,
      stream: true,
    });

    let fullText = "";
    let lastEmitAt = 0;
    phase = "generating";

    for await (const chunk of asyncChunks) {
      const delta = chunk?.choices?.[0]?.delta?.content || "";
      if (delta) {
        fullText += delta;
        const now = Date.now();
        if (now - lastEmitAt >= 120) {
          lastEmitAt = now;
          post({
            kind: "stream",
            id,
            modelKey: chosenKey,
            modelLabel: entry.label,
            phase: "generating",
            text: fullText,
          });
        }
      }
    }

    generating = false;
    phase = "ready";

    const clean = fullText.trim();
    const finalText = clean || "⚠️ Model finished without output tokens — please try sending again.";
    post({
      kind: "reply",
      id,
      prompt: promptText || null,
      text: finalText,
      modelKey: chosenKey,
      modelLabel: entry.label,
      error: !clean,
    });
  } catch (err) {
    generating = false;
    phase = ready ? "ready" : "error";
    const errMsg = err && err.message ? err.message : String(err);
    // If the engine/device itself failed, clear promise so next call can cleanly recover
    if (/device|lost|disposed|not loaded|aborted/i.test(errMsg)) {
      enginePromise = null;
      activeEngine = null;
      ready = false;
    }
    post({
      kind: "reply",
      id,
      prompt: promptText || null,
      text: "⚠️ AI Overmind could not answer: " + errMsg,
      error: true,
    });
  }
}

self.onmessage = async (event) => {
  const msg = event.data;
  if (!msg || !msg.op) return;
  const reqId = msg.reqId;

  try {
    if (msg.op === "hydrate") {
      if (!hydratedOnce && !enabled && !userDisabled && !activeModelKey) {
        if (typeof msg.enabled === "boolean") enabled = msg.enabled;
        if (typeof msg.userDisabled === "boolean") userDisabled = msg.userDisabled;
        if (msg.modelKey && HIGHER_MODELS[msg.modelKey]) activeModelKey = msg.modelKey;
      }
      hydratedOnce = true;
      const snap = await getStatusSnapshot(false);
      post({ kind: "rpc", reqId, data: snap });
      return;
    }

    if (msg.op === "status") {
      const gpu = await ensureGPU(Boolean(msg.refreshGpu));
      gpuInfo = gpu;
      const snap = await getStatusSnapshot(Boolean(msg.autoResume));
      post({ kind: "rpc", reqId, data: snap });
      return;
    }

    if (msg.op === "enable") {
      const gpu = await ensureGPU(true);
      const targetKey = pickModelForGPU(gpu, msg.modelKey || null);
      const changed = activeModelKey && activeModelKey !== targetKey;
      if (changed) {
        epoch++;
        await unloadCurrentEngine();
        lastProgress = null;
        errorText = null;
      }
      activeModelKey = targetKey;
      enabled = true;
      userDisabled = false;
      startEngineLoad(targetKey).catch((err) => {
        console.error("[PBHigherAIWorker] Pre-load failed:", err);
      });
      const entry = HIGHER_MODELS[targetKey];
      post({
        kind: "rpc",
        reqId,
        data: {
          ok: true,
          gpuInfo: gpu,
          modelKey: targetKey,
          modelLabel: entry.label,
          ready,
          loading,
          lastProgress,
        },
      });
      return;
    }

    if (msg.op === "switch") {
      const newKey = msg.modelKey;
      if (!newKey || !HIGHER_MODELS[newKey]) {
        post({ kind: "rpc", reqId, data: { ok: false, error: "Unknown model: " + newKey } });
        return;
      }
      epoch++;
      await unloadCurrentEngine();
      lastProgress = null;
      errorText = null;
      activeModelKey = newKey;
      enabled = true;
      userDisabled = false;
      const entry = HIGHER_MODELS[newKey];
      startEngineLoad(newKey).catch((err) => {
        console.error("[PBHigherAIWorker] Switch pre-load failed:", err);
      });
      post({
        kind: "rpc",
        reqId,
        data: {
          ok: true,
          modelKey: newKey,
          modelLabel: entry.label,
        },
      });
      return;
    }

    if (msg.op === "disable") {
      epoch++;
      enabled = false;
      userDisabled = true;
      lastProgress = null;
      errorText = null;
      phase = "idle";
      await unloadCurrentEngine();
      post({ kind: "rpc", reqId, data: { ok: true } });
      return;
    }

    if (msg.op === "ask") {
      const promptId = msg.promptId;
      const promptText = msg.prompt;
      const run = queue.then(() => runAsk(promptId, promptText));
      queue = run.catch(() => {});
      post({ kind: "rpc", reqId, data: { ok: true, id: promptId } });
      return;
    }
  } catch (err) {
    post({ kind: "rpc", reqId, data: { ok: false, error: err && err.message ? err.message : String(err) } });
  }
};
