import { config } from "@/config";
import { cookieToInitialState } from "@account-kit/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "./dashboard/Navbar";
import { AlchemyAuthProvider } from "./context/AlchemyAuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ABC",
  description: "Account Kit",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch headers asynchronously
  const cookies = (await headers()).get("cookie") ?? undefined;

  // Persist state across pages
  // https://accountkit.alchemy.com/react/ssr#persisting-the-account-state
  const initialState = cookieToInitialState(config, cookies);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers initialState={initialState}>
          <AlchemyAuthProvider>
            <Navbar />
            {children}
          </AlchemyAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
