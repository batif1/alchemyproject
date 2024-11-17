"use client";

import { useState } from "react";
import "./Navbar.css";
import { useAlchemyAuth } from "../context/AlchemyAuthContext";

export default function Navbar() {
  // Use context to get user details, logout function, auth modal, and USDC balance
  const { user, logout, openAuthModal, usdcBalance, refreshUsdcBalance } =
    useAlchemyAuth();
  const [copySuccess, setCopySuccess] = useState<string>("");

  // Function to copy the address
  const handleCopyAddress = async () => {
    if (user?.address) {
      await navigator.clipboard.writeText(user.address);
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000); // Clear message after 2 seconds
    }
  };

  // Function to refresh USDC balance manually
  const handleRefreshBalance = async () => {
    await refreshUsdcBalance();
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Parity</div>

      {user ? (
        <div className="navbar-profile">
          <div className="navbar-item">
            <strong>Address:</strong> {user?.address?.slice(0, 6)}...
            {user.address?.slice(-4)}
            <button
              className="copy-button"
              onClick={handleCopyAddress}
              title="Copy Address"
            >
              📋
            </button>
            {copySuccess && <span className="copy-success">{copySuccess}</span>}
          </div>

          <div className="navbar-item">
            <strong>USDC Balance:</strong> {usdcBalance}
            <button
              className="refresh-button"
              onClick={handleRefreshBalance}
              title="Refresh Balance"
            >
              🔄
            </button>
          </div>

          <button onClick={logout} className="navbar-logout">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={openAuthModal} className="navbar-login">
          Login
        </button>
      )}
    </nav>
  );
}
