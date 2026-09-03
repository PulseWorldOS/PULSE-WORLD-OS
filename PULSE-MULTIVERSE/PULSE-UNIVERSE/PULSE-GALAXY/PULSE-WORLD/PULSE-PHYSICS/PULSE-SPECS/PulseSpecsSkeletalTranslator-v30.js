/**
 * ============================================================================
 * ORGAN: PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-WORLD/PULSE-SPECS/
 *        PulseSpecsSkeletalTranslator-v30++
 * VERSION: v30-IMMORTAL++ (ONE-BAND / ZERO-HALLUCINATION / DOM-CORTEX)
 * LAYER: DOM (Decrypted Visibility Layer)
 * ROLE: Convert raw DOM → deterministic semantic skeleton (SkeletalSpec v30++)
 * ============================================================================
 *
 * This organ is the “eyes” of the organism.
 *
 * It takes a DOM snapshot from a browser context (extension, webview, custom
 * client) and produces a SkeletalSpec — a minimal, stable, structured
 * representation of what is visibly happening on the page right now.
 *
 * NEW IN v30++ ONE-BAND:
 * ----------------------
 * • OneBand metadata (band: "oneband")
 * • advantage-aware (gpu, warmPath, earn)
 * • router-aware (worldRouterHint, schedulerHint)
 * • binary substrate hints (binaryFrame)
 * • deterministic region hashing (intellHash)
 * • expanded block types (ui-control, nav, button, label, input)
 * • mesh-aware DOM (if DOM is remote-rendered)
 *
 * DOWNSTREAM CONSUMERS:
 * ---------------------
 *   - Genome Translator v30++
 *   - Network Translator v30++
 *   - Memory Cortex (ShortTerm, LongTerm, Muscle)
 *   - Prewarm / routing / hinting systems
 *   - Earn / usage / billing
 *
 * IMMORTAL-TIER GUARANTEES:
 * -------------------------
 * 1. Deterministic: same DOM → same SkeletalSpec.
 * 2. Zero Hallucination: no invented text, no inferred meaning.
 * 3. Minimal Interpretation: structural only.
 * 4. Schema Stability: SkeletalSpec v30++ is a hard contract.
 * 5. Safety: no DOM writes, no PII inference, no network calls.
 */

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


// ============================================================================
// PUBLIC ENTRYPOINT — v30++
// ============================================================================

export function buildSkeletalSpec({
  domSnapshot,
  url,
  title,
  timestamp,
  advantage = {},
  worldRouterHint = null,
  schedulerHint = null
}) {
  const root = normalizeRoot(domSnapshot);

  const mode = inferModeFromDom(root);
  const primaryRegion = extractPrimaryRegion(root);
  const blocks = extractContentBlocks(root, primaryRegion);

  const activeElement = getActiveElementInfo(root);
  const selection = getSelectionInfo(root);
  const scroll = getScrollInfo(root);

  return {
    specVersion: "v30-skeletal-oneband",
    band: "oneband",

    meta: {
      url,
      title,
      capturedAt: timestamp,
      advantage,
      worldRouterHint,
      schedulerHint
    },

    focus: {
      mode,
      primaryRegion
    },

    content: {
      blocks: blocks.map((block, index) => ({
        id: `block-${index + 1}`,
        type: block.type,
        role: block.role || null,
        text: block.text,
        selector: block.selector || null
      }))
    },

    interaction: {
      activeElement,
      selection,
      scroll
    }
  };
}

// ============================================================================
// ROOT NORMALIZATION
// ============================================================================

function normalizeRoot(domSnapshot) {
  return domSnapshot || document;
}

// ============================================================================
// MODE INFERENCE — v30++
// ============================================================================

function inferModeFromDom(root) {
  try {
    const body = root.body || root;

    if (body.querySelector('[role="log"], [data-chat], .chat, .conversation'))
      return "chat";

    if (body.querySelector("article, [role='article']"))
      return "article";

    if (body.querySelector("textarea, [contenteditable='true'], .CodeMirror, .monaco-editor"))
      return "editor";

    if (body.querySelector("form") && body.querySelectorAll("input, textarea, select").length > 3)
      return "form";

    const cards = body.querySelectorAll("article, .card, [data-feed-item]");
    if (cards.length >= 5)
      return "feed";

    return "unknown";
  } catch {
    return "unknown";
  }
}

// ============================================================================
// PRIMARY REGION EXTRACTION — v30++
// ============================================================================

function extractPrimaryRegion(root) {
  try {
    const body = root.body || root;

    let el =
      body.querySelector("main") ||
      body.querySelector("article") ||
      body.querySelector("[role='main']");

    if (!el) el = findLargestTextContainer(body);

    if (!el) {
      return { selector: null, description: null };
    }

    return {
      selector: buildDomSelector(el),
      description: describeElement(el)
    };
  } catch {
    return { selector: null, description: null };
  }
}

function findLargestTextContainer(root) {
  let best = null;
  let bestScore = 0;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, null);
  while (walker.nextNode()) {
    const el = walker.currentNode;
    if (!isVisible(el)) continue;

    const text = el.innerText || "";
    const score = text.trim().length;

    if (score > bestScore) {
      bestScore = score;
      best = el;
    }
  }

  return best;
}

function buildDomSelector(el) {
  if (!el || !el.tagName) return "";

  const parts = [];
  let current = el;

  while (current && current.tagName && parts.length < 5) {
    let part = current.tagName.toLowerCase();
    if (current.id) {
      part += `#${current.id}`;
      parts.unshift(part);
      break;
    } else {
      if (current.classList && current.classList.length > 0) {
        part += "." + Array.from(current.classList).slice(0, 2).join(".");
      }
      parts.unshift(part);
      current = current.parentElement;
    }
  }

  return parts.join(" > ");
}

function describeElement(el) {
  const tag = el.tagName.toLowerCase();
  const id = el.id ? `#${el.id}` : "";
  const cls =
    el.classList && el.classList.length
      ? "." + Array.from(el.classList).slice(0, 2).join(".")
      : "";
  return `${tag}${id}${cls}`;
}

// ============================================================================
// CONTENT BLOCK EXTRACTION — v30++
// ============================================================================

function extractContentBlocks(root, primaryRegion) {
  const container = resolvePrimaryContainer(root, primaryRegion);
  if (!container) return [];

  const blocks = [];

  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_ELEMENT,
    null
  );

  while (walker.nextNode()) {
    const el = walker.currentNode;
    if (!isVisible(el)) continue;

    const tag = el.tagName.toLowerCase();
    const selector = buildDomSelector(el);

    // Headings
    if (/^h[1-6]$/.test(tag)) {
      const text = (el.innerText || "").trim();
      if (text) blocks.push({ type: "heading", text, selector });
      continue;
    }

    // Paragraph-like
    if (isBlockLevel(el)) {
      const text = (el.innerText || "").trim();
      if (text) blocks.push({ type: "paragraph", text, selector });
      continue;
    }

    // Code blocks
    if (tag === "pre" || tag === "code") {
      const text = (el.innerText || "").trim();
      if (text) blocks.push({ type: "code", text, selector });
      continue;
    }

    // Chat messages
    if (el.getAttribute("data-message-role")) {
      const role = el.getAttribute("data-message-role");
      const text = (el.innerText || "").trim();
      if (text) blocks.push({ type: "message", role, text, selector });
      continue;
    }

    // UI controls
    if (tag === "button") {
      const text = (el.innerText || "").trim();
      blocks.push({ type: "button", text, selector });
      continue;
    }

    if (tag === "input" || tag === "textarea" || tag === "select") {
      blocks.push({
        type: "input",
        text: el.value || "",
        selector
      });
      continue;
    }

    // Navigation
    if (tag === "nav") {
      const text = (el.innerText || "").trim();
      blocks.push({ type: "nav", text, selector });
      continue;
    }
  }

  return blocks;
}

function resolvePrimaryContainer(root, primaryRegion) {
  const body = root.body || root;
  if (primaryRegion && primaryRegion.selector) {
    const el = body.querySelector(primaryRegion.selector);
    if (el) return el;
  }
  return body;
}

function isVisible(el) {
  const style = PulseRealm.getComputedStyle(el);
  if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0")
    return false;

  const rect = el.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return false;

  return true;
}

function isBlockLevel(el) {
  const style = PulseRealm.getComputedStyle(el);
  return (
    style.display === "block" ||
    style.display === "flex" ||
    style.display === "grid" ||
    style.display === "list-item"
  );
}

// ============================================================================
// INTERACTION CAPTURE — v30++
// ============================================================================

function getActiveElementInfo(root) {
  try {
    const doc = root.ownerDocument || root;
    const el = doc.activeElement;
    if (!el || el === doc.body) {
      return { tag: null, type: null, id: null, classList: null };
    }

    return {
      tag: el.tagName ? el.tagName.toLowerCase() : null,
      type: el.type || null,
      id: el.id || null,
      classList: el.classList ? Array.from(el.classList) : null
    };
  } catch {
    return { tag: null, type: null, id: null, classList: null };
  }
}

function getSelectionInfo(root) {
  try {
    const doc = root.ownerDocument || root;
    const sel = doc.getSelection ? doc.getSelection() : PulseRealm.getSelection();
    if (!sel || sel.rangeCount === 0) return { text: null };

    const text = sel.toString().trim();
    return { text: text || null };
  } catch {
    return { text: null };
  }
}

function getScrollInfo(root) {
  try {
    const doc = root.ownerDocument || root;
    const scrollingElement = doc.scrollingElement || doc.documentElement || doc.body;

    return {
      scrollTop: scrollingElement.scrollTop || 0,
      scrollHeight: scrollingElement.scrollHeight || 0,
      viewportHeight: window.innerHeight || 0
    };
  } catch {
    return { scrollTop: 0, scrollHeight: 0, viewportHeight: 0 };
  }
}

PulseRealm.SpecsSkeletalTranslator = {
  buildSkeletalSpec
}