// ============================================================================
// FILE: /PULSE-PAL/PulsePalTasksCore-v30.js
// PULSE OS — v30 IMMORTAL+++
// PULSE‑PAL TASKS CORE — REAL TASK ORGAN (REAL + WORLD + CIV)
// PURE LOGIC ORGAN • BRIDGE‑FREE • DAEMON‑FREE
// ============================================================================

// ============================================================================
//  PulsePalTasksCore — IMMORTAL PSEUDO‑CLASS (v31 IMMORTAL)
// ============================================================================

export const PulsePalTasksCore = (() => {

  // ------------------------------------------------------------
  // INTERNAL LANE (IMMORTAL STATE)
  // ------------------------------------------------------------
  const lane = {
    state: {
      version: "v30 IMMORTAL+++",
      lineage: "Pulse‑OS Evolutionary",
      seq: 1,
      tasks: [],
      worldTasks: [],
      civTasks: [],
      history: []
    }
  };

  // ------------------------------------------------------------
  // SNAPSHOT
  // ------------------------------------------------------------
  const snapshot = () => ({
    version: lane.state.version,
    lineage: lane.state.lineage,
    tasks: [...lane.state.tasks],
    worldTasks: [...lane.state.worldTasks],
    civTasks: [...lane.state.civTasks],
    history: [...lane.state.history]
  });

  // ------------------------------------------------------------
  // INTERNAL HELPERS
  // ------------------------------------------------------------
  const _nextId = () => `task_${lane.state.seq++}`;

  const _pushHistory = (event) => {
    const ts = PulseRealm.PulseNOW;
    lane.state.history.push(
      `[${new Date(ts).toLocaleString()}] ${event}`
    );
    if (lane.state.history.length > 256) {
      lane.state.history.shift();
    }
  };

  const _normalizeTask = (input, type) => {
    const now = PulseRealm.PulseNOW;
    return {
      id: input.id || _nextId(),
      type: type || input.type || "real",
      label: input.label || input.name || "Task",
      description: input.description || "",
      difficulty: input.difficulty || "normal",
      energy: input.energy || "medium",
      mode: input.mode || [],
      persona: input.persona || [],
      civTier: input.civTier || null,
      world: input.world || null,
      band: input.band || "now",
      createdAt: input.createdAt || now,
      completedAt: input.completedAt || null,
      status: input.status || "open"
    };
  };

  // ------------------------------------------------------------
  // LISTERS
  // ------------------------------------------------------------
  const list = () => [...lane.state.tasks];
  const world = () => [...lane.state.worldTasks];
  const civ = () => [...lane.state.civTasks];
  const historyList = () => [...lane.state.history];

  // ------------------------------------------------------------
  // ADD
  // ------------------------------------------------------------
  const addReal = (input = {}) => {
    const t = _normalizeTask(input, "real");
    lane.state.tasks.push(t);
    _pushHistory(`Added real task: ${t.label}`);
    return t;
  };

  const addWorld = (input = {}) => {
    const t = _normalizeTask(input, "world");
    lane.state.worldTasks.push(t);
    _pushHistory(`Added world task: ${t.label}`);
    return t;
  };

  const addCiv = (input = {}) => {
    const t = _normalizeTask(input, "civ");
    lane.state.civTasks.push(t);
    _pushHistory(`Added civ task: ${t.label}`);
    return t;
  };

  const add = (input = {}) => {
    const type = input.type || "real";
    if (type === "world") return addWorld(input);
    if (type === "civ") return addCiv(input);
    return addReal(input);
  };

  // ------------------------------------------------------------
  // COMPLETE / REMOVE
  // ------------------------------------------------------------
  const _findById = (id) => {
    const pools = [
      { key: "tasks", label: "real" },
      { key: "worldTasks", label: "world" },
      { key: "civTasks", label: "civ" }
    ];
    for (const pool of pools) {
      const idx = lane.state[pool.key].findIndex(t => t.id === id);
      if (idx >= 0) return { pool: pool.key, idx, label: pool.label };
    }
    return null;
  };

  const complete = (id) => {
    if (!id) return;
    const found = _findById(id);
    if (!found) return;
    const t = lane.state[found.pool][found.idx];
    if (t.status === "done") return;
    t.status = "done";
    t.completedAt = PulseRealm.PulseNOW;
    _pushHistory(`Completed ${found.label} task: ${t.label}`);
  };

  const remove = (id) => {
    if (!id) return;
    const found = _findById(id);
    if (!found) return;
    const [t] = lane.state[found.pool].splice(found.idx, 1);
    _pushHistory(`Removed ${found.label} task: ${t.label}`);
  };

  // ------------------------------------------------------------
  // SUGGESTIONS (simple, deterministic)
// ------------------------------------------------------------
  const suggestions = ({ mode, civTier, world } = {}) => {
    const all = [
      ...lane.state.tasks,
      ...lane.state.worldTasks,
      ...lane.state.civTasks
    ];

    const scored = all.map(t => {
      let score = 0;
      if (mode && Array.isArray(t.mode) && t.mode.includes(mode)) score += 3;
      if (civTier && t.civTier === civTier) score += 2;
      if (world && t.world === world) score += 2;
      if (t.band === "now") score += 1;
      return { t, score };
    });

    return scored
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(x => x.t.label || x.t.name || "Task");
  };

  // ------------------------------------------------------------
  // IMMORTAL EXPORT
  // ------------------------------------------------------------
  return {
    snapshot,
    list,
    world,
    civ,
    historyList,
    addReal,
    addWorld,
    addCiv,
    add,
    complete,
    remove,
    suggestions
  };

})();


// ============================================================================
// SINGLETON + PUBLIC API
// ============================================================================

const _tasksCoreInstance = PulsePalTasksCore;

export function PulsePalTasksCoreSnapshot() {
  return _tasksCoreInstance.snapshot();
}

export function PulsePalTasksCoreList() {
  return _tasksCoreInstance.list();
}

export function PulsePalTasksCoreWorld() {
  return _tasksCoreInstance.world();
}

export function PulsePalTasksCoreCiv() {
  return _tasksCoreInstance.civ();
}

export function PulsePalTasksCoreHistory() {
  return _tasksCoreInstance.historyList();
}

export function PulsePalTasksCoreAdd(task) {
  return _tasksCoreInstance.add(task);
}

export function PulsePalTasksCoreComplete(id) {
  return _tasksCoreInstance.complete(id);
}

export function PulsePalTasksCoreRemove(id) {
  return _tasksCoreInstance.remove(id);
}

export function PulsePalTasksCoreSuggestions(ctx) {
  return _tasksCoreInstance.suggestions(ctx);
}

export const PulsePalTasksCoreAPI = {
  snapshot:   PulsePalTasksCoreSnapshot,
  list:       PulsePalTasksCoreList,
  world:      PulsePalTasksCoreWorld,
  civ:        PulsePalTasksCoreCiv,
  history:    PulsePalTasksCoreHistory,
  add:        PulsePalTasksCoreAdd,
  complete:   PulsePalTasksCoreComplete,
  remove:     PulsePalTasksCoreRemove,
  suggestions:PulsePalTasksCoreSuggestions
};

try {
 
    PulseRealm.PulsePalTasksCore = PulsePalTasksCoreAPI;
  
} catch {
  // IMMORTAL: never throw
}
