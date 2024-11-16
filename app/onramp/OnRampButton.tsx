import { useState } from "react";
import { ethers } from "ethers";
import { useSigner } from "@account-kit/react";
import { useSmartAccountClient } from "@account-kit/react"; // Adjust to your actual SDK import
import { usdcAbi } from "../apis/usdcContractCall";
import { usdcContractAddress, wallet } from "../utils/constants";
import { useAlchemyAuth } from "../context/AlchemyAuthContext";

const OnRampButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { user, logout, openAuthModal, usdcBalance, refreshUsdcBalance } =
    useAlchemyAuth();

  // Getting the signer (EOA address)
  const signer = useSigner();
  const { client } = useSmartAccountClient({ type: "LightAccount" });

  // Define the USDC transfer function
  const transferUSDC = async () => {
    if (!signer) {
      setMessage("Please connect your wallet.");
      return;
    }

    setIsLoading(true);
    try {
      // Create USDC contract instance
      const usdcContract = new ethers.Contract(
        usdcContractAddress,
        usdcAbi,
        wallet
      );

      // Check if the user already has 10 USDC

      if (parseInt(usdcBalance) > 10) {
        setMessage("You already have 10 USDC.");
        setIsLoading(false);
        return;
      }

      // If balance is less than 10 USDC, transfer 10 USDC from EOA to Smart Account
      const transferAmount = ethers.parseUnits("10", 6); // 10 USDC

      const tx = await usdcContract.transfer(user.address, transferAmount);
      setMessage("Transaction sent. Please wait...");
      await tx.wait(); // Wait for the transaction to be mined

      setMessage(
        "10 USDC has been successfully transferred to your smart account."
      );
    } catch (error) {
      console.error(error);
      setMessage("Error during the transaction.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={transferUSDC} disabled={isLoading}>
        {isLoading ? "Loading..." : "On Ramp"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OnRampButton;
