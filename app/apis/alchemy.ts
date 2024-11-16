import { alchemy } from "../utils/constants";

export const getTokenBalance = async (
  user_address: string,
  contract_address: string
) => {
  console.log(user_address, contract_address);
  try {
    return await alchemy.core.getTokenBalances(user_address, [
      contract_address,
    ]);
  } catch (error) {
    console.log(error);
    return null;
  }
};
