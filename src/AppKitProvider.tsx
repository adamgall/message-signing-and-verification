import { createAppKit } from "@reown/appkit/react";

import { WagmiProvider } from "wagmi";
import { mainnet, AppKitNetwork } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
const queryClient = new QueryClient();

const projectId = import.meta.env.VITE_APPKIT_PROJECT_ID;

const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  themeMode: "light",
});

export function AppKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
