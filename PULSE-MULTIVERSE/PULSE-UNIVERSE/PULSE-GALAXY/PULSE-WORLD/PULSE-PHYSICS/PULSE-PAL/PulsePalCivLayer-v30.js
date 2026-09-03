// ============================================================================
//  PulsePalCivLayer-v30 — IMMORTAL PSEUDO ORGAN
//  Civilization Identity + Business + Region + Presence
// ============================================================================
const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

export const PulsePalCivLayer = (() => {

  const create = () => {
    // Internal state (formerly this.profileState)
    let profileState = {
      version: "v30-IMMORTAL+++",

      // Civilization Tier
      tier: "sandbox",          // sandbox | local | epic | legendary

      // Civilization Focus
      focus: "exploration",     // exploration | economy | governance | conflict | culture

      // Risk + Continuity
      riskBand: "low",          // low | medium | high
      continuityBand: "new",    // new | emerging | stable | deep | legendary

      // Business / Shop / Region Identity
      businessName: null,
      businessType: null,       // shop | service | guild | faction | brand
      region: null,             // city / district / zone
      worldZone: null,          // world region (PulseWorld)
      faction: null,            // optional faction identity

      // Economy / Culture Profile
      economyProfile: "neutral", // neutral | trade | artisan | industrial | digital
      cultureProfile: "open",    // open | traditional | hybrid | frontier

      // Presence
      reputation: "unknown",     // unknown | local | trusted | renowned | legendary
      prosperity: "emerging",    // emerging | growing | stable | thriving | dominant

      lastSetAt: null
    };

    // -----------------------------------------------------------------------
    // SNAPSHOT
    // -----------------------------------------------------------------------
    const profile = () => ({ ...profileState });

    const stamp = () => { profileState.lastSetAt = PulseRealm.PulseNOW; };

    // -----------------------------------------------------------------------
    // CIVILIZATION TIER
    // -----------------------------------------------------------------------
    const setTier = (tier) => {
      const allowed = ["sandbox", "local", "epic", "legendary"];
      if (!allowed.includes(tier)) return profile();
      profileState.tier = tier;
      stamp();
      return profile();
    };

    // -----------------------------------------------------------------------
    // CIVILIZATION FOCUS
    // -----------------------------------------------------------------------
    const setFocus = (focus) => {
      const allowed = ["exploration", "economy", "governance", "conflict", "culture"];
      if (!allowed.includes(focus)) return profile();
      profileState.focus = focus;
      stamp();
      return profile();
    };

    // -----------------------------------------------------------------------
    // RISK + CONTINUITY
    // -----------------------------------------------------------------------
    const setRiskBand = (band) => {
      const allowed = ["low", "medium", "high"];
      if (!allowed.includes(band)) return profile();
      profileState.riskBand = band;
      stamp();
      return profile();
    };

    const setContinuityBand = (band) => {
      const allowed = ["new", "emerging", "stable", "deep", "legendary"];
      if (!allowed.includes(band)) return profile();
      profileState.continuityBand = band;
      stamp();
      return profile();
    };

    // -----------------------------------------------------------------------
    // BUSINESS / REGION / WORLD IDENTITY
    // -----------------------------------------------------------------------
    const setBusiness = (name, type = "shop") => {
      profileState.businessName = name;
      profileState.businessType = type;
      stamp();
      return profile();
    };

    const setRegion = (region) => {
      profileState.region = region;
      stamp();
      return profile();
    };

    const setWorldZone = (zone) => {
      profileState.worldZone = zone;
      stamp();
      return profile();
    };

    const setFaction = (faction) => {
      profileState.faction = faction;
      stamp();
      return profile();
    };

    // -----------------------------------------------------------------------
    // ECONOMY / CULTURE PROFILE
    // -----------------------------------------------------------------------
    const setEconomyProfile = (p) => {
      const allowed = ["neutral", "trade", "artisan", "industrial", "digital"];
      if (!allowed.includes(p)) return profile();
      profileState.economyProfile = p;
      stamp();
      return profile();
    };

    const setCultureProfile = (p) => {
      const allowed = ["open", "traditional", "hybrid", "frontier"];
      if (!allowed.includes(p)) return profile();
      profileState.cultureProfile = p;
      stamp();
      return profile();
    };

    // -----------------------------------------------------------------------
    // PRESENCE / REPUTATION
    // -----------------------------------------------------------------------
    const setReputation = (r) => {
      const allowed = ["unknown", "local", "trusted", "renowned", "legendary"];
      if (!allowed.includes(r)) return profile();
      profileState.reputation = r;
      stamp();
      return profile();
    };

    const setProsperity = (p) => {
      const allowed = ["emerging", "growing", "stable", "thriving", "dominant"];
      if (!allowed.includes(p)) return profile();
      profileState.prosperity = p;
      stamp();
      return profile();
    };

    // -----------------------------------------------------------------------
    // PUBLIC IMMORTAL INSTANCE
    // -----------------------------------------------------------------------
    return Object.freeze({
      profile,

      // Civ Tier + Focus
      setTier,
      setFocus,

      // Risk + Continuity
      setRiskBand,
      setContinuityBand,

      // Business / Region / World Identity
      setBusiness,
      setRegion,
      setWorldZone,
      setFaction,

      // Economy / Culture
      setEconomyProfile,
      setCultureProfile,

      // Reputation / Prosperity
      setReputation,
      setProsperity
    });
  };

  // Singleton instance (same behavior as your original _civCore)
  const instance = create();

  try { PulseRealm.PulsePalCivLayer = instance; } catch {}

  return instance;
})();
