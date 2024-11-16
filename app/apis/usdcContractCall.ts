import { ethers } from "ethers";
import {
  marketContractAddress,
  wallet,
  usdcContractAddress,
} from "../utils/constants";
import { Signer } from "ethers";

// ABI of the USDC contract (for the approve function)

export const usdcAbi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
//  [
//   "function approve(address spender, uint256 amount) public returns (bool)",
//   "function balanceOf(address account) public view returns (uint256)",
//   "function transfer(address to, uint256 value) public returns (bool)",
// ];

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
