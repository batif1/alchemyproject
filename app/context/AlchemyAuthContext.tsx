"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";
import { getTokenBalance } from "../apis/alchemy";
import { usdcContractAddress } from "../utils/constants";

// Define the context type
interface AlchemyAuthContextType {
  user: any;
  openAuthModal: () => void;
  logout: () => void;
  isInitializing: boolean;
  isLoggedIn: boolean;
  usdcBalance: string;
  refreshUsdcBalance: () => Promise<void>;
}

// Create the context
const AlchemyAuthContext = createContext<AlchemyAuthContextType | undefined>(
  undefined
);

// Provider component
export const AlchemyAuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  const [usdcBalance, setUsdcBalance] = useState<string>("Loading...");

  const isLoggedIn = Boolean(user);
  const isInitializing = signerStatus.isInitializing;

  // Function to fetch the USDC balance
  const fetchUsdcBalance = async () => {
    if (user?.address) {
      const balance = await getTokenBalance(
        user.address as string,
        usdcContractAddress
      );
      setUsdcBalance(balance || "0");
    } else {
      setUsdcBalance("N/A");
    }
  };

  // Refresh balance function for manual refresh
  const refreshUsdcBalance = async () => {
    await fetchUsdcBalance();
  };

  // Fetch the balance when user logs in or their address changes
  useEffect(() => {
    if (isLoggedIn) {
      fetchUsdcBalance();
    }
  }, [user?.address, isLoggedIn]);

  const value = {
    user,
    openAuthModal,
    logout,
    isLoggedIn,
    isInitializing,
    usdcBalance,
    refreshUsdcBalance,
  };

  return (
    <AlchemyAuthContext.Provider value={value}>
      {children}
    </AlchemyAuthContext.Provider>
  );
};

// Custom hook to use AlchemyAuthContext
export const useAlchemyAuth = () => {
  const context = useContext(AlchemyAuthContext);
  if (!context) {
    throw new Error(
      "useAlchemyAuth must be used within an AlchemyAuthProvider"
    );
  }
  return context;
};
