import {
  AlchemyAccountsUIConfig,
  cookieStorage,
  createConfig,
} from "@account-kit/react";
import { alchemy, sepolia } from "@account-kit/infra";
import { QueryClient } from "@tanstack/react-query";
import { ALCHEMY_API_KEY, PRIVATE_KEY } from "./app/utils/constants";
import { LocalAccountSigner, type SmartAccountSigner } from "@alchemy/aa-core";

const signer: SmartAccountSigner = LocalAccountSigner.privateKeyToAccountSigner(
  `0x${PRIVATE_KEY}`
);

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [
      [{ type: "email" }],
      [
        { type: "passkey" },
        { type: "social", authProviderId: "google", mode: "popup" },
        { type: "social", authProviderId: "facebook", mode: "popup" },
      ],
      [
        {
          type: "external_wallets",
          walletConnect: { projectId: "your-project-id" },
        },
      ],
    ],
    addPasskeyOnSignup: false,
  },
};

export const config = createConfig(
  {
    transport: alchemy({ apiKey: ALCHEMY_API_KEY as string }), // TODO: add your Alchemy API key - https://dashboard.alchemy.com/accounts
    chain: sepolia,
    // signer,
    policyId: "58dba5e1-f5fe-4397-954a-c748e827ca2a",
    ssr: true, // more about ssr: https://accountkit.alchemy.com/react/ssr
    storage: cookieStorage, // more about persisting state with cookies: https://accountkit.alchemy.com/react/ssr#persisting-the-account-state
    enablePopupOauth: true, // must be set to "true" if you plan on using popup rather than redirect in the social login flow
  },
  uiConfig
);

export const queryClient = new QueryClient();
