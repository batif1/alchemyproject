"use client";

import React, { useState } from "react";
import { ALCHEMY_API_KEY } from "../utils/constants";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: ALCHEMY_API_KEY, // Replace with your Alchemy API Key. - DONE
  network: Network.ETH_MAINNET, // Replace with your network.
};

import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";

interface Market {
  id: number;
  question: string;
  odds: string;
}

const alchemy = new Alchemy(settings);

export default function DashboardPage() {
  // Example data for the cards
  const markets: Market[] = [
    {
      id: 1,
      question: "Will Bitcoin reach $50k by the end of the year?",
      odds: "Yes: 60%, No: 40%",
    },
    {
      id: 2,
      question: "Will it rain in Bangkok tomorrow?",
      odds: "Yes: 70%, No: 30%",
    },
    {
      id: 3,
      question: "Will Tesla stonnnnk price exceed $1000 this quarter?",
      odds: "Yes: 55%, No: 45%",
    },
  ];

  // State to manage cash amounts for each market
  const [cashAmounts, setCashAmounts] = useState<Record<number, string>>({});
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();
  // Handle cash input change
  const handleCashChange = (marketId: number, value: string) => {
    setCashAmounts({
      ...cashAmounts,
      [marketId]: value,
    });
  };

  // Handle "Yes" and "No" button clicks
  const handleBet = async (market: Market, betType: "Yes" | "No") => {
    const amount = cashAmounts[market.id] || "0";
    console.log(
      `Bet: ${betType} | Market: ${market.question} | Amount: $${amount}`
    );
    //IMPORTANT: IF amount > walletValue, say insufficient funds!

    // The wallet address / token we want to query for:
    const ownerAddr = user?.address;
    const balances = await alchemy.core.getTokenBalances(ownerAddr as string, [
      "0x607f4c5bb672230e8672085532f7e901544a7375",
    ]);

    // The token address we want to query for metadata:
    const metadata = await alchemy.core.getTokenMetadata(
      "0x607f4c5bb672230e8672085532f7e901544a7375"
    );

    //TOKEN BALANCES = TOKEN OWNERSHIP
    console.log("Token Balances:");
    console.log(balances);
    console.log("Token Metadata: ");
    console.log(metadata);
    user?.address;

    alert(`You placed a ${betType} bet of $${amount} on "${market.question}"`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Introduction Section */}

      <div className="mb-10 bg-white shadow-md rounded-lg p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Equilibrium</h1>
        <p className="text-lg text-gray-700 mb-4">
          Equilibrium is a betting platform with a purpose. Make bets on topics
          that matter, from financial trends to global events, and contribute to
          meaningful causes. Whether you win or lose, your participation helps
          raise awareness and drive positive change.
        </p>
        <p className="text-gray-600">
          Join us in bridging divides, creating impact, and having fun while
          doing it!
        </p>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6">Betting Markets</h1>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.map((market) => (
          <div
            key={market.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
          >
            {/* Question */}
            <h2 className="text-lg font-semibold mb-2">{market.question}</h2>

            {/* Odds */}
            <p className="text-gray-700 mb-4">{market.odds}</p>

            {/* Cash Amount Input */}
            <input
              type="number"
              placeholder="Enter Amount ($)"
              value={cashAmounts[market.id] || ""}
              onChange={(e) => handleCashChange(market.id, e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />

            {/* Yes and No Buttons */}
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
