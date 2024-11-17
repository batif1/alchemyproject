"use client";

import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  // Fix for dynamic year to prevent server-client mismatch
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-100">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] bg-cover bg-center bg-[url('/path-to-your-image.jpg')]">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center p-6">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold">
              Welcome to Parity
            </h1>
            <p className="mt-4 text-lg md:text-xl">
              Where every bet brings us closer to a better world. Connect,
              compete, and create impact together.
            </p>
            {!user ? (
              <button
                onClick={openAuthModal}
                className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-lg shadow-lg"
              >
                Get Started
              </button>
            ) : (
              <Link href="/dashboard" className="btn btn-primary">
                View Bets
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-7xl mx-auto p-6 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <h2 className="text-2xl font-bold">Bet Boldly</h2>
          <p className="mt-2 text-gray-600">
            Participate in impactful bets that fuel meaningful change.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Win Together</h2>
          <p className="mt-2 text-gray-600">
            Join forces with your community to bridge divides and foster unity.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Give Back</h2>
          <p className="mt-2 text-gray-600">
            Every bet contributes to causes that matter to both sides.
          </p>
        </div>
      </div>

      {/* User Status */}
      <div className="w-full bg-gray-200 p-6 text-center">
        {signerStatus.isInitializing ? (
          <>Loading...</>
        ) : user ? (
          <div>
            <p className="text-xl font-bold">
              Welcome back, {user.email ?? "anon"}!
            </p>
            <div className="mt-4">
              <Link href="/onramp" className="btn btn-primary">
                Go to Onramp Page
              </Link>
            </div>
            <button
              onClick={logout}
              className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white text-lg font-semibold rounded-lg shadow-lg"
            >
              Log Out
            </button>
          </div>
        ) : (
          <button
            onClick={openAuthModal}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg"
          >
            Login
          </button>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-6 text-center">
        {year && (
          <>
            <p>© {year} Parity. All rights reserved.</p>
            <p className="text-sm mt-2">
              Building bridges through meaningful bets.
            </p>
          </>
        )}
      </footer>
    </main>
  );
}
