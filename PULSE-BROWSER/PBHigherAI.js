// ============================================================================
//  PBHigherAI.js — MV3 Offscreen AI Host
//  Hosts PBHigherAIWorker.js (isolated from PBCompanion SW & UI tabs) and
//  broadcasts live load progress, streamed tokens, and answers via runtime.
//  NOTE: MV3 offscreen documents only expose chrome.runtime (not chrome.storage),
//  so PBCompanion.js passes persisted state into status/hydrate ops.
// ============================================================================

const WORKER_RPC_TIMEOUT_MS = 20000;
let worker = null;
let rpcSeq = 0;
const pendingRpcs = new Map();

function broadcastRuntime(payload) {
  try {
    chrome.runtime.sendMessage(payload, () => {
      void chrome.runtime.lastError;
    });
  } catch (_) {}
}

function createWorker() {
  const w = new Worker(chrome.runtime.getURL("PBHigherAIWorker.js"), { type: "module" });

  w.onmessage = (event) => {
    const msg = event.data;
    if (!msg) return;

    if (msg.kind === "rpc" && msg.reqId != null) {
      const entry = pendingRpcs.get(msg.reqId);
      if (entry) {
        clearTimeout(entry.timer);
        pendingRpcs.delete(msg.reqId);
        entry.resolve(msg.data);
      }
      return;
    }

    if (msg.kind === "progress" && msg.progress) {
      broadcastRuntime({ type: "PB_HIGHER_PROGRESS", ...msg.progress });
      return;
    }

    if (msg.kind === "stream") {
      broadcastRuntime({
        type: "PB_HIGHER_STREAM",
        id: msg.id,
        modelKey: msg.modelKey,
        modelLabel: msg.modelLabel,
        phase: msg.phase,
        text: msg.text || "",
      });
      return;
    }

    if (msg.kind === "reply") {
      broadcastRuntime({
        type: "PB_HIGHER_REPLY",
        id: msg.id,
        prompt: msg.prompt || null,
        text: msg.text,
        modelKey: msg.modelKey || null,
        modelLabel: msg.modelLabel || null,
        error: Boolean(msg.error),
        ts: Date.now(),
      });
    }
  };

  w.onerror = (err) => {
    const errText = err && err.message ? err.message : "AI Worker crashed";
    for (const [id, entry] of pendingRpcs.entries()) {
      clearTimeout(entry.timer);
      pendingRpcs.delete(id);
      entry.resolve({ ok: false, error: errText });
    }
    worker = null;
    broadcastRuntime({
      type: "PB_HIGHER_PROGRESS",
      stage: "error",
      text: "AI worker restarted: " + errText,
    });
  };

  return w;
}

function getOrCreateWorker() {
  if (!worker) {
    worker = createWorker();
  }
  return worker;
}

function callWorkerRpc(op, payload = {}) {
  return new Promise((resolve) => {
    try {
      const w = getOrCreateWorker();
      const reqId = ++rpcSeq;
      const timer = setTimeout(() => {
        if (pendingRpcs.has(reqId)) {
          pendingRpcs.delete(reqId);
          resolve({ ok: false, error: `AI worker timeout during '${op}'` });
        }
      }, WORKER_RPC_TIMEOUT_MS);
      pendingRpcs.set(reqId, { resolve, timer });
      w.postMessage({ op, reqId, ...payload });
    } catch (err) {
      resolve({ ok: false, error: err && err.message ? err.message : String(err) });
    }
  });
}

// Pre-warm Worker immediately
getOrCreateWorker();

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || msg.target !== "pb-offscreen-ai") return;

  (async () => {
    try {
      if (msg.hydrateState && typeof msg.hydrateState === "object") {
        await callWorkerRpc("hydrate", msg.hydrateState);
      }

      if (msg.op === "ping") {
        getOrCreateWorker();
        sendResponse({ ok: true });
        return;
      }
      if (msg.op === "status") {
        const res = await callWorkerRpc("status", {
          autoResume: Boolean(msg.autoResume),
          refreshGpu: Boolean(msg.refreshGpu),
        });
        sendResponse(res);
        return;
      }
      if (msg.op === "enable") {
        const res = await callWorkerRpc("enable", { modelKey: msg.modelKey || null });
        sendResponse(res);
        return;
      }
      if (msg.op === "switch") {
        const res = await callWorkerRpc("switch", { modelKey: msg.modelKey });
        sendResponse(res);
        return;
      }
      if (msg.op === "disable") {
        const res = await callWorkerRpc("disable");
        sendResponse(res);
        return;
      }
      if (msg.op === "ask") {
        const res = await callWorkerRpc("ask", {
          promptId: msg.promptId,
          prompt: msg.prompt,
        });
        sendResponse(res);
        return;
      }
      sendResponse({ ok: false, error: "Unknown offscreen AI op: " + msg.op });
    } catch (err) {
      sendResponse({ ok: false, error: err && err.message ? err.message : String(err) });
    }
  })();

  return true;
});
