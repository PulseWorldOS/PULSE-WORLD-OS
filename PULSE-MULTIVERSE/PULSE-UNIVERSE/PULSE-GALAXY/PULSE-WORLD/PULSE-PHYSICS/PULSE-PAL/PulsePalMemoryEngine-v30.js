// ============================================================================
// FILE: /PULSE-PAL/PulsePalMemoryEngine-v30.js
// PULSE OS — v30 IMMORTAL‑EVO+++
// PULSE‑PAL MEMORY ENGINE — PURE, PRESENCE‑AWARE, DAEMON‑FREE
// ============================================================================
//
// ROLE:
//   The Memory Engine is the semantic cortex behind Pulse‑Pal.
//   v30 IMMORTAL‑EVO+++ (Bridge‑free) now builds and maintains:
//     • Semantic Timeline
//     • Semantic Graph
//     • Entities
//     • Topics
//     • Persona (presence‑aware)
//     • Tone (presence‑aware)
//     • Continuity (timeline‑based)
//     • Mode Influence (topic‑based)
//     • Worlds / Projects / Skills / Epochs (derived only)
//
// CONTRACT:
//   • Pure logic organ (no UI)
//   • Deterministic
//   • Zero network
//   • Zero daemon
//   • Evolvable (additive only)
// ============================================================================
// ============================================================================
//  PulsePalMemoryEngine — IMMORTAL PSEUDO‑CLASS (v31 IMMORTAL‑EVO)
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


export const PulsePalMemoryEngine = (() => {

  // ------------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
  // ------------------------------------------------------------
  const lane = {
    CoreMemory: null,
    CoreSpeech: null,
    CorePresence: null,

    snapshot: {
      timeline: [],
      graph: {},
      entities: {},
      topics: {},
      persona: {},
      tone: {},
      continuity: { score: 0, sources: [] },
      mode: { activeMode: "advisor", influence: {} },
      worlds: { list: [], index: {} },
      projects: { list: [], index: {} },
      skills: { list: [], index: {} },
      epochs: { current: null, bands: [] }
    }
  };

  // ------------------------------------------------------------
  // INIT
  // ------------------------------------------------------------
  const init = ({ CoreMemory, CoreSpeech, CorePresence }) => {
    lane.CoreMemory = CoreMemory;
    lane.CoreSpeech = CoreSpeech;
    lane.CorePresence = CorePresence;

    lane.snapshot = {
      timeline: [],
      graph: {},
      entities: {},
      topics: {},
      persona: {},
      tone: {},
      continuity: { score: 0, sources: [] },
      mode: { activeMode: "advisor", influence: {} },
      worlds: { list: [], index: {} },
      projects: { list: [], index: {} },
      skills: { list: [], index: {} },
      epochs: { current: null, bands: [] }
    };
  };

  // ------------------------------------------------------------
  // FULL SCAN — IMMORTAL
  // ------------------------------------------------------------
  const fullScan = () => {
    const speech   = lane.CoreSpeech.messages() || [];
    const presence = lane.CorePresence.snapshot() || {};

    const timeline = speech.map(m => ({ type: "speech", ...m }));
    const graph = { speech: [...timeline] };

    const entities = extractEntities(timeline);
    const topics   = extractTopics(timeline);

    const persona = computePersona({ speech, presence, topics });
    const tone    = computeTone({ speech, presence });

    const continuity = computeContinuity({ timeline, topics });
    const mode       = computeMode({ presence, topics });

    const worlds   = computeWorlds({ timeline, topics });
    const projects = computeProjects({ timeline, topics });
    const skills   = computeSkills({ timeline, topics });
    const epochs   = computeEpochs({ timeline, continuity });

    lane.snapshot = {
      timeline,
      graph,
      entities,
      topics,
      persona,
      tone,
      continuity,
      mode,
      worlds,
      projects,
      skills,
      epochs
    };

    lane.CoreMemory.engine.fullScan({
      speech,
      presence,
      entities,
      topics,
      persona,
      tone,
      continuity,
      mode,
      worlds,
      projects,
      skills,
      epochs
    });

    return lane.snapshot;
  };

  // ------------------------------------------------------------
  // INCREMENTAL UPDATE — IMMORTAL
  // ------------------------------------------------------------
  const incrementalUpdate = () => {
    const newSpeech = lane.CoreSpeech.recent() || [];
    if (!newSpeech.length) return lane.snapshot;

    for (const m of newSpeech) {
      lane.snapshot.timeline.push({ type: "speech", ...m });
    }

    if (!lane.snapshot.graph.speech) lane.snapshot.graph.speech = [];
    lane.snapshot.graph.speech.push(...newSpeech);

    lane.snapshot.entities = extractEntities(lane.snapshot.timeline);
    lane.snapshot.topics   = extractTopics(lane.snapshot.timeline);

    const presence = lane.CorePresence.snapshot() || {};

    lane.snapshot.persona = computePersona({
      speech: lane.snapshot.graph.speech,
      presence,
      topics: lane.snapshot.topics
    });

    lane.snapshot.tone = computeTone({
      speech: lane.snapshot.graph.speech,
      presence
    });

    lane.snapshot.continuity = computeContinuity({
      timeline: lane.snapshot.timeline,
      topics: lane.snapshot.topics
    });

    lane.snapshot.mode = computeMode({
      presence,
      topics: lane.snapshot.topics
    });

    lane.snapshot.worlds   = computeWorlds({
      timeline: lane.snapshot.timeline,
      topics: lane.snapshot.topics
    });
    lane.snapshot.projects = computeProjects({
      timeline: lane.snapshot.timeline,
      topics: lane.snapshot.topics
    });
    lane.snapshot.skills   = computeSkills({
      timeline: lane.snapshot.timeline,
      topics: lane.snapshot.topics
    });
    lane.snapshot.epochs   = computeEpochs({
      timeline: lane.snapshot.timeline,
      continuity: lane.snapshot.continuity
    });

    lane.CoreMemory.engine.incremental({
      speech: lane.snapshot.graph.speech,
      presence,
      entities: lane.snapshot.entities,
      topics: lane.snapshot.topics,
      persona: lane.snapshot.persona,
      tone: lane.snapshot.tone,
      continuity: lane.snapshot.continuity,
      mode: lane.snapshot.mode,
      worlds: lane.snapshot.worlds,
      projects: lane.snapshot.projects,
      skills: lane.snapshot.skills,
      epochs: lane.snapshot.epochs
    });

    return lane.snapshot;
  };

  // ------------------------------------------------------------
  // ENTITY EXTRACTION
  // ------------------------------------------------------------
  const extractEntities = (timeline) => {
    const entities = {};
    for (const item of timeline) {
      if (item.type === "speech" && item.text) {
        const words = item.text.split(/\s+/);
        for (const w of words) {
          if (w.length > 3) {
            if (!entities[w]) entities[w] = 0;
            entities[w]++;
          }
        }
      }
    }
    return entities;
  };

  // ------------------------------------------------------------
  // TOPIC EXTRACTION
  // ------------------------------------------------------------
  const extractTopics = (timeline) => {
    const topics = {};
    for (const item of timeline) {
      if (!item.text) continue;
      const lower = item.text.toLowerCase();

      const map = {
        world: ["world"],
        tasks: ["task"],
        memory: ["memory"],
        presence: ["presence"],
        grid: ["grid"],
        architect: ["architect"],
        earn: ["earn"],
        tourist: ["tourist"],
        fox: ["fox"],
        settlements: ["city", "settlement"],
        civilizations: ["civilization", "empire"],
        research: ["research", "tech tree"],
        economy: ["economy", "trade"],
        quests: ["quest", "mission"],
        skills: ["skill", "training"]
      };

      for (const [key, triggers] of Object.entries(map)) {
        if (triggers.some(t => lower.includes(t))) {
          topics[key] = (topics[key] || 0) + 1;
        }
      }
    }
    return topics;
  };

  // ------------------------------------------------------------
  // PERSONA
  // ------------------------------------------------------------
  const computePersona = ({ speech, presence, topics }) => {
    const warmth = presence.tone === "warm" ? 1 : 0.5;
    const focus  = presence.activity === "focused" ? 1 : 0.5;

    const modeInfluence = {};
    for (const [k, v] of Object.entries(topics)) {
      modeInfluence[k] = v / (speech.length || 1);
    }

    return {
      warmth,
      focus,
      expressiveness: presence.expression || "medium",
      continuityScore: speech.length,
      modeInfluence,
      activeMode: presence.activityMode || presence.activity || "advisor"
    };
  };

  // ------------------------------------------------------------
  // TONE
  // ------------------------------------------------------------
  const computeTone = ({ speech, presence }) => {
    const last = speech[speech.length - 1];
    return {
      baseline: presence.tone || "neutral",
      lastUserTone: last.tone || "neutral",
      lastMessage: last.text || "",
      activity: presence.activity || "active",
      expression: presence.expression || "medium",
      recallTone: presence.tone || "neutral"
    };
  };

  // ------------------------------------------------------------
  // CONTINUITY
  // ------------------------------------------------------------
  const computeContinuity = ({ timeline, topics }) => {
    const score =
      (timeline.length || 0) +
      Object.keys(topics || {}).length * 5;

    return {
      score,
      sources: ["timeline", "topics"]
    };
  };

  // ------------------------------------------------------------
  // MODE
  // ------------------------------------------------------------
  const computeMode = ({ presence, topics }) => ({
    activeMode: presence.activityMode || presence.activity || "advisor",
    influence: { ...topics }
  });

  // ------------------------------------------------------------
  // WORLDS
  // ------------------------------------------------------------
  const computeWorlds = ({ timeline }) => {
    const list = [];
    const index = {};

    const add = (id, label, kind) => {
      if (!index[id]) {
        index[id] = { id, label, kind, mentions: 0, lastSeen: null };
        list.push(index[id]);
      }
      return index[id];
    };

    for (const item of timeline) {
      if (!item.text) continue;
      const ts = item.timestamp || PulseRealm.PulseNOW;
      const lower = item.text.toLowerCase();

      if (lower.includes("world")) {
        const w = add("world", "World", "world");
        w.mentions++; w.lastSeen = ts;
      }
      if (lower.includes("city")) {
        const w = add("city-grid", "City Grid", "settlement");
        w.mentions++; w.lastSeen = ts;
      }
      if (lower.includes("empire")) {
        const w = add("empire", "Empire", "civilization");
        w.mentions++; w.lastSeen = ts;
      }
    }

    return { list, index };
  };

  // ------------------------------------------------------------
  // PROJECTS
  // ------------------------------------------------------------
  const computeProjects = ({ timeline }) => {
    const list = [];
    const index = {};

    const add = (id, label, status = "active") => {
      if (!index[id]) {
        index[id] = { id, label, status, mentions: 0, lastSeen: null };
        list.push(index[id]);
      }
      return index[id];
    };

    for (const item of timeline) {
      if (!item.text) continue;
      const ts = item.timestamp || PulseRealm.PulseNOW;
      const lower = item.text.toLowerCase();

      if (lower.includes("project")) {
        const p = add("project", "Project");
        p.mentions++; p.lastSeen = ts;
      }
      if (lower.includes("quest")) {
        const p = add("quest", "Quest");
        p.mentions++; p.lastSeen = ts;
      }
      if (lower.includes("campaign")) {
        const p = add("campaign", "Campaign");
        p.mentions++; p.lastSeen = ts;
      }
    }

    return { list, index };
  };

  // ------------------------------------------------------------
  // SKILLS
  // ------------------------------------------------------------
  const computeSkills = ({ timeline }) => {
    const list = [];
    const index = {};

    const add = (id, label, band = "general") => {
      if (!index[id]) {
        index[id] = { id, label, band, mentions: 0, lastSeen: null };
        list.push(index[id]);
      }
      return index[id];
    };

    for (const item of timeline) {
      if (!item.text) continue;
      const ts = item.timestamp || PulseRealm.PulseNOW;
      const lower = item.text.toLowerCase();

      if (lower.includes("skill")) {
        const s = add("skill", "Skill");
        s.mentions++; s.lastSeen = ts;
      }
      if (lower.includes("architecture")) {
        const s = add("architecture", "Systems Architecture", "technical");
        s.mentions++; s.lastSeen = ts;
      }
      if (lower.includes("strategy")) {
        const s = add("strategy", "Strategy", "meta");
        s.mentions++; s.lastSeen = ts;
      }
    }

    return { list, index };
  };

  // ------------------------------------------------------------
  // EPOCHS
  // ------------------------------------------------------------
  const computeEpochs = ({ timeline, continuity }) => {
    const bands = [];
    const now = PulseRealm.PulseNOW;

    const add = (id, label, score) => {
      bands.push({ id, label, score, lastUpdated: now });
    };

    const lengthScore = timeline.length;
    const contScore   = continuity.score || 0;

    if (lengthScore > 200 || contScore > 200) {
      add("epoch-deep", "Deep Continuity Epoch", contScore);
    } else if (lengthScore > 50 || contScore > 80) {
      add("epoch-growing", "Growing Continuity Epoch", contScore);
    } else if (lengthScore > 0) {
      add("epoch-seed", "Seed Epoch", contScore);
    }

    const current =
      bands.sort((a, b) => b.score - a.score)[0] || null;

    return { current, bands };
  };

  // ------------------------------------------------------------
  // EXPORT SNAPSHOT
  // ------------------------------------------------------------
  const exportSnapshot = () =>
    JSON.parse(JSON.stringify(lane.snapshot));

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    init,
    fullScan,
    incrementalUpdate,
    extractEntities,
    extractTopics,
    computePersona,
    computeTone,
    computeContinuity,
    computeMode,
    computeWorlds,
    computeProjects,
    computeSkills,
    computeEpochs,
    exportSnapshot
  };

})();
