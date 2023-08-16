import { aS as _defineProperty, aR as _classPrivateFieldInitSpec, co as getAddress, aT as _classPrivateFieldSet, aU as _classPrivateFieldGet, cl as Web3Provider, cp as hexValue, cq as assertWindowEthereum, aY as walletIds } from "./index-0d430626.js";
import { W as WagmiConnector, a as ConnectorNotFoundError, U as UserRejectedRequestError, R as ResourceUnavailableError, C as ChainNotConfiguredError, A as AddChainError, S as SwitchChainError } from "./errors-105ad187.browser.esm-5668634f.js";
import { n as normalizeChainId } from "./normalizeChainId-e4cc0175.browser.esm-64657a5e.js";
function getInjectedName(ethereum) {
  if (!ethereum) {
    return "Injected";
  }
  const getName = (provider) => {
    if (provider.isAvalanche) {
      return "Core Wallet";
    }
    if (provider.isBitKeep) {
      return "BitKeep";
    }
    if (provider.isBraveWallet) {
      return "Brave Wallet";
    }
    if (provider.isCoinbaseWallet) {
      return "Coinbase Wallet";
    }
    if (provider.isExodus) {
      return "Exodus";
    }
    if (provider.isFrame) {
      return "Frame";
    }
    if (provider.isKuCoinWallet) {
      return "KuCoin Wallet";
    }
    if (provider.isMathWallet) {
      return "MathWallet";
    }
    if (provider.isOneInchIOSWallet || provider.isOneInchAndroidWallet) {
      return "1inch Wallet";
    }
    if (provider.isOpera) {
      return "Opera";
    }
    if (provider.isPortal) {
      return "Ripio Portal";
    }
    if (provider.isTally) {
      return "Tally";
    }
    if (provider.isTokenPocket) {
      return "TokenPocket";
    }
    if (provider.isTokenary) {
      return "Tokenary";
    }
    if (provider.isTrust || provider.isTrustWallet) {
      return "Trust Wallet";
    }
    if (provider.isMetaMask) {
      return "MetaMask";
    }
  };
  if (ethereum.providers?.length) {
    const nameSet = /* @__PURE__ */ new Set();
    let unknownCount = 1;
    for (const provider of ethereum.providers) {
      let name = getName(provider);
      if (!name) {
        name = `Unknown Wallet #${unknownCount}`;
        unknownCount += 1;
      }
      nameSet.add(name);
    }
    const names = [...nameSet];
    if (names.length) {
      return names;
    }
    return names[0] ?? "Injected";
  }
  return getName(ethereum) ?? "Injected";
}
var _provider = /* @__PURE__ */ new WeakMap();
class InjectedConnector extends WagmiConnector {
  /**
   * Name of the injected connector
   */
  /**
   * Whether the connector is ready to be used
   *
   * `true` if the injected provider is found
   */
  constructor(arg) {
    const defaultOptions = {
      shimDisconnect: true,
      getProvider: () => {
        if (assertWindowEthereum(globalThis.window)) {
          return globalThis.window.ethereum;
        }
      }
    };
    const options = {
      ...defaultOptions,
      ...arg.options
    };
    super({
      chains: arg.chains,
      options
    });
    _defineProperty(this, "id", void 0);
    _defineProperty(this, "name", void 0);
    _defineProperty(this, "ready", void 0);
    _classPrivateFieldInitSpec(this, _provider, {
      writable: true,
      value: void 0
    });
    _defineProperty(this, "connectorStorage", void 0);
    _defineProperty(this, "shimDisconnectKey", "injected.shimDisconnect");
    _defineProperty(this, "onAccountsChanged", async (accounts) => {
      if (accounts.length === 0) {
        this.emit("disconnect");
      } else {
        this.emit("change", {
          account: getAddress(accounts[0])
        });
      }
    });
    _defineProperty(this, "onChainChanged", (chainId) => {
      const id = normalizeChainId(chainId);
      const unsupported = this.isChainUnsupported(id);
      this.emit("change", {
        chain: {
          id,
          unsupported
        }
      });
    });
    _defineProperty(this, "onDisconnect", async (error) => {
      if (error.code === 1013) {
        const provider = await this.getProvider();
        if (provider) {
          const isAuthorized = await this.getAccount();
          if (isAuthorized) {
            return;
          }
        }
      }
      this.emit("disconnect");
      if (this.options.shimDisconnect) {
        await this.connectorStorage.removeItem(this.shimDisconnectKey);
      }
    });
    const _provider2 = options.getProvider();
    if (typeof options.name === "string") {
      this.name = options.name;
    } else if (_provider2) {
      const detectedName = getInjectedName(_provider2);
      if (options.name) {
        this.name = options.name(detectedName);
      } else {
        if (typeof detectedName === "string") {
          this.name = detectedName;
        } else {
          this.name = detectedName[0];
        }
      }
    } else {
      this.name = "Injected";
    }
    this.id = "injected";
    this.ready = !!_provider2;
    this.connectorStorage = arg.connectorStorage;
  }
  /**
   * * Connect to the injected provider
   * * switch to the given chain if `chainId` is specified as an argument
   */
  async connect() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    try {
      const provider = await this.getProvider();
      if (!provider) {
        throw new ConnectorNotFoundError();
      }
      this.setupListeners();
      this.emit("message", {
        type: "connecting"
      });
      const accountAddresses = await provider.request({
        method: "eth_requestAccounts"
      });
      const firstAccountAddress = getAddress(accountAddresses[0]);
      let connectedChainId = await this.getChainId();
      let isUnsupported = this.isChainUnsupported(connectedChainId);
      if (options.chainId && connectedChainId !== options.chainId) {
        try {
          await this.switchChain(options.chainId);
          connectedChainId = options.chainId;
          isUnsupported = this.isChainUnsupported(options.chainId);
        } catch (e) {
          console.error(`Could not switch to chain id: ${options.chainId}`, e);
        }
      }
      if (this.options.shimDisconnect) {
        await this.connectorStorage.setItem(this.shimDisconnectKey, "true");
      }
      const connectionInfo = {
        account: firstAccountAddress,
        chain: {
          id: connectedChainId,
          unsupported: isUnsupported
        },
        provider
      };
      this.emit("connect", connectionInfo);
      return connectionInfo;
    } catch (error) {
      if (this.isUserRejectedRequestError(error)) {
        throw new UserRejectedRequestError(error);
      }
      if (error.code === -32002) {
        throw new ResourceUnavailableError(error);
      }
      throw error;
    }
  }
  /**
   * disconnect from the injected provider
   */
  async disconnect() {
    const provider = await this.getProvider();
    if (!provider?.removeListener) {
      return;
    }
    provider.removeListener("accountsChanged", this.onAccountsChanged);
    provider.removeListener("chainChanged", this.onChainChanged);
    provider.removeListener("disconnect", this.onDisconnect);
    if (this.options.shimDisconnect) {
      await this.connectorStorage.removeItem(this.shimDisconnectKey);
    }
  }
  /**
   * @returns The first account address from the injected provider
   */
  async getAccount() {
    const provider = await this.getProvider();
    if (!provider) {
      throw new ConnectorNotFoundError();
    }
    const accounts = await provider.request({
      method: "eth_accounts"
    });
    return getAddress(accounts[0]);
  }
  /**
   * @returns The `chainId` of the currently connected chain from injected provider normalized to a `number`
   */
  async getChainId() {
    const provider = await this.getProvider();
    if (!provider) {
      throw new ConnectorNotFoundError();
    }
    return provider.request({
      method: "eth_chainId"
    }).then(normalizeChainId);
  }
  /**
   * get the injected provider
   */
  async getProvider() {
    const provider = this.options.getProvider();
    if (provider) {
      _classPrivateFieldSet(this, _provider, provider);
    }
    return _classPrivateFieldGet(this, _provider);
  }
  /**
   * get a `signer` for given `chainId`
   */
  async getSigner() {
    let {
      chainId
    } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const [provider, account] = await Promise.all([this.getProvider(), this.getAccount()]);
    return new Web3Provider(provider, chainId).getSigner(account);
  }
  /**
   *
   * @returns `true` if the connector is connected and address is available, else `false`
   */
  async isAuthorized() {
    try {
      if (this.options.shimDisconnect && // If shim does not exist in storage, wallet is disconnected
      !Boolean(await this.connectorStorage.getItem(this.shimDisconnectKey))) {
        return false;
      }
      const provider = await this.getProvider();
      if (!provider) {
        throw new ConnectorNotFoundError();
      }
      const account = await this.getAccount();
      return !!account;
    } catch {
      return false;
    }
  }
  /**
   * switch to given chain
   */
  async switchChain(chainId) {
    const provider = await this.getProvider();
    if (!provider) {
      throw new ConnectorNotFoundError();
    }
    const chainIdHex = hexValue(chainId);
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{
          chainId: chainIdHex
        }]
      });
      const chain = this.chains.find((_chain) => _chain.chainId === chainId);
      if (chain) {
        return chain;
      }
      return {
        chainId,
        name: `Chain ${chainIdHex}`,
        slug: `${chainIdHex}`,
        nativeCurrency: {
          name: "Ether",
          decimals: 18,
          symbol: "ETH"
        },
        rpc: [""],
        chain: "",
        shortName: "",
        testnet: true
      };
    } catch (error) {
      const chain = this.chains.find((_chain) => _chain.chainId === chainId);
      if (!chain) {
        throw new ChainNotConfiguredError({
          chainId,
          connectorId: this.id
        });
      }
      if (error.code === 4902 || // Unwrapping for MetaMask Mobile
      // https://github.com/MetaMask/metamask-mobile/issues/2944#issuecomment-976988719
      error?.data?.originalError?.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: chainIdHex,
              chainName: chain.name,
              nativeCurrency: chain.nativeCurrency,
              rpcUrls: chain.rpc,
              blockExplorerUrls: this.getBlockExplorerUrls(chain)
            }]
          });
          return chain;
        } catch (addError) {
          if (this.isUserRejectedRequestError(addError)) {
            throw new UserRejectedRequestError(error);
          }
          throw new AddChainError();
        }
      }
      if (this.isUserRejectedRequestError(error)) {
        throw new UserRejectedRequestError(error);
      }
      throw new SwitchChainError(error);
    }
  }
  async setupListeners() {
    const provider = await this.getProvider();
    if (provider.on) {
      provider.on("accountsChanged", this.onAccountsChanged);
      provider.on("chainChanged", this.onChainChanged);
      provider.on("disconnect", this.onDisconnect);
    }
  }
  isUserRejectedRequestError(error) {
    return error.code === 4001;
  }
}
var _UNSTABLE_shimOnConnectSelectAccount = /* @__PURE__ */ new WeakMap();
class MetaMaskConnector extends InjectedConnector {
  constructor(arg) {
    const defaultOptions = {
      name: "MetaMask",
      shimDisconnect: true,
      shimChainChangedDisconnect: true,
      getProvider() {
        function getReady(ethereum) {
          const isMetaMask = !!ethereum?.isMetaMask;
          if (!isMetaMask) {
            return;
          }
          if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state) {
            return;
          }
          if (ethereum.isAvalanche) {
            return;
          }
          if (ethereum.isKuCoinWallet) {
            return;
          }
          if (ethereum.isPortal) {
            return;
          }
          if (ethereum.isTokenPocket) {
            return;
          }
          if (ethereum.isTokenary) {
            return;
          }
          return ethereum;
        }
        if (assertWindowEthereum(globalThis.window)) {
          if (globalThis.window.ethereum?.providers) {
            return globalThis.window.ethereum.providers.find(getReady);
          }
          return getReady(globalThis.window.ethereum);
        }
      }
    };
    const options = {
      ...defaultOptions,
      ...arg.options
    };
    super({
      chains: arg.chains,
      options,
      connectorStorage: arg.connectorStorage
    });
    _defineProperty(this, "id", walletIds.metamask);
    _classPrivateFieldInitSpec(this, _UNSTABLE_shimOnConnectSelectAccount, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(this, _UNSTABLE_shimOnConnectSelectAccount, options.UNSTABLE_shimOnConnectSelectAccount);
  }
  /**
   * Connect to injected MetaMask provider
   */
  async connect() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    try {
      const provider = await this.getProvider();
      if (!provider) {
        throw new ConnectorNotFoundError();
      }
      this.setupListeners();
      this.emit("message", {
        type: "connecting"
      });
      let account = null;
      if (_classPrivateFieldGet(this, _UNSTABLE_shimOnConnectSelectAccount) && this.options?.shimDisconnect && !Boolean(this.connectorStorage.getItem(this.shimDisconnectKey))) {
        account = await this.getAccount().catch(() => null);
        const isConnected = !!account;
        if (isConnected) {
          try {
            await provider.request({
              method: "wallet_requestPermissions",
              params: [{
                eth_accounts: {}
              }]
            });
          } catch (error) {
            if (this.isUserRejectedRequestError(error)) {
              throw new UserRejectedRequestError(error);
            }
          }
        }
      }
      if (!account) {
        const accounts = await provider.request({
          method: "eth_requestAccounts"
        });
        account = getAddress(accounts[0]);
      }
      let connectedChainId = await this.getChainId();
      let isUnsupported = this.isChainUnsupported(connectedChainId);
      if (options.chainId && connectedChainId !== options.chainId) {
        try {
          await this.switchChain(options.chainId);
          connectedChainId = options.chainId;
          isUnsupported = this.isChainUnsupported(options.chainId);
        } catch (e) {
          console.error(`Could not switch to chain id : ${options.chainId}`, e);
        }
      }
      if (this.options?.shimDisconnect) {
        await this.connectorStorage.setItem(this.shimDisconnectKey, "true");
      }
      const connectionInfo = {
        chain: {
          id: connectedChainId,
          unsupported: isUnsupported
        },
        provider,
        account
      };
      this.emit("connect", connectionInfo);
      return connectionInfo;
    } catch (error) {
      if (this.isUserRejectedRequestError(error)) {
        throw new UserRejectedRequestError(error);
      }
      if (error.code === -32002) {
        throw new ResourceUnavailableError(error);
      }
      throw error;
    }
  }
  async switchAccount() {
    const provider = await this.getProvider();
    await provider.request({
      method: "wallet_requestPermissions",
      params: [{
        eth_accounts: {}
      }]
    });
  }
}
export {
  MetaMaskConnector
};
