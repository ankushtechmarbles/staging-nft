import { cm as EventEmitter$1, aS as _defineProperty, cn as defaultChains } from "./index-0d430626.js";
class WagmiConnector extends EventEmitter$1 {
  /** Unique connector id */
  /** Connector name */
  /** Chains connector supports */
  /** Options to use with connector */
  /** Whether connector is usable */
  constructor(_ref) {
    let {
      chains = defaultChains,
      options
    } = _ref;
    super();
    _defineProperty(this, "id", void 0);
    _defineProperty(this, "name", void 0);
    _defineProperty(this, "chains", void 0);
    _defineProperty(this, "options", void 0);
    _defineProperty(this, "ready", void 0);
    this.chains = chains;
    this.options = options;
  }
  getBlockExplorerUrls(chain) {
    const explorers = chain.explorers?.map((x) => x.url) ?? [];
    return explorers.length > 0 ? explorers : void 0;
  }
  isChainUnsupported(chainId) {
    return !this.chains.some((x) => x.chainId === chainId);
  }
  updateChains(chains) {
    this.chains = chains;
  }
}
class RpcError extends Error {
  constructor(message, options) {
    const {
      cause,
      code,
      data
    } = options;
    if (!Number.isInteger(code)) {
      throw new Error('"code" must be an integer.');
    }
    if (!message || typeof message !== "string") {
      throw new Error('"message" must be a nonempty string.');
    }
    super(message);
    _defineProperty(this, "cause", void 0);
    _defineProperty(this, "code", void 0);
    _defineProperty(this, "data", void 0);
    this.cause = cause;
    this.code = code;
    this.data = data;
  }
}
class ProviderRpcError extends RpcError {
  /**
   * Create an Ethereum Provider JSON-RPC error.
   * `code` must be an integer in the 1000 <= 4999 range.
   */
  constructor(message, options) {
    const {
      cause,
      code,
      data
    } = options;
    if (!(Number.isInteger(code) && code >= 1e3 && code <= 4999)) {
      throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
    }
    super(message, {
      cause,
      code,
      data
    });
  }
}
class AddChainError extends Error {
  constructor() {
    super(...arguments);
    _defineProperty(this, "name", "AddChainError");
    _defineProperty(this, "message", "Error adding chain");
  }
}
class ChainNotConfiguredError extends Error {
  constructor(_ref) {
    let {
      chainId,
      connectorId
    } = _ref;
    super(`Chain "${chainId}" not configured for connector "${connectorId}".`);
    _defineProperty(this, "name", "ChainNotConfigured");
  }
}
class ConnectorNotFoundError extends Error {
  constructor() {
    super(...arguments);
    _defineProperty(this, "name", "ConnectorNotFoundError");
    _defineProperty(this, "message", "Connector not found");
  }
}
class ResourceUnavailableError extends RpcError {
  constructor(cause) {
    super("Resource unavailable", {
      cause,
      code: -32002
    });
    _defineProperty(this, "name", "ResourceUnavailable");
  }
}
class SwitchChainError extends ProviderRpcError {
  constructor(cause) {
    super("Error switching chain", {
      cause,
      code: 4902
    });
    _defineProperty(this, "name", "SwitchChainError");
  }
}
class UserRejectedRequestError extends ProviderRpcError {
  constructor(cause) {
    super("User rejected request", {
      cause,
      code: 4001
    });
    _defineProperty(this, "name", "UserRejectedRequestError");
  }
}
export {
  AddChainError as A,
  ChainNotConfiguredError as C,
  ResourceUnavailableError as R,
  SwitchChainError as S,
  UserRejectedRequestError as U,
  WagmiConnector as W,
  ConnectorNotFoundError as a
};
