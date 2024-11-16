"use client";

import React, { useEffect, useState } from "react";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";
import { getBetCounter } from "../apis/marketContract";
import BetComponent from "./BetComponent";
import { getTokenBalance } from "../apis/alchemy";
import { usdcContractAddress } from "../utils/constants";
// import UserComponent from "./UserComponent";

export default function DashboardPage() {
  const [cashAmounts, setCashAmounts] = useState<Record<number, string>>({});
  const [betCount, setBetCount] = useState(0);
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();
  const [usdc, setUsdc] = useState(0);

  useEffect(() => {
    (async () => {
      setBetCount(await getBetCounter());
      if (user?.address) {
        console.log(
          await getTokenBalance(user?.address as string, usdcContractAddress)
        );
        // console.log(await getBalanceOf(user?.address as string));
      }
    })();
  }, [user?.address]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Markets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* {betCount} */}
        {Array.from({ length: betCount }).map((_, index) => {
          return <BetComponent key={index} betId={index + 1} />;
        })}
      </div>
    </div>
  );
}
