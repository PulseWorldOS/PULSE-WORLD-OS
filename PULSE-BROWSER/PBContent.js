// ============================================================================
//  PBContent.js — PulseBrowser OS DOM Runtime (Ultra Edition v10.0)
//  Full DOM physics engine: warm-path, GPU, decode, mutation, performance,
//  realm sync, HUD, world-band extraction, kernel bridge.
// ============================================================================
let PulseRealm = {};
let PulseRealmSettings = {};
let PulseDomScan = false;
let PBROWSERFAVICON_CACHE = {};
let CompanionDeprivation = false;
let nowCT = Date.now(); // numeric timestamp
let lastnowCT = Date.now(); // numeric timestamp
let OurLocalMemoryLayer = {};
let OurLocalMemoryLayerMB = 0;
let OvermindTheirOrders = null;
let tabValue = 0;
let assumedValue = 0;
let lastEarnBatch = null;
let soakTestTimer = null;
let gpuContext = null;
let MyPulseIdentity = null;
let valueDiv = document.getElementById("assumedValue");
let earnBatch = document.getElementById("lastEarnBatch");
let identitySQL = document.getElementById("identitySQL");
const CACHE_NAME = "PulseBrowser-Companion";
// Load saved PulseTabs from extension storage at startup
let pulseTabs = {};
let realmSummary = null;


function isInIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    // If a strict browser security policy blocks access to window.top,
    // you are definitely inside a cross-origin iframe.
    return true;
  }
}
// ---------------------------------------------------------------------------
// DOMAIN CLASSIFIER
// ---------------------------------------------------------------------------

function isPulseWorld(origin) {
  return origin.includes("pulseworld.net")
      || origin.includes("orbitalmap.net")
      || ((origin.includes("mcbbhkdjpaakjabngfjmaeihnoilognk") || origin.includes("kkidimiknkgfkjplagaohacidaagcbjg")) && (origin.includes("chromewebstore") || origin.includes("chrome")))
      || origin.includes("booleanlogic.net")
      || origin.includes("binaryos.net")
      || origin.includes("serviceworker.net")
      || origin.includes("gpuprocessing.net")
      || origin.includes("pulseworld.me")
      || origin.includes("pulseworld.money")
      || origin.includes("pulseworld.biz");
}
// ---------------------------------------------------------------------------
// DOMAIN CLASSIFIER
// ---------------------------------------------------------------------------
function pbDomainClass(url) {
  if (isPulseWorld(url)) return "PulseWorld";
  if (IsPartner(url)) return "Partner";
  return "WWW";
}

const PB_LOG4 = {
  info(label, data) {
    console.log(
      `%c[PBContent][INFO][${new Date().toLocaleTimeString()}] ${label}`,
      "color:#55BBFF; font-weight:bold;",
      data || ""
    );
  },

  change(label, before, after) {
    console.groupCollapsed(
      `%c[PBContent][CHANGE][${new Date().toLocaleTimeString()}] ${label}`,
      "color:#00FFAA; font-weight:bold;"
    );
    console.log("%cBefore:", "color:#FF8888; font-weight:bold;", before);
    console.log("%cAfter:", "color:#88FF88; font-weight:bold;", after);
    console.groupEnd();
  },

  save(label, data) {
    console.log(
      `%c[PBContent][SAVE][${new Date().toLocaleTimeString()}] ${label}`,
      "color:#00DDFF; font-weight:bold;",
      data
    );
  },

  load(label, data) {
    console.log(
      `%c[PBContent][LOAD][${new Date().toLocaleTimeString()}] ${label}`,
      "color:#FFD700; font-weight:bold;",
      data
    );
  },

  event(label, data) {
    console.log(
      `%c[PBContent][EVENT][${new Date().toLocaleTimeString()}] ${label}`,
      "color:#FF55AA; font-weight:bold;",
      data
    );
  }
};

if (isPulseWorld(location.href)) {
  document.addEventListener("click", e => {
    const vid = e.target.closest("video");
    if (!vid) return;

    // ⭐ Calculate aspect ratio
    const ratio = vid.videoWidth / vid.videoHeight;
    const isIdentityVideo = ratio < 1.4;

    // ⭐ Exclude PulseStatus and PulseStatus2 videos
    const src = vid.src || "";
    const isPulseStatus =
      src.includes("PulseStatus") ||
      src.includes("PulseStatus2");

    // ⭐ Trigger ONLY if identity video AND NOT PulseStatus
    if (isIdentityVideo && !isPulseStatus) {
      setTimeout(() => AttemptPulseSteam(vid), 1500);
    }
  });
}

  class PulseWasmEngine {
    constructor() {
      this.wasmInstance = null;
      this.memory = null;
      this.isLoaded = false;
      this.lastCallbackValue = 0; // Captures values sent to imported_func
    }

    async EarnerLockedandLoaded() {
      this.isLoaded = true;
      if (typeof chrome !== 'undefined' && chrome.power) {
        chrome.power.requestKeepAwake("system");
      }
      console.log("[SYSTEM WASM ENGINE] Locked and Loaded!");
    }

    // Load the pure binary math module into memory
    async initEngine(wasmBinaryUrl = "PulseEarnWarmer.wasm") {
      if (this.isLoaded) return;

      try {
        // Content scripts run inside arbitrary web pages — ALWAYS resolve via chrome.runtime.getURL
        // so fetch never hits the webpage's 404 text/html page!
        const resolvedUrl =
          typeof chrome !== "undefined" && chrome.runtime && typeof chrome.runtime.getURL === "function" && !/^https?:|^chrome-extension:/i.test(wasmBinaryUrl)
            ? chrome.runtime.getURL(wasmBinaryUrl.replace(/^\.?\//, ""))
            : wasmBinaryUrl;

        const response = await fetch(resolvedUrl, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Failed to fetch SYSTEM WASM: ${response.status} ${response.statusText}`);
        }
        const buffer = await response.arrayBuffer();
        const magic = new Uint8Array(buffer, 0, 4);
        if (buffer.byteLength < 8 || magic[0] !== 0x00 || magic[1] !== 0x61 || magic[2] !== 0x73 || magic[3] !== 0x6d) {
          throw new Error(`Invalid WASM binary from ${resolvedUrl} (${response.headers.get("content-type") || "unknown"})`);
        }
        const module = await WebAssembly.compile(buffer);

        // Keep a reference to imported memory in case the module doesn't export its own
        const importedMemory = new WebAssembly.Memory({ initial: 256, maximum: 512 });

        this.wasmInstance = await WebAssembly.instantiate(module, {
          my_namespace: {
            imported_func: (arg) => {
              this.lastCallbackValue = arg;
              // Commented out during high-speed loops to prevent console memory bloat
              // console.log("[SYSTEM WASM CALLBACK] Function invoked from WASM:", arg);
            }
          },
          env: {
            memory: importedMemory,
            abort: () => {
              console.error("[SYSTEM WASM ABORT] Critical execution crash");
            }
          }
        });

        // Prefer exported memory, fallback to imported memory
        this.memory = this.wasmInstance.exports.memory || importedMemory;

        console.log("[SYSTEM WASM EXPORTS] Available keys:", Object.keys(this.wasmInstance.exports));

        await this.EarnerLockedandLoaded();
        console.log("[SYSTEM WASM ENGINE] Pure mathematical module stable and hot.");
      } catch (err) {
        this.isLoaded = false;
        console.error("[SYSTEM WASM ENGINE] Initialization failed:", err);
        throw err; // Re-throw so callers know initialization failed
      }
    }

    // The pure compute pipeline: Input bytes -> Output proofs
    async executeProofJob(rawPayloadData) {
      if (!this.isLoaded || !this.wasmInstance) {
        throw new Error("SYSTEM WASM engine not ready");
      }

      const exports = this.wasmInstance.exports;
      const targetFunc = exports.computeMathProofs 
                      || exports._computeMathProofs 
                      || exports.exported_func;

      if (typeof targetFunc !== 'function') {
        throw new Error("Execution failed: Target function signature missing from SYSTEM WASM exports.");
      }

      // --- FALLBACK GUARD FOR TEST BINARY (simple.wasm) ---
      if (targetFunc === exports.exported_func) {
        this.lastCallbackValue = 0;
        const returnVal = targetFunc(); // simple.wasm returns void and passes 42 to imported_func
        const finalVal = returnVal !== undefined ? returnVal : this.lastCallbackValue;
        return new Uint8Array([finalVal]);
      }

      // --- PRODUCTION PIPELINE (PulseEarnWarmer.wasm) ---
      const inputArray = rawPayloadData instanceof Uint8Array 
        ? rawPayloadData 
        : new Uint8Array(rawPayloadData);
      const length = inputArray.length;

      // Safely resolve input buffer pointer (avoid offset 0 unless explicitly provided)
      let inputAddress = 1024; 
      let usedMalloc = false;

      if (typeof exports.malloc === 'function') {
        inputAddress = exports.malloc(length);
        usedMalloc = true;
      } else if (exports.input_buffer_pointer !== undefined) {
        inputAddress = typeof exports.input_buffer_pointer === 'object'
          ? exports.input_buffer_pointer.value
          : exports.input_buffer_pointer;
      }

      // Always re-acquire the buffer view right before use (Wasm memory can grow & detach old views)
      const memView = new Uint8Array(this.memory.buffer);
      if (inputAddress + length > memView.length) {
        throw new Error(`WASM Memory Out of Bounds: Tried to write ${length} bytes at offset ${inputAddress}`);
      }

      memView.set(inputArray, inputAddress);

      // Execute computational processing loops
      const resultAddress = targetFunc(inputAddress, length);

      // Re-acquire view again in case targetFunc triggered memory.grow()
      const updatedMemView = new Uint8Array(this.memory.buffer);
      const resultLength = 32;
      const proofResult = updatedMemView.slice(resultAddress, resultAddress + resultLength);

      // Free allocations to prevent 24-hour OOM crashes
      if (typeof exports.free === 'function') {
        if (usedMalloc) exports.free(inputAddress);
        // Only free resultAddress if your Wasm module dynamically allocates the output buffer
        if (resultAddress !== inputAddress && resultAddress > 0) {
          exports.free(resultAddress);
        }
      }

      return proofResult;
    }

    shutdown() {
      this.isLoaded = false;
      if (typeof chrome !== 'undefined' && chrome.power) {
        chrome.power.releaseKeepAwake();
      }
      console.log("[SYSTEM WASM ENGINE] Shut down and released power lock.");
    }
  }

  // Instantiate the isolated engine
  const pulseWasmCompute = new PulseWasmEngine();
  if (typeof PB_LOG4 !== 'undefined') {
    PB_LOG4.event("SYSTEM Companion: Pulse Earner Online and Listening for Backup..", pulseWasmCompute);
  }
  // setTimeout(initWebGPUCompute, 50);


let PULSE_OVERMIND_BROADCAST_CHANNEL3 = `PulseBrowser-OS::${new Date(nowCT).toLocaleTimeString()}`;
// ============================================================
//  BROADCAST CHANNEL — v33 (TRUST SYNC + EXISTING USES)
// ============================================================

let PulseBrowserChannel3 = null;
try {
  PulseBrowserChannel3 = new BroadcastChannel(PULSE_OVERMIND_BROADCAST_CHANNEL3);
} catch {
  PulseBrowserChannel3 = null;
}

// Safe fallbacks in case globals are undefined in certain contexts
const logger2 = typeof PB_LOG4 !== "undefined" ? PB_LOG4 : console;
const channel = typeof PulseBrowserChannel3 !== "undefined" ? PulseBrowserChannel3 : null;
const getTimestamp = () => (typeof nowCT !== "undefined" ? nowCT : Date.now());

/**
 * Broadcasts an Overmind command payload to other open tabs.
 * @param {any} payload - The data or command object to sync.
 */
function OvermindCrossTabSync(payload) {
  if (!channel) {
    logger2.warn("[AI_Overmind_Sync] BroadcastChannel unavailable.");
    return;
  }

  try {
    channel.postMessage({
      kind: "command_prompt",
      payload,
      ts: getTimestamp(),
    });
  } catch (err) {
    logger2.error("[AI_Overmind_Sync] Failed to post message:", err);
  }
}

/**
 * Handles incoming command prompts from other tabs and optionally sends an acknowledgment.
 * @param {any} payload - The received payload.
 * @param {number} ts - Timestamp of the original message.
 */
function handleOvermindResponse(payload, ts) {
  logger2.info("[Sound Off: Command Prompt Received]", { payload, ts });

  // Execute command logic based on payload
  if (payload?.action) {
    switch (payload.action) {
      case "PING":
        // Respond back across tabs if needed
        channel?.postMessage({
          kind: "command_ack",
          payload: { status: "READY", originalTs: ts },
          ts: getTimestamp(),
        });
        break;
      default:
        // Handle custom Overmind orders here
        break;
    }
  }
}

// Attach listener safely
if (channel) {
  channel.onmessage = (ev) => {
    try {
      const { kind, payload, ts } = ev.data || {};
      if (kind === "command_prompt") {
        handleOvermindResponse(payload, ts);
      } else if (kind === "command_ack") {
        logger2.info("[AI_Overmind_Sync] Acknowledgment received:", payload);
      }
    } catch (err) {
      logger2.error("[AI_Overmind_Sync] Error processing incoming message:", err);
    }
  };
}


// Utility: load settings
async function loadOrders(Value) {
  chrome.runtime.sendMessage({ type: "PB_GATHER_ORDERS" }, (response) => {
    if (chrome.runtime.lastError) return;
    if (!response || !response.ok) {
      PB_LOG4.info("PB_GATHER_ORDERS unavailable or error", response);
      return;
    }
    if (response.OvermindOrders) {
      OvermindTheirOrders = response.OvermindOrders;
      PB_LOG4.change("PB_GATHER_ORDERS", OvermindTheirOrders, response.OvermindOrders);
    }
  });
  if (Value) OvermindTheirOrders = Value;
  OvermindCrossTabSync(OvermindTheirOrders);
}

// 1. The Core Queue Engine
class StorageQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  // Adds the payload to the line and ensures the processing loops runs
  enqueue(dataObject) {
    this.queue.push(dataObject);
    if (!this.isProcessing) {
      this.processNext();
    }
  }

  // Processes each object one by one, keeping the disk thread safe
  async processNext() {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const dataObject = this.queue.shift(); // Pull the next write payload

    try {
      // Executes the native Chrome write sequentially
      await chrome.storage.local.set(dataObject);
    } catch (error) {
      console.error("[STORAGE GOVERNOR] Quota write blocked:", error);
    }

    // Yield control for 0ms to let the browser breathe, then hit the next item
    setTimeout(() => this.processNext(), 0);
  }
}

// 2. Instantiate the global queue in your worker
const orchestratorQueue = new StorageQueue();

// 3. The Drop-In Replacement Function
function safeStorageSet(dataObject) {
  orchestratorQueue.enqueue(dataObject);
}

if (location.href.includes("pw=offline")) {
  chrome.runtime.sendMessage({
    type: "HISTORY_BACK",
    url: location.href.replace(window.location.hash, "")
  }, (response) => {
    if (chrome.runtime.lastError) return;
    if (!response.ok) return;
    if (response.ok) {
      const currentUrl = location.href;
      setTimeout(() => {
        // history.back();
        // Still here?
        // ONLY return to live URL when internet exists
      
        if (location.href === currentUrl) {
          const cleanUrl = currentUrl
            .replace(/[?&]pw=offline/g, "")
            .replace("?&", "?")
            .replace(/\?$/, "")
            .replace(/&$/, "");
          location.href = cleanUrl;
        }
        
      }, 750);
    }
  });
} else if (location.href.includes("pw=moment")) {
  chrome.runtime.sendMessage({
    type: "HISTORY_BACK",
    url: location.href.replace(window.location.hash, "")
  }, (response) => {
    if (chrome.runtime.lastError) return;
    if (!response.ok) return;
    if (response.ok) {
      const currentUrl = location.href;
      setTimeout(() => {
        // history.back();
        // Still here?
        // ONLY return to live URL when internet exists

        if (location.href === currentUrl) {
          const cleanUrl = currentUrl
            .replace(/[?&]pw=moment/g, "")
            .replace("?&", "?")
            .replace(/\?$/, "")
            .replace(/&$/, "");
          location.href = cleanUrl;
        }

      }, 750);
    }
  });
}


async function pulseGPUInspector(adapter, device) {
  // Acquire adapter
  if (!adapter) adapter = await navigator.gpu?.requestAdapter();
  if (!adapter) {
    console.log("❌ WebGPU: No adapter available");
    return;
  }

  // Acquire device
  if (!device) device = await adapter.requestDevice();

  // Basic info
  console.log("🎮 WebGPU Inspector");
  console.log("Adapter Name:", adapter.name ?? "PulseEngine 2028");
  console.log("Adapter Type:", adapter.isFallbackAdapter ? "Fallback" : "Primary");
  console.log("Features:", [...adapter.features]);

  // Limits (Deep Telemetry)
  const L = adapter.limits;
  console.log("📊 GPU Limits:");
  console.log("  Max Bind Groups:", L.maxBindGroups);
  console.log("  Max Dynamic Uniform Buffers:", L.maxDynamicUniformBuffersPerPipelineLayout);
  console.log("  Max Dynamic Storage Buffers:", L.maxDynamicStorageBuffersPerPipelineLayout);
  console.log("  Max Storage Buffer Size:", L.maxStorageBufferBindingSize);
  console.log("  Max Uniform Buffer Size:", L.maxUniformBufferBindingSize);
  console.log("  Max Buffer Size:", L.maxBufferSize);
  console.log("  Max Texture Dimension 1D:", L.maxTextureDimension1D);
  console.log("  Max Texture Dimension 2D:", L.maxTextureDimension2D);
  console.log("  Max Texture Dimension 3D:", L.maxTextureDimension3D);
  console.log("  Max Compute Workgroup Size X:", L.maxComputeWorkgroupSizeX);
  console.log("  Max Compute Workgroup Size Y:", L.maxComputeWorkgroupSizeY);
  console.log("  Max Compute Workgroup Size Z:", L.maxComputeWorkgroupSizeZ);
  console.log("  Max Compute Invocations:", L.maxComputeInvocationsPerWorkgroup);
  console.log("  Max Compute Workgroups Per Dimension:", L.maxComputeWorkgroupsPerDimension);

  // Device object
  console.log("🔧 Device:", device);

  // Context loss detection
  device.lost.then((info) => {
    console.warn("⚠️ GPU Context Lost:", info);
  });
}

// 1. Initialize once at startup (replaces your warm-up snippet)
async function initWebGPUCompute() {
  if (!navigator.gpu) return null;
  const adapter = await navigator.gpu.requestAdapter({ powerPreference: "high-performance" });
  if (!adapter) return null;
  const device = await adapter.requestDevice();
  if (device) pulseGPUInspector(adapter, device);
  // WGSL Shader: Treats every 256-bit item as 8 x u32 (two vec4<u32>)
  const shaderCode = `
    struct Item256 {
      low: vec4<u32>,
      high: vec4<u32>,
    };

    @group(0) @binding(0) var<storage, read_write> data: array<Item256>;

    @compute @workgroup_size(64)
    fn main(@builtin(global_invocation_id) id: vec3<u32>) {
      let i = id.x;
      if (i >= arrayLength(&data)) { return; }

      // REPLACE THIS WITH YOUR ACTUAL 256-BIT MATH (e.g., XOR, bit-shifts, hashing)
      data[i].low = data[i].low ^ vec4<u32>(0xDEADBEEFu);
      data[i].high = data[i].high + vec4<u32>(1u);
    }
  `;

  const module = device.createShaderModule({ code: shaderCode });
  const pipeline = device.createComputePipeline({
    layout: "auto",
    compute: { module, entryPoint: "main" },
  });

  gpuContext = { device, pipeline };
  return gpuContext;
}

// 2. Call this instead of your Wasm function for large batches
async function run256BitJobOnGPU(typedArrayPayload) {
  // [Phase 4] Guard: if GPU was never initialized or failed, return null so caller can fallback
  if (!gpuContext || !gpuContext.device || !gpuContext.pipeline) {
    return null;
  }
  try {
  const { device, pipeline } = gpuContext;
  const byteSize = typedArrayPayload.byteLength;

  // Create GPU storage buffer & staging buffer for reading results back
  const gpuBuffer = device.createBuffer({
    size: byteSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
  });
  const readBuffer = device.createBuffer({
    size: byteSize,
    usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
  });

  // Upload payload from CPU to GPU
  device.queue.writeBuffer(gpuBuffer, 0, typedArrayPayload);

  const bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [{ binding: 0, resource: { buffer: gpuBuffer } }],
  });

  // Dispatch 1 thread per 256-bit element (32 bytes each)
  const itemCount = byteSize / 32;
  const workgroups = Math.ceil(itemCount / 64);

  const encoder = device.createCommandEncoder();
  const pass = encoder.beginComputePass();
  pass.setPipeline(pipeline);
  pass.setBindGroup(0, bindGroup);
  pass.dispatchWorkgroups(workgroups);
  pass.end();

  // Copy result to CPU-readable buffer
  encoder.copyBufferToBuffer(gpuBuffer, 0, readBuffer, 0, byteSize);
  device.queue.submit([encoder.finish()]);

  // Read back to JS
  await readBuffer.mapAsync(GPUMapMode.READ);
  const result = new Uint8Array(readBuffer.getMappedRange()).slice();
  readBuffer.unmap();

  // Clean up VRAM
  gpuBuffer.destroy();
  readBuffer.destroy();

  return result;
  } catch (gpuErr) {
    console.warn("[GPU] run256BitJobOnGPU failed, returning null for WASM fallback:", gpuErr);
    return null;
  }
}

// Single test execution
async function runEngineTest(silent = false) {
  // 1. Ensure Wasm engine is initialized
  if (!pulseWasmCompute.isLoaded) {
    if (!silent) console.log("[TEST] Initializing WASM engine testing rig...");
    try {
      await pulseWasmCompute.initEngine();
    } catch (initError) {
      console.error("[FAILED] WASM Engine failed to initialize:", initError);
      WasmSuccess = false;
      timeProof = `*[<font color="red">INIT ERR</font>]`;
      return -1;
    }
  }

  // 2. Construct fresh 256-byte test payload & snapshot input for mutation/determinism checks
  const mock256Payload = new Uint8Array([
    0x1A, 0x2B, 0x3C, 0x4D, 0x5E, 0x6F, 0x70, 0x81,
    0x92, 0xA3, 0xB4, 0xC5, 0xD6, 0xE7, 0xF8, 0x09,
    0x10, 0x21, 0x32, 0x43, 0x54, 0x65, 0x76, 0x87,
    0x98, 0xA9, 0xBA, 0xCB, 0xDC, 0xED, 0xFE, 0x0F,
    0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88,
    0x99, 0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF, 0x00,
    0x12, 0x23, 0x34, 0x45, 0x56, 0x67, 0x78, 0x89,
    0x9A, 0xAB, 0xBC, 0xCD, 0xDE, 0xEF, 0xF0, 0x01,
    0x13, 0x24, 0x35, 0x46, 0x57, 0x68, 0x79, 0x8A,
    0x9B, 0xAC, 0xBD, 0xCE, 0xDF, 0xE0, 0xF1, 0x02,
    0x14, 0x25, 0x36, 0x47, 0x58, 0x69, 0x7A, 0x8B,
    0x9C, 0xAD, 0xBE, 0xCF, 0xD0, 0xE1, 0xF2, 0x03,
    0x15, 0x26, 0x37, 0x48, 0x59, 0x6A, 0x7B, 0x8C,
    0x9D, 0xAE, 0xBF, 0xC0, 0xD1, 0xE2, 0xF3, 0x04,
    0x16, 0x27, 0x38, 0x49, 0x5A, 0x6B, 0x7C, 0x8D,
    0x9E, 0xAF, 0xB0, 0xC1, 0xD2, 0xE3, 0xF4, 0x05,
    0x17, 0x28, 0x39, 0x4A, 0x5B, 0x6C, 0x7D, 0x8E,
    0x9F, 0xA0, 0xB1, 0xC2, 0xD3, 0xE4, 0xF5, 0x06,
    0x18, 0x29, 0x3A, 0x4B, 0x5C, 0x6D, 0x7E, 0x8F,
    0x90, 0xA1, 0xB2, 0xC3, 0xD4, 0xE5, 0xF6, 0x07,
    0x19, 0x2A, 0x3B, 0x4C, 0x5D, 0x6E, 0x7F, 0x80,
    0x91, 0xA2, 0xB3, 0xC4, 0xD5, 0xE6, 0xF7, 0x08,
    0x1B, 0x2C, 0x3D, 0x4E, 0x5F, 0x60, 0x71, 0x82,
    0x93, 0xA4, 0xB5, 0xC6, 0xD7, 0xE8, 0xF9, 0x0A,
    0x1C, 0x2D, 0x3E, 0x4F, 0x50, 0x61, 0x72, 0x83,
    0x94, 0xA5, 0xB6, 0xC7, 0xD8, 0xE9, 0xFA, 0x0B,
    0x1D, 0x2E, 0x3F, 0x40, 0x51, 0x62, 0x73, 0x84,
    0x95, 0xA6, 0xB7, 0xC8, 0xD9, 0xEA, 0xFB, 0x0C,
    0x1E, 0x2F, 0x30, 0x41, 0x52, 0x63, 0x74, 0x85,
    0x96, 0xA7, 0xB8, 0xC9, 0xDA, 0xEB, 0xFC, 0x0D,
    0x1F, 0x20, 0x31, 0x42, 0x53, 0x64, 0x75, 0x86,
    0x97, 0xA8, 0xB9, 0xCA, 0xDB, 0xEC, 0xFD, 0x0E
  ]);
  const inputSnapshot = new Uint8Array(mock256Payload);

  // 3. Measure isolated proof job execution
  const start = performance.now();
  try {
    // [Phase 4] GPU only for large payloads (1KB+). Small jobs stay on WASM — GPU overhead is too high for tiny batches.
    const GPU_MIN_BYTES = 1024;
    let outputProof = null;
    let usedGPU = false;
    if (gpuContext && mock256Payload.byteLength >= GPU_MIN_BYTES) {
      outputProof = await run256BitJobOnGPU(mock256Payload);
      if (outputProof) usedGPU = true;
    }
    // WASM handles small payloads and GPU fallback
    if (!outputProof) {
      outputProof = await pulseWasmCompute.executeProofJob(mock256Payload);
    }
    //const outputProof = await run256BitJobOnGPU(mock256Payload);
    const elapsedMs = performance.now() - start;

    // 4. Validate output structure & Fluence shared-nothing guarantees
    if (!outputProof) {
      throw new Error("executeProofJob returned null or undefined.");
    }

    // Handle both raw Uint8Array returns and Fluence-style { outputPayload / proof } objects
    const proofBytes =
      outputProof instanceof Uint8Array
        ? outputProof
        : outputProof.outputPayload || outputProof.proof || outputProof.result?.outputPayload;

    if (!(proofBytes instanceof Uint8Array) || proofBytes.length === 0) {
      throw new Error("Invalid proof format: expected non-empty Uint8Array.");
    }

    // Verify Wasm didn't just echo back unchanged input bytes or all-zeros
    const isAllZeros = proofBytes.every((b) => b === 0);
    const isUnchangedEcho =
      proofBytes.length === inputSnapshot.length &&
      proofBytes.every((b, idx) => b === inputSnapshot[idx]);

    if (isAllZeros || isUnchangedEcho) {
      throw new Error(
        isAllZeros
          ? "Proof buffer is all zeros (uninitialized Wasm memory)."
          : "Proof buffer is identical to input (no-op passthrough)."
      );
    }

    // Verify host input buffer remained isolated (not mutated in-place)
    const inputWasMutated = mock256Payload.some((b, idx) => b !== inputSnapshot[idx]);
    if (inputWasMutated) {
      throw new Error("Host input buffer was mutated in-place across Wasm boundary.");
    }

    // 5. Assign latency badge & update global flags
    let timecolor = "lightgreen";
    if (elapsedMs > 50) {
      timecolor = "red";
    } else if (elapsedMs > 25) {
      timecolor = "orange";
    } else if (elapsedMs > 10) {
      timecolor = "gold";
    }

    timeProof = `*[<font color="${timecolor}">${elapsedMs.toFixed(4)} ms</font>]`;
    WasmSuccess = true;

    if (!silent) {
      const engine = usedGPU ? "WebGPU" : "WASM";
      console.log(
        `[Success][${engine}] ${elapsedMs.toFixed(4)} ms | Proof (${proofBytes.length}B):`,
        outputProof
      );
    }

    return elapsedMs;
  } catch (testError) {
    console.error("[FAILED] WASM TEST Execution Pipeline broke:", testError);
    WasmSuccess = false;
    timeProof = `*[<font color="red">FAILED</font>]`;
    return -1;
  }
}

function currency(amount, displayCurrency = "$") {
  let raw = String(amount || "").replace(/BZ?\$|\$/g, "").trim();
  const num = Number(raw);
  const safe = isNaN(num) ? "0.00" : num.toFixed(3);

  let cur = String(displayCurrency || "$").trim().toUpperCase();
  cur = cur === "USD" || cur === "$" || cur === "US$" ? "$" : "BZ$";

  return `${cur}${safe}`;
}

// Safe 24-Hour Soak Test Runner (Batched to avoid locking the browser/service worker)
async function start24HourSoakTest({ batchSize = 250, intervalMs = 250 } = {}) {
  if (soakTestTimer) {
    console.warn("[TEST] Soak test is already running.");
    return;
  }

  await pulseWasmCompute.initEngine();
  const endTime = Date.now() + (24 * 60 * 60 * 1000);
  let totalJobs = 0;
  let totalErrors = 0;
  let totalJobsString = Number(totalJobs);

  console.log(`[TEST] Starting 24h Soak Test (Batch: ${batchSize} jobs every ${intervalMs}ms)...`);

  let tickInterval = 0;
  let totalUnit = null;
  let totalUnits = 0;

  const tick = async () => {
    if (Date.now() >= endTime) {
      stopSoakTest();
      if (totalJobs >= 1000000000) {
        totalJobsString = (totalJobs/1000000000).toFixed(2) + " B";
      } else if (totalJobs >= 1000000) {
        totalJobsString = (totalJobs/1000000).toFixed(2) + " M";
      } else if (totalJobs >= 1000) {
        totalJobsString = (totalJobs/1000).toFixed(0) + " K";
      }
      if (totalErrors === 0) {
        totalUnit = "Val: ";
        totalUnits = currency(assumedValue);
      } else {
        totalUnit = "Err: ";
        totalUnits = totalErrors;
      }
      console.log("WASM Daily Total Value: " + currency(assumedValue));
      CompanionMessage = `WASM Daily Batches Succeeded.. [<font color="lightgreen">Complete</font>] (Jobs: ${totalJobsString} | ${totalUnit}${totalUnits})`;
      setTimeout(() => {
        CompanionMessage = "Waiting for PulseEarner Job Submissions...";
      }, 4000);      
      console.log(`[TEST] 24-Hour Soak Test Complete! Total Jobs: ${totalJobs}, ${totalUnit}${totalUnits}`);
      return;
    }

    const batchStart = performance.now();
    for (let i = 0; i < batchSize; i++) {
      const res = await runEngineTest(true);
      if (res < 0) totalErrors++;
      else totalJobs++;
    }
    const batchMs = performance.now() - batchStart;

    // Log status every 25,000 jobs so DevTools doesn't crash from log spam
    if (totalJobs % 25000 === 0) {
      tickInterval++;
      // Models realistic DePIN compute payouts (e.g., Golem tasks / Fluence compute units)
      // 80% lightweight micro-tasks ($0.0005 - $0.0020)
      // 15% standard compute jobs ($0.0020 - $0.0060)
      // 5% heavy AI/rendering workloads ($0.0060 - $0.0150)

      const roll = Math.random();
      let jobReward;

      if (roll < 0.80) {
        jobReward = 0.0005 + Math.random() * 0.0015;
      } else if (roll < 0.95) {
        jobReward = 0.0020 + Math.random() * 0.0040;
      } else {
        jobReward = 0.0060 + Math.random() * 0.0090;
      }

      assumedValue += jobReward;

      console.log("WASM Daily Assumed Value: " + currency(assumedValue));
      if (totalJobs >= 1000000000) {
        totalJobsString = (totalJobs/1000000000).toFixed(2) + " B";
      } else if (totalJobs >= 1000000) {
        totalJobsString = (totalJobs/1000000).toFixed(2) + " M";
      } else if (totalJobs >= 1000) {
        totalJobsString = (totalJobs/1000).toFixed(0) + " K";
      }
      if (totalErrors === 0) {
        totalUnit = "Val: ";
        totalUnits = currency(jobReward);
      } else {
        totalUnit = "Err: ";
        totalUnits = totalErrors;
      }
      const avgJobMs = (batchMs / batchSize).toFixed(4);
      let avgJobColor = "lightgreen";
      if (avgJobMs >= 0.01) {
        avgJobColor = "red";
      } else if (avgJobMs >= 0.005) {
        avgJobColor = "orange";
      }
      const nowAllTime = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });
      CompanionMessage = `WASM Batch ${nowAllTime}.. [<font color=${avgJobColor}>Avg: ${avgJobMs} ms</font>] (Jobs: ${totalJobsString} | ${totalUnit}${totalUnits})`;
      console.log(`[SOAK STATUS] Jobs: ${totalJobs.toLocaleString()} | Avg/Job: ${avgJobMs} ms | ${totalUnit}${totalUnits}`);
    }

    soakTestTimer = setTimeout(tick, intervalMs);
  };

  tick();
}

function stopSoakTest() {
  if (soakTestTimer) {
    clearTimeout(soakTestTimer);
    soakTestTimer = null;
    pulseWasmCompute.shutdown();
  }
}
 
// Load cache from storage at startup
chrome.storage.local.get(["PulseFaviconsUniverse"], (res) => {
  if (res.PulseFaviconsUniverse) {
    PBROWSERFAVICON_CACHE = res.PulseFaviconsUniverse;
  }
});

const EXTENSION_SETTINGS_KEY = "pulseworldSettings";

async function pbLoadExtensionSettings() {
  try {
    const result = await chrome.storage.local.get([EXTENSION_SETTINGS_KEY]);
    const settings = result[EXTENSION_SETTINGS_KEY] || {};

    return settings;
  } catch (err) {
    console.error("pbLoadExtensionSettings() FAILED", err);
    return {};
  }
}

// ============================================================================
//  PBQuantumPrefetch.js — AI-ish navigation prediction (lightweight heuristic)
// ============================================================================

const PBQuantumPrefetch = {
  lastHoverLink: null,
  hoverTimeout: null,
  prefetchDelayMs: 1000,

  cooldownMs: 3000,          // 3 seconds per link
  linkCooldowns: new Map(),  // href → timestamp

  attachToDocument() {
    document.addEventListener("mouseover", (e) => {
      const a = e.target.closest("a[href]");
      if (!a) return;

      this.lastHoverLink = a.href;
      const link = [a.href];

      if (this.hoverTimeout) clearTimeout(this.hoverTimeout);

      this.hoverTimeout = setTimeout(() => {
        this.tryPrefetch(link);
      }, this.prefetchDelayMs);
    });
  },

  letsgo(link) {
    if (link && (link.includes("http://") || link.includes("https://"))) {
      pbPreconnect([link]);
      fetch(link, { cache: "force-cache" }).catch(() => {});
    }
  },

  tryPrefetch(link) {
    const href = link[0];
    const now = Date.now();
    let linkURL = href;
    // Only prefetch if same domain
    try {
      linkURL = new URL(href);
      if (linkURL.hostname !== location.hostname) {
        return; // cross-domain → skip
      }
    } catch {
      return; // invalid URL → skip
    }

    const lastTime = this.linkCooldowns.get(href) || 0;

    // Cooldown for THIS link only
    if (now - lastTime < this.cooldownMs) {
      return;
    }

    this.linkCooldowns.set(href, now);

    // Safe prefetch
    this.letsgo(linkURL.href);    
    console.log("[PBQuantumPrefetch] Prefetched hovered link:", linkURL.href);
  }

};

// ---------------------------------------------------------------------------
// 2. HUD INJECTION (DevOverlay) — SAFE VERSION
// ---------------------------------------------------------------------------
(function safeInjectHUD() {
  if (
      location.protocol === "chrome:" ||
      location.href.startsWith("chrome://") ||
      location.protocol === "chrome-extension:"
    ) {
      return;
    }
  
  console.log("%c[PULSEWORLD CONTENT] PBContent.js (Ultra Edition v10.0) injected",
  "color:#00C8FF; font-weight:bold; font-family:monospace;");

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", async () => {
      injectHUD();
    });
  } else {
    injectHUD();
  }
})();

// ---------------------------------------------------------------------------
// 10. BRANDING FLAG
// ---------------------------------------------------------------------------
(function safeInjectPulseFlag() {
  if (
      location.protocol === "chrome:" ||
      location.href.startsWith("chrome://") ||
      location.protocol === "chrome-extension:"
    ) {
      return;
    }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectPulseFlag);
  } else {
    injectPulseFlag();
  }
})();

// Safe startup wrapper
(async function safeWarmPathStart() {
  const settings = await pbLoadExtensionSettings();
  PulseRealmSettings = settings;
  OurLocalMemoryLayer = await runProtectedCompute(getLocalMemoryLayer);
  // Start immediately if DOM is already interactive or complete
  if (document.readyState !== "loading") {
    startWarmPath();
    createPulseScreen();
    return;
  }

  // Start ASAP even before DOMContentLoaded
  startWarmPath();
  createPulseScreen();

  // And run again at DOMContentLoaded for late images
  document.addEventListener("DOMContentLoaded", async () => {
    startWarmPath();
    createPulseScreen();
  });
})();

function cacheit(link) {
  if (link && (link.includes("http://") || link.includes("https://"))) {
    pbPreconnect([link]);
    fetch(link, { mode: "no-cors" }).catch(() => {});
  }
}

function isValid(t) {
  return (
    typeof t === "number" &&
    Number.isFinite(t) &&
    t > 0
  );
}

function HelperHud() {
  const body = document.getElementById("pb-hud-body");
  const wrap = document.getElementById("pulsebrowser-dev-overlay");
      
  if (body) updateHUD(body);
  if (wrap) wrap.style.display = "block";
  if (body) body.style.display = "block";

  setTimeout(async () => {
    fadeHUD();
  }, 4000);
}

// ---------------------------------------------------------------------------
// 1. KERNEL HANDSHAKE
// ---------------------------------------------------------------------------
chrome.runtime.sendMessage({ type: "PULSE_OS_PING", time: nowCT  }, (response) => {
  if (chrome.runtime.lastError) return;
  if (response.time && isValid(response.time)) nowCT = response.time;
  if (response.HelperHudBoolean) HelperHud();
  if (response.pulseTabs) pulseTabs = response.pulseTabs;
  if (response.TakeOfflineSnapshot) {
    try {
      const offline = makeOfflineKey(location.href.replace(window.location.hash, ""));
      chrome.runtime.sendMessage({ type: "HISTORY_BACK", url: offline  });
      location.href = offline;
    } catch (err) {
    }
  }
});


function pbPreconnect(origins = []) {
  origins.forEach((origin) => {
    pbDNSWarm(origin);
    pbTLSWarm(origin);
  });
  console.log("%c[PBAccelerator] Preconnect:", "color:#00C8FF;", origins);
}

// ---------------------------------------------------------------------------
// DNS WARM (resolve domain early)
// ---------------------------------------------------------------------------
function pbDNSWarm(origin) {
  try {
    let link = document.getElementById("link");
    if (!link) link = document.createElement("link");
    link.rel = "dns-prefetch";
    link.href = origin;
    document.head.appendChild(link);

  } catch (_) {}
}


// ---------------------------------------------------------------------------
// TLS WARM (establish TLS early)
// ---------------------------------------------------------------------------
function pbTLSWarm(origin) {
  try {
    let link = document.getElementById("link");
    if (!link) link = document.createElement("link");
    link.rel = "preconnect";
    link.href = origin;
    document.head.appendChild(link);

  } catch (_) {}
}


// ---------------------------------------------------------------------------
// 5. DECODE WARM-PATH (images) — FULL SPECTRUM VERSION
// ---------------------------------------------------------------------------

// Decode a single image safely
function warmImageDecode(img) {
  if (!img) return;
  try { 
    img.decode?.().catch(() => {}); 
  } catch (_) {}
}

// Extract CSS background-image URLs
function extractCSSImageURLs() {
  const urls = [];

  document.querySelectorAll("*").forEach(el => {
    const bg = getComputedStyle(el).backgroundImage;
    if (!bg || bg === "none") return;

    const match = bg.match(/url\(["']?(.*?)["']?\)/);
    if (match && match[1]) urls.push(match[1]);
  });

  return urls;
}

// Decode CSS background images by creating synthetic Image objects
function warmCSSImages() {
  const urls = extractCSSImageURLs();

  urls.forEach(src => {
    const img = new Image();
    img.src = src;
    warmImageDecode(img);
  });
}

function getLocalMemoryLayer() {
  if (!performance || !performance.memory) {
    return { status: "Standard Engine Active" };
  }

  // Native V8 Engine Hooks (No permissions required, works on Stable Channel)
  const heap = performance.memory;
  OurLocalMemoryLayerMB = Number(((heap.usedJSHeapSize / 1024 / 1024).toFixed(2)).replace(" MB", ""));

  
  return {
    usedHeapMB: (heap.usedJSHeapSize / 1024 / 1024).toFixed(2) + " MB",
    totalHeapMB: (heap.totalJSHeapSize / 1024 / 1024).toFixed(2) + " MB",
    heapLimitMB: ((heap.jsHeapSizeLimit) / 1024 / 1024).toFixed(2) + " MB"
  };
}

// Intelligent throttle window
let lastWarm = 0;
const WARM_COOLDOWN = 1000; // ms

function startWarmPath() {
  if (!document.body) {
    setTimeout(startWarmPath, 50);
    return;
  }
  // Initial warm
  warmAllImages();
  // MutationObserver for future images
  const imgObserver = new MutationObserver(() => {
    const now = performance.now();
    // Throttle: only warm once every 500ms
    if (now - lastWarm < WARM_COOLDOWN) return;
    lastWarm = now;
    warmAllImages();
  });
  imgObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
  PBQuantumPrefetch.attachToDocument();
}

// Unified warm function
function warmAllImages() {
  // Warm HTML <img>
  document.querySelectorAll("img").forEach(warmImageDecode);
  triggerWarmPaths();
  // Warm CSS backgrounds
  warmCSSImages();
}


// ============================================================================
// 14. PBContentGPUWarm++ — Additional GPU warm triggers
// ============================================================================
let gpuEnabled = "GPU Driver Error";

async function createPulseScreen() {
  const vid = document.createElement("video");
  if (window.innerHeight < 200 || window.innerWidth < 200) return;
  loadLastSavedVideo(entry => {
    if (!entry) {
      vid.src = chrome.runtime.getURL("PulseWorldOS.mp4");
      return;
    }

    // Attach listeners FIRST
    vid.addEventListener("error", () => {
      // CSP blocked → fallback
      if (gpuEnabled === "GPU Driver Error") {
        vid.src = chrome.runtime.getURL("PulseWorldOS-Older.mp4");
      } else {
        vid.src = chrome.runtime.getURL("PulseWorldOS.mp4");
      }
    });

    vid.addEventListener("loadedmetadata", () => {
      // PulseWorld video allowed
      // Optional: mark presence or warm-state
    });

    // THEN set the src
    if (entry.source) {
      vid.src = entry.source;
    } else {
      if (gpuEnabled === "GPU Driver Error") {
        vid.src = chrome.runtime.getURL("PulseWorldOS-Older.mp4");
      } else {
        vid.src = chrome.runtime.getURL("PulseWorldOS.mp4");
      }
    }
  });

  vid.style.cssText = `
    position: fixed;
    display: block;
    top: 50px;
    right: 30px;
    width: 220px;
    border-radius: 999px;
    box-shadow: 0 0 40px #00aaff88, 0 0 80px #00aaff44;
    z-index: 9999999999;
  `;

  setTimeout(async () => {
    fadeHUD(vid);
  }, 4000);
}

function getSyncInterval3() {
  const base = 2200;
// ⭐ Add human-like jitter (±20%)
  const jitterRange = base * 0.11;
  const jitter = (Math.random() * jitterRange * 2) - jitterRange;

  // ⭐ Final interval
  const interval = Math.max(base, base + jitter); // never below 5s

  return Math.floor(interval);
}

function getWarmInterval() {
  const base = 60000;
// ⭐ Add human-like jitter (±20%)
  const jitterRange = base * 0.22;
  const jitter = (Math.random() * jitterRange * 2) - jitterRange;

  // ⭐ Final interval
  const interval = Math.max(base, base + jitter); // never below 5s

  return Math.floor(interval);
}

function getSyncInterval() {
  const base = 1200;
// ⭐ Add human-like jitter (±20%)
  const jitterRange = base * 0.11;
  const jitter = (Math.random() * jitterRange * 2) - jitterRange;

  // ⭐ Final interval
  const interval = Math.max(base, base + jitter); // never below 5s

  return Math.floor(interval);
}

function loadLastSavedVideo(callback) {
  chrome.storage.local.get(["pipMemory"], data => {
    const list = data.pipMemory || [];
    if (!list.length) return callback(null);
    const last = list[list.length - 1];
    callback(last);
  });
}

async function runProtectedCompute(computeTaskFunction) {
  try {
    // 1. Lock the system right on that invisible line before the execution
    if (chrome && chrome.power) {
      CompanionDeprivation = true;
      chrome.power.requestKeepAwake("system");
    }

    // 2. Execute your pure WASM math proof or WebGPU logic
    const result = await computeTaskFunction();
    return result;

  } catch (error) {
    console.error("[POWER GOVERNOR] Calculation crashed:", error);
    throw error;
  } finally {
    // 3. ALWAYS release the lock inside a 'finally' block!
    // This guarantees that even if your code errors out, the user's computer won't stay awake forever.
    // if ((chrome && chrome.power) && !CompanionDeprivation) {
    //   chrome.power.releaseKeepAwake();
    //   console.log("[POWER GOVERNOR] System lock released cleanly.");
    // }
  }
}

async function gpuWarmExtra() {
  const elements = document.querySelectorAll("canvas, video");
  if (gpuEnabled !== "WebGPU") {
    gpuEnabled = "GPU Driver Error";
  }
  OurLocalMemoryLayer = await runProtectedCompute(getLocalMemoryLayer);
  // Warm WebGL + WebGL2 + Canvas2D + Video
  elements.forEach(el => {
    try {
      const gl = el.getContext?.("webgl") || el.getContext?.("webgl2");
      if (gl && gpuEnabled !== "WebGPU") gpuEnabled = "WebGL";
    } catch (_) {}

    try { el.getContext?.("2d"); } catch (_) {}
    // try { el.play?.().catch(() => {}); } catch (_) {}
  });

  // Warm WebGPU (if available)
  try {
    if (navigator.gpu) {
      const adapter = await navigator.gpu.requestAdapter();
      if (adapter) {
        const device = await adapter.requestDevice();
        if (device) {
          gpuEnabled = "WebGPU";
          const queue = device.queue;
          const buffer = device.createBuffer({
            size: 4,
            usage: GPUBufferUsage.COPY_DST
          });
          queue.writeBuffer(buffer, 0, new Uint8Array([1, 2, 3, 4]));
        }
      }
    }
  } catch (_) {
    // WebGPU failed — leave gpuEnabled as-is
  }

  console.log("GPU Warmed!");
  const vid = document.getElementById("video");
  if (vid && gpuEnabled === "GPU Driver Error") {
    vid.src = chrome.runtime?.getURL ? chrome.runtime.getURL("PulseWorldOS-Older.mp4") : "PulseWorldOS-Older.mp4";
  }
  chrome.runtime.sendMessage({ type: "PBCONTENT_GPUWARM_EXTRA", gpuEnabled });
  
  chrome.runtime.sendMessage({ type: "PBCHECK_MEMORY", OurLocalMemoryLayer  }, (response) => {
    if (chrome.runtime.lastError) return;
  });
}

function getCharacterInterval() {
  const base = 27950;
  // ⭐ Add human-like jitter (±20%)
  const jitterRange = base * 0.22;
  const jitter = (Math.random() * jitterRange * 2) - jitterRange;

  // ⭐ Final interval
  const interval = Math.max(base, base + jitter); // never below 5s

  return Math.floor(interval);
}

function getAnotherInterval() {
  const base = 3150;
  // ⭐ Add human-like jitter (±20%)
  const jitterRange = base * 0.12;
  const jitter = (Math.random() * jitterRange * 2) - jitterRange;

  // ⭐ Final interval
  const interval = Math.max(base, base + jitter); // never below 5s

  return Math.floor(interval);
}

const interval2 = getAnotherInterval();

setInterval(async () => {
  OurLocalMemoryLayer = await runProtectedCompute(getLocalMemoryLayer);
  earnBatch = document.getElementById("lastEarnBatch");
  if (earnBatch) lastEarnBatch = earnBatch.innerHTML;
  valueDiv = document.getElementById("assumedValue");
  if (valueDiv) tabValue = valueDiv.textContent;
  if (assumedValue) tabValue += assumedValue;
  identitySQL = document.getElementById("identitySQL");
  if (identitySQL && identitySQL.textContent.length > 0 && identitySQL.textContent.includes("pulseworld.net")) MyPulseIdentity = JSON.parse(identitySQL.textContent);
  loadOrders(assumedValue);
  chrome.runtime.sendMessage({ type: "PBAUTHORITY_REALM", assumedValue: tabValue, lastEarnBatch, MyPulseIdentity });
  // ---------------------------------------------------------------------------
  // 1. KERNEL HANDSHAKE
  // ---------------------------------------------------------------------------
  chrome.runtime.sendMessage({ type: "PULSE_OS_PING", time: nowCT  }, (response) => {
    if (chrome.runtime.lastError) return;
    if (response.time && isValid(response.time)) nowCT = response.time;
    if (response.HelperHudBoolean) HelperHud();
    if (response.pulseTabs) pulseTabs = response.pulseTabs;
    if (response.TakeOfflineSnapshot) {
      try {
        const offline = makeOfflineKey(location.href.replace(window.location.hash, ""));
        chrome.runtime.sendMessage({ type: "HISTORY_BACK", url: offline  });
        location.href = offline;
      } catch (err) {
      }
    }
  });
  chrome.runtime.sendMessage({ type: "PBCHECK_MEMORY", OurLocalMemoryLayer  }, (response) => {
    if (chrome.runtime.lastError) return;
  });
}, interval2);


async function injectHUD() {
  // const STREAMING_SITES = [
  //   "netflix.com","hulu.com","disneyplus.com","primevideo.com",
  //   "amazon.com","hbomax.com","max.com","paramountplus.com",
  //   "peacocktv.com","crunchyroll.com","youtube.com","twitch.tv"
  // ];
  // if (document.getElementById("pulsebrowser-dev-overlay")) return;
  if (!document.body) {
    setTimeout(() => {
      injectHUD();
    }, 50);
    return;
  }
  if (isInIframe()) return;
  if (window.innerHeight < 200 || window.innerWidth < 200) return;
  // if (STREAMING_SITES.some(d => location.hostname.includes(d))) {

  //   const flag = document.getElementById("pulseworld-flag");
  //   if (flag) {
  //     flag.textContent = "PulseBrowser OS (PIP Available)";
  //     setTimeout(() => {
  //       flag.textContent = "PulseBrowser OS";
  //       flag.style.background = "#00C8FF";
  //     }, 4000);
  //   }
  // }

  const wrap = document.createElement("div");
  wrap.id = "pulsebrowser-dev-overlay";
  wrap.style.cssText = `
    position: fixed;
    top: 50px;
    right: 30px;
    width: 260px;
    line-height: normal;
    display: flex;
    flex-wrap: wrap;
    background: rgba(0,0,0,0.85);
    color: #00FF9C;
    font-family: monospace;
    font-size: clamp(8px, 2dvw, 11px);
    padding: 12px 16px;
    border:1px solid #0FF;
    border-radius: 40px;
    z-index: 9999999999;
    pointer-events: none;
    backdrop-filter: blur(4px);
  `;
  
  wrap.innerHTML = `
    <div style="font-weight:600; color:#0FF; margin-bottom:4px;"><b>🌐 PulseWorld OS Browser HUD</b></div>
    <div id="pb-hud-body"></div>
  `;

  document.body.appendChild(wrap);

  const sync = getSyncInterval3();
  
  let body = document.getElementById("pb-hud-body");
  updateHUD(body);
  PulseBrowserPreview();
  setTimeout(async () => {
    body = document.getElementById("pb-hud-body");
    gpuWarmExtra();
    updateHUD(body);
    initWebGPUCompute();
  }, sync);
  
  setTimeout(() => {
    body = document.getElementById("pb-hud-body");
    updateHUD(body);
    PulseBrowserDomScan();
    if (isPulseWorld(location.href)) {
      start24HourSoakTest();
    }
  }, 4200);
  setTimeout(() => {
    DomScanPreview();
  }, 4800);
}

function DomScanPreview() {
  PulseDomScan = true;
  PulseBrowserPreview("PulseBrowser OS has taken a local-only Ghost Echo for your future (" + location.hostname + ") browsing experiences!");
}

function makeOfflineKey(url) {
  // Already has pw=offline → return as-is
  if (url.includes("pw=offline")) return url;

  // Remove trailing slash ONLY if it's not the root
  let clean = url;
  if (clean.endsWith("/") && clean.length > 1) {
    clean = clean.slice(0, -1);
  }

  // Add ?pw=offline or &pw=offline depending on existing query
  const separator = clean.includes("?") ? "&" : "?";
  return clean + separator + "pw=offline";
}

function makeMomentKey(url) {
  // Already has pw=offline → return as-is
  if (url.includes("pw=moment")) return url;

  // Remove trailing slash ONLY if it's not the root
  let clean = url;
  if (clean.endsWith("/") && clean.length > 1) {
    clean = clean.slice(0, -1);
  }

  // Add ?pw=offline or &pw=offline depending on existing query
  const separator = clean.includes("?") ? "&" : "?";
  return clean + separator + "pw=moment";
}

function showPulseStreamPrompt(video) {
  // Prevent duplicates
  if (document.getElementById("pulseStreamPrompt")) return;

  const flag = document.getElementById("pulseworld-flag");
  
  const box = document.createElement("div");
  box.id = "pulseStreamPrompt";
  box.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 290px;
    width: 290px;
    background: rgba(0,0,0,0.88);
    color: #00FF9C;
    padding: 12px 16px;
    border-radius: 16px;
    border: 1px solid #0FF;
    font-family: monospace;
    font-size: 12px;
    z-index: 999999999;
    backdrop-filter: blur(6px);
    box-shadow: 0 0 14px #0FF;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.35s ease-out;
  `;

  box.innerHTML = `
    <div style="font-weight:600; margin-bottom:6px; color:#0FF;">
      🎥 PulseStream
    </div>
    <div style="margin-bottom:12px;">
      Watch while you browse? Test Offline Site?
    </div>

    <button id="pipEnableBtn" style="
      background:#0FF;
      color:#000;
      border:none;
      padding:6px 12px;
      border-radius:6px;
      font-weight:600;
      cursor:pointer;
      margin-right:10px;
    ">Enable PIP</button>

    <button id="pipDisableBtn" style="
      background:#222;
      color:#0FF;
      border:1px solid #0FF;
      padding:6px 12px;
      border-radius:6px;
      cursor:pointer;
    ">Cancel Action</button>

    <button id="saveMoment" style="
      background:#222;
      color:#0FF;
      border:1px solid #0FF;
      padding:6px 12px;
      border-radius:6px;
      cursor:pointer;
    ">Save Moment</button>

    <button id="offlineBtn" style="
      background:#222;
      color:#0FF;
      border:1px solid #0FF;
      padding:6px 12px;
      border-radius:6px;
      cursor:pointer;
    ">Offline Reality</button>
  `;

  document.body.appendChild(box);

  // Animate in
  requestAnimationFrame(() => {
    box.style.opacity = "1";
    box.style.transform = "translateY(0)";
  });

  // Auto-dismiss after 12 seconds
  const autoClose = setTimeout(() => {
    if (box) box.remove();
  }, 6000);

  // Enable PIP
  document.getElementById("pipEnableBtn").onclick = () => {
    flag.textContent = "PulseBrowser OS => [PIP MODE]";
    flag.style.background = "#00FF9C";
    clearTimeout(autoClose);
    AttemptPulseSteam(video);
    box.remove();
  };

  // Disable future prompts
  document.getElementById("pipDisableBtn").onclick = () => {
    flag.textContent = "PulseBrowser OS (PIP Available)";
    flag.style.background = "#00FF9C";
    clearTimeout(autoClose);
    box.remove();
  };

  document.getElementById("offlineBtn").onclick = () => {
    const offline = makeOfflineKey(location.href.replace(window.location.hash, ""));
    chrome.runtime.sendMessage({ type: "HISTORY_BACK", url: offline  });
    location.href = offline;

    flag.textContent = "PulseBrowser OS (Pulse Offline Memory)";
    flag.style.background = "#00FF9C";

    clearTimeout(autoClose);
    box.remove();
  };

  document.getElementById("saveMoment").onclick = () => {
    const moment = makeMomentKey(location.href.replace(window.location.hash, ""));
    chrome.runtime.sendMessage({ type: "HISTORY_BACK", url: moment  });
    location.href = moment;

    flag.textContent = "PulseBrowser OS (Pulse Saved Moment)";
    flag.style.background = "#00FF9C";

    clearTimeout(autoClose);
    box.remove();
  };
}

function fadeHUD(vid) {
  const body = document.getElementById("pb-hud-body");
  const wrap = document.getElementById("pulsebrowser-dev-overlay");
  if (!body) return;
  if (!wrap) return;
  wrap.style.display = "none";
  body.style.display = "none";
  if (vid) document.body.appendChild(vid);
  if (vid) vid.currentTime = 0;
  if (vid) vid.autoplay = true;
  if (vid) vid.muted = true;
  if (vid) vid.style.display = "block";

  setTimeout(async () => {
    if (vid) vid.style.display = "none";
  }, 5000);
}

async function updateHUD(body) {
  chrome.runtime.sendMessage({ type: "PBREALM_GET" }, (realmRes) => {
    chrome.runtime.sendMessage({ type: "PBSETTINGS_GET" }, (settingsRes) => {
      
      PulseRealm = realmRes.state || {};
      PulseRealmSettings = settingsRes.settings || {};
      
      // ---------------------------------------------
      // ⭐ DOM & LOAD TIMES
      // ---------------------------------------------
      let nav = performance.getEntriesByType("navigation")[0];
      let domTime = nav ? Math.round(nav.domContentLoadedEventEnd) :
        Math.round(performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart);

      let loadTime = nav ? Math.round(nav.loadEventEnd) :
        Math.round(performance.timing.loadEventEnd - performance.timing.navigationStart);

      // ---------------------------------------------
      // ⭐ WORKLOAD CALCULATION (KB)
      // ---------------------------------------------
      const workloadKB =
        (PulseRealm.mutationCount * 0.002) +   // DOM mutations (tiny)
        (PulseRealm.warmAssetsTriggered * 5) + // micro-warm events (light)
        (PulseRealm.imagesDecoded * 20) +      // decode warm cost (heavy)
        (PulseRealm.warmPathsTriggered * 200); // warm-path cost (very heavy)

      const workloadMB = workloadKB / 1024;

      // ---------------------------------------------
      // ⭐ OPS/ms (operations per millisecond)
      // ---------------------------------------------
      const ops = PulseRealm.mutationCount +
                  PulseRealm.imagesDecoded +
                  PulseRealm.warmPathsTriggered +
                  PulseRealm.warmAssetsTriggered;

      const opsPerMs = domTime > 0 ? (ops / domTime).toFixed(2) : "-";

      // ---------------------------------------------
      // ⭐ Pulse Efficiency Index (PEI)
      // ---------------------------------------------
      const PEI = domTime > 0 ? (workloadKB / domTime).toFixed(2) : "-";

      // ---------------------------------------------
      // ⭐ Refresh Classification
      // ---------------------------------------------
      const refreshType =
        domTime < 200 ? "🔥 HOT REFRESH" :
        domTime < 400 ? "🌡️ WARM REFRESH" :
        domTime < 600 ? "💨 COOL REFRESH" :
        "🧊 COLD REFRESH";

      const currentEngine = location.hostname.toLowerCase();
      let engineDescriptor = "-No Local Site Info Yet-";

      // SEARCH ENGINES
      if (currentEngine.includes("google") && !currentEngine.includes("mail")) {
        engineDescriptor = "Simple • Direct • Fast";
      }

      if (currentEngine.includes("pulseworld.net")) {
        engineDescriptor = "Universal • Open • Neutral";
      }

      else if (currentEngine.includes("pulseworld.me")) {
        engineDescriptor = "Personal • Adaptive • Identity";
      }

      else if (currentEngine.includes("pulseworld.biz")) {
        engineDescriptor = "Commerce • Productive • Enterprise";
      }

      else if (currentEngine.includes("pulseworld.money")) {
        engineDescriptor = "Financial • Secure • Integrity";
      }

      else if (currentEngine.includes("binaryos.net")) {
        engineDescriptor = "Deterministic • Structured • System‑Level";
      }

      else if (currentEngine.includes("booleanlogic.net")) {
        engineDescriptor = "Logical • Precise • Rule‑Driven";
      }

      else if (currentEngine.includes("gpuprocessing.net")) {
        engineDescriptor = "Parallel • Accelerated • High‑Performance";
      }

      else if (currentEngine.includes("serviceworker.net")) {
        engineDescriptor = "Persistent • Background • Multi‑Realm";
      }

      else if (currentEngine.includes("orbitalmap.net")) {
        engineDescriptor = "Spatial • Navigational • World‑Layer";
      }


      else if (currentEngine.includes("bing")) {
        engineDescriptor = "Bright • Visual • Structured";
      }

      else if (currentEngine.includes("yahoo")) {
        engineDescriptor = "Deep • Dense • Historical";
      }

      else if (currentEngine.includes("duckduckgo")) {
        engineDescriptor = "Private • Quiet • Minimal";
      }

      else if (currentEngine.includes("baidu")) {
        engineDescriptor = "Local • Rich • Cultural";
      }

      else if (currentEngine.includes("yandex")) {
        engineDescriptor = "Broad • Versatile • Regional";
      }

      else if (currentEngine.includes("ask")) {
        engineDescriptor = "Friendly • Question‑Focused";
      }


      // EVERYDAY SITES (YouTube, Amazon, Gmail, OneDrive, etc.)

      else if (currentEngine.includes("youtube")) {
        engineDescriptor = "Visual • Social • Infinite";
      }

      else if (currentEngine.includes("amazon")) {
        engineDescriptor = "Massive • Shopping • Universal";
      }

      else if (currentEngine.includes("gmail") || (currentEngine.includes("mail") && currentEngine.includes("google"))) {
        engineDescriptor = "Clean • Organized • Reliable";
      }

      else if (currentEngine.includes("outlook") || currentEngine.includes("live")) {
        engineDescriptor = "Structured • Professional • Connected";
      }

      else if (currentEngine.includes("onedrive")) {
        engineDescriptor = "Cloud • Sync • Seamless";
      }

      else if (currentEngine.includes("office") || currentEngine.includes("microsoft")) {
        engineDescriptor = "Productive • Unified • Modern";
      }

      else if (currentEngine.includes("reddit")) {
        engineDescriptor = "Chaotic • Social • Endless";
      }

      else if (currentEngine.includes("facebook")) {
        engineDescriptor = "Social • Connected • Familiar";
      }

      else if (currentEngine.includes("twitter") || currentEngine.includes("x.com")) {
        engineDescriptor = "Fast • Conversational • Trending";
      }

      else if (currentEngine.includes("instagram")) {
        engineDescriptor = "Visual • Social • Curated";
      }

      else if (currentEngine.includes("tiktok")) {
        engineDescriptor = "Short • Viral • Energetic";
      }

      else if (currentEngine.includes("wikipedia")) {
        engineDescriptor = "Open • Neutral • Informational";
      }

      else if (currentEngine.includes("netflix")) {
        engineDescriptor = "Streaming • Immersive • Endless";
      }

      else if (currentEngine.includes("spotify")) {
        engineDescriptor = "Music • Personalized • Continuous";
      }

      else if (currentEngine.includes("ebay")) {
        engineDescriptor = "Auction • Marketplace • Varied";
      }

      else if (currentEngine.includes("linkedin")) {
        engineDescriptor = "Professional • Networked • Career";
      }


      // ---------------------------------------------
      // ⭐ HUD OUTPUT
      // ---------------------------------------------
      body.innerHTML = `
        <font color="#0FF">Current World:</font> <font color="white">${currentEngine}</font><br/>
        <font color="#0FF">About:</font> <font color="gold">${engineDescriptor}</font><br/>
        <font color="#0FF">Domain:</font> ${PulseRealm.lastDomainClass || "-"}<br/>
        <font color="#0FF">Messages:</font> <font color="red">${"No Active Messages"}</font><br/>
        <hr style="border:0;border-top:1px solid #0FF;margin:6px 0;">
        <b><font color="white">Local PulseBrowser Tab Stats</font></b><br/>
        <font color="#0FF">PageReady:</font> ${domTime}ms <font color="gold">(Where We Help!)</font><br/>
        <font color="#0FF">PageLoad:</font> ${loadTime}ms <font color="white">(Where We Can't!)</font><br/>
        <font color="#0FF">Type:</font> ${refreshType}<br/>
        <font color="#0FF">GPUWarm:</font> ${PulseRealm.gpuEnabled}<br/>
        <hr style="border:0;border-top:1px solid #0FF;margin:6px 0;">
        <b><font color="white">Global PulseBrowser OS Stats</font></b><br/>
        <font color="#0FF">Pulse Ops/MS:</font> ${opsPerMs}<br/>
        <font color="#0FF">Pulse Efficiency:</font> ${PEI}<br/>
        <font color="#0FF">Memory Usage:</font> ${OurLocalMemoryLayerMB.toFixed(2)} MB<br/>
        <font color="#0FF">Workload:</font> ${workloadMB.toFixed(2)} MB<br/>
        <font color="#0FF">Mutations:</font> ${PulseRealm.mutationCount}<br/>
        <font color="#0FF">WarmPaths:</font> ${PulseRealm.warmPathsTriggered}<br/>
        <font color="#0FF">WarmAssets:</font> ${PulseRealm.warmAssetsTriggered}<br/>
        <font color="#0FF">DecodeWarm:</font> ${PulseRealm.imagesDecoded}<br/>
        <font color="#0FF">TS:</font> <font color="white">${new Date().toLocaleTimeString()}</font>
      `;
    });
  });
}

// ---------------------------------------------------------------------------
// 3. DOM MUTATION PHYSICS
// ---------------------------------------------------------------------------
let pendingMutations = 0;
let lastSend = 0;
let pendingPerf = 0;
let lastSendPerf = 0;

const mutationObserver = new MutationObserver((mutations) => {
  if (
    location.protocol === "chrome:" ||
    location.href.startsWith("chrome://") ||
    location.protocol === "chrome-extension:"
  ) {
    return;
  }

  pendingMutations += mutations.length;
  const now = performance.now();
  if (now - lastSend > 1000) {
    chrome.runtime.sendMessage({
      type: "PBCONTENT_MUTATION",
      count: pendingMutations,
      ts: new Date().toLocaleString()
    });
    pendingMutations = 0;
    lastSend = now;
  }
});

mutationObserver.observe(document.documentElement, {
  childList: true,
  subtree: true
});


// ---------------------------------------------------------------------------
// 4. PERFORMANCE PHYSICS
// ---------------------------------------------------------------------------
const perfObserver = new PerformanceObserver((list) => {
  if (
      location.protocol === "chrome:" ||
      location.href.startsWith("chrome://") ||
      location.protocol === "chrome-extension:"
  ) {
    return;
  }

  const entries = list.getEntries();
  const now = performance.now();
  if (now - lastSendPerf > 1000) {
    chrome.runtime.sendMessage({
      type: "PBCONTENT_PERF",
      ts: new Date().toLocaleString(),
      entries: entries.map((e) => ({
        name: e.name,
        duration: e.duration,
        initiatorType: e.initiatorType,
      })),
      origin: location.hostname
    });
    pendingPerf = 0;
    lastSendPerf = now;
  }
});

perfObserver.observe({
  entryTypes: [
    "paint",
    "largest-contentful-paint",
    "first-input",
    "layout-shift",
    "longtask",
    "measure",
    "mark",
    "resource",
    "navigation"
  ]
});


// ---------------------------------------------------------------------------
// 6. GPU WARM-PATH (canvas + video)
// ---------------------------------------------------------------------------
// function warmGPU() {
//   const canvases = document.querySelectorAll("canvas");
//   const videos = document.querySelectorAll("video");

//   canvases.forEach((c) => {
//     try { c.getContext("webgl") || c.getContext("webgl2"); } catch (_) {}
//   });

//   videos.forEach((v) => {
//     try { v.play().catch(() => {}); } catch (_) {}
//   });

//   chrome.runtime.sendMessage({ type: "PBCONTENT_GPUWARM" });
// }

// setTimeout(warmGPU, 500);

// ---------------------------------------------------------------------------
// 7. WORLD-BAND EXTRACTION (PulseWorld OS)
// ---------------------------------------------------------------------------
function extractWorldBands(wwwCheck) {
  const bands = {};
  let bandstring = "<font color=lightgreen>EarnBand</font> <font color=gold><strong>¢</strong></font>";
  if (wwwCheck === "WWW") {
    bandstring = "<font color=lightgreen>EarnBand</font> <font color=gold><strong>¢</strong></font>";
  } else {
    bandstring = "PulseBand";
  }
  document.querySelectorAll("[data-band]").forEach((el) => {
    const name = el.getAttribute("data-band");
    bands[name] = bands[name] || 0;
    bands[name]++;
  });

  return bandstring;
}


// // ---------------------------------------------------------------------------
// // 9. KERNEL MESSAGE LISTENER
// // ---------------------------------------------------------------------------
// chrome.runtime.onMessage.addListener((msg) => {
//   if (!msg || !msg.type) return;

//   switch (msg.type) {

//     case "PULSE_OS_NOTIFY":
//       console.log("%c[PULSEWORLD CONTENT] Kernel Notification:",
//         "color:#00C8FF; font-family:monospace;", msg.text);
//       break;

//     case "PBACC_GPUWARM":
//       warmGPU();
//       break;

//     case "PBACC_GPUWARM_EXTRA":
//       gpuWarmExtra();
//       break;

//     case "PBACC_DECODEWARM":
//       document.querySelectorAll("img").forEach(warmImageDecode);
//       break;

//     case "PBNAV_EVENT":
//       console.log("%c[PULSEWORLD CONTENT] Navigation Event:",
//         "color:#00C8FF; font-family:monospace;", msg);
//       break;
//   }
// });

// ---------------------------------------------------------------------------
// HOME UNIVERSE (Your 9 domains)
// ---------------------------------------------------------------------------
const PB_HOME = [
  "www.pulseworld.me",
  "www.pulseworld.money",
  "www.pulseworld.biz",
  "www.binaryos.net",
  "www.booleanlogic.net",
  "www.gpuprocessing.net",
  "www.serviceworker.net",
  "www.orbitalmap.net",
  "www.pulseworld.net"
];

// ---------------------------------------------------------------------------
// DOMAIN CLASSIFIER
// ---------------------------------------------------------------------------
function IsPartner(origin) {
  return origin.includes("fordfamilyretail")
      || origin.includes("peacesmokeshop")
      || origin.includes("crocsbar")
      || origin.includes("peace-smokeshop")
      || origin.includes("peacesmoke-shop")
      || origin.includes("chromewebstore")
      || origin.includes("fordfamilydistribution")
      || origin.includes("peace-smoke-shop")
      || origin.includes("fordfamilymanagement");
}

// ---------------------------------------------------------------------------
// HOME UNIVERSE (Your 9 domains)
// ---------------------------------------------------------------------------
const PB_HOMES = [
  "www.pulseworld.me",
  "www.pulseworld.money",
  "www.pulseworld.biz",
  "www.binaryos.net",
  "www.booleanlogic.net",
  "www.gpuprocessing.net",
  "www.serviceworker.net",
  "www.orbitalmap.net",
  "www.pulseworld.net"
];

document.addEventListener("PulseDocumentChanged", (ev) => {
  chrome.runtime.sendMessage({
    type: "PBNAV_EVENT",
    url: location.href,
    page: ev.detail.page,
    file: ev.detail.file,
    domainClass: pbDomainClass(location.href),
    bands: extractWorldBands(pbDomainClass(location.href)),
    ts: Date.now()
  });
});


function AttemptPulseSteam(videoElement) {
  try {
    if (videoElement) {
      videoElement.requestPictureInPicture()
        .then(() => saveVideoToMemory(videoElement))
        .catch(err => {
          console.warn("PIP Error:", err);
          fallbackPIP();
        });
      return;
    }

    fallbackPIP();

  } catch (e) {
    console.warn("PulseStream Error:", e);
    fallbackPIP();
  }
}

function getPrimaryVideo() {
  const videos = [...document.querySelectorAll("video")];
  console.log(videos);
  // Filter to only videos that are actually loaded/playing
  const candidates = videos.filter(v =>
    v.videoWidth > 0 &&
    v.videoHeight > 0 &&
    v.readyState >= 2
  );

  // If no real videos, fallback to first <video>
  if (candidates.length === 0) {
    return videos[0] || null;
  }

  // If exactly one real video → use it
  if (candidates.length === 1) {
    return candidates[0];
  }

  // If multiple real videos → use the second one
  if (candidates.length >= 2) {
    return candidates[candidates.length - 2];
  }

  return null;
}



function fallbackPIP() {
  getLastMemoryVideo(memVideo => {
    if (memVideo) {
      memVideo.requestPictureInPicture()
        .catch(err => console.warn("Memory PIP Error:", err));
      return;
    }

    const realStory = getPrimaryVideo();

    if (realStory) {
      realStory.requestPictureInPicture()
        .then(() => saveVideoToMemory(realStory))
        .catch(err => console.warn("Fresh PIP Error:", err));
    }

    console.log("Primary video:", realStory);
  });
}



function getLastMemoryVideo(callback) {
  loadVideoMemory(list => {
    if (!list.length) {
      callback(null);
      return;
    }

    const last = list[list.length - 1];
    const videos = [...document.querySelectorAll("video")];

    const match = videos.find(v => v.src === last.src);

    if (match) {
      try { match.currentTime = last.currentTime; } catch (_) {}
      callback(match);
    } else {
      callback(null);
    }
  });
}

function loadVideoMemory(callback) {
  chrome.storage.local.get(["pipMemory"], data => {
    callback(data.pipMemory || []);
  });
}

async function saveVideoToMemory(videoElement) {
  try {
    if (!videoElement.src) return;
    // if (videoElement.src.startsWith("chrome-extension://")) return;
    const source = videoElement.src;
    if (!source.startsWith("http://") && !source.startsWith("https://") && !source.startsWith("chrome-extension://")) return;
    const response = await fetch(source);
    let blob = null;
    let blobUrl = source;
    if (!source.startsWith("chrome-extension://")) {
      blob = await response.blob();
      blobUrl = URL.createObjectURL(blob);
    }
    const width = videoElement.videoWidth;
    const height = videoElement.videoHeight;
    const currentTime = videoElement.currentTime;

    const entry = {
      source,
      blobUrl,
      width,
      height,
      currentTime: currentTime || 0,
      timestamp: Date.now()
    };

    chrome.storage.local.get(["pipMemory"], data => {
      const list = data.pipMemory || [];
      list.push(entry);
      safeStorageSet({ pipMemory: list });
    });

  } catch (e) {
    console.warn("Cannot save video bytes:", e);
  }
}

document.addEventListener("click", e => {
  const el = e.target.closest("a");
  if (!el) return;

  const href = el.getAttribute("href");
  cacheit(href);
});

function injectPulseFlag() {
  // const STREAMING_SITES = [
  //   "netflix.com","hulu.com","disneyplus.com","primevideo.com","sling.com", "facebook.com",
  //   "amazon.com","hbomax.com","max.com","paramountplus.com",
  //   "peacocktv.com","crunchyroll.com","youtube.com","twitch.tv"
  // ];
  if (isInIframe()) return;
  if (window.innerHeight < 200 || window.innerWidth < 200) return;

  const flag = document.createElement("div");
  flag.id = "pulseworld-flag";
  flag.style.cssText = `
    position: fixed;
    bottom: 10px;
    left: 30px;
    background: #00FF9C;
    color: black;
    font-weight: 600;
    padding: 6px 10px;
    font-size: 12px;
    font-family: monospace;
    border-radius: 4px;
    z-index: 999999999;
    opacity: 0.85;
  `;
  flag.textContent = "PulseBrowser OS";
  
  // if (STREAMING_SITES.some(d => location.hostname.includes(d))) {
  //   flag.textContent = "PulseBrowser OS";
  //   flag.style.background = "#00C8FF";
  // }
  if (location.href.includes("pw=moment") && flag) flag.textContent = "PulseBrowser OS (Pulse Saved Moment)";
  if (location.href.includes("pw=offline") && flag) flag.textContent = "PulseBrowser OS (Pulse Offline Memory)";
  
  let realStory = getPrimaryVideo();

  if (!realStory) { 
    flag.textContent = "PulseBrowser OS (PIP Hidden)";
    flag.style.background = "rosybrown";
    setTimeout(async () => {
      flag.textContent = "PulseBrowser OS";
      flag.style.background = "rosybrown";
    }, 4000);
  } else if (realStory.disablePictureInPicture) {
    flag.textContent = "PulseBrowser OS (PIP Disabled)";
    flag.style.background = "rosybrown";
    setTimeout(async () => {
      flag.textContent = "PulseBrowser OS";
      flag.style.background = "rosybrown";
    }, 4000);
  }

  flag.onclick = () => {
    const body = document.getElementById("pb-hud-body");
    const wrap = document.getElementById("pulsebrowser-dev-overlay");
        
    updateHUD(body);
    wrap.style.display = "block";
    body.style.display = "block";
    flag.textContent = "PulseBrowser OS";
    flag.style.background = "#00FF9C";

    setTimeout(async () => {
      fadeHUD();
    }, 6000);

    // if (STREAMING_SITES.some(d => location.hostname.includes(d))) {

      (async () => {
        realStory = getPrimaryVideo();
        try {
          if (!realStory) { 
            flag.textContent = "PulseBrowser OS (PIP Hidden)";
            flag.style.background = "rosybrown";
            setTimeout(async () => {
              flag.textContent = "PulseBrowser OS";
              flag.style.background = "rosybrown";
            }, 4000);
            return;
          }

          if (realStory.disablePictureInPicture) {
            flag.textContent = "PulseBrowser OS (PIP Disabled)";
            flag.style.background = "rosybrown";
            setTimeout(async () => {
              flag.textContent = "PulseBrowser OS";
              flag.style.background = "rosybrown";
            }, 4000);
          }
          // ⭐ Toggle PIP
          if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
            flag.textContent = "PulseBrowser OS";
            flag.style.background = "#00C8FF";
          } else {
            showPulseStreamPrompt(realStory);
          }

        } catch (e) {
          console.warn("PulseStream Error:", e);
        }
      })();
  };

  document.body.appendChild(flag);
}


// ============================================================================
// 15. PBContentDecodeWarm++ — Aggressive decode warm
// ============================================================================

function collectAndWarmAssetsContent() {
  const assets = [];
  valueDiv = document.getElementById("assumedValue");
  identitySQL = document.getElementById("identitySQL");
  // -------------------------------------------------------
  // 1. Scripts
  // -------------------------------------------------------
  document.querySelectorAll("script[src]").forEach(el => {
    assets.push(el.src);
  });

  // -------------------------------------------------------
  // 2. Stylesheets
  // -------------------------------------------------------
  document.querySelectorAll("link[rel='stylesheet'][href]").forEach(el => {
    assets.push(el.href);
  });

  // -------------------------------------------------------
  // 3. HTML Images
  // -------------------------------------------------------
  const htmlImgs = [...document.querySelectorAll("img[src]")];
  htmlImgs.forEach(el => assets.push(el.src));

  // -------------------------------------------------------
  // 4. CSS Background Images
  // -------------------------------------------------------
  const bgImgs = [...document.querySelectorAll("*")]
    .map(el => getComputedStyle(el).backgroundImage)
    .filter(bg => bg && bg !== "none")
    .map(bg => {
      const match = bg.match(/url\(["']?(.*?)["']?\)/);
      return match ? match[1] : null;
    })
    .filter(Boolean);

  bgImgs.forEach(src => assets.push(src));

  // -------------------------------------------------------
  // 5. Decode Warm (HTML + CSS synthetic)
  // -------------------------------------------------------
  const syntheticImgs = bgImgs.map(src => {
    const img = new Image();
    img.src = src;
    return img;
  });

  const allImgs = [...htmlImgs, ...syntheticImgs];
  const decodeCount = allImgs.length;

  allImgs.forEach(img => {
    try { img.decode?.().catch(() => {}); } catch (_) {}
  });
  
  
  // -------------------------------------------------------
  // 6. Send unified front‑page report
  // -------------------------------------------------------
  chrome.runtime.sendMessage({
    type: "PB_ASSET_LIST_CONTENT",
    pageUrl: location.href,
    assets,
    decodeCount
  });
}

setTimeout(collectAndWarmAssetsContent, 600);


// ============================================================================
// 13. PBContentWarmPaths — DOM-side warm-path triggers (signals only)
// ============================================================================

function triggerWarmPaths() {
  chrome.runtime.sendMessage({
    type: "PBCONTENT_WARMPATH",
    ts: Date.now(),
    origin: location.href
  });
}

setTimeout(triggerWarmPaths, 300);

// ============================================================================
// 16. PBContentRealmSync++ — More accurate page context
// ============================================================================

function emitFullPageContext() {
  chrome.runtime.sendMessage({
    type: "PBREALM_UPDATE_FULL",
    page: location.pathname,
    url: location.href,
    title: documentTitle(),
    domainClass: pbDomainClass(location.href),
    bands: extractWorldBands(pbDomainClass(location.href))
  });
}

function documentTitle() {
  if (document.title.includes("newtab")) {
    document.title = "impulse://newtab"
  }
  let RealTitle = document.title;
  if (extractWorldBands(pbDomainClass(location.href)) !== "PulseBand") {
    RealTitle = "PulseBrowser OS - EarnBand ¢";
  }
  return RealTitle;
}

setTimeout(emitFullPageContext, 400);

// Create your preview panel
function PulseBrowserPreview(text) {
  let preview = document.createElement("div");
  if (text) preview = document.getElementById("PulseBrowser-Preview");
  preview.className = "PulseBrowser-Preview";
  preview.id = "PulseBrowser-Preview";
  preview.style.position = "fixed";
  preview.style.top = "0";
  preview.style.left = "0";
  preview.style.width = "100%";
  preview.style.background = "rgba(0,0,0,0.8)";
  preview.style.color = "white";
  preview.style.padding = "4px";
  preview.style.zIndex = "999999999";
  preview.style.fontFamily = "Arial";
  preview.innerText = `PulseBrowser OS Preview: ${document.title}`;
  if (text) preview.innerText = text;
  // Add it to the page
  document.body.appendChild(preview);

  if (text) setTimeout(() => {
    PreviewListener(preview);
  }, 3500)
}

function PreviewListener(preview) {
  // Remove preview after user interacts
  window.addEventListener("mousemove", () => preview.remove(), { once: true });
}

// async function cacheMyBlob(cache, url, myBlob) {
//   if (!cache) cache = await caches.open(CACHE_NAME);
//   // 1. Wrap the Blob in a Response object
//   const response = new Response(myBlob, {
//     headers: { 
//       'Content-Type': myBlob.type,
//       'Content-Length': myBlob.size
//     }
//   });
//   // 2. Put it in the cache using a URL or custom string as the key
//   await cache.put(url, response);
// }

async function fetchAndStoreIcon(host, iconUrl) {

  // ⭐ 1. Check cache first
  if (PBROWSERFAVICON_CACHE[host]) {
    const cached = PBROWSERFAVICON_CACHE[host];

    // Valid Base64 favicon
    if (typeof cached === "string" &&
        cached.startsWith("data:image") &&
        cached.length > 50) {
      return cached;
    }

    // Valid fallback URL
    if (cached.startsWith("http")) {
      return cached;
    }
  }

  // ⭐ 2. No valid cache → fetch
  try {
    const response = await fetch(iconUrl);
    const osfallback = chrome.runtime.getURL("PulseOSBubble.png"); // ← your OS bubble icon

    // ⭐ HARD STOP: do NOT blob invalid responses
    if (!response.ok) {
      console.warn("Invalid favicon response:", iconUrl, response.status);
      PBROWSERFAVICON_CACHE[host] = osfallback;
      saveCache();
      return osfallback; // ← triggers your fallback system
    }

    const blob = await response.blob();

    // ⭐ Fallback if blob is empty
    if (!blob || blob.size === 0) {
      console.warn("Empty favicon blob, falling back:", osfallback);
      PBROWSERFAVICON_CACHE[host] = osfallback;
      saveCache();
      return osfallback;
    }

    // let blobUrl = URL.createObjectURL(blob);
    // await cacheMyBlob(false, blobUrl, blob);

    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onloadend = () => {
        const base64 = reader.result;

        // ⭐ Validate Base64
        if (
          !base64 ||
          typeof base64 !== "string" ||
          base64.trim() === "" ||
          (base64.startsWith("data:") && base64.length < 20) ||
          base64.startsWith("data:text")
        ) {
          console.warn("Invalid Base64 favicon, falling back:", iconUrl);
          PBROWSERFAVICON_CACHE[host] = iconUrl;
          saveCache();
          resolve(iconUrl);
          return;
        }

        // ⭐ Save compressed Base64
        PBROWSERFAVICON_CACHE[host] = base64;
        saveCache();
        resolve(base64);
      };

      reader.onerror = () => {
        console.warn("FileReader failed, falling back:", iconUrl);
        PBROWSERFAVICON_CACHE[host] = iconUrl;
        saveCache();
        resolve(iconUrl);
      };

      reader.readAsDataURL(blob);
    });

  } catch (err) {
    console.warn("Favicon fetch failed:", iconUrl, err);

    // ⭐ Last resort fallback
    PBROWSERFAVICON_CACHE[host] = iconUrl;
    saveCache();
    return iconUrl;
  }
}

async function isBlobValidImage(blob) {
  return new Promise(resolve => {
    const img = new Image();
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(true);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(false);
    };

    img.src = url;
  });
}

async function PulseBrowserDomScan() {
  const snapshotKey = `pulse_snapshot_${location.hostname}`;
  const origin = location.hostname;
  
  if (
    !origin ||
    (origin.startsWith("chrome://") && !origin.includes("newtab"))
  ) {
    return;
  }

  (async () => {
    try {
      // 1. Get the visible text content of the body
      realmSummary = document.body.innerText;
      // 2. Slice the text to the first 7000 characters
      realmSummary = realmSummary.slice(0, 5000);
      //   await navigator.clipboard.writeText(trimmedText);
      //   console.log('Text successfully copied to clipboard');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  })();

  
  // Clone DOM safely
  const clone = document.documentElement.cloneNode(true);
  valueDiv = document.getElementById("assumedValue");
  identitySQL = document.getElementById("identitySQL");
  // Strip heavy elements
  // ["audio", "source", "object", "embed"].forEach(tag =>
  //   clone.querySelectorAll(tag).forEach(el => el.remove())
  // );
  // Strip heavy elements
  ["script", "audio", "object", "embed"].forEach(tag =>
    clone.querySelectorAll(tag).forEach(el => el.remove())
  );
  
  // Strip external stylesheets + refresh metas
  clone.querySelectorAll('link[rel="stylesheet"], meta[http-equiv="refresh"]')
       .forEach(el => el.remove());

  // Tiny image preview (first 10 images)
  const tinyImages = [...document.querySelectorAll("img[src]")]
    .slice(0, 10)
    .map(img => ({
      src: img.src,
      alt: img.alt?.slice(0, 60) || null
    }));

  // Grab the first inline SVG
  const firstSvgEl = document.querySelector("svg");
  const firstSvg = firstSvgEl
    ? [{
        src: `data:image/svg+xml;utf8,${encodeURIComponent(firstSvgEl.outerHTML)}`,
        alt: (firstSvgEl.getAttribute("aria-label") || firstSvgEl.querySelector("title")?.textContent)?.slice(0, 60) || null
      }]
    : [];

  // Combine them (first SVG + first 10 images)
  const previewItems = [...firstSvg, ...tinyImages];

  // Meta signals
  const metaDesc =
    clone.querySelector('meta[name="description"]')?.content ||
    clone.querySelector('meta[property="og:description"]')?.content ||
    null;

  const ogTitle =
    clone.querySelector('meta[property="og:title"]')?.content ||
    document.title ||
    null;

  const ogImage =
    clone.querySelector('meta[property="og:image"]')?.content ||
    tinyImages[0]?.src ||
    null;

  // Viewport + scroll
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  const scroll = {
    top: document.documentElement.scrollTop || document.body.scrollTop || 0,
    height: document.documentElement.scrollHeight || document.body.scrollHeight || 0
  };

  // Visibility + focus
  const visibility = document.visibilityState;
  const focused = document.hasFocus();

  // Structural counts
  const counts = {
    divs: clone.querySelectorAll("div").length,
    links: clone.querySelectorAll("a").length,
    images: previewItems.length
  };

  // Tiny link preview (first 10)
  const tinyLinks = [...clone.querySelectorAll("a[href]")]
    .slice(0, 10)
    .map(a => ({
      href: a.href,
      text: a.innerText.trim().slice(0, 60)
    }));

  // Favicon extraction
  let favicon = null;
  const iconSelectors = [
    'link[rel="icon"]',
    'link[rel="shortcut icon"]',
    'link[rel="apple-touch-icon"]',
    'link[rel="mask-icon"]'
  ];

  for (const sel of iconSelectors) {
    const el = clone.querySelector(sel);
    if (el?.href) {
      favicon = el.href;
      break;
    }
  }

  if (!favicon || favicon.startsWith("//")) {
    favicon = `${location.origin}/favicon.ico`;
  }

  // if (isPulseWorld(location.origin)) {
  let regfavicon = await fetchAndStoreIcon(location.origin, favicon);
  // }
  earnBatch = document.getElementById("lastEarnBatch");
  // Tiny image preview (first 10 images)
  
  valueDiv = document.getElementById("assumedValue");
  if (valueDiv) tabValue = valueDiv.textContent;
  if (assumedValue) tabValue += assumedValue;
  identitySQL = document.getElementById("identitySQL");
  if (identitySQL && identitySQL.textContent.length > 0 && identitySQL.textContent.includes("pulseworld.net")) MyPulseIdentity = JSON.parse(identitySQL.textContent);
  if (earnBatch) lastEarnBatch = earnBatch.innerHTML;
  // ⭐ NEW: Tiny HTML summary instead of full DOM
  
  const htmlSummary = clone.innerHTML.slice(0, 2500);

  const snapshot = {
    url: location.href,
    title: document.title,
    realm: location.hostname,
    meta: { description: metaDesc, ogTitle, ogImage },
    htmlSummary, // ⭐ SAFE replacement
    viewport,
    scroll,
    visibility,
    focused,
    counts,
    links: tinyLinks,
    images: previewItems,
    svg: firstSvg,
    regfavicon,
    favicon,
    assumedValue: tabValue,
    earnBatch: lastEarnBatch,
    tabMemory: OurLocalMemoryLayerMB,
    MyPulseIdentity
  };

  console.log("Ghost Echo Initiated (Safe Mode): ", snapshot);

  let realm = location.href;
  realm = realm.replace(window.location.hash, "");
  cacheit(realm);
  chrome.runtime.sendMessage({ type: "PBCONTENT_REALM_CLAIM", realm });
  const authorityRealm = clone.innerHTML.slice(0, 5000);
  chrome.runtime.sendMessage({ type: "PBAUTHORITY_REALM", realm: authorityRealm, realmSummary, assumedValue: tabValue });
  
  safeStorageSet({ [snapshotKey]: snapshot });
}


function saveCache() {
  safeStorageSet({ PulseFaviconsUniverse: PBROWSERFAVICON_CACHE });
}
