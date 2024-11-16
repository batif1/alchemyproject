import { alchemy } from "../utils/constants";

export const getTokenBalance = async (
  user_address: string,
  contract_address: string
) => {
  return await alchemy.core.getTokenBalances(user_address, [contract_address]);
};
