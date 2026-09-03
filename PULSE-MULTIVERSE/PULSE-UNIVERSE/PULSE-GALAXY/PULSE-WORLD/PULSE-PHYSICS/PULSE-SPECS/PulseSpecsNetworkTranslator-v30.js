/**
 * ============================================================================
 * ORGAN: PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-WORLD/PULSE-SPECS/
 *        PulseSpecsNetworkTranslator-v30++
 * VERSION: v30-IMMORTAL++ (ONE-BAND / ROUTER-AWARE / INTELLE-NET)
 * LAYER: NETWORK (Proxy / Transport Intelligence Layer)
 * ROLE: Convert raw network events → deterministic NetworkSpec (v30 oneband).
 * ============================================================================
 *
 * This organ is the organism’s **circulatory map** in the OneBand era.
 *
 * It takes raw network events observed by your proxy (requests/responses,
 * timings, sizes, endpoints) and converts them into a structured, stable
 * NetworkSpec that describes:
 *
 *   - sessions
 *   - flows (e.g., "LLM turn", "page load", "asset burst", "mesh-hop")
 *   - routes (individual HTTP(S) calls, mesh hops, or local edges)
 *
 * INTERNET = JUST A ROUTE
 * -----------------------
 * v30++ treats “internet” as **one more route type**:
 *   - local:   in-process / same-host
 *   - mesh:    device-to-device / edge mesh
 *   - remote:  classic internet / cloud
 *
 * DOWNSTREAM CONSUMERS
 * --------------------
 *   - Genome organ (PulseSpecsGenomeTranslator-v30++)
 *   - INTELLEDB memory organs (ShortTerm, LongTerm, Muscle)
 *   - Proxy decision organs (routing, prewarm, caching, mesh vs cloud)
 *   - Earn / billing / usage tracking
 *
 * IMMORTAL-TIER GUARANTEES
 * ------------------------
 * 1. Determinism:
 *    Same input events → same NetworkSpec.
 *
 * 2. Zero Hallucination:
 *    Only describes observed events.
 *
 * 3. Minimal Interpretation:
 *    Light classification only (llm-turn, page-load, mesh-hop, etc.).
 *
 * 4. Schema Stability:
 *    NetworkSpec v30-IMMORTAL++ is a hard contract.
 *
 * 5. Safety:
 *    - No network calls
 *    - No mutation of external state
 *    - No PII inference
 *
 * INPUT CONTRACT (v30++)
 * ----------------------
 * buildNetworkSpec({
 *   events: Array<{
 *     id: string,
 *     method: string,
 *     url: string,
 *     host: string,
 *     path: string,
 *     startTime: number,
 *     endTime: number,
 *     requestBytes: number,
 *     responseBytes: number,
 *     statusCode?: number,
 *     tags?: string[],
 *     transport?: "local" | "mesh" | "remote",   // NEW
 *     band?: "oneband" | "symbolic" | "binary",  // NEW (default oneband)
 *     routeHint?: {                              // NEW (world_router_hint-like)
 *       region?: string,
 *       tenant?: string,
 *       priority?: number
 *     }
 *   }>,
 *   sessionId: string,
 *   timestamp: string (ISO 8601),
 *   worldRouterHint?: Object | null,   // optional global routing hint
 *   schedulerHint?: Object | null      // optional scheduler hint
 * })
 *
 * OUTPUT CONTRACT (v30++)
 * -----------------------
 * NetworkSpec v30:
 *
 * {
 *   specVersion: "v30-network-oneband",
 *   band: "oneband",
 *   sessionId: string,
 *   capturedAt: string,
 *   worldRouterHint: Object | null,
 *   schedulerHint: Object | null,
 *   summary: {
 *     totalRequests: number,
 *     totalBytes: number,
 *     durationMs: number,
 *     llmCalls: number,
 *     apiCalls: number,
 *     assetCalls: number,
 *     meshHops: number,
 *     localCalls: number,
 *     remoteCalls: number
 *   },
 *   flows: Array<{
 *     id: string,
 *     kind:
 *       | "llm-turn"
 *       | "page-load"
 *       | "asset-burst"
 *       | "api-call"
 *       | "mesh-hop"
 *       | "local-burst"
 *       | "remote-burst"
 *       | "other",
 *     startedAt: number,
 *     endedAt: number,
 *     stats: {
 *       requestCount: number,
 *       totalBytes: number,
 *       durationMs: number
 *     },
 *     transportSummary: {
 *       local: number,
 *       mesh: number,
 *       remote: number
 *     },
 *     routes: Array<{
 *       id: string,
 *       method: string,
 *       url: string,
 *       host: string,
 *       path: string,
 *       tags: string[],
 *       transport: "local" | "mesh" | "remote",
 *       band: "oneband" | "symbolic" | "binary",
 *       routeHint: {
 *         region?: string,
 *         tenant?: string,
 *         priority?: number
 *       } | null,
 *       timing: {
 *         start: number,
 *         end: number,
 *         durationMs: number
 *       },
 *       size: {
 *         requestBytes: number,
 *         responseBytes: number
 *       },
 *       statusCode: number | null
 *     }>
 *   }>
 * }
 */

// ============================================================================
// PUBLIC ENTRYPOINT — v30++ ONEBAND
// ============================================================================

export function buildNetworkSpec({
  events,
  sessionId,
  timestamp,
  worldRouterHint = null,
  schedulerHint = null
}) {
  const normalized = normalizeEvents(events);
  const summary = summarizeNetwork(normalized);
  const flows = groupIntoFlows(normalized);

  return {
    specVersion: "v30-network-oneband",
    band: "oneband",
    sessionId,
    capturedAt: timestamp,
    worldRouterHint,
    schedulerHint,
    summary,
    flows: flows.map((flow, i) => ({
      id: `flow-${i + 1}`,
      kind: flow.kind,
      startedAt: flow.startedAt,
      endedAt: flow.endedAt,
      stats: {
        requestCount: flow.requests.length,
        totalBytes: flow.totalBytes,
        durationMs: flow.durationMs
      },
      transportSummary: flow.transportSummary,
      routes: flow.requests.map((r, j) => ({
        id: `route-${i + 1}-${j + 1}`,
        method: r.method,
        url: r.url,
        host: r.host,
        path: r.path,
        tags: classifyRoute(r),
        transport: r.transport,
        band: r.band,
        routeHint: r.routeHint || null,
        timing: {
          start: r.startTime,
          end: r.endTime,
          durationMs: Math.max(0, r.endTime - r.startTime)
        },
        size: {
          requestBytes: r.requestBytes,
          responseBytes: r.responseBytes
        },
        statusCode: typeof r.statusCode === "number" ? r.statusCode : null
      }))
    }))
  };
}

// ============================================================================
// NORMALIZATION — v30++
// ============================================================================

function normalizeEvents(events) {
  if (!Array.isArray(events)) return [];

  return events
    .filter(Boolean)
    .map((e) => {
      const url = String(e.url ?? "");
      const host = String(e.host ?? extractHost(url) ?? "");
      const path = String(e.path ?? extractPath(url) ?? "/");

      const transport = normalizeTransport(e.transport, host);
      const band = normalizeBand(e.band);

      return {
        id: String(e.id ?? ""),
        method: String(e.method ?? "GET").toUpperCase(),
        url,
        host,
        path,
        startTime: Number(e.startTime ?? 0),
        endTime: Number(e.endTime ?? e.startTime ?? 0),
        requestBytes: Number(e.requestBytes ?? 0),
        responseBytes: Number(e.responseBytes ?? 0),
        statusCode: typeof e.statusCode === "number" ? e.statusCode : null,
        tags: Array.isArray(e.tags) ? e.tags.slice() : [],
        transport,
        band,
        routeHint: normalizeRouteHint(e.routeHint)
      };
    })
    .sort((a, b) => a.startTime - b.startTime);
}

function normalizeTransport(transport, host) {
  const t = String(transport || "").toLowerCase();
  if (t === "local" || t === "mesh" || t === "remote") return t;

  // Heuristic: localhost/127.* → local
  if (/^(localhost|127\.0\.0\.1)/i.test(host)) return "local";

  // Heuristic: *.mesh, *.lan → mesh
  if (/\.mesh$/i.test(host) || /\.lan$/i.test(host)) return "mesh";

  // Default: remote (internet)
  return "remote";
}

function normalizeBand(band) {
  const b = String(band || "").toLowerCase();
  if (b === "symbolic" || b === "binary" || b === "oneband") return b;
  return "oneband";
}

function normalizeRouteHint(hint) {
  if (!hint || typeof hint !== "object") return null;
  const out = {};
  if (hint.region) out.region = String(hint.region);
  if (hint.tenant) out.tenant = String(hint.tenant);
  if (typeof hint.priority === "number") out.priority = hint.priority;
  return Object.keys(out).length ? out : null;
}

function extractHost(url) {
  try {
    const u = new URL(url);
    return u.host || null;
  } catch {
    return null;
  }
}

function extractPath(url) {
  try {
    const u = new URL(url);
    return u.pathname || "/";
  } catch {
    return "/";
  }
}

// ============================================================================
// SUMMARY — v30++
// ============================================================================

function summarizeNetwork(events) {
  if (events.length === 0) {
    return {
      totalRequests: 0,
      totalBytes: 0,
      durationMs: 0,
      llmCalls: 0,
      apiCalls: 0,
      assetCalls: 0,
      meshHops: 0,
      localCalls: 0,
      remoteCalls: 0
    };
  }

  const firstStart = events[0].startTime;
  const lastEnd = events.reduce(
    (max, e) => (e.endTime > max ? e.endTime : max),
    events[0].endTime
  );

  let totalBytes = 0;
  let llmCalls = 0;
  let apiCalls = 0;
  let assetCalls = 0;
  let meshHops = 0;
  let localCalls = 0;
  let remoteCalls = 0;

  for (const e of events) {
    totalBytes += (e.requestBytes || 0) + (e.responseBytes || 0);

    const tags = classifyRoute(e);
    if (tags.includes("llm")) llmCalls++;
    else if (tags.includes("api")) apiCalls++;
    else if (tags.includes("asset")) assetCalls++;

    if (e.transport === "mesh") meshHops++;
    if (e.transport === "local") localCalls++;
    if (e.transport === "remote") remoteCalls++;
  }

  return {
    totalRequests: events.length,
    totalBytes,
    durationMs: Math.max(0, lastEnd - firstStart),
    llmCalls,
    apiCalls,
    assetCalls,
    meshHops,
    localCalls,
    remoteCalls
  };
}

// ============================================================================
// FLOW GROUPING — v30++
// ============================================================================

function groupIntoFlows(events) {
  if (events.length === 0) return [];

  const FLOWS = [];
  const MAX_GAP_MS = 1500;

  let currentFlow = {
    requests: [],
    startedAt: events[0].startTime,
    endedAt: events[0].endTime
  };

  for (let i = 0; i < events.length; i++) {
    const e = events[i];

    if (currentFlow.requests.length === 0) {
      currentFlow.requests.push(e);
      currentFlow.startedAt = e.startTime;
      currentFlow.endedAt = e.endTime;
      continue;
    }

    const prev = currentFlow.requests[currentFlow.requests.length - 1];
    const gap = e.startTime - prev.endTime;

    if (gap > MAX_GAP_MS) {
      finalizeFlow(currentFlow, FLOWS);
      currentFlow = {
        requests: [e],
        startedAt: e.startTime,
        endedAt: e.endTime
      };
    } else {
      currentFlow.requests.push(e);
      if (e.endTime > currentFlow.endedAt) {
        currentFlow.endedAt = e.endTime;
      }
    }
  }

  if (currentFlow.requests.length > 0) {
    finalizeFlow(currentFlow, FLOWS);
  }

  return FLOWS;
}

function finalizeFlow(flow, out) {
  const totalBytes = flow.requests.reduce(
    (sum, r) => sum + (r.requestBytes || 0) + (r.responseBytes || 0),
    0
  );
  const durationMs = Math.max(0, flow.endedAt - flow.startedAt);
  const kind = classifyFlow(flow.requests);

  const transportSummary = {
    local: flow.requests.filter((r) => r.transport === "local").length,
    mesh: flow.requests.filter((r) => r.transport === "mesh").length,
    remote: flow.requests.filter((r) => r.transport === "remote").length
  };

  out.push({
    kind,
    startedAt: flow.startedAt,
    endedAt: flow.endedAt,
    durationMs,
    totalBytes,
    transportSummary,
    requests: flow.requests
  });
}

function classifyFlow(requests) {
  let llmCount = 0;
  let assetCount = 0;
  let apiCount = 0;
  let meshCount = 0;
  let localCount = 0;
  let remoteCount = 0;

  for (const r of requests) {
    const tags = classifyRoute(r);
    if (tags.includes("llm")) llmCount++;
    else if (tags.includes("asset")) assetCount++;
    else if (tags.includes("api")) apiCount++;

    if (r.transport === "mesh") meshCount++;
    if (r.transport === "local") localCount++;
    if (r.transport === "remote") remoteCount++;
  }

  if (llmCount > 0) return "llm-turn";
  if (assetCount > 0 && requests.length > 3) return "page-load";
  if (apiCount > 0) return "api-call";
  if (meshCount > 0) return "mesh-hop";
  if (localCount > 0 && remoteCount === 0 && meshCount === 0) return "local-burst";
  if (remoteCount > 0 && meshCount === 0) return "remote-burst";
  if (assetCount > 0) return "asset-burst";
  return "other";
}

// ============================================================================
// ROUTE CLASSIFICATION — v30++
// ============================================================================

function classifyRoute(route) {
  const tags = new Set(route.tags || []);

  const url = route.url || "";
  const path = route.path || "";
  const host = route.host || "";

  // LLM endpoints
  if (
    /openai\.com/i.test(host) ||
    /anthropic\.com/i.test(host) ||
    /api\/v1\/chat\/completions/i.test(path) ||
    /\/v1\/messages/i.test(path)
  ) {
    tags.add("llm");
    tags.add("api");
  }

  // Asset detection
  if (/.(\(png|jpg|jpeg|gif|webp|svg|ico)$/i.test(path)) tags.add("asset");
  if (/.(\(css)$/i.test(path)) tags.add("asset");
  if (/.(\(js|mjs|cjs)$/i.test(path)) tags.add("asset");
  if (/.(\(woff|woff2|ttf|otf|eot)$/i.test(path)) tags.add("asset");
  if (/.(\(mp4|webm|mp3|wav|ogg)$/i.test(path)) tags.add("asset");

  // Auth
  if (/login|signin|oauth|token|auth/i.test(url)) tags.add("auth");

  // Telemetry
  if (/analytics|telemetry|metrics|track/i.test(url)) tags.add("telemetry");

  // Generic API
  if (!tags.has("asset") && /\/api\//i.test(path)) tags.add("api");

  // Transport tags
  if (route.transport === "mesh") tags.add("mesh");
  if (route.transport === "local") tags.add("local");
  if (route.transport === "remote") tags.add("remote");

  return Array.from(tags);
}
