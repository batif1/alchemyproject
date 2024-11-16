import { ethers } from "ethers";
import {
  marketContractAddress,
  wallet,
  usdcContractAddress,
} from "../utils/constants";
import { useSigner } from "@account-kit/react";
// ABI of the USDC contract (for the approve function)
const usdcAbi = [
  "function approve(address spender, uint256 amount) public returns (bool)",
  "function balanceOf(address account) public view returns (uint256)",
];

// Create an instance of the USDC contract
const usdcContract = new ethers.Contract(usdcContractAddress, usdcAbi, wallet);

// Call the approve function
export const approveUSDC = async (amount: number) => {
  try {
    const amountToApprove = ethers.parseUnits(amount.toString(), 6);

    console.log(
      `Approving ${amountToApprove.toString()} USDC for ${marketContractAddress}`
    );

    // Call the approve function on the USDC contract
    const tx = await usdcContract.approve(
      marketContractAddress,
      amountToApprove
    );

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log(`Approval transaction successful: ${receipt.transactionHash}`);
  } catch (error) {
    console.error("Error approving USDC transfer:", error);
  }
};

export const getBalanceOf = async (userAddress: string) => {
  const userBalance = await usdcContract.balanceOf(userAddress);
  // console.log(`User balance: ${ethers.formatUnits(userBalance, 6)} USDC`);
  return ethers.formatUnits(userBalance, 6);
};
