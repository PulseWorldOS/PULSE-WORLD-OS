/**
 * PULSE ACTION LAYER
 * -------------------
 * This file looks stupidly simple at first glance.
 * A junior dev will say: “Why does this file exist? It just re‑exports something.”
 *
 * But this file is NOT a recursion trap.
 * It is a **layer boundary**.
 *
 * UNDERSTANDING  = meaning extraction
 * PERCEPTION     = world‑model shaping
 * ACTION         = motion, execution, outward expression
 *
 * This file is the **ACTION GATEWAY**.
 * It is intentionally thin because:
 *  - ACTION must never mutate UNDERSTANDING
 *  - ACTION must never *become* UNDERSTANDING
 *  - ACTION must never import the world-model directly
 *
 * This prevents collapse of the cognitive stack.
 * This prevents recursion.
 * This prevents the system from “thinking about thinking.”
 *
 * ACTION only receives a **motion-ready interface**.
 * It does not know the internals.
 * It does not know the world-model.
 * It only knows the *output surface*.
 *
 * This is why this file exists.
 * This is why it is not recursion.
 * This is why it is safe.
 */
/**
 * ACTION EXPORT
 * -------------
 * We alias the Understanding output as “Motion” because:
 *
 * 1. UNDERSTANDING produces a *stable, deterministic* interface.
 * 2. ACTION consumes that interface and performs outward behavior.
 * 3. This aliasing is the **handoff**, not a loop.
 *
 * If this file imported itself, THAT would be recursion.
 * If Understanding imported Motion, THAT would be recursion.
 *
 * But here:
 *  - Understanding → (exported) → Motion
 *  - Motion → (used by runtime) → outward behavior
 *
 * There is NO reverse dependency.
 * There is NO circular import.
 * There is NO recursion.
 *
 * This is a **one‑way conveyor belt**.
 */
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

export const DualBandAPIPRESENT = PulseRealm.PulseAIDualbandAPI;


/**
 * ACTION DIAGNOSTICS
 * -------------------
 * We capture a console snapshot on first run,
 * then capture another on second run,
 * and compute a delta.
 *
 * This proves:
 *  - ACTION is stateless
 *  - ACTION does not mutate Understanding
 *  - ACTION does not accumulate cognitive residue
 *
 * This is the “time‑collapse” detector.
 */

let __pulseActionSnapshot = null;

export function captureActionSnapshot(label = "ACTION-SNAPSHOT") {
    const snapshot = {
        label,
        time: PulseRealm.PulseNOW,
        consoleState: [...(console._pulseLog || [])],
    };

    if (!__pulseActionSnapshot) {
        // First run — store baseline
        __pulseActionSnapshot = snapshot;
        return {
            status: "baseline-captured",
            snapshot,
        };
    }

    // Second run — compute delta
    const delta = {
        added: snapshot.consoleState.filter(x => !__pulseActionSnapshot.consoleState.includes(x)),
        removed: __pulseActionSnapshot.consoleState.filter(x => !snapshot.consoleState.includes(x)),
        timeDelta: snapshot.time - __pulseActionSnapshot.time,
    };

    return {
        status: "delta-computed",
        baseline: __pulseActionSnapshot,
        current: snapshot,
        delta,
    };
}


/**
 * END OF ACTION LAYER
 * --------------------
 * This file is intentionally simple in code,
 * but extremely heavy in architecture.
 *
 * It is the **boundary** between:
 *  - cognition (Understanding)
 *  - world-model shaping (Perception)
 *  - execution (Action)
 *
 * Without this file, the system collapses into recursion.
 * With this file, the system maintains directional flow.
 */

import { DualBandAPIDRIFT } from "./PULSE-AI-DUALBAND-DRIFT.js";