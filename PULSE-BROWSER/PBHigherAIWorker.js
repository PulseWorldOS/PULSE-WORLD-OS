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
  resolveModelIdForGPU,
  getF32FallbackModelId,
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

// Finds the REAL closing </think> tag (case-insensitive), scanning from the END so any
// quoted or inline "</think>" inside reasoning (e.g. `</think>`, "</think>", `</think> block`)
// is never mistaken for the real end of thinking.
function pwFindThinkClose(text, from) {
  const lower = text.toLowerCase();
  let fallback = -1;
  let i = lower.length;
  while ((i = lower.lastIndexOf("</think>", i - 1)) !== -1 && i >= from) {
    const afterStr = text.slice(i + 8, i + 24);
    const afterChar = afterStr.charAt(0);
    const lineStart = text.lastIndexOf("\n", i - 1) + 1;
    const beforeSameLine = text.slice(Math.max(from, lineStart, i - 24), i);
    const quoted =
      afterChar === "`" || afterChar === "'" || afterChar === "\"" ||
      /[`'"]$/.test(beforeSameLine) ||
      /<think>/i.test(beforeSameLine) ||
      /\.\.\.$/.test(beforeSameLine) ||
      /^[ \t]*(?:block|tag|token|section|before|after|marker)/i.test(afterStr);
    if (quoted) continue;
    // Prefer a real block-closing </think> followed by newline or end-of-string
    if (afterChar === "" || afterChar === "\n" || afterChar === "\r") return i;
    if (fallback === -1) fallback = i;
  }
  return fallback;
}

// Splits model output into { hasThink, closed, think, answer }.
// Handles both "<think>…</think>answer" and template-prefixed thinking ("…</think>answer").
function pwSplitThink(raw) {
  const text = String(raw ?? "");
  const startMatch = text.match(/^\s*<think>/i);
  const bodyStart = startMatch ? startMatch[0].length : 0;
  const closeIdx = pwFindThinkClose(text, bodyStart);
  if (!startMatch && closeIdx === -1) {
    return { hasThink: false, closed: false, think: "", answer: text };
  }
  if (closeIdx === -1) {
    return { hasThink: true, closed: false, think: text.slice(bodyStart), answer: "" };
  }
  let answer = text.slice(closeIdx + 8);
  answer = answer.replace(/^\s*<think>\s*<\/think>\s*/i, "");
  return { hasThink: true, closed: true, think: text.slice(bodyStart, closeIdx), answer };
}

// Canonical form sent to the UI: quoted tags inside thoughts are neutralised so the
// renderer can never close the thinking block early.
function pwNormalizeThinkText(raw) {
  const s = pwSplitThink(raw);
  if (!s.hasThink) return String(raw ?? "");
  const safeThink = s.think.replace(/<\/?think>/gi, (t) => t.replace("<", "‹").replace(">", "›"));
  return "<think>\n" + safeThink.trim() + (s.closed ? "\n</think>\n\n" + s.answer.trimStart() : "");
}

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
    const gpu = await ensureGPU(false);
    let targetModelId = resolveModelIdForGPU(entry.id, gpu);
    const makeProgressCb = (labelSuffix = "") => (initProgress) => {
      if (myEpoch !== epoch) return;
      broadcastProgress({
        stage: "loading",
        modelKey: chosenKey,
        modelLabel: entry.label + labelSuffix,
        progress: initProgress.progress ?? 0,
        text: initProgress.text || "Loading…",
        timeElapsed: initProgress.timeElapsed || 0,
      });
    };

    const isExtendedCtxCandidate = !/\-1k/i.test(targetModelId) && (
      /Qwen3|DeepSeek-R1/i.test(targetModelId) || (entry.vramMinMB || 0) >= 4000
    );
    const loadWithOptionalExtendedCtx = async (modelIdToLoad, suffix) => {
      const cfg = { initProgressCallback: makeProgressCb(suffix) };
      if (isExtendedCtxCandidate) {
        try {
          return await CreateMLCEngine(modelIdToLoad, cfg, { context_window_size: 8192 });
        } catch (ctxErr) {
          const ctxMsg = String(ctxErr?.message || ctxErr);
          if (/sliding_window|context_window|memory|buffer|allocation/i.test(ctxMsg)) {
            return await CreateMLCEngine(modelIdToLoad, cfg);
          }
          throw ctxErr;
        }
      }
      return await CreateMLCEngine(modelIdToLoad, cfg);
    };

    let engine;
    try {
      engine = await loadWithOptionalExtendedCtx(targetModelId, targetModelId !== entry.id ? " [f32]" : "");
    } catch (firstErr) {
      const msgErr = String(firstErr?.message || firstErr);
      const f32Fallback = getF32FallbackModelId(targetModelId);
      if (f32Fallback && f32Fallback !== targetModelId && /ShaderModule|shader-f16|compute stage|index_kernel/i.test(msgErr)) {
        targetModelId = f32Fallback;
        engine = await loadWithOptionalExtendedCtx(targetModelId, " [f32]");
      } else {
        throw firstErr;
      }
    }
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

    try {
      if (typeof engine.resetChat === "function") {
        await engine.resetChat();
      }
    } catch (_) {}

    const messages = buildOvermindMessages(promptText, entry);
    const isReasoningModel = /Qwen3|DeepSeek-R1/i.test(entry.id || "");
    const maxTokens = isReasoningModel
      ? 6144
      : ((entry.vramMinMB || 0) < 2500 ? 2048 : HIGHER_MAX_TOKENS);

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
            text: pwNormalizeThinkText(fullText),
          });
        }
      }
    }

    // Safety net for <think> reasoning models: if the model filled the token/context
    // budget inside its thinking without outputting a spoken reply after the real </think>,
    // close </think> and run an immediate direct-answer pass (enable_thinking: false)
    // so the user always sees BOTH the full thought block AND the full spoken answer.
    // NOTE: uses pwSplitThink() so "<think>"/"</think>" words QUOTED inside the reasoning
    // (e.g. `<think>...</think>`) are never mistaken for the real end of thinking.
    const split = pwSplitThink(fullText);
    const hasThinkTag = split.hasThink;
    const spokenPart = hasThinkTag ? split.answer.trim() : fullText.trim();

    if (hasThinkTag && !spokenPart) {
      const thinkTail = split.think.trim().slice(-1600);
      fullText = "<think>\n" + split.think.trim() + "\n</think>\n\n";
      post({
        kind: "stream",
        id,
        modelKey: chosenKey,
        modelLabel: entry.label,
        phase: "generating",
        text: pwNormalizeThinkText(fullText),
      });

      try {
        if (typeof engine.resetChat === "function") {
          await engine.resetChat();
        }
        const followUpMessages = [
          messages[0],
          {
            role: "user",
            content: `${messages[1].content}\n\n[Your completed internal reasoning notes: ${thinkTail}]\nNow write your complete, direct spoken response to the user (no more reasoning, just the final answer):`,
          },
        ];
        const followUpChunks = await engine.chat.completions.create({
          messages: followUpMessages,
          max_tokens: 2048,
          temperature: 0.6,
          top_p: 0.9,
          repetition_penalty: 1.1,
          extra_body: { enable_thinking: false },
          stream: true,
        });
        let followUpText = "";
        for await (const chunk of followUpChunks) {
          const delta = chunk?.choices?.[0]?.delta?.content || "";
          if (delta) {
            followUpText += delta;
            const cleanedFollowUp = followUpText.replace(/^<think>\s*<\/think>\s*/i, "");
            const now = Date.now();
            if (now - lastEmitAt >= 120) {
              lastEmitAt = now;
              post({
                kind: "stream",
                id,
                modelKey: chosenKey,
                modelLabel: entry.label,
                phase: "generating",
                text: pwNormalizeThinkText(fullText + cleanedFollowUp),
              });
            }
          }
        }
        const finalFollowUp = followUpText.replace(/^<think>\s*<\/think>\s*/i, "").trim();
        if (finalFollowUp) {
          fullText += finalFollowUp;
        }
      } catch (followErr) {
        console.warn("[PBHigherAIWorker] Follow-up spoken pass failed:", followErr);
      }
    }

    generating = false;
    phase = "ready";

    const clean = pwNormalizeThinkText(fullText).trim();
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
