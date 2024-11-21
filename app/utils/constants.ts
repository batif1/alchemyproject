import { Network, Alchemy } from "alchemy-sdk";
import { ethers } from "ethers";

export const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
export const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;

const settings = {
  apiKey: ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_SEPOLIA, // Replace with your network.
};
export const alchemy = new Alchemy(settings);

export const usdcContractAddress = "0x3Da67eFCeb61a04E72BE2285caA3f6E77368e80E";
export const marketContractAddress =
  "0xFEaA1A19D7Fc4aA700b428061de8dAA06F85bCC4";
export const alchemyUrl = `https://arb-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

export const provider = new ethers.JsonRpcProvider(alchemyUrl);

// Create a wallet instance from private key (use the wallet with USDC)
export const wallet = new ethers.Wallet(PRIVATE_KEY as string, provider);
