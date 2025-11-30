"use client";

import { useState } from "react";
import { useConnect, useAccount, useDisconnect, Connector } from "wagmi";
import { injected } from "wagmi/connectors";

export function WalletConnect() {
    const { connect, error, connectors } = useConnect();
    const { isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const handleConnect = async () => {
        let connector = connectors.find(c => c.id === "injected");

        // fallback for mobile
        if (!connector || !connector.ready) {
            connector = connectors.find(c => c.id === "walletConnect");
        }

        //await connect({ connector });
    };

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

    /*return (
        <button
            onClick={() => connect({ connector: injected() })}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold shadow hover:scale-105 transition"
        >
            Connect
        </button>
    );*/
    return (
        <button
            onClick={handleConnect}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold shadow hover:scale-105 transition"
        >
            Connect
        </button>
    );
}
