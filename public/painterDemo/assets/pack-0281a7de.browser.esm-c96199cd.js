import { z, b$ as AddressOrEnsSchema, c0 as AmountSchema, c1 as BigNumberishSchema, c2 as NFTInputOrUriSchema, c3 as RawDateSchema, bL as assertEnabled, a_ as ContractWrapper, aZ as _defineProperty, a$ as buildTransactionFunction, b0 as AbiSchema, b1 as ContractMetadata, c4 as PackContractSchema, b3 as ContractAppURI, b4 as ContractRoles, b5 as ContractRoyalty, b9 as ContractEncoder, ba as GasCostEstimator, b8 as ContractEvents, bc as ContractInterceptor, bd as ContractOwner, be as getRoleHash, y as AddressZero, t as BigNumber, bC as fetchCurrencyMetadata, bD as formatUnits, bl as normalizePriceValue, bv as isTokenApprovedForTransfer, bf as Transaction, bM as detectContractFeature, c5 as IPackVRFAbi, c6 as FEATURE_PACK_VRF, bj as resolveAddress, c7 as LINK_TOKEN_ADDRESS, c8 as Erc20, bU as uploadOrExtractURI } from "./index-0d430626.js";
import { S as StandardErc1155 } from "./erc-1155-standard-607e2724.browser.esm-5f46bd34.js";
import { h as hasERC20Allowance } from "./hasERC20Allowance-59b9da80.browser.esm-ad7dc89a.js";
const ERC20Abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string"
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256"
      }
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256"
      }
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class PackVRF {
  constructor(network, address, storage, options, chainId) {
    var _this = this;
    let contractWrapper = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : new ContractWrapper(network, address, IPackVRFAbi, options);
    _defineProperty(this, "featureName", FEATURE_PACK_VRF.name);
    _defineProperty(this, "contractWrapper", void 0);
    _defineProperty(this, "storage", void 0);
    _defineProperty(this, "chainId", void 0);
    _defineProperty(this, "events", void 0);
    _defineProperty(this, "open", buildTransactionFunction(async function(tokenId) {
      let amount = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
      let gasLimit = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 5e5;
      return Transaction.fromContractWrapper({
        contractWrapper: _this.contractWrapper,
        method: "openPack",
        args: [tokenId, amount],
        overrides: {
          // Higher gas limit for opening packs
          gasLimit
        },
        parse: (receipt) => {
          let id = BigNumber.from(0);
          try {
            const event = _this.contractWrapper.parseLogs("PackOpenRequested", receipt?.logs);
            id = event[0].args.requestId;
          } catch (e) {
          }
          return {
            receipt,
            id
          };
        }
      });
    }));
    _defineProperty(this, "claimRewards", buildTransactionFunction(async function() {
      let gasLimit = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 5e5;
      return Transaction.fromContractWrapper({
        contractWrapper: _this.contractWrapper,
        method: "claimRewards",
        args: [],
        overrides: {
          // Higher gas limit for opening packs
          gasLimit
        },
        parse: async (receipt) => {
          const event = _this.contractWrapper.parseLogs("PackOpened", receipt?.logs);
          if (event.length === 0) {
            throw new Error("PackOpened event not found");
          }
          const rewards = event[0].args.rewardUnitsDistributed;
          return await _this.parseRewards(rewards);
        }
      });
    }));
    this.contractWrapper = contractWrapper;
    this.storage = storage;
    this.chainId = chainId;
    this.events = new ContractEvents(this.contractWrapper);
  }
  onNetworkUpdated(network) {
    this.contractWrapper.updateSignerOrProvider(network);
  }
  getAddress() {
    return this.contractWrapper.readContract.address;
  }
  async parseRewards(rewards) {
    const erc20Rewards = [];
    const erc721Rewards = [];
    const erc1155Rewards = [];
    for (const reward of rewards) {
      switch (reward.tokenType) {
        case 0: {
          const tokenMetadata = await fetchCurrencyMetadata(this.contractWrapper.getProvider(), reward.assetContract);
          erc20Rewards.push({
            contractAddress: reward.assetContract,
            quantityPerReward: formatUnits(reward.totalAmount, tokenMetadata.decimals).toString()
          });
          break;
        }
        case 1: {
          erc721Rewards.push({
            contractAddress: reward.assetContract,
            tokenId: reward.tokenId.toString()
          });
          break;
        }
        case 2: {
          erc1155Rewards.push({
            contractAddress: reward.assetContract,
            tokenId: reward.tokenId.toString(),
            quantityPerReward: reward.totalAmount.toString()
          });
          break;
        }
      }
    }
    return {
      erc20Rewards,
      erc721Rewards,
      erc1155Rewards
    };
  }
  /**
   * Setup a listener for when a pack is opened
   *
   * @example
   * ```javascript
   * const unsubscribe = await contract.pack.addPackOpenEventListener((packId, openerAddress, rewards) => {
   *  console.log(`Pack ${packId} was opened by ${openerAddress} and contained:`, rewards);
   * });
   * @param callback the listener to call when a pack is opened
   * @returns a unsubscribe function to cleanup the listener
   * @twfeature PackVRF
   */
  async addPackOpenEventListener(callback) {
    return this.events.addEventListener("PackOpened", async (event) => {
      callback(event.data.packId.toString(), event.data.opener, await this.parseRewards(event.data.rewardUnitsDistributed));
    });
  }
  /**
   * Check if a specific wallet can claim rewards after opening a pack
   *
   * @example
   * ```javascript
   * const canClaim = await contract.pack.canClaimRewards("{{wallet_address}}");
   * ```
   * @param claimerAddress Optional: the address to check if they can claim rewards, defaults to the connected address
   * @returns whether the connected address can claim rewards after opening a pack
   * @twfeature PackVRF
   */
  async canClaimRewards(claimerAddress) {
    const address = await resolveAddress(claimerAddress || await this.contractWrapper.getSignerAddress());
    return await this.contractWrapper.readContract.canClaimRewards(address);
  }
  /**
   * Open a pack and claim the rewards
   * @remarks This function will only start the flow of opening a pack, the rewards will be granted automatically to the connected address after VRF request is fulfilled
   *
   * @example
   * ```javascript
   * const packId = 0;
   * const amount = 1;
   * const { id } = await contract.pack.openAndClaim(packId, amount);
   * ```
   *
   * @param packId The id of the pack to open
   * @param amount Optional: the amount of packs to open, defaults to 1
   * @param gasLimit Optional: the gas limit to use for the VRF callback transaction, defaults to 500000
   * @returns
   * @twfeature PackVRF
   */
  async openAndClaim(packId) {
    let amount = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    let gasLimit = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 5e5;
    const receipt = await this.contractWrapper.sendTransaction("openPackAndClaimRewards", [packId, amount, gasLimit], {
      // Higher gas limit for opening packs
      gasLimit: BigNumber.from(5e5)
    });
    let id = BigNumber.from(0);
    try {
      const event = this.contractWrapper.parseLogs("PackOpenRequested", receipt?.logs);
      id = event[0].args.requestId;
    } catch (e) {
    }
    return {
      receipt,
      id
    };
  }
  /**
   * Get the LINK balance of the contract
   *
   * @example
   * ```javascript
   * const balance = await contract.pack.getLinkBalance();
   * ```
   *
   * @returns the balance of LINK in the contract
   * @twfeature PackVRF
   */
  async getLinkBalance() {
    return this.getLinkContract().balanceOf(this.contractWrapper.readContract.address);
  }
  /**
   * Transfer LINK to this contract
   *
   * @example
   * ```javascript
   * const amount = 1;
   * await contract.pack.transferLink(amount);
   * ```
   *
   * @param amount the amount of LINK to transfer to the contract
   * @twfeature PackVRF
   */
  async transferLink(amount) {
    await this.getLinkContract().transfer(this.contractWrapper.readContract.address, amount);
  }
  getLinkContract() {
    const linkAddress = LINK_TOKEN_ADDRESS[this.chainId];
    if (!linkAddress) {
      throw new Error(`No LINK token address found for chainId ${this.chainId}`);
    }
    const contract = new ContractWrapper(this.contractWrapper.getSignerOrProvider(), linkAddress, ERC20Abi, this.contractWrapper.options);
    return new Erc20(contract, this.storage, this.chainId);
  }
}
const CommonWrappableSchema = z.object({
  contractAddress: AddressOrEnsSchema
});
const ERC20WrappableSchema = CommonWrappableSchema.extend({
  quantity: AmountSchema
});
const ERC721WrappableSchema = CommonWrappableSchema.extend({
  tokenId: BigNumberishSchema
});
const ERC1155WrappableSchema = CommonWrappableSchema.extend({
  tokenId: BigNumberishSchema,
  quantity: BigNumberishSchema
});
const ERC20RewardSchema = ERC20WrappableSchema.omit({
  quantity: true
}).extend({
  quantityPerReward: AmountSchema
});
const ERC721RewardSchema = ERC721WrappableSchema;
const ERC1155RewardSchema = ERC1155WrappableSchema.omit({
  quantity: true
}).extend({
  quantityPerReward: BigNumberishSchema
});
const ERC20RewardContentsSchema = ERC20RewardSchema.extend({
  totalRewards: BigNumberishSchema.default("1")
});
const ERC721RewardContentsSchema = ERC721RewardSchema;
const ERC1155RewardContentsSchema = ERC1155RewardSchema.extend({
  totalRewards: BigNumberishSchema.default("1")
});
z.object({
  erc20Rewards: z.array(ERC20RewardSchema).default([]),
  erc721Rewards: z.array(ERC721RewardSchema).default([]),
  erc1155Rewards: z.array(ERC1155RewardSchema).default([])
});
const PackRewardsOutputSchema = z.object({
  erc20Rewards: z.array(ERC20RewardContentsSchema).default([]),
  erc721Rewards: z.array(ERC721RewardContentsSchema).default([]),
  erc1155Rewards: z.array(ERC1155RewardContentsSchema).default([])
});
const PackMetadataInputSchema = PackRewardsOutputSchema.extend({
  packMetadata: NFTInputOrUriSchema,
  rewardsPerPack: BigNumberishSchema.default("1"),
  openStartTime: RawDateSchema.default(/* @__PURE__ */ new Date())
});
class Pack extends StandardErc1155 {
  /**
   * Configure royalties
   * @remarks Set your own royalties for the entire contract or per pack
   * @example
   * ```javascript
   * // royalties on the whole contract
   * contract.royalties.setDefaultRoyaltyInfo({
   *   seller_fee_basis_points: 100, // 1%
   *   fee_recipient: "0x..."
   * });
   * // override royalty for a particular pack
   * contract.royalties.setTokenRoyaltyInfo(packId, {
   *   seller_fee_basis_points: 500, // 5%
   *   fee_recipient: "0x..."
   * });
   * ```
   */
  /**
   * @internal
   */
  /**
   * If enabled in the contract, use the Chainlink VRF functionality to open packs
   */
  get vrf() {
    return assertEnabled(this._vrf, FEATURE_PACK_VRF);
  }
  constructor(network, address, storage) {
    var _this;
    let options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    let abi = arguments.length > 4 ? arguments[4] : void 0;
    let chainId = arguments.length > 5 ? arguments[5] : void 0;
    let contractWrapper = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : new ContractWrapper(network, address, abi, options.gasless && "openzeppelin" in options.gasless ? {
      ...options,
      gasless: {
        ...options.gasless,
        openzeppelin: {
          ...options.gasless.openzeppelin,
          useEOAForwarder: true
        }
      }
    } : options);
    super(contractWrapper, storage, chainId);
    _this = this;
    _defineProperty(this, "abi", void 0);
    _defineProperty(this, "metadata", void 0);
    _defineProperty(this, "app", void 0);
    _defineProperty(this, "roles", void 0);
    _defineProperty(this, "encoder", void 0);
    _defineProperty(this, "events", void 0);
    _defineProperty(this, "estimator", void 0);
    _defineProperty(this, "royalties", void 0);
    _defineProperty(this, "interceptor", void 0);
    _defineProperty(this, "owner", void 0);
    _defineProperty(this, "_vrf", void 0);
    _defineProperty(this, "create", buildTransactionFunction(async (metadataWithRewards) => {
      const signerAddress = await this.contractWrapper.getSignerAddress();
      return this.createTo.prepare(signerAddress, metadataWithRewards);
    }));
    _defineProperty(this, "addPackContents", buildTransactionFunction(async (packId, packContents) => {
      const signerAddress = await this.contractWrapper.getSignerAddress();
      const parsedContents = await PackRewardsOutputSchema.parseAsync(packContents);
      const {
        contents,
        numOfRewardUnits
      } = await this.toPackContentArgs(parsedContents);
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "addPackContents",
        args: [packId, contents, numOfRewardUnits, signerAddress],
        parse: (receipt) => {
          const event = this.contractWrapper.parseLogs("PackUpdated", receipt?.logs);
          if (event.length === 0) {
            throw new Error("PackUpdated event not found");
          }
          const id = event[0].args.packId;
          return {
            id,
            receipt,
            data: () => this.erc1155.get(id)
          };
        }
      });
    }));
    _defineProperty(this, "createTo", buildTransactionFunction(async (to, metadataWithRewards) => {
      const uri = await uploadOrExtractURI(metadataWithRewards.packMetadata, this.storage);
      const parsedMetadata = await PackMetadataInputSchema.parseAsync(metadataWithRewards);
      const {
        erc20Rewards,
        erc721Rewards,
        erc1155Rewards
      } = parsedMetadata;
      const rewardsData = {
        erc20Rewards,
        erc721Rewards,
        erc1155Rewards
      };
      const {
        contents,
        numOfRewardUnits
      } = await this.toPackContentArgs(rewardsData);
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "createPack",
        args: [contents, numOfRewardUnits, uri, parsedMetadata.openStartTime, parsedMetadata.rewardsPerPack, await resolveAddress(to)],
        parse: (receipt) => {
          const event = this.contractWrapper.parseLogs("PackCreated", receipt?.logs);
          if (event.length === 0) {
            throw new Error("PackCreated event not found");
          }
          const packId = event[0].args.packId;
          return {
            id: packId,
            receipt,
            data: () => this.erc1155.get(packId)
          };
        }
      });
    }));
    _defineProperty(this, "open", buildTransactionFunction(async function(tokenId) {
      let amount = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
      let gasLimit = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 5e5;
      if (_this._vrf) {
        throw new Error("This contract is using Chainlink VRF, use `contract.vrf.open()` or `contract.vrf.openAndClaim()` instead");
      }
      return Transaction.fromContractWrapper({
        contractWrapper: _this.contractWrapper,
        method: "openPack",
        args: [tokenId, amount],
        overrides: {
          // Higher gas limit for opening packs
          gasLimit
        },
        parse: async (receipt) => {
          const event = _this.contractWrapper.parseLogs("PackOpened", receipt?.logs);
          if (event.length === 0) {
            throw new Error("PackOpened event not found");
          }
          const rewards = event[0].args.rewardUnitsDistributed;
          const erc20Rewards = [];
          const erc721Rewards = [];
          const erc1155Rewards = [];
          for (const reward of rewards) {
            switch (reward.tokenType) {
              case 0: {
                const tokenMetadata = await fetchCurrencyMetadata(_this.contractWrapper.getProvider(), reward.assetContract);
                erc20Rewards.push({
                  contractAddress: reward.assetContract,
                  quantityPerReward: formatUnits(reward.totalAmount, tokenMetadata.decimals).toString()
                });
                break;
              }
              case 1: {
                erc721Rewards.push({
                  contractAddress: reward.assetContract,
                  tokenId: reward.tokenId.toString()
                });
                break;
              }
              case 2: {
                erc1155Rewards.push({
                  contractAddress: reward.assetContract,
                  tokenId: reward.tokenId.toString(),
                  quantityPerReward: reward.totalAmount.toString()
                });
                break;
              }
            }
          }
          return {
            erc20Rewards,
            erc721Rewards,
            erc1155Rewards
          };
        }
      });
    }));
    this.abi = AbiSchema.parse(abi || []);
    this.metadata = new ContractMetadata(this.contractWrapper, PackContractSchema, this.storage);
    this.app = new ContractAppURI(this.contractWrapper, this.metadata, this.storage);
    this.roles = new ContractRoles(this.contractWrapper, Pack.contractRoles);
    this.royalties = new ContractRoyalty(this.contractWrapper, this.metadata);
    this.encoder = new ContractEncoder(this.contractWrapper);
    this.estimator = new GasCostEstimator(this.contractWrapper);
    this.events = new ContractEvents(this.contractWrapper);
    this.interceptor = new ContractInterceptor(this.contractWrapper);
    this.owner = new ContractOwner(this.contractWrapper);
    this._vrf = this.detectVrf();
  }
  /**
   * @internal
   */
  onNetworkUpdated(network) {
    this.contractWrapper.updateSignerOrProvider(network);
    this._vrf?.onNetworkUpdated(network);
  }
  getAddress() {
    return this.contractWrapper.readContract.address;
  }
  /** ******************************
   * READ FUNCTIONS
   *******************************/
  /**
   * Get a single Pack
   *
   * @remarks Get all the data associated with every pack in this contract.
   *
   * By default, returns the first 100 packs, use queryParams to fetch more.
   *
   * @example
   * ```javascript
   * const pack = await contract.get(0);
   * console.log(packs;
   * ```
   */
  async get(tokenId) {
    return this.erc1155.get(tokenId);
  }
  /**
   * Get All Packs
   *
   * @remarks Get all the data associated with every pack in this contract.
   *
   * By default, returns the first 100 packs, use queryParams to fetch more.
   *
   * @example
   * ```javascript
   * const packs = await contract.getAll();
   * console.log(packs;
   * ```
   * @param queryParams - optional filtering to only fetch a subset of results.
   * @returns The pack metadata for all packs queried.
   */
  async getAll(queryParams) {
    return this.erc1155.getAll(queryParams);
  }
  /**
   * Get Owned Packs
   *
   * @remarks Get all the data associated with the packs owned by a specific wallet.
   *
   * @example
   * ```javascript
   * // Address of the wallet to get the packs of
   * const address = "{{wallet_address}}";
   * const packss = await contract.getOwned(address);
   * ```
   *
   * @returns The pack metadata for all the owned packs in the contract.
   */
  async getOwned(walletAddress) {
    return this.erc1155.getOwned(walletAddress);
  }
  /**
   * Get the number of packs created
   * @returns the total number of packs minted in this contract
   * @public
   */
  async getTotalCount() {
    return this.erc1155.totalCount();
  }
  /**
   * Get whether users can transfer packs from this contract
   */
  async isTransferRestricted() {
    const anyoneCanTransfer = await this.contractWrapper.readContract.hasRole(getRoleHash("transfer"), AddressZero);
    return !anyoneCanTransfer;
  }
  /**
   * Get Pack Contents
   * @remarks Get the rewards contained inside a pack.
   *
   * @param packId - The id of the pack to get the contents of.
   * @returns - The contents of the pack.
   *
   * @example
   * ```javascript
   * const packId = 0;
   * const contents = await contract.getPackContents(packId);
   * console.log(contents.erc20Rewards);
   * console.log(contents.erc721Rewards);
   * console.log(contents.erc1155Rewards);
   * ```
   */
  async getPackContents(packId) {
    const {
      contents,
      perUnitAmounts
    } = await this.contractWrapper.readContract.getPackContents(packId);
    const erc20Rewards = [];
    const erc721Rewards = [];
    const erc1155Rewards = [];
    for (let i = 0; i < contents.length; i++) {
      const reward = contents[i];
      const amount = perUnitAmounts[i];
      switch (reward.tokenType) {
        case 0: {
          const tokenMetadata = await fetchCurrencyMetadata(this.contractWrapper.getProvider(), reward.assetContract);
          const quantityPerReward = formatUnits(amount, tokenMetadata.decimals);
          const totalRewards = formatUnits(BigNumber.from(reward.totalAmount).div(amount), tokenMetadata.decimals);
          erc20Rewards.push({
            contractAddress: reward.assetContract,
            quantityPerReward,
            totalRewards
          });
          break;
        }
        case 1: {
          erc721Rewards.push({
            contractAddress: reward.assetContract,
            tokenId: reward.tokenId.toString()
          });
          break;
        }
        case 2: {
          erc1155Rewards.push({
            contractAddress: reward.assetContract,
            tokenId: reward.tokenId.toString(),
            quantityPerReward: amount.toString(),
            totalRewards: BigNumber.from(reward.totalAmount).div(amount).toString()
          });
          break;
        }
      }
    }
    return {
      erc20Rewards,
      erc721Rewards,
      erc1155Rewards
    };
  }
  /** *****************************
   * PRIVATE FUNCTIONS
   *******************************/
  async toPackContentArgs(metadataWithRewards) {
    const contents = [];
    const numOfRewardUnits = [];
    const {
      erc20Rewards,
      erc721Rewards,
      erc1155Rewards
    } = metadataWithRewards;
    const provider = this.contractWrapper.getProvider();
    const owner = await this.contractWrapper.getSignerAddress();
    for (const erc20 of erc20Rewards) {
      const normalizedQuantity = await normalizePriceValue(provider, erc20.quantityPerReward, erc20.contractAddress);
      const totalQuantity = normalizedQuantity.mul(erc20.totalRewards);
      const hasAllowance = await hasERC20Allowance(this.contractWrapper, erc20.contractAddress, totalQuantity);
      if (!hasAllowance) {
        throw new Error(`ERC20 token with contract address "${erc20.contractAddress}" does not have enough allowance to transfer.

You can set allowance to the multiwrap contract to transfer these tokens by running:

await sdk.getToken("${erc20.contractAddress}").setAllowance("${this.getAddress()}", ${totalQuantity});

`);
      }
      numOfRewardUnits.push(erc20.totalRewards);
      contents.push({
        assetContract: erc20.contractAddress,
        tokenType: 0,
        totalAmount: totalQuantity,
        tokenId: 0
      });
    }
    for (const erc721 of erc721Rewards) {
      const isApproved = await isTokenApprovedForTransfer(this.contractWrapper.getProvider(), this.getAddress(), erc721.contractAddress, erc721.tokenId, owner);
      if (!isApproved) {
        throw new Error(`ERC721 token "${erc721.tokenId}" with contract address "${erc721.contractAddress}" is not approved for transfer.

You can give approval the multiwrap contract to transfer this token by running:

await sdk.getNFTCollection("${erc721.contractAddress}").setApprovalForToken("${this.getAddress()}", ${erc721.tokenId});

`);
      }
      numOfRewardUnits.push("1");
      contents.push({
        assetContract: erc721.contractAddress,
        tokenType: 1,
        totalAmount: 1,
        tokenId: erc721.tokenId
      });
    }
    for (const erc1155 of erc1155Rewards) {
      const isApproved = await isTokenApprovedForTransfer(this.contractWrapper.getProvider(), this.getAddress(), erc1155.contractAddress, erc1155.tokenId, owner);
      if (!isApproved) {
        throw new Error(`ERC1155 token "${erc1155.tokenId}" with contract address "${erc1155.contractAddress}" is not approved for transfer.

You can give approval the multiwrap contract to transfer this token by running:

await sdk.getEdition("${erc1155.contractAddress}").setApprovalForAll("${this.getAddress()}", true);

`);
      }
      numOfRewardUnits.push(erc1155.totalRewards);
      contents.push({
        assetContract: erc1155.contractAddress,
        tokenType: 2,
        totalAmount: BigNumber.from(erc1155.quantityPerReward).mul(BigNumber.from(erc1155.totalRewards)),
        tokenId: erc1155.tokenId
      });
    }
    return {
      contents,
      numOfRewardUnits
    };
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
  detectVrf() {
    if (detectContractFeature(this.contractWrapper, "PackVRF")) {
      return new PackVRF(this.contractWrapper.getSignerOrProvider(), this.contractWrapper.readContract.address, this.storage, this.contractWrapper.options, this.chainId);
    }
    return void 0;
  }
}
_defineProperty(Pack, "contractRoles", ["admin", "minter", "asset", "transfer"]);
export {
  Pack
};
