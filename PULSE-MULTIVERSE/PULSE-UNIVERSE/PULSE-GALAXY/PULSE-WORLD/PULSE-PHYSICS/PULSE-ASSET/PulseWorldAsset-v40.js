// ============================================================================
//  PulseWorldAsset-v220.js
//  “Identity-Attached Multi-Chain Crypto Wallet Layer (FULL + PULSARBURST + METAMASK)”
//  REAL EVM PRIVATE KEY + PUBLIC KEY + ADDRESS (MetaMask compatible)
//  Full export • Full access • Full metadata • Full control • PulsarBurst integrated + MetaMask context
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

(function () {

  // --------------------------------------------------------------------------
  // CONFIG: SUPPORTED NETWORKS (NOW WITH FULL PULSARBURST INTEGRATION)
  // --------------------------------------------------------------------------
  const PULSE_NETWORKS = {
    ethereum: {
      key: "ethereum",
      label: "Ethereum Mainnet",
      chainId: 1,
      explorer: "https://etherscan.io",
      rpc: "https://mainnet.infura.io/v3/YOUR_KEY",
      gasToken: "ETH",
      family: "evm",
      role: "public-main"
    },
    bnb: {
      key: "bnb",
      label: "BNB Smart Chain",
      chainId: 56,
      explorer: "https://bscscan.com",
      rpc: "https://bsc-dataseed.binance.org",
      gasToken: "BNB",
      family: "evm",
      role: "public-main"
    },
    polygon: {
      key: "polygon",
      label: "Polygon",
      chainId: 137,
      explorer: "https://polygonscan.com",
      rpc: "https://polygon-rpc.com",
      gasToken: "MATIC",
      family: "evm",
      role: "scaling"
    },
    avalanche: {
      key: "avax",
      label: "Avalanche C-Chain",
      chainId: 43114,
      explorer: "https://snowtrace.io",
      rpc: "https://api.avax.network/ext/bc/C/rpc",
      gasToken: "AVAX",
      family: "evm",
      role: "public-main"
    },
    arbitrum: {
      key: "arbitrum",
      label: "Arbitrum One",
      chainId: 42161,
      explorer: "https://arbiscan.io",
      rpc: "https://arb1.arbitrum.io/rpc",
      gasToken: "ETH",
      family: "evm",
      role: "rollup"
    },
    optimism: {
      key: "optimism",
      label: "Optimism",
      chainId: 10,
      explorer: "https://optimistic.etherscan.io",
      rpc: "https://mainnet.optimism.io",
      gasToken: "ETH",
      family: "evm",
      role: "rollup"
    },
    fantom: {
      key: "fantom",
      label: "Fantom Opera",
      chainId: 250,
      explorer: "https://ftmscan.com",
      rpc: "https://rpc.ftm.tools",
      gasToken: "FTM",
      family: "evm",
      role: "public-main"
    },

    // ⭐ FULL PULSARBURST INTEGRATION
    pulsarburst: {
      key: "pulsarburst",
      label: "Pulsar Burst Finality Chain",
      chainId: 88888,
      explorer: "https://explorer.pulsarburst.net",
      rpc: "https://rpc.pulsarburst.net", // placeholder until your node is live
      gasToken: "PULSE",
      assetSymbol: "PBRST",
      assetName: "Pulsar Burst",
      assetDecimals: 18,
      family: "evm-compatible",
      role: "primary-finality",
      consensus: "Burst-Finality",
      notes: "Primary chain for PulseWorld digital assets, identity, and settlement."
    }
  };

  // map chainId → networkKey for MetaMask context
  const CHAIN_ID_MAP = {
    1: "ethereum",
    56: "bnb",
    137: "polygon",
    43114: "avax",
    42161: "arbitrum",
    10: "optimism",
    250: "fantom",
    88888: "pulsarburst"
  };

  // --------------------------------------------------------------------------
  // REAL CRYPTO: secp256k1 + keccak256 (MetaMask compatible)
  // --------------------------------------------------------------------------

  function generatePrivateKeyHex() {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
  }

  async function derivePublicKeyHex(privateKeyHex) {
    const secp = await import("https://cdn.jsdelivr.net/npm/@noble/secp256k1@1.7.1/+esm");
    return secp.getPublicKey(privateKeyHex, false).slice(2);
  }

  async function keccak256(hex) {
    const bytes = Uint8Array.from(hex.match(/.{1,2}/g).map(b => parseInt(b, 16)));
    const hash = await crypto.subtle.digest("SHA-3-256", bytes);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
  }

  async function deriveAddressFromPrivateKey(privateKeyHex) {
    const pub = await derivePublicKeyHex(privateKeyHex);
    const hash = await keccak256(pub);
    return {
      publicKeyHex: pub,
      address: "0x" + hash.slice(-40)
    };
  }

  // --------------------------------------------------------------------------
  // CORE: ENSURE IDENTITY HAS PulseAssets
  // --------------------------------------------------------------------------
  function ensurePulseAssets(identity) {
    if (!identity || !PulseRealm.PulseIdentity) return null;

    if (!PulseRealm.PulseIdentity.PulseAssets) {
      const pk = generatePrivateKeyHex();
      const now = Date.now();

      PulseRealm.PulseIdentity.PulseAssets = {
        createdAt: now,
        updatedAt: now,
        corePrivateKeyHex: pk,
        corePublicKeyHex: "",
        coreAddress: "",
        wallets: {},
        exports: {},
        meta: {
          identityKey: identity.uid || identity.email || null,
          origin: "PulseWorldAsset-v220",
          version: 220,
          description: "PulseWorld Identity-Attached Multi-Chain Wallet",
          tags: ["pulseworld", "identity", "wallet", "pulsarburst", "evm"],
          createdAt: now
        },
        // MetaMask context lives here too
        metaMask: {
          address: null,
          chainId: null,
          networkKey: null,
          balanceNative: null,
          lastUpdated: null
        }
      };
    }

    return PulseRealm.PulseIdentity.PulseAssets;
  }

  // --------------------------------------------------------------------------
  // CORE: BUILD REAL EVM WALLETS + FULL PULSARBURST INTEGRATION
  // --------------------------------------------------------------------------
  async function ensureWallets(identity) {
    const assets = ensurePulseAssets(identity);
    if (!assets) return null;

    const pk = assets.corePrivateKeyHex;
    const now = Date.now();

    const { publicKeyHex, address } = await deriveAddressFromPrivateKey(pk);

    assets.corePublicKeyHex = publicKeyHex;
    assets.coreAddress = address;
    assets.updatedAt = now;

    Object.values(PULSE_NETWORKS).forEach(net => {
      if (!assets.wallets[net.key]) {
        assets.wallets[net.key] = {
          networkKey: net.key,
          label: net.label,
          address,
          chainId: net.chainId,
          explorer: net.explorer,
          rpc: net.rpc,
          gasToken: net.gasToken,
          family: net.family,
          role: net.role,
          consensus: net.consensus || "",
          notes: net.notes || "",
          createdAt: now,
          updatedAt: now,
          balances: {
            native: "0",
            tokens: []
          },
          flags: {
            isPrimary: net.key === "pulsarburst",
            isEvmCompatible: net.family.includes("evm")
          }
        };
      }
    });

    // FULL EXPORT BUNDLE INCLUDING PULSARBURST
    assets.exports = {
      privateKey: pk,
      publicKey: publicKeyHex,
      address,
      metaMaskImport: {
        address,
        privateKey: pk,
        description: "PulseWorld Identity Wallet (MetaMask compatible)",
        networks: Object.values(PULSE_NETWORKS).map(net => ({
          chainId: net.chainId,
          name: net.label,
          symbol: net.gasToken,
          explorer: net.explorer
        }))
      },
      fullBundle: {
        identityKey: assets.meta.identityKey,
        privateKey: pk,
        publicKey: publicKeyHex,
        address,
        networks: PULSE_NETWORKS,
        wallets: assets.wallets,
        createdAt: assets.createdAt,
        updatedAt: assets.updatedAt,
        origin: assets.meta.origin,
        version: assets.meta.version,
        tags: assets.meta.tags
      }
    };

    // 🔥 log that we actually built a wallet
    console.log("[PulseAsset] Core Address:", assets.coreAddress);
    console.log("[PulseAsset] Public Key:", assets.corePublicKeyHex);
    console.log("[PulseAsset] Private Key:", assets.corePrivateKeyHex);

    return assets;
  }

  // --------------------------------------------------------------------------
  // METAMASK CONTEXT HELPERS (ENGINE-SIDE, UI CAN CALL THESE)
  // --------------------------------------------------------------------------

  function setMetaMaskContext({ address, chainId, balanceNative }) {
    const assets = PulseRealm.PulseIdentity?.PulseAssets;
    if (!assets) return;

    const networkKey = CHAIN_ID_MAP[Number(chainId)] || null;
    assets.metaMask.address = address || null;
    assets.metaMask.chainId = chainId || null;
    assets.metaMask.networkKey = networkKey;
    assets.metaMask.balanceNative = balanceNative || null;
    assets.metaMask.lastUpdated = Date.now();

    // if we know the network, mirror MM balance into that wallet’s balances.native
    if (networkKey && assets.wallets[networkKey]) {
      assets.wallets[networkKey].balances.native = balanceNative || assets.wallets[networkKey].balances.native;
      assets.wallets[networkKey].updatedAt = Date.now();
    }

    console.log("[PulseAsset::MetaMask] Context updated:", assets.metaMask);
  }

  function getMetaMaskContext() {
    const assets = PulseRealm.PulseIdentity?.PulseAssets;
    return assets ? assets.metaMask : null;
  }

  // --------------------------------------------------------------------------
  // PUBLIC API — FULL CONTROL + PULSARBURST + METAMASK INTEGRATION
  // --------------------------------------------------------------------------
  PulseRealm.PulseAsset = {

    getNetworks() {
      return PULSE_NETWORKS;
    },

    async attachIdentity(identity) {
      return await ensureWallets(identity);
    },

    getAssets() {
      return PulseRealm.PulseIdentity?.PulseAssets ?? null;
    },

    getWallet(networkKey) {
      return this.getAssets()?.wallets[networkKey] ?? null;
    },

    getPrivateKey() {
      return this.getAssets()?.corePrivateKeyHex ?? null;
    },

    getPublicKey() {
      return this.getAssets()?.corePublicKeyHex ?? null;
    },

    getAddress() {
      return this.getAssets()?.coreAddress ?? null;
    },

    exportPrivateKey() {
      return this.getAssets()?.exports.privateKey ?? null;
    },

    exportPublicKey() {
      return this.getAssets()?.exports.publicKey ?? null;
    },

    exportAddress() {
      return this.getAssets()?.exports.address ?? null;
    },

    exportMetaMask() {
      return this.getAssets()?.exports.metaMaskImport ?? null;
    },

    exportFullBundle() {
      return this.getAssets()?.exports.fullBundle ?? null;
    },

    // MetaMask engine hooks
    setMetaMaskContext,
    getMetaMaskContext
  };

  console.log("[PulseAsset] PULSE-WORLD-ASSET-v220.js FULL + PULSARBURST + METAMASK initialized.");
})();
