"use client";

import { useAuthModal, useLogout, useUser } from "@account-kit/react";
import { useEffect, useState } from "react";
import { getTokenBalance } from "../apis/alchemy";
import "./UserComponent.css";
import { usdcContractAddress } from "../utils/constants";

export default function UserComponent() {
  const user = useUser();
  const { logout } = useLogout();
  const [usdcBalance, setUsdcBalance] = useState<string | null>("Loading...");

  // Fetch the balance on mount and when user address changes
  useEffect(() => {
    (async () => {
      if (user?.address) {
        const balance = await getTokenBalance(
          user.address as string,
          usdcContractAddress
        );
        setUsdcBalance(balance);
      }
    })();
  }, [user?.address]);

  return (
    <div className="user-component">
      <h1>Welcome to Your Dashboard</h1>
      {user ? (
        <>
          <p>
            <strong>Wallet Address:</strong> {user?.address || "Unknown"}
          </p>
          <p>
            <strong>USDC Balance:</strong> {usdcBalance}
          </p>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </>
      ) : (
        <p>Please log in to view your account information.</p>
      )}
    </div>
  );
}
