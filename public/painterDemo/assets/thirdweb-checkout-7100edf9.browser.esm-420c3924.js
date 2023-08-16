import { ap as ChainId, aZ as _defineProperty, br as invariant } from "./index-0d430626.js";
const PAPER_API_BASE = `https://paper.xyz/api`;
const PAPER_API_VERSION = `2022-08-12`;
const PAPER_API_URL = `${PAPER_API_BASE}/${PAPER_API_VERSION}/platform/thirdweb`;
const PAPER_CHAIN_ID_MAP = {
  [ChainId.Mainnet]: "Ethereum",
  [ChainId.Goerli]: "Goerli",
  [ChainId.Polygon]: "Polygon",
  [ChainId.Mumbai]: "Mumbai",
  [ChainId.Avalanche]: "Avalanche"
};
function parseChainIdToPaperChain(chainId) {
  invariant(chainId in PAPER_CHAIN_ID_MAP, `chainId not supported by paper: ${chainId}`);
  return PAPER_CHAIN_ID_MAP[chainId];
}
async function fetchRegisteredCheckoutId(contractAddress, chainId) {
  const paperChain = parseChainIdToPaperChain(chainId);
  const res = await fetch(`${PAPER_API_URL}/register-contract?contractAddress=${contractAddress}&chain=${paperChain}`);
  const json = await res.json();
  invariant(json.result.id, "Contract is not registered with paper");
  return json.result.id;
}
const DEFAULT_PARAMS = {
  expiresInMinutes: 15,
  feeBearer: "BUYER",
  sendEmailOnSuccess: true,
  redirectAfterPayment: false
};
async function createCheckoutLinkIntent(contractId, params) {
  const res = await fetch(`${PAPER_API_URL}/checkout-link-intent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contractId,
      ...DEFAULT_PARAMS,
      ...params,
      metadata: {
        ...params.metadata,
        via_platform: "thirdweb"
      },
      // overrides that are hard coded
      hideNativeMint: true,
      hidePaperWallet: !!params.walletAddress,
      hideExternalWallet: true,
      hidePayWithCrypto: true,
      usePaperKey: false
    })
  });
  const json = await res.json();
  invariant(json.checkoutLinkIntentUrl, "Failed to create checkout link intent");
  return json.checkoutLinkIntentUrl;
}
class PaperCheckout {
  constructor(contractWrapper) {
    _defineProperty(this, "contractWrapper", void 0);
    this.contractWrapper = contractWrapper;
  }
  async getCheckoutId() {
    return fetchRegisteredCheckoutId(this.contractWrapper.readContract.address, await this.contractWrapper.getChainID());
  }
  async isEnabled() {
    try {
      return !!await this.getCheckoutId();
    } catch (err) {
      return false;
    }
  }
  async createLinkIntent(params) {
    return await createCheckoutLinkIntent(await this.getCheckoutId(), params);
  }
}
export {
  PaperCheckout as P
};
