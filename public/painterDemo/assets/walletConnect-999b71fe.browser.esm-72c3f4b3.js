import { aP as AbstractClientWallet, aQ as _classPrivateMethodInitSpec, aR as _classPrivateFieldInitSpec, aS as _defineProperty, aT as _classPrivateFieldSet, aU as _classPrivateFieldGet, aV as _classPrivateMethodGet, aW as __vitePreload, aX as WagmiAdapter, aY as walletIds } from "./index-0d430626.js";
const TW_WC_PROJECT_ID$1 = "145769e410f16970a79ff77b2d89a1e0";
var _walletConnectConnector = /* @__PURE__ */ new WeakMap();
var _provider = /* @__PURE__ */ new WeakMap();
var _maybeThrowError = /* @__PURE__ */ new WeakMap();
var _onConnect = /* @__PURE__ */ new WeakMap();
var _onDisconnect = /* @__PURE__ */ new WeakMap();
var _onChange = /* @__PURE__ */ new WeakMap();
var _onMessage = /* @__PURE__ */ new WeakMap();
var _onSessionRequestSent = /* @__PURE__ */ new WeakMap();
var _setupListeners = /* @__PURE__ */ new WeakSet();
var _removeListeners = /* @__PURE__ */ new WeakSet();
class WalletConnect extends AbstractClientWallet {
  get walletName() {
    return "WalletConnect";
  }
  constructor(options) {
    super(options?.walletId || WalletConnect.id, options);
    _classPrivateMethodInitSpec(this, _removeListeners);
    _classPrivateMethodInitSpec(this, _setupListeners);
    _classPrivateFieldInitSpec(this, _walletConnectConnector, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _provider, {
      writable: true,
      value: void 0
    });
    _defineProperty(this, "connector", void 0);
    _defineProperty(this, "projectId", void 0);
    _defineProperty(this, "qrcode", void 0);
    _classPrivateFieldInitSpec(this, _maybeThrowError, {
      writable: true,
      value: (error) => {
        if (error) {
          throw error;
        }
      }
    });
    _classPrivateFieldInitSpec(this, _onConnect, {
      writable: true,
      value: (data) => {
        _classPrivateFieldSet(this, _provider, data.provider);
        if (!_classPrivateFieldGet(this, _provider)) {
          throw new Error("WalletConnect provider not found after connecting.");
        }
      }
    });
    _classPrivateFieldInitSpec(this, _onDisconnect, {
      writable: true,
      value: () => {
        _classPrivateMethodGet(this, _removeListeners, _removeListeners2).call(this);
      }
    });
    _classPrivateFieldInitSpec(this, _onChange, {
      writable: true,
      value: async (payload) => {
        if (payload.chain)
          ;
        else if (payload.account)
          ;
      }
    });
    _classPrivateFieldInitSpec(this, _onMessage, {
      writable: true,
      value: (payload) => {
        switch (payload.type) {
          case "display_uri":
            this.emit("open_wallet", payload.data);
            break;
        }
      }
    });
    _classPrivateFieldInitSpec(this, _onSessionRequestSent, {
      writable: true,
      value: () => {
        this.emit("open_wallet");
      }
    });
    this.projectId = options?.projectId || TW_WC_PROJECT_ID$1;
    this.qrcode = options?.qrcode === false ? false : true;
  }
  async getConnector() {
    if (!this.connector) {
      const {
        WalletConnectConnector
      } = await __vitePreload(() => import("./thirdweb-dev-wallets-evm-connectors-wallet-connect.browser.esm-1c542248.js"), true ? ["creator/assets/thirdweb-dev-wallets-evm-connectors-wallet-connect.browser.esm-1c542248.js","creator/assets/index-0d430626.js","creator/assets/index-f717afc5.css","creator/assets/errors-105ad187.browser.esm-5668634f.js"] : void 0);
      _classPrivateFieldSet(this, _walletConnectConnector, new WalletConnectConnector({
        chains: this.chains,
        options: {
          qrcode: this.qrcode,
          projectId: this.projectId,
          dappMetadata: this.dappMetadata,
          storage: this.walletStorage,
          qrModalOptions: this.options?.qrModalOptions
        }
      }));
      this.connector = new WagmiAdapter(_classPrivateFieldGet(this, _walletConnectConnector));
      _classPrivateFieldSet(this, _provider, await _classPrivateFieldGet(this, _walletConnectConnector).getProvider());
      _classPrivateMethodGet(this, _setupListeners, _setupListeners2).call(this);
    }
    return this.connector;
  }
}
function _setupListeners2() {
  if (!_classPrivateFieldGet(this, _walletConnectConnector)) {
    return;
  }
  _classPrivateMethodGet(this, _removeListeners, _removeListeners2).call(this);
  _classPrivateFieldGet(this, _walletConnectConnector).on("connect", _classPrivateFieldGet(this, _onConnect));
  _classPrivateFieldGet(this, _walletConnectConnector).on("disconnect", _classPrivateFieldGet(this, _onDisconnect));
  _classPrivateFieldGet(this, _walletConnectConnector).on("change", _classPrivateFieldGet(this, _onChange));
  _classPrivateFieldGet(this, _walletConnectConnector).on("message", _classPrivateFieldGet(this, _onMessage));
  _classPrivateFieldGet(this, _provider)?.signer.client.on("session_request_sent", _classPrivateFieldGet(this, _onSessionRequestSent));
}
function _removeListeners2() {
  if (!_classPrivateFieldGet(this, _walletConnectConnector)) {
    return;
  }
  _classPrivateFieldGet(this, _walletConnectConnector).removeListener("connect", _classPrivateFieldGet(this, _onConnect));
  _classPrivateFieldGet(this, _walletConnectConnector).removeListener("disconnect", _classPrivateFieldGet(this, _onDisconnect));
  _classPrivateFieldGet(this, _walletConnectConnector).removeListener("change", _classPrivateFieldGet(this, _onChange));
  _classPrivateFieldGet(this, _walletConnectConnector).removeListener("message", _classPrivateFieldGet(this, _onMessage));
  _classPrivateFieldGet(this, _provider)?.signer.client.removeListener("session_request_sent", _classPrivateFieldGet(this, _onSessionRequestSent));
}
_defineProperty(WalletConnect, "id", walletIds.walletConnect);
_defineProperty(WalletConnect, "meta", {
  name: "WalletConnect",
  iconURL: "ipfs://QmX58KPRaTC9JYZ7KriuBzeoEaV2P9eZcA3qbFnTHZazKw/wallet-connect.svg"
});
const TW_WC_PROJECT_ID = "145769e410f16970a79ff77b2d89a1e0";
const walletConnect = (config) => {
  const projectId = config?.projectId || TW_WC_PROJECT_ID;
  return {
    id: WalletConnect.id,
    meta: WalletConnect.meta,
    create(options) {
      return new WalletConnect({
        ...options,
        qrcode: true,
        projectId,
        qrModalOptions: config?.qrModalOptions
      });
    }
  };
};
export {
  walletConnect
};
