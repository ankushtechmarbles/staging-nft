import { a_ as ContractWrapper, aZ as _defineProperty, a$ as buildTransactionFunction, b0 as AbiSchema, b1 as ContractMetadata, cg as VoteContractSchema, b3 as ContractAppURI, b9 as ContractEncoder, ba as GasCostEstimator, b8 as ContractEvents, bc as ContractInterceptor, t as BigNumber, bj as resolveAddress, ch as id, bD as formatUnits, bw as Contract, ca as ERC20Abi, bt as fetchCurrencyValue, bC as fetchCurrencyMetadata, bf as Transaction } from "./index-0d430626.js";
let VoteType = /* @__PURE__ */ function(VoteType2) {
  VoteType2[VoteType2["Against"] = 0] = "Against";
  VoteType2[VoteType2["For"] = 1] = "For";
  VoteType2[VoteType2["Abstain"] = 2] = "Abstain";
  return VoteType2;
}({});
class Vote {
  /**
   * @internal
   */
  get chainId() {
    return this._chainId;
  }
  constructor(network, address, storage) {
    var _this = this;
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
    _defineProperty(this, "interceptor", void 0);
    _defineProperty(this, "_chainId", void 0);
    _defineProperty(this, "propose", buildTransactionFunction(async (description, executions) => {
      if (!executions) {
        executions = [{
          toAddress: this.contractWrapper.readContract.address,
          nativeTokenValue: 0,
          transactionData: "0x"
        }];
      }
      const tos = executions.map((p) => p.toAddress);
      const values = executions.map((p) => p.nativeTokenValue);
      const datas = executions.map((p) => p.transactionData);
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "propose",
        args: [tos, values, datas, description],
        parse: (receipt) => {
          const event = this.contractWrapper.parseLogs("ProposalCreated", receipt?.logs);
          return {
            id: event[0].args.proposalId,
            receipt
          };
        }
      });
    }));
    _defineProperty(this, "vote", buildTransactionFunction(async function(proposalId, voteType) {
      let reason = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
      await _this.ensureExists(proposalId);
      return Transaction.fromContractWrapper({
        contractWrapper: _this.contractWrapper,
        method: "castVoteWithReason",
        args: [proposalId, voteType, reason]
      });
    }));
    _defineProperty(this, "execute", buildTransactionFunction(async (proposalId) => {
      await this.ensureExists(proposalId);
      const proposal = await this.get(proposalId);
      const tos = proposal.executions.map((p) => p.toAddress);
      const values = proposal.executions.map((p) => p.nativeTokenValue);
      const datas = proposal.executions.map((p) => p.transactionData);
      const descriptionHash = id(proposal.description);
      return Transaction.fromContractWrapper({
        contractWrapper: this.contractWrapper,
        method: "execute",
        args: [tos, values, datas, descriptionHash]
      });
    }));
    this._chainId = chainId;
    this.abi = AbiSchema.parse(abi || []);
    this.contractWrapper = contractWrapper;
    this.storage = storage;
    this.metadata = new ContractMetadata(this.contractWrapper, VoteContractSchema, this.storage);
    this.app = new ContractAppURI(this.contractWrapper, this.metadata, this.storage);
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
   * Get a proposal by id.
   *
   * @param proposalId - The proposal id to get.
   * @returns - The proposal.
   */
  async get(proposalId) {
    const all = await this.getAll();
    const proposals = all.filter((p) => p.proposalId.eq(BigNumber.from(proposalId)));
    if (proposals.length === 0) {
      throw new Error("proposal not found");
    }
    return proposals[0];
  }
  /**
   * Get All Proposals
   *
   * @remarks Get all the proposals in this contract.
   *
   * @example
   * ```javascript
   * const proposals = await contract.getAll();
   * console.log(proposals);
   * ```
   *
   * @returns - All the proposals in the contract.
   */
  async getAll() {
    return Promise.all((await this.contractWrapper.readContract.getAllProposals()).map(async (data) => ({
      proposalId: data.proposalId,
      proposer: data.proposer,
      description: data.description,
      startBlock: data.startBlock,
      endBlock: data.endBlock,
      state: await this.contractWrapper.readContract.state(data.proposalId),
      votes: await this.getProposalVotes(data.proposalId),
      executions: data[3].map((c, i) => ({
        toAddress: data.targets[i],
        nativeTokenValue: c,
        transactionData: data.calldatas[i]
      }))
    })));
  }
  /**
   * Get the votes for a specific proposal
   * @param proposalId - the proposalId
   */
  async getProposalVotes(proposalId) {
    const votes = await this.contractWrapper.readContract.proposalVotes(proposalId);
    return [{
      type: VoteType.Against,
      label: "Against",
      count: votes.againstVotes
    }, {
      type: VoteType.For,
      label: "For",
      count: votes.forVotes
    }, {
      type: VoteType.Abstain,
      label: "Abstain",
      count: votes.abstainVotes
    }];
  }
  /**
   * Check If Wallet Voted
   *
   * @remarks Check if a specified wallet has voted a specific proposal
   *
   * @example
   * ```javascript
   * // The proposal ID of the proposal you want to check
   * const proposalId = "0";
   * // The address of the wallet you want to check to see if they voted
   * const address = "{{wallet_address}}";
   *
   * await contract.hasVoted(proposalId, address);
   * ```
   *
   * @param proposalId - The unique identifier of a proposal .
   * @param account - (optional) wallet account address. Defaults to connected signer.
   * @returns - True if the account has already voted on the proposal.
   */
  async hasVoted(proposalId, account) {
    if (!account) {
      account = await this.contractWrapper.getSignerAddress();
    }
    return this.contractWrapper.readContract.hasVoted(proposalId, await resolveAddress(account));
  }
  /**
   * Can Execute
   *
   * @remarks Check if a proposal can be executed (if the proposal has succeeded).
   *
   * @example
   * ```javascript
   * // The proposal ID of the proposal you want to check
   * const proposalId = "0";
   * const canExecute = await contract.canExecute(proposalId);
   * console.log(canExecute);
   * ```
   *
   * @param proposalId - The proposal ID to check.
   * @returns - True if the proposal can be executed, false otherwise.
   */
  async canExecute(proposalId) {
    await this.ensureExists(proposalId);
    const proposal = await this.get(proposalId);
    const tos = proposal.executions.map((p) => p.toAddress);
    const values = proposal.executions.map((p) => p.nativeTokenValue);
    const datas = proposal.executions.map((p) => p.transactionData);
    const descriptionHash = id(proposal.description);
    try {
      await this.contractWrapper.callStatic().execute(tos, values, datas, descriptionHash);
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   * Check the balance of the project wallet in the native token of the chain
   *
   * @returns - The balance of the project in the native token of the chain
   */
  async balance() {
    const balance = await this.contractWrapper.readContract.provider.getBalance(this.contractWrapper.readContract.address);
    return {
      name: "",
      symbol: "",
      decimals: 18,
      value: balance,
      displayValue: formatUnits(balance, 18)
    };
  }
  /**
   * Check the balance of the project wallet in a particular
   * ERC20 token contract
   *
   * @returns - The balance of the project in the native token of the chain
   */
  async balanceOfToken(tokenAddress) {
    const erc20 = new Contract(await resolveAddress(tokenAddress), ERC20Abi, this.contractWrapper.getProvider());
    return await fetchCurrencyValue(this.contractWrapper.getProvider(), tokenAddress, await erc20.balanceOf(this.contractWrapper.readContract.address));
  }
  /**
   * Find a proposal by its id.
   *
   * @internal
   * @param proposalId - Proposal to check for
   */
  async ensureExists(proposalId) {
    try {
      await this.contractWrapper.readContract.state(proposalId);
    } catch (e) {
      throw Error(`Proposal ${proposalId} not found`);
    }
  }
  /**
   * Get the Vote contract configuration
   */
  async settings() {
    const [votingDelay, votingPeriod, votingTokenAddress, votingQuorumFraction, proposalTokenThreshold] = await Promise.all([this.contractWrapper.readContract.votingDelay(), this.contractWrapper.readContract.votingPeriod(), this.contractWrapper.readContract.token(), this.contractWrapper.readContract["quorumNumerator()"](), this.contractWrapper.readContract.proposalThreshold()]);
    const votingTokenMetadata = await fetchCurrencyMetadata(this.contractWrapper.getProvider(), votingTokenAddress);
    return {
      votingDelay: votingDelay.toString(),
      votingPeriod: votingPeriod.toString(),
      votingTokenAddress,
      votingTokenMetadata,
      votingQuorumFraction: votingQuorumFraction.toString(),
      proposalTokenThreshold: proposalTokenThreshold.toString()
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
}
export {
  Vote
};
