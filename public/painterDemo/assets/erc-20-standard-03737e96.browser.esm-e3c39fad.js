import { aZ as _defineProperty, a$ as buildTransactionFunction, c8 as Erc20 } from "./index-0d430626.js";
class StandardErc20 {
  get chainId() {
    return this._chainId;
  }
  constructor(contractWrapper, storage, chainId) {
    _defineProperty(this, "contractWrapper", void 0);
    _defineProperty(this, "storage", void 0);
    _defineProperty(this, "erc20", void 0);
    _defineProperty(this, "_chainId", void 0);
    _defineProperty(this, "transfer", buildTransactionFunction(async (to, amount) => {
      return this.erc20.transfer.prepare(to, amount);
    }));
    _defineProperty(this, "transferFrom", buildTransactionFunction(async (from, to, amount) => {
      return this.erc20.transferFrom.prepare(from, to, amount);
    }));
    _defineProperty(this, "setAllowance", buildTransactionFunction(async (spender, amount) => {
      return this.erc20.setAllowance.prepare(spender, amount);
    }));
    _defineProperty(this, "transferBatch", buildTransactionFunction(async (args) => {
      return this.erc20.transferBatch.prepare(args);
    }));
    this.contractWrapper = contractWrapper;
    this.storage = storage;
    this.erc20 = new Erc20(this.contractWrapper, this.storage, chainId);
    this._chainId = chainId;
  }
  /**
   * @internal
   */
  onNetworkUpdated(network) {
    this.contractWrapper.updateSignerOrProvider(network);
  }
  /**
   * @internal
   */
  getAddress() {
    return this.contractWrapper.readContract.address;
  }
  /** ******************************
   * READ FUNCTIONS
   *******************************/
  /**
   * Get the token Metadata (name, symbol, etc...)
   *
   * @example
   * ```javascript
   * const token = await contract.get();
   * ```
   * @returns The token metadata
   */
  async get() {
    return this.erc20.get();
  }
  /**
   * Get Token Balance for the currently connected wallet
   *
   * @remarks Get a wallets token balance.
   *
   * @example
   * ```javascript
   * const balance = await contract.balance();
   * ```
   *
   * @returns The balance of a specific wallet.
   */
  async balance() {
    return await this.erc20.balance();
  }
  /**
   * Get Token Balance
   *
   * @remarks Get a wallets token balance.
   *
   * @example
   * ```javascript
   * // Address of the wallet to check token balance
   * const walletAddress = "{{wallet_address}}";
   * const balance = await contract.balanceOf(walletAddress);
   * ```
   *
   * @returns The balance of a specific wallet.
   */
  async balanceOf(address) {
    return this.erc20.balanceOf(address);
  }
  /**
   * The total supply for this token
   * @remarks Get how much supply has been minted
   * @example
   * ```javascript
   * const balance = await contract.totalSupply();
   * ```
   */
  async totalSupply() {
    return await this.erc20.totalSupply();
  }
  /**
   * Get Token Allowance
   *
   * @remarks Get the allowance of a 'spender' wallet over the connected wallet's funds - the allowance of a different address for a token is the amount of tokens that the `spender` wallet is allowed to spend on behalf of the connected wallet.
   *
   * @example
   * ```javascript
   * // Address of the wallet to check token allowance
   * const spenderAddress = "0x...";
   * const allowance = await contract.allowance(spenderAddress);
   * ```
   *
   * @returns The allowance of one wallet over anothers funds.
   */
  async allowance(spender) {
    return await this.erc20.allowance(spender);
  }
  /**
   * Get Token Allowance
   *
   * @remarks Get the allowance of one wallet over another wallet's funds - the allowance of a different address for a token is the amount of tokens that the wallet is allowed to spend on behalf of the specified wallet.
   *
   * @example
   * ```javascript
   * // Address of the wallet who owns the funds
   * const owner = "{{wallet_address}}";
   * // Address of the wallet to check token allowance
   * const spender = "0x...";
   * const allowance = await contract.allowanceOf(owner, spender);
   * ```
   *
   * @returns The allowance of one wallet over anothers funds.
   */
  async allowanceOf(owner, spender) {
    return await this.erc20.allowanceOf(owner, spender);
  }
}
export {
  StandardErc20 as S
};
