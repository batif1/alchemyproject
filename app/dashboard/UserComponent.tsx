"use client";

import { useAuthModal, useLogout, useUser } from "@account-kit/react";
import { useEffect, useState } from "react";
import { getTokenBalance } from "../apis/alchemy";
import "./UserComponent.css";
import { usdcContractAddress } from "../utils/constants";

export default function UserComponent() {
  const user = useUser();
  const { logout } = useLogout();
  const { openAuthModal } = useAuthModal();
  const [usdcBalance, setUsdcBalance] = useState<string>("Loading...");
  const [copySuccess, setCopySuccess] = useState<string>("");

  // Fetch the balance on mount and when user address changes
  useEffect(() => {
    (async () => {
      if (user?.address) {
        const balance = await getTokenBalance(
          user.address as string,
          usdcContractAddress
        );
        setUsdcBalance(balance || "0");
      } else {
        setUsdcBalance("N/A");
      }
    })();
  }, [user?.address]);

  // Function to copy the address
  const handleCopyAddress = async () => {
    if (user?.address) {
      await navigator.clipboard.writeText(user.address);
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000); // Clear message after 2 seconds
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Title</div>

      {user ? (
        <div className="navbar-profile">
          <div className="navbar-item">
            <strong>Address:</strong> {user.address.slice(0, 6)}...
            {user.address.slice(-4)}
            <button
              className="copy-button"
              onClick={handleCopyAddress}
              title="Copy Address"
            >
              📋
            </button>
            {copySuccess && <span className="copy-success">{copySuccess}</span>}
          </div>
          <p className="navbar-item">
            <strong>USDC:</strong> {usdcBalance}
          </p>
          <button onClick={logout} className="navbar-logout">
            Logout
          </button>
        </div>
      ) : (
        // <button onClick={openAuthModal} className="navbar-login">
        //   Login
        // </button>\
        <p> Login please</p>
      )}
    </nav>
  );
}
