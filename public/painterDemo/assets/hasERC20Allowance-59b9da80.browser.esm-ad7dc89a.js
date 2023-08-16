import { a_ as ContractWrapper, ca as ERC20Abi } from "./index-0d430626.js";
async function hasERC20Allowance(contractToApprove, currencyAddress, value) {
  const provider = contractToApprove.getProvider();
  const erc20 = new ContractWrapper(provider, currencyAddress, ERC20Abi, {});
  const owner = await contractToApprove.getSignerAddress();
  const spender = contractToApprove.readContract.address;
  const allowance = await erc20.readContract.allowance(owner, spender);
  return allowance.gte(value);
}
export {
  hasERC20Allowance as h
};
