import { aZ as _defineProperty, y as AddressZero, t as BigNumber, bt as fetchCurrencyValue, a_ as ContractWrapper, a$ as buildTransactionFunction, b0 as AbiSchema, b1 as ContractMetadata, ce as TokenErc20ContractSchema, b3 as ContractAppURI, b4 as ContractRoles, b6 as ContractPrimarySale, b8 as ContractEvents, b9 as ContractEncoder, ba as GasCostEstimator, bb as ContractPlatformFee, bc as ContractInterceptor, cf as Erc20SignatureMintable, bj as resolveAddress, be as getRoleHash, bf as Transaction } from "./index-0d430626.js";
import { S as StandardErc20 } from "./erc-20-standard-03737e96.browser.esm-e3c39fad.js";
class TokenERC20History {
  constructor(contractWrapper, events) {
    _defineProperty(this, "events", void 0);
    _defineProperty(this, "contractWrapper", void 0);
    this.contractWrapper = contractWrapper;
    this.events = events;
  }
  /**
   * Get all holder balances
   *
   * @remarks Lets you get all token holders and their corresponding balances
   * @returns - A JSON object of all token holders and their corresponding balances
   * @example
   * ```javascript
   * const allHolderBalances = await contract.history.getAllHolderBalances();
   * ```
   */
  async getAllHolderBalances() {
    const a = await this.events.getEvents("Transfer");
    const txns = a.map((b) => b.data);
    const balances = {};
    txns.forEach((item) => {
      const from = item?.from;
      const to = item?.to;
      const amount = item?.value;
      if (!(from === AddressZero)) {
        if (!(from in balances)) {
          balances[from] = BigNumber.from(0);
        }
        balances[from] = balances[from].sub(amount);
      }
      if (!(to === AddressZero)) {
        if (!(to in balances)) {
          balances[to] = BigNumber.from(0);
        }
        balances[to] = balances[to].add(amount);
      }
    });
    return Promise.all(Object.keys(balances).map(async (addr) => ({
      holder: addr,
      balance: await fetchCurrencyValue(this.contractWrapper.getProvider(), this.contractWrapper.readContract.address, balances[addr])
    })));
  }
}
class Token extends StandardErc20 {
  /**
   * Signature Minting
   * @remarks Generate tokens that can be minted only with your own signature, attaching your own set of mint conditions.
   * @example
   * ```javascript
   * // see how to craft a payload to sign in the `contract.signature.generate()` documentation
   * const signedPayload = contract.signature.generate(payload);
   *
   * // now anyone can mint the tokens
   * const tx = contract.signature.mint(signedPayload);
   * const receipt = tx.receipt; // the mint transaction receipt
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
    _defineProperty(this, "history", void 0);
    _defineProperty(this, "events", void 0);
    _defineProperty(this, "platformFees", void 0);
    _defineProperty(this, "sales", void 0);
    _defineProperty(this, "signature", void 0);
    _defineProperty(this, "interceptor", void 0);
    _defineProperty(this, "mint", buildTransactionFunction(async (amount) => {
      return this.erc20.mint.prepare(amount);
    }));
    _defineProperty(this, "mintTo", buildTransactionFunction(async (to, amount) => {
      return this.erc20.mintTo.prepare(to, amount);
    }));
    _defineProperty(this, "mintBatchTo", buildTransactionFunction(async (args) => {
      return this.erc20.mintBatchTo.prepare(args);
    }));
    _defineProperty(this, "delegateTo", buildTransactionFunction(async (delegateeAddress) => {
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "delegate",
        args: [await resolveAddress(delegateeAddress)]
      });
    }));
    _defineProperty(this, "burn", buildTransactionFunction((amount) => {
      return this.erc20.burn.prepare(amount);
    }));
    _defineProperty(this, "burnFrom", buildTransactionFunction(async (holder, amount) => {
      return this.erc20.burnFrom.prepare(holder, amount);
    }));
    this.abi = AbiSchema.parse(abi || []);
    this.metadata = new ContractMetadata(this.contractWrapper, TokenErc20ContractSchema, this.storage);
    this.app = new ContractAppURI(this.contractWrapper, this.metadata, this.storage);
    this.roles = new ContractRoles(this.contractWrapper, Token.contractRoles);
    this.sales = new ContractPrimarySale(this.contractWrapper);
    this.events = new ContractEvents(this.contractWrapper);
    this.history = new TokenERC20History(this.contractWrapper, this.events);
    this.encoder = new ContractEncoder(this.contractWrapper);
    this.estimator = new GasCostEstimator(this.contractWrapper);
    this.platformFees = new ContractPlatformFee(this.contractWrapper);
    this.interceptor = new ContractInterceptor(this.contractWrapper);
    this.signature = new Erc20SignatureMintable(this.contractWrapper, this.roles);
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
    return await this.erc20.getValue(await this.contractWrapper.readContract.getVotes(account));
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
   * Construct a mint transaction without executing it.
   * This is useful for estimating the gas cost of a mint transaction, overriding transaction options and having fine grained control over the transaction execution.
   * @param receiver - Address you want to send the token to
   * @param amount - The amount of tokens you want to mint
   *
   * @deprecated Use `contract.mint.prepare(...args)` instead
   */
  async getMintTransaction(to, amount) {
    return this.erc20.getMintTransaction(to, amount);
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
_defineProperty(Token, "contractRoles", ["admin", "minter", "transfer"]);
export {
  Token
};
