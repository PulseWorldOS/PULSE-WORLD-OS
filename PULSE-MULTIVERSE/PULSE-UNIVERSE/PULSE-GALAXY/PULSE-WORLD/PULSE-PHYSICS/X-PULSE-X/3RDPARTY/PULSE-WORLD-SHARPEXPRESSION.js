// ============================================================================
// FILE: PULSE-WORLD-SHARPEXPRESSION.js
// ROLE: PulseWorld-native "sharp"-style image/video/anime processor
// ENV: Browser / Worker / PulseWorld runtime
// ============================================================================
// ============================================================================
//  SHARP-LIKE IMAGE CORE
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


export function sharp(inputBuffer, options = {}) {
  const config = {
    failOnError: false,
    ...options
  };

  const state = {
    inputBuffer,
    format: "unknown",
    width: null,
    height: null,
    targetWidth: null,
    targetHeight: null,
    _decodedBitmapPromise: null
  };

  function toBlob(input) {
    if (input instanceof Blob) return input;
    if (input instanceof ArrayBuffer) return new Blob([input]);
    if (ArrayBuffer.isView(input)) return new Blob([input.buffer]);
    throw new Error("sharp(): unsupported input type");
  }

  function decodeBitmap() {
    if (state._decodedBitmapPromise) return state._decodedBitmapPromise;

    state._decodedBitmapPromise = (async () => {
      const blob = toBlob(state.inputBuffer);
      state.format = blob.type || "image/unknown";
      const bitmap = await createImageBitmap(blob);
      state.width = bitmap.width;
      state.height = bitmap.height;
      return bitmap;
    })();

    return state._decodedBitmapPromise;
  }

  function createCanvas(width, height) {
    if (typeof OffscreenCanvas !== "undefined") {
      return new OffscreenCanvas(width, height);
    }
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  async function renderToBlob(type = "image/png", quality) {
    const bitmap = await decodeBitmap();

    const outWidth = state.targetWidth || state.width || bitmap.width;
    const outHeight = state.targetHeight || state.height || bitmap.height;

    const canvas = createCanvas(outWidth, outHeight);
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, outWidth, outHeight);
    ctx.drawImage(bitmap, 0, 0, outWidth, outHeight);

    if (canvas.convertToBlob) {
      return canvas.convertToBlob({ type, quality });
    }

    return await new Promise((resolve, reject) => {
      canvas.toBlob(
        blob => {
          if (!blob) return reject(new Error("Failed to create blob from canvas"));
          resolve(blob);
        },
        type,
        quality
      );
    });
  }

  const api = {
    async metadata() {
      try {
        const blob = toBlob(state.inputBuffer);
        const bitmap = await decodeBitmap();
        return {
          format: state.format,
          width: bitmap.width,
          height: bitmap.height,
          size: blob.size
        };
      } catch (err) {
        if (config.failOnError) throw err;
        const size =
          state.inputBuffer && typeof state.inputBuffer.length === "number"
            ? state.inputBuffer.length
            : 0;
        return {
          format: "unknown",
          width: null,
          height: null,
          size
        };
      }
    },

    resize(width, height) {
      state.targetWidth = typeof width === "number" ? width : null;
      state.targetHeight = typeof height === "number" ? height : null;
      return api;
    },

    async toBuffer(options = {}) {
      try {
        const type = options.type || "image/png";
        const quality = options.quality;
        const blob = await renderToBlob(type, quality);
        const ab = await blob.arrayBuffer();
        return new Uint8Array(ab);
      } catch (err) {
        if (config.failOnError) throw err;
        if (state.inputBuffer instanceof Uint8Array) return state.inputBuffer;
        if (state.inputBuffer instanceof ArrayBuffer) return new Uint8Array(state.inputBuffer);
        if (ArrayBuffer.isView(state.inputBuffer)) return new Uint8Array(state.inputBuffer.buffer);
        return new Uint8Array();
      }
    },

    async toFile(path, options = {}) {
      const buf = await  api.toBuffer(options);
      return {
        path,
        size: buf.length,
        buffer: buf,
        format: state.format
      };
    },

    async toBlob(options = {}) {
      const type = options.type || "image/png";
      const quality = options.quality;
      return renderToBlob(type, quality);
    },
    
    generate: async function (chunks) {
      if (!Array.isArray(chunks)) {
        throw new Error("sharp.generate(): expected an array of chunk buffers");
      }

      const expressions = [];

      for (let i = 0; i < chunks.length; i++) {
        const chunkBuffer = chunks[i];

        // Create a new sharp instance for each chunk
        const instance = sharp(chunkBuffer);

        const meta = await instance.metadata();

        expressions.push({
          id: "chunk-" + i,
          width: meta.width,
          height: meta.height,
          format: meta.format,
          size: meta.size
        });
      }

      return { expressions };
    },

  };

  return api;
}

PulseRealm.PulseImageSharp = sharp;
PulseRealm.WorldSharpImage = { sharp };

// ============================================================================
//  IMAGE / VIDEO / ANIME AUTO (SHARP-ENABLED)
// ============================================================================

// ---------------------------
// IMAGE AUTO (binary + URL)
// ---------------------------

PulseRealm.PulseImageAuto = (() => {
  const cache = new Map(); // key -> url (string)

  function isImageSignal(path) {
    if (!path) return false;
    if (path.startsWith("http") || path.startsWith("//")) return false;
    if (path.startsWith("blob:") || path.startsWith("data:")) return false;
    if (!path.startsWith("./_EXPRESSIONS/_PEX/BUILD/") && !path.startsWith("./_EXPRESSIONS/_PEX/BUILD/") && !path.startsWith("./_EXPRESSIONS/_PEX/BUILD/") && !path.startsWith("./_EXPRESSIONS/_PEX/BUILD/")) return false;
    const name = path.split("/").pop() || "";
    return !name.includes(".");
  }

  // key can be a string path OR a logical id for binary payloads
  async function resolveToUrl(key, opts = {}) {
    // 1) string signal path → direct URL
    if (typeof key === "string") {
      if (!isImageSignal(key)) {
        console.warn("[PULSEWORLD::IMAGE-AUTO] Rejected Non-Image Signal:", key);
        return null;
      }
      if (cache.has(key)) return cache.get(key);
      cache.set(key, key);
      return key;
    }

    // 2) binary buffer → sharp → blob URL
    if (key instanceof Uint8Array || key instanceof ArrayBuffer || ArrayBuffer.isView(key)) {
      const cacheKey = opts.cacheKey || `bin:${key.byteLength || key.length}:${opts.type || "png"}`;
      if (cache.has(cacheKey)) return cache.get(cacheKey);

      try {
        const img = sharp(key, { failOnError: false });
        if (opts.resizeWidth || opts.resizeHeight) {
          img.resize(opts.resizeWidth || null, opts.resizeHeight || null);
        }
        const blob = await img.toBlob({ type: opts.type || "image/png", quality: opts.quality });
        const url = URL.createObjectURL(blob);
        cache.set(cacheKey, url);
        return url;
      } catch (err) {
        console.warn("[PULSEWORLD::IMAGE-AUTO] Binary decode failed:", err);
        return null;
      }
    }

    console.warn("[PULSEWORLD::IMAGE-AUTO] Unsupported key type:", key);
    return null;
  }

  async function apply(target, key, opts = {}) {
    const el = typeof document !== "undefined" ? document.querySelector(target) : null;
    if (!el) return;
    const url = await resolveToUrl(key, opts);
    if (!url) return;

    requestAnimationFrame(() => {
      if (!opts.pseudo) {
        el.style.backgroundImage = `url(${url})`;
      } else {
        el.style.setProperty(`--${opts.pseudo}-bg`, `url(${url})`);
      }
      if (opts.opacity != null) el.style.opacity = opts.opacity;
      if (opts.duration) el.style.animationDuration = opts.duration;
    });
  }

  function express(payload) {
    const { target, path, opts } = payload;
    return apply(target, path, opts);
  }

  return { apply, express, resolveToUrl };
})();

PulseRealm.PulseImageAutoApply = (target, pathOrBuffer, opts = {}) => {
  return PulseRealm.PulseImageAuto.apply(target, pathOrBuffer, opts);
};

// ---------------------------
// VIDEO AUTO (binary + URL)
// ---------------------------

PulseRealm.PulseVideoAuto = (() => {
  const cache = new Map(); // key -> url

  function isVideoSignal(path) {
    if (!path) return false;
    if (path.startsWith("http") || path.startsWith("//")) return false;
    if (path.startsWith("blob:") || path.startsWith("data:")) return false;
    if (!path.startsWith("./_EXPRESSIONS/_VIDEOS/") && !path.startsWith("./_ANIME/")) return false;
    const name = path.split("/").pop() || "";
    return !name.includes(".");
  }

  async function resolveToUrl(key, opts = {}) {
    // 1) string signal path
    if (typeof key === "string") {
      if (!isVideoSignal(key)) {
        console.warn("[PULSEWORLD::VIDEO-AUTO] Rejected Non-Video Signal:", key);
        return null;
      }
      if (cache.has(key)) return cache.get(key);
      cache.set(key, key);
      return key;
    }

    // 2) binary buffer → blob URL
    if (key instanceof Uint8Array || key instanceof ArrayBuffer || ArrayBuffer.isView(key)) {
      const cacheKey = opts.cacheKey || `vid:${key.byteLength || key.length}:${opts.type || "video/mp4"}`;
      if (cache.has(cacheKey)) return cache.get(cacheKey);

      try {
        const blob = new Blob(
          [key instanceof Uint8Array ? key : ArrayBuffer.isView(key) ? key.buffer : key],
          { type: opts.type || "video/mp4" }
        );
        const url = URL.createObjectURL(blob);
        cache.set(cacheKey, url);
        return url;
      } catch (err) {
        console.warn("[PULSEWORLD::VIDEO-AUTO] Binary video create failed:", err);
        return null;
      }
    }

    console.warn("[PULSEWORLD::VIDEO-AUTO] Unsupported key type:", key);
    return null;
  }

  async function apply(target, key, opts = {}) {
    const el = typeof document !== "undefined" ? document.querySelector(target) : null;
    if (!el) return;
    const url = await resolveToUrl(key, opts);
    if (!url) return;

    requestAnimationFrame(() => {
      if (el.tagName === "VIDEO") {
        el.src = url;
        if (opts.autoplay) el.autoplay = true;
        if (opts.loop) el.loop = true;
        if (opts.muted != null) el.muted = opts.muted;
        if (opts.controls != null) el.controls = opts.controls;
        try {
          if (opts.autoplay) el.play().catch(() => {});
        } catch {}
      } else {
        el.style.backgroundVideo = `url(${url})`; // purely symbolic; real usage via <video>
      }
    });
  }

  function express(payload) {
    const { target, path, opts } = payload;
    return apply(target, path, opts);
  }

  return { apply, express, resolveToUrl };
})();

PulseRealm.PulseVideoAutoApply = (target, pathOrBuffer, opts = {}) => {
  return PulseRealm.PulseVideoAuto.apply(target, pathOrBuffer, opts);
};

// ---------------------------
// ANIME AUTO (image/video hybrid)
// ---------------------------

PulseRealm.PulseAnimeAuto = (() => {
  const cache = new Map(); // key -> url

  function isAnimeSignal(path) {
    if (!path) return false;
    if (path.startsWith("http") || path.startsWith("//")) return false;
    if (path.startsWith("blob:") || path.startsWith("data:")) return false;
    if (!path.startsWith("./_ANIME/")) return false;
    const name = path.split("/").pop() || "";
    return !name.includes(".");
  }

  async function resolveToUrl(key, opts = {}) {
    // 1) string signal path
    if (typeof key === "string") {
      if (!isAnimeSignal(key)) {
        console.warn("[PULSEWORLD::ANIME-AUTO] Rejected Non-Anime Signal:", key);
        return null;
      }
      if (cache.has(key)) return cache.get(key);
      cache.set(key, key);
      return key;
    }

    // 2) binary buffer → blob URL (could be gif/webm/apng)
    if (key instanceof Uint8Array || key instanceof ArrayBuffer || ArrayBuffer.isView(key)) {
      const cacheKey = opts.cacheKey || `anime:${key.byteLength || key.length}:${opts.type || "image/gif"}`;
      if (cache.has(cacheKey)) return cache.get(cacheKey);

      try {
        const blob = new Blob(
          [key instanceof Uint8Array ? key : ArrayBuffer.isView(key) ? key.buffer : key],
          { type: opts.type || "image/gif" }
        );
        const url = URL.createObjectURL(blob);
        cache.set(cacheKey, url);
        return url;
      } catch (err) {
        console.warn("[PULSEWORLD::ANIME-AUTO] Binary anime create failed:", err);
        return null;
      }
    }

    console.warn("[PULSEWORLD::ANIME-AUTO] Unsupported key type:", key);
    return null;
  }

  async function apply(target, key, opts = {}) {
    const el = typeof document !== "undefined" ? document.querySelector(target) : null;
    if (!el) return;
    const url = await resolveToUrl(key, opts);
    if (!url) return;

    requestAnimationFrame(() => {
      if (!opts.pseudo) {
        el.style.backgroundImage = `url(${url})`;
      } else {
        el.style.setProperty(`--${opts.pseudo}-bg`, `url(${url})`);
      }
      if (opts.opacity != null) el.style.opacity = opts.opacity;
      if (opts.duration) el.style.animationDuration = opts.duration;
    });
  }

  function express(payload) {
    const { target, path, opts } = payload;
    return apply(target, path, opts);
  }

  return { apply, express, resolveToUrl };
})();

PulseRealm.PulseAnimeAutoApply = (target, pathOrBuffer, opts = {}) => {
  return PulseRealm.PulseAnimeAuto.apply(target, pathOrBuffer, opts);
};

// binary example (new behavior)
// const buf = await ... Uint8Array from your bin loader
// PulseRealm.PulseImageAuto.apply("#bg1", buf, {
//   opacity: 0.35,
//   duration: "55s",
//   resizeWidth: 1920,
//   resizeHeight: 1080,
//   type: "image/webp",
//   quality: 0.9,
//   cacheKey: "Pulsar1-1920x1080-webp"
// });
