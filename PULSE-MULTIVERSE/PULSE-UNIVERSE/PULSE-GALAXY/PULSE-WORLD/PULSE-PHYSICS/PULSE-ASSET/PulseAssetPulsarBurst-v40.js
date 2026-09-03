// ============================================================================
//  PulseAssetPulsarBurst-v120.js
//  “Pulsar Burst Native Asset Engine / Runtime Rail (FULL CONTROL + METAMASK)”
//  Plugs into PulseRealm.PulseAsset + PulseRealm.PulseIdentity
//  One chain • One asset • High‑speed Pulsar Burst rail
//  MetaMask-ready token metadata + ERC-20 transfer payload builder + MM helpers
// ============================================================================

const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

(function () {
  // --------------------------------------------------------------------------
  // CHAIN CONFIG: PULSAR BURST (SET, NOT OPTIONAL)
  // --------------------------------------------------------------------------
  const PULSAR_BURST_CHAIN = {
    key: "pulsarburst",
    label: "Pulsar Burst Finality Chain",
    chainId: 88888,
    rpc: "https://rpc.pulsarburst.net",          // placeholder
    explorer: "https://explorer.pulsarburst.net",
    gasToken: "PULSE",
    assetSymbol: "PBRST",
    assetName: "Pulsar Burst",
    assetDecimals: 18,
    consensus: "Burst-Finality",
    notes: "Primary chain for PulseWorld digital assets, identity, and settlement."
  };

  // --------------------------------------------------------------------------
  // TOKEN CONFIG: PULSAR BURST ERC-20 STYLE (FOR METAMASK)
  // --------------------------------------------------------------------------
  const PULSAR_BURST_TOKEN = {
    symbol: "PBRST",
    name: "Pulsar Burst",
    decimals: 18,
    // When you deploy the real contract, set this:
    contractAddress: "0x0000000000000000000000000000000000000000", // placeholder
    // Minimal ABI for transfer + balanceOf (for frontends / MetaMask integration)
    abi: [
      {
        constant: false,
        inputs: [
          { name: "to", type: "address" },
          { name: "value", type: "uint256" }
        ],
        name: "transfer",
        outputs: [{ name: "", type: "bool" }],
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function"
      }
    ]
  };

  // --------------------------------------------------------------------------
  // INTERNAL: GET CORE WALLET / IDENTITY
  // --------------------------------------------------------------------------
  function getCoreIdentity() {
    return PulseRealm.PulseIdentity || null;
  }

  function getPulseAssets() {
    return PulseRealm.PulseIdentity?.PulseAssets ?? null;
  }

  function getPulsarBurstWallet() {
    const assets = getPulseAssets();
    if (!assets) return null;
    return assets.wallets?.[PULSAR_BURST_CHAIN.key] ?? null;
  }

  function getCoreAddress() {
    const wallet = getPulsarBurstWallet();
    if (wallet?.address) return wallet.address;
    return getPulseAssets()?.coreAddress ?? null;
  }

  // --------------------------------------------------------------------------
  // INTERNAL: STATE (IN‑MEMORY DEMO LAYER + RUNTIME SNAPSHOTS)
  // --------------------------------------------------------------------------
  if (!PulseRealm.PulsarBurstState) {
    PulseRealm.PulsarBurstState = {
      balances: {},   // address -> { PBRST: number, PULSE: number }
      txLog: [],      // array of { hash, from, to, amount, asset, createdAt, status, meta }
      metaMask: {
        connected: false,
        address: null,
        chainId: null,
        lastError: null,
        lastSyncAt: null,
        nativeBalance: "0",
        tokenBalance: "0"
      }
    };
  }

  function ensureBalanceRecord(address) {
    const state = PulseRealm.PulsarBurstState;
    if (!state.balances[address]) {
      state.balances[address] = {
        PBRST: 0,
        PULSE: 0
      };
    }
    return state.balances[address];
  }

  // --------------------------------------------------------------------------
  // INTERNAL: TX HELPERS
  // --------------------------------------------------------------------------
  function simulateTxHash() {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return (
      "0x" +
      Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
    );
  }

  function logTx(entry) {
    PulseRealm.PulsarBurstState.txLog.push(entry);
    console.log("[PulsarBurst][TX]", entry);
  }

  // --------------------------------------------------------------------------
  // ERC-20 TRANSFER DATA BUILDER (FOR REAL CHAIN LATER)
  // --------------------------------------------------------------------------
  function padTo64(hex) {
    return hex.replace(/^0x/, "").padStart(64, "0");
  }

  function addressToHex(address) {
    return address.replace(/^0x/, "").padStart(64, "0");
  }

  function amountToHex(amount, decimals) {
    const big = BigInt(Math.floor(amount * 10 ** decimals));
    return big.toString(16);
  }

  function buildERC20TransferData(toAddress, amount) {
    const selector = "a9059cbb"; // keccak256("transfer(address,uint256)") first 4 bytes
    const toHex = addressToHex(toAddress);
    const valueHex = padTo64("0x" + amountToHex(amount, PULSAR_BURST_TOKEN.decimals));
    return "0x" + selector + toHex + valueHex;
  }

  // --------------------------------------------------------------------------
  // METAMASK HELPERS (ATTACH, ADD NETWORK, ADD TOKEN, SYNC BALANCES)
  // --------------------------------------------------------------------------
  async function getEthereumProvider() {
    if (typeof window === "undefined") return null;
    const eth = window.ethereum || null;
    return eth;
  }

  async function connectMetaMask() {
    const state = PulseRealm.PulsarBurstState.metaMask;
    const eth = await getEthereumProvider();
    if (!eth) {
      state.lastError = "MetaMask (window.ethereum) not found.";
      console.warn("[PulsarBurst][MetaMask] No provider.");
      return null;
    }

    try {
      const accounts = await eth.request({ method: "eth_requestAccounts" });
      const chainIdHex = await eth.request({ method: "eth_chainId" });
      const chainId = parseInt(chainIdHex, 16);

      state.connected = true;
      state.address = accounts[0] || null;
      state.chainId = chainId;
      state.lastError = null;
      state.lastSyncAt = Date.now();

      console.log("[PulsarBurst][MetaMask] Connected:", state.address, "chainId:", state.chainId);
      return { ...state };
    } catch (err) {
      console.error("[PulsarBurst][MetaMask] Connect failed:", err);
      state.lastError = String(err?.message || err);
      state.connected = false;
      return null;
    }
  }

  async function addPulsarBurstNetworkToMetaMask() {
    const eth = await getEthereumProvider();
    if (!eth) {
      console.warn("[PulsarBurst][MetaMask] No provider for add network.");
      return null;
    }

    const params = {
      chainId: "0x" + PULSAR_BURST_CHAIN.chainId.toString(16),
      chainName: PULSAR_BURST_CHAIN.label,
      nativeCurrency: {
        name: PULSAR_BURST_CHAIN.gasToken,
        symbol: PULSAR_BURST_CHAIN.gasToken,
        decimals: 18
      },
      rpcUrls: [PULSAR_BURST_CHAIN.rpc],
      blockExplorerUrls: [PULSAR_BURST_CHAIN.explorer]
    };

    try {
      await eth.request({
        method: "wallet_addEthereumChain",
        params: [params]
      });
      console.log("[PulsarBurst][MetaMask] Network added:", params);
      return params;
    } catch (err) {
      console.error("[PulsarBurst][MetaMask] Add network failed:", err);
      return null;
    }
  }

  async function addPulsarBurstTokenToMetaMask() {
    const eth = await getEthereumProvider();
    if (!eth) {
      console.warn("[PulsarBurst][MetaMask] No provider for add token.");
      return null;
    }

    const tokenDetails = {
      type: "ERC20",
      options: {
        address: PULSAR_BURST_TOKEN.contractAddress,
        symbol: PULSAR_BURST_TOKEN.symbol,
        decimals: PULSAR_BURST_TOKEN.decimals,
        image: "https://pulseworld.example.com/assets/pulsarburst-token.png" // placeholder
      }
    };

    try {
      const wasAdded = await eth.request({
        method: "wallet_watchAsset",
        params: tokenDetails
      });
      console.log("[PulsarBurst][MetaMask] Token watch result:", wasAdded);
      return tokenDetails;
    } catch (err) {
      console.error("[PulsarBurst][MetaMask] Add token failed:", err);
      return null;
    }
  }

  async function syncMetaMaskBalances() {
    const state = PulseRealm.PulsarBurstState.metaMask;
    const eth = await getEthereumProvider();
    if (!eth || !state.connected || !state.address) {
      console.warn("[PulsarBurst][MetaMask] Cannot sync balances; not connected.");
      return null;
    }

    try {
      // Use ethers via global import if present
      const { ethers } = globalThis;
      if (!ethers) {
        console.warn("[PulsarBurst][MetaMask] ethers not found on globalThis.");
      }

      // Native balance
      const nativeWei = await eth.request({
        method: "eth_getBalance",
        params: [state.address, "latest"]
      });
      let nativeBalance = "0";
      if (ethers) {
        nativeBalance = ethers.utils.formatEther(nativeWei);
      }

      // Token balance via contract (if contractAddress set)
      let tokenBalance = "0";
      if (ethers && PULSAR_BURST_TOKEN.contractAddress !== "0x0000000000000000000000000000000000000000") {
        const provider = new ethers.providers.Web3Provider(eth);
        const contract = new ethers.Contract(
          PULSAR_BURST_TOKEN.contractAddress,
          PULSAR_BURST_TOKEN.abi,
          provider
        );
        const bal = await contract.balanceOf(state.address);
        tokenBalance = ethers.utils.formatUnits(bal, PULSAR_BURST_TOKEN.decimals);
      }

      state.nativeBalance = nativeBalance;
      state.tokenBalance = tokenBalance;
      state.lastSyncAt = Date.now();

      console.log("[PulsarBurst][MetaMask] Balances synced:", {
        address: state.address,
        nativeBalance,
        tokenBalance
      });

      // Mirror into local demo rail
      const localBal = ensureBalanceRecord(state.address);
      localBal.PULSE = parseFloat(nativeBalance || "0");
      localBal.PBRST = parseFloat(tokenBalance || "0");

      return { ...state, local: localBal };
    } catch (err) {
      console.error("[PulsarBurst][MetaMask] Sync balances failed:", err);
      PulseRealm.PulsarBurstState.metaMask.lastError = String(err?.message || err);
      return null;
    }
  }

  // --------------------------------------------------------------------------
  // PUBLIC API: PULSAR BURST ASSET RUNTIME (FULL CONTROL + METAMASK)
  // --------------------------------------------------------------------------
  PulseRealm.PulsarBurst = {
    // --- Chain / config introspection ---
    getChainConfig() {
      return PULSAR_BURST_CHAIN;
    },

    getTokenConfig() {
      return PULSAR_BURST_TOKEN;
    },

    getRuntimeIdentity() {
      return getCoreIdentity();
    },

    getWallet() {
      return getPulsarBurstWallet();
    },

    getAddress() {
      return getCoreAddress();
    },

    // --- Balance / state (local demo rail) ---
    getBalance(address) {
      if (!address) address = this.getAddress();
      if (!address) return null;
      return ensureBalanceRecord(address);
    },

    // Mint Pulsar Burst asset to an address (demo only)
    mintPulsarBurst(address, amount) {
      if (!address) address = this.getAddress();
      if (!address) {
        console.warn("[PulsarBurst] No address to mint to.");
        return null;
      }
      const bal = ensureBalanceRecord(address);
      bal.PBRST += amount;

      const tx = {
        hash: simulateTxHash(),
        from: "0x0000000000000000000000000000000000000000",
        to: address,
        amount,
        asset: "PBRST",
        createdAt: Date.now(),
        status: "minted",
        meta: { type: "local-mint" }
      };
      logTx(tx);
      return { balance: bal, tx };
    },

    // Transfer Pulsar Burst between addresses (demo only)
    transferPulsarBurst(fromAddress, toAddress, amount) {
      if (!fromAddress) fromAddress = this.getAddress();
      if (!fromAddress || !toAddress) {
        console.warn("[PulsarBurst] Missing from/to address.");
        return null;
      }

      const fromBal = ensureBalanceRecord(fromAddress);
      const toBal = ensureBalanceRecord(toAddress);

      if (fromBal.PBRST < amount) {
        console.warn("[PulsarBurst] Insufficient PBRST balance.");
        return null;
      }

      fromBal.PBRST -= amount;
      toBal.PBRST += amount;

      const tx = {
        hash: simulateTxHash(),
        from: fromAddress,
        to: toAddress,
        amount,
        asset: "PBRST",
        createdAt: Date.now(),
        status: "transferred",
        meta: { type: "local-transfer" }
      };
      logTx(tx);
      return { fromBalance: fromBal, toBalance: toBal, tx };
    },

    // --- TX log / inspection ---
    getTxLog() {
      return PulseRealm.PulsarBurstState.txLog.slice();
    },

    // --- MetaMask / real-chain integration helpers ---
    getMetaMaskState() {
      return { ...PulseRealm.PulsarBurstState.metaMask };
    },

    async connectMetaMask() {
      return await connectMetaMask();
    },

    async addNetworkToMetaMask() {
      return await addPulsarBurstNetworkToMetaMask();
    },

    async addTokenToMetaMask() {
      return await addPulsarBurstTokenToMetaMask();
    },

    async syncMetaMaskBalances() {
      return await syncMetaMaskBalances();
    },

    getMetaMaskTokenDetails() {
      return {
        symbol: PULSAR_BURST_TOKEN.symbol,
        name: PULSAR_BURST_TOKEN.name,
        decimals: PULSAR_BURST_TOKEN.decimals,
        contractAddress: PULSAR_BURST_TOKEN.contractAddress,
        chainId: PULSAR_BURST_CHAIN.chainId
      };
    },

    buildTransferData(toAddress, amount) {
      return buildERC20TransferData(toAddress, amount);
    }
  };

  console.log("[PulsarBurst] PulseAssetPulsarBurst-v120.js FULL CONTROL + METAMASK initialized and attached to PulseRealm.");
})();
