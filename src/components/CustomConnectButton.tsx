"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function CustomConnectButton() {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
            }) => {
                const ready = mounted;
                const connected =
                    ready &&
                    account &&
                    chain;

                return (
                    <div
                        {...(!ready && {
                            "aria-hidden": true,
                            style: {
                                opacity: 0,
                                pointerEvents: "none",
                                userSelect: "none",
                            },
                        })}
                    >
                        {!connected ? (
                            <button
                                onClick={openConnectModal}
                                className="
                                    px-4 py-2 rounded-lg 
                                    bg-gradient-to-r from-yellow-500 to-yellow-700 
                                    text-black font-semibold shadow 
                                    hover:scale-105 transition
                                "
                            >
                                Connect
                            </button>
                        ) : chain.unsupported ? (
                            <button
                                onClick={openChainModal}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold"
                            >
                                Wrong network
                            </button>
                        ) : (
                            <button
                                onClick={openAccountModal}
                                className="
                                    px-4 py-2 rounded-lg 
                                    bg-gradient-to-r from-yellow-500 to-yellow-700 
                                    text-black font-semibold shadow 
                                    hover:scale-105 transition
                                "
                            >
                                {account.displayName}
                            </button>
                        )}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
}
