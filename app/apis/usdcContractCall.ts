import { ethers } from "ethers";
import {
  marketContractAddress,
  wallet,
  usdcContractAddress,
} from "../utils/constants";
import { Signer } from "ethers";

// ABI of the USDC contract (for the approve function)
export const usdcAbi = [
  "function approve(address spender, uint256 amount) public returns (bool)",
  "function balanceOf(address account) public view returns (uint256)",
  "function transfer(address to, uint256 value) public returns (bool)",
];

export const approveUSDC = async (
  amount: number,
  signer: Signer
): Promise<void> => {
  try {
    // Create an instance of the USDC contract
    const usdcContract = new ethers.Contract(
      usdcContractAddress,
      usdcAbi,
      signer
    );

    // Convert amount to USDC's smallest units (6 decimals)
    const amountToApprove = ethers.parseUnits(amount.toString(), 6);

    console.log(
      `Approving ${amountToApprove.toString()} USDC for market contract at: ${marketContractAddress}`
    );

    // Call the approve function on the USDC contract
    const tx = await usdcContract.approve(
      marketContractAddress,
      amountToApprove
    );

    // Wait for the transaction to be confirmed
    const receipt = await tx.wait();
    console.log(`Approval transaction successful: ${receipt.transactionHash}`);
  } catch (error) {
    console.error("Error during USDC approval:", error);
    throw error;
  }
};

// export const approveUSDC = async (
//   amount: number,
//   signer = wallet
// ): Promise<void> => {
//   try {
//     // Create an instance of the USDC contract
//     const usdcContract = new ethers.Contract(
//       usdcContractAddress,
//       usdcAbi,
//       signer
//     );

//     // Convert amount to USDC's smallest units (6 decimals)
//     const amountToApprove = ethers.parseUnits(amount.toString(), 6);

//     console.log(
//       `Approving ${amountToApprove.toString()} USDC for market contract at: ${marketContractAddress}`
//     );

//     // Call the approve function on the USDC contract
//     const tx = await usdcContract.approve(
//       marketContractAddress,
//       amountToApprove
//     );

//     // Wait for the transaction to be confirmed
//     const receipt = await tx.wait();
//     console.log(`Approval transaction successful: ${receipt.transactionHash}`);
//   } catch (error) {
//     console.error("Error during USDC approval:", error);
//     throw error;
//   }
// };

export const getBalanceOf = async (userAddress: string) => {
  const usdcContract = new ethers.Contract(
    usdcContractAddress,
    usdcAbi,
    wallet
  );
  const userBalance = await usdcContract.balanceOf(userAddress);
  // console.log(`User balance: ${ethers.formatUnits(userBalance, 6)} USDC`);
  return ethers.formatUnits(userBalance, 6);
};
