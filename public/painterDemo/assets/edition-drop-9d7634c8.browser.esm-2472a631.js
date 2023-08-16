import { aZ as _defineProperty, t as BigNumber, a_ as ContractWrapper, a$ as buildTransactionFunction, b0 as AbiSchema, b1 as ContractMetadata, b2 as DropErc1155ContractSchema, b3 as ContractAppURI, b4 as ContractRoles, b5 as ContractRoyalty, b6 as ContractPrimarySale, b7 as DropErc1155ClaimConditions, b8 as ContractEvents, b9 as ContractEncoder, ba as GasCostEstimator, bb as ContractPlatformFee, bc as ContractInterceptor, bd as ContractOwner, be as getRoleHash, y as AddressZero, bf as Transaction } from "./index-0d430626.js";
import { S as StandardErc1155 } from "./erc-1155-standard-607e2724.browser.esm-5f46bd34.js";
import { P as PaperCheckout } from "./thirdweb-checkout-7100edf9.browser.esm-420c3924.js";
class DropErc1155History {
  constructor(events) {
    _defineProperty(this, "events", void 0);
    this.events = events;
  }
  /**
   * Get all claimer addresses
   *
   * @remarks Get a list of all the addresses that have claimed a token
   * @param tokenId - the tokenId of the NFT to get the addresses of*
   * @returns - A unique list of addresses that claimed the token
   * @example
   * ```javascript
   * const tokenId = "0";
   * const allClaimerAddresses = await contract.history.getAllClaimerAddresses(tokenId);
   * ```
   */
  async getAllClaimerAddresses(tokenId) {
    const a = (await this.events.getEvents("TokensClaimed")).filter((e) => e.data && BigNumber.isBigNumber(e.data.tokenId) ? e.data.tokenId.eq(tokenId) : false);
    return Array.from(new Set(a.filter((b) => typeof b.data?.claimer === "string").map((b) => b.data.claimer)));
  }
}
class EditionDrop extends StandardErc1155 {
  /**
   * Configure royalties
   * @remarks Set your own royalties for the entire contract or per token
   * @example
   * ```javascript
   * // royalties on the whole contract
   * contract.royalties.setDefaultRoyaltyInfo({
   *   seller_fee_basis_points: 100, // 1%
   *   fee_recipient: "0x..."
   * });
   * // override royalty for a particular token
   * contract.royalties.setTokenRoyaltyInfo(tokenId, {
   *   seller_fee_basis_points: 500, // 5%
   *   fee_recipient: "0x..."
   * });
   * ```
   */
  /**
   * Configure claim conditions for each NFT
   * @remarks Define who can claim each NFT in the edition, when and how many.
   * @example
   * ```javascript
   * const presaleStartTime = new Date();
   * const publicSaleStartTime = new Date(Date.now() + 60 * 60 * 24 * 1000);
   * const claimConditions = [
   *   {
   *     startTime: presaleStartTime, // start the presale now
   *     maxClaimableSupply: 2, // limit how many mints for this presale
   *     price: 0.01, // presale price
   *     snapshot: ['0x...', '0x...'], // limit minting to only certain addresses
   *   },
   *   {
   *     startTime: publicSaleStartTime, // 24h after presale, start public sale
   *     price: 0.08, // public sale price
   *   }
   * ]);
   *
   * const tokenId = 0; // the id of the NFT to set claim conditions on
   * await contract.claimConditions.set(tokenId, claimConditions);
   * ```
   */
  /**
   * Checkout
   * @remarks Create a FIAT currency checkout for your NFT drop.
   */
  constructor(network, _address, storage) {
    var _this;
    let _options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    let abi = arguments.length > 4 ? arguments[4] : void 0;
    let chainId = arguments.length > 5 ? arguments[5] : void 0;
    let contractWrapper = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : new ContractWrapper(network, _address, abi, _options);
    super(contractWrapper, storage, chainId);
    _this = this;
    _defineProperty(this, "abi", void 0);
    _defineProperty(this, "sales", void 0);
    _defineProperty(this, "platformFees", void 0);
    _defineProperty(this, "encoder", void 0);
    _defineProperty(this, "estimator", void 0);
    _defineProperty(this, "events", void 0);
    _defineProperty(this, "metadata", void 0);
    _defineProperty(this, "app", void 0);
    _defineProperty(this, "roles", void 0);
    _defineProperty(this, "royalties", void 0);
    _defineProperty(this, "claimConditions", void 0);
    _defineProperty(this, "checkout", void 0);
    _defineProperty(this, "history", void 0);
    _defineProperty(this, "interceptor", void 0);
    _defineProperty(this, "owner", void 0);
    _defineProperty(this, "createBatch", buildTransactionFunction(async (metadatas, options) => {
      return this.erc1155.lazyMint.prepare(metadatas, options);
    }));
    _defineProperty(this, "claimTo", buildTransactionFunction(async function(destinationAddress, tokenId, quantity) {
      let checkERC20Allowance = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
      return _this.erc1155.claimTo.prepare(destinationAddress, tokenId, quantity, {
        checkERC20Allowance
      });
    }));
    _defineProperty(this, "claim", buildTransactionFunction(async function(tokenId, quantity) {
      let checkERC20Allowance = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
      const address = await _this.contractWrapper.getSignerAddress();
      return _this.claimTo.prepare(address, tokenId, quantity, checkERC20Allowance);
    }));
    _defineProperty(this, "burnTokens", buildTransactionFunction(async (tokenId, amount) => {
      return this.erc1155.burn.prepare(tokenId, amount);
    }));
    this.abi = AbiSchema.parse(abi);
    this.metadata = new ContractMetadata(this.contractWrapper, DropErc1155ContractSchema, this.storage);
    this.app = new ContractAppURI(this.contractWrapper, this.metadata, this.storage);
    this.roles = new ContractRoles(this.contractWrapper, EditionDrop.contractRoles);
    this.royalties = new ContractRoyalty(this.contractWrapper, this.metadata);
    this.sales = new ContractPrimarySale(this.contractWrapper);
    this.claimConditions = new DropErc1155ClaimConditions(this.contractWrapper, this.metadata, this.storage);
    this.events = new ContractEvents(this.contractWrapper);
    this.history = new DropErc1155History(this.events);
    this.encoder = new ContractEncoder(this.contractWrapper);
    this.estimator = new GasCostEstimator(this.contractWrapper);
    this.platformFees = new ContractPlatformFee(this.contractWrapper);
    this.interceptor = new ContractInterceptor(this.contractWrapper);
    this.checkout = new PaperCheckout(this.contractWrapper);
    this.owner = new ContractOwner(this.contractWrapper);
  }
  /**
   * @internal
   */
  onNetworkUpdated(network) {
    this.contractWrapper.updateSignerOrProvider(network);
  }
  getAddress() {
    return this.contractWrapper.readContract.address;
  }
  /** ******************************
   * READ FUNCTIONS
   *******************************/
  // TODO getAllClaimerAddresses() - should be done via an indexer
  /**
   * Get all NFTs
   *
   * @remarks Get all the data associated with every NFT in this contract.
   *
   * By default, returns the first 100 NFTs, use queryParams to fetch more.
   *
   * @example
   * ```javascript
   * const nfts = await contract.getAll();
   * ```
   * @param queryParams - optional filtering to only fetch a subset of results.
   * @returns The NFT metadata for all NFTs queried.
   */
  async getAll(queryParams) {
    return this.erc1155.getAll(queryParams);
  }
  /**
   * Get all NFTs owned by a specific wallet
   *
   * @remarks Get all the data associated with the NFTs owned by a specific wallet.
   *
   * @example
   * ```javascript
   * // Address of the wallet to get the NFTs of
   * const address = "{{wallet_address}}";
   * const nfts = await contract.getOwned(address);
   * ```
   *
   * @returns The NFT metadata for all NFTs in the contract.
   */
  async getOwned(walletAddress) {
    return this.erc1155.getOwned(walletAddress);
  }
  /**
   * Get the number of NFTs minted
   * @returns the total number of NFTs minted in this contract
   * @public
   */
  async getTotalCount() {
    return this.erc1155.totalCount();
  }
  /**
   * Get whether users can transfer NFTs from this contract
   */
  async isTransferRestricted() {
    const anyoneCanTransfer = await this.contractWrapper.readContract.hasRole(getRoleHash("transfer"), AddressZero);
    return !anyoneCanTransfer;
  }
  /**
   * Construct a claim transaction without executing it.
   * This is useful for estimating the gas cost of a claim transaction, overriding transaction options and having fine grained control over the transaction execution.
   * @param destinationAddress - Address you want to send the token to
   * @param tokenId - Id of the token you want to claim
   * @param quantity - Quantity of the tokens you want to claim
   * @param checkERC20Allowance - Optional, check if the wallet has enough ERC20 allowance to claim the tokens, and if not, approve the transfer
   * @param claimData - Optional claim verification data (e.g. price, allowlist proof, etc...)
   *
   * @deprecated Use `contract.erc1155.claim.prepare(...args)` instead
   */
  async getClaimTransaction(destinationAddress, tokenId, quantity) {
    let checkERC20Allowance = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
    return this.erc1155.getClaimTransaction(destinationAddress, tokenId, quantity, {
      checkERC20Allowance
    });
  }
  /**
   * @internal
   */
  async prepare(method, args, overrides) {
    return Transaction.fromContractWrapper({
      contractWrapper: this.contractWrapper,
      method,
      args,
      overrides
    });
  }
  /**
   * @internal
   */
  async call(functionName, args, overrides) {
    return this.contractWrapper.call(functionName, args, overrides);
  }
}
_defineProperty(EditionDrop, "contractRoles", ["admin", "minter", "transfer"]);
export {
  EditionDrop
};
