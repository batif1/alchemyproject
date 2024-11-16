"use client";

import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
  useSmartAccountClient
} from "@account-kit/react";
import Link from "next/link";

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  /*
  const { client } = useSmartAccountClient({
    type: "LightAccount",
    policyId:
    });
    */

  //EOA - Externally Owned Account
  //

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
      {signerStatus.isInitializing ? (
        <>Loading...</>
      ) : user ? (
        <div className="flex flex-col gap-2 p-2">
          <p className="text-xl font-bold">Success!</p>
          Logged in as {user.email ?? "anon"}.
          <button className="btn btn-primary mt-6" onClick={() => logout()}>
            Log out

          </button>

          <div className="flex justify-center items-center mt-6">
            <Link href="/onramp" className="btn btn-primary">
              Go to Onramp Page
            </Link>
          </div>
        </div>
      ) : (
        <button className="btn btn-primary" onClick={openAuthModal}>
          Login
        </button>
      )}
    </main>
  );
}
