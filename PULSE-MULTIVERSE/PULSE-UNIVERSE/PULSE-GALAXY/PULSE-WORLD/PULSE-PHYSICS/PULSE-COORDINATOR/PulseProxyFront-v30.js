// ============================================================================
//  PulseProxyFront-v30-IMMORTAL+++ ONEBAND-BINARY-FIRST (UPGRADED INTERNALLY)
//  Advantage-First Proxy Front • OneBand Hybrid • Full Organism Fusion
//  BINARY-FIRST: when in doubt, prefer binary (as data surface only).
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});



import { PulseCoreGMemory } from "../PULSE-COREMEMORY/PULSE-CORE-GOVERNOR.js";
import { PulseProxyPNSNervousSystemBinary } from "./PulseProxyPNSNervousSystem-v40.js";

function clamp01(v){ return Math.max(0, Math.min(1, v)); }
function hash(str){
  let h=0; const s=String(str||"");
  for(let i=0;i<s.length;i++) h=(h+s.charCodeAt(i)*(i+1))%100000;
  return `h${h}`;
}

function routeKey({pattern,pageId,sourceId}){
  return hash(`ROUTEKEY::${pattern||""}::${pageId||"NO_PAGE"}::${sourceId||"NO_SOURCE"}`);
}

function oneBandSignature(band,key){
  return hash(`ONEBAND::${band}::${key}`);
}

// ---------------- BINARY SURFACES ----------------
function buildBinaryField(bits){
  const len = Array.isArray(bits)?bits.length:0;
  const ones = Array.isArray(bits)?bits.filter(b=>b===1).length:0;
  const zeros = len-ones;
  const density = len?ones/len:0;
  const surface = len + ones*3 + zeros;

  return Object.freeze({
    length:len,
    ones,
    zeros,
    density,
    surface,
    binaryPhenotypeSignature:`front-binary-pheno-${surface%99991}`,
    binarySurfaceSignature:`front-binary-surface-${(surface*11)%99991}`,
    parity:surface%2,
    shiftDepth:Math.floor(Math.log2(surface||1))
  });
}

function buildBinaryWave(pattern){
  const p=String(pattern||"");
  const L=p.length;
  const amplitude=Math.max(4,L%16);
  const wavelength=amplitude+6;
  const phase=(L*3)%32;

  return Object.freeze({
    pattern:p,
    amplitude,
    wavelength,
    phase,
    band:"binary",
    mode:"binary-wave",
    waveSignature:hash(`BINARYWAVE::${p}::${amplitude}::${wavelength}::${phase}`)
  });
}

// ---------------- SYMBOLIC SURFACES ----------------
function buildSymbolicWave(pattern){
  const p=String(pattern||"");
  const L=p.length;
  const amplitude=Math.max(3,(L%12)+2);
  const wavelength=amplitude+5;
  const phase=(L*5)%24;

  return Object.freeze({
    pattern:p,
    amplitude,
    wavelength,
    phase,
    band:"symbolic",
    mode:"symbolic-wave",
    waveSignature:hash(`SYMWAVE::${p}::${amplitude}::${wavelength}::${phase}`)
  });
}

// ---------------- ADVANTAGE FIELDS ----------------
function binaryAdvantage(bField,bWave){
  const d=bField.density||0;
  const amp=bWave.amplitude||0;
  const wl=bWave.wavelength||1;
  const eff=(amp+1)/(wl+1);
  const stress=Math.min(1,d*2);
  const score=clamp01(eff*(1+stress));

  return Object.freeze({
    type:"binary",
    density:d,
    amplitude:amp,
    wavelength:wl,
    efficiency:eff,
    stress,
    advantageScore:score,
    advantageSignature:hash(`BADV::${d}::${amp}::${wl}::${score}`)
  });
}

function symbolicAdvantage(symWave,binaryShadow,oneBandOverlay){
  const amp=symWave.amplitude||0;
  const wl=symWave.wavelength||1;
  const symEnergy=amp/wl;

  const d=binaryShadow.density||0;
  const L=binaryShadow.length||0;
  const shadowEnergy=d*(L>0?1:0.5);

  const band=oneBandOverlay.band;
  const mode=oneBandOverlay.mode;
  const presence=oneBandOverlay.presence;

  let bias=1.0;
  if(mode==="dual") bias+=0.1;
  if(presence==="strong") bias+=0.1;

  const score=clamp01((symEnergy*0.6+shadowEnergy*0.4)*bias);

  return Object.freeze({
    type:"symbolic",
    symEnergy,
    shadowDensity:d,
    shadowLen:L,
    band,
    mode,
    presence,
    bandBias:bias,
    advantageScore:score,
    advantageSignature:hash(`SADV::${band}::${mode}::${presence}::${score}`)
  });
}

function organismOverlay(ctx){
  const c=ctx||{};
  const flow=clamp01(c.flowRate||0);
  const pressure=clamp01(c.pressureIndex||0);
  const adrenal=clamp01(c.adrenalStress||0);
  const tri=clamp01(c.triEnvStress||0);
  const proxy=clamp01(c.proxyPressure||0);

  const load=Math.max(pressure,adrenal,tri,proxy);
  const fusion=clamp01(flow*0.5+(1-load)*0.5);

  return Object.freeze({
    flow,
    pressure,
    adrenal,
    tri,
    proxy,
    organismLoad:load,
    organismFlow:flow,
    fusionScore:fusion,
    overlaySignature:hash(`ORG::${flow}::${pressure}::${fusion}`)
  });
}

function buildOneBandOverlay(ctx){
  const band=ctx.band||"unknown";
  const mode=ctx.mode||"unknown";
  const presence=ctx.presence||"unknown";

  return Object.freeze({
    band,
    mode,
    presence,
    overlaySignature:hash(`ONEBAND::${band}::${mode}::${presence}`)
  });
}

// ---------------- BINARY-FIRST FUSION ----------------
function fuseAdvBinaryFirst(binaryAdv,symbolicAdv,org){
  const b=binaryAdv.advantageScore||0;
  const s=symbolicAdv.advantageScore||0;
  const o=org.fusionScore||0.5;

  const bw=0.55+(o-0.5)*0.25;   // bias toward binary
  const sw=1-bw;

  const fb=b*bw;
  const fs=s*sw;
  const total=fb+fs;

  let mode;
  if(total<=0){
    mode="symbolic";
  } else if(fb >= fs*0.9){
    mode="binary";
  } else {
    mode="symbolic";
  }

  return Object.freeze({
    chosenMode:mode,
    fusedBinary:fb,
    fusedSymbolic:fs,
    organismFusion:o,
    totalScore:total,
    advantageSignature:hash(`FUSED_BFIRST::${mode}::${total}`)
  });
}

// ---------------- CORE MEMORY ----------------
const NS="PulseProxyFrontRoute-v30-IMMORTAL+++";

function recordRoute(mem){
  try{ PulseCoreGMemory.record(NS,mem.routeKey,mem); }catch{}
}
function recallRoute(key){
  try{ return PulseCoreGMemory.recall(NS,key)||null; }catch{ return null; }
}

// ---------------- ROUTE PLANNER ----------------
let frontCycle=0;

export function planProxyRoute({
  bits,
  pattern,
  pageId,
  sourceId,
  previousRouteMemory,
  oneBandContext,
  organismAdvantageContext
}){
  frontCycle++;

  const key=routeKey({pattern,pageId,sourceId});
  const bField=buildBinaryField(bits);
  const bWave=buildBinaryWave(pattern);
  const sWave=buildSymbolicWave(pattern);

  let mem=previousRouteMemory;
  if(!mem||mem.routeKey!==key){
    const rec=recallRoute(key);
    if(rec&&rec.routeKey===key) mem=rec;
  }

  const oneOverlay=buildOneBandOverlay(oneBandContext||{});
  const orgOverlay=organismOverlay(organismAdvantageContext||{});

  const bAdv=binaryAdvantage(bField,bWave);
  const sAdv=symbolicAdvantage(sWave,bField,oneOverlay);
  const fused=fuseAdvBinaryFirst(bAdv,sAdv,orgOverlay);

  let mode=fused.chosenMode;
  const pureBinary=Array.isArray(bits)&&bits.every(b=>b===0||b===1);
  if(!pureBinary && mode==="binary") mode="symbolic";

  if(mem&&mem.routeKey===key) mode=mem.decision.mode||mode;

  const band=mode==="binary"?"binary":"symbolic";
  const bandSig=oneBandSignature(band,key);

  const routeWarmth=bField.density>0.5?"warm":"cool";
  const chunkHint=bField.length>1024?"multi-chunk":"single-chunk";
  const cacheHint=bField.density>0.7?"heavy-cache":"light-cache";
  const prewarmHint=routeWarmth==="cool"?"prewarm-preferred":"prewarm-optional";

  // NEW: integrate PNS nervous system at front level
  const pns = PulseProxyPNSNervousSystemBinary();

  const memObj={
    routeKey:key,
    decision:{mode},
    band,
    bandSignature:bandSig,
    binaryAdvantageField:bAdv,
    symbolicAdvantageField:sAdv,
    chosenAdvantageField:fused,
    routeWarmth,
    chunkCacheHints:{chunkHint,cacheHint,prewarmHint},
    oneBandOverlay:oneOverlay,
    organismOverlay:orgOverlay,
    pns,
    frontCycle,
    frontCycleSignature:hash(`FRONT::${frontCycle}`),
    dnaTag:mode==="binary"?"PROXY_FRONT_BINARY":"PROXY_FRONT_SYMBOLIC"
  };

  recordRoute(memObj);

  return {
    routeKey:key,
    decision:{mode},
    band,
    bandSignature:bandSig,
    binaryField:bField,
    binaryWaveField:bWave,
    symbolicWaveField:sWave,
    binaryAdvantageField:bAdv,
    symbolicAdvantageField:sAdv,
    chosenAdvantageField:fused,
    routeWarmth,
    chunkCacheHints:{chunkHint,cacheHint,prewarmHint},
    oneBandOverlay:oneOverlay,
    organismOverlay:orgOverlay,
    pns,
    frontCycleSignature:memObj.frontCycleSignature,
    routeMemory:memObj,
    usedMemory:!!mem
  };
}

// ---------------- PROXY FRONT ----------------
export function proxyFrontRoute({
  bits,
  pattern,
  pageId="NO_PAGE",
  sourceId="NO_SOURCE",
  previousRouteMemory=null,
  oneBandContext=null,
  organismAdvantageContext=null,
  fieldIngest,
  legacyCreate
}){
  const plan=planProxyRoute({
    bits,
    pattern,
    pageId,
    sourceId,
    previousRouteMemory,
    oneBandContext,
    organismAdvantageContext
  });

  if(plan.decision.mode==="binary"){
    const packet=fieldIngest(bits);
    return {
      mode:"binary",
      band:"binary",
      dnaTag:"PROXY_FRONT_BINARY",
      routeKey:plan.routeKey,
      packet,
      ...plan
    };
  }

  const proxy=legacyCreate({
    jobId:"NO_JOB",
    pattern,
    payload:{},
    priority:"normal",
    returnTo:null,
    parentLineage:null,
    pageId
  });

  return {
    mode:"symbolic",
    band:"symbolic",
    dnaTag:"PROXY_FRONT_SYMBOLIC",
    routeKey:plan.routeKey,
    proxy,
    ...plan
  };
}

// ---------------- NAMED EXPORT OBJECT + GLOBAL ----------------
export const PulseProxyFront = {
  planProxyRoute,
  proxyFrontRoute
};

PulseRealm.PulseProxyFront = PulseProxyFront;
