import { a_ as ContractWrapper, aZ as _defineProperty, a$ as buildTransactionFunction, b0 as AbiSchema, b1 as ContractMetadata, bT as MultiwrapContractSchema, b3 as ContractAppURI, b4 as ContractRoles, b9 as ContractEncoder, ba as GasCostEstimator, b8 as ContractEvents, b5 as ContractRoyalty, bd as ContractOwner, bC as fetchCurrencyMetadata, bD as formatUnits, bl as normalizePriceValue, bv as isTokenApprovedForTransfer, bf as Transaction, bU as uploadOrExtractURI, bj as resolveAddress } from "./index-0d430626.js";
import { S as StandardErc721 } from "./erc-721-standard-b90faf4d.browser.esm-d2de6de7.js";
import { h as hasERC20Allowance } from "./hasERC20Allowance-59b9da80.browser.esm-ad7dc89a.js";
class Multiwrap extends StandardErc721 {
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
  constructor(network, address, storage) {
    let options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    let abi = arguments.length > 4 ? arguments[4] : void 0;
    let chainId = arguments.length > 5 ? arguments[5] : void 0;
    let contractWrapper = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : new ContractWrapper(network, address, abi, options);
    super(contractWrapper, storage, chainId);
    _defineProperty(this, "abi", void 0);
    _defineProperty(this, "encoder", void 0);
    _defineProperty(this, "estimator", void 0);
    _defineProperty(this, "metadata", void 0);
    _defineProperty(this, "app", void 0);
    _defineProperty(this, "events", void 0);
    _defineProperty(this, "roles", void 0);
    _defineProperty(this, "royalties", void 0);
    _defineProperty(this, "owner", void 0);
    _defineProperty(this, "wrap", buildTransactionFunction(async (contents, wrappedTokenMetadata, recipientAddress) => {
      const uri = await uploadOrExtractURI(wrappedTokenMetadata, this.storage);
      const recipient = await resolveAddress(recipientAddress ? recipientAddress : await this.contractWrapper.getSignerAddress());
      const tokens = await this.toTokenStructList(contents);
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "wrap",
        args: [tokens, uri, recipient],
        parse: (receipt) => {
          const event = this.contractWrapper.parseLogs("TokensWrapped", receipt?.logs);
          if (event.length === 0) {
            throw new Error("TokensWrapped event not found");
          }
          const tokenId = event[0].args.tokenIdOfWrappedToken;
          return {
            id: tokenId,
            receipt,
            data: () => this.get(tokenId)
          };
        }
      });
    }));
    _defineProperty(this, "unwrap", buildTransactionFunction(async (wrappedTokenId, recipientAddress) => {
      const recipient = await resolveAddress(recipientAddress ? recipientAddress : await this.contractWrapper.getSignerAddress());
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "unwrap",
        args: [wrappedTokenId, recipient]
      });
    }));
    this.abi = AbiSchema.parse(abi || []);
    this.metadata = new ContractMetadata(this.contractWrapper, MultiwrapContractSchema, this.storage);
    this.app = new ContractAppURI(this.contractWrapper, this.metadata, this.storage);
    this.roles = new ContractRoles(this.contractWrapper, Multiwrap.contractRoles);
    this.encoder = new ContractEncoder(this.contractWrapper);
    this.estimator = new GasCostEstimator(this.contractWrapper);
    this.events = new ContractEvents(this.contractWrapper);
    this.royalties = new ContractRoyalty(this.contractWrapper, this.metadata);
    this.owner = new ContractOwner(this.contractWrapper);
  }
  /** ******************************
   * READ FUNCTIONS
   *******************************/
  /**
   * Get the contents of a wrapped token bundle
   * @example
   * ```javascript
   * const contents = await contract.getWrappedContents(wrappedTokenId);
   * console.log(contents.erc20Tokens);
   * console.log(contents.erc721Tokens);
   * console.log(contents.erc1155Tokens);
   * ```
   * @param wrappedTokenId - the id of the wrapped token bundle
   */
  async getWrappedContents(wrappedTokenId) {
    const wrappedTokens = await this.contractWrapper.readContract.getWrappedContents(wrappedTokenId);
    const erc20Tokens = [];
    const erc721Tokens = [];
    const erc1155Tokens = [];
    for (const token of wrappedTokens) {
      switch (token.tokenType) {
        case 0: {
          const tokenMetadata = await fetchCurrencyMetadata(this.contractWrapper.getProvider(), token.assetContract);
          erc20Tokens.push({
            contractAddress: token.assetContract,
            quantity: formatUnits(token.totalAmount, tokenMetadata.decimals)
          });
          break;
        }
        case 1: {
          erc721Tokens.push({
            contractAddress: token.assetContract,
            tokenId: token.tokenId
          });
          break;
        }
        case 2: {
          erc1155Tokens.push({
            contractAddress: token.assetContract,
            tokenId: token.tokenId,
            quantity: token.totalAmount.toString()
          });
          break;
        }
      }
    }
    return {
      erc20Tokens,
      erc721Tokens,
      erc1155Tokens
    };
  }
  /** ******************************
   * PRIVATE FUNCTIONS
   *******************************/
  async toTokenStructList(contents) {
    const tokens = [];
    const provider = this.contractWrapper.getProvider();
    const owner = await this.contractWrapper.getSignerAddress();
    if (contents.erc20Tokens) {
      for (const erc20 of contents.erc20Tokens) {
        const normalizedQuantity = await normalizePriceValue(provider, erc20.quantity, erc20.contractAddress);
        const hasAllowance = await hasERC20Allowance(this.contractWrapper, erc20.contractAddress, normalizedQuantity);
        if (!hasAllowance) {
          throw new Error(`ERC20 token with contract address "${erc20.contractAddress}" does not have enough allowance to transfer.

You can set allowance to the multiwrap contract to transfer these tokens by running:

await sdk.getToken("${erc20.contractAddress}").setAllowance("${this.getAddress()}", ${erc20.quantity});

`);
        }
        tokens.push({
          assetContract: erc20.contractAddress,
          totalAmount: normalizedQuantity,
          tokenId: 0,
          tokenType: 0
        });
      }
    }
    if (contents.erc721Tokens) {
      for (const erc721 of contents.erc721Tokens) {
        const isApproved = await isTokenApprovedForTransfer(this.contractWrapper.getProvider(), this.getAddress(), erc721.contractAddress, erc721.tokenId, owner);
        if (!isApproved) {
          throw new Error(`ERC721 token "${erc721.tokenId}" with contract address "${erc721.contractAddress}" is not approved for transfer.

You can give approval the multiwrap contract to transfer this token by running:

await sdk.getNFTCollection("${erc721.contractAddress}").setApprovalForToken("${this.getAddress()}", ${erc721.tokenId});

`);
        }
        tokens.push({
          assetContract: erc721.contractAddress,
          totalAmount: 0,
          tokenId: erc721.tokenId,
          tokenType: 1
        });
      }
    }
    if (contents.erc1155Tokens) {
      for (const erc1155 of contents.erc1155Tokens) {
        const isApproved = await isTokenApprovedForTransfer(this.contractWrapper.getProvider(), this.getAddress(), erc1155.contractAddress, erc1155.tokenId, owner);
        if (!isApproved) {
          throw new Error(`ERC1155 token "${erc1155.tokenId}" with contract address "${erc1155.contractAddress}" is not approved for transfer.

You can give approval the multiwrap contract to transfer this token by running:

await sdk.getEdition("${erc1155.contractAddress}").setApprovalForAll("${this.getAddress()}", true);

`);
        }
        tokens.push({
          assetContract: erc1155.contractAddress,
          totalAmount: erc1155.quantity,
          tokenId: erc1155.tokenId,
          tokenType: 2
        });
      }
    }
    return tokens;
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
_defineProperty(Multiwrap, "contractRoles", ["admin", "transfer", "minter", "unwrap", "asset"]);
export {
  Multiwrap
};
