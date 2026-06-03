
import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { walletConnect, injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [base],
  connectors: [
    injected(),
    walletConnect({
      projectId: "14a6012ffc42d98b14cc3637e1c3c924",
      showQrModal: true,
    }),
  ],
  transports: {
    [base.id]: http(),
  },
});
