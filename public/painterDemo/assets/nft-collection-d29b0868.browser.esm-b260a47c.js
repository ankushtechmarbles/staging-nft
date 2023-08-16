import { a_ as ContractWrapper, aZ as _defineProperty, a$ as buildTransactionFunction, b0 as AbiSchema, b1 as ContractMetadata, bV as TokenErc721ContractSchema, b3 as ContractAppURI, b4 as ContractRoles, b5 as ContractRoyalty, b6 as ContractPrimarySale, b9 as ContractEncoder, ba as GasCostEstimator, b8 as ContractEvents, bb as ContractPlatformFee, bc as ContractInterceptor, bW as Erc721WithQuantitySignatureMintable, bd as ContractOwner, be as getRoleHash, y as AddressZero, bf as Transaction } from "./index-0d430626.js";
import { S as StandardErc721 } from "./erc-721-standard-b90faf4d.browser.esm-d2de6de7.js";
class NFTCollection extends StandardErc721 {
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
   * const signedPayload = contract.signature().generate(payload);
   *
   * // now anyone can mint the NFT
   * const tx = contract.signature.mint(signedPayload);
   * const receipt = tx.receipt; // the mint transaction receipt
   * const mintedId = tx.id; // the id of the NFT minted
   * ```
   */
  /**
   * @internal
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
    _defineProperty(this, "encoder", void 0);
    _defineProperty(this, "estimator", void 0);
    _defineProperty(this, "events", void 0);
    _defineProperty(this, "sales", void 0);
    _defineProperty(this, "platformFees", void 0);
    _defineProperty(this, "royalties", void 0);
    _defineProperty(this, "owner", void 0);
    _defineProperty(this, "signature", void 0);
    _defineProperty(this, "interceptor", void 0);
    _defineProperty(this, "mint", buildTransactionFunction(async (metadata) => {
      return this.erc721.mint.prepare(metadata);
    }));
    _defineProperty(this, "mintTo", buildTransactionFunction(async (walletAddress, metadata) => {
      return this.erc721.mintTo.prepare(walletAddress, metadata);
    }));
    _defineProperty(this, "mintBatch", buildTransactionFunction(async (metadata) => {
      return this.erc721.mintBatch.prepare(metadata);
    }));
    _defineProperty(this, "mintBatchTo", buildTransactionFunction(async (walletAddress, metadata) => {
      return this.erc721.mintBatchTo.prepare(walletAddress, metadata);
    }));
    _defineProperty(this, "burn", buildTransactionFunction((tokenId) => {
      return this.erc721.burn.prepare(tokenId);
    }));
    this.abi = AbiSchema.parse(abi || []);
    this.metadata = new ContractMetadata(this.contractWrapper, TokenErc721ContractSchema, this.storage);
    this.app = new ContractAppURI(this.contractWrapper, this.metadata, this.storage);
    this.roles = new ContractRoles(this.contractWrapper, NFTCollection.contractRoles);
    this.royalties = new ContractRoyalty(this.contractWrapper, this.metadata);
    this.sales = new ContractPrimarySale(this.contractWrapper);
    this.encoder = new ContractEncoder(this.contractWrapper);
    this.estimator = new GasCostEstimator(this.contractWrapper);
    this.events = new ContractEvents(this.contractWrapper);
    this.platformFees = new ContractPlatformFee(this.contractWrapper);
    this.interceptor = new ContractInterceptor(this.contractWrapper);
    this.signature = new Erc721WithQuantitySignatureMintable(this.contractWrapper, this.storage);
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
   * @param metadata - The metadata of the NFT you want to mint
   *
   * @deprecated Use `contract.mint.prepare(...args)` instead
   */
  async getMintTransaction(receiver, metadata) {
    return this.erc721.getMintTransaction(receiver, metadata);
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
_defineProperty(NFTCollection, "contractRoles", ["admin", "minter", "transfer"]);
export {
  NFTCollection
};
