import { aQ as _classPrivateMethodInitSpec, aS as _defineProperty, aR as _classPrivateFieldInitSpec, ck as utils, cl as Web3Provider, aU as _classPrivateFieldGet, aW as __vitePreload, aT as _classPrivateFieldSet, aV as _classPrivateMethodGet, aY as walletIds } from "./index-0d430626.js";
import { W as WagmiConnector, U as UserRejectedRequestError, C as ChainNotConfiguredError, A as AddChainError, S as SwitchChainError } from "./errors-105ad187.browser.esm-5668634f.js";
import { n as normalizeChainId } from "./normalizeChainId-e4cc0175.browser.esm-64657a5e.js";
var _client = /* @__PURE__ */ new WeakMap();
var _provider = /* @__PURE__ */ new WeakMap();
var _isUserRejectedRequestError = /* @__PURE__ */ new WeakSet();
class CoinbaseWalletConnector extends WagmiConnector {
  constructor(_ref) {
    let {
      chains,
      options
    } = _ref;
    super({
      chains,
      options: {
        reloadOnDisconnect: false,
        ...options
      }
    });
    _classPrivateMethodInitSpec(this, _isUserRejectedRequestError);
    _defineProperty(this, "id", walletIds.coinbase);
    _defineProperty(this, "name", "Coinbase Wallet");
    _defineProperty(this, "ready", true);
    _classPrivateFieldInitSpec(this, _client, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _provider, {
      writable: true,
      value: void 0
    });
    _defineProperty(this, "onAccountsChanged", (accounts) => {
      if (accounts.length === 0) {
        this.emit("disconnect");
      } else {
        this.emit("change", {
          account: utils.getAddress(accounts[0])
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
    _defineProperty(this, "onDisconnect", () => {
      this.emit("disconnect");
    });
  }
  async connect() {
    let {
      chainId
    } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    try {
      const provider = await this.getProvider();
      this.setupListeners();
      this.emit("message", {
        type: "connecting"
      });
      const accounts = await provider.enable();
      const account = utils.getAddress(accounts[0]);
      let id = await this.getChainId();
      let unsupported = this.isChainUnsupported(id);
      if (chainId && id !== chainId) {
        try {
          const chain = await this.switchChain(chainId);
          id = chain.chainId;
          unsupported = this.isChainUnsupported(id);
        } catch (e) {
          console.error(`Connected but failed to switch to desired chain ${chainId}`, e);
        }
      }
      return {
        account,
        chain: {
          id,
          unsupported
        },
        provider: new Web3Provider(provider)
      };
    } catch (error) {
      if (/(user closed modal|accounts received is empty)/i.test(error.message)) {
        throw new UserRejectedRequestError(error);
      }
      throw error;
    }
  }
  async disconnect() {
    if (!_classPrivateFieldGet(this, _provider)) {
      return;
    }
    const provider = await this.getProvider();
    provider.removeListener("accountsChanged", this.onAccountsChanged);
    provider.removeListener("chainChanged", this.onChainChanged);
    provider.removeListener("disconnect", this.onDisconnect);
    provider.disconnect();
    provider.close();
  }
  async getAccount() {
    const provider = await this.getProvider();
    const accounts = await provider.request({
      method: "eth_accounts"
    });
    if (accounts.length === 0) {
      throw new Error("No accounts found");
    }
    return utils.getAddress(accounts[0]);
  }
  async getChainId() {
    const provider = await this.getProvider();
    const chainId = normalizeChainId(provider.chainId);
    return chainId;
  }
  async getProvider() {
    if (!_classPrivateFieldGet(this, _provider)) {
      let CoinbaseWalletSDK = (await __vitePreload(() => import("./index-886299cd.js").then((n) => n.i), true ? ["creator/assets/index-886299cd.js","creator/assets/index-0d430626.js","creator/assets/index-f717afc5.css","creator/assets/tslib-f3df98f6.js","creator/assets/index-a20589e9.js","creator/assets/hooks.module-e7c4e205.js"] : void 0)).default;
      if (typeof CoinbaseWalletSDK !== "function" && // @ts-expect-error This import error is not visible to TypeScript
      typeof CoinbaseWalletSDK.default === "function") {
        CoinbaseWalletSDK = CoinbaseWalletSDK.default;
      }
      _classPrivateFieldSet(this, _client, new CoinbaseWalletSDK(this.options));
      const walletExtensionChainId = _classPrivateFieldGet(this, _client).walletExtension?.getChainId();
      const chain = this.chains.find((chain_) => this.options.chainId ? chain_.chainId === this.options.chainId : chain_.chainId === walletExtensionChainId) || this.chains[0];
      const chainId = this.options.chainId || chain?.chainId;
      const jsonRpcUrl = this.options.jsonRpcUrl || chain?.rpc[0];
      _classPrivateFieldSet(this, _provider, _classPrivateFieldGet(this, _client).makeWeb3Provider(jsonRpcUrl, chainId));
    }
    return _classPrivateFieldGet(this, _provider);
  }
  async getSigner() {
    let {
      chainId
    } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const [provider, account] = await Promise.all([this.getProvider(), this.getAccount()]);
    return new Web3Provider(provider, chainId).getSigner(account);
  }
  async isAuthorized() {
    try {
      const account = await this.getAccount();
      return !!account;
    } catch {
      return false;
    }
  }
  async switchChain(chainId) {
    const provider = await this.getProvider();
    const id = utils.hexValue(chainId);
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{
          chainId: id
        }]
      });
      return this.chains.find((x) => x.chainId === chainId) ?? {
        chainId,
        name: `Chain ${id}`,
        slug: `${id}`,
        nativeCurrency: {
          name: "Ether",
          decimals: 18,
          symbol: "ETH"
        },
        rpc: [""],
        testnet: false,
        chain: "ethereum",
        shortName: "eth"
      };
    } catch (error) {
      const chain = this.chains.find((x) => x.chainId === chainId);
      if (!chain) {
        throw new ChainNotConfiguredError({
          chainId,
          connectorId: this.id
        });
      }
      if (error.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: id,
              chainName: chain.name,
              nativeCurrency: chain.nativeCurrency,
              rpcUrls: chain.rpc,
              blockExplorerUrls: this.getBlockExplorerUrls(chain)
            }]
          });
          return chain;
        } catch (addError) {
          if (_classPrivateMethodGet(this, _isUserRejectedRequestError, _isUserRejectedRequestError2).call(this, addError)) {
            throw new UserRejectedRequestError(addError);
          }
          throw new AddChainError();
        }
      }
      if (_classPrivateMethodGet(this, _isUserRejectedRequestError, _isUserRejectedRequestError2).call(this, error)) {
        throw new UserRejectedRequestError(error);
      }
      throw new SwitchChainError(error);
    }
  }
  async setupListeners() {
    const provider = await this.getProvider();
    provider.on("accountsChanged", this.onAccountsChanged);
    provider.on("chainChanged", this.onChainChanged);
    provider.on("disconnect", this.onDisconnect);
  }
  async getQrUrl() {
    await this.getProvider();
    if (!_classPrivateFieldGet(this, _client)) {
      throw new Error("Coinbase Wallet SDK not initialized");
    }
    return _classPrivateFieldGet(this, _client).getQrUrl();
  }
}
function _isUserRejectedRequestError2(error) {
  return /(user rejected)/i.test(error.message);
}
export {
  CoinbaseWalletConnector
};
