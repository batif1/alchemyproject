import { ethers } from "ethers";
import { alchemy } from "../utils/constants";

export const getTokenBalance = async (
  user_address: string,
  contract_address: string
) => {
  try {
    const result = await alchemy.core.getTokenBalances(user_address, [
      contract_address,
    ]);
    return ethers.formatUnits(
      BigInt(result.tokenBalances[0].tokenBalance as string),
      6
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};
