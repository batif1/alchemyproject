import { ethers } from "ethers";
import { marketContractAddress, wallet } from "../utils/constants";

// ABI of the USDC contract (for the approve function)
export const abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_usdc",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "betId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "donationAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
    ],
    name: "BetCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "betId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "betOnYes",
        type: "bool",
      },
    ],
    name: "BetPlaced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "betId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "outcome",
        type: "bool",
      },
    ],
    name: "BetResolved",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "betId",
        type: "uint256",
      },
    ],
    name: "claimWinnings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "address",
        name: "donationAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
    ],
    name: "createBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "betId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "betOnYes",
        type: "bool",
      },
    ],
    name: "placeBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "betId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "outcome",
        type: "bool",
      },
    ],
    name: "resolveBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "betId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "WinningsClaimed",
    type: "event",
  },
  {
    inputs: [],
    name: "betCounter",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "bets",
    outputs: [
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "yesPool",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "noPool",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalPool",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isResolved",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "outcome",
        type: "bool",
      },
      {
        internalType: "address",
        name: "donationAddress",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "donationFee",
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
        internalType: "uint256",
        name: "betId",
        type: "uint256",
      },
    ],
    name: "getBetDetails",
    outputs: [
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "yesPool",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "noPool",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalPool",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isResolved",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "outcome",
        type: "bool",
      },
      {
        internalType: "address",
        name: "donationAddress",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minimumParticipation",
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
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "platformFee",
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
    name: "usdc",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userWinnings",
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
];

// Create an instance of the USDC contract
const marketContract = new ethers.Contract(marketContractAddress, abi, wallet);

export async function createBet(
  description: string,
  donationAddress: string,
  endTime: number
) {
  const tx = await marketContract.createBet(
    description,
    donationAddress,
    endTime
  );
  await tx.wait();
  console.log("Bet created:", tx.hash);
}

// Place a bet
export async function placeBet(
  betId: number,
  amount: number,
  betOnYes: boolean
) {
  const tx = await marketContract.placeBet(betId, amount, betOnYes);
  await tx.wait();
  console.log("Bet placed:", tx.hash);
}

// Resolve a bet
export async function resolveBet(betId: number, outcome: boolean) {
  const tx = await marketContract.resolveBet(betId, outcome);
  await tx.wait();
  console.log("Bet resolved:", tx.hash);
}

// Claim winnings
export async function claimWinnings(betId: number) {
  const tx = await marketContract.claimWinnings(betId);
  await tx.wait();
  console.log("Winnings claimed:", tx.hash);
}

// Get bet details
export async function getBetDetails(betId: number) {
  const details = await marketContract.getBetDetails(betId);
  console.log("Bet details:", details);
  return details;
}

// Get the minimum participation amount
export async function getMinimumParticipation() {
  const minParticipation = await marketContract.minimumParticipation();
  console.log("Minimum participation:", minParticipation);
  return minParticipation;
}

// Get the platform fee
export async function getPlatformFee() {
  const fee = await marketContract.platformFee();
  console.log("Platform fee:", fee);
  return fee;
}

// Get the USDC token address (IERC20 contract)
export async function getUsdcAddress() {
  const usdcAddress = await marketContract.usdc();
  console.log("USDC address:", usdcAddress);
  return usdcAddress;
}

// Get user winnings for a specific bet
export async function getUserWinnings(userAddress: string, betId: number) {
  const winnings = await marketContract.userWinnings(userAddress, betId);
  console.log("User winnings:", winnings);
  return winnings;
}

// Get the current bet counter
export async function getBetCounter(): Promise<number> {
  const counter = await marketContract.betCounter();
  return parseInt(counter.toString());
}

// Get the current donation fee
export async function getDonationFee() {
  const fee = await marketContract.donationFee();
  console.log("Donation fee:", fee);
  return fee;
}

// Get bet information by betId
export async function getBetInfo(betId: number) {
  const betInfo = await marketContract.bets(betId);
  console.log("Bet info:", betInfo);
  return betInfo;
}

// Get the contract's owner address
export async function getOwner() {
  const owner = await marketContract.owner();
  console.log("Contract owner:", owner);
  return owner;
}
