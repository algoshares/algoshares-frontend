import { http, createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { walletConnect } from 'wagmi/connectors'
import { base } from "wagmi/chains";

export const config = createConfig({
    chains: [base],
    transports: {
        [base.id]: http()
    },
    connectors: [
        injected({
            shimDisconnect: true, // prevents "ghost connected" bugs
        }),
        walletConnect({
            projectId: "fa8d6f382c249f37865ec6069266ab4f",
            metadata: {
                name: "AlgoShares",
                description: "AlgoShares DApp",
                url: "https://algoshares.net",
                icons: ["https://algoshares.com/logo.png"],
            },
        }),
    ],
})
