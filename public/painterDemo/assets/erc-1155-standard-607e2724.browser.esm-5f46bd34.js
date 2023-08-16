import { aZ as _defineProperty, a$ as buildTransactionFunction, c9 as Erc1155 } from "./index-0d430626.js";
class StandardErc1155 {
  get chainId() {
    return this._chainId;
  }
  constructor(contractWrapper, storage, chainId) {
    var _this = this;
    _defineProperty(this, "contractWrapper", void 0);
    _defineProperty(this, "storage", void 0);
    _defineProperty(this, "erc1155", void 0);
    _defineProperty(this, "_chainId", void 0);
    _defineProperty(this, "transfer", buildTransactionFunction(async function(to, tokenId, amount) {
      let data = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : [0];
      return _this.erc1155.transfer.prepare(to, tokenId, amount, data);
    }));
    _defineProperty(this, "setApprovalForAll", buildTransactionFunction(async (operator, approved) => {
      return this.erc1155.setApprovalForAll.prepare(operator, approved);
    }));
    _defineProperty(this, "airdrop", buildTransactionFunction(async function(tokenId, addresses) {
      let data = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [0];
      return _this.erc1155.airdrop.prepare(tokenId, addresses, data);
    }));
    this.contractWrapper = contractWrapper;
    this.storage = storage;
    this.erc1155 = new Erc1155(this.contractWrapper, this.storage, chainId);
    this._chainId = chainId;
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
  ////// Standard ERC1155 functions //////
  /**
   * Get a single NFT
   *
   * @example
   * ```javascript
   * const nft = await contract.get("0");
   * ```
   * @param tokenId - the tokenId of the NFT to retrieve
   * @returns The NFT metadata
   */
  async get(tokenId) {
    return this.erc1155.get(tokenId);
  }
  /**
   * Returns the total supply of a specific token
   * @param tokenId - The token ID to get the total supply of
   * @returns the total supply
   */
  async totalSupply(tokenId) {
    return this.erc1155.totalSupply(tokenId);
  }
  /**
   * Get NFT Balance
   *
   * @remarks Get a wallets NFT balance (number of NFTs in this contract owned by the wallet).
   *
   * @example
   * ```javascript
   * // Address of the wallet to check NFT balance
   * const walletAddress = "{{wallet_address}}";
   * const tokenId = 0; // Id of the NFT to check
   * const balance = await contract.balanceOf(walletAddress, tokenId);
   * ```
   */
  async balanceOf(address, tokenId) {
    return this.erc1155.balanceOf(address, tokenId);
  }
  /**
   * Get NFT Balance for the currently connected wallet
   */
  async balance(tokenId) {
    return this.erc1155.balance(tokenId);
  }
  /**
   * Get whether this wallet has approved transfers from the given operator
   * @param address - the wallet address
   * @param operator - the operator address
   */
  async isApproved(address, operator) {
    return this.erc1155.isApproved(address, operator);
  }
}
export {
  StandardErc1155 as S
};
