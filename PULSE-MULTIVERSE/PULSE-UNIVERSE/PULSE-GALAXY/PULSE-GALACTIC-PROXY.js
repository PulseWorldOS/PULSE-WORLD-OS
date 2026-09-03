// ============================================================================
//  PULSE‑GALACTIC‑PROXY.js
//  “Orbital Network Router / Galaxy Selection Engine / Galaxy Layer Proxy”
//  Pure logic • Deterministic • Runtime‑aware • Galaxy‑aware
// ============================================================================

export const PulseGalacticProxy = (() => {

  // ---------------------------------------------------------------------------
  // CONFIG: Galaxy registry (replace with real Galaxy AWS / GCP data)
  // ---------------------------------------------------------------------------
  const GALAXIES = [
    // Primary universe page – us‑central1 (main Pulsar / world hub)
    {
      id: "GALAXY-CENTRAL",
      region: "us-central1",
      lat: 41.2619,      // approximate US‑central latitude
      lon: -95.8608,     // approximate US‑central longitude
      health: 0.995,
      latencyScore: 0.08,
      endpoint: "https://galaxy-central.pulseworld.us-central1"
    },
    {
      id: "GALAXY-WEST",
      region: "us-west-2",
      lat: 37.7749,
      lon: -122.4194,
      health: 0.98,
      latencyScore: 0.12,
      endpoint: "https://galaxy-west.pulseworld-galaxy.aws"
    },
    {
      id: "GALAXY-EAST",
      region: "us-east-1",
      lat: 40.7128,
      lon: -74.0060,
      health: 0.96,
      latencyScore: 0.18,
      endpoint: "https://galaxy-east.pulseworld-galaxy.aws"
    },
    {
      id: "GALAXY-EUROPE",
      region: "eu-central-1",
      lat: 50.1109,
      lon: 8.6821,
      health: 0.99,
      latencyScore: 0.20,
      endpoint: "https://galaxy-europe.pulseworld-galaxy.aws"
    }
  ];

  // ---------------------------------------------------------------------------
  // UTIL: Haversine distance (Earth distance in km)
  // ---------------------------------------------------------------------------
  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const toRad = d => (d * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // ---------------------------------------------------------------------------
  // UTIL: Extract client location / region from AWS / GCP context
  // ---------------------------------------------------------------------------
  function extractClientContext(requestContext = {}) {
    const headers = requestContext.headers || {};

    return {
      regionHint:
        requestContext.region ||
        headers["x-pulse-region"] ||
        headers["cloudfront-viewer-country"] ||
        null,

      lat:
        requestContext.lat ||
        (headers["x-pulse-lat"] && parseFloat(headers["x-pulse-lat"])) ||
        null,

      lon:
        requestContext.lon ||
        (headers["x-pulse-lon"] && parseFloat(headers["x-pulse-lon"])) ||
        null
    };
  }

  // ---------------------------------------------------------------------------
  // CORE: Score galaxies based on distance + health + latency
  // ---------------------------------------------------------------------------
  function scoreGalaxy(client, galaxy) {
    let distanceScore = 1.0;

    if (client.lat != null && client.lon != null) {
      const km = haversineDistance(
        client.lat,
        client.lon,
        galaxy.lat,
        galaxy.lon
      );
      distanceScore = Math.min(1.0, km / 10000);
    }

    const healthScore = 1.0 - galaxy.health;
    const latencyScore = galaxy.latencyScore;

    return distanceScore * 0.5 + healthScore * 0.3 + latencyScore * 0.2;
  }

  // ---------------------------------------------------------------------------
  // SELECTOR: Choose best galaxy
  // ---------------------------------------------------------------------------
  function selectBestGalaxy(clientContext) {
    let best = null;
    let bestScore = Infinity;

    for (const galaxy of GALAXIES) {
      const score = scoreGalaxy(clientContext, galaxy);
      if (score < bestScore) {
        bestScore = score;
        best = galaxy;
      }
    }

    return best;
  }

  // ---------------------------------------------------------------------------
  // PUBLIC: Route to galaxy
  // ---------------------------------------------------------------------------
  async function routeToGalaxy(requestContext = {}) {
    const client = extractClientContext(requestContext);
    const galaxy = selectBestGalaxy(client);

    if (!galaxy) {
      throw new Error("PulseGalacticProxy could not select a galaxy.");
    }

    return {
      galaxyId: galaxy.id,
      region: galaxy.region,
      endpoint: galaxy.endpoint,
      clientContext: client
    };
  }

  // ---------------------------------------------------------------------------
  // EXPORT
  // ---------------------------------------------------------------------------
  return {
    routeToGalaxy,
    _internal: {
      GALAXIES,
      extractClientContext,
      selectBestGalaxy,
      scoreGalaxy,
      haversineDistance
    }
  };

})();
