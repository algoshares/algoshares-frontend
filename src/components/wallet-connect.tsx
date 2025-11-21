"use client";

import { useConnect, useAccount, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

export function WalletConnect() {
    const { connect } = useConnect();
    const { isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    if (isConnected) {
        return (
            <button
                onClick={() => disconnect()}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold shadow hover:scale-105 transition"
            >
                Disconnect
            </button>
        );
    }

    return (
        <button
            onClick={() => connect({ connector: injected() })}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold shadow hover:scale-105 transition"
        >
            Connect
        </button>
    );
}
