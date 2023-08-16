import { a_ as ContractWrapper, aZ as _defineProperty, a$ as buildTransactionFunction, b0 as AbiSchema, b1 as ContractMetadata, bg as TokenErc1155ContractSchema, b3 as ContractAppURI, b4 as ContractRoles, b5 as ContractRoyalty, b6 as ContractPrimarySale, b9 as ContractEncoder, ba as GasCostEstimator, b8 as ContractEvents, bb as ContractPlatformFee, bc as ContractInterceptor, bh as Erc1155SignatureMintable, bd as ContractOwner, be as getRoleHash, y as AddressZero, bf as Transaction } from "./index-0d430626.js";
import { S as StandardErc1155 } from "./erc-1155-standard-607e2724.browser.esm-5f46bd34.js";
class Edition extends StandardErc1155 {
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
   * Signature Minting
   * @remarks Generate dynamic NFTs with your own signature, and let others mint them using that signature.
   * @example
   * ```javascript
   * // see how to craft a payload to sign in the `contract.signature.generate()` documentation
   * const signedPayload = contract.signature.generate(payload);
   *
   * // now anyone can mint the NFT
   * const tx = contract.signature.mint(signedPayload);
   * const receipt = tx.receipt; // the mint transaction receipt
   * const mintedId = tx.id; // the id of the NFT minted
   * ```
   */
  constructor(network, address, storage) {
    let options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    let abi = arguments.length > 4 ? arguments[4] : void 0;
    let chainId = arguments.length > 5 ? arguments[5] : void 0;
    let contractWrapper = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : new ContractWrapper(network, address, abi, options);
    super(contractWrapper, storage, chainId);
    _defineProperty(this, "abi", void 0);
    _defineProperty(this, "metadata", void 0);
    _defineProperty(this, "app", void 0);
    _defineProperty(this, "roles", void 0);
    _defineProperty(this, "sales", void 0);
    _defineProperty(this, "platformFees", void 0);
    _defineProperty(this, "encoder", void 0);
    _defineProperty(this, "estimator", void 0);
    _defineProperty(this, "events", void 0);
    _defineProperty(this, "royalties", void 0);
    _defineProperty(this, "signature", void 0);
    _defineProperty(this, "interceptor", void 0);
    _defineProperty(this, "owner", void 0);
    _defineProperty(this, "mint", buildTransactionFunction(async (metadataWithSupply) => {
      return this.erc1155.mint.prepare(metadataWithSupply);
    }));
    _defineProperty(this, "mintTo", buildTransactionFunction(async (to, metadataWithSupply) => {
      return this.erc1155.mintTo.prepare(to, metadataWithSupply);
    }));
    _defineProperty(this, "mintAdditionalSupply", buildTransactionFunction(async (tokenId, additionalSupply) => {
      return this.erc1155.mintAdditionalSupply.prepare(tokenId, additionalSupply);
    }));
    _defineProperty(this, "mintAdditionalSupplyTo", buildTransactionFunction(async (to, tokenId, additionalSupply) => {
      return this.erc1155.mintAdditionalSupplyTo.prepare(to, tokenId, additionalSupply);
    }));
    _defineProperty(this, "mintBatch", buildTransactionFunction(async (metadatas) => {
      return this.erc1155.mintBatch.prepare(metadatas);
    }));
    _defineProperty(this, "mintBatchTo", buildTransactionFunction(async (to, metadataWithSupply) => {
      return this.erc1155.mintBatchTo.prepare(to, metadataWithSupply);
    }));
    _defineProperty(this, "burn", buildTransactionFunction(async (tokenId, amount) => {
      return this.erc1155.burn.prepare(tokenId, amount);
    }));
    this.abi = AbiSchema.parse(abi || []);
    this.metadata = new ContractMetadata(this.contractWrapper, TokenErc1155ContractSchema, this.storage);
    this.app = new ContractAppURI(this.contractWrapper, this.metadata, this.storage);
    this.roles = new ContractRoles(this.contractWrapper, Edition.contractRoles);
    this.royalties = new ContractRoyalty(this.contractWrapper, this.metadata);
    this.sales = new ContractPrimarySale(this.contractWrapper);
    this.encoder = new ContractEncoder(this.contractWrapper);
    this.estimator = new GasCostEstimator(this.contractWrapper);
    this.events = new ContractEvents(this.contractWrapper);
    this.platformFees = new ContractPlatformFee(this.contractWrapper);
    this.interceptor = new ContractInterceptor(this.contractWrapper);
    this.signature = new Erc1155SignatureMintable(this.contractWrapper, this.storage, this.roles);
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
   * Construct a mint transaction without executing it.
   * This is useful for estimating the gas cost of a mint transaction, overriding transaction options and having fine grained control over the transaction execution.
   * @param receiver - Address you want to send the token to
   * @param metadataWithSupply - The metadata of the NFT you want to mint
   *
   * @deprecated `contract.mint.prepare(...args)`
   */
  async getMintTransaction(receiver, metadataWithSupply) {
    return this.erc1155.getMintTransaction(receiver, metadataWithSupply);
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
_defineProperty(Edition, "contractRoles", ["admin", "minter", "transfer"]);
export {
  Edition
};
