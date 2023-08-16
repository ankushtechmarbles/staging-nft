import { aZ as _defineProperty, a$ as buildTransactionFunction, bi as validateNewListingParam, bj as resolveAddress, bk as handleTokenApproval, bl as normalizePriceValue, bf as Transaction, bm as cleanCurrencyAddress, t as BigNumber, bn as isNativeToken, bo as setErc20Allowance, y as AddressZero, bp as ListingNotFoundError, bq as WrongListingTypeError, br as invariant, x as isAddress, bs as mapOffer, bt as fetchCurrencyValue, bu as fetchTokenMetadataForContract, bv as isTokenApprovedForTransfer, bw as Contract, bx as ERC165Abi, by as InterfaceId_IERC721, bz as InterfaceId_IERC1155, bA as Erc721Abi, bB as Erc1155Abi, bC as fetchCurrencyMetadata, bD as formatUnits, bE as isWinningBid, bF as MaxUint256, bG as AuctionAlreadyStartedError, bH as AuctionHasNotEndedError, b9 as ContractEncoder, a_ as ContractWrapper, b0 as AbiSchema, b1 as ContractMetadata, bI as MarketplaceContractSchema, b3 as ContractAppURI, b4 as ContractRoles, ba as GasCostEstimator, b8 as ContractEvents, bb as ContractPlatformFee, bc as ContractInterceptor, be as getRoleHash, bJ as DEFAULT_QUERY_ALL_COUNT, bK as NATIVE_TOKENS } from "./index-0d430626.js";
let ListingType = /* @__PURE__ */ function(ListingType2) {
  ListingType2[ListingType2["Direct"] = 0] = "Direct";
  ListingType2[ListingType2["Auction"] = 1] = "Auction";
  return ListingType2;
}({});
class MarketplaceDirect {
  constructor(contractWrapper, storage) {
    _defineProperty(this, "contractWrapper", void 0);
    _defineProperty(this, "storage", void 0);
    _defineProperty(this, "createListing", buildTransactionFunction(async (listing) => {
      validateNewListingParam(listing);
      const resolvedAssetAddress = await resolveAddress(listing.assetContractAddress);
      const resolvedCurrencyAddress = await resolveAddress(listing.currencyContractAddress);
      await handleTokenApproval(this.contractWrapper, this.getAddress(), resolvedAssetAddress, listing.tokenId, await this.contractWrapper.getSignerAddress());
      const normalizedPricePerToken = await normalizePriceValue(this.contractWrapper.getProvider(), listing.buyoutPricePerToken, resolvedCurrencyAddress);
      let listingStartTime = Math.floor(listing.startTimestamp.getTime() / 1e3);
      const block = await this.contractWrapper.getProvider().getBlock("latest");
      const blockTime = block.timestamp;
      if (listingStartTime < blockTime) {
        listingStartTime = blockTime;
      }
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "createListing",
        args: [{
          assetContract: resolvedAssetAddress,
          tokenId: listing.tokenId,
          buyoutPricePerToken: normalizedPricePerToken,
          currencyToAccept: cleanCurrencyAddress(resolvedCurrencyAddress),
          listingType: ListingType.Direct,
          quantityToList: listing.quantity,
          reservePricePerToken: normalizedPricePerToken,
          secondsUntilEndTime: listing.listingDurationInSeconds,
          startTime: BigNumber.from(listingStartTime)
        }],
        parse: (receipt) => {
          const event = this.contractWrapper.parseLogs("ListingAdded", receipt?.logs);
          return {
            id: event[0].args.listingId,
            receipt
          };
        }
      });
    }));
    _defineProperty(this, "createListingsBatch", buildTransactionFunction(async (listings) => {
      const data = await Promise.all(listings.map(async (listing) => {
        const tx = await this.createListing.prepare(listing);
        return tx.encode();
      }));
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "multicall",
        args: [data],
        parse: (receipt) => {
          const events = this.contractWrapper.parseLogs("ListingAdded", receipt?.logs);
          return events.map((event) => {
            return {
              id: event.args.listingId,
              receipt
            };
          });
        }
      });
    }));
    _defineProperty(this, "makeOffer", buildTransactionFunction(async (listingId, quantityDesired, currencyContractAddress, pricePerToken, expirationDate) => {
      if (isNativeToken(currencyContractAddress)) {
        throw new Error("You must use the wrapped native token address when making an offer with a native token");
      }
      const normalizedPrice = await normalizePriceValue(this.contractWrapper.getProvider(), pricePerToken, currencyContractAddress);
      try {
        await this.getListing(listingId);
      } catch (err) {
        console.error("Failed to get listing, err =", err);
        throw new Error(`Error getting the listing with id ${listingId}`);
      }
      const quantity = BigNumber.from(quantityDesired);
      const value = BigNumber.from(normalizedPrice).mul(quantity);
      const overrides = await this.contractWrapper.getCallOverrides() || {};
      await setErc20Allowance(this.contractWrapper, value, currencyContractAddress, overrides);
      let expirationTimestamp = MaxUint256;
      if (expirationDate) {
        expirationTimestamp = BigNumber.from(Math.floor(expirationDate.getTime() / 1e3));
      }
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "offer",
        args: [listingId, quantityDesired, currencyContractAddress, normalizedPrice, expirationTimestamp],
        overrides
      });
    }));
    _defineProperty(this, "acceptOffer", buildTransactionFunction(async (listingId, addressOfOfferor) => {
      await this.validateListing(BigNumber.from(listingId));
      const resolvedAddress = await resolveAddress(addressOfOfferor);
      const offer = await this.contractWrapper.readContract.offers(listingId, resolvedAddress);
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "acceptOffer",
        args: [listingId, resolvedAddress, offer.currency, offer.pricePerToken]
      });
    }));
    _defineProperty(this, "buyoutListing", buildTransactionFunction(async (listingId, quantityDesired, receiver) => {
      const listing = await this.validateListing(BigNumber.from(listingId));
      const {
        valid,
        error
      } = await this.isStillValidListing(listing, quantityDesired);
      if (!valid) {
        throw new Error(`Listing ${listingId} is no longer valid. ${error}`);
      }
      const buyFor = receiver ? receiver : await this.contractWrapper.getSignerAddress();
      const quantity = BigNumber.from(quantityDesired);
      const value = BigNumber.from(listing.buyoutPrice).mul(quantity);
      const overrides = await this.contractWrapper.getCallOverrides() || {};
      await setErc20Allowance(this.contractWrapper, value, listing.currencyContractAddress, overrides);
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "buy",
        args: [listingId, buyFor, quantity, listing.currencyContractAddress, value],
        overrides
      });
    }));
    _defineProperty(this, "updateListing", buildTransactionFunction(async (listing) => {
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "updateListing",
        args: [
          listing.id,
          listing.quantity,
          listing.buyoutPrice,
          // reserve price, doesn't matter for direct listing
          listing.buyoutPrice,
          await resolveAddress(listing.currencyContractAddress),
          listing.startTimeInSeconds,
          listing.secondsUntilEnd
        ]
      });
    }));
    _defineProperty(this, "cancelListing", buildTransactionFunction(async (listingId) => {
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "cancelDirectListing",
        args: [listingId]
      });
    }));
    this.contractWrapper = contractWrapper;
    this.storage = storage;
  }
  getAddress() {
    return this.contractWrapper.readContract.address;
  }
  /** ******************************
   * READ FUNCTIONS
   *******************************/
  /**
   * Get a direct listing by id
   *
   * @param listingId - the listing id
   * @returns the Direct listing object
   */
  async getListing(listingId) {
    const listing = await this.contractWrapper.readContract.listings(listingId);
    if (listing.assetContract === AddressZero) {
      throw new ListingNotFoundError(this.getAddress(), listingId.toString());
    }
    if (listing.listingType !== ListingType.Direct) {
      throw new WrongListingTypeError(this.getAddress(), listingId.toString(), "Auction", "Direct");
    }
    return await this.mapListing(listing);
  }
  /**
   * Get the active offer on a listing
   * @param listingId - the listing id
   * @param address - the address that made the offer
   */
  async getActiveOffer(listingId, address) {
    await this.validateListing(BigNumber.from(listingId));
    invariant(isAddress(address), "Address must be a valid address");
    const offers = await this.contractWrapper.readContract.offers(listingId, await resolveAddress(address));
    if (offers.offeror === AddressZero) {
      return void 0;
    }
    return await mapOffer(this.contractWrapper.getProvider(), BigNumber.from(listingId), offers);
  }
  /** ******************************
   * PRIVATE FUNCTIONS
   *******************************/
  /**
   * Throws error if listing could not be found
   *
   * @param listingId - Listing to check for
   */
  async validateListing(listingId) {
    try {
      return await this.getListing(listingId);
    } catch (err) {
      console.error(`Error getting the listing with id ${listingId}`);
      throw err;
    }
  }
  /**
   * Helper method maps the auction listing to the direct listing interface.
   *
   * @internal
   * @param listing - The listing to map, as returned from the contract.
   * @returns - The mapped interface.
   */
  async mapListing(listing) {
    return {
      assetContractAddress: listing.assetContract,
      buyoutPrice: BigNumber.from(listing.buyoutPricePerToken),
      currencyContractAddress: listing.currency,
      buyoutCurrencyValuePerToken: await fetchCurrencyValue(this.contractWrapper.getProvider(), listing.currency, listing.buyoutPricePerToken),
      id: listing.listingId.toString(),
      tokenId: listing.tokenId,
      quantity: listing.quantity,
      startTimeInSeconds: listing.startTime,
      asset: await fetchTokenMetadataForContract(listing.assetContract, this.contractWrapper.getProvider(), listing.tokenId, this.storage),
      secondsUntilEnd: listing.endTime,
      sellerAddress: listing.tokenOwner,
      type: ListingType.Direct
    };
  }
  /**
   * Use this method to check if a direct listing is still valid.
   *
   * Ways a direct listing can become invalid:
   * 1. The asset holder transferred the asset to another wallet
   * 2. The asset holder burned the asset
   * 3. The asset holder removed the approval on the marketplace
   *
   * @internal
   * @param listing - The listing to check.
   * @returns - True if the listing is valid, false otherwise.
   */
  async isStillValidListing(listing, quantity) {
    const approved = await isTokenApprovedForTransfer(this.contractWrapper.getProvider(), this.getAddress(), listing.assetContractAddress, listing.tokenId, listing.sellerAddress);
    if (!approved) {
      return {
        valid: false,
        error: `Token '${listing.tokenId}' from contract '${listing.assetContractAddress}' is not approved for transfer`
      };
    }
    const provider = this.contractWrapper.getProvider();
    const erc165 = new Contract(listing.assetContractAddress, ERC165Abi, provider);
    const isERC721 = await erc165.supportsInterface(InterfaceId_IERC721);
    const isERC1155 = await erc165.supportsInterface(InterfaceId_IERC1155);
    if (isERC721) {
      const asset = new Contract(listing.assetContractAddress, Erc721Abi, provider);
      let owner;
      try {
        owner = await asset.ownerOf(listing.tokenId);
      } catch (e) {
      }
      const valid = owner?.toLowerCase() === listing.sellerAddress.toLowerCase();
      return {
        valid,
        error: valid ? void 0 : `Seller is not the owner of Token '${listing.tokenId}' from contract '${listing.assetContractAddress} anymore'`
      };
    } else if (isERC1155) {
      const asset = new Contract(listing.assetContractAddress, Erc1155Abi, provider);
      const balance = await asset.balanceOf(listing.sellerAddress, listing.tokenId);
      const valid = balance.gte(quantity || listing.quantity);
      return {
        valid,
        error: valid ? void 0 : `Seller does not have enough balance of Token '${listing.tokenId}' from contract '${listing.assetContractAddress} to fulfill the listing`
      };
    } else {
      return {
        valid: false,
        error: "Contract does not implement ERC 1155 or ERC 721."
      };
    }
  }
}
class MarketplaceAuction {
  constructor(contractWrapper, storage) {
    _defineProperty(this, "contractWrapper", void 0);
    _defineProperty(this, "storage", void 0);
    _defineProperty(this, "encoder", void 0);
    _defineProperty(this, "createListing", buildTransactionFunction(async (listing) => {
      validateNewListingParam(listing);
      const resolvedAssetAddress = await resolveAddress(listing.assetContractAddress);
      const resolvedCurrencyAddress = await resolveAddress(listing.currencyContractAddress);
      await handleTokenApproval(this.contractWrapper, this.getAddress(), resolvedAssetAddress, listing.tokenId, await this.contractWrapper.getSignerAddress());
      const normalizedPricePerToken = await normalizePriceValue(this.contractWrapper.getProvider(), listing.buyoutPricePerToken, resolvedCurrencyAddress);
      const normalizedReservePrice = await normalizePriceValue(this.contractWrapper.getProvider(), listing.reservePricePerToken, resolvedCurrencyAddress);
      let listingStartTime = Math.floor(listing.startTimestamp.getTime() / 1e3);
      const block = await this.contractWrapper.getProvider().getBlock("latest");
      const blockTime = block.timestamp;
      if (listingStartTime < blockTime) {
        listingStartTime = blockTime;
      }
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "createListing",
        args: [{
          assetContract: resolvedAssetAddress,
          tokenId: listing.tokenId,
          buyoutPricePerToken: normalizedPricePerToken,
          currencyToAccept: cleanCurrencyAddress(resolvedCurrencyAddress),
          listingType: ListingType.Auction,
          quantityToList: listing.quantity,
          reservePricePerToken: normalizedReservePrice,
          secondsUntilEndTime: listing.listingDurationInSeconds,
          startTime: BigNumber.from(listingStartTime)
        }],
        parse: (receipt) => {
          const event = this.contractWrapper.parseLogs("ListingAdded", receipt?.logs);
          return {
            id: event[0].args.listingId,
            receipt
          };
        }
      });
    }));
    _defineProperty(this, "createListingsBatch", buildTransactionFunction(async (listings) => {
      const data = await Promise.all(listings.map(async (listing) => {
        const tx = await this.createListing.prepare(listing);
        return tx.encode();
      }));
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "multicall",
        args: [data],
        parse: (receipt) => {
          const events = this.contractWrapper.parseLogs("ListingAdded", receipt?.logs);
          return events.map((event) => {
            return {
              id: event.args.listingId,
              receipt
            };
          });
        }
      });
    }));
    _defineProperty(this, "buyoutListing", buildTransactionFunction(async (listingId) => {
      const listing = await this.validateListing(BigNumber.from(listingId));
      const currencyMetadata = await fetchCurrencyMetadata(this.contractWrapper.getProvider(), listing.currencyContractAddress);
      return this.makeBid.prepare(listingId, formatUnits(listing.buyoutPrice, currencyMetadata.decimals));
    }));
    _defineProperty(this, "makeBid", buildTransactionFunction(async (listingId, pricePerToken) => {
      const listing = await this.validateListing(BigNumber.from(listingId));
      const normalizedPrice = await normalizePriceValue(this.contractWrapper.getProvider(), pricePerToken, listing.currencyContractAddress);
      if (normalizedPrice.eq(BigNumber.from(0))) {
        throw new Error("Cannot make a bid with 0 value");
      }
      const bidBuffer = await this.contractWrapper.readContract.bidBufferBps();
      const winningBid = await this.getWinningBid(listingId);
      if (winningBid) {
        const isWinner = isWinningBid(winningBid.pricePerToken, normalizedPrice, bidBuffer);
        invariant(isWinner, "Bid price is too low based on the current winning bid and the bid buffer");
      } else {
        const tokenPrice = normalizedPrice;
        const reservePrice = BigNumber.from(listing.reservePrice);
        invariant(tokenPrice.gte(reservePrice), "Bid price is too low based on reserve price");
      }
      const quantity = BigNumber.from(listing.quantity);
      const value = normalizedPrice.mul(quantity);
      const overrides = await this.contractWrapper.getCallOverrides() || {};
      await setErc20Allowance(this.contractWrapper, value, listing.currencyContractAddress, overrides);
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "offer",
        args: [listingId, listing.quantity, listing.currencyContractAddress, normalizedPrice, MaxUint256],
        overrides
      });
    }));
    _defineProperty(this, "cancelListing", buildTransactionFunction(async (listingId) => {
      const listing = await this.validateListing(BigNumber.from(listingId));
      const now = BigNumber.from(Math.floor(Date.now() / 1e3));
      const startTime = BigNumber.from(listing.startTimeInEpochSeconds);
      const offers = await this.contractWrapper.readContract.winningBid(listingId);
      if (now.gt(startTime) && offers.offeror !== AddressZero) {
        throw new AuctionAlreadyStartedError(listingId.toString());
      }
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "closeAuction",
        args: [BigNumber.from(listingId), await this.contractWrapper.getSignerAddress()]
      });
    }));
    _defineProperty(this, "closeListing", buildTransactionFunction(async (listingId, closeFor) => {
      if (!closeFor) {
        closeFor = await this.contractWrapper.getSignerAddress();
      }
      const listing = await this.validateListing(BigNumber.from(listingId));
      try {
        return Transaction.fromContractWrapper({
          contractWrapper: this.contractWrapper,
          method: "closeAuction",
          args: [BigNumber.from(listingId), closeFor]
        });
      } catch (err) {
        if (err.message.includes("cannot close auction before it has ended")) {
          throw new AuctionHasNotEndedError(listingId.toString(), listing.endTimeInEpochSeconds.toString());
        } else {
          throw err;
        }
      }
    }));
    _defineProperty(this, "executeSale", buildTransactionFunction(async (listingId) => {
      const listing = await this.validateListing(BigNumber.from(listingId));
      try {
        const winningBid = await this.getWinningBid(listingId);
        invariant(winningBid, "No winning bid found");
        const closeForSeller = this.encoder.encode("closeAuction", [listingId, listing.sellerAddress]);
        const closeForBuyer = this.encoder.encode("closeAuction", [listingId, winningBid.buyerAddress]);
        return Transaction.fromContractWrapper({
          contractWrapper: this.contractWrapper,
          method: "multicall",
          args: [closeForSeller, closeForBuyer]
        });
      } catch (err) {
        if (err.message.includes("cannot close auction before it has ended")) {
          throw new AuctionHasNotEndedError(listingId.toString(), listing.endTimeInEpochSeconds.toString());
        } else {
          throw err;
        }
      }
    }));
    _defineProperty(this, "updateListing", buildTransactionFunction(async (listing) => {
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "updateListing",
        args: [listing.id, listing.quantity, listing.reservePrice, listing.buyoutPrice, listing.currencyContractAddress, listing.startTimeInEpochSeconds, listing.endTimeInEpochSeconds]
      });
    }));
    this.contractWrapper = contractWrapper;
    this.storage = storage;
    this.encoder = new ContractEncoder(contractWrapper);
  }
  getAddress() {
    return this.contractWrapper.readContract.address;
  }
  /** ******************************
   * READ FUNCTIONS
   *******************************/
  /**
   * Get an Auction listing by id
   *
   * @param listingId - the listing Id
   * @returns the Auction listing object
   */
  async getListing(listingId) {
    const listing = await this.contractWrapper.readContract.listings(listingId);
    if (listing.listingId.toString() !== listingId.toString()) {
      throw new ListingNotFoundError(this.getAddress(), listingId.toString());
    }
    if (listing.listingType !== ListingType.Auction) {
      throw new WrongListingTypeError(this.getAddress(), listingId.toString(), "Direct", "Auction");
    }
    return await this.mapListing(listing);
  }
  /**
   * Get Highest Bid
   *
   * @remarks Get the current highest bid of an active auction.
   *
   * @example
   * ```javascript
   * // The listing ID of the auction that closed
   * const listingId = 0;
   *
   * contract.auction.
   *   .getWinningBid(listingId)
   *   .then((offer) => console.log(offer))
   *   .catch((err) => console.error(err));
   * ```
   */
  async getWinningBid(listingId) {
    await this.validateListing(BigNumber.from(listingId));
    const offers = await this.contractWrapper.readContract.winningBid(listingId);
    if (offers.offeror === AddressZero) {
      return void 0;
    }
    return await mapOffer(this.contractWrapper.getProvider(), BigNumber.from(listingId), offers);
  }
  /**
   * Get Auction Winner
   *
   * @remarks Get the winner of the auction after an auction ends.
   *
   * @example
   * ```javascript
   * // The listing ID of the auction that closed
   * const listingId = 0;
   *
   * contract.auction.
   *   .getWinner(listingId)
   *   .then((auctionWinner) => console.log(auctionWinner))
   *   .catch((err) => console.error(err));
   * ```
   */
  async getWinner(listingId) {
    const listing = await this.validateListing(BigNumber.from(listingId));
    const offers = await this.contractWrapper.readContract.winningBid(listingId);
    const now = BigNumber.from(Math.floor(Date.now() / 1e3));
    const endTime = BigNumber.from(listing.endTimeInEpochSeconds);
    if (now.gt(endTime) && offers.offeror !== AddressZero) {
      return offers.offeror;
    }
    const closedAuctions = await this.contractWrapper.readContract.queryFilter(this.contractWrapper.readContract.filters.AuctionClosed());
    const auction = closedAuctions.find((a) => a.args.listingId.eq(BigNumber.from(listingId)));
    if (!auction) {
      throw new Error(`Could not find auction with listingId ${listingId} in closed auctions`);
    }
    return auction.args.winningBidder;
  }
  /**
   * Get the buffer in basis points between offers
   */
  async getBidBufferBps() {
    return this.contractWrapper.readContract.bidBufferBps();
  }
  /**
   * returns the minimum bid a user can place to outbid the previous highest bid
   * @param listingId - the listing id of the auction
   */
  async getMinimumNextBid(listingId) {
    const [currentBidBufferBps, winningBid, listing] = await Promise.all([this.getBidBufferBps(), this.getWinningBid(listingId), await this.validateListing(BigNumber.from(listingId))]);
    const currentBidOrReservePrice = winningBid ? (
      // if there is a winning bid use the value of it
      winningBid.currencyValue.value
    ) : (
      // if there is no winning bid use the reserve price
      listing.reservePrice
    );
    const minimumNextBid = currentBidOrReservePrice.add(
      // the addition of the current bid and the buffer
      // (have to divide by 10000 to get the fraction of the buffer (since it's in basis points))
      currentBidOrReservePrice.mul(currentBidBufferBps).div(1e4)
    );
    return fetchCurrencyValue(this.contractWrapper.getProvider(), listing.currencyContractAddress, minimumNextBid);
  }
  /** ******************************
   * PRIVATE FUNCTIONS
   *******************************/
  /**
   * Throws error if listing could not be found
   *
   * @param listingId - Listing to check for
   */
  async validateListing(listingId) {
    try {
      return await this.getListing(listingId);
    } catch (err) {
      console.error(`Error getting the listing with id ${listingId}`);
      throw err;
    }
  }
  /**
   * Helper method maps the auction listing to the auction listing interface.
   *
   * @internal
   * @param listing - The listing to map, as returned from the contract.
   * @returns - The mapped interface.
   */
  async mapListing(listing) {
    return {
      assetContractAddress: listing.assetContract,
      buyoutPrice: BigNumber.from(listing.buyoutPricePerToken),
      currencyContractAddress: listing.currency,
      buyoutCurrencyValuePerToken: await fetchCurrencyValue(this.contractWrapper.getProvider(), listing.currency, listing.buyoutPricePerToken),
      id: listing.listingId.toString(),
      tokenId: listing.tokenId,
      quantity: listing.quantity,
      startTimeInEpochSeconds: listing.startTime,
      asset: await fetchTokenMetadataForContract(listing.assetContract, this.contractWrapper.getProvider(), listing.tokenId, this.storage),
      reservePriceCurrencyValuePerToken: await fetchCurrencyValue(this.contractWrapper.getProvider(), listing.currency, listing.reservePricePerToken),
      reservePrice: BigNumber.from(listing.reservePricePerToken),
      endTimeInEpochSeconds: listing.endTime,
      sellerAddress: listing.tokenOwner,
      type: ListingType.Auction
    };
  }
}
class Marketplace {
  /**
   * @internal
   */
  /**
   * Direct listings
   * @remarks Create and manage direct listings in your marketplace.
   * @example
   * ```javascript
   * // Data of the listing you want to create
   * const listing = {
   *   // address of the NFT contract the asset you want to list is on
   *   assetContractAddress: "0x...",
   *   // token ID of the asset you want to list
   *   tokenId: "0",
   *  // when should the listing open up for offers
   *   startTimestamp: new Date(),
   *   // how long the listing will be open for
   *   listingDurationInSeconds: 86400,
   *   // how many of the asset you want to list
   *   quantity: 1,
   *   // address of the currency contract that will be used to pay for the listing
   *   currencyContractAddress: NATIVE_TOKEN_ADDRESS,
   *   // how much the asset will be sold for
   *   buyoutPricePerToken: "1.5",
   * }
   *
   * const tx = await contract.direct.createListing(listing);
   * const receipt = tx.receipt; // the transaction receipt
   * const listingId = tx.id; // the id of the newly created listing
   *
   * // And on the buyers side:
   * // Quantity of the asset you want to buy
   * const quantityDesired = 1;
   * await contract.direct.buyoutListing(listingId, quantityDesired);
   * ```
   */
  /**
   * Auctions
   * @remarks Create and manage auctions in your marketplace.
   * @example
   * ```javascript
   * // Data of the auction you want to create
   * const auction = {
   *   // address of the contract the asset you want to list is on
   *   assetContractAddress: "0x...",
   *   // token ID of the asset you want to list
   *   tokenId: "0",
   *  // when should the listing open up for offers
   *   startTimestamp: new Date(),
   *   // how long the listing will be open for
   *   listingDurationInSeconds: 86400,
   *   // how many of the asset you want to list
   *   quantity: 1,
   *   // address of the currency contract that will be used to pay for the listing
   *   currencyContractAddress: NATIVE_TOKEN_ADDRESS,
   *   // how much people would have to bid to instantly buy the asset
   *   buyoutPricePerToken: "10",
   *   // the minimum bid that will be accepted for the token
   *   reservePricePerToken: "1.5",
   * }
   *
   * const tx = await contract.auction.createListing(auction);
   * const receipt = tx.receipt; // the transaction receipt
   * const listingId = tx.id; // the id of the newly created listing
   *
   * // And on the buyers side:
   * // The price you are willing to bid for a single token of the listing
   * const pricePerToken = 2.6;
   * await contract.auction.makeBid(listingId, pricePerToken);
   * ```
   */
  get chainId() {
    return this._chainId;
  }
  constructor(network, address, storage) {
    let options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    let abi = arguments.length > 4 ? arguments[4] : void 0;
    let _chainId = arguments.length > 5 ? arguments[5] : void 0;
    let contractWrapper = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : new ContractWrapper(network, address, abi, options);
    _defineProperty(this, "abi", void 0);
    _defineProperty(this, "contractWrapper", void 0);
    _defineProperty(this, "storage", void 0);
    _defineProperty(this, "encoder", void 0);
    _defineProperty(this, "events", void 0);
    _defineProperty(this, "estimator", void 0);
    _defineProperty(this, "platformFees", void 0);
    _defineProperty(this, "metadata", void 0);
    _defineProperty(this, "app", void 0);
    _defineProperty(this, "roles", void 0);
    _defineProperty(this, "interceptor", void 0);
    _defineProperty(this, "direct", void 0);
    _defineProperty(this, "auction", void 0);
    _defineProperty(this, "_chainId", void 0);
    _defineProperty(this, "getAll", this.getAllListings);
    _defineProperty(this, "buyoutListing", buildTransactionFunction(async (listingId, quantityDesired, receiver) => {
      const listing = await this.contractWrapper.readContract.listings(listingId);
      if (listing.listingId.toString() !== listingId.toString()) {
        throw new ListingNotFoundError(this.getAddress(), listingId.toString());
      }
      switch (listing.listingType) {
        case ListingType.Direct: {
          invariant(quantityDesired !== void 0, "quantityDesired is required when buying out a direct listing");
          return await this.direct.buyoutListing.prepare(listingId, quantityDesired, receiver);
        }
        case ListingType.Auction: {
          return await this.auction.buyoutListing.prepare(listingId);
        }
        default:
          throw Error(`Unknown listing type: ${listing.listingType}`);
      }
    }));
    _defineProperty(this, "makeOffer", buildTransactionFunction(async (listingId, pricePerToken, quantity) => {
      const listing = await this.contractWrapper.readContract.listings(listingId);
      if (listing.listingId.toString() !== listingId.toString()) {
        throw new ListingNotFoundError(this.getAddress(), listingId.toString());
      }
      const chainId = await this.contractWrapper.getChainID();
      switch (listing.listingType) {
        case ListingType.Direct: {
          invariant(quantity, "quantity is required when making an offer on a direct listing");
          return await this.direct.makeOffer.prepare(listingId, quantity, isNativeToken(listing.currency) ? NATIVE_TOKENS[chainId].wrapped.address : listing.currency, pricePerToken);
        }
        case ListingType.Auction: {
          return await this.auction.makeBid.prepare(listingId, pricePerToken);
        }
        default:
          throw Error(`Unknown listing type: ${listing.listingType}`);
      }
    }));
    _defineProperty(this, "setBidBufferBps", buildTransactionFunction(async (bufferBps) => {
      await this.roles.verify(["admin"], await this.contractWrapper.getSignerAddress());
      const timeBuffer = await this.getTimeBufferInSeconds();
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "setAuctionBuffers",
        args: [timeBuffer, BigNumber.from(bufferBps)]
      });
    }));
    _defineProperty(this, "setTimeBufferInSeconds", buildTransactionFunction(async (bufferInSeconds) => {
      await this.roles.verify(["admin"], await this.contractWrapper.getSignerAddress());
      const bidBuffer = await this.getBidBufferBps();
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "setAuctionBuffers",
        args: [BigNumber.from(bufferInSeconds), bidBuffer]
      });
    }));
    _defineProperty(this, "allowListingFromSpecificAssetOnly", buildTransactionFunction(async (contractAddress) => {
      const encoded = [];
      const members = await this.roles.get("asset");
      if (members.includes(AddressZero)) {
        encoded.push(this.encoder.encode("revokeRole", [getRoleHash("asset"), AddressZero]));
      }
      encoded.push(this.encoder.encode("grantRole", [getRoleHash("asset"), contractAddress]));
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "multicall",
        args: [encoded]
      });
    }));
    _defineProperty(this, "allowListingFromAnyAsset", buildTransactionFunction(async () => {
      const encoded = [];
      const members = await this.roles.get("asset");
      for (const addr in members) {
        encoded.push(this.encoder.encode("revokeRole", [getRoleHash("asset"), addr]));
      }
      encoded.push(this.encoder.encode("grantRole", [getRoleHash("asset"), AddressZero]));
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "multicall",
        args: [encoded]
      });
    }));
    this._chainId = _chainId;
    this.abi = AbiSchema.parse(abi || []);
    this.contractWrapper = contractWrapper;
    this.storage = storage;
    this.metadata = new ContractMetadata(this.contractWrapper, MarketplaceContractSchema, this.storage);
    this.app = new ContractAppURI(this.contractWrapper, this.metadata, this.storage);
    this.roles = new ContractRoles(this.contractWrapper, Marketplace.contractRoles);
    this.encoder = new ContractEncoder(this.contractWrapper);
    this.estimator = new GasCostEstimator(this.contractWrapper);
    this.direct = new MarketplaceDirect(this.contractWrapper, this.storage);
    this.auction = new MarketplaceAuction(this.contractWrapper, this.storage);
    this.events = new ContractEvents(this.contractWrapper);
    this.platformFees = new ContractPlatformFee(this.contractWrapper);
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
   * Convenience function to get either a direct or auction listing
   *
   * @param listingId - the listing id
   * @returns either a direct or auction listing
   *
   * @remarks Get a listing by its listing id
   * @example
   * ```javascript
   * const listingId = 0;
   * const listing = await contract.getListing(listingId);
   * ```
   */
  async getListing(listingId) {
    const listing = await this.contractWrapper.readContract.listings(listingId);
    if (listing.assetContract === AddressZero) {
      throw new ListingNotFoundError(this.getAddress(), listingId.toString());
    }
    switch (listing.listingType) {
      case ListingType.Auction: {
        return await this.auction.mapListing(listing);
      }
      case ListingType.Direct: {
        return await this.direct.mapListing(listing);
      }
      default: {
        throw new Error(`Unknown listing type: ${listing.listingType}`);
      }
    }
  }
  /**
   * Get all active listings
   *
   * @remarks Fetch all the active listings from this marketplace contract. An active listing means it can be bought or bid on.
   * @example
   * ```javascript
   * const listings = await contract.getActiveListings();
   * const priceOfFirstActiveListing = listings[0].price;
   * ```
   * @param filter - optional filter parameters
   */
  async getActiveListings(filter) {
    const rawListings = await this.getAllListingsNoFilter(true);
    const filtered = this.applyFilter(rawListings, filter);
    const now = BigNumber.from(Math.floor(Date.now() / 1e3));
    return filtered.filter((l) => {
      return l.type === ListingType.Auction && BigNumber.from(l.endTimeInEpochSeconds).gt(now) && BigNumber.from(l.startTimeInEpochSeconds).lte(now) || l.type === ListingType.Direct && l.quantity > 0;
    });
  }
  /**
   * Get all the listings
   *
   * @remarks Fetch all the listings from this marketplace contract, including sold ones.
   * @example
   * ```javascript
   * const listings = await contract.getAllListings();
   * const priceOfFirstListing = listings[0].price;
   * ```
   *
   * @param filter - optional filter parameters
   */
  async getAllListings(filter) {
    const rawListings = await this.getAllListingsNoFilter(false);
    return this.applyFilter(rawListings, filter);
  }
  /**
   * Get the total number of Listings
   * @returns the total number listings on the marketplace
   * @public
   */
  async getTotalCount() {
    return await this.contractWrapper.readContract.totalListings();
  }
  /**
   * Get whether listing is restricted only to addresses with the Lister role
   */
  async isRestrictedToListerRoleOnly() {
    const anyoneCanList = await this.contractWrapper.readContract.hasRole(getRoleHash("lister"), AddressZero);
    return !anyoneCanList;
  }
  /**
   * Get the buffer in basis points between offers
   */
  async getBidBufferBps() {
    return this.contractWrapper.readContract.bidBufferBps();
  }
  /**
   * get the buffer time in seconds between offers
   */
  async getTimeBufferInSeconds() {
    return this.contractWrapper.readContract.timeBuffer();
  }
  /**
   * Get all the offers for a listing
   *
   * @remarks Fetch all the offers for a specified direct or auction listing.
   * @example
   * ```javascript
   * const offers = await marketplaceContract.getOffers(listingId);
   * const firstOffer = offers[0];
   * ```
   *
   * @param listingId - the id of the listing to fetch offers for
   */
  async getOffers(listingId) {
    const listingEvents = await this.events.getEvents("NewOffer", {
      order: "desc",
      filters: {
        listingId
      }
    });
    return await Promise.all(listingEvents.map(async (e) => {
      return await mapOffer(this.contractWrapper.getProvider(), BigNumber.from(listingId), {
        quantityWanted: e.data.quantityWanted,
        pricePerToken: e.data.quantityWanted.gt(0) ? e.data.totalOfferAmount.div(e.data.quantityWanted) : e.data.totalOfferAmount,
        currency: e.data.currency,
        offeror: e.data.offeror
      });
    }));
  }
  /** ******************************
   * PRIVATE FUNCTIONS
   *******************************/
  async getAllListingsNoFilter(filterInvalidListings) {
    const listings = await Promise.all(Array.from(Array((await this.contractWrapper.readContract.totalListings()).toNumber()).keys()).map(async (i) => {
      let listing;
      try {
        listing = await this.getListing(i);
      } catch (err) {
        if (err instanceof ListingNotFoundError) {
          return void 0;
        } else {
          console.warn(`Failed to get listing ${i}' - skipping. Try 'marketplace.getListing(${i})' to get the underlying error.`);
          return void 0;
        }
      }
      if (listing.type === ListingType.Auction) {
        return listing;
      }
      if (filterInvalidListings) {
        const {
          valid
        } = await this.direct.isStillValidListing(listing);
        if (!valid) {
          return void 0;
        }
      }
      return listing;
    }));
    return listings.filter((l) => l !== void 0);
  }
  applyFilter(listings, filter) {
    let rawListings = [...listings];
    const start = BigNumber.from(filter?.start || 0).toNumber();
    const count = BigNumber.from(filter?.count || DEFAULT_QUERY_ALL_COUNT).toNumber();
    if (filter) {
      if (filter.seller) {
        rawListings = rawListings.filter((seller) => seller.sellerAddress.toString().toLowerCase() === filter?.seller?.toString().toLowerCase());
      }
      if (filter.tokenContract) {
        rawListings = rawListings.filter((tokenContract) => tokenContract.assetContractAddress.toString().toLowerCase() === filter?.tokenContract?.toString().toLowerCase());
      }
      if (filter.tokenId !== void 0) {
        rawListings = rawListings.filter((tokenContract) => tokenContract.tokenId.toString() === filter?.tokenId?.toString());
      }
      rawListings = rawListings.filter((_, index) => index >= start);
      rawListings = rawListings.slice(0, count);
    }
    return rawListings;
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
_defineProperty(Marketplace, "contractRoles", ["admin", "lister", "asset"]);
export {
  Marketplace
};
