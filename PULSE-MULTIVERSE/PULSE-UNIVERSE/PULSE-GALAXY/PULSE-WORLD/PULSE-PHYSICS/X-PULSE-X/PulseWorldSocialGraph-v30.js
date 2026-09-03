// ============================================================================
// FILE: /organs/world/PulseWorldSocialGraph-v30-IMMORTAL-ONEBAND.js
// PULSE OS v30+ — PRESENCE‑EVO‑IMMORTAL‑ONEBAND
// Pulse‑World Social Graph (v30 IMMORTAL‑ONEBAND)
// Deterministic • Metadata‑Only • Presence + Jobs + Mentorship + Upgrades +
// Skills + Trust + Parties + Sessions + Co-Work + Reputation + Earn + Identity
// Full Advantage Stack: Prewarm • Chunk • Cache • OneBand • Earn • Identity
// OneBand v30: unified band field (symbolic/binary/gpu/earn/world) per edge.
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});


//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


export function createPulseWorldSocialGraphV30({
  PowerUserRanking,
  ReputationEngine,
  SkillRegistry,
  TrustSignals,
  log,
  warn,
  error
} = {}) {
  // ========================================================================
  // META — v30 IMMORTAL ONEBAND
  // ========================================================================
  const meta = {
    layer: "PulseWorldSocialGraph",
    role: "SOCIAL_GRAPH",
    version: "30.0-WORLD-SOCIAL-GRAPH-IMMORTAL-ONEBAND",
    evo: {
      presenceAware: true,
      socialAware: true,
      earnAware: true,
      identityAware: true,
      unifiedBand: true,          // ONEBAND
      unifiedAdvantageField: true,
      deterministicField: true,
      driftProof: true,
      zeroCompute: true,
      zeroMutation: true,
      skillAware: true,
      trustAware: true,
      reputationAware: true,
      partyAware: true,
      sessionAware: true,
      coworkAware: true,
      followAware: true,
      blockAware: true,
      inviteAware: true,
      collaborationAware: true,
      cacheAware: true,
      prewarmAware: true,
      chunkAware: true,
      binaryAware: true,
      gpuAware: true,
      earnBandAware: true
    }
  };

  // ========================================================================
  // INTERNAL GRAPH STRUCTURE
  // ========================================================================
  const graph = {
    nodes: new Map(), // uid -> nodeMeta
    edges: [],        // { type, from, to, meta }
    adjacency: new Map() // uid -> { out: edgeIndices[], in: edgeIndices[] }
  };

  // ========================================================================
  // HELPERS — NODES + ADJACENCY
  // ========================================================================
  function ensureNode(person) {
    if (!person || !person.uid) return;

    if (!graph.nodes.has(person.uid)) {
      graph.nodes.set(person.uid, {
        uid: person.uid,
        displayName: person.displayName || null,
        systemAge: person.systemAge || 0,
        band: person.band || "symbolic", // ONEBAND
        skillTier: person.skillTier || null,
        mentorTier: person.mentorTier || null,
        reputationScore: person.reputationScore || null,
        trustLevel: person.trustLevel || null,
        earnBand: person.earnBand || "unknown",
        jobTier: person.jobTier || null
      });
    }
  }

  function ensureAdjacency(uid) {
    if (!uid) return;
    if (!graph.adjacency.has(uid)) {
      graph.adjacency.set(uid, { out: [], in: [] });
    }
  }

  function attachEdgeToAdjacency(index, fromUid, toUid) {
    ensureAdjacency(fromUid);
    ensureAdjacency(toUid);
    graph.adjacency.get(fromUid).out.push(index);
    graph.adjacency.get(toUid).in.push(index);
  }

  // ========================================================================
  // ONEBAND ADVANTAGE META
  // ========================================================================
  function normalizeBand(edgeMeta = {}) {
    // ONEBAND: collapse presence/world/earn/binary/gpu into a single band string
    if (edgeMeta.band) return edgeMeta.band;

    const presenceBand = edgeMeta.presenceBand || "symbolic";
    const worldBand = edgeMeta.worldBand || null;
    const earnBand = edgeMeta.earnBand || null;
    const gpu = edgeMeta.gpuAware ? "gpu" : null;
    const binary = edgeMeta.binaryAware ? "binary" : null;

    // simple priority: binary > gpu > world > earn > presence
    if (binary) return "binary";
    if (gpu) return "gpu";
    if (worldBand) return `world:${worldBand}`;
    if (earnBand && earnBand !== "unknown") return `earn:${earnBand}`;
    return presenceBand;
  }

  function buildAdvantageMeta(edgeType, edgeMeta) {
    const band = normalizeBand(edgeMeta);

    const heat =
      (edgeMeta.rankScore || 0) +
      (edgeMeta.trustWeight || 0) +
      (edgeMeta.reputationWeight || 0) +
      (edgeMeta.skillTier || 0) +
      (edgeMeta.jobTier || 0);

    const throughput =
      (edgeMeta.powerUser ? 1 : 0) +
      (edgeMeta.systemAge || 0) * 0.01;

    const advantage = {
      band, // ONEBAND
      edgeType,
      heat,
      throughput,
      cache_surface: true,
      prewarm_surface: true,
      chunk_surface: true,
      earnBand: edgeMeta.earnBand || "unknown",
      jobTier: edgeMeta.jobTier || null,
      skillTier: edgeMeta.skillTier || null,
      mentorTier: edgeMeta.mentorTier || null,
      reputationWeight: edgeMeta.reputationWeight || null,
      trustWeight: edgeMeta.trustWeight || null
    };

    return advantage;
  }

  function addEdge(type, fromUid, toUid, edgeMeta = {}) {
    if (!fromUid || !toUid) return;

    const index = graph.edges.length;

    const fullMeta = {
      ...edgeMeta,
      band: normalizeBand(edgeMeta),
      advantage: buildAdvantageMeta(type, edgeMeta)
    };

    graph.edges.push({
      type,
      from: fromUid,
      to: toUid,
      meta: fullMeta
    });

    attachEdgeToAdjacency(index, fromUid, toUid);
  }

  // ========================================================================
  // PRESENCE INGESTION — proximity edges
  // ========================================================================
  function ingestPresenceSnapshot(selfUid, nearbyPresence, options = {}) {
    const ranked = PowerUserRanking.rankNearby
      ? PowerUserRanking.rankNearby(nearbyPresence || [], options)
      : (nearbyPresence || []);

    ensureNode({ uid: selfUid });

    for (const person of ranked) {
      ensureNode({
        uid: person.uid,
        displayName: person.displayName,
        systemAge: person.systemAge,
        band: person.band || person.presenceBand || "symbolic"
      });

      addEdge("presence", selfUid, person.uid, {
        distance: person.distance,
        presenceBand: person.presenceBand,
        worldBand: person.worldBand || "presence",
        systemAge: person.systemAge,
        powerUser: person.powerUser,
        rankScore: person.rankScore,
        presenceMode: person.mode || null,
        presencePage: person.page || null,
        chunkProfile: person.chunkProfile || null,
        trustLevel: person.trustLevel || null
      });
    }
  }

  // ========================================================================
  // JOB INGESTION — job edges
  // ========================================================================
  function ingestJobAssignments(assignments) {
    for (const a of assignments || []) {
      ensureNode({
        uid: a.uid,
        displayName: a.displayName,
        systemAge: a.systemAge,
        band: a.band || a.presenceBand || "symbolic",
        earnBand: a.earnBand,
        jobTier: a.jobTier
      });

      addEdge("job", "system", a.uid, {
        jobId: a.jobId,
        jobTitle: a.jobTitle,
        jobTags: a.jobTags,
        presenceBand: a.presenceBand,
        worldBand: a.worldBand || "jobs",
        systemAge: a.systemAge,
        powerUser: a.powerUser,
        score: a.score,
        jobTier: a.jobTier || null,
        earnBand: a.earnBand || "unknown"
      });
    }
  }

  // ========================================================================
  // MENTORSHIP INGESTION
  // ========================================================================
  function ingestMentorRequest(requestPayload) {
    if (!requestPayload) return;

    const {
      requester,
      mentor,
      reason,
      status,
      requestedTier,
      domain,
      createdAt
    } = requestPayload;

    ensureNode({
      uid: requester.uid,
      displayName: requester.displayName,
      systemAge: requester.systemAge,
      band: requester.band || requester.presenceBand || "symbolic"
    });

    ensureNode({
      uid: mentor.uid,
      displayName: mentor.displayName,
      systemAge: mentor.systemAge,
      band: mentor.band || mentor.presenceBand || "symbolic"
    });

    addEdge("mentor_request", requester.uid, mentor.uid, {
      reason,
      status,
      requestedTier,
      domain,
      createdAt,
      presenceBand: requester.presenceBand || "symbolic",
      worldBand: "mentorship"
    });
  }

  function ingestMentorLink(mentorUid, menteeUid, meta = {}) {
    ensureNode({ uid: mentorUid });
    ensureNode({ uid: menteeUid });

    addEdge("mentor_link", mentorUid, menteeUid, {
      tier: meta.tier || null,
      domain: meta.domain || null,
      startedAt: meta.startedAt || null,
      presenceBand: meta.presenceBand || "symbolic",
      worldBand: "mentorship"
    });
  }

  // ========================================================================
  // UPGRADE INGESTION — IMMORTAL tiers
  // ========================================================================
  function ingestUpgradeEvent(event) {
    if (!event) return;

    const {
      uid,
      upgradeType,
      tier,
      timestamp,
      source,
      reason,
      worldBand
    } = event;

    ensureNode({ uid });

    addEdge("upgrade", uid, "system", {
      upgradeType,
      tier,
      timestamp,
      source,
      reason,
      presenceBand: event.presenceBand || "symbolic",
      worldBand: worldBand || "upgrades"
    });
  }

  // ========================================================================
  // SKILL INGESTION
  // ========================================================================
  function ingestSkillSnapshot(uid, skills = []) {
    ensureNode({ uid });

    for (const skill of skills) {
      const skillMeta = SkillRegistry.normalizeSkill
        ? SkillRegistry.normalizeSkill(skill)
        : skill;

      addEdge("skill", uid, `skill:${skillMeta.id}`, {
        skillId: skillMeta.id,
        skillName: skillMeta.name,
        skillTier: skillMeta.tier || null,
        skillScore: skillMeta.score || null,
        presenceBand: skillMeta.presenceBand || "symbolic",
        worldBand: "skills"
      });
    }
  }

  // ========================================================================
  // TRUST / REPUTATION INGESTION
  // ========================================================================
  function ingestTrustSignal(signal) {
    if (!signal) return;

    const {
      fromUid,
      toUid,
      trustDelta,
      reason,
      channel,
      timestamp
    } = signal;

    ensureNode({ uid: fromUid });
    ensureNode({ uid: toUid });

    const trustWeight = TrustSignals.weight
      ? TrustSignals.weight(signal)
      : trustDelta || 0;

    addEdge("trust", fromUid, toUid, {
      trustDelta,
      trustWeight,
      reason,
      channel,
      timestamp,
      presenceBand: signal.presenceBand || "symbolic",
      worldBand: "trust"
    });
  }

  function ingestReputationEvent(event) {
    if (!event) return;

    const {
      uid,
      delta,
      reason,
      source,
      timestamp
    } = event;

    ensureNode({ uid });

    const reputationWeight = ReputationEngine.weight
      ? ReputationEngine.weight(event)
      : delta || 0;

    addEdge("reputation", "system", uid, {
      delta,
      reputationWeight,
      reason,
      source,
      timestamp,
      presenceBand: event.presenceBand || "symbolic",
      worldBand: "reputation"
    });
  }

  // ========================================================================
  // EARN INGESTION
  // ========================================================================
  function ingestEarnEvent(event) {
    if (!event) return;

    const {
      uid,
      earnType,
      amount,
      currency,
      jobId,
      jobTier,
      earnBand,
      timestamp,
      source
    } = event;

    ensureNode({ uid, earnBand, jobTier });

    addEdge("earn", "system", uid, {
      earnType,
      amount,
      currency,
      jobId,
      jobTier,
      earnBand: earnBand || "unknown",
      timestamp,
      source,
      presenceBand: event.presenceBand || "symbolic",
      worldBand: "earn"
    });
  }

  // ========================================================================
  // IDENTITY LINKING
  // ========================================================================
  function ingestIdentityLink(uid, identitySnapshot) {
    if (!uid || !identitySnapshot) return;

    ensureNode({
      uid,
      displayName: identitySnapshot.name,
      systemAge: identitySnapshot.sessionAge || 0,
      band: identitySnapshot.band || identitySnapshot.presence.band || "symbolic",
      earnBand: identitySnapshot.earn.earnBand || "unknown",
      jobTier: identitySnapshot.advantage.jobReadiness || null
    });

    addEdge("identity_link", uid, `identity:${identitySnapshot.uid}`, {
      identityVersion: identitySnapshot.identityVersion,
      binarySignature: identitySnapshot.binarySignature,
      presenceSignature: identitySnapshot.presenceSignature,
      advantageSignature: identitySnapshot.advantageSignature,
      topologySignature: identitySnapshot.topologySignature,
      earnSignature: identitySnapshot.earnSignature,
      presenceBand: identitySnapshot.presence.band || "symbolic",
      worldBand: "identity"
    });
  }

  // ========================================================================
  // SOCIAL ACTIONS
  // ========================================================================
  function ingestFollow(fromUid, toUid, meta = {}) {
    ensureNode({ uid: fromUid });
    ensureNode({ uid: toUid });

    addEdge("follow", fromUid, toUid, {
      createdAt: meta.createdAt || null,
      presenceBand: meta.presenceBand || "symbolic",
      worldBand: "social"
    });
  }

  function ingestBlock(fromUid, toUid, meta = {}) {
    ensureNode({ uid: fromUid });
    ensureNode({ uid: toUid });

    addEdge("block", fromUid, toUid, {
      createdAt: meta.createdAt || null,
      reason: meta.reason || null,
      presenceBand: meta.presenceBand || "symbolic",
      worldBand: "social"
    });
  }

  function ingestInvite(fromUid, toUid, meta = {}) {
    ensureNode({ uid: fromUid });
    ensureNode({ uid: toUid });

    addEdge("invite", fromUid, toUid, {
      inviteType: meta.inviteType || null,
      context: meta.context || null,
      createdAt: meta.createdAt || null,
      presenceBand: meta.presenceBand || "symbolic",
      worldBand: "social"
    });
  }

  function ingestCollaboration(fromUid, toUid, meta = {}) {
    ensureNode({ uid: fromUid });
    ensureNode({ uid: toUid });

    addEdge("collaboration", fromUid, toUid, {
      projectId: meta.projectId || null,
      role: meta.role || null,
      startedAt: meta.startedAt || null,
      presenceBand: meta.presenceBand || "symbolic",
      worldBand: "collaboration"
    });
  }

  // ========================================================================
  // PARTY / SESSION / COWORK
  // ========================================================================
  function ingestPartyMembership(partyId, members = [], meta = {}) {
    for (const m of members) {
      ensureNode({ uid: m.uid, displayName: m.displayName });
      addEdge("party_member", m.uid, `party:${partyId}`, {
        partyId,
        role: m.role || null,
        presenceBand: m.presenceBand || "symbolic",
        worldBand: "party",
        joinedAt: m.joinedAt || null
      });
    }
  }

  function ingestSessionPresence(sessionId, participants = [], meta = {}) {
    for (const p of participants) {
      ensureNode({ uid: p.uid, displayName: p.displayName });
      addEdge("session_presence", p.uid, `session:${sessionId}`, {
        sessionId,
        presenceBand: p.presenceBand || "symbolic",
        worldBand: "session",
        joinedAt: p.joinedAt || null,
        mode: p.mode || null,
        page: p.page || null
      });
    }
  }

  function ingestCoworkSnapshot(coworkId, participants = [], meta = {}) {
    for (const p of participants) {
      ensureNode({ uid: p.uid, displayName: p.displayName });
      addEdge("cowork", p.uid, `cowork:${coworkId}`, {
        coworkId,
        presenceBand: p.presenceBand || "symbolic",
        worldBand: "cowork",
        joinedAt: p.joinedAt || null,
        role: p.role || null
      });
    }
  }

  // ========================================================================
  // QUERIES — deterministic views
  // ========================================================================
  function getNode(uid) {
    return graph.nodes.get(uid) || null;
  }

  function getEdgesByType(type) {
    return graph.edges.filter((e) => e.type === type);
  }

  function getOutgoingEdges(uid, type = null) {
    const adj = graph.adjacency.get(uid);
    if (!adj) return [];
    const indices = adj.out || [];
    if (!type) return indices.map((i) => graph.edges[i]);
    return indices.map((i) => graph.edges[i]).filter((e) => e.type === type);
  }

  function getIncomingEdges(uid, type = null) {
    const adj = graph.adjacency.get(uid);
    if (!adj) return [];
    const indices = adj.in || [];
    if (!type) return indices.map((i) => graph.edges[i]);
    return indices.map((i) => graph.edges[i]).filter((e) => e.type === type);
  }

  function getMentorsOf(uid) {
    return getIncomingEdges(uid, "mentor_link").map((e) => e.from);
  }

  function getMenteesOf(uid) {
    return getOutgoingEdges(uid, "mentor_link").map((e) => e.to);
  }

  function getFollowersOf(uid) {
    return getIncomingEdges(uid, "follow").map((e) => e.from);
  }

  function getFollowingOf(uid) {
    return getOutgoingEdges(uid, "follow").map((e) => e.to);
  }

  function getTrustScore(uid) {
    const incoming = getIncomingEdges(uid, "trust");
    let score = 0;
    for (const e of incoming) {
      score += e.meta.trustWeight || 0;
    }
    return score;
  }

  function getReputationScore(uid) {
    const incoming = getIncomingEdges(uid, "reputation");
    let score = 0;
    for (const e of incoming) {
      score += e.meta.reputationWeight || 0;
    }
    return score;
  }

  function getSkillProfile(uid) {
    const edges = getOutgoingEdges(uid, "skill");
    return edges.map((e) => ({
      id: e.meta.skillId,
      name: e.meta.skillName,
      tier: e.meta.skillTier,
      score: e.meta.skillScore,
      band: e.meta.band,
      advantage: e.meta.advantage
    }));
  }

  function getPresenceNeighborhood(uid) {
    const edges = getOutgoingEdges(uid, "presence");
    return edges.map((e) => ({
      uid: e.to,
      distance: e.meta.distance,
      rankScore: e.meta.rankScore,
      band: e.meta.band,
      advantage: e.meta.advantage,
      mode: e.meta.presenceMode,
      page: e.meta.presencePage,
      chunkProfile: e.meta.chunkProfile
    }));
  }

  function getEarnProfile(uid) {
    const edges = getIncomingEdges(uid, "earn");
    let total = 0;
    const byJob = {};
    for (const e of edges) {
      const amt = e.meta.amount || 0;
      total += amt;
      const jobId = e.meta.jobId || "unknown";
      if (!byJob[jobId]) byJob[jobId] = 0;
      byJob[jobId] += amt;
    }
    return { totalEarned: total, byJob };
  }

  // ========================================================================
  // SNAPSHOT
  // ========================================================================
  function snapshot() {
    return {
      meta,
      nodes: Array.from(graph.nodes.values()),
      edges: graph.edges.slice()
    };
  }

  // ========================================================================
  // PUBLIC API
  // ========================================================================
  return {
    meta,

    // ingestion
    ingestPresenceSnapshot,
    ingestJobAssignments,
    ingestMentorRequest,
    ingestMentorLink,
    ingestUpgradeEvent,
    ingestSkillSnapshot,
    ingestTrustSignal,
    ingestReputationEvent,
    ingestFollow,
    ingestBlock,
    ingestInvite,
    ingestCollaboration,
    ingestPartyMembership,
    ingestSessionPresence,
    ingestCoworkSnapshot,
    ingestEarnEvent,
    ingestIdentityLink,

    // queries
    getNode,
    getEdgesByType,
    getOutgoingEdges,
    getIncomingEdges,
    getMentorsOf,
    getMenteesOf,
    getFollowersOf,
    getFollowingOf,
    getTrustScore,
    getReputationScore,
    getSkillProfile,
    getPresenceNeighborhood,
    getEarnProfile,

    // snapshot
    snapshot
  };
}

PulseRealm.WorldSocialGraph = {
  createPulseWorldSocialGraphV30
}