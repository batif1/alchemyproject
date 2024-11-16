import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getBetDetails } from "../apis/marketContract";
import { formatLocalTimestamp } from "../utils/time";
import { useSigner, useUser } from "@account-kit/react";
import { approveUSDC, usdcAbi } from "../apis/usdcContractCall";
import {
  type UseSendUserOperationResult,
  useSendUserOperation,
  useSmartAccountClient,
} from "@account-kit/react";
import { marketContractAddress, usdcContractAddress } from "../utils/constants";
import { encodeFunctionData } from "viem";

const BetComponent = ({ betId }: { betId: number }) => {
  const signer = useSigner();
  const user = useUser();
  const { client, address } = useSmartAccountClient({
    type: "LightAccount",
  });
  const { sendUserOperationAsync } = useSendUserOperation({
    client,
  });

  // Ensure client is defined before using it
  if (!client) {
    console.error("Smart account client is not defined.");
  }

  const approveUSDC = async (amount: number) => {
    try {
      if (!client) {
        console.error("Client is not initialized.");
        return;
      }
      // Send the user operation
      const res = await sendUserOperationAsync({
        uo: {
          target: usdcContractAddress,
          data: encodeFunctionData({
            abi: usdcAbi,
            functionName: "approve",
            args: [
              marketContractAddress,
              BigInt(ethers.parseUnits(amount.toString(), 6)),
            ],
          }),
        },
      });

      console.log(res);
    } catch (error) {
      console.error("Error during USDC approval:", error);
    }
  };

  const [market, setMarket] = useState<{
    description: string;
    yesPool: number;
    noPool: number;
    totalPool: number;
    endTime: number;
    isResolved: boolean;
    outcome: boolean;
    donationAddress: string;
  } | null>(null);

  const [cashAmounts, setCashAmounts] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchBetDetails = async () => {
      try {
        const details = await getBetDetails(betId);
        setMarket({
          description: details[0],
          yesPool: details[1],
          noPool: details[2],
          totalPool: details[3],
          endTime: details[4],
          isResolved: details[5],
          outcome: details[6],
          donationAddress: details[7],
        });
      } catch (error) {
        console.error("Error fetching bet details:", error);
      }
    };

    fetchBetDetails();
  }, [betId]);

  const handleCashChange = (betId: number, value: string) => {
    setCashAmounts((prev) => ({
      ...prev,
      [betId]: value,
    }));
  };

  const handleBetApproval = async (betAmount: number) => {
    try {
      if (!signer) {
        console.error("No signer available, redirecting to login");
        return;
      }

      console.log(`Attempting to approve ${betAmount} USDC`);
      await approveUSDC(betAmount);
      console.log("USDC approved successfully, proceed with placing the bet.");
    } catch (error) {
      console.error("Bet approval failed:", error);
    }
  };

  const handleBet = async (betId: number, market: any, outcome: string) => {
    // Implement bet handling logic here, interact with the contract to place the bet

    console.log(`Placing bet on ${outcome} for market:`, market);
    handleBetApproval(parseInt(cashAmounts[betId]));
  };

  if (!market) {
    return <div>Loading...</div>;
  }

  return (
    <div
      key={betId}
      className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
    >
      {/* Question */}
      <h2 className="text-lg font-semibold mb-2">{market.description}</h2>
      {/* end time */}
      <p>End: {formatLocalTimestamp(market.endTime.toString())}</p>
      {/* Odds */}
      <p className="text-gray-700 mb-4">
        Yes Pool: {ethers.formatUnits(market.yesPool, 6)} USDC | No Pool:{" "}
        {ethers.formatUnits(market.noPool, 6)} USDC
      </p>
      {/* Cash Amount Input */}
      <input
        type="number"
        placeholder="Enter Amount ($)"
        value={cashAmounts[betId] || ""}
        onChange={(e) => handleCashChange(betId, e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />

      {/* Yes and No Buttons */}
      <div className="flex gap-4">
        <button
          disabled={market.isResolved}
          onClick={() => handleBet(betId, market, "Yes")}
          className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
        >
          Yes
        </button>
        <button
          disabled={market.endTime > Date.now()}
          onClick={() => handleBet(betId, market, "No")}
          className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default BetComponent;
