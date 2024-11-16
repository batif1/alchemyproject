"use client";

import React, { useState } from "react";

interface Market {
  id: number;
  question: string;
  odds: string;
}

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
      question: "Will Tesla stock price exceed $1000 this quarter?",
      odds: "Yes: 55%, No: 45%",
    },
  ];

  // State to manage cash amounts for each market
  const [cashAmounts, setCashAmounts] = useState<Record<number, string>>({});

  // Handle cash input change
  const handleCashChange = (marketId: number, value: string) => {
    setCashAmounts({
      ...cashAmounts,
      [marketId]: value,
    });
  };

  // Handle "Yes" and "No" button clicks
  const handleBet = (market: Market, betType: "Yes" | "No") => {
    const amount = cashAmounts[market.id] || "0";
    console.log(`Bet: ${betType} | Market: ${market.question} | Amount: $${amount}`);
    alert(`You placed a ${betType} bet of $${amount} on "${market.question}"`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
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
