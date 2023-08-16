import { a_ as ContractWrapper, aZ as _defineProperty, a$ as buildTransactionFunction, b0 as AbiSchema, b1 as ContractMetadata, cc as SplitsContractSchema, b3 as ContractAppURI, b4 as ContractRoles, b9 as ContractEncoder, ba as GasCostEstimator, b8 as ContractEvents, bc as ContractInterceptor, t as BigNumber, bj as resolveAddress, bw as Contract, ca as ERC20Abi, bt as fetchCurrencyValue, bf as Transaction } from "./index-0d430626.js";
class Split {
  /**
   * @internal
   */
  get chainId() {
    return this._chainId;
  }
  constructor(network, address, storage) {
    let options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    let abi = arguments.length > 4 ? arguments[4] : void 0;
    let chainId = arguments.length > 5 ? arguments[5] : void 0;
    let contractWrapper = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : new ContractWrapper(network, address, abi, options);
    _defineProperty(this, "contractWrapper", void 0);
    _defineProperty(this, "storage", void 0);
    _defineProperty(this, "abi", void 0);
    _defineProperty(this, "metadata", void 0);
    _defineProperty(this, "app", void 0);
    _defineProperty(this, "encoder", void 0);
    _defineProperty(this, "estimator", void 0);
    _defineProperty(this, "events", void 0);
    _defineProperty(this, "roles", void 0);
    _defineProperty(this, "interceptor", void 0);
    _defineProperty(this, "_chainId", void 0);
    _defineProperty(this, "withdraw", buildTransactionFunction(async (walletAddress) => {
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "release(address)",
        args: [await resolveAddress(walletAddress)]
      });
    }));
    _defineProperty(this, "withdrawToken", buildTransactionFunction(async (walletAddress, tokenAddress) => {
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "release(address,address)",
        args: [await resolveAddress(tokenAddress), await resolveAddress(walletAddress)]
      });
    }));
    _defineProperty(this, "distribute", buildTransactionFunction(async () => {
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "distribute()",
        args: []
      });
    }));
    _defineProperty(this, "distributeToken", buildTransactionFunction(async (tokenAddress) => {
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "distribute(address)",
        args: [await resolveAddress(tokenAddress)]
      });
    }));
    this._chainId = chainId;
    this.abi = AbiSchema.parse(abi || []);
    this.contractWrapper = contractWrapper;
    this.storage = storage;
    this.metadata = new ContractMetadata(this.contractWrapper, SplitsContractSchema, this.storage);
    this.app = new ContractAppURI(this.contractWrapper, this.metadata, this.storage);
    this.roles = new ContractRoles(this.contractWrapper, Split.contractRoles);
    this.encoder = new ContractEncoder(this.contractWrapper);
    this.estimator = new GasCostEstimator(this.contractWrapper);
    this.events = new ContractEvents(this.contractWrapper);
    this.interceptor = new ContractInterceptor(this.contractWrapper);
  }
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
   * Get Recipients of this splits contract
   *
   * @remarks Get the data about the shares of every split recipient on the contract
   *
   * @example
   * ```javascript
   * const recipients = await contract.getAllRecipients();
   * console.log(recipients);
   * ```
   */
  async getAllRecipients() {
    const recipients = [];
    let index = BigNumber.from(0);
    const totalRecipients = await this.contractWrapper.readContract.payeeCount();
    while (index.lt(totalRecipients)) {
      try {
        const recipientAddress = await this.contractWrapper.readContract.payee(index);
        recipients.push(await this.getRecipientSplitPercentage(recipientAddress));
        index = index.add(1);
      } catch (err) {
        if ("method" in err && err["method"].toLowerCase().includes("payee(uint256)")) {
          break;
        } else {
          throw err;
        }
      }
    }
    return recipients;
  }
  /**
   * Returns all the recipients and their balances in the native currency.
   *
   * @returns A map of recipient addresses to their balances in the native currency.
   */
  async balanceOfAllRecipients() {
    const recipients = await this.getAllRecipients();
    const balances = {};
    for (const recipient of recipients) {
      balances[recipient.address] = await this.balanceOf(recipient.address);
    }
    return balances;
  }
  /**
   * Returns all the recipients and their balances in a non-native currency.
   *
   * @param tokenAddress - The address of the currency to check the balances in.
   * @returns A map of recipient addresses to their balances in the specified currency.
   */
  async balanceOfTokenAllRecipients(tokenAddress) {
    const resolvedToken = await resolveAddress(tokenAddress);
    const recipients = await this.getAllRecipients();
    const balances = {};
    for (const recipient of recipients) {
      balances[recipient.address] = await this.balanceOfToken(recipient.address, resolvedToken);
    }
    return balances;
  }
  /**
   * Get Funds owed to a particular wallet
   *
   * @remarks Get the amount of funds in the native currency held by the contract that is owed to a specific recipient.
   *
   * @example
   * ```javascript
   * // The address to check the funds of
   * const address = "{{wallet_address}}";
   * const funds = await contract.balanceOf(address);
   * console.log(funds);
   * ```
   */
  async balanceOf(address) {
    const resolvedAddress = await resolveAddress(address);
    const walletBalance = await this.contractWrapper.readContract.provider.getBalance(this.getAddress());
    const totalReleased = await this.contractWrapper.readContract["totalReleased()"]();
    const totalReceived = walletBalance.add(totalReleased);
    return this._pendingPayment(resolvedAddress, totalReceived, await this.contractWrapper.readContract["released(address)"](resolvedAddress));
  }
  /**
   * Get non-native Token Funds owed to a particular wallet
   *
   * @remarks Get the amount of funds in the non-native tokens held by the contract that is owed to a specific recipient.
   *
   * @example
   * ```javascript
   * // The address to check the funds of
   * const address = "{{wallet_address}}";
   * // The address of the currency to check the contracts funds of
   * const tokenAddress = "0x..."
   * const funds = await contract.balanceOfToken(address, tokenAddress);
   * console.log(funds);
   * ```
   */
  async balanceOfToken(walletAddress, tokenAddress) {
    const resolvedToken = await resolveAddress(tokenAddress);
    const resolvedWallet = await resolveAddress(walletAddress);
    const erc20 = new Contract(resolvedToken, ERC20Abi, this.contractWrapper.getProvider());
    const walletBalance = await erc20.balanceOf(this.getAddress());
    const totalReleased = await this.contractWrapper.readContract["totalReleased(address)"](resolvedToken);
    const totalReceived = walletBalance.add(totalReleased);
    const value = await this._pendingPayment(resolvedWallet, totalReceived, await this.contractWrapper.readContract["released(address,address)"](resolvedToken, resolvedWallet));
    return await fetchCurrencyValue(this.contractWrapper.getProvider(), resolvedToken, value);
  }
  /**
   * Get the % of funds owed to a given address
   * @param address - the address to check percentage of
   */
  async getRecipientSplitPercentage(address) {
    const resolvedAddress = await resolveAddress(address);
    const [totalShares, walletsShares] = await Promise.all([this.contractWrapper.readContract.totalShares(), this.contractWrapper.readContract.shares(address)]);
    return {
      address: resolvedAddress,
      splitPercentage: walletsShares.mul(BigNumber.from(1e7)).div(totalShares).toNumber() / 1e5
    };
  }
  /** ******************************
   * PRIVATE FUNCTIONS
   *******************************/
  async _pendingPayment(address, totalReceived, alreadyReleased) {
    const addressReceived = totalReceived.mul(await this.contractWrapper.readContract.shares(await resolveAddress(address)));
    const totalRoyaltyAvailable = addressReceived.div(await this.contractWrapper.readContract.totalShares());
    return totalRoyaltyAvailable.sub(alreadyReleased);
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
_defineProperty(Split, "contractRoles", ["admin"]);
export {
  Split
};
