"use client";

import React, { useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, // Use environment variable
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

interface Market {
  id: number;
  question: string;
  odds: string;
}

export default function DashboardPage() {
  const markets: Market[] = [
    { id: 1, question: "Will Bitcoin reach $50k by the end of the year?", odds: "Yes: 60%, No: 40%" },
    { id: 2, question: "Will it rain in Bangkok tomorrow?", odds: "Yes: 70%, No: 30%" },
    { id: 3, question: "Will Tesla stock price exceed $1000 this quarter?", odds: "Yes: 55%, No: 45%" },
  ];

  const [cashAmounts, setCashAmounts] = useState<Record<number, string>>({});
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  const handleCashChange = (marketId: number, value: string) => {
    setCashAmounts({ ...cashAmounts, [marketId]: value });
  };

  const handleBet = async (market: Market, betType: "Yes" | "No") => {
    const amount = cashAmounts[market.id] || "0";

    if (!user?.address) {
      alert("Wallet address is not available. Please log in.");
      return;
    }

    try {
      const ownerAddr = user.address;
      const balances = await alchemy.core.getTokenBalances(ownerAddr, [
        "0x607f4c5bb672230e8672085532f7e901544a7375",
      ]);

      const balance = parseFloat(balances.tokenBalances[0]?.tokenBalance || "0");

      if (parseFloat(amount) > balance) {
        alert("Insufficient funds for this bet!");
        return;
      }

      const metadata = await alchemy.core.getTokenMetadata(
        "0x607f4c5bb672230e8672085532f7e901544a7375"
      );

      console.log("Token Balances:", balances);
      console.log("Token Metadata:", metadata);

      alert(`You placed a ${betType} bet of $${amount} on "${market.question}"`);
    } catch (error) {
      console.error("Error fetching token balances or metadata:", error);
      alert("An error occurred while fetching token data.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Betting Markets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.map((market) => (
          <div key={market.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-2">{market.question}</h2>
            <p className="text-gray-700 mb-4">{market.odds}</p>
            <input
              type="number"
              placeholder="Enter Amount ($)"
              value={cashAmounts[market.id] || ""}
              onChange={(e) => handleCashChange(market.id, e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <div className="flex gap-4">
              <button
                onClick={() => handleBet(market, "Yes")}
                className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
              >
                Yes
              </button>
              <button
                onClick={() => handleBet(market, "No")}
                className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
              >
                No
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
