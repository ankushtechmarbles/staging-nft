import { aQ as _classPrivateMethodInitSpec, aS as _defineProperty, aY as walletIds, aR as _classPrivateFieldInitSpec, co as getAddress, aU as _classPrivateFieldGet, aV as _classPrivateMethodGet, aT as _classPrivateFieldSet, cl as Web3Provider, cp as hexValue, aW as __vitePreload } from "./index-0d430626.js";
import { W as WagmiConnector, U as UserRejectedRequestError, S as SwitchChainError } from "./errors-105ad187.browser.esm-5668634f.js";
const NAMESPACE = "eip155";
const REQUESTED_CHAINS_KEY = "wagmi.requestedChains";
const ADD_ETH_CHAIN_METHOD = "wallet_addEthereumChain";
const LAST_USED_CHAIN_ID = "last-used-chain-id";
var _provider = /* @__PURE__ */ new WeakMap();
var _initProviderPromise = /* @__PURE__ */ new WeakMap();
var _storage = /* @__PURE__ */ new WeakMap();
var _createProvider = /* @__PURE__ */ new WeakSet();
var _initProvider = /* @__PURE__ */ new WeakSet();
var _isChainsStale = /* @__PURE__ */ new WeakSet();
var _removeListeners = /* @__PURE__ */ new WeakSet();
var _setRequestedChainsIds = /* @__PURE__ */ new WeakSet();
var _getRequestedChainsIds = /* @__PURE__ */ new WeakSet();
var _getNamespaceChainsIds = /* @__PURE__ */ new WeakSet();
var _getNamespaceMethods = /* @__PURE__ */ new WeakSet();
class WalletConnectConnector extends WagmiConnector {
  constructor(config) {
    super({
      ...config,
      options: {
        isNewChainsStale: true,
        ...config.options
      }
    });
    _classPrivateMethodInitSpec(this, _getNamespaceMethods);
    _classPrivateMethodInitSpec(this, _getNamespaceChainsIds);
    _classPrivateMethodInitSpec(this, _getRequestedChainsIds);
    _classPrivateMethodInitSpec(this, _setRequestedChainsIds);
    _classPrivateMethodInitSpec(this, _removeListeners);
    _classPrivateMethodInitSpec(this, _isChainsStale);
    _classPrivateMethodInitSpec(this, _initProvider);
    _classPrivateMethodInitSpec(this, _createProvider);
    _defineProperty(this, "id", walletIds.walletConnect);
    _defineProperty(this, "name", "WalletConnect");
    _defineProperty(this, "ready", true);
    _classPrivateFieldInitSpec(this, _provider, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _initProviderPromise, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _storage, {
      writable: true,
      value: void 0
    });
    _defineProperty(this, "onAccountsChanged", (accounts) => {
      if (accounts.length === 0) {
        this.emit("disconnect");
      } else {
        this.emit("change", {
          account: getAddress(accounts[0])
        });
      }
    });
    _defineProperty(this, "onChainChanged", (chainId) => {
      const id = Number(chainId);
      const unsupported = this.isChainUnsupported(id);
      _classPrivateFieldGet(this, _storage).setItem(LAST_USED_CHAIN_ID, String(chainId));
      this.emit("change", {
        chain: {
          id,
          unsupported
        }
      });
    });
    _defineProperty(this, "onDisconnect", () => {
      _classPrivateMethodGet(this, _setRequestedChainsIds, _setRequestedChainsIds2).call(this, []);
      _classPrivateFieldGet(this, _storage).removeItem(LAST_USED_CHAIN_ID);
      this.emit("disconnect");
    });
    _defineProperty(this, "onDisplayUri", (uri) => {
      this.emit("message", {
        type: "display_uri",
        data: uri
      });
    });
    _defineProperty(this, "onConnect", () => {
      this.emit("connect", {
        provider: _classPrivateFieldGet(this, _provider)
      });
    });
    _classPrivateFieldSet(this, _storage, config.options.storage);
    _classPrivateMethodGet(this, _createProvider, _createProvider2).call(this);
  }
  async connect() {
    let {
      chainId: chainIdP,
      pairingTopic
    } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    try {
      let targetChainId = chainIdP;
      if (!targetChainId) {
        const lastUsedChainIdStr = await _classPrivateFieldGet(this, _storage).getItem(LAST_USED_CHAIN_ID);
        const lastUsedChainId = lastUsedChainIdStr ? parseInt(lastUsedChainIdStr) : void 0;
        if (lastUsedChainId && !this.isChainUnsupported(lastUsedChainId)) {
          targetChainId = lastUsedChainId;
        } else {
          targetChainId = this.chains[0]?.chainId;
        }
      }
      if (!targetChainId) {
        throw new Error("No chains found on connector.");
      }
      const provider = await this.getProvider();
      this.setupListeners();
      const isChainsStale = await _classPrivateMethodGet(this, _isChainsStale, _isChainsStale2).call(this);
      if (provider.session && isChainsStale) {
        await provider.disconnect();
      }
      if (!provider.session || isChainsStale) {
        const optionalChains = this.chains.filter((chain) => chain.chainId !== targetChainId).map((optionalChain) => optionalChain.chainId);
        this.emit("message", {
          type: "connecting"
        });
        await provider.connect({
          pairingTopic,
          chains: [targetChainId],
          optionalChains: optionalChains.length > 0 ? optionalChains : [targetChainId]
        });
        _classPrivateMethodGet(this, _setRequestedChainsIds, _setRequestedChainsIds2).call(this, this.chains.map((_ref) => {
          let {
            chainId
          } = _ref;
          return chainId;
        }));
      }
      const accounts = await provider.enable();
      if (accounts.length === 0) {
        throw new Error("No accounts found on provider.");
      }
      const account = getAddress(accounts[0]);
      const id = await this.getChainId();
      const unsupported = this.isChainUnsupported(id);
      return {
        account,
        chain: {
          id,
          unsupported
        },
        provider: new Web3Provider(provider)
      };
    } catch (error) {
      if (/user rejected/i.test(error?.message)) {
        throw new UserRejectedRequestError(error);
      }
      throw error;
    }
  }
  async disconnect() {
    const provider = await this.getProvider();
    try {
      await provider.disconnect();
    } catch (error) {
      if (!/No matching key/i.test(error.message)) {
        throw error;
      }
    } finally {
      _classPrivateMethodGet(this, _removeListeners, _removeListeners2).call(this);
      _classPrivateMethodGet(this, _setRequestedChainsIds, _setRequestedChainsIds2).call(this, []);
    }
  }
  async getAccount() {
    const {
      accounts
    } = await this.getProvider();
    if (accounts.length === 0) {
      throw new Error("No accounts found on provider.");
    }
    return getAddress(accounts[0]);
  }
  async getChainId() {
    const {
      chainId
    } = await this.getProvider();
    return chainId;
  }
  async getProvider() {
    let {
      chainId
    } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!_classPrivateFieldGet(this, _provider)) {
      await _classPrivateMethodGet(this, _createProvider, _createProvider2).call(this);
    }
    if (chainId) {
      await this.switchChain(chainId);
    }
    if (!_classPrivateFieldGet(this, _provider)) {
      throw new Error("No provider found.");
    }
    return _classPrivateFieldGet(this, _provider);
  }
  async getSigner() {
    let {
      chainId
    } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const [provider, account] = await Promise.all([this.getProvider({
      chainId
    }), this.getAccount()]);
    return new Web3Provider(provider, chainId).getSigner(account);
  }
  async isAuthorized() {
    try {
      const [account, provider] = await Promise.all([this.getAccount(), this.getProvider()]);
      const isChainsStale = await _classPrivateMethodGet(this, _isChainsStale, _isChainsStale2).call(this);
      if (!account) {
        return false;
      }
      if (isChainsStale && provider.session) {
        try {
          await provider.disconnect();
        } catch {
        }
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }
  async switchChain(chainId) {
    const chain = this.chains.find((chain_) => chain_.chainId === chainId);
    if (!chain) {
      throw new SwitchChainError(new Error("chain not found on connector."));
    }
    try {
      const provider = await this.getProvider();
      const namespaceChains = _classPrivateMethodGet(this, _getNamespaceChainsIds, _getNamespaceChainsIds2).call(this);
      const namespaceMethods = _classPrivateMethodGet(this, _getNamespaceMethods, _getNamespaceMethods2).call(this);
      const isChainApproved = namespaceChains.includes(chainId);
      if (!isChainApproved && namespaceMethods.includes(ADD_ETH_CHAIN_METHOD)) {
        await provider.request({
          method: ADD_ETH_CHAIN_METHOD,
          params: [{
            chainId: hexValue(chain.chainId),
            blockExplorerUrls: [chain.explorers?.length ? chain.explorers[0] : void 0],
            chainName: chain.name,
            nativeCurrency: chain.nativeCurrency,
            rpcUrls: [...chain.rpc]
          }]
        });
        const requestedChains = await _classPrivateMethodGet(this, _getRequestedChainsIds, _getRequestedChainsIds2).call(this);
        requestedChains.push(chainId);
        _classPrivateMethodGet(this, _setRequestedChainsIds, _setRequestedChainsIds2).call(this, requestedChains);
      }
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{
          chainId: hexValue(chainId)
        }]
      });
      return chain;
    } catch (error) {
      const message = typeof error === "string" ? error : error?.message;
      if (/user rejected request/i.test(message)) {
        throw new UserRejectedRequestError(error);
      }
      throw new SwitchChainError(error);
    }
  }
  async setupListeners() {
    if (!_classPrivateFieldGet(this, _provider)) {
      return;
    }
    _classPrivateMethodGet(this, _removeListeners, _removeListeners2).call(this);
    _classPrivateFieldGet(this, _provider).on("accountsChanged", this.onAccountsChanged);
    _classPrivateFieldGet(this, _provider).on("chainChanged", this.onChainChanged);
    _classPrivateFieldGet(this, _provider).on("disconnect", this.onDisconnect);
    _classPrivateFieldGet(this, _provider).on("session_delete", this.onDisconnect);
    _classPrivateFieldGet(this, _provider).on("display_uri", this.onDisplayUri);
    _classPrivateFieldGet(this, _provider).on("connect", this.onConnect);
  }
}
async function _createProvider2() {
  if (!_classPrivateFieldGet(this, _initProviderPromise) && true) {
    _classPrivateFieldSet(this, _initProviderPromise, _classPrivateMethodGet(this, _initProvider, _initProvider2).call(this));
  }
  return _classPrivateFieldGet(this, _initProviderPromise);
}
async function _initProvider2() {
  const {
    default: EthereumProvider,
    OPTIONAL_EVENTS,
    OPTIONAL_METHODS
  } = await __vitePreload(() => import("./index.es-2d71cbd5.js"), true ? ["creator/assets/index.es-2d71cbd5.js","creator/assets/index-0d430626.js","creator/assets/index-f717afc5.css","creator/assets/tslib-f3df98f6.js","creator/assets/index-a20589e9.js","creator/assets/http-19c4437d.js"] : void 0);
  const [defaultChain, ...optionalChains] = this.chains.map((_ref2) => {
    let {
      chainId
    } = _ref2;
    return chainId;
  });
  if (defaultChain) {
    _classPrivateFieldSet(this, _provider, await EthereumProvider.init({
      showQrModal: this.options.qrcode !== false,
      projectId: this.options.projectId,
      optionalMethods: OPTIONAL_METHODS,
      optionalEvents: OPTIONAL_EVENTS,
      chains: [defaultChain],
      optionalChains,
      metadata: {
        name: this.options.dappMetadata.name,
        description: this.options.dappMetadata.description || "",
        url: this.options.dappMetadata.url,
        icons: [this.options.dappMetadata.logoUrl || ""]
      },
      rpcMap: Object.fromEntries(this.chains.map((chain) => [chain.chainId, chain.rpc[0]])),
      qrModalOptions: {
        ...this.options.qrModalOptions,
        explorerAllowList: [],
        explorerDenyList: []
      }
    }));
  }
}
async function _isChainsStale2() {
  const namespaceMethods = _classPrivateMethodGet(this, _getNamespaceMethods, _getNamespaceMethods2).call(this);
  if (namespaceMethods.includes(ADD_ETH_CHAIN_METHOD)) {
    return false;
  }
  if (!this.options.isNewChainsStale) {
    return false;
  }
  const requestedChains = await _classPrivateMethodGet(this, _getRequestedChainsIds, _getRequestedChainsIds2).call(this);
  const connectorChains = this.chains.map((_ref3) => {
    let {
      chainId
    } = _ref3;
    return chainId;
  });
  const namespaceChains = _classPrivateMethodGet(this, _getNamespaceChainsIds, _getNamespaceChainsIds2).call(this);
  if (namespaceChains.length && !namespaceChains.some((id) => connectorChains.includes(id))) {
    return false;
  }
  return !connectorChains.every((id) => requestedChains.includes(id));
}
function _removeListeners2() {
  if (!_classPrivateFieldGet(this, _provider)) {
    return;
  }
  _classPrivateFieldGet(this, _provider).removeListener("accountsChanged", this.onAccountsChanged);
  _classPrivateFieldGet(this, _provider).removeListener("chainChanged", this.onChainChanged);
  _classPrivateFieldGet(this, _provider).removeListener("disconnect", this.onDisconnect);
  _classPrivateFieldGet(this, _provider).removeListener("session_delete", this.onDisconnect);
  _classPrivateFieldGet(this, _provider).removeListener("display_uri", this.onDisplayUri);
  _classPrivateFieldGet(this, _provider).removeListener("connect", this.onConnect);
}
function _setRequestedChainsIds2(chains) {
  _classPrivateFieldGet(this, _storage).setItem(REQUESTED_CHAINS_KEY, JSON.stringify(chains));
}
async function _getRequestedChainsIds2() {
  const data = await _classPrivateFieldGet(this, _storage).getItem(REQUESTED_CHAINS_KEY);
  return data ? JSON.parse(data) : [];
}
function _getNamespaceChainsIds2() {
  if (!_classPrivateFieldGet(this, _provider)) {
    return [];
  }
  const chainIds = _classPrivateFieldGet(this, _provider).session?.namespaces[NAMESPACE]?.chains?.map((chain) => parseInt(chain.split(":")[1] || ""));
  return chainIds ?? [];
}
function _getNamespaceMethods2() {
  if (!_classPrivateFieldGet(this, _provider)) {
    return [];
  }
  const methods = _classPrivateFieldGet(this, _provider).session?.namespaces[NAMESPACE]?.methods;
  return methods ?? [];
}
export {
  WalletConnectConnector
};
