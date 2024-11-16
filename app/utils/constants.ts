import { Network, Alchemy } from "alchemy-sdk";
import { ethers } from "ethers";

export const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
export const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;

const settings = {
  apiKey: ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_SEPOLIA, // Replace with your network.
};
export const alchemy = new Alchemy(settings);

export const usdcContractAddress = "0xF8457f287518937962E1E825a07E1a25614D7b95";
export const marketContractAddress =
  "0xff4d7AF6Dd5de6768aD08202a873D1E93ef6112c";
export const alchemyUrl = `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

export const provider = new ethers.JsonRpcProvider(alchemyUrl);

// Create a wallet instance from private key (use the wallet with USDC)
export const wallet = new ethers.Wallet(PRIVATE_KEY as string, provider);
