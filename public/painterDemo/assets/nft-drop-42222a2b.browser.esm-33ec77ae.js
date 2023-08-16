import { a_ as ContractWrapper, aZ as _defineProperty, a$ as buildTransactionFunction, b0 as AbiSchema, b1 as ContractMetadata, bX as DropErc721ContractSchema, b3 as ContractAppURI, b4 as ContractRoles, b5 as ContractRoyalty, b6 as ContractPrimarySale, bY as DropClaimConditions, b9 as ContractEncoder, ba as GasCostEstimator, b8 as ContractEvents, bb as ContractPlatformFee, bZ as DelayedReveal, b_ as FEATURE_NFT_REVEALABLE, bc as ContractInterceptor, bd as ContractOwner, t as BigNumber, bJ as DEFAULT_QUERY_ALL_COUNT, be as getRoleHash, y as AddressZero, bf as Transaction } from "./index-0d430626.js";
import { S as StandardErc721 } from "./erc-721-standard-b90faf4d.browser.esm-d2de6de7.js";
import { P as PaperCheckout } from "./thirdweb-checkout-7100edf9.browser.esm-420c3924.js";
class NFTDrop extends StandardErc721 {
  /**
   * @internal
   */
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
   * Configure claim conditions
   * @remarks Define who can claim NFTs in the collection, when and how many.
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
   * await contract.claimConditions.set(claimConditions);
   * ```
   */
  /**
   * Delayed reveal
   * @remarks Create a batch of encrypted NFTs that can be revealed at a later time.
   * @example
   * ```javascript
   * // the real NFTs, these will be encrypted until you reveal them
   * const realNFTs = [{
   *   name: "Common NFT #1",
   *   description: "Common NFT, one of many.",
   *   image: fs.readFileSync("path/to/image.png"),
   * }, {
   *   name: "Super Rare NFT #2",
   *   description: "You got a Super Rare NFT!",
   *   image: fs.readFileSync("path/to/image.png"),
   * }];
   * // A placeholder NFT that people will get immediately in their wallet, and will be converted to the real NFT at reveal time
   * const placeholderNFT = {
   *   name: "Hidden NFT",
   *   description: "Will be revealed next week!"
   * };
   * // Create and encrypt the NFTs
   * await contract.revealer.createDelayedRevealBatch(
   *   placeholderNFT,
   *   realNFTs,
   *   "my secret password",
   * );
   * // Whenever you're ready, reveal your NFTs at any time
   * const batchId = 0; // the batch to reveal
   * await contract.revealer.reveal(batchId, "my secret password");
   * ```
   */
  /**
   * Checkout
   * @remarks Create a FIAT currency checkout for your NFT drop.
   */
  constructor(network, address, storage) {
    var _this;
    let _options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    let abi = arguments.length > 4 ? arguments[4] : void 0;
    let chainId = arguments.length > 5 ? arguments[5] : void 0;
    let contractWrapper = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : new ContractWrapper(network, address, abi, _options);
    super(contractWrapper, storage, chainId);
    _this = this;
    _defineProperty(this, "abi", void 0);
    _defineProperty(this, "encoder", void 0);
    _defineProperty(this, "estimator", void 0);
    _defineProperty(this, "metadata", void 0);
    _defineProperty(this, "app", void 0);
    _defineProperty(this, "sales", void 0);
    _defineProperty(this, "platformFees", void 0);
    _defineProperty(this, "events", void 0);
    _defineProperty(this, "roles", void 0);
    _defineProperty(this, "interceptor", void 0);
    _defineProperty(this, "royalties", void 0);
    _defineProperty(this, "claimConditions", void 0);
    _defineProperty(this, "revealer", void 0);
    _defineProperty(this, "checkout", void 0);
    _defineProperty(this, "owner", void 0);
    _defineProperty(this, "createBatch", buildTransactionFunction(async (metadatas, options) => {
      return this.erc721.lazyMint.prepare(metadatas, options);
    }));
    _defineProperty(this, "claimTo", buildTransactionFunction(async function(destinationAddress, quantity) {
      let checkERC20Allowance = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
      return _this.erc721.claimTo.prepare(destinationAddress, quantity, {
        checkERC20Allowance
      });
    }));
    _defineProperty(this, "claim", buildTransactionFunction(async function(quantity) {
      let checkERC20Allowance = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      return _this.claimTo.prepare(await _this.contractWrapper.getSignerAddress(), quantity, checkERC20Allowance);
    }));
    _defineProperty(this, "burn", buildTransactionFunction(async (tokenId) => {
      return this.erc721.burn.prepare(tokenId);
    }));
    _defineProperty(this, "transfer", buildTransactionFunction(async (to, tokenId) => {
      return this.erc721.transfer.prepare(to, tokenId);
    }));
    _defineProperty(this, "setApprovalForAll", buildTransactionFunction(async (operator, approved) => {
      return this.erc721.setApprovalForAll.prepare(operator, approved);
    }));
    _defineProperty(this, "setApprovalForToken", buildTransactionFunction(async (operator, tokenId) => {
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "approve",
        args: [operator, tokenId]
      });
    }));
    this.abi = AbiSchema.parse(abi || []);
    this.metadata = new ContractMetadata(this.contractWrapper, DropErc721ContractSchema, this.storage);
    this.app = new ContractAppURI(this.contractWrapper, this.metadata, this.storage);
    this.roles = new ContractRoles(this.contractWrapper, NFTDrop.contractRoles);
    this.royalties = new ContractRoyalty(this.contractWrapper, this.metadata);
    this.sales = new ContractPrimarySale(this.contractWrapper);
    this.claimConditions = new DropClaimConditions(this.contractWrapper, this.metadata, this.storage);
    this.encoder = new ContractEncoder(this.contractWrapper);
    this.estimator = new GasCostEstimator(this.contractWrapper);
    this.events = new ContractEvents(this.contractWrapper);
    this.platformFees = new ContractPlatformFee(this.contractWrapper);
    this.revealer = new DelayedReveal(this.contractWrapper, this.storage, FEATURE_NFT_REVEALABLE.name, () => this.erc721.nextTokenIdToMint());
    this.interceptor = new ContractInterceptor(this.contractWrapper);
    this.owner = new ContractOwner(this.contractWrapper);
    this.checkout = new PaperCheckout(this.contractWrapper);
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
   * Get the total count NFTs in this drop contract, both claimed and unclaimed
   */
  async totalSupply() {
    const claimed = await this.totalClaimedSupply();
    const unclaimed = await this.totalUnclaimedSupply();
    return claimed.add(unclaimed);
  }
  /**
   * Get All Claimed NFTs
   *
   * @remarks Fetch all the NFTs (and their owners) that have been claimed in this Drop.
   *
   * * @example
   * ```javascript
   * const claimedNFTs = await contract.getAllClaimed();
   * const firstOwner = claimedNFTs[0].owner;
   * ```
   *
   * @param queryParams - optional filtering to only fetch a subset of results.
   * @returns The NFT metadata and their ownersfor all NFTs queried.
   */
  async getAllClaimed(queryParams) {
    const start = BigNumber.from(queryParams?.start || 0).toNumber();
    const count = BigNumber.from(queryParams?.count || DEFAULT_QUERY_ALL_COUNT).toNumber();
    const maxId = Math.min((await this.contractWrapper.readContract.nextTokenIdToClaim()).toNumber(), start + count);
    return await Promise.all(Array.from(Array(maxId).keys()).map((i) => this.get(i.toString())));
  }
  /**
   * Get All Unclaimed NFTs
   *
   * @remarks Fetch all the NFTs that have been not been claimed yet in this Drop.
   *
   * * @example
   * ```javascript
   * const unclaimedNFTs = await contract.getAllUnclaimed();
   * const firstUnclaimedNFT = unclaimedNFTs[0].name;
   * ```
   *
   * @param queryParams - optional filtering to only fetch a subset of results.
   * @returns The NFT metadata for all NFTs queried.
   */
  async getAllUnclaimed(queryParams) {
    const start = BigNumber.from(queryParams?.start || 0).toNumber();
    const count = BigNumber.from(queryParams?.count || DEFAULT_QUERY_ALL_COUNT).toNumber();
    const firstTokenId = BigNumber.from(Math.max((await this.contractWrapper.readContract.nextTokenIdToClaim()).toNumber(), start));
    const maxId = BigNumber.from(Math.min((await this.contractWrapper.readContract.nextTokenIdToMint()).toNumber(), firstTokenId.toNumber() + count));
    return await Promise.all(Array.from(Array(maxId.sub(firstTokenId).toNumber()).keys()).map((i) => this.erc721.getTokenMetadata(firstTokenId.add(i).toString())));
  }
  /**
   * Get the claimed supply
   *
   * @remarks Get the number of claimed NFTs in this Drop.
   *
   * * @example
   * ```javascript
   * const claimedNFTCount = await contract.totalClaimedSupply();
   * console.log(`NFTs claimed so far: ${claimedNFTCount}`);
   * ```
   * @returns the unclaimed supply
   */
  async totalClaimedSupply() {
    return this.erc721.totalClaimedSupply();
  }
  /**
   * Get the unclaimed supply
   *
   * @remarks Get the number of unclaimed NFTs in this Drop.
   *
   * * @example
   * ```javascript
   * const unclaimedNFTCount = await contract.totalUnclaimedSupply();
   * console.log(`NFTs left to claim: ${unclaimedNFTCount}`);
   * ```
   * @returns the unclaimed supply
   */
  async totalUnclaimedSupply() {
    return this.erc721.totalUnclaimedSupply();
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
   * @param destinationAddress
   * @param quantity
   * @param checkERC20Allowance
   *
   * @deprecated Use `contract.erc721.claim.prepare(...args)` instead
   */
  async getClaimTransaction(destinationAddress, quantity) {
    let checkERC20Allowance = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    return this.erc721.getClaimTransaction(destinationAddress, quantity, {
      checkERC20Allowance
    });
  }
  /******************************
   * STANDARD ERC721 FUNCTIONS
   ******************************/
  /**
   * Get a single NFT
   *
   * @example
   * ```javascript
   * const tokenId = 0;
   * const nft = await contract.get(tokenId);
   * ```
   * @param tokenId - the tokenId of the NFT to retrieve
   * @returns The NFT metadata
   */
  async get(tokenId) {
    return this.erc721.get(tokenId);
  }
  /**
   * Get the current owner of a given NFT within this Contract
   *
   * @param tokenId - the tokenId of the NFT
   * @returns the address of the owner
   */
  async ownerOf(tokenId) {
    return this.erc721.ownerOf(tokenId);
  }
  /**
   * Get NFT Balance
   *
   * @remarks Get a wallets NFT balance (number of NFTs in this contract owned by the wallet).
   *
   * @example
   * ```javascript
   * const walletAddress = "{{wallet_address}}";
   * const balance = await contract.balanceOf(walletAddress);
   * console.log(balance);
   * ```
   */
  async balanceOf(address) {
    return this.erc721.balanceOf(address);
  }
  /**
   * Get NFT Balance for the currently connected wallet
   */
  async balance() {
    return this.erc721.balance();
  }
  /**
   * Get whether this wallet has approved transfers from the given operator
   * @param address - the wallet address
   * @param operator - the operator address
   */
  async isApproved(address, operator) {
    return this.erc721.isApproved(address, operator);
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
  /** ******************************
   * PRIVATE FUNCTIONS
   *******************************/
  /**
   * @internal
   */
  async call(functionName, args, overrides) {
    return this.contractWrapper.call(functionName, args, overrides);
  }
}
_defineProperty(NFTDrop, "contractRoles", ["admin", "minter", "transfer"]);
export {
  NFTDrop
};
