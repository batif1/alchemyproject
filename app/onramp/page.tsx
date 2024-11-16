"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";

// Dynamically import MoonPayProvider and MoonPayBuyWidget to avoid SSR issues
const MoonPayProvider = dynamic(
  () => import("@moonpay/moonpay-react").then((mod) => mod.MoonPayProvider),
  { ssr: false }
);

const MoonPayBuyWidget = dynamic(
  () => import("@moonpay/moonpay-react").then((mod) => mod.MoonPayBuyWidget),
  { ssr: false }
);



const handleGetSignature = async (url: string): Promise<string> => {
  try {
    const response = await fetch(`/api/sign-url?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch signature");
    }
    const data = await response.json();
    return data.signature;
  } catch (error) {
    console.error("Error signing URL:", error);
    throw error;
  }
};

export default function Onramp() {
  const [visible, setVisible] = useState(false);
  const [showDashboardButton, setShowDashboardButton] = useState(false);

  // Show the button after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDashboardButton(true);
    }, 30000); // 30 seconds in milliseconds
    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <MoonPayProvider
      apiKey="pk_test_123" // Replace with your actual MoonPay API key
      debug
    >
      <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center relative">
        <h1 className="text-2xl font-bold">MoonPay Onramp</h1>
        <button
          className="btn btn-secondary mt-6"
          onClick={() => setVisible(!visible)}
        >
          {visible ? "Hide MoonPay Widget" : "Show MoonPay Widget"}
        </button>

        {/* MoonPay Buy Widget */}
        {visible && (
          <MoonPayBuyWidget
            variant="overlay"
            baseCurrencyCode="usd"
            baseCurrencyAmount="100"
            defaultCurrencyCode="eth"
            visible={true} // Explicitly pass the visibility as true
            onLogin={async () => {
              console.log("Customer logged in!");
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }}
            onUrlSignatureRequested={handleGetSignature}
            onError={(error: unknown) =>
              console.error("Error loading MoonPay widget:", error)
            }
          />
        )}

        {/* Dashboard Button */}
        {showDashboardButton && (
          <div className="fixed bottom-4 right-4">
            <Link
              href="/dashboard"
              className="btn btn-primary shadow-lg hover:shadow-xl transition-all"
            >
              Go to Dashboard
            </Link>
          </div>
        )}
      </main>
    </MoonPayProvider>
  );
}
