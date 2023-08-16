import { a_ as ContractWrapper, aZ as _defineProperty, a$ as buildTransactionFunction, b0 as AbiSchema, b1 as ContractMetadata, cd as DropErc20ContractSchema, b3 as ContractAppURI, b4 as ContractRoles, b9 as ContractEncoder, ba as GasCostEstimator, b8 as ContractEvents, b6 as ContractPrimarySale, bb as ContractPlatformFee, bc as ContractInterceptor, bY as DropClaimConditions, bj as resolveAddress, be as getRoleHash, y as AddressZero, bf as Transaction } from "./index-0d430626.js";
import { S as StandardErc20 } from "./erc-20-standard-03737e96.browser.esm-e3c39fad.js";
class TokenDrop extends StandardErc20 {
  /**
   * Configure claim conditions
   * @remarks Define who can claim Tokens, when and how many.
   * @example
   * ```javascript
   * const presaleStartTime = new Date();
   * const publicSaleStartTime = new Date(Date.now() + 60 * 60 * 24 * 1000);
   * const claimConditions = [
   *   {
   *     startTime: presaleStartTime, // start the presale now
   *     maxQuantity: 3117.42, // limit how many tokens are released in this presale
   *     price: 0.001, // presale price per token
   *     snapshot: ['0x...', '0x...'], // limit claiming to only certain addresses
   *   },
   *   {
   *     startTime: publicSaleStartTime, // 24h after presale, start public sale
   *     price: 0.008, // public sale price per token
   *   }
   * ]);
   * await contract.claimConditions.set(claimConditions);
   * ```
   */
  /**
   * @internal
   */
  constructor(network, address, storage) {
    var _this;
    let options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    let abi = arguments.length > 4 ? arguments[4] : void 0;
    let chainId = arguments.length > 5 ? arguments[5] : void 0;
    let contractWrapper = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : new ContractWrapper(network, address, abi, options);
    super(contractWrapper, storage, chainId);
    _this = this;
    _defineProperty(this, "abi", void 0);
    _defineProperty(this, "metadata", void 0);
    _defineProperty(this, "app", void 0);
    _defineProperty(this, "roles", void 0);
    _defineProperty(this, "encoder", void 0);
    _defineProperty(this, "estimator", void 0);
    _defineProperty(this, "sales", void 0);
    _defineProperty(this, "platformFees", void 0);
    _defineProperty(this, "events", void 0);
    _defineProperty(this, "claimConditions", void 0);
    _defineProperty(this, "interceptor", void 0);
    _defineProperty(this, "claim", buildTransactionFunction(async function(amount) {
      let checkERC20Allowance = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      return _this.claimTo.prepare(await _this.contractWrapper.getSignerAddress(), amount, checkERC20Allowance);
    }));
    _defineProperty(this, "claimTo", buildTransactionFunction(async function(destinationAddress, amount) {
      let checkERC20Allowance = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
      return _this.erc20.claimTo.prepare(destinationAddress, amount, {
        checkERC20Allowance
      });
    }));
    _defineProperty(this, "delegateTo", buildTransactionFunction(async (delegateeAddress) => {
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "delegate",
        args: [await resolveAddress(delegateeAddress)]
      });
    }));
    _defineProperty(this, "burnTokens", buildTransactionFunction(async (amount) => {
      return this.erc20.burn.prepare(amount);
    }));
    _defineProperty(this, "burnFrom", buildTransactionFunction(async (holder, amount) => {
      return this.erc20.burnFrom.prepare(holder, amount);
    }));
    this.abi = AbiSchema.parse(abi || []);
    this.metadata = new ContractMetadata(this.contractWrapper, DropErc20ContractSchema, this.storage);
    this.app = new ContractAppURI(this.contractWrapper, this.metadata, this.storage);
    this.roles = new ContractRoles(this.contractWrapper, TokenDrop.contractRoles);
    this.encoder = new ContractEncoder(this.contractWrapper);
    this.estimator = new GasCostEstimator(this.contractWrapper);
    this.events = new ContractEvents(this.contractWrapper);
    this.sales = new ContractPrimarySale(this.contractWrapper);
    this.platformFees = new ContractPlatformFee(this.contractWrapper);
    this.interceptor = new ContractInterceptor(this.contractWrapper);
    this.claimConditions = new DropClaimConditions(this.contractWrapper, this.metadata, this.storage);
  }
  /** ******************************
   * READ FUNCTIONS
   *******************************/
  /**
   * Get your wallet voting power for the current checkpoints
   *
   * @returns the amount of voting power in tokens
   */
  async getVoteBalance() {
    return await this.getVoteBalanceOf(await this.contractWrapper.getSignerAddress());
  }
  async getVoteBalanceOf(account) {
    return await this.erc20.getValue(await this.contractWrapper.readContract.getVotes(await resolveAddress(account)));
  }
  /**
   * Get your voting delegatee address
   *
   * @returns the address of your vote delegatee
   */
  async getDelegation() {
    return await this.getDelegationOf(await this.contractWrapper.getSignerAddress());
  }
  /**
   * Get a specific address voting delegatee address
   *
   * @returns the address of your vote delegatee
   */
  async getDelegationOf(account) {
    return await this.contractWrapper.readContract.delegates(await resolveAddress(account));
  }
  /**
   * Get whether users can transfer tokens from this contract
   */
  async isTransferRestricted() {
    const anyoneCanTransfer = await this.contractWrapper.readContract.hasRole(getRoleHash("transfer"), AddressZero);
    return !anyoneCanTransfer;
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
_defineProperty(TokenDrop, "contractRoles", ["admin", "transfer"]);
export {
  TokenDrop
};
