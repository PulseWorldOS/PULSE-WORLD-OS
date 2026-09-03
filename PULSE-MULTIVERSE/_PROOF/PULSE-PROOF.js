// PULSE-PROOF.js
// IMMORTAL BARREL — errors / flow / logger / monitor / shadow

// ------------------------------------------------------------
// IMPORTS
// ------------------------------------------------------------
import { VitalsLogger as PulseVitalsLogger, log, warn, pulseLog, error} from "./PULSE-PROOF-LOGGER.js";
import { createPulseSkinReflex, createPulseSkinReflex as PulseProofReflex } from "./PULSE-PROOF-REFLEX.js";
import { initUIFlow, PulseUIFlowAPI as PulseUIFlow, PulseUIFlowAPI } from "./PULSE-PROOF-FLOW.js";
import { PulseProofGPU } from "./PULSE-PROOF-GPU.js";
import { VitalsMonitor as PulseVitalsMonitor } from "./PULSE-PROOF-MONITOR.js";
import { PulseUIErrors } from "./PULSE-PROOF-ERRORS.js";
import {PulsePortalAPI} from "../_CREATION_BARRIER/PULSE-BOOT-PORTAL.js";
import { firestore as db,SetDoc as setdoc, GetDoc as getdoc, Doc as doc} from "./PULSE-PROOF-SHADOW.js";
import { PulseBinaryOrganismBoot, PulsePageScanner, createPulseUICompiler, PulseWorldCompiler, createAdminDiagnosticsOrgan,
  startUnderstanding, createPulseRouteMemory, PulseUIRouteMemory, createAdminDiagnosticsOrganV30, createPulseWorldAdminPanel } from "../_CREATION_BARRIER/PULSE-BOOT.js";
import { emitTelemetry } from "../PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-PHYSICS/Pulse-Coordinator/PulseProxyBloodStream-v30.js"

console.log("%c📜 PULSE PROOF MONITOR v30.0 — [PulseProofBridge] Pulse Proof Vision Activated!",
  "color:#FF9800; font-weight:bold; font-family:monospace;"
);
                                                                                                                                                                                       
// ------------------------------------------------------------
// EXPORTS (IMMORTAL SURFACE)
// ------------------------------------------------------------
export {
  PulseVitalsLogger,
  log,
  warn,
  pulseLog,
  error,
  PulseProofReflex,
  initUIFlow,
  PulsePortalAPI,
  PulseUIErrors,
  PulseProofGPU,
  db,
  setdoc,
  getdoc,
  doc,
  PulseVitalsMonitor,
  PulseUIFlowAPI,
  PulseUIFlow,
  emitTelemetry,
  createPulseSkinReflex,
  PulseBinaryOrganismBoot,
  PulsePageScanner,
  createPulseUICompiler,
  PulseWorldCompiler,
  createAdminDiagnosticsOrgan,
  startUnderstanding,
  createPulseRouteMemory,
  PulseUIRouteMemory,
  createAdminDiagnosticsOrganV30,
  createPulseWorldAdminPanel
};
